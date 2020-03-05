import { UseCase } from '@shared.core';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { RestaurantDomain } from '../../models';
import { UpdatingUsersInRestaurantParam, UpdatingUsersInCompanyParam } from '@libs/models';

@Injectable()
export class UpdateUsersInRestaurantUseCase extends UseCase <UpdatingUsersInCompanyParam, boolean> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantRepo: IRestaurantsRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingUsersInCompanyParam, isGetEntity?: boolean): Promise<boolean> {

        if (!input) {
            throw new HttpException('Input users is null', HttpStatus.BAD_GATEWAY);
        }

        const {_id, users} = input;
        
        const entity = await this.restaurantRepo.getById(_id);
        const domain = new RestaurantDomain(entity);
        domain.updateUsersInRestaurant(users);

        const result = await this.restaurantRepo.update(_id, domain.getEntity());
        if (result.users !== users)
            return false;

        return true;
    }
    
}