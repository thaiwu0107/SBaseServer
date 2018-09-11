import { controller, httpGet, httpPost, inject, provideNamed, TYPE } from '@ggttoo44/base-server';

import BaseController from '../../models/BaseController';
import BaseResponse from '../../models/BaseResponse';
import IContext from '../../models/IContext';
import Service from './Service';
@provideNamed(TYPE.Controller, 'LoginController')
@controller('/login')
export default class LoginController extends BaseController {
    constructor(
        @inject('LoginServer') private service: Service) { super(); }

    @httpPost('/')
    public async findMsRank(ctx: IContext) {
        const id = ctx.request.body.reqData.id;
        const password = ctx.request.body.reqData.password;
        ctx.body = new BaseResponse(await this.service.loginCheck(id, password));
    }
}
