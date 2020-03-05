import { Module } from '@nestjs/common';
import { AppServiceNameConfig } from '@shared.all/config/app-name-config.enum';
import { Configuration } from '@shared.all/config/apps.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema, InvoiceSchema } from './schemas';


const schemas = [
    OrderSchema,
    InvoiceSchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...Configuration.getConfig().getService(AppServiceNameConfig.Orders).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ]
})
export class OrdersMongoModule {

}