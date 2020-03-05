import { Module } from '@nestjs/common';
import { 
    CreateRestaurantUsecase, 
    FindRestaurantsUseCase, 
    UpdateRestaurantUseCase, 
    GetRestaurantDetailUseCase, 
    DeleteRestaurantUseCase,
    UpdateUsersInRestaurantUseCase} from './use.cases';
import { RestaurantSchema } from '../../libs/mongo/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsRepository } from './repositories';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { RestaurantsMongoModule } from '../../libs/mongo/restaurant-mongo.module';
import { RestaurantsController } from './controllers/restaurants.controller';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';

const repositories = [
    RestaurantsRepository
];

const useCases = [
    CreateRestaurantUsecase,
    FindRestaurantsUseCase,
    UpdateRestaurantUseCase,
    GetRestaurantDetailUseCase,
    DeleteRestaurantUseCase,
    UpdateUsersInRestaurantUseCase,
];

@Module({
    imports: [
        RestaurantsMongoModule,
        TypeOrmModule.forFeature([
            RestaurantSchema, 
        ], Configuration.getConfig().getService(AppServiceNameConfig.Restaurants).mongodb.getConnection()),
    ],
    controllers: [
        RestaurantsController
    ],
    providers: [
        ...repositories,
        ...useCases,
        MyLoggerService
    ],
    exports: [
        ...useCases,
        ...repositories,
    ]
})
export class RestaurantsModule {

}