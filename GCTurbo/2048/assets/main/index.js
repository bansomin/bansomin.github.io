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
        o = b;
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
  Cell: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d288Vvo65MuoZf1hB2p6r0", "Cell");
    "use strict";
    var CELL_COLOR = {
      2: "#ECE0D5",
      4: "#EBDCC2",
      8: "#F4A873",
      16: "#F18151",
      32: "#F1654D",
      64: "#F0462D",
      128: "#D5BF7F",
      256: "#D4B966",
      512: "#D9A64A",
      1024: "#C69949",
      2048: "#98941E"
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        bg: {
          default: null,
          type: cc.Node
        },
        numLabel: {
          default: null,
          type: cc.Label
        },
        num: {
          default: 0,
          notify: function notify() {
            this.adjustUI();
          }
        }
      },
      adjustUI: function adjustUI() {
        this.numLabel.string = this.num;
        this.numLabel.node.color = this.num <= 4 ? cc.Color.BLACK : cc.Color.WHITE;
        this.bg.color = CELL_COLOR[String(this.num)] ? cc.color(CELL_COLOR[String(this.num)]) : cc.color("#ECE0D5");
      },
      adjustSize: function adjustSize(_width, _height) {
        this.node.width = this.bg.width = _width;
        this.node.height = this.bg.height = _height;
      }
    });
    cc._RF.pop();
  }, {} ],
  ComboBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "133eeb3BdFEWJY2+XYBOhAK", "ComboBox");
    "use strict";
    var language = [ "English", "Japanese" ];
    var languageSM = [ "en", "jp" ];
    cc.Class({
      extends: cc.Component,
      properties: {
        triangle: cc.Node,
        comboLabel: cc.Label,
        dropDown: cc.Node,
        vLayoutNode: cc.Node,
        contentNode: cc.Node,
        itemPrefab: cc.Prefab
      },
      onLoad: function onLoad() {
        this.isDropDown = false;
        this.comboLabel.string = "en" == Global.language ? Global.languageData.t("label_text.English") : Global.languageData.t("label_text.Japanese");
      },
      onClickItemBtn: function onClickItemBtn(evn) {
        Global.musicManager.playClickEffect();
        this.rotateTriangle();
        this.showHideDropDownBox();
        this.isDropDown ? this.isDropDown = false : this.isDropDown = true;
        evn && this.initItems();
      },
      rotateTriangle: function rotateTriangle() {
        if (this.isDropDown) {
          var _rotateAction = cc.rotateTo(.5, 90).easing(cc.easeCubicActionOut());
          this.triangle.runAction(_rotateAction);
        } else {
          var rotateAction = cc.rotateTo(.5, 180).easing(cc.easeCubicActionOut());
          this.triangle.runAction(rotateAction);
        }
      },
      showHideDropDownBox: function showHideDropDownBox() {
        this.isDropDown ? this.dropDown.active = false : this.dropDown.active = true;
      },
      initItems: function initItems() {
        this.vLayoutNode.removeAllChildren();
        for (var i = 0; i < language.length; i++) {
          var item = cc.instantiate(this.itemPrefab);
          item.getComponent("Item").setData(this, {
            language: language[i],
            languageSM: languageSM[i]
          });
          this.vLayoutNode.addChild(item);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  GCTurboAnalytics: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87707wQyDVFWpvYS3kZuAeL", "GCTurboAnalytics");
    "use strict";
    var GCTurboAnalytics = function GCTurboAnalytics() {
      this.resetData();
    }, gct = GCTurboAnalytics.prototype, g_instance = null;
    gct.resetData = function() {};
    gct.init = function() {
      var data = {
        gameId: Global.getGameId(),
        version: Global.getVersion(),
        debugLog: true,
        amplitude: {
          apiKey: Global.getApiKey(),
          debugLog: true
        }
      };
      window.gcTurboAnalytics.init(data);
    };
    gct.sendBaseUserProperties = function() {
      var obj = new Object();
      obj["match_play_enabled"] = false;
      obj["date"] = Global.tools.timeFormat(Date.now());
      obj["version"] = Global.getVersion();
      obj["user_id"] = window.FBInstant ? FBInstant.player.getID() : "Unknown";
      obj["context_id"] = window.FBInstant ? FBInstant.context.getID() : null;
      obj["context_type"] = window.FBInstant ? FBInstant.context.getType() : "Unknown";
      window.gcTurboAnalytics.setUserProperties(obj);
    };
    gct.setUserProperties = function(_data) {
      window.gcTurboAnalytics.setUserProperties(_data);
    };
    gct.pushEvent = function(_eventName, _eventData) {
      window.gcTurboAnalytics.pushEvent(_eventName, _eventData);
    };
    module.exports = function() {
      g_instance || (g_instance = new GCTurboAnalytics());
      return g_instance;
    };
    cc._RF.pop();
  }, {} ],
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
      gotoHome: "gotoHome",
      showTime: "showTime",
      updateAsset: "updateAsset",
      updateLabel: "updateLabel",
      gogogo: "gogogo",
      changeHero: "changeHero",
      createHero: "createHero"
    };
    var GAME_STATUS = cc.Enum({
      WAIT: 0,
      INGAME: 1,
      CONTINUE: 2,
      ROUNDFINISH: 3,
      SETTLE: 4,
      SHOWTIME: 5
    });
    var PERLOAD_NAME = cc.Enum({
      bgMusic: "audio/bgMusic",
      success: "audio/success",
      click: "audio/click",
      close: "audio/close",
      msg: "audio/msg",
      promptUI: "prefabs/promptUI",
      loading: "prefabs/loading",
      help: "prefabs/help",
      result: "prefabs/result"
    });
    var KEY = cc.Enum({
      soundStatus: "soundStatus",
      bgmusicStatus: "bgmusicStatus",
      effectStatus: "effectStatus",
      highestScore: "highestScore",
      rewardAdsLastTime: "rewardAdsLastTime"
    });
    var LAYER_ORDER = cc.Enum({
      rank: 1e3,
      top: 2e3,
      mask: 2500
    });
    var Events = {
      choose: "choose",
      create: "create",
      create_shortcut: "create_shortcut",
      share: "share",
      subscribe_bot: "subscribe_bot",
      switch: "switch",
      update: "update"
    };
    var EventType = {
      choose: "choose",
      create: "create",
      switch: "switch",
      update: "update",
      share: "share"
    };
    var Feature = {
      challenge: "challenge",
      atStart: "atStart",
      atGameOver: "atGameOver",
      fromScoreBoard: "fromScoreBoard",
      fromGameOver: "fromGameOver"
    };
    var FeatureType = {
      invite: "INVITE",
      share: "SHARE"
    };
    var Asset = {
      invite1: "invite1",
      share1: "share1"
    };
    var Source = {
      homeAlone: "homeAlone",
      homeWithFriends: "homeWithFriends",
      gameOverWithFriends: "gameOverWithFriends",
      gameOverChallenge: "gameOverChallenge",
      retry: "retry"
    };
    module.exports = {
      STATUS_TYPE: STATUS_TYPE,
      GAME_STATUS: GAME_STATUS,
      clientEvent: clientEvent,
      PERLOAD_NAME: PERLOAD_NAME,
      KEY: KEY,
      LAYER_ORDER: LAYER_ORDER,
      Events: Events,
      EventType: EventType,
      FeatureType: FeatureType,
      Feature: Feature,
      Asset: Asset,
      Source: Source
    };
    cc._RF.pop();
  }, {} ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b57cRzx91BHrVzrUm7nlFn", "Global");
    "use strict";
    window.Global = window.Global || {};
    window.reStartGame = function() {
      cc.game.restart();
    };
    window.startGame = function() {
      window.isShow = false;
      cc.game.on(cc.game.EVENT_HIDE, function() {
        if (window.isShow) {
          Global.emitter.emit("EnterBackground");
          window.isShow = false;
        }
      });
      cc.game.on(cc.game.EVENT_SHOW, function() {
        if (!window.isShow) {
          Global.emitter.emit("EnterForeground");
          window.isShow = true;
        }
      });
      Global.tools = require("Tools")();
      Global.emitter = require("emitter")();
      Global.isDebug = false;
      var key = Global.getAppName() + "language";
      Global.language = cc.sys.localStorage.getItem(key);
      null != Global.language && void 0 != Global.language || (Global.language = "jp");
      cc.sys.localStorage.setItem(key, Global.language);
      Global.languageData = require("LanguageData");
      Global.languageData.init(Global.language);
      Global.gameCtrl = null;
      Global.curSource = null;
      Global.entryTime = Date.now();
      Global.player = {
        curScore: 0,
        highestScore: 0
      };
      Global.curLevel = 0;
      Global.player.highestScore = 0;
      var curLevel = cc.sys.localStorage.getItem(Global.getAppName() + "curLevel");
      null != curLevel && void 0 != curLevel && (Global.curLevel = 1 * curLevel);
      console.log("curLevel:", Global.curLevel);
      Global.adsAddCoin = 250;
      Global.maxAdsRewardeTimes = 1;
      Global.curActionTime = Global.initActionTime = 15e3;
      Global.maxActionTime = 6e4;
      Global.session_ct = cc.sys.localStorage.getItem("session_ct") || 0;
      Global.gameCount = 0;
      Global.gameCompleted = 0;
      Global.gameContinued = 0;
      Global.gameNonContinued = 0;
      Global.gameMaxPlayed = 0;
      var FeatureType = {
        invite: "INVITE",
        share: "SHARE"
      };
      var src_invite_ct = cc.sys.localStorage.getItem("src_invite_ct");
      Global.src_invite_ct = src_invite_ct || 0;
      Global.src_invite_ct = 1 * Global.src_invite_ct;
      var src_invite_ct_feature = cc.sys.localStorage.getItem("src_invite_ct_feature");
      Global.src_invite_ct_feature = null == src_invite_ct_feature || void 0 == src_invite_ct_feature ? {} : JSON.parse(src_invite_ct_feature);
      Global.src_invite_ct_session = 0;
      Global.src_invite_ct_feature_session = {};
      for (var _key in FeatureType) if (FeatureType.hasOwnProperty(_key)) {
        Global.src_invite_ct_feature_session[FeatureType[_key]] = 0;
        Global.src_invite_ct_feature[FeatureType[_key]] = Global.src_invite_ct_feature[FeatureType[_key]] || 0;
      }
      Global.invite_ct = 0;
      Global.subscribe_ct = 0;
      Global.subscribe_ct_fail = 0;
      Global.subscribe_ct_success = 0;
      Global.gct = require("GCTurboAnalytics")();
      Global.gct.init();
      Global.gct.sendBaseUserProperties();
      Global.resourceManager = require("ResourceManager")();
      Global.musicManager = require("MusicManager")();
      require("PreLoadManager");
      Global.panel = require("Panel")();
      Global.boardNamePF = "globalHighscore";
      Global.watchedInterstitials = 0;
      Global.watchedRewardedVideos = 0;
      Global.preloadedRewardedVideo = null;
      Global.preloadedInterstitial = null;
      Global.SERVICE_ID = "AppID";
      Global.mmGameID = "302577837580222";
    };
    Global.getRewardVideoID = function() {
      return Global.isDebug ? "606780556936568_615125726102051" : "317876232685042_325344748604857";
    };
    Global.getInterstitialVideoID = function() {
      return Global.isDebug, "";
    };
    Global.getRewardAdsDiffTime = function() {
      return Global.isDebug ? 6e4 : 3e5;
    };
    Global.getAppName = function() {
      return Global.isDebug ? "2048-dev" : "2048";
    };
    Global.getAuthURL = function() {
      return Global.isDebug ? "https://qhxhtbbay0.execute-api.us-east-1.amazonaws.com/dev_stage/session" : "https://obvr9m58se.execute-api.us-east-1.amazonaws.com/prod_stage/session";
    };
    Global.getHost = function() {
      return Global.isDebug ? "https://messaging-service-dev.gct-internal.net" : "https://messaging-service-prod.gct-internal.net";
    };
    Global.getVersion = function() {
      return Global.isDebug ? "1.0.0" : "1.0.2";
    };
    Global.getGameId = function() {
      return Global.isDebug ? "287631" : "287632";
    };
    Global.getApiKey = function() {
      return Global.isDebug ? "31357a8c95a0f1a122004f9229a562a1" : "a6689ed184fb97c0594638b473721e1c";
    };
    Global.getPFTitleID = function() {
      return Global.isDebug ? "D2ED2" : "660F8";
    };
    Global.getNoticePath = function() {
      return Global.isDebug ? "https://Global-static-dev.s3.amazonaws.com/link/notice_kungfujump_dev.json" : "https://Global-static-dev.s3.amazonaws.com/link/notice_kungfujump_prod.json";
    };
    cc._RF.pop();
  }, {
    GCTurboAnalytics: "GCTurboAnalytics",
    LanguageData: "LanguageData",
    MusicManager: "MusicManager",
    Panel: "Panel",
    PreLoadManager: "PreLoadManager",
    ResourceManager: "ResourceManager",
    Tools: "Tools",
    emitter: "emitter"
  } ],
  GridCell: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e58aJmhN1JQYoG4y7oKtnK", "GridCell");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        numLabel: {
          default: null,
          type: cc.Label
        },
        num: {
          default: 0,
          notify: function notify() {
            this.adjustUI();
          }
        }
      },
      adjustUI: function adjustUI() {
        this.numLabel.string = this.num;
      }
    });
    cc._RF.pop();
  }, {} ],
  Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63015ztVsdNVoLv7+UmBbiE", "Item");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        _parentCtrl: null,
        _data: null
      },
      setData: function setData(_parent, _data) {
        this._parentCtrl = _parent;
        this._data = _data;
        Global.languageData.init(Global.language);
        this.label.string = Global.languageData.t("label_text." + _data.language);
      },
      onClickItemBtn: function onClickItemBtn(event) {
        this._parentCtrl.onClickItemBtn();
        if (this._data.languageSM == Global.language) return;
        Global.language = this._data.languageSM;
        cc.sys.localStorage.setItem(Global.getAppName() + "language", Global.language);
        Global.languageData.init(Global.language);
        this._parentCtrl.comboLabel.string = Global.languageData.t("label_text." + this._data.language);
        cc.audioEngine.stopAll();
        reStartGame();
      }
    });
    cc._RF.pop();
  }, {} ],
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31e138UXBhB5qwuxOaE7JZ1", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          if (!label.node.active) continue;
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          if (!sprite.node.active) continue;
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85fa0KsWHVCBofvyuY2la/x", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec55bdFcLtEn5n7fz3twVni", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e5966z/eFO2ar90G3Leqy1", "MainScene");
    "use strict";
    var gameCFG = require("GameConfig");
    var GRID_DIS = 10;
    var SHAKE = 10;
    var ACTION_TIME = .1;
    var NUMBERS = [ 2, 4 ];
    var CONST_GRIDLIST = [ [ 4, 4 ], [ 5, 5 ], [ 6, 6 ] ];
    cc.Class({
      extends: cc.Component,
      properties: {
        gridNode: {
          default: null,
          type: cc.Layout
        },
        gridCell: {
          default: null,
          type: cc.Prefab
        },
        row: {
          default: 4,
          step: 1,
          notify: function notify() {
            this.createGrid();
          }
        },
        column: {
          default: 4,
          step: 1,
          notify: function notify() {
            this.createGrid();
          }
        },
        panel: {
          default: null,
          type: cc.Node
        },
        cellPreb: {
          default: null,
          type: cc.Prefab
        },
        scoreLab: {
          default: null,
          type: cc.Label
        },
        highestLab: {
          default: null,
          type: cc.Label
        },
        score: {
          default: 0,
          type: cc.Integer,
          notify: function notify() {
            Global.player.curScore = this.score;
            this.scoreLab.string = this.score;
            if (this.score > Global.player.highestScore) {
              Global.player.highestScore = this.score;
              this.highestLab.string = this.score;
              cc.sys.localStorage.setItem(Global.getAppName() + Global.curLevel + "highestScore", Global.player.highestScore);
            }
          }
        },
        homePageNode: {
          default: null,
          type: cc.Node
        },
        soundToggle: {
          default: null,
          type: cc.Toggle
        },
        _isResult: false
      },
      onLoad: function onLoad() {
        Global.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        Global.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        Global.musicManager.playBGM(gameCFG.PERLOAD_NAME.bgMusic);
        var localStatus = cc.sys.localStorage.getItem(gameCFG.KEY.soundStatus);
        null == localStatus || void 0 == localStatus || 0 == localStatus ? this.soundToggle.uncheck() : 1 == localStatus && this.soundToggle.check();
        Global.gameCtrl = this;
        this.homePageNode.active = true;
        this.score = 0;
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
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.game.canvas.focus();
      },
      unregisterEvent: function unregisterEvent() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      playGame: function playGame() {
        this.row = CONST_GRIDLIST[Global.curLevel][0];
        this.column = CONST_GRIDLIST[Global.curLevel][1];
        var highestScore = cc.sys.localStorage.getItem(Global.getAppName() + Global.curLevel + "highestScore");
        highestScore && (Global.player.highestScore = 1 * highestScore);
        this.createGrid();
        this.homePageNode.active = false;
        this.reloadCell();
        this.highestLab.string = Global.player.highestScore;
      },
      gotoHome: function gotoHome() {
        this.homePageNode.active = true;
      },
      onTouchMove: function onTouchMove(event) {
        if (true == this.homePageNode.active) return;
        if (this.moved) return;
        var startPos = event.getStartLocation();
        var cur = event.getLocation();
        var diff = cur.subSelf(startPos);
        if (Math.abs(diff.x) > Math.abs(diff.y)) {
          if (Math.abs(diff.x) < SHAKE) return;
          this.moved = true;
          diff.x > 0 ? this.moveRight() : this.moveLeft();
        } else {
          if (Math.abs(diff.y) < SHAKE) return;
          this.moved = true;
          diff.y > 0 ? this.moveUp() : this.moveDown();
        }
      },
      onTouchEnd: function onTouchEnd(event) {
        if (true == this.homePageNode.active) return;
        this.moved = false;
      },
      onKeyDown: function onKeyDown(event) {
        if (true == this.homePageNode.active) return;
        switch (event.keyCode) {
         case cc.macro.KEY.up:
          this.moveUp();
          break;

         case cc.macro.KEY.down:
          this.moveDown();
          break;

         case cc.macro.KEY.left:
          this.moveLeft();
          break;

         case cc.macro.KEY.right:
          this.moveRight();
        }
      },
      createGrid: function createGrid() {
        this.gridNode.node.removeAllChildren();
        var gridSize = this.gridNode.node.getContentSize();
        var totalW = gridSize.width - 2 * GRID_DIS;
        var totalH = gridSize.height - 2 * GRID_DIS;
        var gridCellW = (totalW - GRID_DIS * (this.column - 1)) / this.column;
        var gridCellH = (totalH - GRID_DIS * (this.row - 1)) / this.row;
        for (var i = 0; i < this.row; i++) for (var j = 0; j < this.column; j++) {
          var gridCell = cc.instantiate(this.gridCell);
          gridCell.width = gridCellW;
          gridCell.height = gridCellH;
          gridCell.getComponent("GridCell").num = "(" + i + "," + j + ")";
          gridCell.name = "gridCell_" + i + j;
          this.gridNode.node.addChild(gridCell);
        }
        this.gridNode.updateLayout();
      },
      reloadCell: function reloadCell() {
        this.moved = false;
        this.moving = false;
        this.score = 0;
        this.panel.destroyAllChildren();
        this.boardCells = [];
        this.board = [];
        for (var row = 0; row < this.row; row++) {
          var colsData = [];
          var cols = [];
          for (var col = 0; col < this.column; col++) {
            colsData[col] = 0;
            cols[col] = null;
          }
          this.board.push(colsData);
          this.boardCells.push(cols);
        }
        this.randomCell(true);
        this.randomCell(true);
      },
      randomCell: function randomCell(_isInit) {
        void 0 === _isInit && (_isInit = false);
        var i = Math.round(Global.tools.getRandomNum(0, this.row - 1));
        var j = Math.round(Global.tools.getRandomNum(0, this.column - 1));
        cc.log("value_0:", i + "**" + j + " ** " + this.board[i][j]);
        while (0 != this.board[i][j]) {
          i = Math.round(Global.tools.getRandomNum(0, this.row - 1));
          j = Math.round(Global.tools.getRandomNum(0, this.column - 1));
        }
        cc.log("value_1:", i + "**" + j + " ** " + this.board[i][j]);
        var randomNum = _isInit ? NUMBERS[Global.tools.getRandomNum(0, NUMBERS.length - 1)] : NUMBERS[0];
        var gridSize = this.gridNode.node.getContentSize();
        var totalW = gridSize.width - 2 * GRID_DIS;
        var totalH = gridSize.height - 2 * GRID_DIS;
        var gridCellW = (totalW - GRID_DIS * (this.column - 1)) / this.column;
        var gridCellH = (totalH - GRID_DIS * (this.row - 1)) / this.row;
        this.board[i][j] = randomNum;
        var cell = cc.instantiate(this.cellPreb);
        cell.parent = this.panel;
        cell.position = this.getPanelPos(i, j);
        cell = cell.getComponent("Cell");
        cell.adjustSize(gridCellW, gridCellH);
        this.boardCells[i][j] = cell;
        cell.num = randomNum;
        cell.bg.scale = 0;
        cell.bg.runAction(cc.scaleTo(ACTION_TIME, 1));
      },
      getPanelPos: function getPanelPos(row, col) {
        var gridNode = this.gridNode.node.getChildByName("gridCell_" + row + col);
        return gridNode.getPosition();
      },
      canMoveUp: function canMoveUp() {
        for (var col = 0; col < this.column; col++) for (var row = 1; row < this.row; row++) if (0 != this.board[row][col] && (0 == this.board[row - 1][col] || this.board[row - 1][col] == this.board[row][col])) return true;
        return false;
      },
      canMoveDown: function canMoveDown() {
        for (var col = 0; col < this.column; col++) for (var row = this.row - 2; row >= 0; row--) if (0 != this.board[row][col] && (0 == this.board[row + 1][col] || this.board[row + 1][col] == this.board[row][col])) return true;
        return false;
      },
      canMoveLeft: function canMoveLeft() {
        for (var row = this.row - 1; row >= 0; row--) for (var col = 1; col < this.column; col++) if (0 != this.board[row][col] && (0 == this.board[row][col - 1] || this.board[row][col - 1] == this.board[row][col])) return true;
        return false;
      },
      canMoveRight: function canMoveRight() {
        for (var row = this.row - 1; row >= 0; row--) for (var col = this.column - 2; col >= 0; col--) if (0 != this.board[row][col] && (0 == this.board[row][col + 1] || this.board[row][col + 1] == this.board[row][col])) return true;
        return false;
      },
      moveUp: function moveUp() {
        cc.log("\u4e0a\u6ed1\u52a8");
        if (!this.canMoveUp()) return;
        if (this.moving) return;
        for (var col = 0; col < this.column; col++) {
          var tmp = 0;
          for (var row = 0; row < this.row; row++) {
            if (0 == this.board[row][col]) continue;
            for (var k = 0 + tmp; k < row; k++) if (0 == this.board[k][col] && this.noBlockVertical(col, k, row)) {
              this.board[k][col] = this.board[row][col];
              this.board[row][col] = 0;
              this.moveActionVertical(row, col, k, false);
            } else if (this.board[k][col] == this.board[row][col] && this.noBlockVertical(col, k, row)) {
              this.score += 2 * this.board[row][col];
              this.board[k][col] += this.board[row][col];
              this.board[row][col] = 0;
              tmp++;
              this.moveActionVertical(row, col, k, true);
            }
          }
        }
        this.randomCell();
      },
      moveDown: function moveDown() {
        cc.log("\u4e0b\u6ed1\u52a8");
        if (!this.canMoveDown()) return;
        if (this.moving) return;
        for (var col = 0; col < this.column; col++) {
          var tmp = 0;
          for (var row = this.row - 1; row >= 0; row--) {
            if (0 == this.board[row][col]) continue;
            for (var k = this.row - 1 - tmp; k > row; k--) if (0 == this.board[k][col] && this.noBlockVertical(col, row, k)) {
              this.board[k][col] = this.board[row][col];
              this.board[row][col] = 0;
              this.moveActionVertical(row, col, k, false);
            } else if (this.board[k][col] == this.board[row][col] && this.noBlockVertical(col, row, k)) {
              this.score += 2 * this.board[row][col];
              this.board[k][col] += this.board[row][col];
              this.board[row][col] = 0;
              tmp++;
              this.moveActionVertical(row, col, k, true);
            }
          }
        }
        this.randomCell();
      },
      moveLeft: function moveLeft() {
        cc.log("\u5de6\u6ed1\u52a8");
        if (!this.canMoveLeft()) return;
        if (this.moving) return;
        for (var row = this.row - 1; row >= 0; row--) {
          var tmp = 0;
          for (var col = 0; col < this.column; col++) {
            if (0 == this.board[row][col]) continue;
            for (var k = 0 + tmp; k < col; k++) if (0 == this.board[row][k] && this.noBlockHorizonal(row, k, col)) {
              this.board[row][k] = this.board[row][col];
              this.board[row][col] = 0;
              this.moveActionHorizonal(row, col, k, false);
            } else if (this.board[row][k] == this.board[row][col] && this.noBlockHorizonal(row, k, col)) {
              this.score += 2 * this.board[row][col];
              this.board[row][k] += this.board[row][col];
              this.board[row][col] = 0;
              tmp++;
              this.moveActionHorizonal(row, col, k, true);
            }
          }
        }
        this.randomCell();
      },
      moveRight: function moveRight() {
        cc.log("\u53f3\u6ed1\u52a8");
        if (!this.canMoveRight()) return;
        if (this.moving) return;
        for (var row = this.row - 1; row >= 0; row--) {
          var tmp = 0;
          for (var col = this.column - 1; col >= 0; col--) {
            if (0 == this.board[row][col]) continue;
            for (var k = this.column - 1 - tmp; k > col; k--) if (0 == this.board[row][k] && this.noBlockHorizonal(row, col, k)) {
              this.board[row][k] = this.board[row][col];
              this.board[row][col] = 0;
              this.moveActionHorizonal(row, col, k, false);
            } else if (this.board[row][k] == this.board[row][col] && this.noBlockHorizonal(row, col, k)) {
              this.score += 2 * this.board[row][col];
              this.board[row][k] += this.board[row][col];
              this.board[row][col] = 0;
              tmp++;
              this.moveActionHorizonal(row, col, k, true);
            }
          }
        }
        this.randomCell();
      },
      moveActionHorizonal: function moveActionHorizonal(row, col, k, hasNewValue) {
        var _this = this;
        var cell = this.boardCells[row][col];
        if (cell) {
          this.boardCells[row][col] = null;
          cell.node.stopAllActions();
          this.moving = true;
          if (hasNewValue) cell.node.runAction(cc.sequence(cc.moveTo(ACTION_TIME, this.getPanelPos(row, k)), cc.callFunc(function() {
            _this.boardCells[row][k].num = _this.board[row][k];
            _this.boardCells[row][k].bg.runAction(cc.sequence(cc.scaleTo(.4 * ACTION_TIME, 1.2), cc.delayTime(.2 * ACTION_TIME), cc.scaleTo(.3 * ACTION_TIME, 1)));
            cell.node.destroy();
            _this.moving = false;
            _this.getGameResult(_this.board[row][k]);
          }))); else {
            this.boardCells[row][k] = cell;
            cell.node.runAction(cc.sequence(cc.moveTo(ACTION_TIME, this.getPanelPos(row, k)), cc.callFunc(function() {
              _this.moving = false;
              _this.getGameResult(_this.board[row][k]);
            })));
          }
        }
      },
      moveActionVertical: function moveActionVertical(row, col, k, hasNewValue) {
        var _this2 = this;
        var cell = this.boardCells[row][col];
        if (cell) {
          this.boardCells[row][col] = null;
          cell.node.stopAllActions();
          this.moving = true;
          if (hasNewValue) cell.node.runAction(cc.sequence(cc.moveTo(ACTION_TIME, this.getPanelPos(k, col)), cc.callFunc(function() {
            _this2.boardCells[k][col].num = _this2.board[k][col];
            _this2.boardCells[k][col].bg.runAction(cc.sequence(cc.scaleTo(.4 * ACTION_TIME, 1.2), cc.delayTime(.2 * ACTION_TIME), cc.scaleTo(.3 * ACTION_TIME, 1)));
            cell.node.destroy();
            _this2.moving = false;
            _this2.getGameResult(_this2.board[k][col]);
          }))); else {
            this.boardCells[k][col] = cell;
            cell.node.runAction(cc.sequence(cc.moveTo(ACTION_TIME, this.getPanelPos(k, col)), cc.callFunc(function() {
              _this2.moving = false;
              _this2.getGameResult(_this2.board[k][col]);
            })));
          }
        }
      },
      noBlockHorizonal: function noBlockHorizonal(row, col1, col2) {
        for (var i = col1 + 1; i < col2; i++) if (0 != this.board[row][i]) return false;
        return true;
      },
      noBlockVertical: function noBlockVertical(col, row1, row2) {
        for (var i = row1 + 1; i < row2; i++) if (0 != this.board[i][col]) return false;
        return true;
      },
      showGameResult: function showGameResult(_isSuc) {
        void 0 === _isSuc && (_isSuc = false);
        console.log("showGameResult");
        if (this._isResult) return;
        this._isResult = true;
        Global.panel.openLoading();
        Global.panel.closeChildPanel(323);
        Global.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.result, null, 323).then(function(panel) {
          Global.panel.closeLoading();
          var ctrl = panel.getComponent(panel.name);
          ctrl && ctrl.setData(_isSuc);
        }, function(error) {
          Global.panel.closeLoading();
        });
      },
      getGameResult: function getGameResult(lastValue) {
        if (2048 == lastValue) {
          this.showGameResult(true);
          return;
        }
        this.getIsGameOver();
      },
      getIsGameOver: function getIsGameOver() {
        this.canMoveUp() || this.canMoveDown() || this.canMoveLeft() || this.canMoveRight() || this.showGameResult(false);
      },
      onClickSettingBtn: function onClickSettingBtn() {
        Global.musicManager.playClickEffect();
        Global.panel.openLoading();
        Global.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.setting).then(function(panel) {
          Global.panel.closeLoading();
        }, function(error) {
          Global.panel.closeLoading();
        });
      },
      onClickSoundToggle: function onClickSoundToggle(evn) {
        Global.musicManager.playClickEffect();
        var status = true == evn.isChecked ? 1 : 0;
        cc.sys.localStorage.setItem(gameCFG.KEY.soundStatus, status);
        if (1 == status) {
          Global.musicManager.pauseBGMusic();
          Global.musicManager.stopAllEffects();
        } else Global.musicManager.resumeMusic();
      },
      onClickHelpBtn: function onClickHelpBtn() {
        Global.musicManager.playClickEffect();
        Global.panel.openLoading();
        Global.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.help).then(function(panel) {
          Global.panel.closeLoading();
        }, function(error) {
          Global.panel.closeLoading();
        });
      },
      onClickPlayBtn: function onClickPlayBtn() {
        Global.musicManager.playClickEffect();
        this._isResult = false;
        this.playGame();
      },
      onDestroy: function onDestroy() {
        Global.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        Global.emitter.off(gameCFG.clientEvent.EnterForeground, this);
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
    var gameCFG = require("GameConfig");
    var MusicManager = function MusicManager() {
      this.resetData();
    }, musicMG = MusicManager.prototype, g_instance = null;
    musicMG.resetData = function() {};
    musicMG.playEffect = function(_clip, _callBack, _isOnly, _isbgMusic) {
      void 0 === _isOnly && (_isOnly = false);
      void 0 === _isbgMusic && (_isbgMusic = false);
      var localStatus = cc.sys.localStorage.getItem(gameCFG.KEY.soundStatus);
      if (1 == localStatus && false == _isbgMusic) return;
      true == _isOnly && cc.audioEngine.stopAllEffects();
      var clipCache = Global.resourceManager.getRes(_clip);
      if (clipCache && cc.isValid(clipCache)) {
        var audioID = _isbgMusic ? cc.audioEngine.playMusic(clipCache, true) : cc.audioEngine.play(clipCache, false, 1);
        1 == localStatus && true == _isbgMusic && cc.audioEngine.pauseMusic();
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
      } else cc.loader.loadRes(_clip, cc.AudioClip, function(err, res) {
        if (err) {
          console.error(err);
          return;
        }
        var audioID = _isbgMusic ? cc.audioEngine.playMusic(res, true) : cc.audioEngine.play(res, false, 1);
        1 == localStatus && true == _isbgMusic && cc.audioEngine.pauseMusic();
        cc.audioEngine.setFinishCallback(audioID, function() {
          _callBack && _callBack();
        });
        Global.resourceManager.setRes(_clip, res);
      });
    };
    musicMG.playBGM = function(_clip) {
      console.log("playBGMplayBGMplayBGM");
      this.playEffect(_clip, null, false, true);
    };
    musicMG.playClickEffect = function(_callBack) {
      this.playEffect("audio/click", _callBack);
    };
    musicMG.playCloseEffect = function(_callBack) {
      this.playEffect("audio/close", _callBack);
    };
    musicMG.pauseBGMusic = function() {
      cc.audioEngine.pauseMusic();
    };
    musicMG.resumeMusic = function() {
      cc.audioEngine.resumeMusic();
    };
    musicMG.stopAllEffects = function() {
      cc.audioEngine.stopAllEffects();
    };
    module.exports = function() {
      g_instance || (g_instance = new MusicManager());
      return g_instance;
    };
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
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
        var cache = Global.resourceManager.getRes(_panelName);
        cache ? resolve(_this.showChildPanel(cache, parent, tag)) : cc.loader.loadRes(_panelName, cc.Prefab, function(err, prefab) {
          if (err) reject(err); else {
            Global.resourceManager.setRes(prefab);
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
        childTag === fromTag && child.destroy();
      }
    };
    panel.showPrompt = function(content) {
      Global.musicManager.playEffect(gameCFG.PERLOAD_NAME.msg);
      this.showAsynPanelByName(gameCFG.PERLOAD_NAME.promptUI).then(function(panel) {
        panel.getComponent(panel.name).showDes(content);
      });
    };
    panel.openLoading = function(_callback, _delayTime) {
      void 0 === _delayTime && (_delayTime = 2e4);
      this.showAsynPanelByName(gameCFG.PERLOAD_NAME.loading, null, gameCFG.LAYER_ORDER.mask).then(function(panel) {
        panel.getComponent(panel.name).startCountDown(_callback, _delayTime);
      });
    };
    panel.closeLoading = function() {
      this.closeChildPanel(gameCFG.LAYER_ORDER.mask);
    };
    module.exports = function() {
      g_instance || (g_instance = new Panel());
      return g_instance;
    };
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  PreLoadManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31942JE5IZM5ISfE8tlXIGH", "PreLoadManager");
    "use strict";
    var gameCFG = require("GameConfig");
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
        this._loadList = [ {
          url: gameCFG.PERLOAD_NAME.bgMusic,
          type: "localAudioClip",
          format: "mp3"
        }, {
          url: gameCFG.PERLOAD_NAME.success,
          type: "localAudioClip",
          format: "mp3"
        }, {
          url: gameCFG.PERLOAD_NAME.click,
          type: "localAudioClip",
          format: "mp3"
        }, {
          url: gameCFG.PERLOAD_NAME.close,
          type: "localAudioClip",
          format: "mp3"
        }, {
          url: gameCFG.PERLOAD_NAME.msg,
          type: "localAudioClip",
          format: "mp3"
        }, {
          url: gameCFG.PERLOAD_NAME.promptUI,
          type: "prefab"
        }, {
          url: gameCFG.PERLOAD_NAME.loading,
          type: "prefab"
        }, {
          url: gameCFG.PERLOAD_NAME.result,
          type: "prefab"
        }, {
          url: gameCFG.PERLOAD_NAME.help,
          type: "prefab"
        } ];
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
        _error ? console.error(_error) : this.parseResource(_res);
        this.loadRes();
      },
      parseResource: function parseResource(_res) {
        Global.resourceManager.setRes(this._curResUrl, _res);
      },
      preloadDone: function preloadDone() {},
      updateProgress: function updateProgress(_loadedCount, _loadCount) {}
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
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
      var cache = this.getRes(_url);
      if (null != cache) {
        console.log("\u5df2\u7ecf\u5b58\u5728\uff1a" + _url);
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
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ecbd3Ze139EO6Y/mdovRqSS", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  Tools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0725gdMZNKXrVND8Mafz7Y", "Tools");
    "use strict";
    var Tools = function Tools() {
      this.resetData();
    }, tools = Tools.prototype, g_instance = null;
    tools.resetData = function() {};
    tools.setSpriteImg = function(_sprite, _path) {
      if (null == _sprite) return;
      Global.resourceManager.loadRes(_path, function(_res) {
        _sprite.spriteFrame = new cc.SpriteFrame(_res);
      });
    };
    tools.getRandomNum = function(_min, _max) {
      return parseInt(Math.random() * (_max - _min + 1) + _min);
    };
    tools.getRandomArray = function(_count) {
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
    tools.fitFunc = function(cvs) {
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
    tools.numberFormat = function(value) {
      var param = {};
      var k = 1e3, sizes = [ "", "K", "M", "B", "t", "q", "Q", "s", "g", "G", "r" ], i;
      if (value < k) {
        param.value = value;
        param.unit = "";
      } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = (value / Math.pow(k, i)).toFixed(2);
        param.unit = sizes[i];
      }
      return param;
    };
    tools.getNumStr = function(num) {
      var numValue = this.numberFormat(num);
      var numStr = "" + numValue.value;
      var dotIndex = numStr.indexOf(".");
      if (dotIndex >= 0 && 3 !== dotIndex) {
        numStr = numStr.substring(0, 4);
        while (numStr.length > 0) {
          var _char = numStr[numStr.length - 1];
          if ("0" != _char && "." != _char) break;
          numStr = numStr.substring(0, numStr.length - 1);
          if ("." === _char) break;
        }
      } else numStr = numStr.substring(0, 3);
      return numStr + numValue.unit;
    };
    tools.getBase64Image = function(path) {
      return new Promise(function(resolve, reject) {
        cc.loader.loadRes(path, function(err, image) {
          if (err) reject(err); else {
            var canvas = document.createElement("CANVAS");
            var ctx = canvas.getContext("2d");
            var img = image.getHtmlElementObj();
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataURl = canvas.toDataURL("image/png");
            canvas = null;
            resolve(dataURl);
          }
        });
      });
    };
    tools.myBrowser = function() {
      var name = "other";
      if (window.navigator && window.navigator.hasOwnProperty("userAgent")) {
        var userAgent = window.navigator.userAgent;
        userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1 ? name = "Opera" : userAgent.indexOf("Firefox") > -1 ? name = "Firefox" : userAgent.indexOf("Chrome") > -1 ? name = "Chrome" : userAgent.indexOf("Safari") > -1 && (name = "Safari");
      }
      return name;
    };
    tools.timeFormat = function(timeStamp) {
      var time = new Date(parseInt(timeStamp));
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = time.getDate();
      d = d < 10 ? "0" + d : d;
      return y + m + d;
    };
    tools.deepClone = function(obj) {
      var isClass = function isClass(o) {
        if (null === o) return "Null";
        if (void 0 === o) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
      };
      var result;
      var oClass = isClass(obj);
      if ("Object" === oClass) result = {}; else {
        if ("Array" !== oClass) return obj;
        result = [];
      }
      for (var key in obj) {
        var copy = obj[key];
        "Object" == isClass(copy) ? result[key] = arguments.callee(copy) : "Array" == isClass(copy) ? result[key] = arguments.callee(copy) : result[key] = obj[key];
      }
      return result;
    };
    module.exports = function() {
      g_instance || (g_instance = new Tools());
      return g_instance;
    };
    cc._RF.pop();
  }, {} ],
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
          callbacks[i].func && callbacks[i].func.apply(obj, args);
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
  help: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42a407m099CyKb+C6/ZudIw", "help");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playLab: {
          default: null,
          type: cc.RichText
        }
      },
      onLoad: function onLoad() {
        "en" == Global.language ? this.playLab.string = '<color=#00ff00>"2048" is a number puzzle game where numbers are piled up and enlarged.\n</c><color=#0fffff>\u2460 Select your favorite mode from 3 modes: 4 squares, 6 squares, and 8 squares.\n\u2461 Move all the number cells up, down, left and right.\n\u2462 When two squares with the same number overlap, it will change to one larger square.\n\u2463 The game is over when all the squares cannot move.\n</c>' : this.playLab.string = "<color=#00ff00>\u300c2048\u300d\u306f\u3001\u6570\u5b57\u3092\u91cd\u306d\u3066\u5927\u304d\u304f\u3059\u308b\u6570\u5b57\u30d1\u30ba\u30eb\u30b2\u30fc\u30e0\u3067\u3059\u3002\n</c><color=#0fffff>\u2460 4\u30de\u30b9\u30016\u30de\u30b9\u30018\u30de\u30b9\u306e3\u3064\u306e\u30e2\u30fc\u30c9\u304b\u3089\u597d\u304d\u306a\u30e2\u30fc\u30c9\u3092\u9078\u629e\u3057\u307e\u3059\u3002\n\u2461 \u4e0a\u4e0b\u5de6\u53f3\u306b\u3059\u3079\u3066\u306e\u6570\u5b57\u30de\u30b9\u3092\u52d5\u304b\u3057\u307e\u3059\u3002\n\u2462 \u540c\u3058\u6570\u5b57\u306e\u30de\u30b9\u304c\uff12\u3064\u91cd\u306a\u308b\u3068\u3001\u3088\u308a\u5927\u304d\u306a\uff11\u3064\u306e\u6570\u5b57\u306e\u30de\u30b9\u306b\u5909\u308f\u308a\u307e\u3059\u3002\n\u2463 \u5168\u3066\u306e\u30de\u30b9\u304c\u79fb\u52d5\u3067\u304d\u306a\u304f\u306a\u308b\u3068\u30b2\u30fc\u30e0\u30aa\u30fc\u30d0\u30fc\u3067\u3059\u3002\n</c>";
      },
      onClickCloseBtn: function onClickCloseBtn(evn, type) {
        Global.musicManager.playCloseEffect();
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
  }, {} ],
  loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34e7aFW/uVFVIfXycZW6RWT", "loading");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        cycleIcon: {
          default: null,
          type: cc.Node
        },
        heartIcon: {
          default: null,
          type: cc.Node
        },
        _timeout: null
      },
      onLoad: function onLoad() {
        if (this.cycleIcon) {
          var self = this;
          this.cycleIcon.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function() {
            self.cycleIcon.angle -= 20;
          }), cc.delayTime(.05))));
        }
        this.heartIcon && this.heartIcon.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3, 0, 1), cc.delayTime(.2), cc.scaleTo(.3, 1, 1), cc.delayTime(.2))));
      },
      startCountDown: function startCountDown(_callback, _delayTime) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function() {
          _callback && _callback();
          Global.panel.closeLoading();
        }, _delayTime);
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      }
    });
    cc._RF.pop();
  }, {} ],
  openAnimation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65bb247RRlErZfb4piDG0lH", "openAnimation");
    "use strict";
    var ANIMTYPE = cc.Enum({
      SCALE: 0,
      DOWN: 1,
      LEFT: 2,
      UP: 3,
      RIGHT: 4
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        playOnLoad: true,
        animType: {
          default: ANIMTYPE.SCALE,
          type: ANIMTYPE,
          displayName: "\u5f39\u7a97\u52a8\u753b\u7c7b\u578b"
        },
        endPos: {
          default: new cc.Vec2(0, 0)
        },
        runTime: {
          default: .8,
          step: .1
        },
        _originalPos: null
      },
      onEnable: function onEnable() {
        if (false == this.playOnLoad) return;
        this.playAnimation(true, true);
      },
      playAnimation: function playAnimation(_isShow, _isAnim) {
        void 0 === _isShow && (_isShow = true);
        void 0 === _isAnim && (_isAnim = true);
        switch (this.animType) {
         case ANIMTYPE.SCALE:
          this.scale_Function(_isShow, _isAnim);
          break;

         case ANIMTYPE.DOWN:
         case ANIMTYPE.LEFT:
         case ANIMTYPE.UP:
         case ANIMTYPE.RIGHT:
          this.move_Function(_isShow, _isAnim);
          break;

         default:
          console.error("\u52a8\u753b\u7c7b\u578b\u4e0d\u5b58\u5728 ! ");
        }
      },
      scale_Function: function scale_Function(_isShow, _isAnim) {
        var actTime = .2;
        var scaleTo = cc.scaleTo(actTime, 1);
        scaleTo.easing(cc.easeBackOut(actTime));
        var actionList = [ scaleTo, cc.fadeIn(actTime) ];
        this.node.stopAllActions();
        this.node.setScale(.7);
        this.node.opacity = 0;
        var action = cc.spawn(actionList);
        this.node.runAction(action);
      },
      move_Function: function move_Function(_isShow, _isAnim) {
        var endPos = null;
        cc.winSize;
        switch (this.animType) {
         case ANIMTYPE.SCALE:
         case ANIMTYPE.DOWN:
          break;

         case ANIMTYPE.LEFT:
          endPos = _isShow ? new cc.Vec2(this.endPos.x, this.node.y) : new cc.Vec2(-2 * cc.winSize.width, this.node.y);
          break;

         case ANIMTYPE.UP:
          break;

         case ANIMTYPE.RIGHT:
          endPos = _isShow ? new cc.Vec2(this.endPos.x, this.node.y) : new cc.Vec2(2 * cc.winSize.width, this.node.y);
          break;

         default:
          console.error("\u52a8\u753b\u7c7b\u578b\u4e0d\u5b58\u5728 ! ");
        }
        if (null == endPos) {
          this.node.setPosition(this.endPos);
          return;
        }
        _isAnim ? this.node.runAction(cc.moveTo(this.runTime, endPos).easing(cc.easeBackInOut())) : this.node.setPosition(endPos);
      }
    });
    cc._RF.pop();
  }, {} ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c57bENkHNHF5R1+cLnLXbj", "polyglot.min");
    "use strict";
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == typeof exports ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == typeof n ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
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
  result: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c4dfRtQypNFpkmKr4xbWmC", "result");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        gameOver: {
          default: null,
          type: cc.Node
        },
        sucIcon: {
          default: null,
          type: cc.Node
        },
        scoreLab: {
          default: null,
          type: cc.Label
        },
        highestLab: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        Global.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        Global.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        try {
          adBreak({
            type: "next",
            name: "popup_start"
          });
        } catch (e) {
          console.error(e);
        }
        this.updateHighestScore();
        Global.watchedRewardedVideos >= 1 ? ++Global.gameContinued : Global.watchedRewardedVideos < 1 && ++Global.gameNonContinued;
        Global.gct.setUserProperties({
          gameCompleted: ++Global.gameCompleted,
          gameContinued: Global.gameContinued,
          gameNonContinued: Global.gameNonContinued
        });
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
      registerEvent: function registerEvent() {},
      unregisterEvent: function unregisterEvent() {},
      playGame: function playGame() {
        this.node.destroy();
      },
      setData: function setData(_isSuc) {
        _isSuc && Global.musicManager.playEffect(gameCFG.PERLOAD_NAME.success);
        this.gameOver.active = !_isSuc;
        this.sucIcon.active = _isSuc;
      },
      updateHighestScore: function updateHighestScore() {
        if (Global.player.curScore > Global.player.highestScore) {
          Global.player.highestScore = Global.player.curScore;
          Global.pf.UpdatePlayerStatistics(Global.player.curScore, function() {});
        }
        this.highestLab.string = Global.player.highestScore;
        this.scoreLab.string = Global.player.curScore;
      },
      onClickHomeBtn: function onClickHomeBtn(evn, type) {
        var _this = this;
        Global.musicManager.playClickEffect();
        this.callAD("next", "game_restart", function() {
          Global.gameCtrl.gotoHome();
          _this.node.destroy();
        });
      },
      onClickRePlayBtn: function onClickRePlayBtn(evn, type, _callback) {
        var _this2 = this;
        Global.musicManager.playClickEffect();
        this.callAD("next", "game_restart", function() {
          Global.gameCtrl.onClickPlayBtn();
          _this2.node.destroy();
        });
      },
      callAD: function callAD(_type, _name, _callback) {
        var _this3 = this;
        this.unscheduleAllCallbacks();
        this.scheduleOnce(_callback.bind(this), 1);
        try {
          adBreak({
            type: _type,
            name: _name,
            beforeBreak: function() {
              _this3.unscheduleAllCallbacks();
            }.bind(this),
            afterBreak: function() {
              _callback();
            }.bind(this)
          });
        } catch (e) {
          console.error(e);
          this.unscheduleAllCallbacks();
          _callback();
        }
      },
      continue: function _continue(data) {
        Global.gameCtrl.onClickPlayBtn();
        this.node.destroy();
      },
      onClickSettingBtn: function onClickSettingBtn() {
        Global.musicManager.playClickEffect();
        Global.panel.openLoading();
        Global.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.setting).then(function(panel) {
          Global.panel.closeLoading();
        }, function(error) {
          Global.panel.closeLoading();
        });
      },
      set: function set(key, value) {
        this[key] = value;
      },
      get: function get(key) {
        return this[key];
      },
      onDestroy: function onDestroy() {
        Global.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        Global.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2bb4xbf3hGPppPAwkC9FPb", "select");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        lvlIcon: {
          default: null,
          type: cc.Sprite
        },
        lvlSF: {
          default: [],
          type: cc.SpriteFrame
        },
        leftBtn: {
          default: null,
          type: cc.Node
        },
        rightBtn: {
          default: null,
          type: cc.Node
        },
        isCycle: false
      },
      onLoad: function onLoad() {
        this.onClickArrow(null, 0);
      },
      onClickArrow: function onClickArrow(event, type) {
        Global.curLevel += parseInt(type);
        this.isCycle ? Global.curLevel = Global.curLevel < 0 ? this.lvlSF.length - 1 : Global.curLevel > this.lvlSF.length - 1 ? 0 : Global.curLevel : Global.curLevel = Global.curLevel < 0 ? 0 : Global.curLevel > this.lvlSF.length - 1 ? this.lvlSF.length - 1 : Global.curLevel;
        this.leftBtn.active = this.isCycle || Global.curLevel > 0;
        this.rightBtn.active = this.isCycle || Global.curLevel < this.lvlSF.length - 1;
        this.lvlIcon.spriteFrame = this.lvlSF[Global.curLevel];
        cc.sys.localStorage.setItem(Global.getAppName() + "curLevel", Global.curLevel);
      }
    });
    cc._RF.pop();
  }, {} ],
  "use_v2.1-2.2.1_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfc6fJV+wBLq4lZWWHUh1dk", "use_v2.1-2.2.1_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_v2.1-2.2.1_cc.Toggle_event", "GameConfig", "GCTurboAnalytics", "Global", "MusicManager", "Panel", "PreLoadManager", "ResourceManager", "Tools", "emitter", "openAnimation", "Cell", "ComboBox", "GridCell", "Item", "MainScene", "help", "loading", "promptUI", "result", "select", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min" ]);