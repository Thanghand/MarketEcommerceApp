import { IClientUserRepository } from './client-user.repository.interface';
import { UserEntity, UserResponse, UpdatingUserParam } from '@models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientUserRepository implements IClientUserRepository {

    constructor(private readonly natsClient: NatsClientService) {

    }

    async getById(id: string): Promise<UserEntity> {
        const result = await this.natsClient.sendMessage<UserEntity>(MessageEventName.USERS_DETAIL, id);
        return result;
    }

    async updateShippingAddress(id: string, item: UserEntity): Promise<UserEntity> {
        const result = await this.natsClient.sendMessage<UserEntity>(MessageEventName.USERS_UPDATE_ENTITY, [id, item]);
        return result;
    }

    async getUsersInCompany(companyId: string): Promise<UserResponse[]> {
        const result = await this.natsClient.sendMessage<UserResponse[]>(MessageEventName.USERS_LIST_COMPANY, companyId);
        return result;
    }

    async getUserDetail(id: string): Promise<UserResponse> {
        const result = await this.natsClient.sendMessage<UserResponse>(MessageEventName.USERS_DETAIL, id);
        return result;
    }

    async updateUser(param: UpdatingUserParam): Promise<UserResponse> {
        const result = await this.natsClient.sendMessage<UserResponse>(MessageEventName.USERS_UPDATE, param);
        return result;
    }


    async deleteUser(id: string): Promise<boolean> {
        const result = await this.natsClient.sendMessage<boolean>(MessageEventName.USERS_DELETE, id);
        return result;
    }

}