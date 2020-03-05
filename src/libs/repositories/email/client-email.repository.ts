import { IClientEmailRepository } from './client-email.repository.interface';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { OrderEntity, InvoiceEntity } from '@models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientEmailRepository implements IClientEmailRepository{
   

    constructor(private readonly eventMessage: NatsClientService) {
    }


    async sendOrderToRestaurant(order: OrderEntity): Promise<void> {
        await this.eventMessage.sendMessage(MessageEventName.SEND_EMAIL_ORDER_RESTAURANT, order);
    }

    async sendInvoiceToRestaurant(invoice: InvoiceEntity): Promise<void> {
        await this.eventMessage.sendMessage(MessageEventName.SEND_EMAIL_INVOICE_RESTAURANT, invoice);
    }
    
}