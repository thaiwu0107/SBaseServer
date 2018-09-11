import SocketPushManager from '../microServices/SocketPushManager';
export default abstract class BaseController {
    protected _log: any;
    protected socketPushManager: SocketPushManager;
}
