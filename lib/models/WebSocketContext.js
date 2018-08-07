"use strict";
// import * as log4js from 'koa-log4';
// import * as WebSocket from 'ws';
// const _log = log4js.getLogger('WebSocketContext');
// export default class WebSocketContext {
//     private static _instance = new WebSocketContext();
//     public static getInstance(): WebSocketContext {
//       return WebSocketContext._instance;
//     }
//     private static _websocket;
//     private constructor() {}
//     public getWebsocket(): WebSocket.Server {
//       return WebSocketContext._websocket;
//     }
//     public static init(websocket) {
//       WebSocketContext._websocket = websocket;
//       websocket.on('connection', (ws, req, head) => {
//         _log.info('connection', req.connection.remoteAddress);
//         ws.on('disconnect', (code: number, reason: string): void => {
//             _log.info('disconnect');
//         });
//         ws.on('error', (err: Error) => {
//             _log.error('error', err);
//         });
//       });
//       websocket.setMiddleware('onPublish', (channel: string, data: any): void => {
//         _log.info('onPublish', data);
//       });
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU29ja2V0Q29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9XZWJTb2NrZXRDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBc0M7QUFDdEMsbUNBQW1DO0FBRW5DLHFEQUFxRDtBQUNyRCwwQ0FBMEM7QUFDMUMseURBQXlEO0FBQ3pELHNEQUFzRDtBQUN0RCwyQ0FBMkM7QUFDM0MsUUFBUTtBQUNSLGlDQUFpQztBQUNqQywrQkFBK0I7QUFDL0IsZ0RBQWdEO0FBQ2hELDRDQUE0QztBQUM1QyxRQUFRO0FBQ1Isc0NBQXNDO0FBQ3RDLGlEQUFpRDtBQUNqRCx3REFBd0Q7QUFDeEQsaUVBQWlFO0FBQ2pFLHdFQUF3RTtBQUN4RSx1Q0FBdUM7QUFDdkMsY0FBYztBQUNkLDJDQUEyQztBQUMzQyx3Q0FBd0M7QUFDeEMsY0FBYztBQUNkLFlBQVk7QUFDWixxRkFBcUY7QUFDckYsd0NBQXdDO0FBQ3hDLFlBQVk7QUFDWixRQUFRO0FBQ1IsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG4vLyBpbXBvcnQgKiBhcyBXZWJTb2NrZXQgZnJvbSAnd3MnO1xuXG4vLyBjb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignV2ViU29ja2V0Q29udGV4dCcpO1xuLy8gZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViU29ja2V0Q29udGV4dCB7XG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlID0gbmV3IFdlYlNvY2tldENvbnRleHQoKTtcbi8vICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFdlYlNvY2tldENvbnRleHQge1xuLy8gICAgICAgcmV0dXJuIFdlYlNvY2tldENvbnRleHQuX2luc3RhbmNlO1xuLy8gICAgIH1cbi8vICAgICBwcml2YXRlIHN0YXRpYyBfd2Vic29ja2V0O1xuLy8gICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuLy8gICAgIHB1YmxpYyBnZXRXZWJzb2NrZXQoKTogV2ViU29ja2V0LlNlcnZlciB7XG4vLyAgICAgICByZXR1cm4gV2ViU29ja2V0Q29udGV4dC5fd2Vic29ja2V0O1xuLy8gICAgIH1cbi8vICAgICBwdWJsaWMgc3RhdGljIGluaXQod2Vic29ja2V0KSB7XG4vLyAgICAgICBXZWJTb2NrZXRDb250ZXh0Ll93ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7XG4vLyAgICAgICB3ZWJzb2NrZXQub24oJ2Nvbm5lY3Rpb24nLCAod3MsIHJlcSwgaGVhZCkgPT4ge1xuLy8gICAgICAgICBfbG9nLmluZm8oJ2Nvbm5lY3Rpb24nLCByZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzKTtcbi8vICAgICAgICAgd3Mub24oJ2Rpc2Nvbm5lY3QnLCAoY29kZTogbnVtYmVyLCByZWFzb246IHN0cmluZyk6IHZvaWQgPT4ge1xuLy8gICAgICAgICAgICAgX2xvZy5pbmZvKCdkaXNjb25uZWN0Jyk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB3cy5vbignZXJyb3InLCAoZXJyOiBFcnJvcikgPT4ge1xuLy8gICAgICAgICAgICAgX2xvZy5lcnJvcignZXJyb3InLCBlcnIpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgIH0pO1xuLy8gICAgICAgd2Vic29ja2V0LnNldE1pZGRsZXdhcmUoJ29uUHVibGlzaCcsIChjaGFubmVsOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQgPT4ge1xuLy8gICAgICAgICBfbG9nLmluZm8oJ29uUHVibGlzaCcsIGRhdGEpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfVxuLy8gfVxuIl19