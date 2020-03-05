import { Module } from '@nestjs/common';
import { SendTestUseCase, SendEmailInvoiceUseCase, SendEmailOrderUseCase } from './use.cases';
import { MailsController } from './controllers/mails.controller';
import { MailService } from './services/mail.service';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { MailsHandler } from './handlers/mails.handler';
import { NatsClientService } from '@libs/nats/nats-client.service';

@Module({
  imports: [
    ClientRepositoriesModule,
  ],
  controllers: [
    MailsController,
    MailsHandler
  ],
  providers: [
    MailService,
    SendTestUseCase,
    SendEmailInvoiceUseCase,
    SendEmailOrderUseCase,
    NatsClientService
  ]
})
export class MailModule {

}