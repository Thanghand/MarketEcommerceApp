import { TokenUserPayload } from '@models';


export interface UpdatingOrderStatusInvoiceParam {
    invoiceId: string;
    userToken: TokenUserPayload;
}