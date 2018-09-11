"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const log4js = require("koa-log4");
const SocketPushManager_1 = require("../microServices/SocketPushManager");
let BaseController = class BaseController {
    constructor() {
        this._log = log4js.getLogger(this.constructor.name);
        this.socketPushManager = new SocketPushManager_1.default();
    }
};
BaseController = __decorate([
    inversify_1.injectable()
], BaseController);
exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvQmFzZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLDBFQUFtRTtBQUduRSxJQUE4QixjQUFjLEdBQTVDLE1BQThCLGNBQWM7SUFENUM7UUFFYyxTQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLHNCQUFpQixHQUFzQixJQUFJLDJCQUFpQixFQUFFLENBQUM7SUFDN0UsQ0FBQztDQUFBLENBQUE7QUFINkIsY0FBYztJQUQzQyxzQkFBVSxFQUFFO0dBQ2lCLGNBQWMsQ0FHM0M7a0JBSDZCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgU29ja2V0UHVzaE1hbmFnZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9Tb2NrZXRQdXNoTWFuYWdlcic7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VDb250cm9sbGVyIHtcbiAgICBwcm90ZWN0ZWQgX2xvZyA9IGxvZzRqcy5nZXRMb2dnZXIodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICBwcm90ZWN0ZWQgc29ja2V0UHVzaE1hbmFnZXI6IFNvY2tldFB1c2hNYW5hZ2VyID0gbmV3IFNvY2tldFB1c2hNYW5hZ2VyKCk7XG59XG4iXX0=