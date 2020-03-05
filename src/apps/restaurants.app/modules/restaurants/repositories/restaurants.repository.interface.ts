import { RestaurantEntity, RestaurantSummaryEntity } from '@models';
import { IBaseRepository } from '@shared.core';

export interface IRestaurantsRepository extends IBaseRepository<RestaurantEntity> {
    find(query: any): Promise<RestaurantSummaryEntity[]> ;
}