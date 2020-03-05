import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { BodyResponse, ResponseBuilder, ProductQuerying, ProductSummaryResponse } from '@models';
import { ClientProductsRepository, IClientProductRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('admin-products')
@Controller()
export class AdminProductsController {

    constructor(@Inject(ClientProductsRepository)private readonly clientProductRepo: IClientProductRepository) {}

    @ApiOperation({ title: 'Find products' })
    @ApiResponse({
      status: 201,
      description: 'Find products successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get()
    @ApiImplicitQuery({
      name: 'categoryId',
      description: 'Category id',
      required: false,
      type: String
    })
    @ApiImplicitQuery({
      name: 'brandId',
      description: 'supplier id',
      required: false,
      type: String
    })
    @ApiImplicitQuery({
      name: 'name',
      description: 'product name',
      required: false,
      type: String
    })
    async findProducts(@Query('categoryId') categoryId: string,
                       @Query('brandId') brandId: string,
                       @Query('name') name: string): Promise<BodyResponse<ProductSummaryResponse[]>> {

        const request: ProductQuerying = {
          supplierId: brandId,
          categoryId: categoryId,
          name: name
        };

        const result = await this.clientProductRepo.findProducts(request);
        return new ResponseBuilder<ProductSummaryResponse[]>()
                .message('Find products')
                .data(result)
                .build();
    }
}