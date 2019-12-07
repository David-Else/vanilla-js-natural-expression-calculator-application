/* https://www.elsewebdevelopment.com/ */
var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

// var flatpickr = createCommonjsModule(function (module, exports) {
// /* flatpickr v4.6.3, @license MIT */
// (function (global, factory) {
//      module.exports = factory() ;
// }(commonjsGlobal, function () {
//     /*! *****************************************************************************
//     Copyright (c) Microsoft Corporation. All rights reserved.
//     Licensed under the Apache License, Version 2.0 (the "License"); you may not use
//     this file except in compliance with the License. You may obtain a copy of the
//     License at http://www.apache.org/licenses/LICENSE-2.0

//     THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//     KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
//     WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
//     MERCHANTABLITY OR NON-INFRINGEMENT.

//     See the Apache Version 2.0 License for specific language governing permissions
//     and limitations under the License.
//     ***************************************************************************** */

//     var __assign = function() {
//         __assign = Object.assign || function __assign(t) {
//             for (var s, i = 1, n = arguments.length; i < n; i++) {
//                 s = arguments[i];
//                 for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
//             }
//             return t;
//         };
//         return __assign.apply(this, arguments);
//     };

//     var HOOKS = [
//         "onChange",
//         "onClose",
//         "onDayCreate",
//         "onDestroy",
//         "onKeyDown",
//         "onMonthChange",
//         "onOpen",
//         "onParseConfig",
//         "onReady",
//         "onValueUpdate",
//         "onYearChange",
//         "onPreCalendarPosition",
//     ];
//     var defaults = {
//         _disable: [],
//         _enable: [],
//         allowInput: false,
//         altFormat: "F j, Y",
//         altInput: false,
//         altInputClass: "form-control input",
//         animate: typeof window === "object" &&
//             window.navigator.userAgent.indexOf("MSIE") === -1,
//         ariaDateFormat: "F j, Y",
//         clickOpens: true,
//         closeOnSelect: true,
//         conjunction: ", ",
//         dateFormat: "Y-m-d",
//         defaultHour: 12,
//         defaultMinute: 0,
//         defaultSeconds: 0,
//         disable: [],
//         disableMobile: false,
//         enable: [],
//         enableSeconds: false,
//         enableTime: false,
//         errorHandler: function (err) {
//             return typeof console !== "undefined" && console.warn(err);
//         },
//         getWeek: function (givenDate) {
//             var date = new Date(givenDate.getTime());
//             date.setHours(0, 0, 0, 0);
//             // Thursday in current week decides the year.
//             date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
//             // January 4 is always in week 1.
//             var week1 = new Date(date.getFullYear(), 0, 4);
//             // Adjust to Thursday in week 1 and count number of weeks from date to week1.
//             return (1 +
//                 Math.round(((date.getTime() - week1.getTime()) / 86400000 -
//                     3 +
//                     ((week1.getDay() + 6) % 7)) /
//                     7));
//         },
//         hourIncrement: 1,
//         ignoredFocusElements: [],
//         inline: false,
//         locale: "default",
//         minuteIncrement: 5,
//         mode: "single",
//         monthSelectorType: "dropdown",
//         nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
//         noCalendar: false,
//         now: new Date(),
//         onChange: [],
//         onClose: [],
//         onDayCreate: [],
//         onDestroy: [],
//         onKeyDown: [],
//         onMonthChange: [],
//         onOpen: [],
//         onParseConfig: [],
//         onReady: [],
//         onValueUpdate: [],
//         onYearChange: [],
//         onPreCalendarPosition: [],
//         plugins: [],
//         position: "auto",
//         positionElement: undefined,
//         prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
//         shorthandCurrentMonth: false,
//         showMonths: 1,
//         static: false,
//         time_24hr: false,
//         weekNumbers: false,
//         wrap: false
//     };

//     var english = {
//         weekdays: {
//             shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//             longhand: [
//                 "Sunday",
//                 "Monday",
//                 "Tuesday",
//                 "Wednesday",
//                 "Thursday",
//                 "Friday",
//                 "Saturday",
//             ]
//         },
//         months: {
//             shorthand: [
//                 "Jan",
//                 "Feb",
//                 "Mar",
//                 "Apr",
//                 "May",
//                 "Jun",
//                 "Jul",
//                 "Aug",
//                 "Sep",
//                 "Oct",
//                 "Nov",
//                 "Dec",
//             ],
//             longhand: [
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//             ]
//         },
//         daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
//         firstDayOfWeek: 0,
//         ordinal: function (nth) {
//             var s = nth % 100;
//             if (s > 3 && s < 21)
//                 return "th";
//             switch (s % 10) {
//                 case 1:
//                     return "st";
//                 case 2:
//                     return "nd";
//                 case 3:
//                     return "rd";
//                 default:
//                     return "th";
//             }
//         },
//         rangeSeparator: " to ",
//         weekAbbreviation: "Wk",
//         scrollTitle: "Scroll to increment",
//         toggleTitle: "Click to toggle",
//         amPM: ["AM", "PM"],
//         yearAriaLabel: "Year",
//         hourAriaLabel: "Hour",
//         minuteAriaLabel: "Minute",
//         time_24hr: false
//     };

//     var pad = function (number) { return ("0" + number).slice(-2); };
//     var int = function (bool) { return (bool === true ? 1 : 0); };
//     /* istanbul ignore next */
//     function debounce(func, wait, immediate) {
//         if (immediate === void 0) { immediate = false; }
//         var timeout;
//         return function () {
//             var context = this, args = arguments;
//             timeout !== null && clearTimeout(timeout);
//             timeout = window.setTimeout(function () {
//                 timeout = null;
//                 if (!immediate)
//                     func.apply(context, args);
//             }, wait);
//             if (immediate && !timeout)
//                 func.apply(context, args);
//         };
//     }
//     var arrayify = function (obj) {
//         return obj instanceof Array ? obj : [obj];
//     };

//     function toggleClass(elem, className, bool) {
//         if (bool === true)
//             return elem.classList.add(className);
//         elem.classList.remove(className);
//     }
//     function createElement(tag, className, content) {
//         var e = window.document.createElement(tag);
//         className = className || "";
//         content = content || "";
//         e.className = className;
//         if (content !== undefined)
//             e.textContent = content;
//         return e;
//     }
//     function clearNode(node) {
//         while (node.firstChild)
//             node.removeChild(node.firstChild);
//     }
//     function findParent(node, condition) {
//         if (condition(node))
//             return node;
//         else if (node.parentNode)
//             return findParent(node.parentNode, condition);
//         return undefined; // nothing found
//     }
//     function createNumberInput(inputClassName, opts) {
//         var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
//         if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
//             numInput.type = "number";
//         }
//         else {
//             numInput.type = "text";
//             numInput.pattern = "\\d*";
//         }
//         if (opts !== undefined)
//             for (var key in opts)
//                 numInput.setAttribute(key, opts[key]);
//         wrapper.appendChild(numInput);
//         wrapper.appendChild(arrowUp);
//         wrapper.appendChild(arrowDown);
//         return wrapper;
//     }
//     function getEventTarget(event) {
//         if (typeof event.composedPath === "function") {
//             var path = event.composedPath();
//             return path[0];
//         }
//         return event.target;
//     }

//     var doNothing = function () { return undefined; };
//     var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
//     var revFormat = {
//         D: doNothing,
//         F: function (dateObj, monthName, locale) {
//             dateObj.setMonth(locale.months.longhand.indexOf(monthName));
//         },
//         G: function (dateObj, hour) {
//             dateObj.setHours(parseFloat(hour));
//         },
//         H: function (dateObj, hour) {
//             dateObj.setHours(parseFloat(hour));
//         },
//         J: function (dateObj, day) {
//             dateObj.setDate(parseFloat(day));
//         },
//         K: function (dateObj, amPM, locale) {
//             dateObj.setHours((dateObj.getHours() % 12) +
//                 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
//         },
//         M: function (dateObj, shortMonth, locale) {
//             dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
//         },
//         S: function (dateObj, seconds) {
//             dateObj.setSeconds(parseFloat(seconds));
//         },
//         U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
//         W: function (dateObj, weekNum, locale) {
//             var weekNumber = parseInt(weekNum);
//             var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
//             date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
//             return date;
//         },
//         Y: function (dateObj, year) {
//             dateObj.setFullYear(parseFloat(year));
//         },
//         Z: function (_, ISODate) { return new Date(ISODate); },
//         d: function (dateObj, day) {
//             dateObj.setDate(parseFloat(day));
//         },
//         h: function (dateObj, hour) {
//             dateObj.setHours(parseFloat(hour));
//         },
//         i: function (dateObj, minutes) {
//             dateObj.setMinutes(parseFloat(minutes));
//         },
//         j: function (dateObj, day) {
//             dateObj.setDate(parseFloat(day));
//         },
//         l: doNothing,
//         m: function (dateObj, month) {
//             dateObj.setMonth(parseFloat(month) - 1);
//         },
//         n: function (dateObj, month) {
//             dateObj.setMonth(parseFloat(month) - 1);
//         },
//         s: function (dateObj, seconds) {
//             dateObj.setSeconds(parseFloat(seconds));
//         },
//         u: function (_, unixMillSeconds) {
//             return new Date(parseFloat(unixMillSeconds));
//         },
//         w: doNothing,
//         y: function (dateObj, year) {
//             dateObj.setFullYear(2000 + parseFloat(year));
//         }
//     };
//     var tokenRegex = {
//         D: "(\\w+)",
//         F: "(\\w+)",
//         G: "(\\d\\d|\\d)",
//         H: "(\\d\\d|\\d)",
//         J: "(\\d\\d|\\d)\\w+",
//         K: "",
//         M: "(\\w+)",
//         S: "(\\d\\d|\\d)",
//         U: "(.+)",
//         W: "(\\d\\d|\\d)",
//         Y: "(\\d{4})",
//         Z: "(.+)",
//         d: "(\\d\\d|\\d)",
//         h: "(\\d\\d|\\d)",
//         i: "(\\d\\d|\\d)",
//         j: "(\\d\\d|\\d)",
//         l: "(\\w+)",
//         m: "(\\d\\d|\\d)",
//         n: "(\\d\\d|\\d)",
//         s: "(\\d\\d|\\d)",
//         u: "(.+)",
//         w: "(\\d\\d|\\d)",
//         y: "(\\d{2})"
//     };
//     var formats = {
//         // get the date in UTC
//         Z: function (date) { return date.toISOString(); },
//         // weekday name, short, e.g. Thu
//         D: function (date, locale, options) {
//             return locale.weekdays.shorthand[formats.w(date, locale, options)];
//         },
//         // full month name e.g. January
//         F: function (date, locale, options) {
//             return monthToStr(formats.n(date, locale, options) - 1, false, locale);
//         },
//         // padded hour 1-12
//         G: function (date, locale, options) {
//             return pad(formats.h(date, locale, options));
//         },
//         // hours with leading zero e.g. 03
//         H: function (date) { return pad(date.getHours()); },
//         // day (1-30) with ordinal suffix e.g. 1st, 2nd
//         J: function (date, locale) {
//             return locale.ordinal !== undefined
//                 ? date.getDate() + locale.ordinal(date.getDate())
//                 : date.getDate();
//         },
//         // AM/PM
//         K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
//         // shorthand month e.g. Jan, Sep, Oct, etc
//         M: function (date, locale) {
//             return monthToStr(date.getMonth(), true, locale);
//         },
//         // seconds 00-59
//         S: function (date) { return pad(date.getSeconds()); },
//         // unix timestamp
//         U: function (date) { return date.getTime() / 1000; },
//         W: function (date, _, options) {
//             return options.getWeek(date);
//         },
//         // full year e.g. 2016
//         Y: function (date) { return date.getFullYear(); },
//         // day in month, padded (01-30)
//         d: function (date) { return pad(date.getDate()); },
//         // hour from 1-12 (am/pm)
//         h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
//         // minutes, padded with leading zero e.g. 09
//         i: function (date) { return pad(date.getMinutes()); },
//         // day in month (1-30)
//         j: function (date) { return date.getDate(); },
//         // weekday name, full, e.g. Thursday
//         l: function (date, locale) {
//             return locale.weekdays.longhand[date.getDay()];
//         },
//         // padded month number (01-12)
//         m: function (date) { return pad(date.getMonth() + 1); },
//         // the month number (1-12)
//         n: function (date) { return date.getMonth() + 1; },
//         // seconds 0-59
//         s: function (date) { return date.getSeconds(); },
//         // Unix Milliseconds
//         u: function (date) { return date.getTime(); },
//         // number of the day of the week
//         w: function (date) { return date.getDay(); },
//         // last two digits of year e.g. 16 for 2016
//         y: function (date) { return String(date.getFullYear()).substring(2); }
//     };

//     var createDateFormatter = function (_a) {
//         var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
//         return function (dateObj, frmt, overrideLocale) {
//             var locale = overrideLocale || l10n;
//             if (config.formatDate !== undefined) {
//                 return config.formatDate(dateObj, frmt, locale);
//             }
//             return frmt
//                 .split("")
//                 .map(function (c, i, arr) {
//                 return formats[c] && arr[i - 1] !== "\\"
//                     ? formats[c](dateObj, locale, config)
//                     : c !== "\\"
//                         ? c
//                         : "";
//             })
//                 .join("");
//         };
//     };
//     var createDateParser = function (_a) {
//         var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
//         return function (date, givenFormat, timeless, customLocale) {
//             if (date !== 0 && !date)
//                 return undefined;
//             var locale = customLocale || l10n;
//             var parsedDate;
//             var dateOrig = date;
//             if (date instanceof Date)
//                 parsedDate = new Date(date.getTime());
//             else if (typeof date !== "string" &&
//                 date.toFixed !== undefined // timestamp
//             )
//                 // create a copy
//                 parsedDate = new Date(date);
//             else if (typeof date === "string") {
//                 // date string
//                 var format = givenFormat || (config || defaults).dateFormat;
//                 var datestr = String(date).trim();
//                 if (datestr === "today") {
//                     parsedDate = new Date();
//                     timeless = true;
//                 }
//                 else if (/Z$/.test(datestr) ||
//                     /GMT$/.test(datestr) // datestrings w/ timezone
//                 )
//                     parsedDate = new Date(date);
//                 else if (config && config.parseDate)
//                     parsedDate = config.parseDate(date, format);
//                 else {
//                     parsedDate =
//                         !config || !config.noCalendar
//                             ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
//                             : new Date(new Date().setHours(0, 0, 0, 0));
//                     var matched = void 0, ops = [];
//                     for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
//                         var token_1 = format[i];
//                         var isBackSlash = token_1 === "\\";
//                         var escaped = format[i - 1] === "\\" || isBackSlash;
//                         if (tokenRegex[token_1] && !escaped) {
//                             regexStr += tokenRegex[token_1];
//                             var match = new RegExp(regexStr).exec(date);
//                             if (match && (matched = true)) {
//                                 ops[token_1 !== "Y" ? "push" : "unshift"]({
//                                     fn: revFormat[token_1],
//                                     val: match[++matchIndex]
//                                 });
//                             }
//                         }
//                         else if (!isBackSlash)
//                             regexStr += "."; // don't really care
//                         ops.forEach(function (_a) {
//                             var fn = _a.fn, val = _a.val;
//                             return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
//                         });
//                     }
//                     parsedDate = matched ? parsedDate : undefined;
//                 }
//             }
//             /* istanbul ignore next */
//             if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
//                 config.errorHandler(new Error("Invalid date provided: " + dateOrig));
//                 return undefined;
//             }
//             if (timeless === true)
//                 parsedDate.setHours(0, 0, 0, 0);
//             return parsedDate;
//         };
//     };
//     /**
//      * Compute the difference in dates, measured in ms
//      */
//     function compareDates(date1, date2, timeless) {
//         if (timeless === void 0) { timeless = true; }
//         if (timeless !== false) {
//             return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
//                 new Date(date2.getTime()).setHours(0, 0, 0, 0));
//         }
//         return date1.getTime() - date2.getTime();
//     }
//     var isBetween = function (ts, ts1, ts2) {
//         return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
//     };
//     var duration = {
//         DAY: 86400000
//     };

//     if (typeof Object.assign !== "function") {
//         Object.assign = function (target) {
//             var args = [];
//             for (var _i = 1; _i < arguments.length; _i++) {
//                 args[_i - 1] = arguments[_i];
//             }
//             if (!target) {
//                 throw TypeError("Cannot convert undefined or null to object");
//             }
//             var _loop_1 = function (source) {
//                 if (source) {
//                     Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
//                 }
//             };
//             for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
//                 var source = args_1[_a];
//                 _loop_1(source);
//             }
//             return target;
//         };
//     }

//     var DEBOUNCED_CHANGE_MS = 300;
//     function FlatpickrInstance(element, instanceConfig) {
//         var self = {
//             config: __assign({}, defaults, flatpickr.defaultConfig),
//             l10n: english
//         };
//         self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
//         self._handlers = [];
//         self.pluginElements = [];
//         self.loadedPlugins = [];
//         self._bind = bind;
//         self._setHoursFromDate = setHoursFromDate;
//         self._positionCalendar = positionCalendar;
//         self.changeMonth = changeMonth;
//         self.changeYear = changeYear;
//         self.clear = clear;
//         self.close = close;
//         self._createElement = createElement;
//         self.destroy = destroy;
//         self.isEnabled = isEnabled;
//         self.jumpToDate = jumpToDate;
//         self.open = open;
//         self.redraw = redraw;
//         self.set = set;
//         self.setDate = setDate;
//         self.toggle = toggle;
//         function setupHelperFunctions() {
//             self.utils = {
//                 getDaysInMonth: function (month, yr) {
//                     if (month === void 0) { month = self.currentMonth; }
//                     if (yr === void 0) { yr = self.currentYear; }
//                     if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
//                         return 29;
//                     return self.l10n.daysInMonth[month];
//                 }
//             };
//         }
//         function init() {
//             self.element = self.input = element;
//             self.isOpen = false;
//             parseConfig();
//             setupLocale();
//             setupInputs();
//             setupDates();
//             setupHelperFunctions();
//             if (!self.isMobile)
//                 build();
//             bindEvents();
//             if (self.selectedDates.length || self.config.noCalendar) {
//                 if (self.config.enableTime) {
//                     setHoursFromDate(self.config.noCalendar
//                         ? self.latestSelectedDateObj || self.config.minDate
//                         : undefined);
//                 }
//                 updateValue(false);
//             }
//             setCalendarWidth();
//             self.showTimeInput =
//                 self.selectedDates.length > 0 || self.config.noCalendar;
//             var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
//             /* TODO: investigate this further

