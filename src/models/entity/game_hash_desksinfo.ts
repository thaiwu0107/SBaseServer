import { BaseRedisHashZntity } from '@ggttoo44/base-server';
import { GameRedis } from '../../config/GameRedis';
// tslint:disable-next-line:class-name
export class game_hash_desksinfo extends BaseRedisHashZntity {
	public mainFields(): string[] {
		return  [
			'deskStatus', 'deskStart', 'refList_user',
			'refList_userSocket', 'refList_lookSocket',
			'deskPeople', 'seatSpace', 'refList_playUser',
			'nowPlayer', 'dHost', 'dSmall', 'dBig', 'dSmallCost',
			'dBigCost',	'refList_publicPoker', 'refList_weight',
			'refList_win', 'deskMoney', 'refList_peopleCost',
			'refList_peopleAction', 'refList_roundWinPrice',
			'refList_livePeople', 'frontMoney', 'refList_peopleFront',
			'round', 'timeUp', 'totalTime', 'castTime'
		];
	}
	public mainRedisKey(): string {
		return '{game:desk}:hash:desksinfo:';
	}
	public deepFeldsKeys() {
		return {
			refList_user: GameRedis.LIST_USERS_SIT,
			refList_userSocket: GameRedis.LIST_USERS_SOCKET,
			refList_lookSocket: GameRedis.LIST_LOOK_SOCKET,
			refList_playUser: GameRedis.LIST_PLAY_USER,
			refList_publicPoker: GameRedis.LIST_PUBLIC_POKER,
			refList_weight: GameRedis.LIST_WEIGHT,
			refList_win: GameRedis.LIST_WIN,
			refList_peopleCost: GameRedis.LIST_PEOPLE_COST,
			refList_peopleAction: GameRedis.LIST_PEOPLE_ACTION,
			refList_roundWinPrice: GameRedis.LIST_ROUND_WIN_PRICE,
			refList_livePeople: GameRedis.LIST_LIVE_PEOPLE,
			refList_peopleFront: GameRedis.LIST_PEOPLE_FRONT
		};
	}
	public mainRedisType(): string {
		return 'hash';
	}

	public playerRedisKey(): string {
		return '{game:player}:hash:playerinfo:';
	}
	public playerRedisType(): string {
		return 'hash';
	}
	public static readonly playerFields = [
		'table', 'tableSession', 'channelName', 'seat', 'playerID', 'nickName', 'amount', 'betMoney', 'roundBet',
		'refList_poker', 'playerStatus', 'countDown'
	];
	public static readonly playerFieldsKeys = {
		refList_poker: GameRedis.LIST_POKER
	};
	// desk information
	public id: number;
	public deskStatus: number;
    public deskStart: number;
    public refList_user: string;
    public refList_userSocket: any;
	public refList_lookSocket: any;
    public deskPeople: number;
	public seatSpace: number;
    public refList_playUser: any;
	public nowPlayer: number;
    public dHost: number;
    public dSmall: number;
	public dBig: number;
	public dSmallCost: number;
	public dBigCost: number;
	public refList_publicPoker: any;
	public refList_weight: any;
	public refList_win: any;
	public deskMoney: number;
	public refList_peopleCost: any;
	public refList_peopleAction: any;
	public refList_roundWinPrice: any;
	public refList_livePeople: any;
	public frontMoney: number;
	public refList_peopleFront: any;
	public round: number;
	public timeUp: number;
	public totalTime: number;
	public castTime: number;

	// players redis
	public table: number;
	public tableSession: number;
	public channelName: number;
	public seat: number;
	public playerID: number;
	public nickName: number;
	public amount: number;
	public betMoney: number;
	public roundBet: number;
	public refList_poker: string;
	public playerStatus: number;
	public countDown: number;

}
