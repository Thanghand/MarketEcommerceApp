import { InvoiceStatus, CompanySummaryEntity } from '@models';

export class InvoiceSummaryResponse {
    _id: string;
    invoiceNumber: string;
    supplier: CompanySummaryEntity;
    restaurant: CompanySummaryEntity;
    startDate: Date;
    endDate: Date;
    status: InvoiceStatus;
    total: number;
    note: string;
}