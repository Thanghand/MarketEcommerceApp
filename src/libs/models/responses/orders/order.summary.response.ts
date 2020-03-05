import { OrderProductSummaryEntity, OrderStatus, CreatingTransactionEntity, DeliveryEntity } from '@models';


export class OrderSummaryResponse {
    _id: string;
    orderNumber: string;
    supplierId: string;
    supplierName: string;
    restaurantId: string;
    restaurantName: string;
    products: OrderProductSummaryEntity[];
    currentStatus: OrderStatus;
    updatedBy: CreatingTransactionEntity;
    deliveryOption?: DeliveryEntity;
    createdAt: Date;
    updatedAt: Date;
    isPayEndOfMonth: boolean;
}