//               Currently, there is weird positioning behavior in safari causing pages
//               to scroll up. https://github.com/chmln/flatpickr/issues/563

//               However, most browsers are not Safari and positioning is expensive when used
//               in scale. https://github.com/chmln/flatpickr/issues/1096
//             */
//             if (!self.isMobile && isSafari) {
//                 positionCalendar();
//             }
//             triggerEvent("onReady");
//         }
//         function bindToInstance(fn) {
//             return fn.bind(self);
//         }
//         function setCalendarWidth() {
//             var config = self.config;
//             if (config.weekNumbers === false && config.showMonths === 1)
//                 return;
//             else if (config.noCalendar !== true) {
//                 window.requestAnimationFrame(function () {
//                     if (self.calendarContainer !== undefined) {
//                         self.calendarContainer.style.visibility = "hidden";
//                         self.calendarContainer.style.display = "block";
//                     }
//                     if (self.daysContainer !== undefined) {
//                         var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
//                         self.daysContainer.style.width = daysWidth + "px";
//                         self.calendarContainer.style.width =
//                             daysWidth +
//                                 (self.weekWrapper !== undefined
//                                     ? self.weekWrapper.offsetWidth
//                                     : 0) +
//                                 "px";
//                         self.calendarContainer.style.removeProperty("visibility");
//                         self.calendarContainer.style.removeProperty("display");
//                     }
//                 });
//             }
//         }
//         /**
//          * The handler for all events targeting the time inputs
//          */
//         function updateTime(e) {
//             if (self.selectedDates.length === 0) {
//                 setDefaultTime();
//             }
//             if (e !== undefined && e.type !== "blur") {
//                 timeWrapper(e);
//             }
//             var prevValue = self._input.value;
//             setHoursFromInputs();
//             updateValue();
//             if (self._input.value !== prevValue) {
//                 self._debouncedChange();
//             }
//         }
//         function ampm2military(hour, amPM) {
//             return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
//         }
//         function military2ampm(hour) {
//             switch (hour % 24) {
//                 case 0:
//                 case 12:
//                     return 12;
//                 default:
//                     return hour % 12;
//             }
//         }
//         /**
//          * Syncs the selected date object time with user's time input
//          */
//         function setHoursFromInputs() {
//             if (self.hourElement === undefined || self.minuteElement === undefined)
//                 return;
//             var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
//                 ? (parseInt(self.secondElement.value, 10) || 0) % 60
//                 : 0;
//             if (self.amPM !== undefined) {
//                 hours = ampm2military(hours, self.amPM.textContent);
//             }
//             var limitMinHours = self.config.minTime !== undefined ||
//                 (self.config.minDate &&
//                     self.minDateHasTime &&
//                     self.latestSelectedDateObj &&
//                     compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
//                         0);
//             var limitMaxHours = self.config.maxTime !== undefined ||
//                 (self.config.maxDate &&
//                     self.maxDateHasTime &&
//                     self.latestSelectedDateObj &&
//                     compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
//                         0);
//             if (limitMaxHours) {
//                 var maxTime = self.config.maxTime !== undefined
//                     ? self.config.maxTime
//                     : self.config.maxDate;
//                 hours = Math.min(hours, maxTime.getHours());
//                 if (hours === maxTime.getHours())
//                     minutes = Math.min(minutes, maxTime.getMinutes());
//                 if (minutes === maxTime.getMinutes())
//                     seconds = Math.min(seconds, maxTime.getSeconds());
//             }
//             if (limitMinHours) {
//                 var minTime = self.config.minTime !== undefined
//                     ? self.config.minTime
//                     : self.config.minDate;
//                 hours = Math.max(hours, minTime.getHours());
//                 if (hours === minTime.getHours())
//                     minutes = Math.max(minutes, minTime.getMinutes());
//                 if (minutes === minTime.getMinutes())
//                     seconds = Math.max(seconds, minTime.getSeconds());
//             }
//             setHours(hours, minutes, seconds);
//         }
//         /**
//          * Syncs time input values with a date
//          */
//         function setHoursFromDate(dateObj) {
//             var date = dateObj || self.latestSelectedDateObj;
//             if (date)
//                 setHours(date.getHours(), date.getMinutes(), date.getSeconds());
//         }
//         function setDefaultHours() {
//             var hours = self.config.defaultHour;
//             var minutes = self.config.defaultMinute;
//             var seconds = self.config.defaultSeconds;
//             if (self.config.minDate !== undefined) {
//                 var minHr = self.config.minDate.getHours();
//                 var minMinutes = self.config.minDate.getMinutes();
//                 hours = Math.max(hours, minHr);
//                 if (hours === minHr)
//                     minutes = Math.max(minMinutes, minutes);
//                 if (hours === minHr && minutes === minMinutes)
//                     seconds = self.config.minDate.getSeconds();
//             }
//             if (self.config.maxDate !== undefined) {
//                 var maxHr = self.config.maxDate.getHours();
//                 var maxMinutes = self.config.maxDate.getMinutes();
//                 hours = Math.min(hours, maxHr);
//                 if (hours === maxHr)
//                     minutes = Math.min(maxMinutes, minutes);
//                 if (hours === maxHr && minutes === maxMinutes)
//                     seconds = self.config.maxDate.getSeconds();
//             }
//             setHours(hours, minutes, seconds);
//         }
//         /**
//          * Sets the hours, minutes, and optionally seconds
//          * of the latest selected date object and the
//          * corresponding time inputs
//          * @param {Number} hours the hour. whether its military
//          *                 or am-pm gets inferred from config
//          * @param {Number} minutes the minutes
//          * @param {Number} seconds the seconds (optional)
//          */
//         function setHours(hours, minutes, seconds) {
//             if (self.latestSelectedDateObj !== undefined) {
//                 self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
//             }
//             if (!self.hourElement || !self.minuteElement || self.isMobile)
//                 return;
//             self.hourElement.value = pad(!self.config.time_24hr
//                 ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
//                 : hours);
//             self.minuteElement.value = pad(minutes);
//             if (self.amPM !== undefined)
//                 self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
//             if (self.secondElement !== undefined)
//                 self.secondElement.value = pad(seconds);
//         }
//         /**
//          * Handles the year input and incrementing events
//          * @param {Event} event the keyup or increment event
//          */
//         function onYearInput(event) {
//             var year = parseInt(event.target.value) + (event.delta || 0);
//             if (year / 1000 > 1 ||
//                 (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
//                 changeYear(year);
//             }
//         }
//         /**
//          * Essentially addEventListener + tracking
//          * @param {Element} element the element to addEventListener to
//          * @param {String} event the event name
//          * @param {Function} handler the event handler
//          */
//         function bind(element, event, handler, options) {
//             if (event instanceof Array)
//                 return event.forEach(function (ev) { return bind(element, ev, handler, options); });
//             if (element instanceof Array)
//                 return element.forEach(function (el) { return bind(el, event, handler, options); });
//             element.addEventListener(event, handler, options);
//             self._handlers.push({
//                 element: element,
//                 event: event,
//                 handler: handler,
//                 options: options
//             });
//         }
//         /**
//          * A mousedown handler which mimics click.
//          * Minimizes latency, since we don't need to wait for mouseup in most cases.
//          * Also, avoids handling right clicks.
//          *
//          * @param {Function} handler the event handler
//          */
//         function onClick(handler) {
//             return function (evt) {
//                 evt.which === 1 && handler(evt);
//             };
//         }
//         function triggerChange() {
//             triggerEvent("onChange");
//         }
//         /**
//          * Adds all the necessary event listeners
//          */
//         function bindEvents() {
//             if (self.config.wrap) {
//                 ["open", "close", "toggle", "clear"].forEach(function (evt) {
//                     Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
//                         return bind(el, "click", self[evt]);
//                     });
//                 });
//             }
//             if (self.isMobile) {
//                 setupMobile();
//                 return;
//             }
//             var debouncedResize = debounce(onResize, 50);
//             self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
//             if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
//                 bind(self.daysContainer, "mouseover", function (e) {
//                     if (self.config.mode === "range")
//                         onMouseOver(e.target);
//                 });
//             bind(window.document.body, "keydown", onKeyDown);
//             if (!self.config.inline && !self.config.static)
//                 bind(window, "resize", debouncedResize);
//             if (window.ontouchstart !== undefined)
//                 bind(window.document, "touchstart", documentClick);
//             else
//                 bind(window.document, "mousedown", onClick(documentClick));
//             bind(window.document, "focus", documentClick, { capture: true });
//             if (self.config.clickOpens === true) {
//                 bind(self._input, "focus", self.open);
//                 bind(self._input, "mousedown", onClick(self.open));
//             }
//             if (self.daysContainer !== undefined) {
//                 bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
//                 bind(self.monthNav, ["keyup", "increment"], onYearInput);
//                 bind(self.daysContainer, "mousedown", onClick(selectDate));
//             }
//             if (self.timeContainer !== undefined &&
//                 self.minuteElement !== undefined &&
//                 self.hourElement !== undefined) {
//                 var selText = function (e) {
//                     return e.target.select();
//                 };
//                 bind(self.timeContainer, ["increment"], updateTime);
//                 bind(self.timeContainer, "blur", updateTime, { capture: true });
//                 bind(self.timeContainer, "mousedown", onClick(timeIncrement));
//                 bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
//                 if (self.secondElement !== undefined)
//                     bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
//                 if (self.amPM !== undefined) {
//                     bind(self.amPM, "mousedown", onClick(function (e) {
//                         updateTime(e);
//                         triggerChange();
//                     }));
//                 }
//             }
//         }
//         /**
//          * Set the calendar view to a particular date.
//          * @param {Date} jumpDate the date to set the view to
//          * @param {boolean} triggerChange if change events should be triggered
//          */
//         function jumpToDate(jumpDate, triggerChange) {
//             var jumpTo = jumpDate !== undefined
//                 ? self.parseDate(jumpDate)
//                 : self.latestSelectedDateObj ||
//                     (self.config.minDate && self.config.minDate > self.now
//                         ? self.config.minDate
//                         : self.config.maxDate && self.config.maxDate < self.now
//                             ? self.config.maxDate
//                             : self.now);
//             var oldYear = self.currentYear;
//             var oldMonth = self.currentMonth;
//             try {
//                 if (jumpTo !== undefined) {
//                     self.currentYear = jumpTo.getFullYear();
//                     self.currentMonth = jumpTo.getMonth();
//                 }
//             }
//             catch (e) {
//                 /* istanbul ignore next */
//                 e.message = "Invalid date supplied: " + jumpTo;
//                 self.config.errorHandler(e);
//             }
//             if (triggerChange && self.currentYear !== oldYear) {
//                 triggerEvent("onYearChange");
//                 buildMonthSwitch();
//             }
//             if (triggerChange &&
//                 (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
//                 triggerEvent("onMonthChange");
//             }
//             self.redraw();
//         }
//         /**
//          * The up/down arrow handler for time inputs
//          * @param {Event} e the click event
//          */
//         function timeIncrement(e) {
//             if (~e.target.className.indexOf("arrow"))
//                 incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
//         }
//         /**
//          * Increments/decrements the value of input associ-
//          * ated with the up/down arrow by dispatching an
//          * "increment" event on the input.
//          *
//          * @param {Event} e the click event
//          * @param {Number} delta the diff (usually 1 or -1)
//          * @param {Element} inputElem the input element
//          */
//         function incrementNumInput(e, delta, inputElem) {
//             var target = e && e.target;
//             var input = inputElem ||
//                 (target && target.parentNode && target.parentNode.firstChild);
//             var event = createEvent("increment");
//             event.delta = delta;
//             input && input.dispatchEvent(event);
//         }
//         function build() {
//             var fragment = window.document.createDocumentFragment();
//             self.calendarContainer = createElement("div", "flatpickr-calendar");
//             self.calendarContainer.tabIndex = -1;
//             if (!self.config.noCalendar) {
//                 fragment.appendChild(buildMonthNav());
//                 self.innerContainer = createElement("div", "flatpickr-innerContainer");
//                 if (self.config.weekNumbers) {
//                     var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
//                     self.innerContainer.appendChild(weekWrapper);
//                     self.weekNumbers = weekNumbers;
//                     self.weekWrapper = weekWrapper;
//                 }
//                 self.rContainer = createElement("div", "flatpickr-rContainer");
//                 self.rContainer.appendChild(buildWeekdays());
//                 if (!self.daysContainer) {
//                     self.daysContainer = createElement("div", "flatpickr-days");
//                     self.daysContainer.tabIndex = -1;
//                 }
//                 buildDays();
//                 self.rContainer.appendChild(self.daysContainer);
//                 self.innerContainer.appendChild(self.rContainer);
//                 fragment.appendChild(self.innerContainer);
//             }
//             if (self.config.enableTime) {
//                 fragment.appendChild(buildTime());
//             }
//             toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
//             toggleClass(self.calendarContainer, "animate", self.config.animate === true);
//             toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
//             self.calendarContainer.appendChild(fragment);
//             var customAppend = self.config.appendTo !== undefined &&
//                 self.config.appendTo.nodeType !== undefined;
//             if (self.config.inline || self.config.static) {
//                 self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
//                 if (self.config.inline) {
//                     if (!customAppend && self.element.parentNode)
//                         self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
//                     else if (self.config.appendTo !== undefined)
//                         self.config.appendTo.appendChild(self.calendarContainer);
//                 }
//                 if (self.config.static) {
//                     var wrapper = createElement("div", "flatpickr-wrapper");
//                     if (self.element.parentNode)
//                         self.element.parentNode.insertBefore(wrapper, self.element);
//                     wrapper.appendChild(self.element);
//                     if (self.altInput)
//                         wrapper.appendChild(self.altInput);
//                     wrapper.appendChild(self.calendarContainer);
//                 }
//             }
//             if (!self.config.static && !self.config.inline)
//                 (self.config.appendTo !== undefined
//                     ? self.config.appendTo
//                     : window.document.body).appendChild(self.calendarContainer);
//         }
//         function createDay(className, date, dayNumber, i) {
//             var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
//             dayElement.dateObj = date;
//             dayElement.$i = i;
//             dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
//             if (className.indexOf("hidden") === -1 &&
//                 compareDates(date, self.now) === 0) {
//                 self.todayDateElem = dayElement;
//                 dayElement.classList.add("today");
//                 dayElement.setAttribute("aria-current", "date");
//             }
//             if (dateIsEnabled) {
//                 dayElement.tabIndex = -1;
//                 if (isDateSelected(date)) {
//                     dayElement.classList.add("selected");
//                     self.selectedDateElem = dayElement;
//                     if (self.config.mode === "range") {
//                         toggleClass(dayElement, "startRange", self.selectedDates[0] &&
//                             compareDates(date, self.selectedDates[0], true) === 0);
//                         toggleClass(dayElement, "endRange", self.selectedDates[1] &&
//                             compareDates(date, self.selectedDates[1], true) === 0);
//                         if (className === "nextMonthDay")
//                             dayElement.classList.add("inRange");
//                     }
//                 }
//             }
//             else {
//                 dayElement.classList.add("flatpickr-disabled");
//             }
//             if (self.config.mode === "range") {
//                 if (isDateInRange(date) && !isDateSelected(date))
//                     dayElement.classList.add("inRange");
//             }
//             if (self.weekNumbers &&
//                 self.config.showMonths === 1 &&
//                 className !== "prevMonthDay" &&
//                 dayNumber % 7 === 1) {
//                 self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
//             }
//             triggerEvent("onDayCreate", dayElement);
//             return dayElement;
//         }
//         function focusOnDayElem(targetNode) {
//             targetNode.focus();
//             if (self.config.mode === "range")
//                 onMouseOver(targetNode);
//         }
//         function getFirstAvailableDay(delta) {
//             var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
//             var endMonth = delta > 0 ? self.config.showMonths : -1;
//             for (var m = startMonth; m != endMonth; m += delta) {
//                 var month = self.daysContainer.children[m];
//                 var startIndex = delta > 0 ? 0 : month.children.length - 1;
//                 var endIndex = delta > 0 ? month.children.length : -1;
//                 for (var i = startIndex; i != endIndex; i += delta) {
//                     var c = month.children[i];
//                     if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
//                         return c;
//                 }
//             }
//             return undefined;
//         }
//         function getNextAvailableDay(current, delta) {
//             var givenMonth = current.className.indexOf("Month") === -1
//                 ? current.dateObj.getMonth()
//                 : self.currentMonth;
//             var endMonth = delta > 0 ? self.config.showMonths : -1;
//             var loopDelta = delta > 0 ? 1 : -1;
//             for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
//                 var month = self.daysContainer.children[m];
//                 var startIndex = givenMonth - self.currentMonth === m
//                     ? current.$i + delta
//                     : delta < 0
//                         ? month.children.length - 1
//                         : 0;
//                 var numMonthDays = month.children.length;
//                 for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
//                     var c = month.children[i];
//                     if (c.className.indexOf("hidden") === -1 &&
//                         isEnabled(c.dateObj) &&
//                         Math.abs(current.$i - i) >= Math.abs(delta))
//                         return focusOnDayElem(c);
//                 }
//             }
//             self.changeMonth(loopDelta);
//             focusOnDay(getFirstAvailableDay(loopDelta), 0);
//             return undefined;
//         }
//         function focusOnDay(current, offset) {
//             var dayFocused = isInView(document.activeElement || document.body);
//             var startElem = current !== undefined
//                 ? current
//                 : dayFocused
//                     ? document.activeElement
//                     : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
//                         ? self.selectedDateElem
//                         : self.todayDateElem !== undefined && isInView(self.todayDateElem)
//                             ? self.todayDateElem
//                             : getFirstAvailableDay(offset > 0 ? 1 : -1);
//             if (startElem === undefined)
//                 return self._input.focus();
//             if (!dayFocused)
//                 return focusOnDayElem(startElem);
//             getNextAvailableDay(startElem, offset);
//         }
//         function buildMonthDays(year, month) {
//             var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
//             var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
//             var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
//             var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
//             // prepend days from the ending of previous month
//             for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
//                 days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
//             }
//             // Start at 1 since there is no 0th day
//             for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
//                 days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
//             }
//             // append days from the next month
//             for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
//                 (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
//                 days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
//             }
//             //updateNavigationCurrentMonth();
//             var dayContainer = createElement("div", "dayContainer");
//             dayContainer.appendChild(days);
//             return dayContainer;
//         }
//         function buildDays() {
//             if (self.daysContainer === undefined) {
//                 return;
//             }
//             clearNode(self.daysContainer);
//             // TODO: week numbers for each month
//             if (self.weekNumbers)
//                 clearNode(self.weekNumbers);
//             var frag = document.createDocumentFragment();
//             for (var i = 0; i < self.config.showMonths; i++) {
//                 var d = new Date(self.currentYear, self.currentMonth, 1);
//                 d.setMonth(self.currentMonth + i);
//                 frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
//             }
//             self.daysContainer.appendChild(frag);
//             self.days = self.daysContainer.firstChild;
//             if (self.config.mode === "range" && self.selectedDates.length === 1) {
//                 onMouseOver();
//             }
//         }
//         function buildMonthSwitch() {
//             if (self.config.showMonths > 1 ||
//                 self.config.monthSelectorType !== "dropdown")
//                 return;
//             var shouldBuildMonth = function (month) {
//                 if (self.config.minDate !== undefined &&
//                     self.currentYear === self.config.minDate.getFullYear() &&
//                     month < self.config.minDate.getMonth()) {
//                     return false;
//                 }
//                 return !(self.config.maxDate !== undefined &&
//                     self.currentYear === self.config.maxDate.getFullYear() &&
//                     month > self.config.maxDate.getMonth());
//             };
//             self.monthsDropdownContainer.tabIndex = -1;
//             self.monthsDropdownContainer.innerHTML = "";
//             for (var i = 0; i < 12; i++) {
//                 if (!shouldBuildMonth(i))
//                     continue;
//                 var month = createElement("option", "flatpickr-monthDropdown-month");
//                 month.value = new Date(self.currentYear, i).getMonth().toString();
//                 month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
//                 month.tabIndex = -1;
//                 if (self.currentMonth === i) {
//                     month.selected = true;
//                 }
//                 self.monthsDropdownContainer.appendChild(month);
//             }
//         }
//         function buildMonth() {
//             var container = createElement("div", "flatpickr-month");
//             var monthNavFragment = window.document.createDocumentFragment();
//             var monthElement;
//             if (self.config.showMonths > 1 ||
//                 self.config.monthSelectorType === "static") {
//                 monthElement = createElement("span", "cur-month");
//             }
//             else {
//                 self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
//                 bind(self.monthsDropdownContainer, "change", function (e) {
//                     var target = e.target;
//                     var selectedMonth = parseInt(target.value, 10);
//                     self.changeMonth(selectedMonth - self.currentMonth);
//                     triggerEvent("onMonthChange");
//                 });
//                 buildMonthSwitch();
//                 monthElement = self.monthsDropdownContainer;
//             }
//             var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
//             var yearElement = yearInput.getElementsByTagName("input")[0];
//             yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
//             if (self.config.minDate) {
//                 yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
//             }
//             if (self.config.maxDate) {
//                 yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
//                 yearElement.disabled =
//                     !!self.config.minDate &&
//                         self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
//             }
//             var currentMonth = createElement("div", "flatpickr-current-month");
//             currentMonth.appendChild(monthElement);
//             currentMonth.appendChild(yearInput);
//             monthNavFragment.appendChild(currentMonth);
//             container.appendChild(monthNavFragment);
//             return {
//                 container: container,
//                 yearElement: yearElement,
//                 monthElement: monthElement
//             };
//         }
//         function buildMonths() {
//             clearNode(self.monthNav);
//             self.monthNav.appendChild(self.prevMonthNav);
//             if (self.config.showMonths) {
//                 self.yearElements = [];
//                 self.monthElements = [];
//             }
//             for (var m = self.config.showMonths; m--;) {
//                 var month = buildMonth();
//                 self.yearElements.push(month.yearElement);
//                 self.monthElements.push(month.monthElement);
//                 self.monthNav.appendChild(month.container);
//             }
//             self.monthNav.appendChild(self.nextMonthNav);
//         }
//         function buildMonthNav() {
//             self.monthNav = createElement("div", "flatpickr-months");
//             self.yearElements = [];
//             self.monthElements = [];
//             self.prevMonthNav = createElement("span", "flatpickr-prev-month");
//             self.prevMonthNav.innerHTML = self.config.prevArrow;
//             self.nextMonthNav = createElement("span", "flatpickr-next-month");
//             self.nextMonthNav.innerHTML = self.config.nextArrow;
//             buildMonths();
//             Object.defineProperty(self, "_hidePrevMonthArrow", {
//                 get: function () { return self.__hidePrevMonthArrow; },
//                 set: function (bool) {
//                     if (self.__hidePrevMonthArrow !== bool) {
//                         toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
//                         self.__hidePrevMonthArrow = bool;
//                     }
//                 }
//             });
//             Object.defineProperty(self, "_hideNextMonthArrow", {
//                 get: function () { return self.__hideNextMonthArrow; },
//                 set: function (bool) {
//                     if (self.__hideNextMonthArrow !== bool) {
//                         toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
//                         self.__hideNextMonthArrow = bool;
//                     }
//                 }
//             });
//             self.currentYearElement = self.yearElements[0];
//             updateNavigationCurrentMonth();
//             return self.monthNav;
//         }
//         function buildTime() {
//             self.calendarContainer.classList.add("hasTime");
//             if (self.config.noCalendar)
//                 self.calendarContainer.classList.add("noCalendar");
//             self.timeContainer = createElement("div", "flatpickr-time");
//             self.timeContainer.tabIndex = -1;
//             var separator = createElement("span", "flatpickr-time-separator", ":");
//             var hourInput = createNumberInput("flatpickr-hour", {
//                 "aria-label": self.l10n.hourAriaLabel
//             });
//             self.hourElement = hourInput.getElementsByTagName("input")[0];
//             var minuteInput = createNumberInput("flatpickr-minute", {
//                 "aria-label": self.l10n.minuteAriaLabel
//             });
//             self.minuteElement = minuteInput.getElementsByTagName("input")[0];
//             self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
//             self.hourElement.value = pad(self.latestSelectedDateObj
//                 ? self.latestSelectedDateObj.getHours()
//                 : self.config.time_24hr
//                     ? self.config.defaultHour
//                     : military2ampm(self.config.defaultHour));
//             self.minuteElement.value = pad(self.latestSelectedDateObj
//                 ? self.latestSelectedDateObj.getMinutes()
//                 : self.config.defaultMinute);
//             self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
//             self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
//             self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
//             self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
//             self.minuteElement.setAttribute("min", "0");
//             self.minuteElement.setAttribute("max", "59");
//             self.timeContainer.appendChild(hourInput);
//             self.timeContainer.appendChild(separator);
//             self.timeContainer.appendChild(minuteInput);
//             if (self.config.time_24hr)
//                 self.timeContainer.classList.add("time24hr");
//             if (self.config.enableSeconds) {
//                 self.timeContainer.classList.add("hasSeconds");
//                 var secondInput = createNumberInput("flatpickr-second");
//                 self.secondElement = secondInput.getElementsByTagName("input")[0];
//                 self.secondElement.value = pad(self.latestSelectedDateObj
//                     ? self.latestSelectedDateObj.getSeconds()
//                     : self.config.defaultSeconds);
//                 self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
//                 self.secondElement.setAttribute("min", "0");
//                 self.secondElement.setAttribute("max", "59");
//                 self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
//                 self.timeContainer.appendChild(secondInput);
//             }
//             if (!self.config.time_24hr) {
//                 // add self.amPM if appropriate
//                 self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
//                     ? self.hourElement.value
//                     : self.config.defaultHour) > 11)]);
//                 self.amPM.title = self.l10n.toggleTitle;
//                 self.amPM.tabIndex = -1;
//                 self.timeContainer.appendChild(self.amPM);
//             }
//             return self.timeContainer;
//         }
//         function buildWeekdays() {
//             if (!self.weekdayContainer)
//                 self.weekdayContainer = createElement("div", "flatpickr-weekdays");
//             else
//                 clearNode(self.weekdayContainer);
//             for (var i = self.config.showMonths; i--;) {
//                 var container = createElement("div", "flatpickr-weekdaycontainer");
//                 self.weekdayContainer.appendChild(container);
//             }
//             updateWeekdays();
//             return self.weekdayContainer;
//         }
//         function updateWeekdays() {
//             if (!self.weekdayContainer) {
//                 return;
//             }
//             var firstDayOfWeek = self.l10n.firstDayOfWeek;
//             var weekdays = self.l10n.weekdays.shorthand.slice();
//             if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
//                 weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
//             }
//             for (var i = self.config.showMonths; i--;) {
//                 self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
//             }
//         }
//         /* istanbul ignore next */
//         function buildWeeks() {
//             self.calendarContainer.classList.add("hasWeeks");
//             var weekWrapper = createElement("div", "flatpickr-weekwrapper");
//             weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
//             var weekNumbers = createElement("div", "flatpickr-weeks");
//             weekWrapper.appendChild(weekNumbers);
//             return {
//                 weekWrapper: weekWrapper,
//                 weekNumbers: weekNumbers
//             };
//         }
//         function changeMonth(value, isOffset) {
//             if (isOffset === void 0) { isOffset = true; }
//             var delta = isOffset ? value : value - self.currentMonth;
//             if ((delta < 0 && self._hidePrevMonthArrow === true) ||
//                 (delta > 0 && self._hideNextMonthArrow === true))
//                 return;
//             self.currentMonth += delta;
//             if (self.currentMonth < 0 || self.currentMonth > 11) {
//                 self.currentYear += self.currentMonth > 11 ? 1 : -1;
//                 self.currentMonth = (self.currentMonth + 12) % 12;
//                 triggerEvent("onYearChange");
//                 buildMonthSwitch();
//             }
//             buildDays();
//             triggerEvent("onMonthChange");
//             updateNavigationCurrentMonth();
//         }
//         function clear(triggerChangeEvent, toInitial) {
//             if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
//             if (toInitial === void 0) { toInitial = true; }
//             self.input.value = "";
//             if (self.altInput !== undefined)
//                 self.altInput.value = "";
//             if (self.mobileInput !== undefined)
//                 self.mobileInput.value = "";
//             self.selectedDates = [];
//             self.latestSelectedDateObj = undefined;
//             if (toInitial === true) {
//                 self.currentYear = self._initialDate.getFullYear();
//                 self.currentMonth = self._initialDate.getMonth();
//             }
//             self.showTimeInput = false;
//             if (self.config.enableTime === true) {
//                 setDefaultHours();
//             }
//             self.redraw();
//             if (triggerChangeEvent)
//                 // triggerChangeEvent is true (default) or an Event
//                 triggerEvent("onChange");
//         }
//         function close() {
//             self.isOpen = false;
//             if (!self.isMobile) {
//                 if (self.calendarContainer !== undefined) {
//                     self.calendarContainer.classList.remove("open");
//                 }
//                 if (self._input !== undefined) {
//                     self._input.classList.remove("active");
//                 }
//             }
//             triggerEvent("onClose");
//         }
//         function destroy() {
//             if (self.config !== undefined)
//                 triggerEvent("onDestroy");
//             for (var i = self._handlers.length; i--;) {
//                 var h = self._handlers[i];
//                 h.element.removeEventListener(h.event, h.handler, h.options);
//             }
//             self._handlers = [];
//             if (self.mobileInput) {
//                 if (self.mobileInput.parentNode)
//                     self.mobileInput.parentNode.removeChild(self.mobileInput);
//                 self.mobileInput = undefined;
//             }
//             else if (self.calendarContainer && self.calendarContainer.parentNode) {
//                 if (self.config.static && self.calendarContainer.parentNode) {
//                     var wrapper = self.calendarContainer.parentNode;
//                     wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
//                     if (wrapper.parentNode) {
//                         while (wrapper.firstChild)
//                             wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
//                         wrapper.parentNode.removeChild(wrapper);
//                     }
//                 }
//                 else
//                     self.calendarContainer.parentNode.removeChild(self.calendarContainer);
//             }
//             if (self.altInput) {
//                 self.input.type = "text";
//                 if (self.altInput.parentNode)
//                     self.altInput.parentNode.removeChild(self.altInput);
//                 delete self.altInput;
//             }
//             if (self.input) {
//                 self.input.type = self.input._type;
//                 self.input.classList.remove("flatpickr-input");
//                 self.input.removeAttribute("readonly");
//                 self.input.value = "";
//             }
//             [
//                 "_showTimeInput",
//                 "latestSelectedDateObj",
//                 "_hideNextMonthArrow",
//                 "_hidePrevMonthArrow",
//                 "__hideNextMonthArrow",
//                 "__hidePrevMonthArrow",
//                 "isMobile",
//                 "isOpen",
//                 "selectedDateElem",
//                 "minDateHasTime",
//                 "maxDateHasTime",
//                 "days",
//                 "daysContainer",
//                 "_input",
//                 "_positionElement",
//                 "innerContainer",
//                 "rContainer",
//                 "monthNav",
//                 "todayDateElem",
//                 "calendarContainer",
//                 "weekdayContainer",
//                 "prevMonthNav",
//                 "nextMonthNav",
//                 "monthsDropdownContainer",
//                 "currentMonthElement",
//                 "currentYearElement",
//                 "navigationCurrentMonth",
//                 "selectedDateElem",
//                 "config",
//             ].forEach(function (k) {
//                 try {
//                     delete self[k];
//                 }
//                 catch (_) { }
//             });
//         }
//         function isCalendarElem(elem) {
//             if (self.config.appendTo && self.config.appendTo.contains(elem))
//                 return true;
//             return self.calendarContainer.contains(elem);
//         }
//         function documentClick(e) {
//             if (self.isOpen && !self.config.inline) {
//                 var eventTarget_1 = getEventTarget(e);
//                 var isCalendarElement = isCalendarElem(eventTarget_1);
//                 var isInput = eventTarget_1 === self.input ||
//                     eventTarget_1 === self.altInput ||
//                     self.element.contains(eventTarget_1) ||
//                     // web components
//                     // e.path is not present in all browsers. circumventing typechecks
//                     (e.path &&
//                         e.path.indexOf &&
//                         (~e.path.indexOf(self.input) ||
//                             ~e.path.indexOf(self.altInput)));
//                 var lostFocus = e.type === "blur"
//                     ? isInput &&
//                         e.relatedTarget &&
//                         !isCalendarElem(e.relatedTarget)
//                     : !isInput &&
//                         !isCalendarElement &&
//                         !isCalendarElem(e.relatedTarget);
//                 var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
//                     return elem.contains(eventTarget_1);
//                 });
//                 if (lostFocus && isIgnored) {
//                     if (self.timeContainer !== undefined &&
//                         self.minuteElement !== undefined &&
//                         self.hourElement !== undefined) {
//                         updateTime();
//                     }
//                     self.close();
//                     if (self.config.mode === "range" && self.selectedDates.length === 1) {
//                         self.clear(false);
//                         self.redraw();
//                     }
//                 }
//             }
//         }
//         function changeYear(newYear) {
//             if (!newYear ||
//                 (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
//                 (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
//                 return;
//             var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
//             self.currentYear = newYearNum || self.currentYear;
//             if (self.config.maxDate &&
//                 self.currentYear === self.config.maxDate.getFullYear()) {
//                 self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
//             }
//             else if (self.config.minDate &&
//                 self.currentYear === self.config.minDate.getFullYear()) {
//                 self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
//             }
//             if (isNewYear) {
//                 self.redraw();
//                 triggerEvent("onYearChange");
//                 buildMonthSwitch();
//             }
//         }
//         function isEnabled(date, timeless) {
//             if (timeless === void 0) { timeless = true; }
//             var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
//             if ((self.config.minDate &&
//                 dateToCheck &&
//                 compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
//                 (self.config.maxDate &&
//                     dateToCheck &&
//                     compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
//                 return false;
//             if (self.config.enable.length === 0 && self.config.disable.length === 0)
//                 return true;
//             if (dateToCheck === undefined)
//                 return false;
//             var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
//             for (var i = 0, d = void 0; i < array.length; i++) {
//                 d = array[i];
//                 if (typeof d === "function" &&
//                     d(dateToCheck) // disabled by function
//                 )
//                     return bool;
//                 else if (d instanceof Date &&
//                     dateToCheck !== undefined &&
//                     d.getTime() === dateToCheck.getTime())
//                     // disabled by date
//                     return bool;
//                 else if (typeof d === "string" && dateToCheck !== undefined) {
//                     // disabled by date string
//                     var parsed = self.parseDate(d, undefined, true);
//                     return parsed && parsed.getTime() === dateToCheck.getTime()
//                         ? bool
//                         : !bool;
//                 }
//                 else if (
//                 // disabled by range
//                 typeof d === "object" &&
//                     dateToCheck !== undefined &&
//                     d.from &&
//                     d.to &&
//                     dateToCheck.getTime() >= d.from.getTime() &&
//                     dateToCheck.getTime() <= d.to.getTime())
//                     return bool;
//             }
//             return !bool;
//         }
//         function isInView(elem) {
//             if (self.daysContainer !== undefined)
//                 return (elem.className.indexOf("hidden") === -1 &&
//                     self.daysContainer.contains(elem));
//             return false;
//         }
//         function onKeyDown(e) {
//             // e.key                      e.keyCode
//             // "Backspace"                        8
//             // "Tab"                              9
//             // "Enter"                           13
//             // "Escape"     (IE "Esc")           27
//             // "ArrowLeft"  (IE "Left")          37
//             // "ArrowUp"    (IE "Up")            38
//             // "ArrowRight" (IE "Right")         39
//             // "ArrowDown"  (IE "Down")          40
//             // "Delete"     (IE "Del")           46
//             var isInput = e.target === self._input;
//             var allowInput = self.config.allowInput;
//             var allowKeydown = self.isOpen && (!allowInput || !isInput);
//             var allowInlineKeydown = self.config.inline && isInput && !allowInput;
//             if (e.keyCode === 13 && isInput) {
//                 if (allowInput) {
//                     self.setDate(self._input.value, true, e.target === self.altInput
//                         ? self.config.altFormat
//                         : self.config.dateFormat);
//                     return e.target.blur();
//                 }
//                 else {
//                     self.open();
//                 }
//             }
//             else if (isCalendarElem(e.target) ||
//                 allowKeydown ||
//                 allowInlineKeydown) {
//                 var isTimeObj = !!self.timeContainer &&
//                     self.timeContainer.contains(e.target);
//                 switch (e.keyCode) {
//                     case 13:
//                         if (isTimeObj) {
//                             e.preventDefault();
//                             updateTime();
//                             focusAndClose();
//                         }
//                         else
//                             selectDate(e);
//                         break;
//                     case 27: // escape
//                         e.preventDefault();
//                         focusAndClose();
//                         break;
//                     case 8:
//                     case 46:
//                         if (isInput && !self.config.allowInput) {
//                             e.preventDefault();
//                             self.clear();
//                         }
//                         break;
//                     case 37:
//                     case 39:
//                         if (!isTimeObj && !isInput) {
//                             e.preventDefault();
//                             if (self.daysContainer !== undefined &&
//                                 (allowInput === false ||
//                                     (document.activeElement && isInView(document.activeElement)))) {
//                                 var delta_1 = e.keyCode === 39 ? 1 : -1;
//                                 if (!e.ctrlKey)
//                                     focusOnDay(undefined, delta_1);
//                                 else {
//                                     e.stopPropagation();
//                                     changeMonth(delta_1);
//                                     focusOnDay(getFirstAvailableDay(1), 0);
//                                 }
//                             }
//                         }
//                         else if (self.hourElement)
//                             self.hourElement.focus();
//                         break;
//                     case 38:
//                     case 40:
//                         e.preventDefault();
//                         var delta = e.keyCode === 40 ? 1 : -1;
//                         if ((self.daysContainer && e.target.$i !== undefined) ||
//                             e.target === self.input ||
//                             e.target === self.altInput) {
//                             if (e.ctrlKey) {
//                                 e.stopPropagation();
//                                 changeYear(self.currentYear - delta);
//                                 focusOnDay(getFirstAvailableDay(1), 0);
//                             }
//                             else if (!isTimeObj)
//                                 focusOnDay(undefined, delta * 7);
//                         }
//                         else if (e.target === self.currentYearElement) {
//                             changeYear(self.currentYear - delta);
//                         }
//                         else if (self.config.enableTime) {
//                             if (!isTimeObj && self.hourElement)
//                                 self.hourElement.focus();
//                             updateTime(e);
//                             self._debouncedChange();
//                         }
//                         break;
//                     case 9:
//                         if (isTimeObj) {
//                             var elems = [
//                                 self.hourElement,
//                                 self.minuteElement,
//                                 self.secondElement,
//                                 self.amPM,
//                             ]
//                                 .concat(self.pluginElements)
//                                 .filter(function (x) { return x; });
//                             var i = elems.indexOf(e.target);
//                             if (i !== -1) {
//                                 var target = elems[i + (e.shiftKey ? -1 : 1)];
//                                 e.preventDefault();
//                                 (target || self._input).focus();
//                             }
//                         }
//                         else if (!self.config.noCalendar &&
//                             self.daysContainer &&
//                             self.daysContainer.contains(e.target) &&
//                             e.shiftKey) {
//                             e.preventDefault();
//                             self._input.focus();
//                         }
//                         break;
//                 }
//             }
//             if (self.amPM !== undefined && e.target === self.amPM) {
//                 switch (e.key) {
//                     case self.l10n.amPM[0].charAt(0):
//                     case self.l10n.amPM[0].charAt(0).toLowerCase():
//                         self.amPM.textContent = self.l10n.amPM[0];
//                         setHoursFromInputs();
//                         updateValue();
//                         break;
//                     case self.l10n.amPM[1].charAt(0):
//                     case self.l10n.amPM[1].charAt(0).toLowerCase():
//                         self.amPM.textContent = self.l10n.amPM[1];
//                         setHoursFromInputs();
//                         updateValue();
//                         break;
//                 }
//             }
//             if (isInput || isCalendarElem(e.target)) {
//                 triggerEvent("onKeyDown", e);
//             }
//         }
//         function onMouseOver(elem) {
//             if (self.selectedDates.length !== 1 ||
//                 (elem &&
//                     (!elem.classList.contains("flatpickr-day") ||
//                         elem.classList.contains("flatpickr-disabled"))))
//                 return;
//             var hoverDate = elem
//                 ? elem.dateObj.getTime()
//                 : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
//             var containsDisabled = false;
//             var minRange = 0, maxRange = 0;
//             for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
//                 if (!isEnabled(new Date(t), true)) {
//                     containsDisabled =
//                         containsDisabled || (t > rangeStartDate && t < rangeEndDate);
//                     if (t < initialDate && (!minRange || t > minRange))
//                         minRange = t;
//                     else if (t > initialDate && (!maxRange || t < maxRange))
//                         maxRange = t;
//                 }
//             }
//             for (var m = 0; m < self.config.showMonths; m++) {
//                 var month = self.daysContainer.children[m];
//                 var _loop_1 = function (i, l) {
//                     var dayElem = month.children[i], date = dayElem.dateObj;
//                     var timestamp = date.getTime();
//                     var outOfRange = (minRange > 0 && timestamp < minRange) ||
//                         (maxRange > 0 && timestamp > maxRange);
//                     if (outOfRange) {
//                         dayElem.classList.add("notAllowed");
//                         ["inRange", "startRange", "endRange"].forEach(function (c) {
//                             dayElem.classList.remove(c);
//                         });
//                         return "continue";
//                     }
//                     else if (containsDisabled && !outOfRange)
//                         return "continue";
//                     ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
//                         dayElem.classList.remove(c);
//                     });
//                     if (elem !== undefined) {
//                         elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
//                             ? "startRange"
//                             : "endRange");
//                         if (initialDate < hoverDate && timestamp === initialDate)
//                             dayElem.classList.add("startRange");
//                         else if (initialDate > hoverDate && timestamp === initialDate)
//                             dayElem.classList.add("endRange");
//                         if (timestamp >= minRange &&
//                             (maxRange === 0 || timestamp <= maxRange) &&
//                             isBetween(timestamp, initialDate, hoverDate))
//                             dayElem.classList.add("inRange");
//                     }
//                 };
//                 for (var i = 0, l = month.children.length; i < l; i++) {
//                     _loop_1(i, l);
//                 }
//             }
//         }
//         function onResize() {
//             if (self.isOpen && !self.config.static && !self.config.inline)
//                 positionCalendar();
//         }
//         function setDefaultTime() {
//             self.setDate(self.config.minDate !== undefined
//                 ? new Date(self.config.minDate.getTime())
//                 : new Date(), true);
//             setDefaultHours();
//             updateValue();
//         }
//         function open(e, positionElement) {
//             if (positionElement === void 0) { positionElement = self._positionElement; }
//             if (self.isMobile === true) {
//                 if (e) {
//                     e.preventDefault();
//                     e.target && e.target.blur();
//                 }
//                 if (self.mobileInput !== undefined) {
//                     self.mobileInput.focus();
//                     self.mobileInput.click();
//                 }
//                 triggerEvent("onOpen");
//                 return;
//             }
//             if (self._input.disabled || self.config.inline)
//                 return;
//             var wasOpen = self.isOpen;
//             self.isOpen = true;
//             if (!wasOpen) {
//                 self.calendarContainer.classList.add("open");
//                 self._input.classList.add("active");
//                 triggerEvent("onOpen");
//                 positionCalendar(positionElement);
//             }
//             if (self.config.enableTime === true && self.config.noCalendar === true) {
//                 if (self.selectedDates.length === 0) {
//                     setDefaultTime();
//                 }
//                 if (self.config.allowInput === false &&
//                     (e === undefined ||
//                         !self.timeContainer.contains(e.relatedTarget))) {
//                     setTimeout(function () { return self.hourElement.select(); }, 50);
//                 }
//             }
//         }
//         function minMaxDateSetter(type) {
//             return function (date) {
//                 var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
//                 var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
//                 if (dateObj !== undefined) {
//                     self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
//                         dateObj.getHours() > 0 ||
//                             dateObj.getMinutes() > 0 ||
//                             dateObj.getSeconds() > 0;
//                 }
//                 if (self.selectedDates) {
//                     self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
//                     if (!self.selectedDates.length && type === "min")
//                         setHoursFromDate(dateObj);
//                     updateValue();
//                 }
//                 if (self.daysContainer) {
//                     redraw();
//                     if (dateObj !== undefined)
//                         self.currentYearElement[type] = dateObj.getFullYear().toString();
//                     else
//                         self.currentYearElement.removeAttribute(type);
//                     self.currentYearElement.disabled =
//                         !!inverseDateObj &&
//                             dateObj !== undefined &&
//                             inverseDateObj.getFullYear() === dateObj.getFullYear();
//                 }
//             };
//         }
//         function parseConfig() {
//             var boolOpts = [
//                 "wrap",
//                 "weekNumbers",
//                 "allowInput",
//                 "clickOpens",
//                 "time_24hr",
//                 "enableTime",
//                 "noCalendar",
//                 "altInput",
//                 "shorthandCurrentMonth",
//                 "inline",
//                 "static",
//                 "enableSeconds",
//                 "disableMobile",
//             ];
//             var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
//             var formats = {};
//             self.config.parseDate = userConfig.parseDate;
//             self.config.formatDate = userConfig.formatDate;
//             Object.defineProperty(self.config, "enable", {
//                 get: function () { return self.config._enable; },
//                 set: function (dates) {
//                     self.config._enable = parseDateRules(dates);
//                 }
//             });
//             Object.defineProperty(self.config, "disable", {
//                 get: function () { return self.config._disable; },
//                 set: function (dates) {
//                     self.config._disable = parseDateRules(dates);
//                 }
//             });
//             var timeMode = userConfig.mode === "time";
//             if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
//                 var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
//                 formats.dateFormat =
//                     userConfig.noCalendar || timeMode
//                         ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
//                         : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
//             }
//             if (userConfig.altInput &&
//                 (userConfig.enableTime || timeMode) &&
//                 !userConfig.altFormat) {
//                 var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
//                 formats.altFormat =
//                     userConfig.noCalendar || timeMode
//                         ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
//                         : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
//             }
//             if (!userConfig.altInputClass) {
//                 self.config.altInputClass =
//                     self.input.className + " " + self.config.altInputClass;
//             }
//             Object.defineProperty(self.config, "minDate", {
//                 get: function () { return self.config._minDate; },
//                 set: minMaxDateSetter("min")
//             });
//             Object.defineProperty(self.config, "maxDate", {
//                 get: function () { return self.config._maxDate; },
//                 set: minMaxDateSetter("max")
//             });
//             var minMaxTimeSetter = function (type) { return function (val) {
//                 self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
//             }; };
//             Object.defineProperty(self.config, "minTime", {
//                 get: function () { return self.config._minTime; },
//                 set: minMaxTimeSetter("min")
//             });
//             Object.defineProperty(self.config, "maxTime", {
//                 get: function () { return self.config._maxTime; },
//                 set: minMaxTimeSetter("max")
//             });
//             if (userConfig.mode === "time") {
//                 self.config.noCalendar = true;
//                 self.config.enableTime = true;
//             }
//             Object.assign(self.config, formats, userConfig);
//             for (var i = 0; i < boolOpts.length; i++)
//                 self.config[boolOpts[i]] =
//                     self.config[boolOpts[i]] === true ||
//                         self.config[boolOpts[i]] === "true";
//             HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
//                 self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
//             });
//             self.isMobile =
//                 !self.config.disableMobile &&
//                     !self.config.inline &&
//                     self.config.mode === "single" &&
//                     !self.config.disable.length &&
//                     !self.config.enable.length &&
//                     !self.config.weekNumbers &&
//                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//             for (var i = 0; i < self.config.plugins.length; i++) {
//                 var pluginConf = self.config.plugins[i](self) || {};
//                 for (var key in pluginConf) {
//                     if (HOOKS.indexOf(key) > -1) {
//                         self.config[key] = arrayify(pluginConf[key])
//                             .map(bindToInstance)
//                             .concat(self.config[key]);
//                     }
//                     else if (typeof userConfig[key] === "undefined")
//                         self.config[key] = pluginConf[key];
//                 }
//             }
//             triggerEvent("onParseConfig");
//         }
//         function setupLocale() {
//             if (typeof self.config.locale !== "object" &&
//                 typeof flatpickr.l10ns[self.config.locale] === "undefined")
//                 self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
//             self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
//                 ? self.config.locale
//                 : self.config.locale !== "default"
//                     ? flatpickr.l10ns[self.config.locale]
//                     : undefined));
//             tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
//             var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
//             if (userConfig.time_24hr === undefined &&
//                 flatpickr.defaultConfig.time_24hr === undefined) {
//                 self.config.time_24hr = self.l10n.time_24hr;
//             }
//             self.formatDate = createDateFormatter(self);
//             self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
//         }
//         function positionCalendar(customPositionElement) {
//             if (self.calendarContainer === undefined)
//                 return;
//             triggerEvent("onPreCalendarPosition");
//             var positionElement = customPositionElement || self._positionElement;
//             var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
//                 (configPosVertical !== "below" &&
//                     distanceFromBottom < calendarHeight &&
//                     inputBounds.top > calendarHeight);
//             var top = window.pageYOffset +
//                 inputBounds.top +
//                 (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
//             toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
//             toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
//             if (self.config.inline)
//                 return;
//             var left = window.pageXOffset +
//                 inputBounds.left -
//                 (configPosHorizontal != null && configPosHorizontal === "center"
//                     ? (calendarWidth - inputBounds.width) / 2
//                     : 0);
//             var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
//             var rightMost = left + calendarWidth > window.document.body.offsetWidth;
//             var centerMost = right + calendarWidth > window.document.body.offsetWidth;
//             toggleClass(self.calendarContainer, "rightMost", rightMost);
//             if (self.config.static)
//                 return;
//             self.calendarContainer.style.top = top + "px";
//             if (!rightMost) {
//                 self.calendarContainer.style.left = left + "px";
//                 self.calendarContainer.style.right = "auto";
//             }
//             else if (!centerMost) {
//                 self.calendarContainer.style.left = "auto";
//                 self.calendarContainer.style.right = right + "px";
//             }
//             else {
//                 var doc = document.styleSheets[0];
//                 // some testing environments don't have css support
//                 if (doc === undefined)
//                     return;
//                 var bodyWidth = window.document.body.offsetWidth;
//                 var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
//                 var centerBefore = ".flatpickr-calendar.centerMost:before";
//                 var centerAfter = ".flatpickr-calendar.centerMost:after";
//                 var centerIndex = doc.cssRules.length;
//                 var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
//                 toggleClass(self.calendarContainer, "rightMost", false);
//                 toggleClass(self.calendarContainer, "centerMost", true);
//                 doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
//                 self.calendarContainer.style.left = centerLeft + "px";
//                 self.calendarContainer.style.right = "auto";
//             }
//         }
//         function redraw() {
//             if (self.config.noCalendar || self.isMobile)
//                 return;
//             updateNavigationCurrentMonth();
//             buildDays();
//         }
//         function focusAndClose() {
//             self._input.focus();
//             if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
//                 navigator.msMaxTouchPoints !== undefined) {
//                 // hack - bugs in the way IE handles focus keeps the calendar open
//                 setTimeout(self.close, 0);
//             }
//             else {
//                 self.close();
//             }
//         }
//         function selectDate(e) {
//             e.preventDefault();
//             e.stopPropagation();
//             var isSelectable = function (day) {
//                 return day.classList &&
//                     day.classList.contains("flatpickr-day") &&
//                     !day.classList.contains("flatpickr-disabled") &&
//                     !day.classList.contains("notAllowed");
//             };
//             var t = findParent(e.target, isSelectable);
//             if (t === undefined)
//                 return;
//             var target = t;
//             var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
//             var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
//                 selectedDate.getMonth() >
//                     self.currentMonth + self.config.showMonths - 1) &&
//                 self.config.mode !== "range";
//             self.selectedDateElem = target;
//             if (self.config.mode === "single")
//                 self.selectedDates = [selectedDate];
//             else if (self.config.mode === "multiple") {
//                 var selectedIndex = isDateSelected(selectedDate);
//                 if (selectedIndex)
//                     self.selectedDates.splice(parseInt(selectedIndex), 1);
//                 else
//                     self.selectedDates.push(selectedDate);
//             }
//             else if (self.config.mode === "range") {
//                 if (self.selectedDates.length === 2) {
//                     self.clear(false, false);
//                 }
//                 self.latestSelectedDateObj = selectedDate;
//                 self.selectedDates.push(selectedDate);
//                 // unless selecting same date twice, sort ascendingly
//                 if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
//                     self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
//             }
//             setHoursFromInputs();
//             if (shouldChangeMonth) {
//                 var isNewYear = self.currentYear !== selectedDate.getFullYear();
//                 self.currentYear = selectedDate.getFullYear();
//                 self.currentMonth = selectedDate.getMonth();
//                 if (isNewYear) {
//                     triggerEvent("onYearChange");
//                     buildMonthSwitch();
//                 }
//                 triggerEvent("onMonthChange");
//             }
//             updateNavigationCurrentMonth();
//             buildDays();
//             updateValue();
//             if (self.config.enableTime)
//                 setTimeout(function () { return (self.showTimeInput = true); }, 50);
//             // maintain focus
//             if (!shouldChangeMonth &&
//                 self.config.mode !== "range" &&
//                 self.config.showMonths === 1)
//                 focusOnDayElem(target);
//             else if (self.selectedDateElem !== undefined &&
//                 self.hourElement === undefined) {
//                 self.selectedDateElem && self.selectedDateElem.focus();
//             }
//             if (self.hourElement !== undefined)
//                 self.hourElement !== undefined && self.hourElement.focus();
//             if (self.config.closeOnSelect) {
//                 var single = self.config.mode === "single" && !self.config.enableTime;
//                 var range = self.config.mode === "range" &&
//                     self.selectedDates.length === 2 &&
//                     !self.config.enableTime;
//                 if (single || range) {
//                     focusAndClose();
//                 }
//             }
//             triggerChange();
//         }
//         var CALLBACKS = {
//             locale: [setupLocale, updateWeekdays],
//             showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
//             minDate: [jumpToDate],
//             maxDate: [jumpToDate]
//         };
//         function set(option, value) {
//             if (option !== null && typeof option === "object") {
//                 Object.assign(self.config, option);
//                 for (var key in option) {
//                     if (CALLBACKS[key] !== undefined)
//                         CALLBACKS[key].forEach(function (x) { return x(); });
//                 }
//             }
//             else {
//                 self.config[option] = value;
//                 if (CALLBACKS[option] !== undefined)
//                     CALLBACKS[option].forEach(function (x) { return x(); });
//                 else if (HOOKS.indexOf(option) > -1)
//                     self.config[option] = arrayify(value);
//             }
//             self.redraw();
//             updateValue(false);
//         }
//         function setSelectedDate(inputDate, format) {
//             var dates = [];
//             if (inputDate instanceof Array)
//                 dates = inputDate.map(function (d) { return self.parseDate(d, format); });
//             else if (inputDate instanceof Date || typeof inputDate === "number")
//                 dates = [self.parseDate(inputDate, format)];
//             else if (typeof inputDate === "string") {
//                 switch (self.config.mode) {
//                     case "single":
//                     case "time":
//                         dates = [self.parseDate(inputDate, format)];
//                         break;
//                     case "multiple":
//                         dates = inputDate
//                             .split(self.config.conjunction)
//                             .map(function (date) { return self.parseDate(date, format); });
//                         break;
//                     case "range":
//                         dates = inputDate
//                             .split(self.l10n.rangeSeparator)
//                             .map(function (date) { return self.parseDate(date, format); });
//                         break;
//                 }
//             }
//             else
//                 self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
//             self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
//             if (self.config.mode === "range")
//                 self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
//         }
//         function setDate(date, triggerChange, format) {
//             if (triggerChange === void 0) { triggerChange = false; }
//             if (format === void 0) { format = self.config.dateFormat; }
//             if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
//                 return self.clear(triggerChange);
//             setSelectedDate(date, format);
//             self.showTimeInput = self.selectedDates.length > 0;
//             self.latestSelectedDateObj =
//                 self.selectedDates[self.selectedDates.length - 1];
//             self.redraw();
//             jumpToDate();
//             setHoursFromDate();
//             if (self.selectedDates.length === 0) {
//                 self.clear(false);
//             }
//             updateValue(triggerChange);
//             if (triggerChange)
//                 triggerEvent("onChange");
//         }
//         function parseDateRules(arr) {
//             return arr
//                 .slice()
//                 .map(function (rule) {
//                 if (typeof rule === "string" ||
//                     typeof rule === "number" ||
//                     rule instanceof Date) {
//                     return self.parseDate(rule, undefined, true);
//                 }
//                 else if (rule &&
//                     typeof rule === "object" &&
//                     rule.from &&
//                     rule.to)
//                     return {
//                         from: self.parseDate(rule.from, undefined),
//                         to: self.parseDate(rule.to, undefined)
//                     };
//                 return rule;
//             })
//                 .filter(function (x) { return x; }); // remove falsy values
//         }
//         function setupDates() {
//             self.selectedDates = [];
//             self.now = self.parseDate(self.config.now) || new Date();
//             // Workaround IE11 setting placeholder as the input's value
//             var preloadedDate = self.config.defaultDate ||
//                 ((self.input.nodeName === "INPUT" ||
//                     self.input.nodeName === "TEXTAREA") &&
//                     self.input.placeholder &&
//                     self.input.value === self.input.placeholder
//                     ? null
//                     : self.input.value);
//             if (preloadedDate)
//                 setSelectedDate(preloadedDate, self.config.dateFormat);
//             self._initialDate =
//                 self.selectedDates.length > 0
//                     ? self.selectedDates[0]
//                     : self.config.minDate &&
//                         self.config.minDate.getTime() > self.now.getTime()
//                         ? self.config.minDate
//                         : self.config.maxDate &&
//                             self.config.maxDate.getTime() < self.now.getTime()
//                             ? self.config.maxDate
//                             : self.now;
//             self.currentYear = self._initialDate.getFullYear();
//             self.currentMonth = self._initialDate.getMonth();
//             if (self.selectedDates.length > 0)
//                 self.latestSelectedDateObj = self.selectedDates[0];
//             if (self.config.minTime !== undefined)
//                 self.config.minTime = self.parseDate(self.config.minTime, "H:i");
//             if (self.config.maxTime !== undefined)
//                 self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
//             self.minDateHasTime =
//                 !!self.config.minDate &&
//                     (self.config.minDate.getHours() > 0 ||
//                         self.config.minDate.getMinutes() > 0 ||
//                         self.config.minDate.getSeconds() > 0);
//             self.maxDateHasTime =
//                 !!self.config.maxDate &&
//                     (self.config.maxDate.getHours() > 0 ||
//                         self.config.maxDate.getMinutes() > 0 ||
//                         self.config.maxDate.getSeconds() > 0);
//             Object.defineProperty(self, "showTimeInput", {
//                 get: function () { return self._showTimeInput; },
//                 set: function (bool) {
//                     self._showTimeInput = bool;
//                     if (self.calendarContainer)
//                         toggleClass(self.calendarContainer, "showTimeInput", bool);
//                     self.isOpen && positionCalendar();
//                 }
//             });
//         }
//         function setupInputs() {
//             self.input = self.config.wrap
//                 ? element.querySelector("[data-input]")
//                 : element;
//             /* istanbul ignore next */
//             if (!self.input) {
//                 self.config.errorHandler(new Error("Invalid input element specified"));
//                 return;
//             }
//             // hack: store previous type to restore it after destroy()
//             self.input._type = self.input.type;
//             self.input.type = "text";
//             self.input.classList.add("flatpickr-input");
//             self._input = self.input;
//             if (self.config.altInput) {
//                 // replicate self.element
//                 self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
//                 self._input = self.altInput;
//                 self.altInput.placeholder = self.input.placeholder;
//                 self.altInput.disabled = self.input.disabled;
//                 self.altInput.required = self.input.required;
//                 self.altInput.tabIndex = self.input.tabIndex;
//                 self.altInput.type = "text";
//                 self.input.setAttribute("type", "hidden");
//                 if (!self.config.static && self.input.parentNode)
//                     self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
//             }
//             if (!self.config.allowInput)
//                 self._input.setAttribute("readonly", "readonly");
//             self._positionElement = self.config.positionElement || self._input;
//         }
//         function setupMobile() {
//             var inputType = self.config.enableTime
//                 ? self.config.noCalendar
//                     ? "time"
//                     : "datetime-local"
//                 : "date";
//             self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
//             self.mobileInput.step = self.input.getAttribute("step") || "any";
//             self.mobileInput.tabIndex = 1;
//             self.mobileInput.type = inputType;
//             self.mobileInput.disabled = self.input.disabled;
//             self.mobileInput.required = self.input.required;
//             self.mobileInput.placeholder = self.input.placeholder;
//             self.mobileFormatStr =
//                 inputType === "datetime-local"
//                     ? "Y-m-d\\TH:i:S"
//                     : inputType === "date"
//                         ? "Y-m-d"
//                         : "H:i:S";
//             if (self.selectedDates.length > 0) {
//                 self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
//             }
//             if (self.config.minDate)
//                 self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
//             if (self.config.maxDate)
//                 self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
//             self.input.type = "hidden";
//             if (self.altInput !== undefined)
//                 self.altInput.type = "hidden";
//             try {
//                 if (self.input.parentNode)
//                     self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
//             }
//             catch (_a) { }
//             bind(self.mobileInput, "change", function (e) {
//                 self.setDate(e.target.value, false, self.mobileFormatStr);
//                 triggerEvent("onChange");
//                 triggerEvent("onClose");
//             });
//         }
//         function toggle(e) {
//             if (self.isOpen === true)
//                 return self.close();
//             self.open(e);
//         }
//         function triggerEvent(event, data) {
//             // If the instance has been destroyed already, all hooks have been removed
//             if (self.config === undefined)
//                 return;
//             var hooks = self.config[event];
//             if (hooks !== undefined && hooks.length > 0) {
//                 for (var i = 0; hooks[i] && i < hooks.length; i++)
//                     hooks[i](self.selectedDates, self.input.value, self, data);
//             }
//             if (event === "onChange") {
//                 self.input.dispatchEvent(createEvent("change"));
//                 // many front-end frameworks bind to the input event
//                 self.input.dispatchEvent(createEvent("input"));
//             }
//         }
//         function createEvent(name) {
//             var e = document.createEvent("Event");
//             e.initEvent(name, true, true);
//             return e;
//         }
//         function isDateSelected(date) {
//             for (var i = 0; i < self.selectedDates.length; i++) {
//                 if (compareDates(self.selectedDates[i], date) === 0)
//                     return "" + i;
//             }
//             return false;
//         }
//         function isDateInRange(date) {
//             if (self.config.mode !== "range" || self.selectedDates.length < 2)
//                 return false;
//             return (compareDates(date, self.selectedDates[0]) >= 0 &&
//                 compareDates(date, self.selectedDates[1]) <= 0);
//         }
//         function updateNavigationCurrentMonth() {
//             if (self.config.noCalendar || self.isMobile || !self.monthNav)
//                 return;
//             self.yearElements.forEach(function (yearElement, i) {
//                 var d = new Date(self.currentYear, self.currentMonth, 1);
//                 d.setMonth(self.currentMonth + i);
//                 if (self.config.showMonths > 1 ||
//                     self.config.monthSelectorType === "static") {
//                     self.monthElements[i].textContent =
//                         monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
//                 }
//                 else {
//                     self.monthsDropdownContainer.value = d.getMonth().toString();
//                 }
//                 yearElement.value = d.getFullYear().toString();
//             });
//             self._hidePrevMonthArrow =
//                 self.config.minDate !== undefined &&
//                     (self.currentYear === self.config.minDate.getFullYear()
//                         ? self.currentMonth <= self.config.minDate.getMonth()
//                         : self.currentYear < self.config.minDate.getFullYear());
//             self._hideNextMonthArrow =
//                 self.config.maxDate !== undefined &&
//                     (self.currentYear === self.config.maxDate.getFullYear()
//                         ? self.currentMonth + 1 > self.config.maxDate.getMonth()
//                         : self.currentYear > self.config.maxDate.getFullYear());
//         }
//         function getDateStr(format) {
//             return self.selectedDates
//                 .map(function (dObj) { return self.formatDate(dObj, format); })
//                 .filter(function (d, i, arr) {
//                 return self.config.mode !== "range" ||
//                     self.config.enableTime ||
//                     arr.indexOf(d) === i;
//             })
//                 .join(self.config.mode !== "range"
//                 ? self.config.conjunction
//                 : self.l10n.rangeSeparator);
//         }
//         /**
//          * Updates the values of inputs associated with the calendar
//          */
//         function updateValue(triggerChange) {
//             if (triggerChange === void 0) { triggerChange = true; }
//             if (self.mobileInput !== undefined && self.mobileFormatStr) {
//                 self.mobileInput.value =
//                     self.latestSelectedDateObj !== undefined
//                         ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
//                         : "";
//             }
//             self.input.value = getDateStr(self.config.dateFormat);
//             if (self.altInput !== undefined) {
//                 self.altInput.value = getDateStr(self.config.altFormat);
//             }
//             if (triggerChange !== false)
//                 triggerEvent("onValueUpdate");
//         }
//         function onMonthNavClick(e) {
//             var isPrevMonth = self.prevMonthNav.contains(e.target);
//             var isNextMonth = self.nextMonthNav.contains(e.target);
//             if (isPrevMonth || isNextMonth) {
//                 changeMonth(isPrevMonth ? -1 : 1);
//             }
//             else if (self.yearElements.indexOf(e.target) >= 0) {
//                 e.target.select();
//             }
//             else if (e.target.classList.contains("arrowUp")) {
//                 self.changeYear(self.currentYear + 1);
//             }
//             else if (e.target.classList.contains("arrowDown")) {
//                 self.changeYear(self.currentYear - 1);
//             }
//         }
//         function timeWrapper(e) {
//             e.preventDefault();
//             var isKeyDown = e.type === "keydown", input = e.target;
//             if (self.amPM !== undefined && e.target === self.amPM) {
//                 self.amPM.textContent =
//                     self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
//             }
//             var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
//                 (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
//             var newValue = curValue + step * delta;
//             if (typeof input.value !== "undefined" && input.value.length === 2) {
//                 var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
//                 if (newValue < min) {
//                     newValue =
//                         max +
//                             newValue +
//                             int(!isHourElem) +
//                             (int(isHourElem) && int(!self.amPM));
//                     if (isMinuteElem)
//                         incrementNumInput(undefined, -1, self.hourElement);
//                 }
//                 else if (newValue > max) {
//                     newValue =
//                         input === self.hourElement ? newValue - max - int(!self.amPM) : min;
//                     if (isMinuteElem)
//                         incrementNumInput(undefined, 1, self.hourElement);
//                 }
//                 if (self.amPM &&
//                     isHourElem &&
//                     (step === 1
//                         ? newValue + curValue === 23
//                         : Math.abs(newValue - curValue) > step)) {
//                     self.amPM.textContent =
//                         self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
//                 }
//                 input.value = pad(newValue);
//             }
//         }
//         init();
//         return self;
//     }
//     /* istanbul ignore next */
//     function _flatpickr(nodeList, config) {
//         // static list
//         var nodes = Array.prototype.slice
//             .call(nodeList)
//             .filter(function (x) { return x instanceof HTMLElement; });
//         var instances = [];
//         for (var i = 0; i < nodes.length; i++) {
//             var node = nodes[i];
//             try {
//                 if (node.getAttribute("data-fp-omit") !== null)
//                     continue;
//                 if (node._flatpickr !== undefined) {
//                     node._flatpickr.destroy();
//                     node._flatpickr = undefined;
//                 }
//                 node._flatpickr = FlatpickrInstance(node, config || {});
//                 instances.push(node._flatpickr);
//             }
//             catch (e) {
//                 console.error(e);
//             }
//         }
//         return instances.length === 1 ? instances[0] : instances;
//     }
//     /* istanbul ignore next */
//     if (typeof HTMLElement !== "undefined" &&
//         typeof HTMLCollection !== "undefined" &&
//         typeof NodeList !== "undefined") {
//         // browser env
//         HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
//             return _flatpickr(this, config);
//         };
//         HTMLElement.prototype.flatpickr = function (config) {
//             return _flatpickr([this], config);
//         };
//     }
//     /* istanbul ignore next */
//     var flatpickr = function (selector, config) {
//         if (typeof selector === "string") {
//             return _flatpickr(window.document.querySelectorAll(selector), config);
//         }
//         else if (selector instanceof Node) {
//             return _flatpickr([selector], config);
//         }
//         else {
//             return _flatpickr(selector, config);
//         }
//     };
//     /* istanbul ignore next */
//     flatpickr.defaultConfig = {};
//     flatpickr.l10ns = {
//         en: __assign({}, english),
//         "default": __assign({}, english)
//     };
//     flatpickr.localize = function (l10n) {
//         flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
//     };
//     flatpickr.setDefaults = function (config) {
//         flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
//     };
//     flatpickr.parseDate = createDateParser({});
//     flatpickr.formatDate = createDateFormatter({});
//     flatpickr.compareDates = compareDates;
//     /* istanbul ignore next */
//     if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
//         jQuery.fn.flatpickr = function (config) {
//             return _flatpickr(this, config);
//         };
//     }
//     // eslint-disable-next-line @typescript-eslint/camelcase
//     Date.prototype.fp_incr = function (days) {
//         return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
//     };
//     if (typeof window !== "undefined") {
//         window.flatpickr = flatpickr;
//     }

