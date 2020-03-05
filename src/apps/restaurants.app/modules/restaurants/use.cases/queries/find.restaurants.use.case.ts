import { Injectable, Inject } from '@nestjs/common';
import { RestaurantEntity, RestaurantSummaryEntity } from '@models';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { ImageUtil } from '@shared.all/utils';
   
@Injectable()
export class FindRestaurantsUseCase extends UseCase<any, RestaurantSummaryEntity[]> {
    
    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: any): Promise<RestaurantSummaryEntity[]> {
        const result = await this.restaurantRepo.find(input);
        result.forEach(r => r.logo = ImageUtil.mergeSourceCDNToId(r.logo));
        return result; 
    }
}