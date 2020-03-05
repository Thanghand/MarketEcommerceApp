import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CompanyEntity } from '@libs/models';
import { CompanyRepository, ICompanyRepository } from '../../../libs/repositories';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Controller()
export class CompanyController {

    constructor(@Inject(CompanyRepository) private readonly companyRepository: ICompanyRepository)  {
        
    }

    @MessagePattern(MessageEventName.COMPANY_DETAIL)
    async getCompamnyDetail(id: string): Promise<CompanyEntity> {
        const result = await this.companyRepository.getById(id);
        return result;
    }
}