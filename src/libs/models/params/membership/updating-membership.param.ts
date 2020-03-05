import { UpdatingMembershipDto } from '@libs/models/dtos/membership/updating-membership.dto';
import { TokenUserPayload } from '@libs/models/token.user.payload';

export interface UpdatingMembershipParam {
    dto: UpdatingMembershipDto;
    userToken: TokenUserPayload;
}