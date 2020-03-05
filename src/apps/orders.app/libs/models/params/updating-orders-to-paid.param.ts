import { TokenUserPayload } from '@models';


export interface UpdatingOrdersToPaidParam {
    orderIds: string[];
    userToken?: TokenUserPayload;
}