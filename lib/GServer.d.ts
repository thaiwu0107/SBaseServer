/// <reference types="node" />
import { Server } from 'http';
import HttpInitSetting from './models/HttpInitSetting';
export default class GServer {
    private main;
    private serverInitOnceEvents;
    private koaServer;
    constructor(initSetting: HttpInitSetting);
    start(): Promise<Server>;
}
