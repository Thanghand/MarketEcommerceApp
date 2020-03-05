import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { FilesCreatorModule } from './files-creator/files-creator.module';
import { FilesManagerModule } from './files-manager/files-manager.module';
import { AuthAppMiddleWare } from '@shared.all/middlewares/auth-app.middleware';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';


@Module({
    imports: [
        LibAuthModule,
        FilesCreatorModule,
        FilesManagerModule
    ]
})
export class AppFilesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthAppMiddleWare)
            .forRoutes('/');
    }
}