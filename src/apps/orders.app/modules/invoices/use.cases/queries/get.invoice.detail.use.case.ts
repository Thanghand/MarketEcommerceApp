import { UseCase } from '@shared.core';
import { Inject } from '@nestjs/common';
import { MapperInvoiceUtil } from '../../utils';
import { InvoiceDetailResponse } from '@libs/models';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import {
    IInvoiceRepository, 
    InvoiceRepository, 
} from '../../repositories';

export class GetInvoiceDetailUseCase extends UseCase<string, InvoiceDetailResponse> {

    private readonly tag = 'GetInvoiceDetailUseCase';

    constructor(@Inject(InvoiceRepository) private readonly invoiceRepository: IInvoiceRepository,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: string, isGetEntity?: boolean): Promise<InvoiceDetailResponse> {
        const result = await this.invoiceRepository.getById(input);
        return MapperInvoiceUtil.mapEntityToResponse(result);
    }
    
}