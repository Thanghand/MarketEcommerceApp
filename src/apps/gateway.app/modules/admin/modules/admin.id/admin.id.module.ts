import { Module, RequestMethod } from '@nestjs/common';
import { AuthController, UsersController } from './controllers';
import { RouteInfo } from '@nestjs/common/interfaces';
import { ExecluedRoutes } from '@shared.all/middlewares/exclued.routes';
import { AppServiceNameConfig } from '@shared.all/config';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';


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
      ClientRepositoriesModule,
    ],
    controllers: [
        AuthController,
        UsersController
    ]
})
export class AdminIdModule {

}