import { Controller, Inject, Get, Param } from '@nestjs/common';
import { ClientMembershipRepository, IClientMembershipRepository } from '@libs/repositories';
import { MembershipDetailQuery, MembershipEntity, TokenUserPayload, BodyResponse, ResponseBuilder, MembershipRuleDetailResponse } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiUseTags('restaurants-memberships')
@Controller()
export class RestaurantsMembershipController {

    constructor(@Inject(ClientMembershipRepository) private readonly clientMembershipRepo: IClientMembershipRepository) {
    }

    @Get(':id/:date')
    async getMembershipDetail(@CurrentUser() userToken: TokenUserPayload,@Param('id') id: string,@Param('date') currentDate: string): Promise<BodyResponse<MembershipRuleDetailResponse>> {
        
        const query: MembershipDetailQuery = {
            userId: id,
            currentDate: currentDate,
        };
        const result = await this.clientMembershipRepo.getDetail(query);
        return new ResponseBuilder<MembershipRuleDetailResponse>()
                .message('Get membership detail successfully')
                .data(result)
                .build();
    }

}