import { Injectable, Inject } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { MapperCategory } from '../../utils/mapper.category';
import { CategorySummaryResponse } from '@models';


@Injectable()
export class GetAllCategoriesUseCase extends UseCase<string, CategorySummaryResponse[]> {

    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<CategorySummaryResponse[]> {
        const entities = await this.categoryRepository.getAllCategories();
        const result = MapperCategory.mappingEntitiesToAllCategoriesResponse(entities);
        return result;
    }

}