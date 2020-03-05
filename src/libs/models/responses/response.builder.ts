import { BodyResponse } from './body.response';
import { IResponse } from '@models';

export class ResponseBuilder<T extends IResponse> {
    private _message: string;
    private _data: T;

    message(value:string): this {
        this._message = value;
        return this;
    }

    data(value: T): this {
        this._data = value;
        return this;
    }

    build(): BodyResponse<T> {
        const reponse: BodyResponse<T> = {
            message : this._message,
            data: this._data,
            statusCode: 201
        };
        return reponse;
    }

}