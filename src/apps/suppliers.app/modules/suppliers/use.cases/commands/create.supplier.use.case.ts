import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupplierDomain } from '../../models';
import { SuppliersRepository, ISuppliersRepository } from '../../repositories';
import { SupplierEntity, CreatingSupplierDto } from '@models';
import { UseCase } from '@shared.core';
import { MessageConstant } from '@shared.all/constants';

@Injectable()
export class CreateSupplierUseCase extends UseCase<CreatingSupplierDto, SupplierEntity> {

    constructor(@Inject(SuppliersRepository) private readonly supplierRepository: ISuppliersRepository) {
        super();
    }

    async buildUseCase(input?: CreatingSupplierDto): Promise<SupplierEntity> {

        if (this.isMissingFields(input)) {
            console.error(MessageConstant.MISSING_FIELDS);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const supplierDomain = new SupplierDomain();
        supplierDomain.createSupplier(input);
        return await this.supplierRepository.create(supplierDomain.getEntity());
    }

    private isMissingFields(input: CreatingSupplierDto): boolean {
        return !input.email || !input.name || !input.phoneNumber;
    }
}
