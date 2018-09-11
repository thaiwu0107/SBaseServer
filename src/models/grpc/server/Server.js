const Mali = require('mali');
const path = require('path');
const data =require('./DataName');
const PROTO_PATH = path.join(__dirname, '..', 'bac.proto');
const HOSTPORT = '127.0.0.1:50051';
const poker = data.poker;
function countWeight(ctx) {
	let card =ctx.req.name;
	card.sort(function(a,b){return a-b;});
	let Royalflush = [0,0,0,0];//皇家同花順計算
	let fCount =[0,0,0,0];//同花數量計算	
	let reData =[];
	let weight=0; 
	const cards = card;
	// console.log(card);
	// console.log(cards);
	Royalflush =countRoyalflush(card);

	fCount = countSuit(cards);

	reData = Royal_Straight_Flush(reData,Royalflush);

	reData = Straight_Flush(reData,card);

	let cardase = card;

	cardase = AcetoOne(cardase);

	reData = Straight_Flush_BeginOne(reData , card ,cardase);

	let nocolor = changeNoColor(card);

	Four_of_a_kind(reData,card,nocolor);

	reData = Flush(reData,card,fCount);

	reData = Full_house(reData,nocolor);

	reData = Straight(reData,nocolor);
	
	reData = Three_of_a_kind(reData,nocolor);

	reData = Two_pair(reData,nocolor);
	
	reData = One_pair(reData,nocolor);

	reData = Zitch(reData,nocolor);

	ctx.res = {results:reData};
	
}
function countRoyalflush(card){
	console.log('countRoyalflush');
	let Royalflush = [0,0,0,0];//皇家同花順計算
	for(var i =0; i <card.length ; i++){
		let Royalflush=[];
		if(card[i]==poker.Club_Ten || card[i]==poker.Club_Eleven || card[i]==poker.Club_Twelve || card[i]==poker.Club_Thirteen || card[i]==poker.Club_Ace) //[10 11 12 13 14]
		  Royalflush[0]++;
		else if(card[i]==poker.Diamond_Ten || card[i]==poker.Diamond_Eleven || card[i]==poker.Diamond_Twelve || card[i]==poker.Diamond_Thirteen || card[i]==poker.Diamond_Ace)
		  Royalflush[1]++;
		else if(card[i]==poker.Heart_Ten || card[i]==poker.Heart_Eleven || card[i]==poker.Heart_Twelve || card[i]==poker.Heart_Thirteen || card[i]==poker.Heart_Ace)
		  Royalflush[2]++;
		else if(card[i]==poker.Spade_Ten || card[i]==poker.Spade_Eleven || card[i]==poker.Spade_Twelve || card[i]==poker.Spade_Thirteen || card[i]==poker.Spade_Ace)
		  Royalflush[3]++;
	}
	return Royalflush;
}
function  countSuit(cards){
	console.log('countSuit');
	let fCount =[0,0,0,0];//同花數量計算
	for(var i =0; i <cards.length ; i++){
		if(cards[i] >= poker.Club_Two && cards[i] <= poker.Club_Ace)  //同花數量統計
		  fCount[0]++;
		else if(cards[i] >= poker.Diamond_Two && cards[i] <= poker.Diamond_Ace)
		  fCount[1]++;
		else if(cards[i] >= poker.Heart_Two && cards[i] <= poker.Heart_Ace)
		  fCount[2]++;
		else if(cards[i] >= poker.Spade_Two && cards[i] <= poker.Spade_Ace)
		  fCount[3]++; 
	}
	return fCount;	
}
function AcetoOne(cardase){
	for(var i=0; i<cardase.length; i++) {
		if(cardase[i]==poker.Club_Ace || cardase[i]==poker.Diamond_Ace || cardase[i]==poker.Heart_Ace || cardase[i]==poker.Spade_Ace)  //將A改為1
			cardase[i] -= poker.Ace_Become_One;
	}
	return cardase;
}
function changeNoColor(card){
	let nocolor=[];
	for(var i=0; i<card.length; i++)
		nocolor.push((card[i]%poker.Eliminate_Color));
	nocolor.sort(function(a,b) { return a-b; }); //排序 從小到大
	return nocolor;

}
function Royal_Straight_Flush(reData,Royalflush){
	for(var i =0;i<Royalflush.length;i++){
		if(Royalflush[i] >=5){
			weight =poker.Royal_Straight_Flush;
			reData.push({weight :weight ,cardType: 'Royal Straight Flush'});
			return reData;
		}
	}
	reData=[];
	return reData; 
}
function Straight_Flush(reData,card){
	if(reData.length !=0){
		return reData;
	}
	for(var i=card.length-1; i>=4; i--) {  //有7張牌 所以一次五張五張比
		if(card[i]==card[i-poker.Next_Poker]+poker.Poker_Card_Plus_One && card[i]==card[i-poker.Next_Two_Poker]+poker.Poker_Card_Plus_Two && card[i]==card[i-poker.Next_Three_Poker]+poker.Poker_Card_Plus_Three && card[i]==card[i-poker.Next_Four_Poker]+poker.Poker_Card_Plus_Four) { 
			weight =poker.Straight_Flush + (card[i] % poker.Eliminate_Color); //因為不比花色 但是同樣是同花時 要比最大數字
			reData.push({weight :weight ,cardType: 'Straight Flush'});
			return reData; 
		}
	}
	return []; 
}
function Straight_Flush_BeginOne(reData , card ,cardase ){
	if(reData.length !=0){
		return reData;
	}
	for(var i=card.length-1; i>=4; i--) {  
		if(card[i]==card[i-poker.Next_Poker]+poker.Poker_Card_Plus_One && card[i]==card[i-poker.Next_Two_Poker]+poker.Poker_Card_Plus_Two && card[i]==card[i-poker.Next_Three_Poker]+poker.Poker_Card_Plus_Three && card[i]==card[i-poker.Next_Four_Poker]+poker.Poker_Card_Plus_Four) { 
		  weight = poker.Straight_Flush + (cardase[i] % poker.Eliminate_Color);//因為不比花色 但是同樣是同花時 要比最大數字
			reData.push({weight :weight ,cardType: 'Straight Flush'});
			return reData; 		  
		}
	 }
	 return [];
}
function Four_of_a_kind(reData,card,nocolor){
	if(reData.length !=0){
		return reData;
	}
	for(var i=0; i<4; i++) {  //有7張牌 所以一次五張五張比
		if(nocolor[i]==nocolor[i+poker.Next_Poker] && nocolor[i]==nocolor[i+poker.Next_Two_Poker] && nocolor[i]==nocolor[i+poker.Next_Three_Poker]) {   //判斷 有沒有四個一樣
			for(var j=nocolor.length-1; j>=0; j--) {  //如果是公牌 要找 私牌最大的
				if(nocolor[j] != nocolor[i]) {
					weight = poker.Four_Of_A_Kind + (nocolor[i] * poker.Four_Of_A_Kind_Number_Weight) + nocolor[j];  //基數70000000 + 鐵支牌數字*100 + 第五張最大牌數字
					reData.push({weight :weight ,cardType: 'Four of a kind'}); 
					return reData;				
				}
			}
		}
	}
	return [];
}
function Flush(reData,card,fCount){
	if(reData.length !=0){
		return reData;
	}
	var fStart = [2,22,42,62];  //四種花色開始編號
	var fEnd = [14,34,54,74];   //四種花色結束編號
	var cc5 = 0;  //紀錄第幾張(大到小)
	weight = poker.Flush;	
	for(var i=0; i<4; i++) {
		if(fCount[i]>=5) {  //該花色有五張以上, fCount 一開始在大同花順那邊有統計好了
			for(var j=card.length-1; j>=0; j--) {  //查看7張牌

				if(card[j] >= fStart[i] && card[j] <= fEnd[i]) {
					if(cc5>4)  //第六、七張不用統計
						break;
					weight += (card[j]%poker.Eliminate_Color) * poker.Flush_Weight[cc5];  //基數6000000 + 三條數字*100 + 一對數字
					cc5++;
				}
			}
			reData.push({weight :weight ,cardType: 'Flush'}); 
			return reData;
		}
	}
	return [];
}
function Full_house(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}
	for(var i=nocolor.length-1; i>=2; i--) {  //7張牌所以掃五次
		if(nocolor[i]==nocolor[i-poker.Next_Poker] && nocolor[i]==nocolor[i-poker.Next_Two_Poker]) {  //判斷 有沒有三個一樣
			for(var j=nocolor.length-1; j>=1; j--) {  //找最大的一對
				if(nocolor[j]!=nocolor[i] && nocolor[j]==nocolor[j-1]) {
					weight = poker.Full_House + (nocolor[i] * poker.Full_House_Weight) + nocolor[j];  //基數60000000 + 三條數字*10000000 + 一對數字
					reData.push({weight :weight ,cardType: 'Full house'});
					return reData; 					
				}
			}
		}
	}
	return [];
}
function Straight(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}
	var cardFlush = [];   //不管花色 編號 2~14 並去除重複
	var cardFlush2 = [];  //不管花色 編號 1~13 並去除重複
	for(var i=0; i<nocolor.length; i++) {
		if(cardFlush.indexOf(nocolor[i]) < 0) //清除 陣列重複數字
			cardFlush.push(nocolor[i]);
	}	
	cardFlush.sort(function(a,b) { return a-b; });
	for(var i=0; i<cardFlush.length; i++) {
		if(cardFlush[i] == 14){
			cardFlush2.push(1);
		}else
			cardFlush2.push(cardFlush[i]);
	}	
	cardFlush2.sort(function(a,b) { return a-b; });
	//這跟判斷同花順一樣
	for(var i=cardFlush.length-1; i>=4; i--) {  //掃牌 - A編號14時
		if(cardFlush[i]==cardFlush[i-poker.Next_Poker]+poker.Poker_Card_Plus_One && cardFlush[i]==cardFlush[i-poker.Next_Two_Poker]+poker.Poker_Card_Plus_Two && cardFlush[i]==cardFlush[i-poker.Next_Three_Poker]+poker.Poker_Card_Plus_Three && cardFlush[i]==cardFlush[i-poker.Next_Four_Poker]+poker.Poker_Card_Plus_Four) {  //A編號14時
			weight = poker.Straight + cardFlush[i];
			reData.push({weight :weight ,cardType: 'Straight'}); 
			return reData; 			
		}
	}
	for(var i=cardFlush2.length-1; i>=4; i--) {  //掃牌 - A編號1時
		if(cardFlush[i]==cardFlush[i-poker.Next_Poker]+poker.Poker_Card_Plus_One && cardFlush[i]==cardFlush[i-poker.Next_Two_Poker]+poker.Poker_Card_Plus_Two && cardFlush[i]==cardFlush[i-poker.Next_Three_Poker]+poker.Poker_Card_Plus_Three && cardFlush[i]==cardFlush[i-poker.Next_Four_Poker]+poker.Poker_Card_Plus_Four) {  //A編號1時
			weight = poker.Straight + cardFlush2[i];
			reData.push({weight :weight ,cardType: 'Straight'});
			return reData; 				
		}
	}
	return [];
}
function Three_of_a_kind(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}
	for(var i=nocolor.length; i>=2; i--) {  //7張牌所以掃五次
		if(nocolor[i]==nocolor[i-1] && nocolor[i]==nocolor[i-2]) {  //是三條
		weight = poker.Three_Of_A_kind + (nocolor[i]*10000000);  //基數 + 3條
		var count = 0;
			for(var j=nocolor.length-1; j>=0; j--) {  //找出第四、五張最大的撲克牌
					if(nocolor[j] != nocolor[i]) {
					weight += nocolor[j] * poker.Three_Of_A_kind_Weight[count];  //基數70000000 + 鐵支牌數字*100 + 第五張最大牌數字
					count++;
				}
			if(count >= 2)
			  break;
			}
			reData.push({weight :weight ,cardType: 'Three of a kind'}); 
			return reData; 			
		}
	}
	return [];
}
function Two_pair(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}	
	var nowPair = 0;  //目前是第幾對
	var tPair = [0,0];    //第一、二對編號值
	for(var i=nocolor.length; i>=1; i--) {
		if(nocolor[i]==nocolor[i-1]) {
		nowPair++;
		if(nowPair == 1) {  //第一對
			// console.log('weight two pair'+nocolor[i]);
			weight = poker.Two_Pair + (nocolor[i]*poker.One_Pair_Score);  //基數 + 第一對
			tPair[0] = nocolor[i];
		}	else if(nowPair == 2) {
				weight += nocolor[i]*poker.Two_Pair_Score;  //+ 第二對
				tPair[1] = nocolor[i];
				for(var j=nocolor.length-1; j>=0; j--) {  //找出五張最大的撲克牌
					if(tPair.indexOf(nocolor[j]) < 0) {
						weight += nocolor[j];  //+ 第五張最大牌數字
						reData.push({weight :weight ,cardType: 'Two pair'}); 
						return reData; 	
					}
				}
			}
		}
	}
	return [];
}
function One_pair(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}	
	weight = poker.One_Pair + (nocolor[i]*poker.One_Pair_Score);  //基數 + 一對
	var count = 0;  
	for(var i=nocolor.length; i>=1; i--) {
		if(nocolor[i]==nocolor[i-1]) {
			for(var j=nocolor.length-1; j>=0; j--) {  //找出第三、四、五張最大的撲克牌
			if(nocolor[j] != nocolor[i]) {
				weight += nocolor[j] * poker.One_Pair_Weight[count];
				count++;
			}
			if(count >= 3)
				break;
			}
			reData.push({weight :weight ,cardType: 'One pair'}); 
			return reData; 	
		}
	}
	return [];	
}
function Zitch(reData,nocolor){
	if(reData.length !=0){
		return reData;
	}		
	weight = 0;
	var count = 0;
	for(var i=nocolor.length-1; i>=2; i--) {  //找出第三、四、五張最大的撲克牌
		weight += nocolor[i] * poker.Zitch_Weight[count];
		count++;
	}
	reData.push({weight :weight ,cardType: 'Zitch'});
	return reData; 	
}



function main() {
    const app = new Mali(PROTO_PATH, 'Greeter');
    app.use({
		countWeight
    })
    app.start(HOSTPORT);
    console.log(`Greeter service running @ ${HOSTPORT}`);
}

main();