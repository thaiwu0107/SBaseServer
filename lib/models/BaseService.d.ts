import SocketPushManager from '../microServices/SocketPushManager';
export default abstract class BaseService {
    protected _log: any;
    protected socketPushManager: SocketPushManager;
}
