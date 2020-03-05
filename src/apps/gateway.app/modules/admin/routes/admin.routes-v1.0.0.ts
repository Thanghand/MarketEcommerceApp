import { Routes } from 'nest-router';
import { AdminProductsModule, AdminIdModule, AdminCategoriesModule, AdminRestaurantsModule, AdminSuppliersModule, AdminOrdersModule, AdminInvoiceModule } from '../modules';
import { AdminMembershipModule } from '../modules/admin.memberships/admin-membership.module';

const v1 = 'admin/v1.0.0';
export const adminRoutesV100: Routes = [
  {
    path: v1,
    children: [
      {
        path: '/id',
        module: AdminIdModule,
      },
      {
        path: '/restaurants',
        module: AdminRestaurantsModule
      },
      {
        path: '/suppliers',
        module: AdminSuppliersModule
      },
      {
        path: '/categories',
        module: AdminCategoriesModule,
      },
      {
        path: '/products',
        module: AdminProductsModule
      },
      {
        path: '/orders',
        module: AdminOrdersModule
      },
      {
        path: '/invoices',
        module: AdminInvoiceModule,
      },
      {
        path: '/memberships',
        module: AdminMembershipModule
      }
    ]
  },
]; 