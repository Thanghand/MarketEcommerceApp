import { Module } from '@nestjs/common';
import { SupplierOrdersController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        SupplierOrdersController
    ], 
})
export class SuppliersOrdersModule {
    
}