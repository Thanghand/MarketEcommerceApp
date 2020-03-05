import { Brand, ProductCatalog, ReviewEntity } from '@models';

export class ProductDetailResponse {
    _id: string;
    name: string;
    originalPrice: number;
    brand: Brand;
    categories: ProductCatalog[];
    packSize: string;
    description?: string;
    reviews?: ReviewEntity[];
    discount?: number;
    images?: string[];
    active: boolean;
}