import { MembershipOrderEntity } from '@libs/models/entities';

export class UpdatingMembershipDto {
    point: number;
    date?: string;
    createdBy?: {
        _id: string;
        name: string;
        email: string;
        restaurantId: string;
        restaurantName: string;
    };
    order: MembershipOrderEntity;
}