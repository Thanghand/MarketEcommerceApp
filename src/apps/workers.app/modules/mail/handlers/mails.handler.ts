import { Controller } from '@nestjs/common';
import { SendEmailOrderUseCase, SendEmailInvoiceUseCase } from '../use.cases';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Payload, EventPattern } from '@nestjs/microservices';
import { CreatedOrdersParam, InvoiceEntity } from '@libs/models';

@Controller('mails/handler')
export class MailsHandler {

    constructor(private readonly sendEmailOrderUseCase: SendEmailOrderUseCase,
        private readonly sendInvoiceUseCase: SendEmailInvoiceUseCase) {
    }

    // @EventPattern(MessageEventName.ORDERS_CREATED)
    // async sendOrdersToSupplier(@Payload() param: CreatedOrdersParam): Promise<void> {
    //     await param.orders.map((o) => this.sendEmailOrderUseCase.execute(o));
    // }

    @EventPattern(MessageEventName.INVOICES_CREATED)
    async sendInvoiceToRestaurant(invoice: InvoiceEntity): Promise<void> {
        await this.sendInvoiceUseCase.execute(invoice);
    }
}