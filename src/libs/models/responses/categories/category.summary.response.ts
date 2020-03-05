import { ParentCategory } from '@models';

export class CategorySummaryResponse {
    _id: string;
    name: string;
    description: string;
    treeCategories?: ParentCategory[];
    parentCategory?: ParentCategory;
    node?: number;
    image?: string;
    total?: number;
}
