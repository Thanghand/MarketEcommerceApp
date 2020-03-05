import { ClientNats, NatsOptions } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/external/nats-client.interface';

export class CustomClientNats extends ClientNats {
    
    constructor(protected readonly options: NatsOptions['options']) {
        super(options);
    }
    public getNatsClient(): Client {
        return this.natsClient;
    }
}