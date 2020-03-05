import { Entity } from './base.entity';


export interface ReviewEntity extends Entity {

    userID: string;
    comment: string;
    rating: number;
    
}