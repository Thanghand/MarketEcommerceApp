import { UserBasicInformationEntity } from '@libs/models/entities';


export class UpdatingUsersInRestaurantParam {
    restaurantId: string;
    users: UserBasicInformationEntity[];
}