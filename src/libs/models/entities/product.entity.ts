import { Entity } from './base.entity';
import { ReviewEntity } from './review.entity';
import { ParentCategory } from './category.entity';
import { Unit } from '../enums/unit';
import { BaseRecordEntity } from './base.record.entity';

export interface ProductCatalog {
    _id: string;
    name: string;
    treeCategories: ParentCategory[];
}

export interface Brand {
    _id: string; 
    name: string;
}

export interface ProductSupplier {
    _id: string;
    name: string;
}

export interface PackingEntity {
    quantity: number;
    unit: Unit;
}

export interface RecordProductChanged extends BaseRecordEntity {
    originalPrice?: number;
    packing?: PackingEntity;
    numberOfPackage?: number;
    discount?: number;
    categories?: ProductCatalog[];
    active?: boolean;
}

export interface ProductEntity extends Entity {
    name: string;
    originalPrice: number;
    brand: Brand;
    supplier: ProductSupplier;
    categories: ProductCatalog[];
    numberOfPackage: number;
    packing: PackingEntity;
    description?: string;
    reviews?: ReviewEntity[];
    discount?: number;
    images?: string[];
    transactions: RecordProductChanged[];
}