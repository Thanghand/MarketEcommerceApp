import { ProductEntity, ProductDetailResponse } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ProductRepository, IProductRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { MapperProduct } from '../../utils';
import { MessageConstant } from '@shared.all/constants';
import { ImageUtil } from '@shared.all/utils';

export class GetProductDetailUseCase extends UseCase<string, ProductDetailResponse | ProductEntity> {
  
    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository) {
        super();
    }
    
    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<ProductDetailResponse | ProductEntity> {
        if (!input)
        throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const entity = await this.productRepository.getById(input);
        if (isGetEntity) {
            entity.images = entity.images.map(item => ImageUtil.mergeSourceCDNToId(item));
            return entity;
        }
        return MapperProduct.mappingProductEntityToProductDetailResponse(entity);
    }
    
}