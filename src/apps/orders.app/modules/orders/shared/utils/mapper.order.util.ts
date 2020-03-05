import { OrderEntity, OrderDetailResponse, OrderTransactionResponse } from '@models';

export class MapperOrderUtil {

    public static mapEntityToResponse(entity: OrderEntity): OrderDetailResponse {
        const response: OrderDetailResponse = {
            _id: entity._id,
            orderNumber: entity.orderNumber,
            supplierId: entity.supplier._id,
            supplierName: entity.supplier.name,
            restaurantId: entity.restaurant._id,
            restaurantName: entity.restaurant.name,
            products: entity.products,
            shippingAddress: entity.shippingAddress,
            createdAt: entity.createdAt,
            transactions: entity.transactions.map((t) => {
                const transaction: OrderTransactionResponse = {
                    status: t.status,
                    createdAt: t.createdAt,
                    note: `${t.systemNote ? `${t.systemNote} \n` : ''}${t.note ? `Notes: ${t.note}`.trim() : ''}`,
                    updatedBy: {
                        userId: t.updatedBy.userId,
                        userName: t.updatedBy.userName,
                        email: t.updatedBy.email,
                        companyId: t.updatedBy.companyId,
                        companyName: t.updatedBy.companyName,
                    }
                };
                return transaction;
            }),
            currentStatus: entity.currentStatus,
            deliveryOption: entity.deliveryOption,
            isPayEndOfMonth: entity.payment.isPayEndOfMonth,
        };
        return response;
    }

    public static mapEntitiesToResponse(entities: OrderEntity[]) : OrderDetailResponse[] {
        return entities.map(o => this.mapEntityToResponse(o)); 
    }
}