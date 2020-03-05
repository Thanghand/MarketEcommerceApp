import { Controller } from '@nestjs/common';
import {
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    GetInvoiceDetailUseCase,
    DeleteInvoiceUseCase,
    UpdateStatusOrdersInvoiceUseCase
} from '../use.cases';
import { CreatingInvoiceParam, InvoiceDetailResponse, UpdatingOrderStatusInvoiceParam, InvoiceQuery, InvoiceSummaryResponse } from '@models';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Controller()
export class InvoicesController {
    constructor(private readonly createInvoiceUseCase: CreateInvoiceUseCase,
        private readonly updateOrdersStatusInvoiceUseCase: UpdateStatusOrdersInvoiceUseCase,
        private readonly getInvoicesUseCase: GetInvoicesUseCase,
        private readonly getInvoicesDetailUseCase: GetInvoiceDetailUseCase,
        private readonly deleteInvoiceUseCase: DeleteInvoiceUseCase) {
    }

    @MessagePattern(MessageEventName.INVOICES_CREATE)
    async createInvoice(param: CreatingInvoiceParam): Promise<InvoiceDetailResponse> {
        const result = await this.createInvoiceUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.INVOICES_UPDATE_ORDER_STATUS)
    async updateOrderStatusInvoice(param: UpdatingOrderStatusInvoiceParam): Promise<boolean> {
        const result = await this.updateOrdersStatusInvoiceUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.INVOICES_GET_ALL)
    async getInvoices(query: InvoiceQuery): Promise<InvoiceSummaryResponse[]> {
        const result = await this.getInvoicesUseCase.execute(query);
        return result;
    }

    @MessagePattern(MessageEventName.INVOCIES_GET_DETAIL)
    async getInvoiceDetail(id: string): Promise<InvoiceDetailResponse> {
        const result = await this.getInvoicesDetailUseCase.execute(id);
        return result;
    }

    @MessagePattern(MessageEventName.INVOICES_DELETE)
    async  deleteInvoice(id: string): Promise<boolean> {
        const result = await this.deleteInvoiceUseCase.execute(id);
        return result;
    }


}