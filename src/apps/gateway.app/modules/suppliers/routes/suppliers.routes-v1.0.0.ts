import { Routes } from 'nest-router';
import {
  SuppliersInfoModule,
  SuppliersProductsModule,
  SuppliersIdModule,
  SuppliersCategoriesModule,
  SuppliersOrdersModule,
  SuppliersInvoicesModule
} from '../modules';

const v1 = 'suppliers/v1.0.0';
export const suppliersRoutesV100: Routes = [
  {
    path: v1,
    children: [
      {
        path: '/id',
        module: SuppliersIdModule
      },
      {
        path: '/information',
        module: SuppliersInfoModule
      },
      {
        path: '/products',
        module: SuppliersProductsModule
      },
      {
        path: '/categories',
        module: SuppliersCategoriesModule
      },
      {
        path: '/orders',
        module: SuppliersOrdersModule
      },
      {
        path: '/invoices',
        module: SuppliersInvoicesModule,
      }
    ]
  },
]; 