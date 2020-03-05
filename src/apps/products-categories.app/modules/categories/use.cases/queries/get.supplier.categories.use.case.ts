import { UseCase } from '@shared.core';
import { CategorySummaryEntity } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository, IProductRepository } from '../../../products/repositories';

@Injectable()
export class GetSupplierCategoriesUseCase extends UseCase<string, CategorySummaryEntity[]> {


    constructor (@Inject(ProductRepository) private readonly productRepo: IProductRepository) {
        super();
    }

    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<CategorySummaryEntity[]> {
        const result = await this.productRepo.groupCategoriesBySupplier(input);
        return result;
    }
    
}