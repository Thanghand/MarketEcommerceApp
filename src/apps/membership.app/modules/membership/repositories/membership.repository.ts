import { MongoBaseRepository } from '@shared.core';
import { IMembershipRepository } from './membership.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipSchema } from 'src/apps/membership.app/libs/mongo/schemas';
import { MembershipEntity, MembershipQuery, MembershipDetailQuery } from '@libs/models';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipRepository extends MongoBaseRepository<MembershipEntity, MembershipSchema> implements IMembershipRepository {
  
    constructor(@InjectRepository(MembershipSchema, Configuration.getConfig().getService(AppServiceNameConfig.Membership).mongodb.getConnection())
    private readonly dao: MongoRepository<MembershipSchema>) {
        super(dao, MembershipSchema);
    }

    async getMemberships(query: MembershipQuery): Promise<MembershipEntity[]> {

        const {date, point, userName, type} = query;

        const where = {}; 

        const dateTime = new Date(date);
        const firstDayOfMonth = new Date(dateTime.getFullYear(), dateTime.getMonth());
        const lastDayOfMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0);

        if (date) {
            where['lastDayOfMonth'] = {
                '$gte': firstDayOfMonth,
                '$lte': lastDayOfMonth
            };
        }

        if (point) {
            where['point'] = point;
        }

        if (userName) {
            where['user.name'] = userName;
        }

        if  (type) {
            where['type'] = type;
        }

        const entities = await this.dao.find({
            where,
            select: [
                '_id',
                'createdAt',
                'updatedAt',
                'lastDayOfMonth',
                'user',
                'type',
                'point',
                'note',
                'orders',
                'rule'
            ]
        });
        return entities;
    }

    async getMembershipDetail(query: MembershipDetailQuery): Promise<MembershipEntity> {

        const {userId, currentDate} = query;

        const date = new Date(currentDate);
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth());
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const where = {
            'user._id': userId,
            'lastDayOfMonth': {
                '$gte': firstDayOfMonth,
                '$lte': lastDayOfMonth
            }
        };
        
        const entities = await this.dao.find({
            where,
            select: [
                '_id',
                'createdAt',
                'updatedAt',
                'lastDayOfMonth',
                'user',
                'type',
                'point',
                'note',
                'orders',
                'rule',
            ]
        });
        if (entities.length === 0)
            return null;

        return entities.shift();
    }
}