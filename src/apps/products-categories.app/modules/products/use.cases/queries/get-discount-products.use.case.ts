import { UseCase } from '@shared.core';
import { ProductSumanryEntity } from '@models';
import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository, IProductRepository } from '../../repositories';

@Injectable()
export class GetDiscountProductsUseCase extends UseCase<any, ProductSumanryEntity[]> {

    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository) {
        super();
    }

    async buildUseCase(query?: any, isGetEntity?: boolean): Promise<ProductSumanryEntity[]> {
        const result = await this.productRepository.groupHotDealsByCategory(query);
        return result;
    }

}