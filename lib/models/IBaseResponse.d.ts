import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
export default abstract class IBaseResponse {
    protected status: BaseHttpStatusCode;
    $status: BaseHttpStatusCode;
}
