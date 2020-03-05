import { UseCase } from '@shared.core';
import { Inject } from '@nestjs/common';
import { InvoiceDomain } from '../../models';
import {
    IInvoiceRepository, 
    InvoiceRepository, 
} from '../../repositories';

import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

export class DeleteInvoiceUseCase extends UseCase<string, boolean> {

    private readonly tag = 'DeleteInvoiceUseCase';
    constructor(@Inject(InvoiceRepository) private readonly invoiceRepository: IInvoiceRepository,
                private readonly eventMessage: NatsClientService, 
                ) {
        super();
    }
    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<boolean> {
        const invoiceEntity = await this.invoiceRepository.getById(input);
        const invoiceDomain = new InvoiceDomain(invoiceEntity);
        invoiceDomain.delete();
        await this.invoiceRepository.update(input, invoiceDomain.getEntity());

        // Emit deleted invoice
        this.eventMessage.emitMessage(MessageEventName.INVOICES_DELETED, invoiceDomain.getEntity());

        return true;
    }
    
}