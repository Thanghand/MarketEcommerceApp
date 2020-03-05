import { IClientOrderRepository } from './client-order.reposiotry.interface';
import { CreatingOrderParam, OrderDetailResponse, UpdatingOrderParam, OrderSummaryResponse, OrderQuery, OrderEntity, UpdatingOrderPaymentParam, MyClientQuery, RestaurantClientResponse, DeletingOrderParam, CountingOrdersQuery } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientOrderRepository implements IClientOrderRepository {


    constructor(private readonly eventMessage: NatsClientService) {
    }

    async createOrder(param: CreatingOrderParam): Promise<OrderDetailResponse[]> {
        const result = await this.eventMessage.sendMessage<OrderDetailResponse[]>(MessageEventName.ORDERS_CREATE, param);
        return result;
    }

    async deleteOrder(param: DeletingOrderParam): Promise<OrderEntity> {
        const result = await this.eventMessage.sendMessage<OrderEntity>(MessageEventName.ORDERS_DELETE, param);
        return result;
    }

    async updateOrder(param: UpdatingOrderParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {
        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<OrderEntity>(MessageEventName.ORDERS_UPDATE_STATUS, param);
            return result;
        }
        const result = await this.eventMessage.sendMessage<OrderDetailResponse>(MessageEventName.ORDERS_UPDATE_STATUS_RESPONSE, param);
        return result;
    }

    async getOrderDetail(id: string, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {
        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<OrderEntity>(MessageEventName.ORDERS_GET_DETAIL_ENTITY, id);
            return result;
        }

        const result = await this.eventMessage.sendMessage<OrderDetailResponse>(MessageEventName.ORDERS_GET_DETAIL_RESPONSE, id);
        return result;

    }

    async getOrders(query: OrderQuery, isGetEntity?: boolean): Promise<OrderSummaryResponse[] | OrderEntity[]> {
        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<OrderEntity[]>(MessageEventName.ORDERS_GET_QUERY, query);
            return result;
        }

        const result = await this.eventMessage.sendMessage<OrderSummaryResponse[]>(MessageEventName.ORDERS_GET_QUERY_RESPONSE, query);
        return result;
    }

    async updatePaymentOrder(param: UpdatingOrderPaymentParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity> {
        if (isGetEntity) {
            const result = await this.eventMessage.sendMessage<OrderEntity>(MessageEventName.ORDERS_UPDATE_PAYMENT, param);
            return result;
        }

        const result = await this.eventMessage.sendMessage<OrderDetailResponse>(MessageEventName.ORDERS_UPDATE_PAYMENT_RESPONSE, param);
        return result;
    }

    async findRestaurantClients(query: MyClientQuery): Promise<RestaurantClientResponse[]> {
        const result = await this.eventMessage.sendMessage<RestaurantClientResponse[]>(MessageEventName.ORDERS_GET_RESTAURANTS_CLIENT, query);
        return result;
    }

    async getCountingOrders(query: CountingOrdersQuery): Promise<any> {
        const result = await this.eventMessage.sendMessage<Map<string, number>>(MessageEventName.ORDERS_GET_COUNTING_BY_COMPANY, query);
        return result;
    }

}