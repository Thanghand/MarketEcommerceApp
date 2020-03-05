import { Controller, Param} from '@nestjs/common';
import { 
    ProductEntity, 
    ProductSummaryResponse, 
    ProductQuerying, 
    UpdatingProductInformationParam,
    CreatingProductParam,
    ProductDetailResponse,
    UpdatingProductCatalogParam} from '@models';
import { 
    CreateProductUseCase, 
    GetProductDetailUseCase, 
    FindProductsUseCase, 
    UpdateProductInformationUseCase, 
    UpdateProductCatalogUseCase, 
    DeleteProductUseCase } from '../use.cases';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';


@Controller()
export class ProductsController {

    constructor(private readonly createProdutUseCase: CreateProductUseCase,
                private readonly getProductDetailUseCase: GetProductDetailUseCase,
                private readonly findProductsUseCase: FindProductsUseCase,
                private readonly updateInformationUseCase: UpdateProductInformationUseCase,
                private readonly updateProductCatalogUseCase: UpdateProductCatalogUseCase,
                private readonly deleteProductUseCase: DeleteProductUseCase) {
    }

    @MessagePattern(MessageEventName.PRODUCTS_CREATE)
    async createNewProduct(param: CreatingProductParam): Promise<ProductEntity> {
        const result = await this.createProdutUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.PRODUCTS_DETAIL_ENTITY)
    async getProductDetail(id: string): Promise<ProductEntity> {
        const result = await this.getProductDetailUseCase.execute(id, true) as ProductEntity; 
        return result;
    }

    @MessagePattern(MessageEventName.PRODUCTS_DETAIL_RESPONSE)
    async getProductDetailResponse(id: string): Promise<ProductDetailResponse> {
        const result = await this.getProductDetailUseCase.execute(id, false) as ProductDetailResponse; 
        return result;
    }

    @MessagePattern(MessageEventName.PRODUCTS_GET_ALL)
    async findProducts(query: ProductQuerying): Promise<ProductSummaryResponse[]> {
        const result = await this.findProductsUseCase.execute(query);
        return result;
    }

    @MessagePattern(MessageEventName.PRODUCTS_UPDATE)
    async updateProductInformation(input: UpdatingProductInformationParam): Promise<ProductEntity> {
        const result = await this.updateInformationUseCase.execute(input);
        return result;
    }

    @MessagePattern(MessageEventName.PRODUCTS_DELETE)
    async deleteProduct(@Param('id') id: string): Promise<boolean> {
        const result = await this.deleteProductUseCase.execute(id);
        return result;
    }


    @MessagePattern(MessageEventName.PRODUCTS_UPDATE_CATALOG)
    async updateProductCatalog(param: UpdatingProductCatalogParam): Promise<ProductEntity> {
        const result = await this.updateProductCatalogUseCase.execute(param);
        return result;
    }
}