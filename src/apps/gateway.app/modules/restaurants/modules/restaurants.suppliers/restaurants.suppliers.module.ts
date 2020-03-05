import { Module } from '@nestjs/common';
import { RestaurantsSuppliersController } from './controllers/restaurants.suppliers.controller';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { NatsClientService } from '@libs/nats/nats-client.service';



@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [RestaurantsSuppliersController],
    providers: [NatsClientService]
})
export class RestaurantsSuppliersModule {}