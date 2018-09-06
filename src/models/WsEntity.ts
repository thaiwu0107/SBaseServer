import * as log4js from 'koa-log4';
import * as _ from 'lodash';

const _log = log4js.getLogger('WsEntity');

export default class WsEntity {
    private _ws;
    constructor(ws: any) {
        this._ws = ws;
    }
    /**
     * 主動發送給單一前端
     * @param {string} eventName 事件名
     * @param {string} protocol 協議名
     * @param {*} data 資料
     * @memberof WsEntity
     */
    public async send(eventName: string, protocol: string, data: any) {
        return this._ws.send(eventName, {
            protocol,
            data
          });
    }
    /**
     * server主動要求斷線
     * @param {number} [code] 識別碼自己定義實作
     * @param {string} [reason] 可以夾帶文字敘述
     * @memberof WsEntity
     */
    public async disconnect(code?: number, reason?: string) {
        return this._ws.disconnect(code, reason);
    }
    public async on(eventName: string, fun: (data: any, anyData?: any) => void) {
        return this._ws.on(eventName, fun);
    }
}
