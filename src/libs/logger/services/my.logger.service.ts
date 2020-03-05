import { Injectable } from "@nestjs/common";

@Injectable()
export class MyLoggerService {

    log(message: string) {
        console.error(`${message}`);
    }
    error(message: string, trace: string) {
        console.error(`${trace} - ${message} `);
    }
    warn(message: string) {}
    debug(message: string) {}
    verbose(message: string) {}
}
