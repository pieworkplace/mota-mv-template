//=============================================================================
// MrTS_ShopSelection.js
//=============================================================================
/*:
* @plugindesc shop
* @author Mr. Trivel
*
* 
* @help 
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* Don't remove the header or claim that you wrote this plugin.
* Credit Mr. Trivel if using this plugin in your project.
* Free for commercial and non-commercial projects.
* --------------------------------------------------------------------------------
* Version 1.1
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Plugin Commands
* --------------------------------------------------------------------------------

* --------------------------------------------------------------------------------
* Version History
* --------------------------------------------------------------------------------
* 1.1 - List allows excuting Common Events.
* 1.0 - Release
*/

// pieworkplace changed a lot
(function() {
	var mapList = [
		{
			name: "生命+500"
		},
		{
			name: "攻击+3"
		},
		{
			name: "防御+3"
		},
	];

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "shopselection1") {
			switch (args[0].toUpperCase())
			{
				case 'START':
				{
					SceneManager.push(Scene_MapSelect);
				} break;
			}
		}
	};

	//Scene_MapSelect
	function Scene_MapSelect() {
		this.initialize.apply(this, arguments);	
	};
	
	Scene_MapSelect.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_MapSelect.prototype.constructor = Scene_MapSelect;
	
	Scene_MapSelect.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};
	
	Scene_MapSelect.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createBottomWindow();
		this.createListWindow();
	};

	Scene_MapSelect.prototype.createListWindow = function() {
		this._listWindow = new Window_MapSelect_List();
		this._listWindow.setHandler('ok', this.listOkay.bind(this));
		this._listWindow.setHandler('cancel', this.listCancel.bind(this));
		this.addWindow(this._listWindow);
		this._listWindow.setObject(mapList);
		this._listWindow.select(0);
		this._listWindow.activate();
	};

	Scene_MapSelect.prototype.createBottomWindow = function() {
		var price = $gameVariables._data[4];
		var msg = "欢迎光临金币商店，如果给我" + price + '金币，';

		this._bottomWindow = new Window_MapSelect_Message(msg, 48, Graphics.boxHeight / 2 - 150, 528, 120);
		this.addWindow(this._bottomWindow);
	};

	Scene_MapSelect.prototype.listOkay = function() {
		var index = this._listWindow.index();
		if ($gameParty.gold() >= $gameVariables._data[4]){
			$gameParty._gold -= $gameVariables._data[4];
			$gameVariables._data[4] += 1;
			if (index === 0) {
				//life+500
				$gameParty.members()[0]._hp += 500;
				// var popSe    = {};
					//    popSe.name   = 'Jump1';
					//    popSe.pitch  = 100;
					//    popSe.volume = 90;
					//    popSe.pan    = 0;
					//    AudioManager.stopSe();
					//    AudioManager.playSe(popSe);
					//    AudioManager.stopAll();
			} else if(index === 1){
				// atk+2
				$gameParty.members()[0]._paramPlus[2] += 3;
			} else if(index === 2){
				//def+2
				$gameParty.members()[0]._paramPlus[3] += 3;
			}
		}
		var price = $gameVariables._data[4];
		var msg = "欢迎光临金币商店，如果给我" + price + '金币，';
		this._bottomWindow._message = msg;
		this._bottomWindow.refresh();
		this._listWindow.refresh();
		this._listWindow.activate();
	};

	Scene_MapSelect.prototype.listCancel = function() {
		this.popScene();
	};

	//Window_MapSelect_Message
	function Window_MapSelect_Message() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_MapSelect_Message.prototype = Object.create(Window_Base.prototype);
	Window_MapSelect_Message.prototype.constructor = Window_MapSelect_Message;
	
	Window_MapSelect_Message.prototype.initialize = function(message, x, y, w, h) {
		this._message = message;
		Window_Base.prototype.initialize.call(this, x, y, w, h);
		var ww = this.textWidth(message) + this.standardPadding()*2;
		var wh = this.fittingHeight(3);
		var wx = Graphics.boxWidth/2 - ww/2;
		// this.x = wx;
		// this.width = ww;
		this.height = wh;
		this.refresh();
	};
	
	Window_MapSelect_Message.prototype.refresh = function() {
		this.createContents();
		this.drawText(this._message, 0, 38, this.contentsWidth(), 'left');
		this.changeTextColor(this.textColor(6));
		this.drawText("金币商店", 0, 0, this.contentsWidth(), 'center');
		this.resetTextColor();
		this.drawText("我将赐予你更加强大的力量！", 0, 76, this.contentsWidth(), 'left');
	};

	//Window_MapSelect_List
	function Window_MapSelect_List() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_MapSelect_List.prototype = Object.create(Window_Selectable.prototype);
	Window_MapSelect_List.prototype.constructor = Window_MapSelect_List;
	
	Window_MapSelect_List.prototype.initialize = function() {
		var x = Graphics.boxWidth * 0.4 - 120;
		var y = Graphics.boxHeight * 0.5;
		var w = Graphics.boxWidth * 0.2;
		var h = Graphics.boxHeight * 0.23;
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	};

	Window_MapSelect_List.prototype.setObject = function(obj) {
		this._object = obj;
		this.refresh();
	};

	Window_MapSelect_List.prototype.maxItems = function() {
		return 3;
	};

	Window_MapSelect_List.prototype.item = function(index) {
		var pos = -1;
		var array = this._object;
		for (var i = 0; i < array.length; i++) {
			pos++;
			if (pos === index) return array[i];
		}
		return null;
	};

	Window_MapSelect_List.prototype.drawItem = function(index) {
		var item = this.item(index);
		if (item)
		{
			if ($gameParty.gold() < $gameVariables._data[4]){
				// this.changeTextColor(this.textColor(8));
				this.changePaintOpacity(false);
			}
			var rect = this.itemRectForText(index);
			this.drawText(item.name, rect.x, rect.y, rect.width);
		}
	};

	Window_MapSelect_List.prototype.maxCols = function() {
        return 1;
    };

    Window_MapSelect_List.prototype.isCurrentItemEnabled = function() {
    	if ($gameParty.gold() < $gameVariables._data[4]){
			return false;
		}
		return true;
	};


})();
