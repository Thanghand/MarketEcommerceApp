import { Controller } from '@nestjs/common';
import { EnableOrdersInInvoiceUseCase, DisableOrdersAreInInvoiceUseCase, UpdateOrdersToPaidBySystemUseCase } from '../use.cases';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { InvoiceEntity } from '@libs/models';
import { UpdatingOrdersToPaidParam } from 'src/apps/orders.app/libs/models';
import { EventPattern } from '@nestjs/microservices';


@Controller()
export class OrdersHandler {
    constructor(private readonly enableOrdersAreInInvoiceUseCase: EnableOrdersInInvoiceUseCase,
                private readonly updateOrdersToPaidUseCase: UpdateOrdersToPaidBySystemUseCase,
                private readonly disableOrdersAreInInvoiceUseCase: DisableOrdersAreInInvoiceUseCase) {
    }


    @EventPattern(MessageEventName.INVOICES_CREATED)
    async enableOrdersInInvoice(invoice: InvoiceEntity): Promise<void> {
        await this.enableOrdersAreInInvoiceUseCase.execute(invoice);
    }

    @EventPattern(MessageEventName.INVOICE_UPDATE_PAID)
    async updateOrdersToPaid(invoice: InvoiceEntity): Promise<void> {
        const param: UpdatingOrdersToPaidParam = {
            orderIds: invoice.orders.map(o => o._id)
        };
        await this.updateOrdersToPaidUseCase.execute(param);
    }

    @EventPattern(MessageEventName.INVOICES_DELETED) 
    async disableOrdersInInvoice(invoice: InvoiceEntity): Promise<void> {
        await this.disableOrdersAreInInvoiceUseCase.execute(invoice.orders.map(o => o._id));
    }


}