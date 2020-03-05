import { OrderEntity } from '@models';
import { Injectable } from '@nestjs/common';
import { NatsClientService } from '@libs/nats/nats-client.service';

export interface IClientOrderRepository {
    getOderDetail(id: string): Promise<OrderEntity>;
}

@Injectable()
export class ClientOrderRepository implements IClientOrderRepository {

    constructor(private readonly natsClient: NatsClientService) {
    }
    
    async getOderDetail(id: string): Promise<OrderEntity> {
        const order = await this.natsClient.sendMessage<OrderEntity>('order.id', id);
        return order;
    }
}