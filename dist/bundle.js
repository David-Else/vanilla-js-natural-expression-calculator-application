/* https://www.elsewebdevelopment.com/ */
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var flatpickr = createCommonjsModule(function (module, exports) {
/* flatpickr v4.3.2, @license MIT */
(function (global, factory) {
	factory(exports);
}(commonjsGlobal, (function (exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours(dateObj.getHours() % 12 +
            12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (dateObj, frmt, overrideLocale) {
        if (config.formatDate !== undefined)
            return config.formatDate(dateObj, frmt);
        var locale = overrideLocale || l10n;
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, locale, config)
                : c !== "\\" ? c : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (config && config.parseDate)
                parsedDate = config.parseDate(date, format);
            else {
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate = fn(parsedDate, val, l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            config.errorHandler(new Error("Invalid date provided: " + date_orig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}

var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return (1 +
        Math.round(((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7));
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    errorHandler: console.warn,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign({}, flatpickr.defaultConfig),
        l10n: english,
    };
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.visibility = "hidden";
            self.calendarContainer.style.display = "block";
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
            self.calendarContainer.style.visibility = "visible";
            self.calendarContainer.style.display = null;
        }
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && self.selectedDates.length === 0) {
            self.setDate(self.config.minDate !== undefined
                ? new Date(self.config.minDate.getTime())
                : new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds, 0), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (e.type !== "input") {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, DEBOUNCED_CHANGE_MS);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (limitMaxHours) {
            var maxTime = self.config.maxTime !== undefined
                ? self.config.maxTime
                : self.config.maxDate;
            hours = Math.min(hours, maxTime.getHours());
            if (hours === maxTime.getHours())
                minutes = Math.min(minutes, maxTime.getMinutes());
        }
        if (limitMinHours) {
            var minTime = self.config.minTime !== undefined
                ? self.config.minTime
                : self.config.minDate;
            hours = Math.max(hours, minTime.getHours());
            if (hours === minTime.getHours())
                minutes = Math.max(minutes, minTime.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) {
            evt.which === 1 && handler(evt);
        };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        bind(window.document, "mousedown", onClick(documentClick));
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["input", "increment"], self._debouncedChange, {
                passive: true,
            });
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, true);
                newIndex += 42;
            }
        }
        focus();
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        clearNode(self.daysContainer);
        self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.firstChild;
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
        self.currentYearElement = yearInput.childNodes[0];
        if (self.config.minDate)
            self.currentYearElement.setAttribute("data-min", self.config.minDate.getFullYear().toString());
        if (self.config.maxDate) {
            self.currentYearElement.setAttribute("data-max", self.config.maxDate.getFullYear().toString());
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("div", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.setAttribute("data-step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("data-step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("data-min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("data-max", self.config.time_24hr ? "23" : "12");
        self.minuteElement.setAttribute("data-min", "0");
        self.minuteElement.setAttribute("data-max", "59");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.setAttribute("data-step", self.minuteElement.getAttribute("data-step"));
            self.secondElement.setAttribute("data-min", self.minuteElement.getAttribute("data-min"));
            self.secondElement.setAttribute("data-max", self.minuteElement.getAttribute("data-max"));
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index = document.activeElement.$i;
            focusOnDay(index, 0);
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        if (self.config.enableTime) {
            if (self.config.minDate !== undefined)
                setHoursFromDate(self.config.minDate);
            else
                setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(e.target);
            });
            if (lostFocus && isIgnored) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.getAttribute("data-min") &&
                newYear <
                    parseInt(self.currentYearElement.getAttribute("data-min"))) ||
            (self.currentYearElement.getAttribute("data-max") &&
                newYear >
                    parseInt(self.currentYearElement.getAttribute("data-max"))))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    self.close();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case 37:
                case 39:
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                default:
                    break;
            }
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case self.l10n.amPM[1].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            elem.classList.contains("disabled") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (i, date) {
            var timestamp = date.getTime();
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var i = 0, date = self.days.childNodes[i].dateObj; i < 42; i++, date =
                self.days.childNodes[i] &&
                    self.days.childNodes[i].dateObj) {
            _loop_1(i, date);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self._input.disabled || self.config.inline)
            return;
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
            "onPreCalendarPosition",
        ];
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign({}, flatpickr.l10ns.default, (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        self.formatDate = createDateFormatter(self);
    }
    function positionCalendar(customPositionElement) {
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function (acc, child) { return acc + child.offsetHeight; }, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            self.selectedDateElem && self.selectedDateElem.focus();
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
        }
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                self.isOpen && positionCalendar();
            },
        });
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        e.preventDefault();
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (e.target === self.currentYearElement) {
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp") {
            self.changeYear(self.currentYear + 1);
        }
        else if (e.target.className === "arrowDown") {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("data-min")), max = parseFloat(input.getAttribute("data-max")), step = parseFloat(input.getAttribute("data-step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
if (typeof window === "object")
    window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

exports.default = flatpickr$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
});

var flatpickr$1 = unwrapExports(flatpickr);

const primaryNumberMales = [{
  name: 'Fire',
  number: 9,
  duality: 'Yin',
  complexity: 'Complex',
  year: [1910,
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
    2018,
  ],
},
{
  name: 'Mountain',
  number: 8,
  duality: 'Yang',
  complexity: 'Simple',
  year: [1911,
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
    2019,
  ],
},
{
  name: 'Lake',
  number: 7,
  duality: 'Yin',
  complexity: 'Complex',
  year: [1912,
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
    2020,
  ],
},
{
  name: 'Sky',
  number: 6,
  duality: 'Yang',
  complexity: 'Simple',
  year: [1913,
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
    2021,
  ],
},
{
  name: 'Earth Core',
  number: 5,
  duality: 'Yang',
  complexity: 'Simple',
  year: [1914,
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
    2022,
  ],
},
{
  name: 'Wind',
  number: 4,
  duality: 'Yin',
  complexity: 'Complex',
  year: [1915,
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
    2023,
  ],
},
{
  name: 'Thunder',
  number: 3,
  duality: 'Yang',
  complexity: 'Simple',
  year: [1916,
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
    2024,
  ],
},
{
  name: 'Earth',
  number: 2,
  duality: 'Yin',
  complexity: 'Complex',
  year: [1917,
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
    2025,
  ],
},
{
  name: 'Sea',
  number: 1,
  duality: 'Yang',
  complexity: 'Simple',
  year: [1918,
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
    2026,
  ],
},
];


const primaryNumberFemales = [{
  name: 'Sky',
  number: 6,
  duality: 'Yang',
  complexity: 'Complex',
  year: [1910,
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
    2018,
  ],
},
{
  name: 'Lake',
  number: 7,
  duality: 'Yin',
  complexity: 'Simple',
  year: [1911,
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
    2019,
  ],
},
{
  name: 'Mountain',
  number: 8,
  duality: 'Yang',
  complexity: 'Complex',
  year: [1912,
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
    2020,
  ],
},
{
  name: 'Fire',
  number: 9,
  duality: 'Yin',
  complexity: 'Simple',
  year: [1913,
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
    2021,
  ],
},
{
  name: 'Sea',
  number: 1,
  duality: 'Yang',
  complexity: 'Complex',
  year: [1914,
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
    2022,
  ],
},
{
  name: 'Earth',
  number: 2,
  duality: 'Yin',
  complexity: 'Simple',
  year: [1915,
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
    2023,
  ],
},
{
  name: 'Thunder',
  number: 3,
  duality: 'Yang',
  complexity: 'Complex',
  year: [1916,
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
    2024,
  ],
},
{
  name: 'Wind',
  number: 4,
  duality: 'Yin',
  complexity: 'Simple',
  year: [1917,
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
    2025,
  ],
},
{
  name: 'Earth Core',
  number: 5,
  duality: 'Yang',
  complexity: 'Complex',
  year: [1918,
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
    2026,
  ],
},
];

const secondNumberMales = [{
  primary: [1, 4, 7],
  secondary: [8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    9,
    8,
    7,
    6,
  ],
},
{
  primary: [3, 6, 9],
  secondary: [5,
    4,
    3,
    2,
    1,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
  ],
},
{
  primary: [2, 5, 8],
  secondary: [2,
    1,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    9,
  ],
},
];

const secondNumberFemales = [{
  primary: [1, 4, 7],
  secondary: [7,
    8,
    9,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ],
},
{
  primary: [3, 6, 9],
  secondary: [1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
  ],
},
{
  primary: [2, 5, 8],
  secondary: [4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
    4,
    5,
    6,
  ],
},
];


const thirdNumberArray = [
  [
    [1, 1, 5, 'This is a triple Yang Natural Expression, which sits comfortably for a man but not so much for a woman. The 5 in your Expression means that you’re going to be found at the centre of things such as family, local community and at work. You’re going to have firm ideas about how things should be done and are likely to be very independent, detail-conscious, bright and adventurous with a deep philosophical nature. You can be quite secretive and often struggle to understand other people’s problems and can even be quite dismissive, but there is a large capacity for cool judgement, pragmatism and real warmth. You need to seek Yin Expressions for balance.'],
    [2, 1, 6, 'You are bright, sincere, straightforward, organised and logical. You work in a careful, methodical way which can end up being inflexible and bordering on the finicky as you expect things to be perfect. Your focus and steady hard work will provide the recognition you aspire to but don’t be afraid to ask for help and support from a stronger Expression to help you get there. For men, you are a lot more serious and sensitive than you let on whilst women like to control and can be obstinate and haughty. You like to help people and to serve but under pressure you can show a tactful and diplomatic side to your character although your decision making might be slow, cautious and over-complicated.'],
    [3, 1, 7, 'You are likely to be determined, energetic, industrious and happy to take on lots of commitments but your approach to life is laid-back and easy-going, which ultimately might prevent you fulfilling your ambitions. You come across as straightforward, charming, outgoing and sociable but underneath you are sensitive and somewhat insecure and will only share your true thoughts and emotions with people who’ve earned your trust. That being said, you are very insightful and can really see and hear people, putting them at ease and making them feel valued. You tend to believe in the ‘perfect relationship’ and ‘true love’ and find it hard to compromise which might make it difficult to sustain long-term relationships.'],
    [4, 1, 8, 'Strong and silent; sincere and serious; stubborn and self-motivated: that’s how the outside world is likely to see you. They’ll also see an easy-going, sociable and independent person who generally has a fairly philosophical approach to life. You have the ability to influence others in a quiet, calm sort of way but that can turn to controlling if you feel your opinions are not being accepted. You’re an intelligent and pragmatic person but not particularly practical and you tend to learn best by trial and error. You’re actually quite emotional with almost fairy tale dreams about love and romance but you tend to be shy and keep your cards close to your chest and are reticent about being the first to expose your true feelings.'],
    [5, 1, 9, 'There is a kind of flamboyant, impulsive air about you and you don’t mind showing off how clever and creative you are or making a statement by the way you dress. You’re better at leading than following and you have high principles but you can struggle to get across what you actually stand for and expect from your followers. There are times when you can be cautious and withdrawn but mostly you’re at the centre of things where your energy, focus and ambition are put to best use. You’re not great at showing your emotions and can be pretty defensive on matters of the heart. You’re also pretty hopeless at reading signals, especially from your partner or colleagues if the issue is personal rather than work related.'],
    [6, 1, 1, 'There are two very definite sides to this Expression: on the one hand you will blow people away with your extrovert, fun, passionate and witty way of being; and on the other there is the withdrawn, insecure, indecisive and cautious person. Both are real but the former you like to show; the latter you only reveal to those close to you, and as a triple Yang Expression, you are probably going to be more comfortable confiding with Yin Expressions. You are strong-willed, tenacious, magnanimous and assertive and you can be really inspiring and influential with a warrior type leadership potential. You are also a bit of a diplomat, particularly effective at tactful negotiations within your family and close circle of friends.'],
    [7, 1, 2, 'You tend to be very comfortable in social situations and have the makings of the perfect host. That’s because you have an easy-going, extrovert, witty and charming personality with that knack of making people feel at ease and important. But unless they are close to you, it’s unlikely they will see your sensitive side which can sometimes make you seem cautious, withdrawn and uncommunicative. They might also miss your philosophical and reflective insights and observations, but all are likely to feel the benefits of your helpful and supportive attitude. You tend to live your life and base a lot of your decisions on intuition and a gut instinct but you are actually quite conservative and at times obstinate.'],
    [8, 1, 3, 'This is a powerful, single-minded triple Yang Expression that suits males well but is more ‘complex’ for females. Self-motivation, ambition, hard work and independence are going to be high on your agenda as is honesty, a strong sense of fair play and ‘doing the right thing’. You hate to be held back and are very forward looking but tend to be narrow-minded and your impatience and sometimes quick temper can cause difficulties and be inconsiderate for others. Perhaps oddly given all that, you can come across as quite shy but that really is the face of your cautious and contemplative nature. You are pretty good at reading people and have a creative side that fuels original thought and ideas.'],
    [9, 1, 4, 'You are probably going to come across as confident, bright, charismatic and intuitive. But equally you may seem to be rather vain, superior and impulsive. You have the potential to become an intelligent and inspiring leader but you can be obstinate, only hearing one side of the argument and dismissing the feelings and views of others. This can lead you to being isolated when times get difficult, but even though you’re likely to retain your tenacious and assertive qualities, you’ll probably become more cautious and wary. There is a strong independent streak about you and you can sometimes allow your pride and assertiveness to get the better of you. You are a bright and foresighted individual, who can be both brilliant and beguiling at the same time.'],
  ],
  [
    [1, 2, 4, 'The two Yin Expressions (2 and 4) will temper the 1 Yang; so whilst there is still that independent, serious and stubborn streak, there is also a warm and easy-going side that enjoys social occasions and mixing with people you know and are comfortable with. There is definitely a strong, steady driving force in this Expression especially if it is directed towards human rights, justice and fairness. You can appear to be quite conservative and quiet but this is just as likely to be hiding a thirst for adventure and trying new things. There are balances to be found in this Expression and generally it sits well for both males and females.'],
    [2, 2, 5, 'You like to be involved and in the middle of things and be appreciated for your efforts. You are steady, supportive, diplomatic and rather conventional. You have a perceptive nature but can be hyper-critical with yourself and those around you and your focus on details can border on fastidious. Your actions tend be deliberate and sometimes over cautious but clear and precise and underlined with a great deal of persistence. You have a strong sense of self-protection and prefer to stay in your social circle but both men and women need to have a lot of outside support, love and attention. Not great at making big decisions, you tend to be better in advisory roles.'],
    [3, 2, 6, 'One way of looking at you is someone who is well-organised, detail minded, honest and direct. The other way is someone who can be overbearing, inflexible, stubborn and self-important. Responsible and hard-working with lots of energy, you are great for coming up with new ideas and novel ways to tackle an issue but you can spend a lot of time faffing around and not getting very far even though you know exactly what needs to be done. You are supportive and helpful in relationships but can get hurt easily if you do not feel loved and appreciated. You like being in the spot-light and will smoothly take on the peace-making role in family disputes.'],
    [4, 2, 7, 'This is a triple Yin Expression, which is a natural fit for females who are comfortable with their independence and clarity of thought; but harder for men who tend to display a feminine and soft behaviour, living on emotion rather than rationality. Both genders are emotional, very sensitive and need lots of attention especially on matters of love where you often take more than you give causing potential difficulties in relationships. You’re easy-going, tender and charming but underneath fairly self-centred and sometimes even calculating and you can be quite fussy when it comes to details. You’re supportive and helpful and have a natural affinity towards beauty and there is also a reflective and philosophical side to you.'],
    [5, 2, 8, 'You are the sort of person who is really good at helping and supporting others, especially if they are vulnerable or close to you in the family or at work. But you do really want to control them and be at the centre of their lives until the issue is resolved as you see it. Yes, you’re pretty inflexible and stubborn, but you’re determined and ambitious, idealistic too. How you look and come across is important to you but that can become a bit flashy and fussy. Trying to control you is really hard, so it’s surprising perhaps that you are actually pretty dependent on others both for emotional support and confirmation that you’re doing the right thing. Recognition is usually more important than financial reward.'],
    [6, 2, 9, 'There’s an impulsive and flamboyant side to your character and when that is coupled with your strong sense of pride and firm work ethic, you often find yourself gravitating towards leadership roles. You’re not a great follower and are often very direct, but you can get overconfident and sometimes seem rather conceited and unapproachable. That is a shame, because your natural urge is to help and support people and you are really good at smoothing troubled waters with an easy but commanding sense of tact and diplomacy. Well organised, good at planning and detail conscious (perhaps too detail conscious), you are usually a pretty calm person and actually quite cautious in your dealings with people and situations.'],
    [7, 2, 1, 'You are likely to come across as a person who is rather quiet and quite shy. It may seem at odds then that actually you are often craving attention but if your sensitivity gets the better of you, it can make you needy and insecure. What’s hiding underneath is a thoughtful and reflective individual who can make sound judgements with a steady, resourceful and pragmatic approach. Some might see that as being indecisive but actually you are just being cautious and coolly calculating. You are good in social situations and can make people feel at ease using your charm, sense of humour and natural enthusiasm for life. You like to get to know how people are really feeling and thinking deep down and you would like that to be reciprocated.'],
    [8, 2, 2, 'You are a person who works hard and is always on the go. You have a lot of determination and self-motivation and an ambitious and adventurous spirit which is not always obvious as you can come across as rather reserved and conservative. You are engaging and charming and like to play a full part in social and family affairs as well as the wider community, where you are helpful, well organised and detail conscious. But you’re really not that empathetic to other people’s feelings, views or how they may want to do things and so at times you can be seen as being rather inconsiderate. You can be proud and obstinate but there is a lot of tender sensitivity under the surface too.'],
    [9, 2, 3, 'This is an Expression about energy, enthusiasm, spontaneity and brilliance. You have great potential to set the world on fire with your creativity, clarity and capacity for hard work. You are very passionate and love to express yourself but the price can be costly on your highly sensitive and emotional state. For the truth is, you are very dependent, desperate almost, for the attention, praise and acknowledgment of others and if you feel it is not there, your confidence and well-being will be severely hit. You can make a good leader, albeit quite a conservative one, but you can be impatient, opinionated, temperamental and at times manipulative. You tend to devote a lot of time and energy to your social life and can be quite sentimental at times.'],
  ],
  [
    [1, 3, 3, 'A triple Yang Expression, you have an underlying nature to control and impose yourself on others. You can be very self-assertive, direct and to the point. For men, this might be seen as typical ‘alpha male’ behaviour; for women it is a complex Expression and you may feel the need to ‘tone down’ your assertiveness although to do that for any length of time would be wrong and will cause you suffering and illness. In any case, just under the surface there is a very sensitive side which gets easily hurt if those around you can’t see that. You are hardworking (which can lead to obsessiveness), impatient but caring and tend to have a strong sex drive. You need to listen and be in influenced by Yin Expressions to provide balance and calming.'],
    [2, 3, 4, 'From the outside you come across as pretty quiet and gentle, as well as being helpful, reliable and diplomatic. Underneath though, there is a sensitive, intense and insightful person with a really expressive and sometimes explosive side which can take others (and you!) by surprise. You really know what you like and don’t like, which can make you blind to other factors. Whilst generally conservative in nature, there is a strong impulsiveness about you but you are an insightful observer of people and situations. You can be pretty emotional and will lean on others for strength and support and are likely to develop a pretty thick self-protective wall around you.'],
    [3, 3, 5, 'This is a powerful triple Yang Expression, amongst the most powerful of them all.  This is not such an issue for men but can be for women only because this Expression is naturally commanding and controlling and Learned Convention tells us that these are not feminine characteristics. You have to be involved and at the centre of things but you need the support of others, you can’t do it all. You are intelligent, shrewd and very hard working with huge amounts of energy, love and passion. You are stubborn, with your likes and dislikes clearly defined and your warrior-like approach means people will want you on their side. You are deeply sensitive and emotional with an explosive and quick temper. Connecting with Yin Expressions will help as long as you listen to them!'],
    [4, 3, 6, 'This is a dignified, direct and detail-focussed Expression. You are straight- forward, steady and sometimes stubborn. When stressed, there is a quick and explosive temper lurking but if revealed it will tend to be short-lived and then you will show great determination, hard work and a ‘tell-it-how-you-see-it’ approach to overcome difficulties and challenges. Emotionally, you are a sensitive person with a definite jealous side to your character and because you tend to have such clear likes and dislikes, others can struggle to get through to you for other alternatives to be considered. You can be pretty intense at times and you crave affection but your pride can sometimes stop you from revealing your true hopes and thoughts.'],
    [5, 3, 7, 'Socially, you’re going to come across as easy-going, fun, straightforward and engaging. You like and need to be at the centre of things wherever that may take you. You are strong willed, assertive, hardworking and controlling. At times, you can be quite explosive especially under intense pressure but you have a lot of energy and ambition to get the things you want, although some may take that as you being greedy and materialistic. You’re actually more interested in the achievement than the spoils but if things are not going your way in love or in work, you will look to move quickly on. You like to keep your personal and public lives separate and are pretty black & white about your likes and dislikes.'],
    [6, 3, 8, 'If you are a man, this triple Yang Expression sits pretty comfortably with you and your sensitivity is often expressed by caring about others. For women though, this air of independence, ambition, drive and using other people to get what you want is, by the Learned Convention of today, seen as rather unfeminine but as we know Learned Convention is tosh! Either way, both males and females are hard-working, direct, self-motivated and opinionated. You are also usually very expressive and potentially explosive, although the storm tends to clear pretty quickly. You have high moral principles which you are reluctant to compromise on and whilst you are by nature forward looking and insightful, you can sometimes be surprisingly cautious missing opportunities as a result.'],
    [7, 3, 9, 'You are hardworking, determined and resourceful but you can also add flashes of brilliance, not only for new ideas and ways of doing things, but also by shedding light on existing issues and situations. You can be quite inspirational and because you are also bright and articulate, you make a persuasive communicator and are likely to attract people keen to be a part of whatever project you happen to be involved in. You don’t like to hide your feelings and despite having an open and flexible attitude, you have a strong sense of right and wrong and likes and dislikes. You are good at reading people because you are very sensitive but can get frustrated because you long for affection and attention from those close to you.'],
    [8, 3, 1, 'Ambitious, assertive and adventurous, you’re a confident, competitive and courageous individual who is strong-willed, single minded and with the energy and patience to overcome hard times and most difficulties. From the outside, you are likely to come across as cautious, shy and indecisive because underneath you’re actually a sensitive and rather insecure person. You like to keep moving and hate to get stuck in one place for too long and have a powerful need for attention and recognition and even fame. Under pressure or if you feel threatened, you have the potential to be explosive and will defend yourself forcefully. As with all powerful Yang Expressions, connecting with stable Yin Expressions should help settle and ground you.'],
    [9, 3, 2, 'From the outside, people are likely to see a conservative, reserved and somewhat proud person, but inside there is a lot of fire and passion which gives you great strength, intensity and a brilliant clarity of mind and purpose. You are also rather vain and pretty sensitive which can make you cautious and sometimes indecisive when taking decisions. When stressed, you can be explosive and express your opinions with a directness and force that may well be inappropriate. With a bright and flexible attitude, you are happy to work hard especially if it leads to a respected position or recognition. You can be tactful and diplomatic and be very detail conscious which can border on finicky as you are often seeking perfection.'],
  ],
  [
    [1, 4, 2, 'From the outside, this Expression may appear quiet, reliable, tender and sometimes moody. But this hides a strong, self-assertive and independent individual with a strong sense of adventure. However, there is a rather emotional side to you coupled with a conservative and stubborn streak. Intelligent and helpful, you can be self-centred, somewhat opinionated and difficult for others to read. The maternal instinct is strong for the females but you will want to do more than simply staying at home. In the work environment, this Expression is characterised by being steady, dependable and loyal. Given the choice, you are likely to want to remain in one place for a good length of time.'],
    [2, 4, 3, 'People are likely to describe you as having lots of energy and enthusiasm. Some will say that you are very expressive and spontaneous, sensitive and supportive. Some though might see you as being emotional and at times even aggressive. These two opposites are hard even for you to handle, although you usually get back on an even keel pretty quickly. You are resourceful, self-motivated and assertive but at the same time can be very defensive if asked to take major responsibility for something. There is a very dependent side to your nature, which is particularly evident when an idea or initiative runs out of steam as you tend to be short on stamina and can lose focus.'],
    [3, 4, 4, 'You are confident, helpful and trusting with a quiet and gentle demeanour. Your natural charm goes a long way in social and work circles. You are hard-working, optimistic and energetic. Underneath though there is a lot of emotion and sensitivity and sometimes you can be a bit over the top and rash in what you say and do. You are likely to be an ideas’ person but may struggle to make decisions and then stick with them, although once you do, it’s likely to be a good one. In relationships, men can be hard to read and will hide a serious and defensive nature with a breezy manner, whilst women are more outspoken and direct and don’t like to be controlled.'],
    [4, 4, 5, 'To others you’re going to appear easy-going, pretty soft and affable. But that hides a stubborn and opinionated side to your character and whilst you have loads of ‘get-up-and-go’ you need lots of attention and admiration to fuel your motivation and creative ambitions. If you don’t get this, you’re going to feel hurt and anxious and likely to become erratic and change tact which will confuse you and those around you. You do need to seek the patient advice of your supporters to help you with your decision-making but because you can be pretty self-centred and evasive, you can sometimes be insensitive and ride rough-shod over their feelings and views. There is an obsessive potential to your character which comes to the fore when your self-confidence is dented.'],
    [5, 4, 6, 'Dignified, magnanimous, strong-willed and well-organised, you are really good at controlling things and managing people and will use your logical and straightforward approach to good effect. Others will see you as stubborn and inflexible but always honest and sincere. Underneath your front though there is an impulsive and emotional side that can see you being indecisive and seeking the support and love of those close to you. This will often bewilder them as you like to appear so strong and in control from the outside. In times of trouble, you really come to the fore and your energy and resolute personality will see you overcome most of the obstacles put in your path.'],
    [6, 4, 7, 'You are a personality that changes easily (perhaps too easily) from being affable, charming, easy-going and confident to one that is impulsive, strong, stubborn and emotional. This is hard enough for you to get your head around let alone trying to explain your thoughts to others and this often makes it hard for you to plan and take important decisions. You have high ideals, take pride in what you do and how you come across and like to have that recognised by those around you. You have a tender heart and a trusting nature, which is typically reciprocated, but you are forthright in your dealings with people and like all the 6s have a strong capacity for leadership and inspiring those around you.'],
    [7, 4, 8, 'You combine the qualities of charm, resourcefulness and self-confidence with tenacity, prudence and a steady caution. You tend to be popular in your social circle but your public affability can mask a stubborn and inflexible side unwilling to play along to someone else’s tune. You usually take your time to settle on a final course of action, often changing your mind frequently before you get there, but once done, it’s done and you don’t give up easily. You can be pretty emotional and sensitive and that can play a large part in your life and the decisions you make. Your default is to trust people and you expect them to trust you in return, and to those close to you, you are caring and considerate.'],
    [8, 4, 9, 'From the outside, people may see rather a flamboyant and impulsive person and when they get to know you someone who appears calm, steady and straightforward; but actually underneath there are a lot of emotions swirling around which means decisions can be made rashly and just as rashly quickly changed again. You have strong determination and a single-mindedness for fair play coupled with a bright and insightful mind. You are your own greatest fan and can come across as quite arrogant at times, but you are kind and supportive within your social circle as long as things don’t get too complicated or involved. You have natural leadership skills but your followers may have difficulty keeping up with your changed priorities.'],
    [9, 4, 1, 'On the surface, you will probably appear as shy, reserved, cautious and actually quite vulnerable. You are likely to find it hard to express how you really feel, bottling up your sensitive emotions and feeding a real sense of insecurity. You’re quite a perfectionist, so you like to take your time to make decisions, patiently applying logic and reason and a great deal of analysis in the process. You are open to being influenced but you are an influencer yourself and can show inspiring leadership qualities and commit to a great deal of hard work. You can be quite evasive at times, stubborn and impulsive too: and you do need continual praise and acknowledgment to assuage your sense of self-doubt.'],
  ],
  [
    [1, 5, 1, 'You are likely to come across as quite shy and serious. You are independent, ambitious, flexible and creative, but underneath there is a strong sense of worry and insecurity. To counter this, you will frequently seek the attention and approval of others and meticulously and patiently make plans for the future. There is a lot of strength to see things through but it’s just that you struggle to do it totally independently. You can be bold and quite demanding in your relationships and have a strong sexual desire. This undercurrent of insecurity and dependency means that you are uncomfortable cutting off all relations with ex-partners and you will find your best fit with secure and undemanding Yin Expressions.'],
    [2, 5, 2, 'Steady, stubborn and serious: you are the type of person who pursues your goals with diligence, persistence, hard work and a good deal of assertiveness. As a result, you will overcome most of the obstacles put in your path. There is real tenderness and a desire to help others but perhaps you can give too much, leaving you unable to focus on your own needs. You don’t like to take short cuts but sometimes your meticulous approach means it can take for ever to deal with things. Women will take their role as a mother and a wife very seriously and will want to be in control whilst men need to put aside their pride and be comfortable seeking help and depending on others.'],
    [3, 5, 3, 'One of the strongest Natural Expressions; this is triple Yang and suits the male body well but not so the female. This is an assertive, stubborn, strong- minded Expression, sometimes aggressive, but always bold, determined and demanding. You have lots of ideas and loads of energy and enthusiasm which may well have given you success at an early age. You are impatient and can ‘shoot from the lip’ not really thinking through the impact of your words and the hurt you can sometimes cause. You have a bright, keen, insightful mind but can find it difficult to find common ground with others because of your controlling nature. Just below the surface, there really is a very sensitive person.'],
    [4, 5, 4, 'From the outside, you are self-confident, gentle, trusting and supportive. Inside, there is a powerful core of assertiveness, determination and boldness which only really becomes apparent to friends, family and close work colleagues when the pressure is on. You do have a changeable and sometimes even evasive nature but at heart you are someone with a deep sense of justice and compassion for those less fortunate than yourself. You want to do the right thing and help others and that leads you to the social and caring professions. Your natural empathy and insight coupled with your ability to beat the odds can lead you to a leadership or spokesman type role either formally in a work situation or informally in your local community.'],
    [5, 5, 5, 'Not a lot of grey in this powerful triple Yang Expression. All 5 Expressions need to control but this one does it in spades! You are going to have huge amounts of drive, energy, self-motivation and resolve. You don’t spend too much time considering those you seek to control and are likely to be demanding and assertive towards them. However, people will tend to gravitate towards you for both support and inspiration and you can be generous, magnanimous and caring as long as they don’t cross you! You are direct, bold and intense and you’re probably going to be involved and at the centre of everything! But it can be draining to be so strong and very deep inside there is actually nervousness and insecurity that can cause emotional upheaval.'],
    [6, 5, 6, 'This is a strong and independent triple Yang Expression and so you are likely to be self-assured, strong-willed and ambitious with an easy confidence to comfortably take on leadership roles. You are going to be reliable, direct, well-organised and rational with high moral principles. The flip side to that is being stubborn, pig-headed, overbearing and egotistical. You like positions of high responsibility and need to be in control and if you’re not your sense of pride and importance can really take a hit. You can easily become over-confident (but not be aware of it) and simply dismiss the views and opinions of those around you to your own detriment. There is however, a sort of stylish elegance about you, understated but powerful.'],
    [7, 5, 7, 'It can look like there are three sides to this Expression: on one there is a demanding, assertive and strong willed individual; on another there is a fun-loving, charming and sociable person; and on the third someone who can be hypersensitive, defensive and easily influenced. Whatever is on show at the time, you are someone who doesn’t like to fit in with convention, can keep a cool head when the pressure is on and who usually achieves more doing your own thing rather than being part of a team. There is an air of idealistic innocence about you, which can leave you exposed to being taken for a ride but you have great foresight and the easy ability to put people at ease and be considerate to their views.'],
    [8, 5, 8, 'This is a very strong triple Yang Expression that wants to control and doesn’t want to follow. You are driven, self-motivated and ambitious and have great strength and determination to overcome difficulties and challenges. You have lots of natural, grounded charm and can be a very likeable and attractive. But you can be stubborn, assertive and demanding and at times come across as quite hard and uncommunicative and will hold back your true feelings, although deep inside there is real warmth, passion and kindness. Your enthusiasm and ideas can be very inspiring but as a rule you prefer to be your own person free to move wherever you want to go. You need to be listened to, but you need to listen too, connecting naturally to stable Yin Expressions.'],
    [9, 5, 9, 'This is a bright and brilliant Expression and you are likely to be a person of intuition, vision and ideas. You can show real clarity when taking decisions or giving your opinion and will make them quickly and assertively but sometimes impatiently and impulsively. You can be very strong-willed, bold and demanding and always wanting to be in control. You can make an effective and confident, sometimes overconfident, leader because there is a lot of pride and ego in the mix too. You can be quick to anger which can cause anxiety and resentment and demoralise your followers. You can be a bit flash and showy and over concerned by your appearance which borders on vanity. But you are really pretty sensitive and your confidence depends greatly on recognition and acknowledgement from others.'],
  ],
  [
    [1, 6, 9, 'The 9 Fire in this Expression gives these people a charismatic and flamboyant exterior and you like being at the centre of things. Your social circle tends to be small however, as you have trouble compromising and have clear demarcation lines between those who are ‘with you’ and those ‘against you’. There is a strong sense of pride with this Expression and you take badly to being criticised. You tend to live your life through intuition and instincts and can struggle to communicate and explain your thoughts and motives. Independent and impatient, both men and women can sometimes find settling into relationships and family life difficult.'],
    [2, 6, 1, 'You are the type of person who has a steady, logical and uncomplicated way of living your life. So much so that for many of you it’s a case of “if you can’t do it well, there’s no point doing it at all”. Even though there is great determination in your Natural Expression, there is also a lot of shyness, caution, dependency and insecurity. It may seem paradoxical then that there is great leadership potential where your qualities of thoroughness, prudence, diplomacy and reliability come to the fore. This tends to be a stylish Expression; you may even be a bit of a show-off and there is a strong side of you that is outgoing, excitable and bubbly.'],
    [3, 6, 2, 'From the outside you come across as hardworking, reserved and conservative. On the inside, there is a lot of sensitivity, pride and stubbornness. You’re naturally intuitive and insightful and whilst you can focus your high energy levels on getting the job done, you do find it hard to adapt to different situations or engage with people who aren’t ‘on side’. For men that will manifest as being shy and unapproachable; but women on the other hand are more expressive and can demonstrate leadership potential. You like to help people and are happy to get your hands dirty doing so but you can be a bit of a perfectionist and your directness can be unsettling.'],
    [4, 6, 3, 'Enthusiastic, energetic and expressive, you are outgoing and spontaneous and appear pretty easy going. But inside, there are the stirrings of an emotional storm making you at times impatient and self-indulgent. This can make it hard for you to consider others and because you are so straight-forward, trusting and proud, you can be taken advantage of. When motivated and interested in something, you have high levels of concentration and become very single-minded and enthusiastic. You are probably too self-critical but conversely hate being criticised by others. You have sound judgement but can be inflexible when circumstances change and you are the person for the big project or deal, not so much in the details.'],
    [5, 6, 4, 'Your public persona is usually gentle, unassuming, easy-going and smooth talking. But underneath there is a strong will to plough your own furrow and once hooked on something or someone your focus, strong will and high energy is likely to see your ambition come to a successful conclusion especially if there is a materialistic benefit. Generally, you are helpful and dependable with a wide circle of friends and associates but you expect there to be mutual benefits. Controlling by nature, stubborn and rather inflexible, you can be very self-critical needing everything to be just so. There is a significant emotional side to you but you’re a survivor and if things are not going your way or you lose interest, you will pragmatically move on.'],
    [6, 6, 5, 'A powerful triple Yang Expression and one that would be termed ‘simple’ for a man and ‘complex’ for a woman and that’s because this Expression is about leading rather than following, as your pride and natural assertiveness prevents you comfortably taking orders or accepting alternative ideas. On the outside, you are bold and determined, single-minded and inflexible, but internally a lot more sensitive and cautious than you want to let on. You are self-critical, highly focused, logical, prudent and well-organised and take the view that if the job’s not worth doing well, it’s not worth doing at all. You want to be at the centre of things and in control of it all and that can make you appear domineering and obsessive.'],
    [7, 6, 6, 'There is a dignified style and easy charm about you. You take pride in how you carry yourself and back your own intuition and instincts. You have a confident, logical and straightforward approach to life but your sensitivity and emotions play a large part too. That can affect your leadership potential but your energy, focus and enthusiasm usually sees you achieving your goals and persuading others to follow you. You’re not very flexible though – actually you are pretty stubborn – and can struggle to adapt to changing circumstances. On the surface, you usually come across as sincere, serious and direct but you have real passion and ambition to achieve and realise your high ideals.'],
    [8, 6, 7, 'Hard work is second nature to you and you use your strong will, single-mindedness and energetic enthusiasm to achieve your goals. You come across as easy-going, fun and charming but you are also bold, ambitious, opinionated and very clear and precise (inflexible even) in what you want. The flip-side to your natural intuition is huge sensitivity, especially if you feel you are being criticised, although no one can criticise you better than yourself. You like new adventures and playing hard and you can be rather proud and difficult to get close to, but when you feel comfortable with someone you will show much tenderness and passion. You have an understated but classic style and like to achieve a certain degree of status within your work and social circles.'],
    [9, 6, 8, 'There is a bright but reserved charisma about you; an intuitive and determined person who learns about life by actually living it, rather than by books or through other people. You want to be in control and have leadership responsibilities but your pride and ambition can sometimes border on pomposity. You are naturally intuitive with a very clear thought process and high levels of concentration. You can be inflexible and argumentative and will stubbornly fight your corner, although if things get too messy and difficult, you may well bale out. You are generally pretty easy going but you’re actually quite a perfectionist, who is both cautious and detail-minded. You can be very self-critical and defensive, and take it badly if you feel you are being criticised.'],
  ],
  [
    [1, 7, 8, 'You are hardworking, self-assertive and independent. You are also self-conscious and very sensitive. This can make you appear quiet and rather negative but in actual fact there is much strength and energy at the core of this Expression. At work and in your life generally, you are methodical, direct and detail conscious with a great ability to focus on the matter at hand. You are apt to make definitive decisions which can give you great angst if you spend time reflecting on it. Naturally family orientated, you have a fun and playful side which those close to you will see and love and you have the knack of making people feel welcome and at ease.'],
    [2, 7, 9, 'This is a triple Yin Expression, which sits easily with women, but is more ‘complex’ for men. For both though, you are going to come across as amusing, entertaining, bubbly, open and easy-going, which will make you popular and fun to be around. At work you are likely to be ‘the in influencer’ rather than ‘the leader’ and by nature you are intuitive with a real ability to clarify and simplify the issues. You are also good on the detail and have great organisational ability but you can be impulsive and are definitely impressionable. Both men and women will be drawn to Yang Expressions although you might find their ‘hardness’ difficult to handle in the long term.'],
    [3, 7, 1, 'Internally, there is a lot of strength, energy and a hard-working ethic but externally you can appear shy, quiet, indecisive and cautious. Close friends and family will see another side of you which is funny, engaging, entertaining and playful. You’re going to be good fun to be with although that might spill over into being rather overbearing, but your insecurity and vulnerability is never far from the surface making you very sensitive to criticism, which will easily hurt and upset you. Patient and well-organised, you’re good at coming up with original ideas and concepts and there is a deeply reflective side to you which typically expresses itself in poetry or other types of creative outlets.'],
    [4, 7, 2, 'For men, this triple Yin Expression can be difficult and you are likely to come across as a bit of worrier and preoccupied with the smallest of details. For women, you are very self-assertive and have a very clear and defined view on where you are going in life, especially if it’s family related. For both sexes, you have a tender and gentle nature but you are also self-conscious, emotional and sensitive. This can make you care too much about other peoples’ opinions and react badly if you feel you have been misjudged. Being so powerfully Yin, you need the help and direction of Yang Expressions to help you get started on projects but then your steady and natural organisational ability will see you through.'],
    [5, 7, 3, 'Even though the 5 controlling element is never that far away, you are really quite a sensitive person blessed with a reflective perception about what’s going on with people and how events might affect their life. You can be hasty, impatient and stubborn and if things are not going your way, you are likely to be inappropriately forceful in trying to assert your will and opinions, which will likely cause difficulties in personal and work relationships. But if you do feel in control, you have an inner security that allows you to be great company: witty, expressive, spontaneous and charming. You are usually very energetic and a really good organiser with a good eye for detail but you can be quite materialistic too.'],
    [6, 7, 4, 'As with all 6’s, you have the potential to lead but your Yin numbers (7,4) tempers the controlling and domineering aspects, so you’re likely to come across as gentle, easy-going, magnanimous and considerate. Your close friends and associates will find a witty and fun person to be with but outsiders may see a different side which can be forceful, brash and thoughtless. This is because whilst you can be reflective, you are typically very sensitive and can overreact inappropriately if you feel slighted. You tend to expend a lot of energy and focus when you have settled on a particular plan of action and you can be very effective at politics. There is an easy and comfortable style about you, although at times you can be very self-conscious.'],
    [7, 7, 5, 'You are likely to be the kind of person that has loads of energy, displays enormous self-confidence and works incredibly hard. You are entertaining, funny and sharp, with a lot of natural charm. You can sometimes be a little too detail-conscious for your own good and agonise that you’ve made the right decisions but you’re a great organiser and finisher. You may come across as easy-going and flexible but you need to be in control and to receive lots of praise and attention for your achievements. You have a lot of ‘front’, but behind it lies much sensitivity, nervousness, self-doubt and insecurity; and criticism of any kind can really dent your confidence. You can both talk and listen well and are perceptive and spiritually inclined.'],
    [8, 7, 6, 'Whilst there is a side to you that is most definitely charming, flexible and easy-going, you can also be direct, opinionated and dogmatic. Your admirable honesty can sometimes be too much and appear insensitive, which is ironic as your own high levels of sensitivity play a big part in your own life. You are very self-motivated, logical and have great organisational ability with a fine attention to detail. Couple this with your capacity for hard work and you have the ingredients for real leadership potential but as you hate displaying weakness, your natural assertiveness can easily turn to stubbornness and a reluctance to consider different approaches. You usually like to play a leading role in social and community life.'],
    [9, 7, 7, 'This is a triple Yin Expression, which sits comfortably with women, but is deemed more ‘complex’ for a man. Either way, you’re very likely to be a charismatic person (which can teeter into vanity), who’s easy-going, entertaining, funny and passionate. You’re also pretty sensitive, touchy even, easily affected by what’s going on around you and very defensive if you feel you’re being criticised or mocked. Your excellent organising ability is strategic and shrewd and you have good attention to detail. If matters get difficult or unpleasant, you’re unlikely to stick it for long and will seek an easier and more comfortable route. You take pride in how you look, you’re generous to the people you like and can express yourself clearly and inspire those around you.'],
  ],
  [
    [1, 8, 7, 'Ambitious and hardworking, this Expression comes across as sociable, fun and easy-going but with a strong sense of independence. You do need to have time by yourself and will retreat into your ‘cave’ and whilst there you are likely to be uncommunicative and withdrawn but it is just your way of dealing with life and controlling your sensitive nature. You are easily upset and hate to lose face and so can struggle making decisions. You will look to your partner to help you in this regard as well as them organising your life, just as long as it’s exactly how you want it to be! It’s a sort of independent dependency!'],
    [2, 8, 8, 'You could describe this Natural Expression as wilful and even though that is too simplistic, it’s not that far off . You are serious, bright, ambitious and self-motivated. But at times you are also impulsive and stubborn as well as being dependent and easily in influenced. You sometimes can’t finish what you started or continue to drive forward when you should really change course. You can get really finicky about details, have a rather short temper and can be very direct with your arguments. Generally though you are a supportive, reliable and kind person but a lot more sensitive and shy than you let on and you can let pride and suspicion get in the way of successful relationships.'],
    [3, 8, 9, 'You are a bright, impulsive person and a bit of a show off at times, both in the way you can behave and the clothes you wear: you enjoy the attention and hate not being noticed. You’re an optimistic and spontaneous individual, inspirational at times and with lots of underlying energy and ambition to tackle new projects and get things done. Fundamentally, you’re gentle, responsible and secure in your own skin but you can come across as immature and almost childish at times. is is because you tend to have a young outlook on life but if things are not going your way, you’re likely to retreat into your cave, roll a rock over the entrance and think about what’s happened in silent contemplation.'],
    [4, 8, 1, 'You are ambitious and hard working with a keen and active mind but you can come across as cautious and reserved, rather insecure and indecisive. However, when you are feeling more secure and comfortable, there is a very sociable and outgoing side to you, although sometimes you will resort to low-level manipulation to get what you want. When feeling insecure, you will worry and often try to assuage your anxiety through self-indulgence such as food, shopping or sex. Your single-mindedness can become obsessive and you have difficulty compromising but you are good with money and have a tender and caring heart when you are feeling confident in a loving relationship.'],
    [5, 8, 2, 'You’re going to come across as steady, reliable, serious and fairly reserved. Yes, the 5 controlling, ambitious, materialistic and demanding aspects are there too but there is quite a lot of front here because you are a lot more dependent on others than you care to let on. You’re likely to play a central part in family and community life where they will find you energetic, friendly and helpful. You have a very tenacious and persistent nature (some will say stubborn), which can really help when getting to the heart of matters but can also make you uncommunicative and close-minded if having to consult with others. When you’re feeling secure though, there is a real, almost naïve, charm about you.'],
    [6, 8, 3, 'There is a sort of stylish dignity about this triple Yang Expression and couple that with an outward show of enthusiastic energy and expressive emotions means you are likely to be very popular and socially in demand. You tend to be either ‘on’ or ‘off ’ with not a lot in between; and when you’re ‘off’ you will prefer to hide away and be very private, rather shy and uncommunicative. You believe in high morals and standards and are very considerate and generous to those close to you but likely to ignore those who aren’t. You are direct, have a lot of pride and ambition, and have the ingredients to make an inspiring leader. You can be rash and impatient though and that can have a detrimental effect on achieving your goals.'],
    [7, 8, 4, 'On the face of it, you are sociable, charming and good fun to be with. You have a strong independent streak but can be rather ego-centric and defensive. You have a sharp mind - and sometimes a sharp tongue - but you are a good communicator, listen well and can be pretty perceptive. Your flexibility and strong self-motivation allows you to handle most of what life throws up but you can be quite calculating, weighing up the options for your best advantage. There is a deep pool of sensitivity about you and you can be shy and nervous in situations where you feel uncomfortable preferring to retreat to your cave for reflection. Whilst you can be very obstinate, you’re really a trusting, gentle person and want to help others.'],
    [8, 8, 5, 'This is a very Yang Expression which can be unyielding, single-minded, opinionated and controlling: attributes that are usually associated with the male psyche and so may cause difficulties for females. You have great drive and ambition to achieve your goals with a strong sense of justice and fair play which can tip over into obsession if left unchecked. You tend to be always active and looking for new adventures which can sometimes make it hard to stay satisfied. You can be charming, persuasive, witty and generous but with a degree of naivety that can be taken advantage of leaving you exposed and hurt. You are not always as outgoing and independent as you’d like to let on and need a stable Yin Expression to keep you grounded.'],
    [9, 8, 6, 'Bright, ambitious and dignified, you are honest, sincere and direct; qualities which can take you to leadership roles, especially if that involves fairness, justice and human rights. You also have the potential to be vain, greedy, proud and overbearing. Whilst there is usually a hard exterior on show, there is a soft inside which can manifest as shyness with a desire to retreat into your cave. As with most 9 Expressions, there is great potential for clear and brilliant thinking and shining a light out of difficult situations but there is also an obstinate and self-indulgent streak. You like to have recognition for your achievements and what you do and count money and/ or fame as an indicator of your success.'],
  ],
  [
    [1, 9, 6, 'You like to lead and as a rule you are very good at it! This is because you can combine your natural charisma and creativity with prudence and directness. You make persuasive and convincing speakers although with a tendency to ‘guild the lily’. You can be moody and make snap, thoughtless judgements or labour making decisions to a point of virtual paralysis. You can be rather self-centred and vain but you are a true romantic with great reserves of affection which can truly inspire those around you. You tend to be drawn to well-organised partners who are less self-assertive than you as you are going to be doing the majority of the leading.'],
    [2, 9, 7, 'You are a type of person who prefers going out rather than staying in. A varied social life is important to you especially if it’s underpinned by style, intellect and creativity. However, at times you can be indiscreet, impulsive, moody and self-centred. You are perceptive and able to see behind people’s masks and take a logical and rational view on the situation. As a rule, you are conservative on financial matters but will have bursts of extravagant spending and enjoy showing it off . You make shrewd strategic planners but are not that great at implementing the plans you come up with. You are also a persuasive speaker, especially if there is an audience you want to impress.'],
    [3, 9, 8, 'Ambitious, showy and self-motivated; you are intelligent, hard-working and full of energy. You can also be moody, haughty and vain. Life is a bit of a roller coaster for you, with high highs and low lows and you can flip-flop one way and then another at the drop of a hat: one moment being the star of the show, the next hiding away in your cave. Your ever changing moods can make you impulsive and impatient but at your core is a very sensitive and intuitive person. Money plays a big part in your life and whilst you don’t really come across as greedy, you like to keep hold of it and store it safely away.'],
    [4, 9, 9, 'Whilst this triple Yin Expression hates to be controlled, the truth is you are very dependent on others (especially Yang) for attention, affection, admiration and a call to action. Your usually expressive actions however may not be what you are really feeling and this can make you appear moody, which actually you probably are. You have high powers of persuasion and influence and can see and get to the point of an issue quickly and then clarify it simply for others. But if your advice is not followed you can get easily hurt and upset for you need to be wanted. You are very tactile, warm and affectionate, sensitive too: but stubborn, fickle and impulsive. You are also intuitive and creative but can easily be blown of course.'],
    [5, 9, 1, 'There is a lot of drive and energy here to get what you want out of life, especially if it involves fame and the money and possessions that go with it. The conflict is that you are a lot more shy and indecisive than you want to admit and this struggle between the dreams and the reality can cause difficulties. Whilst you can be rather impulsive, you are persistent and strong-willed with loads of ambition but you do need to be at centre of things to deflect that nagging sense of insecurity you sometimes have. You enjoy your social life where you can display your affectionate and playful nature and you can be very inspiring, creating and effectively delivering presentations and speeches.'],
    [6, 9, 2, 'There is an air of self-confidence, boldness and even daring-do about you and combine that with your persistence and diligence means you are likely to achieve your goals and unlikely to accept second-best. Your social, engaging and easy-going manner can hide real ambition and a strong will, which along with a good dose of impulsiveness will tend to be exposed when you’re under stress. You can be vain and moody and rather self-centred and at times inconsiderate to those around you with the result that the undoubted potential you have for inspiring leadership can be badly dented. This can also affect your decision-making which can become hesitant, inconsistent and sometimes impractical.'],
    [7, 9, 3, 'You’re the sort of person who likes to stand out from the crowd. You’re probably a self-confident extrovert with an engaging and cheerful demeanour who wants to be the centre of attention. You can talk for your country but be very persuasive and inspiring at the same time. But your ‘front’ hides a sensitive and sometimes insecure person, liable to mood swings which at times can be explosive and even aggressive. You hate to be criticised and are vulnerable to flattery. Whilst you are industrious and energetic, you can be pushy and even inconsiderate of others with a degree of impatience that can prevent the completion of projects. You like to break new ground and to receive praise for your achievements.'],
    [8, 9, 4, 'This is an Expression that lends itself to creativity and specialist skills. You can be very single-minded and determined and appear completely comfortable and in charge of any situation. However, you are more than likely to be very moody and changeable allowing your emotions to get the better of you and so appearing both erratic and wilful. To the outside world, and leaving your self-consciousness to one side, you are likely to come across as confident, charming, entertaining and playful, which allows you to have the potential to be an inspirational and persuasive speaker. Whatever else, you are a proud, ambitious and driven individual, who whilst impulsive and indecisive at times, are essentially a kind, gentle and helpful person.'],
    [9, 9, 5, 'You are likely to be entertaining, lively, friendly and generous with an effervescent and empathetic personality. This will make you attractive and socially popular but you can be quite impulsive and moody making it hard for people to know what to expect. You’re also quite controlling, even domineering at times, and like to be the centre of attention. You can be very persuasive and convincing, although your words can actually be rather empty and short of real substance. You have a tendency to be a bit of a show-off and can be quite vain and pretentious with it, but that’s usually hiding your sensitive and sometimes insecure side. You’re good at simplifying complex issues and getting to the salient points but you do need constant reassurance that you’re doing the right things.'],
  ],
];

//
// GLOBALS
//
let genderChosen;
const genderBox = document.getElementById('js-gender-box');

//
// A counter to see how many times the app has been used
//
function increaseUseCounter() {
  if (localStorage.triesLeft) {
    localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
  } else {
    localStorage.triesLeft = 200;
  }
}

//
//  Check how many times the user has calculated a natural expression / mask the screen if too many
//
function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    document.getElementById('natural-expression-generator--mask').style.display = 'block';
  }
}

//
// Output the information to the DOM
//
function outputToDOM(thingsToPrint) {
  document.getElementById('attemps-left').innerHTML = localStorage.triesLeft;
  document.getElementById('results').innerHTML = `
  <p>(Your number of goes using this app are <strong>${localStorage.triesLeft}</strong>)</p>
  <p>Your gender is <strong>${genderChosen}</strong></p>
  <p>Your Expression is <strong>${thingsToPrint.typeOfExpression}</strong></p>
  <p>You are <strong>${thingsToPrint.duality}</strong></p>
  <p>You are a <strong>${thingsToPrint.complexity}</strong> Expression</p>
  <p>Your primary number is <strong>${thingsToPrint.primaryNumber}</strong></p>
  <p>Your second number is <strong>${thingsToPrint.secondNumber}</strong></p>    
  <h3>Your 9-Energy Natural Expression is:</h3>
  <h2><strong>${thingsToPrint.primaryNumber}-${thingsToPrint.secondNumber}-${thingsToPrint.thirdNumber}</strong></h2>
  <p><strong>"${thingsToPrint.text}"</strong></p>`;
}

//
// Translate the actual chosen year to the special Natural Expression year
//
function calculateYear(selectedDates) {
  if ((selectedDates[0].getMonth() === 0) ||
    (selectedDates[0].getMonth() === 1 && selectedDates[0].getDate() < 4)) {
    return selectedDates[0].getFullYear() - 1;
  }
  return selectedDates[0].getFullYear();
}

//
// Read from the data and calculate the results
//
function findPrimaryNumberAndTypeObjectReturn(gender, naturalExpressionYearOfBirth, monthOfBirth) {
  const results = {};

  // find primaryNumber and typeOfExpression
  const includesYearOfBirth = element =>
    element.year.includes(naturalExpressionYearOfBirth);

  if (gender === 'F') {
    results.primaryNumber = (primaryNumberFemales.find(includesYearOfBirth) || {}).number;
    results.typeOfExpression = (primaryNumberFemales.find(includesYearOfBirth) || {}).name;
  } else {
    results.primaryNumber = (primaryNumberMales.find(includesYearOfBirth) || {}).number;
    results.typeOfExpression = (primaryNumberMales.find(includesYearOfBirth) || {}).name;
  }
  // --------------------------------------------------------------------------

  // find secondaryNumber * needs results.primaryNumber created above
  const includesPrimaryNumber = element =>
    element.primary.includes(results.primaryNumber);

  const listOfSecondaryNumbers = (gender === 'F') ?
    (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary :
    (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;

  let monthIndex = monthOfBirth - 1;

  if (monthIndex < 0) {
    monthIndex = listOfSecondaryNumbers.length - 1;
  }

  results.secondNumber = listOfSecondaryNumbers[monthIndex];
  // --------------------------------------------------------------------------

  // Find duality and complexity
  const isPrimaryNumber = element =>
    element.number === results.primaryNumber;

  if (gender === 'F') {
    results.duality = (primaryNumberFemales.find(isPrimaryNumber) || {}).duality;
    results.complexity = (primaryNumberFemales.find(isPrimaryNumber) || {}).complexity;
  } else {
    results.duality = (primaryNumberMales.find(isPrimaryNumber) || {}).duality;
    results.complexity = (primaryNumberMales.find(isPrimaryNumber) || {}).complexity;
  }

  // find third number and text
  let secondNumberIndex = results.secondNumber;
  let primaryNumberIndex = results.primaryNumber;
  secondNumberIndex -= 1;
  primaryNumberIndex -= 1;
  const thirdNumberIndex = 2;
  const textIndex = 3;

  results.thirdNumber = (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[thirdNumberIndex];
  results.text = (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[textIndex];

  return results;
}

//
// Main function to execute all the functions to calculate the results
//
function calculateNaturalExpression(selectedDates) {
  checkGoesLeft();
  const naturalExpressionYearOfBirth = calculateYear(selectedDates);
  const monthOfBirth = selectedDates[0].getMonth();
  const allResults = findPrimaryNumberAndTypeObjectReturn(genderChosen, naturalExpressionYearOfBirth, monthOfBirth);
  increaseUseCounter();
  outputToDOM(allResults);
}


//
// Run flatpickr onChange which has its own event handler
//
const fp = flatpickr$1('#flatpickr', {
  onChange(selectedDates) {
    if (genderChosen !== undefined) {
      calculateNaturalExpression(selectedDates);
    }
  },
});

//
// When the user clicks the box to change gender this function is executed
//
function toggleGenderBox() {
  switch (genderChosen) {
    case undefined:
      genderChosen = 'M';
      genderBox.textContent = 'Male';
      genderBox.classList.add('natural-expression-generator__gender-box--color-male');
      break;
    case 'M':
      genderChosen = 'F';
      genderBox.textContent = 'Female';
      genderBox.classList.remove('natural-expression-generator__gender-box--color-male');
      genderBox.classList.add('natural-expression-generator__gender-box--color-female');
      break;
    case 'F':
      genderChosen = 'M';
      genderBox.textContent = 'Male';
      genderBox.classList.remove('natural-expression-generator__gender-box--color-female');
      genderBox.classList.add('natural-expression-generator__gender-box--color-male');
      break;
    default:
      break;
  }
  if (fp.selectedDates.length > 0) {
    calculateNaturalExpression(fp.selectedDates);
  }
}

//
// add event listeners
//
genderBox.addEventListener('click', toggleGenderBox, false);

checkGoesLeft();
//# sourceMappingURL=bundle.js.map
