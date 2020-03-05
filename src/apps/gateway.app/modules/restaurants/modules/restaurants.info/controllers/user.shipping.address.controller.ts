import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { TokenUserPayload, BodyResponse, ShippingAddressEntity, ResponseBuilder } from '@models';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShippingAddressesIdDto } from '../models';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MessageEventName } from '@shared.all/constants/messages-event-name';

@ApiBearerAuth()
@ApiUseTags('restaurants-shippingAddressesOfuser')
@Controller('shipping/addresses/user')
export class UserShippingAddressController {

  constructor(private readonly natClient: NatsClientService) {
  }

  @ApiOperation({ title: 'Assgin shipping address' })
  @ApiResponse({
    status: 201,
    description: 'Assign list shippingAddress successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async asignShippingAddress(@CurrentUser() user: TokenUserPayload, @Body() dto: ShippingAddressesIdDto): Promise<BodyResponse<string[]>> {
    const result = await this.natClient.sendMessage<string[]>(MessageEventName.SHIPPING_ADDRESSES_ASIGNED, dto);
    return new ResponseBuilder<string[]>()
      .message('Assign list shippingAddress successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get list shipping address  address' })
  @ApiResponse({
    status: 201,
    description: 'Get list shipping address successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getShippingAddress(@CurrentUser() userToken: TokenUserPayload, @Param('id') userId: string): Promise<BodyResponse<ShippingAddressEntity[]>> {
    const entities = await this.natClient.sendMessage<ShippingAddressEntity[]>(MessageEventName.SHIPPING_ADDRESSES_LIST, [userToken, userId]);
    return new ResponseBuilder<ShippingAddressEntity[]>()
      .message('Get list shipping address successfully')
      .data(entities)
      .build();
  }
}