import { DeliveryEntity, CompanyEntity, UserBasicInformationEntity } from '@models';
import { BaseRecordEntity } from './base.record.entity';

export interface WorkingDayHourEntity {
    startTime: number;
    endTime: number;
}

export interface RecordSupplierChanged extends BaseRecordEntity {
}

export interface SupplierEntity extends CompanyEntity {
    deliveryOption?: DeliveryEntity;
    workingDayHour?: WorkingDayHourEntity;
    transactions: RecordSupplierChanged[];
}