import { UseCase } from '@shared.core';
import { RatingDto, RatingEntity } from '@models';
import { Inject, HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { RatingRepository, IRatingRepository } from '../../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { MessageConstant } from '@shared.all/constants';
import { RatingDomain } from '../../models';

@Injectable()
export class CreateNewRatingUseCase extends UseCase<RatingDto, RatingEntity> {

    private readonly _tag = 'CreateNewRatingUseCase';
    constructor(@Inject(RatingRepository) private readonly ratingRepo: IRatingRepository,
                private readonly loggerSerivce: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: RatingDto, isGetEntity?: boolean,): Promise<RatingEntity> {

        if (!input || input.supplierId) {
            this.loggerSerivce.error(MessageConstant.MISSING_FIELDS, this._tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const entity = await this.ratingRepo.getRatingBySupplierId(input.supplierId);
        if (!entity) {
            const domain = new RatingDomain();
            domain.createFirstRating(input);
            const result = await this.ratingRepo.create(domain.getEntity());
            return result;
        }

        const domain = new RatingDomain(entity);
        domain.updateRating(input);
        const result = await this.ratingRepo.update(entity._id, domain.getEntity());
        return result;
    }
    
}