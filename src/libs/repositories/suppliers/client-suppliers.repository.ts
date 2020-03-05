import { IClientSuppliersRepository } from './client-suppliers.repository.interface';
import { SupplierEntity, CreatingSupplierDto, UpdatingSuppierParam, SupplierSummaryEntity, UpdatingUsersInCompanyParam } from '@models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ClientSuppliersRepository implements IClientSuppliersRepository {

    constructor(private readonly eventMessage: NatsClientService) {

    }

    async getById(id: string): Promise<SupplierEntity> {
        const result = await this.eventMessage.sendMessage<SupplierEntity>(MessageEventName.SUPPLIERS_DETAIL_ENTITY, id);
        return result;
    }

    async createSupplier(dto: CreatingSupplierDto): Promise<SupplierEntity> {
        const result = await this.eventMessage.sendMessage<SupplierEntity>(MessageEventName.SUPPLIERS_CREATE, dto);
        return result;
    }

    async updateSupplier(param: UpdatingSuppierParam): Promise<SupplierEntity> {
        const result = await this.eventMessage.sendMessage<SupplierEntity>(MessageEventName.SUPPLIERS_UPDATE, param);
        return result;
    }
    async deleteSupplier(id: string): Promise<boolean> {
        const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.SUPPLIERS_DELETE, id);
        return result;
    }
    async getSupplierDetail(id: string): Promise<SupplierEntity> {
        const result = await this.eventMessage.sendMessage<SupplierEntity>(MessageEventName.SUPPLIERS_DETAIL_ENTITY, id);
        return result;
    }
    async findSuppliers(): Promise<SupplierSummaryEntity[]> {
        const result = await this.eventMessage.sendMessage<SupplierSummaryEntity[]>(MessageEventName.SUPPLIERS_LIST, {});
        return result;
    }

    updateUsers(params: UpdatingUsersInCompanyParam): Promise<boolean> {
        const result =  this.eventMessage.sendMessage<boolean>(MessageEventName.SUPPLIERS_UPDATE_USERS, params);
        return result;
    }
}