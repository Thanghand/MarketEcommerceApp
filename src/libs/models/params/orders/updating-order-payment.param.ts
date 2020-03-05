import { TokenUserPayload, UpdatingOrderPaymentDto } from '@models';


export interface UpdatingOrderPaymentParam { 
    userToken: TokenUserPayload;
    orderId: string;
    dto: UpdatingOrderPaymentDto;
}