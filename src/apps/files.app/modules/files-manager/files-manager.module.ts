import { Module, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { FileSourceManagerController } from './controllers';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { ExecluedRoutes } from '@shared.all/middlewares/exclued.routes';
import { AppServiceNameConfig } from '@shared.all/config';

const excludeRoutes: RouteInfo[] = [
    {
        path: 'images',
        method: RequestMethod.GET
    }
];


ExecluedRoutes.getInstance()
    .addExecluedRoutes(AppServiceNameConfig.FilesManagers, excludeRoutes);

@Module({
    imports: [
        LibAuthModule,
    ],
    controllers: [
        FileSourceManagerController
    ],
})
export class FilesManagerModule {

}
