import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository, IUserRepository } from '../repositories';
import * as _ from 'lodash';
import { MapperUser } from '../../../libs/shared/utils';
import { UseCase } from '@shared.core';
import { MessageConstant } from '@shared.all/constants';
import { UpdatingUserDto, UserResponse } from '@models';
import { UpdatingUserParam } from '@libs/models/params/users/updating-user.param';
import { UserDomain } from '../models';

export class UpdateUserUseCase extends UseCase<UpdatingUserParam, UserResponse> {
   
    constructor(@Inject(UserRepository) private readonly userRepo: IUserRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingUserParam): Promise<UserResponse> {

        const {id, dto} = input;

        if (this.isMissingFields(dto))
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const entity = await this.userRepo.getById(id);
        const user = new UserDomain(entity);

        if (!this.isPasswordEmpty(dto))
            user.changePassword(dto.password);
        
        user.changeInformation(dto);
        const result = await this.userRepo.update(id, user.getEntity());
        if (!result)
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.BAD_REQUEST);

        return MapperUser.mappingUserEntityToUserResponse(result);
    }

    isMissingFields(input: UpdatingUserDto) {
        return !input;
    }

    isPasswordEmpty(input: UpdatingUserDto) {
        return !input.password || input.password === '';
    }
}