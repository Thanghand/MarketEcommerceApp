import { TokenUserPayload } from '@libs/models/token.user.payload';
import { CreatingMembershipDto } from '@libs/models/dtos/membership/creating-membership.dto';

export interface CreatingMembershipParam {
    userToken: TokenUserPayload;
    dto: CreatingMembershipDto;
}