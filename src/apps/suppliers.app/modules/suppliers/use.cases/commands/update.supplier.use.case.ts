import { SupplierDomain } from '../../models';
import { SupplierEntity, UpdatingSupplierDto, UpdatingSuppierParam, FileEncodeParam } from '@models';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SuppliersRepository, ISuppliersRepository } from '../../repositories';
import { MessageConstant } from '@shared.all/constants';
import { UseCase } from '@shared.core';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Injectable()
export class UpdateSupplierUseCase extends UseCase<UpdatingSuppierParam, SupplierEntity> {

    constructor(@Inject(SuppliersRepository) private readonly supplierRepository: ISuppliersRepository,
        private readonly eventMessage: NatsClientService) {
        super();
    }
    async buildUseCase(input?: UpdatingSuppierParam): Promise<SupplierEntity> {
        const { id, dto } = input;

        if (!id || this.isMissingFields(dto))
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);

        const supplierEntity = await this.supplierRepository.getById(id);

        const supplierDomain = new SupplierDomain(supplierEntity);
        supplierDomain.updateInformation(dto);
        const entity = supplierDomain.getEntity();

        if (entity.logo && entity.logo !== supplierEntity.logo) {
            const params: FileEncodeParam = {
                filename: entity.logo,
                note: entity._id.toString()
            };
            this.eventMessage.sendMessage(MessageEventName.WORKERS_FILE_ENCODE, params);
        }

        const result = await this.supplierRepository.update(id, supplierDomain.getEntity());
        return result;
    }

    private isMissingFields(input: UpdatingSupplierDto): boolean {
        return !input;
    }
}