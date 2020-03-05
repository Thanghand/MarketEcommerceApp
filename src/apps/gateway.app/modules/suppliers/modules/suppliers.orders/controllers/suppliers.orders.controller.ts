import { Controller, Body, Param, Get, Query, Put, Delete, Inject } from '@nestjs/common';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import {
  TokenUserPayload,
  BodyResponse,
  OrderEntity,
  ResponseBuilder,
  OrderQuery,
  MyClientQuery,
  UpdatingOrderParam,
  UpdatingOrderPaymentParam,
  DeletingOrderParam,
  UpdatingOrdersDto,
  OrderDetailResponse,
  UpdatingOrderPaymentDto,
  RestaurantClientResponse,
  OrderSummaryResponse
} from '@models';
import { ApiOperation, ApiResponse, ApiImplicitQuery, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('suppliers-orders')
@Controller()
export class SupplierOrdersController {

  constructor(@Inject(ClientOrderRepository) private readonly clientOrderRepo: IClientOrderRepository) {
  }

  @ApiOperation({ title: 'Update order detail' })
  @ApiResponse({
    status: 201,
    description: 'Update order successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateOrder(@CurrentUser() userToken: TokenUserPayload,
    @Param('id') orderId: string, @Body() dto: UpdatingOrdersDto): Promise<BodyResponse<OrderDetailResponse>> {

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

  @ApiOperation({ title: 'Update order payment' })
  @ApiResponse({
    status: 201,
    description: 'Update order payment successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id/payment')
  async updatePayment(@CurrentUser() userToken: TokenUserPayload, @Param('id') orderId: string, @Body() dto: UpdatingOrderPaymentDto): Promise<BodyResponse<OrderDetailResponse>> {

    const param: UpdatingOrderPaymentParam = {
      userToken: userToken,
      orderId: orderId,
      dto: dto
    };
    const result = await this.clientOrderRepo.updatePaymentOrder(param, false) as OrderDetailResponse;
    return new ResponseBuilder<OrderDetailResponse>()
      .message('Update order successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Find Restaurants' })
  @ApiResponse({
    status: 201,
    description: 'Find restaurants successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'status',
    description: 'status orders',
    required: false,
    type: String
  })
  @ApiImplicitQuery({
    name: 'restaurantId',
    description: 'Text restaurantId',
    required: false,
    type: String
  })
  @Get('/restaurants')
  async findMyClient(@Query('restaurantId') restaurantId: string,
    @Query('status') status: string,
    @CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<RestaurantClientResponse[]>> {

    const query: MyClientQuery = {
      supplierId: userToken.companyId,
      status: status,
      restaurantId: restaurantId,
    };

    const result = await this.clientOrderRepo.findRestaurantClients(query);
    return new ResponseBuilder<RestaurantClientResponse[]>()
      .message('Get orders successfully')
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
    name: 'restaurantId',
    description: 'Restaurant Id',
    required: false,
    type: String
  })
  @ApiImplicitQuery({
    name: 'isPayEndOfMonth',
    description: 'isPayEndOfMonth',
    required: false,
    type: Boolean
  })
  @ApiImplicitQuery({
    name: 'hasInvoice',
    description: 'hasInvoice',
    required: false,
    type: Boolean
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
    @Query('restaurantId') restaurantId: string,
    @Query('hasInvoice') hasInvoice: boolean | string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('isPayEndOfMonth') isPayEndOfMonth: boolean | string,
    @CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<OrderSummaryResponse[]>> {

    const query: OrderQuery = {
      supplierId: userToken.companyId,
      status: status,
      orderNumber: orderNumber,
      restaurantId: restaurantId,
      startDate: startDate,
      endDate: endDate,
      hasInvoice: hasInvoice,
      isPayEndOfMonth: isPayEndOfMonth
    };

    const result = await this.clientOrderRepo.getOrders(query, false) as OrderSummaryResponse[];
    return new ResponseBuilder<OrderSummaryResponse[]>()
      .message('Get orders successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete order' })
  @ApiResponse({
    status: 201,
    description: 'Delete order successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string, @CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<OrderEntity>> {
    const param: DeletingOrderParam = {
      orderId: orderId,
      userToken: userToken
    };
    const result = await this.clientOrderRepo.deleteOrder(param);
    return new ResponseBuilder<OrderEntity>()
      .message('Delete order successfully')
      .data(result)
      .build();
  }
}