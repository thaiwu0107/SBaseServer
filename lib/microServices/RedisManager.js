"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
require("reflect-metadata");
const ioc_1 = require("../ioc/ioc");
const RedisContext_1 = require("../models/RedisContext");
const _log = log4js.getLogger('RedisManger');
let RedisManger = class RedisManger {
    constructor() {
        this.redis = RedisContext_1.default.getInstance().getRedis();
    }
    async set(k, v, ex) {
        if (_.isUndefined(ex)) {
            return this.redis.set(k, v);
        }
        else {
            await this.redis.set(k, v);
            return this.redis.expire(k, ex);
        }
    }
    async get(k) {
        return this.redis.get(k);
    }
    async incr(k) {
        return this.redis.incr(k);
    }
    async getMatchKeys(match, perElements = 300) {
        let keys = [];
        const matchObj = {
            // only returns keys following the pattern of `user:*`
            match: match + '*',
            // returns approximately 100 elements per call
            count: perElements
        };
        return new Promise((resolve, reject) => {
            RedisContext_1.default.getInstance().getallMasters().forEach((node) => {
                const stream = node.scanStream(matchObj);
                stream.on('data', (resultKeys) => {
                    keys = _.concat(keys, resultKeys);
                });
                stream.on('end', () => {
                    resolve(keys);
                });
            });
        });
    }
};
RedisManger = __decorate([
    ioc_1.provide('RedisManger')
], RedisManger);
exports.default = RedisManger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLDRCQUEwQjtBQUMxQixvQ0FBcUM7QUFDckMseURBQWtEO0FBRWxELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFN0MsSUFBcUIsV0FBVyxHQUFoQyxNQUFxQixXQUFXO0lBRGhDO1FBRVksVUFBSyxHQUFrQixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBUyxDQUFDO0lBbUNoRixDQUFDO0lBbENVLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQU0sRUFBRSxFQUFXO1FBQzNDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0gsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBQ00sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFTO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBUztRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQWMsRUFBRSxXQUFXLEdBQUcsR0FBRztRQUN2RCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLFFBQVEsR0FBRztZQUNiLHNEQUFzRDtZQUN0RCxLQUFLLEVBQUUsS0FBSyxHQUFHLEdBQUc7WUFDbEIsOENBQThDO1lBQzlDLEtBQUssRUFBRSxXQUFXO1NBQ3JCLENBQUM7UUFDRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzdELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzdCLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQXNCLENBQUM7SUFDNUIsQ0FBQztDQUNKLENBQUE7QUFwQ29CLFdBQVc7SUFEL0IsYUFBTyxDQUFDLGFBQWEsQ0FBQztHQUNGLFdBQVcsQ0FvQy9CO2tCQXBDb0IsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIElPUmVkaXMgZnJvbSAnaW9yZWRpcyc7XG5pbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IHByb3ZpZGUgfSBmcm9tICcuLi9pb2MvaW9jJztcbmltcG9ydCBSZWRpc0NvbnRleHQgZnJvbSAnLi4vbW9kZWxzL1JlZGlzQ29udGV4dCc7XG5cbmNvbnN0IF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKCdSZWRpc01hbmdlcicpO1xuQHByb3ZpZGUoJ1JlZGlzTWFuZ2VyJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZGlzTWFuZ2VyIHtcbiAgICBwcml2YXRlIHJlZGlzOiBJT1JlZGlzLlJlZGlzID0gUmVkaXNDb250ZXh0LmdldEluc3RhbmNlKCkuZ2V0UmVkaXMoKSBhcyBhbnk7XG4gICAgcHVibGljIGFzeW5jIHNldChrOiBzdHJpbmcsIHY6IGFueSwgZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoZXgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5zZXQoaywgdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlZGlzLnNldChrLCB2KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlzLmV4cGlyZShrLCBleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGdldChrOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZ2V0KGspO1xuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgaW5jcihrOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuaW5jcihrKTtcbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGdldE1hdGNoS2V5cyhtYXRjaD86IHN0cmluZywgcGVyRWxlbWVudHMgPSAzMDApOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGxldCBrZXlzID0gW107XG4gICAgICAgIGNvbnN0IG1hdGNoT2JqID0ge1xuICAgICAgICAgICAgLy8gb25seSByZXR1cm5zIGtleXMgZm9sbG93aW5nIHRoZSBwYXR0ZXJuIG9mIGB1c2VyOipgXG4gICAgICAgICAgICBtYXRjaDogbWF0Y2ggKyAnKicsXG4gICAgICAgICAgICAvLyByZXR1cm5zIGFwcHJveGltYXRlbHkgMTAwIGVsZW1lbnRzIHBlciBjYWxsXG4gICAgICAgICAgICBjb3VudDogcGVyRWxlbWVudHNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIFJlZGlzQ29udGV4dC5nZXRJbnN0YW5jZSgpLmdldGFsbE1hc3RlcnMoKS5mb3JFYWNoKChub2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJlYW0gPSBub2RlLnNjYW5TdHJlYW0obWF0Y2hPYmopO1xuICAgICAgICAgICAgICAgIHN0cmVhbS5vbignZGF0YScsIChyZXN1bHRLZXlzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBfLmNvbmNhdChrZXlzLCByZXN1bHRLZXlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShrZXlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSBhcyBQcm9taXNlPHN0cmluZ1tdPjtcbiAgICB9XG59XG4iXX0=