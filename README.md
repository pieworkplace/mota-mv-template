# mota-mv-template 说明

## 样板使用
### 基础
1. 很多脚本都要在游戏一开始就启动，所以不要忘记在第一次进入游戏就立即初始化（公共事件2）
2. 角色获得能力后，千万不要忘记刷新怪物伤害计算
### 新建一个怪物
1. 在地图上添加怪物
2. 在数据库“敌人”中添加怪物（不要忘记在备注中添加怪物坐标）
3. 在数据库“敌群”中添加怪物
4. 在公共事件“刷新怪物伤害计算”中添加怪物伤害计算
5. 在公共事件“呼出怪物手册”中添加怪物描述
6. 伤害未知的怪物在公共事件“战斗”中阻止自动战斗
7. ！！！特别小心：RPG Maker MV中属性不能设为0，因此我强制把所有属性为1 的都修改成0了。这也就意味着你不能生成一个某属性为1的怪物。
8. 各种改变勇者属性的地方都需要添加“刷新怪物伤害计算”
9. 独立开关A
10. 更新复仇公共事件
11. 坚固怪物，防御为1
12. 神剑之证
### 新建一个楼层
1. 楼梯事件更新
2. 楼层初始化的事件别忘加（右下角的事件），
3. 在MrTS_MapSelection.js添加地图信息
### 新建一个商店
1. 暂时请参照已有的商店自行修改
2. 在初始化中初始商店价格

### 显示一个小文字

===由于实现的限制，独立标签A为ON则不显示===

1. 显示怪物伤害：事件名称为“monster怪物ID”的形式。可参照示例
2. 显示文字和变量的组合：事件名称设为“<文字[变量编号]>”的形式，可参照商店示例
3. 如果地图中有事件名为”dark”
RPG Maker MV使用提示
1. 可以在游戏运行过程中按F12 debug（可能需要安装chrome浏览器）
2. $ 图片代表内容里只有一个人物的大图片；! 图片代表内容显示在格子中心，没有偏移
3. 发现一个大坑：MV在把别的地方的代码粘贴进软件里的script区域里时，可能会有代码遗漏，请小心！
### 样板制作日志
====这部分只有在出现bug或者想看看某些地方是怎么做的的时候才需要看===
### 勇者/敌人状态修改
1. 用YEP_CoreEngine插件修改勇士各个属性最大值
2. rpg_objects.js修改各个属性的最小值（查找pieworkplace注释）
3. 经验满不再自动升级（都是RPG MAKER MV）自带的坑，解决方法：在rpg_objects.js中修改
4. 勇者每走多少步中毒减血：rpg_objects.js中修改
5. ！！！特别小心：RPG Maker MV中属性不能设为0，因此我把所有属性为1 的都修改成0了（初始化时，怪物手册，战斗前等修改了勇者和敌人的属性值：1→0，rpg_scenes.js修改load以后1→0失效的问题）
6. 增加剑，剑虚假装备一下，目的是改变勇者攻击动画，不要在数据库里设置剑盾的攻击力防御力，直接给勇者装上就好了（装之前需要获得一把剑，不然装不上）
7. 读档时刷新怪物属性（rpg_scenes.js），便于debug
8. 添加中毒等属性：注意，中毒原系统只能按百分比增减生命，which is 非常蠢。。。添加plugin：ellystatesdamage.js，https://forums.rpgmakerweb.com/index.php?threads/ellyes-state-damage.48631/，之后在note里面修改就行了
9. 中毒步数修改：rpg_objects.js stepsForTurn把20改成1
10. 战斗前增加中毒等属性会crash！！！在ellystatesdamage.js添加了一个fix，但不一定完全work。有待更多测试
### 菜单与窗口魔改
1. 在主菜单中添加load选项：使用YEP_MainMenuManager插件，在99项里添加。由于这是绑定公共事件的意思，因此将1号公共事件改成呼叫load菜单即可
2. 将主菜单居中：用YEP_MainMenuManager插件来修改主菜单，只不过有一部分代码需要魔改（line4752左右）。在文件中添加这部分代码，然后再脚本设置中改commend window的位置为center就可以了
3. LTN_WindowPop插件：获得物品等弹窗
4. 在设置中添加自动战斗选项：修改rpg_windows.js和rpg_managers.js，删除commandRemeber选项，添加autoBattle（参考原commandRemember来修改）,在战斗前判断ConfigManager.autoBattle是否为true来决定是否自动战斗
5. 对话框弹出和关闭时动画速度修改：rpg_windows.js → updateOpen, updateClose
6. 对话中选项的修改：在没有破墙镐的时候显示disabled选项状态，将选项嵌入对话中：使用HIME_HMSChoiceDisplayMode.js插件，使得选项显示在对话框中
7. 对话中的选项禁用：使用YEP_X_ExtMesPack1.js（使用这个需要先依赖YEP_MessageCore.js）
8. 添加物品栏，修改使用了MrTS_NoItemCategories.js去除物品分类，rpg_windows.js和rpg_scenes.js修改窗口大小
### HUD魔改（HUD就是右侧的状态栏和战斗动画中敌人和勇者的状态）
1. OrangeHud一系列脚本都做了修改，搜索pieworkplace注释来查看修改了什么。总体来说OrangeHud.js作为主要脚本，然后每添加一组文字就添加一个OrangeHudXXX.js然后修改。开关1控制是否显示HUD（开关1默认关闭，需要在初始化公共事件中将它打开），开关3控制商店是否在开启（因为我们希望商店开启时主角状态能显示）。另外OrangeHudActorStatus.js同时控制显示战斗时HUD和普通状态栏HUD
2. 坑过我的注意事项：这个plugin中主角index是从0开始，而开关index从1开始
怪物手册
1. 添加YEP_ButtonCommonEvent插件，按D进入呼出怪物手册公共事件。
2. 添加MV自带的EnemyBook插件，在公共事件中修改调用方法，遍历全地图查看所有event的名字，在含有monster字符串的event里把他后面的id取出来，加入enemyBook，如果该event的独立开关A已经开启，证明这个怪物已经死亡，则不加入enemyBook
### 心镜
1. 创建伤害值地图显示: 修改YEP_EventMiniLabel.js，修改读取怪物伤害逻辑：怪物的伤害存在变量9的列表之中，每次攻击，防御，魔防等改变，刷新一次值，然后在怪物中添加注释标签即可在地图上显示怪物伤害。怪物手册之后也从变量9中读取伤害值
2. 大章鱼等大怪物需要添加另外的注释改变Y方向的buffer
### 楼层传送器
1. 建立楼层传送器：修改MrTS_MapSelection.js
2. 楼层传送器bug修复：每次保存以后，重新进入游戏，visited的楼层消失：解决方案，$gameVariables[7]设置为visited的楼层列表，需要代码设置，不能用RPG maker MV软件内的API
3. 修复楼梯传送的bug，每次读取时可能会进入别的存档中进过的楼层：修复方法，在MrTS_MapSelection.js中添加delete_all 命令，然后每次呼出楼层传送的时候delete_all再全加上


