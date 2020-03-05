import { Entity } from '@models';

export class BaseDomain<T extends Entity> {
    
    constructor(protected entity?: T) {
        this.entity = {...entity};
    }

    getEntity(): T {
        return this.entity;
    }
}