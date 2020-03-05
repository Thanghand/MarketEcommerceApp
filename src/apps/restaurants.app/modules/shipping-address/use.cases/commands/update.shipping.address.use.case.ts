import { UseCase } from '@shared.core';
import { ShippingAddressEntity, ShippingAddressDto } from '@models';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RestaurantsRepository, IRestaurantsRepository } from '../../../restaurants/repositories';
import * as _ from 'lodash';
import { MapperShippingAddress } from '../../../../libs/shared/utils';

@Injectable()
export class UpdateShippingAddressUseCase extends UseCase<[string, string, ShippingAddressDto], ShippingAddressEntity> {
   
    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: [string, string, ShippingAddressDto], isGetEntity?: boolean): Promise<ShippingAddressEntity> {

        const id = input[0];
        const shippingId = input[1];
        const dto = input[2];

        const restaurant = await this.restaurantRepo.getById(id);
        const entity = MapperShippingAddress.mappingShippingDtoToEntity(dto, shippingId);

        if (!restaurant.shippingAddresses || restaurant.shippingAddresses.length === 0)
            throw new HttpException('Sorry we cannot find this address', HttpStatus.BAD_REQUEST);

        const indexOfUpdatingAddress = restaurant.shippingAddresses.findIndex(i => i._id === entity._id);
        if (indexOfUpdatingAddress === -1)
            throw new HttpException('Sorry we cannot find this address', HttpStatus.BAD_REQUEST);

        restaurant.shippingAddresses[indexOfUpdatingAddress] = entity;
        const result = await this.restaurantRepo.update(id, restaurant);
        const updatedEntity = result.shippingAddresses.find(i => i._id === entity._id);

        if (!updatedEntity 
            || updatedEntity == null
            || updatedEntity.address !== entity.address
            || updatedEntity.name !== entity.name
            || updatedEntity.contactPhoneNumber !== entity.contactPhoneNumber) {
                console.log(`Update shipping address: ${entity._id} - ${entity.name} failed`);
                throw new HttpException('Sorry we cannot update shipping address', HttpStatus.BAD_REQUEST);
            }
            
        return entity;
    }

}