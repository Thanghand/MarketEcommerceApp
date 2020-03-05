import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RestaurantsRepository, IRestaurantsRepository } from '../../../restaurants/repositories';
import { MessageConstant } from '@shared.all/constants';
import * as _ from 'lodash';
import { RestaurantEntity } from '@models';


@Injectable()
export class DeleteShippingAddressUseCase extends UseCase<[string, string], boolean> {

    constructor(@Inject(RestaurantsRepository)private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: [string, string], isGetEntity?: boolean): Promise<boolean> {
        const id = input[0];
        const shippingAddressId = input[1];

        const restaurant = await this.restaurantRepo.getById(id) as RestaurantEntity;
        if (!restaurant || 
            !restaurant.shippingAddresses 
            || restaurant.shippingAddresses.length === 0) {
            console.log('ShippingAddresses is empty');
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_GATEWAY);
        }
        _.remove(restaurant.shippingAddresses, i => i._id === shippingAddressId);
        const result = await this.restaurantRepo.update(restaurant._id.toString(), restaurant);
        if (restaurant.shippingAddresses.length !== result.shippingAddresses.length) {
            console.log('ShippingAddresses is different');
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_GATEWAY);
        }
        return true;
    }
}