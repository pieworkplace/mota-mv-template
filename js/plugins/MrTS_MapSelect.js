//=============================================================================
// MrTS_MapSelection.js
//=============================================================================
/*:
* @plugindesc Allows to travel to different maps from a single scene.
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
	var mapList = Pieworkplace.MapList;

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "mapselection") {
			switch (args[0].toUpperCase())
			{
				case 'START':
				{
					SceneManager.push(Scene_MapSelect);
				} break;
				// pieworkplace: add mapid				
				case 'ADD':
				{
					$gameSystem.addMapSelection(Number(args[1]));
					for (var i = 0; i < mapList.length; i++){
						if (mapList[i].mapID === Number(args[1])){
							mapList[i].visited = true;
						}
					}
				} break;
				case 'DELETE_ALL':
				{
					$gameSystem.addMapSelection(Number(args[1]));
					for (var i = 0; i < mapList.length; i++){
						mapList[i].visited = false;
					}
				} break;
			}
		}
	};

	//Game_System
	Game_System.prototype.addMapSelection = function(id) {
		if (!this._mapSelections) this._mapSelections = [];
		this._mapSelections.push(id);
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
		this.createTopWindow();
		this.createListWindow();
	};

	Scene_MapSelect.prototype.createTopWindow = function() {
		this._topWindow = new Window_MapSelect_Message("选择楼层", 40);
		this.addWindow(this._topWindow);
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

	Scene_MapSelect.prototype.listOkay = function() {
		var item = this._listWindow.item(this._listWindow.index());
		this.popScene();
		var popSe    = {};
		popSe.name   = 'Raise2';
		popSe.pitch  = 150;
		popSe.volume = 90;
		popSe.pan    = 0;
		AudioManager.playSe(popSe);
		$gamePlayer.reserveTransfer(item.mapID, item.X, item.Y, item.face, 0);
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
	
	Window_MapSelect_Message.prototype.initialize = function(message, y) {
		this._message = message;
		Window_Base.prototype.initialize.call(this, 0, y, 200, 40);
		var ww = this.textWidth(message) + this.standardPadding()*2;
		var wh = this.fittingHeight(1);
		var wx = Graphics.boxWidth/2 - ww/2;
		this.x = wx;
		this.width = ww;
		this.height = wh;
		this.refresh();
	};
	
	Window_MapSelect_Message.prototype.refresh = function() {
		this.createContents();
		this.drawText(this._message, 0, 0, this.contentsWidth(), 'center');
	};

	//Window_MapSelect_List
	function Window_MapSelect_List() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_MapSelect_List.prototype = Object.create(Window_Selectable.prototype);
	Window_MapSelect_List.prototype.constructor = Window_MapSelect_List;
	
	Window_MapSelect_List.prototype.initialize = function() {
		var x = Graphics.boxWidth * 0.1;
		var y = Graphics.boxHeight * 0.2;
		var w = Graphics.boxWidth * 0.8;
		var h = Graphics.boxHeight * 0.6;
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	};

	Window_MapSelect_List.prototype.setObject = function(obj) {
		this._object = obj;
		this.resize();
		this.refresh();
	};

	Window_MapSelect_List.prototype.resize = function() {
		var length = 0;
		var array = this._object;
		for (var i = 0; i < array.length; i++) {
			if (array[i].visited) length++;
		}
		this.height = this.fittingHeight(10);
		this.createContents();
	};

	Window_MapSelect_List.prototype.maxItems = function() {
		if (!this._object) return 0;
		var length = 0;
		var array = this._object;
		for (var i = 0; i < array.length; i++) {
			if (array[i].visited) length++;
		}
		return length;
	};

	Window_MapSelect_List.prototype.item = function(index) {
		var pos = -1;
		var array = this._object;
		for (var i = 0; i < array.length; i++) {
			if (array[i].visited)
			{
				pos++;
				if (pos === index) return array[i];
			}
		}
		return null;
	};

	Window_MapSelect_List.prototype.drawItem = function(index) {
		var item = this.item(index);
		if (item)
		{
			var rect = this.itemRectForText(index);
			this.drawText(item.display, rect.x, rect.y, rect.width);
		}
	};

	Window_MapSelect_List.prototype.maxCols = function() {
        return 5;
    };


})();
