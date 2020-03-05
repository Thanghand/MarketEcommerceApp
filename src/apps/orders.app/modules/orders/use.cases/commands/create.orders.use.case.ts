import { UseCase } from '@shared.core';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { RestaurantEntity, CreatingOrdersDto, CreatingOrderParam, OrderDetailResponse, CreatedOrdersParam } from '@models';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { IClientShoppingCartRepository, ClientShoppingCartRepository } from '../../repositories';
import { ClientRestaurantsRepository, IClientRestaurantsRepository, ClientEmailRepository, IClientEmailRepository } from '@libs/repositories';
import { OrderDomain } from '../../models';
import { MapperOrderUtil } from '../../shared/utils';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Injectable()
export class CreateOrdersUseCase extends UseCase<CreatingOrderParam, OrderDetailResponse[]> {
    private readonly tag: string = 'CreateOrdersUseCase';

    constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository,
        @Inject(ClientRestaurantsRepository) private readonly clientRestaurantRepo: IClientRestaurantsRepository,
        @Inject(ClientEmailRepository) private readonly clientEmailRepo: IClientEmailRepository,
        @Inject(ClientShoppingCartRepository) private readonly clientShoppingCartRepo: IClientShoppingCartRepository,
        private readonly natclientService: NatsClientService) {
        super();
    }

    async buildUseCase(input?: CreatingOrderParam, isGetEntity?: boolean): Promise<OrderDetailResponse[]> {

        const { userToken, dto } = input;
        if (this.isMissingFields(dto)) {
            console.error(`${this.tag}: input is missing fields`);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const restaurant = await this.clientRestaurantRepo.getById(userToken.companyId, true) as RestaurantEntity;
        const orderEntities = dto.cartSuppliers.map(o => {
            const orderDomain = new OrderDomain();
            orderDomain.createOrder(userToken, restaurant, o, dto);
            return orderDomain.getEntity();
        });
        const entities = await this.orderRepository.saveOrders(orderEntities);


        // Emit Event created orders
        const param: CreatedOrdersParam = {
            userToken: userToken,
            orders: entities
        };
        this.natclientService.emitMessage(MessageEventName.ORDERS_CREATED, param);

        // return order
        return MapperOrderUtil.mapEntitiesToResponse(entities);
    }

    isMissingFields(input: CreatingOrdersDto) {
        return !input || input == null;

    }
}