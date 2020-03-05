import { UseCase } from '@shared.core';
import { MyClientQuery, RestaurantClientResponse } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository, IOrderRepository } from '../../repositories';

@Injectable()
export class FindRestaurantsUseCase extends UseCase<MyClientQuery, RestaurantClientResponse[]> {
    
    private readonly tag: string = 'GetOrderDetailUseCase';
    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: MyClientQuery, isGetEntity?: boolean): Promise<RestaurantClientResponse[]> {
        const result = await this.ordersRepository.findMyClients(input) as RestaurantClientResponse[];
        return result;
    }
}