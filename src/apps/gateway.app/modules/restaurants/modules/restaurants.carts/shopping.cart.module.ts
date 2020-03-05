import { Module } from '@nestjs/common';
import { ShoppingCartController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';



@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        ShoppingCartController
    ],
})
export class ShoppingCartModule {

}