import { IBaseRepository } from '@shared.core';
import { MembershipEntity, MembershipQuery, MembershipDetailQuery } from '@libs/models';


export interface IMembershipRepository extends IBaseRepository<MembershipEntity> {

    getMemberships(query: MembershipQuery): Promise<MembershipEntity[]>;
    getMembershipDetail(query: MembershipDetailQuery): Promise<MembershipEntity>;

}