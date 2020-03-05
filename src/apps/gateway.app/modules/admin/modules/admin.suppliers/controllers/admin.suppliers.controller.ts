import { Controller, Post, Body, Get, Param, Put, Delete, Inject, } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { MessageConstant } from '@shared.all/constants';
import { BodyResponse, ResponseBuilder, SupplierEntity, IResponse, SupplierSummaryEntity, CreatingSupplierDto, UpdatingSupplierDto, UpdatingSuppierParam, CountingOrdersQuery, CompanyType } from '@models';
import { ClientSuppliersRepository, IClientSuppliersRepository, ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('admin-suppliers')
@Controller()
export class AdminSuppliersController {
  constructor(@Inject(ClientSuppliersRepository) private readonly clientSuppliersRepo: IClientSuppliersRepository,
              @Inject(ClientOrderRepository) private readonly clientOrderRepo: IClientOrderRepository) { }

  @ApiOperation({ title: 'Create new suppliers' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.CREATING_SUPPLIER_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createNewSupplier(@Body() input: CreatingSupplierDto): Promise<BodyResponse<IResponse>> {
    const result = await this.clientSuppliersRepo.createSupplier(input);
    return new ResponseBuilder<IResponse>()
      .message(MessageConstant.CREATING_SUPPLIER_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Find suppliers' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETTING_SUPPLIERS_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async findSuppliers(): Promise<BodyResponse<SupplierSummaryEntity[]>> {
    const result = await this.clientSuppliersRepo.findSuppliers();

    const query: CountingOrdersQuery = {
      companyType: CompanyType.Suppliers,
      companyIds: result.map(i => i._id)
    };
    const countingOrders = await this.clientOrderRepo.getCountingOrders(query);

    result.forEach(i => {
      const total = countingOrders[i._id];
      i.totalOrders = total ? total : 0;
    });
    
    return new ResponseBuilder<SupplierSummaryEntity[]>()
      .message(MessageConstant.GETTING_SUPPLIERS_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get supplier detail' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETING_SUPPLIER_DETAIL_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Get(':id')
  async getSupplierDetail(@Param('id') params: string): Promise<BodyResponse<SupplierEntity>> {
    const result = await this.clientSuppliersRepo.getSupplierDetail(params);
    return new ResponseBuilder<SupplierEntity>()
      .message(MessageConstant.GETING_SUPPLIER_DETAIL_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update supplier' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_SUPPLIER_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Put(':id')
  async updateSupplier(@Param('id') id: string, @Body() dto: UpdatingSupplierDto): Promise<BodyResponse<SupplierEntity>> {
    const param: UpdatingSuppierParam = {
      id: id,
      dto: dto
    };
    const result = await this.clientSuppliersRepo.updateSupplier(param);
    return new ResponseBuilder<SupplierEntity>()
      .message(MessageConstant.UPDATING_SUPPLIER_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete supplier' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_SUPPLIER_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Delete(':id')
  async deleteSupplier(@Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientSuppliersRepo.deleteSupplier(id);
    return new ResponseBuilder<boolean>()
      .message(MessageConstant.UPDATING_SUPPLIER_SUCCESSFULLY)
      .data(result)
      .build();
  }
}