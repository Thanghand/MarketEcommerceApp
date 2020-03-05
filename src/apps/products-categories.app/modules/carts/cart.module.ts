import { Module } from '@nestjs/common';
import { ClearShoppingCartUseCase, GetCountOfProductsUseCase, GetShoppingCartUseCase, RemoveProductInShoppingCartUseCase, UpdateShoppingCartUseCase, UpdateStatusGroupProductsUseCase } from './use.cases';
import { CartsController } from './controllers';
import { ShoppingCartRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartSchema, ProductSchema, CategorySchema } from '../../libs/mongo/schemas';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { ProductCategoryMongoModule } from '../../libs/mongo/product-category-mongo.module';
import { CartsHandler } from './handlers';

const useCases = [
    ClearShoppingCartUseCase,
    GetCountOfProductsUseCase,
    GetShoppingCartUseCase,
    RemoveProductInShoppingCartUseCase,
    UpdateShoppingCartUseCase,
    UpdateStatusGroupProductsUseCase
];

const repositories = [
    ShoppingCartRepository
];

@Module({
    imports: [
        ClientRepositoriesModule,
        ProductCategoryMongoModule,
        TypeOrmModule.forFeature([
            ProductSchema,
            CategorySchema,
            ShoppingCartSchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getConnection()),
    ],
    controllers: [
        CartsController,
        CartsHandler
    ],
    providers: [
        ...useCases,
        ...repositories,
        MyLoggerService
    ],
    exports: [
        ...repositories
    ]
})
export class CartModule {

}