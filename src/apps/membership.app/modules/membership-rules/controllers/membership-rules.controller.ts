import { Controller } from '@nestjs/common';
import { GetMembershipRuleDetailUseCase, UpdateMembershipRuleUseCase } from '../use.cases';
import { MembershipRuleEntity, UpdatingMembershipRuleDto, UpdatingMembershipRuleParam } from '@libs/models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class MembershipRulesController {

    constructor(private readonly getMembershipRuleDetailUseCase: GetMembershipRuleDetailUseCase,
                private readonly updateMembershipRuleUseCase: UpdateMembershipRuleUseCase) {

    }

    @MessagePattern(MessageEventName.MEMBERSHIP_RULE_DETAIL)
    async getMembershipRule(active: boolean): Promise<MembershipRuleEntity> {
        const result = await this.getMembershipRuleDetailUseCase.execute(active);
        return result;
    }

    @MessagePattern(MessageEventName.MEMBERSHIP_RULE_UPDATE)
    async updateMembershipRule(param: UpdatingMembershipRuleParam): Promise<MembershipRuleEntity> {
        const result = await this.updateMembershipRuleUseCase.execute(param);
        return result;
    }

}