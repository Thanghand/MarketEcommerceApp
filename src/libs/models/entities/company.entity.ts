import { Entity } from './base.entity';
import { ContactsEntity, LicenseEntity, CompanyType, LocationEntity, UserBasicInformationEntity } from '..';


export interface CompanyEntity extends Entity {
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    location: LocationEntity;
    companyType: CompanyType;
    media?: string[];
    logo?: string;
    listContacts?: ContactsEntity[];
    licenses?: LicenseEntity[]; 
    users: UserBasicInformationEntity[];
}