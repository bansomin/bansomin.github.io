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
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    var lowOrder = 1;
    var highOrder = 100;
    var bigScale = 1.6;
    cc.Class({
      extends: cc.Component,
      properties: {
        nodeList: [ cc.Node ],
        black: cc.Node,
        write: cc.Node,
        blackSp: cc.SpriteFrame,
        writeSp: cc.SpriteFrame,
        success: cc.AudioSource,
        faile: cc.AudioSource
      },
      onLoad: function onLoad() {
        this.allNodeList = [];
        for (var i in this.nodeList) {
          var node = this.nodeList[i];
          this.allNodeList.push(node);
        }
      },
      onEnable: function onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
      },
      onDisable: function onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
      },
      onStart: function onStart(event) {
        var touches = event.getTouches();
        if (touches.length > 1) return;
        var beginPos = touches[0].getLocation();
        this.m_LastPos = beginPos;
        beginPos = this.node.convertToNodeSpace(beginPos);
        var nodeSize = this.node.getContentSize();
        var node = this.getCurNodeByPosStart(cc.v2(beginPos.x - nodeSize.width / 2, beginPos.y - nodeSize.height / 2));
        if (null == node || false === node.active) return;
        this.nameNum = parseInt(node.name.slice(4));
        var childrenLen = node.children.length;
        if (childrenLen >= 1) {
          this._curChild = node.getChildByName("black");
          void 0 != this._curChild && null != this._curChild || (this._curChild = node.getChildByName("write"));
          this._curParentNode = node;
          this._curParentNode.zIndex = highOrder;
          if (null != this._curChild) {
            var scale = this._curChild.getScale();
            scale != bigScale && this._curChild.runAction(cc.scaleTo(.05, bigScale, bigScale).easing(cc.easeBackIn()));
          }
        }
      },
      onMove: function onMove(event) {
        if (null == this._curChild) return;
        var touches = event.getTouches();
        var pos = touches[0].getLocation();
        var offx = pos.x - this.m_LastPos.x;
        var offy = pos.y - this.m_LastPos.y;
        if (null == this._curChild && null == this._curParentNode) return;
        var point = this._curChild.getPosition();
        this._curChild.setPosition(point.x + offx, point.y + offy);
        this.m_LastPos = pos;
      },
      onEnd: function onEnd(event) {
        this.getTargetData(event);
        this.endFunc(event);
        var bnode = this.black.getChildByName("black");
        var wnode = this.write.getChildByName("write");
        if (void 0 == bnode || null == bnode) {
          var node = new cc.Node();
          node.name = "black";
          node.scale = 1.4;
          var sp = node.addComponent(cc.Sprite);
          sp.spriteFrame = this.blackSp;
          this.black.addChild(node);
        }
        if (void 0 == wnode || null == wnode) {
          var anode = new cc.Node();
          anode.name = "write";
          anode.scale = 1.4;
          var bsp = anode.addComponent(cc.Sprite);
          bsp.spriteFrame = this.writeSp;
          this.write.addChild(anode);
        }
      },
      getTargetData: function getTargetData(event) {
        var touches = event.getTouches();
        var pos = touches[0].getLocation();
        var newPos = this.node.convertToNodeSpace(pos);
        this._targetChild = null;
        this._targetParentNode = null;
        var nodeSize = this.node.getContentSize();
        var targetNode = this.getCurNodeByPosStart(cc.v2(newPos.x - nodeSize.width / 2, newPos.y - nodeSize.height / 2));
        if (null == targetNode) return;
        this._targetParentNode = targetNode;
        var nodeName = parseInt(targetNode.name.slice(4));
        if (null != this._targetParentNode) {
          this._targetChild = this._targetParentNode.getChildByName("black");
          void 0 != this._targetChild && null != this._targetChild || (this._targetChild = this._targetParentNode.getChildByName("write"));
        }
      },
      endFunc: function endFunc(event) {
        var child = 0;
        null == this._targetParentNode || this._curParentNode == this._targetParentNode || null != this._targetChild ? this.rollBack() : null == this._curParentNode || this.exchangeCardPosPre();
      },
      rollBack: function rollBack() {
        this.node.stopAllActions();
        var self = this;
        if (null != this._curChild) {
          this._curChild.setPosition(cc.v2(0, 0));
          var scale = this._curChild.getScale();
          var scaleS = 1.4;
          scale !== scaleS && this._curChild.runAction(cc.scaleTo(.05, scaleS, scaleS).easing(cc.easeBackOut()));
        }
        null != self._curParentNode && (self._curParentNode.zIndex = lowOrder);
        self._curChild = null;
        self._targetChild = null;
        self._curParentNode = null;
        self._targetParentNode = null;
      },
      exchangeCardPosPre: function exchangeCardPosPre() {
        this.node.stopAllActions();
        if (null == this._curParentNode || null == this._targetParentNode) return;
        var isExchange = this.exchangeTwoCards(this._curChild, this._curParentNode, this._targetChild, this._targetParentNode);
        null != this._curParentNode && (this._curParentNode.zIndex = lowOrder);
        this._curChild = null;
        this._curParentNode = null;
        this._targetChild = null;
        this._targetParentNode = null;
      },
      exchangeTwoCards: function exchangeTwoCards(_fromChild, _fromParentNode, _toChild, _toParentNode) {
        if (null == _fromChild || null == _fromParentNode || null == _toParentNode) return false;
        var fromScale = 1.4;
        var toScale = 1;
        _fromChild.parent = _toParentNode;
        _fromChild.setPosition(cc.v2(0, 0));
        _fromChild.getScale() !== fromScale && _fromChild.runAction(cc.scaleTo(.05, fromScale, fromScale).easing(cc.easeBackOut()));
        return true;
      },
      getCurNodeByPosStart: function getCurNodeByPosStart(_pos) {
        for (var i in this.allNodeList) {
          var node = this.allNodeList[i];
          var box = node.getBoundingBox();
          if (box.contains(_pos)) return node;
        }
      },
      caculeResult: function caculeResult() {
        for (var i = 0; i < 6; i++) {
          var node = this.nodeList[i];
          if (1 == i || 2 == i) {
            var write = node.getChildByName("write");
            if (void 0 == write || null == write) return false;
          } else if (5 == i) {
            var black = node.getChildByName("black");
            if (void 0 == black || null == black) return false;
          } else {
            var len = node.children.length;
            if (len >= 1) return false;
          }
        }
        return true;
      },
      onclickSureBtn: function onclickSureBtn() {
        var result = this.caculeResult();
        true == result ? this.success.play() : this.faile.play();
        this.clear();
      },
      clear: function clear() {
        for (var i = 0; i < 6; i++) {
          var node = this.nodeList[i];
          node.removeAllChildren();
        }
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld" ]);