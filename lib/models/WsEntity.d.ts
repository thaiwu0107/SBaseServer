export default class WsEntity {
    private _ws;
    constructor(ws: any);
    /**
     * 主動發送給單一前端
     * @param {string} eventName 事件名
     * @param {string} protocol 協議名
     * @param {*} data 資料
     * @memberof WsEntity
     */
    send(eventName: string, protocol: string, data: any): Promise<any>;
    /**
     * server主動要求斷線
     * @param {number} [code] 識別碼自己定義實作
     * @param {string} [reason] 可以夾帶文字敘述
     * @memberof WsEntity
     */
    disconnect(code?: number, reason?: string): Promise<any>;
    on(eventName: string, fun: (data: any, anyData?: any) => void): Promise<any>;
}
