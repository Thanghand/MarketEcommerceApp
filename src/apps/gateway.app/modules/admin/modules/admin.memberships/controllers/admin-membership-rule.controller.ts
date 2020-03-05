import { Controller, Get, Inject, Param, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MembershipRuleEntity, BodyResponse, ResponseBuilder, TokenUserPayload, UpdatingMembershipParam, UpdatingMembershipRuleDto, UpdatingMembershipRuleParam } from '@libs/models';
import { ClientMembershipRuleRepository, IClientMembershipRuleRepository } from '@libs/repositories';
import { CurrentUser } from '@shared.all/decorators/user.decorator';


@ApiBearerAuth()
@ApiUseTags('admin-memberships-rules')
@Controller('rules')
export class AdminMembershipRuleController {
    
    constructor(@Inject(ClientMembershipRuleRepository)private readonly clientRepo: IClientMembershipRuleRepository) {

    }

    @ApiOperation({ title: 'Get membership active' })
    @ApiResponse({
        status: 201,
        description: 'Get membership active successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('active')
    async getMembershipRuleActive(): Promise<BodyResponse<MembershipRuleEntity>> {
        const result = await this.clientRepo.getMembershipRuleActive();
        return new ResponseBuilder<MembershipRuleEntity>()
                .data(result)
                .message('Get membership active successfully')
                .build();
    }

    @ApiOperation({ title: 'Update membership successfully' })
    @ApiResponse({
        status: 201,
        description: 'Update membership successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put(':id')
    async updatMembershipRule(@Param('id') id: string, @Body() dto: UpdatingMembershipRuleDto): Promise<BodyResponse<MembershipRuleEntity>> {
        const param: UpdatingMembershipRuleParam = {
            _id: id,
            dto: dto
        };
        const result = await this.clientRepo.updateMembershipRule(param);
        return new ResponseBuilder<MembershipRuleEntity>()
                .data(result)
                .message('Update membership successfully')
                .build();
    }
}