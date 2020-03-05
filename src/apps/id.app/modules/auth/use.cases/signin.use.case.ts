import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository, IUserRepository} from '../../users/repositories';
import { AuthenticationUtil } from '../../../libs/shared/utils';
import { JwtService } from '@nestjs/jwt'; 
import { MessageConstant } from '@shared.all/constants';
import { TokenUserPayload, SignInResponse, SignInDto, CompanyType, SignInParam } from '@models';
import { UseCase } from '@shared.core';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

@Injectable()
export class SignInUseCase extends UseCase<SignInParam, SignInResponse> {
    private readonly tag = 'SignInUseCase';

    constructor(@Inject(UserRepository) private readonly userRepository: IUserRepository,
                private readonly jwtService: JwtService,
                private readonly loggerService: MyLoggerService) {
        super();
    }

    async buildUseCase(input?: SignInParam): Promise<SignInResponse> {

        const {resource, dto} = input;

        if (!dto || !dto.email || !dto.password) {
            this.loggerService.error(MessageConstant.MISSING_FIELDS, this.tag);
            throw new HttpException(MessageConstant.MISSING_FIELDS, HttpStatus.BAD_REQUEST);
        }
    
        const userEntity = await this.userRepository.findByEmail(dto.email);
        if (!userEntity) {
            this.loggerService.error('User is not existed', this.tag);
            throw new HttpException('User is not existed', HttpStatus.UNAUTHORIZED);
        }

        if (userEntity.companyType !== resource) {
            this.loggerService.error(MessageConstant.WRONG_RESOURCES, this.tag);
            throw new HttpException(MessageConstant.WRONG_RESOURCES, HttpStatus.UNAUTHORIZED);
        }

        if(!AuthenticationUtil.comparePassword(dto.password, userEntity.password)) {
            this.loggerService.error('Sorry wrong password', this.tag);
            throw new HttpException('Sorry wrong password', HttpStatus.UNAUTHORIZED);
        }
            
        if (!userEntity.active) {
            this.loggerService.error('Sorry this account has been blocked', this.tag);
            throw new HttpException('Sorry this account has been blocked', HttpStatus.BAD_REQUEST);
        }

        const userPayload: TokenUserPayload = {
            _id: userEntity._id,
            userName: `${userEntity.firstName} ${userEntity.lastName}`.trim(),
            email: userEntity.email,
            companyId: userEntity.companyId,
            companyType: userEntity.companyType,
            role: userEntity.role,
        };

        const accessToken = this.jwtService.sign(userPayload);

        const response: SignInResponse =  {
            token: {
                accessToken: accessToken,
                expireIn: 3600,
            },
            user: {
                email: userEntity.email,
                firstName: userEntity.firstName,
                lastName: userEntity.lastName,
                companyId: userEntity.companyId,
                companyType: userEntity.companyType,
                _id: userEntity._id,
                role: userEntity.role,
                avatar: userEntity.avatar,
            }
        };
        return response;
    }

}