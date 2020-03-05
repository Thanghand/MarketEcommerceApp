
import { Entity } from './base.entity';

export interface CompanySummaryEntity extends Entity {
    phoneNumber?: string;
    email: string;
}