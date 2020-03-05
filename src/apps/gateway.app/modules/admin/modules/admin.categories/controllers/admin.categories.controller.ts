import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Inject
} from '@nestjs/common';


import { ResponseBuilder, BodyResponse, CategoryQuery, UpdatingCategoryParam, CategoryDetailResponse, CreatingCategoryDto, CategorySummaryResponse, UpdatingCategoryDto } from '@models';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientCategoryRepository, IClientCategoryRepository } from '@libs/repositories';
// import { GrpcMethod } from '@nestjs/microservices';

@ApiBearerAuth()
@ApiUseTags('admin-categories')
@Controller()
export class AdminCategoriesController {

  constructor(@Inject(ClientCategoryRepository) private readonly clientCategoryRepo: IClientCategoryRepository) {
  }

  @ApiOperation({ title: 'Create new category' })
  @ApiResponse({
    status: 201,
    description: 'Create new category successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createNewCategory(@Body() input: CreatingCategoryDto): Promise<BodyResponse<CategoryDetailResponse>> {
    const result = await this.clientCategoryRepo.createCategory(input);
    return new ResponseBuilder<CategoryDetailResponse>()
      .message('Create new category successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get all categories' })
  @ApiResponse({
    status: 201,
    description: 'Get all categories successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getAllCategories(): Promise<BodyResponse<CategorySummaryResponse[]>> {
    const result = await this.clientCategoryRepo.getAllCategory();
    return new ResponseBuilder<CategorySummaryResponse[]>()
      .message('Get all categories successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get all categories counting products' })
  @ApiResponse({
    status: 201,
    description: 'Get all categories successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/counting/products')
  async getAllCategoriesCountingProducts(): Promise<BodyResponse<CategorySummaryResponse[]>> {
    const categoryQuery: CategoryQuery = {
      isGetFullCategories: true
    };
    const result = await this.clientCategoryRepo.getAllCategoriesCountingProducts(categoryQuery);
    return new ResponseBuilder<CategorySummaryResponse[]>()
      .message('Get all categories successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get detail category' })
  @ApiResponse({
    status: 201,
    description: 'Get detail category successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getDetailCategory(@Param('id') id: string): Promise<BodyResponse<CategoryDetailResponse>> {
    const result = await this.clientCategoryRepo.getDetailCategory(id);
    return new ResponseBuilder<CategoryDetailResponse>()
      .message('Get detail category successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Update category' })
  @ApiResponse({
    status: 201,
    description: 'Update category successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: UpdatingCategoryDto): Promise<BodyResponse<CategoryDetailResponse>> {

    const param: UpdatingCategoryParam = {
      id: id,
      dto: dto
    }
    const result = await this.clientCategoryRepo.updateCategory(param);
    return new ResponseBuilder<CategoryDetailResponse>()
      .message('Update category successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete category' })
  @ApiResponse({
    status: 201,
    description: 'Delete category successfully'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientCategoryRepo.deleteCategory(id);
    return new ResponseBuilder<boolean>()
      .message('Delete category successfully')
      .data(result)
      .build();
  }

  // @GrpcMethod('HeroService')
  // findOne(): Hero {
  //   const items: Hero[] = [{ id: 1, name: 'Thang Rat dep trai' }, { id: 2, name: 'Ran' }];
  //   return items[0];
  // }
}

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}
