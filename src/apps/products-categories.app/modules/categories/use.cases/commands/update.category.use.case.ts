import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { CategoryEntity, ParentCategory, UpdatingCategoryDto, CategoryDetailResponse, UpdatingCategoryParam } from '@models';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import * as _ from 'lodash';
import { ImageUtil, ObjectUtil } from '@shared.all/utils';
import { MapperCategory } from '../../utils/mapper.category';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';


@Injectable()
export class UpdateCategoryUseCase extends UseCase<UpdatingCategoryParam, CategoryDetailResponse> {

    private readonly tag = 'UpdateCategoryUseCase';
    
    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: UpdatingCategoryParam): Promise<CategoryDetailResponse> {
        const {id, dto} = input;

        if (this.isMissingFields(id, dto)) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        if (dto.image) 
            dto.image = ImageUtil.getIdFromUrlImage(dto.image); // Just get Id from image
       
        if (dto.parentId) {
            const category = await this.categoryRepository.getById(dto.parentId);
            const treeCategories: ParentCategory[] = (category.treeCategories);
            const node = treeCategories.length + 1;
            const currentCategory: ParentCategory = {
                node: node,
                _id: ObjectUtil.convertToMongoObjectId(id),
            };
            const parentCategory: ParentCategory = {
                node: node,
                _id: ObjectUtil.convertToMongoObjectId(dto.parentId)
            };
            treeCategories.push(currentCategory);
            const updatedCategory  = {..._.omit(dto, 'parentId'), treeCategories, node, parentCategory};
            const result = await this.categoryRepository.update(id, updatedCategory);
            return MapperCategory.mappingCategoryDetailEntityToResponse(result);
        }

        // Validate current category has parentCategory
        const category = await this.categoryRepository.getById(id);
        if (category && category.parentCategory) { 
            const treeCategories: ParentCategory[] = [];
            const node = 1 ;
            const currentCategory: ParentCategory = {
                node: node,
                _id: ObjectUtil.convertToMongoObjectId(category._id),
            };
            treeCategories.push(currentCategory);
            category.treeCategories = treeCategories;
            delete category.parentCategory;
            const result = await this.categoryRepository.updateAndRemoveParent(id, category);
            return MapperCategory.mappingCategoryDetailEntityToResponse(result);
        }
        
        const result = await this.categoryRepository.update(id, dto);
        return MapperCategory.mappingCategoryDetailEntityToResponse(result);
    }

    private isMissingFields(id: string, input: UpdatingCategoryDto): boolean {
        return !id || !input || !input.name;
    }
}
