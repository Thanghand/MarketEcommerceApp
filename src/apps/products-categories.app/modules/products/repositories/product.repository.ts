import { MongoBaseRepository } from '@shared.all/core/mongo.base.repository';
import { ProductEntity, CategorySummaryEntity, ProductQuerying, ProductSumanryEntity } from '@models';
import { IProductRepository } from './product.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ProductSchema } from '../../../libs/mongo/schemas/product.schema';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';


const connection = Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getConnection();


export class ProductRepository extends MongoBaseRepository<ProductEntity, ProductSchema> implements IProductRepository {
 
   
    constructor(@InjectRepository(ProductSchema, connection) 
                private readonly productDao: MongoRepository<ProductSchema>) {
        super(productDao, ProductSchema);
    }

    groupHotDealsByCategory(query: any): Promise<ProductSumanryEntity[]> {
        throw new Error("Method not implemented.");
    }

    async findProducts(query: ProductQuerying): Promise<ProductEntity[]> {

        const {supplierId, categoryId, name, active, isShowAll} = query;

        const where = {
            isDeleted: false
        };
        if (!isShowAll)
            where['active'] = active;

        if (supplierId)
            where['supplier._id'] = supplierId;
            
        if (categoryId)
            where['categories.treeCategories._id'] = new ObjectId(categoryId);

        if (name)
            where['name'] = {
                '$regex': `.*${name}`,
                '$options': 'i'
            };

        return await this.productDao.find({
            where: where,   
            select: [
                '_id',
                'images',
                'brand',
                'supplier',
                'numberOfPackage',
                'originalPrice',
                'discount',
                'packing',
                'name',
                'active',
            ],
            order: {['updatedAt']: 'DESC'}
        });
    }

    async groupCategoriesBySupplier(supplierId: string): Promise<CategorySummaryEntity[]> {
        const cursor = await this.productDao.aggregate([
            {
                '$unwind': '$categories'
            },
            {
                '$match': {
                    'isDeleted': false,
                    'supplier._id': new ObjectId(supplierId)
                }
            },
            {
                '$group': {
                    '_id': '$categories._id',
                    'name': {
                        '$first': '$categories.name',
                    },
                    'total': {
                        '$sum': 1
                    }
                }
            }
        ]);
        const result = cursor.toArray();
        return result;
    }
}