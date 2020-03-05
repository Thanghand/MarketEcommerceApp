import { ProductEntity, ProductCatalog, UpdatingProductInformationDto, UpdatingProductInformationParam } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { ProductRepository, IProductRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import * as _ from 'lodash';
import { ProductDomain } from '../../models/domains/product.domain';
import * as Enumerable from 'linq';
import { CategoryRepository, ICategoryRepository } from '../../../categories/repositories';

export class UpdateProductInformationUseCase extends UseCase<UpdatingProductInformationParam, ProductEntity> {

    constructor(@Inject(ProductRepository) private readonly productRepository: IProductRepository,
        @Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingProductInformationParam): Promise<ProductEntity> {
        const {id, dto} = input;

        if (this.isMissingFields(dto))
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const productEntity = await this.productRepository.getById(id);
        const productDomain = new ProductDomain(productEntity);

        const categoriesId = dto.categoriesId;

        if (this.isDifferentCateogires(dto.categoriesId, productEntity.categories)) {
            const categoryEntities = await this.categoryRepository.findCategoriesWithGroupID(categoriesId);
            productDomain.changeCategories(categoriesId, categoryEntities);
        }

        productDomain.updateInformation(dto);
        const result = await this.productRepository.update(id, productDomain.getEntity());
        return result;
    }

    private isMissingFields(input: UpdatingProductInformationDto) {
        return !input || !input.categoriesId
            || input.categoriesId.length === 0
            || !input.name;
    }

    private isDifferentCateogires(categoriesId: string[], productCatalogs: ProductCatalog[]): boolean {
        for (const c of productCatalogs) {
            const findedCategory = Enumerable.from(categoriesId).firstOrDefault(i => i === c._id.toString());
            if (findedCategory === null || findedCategory === undefined)
                return true;
        }
        return false;
    }

}