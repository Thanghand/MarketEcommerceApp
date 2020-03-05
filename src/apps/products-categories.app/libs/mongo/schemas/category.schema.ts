import { Entity, Column } from 'typeorm';
import { CategoryEntity, ParentCategory } from '@models';
import { BaseSchema } from '@libs/mongo';

@Entity('categories')
export class CategorySchema extends BaseSchema implements CategoryEntity {

    @Column() name: string;
    @Column() treeCategories?: ParentCategory[] = [];
    @Column() parentCategory?: ParentCategory;
    @Column() image?: string = '';
    @Column() description?: string = '';
    @Column() node?: number = 1;
}