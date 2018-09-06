import * as log4js from 'koa-log4';
import SocketPushManager from '../microServices/SocketPushManager';

export default abstract class BaseController {
    protected _log = log4js.getLogger(this.constructor.name);
    protected socketPushManager: SocketPushManager = new SocketPushManager();
}
