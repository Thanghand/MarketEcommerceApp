import { Controller, Inject, Get, Query } from '@nestjs/common';
import { ClientMembershipRepository, IClientMembershipRepository } from '@libs/repositories';
import { MembershipQuery, BodyResponse, MembershipEntity, ResponseBuilder, MembershipType } from '@libs/models';
import { ApiImplicitQuery, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('admin-memberships')
@Controller()
export class AdminMembershipController {

    constructor(@Inject(ClientMembershipRepository) private readonly clientMembershipRepo: IClientMembershipRepository) {
    }

    @ApiImplicitQuery({
        name: 'date',
        description: 'Text date',
        required: false,
        type: String
    })
    @ApiImplicitQuery({
        name: 'point',
        description: 'Point',
        required: false,
        type: Number
    })
    @ApiImplicitQuery({
        name: 'userName',
        description: 'Text username',
        required: false,
        type: String
    })
    @ApiImplicitQuery({
        name: 'type',
        description: 'Text type',
        required: false,
        type: String
    })
    @Get()
    async getMemberships(@Query('date') date: string,
        @Query('point') point: number,
        @Query('userName') userName: string,
        @Query('type') type: MembershipType): Promise<BodyResponse<MembershipEntity[]>> {

        const query: MembershipQuery = {
            date: date,
            point: point,
            userName: userName,
            type: type
        };

        const result = await this.clientMembershipRepo.getMemberships(query);
        return new ResponseBuilder<MembershipEntity[]>()
            .message('Get memberships successfully')
            .data(result)
            .build();
    }

}