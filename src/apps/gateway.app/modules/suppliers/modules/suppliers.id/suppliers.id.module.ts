import { Module } from '@nestjs/common';
import { AuthController, UsersController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AuthController,
        UsersController
    ]
})
export class SuppliersIdModule {

}