import { Module } from '@nestjs/common';
import { 
    CreateSupplierUseCase, 
    FindSuppliersUseCase, 
    GetSupplierDetailUseCase, 
    UpdateSupplierUseCase, 
    DeleteSupplierUseCase, 
    UpdateUserInSuppliersUseCase} from './use.cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersRepository } from './repositories';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { SupplierSchema } from '../../libs/mongo/schemas';
import { LoggerModule } from '@libs/logger/logger.module';
import { SuppliersMongoModule } from '../../libs/mongo/suppliers-mongo.module';
import { SuppliersController } from './controllers/suppliers.controller';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

const repositories = [
    SuppliersRepository,
  ];
  
  const useCases = [
    CreateSupplierUseCase,
    FindSuppliersUseCase,
    GetSupplierDetailUseCase,
    UpdateSupplierUseCase,
    DeleteSupplierUseCase,
    UpdateUserInSuppliersUseCase,
  ];

@Module({
    imports: [
        SuppliersMongoModule,
        TypeOrmModule.forFeature([
            SupplierSchema, 
        ], Configuration.getConfig().getService(AppServiceNameConfig.Suppliers).mongodb.getConnection()),
        LoggerModule,
    ],
    controllers:[
        SuppliersController
    ],
    providers: [
        NatsClientService,
        ...repositories,
        ...useCases,
    ],
    exports: [
        ...useCases,
        ...repositories
    ]
})
export class SuppliersModule {}