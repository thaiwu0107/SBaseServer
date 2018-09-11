export default abstract class BaseRedisHashZntity {
    private baseZntityId;
    getBaseZntityId(): any;
    setBaseZntityId(id: any): void;
    abstract mainFields(): string[];
    abstract mainRedisKey(): string;
    abstract deepFeldsKeys(): any;
    abstract mainRedisType(): string;
    execDeleteAll(id: number): Promise<void>;
    /**
     * 如果要更新的資料太多,可以使用這個
     * 用法就是塞數值之後,會再去判斷有沒有值在幫你塞數值
     * !!!注意第二層的資料是不會幫你處理的,會直接跳過
     * 要處理第二層資料就要自己對redis處理
     * @param {number} id
     * @memberof BaseRedisHashZntity
     */
    execUpdateRedis(id: number): Promise<void>;
    /**
     * 初始化專用,如果要把資料完整清除在初始化可以用這個
     * @param {number} id
     * @param {*} source
     * @memberof BaseRedisHashZntity
     */
    execReuseRedis(id: number, source: any): Promise<void>;
}
