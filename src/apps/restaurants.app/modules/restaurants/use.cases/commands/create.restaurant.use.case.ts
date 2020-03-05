import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantDomain } from '../../models';
import { RestaurantEntity, CreatingRestaurantDto } from '@models';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { UseCase } from '@shared.core';

@Injectable()
export class CreateRestaurantUsecase extends UseCase<CreatingRestaurantDto, RestaurantEntity> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepository: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: CreatingRestaurantDto): Promise<RestaurantEntity> {

        if (this.isMissingFields(input)) {
            console.error('Restaurant is missing fields');
            throw new HttpException('Restaurant is missing fields', HttpStatus.BAD_REQUEST);
        }

        const restaurantDomain = new RestaurantDomain();
        restaurantDomain.createRestaurant(input);
        return await this.restaurantRepository.create(restaurantDomain.getEntity());
    }

    private isMissingFields(input: CreatingRestaurantDto): boolean {
        return !input.name || !input.email;
    }
}
