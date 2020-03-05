import { Controller, Get, Put, Body, Delete, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { MessageConstant } from '@shared.all/constants';
import { BodyResponse, SupplierEntity, ResponseBuilder, TokenUserPayload, UpdatingSupplierDto, UpdatingSuppierParam } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { ClientSuppliersRepository, IClientSuppliersRepository } from '@libs/repositories';



@ApiBearerAuth()
@ApiUseTags('suppliers-information')
@Controller()
export class SuppliersInfoController {
  constructor(@Inject(ClientSuppliersRepository) private readonly clientSupplierRepo: IClientSuppliersRepository ) {
  }

  @ApiOperation({ title: 'Get supplier detail' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETING_SUPPLIER_DETAIL_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getSupplierInformation(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<SupplierEntity>> {
    const result = await this.clientSupplierRepo.getById(user.companyId);
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
  @Put()
  async updateSupplierInfo(@CurrentUser() user: TokenUserPayload, @Body() dto: UpdatingSupplierDto): Promise<BodyResponse<SupplierEntity>> {
    const param: UpdatingSuppierParam = {
      id: user.companyId,
      dto: dto
    };
    const result = await await this.clientSupplierRepo.updateSupplier(param);
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
  @Delete()
  async deleteSupplierInformation(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<boolean>> {
    const result = await this.clientSupplierRepo.deleteSupplier(user.companyId);
    return new ResponseBuilder<boolean>()
      .message(MessageConstant.UPDATING_SUPPLIER_SUCCESSFULLY)
      .data(result)
      .build();
  }
}