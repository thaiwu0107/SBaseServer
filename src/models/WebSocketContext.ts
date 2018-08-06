import * as WebSocket from 'ws';

// const heartbeat = () {
//   this.isAlive = true;
// }

export default class WebSocketContext {
    private static _instance = new WebSocketContext();
    public static getInstance(): WebSocketContext {
      return WebSocketContext._instance;
    }
    private static _websocket;
    private static isAlive: any;
    private constructor() {}
    public getWebsocket(): WebSocket.Server {
      return WebSocketContext._websocket;
    }
    public static init(websocket) {
      WebSocketContext._websocket = websocket;
      websocket.on('connection', (ws, req, head) => {
        ws.isAlive = true;
        // ws.on('pong', heartbeat);
        console.log(req.connection.remoteAddress);
        ws.on('open', () => {
            console.log('connected');
        });
        ws.on('close', () => {
            console.log('disconnected');
        });
        ws.on('message', (data) => {
            console.log('message', data);
        });
        ws.on('error', (err) => {
            console.log('error', err);
            throw err;
        });
    });
    }
    // private heartbeat() {
    //   this.isAlive = true;
    // }
    // public static init(websocket) {
    //   WebSocketContext._websocket = websocket;
    //   websocket.on('connection', (ws, req, head) => {
    //     WebSocketContext._ows = ws;
    //     WebSocketContext._req = req;
    //     WebSocketContext._head = head;
    //     console.log(req.connection.remoteAddress);
    //     ws.on('open', () => {
    //         console.log('connected');
    //     });
    //     ws.on('close', () => {
    //         console.log('disconnected');
    //     });
    //     ws.on('message', (data) => {
    //         console.log('message', data);
    //     });
    //     ws.on('error', (err) => {
    //         console.log('error', err);
    //         throw err;
    //     });
    // });
    // }
}
