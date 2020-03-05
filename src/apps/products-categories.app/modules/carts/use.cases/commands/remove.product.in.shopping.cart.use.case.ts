import { ShoppingCartEntity, RemovingProductiCartParam } from '@models';
import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { ShoppingCartRepository, IShoppingCartRepository} from '../../repositories';
import { ShoppingCartDomain } from '../../models';


export class RemoveProductInShoppingCartUseCase extends UseCase<RemovingProductiCartParam, number> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository) {
        super();
    }

    async buildUseCase(input?: RemovingProductiCartParam, isGetEntity?: boolean): Promise<number> {
        
        const {userId, productId} = input;

        if (!productId || !userId) {
            console.error('ProductId or UserId is null');
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }
        const entity = await this.cartRepository.getByUserId(userId);
        const cartDomain = new ShoppingCartDomain(entity);
        cartDomain.removeProduct(productId);

        await this.cartRepository.update(cartDomain.getEntity()._id, cartDomain.getEntity());
        return cartDomain.getTotalQuantity();
    }
}