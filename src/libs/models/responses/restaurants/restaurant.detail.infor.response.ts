import { LocationEntity, CompanyType, ContactsEntity, LicenseEntity } from '@models';

export class RestaurantDetailInforResponse {
    _id: string;
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
}