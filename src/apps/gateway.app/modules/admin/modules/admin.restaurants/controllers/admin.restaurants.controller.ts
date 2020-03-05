import { Controller, Post, Body, Get, Param, Put, Delete, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { MessageConstant } from '@shared.all/constants';
import { BodyResponse, RestaurantEntity, ResponseBuilder, RestaurantSummaryEntity, UpdatingRestaurantParam, CreatingRestaurantDto, RestaurantDetailInforResponse, UpdatingRestaurantDto, CountingOrdersQuery, TokenUserPayload, CompanyType } from '@models';

import { ClientRestaurantsRepository, IClientRestaurantsRepository, ClientOrderRepository, IClientOrderRepository } from '@libs/repositories';
import { CurrentUser } from '@shared.all/decorators/user.decorator';

@ApiBearerAuth()
@ApiUseTags('admin-restaurants')
@Controller()
export class AdminRestaurantsController {
  constructor(@Inject(ClientRestaurantsRepository) private readonly clientRestaurantRepo: IClientRestaurantsRepository,
    @Inject(ClientOrderRepository) private readonly clientOrderRepo: IClientOrderRepository) { }

  @ApiOperation({ title: 'Create new restaurant' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.CREATING_RESTAURANT_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createNewRestaurant(@Body() dto: CreatingRestaurantDto): Promise<BodyResponse<RestaurantEntity>> {
    const result = await this.clientRestaurantRepo.createRestaurant(dto);
    return new ResponseBuilder<RestaurantEntity>()
      .message(MessageConstant.CREATING_RESTAURANT_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get restaurant detail' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Get(':id')
  async getDetail(@Param('id') id: string): Promise<BodyResponse<RestaurantDetailInforResponse>> {
    const result = await this.clientRestaurantRepo.getById(id, false) as RestaurantDetailInforResponse;
    return new ResponseBuilder<RestaurantDetailInforResponse>()
      .message(MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Find restaurants' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getRestaurants(@CurrentUser() userToken: TokenUserPayload): Promise<BodyResponse<RestaurantSummaryEntity[]>> {
    const result = await this.clientRestaurantRepo.findRestaurants();

    const query: CountingOrdersQuery = {
      companyType: CompanyType.Restaurants,
      companyIds: result.map(i => i._id)
    };
    const countingOrders = await this.clientOrderRepo.getCountingOrders(query);

    result.forEach(i => {
      const total = countingOrders[i._id];
      i.totalOrders = total ? total : 0;
    });

    return new ResponseBuilder<RestaurantSummaryEntity[]>()
      .message(MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update restaurant' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Put(':id')
  async updateRestaurant(@Param('id') id: string, @Body() dto: UpdatingRestaurantDto): Promise<BodyResponse<RestaurantEntity>> {
    const param: UpdatingRestaurantParam = {
      id: id,
      dto: dto
    };
    const result = await this.clientRestaurantRepo.updateRestaurant(param);
    return new ResponseBuilder<RestaurantEntity>()
      .message(MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY)
      .data(result)
      .build();
  }


  @ApiOperation({ title: 'Delete restaurant' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id' })
  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientRestaurantRepo.deleteRestaurant(id);
    return new ResponseBuilder<boolean>()
      .message(MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY)
      .data(result)
      .build();
  }
}