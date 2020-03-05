import { Controller} from '@nestjs/common';
import { AuthenticationUtil } from '../../../libs/shared/utils';
import { SignUpUseCase, SignInUseCase, CreateUsersUseCase } from '../use.cases';
import { MessagePattern } from '@nestjs/microservices';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { 
  UserResponse, 
  SignupDto, 
  GeneratingPasswordResponse, 
  SignInResponse,
  CreatingUserParam,
  SignInParam} from '@libs/models';

@Controller('auth')
export class AuthController {

  constructor(private readonly signUpUseCase: SignUpUseCase,
            private readonly signInUseCase: SignInUseCase,
            private readonly createUsersUseCase: CreateUsersUseCase) { }


  @MessagePattern(MessageEventName.AUTH_SIGNUP)
  async signUp(signupDto: SignupDto): Promise<UserResponse> {
    const result = await this.signUpUseCase.execute(signupDto);
    return result;
  }

  @MessagePattern(MessageEventName.AUTH_SIGNIN)
  async signIn(input: SignInParam): Promise<SignInResponse> {
    const result = await this.signInUseCase.execute(input);
    return result;
  }

  @MessagePattern(MessageEventName.AUTH_CREATE_USERS)
  async createUsers(input: CreatingUserParam): Promise<UserResponse[]> {
    const result = await this.createUsersUseCase.execute(input);
    return result;
  }

  @MessagePattern(MessageEventName.AUTH_PASSWORD)
  generatePassword(): GeneratingPasswordResponse {
    const response: GeneratingPasswordResponse = {
      password: AuthenticationUtil.generateString(8)
    };
    return response;
  }
}
