import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
export default class DocChanged {
    status: BaseHttpStatusCode;
    message: any;
    constructor(msg?: any, forswagger?: any);
}
