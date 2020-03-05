import { Module } from '@nestjs/common';
import { MembershipModule } from './membership/membership.module';
import { MembershipRulesModule } from './membership-rules/membership-rules.module';

@Module({
    imports: [
        MembershipModule,
        MembershipRulesModule
    ]
})
export class AppMemberShipModule {

}