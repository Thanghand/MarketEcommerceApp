import { Controller, Inject,Param, } from '@nestjs/common';
import { UserResponse, UpdatingUserDto, UserEntity } from '@models';
import { GetUsersCompanyUseCase, UpdateUserUseCase, DeleteUserUseCase, GetUserDetailUseCase } from '../use.cases';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { IUserRepository, UserRepository } from '../repositories';
import { UpdatingUserParam } from '@libs/models/params/users/updating-user.param';

@Controller('users')
export class UsersController {

  constructor(private readonly getUsersCompanyUseCase: GetUsersCompanyUseCase,
    private readonly getUserDetailUseCase: GetUserDetailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(UserRepository) private readonly userRepo: IUserRepository) { }

  @MessagePattern(MessageEventName.USERS_LIST_COMPANY)
  async getUserInCompany(companyId: string): Promise<UserResponse[]> {
    const result = await this.getUsersCompanyUseCase.execute(companyId);
    return result;
  }

  @MessagePattern(MessageEventName.USERS_DETAIL)
  async getUserDetail(id: string): Promise<UserResponse> {
    const result = await this.getUserDetailUseCase.execute(id, false) as UserResponse;
    return result;
  }

  @MessagePattern(MessageEventName.USERS_UPDATE)
  async updateUser(input: UpdatingUserParam): Promise<UserResponse> {
    const result = await this.updateUserUseCase.execute(input);
    return result;
  }

  @MessagePattern(MessageEventName.USERS_UPDATE_ENTITY)
  async updateUserEntity(input: [string, UserEntity]): Promise<UserEntity> {
    const id = input[0];
    const entity = input[1];
    const result = await this.userRepo.update(id, entity);
    return result;
  }

  @MessagePattern(MessageEventName.USERS_DELETE)
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.deleteUserUseCase.execute(id);
    return result;
  }

}