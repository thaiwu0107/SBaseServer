/**
 * Heart: 心跳 => 背景計時
 * Event: 利用固定的心跳來做額外計時
 * Pulse: 用來紀錄當下心跳的一個flag可以計算已經跳過多少次了
 * @export
 * @class GHeartbeats
 */
export default class GHeartbeats {
    private static instance;
    private hB;
    /**
     * 初始化使用
     * @static
     * @memberof GHeartbeats
     */
    static initialize(): Promise<void>;
    private constructor();
    /**
     * 取得所有已經創建的心跳
     * @static
     * @returns {string[]}
     * @memberof GHeartbeats
     */
    static getAllHeartbeats(): string[];
    /**
     * 用名字取得心跳
     * @static
     * @param {string} name
     * @returns {*}
     * @memberof GHeartbeats
     */
    static getHeartbeatByName(name: string): any;
    /**
     * 取得目前為止這棵心跳的年齡
     *
     * @static
     * @param {string} name
     * @returns {*}
     * @memberof GHeartbeats
     */
    static getHeartbeatAge(name: string): any;
    /**
     * 創造GHeartbeats心跳下一個Pulse可以計算時間距離
     * 使用missedBeats()可以計算出, 當時創造時到目前為止經過的時間(秒)
     * 使用lag() 可以取得真正的時間間隔
     * 使用beat() 可以跟當前心跳同步
     * 使用kill() 刪除這個flag
     * @static
     * @param {string} pulseName
     * @returns {
     *         kill: () => never,
     *         beat: () => never,
     *         missedBeats: number,
     *         lag: number
     *     }
     * @memberof GHeartbeats
     */
    static createPulse(pulseName: string): {
        kill: () => never;
        beat: () => never;
        missedBeats: number;
        lag: number;
    };
    /**
     * 刪除GHeartbeats下指定的pulse
     *
     * @static
     * @param {string} pulseName
     * @returns
     * @memberof GHeartbeats
     */
    static killPulse(pulseName: string): any;
    /**
     * 創造一個循環執行的函數
     * @static
     * @param {number} beatInterval 執行的間隔,單位是秒
     * @param {number} options 執行的次數,如果輸入0就不會停下來
     * @param {(count: number, last: boolean) => any} fun callback的函數  第一個參數是目前已經第幾次,
     * 第二個參數是給予判斷是不是最後一次, 如果options填入0, 那就永遠都不會是true
     * @param {string? } [eventName] 可以選擇要不要賦予它一個名字
     * @returns {{ kill: () => never }} 回傳的event可以選擇使用kill()殺死
     * @memberof GHeartbeats
     */
    static createEvent(beatInterval: number, options: number, fun: (count: number, last: boolean) => any, eventName?: string): {
        kill: () => never;
    };
}
