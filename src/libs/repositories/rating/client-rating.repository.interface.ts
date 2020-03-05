import { RatingDto, RatingEntity } from '@models';



export interface IClientRatingRepository {
    createNewRating(dto: RatingDto): Promise<RatingEntity>;
    getRating(supplierId: string): Promise<RatingEntity>;
}