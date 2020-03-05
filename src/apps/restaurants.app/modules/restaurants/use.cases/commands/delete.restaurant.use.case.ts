import { Inject, HttpStatus, HttpException } from '@nestjs/common';
import { RestaurantsRepository, IRestaurantsRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';

export class DeleteRestaurantUseCase extends UseCase<string, boolean> {

    constructor(@Inject(RestaurantsRepository) private readonly restaurantsRepo: IRestaurantsRepository){
        super();
    }

    async buildUseCase(input?: string): Promise<boolean> {
        if (!input)
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        
        const result = await this.restaurantsRepo.deleteById(input);
        if (!result)
            throw new HttpException('Cannot delete restaurant', HttpStatus.BAD_REQUEST);

        return true;
    }
}