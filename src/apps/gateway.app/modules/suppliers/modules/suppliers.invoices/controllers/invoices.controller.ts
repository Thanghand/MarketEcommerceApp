import { Controller, Get, Query, Param, Post, Body, Put, Delete, Inject } from '@nestjs/common';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import {
  TokenUserPayload,
  BodyResponse,
  ResponseBuilder,
  CreatingInvoiceParam,
  UpdatingOrderStatusInvoiceParam,
  InvoiceQuery,
  InvoiceSummaryResponse,
  InvoiceDetailResponse,
  CreatingInvoiceDto
} from '@models';

import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { ClientInvoiceRepository, IClientInvoiceRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('suppliers-invoices')
@Controller()
export class InvoicesController {

  constructor(@Inject(ClientInvoiceRepository) private readonly clientInvoiceRepo: IClientInvoiceRepository) {
  }

  @ApiOperation({ title: 'Get invocies' })
  @ApiResponse({
    status: 201,
    description: 'Get invoices successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'restaurantId',
    description: 'Text restaurantId',
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
  async getInvoices(@CurrentUser() user: TokenUserPayload,
    @Query('restaurantId') restaurantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string): Promise<BodyResponse<InvoiceSummaryResponse[]>> {

    const query: InvoiceQuery = {
      supplierId: user.companyId,
      restaurantId: restaurantId,
      startDate: startDate,
      endDate: endDate
    };

    const result = await this.clientInvoiceRepo.getInvoices(query);
    return new ResponseBuilder<InvoiceSummaryResponse[]>()
      .message('Get invoices successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get invocie detail' })
  @ApiResponse({
    status: 201,
    description: 'Get invoice detail'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getInvoiceDetail(@CurrentUser() user: TokenUserPayload,
    @Param('id') invoiceId: string): Promise<BodyResponse<InvoiceDetailResponse>> {

    const result = await this.clientInvoiceRepo.getInvoiceDetail(invoiceId);
    return new ResponseBuilder<InvoiceDetailResponse>()
      .message('Get invocie detail successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Create new invocie' })
  @ApiResponse({
    status: 201,
    description: 'Create new  invoice'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createNewInvoice(@CurrentUser() user: TokenUserPayload,
    @Body() dto: CreatingInvoiceDto): Promise<BodyResponse<InvoiceDetailResponse>> {

    const param: CreatingInvoiceParam = {
      companyId: user.companyId,
      dto: dto
    };
    const result = await this.clientInvoiceRepo.createInvoice(param);
    return new ResponseBuilder<InvoiceDetailResponse>()
      .message('Create new invoice successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update status invocie' })
  @ApiResponse({
    status: 201,
    description: 'Update status  invoice'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateOrderInvoice(@CurrentUser() userToken: TokenUserPayload,
    @Param('id') id: string): Promise<BodyResponse<boolean>> {

    const param: UpdatingOrderStatusInvoiceParam = {
      invoiceId: id,
      userToken: userToken
    };

    const result = await this.clientInvoiceRepo.updateOrderStatusInvoice(param);
    return new ResponseBuilder<boolean>()
      .message('Update status success')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete invocie' })
  @ApiResponse({
    status: 201,
    description: 'Update status  invoice'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteInvoice(@CurrentUser() user: TokenUserPayload,
    @Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientInvoiceRepo.deleteInvoice(id);
    return new ResponseBuilder<boolean>()
      .message('Delete invoice success')
      .data(result)
      .build();
  }
}