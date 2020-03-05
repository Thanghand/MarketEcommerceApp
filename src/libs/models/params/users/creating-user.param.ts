import { CompanyType } from '@models';
import { CreatingUsersDto } from '../../dtos/users';

export interface CreatingUserParam {
    companyType: CompanyType;
    dto: CreatingUsersDto;
}