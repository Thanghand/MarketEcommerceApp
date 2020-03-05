import { MembershipSchema, MembershipRuleSchema } from './schemas';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';

const schemas = [
    MembershipSchema,
    MembershipRuleSchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.Membership).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})

export class MembershipMongoModule {

}