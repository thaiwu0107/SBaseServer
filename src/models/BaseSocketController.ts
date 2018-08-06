import * as log4js from 'koa-log4';

export default abstract class BaseSocketController {
    protected _log = log4js.getLogger(this.constructor.name);
    private _socketName: string;
}
