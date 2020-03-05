import { Module } from '@nestjs/common';
import { OrdersMongoModule } from '../../libs/mongo/orders-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import {
    CreateInvoiceUseCase,
    DeleteInvoiceUseCase,
    GetInvoiceDetailUseCase,
    GetInvoicesUseCase,
    UpdateStatusOrdersInvoiceUseCase
} from './use.cases';
import { InvoiceRepository } from './repositories';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { InvoiceSchema, OrderSchema } from '../../libs/mongo/schemas';
import { InvoicesController } from './controllers/invoices.controller';
import { OrderRepository } from '../orders/repositories';
import { NatsClientService } from '@libs/nats/nats-client.service';


const useCases = [
    // Invoices 
    CreateInvoiceUseCase,
    DeleteInvoiceUseCase,
    GetInvoiceDetailUseCase,
    GetInvoicesUseCase,
    UpdateStatusOrdersInvoiceUseCase,
];

const repositories = [
    InvoiceRepository,
    OrderRepository
];


@Module({
    imports: [
        ClientRepositoriesModule,
        OrdersMongoModule,
        TypeOrmModule.forFeature([
            InvoiceSchema,
            OrderSchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.Orders).mongodb.getConnection()),
    ],
    controllers: [
        InvoicesController
    ],
    providers: [
        ...useCases,
        ...repositories,
        MyLoggerService,
        NatsClientService,
    ]
})
export class InvoiceModule {

}