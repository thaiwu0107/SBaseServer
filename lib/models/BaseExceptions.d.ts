import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
export default abstract class BaseExceptions<T> extends Error {
    status: BaseHttpStatusCode | T;
    message: any;
    private _TType;
    constructor(status: BaseHttpStatusCode | T, msg?: string | any);
    protected abstract setType(): T;
}
