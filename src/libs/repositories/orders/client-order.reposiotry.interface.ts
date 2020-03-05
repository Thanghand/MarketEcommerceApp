import {
    CreatingOrderParam,
    OrderDetailResponse,
    UpdatingOrderParam,
    OrderQuery,
    OrderSummaryResponse,
    OrderEntity,
    UpdatingOrderPaymentParam,
    MyClientQuery,
    RestaurantClientResponse,
    DeletingOrderParam,
    CountingOrdersQuery
} from '@models';


export interface IClientOrderRepository {
    createOrder(param: CreatingOrderParam): Promise<OrderDetailResponse[]>;
    deleteOrder(param: DeletingOrderParam): Promise<OrderEntity>;
    updateOrder(param: UpdatingOrderParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity>;
    getOrderDetail(id: string, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity>;
    getOrders(query: OrderQuery, isGetEntity?: boolean): Promise<OrderSummaryResponse[] | OrderEntity[]>;
    updatePaymentOrder(param: UpdatingOrderPaymentParam, isGetEntity?: boolean): Promise<OrderDetailResponse | OrderEntity>;
    findRestaurantClients(query: MyClientQuery): Promise<RestaurantClientResponse[]>;
    getCountingOrders(query: CountingOrdersQuery): Promise<any>;
}