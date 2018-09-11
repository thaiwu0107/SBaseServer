import { controller, httpGet, httpPost, inject, provideNamed, TYPE } from '@ggttoo44/base-server';

import BaseController from '../../models/BaseController';
import BaseResponse from '../../models/BaseResponse';
import IContext from '../../models/IContext';
import Service from './Service';
@provideNamed(TYPE.Controller, 'TestController')
@controller('/test')
export default class TestController extends BaseController {
    constructor(
        @inject('TestServer') private service: Service) { super(); }

    @httpPost('/')
    public async findMsRank(ctx: IContext) {
        const playID = ctx.request.body.reqData.playID;
        const deskID = ctx.request.body.reqData.deskID;
        ctx.body = new BaseResponse(await this.service.test(deskID, playID));
    }
}
