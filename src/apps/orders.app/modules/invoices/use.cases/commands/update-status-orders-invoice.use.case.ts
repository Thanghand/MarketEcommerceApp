import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';

import {
    InvoiceRepository,
    IInvoiceRepository
} from '../../repositories';
import { InvoiceDomain } from '../../models';
import { MessageConstant } from '@shared.all/constants';
import { UpdatingOrderStatusInvoiceParam } from '@models';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

export class UpdateStatusOrdersInvoiceUseCase extends UseCase<UpdatingOrderStatusInvoiceParam, boolean> {

    private readonly tag = 'UpdataOrdersInvoiceUseCase';
    constructor(@Inject(InvoiceRepository) private readonly invoiceRepository: IInvoiceRepository,
        private readonly loggerService: MyLoggerService,
        private readonly eventMessage: NatsClientService,
    ) {
        super();
    }

    async buildUseCase(input?: UpdatingOrderStatusInvoiceParam, isGetEntity?: boolean): Promise<boolean> {

        const { invoiceId, userToken } = input;

        if (!invoiceId) {
            this.loggerService.error('Missing id', this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
        const entity = await this.invoiceRepository.getById(invoiceId);
        const invoiceDomain = new InvoiceDomain(entity);
        invoiceDomain.updateStatusToPaid();

        // Update Invoice
        const updatedInvoice = await this.invoiceRepository.update(invoiceId, invoiceDomain.getEntity());

        if (!updatedInvoice) {
            this.loggerService.error('Update invoice failed', this.tag);
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }

        // Emit updated invoice
        this.eventMessage.emitMessage(MessageEventName.INVOICE_UPDATE_PAID, invoiceDomain.getEntity());

        return true;
    }

}