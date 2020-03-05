import { Injectable } from '@nestjs/common';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { InvoiceDetailResponse } from '@models';

export interface IInvoiceRepository {
    getInvoiceDetail(id: string): Promise<InvoiceDetailResponse>;
}

@Injectable()
export class ClientInvoiceRepository implements IInvoiceRepository {

    constructor(private readonly natsClient: NatsClientService) {
    }

    async getInvoiceDetail(id: string): Promise<InvoiceDetailResponse> {
        const invoice = await this.natsClient.sendMessage<InvoiceDetailResponse>('invoice.id', id);
        return invoice;
    }

}