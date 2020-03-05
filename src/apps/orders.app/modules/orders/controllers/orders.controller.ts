import {
    UpdateOrderUseCase,
    GetOrderDetailUseCase,
    GetOrdersUseCase,
    DeleteOrderUseCase,
    UpdateOrderPaymentUseCase,
    CreateOrdersUseCase,
    FindRestaurantsUseCase,
    GetCountOrdersCompanyUseCase,
    DisableOrdersAreInInvoiceUseCase
} from '../use.cases';

import {
    CreatingOrderParam,
    OrderDetailResponse,
    UpdatingOrderParam,
    UpdatingOrderPaymentParam,
    OrderEntity,
    DeletingOrderParam,
    OrderQuery,
    OrderSummaryResponse,
    MyClientQuery,
    RestaurantClientResponse,
    CountingOrdersQuery
} from '@models';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Controller } from '@nestjs/common';

@Controller()
export class OrdersController {

    constructor(private readonly updateOrderUseCase: UpdateOrderUseCase,
        private readonly getOrderDetailUseCase: GetOrderDetailUseCase,
        private readonly getOrdersUseCase: GetOrdersUseCase,
        private readonly deleteOrderUseCase: DeleteOrderUseCase,
        private readonly updateOrderPaymentUseCase: UpdateOrderPaymentUseCase,
        private readonly findRestaurantsClientUseCase: FindRestaurantsUseCase,
        private readonly createOrderUseCase: CreateOrdersUseCase,
        private readonly getCountingOrdersUseCase: GetCountOrdersCompanyUseCase,
        private readonly disableOrdersAreInInvoiceUseCase: DisableOrdersAreInInvoiceUseCase) {
    }

    @MessagePattern(MessageEventName.ORDERS_CREATE)
    async createOrder(param: CreatingOrderParam): Promise<OrderDetailResponse[]> {
        const result = await this.createOrderUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_UPDATE_STATUS)
    async updateOrder(param: UpdatingOrderParam): Promise<OrderDetailResponse> {
        const result = await this.updateOrderUseCase.execute(param) as OrderDetailResponse;
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_UPDATE_STATUS_RESPONSE)
    async updateOrderResponse(param: UpdatingOrderParam): Promise<OrderDetailResponse> {
        const result = await this.updateOrderUseCase.execute(param, false) as OrderDetailResponse;
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_UPDATE_PAYMENT)
    async updateOrderPayment(param: UpdatingOrderPaymentParam): Promise<OrderDetailResponse> {
        const result = await this.updateOrderPaymentUseCase.execute(param) as OrderDetailResponse;
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_UPDATE_PAYMENT_RESPONSE)
    async updateOrderPaymentResponse(param: UpdatingOrderPaymentParam): Promise<OrderDetailResponse> {
        const result = await this.updateOrderPaymentUseCase.execute(param, false) as OrderDetailResponse;
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_DELETE)
    async deleteOrder(param: DeletingOrderParam): Promise<OrderEntity> {
        const result = await this.deleteOrderUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_GET_QUERY)
    async getOrders(query: OrderQuery): Promise<OrderEntity[]> {
        const result = await this.getOrdersUseCase.execute(query) as OrderEntity[];
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_GET_QUERY_RESPONSE)
    async getOrdersSummaryResponse(query: OrderQuery): Promise<OrderSummaryResponse[]> {
        const result = await this.getOrdersUseCase.execute(query, false) as OrderSummaryResponse[];
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_GET_DETAIL_RESPONSE)
    async getOrderDetailResponse(orderId: string): Promise<OrderDetailResponse> {
        const result = await this.getOrderDetailUseCase.execute(orderId, false) as OrderDetailResponse;
        return result;
    }


    // Data response : object {'key': 'value'}
    @MessagePattern(MessageEventName.ORDERS_GET_COUNTING_BY_COMPANY)
    async getCountingOrders(query: CountingOrdersQuery): Promise<any> {
        const result = await this.getCountingOrdersUseCase.execute(query);
        return result;
    }


    @MessagePattern(MessageEventName.ORDERS_GET_DETAIL_ENTITY)
    async getOrderDetailEntity(orderId: string): Promise<OrderEntity> {
        const result = await this.getOrderDetailUseCase.execute(orderId, true) as OrderEntity;
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_GET_RESTAURANTS_CLIENT)
    async getRestaurantsClient(query: MyClientQuery): Promise<RestaurantClientResponse[]> {
        const result = await this.findRestaurantsClientUseCase.execute(query);
        return result;
    }

    @MessagePattern(MessageEventName.ORDERS_DISABLE_ORDERS_ARE_IN_INVOICE)
    async diableOrders(orderIds: string[]) {
        const result = await this.disableOrdersAreInInvoiceUseCase.execute(orderIds);
        return result;
    }
}