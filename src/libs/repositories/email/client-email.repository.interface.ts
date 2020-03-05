import { OrderEntity, InvoiceEntity } from '@libs/models';

export interface IClientEmailRepository {
     sendOrderToRestaurant(order: OrderEntity): Promise<void> ;
     sendInvoiceToRestaurant(invoice: InvoiceEntity): Promise<void>;
}