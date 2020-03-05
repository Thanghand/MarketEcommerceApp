import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './carts/cart.module';


@Module({
    imports: [
        ProductsModule,
        CategoriesModule,
        CartModule
    ]
})
export class AppProductsCategoriesModule {

}