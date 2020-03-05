import { DeliveryEntity, WorkingDayHourEntity } from '@models';


export class CartProductResponse {
    _id: string;
    name?: string;
    image: string;
    quantity: number;
    supplierId: string;
    supplierName: string;
    price: number;
    active: boolean;
    isSoldOut: boolean;
}

export class CartSuppliers {
    supplierId: string;
    supplierName: string;
    supplierLogo: string;
    deliveryOption: DeliveryEntity;
    workingDayHour: WorkingDayHourEntity;
    products: CartProductResponse[];
    active: boolean;
}

export class ShoppingCartDetailResponse {
    _id?: string;
    userId: string;
    groupCartSuppliers: CartSuppliers[];
}