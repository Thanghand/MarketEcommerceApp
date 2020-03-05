import { UseCase } from '@shared.core';
import { OrderEntity, OrderQuery, OrderTransactionEntity, OrderSummaryResponse } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstant } from '@shared.all/constants';
import { OrderRepository, IOrderRepository } from '../../repositories';
import { DateUtil } from '@shared.all/utils';

export class GetOrdersUseCase extends UseCase<OrderQuery, OrderSummaryResponse[] | OrderEntity[]> {

    private readonly tag: string = 'GetOrdersUseCase';

    constructor(@Inject(OrderRepository) private readonly ordersRepository: IOrderRepository) {
        super();
    }

    async buildUseCase(input?: OrderQuery, isGetEntity?: boolean): Promise<OrderSummaryResponse[] | OrderEntity[]> {

        if (this.isMissingFields(input)) {
            console.error(`${this.tag} missing fields`);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        if (input.startDate || input.endDate)
            if (!DateUtil.isValidDate(input.startDate)
                || !DateUtil.isValidDate(input.endDate)) {
                console.error(`${this.tag} missing fields`);
                throw new HttpException('Please check startDate or endDate value', HttpStatus.BAD_REQUEST);
            }

        const entities = await this.ordersRepository.findOrders(input);

        if (isGetEntity)
            return entities;

        const summaries = entities.map(e => {
            const lastTransaction: OrderTransactionEntity = e.transactions[e.transactions.length - 1];
            const summary: OrderSummaryResponse = {
                _id: e._id,
                orderNumber: e.orderNumber,
                supplierId: e.supplier._id,
                supplierName: e.supplier.name,
                restaurantId: e.restaurant._id,
                restaurantName: e.restaurant.name,
                products: e.products,
                currentStatus: e.currentStatus,
                updatedBy: lastTransaction.updatedBy,
                deliveryOption: e.deliveryOption,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                isPayEndOfMonth: e.payment.isPayEndOfMonth
            };
            return summary;
        });
        return summaries as OrderSummaryResponse[];
    }

    isMissingFields(input: OrderQuery) {
        return !input;
    }

}