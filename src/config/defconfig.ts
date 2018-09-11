export const isProdEnv: boolean = process.env.NODE_ENV === 'production';

export const domainName: string = ''; // '/APServer'

export interface IJwtconfig {
    active: boolean;
    privateKey: string;
    expired: any;
}
export const jwt: IJwtconfig = {
    active: true,
    privateKey: 'arcadia.net_backend.server',
    expired: '10y' // Eg: 60, "2 days", "10h", "7d", "200y"
};
// listen port
export const httpPort: number = 3000;
export const httspPort: number = 4000;
export const wsPort: number = 3331;
export const socketPort: number = 3331;
export const socketsPort: number = 4331;
