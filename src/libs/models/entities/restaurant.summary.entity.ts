import { LocationEntity } from '@models';


export class RestaurantSummaryEntity {
    _id: string;
    name: string;
    logo: string;
    active: boolean; 
    description: string;
    location: LocationEntity;
    totalOrders?: number;
}