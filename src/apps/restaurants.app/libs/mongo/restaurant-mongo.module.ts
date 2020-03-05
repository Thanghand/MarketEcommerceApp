import { Module } from '@nestjs/common';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSchema } from './schemas';

const schemas = [
    RestaurantSchema
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
           ...Configuration.getConfig().getService(AppServiceNameConfig.Restaurants).mongodb.getMongoTypeOrmOptions(),
            entities: schemas,
        })
    ],
})
export class RestaurantsMongoModule {}