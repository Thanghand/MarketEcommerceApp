import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { CategoryRepository, ICategoryRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

@Injectable()
export class DeleteCategoryUseCase extends UseCase<string, boolean> {

    private readonly tag = 'DeleteCategoryUseCase';
    constructor(@Inject(CategoryRepository) private readonly categoryRepository: ICategoryRepository,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: string): Promise<boolean> {
        if (!input) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
        
        const result = await this.categoryRepository.deleteById(input);
        if (!result)
            throw new HttpException(MessageConstant.SOMETHING_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        return true;
    }

}