import { Module } from '@nestjs/common';
import { RatingSchema } from '../../libs/mongo/schemas/rating.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration, AppServiceNameConfig } from '@shared.all/config';
import { LoggerModule } from '@libs/logger/logger.module';
import { RatingRepository } from './repositories';
import { CreateNewRatingUseCase, GetRatingUseCase } from './use.cases';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RatingSchema,
        ], Configuration.getConfig().getService(AppServiceNameConfig.Suppliers).mongodb.getConnection()),
        LoggerModule,
    ],
    providers: [
        RatingRepository,
        CreateNewRatingUseCase,
        GetRatingUseCase
    ]
})
export class RatingsModule {

}