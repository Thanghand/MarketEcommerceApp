import { UpdatingUsersInCompanyParam } from '@libs/models';
import { UseCase } from '@shared.core';
import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SuppliersRepository, ISuppliersRepository } from '../../repositories';
import { SupplierDomain } from '../../models';

@Injectable()
export class UpdateUserInSuppliersUseCase extends UseCase<UpdatingUsersInCompanyParam, boolean> {
    
    constructor(@Inject(SuppliersRepository) private readonly supplierRepo: ISuppliersRepository) {
        super();
    }

    async buildUseCase(input?: UpdatingUsersInCompanyParam, isGetEntity?: boolean): Promise<any> {
        if (!input) {
            throw new HttpException('Input users is null', HttpStatus.BAD_GATEWAY);
        }

        const {_id, users} = input;
        
        const entity = await this.supplierRepo.getById(_id);
        const domain = new SupplierDomain(entity);
        domain.updateUsersInCompany(users);
        const result = await this.supplierRepo.update(_id, domain.getEntity());
        if (result.users !== users)
            return false;

        return true;
    }
}