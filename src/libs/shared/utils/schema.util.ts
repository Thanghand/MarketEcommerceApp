import { Entity } from '@models';
import * as _ from 'lodash';
import { BaseSchema } from '@libs/mongo';

export class SchemaUtil {
    public static createNewSchema<T extends BaseSchema>(entity: Entity, schema: new() => T): Entity {
        const newEntity = _.forIn(entity, function(value, key) {
            if (value === undefined || value === null)
                delete entity[key];
        });
        const result =  {
            ...new schema(),
            ...newEntity,
        };
        return result as T;
    }
}