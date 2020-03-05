import { IBaseRepository } from '@shared.core';
import { InvoiceEntity, InvoiceQuery } from '@models';

export interface IInvoiceRepository extends IBaseRepository<InvoiceEntity> {
    getInvoices(query: InvoiceQuery): Promise<InvoiceEntity[]>;
}