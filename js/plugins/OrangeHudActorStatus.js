/*=============================================================================
 * Orange - Actor Status HUD
 * By HUDell - www.hudell.com
 * OrangeHudActorStatus.js
 * Version: 1.5.2
 * Free for commercial and non commercial use.
 *=============================================================================*/
/*:
 * @plugindesc Adds a new line to Orange Hud to display an actor's status
 * @author Hudell
 *
 * @param GroupName
 * @desc The name of the HUD group where this line should be displayed
 * @default main
 *
 * @param Pattern
 * @desc The pattern of the line that will be drawn. Click the help button for more info.
 * @default <hp> / <mhp>
 *
 * @param ActorIndex
 * @desc The index of the actor in the party. If the index is invalid, nothing will be shown
 * @default 0
 *
 * @param SwitchId
 * @desc Set this to a switch number to use it to control the visibility of this line
 * @default 0
 *
 * @param X
 * @desc The X position of the variable line inside the HUD
 * @default 
 *
 * @param Y
 * @desc The Y position of the variable line inside the HUD
 * @default 
 *
 * @param FontFace
 * @desc The font face to use. Leave empty to use the HUD default
 * @default 
 *
 * @param FontSize
 * @desc The font size to use. Leave empty to use the HUD default
 * @default
 *
 * @param FontColor
 * @desc The font color to use. Leave empty to use the HUD default
 * @default
 *
 * @param FontItalic
 * @desc Should use italic? Leave empty to use the HUD default
 * @default
 *
 * @param ScriptPattern
 * @desc A script call to be used instead of the Pattern
 * @default 
 *
 * @help
 * ============================================================================
 * My Blog:
 * ============================================================================
 * http://hudell.com
 * ============================================================================
 * Valid variables:
 * ============================================================================
 * <hp>
 * <mp>
 * <tp>
 * <mhp>
 * <mmp>
 * <atk>
 * <def>
 * <mat>
 * <mdf>
 * <agi>
 * <luk>
 * <hit>
 * <eva>
 * <cri>
 * <cev>
 * <mev>
 * <mrf>
 * <cnt>
 * <hrg>
 * <mrg>
 * <trg>
 * <tgr>
 * <grd>
 * <rec>
 * <pha>
 * <mcr>
 * <tcr>
 * <pdr>
 * <mdr>
 * <fdr>
 * <exr>
 * <level>
 * <maxlevel>
 * */

var Imported = Imported || {};

if (Imported["OrangeHud"] === undefined) {
  throw new Error("Please add OrangeHud before OrangeHudActorStatus!");
}

var OrangeHudActorStatusLine = OrangeHudActorStatusLine || {};

