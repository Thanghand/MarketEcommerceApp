import { ParentCategory } from './category.entity';

export interface CategorySummaryEntity {
    _id: string;
    name: string;
    image?: string;
    description: string;
    treeCategories: ParentCategory[];
    parentCategory: ParentCategory;
    node: number;
    total: number;
}
