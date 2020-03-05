import { Entity, Column, Index } from 'typeorm';
import { CompanyEntity, ContactsEntity, LicenseEntity, CompanyType, LocationEntity, UserBasicInformationEntity } from '../models';
import { BaseSchema } from './base.schema';

@Entity('company')
export class CompanySchema extends BaseSchema implements CompanyEntity {

    @Column() 
    @Index('name', { background: true })
    name: string;

    @Column() description: string;
    @Column() location: LocationEntity;
    @Column() companyType: CompanyType;
    @Column() email: string;
    @Column() phoneNumber: string;
    @Column() logo?: string = '';
    @Column() licenses?: LicenseEntity[] = [];
    @Column() media?: string[] = [];
    @Column() listContacts?: ContactsEntity[] = [];
    @Column() users: UserBasicInformationEntity[];

}