import { Injectable } from '@nestjs/common';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { ShoppingCartDetailResponse, UpdatingShoppingCartParam, UpdatingStatusGroupProductsParam, RemovingProductiCartParam } from '@models';
import { IClientShoppingCartRepository } from '..';

@Injectable()
export class ClientShoppingCartRepository implements IClientShoppingCartRepository {


    constructor(private readonly eventMessage: NatsClientService) {
    }

    async clearShoppingCart(userId: string): Promise<number> {
        const result = await this.eventMessage.sendMessage<number>(MessageEventName.CART_CLEAR_PRODUCTS, userId);
        return result;
    }

    async getCartDetail(userId: string): Promise<ShoppingCartDetailResponse> {
        const result = await this.eventMessage.sendMessage<ShoppingCartDetailResponse>(MessageEventName.CART_GET_DETAIL, userId);
        return result;
    }
    async getCountOfProducts(userId: string): Promise<number> {
        const result = await this.eventMessage.sendMessage<number>(MessageEventName.CART_GET_COUNT_PRODUCTS, userId);
        if (!result)
            return 0;
        return result;
    }

    async updateCaart(param: UpdatingShoppingCartParam): Promise<number> {
        const result = await this.eventMessage.sendMessage<number>(MessageEventName.CART_UPDATE, param);
        return result;
    }

    async updateStatusCart(param: UpdatingStatusGroupProductsParam): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.CART_UPDATE_STATUS, param);
        return result;
    }

    async removeProduct(param: RemovingProductiCartParam): Promise<number> {
        const result = await this.eventMessage.sendMessage<number>(MessageEventName.CART_REMOVE_PRODUCT, param);
        return result;
    }

}