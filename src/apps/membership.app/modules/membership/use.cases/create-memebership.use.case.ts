import { UseCase } from '@shared.core';
import { MembershipEntity, MembershipRuleEntity } from '@models';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MembershipRepository, IMembershipRepository } from '../repositories';
import { CreatingMembershipDto } from '@libs/models/dtos/membership/creating-membership.dto';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { MessageConstant } from '@shared.all/constants';
import { MembershipDomain } from '../models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { GetMembershipRuleDetailUseCase } from '../../membership-rules/use.cases';


@Injectable()
export class CreateMembershipUseCase extends UseCase<CreatingMembershipDto, MembershipEntity> {

    private readonly _tag: string = 'CreateMembershipUseCase'; 
    constructor(@Inject(MembershipRepository) private readonly memberRepo: IMembershipRepository,
                private readonly getMembershipRuleDetailUseCase: GetMembershipRuleDetailUseCase,
               private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(dto?: CreatingMembershipDto, isGetEntity?: boolean): Promise<MembershipEntity> {

        if (this.isMissingFields(dto)) {
            this.loggerService.error('Missing fields', this._tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_GATEWAY);
        }

        const rule = await this.getMembershipRuleDetailUseCase.execute(true);
        const domain: MembershipDomain = new MembershipDomain();
        domain.create(dto, rule);

        const result = await this.memberRepo.create(domain.getEntity());
        return result;
    }

    private isMissingFields(dto: CreatingMembershipDto): boolean {
        return !dto || !dto.point;
    }
    
}