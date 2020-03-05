import { CompanyEntity, ShippingAddressEntity } from '@models';
import { BaseRecordEntity } from './base.record.entity';
import { UserBasicInformationEntity } from './user-basic-information.entity';


export interface RecordRestaurantChanged extends BaseRecordEntity {
}

export interface RestaurantEntity extends CompanyEntity {
    shippingAddresses?: ShippingAddressEntity[];
    transactions: RecordRestaurantChanged[];
}
