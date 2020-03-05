import { UseCase } from '@shared.core';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { Inject, Injectable } from '@nestjs/common';
import { MapperCategory } from '../../utils/mapper.category';
import { CategoryDetailResponse } from '@models';

@Injectable()
export class GetCategoryDetailUseCase extends UseCase<string, CategoryDetailResponse> {

    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<CategoryDetailResponse> {
        const result = await this.categoryRepository.getById(input);
        return MapperCategory.mappingCategoryDetailEntityToResponse(result);
    }
    
}
