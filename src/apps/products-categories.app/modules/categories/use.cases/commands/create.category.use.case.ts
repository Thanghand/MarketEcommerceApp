import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { MapperCategory } from '../../utils/mapper.category';
import { MessageConstant } from '@shared.all/constants';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { ParentCategory, CreatingCategoryDto, CategoryDetailResponse } from '@models';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

@Injectable()
export class CreateCategoryUseCase extends UseCase<CreatingCategoryDto, CategoryDetailResponse> {

    private readonly tag = 'CreateCategoryUseCase';

    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: CreatingCategoryDto): Promise<CategoryDetailResponse> {

        if (this.isMissingFields(input)) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
        
        if (input.parentId) {
            const cateogory = await this.categoryRepository.getById(input.parentId);
            const treeCategories: ParentCategory[] = (cateogory.treeCategories);
            const entity = MapperCategory.mappingCreatingDtoToEntity(input);
            
            const result = await this.categoryRepository.createWithParentsID(entity, treeCategories);
            return MapperCategory.mappingCategoryDetailEntityToResponse(result);
        }

        const entity = MapperCategory.mappingCreatingDtoToEntity(input);
        const result = await this.categoryRepository.create(entity);
       
        return  MapperCategory.mappingCategoryDetailEntityToResponse(result);
    }

    private isMissingFields(input: CreatingCategoryDto): boolean {
        return !input || !input.name;
    }
}