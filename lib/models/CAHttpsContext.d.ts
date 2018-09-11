import { IHTTPSCA } from '../microServices/APIManager';
export default class CAHttpsContext {
    private static instance;
    private _ca;
    static getInstance(): CAHttpsContext;
    getCA(): any;
    initCA(ca: IHTTPSCA | undefined): void;
}
