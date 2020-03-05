import { Module } from '@nestjs/common';
import { AdminRestaurantsController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminRestaurantsController
    ]
})
export class AdminRestaurantsModule {}