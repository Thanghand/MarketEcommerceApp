import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { SuppliersInfoModule, SuppliersProductsModule, SuppliersIdModule, SuppliersCategoriesModule, SuppliersOrdersModule, SuppliersInvoicesModule} from './modules';
import { suppliersRoutesV100 } from './routes';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';

import { RouteInfo } from '@nestjs/common/interfaces';
import { ExecluedRoutes } from '@shared.all/middlewares/exclued.routes';
import { AppServiceNameConfig } from '@shared.all/config';
import { AuthAppMiddleWare } from '@shared.all/middlewares/auth-app.middleware';


const excludeRoutes: RouteInfo[] = [
    {
      path: 'signIn',
      method: RequestMethod.POST
    },
    {
      path: 'password',
      method: RequestMethod.GET
    }
  ];
ExecluedRoutes.getInstance()
    .addExecluedRoutes(AppServiceNameConfig.Id, excludeRoutes);


@Module({
  imports: [
    LibAuthModule,
    RouterModule.forRoutes([
      ...suppliersRoutesV100
    ]),
    SuppliersIdModule,
    SuppliersInfoModule,
    SuppliersProductsModule,
    SuppliersCategoriesModule,
    SuppliersOrdersModule,
    SuppliersInvoicesModule,
  ]
})
export class AppSuppliersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthAppMiddleWare)
      .forRoutes('/');
  }
}