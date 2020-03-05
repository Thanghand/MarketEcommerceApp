import { IBaseRepository } from '@shared.core';
import { ProductEntity, CategorySummaryEntity, ProductQuerying, ProductSumanryEntity } from '@models';


export interface IProductRepository extends IBaseRepository<ProductEntity> {
    findProducts(query: ProductQuerying): Promise<ProductEntity[]>;
    groupCategoriesBySupplier(supplierId: string): Promise<CategorySummaryEntity[]>;
    groupHotDealsByCategory(query: any): Promise<ProductSumanryEntity[]>;
}