import { BaseDomain, UserEntity, RecordUserChanged, CompanyType, Role, SignupDto, CreatingUserDto, UpdatingUserDto } from '@models';
import { AuthenticationUtil } from '../../../../libs/shared/utils';


export class UserDomain extends BaseDomain<UserEntity> {

    changePassword(password: string): void {
        this.entity.password = AuthenticationUtil.hashPassword(password);
    }

    changeInformation(dto: UpdatingUserDto): void {

        const newTransaction: RecordUserChanged = {
            updatedAt: new Date()
        };

        if (this.entity.firstName !== dto.firstName) {
            this.entity.firstName = dto.firstName;
            newTransaction.firstName = dto.firstName;
        }

        if (this.entity.lastName !== dto.lastName) {
            this.entity.lastName = dto.lastName;
            newTransaction.lastName = dto.lastName;
        }

        if (this.entity.phoneNumber !== dto.phoneNumber)
            this.entity.phoneNumber = dto.phoneNumber;

        this.entity.location = dto.location;
        this.entity.role = dto.role ? dto.role : Role.Employee;
        this.entity.avatar = dto.avatar ? dto.avatar : '';
        this.entity.descriptions = dto.descriptions ? dto.descriptions : '';
        this.entity.updatedAt = new Date();
        
        this.entity.transactions.push(newTransaction);
    }
}