require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  AvatarJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4b74xyQZhLWq6fX376gOJv", "AvatarJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playerIcon: cc.Sprite,
        playerName: cc.Label,
        playerLvl: cc.Sprite,
        iconHold: cc.SpriteFrame,
        icon: {
          set: function set(newValue) {
            var _this = this;
            var avatar = newValue.avatar;
            avatar ? cc.loader.load({
              url: avatar,
              type: "png"
            }, function(err, texture) {
              err ? cc.log(err) : _this.playerIcon.spriteFrame = new cc.SpriteFrame(texture);
            }) : this.playerIcon.spriteFrame = this.iconHold;
          }
        }
      },
      onSetData: function onSetData(_data) {
        this.playerName = "玩家昵称";
        this.playerLvl = _data.level;
      }
    });
    cc._RF.pop();
  }, {} ],
  DailyTaskData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ce26rLDsBDwY/DyE8cVcYE", "DailyTaskData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Tilte: "登陆奖励",
      Desc: "连续登陆可领取20钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["1"] = {
      PID: "1",
      Tilte: "分享微信群（0/1）",
      Desc: "每日分享可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["2"] = {
      PID: "2",
      Tilte: "邀请好友（0/3）",
      Desc: "每日邀请可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["3"] = {
      PID: "3",
      Tilte: "领取食物",
      Desc: "每日可领取一份食物",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["4"] = {
      PID: "4",
      Tilte: "登陆奖励",
      Desc: "连续登陆可领取20钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["5"] = {
      PID: "5",
      Tilte: "分享微信群（0/1）",
      Desc: "每日分享可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["6"] = {
      PID: "6",
      Tilte: "邀请好友（0/3）",
      Desc: "每日邀请可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["7"] = {
      PID: "7",
      Tilte: "领取食物",
      Desc: "每日可领取一份食物",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["8"] = {
      PID: "8",
      Tilte: "登陆奖励",
      Desc: "连续登陆可领取20钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["9"] = {
      PID: "9",
      Tilte: "分享微信群（0/1）",
      Desc: "每日分享可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["10"] = {
      PID: "10",
      Tilte: "邀请好友（0/3）",
      Desc: "每日邀请可得50钻石",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    data["11"] = {
      PID: "11",
      Tilte: "领取食物",
      Desc: "每日可领取一份食物",
      ColorTitle: "754c00",
      ColorDesc: "d75100"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  DailyTaskItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b27b6dDnfNMF5pm0ebonHIy", "DailyTaskItemJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        richTextTitle: cc.RichText,
        richTextDesc: cc.RichText
      },
      onSetData: function onSetData(_data) {
        this.richTextTitle.string = "<color=#" + _data.ColorTitle + ">" + _data.Tilte + "</c>";
        this.richTextDesc.string = "<color=#" + _data.ColorDesc + ">" + _data.Desc + "</c>";
      },
      onClickGetBtn: function onClickGetBtn(evn, type) {
        cc.log("onClickGetBtn");
      }
    });
    cc._RF.pop();
  }, {} ],
  DailyTaskPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "934b37pF55KlZbARerS4Qxk", "DailyTaskPanelJS");
    "use strict";
    var DailyTaskData = require("DailyTaskData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        dailTaskItemPre: cc.Prefab
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.onSetData(DailyTaskData);
      },
      onEnable: function onEnable() {
        this.scrollView.scrollToTop(.3);
      },
      onSetData: function onSetData(_data) {
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0;
        for (i; i < _data.length; i++) {
          data = _data[i];
          itemPre = cc.instantiate(this.dailTaskItemPre);
          if (null == itemPre || null == data) continue;
          this.content.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "DailyTaskItemJS");
          if (null == itemJS) continue;
          itemJS.onSetData(data);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    DailyTaskData: "DailyTaskData",
    UITools: "UITools"
  } ],
  EarnDiamondsPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc118nBjaxCrp6mY+emQbkM", "EarnDiamondsPanelJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        itemIcon: cc.Sprite,
        itemLable: cc.Label
      },
      onLoad: function onLoad() {},
      onSetData: function onSetData(_data) {
        var iconPath = "resources/textures/icon/headIcon.png";
        UITools.setSpriteImg(this.rewardIcon, iconPath);
        this.itemLable.string = "叫什麽呢？？";
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      },
      onClickWatchVideoBtn: function onClickWatchVideoBtn(evn, type) {
        this.onSetNodeVisible(evn, type, false);
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  GC: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af23dTG86tI6pF4Ydte4h2o", "GC");
    "use strict";
    var GC = GC || {};
    cc.net = {};
    cc.net.url = "127.0.0.1:";
    cc.net.port = 8880;
    cc.net.io = null;
    cc.Host = "ws://uniugame.cn:12345/echo";
    module.exports = {
      GC: GC
    };
    cc._RF.pop();
  }, {} ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7c70yysvpDw7j66IvdNhM0", "Global");
    "use strict";
    cc._RF.pop();
  }, {} ],
  HeroData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fba32gyWlpEb4IKlXq5tLwu", "HeroData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "魔法师",
      Desc: "女性角色",
      HeroType: "0",
      UpdateGold: "101G",
      HeroSkill: "1|2|3|4|5|6|7",
      Hurt: "10.0K",
      Icon: "1"
    };
    data["1"] = {
      PID: "1",
      Name: "战士",
      Desc: "男性角色",
      HeroType: "1",
      UpdateGold: "100G",
      HeroSkill: "1|2|3|4|5|6|7",
      Hurt: "10.0K",
      Icon: "2"
    };
    data["2"] = {
      PID: "2",
      Name: "小毛绒",
      Desc: "辅助角色1",
      HeroType: "2",
      UpdateGold: "102G",
      HeroSkill: "",
      Hurt: "1.0K",
      Icon: "3"
    };
    data["3"] = {
      PID: "3",
      Name: "萌兔",
      Desc: "辅助角色2",
      HeroType: "2",
      UpdateGold: "103G",
      HeroSkill: "",
      Hurt: "2.0K",
      Icon: "4"
    };
    data["4"] = {
      PID: "4",
      Name: "史莱姆",
      Desc: "辅助角色3",
      HeroType: "2",
      UpdateGold: "104G",
      HeroSkill: "",
      Hurt: "3.0K",
      Icon: "5"
    };
    data["5"] = {
      PID: "5",
      Name: "火焰",
      Desc: "辅助角色4",
      HeroType: "2",
      UpdateGold: "105G",
      HeroSkill: "",
      Hurt: "4.0K",
      Icon: "6"
    };
    data["6"] = {
      PID: "6",
      Name: "飞鼠",
      Desc: "辅助角色5",
      HeroType: "2",
      UpdateGold: "106G",
      HeroSkill: "",
      Hurt: "5.0K",
      Icon: "7"
    };
    data["7"] = {
      PID: "7",
      Name: "猎鸟",
      Desc: "辅助角色6",
      HeroType: "2",
      UpdateGold: "107G",
      HeroSkill: "",
      Hurt: "6.0K",
      Icon: "8"
    };
    data["8"] = {
      PID: "8",
      Name: "火焰龙",
      Desc: "辅助角色7",
      HeroType: "2",
      UpdateGold: "108G",
      HeroSkill: "",
      Hurt: "7.0K",
      Icon: "2"
    };
    data["9"] = {
      PID: "9",
      Name: "地狱兽",
      Desc: "辅助角色8",
      HeroType: "2",
      UpdateGold: "109G",
      HeroSkill: "",
      Hurt: "8.0K",
      Icon: "4"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  HeroItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "182a9ptiShNxIGMvtfTG4tQ", "HeroItemJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        heroIcon: cc.Sprite,
        heroLvl: cc.Label,
        progress: cc.ProgressBar
      },
      onSetData: function onSetData(_data) {
        if (null == _data) return;
        this.heroLvl.string = _data.Name;
      },
      onClickButBtn: function onClickButBtn(evn, type) {
        cc.log("onClickButBtn");
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  InviteData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "78563O2CbNIeqdZSU7t502x", "InviteData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Desc: "邀请1位，奖励钻石a能量b",
      RewardDiamonds: "100",
      RewardEnergy: "10"
    };
    data["1"] = {
      PID: "1",
      Desc: "邀请2位，奖励钻石a能量b",
      RewardDiamonds: "200",
      RewardEnergy: "20"
    };
    data["2"] = {
      PID: "2",
      Desc: "邀请3位，奖励钻石a能量b",
      RewardDiamonds: "300",
      RewardEnergy: "30"
    };
    data["3"] = {
      PID: "3",
      Desc: "邀请4位，奖励钻石a能量b",
      RewardDiamonds: "400",
      RewardEnergy: "40"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  InviteItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "060ffHFtpJG0KKWcMKVFruv", "InviteItemJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playerIcon: cc.Sprite,
        rewardLabel1: cc.Label,
        rewardLabel2: cc.Label
      },
      onSetData: function onSetData(_data) {
        if (null == _data) return;
        this.rewardLabel1.string = "砖石*" + _data.RewardDiamonds;
        this.rewardLabel2.string = "能量*" + _data.RewardEnergy;
      },
      onClickGetBtn: function onClickGetBtn(evn, type) {
        cc.log("onClickGetBtn");
      }
    });
    cc._RF.pop();
  }, {} ],
  InvitePanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a345aUCYlETJvIG1j7haG4", "InvitePanelJS");
    "use strict";
    var InviteData = require("InviteData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        inviteItemPre: cc.Prefab,
        scrollView: cc.ScrollView
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
      },
      onEnable: function onEnable() {
        this.onSetData();
      },
      onSetData: function onSetData() {
        this.content.removeAllChildren(true);
        this.scrollView.scrollToTop(.3);
        var item = void 0, itemJS = void 0;
        for (var i = 0; i < InviteData.length; i++) {
          item = cc.instantiate(this.inviteItemPre);
          this.content.addChild(item);
          itemJS = UITools.onGetNodeCompontent(item, "InviteItemJS");
          itemJS && itemJS.onSetData(InviteData[i]);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      },
      onClickInviteBtn: function onClickInviteBtn(evn, type) {
        cc.log("onClickInviteBtn");
      }
    });
    cc._RF.pop();
  }, {
    InviteData: "InviteData",
    UITools: "UITools"
  } ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47de3ZQ/2lP4IXOzsSbxSAg", "MainScene");
    "use strict";
    var SkillData = require("SkillData");
    var HeroData = require("HeroData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        otherUINode: cc.Node,
        skillItemPre: cc.Prefab,
        skillDescPre: cc.Prefab,
        turnTablePre: cc.Prefab,
        noticePanelPre: cc.Prefab,
        dailyTaskPanelPre: cc.Prefab,
        earnDiamondsPanelPre: cc.Prefab,
        siginPanelPre: cc.Prefab,
        rankPanelPre: cc.Prefab,
        marketPanelPre: cc.Prefab,
        shopPanelPre: cc.Prefab,
        otherPanelPre: cc.Prefab,
        vipPanelPre: cc.Prefab,
        invitePanelPre: cc.Prefab,
        updatePanelPre: cc.Prefab,
        vipNode: cc.Node,
        triBtn: cc.Button,
        foldNode: cc.Node,
        heroItemPre: cc.Prefab,
        myHeroNode: cc.Node,
        leftScrollView: cc.ScrollView,
        rightScrollView: cc.ScrollView,
        skillScrollView: cc.ScrollView
      },
      onLoad: function onLoad() {
        this.foldNodeW = this.foldNode.width + 10;
        this.skillContent = this.skillScrollView.content;
        this.leftContent = this.leftScrollView.content;
        this.rightContent = this.rightScrollView.content;
        this.initUI();
        this.onClickTriBtn(null, null, 1);
      },
      onEnable: function onEnable() {
        this.openNoticePanel();
        this.vipNode.on(cc.Node.EventType.TOUCH_START, this.onClickVIPBtn, this);
      },
      onDisable: function onDisable() {
        this.vipNode.off(cc.Node.EventType.TOUCH_START, this.onClickVIPBtn, this);
      },
      initUI: function initUI() {
        this.foldNode.setPositionX(-this.foldNodeW);
        var panelPrefab = UITools.onInstantiate(this.skillDescPre, this.otherUINode, cc.p(0, 0), false);
        this.SkillDescPanelJS = UITools.onGetNodeCompontent(panelPrefab, "SkillDescPanelJS");
        panelPrefab = UITools.onInstantiate(this.turnTablePre, this.otherUINode, cc.p(0, 0), false);
        this.TurntableJS = UITools.onGetNodeCompontent(panelPrefab, "TurntablePanelJS");
        this.TurntableJS.onSetParent(this);
        panelPrefab = UITools.onInstantiate(this.noticePanelPre, this.otherUINode, cc.p(0, 0), false);
        this.NoticePanelJS = UITools.onGetNodeCompontent(panelPrefab, "NoticePanelJS");
        panelPrefab = UITools.onInstantiate(this.dailyTaskPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.DailyTaskPanelJS = UITools.onGetNodeCompontent(panelPrefab, "DailyTaskPanelJS");
        panelPrefab = UITools.onInstantiate(this.earnDiamondsPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.EarnDiamondsPanelJS = UITools.onGetNodeCompontent(panelPrefab, "EarnDiamondsPanelJS");
        panelPrefab = UITools.onInstantiate(this.siginPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.SignInPanelJS = UITools.onGetNodeCompontent(panelPrefab, "SignInPanelJS");
        panelPrefab = UITools.onInstantiate(this.rankPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.RankPanelJS = UITools.onGetNodeCompontent(panelPrefab, "RankPanelJS");
        panelPrefab = UITools.onInstantiate(this.marketPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.MarketPanelJS = UITools.onGetNodeCompontent(panelPrefab, "MarketPanelJS");
        panelPrefab = UITools.onInstantiate(this.shopPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.ShopPanelJS = UITools.onGetNodeCompontent(panelPrefab, "ShopPanelJS");
        panelPrefab = UITools.onInstantiate(this.otherPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.OtherPanelJS = UITools.onGetNodeCompontent(panelPrefab, "OtherPanelJS");
        panelPrefab = UITools.onInstantiate(this.vipPanelPre, this.otherUINode, cc.p(0, 0), false);
        this.VIPPanelJS = UITools.onGetNodeCompontent(panelPrefab, "VIPPanelJS");
        panelPrefab = UITools.onInstantiate(this.invitePanelPre, this.otherUINode, cc.p(0, 0), false);
        this.InvitePanelJS = UITools.onGetNodeCompontent(panelPrefab, "InvitePanelJS");
        panelPrefab = UITools.onInstantiate(this.updatePanelPre, this.otherUINode, cc.p(0, 0), false);
        this.UpdatePanelJS = UITools.onGetNodeCompontent(panelPrefab, "UpdatePanelJS");
        this.initSkillUI();
        this.initHeroUI();
      },
      initSkillUI: function initSkillUI() {
        this.skillContent.removeAllChildren(true);
        this.skillScrollView.scrollToTop(.3);
        var item = void 0, itemJS = void 0, data = void 0;
        for (var i = 0; i < SkillData.length; i++) {
          data = SkillData[i];
          item = cc.instantiate(this.skillItemPre);
          item.setPositionY(-20);
          if (null == item) continue;
          this.skillContent.addChild(item);
          itemJS = UITools.onGetNodeCompontent(item, "SkillItemJS");
          if (itemJS) {
            data.isShow = false;
            itemJS.onSetParent(this);
            itemJS.onSetData(data);
          }
        }
      },
      initHeroUI: function initHeroUI() {
        this.leftContent.removeAllChildren(true);
        this.rightContent.removeAllChildren(true);
        this.leftScrollView.scrollToTop(.3);
        this.rightScrollView.scrollToTop(.3);
        var sex = 1;
        var i = void 0, item = void 0, itemJS = void 0, data = void 0;
        for (i = 0; i < HeroData.length; i++) {
          item = cc.instantiate(this.heroItemPre);
          if (i < 2) {
            if (sex == i) {
              data = HeroData[sex];
              this.myHeroNode.addChild(item);
            }
          } else {
            data = HeroData[i];
            (i - 2) % 2 == 0 ? this.leftContent.addChild(item) : this.rightContent.addChild(item);
          }
          itemJS = UITools.onGetNodeCompontent(item, "HeroItemJS");
          itemJS && itemJS.onSetData(data);
        }
      },
      onClickTriBtn: function onClickTriBtn(evn, type, _scale) {
        var scale = this.triBtn.node.getScaleX();
        scale = null != _scale && void 0 != _scale ? _scale : 1 == scale ? -1 : 1;
        this.triBtn.node.setScaleX(scale);
        var moveTo = 1 == scale ? cc.moveTo(.3, -this.foldNodeW, 0).easing(cc.easeBackIn()) : cc.moveTo(.3, 0, 0).easing(cc.easeBackOut());
        this.foldNode.runAction(moveTo);
      },
      onClickNoticeBtn: function onClickNoticeBtn(evn, type) {
        this.openNoticePanel();
      },
      onClickDailTaskBtn: function onClickDailTaskBtn(evn, type) {
        this.DailyTaskPanelJS && this.DailyTaskPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickEarnDiamondBtn: function onClickEarnDiamondBtn(evn, type) {
        this.EarnDiamondsPanelJS && this.EarnDiamondsPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickSignInBtn: function onClickSignInBtn(evn, type) {
        this.SignInPanelJS && this.SignInPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickRankBtn: function onClickRankBtn(evn, type) {
        this.RankPanelJS && this.RankPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickMarketBtn: function onClickMarketBtn(evn, type) {
        this.MarketPanelJS && this.MarketPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickShopBtn: function onClickShopBtn(evn, type) {
        this.ShopPanelJS && this.ShopPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickOtherBtn: function onClickOtherBtn(evn, type) {
        if (this.OtherPanelJS) {
          this.OtherPanelJS.onSetData(type);
          this.OtherPanelJS.onSetNodeVisible(evn, type, true);
        }
      },
      onClickVIPBtn: function onClickVIPBtn(evn, type) {
        this.VIPPanelJS && this.VIPPanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickInviteBtn: function onClickInviteBtn(evn, type) {
        this.InvitePanelJS && this.InvitePanelJS.onSetNodeVisible(evn, type, true);
      },
      onClickUpdateBtn: function onClickUpdateBtn(evn, type) {
        this.UpdatePanelJS && this.UpdatePanelJS.onSetNodeVisible(evn, type, true);
      },
      openSkillDescPanel: function openSkillDescPanel(_skillType, _data) {
        if (this.SkillDescPanelJS) {
          this.SkillDescPanelJS.onSetData(_data);
          this.SkillDescPanelJS.onSetNodeVisible(null, null, true);
        }
      },
      openNoticePanel: function openNoticePanel() {
        this.NoticePanelJS && this.NoticePanelJS.onSetNodeVisible(null, null, true);
      },
      onClickTurntableBtn: function onClickTurntableBtn(evn, type) {
        this.TurntableJS.onSetNodeVisible(evn, type, true);
      }
    });
    cc._RF.pop();
  }, {
    HeroData: "HeroData",
    SkillData: "SkillData",
    UITools: "UITools"
  } ],
  MarketData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4edf0LkX6lHRoa+q5PzTypm", "MarketData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "棒棒糖",
      Desc: "唤醒时间15分钟",
      EnergyCost: "5",
      Icon: "img_mk_sugar"
    };
    data["1"] = {
      PID: "1",
      Name: "牛奶",
      Desc: "唤醒时间30分钟",
      EnergyCost: "10",
      Icon: "img_mk_milk"
    };
    data["2"] = {
      PID: "2",
      Name: "面包",
      Desc: "唤醒时间1小时",
      EnergyCost: "20",
      Icon: "img_mk_bread"
    };
    data["3"] = {
      PID: "3",
      Name: "烤鸭",
      Desc: "唤醒时间2小时",
      EnergyCost: "30",
      Icon: "img_mk_duck"
    };
    data["4"] = {
      PID: "4",
      Name: "罐头 ",
      Desc: "唤醒时间3小时",
      EnergyCost: "40",
      Icon: "img_mk_tim"
    };
    data["5"] = {
      PID: "5",
      Name: "啤酒",
      Desc: "唤醒时间4小时，攻击力增加10%",
      EnergyCost: "5",
      Icon: "img_mk_beer"
    };
    data["6"] = {
      PID: "6",
      Name: "蜂蜜",
      Desc: "唤醒时间5小时，攻击力增加15%",
      EnergyCost: "10",
      Icon: "img_mk_honey"
    };
    data["7"] = {
      PID: "7",
      Name: "白酒",
      Desc: "唤醒时间6小时，攻击力增加30%",
      EnergyCost: "15",
      Icon: "img_mk_wine"
    };
    data["8"] = {
      PID: "8",
      Name: "提神咖啡",
      Desc: "唤醒时间7小时，攻击力增加40%",
      EnergyCost: "20",
      Icon: "img_mk_coffee"
    };
    data["9"] = {
      PID: "9",
      Name: "功能饮料",
      Desc: "唤醒时间8小时，攻击力50%，攻击速度加30%",
      EnergyCost: "80",
      Icon: "img_mk_drink"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  MarketItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ebe7ep914NItYeDl652MY4Y", "MarketItemJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        itemIcon: cc.Sprite,
        numLabel: cc.Label,
        nameLabel: cc.Label,
        awakeLabel: cc.Label,
        priceLabel: cc.Label
      },
      onSetData: function onSetData(_data) {
        var iconPath = "resources/textures/icon/" + _data.Icon + ".png";
        UITools.setSpriteImg(this.itemIcon, iconPath);
        this.numLabel.string = "持有数量:0";
        this.nameLabel.string = _data.Name;
        this.awakeLabel.string = _data.Desc;
        this.priceLabel.string = _data.EnergyCost;
      },
      onClickButBtn: function onClickButBtn(evn, type) {
        cc.log("onClickButBtn");
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  MarketPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c77c3XVgJdNdYd991gLfecO", "MarketPanelJS");
    "use strict";
    var MarketData = require("MarketData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        marketItemPre: cc.Prefab
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.onSetData(MarketData);
      },
      onEnable: function onEnable() {
        this.scrollView.scrollToTop(.3);
      },
      onSetData: function onSetData(_data) {
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0;
        for (i; i < _data.length; i++) {
          data = _data[i];
          itemPre = cc.instantiate(this.marketItemPre);
          if (null == itemPre || null == data) continue;
          this.content.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "MarketItemJS");
          if (null == itemJS) continue;
          itemJS.onSetData(data);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    MarketData: "MarketData",
    UITools: "UITools"
  } ],
  MonsterData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e89f3xebzBHC6dHtkslbcgW", "MonsterData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "粉绿豆豆",
      Desc: "",
      AnimName: "monster1"
    };
    data["1"] = {
      PID: "1",
      Name: "黄豆豆",
      Desc: "",
      AnimName: "monster2"
    };
    data["2"] = {
      PID: "2",
      Name: "粽子豆",
      Desc: "",
      AnimName: "monster3"
    };
    data["3"] = {
      PID: "3",
      Name: "泥巴豆",
      Desc: "",
      AnimName: "monster4"
    };
    data["4"] = {
      PID: "4",
      Name: "三角豆",
      Desc: "",
      AnimName: "monster5"
    };
    data["5"] = {
      PID: "5",
      Name: "冰激凌豆",
      Desc: "",
      AnimName: "monster6"
    };
    data["6"] = {
      PID: "6",
      Name: "天线宝宝豆",
      Desc: "",
      AnimName: "monster7"
    };
    data["7"] = {
      PID: "7",
      Name: "疯狂豆",
      Desc: "",
      AnimName: "monster8"
    };
    data["8"] = {
      PID: "8",
      Name: "虚空豆",
      Desc: "",
      AnimName: "monster9"
    };
    data["9"] = {
      PID: "9",
      Name: "虚空豆升级",
      Desc: "",
      AnimName: "monster10"
    };
    data["10"] = {
      PID: "10",
      Name: "虎纹豆",
      Desc: "",
      AnimName: "monster11"
    };
    data["11"] = {
      PID: "11",
      Name: "虎纹豆升级",
      Desc: "",
      AnimName: "monster12"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  NoticePanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64cb9/Ylp9MAL9Brywfz3pG", "NoticePanelJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        richText: cc.RichText
      },
      onEnable: function onEnable() {
        this.scrollView.scrollToTop(.3);
        this.onSetData("这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告这是公告");
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      },
      onSetData: function onSetData(_data) {
        this.richText.string = _data;
      }
    });
    cc._RF.pop();
  }, {} ],
  OtherPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96e28FuWshN87oKcsb1V8ta", "OtherPanelJS");
    "use strict";
    var TYPE = cc.Enum({
      firstRecharge: "1",
      fllow: "3"
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        bgSprSF: [ cc.SpriteFrame ],
        bgSpr: cc.Sprite,
        buyButton: cc.Button
      },
      onEnable: function onEnable() {
        this.buyButton.node.active = false;
      },
      onSetData: function onSetData(_type) {
        _type == TYPE.firstRecharge ? this.bgSpr.spriteFrame = this.bgSprSF[0] : _type == TYPE.fllow && (this.bgSpr.spriteFrame = this.bgSprSF[1]);
        this.buyButton.node.active = _type == TYPE.firstRecharge;
      },
      onClickBuyBtn: function onClickBuyBtn(evn, type) {
        cc.log("onClickBuyBtn");
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {} ],
  RankPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d785qL5rBB9IY4I8Rajl+4", "RankPanelJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnList: [ cc.Button ],
        scrollView: cc.ScrollView
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
      },
      onEnable: function onEnable() {
        this.onClickBtn(null, 1);
      },
      onSetData: function onSetData(_data) {},
      onClickBtn: function onClickBtn(evn, type) {
        this.scrollView.scrollToTop(.3);
        for (var i = 0; i < this.btnList.length; i++) {
          var btn = this.btnList[i];
          btn && (btn.node.active = i != parseInt(type));
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {} ],
  RechargeItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe7844W+S1HnYdCRtYwjVBQ", "RechargeItemJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        itemIcon: cc.Sprite,
        itemFlag: cc.Node,
        numLabel: cc.Label,
        descLabel: cc.Label,
        priceLabel: cc.Label
      },
      onSetData: function onSetData(_data) {},
      onClickButBtn: function onClickButBtn(evn, type) {
        cc.log("onClickButBtn");
      }
    });
    cc._RF.pop();
  }, {} ],
  RechargePanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa1e359cbBKsYZyQRvjKCFS", "RechargePanelJS");
    "use strict";
    var DailyTaskData = require("DailyTaskData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        rechargeItemPre: cc.Prefab
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.onSetData(DailyTaskData);
      },
      onEnable: function onEnable() {
        this.scrollView.scrollToTop(.3);
      },
      onSetData: function onSetData(_data) {
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0;
        for (i; i < _data.length; i++) {
          data = _data[i];
          itemPre = cc.instantiate(this.rechargeItemPre);
          if (null == itemPre || null == data) continue;
          this.content.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "RechargeItemJS");
          if (null == itemJS) continue;
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    DailyTaskData: "DailyTaskData",
    UITools: "UITools"
  } ],
  ShopData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a465dOO8n1HJKcB9Vww/vTU", "ShopData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "商品一",
      Desc: "获得12小时的 离线金币收益(22.2K)",
      DiamondCost: "500",
      Icon: "img_re_golds2",
      Type: "1"
    };
    data["1"] = {
      PID: "1",
      Name: "商品二",
      Desc: "能量*10",
      DiamondCost: "50",
      Icon: "img_re_eng0",
      Type: "0"
    };
    data["2"] = {
      PID: "2",
      Name: "商品三",
      Desc: "能量*50",
      DiamondCost: "200",
      Icon: "img_re_eng1",
      Type: "0"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  ShopItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb5d7YWHDlFtaOhtibdMA9R", "ShopItemJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        itemIcon: cc.Sprite,
        itemFlag: cc.Node,
        descLabel: cc.Label,
        priceLabel: cc.Label
      },
      onSetData: function onSetData(_data) {
        var iconPath = "resources/textures/icon/" + _data.Icon + ".png";
        UITools.setSpriteImg(this.itemIcon, iconPath);
        this.itemFlag.active = 1 == parseInt(_data.Type);
        this.descLabel.string = _data.Desc;
        this.priceLabel.string = _data.DiamondCost;
      },
      onClickButBtn: function onClickButBtn(evn, type) {
        cc.log("onClickButBtn");
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  ShopPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95478JhZ5tAwrs+FaKCqHIv", "ShopPanelJS");
    "use strict";
    var ShopData = require("ShopData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        myGemLabel: cc.Label,
        scrollView: cc.ScrollView,
        shopItemPre: cc.Prefab,
        rechargePanelPre: cc.Prefab,
        otherUINode: cc.Node
      },
      onLoad: function onLoad() {
        var panelPrefab = UITools.onInstantiate(this.rechargePanelPre, this.otherUINode, cc.p(0, 0), false);
        this.RechargePanelJS = UITools.onGetNodeCompontent(panelPrefab, "RechargePanelJS");
        this.content = this.scrollView.content;
        this.onSetData(ShopData);
      },
      onEnable: function onEnable() {
        this.scrollView.scrollToTop(.3);
      },
      onSetData: function onSetData(_data) {
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0;
        for (i; i < _data.length; i++) {
          data = _data[i];
          itemPre = cc.instantiate(this.shopItemPre);
          if (null == itemPre || null == data) continue;
          this.content.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "ShopItemJS");
          if (null == itemJS) continue;
          itemJS.onSetData(data);
        }
      },
      onClickRechargeBtn: function onClickRechargeBtn(evn, type) {
        cc.log("onClickRechargeBtn");
        this.RechargePanelJS && this.RechargePanelJS.onSetNodeVisible(evn, type, true);
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    ShopData: "ShopData",
    UITools: "UITools"
  } ],
  SignInData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08688IHkUFGwL1gIYAh6HES", "SignInData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "星期日",
      Desc: "砖石*200|能量*50",
      ColorDesc: "4C0000|4C0000",
      Icon: "img_box",
      BgIcon: "img_siginBg3"
    };
    data["1"] = {
      PID: "1",
      Name: "星期一",
      Desc: "砖石*50",
      ColorDesc: "00244C",
      Icon: "img_box",
      BgIcon: "img_siginBg1"
    };
    data["2"] = {
      PID: "2",
      Name: "星期二",
      Desc: "能量*50",
      ColorDesc: "4C0000",
      Icon: "img_box",
      BgIcon: "img_siginBg2"
    };
    data["3"] = {
      PID: "3",
      Name: "星期三",
      Desc: "砖石*50",
      ColorDesc: "00244C",
      Icon: "img_box",
      BgIcon: "img_siginBg1"
    };
    data["4"] = {
      PID: "4",
      Name: "星期四",
      Desc: "能量*50",
      ColorDesc: "4C0000",
      Icon: "img_box",
      BgIcon: "img_siginBg2"
    };
    data["5"] = {
      PID: "5",
      Name: "星期五",
      Desc: "砖石*50",
      ColorDesc: "00244C",
      Icon: "img_box",
      BgIcon: "img_siginBg1"
    };
    data["6"] = {
      PID: "6",
      Name: "星期六",
      Desc: "能量石*50",
      ColorDesc: "4C0000",
      Icon: "img_box",
      BgIcon: "img_siginBg2"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  SignInItemBaseJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7967btAnV9OnY05phakS/ip", "SignInItemBaseJS");
    "use strict";
    var SignInData = require("SignInData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        itemBtn: cc.Button,
        itemIcon: cc.Sprite,
        itemIcon2: cc.Sprite,
        maskNode: cc.Node,
        flagNode: cc.Node,
        descRT: cc.RichText,
        descRT2: cc.RichText
      },
      onEnable: function onEnable() {
        this.onSetState(false);
      },
      onSetData: function onSetData(_data) {
        this._Data = _data;
        this.initUI();
      },
      initUI: function initUI() {
        var iconPath = "";
        var sprite = this.itemBtn.node.getComponent(cc.Sprite);
        if (sprite) {
          iconPath = "resources/textures/sigin/" + SignInData[this._Data.PID].BgIcon + ".png";
          UITools.setSpriteImg(sprite, iconPath);
        }
        iconPath = "resources/textures/earnAndinvite/" + SignInData[this._Data.PID].Icon + ".png";
        this.maskNode.active = false;
        this.flagNode.active = false;
        if (0 == this._Data.PID) {
          UITools.setSpriteImg(this.itemIcon, iconPath);
          UITools.setSpriteImg(this.itemIcon2, iconPath);
          var desc = this._Data.Desc.split("|");
          var color = this._Data.ColorDesc.split("|");
          this.descRT.string = "<color=#" + color[0] + ">" + desc[0] + "</c>";
          this.descRT2.string = "<color=#" + color[1] + ">" + desc[1] + "</c>";
        } else {
          UITools.setSpriteImg(this.itemIcon, iconPath);
          this.descRT.string = "<color=#" + this._Data.ColorDesc + ">" + this._Data.Desc + "</c>";
        }
      },
      onClickSignInBtn: function onClickSignInBtn(evn, type) {
        cc.log("onClickSignInBtn");
        this.onSetState(true);
      },
      onSetState: function onSetState(_isSignIn) {
        this.itemBtn.interactable = !_isSignIn;
        this.maskNode.active = _isSignIn;
        this.flagNode.active = _isSignIn;
      }
    });
    cc._RF.pop();
  }, {
    SignInData: "SignInData",
    UITools: "UITools"
  } ],
  SignInPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "263c3PiGVhEdoymDrxBf5xb", "SignInPanelJS");
    "use strict";
    var SignInData = require("SignInData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        layoutNode: cc.Node,
        signInGroupItemPre: cc.Prefab,
        signInItem1Pre: cc.Prefab,
        signInItem2Pre: cc.Prefab
      },
      onEnable: function onEnable() {
        this.initUI();
      },
      initUI: function initUI() {
        var item, data, signInItemJS, groupNode;
        var len = SignInData.length;
        for (var i = 0; i < len; i++) {
          if (i % 3 == 0) {
            groupNode = cc.instantiate(this.signInGroupItemPre);
            this.layoutNode.addChild(groupNode);
          }
          if (6 == i) {
            data = SignInData[0];
            item = cc.instantiate(this.signInItem2Pre);
          } else {
            data = SignInData[i + 1];
            item = cc.instantiate(this.signInItem1Pre);
          }
          groupNode.addChild(item);
          signInItemJS = item.getComponent("SignInItemBaseJS");
          signInItemJS && signInItemJS.onSetData(data);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    SignInData: "SignInData",
    UITools: "UITools"
  } ],
  SkillData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65116XvVHxNSb0Z/15Um/6n", "SkillData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "释放",
      Desc: "点击触发所有技能同时释放。   未满技能和技能CD时间时，不可点击。",
      Type: "1",
      CoolTime: "0",
      DurationTime: "",
      LvlLimit: "",
      Icon: "btn_Skill0"
    };
    data["1"] = {
      PID: "1",
      Name: "自动打击",
      Desc: "每秒自动进行10次，持续时间30秒，冷却时间10分钟。",
      Type: "2",
      CoolTime: "60",
      DurationTime: "30",
      LvlLimit: "10",
      Icon: "btn_Skill1"
    };
    data["2"] = {
      PID: "2",
      Name: "强力打击",
      Desc: "对所有豆豆们造成50倍点击伤害，冷却时间10分钟。",
      Type: "2",
      CoolTime: "60",
      DurationTime: "",
      LvlLimit: "25",
      Icon: "btn_Skill2"
    };
    data["3"] = {
      PID: "3",
      Name: "抢钱",
      Desc: "豆豆奉献的金钱增加100%，持续时间30秒，冷却时间10分钟。",
      Type: "2",
      CoolTime: "60",
      DurationTime: "30",
      LvlLimit: "50",
      Icon: "btn_Skill3"
    };
    data["4"] = {
      PID: "4",
      Name: "狂怒",
      Desc: "怒气下，每次点击暴击率增加50%，持续时间30秒，冷却时间10分钟。",
      Type: "2",
      CoolTime: "60",
      DurationTime: "30",
      LvlLimit: "100",
      Icon: "btn_Skill4"
    };
    data["5"] = {
      PID: "5",
      Name: "绞杀",
      Desc: "每次点击攻击力加成200%，持续时间30秒，冷却时间30分钟。",
      Type: "2",
      CoolTime: "180",
      DurationTime: "30",
      LvlLimit: "150",
      Icon: "btn_Skill5"
    };
    data["6"] = {
      PID: "6",
      Name: "灭神",
      Desc: "所有角色攻击速度提高300%，持续30秒，冷却时间30分钟。",
      Type: "2",
      CoolTime: "180",
      DurationTime: "30",
      LvlLimit: "200",
      Icon: "btn_Skill6"
    };
    data["7"] = {
      PID: "7",
      Name: "吸金",
      Desc: "每次点击，豆豆额外奉献10%的金币，持续30秒，冷却1小时。",
      Type: "2",
      CoolTime: "360",
      DurationTime: "30",
      LvlLimit: "250",
      Icon: "btn_Skill7"
    };
    data["8"] = {
      PID: "8",
      Name: "减CD",
      Desc: "清除CD",
      Type: "1",
      CoolTime: "0",
      DurationTime: "",
      LvlLimit: "",
      Icon: "btn_Skill8"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  SkillDescPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "71f2cOjbhRBVps/ncL36vRH", "SkillDescPanelJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        skillIcon: cc.Sprite,
        skillName: cc.Label,
        skillState: cc.Label,
        skillDesc: cc.Label,
        _skillData: null
      },
      onLoad: function onLoad() {
        this._curTimer = Date.now();
      },
      onSetData: function onSetData(_data) {
        this._skillData = _data;
        var iconPath = "resources/textures/main/" + _data.info.Icon + ".png";
        UITools.setSpriteImg(this.skillIcon, iconPath);
        this.skillName.string = _data.info.Name;
        this.skillDesc.string = _data.info.Desc;
        this.updateState(_data.remainTimer);
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      },
      onClickCleanCDBtn: function onClickCleanCDBtn(evn, type) {
        cc.log("onClickCleanCDBtn");
      },
      onClickCleanAllCDBtn: function onClickCleanAllCDBtn(evn, type) {
        cc.log("onClickCleanAllCDBtn");
      },
      updateState: function updateState(_timer) {
        parseInt(_timer) <= 0 ? this.skillState.string = "(冷却完成)" : this.skillState.string = "(冷却中 " + parseInt(_timer) + "s)";
      },
      update: function update() {
        if (false == this.node.active || null == this._skillData) return;
        if (Date.now() - this._curTimer >= 1e3) {
          this._curTimer = Date.now();
          this._skillData.remainTimer -= 1;
          this.updateState(this._skillData.remainTimer);
        }
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  SkillItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b264fDOD/1LI4dkRY5Zafjr", "SkillItemJS");
    "use strict";
    var SkillData = require("SkillData");
    var UITools = require("UITools");
    var touchTime = .5;
    var myLvl = 99;
    cc.Class({
      extends: cc.Component,
      properties: {
        itemIcon: cc.Sprite,
        barIcon: cc.Sprite,
        maskNode: cc.Mask,
        tipsLabel: cc.Label,
        _perClickTimer: 0,
        _isTouching: false,
        _skillData: null,
        _remainTimer: 0
      },
      onLoad: function onLoad() {
        this._perClickTimer = 0;
        this._isTouching = false;
        this.maskNode.node.width = this.node.width;
        this.maskNode.node.height = this.node.height;
        this.maskH = this.maskNode.node.height;
        this._curTimer = Date.now();
      },
      onEnable: function onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
      },
      onDisable: function onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
      },
      touchStart: function touchStart(event) {
        this._isTouching = true;
        this._perClickTimer = 0;
        this._target = event.target;
      },
      touchEnd: function touchEnd(event) {
        cc.log("touchEnd");
        this._isTouching = false;
        this.checkTouchType();
      },
      touchCancel: function touchCancel(event) {
        cc.log("touchCancel");
        this._isTouching = false;
      },
      onSetParent: function onSetParent(_parent) {
        this._parentCtrl = _parent;
      },
      onSetData: function onSetData(_data) {
        this._skillData = _data;
        this._remainTimer = this._skillData.CoolTime;
        var iconPath = "resources/textures/main/" + this._skillData.Icon + ".png";
        UITools.setSpriteImg(this.itemIcon, iconPath);
        iconPath = "resources/textures/main/" + this._skillData.Icon + "_0.png";
        UITools.setSpriteImg(this.barIcon, iconPath);
        var randLvl = 99;
        this.tipsLabel.string = this._skillData.LvlLimit + "级开启";
        this.tipsLabel.node.active = this._skillData.LvlLimit > randLvl;
      },
      checkTouchType: function checkTouchType() {
        cc.log("您点击的时间为 ： " + this._perClickTimer);
        if (this._perClickTimer >= touchTime) {
          cc.log("打开技能详情面板");
          var data = {
            info: this._skillData,
            remainTimer: this._remainTimer
          };
          this._parentCtrl && this._parentCtrl.openSkillDescPanel(this._skillData.PID, data);
        } else {
          var name = this._target.name;
          name = name.slice(9);
          cc.log("您点击了技能 " + name + " , 该技能是否冷却完毕 ？" + this.isCoolDone());
        }
      },
      isCoolDone: function isCoolDone() {
        return true == this._skillData.isShow ? this.isOpenSkill() : this._remainTimer <= 0 && this.maskNode.node.height <= 0 && this.isOpenSkill();
      },
      isOpenSkill: function isOpenSkill() {
        return myLvl >= this._skillData.LvlLimit;
      },
      updateProgress: function updateProgress(_progress) {
        if (false == this.isOpenSkill()) return;
        this.maskNode.node.height = this.maskH * _progress;
      },
      update: function update(_dt) {
        if (null == this._skillData) return;
        true == this._isTouching && (this._perClickTimer += _dt);
        if (Date.now() - this._curTimer >= 1e3) {
          this._curTimer = Date.now();
          this._remainTimer -= 1;
          var progress = this._skillData.CoolTime <= 0 ? 0 : parseFloat(this._remainTimer / this._skillData.CoolTime);
          true == this._skillData.isShow && (progress = this.isOpenSkill() ? 0 : 1);
          this.updateProgress(progress);
        }
      }
    });
    cc._RF.pop();
  }, {
    SkillData: "SkillData",
    UITools: "UITools"
  } ],
  TurntableData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d22ca1KUopL26cHoksXzqyL", "TurntableData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "小袋金钱",
      Desc: "获得当前金钱基数的2倍金钱，角色初始金钱100",
      Icon: "1"
    };
    data["1"] = {
      PID: "1",
      Name: "大袋金钱",
      Desc: "获得当前金钱基数的4倍金钱",
      Icon: "2"
    };
    data["2"] = {
      PID: "2",
      Name: "钻石",
      Desc: "加20钻石",
      Icon: "3"
    };
    data["3"] = {
      PID: "3",
      Name: "催眠",
      Desc: "随机进入自身排行上下10名的其他玩家基地，催眠一名除主角以外的人物，并获得对方玩家50%的金币",
      Icon: "4"
    };
    data["4"] = {
      PID: "4",
      Name: "食物",
      Desc: "获得随机食物",
      Icon: "5"
    };
    data["5"] = {
      PID: "5",
      Name: "能量值",
      Desc: "共20，点击一次少1次",
      Icon: "6"
    };
    data["6"] = {
      PID: "6",
      Name: "双倍转盘",
      Desc: "切换双倍，每次减少2点能量，获得双倍奖励",
      Icon: "7"
    };
    data["7"] = {
      PID: "7",
      Name: "恢复",
      Desc: "每1小时，恢复4点能量",
      Icon: "8"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  TurntableItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b81470zdrtOFqfrokY3jsYg", "TurntableItemJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        rewardIcon: cc.Sprite,
        rewardName: cc.Label
      },
      onSetData: function onSetData(_data) {
        var iconPath = "resources/textures/turntable/" + _data.Icon + ".png";
        UITools.setSpriteImg(this.rewardIcon, iconPath);
        this.rewardName.string = _data.Name;
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  TurntablePanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03471ZEK0xHF6aoseyYoy/8", "TurntablePanelJS");
    "use strict";
    var TurntableData = require("TurntableData");
    var UITools = require("UITools");
    var radiusRotio = .6;
    var minDurationTime = 2;
    var maxDurationTime = 4;
    var minSpeed = 0;
    var maxSpeed = 10;
    var timeRate = 1.5;
    var STATETYPE = cc.Enum({
      stopped: 0,
      acceleration: 1,
      done: 2
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        energyHelpNode: cc.Node,
        startBtn: cc.Button,
        turnTableNode: cc.Node,
        turnTableItemPre: cc.Prefab,
        progressBar: cc.ProgressBar,
        progressLabel: cc.Label,
        tipsLabel: cc.Label,
        _acc: 0,
        _curSpeed: 0,
        _perClickTimer: 0,
        _isTouching: false
      },
      onLoad: function onLoad() {
        this._curTimer = Date.now();
        this._curEnergy = 0;
        this._acc = 0;
        this._curSpeed = 0;
        this._perClickTimer = 0;
        this._isTouching = false;
        this._curState = STATETYPE.stopped;
        this._turnTableR = (this.turnTableNode.width + this.turnTableNode.height) / 4;
        this._turntableData = TurntableData;
        this._totalRewardNum = this._turntableData.length;
        this._angleCell = 2 * Math.PI / this._totalRewardNum;
        this.turnTableNode.rotation = -22.5;
        this.initUI();
        this.onSetData();
      },
      onEnable: function onEnable() {
        this.startBtn.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.startBtn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.turnTableNode.rotation = -.5 * this._angleCell;
      },
      onDisable: function onDisable() {
        this.startBtn.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.startBtn.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.startBtn.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
      },
      touchStart: function touchStart() {
        this._perClickTimer = 0;
        this._isTouching = true;
      },
      touchEnd: function touchEnd() {
        this._isTouching = false;
        this.checkTouchType();
      },
      touchCancel: function touchCancel() {
        this._isTouching = false;
      },
      checkTouchType: function checkTouchType() {
        if (this._curState != STATETYPE.stopped) return;
        if (this._curEnergy < this._needEnergy) {
          cc.log("能量不够");
          this.onSetEnergyHelpVisible(null, null, true);
          return;
        }
        this._curEnergy -= this._needEnergy;
        this.updateProgressBar();
        this.updateTipsLabelData();
        this._curState = STATETYPE.acceleration;
        this._curSpeed = 0;
        this._perClickTimer = this._perClickTimer < minDurationTime ? minDurationTime : this._perClickTimer;
        this._perClickTimer = this._perClickTimer > maxDurationTime ? maxDurationTime : this._perClickTimer;
        this._perClickTimer = this._perClickTimer * timeRate;
        this._acc = .1 * this._perClickTimer;
        cc.log("要旋转的时间　：" + this._perClickTimer);
      },
      onSetParent: function onSetParent(_parent) {
        this._parentCtrl = _parent;
      },
      onSetData: function onSetData(_data) {
        this._tempTimer = 0;
        this._energyTimer = 10;
        this._energyOffset = 40;
        this._needEnergy = 100;
        this.updateProgressBar();
        this.updateTipsLabelData();
      },
      initUI: function initUI() {
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0, angle = void 0, x = void 0, y = void 0;
        for (i; i < this._totalRewardNum; i++) {
          data = this._turntableData[i];
          itemPre = cc.instantiate(this.turnTableItemPre);
          if (null == itemPre || null == data) continue;
          angle = i * this._angleCell;
          x = this._turnTableR * radiusRotio * Math.sin(angle);
          y = this._turnTableR * radiusRotio * Math.cos(angle);
          itemPre.setPosition(x, y);
          itemPre.rotation = 180 * angle / Math.PI;
          this.turnTableNode.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "TurntableItemJS");
          if (null == itemJS) continue;
          itemJS.onSetData(data);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      },
      updateProgressBar: function updateProgressBar() {
        var progress = this._curEnergy / this._needEnergy;
        this.progressBar.progress = progress;
        this.progressLabel.string = this._curEnergy + " / " + this._needEnergy;
      },
      updateTipsLabelData: function updateTipsLabelData() {
        var remainTimer = this._energyTimer - this._tempTimer;
        this.tipsLabel.string = remainTimer + "秒后回复" + this._energyOffset + "点能量";
      },
      update: function update(_dt) {
        if (Date.now() - this._curTimer >= 1e3) {
          this._curTimer = Date.now();
          this._tempTimer += 1;
          if (this._tempTimer == this._energyTimer) {
            this._tempTimer = 0;
            this._curEnergy += this._energyOffset;
            this.updateProgressBar();
          }
          this.updateTipsLabelData();
        }
        true == this._isTouching && this._curState == STATETYPE.stopped && (this._perClickTimer += _dt);
        if (this._curState == STATETYPE.acceleration) if (this._perClickTimer > 0) {
          cc.log("加速中...");
          this._perClickTimer -= _dt;
          this.turnTableNode.rotation > 360 && (this.turnTableNode.rotation = 0);
          this.turnTableNode.rotation = this.turnTableNode.rotation + this._curSpeed;
          this._curSpeed <= maxSpeed && (this._curSpeed += this._acc);
        } else {
          cc.log("减速中...");
          this.turnTableNode.rotation > 360 && (this.turnTableNode.rotation = 0);
          this.turnTableNode.rotation = this.turnTableNode.rotation + this._curSpeed;
          this._curSpeed > minSpeed ? this._curSpeed -= this._acc / 2 : this._curState = STATETYPE.done;
        } else if (this._curState == STATETYPE.done) {
          cc.log("完成了...");
          this._curState = STATETYPE.stopped;
          this.showResult();
        }
      },
      showResult: function showResult() {
        var finalIndex = Math.round(this.turnTableNode.rotation / (180 * this._angleCell / Math.PI));
        var finalRotation = finalIndex * (180 * this._angleCell / Math.PI);
        var self = this;
        this.turnTableNode.runAction(cc.sequence(cc.rotateTo(1.5, finalRotation).easing(cc.easeBackInOut()), cc.callFunc(function() {
          var index = self._totalRewardNum - finalIndex;
          var data = self._turntableData[index];
          null != data && cc.log("恭喜您获得<" + data.Name + ">请注意查收！");
        })));
      },
      onSetEnergyHelpVisible: function onSetEnergyHelpVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.energyHelpNode.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    TurntableData: "TurntableData",
    UITools: "UITools"
  } ],
  UITools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff1ea5IjulNPY6fQh4AEy8I", "UITools");
    "use strict";
    var onInstantiate = function onInstantiate(UIPrefabs, parent, pos, _active) {
      null == _active && (_active = true);
      if (null == UIPrefabs) return;
      var prefab = cc.instantiate(UIPrefabs);
      prefab.active = _active;
      null != parent && (prefab.parent = parent);
      null != pos && (prefab.position = pos);
      return prefab;
    };
    var onGetNodeCompontent = function onGetNodeCompontent(currentNode, compontentName) {
      if (null == currentNode) return;
      var compontent = currentNode.getComponent(compontentName);
      if (null == compontent) return null;
      return compontent;
    };
    var onNumTransfer = function onNumTransfer(num) {
      var result = onNumTransfer2(num);
      result = result.replace("w", "万");
      result = result.replace("y", "亿");
      result = result.replace("wy", "万亿");
      return result;
    };
    var onNumTransfer2 = function onNumTransfer2(num) {
      var curStr = "";
      num = Math.abs(num);
      if (num < 1e4) {
        curStr = num.toString();
        return curStr;
      }
      var sUnit = "";
      if (num >= 1e4 && num < 1e8) {
        curStr = 1e-4 * num;
        sUnit = "w";
      } else if (num >= 1e8 && num < 1e12) {
        curStr = 1e-8 * num;
        sUnit = "y";
      } else {
        curStr = 1e-12 * num;
        sUnit = "wy";
      }
      curStr = curStr.toString();
      var strAry = curStr.split(".");
      curStr = strAry[0];
      var decimals = "";
      if (strAry.length > 1) {
        decimals = strAry[1].slice(0, 2);
        parseInt(decimals).toString() != decimals && "00" != decimals || (decimals = decimals.replace(/0/g, ""));
      }
      curStr = "" == decimals ? curStr : curStr + "." + decimals;
      var sval = curStr + sUnit;
      return sval;
    };
    var calculateTime = function calculateTime(_ms) {
      moment.locale("zh-cn");
      var day = moment.duration(_ms).days();
      var hour = moment.duration(_ms).hours();
      var minute = moment.duration(_ms).minutes();
      var sec = moment.duration(_ms).seconds();
      day < 10 && (day = "0" + day);
      hour < 10 && (hour = "0" + hour);
      minute < 10 && (minute = "0" + minute);
      sec < 10 && (sec = "0" + sec);
      return day + ":" + hour + ":" + minute + ":" + sec;
    };
    var setSpriteImg = function setSpriteImg(_sprite, _path) {
      if (null == _sprite) return;
      _sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw(_path));
    };
    module.exports = {
      onInstantiate: onInstantiate,
      onGetNodeCompontent: onGetNodeCompontent,
      onNumTransfer: onNumTransfer,
      onNumTransfer2: onNumTransfer2,
      calculateTime: calculateTime,
      setSpriteImg: setSpriteImg
    };
    cc._RF.pop();
  }, {} ],
  UpdateItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d745goH+ZMlr9wC9GiGZMA", "UpdateItemJS");
    "use strict";
    var SkillData = require("SkillData");
    var UITools = require("UITools");
    var HEROTYPE = cc.Enum({
      girl: 0,
      boy: 1,
      assist: 2
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        heroIcon: cc.Sprite,
        heroName: cc.Label,
        heroHurt: cc.Label,
        heroLvl: cc.Label,
        heroUpdate: cc.Label,
        skillItemPre: cc.Prefab,
        scrollView: cc.ScrollView,
        progressBar: cc.ProgressBar
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
      },
      onSetData: function onSetData(_data) {
        this._heroData = _data;
        var iconPath = "resources/textures/turntable/" + _data.Icon + ".png";
        UITools.setSpriteImg(this.heroIcon, iconPath);
        this.heroName.string = _data.Name;
        this.heroHurt.string = _data.Hurt + "/每秒伤害";
        this.heroUpdate.string = _data.UpdateGold;
        this.heroLvl.string = Math.round(50 * Math.random()) + "级";
        if (_data.HeroType == HEROTYPE.boy || _data.HeroType == HEROTYPE.girl) {
          this.initSkillUI();
          this.scrollView.node.active = true;
          this.progressBar.node.active = false;
        } else if (_data.HeroType == HEROTYPE.assist) {
          this.scrollView.node.active = false;
          this.progressBar.node.active = true;
        }
      },
      initSkillUI: function initSkillUI() {
        this.content.removeAllChildren(true);
        this.scrollView.scrollToTop(.3);
        if (void 0 == this._heroData.HeroSkill || "" == this._heroData.HeroSkill) return;
        var HeroSkill = this._heroData.HeroSkill.split("|");
        var item = void 0, itemJS = void 0;
        for (var i = 0; i < HeroSkill.length; i++) {
          item = cc.instantiate(this.skillItemPre);
          item.setPositionY(-20);
          if (null == item) continue;
          this.content.addChild(item);
          itemJS = UITools.onGetNodeCompontent(item, "SkillItemJS");
          if (itemJS) {
            SkillData[HeroSkill[i]].isShow = true;
            itemJS.onSetData(SkillData[HeroSkill[i]]);
          }
        }
      },
      onClickUpdateBtn: function onClickUpdateBtn(evn, type) {
        cc.log("onClickUpdateBtn");
      },
      onClick10XBtn: function onClick10XBtn(evn, type) {
        cc.log("onClick10XBtn");
      },
      onClick100XBtn: function onClick100XBtn(evn, type) {
        cc.log("onClick100XBtn");
      }
    });
    cc._RF.pop();
  }, {
    SkillData: "SkillData",
    UITools: "UITools"
  } ],
  UpdatePanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35515HOrOxDwoHipVTs2Qen", "UpdatePanelJS");
    "use strict";
    var HeroData = require("HeroData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        hurtRT: cc.RichText,
        scrollView: cc.ScrollView,
        updateItemPre: cc.Prefab
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
      },
      onEnable: function onEnable() {
        this.onSetData(HeroData);
      },
      onSetData: function onSetData(_data) {
        this.content.removeAllChildren(true);
        this.scrollView.scrollToTop(.3);
        this.hurtRT.string = "<color=#ECB67C>总输出伤害：</c><color=#FFFFFF>99.9K</color>";
        var i = 0, data = void 0, itemPre = void 0, itemJS = void 0;
        for (i; i < _data.length; i++) {
          data = _data[i];
          itemPre = cc.instantiate(this.updateItemPre);
          if (null == itemPre || null == data) continue;
          this.content.addChild(itemPre);
          itemJS = UITools.onGetNodeCompontent(itemPre, "UpdateItemJS");
          if (null == itemJS) continue;
          itemJS.onSetData(data);
        }
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    HeroData: "HeroData",
    UITools: "UITools"
  } ],
  VIPData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2818aYFRmRAQLN5y0+KZnBE", "VIPData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "VIP0",
      Desc: "无特权",
      Icon: "vip0",
      VipMoney: "0"
    };
    data["1"] = {
      PID: "1",
      Name: "VIP1",
      Desc: "全体英雄每秒伤害增加10%",
      Icon: "vip1",
      VipMoney: "10"
    };
    data["2"] = {
      PID: "2",
      Name: "VIP2",
      Desc: "全体英雄每秒伤害增加20%|豆豆金币掉落增加20%",
      Icon: "vip2",
      VipMoney: "20"
    };
    data["3"] = {
      PID: "3",
      Name: "VIP3",
      Desc: "全体英雄每秒伤害增加30%|豆豆金币掉落增加30%|主角点击伤害增加30%",
      Icon: "vip3",
      VipMoney: "30"
    };
    data["4"] = {
      PID: "4",
      Name: "VIP4",
      Desc: "全体英雄每秒伤害增加40%|豆豆金币掉落增加40%|主角点击伤害增加40%|主角点击伤害增加40%",
      Icon: "vip4",
      VipMoney: "40"
    };
    data["5"] = {
      PID: "5",
      Name: "VIP5",
      Desc: "全体英雄每秒伤害增加50%|豆豆金币掉落增加50%|主角点击伤害增加50%|主角点击伤害增加50%",
      Icon: "vip5",
      VipMoney: "50"
    };
    data["6"] = {
      PID: "6",
      Name: "VIP6",
      Desc: "全体英雄每秒伤害增加60%|豆豆金币掉落增加60%|主角点击伤害增加60%|主角点击伤害增加60%",
      Icon: "vip6",
      VipMoney: "60"
    };
    data["7"] = {
      PID: "7",
      Name: "VIP7",
      Desc: "全体英雄每秒伤害增加70%|豆豆金币掉落增加70%|主角点击伤害增加70%|主角点击伤害增加70%",
      Icon: "vip7",
      VipMoney: "70"
    };
    data["8"] = {
      PID: "8",
      Name: "VIP8",
      Desc: "全体英雄每秒伤害增加80%|豆豆金币掉落增加80%|主角点击伤害增加80%|主角点击伤害增加80%",
      Icon: "vip8",
      VipMoney: "80"
    };
    data["9"] = {
      PID: "9",
      Name: "VIP9",
      Desc: "全体英雄每秒伤害增加90%|豆豆金币掉落增加90%|主角点击伤害增加90%|主角点击伤害增加90%",
      Icon: "vip9",
      VipMoney: "90"
    };
    data["10"] = {
      PID: "10",
      Name: "VIP10",
      Desc: "全体英雄每秒伤害增加100%|豆豆金币掉落增加100%|主角点击伤害增加100%|主角点击伤害增加100%|免费宝箱1个",
      Icon: "vip10",
      VipMoney: "100"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  VIPItemCellJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02663E86BlEMLaiN97NrwHN", "VIPItemCellJS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tipsLabel: cc.Label
      },
      onSetData: function onSetData(_data) {
        this.node.active = null != _data;
        this.tipsLabel.string = _data;
      }
    });
    cc._RF.pop();
  }, {} ],
  VIPPageItemJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b69b2HiUfpGnZeyWk5z/yb0", "VIPPageItemJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        tipsLabel: cc.Label,
        vipItemCellPre: cc.Prefab,
        scrollView: cc.ScrollView
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
      },
      onSetData: function onSetData(_data) {
        this.content.removeAllChildren(true);
        this.scrollView.scrollToTop(.3);
        this.tipsLabel.string = _data.Name + " 特权";
        if (void 0 == _data.Desc) return;
        var privilegeList = _data.Desc.split("|");
        if (0 == privilegeList.length) return;
        var i = void 0, item = void 0, itemJS = void 0, data = void 0;
        for (i = 0; i < privilegeList.length; i++) {
          item = cc.instantiate(this.vipItemCellPre);
          data = privilegeList[i];
          if (null == item) continue;
          this.content.addChild(item);
          itemJS = UITools.onGetNodeCompontent(item, "VIPItemCellJS");
          itemJS && itemJS.onSetData(data);
        }
      },
      onClickGetBtn: function onClickGetBtn(evn, type) {
        cc.log("onClickGetBtn");
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ],
  VIPPanelJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e834doNrtxA+6sUvO6szbow", "VIPPanelJS");
    "use strict";
    var UITools = require("UITools");
    var VIPData = require("VIPData");
    cc.Class({
      extends: cc.Component,
      properties: {
        vipIcon: cc.Sprite,
        tipsLabel: cc.Label,
        progressBar: cc.ProgressBar,
        progressLabel: cc.Label,
        leftBtn: cc.Button,
        rightBtn: cc.Button,
        vipPageItemPre: cc.Prefab,
        vipPageView: cc.PageView,
        _curPage: 0
      },
      onLoad: function onLoad() {
        this._curPage = 0;
      },
      onEnable: function onEnable() {
        var vipLen = VIPData.length;
        this._myVipLvl = Math.round(Math.random() * vipLen);
        this._myVipLvl = this._myVipLvl >= vipLen - 1 ? vipLen - 1 : this._myVipLvl;
        this._nextIndex = this._myVipLvl >= vipLen - 1 ? vipLen - 1 : this._myVipLvl + 1;
        cc.log("当前等级 ： " + this._myVipLvl + " ** " + this._nextIndex);
        this.onSetData(VIPData);
      },
      onSetData: function onSetData(_data) {
        this.vipPageView.removeAllPages();
        var iconPath = "resources/textures/icon/vip" + this._myVipLvl + ".png";
        UITools.setSpriteImg(this.vipIcon, iconPath);
        var curVipData = _data[this._myVipLvl];
        var nextVipData = _data[this._nextIndex];
        var curMoney = Math.round(Math.random() * (parseInt(nextVipData.VipMoney) - parseInt(curVipData.VipMoney)));
        this._myVipLvl == this._nextIndex && this._myVipLvl == _data.length - 1 && (curMoney = parseInt(nextVipData.VipMoney));
        var offMoney = parseInt(nextVipData.VipMoney) - curMoney;
        var progress = curMoney / parseInt(nextVipData.VipMoney);
        this.progressBar.progress = progress;
        this.tipsLabel.string = "再充 " + offMoney + " 元可称为 VIP" + this._nextIndex;
        this.progressLabel.string = curMoney + "/" + nextVipData.VipMoney;
        cc.log("********测试数据*******");
        cc.log("当前级别 ： " + this._myVipLvl);
        cc.log("下一级别： " + this._nextIndex);
        cc.log("已经充值的钱： " + curMoney);
        cc.log("下一级别需要充的钱： " + nextVipData.VipMoney);
        cc.log("差值： " + offMoney + " ** " + progress);
        cc.log("***************");
        var i = void 0, item = void 0, itemJS = void 0, data = void 0;
        for (i = 0; i < VIPData.length; i++) {
          item = cc.instantiate(this.vipPageItemPre);
          data = VIPData[i];
          if (null == item) continue;
          this.vipPageView.addPage(item);
          itemJS = UITools.onGetNodeCompontent(item, "VIPPageItemJS");
          itemJS && itemJS.onSetData(data);
        }
        setTimeout(function() {
          this._curPage = this._myVipLvl;
          this.onClickScrollBtn(null, null, this._nextIndex);
        }.bind(this), .3);
      },
      onClickScrollBtn: function onClickScrollBtn(evn, type, _initLvl) {
        0 == type ? this._curPage-- : 1 == type && this._curPage++;
        this._curPage = this._curPage < 0 ? 0 : this._curPage;
        this._curPage = this._curPage > VIPData.length - 1 ? VIPData.length - 1 : this._curPage;
        cc.log("CurPage : " + this._curPage);
        var tempIndex = 0;
        tempIndex = null != _initLvl ? _initLvl : this._curPage;
        this.leftBtn.interactable = tempIndex > 0;
        this.rightBtn.interactable = tempIndex < VIPData.length - 1;
        this.vipPageView.scrollToPage(tempIndex, .3);
      },
      onPageViewEvents: function onPageViewEvents() {
        cc.log("onPageViewEvents");
        var curIndex = this.vipPageView.getCurrentPageIndex();
        this.leftBtn.interactable = curIndex > 0;
        this.rightBtn.interactable = curIndex < VIPData.length - 1;
      },
      onSetNodeVisible: function onSetNodeVisible(evn, type, _isShow) {
        _isShow = null != _isShow && void 0 != _isShow && _isShow;
        this.node.active = _isShow;
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools",
    VIPData: "VIPData"
  } ],
  loadingJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad167uZd5ZOk7jQIMMn/KQn", "loadingJS");
    "use strict";
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        progressBar: cc.ProgressBar,
        labProg: cc.Label,
        labDesc: cc.Label,
        spr: cc.Sprite,
        heroItemPre: [ cc.Prefab ],
        heroNode: cc.Node,
        label: cc.Label
      },
      onLoad: function onLoad() {
        var index = Math.round(Math.random() * (this.heroItemPre.length - 1));
        cc.log("加载Monster " + index + "...");
        var item = this.heroItemPre[index];
        null != item && UITools.onInstantiate(item, this.heroNode, cc.p(0, 0), true);
        this._isRotation = false;
        this.loading();
      },
      loading: function loading() {
        var self = this;
        cc.loader.onProgress = function(completedCount, totalCount, item) {
          var percent = (completedCount / totalCount).toFixed(2);
          percent = percent < 0 ? 0 : percent;
          percent = percent > 1 ? 1 : percent;
          self.progressBar && (self.progressBar.progress = percent);
          self.label && (self.label.string = "加载" + item.content._name + "中 " + 100 * percent + "%");
          self.labProg && (self.labProg.string = 100 * percent + "%");
          self.labDesc && (self.labDesc.string = "加载" + item.content._name + "中...");
          self._isRotation = true;
        };
        cc.director.preloadScene("mainGameScene", function(error) {
          setTimeout(function() {
            self._isRotation = false;
            cc.director.loadScene("mainGameScene");
          }, 3e3);
        });
      },
      update: function update() {
        true == this._isRotation && this.spr && (this.spr.node.rotation = this.spr.node.rotation + 5);
      }
    });
    cc._RF.pop();
  }, {
    UITools: "UITools"
  } ]
}, {}, [ "DailyTaskData", "HeroData", "InviteData", "MarketData", "MonsterData", "ShopData", "SignInData", "SkillData", "TurntableData", "VIPData", "GC", "Global", "UITools", "loadingJS", "AvatarJS", "DailyTaskItemJS", "DailyTaskPanelJS", "EarnDiamondsPanelJS", "HeroItemJS", "InviteItemJS", "InvitePanelJS", "MainScene", "MarketItemJS", "MarketPanelJS", "NoticePanelJS", "OtherPanelJS", "RankPanelJS", "RechargeItemJS", "RechargePanelJS", "ShopItemJS", "ShopPanelJS", "SignInItemBaseJS", "SignInPanelJS", "SkillDescPanelJS", "SkillItemJS", "TurntableItemJS", "TurntablePanelJS", "UpdateItemJS", "UpdatePanelJS", "VIPItemCellJS", "VIPPageItemJS", "VIPPanelJS" ]);