import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule,
    ],
    controllers: [
        InvoicesController
    ]
})
export class SuppliersInvoicesModule {

}