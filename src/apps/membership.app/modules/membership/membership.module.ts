import { Module } from '@nestjs/common';
import { MembershipMongoModule } from '../../libs/mongo/membership-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { MembershipSchema, MembershipRuleSchema } from '../../libs/mongo/schemas';
import { MembershipRepository } from './repositories';
import { GetMembershipDetailUseCase, GetMembershipsUseCase, CreateMembershipUseCase, UpdateMembershipUseCase } from './use.cases';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { MemberShipsController } from './controllers';
import { MembershipRulesModule } from '../membership-rules/membership-rules.module';


const useCases = [
    GetMembershipDetailUseCase,
    GetMembershipsUseCase,
    CreateMembershipUseCase,
    UpdateMembershipUseCase,
];

@Module({
    imports: [
        MembershipRulesModule,
        MembershipMongoModule,
        TypeOrmModule.forFeature([
            MembershipSchema,
            MembershipRuleSchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.Membership).mongodb.getConnection()),
    ],
    controllers: [
        MemberShipsController
    ],
    providers: [
        MembershipRepository,
        MyLoggerService,
        ...useCases
    ]
})
export class MembershipModule {

}