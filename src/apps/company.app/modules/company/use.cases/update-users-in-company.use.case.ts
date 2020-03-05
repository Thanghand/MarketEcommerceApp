import { UseCase } from '@shared.core';
import { UpdatingUsersInCompanyParam } from '@libs/models';

export class UpdateUsersInCompanyUseCase extends UseCase<UpdatingUsersInCompanyParam, boolean> {

    buildUseCase(input?: UpdatingUsersInCompanyParam, isGetEntity?: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}