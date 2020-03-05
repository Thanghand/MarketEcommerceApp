import { Entity } from './base.entity';
import { MembershipType } from '../enums';

export interface MembershipRuleConfigEntity {
    type: MembershipType;
    max: number;
    min: number;
    priority: number;
    note: string;
}

export interface MembershipRuleEntity extends Entity {
    configs: MembershipRuleConfigEntity[];
}