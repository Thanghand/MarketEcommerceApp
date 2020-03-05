import { Module } from '@nestjs/common';
import { AdminInvoiceController } from './controllers/admin.invoice.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminInvoiceController
    ]
})
export class AdminInvoiceModule {

}