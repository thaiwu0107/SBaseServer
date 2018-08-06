import * as WebSocket from 'ws';
export default class WebSocketContext {
    private static _instance;
    static getInstance(): WebSocketContext;
    private static _websocket;
    private static _ows;
    private static _req;
    private static _head;
    private constructor();
    getWebsocket(): WebSocket.Server;
    static init(websocket: any): void;
}
