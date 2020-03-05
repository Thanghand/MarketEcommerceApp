import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { SchemaUtil } from '@shared.all/utils';
import { BaseSchema } from '@libs/mongo';

export interface IBaseRepository<T> {
    create(item: T): Promise<T>;
    update(id: string, item: any): Promise<T>;
    getById(id: string): Promise<T>;
    deleteById(id: string): Promise<T>;
}

export class MongoBaseRepository<Entity, Schema extends BaseSchema> implements IBaseRepository<Entity> {
   
    constructor(private readonly baseDao: MongoRepository<Schema>, 
                private schema: new () => Schema) {}

    async create(item: Entity,): Promise<Entity> {
        const schema = SchemaUtil.createNewSchema(item, this.schema) as Entity;
        return await this.baseDao.save(schema);
    }
    
    async update(id: string, item: Entity, hasUpdateRecords: boolean = false): Promise<Entity> {
        const updatedAt = new Date();
        const result = await this.baseDao.findOneAndUpdate({ _id: new ObjectId(id)}, 
                                                                        {$set: {...item, updatedAt}}, 
                                                                        {returnOriginal: false});
        return result.value;
    }

    async getById(id: string): Promise<Entity> {
        const result = await this.baseDao.findOne({
            where: {_id: new ObjectId(id)}
        });
        return result as any;
    }

    async deleteById(id: string): Promise<Entity> {
        const result = await this.baseDao.findOneAndUpdate({ _id: new ObjectId(id)}, 
                                            {$set: {isDeleted: true }}, 
                                            {returnOriginal: false});
        return result.value;
    }
}
