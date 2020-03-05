import { Entity } from './base.entity';
import { ShippingAddressEntity } from './shipping.address.entity';
import { OrderStatus } from '../enums/order.status';
import { DeliveryEntity } from './delivery.entity';
import { BaseRecordEntity } from './base.record.entity';
import { CompanySummaryEntity } from './company.summary.entity';


export interface CreatingTransactionEntity {
    userId: string;
    userName: string;
    email: string;
    companyId: string;
    companyName: string;
}

export interface OrderProductSummaryEntity {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface OrderTransactionEntity extends BaseRecordEntity {
    status: OrderStatus;
    createdAt: Date;
    note?: string;
    systemNote?: string;
    updatedBy?: CreatingTransactionEntity;
    paymentMode?: string;
}

export enum PaymentType {
    None = 'None',
    COD = 'COD'
}
export interface Payment  {
    isPayEndOfMonth: boolean;
    paymentType?: PaymentType;
}


export interface OrderEntity extends Entity {
    orderNumber: string;
    restaurant: CompanySummaryEntity;
    supplier: Entity;
    payment: Payment;
    products: OrderProductSummaryEntity[];
    shippingAddress: ShippingAddressEntity;
    currentStatus: OrderStatus;
    deliveryOption?: DeliveryEntity;
    transactions: OrderTransactionEntity[];
    hasInvoice: boolean;
}