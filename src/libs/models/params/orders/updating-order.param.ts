import { TokenUserPayload, UpdatingOrdersDto } from '@models';

export class UpdatingOrderParam {
    userToken: TokenUserPayload;
    orderId: string;
    dto: UpdatingOrdersDto;
}