var Imported = Imported || {};
Imported.PIE_EnemyList = true;
var Pieworkplace = Pieworkplace || {};

// pieworkplace: !!! Please put all enemy data here
var enemies = {
	1: {
		desc1: "弱小的史莱姆",
		desc2: "无特技",
		calc: normal,
	},
	2: {
		desc1: "弱小的史莱姆",
		desc2: "无特技",
		calc: normal,
	},
	3: {
		desc1: "弱小的史莱姆",
		desc2: "无特技",
		calc: normal,
	},
	4: {
		desc1: "弱小的蝙蝠",
		desc2: "无特技",
		calc: normal,
	},
	5: {
		desc1: "弱小的蝙蝠",
		desc2: "无特技",
		calc: normal,
	},
	6: {
		desc1: "动作敏捷的蝙蝠，可快速攻击对手",
		desc2: "二段攻击：每回合连续攻击两次",
		calc: doubleAttackOnly,
	},
	7: {
		desc1: "史莱姆一族的首领",
		desc2: "先攻：战斗中先于勇者攻击",
		calc: attackFirstOnly,
	},
	8: {
		desc1: "人形的史莱姆",
		desc2: "黏稠：对普通攻击的闪避率达20%",
		calc: undefined,
	},
	9: {
		desc1: "难以击中的史莱姆人",
		desc2: "黏稠：对普通攻击的闪避率达30%",
		calc: undefined,
	},
	10: {
		desc1: "动作敏捷的史莱姆人，可快速攻击对手",
		desc2: "黏稠：对普通攻击的闪避率达30%\n二段攻击：每回合连续攻击两次",
		calc: undefined,
	},
	11: {
		desc1: "动作敏捷的蝙蝠，可快速攻击对手",
		desc2: "三段攻击：每回合连续攻击三次",
		calc: tripleAttackOnly,
	},
	12: {
		desc1: "普通的骷髅族怪物",
		desc2: "无特技",
		calc: normal,
	},
	13: {
		desc1: "骷髅大军中的一员",
		desc2: "无特技",
		calc: normal,
	},
	14: {
		desc1: "骷髅士兵的领队",
		desc2: "先攻：战斗中先于勇者攻击\n统领：战斗前召唤两个骷髅士兵",
		calc: undefined,
	},
	17: {
		desc1: "使用冰魔法的魔法师",
		desc2: "无特技",
		calc: normal,
	},
	18: {
		desc1: "使用火魔法的魔法师",
		desc2: "无特技",
		calc: normal,
	},
	19: {
		desc1: "普通的丧尸族怪物",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命",
		calc: undefined,
	},
	20: {
		desc1: "普通的丧尸族战士",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命",
		calc: undefined,
	},
	21: {
		desc1: "有毒的丧尸族怪物",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n中毒：每次攻击10%的概率中毒",
		calc: undefined,
	},
	22: {
		desc1: "有毒的丧尸族战士",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n中毒：每次攻击20%的概率中毒",
		calc: undefined,
	},
	23: {
		desc1: "保护重要物品的守卫",
		desc2: "无特技",
		calc: normal,
	},
	24: {
		desc1: "保护重要物品的守卫",
		desc2: "无特技",
		calc: normal,
	},
	25: {
		desc1: "保护重要物品的守卫",
		desc2: "无特技",
		calc: normal,
	},
	26: {
		desc1: "老化松动的墙壁变成的怪物",
		desc2: "坚固：防御值始终等于勇者攻击值",
		calc: stoneOnly,
	},
	27: {
		desc1: "老化松动的墙壁变成的怪物",
		desc2: "坚固：防御值始终等于勇者攻击值",
		calc: stoneOnly,
	},
	28: {
		desc1: "老化松动的墙壁变成的怪物",
		desc2: "坚固：防御值始终等于勇者攻击值",
		calc: stoneOnly,
	},
	29: {
		desc1: "会使人衰弱的丧尸",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n衰弱：每次攻击5%的概率衰弱",
		calc: undefined,
	},
	30: {
		desc1: "会使人衰弱的丧尸战士",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n衰弱：每次攻击10%的概率衰弱",
		calc: undefined,
	},
	31: {
		desc1: "会诅咒敌人的丧尸",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n诅咒：每次攻击5%的概率受到诅咒",
		calc: undefined,
	},
	32: {
		desc1: "会诅咒敌人的丧尸战士",
		desc2: "嗜血：每回合吸收勇者伤害为自己的生命\n诅咒：每次攻击10%的概率受到诅咒",
		calc: undefined,
	},
	33: {
		desc1: "骷髅族的战士",
		desc2: "无特技",
		calc: normal,
	},
	34: {
		desc1: "巨大的章鱼怪物",
		desc2: "无特技",
		calc: normal,
	},
	35: {
		desc1: "雷电魔法系的法师",
		desc2: "无特技",
		calc: normal,
	},
	36: {
		desc1: "雷电魔法系的法师",
		desc2: "无特技",
		calc: normal,
	},
	37: {
		desc1: "有毒的蝙蝠",
		desc2: "二段攻击：每回合连续攻击两次\n中毒：每次攻击10%的概率中毒",
		calc: undefined,
	},
	38: {
		desc1: "被黄金包裹的蝙蝠",
		desc2: "二段攻击：每回合连续攻击两次\n坚固：防御值始终等于勇者攻击值",
		calc: doubleAttackAndStone,
	},
	39: {
		desc1: "普通的战士",
		desc2: "无特技",
		calc: normal,
	},
	40: {
		desc1: "普通的战士",
		desc2: "无特技",
		calc: normal,
	},
	41: {
		desc1: "身披金色铠甲的骑士，挥舞铁剑寒光逼人",
		desc2: "无特技",
		calc: normal,
	},
	42: {
		desc1: "身披金色铠甲的骑士，挥舞铁剑寒光逼人",
		desc2: "无特技",
		calc: normal,
	},
	43: {
		desc1: "双手持剑的战士，攻击速度很快",
		desc2: "二段攻击：每回合连续攻击两次",
		calc: doubleAttackOnly,
	},

};

