import { 
    BaseDomain, 
    InvoiceEntity, 
    InvoiceStatus, 
    RestaurantEntity, 
    SupplierEntity,
    OrderInvoiceEntity,
    CreatingInvoiceDto} from '@models';
import { OrderUtil } from '@shared.all/utils';
import * as Enumerable from 'linq';

export class InvoiceDomain extends BaseDomain<InvoiceEntity> {

    public generate(dto: CreatingInvoiceDto, restaurant: RestaurantEntity, supplier: SupplierEntity): void {
        const total = Enumerable.from(dto.orders).sum(o => o.total);
        const entity: InvoiceEntity = {
            invoiceNumber: `I${OrderUtil.generateOrderNumber()}`,
            restaurant: {
                _id: restaurant._id.toString(),
                name: restaurant.name,
                phoneNumber: restaurant.phoneNumber,
                email: restaurant.email,
            },
            supplier: {
                _id: supplier._id.toString(),
                name: supplier.name,
                phoneNumber: supplier.phoneNumber,
                email: supplier.email,
            },
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
            orders: dto.orders.map(o => {
                const entity: OrderInvoiceEntity = {
                    _id: o._id,
                    orderNumber: o.orderNumber,
                    total: o.total,
                    restaurant: {
                        _id: restaurant._id,
                        name: restaurant.name,
                    },
                    supplier: {
                        _id: supplier._id,
                        name: supplier.name,
                    }
                }
                return entity;
            }),
            status: InvoiceStatus.Pending,
            total: total,
            note: dto.note
        }
        this.entity = entity;
    }

    public updateStatusToPaid(): void {
        this.entity.status = InvoiceStatus.Paid;
    }

    public delete(): void {
        this.entity.isDeleted = true;
    }
}