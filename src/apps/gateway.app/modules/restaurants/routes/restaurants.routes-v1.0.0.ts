

import { Routes } from 'nest-router';
import {
  RestaurantsInfoModule,
  RestaurantsProductsModule,
  RestaurantsIdModule,
  RestaurantsCategoriesModule,
  ShoppingCartModule,
  RestaurantsOrdersModule,
  RestaurantsInvoicesModule,
  RestaurantsSuppliersModule,
  RestaurantsMembershipsMoudle,
  RatingModule,
} from '../modules';

const v1 = 'restaurants/v1.0.0';
export const restaurantsRoutesV100: Routes = [
  {
    path: v1,
    children: [
      {
        path: '/id',
        module: RestaurantsIdModule,
      },
      {
        path: '/information',
        module: RestaurantsInfoModule
      },
      {
        path: '/suppliers',
        module: RestaurantsSuppliersModule
      },
      {
        path: '/products',
        module: RestaurantsProductsModule,
      },
      {
        path: '/categories',
        module: RestaurantsCategoriesModule
      },
      {
        path: '/cart',
        module: ShoppingCartModule
      },
      {
        path: '/orders',
        module: RestaurantsOrdersModule
      },
      {
        path: '/invoices',
        module: RestaurantsInvoicesModule
      },
      {
        path: '/memberships',
        module: RestaurantsMembershipsMoudle
      },
      {
        path: '/rating',
        module: RatingModule
      }
    ]
  },
]; 