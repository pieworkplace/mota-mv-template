var Imported = Imported || {};
Imported.PIE_ShopList = true;
var Pieworkplace = Pieworkplace || {};

// pieworkplace: !!! Please put all shop data here
var shops = {
	1: {
		title: "金币商店",
		line1: "欢迎光临金币商店，如果给我<price>金币，",
		line2: "我将赐予你更加强大的力量！",
		variableForPrice: 4,
		increment: 1,
		type: 'gold', // gold or exp
		items: [
			{
				name: "生命+500",
				price: undefined,
				effect: ()=>{$gameParty.members()[0]._hp += 500;}
			},
			{
				name: "攻击+3",
				price: undefined,
				effect: ()=>{$gameParty.members()[0]._paramPlus[2] += 3;}
			},
			{
				name: "防御+3",
				price: undefined,
				effect: ()=>{$gameParty.members()[0]._paramPlus[3] += 3;}
			},
		]
	},
	2: {
		title: "经验商店",
		line1: "欢迎光临经验商店，给我若干经验值，",
		line2: "我将赐予你更加强大的力量！",
		variableForPrice: undefined,
		increment: 0,
		type: 'exp', // gold or exp
		items: [
			{
				name: "等级+1 (100经验)",
				price: 100,
				effect: ()=>{
					$gameParty.members()[0]._level += 1;
					$gameParty.members()[0]._hp += 800;
					$gameParty.members()[0]._paramPlus[2] += 5;
					$gameParty.members()[0]._paramPlus[3] += 6;
				}
			},
			{
				name: "攻击+3 (35经验)",
				price: 35,
				effect: ()=>{$gameParty.members()[0]._paramPlus[2] += 3;}
			},
			{
				name: "防御+3 (35经验)",
				price: 35,
				effect: ()=>{$gameParty.members()[0]._paramPlus[3] += 3;}
			},
		]
	},
	3: {
		title: "钥匙商店",
		line1: "欢迎光临钥匙商店，目前可以购买的钥匙",
		line2: "有以下两种：",
		variableForPrice: undefined,
		increment: 0,
		type: 'gold', // gold or exp
		items: [
			{
				name: "黄钥匙 (20金币)",
				price: 20,
				effect: ()=>{
					if ($gameParty._items[1] == undefined) {
						$gameParty._items[1] = 1
					} else {
						$gameParty._items[1] += 1
					}
				}
			},
			{
				name: "蓝钥匙 (80金币)",
				price: 80,
				effect: ()=>{
					if ($gameParty._items[2] == undefined) {
						$gameParty._items[2] = 1
					} else {
						$gameParty._items[2] += 1
					}
				}
			},
		]
	},
};

Pieworkplace.ShopList = Pieworkplace.ShopList || shops;