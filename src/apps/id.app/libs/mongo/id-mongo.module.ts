import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const schemas = [
    UserSchema
];
@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.Id).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})
export class IdMongoModule {}