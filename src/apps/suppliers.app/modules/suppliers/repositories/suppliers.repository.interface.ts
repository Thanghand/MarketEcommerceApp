import { SupplierEntity, SupplierSummaryEntity } from '@models';
import { IBaseRepository } from '@shared.all/core';

export interface ISuppliersRepository extends IBaseRepository<SupplierEntity> {
    find(query: any): Promise<SupplierSummaryEntity[]> ;
}