import { HttpStatusCode } from '../config/enum.http';

export default class Success {
    public status: HttpStatusCode;
    public message: any;

    constructor(status: HttpStatusCode, msg?: string | Success) {
        if (msg instanceof Success) {
            return msg;
        }
        this.status = status;
        this.message = msg ? { message: msg } : { message: HttpStatusCode[status] };
    }
}
