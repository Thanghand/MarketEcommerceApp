

import { InvoiceEntity, OrderInvoiceEntity, InvoiceStatus, CompanySummaryEntity } from '@models';
import { Column, Entity, Index} from 'typeorm';
import { BaseSchema } from '@libs/mongo';

@Entity('invoices')
export class InvoiceSchema extends BaseSchema implements InvoiceEntity {
    
    @Column()
    supplier: CompanySummaryEntity;

    @Column()
    restaurant: CompanySummaryEntity;
    
    @Column()
    orders: OrderInvoiceEntity[];

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    status: InvoiceStatus;

    @Column()
    @Index('invoiceNumber', {background: true})
    invoiceNumber: string;

    @Column()
    total: number;

    @Column()
    note: string;

}