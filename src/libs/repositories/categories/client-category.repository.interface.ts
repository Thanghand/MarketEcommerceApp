import { CreatingCategoryDto, CategoryDetailResponse, CategorySummaryResponse, UpdatingCategoryParam, CategoryQuery, CategorySummaryEntity } from '@models';


export interface IClientCategoryRepository {
    createCategory(dto: CreatingCategoryDto): Promise<CategoryDetailResponse>;
    getAllCategory(): Promise<CategorySummaryResponse[]>;
    getAllCategoriesCountingProducts(query: CategoryQuery): Promise<CategorySummaryResponse[]>;
    getDetailCategory(id: string): Promise<CategoryDetailResponse>;
    updateCategory(param: UpdatingCategoryParam): Promise<CategoryDetailResponse>;
    deleteCategory(id: string): Promise<boolean>;
    getSupplierCategories(companyId: string): Promise<CategorySummaryEntity[]>;
}