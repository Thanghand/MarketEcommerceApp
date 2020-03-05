import { IBaseRepository } from '@shared.core';
import { MembershipRuleEntity } from '@models';


export interface IMembershipRuleRepository extends IBaseRepository<MembershipRuleEntity> {
    getMembershipRuleDetail(active: boolean): Promise<MembershipRuleEntity>;
}