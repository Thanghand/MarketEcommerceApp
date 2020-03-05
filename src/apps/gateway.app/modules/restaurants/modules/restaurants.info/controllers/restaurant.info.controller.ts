import { Controller, Get, Put, Body, Delete, HttpService, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { MessageConstant } from '@shared.all/constants';
import { BodyResponse, RestaurantEntity, ResponseBuilder, TokenUserPayload, RestaurantDetailInforResponse, UpdatingRestaurantDto, UpdatingRestaurantParam } from '@models';
import { CurrentUser, Token } from '@shared.all/decorators/user.decorator';
import { Observable } from 'rxjs';
import { ClientRestaurantsRepository, IClientRestaurantsRepository } from '@libs/repositories';

interface HeroService {
  findOne(data: { id: number }): Observable<any>;
}

@ApiBearerAuth()
@ApiUseTags('restaurants-information')
@Controller()
export class RestaurantsInfoController {

  constructor(@Inject(ClientRestaurantsRepository) private readonly clientRestaurantRepo: IClientRestaurantsRepository) {
  }

  @ApiOperation({ title: 'Get restaurant detail' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getInfo(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<RestaurantDetailInforResponse>> {
    const result = await this.clientRestaurantRepo.getById(user.companyId, false) as RestaurantDetailInforResponse;
    return new ResponseBuilder<RestaurantDetailInforResponse>()
      .message(MessageConstant.GETTING_RESTAURANTS_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete restaurant' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete()
  async deleteRestaurantInfo(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<boolean>> {
    const result = await this.clientRestaurantRepo.deleteRestaurant(user.companyId);
    return new ResponseBuilder<boolean>()
      .message(MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update restaurant' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put()
  async updateRestaurantInfo(@CurrentUser() user: TokenUserPayload, @Body() dto: UpdatingRestaurantDto): Promise<BodyResponse<RestaurantEntity>> {
    const param: UpdatingRestaurantParam = {
      id: user.companyId,
      dto: dto
    };
    const result = await this.clientRestaurantRepo.updateRestaurant(param);
    return new ResponseBuilder<RestaurantEntity>()
      .message(MessageConstant.UPDATING_RESTAURANT_SUCCESSFULLY)
      .data(result)
      .build();
  }
}