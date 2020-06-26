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
  AnimCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14690HNUiBBGqHYaFuTZBhB", "AnimCtrl");
    "use strict";
    var gameCFG = require("GameConfig");
    var const_countDown = 4;
    var const_offTime = 1e3;
    cc.Class({
      extends: cc.Component,
      properties: {
        countDownNode: {
          default: null,
          type: cc.Node
        },
        countDownSF: {
          default: [],
          type: cc.SpriteFrame
        },
        _curTimer: null,
        _remainTime: 0
      },
      onLoad: function onLoad() {
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this._countDownAnim = this.countDownNode.getComponent(cc.Animation);
      },
      EnterBackground: function EnterBackground() {
        this.isBackGround = true;
        this.unregisterEvent();
      },
      EnterForeground: function EnterForeground() {
        if (this.isBackGround) {
          this.isBackGround = false;
          this.registerEvent();
        }
      },
      registerEvent: function registerEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.playGame, this.playGame, this);
      },
      unregisterEvent: function unregisterEvent() {
        monsterMatch.emitter.off(gameCFG.clientEvent.playGame, this);
      },
      playGame: function playGame(msg) {
        console.log("playGame:", msg);
        this._curTimer = Date.now();
        this._remainTime = const_countDown;
        this.countDown();
      },
      countDown: function countDown() {
        console.log("countDown:" + this._remainTime);
        this._countDownAnim.stop();
        this.countDownNode.opacity = 255;
        var sf = this.countDownSF[this._remainTime - 1];
        this.countDownNode.getComponent(cc.Sprite).spriteFrame = sf;
        var name = this._remainTime <= 1 ? "countDown_1" : "countDown";
        this._countDownAnim.play(name);
        name = this._remainTime <= 1 ? gameCFG.PERLOAD_NAME.countDown_go : gameCFG.PERLOAD_NAME.countDown_nor;
        monsterMatch.musicManager.playEffect(name);
        this._remainTime - 1 <= 0 && (monsterMatch.gameStatus = gameCFG.GAME_STATUS.INGAME);
      },
      update: function update() {
        var localTime = Date.now();
        var offTime = localTime - this._curTimer;
        if (offTime >= const_offTime) {
          this._curTimer = localTime - (offTime - const_offTime);
          this._remainTime--;
          this._remainTime > 0 && this.countDown();
        }
      },
      onDestroy: function onDestroy() {
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2205ejlHw5OmYEUMB09Kzm3", "GameConfig");
    "use strict";
    var STATUS_TYPE = cc.Enum({
      NORMAL: 0,
      WRONG: 1,
      RIGHT: 2
    });
    var clientEvent = {
      EnterBackground: "EnterBackground",
      EnterForeground: "EnterForeground",
      playGame: "playGame",
      gameOver: "gameOver",
      updateStage: "updateStage",
      gotoHome: "gotoHome"
    };
    var GAME_STATUS = cc.Enum({
      WAIT: 0,
      INGAME: 1,
      CONTINUE: 2,
      ROUNDFINISH: 3,
      SETTLE: 4
    });
    var PERLOAD_NAME = cc.Enum({
      bgMusic: "audio/bgMusic",
      click: "audio/click",
      countDown_nor: "audio/cd_nor",
      countDown_go: "audio/cd_go",
      cardFlip: "audio/card_flip",
      pairCleared: "audio/pairCleared",
      stageCleared: "audio/stageCleared",
      gameOver: "audio/success",
      continue: "prefabs/continue",
      promptUI: "prefabs/promptUI",
      result: "prefabs/result",
      rank: "prefabs/rank"
    });
    module.exports = {
      STATUS_TYPE: STATUS_TYPE,
      GAME_STATUS: GAME_STATUS,
      clientEvent: clientEvent,
      PERLOAD_NAME: PERLOAD_NAME
    };
    cc._RF.pop();
  }, {} ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b57cRzx91BHrVzrUm7nlFn", "Global");
    "use strict";
    window.monsterMatch = window.monsterMatch || {};
    window.reStartGame = function() {
      cc.game.restart();
    };
    window.startGame = function() {
      window.isShow = true;
      cc.game.on(cc.game.EVENT_HIDE, function() {
        if (window.isShow) {
          monsterMatch.emitter.emit("EnterBackground");
          window.isShow = false;
        }
      });
      cc.game.on(cc.game.EVENT_SHOW, function() {
        if (!window.isShow) {
          monsterMatch.emitter.emit("EnterForeground");
          window.isShow = true;
        }
      });
      monsterMatch.emitter = require("emitter")();
      monsterMatch.resourceManager = require("ResourceManager")();
      monsterMatch.musicManager = require("MusicManager")();
      monsterMatch.panel = require("Panel")();
      require("PreLoadManager");
      monsterMatch.gameStatus = 0;
      monsterMatch.curScore = 0;
      monsterMatch.curStage = 0;
      monsterMatch.adsAddTime = 15;
      monsterMatch.curActionTime = monsterMatch.maxActionTime = 30;
    };
    cc._RF.pop();
  }, {
    MusicManager: "MusicManager",
    Panel: "Panel",
    PreLoadManager: "PreLoadManager",
    ResourceManager: "ResourceManager",
    emitter: "emitter"
  } ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e5966z/eFO2ar90G3Leqy1", "MainScene");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        gamePreb: {
          default: null,
          type: cc.Prefab
        },
        handlePreb: {
          default: null,
          type: cc.Prefab
        },
        scorePreb: {
          default: null,
          type: cc.Prefab
        },
        animPreb: {
          default: null,
          type: cc.Prefab
        }
      },
      onLoad: function onLoad() {
        console.log("onLoad->MainScene");
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this.addPrefab(this.gamePreb, true);
        this.addPrefab(this.scorePreb, false);
        this.addPrefab(this.animPreb, true);
        this.addPrefab(this.handlePreb, true);
      },
      EnterBackground: function EnterBackground() {
        this.isBackGround = true;
        this.unregisterEvent();
      },
      EnterForeground: function EnterForeground() {
        if (this.isBackGround) {
          this.isBackGround = false;
          this.registerEvent();
        }
      },
      registerEvent: function registerEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.homePage, this.homePage, this);
      },
      unregisterEvent: function unregisterEvent() {
        monsterMatch.emitter.off(gameCFG.clientEvent.homePage, this);
      },
      addPrefab: function addPrefab(_prefab) {
        var _visible = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        var curNode = cc.instantiate(_prefab);
        curNode.parent = this.node;
        curNode.active = _visible;
      },
      onDestroy: function onDestroy() {
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  MusicManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a131elNKz9EA7wE3M6Jc28K", "MusicManager");
    "use strict";
    var MusicManager = function MusicManager() {
      this.resetData();
    }, musicMG = MusicManager.prototype, g_instance = null;
    musicMG.resetData = function() {};
    musicMG.playEffect = function(_clip, _callBack) {
      var _isOnly = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      var _isbgMusic = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      var localStatus = cc.sys.localStorage.getItem("soundStatus");
      if (0 == localStatus) return;
      true == _isOnly && cc.audioEngine.stopAllEffects();
      var clipCache = monsterMatch.resourceManager.getRes(_clip);
      if (clipCache) {
        var audioID = _isbgMusic ? cc.audioEngine.playMusic(clipCache, true) : cc.audioEngine.play(clipCache, false, 1);
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
      } else cc.loader.loadRes(_clip, cc.AudioClip, function(err, res) {
        if (err) {
          console.error(err);
          return;
        }
        var audioID = _isbgMusic ? cc.audioEngine.playMusic(res, true) : cc.audioEngine.play(res, false, 1);
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
        monsterMatch.resourceManager.setRes(_clip, res);
      });
    };
    musicMG.playBGM = function(_clip) {
      this.playEffect(_clip, null, false, true);
    };
    musicMG.playClickEffect = function(_callBack) {
      this.playEffect("audio/click.mp3", _callBack);
    };
    musicMG.pauseBGMusic = function() {
      cc.audioEngine.stopMusic();
    };
    musicMG.stopAllEffects = function() {
      cc.audioEngine.stopAllEffects();
    };
    module.exports = function() {
      g_instance || (g_instance = new MusicManager());
      return g_instance;
    };
    cc._RF.pop();
  }, {} ],
  Panel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "59b5fRoDLBIzLjHPRSPOWw9", "Panel");
    "use strict";
    var gameCFG = require("GameConfig");
    var Panel = function Panel() {
      this.resetData();
    }, panel = Panel.prototype, g_instance = null;
    panel.resetData = function() {};
    panel.showAsynPanelByName = function(_panelName, parent, tag) {
      var _this = this;
      var self = this;
      parent = parent || cc.director.getScene();
      return new Promise(function(resolve, reject) {
        var cache = monsterMatch.resourceManager.getRes(_panelName);
        cache ? resolve(_this.showChildPanel(cache, parent, tag)) : cc.loader.loadRes(_panelName, cc.Prefab, function(err, prefab) {
          if (err) reject(err); else {
            monsterMatch.resourceManager.setRes(prefab);
            resolve(self.showChildPanel(prefab, parent, tag));
          }
        });
      });
    };
    panel.showChildPanel = function(prefab, parent, tag) {
      var newPrefabLayer = cc.instantiate(prefab);
      if (tag) {
        var script = newPrefabLayer.getComponent(newPrefabLayer.name);
        script.set("fromTag", tag);
      }
      newPrefabLayer.parent = parent;
      return newPrefabLayer;
    };
    panel.closeChildPanel = function(fromTag, parent) {
      parent = parent || cc.director.getScene();
      var children = parent.children;
      if (!children) return;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var script = child.getComponent(child.name);
        if (!script) continue;
        if (void 0 == script.get) continue;
        var childTag = script.get("fromTag");
        if (childTag === fromTag) return child.destroy();
      }
    };
    panel.showPrompt = function(content) {
      this.showAsynPanelByName(gameCFG.PERLOAD_NAME.promptUI).then(function(panel) {
        panel.getComponent(panel.name).showDes(content);
      });
    };
    module.exports = function() {
      g_instance || (g_instance = new Panel());
      return g_instance;
    };
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  PreLoadConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6cc806t1tJA46U4ZzQusD+S", "PreLoadConfig");
    "use strict";
    var gameCFG = require("GameConfig");
    var data = [];
    data.push({
      url: "icon/hero_0",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_1",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_2",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_3",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_4",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_5",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_6",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_7",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_8",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_9",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_10",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_11",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_12",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_13",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_14",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_15",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_16",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_17",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_18",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_19",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_20",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_21",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_22",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_23",
      type: "png",
      format: "png"
    });
    data.push({
      url: "icon/hero_24",
      type: "png",
      format: "png"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.click,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.countDown_nor,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.countDown_go,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.cardFlip,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.pairCleared,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.stageCleared,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.gameOver,
      type: "localAudioClip",
      format: "mp3"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.continue,
      type: "prefab"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.promptUI,
      type: "prefab"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.result,
      type: "prefab"
    });
    data.push({
      url: gameCFG.PERLOAD_NAME.rank,
      type: "prefab"
    });
    module.exports = data;
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  PreLoadManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31942JE5IZM5ISfE8tlXIGH", "PreLoadManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _loadList: [],
        _loadCount: 0,
        _loadedCount: 0,
        _curResUrl: ""
      },
      onLoad: function onLoad() {
        startGame();
        this._loadList = require("PreLoadConfig");
        this._loadCount = this._loadList.length;
        this.loadRes();
      },
      loadRes: function loadRes() {
        var self = this;
        if (this._loadList.length <= 0) this.preloadDone(); else {
          var data = this._loadList.shift();
          "scene" == data.type ? cc.director.preloadScene(data.url, function() {
            self._loadCount++;
            self.updateProgress(self._loadedCount, self._loadCount);
            self.loadRes();
          }) : "spriteAtlas" == data.type ? cc.loader.loadRes(data.url, cc.SpriteAtlas, this.loadCompleteCallback.bind(this)) : "remoteAudioClip" == data.type ? cc.loader.load({
            url: data.url,
            type: data.format
          }, this.loadCompleteCallback.bind(this)) : cc.loader.loadRes(data.url, this.loadCompleteCallback.bind(this));
          this._curResUrl = data.url;
        }
      },
      loadCompleteCallback: function loadCompleteCallback(_error, _res) {
        this._loadedCount++;
        this.updateProgress(this._loadedCount, this._loadCount);
        _error ? console.log(_error) : this.parseResource(_res);
        this.loadRes();
      },
      parseResource: function parseResource(_res) {
        monsterMatch.resourceManager.setRes(this._curResUrl, _res);
      },
      preloadDone: function preloadDone() {
        console.log("preloadDone");
      },
      updateProgress: function updateProgress(_loadedCount, _loadCount) {
        var percent = (_loadedCount / _loadCount * 100).toFixed(2);
        console.log("percent:" + percent);
      }
    });
    cc._RF.pop();
  }, {
    PreLoadConfig: "PreLoadConfig"
  } ],
  ResourceManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9498yjFjFFRYAnV1hTfZhI", "ResourceManager");
    "use strict";
    var ResourceManager = function ResourceManager() {
      this.resetData();
    }, resourceMG = ResourceManager.prototype, g_instance = null;
    resourceMG.resetData = function() {
      this._cacheList = [];
    };
    resourceMG.setRes = function(_url, _res) {
      console.log("setRes:" + _url);
      this._cacheList[_url] = _res;
    };
    resourceMG.getRes = function(_url) {
      return this._cacheList[_url];
    };
    resourceMG.getSpriteFrameFromAtlas = function(_atlas, _spriteName) {
      var atlas = this.getRes(_atlas);
      var frame = atlas.getSpriteFrame(_spriteName);
      return frame;
    };
    resourceMG.loadRes = function(_url, _callback) {
      console.log("resourceMG:" + _url);
      var cache = this.getRes(_url);
      if (null != cache) {
        _callback && _callback(cache);
        return;
      }
      var self = this;
      cc.loader.loadRes(_url, function(_error, _res) {
        _error ? console.error(_error) : self.setRes(_url, _res);
        null != _callback && _callback(_res);
      });
    };
    resourceMG.releaseRes = function(_url) {
      this._cacheList[_url].destroy();
      var deps = cc.loader.getDependsRecursively(_url);
      cc.loader.release(deps);
    };
    module.exports = function() {
      g_instance || (g_instance = new ResourceManager());
      return g_instance;
    };
    cc._RF.pop();
  }, {} ],
  ScoreCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22936tnAZZLQIwA8ORKX31A", "ScoreCtrl");
    "use strict";
    var gameCFG = require("GameConfig");
    var const_offTime = 1e3;
    cc.Class({
      extends: cc.Component,
      properties: {
        stageLab: {
          default: null,
          type: cc.Label
        },
        timeLab: {
          default: null,
          type: cc.Label
        },
        scoreLab: {
          default: null,
          type: cc.Label
        },
        _curTimer: null
      },
      onLoad: function onLoad() {
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this._curTimer = Date.now();
        this.playGame();
      },
      EnterBackground: function EnterBackground() {
        this.isBackGround = true;
        this.unregisterEvent();
      },
      EnterForeground: function EnterForeground() {
        if (this.isBackGround) {
          this.isBackGround = false;
          this.registerEvent();
        }
      },
      registerEvent: function registerEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.updateStage, this.updateStage, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.homePage, this.homePage, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.playGame, this.playGame, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.gameOver, this.gameOver, this);
      },
      unregisterEvent: function unregisterEvent() {
        monsterMatch.emitter.off(gameCFG.clientEvent.updateStage, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.homePage, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.playGame, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.gameOver);
      },
      updateStage: function updateStage() {
        console.log("updateStage");
        this.stageLab.string = "STAGE " + (monsterMatch.curStage + 1);
      },
      homePage: function homePage() {
        this.node.active = false;
      },
      playGame: function playGame(msg) {
        this.node.active = true;
        this.updateStage();
        this.updateInfo();
      },
      gameOver: function gameOver() {
        this.node.active = false;
      },
      updateInfo: function updateInfo() {
        this.scoreLab.string = monsterMatch.curScore;
        this.timeLab.string = monsterMatch.curActionTime + "s ";
        if (monsterMatch.curActionTime <= 0) {
          monsterMatch.gameStatus = gameCFG.GAME_STATUS.CONTINUE;
          monsterMatch.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.continue);
        }
      },
      update: function update() {
        var localTime = Date.now();
        var offTime = localTime - this._curTimer;
        if (offTime >= const_offTime) {
          this._curTimer = localTime - (offTime - const_offTime);
          if (monsterMatch.gameStatus == gameCFG.GAME_STATUS.INGAME) {
            monsterMatch.curActionTime--;
            monsterMatch.curActionTime >= 0 && this.updateInfo();
          }
        }
      },
      onDestroy: function onDestroy() {
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
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
      monsterMatch.resourceManager.loadRes(_path, function(_res) {
        _sprite.spriteFrame = new cc.SpriteFrame(_res);
      });
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
    var getRandomArray = function getRandomArray(_count) {
      var tempArray = [];
      for (var i = 0; i < _count; i++) tempArray.push(i);
      for (var j = 0; j < tempArray.length; j++) {
        var rand = parseInt(Math.random() * tempArray.length);
        var temp = tempArray[rand];
        tempArray[rand] = tempArray[j];
        tempArray[j] = temp;
      }
      return tempArray;
    };
    var setVideo = function setVideo(_isShow, _timer) {
      _timer = null == _timer || void 0 == _timer ? 0 : _timer;
      if (false == Global.isNative()) {
        var myVideo = document.getElementById("myVideo");
        if (null != myVideo && void 0 != myVideo) {
          var style = true == _isShow ? "" : "none";
          myVideo.style.display = style;
          myVideo.paused || myVideo.pause();
          true == _isShow && myVideo.paused && (myVideo.currentTime = _timer);
        }
      }
    };
    var randomPos = function randomPos(_nodeList, _len) {
      var randomArray = this.getRandomArray(_nodeList.length);
      for (var j = 0; j < _len; j++) {
        var curNode = _nodeList[j];
        var targetNode = _nodeList[randomArray[j]];
        if (curNode && targetNode) {
          var curzIndex = curNode.zIndex + 0;
          var curPos = curNode.getPosition();
          var targetzIndex = targetNode.zIndex + 0;
          var targetPos = targetNode.getPosition();
          curNode.zIndex = targetzIndex;
          curNode.originzIndex = targetzIndex;
          curNode.setPosition(targetPos);
          curNode.originPos = targetPos;
          targetNode.zIndex = curzIndex;
          targetNode.originzIndex = curzIndex;
          targetNode.setPosition(curPos);
          targetNode.originPos = curPos;
        }
      }
    };
    var fitFunc = function fitFunc(cvs) {
      var size = cc.view.getVisibleSize();
      var designSize = cc.view.getDesignResolutionSize();
      if (size.width / designSize.width > size.height / designSize.height) {
        cc.log("fitHeight");
        cvs.fitHeight = true;
        cvs.fitWidth = false;
      } else if (size.width / designSize.width < size.height / designSize.height) {
        cc.log("fitWidth");
        cvs.fitHeight = false;
        cvs.fitWidth = true;
      }
    };
    module.exports = {
      onInstantiate: onInstantiate,
      onGetNodeCompontent: onGetNodeCompontent,
      setSpriteImg: setSpriteImg,
      getRandomNum: getRandomNum,
      runPromiseArray: runPromiseArray,
      getRandomArray: getRandomArray,
      setVideo: setVideo,
      randomPos: randomPos,
      fitFunc: fitFunc
    };
    cc._RF.pop();
  }, {} ],
  autoLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f7c3lHGr9MA6RDQjX6Plfj", "autoLayout");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Direction: {
          default: 0,
          type: cc.Enum({
            Horizontal: 0,
            Vertical: 1
          }),
          displayName: "\u65b9\u5411",
          tooltip: "\u8bbe\u7f6e\u663e\u793a\u65b9\u5411",
          notify: function notify() {
            this._initItemPos();
          }
        },
        item: {
          default: [],
          type: [ cc.Node ],
          displayName: "\u5217\u8868",
          notify: function notify() {
            this._initItemPos(this.item);
          }
        },
        itemBg: {
          default: [],
          type: [ cc.Node ],
          displayName: "\u5217\u8868\u5e95\u56fe",
          notify: function notify() {
            this._initItemPos(this.itemBg);
          }
        },
        adjustPos: {
          default: cc.v2(0, 0),
          displayName: "\u5fae\u8c03\u4f4d\u7f6e",
          notify: function notify() {
            this._initItemPos(this.item);
            this._initItemPos(this.itemBg);
          }
        },
        itemOffset: {
          default: 0,
          type: cc.Integer,
          displayName: "\u95f4\u9694",
          tooltip: "\u8bbe\u7f6e\u95f4\u9694",
          notify: function notify() {
            this._initItemPos(this.item);
            this._initItemPos(this.itemBg);
          }
        }
      },
      _initItemPos: function _initItemPos(_list) {
        this.node.anchorY = .5;
        this.node.anchorX = .5;
        this._maxSize = new cc.Size(0, 0);
        for (var i = 0; i < _list.length; i++) {
          this._maxSize.width += _list[i].width;
          this._maxSize.height += _list[i].height;
          this._maxSize.width += this.itemOffset;
          this._maxSize.height += this.itemOffset;
        }
        var startPos;
        startPos = 0 == this.Direction ? cc.v2(-this._maxSize.width * this.node.anchorX, -this._maxSize.height * this.node.anchorY) : cc.v2(this._maxSize.width * this.node.anchorX, this._maxSize.height * this.node.anchorY);
        this.itemList = [];
        for (var _i = 0; _i < _list.length; _i++) {
          var anchor = _list[_i].getAnchorPoint();
          var itemSize = _list[_i].getContentSize();
          if (0 == this.Direction) {
            startPos.addSelf(cc.v2(itemSize.width * anchor.x, itemSize.height * anchor.y));
            _list[_i].x = startPos.x + this.adjustPos.x;
            _list[_i].y = 0 + this.adjustPos.y;
            startPos.addSelf(cc.v2(itemSize.width * anchor.x, itemSize.height * anchor.y));
            startPos.addSelf(cc.v2(this.itemOffset, this.itemOffset));
          } else {
            startPos.subSelf(cc.v2(itemSize.width * anchor.x, itemSize.height * anchor.y));
            _list[_i].x = 0 + this.adjustPos.x;
            _list[_i].y = startPos.y + this.adjustPos.y;
            startPos.subSelf(cc.v2(itemSize.width * anchor.x, itemSize.height * anchor.y));
            startPos.subSelf(cc.v2(this.itemOffset, this.itemOffset));
          }
          this.itemList[_i] = _list[_i];
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  cardCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "377e4p1LRBLZ6qpmYHuDDHD", "cardCtrl");
    "use strict";
    var gameCFG = require("GameConfig");
    var UITools = require("UITools");
    var const_flopTime = .05;
    cc.Class({
      extends: cc.Component,
      properties: {
        animNode: {
          default: null,
          type: cc.Node
        },
        itemIcon: {
          default: null,
          type: cc.Sprite
        },
        itemMask: {
          default: null,
          type: cc.Node
        },
        itemBtn: {
          default: null,
          type: cc.Button
        },
        idLab: {
          default: null,
          type: cc.Label
        },
        _parentCtrl: null,
        _isPlaying: false,
        _isPositive: false
      },
      onLoad: function onLoad() {},
      initUI: function initUI(_parentCtrl, _data) {
        this.clearData();
        this.idLab.string = _data.PID;
        this._parentCtrl = _parentCtrl;
        var self = this;
        var path = "icon/hero_" + _data.PID;
        console.log("Path:" + path);
        UITools.setSpriteImg(this.itemIcon, path);
        this.itemIcon.node.setScale(1 * _data.Scale, 1 * _data.Scale);
        var pos = _data.Position.split("|");
        this.itemIcon.node.setPosition(cc.v2(1 * pos[0], 2 * pos[1]));
      },
      onClickBtn: function onClickBtn(evn, type) {
        if (monsterMatch.gameStatus != gameCFG.GAME_STATUS.INGAME) return;
        if (this._isPositive) {
          console.log("Positive...");
          return;
        }
        if (this._isPlaying) {
          console.log("Playing...");
          return;
        }
        if (this._parentCtrl._isJudging) {
          console.log("Judging...");
          return;
        }
        this.playAnimation(true, true);
        this._parentCtrl.onClickCardBtn(this);
      },
      playAnimation: function playAnimation() {
        var _this = this;
        var _isPositive = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var _isAnim = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        console.log("playAnimation:" + _isPositive + " ** " + _isAnim);
        this._isPlaying = true;
        this._isPositive = _isPositive;
        this.animNode.stopAllActions();
        var animList = [];
        _isAnim && animList.push(cc.scaleTo(const_flopTime, 0, 1));
        animList.push(cc.callFunc(function() {
          _this.itemMask.active = !_this._isPositive;
        }));
        _isAnim && animList.push(cc.scaleTo(const_flopTime, 1, 1));
        animList.push(cc.callFunc(function() {
          _this._isPlaying = false;
        }));
        this.animNode.runAction(cc.sequence(animList));
        _isPositive && monsterMatch.musicManager.playEffect(gameCFG.PERLOAD_NAME.cardFlip);
      },
      isPair: function isPair(_isPair) {
        console.log("isPair:" + _isPair);
        _isPair ? this.itemBtn.interactable = false : this.playAnimation(false, true);
      },
      clearData: function clearData() {
        this.idLab.string = "";
        this.itemBtn.interactable = true;
        this._parentCtrl = null;
        this._isPlaying = false;
        this._isPositive = false;
        this.itemIcon.spriteFrame = "";
        this.itemIcon.node.setScale(1, 1);
        this.itemIcon.node.setPosition(cc.v2(0, 0));
        this.itemMask.active = true;
        this.animNode.setScale(1, 1);
        this.animNode.stopAllActions();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    UITools: "UITools"
  } ],
  continue: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5bfdCJ491InKLMzrH23FQg", "continue");
    "use strict";
    var gameCFG = require("GameConfig");
    var const_closeTime = 3;
    var const_countDown = 10;
    var const_offTime = 1e3;
    cc.Class({
      extends: cc.Component,
      properties: {
        timeLab: {
          default: null,
          type: cc.RichText
        },
        closeNode: {
          default: null,
          type: cc.Node
        },
        _remainTime: 0,
        _curTimer: null
      },
      onLoad: function onLoad() {
        this._curTimer = Date.now();
        this._remainTime = const_countDown;
        this.updateTimer();
      },
      updateTimer: function updateTimer() {
        var closeTime = const_closeTime - (const_countDown - this._remainTime);
        var msg_ct = closeTime > 0 ? "<color=#FFB709><b>(" + closeTime + "s)</b></c>" : "";
        var msg = "<color=#2AE24f>" + this._remainTime + "s</c>" + msg_ct;
        msg = this._remainTime > 0 ? msg : "";
        this.timeLab.string = msg;
        if (closeTime <= 0 && false == this.closeNode.active) {
          this.closeNode.active = true;
          this.closeNode.getComponent(cc.Animation).play("countDown");
        }
      },
      onClickBtn: function onClickBtn(evn, type) {
        monsterMatch.musicManager.playClickEffect();
        if ("0" == type) {
          console.log("ads");
          monsterMatch.curActionTime += monsterMatch.adsAddTime;
          monsterMatch.emitter.emit(gameCFG.clientEvent.playGame);
        } else if ("1" == type) {
          console.log("close");
          monsterMatch.emitter.emit(gameCFG.clientEvent.gameOver);
          monsterMatch.panel.closeChildPanel(1e3, cc.director.getScene());
          monsterMatch.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.result, cc.director.getScene(), 1e3);
        }
        this.node.destroy();
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      },
      update: function update() {
        var localTime = Date.now();
        var offTime = localTime - this._curTimer;
        if (offTime >= const_offTime) {
          this._curTimer = localTime - (offTime - const_offTime);
          this._remainTime--;
          this._remainTime >= 0 && this.updateTimer();
        }
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  emitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af14eiX8uJLo6eO4nPr7xmX", "emitter");
    "use strict";
    var indexOf = [].indexOf;
    var index = function index(arr, obj) {
      for (var i = 0; i < arr.length; ++i) if (arr[i].obj === obj) return i;
      return -1;
    };
    var g_instance = null;
    module.exports = function() {
      g_instance || (g_instance = new Emitter());
      return g_instance;
    };
    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
      return obj;
    }
    Emitter.prototype.on = function(event, fn, obj) {
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push({
        func: fn,
        obj: obj
      });
      return this;
    };
    Emitter.prototype.once = function(event, fn, obj) {
      var self = this;
      this._callbacks = this._callbacks || {};
      function on() {
        self.off(event, on);
        fn.apply(obj, arguments);
      }
      fn._off = on;
      this.on(event, on, obj);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = function(event, obj) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks[event];
      if (!callbacks) return this;
      if (1 == arguments.length) {
        delete this._callbacks[event];
        return this;
      }
      var i = index(callbacks, obj);
      ~i && callbacks.splice(i, 1);
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
      if (callbacks) {
        console.log("\u53d1\u9001\u4e86\u4e8b\u4ef6", event, args);
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          var obj = callbacks[i].obj;
          callbacks[i].func.apply(obj, args);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
    cc._RF.pop();
  }, {} ],
  gameCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea24dpmrN9NW7o9H9cEoSz4", "gameCtrl");
    "use strict";
    var gameCFG = require("GameConfig");
    var gameData = require("gameData");
    var heroData = require("heroData");
    var ARROW_TYPE = cc.Enum({
      LEFT: 0,
      RIGHT: 1
    });
    var RESULT_TYPE = cc.Enum({
      PAIR: 0,
      STAGE: 1
    });
    var const_baseTime = 30;
    cc.Class({
      extends: cc.Component,
      properties: {
        layout: {
          default: null,
          type: cc.Node
        },
        groupCellPreb: {
          default: null,
          type: cc.Prefab
        },
        cardCellPreb: {
          default: null,
          type: cc.Prefab
        },
        _cardList: [],
        _firstCard: null,
        _secondCard: null,
        _isJudging: false,
        _gameData: null
      },
      onLoad: function onLoad() {
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this.onClickArrowBtn(null, 0);
      },
      EnterBackground: function EnterBackground() {
        this.isBackGround = true;
        this.unregisterEvent();
      },
      EnterForeground: function EnterForeground() {
        if (this.isBackGround) {
          this.isBackGround = false;
          this.registerEvent();
        }
      },
      registerEvent: function registerEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.gotoHome, this.gotoHome, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.playGame, this.playGame, this);
      },
      unregisterEvent: function unregisterEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.gotoHome, this.gotoHome, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.playGame, this);
      },
      gotoHome: function gotoHome() {
        console.log("playGame->gotoHome:");
        this.onClickArrowBtn();
      },
      playGame: function playGame() {
        console.log("playGame->gameCtrl:");
        this.onClickArrowBtn();
      },
      onClickArrowBtn: function onClickArrowBtn(evn, type) {
        if (evn) {
          monsterMatch.musicManager.playClickEffect();
          type == ARROW_TYPE.LEFT ? monsterMatch.curStage-- : type == ARROW_TYPE.RIGHT && monsterMatch.curStage++;
        }
        monsterMatch.curStage = monsterMatch.curStage < 0 ? 0 : monsterMatch.curStage;
        monsterMatch.curStage = monsterMatch.curStage > gameData.length - 1 ? gameData.length - 1 : monsterMatch.curStage;
        this.clearData();
        this.initUI();
        monsterMatch.emitter.emit(gameCFG.clientEvent.updateStage);
      },
      initUI: function initUI() {
        this._gameData = gameData[monsterMatch.curStage];
        var heroNum = this._gameData.Row * this._gameData.Column / 2;
        console.log("curIndex:" + monsterMatch.curStage + " ** " + JSON.stringify(this._gameData) + " ** heroNum:" + heroNum);
        var randomArray = this.getRandomArray(heroData.length);
        console.log(randomArray);
        var heroArray = randomArray.splice(0, heroNum);
        console.log(heroArray);
        heroArray = heroArray.concat(heroArray);
        heroArray.sort(function(a, b) {
          return Math.random() > .5 ? -1 : 1;
        });
        console.log(heroArray);
        var index = 0;
        this._cardList = [];
        this.layout.removeAllChildren();
        for (var i = 0; i < parseInt(this._gameData.Row); i++) {
          var groundCell = cc.instantiate(this.groupCellPreb);
          for (var j = 0; j < parseInt(this._gameData.Column); j++) {
            var herodata = heroData[heroArray[index]];
            var cardCell = cc.instantiate(this.cardCellPreb);
            cardCell.curTarget = herodata.Name;
            groundCell.addChild(cardCell);
            this._cardList.push(cardCell);
            var cardCtrl = cardCell.getComponent("cardCtrl");
            cardCtrl.initUI(this, herodata);
            index++;
          }
          this.layout.addChild(groundCell);
        }
      },
      getRandomArray: function getRandomArray(_count) {
        var tempArray = [];
        for (var i = 0; i < _count; i++) tempArray.push(i);
        for (var j = 0; j < tempArray.length; j++) {
          var rand = parseInt(Math.random() * tempArray.length);
          var temp = tempArray[rand];
          tempArray[rand] = tempArray[j];
          tempArray[j] = temp;
        }
        return tempArray;
      },
      onClickCardBtn: function onClickCardBtn(_cardTarget) {
        var _this = this;
        console.log("onClickCardBtn:" + _cardTarget._isPositive);
        null == this._firstCard ? this._firstCard = _cardTarget : null == this._secondCard && (this._secondCard = _cardTarget);
        if (this._firstCard && this._secondCard) {
          this._isJudging = true;
          var isPair = this._firstCard.node.curTarget == this._secondCard.node.curTarget;
          if (isPair) {
            this.updateData(RESULT_TYPE.PAIR);
            monsterMatch.musicManager.playEffect(gameCFG.PERLOAD_NAME.pairCleared);
          }
          var animList = [];
          animList.push(cc.delayTime(.1));
          animList.push(cc.callFunc(function() {
            _this._firstCard.isPair(isPair);
            _this._secondCard.isPair(isPair);
          }));
          animList.push(cc.delayTime(.2));
          animList.push(cc.callFunc(function() {
            _this._isJudging = false;
            _this._firstCard = null;
            _this._secondCard = null;
          }));
          if (isPair) {
            animList.push(cc.delayTime(.1));
            animList.push(cc.callFunc(function() {
              _this.result(isPair);
            }));
          }
          this.node.runAction(cc.sequence(animList));
        }
      },
      result: function result(_isPair) {
        var isDone = this.isDone();
        if (isDone) {
          this.updateData(RESULT_TYPE.STAGE);
          this.onClickArrowBtn("dosth", ARROW_TYPE.RIGHT);
          monsterMatch.musicManager.playEffect(gameCFG.PERLOAD_NAME.stageCleared);
        }
      },
      isDone: function isDone() {
        var isDone = true;
        for (var i = 0; i < this._cardList.length; i++) {
          var itemBtn = this._cardList[i].getComponent(cc.Button);
          if (true == itemBtn.interactable) {
            isDone = false;
            break;
          }
        }
        return isDone;
      },
      updateData: function updateData(_resultType) {
        var addScore = 0, addTime = 0;
        if (_resultType == RESULT_TYPE.PAIR) {
          addScore = parseInt(this._gameData.PairScore);
          addTime = parseInt(this._gameData.PairSecond);
        } else if (_resultType == RESULT_TYPE.STAGE) {
          addScore = parseInt(this._gameData.StageScore);
          addTime = parseInt(this._gameData.StageSecond);
        }
        monsterMatch.curScore += addScore;
        monsterMatch.curActionTime += addTime;
        monsterMatch.curActionTime = monsterMatch.curActionTime >= monsterMatch.maxActionTime ? monsterMatch.maxActionTime : monsterMatch.curActionTime;
        var highestScore = cc.sys.localStorage.getItem("highestScore");
        if (null == highestScore || void 0 == highestScore || monsterMatch.curScore > parseInt(highestScore)) {
          console.log("\u65b0\u8bb0\u5f55\uff1a" + monsterMatch.curScore);
          cc.sys.localStorage.setItem("highestScore", monsterMatch.curScore);
        }
        console.log("updateData:" + monsterMatch.curScore + " ** " + monsterMatch.curActionTime);
      },
      clearData: function clearData() {
        this._gameData = null;
        this._cardList = [];
        this._firstCard = null;
        this._secondCard = null;
        this._isJudging = false;
      },
      onDestroy: function onDestroy() {
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    gameData: "gameData",
    heroData: "heroData"
  } ],
  gameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30754a4JBlKioQ4ZuRFQlVv", "gameData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Row: "1",
      Column: "2",
      TotalNum: "2",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["1"] = {
      PID: "1",
      Row: "2",
      Column: "2",
      TotalNum: "4",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["2"] = {
      PID: "2",
      Row: "3",
      Column: "2",
      TotalNum: "6",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["3"] = {
      PID: "3",
      Row: "2",
      Column: "3",
      TotalNum: "6",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["4"] = {
      PID: "4",
      Row: "4",
      Column: "2",
      TotalNum: "8",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["5"] = {
      PID: "5",
      Row: "2",
      Column: "4",
      TotalNum: "8",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["6"] = {
      PID: "6",
      Row: "4",
      Column: "3",
      TotalNum: "12",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["7"] = {
      PID: "7",
      Row: "3",
      Column: "4",
      TotalNum: "12",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["8"] = {
      PID: "8",
      Row: "4",
      Column: "4",
      TotalNum: "16",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["9"] = {
      PID: "9",
      Row: "5",
      Column: "4",
      TotalNum: "20",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["10"] = {
      PID: "10",
      Row: "4",
      Column: "5",
      TotalNum: "20",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["11"] = {
      PID: "11",
      Row: "6",
      Column: "4",
      TotalNum: "24",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["12"] = {
      PID: "12",
      Row: "4",
      Column: "6",
      TotalNum: "24",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["13"] = {
      PID: "13",
      Row: "5",
      Column: "6",
      TotalNum: "30",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["14"] = {
      PID: "14",
      Row: "6",
      Column: "5",
      TotalNum: "30",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    data["15"] = {
      PID: "15",
      Row: "6",
      Column: "6",
      TotalNum: "36",
      PairSecond: "1",
      StageSecond: "5",
      PairScore: "10",
      StageScore: "100"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  handleCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "70497PvRBJKzqRjhSMzfpgN", "handleCtrl");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        logo: {
          default: null,
          type: cc.Node
        },
        btnNode: {
          default: null,
          type: cc.Node
        },
        soundToggle: {
          default: null,
          type: cc.Toggle
        }
      },
      onLoad: function onLoad() {
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this._Wsize = cc.director.getWinSize();
        this.playAnimation(true, true);
        var localStatus = cc.sys.localStorage.getItem("soundStatus");
        0 == localStatus ? this.soundToggle.check() : 1 == localStatus && this.soundToggle.uncheck();
      },
      EnterBackground: function EnterBackground() {
        this.isBackGround = true;
        this.unregisterEvent();
      },
      EnterForeground: function EnterForeground() {
        if (this.isBackGround) {
          this.isBackGround = false;
          this.registerEvent();
        }
      },
      registerEvent: function registerEvent() {
        monsterMatch.emitter.on(gameCFG.clientEvent.gotoHome, this.gotoHome, this);
        monsterMatch.emitter.on(gameCFG.clientEvent.playGame, this.playGame, this);
      },
      unregisterEvent: function unregisterEvent() {
        monsterMatch.emitter.off(gameCFG.clientEvent.gotoHome, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.playGame, this);
      },
      gotoHome: function gotoHome() {
        this.playAnimation(true, true);
      },
      playGame: function playGame() {
        this.playAnimation(false, true);
      },
      onClickPlayGameBtn: function onClickPlayGameBtn(evn, type) {
        cc.log("onClickPlayGameBtn");
        monsterMatch.musicManager.playClickEffect();
        if ("0" == type) {
          monsterMatch.panel.showPrompt("coming soon...");
          return;
        }
        monsterMatch.emitter.emit(gameCFG.clientEvent.playGame, {
          type: type
        });
      },
      onClickRankBtn: function onClickRankBtn(evn, type) {
        cc.log("onClickRankBtn");
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.rank);
      },
      onClickSoundToggle: function onClickSoundToggle(evn, type) {
        monsterMatch.musicManager.playClickEffect();
        var status = evn.isChecked ? 0 : 1;
        cc.sys.localStorage.setItem("soundStatus", status);
        if (evn.isChecked) {
          monsterMatch.musicManager.pauseBGMusic();
          monsterMatch.musicManager.stopAllEffects();
        } else monsterMatch.musicManager.playBGM(gameCFG.PERLOAD_NAME.bgMusic);
      },
      playAnimation: function playAnimation() {
        var _isShow = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var _isAnim = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (_isShow) if (_isAnim) {
          this.logo.runAction(cc.moveTo(.5, 0, this.logo.y));
          this.btnNode.runAction(cc.moveTo(.5, 0, this.btnNode.y));
        } else {
          this.logo.setPosition(cc.v2(0, this.logo.y));
          this.btnNode.setPosition(cc.v2(0, this.btnNode.y));
        } else if (_isAnim) {
          this.logo.runAction(cc.moveTo(.5, 2 * this._Wsize.width, this.logo.y));
          this.btnNode.runAction(cc.moveTo(.5, 2 * -this._Wsize.width, this.btnNode.y));
        } else {
          this.logo.setPosition(cc.v2(2 * this._Wsize.width, this.logo.y));
          this.btnNode.setPosition(cc.v2(2 * -this._Wsize.width, this.btnNode.y));
        }
      },
      onDestroy: function onDestroy() {
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        monsterMatch.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  heroData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "255cdWceYVE15nL3hx2q9oC", "heroData");
    "use strict";
    var data = [];
    data["0"] = {
      PID: "0",
      Name: "hero_0",
      Scale: "0.6",
      Position: "20|-15"
    };
    data["1"] = {
      PID: "1",
      Name: "hero_1",
      Scale: "0.55",
      Position: "5|-15"
    };
    data["2"] = {
      PID: "2",
      Name: "hero_2",
      Scale: "0.45",
      Position: "5|-15"
    };
    data["3"] = {
      PID: "3",
      Name: "hero_3",
      Scale: "0.4",
      Position: "15|0"
    };
    data["4"] = {
      PID: "4",
      Name: "hero_4",
      Scale: "0.4",
      Position: "15|-5"
    };
    data["5"] = {
      PID: "5",
      Name: "hero_5",
      Scale: "0.45",
      Position: "20|-5"
    };
    data["6"] = {
      PID: "6",
      Name: "hero_6",
      Scale: "0.5",
      Position: "10|-5"
    };
    data["7"] = {
      PID: "7",
      Name: "hero_7",
      Scale: "0.4",
      Position: "0|-5"
    };
    data["8"] = {
      PID: "8",
      Name: "hero_8",
      Scale: "0.35",
      Position: "0|-5"
    };
    data["9"] = {
      PID: "9",
      Name: "hero_9",
      Scale: "0.35",
      Position: "0|-5"
    };
    data["10"] = {
      PID: "10",
      Name: "hero_10",
      Scale: "0.4",
      Position: "0|-5"
    };
    data["11"] = {
      PID: "11",
      Name: "hero_11",
      Scale: "0.55",
      Position: "35|-5"
    };
    data["12"] = {
      PID: "12",
      Name: "hero_12",
      Scale: "0.55",
      Position: "0|0"
    };
    data["13"] = {
      PID: "13",
      Name: "hero_13",
      Scale: "0.45",
      Position: "0|0"
    };
    data["14"] = {
      PID: "14",
      Name: "hero_14",
      Scale: "0.7",
      Position: "0|0"
    };
    data["15"] = {
      PID: "15",
      Name: "hero_15",
      Scale: "0.45",
      Position: "0|0"
    };
    data["16"] = {
      PID: "16",
      Name: "hero_16",
      Scale: "0.5",
      Position: "0|0"
    };
    data["17"] = {
      PID: "17",
      Name: "hero_17",
      Scale: "0.45",
      Position: "0|0"
    };
    data["18"] = {
      PID: "18",
      Name: "hero_18",
      Scale: "0.65",
      Position: "10|-20"
    };
    data["19"] = {
      PID: "19",
      Name: "hero_19",
      Scale: "0.5",
      Position: "0|0"
    };
    data["20"] = {
      PID: "20",
      Name: "hero_20",
      Scale: "0.5",
      Position: "0|0"
    };
    data["21"] = {
      PID: "21",
      Name: "hero_21",
      Scale: "0.42",
      Position: "0|0"
    };
    data["22"] = {
      PID: "22",
      Name: "hero_22",
      Scale: "0.45",
      Position: "5|-10"
    };
    data["23"] = {
      PID: "23",
      Name: "hero_23",
      Scale: "0.5",
      Position: "25|0"
    };
    data["24"] = {
      PID: "24",
      Name: "hero_24",
      Scale: "0.5",
      Position: "15|0"
    };
    module.exports = data;
    cc._RF.pop();
  }, {} ],
  promptUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "397e3f5uUFJO5P8TyQdbRDB", "promptUI");
    "use strict";
    var promptUI = cc.Class({
      extends: cc.Component,
      properties: {
        desLbl: cc.Label,
        coinNode: cc.Node,
        gemNode: cc.Node
      },
      showDes: function showDes(des, _type) {
        this.desLbl.string = des;
        this.coinNode.active = false;
        this.gemNode.active = false;
        "coin" == _type ? this.coinNode.active = true : "gem" == _type && (this.gemNode.active = true);
        var self = this;
        this.node.runAction(cc.sequence(cc.moveBy(.2, 0, 150), cc.moveBy(1, 0, 0), cc.moveBy(.2, 0, 150), cc.fadeOut(.2), cc.callFunc(function() {
          self.node.destroy();
        })));
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      }
    });
    module.exports = promptUI;
    cc._RF.pop();
  }, {} ],
  rank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb227h8ii1MBKxZMjPz6cBo", "rank");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      onClickCloseBtn: function onClickCloseBtn(evn, type) {
        console.log("onClickCloseBtn");
        monsterMatch.musicManager.playClickEffect();
        this.node.destroy();
      },
      onClickToggleBtn: function onClickToggleBtn(evn, type) {
        console.log("onClickToggleBtn:" + type);
        monsterMatch.musicManager.playClickEffect();
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  result: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c4dfRtQypNFpkmKr4xbWmC", "result");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        highestLab: {
          default: null,
          type: cc.Label
        },
        scoreLab: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.scoreLab.string = monsterMatch.curScore;
        var highestScore = cc.sys.localStorage.getItem("highestScore");
        null != highestScore && void 0 != highestScore || (highestScore = 0);
        this.highestLab.string = "HIGHEST SCORE\n" + highestScore;
      },
      onClickPlayGameBtn: function onClickPlayGameBtn(evn, type) {
        cc.log("onClickPlayGameBtn");
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.panel.showPrompt("coming soon...");
      },
      onClickHomeBtn: function onClickHomeBtn(evn, type) {
        console.log("onClickHomeBtn");
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.curScore = 0;
        monsterMatch.curStage = 0;
        monsterMatch.gameStatus = gameCFG.GAME_STATUS.WAIT;
        monsterMatch.curActionTime = monsterMatch.maxActionTime;
        monsterMatch.emitter.emit(gameCFG.clientEvent.gotoHome);
        console.log("onClickRePlayBtn:" + monsterMatch.curActionTime + " ** " + monsterMatch.maxActionTime);
        this.node.destroy();
      },
      onClickRankBtn: function onClickRankBtn(evn, type) {
        console.log("onClickRankBtn");
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.rank);
      },
      onClickShareBtn: function onClickShareBtn(evn, type) {
        console.log("onClickShareBtn");
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.panel.showPrompt("coming soon...");
      },
      onClickRePlayBtn: function onClickRePlayBtn(evn, type) {
        monsterMatch.musicManager.playClickEffect();
        monsterMatch.curScore = 0;
        monsterMatch.curStage = 0;
        monsterMatch.gameStatus = gameCFG.GAME_STATUS.WAIT;
        monsterMatch.curActionTime = monsterMatch.maxActionTime;
        monsterMatch.emitter.emit(gameCFG.clientEvent.playGame);
        console.log("onClickRePlayBtn:" + monsterMatch.curActionTime + " ** " + monsterMatch.maxActionTime);
        this.node.destroy();
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ]
}, {}, [ "gameData", "heroData", "GameConfig", "Global", "PreLoadConfig", "PreLoadManager", "ResourceManager", "UITools", "emitter", "AnimCtrl", "MainScene", "MusicManager", "Panel", "ScoreCtrl", "autoLayout", "cardCtrl", "continue", "gameCtrl", "handleCtrl", "promptUI", "rank", "result" ]);