import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';

export default abstract class IBaseResponse {
    protected status: BaseHttpStatusCode = BaseHttpStatusCode.STATUS_OK;

    public set $status(value: BaseHttpStatusCode) {
        this.status = value;
    }
    public get $status() {
        return this.status;
    }
}
