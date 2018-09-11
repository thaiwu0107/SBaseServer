"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heartbeats = require("heartbeats");
const log4js = require("koa-log4");
const log = log4js.getLogger('GHeartbeats');
/**
 * Heart: 心跳 => 背景計時
 * Event: 利用固定的心跳來做額外計時
 * Pulse: 用來紀錄當下心跳的一個flag可以計算已經跳過多少次了
 * @export
 * @class GHeartbeats
 */
class GHeartbeats {
    constructor() { }
    /**
     * 初始化使用
     * @static
     * @memberof GHeartbeats
     */
    static async initialize() {
        GHeartbeats.instance.hB = heartbeats.createHeart(1000, 'GHeartbeats');
    }
    /**
     * 取得所有已經創建的心跳
     * @static
     * @returns {string[]}
     * @memberof GHeartbeats
     */
    static getAllHeartbeats() {
        return heartbeats.hearts;
    }
    /**
     * 用名字取得心跳
     * @static
     * @param {string} name
     * @returns {*}
     * @memberof GHeartbeats
     */
    static getHeartbeatByName(name) {
        return heartbeats.heart(name);
    }
    // public static killHeartbeatByName(name: string): any {
    //     if (name === 'GHeartbeats') {
    //         throw new LibsExceptions(9001, 'can not kill GHeartbeats');
    //     } else {
    //         heartbeats.heart(name).kill();
    //         return heartbeats.killHeart(name);
    //     }
    // }
    // public static setHeartRate(name: string, rate: number): any {
    //     if (name === 'GHeartbeats') {
    //         throw new LibsExceptions(9001, 'can not setHeartRate GHeartbeats');
    //     } else {
    //         return heartbeats.heart(name).setHeartrate(rate);
    //     }
    // }
    /**
     * 取得目前為止這棵心跳的年齡
     *
     * @static
     * @param {string} name
     * @returns {*}
     * @memberof GHeartbeats
     */
    static getHeartbeatAge(name) {
        return heartbeats.heart(name).age;
    }
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
    static createPulse(pulseName) {
        return heartbeats.heart('GHeartbeats').createPulse(pulseName);
    }
    /**
     * 刪除GHeartbeats下指定的pulse
     *
     * @static
     * @param {string} pulseName
     * @returns
     * @memberof GHeartbeats
     */
    static killPulse(pulseName) {
        return heartbeats.heart('GHeartbeats').pulse(pulseName);
    }
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
    static createEvent(beatInterval, options, fun, eventName) {
        if (eventName) {
            return heartbeats.heart('GHeartbeats').createEvent(beatInterval, { countTo: options, name: eventName }, (count, last) => {
                fun(count, last);
            });
        }
        else {
            return heartbeats.heart('GHeartbeats').createEvent(beatInterval, { countTo: options }, (count, last) => {
                fun(count, last);
            });
        }
    }
}
GHeartbeats.instance = new GHeartbeats();
exports.default = GHeartbeats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0hlYXJ0YmVhdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvR0hlYXJ0YmVhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBR25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUM7Ozs7OztHQU1HO0FBQ0gsTUFBcUIsV0FBVztJQWE1QixnQkFBd0IsQ0FBQztJQVJ6Qjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVO1FBQzFCLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDMUIsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBWTtRQUN6QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELHlEQUF5RDtJQUN6RCxvQ0FBb0M7SUFDcEMsc0VBQXNFO0lBQ3RFLGVBQWU7SUFDZix5Q0FBeUM7SUFDekMsNkNBQTZDO0lBQzdDLFFBQVE7SUFDUixJQUFJO0lBQ0osZ0VBQWdFO0lBQ2hFLG9DQUFvQztJQUNwQyw4RUFBOEU7SUFDOUUsZUFBZTtJQUNmLDREQUE0RDtJQUM1RCxRQUFRO0lBQ1IsSUFBSTtJQUNKOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQVk7UUFDdEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFpQjtRQU12QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFpQjtRQUNyQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FDckIsWUFBb0IsRUFDcEIsT0FBZSxFQUNmLEdBQTBDLEVBQzFDLFNBQWtCO1FBRWxCLElBQUksU0FBUyxFQUFFO1lBQ1gsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQzNELEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ25ELEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7U0FDVjthQUFNO1lBQ0gsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQzNELEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNsQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDOztBQXhIYyxvQkFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFGaEQsOEJBMkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaGVhcnRiZWF0cyBmcm9tICdoZWFydGJlYXRzJztcbmltcG9ydCAqIGFzIGxvZzRqcyBmcm9tICdrb2EtbG9nNCc7XG5pbXBvcnQgeyBMaWJzRXhjZXB0aW9ucyB9IGZyb20gJy4vTGlic0V4Y2VwdGlvbnMnO1xuXG5jb25zdCBsb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKCdHSGVhcnRiZWF0cycpO1xuLyoqXG4gKiBIZWFydDog5b+D6LezID0+IOiDjOaZr+ioiOaZglxuICogRXZlbnQ6IOWIqeeUqOWbuuWumueahOW/g+i3s+S+huWBmumhjeWkluioiOaZglxuICogUHVsc2U6IOeUqOS+hue0gOmMhOeVtuS4i+W/g+i3s+eahOS4gOWAi2ZsYWflj6/ku6XoqIjnrpflt7LntpPot7PpgY7lpJrlsJHmrKHkuoZcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBHSGVhcnRiZWF0c1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHSGVhcnRiZWF0cyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBHSGVhcnRiZWF0cygpO1xuICAgIHByaXZhdGUgaEI6IEdIZWFydGJlYXRzO1xuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW5L2/55SoXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJvZiBHSGVhcnRiZWF0c1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgR0hlYXJ0YmVhdHMuaW5zdGFuY2UuaEIgPSBoZWFydGJlYXRzLmNyZWF0ZUhlYXJ0KDEwMDAsICdHSGVhcnRiZWF0cycpO1xuICAgIH1cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X5omA5pyJ5bey57aT5Ym15bu655qE5b+D6LezXG4gICAgICogQHN0YXRpY1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKiBAbWVtYmVyb2YgR0hlYXJ0YmVhdHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEFsbEhlYXJ0YmVhdHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gaGVhcnRiZWF0cy5oZWFydHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeUqOWQjeWtl+WPluW+l+W/g+i3s1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqIEBtZW1iZXJvZiBHSGVhcnRiZWF0c1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGVhcnRiZWF0QnlOYW1lKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBoZWFydGJlYXRzLmhlYXJ0KG5hbWUpO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgc3RhdGljIGtpbGxIZWFydGJlYXRCeU5hbWUobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAvLyAgICAgaWYgKG5hbWUgPT09ICdHSGVhcnRiZWF0cycpIHtcbiAgICAvLyAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyg5MDAxLCAnY2FuIG5vdCBraWxsIEdIZWFydGJlYXRzJyk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBoZWFydGJlYXRzLmhlYXJ0KG5hbWUpLmtpbGwoKTtcbiAgICAvLyAgICAgICAgIHJldHVybiBoZWFydGJlYXRzLmtpbGxIZWFydChuYW1lKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBwdWJsaWMgc3RhdGljIHNldEhlYXJ0UmF0ZShuYW1lOiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IGFueSB7XG4gICAgLy8gICAgIGlmIChuYW1lID09PSAnR0hlYXJ0YmVhdHMnKSB7XG4gICAgLy8gICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoOTAwMSwgJ2NhbiBub3Qgc2V0SGVhcnRSYXRlIEdIZWFydGJlYXRzJyk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gaGVhcnRiZWF0cy5oZWFydChuYW1lKS5zZXRIZWFydHJhdGUocmF0ZSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X55uu5YmN54K65q2i6YCZ5qO15b+D6Lez55qE5bm06b2hXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAbWVtYmVyb2YgR0hlYXJ0YmVhdHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEhlYXJ0YmVhdEFnZShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gaGVhcnRiZWF0cy5oZWFydChuYW1lKS5hZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWJtemAoEdIZWFydGJlYXRz5b+D6Lez5LiL5LiA5YCLUHVsc2Xlj6/ku6XoqIjnrpfmmYLplpPot53pm6JcbiAgICAgKiDkvb/nlKhtaXNzZWRCZWF0cygp5Y+v5Lul6KiI566X5Ye6LCDnlbbmmYLlibXpgKDmmYLliLDnm67liY3ngrrmraLntpPpgY7nmoTmmYLplpMo56eSKVxuICAgICAqIOS9v+eUqGxhZygpIOWPr+S7peWPluW+l+ecn+ato+eahOaZgumWk+mWk+malFxuICAgICAqIOS9v+eUqGJlYXQoKSDlj6/ku6Xot5/nlbbliY3lv4Pot7PlkIzmraVcbiAgICAgKiDkvb/nlKhraWxsKCkg5Yiq6Zmk6YCZ5YCLZmxhZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHVsc2VOYW1lXG4gICAgICogQHJldHVybnMge1xuICAgICAqICAgICAgICAga2lsbDogKCkgPT4gbmV2ZXIsXG4gICAgICogICAgICAgICBiZWF0OiAoKSA9PiBuZXZlcixcbiAgICAgKiAgICAgICAgIG1pc3NlZEJlYXRzOiBudW1iZXIsXG4gICAgICogICAgICAgICBsYWc6IG51bWJlclxuICAgICAqICAgICB9XG4gICAgICogQG1lbWJlcm9mIEdIZWFydGJlYXRzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQdWxzZShwdWxzZU5hbWU6IHN0cmluZyk6IHtcbiAgICAgICAga2lsbDogKCkgPT4gbmV2ZXIsXG4gICAgICAgIGJlYXQ6ICgpID0+IG5ldmVyLFxuICAgICAgICBtaXNzZWRCZWF0czogbnVtYmVyLFxuICAgICAgICBsYWc6IG51bWJlclxuICAgIH0ge1xuICAgICAgICByZXR1cm4gaGVhcnRiZWF0cy5oZWFydCgnR0hlYXJ0YmVhdHMnKS5jcmVhdGVQdWxzZShwdWxzZU5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKrpmaRHSGVhcnRiZWF0c+S4i+aMh+WumueahHB1bHNlXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHB1bHNlTmFtZVxuICAgICAqIEByZXR1cm5zXG4gICAgICogQG1lbWJlcm9mIEdIZWFydGJlYXRzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBraWxsUHVsc2UocHVsc2VOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGhlYXJ0YmVhdHMuaGVhcnQoJ0dIZWFydGJlYXRzJykucHVsc2UocHVsc2VOYW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Ym16YCg5LiA5YCL5b6q55Kw5Z+36KGM55qE5Ye95pW4XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiZWF0SW50ZXJ2YWwg5Z+36KGM55qE6ZaT6ZqULOWWruS9jeaYr+enklxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zIOWft+ihjOeahOasoeaVuCzlpoLmnpzovLjlhaUw5bCx5LiN5pyD5YGc5LiL5L6GXG4gICAgICogQHBhcmFtIHsoY291bnQ6IG51bWJlciwgbGFzdDogYm9vbGVhbikgPT4gYW55fSBmdW4gY2FsbGJhY2vnmoTlh73mlbggIOesrOS4gOWAi+WPg+aVuOaYr+ebruWJjeW3sue2k+esrOW5vuasoSxcbiAgICAgKiDnrKzkuozlgIvlj4PmlbjmmK/ntabkuojliKTmlrfmmK/kuI3mmK/mnIDlvozkuIDmrKEsIOWmguaenG9wdGlvbnPloavlhaUwLCDpgqPlsLHmsLjpgaDpg73kuI3mnIPmmK90cnVlXG4gICAgICogQHBhcmFtIHtzdHJpbmc/IH0gW2V2ZW50TmFtZV0g5Y+v5Lul6YG45pOH6KaB5LiN6KaB6LOm5LqI5a6D5LiA5YCL5ZCN5a2XXG4gICAgICogQHJldHVybnMge3sga2lsbDogKCkgPT4gbmV2ZXIgfX0g5Zue5YKz55qEZXZlbnTlj6/ku6Xpgbjmk4fkvb/nlKhraWxsKCnmrrrmrbtcbiAgICAgKiBAbWVtYmVyb2YgR0hlYXJ0YmVhdHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUV2ZW50KFxuICAgICAgICBiZWF0SW50ZXJ2YWw6IG51bWJlcixcbiAgICAgICAgb3B0aW9uczogbnVtYmVyLFxuICAgICAgICBmdW46IChjb3VudDogbnVtYmVyLCBsYXN0OiBib29sZWFuKSA9PiBhbnksXG4gICAgICAgIGV2ZW50TmFtZT86IHN0cmluZ1xuICAgICk6IHsga2lsbDogKCkgPT4gbmV2ZXIgfSB7XG4gICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBoZWFydGJlYXRzLmhlYXJ0KCdHSGVhcnRiZWF0cycpLmNyZWF0ZUV2ZW50KGJlYXRJbnRlcnZhbCxcbiAgICAgICAgICAgICAgICB7IGNvdW50VG86IG9wdGlvbnMsIG5hbWU6IGV2ZW50TmFtZSB9LCAoY291bnQsIGxhc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZnVuKGNvdW50LCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBoZWFydGJlYXRzLmhlYXJ0KCdHSGVhcnRiZWF0cycpLmNyZWF0ZUV2ZW50KGJlYXRJbnRlcnZhbCxcbiAgICAgICAgICAgICAgICB7IGNvdW50VG86IG9wdGlvbnMgfSwgKGNvdW50LCBsYXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bihjb3VudCwgbGFzdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=