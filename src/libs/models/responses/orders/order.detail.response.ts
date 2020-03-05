import { OrderProductSummaryEntity, ShippingAddressEntity, OrderTransactionEntity, OrderStatus, DeliveryEntity } from "@models";


export class OrderTransactionResponse {
    status: OrderStatus;
    createdAt: Date;
    note: string;
    updatedBy: {
        userId: string;
        userName: string;
        email: string;
        companyId: string;
        companyName: string
    };
}

export class OrderDetailResponse {
    _id: string;
    orderNumber: string;
    supplierId: string;
    supplierName: string;
    restaurantId: string;
    restaurantName: string;
    products: OrderProductSummaryEntity[];
    shippingAddress: ShippingAddressEntity;
    transactions: OrderTransactionResponse[];
    currentStatus: OrderStatus;
    deliveryOption?: DeliveryEntity;
    createdAt: Date;
    isPayEndOfMonth: boolean
}