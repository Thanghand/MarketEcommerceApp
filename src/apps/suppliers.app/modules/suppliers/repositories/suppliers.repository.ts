import { SupplierEntity, SupplierSummaryEntity } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongoBaseRepository } from '@shared.core';
import { ISuppliersRepository } from './suppliers.repository.interface';
import { SupplierSchema } from '../../../libs/mongo/schemas';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';

export class SuppliersRepository extends MongoBaseRepository<SupplierEntity, SupplierSchema> implements ISuppliersRepository {

    constructor(@InjectRepository(SupplierSchema, Configuration.getConfig().getService(AppServiceNameConfig.Suppliers).mongodb.getConnection()) 
                private readonly supplierDao: MongoRepository<SupplierSchema>) {
        super(supplierDao, SupplierSchema);
    }

    async find(query: any): Promise<SupplierSummaryEntity[]> {
        const cursor = await this.supplierDao.aggregate(
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
                        'foreignField': 'supplier._id',
                        'localField': '_id',
                        'as' : 'products'
                    }
                }, 
                {
                    $project : {
                        '_id': 1.0,
                        'name' : 1.0, 
                        'logo' : 1.0,
                        'active': 1.0,
                        'description': 1.0,
                        'location': 1.0,
                        'total': {$size: '$products'},
                    }
                }
            ], 
            { 
                'allowDiskUse' : true
            }
        );
        return await cursor.toArray();
    }
}