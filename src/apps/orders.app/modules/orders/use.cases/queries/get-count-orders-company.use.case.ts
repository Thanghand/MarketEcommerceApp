import { UseCase } from '@shared.core';
import { IOrderRepository, OrderRepository } from '../../repositories';
import { Inject } from '@nestjs/common';
import { CountingOrdersQuery } from '@libs/models';


export class GetCountOrdersCompanyUseCase extends UseCase<CountingOrdersQuery, any> {

    private readonly tag: string = 'GetCountOrdersCompanyUseCase';
    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: CountingOrdersQuery, isGetEntity?: boolean): Promise<Map<string, number>> {

        const {companyType, companyIds} = input;
        const result = await this.ordersRepository.getCountOrdersByCompanyIds(companyIds, companyType);
        return result;
    }
    
}