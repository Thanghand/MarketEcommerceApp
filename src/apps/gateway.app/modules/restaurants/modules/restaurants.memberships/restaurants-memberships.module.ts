import { Module } from '@nestjs/common';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { RestaurantsMembershipController } from './controllers/restaurants-memberships.controller';

@Module({
    imports: [
        ClientRepositoriesModule,
    ],
    controllers: [
        RestaurantsMembershipController,
    ]
})
export class RestaurantsMembershipsMoudle {

}