import { Module } from '@nestjs/common';
import { ProductCategoryMongoModule } from '../../libs/mongo/product-category-mongo.module';
import { ProductSchema } from '../../libs/mongo/schemas/product.schema';
import { CategorySchema } from '../../libs/mongo/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';
import {
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoriesCountingProductsUseCase, 
    GetCategoryDetailUseCase, 
    GetSupplierCategoriesUseCase, 
    UpdateCategoryUseCase
} from './use.cases';
import { CategoryRepository } from './repositories';
import { CategoriesController } from './controllers';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { ProductsModule } from '../products/products.module';
import { ProductRepository } from '../products/repositories';



const useCaeses = [
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetAllCategoriesUseCase,
    GetCategoriesCountingProductsUseCase,
    GetCategoryDetailUseCase,
    GetSupplierCategoriesUseCase,
    UpdateCategoryUseCase,
];

const repositoires = [
    CategoryRepository,
    ProductRepository,
];


@Module({
    imports: [
        ProductCategoryMongoModule,
        TypeOrmModule.forFeature([
            ProductSchema,
            CategorySchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getConnection()),
    ],
    controllers: [
        CategoriesController
    ],
    providers: [
        NatsClientService,
        MyLoggerService,
        ...useCaeses,
        ...repositoires
    ],
    exports: [
        ...repositoires
    ]
})
export class CategoriesModule {

}