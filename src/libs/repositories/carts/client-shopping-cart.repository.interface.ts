import { ShoppingCartDetailResponse, UpdatingShoppingCartParam, UpdatingStatusGroupProductsParam, RemovingProductiCartParam } from '@models';


export interface IClientShoppingCartRepository {
    clearShoppingCart(userId: string): Promise<number>;
    getCartDetail(userId: string): Promise<ShoppingCartDetailResponse>;
    getCountOfProducts(userId: string): Promise<number>;
    updateCaart(param: UpdatingShoppingCartParam): Promise<number>;
    updateStatusCart(param: UpdatingStatusGroupProductsParam): Promise<boolean>;
    removeProduct(param: RemovingProductiCartParam): Promise<number>;
}