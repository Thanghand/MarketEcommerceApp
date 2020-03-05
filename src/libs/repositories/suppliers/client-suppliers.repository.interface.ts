import { SupplierEntity, CreatingSupplierDto, UpdatingSuppierParam, SupplierSummaryEntity, UpdatingUsersInCompanyParam } from '@models';


export interface IClientSuppliersRepository {
    getById(id: string): Promise<SupplierEntity>;
    createSupplier(dto: CreatingSupplierDto): Promise<SupplierEntity>;
    updateSupplier(input: UpdatingSuppierParam): Promise<SupplierEntity>;
    deleteSupplier(id: string): Promise<boolean>;
    getSupplierDetail(id: string): Promise<SupplierEntity>; 
    findSuppliers(): Promise<SupplierSummaryEntity[]>;
    updateUsers(params: UpdatingUsersInCompanyParam): Promise<boolean>;

}