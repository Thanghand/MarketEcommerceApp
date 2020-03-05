import { BaseDomain, MembershipEntity, TokenUserPayload, UserInfoMembershipEntity, MembershipType, UpdatingMembershipDto, MembershipRuleEntity, MembershipRuleConfigEntity } from '@models';
import { CreatingMembershipDto } from '@libs/models/dtos/membership/creating-membership.dto';

export class MembershipDomain extends BaseDomain<MembershipEntity> {

    create(dto: CreatingMembershipDto, rule: MembershipRuleEntity) {
        const user: UserInfoMembershipEntity = {
            _id: dto.createdBy._id,
            name: dto.createdBy.name,
            email: dto.createdBy.email,
            restaurant: {
                _id: dto.createdBy.restaurantId,
                name: dto.createdBy.restaurantName
            }
        };

        // caculate type
        const configType = this.caculateMembershipType(dto.point, rule);

        // caculate range date in months
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

        const entity: MembershipEntity = {
            point: dto.point,
            createdAt: today,
            updatedAt: today,
            lastDayOfMonth: lastDayOfMonth,
            user: user, 
            type: configType !== null ? configType.type: MembershipType.Member,
            orders: [dto.order],
            note: configType !== null ? configType.note : '',
            rule: {
                _id: rule._id.toString(),
                updatedAt: rule.updatedAt,
            }
        };
        this.entity = entity;
    }

    updatePoint(dto: UpdatingMembershipDto, rule: MembershipRuleEntity) {
        this.entity.point = this.entity.point + dto.point;
        this.entity.updatedAt = new Date(dto.date);
        const configRule = this.caculateMembershipType(this.entity.point, rule);
        this.entity.type = configRule !== null ? configRule.type : MembershipType.Member;
        this.entity.orders.push(dto.order);
        this.entity.note = configRule !== null ? configRule.note: '';
    }

    recaculateMembershipType(rule: MembershipRuleEntity) {
        const configRule = this.caculateMembershipType(this.entity.point, rule);
        this.entity.type = configRule !== null ? configRule.type : MembershipType.Member;
        this.entity.note = configRule !== null ? configRule.note: '';
        this.entity.rule = {
            _id: rule._id.toString(),
            updatedAt: rule.updatedAt
        };
    }
 
    private caculateMembershipType(point: number, rule: MembershipRuleEntity): MembershipRuleConfigEntity {
     
        for ( const r of rule.configs) {
            if (point > r.min && point <= r.max)
                return r;
        }

        // Is out of max range diamond
        return null;
    }

}