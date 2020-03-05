import { UseCase } from '@shared.core';
import { Inject } from '@nestjs/common';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { OrderDomain } from '../../models';
import { OrderEntity, InvoiceEntity } from '@libs/models';


export class EnableOrdersInInvoiceUseCase extends UseCase<InvoiceEntity, OrderEntity[]> {

    constructor(@Inject(OrderRepository) private readonly orderRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(invoice?: InvoiceEntity, isGetEntity?: boolean): Promise<OrderEntity[]> {

        const orderIds = invoice.orders.map(o => o._id);
        const orderEntities = await this.orderRepository.getOrdersById(orderIds);
        const orderDomains = orderEntities.map(o => new OrderDomain(o));
        orderDomains.forEach(o => o.enableIsAddToInvoice());

        const updatedOrders = orderDomains.map(o => o.getEntity());
        const entities = await this.orderRepository.updateOrders(updatedOrders);
        return entities;
    }

}