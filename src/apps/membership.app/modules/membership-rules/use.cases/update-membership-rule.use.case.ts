import { UseCase } from '@shared.core';
import { MembershipRuleEntity, UpdatingMembershipRuleParam } from '@models';
import { Inject } from '@nestjs/common';
import { MembershipRuleRepository, IMembershipRuleRepository } from '../repositories';
import { MembershipRuleDomain } from '../models/domains/membership-rule.domain';


export class UpdateMembershipRuleUseCase extends UseCase<UpdatingMembershipRuleParam, MembershipRuleEntity> {

    constructor(@Inject(MembershipRuleRepository) private readonly ruleRepo: IMembershipRuleRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingMembershipRuleParam, isGetEntity?: boolean): Promise<MembershipRuleEntity> {


        const {_id, dto} = input;

        const entity = await this.ruleRepo.getById(_id);
        const domain = new MembershipRuleDomain(entity);
        domain.update(dto);
        
        const result = await this.ruleRepo.update(_id, domain.getEntity());
        return result;
    }
    
}