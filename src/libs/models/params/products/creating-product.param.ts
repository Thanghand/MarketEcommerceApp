import { CreatingProductDto, TokenUserPayload } from '@models';


export interface CreatingProductParam {
    user: TokenUserPayload;
    dto: CreatingProductDto;
}