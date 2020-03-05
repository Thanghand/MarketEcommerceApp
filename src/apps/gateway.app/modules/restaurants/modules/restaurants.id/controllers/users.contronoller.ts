import { Controller, Inject, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { BodyResponse, ResponseBuilder, TokenUserPayload, UserResponse, UpdatingUserDto, UpdatingUserParam } from '@models';
import { CurrentUser } from '@shared.all/decorators/user.decorator';
import { IClientUserRepository, ClientUserRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('restaurants-users')
@Controller('users')
export class UsersController {

  constructor(@Inject(ClientUserRepository)private readonly clientUserRepo: IClientUserRepository) { }

  @ApiOperation({ title: 'Get users', deprecated: false })
  @ApiResponse({
    status: 201,
    description: 'Users value'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/company/:id')
  async getUserInCompany(@Param('id') id: string): Promise<BodyResponse<UserResponse[]>> {
    const result = await this.clientUserRepo.getUsersInCompany(id);
    return new ResponseBuilder<UserResponse[]>()
      .message('Find users successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get users' })
  @ApiResponse({
    status: 201,
    description: 'Users value'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getUsers(@CurrentUser() user: TokenUserPayload): Promise<BodyResponse<UserResponse[]>> {
    const result = await this.clientUserRepo.getUsersInCompany(user.companyId);
    return new ResponseBuilder<UserResponse[]>()
      .message('Find users successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Get user detail' })
  @ApiResponse({
    status: 201,
    description: 'Users value'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getUserDetail(@Param('id') id: string): Promise<BodyResponse<UserResponse>> {
    const result = await this.clientUserRepo.getUserDetail(id);
    return new ResponseBuilder<UserResponse>()
      .message('Get user detail successfully')
      .data(result)
      .build();
  }


  @ApiOperation({ title: 'Update user' })
  @ApiResponse({
    status: 201,
    description: 'Users value'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdatingUserDto): Promise<BodyResponse<UserResponse>> {
    const param: UpdatingUserParam = {
      id: id,
      dto: dto
    };
    const result = await this.clientUserRepo.updateUser(param);
    return new ResponseBuilder<UserResponse>()
      .message('Update user detail successfully')
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Delete user' })
  @ApiResponse({
    status: 201,
    description: 'Users value'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<BodyResponse<boolean>> {
    const result = await this.clientUserRepo.deleteUser(id);
    return new ResponseBuilder<boolean>()
      .message('Update user detail successfully')
      .data(result)
      .build();
  }
}