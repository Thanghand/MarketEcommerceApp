import { Entity } from '@models';
import { ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectLiteral } from 'typeorm';

export class BaseSchema implements ObjectLiteral, Entity {

    @ObjectIdColumn()
    _id: string;

    @Column() active: boolean = true;

    @Column() isDeleted: boolean = false;

    @CreateDateColumn() createdAt?: Date = new Date();
    @UpdateDateColumn() updatedAt?: Date = new Date();

    @Column() version: number = 1;

}