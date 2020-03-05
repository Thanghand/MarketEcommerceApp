import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { ShoppingCartDomain } from '../../models';
import { IShoppingCartRepository, ShoppingCartRepository } from '../../repositories';

export class GetCountOfProductsUseCase extends UseCase<string, number> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository) {
        super();
    }

    async buildUseCase(userId?: string, isGetEntity?: boolean): Promise<number> {

        if (!userId) {
            console.error('user id is null');
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_GATEWAY);
        }

        const cartEntity = await this.cartRepository.getByUserId(userId);
        const cartDomain = new ShoppingCartDomain(cartEntity);
        if (!cartEntity || !cartEntity._id) {
            console.error('Not find shopping cart');
            cartDomain.createShoppingCart(userId);
            await this.cartRepository.create(cartDomain.getEntity());
            return 0;
        }
        return cartDomain.getTotalQuantity();
    }
    
}