import { UseCase } from '@shared.core';
import { ShippingAddressEntity, ShippingAddressDto } from '@models';
import { IRestaurantsRepository, RestaurantsRepository } from '../../../restaurants/repositories';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapperShippingAddress } from '../../../../libs/shared/utils';

@Injectable()
export class CreateShippingAddressUseCase extends UseCase<[string, ShippingAddressDto], ShippingAddressEntity> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: [string, ShippingAddressDto], isGetEntity?: boolean): Promise<ShippingAddressEntity> {

        const id = input[0];
        const dto = input[1];

        const newShippingAddress = MapperShippingAddress.mappingShippingDtoToEntity(dto);
        const restaurant = await this.restaurantRepo.getById(id);

        // Update list shippingAddress
        const size = restaurant.shippingAddresses.length;
        restaurant.shippingAddresses.push(newShippingAddress);
        const result = await this.restaurantRepo.update(id, restaurant);
        if (result.shippingAddresses.length === size) {
            console.log('Cannot add new shipping address');
            throw new HttpException('Sorry cannot add new shipping address', HttpStatus.BAD_REQUEST);
        }
        return newShippingAddress;
    }

    isMissingFields(input: ShippingAddressDto): boolean {
        return true;
    }
}