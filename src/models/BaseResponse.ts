import { BaseResponse } from '@ggttoo44/base-server';
import Success from './Success';

export default class BResponse extends BaseResponse {

    constructor(response: any) {
        super(response);
        if (response instanceof Success) {
            this.$result = response.message;
        }
    }
}
