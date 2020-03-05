import { Entity } from './base.entity';

export interface ParentCategory {
    node: number;
    _id: string;
}

export interface CategoryEntity extends Entity {
    name: string;
    treeCategories?: ParentCategory[];
    parentCategory?: ParentCategory;
    image?: string;
    description?: string;
    node?: number;
}
