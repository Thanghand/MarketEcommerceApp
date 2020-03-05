import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { UserEntity } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { MongoRepository } from 'typeorm';
import { SchemaUtil, ObjectUtil } from '@shared.all/utils';
import { MongoBaseRepository } from '@shared.all/core/mongo.base.repository';
import { ObjectId } from 'mongodb';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { UserSchema } from '../../../libs/mongo/schemas/user.schema';


@Injectable()
export class UserRepository extends MongoBaseRepository<UserEntity, UserSchema> implements IUserRepository {
   
    constructor(@InjectRepository(UserSchema, Configuration.getConfig().getService(AppServiceNameConfig.Id).mongodb.getConnection()) private readonly userDao: MongoRepository<UserSchema>) {
        super(userDao, UserSchema);
    }

    async update(id: string, item: UserEntity, hasUpdateRecords: boolean = false): Promise<UserEntity> {
        const updatedAt = new Date();

        if (item.shippingAddress) {
            const result = await this.userDao.findOneAndUpdate({ _id: new ObjectId(id)}, 
                                                                        {$set: {'shippingAddress': item.shippingAddress, updatedAt}}, 
                                                                        {returnOriginal: false});
            return result.value;
        }
        
        const result = await this.userDao.findOneAndUpdate({ _id: new ObjectId(id)}, 
                                                                        {$set: {...item, updatedAt}}, 
                                                                        {returnOriginal: false});
        return result.value;
    }

    async findUsers(companyId: string): Promise<UserEntity[]> {
        return await this.userDao.find({
                where: { 
                    companyId: companyId, 
                    active: true,
                    isDeleted: false,
                },
                select: [
                    'firstName', 
                    'lastName',
                    'avatar',
                    'email',
                    '_id',
                    'phoneNumber',
                    'companyId',
                    'companyType',
                    'role',
                    'descriptions',
                    'location'
                ]
        });
    }

    async saveAll(users: UserEntity[]): Promise<UserEntity[]> {
        const emails = _.map(users, 'email');
  
        const existedUsers = await this.userDao.find({
            where: {email: { $in: emails }, isDeleted: false},
        });
        if (existedUsers.length > 0)
            throw new HttpException('Users have already existed', HttpStatus.INTERNAL_SERVER_ERROR);
           
        const usersSchema: UserSchema[] = users.map(u => SchemaUtil.createNewSchema(u, UserSchema) as UserSchema);
        return await this.userDao.save(usersSchema);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const result = await this.userDao.findOne({'email': email});
        return result;
    }

    async deleteAccount(userId: string): Promise<UserEntity> {
        const result = await this.userDao.findOneAndDelete({_id: ObjectUtil.convertToMongoObjectId(userId)});
        return result.value as UserEntity;
    }
}
