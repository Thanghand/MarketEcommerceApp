import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UseCase } from '@shared.core';
import { MessageConstant } from '@shared.all/constants';
import { ShippingAddressesIdDto } from '@models';
import { IClientUserRepository, ClientUserRepository } from '@libs/repositories';

@Injectable()
export class AssignShippingAddressUseCase extends UseCase<ShippingAddressesIdDto, string[]> {

    constructor(@Inject(ClientUserRepository) private readonly userRepo: IClientUserRepository) {
        super();
    }

    async buildUseCase(dto?: ShippingAddressesIdDto, isGetEntity?: boolean): Promise<string[]> {

        if (this.isMissingFields(dto.userId, dto.shippingAddressesId)) {
            console.error('Missing Fields');
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }

        const userEntity = await this.userRepo.getById(dto.userId);
        userEntity.shippingAddress = dto.shippingAddressesId;
        const result = await this.userRepo.updateShippingAddress(dto.userId, userEntity);
        return result.shippingAddress;
    }

    private isMissingFields(userId: string, shippingAddressIds: string[]): boolean {
        return !userId || !shippingAddressIds;
    }
}