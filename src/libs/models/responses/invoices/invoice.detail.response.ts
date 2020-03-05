import { InvoiceStatus, CompanySummaryEntity, OrderInvoiceEntity } from '@models';


export class OrderInvoiceResponse {
    _id: string;
    orderNumber: string;
    restaurantId: string;
    restaurantName: string;
    supplierId: string;
    supplierName: string;
    total: number;
}


export class InvoiceDetailResponse {
    _id: string;
    invoiceNumber: string;
    supplier: CompanySummaryEntity;
    restaurant: CompanySummaryEntity;
    orders: OrderInvoiceResponse[];
    startDate: Date;
    endDate: Date;
    status: InvoiceStatus;
    total: number;
    note: string;
}