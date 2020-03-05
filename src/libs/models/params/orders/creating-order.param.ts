import { TokenUserPayload, CreatingOrdersDto } from '@models';


export interface CreatingOrderParam {
    userToken: TokenUserPayload;
    dto: CreatingOrdersDto;
}