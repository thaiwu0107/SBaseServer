
export class GameRedis {
	public static readonly HASH_DESKINFO = '{game:desk}:hash:desksinfo:';
	public static readonly LIST_USERS_SIT = '{game:desk}:list:usersit:';
	public static readonly LIST_USERS_SOCKET = '{game:desk}:list:playingPlayer:';
	public static readonly LIST_LOOK_SOCKET = '{game:desk}:list:lookPlayer:';
	public static readonly LIST_PLAY_USER = '{game:desk}:list:playUser:';
	public static readonly LIST_PUBLIC_POKER = '{game:desk}:list:publicPoker:';
	public static readonly LIST_WEIGHT = '{game:desk}:list:weight:';
	public static readonly LIST_WIN = '{game:desk}:list:win:';
	public static readonly LIST_PEOPLE_COST = '{game:desk}:list:peopleCost:';
	public static readonly LIST_PEOPLE_ACTION = '{game:desk}:list:peopleAction:';
	public static readonly LIST_ROUND_WIN_PRICE = '{game:desk}:list:roundWinPrice:';
	public static readonly LIST_LIVE_PEOPLE = '{game:desk}:list:livePeople:';
	public static readonly LIST_PEOPLE_FRONT = '{game:desk}:list:peopleFront:';

	public static readonly HASH_PLAYERINFO = '{game:player}:hash:playerinfo:';
	public static readonly LIST_POKER = '{game:player}:list:poker:';
	public static readonly DESK_PLAYING = '{game:desk}:list:deskPlaying';
}
