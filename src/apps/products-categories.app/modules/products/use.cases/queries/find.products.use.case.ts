import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { MapperProduct } from '../../utils';
import { ProductRepository, IProductRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { ProductQuerying, ProductSummaryResponse } from '@models';

@Injectable()
export class FindProductsUseCase extends UseCase<ProductQuerying, ProductSummaryResponse[]> {
    
    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository) {
        super();
    }

    async buildUseCase(input?: ProductQuerying): Promise<ProductSummaryResponse[]> {
        if (!input)
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const entities = await this.productRepository.findProducts(input);
        return MapperProduct.mappingProductEntitiesToResponses(entities);
    }
    
}