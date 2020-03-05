import { Module } from '@nestjs/common';
import {IdModule} from '../../id.app/modules/id.module';
import { AppRestaurantsModule } from '../../restaurants.app/modules/app-restaurants.module';
import { AppSuppliersModule } from '../../suppliers.app/modules/app-suppliers.module';
import { AppCompanyModule } from '../../company.app/modules/app-company.module';
import { AppProductsCategoriesModule } from '../../products-categories.app/modules/app.products.categories.module';
import { AppOrdersMoudle } from '../../orders.app/modules/app-orders.module';
import { AppMemberShipModule } from '../../membership.app/modules/app-membership.module';
import { GatewayModule } from 'src/apps/gateway.app/modules/gateways.module';

@Module({
    imports: [
        IdModule,
        AppRestaurantsModule,
        AppSuppliersModule,
        AppCompanyModule,
        AppProductsCategoriesModule,
        AppOrdersMoudle,
        AppMemberShipModule
    ]
})
export class AppsModule {
}