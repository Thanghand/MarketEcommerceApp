import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  Delete
} from '@nestjs/common';

import { CurrentUser } from '@shared.all/decorators/user.decorator';
import {
  TokenUserPayload,
  BodyResponse,
  ShippingAddressEntity,
  ResponseBuilder,
  ShippingAddressDto
} from '@models';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';


@ApiBearerAuth()
@ApiUseTags('restaurants-shippingAddresses')
@Controller('/shipping/addresses')
export class RestaurantShippingAddressController {

  constructor(private readonly eventMessage: NatsClientService) {
  }

  @ApiOperation({ title: 'Get all shipping address' })
  @ApiResponse({
    status: 201,
    description: 'Get list shipping address successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getAllShippingsAddress(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<ShippingAddressEntity[]>> {
    const result = await this.eventMessage.sendMessage<ShippingAddressEntity[]>(MessageEventName.SHIPPING_ADDRESSES_LIST_ALL, user);
    return new ResponseBuilder<ShippingAddressEntity[]>()
      .message('Get list shipping address successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Create new shipping address' })
  @ApiResponse({
    status: 201,
    description: 'Creatre new shipping address successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createShippingAddress(@CurrentUser() user: TokenUserPayload, @Body() dto: ShippingAddressDto): Promise<BodyResponse<ShippingAddressEntity>> {
    const result = await this.eventMessage.sendMessage<ShippingAddressEntity>(MessageEventName.SHIPPING_ADDRESS_CREATE, [user, dto]);
    return new ResponseBuilder<ShippingAddressEntity>()
      .message('Creatre new shipping address successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update shipping address' })
  @ApiResponse({
    status: 201,
    description: 'Update shipping address successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateShippingAddress(@CurrentUser() user: TokenUserPayload,
    @Param('id') shippingAddressId: string,
    @Body() dto: ShippingAddressDto): Promise<BodyResponse<ShippingAddressEntity>> {
    const result = await this.eventMessage.sendMessage<ShippingAddressEntity>(MessageEventName.SHIPPING_ADDRESS_UPDATE, [user, shippingAddressId, dto]);
    return new ResponseBuilder<ShippingAddressEntity>()
      .message('Update shipping address successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete shipping address' })
  @ApiResponse({
    status: 201,
    description: 'Delete shipping address successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteShippingAddress(@CurrentUser() user: TokenUserPayload,
    @Param('id') shippingAddressId: string): Promise<BodyResponse<boolean>> {
    const result = await this.eventMessage.sendMessage<boolean>(MessageEventName.SHIPPING_ADDRESS_DELETE,[user, shippingAddressId]);
    return new ResponseBuilder<boolean>()
      .message('Delete shipping address successfully')
      .data(result)
      .build();
  }
}