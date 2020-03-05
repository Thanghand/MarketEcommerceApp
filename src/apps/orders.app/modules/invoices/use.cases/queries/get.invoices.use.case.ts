import { UseCase } from '@shared.core';
import { InvoiceQuery, InvoiceSummaryResponse } from '@models';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DateUtil } from '@shared.all/utils';
import { MessageConstant } from '@shared.all/constants';
import { MapperInvoiceUtil } from '../../utils';
import {
    IInvoiceRepository, 
    InvoiceRepository, 
} from '../../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
export class GetInvoicesUseCase extends UseCase<InvoiceQuery, InvoiceSummaryResponse[]> {

    private readonly tag = 'GetInvoicesUseCase';

    constructor(@Inject(InvoiceRepository) private readonly invoiceRepository: IInvoiceRepository,
        private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: InvoiceQuery, isGetEntity?: boolean): Promise<InvoiceSummaryResponse[]> {

        if (this.isMissingFields(input)) {
            console.error(`${this.tag} missing fields`);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        if (input.startDate || input.endDate)
            if (!DateUtil.isValidDate(input.startDate)
                || !DateUtil.isValidDate(input.endDate)) {
                console.error(`${this.tag} missing fields`);
                throw new HttpException('Please check startDate or endDate value', HttpStatus.BAD_REQUEST);
            }

        const result = await this.invoiceRepository.getInvoices(input);
        return MapperInvoiceUtil.mapEntitiesToSummaries(result);
    }

    isMissingFields(input: InvoiceQuery) {
        return !input;
    }

}