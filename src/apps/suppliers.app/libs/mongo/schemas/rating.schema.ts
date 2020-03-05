import { BaseSchema } from '@libs/mongo';
import { RatingEntity, ItemRating } from '@models';
import { Entity, Column } from 'typeorm';

@Entity('ratings')
export class RatingSchema extends BaseSchema implements RatingEntity {

    @Column() totalPoint: number;    
    @Column() ratings: ItemRating[];
    @Column() supplierId: string;

}