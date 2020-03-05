import { UseCase } from '@shared.core';
import { MembershipEntity, MembershipDetailQuery, MembershipRuleDetailResponse, MembershipType } from '@models';
import { Inject } from '@nestjs/common';
import { MembershipRepository, IMembershipRepository } from '../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { MembershipRuleRepository, IMembershipRuleRepository } from '../../membership-rules/repositories';
import { MembershipDomain } from '../models';


export class GetMembershipDetailUseCase extends UseCase<MembershipDetailQuery, MembershipRuleDetailResponse> {

    private readonly _tag: string = 'GetMembershipDetailUseCase';
    constructor(@Inject(MembershipRepository) private readonly memberRepo: IMembershipRepository,
        @Inject(MembershipRuleRepository) private readonly membershipRuleRepo: IMembershipRuleRepository,
        private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: MembershipDetailQuery, isGetEntity?: boolean): Promise<MembershipRuleDetailResponse> {
        let entity = await this.memberRepo.getMembershipDetail(input);
        const rule = await this.membershipRuleRepo.getMembershipRuleDetail(true);

        if (entity === null) {
            entity = {
                type: MembershipType.Member,
                point: 0,
                orders: [],
                lastDayOfMonth: new Date(),
                note: '',
                rule: null,
                user: null
            };
            const result: MembershipRuleDetailResponse = {
                detail: entity,
                rule: rule
            };
            return result;
        }
        
        if (entity.rule._id !== rule._id.toString() || entity.rule.updatedAt.getTime() !== rule.updatedAt.getTime()) {
            const membershipDomain = new MembershipDomain(entity);
            membershipDomain.recaculateMembershipType(rule);
            entity = await this.memberRepo.update(entity._id, membershipDomain.getEntity());
        }


        const result: MembershipRuleDetailResponse = {
            detail: entity,
            rule: rule
        };

        return result;
    }
}