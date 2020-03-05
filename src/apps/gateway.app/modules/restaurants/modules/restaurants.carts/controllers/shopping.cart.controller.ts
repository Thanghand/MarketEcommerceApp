import { Controller, Get, Put, Body, Delete, Param, Inject } from '@nestjs/common';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { TokenUserPayload, ResponseBuilder, BodyResponse, ShoppingCartDetailResponse, UpdatingShoppingCartDto, UpdatingShoppingCartParam, UpdatingStatusGroupProductsParam, UpdatingStatusCartProductDto, RemovingProductiCartParam } from '@models';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IClientShoppingCartRepository, ClientShoppingCartRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('restaurants-cart')
@Controller()
export class ShoppingCartController {

  constructor(@Inject(ClientShoppingCartRepository) private readonly clientCartRepo: IClientShoppingCartRepository) {
  }

  @ApiOperation({ title: 'Get shopping cart detail' })
  @ApiResponse({
    status: 201,
    description: 'Get shopping cart successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getShoppingCart(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<ShoppingCartDetailResponse>> {
    const result = await this.clientCartRepo.getCartDetail(user._id);
    return new ResponseBuilder<ShoppingCartDetailResponse>()
      .message('Get shopping cart successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get count of products in shopping cart ' })
  @ApiResponse({
    status: 201,
    description: 'Get count of products successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('count')
  async getCountOfProducts(@CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<number>> {
    const result = await this.clientCartRepo.getCountOfProducts(userToken._id);
    return new ResponseBuilder<number>()
      .message('Get count of products successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update product shopping cart' })
  @ApiResponse({
    status: 201,
    description: 'Update product shopping cart successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put()
  async updateShoppingCart(@CurrentUser() user: TokenUserPayload, @Body() dto: UpdatingShoppingCartDto): Promise<BodyResponse<number>> {
    const param: UpdatingShoppingCartParam = {
      userId: user._id,
      dto: dto
    };

    const result = await this.clientCartRepo.updateCaart(param);
    return new ResponseBuilder<number>()
      .message('Update shopping cart successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update status product in shopping cart' })
  @ApiResponse({
    status: 201,
    description: 'Update status product in shopping cart successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('status')
  async updateStatusGroupProducts(@CurrentUser() user: TokenUserPayload, @Body() dto: UpdatingStatusCartProductDto): Promise<BodyResponse<boolean>> {

    const param: UpdatingStatusGroupProductsParam = {
      userId: user._id,
      dto: dto
    };
    const result = await this.clientCartRepo.updateStatusCart(param);
    return new ResponseBuilder<boolean>()
      .message('Update status successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Remove product in shopping cart' })
  @ApiResponse({
    status: 201,
    description: 'Remove product in shopping cart successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('/product/:id')
  async removeProduct(@CurrentUser() user: TokenUserPayload, @Param('id') productId: string): Promise<BodyResponse<number>> {
    const param: RemovingProductiCartParam = {
      userId: user._id,
      productId: productId
    };
    const result = await this.clientCartRepo.removeProduct(param);
    return new ResponseBuilder<number>()
      .message('Remove product in shopping cart successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Clear shopping cart' })
  @ApiResponse({
    status: 201,
    description: 'Clear shopping cart successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete()
  async clearShoppingCart(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<number>> {
    const result = await this.clientCartRepo.clearShoppingCart(user._id);
    return new ResponseBuilder<number>()
      .message('Clear shopping cart successfully')
      .data(result)
      .build();
  }
}