import { ShoppingCartEntity } from '@models';
import { IShoppingCartRepository } from './shopping.cart.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongoBaseRepository } from '@shared.core';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { ShoppingCartSchema } from '../../../libs/mongo/schemas';

export class ShoppingCartRepository extends MongoBaseRepository<ShoppingCartEntity, ShoppingCartSchema>
    implements IShoppingCartRepository {

    constructor(@InjectRepository(ShoppingCartSchema, Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getConnection())
    private readonly cartDao: MongoRepository<ShoppingCartSchema>) {
        super(cartDao, ShoppingCartSchema);
    }
    
    async getByUserId(userId: string): Promise<ShoppingCartEntity> {
        const result = await this.cartDao.findOne({
            where: { userId: userId }
        });
        return result;
    }

    async getShoppingCartDetail(userId: string): Promise<ShoppingCartEntity> {
        const cursor = await this.cartDao.aggregate([
            {
                $match: {
                    'active': true,
                    'isDeleted': false,
                    'userId': userId
                },

            },
            {
                $unwind: {
                    'path': '$products'
                }
            },
            {
                $addFields: {
                    'objectProductId': {
                        '$toObjectId': '$products._id'
                    },
                }
            },
            {
                $lookup: {
                    'from': 'products',
                    'localField': 'objectProductId',
                    'foreignField': '_id',
                    'as': 'cartProducts'
                }
            },
            {
                $unwind: {
                    'path': '$cartProducts'
                }
            },
            {
                $group: {
                    '_id': '$_id',
                    'userId': { $first: '$userId' },
                    'products': {
                        '$push': {
                            '_id': '$cartProducts._id',
                            'name': '$cartProducts.name',
                            'quantity': '$products.quantity',
                            'images': '$cartProducts.images',
                            'supplierId': '$products.supplierId',
                            'supplierName': '$products.supplierName',
                            'active': '$products.active',
                            'price': '$cartProducts.originalPrice',
                            'isProductActive': '$cartProducts.active',
                            'isProductDeleted': '$cartProducts.isDeleted',
                            'deliveryOption': '$products.deliveryOption',
                            'workingDayHour': '$products.workingDayHour'
                        }
                    }
                }
            }
        ]);
        const result = await cursor.toArray() as ShoppingCartEntity[];
        return result.shift();
    }
}