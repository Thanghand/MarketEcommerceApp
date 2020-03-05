import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { MapperCategory } from '../../utils/mapper.category';
import { MessageConstant } from '@shared.all/constants';
import { CategoryQuery, CategorySummaryResponse } from '@models';

export class GetCategoriesCountingProductsUseCase extends UseCase<CategoryQuery, CategorySummaryResponse[]> {

    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository) {
        super();
    }

    async buildUseCase(input?: CategoryQuery): Promise<CategorySummaryResponse[]> {

        if (!input)
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const categories = await this.categoryRepository.getAllCategoriesWithCountingProduct(input);
        if (input.isGetFullCategories) {
            const results = MapperCategory.mappingSumaryEntitiesToCountingResponses(categories);
            return results;
        }

        const filterCategories = input.isFilterProductEmpty ? categories.filter(c => c.total > 0) : categories;
        const results = MapperCategory.mappingSumaryEntitiesToCountingResponses(filterCategories);
        return results;
    }

}
