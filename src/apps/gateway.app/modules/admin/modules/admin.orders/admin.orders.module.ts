import { Module } from '@nestjs/common';
import { AdminOrdersController } from './controllers/admin.order.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminOrdersController
    ]
})
export class AdminOrdersModule {
}