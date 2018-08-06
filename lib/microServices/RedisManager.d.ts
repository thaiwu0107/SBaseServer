import 'reflect-metadata';
export default class RedisManger {
    private redis;
    private constructor();
    set(k: string, v: any, ex?: number): Promise<any>;
    get(k: string): Promise<any>;
    incr(k: string): Promise<any>;
}
