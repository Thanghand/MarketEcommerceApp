import { Entity, Column } from 'typeorm';
import { RestaurantEntity, ShippingAddressEntity, RecordRestaurantChanged, UserBasicInformationEntity } from '@models';
import { CompanySchema } from '@libs/mongo';
 
@Entity('restaurants')
export class RestaurantSchema extends CompanySchema implements RestaurantEntity {
    @Column() shippingAddresses?: ShippingAddressEntity[] = [];
    @Column() transactions: RecordRestaurantChanged[] = [];
}