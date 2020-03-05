import { Module } from '@nestjs/common';
import { OrdersMongoModule } from '../../libs/mongo/orders-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema } from '../../libs/mongo/schemas';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';
import {
    CreateOrdersUseCase,
    DeleteOrderUseCase,
    GetOrderDetailUseCase,
    GetOrdersUseCase,
    UpdateOrderPaymentUseCase,
    UpdateOrderUseCase,
    FindRestaurantsUseCase,
    GetCountOrdersCompanyUseCase,
    DisableOrdersAreInInvoiceUseCase,
    UpdateOrdersToPaidBySystemUseCase,
    EnableOrdersInInvoiceUseCase
} from './use.cases';
import { OrderRepository } from './repositories';
import { ClientShoppingCartRepository } from './repositories';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersHandler } from './handlers/orders.handler';


const useCases = [
    // Queries
    GetOrderDetailUseCase,
    GetOrdersUseCase,
    FindRestaurantsUseCase,
    GetCountOrdersCompanyUseCase,

    // Commands
    CreateOrdersUseCase,
    DeleteOrderUseCase,
    UpdateOrderPaymentUseCase,
    UpdateOrderUseCase,
    DisableOrdersAreInInvoiceUseCase,
    UpdateOrdersToPaidBySystemUseCase,
    EnableOrdersInInvoiceUseCase
];

const repositories = [
    OrderRepository,
    ClientShoppingCartRepository
];

@Module({
    imports: [
        ClientRepositoriesModule,
        OrdersMongoModule,
        TypeOrmModule.forFeature([
            OrderSchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.Orders).mongodb.getConnection()),
    ],
    controllers: [
        OrdersController,
        OrdersHandler
    ],
    providers: [
        ...useCases,
        ...repositories,
        MyLoggerService
    ],
    exports: [
        ...useCases,
        ...repositories
    ]
})
export class OrdersModule {

}