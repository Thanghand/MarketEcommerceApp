import { ShoppingCartEntity, CartProductEntity, DeliveryEntity } from '@models';
import { IBaseRepository } from '@shared.core';


export interface IShoppingCartRepository extends IBaseRepository<ShoppingCartEntity> {
    getShoppingCartDetail(userId: string): Promise<ShoppingCartEntity>;
    getByUserId(userId: string): Promise<ShoppingCartEntity>;
    // createNewShoppingCart(userId: string): Promise<ShoppingCartEntity>;
    // updateProduct(userId: string, product: CartProductEntity): Promise<ShoppingCartEntity>;
    // increaseQuantity(userId: string, product: CartProductEntity): Promise<ShoppingCartEntity>;
    // removeProduct(userId: string, productId: string): Promise<ShoppingCartEntity>;
    // addProduct(userId: string, product: CartProductEntity): Promise<ShoppingCartEntity>;
    // clearShoppingCart(userId: string): Promise<boolean>;
    // updateStatusProducts(userId: string, supplierId: string, active: boolean): Promise<boolean>;
}