import { ShoppingCartEntity, CartProductEntity } from '@models';
import { Entity, Column } from 'typeorm';
import { BaseSchema } from '@libs/mongo';

@Entity('carts')
export class ShoppingCartSchema extends BaseSchema implements ShoppingCartEntity {
    @Column() userId: string;
    @Column() products: CartProductEntity[] = [];
}