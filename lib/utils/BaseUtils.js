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
    static splitToArray(stringNumber, splitNumber) {
        return _.split(stringNumber, ',', splitNumber);
    }
}
exports.default = BaseUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsidXRpbHMvQmFzZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXlDO0FBQ3pDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyx5REFBc0Q7QUFDdEQscUVBQWtFO0FBRWxFLDZEQUEwRDtBQVUxRCxNQUFxQixTQUFTO0lBQzFCLDBDQUEwQztJQUMxQyxzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUksS0FBWSxFQUFFLFFBQVc7UUFDN0QsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0QsdUNBQXVDO0lBQ3ZDLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBSSxLQUFZLEVBQUUsUUFBVztRQUM5RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDekMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFRLEVBQUUsUUFBUztRQUNyRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMs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Q0FBQztJQUNsQixDQUFDO0lBQ00sTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFvQixFQUFFLFdBQW1CO1FBQ2hFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQXp3QkQsNEJBeXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2JpZ251bWJlci5qcyc7XG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCAqIGFzIGZpbmRVcCBmcm9tICdmaW5kLXVwJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQmFzZUNvbnN0YW50IH0gZnJvbSAnLi4vY29uZmlnL0Jhc2VDb25zdGFudCc7XG5pbXBvcnQgeyBCYXNlSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9jb25maWcvQmFzZUh0dHBTdGF0dXNDb2RlJztcbmltcG9ydCB7IElTdHJpbmcgfSBmcm9tICcuLi9tb2RlbHMvSUJhc2VDb250ZXh0JztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL0xpYnNFeGNlcHRpb25zJztcblxuZXhwb3J0IHR5cGUgRiA9IChkYXRhOiBhbnkpID0+IGFueTtcbmV4cG9ydCB0eXBlIEEgPSBhbnlbXSB8IGFueTtcbmludGVyZmFjZSBJQ2xhc3Mge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uLiBGdW5jdGlvbiBuYW1lcyBhcmUgcmVhZC1vbmx5IGFuZCBjYW4gbm90IGJlIGNoYW5nZWQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVV0aWxzIHtcbiAgICAvLyBOT1RFOuS4gOWAi0xvb3AgPT4g6YCgYXJyYXnpoIbluo8s5LiA5YCLRnVu5Z+36KGM5YaN5Z+36KGM5LiA5YCLRnVuXG4gICAgLy8gTk9URTrntZDmnpzmnIPmmK/pgKBhcnJheemghuW6j+WHuuS+hlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb29wU3luY0FzeW5jRnVuPFQ+KGFycmF5OiBhbnlbXSwgYXN5bmNGdW46IEYpOiBQcm9taXNlPFRbXT4ge1xuICAgICAgICBjb25zdCBuZXdBcnJheTogVFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYWRhdGEgb2YgYXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGdldERhdGEgPSBhd2FpdCBhc3luY0Z1bihhZGF0YSk7XG4gICAgICAgICAgICBuZXdBcnJheS5wdXNoKGdldERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9XG4gICAgLy8gTk9URTrkuIDlgItMb29wID0+IOS4jemAoGFycmF56aCG5bqPLOaJgOaciUZ1buWQjOaZguS9teeZvOWft+ihjFxuICAgIC8vIE5PVEU657WQ5p6c5pyD5piv5LiN6YCgYXJyYXnpoIbluo/lh7rkvoZcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9vcEFzeW5jQXN5bmNGdW48VD4oYXJyYXk6IGFueVtdLCBhc3luY0Z1bjogRik6IFByb21pc2U8VFtdPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJheS5tYXAoYXN5bmMgKGFEYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXN5bmNGdW4oYURhdGEpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bCL5om+5qqU5qGI5L2N5a2QXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55fSBmaWxlTmFtZSDmqpTmoYjlkI3nqLFcbiAgICAgKiBAcGFyYW0ge2FueX0gZmlsZWRpciDmspLmnInmjIflrprlsLHmmK/poJDoqK0nc3FsVGVtcGxhdGUvICDlupXkuIsnXG4gICAgICogQHBhcmFtIHthbnl9IFtmaWxlUGF0aF0g55yf5a+m5qqU5qGI5L2N5a2Q5Y+v6IO954K6bGlic+aIluaYr3NyYy9kaXN0562J562J5L2/55So55qE5L2N5a2QXG4gICAgICogQHJldHVybnMg55yf5q2j5qqU5qGI55qE5L2N5a2QXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRQYXRoKGZpbGVOYW1lLCBmaWxlZGlyPywgZmlsZVBhdGg/KSB7XG4gICAgICAgIGNvbnN0IHRvRmlsZWRpciA9IF8uaXNVbmRlZmluZWQoZmlsZWRpcikgPyAnc3FsVGVtcGxhdGUvJyA6IGZpbGVkaXI7XG4gICAgICAgIHJldHVybiBmaW5kVXAodG9GaWxlZGlyICsgZmlsZU5hbWUsIHtcbiAgICAgICAgICAgIGN3ZDogXy5pc1VuZGVmaW5lZChmaWxlUGF0aCkgPyBfX2ZpbGVuYW1lIDogZmlsZVBhdGhcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgaXNOdW1iZXIoeDogYW55KTogeCBpcyBudW1iZXIge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGlzU3RyaW5nKHg6IGFueSk6IHggaXMgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5L2155m86JmV55CGXG4gICAgICogQHBhcmFtIHsoQXJyYXk8UHJvbWlzZTxhbnk+PiB8IEFycmF5PFByb21pc2U8YW55W10+Pil9IGFycmF5UHJvbWlzZSDlj6/ku6XloZ7kuIDotbfkvbXnmbznmoRQcm9taXNlXG4gICAgICogQHJldHVybnMg5LiA6LW36Kej5rG655qEKEFycmF5PFByb21pc2U8YW55Pj4gfCBBcnJheTxQcm9taXNlPGFueVtdPj4pXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIEFzeW5jQWxsKGFycmF5UHJvbWlzZTogQXJyYXk8UHJvbWlzZTxBPj4pOiBQcm9taXNlPEE+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycmF5UHJvbWlzZSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgQnVmZkFycmF5VG9CYXNlNjQoZGF0YTogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVmZmVyKGRhdGEsICdiaW5hcnknKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgQmFzZTY0VG9CdWZmQXJyYXkoZGF0YTogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVmZmVyKGRhdGEsICdiYXNlNjQnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBTUUxCaW5hcnkoZGF0YTogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVmZmVyKGRhdGEsICdiaW5hcnknKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBFbXB0eUJhc2U2NFRvQnVmZkFycmF5KCkge1xuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcignICcpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEVtcHR5QnVmZkFycmF5VG9CYXNlNjQoKSB7XG4gICAgICAgIHJldHVybiBCYXNlQ29uc3RhbnQuTk9fSU1BR0U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOino+aekOeJqeS7tumZo+WIl++8jOWwh+eJqeS7tuWFp2FsbCB2YWx1Zee1hOaIkOS7peepuueZvee1hOaIkOWtl+S4slxuICAgICAqIOWGjeWwh+S4iui/sOS5i+Wtl+S4suS7pemAl+iZn+ebuOmAo+aOpVxuICAgICAqIEBwYXJhbSBhbnlbXVxuICAgICAqIEByZXR1cm5zIHN0cmluZ1xuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgb2JqVG9TdHJpbmcob2JqczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIF8uam9pbihfLm1hcChvYmpzLCAob2JqOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLmpvaW4oXy52YWx1ZXMob2JqKSwgJyAnKTtcbiAgICAgICAgfSksICcsJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIG1lbWJlcklkIHRvIE1lbWJlclNlcmlhbCBBbmQgU2VjdGlvblNlcmlhbFxuICAgICAqIEBwYXJhbSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE1lbWJlcklkVG9NZW1iZXJTZXJpYWxBbmRTZWN0aW9uU2VyaWFsKG1lbWJlcklkOiBJU3RyaW5nIHwgc3RyaW5nKSB7XG4gICAgICAgIGlmIChfLnNpemUobWVtYmVySWQpICE9PSA4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnTWVtYmVySWQgU2l6ZSBNdXN0IHRvIGJlIDgnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzTWVtYmVySWQgPSBfLnRvU3RyaW5nKG1lbWJlcklkKTtcbiAgICAgICAgY29uc3QgbWVtYmVyU2VyaWFsID0gc01lbWJlcklkLnNsaWNlKC02KTtcbiAgICAgICAgY29uc3Qgc2VjdGlvblNlcmlhbCA9IF8ucmVwbGFjZShzTWVtYmVySWQsIG1lbWJlclNlcmlhbCwgJycpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVtYmVyU2VyaWFsLFxuICAgICAgICAgICAgc2VjdGlvblNlcmlhbFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBzdHJpbmdcbiAgICAgKiBAcGFyYW0gc3RyaW5nXG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZVN0cmluZyh2YWx1ZTogYW55LCBwYXJhbU5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZCh2YWx1ZSkgfHwgXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG51bWJlclxuICAgICAqIEBwYXJhbSBudW1iZXJcbiAgICAgKiBAcmV0dXJucyBudW1iZXJcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbGlkYXRlTnVtYmVyKHZhbHVlOiBhbnksIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChfLmlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIDogZGF0YSBmb3JtYXQgZXJyb3IsIGZpZWxkOiAnICsgcGFyYW1OYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGJvb2xlYW5cbiAgICAgKiBAcGFyYW0gYm9vbGVhblxuICAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbGlkYXRlQm9vbGVhbih2YWx1ZTogYW55LCBwYXJhbU5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoXy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgYW55O1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIHBhcmFtTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgRGF0ZVxuICAgICAqIEBwYXJhbSBEYXRlXG4gICAgICogQHJldHVybnMgRGF0ZVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdmFsaWRhdGVEYXRlKHZhbHVlOiBhbnksIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG1vbWVudE9iaiA9IG1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxLCB0cnVlKTtcbiAgICAgICAgaWYgKG1vbWVudE9iai5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnRPYmoudG9EYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIDogZGF0YSBmb3JtYXQgZXJyb3IsIGZpZWxkOiAnICsgcGFyYW1OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIHJlc3VsdE1lc3NhZ2UobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogbXNnIH07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgREJUaW1lRm9ybWF0KHRpbWU6IERhdGUgfCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoQmFzZUNvbnN0YW50LkRCX1RJTUVfRk9STUFUKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBEYXRlVGltZUZvcm1hdCh0aW1lOiBEYXRlIHwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuZm9ybWF0KEJhc2VDb25zdGFudC5EQVRFX1RJTUVfRk9STUFUKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBQREZUaW1lRm9ybWF0KHRpbWU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoQmFzZUNvbnN0YW50LlBERl9USU1FX0ZPUk1BVCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgQmlydGhkYXlUaW1lRm9ybWF0KHRpbWU6IERhdGUgfCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoQmFzZUNvbnN0YW50LkJJUlRIREFZX1RJTUVfRk9STUFUKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBQREZIb3Vyc1RpbWVGb3JtYXQodGltZTogRGF0ZSB8IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZvcm1hdChCYXNlQ29uc3RhbnQuUERGX0hPVVJTX1RJTUVfRk9STUFUKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBUYWtlRmlyc3RPckVtcHR5KGFueVRoaW5nOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gYW55VGhpbmdbMF0gfHwge307XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Q2hlY2tTdW0oc0FTQ0lJQ2FyZFNlcmlhbDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ0FycmF5ID0gXy5tYXAoc0FTQ0lJQ2FyZFNlcmlhbCwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFOdW1iZXIgPSBfLnRvTnVtYmVyKGRhdGEpO1xuICAgICAgICAgICAgaWYgKCFfLmlzTmFOKGFOdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnSGF2ZSBUbyBBbGwgTnVtYmVyIEluIFN0cmluZ3MnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChfLnNpemUoc3RyaW5nQXJyYXkpICE9PSAxMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0hhdmUgVG8gRXF1YWwgMTIgc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlTdW0gPSBfLnJlZHVjZShzdHJpbmdBcnJheSwgKHN1bSwgbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyBzdW07XG4gICAgICAgIH0sIDApO1xuICAgICAgICBjb25zdCBpUmVtYWluZGVyID0gaVN1bSAlIDEwO1xuICAgICAgICByZXR1cm4gaVJlbWFpbmRlciA9PT0gMCA/IDAgOiAoMTAgLSBpUmVtYWluZGVyKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyB0b0FTQ0lJQ29kZUFycmF5KHRvQVNDSUk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gXy5tYXAodG9BU0NJSSwgKGNoYXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIHRvQVNDSUlDb2RlU3RyaW5nKHRvQVNDSUk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5Kb2luQXJyYXkodGhpcy50b0FTQ0lJQ29kZUFycmF5KHRvQVNDSUkpKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBmcm9tQVNDSUlDb2RlQXJyYXkoZnJvbUFTQ0lJOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gXy5tYXAoZnJvbUFTQ0lJLCAoY2hhcjogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShfLnRvU2FmZUludGVnZXIoY2hhcikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBmcm9tQVNDSUlDb2RlU3RyaW5nKGZyb21BU0NJSTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNodW5rQXJyYXkgPSBfLm1hcChfLmNodW5rKGZyb21BU0NJSSwgMiksIChwYWlyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Kb2luQXJyYXkocGFpcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5Kb2luQXJyYXkodGhpcy5mcm9tQVNDSUlDb2RlQXJyYXkoY2h1bmtBcnJheSkpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEVuY3J5cHRDYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzdHJpbmdBcnJheSA9IF8ubWFwKGNhcmQsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhTnVtYmVyID0gXy50b051bWJlcihkYXRhKTtcbiAgICAgICAgICAgIGlmICghXy5pc05hTihhTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhTnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgYEhhdmUgVG8gQWxsIE51bWJlciBJbiBTdHJpbmdzKCR7Y2FyZH0pYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoXy5zaXplKHN0cmluZ0FycmF5KSAhPT0gOCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0hhdmUgVG8gRXF1YWwgOCBzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWRkTWFnaWMgPSBfLnRvU3RyaW5nKF8udG9JbnRlZ2VyKGNhcmQpICsgQmFzZUNvbnN0YW50Lk9QQ0FSRF9NQUdJQ19OVU1CRVIpO1xuICAgICAgICBjb25zdCBzdHJNYWdpY09wQ2FyZEFycmF5ID0gXy5tYXAoXy5wYWRTdGFydChhZGRNYWdpYywgOCwgJzAnKSk7XG4gICAgICAgIGNvbnN0IG1hZ2ljQXJyYXkgPSBbXG4gICAgICAgICAgICBzdHJNYWdpY09wQ2FyZEFycmF5WzRdLCBzdHJNYWdpY09wQ2FyZEFycmF5WzBdLFxuICAgICAgICAgICAgc3RyTWFnaWNPcENhcmRBcnJheVsyXSwgc3RyTWFnaWNPcENhcmRBcnJheVs2XSxcbiAgICAgICAgICAgIHN0ck1hZ2ljT3BDYXJkQXJyYXlbMV0sIHN0ck1hZ2ljT3BDYXJkQXJyYXlbM10sXG4gICAgICAgICAgICBzdHJNYWdpY09wQ2FyZEFycmF5WzVdLCBzdHJNYWdpY09wQ2FyZEFycmF5WzddXG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuSm9pbkFycmF5KFxuICAgICAgICAgICAgXy5tYXAoXy5jaHVuayhtYWdpY0FycmF5LCAyKSwgKG1hZ2ljUGFpcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hZ2ljUGFpck51bWJlciA9IF8udG9JbnRlZ2VyKHRoaXMuSm9pbkFycmF5KG1hZ2ljUGFpcikpICsgQmFzZUNvbnN0YW50Lk9QQ0FSRF9NQUdJQ19QQUlSX05VTUJFUjtcbiAgICAgICAgICAgICAgICBjb25zdCBtYWdpY1BhaXJTdHJpbmcgPSBtYWdpY1BhaXJOdW1iZXIgPj0gMTAwID9cbiAgICAgICAgICAgICAgICAgICAgXy50b1N0cmluZyhtYWdpY1BhaXJOdW1iZXIgLSAxMDApIDogXy50b1N0cmluZyhtYWdpY1BhaXJOdW1iZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLnBhZFN0YXJ0KG1hZ2ljUGFpclN0cmluZywgMiwgJzAnKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBEZWNyeXB0Q2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nQXJyYXkgPSBfLm1hcChjYXJkLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYU51bWJlciA9IF8udG9OdW1iZXIoZGF0YSk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOYU4oYU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYU51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdIYXZlIFRvIEFsbCBOdW1iZXIgSW4gU3RyaW5ncycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF8uc2l6ZShzdHJpbmdBcnJheSkgIT09IDgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdIYXZlIFRvIEVxdWFsIDggc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hZ2ljQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgICAgIF8uZm9yRWFjaChfLmNodW5rKGNhcmQsIDIpLCAobWFnaWNQYWlyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYWdpY1BhaXJOdW1iZXIgPSBfLnRvSW50ZWdlcih0aGlzLkpvaW5BcnJheShtYWdpY1BhaXIpKSAtIEJhc2VDb25zdGFudC5PUENBUkRfTUFHSUNfUEFJUl9OVU1CRVI7XG4gICAgICAgICAgICBjb25zdCBtYWdpY1BhaXJTdHJpbmcgPSBtYWdpY1BhaXJOdW1iZXIgPCAwID9cbiAgICAgICAgICAgICAgICBfLnRvU3RyaW5nKG1hZ2ljUGFpck51bWJlciArIDEwMCkgOiBfLnRvU3RyaW5nKG1hZ2ljUGFpck51bWJlcik7XG4gICAgICAgICAgICBjb25zdCBwYWRTdGFydFN0cmluZ0FycmF5ID0gXy5tYXAoXy5wYWRTdGFydChtYWdpY1BhaXJTdHJpbmcsIDIsICcwJykpO1xuICAgICAgICAgICAgbWFnaWNBcnJheS5wdXNoKHBhZFN0YXJ0U3RyaW5nQXJyYXlbMF0pO1xuICAgICAgICAgICAgbWFnaWNBcnJheS5wdXNoKHBhZFN0YXJ0U3RyaW5nQXJyYXlbMV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF8ucGFkU3RhcnQoXy50b1N0cmluZyhfLnRvSW50ZWdlcih0aGlzLkpvaW5BcnJheShbXG4gICAgICAgICAgICBtYWdpY0FycmF5WzFdLCBtYWdpY0FycmF5WzRdLFxuICAgICAgICAgICAgbWFnaWNBcnJheVsyXSwgbWFnaWNBcnJheVs1XSxcbiAgICAgICAgICAgIG1hZ2ljQXJyYXlbMF0sIG1hZ2ljQXJyYXlbNl0sXG4gICAgICAgICAgICBtYWdpY0FycmF5WzNdLCBtYWdpY0FycmF5WzddXG4gICAgICAgIF0pKSAtIEJhc2VDb25zdGFudC5PUENBUkRfTUFHSUNfTlVNQkVSKSwgOCwgJzAnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBKb2luQXJyYXkoYW55VGhpbmc6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBfLmpvaW4oYW55VGhpbmcsICcnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBFbmNyeXB0QWxnb3JpdGhtQ2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy5tYXAoY2FyZCk7XG4gICAgICAgIGNvbnN0IGZpcnN0MlRvQVNDSUkgPSB0aGlzLkpvaW5BcnJheShfLnRha2UoY2FyZEFycmF5LCAyKSk7XG4gICAgICAgIGNvbnN0IGxhc3Q4VG9FbmNyeXB0ID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlUmlnaHQoY2FyZEFycmF5LCA4KSk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ29kZVN0cmluZyA9IHRoaXMudG9BU0NJSUNvZGVTdHJpbmcoZmlyc3QyVG9BU0NJSSk7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRDYXJkU3RyaW5nID0gdGhpcy5FbmNyeXB0Q2FyZChsYXN0OFRvRW5jcnlwdCk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ2FyZCA9IGFTQ0lJQ29kZVN0cmluZyArIGVuY3J5cHRDYXJkU3RyaW5nO1xuICAgICAgICBjb25zdCBjaGVja1N1bSA9IHRoaXMuR2V0Q2hlY2tTdW0oYVNDSUlDYXJkKTtcbiAgICAgICAgcmV0dXJuIGFTQ0lJQ2FyZCArIGNoZWNrU3VtO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIERlY3J5cHRBbGdvcml0aG1DYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLnRha2UoXy5tYXAoY2FyZCksIDEyKTtcbiAgICAgICAgY29uc3QgZmlyc3QyRnJvbUFTQ0lJID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlKGNhcmRBcnJheSwgNCkpO1xuICAgICAgICBjb25zdCBsYXN0OFRvRGVjcnlwdCA9IHRoaXMuSm9pbkFycmF5KF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgOCkpO1xuICAgICAgICBjb25zdCBhU0NJSUNvZGVTdHJpbmcgPSB0aGlzLmZyb21BU0NJSUNvZGVTdHJpbmcoZmlyc3QyRnJvbUFTQ0lJKTtcbiAgICAgICAgY29uc3QgZGVjcnlwdENhcmRDYXJkU3RyaW5nID0gdGhpcy5EZWNyeXB0Q2FyZChsYXN0OFRvRGVjcnlwdCk7XG4gICAgICAgIHJldHVybiBhU0NJSUNvZGVTdHJpbmcgKyBkZWNyeXB0Q2FyZENhcmRTdHJpbmc7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRW5jcnlwdE9yaWdpbmFsQ2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy5tYXAoY2FyZCk7XG4gICAgICAgIGNvbnN0IGZpcnN0MlRvQVNDSUkgPSB0aGlzLkpvaW5BcnJheShfLnRha2UoY2FyZEFycmF5LCAyKSk7XG4gICAgICAgIGNvbnN0IGxhc3Q4VG9FbmNyeXB0ID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlUmlnaHQoY2FyZEFycmF5LCA4KSk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ29kZVN0cmluZyA9IHRoaXMudG9BU0NJSUNvZGVTdHJpbmcoZmlyc3QyVG9BU0NJSSk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ2FyZCA9IGFTQ0lJQ29kZVN0cmluZyArIGxhc3Q4VG9FbmNyeXB0O1xuICAgICAgICBjb25zdCBjaGVja1N1bSA9IHRoaXMuR2V0Q2hlY2tTdW0oYVNDSUlDYXJkKTtcbiAgICAgICAgcmV0dXJuIGFTQ0lJQ2FyZCArIGNoZWNrU3VtO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIERlY3J5cHRPcmlnaW5hbENhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8udGFrZShfLm1hcChjYXJkKSwgMTIpO1xuICAgICAgICBjb25zdCBmaXJzdDJGcm9tQVNDSUkgPSB0aGlzLkpvaW5BcnJheShfLnRha2UoY2FyZEFycmF5LCA0KSk7XG4gICAgICAgIGNvbnN0IGxhc3Q4VG9EZWNyeXB0ID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlUmlnaHQoY2FyZEFycmF5LCA4KSk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ29kZVN0cmluZyA9IHRoaXMuZnJvbUFTQ0lJQ29kZVN0cmluZyhmaXJzdDJGcm9tQVNDSUkpO1xuICAgICAgICByZXR1cm4gYVNDSUlDb2RlU3RyaW5nICsgbGFzdDhUb0RlY3J5cHQ7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2hvcnRDYXJkU2VyaWFsUHJpbnRGb3JtYXQoY2FyZDogc3RyaW5nLCBhbGdvcml0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZW5jcnlwdENhcmQgPSBhbGdvcml0ID8gdGhpcy5FbmNyeXB0QWxnb3JpdGhtQ2FyZChjYXJkKSA6IHRoaXMuRW5jcnlwdE9yaWdpbmFsQ2FyZChjYXJkKTtcbiAgICAgICAgcmV0dXJuIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9IRUFEX0VNUFRZICsgZW5jcnlwdENhcmQgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfU0hPUlRFTkQ7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9uZ0NhcmRTZXJpYWxQcmludEZvcm1hdChjYXJkOiBzdHJpbmcsIGFsZ29yaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBlbmNyeXB0Q2FyZCA9IGFsZ29yaXQgPyB0aGlzLkVuY3J5cHRBbGdvcml0aG1DYXJkKGNhcmQpIDogdGhpcy5FbmNyeXB0T3JpZ2luYWxDYXJkKGNhcmQpO1xuICAgICAgICBjb25zdCBtYWdpY1N0cmluZyA9XG4gICAgICAgICAgICBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfSEVBRF9FTVBUWSArIGVuY3J5cHRDYXJkICsgQmFzZUNvbnN0YW50Lk9QQ0FSRF9MT05HX1BSSU5URVJfTUFHSUNTVFJJTkcxO1xuICAgICAgICBjb25zdCBtYWduZXRpY1N0cmlwZUNvZGUgPSBCYXNlQ29uc3RhbnQuT1BDQVJEX0xPTkdfUFJJTlRFUl9NQUdJQ1NUUklORzIgKyBlbmNyeXB0Q2FyZDtcbiAgICAgICAgY29uc3QgaUNoZWNrc3VtID0gdGhpcy5DYXJkU2VyaWFsQ2hlY2tTdW0obWFnbmV0aWNTdHJpcGVDb2RlKTtcbiAgICAgICAgaWYgKGlDaGVja3N1bSA8PSA5KSB7XG4gICAgICAgICAgICByZXR1cm4gbWFnaWNTdHJpbmcgKyBtYWduZXRpY1N0cmlwZUNvZGUgKyBfLnRvU3RyaW5nKGlDaGVja3N1bSkgKyBCYXNlQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQUZURVI5RU5EO1xuICAgICAgICB9IGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTEwRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTEpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTExRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTIpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTEyRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTEzRU5EO1xuICAgICAgICB9IGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTQpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIEJhc2VDb25zdGFudC5PUENBUkRfUFJJTlRFUl9CRTE0RU5EO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEJhc2VIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0xvbmcgQ2FyZFNlcmlhbCBQcmludCBGb3JtYXQgRmFpbCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWOn+Wni+eahGNvZGXmnInpgJnlgIvliKTmlrcs5L2G5pivLi4uLuebruWJjeeci+i1t+S+huaYr+awuOmBoOi3keS4jeWIsOmAmeWAizE1XG4gICAgICAgIC8vIGVsc2UgaWYgKGlDaGVja3N1bSA9PT0gMTUpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIENvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTVFTkQ7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBDYXJkU2VyaWFsQ2hlY2tTdW0oY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8ubWFwKGNhcmQpO1xuICAgICAgICBjb25zdCB0YWtlY2FyZFNpemUgPSBfLnNpemUoY2FyZEFycmF5KSAtIDI7XG4gICAgICAgIGNvbnN0IHdpdGhvdXRGcmlzdDJDYXJkQXJyYXkgPSBfLnRha2VSaWdodChjYXJkQXJyYXksIHRha2VjYXJkU2l6ZSk7XG4gICAgICAgIGxldCB0ZW1wMSA9IGNhcmRBcnJheVswXS5jaGFyQ29kZUF0KDApO1xuICAgICAgICBsZXQgdGVtcDIgPSBjYXJkQXJyYXlbMV0uY2hhckNvZGVBdCgwKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICAgICAgbGV0IGNoZWNrc3VtID0gdGVtcDEgXiB0ZW1wMjtcbiAgICAgICAgXy5mb3JFYWNoKHdpdGhvdXRGcmlzdDJDYXJkQXJyYXksIChzdHJDaGFyKSA9PiB7XG4gICAgICAgICAgICB0ZW1wMSA9IGNoZWNrc3VtO1xuICAgICAgICAgICAgdGVtcDIgPSBzdHJDaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICAgICAgY2hlY2tzdW0gPSB0ZW1wMSBeIHRlbXAyO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICAgICAgY2hlY2tzdW0gPSBjaGVja3N1bSAmIDE1O1xuICAgICAgICBpZiAoY2hlY2tzdW0gPT09IDE1KSB7XG4gICAgICAgICAgICBjaGVja3N1bSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoZWNrc3VtO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldE1hZ25ldGljU3RyaXBlQ29kZShjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy5tYXAoY2FyZCk7XG4gICAgICAgIGNvbnN0IGNhcmRTaXplID0gXy5zaXplKGNhcmRBcnJheSk7XG4gICAgICAgIGxldCB0YWtlQ2FyZENvZGU7XG4gICAgICAgIGlmIChjYXJkU2l6ZSA+IDE2KSB7XG4gICAgICAgICAgICB0YWtlQ2FyZENvZGUgPSBfLnRha2VSaWdodChjYXJkQXJyYXksIDE1KTtcbiAgICAgICAgICAgIHRha2VDYXJkQ29kZSA9IF8udGFrZSh0YWtlQ2FyZENvZGUsIDEyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRha2VDYXJkQ29kZSA9IF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgMTQpO1xuICAgICAgICAgICAgdGFrZUNhcmRDb2RlID0gXy50YWtlKHRha2VDYXJkQ29kZSwgMTIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLkpvaW5BcnJheSh0YWtlQ2FyZENvZGUpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGRvbGxhclRvQ2VudCh2YWx1ZTogbnVtYmVyIHwgQmlnTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHZhbHVlKS5zaGlmdGVkQnkoMikudG9OdW1iZXIoKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBjZW50VG9Eb2xsYXIodmFsdWU6IG51bWJlciB8IEJpZ051bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcih2YWx1ZSkuZGl2KDEwMCkudG9OdW1iZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6K5pW4a2V55ZG95ZCNdXNlIF8uY2FtZWxDYXNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55fSBvYmpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBhdXRob3IgTWlrZWxpXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkZWVwbHlUb0NhbWVsQ2FzZShvYmopIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KG9iaikgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmoubWFwKCh2KSA9PiBCYXNlVXRpbHMuZGVlcGx5VG9DYW1lbENhc2UodikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLnJlZHVjZShvYmosIChyLCB2LCBrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnIsXG4gICAgICAgICAgICAgICAgW18ubG93ZXJGaXJzdChrKV06IEJhc2VVdGlscy5kZWVwbHlUb0NhbWVsQ2FzZSh2KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorormlbhrZXnlkb3lkI11c2UgXy51cHBlckNhbWVsQ2FzZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAYXV0aG9yIE1pa2VsaVxuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVlcGx5VG9VcHBlckNhbWVsQ2FzZShvYmopIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KG9iaikgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmoubWFwKCh2KSA9PiBCYXNlVXRpbHMuZGVlcGx5VG9VcHBlckNhbWVsQ2FzZSh2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKG9iaiwgKHIsIHYsIGspID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucixcbiAgICAgICAgICAgICAgICBbXy51cHBlckZpcnN0KGspXTogQmFzZVV0aWxzLmRlZXBseVRvVXBwZXJDYW1lbENhc2UodilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5L2/55SoQUVTXzEyOF9FQ0Ig5Yqg5a+GXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIOimgeWKoOWvhueahOizh+aWmSDlj6rog71zdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWNiS2V5IOmgkOioreaYr+aIkeWAkeeahOWvhueivCznlbbnhLblj6/ku6XovLjlhaXoh6rlt7Hmg7PopoHkvb/nlKjnmoTlr4bnorxcbiAgICAgKiBAcmV0dXJucyDliqDlr4blvoznmoRzdHJpbmdcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEVuY3J5cHRpb25fQUVTX0VDQl8xMjgoZGF0YTogc3RyaW5nLCBlY2JLZXk6IHN0cmluZyA9IEJhc2VDb25zdGFudC5BRVNfMTI4X0VDQl9LRVkpIHtcbiAgICAgICAgY29uc3QgY2lwaGVyQ2h1bmtzOiBhbnlbXSA9IFtdO1xuICAgICAgICBjb25zdCBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoXG4gICAgICAgICAgICBCYXNlQ29uc3RhbnQuQUVTX0NJUEhFUixcbiAgICAgICAgICAgIG5ldyBCdWZmZXIoZWNiS2V5KSxcbiAgICAgICAgICAgIEJhc2VDb25zdGFudC5BRVNfQ0lQSEVSX0lWKTtcbiAgICAgICAgY2lwaGVyLnNldEF1dG9QYWRkaW5nKHRydWUpO1xuICAgICAgICBjaXBoZXJDaHVua3MucHVzaChcbiAgICAgICAgICAgIGNpcGhlci51cGRhdGUoZGF0YSwgQmFzZUNvbnN0YW50LkFFU19DTEVBUl9FTkNPRElORywgQmFzZUNvbnN0YW50LkFFU19DSVBIRVJfRU5DT0RJTkcpXG4gICAgICAgICk7XG4gICAgICAgIGNpcGhlckNodW5rcy5wdXNoKFxuICAgICAgICAgICAgY2lwaGVyLmZpbmFsKEJhc2VDb25zdGFudC5BRVNfQ0lQSEVSX0VOQ09ESU5HKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gY2lwaGVyQ2h1bmtzLmpvaW4oJycpLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS9v+eUqEFFU18xMjhfRUNCIOino+WvhlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSDopoHop6Plr4bnmoTos4fmlpkgc3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVjYktleSDpoJDoqK3mmK/miJHlgJHnmoTlr4bnorws55W254S25Y+v5Lul6Ly45YWl6Ieq5bex5oOz6KaB5L2/55So55qE5a+G56K8XG4gICAgICogQHJldHVybnMg6Kej5a+G5b6M55qEc3RyaW5nXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBEZWNyeXB0aW9uX0FFU19FQ0JfMTI4KGRhdGE6IHN0cmluZywgZWNiS2V5OiBzdHJpbmcgPSBCYXNlQ29uc3RhbnQuQUVTXzEyOF9FQ0JfS0VZKSB7XG4gICAgICAgIGNvbnN0IGNpcGhlckNodW5rczogYW55W10gPSBbXTtcbiAgICAgICAgY29uc3QgZGVjaXBoZXIgPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXJpdihcbiAgICAgICAgICAgIEJhc2VDb25zdGFudC5BRVNfQ0lQSEVSLFxuICAgICAgICAgICAgbmV3IEJ1ZmZlcihlY2JLZXkpLFxuICAgICAgICAgICAgQmFzZUNvbnN0YW50LkFFU19DSVBIRVJfSVYpO1xuICAgICAgICBkZWNpcGhlci5zZXRBdXRvUGFkZGluZyh0cnVlKTtcblxuICAgICAgICBjaXBoZXJDaHVua3MucHVzaChcbiAgICAgICAgICAgIGRlY2lwaGVyLnVwZGF0ZShkYXRhLCBCYXNlQ29uc3RhbnQuQUVTX0NJUEhFUl9FTkNPRElORywgQmFzZUNvbnN0YW50LkFFU19DTEVBUl9FTkNPRElORylcbiAgICAgICAgKTtcbiAgICAgICAgY2lwaGVyQ2h1bmtzLnB1c2goXG4gICAgICAgICAgICBkZWNpcGhlci5maW5hbChCYXNlQ29uc3RhbnQuQUVTX0NMRUFSX0VOQ09ESU5HKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gY2lwaGVyQ2h1bmtzLmpvaW4oJycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlrfmmK/lgbbmlbjpgoTmmK/lpYfmlbhcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IOmcgOimgeaVtOaVuFxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjaGVja051bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdjaGVja051bWJlcigpIG11c3QgaGF2ZSB0byBpbnRlZ2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh2YWx1ZSAmIDEpID09PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3VudCBvY2N1cnJlbmNlcyBvZiBhIHZhbHVlIGluIGFycmF5XG4gICAgICog5Y+W5Ye65pW457WE5Lit5oyH5a6a55qE5pW45YC8LOmHjeikh+eahOasoeaVuFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSDmlbjlrZfpmaPliJdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0g5pW45a2XXG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50T2NjdXJyZW5jZXMoYXJyOiBudW1iZXJbXSwgdmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZSgoYSwgdikgPT4gdiA9PT0gdmFsdWUgPyBhICsgMSA6IGEgKyAwLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6KiI566X6Zmj5YiX5YWn55qE57SU5pW457WE5pyA5b6M6L2J5o+b5oiQQmlnTnVtYmVyXG4gICAgICog5pys5L6G5piv55u05o6l5L2/55SocmVkdWNlXG4gICAgICog5L2G5piv5pei54S25piv5bCB6KOd6YGO5b6M55qE5pa55byP5bCx5o6h55So5pyA5Y6f5aeL5b+r6YCf55qEZm9y5L6G6KiI566XXG4gICAgICog5ris6Kmm55So5L6L5pyJ5L2/55So5LiA5YCLMzAw6JCs55qE57SU5pW457WE5L6G5ris6KmmXG4gICAgICog57SU5pW45a2X5LiN55So6Zqx5byP6L2J5Z6L5LiLcmVkdWNl5q+U6LyD5b+rXG4gICAgICog6KaB6Zqx5byP6L2J5Z6L5Y6f5aeLZm9y5q+U6LyD5b+rXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7KG51bWJlcltdIHwgc3RyaW5nW10gfCBCaWdOdW1iZXJbXSl9IGFycmF5XG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEFycmF5KGFycmF5OiBudW1iZXJbXSB8IHN0cmluZ1tdIHwgQmlnTnVtYmVyW10pOiBCaWdOdW1iZXIge1xuICAgICAgICBsZXQgZmluYWwgPSBuZXcgQmlnTnVtYmVyKDApO1xuICAgICAgICBmb3IgKGxldCBuIG9mIGFycmF5KSB7XG4gICAgICAgICAgICBuID0gbmV3IEJpZ051bWJlcihuKTtcbiAgICAgICAgICAgIGZpbmFsID0gZmluYWwucGx1cyhuLmlzTmFOKCkgPyAwIDogbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmmK/lgZpyZWR1Y2XnmoTmlrnlvI/kvobpgZTliLDot59hZGRBcnJheeijoemdomZvcuS4gOaoo+eahOaIkOaenFxuICAgICAqIOWcqOWWruWFg+a4rOippueahOaZguWAmeWPr+S7peeci+WIsOW3rueVsFxuICAgICAqIOWPpuWkluWcqGFycmF5LnJlZHVjZeeahOaOpeWPo+S4iuS4jeiDveWFgeiosXN0cmluZyB0byBudW1iZXLnmoTpmaPliJdcbiAgICAgKiDlj6blpJblnKjnqbrplpPkuIrnmoTlr6vms5XkuIrlv4XpoIhuZXflhanmrKFCaWdOdW1iZXLkuZ/mnIPlsI7oh7TnqbrplpPnmoTmtarosrtcbiAgICAgKiDlvJXnmbzkuI3lv4XopoHnmoRHQ+W9semfv+aViOiDvVxuICAgICAqIOe0lOaVuOWtl+S4jeeUqOmaseW8j+i9ieWei+S4i3JlZHVjZeavlOi8g+W/q1xuICAgICAqIOimgemaseW8j+i9ieWei+WOn+Wni2ZvcuavlOi8g+W/q1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyhudW1iZXJbXSB8IHN0cmluZ1tdIHwgQmlnTnVtYmVyW10pfSBhcnJheVxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRBcnJheVJlZHVjZShhcnJheTogYW55W10pOiBCaWdOdW1iZXIge1xuICAgICAgICByZXR1cm4gYXJyYXkucmVkdWNlKChwcmUsIGN1cikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIocHJlKS5wbHVzKG5ldyBCaWdOdW1iZXIoY3VyKS5pc05hTigpID8gMCA6IGN1cik7XG4gICAgICAgIH0sIG5ldyBCaWdOdW1iZXIoMCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XkuLvopoHmmK/lj5blh7rkuIDlgIvnianku7bpmaPliJflhafmjIflrprnmoRmaWVsZOS+huWBmuWKoOe4vVxuICAgICAqIEBwYXJhbSBhcnJheVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRUaGlzRmllbGQoYXJyYXk6IGFueVtdLCBmaWVsZDogc3RyaW5nKTogQmlnTnVtYmVyIHtcbiAgICAgICAgaWYgKF8uc2l6ZShhcnJheSkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFkZEFycmF5KF8ubWFwKGFycmF5LCBmaWVsZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XmmK/ngrrkuobopoHlgZrliLDkuIDlgIvnianku7bpmaPliJfoo6HpnaJcbiAgICAgKiDmiorpgJnlgIvnianku7bnmoRmaWVsZDEgeCBmaWVsZDIg5pyA5b6M5Zyo5oqK6YCZ5YCL55u45LmY5b6M55qE5pW45a2X55u45YqgXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkMVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZDJcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkVGhpc0ZpZWxkMXhGaWVsZDIoYXJyYXk6IGFueVtdLCBmaWVsZDE6IHN0cmluZywgZmllbGQyOiBzdHJpbmcpOiBCaWdOdW1iZXIge1xuICAgICAgICBpZiAoXy5zaXplKGFycmF5KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQXJyYXkoXy5tYXAoYXJyYXksIChhRGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuRmllbGQxID0gXy50b051bWJlcihhRGF0YVtmaWVsZDFdKTtcbiAgICAgICAgICAgIGNvbnN0IG5GaWVsZDIgPSBfLnRvTnVtYmVyKGFEYXRhW2ZpZWxkMl0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoXy5pc05hTihuRmllbGQxKSA/IDAgOiBuRmllbGQxKS50aW1lcyhfLmlzTmFOKG5GaWVsZDIpID8gMCA6IG5GaWVsZDIpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleaYr+eCuuS6huiHquWLleWPluWHuuS4gOWAi+eJqeS7tumZo+WIl+WFp+espuWQiOaineS7tueahOeJqeS7tlxuICAgICAqIOmHjee1hOmAmeWAi+mZo+WIl+WGjeWPluWHuuaDs+imgeioiOeul+WKoOe4veeahGZpZWxkXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gICAgICogQHBhcmFtIHsqfSBmaWx0ZXJDb25kaXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkVGhpc0ZpZWxkQXV0b0ZpbHRlcihhcnJheTogYW55W10sIGZpbHRlckNvbmRpdGlvbjogYW55LCBmaWVsZDogc3RyaW5nKTogQmlnTnVtYmVyIHtcbiAgICAgICAgaWYgKF8uc2l6ZShhcnJheSkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFkZFRoaXNGaWVsZChfLmZpbHRlcihhcnJheSwgZmlsdGVyQ29uZGl0aW9uKSwgZmllbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XmmK/ngrrkuoboh6rli5Xlj5blh7rkuIDlgIvnianku7bpmaPliJflhafnrKblkIjmop3ku7bnmoTnianku7ZcbiAgICAgKiDph43ntYTpgJnlgIvpmaPliJflho3lj5blh7rmr4/lgIvnianku7blhadmaWVsZDEgeCBmaWVsZDJcbiAgICAgKiDlho3ov5Tlm57mlrDnmoTnm7jkuZjpgY7nmoTntJTmlbjntYTmnIDlvozlho3miornm7jkuZjnmoTmlbjntYTliqDnuL1cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAgICAgKiBAcGFyYW0geyp9IGZpbHRlckNvbmRpdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZDFcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQyXG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEZpZWxkMXhGaWVsZDJBdXRvRmlsdGVyKFxuICAgICAgICBhcnJheTogYW55W10sIGZpbHRlckNvbmRpdGlvbjogYW55LCBmaWVsZDE6IHN0cmluZywgZmllbGQyOiBzdHJpbmcpOiBCaWdOdW1iZXIge1xuICAgICAgICBpZiAoXy5zaXplKGFycmF5KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGhpc0ZpZWxkMXhGaWVsZDIoXy5maWx0ZXIoYXJyYXksIGZpbHRlckNvbmRpdGlvbiksIGZpZWxkMSwgZmllbGQyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5Li76KaB5piv6KaB55Si55Sf5paw55qET2JqZWN0XG4gICAgICog5YWp5YCL6Zmj5YiX6ZW35bqm6KaB5LiA5qij5LiN54S25pyD5aCx6YyvXG4gICAgICog5pyA5b6M55Si5Ye655qET2JqZWN05pyD5oqKVW5kZWZpbmVk5bCN5oeJ55qE5oiQ5ZOh5YmU6Zmk5o6JXG4gICAgICoga2V5czogWydhJywgJ2InLCAnYycsICdkJ11cbiAgICAgKiB2YWx1ZXM6IFsxLCAnZmYnLCAyLCBVbmRlZmluZWRdXG4gICAgICogcmV0dXJuczoge2E6IDEsIGI6ICdmZicsIGM6IDJ9XG4gICAgICog5pys5L6GICBkOiBVbmRlZmluZWQgIOmAmeWAi+WxrOaAp+acg+iiq+WJg+mZpOaOiVxuICAgICAqIEBwYXJhbSB7KHN0cmluZyB8IHN0cmluZ1tdKX0ga2V5cyDpgJnoo6HmmK9rZXlz55qE6Zmj5YiXXG4gICAgICogQHBhcmFtIHsoYW55IHwgYW55W10pfSB2YWx1ZXMg6YCZ6KOh5pivdmFsdWVz55qE6Zmj5YiXXG4gICAgICogQHJldHVybnMge09iamVjdCB8IGFueX1cbiAgICAgKiBAbWVtYmVyb2YgQmFzZVV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUd29BcnJheVRvT2JqKGtleXM6IHN0cmluZyB8IHN0cmluZ1tdLCB2YWx1ZXM6IGFueSB8IGFueVtdKTogYW55IHtcbiAgICAgICAgaWYgKF8uc2l6ZShrZXlzKSAhPT0gXy5zaXplKHZhbHVlcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhCYXNlSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgJ0Jhc2VVdGlscy5Ud29BcnJheVRvT2JqKCkga2V5cyBhbmQgdmFsdWVzIHNpemUgbm90IGVxdWFsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ub21pdEJ5KF8uemlwT2JqZWN0KGtleXMsIHZhbHVlcyksIF8uaXNVbmRlZmluZWQpIGFzIGFueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5Li76KaB5piv6KaB55Si55Sf5paw55qET2JqZWN0XG4gICAgICogYXJyYXk6IFtbJ2EnLCAxXSwgWydiJywgMl0sIFsnYycsIFVuZGVmaW5lZF0sIFsnZCcsICdmZiddXVxuICAgICAqIHJldHVybnM6IHthOiAxLCBiOiAyLCBjOiBVbmRlZmluZWQsIGQ6ICdmZid9XG4gICAgICogQHBhcmFtIGFycmF5IOmAmeWAi2FycmF5IOmcgOimgeavj+WAi+e1hOmDveaYr+S4gOWAi+WwjeaHieeahOmZo+WIl+e1hFxuICAgICAqIEByZXR1cm5zIHtPYmplY3QgfCBhbnl9XG4gICAgICogQG1lbWJlcm9mIEJhc2VVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgT25lQXJyYXlUb09iaihhcnJheTogYW55W10pOiBhbnkge1xuICAgICAgICByZXR1cm4gXy5mcm9tUGFpcnMoYXJyYXkpIGFzIGFueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5Li76KaB5piv55Si55Sf5paw56Wo55qE5pmC5YCZ6KaB57Wm55qE5bCN5oeJ5pW45a2XXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aWNrZXRWYWxpZGF0aW9uSWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGlja2V0U2VlZFNlcU51bVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IOeUoueUn+WujOeahOaVuOWtl1xuICAgICAqIEBtZW1iZXJvZiBCYXNlVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFRpY2tldFNFVmFsaWROdW0odGlja2V0VmFsaWRhdGlvbklkOiBudW1iZXIsIHRpY2tldFNlZWRTZXFOdW06IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcih0aWNrZXRWYWxpZGF0aW9uSWQpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHRpY2tldFNlZWRTZXFOdW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoQmFzZUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgICdCYXNlVXRpbHMuZ2VUaWNrZXRTRVZhbGlkTnVtKCkgdGlja2V0VmFsaWRhdGlvbklkIHx8IHRpY2tldFNlZWRTZXFOdW0gaGF2ZSB0byBiZSBJbnRlZ2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgX0VHTVZhbGlkSURCdWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoNCkuZmlsbCgwKTtcbiAgICAgICAgY29uc3QgY3VycmVudFNlcU51bUJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSg0KS5maWxsKDApO1xuICAgICAgICBfRUdNVmFsaWRJREJ1ZmZlci53cml0ZUludDMyTEUodGlja2V0VmFsaWRhdGlvbklkLCAwKTtcbiAgICAgICAgY3VycmVudFNlcU51bUJ1ZmZlci53cml0ZUludDMyTEUodGlja2V0U2VlZFNlcU51bSwgMCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZBcnJheTogQnVmZmVyW10gPSBbXTtcbiAgICAgICAgLy8gWzBdWzBdLCBbMF1bMV1cbiAgICAgICAgYnVmZkFycmF5LnB1c2godGhpcy5jb21wdXRlQ1JDMTZDQ0lUVChCdWZmZXIuZnJvbShbXG4gICAgICAgICAgICBfRUdNVmFsaWRJREJ1ZmZlclsxXSBeIGN1cnJlbnRTZXFOdW1CdWZmZXJbMF0sXG4gICAgICAgICAgICBfRUdNVmFsaWRJREJ1ZmZlclsyXSBeIGN1cnJlbnRTZXFOdW1CdWZmZXJbMV1cbiAgICAgICAgXSksIDApKTtcbiAgICAgICAgLy8gWzFdWzBdLCBbMV1bMV1cbiAgICAgICAgYnVmZkFycmF5LnB1c2godGhpcy5jb21wdXRlQ1JDMTZDQ0lUVChCdWZmZXIuZnJvbShbXG4gICAgICAgICAgICBjdXJyZW50U2VxTnVtQnVmZmVyWzJdIF4gY3VycmVudFNlcU51bUJ1ZmZlclswXSxcbiAgICAgICAgICAgIF9FR01WYWxpZElEQnVmZmVyWzBdIF4gY3VycmVudFNlcU51bUJ1ZmZlclsxXVxuICAgICAgICBdKSwgMCkpO1xuICAgICAgICAvLyBbMl1bMF0sIFsyXVsxXVxuICAgICAgICBidWZmQXJyYXkucHVzaCh0aGlzLmNvbXB1dGVDUkMxNkNDSVRUKEJ1ZmZlci5mcm9tKFtcbiAgICAgICAgICAgIGN1cnJlbnRTZXFOdW1CdWZmZXJbMF0sXG4gICAgICAgICAgICBjdXJyZW50U2VxTnVtQnVmZmVyWzFdXG4gICAgICAgIF0pLCAwKSk7XG4gICAgICAgIGxldCBpbnRCeXRlQnVmZmVyID0gQnVmZmVyLmZyb20oWzAsIGJ1ZmZBcnJheVswXVswXSwgYnVmZkFycmF5WzBdWzFdLCBidWZmQXJyYXlbMV1bMF1dKTtcbiAgICAgICAgbGV0IHRlbXA0ID0gdGhpcy5kZWNpbWFsRGlnaXRzKGludEJ5dGVCdWZmZXIucmVhZEludDMyQkUoMCkpO1xuICAgICAgICBpbnRCeXRlQnVmZmVyID0gQnVmZmVyLmZyb20oWzAsIGJ1ZmZBcnJheVsxXVsxXSwgYnVmZkFycmF5WzJdWzBdLCBidWZmQXJyYXlbMl1bMV1dKTtcbiAgICAgICAgdGVtcDQgPSB0ZW1wNC5jb25jYXQodGhpcy5kZWNpbWFsRGlnaXRzKGludEJ5dGVCdWZmZXIucmVhZEludDMyQkUoMCkpKTtcbiAgICAgICAgbGV0IHN1bTEgPSAwO1xuICAgICAgICBsZXQgc3VtMiA9IDA7XG4gICAgICAgIGZvciAobGV0IGkxID0gMCwgaTIgPSA4OyBpMSA8IDg7IGkxKysgLCBpMisrKSB7XG4gICAgICAgICAgICBzdW0xICs9IHRlbXA0W2kxXTtcbiAgICAgICAgICAgIHN1bTIgKz0gdGVtcDRbaTJdO1xuICAgICAgICB9XG4gICAgICAgIHRlbXA0WzBdIHw9IHN1bTEgJSA1IDw8IDE7XG4gICAgICAgIHRlbXA0WzhdIHw9IHN1bTIgJSA1IDw8IDE7XG4gICAgICAgIHJldHVybiB0ZW1wNC5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9LCAnMDAnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVjaW1hbERpZ2l0cyhuOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IGRpZ2l0czogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gNzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmIChuID4gMCkge1xuICAgICAgICAgICAgICAgIGRpZ2l0c1tpXSA9IG4gJSAxMDtcbiAgICAgICAgICAgICAgICBuID0gTWF0aC5mbG9vcihuIC8gMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaWdpdHNbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpZ2l0cztcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgY29tcHV0ZUNSQzE2Q0NJVFQoYnl0ZXNCdWZmZXI6IEJ1ZmZlciwgc2VlZDogbnVtYmVyKTogQnVmZmVyIHtcbiAgICAgICAgY29uc3QgQ1JDX0tFWTEgPSAwbzE3O1xuICAgICAgICBjb25zdCBDUkNfS0VZMiA9IDBvMTAyMDE7XG5cbiAgICAgICAgbGV0IGMgPSBzZWVkO1xuICAgICAgICBsZXQgcSA9IHNlZWQ7XG4gICAgICAgIGxldCBjcmNWYWx1ZSA9IHNlZWQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgyKS5maWxsKDApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYnl0ZXNCdWZmZXIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjID0gYnl0ZXNCdWZmZXJbaV07XG4gICAgICAgICAgICBxID0gKGNyY1ZhbHVlIF4gYykgJiBDUkNfS0VZMTtcbiAgICAgICAgICAgIGNyY1ZhbHVlID0gKGNyY1ZhbHVlID4+IDQpIF4gKHEgKiBDUkNfS0VZMik7XG4gICAgICAgICAgICBxID0gKGNyY1ZhbHVlIF4gKGMgPj4gNCkpICYgQ1JDX0tFWTE7XG4gICAgICAgICAgICBjcmNWYWx1ZSA9IChjcmNWYWx1ZSA+PiA0KSBeIChxICogQ1JDX0tFWTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LndyaXRlVUludDE2QkUoY3JjVmFsdWUsIDApO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYWNrIGFuIGFycmF5IHRvIGFuIE9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqID4gcGFja09iamVjdChbJ2EnLCAnYicsICdjJywgJ2QnXSlcbiAgICAgKiB7IGE6ICdiJywgYzogJ2QnIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHBhY2tPYmplY3QoYXJyYXk6IGFueVtdKTogYW55IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgcmVzdWx0W2FycmF5W2kgLSAxXV0gPSBhcnJheVtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGFuIG9iamVjdCB0byBhbiBhcnJheVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ialxuICAgICAqIEByZXR1cm4ge2FycmF5fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiA+IGNvbnZlcnRPYmplY3RUb0FycmF5KHsgYTogJzEnIH0pXG4gICAgICogWydhJywgJzEnXVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydE9iamVjdFRvQXJyYXkob2JqOiBhbnkpOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgICAgICAgY29uc3Qga2V5czogYW55W10gPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChrZXlzW2ldLCBvYmpba2V5c1tpXV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBtYXAgdG8gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWFwfSBtYXBcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogPiBjb252ZXJ0T2JqZWN0VG9BcnJheShuZXcgTWFwKFtbMSwgJzInXV0pKVxuICAgICAqIFsxLCAnMiddXG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0TWFwVG9BcnJheShtYXA6IE1hcDxhbnksIGFueT4pOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXN1bHRbcG9zXSA9IGtleTtcbiAgICAgICAgICAgIHJlc3VsdFtwb3MgKyAxXSA9IHZhbHVlO1xuICAgICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIHNwbGl0VG9BcnJheShzdHJpbmdOdW1iZXI6IHN0cmluZywgc3BsaXROdW1iZXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gXy5zcGxpdChzdHJpbmdOdW1iZXIsICcsJywgc3BsaXROdW1iZXIpO1xuICAgIH1cbn1cbiJdfQ==