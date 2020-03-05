import { ProductQuerying, ProductSummaryResponse, CreatingProductParam, ProductEntity, UpdatingProductInformationParam, UpdatingProductCatalogParam, ProductDetailResponse } from '@models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';
import { IClientProductRepository } from '..';

@Injectable()
export class ClientProductsRepository implements IClientProductRepository {

    constructor(private readonly eventMessage: NatsClientService) {
    }

    async findProducts(query: ProductQuerying): Promise<ProductSummaryResponse[]> {
        const result = await this.eventMessage.sendMessage<ProductSummaryResponse[]>(MessageEventName.PRODUCTS_GET_ALL, query);
        return result;
    }

    async createProduct(param: CreatingProductParam): Promise<ProductEntity> {
        const result = await this.eventMessage.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_CREATE, param);
        return result;
    }

    async updateProductInfomation(param: UpdatingProductInformationParam): Promise<ProductEntity> {
        const result = await this.eventMessage.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_UPDATE, param);
        return result;
    }
    async updateProductCatalog(param: UpdatingProductCatalogParam): Promise<ProductEntity> {
        const result = await this.eventMessage.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_UPDATE_CATALOG, param);
        return result;
    }

    async deleteProduct(id: string): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.PRODUCTS_DELETE, id);
        return result;
    }

    async getProductDetail(id: string, isGetEntity?: boolean): Promise<ProductEntity| ProductDetailResponse> {
        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_DETAIL_ENTITY, id);
            return result;
        }
        const result = await this.eventMessage.sendMessage<ProductEntity>(MessageEventName.PRODUCTS_DETAIL_RESPONSE, id);
        return result;
    }

}