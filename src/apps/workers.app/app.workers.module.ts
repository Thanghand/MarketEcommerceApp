import { Module } from '@nestjs/common';
import { FileWorkerModule } from './modules/files/file.worker.module';
import { MailModule } from './modules/mail/mail.module';
import { UpdatingCollectionsModule } from './modules/updating-collections/updating-collections.module';

@Module({
    imports :[
       FileWorkerModule,
       MailModule,
       UpdatingCollectionsModule
    ]
})
export class AppWorkersModule {

}