import { Entity } from './base.entity';
import { DeliveryEntity, WorkingDayHourEntity } from '@models';

export interface CartProductEntity {
    _id: string;
    quantity: number;
    active?: boolean ;
    supplierId: string;
    supplierName?: string;
    supplierLogo?: string;
    name?: string;
    images?: string[];
    price?: number;
    isProductActive?: boolean;
    isProductDeleted?: boolean;
    deliveryOption?: DeliveryEntity;
    workingDayHour?: WorkingDayHourEntity;
}

export interface ShoppingCartEntity extends Entity {
    userId: string;
    products: CartProductEntity[];
}
