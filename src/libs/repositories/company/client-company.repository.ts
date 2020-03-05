import { IClientCompanyRepository } from './client-company.repository.interface';
import { CompanyEntity } from '@libs/models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientCompanyRepository implements IClientCompanyRepository {

    constructor(private readonly natClient: NatsClientService) {
    }

    async getById(id: string): Promise<CompanyEntity> {
        const result = await this.natClient.sendMessage<CompanyEntity>(MessageEventName.COMPANY_DETAIL, id);
        return result;
    }

}