import { MembershipRuleEntity, UpdatingMembershipRuleParam } from '@models';



export interface IClientMembershipRuleRepository {
    
    getMembershipRuleActive(): Promise<MembershipRuleEntity>;
    updateMembershipRule(param: UpdatingMembershipRuleParam): Promise<MembershipRuleEntity>;
}