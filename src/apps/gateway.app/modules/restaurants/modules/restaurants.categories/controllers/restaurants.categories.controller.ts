import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { BodyResponse, ResponseBuilder, CategoryQuery, CategorySummaryResponse } from '@models';
import { ClientCategoryRepository, IClientCategoryRepository } from '@libs/repositories';


@ApiBearerAuth()
@ApiUseTags('restaurants-categories')
@Controller()
export class RestaurantsCategoriesController {

    constructor(@Inject(ClientCategoryRepository)private readonly clientCategoryRepo: IClientCategoryRepository) {}
    
    @ApiOperation({ title: 'Get all categories counting products' })
    @ApiResponse({
      status: 201,
      description: 'Get all categories successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiImplicitQuery({
      name: 'brandId',
      description: 'supplier id',
      required: false,
      type: String
    })
    @Get()
    async getAllCategoriesCountingProducts(@Query('brandId') brandId: string,): Promise<BodyResponse<CategorySummaryResponse[]>> {
        const query: CategoryQuery = {
          brandId: brandId,
          isGetFullCategories: false,
          isFilterProductEmpty: true
        };
        const result = await this.clientCategoryRepo.getAllCategoriesCountingProducts(query);
        return new ResponseBuilder<CategorySummaryResponse[]>()
                .message('Get all categories successfully')
                .data(result)
                .build();
    }
}