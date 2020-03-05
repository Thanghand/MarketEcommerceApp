import { Controller, Body, Inject, Post } from '@nestjs/common';
import { RatingDto, BodyResponse, RatingEntity, ResponseBuilder } from '@libs/models';
import { IClientRatingRepository, ClientRatingRepository } from '@libs/repositories';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('restaurants-ratings')
@Controller()
export class RatingController {

    constructor(@Inject(ClientRatingRepository) private readonly clientRatingRepo: IClientRatingRepository) {

    }

    @Post()
    async createNewRating(@Body() dto: RatingDto): Promise<BodyResponse<RatingEntity>> {
        const result = await this.clientRatingRepo.createNewRating(dto);
        return new ResponseBuilder<RatingEntity>()
                .data(result)
                .message('Create new rating successfully')
                .build();
    }
}