import { Injectable, Inject } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { ShippingAddressEntity, TokenUserPayload, Role } from '@models';
import { ShippingAddressQueries } from '@models';
import { GetShippingAddressesUseCase } from './get.shipping.addresses.use.case';
import { ClientUserRepository, IClientUserRepository } from '@libs/repositories';


@Injectable()
export class GetShippingAddressesOfUserUseCase extends UseCase<[TokenUserPayload, string], ShippingAddressEntity[]> {

    constructor(private readonly getListShippingAddressUseCase: GetShippingAddressesUseCase,
                @Inject(ClientUserRepository) private readonly clientUserRepo: IClientUserRepository) {
        super();
    }

    async buildUseCase(input: [TokenUserPayload, string], isGetEntity?: boolean): Promise<ShippingAddressEntity[]> {

        const userToken = input[0];
        const userId = input[1];
        const userEntity = await this.clientUserRepo.getById(userId);
        if ((!userEntity.shippingAddress || userEntity.shippingAddress.length === 0) && userEntity.role === 'EMPLOYEE')
            return [] as ShippingAddressEntity[];

        let queries: ShippingAddressQueries = {
            restaurantId: userToken.companyId
        };
        
        if (userEntity.role === Role.Employee) 
            queries = {...queries, listShippingAddressId: userEntity.shippingAddress};
        
        const shippngAddresses = await this.getListShippingAddressUseCase.execute(queries);
        return shippngAddresses;
    }

    private isShippingAddressContain(listShippingAddressId: string[], shippingAddressId): boolean {
        return listShippingAddressId.find(s => s === shippingAddressId) !== undefined;
    }
}