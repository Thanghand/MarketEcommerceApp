import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, IUserRepository } from '../repositories';
import { UserResponse } from '@models';
import { UseCase } from '@shared.core';
import { MapperUser } from '../../../libs/shared/utils';

@Injectable()
export class GetUsersCompanyUseCase extends UseCase<string, UserResponse[]> {

    constructor(@Inject(UserRepository) private readonly userRepo: IUserRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<UserResponse[]> {
        const entities =  await this.userRepo.findUsers(input);
        return entities.map((item) => {
            return MapperUser.mappingUserEntityToUserResponse(item);
        });
    }
    
}