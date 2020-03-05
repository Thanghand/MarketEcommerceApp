import { SupplierEntity, SupplierSummaryEntity } from '@models';
import { Inject } from '@nestjs/common';
import { ISuppliersRepository, SuppliersRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { ImageUtil } from '@shared.all/utils';

export class FindSuppliersUseCase extends UseCase<any, SupplierSummaryEntity[]> {

    constructor(@Inject(SuppliersRepository) private readonly supplierRepo: ISuppliersRepository) {
        super();
    }
    
    async buildUseCase(input?: any): Promise<SupplierSummaryEntity[]> {
        const result = await this.supplierRepo.find(input);
        result.forEach(s => s.logo = ImageUtil.mergeSourceCDNToId(s.logo));
        return result;
    }
}