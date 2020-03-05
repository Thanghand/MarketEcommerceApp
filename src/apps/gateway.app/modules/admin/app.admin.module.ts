import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { adminRoutesV100 } from './routes';
import { AdminIdModule } from './modules/admin.id/admin.id.module';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { AuthAppMiddleWare } from '@shared.all/middlewares/auth-app.middleware';
import { AdminProductsModule, AdminCategoriesModule, AdminRestaurantsModule, AdminSuppliersModule, AdminOrdersModule, AdminInvoiceModule } from './modules';
import { AdminMembershipModule } from './modules/admin.memberships/admin-membership.module';


@Module({
  imports: [
    LibAuthModule,
    RouterModule.forRoutes([
      ...adminRoutesV100
    ]),
    AdminIdModule,
    AdminProductsModule,
    AdminCategoriesModule,
    AdminSuppliersModule,
    AdminRestaurantsModule,
    AdminOrdersModule,
    AdminInvoiceModule,
    AdminMembershipModule
  ]
})
export class AppAdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthAppMiddleWare)
      .forRoutes('/');
  }
}