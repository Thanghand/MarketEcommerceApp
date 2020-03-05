import { Controller, Body, Param, Query, Get, Post, Delete, Put, Inject } from '@nestjs/common';
import { BodyResponse, OrderEntity, TokenUserPayload, ResponseBuilder, OrderQuery, CreatingOrdersDto, CreatingOrderParam, UpdatingOrderParam, OrderDetailResponse, UpdatingOrdersDto, OrderSummaryResponse } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('restaurants-orders')
@Controller()
export class RestaurantsOrdersController {

  constructor(@Inject(ClientOrderRepository) private readonly clientOrderRepo: IClientOrderRepository) {
  }

  @ApiOperation({ title: 'Create orders' })
  @ApiResponse({
    status: 201,
    description: 'Create orders successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createOrders(@CurrentUser() userToken: TokenUserPayload, @Body() dto: CreatingOrdersDto): Promise<BodyResponse<OrderDetailResponse[]>> {
    const param: CreatingOrderParam = {
      userToken: userToken,
      dto: dto
    };
    const result = await this.clientOrderRepo.createOrder(param);
    return new ResponseBuilder<OrderDetailResponse[]>()
      .message('Create new orders successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete order' })
  @ApiResponse({
    status: 201,
    description: 'Delete order successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateOrder(@CurrentUser() userToken: TokenUserPayload, @Param('id') orderId: string, @Body() dto: UpdatingOrdersDto): Promise<BodyResponse<OrderDetailResponse>> {
    const param: UpdatingOrderParam = {
      userToken: userToken,
      orderId: orderId,
      dto: dto
    };
    const result = await this.clientOrderRepo.updateOrder(param, false) as OrderDetailResponse;
    return new ResponseBuilder<OrderDetailResponse>()
      .message('Update order successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get order detail' })
  @ApiResponse({
    status: 201,
    description: 'Get order detail successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getOrderDetail(@Param('id') orderId: string): Promise<BodyResponse<OrderDetailResponse>> {
    const result = await this.clientOrderRepo.getOrderDetail(orderId, false) as OrderDetailResponse;
    return new ResponseBuilder<OrderDetailResponse>()
      .message('Get order detail successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Find orders' })
  @ApiResponse({
    status: 201,
    description: 'Find orders successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'status',
    description: 'status orders',
    required: false,
    type: String
  })
  @ApiImplicitQuery({
    name: 'orderNumber',
    description: 'Text orderNumber',
    required: false,
    type: String
  })
  @ApiImplicitQuery({
    name: 'startDate',
    description: 'startDate with formart yy/mm/dd, Forexample: 2019/12/30',
    required: false,
    type: String
  })
  @ApiImplicitQuery({
    name: 'endDate',
    description: 'endDate with formart yy/mm/dd, Forexample: 2019/12/30',
    required: false,
    type: String
  })
  @Get()
  async getOrders(@Query('orderNumber') orderNumber: string,
    @Query('status') status: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<OrderSummaryResponse[]>> {

    const query: OrderQuery = {
      restaurantId: userToken.companyId,
      status: status,
      orderNumber: orderNumber,
      startDate: startDate,
      endDate: endDate,
    };

    const result = await this.clientOrderRepo.getOrders(query, false) as OrderSummaryResponse[];
    return new ResponseBuilder<OrderSummaryResponse[]>()
      .message('Get orders successfully')
      .data(result)
      .build();
  }
}