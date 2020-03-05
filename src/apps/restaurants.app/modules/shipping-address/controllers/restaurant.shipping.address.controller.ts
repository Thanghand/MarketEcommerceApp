import {
  Controller,
} from '@nestjs/common';
import {
  GetShippingAddressesUseCase,
  UpdateShippingAddressUseCase,
  CreateShippingAddressUseCase,
  DeleteShippingAddressUseCase
} from '../use.cases';
import {
  TokenUserPayload,
  ShippingAddressEntity,
  ShippingAddressDto,
  ShippingAddressQueries
} from '@models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { MessagePattern } from '@nestjs/microservices';


@Controller('/shipping/addresses')
export class RestaurantShippingAddressController {

  constructor(private readonly getListShippingAddressUseCase: GetShippingAddressesUseCase,
    private readonly updateShippingAddressUseCase: UpdateShippingAddressUseCase,
    private readonly createShippingAddressUseCase: CreateShippingAddressUseCase,
    private readonly deleteShippingAddressUseCase: DeleteShippingAddressUseCase) {
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESSES_LIST_ALL)
  async getAllShippingsAddress(user: TokenUserPayload): Promise<ShippingAddressEntity[]> {
    const query: ShippingAddressQueries = {
      restaurantId: user.companyId
    };

    const result = await this.getListShippingAddressUseCase.execute(query);
    return result;
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESS_CREATE)
  async createShippingAddress(input: [TokenUserPayload, ShippingAddressDto]): Promise<ShippingAddressEntity> {
    const user = input[0];
    const dto = input[1];
    const result = await this.createShippingAddressUseCase.execute([user.companyId, dto]);
    return result;
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESS_UPDATE)
  async updateShippingAddress(input: [TokenUserPayload, string, ShippingAddressDto]): Promise<ShippingAddressEntity> {
    const user = input[0];
    const shippingAddressId = input[1];
    const dto = input[2];

    const result = await this.updateShippingAddressUseCase.execute([user.companyId, shippingAddressId, dto]);
    return result;
  }

  @MessagePattern(MessageEventName.SHIPPING_ADDRESS_DELETE)
  async deleteShippingAddress(input: [TokenUserPayload, string]): Promise<boolean> {
    const user = input[0];
    const shippingAddressId = input[1];
    const result = await this.deleteShippingAddressUseCase.execute([user.companyId, shippingAddressId]);
    return result;
  }
}