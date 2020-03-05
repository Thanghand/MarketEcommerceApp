import { Module } from '@nestjs/common';
import { CompanyMongoModule } from '../../libs/mongo/company-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { CompanyRepository } from '../../libs/repositories';
import { CompanySchema } from '@libs/mongo';
import { CreateCompanyUseCase, CreatePreparingDataUseCase } from './use.cases';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { CompanyController } from './controllers';

@Module({
    imports: [
        CompanyMongoModule,
        TypeOrmModule.forFeature([
            CompanySchema,
        ], Configuration.getConfig().getService(AppServiceNameConfig.Company).mongodb.getConnection()),
    ],
    controllers: [
        CompanyController
    ],
    providers: [
        NatsClientService,
        CompanyRepository,
        CreateCompanyUseCase,
        CreatePreparingDataUseCase
    ]
})
export class CompanyModule {

}