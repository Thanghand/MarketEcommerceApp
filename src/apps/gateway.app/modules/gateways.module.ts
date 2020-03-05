import { Module } from '@nestjs/common';
import { AppAdminModule, AppRestaurantsModule, AppSuppliersModule } from '.';

@Module({
    imports: [
        AppAdminModule,
        AppRestaurantsModule,
        AppSuppliersModule
    ]
})
export class GatewayModule {
}