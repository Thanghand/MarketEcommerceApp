import { MongoBaseRepository } from '@shared.core';
import { MembershipRuleEntity } from '@models';
import { MembershipRuleSchema } from '../../../libs/mongo/schemas';
import { IMembershipRuleRepository } from './membership-rule.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { MongoRepository } from 'typeorm';


@Injectable()
export class MembershipRuleRepository extends MongoBaseRepository<MembershipRuleEntity, MembershipRuleSchema> implements IMembershipRuleRepository {
   
    constructor(@InjectRepository(MembershipRuleSchema, Configuration.getConfig().getService(AppServiceNameConfig.Membership).mongodb.getConnection())
    private readonly dao: MongoRepository<MembershipRuleSchema>) {
        super(dao, MembershipRuleSchema);
    }

    async getMembershipRuleDetail(active: boolean): Promise<MembershipRuleEntity> {

  
        const where = {
            'active': active
        };

        const entities = await this.dao.find({
            where,
            select: [
               '_id',
               'configs',
               'createdAt',
               'updatedAt',
               'active'
            ]
        });
        if (entities.length === 0) {
            return null;
        }

        return entities.shift();
    }

}