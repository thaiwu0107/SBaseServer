// tslint:disable:ban-types
export function socketEvent(event: string) {
    return (target: Function, key: string, descriptor: any) => {
        return {
            // value(...args: any[]) {  // args 是指 doubleNumber 的參數，也就是 input
            //     const fooParameter = args.map((a) => JSON.stringify(a)).join();
            //     const result = descriptor.value.apply(this, args);  // 就是執行 doubleNumber 這個 method 後，會得到的值
            //     console.log(`Call: ${key}(${fooParameter}) => ${result}`); // Call: doubleNumber(5) => 10
            //     return result;
            // }
        };
    };
}
