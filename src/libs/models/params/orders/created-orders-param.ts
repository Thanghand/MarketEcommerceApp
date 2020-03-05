import { TokenUserPayload } from '@libs/models/token.user.payload';
import { OrderEntity } from '@libs/models/entities';

export class CreatedOrdersParam {
    userToken: TokenUserPayload;
    orders: OrderEntity[];
}