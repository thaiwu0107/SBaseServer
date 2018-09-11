-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1:3306
-- 產生時間： 2018 年 09 月 03 日 07:13
-- 伺服器版本: 5.7.21
-- PHP 版本： 7.2.4
-- Schema version 0.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `porkerdb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `game_rule_mapping`
--

DROP TABLE IF EXISTS `game_rule_mapping`;
CREATE TABLE IF NOT EXISTS `game_rule_mapping` (
  `name` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '英文簡寫(T、N、P、O)',
  `description` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '描述(Teen Patti、NLH、PLO、OFG)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='遊戲類別';

--
-- 資料表的匯出資料 `game_rule_mapping`
--

INSERT INTO `game_rule_mapping` (`name`, `description`) VALUES
('T', 'Teen Patti'),
('N', 'NLH'),
('O', 'PLO'),
('P', 'OFG');

-- --------------------------------------------------------

--
-- 資料表結構 `nlh_rule`
--

DROP TABLE IF EXISTS `nlh_rule`;
CREATE TABLE IF NOT EXISTS `nlh_rule` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '流水號(規則代號)',
  `tc_uuid` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'uuid',
  `tc_sb` decimal(10,0) NOT NULL COMMENT '小盲注(small blind)',
  `tc_bb` decimal(10,0) NOT NULL COMMENT '大盲注(big blind)',
  `tc_minbet` decimal(10,0) NOT NULL COMMENT '最低攜入籌碼',
  `tc_maxbet` decimal(10,0) NOT NULL COMMENT '最高攜入籌碼',
  `tc_sec` tinyint(4) NOT NULL COMMENT '思考秒數',
  `tc_seat` tinyint(4) NOT NULL COMMENT '幾人桌(2, 6, 9)',
  `tc_multdeal` tinyint(1) DEFAULT '0' COMMENT '發多次牌',
  `tc_insurance` tinyint(1) DEFAULT '0' COMMENT '保險',
  `tc_rake` tinyint(4) DEFAULT '1' COMMENT '佣金/抽水/服務費 %數',
  `tc_toprake` float DEFAULT '0.5' COMMENT '封頂',
  `tc_buyin` tinyint(1) DEFAULT '0' COMMENT '是否買入',
  `tc_gps` tinyint(1) DEFAULT '0' COMMENT 'GPS',
  `tc_ip` tinyint(1) DEFAULT '0' COMMENT 'IP',
  `tc_table_time` float DEFAULT NULL COMMENT '總時長',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='賭桌設定';

-- --------------------------------------------------------

--
-- 資料表結構 `player_record`
--

DROP TABLE IF EXISTS `player_record`;
CREATE TABLE IF NOT EXISTS `player_record` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '流水號',
  `um_account` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '玩家ID (UM_Account)',
  `sr_id` int(11) NOT NULL COMMENT '牌局號(session_record.id)',
  `rs_id` tinyint(4) NOT NULL COMMENT '狀態(round_status.id)',
  `pr_hands_bet` decimal(10,0) NOT NULL COMMENT '玩家手上原有的籌碼',
  `pr_player` tinyint(1) NOT NULL COMMENT '是否是玩家或賭桌(1:玩家 0:賭桌)',
  `pr_character` tinyint(4) DEFAULT NULL COMMENT '普通玩家(0)/莊家(1)/小盲注(2)/大盲注(3)',
  `pr_seat` smallint(6) DEFAULT NULL COMMENT '座位',
  `pr_hands` json NOT NULL COMMENT '手牌',
  `pr_proportion` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '比重',
  `pr_sec` tinyint(4) DEFAULT NULL COMMENT '玩家實際思考秒數',
  `pr_blinds` decimal(10,0) NOT NULL COMMENT '翻牌前(pre-flop)下注金額',
  `pr_action` tinyint(1) DEFAULT NULL COMMENT '是否棄牌、加注、跟注',
  `pr_raise` decimal(10,0) DEFAULT NULL COMMENT '加注總金額',
  `pr_bet` decimal(10,0) DEFAULT NULL COMMENT '賭注總額',
  `pr_insurance` mediumint(9) DEFAULT NULL COMMENT '保險籌碼',
  `pr_showdown` tinyint(1) DEFAULT NULL COMMENT '是否攤牌',
  `pr_won_hand` tinyint(1) NOT NULL COMMENT '是否獲勝',
  `pr_win` decimal(10,0) DEFAULT NULL COMMENT '輸贏多少籌碼',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='玩家歷史紀錄';

-- --------------------------------------------------------

--
-- 資料表結構 `round_status`
--

DROP TABLE IF EXISTS `round_status`;
CREATE TABLE IF NOT EXISTS `round_status` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '流水號(狀態號)',
  `rs_description` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '狀態說明 {\n  "0": ''pre-flop'',\n  "1": ''flop'',\n  "2": ''turn'',\n  "3": ''river'',\n  "4": ''unusual''\n}',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='狀態';

--
-- 資料表的匯出資料 `round_status`
--

INSERT INTO `round_status` (`id`, `rs_description`) VALUES
(1, 'pre-flop'),
(2, 'flop'),
(3, 'turn'),
(4, 'river'),
(5, 'unusual');

-- --------------------------------------------------------

--
-- 資料表結構 `session_record`
--

DROP TABLE IF EXISTS `session_record`;
CREATE TABLE IF NOT EXISTS `session_record` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '牌局號 (流水號 table_status.ts_session)',
  `sr_uuid` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'uuid',
  `tc_id` mediumint(9) NOT NULL COMMENT '規則代號(table_config.id)',
  `ts_id` mediumint(9) NOT NULL COMMENT '賭桌號碼(table_status.id)',
  `tt_id` mediumint(9) NOT NULL COMMENT '賭桌型態(table_type.id)',
  `sr_start` timestamp NULL DEFAULT NULL COMMENT '牌局開始時間',
  `sr_end` timestamp NULL DEFAULT NULL COMMENT '牌局結束時間',
  `sr_minutes` int(11) DEFAULT NULL COMMENT '牌局耗時',
  `sr_imported` timestamp NULL DEFAULT NULL COMMENT '資料庫紀錄時間',
  `sr_pot` decimal(10,0) DEFAULT NULL COMMENT '底池的金錢總額',
  `sr_rake` decimal(10,0) DEFAULT NULL COMMENT '底池的抽水金錢總額',
  `sr_banker` smallint(6) DEFAULT NULL COMMENT '莊家位置',
  `sr_winner` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '贏家ID',
  `sr_seat` smallint(6) DEFAULT NULL COMMENT '贏家翻牌後最後行動的位置(按鈕)',
  PRIMARY KEY (`id`),
  KEY `uuid` (`sr_uuid`),
  KEY `table_type` (`tt_id`,`ts_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='牌局紀錄';

