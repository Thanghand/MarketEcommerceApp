import { RestaurantEntity, CreatingRestaurantDto, RestaurantDetailInforResponse, UpdatingRestaurantParam, RestaurantSummaryEntity, UpdatingUsersInRestaurantParam, UpdatingUsersInCompanyParam } from '@models';

export interface IClientRestaurantsRepository {
    getById(id: string, isGetEntity?: boolean): Promise<RestaurantDetailInforResponse | RestaurantEntity>;
    createRestaurant(dto: CreatingRestaurantDto): Promise<RestaurantEntity>;
    findRestaurants(): Promise<RestaurantSummaryEntity[]>;
    updateRestaurant(input: UpdatingRestaurantParam): Promise<RestaurantEntity>;
    deleteRestaurant(id: string): Promise<boolean>;
    updateUsers(params: UpdatingUsersInCompanyParam): Promise<boolean>;
    
}