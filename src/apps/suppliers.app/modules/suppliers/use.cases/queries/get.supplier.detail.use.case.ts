import { SupplierEntity } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { ISuppliersRepository, SuppliersRepository } from '../../repositories';
import { UseCase } from '@shared.core';
import { ImageUtil } from '@shared.all/utils';

@Injectable()
export class GetSupplierDetailUseCase extends UseCase<string, SupplierEntity> {

    constructor(@Inject(SuppliersRepository) private readonly supplierRepo: ISuppliersRepository) {
        super();
    }

    async buildUseCase(input?: string): Promise<SupplierEntity> {
        const entity = await this.supplierRepo.getById(input);
        entity.logo = ImageUtil.mergeSourceCDNToId(entity.logo);
        return entity;
    }
}