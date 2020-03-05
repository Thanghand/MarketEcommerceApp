import { Module } from '@nestjs/common';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { AdminMembershipController } from './controllers/admin-membership.controller';
import { AdminMembershipRuleController } from './controllers/admin-membership-rule.controller';

@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        AdminMembershipController,
        AdminMembershipRuleController
    ]
})
export class AdminMembershipModule {

}