import { CompanyType, SignInDto } from '@models';

export interface SignInParam {
    resource: CompanyType;
    dto: SignInDto;
}