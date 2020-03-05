import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiImplicitParam, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { MessageConstant } from '@shared.all/constants';
import { BodyResponse, ResponseBuilder, SupplierEntity, SupplierSummaryEntity } from '@models';
import { ClientSuppliersRepository, IClientSuppliersRepository, ClientRatingRepository, IClientRatingRepository } from '@libs/repositories';
import { SupplierDetailResponse } from '../models';

@ApiBearerAuth()
@ApiUseTags('restaurants-suppliers')
@Controller()
export class RestaurantsSuppliersController {
    constructor(@Inject(ClientSuppliersRepository) private readonly clientSupplierRepository: IClientSuppliersRepository,
                @Inject(ClientRatingRepository) private readonly clientRatingRepository: IClientRatingRepository) {}

    @ApiOperation({ title: 'Find suppliers' })
    @ApiResponse({
      status: 201,
      description: MessageConstant.GETTING_SUPPLIERS_SUCCESSFULLY
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get()
    async findSuppliers(): Promise<BodyResponse<SupplierSummaryEntity[]>> {
        const result = await this.clientSupplierRepository.findSuppliers();
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
    async getSupplierDetail(@Param('id') id: string): Promise<BodyResponse<SupplierDetailResponse>> {
      
        const detail = await this.clientSupplierRepository.getSupplierDetail(id);
        const rating = await this.clientRatingRepository.getRating(id);
        const response: SupplierDetailResponse = {
          detail: detail,
          rating: rating
        };

        return new ResponseBuilder<SupplierDetailResponse>()
                .message(MessageConstant.GETING_SUPPLIER_DETAIL_SUCCESSFULLY)
                .data(response)
                .build();
    }


}