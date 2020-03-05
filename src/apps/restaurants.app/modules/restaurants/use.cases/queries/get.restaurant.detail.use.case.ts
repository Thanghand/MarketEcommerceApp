import { RestaurantEntity, RestaurantDetailInforResponse } from '@models';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { MapperRestaurants } from '../../../../libs/shared/utils';

@Injectable()
export class GetRestaurantDetailUseCase extends UseCase<string, RestaurantDetailInforResponse | RestaurantEntity> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }
    
    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<RestaurantDetailInforResponse | RestaurantEntity> {
        
        const entity = await this.restaurantRepo.getById(input);
        if (isGetEntity) {
            if (!entity)
                throw new HttpException('Can not found restaurant', HttpStatus.INTERNAL_SERVER_ERROR);
            return entity;
        }

        const response = MapperRestaurants.mappingEntityToResponseDetail(entity);
        return response;
    }

}