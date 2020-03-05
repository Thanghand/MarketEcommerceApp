import { Module } from '@nestjs/common';
import { ClientRepositoriesModule } from '@libs/repositories/client-repositories.module';
import { RatingController } from './controllers/rating.controller';


@Module({
    imports: [
        ClientRepositoriesModule
    ],
    controllers: [
        RatingController    
    ]
})
export class RatingModule {
    
}