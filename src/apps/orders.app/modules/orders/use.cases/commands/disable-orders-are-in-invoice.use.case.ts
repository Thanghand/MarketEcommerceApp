import { UseCase } from '@shared.core';
import { OrderEntity } from '@libs/models';
import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository, OrderRepository } from '../../repositories';
import { OrderDomain } from '../../models';

@Injectable()
export class DisableOrdersAreInInvoiceUseCase extends UseCase<string[], OrderEntity[]> {
 
    constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(orderIds?: string[], isGetEntity?: boolean): Promise<OrderEntity[]> {

        const orderEntites = await this.orderRepository.getOrdersById(orderIds);
        const orderDomains = orderEntites.map(o => new OrderDomain(o));
        orderDomains.forEach(o => o.disableIsAddToInvoice());
        const updatedEntites = orderDomains.map(o => o.getEntity());
        const result = await this.orderRepository.updateOrders(updatedEntites);
        return result;
    }
    
}