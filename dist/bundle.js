(()=>{"use strict";const t=document.getElementById("search-bar"),e=document.getElementById("search-btn"),n=document.getElementById("temperature"),r=document.getElementById("fl-temp"),a=document.getElementById("humid-percent"),o=document.getElementById("cor-percent"),i=document.getElementById("w-speed"),u=document.getElementById("weather-icon"),s=document.getElementById("location"),d=document.getElementById("today-date"),c=document.querySelector("#local-time"),l=document.querySelectorAll(".max-temp"),h=document.querySelectorAll(".min-temp"),m=document.querySelectorAll(".forecast-image"),f=document.querySelectorAll(".weekday");document.getElementById("myChart");const g=document.querySelector("#toggle-units");function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function v(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function p(t){v(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===w(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function y(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function b(t){v(1,arguments);var e=p(t),n=e.getUTCDay(),r=(n<1?7:0)+n-1;return e.setUTCDate(e.getUTCDate()-r),e.setUTCHours(0,0,0,0),e}function T(t){v(1,arguments);var e=p(t),n=e.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var a=b(r),o=new Date(0);o.setUTCFullYear(n,0,4),o.setUTCHours(0,0,0,0);var i=b(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}var C={};function x(){return C}function M(t,e){var n,r,a,o,i,u,s,d;v(1,arguments);var c=x(),l=y(null!==(n=null!==(r=null!==(a=null!==(o=null==e?void 0:e.weekStartsOn)&&void 0!==o?o:null==e||null===(i=e.locale)||void 0===i||null===(u=i.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==a?a:c.weekStartsOn)&&void 0!==r?r:null===(s=c.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==n?n:0);if(!(l>=0&&l<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=p(t),m=h.getUTCDay(),f=(m<l?7:0)+m-l;return h.setUTCDate(h.getUTCDate()-f),h.setUTCHours(0,0,0,0),h}function D(t,e){var n,r,a,o,i,u,s,d;v(1,arguments);var c=p(t),l=c.getUTCFullYear(),h=x(),m=y(null!==(n=null!==(r=null!==(a=null!==(o=null==e?void 0:e.firstWeekContainsDate)&&void 0!==o?o:null==e||null===(i=e.locale)||void 0===i||null===(u=i.options)||void 0===u?void 0:u.firstWeekContainsDate)&&void 0!==a?a:h.firstWeekContainsDate)&&void 0!==r?r:null===(s=h.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==n?n:1);if(!(m>=1&&m<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=new Date(0);f.setUTCFullYear(l+1,0,m),f.setUTCHours(0,0,0,0);var g=M(f,e),w=new Date(0);w.setUTCFullYear(l,0,m),w.setUTCHours(0,0,0,0);var b=M(w,e);return c.getTime()>=g.getTime()?l+1:c.getTime()>=b.getTime()?l:l-1}function k(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const S=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return k("yy"===e?r%100:r,e.length)},E=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):k(n+1,2)},U=function(t,e){return k(t.getUTCDate(),e.length)},P=function(t,e){return k(t.getUTCHours()%12||12,e.length)},W=function(t,e){return k(t.getUTCHours(),e.length)},Y=function(t,e){return k(t.getUTCMinutes(),e.length)},N=function(t,e){return k(t.getUTCSeconds(),e.length)},q=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return k(Math.floor(r*Math.pow(10,n-3)),e.length)};var O={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return S(t,e)},Y:function(t,e,n,r){var a=D(t,r),o=a>0?a:1-a;return"YY"===e?k(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):k(o,e.length)},R:function(t,e){return k(T(t),e.length)},u:function(t,e){return k(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return k(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return k(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return E(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return k(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){var a=function(t,e){v(1,arguments);var n=p(t),r=M(n,e).getTime()-function(t,e){var n,r,a,o,i,u,s,d;v(1,arguments);var c=x(),l=y(null!==(n=null!==(r=null!==(a=null!==(o=null==e?void 0:e.firstWeekContainsDate)&&void 0!==o?o:null==e||null===(i=e.locale)||void 0===i||null===(u=i.options)||void 0===u?void 0:u.firstWeekContainsDate)&&void 0!==a?a:c.firstWeekContainsDate)&&void 0!==r?r:null===(s=c.locale)||void 0===s||null===(d=s.options)||void 0===d?void 0:d.firstWeekContainsDate)&&void 0!==n?n:1),h=D(t,e),m=new Date(0);return m.setUTCFullYear(h,0,l),m.setUTCHours(0,0,0,0),M(m,e)}(n,e).getTime();return Math.round(r/6048e5)+1}(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):k(a,e.length)},I:function(t,e,n){var r=function(t){v(1,arguments);var e=p(t),n=b(e).getTime()-function(t){v(1,arguments);var e=T(t),n=new Date(0);return n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0),b(n)}(e).getTime();return Math.round(n/6048e5)+1}(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):k(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):U(t,e)},D:function(t,e,n){var r=function(t){v(1,arguments);var e=p(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var r=n-e.getTime();return Math.floor(r/864e5)+1}(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):k(r,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return k(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return k(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return k(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return P(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):W(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):k(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):k(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):Y(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):N(t,e)},S:function(t,e){return q(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return j(a);case"XXXX":case"XX":return L(a);default:return L(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return j(a);case"xxxx":case"xx":return L(a);default:return L(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+F(a,":");default:return"GMT"+L(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+F(a,":");default:return"GMT"+L(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return k(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return k((r._originalDate||t).getTime(),e.length)}};function F(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+k(o,2)}function j(t,e){return t%60==0?(t>0?"-":"+")+k(Math.abs(t)/60,2):L(t,e)}function L(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+k(Math.floor(a/60),2)+n+k(a%60,2)}const B=O;var H=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},z=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},A={p:z,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return H(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",H(a,e)).replace("{{time}}",z(o,e))}};const R=A;var Q=["D","DD"],G=["YY","YYYY"];function I(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var X={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function _(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var $,J={date:_({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:_({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:_({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},V={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function K(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var a=t.defaultFormattingWidth||t.defaultWidth,o=null!=n&&n.width?String(n.width):a;r=t.formattingValues[o]||t.formattingValues[a]}else{var i=t.defaultWidth,u=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[u]||t.values[i]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function Z(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;var i,u=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],d=Array.isArray(s)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(u))return n}(s):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(u))return n}(s);return i=t.valueCallback?t.valueCallback(d):d,{value:i=n.valueCallback?n.valueCallback(i):i,rest:e.slice(u.length)}}}const tt={code:"en-US",formatDistance:function(t,e,n){var r,a=X[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:J,formatRelative:function(t,e,n,r){return V[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:K({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:K({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:K({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:K({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:K({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:($={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match($.matchPattern);if(!n)return null;var r=n[0],a=t.match($.parsePattern);if(!a)return null;var o=$.valueCallback?$.valueCallback(a[0]):a[0];return{value:o=e.valueCallback?e.valueCallback(o):o,rest:t.slice(r.length)}}),era:Z({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:Z({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:Z({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:Z({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:Z({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var et=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,nt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,rt=/^'([^]*?)'?$/,at=/''/g,ot=/[a-zA-Z]/;function it(t,e,n){var r,a,o,i,u,s,d,c,l,h,m,f,g,b,T,C,M,D;v(2,arguments);var k=String(e),S=x(),E=null!==(r=null!==(a=null==n?void 0:n.locale)&&void 0!==a?a:S.locale)&&void 0!==r?r:tt,U=y(null!==(o=null!==(i=null!==(u=null!==(s=null==n?void 0:n.firstWeekContainsDate)&&void 0!==s?s:null==n||null===(d=n.locale)||void 0===d||null===(c=d.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==u?u:S.firstWeekContainsDate)&&void 0!==i?i:null===(l=S.locale)||void 0===l||null===(h=l.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==o?o:1);if(!(U>=1&&U<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var P=y(null!==(m=null!==(f=null!==(g=null!==(b=null==n?void 0:n.weekStartsOn)&&void 0!==b?b:null==n||null===(T=n.locale)||void 0===T||null===(C=T.options)||void 0===C?void 0:C.weekStartsOn)&&void 0!==g?g:S.weekStartsOn)&&void 0!==f?f:null===(M=S.locale)||void 0===M||null===(D=M.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==m?m:0);if(!(P>=0&&P<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!E.localize)throw new RangeError("locale must contain localize property");if(!E.formatLong)throw new RangeError("locale must contain formatLong property");var W=p(t);if(!function(t){if(v(1,arguments),!function(t){return v(1,arguments),t instanceof Date||"object"===w(t)&&"[object Date]"===Object.prototype.toString.call(t)}(t)&&"number"!=typeof t)return!1;var e=p(t);return!isNaN(Number(e))}(W))throw new RangeError("Invalid time value");var Y=function(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}(W),N=function(t,e){return v(2,arguments),function(t,e){v(2,arguments);var n=p(t).getTime(),r=y(e);return new Date(n+r)}(t,-y(e))}(W,Y),q={firstWeekContainsDate:U,weekStartsOn:P,locale:E,_originalDate:W},O=k.match(nt).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,R[e])(t,E.formatLong):t})).join("").match(et).map((function(r){if("''"===r)return"'";var a=r[0];if("'"===a)return function(t){var e=t.match(rt);return e?e[1].replace(at,"'"):t}(r);var o,i=B[a];if(i)return null!=n&&n.useAdditionalWeekYearTokens||(o=r,-1===G.indexOf(o))||I(r,e,String(t)),null!=n&&n.useAdditionalDayOfYearTokens||!function(t){return-1!==Q.indexOf(t)}(r)||I(r,e,String(t)),i(N,r,E.localize,q);if(a.match(ot))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return r})).join("");return O}function ut(t,e){if(v(2,arguments),!e||"object"!==w(e))return new Date(NaN);var n=e.years?y(e.years):0,r=e.months?y(e.months):0,a=e.weeks?y(e.weeks):0,o=e.days?y(e.days):0,i=e.hours?y(e.hours):0,u=e.minutes?y(e.minutes):0,s=e.seconds?y(e.seconds):0,d=p(t),c=r||n?function(t,e){v(2,arguments);var n=p(t),r=y(e);if(isNaN(r))return new Date(NaN);if(!r)return n;var a=n.getDate(),o=new Date(n.getTime());return o.setMonth(n.getMonth()+r+1,0),a>=o.getDate()?o:(n.setFullYear(o.getFullYear(),o.getMonth(),a),n)}(d,r+12*n):d,l=o||a?function(t,e){v(2,arguments);var n=p(t),r=y(e);return isNaN(r)?new Date(NaN):r?(n.setDate(n.getDate()+r),n):n}(c,o+7*a):c,h=1e3*(s+60*(u+60*i));return new Date(l.getTime()+h)}async function st(t){const e="ca28c71d38eaa7ccb2241b67b53857d0",n=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=${e}`),r=await n.json(),a=r[0].lat,o=r[0].lon,i=await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${e}&lat=${a}&lon=${o}`),u=await i.json();console.log(u);const s=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5effd139c50a4ea89af145132232310&q=${t}&days=1&aqi=no&alerts=no`),d=await s.json();console.log(d);const c=[],l=[],h=[],m=dt(u.list[0].dt_txt,11),f=dt(d.location.localtime,11),g=d.location.name,w=u.list[0].main.temp,v=u.list[0].main.feels_like,p=u.list[0].main.humidity,y=d.current.is_day,b=d.forecast.forecastday[0].day.daily_chance_of_rain,T=d.current.wind_kph,C=u.list[0].weather[0].id;for(let t=0;t<u.list.length;t++)l.push(u.list[t].main.temp_max),c.push(u.list[t].main.temp_min),h.push(u.list[t].weather[0].id);return{lastReading:ct[m],localTime:f,currentLocation:g,nowTemp:w,feelsLike:v,humidity:p,isDay:y,chanceOfRain:b,windSpeed:T,maxForecast:l,minForecast:c,weatherCodes:h,todayCode:C}}const dt=t=>t.slice(11),ct={"00:00:00":8,"03:00:00":7,"06:00:00":6,"09:00:00":5,"12:00:00":4,"15:00:00":3,"18:00:00":2,"21:00:00":1},lt=(t,e)=>{c.textContent=`Local Time: ${t.localTime}`,s.textContent=t.currentLocation,n.textContent=e(t.nowTemp),r.textContent=e(t.feelsLike),a.textContent=t.humidity+"%",o.textContent=t.chanceOfRain+"%",i.textContent=t.windSpeed+"kmh";const d=gt(t.lastReading,t.maxForecast,8,1),l=gt(t.lastReading,t.minForecast,8,0),h=function(t,e,n){const r=[],a=[];for(let n=t;n<e.length;n+=8)r.push(e.slice(n,n+8));for(const t of r)a.push(t[4]);return a}(t.lastReading,t.weatherCodes);ft(u,t.todayCode,t.isDay),console.log(t.isDay),ht(d,l),mt(h,1)},ht=(t,e)=>{let n=0,r=0;l.forEach((e=>{e.textContent=bt(t[n]),n++})),h.forEach((t=>{t.textContent=bt(e[r]),r++}))},mt=(t,e)=>{let n=0;m.forEach((r=>{ft(r,t[n],e),n++}))},ft=(t,e,n)=>{1===n?e>199&&e<233?t.src="https://openweathermap.org/img/wn/11d@2x.png":e>299&&e<321?t.src="https://openweathermap.org/img/wn/09d@2x.png":e>499&&e<532?t.src="https://openweathermap.org/img/wn/10d@2x.png":e>599&&e<623?t.src="https://openweathermap.org/img/wn/13d@2x.png":e>700&&e<782?t.src="https://openweathermap.org/img/wn/01d@2x.png":800===e?t.src="https://openweathermap.org/img/wn/10d@2x.png":e>800&&e<805&&(t.src="https://openweathermap.org/img/wn/02d@2x.png"):0===n&&(e>199&&e<233?t.src="https://openweathermap.org/img/wn/11n@2x.png":e>299&&e<321?t.src="https://openweathermap.org/img/wn/09n@2x.png":e>499&&e<532?t.src="https://openweathermap.org/img/wn/10n@2x.png":e>599&&e<623?t.src="https://openweathermap.org/img/wn/13n@2x.png":e>700&&e<782?t.src="https://openweathermap.org/img/wn/01n@2x.png":800===e?t.src="https://openweathermap.org/img/wn/10n@2x.png":e>800&&e<805&&(t.src="https://openweathermap.org/img/wn/02n@2x.png"))};function gt(t,e,n,r){const a=[],o=[],i=[];for(let r=t;r<e.length;r+=n)a.push(e.slice(r,r+n));if(1===r){for(const t of a)o.push(Math.max(...t));return o}if(0===r){for(const t of a)i.push(Math.min(...t));return i}}const wt=()=>{(()=>{const t=new Date,e=[];let n=0;for(let n=1;n<=5;n++){const r=it(ut(t,{days:n}),"EEEE");e.push(r)}f.forEach((t=>{t.textContent=e[n],n++}))})(),d.textContent=it(new Date,"EEEE, d MMMM yyyy")},vt=t=>{let e=t-273.15;return e=e.toFixed(1),e+"°C"},pt=t=>{let e=1.8*(t-273.15)+32;return e=e.toFixed(1),e+"°F"};let yt,bt=vt;const Tt=e=>{1===e?st("Bucuresti").then((t=>{yt=t,lt(yt,bt),wt()})):st(t.value).then((t=>{yt=t,lt(yt,bt),wt()})),t.value=""};Tt(1),e.addEventListener("click",(()=>{Tt(0)})),t.addEventListener("keypress",(function(t){"Enter"===t.key&&Tt(0)})),g.addEventListener("click",(()=>{bt===vt?(bt=pt,g.textContent="Fahrenheit",lt(yt,bt)):(bt=vt,g.textContent="Celsius",lt(yt,bt))}))})();