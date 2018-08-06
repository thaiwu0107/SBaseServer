import HttpInitSetting from './models/HttpInitSetting';
export default class WSServer {
    private main;
    private serverInitOnceEvents;
    private koaServer;
    private wssServer;
    constructor(initSetting: HttpInitSetting);
    start(): Promise<void>;
}
