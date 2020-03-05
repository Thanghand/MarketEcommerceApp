import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { Controller, Put, Param, Body, Get, Query, Delete, Inject } from '@nestjs/common';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { TokenUserPayload, BodyResponse, ResponseBuilder, OrderQuery, OrderEntity, UpdatingOrderParam, OrderDetailResponse, OrderSummaryResponse, DeletingOrderParam, UpdatingOrdersDto } from '@models';
import { ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('admmin-orders')
@Controller()
export class AdminOrdersController {

    constructor(@Inject(ClientOrderRepository) private readonly clientOrderRepo: IClientOrderRepository) {
    }

    @ApiOperation({ title: 'Update order detail' })
    @ApiResponse({
        status: 201,
        description: 'Update order successfully'
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
        name: 'supplierId',
        description: 'Supplier Id',
        required: false,
        type: String
    })
    @ApiImplicitQuery({
        name: 'restaurantId',
        description: 'Restaurant Id',
        required: false,
        type: String
    })
    @Get()
    async getOrders(@Query('supplierId') supplierId: string,
        @Query('restaurantId') restaurantId: string,
        @Query('orderNumber') orderNumber: string,
        @Query('status') status: string,
        @CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<OrderSummaryResponse[]>> {

        const query: OrderQuery = {
            supplierId: supplierId,
            restaurantId: restaurantId,
            status: status,
            orderNumber: orderNumber,
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