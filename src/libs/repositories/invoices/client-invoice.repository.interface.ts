import { CreatingInvoiceParam, InvoiceDetailResponse, UpdatingOrderStatusInvoiceParam, InvoiceQuery, InvoiceSummaryResponse } from '@models';


export interface IClientInvoiceRepository {
    createInvoice(param: CreatingInvoiceParam): Promise<InvoiceDetailResponse>;

    updateOrderStatusInvoice(param: UpdatingOrderStatusInvoiceParam): Promise<boolean>;

    getInvoices(query: InvoiceQuery): Promise<InvoiceSummaryResponse[]>;

    getInvoiceDetail(id: string): Promise<InvoiceDetailResponse>;

    deleteInvoice(id: string): Promise<boolean>;

}