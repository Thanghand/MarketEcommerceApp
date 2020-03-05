import { MembershipOrderEntity } from '@libs/models/entities';




export class CreatingMembershipDto { 
    point: number;
    createdBy: {
        _id: string;
        name: string;
        email: string;
        restaurantId: string;
        restaurantName: string;
    };
    order: MembershipOrderEntity;
    date: string;
}