import { Module } from '@nestjs/common';
import { AdminProductsController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminProductsController    
    ],
})
export class AdminProductsModule {

}