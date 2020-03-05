import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoices.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        InvoiceController
    ]
})
export class RestaurantsInvoicesModule{

}