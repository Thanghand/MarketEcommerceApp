import { ShoppingCartEntity, CartProductEntity, BaseDomain, SupplierEntity } from '@models';
import * as Enumerable from 'linq';
import * as _ from 'lodash';

export class ShoppingCartDomain extends BaseDomain<ShoppingCartEntity> {
    
    addProduct(product: CartProductEntity): void {
        const newProduct = {...product} as CartProductEntity;
        this.entity.updatedAt = new Date();
        newProduct.quantity = 1;
        this.entity.products.push(newProduct);
    }

    increaseQuantity(product: CartProductEntity): void {
        this.entity.updatedAt = new Date();
        this.entity.products.forEach( p => {
            if (p._id === product._id) {
                p.active = product.active;
                p.quantity += 1;
                return;
            }
        });
    }

    removeProduct(productId: string) {
        this.entity.updatedAt = new Date();
        _.remove(this.entity.products, p => {
            return p._id === productId;
        });
    }

    updateQuantity(product: CartProductEntity): void {
        this.entity.updatedAt = new Date();
        this.entity.products.forEach( p => {
            if (p._id === product._id) {
                p.active = product.active;
                p.quantity = product.quantity;
                return;
            }
        });
    }

    updateStatusProducts(supplierId: string, active:boolean): void {
        this.entity.products.forEach(p => {
            if (p.supplierId === supplierId) {
                p.active = active;
                return;
            }
        });
    }

    createShoppingCart(userId: string): void {
        const entity: ShoppingCartEntity = {
            userId: userId,
            products: []
        };
        this.entity = entity;
    }

    clearCart(): void {
        this.entity.products = [];
    }

    getTotalQuantity(): number {
        let total = 0;
        this.entity.products.forEach(p => total += p.quantity);
        return total;
    }
}