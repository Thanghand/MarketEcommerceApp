import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';



@Module({
    imports: [
        RestaurantsModule,
        ShippingAddressModule
    ]
})
export class AppRestaurantsModule {
    constructor() {
    }
}