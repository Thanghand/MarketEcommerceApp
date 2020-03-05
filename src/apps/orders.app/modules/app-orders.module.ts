import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { InvoiceModule } from './invoices/invoice.module';


@Module({
    imports: [
        OrdersModule,
        InvoiceModule
    ]
})
export class AppOrdersMoudle {

}