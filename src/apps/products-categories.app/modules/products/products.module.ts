import { Module } from '@nestjs/common';
import { ProductCategoryMongoModule } from '../../libs/mongo/product-category-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema, ProductSchema } from '../../libs/mongo/schemas';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { 
    CreateProductUseCase,
     DeleteProductUseCase, 
     FindProductsUseCase, 
     GetProductDetailUseCase, 
     UpdateProductCatalogUseCase, 
     UpdateProductInformationUseCase } from './use.cases';
import { ProductRepository } from './repositories';
import { ClientSuppliersRepository } from '@libs/repositories';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { ProductsController } from './controllers';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { CategoriesModule } from '../categories/categories.module';
import { CategoryRepository } from '../categories/repositories';


const useCases = [
    CreateProductUseCase,
    DeleteProductUseCase,
    FindProductsUseCase,
    GetProductDetailUseCase,
    UpdateProductCatalogUseCase,
    UpdateProductInformationUseCase
];

const repositories = [
    ProductRepository,
    ClientSuppliersRepository,
    CategoryRepository
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
        ProductsController
    ],
    providers: [
        NatsClientService,
        ...useCases,
        ...repositories,
        MyLoggerService
    ],
    exports: [
        ...repositories
    ]
})
export class ProductsModule {

}