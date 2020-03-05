import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderEntity, OrderTransactionEntity, OrderStatus, TokenUserPayload, DeletingOrderParam } from '@models';
import { MessageConstant } from '@shared.all/constants';
import { OrderRepository, IOrderRepository } from '../../repositories';


@Injectable()
export class DeleteOrderUseCase extends UseCase<DeletingOrderParam, OrderEntity> {

    constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: DeletingOrderParam, isGetEntity?: boolean): Promise<OrderEntity> {
        const {orderId, userToken} = input;
        if (!orderId)
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const orderEntity = await this.orderRepository.getById(orderId);
        if (orderEntity.currentStatus === OrderStatus.Cancel) {
            console.error('Sorry this order has already deleted');
            throw new HttpException('Sorry this order has already deleted', HttpStatus.BAD_REQUEST); 
        }
        const newTransaction: OrderTransactionEntity = {
            status: OrderStatus.Cancel,
            createdAt: new Date(),
            updatedAt: new Date(),
            note: '',
            systemNote: 'Cancel order',
            updatedBy: {
                userId: userToken._id,
                userName: userToken.userName,
                email: userToken.email,
                companyId: userToken.companyId,
                companyName: orderEntity.supplier.name,
            }
        };
        orderEntity.currentStatus = OrderStatus.Cancel;
        orderEntity.transactions.push(newTransaction);
        orderEntity.isDeleted = true;
        const result = await this.orderRepository.update(orderId, orderEntity);
        return result;
    }

}