import { RestaurantEntity, RecordRestaurantChanged, CompanyType, BaseDomain, UpdatingRestaurantDto, CreatingRestaurantDto, UserBasicInformationEntity } from '@models';
import { ImageUtil } from '@shared.all/utils';

export class RestaurantDomain extends BaseDomain<RestaurantEntity> {

    updateRestaurant(input: UpdatingRestaurantDto): void {

        this.entity.description = input.description;
        this.entity.listContacts = input.listContacts ? input.listContacts : [];
        this.entity.location = input.location;
        this.entity.media = input.media ? input.media : [];
        this.entity.companyType = CompanyType.Restaurants;
        this.entity.logo = input.logo ? ImageUtil.getIdFromUrlImage(input.logo) : '';
        this.entity.email = input.email;
        this.entity.phoneNumber = input.phoneNumber;
        this.entity.licenses = input.licenses ? input.licenses : [];

        if (this.entity.name !== input.name) {
            this.entity.name = input.name;
            const newRecord: RecordRestaurantChanged = {
                updatedAt: new Date,
                name: input.name,
            };
            this.entity.transactions.push(newRecord);
        }
    }

    createRestaurant(input: CreatingRestaurantDto): void {
        const newRecord: RecordRestaurantChanged = {
            updatedAt: new Date,
            name: input.name,
        };

        const entity: RestaurantEntity = {
            name: input.name,
            description: input.description,
            location: input.location,
            companyType: CompanyType.Restaurants,
            email: input.email,
            phoneNumber: input.phoneNumber,
            listContacts: input.listContacts,
            media: input.media,
            logo: input.logo ? ImageUtil.getIdFromUrlImage(input.logo) : '',
            licenses: input.licenses,
            transactions: [newRecord],
            users: [],
        };

        this.entity = entity;
    }

    updateUsersInRestaurant(users: UserBasicInformationEntity[]) {
        if (!this.entity.users)
            this.entity.users = [];
        
        const entitiesUsers = [...this.entity.users];
        users.forEach(u => {
            if (!entitiesUsers.includes(u))
                this.entity.users.push(u);
        });
    }
}