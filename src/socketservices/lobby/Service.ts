import { inject, provide } from '@ggttoo44/base-server';
import * as _ from 'lodash';
import 'reflect-metadata';
import BaseService from '../../models/BaseService';
import Repository from './Repository';

@provide('LobbyServer')
export default class LobbyServer extends BaseService {
	constructor(@inject('LobbyRepository') private repository: Repository) { super(); }

	/*
     *
     * desksSession: uuidv4
	 * deskstatus: 0,//牌桌是否已開始
	 * deskstart:10, //開桌前倒數
	 * user:uuidv4: [null,null,null,null,null,null,null,null,null], //玩家資訊	0 1 2 3 4 5 6 7 8 9 按照座位放入資訊
	 * usersocket:[null,null,null,null,null,null,null,null,null], //
	 * lookSocket:[],//在這房間的人
	 * deskpeople: 0,//目前玩家數量
	 * seatspace: 9,//位置空間
	 * playuser:[],//玩家輪流順續
	 * nowplayer:-1,//目前要決定動作的玩家
	 * dhost:null,//莊家
	 * dsmall:null,//小忙
	 * dbig:null,//大忙
	 * dsmallcost:	50,//小忙注金額
	 * dbigcost:100	,//大忙注金額
	 * heightbet:50000,//籌碼
	 * betnow:null ,//押注金額
	 * publicpoker :[] ,//公牌
	 * weight:	[0,0,0,0,0,0,0,0,0],//看誰分數高低決定輸贏
	 * desktop: 80000,//這桌最高攜帶金額
	 * deskdown: 1000,//這桌最低攜帶金額
	 * win :[], //誰贏的勝利
	 * deskmoney:0,//目前押注金額
	 * peoplecost:[0,0,0,0,0,0,0,0,0],//誰押了多少
	 * peopleatcion:[100,100,100,100,100,100,100,100,100],//每個人的狀態
	 * roundwinprice:[0,0,0,0,0,0,0,0,0],//這輪分PA 在座各位拿多少
	 * livePeople:[]//剩下誰	livePeople=[2,4,6]
	 * frontmoney:100,
	 * moneyPool:[],
	 * poolCount:[];//計算錢池數量
	 * peoplefront:[0,0,0,0,0,0,0,0,0],//每個人這輪壓多少
	 * round: 0,	//目前倫數
	 * timeup:5 //計算時間
	 *
	 * game:hash:desksinfo:?
	 * {
	 * 		player: 9,
	 * 		dhost: 0,
	 * 		dsmall: 0,
	 * 		refList_user: game:list:desksuser:1
	 * }
     */
	public async lobbyLoginCheck(token): Promise<any> {
		// const sql = 'SELECT UM_No, UM_Account, UM_Token, UM_Vip, UM_NickName  FROM user WHERE UM_Token = ?';
		// const result = await MysqlContext.getInstance().getMysqlPool().query(sql, [token]);

		// const u16 = new Int16Array([0, 444, 789, 89, 12, 45646466645654]);
		// console.log(u16);
		// console.log(u16.values());
		// if (_.size(result[0]) === 1) {
		// 	return{
		// 		no : result[0][0].UM_No,
		// 		account : result[0][0].UM_Account,
		// 		token : result[0][0].UM_Token,
		// 		vip : result[0][0].UM_Vip,
		// 		nickname : result[0][0].UM_NickName
		// 	};
		// } else {
		// 	throw new Exceptions(8001, 'Token fail');
		// }
	}

	public async checkDesk(): Promise<any> {
		// const deskInfo = [];
	}

	public async openMall(): Promise<any> {
		//
	}

}
