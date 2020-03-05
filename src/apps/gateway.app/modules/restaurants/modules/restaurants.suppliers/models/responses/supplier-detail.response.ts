import { SupplierEntity, RatingEntity } from '@libs/models';

export class SupplierDetailResponse {
    detail: SupplierEntity;
    rating: RatingEntity;
}