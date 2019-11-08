//=============================================================================
// PIE_ShopSelect.js
//=============================================================================
/*:
* @plugindesc shop
* @author Pieworkplace
*
*/

(function() {
	var shopList = Pieworkplace.ShopList;

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "shopselection") {
			switch (args[0].toUpperCase())
			{
				case 'START':
				{
					SceneManager.push(Scene_ShopSelect);
				} break;
			}
		}
	};

	// Scene_ShopSelect
	function Scene_ShopSelect() {
		this.initialize.apply(this, arguments);	
	};
	
	Scene_ShopSelect.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_ShopSelect.prototype.constructor = Scene_ShopSelect;
	
	Scene_ShopSelect.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};
	
	Scene_ShopSelect.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createTitleWindow();
		this.createListWindow();
	};

	Scene_ShopSelect.prototype.createListWindow = function() {
		this._listWindow = new Window_MapSelect_List();
		this._listWindow.setHandler('ok', this.listOkay.bind(this));
		this._listWindow.setHandler('cancel', this.listCancel.bind(this));
		this.addWindow(this._listWindow);
		this._listWindow.setObject(shopList);
		this._listWindow.select(0);
		this._listWindow.activate();
	};

	Scene_ShopSelect.prototype.createTitleWindow = function() {
		this._titleWindow = new Window_ShopSelect_Message("", 48, Graphics.boxHeight / 2 - 150, 528, 120);
		this.addWindow(this._titleWindow);
	};

	Scene_ShopSelect.prototype.listOkay = function() {
		var index = this._listWindow.index();
		var shopItem = shopList[$gameVariables._data[5]];
		var price = $gameVariables._data[shopItem.variableForPrice] || shopItem.items[index].price;
		if (shopItem.type == 'gold') {
			if ($gameParty.gold() >= price) {
				$gameParty._gold -= price;
				$gameVariables._data[shopItem.variableForPrice] += shopItem.increment;
				shopItem.items[index].effect();
			}
		} else if (shopItem.type == 'exp') {
			if ($gameParty.leader()._exp[1] >= price) {
				$gameParty.leader()._exp[1] -= price;
				$gameVariables._data[shopItem.variableForPrice] += shopItem.increment;
				shopItem.items[index].effect();
			}
		}
		this._titleWindow.refresh();
		this._listWindow.refresh();
		this._listWindow.activate();
	};

	Scene_ShopSelect.prototype.listCancel = function() {
		this.popScene();
	};

	// Window_ShopSelect_Message
	function Window_ShopSelect_Message() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_ShopSelect_Message.prototype = Object.create(Window_Base.prototype);
	Window_ShopSelect_Message.prototype.constructor = Window_ShopSelect_Message;
	
	Window_ShopSelect_Message.prototype.initialize = function(message, x, y, w, h) {
		Window_Base.prototype.initialize.call(this, x, y, w, h);
		var ww = this.textWidth(message) + this.standardPadding()*2;
		var wh = this.fittingHeight(3);
		var wx = Graphics.boxWidth/2 - ww/2;
		this.height = wh;
		this.refresh();
	};
	
	Window_ShopSelect_Message.prototype.refresh = function() {
		var shopItem = shopList[$gameVariables._data[5]];
		var price = $gameVariables._data[shopItem.variableForPrice];
		this.createContents();
		this.changeTextColor(this.textColor(6));
		this.drawText(shopItem.title, 0, 0, this.contentsWidth(), 'center');
		this.resetTextColor();
		this.drawText(shopItem.line1.replace("<price>", price), 0, 38, this.contentsWidth(), 'left');
		this.drawText(shopItem.line2.replace("<price>", price), 0, 76, this.contentsWidth(), 'left');
	};

	//Window_MapSelect_List
	function Window_MapSelect_List() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_MapSelect_List.prototype = Object.create(Window_Selectable.prototype);
	Window_MapSelect_List.prototype.constructor = Window_MapSelect_List;
	
	Window_MapSelect_List.prototype.initialize = function() {
		var maxLen = 0;
		var itemNum = shopList[$gameVariables._data[5]].items.length;
		for (var i = 0; i < itemNum; i++) {
			var str = shopList[$gameVariables._data[5]].items[i].name
			// pieworkplace: fix chinese length problem
		    var realLength = 0, len = str.length, charCode = -1;
		    for (var i = 0; i < len; i++) {
		        charCode = str.charCodeAt(i);
		        if (charCode >= 0 && charCode <= 128) realLength += 1;
		        else realLength += 2;
		    }
		    maxLen = Math.max(maxLen, realLength);
		}
	    
	    var coefficient = maxLen / 40.0;
		var x = Graphics.boxWidth * (1 - coefficient) / 2.0 - 120;
		var y = Graphics.boxHeight * 0.5;
		var w = Graphics.boxWidth * coefficient;
		var h = this.fittingHeight(itemNum);
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	};

	Window_MapSelect_List.prototype.setObject = function(obj) {
		this._object = obj;
		this.refresh();
	};

	Window_MapSelect_List.prototype.maxItems = function() {
		var shopItem = shopList[$gameVariables._data[5]];
		return shopItem.items.length;
	};

	Window_MapSelect_List.prototype.item = function(index) {
		var pos = -1;
		var array = shopList[$gameVariables._data[5]].items;
		for (var i = 0; i < array.length; i++) {
			pos++;
			if (pos === index) return array[i];
		}
		return null;
	};

	Window_MapSelect_List.prototype.drawItem = function(index) {
		var item = this.item(index);
		var shopItem = shopList[$gameVariables._data[5]];
		var price = $gameVariables._data[shopItem.variableForPrice] || item.price;
		if (item) {
			if (shopItem.type == 'exp') {
				if ($gameParty.leader()._exp[1] < price) {
					this.changeTextColor(this.textColor(8));
				}
			} else if (shopItem.type == 'gold') {
				if ($gameParty.gold() < price) {
					this.changeTextColor(this.textColor(8));
				}
			}

			var rect = this.itemRectForText(index);
			this.drawText(item.name, rect.x, rect.y, rect.width, 'center');
			this.resetTextColor();	
		}
	};

	Window_MapSelect_List.prototype.maxCols = function() {
        return 1;
    };

    Window_MapSelect_List.prototype.isCurrentItemEnabled = function() {
    	var shopItem = shopList[$gameVariables._data[5]];
    	var price = $gameVariables._data[shopItem.variableForPrice] || shopItem.items[this._index].price;
		if (shopItem.type == 'exp') {
			if ($gameParty.leader()._exp[1] < price) {
				return false;
			}
		} else if (shopItem.type == 'gold') {
			if ($gameParty.gold() < price) {
				return false;
			}
		}
		return true;
	};
})();
