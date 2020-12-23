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
      128: "#E8C65F",
      256: "#E7C34F",
      512: "#78C93A",
      1024: "#C9963A",
      2048: "#C2BC2F"
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
  1: [ function(require, module, exports) {
    (function(global, factory) {
      "object" === typeof exports && "undefined" !== typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define(factory) : global.moment = factory();
    })(this, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback) {
        hookCallback = callback;
      }
      function isArray(input) {
        return input instanceof Array || "[object Array]" === Object.prototype.toString.call(input);
      }
      function isObject(input) {
        return null != input && "[object Object]" === Object.prototype.toString.call(input);
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(obj).length;
        var k;
        for (k in obj) if (hasOwnProp(obj, k)) return false;
        return true;
      }
      function isUndefined(input) {
        return void 0 === input;
      }
      function isNumber(input) {
        return "number" === typeof input || "[object Number]" === Object.prototype.toString.call(input);
      }
      function isDate(input) {
        return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input);
      }
      function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
        return res;
      }
      function extend(a, b) {
        for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
        hasOwnProp(b, "toString") && (a.toString = b.toString);
        hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf);
        return a;
      }
      function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        null == m._pf && (m._pf = defaultParsingFlags());
        return m._pf;
      }
      var some;
      some = Array.prototype.some ? Array.prototype.some : function(fun) {
        var t = Object(this), len = t.length >>> 0, i;
        for (i = 0; i < len; i++) if (i in t && fun.call(this, t[i], i, t)) return true;
        return false;
      };
      function isValid(m) {
        if (null == m._isValid) {
          var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
            return null != i;
          }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          m._strict && (isNowValid = isNowValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour);
          if (null != Object.isFrozen && Object.isFrozen(m)) return isNowValid;
          m._isValid = isNowValid;
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = true;
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to, from) {
        var i, prop, val;
        isUndefined(from._isAMomentObject) || (to._isAMomentObject = from._isAMomentObject);
        isUndefined(from._i) || (to._i = from._i);
        isUndefined(from._f) || (to._f = from._f);
        isUndefined(from._l) || (to._l = from._l);
        isUndefined(from._strict) || (to._strict = from._strict);
        isUndefined(from._tzm) || (to._tzm = from._tzm);
        isUndefined(from._isUTC) || (to._isUTC = from._isUTC);
        isUndefined(from._offset) || (to._offset = from._offset);
        isUndefined(from._pf) || (to._pf = getParsingFlags(from));
        isUndefined(from._locale) || (to._locale = from._locale);
        if (momentProperties.length > 0) for (i = 0; i < momentProperties.length; i++) {
          prop = momentProperties[i];
          val = from[prop];
          isUndefined(val) || (to[prop] = val);
        }
        return to;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(null != config._d ? config._d.getTime() : NaN);
        this.isValid() || (this._d = new Date(NaN));
        if (false === updateInProgress) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || null != obj && null != obj._isAMomentObject;
      }
      function warn(msg) {
        false === hooks.suppressDeprecationWarnings && "undefined" !== typeof console && console.warn && console.warn("Deprecation warning: " + msg);
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          null != hooks.deprecationHandler && hooks.deprecationHandler(null, msg);
          if (firstTime) {
            var args = [], arg, i, key;
            for (i = 0; i < arguments.length; i++) {
              arg = "";
              if ("object" === typeof arguments[i]) {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) hasOwnProp(arguments[0], key) && (arg += key + ": " + arguments[0][key] + ", ");
                arg = arg.slice(0, -2);
              } else arg = arguments[i];
              args.push(arg);
            }
            warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        null != hooks.deprecationHandler && hooks.deprecationHandler(name, msg);
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction(input) {
        return "undefined" !== typeof Function && input instanceof Function || "[object Function]" === Object.prototype.toString.call(input);
      }
      function set(config) {
        var prop, i;
        for (i in config) if (hasOwnProp(config, i)) {
          prop = config[i];
          isFunction(prop) ? this[i] = prop : this["_" + i] = prop;
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) if (hasOwnProp(childConfig, prop)) if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else null != childConfig[prop] ? res[prop] = childConfig[prop] : delete res[prop];
        for (prop in parentConfig) hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop]) && (res[prop] = extend({}, res[prop]));
        return res;
      }
      function Locale(config) {
        null != config && this.set(config);
      }
      var keys;
      keys = Object.keys ? Object.keys : function(obj) {
        var i, res = [];
        for (i in obj) hasOwnProp(obj, i) && res.push(i);
        return res;
      };
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        "string" === typeof callback && (func = function() {
          return this[callback]();
        });
        token && (formatTokenFunctions[token] = func);
        padded && (formatTokenFunctions[padded[0]] = function() {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        });
        ordinal && (formatTokenFunctions[ordinal] = function() {
          return this.localeData().ordinal(func.apply(this, arguments), token);
        });
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) return input.replace(/^\[|\]$/g, "");
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
        return function(mom) {
          var output = "", i;
          for (i = 0; i < length; i++) output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
          return output;
        };
      }
      function formatMoment(m, format) {
        if (!m.isValid()) return m.localeData().invalidDate();
        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
        return formatFunctions[format](m);
      }
      function expandFormat(format, locale) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
          format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) return format;
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if ("MMMM" === tok || "MM" === tok || "DD" === tok || "dddd" === tok) return tok.slice(1);
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
      }
      var aliases = {};
      function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
      }
      function normalizeUnits(units) {
        return "string" === typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]);
        }
        return normalizedInput;
      }
      var priorities = {};
      function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
      }
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) hasOwnProp(unitsObj, u) && units.push({
          unit: u,
          priority: priorities[u]
        });
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      function absFloor(number) {
        return number < 0 ? Math.ceil(number) || 0 : Math.floor(number);
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber));
        return value;
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (null != value) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          }
          return get(this, unit);
        };
      }
      function get(mom, unit) {
        return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
      }
      function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) if ("FullYear" === unit && isLeapYear(mom.year()) && 1 === mom.month() && 29 === mom.date()) {
          value = toInt(value);
          mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
        } else mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) return this[units]();
        return this;
      }
      function stringSet(units, value) {
        if ("object" === typeof units) {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i;
          for (i = 0; i < prioritized.length; i++) this[prioritized[i].unit](units[prioritized[i].unit]);
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) return this[units](value);
        }
        return this;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
      regexes = {};
      function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) return new RegExp(unescapeFormat(token));
        return regexes[token](config._strict, config._locale);
      }
      function unescapeFormat(s) {
        return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
          return p1 || p2 || p3 || p4;
        }));
      }
      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      var tokens = {};
      function addParseToken(token, callback) {
        var i, func = callback;
        "string" === typeof token && (token = [ token ]);
        isNumber(callback) && (func = function(input, array) {
          array[callback] = toInt(input);
        });
        for (i = 0; i < token.length; i++) tokens[token[i]] = func;
      }
      function addWeekParseToken(token, callback) {
        addParseToken(token, function(input, array, config, token) {
          config._w = config._w || {};
          callback(input, config._w, config, token);
        });
      }
      function addTimeToArrayFromToken(token, input, config) {
        null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token);
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      indexOf = Array.prototype.indexOf ? Array.prototype.indexOf : function(o) {
        var i;
        for (i = 0; i < this.length; ++i) if (this[i] === o) return i;
        return -1;
      };
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) return NaN;
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return 1 === modMonth ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", [ "MM", 2 ], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format) {
        return this.localeData().monthsShort(this, format);
      });
      addFormatToken("MMMM", 0, 0, function(format) {
        return this.localeData().months(this, format);
      });
      addUnitAlias("month", "M");
      addUnitPriority("month", 8);
      addRegexToken("M", match1to2);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale) {
        return locale.monthsRegex(isStrict);
      });
      addParseToken([ "M", "MM" ], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken([ "MMM", "MMMM" ], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input;
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format) {
        if (!m) return isArray(this._months) ? this._months : this._months["standalone"];
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format) {
        if (!m) return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([ 2e3, i ]);
            this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if ("MMM" === format) {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return -1 !== ii ? ii : null;
          }
          ii = indexOf.call(this._longMonthsParse, llc);
          return -1 !== ii ? ii : null;
        }
        if ("MMM" === format) {
          ii = indexOf.call(this._shortMonthsParse, llc);
          if (-1 !== ii) return ii;
          ii = indexOf.call(this._longMonthsParse, llc);
          return -1 !== ii ? ii : null;
        }
        ii = indexOf.call(this._longMonthsParse, llc);
        if (-1 !== ii) return ii;
        ii = indexOf.call(this._shortMonthsParse, llc);
        return -1 !== ii ? ii : null;
      }
      function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) return handleStrictParse.call(this, monthName, format, strict);
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([ 2e3, i ]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && "MMMM" === format && this._longMonthsParse[i].test(monthName)) return i;
          if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName)) return i;
          if (!strict && this._monthsParse[i].test(monthName)) return i;
        }
      }
      function setMonth(mom, value) {
        var dayOfMonth;
        if (!mom.isValid()) return mom;
        if ("string" === typeof value) if (/^\d+$/.test(value)) value = toInt(value); else {
          value = mom.localeData().monthsParse(value);
          if (!isNumber(value)) return mom;
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom;
      }
      function getSetMonth(value) {
        if (null != value) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        }
        return get(this, "Month");
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this);
          return isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
        hasOwnProp(this, "_monthsShortRegex") || (this._monthsShortRegex = defaultMonthsShortRegex);
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this);
          return isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
        hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = defaultMonthsRegex);
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
        for (i = 0; i < 12; i++) {
          mom = createUTC([ 2e3, i ]);
          shortPieces.push(this.monthsShort(mom, ""));
          longPieces.push(this.months(mom, ""));
          mixedPieces.push(this.months(mom, ""));
          mixedPieces.push(this.monthsShort(mom, ""));
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) mixedPieces[i] = regexEscape(mixedPieces[i]);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
      }
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, [ "YY", 2 ], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, [ "YYYY", 4 ], 0, "year");
      addFormatToken(0, [ "YYYYY", 5 ], 0, "year");
      addFormatToken(0, [ "YYYYYY", 6, true ], 0, "year");
      addUnitAlias("year", "y");
      addUnitPriority("year", 1);
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken([ "YYYYY", "YYYYYY" ], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = 2 === input.length ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function createDate(y, m, d, h, M, s, ms) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d, h, M, s, ms);
          isFinite(date.getFullYear()) && date.setFullYear(y);
        } else date = new Date(y, m, d, h, M, s, ms);
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          isFinite(date.getUTCFullYear()) && date.setUTCFullYear(y);
        } else date = new Date(Date.UTC.apply(null, arguments));
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", [ "ww", 2 ], "wo", "week");
      addFormatToken("W", [ "WW", 2 ], "Wo", "isoWeek");
      addUnitAlias("week", "w");
      addUnitAlias("isoWeek", "W");
      addUnitPriority("week", 5);
      addUnitPriority("isoWeek", 5);
      addRegexToken("w", match1to2);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken([ "w", "ww", "W", "WW" ], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
      });
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        doy: 6
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return null == input ? week : this.add(7 * (input - week), "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return null == input ? week : this.add(7 * (input - week), "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format);
      });
      addFormatToken("ddd", 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format);
      });
      addFormatToken("dddd", 0, 0, function(format) {
        return this.localeData().weekdays(this, format);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addUnitAlias("day", "d");
      addUnitAlias("weekday", "e");
      addUnitAlias("isoWeekday", "E");
      addUnitPriority("day", 11);
      addUnitPriority("weekday", 11);
      addUnitPriority("isoWeekday", 11);
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
      });
      addWeekParseToken([ "dd", "ddd", "dddd" ], function(input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input;
      });
      addWeekParseToken([ "d", "e", "E" ], function(input, week, config, token) {
        week[token] = toInt(input);
      });
      function parseWeekday(input, locale) {
        if ("string" !== typeof input) return input;
        if (!isNaN(input)) return parseInt(input, 10);
        input = locale.weekdaysParse(input);
        if ("number" === typeof input) return input;
        return null;
      }
      function parseIsoWeekday(input, locale) {
        if ("string" === typeof input) return locale.weekdaysParse(input) % 7 || 7;
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && true !== m && this._weekdays.isFormat.test(format) ? "format" : "standalone"];
        return true === m ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return true === m ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return true === m ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([ 2e3, 1 ]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if ("dddd" === format) {
            ii = indexOf.call(this._weekdaysParse, llc);
            return -1 !== ii ? ii : null;
          }
          if ("ddd" === format) {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return -1 !== ii ? ii : null;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return -1 !== ii ? ii : null;
        }
        if ("dddd" === format) {
          ii = indexOf.call(this._weekdaysParse, llc);
          if (-1 !== ii) return ii;
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (-1 !== ii) return ii;
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return -1 !== ii ? ii : null;
        }
        if ("ddd" === format) {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (-1 !== ii) return ii;
          ii = indexOf.call(this._weekdaysParse, llc);
          if (-1 !== ii) return ii;
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return -1 !== ii ? ii : null;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        if (-1 !== ii) return ii;
        ii = indexOf.call(this._weekdaysParse, llc);
        if (-1 !== ii) return ii;
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return -1 !== ii ? ii : null;
      }
      function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) return handleStrictParse$1.call(this, weekdayName, format, strict);
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([ 2e3, 1 ]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
            this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
            this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && "dddd" === format && this._fullWeekdaysParse[i].test(weekdayName)) return i;
          if (strict && "ddd" === format && this._shortWeekdaysParse[i].test(weekdayName)) return i;
          if (strict && "dd" === format && this._minWeekdaysParse[i].test(weekdayName)) return i;
          if (!strict && this._weekdaysParse[i].test(weekdayName)) return i;
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) return null != input ? this : NaN;
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (null != input) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        }
        return day;
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) return null != input ? this : NaN;
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == input ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) return null != input ? this : NaN;
        if (null != input) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        }
        return this.day() || 7;
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this);
          return isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
        hasOwnProp(this, "_weekdaysRegex") || (this._weekdaysRegex = defaultWeekdaysRegex);
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this);
          return isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
        hasOwnProp(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = defaultWeekdaysShortRegex);
        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this);
          return isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
        hasOwnProp(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = defaultWeekdaysMinRegex);
        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([ 2e3, 1 ]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
        this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
        this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", [ "HH", 2 ], 0, "hour");
      addFormatToken("h", [ "hh", 2 ], 0, hFormat);
      addFormatToken("k", [ "kk", 2 ], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
          return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      addUnitAlias("hour", "h");
      addUnitPriority("hour", 13);
      function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2);
      addRegexToken("h", match1to2);
      addRegexToken("k", match1to2);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken([ "H", "HH" ], HOUR);
      addParseToken([ "k", "kk" ], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = 24 === kInput ? 0 : kInput;
      });
      addParseToken([ "a", "A" ], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken([ "h", "hh" ], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return "p" === (input + "").toLowerCase().charAt(0);
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours, minutes, isLower) {
        return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM";
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) if (arr1[i] !== arr2[i]) return i;
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names) {
        var i = 0, j, next, locale, split;
        while (i < names.length) {
          split = normalizeLocale(names[i]).split("-");
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale = loadLocale(split.slice(0, j).join("-"));
            if (locale) return locale;
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) break;
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (void 0 === locales[name] && "undefined" !== typeof module && module && module.exports) try {
          oldLocale = globalLocale._abbr;
          aliasedRequire = require;
          aliasedRequire("./locale/" + name);
          getSetGlobalLocale(oldLocale);
        } catch (e) {
          locales[name] = null;
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          data = isUndefined(values) ? getLocale(key) : defineLocale(key, values);
          data ? globalLocale = data : "undefined" !== typeof console && console.warn && console.warn("Locale " + key + " not found. Did you forget to load it?");
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (null !== config) {
          var locale, parentConfig = baseConfig;
          config.abbr = name;
          if (null != locales[name]) {
            deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
            parentConfig = locales[name]._config;
          } else if (null != config.parentLocale) if (null != locales[config.parentLocale]) parentConfig = locales[config.parentLocale]._config; else {
            locale = loadLocale(config.parentLocale);
            if (null == locale) {
              localeFamilies[config.parentLocale] || (localeFamilies[config.parentLocale] = []);
              localeFamilies[config.parentLocale].push({
                name: name,
                config: config
              });
              return null;
            }
            parentConfig = locale._config;
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          localeFamilies[name] && localeFamilies[name].forEach(function(x) {
            defineLocale(x.name, x.config);
          });
          getSetGlobalLocale(name);
          return locales[name];
        }
        delete locales[name];
        return null;
      }
      function updateLocale(name, config) {
        if (null != config) {
          var locale, tmpLocale, parentConfig = baseConfig;
          if (null != locales[name] && null != locales[name].parentLocale) locales[name].set(mergeConfigs(locales[name]._config, config)); else {
            tmpLocale = loadLocale(name);
            null != tmpLocale && (parentConfig = tmpLocale._config);
            config = mergeConfigs(parentConfig, config);
            null == tmpLocale && (config.abbr = name);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;
          }
          getSetGlobalLocale(name);
        } else if (null != locales[name]) if (null != locales[name].parentLocale) {
          locales[name] = locales[name].parentLocale;
          name === getSetGlobalLocale() && getSetGlobalLocale(name);
        } else null != locales[name] && delete locales[name];
        return locales[name];
      }
      function getLocale(key) {
        var locale;
        key && key._locale && key._locale._abbr && (key = key._locale._abbr);
        if (!key) return globalLocale;
        if (!isArray(key)) {
          locale = loadLocale(key);
          if (locale) return locale;
          key = [ key ];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && -2 === getParsingFlags(m).overflow) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE) && (overflow = DATE);
          getParsingFlags(m)._overflowWeeks && -1 === overflow && (overflow = WEEK);
          getParsingFlags(m)._overflowWeekday && -1 === overflow && (overflow = WEEKDAY);
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/ ], [ "YYYY-MM-DD", /\d{4}-\d\d-\d\d/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d\d-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d\d/, false ], [ "YYYY-DDD", /\d{4}-\d{3}/ ], [ "YYYY-MM", /\d{4}-\d\d/, false ], [ "YYYYYYMMDD", /[+-]\d{10}/ ], [ "YYYYMMDD", /\d{8}/ ], [ "GGGG[W]WWE", /\d{4}W\d{3}/ ], [ "GGGG[W]WW", /\d{4}W\d{2}/, false ], [ "YYYYDDD", /\d{7}/ ], [ "YYYYMM", /\d{6}/, false ], [ "YYYY", /\d{4}/, false ] ], isoTimes = [ [ "HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/ ], [ "HH:mm:ss", /\d\d:\d\d:\d\d/ ], [ "HH:mm", /\d\d:\d\d/ ], [ "HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/ ], [ "HHmmss,SSSS", /\d\d\d\d\d\d,\d+/ ], [ "HHmmss", /\d\d\d\d\d\d/ ], [ "HHmm", /\d\d\d\d/ ], [ "HH", /\d\d/ ] ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDates.length; i < l; i++) if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = false !== isoDates[i][2];
            break;
          }
          if (null == dateFormat) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) if (isoTimes[i][1].exec(match[3])) {
              timeFormat = (match[2] || " ") + isoTimes[i][0];
              break;
            }
            if (null == timeFormat) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && null != timeFormat) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (!tzRegex.exec(match[4])) {
              config._isValid = false;
              return;
            }
            tzFormat = "Z";
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else config._isValid = false;
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [ untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10) ];
        secondStr && result.push(parseInt(secondStr, 10));
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) return 2e3 + year;
        if (year <= 999) return 1900 + year;
        return year;
      }
      function preprocessRFC2822(s) {
        return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) return obsOffsets[obsOffset];
        if (militaryOffset) return 0;
        var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
        return 60 * h + m;
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
          if (!checkWeekday(match[1], parsedArray, config)) return;
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else config._isValid = false;
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (null !== matched) {
          config._d = new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (false !== config._isValid) return;
        delete config._isValid;
        configFromRFC2822(config);
        if (false !== config._isValid) return;
        delete config._isValid;
        config._strict ? config._isValid = false : hooks.createFromInputFallback(config);
      }
      hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
      });
      function defaults(a, b, c) {
        if (null != a) return a;
        if (null != b) return b;
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) return [ nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate() ];
        return [ nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate() ];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) return;
        currentDate = currentDateArray(config);
        config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config);
        if (null != config._dayOfYear) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
          (config._dayOfYear > daysInYear(yearToUse) || 0 === config._dayOfYear) && (getParsingFlags(config)._overflowDayOfYear = true);
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
        for (;i < 7; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
        if (24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND]) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        config._nextDay && (config._a[HOUR] = 24);
        config._w && "undefined" !== typeof config._w.d && config._w.d !== expectedWeekday && (getParsingFlags(config).weekdayMismatch = true);
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (null != w.GG || null != w.W || null != w.E) {
          dow = 1;
          doy = 4;
          weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          (weekday < 1 || weekday > 7) && (weekdayOverflow = true);
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
          week = defaults(w.w, curWeek.week);
          if (null != w.d) {
            weekday = w.d;
            (weekday < 0 || weekday > 6) && (weekdayOverflow = true);
          } else if (null != w.e) {
            weekday = w.e + dow;
            (w.e < 0 || w.e > 6) && (weekdayOverflow = true);
          } else weekday = dow;
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) getParsingFlags(config)._overflowWeeks = true; else if (null != weekdayOverflow) getParsingFlags(config)._overflowWeekday = true; else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {};
      hooks.RFC_2822 = function() {};
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0, era;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped);
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token]) {
            parsedInput ? getParsingFlags(config).empty = false : getParsingFlags(config).unusedTokens.push(token);
            addTimeToArrayFromToken(token, parsedInput, config);
          } else config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        string.length > 0 && getParsingFlags(config).unusedInput.push(string);
        config._a[HOUR] <= 12 && true === getParsingFlags(config).bigHour && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0);
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        era = getParsingFlags(config).era;
        null !== era && (config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]));
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (null == meridiem) return hour;
        if (null != locale.meridiemHour) return locale.meridiemHour(hour, meridiem);
        if (null != locale.isPM) {
          isPm = locale.isPM(meridiem);
          isPm && hour < 12 && (hour += 12);
          isPm || 12 !== hour || (hour = 0);
          return hour;
        }
        return hour;
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false;
        if (0 === config._f.length) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
        }
        for (i = 0; i < config._f.length; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          null != config._useUTC && (tempConfig._useUTC = config._useUTC);
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          isValid(tempConfig) && (validFormatFound = true);
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length;
          getParsingFlags(tempConfig).score = currentScore;
          if (bestFormatIsValid) {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          } else if (null == scoreToBeat || currentScore < scoreToBeat || validFormatFound) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
            validFormatFound && (bestFormatIsValid = true);
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) return;
        var i = normalizeObjectUnits(config._i), dayOrDate = void 0 === i.day ? i.date : i.day;
        config._a = map([ i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond ], function(obj) {
          return obj && parseInt(obj, 10);
        });
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (null === input || void 0 === format && "" === input) return createInvalid({
          nullInput: true
        });
        "string" === typeof input && (config._i = input = config._locale.preparse(input));
        if (isMoment(input)) return new Moment(checkOverflow(input));
        isDate(input) ? config._d = input : isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : configFromInput(config);
        isValid(config) || (config._d = null);
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) config._d = new Date(hooks.now()); else if (isDate(input)) config._d = new Date(input.valueOf()); else if ("string" === typeof input) configFromString(config); else if (isArray(input)) {
          config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else isObject(input) ? configFromObject(config) : isNumber(input) ? config._d = new Date(input) : hooks.createFromInputFallback(config);
      }
      function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        if (true === format || false === format) {
          strict = format;
          format = void 0;
        }
        if (true === locale || false === locale) {
          strict = locale;
          locale = void 0;
        }
        (isObject(input) && isObjectEmpty(input) || isArray(input) && 0 === input.length) && (input = void 0);
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
      }
      var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        return this.isValid() && other.isValid() ? other < this ? this : other : createInvalid();
      }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var other = createLocal.apply(null, arguments);
        return this.isValid() && other.isValid() ? other > this ? this : other : createInvalid();
      });
      function pickBy(fn, moments) {
        var res, i;
        1 === moments.length && isArray(moments[0]) && (moments = moments[0]);
        if (!moments.length) return createLocal();
        res = moments[0];
        for (i = 1; i < moments.length; ++i) moments[i].isValid() && !moments[i][fn](res) || (res = moments[i]);
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +new Date();
      };
      var ordering = [ "year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond" ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i;
        for (key in m) if (hasOwnProp(m, key) && !(-1 !== indexOf.call(ordering, key) && (null == m[key] || !isNaN(m[key])))) return false;
        for (i = 0; i < ordering.length; ++i) if (m[ordering[i]]) {
          if (unitHasDecimal) return false;
          parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]]) && (unitHasDecimal = true);
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || normalizedInput.isoWeek || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 1e3 * hours * 60 * 60;
        this._days = +days + 7 * weeks;
        this._months = +months + 3 * quarters + 12 * years;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        return number < 0 ? -1 * Math.round(-1 * number) : Math.round(number);
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
        return diffs + lengthDiff;
      }
      function offset(token, separator) {
        addFormatToken(token, 0, 0, function() {
          var offset = this.utcOffset(), sign = "+";
          if (offset < 0) {
            offset = -offset;
            sign = "-";
          }
          return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken([ "Z", "ZZ" ], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes;
        if (null === matches) return null;
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || [ "-", 0, 0 ];
        minutes = 60 * parts[1] + toInt(parts[2]);
        return 0 === minutes ? 0 : "+" === parts[0] ? minutes : -minutes;
      }
      function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
          res = model.clone();
          diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff);
          hooks.updateOffset(res, false);
          return res;
        }
        return createLocal(input).local();
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {};
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0, localAdjust;
        if (!this.isValid()) return null != input ? this : NaN;
        if (null != input) {
          if ("string" === typeof input) {
            input = offsetFromString(matchShortOffset, input);
            if (null === input) return this;
          } else Math.abs(input) < 16 && !keepMinutes && (input *= 60);
          !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this));
          this._offset = input;
          this._isUTC = true;
          null != localAdjust && this.add(localAdjust, "m");
          if (offset !== input) if (!keepLocalTime || this._changeInProgress) addSubtract(this, createDuration(input - offset, "m"), 1, false); else if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
          return this;
        }
        return this._isUTC ? offset : getDateOffset(this);
      }
      function getSetZone(input, keepLocalTime) {
        if (null != input) {
          "string" !== typeof input && (input = -input);
          this.utcOffset(input, keepLocalTime);
          return this;
        }
        return -this.utcOffset();
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          keepLocalTime && this.subtract(getDateOffset(this), "m");
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (null != this._tzm) this.utcOffset(this._tzm, false, true); else if ("string" === typeof this._i) {
          var tZone = offsetFromString(matchOffset, this._i);
          null != tZone ? this.utcOffset(tZone) : this.utcOffset(0, true);
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) return false;
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) return this._isDSTShifted;
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else this._isDSTShifted = false;
        return this._isDSTShifted;
      }
      function isLocal() {
        return !!this.isValid() && !this._isUTC;
      }
      function isUtcOffset() {
        return !!this.isValid() && this._isUTC;
      }
      function isUtc() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset);
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign, ret, diffRes;
        if (isDuration(input)) duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months
        }; else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          key ? duration[key] = +input : duration.milliseconds = +input;
        } else if (match = aspNetRegex.exec(input)) {
          sign = "-" === match[1] ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(absRound(1e3 * match[MILLISECOND])) * sign
          };
        } else if (match = isoRegex.exec(input)) {
          sign = "-" === match[1] ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            w: parseIso(match[4], sign),
            d: parseIso(match[5], sign),
            h: parseIso(match[6], sign),
            m: parseIso(match[7], sign),
            s: parseIso(match[8], sign)
          };
        } else if (null == duration) duration = {}; else if ("object" === typeof duration && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale);
        isDuration(input) && hasOwnProp(input, "_isValid") && (ret._isValid = input._isValid);
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + 12 * (other.year() - base.year());
        base.clone().add(res.months, "M").isAfter(other) && --res.months;
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) return {
          milliseconds: 0,
          months: 0
        };
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) res = positiveMomentsDifference(base, other); else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (null !== period && !isNaN(+period)) {
            deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = absRound(duration._days), months = absRound(duration._months);
        if (!mom.isValid()) return;
        updateOffset = null == updateOffset || updateOffset;
        months && setMonth(mom, get(mom, "Month") + months * isAdding);
        days && set$1(mom, "Date", get(mom, "Date") + days * isAdding);
        milliseconds && mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        updateOffset && hooks.updateOffset(mom, days || months);
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return "string" === typeof input || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || null === input || void 0 === input;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [ "years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms" ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        arrayTest && (dataTypeTest = 0 === input.filter(function(item) {
          return !isNumber(item) && isString(input);
        }).length);
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [ "sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse" ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, "days", true);
        return diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (1 === arguments.length) if (isMomentInput(arguments[0])) {
          time = arguments[0];
          formats = void 0;
        } else if (isCalendarSpec(arguments[0])) {
          formats = arguments[0];
          time = void 0;
        }
        var now = time || createLocal(), sod = cloneWithOffset(now, this).startOf("day"), format = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
      }
      function clone() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        return "millisecond" === units ? this.valueOf() > localInput.valueOf() : localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        return "millisecond" === units ? this.valueOf() < localInput.valueOf() : this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
      function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from), localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) return false;
        inclusivity = inclusivity || "()";
        return ("(" === inclusivity[0] ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (")" === inclusivity[1] ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || "millisecond";
        if ("millisecond" === units) return this.valueOf() === localInput.valueOf();
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
      }
      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) return NaN;
        that = cloneWithOffset(input, this);
        if (!that.isValid()) return NaN;
        zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset());
        units = normalizeUnits(units);
        switch (units) {
         case "year":
          output = monthDiff(this, that) / 12;
          break;

         case "month":
          output = monthDiff(this, that);
          break;

         case "quarter":
          output = monthDiff(this, that) / 3;
          break;

         case "second":
          output = (this - that) / 1e3;
          break;

         case "minute":
          output = (this - that) / 6e4;
          break;

         case "hour":
          output = (this - that) / 36e5;
          break;

         case "day":
          output = (this - that - zoneDelta) / 864e5;
          break;

         case "week":
          output = (this - that - zoneDelta) / 6048e5;
          break;

         default:
          output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) return -monthDiff(b, a);
        var wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) return null;
        var utc = true !== keepOffset, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
        if (isFunction(Date.prototype.toISOString)) return utc ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
        return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
      }
      function inspect() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format(inputString) {
        inputString || (inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat);
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from(time, withoutSuffix) {
        return this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid()) ? createDuration({
          to: this,
          from: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to(time, withoutSuffix) {
        return this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid()) ? createDuration({
          from: this,
          to: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale(key) {
        var newLocaleData;
        if (void 0 === key) return this._locale._abbr;
        newLocaleData = getLocale(key);
        null != newLocaleData && (this._locale = newLocaleData);
        return this;
      }
      var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        return void 0 === key ? this.localeData() : this.locale(key);
      });
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = 3506328 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d) {
        return y < 100 && y >= 0 ? new Date(y + 400, m, d) - MS_PER_400_YEARS : new Date(y, m, d).valueOf();
      }
      function utcStartOfDate(y, m, d) {
        return y < 100 && y >= 0 ? Date.UTC(y + 400, m, d) - MS_PER_400_YEARS : Date.UTC(y, m, d);
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (void 0 === units || "millisecond" === units || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
         case "year":
          time = startOfDate(this.year(), 0, 1);
          break;

         case "quarter":
          time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
          break;

         case "month":
          time = startOfDate(this.year(), this.month(), 1);
          break;

         case "week":
          time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
          break;

         case "isoWeek":
          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
          break;

         case "day":
         case "date":
          time = startOfDate(this.year(), this.month(), this.date());
          break;

         case "hour":
          time = this._d.valueOf();
          time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
          break;

         case "minute":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_MINUTE);
          break;

         case "second":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_SECOND);
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (void 0 === units || "millisecond" === units || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
         case "year":
          time = startOfDate(this.year() + 1, 0, 1) - 1;
          break;

         case "quarter":
          time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
          break;

         case "month":
          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
          break;

         case "week":
          time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;

         case "isoWeek":
          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
          break;

         case "day":
         case "date":
          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
          break;

         case "hour":
          time = this._d.valueOf();
          time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
          break;

         case "minute":
          time = this._d.valueOf();
          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
          break;

         case "second":
          time = this._d.valueOf();
          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - 6e4 * (this._offset || 0);
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [ m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond() ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", [ "y", 1 ], "yo", "eraYear");
      addFormatToken("y", [ "yy", 2 ], 0, "eraYear");
      addFormatToken("y", [ "yyy", 3 ], 0, "eraYear");
      addFormatToken("y", [ "yyyy", 4 ], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken([ "N", "NN", "NNN", "NNNN", "NNNNN" ], function(input, array, config, token) {
        var era = config._locale.erasParse(input, token, config._strict);
        era ? getParsingFlags(config).era = era : getParsingFlags(config).invalidEra = input;
      });
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken([ "y", "yy", "yyy", "yyyy" ], YEAR);
      addParseToken([ "yo" ], function(input, array, config, token) {
        var match;
        config._locale._eraYearOrdinalRegex && (match = input.match(config._locale._eraYearOrdinalRegex));
        config._locale.eraYearOrdinalParse ? array[YEAR] = config._locale.eraYearOrdinalParse(input, match) : array[YEAR] = parseInt(input, 10);
      });
      function localeEras(m, format) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
           case "string":
            date = hooks(eras[i].since).startOf("day");
            eras[i].since = date.valueOf();
          }
          switch (typeof eras[i].until) {
           case "undefined":
            eras[i].until = Infinity;
            break;

           case "string":
            date = hooks(eras[i].until).startOf("day").valueOf();
            eras[i].until = date.valueOf();
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) switch (format) {
           case "N":
           case "NN":
           case "NNN":
            if (abbr === eraName) return eras[i];
            break;

           case "NNNN":
            if (name === eraName) return eras[i];
            break;

           case "NNNNN":
            if (narrow === eraName) return eras[i];
          } else if ([ name, abbr, narrow ].indexOf(eraName) >= 0) return eras[i];
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        return void 0 === year ? hooks(era.since).year() : hooks(era.since).year() + (year - era.offset) * dir;
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) return eras[i].name;
          if (eras[i].until <= val && val <= eras[i].since) return eras[i].name;
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) return eras[i].narrow;
          if (eras[i].until <= val && val <= eras[i].since) return eras[i].narrow;
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) return eras[i].abbr;
          if (eras[i].until <= val && val <= eras[i].since) return eras[i].abbr;
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        hasOwnProp(this, "_erasNameRegex") || computeErasParse.call(this);
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        hasOwnProp(this, "_erasAbbrRegex") || computeErasParse.call(this);
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        hasOwnProp(this, "_erasNarrowRegex") || computeErasParse.call(this);
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          namePieces.push(regexEscape(eras[i].name));
          abbrPieces.push(regexEscape(eras[i].abbr));
          narrowPieces.push(regexEscape(eras[i].narrow));
          mixedPieces.push(regexEscape(eras[i].name));
          mixedPieces.push(regexEscape(eras[i].abbr));
          mixedPieces.push(regexEscape(eras[i].narrow));
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
      }
      addFormatToken(0, [ "gg", 2 ], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, [ "GG", 2 ], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [ token, token.length ], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addUnitAlias("weekYear", "gg");
      addUnitAlias("isoWeekYear", "GG");
      addUnitPriority("weekYear", 1);
      addUnitPriority("isoWeekYear", 1);
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
      });
      addWeekParseToken([ "gg", "GG" ], function(input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (null == input) return weekOfYear(this, dow, doy).year;
        weeksTarget = weeksInYear(input, dow, doy);
        week > weeksTarget && (week = weeksTarget);
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addUnitAlias("quarter", "Q");
      addUnitPriority("quarter", 7);
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = 3 * (toInt(input) - 1);
      });
      function getSetQuarter(input) {
        return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3);
      }
      addFormatToken("D", [ "DD", 2 ], "Do", "date");
      addUnitAlias("date", "D");
      addUnitPriority("date", 9);
      addRegexToken("D", match1to2);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale) {
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
      });
      addParseToken([ "D", "DD" ], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear");
      addUnitAlias("dayOfYear", "DDD");
      addUnitPriority("dayOfYear", 4);
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken([ "DDD", "DDDD" ], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == input ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", [ "mm", 2 ], 0, "minute");
      addUnitAlias("minute", "m");
      addUnitPriority("minute", 14);
      addRegexToken("m", match1to2);
      addRegexToken("mm", match1to2, match2);
      addParseToken([ "m", "mm" ], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", [ "ss", 2 ], 0, "second");
      addUnitAlias("second", "s");
      addUnitPriority("second", 15);
      addRegexToken("s", match1to2);
      addRegexToken("ss", match1to2, match2);
      addParseToken([ "s", "ss" ], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, [ "SS", 2 ], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, [ "SSS", 3 ], 0, "millisecond");
      addFormatToken(0, [ "SSSS", 4 ], 0, function() {
        return 10 * this.millisecond();
      });
      addFormatToken(0, [ "SSSSS", 5 ], 0, function() {
        return 100 * this.millisecond();
      });
      addFormatToken(0, [ "SSSSSS", 6 ], 0, function() {
        return 1e3 * this.millisecond();
      });
      addFormatToken(0, [ "SSSSSSS", 7 ], 0, function() {
        return 1e4 * this.millisecond();
      });
      addFormatToken(0, [ "SSSSSSSS", 8 ], 0, function() {
        return 1e5 * this.millisecond();
      });
      addFormatToken(0, [ "SSSSSSSSS", 9 ], 0, function() {
        return 1e6 * this.millisecond();
      });
      addUnitAlias("millisecond", "ms");
      addUnitPriority("millisecond", 16);
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") addRegexToken(token, matchUnsigned);
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(1e3 * ("0." + input));
      }
      for (token = "S"; token.length <= 9; token += "S") addParseToken(token, parseMs);
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      "undefined" !== typeof Symbol && null != Symbol.for && (proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">";
      });
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
      proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
      proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
      proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
      proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
      function createUnix(input) {
        return createLocal(1e3 * input);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format, index, field, setter) {
        var locale = getLocale(), utc = createUTC().set(setter, index);
        return locale[field](utc, format);
      }
      function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
          index = format;
          format = void 0;
        }
        format = format || "";
        if (null != index) return get$1(format, index, field, "month");
        var i, out = [];
        for (i = 0; i < 12; i++) out[i] = get$1(format, i, field, "month");
        return out;
      }
      function listWeekdaysImpl(localeSorted, format, index, field) {
        if ("boolean" === typeof localeSorted) {
          if (isNumber(format)) {
            index = format;
            format = void 0;
          }
          format = format || "";
        } else {
          format = localeSorted;
          index = format;
          localeSorted = false;
          if (isNumber(format)) {
            index = format;
            format = void 0;
          }
          format = format || "";
        }
        var locale = getLocale(), shift = localeSorted ? locale._week.dow : 0, i, out = [];
        if (null != index) return get$1(format, (index + shift) % 7, field, "day");
        for (i = 0; i < 7; i++) out[i] = get$1(format, (i + shift) % 7, field, "day");
        return out;
      }
      function listMonths(format, index) {
        return listMonthsImpl(format, index, "months");
      }
      function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, "monthsShort");
      }
      function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [ {
          since: "0001-01-01",
          until: Infinity,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD"
        }, {
          since: "0000-12-31",
          until: -Infinity,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC"
        } ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
      hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        return number < 0 ? Math.floor(number) : Math.ceil(number);
      }
      function bubble() {
        var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years, monthsFromDays;
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
          milliseconds += 864e5 * absCeil(monthsToDays(months) + days);
          days = 0;
          months = 0;
        }
        data.milliseconds = milliseconds % 1e3;
        seconds = absFloor(milliseconds / 1e3);
        data.seconds = seconds % 60;
        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;
        hours = absFloor(minutes / 60);
        data.hours = hours % 24;
        days += absFloor(hours / 24);
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));
        years = absFloor(months / 12);
        months %= 12;
        data.days = days;
        data.months = months;
        data.years = years;
        return this;
      }
      function daysToMonths(days) {
        return 4800 * days / 146097;
      }
      function monthsToDays(months) {
        return 146097 * months / 4800;
      }
      function as(units) {
        if (!this.isValid()) return NaN;
        var days, months, milliseconds = this._milliseconds;
        units = normalizeUnits(units);
        if ("month" === units || "quarter" === units || "year" === units) {
          days = this._days + milliseconds / 864e5;
          months = this._months + daysToMonths(days);
          switch (units) {
           case "month":
            return months;

           case "quarter":
            return months / 3;

           case "year":
            return months / 12;
          }
        } else {
          days = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
           case "week":
            return days / 7 + milliseconds / 6048e5;

           case "day":
            return days + milliseconds / 864e5;

           case "hour":
            return 24 * days + milliseconds / 36e5;

           case "minute":
            return 1440 * days + milliseconds / 6e4;

           case "second":
            return 86400 * days + milliseconds / 1e3;

           case "millisecond":
            return Math.floor(864e5 * days) + milliseconds;

           default:
            throw new Error("Unknown unit " + units);
          }
        }
      }
      function valueOf$1() {
        if (!this.isValid()) return NaN;
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round = Math.round, thresholds = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), weeks = round(duration.as("w")), years = round(duration.as("y")), a = seconds <= thresholds.ss && [ "s", seconds ] || seconds < thresholds.s && [ "ss", seconds ] || minutes <= 1 && [ "m" ] || minutes < thresholds.m && [ "mm", minutes ] || hours <= 1 && [ "h" ] || hours < thresholds.h && [ "hh", hours ] || days <= 1 && [ "d" ] || days < thresholds.d && [ "dd", days ];
        null != thresholds.w && (a = a || weeks <= 1 && [ "w" ] || weeks < thresholds.w && [ "ww", weeks ]);
        a = a || months <= 1 && [ "M" ] || months < thresholds.M && [ "MM", months ] || years <= 1 && [ "y" ] || [ "yy", years ];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (void 0 === roundingFunction) return round;
        if ("function" === typeof roundingFunction) {
          round = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (void 0 === thresholds[threshold]) return false;
        if (void 0 === limit) return thresholds[threshold];
        thresholds[threshold] = limit;
        "s" === threshold && (thresholds.ss = limit - 1);
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var withSuffix = false, th = thresholds, locale, output;
        if ("object" === typeof argWithSuffix) {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        "boolean" === typeof argWithSuffix && (withSuffix = argWithSuffix);
        if ("object" === typeof argThresholds) {
          th = Object.assign({}, thresholds, argThresholds);
          null != argThresholds.s && null == argThresholds.ss && (th.ss = argThresholds.s - 1);
        }
        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);
        withSuffix && (output = locale.pastFuture(+this, output));
        return locale.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var seconds = abs$1(this._milliseconds) / 1e3, days = abs$1(this._days), months = abs$1(this._months), minutes, hours, years, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) return "P0D";
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;
        years = absFloor(months / 12);
        months %= 12;
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign(this._months) !== sign(total) ? "-" : "";
        daysSign = sign(this._days) !== sign(total) ? "-" : "";
        hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
        return totalSign + "P" + (years ? ymSign + years + "Y" : "") + (months ? ymSign + months + "M" : "") + (days ? daysSign + days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hmsSign + hours + "H" : "") + (minutes ? hmsSign + minutes + "M" : "") + (seconds ? hmsSign + s + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(1e3 * parseFloat(input));
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.27.0";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
      };
      return hooks;
    });
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
    var SUIT_TYPE = cc.Enum({
      HEI: 0,
      HONG: 1,
      MEI: 2,
      FANG: 3,
      EMPTY: 4
    });
    var STATUS_TYPE = cc.Enum({
      CLOSE: 0,
      OPEN: 1
    });
    var GAME_STATUS = cc.Enum({
      wait: 0,
      gaming: 1,
      pause: 2
    });
    var clientEvent = {
      EnterBackground: "EnterBackground",
      EnterForeground: "EnterForeground",
      playGame: "playGame",
      gotoHome: "gotoHome",
      sendPoker: "sendPoker"
    };
    var PERLOAD_NAME = cc.Enum({
      bgMusic: "audio/bgMusic",
      countDown_nor: "audio/cd_nor",
      countDown_go: "audio/cd_go",
      highScore: "audio/highScore",
      lowScore: "audio/lowScore",
      success: "audio/success",
      break: "audio/break",
      crash: "audio/crash",
      click: "audio/click",
      close: "audio/close",
      jump: "audio/jump",
      select: "audio/select",
      msg: "audio/msg",
      effect_fanpai: "audio/effect_fanpai",
      effect_fapai: "audio/effect_fapai",
      promptUI: "prefabs/promptUI",
      loading: "prefabs/loading",
      setting: "prefabs/setting",
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
      mask: 100
    });
    module.exports = {
      clientEvent: clientEvent,
      PERLOAD_NAME: PERLOAD_NAME,
      KEY: KEY,
      LAYER_ORDER: LAYER_ORDER,
      SUIT_TYPE: SUIT_TYPE,
      STATUS_TYPE: STATUS_TYPE,
      GAME_STATUS: GAME_STATUS
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
      Global.language = cc.sys.localStorage.getItem(Global.getAppName() + "language", Global.language) || "jp";
      Global.languageData = require("LanguageData");
      Global.languageData.init(Global.language);
      Global.isDebug = false;
      Global.curDraw = 1;
      Global.gameStatus = 0;
      Global.gameCtrl = null;
      Global.curSource = null;
      Global.entryTime = Date.now();
      Global.player = {
        curScore: 0,
        highestScore: 0
      };
      var highestScore = cc.sys.localStorage.getItem("highestScore");
      highestScore && (Global.player.highestScore = 1 * highestScore);
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
      for (var key in FeatureType) if (FeatureType.hasOwnProperty(key)) {
        Global.src_invite_ct_feature_session[FeatureType[key]] = 0;
        Global.src_invite_ct_feature[FeatureType[key]] = Global.src_invite_ct_feature[FeatureType[key]] || 0;
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
      Global.pokerManager = require("pokerManager")();
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
      return Global.isDebug ? "kungfu-jump-dev" : "kungfu-jump";
    };
    Global.getAuthURL = function() {
      return Global.isDebug ? "https://qhxhtbbay0.execute-api.us-east-1.amazonaws.com/dev_stage/session" : "https://obvr9m58se.execute-api.us-east-1.amazonaws.com/prod_stage/session";
    };
    Global.getHost = function() {
      return Global.isDebug ? "https://messaging-service-dev.gct-internal.net" : "https://messaging-service-prod.gct-internal.net";
    };
    Global.getVersion = function() {
      return Global.isDebug, "0.0.1";
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
    emitter: "emitter",
    pokerManager: "pokerManager"
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
    var CONST_OFFTIME = 1e3;
    var CONST_POKER_DIS = 30;
    var moment = require("moment");
    cc.Class({
      extends: cc.Component,
      properties: {
        scoreLab: {
          default: null,
          type: cc.Label
        },
        score: {
          default: 0,
          type: cc.Integer,
          notify: function notify() {
            Global.player.curScore = this.score;
            this.scoreLab.string = "Score: " + this.score;
            if (this.score > Global.player.highestScore) {
              Global.player.highestScore = this.score;
              cc.sys.localStorage.setItem("highestScore", Global.player.highestScore);
            }
          }
        },
        timerLab: {
          default: null,
          type: cc.Label
        },
        moveLab: {
          default: null,
          type: cc.Label
        },
        gameNode: {
          default: null,
          type: cc.Node
        },
        homePageNode: {
          default: null,
          type: cc.Node
        },
        soundToggle: {
          default: null,
          type: cc.Toggle
        },
        closeSendNode: {
          default: null,
          type: cc.Node
        },
        openSendNodeList: {
          default: [],
          type: cc.Node
        },
        receiveGroupList: {
          default: [],
          type: cc.Node
        },
        playGroupList: {
          default: [],
          type: cc.Node
        },
        playRootNode: {
          default: null,
          type: cc.Node
        },
        pokerCell: {
          default: null,
          type: cc.Prefab
        },
        pauseBtn: {
          default: null,
          type: cc.Node
        },
        resumeBtn: {
          default: null,
          type: cc.Node
        },
        _curTimer: 0,
        _totalTime: 0
      },
      onLoad: function onLoad() {
        Global.emitter.on(gameCFG.clientEvent.EnterBackground, this.EnterBackground, this);
        Global.emitter.on(gameCFG.clientEvent.EnterForeground, this.EnterForeground, this);
        this.registerEvent();
        this.isBackGround = false;
        this.clearData();
        Global.musicManager.playBGM(gameCFG.PERLOAD_NAME.bgMusic);
        var localStatus = cc.sys.localStorage.getItem(gameCFG.KEY.soundStatus);
        null == localStatus || void 0 == localStatus || 0 == localStatus ? this.soundToggle.uncheck() : 1 == localStatus && this.soundToggle.check();
        Global.gameCtrl = this;
        this.gameNode.active = false;
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
        Global.emitter.on(gameCFG.clientEvent.playGame, this.playGame, this);
        Global.emitter.on(gameCFG.clientEvent.sendPoker, this.sendPoker, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.game.canvas.focus();
      },
      unregisterEvent: function unregisterEvent() {
        Global.emitter.off(gameCFG.clientEvent.playGame, this.playGame);
        Global.emitter.off(gameCFG.clientEvent.sendPoker, this.sendPoker);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      clearData: function clearData() {
        this._totalTime = 0;
        this._curTimer = Date.now();
        this.timerLab.string = "Timer: 0s";
        this.scoreLab.string = "Score: 0";
        this.moveLab.string = "Move: 0";
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
        this.playRootNode.removeAllChildren();
        this.closeSendNode.removeAllChildren();
        for (var i = 0; i < this.openSendNodeList.length; i++) this.openSendNodeList[i] && this.openSendNodeList[i].removeAllChildren();
        for (var _i = 0; _i < this.receiveGroupList.length; _i++) this.openSendNodeList[_i] && this.openSendNodeList[_i].removeAllChildren();
      },
      playGame: function playGame() {
        this.gameNode.active = true;
        this.homePageNode.active = false;
        this.init();
      },
      clickPP: function clickPP() {
        Global.pokerManager.getPlayGroupPokers().forEach(function(group) {
          group.group.forEach(function(poker) {
            var flag = Global.pokerManager.isLocaltionPlayArea(group, poker);
            console.log("flag:", flag);
          });
        });
      },
      init: function init() {
        var _this = this;
        this.closeSendNode.removeAllChildren();
        Global.pokerManager.getCloseAreaPokers().forEach(function(poker, index) {
          console.log("index:" + index);
          var pokerCell = _this.createPoker(poker);
          pokerCell.setPosition(cc.v2(.3 * index, .1 * index));
          _this.closeSendNode.addChild(pokerCell);
        });
        Global.pokerManager.sendPoker();
      },
      createPoker: function createPoker(_poker) {
        var cell = cc.instantiate(this.pokerCell);
        var ctrl = cell.getComponent("pokerCell");
        ctrl.init(_poker);
        cell.ctrl = ctrl;
        return cell;
      },
      sendPoker: function sendPoker(_data) {
        console.log("sendPoker:", _data);
        var pokerNode = _data.poker.uiPoker.node;
        var pokerWorldSpace = pokerNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var nodeSpace = this.playRootNode.convertToNodeSpaceAR(pokerWorldSpace);
        pokerNode.removeFromParent(false);
        pokerNode.position = cc.v2(nodeSpace);
        this.playRootNode.addChild(pokerNode);
        var targetGroupNode = this.playGroupList[_data.toIndex];
        var targetWorldSpace = targetGroupNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var targetNodeSpace = this.playRootNode.convertToNodeSpaceAR(targetWorldSpace);
        _data.poker.status == gameCFG.STATUS_TYPE.CLOSE ? pokerNode.runAction(cc.sequence(cc.delayTime(_data.delayTime), cc.callFunc(function() {
          Global.musicManager.playClip(gameCFG.PERLOAD_NAME.effect_fapai);
        }), cc.moveTo(1, targetNodeSpace.x, targetNodeSpace.y - _data.rowIndex * CONST_POKER_DIS))) : _data.poker.status == gameCFG.STATUS_TYPE.OPEN && pokerNode.runAction(cc.sequence(cc.delayTime(_data.delayTime), cc.callFunc(function() {
          Global.musicManager.playClip(gameCFG.PERLOAD_NAME.effect_fapai);
        }), cc.moveTo(1, targetNodeSpace.x, targetNodeSpace.y - _data.rowIndex * CONST_POKER_DIS), cc.callFunc(function() {
          Global.musicManager.playClip(gameCFG.PERLOAD_NAME.effect_fanpai);
          pokerNode.ctrl.setStatus(true);
        })));
      },
      gotoHome: function gotoHome() {
        this.homePageNode.active = true;
      },
      onTouchMove: function onTouchMove(event) {
        return;
        var startPos;
        var cur;
        var diff;
      },
      onTouchEnd: function onTouchEnd(event) {
        return;
      },
      onKeyDown: function onKeyDown(event) {
        return;
      },
      showGameResult: function showGameResult(_isSuc) {
        void 0 === _isSuc && (_isSuc = false);
        Global.panel.openLoading();
        Global.panel.closeChildPanel(323);
        Global.panel.showAsynPanelByName(gameCFG.PERLOAD_NAME.result, null, 323).then(function(panel) {
          Global.panel.closeLoading();
          var ctrl = panel.getComponent(panel.name);
          ctrl.setData(_isSuc);
        }, function(error) {
          Global.panel.closeLoading();
        });
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
      onClickPlayBtn: function onClickPlayBtn(evn, type) {
        Global.musicManager.playClickEffect();
        Global.curDraw = type;
        console.log("curDraw:" + type);
        Global.emitter.emit(gameCFG.clientEvent.playGame);
      },
      onClickPauseOrResumeBtn: function onClickPauseOrResumeBtn(evn, type) {
        console.log("onClickPauseOrResumeBtn");
        Global.musicManager.playClickEffect();
        if (cc.director.isPaused()) {
          cc.director.resume();
          this.pauseBtn.active = true;
          this.resumeBtn.active = false;
        } else {
          cc.director.pause();
          this.pauseBtn.active = false;
          this.resumeBtn.active = true;
        }
      },
      onClickHintBtn: function onClickHintBtn(evn, type) {
        Global.musicManager.playClickEffect();
      },
      onDestroy: function onDestroy() {
        Global.emitter.off(gameCFG.clientEvent.EnterBackground, this);
        Global.emitter.off(gameCFG.clientEvent.EnterForeground, this);
        this.unregisterEvent();
      },
      update: function update() {
        var localTime = Date.now();
        var offTime = localTime - this._curTimer;
        if (offTime >= CONST_OFFTIME) {
          this._curTimer = localTime;
          this._totalTime += offTime;
          this.timerLab.string = "Timer: " + this.calculateTime(this._totalTime);
        }
      },
      calculateTime: function calculateTime(_ms) {
        var day = 0 == moment.duration(_ms).days() ? "" : moment.duration(_ms).days() + ":";
        var hour = 0 == moment.duration(_ms).hours() ? "" : moment.duration(_ms).hours() + ":";
        "" == day && "" == hour && (hour = "0:");
        var minute = 0 == moment.duration(_ms).minutes() ? "" : moment.duration(_ms).minutes() + ":";
        "" == day && "" == hour && "" == minute && (minute = "0:");
        return day + hour + minute + moment.duration(_ms).seconds();
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    moment: 1
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
    musicMG.playClip = function(_clip, _callBack) {
      this.playEffect(_clip, _callBack);
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
          url: gameCFG.PERLOAD_NAME.setting,
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
        _error ? console.log(_error) : this.parseResource(_res);
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
        Global.musicManager.playClickEffect();
        this.node.destroy();
      },
      onClickBtn: function onClickBtn(evn, type) {
        Global.musicManager.playClickEffect();
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
  pokerCell: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa144IjukpHua8a03tKgLeR", "pokerCell");
    "use strict";
    var _cc$Class;
    var gameCFG = require("GameConfig");
    cc.Class((_cc$Class = {
      extends: cc.Component,
      properties: {
        bg: {
          default: null,
          type: cc.Node
        },
        pointIcon: {
          default: null,
          type: cc.Sprite
        },
        mask: {
          default: null,
          type: cc.Node
        },
        _gameCtrl: null,
        _poker: null
      },
      onEnable: function onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      },
      onDisable: function onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd);
      },
      onTouchStart: function onTouchStart(event) {
        console.log("onTouchStart");
      },
      onTouchMove: function onTouchMove(event) {
        console.log("onTouchMove");
      },
      onTouchEnd: function onTouchEnd(event) {
        console.log("onTouchEnd");
      }
    }, _cc$Class["onTouchEnd"] = function onTouchEnd(event) {
      console.log("onTouchEnd");
    }, _cc$Class.init = function init(_poker, _gameCtrl) {
      this._poker = _poker;
      this._gameCtrl = _gameCtrl;
      _poker.bindUI(this);
      var self = this;
      var path = "card/" + _poker.number;
      console.log("path:" + path);
      cc.loader.loadRes(path, function(error, texture) {
        error ? console.error(error) : self.pointIcon.spriteFrame = new cc.SpriteFrame(texture);
      });
      this.setStatus();
    }, _cc$Class.setStatus = function setStatus(_isAnim) {
      var _this = this;
      void 0 === _isAnim && (_isAnim = false);
      if (_isAnim) {
        this.node.stopAllActions();
        var self = this;
        this.node.runAction(cc.sequence(cc.scaleTo(.5, 0, 1), cc.callFunc(function() {
          self.mask.active = _this._poker.status == gameCFG.STATUS_TYPE.CLOSE;
        }), cc.scaleTo(.1, 1, 1)));
      } else this.mask.active = this._poker.status == gameCFG.STATUS_TYPE.CLOSE;
    }, _cc$Class.isOpen = function isOpen() {
      return this._poker.status == gameCFG.STATUS_TYPE.OPEN;
    }, _cc$Class.getNumber = function getNumber() {
      return this._poker.number;
    }, _cc$Class));
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  pokerManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e6bayPfUdC3YthKl/c+OAw", "pokerManager");
    "use strict";
    var gameCFG = require("GameConfig");
    var CONST_RECEIVE_GROUPS = 4;
    var CONST_PLAY_GROUPS = 7;
    var PokerGroup = function() {
      function PokerGroup() {
        this.group = [];
      }
      var _proto = PokerGroup.prototype;
      _proto.addPoker = function addPoker(_poker) {
        this.group.push(_poker);
      };
      return PokerGroup;
    }();
    var Poker = function() {
      function Poker(_point, _suit, _status) {
        void 0 === _point && (_point = -1);
        void 0 === _suit && (_suit = gameCFG.SUIT_TYPE.EMPTY);
        void 0 === _status && (_status = gameCFG.STATUS_TYPE.CLOSE);
        this.number = 4 * (_point - 1) + _suit + 1;
        this.status = _status;
        this.point = _point;
        this.suit = _suit;
        this.unBindUI();
      }
      var _proto2 = Poker.prototype;
      _proto2.bindUI = function bindUI(_uiPoker) {
        this.uiPoker = _uiPoker;
      };
      _proto2.unBindUI = function unBindUI() {
        this.uiPoker = null;
      };
      return Poker;
    }();
    var pokerManager = function pokerManager() {
      this.resetData();
    }, pokerMgr = pokerManager.prototype, g_instance = null;
    pokerMgr.resetData = function() {
      this.pokers = [];
      this.closeAreaPokers = [];
      this.openAreaPokers = [];
      this.receiveGroupPokers = [];
      this.playGroupPokers = [];
      this.initData();
    };
    pokerMgr.initData = function() {
      for (var i = 1; i < 14; i++) for (var j = 0; j < 4; j++) this.pokers.push(new Poker(i, j, gameCFG.STATUS_TYPE.CLOSE));
      console.log("pokers:", this.pokers);
      var temp = this.closeAreaPokers;
      this.closeAreaPokers = this.pokers;
      this.pokers = temp;
      console.log("aa-pokers:", this.pokers);
      console.log("aa-closeAreaPokers:", this.closeAreaPokers);
      for (var _i = 0; _i < CONST_RECEIVE_GROUPS; _i++) {
        var group = new PokerGroup();
        this.openAreaPokers.push(group);
      }
      console.log("openAreaPokers:", this.openAreaPokers);
      for (var _i2 = 0; _i2 < CONST_RECEIVE_GROUPS; _i2++) {
        var _group = new PokerGroup();
        this.receiveGroupPokers.push(_group);
      }
      console.log("receiveGroupPokers:", this.receiveGroupPokers);
      for (var _i3 = 0; _i3 < CONST_PLAY_GROUPS; _i3++) {
        var _group2 = new PokerGroup();
        this.playGroupPokers.push(_group2);
      }
      console.log("playGroupPokers:", this.playGroupPokers);
    };
    pokerMgr.sendPoker = function() {
      var totalNum = 0;
      for (var cards = CONST_PLAY_GROUPS; cards >= 1; --cards) for (var i = 0; i < cards; ++i) {
        var playGroupPokersIndex = CONST_PLAY_GROUPS - cards + i;
        var playGroupPoker = this.playGroupPokers[playGroupPokersIndex];
        var poker = this.closeAreaPokers[this.closeAreaPokers.length - 1];
        this.closeAreaPokers.length = this.closeAreaPokers.length - 1;
        poker.status = 0 == i ? gameCFG.STATUS_TYPE.OPEN : gameCFG.STATUS_TYPE.CLOSE;
        playGroupPoker.addPoker(poker);
        Global.emitter.emit(gameCFG.clientEvent.sendPoker, {
          toIndex: playGroupPokersIndex,
          rowIndex: CONST_PLAY_GROUPS - cards,
          poker: poker,
          delayTime: .2 * ++totalNum
        });
      }
    };
    pokerMgr.shuffle = function(_arr) {
      _arr.sort(function(a, b) {
        return Math.random() - .5;
      });
      return _arr;
    };
    pokerMgr.isLocaltionPlayArea = function(_list, _poker) {};
    pokerMgr.isTop = function(_list, _poker) {
      var flag = false;
      _list.length > 0 && (_list[_list.length - 1].point = _poker.point && _list[_list.length - 1].suit == _poker.point) && (flag = true);
      console.log("isTop:" + flag);
      return flag;
    };
    pokerMgr.getPokers = function() {
      return this.pokers;
    };
    pokerMgr.getCloseAreaPokers = function() {
      return this.closeAreaPokers;
    };
    pokerMgr.getOpenAreaPokers = function() {
      return this.openAreaPokers;
    };
    pokerMgr.getReceiveGroupPokers = function() {
      return this.receiveGroupPokers;
    };
    pokerMgr.getPlayGroupPokers = function() {
      return this.playGroupPokers;
    };
    module.exports = function() {
      g_instance || (g_instance = new pokerManager());
      return g_instance;
    };
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
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
        Global.musicManager.playEffect(gameCFG.PERLOAD_NAME.success);
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
        this.gameOver.active = !_isSuc;
        this.sucIcon.active = _isSuc;
      },
      updateHighestScore: function updateHighestScore() {
        if (Global.player.curScore > Global.player.highestScore) {
          Global.player.highestScore = Global.player.curScore;
          cc.sys.localStorage.setItem("highestScore", Global.player.highestScore);
          Global.pf.UpdatePlayerStatistics(Global.player.curScore, function() {});
        }
        this.highestLab.string = Global.player.highestScore;
        this.scoreLab.string = Global.player.curScore;
      },
      onClickHomeBtn: function onClickHomeBtn(evn, type) {
        Global.musicManager.playClickEffect();
        this.node.destroy();
        Global.gameCtrl.gotoHome();
      },
      onClickRePlayBtn: function onClickRePlayBtn(evn, type) {
        this["continue"]({
          reStart: true,
          source: gameCFG.Source.retry
        });
      },
      continue: function _continue(data) {
        var _this = this;
        var animList = [];
        animList.push(cc.callFunc(function() {
          Global.gameCtrl.onClickPlayBtn();
        }));
        animList.push(cc.delayTime(.2));
        animList.push(cc.callFunc(function() {
          _this.node.destroy();
        }));
        this.node.runAction(cc.sequence(animList));
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
  setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48c0736ZhlCuZtMHOxwvpsl", "setting");
    "use strict";
    var gameCFG = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        musicToggle: {
          default: null,
          type: cc.Toggle
        },
        effectToggle: {
          default: null,
          type: cc.Toggle
        },
        languageLab: {
          default: null,
          type: cc.Label
        },
        versionLab: {
          default: null,
          type: cc.Label
        },
        resetBtn: {
          default: null,
          type: cc.Node
        },
        helpNode: {
          default: null,
          type: cc.Node
        },
        playLab: {
          default: null,
          type: cc.RichText
        }
      },
      onLoad: function onLoad() {
        var localStatus = cc.sys.localStorage.getItem(gameCFG.KEY.bgmusicStatus);
        null == localStatus || void 0 == localStatus || 1 == localStatus ? this.musicToggle.check() : 0 == localStatus && this.musicToggle.uncheck();
        localStatus = cc.sys.localStorage.getItem(gameCFG.KEY.effectStatus);
        null == localStatus || void 0 == localStatus || 1 == localStatus ? this.effectToggle.check() : 0 == localStatus && this.effectToggle.uncheck();
        this.languageLab.string = Global.languageData.t("label_text.language");
        this.versionLab.string = Global.isDebug ? "V" + Global.getVersion() + "-Devp" : "V" + Global.getVersion();
        this.helpNode.active = false;
      },
      onClickMusicToggleBtn: function onClickMusicToggleBtn(evn, type) {
        Global.musicManager.playClickEffect();
        var status = true == evn.isChecked ? 1 : 0;
        cc.sys.localStorage.setItem(gameCFG.KEY.bgmusicStatus, status);
        if (1 == status) Global.musicManager.resumeMusic(); else {
          Global.musicManager.pauseBGMusic();
          Global.musicManager.stopAllEffects();
        }
      },
      onClickEffectToggleBtn: function onClickEffectToggleBtn(evn, type) {
        Global.musicManager.playClickEffect();
        var status = true == evn.isChecked ? 1 : 0;
        cc.sys.localStorage.setItem(gameCFG.KEY.effectStatus, status);
        0 == status && Global.musicManager.stopAllEffects();
      },
      onClickCloseBtn: function onClickCloseBtn(evn, type) {
        Global.musicManager.playCloseEffect();
        this.node.destroy();
      },
      onClickResetBtn: function onClickResetBtn(evn, type) {
        Global.musicManager.playClickEffect();
      },
      onClickToggleBtn: function onClickToggleBtn(evn, type) {
        Global.musicManager.playClickEffect();
        "0" != type && Global.panel.showPrompt(Global.languageData.t("label_text.coming"));
      },
      onClickHelpBtn: function onClickHelpBtn() {
        Global.musicManager.playClickEffect();
        this.helpNode.active = !this.helpNode.active;
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
  "use_v2.1-2.2.1_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfc6fJV+wBLq4lZWWHUh1dk", "use_v2.1-2.2.1_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_v2.1-2.2.1_cc.Toggle_event", "GameConfig", "GCTurboAnalytics", "Global", "MusicManager", "Panel", "PreLoadManager", "ResourceManager", "Tools", "emitter", "openAnimation", "pokerManager", "Cell", "ComboBox", "GridCell", "Item", "MainScene", "help", "loading", "pokerCell", "promptUI", "result", "setting", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min" ]);