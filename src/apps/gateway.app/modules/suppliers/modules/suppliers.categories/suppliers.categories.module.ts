import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
        ClientRepositoriesModule,
    ],
    controllers: [
        CategoriesController
    ]
})
export class SuppliersCategoriesModule {

}