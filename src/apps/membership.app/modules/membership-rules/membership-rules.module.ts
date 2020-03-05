import { Module } from '@nestjs/common';
import { MembershipRuleRepository } from './repositories/membership-rule.repository';
import { MembershipRulesController } from './controllers/membership-rules.controller';
import { MembershipMongoModule } from '../../libs/mongo/membership-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipRuleSchema } from '../../libs/mongo/schemas';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { UpdateMembershipRuleUseCase, GetMembershipRuleDetailUseCase } from './use.cases';

const useCases = [
    GetMembershipRuleDetailUseCase,
    UpdateMembershipRuleUseCase,
];

const repositories = [
    MembershipRuleRepository,
];

@Module({
    imports: [
        MembershipMongoModule,
        TypeOrmModule.forFeature([
            MembershipRuleSchema
        ], Configuration.getConfig().getService(AppServiceNameConfig.Membership).mongodb.getConnection()),
    ],
    controllers: [
        MembershipRulesController
    ],
    providers: [
        ...useCases,
        ...repositories
    ],
    exports: [
        ...useCases,
        ...repositories
    ]
})
export class MembershipRulesModule {

}