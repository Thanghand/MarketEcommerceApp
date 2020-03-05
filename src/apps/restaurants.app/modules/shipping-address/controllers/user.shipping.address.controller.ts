import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { TokenUserPayload, BodyResponse, ShippingAddressEntity, ResponseBuilder } from '@models';
import { AssignShippingAddressUseCase, GetShippingAddressesOfUserUseCase } from '../use.cases';
import { ShippingAddressesIdDto } from '@models';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@Controller('shippingAddresses/user')
export class UserShippingAddressController {

  constructor(private readonly assignShippingAddressUseCase: AssignShippingAddressUseCase,
    private readonly getShippingAddressesUseCase: GetShippingAddressesOfUserUseCase) {
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESSES_ASIGNED)
  async asignShippingAddress(dto: ShippingAddressesIdDto): Promise<string[]> {
    const result = await this.assignShippingAddressUseCase.execute(dto);
    return result;
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESSES_LIST)
  async getShippingAddress(input: [TokenUserPayload, string]): Promise<ShippingAddressEntity[]> {
    const user = input[0];
    const userId = input[1];
    const entities = await this.getShippingAddressesUseCase.execute([user, userId]);
    return entities;
  }
}