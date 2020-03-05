import { UseCase } from '@shared.core';
import { OrderEntity } from '@models';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { OrderDomain } from '../../models';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { UpdatingOrdersToPaidParam } from '../../../../libs/models';
import { MessageConstant } from '@shared.all/constants';


@Injectable()
export class UpdateOrdersToPaidBySystemUseCase extends UseCase<UpdatingOrdersToPaidParam, OrderEntity[]> {

    private readonly tag = 'UpdateOrdersToPaidUseCase';

    constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository,
                private readonly loggerService: MyLoggerService,) {
        super();
    }

    async buildUseCase(param?: UpdatingOrdersToPaidParam, isGetEntity?: boolean): Promise<OrderEntity[]> {

        const {userToken, orderIds } = param;
        
        if(!orderIds || orderIds.length === 0) {
            this.loggerService.error('OrderIds is emtpy', this.tag);
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }

        const orderEntites = await this.orderRepository.getOrdersById(orderIds);
        const orderDomains = orderEntites.map(o => new OrderDomain(o));
        orderDomains.forEach(o => o.updateToPaidBySystem());

        const updatedEntites = orderDomains.map(o => o.getEntity());
        const result = await this.orderRepository.updateOrders(updatedEntites);

        if (!result) {
            this.loggerService.error('Update order status to paid failed', this.tag);
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }

        return result;
    }
    
}
