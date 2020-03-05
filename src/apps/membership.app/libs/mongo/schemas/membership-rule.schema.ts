import { BaseSchema } from '@libs/mongo';
import { MembershipRuleEntity, MembershipRuleConfigEntity } from '@libs/models/entities/membership-rule.entity';
import { Entity, Column } from 'typeorm';


@Entity('membership-rules')
export class MembershipRuleSchema extends BaseSchema implements MembershipRuleEntity {
    
    @Column() configs: MembershipRuleConfigEntity[];    
}