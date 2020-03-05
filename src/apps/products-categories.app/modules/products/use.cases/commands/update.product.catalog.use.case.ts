import { ProductEntity, UpdatingProductCatalogParam } from '@models';
import { Inject } from '@nestjs/common';
import { ProductRepository, IProductRepository } from '../../repositories';
import * as _ from 'lodash';
import { UseCase } from '@shared.core';
import { ProductDomain } from '../../models/domains/product.domain';
import { CategoryRepository, ICategoryRepository } from '../../../categories/repositories';

export class UpdateProductCatalogUseCase extends UseCase<UpdatingProductCatalogParam, ProductEntity> {
    
    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository,
                @Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingProductCatalogParam): Promise<ProductEntity> {

        const {id, categoriesId} = input;
        
        const categoryEntities = await this.categoryRepository.findCategoriesWithGroupID(categoriesId);

        const productEntity = await this.productRepository.getById(id);

        const productDomain = new ProductDomain(productEntity);
        productDomain.changeCategories(categoriesId, categoryEntities);
        const result = await this.productRepository.update(id, productDomain.getEntity());
        return result;
    }
}