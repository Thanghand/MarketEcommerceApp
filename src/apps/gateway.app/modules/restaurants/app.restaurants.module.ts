import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import {
  RestaurantsInfoModule,
  RestaurantsProductsModule,
  RestaurantsIdModule,
  RestaurantsInvoicesModule,
  RestaurantsOrdersModule,
  ShoppingCartModule,
  RestaurantsCategoriesModule,
  RestaurantsSuppliersModule,
  RestaurantsMembershipsMoudle,
  RatingModule,
} from './modules';

import { restaurantsRoutesV100 } from './routes';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { AuthAppMiddleWare } from '@shared.all/middlewares/auth-app.middleware';

@Module({
  imports: [
    LibAuthModule,
    RouterModule.forRoutes([
      ...restaurantsRoutesV100,
    ]),
    RestaurantsIdModule,
    RestaurantsInfoModule,
    RestaurantsProductsModule,
    RestaurantsInvoicesModule,
    RestaurantsOrdersModule,
    ShoppingCartModule,
    RestaurantsCategoriesModule,
    RestaurantsSuppliersModule,
    RestaurantsMembershipsMoudle,
    RatingModule
  ],
})
export class AppRestaurantsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthAppMiddleWare)
      .forRoutes('/');
  }
}