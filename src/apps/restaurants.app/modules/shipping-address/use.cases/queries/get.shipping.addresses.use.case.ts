import { UseCase } from '@shared.core';
import { ShippingAddressEntity } from '@models';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ShippingAddressQueries } from '@models';
import { MessageConstant } from '@shared.all/constants';
import { IRestaurantsRepository, RestaurantsRepository } from '../../../restaurants/repositories';

@Injectable()
export class GetShippingAddressesUseCase extends UseCase<ShippingAddressQueries, ShippingAddressEntity[]> {
    
    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }
    
    async  buildUseCase(input?: ShippingAddressQueries, isGetEntity?: boolean): Promise<ShippingAddressEntity[]> {

        if (this.isMissingFields(input)) {
            console.error('Missing Fields');
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const result = await this.restaurantRepo.getById(input.restaurantId);
        if (!input.listShippingAddressId) {
            return result.shippingAddresses;
        }
        const shippingAddresses = result.shippingAddresses.filter(i => this.isShippingAddressContain(input.listShippingAddressId, i._id));
        return shippingAddresses;
    }

    private isMissingFields(input: ShippingAddressQueries): boolean {
        return !input || !input.restaurantId;
    }
    private isShippingAddressContain(listShippingAddressId: string[], shippingAddressId): boolean {
        return listShippingAddressId.find(s => s === shippingAddressId) !== undefined;
    }
    
}