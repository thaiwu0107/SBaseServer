"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const crypto = require("crypto");
const findUp = require("find-up");
const _ = require("lodash");
const moment = require("moment");
const BaseConstant_1 = require("../config/BaseConstant");
const BaseHttpStatusCode_1 = require("../config/BaseHttpStatusCode");
const LibsExceptions_1 = require("../models/LibsExceptions");
class BaseUtils {
    // NOTE:一個Loop => 造array順序,一個Fun執行再執行一個Fun
    // NOTE:結果會是造array順序出來
    /* istanbul ignore next */
    static async loopSyncAsyncFun(array, asyncFun) {
        const newArray = [];
        for (const adata of array) {
            const getData = await asyncFun(adata);
            newArray.push(getData);
        }
        return newArray;
    }
    // NOTE:一個Loop => 不造array順序,所有Fun同時併發執行
    // NOTE:結果會是不造array順序出來
    /* istanbul ignore next */
    static async loopAsyncAsyncFun(array, asyncFun) {
        return Promise.all(array.map(async (aData) => {
            return asyncFun(aData);
        }));
    }
    /**
     * 尋找檔案位子
     * @static
     * @param {any} fileName 檔案名稱
     * @param {any} filedir 沒有指定就是預設'sqlTemplate/  底下'
     * @param {any} [filePath] 真實檔案位子可能為libs或是src/dist等等使用的位子
     * @returns 真正檔案的位子
     * @memberof Utils
     */
    static async getPath(fileName, filedir, filePath) {
        const toFiledir = _.isUndefined(filedir) ? 'sqlTemplate/' : filedir;
        return findUp(toFiledir + fileName, {
            cwd: _.isUndefined(filePath) ? __filename : filePath
        });
    }
    static isNumber(x) {
        return typeof x === 'number';
    }
    static isString(x) {
        return typeof x === 'string';
    }
    /**
     * 併發處理
     * @param {(Array<Promise<any>> | Array<Promise<any[]>>)} arrayPromise 可以塞一起併發的Promise
     * @returns 一起解決的(Array<Promise<any>> | Array<Promise<any[]>>)
     * @memberof Utils
     */
    /* istanbul ignore next */
    static async AsyncAll(arrayPromise) {
        return Promise.all(arrayPromise);
    }
    static BuffArrayToBase64(data) {
        return new Buffer(data, 'binary').toString('base64');
    }
    static Base64ToBuffArray(data) {
        return new Buffer(data, 'base64');
    }
    static SQLBinary(data) {
        return new Buffer(data, 'binary');
    }
    static EmptyBase64ToBuffArray() {
        return new Buffer(' ');
    }
    static EmptyBuffArrayToBase64() {
        return BaseConstant_1.BaseConstant.NO_IMAGE;
    }
    /**
     * 解析物件陣列，將物件內all value組成以空白組成字串
     * 再將上述之字串以逗號相連接
     * @param any[]
     * @returns string
     * @memberof Utils
     */
    static objToString(objs) {
        return _.join(_.map(objs, (obj) => {
            return _.join(_.values(obj), ' ');
        }), ',');
    }
    /**
     * memberId to MemberSerial And SectionSerial
     * @param string
     * @returns string
     * @memberof Utils
     */
    static MemberIdToMemberSerialAndSectionSerial(memberId) {
        if (_.size(memberId) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'MemberId Size Must to be 8');
        }
        const sMemberId = _.toString(memberId);
        const memberSerial = sMemberId.slice(-6);
        const sectionSerial = _.replace(sMemberId, memberSerial, '');
        return {
            memberSerial,
            sectionSerial
        };
    }
    /**
     * Validate string
     * @param string
     * @returns string
     * @memberof Utils
     */
    static validateString(value, paramName) {
        if (_.isUndefined(value) || _.isString(value)) {
            return value;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate number
     * @param number
     * @returns number
     * @memberof Utils
     */
    static validateNumber(value, paramName) {
        if (_.isNaN(value)) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
        else if (_.isNumber(value)) {
            return value;
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate boolean
     * @param boolean
     * @returns boolean
     * @memberof Utils
     */
    static validateBoolean(value, paramName) {
        if (_.isBoolean(value)) {
            return value;
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate Date
     * @param Date
     * @returns Date
     * @memberof Utils
     */
    static validateDate(value, paramName) {
        const momentObj = moment(value, moment.ISO_8601, true);
        if (momentObj.isValid()) {
            return momentObj.toDate();
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    static resultMessage(msg) {
        return { message: msg };
    }
    static DBTimeFormat(time) {
        return moment(time).format(BaseConstant_1.BaseConstant.DB_TIME_FORMAT);
    }
    static DateTimeFormat(time) {
        return moment(time).format(BaseConstant_1.BaseConstant.DATE_TIME_FORMAT);
    }
    static PDFTimeFormat(time) {
        return moment(time).format(BaseConstant_1.BaseConstant.PDF_TIME_FORMAT);
    }
    static BirthdayTimeFormat(time) {
        return moment(time).format(BaseConstant_1.BaseConstant.BIRTHDAY_TIME_FORMAT);
    }
    static PDFHoursTimeFormat(time) {
        return moment(time).format(BaseConstant_1.BaseConstant.PDF_HOURS_TIME_FORMAT);
    }
    static TakeFirstOrEmpty(anyThing) {
        return anyThing[0] || {};
    }
    static GetCheckSum(sASCIICardSerial) {
        const stringArray = _.map(sASCIICardSerial, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 12) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 12 size');
        }
        const iSum = _.reduce(stringArray, (sum, n) => {
            return n + sum;
        }, 0);
        const iRemainder = iSum % 10;
        return iRemainder === 0 ? 0 : (10 - iRemainder);
    }
    static toASCIICodeArray(toASCII) {
        return _.map(toASCII, (char) => {
            return char.charCodeAt(0);
        });
    }
    static toASCIICodeString(toASCII) {
        return this.JoinArray(this.toASCIICodeArray(toASCII));
    }
    static fromASCIICodeArray(fromASCII) {
        return _.map(fromASCII, (char) => {
            return String.fromCharCode(_.toSafeInteger(char));
        });
    }
    static fromASCIICodeString(fromASCII) {
        const chunkArray = _.map(_.chunk(fromASCII, 2), (pair) => {
            return this.JoinArray(pair);
        });
        return this.JoinArray(this.fromASCIICodeArray(chunkArray));
    }
    static EncryptCard(card) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, `Have To All Number In Strings(${card})`);
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const addMagic = _.toString(_.toInteger(card) + BaseConstant_1.BaseConstant.OPCARD_MAGIC_NUMBER);
        const strMagicOpCardArray = _.map(_.padStart(addMagic, 8, '0'));
        const magicArray = [
            strMagicOpCardArray[4], strMagicOpCardArray[0],
            strMagicOpCardArray[2], strMagicOpCardArray[6],
            strMagicOpCardArray[1], strMagicOpCardArray[3],
            strMagicOpCardArray[5], strMagicOpCardArray[7]
        ];
        return this.JoinArray(_.map(_.chunk(magicArray, 2), (magicPair) => {
            const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) + BaseConstant_1.BaseConstant.OPCARD_MAGIC_PAIR_NUMBER;
            const magicPairString = magicPairNumber >= 100 ?
                _.toString(magicPairNumber - 100) : _.toString(magicPairNumber);
            return _.padStart(magicPairString, 2, '0');
        }));
    }
    static DecryptCard(card) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const magicArray = [];
        _.forEach(_.chunk(card, 2), (magicPair) => {
            const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) - BaseConstant_1.BaseConstant.OPCARD_MAGIC_PAIR_NUMBER;
            const magicPairString = magicPairNumber < 0 ?
                _.toString(magicPairNumber + 100) : _.toString(magicPairNumber);
            const padStartStringArray = _.map(_.padStart(magicPairString, 2, '0'));
            magicArray.push(padStartStringArray[0]);
            magicArray.push(padStartStringArray[1]);
        });
        return _.padStart(_.toString(_.toInteger(this.JoinArray([
            magicArray[1], magicArray[4],
            magicArray[2], magicArray[5],
            magicArray[0], magicArray[6],
            magicArray[3], magicArray[7]
        ])) - BaseConstant_1.BaseConstant.OPCARD_MAGIC_NUMBER), 8, '0');
    }
    static JoinArray(anyThing) {
        return _.join(anyThing, '');
    }
    static EncryptAlgorithmCard(card) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const encryptCardString = this.EncryptCard(last8ToEncrypt);
        const aSCIICard = aSCIICodeString + encryptCardString;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    static DecryptAlgorithmCard(card) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        const decryptCardCardString = this.DecryptCard(last8ToDecrypt);
        return aSCIICodeString + decryptCardCardString;
    }
    static EncryptOriginalCard(card) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const aSCIICard = aSCIICodeString + last8ToEncrypt;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    static DecryptOriginalCard(card) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        return aSCIICodeString + last8ToDecrypt;
    }
    static getShortCardSerialPrintFormat(card, algorit = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        return BaseConstant_1.BaseConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + BaseConstant_1.BaseConstant.OPCARD_PRINTER_SHORTEND;
    }
    static getLongCardSerialPrintFormat(card, algorit = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        const magicString = BaseConstant_1.BaseConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + BaseConstant_1.BaseConstant.OPCARD_LONG_PRINTER_MAGICSTRING1;
        const magneticStripeCode = BaseConstant_1.BaseConstant.OPCARD_LONG_PRINTER_MAGICSTRING2 + encryptCard;
        const iChecksum = this.CardSerialCheckSum(magneticStripeCode);
        if (iChecksum <= 9) {
            return magicString + magneticStripeCode + _.toString(iChecksum) + BaseConstant_1.BaseConstant.OPCARD_PRINTER_AFTER9END;
        }
        else if (iChecksum === 10) {
            return magicString + magneticStripeCode + BaseConstant_1.BaseConstant.OPCARD_PRINTER_BE10END;
        }
        else if (iChecksum === 11) {
            return magicString + magneticStripeCode + BaseConstant_1.BaseConstant.OPCARD_PRINTER_BE11END;
        }
        else if (iChecksum === 12) {
            return magicString + magneticStripeCode + BaseConstant_1.BaseConstant.OPCARD_PRINTER_BE12END;
        }
        else if (iChecksum === 13) {
            return magicString + magneticStripeCode + BaseConstant_1.BaseConstant.OPCARD_PRINTER_BE13END;
        }
        else if (iChecksum === 14) {
            return magicString + magneticStripeCode + BaseConstant_1.BaseConstant.OPCARD_PRINTER_BE14END;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'Long CardSerial Print Format Fail');
        }
        // 原始的code有這個判斷,但是....目前看起來是永遠跑不到這個15
        // else if (iChecksum === 15) {
        //     return magicString + magneticStripeCode + Constant.OPCARD_PRINTER_BE15END;
        // }
    }
    static CardSerialCheckSum(card) {
        const cardArray = _.map(card);
        const takecardSize = _.size(cardArray) - 2;
        const withoutFrist2CardArray = _.takeRight(cardArray, takecardSize);
        let temp1 = cardArray[0].charCodeAt(0);
        let temp2 = cardArray[1].charCodeAt(0);
        // tslint:disable-next-line:no-bitwise
        let checksum = temp1 ^ temp2;
        _.forEach(withoutFrist2CardArray, (strChar) => {
            temp1 = checksum;
            temp2 = strChar.charCodeAt(0);
            // tslint:disable-next-line:no-bitwise
            checksum = temp1 ^ temp2;
        });
        // tslint:disable-next-line:no-bitwise
        checksum = checksum & 15;
        if (checksum === 15) {
            checksum = 0;
        }
        return checksum;
    }
    static getMagneticStripeCode(card) {
        const cardArray = _.map(card);
        const cardSize = _.size(cardArray);
        let takeCardCode;
        if (cardSize > 16) {
            takeCardCode = _.takeRight(cardArray, 15);
            takeCardCode = _.take(takeCardCode, 12);
        }
        else {
            takeCardCode = _.takeRight(cardArray, 14);
            takeCardCode = _.take(takeCardCode, 12);
        }
        return this.JoinArray(takeCardCode);
    }
    static dollarToCent(value) {
        return new bignumber_js_1.BigNumber(value).shiftedBy(2).toNumber();
    }
    static centToDollar(value) {
        return new bignumber_js_1.BigNumber(value).div(100).toNumber();
    }
    /**
     * 變數key命名use _.camelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    static deeplyToCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        }
        else if (Array.isArray(obj)) {
            return obj.map((v) => BaseUtils.deeplyToCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return Object.assign({}, r, { [_.lowerFirst(k)]: BaseUtils.deeplyToCamelCase(v) });
        }, {});
    }
    /**
     * 變數key命名use _.upperCamelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    static deeplyToUpperCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        }
        else if (Array.isArray(obj)) {
            return obj.map((v) => BaseUtils.deeplyToUpperCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return Object.assign({}, r, { [_.upperFirst(k)]: BaseUtils.deeplyToUpperCamelCase(v) });
        }, {});
    }
    /**
     * 使用AES_128_ECB 加密
     * @static
     * @param {string} data 要加密的資料 只能string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 加密後的string
     * @memberOf Utils
     */
    static Encryption_AES_ECB_128(data, ecbKey = BaseConstant_1.BaseConstant.AES_128_ECB_KEY) {
        const cipherChunks = [];
        const cipher = crypto.createCipheriv(BaseConstant_1.BaseConstant.AES_CIPHER, new Buffer(ecbKey), BaseConstant_1.BaseConstant.AES_CIPHER_IV);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, BaseConstant_1.BaseConstant.AES_CLEAR_ENCODING, BaseConstant_1.BaseConstant.AES_CIPHER_ENCODING));
        cipherChunks.push(cipher.final(BaseConstant_1.BaseConstant.AES_CIPHER_ENCODING));
        return cipherChunks.join('').toUpperCase();
    }
    /**
     * 使用AES_128_ECB 解密
     * @static
     * @param {string} data 要解密的資料 string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 解密後的string
     * @memberOf Utils
     */
    static Decryption_AES_ECB_128(data, ecbKey = BaseConstant_1.BaseConstant.AES_128_ECB_KEY) {
        const cipherChunks = [];
        const decipher = crypto.createDecipheriv(BaseConstant_1.BaseConstant.AES_CIPHER, new Buffer(ecbKey), BaseConstant_1.BaseConstant.AES_CIPHER_IV);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, BaseConstant_1.BaseConstant.AES_CIPHER_ENCODING, BaseConstant_1.BaseConstant.AES_CLEAR_ENCODING));
        cipherChunks.push(decipher.final(BaseConstant_1.BaseConstant.AES_CLEAR_ENCODING));
        return cipherChunks.join('');
    }
    /**
     * 判斷是偶數還是奇數
     * @static
     * @param {number} 需要整數
     * @returns
     * @memberOf Utils
     */
    static checkNumber(value) {
        if (!Number.isInteger(value)) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'checkNumber() must have to integer');
        }
        return (value & 1) === 0;
    }
    /**
     * Count occurrences of a value in array
     * 取出數組中指定的數值,重複的次數
     * @static
     * @param {number[]} 數字陣列
     * @param {number} 數字
     * @returns
     * @memberOf Utils
     */
    static countOccurrences(arr, value) {
        return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
    }
    /**
     * 計算陣列內的純數組最後轉換成BigNumber
     * 本來是直接使用reduce
     * 但是既然是封裝過後的方式就採用最原始快速的for來計算
     * 測試用例有使用一個300萬的純數組來測試
     * 純數字不用隱式轉型下reduce比較快
     * 要隱式轉型原始for比較快
     * @static
     * @param {(number[] | string[] | BigNumber[])} array
     * @returns {BigNumber}
     * @memberof Utils
     */
    static addArray(array) {
        let final = new bignumber_js_1.BigNumber(0);
        for (let n of array) {
            n = new bignumber_js_1.BigNumber(n);
            final = final.plus(n.isNaN() ? 0 : n);
        }
        return final;
    }
    /**
     * 這個是做reduce的方式來達到跟addArray裡面for一樣的成果
     * 在單元測試的時候可以看到差異
     * 另外在array.reduce的接口上不能允許string to number的陣列
     * 另外在空間上的寫法上必須new兩次BigNumber也會導致空間的浪費
     * 引發不必要的GC影響效能
     * 純數字不用隱式轉型下reduce比較快
     * 要隱式轉型原始for比較快
     * @static
     * @param {(number[] | string[] | BigNumber[])} array
     * @returns {BigNumber}
     * @memberof Utils
     */
    static addArrayReduce(array) {
        return array.reduce((pre, cur) => {
            return new bignumber_js_1.BigNumber(pre).plus(new bignumber_js_1.BigNumber(cur).isNaN() ? 0 : cur);
        }, new bignumber_js_1.BigNumber(0));
    }
    /**
     * 這個方法主要是取出一個物件陣列內指定的field來做加總
     * @param array
     * @param field
     * @returns {BigNumber}
     */
    static addThisField(array, field) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
        }
        return this.addArray(_.map(array, field));
    }
    /**
     * 這個方法是為了要做到一個物件陣列裡面
     * 把這個物件的field1 x field2 最後在把這個相乘後的數字相加
     * @static
     * @param {any[]} array
     * @param {string} field1
     * @param {string} field2
     * @returns {BigNumber}
     * @memberof Utils
     */
    static addThisField1xField2(array, field1, field2) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
        }
        return this.addArray(_.map(array, (aData) => {
            const nField1 = _.toNumber(aData[field1]);
            const nField2 = _.toNumber(aData[field2]);
            return new bignumber_js_1.BigNumber(_.isNaN(nField1) ? 0 : nField1).times(_.isNaN(nField2) ? 0 : nField2);
        }));
    }
    /**
     * 這個方法是為了自動取出一個物件陣列內符合條件的物件
     * 重組這個陣列再取出想要計算加總的field
     * @static
     * @param {any[]} array
     * @param {*} filterCondition
     * @param {string} field
     * @returns {BigNumber}
     * @memberof Utils
     */
    static addThisFieldAutoFilter(array, filterCondition, field) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
        }
        return this.addThisField(_.filter(array, filterCondition), field);
    }
    /**
     * 這個方法是為了自動取出一個物件陣列內符合條件的物件
     * 重組這個陣列再取出每個物件內field1 x field2
     * 再返回新的相乘過的純數組最後再把相乘的數組加總
     * @static
     * @param {any[]} array
     * @param {*} filterCondition
     * @param {string} field1
     * @param {string} field2
     * @returns {BigNumber}
     * @memberof Utils
     */
    static addField1xField2AutoFilter(array, filterCondition, field1, field2) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
        }
        return this.addThisField1xField2(_.filter(array, filterCondition), field1, field2);
    }
    /**
     * 這個方法主要是要產生新的Object
     * 兩個陣列長度要一樣不然會報錯
     * 最後產出的Object會把Undefined對應的成員剔除掉
     * keys: ['a', 'b', 'c', 'd']
     * values: [1, 'ff', 2, Undefined]
     * returns: {a: 1, b: 'ff', c: 2}
     * 本來  d: Undefined  這個屬性會被剃除掉
     * @param {(string | string[])} keys 這裡是keys的陣列
     * @param {(any | any[])} values 這裡是values的陣列
     * @returns {Object | any}
     * @memberof BaseUtils
     */
    static TwoArrayToObj(keys, values) {
        if (_.size(keys) !== _.size(values)) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'BaseUtils.TwoArrayToObj() keys and values size not equal');
        }
        return _.omitBy(_.zipObject(keys, values), _.isUndefined);
    }
    /**
     * 這個方法主要是要產生新的Object
     * array: [['a', 1], ['b', 2], ['c', Undefined], ['d', 'ff']]
     * returns: {a: 1, b: 2, c: Undefined, d: 'ff'}
     * @param array 這個array 需要每個組都是一個對應的陣列組
     * @returns {Object | any}
     * @memberof BaseUtils
     */
    static OneArrayToObj(array) {
        return _.fromPairs(array);
    }
    /**
     * 這個方法主要是產生新票的時候要給的對應數字
     * @static
     * @param {number} ticketValidationId
     * @param {number} ticketSeedSeqNum
     * @returns {string} 產生完的數字
     * @memberof BaseUtils
     */
    static getTicketSEValidNum(ticketValidationId, ticketSeedSeqNum) {
        if (!Number.isInteger(ticketValidationId) || !Number.isInteger(ticketSeedSeqNum)) {
            throw new LibsExceptions_1.LibsExceptions(BaseHttpStatusCode_1.BaseHttpStatusCode.STATUS_FAIL, 'BaseUtils.geTicketSEValidNum() ticketValidationId || ticketSeedSeqNum have to be Integer');
        }
        const _EGMValidIDBuffer = Buffer.allocUnsafe(4).fill(0);
        const currentSeqNumBuffer = Buffer.allocUnsafe(4).fill(0);
        _EGMValidIDBuffer.writeInt32LE(ticketValidationId, 0);
        currentSeqNumBuffer.writeInt32LE(ticketSeedSeqNum, 0);
        const buffArray = [];
        // [0][0], [0][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            _EGMValidIDBuffer[1] ^ currentSeqNumBuffer[0],
            _EGMValidIDBuffer[2] ^ currentSeqNumBuffer[1]
        ]), 0));
        // [1][0], [1][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            currentSeqNumBuffer[2] ^ currentSeqNumBuffer[0],
            _EGMValidIDBuffer[0] ^ currentSeqNumBuffer[1]
        ]), 0));
        // [2][0], [2][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            currentSeqNumBuffer[0],
            currentSeqNumBuffer[1]
        ]), 0));
        let intByteBuffer = Buffer.from([0, buffArray[0][0], buffArray[0][1], buffArray[1][0]]);
        let temp4 = this.decimalDigits(intByteBuffer.readInt32BE(0));
        intByteBuffer = Buffer.from([0, buffArray[1][1], buffArray[2][0], buffArray[2][1]]);
        temp4 = temp4.concat(this.decimalDigits(intByteBuffer.readInt32BE(0)));
        let sum1 = 0;
        let sum2 = 0;
        for (let i1 = 0, i2 = 8; i1 < 8; i1++, i2++) {
            sum1 += temp4[i1];
            sum2 += temp4[i2];
        }
        temp4[0] |= sum1 % 5 << 1;
        temp4[8] |= sum2 % 5 << 1;
        return temp4.reduce((previousValue, currentValue, index, array) => {
            return previousValue + currentValue.toString();
        }, '00');
    }
    static decimalDigits(n) {
        const digits = [];
        for (let i = 7; i >= 0; i--) {
            if (n > 0) {
                digits[i] = n % 10;
                n = Math.floor(n / 10);
            }
            else {
                digits[i] = 0;
            }
        }
        return digits;
    }
    static computeCRC16CCITT(bytesBuffer, seed) {
        const CRC_KEY1 = 0o17;
        const CRC_KEY2 = 0o10201;
        let c = seed;
        let q = seed;
        let crcValue = seed;
        const result = Buffer.allocUnsafe(2).fill(0);
        for (let i = 0, l = bytesBuffer.length; i < l; i++) {
            c = bytesBuffer[i];
            q = (crcValue ^ c) & CRC_KEY1;
            crcValue = (crcValue >> 4) ^ (q * CRC_KEY2);
            q = (crcValue ^ (c >> 4)) & CRC_KEY1;
            crcValue = (crcValue >> 4) ^ (q * CRC_KEY2);
        }
        result.writeUInt16BE(crcValue, 0);
        return result;
    }
    /**
     * Pack an array to an Object
     *
     * @param {array} array
     * @return {object}
     * @example
     * ```js
     * > packObject(['a', 'b', 'c', 'd'])
     * { a: 'b', c: 'd' }
     * ```
     */
    static packObject(array) {
        const result = {};
        const length = array.length;
        for (let i = 1; i < length; i += 2) {
            result[array[i - 1]] = array[i];
        }
        return result;
    }
    /**
     * Convert an object to an array
     *
     * @param {object} obj
     * @return {array}
     * @example
     * ```js
     * > convertObjectToArray({ a: '1' })
     * ['a', '1']
     * ```
     */
    static convertObjectToArray(obj) {
        const result = [];
        const keys = Object.keys(obj);
        for (let i = 0, l = keys.length; i < l; i++) {
            result.push(keys[i], obj[keys[i]]);
        }
        return result;
    }
    /**
     * Convert a map to an array
     *
     * @param {Map} map
     * @return {array}
     * @example
     * ```js
     * > convertObjectToArray(new Map([[1, '2']]))
     * [1, '2']
     * ```
     */
    static convertMapToArray(map) {
        const result = [];
        let pos = 0;
        map.forEach((value, key) => {
            result[pos] = key;
            result[pos + 1] = value;
            pos += 2;
        });
        return result;
    }
}
exports.default = BaseUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsidXRpbHMvQmFzZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXlDO0FBQ3pDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyx5REFBc0Q7QUFDdEQscUVBQWtFO0FBRWxFLDZEQUEwRDtBQVUxRCxNQUFxQixTQUFTO0lBQzFCLDBDQUEwQztJQUMxQyxzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUksS0FBWSxFQUFFLFFBQVc7UUFDN0QsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0QsdUNBQXVDO0lBQ3ZDLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBSSxLQUFZLEVBQUUsUUFBVztRQUM5RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDekMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFRLEVBQUUsUUFBUztRQUNyRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMs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Q0FBQztJQUNsQixDQUFDO0NBQ0o7QUF0d0JELDRCQXN3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgKiBhcyBmaW5kVXAgZnJvbSAnZmluZC11cCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEJhc2VDb25zdGFudCB9IGZyb20gJy4uL2NvbmZpZy9CYXNlQ29uc3RhbnQnO1xuaW1wb3J0IHsgQmFzZUh0dHBTdGF0dXNDb2RlIH0gZnJvbSAnLi4vY29uZmlnL0Jhc2VIdHRwU3RhdHVzQ29kZSc7XG5pbXBvcnQgeyBJU3RyaW5nIH0gZnJvbSAnLi4vbW9kZWxzL0lCYXNlQ29udGV4dCc7XG5pbXBvcnQgeyBMaWJzRXhjZXB0aW9ucyB9IGZyb20gJy4uL21vZGVscy9MaWJzRXhjZXB0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEYgPSAoZGF0YTogYW55KSA9PiBhbnk7XG5leHBvcnQgdHlwZSBBID0gYW55W10gfCBhbnk7XG5pbnRlcmZhY2UgSUNsYXNzIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbi4gRnVuY3Rpb24gbmFtZXMgYXJlIHJlYWQtb25seSBhbmQgY2FuIG5vdCBiZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VVdGlscyB7XG4gICAgLy8gTk9URTrkuIDlgItMb29wID0+IOmAoGFycmF56aCG5bqPLOS4gOWAi0Z1buWft+ihjOWGjeWft+ihjOS4gOWAi0Z1blxuICAgIC8vIE5PVEU657WQ5p6c5pyD5piv6YCgYXJyYXnpoIbluo/lh7rkvoZcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9vcFN5bmNBc3luY0Z1bjxUPihhcnJheTogYW55W10sIGFzeW5jRnVuOiBGKTogUHJvbWlzZTxUW10+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyYXk6IFRbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFkYXRhIG9mIGFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCBnZXREYXRhID0gYXdhaXQgYXN5bmNGdW4oYWRhdGEpO1xuICAgICAgICAgICAgbmV3QXJyYXkucHVzaChnZXREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfVxuICAgIC8vIE5PVEU65LiA5YCLTG9vcCA9PiDkuI3pgKBhcnJheemghuW6jyzmiYDmnIlGdW7lkIzmmYLkvbXnmbzln7fooYxcbiAgICAvLyBOT1RFOue1kOaenOacg+aYr+S4jemAoGFycmF56aCG5bqP5Ye65L6GXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvb3BBc3luY0FzeW5jRnVuPFQ+KGFycmF5OiBhbnlbXSwgYXN5bmNGdW46IEYpOiBQcm9taXNlPFRbXT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyYXkubWFwKGFzeW5jIChhRGF0YSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jRnVuKGFEYXRhKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwi+aJvuaqlOahiOS9jeWtkFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueX0gZmlsZU5hbWUg5qqU5qGI5ZCN56ixXG4gICAgICogQHBhcmFtIHthbnl9IGZpbGVkaXIg5rKS5pyJ5oyH5a6a5bCx5piv6aCQ6KitJ3NxbFRlbXBsYXRlLyAg5bqV5LiLJ1xuICAgICAqIEBwYXJhbSB7YW55fSBbZmlsZVBhdGhdIOecn+WvpuaqlOahiOS9jeWtkOWPr+iDveeCumxpYnPmiJbmmK9zcmMvZGlzdOetieetieS9v+eUqOeahOS9jeWtkFxuICAgICAqIEByZXR1cm5zIOecn+ato+aqlOahiOeahOS9jeWtkFxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0UGF0aChmaWxlTmFtZSwgZmlsZWRpcj8sIGZpbGVQYXRoPykge1xuICAgICAgICBjb25zdCB0b0ZpbGVkaXIgPSBfLmlzVW5kZWZpbmVkKGZpbGVkaXIpID8gJ3NxbFRlbXBsYXRlLycgOiBmaWxlZGlyO1xuICAgICAgICByZXR1cm4gZmluZFVwKHRvRmlsZWRpciArIGZpbGVOYW1lLCB7XG4gICAgICAgICAgICBjd2Q6IF8uaXNVbmRlZmluZWQoZmlsZVBhdGgpID8gX19maWxlbmFtZSA6IGZpbGVQYXRoXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGlzTnVtYmVyKHg6IGFueSk6IHggaXMgbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnbnVtYmVyJztcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBpc1N0cmluZyh4OiBhbnkpOiB4IGlzIHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS9teeZvOiZleeQhlxuICAgICAqIEBwYXJhbSB7KEFycmF5PFByb21pc2U8YW55Pj4gfCBBcnJheTxQcm9taXNlPGFueVtdPj4pfSBhcnJheVByb21pc2Ug5Y+v5Lul5aGe5LiA6LW35L2155m855qEUHJvbWlzZVxuICAgICAqIEByZXR1cm5zIOS4gOi1t+ino+axuueahChBcnJheTxQcm9taXNlPGFueT4+IHwgQXJyYXk8UHJvbWlzZTxhbnlbXT4+KVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBBc3luY0FsbChhcnJheVByb21pc2U6IEFycmF5PFByb21pc2U8QT4+KTogUHJvbWlzZTxBPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJheVByb21pc2UpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEJ1ZmZBcnJheVRvQmFzZTY0KGRhdGE6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihkYXRhLCAnYmluYXJ5JykudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEJhc2U2NFRvQnVmZkFycmF5KGRhdGE6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihkYXRhLCAnYmFzZTY0Jyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgU1FMQmluYXJ5KGRhdGE6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihkYXRhLCAnYmluYXJ5Jyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRW1wdHlCYXNlNjRUb0J1ZmZBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoJyAnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBFbXB0eUJ1ZmZBcnJheVRvQmFzZTY0KCkge1xuICAgICAgICByZXR1cm4gQmFzZUNvbnN0YW50Lk5PX0lNQUdFO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDop6PmnpDnianku7bpmaPliJfvvIzlsIfnianku7blhadhbGwgdmFsdWXntYTmiJDku6Xnqbrnmb3ntYTmiJDlrZfkuLJcbiAgICAgKiDlho3lsIfkuIrov7DkuYvlrZfkuLLku6XpgJfomZ/nm7jpgKPmjqVcbiAgICAgKiBAcGFyYW0gYW55W11cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG9ialRvU3RyaW5nKG9ianM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBfLmpvaW4oXy5tYXAob2JqcywgKG9iajogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXy5qb2luKF8udmFsdWVzKG9iaiksICcgJyk7XG4gICAgICAgIH0pLCAnLCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBtZW1iZXJJZCB0byBNZW1iZXJTZXJpYWwgQW5kIFNlY3Rpb25TZXJpYWxcbiAgICAgKiBAcGFyYW0gc3RyaW5nXG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBNZW1iZXJJZFRvTWVtYmVyU2VyaWFsQW5kU2VjdGlvblNlcmlhbChtZW1iZXJJZDogSVN0cmluZyB8IHN0cmluZykge1xuICAgICAgICBpZiAoXy5zaXplKG1lbWJlcklkKSAhPT0gOCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ01lbWJlcklkIFNpemUgTXVzdCB0byBiZSA4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc01lbWJlcklkID0gXy50b1N0cmluZyhtZW1iZXJJZCk7XG4gICAgICAgIGNvbnN0IG1lbWJlclNlcmlhbCA9IHNNZW1iZXJJZC5zbGljZSgtNik7XG4gICAgICAgIGNvbnN0IHNlY3Rpb25TZXJpYWwgPSBfLnJlcGxhY2Uoc01lbWJlcklkLCBtZW1iZXJTZXJpYWwsICcnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1lbWJlclNlcmlhbCxcbiAgICAgICAgICAgIHNlY3Rpb25TZXJpYWxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgc3RyaW5nXG4gICAgICogQHBhcmFtIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIHN0cmluZ1xuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdmFsaWRhdGVTdHJpbmcodmFsdWU6IGFueSwgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQodmFsdWUpIHx8IF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgYW55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIDogZGF0YSBmb3JtYXQgZXJyb3IsIGZpZWxkOiAnICsgcGFyYW1OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBudW1iZXJcbiAgICAgKiBAcGFyYW0gbnVtYmVyXG4gICAgICogQHJldHVybnMgbnVtYmVyXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZU51bWJlcih2YWx1ZTogYW55LCBwYXJhbU5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoXy5pc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIHBhcmFtTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIDogZGF0YSBmb3JtYXQgZXJyb3IsIGZpZWxkOiAnICsgcGFyYW1OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBib29sZWFuXG4gICAgICogQHBhcmFtIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZUJvb2xlYW4odmFsdWU6IGFueSwgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKF8uaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIERhdGVcbiAgICAgKiBAcGFyYW0gRGF0ZVxuICAgICAqIEByZXR1cm5zIERhdGVcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbGlkYXRlRGF0ZSh2YWx1ZTogYW55LCBwYXJhbU5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBtb21lbnRPYmogPSBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdHJ1ZSk7XG4gICAgICAgIGlmIChtb21lbnRPYmouaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50T2JqLnRvRGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIHBhcmFtTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyByZXN1bHRNZXNzYWdlKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IG1zZyB9O1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIERCVGltZUZvcm1hdCh0aW1lOiBEYXRlIHwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuZm9ybWF0KEJhc2VDb25zdGFudC5EQl9USU1FX0ZPUk1BVCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVRpbWVGb3JtYXQodGltZTogRGF0ZSB8IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZvcm1hdChCYXNlQ29uc3RhbnQuREFURV9USU1FX0ZPUk1BVCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgUERGVGltZUZvcm1hdCh0aW1lOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuZm9ybWF0KEJhc2VDb25zdGFudC5QREZfVElNRV9GT1JNQVQpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEJpcnRoZGF5VGltZUZvcm1hdCh0aW1lOiBEYXRlIHwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuZm9ybWF0KEJhc2VDb25zdGFudC5CSVJUSERBWV9USU1FX0ZPUk1BVCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgUERGSG91cnNUaW1lRm9ybWF0KHRpbWU6IERhdGUgfCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoQmFzZUNvbnN0YW50LlBERl9IT1VSU19USU1FX0ZPUk1BVCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgVGFrZUZpcnN0T3JFbXB0eShhbnlUaGluZzogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIGFueVRoaW5nWzBdIHx8IHt9O1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEdldENoZWNrU3VtKHNBU0NJSUNhcmRTZXJpYWw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzdHJpbmdBcnJheSA9IF8ubWFwKHNBU0NJSUNhcmRTZXJpYWwsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhTnVtYmVyID0gXy50b051bWJlcihkYXRhKTtcbiAgICAgICAgICAgIGlmICghXy5pc05hTihhTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhTnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0hhdmUgVG8gQWxsIE51bWJlciBJbiBTdHJpbmdzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoXy5zaXplKHN0cmluZ0FycmF5KSAhPT0gMTIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdIYXZlIFRvIEVxdWFsIDEyIHNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpU3VtID0gXy5yZWR1Y2Uoc3RyaW5nQXJyYXksIChzdW0sIG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuICsgc3VtO1xuICAgICAgICB9LCAwKTtcbiAgICAgICAgY29uc3QgaVJlbWFpbmRlciA9IGlTdW0gJSAxMDtcbiAgICAgICAgcmV0dXJuIGlSZW1haW5kZXIgPT09IDAgPyAwIDogKDEwIC0gaVJlbWFpbmRlcik7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgdG9BU0NJSUNvZGVBcnJheSh0b0FTQ0lJOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRvQVNDSUksIChjaGFyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyB0b0FTQ0lJQ29kZVN0cmluZyh0b0FTQ0lJOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuSm9pbkFycmF5KHRoaXMudG9BU0NJSUNvZGVBcnJheSh0b0FTQ0lJKSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFTQ0lJQ29kZUFycmF5KGZyb21BU0NJSTogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKGZyb21BU0NJSSwgKGNoYXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXy50b1NhZmVJbnRlZ2VyKGNoYXIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFTQ0lJQ29kZVN0cmluZyhmcm9tQVNDSUk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaHVua0FycmF5ID0gXy5tYXAoXy5jaHVuayhmcm9tQVNDSUksIDIpLCAocGFpcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSm9pbkFycmF5KHBhaXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSm9pbkFycmF5KHRoaXMuZnJvbUFTQ0lJQ29kZUFycmF5KGNodW5rQXJyYXkpKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBFbmNyeXB0Q2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nQXJyYXkgPSBfLm1hcChjYXJkLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYU51bWJlciA9IF8udG9OdW1iZXIoZGF0YSk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOYU4oYU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYU51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsIGBIYXZlIFRvIEFsbCBOdW1iZXIgSW4gU3RyaW5ncygke2NhcmR9KWApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF8uc2l6ZShzdHJpbmdBcnJheSkgIT09IDgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdIYXZlIFRvIEVxdWFsIDggc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFkZE1hZ2ljID0gXy50b1N0cmluZyhfLnRvSW50ZWdlcihjYXJkKSArIEJhc2VDb25zdGFudC5PUENBUkRfTUFHSUNfTlVNQkVSKTtcbiAgICAgICAgY29uc3Qgc3RyTWFnaWNPcENhcmRBcnJheSA9IF8ubWFwKF8ucGFkU3RhcnQoYWRkTWFnaWMsIDgsICcwJykpO1xuICAgICAgICBjb25zdCBtYWdpY0FycmF5ID0gW1xuICAgICAgICAgICAgc3RyTWFnaWNPcENhcmRBcnJheVs0XSwgc3RyTWFnaWNPcENhcmRBcnJheVswXSxcbiAgICAgICAgICAgIHN0ck1hZ2ljT3BDYXJkQXJyYXlbMl0sIHN0ck1hZ2ljT3BDYXJkQXJyYXlbNl0sXG4gICAgICAgICAgICBzdHJNYWdpY09wQ2FyZEFycmF5WzFdLCBzdHJNYWdpY09wQ2FyZEFycmF5WzNdLFxuICAgICAgICAgICAgc3RyTWFnaWNPcENhcmRBcnJheVs1XSwgc3RyTWFnaWNPcENhcmRBcnJheVs3XVxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLkpvaW5BcnJheShcbiAgICAgICAgICAgIF8ubWFwKF8uY2h1bmsobWFnaWNBcnJheSwgMiksIChtYWdpY1BhaXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYWdpY1BhaXJOdW1iZXIgPSBfLnRvSW50ZWdlcih0aGlzLkpvaW5BcnJheShtYWdpY1BhaXIpKSArIEJhc2VDb25zdGFudC5PUENBUkRfTUFHSUNfUEFJUl9OVU1CRVI7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFnaWNQYWlyU3RyaW5nID0gbWFnaWNQYWlyTnVtYmVyID49IDEwMCA/XG4gICAgICAgICAgICAgICAgICAgIF8udG9TdHJpbmcobWFnaWNQYWlyTnVtYmVyIC0gMTAwKSA6IF8udG9TdHJpbmcobWFnaWNQYWlyTnVtYmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5wYWRTdGFydChtYWdpY1BhaXJTdHJpbmcsIDIsICcwJyk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdENhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ0FycmF5ID0gXy5tYXAoY2FyZCwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFOdW1iZXIgPSBfLnRvTnVtYmVyKGRhdGEpO1xuICAgICAgICAgICAgaWYgKCFfLmlzTmFOKGFOdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnSGF2ZSBUbyBBbGwgTnVtYmVyIEluIFN0cmluZ3MnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChfLnNpemUoc3RyaW5nQXJyYXkpICE9PSA4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnSGF2ZSBUbyBFcXVhbCA4IHNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYWdpY0FycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBfLmZvckVhY2goXy5jaHVuayhjYXJkLCAyKSwgKG1hZ2ljUGFpcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFnaWNQYWlyTnVtYmVyID0gXy50b0ludGVnZXIodGhpcy5Kb2luQXJyYXkobWFnaWNQYWlyKSkgLSBCYXNlQ29uc3RhbnQuT1BDQVJEX01BR0lDX1BBSVJfTlVNQkVSO1xuICAgICAgICAgICAgY29uc3QgbWFnaWNQYWlyU3RyaW5nID0gbWFnaWNQYWlyTnVtYmVyIDwgMCA/XG4gICAgICAgICAgICAgICAgXy50b1N0cmluZyhtYWdpY1BhaXJOdW1iZXIgKyAxMDApIDogXy50b1N0cmluZyhtYWdpY1BhaXJOdW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgcGFkU3RhcnRTdHJpbmdBcnJheSA9IF8ubWFwKF8ucGFkU3RhcnQobWFnaWNQYWlyU3RyaW5nLCAyLCAnMCcpKTtcbiAgICAgICAgICAgIG1hZ2ljQXJyYXkucHVzaChwYWRTdGFydFN0cmluZ0FycmF5WzBdKTtcbiAgICAgICAgICAgIG1hZ2ljQXJyYXkucHVzaChwYWRTdGFydFN0cmluZ0FycmF5WzFdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfLnBhZFN0YXJ0KF8udG9TdHJpbmcoXy50b0ludGVnZXIodGhpcy5Kb2luQXJyYXkoW1xuICAgICAgICAgICAgbWFnaWNBcnJheVsxXSwgbWFnaWNBcnJheVs0XSxcbiAgICAgICAgICAgIG1hZ2ljQXJyYXlbMl0sIG1hZ2ljQXJyYXlbNV0sXG4gICAgICAgICAgICBtYWdpY0FycmF5WzBdLCBtYWdpY0FycmF5WzZdLFxuICAgICAgICAgICAgbWFnaWNBcnJheVszXSwgbWFnaWNBcnJheVs3XVxuICAgICAgICBdKSkgLSBCYXNlQ29uc3RhbnQuT1BDQVJEX01BR0lDX05VTUJFUiksIDgsICcwJyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgSm9pbkFycmF5KGFueVRoaW5nOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gXy5qb2luKGFueVRoaW5nLCAnJyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRW5jcnlwdEFsZ29yaXRobUNhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8ubWFwKGNhcmQpO1xuICAgICAgICBjb25zdCBmaXJzdDJUb0FTQ0lJID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlKGNhcmRBcnJheSwgMikpO1xuICAgICAgICBjb25zdCBsYXN0OFRvRW5jcnlwdCA9IHRoaXMuSm9pbkFycmF5KF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgOCkpO1xuICAgICAgICBjb25zdCBhU0NJSUNvZGVTdHJpbmcgPSB0aGlzLnRvQVNDSUlDb2RlU3RyaW5nKGZpcnN0MlRvQVNDSUkpO1xuICAgICAgICBjb25zdCBlbmNyeXB0Q2FyZFN0cmluZyA9IHRoaXMuRW5jcnlwdENhcmQobGFzdDhUb0VuY3J5cHQpO1xuICAgICAgICBjb25zdCBhU0NJSUNhcmQgPSBhU0NJSUNvZGVTdHJpbmcgKyBlbmNyeXB0Q2FyZFN0cmluZztcbiAgICAgICAgY29uc3QgY2hlY2tTdW0gPSB0aGlzLkdldENoZWNrU3VtKGFTQ0lJQ2FyZCk7XG4gICAgICAgIHJldHVybiBhU0NJSUNhcmQgKyBjaGVja1N1bTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBEZWNyeXB0QWxnb3JpdGhtQ2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy50YWtlKF8ubWFwKGNhcmQpLCAxMik7XG4gICAgICAgIGNvbnN0IGZpcnN0MkZyb21BU0NJSSA9IHRoaXMuSm9pbkFycmF5KF8udGFrZShjYXJkQXJyYXksIDQpKTtcbiAgICAgICAgY29uc3QgbGFzdDhUb0RlY3J5cHQgPSB0aGlzLkpvaW5BcnJheShfLnRha2VSaWdodChjYXJkQXJyYXksIDgpKTtcbiAgICAgICAgY29uc3QgYVNDSUlDb2RlU3RyaW5nID0gdGhpcy5mcm9tQVNDSUlDb2RlU3RyaW5nKGZpcnN0MkZyb21BU0NJSSk7XG4gICAgICAgIGNvbnN0IGRlY3J5cHRDYXJkQ2FyZFN0cmluZyA9IHRoaXMuRGVjcnlwdENhcmQobGFzdDhUb0RlY3J5cHQpO1xuICAgICAgICByZXR1cm4gYVNDSUlDb2RlU3RyaW5nICsgZGVjcnlwdENhcmRDYXJkU3RyaW5nO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEVuY3J5cHRPcmlnaW5hbENhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8ubWFwKGNhcmQpO1xuICAgICAgICBjb25zdCBmaXJzdDJUb0FTQ0lJID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlKGNhcmRBcnJheSwgMikpO1xuICAgICAgICBjb25zdCBsYXN0OFRvRW5jcnlwdCA9IHRoaXMuSm9pbkFycmF5KF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgOCkpO1xuICAgICAgICBjb25zdCBhU0NJSUNvZGVTdHJpbmcgPSB0aGlzLnRvQVNDSUlDb2RlU3RyaW5nKGZpcnN0MlRvQVNDSUkpO1xuICAgICAgICBjb25zdCBhU0NJSUNhcmQgPSBhU0NJSUNvZGVTdHJpbmcgKyBsYXN0OFRvRW5jcnlwdDtcbiAgICAgICAgY29uc3QgY2hlY2tTdW0gPSB0aGlzLkdldENoZWNrU3VtKGFTQ0lJQ2FyZCk7XG4gICAgICAgIHJldHVybiBhU0NJSUNhcmQgKyBjaGVja1N1bTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBEZWNyeXB0T3JpZ2luYWxDYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLnRha2UoXy5tYXAoY2FyZCksIDEyKTtcbiAgICAgICAgY29uc3QgZmlyc3QyRnJvbUFTQ0lJID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlKGNhcmRBcnJheSwgNCkpO1xuICAgICAgICBjb25zdCBsYXN0OFRvRGVjcnlwdCA9IHRoaXMuSm9pbkFycmF5KF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgOCkpO1xuICAgICAgICBjb25zdCBhU0NJSUNvZGVTdHJpbmcgPSB0aGlzLmZyb21BU0NJSUNvZGVTdHJpbmcoZmlyc3QyRnJvbUFTQ0lJKTtcbiAgICAgICAgcmV0dXJuIGFTQ0lJQ29kZVN0cmluZyArIGxhc3Q4VG9EZWNyeXB0O1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldFNob3J0Q2FyZFNlcmlhbFByaW50Rm9ybWF0KGNhcmQ6IHN0cmluZywgYWxnb3JpdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRDYXJkID0gYWxnb3JpdCA/IHRoaXMuRW5jcnlwdEFsZ29yaXRobUNhcmQoY2FyZCkgOiB0aGlzLkVuY3J5cHRPcmlnaW5hbENhcmQoY2FyZCk7XG4gICAgICAgIHJldHVybiBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfSEVBRF9FTVBUWSArIGVuY3J5cHRDYXJkICsgQmFzZUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX1NIT1JURU5EO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldExvbmdDYXJkU2VyaWFsUHJpbnRGb3JtYXQoY2FyZDogc3RyaW5nLCBhbGdvcml0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZW5jcnlwdENhcmQgPSBhbGdvcml0ID8gdGhpcy5FbmNyeXB0QWxnb3JpdGhtQ2FyZChjYXJkKSA6IHRoaXMuRW5jcnlwdE9yaWdpbmFsQ2FyZChjYXJkKTtcbiAgICAgICAgY29uc3QgbWFnaWNTdHJpbmcgPVxuICAgICAgICAgICAgQmFzZUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0hFQURfRU1QVFkgKyBlbmNyeXB0Q2FyZCArIEJhc2VDb25zdGFudC5PUENBUkRfTE9OR19QUklOVEVSX01BR0lDU1RSSU5HMTtcbiAgICAgICAgY29uc3QgbWFnbmV0aWNTdHJpcGVDb2RlID0gQmFzZUNvbnN0YW50Lk9QQ0FSRF9MT05HX1BSSU5URVJfTUFHSUNTVFJJTkcyICsgZW5jcnlwdENhcmQ7XG4gICAgICAgIGNvbnN0IGlDaGVja3N1bSA9IHRoaXMuQ2FyZFNlcmlhbENoZWNrU3VtKG1hZ25ldGljU3RyaXBlQ29kZSk7XG4gICAgICAgIGlmIChpQ2hlY2tzdW0gPD0gOSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgXy50b1N0cmluZyhpQ2hlY2tzdW0pICsgQmFzZUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0FGVEVSOUVORDtcbiAgICAgICAgfSBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxMEVORDtcbiAgICAgICAgfSBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDExKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxMUVORDtcbiAgICAgICAgfSBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDEyKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxMkVORDtcbiAgICAgICAgfSBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDEzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxM0VORDtcbiAgICAgICAgfSBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDE0KSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxNEVORDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdMb25nIENhcmRTZXJpYWwgUHJpbnQgRm9ybWF0IEZhaWwnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDljp/lp4vnmoRjb2Rl5pyJ6YCZ5YCL5Yik5pa3LOS9huaYry4uLi7nm67liY3nnIvotbfkvobmmK/msLjpgaDot5HkuI3liLDpgJnlgIsxNVxuICAgICAgICAvLyBlbHNlIGlmIChpQ2hlY2tzdW0gPT09IDE1KSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTE1RU5EO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgQ2FyZFNlcmlhbENoZWNrU3VtKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLm1hcChjYXJkKTtcbiAgICAgICAgY29uc3QgdGFrZWNhcmRTaXplID0gXy5zaXplKGNhcmRBcnJheSkgLSAyO1xuICAgICAgICBjb25zdCB3aXRob3V0RnJpc3QyQ2FyZEFycmF5ID0gXy50YWtlUmlnaHQoY2FyZEFycmF5LCB0YWtlY2FyZFNpemUpO1xuICAgICAgICBsZXQgdGVtcDEgPSBjYXJkQXJyYXlbMF0uY2hhckNvZGVBdCgwKTtcbiAgICAgICAgbGV0IHRlbXAyID0gY2FyZEFycmF5WzFdLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gICAgICAgIGxldCBjaGVja3N1bSA9IHRlbXAxIF4gdGVtcDI7XG4gICAgICAgIF8uZm9yRWFjaCh3aXRob3V0RnJpc3QyQ2FyZEFycmF5LCAoc3RyQ2hhcikgPT4ge1xuICAgICAgICAgICAgdGVtcDEgPSBjaGVja3N1bTtcbiAgICAgICAgICAgIHRlbXAyID0gc3RyQ2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICAgICAgICAgIGNoZWNrc3VtID0gdGVtcDEgXiB0ZW1wMjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gICAgICAgIGNoZWNrc3VtID0gY2hlY2tzdW0gJiAxNTtcbiAgICAgICAgaWYgKGNoZWNrc3VtID09PSAxNSkge1xuICAgICAgICAgICAgY2hlY2tzdW0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGVja3N1bTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRNYWduZXRpY1N0cmlwZUNvZGUoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8ubWFwKGNhcmQpO1xuICAgICAgICBjb25zdCBjYXJkU2l6ZSA9IF8uc2l6ZShjYXJkQXJyYXkpO1xuICAgICAgICBsZXQgdGFrZUNhcmRDb2RlO1xuICAgICAgICBpZiAoY2FyZFNpemUgPiAxNikge1xuICAgICAgICAgICAgdGFrZUNhcmRDb2RlID0gXy50YWtlUmlnaHQoY2FyZEFycmF5LCAxNSk7XG4gICAgICAgICAgICB0YWtlQ2FyZENvZGUgPSBfLnRha2UodGFrZUNhcmRDb2RlLCAxMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWtlQ2FyZENvZGUgPSBfLnRha2VSaWdodChjYXJkQXJyYXksIDE0KTtcbiAgICAgICAgICAgIHRha2VDYXJkQ29kZSA9IF8udGFrZSh0YWtlQ2FyZENvZGUsIDEyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5Kb2luQXJyYXkodGFrZUNhcmRDb2RlKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBkb2xsYXJUb0NlbnQodmFsdWU6IG51bWJlciB8IEJpZ051bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcih2YWx1ZSkuc2hpZnRlZEJ5KDIpLnRvTnVtYmVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgY2VudFRvRG9sbGFyKHZhbHVlOiBudW1iZXIgfCBCaWdOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIodmFsdWUpLmRpdigxMDApLnRvTnVtYmVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuiuaVuGtleeWRveWQjXVzZSBfLmNhbWVsQ2FzZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAYXV0aG9yIE1pa2VsaVxuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVlcGx5VG9DYW1lbENhc2Uob2JqKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChvYmopIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLm1hcCgodikgPT4gQmFzZVV0aWxzLmRlZXBseVRvQ2FtZWxDYXNlKHYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5yZWR1Y2Uob2JqLCAociwgdiwgaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5yLFxuICAgICAgICAgICAgICAgIFtfLmxvd2VyRmlyc3QoayldOiBCYXNlVXRpbHMuZGVlcGx5VG9DYW1lbENhc2UodilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6K5pW4a2V55ZG95ZCNdXNlIF8udXBwZXJDYW1lbENhc2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnl9IG9ialxuICAgICAqIEByZXR1cm5zXG4gICAgICogQGF1dGhvciBNaWtlbGlcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRlZXBseVRvVXBwZXJDYW1lbENhc2Uob2JqKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChvYmopIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLm1hcCgodikgPT4gQmFzZVV0aWxzLmRlZXBseVRvVXBwZXJDYW1lbENhc2UodikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLnJlZHVjZShvYmosIChyLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnIsXG4gICAgICAgICAgICAgICAgW18udXBwZXJGaXJzdChrKV06IEJhc2VVdGlscy5kZWVwbHlUb1VwcGVyQ2FtZWxDYXNlKHYpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS9v+eUqEFFU18xMjhfRUNCIOWKoOWvhlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSDopoHliqDlr4bnmoTos4fmlpkg5Y+q6IO9c3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVjYktleSDpoJDoqK3mmK/miJHlgJHnmoTlr4bnorws55W254S25Y+v5Lul6Ly45YWl6Ieq5bex5oOz6KaB5L2/55So55qE5a+G56K8XG4gICAgICogQHJldHVybnMg5Yqg5a+G5b6M55qEc3RyaW5nXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBFbmNyeXB0aW9uX0FFU19FQ0JfMTI4KGRhdGE6IHN0cmluZywgZWNiS2V5OiBzdHJpbmcgPSBCYXNlQ29uc3RhbnQuQUVTXzEyOF9FQ0JfS0VZKSB7XG4gICAgICAgIGNvbnN0IGNpcGhlckNodW5rczogYW55W10gPSBbXTtcbiAgICAgICAgY29uc3QgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KFxuICAgICAgICAgICAgQmFzZUNvbnN0YW50LkFFU19DSVBIRVIsXG4gICAgICAgICAgICBuZXcgQnVmZmVyKGVjYktleSksXG4gICAgICAgICAgICBCYXNlQ29uc3RhbnQuQUVTX0NJUEhFUl9JVik7XG4gICAgICAgIGNpcGhlci5zZXRBdXRvUGFkZGluZyh0cnVlKTtcbiAgICAgICAgY2lwaGVyQ2h1bmtzLnB1c2goXG4gICAgICAgICAgICBjaXBoZXIudXBkYXRlKGRhdGEsIEJhc2VDb25zdGFudC5BRVNfQ0xFQVJfRU5DT0RJTkcsIEJhc2VDb25zdGFudC5BRVNfQ0lQSEVSX0VOQ09ESU5HKVxuICAgICAgICApO1xuICAgICAgICBjaXBoZXJDaHVua3MucHVzaChcbiAgICAgICAgICAgIGNpcGhlci5maW5hbChCYXNlQ29uc3RhbnQuQUVTX0NJUEhFUl9FTkNPRElORylcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNpcGhlckNodW5rcy5qb2luKCcnKS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkvb/nlKhBRVNfMTI4X0VDQiDop6Plr4ZcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEg6KaB6Kej5a+G55qE6LOH5paZIHN0cmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlY2JLZXkg6aCQ6Kit5piv5oiR5YCR55qE5a+G56K8LOeVtueEtuWPr+S7pei8uOWFpeiHquW3seaDs+imgeS9v+eUqOeahOWvhueivFxuICAgICAqIEByZXR1cm5zIOino+WvhuW+jOeahHN0cmluZ1xuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdGlvbl9BRVNfRUNCXzEyOChkYXRhOiBzdHJpbmcsIGVjYktleTogc3RyaW5nID0gQmFzZUNvbnN0YW50LkFFU18xMjhfRUNCX0tFWSkge1xuICAgICAgICBjb25zdCBjaXBoZXJDaHVua3M6IGFueVtdID0gW107XG4gICAgICAgIGNvbnN0IGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyaXYoXG4gICAgICAgICAgICBCYXNlQ29uc3RhbnQuQUVTX0NJUEhFUixcbiAgICAgICAgICAgIG5ldyBCdWZmZXIoZWNiS2V5KSxcbiAgICAgICAgICAgIEJhc2VDb25zdGFudC5BRVNfQ0lQSEVSX0lWKTtcbiAgICAgICAgZGVjaXBoZXIuc2V0QXV0b1BhZGRpbmcodHJ1ZSk7XG5cbiAgICAgICAgY2lwaGVyQ2h1bmtzLnB1c2goXG4gICAgICAgICAgICBkZWNpcGhlci51cGRhdGUoZGF0YSwgQmFzZUNvbnN0YW50LkFFU19DSVBIRVJfRU5DT0RJTkcsIEJhc2VDb25zdGFudC5BRVNfQ0xFQVJfRU5DT0RJTkcpXG4gICAgICAgICk7XG4gICAgICAgIGNpcGhlckNodW5rcy5wdXNoKFxuICAgICAgICAgICAgZGVjaXBoZXIuZmluYWwoQmFzZUNvbnN0YW50LkFFU19DTEVBUl9FTkNPRElORylcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNpcGhlckNodW5rcy5qb2luKCcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yik5pa35piv5YG25pW46YKE5piv5aWH5pW4XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSDpnIDopoHmlbTmlbhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tOdW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnY2hlY2tOdW1iZXIoKSBtdXN0IGhhdmUgdG8gaW50ZWdlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodmFsdWUgJiAxKSA9PT0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ291bnQgb2NjdXJyZW5jZXMgb2YgYSB2YWx1ZSBpbiBhcnJheVxuICAgICAqIOWPluWHuuaVuOe1hOS4reaMh+WumueahOaVuOWAvCzph43opIfnmoTmrKHmlbhcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0g5pW45a2X6Zmj5YiXXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IOaVuOWtl1xuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudE9jY3VycmVuY2VzKGFycjogbnVtYmVyW10sIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5yZWR1Y2UoKGEsIHYpID0+IHYgPT09IHZhbHVlID8gYSArIDEgOiBhICsgMCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOioiOeul+mZo+WIl+WFp+eahOe0lOaVuOe1hOacgOW+jOi9ieaPm+aIkEJpZ051bWJlclxuICAgICAqIOacrOS+huaYr+ebtOaOpeS9v+eUqHJlZHVjZVxuICAgICAqIOS9huaYr+aXoueEtuaYr+WwgeijnemBjuW+jOeahOaWueW8j+WwseaOoeeUqOacgOWOn+Wni+W/q+mAn+eahGZvcuS+huioiOeul1xuICAgICAqIOa4rOippueUqOS+i+acieS9v+eUqOS4gOWAizMwMOiQrOeahOe0lOaVuOe1hOS+hua4rOipplxuICAgICAqIOe0lOaVuOWtl+S4jeeUqOmaseW8j+i9ieWei+S4i3JlZHVjZeavlOi8g+W/q1xuICAgICAqIOimgemaseW8j+i9ieWei+WOn+Wni2ZvcuavlOi8g+W/q1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyhudW1iZXJbXSB8IHN0cmluZ1tdIHwgQmlnTnVtYmVyW10pfSBhcnJheVxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRBcnJheShhcnJheTogbnVtYmVyW10gfCBzdHJpbmdbXSB8IEJpZ051bWJlcltdKTogQmlnTnVtYmVyIHtcbiAgICAgICAgbGV0IGZpbmFsID0gbmV3IEJpZ051bWJlcigwKTtcbiAgICAgICAgZm9yIChsZXQgbiBvZiBhcnJheSkge1xuICAgICAgICAgICAgbiA9IG5ldyBCaWdOdW1iZXIobik7XG4gICAgICAgICAgICBmaW5hbCA9IGZpbmFsLnBsdXMobi5pc05hTigpID8gMCA6IG4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5hbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5piv5YGacmVkdWNl55qE5pa55byP5L6G6YGU5Yiw6LefYWRkQXJyYXnoo6HpnaJmb3LkuIDmqKPnmoTmiJDmnpxcbiAgICAgKiDlnKjllq7lhYPmuKzoqabnmoTmmYLlgJnlj6/ku6XnnIvliLDlt67nlbBcbiAgICAgKiDlj6blpJblnKhhcnJheS5yZWR1Y2XnmoTmjqXlj6PkuIrkuI3og73lhYHoqLFzdHJpbmcgdG8gbnVtYmVy55qE6Zmj5YiXXG4gICAgICog5Y+m5aSW5Zyo56m66ZaT5LiK55qE5a+r5rOV5LiK5b+F6aCIbmV35YWp5qyhQmlnTnVtYmVy5Lmf5pyD5bCO6Ie056m66ZaT55qE5rWq6LK7XG4gICAgICog5byV55m85LiN5b+F6KaB55qER0PlvbHpn7/mlYjog71cbiAgICAgKiDntJTmlbjlrZfkuI3nlKjpmrHlvI/ovYnlnovkuItyZWR1Y2Xmr5TovIPlv6tcbiAgICAgKiDopoHpmrHlvI/ovYnlnovljp/lp4tmb3Lmr5TovIPlv6tcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHsobnVtYmVyW10gfCBzdHJpbmdbXSB8IEJpZ051bWJlcltdKX0gYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQXJyYXlSZWR1Y2UoYXJyYXk6IGFueVtdKTogQmlnTnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LnJlZHVjZSgocHJlLCBjdXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHByZSkucGx1cyhuZXcgQmlnTnVtYmVyKGN1cikuaXNOYU4oKSA/IDAgOiBjdXIpO1xuICAgICAgICB9LCBuZXcgQmlnTnVtYmVyKDApKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5Li76KaB5piv5Y+W5Ye65LiA5YCL54mp5Lu26Zmj5YiX5YWn5oyH5a6a55qEZmllbGTkvoblgZrliqDnuL1cbiAgICAgKiBAcGFyYW0gYXJyYXlcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkVGhpc0ZpZWxkKGFycmF5OiBhbnlbXSwgZmllbGQ6IHN0cmluZyk6IEJpZ051bWJlciB7XG4gICAgICAgIGlmIChfLnNpemUoYXJyYXkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcigwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRBcnJheShfLm1hcChhcnJheSwgZmllbGQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5piv54K65LqG6KaB5YGa5Yiw5LiA5YCL54mp5Lu26Zmj5YiX6KOh6Z2iXG4gICAgICog5oqK6YCZ5YCL54mp5Lu255qEZmllbGQxIHggZmllbGQyIOacgOW+jOWcqOaKiumAmeWAi+ebuOS5mOW+jOeahOaVuOWtl+ebuOWKoFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZDFcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQyXG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZFRoaXNGaWVsZDF4RmllbGQyKGFycmF5OiBhbnlbXSwgZmllbGQxOiBzdHJpbmcsIGZpZWxkMjogc3RyaW5nKTogQmlnTnVtYmVyIHtcbiAgICAgICAgaWYgKF8uc2l6ZShhcnJheSkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFkZEFycmF5KF8ubWFwKGFycmF5LCAoYURhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbkZpZWxkMSA9IF8udG9OdW1iZXIoYURhdGFbZmllbGQxXSk7XG4gICAgICAgICAgICBjb25zdCBuRmllbGQyID0gXy50b051bWJlcihhRGF0YVtmaWVsZDJdKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKF8uaXNOYU4obkZpZWxkMSkgPyAwIDogbkZpZWxkMSkudGltZXMoXy5pc05hTihuRmllbGQyKSA/IDAgOiBuRmllbGQyKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XmmK/ngrrkuoboh6rli5Xlj5blh7rkuIDlgIvnianku7bpmaPliJflhafnrKblkIjmop3ku7bnmoTnianku7ZcbiAgICAgKiDph43ntYTpgJnlgIvpmaPliJflho3lj5blh7rmg7PopoHoqIjnrpfliqDnuL3nmoRmaWVsZFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICAgICAqIEBwYXJhbSB7Kn0gZmlsdGVyQ29uZGl0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZFRoaXNGaWVsZEF1dG9GaWx0ZXIoYXJyYXk6IGFueVtdLCBmaWx0ZXJDb25kaXRpb246IGFueSwgZmllbGQ6IHN0cmluZyk6IEJpZ051bWJlciB7XG4gICAgICAgIGlmIChfLnNpemUoYXJyYXkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcigwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRUaGlzRmllbGQoXy5maWx0ZXIoYXJyYXksIGZpbHRlckNvbmRpdGlvbiksIGZpZWxkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5piv54K65LqG6Ieq5YuV5Y+W5Ye65LiA5YCL54mp5Lu26Zmj5YiX5YWn56ym5ZCI5qKd5Lu255qE54mp5Lu2XG4gICAgICog6YeN57WE6YCZ5YCL6Zmj5YiX5YaN5Y+W5Ye65q+P5YCL54mp5Lu25YWnZmllbGQxIHggZmllbGQyXG4gICAgICog5YaN6L+U5Zue5paw55qE55u45LmY6YGO55qE57SU5pW457WE5pyA5b6M5YaN5oqK55u45LmY55qE5pW457WE5Yqg57i9XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gICAgICogQHBhcmFtIHsqfSBmaWx0ZXJDb25kaXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQxXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkMlxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRGaWVsZDF4RmllbGQyQXV0b0ZpbHRlcihcbiAgICAgICAgYXJyYXk6IGFueVtdLCBmaWx0ZXJDb25kaXRpb246IGFueSwgZmllbGQxOiBzdHJpbmcsIGZpZWxkMjogc3RyaW5nKTogQmlnTnVtYmVyIHtcbiAgICAgICAgaWYgKF8uc2l6ZShhcnJheSkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFRoaXNGaWVsZDF4RmllbGQyKF8uZmlsdGVyKGFycmF5LCBmaWx0ZXJDb25kaXRpb24pLCBmaWVsZDEsIGZpZWxkMik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleS4u+imgeaYr+imgeeUoueUn+aWsOeahE9iamVjdFxuICAgICAqIOWFqeWAi+mZo+WIl+mVt+W6puimgeS4gOaoo+S4jeeEtuacg+WgsemMr1xuICAgICAqIOacgOW+jOeUouWHuueahE9iamVjdOacg+aKilVuZGVmaW5lZOWwjeaHieeahOaIkOWToeWJlOmZpOaOiVxuICAgICAqIGtleXM6IFsnYScsICdiJywgJ2MnLCAnZCddXG4gICAgICogdmFsdWVzOiBbMSwgJ2ZmJywgMiwgVW5kZWZpbmVkXVxuICAgICAqIHJldHVybnM6IHthOiAxLCBiOiAnZmYnLCBjOiAyfVxuICAgICAqIOacrOS+hiAgZDogVW5kZWZpbmVkICDpgJnlgIvlsazmgKfmnIPooqvliYPpmaTmjolcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCBzdHJpbmdbXSl9IGtleXMg6YCZ6KOh5piva2V5c+eahOmZo+WIl1xuICAgICAqIEBwYXJhbSB7KGFueSB8IGFueVtdKX0gdmFsdWVzIOmAmeijoeaYr3ZhbHVlc+eahOmZo+WIl1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QgfCBhbnl9XG4gICAgICogQG1lbWJlcm9mIEJhc2VVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHdvQXJyYXlUb09iaihrZXlzOiBzdHJpbmcgfCBzdHJpbmdbXSwgdmFsdWVzOiBhbnkgfCBhbnlbXSk6IGFueSB7XG4gICAgICAgIGlmIChfLnNpemUoa2V5cykgIT09IF8uc2l6ZSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgICdCYXNlVXRpbHMuVHdvQXJyYXlUb09iaigpIGtleXMgYW5kIHZhbHVlcyBzaXplIG5vdCBlcXVhbCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLm9taXRCeShfLnppcE9iamVjdChrZXlzLCB2YWx1ZXMpLCBfLmlzVW5kZWZpbmVkKSBhcyBhbnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleS4u+imgeaYr+imgeeUoueUn+aWsOeahE9iamVjdFxuICAgICAqIGFycmF5OiBbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCBVbmRlZmluZWRdLCBbJ2QnLCAnZmYnXV1cbiAgICAgKiByZXR1cm5zOiB7YTogMSwgYjogMiwgYzogVW5kZWZpbmVkLCBkOiAnZmYnfVxuICAgICAqIEBwYXJhbSBhcnJheSDpgJnlgIthcnJheSDpnIDopoHmr4/lgIvntYTpg73mmK/kuIDlgIvlsI3mh4nnmoTpmaPliJfntYRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0IHwgYW55fVxuICAgICAqIEBtZW1iZXJvZiBCYXNlVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE9uZUFycmF5VG9PYmooYXJyYXk6IGFueVtdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIF8uZnJvbVBhaXJzKGFycmF5KSBhcyBhbnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleS4u+imgeaYr+eUoueUn+aWsOelqOeahOaZguWAmeimgee1pueahOWwjeaHieaVuOWtl1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGlja2V0VmFsaWRhdGlvbklkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpY2tldFNlZWRTZXFOdW1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSDnlKLnlJ/lroznmoTmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRUaWNrZXRTRVZhbGlkTnVtKHRpY2tldFZhbGlkYXRpb25JZDogbnVtYmVyLCB0aWNrZXRTZWVkU2VxTnVtOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIodGlja2V0VmFsaWRhdGlvbklkKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aWNrZXRTZWVkU2VxTnVtKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICAnQmFzZVV0aWxzLmdlVGlja2V0U0VWYWxpZE51bSgpIHRpY2tldFZhbGlkYXRpb25JZCB8fCB0aWNrZXRTZWVkU2VxTnVtIGhhdmUgdG8gYmUgSW50ZWdlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IF9FR01WYWxpZElEQnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDQpLmZpbGwoMCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZXFOdW1CdWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoNCkuZmlsbCgwKTtcbiAgICAgICAgX0VHTVZhbGlkSURCdWZmZXIud3JpdGVJbnQzMkxFKHRpY2tldFZhbGlkYXRpb25JZCwgMCk7XG4gICAgICAgIGN1cnJlbnRTZXFOdW1CdWZmZXIud3JpdGVJbnQzMkxFKHRpY2tldFNlZWRTZXFOdW0sIDApO1xuICAgICAgICBjb25zdCBidWZmQXJyYXk6IEJ1ZmZlcltdID0gW107XG4gICAgICAgIC8vIFswXVswXSwgWzBdWzFdXG4gICAgICAgIGJ1ZmZBcnJheS5wdXNoKHRoaXMuY29tcHV0ZUNSQzE2Q0NJVFQoQnVmZmVyLmZyb20oW1xuICAgICAgICAgICAgX0VHTVZhbGlkSURCdWZmZXJbMV0gXiBjdXJyZW50U2VxTnVtQnVmZmVyWzBdLFxuICAgICAgICAgICAgX0VHTVZhbGlkSURCdWZmZXJbMl0gXiBjdXJyZW50U2VxTnVtQnVmZmVyWzFdXG4gICAgICAgIF0pLCAwKSk7XG4gICAgICAgIC8vIFsxXVswXSwgWzFdWzFdXG4gICAgICAgIGJ1ZmZBcnJheS5wdXNoKHRoaXMuY29tcHV0ZUNSQzE2Q0NJVFQoQnVmZmVyLmZyb20oW1xuICAgICAgICAgICAgY3VycmVudFNlcU51bUJ1ZmZlclsyXSBeIGN1cnJlbnRTZXFOdW1CdWZmZXJbMF0sXG4gICAgICAgICAgICBfRUdNVmFsaWRJREJ1ZmZlclswXSBeIGN1cnJlbnRTZXFOdW1CdWZmZXJbMV1cbiAgICAgICAgXSksIDApKTtcbiAgICAgICAgLy8gWzJdWzBdLCBbMl1bMV1cbiAgICAgICAgYnVmZkFycmF5LnB1c2godGhpcy5jb21wdXRlQ1JDMTZDQ0lUVChCdWZmZXIuZnJvbShbXG4gICAgICAgICAgICBjdXJyZW50U2VxTnVtQnVmZmVyWzBdLFxuICAgICAgICAgICAgY3VycmVudFNlcU51bUJ1ZmZlclsxXVxuICAgICAgICBdKSwgMCkpO1xuICAgICAgICBsZXQgaW50Qnl0ZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFswLCBidWZmQXJyYXlbMF1bMF0sIGJ1ZmZBcnJheVswXVsxXSwgYnVmZkFycmF5WzFdWzBdXSk7XG4gICAgICAgIGxldCB0ZW1wNCA9IHRoaXMuZGVjaW1hbERpZ2l0cyhpbnRCeXRlQnVmZmVyLnJlYWRJbnQzMkJFKDApKTtcbiAgICAgICAgaW50Qnl0ZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFswLCBidWZmQXJyYXlbMV1bMV0sIGJ1ZmZBcnJheVsyXVswXSwgYnVmZkFycmF5WzJdWzFdXSk7XG4gICAgICAgIHRlbXA0ID0gdGVtcDQuY29uY2F0KHRoaXMuZGVjaW1hbERpZ2l0cyhpbnRCeXRlQnVmZmVyLnJlYWRJbnQzMkJFKDApKSk7XG4gICAgICAgIGxldCBzdW0xID0gMDtcbiAgICAgICAgbGV0IHN1bTIgPSAwO1xuICAgICAgICBmb3IgKGxldCBpMSA9IDAsIGkyID0gODsgaTEgPCA4OyBpMSsrICwgaTIrKykge1xuICAgICAgICAgICAgc3VtMSArPSB0ZW1wNFtpMV07XG4gICAgICAgICAgICBzdW0yICs9IHRlbXA0W2kyXTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wNFswXSB8PSBzdW0xICUgNSA8PCAxO1xuICAgICAgICB0ZW1wNFs4XSB8PSBzdW0yICUgNSA8PCAxO1xuICAgICAgICByZXR1cm4gdGVtcDQucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfSwgJzAwJyk7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIGRlY2ltYWxEaWdpdHMobjogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICBjb25zdCBkaWdpdHM6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDc7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgICAgICBkaWdpdHNbaV0gPSBuICUgMTA7XG4gICAgICAgICAgICAgICAgbiA9IE1hdGguZmxvb3IobiAvIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlnaXRzW2ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaWdpdHM7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIGNvbXB1dGVDUkMxNkNDSVRUKGJ5dGVzQnVmZmVyOiBCdWZmZXIsIHNlZWQ6IG51bWJlcik6IEJ1ZmZlciB7XG4gICAgICAgIGNvbnN0IENSQ19LRVkxID0gMG8xNztcbiAgICAgICAgY29uc3QgQ1JDX0tFWTIgPSAwbzEwMjAxO1xuXG4gICAgICAgIGxldCBjID0gc2VlZDtcbiAgICAgICAgbGV0IHEgPSBzZWVkO1xuICAgICAgICBsZXQgY3JjVmFsdWUgPSBzZWVkO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMikuZmlsbCgwKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGJ5dGVzQnVmZmVyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgYyA9IGJ5dGVzQnVmZmVyW2ldO1xuICAgICAgICAgICAgcSA9IChjcmNWYWx1ZSBeIGMpICYgQ1JDX0tFWTE7XG4gICAgICAgICAgICBjcmNWYWx1ZSA9IChjcmNWYWx1ZSA+PiA0KSBeIChxICogQ1JDX0tFWTIpO1xuICAgICAgICAgICAgcSA9IChjcmNWYWx1ZSBeIChjID4+IDQpKSAmIENSQ19LRVkxO1xuICAgICAgICAgICAgY3JjVmFsdWUgPSAoY3JjVmFsdWUgPj4gNCkgXiAocSAqIENSQ19LRVkyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC53cml0ZVVJbnQxNkJFKGNyY1ZhbHVlLCAwKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFjayBhbiBhcnJheSB0byBhbiBPYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiA+IHBhY2tPYmplY3QoWydhJywgJ2InLCAnYycsICdkJ10pXG4gICAgICogeyBhOiAnYicsIGM6ICdkJyB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwYWNrT2JqZWN0KGFycmF5OiBhbnlbXSk6IGFueSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgIHJlc3VsdFthcnJheVtpIC0gMV1dID0gYXJyYXlbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydCBhbiBvYmplY3QgdG8gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogPiBjb252ZXJ0T2JqZWN0VG9BcnJheSh7IGE6ICcxJyB9KVxuICAgICAqIFsnYScsICcxJ11cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRPYmplY3RUb0FycmF5KG9iajogYW55KTogYW55W10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgICAgIGNvbnN0IGtleXM6IGFueVtdID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5c1tpXSwgb2JqW2tleXNbaV1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbWFwIHRvIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hcH0gbWFwXG4gICAgICogQHJldHVybiB7YXJyYXl9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqID4gY29udmVydE9iamVjdFRvQXJyYXkobmV3IE1hcChbWzEsICcyJ11dKSlcbiAgICAgKiBbMSwgJzInXVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydE1hcFRvQXJyYXkobWFwOiBNYXA8YW55LCBhbnk+KTogYW55W10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0W3Bvc10gPSBrZXk7XG4gICAgICAgICAgICByZXN1bHRbcG9zICsgMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iXX0=