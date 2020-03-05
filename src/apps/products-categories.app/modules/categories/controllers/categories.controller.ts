import {
  Controller,
  Body,
  Param,
} from '@nestjs/common';

import { UpdatingCategoryParam } from '@models';

import {
  CategoryQuery,
  CreatingCategoryDto,
  UpdatingCategoryDto,
  CategorySummaryResponse,
  CategoryDetailResponse,
} from '@models';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryDetailUseCase,
  GetCategoriesCountingProductsUseCase,
  GetSupplierCategoriesUseCase
} from '../use.cases';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
// import { GrpcMethod } from '@nestjs/microservices';

@ApiBearerAuth()
@ApiUseTags('admin-categories')
@Controller()
export class CategoriesController {

  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoryUseCase: GetAllCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getDetailCategoryUseCase: GetCategoryDetailUseCase,
    private readonly getCategoriesCountingProductsUseCase: GetCategoriesCountingProductsUseCase,
    private readonly getSupplierCategoiresUseCase: GetSupplierCategoriesUseCase) {
  }

  @MessagePattern(MessageEventName.CATEGORY_CREATE)
  async createNewCategory(@Body() input: CreatingCategoryDto): Promise<CategoryDetailResponse> {
    const result = await this.createCategoryUseCase.execute(input);
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORY_GET_ALL)
  async getAllCategories(): Promise<CategorySummaryResponse[]> {
    const result = await this.getAllCategoryUseCase.execute();
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORIES_SUPPLIER_GET)
  async getSuppliersCategories(companyId: string) {
    const result = await this.getSupplierCategoiresUseCase.execute(companyId);
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORY_GET_ALL_COUNT)
  async getAllCategoriesCountingProducts(): Promise<CategorySummaryResponse[]> {
    const categoryQuery: CategoryQuery = {
      isGetFullCategories: true
    };
    const result = await this.getCategoriesCountingProductsUseCase.execute(categoryQuery);
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORY_GET_DETAIL)
  async getDetailCategory(@Param('id') id: string): Promise<CategoryDetailResponse> {
    const result = await this.getDetailCategoryUseCase.execute(id);
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORY_UPDATE)
  async updateCategory(input: UpdatingCategoryParam): Promise<CategoryDetailResponse> {
    const result = await this.updateCategoryUseCase.execute(input);
    return result;
  }

  @MessagePattern(MessageEventName.CATEGORY_DELETE)
  async deleteCategory(@Param('id') id: string): Promise<boolean> {
    const result = await this.deleteCategoryUseCase.execute(id);
    return result;
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
