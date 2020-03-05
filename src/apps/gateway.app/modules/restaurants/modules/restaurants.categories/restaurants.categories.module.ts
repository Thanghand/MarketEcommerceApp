import { Module } from '@nestjs/common';
import { RestaurantsCategoriesController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        RestaurantsCategoriesController
    ]
})
export class RestaurantsCategoriesModule {

}