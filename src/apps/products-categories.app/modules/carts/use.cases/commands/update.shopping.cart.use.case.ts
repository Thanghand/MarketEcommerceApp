import { Injectable, Inject } from '@nestjs/common';
import { ShoppingCartEntity, CartProductEntity, UpdatingShoppingCartDto, UpdatingShoppingCartParam } from '@models';
import { UseCase } from '@shared.core';
import { ShoppingCartRepository, IShoppingCartRepository} from '../../repositories';
import { ShoppingCartDomain } from '../../models';
import { ClientSuppliersRepository, IClientSuppliersRepository } from '@libs/repositories';

@Injectable()
export class UpdateShoppingCartUseCase extends UseCase<UpdatingShoppingCartParam, number> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository,
                @Inject(ClientSuppliersRepository) private readonly clientSupplierRepo: IClientSuppliersRepository ) {
        super();
    }

    async buildUseCase(input?: UpdatingShoppingCartParam , isGetEntity?: boolean): Promise<number> {

        const {userId, dto} = input;

        const cartEntity = await this.cartRepository.getByUserId(userId);
        const cartDomain = new  ShoppingCartDomain(cartEntity);

        // Check product is not existed
        const product = cartEntity.products.find(i => i._id === dto.productId);
        if ( !product || !product._id) {
            const supplierEntity = await this.clientSupplierRepo.getById(dto.supplierId);
            const cartProduct: CartProductEntity = {
                _id: dto.productId,
                quantity: dto.quantity,
                active: dto.active,
                supplierId: dto.supplierId,
                supplierName: supplierEntity.name,
                supplierLogo: supplierEntity.logo
            };
            cartDomain.addProduct(cartProduct);
            await this.cartRepository.update(cartEntity._id, cartDomain.getEntity());
            return cartDomain.getTotalQuantity();
        }

        // Increase product in shoppingCart
        if (dto.quantity === undefined || dto.quantity === null) {
            cartDomain.increaseQuantity(product);
            await this.cartRepository.update(cartEntity._id, cartDomain.getEntity());
            return cartDomain.getTotalQuantity();
        }

        // Remove product in shoppingCart
        if (dto.quantity === 0) {
            cartDomain.removeProduct(dto.productId);
            await this.cartRepository.update(cartEntity._id, cartDomain.getEntity());
            return cartDomain.getTotalQuantity();
        }

        // Update quantity
        const cartProduct: CartProductEntity = {
            _id: dto.productId,
            quantity: dto.quantity,
            active: dto.active,
            supplierId: dto.supplierId,
        };

        cartDomain.updateQuantity(cartProduct);
        await this.cartRepository.update(cartEntity._id, cartDomain.getEntity());
        return cartDomain.getTotalQuantity();
    }

    private getCountOfProducts(cartEntity: ShoppingCartEntity) {
        let total = 0;
        cartEntity.products.forEach(p => total += p.quantity);
        return total;
    }

    
}