import { IClientMembershipRuleRepository } from './client-membership-rule.repository.interface';
import { MembershipRuleEntity, UpdatingMembershipRuleParam } from '@models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { Injectable } from '@nestjs/common';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Injectable()
export class ClientMembershipRuleRepository implements IClientMembershipRuleRepository {
  
    constructor(private readonly eventMessage: NatsClientService) {

    }
    
    async getMembershipRuleActive(): Promise<MembershipRuleEntity> {
        const result = await this.eventMessage.sendMessage<MembershipRuleEntity>(MessageEventName.MEMBERSHIP_RULE_DETAIL, true);
        return result;
    }

    async updateMembershipRule(param: UpdatingMembershipRuleParam): Promise<MembershipRuleEntity> {
        const result = await this.eventMessage.sendMessage<MembershipRuleEntity>(MessageEventName.MEMBERSHIP_RULE_UPDATE, param);
        return result;
    }
}