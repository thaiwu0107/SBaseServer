import SocketInitSetting from './models/SocketInitSetting';
export default class SServer {
    private main;
    private serverInitOnceEvents;
    private socketServer;
    constructor(initSetting: SocketInitSetting);
    start(): void;
}