-- --------------------------------------------------------

--
-- 資料表結構 `table_rule_mapping`
--

DROP TABLE IF EXISTS `table_rule_mapping`;
CREATE TABLE IF NOT EXISTS `table_rule_mapping` (
  `name` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '英文簡寫(N、V、C、G)',
  `description` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '描述( Normal、VIP、Club、Challenge)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='桌子類別';

--
-- 資料表的匯出資料 `table_rule_mapping`
--

INSERT INTO `table_rule_mapping` (`name`, `description`) VALUES
('N', 'Normal'),
('V', 'VIP'),
('C', 'Club'),
('G', 'Challenge');

-- --------------------------------------------------------

--
-- 資料表結構 `table_status`
--

DROP TABLE IF EXISTS `table_status`;
CREATE TABLE IF NOT EXISTS `table_status` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '流水號',
  `ts_session` mediumint(9) DEFAULT NULL COMMENT '局號(session_record.id)',
  `ts_ruleid` mediumint(9) NOT NULL COMMENT '規則(nlh_rule.id)',
  `ts_type` int(11) NOT NULL COMMENT '桌子型態(table_type.id)',
  `ts_table` int(11) DEFAULT NULL COMMENT '桌號',
  `ts_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '牌桌名稱',
  `ts_status` tinyint(1) NOT NULL COMMENT '狀態(1:開啟 0:關閉)',
  `ts_people` tinyint(4) NOT NULL COMMENT '人數',
  `ts_start` timestamp NOT NULL COMMENT '開桌時間',
  `ts_end` timestamp NULL DEFAULT NULL COMMENT '關桌時間',
  `ts_close` tinyint(4) DEFAULT '1' COMMENT '是否正常關閉',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='賭桌狀態';

-- --------------------------------------------------------

--
-- 資料表結構 `table_type`
--

DROP TABLE IF EXISTS `table_type`;
CREATE TABLE IF NOT EXISTS `table_type` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '流水號',
  `tt_game` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '遊戲類型(game_rule_mapping.name)',
  `tt_type` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '桌子類型(table_rule_mapping.name)',
  `tt_description` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '說明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='賭桌型別';

--
-- 資料表的匯出資料 `table_type`
--

INSERT INTO `table_type` (`id`, `tt_game`, `tt_type`, `tt_description`) VALUES
(1, 'T', 'N', 'Teen Patti Normal'),
(2, 'T', 'V', 'Teen Patti VIP'),
(3, 'T', 'C', 'Teen Patti Club'),
(4, 'T', 'G', 'Teen Patti Challenge'),
(5, 'N', 'N', 'NLH Normal'),
(6, 'N', 'V', 'NLH VIP'),
(7, 'N', 'C', 'NLH Club'),
(8, 'N', 'G', 'NLH Challenge'),
(9, 'P', 'N', 'PLO Normal'),
(10, 'P', 'V', 'PLO VIP'),
(11, 'P', 'C', 'PLO Club'),
(12, 'P', 'G', 'PLO Challenge'),
(13, 'O', 'N', 'OFG Normal'),
(14, 'O', 'V', 'OFG VIP'),
(15, 'O', 'C', 'OFG Club'),
(16, 'O', 'G', 'OFG Challenge');

-- --------------------------------------------------------

--
-- 資料表結構 `ts_usermember`
--

DROP TABLE IF EXISTS `ts_usermember`;
CREATE TABLE IF NOT EXISTS `ts_usermember` (
  `UM_No` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水編號',
  `UM_Vip` tinyint(1) DEFAULT '0' COMMENT '會員VIP',
  `UM_Agent` int(11) NOT NULL DEFAULT '0' COMMENT '上層編號',
  `UM_UpLevel` json NOT NULL COMMENT '上層資料',
  `UM_Level` tinyint(4) NOT NULL COMMENT '所在層級',
  `UM_IsAgent` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否為代理 (0: 否，1: 是)',
  `UM_LowerWater` tinyint(1) NOT NULL DEFAULT '0' COMMENT '下級返水 (只有線頭) (0: 否，1: 是)',
  `UM_Account` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '帳號',
  `UM_Sex` tinyint(1) DEFAULT '0' COMMENT '性別 (0: 男 / 1: 女)',
  `UM_PayoutPassword` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '提款密碼',
  `UM_Password` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '密碼',
  `UM_RealName` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '真實姓名',
  `UM_NickName` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '暱稱',
  `UM_Email` varchar(100) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '會員信箱',
  `UM_Birthday` int(11) DEFAULT '0' COMMENT '生日',
  `UM_Config` json NOT NULL COMMENT '個人設定(單筆每日存提款之類)',
  `UM_Avatar` varchar(250) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '個人圖片',
  `UM_Tag` json DEFAULT NULL COMMENT '會員標籤',
  `UM_PromotionLink` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '推廣連結(代理自開無)',
  `UM_UserGroupId` int(11) NOT NULL COMMENT '用戶組ID',
  `UM_BonusGroup` smallint(4) NOT NULL COMMENT '獎金組',
  `UM_URL` varchar(100) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '代理網址',
  `UM_Layout` smallint(6) DEFAULT '1' COMMENT '版型編號',
  `UM_ProfitType` tinyint(1) NOT NULL COMMENT '佣金模式 (0：無 /1：提成 / 2: 打碼量)',
  `UM_ProfitTypeAuto` tinyint(1) NOT NULL DEFAULT '0' COMMENT '自動派發佣金(0: 否 / 1: 是)',
  `UM_ProfitTypeId` int(11) NOT NULL DEFAULT '0' COMMENT '佣金模式ID (TS_ProfitType)',
  `UM_ProfitLastTime` int(11) NOT NULL DEFAULT '0' COMMENT '提成打碼待遇最後派發時間',
  `UM_Point` decimal(14,4) NOT NULL DEFAULT '0.0000' COMMENT '剩餘點數',
  `UM_PromotionPoint` decimal(13,3) DEFAULT '0.000' COMMENT '優惠點數',
  `UM_BetCount` decimal(13,3) DEFAULT '0.000' COMMENT '現在打碼量',
  `UM_BetCountStandard` decimal(13,3) DEFAULT '0.000' COMMENT '提款必須打碼量',
  `UM_TotalWinnings` decimal(14,4) NOT NULL DEFAULT '0.0000' COMMENT '累計中獎金額',
  `UM_TotalBankIn` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '公司入款金額總計',
  `UM_TotalBankOut` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '公司出款金額總計',
  `UM_TotalThreePayIn` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '第三方入款金額總計',
  `UM_TotalThreePayOut` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '第三方出款金額總計',
  `UM_TotalPromotions` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '優惠總計',
  `UM_TotalBetCount` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '打碼量總計',
  `UM_TotalBet` decimal(13,3) NOT NULL DEFAULT '0.000' COMMENT '下注總計',
  `UM_BetTimes` int(10) NOT NULL DEFAULT '0' COMMENT '下注總次數',
  `UM_BankInTimes` int(10) NOT NULL DEFAULT '0' COMMENT '公司存款總次數',
  `UM_ThreePayInTimes` int(10) NOT NULL DEFAULT '0' COMMENT '第三方存款總次數',
  `UM_BankOutTimes` int(10) NOT NULL DEFAULT '0' COMMENT '公司提款總次數',
  `UM_ThreePayOutTimes` int(10) NOT NULL DEFAULT '0' COMMENT '第三方提款總次數',
  `UM_PromotionsTimes` int(10) NOT NULL DEFAULT '0' COMMENT '優惠總次數',
  `UM_FirstDeposite` int(11) DEFAULT '0' COMMENT '首充時間',
  `UM_Mobile` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '行動號碼',
  `UM_Wechat` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '微信號',
  `UM_QQ` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT 'QQ號',
  `UM_BankAccount` json DEFAULT NULL COMMENT '銀行資訊',
  `UM_Remark` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '備註',
  `UM_Device` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '使用設備',
  `UM_Token` varchar(250) COLLATE utf8_unicode_ci DEFAULT '' COMMENT 'token (推播用)',
  `UM_RegIP` bigint(20) DEFAULT '0' COMMENT '註冊IP',
  `UM_RegDevice` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '註冊裝置',
  `UM_RegBrowser` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '註冊瀏覽器',
  `UM_RegLocation` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '註冊所在地',
  `UM_PreviousLoginIP` bigint(20) UNSIGNED DEFAULT '0' COMMENT '前次登入IP',
  `UM_PreviousLoginDevice` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '前次使用設備',
  `UM_PreviousLoginBrowser` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '前次使用瀏覽器',
  `UM_PreviousLoginLocation` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '前次登入所在地',
  `UM_LastLoginIP` bigint(20) UNSIGNED DEFAULT '0' COMMENT '最後登入IP',
  `UM_LastLoginDevice` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '最後使用設備',
  `UM_LastLoginBrowser` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '最後使用瀏覽器',
  `UM_LastLoginLocation` varchar(20) COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '最後登入所在地',
  `UM_FirstLoginDate` int(11) DEFAULT '0' COMMENT '首次登入時間',
  `UM_PreviousLoginDate` int(11) DEFAULT '0' COMMENT '前次登入時間',
  `UM_LastLoginDate` int(11) DEFAULT '0' COMMENT '最後登入時間',
  `UM_Review` tinyint(1) NOT NULL COMMENT '審核狀態 (0: 未審核 / 1: 已核准 / 2: 未核准)',
  `UM_Freeze` tinyint(1) NOT NULL COMMENT '凍結 (0: 非凍結 / 1: 凍結)',
  `UM_Bet` tinyint(1) NOT NULL COMMENT '可否下注 (0: 不可下注 / 1: 可下注)',
  `UM_Enable` tinyint(1) NOT NULL COMMENT '狀態 (0: 停用 / 1: 啟用)',
  `UM_ClearBetCount` int(11) NOT NULL DEFAULT '0' COMMENT '清除稽核時間點 (最後的提款申請時間)',
  `UM_DateCreate` int(11) NOT NULL COMMENT '建立時間',
  `UM_DateUpdate` int(11) NOT NULL DEFAULT '0' COMMENT '更新時間',
  `UM_goldpoint` mediumint(9) NOT NULL COMMENT '鑽石',
  PRIMARY KEY (`UM_No`),
  KEY `UM_Account` (`UM_Account`) USING BTREE,
  KEY `UM_Level` (`UM_Level`),
  KEY `UM_Agent` (`UM_Agent`),
  KEY `UM_LowerWater` (`UM_LowerWater`),
  KEY `UM_RealName` (`UM_RealName`),
  KEY `UM_Email` (`UM_Email`),
  KEY `UM_Agent_2` (`UM_Agent`),
  KEY `UM_UserGroupId` (`UM_UserGroupId`),
  KEY `UM_BonusGroup` (`UM_BonusGroup`),
  KEY `UM_ProfitType` (`UM_ProfitType`),
  KEY `UM_ProfitTypeAuto` (`UM_ProfitTypeAuto`),
  KEY `UM_ProfitTypeId` (`UM_ProfitTypeId`),
  KEY `UM_Point` (`UM_Point`),
  KEY `UM_BetCount` (`UM_BetCount`),
  KEY `UM_BetCountStandard` (`UM_BetCountStandard`),
  KEY `UM_Review` (`UM_Review`),
  KEY `UM_Freeze` (`UM_Freeze`),
  KEY `UM_Bet` (`UM_Bet`),
  KEY `UM_Enable` (`UM_Enable`),
  KEY `UM_ClearBetCount` (`UM_ClearBetCount`),
  KEY `UM_DateCreate` (`UM_DateCreate`),
  KEY `UM_DateUpdate` (`UM_DateUpdate`),
  KEY `UM_FirstDeposite` (`UM_FirstDeposite`),
  KEY `UM_RegIP` (`UM_RegIP`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `ts_usermember`
--

INSERT INTO `ts_usermember` (`UM_No`, `UM_Vip`, `UM_Agent`, `UM_UpLevel`, `UM_Level`, `UM_IsAgent`, `UM_LowerWater`, `UM_Account`, `UM_Sex`, `UM_PayoutPassword`, `UM_Password`, `UM_RealName`, `UM_NickName`, `UM_Email`, `UM_Birthday`, `UM_Config`, `UM_Avatar`, `UM_Tag`, `UM_PromotionLink`, `UM_UserGroupId`, `UM_BonusGroup`, `UM_URL`, `UM_Layout`, `UM_ProfitType`, `UM_ProfitTypeAuto`, `UM_ProfitTypeId`, `UM_ProfitLastTime`, `UM_Point`, `UM_PromotionPoint`, `UM_BetCount`, `UM_BetCountStandard`, `UM_TotalWinnings`, `UM_TotalBankIn`, `UM_TotalBankOut`, `UM_TotalThreePayIn`, `UM_TotalThreePayOut`, `UM_TotalPromotions`, `UM_TotalBetCount`, `UM_TotalBet`, `UM_BetTimes`, `UM_BankInTimes`, `UM_ThreePayInTimes`, `UM_BankOutTimes`, `UM_ThreePayOutTimes`, `UM_PromotionsTimes`, `UM_FirstDeposite`, `UM_Mobile`, `UM_Wechat`, `UM_QQ`, `UM_BankAccount`, `UM_Remark`, `UM_Device`, `UM_Token`, `UM_RegIP`, `UM_RegDevice`, `UM_RegBrowser`, `UM_RegLocation`, `UM_PreviousLoginIP`, `UM_PreviousLoginDevice`, `UM_PreviousLoginBrowser`, `UM_PreviousLoginLocation`, `UM_LastLoginIP`, `UM_LastLoginDevice`, `UM_LastLoginBrowser`, `UM_LastLoginLocation`, `UM_FirstLoginDate`, `UM_PreviousLoginDate`, `UM_LastLoginDate`, `UM_Review`, `UM_Freeze`, `UM_Bet`, `UM_Enable`, `UM_ClearBetCount`, `UM_DateCreate`, `UM_DateUpdate`, `UM_goldpoint`) VALUES
(57, 1, 0, '{\"0\": \"0\"}', 1, 1, 0, 'Arcadia', 0, '1234', '123456', '世外桃源', NULL, '', 281116800, '{}', '', '[]', '', 1, 1974, '', 1, 0, 0, 0, 0, '9800.6320', '0.000', '0.000', '10200.000', '0.0000', '10000.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', 0, 1, 0, 0, 0, 0, 0, '13077824218', '', '', NULL, NULL, '', '', 0, '', '', '', 1037817889, 'tablet', 'Google Chrome', '台湾', 1990447475, 'Android', 'Google Chrome', '台北市', 1527836213, 1528170232, 1528170241, 1, 0, 0, 1, 0, 1527836186, 1528727009, 500000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
