import 'reflect-metadata';
export default class RedisManger {
    private redis;
    set(k: string, v: any, ex?: number): Promise<string | 0 | 1>;
    get(k: string): Promise<string>;
    incr(k: string): Promise<number>;
    getMatchKeys(match?: string, perElements?: number): Promise<string[]>;
}
