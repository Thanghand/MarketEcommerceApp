import { MembershipDetailQuery, MembershipEntity, CreatingMembershipParam, UpdatingMembershipParam, MembershipQuery, CreatingMembershipDto, UpdatingMembershipDto, MembershipRuleDetailResponse } from '@models';

export interface IClientMembershipRepository {
    getDetail(query: MembershipDetailQuery): Promise<MembershipRuleDetailResponse>;
    create(param: CreatingMembershipDto): Promise<MembershipEntity>;
    update(param: UpdatingMembershipDto): Promise<MembershipEntity>;
    getMemberships(query: MembershipQuery): Promise<MembershipEntity[]>;
}