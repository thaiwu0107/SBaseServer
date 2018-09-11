import { controller, httpGet, httpPost, inject, provideNamed, TYPE } from '@ggttoo44/base-server';

import BaseController from '../../models/BaseController';
import BaseResponse from '../../models/BaseResponse';
import IContext from '../../models/IContext';
import Service from './Service';
@provideNamed(TYPE.Controller, 'LeaveController')
@controller('/leave')
export default class LeaveController extends BaseController {
    constructor(
        @inject('LeaveServer') private service: Service) { super(); }

    @httpPost('/')
    public async closeDesk(ctx: IContext) {
        const deskID = ctx.request.body.reqData.id;
        const sessionId = ctx.request.body.reqData.sessionId;
        await this.service.leave(deskID, sessionId);
    }
}
