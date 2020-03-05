import { ProductEntity, ProductSummaryResponse, ProductDetailResponse } from '@models';
import * as _ from 'lodash';
import { ImageUtil } from '@shared.all/utils';

export class MapperProduct {

    public static mappingProductEntityToResponse(input: ProductEntity): ProductSummaryResponse {
        const packSize = input.numberOfPackage > 1 ? `${input.numberOfPackage} x ${input.packing.quantity} ${input.packing.unit}`
                                : `${input.packing.quantity} ${input.packing.unit}`;
        const response: ProductSummaryResponse = {
            _id: input._id,
            name: input.name,
            originalPrice: input.originalPrice,
            brand: input.brand,
            packSize: packSize,
            description: input.description,
            discount: input.discount,
            active: input.active,
            image: input.images && input.images.length > 0 
                            ? ImageUtil.mergeSourceCDNToId(input.images.shift()) : ''
        };

        return response; 
    }

    public static mappingProductEntitiesToResponses(input: ProductEntity[]): ProductSummaryResponse[] {
       return input.map(p => this.mappingProductEntityToResponse(p));
    }

    public static mappingProductEntityToProductDetailResponse(input: ProductEntity): ProductDetailResponse {

        const packSize = input.numberOfPackage > 1 ? `${input.numberOfPackage} x ${input.packing.quantity} ${input.packing.unit}`
                                : `${input.packing.quantity} ${input.packing.unit}`;

        const response: ProductDetailResponse = {
            _id: input._id,
            name: input.name,
            originalPrice: input.originalPrice,
            brand: input.brand,
            categories: input.categories,
            packSize: packSize,
            description: input.description,
            reviews: input.reviews,
            discount: input.discount,
            active: input.active,
            images: input.images.map(i => ImageUtil.mergeSourceCDNToId(i))
        };
        return response;
    }

}