import { LocationEntity } from '@models';

export interface SupplierSummaryEntity {
    _id: string;
    name: string;
    logo: string;
    active: boolean; 
    description: string;
    total?: number;
    location: LocationEntity;
    totalOrders?: number;
}