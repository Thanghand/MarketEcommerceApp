import { CompanyEntity } from '@models';

export interface IClientCompanyRepository {
    getById(id: string): Promise<CompanyEntity>;
}