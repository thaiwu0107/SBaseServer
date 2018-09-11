import { BaseEntity, BaseUtils } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import { Constant } from '../config/enum.constant';
import { HttpStatusCode } from '../config/enum.http';
import Exceptions from '../models/Exceptions';
import Success from '../models/Success';

export default class Utils extends BaseUtils {
    public static modifyHistoryLog(
        logType: Constant.MS_MODIFY_HISORY_LOG_TYPE_ADD | Constant.MS_MODIFY_HISORY_LOG_TYPE_MODIFY,
        title: string, obj: BaseEntity | object) {
        const titleString = logType === Constant.MS_MODIFY_HISORY_LOG_TYPE_ADD ? title + ':Add' : title + ':Modify';
        const toObj = (obj instanceof BaseEntity) ? obj.toJSON() : obj;
        let objString: string = titleString;
        _.mapKeys(toObj, (v, k) => {
            objString += ', ' + _.toString(k) + ':' + _.toString(v);
            return {};
        });
        return objString;
    }
    public static resultWarn(msg: string, statusCode: HttpStatusCode = HttpStatusCode.PORCEDURE_WARN) {
        throw new Exceptions(statusCode, msg);
    }
    public static resultSuccess(msg: string, statusCode: HttpStatusCode = HttpStatusCode.STATUS_OK) {
        return new Success(statusCode, msg);
    }
    public static resultWarns(iResult: number | string, ...exceptionsList: Array<{
        ResultCode: number,
        Msg: any,
        Success: boolean,
        StatusCode?: HttpStatusCode | any
    }>) {
        const index = _.findIndex(exceptionsList, (find) => {
            return find.ResultCode === iResult;
        });
        if (index === -1) {
            throw new Exceptions(HttpStatusCode.STATUS_FAIL, 'Undefined Error');
        }
        const exception = exceptionsList[index];
        if (exception.Success) {
            return this.resultSuccess(exception.Msg, exception.StatusCode);
        } else {
            return this.resultWarn(exception.Msg, exception.StatusCode);
        }
    }
    public static Warn(
        iResultCode: number | string,
        sMsg: string,
        statusCode: HttpStatusCode = HttpStatusCode.PORCEDURE_WARN) {
        return _.omitBy({
            ResultCode: iResultCode,
            Msg: sMsg,
            StatusCode: statusCode,
            Success: false
        }, _.isUndefined) as {
                ResultCode: number,
                Msg: string,
                Success: boolean,
                StatusCode?: HttpStatusCode
            };
    }
    public static Success(
        iResultCode: number | string,
        sMsg: string,
        statusCode: HttpStatusCode = HttpStatusCode.STATUS_OK) {
        return _.omitBy({
            ResultCode: iResultCode,
            Msg: sMsg,
            StatusCode: statusCode,
            Success: true
        }, _.isUndefined) as {
                ResultCode: number,
                Msg: string,
                Success: boolean,
                StatusCode?: HttpStatusCode
            };
    }
    public static changeFlower(deskpoker) {
        switch (Math.floor(deskpoker / 20)) {
            case 0 :
                deskpoker = 'c.' + deskpoker % 20;
                break;
            case 1:
                deskpoker = 'd.' + deskpoker % 20;
                break;
            case 2:
                deskpoker = 'h.' + deskpoker % 20;
                break;
            case 3:
                deskpoker = ' s.' + deskpoker % 20;
                break;
        }
        return deskpoker;
    }
}
