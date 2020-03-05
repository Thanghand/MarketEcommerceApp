import { Controller } from '@nestjs/common';
import { SendTestUseCase, SendEmailOrderUseCase, SendEmailInvoiceUseCase } from '../use.cases';
import { MessagePattern } from '@nestjs/microservices';
import { OrderEntity, InvoiceEntity } from '@libs/models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Controller('mails')
export class MailsController {

    constructor(private readonly sendTestUseCase: SendTestUseCase,
        private readonly sendEmailOrderUseCase: SendEmailOrderUseCase,
        private readonly sendInvoiceUseCase: SendEmailInvoiceUseCase) {
    }

    @MessagePattern('mail.send.test')
    async sendTest(param: any): Promise<void> {
        this.sendTestUseCase.example();
    }

    @MessagePattern(MessageEventName.SEND_EMAIL_INVOICE_RESTAURANT)
    sendInvoiceToRestaurant(invoice: InvoiceEntity): void {
        this.sendInvoiceUseCase.execute(invoice);
    }
}