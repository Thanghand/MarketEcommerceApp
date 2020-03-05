import { Controller, Get, Query, Inject, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import {
  BodyResponse,
  ResponseBuilder,
  CreatingProductDto,
  TokenUserPayload,
  ProductEntity,
  ProductSummaryResponse,
  CreatingProductParam,
  ProductQuerying,
  UpdatingProductInformationDto,
  UpdatingProductInformationParam,
  UpdatingProductCatalogParam
} from '@models';
import { ClientProductsRepository, IClientProductRepository } from '@libs/repositories';
import { CurrentUser } from '@shared.all/decorators/user.decorator';

@ApiBearerAuth()
@ApiUseTags('suppliers-products')
@Controller()
export class SuppliersProductsController {

  constructor(@Inject(ClientProductsRepository) private readonly clientProductRepo: IClientProductRepository) { }

  @ApiOperation({ title: 'Get product detail' })
  @ApiResponse({
    status: 201,
    description: 'Get product detail successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getProductDetail(@Param('id') id: string): Promise<BodyResponse<ProductEntity>> {
    const result = await this.clientProductRepo.getProductDetail(id, true) as ProductEntity;
    return new ResponseBuilder<ProductEntity>()
      .message('Get product detail successfully')
      .data(result)
      .build();
  }

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
      name: name,
      isShowAll: true
    };

    const result = await this.clientProductRepo.findProducts(request);
    return new ResponseBuilder<ProductSummaryResponse[]>()
      .message('Find products')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Create new product' })
  @ApiResponse({
    status: 201,
    description: 'Create new product successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createNewProduct(@Body() dto: CreatingProductDto, @CurrentUser() user: TokenUserPayload): Promise<BodyResponse<ProductEntity>> {
    const param: CreatingProductParam = {
      user: user,
      dto: dto
    };
    const result = await this.clientProductRepo.createProduct(param);
    return new ResponseBuilder<ProductEntity>()
      .message('Create product successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete product' })
  @ApiResponse({
    status: 201,
    description: 'Delete product information succesfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientProductRepo.deleteProduct(id);
    return new ResponseBuilder<boolean>()
      .message('Delete product information succesfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'update product information' })
  @ApiResponse({
    status: 201,
    description: 'Update product information succesfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateProductInformation(@Param('id') id: string, @Body() dto: UpdatingProductInformationDto): Promise<BodyResponse<ProductEntity>> {
    const param: UpdatingProductInformationParam = {
      id: id,
      dto: dto
    };

    const result = await this.clientProductRepo.updateProductInfomation(param);
    return new ResponseBuilder<ProductEntity>()
      .message('Update product information succesfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update product catalog' })
  @ApiResponse({
    status: 201,
    description: 'Update product catalog succesfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('catalog/:id')
  async updateProductCatalog(@Param('id') id: string, @Body() categoriesId: string[]): Promise<BodyResponse<ProductEntity>> {
    const param: UpdatingProductCatalogParam = {
      id: id,
      categoriesId: categoriesId
    };

    const result = await this.clientProductRepo.updateProductCatalog(param);
    return new ResponseBuilder<ProductEntity>()
      .message('Update product catalog succesfully')
      .data(result)
      .build();
  }


}