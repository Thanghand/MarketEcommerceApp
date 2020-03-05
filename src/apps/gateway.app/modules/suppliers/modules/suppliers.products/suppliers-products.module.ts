import { Module } from '@nestjs/common';
import { SuppliersProductsController } from './controllers';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { ClientProductsRepository } from '@libs/repositories';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        SuppliersProductsController    
    ],
})
export class SuppliersProductsModule {

}