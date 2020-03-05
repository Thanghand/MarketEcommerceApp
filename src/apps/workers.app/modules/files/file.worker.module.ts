import {  Module } from '@nestjs/common';
import { FileEncodeLogoController } from './controllers/file.encode.logo.controller';
import { EncodeImageService } from './services/encode.image.service';
import { NatsClientService } from '@libs/nats/nats-client.service';

@Module({
    controllers: [
        FileEncodeLogoController
    ],
    providers: [
        NatsClientService,
        EncodeImageService,
    ]
})
export class FileWorkerModule {}