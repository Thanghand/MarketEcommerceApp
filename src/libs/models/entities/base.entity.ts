import { ObjectId } from 'mongodb';

export interface Entity {
    active?: boolean;
    _id?: string | ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    isDeleted?: boolean;
    name?: string;
}

export type IEntity = Entity;

