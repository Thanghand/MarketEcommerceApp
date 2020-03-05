import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { ShoppingCartRepository, IShoppingCartRepository } from '../../repositories';
import { ShoppingCartDomain } from '../../models';
import { UpdatingStatusGroupProductsParam } from '@libs/models';

export class UpdateStatusGroupProductsUseCase extends UseCase<UpdatingStatusGroupProductsParam, boolean> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingStatusGroupProductsParam, isGetEntity?: boolean): Promise<boolean> {

        const { userId, dto } = input;

        if (!userId || !dto || !dto.supplierId) {
            console.error('Missing UserId or supplierId');
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
        const cartEntity = await this.cartRepository.getByUserId(userId);
        const cartDomain = new ShoppingCartDomain(cartEntity);
        cartDomain.updateStatusProducts(dto.supplierId, dto.active);

        const result = await this.cartRepository.update(cartEntity._id, cartDomain.getEntity());
        return result !== null;
    }
}