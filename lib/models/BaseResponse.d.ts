import IGamaResponse from './IBaseResponse';
export default class BaseResponse extends IGamaResponse {
    private result;
    constructor(response: any);
    $result: any;
}
