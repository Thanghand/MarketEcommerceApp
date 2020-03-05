import { IClientCategoryRepository } from './client-category.repository.interface';
import { CreatingCategoryDto, CategoryDetailResponse, CategorySummaryResponse, CategoryQuery, UpdatingCategoryParam, CategorySummaryEntity } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ClientCategoryRepository implements IClientCategoryRepository {

    constructor(private readonly eventMessage: NatsClientService) {
    }

    async createCategory(dto: CreatingCategoryDto): Promise<CategoryDetailResponse> {
        const result = await this.eventMessage.sendMessage<CategoryDetailResponse>(MessageEventName.CATEGORY_CREATE, dto);
        return result;
    }

    async getAllCategory(): Promise<CategorySummaryResponse[]> {
        const result = await this.eventMessage.sendMessage<CategorySummaryResponse[]>(MessageEventName.CATEGORY_GET_ALL, {});
        return result;
    }

    async getAllCategoriesCountingProducts(query: CategoryQuery): Promise<CategorySummaryResponse[]> {
        const result = await this.eventMessage.sendMessage<CategorySummaryResponse[]>(MessageEventName.CATEGORY_GET_ALL_COUNT, query);
        return result;
    }

    async getDetailCategory(id: string): Promise<CategoryDetailResponse> {
        const result = await this.eventMessage.sendMessage<CategoryDetailResponse>(MessageEventName.CATEGORY_GET_ALL, id);
        return result;
    }

    async updateCategory(param: UpdatingCategoryParam): Promise<CategoryDetailResponse> {
        const result = await this.eventMessage.sendMessage<CategoryDetailResponse>(MessageEventName.CATEGORY_UPDATE, param);
        return result;
    }

    async deleteCategory(id: string): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.CATEGORY_DELETE, id);
        return result;
    }

    async getSupplierCategories(companyId: string): Promise<CategorySummaryEntity[]> {
        const result = await this.eventMessage.sendMessage<CategorySummaryEntity[]>(MessageEventName.CATEGORIES_SUPPLIER_GET, companyId);
        return result;
    }


}