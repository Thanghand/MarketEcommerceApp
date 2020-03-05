import { OrderEntity, OrderQuery, MyClientQuery, Entity, CompanyType } from '@models';
import { IBaseRepository } from '@shared.core';

export interface IOrderRepository extends IBaseRepository<OrderEntity> {
    saveOrders(orders: OrderEntity[]): Promise<OrderEntity[]>;
    updateOrders(orders: OrderEntity[]): Promise<OrderEntity[]>;
    findOrders(query: OrderQuery): Promise<OrderEntity[]>;
    updateDeliveredOrders(orders: string[]): Promise<boolean>;
    findMyClients(query: MyClientQuery): Promise<Entity[]>;
    getOrdersById(ids: string[]):  Promise<OrderEntity[]>;
    getCountOrdersByCompanyIds(companyIds: string[], companyType: CompanyType): Promise<any>; 
}