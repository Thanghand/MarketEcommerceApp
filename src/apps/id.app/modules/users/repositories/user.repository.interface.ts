import { IBaseRepository } from '@shared.all/core/mongo.base.repository';
import { UserEntity } from '@models';

export interface IUserRepository extends IBaseRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity>;
    saveAll(users: Array<UserEntity>): Promise<Array<UserEntity>>;
    findUsers(companyId: string): Promise<Array<UserEntity>>;
    deleteAccount(userId: string): Promise<UserEntity>;
}
