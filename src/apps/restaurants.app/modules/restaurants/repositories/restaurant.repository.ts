import { Injectable } from '@nestjs/common';
import { IRestaurantsRepository } from './restaurants.repository.interface';
import { RestaurantEntity, RestaurantSummaryEntity } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MongoBaseRepository } from '@shared.core';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { RestaurantSchema } from '../../../libs/mongo/schemas';

@Injectable()
export class RestaurantsRepository extends MongoBaseRepository<RestaurantEntity, RestaurantSchema> implements IRestaurantsRepository {

    constructor(@InjectRepository(RestaurantSchema, Configuration.getConfig().getService(AppServiceNameConfig.Restaurants).mongodb.getConnection())
    private readonly restaurantDao: MongoRepository<RestaurantSchema>) {
        super(restaurantDao, RestaurantSchema);
    }

    async find(query: any = {}): Promise<RestaurantSummaryEntity[]> {
        const result = await this.restaurantDao.find({
            where: { active: true, isDeleted: false }
        }) as RestaurantSummaryEntity[];
        return result;
    }
}
