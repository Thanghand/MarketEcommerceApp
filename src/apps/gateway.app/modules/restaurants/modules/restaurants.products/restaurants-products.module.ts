import { Module } from '@nestjs/common';
import { RestaurantsProductsController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        RestaurantsProductsController    
    ]
})
export class RestaurantsProductsModule {

}