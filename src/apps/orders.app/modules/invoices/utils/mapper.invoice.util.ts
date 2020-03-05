import { InvoiceEntity, InvoiceDetailResponse, OrderInvoiceResponse, InvoiceSummaryResponse } from '@models';


export class MapperInvoiceUtil {

    public static mapEntityToResponse(entity: InvoiceEntity) : InvoiceDetailResponse {
        const response: InvoiceDetailResponse = {
            _id: entity._id,
            invoiceNumber: entity.invoiceNumber,
            supplier: entity.supplier,
            restaurant: entity.restaurant,
            orders: entity.orders.map(o => {
                const order: OrderInvoiceResponse = {
                    _id: o._id,
                    orderNumber: o.orderNumber,
                    restaurantId: o.restaurant._id,
                    restaurantName: o.restaurant.name,
                    supplierId: o.supplier._id,
                    supplierName: o.supplier.name,
                    total: o.total
                }
                return order;
            }),
            startDate: entity.startDate,
            endDate: entity.endDate,
            status: entity.status,
            total: entity.total,
            note: entity.note
        };
        return response;
    }

    public static mapEntitiesToSummaries(entities: InvoiceEntity[]): InvoiceSummaryResponse[] {
        const responses = entities.map( e => {
            const response: InvoiceSummaryResponse = {
                _id: e._id,
                invoiceNumber: e.invoiceNumber,
                restaurant: e.restaurant,
                supplier: e.supplier,
                startDate: e.startDate,
                endDate: e.endDate,
                status: e.status,
                total: e.total,
                note: e.note
            }
            return response;
        });
        return responses;
    }
}