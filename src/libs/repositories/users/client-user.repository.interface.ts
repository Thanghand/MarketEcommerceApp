import { UserEntity, UserResponse, UpdatingUserParam } from '@models';

export interface IClientUserRepository {
    getById(id: string): Promise<UserEntity>;
    updateShippingAddress(id: string, item: UserEntity): Promise<UserEntity>;
    getUsersInCompany(companyId: string): Promise<UserResponse[]>;
    getUserDetail(id: string): Promise<UserResponse>;
    updateUser(param: UpdatingUserParam): Promise<UserResponse>;
    deleteUser(id: string): Promise<boolean>;
}