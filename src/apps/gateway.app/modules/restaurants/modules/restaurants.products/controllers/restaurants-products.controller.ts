import { Controller, Get, Query, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { BodyResponse, ResponseBuilder, ProductQuerying, ProductSummaryResponse, ProductDetailResponse } from '@models';
import { ClientProductsRepository, IClientProductRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('ratings-products')
@Controller()
export class RestaurantsProductsController {

  constructor(@Inject(ClientProductsRepository) private readonly clientProductRepo: IClientProductRepository) { }

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

    const query: ProductQuerying = {
      supplierId: brandId,
      categoryId: categoryId,
      name: name,
      isShowAll: false,
      active: true
    };

    const result = await this.clientProductRepo.findProducts(query);
    return new ResponseBuilder<ProductSummaryResponse[]>()
      .message('Find products')
      .data(result)
      .build();
  }
  @ApiOperation({ title: 'Get product detail' })
  @ApiResponse({
    status: 201,
    description: 'Get product detail successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getProductDetail(@Param('id') id: string): Promise<BodyResponse<ProductDetailResponse>> {
    const result = await this.clientProductRepo.getProductDetail(id, false) as ProductDetailResponse;
    return new ResponseBuilder<ProductDetailResponse>()
      .message('Get product detail successfully')
      .data(result)
      .build();
  }
}