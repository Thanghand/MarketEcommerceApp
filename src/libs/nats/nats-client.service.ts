import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Configuration } from '@shared.all/config';
import { CustomClientNats } from './clients/custom-client-nats';

@Injectable()
export class NatsClientService{

    public client: CustomClientNats;
    constructor() {
        const options = {
            url: Configuration.getConfig().natsUri,
        };
        this.client = new CustomClientNats(options);
        this.client.connect();
    }

    public emitMessage(messageName: string, input: any): void {
        this.client.emit(messageName, input);
    }

    public async sendMessage<T>(messageName: string, input: any): Promise<T> {

        let error;
        const result = await this.client
            .send<T>(messageName, input)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(err => {
                    error = err;
                    console.error('Error Message:', err);
                    return of(null);
                })
            ).toPromise();

        if (result === null && error) {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
        return result;
    }

}