import { UseCase } from '@shared.core';
import { OrderEntity, OrderDetailResponse, UpdatingOrderPaymentParam } from '@models';
import { Inject } from '@nestjs/common';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { OrderDomain } from '../../models';
import { MapperOrderUtil } from '../../shared/utils';

export class UpdateOrderPaymentUseCase extends UseCase<UpdatingOrderPaymentParam, OrderDetailResponse | OrderEntity> {

    private readonly tag = 'UpdateOrderUseCase';

    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingOrderPaymentParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {
        
        const {userToken, orderId, dto} = input;
        const entity = await this.ordersRepository.getById(orderId);
        const orderDomain = new OrderDomain(entity);
        orderDomain.updatePayment(userToken, dto.isPayEndOfMonth);

        const result = await this.ordersRepository.update(orderId, orderDomain.getEntity());
        if (isGetEntity)
            return result;

        return MapperOrderUtil.mapEntityToResponse(result);
    }
    
}