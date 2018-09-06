import { IHTTPSCA } from '../microServices/APIManager';

export default class CAHttpsContext {
    private static instance = new CAHttpsContext();
    private _ca: any = undefined;
    public static getInstance(): CAHttpsContext {
        return CAHttpsContext.instance;
    }
    public getCA() {
        return CAHttpsContext.instance._ca;
    }
    public initCA(ca: IHTTPSCA | undefined) {
        CAHttpsContext.instance._ca = ca;
    }
}
