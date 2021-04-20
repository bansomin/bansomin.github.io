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
  Ball: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b280YbFuZJv4QPGPL8e8iv", "Ball");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        rigidbody: cc.RigidBody
      },
      init: function init(gameCtl) {
        this._isReady = true;
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(0, 50);
        this.rigidbody.linearVelocity = cc.v2(0, 0);
      },
      onLoad: function onLoad() {
        this.node.parent.on("touchmove", this.onTouchMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.back:
          cc.director.end();
          break;

         default:
          if (this._isReady) {
            this._isReady = false;
            this.rigidbody.linearVelocity = cc.v2(0, 1).mul(400);
          }
        }
      },
      onBeginContact: function onBeginContact(contact, self, other) {
        if (!this.gameCtl) return;
        console.log("onBeginContact:" + other.tag);
        switch (other.tag) {
         case 1:
          this.gameCtl.onBallContactBrick(self.node, other.node);
          break;

         case 2:
          this.gameCtl.onBallContactGround(self.node, other.node);
          break;

         case 3:
          var paddlePos = this.node.parent.convertToWorldSpaceAR(other.node.position);
          var ballPos = contact.getWorldManifold().points[0];
          paddlePos.y -= 40;
          this._ballDirectionn = ballPos.sub(paddlePos).normalize();
          this.gameCtl.onBallContactPaddle(self.node, other.node);
          break;

         case 4:
          this.gameCtl.onBallContactWall(self.node, other.node);
        }
      },
      onEndContact: function onEndContact(contact, self, other) {
        if (!this.gameCtl) return;
        console.log("onEndContact:" + other.tag);
        switch (other.tag) {
         case 3:
          this.rigidbody.linearVelocity = this._ballDirectionn.mul(400);
          break;

         case 4:
          var direction = this.rigidbody.linearVelocity.normalize();
          if (Math.abs(direction.y) < .15) {
            var newDirection = cc.v2(this.rigidbody.linearVelocity.x, 100 * (direction.y >= 0 ? 1 : -1));
            this.rigidbody.linearVelocity = newDirection;
          }
        }
      },
      onTouchMove: function onTouchMove() {
        if (this._isReady) {
          this._isReady = false;
          this.rigidbody.linearVelocity = cc.v2(0, 1).mul(400);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  BrickLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62398FSMJtHJ55jmSoqf4WF", "BrickLayout");
    "use strict";
    var BrickView = require("./BrickView");
    cc.Class({
      extends: cc.Component,
      properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        bricksNumber: 50
      },
      init: function init(levelModel) {
        this.node.removeAllChildren();
        this.bricksNumber = levelModel.column * levelModel.row;
        this.brickMap = levelModel.brickMap;
        this.cols = levelModel.column;
        var rowIndex = 0;
        for (var i = 0; i < this.bricksNumber; i++) {
          var rowData = this.brickMap[rowIndex];
          var columnIndex = i % this.cols;
          var columnData = rowData[columnIndex];
          var brickNode = cc.instantiate(this.brickPrefab);
          brickNode.getComponent(BrickView).setBrickType(columnData);
          brickNode.parent = this.node;
          brickNode.x = this.padding + i % this.cols * (brickNode.width + this.spacing) + brickNode.width / 2;
          brickNode.y = -this.padding - Math.floor(i / this.cols) * (brickNode.height + this.spacing) - brickNode.height / 2;
          columnIndex >= levelModel.column - 1 && (rowIndex += 1);
        }
      }
    });
    cc._RF.pop();
  }, {
    "./BrickView": "BrickView"
  } ],
  BrickModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d87e3ZgIhAN5ntEWz/8tei", "BrickModel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  BrickView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "446b9MwGVhLTYvIS/KH+BcI", "BrickView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        brickNode: cc.Node,
        brickSprite: cc.Sprite,
        brickTextures: [ cc.SpriteFrame ],
        brickType0Textures: [ cc.SpriteFrame ],
        brickType1Textures: [ cc.SpriteFrame ],
        brickType2Textures: [ cc.SpriteFrame ],
        brickType3Textures: [ cc.SpriteFrame ],
        collider: cc.PhysicsBoxCollider,
        hp: 0,
        score: 0
      },
      setBrickType: function setBrickType(type) {
        this._type = type;
        if (0 === type) {
          this.brickSprite.spriteFrame = null;
          this.collider.node.active = false;
        } else {
          this.brickSprite.spriteFrame = this.brickTextures[type];
          this.collider.node.active = true;
          this.hp = type;
          this.score = 2 * type + 10;
        }
      },
      hitBall: function hitBall() {
        this.hp -= 1;
        if (this.hp > 0) {
          var texture;
          switch (this._type) {
           case 0:
            texture = this.brickType0Textures;
            break;

           case 1:
            texture = this.brickType1Textures;
            break;

           case 2:
            texture = this.brickType2Textures;
            break;

           case 3:
            texture = this.brickType3Textures;
            break;

           default:
            texture = this.brickType0Textures;
          }
          var textureIndex = this.hp > this._type / 2 ? 1 : 0;
          this.brickSprite.spriteFrame = texture[textureIndex];
          this.animateHitBrick();
        } else this.animateBreakBrick();
      },
      animateBreakBrick: function animateBreakBrick() {
        var _this = this;
        this.collider.enabled = false;
        cc.tween(this.brickNode).to(.15, {
          opacity: {
            value: 0,
            easing: "sineIn"
          }
        }).start();
        cc.tween(this.brickNode).to(.15, {
          scale: {
            value: 2,
            easing: "sineIn"
          }
        }).call(function() {
          return _this.node.removeFromParent();
        }).start();
      },
      animateHitBrick: function animateHitBrick() {
        cc.tween(this.brickNode).to(.1, {
          position: {
            value: cc.v2(this.brickNode.position.x - 2, this.brickNode.position.y),
            easing: "quartInOut"
          }
        }).to(.1, {
          position: {
            value: cc.v2(this.brickNode.position.x + 4, this.brickNode.position.y),
            easing: "quartInOut"
          }
        }).to(.12, {
          position: {
            value: cc.v2(this.brickNode.position.x - 1, this.brickNode.position.y),
            easing: "quartInOut"
          }
        }).to(.12, {
          position: {
            value: cc.v2(this.brickNode.position.x + 2, this.brickNode.position.y),
            easing: "quartInOut"
          }
        }).to(.13, {
          position: {
            value: cc.v2(this.brickNode.position.x, this.brickNode.position.y),
            easing: "quartInOut"
          }
        }).start();
      }
    });
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    var VERSION = require("./package.json").version;
    var DEFAULT_LANGUAGE = "en";
    var FALLBACK_LANGUAGE = "jp";
    var LANGUAGES = {
      jp: {
        play: "\u30b9\u30bf\u30fc\u30c8"
      },
      en: {
        play: "Play Now!"
      }
    };
    var AD_BREAK_TIMEOUT = 500;
    function H5ad() {
      console.log("H5ad v" + VERSION);
      this._isInitialised = false;
      this._splashAdShown = false;
    }
    H5ad.prototype.initialize = function(options) {
      if (this._isInitialised) {
        console.warn("h5ad: already initialized");
        return;
      }
      this._isInitialised = true;
      options && void 0 !== options.adBreakTimeout && (AD_BREAK_TIMEOUT = options.adBreakTimeout);
      if (!window.adsbygoogle) {
        var script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.setAttribute("data-ad-client", "ca-pub-123456789");
        script.setAttribute("data-adbreak-test", "on");
        script.async = true;
        document.head.appendChild(script);
        window.adsbygoogle = window.adsbygoogle || [];
        adBreak = window.adBreak = function(o) {
          console.log("adBreak:", o);
          window.adsbygoogle.push(o);
        };
        adConfig = window.adConfig = function(o) {
          console.log("adConfig:", o);
          window.adsbygoogle.push(o);
        };
      }
      adConfig({
        preloadAdBreaks: "on",
        sound: "on"
      });
    };
    H5ad.prototype.onStart = function(options) {
      options = options || {};
      this._isInitialised || this.initialize({
        adBreakTimeout: options.adBreakTimeout
      });
      if (this._splashAdShown) {
        console.warn("h5ad: onStart has already been called");
        return;
      }
      this._splashAdShown = true;
      var css = "";
      css += ".splahContainer {";
      css += "    background-color: black;";
      css += "    position: absolute;";
      css += "    width: 100%;";
      css += "    height: 100%;";
      css += "    text-align: left;";
      css += "}";
      css += ".splahContainer .gameIcon {";
      css += "    position: relative;";
      css += "    width: 100px;";
      css += "    height: 100px;";
      css += "    background-size: 100%;";
      css += "    transform: translate(-50%, -100%);";
      css += "    left: 50%;";
      css += "    top: 31%;";
      css += "    border-radius: 10px;";
      css += "    border: 2px white solid;";
      css += "    border-radius: min(2vh,2vw);";
      css += "    border: min(0.7vw, 0.7vh) white solid;";
      css += "    width: min(30vw, 20vh);";
      css += "    height: min(30vw, 20vh);";
      css += "}";
      css += ".splahContainer .startButton {";
      css += "    background-color: rgb(255, 193, 7);";
      css += "    padding: 20px 30px;";
      css += "    border-radius: 13px;";
      css += "    transform: translate(-50%, 100%);";
      css += "    left: 50%;";
      css += "    top: 40%;";
      css += "    border: 5px solid white;";
      css += "    position: relative;";
      css += "    cursor: pointer;";
      css += "    font-size: 26px;";
      css += "    font-family: arial, verdana;";
      css += "    color: white;";
      css += "    text-align: center;";
      css += "    transition: all 0.1s;";
      css += "    width: min(50vw,27vh);";
      css += "    padding: min(3vw,3vh);";
      css += "    font-size: min(4vh,9vw);";
      css += "    border-radius: min(2vh,2vw);";
      css += "    border: min(1vw, 1vh) white solid;";
      css += "}";
      css += ".splahContainer .startButton:hover {";
      css += "    transform: translate(-50%, 100%) scale(1.1);";
      css += "    background-color: rgb(255 217 104);";
      css += "}";
      var style = document.createElement("style");
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
      var container = document.createElement("div");
      options.color && (container.style.backgroundColor = options.color);
      container.className = "splahContainer";
      var startButton = document.createElement("div");
      startButton.textContent = LANGUAGES[getLanguage()].play;
      startButton.className = "startButton";
      container.appendChild(startButton);
      var gameIcon = document.createElement("div");
      gameIcon.className = "gameIcon";
      options.icon && (gameIcon.style.backgroundImage = "url(" + options.icon + ")");
      container.appendChild(gameIcon);
      document.body.appendChild(container);
      startButton.onclick = function() {
        afterBreakCallbackCalled = false;
        var noBreakTimeout = setTimeout(function() {
          if (afterBreakCallbackCalled) return;
          afterBreakCallbackCalled = true;
          options.afterBreak && options.afterBreak();
        }, AD_BREAK_TIMEOUT);
        try {
          adBreak(removeUndefined({
            type: "start",
            name: options.name || "splash_screen",
            beforeAd: function() {
              clearTimeout(noBreakTimeout);
            },
            afterAd: function() {
              if (afterBreakCallbackCalled) return;
              afterBreakCallbackCalled = true;
              options.afterBreak && options.afterBreak();
            }
          }));
        } catch (e) {
          onAdbreakError(e, options);
        }
        setTimeout(function() {
          document.body.removeChild(container);
        }, 200);
      };
    };
    H5ad.prototype.onNext = function(options) {
      options = options || {};
      options.type = "next";
      this.adBreak(options);
    };
    H5ad.prototype.onBrowse = function(options) {
      options = options || {};
      options.type = "browse";
      this.adBreak(options);
    };
    H5ad.prototype.onPause = function(options) {
      options = options || {};
      options.type = "pause";
      this.adBreak(options);
    };
    H5ad.prototype.onReward = function(options) {
      options = options || {};
      options.type = "reward";
      this.adBreak(options);
    };
    H5ad.prototype.adBreak = function(options) {
      options = options || {};
      var type = options.type;
      if (-1 === [ "next", "browse", "pause", "reward" ].indexOf(type)) return console.error("H5ad: unknown type", type);
      var noBreakTimeout;
      noBreakTimeout = setTimeout(function() {
        options.noBreak && options.noBreak();
      }, AD_BREAK_TIMEOUT);
      try {
        adBreak(removeUndefined({
          type: type,
          name: options.name || type,
          beforeAd: function() {
            noBreakTimeout && clearTimeout(noBreakTimeout);
            options.beforeBreak && options.beforeBreak();
          },
          afterAd: options.afterBreak,
          beforeReward: options.beforeReward,
          adDismissed: "reward" === type ? options.adDismissed || function() {} : void 0,
          adViewed: options.adViewed
        }));
      } catch (e) {
        onAdbreakError(e, options);
      }
    };
    H5ad.prototype.onMute = function(options) {
      adConfig({
        sound: "off"
      });
    };
    H5ad.prototype.onUnmute = function(options) {
      adConfig({
        sound: "on"
      });
    };
    function removeUndefined(options) {
      options = options || {};
      for (var k in options) void 0 === options[k] && delete options[k];
      return options;
    }
    function onAdbreakError(e, options) {
      console.error(e);
      options = options || {};
      if (options.noBreak) options.noBreak(); else {
        options.beforeBreak && options.beforeBreak();
        options.afterBreak && options.afterBreak();
      }
    }
    function getLanguage() {
      if (!navigator.language) return FALLBACK_LANGUAGE;
      var language = navigator.language.toLowerCase().substr(0, 2);
      if (LANGUAGES[language]) return language;
      return DEFAULT_LANGUAGE;
    }
    module.exports = new H5ad();
  }, {
    "./package.json": 2
  } ],
  2: [ function(require, module, exports) {
    module.exports = {
      _from: "git+https://github.com/gc-turbo/h5ad.git",
      _id: "h5ad@1.1.0",
      _inBundle: false,
      _integrity: "",
      _location: "/h5ad",
      _phantomChildren: {},
      _requested: {
        type: "git",
        raw: "h5ad@git+https://github.com/gc-turbo/h5ad.git",
        name: "h5ad",
        escapedName: "h5ad",
        rawSpec: "git+https://github.com/gc-turbo/h5ad.git",
        saveSpec: "git+https://github.com/gc-turbo/h5ad.git",
        fetchSpec: "https://github.com/gc-turbo/h5ad.git",
        gitCommittish: null
      },
      _requiredBy: [ "/" ],
      _resolved: "git+https://github.com/gc-turbo/h5ad.git#c29be9a114267f1717e47e3e4c77ea488268e1b1",
      _spec: "h5ad@git+https://github.com/gc-turbo/h5ad.git",
      _where: "F:\\Proj\\GitHub\\GCTurbo\\brickBreaker",
      author: {
        name: "GC Turbo"
      },
      bugs: {
        url: "https://github.com/gc-turbo/h5ad/issues"
      },
      bundleDependencies: false,
      deprecated: false,
      description: "Ad API wrapper for GC Turbo hyper casual games",
      homepage: "https://github.com/gc-turbo/h5ad#readme",
      license: "",
      main: "index.js",
      name: "h5ad",
      repository: {
        type: "git",
        url: "git+https://github.com/gc-turbo/h5ad.git"
      },
      scripts: {},
      version: "1.1.0"
    };
  }, {} ],
  GameCtl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a337308uxxJva7vh8G06q7Z", "GameCtl");
    "use strict";
    var GameModel = require("GameModel");
    var LevelModel = require("../model/LevelModel");
    var BrickView = require("../view/BrickView");
    var utils = require("./utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        gameView: require("GameView"),
        ball: require("Ball"),
        paddle: require("Paddle"),
        brickLayout: require("BrickLayout"),
        overPanel: require("OverPanel"),
        pausePanel: require("PausePanel"),
        levelConfig: [ cc.JsonAsset ],
        loading: cc.Node,
        physicsNode: {
          default: null,
          type: cc.Node
        },
        bgNode: {
          default: null,
          type: cc.Node
        },
        canvas: {
          default: null,
          type: cc.Node
        },
        isStopGame: false,
        brickHitSound: cc.AudioClip,
        brickBreakSound: cc.AudioClip,
        winSound: cc.AudioClip,
        loseSound: cc.AudioClip,
        clickSound: cc.AudioClip,
        bgmAudioClip: cc.AudioClip
      },
      onLoad: function onLoad() {
        var widget = this.physicsNode.getComponent(cc.Widget);
        if (widget) {
          if (cc.view.getVisibleSize().width >= 450) {
            console.log("using bgNode");
            widget.target = this.bgNode;
          } else {
            console.log("using canvas");
            widget.target = this.canvas;
          }
          var left = cc.director.getWinSize();
          console.log("left:", left);
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
          event.keyCode === cc.macro.KEY.back && cc.director.end();
        });
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        this.gameModel = new GameModel();
        this._curLevel = ~~cc.sys.localStorage.getItem("curlevel") || 1;
        this.loadLevel(this._curLevel);
      },
      init: function init(levelModel, _reset) {
        void 0 === _reset && (_reset = true);
        this.physicsManager.enabled = true;
        _reset && this.gameModel.init(levelModel.brickCount);
        _reset && this.gameView.init(this);
        this.ball.init(this);
        this.paddle.init(this);
        _reset && this.brickLayout.init(levelModel);
        this.overPanel.init(this);
      },
      startGame: function startGame(config, _reset) {
        this.loading.active = false;
        cc.audioEngine.playMusic(this.bgmAudioClip, true);
        this.init(config, _reset);
        this.isStopGame = false;
      },
      loadLevel: function loadLevel(level, _reset) {
        var config = new LevelModel(this.levelConfig[level - 1].json);
        this.startGame(config, _reset);
      },
      loadCurrentLevel: function loadCurrentLevel(_reset) {
        this.loadLevel(this._curLevel, _reset);
      },
      moveNextLevel: function moveNextLevel() {
        var _this = this;
        var self = this;
        this.loading.active = true;
        utils.showAds("next", true, function(result) {
          _this.loading.active = false;
          if (!result) return;
          var nextLevel = self._curLevel + 1;
          if (_this.levelConfig[nextLevel - 1]) {
            cc.sys.localStorage.setItem("curlevel", nextLevel);
            cc.director.loadScene("game");
          } else {
            _this.loading.active = true;
            cc.director.loadScene("selectLevel");
          }
        });
      },
      onResumeGame: function onResumeGame() {
        cc.director.resume();
        cc.audioEngine.resumeMusic();
        this.physicsManager.enabled = true;
        this.isStopGame = false;
        this.playSound(this.clickSound);
      },
      stopGame: function stopGame(isGameWin) {
        cc.audioEngine.stopMusic();
        this.isStopGame = true;
        this.physicsManager.enabled = false;
        this.saveHighestScore(this._curLevel, this.gameModel.score);
        if (isGameWin) {
          this.playSound(this.winSound);
          var playerLevel = cc.sys.localStorage.getItem("playerLevel") || 0;
          playerLevel < this._curLevel && cc.sys.localStorage.setItem("playerLevel", this._curLevel);
          this.overPanel.show(this.gameModel.score, isGameWin);
        } else {
          this.playSound(this.loseSound);
          this.overPanel.show(this.gameModel.score, isGameWin);
        }
      },
      saveHighestScore: function saveHighestScore(level, newScore) {
        var scoreData = JSON.parse(cc.sys.localStorage.getItem("scoreData") || "[]");
        var oldScore = scoreData[level - 1] || 0;
        if (newScore <= oldScore) return;
        scoreData[level - 1] = newScore;
        cc.sys.localStorage.setItem("scoreData", JSON.stringify(scoreData));
      },
      onBallContactBrick: function onBallContactBrick(ballNode, brickNode) {
        var brick = brickNode.getComponent(BrickView);
        brick.hitBall();
        if (0 === brick.hp) {
          this.playSound(this.brickBreakSound);
          this.gameModel.addScore(brick.score);
          this.gameModel.minusBrick(1);
          this.gameView.updateScore(this.gameModel.score);
          if (this.gameModel.bricksNumber <= 0) {
            this.playSound(this.winSound);
            this.stopGame(true);
          }
        } else this.playSound(this.brickHitSound);
      },
      onBallContactGround: function onBallContactGround(ballNode, groundNode) {
        this.stopGame();
        this.playSound(this.brickHitSound);
      },
      onBallContactPaddle: function onBallContactPaddle(ballNode, paddleNode) {
        this.playSound(this.brickHitSound);
      },
      onBallContactWall: function onBallContactWall(ballNode, brickNode) {
        this.playSound(this.brickHitSound);
      },
      onDestroy: function onDestroy() {
        this.physicsManager.enabled = false;
      },
      onPause: function onPause() {
        var _this2 = this;
        cc.audioEngine.pauseMusic();
        cc.director.pause();
        this.physicsManager.enabled = false;
        this.isStopGame = true;
        this.playSound(this.clickSound);
        var cb = function cb() {
          _this2.pausePanel.show();
        };
        utils.showAds("pause", false, cb);
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    cc._RF.pop();
  }, {
    "../model/LevelModel": "LevelModel",
    "../view/BrickView": "BrickView",
    "./utils": "utils",
    Ball: "Ball",
    BrickLayout: "BrickLayout",
    GameModel: "GameModel",
    GameView: "GameView",
    OverPanel: "OverPanel",
    Paddle: "Paddle",
    PausePanel: "PausePanel"
  } ],
  GameModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dceaaRUaJhHJ6dPqgG9vpjt", "GameModel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        score: 0,
        bricksNumber: 0
      },
      init: function init(brickNumber) {
        this.score = 0;
        this.bricksNumber = brickNumber;
      },
      addScore: function addScore(score) {
        this.score += score;
      },
      minusBrick: function minusBrick(n) {
        this.bricksNumber -= n;
      }
    });
    cc._RF.pop();
  }, {} ],
  GameView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4735UW3lFPMoW0rK22obsG", "GameView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scoreLabel: cc.Label,
        levelabel: cc.Label
      },
      init: function init(gameCtl) {
        this.gameCtl = gameCtl;
        this.scoreLabel.string = "0";
        var level = cc.sys.localStorage.getItem("curlevel");
        this.levelabel.string = level;
      },
      updateScore: function updateScore(score) {
        this.scoreLabel.string = score;
      }
    });
    cc._RF.pop();
  }, {} ],
  LandingScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b85cfPHei5Aio/A9v0oIyPq", "LandingScene");
    "use strict";
    var h5ad = require("h5ad");
    var utils = require("../controller/utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        clickSound: cc.AudioClip,
        bgmAudioClip: cc.AudioClip,
        loading: cc.Node
      },
      onLoad: function onLoad() {
        utils.fit(this.node.getComponent(cc.Canvas));
        cc.audioEngine.setMusicVolume(.6);
        cc.sys.localStorage.setItem("isFirstTime", 1);
        h5ad.onStart({
          icon: utils.getResourceUrl("icon"),
          color: "rgb(3 76 133)",
          afterBreak: this.afterSplash.bind(this),
          adBreakTimeout: 3e3
        });
      },
      afterSplash: function afterSplash() {
        cc.audioEngine.playMusic(this.bgmAudioClip, true);
      },
      start: function start() {},
      onPlayButtonClicked: function onPlayButtonClicked(event, gameMode) {
        this.loading.active = true;
        cc.director.loadScene("selectLevel");
        this.playSound(this.clickSound);
        cc.audioEngine.stopMusic();
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    cc._RF.pop();
  }, {
    "../controller/utils": "utils",
    h5ad: 1
  } ],
  LevelItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d63b4wIyX1FlbY7igExk7D2", "LevelItem");
    "use strict";
    var utils = require("../controller/utils");
    var LevelItem = cc.Class({
      extends: cc.Component,
      properties: {
        clickSound: cc.AudioClip,
        onLayer: cc.Node,
        offLayer: cc.Node,
        button: cc.Button,
        levelItem: cc.Node,
        levelLabel: cc.Label
      },
      statics: {
        isFirst: true
      },
      setLevel: function setLevel(level, handler) {
        this._handler = handler;
        this._level = level;
        this.levelLabel.string = level;
        var playerLevel = cc.sys.localStorage.getItem("playerLevel") || 0;
        var isPass = playerLevel >= this._level;
        this.onLayer.active = isPass;
        this.offLayer.active = !isPass;
        var isHide = this._level >= 2 + ~~playerLevel;
        this.levelItem.opacity = isHide ? 100 : 255;
        this.button.interactable = !isHide;
      },
      onSelectLevel: function onSelectLevel() {
        var _this = this;
        var cb = function cb() {
          _this._handler && _this._handler();
          cc.sys.localStorage.setItem("curlevel", _this._level);
          cc.director.loadScene("game");
          _this.playSound(_this.clickSound);
          cc.tween(_this.bgmAudioSource).to(1, {
            volume: {
              value: 0,
              easing: "sineIn"
            }
          }).call(function() {
            return _this.bgmAudioSource.stop();
          }).start();
        };
        if (LevelItem.isFirst) {
          LevelItem.isFirst = false;
          cb();
        } else utils.showAds("next", true, cb);
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    module.exports = LevelItem;
    cc._RF.pop();
  }, {
    "../controller/utils": "utils"
  } ],
  LevelModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5bf7ZYQy9FtL2z6N3fxQuH", "LevelModel");
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var LevelModel = function() {
      function LevelModel(config) {
        this.brickCount = this.getTotalBricks(config);
        this.column = Object.keys(config[0]).length;
        this.row = Object.keys(config).length;
        this.brickMap = config;
      }
      var _proto = LevelModel.prototype;
      _proto.getTotalBricks = function getTotalBricks(config) {
        var count = 0;
        for (var row in config) for (var column in config[row]) {
          if (0 === config[row][column]) continue;
          count += 1;
        }
        return count;
      };
      return LevelModel;
    }();
    exports["default"] = LevelModel;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  OverPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60425zRIQ5LNIZ6KmZ5p/LN", "OverPanel");
    "use strict";
    var utils = require("../controller/utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        replayBtn: cc.Node,
        nextBtn: cc.Node,
        scoreLabel: cc.Label,
        highestScoreLabel: cc.Label,
        clickSound: cc.AudioClip,
        gameOverPanel: cc.Node,
        gameWinPanel: cc.Node
      },
      onLoad: function onLoad() {},
      init: function init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.active = false;
      },
      show: function show(score, isWin) {
        this.node.active = true;
        this.gameOverPanel.active = !isWin;
        this.gameWinPanel.active = isWin;
        this.nextBtn.active = isWin;
        this.replayBtn.active = !isWin && "1" === cc.sys.localStorage.getItem("isFirstTime");
        this.scoreLabel.string = score;
        this.highestScoreLabel.string = this.getHighestScore();
      },
      getHighestScore: function getHighestScore() {
        var scoreData = JSON.parse(cc.sys.localStorage.getItem("scoreData") || "[]");
        return scoreData.reduce(function(totalScore, stageScore) {
          return totalScore + stageScore;
        });
      },
      onRestart: function onRestart() {
        var _this = this;
        this.playSound(this.clickSound);
        this.gameCtl && (this.gameCtl.loading.active = true);
        utils.showAds("reward", true, function(result) {
          _this.gameCtl && (_this.gameCtl.loading.active = false);
          if (!result) return;
          cc.sys.localStorage.setItem("isFirstTime", 0);
          _this.gameCtl.loadCurrentLevel(false);
          _this.node.active = false;
        });
      },
      onNextLevel: function onNextLevel() {
        this.gameCtl.moveNextLevel();
        this.playSound(this.clickSound);
      },
      onChangeStage: function onChangeStage() {
        var _this2 = this;
        this.playSound(this.clickSound);
        this.gameCtl && (this.gameCtl.loading.active = true);
        utils.showAds("browse", true, function(result) {
          _this2.gameCtl && (_this2.gameCtl.loading.active = false);
          if (!result) return;
          cc.director.loadScene("selectLevel");
        });
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    cc._RF.pop();
  }, {
    "../controller/utils": "utils"
  } ],
  Paddle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dc82c1qO9KbZBsMZGbHlMV", "Paddle");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 500
      },
      onLoad: function onLoad() {
        var width = cc.view.getVisibleSize().width > this.node.parent.width ? this.node.parent.width : cc.view.getVisibleSize().width;
        this._minX = this.node.width / 2 - width / 2;
        this._maxX = width / 2 - this.node.width / 2;
        this.node.parent.on("touchmove", this.onTouchMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      update: function update(dt) {
        if (this._gameCtrl && this._gameCtrl.isStopGame) return;
        var newXpos = this.node.x;
        this._isMoveLeft ? newXpos = Math.max(this._minX, Math.min(this._maxX, newXpos - this.speed * dt)) : this._isMoveRight && (newXpos = Math.max(this._minX, Math.min(this._maxX, newXpos + this.speed * dt)));
        this.node.x = newXpos;
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.left:
         case cc.macro.KEY.a:
          this._isMoveLeft = true;
          break;

         case cc.macro.KEY.right:
         case cc.macro.KEY.d:
          this._isMoveRight = true;
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.left:
         case cc.macro.KEY.a:
          this._isMoveLeft = false;
          break;

         case cc.macro.KEY.right:
         case cc.macro.KEY.d:
          this._isMoveRight = false;
        }
      },
      onTouchMove: function onTouchMove(event) {
        if (this._gameCtrl.isStopGame) return;
        var newPos = this.node.x + event.getDelta().x;
        this.node.x = Math.max(this._minX, Math.min(this._maxX, newPos));
      },
      init: function init(gameCtl) {
        this.node.x = 0;
        this._gameCtrl = gameCtl;
      }
    });
    cc._RF.pop();
  }, {} ],
  PausePanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8352WVqZtHF6g5r3IjErdI", "PausePanel");
    "use strict";
    var utils = require("../controller/utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        loading: {
          default: null,
          type: cc.Node
        },
        clickSound: cc.AudioClip
      },
      show: function show() {
        this.node.active = true;
      },
      onReplay: function onReplay() {
        var _this = this;
        this.loading.active = true;
        utils.showAds("next", false, function(result) {
          if (!result) return;
          _this.loading.active = false;
          cc.director.resume();
          cc.director.loadScene("game");
          _this.playSound(_this.clickSound);
        });
      },
      onChangeStage: function onChangeStage() {
        var _this2 = this;
        this.loading.active = true;
        utils.showAds("browse", false, function(result) {
          if (!result) return;
          _this2.loading.active = false;
          cc.director.resume();
          cc.director.loadScene("selectLevel");
          _this2.playSound(_this2.clickSound);
        });
      },
      onResume: function onResume() {
        this.node.active = false;
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    cc._RF.pop();
  }, {
    "../controller/utils": "utils"
  } ],
  SelectLevelScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31aafb/KpBMD5r8BNEBebec", "SelectLevelScene");
    "use strict";
    var LevelItem = require("./LevelItem");
    var utils = require("../controller/utils");
    cc.Class({
      extends: cc.Component,
      properties: {
        clickSound: cc.AudioClip,
        bgmAudioClip: cc.AudioClip,
        loading: cc.Node,
        levelPrefab: cc.Prefab,
        contentView: cc.Node
      },
      onLoad: function onLoad() {
        utils.fit(this.node.getComponent(cc.Canvas));
        cc.sys.localStorage.setItem("isFirstTime", 1);
        cc.audioEngine.playMusic(this.bgmAudioClip, true);
        this.loadLevelConfig();
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      },
      loadLevelConfig: function loadLevelConfig() {
        for (var i = 0; i < 30; i++) {
          var levelItem = cc.instantiate(this.levelPrefab);
          var levelCtrl = levelItem.getComponent(LevelItem);
          levelCtrl.setLevel(i + 1, this.onSelect.bind(this));
          this.contentView.addChild(levelItem);
        }
      },
      onSelect: function onSelect() {
        this.loading.active = true;
      }
    });
    cc._RF.pop();
  }, {
    "../controller/utils": "utils",
    "./LevelItem": "LevelItem"
  } ],
  SoundButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "693b7oTvNhKEL4LhZ6JE9Ie", "SoundButton");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        buttonSprite: cc.Sprite,
        buttonTextures: [ cc.SpriteFrame ],
        clickSound: cc.AudioClip
      },
      onLoad: function onLoad() {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        this.buttonSprite.spriteFrame = this.buttonTextures[soundConfig];
        this.setSoundConfig(soundConfig);
      },
      onSoundButtonClicked: function onSoundButtonClicked() {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(this.clickSound, false, soundConfig);
        var newConfig = 1 == soundConfig ? 0 : 1;
        cc.sys.localStorage.setItem("soundConfig", newConfig);
        this.buttonSprite.spriteFrame = this.buttonTextures[newConfig];
        this.setSoundConfig(newConfig);
      },
      setSoundConfig: function setSoundConfig(soundConfig) {
        1 == soundConfig ? cc.audioEngine.setMusicVolume(1) : cc.audioEngine.setMusicVolume(0);
      }
    });
    cc._RF.pop();
  }, {} ],
  TutorialButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02e0fTuk3RCybE2KHyqK0XM", "TutorialButton");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tutorialLayer: cc.Node,
        isShow: false,
        clickSound: cc.AudioClip
      },
      onTutorialClicked: function onTutorialClicked() {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(this.clickSound, false, soundConfig);
        this.tutorialLayer.active = !this.isShow;
        this.isShow = !this.isShow;
        this.playSound(this.clickSound);
      },
      playSound: function playSound(sound) {
        var soundConfig = cc.sys.localStorage.getItem("soundConfig") || 1;
        cc.audioEngine.play(sound, false, soundConfig);
      }
    });
    cc._RF.pop();
  }, {} ],
  utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "edc1bnU0BhO64vKFQYCrNHB", "utils");
    "use strict";
    var h5ad = require("h5ad");
    module.exports = {
      showAds: function showAds(type, shouldPause, cb) {
        var object = new Object();
        object["type"] = type;
        object["beforeBreak"] = function() {
          console.log("beforeBreak");
          if (shouldPause) {
            cc.director.pause();
            cc.audioEngine.pauseAll();
          }
        };
        object["afterBreak"] = function() {
          console.log("afterBreak");
          if (shouldPause) {
            cc.director.resume();
            cc.audioEngine.resumeAll();
          }
          "reward" != type && cb && cb(true);
        };
        "reward" == type && (object["beforeReward"] = function(showAdFn) {
          console.log("beforeReward");
          showAdFn();
        });
        object["adDismissed"] = function() {
          console.log("adDismissed");
          cb && cb(false);
        };
        "reward" == type && (object["adViewed"] = function() {
          console.log("adViewed");
          cb && cb(true);
        });
        object["noBreak"] = function() {
          console.log("noBreak");
          if (shouldPause) {
            cc.director.resume();
            cc.audioEngine.resumeAll();
          }
          cb && cb(true);
        };
        h5ad.adBreak(object);
      },
      getResourceUrl: function getResourceUrl(resourceId) {
        var resource = cc.resources.getInfoWithPath(resourceId);
        var uuid = resource.uuid;
        resource.nativeVer && (uuid += "." + resource.nativeVer);
        var path = "./assets/resources/native/" + uuid.substr(0, 2) + "/" + uuid + ".png";
        return path;
      },
      fit: function fit(cvs) {
        var size = cc.view.getVisibleSize();
        var designSize = cc.view.getDesignResolutionSize();
        if (size.width / designSize.width >= size.height / designSize.height) {
          console.log("fitHeight");
          cvs.fitHeight = true;
          cvs.fitWidth = false;
        } else if (size.width / designSize.width < size.height / designSize.height) {
          console.log("fitWidth");
          cvs.fitHeight = false;
          cvs.fitWidth = true;
        }
      }
    };
    cc._RF.pop();
  }, {
    h5ad: 1
  } ]
}, {}, [ "GameCtl", "utils", "BrickModel", "GameModel", "LevelModel", "Ball", "BrickLayout", "BrickView", "GameView", "LandingScene", "LevelItem", "OverPanel", "Paddle", "PausePanel", "SelectLevelScene", "SoundButton", "TutorialButton" ]);