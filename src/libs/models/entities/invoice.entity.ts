import { Entity } from './base.entity';
import { InvoiceStatus } from '../enums/invoice.status';
import { CompanySummaryEntity } from './company.summary.entity';

export interface OrderInvoiceEntity {
    _id: string;
    orderNumber: string;
    restaurant: Entity;
    supplier: Entity;
    total: number;
}

export interface InvoiceEntity extends Entity {
    invoiceNumber: string;
    supplier: CompanySummaryEntity;
    restaurant: CompanySummaryEntity;
    orders: OrderInvoiceEntity[];
    startDate: Date;
    endDate: Date;
    status: InvoiceStatus;
    total: number;
    note: string;
}