import { Module } from '@nestjs/common';
import { MyLoggerService } from './services/my.logger.service';

@Module({
    providers: [
        MyLoggerService,
    ],
    exports: [
        MyLoggerService
    ]
})
export class LoggerModule {}