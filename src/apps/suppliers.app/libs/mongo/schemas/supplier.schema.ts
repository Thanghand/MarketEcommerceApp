import { SupplierEntity, DeliveryEntity, WorkingDayHourEntity, RecordSupplierChanged } from '@models';
import { Entity, Column } from 'typeorm';
import { CompanySchema } from '@libs/mongo';

@Entity('suppliers')
export class SupplierSchema extends CompanySchema implements SupplierEntity {
    @Column() deliveryOption?: DeliveryEntity;
    @Column() workingDayHour?: WorkingDayHourEntity;
    @Column() transactions: RecordSupplierChanged[] = [];
}