import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { BodyResponse, ResponseBuilder, TokenUserPayload, CategoryQuery, CategorySummaryEntity, CategorySummaryResponse } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { ClientCategoryRepository, IClientCategoryRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('suppliers-categories')
@Controller()
export class CategoriesController {

    constructor(@Inject(ClientCategoryRepository) private readonly clientCategoryRepo: IClientCategoryRepository) {}

    @ApiOperation({ title: 'Get all categories counting products' })
    @ApiResponse({
      status: 201,
      description: 'Get all categories successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiImplicitQuery({
      name: 'full',
      description: 'isGetFullCategories',
      required: false,
      type: Boolean
    })
    @Get()
    async getAllCategoriesCountingProducts(@CurrentUser() user: TokenUserPayload, @Query('full') isGetFullCategories: boolean): Promise<BodyResponse<CategorySummaryResponse[]>> {
        
        const query: CategoryQuery = {
          isGetFullCategories: true,
        };

        if (!isGetFullCategories)
          query.brandId = user.companyId;
        
        const result = await this.clientCategoryRepo.getAllCategoriesCountingProducts(query);
        return new ResponseBuilder<CategorySummaryResponse[]>()
                .message('Get all categories successfully')
                .data(result)
                .build();
    }

    @Get('myCategories')
    async getSupplierCategories(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<CategorySummaryEntity[]>> {
        const result = await this.clientCategoryRepo.getSupplierCategories(user.companyId);
        return new ResponseBuilder<CategorySummaryEntity[]>()
                .message('Get supplier categories successfully')
                .data(result)
                .build();
    }
}