//     return flatpickr;

// }));
// });

const primaryNumberMales = [
  {
    name: "Fire",
    number: 9,
    duality: "Yin",
    complexity: "Complex",
    year: [
      1910,
      1919,
      1928,
      1937,
      1946,
      1955,
      1964,
      1973,
      1982,
      1991,
      2000,
      2009,
      2018
    ]
  },
  {
    name: "Mountain",
    number: 8,
    duality: "Yang",
    complexity: "Simple",
    year: [
      1911,
      1920,
      1929,
      1938,
      1947,
      1956,
      1965,
      1974,
      1983,
      1992,
      2001,
      2010,
      2019
    ]
  },
  {
    name: "Lake",
    number: 7,
    duality: "Yin",
    complexity: "Complex",
    year: [
      1912,
      1921,
      1930,
      1939,
      1948,
      1957,
      1966,
      1975,
      1984,
      1993,
      2002,
      2011,
      2020
    ]
  },
  {
    name: "Sky",
    number: 6,
    duality: "Yang",
    complexity: "Simple",
    year: [
      1913,
      1922,
      1931,
      1940,
      1949,
      1958,
      1967,
      1976,
      1985,
      1994,
      2003,
      2012,
      2021
    ]
  },
  {
    name: "Earth Core",
    number: 5,
    duality: "Yang",
    complexity: "Simple",
    year: [
      1914,
      1923,
      1932,
      1941,
      1950,
      1959,
      1968,
      1977,
      1986,
      1995,
      2004,
      2013,
      2022
    ]
  },
  {
    name: "Wind",
    number: 4,
    duality: "Yin",
    complexity: "Complex",
    year: [
      1915,
      1924,
      1933,
      1942,
      1951,
      1960,
      1969,
      1978,
      1987,
      1996,
      2005,
      2014,
      2023
    ]
  },
  {
    name: "Thunder",
    number: 3,
    duality: "Yang",
    complexity: "Simple",
    year: [
      1916,
      1925,
      1934,
      1943,
      1952,
      1961,
      1970,
      1979,
      1988,
      1997,
      2006,
      2015,
      2024
    ]
  },
  {
    name: "Earth",
    number: 2,
    duality: "Yin",
    complexity: "Complex",
    year: [
      1917,
      1926,
      1935,
      1944,
      1953,
      1962,
      1971,
      1980,
      1989,
      1998,
      2007,
      2016,
      2025
    ]
  },
  {
    name: "Sea",
    number: 1,
    duality: "Yang",
    complexity: "Simple",
    year: [
      1918,
      1927,
      1936,
      1945,
      1954,
      1963,
      1972,
      1981,
      1990,
      1999,
      2008,
      2017,
      2026
    ]
  }
];

