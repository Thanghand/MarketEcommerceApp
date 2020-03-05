import { MembershipType } from '../enums/membership.type';
import { Entity } from '.';

export interface UserInfoMembershipEntity {
    _id: string;
    name: string;
    email: string;
    restaurant: {
        _id: string;
        name: string;
    }
}

export interface MembershipOrderEntity {
    _id: string;
    orderNumber: string;
    totalPrice: number;
    restaurant: Entity;
    supplier: Entity;
    updatedAt: Date;
}


export interface MembershipEntity extends Entity {
    point: number;
    lastDayOfMonth: Date;
    user: UserInfoMembershipEntity;
    type: MembershipType;
    orders: MembershipOrderEntity[];
    note: string;
    rule: Entity;
}