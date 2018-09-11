import { expect } from 'chai';
import * as _ from 'lodash';
import { HttpStatusCode } from '../config/enum.http';
import Utils from './Utils';

describe('Utils', () => {
    let expectDone = true;
    const expected = (target?: any, message?: string) => {
        expectDone = true;
        return expect(target, message);
    };
    beforeEach(() => {
        expectDone = false;
    });
    afterEach('這個方法有寫驗證但是沒有驗證到', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(expectDone).to.equal(true);
    });
    describe('modifyHistoryLog()', () => {
        it('1.吐出Add格式', () => {
            const get = Utils.modifyHistoryLog(1, 'TEST', {
                a: 'aa', b: 1
            });
            expected(get).to.deep.equal('TEST:Add, a:aa, b:1');
        });
        it('1.吐出Modify格式', () => {
            const get = Utils.modifyHistoryLog(2, 'TEST', {
                a: 'aa', b: 1
            });
            expected(get).to.deep.equal('TEST:Modify, a:aa, b:1');
        });
    });
    describe('resultWarns()', () => {
        it('1.回傳未定義', () => {
            try {
                const get = Utils.resultWarns(
                    -1,
                    Utils.Warn(0, ''));
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('2.回傳已經定義好的結果', () => {
            try {
                const get = Utils.resultWarns(
                    2,
                    Utils.Warn(0, '0'),
                    Utils.Warn(1, '1'),
                    Utils.Warn(2, '2'),
                    Utils.Warn(3, '3'));
            } catch (error) {
                expected(error.status).to.deep.equal(HttpStatusCode.PORCEDURE_WARN);
            }
        });
    });
    describe('resultMessage()', () => {
        it('1.回傳格式', () => {
            const get = Utils.resultMessage('123');
            expected(get).to.eql({ message: '123' });
        });
    });
    describe('resultWarn()', () => {
        it('1.自定義StatusCode', () => {
            try {
                Utils.resultWarn('123', 1000);
            } catch (error) {
                expected(error.status).to.deep.equal(1000);
            }
        });
    });
    describe('resultSuccess()', () => {
        it('1.自定義StatusCode', () => {
            const get = Utils.resultSuccess('123', 1000);
            expected(get).to.eql({ message: { message: '123' }, status: 1000 });
        });
        it('2.預設StatusCode', () => {
            const get = Utils.resultSuccess('123');
            expected(get).to.eql({ message: { message: '123' }, status: HttpStatusCode.STATUS_OK });
        });
    });
});
