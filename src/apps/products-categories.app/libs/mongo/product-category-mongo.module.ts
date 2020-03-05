import { Module } from '@nestjs/common';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema, ShoppingCartSchema } from './schemas';
import { ProductSchema } from './schemas/product.schema';

const schemas = [
    CategorySchema,
    ProductSchema,
    ShoppingCartSchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})
export class ProductCategoryMongoModule {}