"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const log4js = require("koa-log4");
const _ = require("lodash");
require("reflect-metadata");
const ioc_1 = require("../ioc/ioc");
const _log = log4js.getLogger('RedisManger');
let RedisManger = class RedisManger {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.redis = new Redis('redis://h:pcdd8e5327bca3986bb6149fb6bc58104e388b8d1c8ca295cb4cabfaf0407b4b1@ec2-52-5-128-246.compute-1.amazonaws.com:36069');
        const changePromis = this.redis;
        changePromis.Promise = global.Promise;
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
};
RedisManger = __decorate([
    ioc_1.provide('RedisManger'),
    __metadata("design:paramtypes", [])
], RedisManger);
exports.default = RedisManger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL0Jhc2VTb2NrZXRTZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9SZWRpc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsbUNBQW1DO0FBQ25DLDRCQUE0QjtBQUM1Qiw0QkFBMEI7QUFDMUIsb0NBQXFDO0FBRXJDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFN0MsSUFBcUIsV0FBVyxHQUFoQztJQUdJO1FBQ0ksMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsNEhBQTRILENBQUMsQ0FBQztRQUNySixNQUFNLFlBQVksR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBQ00sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBTSxFQUFFLEVBQVc7UUFDM0MsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDSCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFDTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFTO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKLENBQUE7QUF2Qm9CLFdBQVc7SUFEL0IsYUFBTyxDQUFDLGFBQWEsQ0FBQzs7R0FDRixXQUFXLENBdUIvQjtrQkF2Qm9CLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgcHJvdmlkZSB9IGZyb20gJy4uL2lvYy9pb2MnO1xuXG5jb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignUmVkaXNNYW5nZXInKTtcbkBwcm92aWRlKCdSZWRpc01hbmdlcicpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRpc01hbmdlciB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIHByaXZhdGUgcmVkaXM6IFJlZGlzO1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgdGhpcy5yZWRpcyA9IG5ldyBSZWRpcygncmVkaXM6Ly9oOnBjZGQ4ZTUzMjdiY2EzOTg2YmI2MTQ5ZmI2YmM1ODEwNGUzODhiOGQxYzhjYTI5NWNiNGNhYmZhZjA0MDdiNGIxQGVjMi01Mi01LTEyOC0yNDYuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb206MzYwNjknKTtcbiAgICAgICAgY29uc3QgY2hhbmdlUHJvbWlzOiBhbnkgPSB0aGlzLnJlZGlzO1xuICAgICAgICBjaGFuZ2VQcm9taXMuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgc2V0KGs6IHN0cmluZywgdjogYW55LCBleD86IG51bWJlcikge1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlzLnNldChrLCB2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVkaXMuc2V0KGssIHYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVkaXMuZXhwaXJlKGssIGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgZ2V0KGs6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5nZXQoayk7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBpbmNyKGs6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWRpcy5pbmNyKGspO1xuICAgIH1cbn1cbiJdfQ==