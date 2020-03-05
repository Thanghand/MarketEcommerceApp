import { Controller } from '@nestjs/common';
import { CreateMembershipUseCase, UpdateMembershipUseCase, GetMembershipsUseCase, GetMembershipDetailUseCase } from '../use.cases';
import { CreatingMembershipParam, MembershipEntity, UpdatingMembershipParam, MembershipQuery, MembershipDetailQuery, CreatingMembershipDto, UpdatingMembershipDto, MembershipRuleDetailResponse } from '@libs/models';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Controller()
export class MemberShipsController {

    constructor(private readonly createMembershipUseCase: CreateMembershipUseCase,
                private readonly updateMembershipUseCase: UpdateMembershipUseCase,
                private readonly getMembershipsUseCase: GetMembershipsUseCase,
                private readonly getMembershipDetailUseCase: GetMembershipDetailUseCase) {
    }


    @MessagePattern(MessageEventName.MEMBERSHIP_CREATE)
    async create(param: CreatingMembershipDto): Promise<MembershipEntity> {
        const result = await this.createMembershipUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.MEMBERSHIP_UPDATE)
    async update(param: UpdatingMembershipDto): Promise<MembershipEntity> {
        const result = await this.updateMembershipUseCase.execute(param);
        return result;
    }

    @MessagePattern(MessageEventName.MEMBERSHIP_GET_DETAIL)
    async getDetail(query: MembershipDetailQuery): Promise<MembershipRuleDetailResponse> {
        const result = await this.getMembershipDetailUseCase.execute(query);
        return result;
    }

    @MessagePattern(MessageEventName.MEMBERSHIP_GET_ALL)
    async getMemberships(query: MembershipQuery): Promise<MembershipEntity[]> {
        const result = await this.getMembershipsUseCase.execute(query);
        return result;
    }
}