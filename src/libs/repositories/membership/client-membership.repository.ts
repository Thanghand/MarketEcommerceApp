import { IClientMembershipRepository } from './client-membership.repository.interface';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MembershipDetailQuery, MembershipEntity, MembershipQuery, CreatingMembershipDto, UpdatingMembershipDto, MembershipRuleDetailResponse } from '@models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientMembershipRepository implements IClientMembershipRepository {
    
    constructor(private readonly eventMessage: NatsClientService) {
    }

    async getDetail(query: MembershipDetailQuery): Promise<MembershipRuleDetailResponse> {
        const result = await this.eventMessage.sendMessage<MembershipRuleDetailResponse>(MessageEventName.MEMBERSHIP_GET_DETAIL, query);
        return result;
    }

    async create(param: CreatingMembershipDto): Promise<MembershipEntity> {
        const result = await this.eventMessage.sendMessage<MembershipEntity>(MessageEventName.MEMBERSHIP_CREATE, param);
        return result;
    }
    async update(param: UpdatingMembershipDto): Promise<MembershipEntity> {
        const result = await this.eventMessage.sendMessage<MembershipEntity>(MessageEventName.MEMBERSHIP_UPDATE, param);
        return result;
    }
    async getMemberships(query: MembershipQuery): Promise<MembershipEntity[]> {
        const result = await this.eventMessage.sendMessage<MembershipEntity[]>(MessageEventName.MEMBERSHIP_GET_ALL, query);
        return result;
    }


}