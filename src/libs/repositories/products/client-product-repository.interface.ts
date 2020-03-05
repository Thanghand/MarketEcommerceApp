import { ProductQuerying, ProductSummaryResponse, CreatingProductParam, ProductEntity, UpdatingProductInformationParam, UpdatingProductCatalogParam, ProductDetailResponse } from '@models';

export interface IClientProductRepository {
    findProducts(query: ProductQuerying): Promise<ProductSummaryResponse[]>;
    createProduct(param: CreatingProductParam): Promise<ProductEntity>;
    getProductDetail(id: string, isGetEntity?: boolean): Promise<ProductEntity| ProductDetailResponse>;
    updateProductInfomation(param: UpdatingProductInformationParam): Promise<ProductEntity>;
    updateProductCatalog(param: UpdatingProductCatalogParam): Promise<ProductEntity>;
    deleteProduct(id: string): Promise<boolean>;
}