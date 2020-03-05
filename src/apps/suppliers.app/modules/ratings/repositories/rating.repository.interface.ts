import { IBaseRepository } from '@shared.core';
import { RatingEntity } from '@libs/models';


export interface IRatingRepository extends IBaseRepository<RatingEntity> {
    getRatingBySupplierId(id: string): Promise<RatingEntity>;
}