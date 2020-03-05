import { IOrderRepository } from './order.repository.interface';
import { OrderEntity, OrderQuery, OrderStatus, MyClientQuery, Entity, CompanyType, CountingCompanyOrdersEntity } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SchemaUtil } from '@shared.all/utils';
import { ObjectId } from 'mongodb';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';
import { OrderSchema } from '../../../../libs/mongo/schemas';
import { MongoBaseRepository } from '@shared.core';

export class OrderRepository extends MongoBaseRepository<OrderEntity, OrderSchema> implements IOrderRepository {

    constructor(@InjectRepository(OrderSchema, Configuration.getConfig().getService(AppServiceNameConfig.Orders).mongodb.getConnection())
    private readonly orderDao: MongoRepository<OrderSchema>) {
        super(orderDao, OrderSchema);
    }


    async getCountOrdersByCompanyIds(companyIds: string[], companyType: CompanyType): Promise<any> {

        let company = '';
        let companyQuery = '';
        const where = {};
        switch (companyType) {
            case CompanyType.Restaurants: {
                company = 'restaurant';
                companyQuery = '$restaurant._id';
                where['restaurant._id'] = { '$in': companyIds };

            }
                break;
            case CompanyType.Suppliers: {
                company = 'supplier';
                companyQuery = '$supplier._id';
                where['supplier._id'] = { '$in': companyIds };
            }
                break;
        }

        const cursor = await this.orderDao.aggregate(
            [
                {
                    '$match': where
                },
                {
                    '$group': {
                        '_id': companyQuery,
                        'total': {
                            '$sum': 1
                        }
                    }
                }
            ],
            {
                'allowDiskUse': false
            }
        );

        const arrays = await cursor.toArray();
        const result = {};
        arrays.forEach(i => {
            const item = i as CountingCompanyOrdersEntity;
            result[item._id] = item.total;
        });

        return result;
    }




    async saveOrders(orders: OrderEntity[]): Promise<OrderEntity[]> {
        const ordersSchema = orders.map(o => (SchemaUtil.createNewSchema(o, OrderSchema)));
        const result = await this.orderDao.save(ordersSchema);
        return result;
    }

    async updateOrders(orders: OrderEntity[]): Promise<OrderEntity[]> {
        const result = await this.orderDao.save(orders);
        return result;
    }

    async updateDeliveredOrders(orders: string[]): Promise<boolean> {

        const result = await this.orderDao.updateMany(
            { _id: { $in: [...orders] } },
            { $set: { status: OrderStatus.Paid } });
        return result.result.ok === 1;
    }

    async findOrders(query: OrderQuery): Promise<OrderEntity[]> {

        const {
            supplierId,
            restaurantId,
            orderNumber,
            status,
            hasInvoice,
            startDate,
            endDate,
            isPayEndOfMonth
        } = query;

        const where = {};

        if (status)
            where['currentStatus'] = status;

        if (supplierId)
            where['supplier._id'] = supplierId;

        if (restaurantId)
            where['restaurant._id'] = restaurantId;

        if (orderNumber)
            where['orderNumber'] = {
                '$regex': `.*${orderNumber}`,
                '$options': 'i'
            };


        if (startDate && endDate)
            where['updatedAt'] = {
                '$gte': new Date(startDate),
                '$lt': new Date(endDate),
            };

        if (hasInvoice !== undefined) {
            const valueHasInvoice = Boolean(JSON.parse(hasInvoice.toString().toLowerCase()));
            where['hasInvoice'] = valueHasInvoice;
        }

        if (isPayEndOfMonth !== undefined) {
            const value = Boolean(JSON.parse(isPayEndOfMonth.toString().toLowerCase()));
            where['payment.isPayEndOfMonth'] = value;
        }

        const entities = await this.orderDao.find({
            where,
            select: [
                '_id',
                'supplier',
                'restaurant',
                'payment',
                'products',
                'transactions',
                'shippingAddress',
                'orderNumber',
                'deliveryOption',
                'createdAt',
                'updatedAt',
                'currentStatus',
                'payment'
            ],
            order: {
                updatedAt: -1
            }
        });

        return entities;
    }

    async findMyClients(query: MyClientQuery): Promise<Entity[]> {

        const { restaurantId, status, supplierId } = query;

        const where = {};
        if (restaurantId)
            where['restaurant._id'] = restaurantId;
        if (status)
            where['currentStatus'] = status;
        if (supplierId)
            where['supplier._id'] = supplierId;

        const result = await this.orderDao.aggregate([
            {
                $match: where
            },
            {
                $group: {
                    _id: '$restaurant._id',
                    name: { $first: '$restaurant.name' }
                },
            },
        ],
            {
                'allowDiskUse': false
            });
        return result.toArray();
    }

    async getOrdersById(ids: string[]): Promise<OrderEntity[]> {
        const objectIds = ids.map(i => new ObjectId(i));
        const result = await this.orderDao.find({
            where: { _id: { $in: objectIds } }
        });
        return result;
    }
}