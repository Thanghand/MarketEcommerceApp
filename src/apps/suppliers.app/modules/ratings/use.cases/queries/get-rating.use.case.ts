import { RatingEntity } from '@libs/models';
import { UseCase } from '@shared.core';
import { Inject, Injectable } from '@nestjs/common';
import { RatingRepository, IRatingRepository } from '../../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

@Injectable()
export class GetRatingUseCase extends UseCase<string, RatingEntity> {

    private readonly _tag = 'GetRatingUseCase';
    constructor(@Inject(RatingRepository) private readonly ratingRepo: IRatingRepository,
                private readonly loggerSerivce: MyLoggerService) {
        super();
    }

    async buildUseCase(supplierId?: string, isGetEntity?: boolean): Promise<RatingEntity> {

        const entity = await this.ratingRepo.getRatingBySupplierId(supplierId);
        if (!entity) {
            const emptyRating: RatingEntity = {
                totalPoint: 0,
                supplierId: supplierId,
                ratings: []
            };
            return emptyRating;
        }

        return entity;
    }
    
}