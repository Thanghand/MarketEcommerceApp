import { Entity, Role, LocationEntity } from '..';
import {BaseRecordEntity } from './base.record.entity';

export interface RecordUserChanged extends BaseRecordEntity {
    firstName?: string;
    lastName?: string;
}

export interface UserEntity extends Entity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    companyId: string;
    companyType: string;
    avatar?: string;
    role: Role;
    descriptions?: string;
    location: LocationEntity;
    shippingAddress?: string[];
    transactions: RecordUserChanged[];
}

