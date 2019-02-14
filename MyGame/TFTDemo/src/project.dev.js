window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ActionData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1cff5DF/QxNKIM66ts/UHxb", "ActionData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "\u9996\u9875",
      Type: "0"
    };
    data["1"] = {
      PID: "1",
      Name: "\u5b66\u672c\u9886",
      Type: "0"
    };
    data["2"] = {
      PID: "2",
      Name: "\u6e38\u620f0",
      Type: "1"
    };
    data["3"] = {
      PID: "3",
      Name: "\u6e38\u620f1",
      Type: "1"
    };
    data["4"] = {
      PID: "4",
      Name: "\u6e38\u620f2",
      Type: "1"
    };
    data["5"] = {
      PID: "5",
      Name: "\u8bd5\u4e00\u8bd5",
      Type: "0"
    };
    data["6"] = {
      PID: "6",
      Name: "\u6e38\u620f0",
      Type: "1"
    };
    data["7"] = {
      PID: "7",
      Name: "\u6e38\u620f1",
      Type: "1"
    };
    data["8"] = {
      PID: "8",
      Name: "\u6e38\u620f2",
      Type: "1"
    };
    data["9"] = {
      PID: "9",
      Name: "\u6e38\u620f3",
      Type: "1"
    };
    data["10"] = {
      PID: "10",
      Name: "\u6e38\u620f4",
      Type: "1"
    };
    data["11"] = {
      PID: "11",
      Name: "\u667a\u6167\u5361",
      Type: "0"
    };
    data["12"] = {
      PID: "12",
      Name: "\u884c\u52a8",
      Type: "0"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  CourseCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b22e3Yv6gtLO7G+uvDxsrA6", "CourseCtrl");
    "use strict";
    var CourseData = require("CourseData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        layout: cc.Layout,
        itemIcon: cc.Sprite,
        btnList: [ cc.Button ],
        _curIndex: 0
      },
      onLoad: function onLoad() {
        this._curIndex = 0;
        this.onReset();
      },
      onSetParent: function onSetParent(_parent) {
        this._parentCtrl = _parent;
      },
      changePage: function changePage() {
        var courseData = CourseData[this._curIndex];
        if (void 0 == courseData) return;
        console.log("\u6e38\u620f\u754c\u9762\u6570\u636e : ", this._curIndex, courseData);
        this.onReset();
        this.initGame(courseData);
      },
      initGame: function initGame(_data) {
        var _this = this;
        var self = this;
        cc.loader.loadRes("Img/icon/" + _data.ItemIcon, cc.SpriteFrame, function(err, spriteFrame) {
          self.itemIcon.spriteFrame = spriteFrame;
        });
        var optionIconData = _data.OptionIcon.split("|");
        console.log(optionIconData);
        2 == optionIconData.length && (this.layout.spacingX = 130);
        var _loop = function _loop(i) {
          var data = optionIconData[i];
          var btn = _this.btnList[i];
          if (btn) {
            var url = "Img/" + data;
            cc.log("URL : " + url);
            cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
              btn.normalSprite = spriteFrame;
              btn.hoverSprite = spriteFrame;
              btn.disabledSprite = spriteFrame;
            });
            cc.loader.loadRes(url + "_A", cc.SpriteFrame, function(err, spriteFrame) {
              btn.pressedSprite = spriteFrame;
            });
            btn.node.parent.active = true;
          }
        };
        for (var i = 0; i < optionIconData.length; i++) _loop(i);
        this.gotoAction();
      },
      gotoAction: function gotoAction() {
        var self = this;
        var soundPath = CourseData[this._curIndex].Sound + ".mp3";
        cc.log("soundPath : " + soundPath);
        var promise1 = function promise1() {
          return new Promise(function(resolve, reject) {
            cc.log("\u6e38\u620f0");
            self.onSetBtnStatus(false);
            Global.musicManager.playEffectOnly(soundPath, function() {
              resolve();
            });
          });
        };
        var promise2 = function promise2() {
          return new Promise(function(resolve, reject) {
            self.onSetBtnStatus(true);
          });
        };
        var promiseArr = [ promise1, promise2 ];
        UITools.runPromiseArray(promiseArr);
      },
      onClickBtn: function onClickBtn(evn, type) {
        cc.log("onClickBtn : " + type);
        var courseData = CourseData[this._curIndex];
        var soundName = "";
        if (type == courseData.Answer) {
          cc.log("\u56de\u7b54\u6b63\u786e\uff01");
          Global.musicManager.playRightEffect();
          this.onSetBtnStatus(false);
          this._curIndex++;
          this._parentCtrl && this._parentCtrl.showResult();
        } else {
          cc.log("\u56de\u7b54\u9519\u8bef\uff01");
          Global.musicManager.playWrongEffect(courseData.Type);
        }
      },
      onReset: function onReset() {
        this.layout.spacingX = 0;
        this.itemIcon.spriteFrame = "";
        var btn = void 0;
        for (var i = 0; i < this.btnList.length; i++) {
          btn = this.btnList[i];
          btn && (btn.node.parent.active = false);
        }
        this.onSetBtnStatus(false);
      },
      onSetBtnStatus: function onSetBtnStatus(_able) {
        var btn = void 0;
        for (var i = 0; i < this.btnList.length; i++) {
          btn = this.btnList[i];
          btn && (btn.interactable = _able);
        }
      }
    });
    cc._RF.pop();
  }, {
    CourseData: "CourseData",
    UITools: "UITools"
  } ],
  CourseData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99462WUr1ZAla4T/BsvZnF3", "CourseData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "\u6e38\u620f0",
      Type: "0",
      OptionIcon: "3_06|3_09|3_12",
      Answer: "0",
      ItemIcon: "0",
      Sound: "4"
    };
    data["1"] = {
      PID: "1",
      Name: "\u6e38\u620f1",
      Type: "0",
      OptionIcon: "4_05|4_08|4_14",
      Answer: "1",
      ItemIcon: "1",
      Sound: "5"
    };
    data["2"] = {
      PID: "2",
      Name: "\u6e38\u620f2",
      Type: "0",
      OptionIcon: "5_06|5_09|3_12",
      Answer: "0",
      ItemIcon: "2",
      Sound: "6"
    };
    data["3"] = {
      PID: "3",
      Name: "\u6e38\u620f3",
      Type: "1",
      OptionIcon: "7_06|7_12",
      Answer: "0",
      ItemIcon: "3",
      Sound: "7"
    };
    data["4"] = {
      PID: "4",
      Name: "\u6e38\u620f4",
      Type: "1",
      OptionIcon: "7_06|7_12",
      Answer: "1",
      ItemIcon: "4",
      Sound: "8"
    };
    data["5"] = {
      PID: "5",
      Name: "\u6e38\u620f5",
      Type: "1",
      OptionIcon: "7_06|7_12",
      Answer: "0",
      ItemIcon: "5",
      Sound: "9"
    };
    data["6"] = {
      PID: "6",
      Name: "\u6e38\u620f6",
      Type: "1",
      OptionIcon: "7_06|7_12",
      Answer: "0",
      ItemIcon: "6",
      Sound: "10"
    };
    data["7"] = {
      PID: "7",
      Name: "\u6e38\u620f7",
      Type: "1",
      OptionIcon: "7_06|7_12",
      Answer: "0",
      ItemIcon: "7",
      Sound: "11"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  CourseOne: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6323egtIcRM3qKqaeDy4DQI", "CourseOne");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  CourseTwo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa1458AP1lA/44b1NmR/e/Z", "CourseTwo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2205ejlHw5OmYEUMB09Kzm3", "GameConfig");
    "use strict";
    var GuideType = cc.Enum({
      Type_first: 0,
      Type_learn: 1,
      Type_try: 2,
      Type_wid: 3,
      Type_action: 4
    });
    var ROLE_NAME = cc.Enum({
      XIANGXIANG: "xiangxiang"
    });
    module.exports = {
      GuideType: GuideType,
      ROLE_NAME: ROLE_NAME
    };
    cc._RF.pop();
  }, {} ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "028e2r0vGdBzZN2q6MvmsTd", "GameManager");
    "use strict";
    var MusicManager = require("MusicManager");
    var MainScene = require("MainScene");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        Global.musicManager = new MusicManager();
        Global.mainSceneCtrl = new MainScene();
      }
    });
    cc._RF.pop();
  }, {
    MainScene: "MainScene",
    MusicManager: "MusicManager"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b57cRzx91BHrVzrUm7nlFn", "Global");
    "use strict";
    window.Global = {
      guideCtrl: null,
      mainSceneCtrl: null,
      musicManager: null,
      animationManager: null
    };
    cc._RF.pop();
  }, {} ],
  GuideCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2afb8vmILJCYY1UkTfNGYCp", "GuideCtrl");
    "use strict";
    var GameConfig = require("GameConfig");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        rootNodeList: [ cc.Node ],
        sureBtn: cc.Button,
        animaNode: cc.Node,
        iconSpr: cc.Sprite,
        iconSF: [ cc.SpriteFrame ],
        _curIndex: 0
      },
      onLoad: function onLoad() {
        this._curIndex = 0;
        this._animaCtrl = UITools.onGetNodeCompontent(this.animaNode, "RoleBaseJS");
      },
      onSetParent: function onSetParent(_parent) {
        this._parentCtrl = _parent;
      },
      changePage: function changePage() {
        this._curIndex = this._curIndex > GameConfig.GuideType.Type_action ? 0 : this._curIndex;
        this.onReset();
        if (this._curIndex == GameConfig.GuideType.Type_first) this.rootNodeList[0].active = true; else {
          this.iconSpr.spriteFrame = this.iconSF[this._curIndex];
          this.rootNodeList[1].active = true;
          this.sureBtn.node.active = false;
          var res = null;
          switch (this._curIndex) {
           case GameConfig.GuideType.Type_learn:
            this.animaNode.active = true;
            res = "Sound/learn";
            break;

           case GameConfig.GuideType.Type_try:
            this.animaNode.active = true;
            res = "Sound/1";
            break;

           case GameConfig.GuideType.Type_wid:
            this.animaNode.active = true;
            res = "Sound/wid";
            break;

           case GameConfig.GuideType.Type_action:
            this.sureBtn.node.active = true;
            res = "Sound/action";
          }
          this._curIndex != GameConfig.GuideType.Type_action && this.gotoAction(res);
        }
        this._curIndex++;
      },
      onClickActionBtn: function onClickActionBtn(evn, type) {
        cc.log("onClickActionBtn");
      },
      gotoAction: function gotoAction(res) {
        if (null == res) return;
        var self = this;
        var promise1 = function promise1() {
          return new Promise(function(resolve, reject) {
            cc.log("\u5b66\u672c\u9886");
            self._animaCtrl.playShuohuaAnimation(res, function() {
              resolve();
            });
          });
        };
        var promise2 = function promise2() {
          return new Promise(function(resolve, reject) {
            cc.log("\u5ef6\u8fdf\u8df3\u8f6c");
            setTimeout(function() {
              self._parentCtrl && self._parentCtrl.onClickNextBtn();
            }, 1e3);
          });
        };
        var promiseArr = [ promise1, promise2 ];
        UITools.runPromiseArray(promiseArr);
      },
      onReset: function onReset() {
        for (var i = 0; i < this.rootNodeList.length; i++) this.rootNodeList[i] && (this.rootNodeList[i].active = false);
        this.sureBtn.node.active = this.animaNode.active = this.iconSpr.active = false;
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    UITools: "UITools"
  } ],
  LoadingScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cff3xZO9xIUq4C+Sxii7L7", "LoadingScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e5966z/eFO2ar90G3Leqy1", "MainScene");
    "use strict";
    var ActionData = require("ActionData");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        guideNode: cc.Node,
        courseNode: cc.Node,
        resultNode: cc.Node,
        resultAnimaNode: cc.Node,
        _curIndex: -1
      },
      onLoad: function onLoad() {
        this._curIndex = -1;
        this.resultNode.active = false;
        this._guideCtrl = UITools.onGetNodeCompontent(this.guideNode, "GuideCtrl");
        this._guideCtrl && this._guideCtrl.onSetParent(this);
        this._courseCtrl = UITools.onGetNodeCompontent(this.courseNode, "CourseCtrl");
        this._courseCtrl && this._courseCtrl.onSetParent(this);
        this._resultArmatureDisplay = this.resultAnimaNode.getComponent(dragonBones.ArmatureDisplay);
        this.onClickNextBtn(null, "1");
      },
      onClickNextBtn: function onClickNextBtn(evn, type) {
        0 == type ? this._curIndex-- : this._curIndex++;
        this._curIndex = this._curIndex < 0 ? 0 : this._curIndex;
        var actionData = ActionData[this._curIndex];
        console.log("\u4e3b\u8df3\u8f6c\u754c\u9762\u6570\u636e : ", this._curIndex, actionData);
        if (void 0 == actionData) return;
        this.onReset();
        if ("0" == actionData.Type) {
          this.guideNode.active = true;
          this._guideCtrl.changePage();
        } else if ("1" == actionData.Type) {
          this.courseNode.active = true;
          this._courseCtrl.changePage();
        }
      },
      showResult: function showResult(_callBack) {
        var _this = this;
        cc.log("\u663e\u793a\u7ed3\u7b97");
        var self = this;
        var promise1 = function promise1() {
          return new Promise(function(resolve, reject) {
            cc.log("\u7ed3\u7b97\uff01");
            self.resultNode.active = true;
            Global.musicManager.playEffect("winAnimation.mp3");
            self._resultArmatureDisplay.playAnimation("01", 1);
            self._resultArmatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, function() {
              resolve();
              self.resultNode.active = false;
            }, _this);
          });
        };
        var promise2 = function promise2() {
          return new Promise(function(resolve, reject) {
            self.onClickNextBtn(null, "1");
          });
        };
        UITools.runPromiseArray([ promise1, promise2 ]);
      },
      onReset: function onReset() {
        this.resultNode.active = false;
        this.guideNode.active = false;
        this.courseNode.active = false;
      }
    });
    cc._RF.pop();
  }, {
    ActionData: "ActionData",
    UITools: "UITools"
  } ],
  MusicManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f301M1UQ1JirocCmnZqlgp", "MusicManager");
    "use strict";
    var musicPath = "resources/Sound/";
    var MusicManager = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      getUrl: function getUrl(_name) {
        return cc.url.raw(musicPath + _name);
      },
      playBGM: function playBGM() {
        var audioUrl = this.getUrl();
        cc.audioEngine.play(audioUrl, true, 1);
      },
      playEffect: function playEffect(_name, _callBack) {
        var audioUrl = this.getUrl(_name);
        var audioID = cc.audioEngine.playEffect(audioUrl);
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
      },
      playEffectOnly: function playEffectOnly(_name, _callBack) {
        cc.audioEngine.stopAllEffects();
        var audioUrl = this.getUrl(_name);
        var audioID = cc.audioEngine.playEffect(audioUrl);
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
      },
      playRightEffect: function playRightEffect(_type) {
        this.playEffect("gogogo.mp3");
      },
      playWrongEffect: function playWrongEffect(_type) {
        var soundName = "1-" + parseInt(2 * Math.random() + 1) + ".mp3";
        "1" == _type && (soundName = "0-2.mp3");
        this.playEffect(soundName);
      }
    });
    cc._RF.pop();
  }, {} ],
  ResultCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c29c78+f/pATJT/WRUW1y8P", "ResultCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        animaNode: cc.Node
      },
      onLoad: function onLoad() {
        this._resultArmatureDisplay = this.resultNode.getComponent(dragonBones.ArmatureDisplay);
      }
    });
    cc._RF.pop();
  }, {} ],
  RoleBaseJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15d27hUQxtOw5BdpT0G9OHf", "RoleBaseJS");
    "use strict";
    var GameConfig = require("GameConfig");
    var UITools = require("UITools");
    cc.Class({
      extends: cc.Component,
      properties: {
        roleName: "",
        _shuohuaArray: null
      },
      onLoad: function onLoad() {
        this._shuohuaArray = [];
        this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
        this._armature = this._armatureDisplay.armature();
        this._armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.LOOP_COMPLETE, this);
        switch (this.roleName) {
         case GameConfig.ROLE_NAME.XIANGXIANG:
          this._yan = this._armature.getSlot("yan1").childArmature;
          this._zui = this._armature.getSlot("zui1").childArmature;
          this._shuohuaArray = [ "shuohua", "shuohua1" ];
        }
      },
      LOOP_COMPLETE: function LOOP_COMPLETE() {},
      playDaiji: function playDaiji() {
        this.playAnimation("daiji", 0);
        this.playYanAnimation("daiji");
        this.playZuiAnimation("weixiao");
      },
      playYanAnimation: function playYanAnimation(_animName) {
        this._yan && this._yan.animation.play(_animName);
      },
      playZuiAnimation: function playZuiAnimation(_animName) {
        this._zui && this._zui.animation.play(_animName);
      },
      playAnimation: function playAnimation(_animName, _loop) {
        this._armatureDisplay.playAnimation(_animName, _loop);
      },
      playShuohuaAnimation: function playShuohuaAnimation(_soundName, _callBack) {
        var index = UITools.getRandomNum(0, this._shuohuaArray.length - 1);
        this.playAnimation(this._shuohuaArray[index], 0);
        var self = this;
        cc.loader.loadRes(_soundName, cc.AudioClip, function(err, clipRes) {
          if (err) return;
          var aid = cc.audioEngine.playEffect(clipRes);
          cc.audioEngine.setFinishCallback(aid, function() {
            self.playDaiji();
            _callBack && _callBack();
          });
        });
      },
      playAction: function playAction(_animName, _soundName, _callBack) {
        this.playAnimation(_animName, 0);
        var self = this;
        cc.loader.loadRes(_soundName, cc.AudioClip, function(err, clipRes) {
          if (err) return;
          var aid = cc.audioEngine.playEffect(clipRes);
          cc.audioEngine.setFinishCallback(aid, function() {
            _callBack && _callBack();
          });
        });
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    UITools: "UITools"
  } ],
  TopNodeCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b49bUGJdpLDK6nOeZUqCt9", "TopNodeCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        hornBtn: cc.Node,
        pointerNode: cc.Node,
        scoreNode: cc.Node
      },
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  UITools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0725gdMZNKXrVND8Mafz7Y", "UITools");
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
    var setSpriteImg = function setSpriteImg(_sprite, _path) {
      if (null == _sprite) return;
      _sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw(_path));
    };
    var getRandomNum = function getRandomNum(_min, _max) {
      return parseInt(Math.random() * (_max - _min + 1) + _min);
    };
    var runPromiseArray = function runPromiseArray(parray) {
      var p = Promise.resolve();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = parray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var promise = _step.value;
          p = p.then(promise);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          !_iteratorNormalCompletion && _iterator.return && _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
      return p;
    };
    module.exports = {
      onInstantiate: onInstantiate,
      onGetNodeCompontent: onGetNodeCompontent,
      setSpriteImg: setSpriteImg,
      getRandomNum: getRandomNum,
      runPromiseArray: runPromiseArray
    };
    cc._RF.pop();
  }, {} ],
  hornCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbd9ddLCPxCRbQpKbz5m0oR", "hornCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      onClickBtn: function onClickBtn() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "ActionData", "CourseData", "GameConfig", "GameManager", "Global", "MusicManager", "UITools", "hornCtrl", "CourseCtrl", "CourseOne", "CourseTwo", "GuideCtrl", "LoadingScene", "MainScene", "ResultCtrl", "RoleBaseJS", "TopNodeCtrl" ]);