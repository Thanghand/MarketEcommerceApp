import { CategoryEntity, CategorySummaryEntity, CreatingCategoryDto, CategorySummaryResponse, CategoryDetailResponse } from '@models';
import { ImageUtil } from '@shared.all/utils';

export class MapperCategory {

    public static mappingCreatingDtoToEntity(input: CreatingCategoryDto): CategoryEntity {
  
        const entity: CategoryEntity = {
            name: input.name,
            description: input.description,
            image: input.image ? ImageUtil.getIdFromUrlImage(input.image): '',
        };
        return entity;
    }

    public static mappingEntitiesToAllCategoriesResponse(input: CategoryEntity[]): CategorySummaryResponse[] {

        const results: CategorySummaryResponse[] = [];
        input.forEach(item => {
            const itemCategoryResponse: CategorySummaryResponse = {
                _id: item._id,
                name: item.name,
                description: item.description,
                image: item.image ? ImageUtil.mergeSourceCDNToId(item.image) : '',
            };
            results.push(itemCategoryResponse);
        });
        return results;
    }

    public static mappingSummaryToCountingResponse(input: CategorySummaryEntity): CategorySummaryResponse {
        const result: CategorySummaryResponse = {
            _id: input._id,
            name: input.name,
            image: input.image ? ImageUtil.mergeSourceCDNToId(input.image) : '',
            total: input.total,
            description: input.description,
            treeCategories: input.treeCategories,
            parentCategory: input.parentCategory,
            node: input.node,
        };
        return result;
    }

    public static mappingCategoryDetailEntityToResponse(input: CategoryEntity): CategoryDetailResponse {
        const parentNode = input.node - 1;
        const parent = input.treeCategories.find(item => item.node === parentNode);
        
        const result: CategoryDetailResponse = {
            _id: input._id,
            name: input.name,
            node: input.node,
            image: input.image ? ImageUtil.mergeSourceCDNToId(input.image) : '',
            description: input.description,
            parentCategory: parent,
            treeCategories: input.treeCategories
        };
        return result;
    }

    public static mappingSumaryEntitiesToCountingResponses(input: CategorySummaryEntity[]): CategorySummaryResponse[] {
        return input.map(c => this.mappingSummaryToCountingResponse(c));
    }
}
