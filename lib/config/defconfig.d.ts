export declare const isProdEnv: boolean;
export declare const domainName: string;
export interface IJwtconfig {
    active: boolean;
    privateKey: string;
    expired: any;
}
export declare const jwt: IJwtconfig;
export declare const httpPort: number;
export declare const httspPort: number;
export declare const wsPort: number;
export declare const socketPort: number;
export declare const socketsPort: number;