### 商店
1. 添加PIE_ShopList.js和PIE_ShopSelect.js，以后添加商店就比较容易了
### 楼层飞羽
1. 对称飞羽非常容易
2. 上下飞羽要与楼层传送器共享map：添加PIE_MapList.js, 所有可以在楼层传送器中显示的、上下飞羽可以飞去的map都添加到这里
### 战斗动画魔改
1. 战斗界面：用YEP_BattleEngineCore和YEP_CoreEngine魔改
2. YEP_VictoryAftermath去掉获胜对话框
3. 取消battle start/end 的fade in/out效果，取消battle start的zoom、flash效果：修改rpg_scenes.js
4. 战斗HUD把原来的状态栏去除：修改rpg_windows.js
5. 将魔攻魔防为1的怪物在战斗对战显示为0，修改OrangeHudActorStatus.js
6. 快速战斗 VeryFastBattle
7. 去除被击败时的text message：rpg_managers.js
8. battle 进入gameover把之前删掉的fade in加回来：rpg_scenes.js
9. gameover进入太突然了，sleep一秒：rpg_managers.js
10. 修改敌人和主角的战斗界面的位置：主角用YEP_BattleEngineCore，敌人的用MrTS_EnemyPosition
11. pop damage位置不对，在rpg_sprites.js里面修改
12. 战斗时间缩短：在YEP_VictoryAftermath里面缩短战斗胜利cheer的时间，在rpg_sprites.js里缩短怪物死后消失的时间
13. 增加铁剑动画的时候，勇者会显示挥舞一把小剑的动画，把system/weapons1.png变成透明即可
14. 状态战斗后会消失bug修复：rpg_managers.js里面processVictory函数中删除removeBattleStates()，还没测试是否有效
### Bug & TODO


### Localization String 使用列表
1. YEP_MainMenuManager item 99: 读取
2. OrangeHUD系列
3. LTN_WindowPop: Gain/Lose String: 获得 使用
4. 数据库
5. rpg_managers.js auto battle string：自动战斗
6. enemyBook
7. PIE系列


### Copyright
1. Oz & Kenichi(魔塔原作者): https://wwajp.com/mtower/
2. Yanfly.moe: YEP_CoreEngine.js, YEP_MainMenuManager.js, YEP_BattleEngineCore.js, YEP_VictoryAftermath.js, YEP_ButtonCommonEvent.js, YEP_X_ExtMesPack1.js, YEP_EventMiniLabel.js, 窗口皮肤
3. Hudell Tales: Orange Hud: HUD display 系列
4. Sasuke KANNAZUKI, 星潟: VeryFastBattle.js
5. LTN Games: LTN_WindowPop.js
6. Mr. Trivel: MrTS_EnemyPostions.js, MrTS_MapSelection.js, MrTS_NoItemCategories.js
7. HimeWorks: HIME_HMSChoiceDisplayMode.js
8. Ellye: ellystatesdamage.js
9. Atreyo Ray: ARP_TitleCommandExit.js
10. McKathlin: Custom Game Over behavior: https://forums.rpgmakerweb.com/index.php?threads/custom-game-over-behavior.55072/
11. Dark room: Terrax lighting system https://www.makerdevs.com/plugin/terrax-lighting-system
