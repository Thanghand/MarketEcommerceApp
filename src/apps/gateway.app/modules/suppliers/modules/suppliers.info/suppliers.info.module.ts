import { Module } from '@nestjs/common';
import { SuppliersInfoController } from './controllers';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { NatsClientService } from '@libs/nats/nats-client.service';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    providers: [
        NatsClientService,
    ],
    controllers: [
        SuppliersInfoController
    ],
})
export class SuppliersInfoModule {}