const primaryNumberFemales = [
  {
    name: "Sky",
    number: 6,
    duality: "Yang",
    complexity: "Complex",
    year: [
      1910,
      1919,
      1928,
      1937,
      1946,
      1955,
      1964,
      1973,
      1982,
      1991,
      2000,
      2009,
      2018
    ]
  },
  {
    name: "Lake",
    number: 7,
    duality: "Yin",
    complexity: "Simple",
    year: [
      1911,
      1920,
      1929,
      1938,
      1947,
      1956,
      1965,
      1974,
      1983,
      1992,
      2001,
      2010,
      2019
    ]
  },
  {
    name: "Mountain",
    number: 8,
    duality: "Yang",
    complexity: "Complex",
    year: [
      1912,
      1921,
      1930,
      1939,
      1948,
      1957,
      1966,
      1975,
      1984,
      1993,
      2002,
      2011,
      2020
    ]
  },
  {
    name: "Fire",
    number: 9,
    duality: "Yin",
    complexity: "Simple",
    year: [
      1913,
      1922,
      1931,
      1940,
      1949,
      1958,
      1967,
      1976,
      1985,
      1994,
      2003,
      2012,
      2021
    ]
  },
  {
    name: "Sea",
    number: 1,
    duality: "Yang",
    complexity: "Complex",
    year: [
      1914,
      1923,
      1932,
      1941,
      1950,
      1959,
      1968,
      1977,
      1986,
      1995,
      2004,
      2013,
      2022
    ]
  },
  {
    name: "Earth",
    number: 2,
    duality: "Yin",
    complexity: "Simple",
    year: [
      1915,
      1924,
      1933,
      1942,
      1951,
      1960,
      1969,
      1978,
      1987,
      1996,
      2005,
      2014,
      2023
    ]
  },
  {
    name: "Thunder",
    number: 3,
    duality: "Yang",
    complexity: "Complex",
    year: [
      1916,
      1925,
      1934,
      1943,
      1952,
      1961,
      1970,
      1979,
      1988,
      1997,
      2006,
      2015,
      2024
    ]
  },
  {
    name: "Wind",
    number: 4,
    duality: "Yin",
    complexity: "Simple",
    year: [
      1917,
      1926,
      1935,
      1944,
      1953,
      1962,
      1971,
      1980,
      1989,
      1998,
      2007,
      2016,
      2025
    ]
  },
  {
    name: "Earth Core",
    number: 5,
    duality: "Yang",
    complexity: "Complex",
    year: [
      1918,
      1927,
      1936,
      1945,
      1954,
      1963,
      1972,
      1981,
      1990,
      1999,
      2008,
      2017,
      2026
    ]
  }
];

