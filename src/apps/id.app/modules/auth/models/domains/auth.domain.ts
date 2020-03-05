import { BaseDomain, UserEntity, SignupDto, RecordUserChanged, CreatingUserDto, CompanyType } from '@libs/models';
import { AuthenticationUtil } from '../../../../libs/shared/utils';

export class AuthDomain extends BaseDomain<UserEntity> {
    
    public createUserBySignUpDto(input: SignupDto): void {
        const newRecord: RecordUserChanged = {
            firstName: input.firstName,
            lastName: input.lastName,
            updatedAt: new Date(),
        };

        const userEntity: UserEntity = {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: AuthenticationUtil.hashPassword(input.password),
            phoneNumber: input.phoneNumber,
            companyId: input.companyId.toString(), // ObjectId
            companyType: input.companyType,
            avatar: input.avatar,
            descriptions: input.descriptions,
            role: input.role,
            location: input.location,
            transactions: [newRecord]
        };
        this.entity = userEntity;
    }

    createUser(input: CreatingUserDto, companyId: string, companyType: CompanyType): void {
        const newRecord: RecordUserChanged = {
            firstName: input.firstName,
            lastName: input.lastName,
            updatedAt: new Date(),
        };

        const entity: UserEntity = {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: AuthenticationUtil.hashPassword(input.password),
            phoneNumber: input.phoneNumber,
            companyId: companyId.toString(), // ObjectID
            companyType: companyType,
            avatar: input.avatar,
            descriptions: input.descriptions,
            role: input.role,
            location: input.location,
            transactions: [newRecord]
        };
        this.entity = entity;
    }
}