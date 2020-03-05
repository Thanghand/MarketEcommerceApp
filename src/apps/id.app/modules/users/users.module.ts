import { Module } from '@nestjs/common';
import { GetUserDetailUseCase, GetUsersCompanyUseCase, UpdateUserUseCase, DeleteUserUseCase } from './use.cases';
import { UsersController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdMongoModule } from '../../libs/mongo/id-mongo.module';
import { LoggerModule } from '@libs/logger/logger.module';
import { LibAuthModule } from '@libs/lib.auth/lib.auth.module';
import { UserSchema } from '../../libs/mongo/schemas/user.schema';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { UserRepository } from './repositories';

const repositoryProviders = [
  UserRepository,
];

const useCaseProviders = [

  // Profile
  GetUserDetailUseCase,
  GetUsersCompanyUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
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
    UsersController
  ],
  providers: [
    ...repositoryProviders,
    ...useCaseProviders,
    MyLoggerService
  ],
  exports: [
    ...repositoryProviders,
    ...useCaseProviders
  ]
})
export class UsersModule {

}