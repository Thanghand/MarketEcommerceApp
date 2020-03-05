import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { MessageConstant } from '@shared.all/constants';
import { MapperCart } from '../../shared/utils';
import { IShoppingCartRepository, ShoppingCartRepository } from '../../repositories';
import { ShoppingCartDetailResponse } from '@models';

@Injectable()
export class GetShoppingCartUseCase extends UseCase<string, ShoppingCartDetailResponse> {

    constructor(@Inject(ShoppingCartRepository) private readonly cartRepository: IShoppingCartRepository) {
        super();
    }

    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<ShoppingCartDetailResponse> {

        if (!input) {
            console.error('Id is null');
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);
        }

        const cartEntity = await this.cartRepository.getShoppingCartDetail(input);
        if (cartEntity === undefined || cartEntity === null) {
            const emptyShoingCart: ShoppingCartDetailResponse = {
                userId: input,
                groupCartSuppliers: []
            };
            return emptyShoingCart;
        }
        const respnse = MapperCart.mappingEntityToCartDetailResponse(cartEntity);
        return respnse;
    }

}