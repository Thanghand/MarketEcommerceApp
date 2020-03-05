import { IBaseRepository } from '@shared.core';
import { CategoryEntity, ParentCategory, CategoryQuery } from '@models';
import { CategorySummaryEntity } from '@models';

export interface ICategoryRepository extends IBaseRepository<CategoryEntity> {
    getAllCategories(): Promise<CategoryEntity[]>;
    findCategoriesWithGroupID(categoriesID: string[]): Promise<CategoryEntity[]>;
    getAllCategoriesWithCountingProduct(query?: CategoryQuery): Promise<CategorySummaryEntity[]>;
    createWithParentsID(entity: CategoryEntity, parentsID: ParentCategory[]);
    updateAndRemoveParent(id: string, item: any): Promise<CategoryEntity>;
}