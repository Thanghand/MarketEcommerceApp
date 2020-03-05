import { Injectable, Inject } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { MembershipQuery, MembershipEntity } from '@libs/models';
import { MembershipRepository, IMembershipRepository } from '../repositories';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';


@Injectable()
export class GetMembershipsUseCase extends UseCase<MembershipQuery, MembershipEntity[]> {

    private readonly _tag: string = 'GetMembershipsUseCase'; 
    constructor(@Inject(MembershipRepository) private readonly memberRepo: IMembershipRepository,
               private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(query?: MembershipQuery, isGetEntity?: boolean): Promise<MembershipEntity[]> {
        const result = await this.memberRepo.getMemberships(query);
        return result;
    }

}