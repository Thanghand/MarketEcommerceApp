import { IClientAuthRepository } from './client-auth.repository.interface';
import { SignInResponse, SignInParam, SignupDto, UserResponse, CreatingUserParam } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ClientAuthRepository implements IClientAuthRepository {

    constructor(private readonly eventMessage: NatsClientService) {
    }

    async signIn(param: SignInParam): Promise<SignInResponse> {
        const result = await this.eventMessage.sendMessage<SignInResponse>(MessageEventName.AUTH_SIGNIN, param);
        return result;
    }

    async signUp(dto: SignupDto): Promise<UserResponse> {
        const result = await this.eventMessage.sendMessage<UserResponse>(MessageEventName.AUTH_SIGNUP, dto);
        return result;
    }

    async createUsers(param: CreatingUserParam): Promise<UserResponse[]> {
        const result = await this.eventMessage.sendMessage<UserResponse[]>(MessageEventName.AUTH_CREATE_USERS, param);
        return result;
    }


}