import { CompanyType } from './enums/company.type';

export class TokenUserPayload {
    _id: string;
    userName: string;
    email: string;
    companyId: string;
    companyType: CompanyType;
    role: string;
}