import { Controller } from '@nestjs/common';
import {
    UpdateShoppingCartUseCase,
    UpdateStatusGroupProductsUseCase,
    GetShoppingCartUseCase,
    ClearShoppingCartUseCase,
    RemoveProductInShoppingCartUseCase,
    GetCountOfProductsUseCase
} from '../use.cases';

import {
    ShoppingCartDetailResponse,
    UpdatingStatusGroupProductsParam,
    UpdatingShoppingCartParam,
    RemovingProductiCartParam
} from '@models';

import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';


@Controller()
export class CartsController {

    constructor(private readonly updateShoppingCartUseCase: UpdateShoppingCartUseCase,
        private readonly updateStatusCartProductUseCase: UpdateStatusGroupProductsUseCase,
        private readonly getShoppingCartUseCase: GetShoppingCartUseCase,
        private readonly clearShoppingCartUseCase: ClearShoppingCartUseCase,
        private readonly removeProductUseCase: RemoveProductInShoppingCartUseCase,
        private readonly getCountOfProductsUseCase: GetCountOfProductsUseCase) {
    }

    @MessagePattern(MessageEventName.CART_GET_DETAIL)
    async getShoppingCart(userId: string): Promise<ShoppingCartDetailResponse> {
        const result = await this.getShoppingCartUseCase.execute(userId);
        return result;
    }

    @MessagePattern(MessageEventName.CART_UPDATE_STATUS)
    async updateStatusCart(param: UpdatingStatusGroupProductsParam): Promise<boolean> {
        const result = await this.updateStatusCartProductUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.CART_UPDATE)
    async updateCart(param: UpdatingShoppingCartParam): Promise<number> {
        const result = await this.updateShoppingCartUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.CART_CLEAR_PRODUCTS)
    async clearCart(userId: string): Promise<number> {
        const result = await this.clearShoppingCartUseCase.execute(userId);
        return result;
    }

    @MessagePattern(MessageEventName.CART_REMOVE_PRODUCT)
    async removeProduct(param: RemovingProductiCartParam): Promise<number> {
        const result = await this.removeProductUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.CART_GET_COUNT_PRODUCTS)
    async getCountOfProduct(userId: string): Promise<number> {
        const result = await this.getCountOfProductsUseCase.execute(userId);
        return result;
    }

}