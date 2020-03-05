import { Module } from '@nestjs/common';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierSchema } from './schemas';

const schemas = [
    SupplierSchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.Suppliers).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})
export class SuppliersMongoModule {}