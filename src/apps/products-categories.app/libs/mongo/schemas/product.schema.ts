import { ProductEntity, ProductCatalog, Brand, ReviewEntity, PackingEntity, ProductSupplier, RecordProductChanged } from '@models';
import { Column, Entity } from 'typeorm';
import { BaseSchema } from '@libs/mongo';

@Entity('products')
export class ProductSchema extends BaseSchema implements ProductEntity {
   
    @Column() name: string;
    @Column() originalPrice: number;

    @Column() brand: Brand;
    @Column() supplier: ProductSupplier; // replace old brand property 

    @Column() categories: ProductCatalog[];
    @Column() numberOfPackage: number;
    @Column() packing: PackingEntity;
    @Column() discount: number = 0;
    @Column() description?: string = '';
    @Column() reviews?: ReviewEntity[] = [];
    @Column() images?: string[] = [];
    
    // Override active 
    @Column() active: boolean = false;
    @Column() transactions: RecordProductChanged[] = [];
}