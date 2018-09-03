import { WSServer } from 'clusterws';
import 'reflect-metadata';
export default class SocketPushManager {
    protected _context: WSServer;
    /**
     * 廣播給有訂閱頻道的前端
     * !!注意Server端無法訂閱頻道,無法使用這種方式在Server跟Server之間溝通
     * @param {string} channel 頻道名稱
     * @param {*} data 任何格式的資料
     * @returns {Promise<any>}
     * @memberof SocketPushManager
     */
    publishChannel(channel: string, data: any): Promise<any>;
}
