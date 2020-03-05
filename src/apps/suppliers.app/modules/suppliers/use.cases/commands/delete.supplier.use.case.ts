import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SuppliersRepository, ISuppliersRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';

@Injectable()
export class DeleteSupplierUseCase extends UseCase<string, boolean> {
    
    constructor(@Inject(SuppliersRepository) private readonly suppliersRepo: ISuppliersRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<boolean> {

        if (!input)
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        
        const result = await this.suppliersRepo.deleteById(input);
        if (!result)
            throw new HttpException('Cannot delete supplier', HttpStatus.BAD_REQUEST);

        return true;
    }
    
}