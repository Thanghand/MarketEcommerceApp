import { SupplierEntity, BaseDomain, RecordSupplierChanged, CompanyType, CreatingSupplierDto, UpdatingSupplierDto, UserBasicInformationEntity } from '@models';
import { ImageUtil } from '@shared.all/utils';

export class SupplierDomain extends BaseDomain<SupplierEntity> {

    createSupplier(input: CreatingSupplierDto): void {
        const newRecord: RecordSupplierChanged = {
            updatedAt: new Date(),
            name: input.name
        };

        const entity: SupplierEntity = {
            name: input.name,
            description: input.description,
            companyType: CompanyType.Suppliers,
            email: input.email,
            phoneNumber: input.phoneNumber,
            location: input.location,
            listContacts: input.listContacts,
            licenses: input.licenses,
            logo: input.logo ? ImageUtil.getIdFromUrlImage(input.logo): '',
            media: input.media,
            deliveryOption: input.deliveryOption,
            workingDayHour: input.workingDayHour,
            transactions: [newRecord],
            users: [],
        };
        this.entity = entity;
    }

    updateInformation(input: UpdatingSupplierDto) {

        this.entity.description = input.description;
        this.entity.listContacts = input.listContacts ? input.listContacts : [];
        this.entity.location = input.location;
        this.entity.media = input.media ? input.media: [];
        this.entity.companyType = CompanyType.Suppliers;
        this.entity.logo = input.logo ? ImageUtil.getIdFromUrlImage(input.logo): '';
        this.entity.email = input.email;
        this.entity.phoneNumber = input.phoneNumber;
        this.entity.licenses = input.licenses ? input.licenses : [];
        this.entity.deliveryOption = input.deliveryOption;
        this.entity.workingDayHour = input.workingDayHour;

        if (this.entity.name !== input.name) {
            this.entity.name = input.name;
            const newRecord: RecordSupplierChanged = {
                updatedAt: new Date(),
                name: input.name
            };
            this.entity.transactions = [newRecord];
        }
    }
    updateUsersInCompany(users: UserBasicInformationEntity[]) {
        if (!this.entity.users) {
            this.entity.users = [];
        }
        const entitiesUsers = [...this.entity.users];
        users.forEach(u => {
            if (!entitiesUsers.includes(u)) 
                this.entity.users.push(u);
        });
    }
}