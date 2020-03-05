import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { ShoppingCartDomain } from '../../models';
import { IShoppingCartRepository, ShoppingCartRepository } from '../../repositories';

@Injectable()
export class ClearShoppingCartUseCase extends UseCase<string, number> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository) {
        super();
    }

    async buildUseCase(userId?: string, isGetEntity?: boolean): Promise<number> {

        if (!userId) {
            console.error('Id is empty');
            throw new HttpException(' User Id can not be null', HttpStatus.BAD_REQUEST); 
        }
        const entity = await this.cartRepository.getByUserId(userId);
        const cartDomain = new ShoppingCartDomain(entity);
        cartDomain.clearCart();
        await this.cartRepository.update(entity._id, cartDomain.getEntity());
        return 0;
    }

}