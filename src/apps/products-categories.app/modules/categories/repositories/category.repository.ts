import { ICategoryRepository } from './category.repository.interface';
import { MongoBaseRepository } from '@shared.core';
import { CategoryEntity, ParentCategory, CategoryQuery } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CategorySummaryEntity } from '@models';
import * as _ from 'lodash';
import { ObjectUtil } from '@shared.all/utils';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';
import { CategorySchema } from '../../../libs/mongo/schemas';

const connection = Configuration.getConfig().getService(AppServiceNameConfig.ProductsCategoires).mongodb.getConnection();

export class CategoryRepository extends MongoBaseRepository<CategoryEntity, CategorySchema> implements ICategoryRepository {
   
    constructor(@InjectRepository(CategorySchema, connection) 
                private readonly categoryDao: MongoRepository<CategorySchema>) {
        super(categoryDao, CategorySchema);
    }

    async updateAndRemoveParent(id: string, item: any): Promise<CategoryEntity> {
        const result = await this.categoryDao.findOneAndUpdate({ _id: new ObjectId(id)}, 
                                                                {
                                                                    $set: {...item},
                                                                    $unset: { parentCategory: 1}
                                                                },
                                                                {returnOriginal: false});

        return result.value;
    }

    async createWithParentsID(entity: CategoryEntity, treeCategories: ParentCategory[]) {
        const newEntity = await super.create(entity) as CategoryEntity;
        const previousCategory = _.last(treeCategories);
        newEntity.node = treeCategories.length + 1;
        const currentCategory: ParentCategory = {
            node:  treeCategories.length + 1,
            _id: ObjectUtil.convertToMongoObjectId(newEntity._id),
        };
        treeCategories.push(currentCategory);
        newEntity.parentCategory = previousCategory;
        newEntity.treeCategories = treeCategories;

        const result = await super.update(newEntity._id, newEntity);
        return result;
    }

    async create(entity: CategoryEntity): Promise<CategoryEntity> {
        let newEntity = await super.create(entity) as CategoryEntity;
        if (newEntity.treeCategories.length === 0) {
            const parentID: ParentCategory = {
                node: 1,
                _id: newEntity._id,
            };
            newEntity.treeCategories.push(parentID);
            newEntity = await super.update(newEntity._id, newEntity);
        }
        return newEntity;
    }

    async getAllCategories(): Promise<CategoryEntity[]> {
        const result = await this.categoryDao.find({
            where: {
                active: true,
                isDeleted: false    
            },
            select: [
                '_id',
                'image',
                'name',
                'description'
            ]
        });
        return result;
    }

    async findCategoriesWithGroupID(categoriesId: string[]): Promise<CategoryEntity[]> {
        const objectsId: ObjectId[] = categoriesId.map(i => new ObjectId(i));
        const result = await this.categoryDao.find({
            where: {
                active: true,
                _id: { $in: objectsId},
                isDeleted: false,
            },
            select: [
                '_id',
                'treeCategories',
                'name'
            ]
        });
        return result;
    }

    async getAllCategoriesWithCountingProduct(query?: CategoryQuery): Promise<CategorySummaryEntity[]> {

        const  andQuery = [
            {
                $eq : [
                    '$categories.treeCategories._id',
                    '$$categories_id'
                ]
            },
            {
                $eq: [
                    '$isDeleted',
                    false
                ]
            }
        ];

        if (query && query.brandId) {
            const compareBrand = {
                $eq: [
                    '$supplier._id',
                    new ObjectId(query.brandId)
                ]
            };
            andQuery.push(compareBrand);
        }

        const cursor = await this.categoryDao.aggregate(
            [
                { 
                    $match : {
                        'active' : true,
                        'isDeleted': false,
                    }
                }, 
                { 
                    $lookup : {
                        'from' : 'products', 
                        'let' : {
                            'categories_id' : '$_id'
                        }, 
                        'pipeline' : [
                            {
                                $unwind : {
                                    'path' : '$categories'
                                }
                            }, 
                            {
                                $unwind : {
                                    'path' : '$categories.treeCategories'
                                }
                            }, 
                            {
                                $match : {
                                    $expr : {
                                        $and : andQuery
                                    }
                                }
                            }
                        ], 
                        'as' : 'products'
                    }
                }, 
                {
                    $project : {
                        'name' : 1.0, 
                        'image' : 1.0,
                        'active': 1.0,
                        'description': 1.0,
                        'node': 1.0,
                        'treeCategories': 1.0,
                        'parentCategory': 1.0,
                        'total': {$size: '$products'},
                    }
                }
            ], 
            { 
                'allowDiskUse' : true
            }
        );
        const result = await cursor.toArray();
        return result;
    }
}
