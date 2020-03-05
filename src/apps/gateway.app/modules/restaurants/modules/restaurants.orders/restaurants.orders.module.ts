import { Module } from '@nestjs/common';
import { RestaurantsOrdersController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        RestaurantsOrdersController
    ],
})
export class RestaurantsOrdersModule {

}