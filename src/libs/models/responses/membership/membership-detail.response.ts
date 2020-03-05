import { MembershipEntity, MembershipRuleEntity } from '@libs/models/entities';


export interface MembershipRuleDetailResponse {
    detail: MembershipEntity;
    rule: MembershipRuleEntity;
}