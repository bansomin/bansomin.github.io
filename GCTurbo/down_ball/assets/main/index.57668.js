window.__require=function e(t,i,o){function n(c,a){if(!i[c]){if(!t[c]){var r=c.split("/");if(r=r[r.length-1],!t[r]){var l="function"==typeof __require&&__require;if(!a&&l)return l(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+c+"'")}c=r}var h=i[c]={exports:{}};t[c][0].call(h.exports,function(e){return n(t[c][1][e]||e)},h,h.exports,e,t,i,o)}return i[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<o.length;c++)n(o[c]);return n}({1:[function(e,t){var i=e("./package.json").version,o="en",n="jp",s={jp:{play:"\u30b9\u30bf\u30fc\u30c8"},en:{play:"Play Now!"}},c=500;function a(){console.log("H5ad v"+i),this._isInitialised=!1,this._splashAdShown=!1}function r(e){for(var t in e=e||{})void 0===e[t]&&delete e[t];return e}function l(e,t){console.error(e),(t=t||{}).noBreak?t.noBreak():(t.beforeBreak&&t.beforeBreak(),t.afterBreak&&t.afterBreak())}function h(){if(!navigator.language)return n;var e=navigator.language.toLowerCase().substr(0,2);return s[e]?e:o}a.prototype.initialize=function(e){if(this._isInitialised)console.warn("h5ad: already initialized");else{if(this._isInitialised=!0,e&&void 0!==e.adBreakTimeout&&(c=e.adBreakTimeout),!window.adsbygoogle){var t=document.createElement("script");t.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",t.setAttribute("data-ad-client","ca-pub-123456789"),t.setAttribute("data-adbreak-test","on"),t.async=!0,document.head.appendChild(t),window.adsbygoogle=window.adsbygoogle||[],adBreak=window.adBreak=function(e){console.log("adBreak:",e),window.adsbygoogle.push(e)},adConfig=window.adConfig=function(e){console.log("adConfig:",e),window.adsbygoogle.push(e)}}adConfig({preloadAdBreaks:"on",sound:"on"})}},a.prototype.onStart=function(e){if(e=e||{},this._isInitialised||this.initialize({adBreakTimeout:e.adBreakTimeout}),this._splashAdShown)console.warn("h5ad: onStart has already been called");else{this._splashAdShown=!0;var t="";t+=".splahContainer {",t+="    background-color: black;",t+="    position: absolute;",t+="    width: 100%;",t+="    height: 100%;",t+="    text-align: left;",t+="}",t+=".splahContainer .gameIcon {",t+="    position: relative;",t+="    width: 100px;",t+="    height: 100px;",t+="    background-size: 100%;",t+="    transform: translate(-50%, -100%);",t+="    left: 50%;",t+="    top: 31%;",t+="    border-radius: 10px;",t+="    border: 2px white solid;",t+="    border-radius: min(2vh,2vw);",t+="    border: min(0.7vw, 0.7vh) white solid;",t+="    width: min(30vw, 20vh);",t+="    height: min(30vw, 20vh);",t+="}",t+=".splahContainer .startButton {",t+="    background-color: rgb(255, 193, 7);",t+="    padding: 20px 30px;",t+="    border-radius: 13px;",t+="    transform: translate(-50%, 100%);",t+="    left: 50%;",t+="    top: 40%;",t+="    border: 5px solid white;",t+="    position: relative;",t+="    cursor: pointer;",t+="    font-size: 26px;",t+="    font-family: arial, verdana;",t+="    color: white;",t+="    text-align: center;",t+="    transition: all 0.1s;",t+="    width: min(50vw,27vh);",t+="    padding: min(3vw,3vh);",t+="    font-size: min(4vh,9vw);",t+="    border-radius: min(2vh,2vw);",t+="    border: min(1vw, 1vh) white solid;",t+="}",t+=".splahContainer .startButton:hover {",t+="    transform: translate(-50%, 100%) scale(1.1);",t+="    background-color: rgb(255 217 104);",t+="}";var i=document.createElement("style");i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t)),document.getElementsByTagName("head")[0].appendChild(i);var o=document.createElement("div");e.color&&(o.style.backgroundColor=e.color),o.className="splahContainer";var n=document.createElement("div");n.textContent=s[h()].play,n.className="startButton",o.appendChild(n);var a=document.createElement("div");a.className="gameIcon",e.icon&&(a.style.backgroundImage="url("+e.icon+")"),o.appendChild(a),document.body.appendChild(o),n.onclick=function(){afterBreakCallbackCalled=!1;var t=setTimeout(function(){afterBreakCallbackCalled||(afterBreakCallbackCalled=!0,e.afterBreak&&e.afterBreak())},c);try{adBreak(r({type:"start",name:e.name||"splash_screen",beforeAd:function(){clearTimeout(t)},afterAd:function(){afterBreakCallbackCalled||(afterBreakCallbackCalled=!0,e.afterBreak&&e.afterBreak())}}))}catch(i){l(i,e)}setTimeout(function(){document.body.removeChild(o)},200)}}},a.prototype.onNext=function(e){(e=e||{}).type="next",this.adBreak(e)},a.prototype.onBrowse=function(e){(e=e||{}).type="browse",this.adBreak(e)},a.prototype.onPause=function(e){(e=e||{}).type="pause",this.adBreak(e)},a.prototype.onReward=function(e){(e=e||{}).type="reward",this.adBreak(e)},a.prototype.adBreak=function(e){var t,i=(e=e||{}).type;if(-1===["next","browse","pause","reward"].indexOf(i))return console.error("H5ad: unknown type",i);t=setTimeout(function(){e.noBreak&&e.noBreak()},c);try{adBreak(r({type:i,name:e.name||i,beforeAd:function(){t&&clearTimeout(t),e.beforeBreak&&e.beforeBreak()},afterAd:e.afterBreak,beforeReward:e.beforeReward,adDismissed:"reward"===i?e.adDismissed||function(){}:void 0,adViewed:e.adViewed}))}catch(o){l(o,e)}},a.prototype.onMute=function(){adConfig({sound:"off"})},a.prototype.onUnmute=function(){adConfig({sound:"on"})},t.exports=new a},{"./package.json":2}],2:[function(e,t){t.exports={_from:"git+https://github.com/gc-turbo/h5ad.git",_id:"h5ad@1.1.0",_inBundle:!1,_integrity:"",_location:"/h5ad",_phantomChildren:{},_requested:{type:"git",raw:"https://github.com/gc-turbo/h5ad",rawSpec:"https://github.com/gc-turbo/h5ad",saveSpec:"git+https://github.com/gc-turbo/h5ad.git",fetchSpec:"https://github.com/gc-turbo/h5ad.git",gitCommittish:null},_requiredBy:["#USER","/"],_resolved:"git+https://github.com/gc-turbo/h5ad.git#c29be9a114267f1717e47e3e4c77ea488268e1b1",_spec:"https://github.com/gc-turbo/h5ad",_where:"F:\\Proj\\GitHub\\GCTurbo\\down_ball",author:{name:"GC Turbo"},bugs:{url:"https://github.com/gc-turbo/h5ad/issues"},bundleDependencies:!1,deprecated:!1,description:"Ad API wrapper for GC Turbo hyper casual games",homepage:"https://github.com/gc-turbo/h5ad#readme",license:"",main:"index.js",name:"h5ad",repository:{type:"git",url:"git+https://github.com/gc-turbo/h5ad.git"},scripts:{},version:"1.1.0"}},{}],backdrop:[function(e,t){"use strict";cc._RF.push(t,"33979i+1ydJBLzksxkXWnGd","backdrop"),cc.Class({extends:cc.Component,properties:{bg:cc.Node,sideWalls:[cc.Node],envNode:cc.Node,envTemplates:[cc.Prefab]},onLoad:function(){this.node.zIndex=-100,this.screenHeight=cc.winSize.height},start:function(){var e=this;this.node.y=-(this.screenHeight-600)/2,this.bg.height=this.screenHeight,this.envFrames=[];for(var t=Math.ceil(this.screenHeight/600)+1,i=0;i<t;i++){var o=cc.instantiate(this.envTemplates[~~(Math.random()*this.envTemplates.length)]);o.parent=this.envNode,o.y=(this.screenHeight-600)/2-600*i,this.envFrames.push(o)}this.sideWalls.forEach(function(t){t.height=e.screenHeight,t.y<0&&(t.y=-e.screenHeight)})},update:function(){},move:function(e){var t=this;this.node.y-=e,this.sideWalls.forEach(function(i){i.y+=.5*e,i.y>t.screenHeight&&(i.y-=2*t.screenHeight)});for(var i=0;i<this.envFrames.length;i++){var o=this.envFrames[i];if(o.y+=.2*e,o.y>600+(this.screenHeight-600)/2){var n=o.y-600*this.envFrames.length;o.destroy(),this.envFrames[i]=cc.instantiate(this.envTemplates[~~(Math.random()*this.envTemplates.length)]),this.envFrames[i].parent=this.envNode,this.envFrames[i].y=n}}}}),cc._RF.pop()},{}],ball:[function(e,t){"use strict";cc._RF.push(t,"1f855lMJnZLjJf2bPQGKBbg","ball");var i=s(e("./pickup")),o=s(e("./spike")),n=s(e("./ingameCtor"));function s(e){return e&&e.__esModule?e:{default:e}}cc.Class({extends:cc.Component,properties:{controller:n.default,ballBodyPrefab:cc.Prefab,ballEyePrefab:cc.Prefab,normalSpriteFrame:cc.SpriteFrame,deadSpriteFrame:cc.SpriteFrame,bounceSpriteFrames:[cc.SpriteFrame]},onLoad:function(){var e=this;this.body=cc.instantiate(this.ballBodyPrefab),this.eye=cc.instantiate(this.ballEyePrefab),this.rigidBody=this.getComponent(cc.RigidBody),this.body.parent=this.node.parent,this.eye.parent=this.node.parent,this.lastY=0,this.bodyOffsetY=0,this.bounceTween=null,this.normalSpriteFrameSize=[this.normalSpriteFrame.getRect().width,this.normalSpriteFrame.getRect().height],this.deadSpriteFrameSize=[this.deadSpriteFrame.getRect().width,this.deadSpriteFrame.getRect().height],this.bounceSpriteFrameSizes=[],this.bounceSpriteFrames.forEach(function(t){e.bounceSpriteFrameSizes.push([t.getRect().width,t.getRect().height])})},start:function(){},lateUpdate:function(){var e=this,t=this.rigidBody.linearVelocity.y;if(this.lastY<0&&t>=0){var i=t;if(i>200){var o=.03/(.2*(this.controller.currentdifficultScale-1)+1);this.bounceTween&&this.bounceTween.stop(),this.controller.playJumpSound(i/300),this.bounceTween=cc.tween(this.node).call(function(){e.eye.active=!1,e.updateBodyBasedOnSpriteFrame(0,i/26/e.controller.currentdifficultScale)}).delay(o).call(function(){e.updateBodyBasedOnSpriteFrame(1,i/35/e.controller.currentdifficultScale)}).delay(1.4*o).call(function(){e.updateBodyBasedOnSpriteFrame(2,i/42/e.controller.currentdifficultScale)}).delay(1.8*o).call(function(){e.updateBodyBasedOnSpriteFrame(1,i/84/e.controller.currentdifficultScale)}).delay(2.4*o).call(function(){e.updateBodyBasedOnSpriteFrame(0)}).delay(2.8*o).call(function(){e.node.angle=0,e.eye.active=!0,e.updateBodyBasedOnSpriteFrame(-1)}).start()}}this.lastY=t,this.body.position=this.node.position,this.body.y-=this.bodyOffsetY,this.eye.position=this.node.position,this.eye.angle=this.node.angle},updateBodyBasedOnSpriteFrame:function(e,t){void 0===t&&(t=0),this.body.getComponent(cc.Sprite).spriteFrame=e<0?-2===e?this.deadSpriteFrame:this.normalSpriteFrame:this.bounceSpriteFrames[e];var i=e<0?-2===e?this.deadSpriteFrameSize:this.normalSpriteFrameSize:this.bounceSpriteFrameSizes[e];this.body.width=i[0],this.body.height=i[1],this.bodyOffsetY=this.normalSpriteFrameSize[1]-this.body.height+t},setDeadFrame:function(){this.eye.active=!1,this.updateBodyBasedOnSpriteFrame(-2)},onBeginContact:function(e,t,n){var s=n.getComponent(i.default);s&&this.controller.eatPickup(s.node);var c=n.getComponent(o.default);c&&this.controller.stumpSpike(c)}}),cc._RF.pop()},{"./ingameCtor":"ingameCtor","./pickup":"pickup","./spike":"spike"}],block:[function(e,t){"use strict";cc._RF.push(t,"dfa28y7x0BNFZQ9xARhs4Og","block"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.sprite=this.getComponent(cc.Sprite)},start:function(){},update:function(){}}),cc._RF.pop()},{}],helpIcon:[function(e,t){"use strict";cc._RF.push(t,"4b27c/Ff6RC/q6X229VzbWl","helpIcon"),cc.Class({extends:cc.Component,properties:{},start:function(){this.tween=cc.tween(this.node).repeat(1e3,cc.tween().to(.5,{opacity:255}).delay(.2).to(.5,{opacity:0})).start()},stop:function(){this.tween&&this.tween.stop(),this.tween=cc.tween(this.node).to(.4,{opacity:0}).start()}}),cc._RF.pop()},{}],helpers:[function(e,t){"use strict";cc._RF.push(t,"53e50A4LFdLSob/nvJiTPJs","helpers");var i=e("h5ad");t.exports.showAds=function(e,t,o){var n=new Object;n.type=e,n.beforeBreak=function(){console.log("beforeBreak"),t&&(cc.director.pause(),cc.audioEngine.pauseAll())},n.afterBreak=function(){console.log("afterBreak"),t&&(cc.director.resume(),cc.audioEngine.resumeAll()),"reward"!=e&&o&&o(!0)},"reward"==e&&(n.beforeReward=function(e){console.log("beforeReward"),e()}),n.adDismissed=function(){console.log("adDismissed"),o&&o(!1)},"reward"==e&&(n.adViewed=function(){console.log("adViewed"),o&&o(!0)}),n.noBreak=function(){console.log("noBreak"),t&&(cc.director.resume(),cc.audioEngine.resumeAll()),o&&o(!0)},i.adBreak(n)},t.exports.gtaInit=function(e,t){console.log("init:",e+" ** "+t);var i={gameId:e,version:"1.0.0",debugLog:!0,amplitude:{apiKey:t,debugLog:!0}};gcTurboAnalytics.init(i)},t.exports.gtaSendBaseUserProperties=function(){var e=new Object;e.version="1.0.0",gcTurboAnalytics.setUserProperties(e)},t.exports.gtaSetUserProperties=function(e){gcTurboAnalytics.setUserProperties(e)},t.exports.gtaPushEvent=function(e,t){gcTurboAnalytics.pushEvent(e,t)},t.exports.getAppName=function(){return"Drop"},t.exports.getWeblinkSource=function(){return document?document.referrer||document.URL:"Unknown"},t.exports.getResourceUrl=function(e){var t=cc.resources.getInfoWithPath(e),i=t.uuid;return t.nativeVer&&(i+="."+t.nativeVer),"./assets/resources/native/"+i.substr(0,2)+"/"+i+".png"},cc._RF.pop()},{h5ad:1}],ingameCtor:[function(e,t){"use strict";cc._RF.push(t,"f248dKnGNxJz51/88AFA/6x","ingameCtor");var i=s(e("./libs/perlin")),o=(s(e("./block")),s(e("./pickup")),s(e("./ingameUICtor"))),n=s(e("./libs/helpers"));function s(e){return e&&e.__esModule?e:{default:e}}cc.Class({extends:cc.Component,properties:{uiController:o.default,touchInputFrame:cc.Node,backdrop:cc.Node,ball:cc.Node,blockPrefab:cc.Prefab,pickupPrefab:cc.Prefab,spikePrefab:cc.Prefab,gameCamera:cc.Node,bgm:cc.AudioClip,gameOverClip:cc.AudioClip,jumpClip:cc.AudioClip,coinClip:cc.AudioClip,spikeClip:cc.AudioClip,clickClip:cc.AudioClip},onLoad:function(){cc.winSize.height<cc.winSize.width&&(cc.Canvas.instance.fitHeight=!0),cc.Canvas.instance.fitWidth=!0,this.screenHeight=cc.winSize.height,this.node.height=this.screenHeight,this.node.y=this.screenHeight/2,this.uiController.node.y=(this.screenHeight-600)/2+300,this.uiController.ingameController=this,cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().gravity=cc.v2(0,-1e3);var e=cc.director.getPhysicsManager();cc.audioEngine.setMusicVolume(.6),this.sound=cc.sys.localStorage.getItem("massplay.drop.sound")||"on",this.uiController.updateSoundToggle("on"===this.sound),this.updateBgm(),this.highScore=cc.sys.localStorage.getItem("massplay.drop.highscore")||0,e.enabledAccumulator=!0,e.FIXED_TIME_STEP=1/30,e.VELOCITY_ITERATIONS=8,e.POSITION_ITERATIONS=8,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.touchInputFrame.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.touchInputFrame.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.touchInputFrame.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),this.touchInputFrame.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this),this.isLeftPressed=!1,this.isRightPressed=!1,this.isTouching=!1,this.touchX=0,this.isGameEnded=!1,this.blocksPerRow=~~(this.node.width/40)-2,this.playingTime=0;var t=cc.sys.localStorage.getItem("initScore",this.score)||0;cc.sys.localStorage.removeItem("initScore"),this.score=1*t,this.currentdifficultScale=1,cc.director.isPaused&&cc.director.resume()},start:function(){var e=this;this.blockPool=new cc.NodePool("block"),this.pickupPool=new cc.NodePool("pickup"),this.spikePool=new cc.NodePool("spike"),this.blocks=[],this.pickups=[],this.spikes=[],i.default.seed(Math.random()),this.spawningBlockY=40,this.spawningBlockTime=0,this.spawnBlockRow([[!1,!1,!1,0],[!1,!1,!1,0],[!1,!1,!1,0],[!1,!1,!1,0],[!0,!1,!1,0],[!0,!1,!1,0],[!0,!1,!1,0],[!0,!1,!1,0],[!0,!1,!1,0],[!1,!1,!1,0],[!1,!1,!1,0],[!1,!1,!1,0],[!1,!1,!1,0]]),this.generateNewBlockRow(),this.uiController.updateScoreLabel(this.score,this.highScore),cc.director.pause(),this.uiController.popupOverlay.active=!0,setTimeout(function(){e.uiController.showReadyLabel()},300),setTimeout(function(){e.uiController.hideReadyLabel(),e.uiController.popupOverlay.active=!1},1800),setTimeout(function(){cc.director.resume()},2e3)},generateNewBlockRow:function(){for(;this.spawningBlockY>this.gameCamera.y-this.screenHeight-80;){for(var e=[],t=!1,o=0;!t&&o<10;){this.spawningBlockTime++;var n=!1,s=Math.random()<=.15,c=40*Math.random()-20,a=0,r=0;t=!0,o++,e=[];for(var l=0;l<this.blocksPerRow;l++){var h=i.default.simplex2(l,this.spawningBlockTime)*(this.spawningBlockTime%2*2-1)>-.1;h&&r>0&&r<2&&(h=!1),h?(r>0&&(s=Math.random()<=.15,c=40*Math.random()-20),r=0,a++):r++;var u=!!h&&Math.random()<=.2&&!n,p=!!h&&s;n|=u,e.push([h,u,p,c])}a>=this.blocksPerRow-5&&(t=!1)}this.spawnBlockRow(e)}},spawnBlockRow:function(e){var t=this;this.lastBlockRow=e;var i=-(this.blocksPerRow-1)/2;e.forEach(function(o){if(o[0]){var n=e.indexOf(o);if(t.blockPool.size()<=0){var s=cc.instantiate(t.blockPrefab);t.blockPool.put(s)}var c=t.blockPool.get();if(c.parent=t.node,c.position=cc.Vec3(40*(i+n),t.spawningBlockY+o[3]),c.getComponent(cc.PhysicsBoxCollider).restitution=Math.max(.6*(1-.05*.1*t.playingTime*.2),.5),c.getComponent(cc.PhysicsBoxCollider).apply(),t.blocks.push(c),o[1]){if(t.pickupPool.size()<=0){var a=cc.instantiate(t.pickupPrefab);t.pickupPool.put(a)}var r=t.pickupPool.get();r.getComponent("pickup").setRandomType(),r.parent=t.node,r.position=cc.Vec3(40*(i+n),t.spawningBlockY+o[3]+c.height/2+10+r.height/2),t.pickups.push(r)}else if(o[2]){if(t.spikePool.size()<=0){var l=cc.instantiate(t.spikePrefab);t.spikePool.put(l)}var h=t.spikePool.get();h.parent=t.node,h.position=cc.Vec3(40*(i+n),t.spawningBlockY+o[3]+c.height/2+h.height/2),t.spikes.push(h)}}}),this.spawningBlockY-=220},update:function(e){var t=this.ball.getComponent(cc.RigidBody);if(this.currentdifficultScale=1+.05*this.playingTime,(this.isLeftPressed||this.isRightPressed||this.isTouching)&&(this.isStarted||(this.uiController.stopHelpIcon(),this.isStarted=!0)),!this.isLeftPressed&&!this.isRightPressed&&this.isTouching&&0!==this.touchX){var i=this.touchX/Math.abs(this.touchX)*7e3;i>0?(t.linearVelocity=cc.v2(Math.max(t.linearVelocity.x,0),t.linearVelocity.y),t.angularVelocity=Math.max(t.angularVelocity,0)):(t.linearVelocity=cc.v2(Math.min(t.linearVelocity.x,0),t.linearVelocity.y),t.angularVelocity=Math.min(t.angularVelocity,0)),t.applyLinearImpulse(cc.v2(i*e,0),t.getWorldCenter()),t.applyAngularImpulse(-i*e*10);var o=this.touchX;this.touchX-=i,this.touchX/o<0&&(this.touchX=0)}if(this.isLeftPressed&&(t.linearVelocity=cc.v2(Math.min(t.linearVelocity.x,0),t.linearVelocity.y),t.angularVelocity=Math.min(t.angularVelocity,0),t.applyLinearImpulse(cc.v2(-7e3*e,0),t.getWorldCenter()),t.applyAngularImpulse(8400*e)),this.isRightPressed&&(t.linearVelocity=cc.v2(Math.max(t.linearVelocity.x,0),t.linearVelocity.y),t.angularVelocity=Math.max(t.angularVelocity,0),t.applyLinearImpulse(cc.v2(7e3*e,0),t.getWorldCenter()),t.applyAngularImpulse(-7e3*e*1.2)),this.isStarted){this.playingTime+=e;var n=50*e*this.currentdifficultScale;t.gravityScale=this.currentdifficultScale,this.gameCamera.y-=n,this.touchInputFrame.y-=n,this.backdrop.getComponent("backdrop").move(n);for(var s=this.blocks.length-1;s>=0;s--){var c=this.blocks[s];c.position.y>this.gameCamera.y+50&&(this.blockPool.put(c),this.blocks.splice(s,1))}for(var a=this.pickups.length-1;a>=0;a--){var r=this.pickups[a];r.position.y>this.gameCamera.y+50&&(this.pickupPool.put(r),this.pickups.splice(a,1))}for(var l=this.spikes.length-1;l>=0;l--){var h=this.spikes[l];h.position.y>this.gameCamera.y+50&&(this.spikePool.put(h),this.spikes.splice(l,1))}this.generateNewBlockRow(),this.score+=10*e,this.uiController.updateScoreLabel(this.score,this.highScore)}},lateUpdate:function(){Math.abs(this.ball.y-this.gameCamera.y+this.screenHeight/2)>this.screenHeight/2+80&&this.endGame();var e=this.ball.getComponent(cc.RigidBody);e.linearVelocity=cc.v2(e.linearVelocity.x/Math.abs(e.linearVelocity.x)*Math.min(Math.abs(e.linearVelocity.x),200),e.linearVelocity.y),this.isRightPressed||this.isLeftPressed||(e.linearVelocity=cc.v2(.8*e.linearVelocity.x,e.linearVelocity.y),e.angularVelocity=.2*e.angularVelocity)},playJumpSound:function(e){"on"===this.sound&&cc.audioEngine.play(this.jumpClip,!1,e)},eatPickup:function(e){var t=e.getComponent("pickup").score;this.pickupPool.put(e),"on"===this.sound&&cc.audioEngine.play(this.coinClip,!1,.5),this.pickups.splice(this.pickups.indexOf(e),1),this.score+=t,this.uiController.updateScoreLabel(this.score,this.highScore),this.uiController.addScoreEffect(t)},stumpSpike:function(){this.ball.getComponent("ball").setDeadFrame(),"on"===this.sound&&cc.audioEngine.play(this.spikeClip,!1,1),this.endGame()},pauseGame:function(){cc.director.pause(),this.uiController.showPopup("pause")},helpOpen:function(){cc.director.pause(),this.uiController.showPopup("help")},endGame:function(){var e=this;this.isGameEnded||(this.isGameEnded=!0,cc.audioEngine.stopMusic(),cc.director.pause(),setTimeout(function(){"on"===e.sound&&cc.audioEngine.stopMusic(),"on"===e.sound&&cc.audioEngine.play(e.gameOverClip,!1,1),e.highScore=Math.max(e.highScore,Math.round(e.score)),cc.sys.localStorage.setItem("massplay.drop.highscore",e.highScore),e.uiController.updateResultScoreLabel(e.score,e.highScore),e.uiController.showPopup("result")},600))},resumeGame:function(){cc.director.resume(),this.uiController.hidePopup()},quitGame:function(){var e=this;cc.audioEngine.pauseAll(),this.uiController.showLoading(),n.default.showAds("browse",!1,function(t){e.uiController.hideLoading(),cc.audioEngine.resumeAll();var i=new Object;i.adType="Interstitial",i.gameName=n.default.getAppName(),i.gameFeature="interstitialAD_home",i.weblinkSource=n.default.getWeblinkSource(),t?n.default.gtaPushEvent("AdShowSuccess",i):n.default.gtaPushEvent("AdShowFail",i),t&&cc.director.loadScene("landing")})},restartGame:function(){var e=this;cc.audioEngine.pauseAll(),this.uiController.showLoading(),n.default.showAds("reward",!1,function(t){e.uiController.hideLoading(),cc.audioEngine.resumeAll();var i=new Object;i.adType="Reward",i.gameName=n.default.getAppName(),i.gameFeature="rewardAD_rePlay",i.weblinkSource=n.default.getWeblinkSource(),t?n.default.gtaPushEvent("AdShowSuccess",i):n.default.gtaPushEvent("AdShowFail",i),t&&(cc.sys.localStorage.setItem("isFirstTime",0),cc.sys.localStorage.setItem("initScore",e.score),cc.director.loadScene("ingame"))})},onToggleSound:function(){this.sound="on"===this.sound?"off":"on",cc.sys.localStorage.setItem("massplay.drop.sound",this.sound),this.uiController.updateSoundToggle("on"===this.sound),this.updateBgm()},updateBgm:function(){cc.audioEngine.isMusicPlaying()&&"off"===this.sound?cc.audioEngine.stopAll():cc.audioEngine.isMusicPlaying()||"on"!==this.sound||cc.audioEngine.playMusic(this.bgm,!0)},onKeyDown:function(e){switch(e.keyCode){case cc.macro.KEY.left:case cc.macro.KEY.dpadLeft:this.isLeftPressed=!0;break;case cc.macro.KEY.right:case cc.macro.KEY.dpadRight:this.isRightPressed=!0}},onKeyUp:function(e){switch(e.keyCode){case cc.macro.KEY.left:case cc.macro.KEY.dpadLeft:this.isLeftPressed=!1;break;case cc.macro.KEY.right:case cc.macro.KEY.dpadRight:this.isRightPressed=!1}},onTouchStart:function(){this.isTouching=!0,this.touchX=0},onTouchMove:function(e){this.isTouching&&(this.touchX/e.getDelta().x<0&&(this.touchX=0),this.touchX+=50*e.getDelta().x)},onTouchEnd:function(){this.isTouching=!1}}),cc._RF.pop()},{"./block":"block","./ingameUICtor":"ingameUICtor","./libs/helpers":"helpers","./libs/perlin":"perlin","./pickup":"pickup"}],ingameUICtor:[function(e,t){"use strict";cc._RF.push(t,"7bb42GScFVC54uXdQ4eXL54","ingameUICtor"),cc.Class({extends:cc.Component,properties:{popupOverlay:cc.Node,resultPopup:cc.Node,helpPopup:cc.Node,pausePopup:cc.Node,readyLabel:cc.Node,scoreLabel:cc.Label,highscoreLabel:cc.Label,scoreResultLabel:cc.Label,highscoreResultLabel:cc.Label,soundButtonSprite:cc.Sprite,soundOnSprite:cc.SpriteFrame,soundOffSprite:cc.SpriteFrame,scoreEffect:cc.Node,helpIcon:cc.Node,homeBtn:{default:null,type:cc.Node},restartBtn:{default:null,type:cc.Node},homeBtn0:{default:null,type:cc.Node},restartBtn0:{default:null,type:cc.Node},loading:{default:null,type:cc.Node}},onLoad:function(){this.hideReadyLabel(),this.hidePopup()},start:function(){this.screenHeight=cc.winSize.height;var e=-(this.screenHeight-600)/2;this.popupOverlay.y=e,this.resultPopup.y=e,this.helpPopup.y=e,this.pausePopup.y=e,this.readyLabel.y=e,this.helpIcon.y=-(this.screenHeight-600)/2+this.screenHeight/2-370,this.popupOverlay.height=this.screenHeight},hidePopup:function(){this.popupOverlay.active=!1,this.resultPopup.active=!1,this.helpPopup.active=!1,this.pausePopup.active=!1},showPopup:function(e){switch(this.hidePopup(),this.popupOverlay.active=!0,e){case"pause":this.pausePopup.active=!0,this.restartBtn.active="1"===cc.sys.localStorage.getItem("isFirstTime"),this.homeBtn.x="1"===cc.sys.localStorage.getItem("isFirstTime")?-75:0;break;case"help":this.helpPopup.active=!0;break;case"result":this.resultPopup.active=!0,this.restartBtn0.active="1"===cc.sys.localStorage.getItem("isFirstTime"),this.homeBtn0.x="1"===cc.sys.localStorage.getItem("isFirstTime")?-100:0}},showLoading:function(){this.loading.active=!0},hideLoading:function(){this.loading.active=!1},hideReadyLabel:function(){this.readyLabel.active=!1},showReadyLabel:function(){this.readyLabel.active=!0},addScoreEffect:function(e){this.scoreEffect.getComponent("scoreEffect").animate(e)},updateScoreLabel:function(e,t){this.scoreLabel.string=Math.round(e),this.highscoreLabel.string=t},updateResultScoreLabel:function(e,t){this.scoreResultLabel.string=Math.round(e),this.highscoreResultLabel.string=t,Math.round(e)===t&&(this.scoreResultLabel.node.color=cc.color("#E7CC40"),this.highscoreResultLabel.node.color=cc.color("#E7CC40"))},updateSoundToggle:function(e){this.soundButtonSprite.spriteFrame=e?this.soundOnSprite:this.soundOffSprite},stopHelpIcon:function(){this.helpIcon.getComponent("helpIcon").stop()},onResumeClicked:function(){"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1),this.ingameController.resumeGame(),this.hidePopup()},onHelpClicked:function(){"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1),this.ingameController.helpOpen()},onPauseClicked:function(){"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1),this.ingameController.pauseGame()},onRestartClicked:function(){"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1),this.ingameController.restartGame()},onSoundClicked:function(){this.ingameController.onToggleSound(),"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1)},onQuitClicked:function(){"on"===this.ingameController.sound&&cc.audioEngine.play(this.ingameController.clickClip,!1),this.ingameController.quitGame()}}),cc._RF.pop()},{}],landingCtor:[function(e,t){"use strict";cc._RF.push(t,"ce4baYvJeFD6Jgwr6IrucOp","landingCtor");var i=e("h5ad"),o=e("./libs/helpers");cc.Class({extends:cc.Component,properties:{helpPopup:cc.Node,soundButtonSprite:cc.Sprite,soundOnSprite:cc.SpriteFrame,soundOffSprite:cc.SpriteFrame,bgm:cc.AudioClip,clickClip:cc.AudioClip},onLoad:function(){o.gtaInit("321085","0033cb7f59e3cd9a32e9a1abd8807afa");var e={weblinkSource:o.getWeblinkSource(),gameName:o.getAppName(),version:"1.0.0"};o.gtaSetUserProperties(e),o.gtaPushEvent("gameSession",e),this.sound=cc.sys.localStorage.getItem("massplay.drop.sound")||"on",cc.audioEngine.setMusicVolume(.6),this.updateSoundToggle("on"===this.sound),cc.sys.localStorage.setItem("isFirstTime",1),i.onStart({icon:o.getResourceUrl("icon"),color:"#1E5880",afterBreak:function(){var e=new Object;e.adType="Interstitial",e.gameName=o.getAppName(),e.weblinkSource=o.getWeblinkSource(),e.gameFeature="interstitialAD_start",o.gtaPushEvent("AdShowSuccess",e)},adBreakTimeout:3e3})},start:function(){this.helpPopup.active=!1},onPlayClicked:function(){"on"===this.sound&&cc.audioEngine.play(this.clickClip,!1),cc.director.loadScene("ingame")},onHelpClicked:function(){"on"===this.sound&&cc.audioEngine.play(this.clickClip,!1),this.helpPopup.active=!0},onHelpClosedClicked:function(){"on"===this.sound&&cc.audioEngine.play(this.clickClip,!1),this.helpPopup.active=!1},onToggleSoundClicked:function(){this.sound="on"===this.sound?"off":"on",cc.sys.localStorage.setItem("massplay.drop.sound",this.sound),this.updateSoundToggle("on"===this.sound),"on"===this.sound&&cc.audioEngine.play(this.clickClip,!1)},updateSoundToggle:function(e){this.soundButtonSprite.spriteFrame=e?this.soundOnSprite:this.soundOffSprite}}),cc._RF.pop()},{"./libs/helpers":"helpers",h5ad:1}],loading:[function(e,t){"use strict";cc._RF.push(t,"34e7aFW/uVFVIfXycZW6RWT","loading"),cc.Class({extends:cc.Component,properties:{cycleIcon:{default:null,type:cc.Node},heartIcon:{default:null,type:cc.Node},_timeout:null},onEnable:function(){},startCountDown:function(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(function(){e&&e(),Global.panel.closeLoading()},t)},set:function(e,t){this[e]=t},get:function(e){return this[e]}}),cc._RF.pop()},{}],perlin:[function(e,t){"use strict";function i(e,t,i){this.x=e,this.y=t,this.z=i}cc._RF.push(t,"bd596Ss6v1BuIwW9SnsQQSk","perlin"),i.prototype.dot2=function(e,t){return this.x*e+this.y*t},i.prototype.dot3=function(e,t,i){return this.x*e+this.y*t+this.z*i};var o=[new i(1,1,0),new i(-1,1,0),new i(1,-1,0),new i(-1,-1,0),new i(1,0,1),new i(-1,0,1),new i(1,0,-1),new i(-1,0,-1),new i(0,1,1),new i(0,-1,1),new i(0,1,-1),new i(0,-1,-1)],n=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],s=new Array(512),c=new Array(512);t.exports.seed=function(e){e>0&&e<1&&(e*=65536),(e=Math.floor(e))<256&&(e|=e<<8);for(var t=0;t<256;t++){var i;i=1&t?n[t]^255&e:n[t]^e>>8&255,s[t]=s[t+256]=i,c[t]=c[t+256]=o[i%12]}},t.exports.seed(0);var a=.5*(Math.sqrt(3)-1),r=(3-Math.sqrt(3))/6;function l(e){return e*e*e*(e*(6*e-15)+10)}function h(e,t,i){return(1-i)*e+i*t}t.exports.simplex2=function(e,t){var i,o,n=(e+t)*a,l=Math.floor(e+n),h=Math.floor(t+n),u=(l+h)*r,p=e-l+u,d=t-h+u;p>d?(i=1,o=0):(i=0,o=1);var g=p-i+r,f=d-o+r,m=p-1+2*r,y=d-1+2*r,b=c[(l&=255)+s[h&=255]],v=c[l+i+s[h+o]],C=c[l+1+s[h+1]],k=.5-p*p-d*d,w=.5-g*g-f*f,S=.5-m*m-y*y;return 70*((k<0?0:(k*=k)*k*b.dot2(p,d))+(w<0?0:(w*=w)*w*v.dot2(g,f))+(S<0?0:(S*=S)*S*C.dot2(m,y)))},t.exports.simplex3=function(e,t,i){var o,n,a,r,l,h,u=(e+t+i)*(1/3),p=Math.floor(e+u),d=Math.floor(t+u),g=Math.floor(i+u),f=(p+d+g)*(1/6),m=e-p+f,y=t-d+f,b=i-g+f;m>=y?y>=b?(o=1,n=0,a=0,r=1,l=1,h=0):m>=b?(o=1,n=0,a=0,r=1,l=0,h=1):(o=0,n=0,a=1,r=1,l=0,h=1):y<b?(o=0,n=0,a=1,r=0,l=1,h=1):m<b?(o=0,n=1,a=0,r=0,l=1,h=1):(o=0,n=1,a=0,r=1,l=1,h=0);var v=m-o+1/6,C=y-n+1/6,k=b-a+1/6,w=m-r+1/6*2,S=y-l+1/6*2,P=b-h+1/6*2,B=m-1+.5,F=y-1+.5,T=b-1+.5,E=c[(p&=255)+s[(d&=255)+s[g&=255]]],R=c[p+o+s[d+n+s[g+a]]],x=c[p+r+s[d+l+s[g+h]]],_=c[p+1+s[d+1+s[g+1]]],I=.6-m*m-y*y-b*b,L=.6-v*v-C*C-k*k,A=.6-w*w-S*S-P*P,M=.6-B*B-F*F-T*T;return 32*((I<0?0:(I*=I)*I*E.dot3(m,y,b))+(L<0?0:(L*=L)*L*R.dot3(v,C,k))+(A<0?0:(A*=A)*A*x.dot3(w,S,P))+(M<0?0:(M*=M)*M*_.dot3(B,F,T)))},t.exports.perlin2=function(e,t){var i=Math.floor(e),o=Math.floor(t);e-=i,t-=o;var n=c[(i&=255)+s[o&=255]].dot2(e,t),a=c[i+s[o+1]].dot2(e,t-1),r=c[i+1+s[o]].dot2(e-1,t),u=c[i+1+s[o+1]].dot2(e-1,t-1),p=l(e);return h(h(n,r,p),h(a,u,p),l(t))},t.exports.perlin3=function(e,t,i){var o=Math.floor(e),n=Math.floor(t),a=Math.floor(i);e-=o,t-=n,i-=a;var r=c[(o&=255)+s[(n&=255)+s[a&=255]]].dot3(e,t,i),u=c[o+s[n+s[a+1]]].dot3(e,t,i-1),p=c[o+s[n+1+s[a]]].dot3(e,t-1,i),d=c[o+s[n+1+s[a+1]]].dot3(e,t-1,i-1),g=c[o+1+s[n+s[a]]].dot3(e-1,t,i),f=c[o+1+s[n+s[a+1]]].dot3(e-1,t,i-1),m=c[o+1+s[n+1+s[a]]].dot3(e-1,t-1,i),y=c[o+1+s[n+1+s[a+1]]].dot3(e-1,t-1,i-1),b=l(e),v=l(t),C=l(i);return h(h(h(r,g,b),h(u,f,b),C),h(h(p,m,b),h(d,y,b),C),v)},cc._RF.pop()},{}],pickup:[function(e,t){"use strict";cc._RF.push(t,"b13ff37Sp5LU6CvtWX6uTD8","pickup");var i=[5,10,25,50,100,200,500],o=[10,8,5,2,1,.5,.1];cc.Class({extends:cc.Component,properties:{typeFrames:[cc.SpriteFrame]},onLoad:function(){},start:function(){},setRandomType:function(){var e=0;o.forEach(function(t){e+=t});for(var t=Math.random()*e,i=0,n=0;n<o.length;n++){var s=o[n];if(t<s){i=n;break}t-=s}this.setType(i)},setType:function(e){this.getComponent(cc.Sprite).spriteFrame=this.typeFrames[e],this.score=i[e]},update:function(){}}),cc._RF.pop()},{}],scoreEffect:[function(e,t){"use strict";cc._RF.push(t,"f5ee51SSFFAN5ZXXD5UraIq","scoreEffect"),cc.Class({extends:cc.Component,properties:{},start:function(){this.node.opacity=0},animate:function(e){this.getComponent(cc.Label).string="+"+e,this.node.getParent().getComponent(cc.Label)._forceUpdateRenderData(),this.node.position=cc.v2(this.node.getParent().width,0),this.tween&&this.tween.stop(),this.tween=cc.tween(this.node).to(.1,{position:cc.v2(this.node.x,-26),opacity:255}).delay(.4).to(.15,{position:cc.v2(this.node.x,0),opacity:0}).start()}}),cc._RF.pop()},{}],spike:[function(e,t){"use strict";cc._RF.push(t,"6d884VdxFVHp4E6MFk25Cm0","spike"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.zIndex=-10},start:function(){},setType:function(){},update:function(){}}),cc._RF.pop()},{}]},{},["backdrop","ball","block","helpIcon","ingameCtor","ingameUICtor","landingCtor","helpers","perlin","loading","pickup","scoreEffect","spike"]);