if (Imported["OrangeHudActorStatus"] === undefined) {
  OrangeHudActorStatusLine.validateParams = function(line) {
    line.GroupName = line.GroupName || "main";
    
    if (line.ScriptPattern !== undefined && line.ScriptPattern.trim() === "") {
      line.ScriptPattern = undefined;
    }

    if (line.Pattern === undefined) {
      line.Pattern = "<hp> / <mhp>";
    } else if (line.Pattern.trim() === "") {
      line.Pattern = "";
    }

    line.ActorIndex = Number(line.ActorIndex || 0);
    if (line.FontFace === undefined || line.FontFace.trim() === "") {
      line.FontFace = OrangeHud.Param.DefaultFontFace;
    }

    if (line.FontColor === undefined || line.FontColor.trim() === "") {
      line.FontColor = OrangeHud.Param.DefaultFontColor;
    }

    line.FontSize = Number(line.FontSize || OrangeHud.Param.DefaultFontSize);
    line.X = Number(line.X || 0);
    line.Y = Number(line.Y || 0);

    if (line.FontItalic === undefined || line.FontItalic.trim() === "") {
      line.FontItalic = OrangeHud.Param.DefaultFontItalic;
    } else {
      line.FontItalic = line.FontItalic == "true";
    }

    line.SwitchId = Number(line.SwitchId || 0);
  };

  OrangeHudActorStatusLine.drawLine = function(window, variableData) {
    if (variableData.SwitchId > 0) {
      if (!$gameSwitches.value(variableData.SwitchId)) {
        return;
      }
    }

    var line = this.getLine(variableData);

    window.contents.fontFace = variableData.FontFace;
    window.contents.fontSize = variableData.FontSize;
    window.contents.fontItalic = variableData.FontItalic;
    window.changeTextColor(variableData.FontColor);

    // pieworkplace changed: position of hud when battle/map
    if (SceneManager._scene instanceof Scene_Battle){
      window.drawTextEx(line, 150, 130);
    } else {
      window.drawTextEx(line, 624, 48);
    }
    // window.drawTextEx(line, variableData.X, variableData.Y);
    

    window.resetFontSettings();
  };

  OrangeHudActorStatusLine.getLine = function(variableData) {
    var pattern = variableData.Pattern;
    if (variableData.ScriptPattern !== undefined) {
      pattern = Function("return " + variableData.ScriptPattern)();
    }

    var members = $gameParty.members();
    if (members.length > variableData.ActorIndex) {
      var line = pattern;
      var actorData = members[variableData.ActorIndex];

      // pieworkplace added: states(poison, weakness, etc.)
      stateStr = "";
      for (var i = 0; i < actorData._states.length; i++){
        stateStr = stateStr + "\\i[" + (actorData._states[i]) + "]";
      }

      function spaces(n){
        str = '';
        for (var i = 0; i < n; i++) str += ' ';
        return str;
      }

      // pieworkplace changed: when in battle, show battle hud
      if (SceneManager._scene instanceof Scene_Battle){
        // solve problem of whitespace
        gap = "";
        var enemyData;
        for (var i = 0; i < $gameTroop.members().length; i++){
          enemyData = $gameTroop.members()[i];
          if (enemyData && enemyData.hp !== 0) break;
        }
        enemyData = enemyData || $gameTroop.members()[0];
        line = line.replace(/\<map_hud\>/gi, "");
        line = line.replace(/\<battle_hud\>/gi, 
            "\n\n" + spaces(5) + 
            enemyData.name() + gap + spaces(20 - 2 * (""+ enemyData.name()).length)
          + "勇者\n"
          + spaces(5)
          + "生命: " + enemyData.hp + gap + spaces(14-(""+enemyData.hp).length)
          + "生命: " + actorData.hp + "\n"
          + spaces(5)
          + "攻击: " + enemyData.atk + gap + spaces(14-(""+enemyData.atk).length)
          + "攻击: " + actorData.atk + "\n"
          + spaces(5)
          + "防御: " + enemyData.def + gap + spaces(14-(""+enemyData.def).length)
          + "防御: " + actorData.def + "\n"
          + spaces(5)
          + "魔攻: " + enemyData.mat + gap + spaces(14-(""+enemyData.mat).length)
          + "魔攻: " + actorData.mat + "\n"
          + spaces(5)
          + "魔防: " + enemyData.mdf + gap + spaces(14-(""+enemyData.mdf).length)
          + "魔防: " + actorData.mdf + "\n"
          + "\n" + spaces(2) + "撤退: 长按 X 或 Esc 可在主角回合撤退"
          );
      } else {
        // otherwise show normal status hud
        line = line.replace(/\<battle_hud\>/gi, "");
        line = line.replace(/\<map_hud\>/gi, 
          "等级：" + actorData.level
          + "\n生命: " + actorData.hp
          + "\n攻击: " + actorData.atk
          + "\n防御: " + actorData.def
          + "\n魔攻: " + actorData.mat
          + "\n魔防: " + actorData.mdf
          + "\n金币: " + $gameParty.gold()
          + "\n经验: " + actorData.currentExp()
          + "\n" + stateStr);
      }
      
      return line;
    } else {
      return '';
    }
  };

  OrangeHudActorStatusLine.getValue = function(variableData) {
    return this.getLine(variableData);
  };

  OrangeHudActorStatusLine.getKey = function(variableData) {
    return 'actor' + variableData.ActorIndex;
  };

  OrangeHud.registerLineType('OrangeHudActorStatus', OrangeHudActorStatusLine);
  Imported.OrangeHudActorStatus = 1.5;
}