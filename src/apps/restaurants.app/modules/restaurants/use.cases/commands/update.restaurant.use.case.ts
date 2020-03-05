import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantDomain } from '../../models';
import { RestaurantEntity, UpdatingRestaurantDto, UpdatingRestaurantParam } from '@models';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';

@Injectable()
export class UpdateRestaurantUseCase extends UseCase<UpdatingRestaurantParam, RestaurantEntity> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepository: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingRestaurantParam): Promise<RestaurantEntity> {
        const {id, dto} = input;
        
        if (!id || this.isMissingFields(dto))
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const entity = await this.restaurantRepository.getById(id);
        const restaurantDomain = new RestaurantDomain(entity);
        restaurantDomain.updateRestaurant(dto);
        
        const result = await this.restaurantRepository.update(id, restaurantDomain.getEntity());

        if (!result)
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);

        return result;
    }

    private isMissingFields(input: UpdatingRestaurantDto): boolean {
        return !input;
    }
}