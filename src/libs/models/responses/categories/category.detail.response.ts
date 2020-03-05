import { ParentCategory } from '@models';

export class CategoryDetailResponse {
  _id: string;
  image: string;
  name: string;
  node?: number;
  description: string;
  parentCategory: ParentCategory;
  treeCategories?: ParentCategory[];
}
