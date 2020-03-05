import { Module } from '@nestjs/common';
import { AdminSuppliersController } from './controllers/admin.suppliers.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
       ClientRepositoriesModule,
    ],
    controllers: [
        AdminSuppliersController
    ]
})
export class AdminSuppliersModule {}