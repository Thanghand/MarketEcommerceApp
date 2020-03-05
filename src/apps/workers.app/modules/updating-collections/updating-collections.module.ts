import { Module } from '@nestjs/common';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { UpdatingUsersInCompanyMigration } from './migrations/updating-users-restaurants.migration';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    providers: [
        UpdatingUsersInCompanyMigration
    ]
})
export class UpdatingCollectionsModule {
    
}