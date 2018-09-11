import { BaseExceptions } from '@ggttoo44/base-server';
import { HttpStatusCode } from '../config/enum.http';

export default class Warn {
    public status: HttpStatusCode;
    public message: any;

    constructor(status: HttpStatusCode, msg?: BaseExceptions<any> | string | Warn) {
        if (msg instanceof BaseExceptions) {
            throw msg;
        }
        if (msg instanceof Warn) {
            return msg;
        }
        this.status = status;
        this.message = msg ? { message: msg } : { message: HttpStatusCode[status] };
    }
}
