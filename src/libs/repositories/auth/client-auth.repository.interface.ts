import { SignInParam, UserResponse, SignupDto, SignInResponse, CreatingUserParam } from '@libs/models';


export interface IClientAuthRepository {
    signIn(param: SignInParam): Promise<SignInResponse>;
    signUp(dto: SignupDto): Promise<UserResponse>;
    createUsers(param: CreatingUserParam): Promise<UserResponse[]>;
}