const secondNumberMales = [
  {
    primary: [1, 4, 7],
    secondary: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]
  },
  {
    primary: [3, 6, 9],
    secondary: [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3]
  },
  {
    primary: [2, 5, 8],
    secondary: [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9]
  }
];

const secondNumberFemales = [
  {
    primary: [1, 4, 7],
    secondary: [7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    primary: [3, 6, 9],
    secondary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
  },
  {
    primary: [2, 5, 8],
    secondary: [4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6]
  }
];

const thirdNumberArray = [
  [
    [
      1,
      1,
      5,
      "This is a triple Yang Natural Expression, which sits comfortably for a man but not so much for a woman. The 5 in your Expression means that you’re going to be found at the centre of things such as family, local community and at work. You’re going to have firm ideas about how things should be done and are likely to be very independent, detail-conscious, bright and adventurous with a deep philosophical nature. You can be quite secretive and often struggle to understand other people’s problems and can even be quite dismissive, but there is a large capacity for cool judgement, pragmatism and real warmth. You need to seek Yin Expressions for balance."
    ],
    [
      2,
      1,
      6,
      "You are bright, sincere, straightforward, organised and logical. You work in a careful, methodical way which can end up being inflexible and bordering on the finicky as you expect things to be perfect. Your focus and steady hard work will provide the recognition you aspire to but don’t be afraid to ask for help and support from a stronger Expression to help you get there. For men, you are a lot more serious and sensitive than you let on whilst women like to control and can be obstinate and haughty. You like to help people and to serve but under pressure you can show a tactful and diplomatic side to your character although your decision making might be slow, cautious and over-complicated."
    ],
    [
      3,
      1,
      7,
      "You are likely to be determined, energetic, industrious and happy to take on lots of commitments but your approach to life is laid-back and easy-going, which ultimately might prevent you fulfilling your ambitions. You come across as straightforward, charming, outgoing and sociable but underneath you are sensitive and somewhat insecure and will only share your true thoughts and emotions with people who’ve earned your trust. That being said, you are very insightful and can really see and hear people, putting them at ease and making them feel valued. You tend to believe in the ‘perfect relationship’ and ‘true love’ and find it hard to compromise which might make it difficult to sustain long-term relationships."
    ],
    [
      4,
      1,
      8,
      "Strong and silent; sincere and serious; stubborn and self-motivated: that’s how the outside world is likely to see you. They’ll also see an easy-going, sociable and independent person who generally has a fairly philosophical approach to life. You have the ability to influence others in a quiet, calm sort of way but that can turn to controlling if you feel your opinions are not being accepted. You’re an intelligent and pragmatic person but not particularly practical and you tend to learn best by trial and error. You’re actually quite emotional with almost fairy tale dreams about love and romance but you tend to be shy and keep your cards close to your chest and are reticent about being the first to expose your true feelings."
    ],
    [
      5,
      1,
      9,
      "There is a kind of flamboyant, impulsive air about you and you don’t mind showing off how clever and creative you are or making a statement by the way you dress. You’re better at leading than following and you have high principles but you can struggle to get across what you actually stand for and expect from your followers. There are times when you can be cautious and withdrawn but mostly you’re at the centre of things where your energy, focus and ambition are put to best use. You’re not great at showing your emotions and can be pretty defensive on matters of the heart. You’re also pretty hopeless at reading signals, especially from your partner or colleagues if the issue is personal rather than work related."
    ],
    [
      6,
      1,
      1,
      "There are two very definite sides to this Expression: on the one hand you will blow people away with your extrovert, fun, passionate and witty way of being; and on the other there is the withdrawn, insecure, indecisive and cautious person. Both are real but the former you like to show; the latter you only reveal to those close to you, and as a triple Yang Expression, you are probably going to be more comfortable confiding with Yin Expressions. You are strong-willed, tenacious, magnanimous and assertive and you can be really inspiring and influential with a warrior type leadership potential. You are also a bit of a diplomat, particularly effective at tactful negotiations within your family and close circle of friends."
    ],
    [
      7,
      1,
      2,
      "You tend to be very comfortable in social situations and have the makings of the perfect host. That’s because you have an easy-going, extrovert, witty and charming personality with that knack of making people feel at ease and important. But unless they are close to you, it’s unlikely they will see your sensitive side which can sometimes make you seem cautious, withdrawn and uncommunicative. They might also miss your philosophical and reflective insights and observations, but all are likely to feel the benefits of your helpful and supportive attitude. You tend to live your life and base a lot of your decisions on intuition and a gut instinct but you are actually quite conservative and at times obstinate."
    ],
    [
      8,
      1,
      3,
      "This is a powerful, single-minded triple Yang Expression that suits males well but is more ‘complex’ for females. Self-motivation, ambition, hard work and independence are going to be high on your agenda as is honesty, a strong sense of fair play and ‘doing the right thing’. You hate to be held back and are very forward looking but tend to be narrow-minded and your impatience and sometimes quick temper can cause difficulties and be inconsiderate for others. Perhaps oddly given all that, you can come across as quite shy but that really is the face of your cautious and contemplative nature. You are pretty good at reading people and have a creative side that fuels original thought and ideas."
    ],
    [
      9,
      1,
      4,
      "You are probably going to come across as confident, bright, charismatic and intuitive. But equally you may seem to be rather vain, superior and impulsive. You have the potential to become an intelligent and inspiring leader but you can be obstinate, only hearing one side of the argument and dismissing the feelings and views of others. This can lead you to being isolated when times get difficult, but even though you’re likely to retain your tenacious and assertive qualities, you’ll probably become more cautious and wary. There is a strong independent streak about you and you can sometimes allow your pride and assertiveness to get the better of you. You are a bright and foresighted individual, who can be both brilliant and beguiling at the same time."
    ]
  ],
  [
    [
      1,
      2,
      4,
      "The two Yin Expressions (2 and 4) will temper the 1 Yang; so whilst there is still that independent, serious and stubborn streak, there is also a warm and easy-going side that enjoys social occasions and mixing with people you know and are comfortable with. There is definitely a strong, steady driving force in this Expression especially if it is directed towards human rights, justice and fairness. You can appear to be quite conservative and quiet but this is just as likely to be hiding a thirst for adventure and trying new things. There are balances to be found in this Expression and generally it sits well for both males and females."
    ],
    [
      2,
      2,
      5,
      "You like to be involved and in the middle of things and be appreciated for your efforts. You are steady, supportive, diplomatic and rather conventional. You have a perceptive nature but can be hyper-critical with yourself and those around you and your focus on details can border on fastidious. Your actions tend be deliberate and sometimes over cautious but clear and precise and underlined with a great deal of persistence. You have a strong sense of self-protection and prefer to stay in your social circle but both men and women need to have a lot of outside support, love and attention. Not great at making big decisions, you tend to be better in advisory roles."
    ],
    [
      3,
      2,
      6,
      "One way of looking at you is someone who is well-organised, detail minded, honest and direct. The other way is someone who can be overbearing, inflexible, stubborn and self-important. Responsible and hard-working with lots of energy, you are great for coming up with new ideas and novel ways to tackle an issue but you can spend a lot of time faffing around and not getting very far even though you know exactly what needs to be done. You are supportive and helpful in relationships but can get hurt easily if you do not feel loved and appreciated. You like being in the spot-light and will smoothly take on the peace-making role in family disputes."
    ],
    [
      4,
      2,
      7,
      "This is a triple Yin Expression, which is a natural fit for females who are comfortable with their independence and clarity of thought; but harder for men who tend to display a feminine and soft behaviour, living on emotion rather than rationality. Both genders are emotional, very sensitive and need lots of attention especially on matters of love where you often take more than you give causing potential difficulties in relationships. You’re easy-going, tender and charming but underneath fairly self-centred and sometimes even calculating and you can be quite fussy when it comes to details. You’re supportive and helpful and have a natural affinity towards beauty and there is also a reflective and philosophical side to you."
    ],
    [
      5,
      2,
      8,
      "You are the sort of person who is really good at helping and supporting others, especially if they are vulnerable or close to you in the family or at work. But you do really want to control them and be at the centre of their lives until the issue is resolved as you see it. Yes, you’re pretty inflexible and stubborn, but you’re determined and ambitious, idealistic too. How you look and come across is important to you but that can become a bit flashy and fussy. Trying to control you is really hard, so it’s surprising perhaps that you are actually pretty dependent on others both for emotional support and confirmation that you’re doing the right thing. Recognition is usually more important than financial reward."
    ],
    [
      6,
      2,
      9,
      "There’s an impulsive and flamboyant side to your character and when that is coupled with your strong sense of pride and firm work ethic, you often find yourself gravitating towards leadership roles. You’re not a great follower and are often very direct, but you can get overconfident and sometimes seem rather conceited and unapproachable. That is a shame, because your natural urge is to help and support people and you are really good at smoothing troubled waters with an easy but commanding sense of tact and diplomacy. Well organised, good at planning and detail conscious (perhaps too detail conscious), you are usually a pretty calm person and actually quite cautious in your dealings with people and situations."
    ],
    [
      7,
      2,
      1,
      "You are likely to come across as a person who is rather quiet and quite shy. It may seem at odds then that actually you are often craving attention but if your sensitivity gets the better of you, it can make you needy and insecure. What’s hiding underneath is a thoughtful and reflective individual who can make sound judgements with a steady, resourceful and pragmatic approach. Some might see that as being indecisive but actually you are just being cautious and coolly calculating. You are good in social situations and can make people feel at ease using your charm, sense of humour and natural enthusiasm for life. You like to get to know how people are really feeling and thinking deep down and you would like that to be reciprocated."
    ],
    [
      8,
      2,
      2,
      "You are a person who works hard and is always on the go. You have a lot of determination and self-motivation and an ambitious and adventurous spirit which is not always obvious as you can come across as rather reserved and conservative. You are engaging and charming and like to play a full part in social and family affairs as well as the wider community, where you are helpful, well organised and detail conscious. But you’re really not that empathetic to other people’s feelings, views or how they may want to do things and so at times you can be seen as being rather inconsiderate. You can be proud and obstinate but there is a lot of tender sensitivity under the surface too."
    ],
    [
      9,
      2,
      3,
      "This is an Expression about energy, enthusiasm, spontaneity and brilliance. You have great potential to set the world on fire with your creativity, clarity and capacity for hard work. You are very passionate and love to express yourself but the price can be costly on your highly sensitive and emotional state. For the truth is, you are very dependent, desperate almost, for the attention, praise and acknowledgment of others and if you feel it is not there, your confidence and well-being will be severely hit. You can make a good leader, albeit quite a conservative one, but you can be impatient, opinionated, temperamental and at times manipulative. You tend to devote a lot of time and energy to your social life and can be quite sentimental at times."
    ]
  ],
  [
    [
      1,
      3,
      3,
      "A triple Yang Expression, you have an underlying nature to control and impose yourself on others. You can be very self-assertive, direct and to the point. For men, this might be seen as typical ‘alpha male’ behaviour; for women it is a complex Expression and you may feel the need to ‘tone down’ your assertiveness although to do that for any length of time would be wrong and will cause you suffering and illness. In any case, just under the surface there is a very sensitive side which gets easily hurt if those around you can’t see that. You are hardworking (which can lead to obsessiveness), impatient but caring and tend to have a strong sex drive. You need to listen and be in influenced by Yin Expressions to provide balance and calming."
    ],
    [
      2,
      3,
      4,
      "From the outside you come across as pretty quiet and gentle, as well as being helpful, reliable and diplomatic. Underneath though, there is a sensitive, intense and insightful person with a really expressive and sometimes explosive side which can take others (and you!) by surprise. You really know what you like and don’t like, which can make you blind to other factors. Whilst generally conservative in nature, there is a strong impulsiveness about you but you are an insightful observer of people and situations. You can be pretty emotional and will lean on others for strength and support and are likely to develop a pretty thick self-protective wall around you."
    ],
    [
      3,
      3,
      5,
      "This is a powerful triple Yang Expression, amongst the most powerful of them all.  This is not such an issue for men but can be for women only because this Expression is naturally commanding and controlling and Learned Convention tells us that these are not feminine characteristics. You have to be involved and at the centre of things but you need the support of others, you can’t do it all. You are intelligent, shrewd and very hard working with huge amounts of energy, love and passion. You are stubborn, with your likes and dislikes clearly defined and your warrior-like approach means people will want you on their side. You are deeply sensitive and emotional with an explosive and quick temper. Connecting with Yin Expressions will help as long as you listen to them!"
    ],
    [
      4,
      3,
      6,
      "This is a dignified, direct and detail-focussed Expression. You are straight- forward, steady and sometimes stubborn. When stressed, there is a quick and explosive temper lurking but if revealed it will tend to be short-lived and then you will show great determination, hard work and a ‘tell-it-how-you-see-it’ approach to overcome difficulties and challenges. Emotionally, you are a sensitive person with a definite jealous side to your character and because you tend to have such clear likes and dislikes, others can struggle to get through to you for other alternatives to be considered. You can be pretty intense at times and you crave affection but your pride can sometimes stop you from revealing your true hopes and thoughts."
    ],
    [
      5,
      3,
      7,
      "Socially, you’re going to come across as easy-going, fun, straightforward and engaging. You like and need to be at the centre of things wherever that may take you. You are strong willed, assertive, hardworking and controlling. At times, you can be quite explosive especially under intense pressure but you have a lot of energy and ambition to get the things you want, although some may take that as you being greedy and materialistic. You’re actually more interested in the achievement than the spoils but if things are not going your way in love or in work, you will look to move quickly on. You like to keep your personal and public lives separate and are pretty black & white about your likes and dislikes."
    ],
    [
      6,
      3,
      8,
      "If you are a man, this triple Yang Expression sits pretty comfortably with you and your sensitivity is often expressed by caring about others. For women though, this air of independence, ambition, drive and using other people to get what you want is, by the Learned Convention of today, seen as rather unfeminine but as we know Learned Convention is tosh! Either way, both males and females are hard-working, direct, self-motivated and opinionated. You are also usually very expressive and potentially explosive, although the storm tends to clear pretty quickly. You have high moral principles which you are reluctant to compromise on and whilst you are by nature forward looking and insightful, you can sometimes be surprisingly cautious missing opportunities as a result."
    ],
    [
      7,
      3,
      9,
      "You are hardworking, determined and resourceful but you can also add flashes of brilliance, not only for new ideas and ways of doing things, but also by shedding light on existing issues and situations. You can be quite inspirational and because you are also bright and articulate, you make a persuasive communicator and are likely to attract people keen to be a part of whatever project you happen to be involved in. You don’t like to hide your feelings and despite having an open and flexible attitude, you have a strong sense of right and wrong and likes and dislikes. You are good at reading people because you are very sensitive but can get frustrated because you long for affection and attention from those close to you."
    ],
    [
      8,
      3,
      1,
      "Ambitious, assertive and adventurous, you’re a confident, competitive and courageous individual who is strong-willed, single minded and with the energy and patience to overcome hard times and most difficulties. From the outside, you are likely to come across as cautious, shy and indecisive because underneath you’re actually a sensitive and rather insecure person. You like to keep moving and hate to get stuck in one place for too long and have a powerful need for attention and recognition and even fame. Under pressure or if you feel threatened, you have the potential to be explosive and will defend yourself forcefully. As with all powerful Yang Expressions, connecting with stable Yin Expressions should help settle and ground you."
    ],
    [
      9,
      3,
      2,
      "From the outside, people are likely to see a conservative, reserved and somewhat proud person, but inside there is a lot of fire and passion which gives you great strength, intensity and a brilliant clarity of mind and purpose. You are also rather vain and pretty sensitive which can make you cautious and sometimes indecisive when taking decisions. When stressed, you can be explosive and express your opinions with a directness and force that may well be inappropriate. With a bright and flexible attitude, you are happy to work hard especially if it leads to a respected position or recognition. You can be tactful and diplomatic and be very detail conscious which can border on finicky as you are often seeking perfection."
    ]
  ],
  [
    [
      1,
      4,
      2,
      "From the outside, this Expression may appear quiet, reliable, tender and sometimes moody. But this hides a strong, self-assertive and independent individual with a strong sense of adventure. However, there is a rather emotional side to you coupled with a conservative and stubborn streak. Intelligent and helpful, you can be self-centred, somewhat opinionated and difficult for others to read. The maternal instinct is strong for the females but you will want to do more than simply staying at home. In the work environment, this Expression is characterised by being steady, dependable and loyal. Given the choice, you are likely to want to remain in one place for a good length of time."
    ],
    [
      2,
      4,
      3,
      "People are likely to describe you as having lots of energy and enthusiasm. Some will say that you are very expressive and spontaneous, sensitive and supportive. Some though might see you as being emotional and at times even aggressive. These two opposites are hard even for you to handle, although you usually get back on an even keel pretty quickly. You are resourceful, self-motivated and assertive but at the same time can be very defensive if asked to take major responsibility for something. There is a very dependent side to your nature, which is particularly evident when an idea or initiative runs out of steam as you tend to be short on stamina and can lose focus."
    ],
    [
      3,
      4,
      4,
      "You are confident, helpful and trusting with a quiet and gentle demeanour. Your natural charm goes a long way in social and work circles. You are hard-working, optimistic and energetic. Underneath though there is a lot of emotion and sensitivity and sometimes you can be a bit over the top and rash in what you say and do. You are likely to be an ideas’ person but may struggle to make decisions and then stick with them, although once you do, it’s likely to be a good one. In relationships, men can be hard to read and will hide a serious and defensive nature with a breezy manner, whilst women are more outspoken and direct and don’t like to be controlled."
    ],
    [
      4,
      4,
      5,
      "To others you’re going to appear easy-going, pretty soft and affable. But that hides a stubborn and opinionated side to your character and whilst you have loads of ‘get-up-and-go’ you need lots of attention and admiration to fuel your motivation and creative ambitions. If you don’t get this, you’re going to feel hurt and anxious and likely to become erratic and change tact which will confuse you and those around you. You do need to seek the patient advice of your supporters to help you with your decision-making but because you can be pretty self-centred and evasive, you can sometimes be insensitive and ride rough-shod over their feelings and views. There is an obsessive potential to your character which comes to the fore when your self-confidence is dented."
    ],
    [
      5,
      4,
      6,
      "Dignified, magnanimous, strong-willed and well-organised, you are really good at controlling things and managing people and will use your logical and straightforward approach to good effect. Others will see you as stubborn and inflexible but always honest and sincere. Underneath your front though there is an impulsive and emotional side that can see you being indecisive and seeking the support and love of those close to you. This will often bewilder them as you like to appear so strong and in control from the outside. In times of trouble, you really come to the fore and your energy and resolute personality will see you overcome most of the obstacles put in your path."
    ],
    [
      6,
      4,
      7,
      "You are a personality that changes easily (perhaps too easily) from being affable, charming, easy-going and confident to one that is impulsive, strong, stubborn and emotional. This is hard enough for you to get your head around let alone trying to explain your thoughts to others and this often makes it hard for you to plan and take important decisions. You have high ideals, take pride in what you do and how you come across and like to have that recognised by those around you. You have a tender heart and a trusting nature, which is typically reciprocated, but you are forthright in your dealings with people and like all the 6s have a strong capacity for leadership and inspiring those around you."
    ],
    [
      7,
      4,
      8,
      "You combine the qualities of charm, resourcefulness and self-confidence with tenacity, prudence and a steady caution. You tend to be popular in your social circle but your public affability can mask a stubborn and inflexible side unwilling to play along to someone else’s tune. You usually take your time to settle on a final course of action, often changing your mind frequently before you get there, but once done, it’s done and you don’t give up easily. You can be pretty emotional and sensitive and that can play a large part in your life and the decisions you make. Your default is to trust people and you expect them to trust you in return, and to those close to you, you are caring and considerate."
    ],
    [
      8,
      4,
      9,
      "From the outside, people may see rather a flamboyant and impulsive person and when they get to know you someone who appears calm, steady and straightforward; but actually underneath there are a lot of emotions swirling around which means decisions can be made rashly and just as rashly quickly changed again. You have strong determination and a single-mindedness for fair play coupled with a bright and insightful mind. You are your own greatest fan and can come across as quite arrogant at times, but you are kind and supportive within your social circle as long as things don’t get too complicated or involved. You have natural leadership skills but your followers may have difficulty keeping up with your changed priorities."
    ],
    [
      9,
      4,
      1,
      "On the surface, you will probably appear as shy, reserved, cautious and actually quite vulnerable. You are likely to find it hard to express how you really feel, bottling up your sensitive emotions and feeding a real sense of insecurity. You’re quite a perfectionist, so you like to take your time to make decisions, patiently applying logic and reason and a great deal of analysis in the process. You are open to being influenced but you are an influencer yourself and can show inspiring leadership qualities and commit to a great deal of hard work. You can be quite evasive at times, stubborn and impulsive too: and you do need continual praise and acknowledgment to assuage your sense of self-doubt."
    ]
  ],
  [
    [
      1,
      5,
      1,
      "You are likely to come across as quite shy and serious. You are independent, ambitious, flexible and creative, but underneath there is a strong sense of worry and insecurity. To counter this, you will frequently seek the attention and approval of others and meticulously and patiently make plans for the future. There is a lot of strength to see things through but it’s just that you struggle to do it totally independently. You can be bold and quite demanding in your relationships and have a strong sexual desire. This undercurrent of insecurity and dependency means that you are uncomfortable cutting off all relations with ex-partners and you will find your best fit with secure and undemanding Yin Expressions."
    ],
    [
      2,
      5,
      2,
      "Steady, stubborn and serious: you are the type of person who pursues your goals with diligence, persistence, hard work and a good deal of assertiveness. As a result, you will overcome most of the obstacles put in your path. There is real tenderness and a desire to help others but perhaps you can give too much, leaving you unable to focus on your own needs. You don’t like to take short cuts but sometimes your meticulous approach means it can take for ever to deal with things. Women will take their role as a mother and a wife very seriously and will want to be in control whilst men need to put aside their pride and be comfortable seeking help and depending on others."
    ],
    [
      3,
      5,
      3,
      "One of the strongest Natural Expressions; this is triple Yang and suits the male body well but not so the female. This is an assertive, stubborn, strong- minded Expression, sometimes aggressive, but always bold, determined and demanding. You have lots of ideas and loads of energy and enthusiasm which may well have given you success at an early age. You are impatient and can ‘shoot from the lip’ not really thinking through the impact of your words and the hurt you can sometimes cause. You have a bright, keen, insightful mind but can find it difficult to find common ground with others because of your controlling nature. Just below the surface, there really is a very sensitive person."
    ],
    [
      4,
      5,
      4,
      "From the outside, you are self-confident, gentle, trusting and supportive. Inside, there is a powerful core of assertiveness, determination and boldness which only really becomes apparent to friends, family and close work colleagues when the pressure is on. You do have a changeable and sometimes even evasive nature but at heart you are someone with a deep sense of justice and compassion for those less fortunate than yourself. You want to do the right thing and help others and that leads you to the social and caring professions. Your natural empathy and insight coupled with your ability to beat the odds can lead you to a leadership or spokesman type role either formally in a work situation or informally in your local community."
    ],
    [
      5,
      5,
      5,
      "Not a lot of grey in this powerful triple Yang Expression. All 5 Expressions need to control but this one does it in spades! You are going to have huge amounts of drive, energy, self-motivation and resolve. You don’t spend too much time considering those you seek to control and are likely to be demanding and assertive towards them. However, people will tend to gravitate towards you for both support and inspiration and you can be generous, magnanimous and caring as long as they don’t cross you! You are direct, bold and intense and you’re probably going to be involved and at the centre of everything! But it can be draining to be so strong and very deep inside there is actually nervousness and insecurity that can cause emotional upheaval."
    ],
    [
      6,
      5,
      6,
      "This is a strong and independent triple Yang Expression and so you are likely to be self-assured, strong-willed and ambitious with an easy confidence to comfortably take on leadership roles. You are going to be reliable, direct, well-organised and rational with high moral principles. The flip side to that is being stubborn, pig-headed, overbearing and egotistical. You like positions of high responsibility and need to be in control and if you’re not your sense of pride and importance can really take a hit. You can easily become over-confident (but not be aware of it) and simply dismiss the views and opinions of those around you to your own detriment. There is however, a sort of stylish elegance about you, understated but powerful."
    ],
    [
      7,
      5,
      7,
      "It can look like there are three sides to this Expression: on one there is a demanding, assertive and strong willed individual; on another there is a fun-loving, charming and sociable person; and on the third someone who can be hypersensitive, defensive and easily influenced. Whatever is on show at the time, you are someone who doesn’t like to fit in with convention, can keep a cool head when the pressure is on and who usually achieves more doing your own thing rather than being part of a team. There is an air of idealistic innocence about you, which can leave you exposed to being taken for a ride but you have great foresight and the easy ability to put people at ease and be considerate to their views."
    ],
    [
      8,
      5,
      8,
      "This is a very strong triple Yang Expression that wants to control and doesn’t want to follow. You are driven, self-motivated and ambitious and have great strength and determination to overcome difficulties and challenges. You have lots of natural, grounded charm and can be a very likeable and attractive. But you can be stubborn, assertive and demanding and at times come across as quite hard and uncommunicative and will hold back your true feelings, although deep inside there is real warmth, passion and kindness. Your enthusiasm and ideas can be very inspiring but as a rule you prefer to be your own person free to move wherever you want to go. You need to be listened to, but you need to listen too, connecting naturally to stable Yin Expressions."
    ],
    [
      9,
      5,
      9,
      "This is a bright and brilliant Expression and you are likely to be a person of intuition, vision and ideas. You can show real clarity when taking decisions or giving your opinion and will make them quickly and assertively but sometimes impatiently and impulsively. You can be very strong-willed, bold and demanding and always wanting to be in control. You can make an effective and confident, sometimes overconfident, leader because there is a lot of pride and ego in the mix too. You can be quick to anger which can cause anxiety and resentment and demoralise your followers. You can be a bit flash and showy and over concerned by your appearance which borders on vanity. But you are really pretty sensitive and your confidence depends greatly on recognition and acknowledgement from others."
    ]
  ],
  [
    [
      1,
      6,
      9,
      "The 9 Fire in this Expression gives these people a charismatic and flamboyant exterior and you like being at the centre of things. Your social circle tends to be small however, as you have trouble compromising and have clear demarcation lines between those who are ‘with you’ and those ‘against you’. There is a strong sense of pride with this Expression and you take badly to being criticised. You tend to live your life through intuition and instincts and can struggle to communicate and explain your thoughts and motives. Independent and impatient, both men and women can sometimes find settling into relationships and family life difficult."
    ],
    [
      2,
      6,
      1,
      "You are the type of person who has a steady, logical and uncomplicated way of living your life. So much so that for many of you it’s a case of “if you can’t do it well, there’s no point doing it at all”. Even though there is great determination in your Natural Expression, there is also a lot of shyness, caution, dependency and insecurity. It may seem paradoxical then that there is great leadership potential where your qualities of thoroughness, prudence, diplomacy and reliability come to the fore. This tends to be a stylish Expression; you may even be a bit of a show-off and there is a strong side of you that is outgoing, excitable and bubbly."
    ],
    [
      3,
      6,
      2,
      "From the outside you come across as hardworking, reserved and conservative. On the inside, there is a lot of sensitivity, pride and stubbornness. You’re naturally intuitive and insightful and whilst you can focus your high energy levels on getting the job done, you do find it hard to adapt to different situations or engage with people who aren’t ‘on side’. For men that will manifest as being shy and unapproachable; but women on the other hand are more expressive and can demonstrate leadership potential. You like to help people and are happy to get your hands dirty doing so but you can be a bit of a perfectionist and your directness can be unsettling."
    ],
    [
      4,
      6,
      3,
      "Enthusiastic, energetic and expressive, you are outgoing and spontaneous and appear pretty easy going. But inside, there are the stirrings of an emotional storm making you at times impatient and self-indulgent. This can make it hard for you to consider others and because you are so straight-forward, trusting and proud, you can be taken advantage of. When motivated and interested in something, you have high levels of concentration and become very single-minded and enthusiastic. You are probably too self-critical but conversely hate being criticised by others. You have sound judgement but can be inflexible when circumstances change and you are the person for the big project or deal, not so much in the details."
    ],
    [
      5,
      6,
      4,
      "Your public persona is usually gentle, unassuming, easy-going and smooth talking. But underneath there is a strong will to plough your own furrow and once hooked on something or someone your focus, strong will and high energy is likely to see your ambition come to a successful conclusion especially if there is a materialistic benefit. Generally, you are helpful and dependable with a wide circle of friends and associates but you expect there to be mutual benefits. Controlling by nature, stubborn and rather inflexible, you can be very self-critical needing everything to be just so. There is a significant emotional side to you but you’re a survivor and if things are not going your way or you lose interest, you will pragmatically move on."
    ],
    [
      6,
      6,
      5,
      "A powerful triple Yang Expression and one that would be termed ‘simple’ for a man and ‘complex’ for a woman and that’s because this Expression is about leading rather than following, as your pride and natural assertiveness prevents you comfortably taking orders or accepting alternative ideas. On the outside, you are bold and determined, single-minded and inflexible, but internally a lot more sensitive and cautious than you want to let on. You are self-critical, highly focused, logical, prudent and well-organised and take the view that if the job’s not worth doing well, it’s not worth doing at all. You want to be at the centre of things and in control of it all and that can make you appear domineering and obsessive."
    ],
    [
      7,
      6,
      6,
      "There is a dignified style and easy charm about you. You take pride in how you carry yourself and back your own intuition and instincts. You have a confident, logical and straightforward approach to life but your sensitivity and emotions play a large part too. That can affect your leadership potential but your energy, focus and enthusiasm usually sees you achieving your goals and persuading others to follow you. You’re not very flexible though – actually you are pretty stubborn – and can struggle to adapt to changing circumstances. On the surface, you usually come across as sincere, serious and direct but you have real passion and ambition to achieve and realise your high ideals."
    ],
    [
      8,
      6,
      7,
      "Hard work is second nature to you and you use your strong will, single-mindedness and energetic enthusiasm to achieve your goals. You come across as easy-going, fun and charming but you are also bold, ambitious, opinionated and very clear and precise (inflexible even) in what you want. The flip-side to your natural intuition is huge sensitivity, especially if you feel you are being criticised, although no one can criticise you better than yourself. You like new adventures and playing hard and you can be rather proud and difficult to get close to, but when you feel comfortable with someone you will show much tenderness and passion. You have an understated but classic style and like to achieve a certain degree of status within your work and social circles."
    ],
    [
      9,
      6,
      8,
      "There is a bright but reserved charisma about you; an intuitive and determined person who learns about life by actually living it, rather than by books or through other people. You want to be in control and have leadership responsibilities but your pride and ambition can sometimes border on pomposity. You are naturally intuitive with a very clear thought process and high levels of concentration. You can be inflexible and argumentative and will stubbornly fight your corner, although if things get too messy and difficult, you may well bale out. You are generally pretty easy going but you’re actually quite a perfectionist, who is both cautious and detail-minded. You can be very self-critical and defensive, and take it badly if you feel you are being criticised."
    ]
  ],
  [
    [
      1,
      7,
      8,
      "You are hardworking, self-assertive and independent. You are also self-conscious and very sensitive. This can make you appear quiet and rather negative but in actual fact there is much strength and energy at the core of this Expression. At work and in your life generally, you are methodical, direct and detail conscious with a great ability to focus on the matter at hand. You are apt to make definitive decisions which can give you great angst if you spend time reflecting on it. Naturally family orientated, you have a fun and playful side which those close to you will see and love and you have the knack of making people feel welcome and at ease."
    ],
    [
      2,
      7,
      9,
      "This is a triple Yin Expression, which sits easily with women, but is more ‘complex’ for men. For both though, you are going to come across as amusing, entertaining, bubbly, open and easy-going, which will make you popular and fun to be around. At work you are likely to be ‘the in influencer’ rather than ‘the leader’ and by nature you are intuitive with a real ability to clarify and simplify the issues. You are also good on the detail and have great organisational ability but you can be impulsive and are definitely impressionable. Both men and women will be drawn to Yang Expressions although you might find their ‘hardness’ difficult to handle in the long term."
    ],
    [
      3,
      7,
      1,
      "Internally, there is a lot of strength, energy and a hard-working ethic but externally you can appear shy, quiet, indecisive and cautious. Close friends and family will see another side of you which is funny, engaging, entertaining and playful. You’re going to be good fun to be with although that might spill over into being rather overbearing, but your insecurity and vulnerability is never far from the surface making you very sensitive to criticism, which will easily hurt and upset you. Patient and well-organised, you’re good at coming up with original ideas and concepts and there is a deeply reflective side to you which typically expresses itself in poetry or other types of creative outlets."
    ],
    [
      4,
      7,
      2,
      "For men, this triple Yin Expression can be difficult and you are likely to come across as a bit of worrier and preoccupied with the smallest of details. For women, you are very self-assertive and have a very clear and defined view on where you are going in life, especially if it’s family related. For both sexes, you have a tender and gentle nature but you are also self-conscious, emotional and sensitive. This can make you care too much about other peoples’ opinions and react badly if you feel you have been misjudged. Being so powerfully Yin, you need the help and direction of Yang Expressions to help you get started on projects but then your steady and natural organisational ability will see you through."
    ],
    [
      5,
      7,
      3,
      "Even though the 5 controlling element is never that far away, you are really quite a sensitive person blessed with a reflective perception about what’s going on with people and how events might affect their life. You can be hasty, impatient and stubborn and if things are not going your way, you are likely to be inappropriately forceful in trying to assert your will and opinions, which will likely cause difficulties in personal and work relationships. But if you do feel in control, you have an inner security that allows you to be great company: witty, expressive, spontaneous and charming. You are usually very energetic and a really good organiser with a good eye for detail but you can be quite materialistic too."
    ],
    [
      6,
      7,
      4,
      "As with all 6’s, you have the potential to lead but your Yin numbers (7,4) tempers the controlling and domineering aspects, so you’re likely to come across as gentle, easy-going, magnanimous and considerate. Your close friends and associates will find a witty and fun person to be with but outsiders may see a different side which can be forceful, brash and thoughtless. This is because whilst you can be reflective, you are typically very sensitive and can overreact inappropriately if you feel slighted. You tend to expend a lot of energy and focus when you have settled on a particular plan of action and you can be very effective at politics. There is an easy and comfortable style about you, although at times you can be very self-conscious."
    ],
    [
      7,
      7,
      5,
      "You are likely to be the kind of person that has loads of energy, displays enormous self-confidence and works incredibly hard. You are entertaining, funny and sharp, with a lot of natural charm. You can sometimes be a little too detail-conscious for your own good and agonise that you’ve made the right decisions but you’re a great organiser and finisher. You may come across as easy-going and flexible but you need to be in control and to receive lots of praise and attention for your achievements. You have a lot of ‘front’, but behind it lies much sensitivity, nervousness, self-doubt and insecurity; and criticism of any kind can really dent your confidence. You can both talk and listen well and are perceptive and spiritually inclined."
    ],
    [
      8,
      7,
      6,
      "Whilst there is a side to you that is most definitely charming, flexible and easy-going, you can also be direct, opinionated and dogmatic. Your admirable honesty can sometimes be too much and appear insensitive, which is ironic as your own high levels of sensitivity play a big part in your own life. You are very self-motivated, logical and have great organisational ability with a fine attention to detail. Couple this with your capacity for hard work and you have the ingredients for real leadership potential but as you hate displaying weakness, your natural assertiveness can easily turn to stubbornness and a reluctance to consider different approaches. You usually like to play a leading role in social and community life."
    ],
    [
      9,
      7,
      7,
      "This is a triple Yin Expression, which sits comfortably with women, but is deemed more ‘complex’ for a man. Either way, you’re very likely to be a charismatic person (which can teeter into vanity), who’s easy-going, entertaining, funny and passionate. You’re also pretty sensitive, touchy even, easily affected by what’s going on around you and very defensive if you feel you’re being criticised or mocked. Your excellent organising ability is strategic and shrewd and you have good attention to detail. If matters get difficult or unpleasant, you’re unlikely to stick it for long and will seek an easier and more comfortable route. You take pride in how you look, you’re generous to the people you like and can express yourself clearly and inspire those around you."
    ]
  ],
  [
    [
      1,
      8,
      7,
      "Ambitious and hardworking, this Expression comes across as sociable, fun and easy-going but with a strong sense of independence. You do need to have time by yourself and will retreat into your ‘cave’ and whilst there you are likely to be uncommunicative and withdrawn but it is just your way of dealing with life and controlling your sensitive nature. You are easily upset and hate to lose face and so can struggle making decisions. You will look to your partner to help you in this regard as well as them organising your life, just as long as it’s exactly how you want it to be! It’s a sort of independent dependency!"
    ],
    [
      2,
      8,
      8,
      "You could describe this Natural Expression as wilful and even though that is too simplistic, it’s not that far off . You are serious, bright, ambitious and self-motivated. But at times you are also impulsive and stubborn as well as being dependent and easily in influenced. You sometimes can’t finish what you started or continue to drive forward when you should really change course. You can get really finicky about details, have a rather short temper and can be very direct with your arguments. Generally though you are a supportive, reliable and kind person but a lot more sensitive and shy than you let on and you can let pride and suspicion get in the way of successful relationships."
    ],
    [
      3,
      8,
      9,
      "You are a bright, impulsive person and a bit of a show off at times, both in the way you can behave and the clothes you wear: you enjoy the attention and hate not being noticed. You’re an optimistic and spontaneous individual, inspirational at times and with lots of underlying energy and ambition to tackle new projects and get things done. Fundamentally, you’re gentle, responsible and secure in your own skin but you can come across as immature and almost childish at times. is is because you tend to have a young outlook on life but if things are not going your way, you’re likely to retreat into your cave, roll a rock over the entrance and think about what’s happened in silent contemplation."
    ],
    [
      4,
      8,
      1,
      "You are ambitious and hard working with a keen and active mind but you can come across as cautious and reserved, rather insecure and indecisive. However, when you are feeling more secure and comfortable, there is a very sociable and outgoing side to you, although sometimes you will resort to low-level manipulation to get what you want. When feeling insecure, you will worry and often try to assuage your anxiety through self-indulgence such as food, shopping or sex. Your single-mindedness can become obsessive and you have difficulty compromising but you are good with money and have a tender and caring heart when you are feeling confident in a loving relationship."
    ],
    [
      5,
      8,
      2,
      "You’re going to come across as steady, reliable, serious and fairly reserved. Yes, the 5 controlling, ambitious, materialistic and demanding aspects are there too but there is quite a lot of front here because you are a lot more dependent on others than you care to let on. You’re likely to play a central part in family and community life where they will find you energetic, friendly and helpful. You have a very tenacious and persistent nature (some will say stubborn), which can really help when getting to the heart of matters but can also make you uncommunicative and close-minded if having to consult with others. When you’re feeling secure though, there is a real, almost naïve, charm about you."
    ],
    [
      6,
      8,
      3,
      "There is a sort of stylish dignity about this triple Yang Expression and couple that with an outward show of enthusiastic energy and expressive emotions means you are likely to be very popular and socially in demand. You tend to be either ‘on’ or ‘off ’ with not a lot in between; and when you’re ‘off’ you will prefer to hide away and be very private, rather shy and uncommunicative. You believe in high morals and standards and are very considerate and generous to those close to you but likely to ignore those who aren’t. You are direct, have a lot of pride and ambition, and have the ingredients to make an inspiring leader. You can be rash and impatient though and that can have a detrimental effect on achieving your goals."
    ],
    [
      7,
      8,
      4,
      "On the face of it, you are sociable, charming and good fun to be with. You have a strong independent streak but can be rather ego-centric and defensive. You have a sharp mind - and sometimes a sharp tongue - but you are a good communicator, listen well and can be pretty perceptive. Your flexibility and strong self-motivation allows you to handle most of what life throws up but you can be quite calculating, weighing up the options for your best advantage. There is a deep pool of sensitivity about you and you can be shy and nervous in situations where you feel uncomfortable preferring to retreat to your cave for reflection. Whilst you can be very obstinate, you’re really a trusting, gentle person and want to help others."
    ],
    [
      8,
      8,
      5,
      "This is a very Yang Expression which can be unyielding, single-minded, opinionated and controlling: attributes that are usually associated with the male psyche and so may cause difficulties for females. You have great drive and ambition to achieve your goals with a strong sense of justice and fair play which can tip over into obsession if left unchecked. You tend to be always active and looking for new adventures which can sometimes make it hard to stay satisfied. You can be charming, persuasive, witty and generous but with a degree of naivety that can be taken advantage of leaving you exposed and hurt. You are not always as outgoing and independent as you’d like to let on and need a stable Yin Expression to keep you grounded."
    ],
    [
      9,
      8,
      6,
      "Bright, ambitious and dignified, you are honest, sincere and direct; qualities which can take you to leadership roles, especially if that involves fairness, justice and human rights. You also have the potential to be vain, greedy, proud and overbearing. Whilst there is usually a hard exterior on show, there is a soft inside which can manifest as shyness with a desire to retreat into your cave. As with most 9 Expressions, there is great potential for clear and brilliant thinking and shining a light out of difficult situations but there is also an obstinate and self-indulgent streak. You like to have recognition for your achievements and what you do and count money and/ or fame as an indicator of your success."
    ]
  ],
  [
    [
      1,
      9,
      6,
      "You like to lead and as a rule you are very good at it! This is because you can combine your natural charisma and creativity with prudence and directness. You make persuasive and convincing speakers although with a tendency to ‘guild the lily’. You can be moody and make snap, thoughtless judgements or labour making decisions to a point of virtual paralysis. You can be rather self-centred and vain but you are a true romantic with great reserves of affection which can truly inspire those around you. You tend to be drawn to well-organised partners who are less self-assertive than you as you are going to be doing the majority of the leading."
    ],
    [
      2,
      9,
      7,
      "You are a type of person who prefers going out rather than staying in. A varied social life is important to you especially if it’s underpinned by style, intellect and creativity. However, at times you can be indiscreet, impulsive, moody and self-centred. You are perceptive and able to see behind people’s masks and take a logical and rational view on the situation. As a rule, you are conservative on financial matters but will have bursts of extravagant spending and enjoy showing it off . You make shrewd strategic planners but are not that great at implementing the plans you come up with. You are also a persuasive speaker, especially if there is an audience you want to impress."
    ],
    [
      3,
      9,
      8,
      "Ambitious, showy and self-motivated; you are intelligent, hard-working and full of energy. You can also be moody, haughty and vain. Life is a bit of a roller coaster for you, with high highs and low lows and you can flip-flop one way and then another at the drop of a hat: one moment being the star of the show, the next hiding away in your cave. Your ever changing moods can make you impulsive and impatient but at your core is a very sensitive and intuitive person. Money plays a big part in your life and whilst you don’t really come across as greedy, you like to keep hold of it and store it safely away."
    ],
    [
      4,
      9,
      9,
      "Whilst this triple Yin Expression hates to be controlled, the truth is you are very dependent on others (especially Yang) for attention, affection, admiration and a call to action. Your usually expressive actions however may not be what you are really feeling and this can make you appear moody, which actually you probably are. You have high powers of persuasion and influence and can see and get to the point of an issue quickly and then clarify it simply for others. But if your advice is not followed you can get easily hurt and upset for you need to be wanted. You are very tactile, warm and affectionate, sensitive too: but stubborn, fickle and impulsive. You are also intuitive and creative but can easily be blown of course."
    ],
    [
      5,
      9,
      1,
      "There is a lot of drive and energy here to get what you want out of life, especially if it involves fame and the money and possessions that go with it. The conflict is that you are a lot more shy and indecisive than you want to admit and this struggle between the dreams and the reality can cause difficulties. Whilst you can be rather impulsive, you are persistent and strong-willed with loads of ambition but you do need to be at centre of things to deflect that nagging sense of insecurity you sometimes have. You enjoy your social life where you can display your affectionate and playful nature and you can be very inspiring, creating and effectively delivering presentations and speeches."
    ],
    [
      6,
      9,
      2,
      "There is an air of self-confidence, boldness and even daring-do about you and combine that with your persistence and diligence means you are likely to achieve your goals and unlikely to accept second-best. Your social, engaging and easy-going manner can hide real ambition and a strong will, which along with a good dose of impulsiveness will tend to be exposed when you’re under stress. You can be vain and moody and rather self-centred and at times inconsiderate to those around you with the result that the undoubted potential you have for inspiring leadership can be badly dented. This can also affect your decision-making which can become hesitant, inconsistent and sometimes impractical."
    ],
    [
      7,
      9,
      3,
      "You’re the sort of person who likes to stand out from the crowd. You’re probably a self-confident extrovert with an engaging and cheerful demeanour who wants to be the centre of attention. You can talk for your country but be very persuasive and inspiring at the same time. But your ‘front’ hides a sensitive and sometimes insecure person, liable to mood swings which at times can be explosive and even aggressive. You hate to be criticised and are vulnerable to flattery. Whilst you are industrious and energetic, you can be pushy and even inconsiderate of others with a degree of impatience that can prevent the completion of projects. You like to break new ground and to receive praise for your achievements."
    ],
    [
      8,
      9,
      4,
      "This is an Expression that lends itself to creativity and specialist skills. You can be very single-minded and determined and appear completely comfortable and in charge of any situation. However, you are more than likely to be very moody and changeable allowing your emotions to get the better of you and so appearing both erratic and wilful. To the outside world, and leaving your self-consciousness to one side, you are likely to come across as confident, charming, entertaining and playful, which allows you to have the potential to be an inspirational and persuasive speaker. Whatever else, you are a proud, ambitious and driven individual, who whilst impulsive and indecisive at times, are essentially a kind, gentle and helpful person."
    ],
    [
      9,
      9,
      5,
      "You are likely to be entertaining, lively, friendly and generous with an effervescent and empathetic personality. This will make you attractive and socially popular but you can be quite impulsive and moody making it hard for people to know what to expect. You’re also quite controlling, even domineering at times, and like to be the centre of attention. You can be very persuasive and convincing, although your words can actually be rather empty and short of real substance. You have a tendency to be a bit of a show-off and can be quite vain and pretentious with it, but that’s usually hiding your sensitive and sometimes insecure side. You’re good at simplifying complex issues and getting to the salient points but you do need constant reassurance that you’re doing the right things."
    ]
  ]
];

// @ts-check

let genderChosen;

/*
 * Set the number of goes allowed from a HTML dataset value
 * only when the application is first run
 */
const genderBox = document.getElementById("js-gender-box");
const allowedGoes = genderBox.dataset.uses;
if (localStorage.triesLeft === undefined) {
  localStorage.triesLeft = allowedGoes;
}

/*
 * Write to the DOM
 */
document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;

function outputToDOM(results) {
  document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;
  document.getElementById("results").innerHTML = `
  <p>Your Expression is <strong>${results.typeOfExpression}</strong></p>
  <p>You are <strong>${results.duality}</strong></p>
  <p>You are a <strong>${results.complexity}</strong> Expression</p>
  <p>Your primary number is <strong>${results.primaryNumber}</strong></p>
  <p>Your second number is <strong>${results.secondNumber}</strong></p>
  <p>Your third number is <strong>${results.thirdNumber}</strong></p>  
  <h3>Your 9-Energy Natural Expression is:</h3>
  <h2><strong>${results.primaryNumber}-${results.secondNumber}-${results.thirdNumber}</strong></h2>
  <p><strong>"${results.text}"</strong></p>`;
}

function calculateYear(selectedDate) {
  const isFebFirstToThird = selectedDate =>
    selectedDate.getMonth() === 1 && selectedDate.getDate() < 4;
  const isJan = selectedDate => selectedDate.getMonth() === 0;

  return isJan(selectedDate) || isFebFirstToThird(selectedDate)
    ? selectedDate.getFullYear() - 1
    : selectedDate.getFullYear();
}

function findPrimaryAndType(naturalExpressionYearOfBirth, gender) {
  const includesYearOfBirth = element =>
    element.year.includes(naturalExpressionYearOfBirth);

  return gender === "F"
    ? {
        primaryNumber: (primaryNumberFemales.find(includesYearOfBirth) || {})
          .number,
        typeOfExpression: (primaryNumberFemales.find(includesYearOfBirth) || {})
          .name
      }
    : {
        primaryNumber: (primaryNumberMales.find(includesYearOfBirth) || {})
          .number,
        typeOfExpression: (primaryNumberMales.find(includesYearOfBirth) || {})
          .name
      };
}

function findSecondaryNumber(primaryNumber, gender, monthOfBirth) {
  const includesPrimaryNumber = element =>
    element.primary.includes(primaryNumber);
  const listOfSecondaryNumbers =
    gender === "F"
      ? (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary
      : (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;
  let monthIndex = monthOfBirth - 1;
  if (monthIndex < 0) {
    monthIndex = listOfSecondaryNumbers.length - 1;
  }

  return listOfSecondaryNumbers[monthIndex];
}

function findDualityAndComplexity(primaryNumber, gender) {
  const isPrimaryNumber = element => element.number === primaryNumber;

  return gender === "F"
    ? {
        duality: (primaryNumberFemales.find(isPrimaryNumber) || {}).duality,
        complexity: (primaryNumberFemales.find(isPrimaryNumber) || {})
          .complexity
      }
    : {
        duality: (primaryNumberMales.find(isPrimaryNumber) || {}).duality,
        complexity: (primaryNumberMales.find(isPrimaryNumber) || {}).complexity
      };
}

function findThirdNumberAndText(secondNumber, primaryNumber) {
  let secondNumberIndex = secondNumber;
  let primaryNumberIndex = primaryNumber;
  secondNumberIndex -= 1;
  primaryNumberIndex -= 1;
  const thirdNumberIndex = 2;
  const textIndex = 3;

  return {
    thirdNumber:
      thirdNumberArray[secondNumberIndex][primaryNumberIndex][thirdNumberIndex],
    text: thirdNumberArray[secondNumberIndex][primaryNumberIndex][textIndex]
  };
}

function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    document.getElementById(
      "natural-expression-generator--mask"
    ).style.display = "block";
  }
}

function IncreaseUseCounter() {
  localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
}

/**
 * @param {Date[]} selectedDates
 */
function calculateNaturalExpression(selectedDates) {
  const selectedDate = selectedDates[0];
  checkGoesLeft();
  IncreaseUseCounter();
  const naturalExpressionYearOfBirth = calculateYear(selectedDate);
  const monthOfBirth = selectedDate.getMonth();
  const { primaryNumber, typeOfExpression } = findPrimaryAndType(
    naturalExpressionYearOfBirth,
    genderChosen
  );
  const secondNumber = findSecondaryNumber(
    primaryNumber,
    genderChosen,
    monthOfBirth
  );
  const { duality, complexity } = findDualityAndComplexity(
    primaryNumber,
    genderChosen
  );
  const { thirdNumber, text } = findThirdNumberAndText(
    secondNumber,
    primaryNumber
  );
  outputToDOM({
    primaryNumber,
    typeOfExpression,
    secondNumber,
    duality,
    complexity,
    thirdNumber,
    text
  });
}

const fp = flatpickr("#flatpickr", {
  onChange(selectedDates) {
    if (genderChosen !== undefined) {
      calculateNaturalExpression(selectedDates);
    }
  }
});

function toggleGenderBox() {
  switch (genderChosen) {
    case undefined:
      genderChosen = "M";
      genderBox.textContent = "Male";
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-male"
      );
      break;
    case "M":
      genderChosen = "F";
      genderBox.textContent = "Female";
      genderBox.classList.remove(
        "natural-expression-generator__gender-box--color-male"
      );
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-female"
      );
      break;
    case "F":
      genderChosen = "M";
      genderBox.textContent = "Male";
      genderBox.classList.remove(
        "natural-expression-generator__gender-box--color-female"
      );
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-male"
      );
      break;
  }

  // If a date has been choosen then calculate the Natural Expression
  if (fp.selectedDates.length > 0) {
    calculateNaturalExpression(fp.selectedDates);
  }
}

genderBox.addEventListener("click", toggleGenderBox, false);

checkGoesLeft();

export { findPrimaryAndType, findSecondaryNumber };
//# sourceMappingURL=bundle.js.map
