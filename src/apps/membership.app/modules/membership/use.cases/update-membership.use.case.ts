import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { MembershipEntity, UpdatingMembershipDto, MembershipDetailQuery, CreatingMembershipDto } from '@libs/models';
import { MembershipRepository, IMembershipRepository } from '../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { MessageConstant } from '@shared.all/constants';
import { MembershipDomain } from '../models';
import { CreateMembershipUseCase } from './create-memebership.use.case';
import { GetMembershipRuleDetailUseCase } from '../../membership-rules/use.cases';


@Injectable()
export class UpdateMembershipUseCase extends UseCase<UpdatingMembershipDto, MembershipEntity> {

    private readonly _tag: string = 'UpdateMembershipUseCase'; 
    constructor(@Inject(MembershipRepository) private readonly memberRepo: IMembershipRepository,
               private readonly loggerService: MyLoggerService,
               private readonly createMembershipUseCase: CreateMembershipUseCase,
               private readonly getMembershipRuleDetailUseCase: GetMembershipRuleDetailUseCase) {
        super();
    }

    async buildUseCase(dto?: UpdatingMembershipDto, isGetEntity?: boolean): Promise<MembershipEntity> {

        if (this.isMissingFields(dto)) { 
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this._tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_GATEWAY);
        }


        const query: MembershipDetailQuery = {
            userId: dto.createdBy._id,
            currentDate: dto.date
        };

        const entity = await this.memberRepo.getMembershipDetail(query);
        if (entity === null) {
            const creatingDto: CreatingMembershipDto = {
                point: dto.point,
                createdBy: dto.createdBy,
                order: dto.order,
                date: dto.date
            };
            const result = await this.createMembershipUseCase.execute(creatingDto);
            return result;
        }

        const rule = await this.getMembershipRuleDetailUseCase.execute(true);
        const domain = new MembershipDomain(entity);
        domain.updatePoint(dto, rule);
        const updatedEntity = domain.getEntity();
        const result = await this.memberRepo.update(updatedEntity._id, updatedEntity);
        return result;
    }

    private isMissingFields(dto: UpdatingMembershipDto): boolean {
        return !dto || !dto.point || !dto.date;
    }

}