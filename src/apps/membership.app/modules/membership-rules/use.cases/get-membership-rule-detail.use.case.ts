import { UseCase } from '@shared.core';
import { MembershipRuleEntity } from '@models';
import { Inject } from '@nestjs/common';
import { IMembershipRuleRepository, MembershipRuleRepository } from '../repositories';
import { MembershipRuleDomain } from '../models/domains/membership-rule.domain';


export class GetMembershipRuleDetailUseCase extends UseCase<boolean, MembershipRuleEntity> {

    constructor(@Inject(MembershipRuleRepository) private readonly ruleRepo: IMembershipRuleRepository) {
        super();
    }
    
    async buildUseCase(active?: boolean, isGetEntity?: boolean): Promise<MembershipRuleEntity> {

        const entity = await this.ruleRepo.getMembershipRuleDetail(active);
        
        if (entity === null) {
            const ruleDomain = new MembershipRuleDomain();
            ruleDomain.create();
            const result = await this.ruleRepo.create(ruleDomain.getEntity());
            return result;
        }
        return entity;
    }
    
}