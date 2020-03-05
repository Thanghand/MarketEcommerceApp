import { Module } from '@nestjs/common';
import { 
    RestaurantsInfoController, 
    RestaurantShippingAddressController, 
    UserShippingAddressController
} from './controllers';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        RestaurantsInfoController,
        RestaurantShippingAddressController,
        UserShippingAddressController,
    ],
})
export class RestaurantsInfoModule {}