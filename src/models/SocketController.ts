import * as log4js from 'koa-log4';

export default class SocketController {
    protected _log = log4js.getLogger(this.constructor.name);
}
