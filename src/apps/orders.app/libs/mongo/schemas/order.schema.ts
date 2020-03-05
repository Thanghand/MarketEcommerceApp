import { Column, Index, Entity } from 'typeorm';
import { 
    ShippingAddressEntity, 
    DeliveryEntity, 
    IEntity, 
    OrderStatus, 
    OrderEntity, 
    OrderProductSummaryEntity, 
    OrderTransactionEntity, 
    Payment,
    CompanySummaryEntity} from '@models';
import { BaseSchema } from '@libs/mongo';

@Entity('orders')
export class OrderSchema extends BaseSchema implements OrderEntity {
    @Column() 
    @Index('orderNumber', {background: true})
    orderNumber: string;
    @Column() total: number;
    @Column() products: OrderProductSummaryEntity[];
    @Column() shippingAddress: ShippingAddressEntity;
    @Column() deliveryOption?: DeliveryEntity;
    @Column() transactions: OrderTransactionEntity[];
    @Column() currentStatus: OrderStatus;
    @Column() hasInvoice: boolean = false;
    @Column() supplier: IEntity;
    @Column() restaurant: CompanySummaryEntity;
    @Column() payment: Payment;
}