import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileEncodeParam } from '@models';
import { MessageEventName } from '@shared.all/constants/messages-event-name';
import { EncodeImageService } from '../services/encode.image.service';


@Controller()
export class FileEncodeLogoController {

    constructor(private readonly encodeImageService: EncodeImageService) {
    }

    @MessagePattern(MessageEventName.WORKERS_FILE_ENCODE)
    public encodeLogo(params: FileEncodeParam) {
        const {filename, note} = params;
        this.encodeImageService.makeEncodeBase64(filename, note);
    }
}