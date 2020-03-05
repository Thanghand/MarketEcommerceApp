import { TokenUserPayload } from '@models';


export interface DeletingOrderParam{
    orderId: string;
    userToken: TokenUserPayload;
}