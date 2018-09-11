"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const moment = require("moment");
require("reflect-metadata");
const BaseConstant_1 = require("../config/BaseConstant");
const MySqlContext_1 = require("../models/MySqlContext");
const _log = log4js.getLogger('MySqlManger');
class MySqlManger {
    constructor() {
        this._context = MySqlContext_1.default.getInstance();
    }
    async getDBCurrentTime() {
        const sql = await this._context.getBean('main');
        const dbTime = await sql.query('select now() as time limit 1');
        await sql.release();
        return moment(dbTime[0][0].time).toDate();
    }
    async getDBCurrentTimeString() {
        const sql = await this._context.getBean('main');
        const dbTime = await sql.query('select now() as time limit 1');
        await sql.release();
        return dbTime[0][0].time;
    }
    /**
     * 非insert專屬主要目的是為了取得查詢的資料
     * @param {string} sqlScript
     * @param {any[]} [parameters]
     * @param {Transaction} [trans]
     * @returns {Promise<any[]>}
     * @memberof MySqlManger
     */
    async query(sqlScript, parameters, trans) {
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            const res = await sql.query(sqlScript, parameters);
            await sql.release();
            return res[0] || undefined;
        }
        else {
            const res = await trans.conn.query(sqlScript, parameters);
            return res[0] || undefined;
        }
    }
    /**
     * insert專屬可以直接取得insertId的資料
     * @param {string} sqlScript
     * @param {any[]} [parameters]
     * @param {Transaction} [trans]
     * @returns {(Promise<{
     *         insertId: number | string
     *     } | undefined>)}
     * @memberof MySqlManger
     */
    async insert(sqlScript, parameters, trans) {
        let res;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        }
        else {
            res = await trans.conn.query(sqlScript, parameters);
        }
        return res[0].insertId || undefined;
    }
    /**
     * 一次性多重Insert
     * @param {string} sqlScript
     * @param {Transaction} [trans]
     * @param {...any[][]} parameters 要Insert的資料每次一個陣列塞進來
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    async bulkInsert(sqlScript, trans, ...parameters) {
        let res;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        }
        else {
            res = await trans.conn.query(sqlScript, parameters);
        }
        return res || undefined;
    }
    /**
     * 一次性多重Insert
     *
     * @param {string} sqlScript
     * @param {any[][]} [parameters] 要Insert的資料只能使用二維陣列
     * @param {Transaction} [trans]
     * @returns {Promise<any>}
     * @memberof MySqlManger
     */
    async bulkInsertArray(sqlScript, parameters, trans) {
        let res;
        if (_.isUndefined(trans)) {
            const sql = await this._context.getBean('main');
            res = await sql.query(sqlScript, parameters);
            await sql.release();
        }
        else {
            res = await trans.conn.query(sqlScript, parameters);
        }
        return res || undefined;
    }
    async enCode(password, key) {
        const passwordKey = _.isUndefined(key) ? BaseConstant_1.BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        const res = await sql.query('SELECT AES_ENCRYPT(? , ?) as password', [password, passwordKey]);
        await sql.release();
        return res[0][0].password;
    }
    async deCode(password, key) {
        const passwordKey = _.isUndefined(key) ? BaseConstant_1.BaseConstant.DB_PASSWORD_KEY : key;
        const sql = await this._context.getBean('main');
        // tslint:disable-next-line:max-line-length
        const res = await sql.query('SELECT CAST(AES_DECRYPT(? , ?) AS CHAR(200) as password', [password, passwordKey]);
        await sql.release();
        return res[0][0].password;
    }
}
exports.default = MySqlManger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlTcWxNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWljcm9TZXJ2aWNlcy9NeVNxbE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyw0QkFBMEI7QUFDMUIseURBQXNEO0FBQ3RELHlEQUFrRDtBQUdsRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdDLE1BQXFCLFdBQVc7SUFBaEM7UUFDYyxhQUFRLEdBQUcsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQWlIcEQsQ0FBQztJQS9HVSxLQUFLLENBQUMsZ0JBQWdCO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDL0QsTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFTSxLQUFLLENBQUMsc0JBQXNCO1FBQy9CLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDL0QsTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFD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Q0o7QUFsSEQsOEJBa0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IEJhc2VDb25zdGFudCB9IGZyb20gJy4uL2NvbmZpZy9CYXNlQ29uc3RhbnQnO1xuaW1wb3J0IE15c3FsQ29udGV4dCBmcm9tICcuLi9tb2RlbHMvTXlTcWxDb250ZXh0JztcbmltcG9ydCBUcmFuc2FjdGlvbiBmcm9tICcuLi9tb2RlbHMvVHJhbnNhY3Rpb24nO1xuXG5jb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignTXlTcWxNYW5nZXInKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U3FsTWFuZ2VyIHtcbiAgICBwcm90ZWN0ZWQgX2NvbnRleHQgPSBNeXNxbENvbnRleHQuZ2V0SW5zdGFuY2UoKTtcblxuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lKCk6IFByb21pc2U8RGF0ZT4ge1xuICAgICAgICBjb25zdCBzcWwgPSBhd2FpdCB0aGlzLl9jb250ZXh0LmdldEJlYW4oJ21haW4nKTtcbiAgICAgICAgY29uc3QgZGJUaW1lID0gYXdhaXQgc3FsLnF1ZXJ5KCdzZWxlY3Qgbm93KCkgYXMgdGltZSBsaW1pdCAxJyk7XG4gICAgICAgIGF3YWl0IHNxbC5yZWxlYXNlKCk7XG4gICAgICAgIHJldHVybiBtb21lbnQoZGJUaW1lWzBdWzBdLnRpbWUpLnRvRGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lU3RyaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IHNxbCA9IGF3YWl0IHRoaXMuX2NvbnRleHQuZ2V0QmVhbignbWFpbicpO1xuICAgICAgICBjb25zdCBkYlRpbWUgPSBhd2FpdCBzcWwucXVlcnkoJ3NlbGVjdCBub3coKSBhcyB0aW1lIGxpbWl0IDEnKTtcbiAgICAgICAgYXdhaXQgc3FsLnJlbGVhc2UoKTtcbiAgICAgICAgcmV0dXJuIGRiVGltZVswXVswXS50aW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpnZ5pbnNlcnTlsIjlsazkuLvopoHnm67nmoTmmK/ngrrkuoblj5blvpfmn6XoqaLnmoTos4fmlplcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3FsU2NyaXB0XG4gICAgICogQHBhcmFtIHthbnlbXX0gW3BhcmFtZXRlcnNdXG4gICAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gW3RyYW5zXVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdPn1cbiAgICAgKiBAbWVtYmVyb2YgTXlTcWxNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcXVlcnkoc3FsU2NyaXB0OiBzdHJpbmcsIHBhcmFtZXRlcnM/OiBhbnlbXSwgdHJhbnM/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQodHJhbnMpKSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBhd2FpdCB0aGlzLl9jb250ZXh0LmdldEJlYW4oJ21haW4nKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNxbC5xdWVyeShzcWxTY3JpcHQsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgYXdhaXQgc3FsLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiByZXNbMF0gfHwgdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgKHRyYW5zIGFzIGFueSkuY29ubi5xdWVyeShzcWxTY3JpcHQsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc1swXSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogaW5zZXJ05bCI5bGs5Y+v5Lul55u05o6l5Y+W5b6XaW5zZXJ0SWTnmoTos4fmlplcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3FsU2NyaXB0XG4gICAgICogQHBhcmFtIHthbnlbXX0gW3BhcmFtZXRlcnNdXG4gICAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gW3RyYW5zXVxuICAgICAqIEByZXR1cm5zIHsoUHJvbWlzZTx7XG4gICAgICogICAgICAgICBpbnNlcnRJZDogbnVtYmVyIHwgc3RyaW5nXG4gICAgICogICAgIH0gfCB1bmRlZmluZWQ+KX1cbiAgICAgKiBAbWVtYmVyb2YgTXlTcWxNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5zZXJ0KHNxbFNjcmlwdDogc3RyaW5nLCBwYXJhbWV0ZXJzPzogYW55W10sIHRyYW5zPzogVHJhbnNhY3Rpb24pOiBQcm9taXNlPHtcbiAgICAgICAgaW5zZXJ0SWQ6IG51bWJlciB8IHN0cmluZ1xuICAgIH0gfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgbGV0IHJlczogYW55O1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZCh0cmFucykpIHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGF3YWl0IHRoaXMuX2NvbnRleHQuZ2V0QmVhbignbWFpbicpO1xuICAgICAgICAgICAgcmVzID0gYXdhaXQgc3FsLnF1ZXJ5KHNxbFNjcmlwdCwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICBhd2FpdCBzcWwucmVsZWFzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gYXdhaXQgKHRyYW5zIGFzIGFueSkuY29ubi5xdWVyeShzcWxTY3JpcHQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNbMF0uaW5zZXJ0SWQgfHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuIDmrKHmgKflpJrph41JbnNlcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3FsU2NyaXB0XG4gICAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gW3RyYW5zXVxuICAgICAqIEBwYXJhbSB7Li4uYW55W11bXX0gcGFyYW1ldGVycyDopoFJbnNlcnTnmoTos4fmlpnmr4/mrKHkuIDlgIvpmaPliJfloZ7pgLLkvoZcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqIEBtZW1iZXJvZiBNeVNxbE1hbmdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBidWxrSW5zZXJ0KHNxbFNjcmlwdDogc3RyaW5nLCB0cmFucz86IFRyYW5zYWN0aW9uLCAuLi5wYXJhbWV0ZXJzOiBhbnlbXVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHJlczogYW55O1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZCh0cmFucykpIHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGF3YWl0IHRoaXMuX2NvbnRleHQuZ2V0QmVhbignbWFpbicpO1xuICAgICAgICAgICAgcmVzID0gYXdhaXQgc3FsLnF1ZXJ5KHNxbFNjcmlwdCwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICBhd2FpdCBzcWwucmVsZWFzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gYXdhaXQgKHRyYW5zIGFzIGFueSkuY29ubi5xdWVyeShzcWxTY3JpcHQsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMgfHwgdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuIDmrKHmgKflpJrph41JbnNlcnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcWxTY3JpcHRcbiAgICAgKiBAcGFyYW0ge2FueVtdW119IFtwYXJhbWV0ZXJzXSDopoFJbnNlcnTnmoTos4fmlpnlj6rog73kvb/nlKjkuozntq3pmaPliJdcbiAgICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9ufSBbdHJhbnNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKiBAbWVtYmVyb2YgTXlTcWxNYW5nZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYnVsa0luc2VydEFycmF5KHNxbFNjcmlwdDogc3RyaW5nLCBwYXJhbWV0ZXJzPzogYW55W11bXSwgdHJhbnM/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCByZXM6IGFueTtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQodHJhbnMpKSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBhd2FpdCB0aGlzLl9jb250ZXh0LmdldEJlYW4oJ21haW4nKTtcbiAgICAgICAgICAgIHJlcyA9IGF3YWl0IHNxbC5xdWVyeShzcWxTY3JpcHQsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgYXdhaXQgc3FsLnJlbGVhc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IGF3YWl0ICh0cmFucyBhcyBhbnkpLmNvbm4ucXVlcnkoc3FsU2NyaXB0LCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzIHx8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZW5Db2RlKHBhc3N3b3JkOiBzdHJpbmcsIGtleT86IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkS2V5ID0gXy5pc1VuZGVmaW5lZChrZXkpID8gQmFzZUNvbnN0YW50LkRCX1BBU1NXT1JEX0tFWSA6IGtleTtcbiAgICAgICAgY29uc3Qgc3FsID0gYXdhaXQgdGhpcy5fY29udGV4dC5nZXRCZWFuKCdtYWluJyk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNxbC5xdWVyeSgnU0VMRUNUIEFFU19FTkNSWVBUKD8gLCA/KSBhcyBwYXNzd29yZCcgLCBbcGFzc3dvcmQsIHBhc3N3b3JkS2V5XSk7XG4gICAgICAgIGF3YWl0IHNxbC5yZWxlYXNlKCk7XG4gICAgICAgIHJldHVybiByZXNbMF1bMF0ucGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGRlQ29kZShwYXNzd29yZDogc3RyaW5nLCBrZXk/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBwYXNzd29yZEtleSA9IF8uaXNVbmRlZmluZWQoa2V5KSA/IEJhc2VDb25zdGFudC5EQl9QQVNTV09SRF9LRVkgOiBrZXk7XG4gICAgICAgIGNvbnN0IHNxbCA9IGF3YWl0IHRoaXMuX2NvbnRleHQuZ2V0QmVhbignbWFpbicpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNxbC5xdWVyeSgnU0VMRUNUIENBU1QoQUVTX0RFQ1JZUFQoPyAsID8pIEFTIENIQVIoMjAwKSBhcyBwYXNzd29yZCcgLCBbcGFzc3dvcmQsIHBhc3N3b3JkS2V5XSk7XG4gICAgICAgIGF3YWl0IHNxbC5yZWxlYXNlKCk7XG4gICAgICAgIHJldHVybiByZXNbMF1bMF0ucGFzc3dvcmQ7XG4gICAgfVxufVxuIl19