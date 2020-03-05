import { IClientInvoiceRepository } from './client-invoice.repository.interface';
import { CreatingInvoiceParam, InvoiceDetailResponse, UpdatingOrderStatusInvoiceParam, InvoiceQuery, InvoiceSummaryResponse } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ClientInvoiceRepository implements IClientInvoiceRepository {

    constructor(private readonly eventMessage: NatsClientService) {
    }

    async createInvoice(param: CreatingInvoiceParam): Promise<InvoiceDetailResponse> {
        const result = await this.eventMessage.sendMessage<InvoiceDetailResponse>(MessageEventName.INVOICES_CREATE, param);
        return result;
    }

    async updateOrderStatusInvoice(param: UpdatingOrderStatusInvoiceParam): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.INVOICES_UPDATE_ORDER_STATUS, param);
        return result;

    }

    async getInvoices(query: InvoiceQuery): Promise<InvoiceSummaryResponse[]> {
        const result = await this.eventMessage.sendMessage<InvoiceSummaryResponse[]>(MessageEventName.INVOICES_GET_ALL, query);
        return result;
    }
    
    async getInvoiceDetail(id: string): Promise<InvoiceDetailResponse> {
        const result = await this.eventMessage.sendMessage<InvoiceDetailResponse>(MessageEventName.INVOCIES_GET_DETAIL, id);
        return result;
    }

    async deleteInvoice(id: string): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.INVOICES_DELETE, id);
        return result;
    }

    
}