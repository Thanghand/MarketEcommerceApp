import { Brand } from '@models';



export interface ProductSummaryResponse {
    
    _id: string;
    name: string;
    originalPrice: number;
    brand: Brand;
    discount: number;
    description?: string;
    image?: string;
    packSize: string;
    active: boolean;
}