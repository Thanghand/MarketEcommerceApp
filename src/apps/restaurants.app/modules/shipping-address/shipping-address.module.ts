import { Module } from '@nestjs/common';
import { 
    AssignShippingAddressUseCase, 
    CreateShippingAddressUseCase, 
    DeleteShippingAddressUseCase, 
    GetShippingAddressesOfUserUseCase, 
    GetShippingAddressesUseCase, 
    UpdateShippingAddressUseCase } from './use.cases';
    
import { ClientUserRepository } from '@libs/repositories';
import { RestaurantsMongoModule } from '../../libs/mongo/restaurant-mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppServiceNameConfig, Configuration } from '@shared.all/config';
import { RestaurantSchema } from '../../libs/mongo/schemas';
import { RestaurantShippingAddressController } from './controllers/restaurant.shipping.address.controller';
import { UserShippingAddressController } from './controllers/user.shipping.address.controller';
import { NatsClientService } from '@libs/nats/nats-client.service';
import { MyLoggerService } from '@libs/logger/services/my.logger.service';
import { RestaurantsRepository } from '../restaurants/repositories';

const useCaseProvider = [
    AssignShippingAddressUseCase,
    CreateShippingAddressUseCase,
    DeleteShippingAddressUseCase,
    GetShippingAddressesOfUserUseCase,
    GetShippingAddressesUseCase,
    UpdateShippingAddressUseCase
];

const repositories = [
    ClientUserRepository,
    RestaurantsRepository
];

@Module({
    imports: [
        RestaurantsMongoModule,
        TypeOrmModule.forFeature([
            RestaurantSchema, 
        ], Configuration.getConfig().getService(AppServiceNameConfig.Restaurants).mongodb.getConnection()),
    ],
    controllers: [
        RestaurantShippingAddressController,
        UserShippingAddressController
    ],
    providers: [
        NatsClientService,
        ...useCaseProvider,
        ...repositories,
        MyLoggerService
    ]
})
export class ShippingAddressModule {

}