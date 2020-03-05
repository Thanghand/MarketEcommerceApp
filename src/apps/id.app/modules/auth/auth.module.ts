import { Module, RequestMethod } from '@nestjs/common';

import { RouteInfo } from '@nestjs/common/interfaces';
import { NameProviders } from '@models';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers';
import { CreateUsersUseCase, SignUpUseCase, SignInUseCase, ValidateUserUseCase } from './use.cases';
import { IdMongoModule } from '../../libs/mongo/id-mongo.module';
import { UserSchema } from '../../libs/mongo/schemas/user.schema';
import { LoggerModule } from '@libs/logger/logger.module';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { ClientCompanyRepository, ClientRestaurantsRepository, ClientSuppliersRepository } from '@libs/repositories';
import { UserRepository } from '../users/repositories';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

const excludeRoutes: RouteInfo[] = [
  {
    path: 'signIn',
    method: RequestMethod.POST
  },
  {
    path: 'password',
    method: RequestMethod.GET
  }
];
const AuthenticationExclueProvider = {
  provide: NameProviders.AuthExcluded,
  useValue: excludeRoutes
};

const repositoryProviders = [
  UserRepository,
  ClientCompanyRepository,
  ClientRestaurantsRepository,
  ClientSuppliersRepository
];

const userCaseProviders = [

  // Auth
  SignUpUseCase,
  SignInUseCase,
  ValidateUserUseCase,
  CreateUsersUseCase,
  AuthenticationExclueProvider
];

@Module({
  imports: [
    IdMongoModule,
    TypeOrmModule.forFeature([
      UserSchema,
    ], Configuration.getConfig().getService(AppServiceNameConfig.Id).mongodb.getConnection()),
    LoggerModule,
    LibAuthModule
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    NatsClientService,
    ...repositoryProviders,
    ...userCaseProviders,
    MyLoggerService
  ],
  exports: [
    ValidateUserUseCase,
    SignUpUseCase,
    CreateUsersUseCase,
    AuthenticationExclueProvider,
  ]
})
export class AuthModule { }
