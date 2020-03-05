import { BaseDomain, RatingEntity, RatingDto } from '@models';
import * as Enummrable from 'linq';

export class RatingDomain extends BaseDomain<RatingEntity> {

    createFirstRating(dto: RatingDto) {
        const entity: RatingEntity = {
            ratings: [{
                point: dto.point,
                comment: dto.comment,
                order: {
                    _id: dto.orderId,
                    orderNumber: dto.orderNumber
                }
            }],
            supplierId: dto.supplierId,
            totalPoint: dto.point
        };
        this.entity = entity;
    }

    updateRating(dto: RatingDto) {
        this.entity.ratings.push({
            point: dto.point,
            comment: dto.comment,
            order: {
                _id: dto.orderId,
                orderNumber: dto.orderNumber
            }
        });
        this.entity.totalPoint = Enummrable.from(this.entity.ratings).sum(r => r.point) / this.entity.ratings.length;
    }

}