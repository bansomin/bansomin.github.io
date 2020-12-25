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
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af441kHyZNLBr0k5Fh8yE3c", "en");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages["en"] = {
      label_text: {
        ok: "OK",
        on: "On",
        off: "Off",
        play: "Play",
        stage: "STAGE",
        notice: "Notice",
        select: "Select",
        setting: "Setting",
        language: "Language",
        English: "English",
        Japanese: "Japanese",
        continue: "Continue",
        fox: "Fox",
        pig: "Pig",
        tiger: "Tiger",
        rankings: "Rankings",
        friendranking: "Friend Ranking",
        weeklyranking: "Weekly Ranking",
        matchwithfriend: "Match With Friend",
        welcome: "WELCOME",
        nothanks: "No Thanks",
        dearplayer: "Dear Player",
        trymore: "Try One More Time",
        nopopup: "No more pop-up today",
        highestscore: "HIGHEST SCORE",
        highest: "HIGHEST",
        score: "SCORE",
        coming: "Coming soon...",
        howtoplay: "How to Play"
      },
      tips_text: {
        showtime: "Show Time!",
        novideo: "Sorry,no videoes available to watch right now.Please try again later!"
      }
    };
    cc._RF.pop();
  }, {} ],
  jp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b391b19eO9AfZpwfb4k3mW7", "jp");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages["jp"] = {
      label_text: {
        ok: "\u30aa\u30fc\u30b1\u30fc",
        on: "\u30aa\u30f3",
        off: "\u30aa\u30d5",
        play: "\u30d7\u30ec\u30a4",
        stage: "\u30b9\u30c6\u30fc\u30b8",
        notice: "\u304a\u77e5\u3089\u305b",
        select: "\u9078\u629e",
        setting: "\u8a2d\u5b9a",
        language: "\u8a00\u8a9e",
        English: "\u82f1\u8a9e",
        Japanese: "\u65e5\u672c\u8a9e",
        continue: "\u30bb\u30ab\u30f3\u30c9\u30c1\u30e3\u30f3\u30b9",
        fox: "\u72d0",
        pig: "\u8c5a",
        tiger: "\u864e",
        rankings: "\u30e9\u30f3\u30ad\u30f3\u30b0",
        friendranking: "\u53cb\u9054\u30e9\u30f3\u30ad\u30f3\u30b0",
        weeklyranking: "\u6bce\u9031\u306e\u30e9\u30f3\u30ad\u30f3\u30b0",
        matchwithfriend: "\u53cb\u9054\u3068\u904a\u3076",
        welcome: "\u3088\u3046\u3053\u305d",
        nothanks: "\u7d50\u69cb \u3067\u3059",
        dearplayer: "\u7686\u3055\u3093",
        trymore: "\u518d\u30d7\u30ec\u30a4",
        nopopup: "\u9589\u3058\u308b",
        highestscore: "\u6700\u9ad8\u30b9\u30b3\u30a2",
        highest: "\u6700\u9ad8",
        score: "\u30b9\u30b3\u30a2",
        coming: "\u958b\u767a\u4e2d...",
        howtoplay: "\u904a\u3073\u65b9"
      },
      tips_text: {
        showtime: "\u30a2\u30bf\u30c3\u30af !",
        novideo: "\u7533\u3057\u8a33\u3042\u308a\u307e\u305b\u3093\u304c\u3001\u73fe\u5728\u8996\u8074\u3059\u308b\u52d5\u753b\u306f\u3042\u308a\u307e\u305b\u3093\u3002 \u5f8c\u3067\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002"
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "en", "jp" ]);