import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, IUserRepository} from '../../users/repositories';
import { UserEntity, TokenUserPayload } from '@models';
import { UseCase } from '@shared.core';

@Injectable()
export class ValidateUserUseCase extends UseCase<TokenUserPayload, UserEntity> {

    constructor(@Inject(UserRepository) private readonly userRepository: IUserRepository) {
        super();
    }

    async buildUseCase(input?: TokenUserPayload): Promise<UserEntity> {
        return await this.userRepository.findByEmail(input.email);
    }
}