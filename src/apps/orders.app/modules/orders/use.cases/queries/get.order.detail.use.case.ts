import { UseCase } from '@shared.core';
import { OrderEntity, OrderDetailResponse } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { MapperOrderUtil } from '../../shared/utils';


export class GetOrderDetailUseCase extends UseCase<string, OrderDetailResponse | OrderEntity> {

    private readonly tag: string = 'GetOrderDetailUseCase';

    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {
        
        const orderId = input;

        if (!orderId) {
            console.error(`${this.tag} missing fields`);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
        const entity = await this.ordersRepository.getById(orderId);
        if (isGetEntity) 
            return entity;

        return MapperOrderUtil.mapEntityToResponse(entity);
    }
    
}
