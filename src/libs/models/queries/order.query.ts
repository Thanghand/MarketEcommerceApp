
export class OrderQuery {
    restaurantId?: string;
    supplierId?: string;
    orderNumber?: string;
    status?: string;
    hasInvoice?: boolean | string;
    startDate?: string;
    endDate?: string;
    isPayEndOfMonth? : boolean | string;
}