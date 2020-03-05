import { Injectable, Inject } from '@nestjs/common';
import { UserResponse } from '@models';
import { UserRepository, IUserRepository } from '../repositories';

import { MapperUser } from '../../../libs/shared/utils';
import { UseCase } from '@shared.core';
import { UserEntity } from '@models';

@Injectable()
export class GetUserDetailUseCase extends UseCase<string, UserResponse | UserEntity> {

    constructor(@Inject(UserRepository) private readonly userRepo: IUserRepository) {
        super();
    }

    async buildUseCase(id?: string, isGetEntity?: boolean): Promise<UserResponse> {
        const entity = await this.userRepo.getById(id);
        if (isGetEntity)
            return entity;
        return MapperUser.mappingUserEntityToUserResponse(entity);
    }
}