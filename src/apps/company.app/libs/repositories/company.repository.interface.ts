import { IBaseRepository } from '@shared.core';
import { CompanyEntity } from '@models';

export interface ICompanyRepository extends IBaseRepository<CompanyEntity> {
    findAllCompany(): Promise<CompanyEntity[]>;
}
