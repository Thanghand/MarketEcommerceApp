import { 
    CreateSupplierUseCase, 
    DeleteSupplierUseCase, 
    UpdateSupplierUseCase, 
    GetSupplierDetailUseCase, 
    FindSuppliersUseCase } from '../use.cases';
import { SupplierEntity, SupplierSummaryEntity, CreatingSupplierDto, UpdatingSupplierDto, UpdatingSuppierParam, UpdatingUsersInCompanyParam } from '@models';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Controller } from '@nestjs/common';
import { UpdateUserInSuppliersUseCase } from '../use.cases/commands/update-users-in-suppliers.use.case';

@Controller('supplier-sub')
export class SuppliersController {

    constructor(private readonly createSupplierUseCase: CreateSupplierUseCase,
        private readonly updateSupplierUseCase: UpdateSupplierUseCase,
        private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
        private readonly getSupplierUseCase: GetSupplierDetailUseCase,
        private readonly findSuppliersUseCase: FindSuppliersUseCase,
        private readonly updateUsersInSuppliersUseCase: UpdateUserInSuppliersUseCase) {
    }

    @MessagePattern(MessageEventName.SUPPLIERS_CREATE)
    async createSupplier(dto: CreatingSupplierDto): Promise<SupplierEntity> {
        const result = await this.createSupplierUseCase.execute(dto);
        return result;
    }

    @MessagePattern(MessageEventName.SUPPLIERS_UPDATE)
    async updateSupplier(input: UpdatingSuppierParam): Promise<SupplierEntity> {
        const result = await this.updateSupplierUseCase.execute(input);
        return result;
    }

    @MessagePattern(MessageEventName.SUPPLIERS_DELETE)
    async deleteSupplier(id: string): Promise<boolean> {
        const result = await this.deleteSupplierUseCase.execute(id);
        return result;
    }

    @MessagePattern(MessageEventName.SUPPLIERS_DETAIL_ENTITY)
    async getSupplierDetail(id: string): Promise<SupplierEntity> {
        const result = await this.getSupplierUseCase.execute(id);
        return result;
    }

    @MessagePattern(MessageEventName.SUPPLIERS_LIST)
    async findSuppliers(): Promise<SupplierSummaryEntity[]> {
        const entities = await this.findSuppliersUseCase.execute(null);
        return entities;
    }

    @MessagePattern(MessageEventName.SUPPLIERS_UPDATE_USERS)
    async updateUsers(param: UpdatingUsersInCompanyParam): Promise<boolean> {
        const result = await this.updateUsersInSuppliersUseCase.execute(param);
        return result;
    }

    @EventPattern(MessageEventName.ORDERS_CREATED)
    subsribeOk(param: any) {
        console.log('Suppliers Listen order');
    }
}