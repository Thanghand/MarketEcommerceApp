import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseBuilder, BodyResponse, TokenUserPayload, CompanyType, SignupDto, UserResponse, SignInDto, SignInResponse, CreatingUsersDto, GeneratingPasswordResponse, CreatingUserParam, SignInParam } from '@models';
import { CurrentUser } from '@libs/shared/decorators/user.decorator';
import { MessageConstant } from '@libs/shared/constants';
import { ClientAuthRepository, IClientAuthRepository } from '@libs/repositories';

@ApiBearerAuth()
@ApiUseTags('restaurants-auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(ClientAuthRepository) private readonly clientAuthRepo: IClientAuthRepository) { }


  @ApiOperation({ title: 'SignUp' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.SIGN_UP_RESPONSE
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/signUp')
  async signUp(@Body() signupDto: SignupDto): Promise<BodyResponse<UserResponse>> {
    const result = await this.clientAuthRepo.signUp(signupDto);
    return new ResponseBuilder<UserResponse>()
      .message(MessageConstant.SIGN_UP_RESPONSE)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'SignIn' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.SIGN_IN_RESPONSE
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<BodyResponse<SignInResponse>> {
    const param: SignInParam = {
      resource: CompanyType.Restaurants,
      dto: signInDto
    };
    const result = await this.clientAuthRepo.signIn(param);
    return new ResponseBuilder<SignInResponse>()
      .message(MessageConstant.SIGN_IN_RESPONSE)
      .data(result)
      .build();
  }

  @ApiOperation({ title: 'Create users' })
  @ApiResponse({
    status: 201,
    description: MessageConstant.CREATING_USERS_SUCCESSFULLY
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/users')
  async createUsers(@CurrentUser() user: TokenUserPayload, @Body() createUsersDto: CreatingUsersDto): Promise<BodyResponse<UserResponse[]>> {

    const param: CreatingUserParam = {
      companyType: user.companyType,
      dto: createUsersDto
    };

    const result = await this.clientAuthRepo.createUsers(param); 
    return new ResponseBuilder<UserResponse[]>()
      .message(MessageConstant.CREATING_USERS_SUCCESSFULLY)
      .data(result)
      .build();
  }
}
