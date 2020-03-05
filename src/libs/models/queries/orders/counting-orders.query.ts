import { CompanyType } from '@libs/models/enums/company.type';

export interface CountingOrdersQuery {
    companyType: CompanyType;
    companyIds: string[];
}