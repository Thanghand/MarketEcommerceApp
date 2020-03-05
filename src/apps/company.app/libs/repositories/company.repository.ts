import { MongoBaseRepository } from '@shared.core';
import { CompanySchema } from '@libs/mongo';
import { CompanyEntity } from '@models';
import { ICompanyRepository } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Configuration } from '@shared.all/config/apps.configuration';
import { AppServiceNameConfig } from '@shared.all/config';

@Injectable()
export class CompanyRepository extends MongoBaseRepository<CompanyEntity, CompanySchema> implements ICompanyRepository {

    constructor(@InjectRepository(CompanySchema, Configuration.getConfig().getService(AppServiceNameConfig.Company).mongodb.getConnection()) 
                private readonly companyDao: MongoRepository<CompanySchema>) {
        super(companyDao, CompanySchema);
    }

    async findAllCompany(): Promise<CompanyEntity[]> {
        return await this.companyDao.find();
    }

    async create(item: CompanySchema): Promise<CompanyEntity> {
       return await this.companyDao.save(item);
    }
}
