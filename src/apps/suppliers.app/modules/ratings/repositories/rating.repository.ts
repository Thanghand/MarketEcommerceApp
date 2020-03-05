import { MongoBaseRepository } from '@shared.core';
import { RatingSchema } from 'src/apps/suppliers.app/libs/mongo/schemas/rating.schema';
import { RatingEntity } from '@models';
import { IRatingRepository } from './rating.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingRepository extends MongoBaseRepository<RatingEntity, RatingSchema> implements IRatingRepository {
   

    constructor(@InjectRepository(RatingSchema, Configuration.getConfig().getService(AppServiceNameConfig.Suppliers).mongodb.getConnection())
    private readonly ratingDao: MongoRepository<RatingSchema>) {
        super(ratingDao, RatingSchema);
    }

    async getRatingBySupplierId(id: string): Promise<RatingEntity> {
        const result = await this.ratingDao.findOne({
            where: {supplierId: id}
        });
        if (!result)
            return null;

        return result;
    }
}