import 'reflect-metadata';
export default class WebSocketContext {
    private static _instance;
    static getInstance(): WebSocketContext;
    private _websocket;
    private constructor();
    getWebsocket(): any;
    static init(websocket: any): void;
    onConnection(fun: (ws: any, req: any, head: any) => void): any;
}
