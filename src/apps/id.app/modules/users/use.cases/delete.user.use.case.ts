import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUserRepository, UserRepository } from '../repositories';
import { UseCase } from '@shared.core';
import { MessageConstant } from '@shared.all/constants';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

export class DeleteUserUseCase extends UseCase<string, boolean> {

    private readonly tag = 'DeleteUserUseCase';
    constructor(@Inject(UserRepository) private readonly userRepo: IUserRepository,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: string): Promise<boolean> {
        if (!input) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const result = await this.userRepo.deleteAccount(input);
        if (!result) {
            this.loggerService.error('Cannot delete user', this.tag);
            throw new HttpException('Cannot delete user', HttpStatus.BAD_REQUEST);
        }

        return true;
    }
}