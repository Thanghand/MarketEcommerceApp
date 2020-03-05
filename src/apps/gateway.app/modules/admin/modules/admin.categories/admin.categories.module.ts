import { Module } from '@nestjs/common';
import { AdminCategoriesController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminCategoriesController,
    ]
})
export class AdminCategoriesModule {
}
