import { Controller } from '@nestjs/common';
import { CreateNewRatingUseCase, GetRatingUseCase } from '../use.cases';
import { RatingDto, RatingEntity } from '@libs/models';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';


@Controller()
export class RatingsController {

    constructor(private readonly createNewRatingUseCase: CreateNewRatingUseCase,
                private readonly getRatingUseCase: GetRatingUseCase) {
    }

    @MessagePattern(MessageEventName.RATINGS_CREATE)
    async createNewRating(dto: RatingDto): Promise<RatingEntity> {
        const result = await this.createNewRatingUseCase.execute(dto);
        return result;
    }

    @MessagePattern(MessageEventName.RATINGS_GET)
    async getRating(supplierId: string): Promise<RatingEntity> {
        const result = await this.getRatingUseCase.execute(supplierId);
        return result;
    }
}