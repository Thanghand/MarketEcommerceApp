import { Module } from '@nestjs/common';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from '@libs/mongo';

const schemas = [
    CompanySchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.Company).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})
export class CompanyMongoModule {}