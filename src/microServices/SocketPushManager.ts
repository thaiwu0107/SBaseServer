import { WSServer } from 'clusterws';
import * as log4js from 'koa-log4';
import 'reflect-metadata';
import WebSocketContext from '../models/WebSocketContext';

const _log = log4js.getLogger('SocketPushManager');
export default class SocketPushManager {
    protected _context: WSServer = WebSocketContext.getInstance().getWebsocket() as any;
    /**
     * 廣播給有訂閱頻道的前端
     * !!注意Server端無法訂閱頻道,無法使用這種方式在Server跟Server之間溝通
     * @param {string} channel 頻道名稱
     * @param {*} data 任何格式的資料
     * @returns {Promise<any>}
     * @memberof SocketPushManager
     */
    public async publishChannel(channel: string, data: any): Promise<void> {
        return this._context.publish(channel, data);
    }
}
