import { Entity } from './base.entity';

export interface ItemRating  {
    point: number;
    comment: string;
    order: {
        _id: string;
        orderNumber: string;
    };
}

export interface RatingEntity extends Entity {
    supplierId: string;
    totalPoint: number;
    ratings: ItemRating[];
}