// ===== 计算方法 =====
// 普通 怪物
function normal(index, attackTimes, isAttackFirst, missRate) {
	var result = 0;
	var enemy = $dataEnemies[index];
	var monster_hp = enemy.params[0];
	var braver_turn = Math.max($gameParty.leader().atk - enemy.params[3],0) + Math.max($gameParty.leader().mat - enemy.params[5],0);
	var monster_turn = Math.max(enemy.params[2] - $gameParty.leader().def,0) + Math.max(enemy.params[4] - $gameParty.leader().mdf,0);
	var times = attackTimes || 1;
	var attackFirstCoefficient = isAttackFirst ? 1 : 0;
	if ((monster_hp % braver_turn) === 0){result = (monster_hp / braver_turn - 1 + attackFirstCoefficient) * monster_turn * times;}
	else {result = parseInt(monster_hp / braver_turn + attackFirstCoefficient) * monster_turn * times;}
	result = result >= 0? result : 0;
	$gameVariables._data[9][enemy.id] = result;
}

// 坚固 怪物
function stoneOnly(index) {
	var enemy = $dataEnemies[index];
	enemy.params[3] = $gameParty.leader().atk;
	normal(index);
}

// 先攻 怪物
function attackFirstOnly(index) {
	normal(index, 1, true)
}

// 二连击 怪物
function doubleAttackOnly(index) {
	normal(index, 2);
}

// 二连击+坚固 怪物
function doubleAttackAndStone(index) {
	var enemy = $dataEnemies[index];
	enemy.params[3] = $gameParty.leader().atk;
	normal(index, 2);
}

// 三连击 怪物
function tripleAttackOnly(index) {
	normal(index, 3);
}

Pieworkplace.EnemyList = Pieworkplace.EnemyList || enemies;