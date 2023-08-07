(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp.graph"] = factory();
	else
		root["pnp.graph"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return graphInvokableFactory; });
/* unused harmony export _GraphQueryable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _GraphQueryableCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GraphQueryableCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _GraphQueryableInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GraphQueryableInstance; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _behaviors_consistency_level_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _behaviors_paged_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);




const graphInvokableFactory = (f) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* queryableFactory */ "v"])(f);
};
/**
 * Queryable Base Class
 *
 */
class _GraphQueryable extends _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* Queryable */ "h"] {
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param base A string or Queryable that should form the base part of the url
     *
     */
    constructor(base, path) {
        super(base, path);
        if (typeof base === "string") {
            this.parentUrl = base;
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__[/* isArray */ "m"])(base)) {
            this.parentUrl = base[0].toUrl();
        }
        else {
            this.parentUrl = base.toUrl();
        }
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        if (selects.length > 0) {
            this.query.set("$select", selects.join(","));
        }
        return this;
    }
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands) {
        if (expands.length > 0) {
            this.query.set("$expand", expands.join(","));
        }
        return this;
    }
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    getParent(factory, base = this.parentUrl, path) {
        if (typeof base === "string") {
            // we need to ensure the parent has observers, even if we are rebasing the url (#2435)
            base = [this, base];
        }
        return new factory(base, path);
    }
}
const GraphQueryable = graphInvokableFactory(_GraphQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class _GraphQueryableCollection extends _GraphQueryable {
    /**
     *
     * @param filter The string representing the filter query
     */
    filter(filter) {
        this.query.set("$filter", filter);
        return this;
    }
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy, ascending = true) {
        var _a;
        const o = "$orderby";
        const query = ((_a = this.query.get(o)) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
        query.push(`${orderBy} ${ascending ? "asc" : "desc"}`);
        this.query.set(o, query.join(","));
        return this;
    }
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top) {
        this.query.set("$top", top.toString());
        return this;
    }
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    skip(num) {
        this.query.set("$skip", num.toString());
        return this;
    }
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    search(query) {
        this.using(Object(_behaviors_consistency_level_js__WEBPACK_IMPORTED_MODULE_2__[/* ConsistencyLevel */ "a"])());
        this.query.set("$search", query);
        return this;
    }
    /**
     * 	To request second and subsequent pages of Graph data
     */
    skipToken(token) {
        this.query.set("$skiptoken", token);
        return this;
    }
    /**
     * 	Retrieves the total count of matching resources
     *  If the resource doesn't support count, this value will always be zero
     */
    async count() {
        const q = Object(_behaviors_paged_js__WEBPACK_IMPORTED_MODULE_3__[/* AsPaged */ "a"])(this);
        const r = await q.top(1)();
        return r.count;
    }
    /**
     * Allows reading through a collection as pages of information whose size is determined by top or the api method's default
     *
     * @returns an object containing results, the ability to determine if there are more results, and request the next page of results
     */
    paged() {
        return Object(_behaviors_paged_js__WEBPACK_IMPORTED_MODULE_3__[/* AsPaged */ "a"])(this)();
    }
}
const GraphQueryableCollection = graphInvokableFactory(_GraphQueryableCollection);
/**
 * Represents an instance that can be selected
 *
 */
class _GraphQueryableInstance extends _GraphQueryable {
}
const GraphQueryableInstance = graphInvokableFactory(_GraphQueryableInstance);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "k", function() { return /* reexport */ addProp; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* reexport */ get; });
__webpack_require__.d(__webpack_exports__, "t", function() { return /* reexport */ post; });
__webpack_require__.d(__webpack_exports__, "u", function() { return /* reexport */ put; });
__webpack_require__.d(__webpack_exports__, "s", function() { return /* reexport */ patch; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* reexport */ del; });
__webpack_require__.d(__webpack_exports__, "q", function() { return /* reexport */ op; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* reexport */ queryable_Queryable; });
__webpack_require__.d(__webpack_exports__, "v", function() { return /* reexport */ queryableFactory; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* reexport */ body; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* reexport */ headers; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ BrowserFetchWithRetry; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ CacheNever; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* reexport */ InjectHeaders; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ DefaultParse; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ BlobParse; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ BufferParse; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ HeaderParse; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* reexport */ errorCheck; });
__webpack_require__.d(__webpack_exports__, "r", function() { return /* reexport */ parseODataJSON; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* reexport */ ResolveOnData; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* reexport */ RejectOnError; });

// UNUSED EXPORTS: invokable, BearerToken, BrowserFetch, CacheAlways, CacheKey, Caching, bindCachingCore, CachingPessimisticRefresh, asCancelableScope, cancelableScope, Cancelable, CancelAction, TextParse, JSONParse, JSONHeaderParse, parseBinderWithErrorCheck, HttpRequestError, Timeout

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/add-prop.js
/**
 * Adds a property to a target instance
 *
 * @param target The object to whose prototype we will add a property
 * @param name Property name
 * @param factory Factory method used to produce the property value
 * @param path Any additional path required to produce the value
 */
function addProp(target, name, factory, path) {
    Reflect.defineProperty(target.prototype, name, {
        configurable: true,
        enumerable: true,
        get: function () {
            return factory(this, path || name);
        },
    });
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/operations.js
function ensureInit(method, init = { headers: {} }) {
    return { method, ...init, headers: { ...init.headers } };
}
function get(init) {
    return this.start(ensureInit("GET", init));
}
function post(init) {
    return this.start(ensureInit("POST", init));
}
function put(init) {
    return this.start(ensureInit("PUT", init));
}
function patch(init) {
    return this.start(ensureInit("PATCH", init));
}
function del(init) {
    return this.start(ensureInit("DELETE", init));
}
function op(q, operation, init) {
    return Reflect.apply(operation, q, [init]);
}

// EXTERNAL MODULE: ./node_modules/@pnp/core/index.js + 7 modules
var core = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/invokable.js


/**
 * Allows a decorated object to be invoked as a function, optionally providing an implementation for that action
 *
 * @param invokeableAction Optional. The logic to execute upon invoking the object as a function.
 * @returns Decorator which applies the invokable logic to the tagged class
 */
function invokable(invokeableAction) {
    if (!Object(core["n" /* isFunc */])(invokeableAction)) {
        invokeableAction = function (init) {
            return op(this, get, init);
        };
    }
    return (target) => {
        return new Proxy(target, {
            construct(clz, args, newTarget) {
                const invokableInstance = Object.assign(function (init) {
                    // the "this" for our invoked object will be set by extendable OR we use invokableInstance directly
                    const localThis = typeof this === "undefined" ? invokableInstance : this;
                    return Reflect.apply(invokeableAction, localThis, [init]);
                }, Reflect.construct(clz, args, newTarget));
                Reflect.setPrototypeOf(invokableInstance, newTarget.prototype);
                return invokableInstance;
            },
        });
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/node_modules/tslib/tslib.es6.js
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/queryable.js



const DefaultMoments = {
    construct: Object(core["q" /* lifecycle */])(),
    pre: Object(core["d" /* asyncReduce */])(),
    auth: Object(core["d" /* asyncReduce */])(),
    send: Object(core["u" /* request */])(),
    parse: Object(core["d" /* asyncReduce */])(),
    post: Object(core["d" /* asyncReduce */])(),
    data: Object(core["e" /* broadcast */])(),
};
let queryable_Queryable = class Queryable extends core["b" /* Timeline */] {
    constructor(init, path) {
        super(DefaultMoments);
        // these keys represent internal events for Queryable, users are not expected to
        // subscribe directly to these, rather they enable functionality within Queryable
        // they are Symbols such that there are NOT cloned between queryables as we only grab string keys (by design)
        this.InternalResolve = Symbol.for("Queryable_Resolve");
        this.InternalReject = Symbol.for("Queryable_Reject");
        this.InternalPromise = Symbol.for("Queryable_Promise");
        this._query = new URLSearchParams();
        // add an intneral moment with specific implementaion for promise creation
        this.moments[this.InternalPromise] = Object(core["t" /* reduce */])();
        let parent;
        if (typeof init === "string") {
            this._url = Object(core["f" /* combine */])(init, path);
        }
        else if (Object(core["m" /* isArray */])(init)) {
            if (init.length !== 2) {
                throw Error("When using the tuple param exactly two arguments are expected.");
            }
            if (typeof init[1] !== "string") {
                throw Error("Expected second tuple param to be a string.");
            }
            parent = init[0];
            this._url = Object(core["f" /* combine */])(init[1], path);
        }
        else {
            parent = init;
            this._url = Object(core["f" /* combine */])(parent._url, path);
        }
        if (typeof parent !== "undefined") {
            this.observers = parent.observers;
            this._inheritingObservers = true;
        }
    }
    /**
     * Directly concatenates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatenate to the url
     */
    concat(pathPart) {
        this._url += pathPart;
        return this;
    }
    /**
     * Gets the full url with query information
     *
     */
    toRequestUrl() {
        let url = this.toUrl();
        const query = this.query.toString();
        if (!Object(core["v" /* stringIsNullOrEmpty */])(query)) {
            url += `${url.indexOf("?") > -1 ? "&" : "?"}${query}`;
        }
        return url;
    }
    /**
     * Querystring key, value pairs which will be included in the request
     */
    get query() {
        return this._query;
    }
    /**
     * Gets the current url
     *
     */
    toUrl() {
        return this._url;
    }
    execute(userInit) {
        // if there are NO observers registered this is likely either a bug in the library or a user error, direct to docs
        if (Reflect.ownKeys(this.observers).length < 1) {
            throw Error("No observers registered for this request. (https://pnp.github.io/pnpjs/queryable/queryable#no-observers-registered-for-this-request)");
        }
        // schedule the execution after we return the promise below in the next event loop
        setTimeout(async () => {
            const requestId = Object(core["j" /* getGUID */])();
            let requestUrl;
            const log = (msg, level) => {
                // this allows us to easily and consistently format our messages
                this.log(`[${requestId}] ${msg}`, level);
            };
            try {
                log("Beginning request", 0);
                // include the request id in the headers to assist with debugging against logs
                const initSeed = {
                    ...userInit,
                    headers: { ...userInit.headers, "X-PnPjs-RequestId": requestId },
                };
                // eslint-disable-next-line prefer-const
                let [url, init, result] = await this.emit.pre(this.toRequestUrl(), initSeed, undefined);
                log(`Url: ${url}`, 1);
                if (typeof result !== "undefined") {
                    log("Result returned from pre, Emitting data");
                    this.emit.data(result);
                    log("Emitted data");
                    return;
                }
                log("Emitting auth");
                [requestUrl, init] = await this.emit.auth(new URL(url), init);
                log("Emitted auth");
                // we always resepect user supplied init over observer modified init
                init = { ...init, ...userInit, headers: { ...init.headers, ...userInit.headers } };
                log("Emitting send");
                let response = await this.emit.send(requestUrl, init);
                log("Emitted send");
                log("Emitting parse");
                [requestUrl, response, result] = await this.emit.parse(requestUrl, response, result);
                log("Emitted parse");
                log("Emitting post");
                [requestUrl, result] = await this.emit.post(requestUrl, result);
                log("Emitted post");
                log("Emitting data");
                this.emit.data(result);
                log("Emitted data");
            }
            catch (e) {
                log(`Emitting error: "${e.message || e}"`, 3);
                // anything that throws we emit and continue
                this.error(e);
                log("Emitted error", 3);
            }
            finally {
                log("Finished request", 0);
            }
        }, 0);
        // this is the promise that the calling code will recieve and await
        let promise = new Promise((resolve, reject) => {
            // we overwrite any pre-existing internal events as a
            // given queryable only processes a single request at a time
            this.on[this.InternalResolve].replace(resolve);
            this.on[this.InternalReject].replace(reject);
        });
        // this allows us to internally hook the promise creation and modify it. This was introduced to allow for
        // cancelable to work as envisioned, but may have other users. Meant for internal use in the library accessed via behaviors.
        [promise] = this.emit[this.InternalPromise](promise);
        return promise;
    }
};
queryable_Queryable = __decorate([
    Object(core["i" /* extendable */])(),
    invokable()
], queryable_Queryable);


// CONCATENATED MODULE: ./node_modules/@pnp/queryable/queryable-factory.js
function queryableFactory(constructor) {
    return (init, path) => {
        // construct the concrete instance
        const instance = new constructor(init, path);
        // we emit the construct event from the factory because we need all of the decorators and constructors
        // to have fully finished before we emit, which is now true. We type the instance to any to get around
        // the protected nature of emit
        instance.emit.construct(init, path);
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/request-builders.js

/**
 * takes the supplied object of type U, JSON.stringify's it, and sets it as the value of a "body" property
 */
function body(o, previous) {
    return Object.assign({ body: Object(core["p" /* jsS */])(o) }, previous);
}
/**
 * Adds headers to an new/existing RequestInit
 *
 * @param o Headers to add
 * @param previous Any previous partial RequestInit
 * @returns RequestInit combining previous and specified headers
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function headers(o, previous) {
    return Object.assign({}, previous, { headers: { ...previous === null || previous === void 0 ? void 0 : previous.headers, ...o } });
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/inject-headers.js
function InjectHeaders(headers, prepend = false) {
    return (instance) => {
        const f = async function (url, init, result) {
            init.headers = { ...init.headers, ...headers };
            return [url, init, result];
        };
        if (prepend) {
            instance.on.pre.prepend(f);
        }
        else {
            instance.on.pre(f);
        }
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/bearer-token.js

function BearerToken(token) {
    return (instance) => {
        instance.using(InjectHeaders({
            "Authorization": `Bearer ${token}`,
        }));
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/parsers.js


function DefaultParse() {
    return parseBinderWithErrorCheck(async (response) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0) || response.status === 204) {
            return {};
        }
        // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
        const txt = await response.text();
        const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
        return parseODataJSON(json);
    });
}
function TextParse() {
    return parseBinderWithErrorCheck(r => r.text());
}
function BlobParse() {
    return parseBinderWithErrorCheck(r => r.blob());
}
function JSONParse() {
    return parseBinderWithErrorCheck(r => r.json());
}
function BufferParse() {
    return parseBinderWithErrorCheck(r => Object(core["n" /* isFunc */])(r.arrayBuffer) ? r.arrayBuffer() : r.buffer());
}
function HeaderParse() {
    return parseBinderWithErrorCheck(async (r) => r.headers);
}
function JSONHeaderParse() {
    return parseBinderWithErrorCheck(async (response) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0) || response.status === 204) {
            return {};
        }
        // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
        const txt = await response.text();
        const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
        const all = { data: { ...parseODataJSON(json) }, headers: { ...response.headers } };
        return all;
    });
}
async function errorCheck(url, response, result) {
    if (!response.ok) {
        throw await HttpRequestError.init(response);
    }
    return [url, response, result];
}
function parseODataJSON(json) {
    let result = json;
    if (Object(core["l" /* hOP */])(json, "d")) {
        if (Object(core["l" /* hOP */])(json.d, "results")) {
            result = json.d.results;
        }
        else {
            result = json.d;
        }
    }
    else if (Object(core["l" /* hOP */])(json, "value")) {
        result = json.value;
    }
    return result;
}
/**
 * Provides a clean way to create new parse bindings without having to duplicate a lot of boilerplate
 * Includes errorCheck ahead of the supplied impl
 *
 * @param impl Method used to parse the response
 * @returns Queryable behavior binding function
 */
function parseBinderWithErrorCheck(impl) {
    return (instance) => {
        // we clear anything else registered for parse
        // add error check
        // add the impl function we are supplied
        instance.on.parse.replace(errorCheck);
        instance.on.parse(async (url, response, result) => {
            if (response.ok && typeof result === "undefined") {
                result = await impl(response);
            }
            return [url, response, result];
        });
        return instance;
    };
}
class HttpRequestError extends Error {
    constructor(message, response, status = response.status, statusText = response.statusText) {
        super(message);
        this.response = response;
        this.status = status;
        this.statusText = statusText;
        this.isHttpRequestError = true;
    }
    static async init(r) {
        const t = await r.clone().text();
        return new HttpRequestError(`Error making HttpClient request in queryable [${r.status}] ${r.statusText} ::> ${t}`, r);
    }
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/browser-fetch.js


function BrowserFetch(props) {
    const { replace } = {
        replace: true,
        ...props,
    };
    return (instance) => {
        if (replace) {
            instance.on.send.clear();
        }
        instance.on.send(function (url, init) {
            this.log(`Fetch: ${init.method} ${url.toString()}`, 0);
            return fetch(url.toString(), init);
        });
        return instance;
    };
}
function BrowserFetchWithRetry(props) {
    const { interval, replace, retries } = {
        replace: true,
        interval: 200,
        retries: 3,
        ...props,
    };
    return (instance) => {
        if (replace) {
            instance.on.send.clear();
        }
        instance.on.send(function (url, init) {
            let response;
            let wait = interval;
            let count = 0;
            let lastErr;
            const retry = async () => {
                // if we've tried too many times, throw
                if (count >= retries) {
                    throw lastErr || new HttpRequestError(`Retry count exceeded (${retries}) for this request. ${response.status}: ${response.statusText};`, response);
                }
                count++;
                if (typeof response === "undefined" || (response === null || response === void 0 ? void 0 : response.status) === 429 || (response === null || response === void 0 ? void 0 : response.status) === 503 || (response === null || response === void 0 ? void 0 : response.status) === 504) {
                    // this is our first try and response isn't defined yet
                    // we have been throttled OR http status code 503 or 504, we can retry this
                    if (typeof response !== "undefined") {
                        // this isn't our first try so we need to calculate delay
                        if (response.headers.has("Retry-After")) {
                            // if we have gotten a header, use that value as the delay value in seconds
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            wait = parseInt(response.headers.get("Retry-After"), 10) * 1000;
                        }
                        else {
                            // Increment our counters.
                            wait *= 2;
                        }
                        this.log(`Attempt #${count} to retry request which failed with ${response.status}: ${response.statusText}`, 0);
                        await Object(core["h" /* delay */])(wait);
                    }
                    try {
                        const u = url.toString();
                        this.log(`Fetch: ${init.method} ${u}`, 0);
                        response = await fetch(u, init);
                        // if we got a good response, return it, otherwise see if we can retry
                        return response.ok ? response : retry();
                    }
                    catch (err) {
                        if (/AbortError/.test(err.name)) {
                            // don't retry aborted requests
                            throw err;
                        }
                        // if there is no network the response is undefined and err is all we have
                        // so we grab the err and save it to throw if we exceed the number of retries
                        // #2226 first reported this
                        lastErr = err;
                        return retry();
                    }
                }
                else {
                    return response;
                }
            };
            // this the the first call to retry that starts the cycle
            // response is undefined and the other values have their defaults
            return retry();
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/caching.js

/**
 * Behavior that forces caching for the request regardless of "method"
 *
 * @returns TimelinePipe
 */
function CacheAlways() {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheAlways": "1" };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Behavior that blocks caching for the request regardless of "method"
 *
 * Note: If both Caching and CacheAlways are present AND CacheNever is present the request will not be cached
 * as we give priority to the CacheNever case
 *
 * @returns TimelinePipe
 */
function CacheNever() {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheNever": "1" };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Behavior that allows you to specify a cache key for a request
 *
 * @param key The key to use for caching
  */
function CacheKey(key) {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheKey": key };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Adds caching to the requests based on the supplied props
 *
 * @param props Optional props that configure how caching will work
 * @returns TimelinePipe used to configure requests
 */
function Caching(props) {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            const [shouldCache, getCachedValue, setCachedValue] = bindCachingCore(url, init, props);
            // only cache get requested data or where the CacheAlways header is present (allows caching of POST requests)
            if (shouldCache) {
                const cached = getCachedValue();
                // we need to ensure that result stays "undefined" unless we mean to set null as the result
                if (cached === null) {
                    // if we don't have a cached result we need to get it after the request is sent and parsed
                    this.on.post(Object(core["r" /* noInherit */])(async function (url, result) {
                        setCachedValue(result);
                        return [url, result];
                    }));
                }
                else {
                    result = cached;
                }
            }
            return [url, init, result];
        });
        return instance;
    };
}
const storage = new core["a" /* PnPClientStorage */]();
/**
 * Based on the supplied properties, creates bound logic encapsulating common caching configuration
 * sharable across implementations to more easily provide consistent behavior across behaviors
 *
 * @param props Any caching props used to initialize the core functions
 */
function bindCachingCore(url, init, props) {
    var _a, _b;
    const { store, keyFactory, expireFunc } = {
        store: "local",
        keyFactory: (url) => Object(core["k" /* getHashCode */])(url.toLowerCase()).toString(),
        expireFunc: () => Object(core["g" /* dateAdd */])(new Date(), "minute", 5),
        ...props,
    };
    const s = store === "session" ? storage.session : storage.local;
    const key = (init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheKey"]) ? init.headers["X-PnP-CacheKey"] : keyFactory(url);
    return [
        // calculated value indicating if we should cache this request
        (/get/i.test(init.method) || ((_a = init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheAlways"]) !== null && _a !== void 0 ? _a : false)) && !((_b = init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheNever"]) !== null && _b !== void 0 ? _b : false),
        // gets the cached value
        () => s.get(key),
        // sets the cached value
        (value) => s.put(key, value, expireFunc(url)),
    ];
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/caching-pessimistic.js



/**
 * Pessimistic Caching Behavior
 * Always returns the cached value if one exists but asynchronously executes the call and updates the cache.
 * If a expireFunc is included then the cache update only happens if the cache has expired.
 *
 * @param store Use local or session storage
 * @param keyFactory: a function that returns the key for the cache value, if not provided a default hash of the url will be used
 * @param expireFunc: a function that returns a date of expiration for the cache value, if not provided the cache never expires but is always updated.
 */
function CachingPessimisticRefresh(props) {
    return (instance) => {
        const pre = async function (url, init, result) {
            const [shouldCache, getCachedValue, setCachedValue] = bindCachingCore(url, init, props);
            if (!shouldCache) {
                return [url, init, result];
            }
            const cached = getCachedValue();
            if (Object(core["s" /* objectDefinedNotNull */])(cached)) {
                // set our result
                result = cached;
                setTimeout(async () => {
                    const q = new queryable_Queryable(this);
                    const a = q.on.pre.toArray();
                    q.on.pre.clear();
                    // filter out this pre handler from the original queryable as we don't want to re-run it
                    a.filter(v => v !== pre).map(v => q.on.pre(v));
                    // in this case the init should contain the correct "method"
                    const value = await q(init);
                    setCachedValue(value);
                }, 0);
            }
            else {
                // register the post handler to cache the value as there is not one already in the cache
                // and we need to run this request as normal
                this.on.post(Object(core["r" /* noInherit */])(async function (url, result) {
                    setCachedValue(result);
                    return [url, result];
                }));
            }
            return [url, init, result];
        };
        instance.on.pre(pre);
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/cancelable.js

/**
 * Cancelable is a fairly complex behavior as there is a lot to consider through multiple timelines. We have
 * two main cases:
 *
 * 1. basic method that is a single call and returns the result of an operation (return spPost(...))
 * 2. complex method that has multiple async calls within
 *
 * 1. For basic calls the cancel info is attached in init as it is only involved within a single request.
 *    This works because there is only one request and the cancel logic doesn't need to persist across
 *    inheriting instances. Also, many of these requests are so fast canceling is likely unnecessary
 *
 * 2. Complex method present a larger challenge because they are comprised of > 1 request and the promise
 *    that is actually returned to the user is not directly from one of our calls. This promise is the
 *    one "created" by the language when you await. For complex methods we have two things that solve these
 *    needs.
 *
 *    The first is the use of either the cancelableScope decorator or the asCancelableScope method
 *    wrapper. These create an upper level cancel info that is then shared across the child requests within
 *    the complex method. Meaning if I do a files.addChunked the same cancel info (and cancel method)
 *    are set on the current "this" which is user object on which the method was called. This info is then
 *    passed down to any child requests using the original "this" as a base using the construct moment.
 *
 *    The CancelAction behavior is used to apply additional actions to a request once it is canceled. For example
 *    in the case of uploading files chunked in sp we cancel the upload by id.
 */
// this is a special moment used to broadcast when a request is canceled
const MomentName = "__CancelMoment__";
// this value is used to track cancel state and the value is represetented by IScopeInfo
const ScopeId = Symbol.for("CancelScopeId");
// module map of all currently tracked cancel scopes
const cancelScopes = new Map();
/**
 * This method is bound to a scope id and used as the cancel method exposed to the user via cancelable promise
 *
 * @param this unused, the current promise
 * @param scopeId Id bound at creation time
 */
async function cancelPrimitive(scopeId) {
    const scope = cancelScopes.get(scopeId);
    scope.controller.abort();
    if (Object(core["m" /* isArray */])(scope === null || scope === void 0 ? void 0 : scope.actions)) {
        scope.actions.map(action => scope.currentSelf.on[MomentName](action));
    }
    try {
        await scope.currentSelf.emit[MomentName]();
    }
    catch (e) {
        scope.currentSelf.log(`Error in cancel: ${e}`, 3);
    }
}
/**
 * Creates a new scope id, sets it on the instance's ScopeId property, and adds the info to the map
 *
 * @returns the new scope id (GUID)
 */
function createScope(instance) {
    const id = Object(core["j" /* getGUID */])();
    instance[ScopeId] = id;
    cancelScopes.set(id, {
        cancel: cancelPrimitive.bind({}, id),
        actions: [],
        controller: null,
        currentSelf: instance,
    });
    return id;
}
/**
 * Function wrapper that turns the supplied function into a cancellation scope
 *
 * @param func Func to wrap
 * @returns The same func signature, wrapped with our cancel scoping logic
 */
const asCancelableScope = (func) => {
    return function (...args) {
        // ensure we have setup "this" to cancel
        // 1. for single requests the value is set in the behavior's init observer
        // 2. for complex requests the value is set here
        if (!Reflect.has(this, ScopeId)) {
            createScope(this);
        }
        // execute the original function, but don't await it
        const result = func.apply(this, args).finally(() => {
            // remove any cancel scope values tied to this instance
            cancelScopes.delete(this[ScopeId]);
            delete this[ScopeId];
        });
        // ensure the synthetic promise from a complex method has a cancel method
        result.cancel = cancelScopes.get(this[ScopeId]).cancel;
        return result;
    };
};
/**
 * Decorator used to mark multi-step methods to ensure all subrequests are properly cancelled
 */
function cancelableScope(_target, _propertyKey, descriptor) {
    // wrapping the original method
    descriptor.value = asCancelableScope(descriptor.value);
}
/**
 * Allows requests to be canceled by the caller by adding a cancel method to the Promise returned by the library
 *
 * @returns Timeline pipe to setup canelability
 */
function Cancelable() {
    if (!AbortController) {
        throw Error("The current environment appears to not support AbortController, please include a suitable polyfill.");
    }
    return (instance) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance.on.construct(function (init, path) {
            if (typeof init !== "string") {
                const parent = Object(core["m" /* isArray */])(init) ? init[0] : init;
                if (Reflect.has(parent, ScopeId)) {
                    // ensure we carry over the scope id to the new instance from the parent
                    this[ScopeId] = parent[ScopeId];
                }
                // define the moment's implementation
                this.moments[MomentName] = Object(core["c" /* asyncBroadcast */])();
            }
        });
        // init our queryable to support cancellation
        instance.on.init(function () {
            if (!Reflect.has(this, ScopeId)) {
                // ensure we have setup "this" to cancel
                // 1. for single requests this will set the value
                // 2. for complex requests the value is set in asCancelableScope
                const id = createScope(this);
                // if we are creating the scope here, we have not created it within asCancelableScope
                // meaning the finally handler there will not delete the tracked scope reference
                this.on.dispose(() => {
                    cancelScopes.delete(id);
                });
            }
            this.on[this.InternalPromise]((promise) => {
                // when a new promise is created add a cancel method
                promise.cancel = cancelScopes.get(this[ScopeId]).cancel;
                return [promise];
            });
        });
        instance.on.pre(async function (url, init, result) {
            // grab the current scope, update the controller and currentSelf
            const existingScope = cancelScopes.get(this[ScopeId]);
            // if we are here without a scope we are likely running a CancelAction request so we just ignore canceling
            if (Object(core["s" /* objectDefinedNotNull */])(existingScope)) {
                const controller = new AbortController();
                existingScope.controller = controller;
                existingScope.currentSelf = this;
                if (init.signal) {
                    // we do our best to hook our logic to the existing signal
                    init.signal.addEventListener("abort", () => {
                        existingScope.cancel();
                    });
                }
                else {
                    init.signal = controller.signal;
                }
            }
            return [url, init, result];
        });
        // clean up any cancel info from the object after the request lifecycle is complete
        instance.on.dispose(function () {
            delete this[ScopeId];
            delete this.moments[MomentName];
        });
        return instance;
    };
}
/**
 * Allows you to define an action that is run when a request is cancelled
 *
 * @param action The action to run
 * @returns A timeline pipe used in the request lifecycle
 */
function CancelAction(action) {
    return (instance) => {
        instance.on.pre(async function (...args) {
            const existingScope = cancelScopes.get(this[ScopeId]);
            // if we don't have a scope this request is not using Cancelable so we do nothing
            if (Object(core["s" /* objectDefinedNotNull */])(existingScope)) {
                if (!Object(core["m" /* isArray */])(existingScope.actions)) {
                    existingScope.actions = [];
                }
                if (existingScope.actions.indexOf(action) < 0) {
                    existingScope.actions.push(action);
                }
            }
            return args;
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/timeout.js
/**
 * Behavior that will cause a timeout in the request after the specified milliseconds
 *
 * @param timeout Number of milliseconds to set the timeout
 */
function Timeout(timeout) {
    return (instance) => {
        instance.on.pre(async (url, init, result) => {
            const controller = new AbortController();
            init.signal = controller.signal;
            setTimeout(() => controller.abort(), timeout);
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/behaviors/resolvers.js
function ResolveOnData() {
    return (instance) => {
        instance.on.data(function (data) {
            this.emit[this.InternalResolve](data);
        });
        return instance;
    };
}
function RejectOnError() {
    return (instance) => {
        instance.on.error(function (err) {
            this.emit[this.InternalReject](err);
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/index.js






/**
 * Behavior exports
 */











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return deleteable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deleteableWithETag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return updateableWithETag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getById; });
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


/**
 * Decorator used to specify the default path for Queryable objects
 *
 * @param path
 */
function defaultPath(path) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(args[0], args.length > 1 && args[1] !== undefined ? args[1] : path);
            }
        };
    };
}
/**
 * Adds the delete method to the tagged class
 */
function deleteable() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            delete() {
                return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__[/* graphDelete */ "a"])(this);
            }
        };
    };
}
/**
 * Adds the delete method to the tagged class
 */
function deleteableWithETag() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            delete(eTag = "*") {
                return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__[/* graphDelete */ "a"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* headers */ "p"])({
                    "If-Match": eTag,
                }));
            }
        };
    };
}
/**
 * Adds the update method to the tagged class
 */
function updateable() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            update(props) {
                return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__[/* graphPatch */ "c"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* body */ "l"])(props));
            }
        };
    };
}
/**
 * Adds the update method to the tagged class
 */
function updateableWithETag() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            update(props, eTag = "*") {
                return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__[/* graphPatch */ "c"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* body */ "l"])(props, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* headers */ "p"])({
                    "If-Match": eTag,
                })));
            }
        };
    };
}
/**
 * Adds the add method to the tagged class
 */
function addable() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            add(props) {
                return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__[/* graphPost */ "d"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* body */ "l"])(props));
            }
        };
    };
}
/**
 * Adds the getById method to a collection
 */
function getById(factory) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            getById(id) {
                return factory(this, id);
            }
        };
    };
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __decorate; });
/* unused harmony export __param */
/* unused harmony export __esDecorate */
/* unused harmony export __runInitializers */
/* unused harmony export __propKey */
/* unused harmony export __setFunctionName */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __createBinding */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __spreadArrays */
/* unused harmony export __spreadArray */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/* unused harmony export __classPrivateFieldGet */
/* unused harmony export __classPrivateFieldSet */
/* unused harmony export __classPrivateFieldIn */
/* unused harmony export __addDisposableResource */
/* unused harmony export __disposeResources */
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

/* unused harmony default export */ var _unused_webpack_default_export = ({
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return graphGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return graphPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return graphDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return graphPatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return graphPut; });
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

const graphGet = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* op */ "q"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* get */ "o"], init);
};
const graphPost = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* op */ "q"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* post */ "t"], init);
};
const graphDelete = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* op */ "q"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* del */ "m"], init);
};
const graphPatch = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* op */ "q"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* patch */ "s"], init);
};
const graphPut = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* op */ "q"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__[/* put */ "u"], init);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ PnPClientStorage; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* reexport */ dateAdd; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ combine; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* reexport */ getGUID; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* reexport */ isFunc; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* reexport */ isArray; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* reexport */ isUrlAbsolute; });
__webpack_require__.d(__webpack_exports__, "v", function() { return /* reexport */ stringIsNullOrEmpty; });
__webpack_require__.d(__webpack_exports__, "s", function() { return /* reexport */ objectDefinedNotNull; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* reexport */ jsS; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* reexport */ hOP; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* reexport */ getHashCode; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* reexport */ delay; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ broadcast; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ asyncBroadcast; });
__webpack_require__.d(__webpack_exports__, "t", function() { return /* reexport */ reduce; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ asyncReduce; });
__webpack_require__.d(__webpack_exports__, "u", function() { return /* reexport */ request; });
__webpack_require__.d(__webpack_exports__, "q", function() { return /* reexport */ lifecycle; });
__webpack_require__.d(__webpack_exports__, "r", function() { return /* reexport */ noInherit; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ timeline_Timeline; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* reexport */ extendable; });

// UNUSED EXPORTS: PnPClientStorageWrapper, getRandomString, once, cloneObserverCollection, extend, extendFactory, disableExtensions, enableExtensions, AssignFrom, CopyFrom

// CONCATENATED MODULE: ./node_modules/@pnp/core/util.js
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
function dateAdd(date, interval, units) {
    let ret = new Date(date.toString()); // don't change original date
    switch (interval.toLowerCase()) {
        case "year":
            ret.setFullYear(ret.getFullYear() + units);
            break;
        case "quarter":
            ret.setMonth(ret.getMonth() + 3 * units);
            break;
        case "month":
            ret.setMonth(ret.getMonth() + units);
            break;
        case "week":
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case "day":
            ret.setDate(ret.getDate() + units);
            break;
        case "hour":
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case "minute":
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case "second":
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default:
            ret = undefined;
            break;
    }
    return ret;
}
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
function combine(...paths) {
    return paths
        .filter(path => !stringIsNullOrEmpty(path))
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(path => path.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
        .join("/")
        .replace(/\\/g, "/");
}
/**
 * Gets a random string of chars length
 *
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @param chars The length of the random string to generate
 */
function getRandomString(chars) {
    const text = new Array(chars);
    for (let i = 0; i < chars; i++) {
        text[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
    }
    return text.join("");
}
/**
 * Gets a random GUID value
 *
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
/* eslint-disable no-bitwise */
function getGUID() {
    let d = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
/* eslint-enable no-bitwise */
/**
 * Determines if a given value is a function
 *
 * @param f The thing to test for functionness
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunc(f) {
    return typeof f === "function";
}
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/
function isArray(array) {
    return Array.isArray(array);
}
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */
function isUrlAbsolute(url) {
    return /^https?:\/\/|^\/\//i.test(url);
}
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */
function stringIsNullOrEmpty(s) {
    return typeof s === "undefined" || s === null || s.length < 1;
}
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
function objectDefinedNotNull(obj) {
    return typeof obj !== "undefined" && obj !== null;
}
/**
 * Shorthand for JSON.stringify
 *
 * @param o Any type of object
 */
function jsS(o) {
    return JSON.stringify(o);
}
/**
 * Shorthand for Object.hasOwnProperty
 *
 * @param o Object to check for
 * @param p Name of the property
 */
function hOP(o, p) {
    return Object.hasOwnProperty.call(o, p);
}
/**
 * Generates a ~unique hash code
 *
 * From: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
/* eslint-disable no-bitwise */
function getHashCode(s) {
    let hash = 0;
    if (s.length === 0) {
        return hash;
    }
    for (let i = 0; i < s.length; i++) {
        const chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
/* eslint-enable no-bitwise */
/**
 * Waits a specified number of milliseconds before resolving
 *
 * @param ms Number of ms to wait
 */
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/storage.js

let storageShim;
function getStorageShim() {
    if (typeof storageShim === "undefined") {
        storageShim = new MemoryStorage();
    }
    return storageShim;
}
/**
 * A wrapper class to provide a consistent interface to browser based storage
 *
 */
class storage_PnPClientStorageWrapper {
    /**
     * Creates a new instance of the PnPClientStorageWrapper class
     *
     * @constructor
     */
    constructor(store) {
        this.store = store;
        this.enabled = this.test();
    }
    /**
     * Get a value from storage, or null if that value does not exist
     *
     * @param key The key whose value we want to retrieve
     */
    get(key) {
        if (!this.enabled) {
            return null;
        }
        const o = this.store.getItem(key);
        if (!objectDefinedNotNull(o)) {
            return null;
        }
        const persistable = JSON.parse(o);
        if (new Date(persistable.expiration) <= new Date()) {
            this.delete(key);
            return null;
        }
        else {
            return persistable.value;
        }
    }
    /**
     * Adds a value to the underlying storage
     *
     * @param key The key to use when storing the provided value
     * @param o The value to store
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    put(key, o, expire) {
        if (this.enabled) {
            this.store.setItem(key, this.createPersistable(o, expire));
        }
    }
    /**
     * Deletes a value from the underlying storage
     *
     * @param key The key of the pair we want to remove from storage
     */
    delete(key) {
        if (this.enabled) {
            this.store.removeItem(key);
        }
    }
    /**
     * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
     *
     * @param key The key to use when storing the provided value
     * @param getter A function which will upon execution provide the desired value
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    async getOrPut(key, getter, expire) {
        if (!this.enabled) {
            return getter();
        }
        let o = this.get(key);
        if (o === null) {
            o = await getter();
            this.put(key, o, expire);
        }
        return o;
    }
    /**
     * Deletes any expired items placed in the store by the pnp library, leaves other items untouched
     */
    async deleteExpired() {
        if (!this.enabled) {
            return;
        }
        for (let i = 0; i < this.store.length; i++) {
            const key = this.store.key(i);
            if (key !== null) {
                // test the stored item to see if we stored it
                if (/["|']?pnp["|']? ?: ?1/i.test(this.store.getItem(key))) {
                    // get those items as get will delete from cache if they are expired
                    await this.get(key);
                }
            }
        }
    }
    /**
     * Used to determine if the wrapped storage is available currently
     */
    test() {
        const str = "t";
        try {
            this.store.setItem(str, str);
            this.store.removeItem(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Creates the persistable to store
     */
    createPersistable(o, expire) {
        if (expire === undefined) {
            expire = dateAdd(new Date(), "minute", 5);
        }
        return jsS({ pnp: 1, expiration: expire, value: o });
    }
}
/**
 * A thin implementation of in-memory storage for use in nodejs
 */
class MemoryStorage {
    constructor(_store = new Map()) {
        this._store = _store;
    }
    get length() {
        return this._store.size;
    }
    clear() {
        this._store.clear();
    }
    getItem(key) {
        return this._store.get(key);
    }
    key(index) {
        return Array.from(this._store)[index][0];
    }
    removeItem(key) {
        this._store.delete(key);
    }
    setItem(key, data) {
        this._store.set(key, data);
    }
}
/**
 * A class that will establish wrappers for both local and session storage, substituting basic memory storage for nodejs
 */
class PnPClientStorage {
    /**
     * Creates a new instance of the PnPClientStorage class
     *
     * @constructor
     */
    constructor(_local = null, _session = null) {
        this._local = _local;
        this._session = _session;
    }
    /**
     * Provides access to the local storage of the browser
     */
    get local() {
        if (this._local === null) {
            this._local = new storage_PnPClientStorageWrapper(typeof localStorage === "undefined" ? getStorageShim() : localStorage);
        }
        return this._local;
    }
    /**
     * Provides access to the session storage of the browser
     */
    get session() {
        if (this._session === null) {
            this._session = new storage_PnPClientStorageWrapper(typeof sessionStorage === "undefined" ? getStorageShim() : sessionStorage);
        }
        return this._session;
    }
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/moments.js

/**
 * Emits to all registered observers the supplied arguments. Any values returned by the observers are ignored
 *
 * @returns void
 */
function broadcast() {
    return function (observers, ...args) {
        const obs = [...observers];
        for (let i = 0; i < obs.length; i++) {
            Reflect.apply(obs[i], this, args);
        }
    };
}
/**
 * Defines a moment that executes each observer asynchronously in parallel awaiting all promises to resolve or reject before continuing
 *
 * @returns The final set of arguments
 */
function asyncBroadcast() {
    return async function (observers, ...args) {
        // get our initial values
        const r = args;
        const obs = [...observers];
        const promises = [];
        for (let i = 0; i < obs.length; i++) {
            promises.push(Reflect.apply(obs[i], this, r));
        }
        return Promise.all(promises);
    };
}
/**
 * Defines a moment that executes each observer synchronously, passing the returned arguments as the arguments to the next observer.
 * This is very much like the redux pattern taking the arguments as the state which each observer may modify then returning a new state
 *
 * @returns The final set of arguments
 */
function reduce() {
    return function (observers, ...args) {
        const obs = [...observers];
        return obs.reduce((params, func) => Reflect.apply(func, this, params), args);
    };
}
/**
 * Defines a moment that executes each observer asynchronously, awaiting the result and passes the returned arguments as the arguments to the next observer.
 * This is very much like the redux pattern taking the arguments as the state which each observer may modify then returning a new state
 *
 * @returns The final set of arguments
 */
function asyncReduce() {
    return async function (observers, ...args) {
        const obs = [...observers];
        return obs.reduce((prom, func) => prom.then((params) => Reflect.apply(func, this, params)), Promise.resolve(args));
    };
}
/**
 * Defines a moment where the first registered observer is used to asynchronously execute a request, returning a single result
 * If no result is returned (undefined) no further action is taken and the result will be undefined (i.e. additional observers are not used)
 *
 * @returns The result returned by the first registered observer
 */
function request() {
    return async function (observers, ...args) {
        if (!isArray(observers) || observers.length < 1) {
            return undefined;
        }
        const handler = observers[0];
        return Reflect.apply(handler, this, args);
    };
}
/**
 * Defines a special moment used to configure the timeline itself before starting. Each observer is executed in order,
 * possibly modifying the "this" instance, with the final product returned
 *
 */
function lifecycle() {
    return function (observers, ...args) {
        const obs = [...observers];
        // process each handler which updates our instance in order
        // very similar to asyncReduce but the state is the object itself
        for (let i = 0; i < obs.length; i++) {
            Reflect.apply(obs[i], this, args);
        }
        return this;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/timeline.js


/**
 * Field name to hold any flags on observer functions used to modify their behavior
 */
const flags = Symbol.for("ObserverLifecycleFlags");
/**
 * Bitwise flags to indicate modified behavior
 */
var ObserverLifecycleFlags;
(function (ObserverLifecycleFlags) {
    // eslint-disable-next-line no-bitwise
    ObserverLifecycleFlags[ObserverLifecycleFlags["noInherit"] = 1] = "noInherit";
    // eslint-disable-next-line no-bitwise
    ObserverLifecycleFlags[ObserverLifecycleFlags["once"] = 2] = "once";
})(ObserverLifecycleFlags || (ObserverLifecycleFlags = {}));
/**
 * Creates a filter function for use in Array.filter that will filter OUT any observers with the specified [flag]
 *
 * @param flag The flag used to exclude observers
 * @returns An Array.filter function
 */
// eslint-disable-next-line no-bitwise
const byFlag = (flag) => ((observer) => !((observer[flags] || 0) & flag));
/**
 * Creates an observer lifecycle modification flag application function
 * @param flag The flag to the bound function should add
 * @returns A function that can be used to apply [flag] to any valid observer
 */
const addFlag = (flag) => ((observer) => {
    // eslint-disable-next-line no-bitwise
    observer[flags] = (observer[flags] || 0) | flag;
    return observer;
});
/**
 * Observer lifecycle modifier that indicates this observer should NOT be inherited by any child
 * timelines.
 */
const noInherit = addFlag(1 /* noInherit */);
/**
 * Observer lifecycle modifier that indicates this observer should only fire once per instance, it is then removed.
 *
 * Note: If you have a parent and child timeline "once" will affect both and the observer will fire once for a parent lifecycle
 * and once for a child lifecycle
 */
const once = addFlag(2 /* once */);
/**
 * Timeline represents a set of operations executed in order of definition,
 * with each moment's behavior controlled by the implementing function
 */
class timeline_Timeline {
    /**
     * Creates a new instance of Timeline with the supplied moments and optionally any observers to include
     *
     * @param moments The moment object defining this timeline
     * @param observers Any observers to include (optional)
     */
    constructor(moments, observers = {}) {
        this.moments = moments;
        this.observers = observers;
        this._onProxy = null;
        this._emitProxy = null;
        this._inheritingObservers = true;
    }
    /**
     * Apply the supplied behavior(s) to this timeline
     *
     * @param behaviors One or more behaviors
     * @returns `this` Timeline
     */
    using(...behaviors) {
        for (let i = 0; i < behaviors.length; i++) {
            behaviors[i](this);
        }
        return this;
    }
    /**
     * Property allowing access to manage observers on moments within this timeline
     */
    get on() {
        if (this._onProxy === null) {
            this._onProxy = new Proxy(this, {
                get: (target, p) => Object.assign((handler) => {
                    target.cloneObserversOnChange();
                    addObserver(target.observers, p, handler, "add");
                    return target;
                }, {
                    toArray: () => {
                        return Reflect.has(target.observers, p) ? [...Reflect.get(target.observers, p)] : [];
                    },
                    replace: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, "replace");
                        return target;
                    },
                    prepend: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, "prepend");
                        return target;
                    },
                    clear: () => {
                        if (Reflect.has(target.observers, p)) {
                            target.cloneObserversOnChange();
                            // we trust ourselves that this will be an array
                            target.observers[p].length = 0;
                            return true;
                        }
                        return false;
                    },
                }),
            });
        }
        return this._onProxy;
    }
    /**
     * Shorthand method to emit a logging event tied to this timeline
     *
     * @param message The message to log
     * @param level The level at which the message applies
     */
    log(message, level = 0) {
        this.emit.log(message, level);
    }
    /**
     * Shorthand method to emit an error event tied to this timeline
     *
     * @param e Optional. Any error object to emit. If none is provided no emit occurs
     */
    error(e) {
        if (objectDefinedNotNull(e)) {
            this.emit.error(e);
        }
    }
    /**
     * Property allowing access to invoke a moment from within this timeline
     */
    get emit() {
        if (this._emitProxy === null) {
            this._emitProxy = new Proxy(this, {
                get: (target, p) => (...args) => {
                    // handle the case where no observers registered for the target moment
                    const observers = Reflect.has(target.observers, p) ? Reflect.get(target.observers, p) : [];
                    if ((!isArray(observers) || observers.length < 1) && p === "error") {
                        // if we are emitting an error, and no error observers are defined, we throw
                        throw Error(`Unhandled Exception: ${args[0]}`);
                    }
                    try {
                        // default to broadcasting any events without specific impl (will apply to log and error)
                        const moment = Reflect.has(target.moments, p) ? Reflect.get(target.moments, p) : p === "init" || p === "dispose" ? lifecycle() : broadcast();
                        // pass control to the individual moment's implementation
                        return Reflect.apply(moment, target, [observers, ...args]);
                    }
                    catch (e) {
                        if (p !== "error") {
                            this.error(e);
                        }
                        else {
                            // if all else fails, re-throw as we are getting errors from error observers meaning something is sideways
                            throw e;
                        }
                    }
                    finally {
                        // here we need to remove any "once" observers
                        if (observers && observers.length > 0) {
                            Reflect.set(target.observers, p, observers.filter(byFlag(2 /* once */)));
                        }
                    }
                },
            });
        }
        return this._emitProxy;
    }
    /**
     * Starts a timeline
     *
     * @description This method first emits "init" to allow for any needed initial conditions then calls execute with any supplied init
     *
     * @param init A value passed into the execute logic from the initiator of the timeline
     * @returns The result of this.execute
     */
    start(init) {
        // initialize our timeline
        this.emit.init();
        // get a ref to the promise returned by execute
        const p = this.execute(init);
        // attach our dispose logic
        p.finally(() => {
            try {
                // provide an opportunity for cleanup of the timeline
                this.emit.dispose();
            }
            catch (e) {
                // shouldn't happen, but possible dispose throws - which may be missed as the usercode await will have resolved.
                const e2 = Object.assign(Error("Error in dispose."), {
                    innerException: e,
                });
                this.error(e2);
            }
        }).catch(() => void (0));
        // give the promise back to the caller
        return p;
    }
    /**
     * By default a timeline references the same observer collection as a parent timeline,
     * if any changes are made to the observers this method first clones them ensuring we
     * maintain a local copy and de-ref the parent
     */
    cloneObserversOnChange() {
        if (this._inheritingObservers) {
            this._inheritingObservers = false;
            this.observers = cloneObserverCollection(this.observers);
        }
    }
}
/**
 * Adds an observer to a given target
 *
 * @param target The object to which events are registered
 * @param moment The name of the moment to which the observer is registered
 * @param addBehavior Determines how the observer is added to the collection
 *
 */
function addObserver(target, moment, observer, addBehavior) {
    if (!isFunc(observer)) {
        throw Error("Observers must be functions.");
    }
    if (!Reflect.has(target, moment)) {
        // if we don't have a registration for this moment, then we just add a new prop
        target[moment] = [observer];
    }
    else {
        // if we have an existing property then we follow the specified behavior
        switch (addBehavior) {
            case "add":
                target[moment].push(observer);
                break;
            case "prepend":
                target[moment].unshift(observer);
                break;
            case "replace":
                target[moment].length = 0;
                target[moment].push(observer);
                break;
        }
    }
    return target[moment];
}
function cloneObserverCollection(source) {
    return Reflect.ownKeys(source).reduce((clone, key) => {
        // eslint-disable-next-line no-bitwise
        clone[key] = [...source[key].filter(byFlag(1 /* noInherit */))];
        return clone;
    }, {});
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/extendable.js

let _enableExtensions = false;
const ObjExtensionsSym = Symbol.for("PnPExt");
const factoryExtensions = new Map();
/**
 * Decorator factory wrapping any tagged class in the extension proxy, enabling the use of object extensions
 *
 * @description MUST be applied last (i.e. be the first decorator in the list top to bottom applied to a class)
 *
 * @returns Decorator implementation
 */
function extendable() {
    return (target) => {
        return new Proxy(target, {
            construct(clz, args, newTarget) {
                let r = Reflect.construct(clz, args, newTarget);
                // this block handles the factory function extensions by picking
                // them off the factory and applying them to the created object
                const proto = Reflect.getPrototypeOf(target);
                if (Reflect.has(proto, ObjExtensionsSym)) {
                    const extensions = factoryExtensions.get(Reflect.get(proto, ObjExtensionsSym));
                    if (extensions) {
                        r = extend(r, extensions);
                    }
                }
                const proxied = new Proxy(r, {
                    apply: (target, _thisArg, argArray) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("apply", (...a) => Reflect.apply(...a), target, proxied, argArray);
                    },
                    get: (target, p, receiver) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("get", (...a) => Reflect.get(...a), target, p, receiver);
                    },
                    has: (target, p) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("has", (...a) => Reflect.has(...a), target, p);
                    },
                    set: (target, p, value, receiver) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("set", (...a) => Reflect.set(...a), target, p, value, receiver);
                    },
                });
                return proxied;
            },
        });
    };
}
/**
 * Applies the supplied extensions to a single instance
 *
 * @param target Object to which extensions are applied
 * @param extensions Extensions to apply
 */
function extend(target, extensions) {
    _enableExtensions = true;
    if (!Reflect.has(target, ObjExtensionsSym)) {
        Reflect.defineProperty(target, ObjExtensionsSym, {
            writable: true,
            value: [],
        });
    }
    extendCol(Reflect.get(target, ObjExtensionsSym), extensions);
    return target;
}
/**
 * Allows applying extensions to all instances created from the supplied factory
 *
 * @param factory The Invokable Factory method to extend
 * @param extensions Extensions to apply
 */
function extendFactory(factory, extensions) {
    _enableExtensions = true;
    // factoryExtensions
    const proto = Reflect.getPrototypeOf(factory);
    if (proto) {
        if (!Reflect.has(proto, ObjExtensionsSym)) {
            Reflect.defineProperty(proto, ObjExtensionsSym, {
                value: getGUID(),
            });
        }
        const key = proto[ObjExtensionsSym];
        if (!factoryExtensions.has(key)) {
            factoryExtensions.set(key, []);
        }
        extendCol(factoryExtensions.get(key), extensions);
    }
}
function extendCol(a, e) {
    if (isArray(e)) {
        a.push(...e);
    }
    else {
        a.push(e);
    }
}
/**
 * Disables all extensions
 */
const disableExtensions = () => {
    _enableExtensions = false;
};
/**
 * Enables all extensions
 */
const enableExtensions = () => {
    _enableExtensions = true;
};
/**
 * Executes the extended functionality if present, or the default action
 *
 * @param op Current operation type
 * @param or The default non-extended functionality
 * @param target The current "this" to which the current call applies
 * @param rest Any arguments required for the called method
 * @returns Whatever the underlying extension or method returns
 */
function extensionOrDefault(op, or, target, ...rest) {
    if (_enableExtensions && Reflect.has(target, ObjExtensionsSym)) {
        const extensions = [...Reflect.get(target, ObjExtensionsSym)];
        let result = undefined;
        for (let i = 0; i < extensions.length; i++) {
            const extension = extensions[i];
            if (isFunc(extension)) {
                // this extension is a function which we call
                result = extension(op, target, ...rest);
            }
            else if (op === "get" && Reflect.has(extension, rest[0])) {
                // this extension is a named extension meaning we are adding/overriding a specific method/property
                result = Reflect.get(extension, rest[0], target);
            }
            else if (Reflect.has(extension, op)) {
                // this extension is a ProxyHandler that has a handler defined for {op} so we pass control and see if we get a result
                result = Reflect.get(extension, op)(target, ...rest);
            }
            if (typeof result !== "undefined") {
                // if a extension returned a result, we return that
                // this means that this extension overrides any other extensions and no more are executed
                // first extension in the list to return "wins"
                return result;
            }
        }
    }
    return or(target, ...rest);
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/behaviors/assign-from.js
/**
 * Behavior that will assign a ref to the source's observers and reset the instance's inheriting flag
 *
 * @param source The source instance from which we will assign the observers
 */
function AssignFrom(source) {
    return (instance) => {
        instance.observers = source.observers;
        instance._inheritingObservers = true;
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/behaviors/copy-from.js


/**
 * Behavior that will copy all the observers in the source timeline and apply it to the incoming instance
 *
 * @param source The source instance from which we will copy the observers
 * @param behavior replace = observers are cleared before adding, append preserves any observers already present
 * @param filter If provided filters the moments from which the observers are copied. It should return true for each moment to include.
 * @returns The mutated this
 */
function CopyFrom(source, behavior = "append", filter) {
    return (instance) => {
        return Reflect.apply(copyObservers, instance, [source, behavior, filter]);
    };
}
/**
 * Function with implied this allows us to access protected members
 *
 * @param this The timeline whose observers we will copy
 * @param source The source instance from which we will copy the observers
 * @param behavior replace = observers are cleared before adding, append preserves any observers already present
 * @returns The mutated this
 */
function copyObservers(source, behavior, filter) {
    if (!objectDefinedNotNull(source) || !objectDefinedNotNull(source.observers)) {
        return this;
    }
    if (!isFunc(filter)) {
        filter = () => true;
    }
    const clonedSource = cloneObserverCollection(source.observers);
    const keys = Object.keys(clonedSource).filter(filter);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const on = this.on[key];
        if (behavior === "replace") {
            on.clear();
        }
        const momentObservers = clonedSource[key];
        momentObservers.forEach(v => on(v));
    }
    return this;
}

// CONCATENATED MODULE: ./node_modules/@pnp/core/index.js





/**
 * Behavior exports
 */




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _Drive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Drive; });
/* unused harmony export _Drives */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Drives; });
/* unused harmony export _Root */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _DriveItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DriveItem; });
/* unused harmony export _DriveItems */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DriveItems; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var _funcs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _behaviors_paged_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);








/**
 * Describes a Drive instance
 *
 */
let _Drive = class _Drive extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* _GraphQueryableInstance */ "e"] {
    /**
     * Method for retrieving the root folder of a drive.
     * @returns IRoot
     */
    get root() {
        return Root(this);
    }
    /**
     * Method for retrieving the related list resource, for use with SharePoint drives.
     * @returns IGraphQueryableInstance
     */
    get list() {
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableInstance */ "c"])(this, "list");
    }
    /**
     * Method for retrieving recently accessed drive items by the user.
     * @returns IDriveItems
     */
    get recent() {
        return DriveItems(this, "recent");
    }
    /**
     * Method for retrieving drive items shared with the user.
     * @param options - ISharingWithMeOptions (Optional)
     * @returns IDriveItems
     */
    async sharedWithMe(options = null) {
        const q = DriveItems(this, "sharedWithMe");
        if ((options === null || options === void 0 ? void 0 : options.allowExternal) != null) {
            q.query.set("allowexternal", options === null || options === void 0 ? void 0 : options.allowExternal.toString());
        }
        return q();
    }
    /**
     * Method for retrieving a drive item by id.
     * @param id - string - the drive item id to retrieve
     * @returns IDriveItem
     */
    getItemById(id) {
        return DriveItem(this, Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("items", id));
    }
    /**
     * Method for retrieving drive items the user is following.
     * @returns IDriveItems
     */
    get following() {
        return DriveItems(this, "following");
    }
    /**
     * Get DriveItems by Path
     * @param path string, partial path to folder must not contain a leading or trailing "/" e.g. folderA/folderB/folderC
     * @returns IDriveItems
     */
    getItemsByPath(path) {
        return DriveItems(this, Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("root:/", `${path}:/children`));
    }
    /**
     * Get DriveItem by Path
     * @param path string, partial path to folder must not contain a leading or trailing "/" e.g. folderA/folderB/fileName.txt
     * @returns IDriveItems
     */
    getItemByPath(path) {
        return DriveItem(this, Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("root:/", `${path}:`));
    }
};
_Drive = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* defaultPath */ "b"])("drive")
], _Drive);

const Drive = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* graphInvokableFactory */ "f"])(_Drive);
/**
 * Describes a collection of Drive objects
 *
 */
let _Drives = class _Drives extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* _GraphQueryableCollection */ "d"] {
};
_Drives = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* defaultPath */ "b"])("drives"),
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* getById */ "e"])(Drive)
], _Drives);

const Drives = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* graphInvokableFactory */ "f"])(_Drives);
/**
 * Describes a Root instance
 *
 */
let _Root = class _Root extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* _GraphQueryableInstance */ "e"] {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children() {
        return DriveItems(this, "children");
    }
    /**
     * Search drive for items matching the query
     * @param query string, search parameter
     * @returns IGraphQueryableCollection
     */
    search(query) {
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, `search(q='${query}')`);
    }
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphQueryableCollection
     */
    get thumbnails() {
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, "thumbnails");
    }
    /**
     * Get changes since optional change token
     * @param token - string (Optional)
     * change token
     * @returns IDeltaItems
     */
    delta(token) {
        const path = `delta${(token) ? `(token=${token})` : ""}`;
        const query = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, path);
        query.on.parse.replace(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* errorCheck */ "n"]);
        query.on.parse(async (url, response, result) => {
            const json = await response.json();
            const nextLink = json["@odata.nextLink"];
            const deltaLink = json["@odata.deltaLink"];
            result = {
                next: () => (nextLink ? Object(_behaviors_paged_js__WEBPACK_IMPORTED_MODULE_7__[/* AsPaged */ "a"])(Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])([this, nextLink]))() : null),
                delta: () => (deltaLink ? Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])([query, deltaLink])() : null),
                values: json.value,
            };
            return [url, response, result];
        });
        return query;
    }
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions
     * @param content - any
     * @param filePathName - string (Optional)
     * e.g. myfile.txt or myfolder/myfile.txt, unneeded for updates
     * @param contentType - string (Optional)
     * e.g. "application/json; charset=utf-8" for JSON files
     * @returns IDriveItem
     */
    async upload(fileOptions) {
        return Reflect.apply(_funcs_js__WEBPACK_IMPORTED_MODULE_6__[/* driveItemUpload */ "c"], this, [fileOptions]);
    }
};
_Root = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* defaultPath */ "b"])("root")
], _Root);

const Root = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* graphInvokableFactory */ "f"])(_Root);
/**
 * Describes a Drive Item instance
 *
 */
let _DriveItem = class _DriveItem extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* _GraphQueryableInstance */ "e"] {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children() {
        return DriveItems(this, "children");
    }
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphQueryableCollection
     */
    get thumbnails() {
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, "thumbnails");
    }
    /**
     * Method for retrieving the versions of a drive item.
     * @returns IDriveItemVersionInfo
     */
    get versions() {
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, "versions");
    }
    /**
     * Method for moving a drive item
     * @param parentReference - { id: string} - reference to destination folder drive item
     * @param name - string - name of the file in the destination
     * @deprecated (v3.11.0) use `moveItem`
     */
    move(parentReference, name) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPatch */ "c"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])({ name, ...parentReference }));
    }
    /**
     * Method for moving a file to a new location and/or name.
     * @param moveOptions - IItemOptions object
     * @returns string - the URL where the new file is located
     */
    async moveItem(moveOptions) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPatch */ "c"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])(moveOptions));
    }
    /**
     * Method for retrieving the contents of a drive item.
     * @returns Blob
     */
    async getContent() {
        const info = await this();
        const query = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryable */ "a"])([this, info["@microsoft.graph.downloadUrl"]], null)
            .using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* BlobParse */ "a"])())
            .using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* CacheNever */ "d"])());
        query.on.pre(async (url, init, result) => {
            init.responseType = "arraybuffer";
            return [url, init, result];
        });
        return query();
    }
    /**
     * Method for setting the contents of a IDriveItem
     * @param content - any - content to upload to the drive item
     * @returns - { id: string; name: string; size: number }
     * @deprecated (v3.11.0) use `upload`
     */
    setContent(content) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPut */ "e"])(DriveItem(this, "content"), {
            body: content,
        });
    }
    /**
     * Method for copying a file to a new location and/or name.
     * @param copyOptions - IItemOptions
     * @returns string, the URL where the new file is located
     */
    async copyItem(copyOptions) {
        const creator = DriveItem(this, "copy").using((instance) => {
            instance.on.parse(async (url, response, result) => {
                result = response.headers.has("location") ? response.headers : response;
                return [url, response, result];
            });
            return instance;
        });
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPost */ "d"])(creator, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])(copyOptions));
        let result = null;
        if (data.has("location")) {
            result = data.get("location");
        }
        return result;
    }
    /**
     * Method for converting the format of a drive item.
     * @param format - string - "pdf" is only option
     * @returns Blob - content of the converted file
     */
    async convertContent(format) {
        const query = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryable */ "a"])(this, `content?format=${format}`)
            .using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* BlobParse */ "a"])())
            .using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* CacheNever */ "d"])());
        query.on.pre(async (url, init, result) => {
            init.responseType = "arraybuffer";
            return [url, init, result];
        });
        return query();
    }
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions object
     * @param content - any
     * @param filePathName - string (Optional)
     * e.g. myfile.txt or myfolder/myfile.txt, unneeded for updates
     * @param contentType - string (Optional)
     * e.g. "application/json; charset=utf-8" for JSON files
     * @returns IDriveItem
     */
    async upload(fileOptions) {
        return Reflect.apply(_funcs_js__WEBPACK_IMPORTED_MODULE_6__[/* driveItemUpload */ "c"], this, [fileOptions]);
    }
    // TODO: Upload Session for large files
    // public uploadSession(fileOptions: IFileOptions): Promise<void> {
    // }
    /**
     * Method for getting a temporary preview image of a drive item.
     * @param previewOptions - IPreviewOptions (Optional)
     * @returns IDriveItemPreviewInfo
     */
    async preview(previewOptions) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPost */ "d"])(DriveItem(this, "preview"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])(previewOptions));
    }
    /**
     * Method for getting item analytics. Defaults to lastSevenDays.
     * @param analyticsOptions - IAnalyticsOptions (Optional)
     * @returns IGraphQueryableCollection<IItemAnalytics>
     */
    analytics(analyticsOptions) {
        const query = `analytics/${analyticsOptions ? analyticsOptions.timeRange : "lastSevenDays"}`;
        return Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* GraphQueryableCollection */ "b"])(this, query);
    }
};
_DriveItem = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* deleteable */ "c"])(),
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* updateable */ "f"])()
], _DriveItem);

const DriveItem = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* graphInvokableFactory */ "f"])(_DriveItem);
/**
 * Describes a collection of Drive Item objects
 *
 */
let _DriveItems = class _DriveItems extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* _GraphQueryableCollection */ "d"] {
    /**
     * Adds a file to this collection of drive items.
     * For more upload options please see the .upload method on DriveItem and Root.
     * @param filename - string - name of new file
     * @param content - string - contents of file
     * @param contentType - string - content type for header - default to "application/json"
     * @returns IDriveItemAddResult - result with file data and chainable drive item object
     */
    async add(filename, content, contentType = "application/json") {
        const postBody = {
            name: filename,
            file: {},
            "@microsoft.graph.conflictBehavior": "rename",
        };
        const driveItem = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPost */ "d"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])(postBody));
        const q = DriveItem([this, `${Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("drives", driveItem.parentReference.driveId, "items", driveItem.id)}`], "content");
        q.using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* InjectHeaders */ "g"])({
            "Content-Type": contentType,
        }));
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPut */ "e"])(q, { body: content });
        return {
            data,
            driveItem: DriveItem([this, `${Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("drives", driveItem.parentReference.driveId, "items", driveItem.id)}`]),
        };
    }
    /**
     * Adds a folder to this collection of drive items.
     * @param name - string, name of new folder
     * @param driveItem - DriveItem (Optional) - override default drive item properties
     * @returns IDriveItemAddResult - result with folder data and chainable drive item object
     */
    async addFolder(name, driveItem) {
        let postBody = {
            name,
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename",
        };
        if (driveItem) {
            if (driveItem.name == null) {
                driveItem.name = name;
            }
            if (driveItem["@microsoft.graph.conflictBehavior"] == null) {
                driveItem["@microsoft.graph.conflictBehavior"] = "rename";
            }
            postBody = driveItem;
        }
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__[/* graphPost */ "d"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_4__[/* body */ "l"])(postBody));
        return {
            data,
            driveItem: DriveItem([this, `${Object(_pnp_core__WEBPACK_IMPORTED_MODULE_2__[/* combine */ "f"])("drives", data.parentReference.driveId, "items", data.id)}`]),
        };
    }
};
_DriveItems = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__[/* getById */ "e"])(DriveItem)
], _DriveItems);

const DriveItems = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_1__[/* graphInvokableFactory */ "f"])(_DriveItems);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsPaged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Paged; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _consistency_level_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




/**
 * Configures a collection query to returned paged results
 *
 * @param col Collection forming the basis of the paged collection, this param is NOT modified
 * @returns A duplicate collection which will return paged results
 */
function AsPaged(col, supportsCount = false) {
    const q = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* GraphQueryableCollection */ "b"])(col).using(Paged(supportsCount), Object(_consistency_level_js__WEBPACK_IMPORTED_MODULE_3__[/* ConsistencyLevel */ "a"])());
    const queryParams = ["$search", "$top", "$select", "$expand", "$filter", "$orderby"];
    if (supportsCount) {
        // we might be constructing our query with a next url that will already contain $count so we need
        // to ensure we don't add it again, likewise if it is already in our query collection we don't add it again
        if (!q.query.has("$count") && !/\$count=true/i.test(q.toUrl())) {
            q.query.set("$count", "true");
        }
        queryParams.push("$count");
    }
    for (let i = 0; i < queryParams.length; i++) {
        const param = col.query.get(queryParams[i]);
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__[/* objectDefinedNotNull */ "s"])(param)) {
            q.query.set(queryParams[i], param);
        }
    }
    return q;
}
/**
 * Behavior that converts results to pages when used with a collection (exposed through the paged method of GraphCollection)
 *
 * @returns A TimelinePipe used to configure the queryable
 */
function Paged(supportsCount = false) {
    return (instance) => {
        instance.on.parse.replace(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* errorCheck */ "n"]);
        instance.on.parse(async (url, response, result) => {
            const txt = await response.text();
            const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
            const nextLink = json["@odata.nextLink"];
            const count = supportsCount && Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__[/* hOP */ "l"])(json, "@odata.count") ? parseInt(json["@odata.count"], 10) : 0;
            const hasNext = !Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__[/* stringIsNullOrEmpty */ "v"])(nextLink);
            result = {
                count,
                hasNext,
                next: () => (hasNext ? AsPaged(Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* GraphQueryableCollection */ "b"])([instance, nextLink]), supportsCount)() : null),
                value: Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* parseODataJSON */ "r"])(json),
            };
            return [url, response, result];
        });
        return instance;
    };
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return driveItemUpload; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




function checkIn(checkInOptions) {
    return Object(_operations_js__WEBPACK_IMPORTED_MODULE_2__[/* graphPost */ "d"])(Object(_types_js__WEBPACK_IMPORTED_MODULE_3__[/* DriveItem */ "b"])(this, "checkin"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* body */ "l"])(checkInOptions));
}
function checkOut() {
    return Object(_operations_js__WEBPACK_IMPORTED_MODULE_2__[/* graphPost */ "d"])(Object(_types_js__WEBPACK_IMPORTED_MODULE_3__[/* DriveItem */ "b"])(this, "checkout"));
}
async function driveItemUpload(fileOptions) {
    let path = "/content";
    if (fileOptions.filePathName) {
        path = `:/${fileOptions.filePathName}:/content`;
    }
    const q = Object(_types_js__WEBPACK_IMPORTED_MODULE_3__[/* DriveItem */ "b"])(this, null);
    // This assumes that `this` url doesn't have a trailing '/' which is should not, we'll revisit this if people are reporting issues.
    q.concat(path);
    if (fileOptions.contentType) {
        q.using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__[/* InjectHeaders */ "g"])({
            "Content-Type": fileOptions.contentType,
        }));
    }
    const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_2__[/* graphPut */ "e"])(q, { body: fileOptions.content });
    return {
        data,
        driveItem: Object(_types_js__WEBPACK_IMPORTED_MODULE_3__[/* DriveItem */ "b"])([this, `${Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__[/* combine */ "f"])("drives", data.parentReference.driveId, "items", data.id)}`]),
    };
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsistencyLevel; });
function ConsistencyLevel(level = "eventual") {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            init.headers = { ...init.headers, "ConsistencyLevel": level };
            return [url, init, result];
        });
        return instance;
    };
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* unused harmony export _Shares */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Shares; });
/* unused harmony export _Share */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Share; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _onedrive_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




/**
 * Shares
 */
let _Shares = class _Shares extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* _GraphQueryableCollection */ "d"] {
    /**
     * Gets a share by share id or encoded url
     * @param id The share id
     * @returns An IShare instance
     */
    getById(id) {
        return Share(this, id);
    }
    /**
     * Creates a sharing link (id) from a given absolute url to a file
     * @param url Absolute file url such as "https://{tenant}.sharepoint.com/sites/dev/Shared%20Documents/new.pptx"
     * @returns An encoded sharing id which can be used in getById to access a file
     */
    encodeSharingLink(url) {
        return (`u!${Buffer.from(url).toString("base64").replace(/=$/, "").replace("/", "_").replace("+", "-")}`);
    }
};
_Shares = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __decorate */ "a"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_1__[/* defaultPath */ "b"])("shares")
], _Shares);

const Shares = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* graphInvokableFactory */ "f"])(_Shares);
/**
 * Share
 */
class _Share extends _graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* _GraphQueryableInstance */ "e"] {
    /**
     * Access the driveItem associated with this shared file
     */
    get driveItem() {
        return Object(_onedrive_types_js__WEBPACK_IMPORTED_MODULE_3__[/* DriveItem */ "b"])(this, "driveitem");
    }
}
const Share = Object(_graphqueryable_js__WEBPACK_IMPORTED_MODULE_2__[/* graphInvokableFactory */ "f"])(_Share);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11).Buffer))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(13)
var ieee754 = __webpack_require__(14)
var isArray = __webpack_require__(15)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Attachment", function() { return /* reexport */ Attachment; });
__webpack_require__.d(__webpack_exports__, "Attachments", function() { return /* reexport */ Attachments; });
__webpack_require__.d(__webpack_exports__, "Calendar", function() { return /* reexport */ Calendar; });
__webpack_require__.d(__webpack_exports__, "Calendars", function() { return /* reexport */ Calendars; });
__webpack_require__.d(__webpack_exports__, "Event", function() { return /* reexport */ Event; });
__webpack_require__.d(__webpack_exports__, "Events", function() { return /* reexport */ Events; });
__webpack_require__.d(__webpack_exports__, "Presence", function() { return /* reexport */ Presence; });
__webpack_require__.d(__webpack_exports__, "Communications", function() { return /* reexport */ Communications; });
__webpack_require__.d(__webpack_exports__, "Contact", function() { return /* reexport */ Contact; });
__webpack_require__.d(__webpack_exports__, "ContactFolder", function() { return /* reexport */ ContactFolder; });
__webpack_require__.d(__webpack_exports__, "ContactFolders", function() { return /* reexport */ ContactFolders; });
__webpack_require__.d(__webpack_exports__, "Contacts", function() { return /* reexport */ Contacts; });
__webpack_require__.d(__webpack_exports__, "Conversation", function() { return /* reexport */ Conversation; });
__webpack_require__.d(__webpack_exports__, "Conversations", function() { return /* reexport */ Conversations; });
__webpack_require__.d(__webpack_exports__, "Post", function() { return /* reexport */ Post; });
__webpack_require__.d(__webpack_exports__, "Posts", function() { return /* reexport */ Posts; });
__webpack_require__.d(__webpack_exports__, "Senders", function() { return /* reexport */ Senders; });
__webpack_require__.d(__webpack_exports__, "Thread", function() { return /* reexport */ Thread; });
__webpack_require__.d(__webpack_exports__, "Threads", function() { return /* reexport */ Threads; });
__webpack_require__.d(__webpack_exports__, "DirectoryObjectTypes", function() { return /* reexport */ DirectoryObjectTypes; });
__webpack_require__.d(__webpack_exports__, "DirectoryObject", function() { return /* reexport */ DirectoryObject; });
__webpack_require__.d(__webpack_exports__, "DirectoryObjects", function() { return /* reexport */ DirectoryObjects; });
__webpack_require__.d(__webpack_exports__, "Group", function() { return /* reexport */ Group; });
__webpack_require__.d(__webpack_exports__, "GroupType", function() { return /* reexport */ GroupType; });
__webpack_require__.d(__webpack_exports__, "Groups", function() { return /* reexport */ Groups; });
__webpack_require__.d(__webpack_exports__, "Insights", function() { return /* reexport */ Insights; });
__webpack_require__.d(__webpack_exports__, "SharedInsight", function() { return /* reexport */ SharedInsight; });
__webpack_require__.d(__webpack_exports__, "SharedInsights", function() { return /* reexport */ SharedInsights; });
__webpack_require__.d(__webpack_exports__, "TrendingInsight", function() { return /* reexport */ TrendingInsight; });
__webpack_require__.d(__webpack_exports__, "TrendingInsights", function() { return /* reexport */ TrendingInsights; });
__webpack_require__.d(__webpack_exports__, "UsedInsight", function() { return /* reexport */ UsedInsight; });
__webpack_require__.d(__webpack_exports__, "UsedInsights", function() { return /* reexport */ UsedInsights; });
__webpack_require__.d(__webpack_exports__, "Resource", function() { return /* reexport */ Resource; });
__webpack_require__.d(__webpack_exports__, "Invitations", function() { return /* reexport */ Invitations; });
__webpack_require__.d(__webpack_exports__, "Member", function() { return /* reexport */ Member; });
__webpack_require__.d(__webpack_exports__, "Members", function() { return /* reexport */ Members; });
__webpack_require__.d(__webpack_exports__, "MailFolder", function() { return /* reexport */ MailFolder; });
__webpack_require__.d(__webpack_exports__, "MailFolders", function() { return /* reexport */ MailFolders; });
__webpack_require__.d(__webpack_exports__, "MailboxSettings", function() { return /* reexport */ MailboxSettings; });
__webpack_require__.d(__webpack_exports__, "Message", function() { return /* reexport */ Message; });
__webpack_require__.d(__webpack_exports__, "Messages", function() { return /* reexport */ Messages; });
__webpack_require__.d(__webpack_exports__, "SpecialFolder", function() { return /* reexport */ SpecialFolder; });
__webpack_require__.d(__webpack_exports__, "Drive", function() { return /* reexport */ types["a" /* Drive */]; });
__webpack_require__.d(__webpack_exports__, "DriveItem", function() { return /* reexport */ types["b" /* DriveItem */]; });
__webpack_require__.d(__webpack_exports__, "DriveItems", function() { return /* reexport */ types["c" /* DriveItems */]; });
__webpack_require__.d(__webpack_exports__, "Drives", function() { return /* reexport */ types["d" /* Drives */]; });
__webpack_require__.d(__webpack_exports__, "Root", function() { return /* reexport */ types["e" /* Root */]; });
__webpack_require__.d(__webpack_exports__, "Notebook", function() { return /* reexport */ Notebook; });
__webpack_require__.d(__webpack_exports__, "Notebooks", function() { return /* reexport */ Notebooks; });
__webpack_require__.d(__webpack_exports__, "OneNote", function() { return /* reexport */ OneNote; });
__webpack_require__.d(__webpack_exports__, "Section", function() { return /* reexport */ Section; });
__webpack_require__.d(__webpack_exports__, "Sections", function() { return /* reexport */ Sections; });
__webpack_require__.d(__webpack_exports__, "Photo", function() { return /* reexport */ Photo; });
__webpack_require__.d(__webpack_exports__, "Bucket", function() { return /* reexport */ Bucket; });
__webpack_require__.d(__webpack_exports__, "Buckets", function() { return /* reexport */ Buckets; });
__webpack_require__.d(__webpack_exports__, "Plan", function() { return /* reexport */ Plan; });
__webpack_require__.d(__webpack_exports__, "Planner", function() { return /* reexport */ Planner; });
__webpack_require__.d(__webpack_exports__, "Plans", function() { return /* reexport */ Plans; });
__webpack_require__.d(__webpack_exports__, "Task", function() { return /* reexport */ Task; });
__webpack_require__.d(__webpack_exports__, "Tasks", function() { return /* reexport */ Tasks; });
__webpack_require__.d(__webpack_exports__, "TaskDetails", function() { return /* reexport */ TaskDetails; });
__webpack_require__.d(__webpack_exports__, "PlanDetails", function() { return /* reexport */ PlanDetails; });
__webpack_require__.d(__webpack_exports__, "Search", function() { return /* reexport */ Search; });
__webpack_require__.d(__webpack_exports__, "Share", function() { return /* reexport */ shares_types["a" /* Share */]; });
__webpack_require__.d(__webpack_exports__, "Shares", function() { return /* reexport */ shares_types["b" /* Shares */]; });
__webpack_require__.d(__webpack_exports__, "Subscription", function() { return /* reexport */ Subscription; });
__webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return /* reexport */ Subscriptions; });
__webpack_require__.d(__webpack_exports__, "Channel", function() { return /* reexport */ Channel; });
__webpack_require__.d(__webpack_exports__, "Channels", function() { return /* reexport */ Channels; });
__webpack_require__.d(__webpack_exports__, "Tab", function() { return /* reexport */ Tab; });
__webpack_require__.d(__webpack_exports__, "Tabs", function() { return /* reexport */ Tabs; });
__webpack_require__.d(__webpack_exports__, "Team", function() { return /* reexport */ Team; });
__webpack_require__.d(__webpack_exports__, "Teams", function() { return /* reexport */ Teams; });
__webpack_require__.d(__webpack_exports__, "User", function() { return /* reexport */ User; });
__webpack_require__.d(__webpack_exports__, "Users", function() { return /* reexport */ Users; });
__webpack_require__.d(__webpack_exports__, "People", function() { return /* reexport */ People; });
__webpack_require__.d(__webpack_exports__, "graphfi", function() { return /* reexport */ graphfi; });
__webpack_require__.d(__webpack_exports__, "GraphFI", function() { return /* reexport */ fi_GraphFI; });
__webpack_require__.d(__webpack_exports__, "GraphQueryable", function() { return /* reexport */ graphqueryable["a" /* GraphQueryable */]; });
__webpack_require__.d(__webpack_exports__, "GraphQueryableCollection", function() { return /* reexport */ graphqueryable["b" /* GraphQueryableCollection */]; });
__webpack_require__.d(__webpack_exports__, "GraphQueryableInstance", function() { return /* reexport */ graphqueryable["c" /* GraphQueryableInstance */]; });
__webpack_require__.d(__webpack_exports__, "graphGet", function() { return /* reexport */ operations["b" /* graphGet */]; });
__webpack_require__.d(__webpack_exports__, "graphPost", function() { return /* reexport */ operations["d" /* graphPost */]; });
__webpack_require__.d(__webpack_exports__, "graphDelete", function() { return /* reexport */ operations["a" /* graphDelete */]; });
__webpack_require__.d(__webpack_exports__, "graphPatch", function() { return /* reexport */ operations["c" /* graphPatch */]; });
__webpack_require__.d(__webpack_exports__, "graphPut", function() { return /* reexport */ operations["e" /* graphPut */]; });
__webpack_require__.d(__webpack_exports__, "ConsistencyLevel", function() { return /* reexport */ consistency_level["a" /* ConsistencyLevel */]; });
__webpack_require__.d(__webpack_exports__, "DefaultInit", function() { return /* reexport */ DefaultInit; });
__webpack_require__.d(__webpack_exports__, "DefaultHeaders", function() { return /* reexport */ DefaultHeaders; });
__webpack_require__.d(__webpack_exports__, "Endpoint", function() { return /* reexport */ Endpoint; });
__webpack_require__.d(__webpack_exports__, "GraphBrowser", function() { return /* reexport */ GraphBrowser; });
__webpack_require__.d(__webpack_exports__, "AsPaged", function() { return /* reexport */ paged["a" /* AsPaged */]; });
__webpack_require__.d(__webpack_exports__, "Paged", function() { return /* reexport */ paged["b" /* Paged */]; });
__webpack_require__.d(__webpack_exports__, "Telemetry", function() { return /* reexport */ Telemetry; });
__webpack_require__.d(__webpack_exports__, "SPFxToken", function() { return /* reexport */ SPFxToken; });
__webpack_require__.d(__webpack_exports__, "SPFx", function() { return /* reexport */ SPFx; });

// EXTERNAL MODULE: ./node_modules/@pnp/graph/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@pnp/queryable/index.js + 16 modules
var queryable = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@pnp/graph/graphqueryable.js
var graphqueryable = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/@pnp/graph/decorators.js
var decorators = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@pnp/graph/operations.js
var operations = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/conversations/types.js





/**
 * Conversation
 */
let types_Conversation = class _Conversation extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Get all the threads in a group conversation.
     */
    get threads() {
        return Threads(this);
    }
};
types_Conversation = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["f" /* updateable */])(),
    Object(decorators["c" /* deleteable */])()
], types_Conversation);

const Conversation = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Conversation);
/**
 * Conversations
 */
let types_Conversations = class _Conversations extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_Conversations = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("conversations"),
    Object(decorators["a" /* addable */])(),
    Object(decorators["e" /* getById */])(Conversation)
], types_Conversations);

const Conversations = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Conversations);
/**
 * Thread
 */
let types_Thread = class _Thread extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Get all the threads in a group conversation.
     */
    get posts() {
        return Posts(this);
    }
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    reply(post) {
        return Object(operations["d" /* graphPost */])(Thread(this, "reply"), Object(queryable["l" /* body */])(post));
    }
};
types_Thread = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])()
], types_Thread);

const Thread = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Thread);
/**
 * Threads
 */
let types_Threads = class _Threads extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_Threads = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("threads"),
    Object(decorators["a" /* addable */])(),
    Object(decorators["e" /* getById */])(Thread)
], types_Threads);

const Threads = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Threads);
/**
 * Post
 */
let types_Post = class _Post extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Forward a post to a recipient
     */
    forward(info) {
        return Object(operations["d" /* graphPost */])(Post(this, "forward"), Object(queryable["l" /* body */])(info));
    }
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    reply(post) {
        return Object(operations["d" /* graphPost */])(Post(this, "reply"), Object(queryable["l" /* body */])(post));
    }
};
types_Post = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])()
], types_Post);

const Post = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Post);
/**
 * Posts
 */
let types_Posts = class _Posts extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_Posts = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("posts"),
    Object(decorators["a" /* addable */])(),
    Object(decorators["e" /* getById */])(Post)
], types_Posts);

const Posts = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Posts);
/**
 * Senders
 */
class types_Senders extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    add(id) {
        return Object(operations["d" /* graphPost */])(Senders(this, "$ref"), Object(queryable["l" /* body */])({ "@odata.id": id }));
    }
    /**
     * Removes the entity from the collection
     *
     * @param id The full @odata.id value to remove (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    remove(id) {
        const remover = Senders(this, "$ref");
        remover.query.set("$id", id);
        return Object(operations["a" /* graphDelete */])(remover);
    }
}
const Senders = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Senders);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/utils/type.js
function type_type(n, a) {
    return Object.assign({ "@odata.type": n }, a);
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/attachments/types.js






/**
 * Attachment
 */
class types_Attachment extends graphqueryable["e" /* _GraphQueryableInstance */] {
}
const Attachment = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Attachment);
/**
 * Attachments
 */
let types_Attachments = class _Attachments extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Add attachment to this collection
     *
     * @param name Name given to the attachment file
     * @param bytes File content
     */
    addFile(name, bytes) {
        return Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(type_type("#microsoft.graph.fileAttachment", {
            contentBytes: bytes,
            name,
        })));
    }
};
types_Attachments = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("attachments"),
    Object(decorators["e" /* getById */])(Attachment)
], types_Attachments);

const Attachments = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Attachments);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/attachments/conversations.js



Object(queryable["k" /* addProp */])(types_Post, "attachments", Attachments);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/attachments/index.js



// EXTERNAL MODULE: ./node_modules/@pnp/graph/behaviors/paged.js
var paged = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/directory-objects/types.js






/**
 * Represents a Directory Object entity
 */
let types_DirectoryObject = class _DirectoryObject extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
   * Returns all the groups and directory roles that the specified Directory Object is a member of. The check is transitive
   *
   * @param securityEnabledOnly
   */
    getMemberObjects(securityEnabledOnly = false) {
        return Object(operations["d" /* graphPost */])(DirectoryObject(this, "getMemberObjects"), Object(queryable["l" /* body */])({ securityEnabledOnly }));
    }
    /**
   * Returns all the groups that the specified Directory Object is a member of. The check is transitive
   *
   * @param securityEnabledOnly
   */
    getMemberGroups(securityEnabledOnly = false) {
        return Object(operations["d" /* graphPost */])(DirectoryObject(this, "getMemberGroups"), Object(queryable["l" /* body */])({ securityEnabledOnly }));
    }
    /**
   * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
   * This function is transitive.
   * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
   */
    checkMemberGroups(groupIds) {
        return Object(operations["d" /* graphPost */])(DirectoryObject(this, "checkMemberGroups"), Object(queryable["l" /* body */])({ groupIds }));
    }
};
types_DirectoryObject = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])()
], types_DirectoryObject);

const DirectoryObject = Object(graphqueryable["f" /* graphInvokableFactory */])(types_DirectoryObject);
/**
 * Describes a collection of Directory Objects
 *
 */
let types_DirectoryObjects = class _DirectoryObjects extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
  * Returns the directory objects specified in a list of ids. NOTE: The directory objects returned are the full objects containing all their properties.
  * The $select query option is not available for this operation.
  *
  * @param ids A collection of ids for which to return objects. You can specify up to 1000 ids.
  * @param type A collection of resource types that specifies the set of resource collections to search. Default is directoryObject.
  */
    getByIds(ids, type = DirectoryObjectTypes.directoryObject) {
        return Object(operations["d" /* graphPost */])(DirectoryObjects(this, "getByIds"), Object(queryable["l" /* body */])({ ids, type }));
    }
    /**
     * 	Retrieves the total count of matching resources
     *  If the resource doesn't support count, this value will always be zero
     */
    async count() {
        const q = Object(paged["a" /* AsPaged */])(this, true);
        const r = await q.top(1)();
        return r.count;
    }
    /**
     * Allows reading through a collection as pages of information whose size is determined by top or the api method's default
     *
     * @returns an object containing results, the ability to determine if there are more results, and request the next page of results
     */
    paged() {
        return Object(paged["a" /* AsPaged */])(this, true)();
    }
};
types_DirectoryObjects = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("directoryObjects"),
    Object(decorators["e" /* getById */])(DirectoryObject)
], types_DirectoryObjects);

const DirectoryObjects = Object(graphqueryable["f" /* graphInvokableFactory */])(types_DirectoryObjects);
/**
 * DirectoryObjectTypes
 */
var DirectoryObjectTypes;
(function (DirectoryObjectTypes) {
    /**
   * Directory Objects
   */
    DirectoryObjectTypes[DirectoryObjectTypes["directoryObject"] = 0] = "directoryObject";
    /**
   * User
   */
    DirectoryObjectTypes[DirectoryObjectTypes["user"] = 1] = "user";
    /**
   * Group
   */
    DirectoryObjectTypes[DirectoryObjectTypes["group"] = 2] = "group";
    /**
   * Device
   */
    DirectoryObjectTypes[DirectoryObjectTypes["device"] = 3] = "device";
})(DirectoryObjectTypes || (DirectoryObjectTypes = {}));

// CONCATENATED MODULE: ./node_modules/@pnp/graph/groups/types.js






var GroupType;
(function (GroupType) {
    /**
     * Office 365 (aka unified group)
     */
    GroupType[GroupType["Office365"] = 0] = "Office365";
    /**
     * Dynamic membership
     */
    GroupType[GroupType["Dynamic"] = 1] = "Dynamic";
    /**
     * Security
     */
    GroupType[GroupType["Security"] = 2] = "Security";
})(GroupType || (GroupType = {}));
/**
 * Represents a group entity
 */
let types_Group = class _Group extends types_DirectoryObject {
    /**
     * Add the group to the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    addFavorite() {
        return Object(operations["d" /* graphPost */])(Group(this, "addFavorite"));
    }
    /**
     * Remove the group from the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    removeFavorite() {
        return Object(operations["d" /* graphPost */])(Group(this, "removeFavorite"));
    }
    /**
     * Reset the unseenCount of all the posts that the current user has not seen since their last visit
     */
    resetUnseenCount() {
        return Object(operations["d" /* graphPost */])(Group(this, "resetUnseenCount"));
    }
    /**
     * Calling this method will enable the current user to receive email notifications for this group,
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    subscribeByMail() {
        return Object(operations["d" /* graphPost */])(Group(this, "subscribeByMail"));
    }
    /**
     * Calling this method will prevent the current user from receiving email notifications for this group
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    unsubscribeByMail() {
        return Object(operations["d" /* graphPost */])(Group(this, "unsubscribeByMail"));
    }
    /**
     * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range, from the default calendar of a group
     *
     * @param start Start date and time of the time range
     * @param end End date and time of the time range
     */
    getCalendarView(start, end) {
        const view = Group(this, "calendarView");
        view.query.set("startDateTime", start.toISOString());
        view.query.set("endDateTime", end.toISOString());
        return view();
    }
};
types_Group = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])(),
    Object(decorators["f" /* updateable */])()
], types_Group);

const Group = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Group);
/**
 * Describes a collection of Group objects
 *
 */
let types_Groups = class _Groups extends types_DirectoryObjects {
    /**
     * Create a new group as specified in the request body.
     *
     * @param name Name to display in the address book for the group
     * @param mailNickname Mail alias for the group
     * @param groupType Type of group being created
     * @param additionalProperties A plain object collection of additional properties you want to set on the new group
     */
    async add(name, mailNickname, groupType, additionalProperties = {}) {
        let postBody = {
            displayName: name,
            mailEnabled: groupType === GroupType.Office365,
            mailNickname: mailNickname,
            securityEnabled: groupType !== GroupType.Office365,
            ...additionalProperties,
        };
        // include a group type if required
        if (groupType !== GroupType.Security) {
            postBody = {
                ...postBody,
                groupTypes: groupType === GroupType.Office365 ? ["Unified"] : ["DynamicMembership"],
            };
        }
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            data,
            group: this.getById(data.id),
        };
    }
};
types_Groups = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("groups"),
    Object(decorators["e" /* getById */])(Group)
], types_Groups);

const Groups = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Groups);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/behaviors/endpoint.js
function Endpoint(endpoint) {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            const all = ["beta", "v1.0"];
            let regex = new RegExp(endpoint, "i");
            const replaces = all.filter(s => !regex.test(s)).map(s => s.replace(".", "\\."));
            regex = new RegExp(`/?(${replaces.join("|")})/?`, "ig");
            url = url.replace(regex, `/${endpoint}/`);
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/calendars/funcs.js


/**
 * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range,
 * from the user's default calendar, or from some other calendar of the user's
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
function calendarView(start, end) {
    const query = Object(graphqueryable["b" /* GraphQueryableCollection */])(this, "calendarView");
    query.query.set("startDateTime", start);
    query.query.set("endDateTime", end);
    return query;
}
/**
 * Get the emailAddress objects that represent all the meeting rooms in the user's tenant or in a specific room list.
 *  - This is a beta graph feature and uses the beta endpoint.
 *
 * @param this IGraphQueryable instance
 * @param roomList The SMTP address associated with the room list.
 */
function findRooms(roomList) {
    const query = Object(graphqueryable["b" /* GraphQueryableCollection */])(this, roomList ? "findRooms(RoomList=@roomList)" : "findRooms");
    query.using(Endpoint("beta"));
    if (roomList) {
        query.query.set("@roomList", `'${roomList}'`);
    }
    return query;
}
/**
 * Get the instances (occurrences) of an event for a specified time range.
 * If the event is a seriesMaster type, this returns the occurrences and exceptions of the event in the specified time range.
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
function instances(start, end) {
    const query = Object(graphqueryable["b" /* GraphQueryableCollection */])(this, "instances");
    query.query.set("startDateTime", start);
    query.query.set("endDateTime", end);
    return query;
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/calendars/types.js






/**
 * Calendar
 */
class types_Calendar extends graphqueryable["e" /* _GraphQueryableInstance */] {
    constructor() {
        super(...arguments);
        this.calendarView = calendarView;
    }
    get events() {
        return Events(this);
    }
}
const Calendar = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Calendar);
/**
 * Calendars
 */
let types_Calendars = class _Calendars extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_Calendars = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("calendars"),
    Object(decorators["e" /* getById */])(Calendar)
], types_Calendars);

const Calendars = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Calendars);
/**
 * Event
 */
let types_Event = class _Event extends graphqueryable["e" /* _GraphQueryableInstance */] {
    constructor() {
        super(...arguments);
        this.instances = instances;
    }
};
types_Event = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])(),
    Object(decorators["f" /* updateable */])()
], types_Event);

const Event = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Event);
/**
 * Events
 */
let types_Events = class _Events extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Adds a new event to the collection
     *
     * @param properties The set of properties used to create the event
     */
    async add(properties) {
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(properties));
        return {
            data,
            event: this.getById(data.id),
        };
    }
};
types_Events = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("events"),
    Object(decorators["e" /* getById */])(Event)
], types_Events);

const Events = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Events);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/calendars/groups.js



Object(queryable["k" /* addProp */])(types_Group, "calendar", Calendar);
Object(queryable["k" /* addProp */])(types_Group, "events", Events);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/users/types.js




let types_User = class _User extends types_DirectoryObject {
    /**
    * The groups and directory roles associated with the user
    */
    get memberOf() {
        return DirectoryObjects(this, "memberOf");
    }
    /**
    * The groups and directory roles associated with the user
    */
    get transitiveMemberOf() {
        return DirectoryObjects(this, "transitiveMemberOf");
    }
    /**
     * Retrieve a collection of person objects ordered by their relevance to the user
     */
    get people() {
        return People(this);
    }
    /**
    * People that have direct reports to the user
    */
    get directReports() {
        return People(this, "directReports");
    }
    /**
    * The manager associated with this user
    */
    get manager() {
        return User(this, "manager");
    }
};
types_User = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["f" /* updateable */])(),
    Object(decorators["c" /* deleteable */])()
], types_User);

const User = Object(graphqueryable["f" /* graphInvokableFactory */])(types_User);
let types_Users = class _Users extends types_DirectoryObjects {
};
types_Users = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("users"),
    Object(decorators["e" /* getById */])(User)
], types_Users);

const Users = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Users);
let types_People = class _People extends types_DirectoryObjects {
};
types_People = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("people")
], types_People);

const People = Object(graphqueryable["f" /* graphInvokableFactory */])(types_People);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/calendars/users.js




Object(queryable["k" /* addProp */])(types_User, "calendar", Calendar);
Object(queryable["k" /* addProp */])(types_User, "calendars", Calendars);
Object(queryable["k" /* addProp */])(types_User, "events", Events);
types_User.prototype.calendarView = calendarView;

// CONCATENATED MODULE: ./node_modules/@pnp/graph/calendars/index.js




// CONCATENATED MODULE: ./node_modules/@pnp/graph/fi.js

class fi_GraphFI {
    /**
     * Creates a new instance of the GraphFI class
     *
     * @param root Establishes a root url/configuration
     */
    constructor(root = "") {
        this._root = Object(graphqueryable["a" /* GraphQueryable */])(root);
    }
    /**
     * Applies one or more behaviors which will be inherited by all instances chained from this root
     *
     */
    using(...behaviors) {
        this._root.using(...behaviors);
        return this;
    }
    /**
     * Used by extending classes to create new objects directly from the root
     *
     * @param factory The factory for the type of object to create
     * @returns A configured instance of that object
     */
    create(factory, path) {
        return factory(this._root, path);
    }
}
function graphfi(root = "") {
    if (typeof root === "object" && !Reflect.has(root, "length")) {
        root = root._root;
    }
    return new fi_GraphFI(root);
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/cloud-communications/types.js





/**
 * Presence
 */
let types_Presence = class _Presence extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_Presence = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("presence")
], types_Presence);

const Presence = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Presence);
let types_Communications = class _Communications extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Retrieve presence information for a group of users.
     *
     * @param ids An array of user id's to retrieve presence for.
     */
    async getPresencesByUserId(ids) {
        const postBody = { ids };
        // return graphPost(<any>Search(this, "query"), body(request));
        return Object(operations["d" /* graphPost */])(Communications(this, "getPresencesByUserId"), Object(queryable["l" /* body */])(postBody));
    }
};
types_Communications = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("communications")
], types_Communications);

const Communications = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Communications);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/cloud-communications/users.js



Object(queryable["k" /* addProp */])(types_User, "presence", Presence);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/cloud-communications/index.js




Reflect.defineProperty(fi_GraphFI.prototype, "communications", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Communications);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/contacts/types.js





/**
 * Contact
 */
let types_Contact = class _Contact extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_Contact = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["f" /* updateable */])(),
    Object(decorators["c" /* deleteable */])()
], types_Contact);

const Contact = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Contact);
/**
 * Contacts
 */
let types_Contacts = class _Contacts extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
    * Create a new Contact for the user.
    *
    * @param givenName The contact's given name.
    * @param surName The contact's surname.
    * @param emailAddresses The contact's email addresses.
    * @param businessPhones The contact's business phone numbers.
    * @param additionalProperties A plain object collection of additional properties you want to set on the new contact
    */
    async add(givenName, surName, emailAddresses, businessPhones, additionalProperties = {}) {
        const postBody = {
            businessPhones,
            emailAddresses,
            givenName,
            surName,
            ...additionalProperties,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            contact: this.getById(data.id),
            data,
        };
    }
};
types_Contacts = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("contacts"),
    Object(decorators["e" /* getById */])(Contact)
], types_Contacts);

const Contacts = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Contacts);
/**
 * Contact Folder
 */
let types_ContactFolder = class _ContactFolder extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Gets the contacts in this contact folder
     */
    get contacts() {
        return Contacts(this);
    }
    /**
    * Gets the contacts in this contact folder
    */
    get childFolders() {
        return ContactFolders(this, "childFolders");
    }
};
types_ContactFolder = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])(),
    Object(decorators["f" /* updateable */])()
], types_ContactFolder);

const ContactFolder = Object(graphqueryable["f" /* graphInvokableFactory */])(types_ContactFolder);
/**
 * Contact Folders
 */
let types_ContactFolders = class _ContactFolders extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Contact Folder for the user.
     *
     * @param displayName The folder's display name.
     * @param parentFolderId The ID of the folder's parent folder.
     */
    async add(displayName, parentFolderId) {
        const postBody = {
            displayName: displayName,
            parentFolderId: parentFolderId,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            contactFolder: this.getById(data.id),
            data,
        };
    }
};
types_ContactFolders = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("contactFolders"),
    Object(decorators["e" /* getById */])(ContactFolder)
], types_ContactFolders);

const ContactFolders = Object(graphqueryable["f" /* graphInvokableFactory */])(types_ContactFolders);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/contacts/users.js



Object(queryable["k" /* addProp */])(types_User, "contacts", Contacts);
Object(queryable["k" /* addProp */])(types_User, "contactFolders", ContactFolders);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/contacts/index.js



// CONCATENATED MODULE: ./node_modules/@pnp/graph/conversations/groups.js



Object(queryable["k" /* addProp */])(types_Group, "conversations", Conversations);
Object(queryable["k" /* addProp */])(types_Group, "acceptedSenders", Senders);
Object(queryable["k" /* addProp */])(types_Group, "rejectedSenders", Senders);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/conversations/index.js



// CONCATENATED MODULE: ./node_modules/@pnp/graph/directory-objects/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "directoryObjects", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(DirectoryObjects);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/groups/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "groups", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Groups);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/insights/types.js



/**
 * Represents a insights entity
 */
let types_Insights = class _Insights extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get trending() {
        return TrendingInsights(this);
    }
    get used() {
        return UsedInsights(this);
    }
    get shared() {
        return SharedInsights(this);
    }
};
types_Insights = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("insights")
], types_Insights);

const Insights = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Insights);
/**
 * Describes a Trending Insight instance
 */
class types_TrendingInsight extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get resource() {
        return Resource(this);
    }
}
const TrendingInsight = Object(graphqueryable["f" /* graphInvokableFactory */])(types_TrendingInsight);
/**
 * Describes a collection of Trending Insight objects
 *
 */
let types_TrendingInsights = class _TrendingInsights extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_TrendingInsights = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("trending"),
    Object(decorators["e" /* getById */])(TrendingInsight)
], types_TrendingInsights);

const TrendingInsights = Object(graphqueryable["f" /* graphInvokableFactory */])(types_TrendingInsights);
/**
 * Describes a Used Insight instance
 */
class types_UsedInsight extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get resource() {
        return Resource(this);
    }
}
const UsedInsight = Object(graphqueryable["f" /* graphInvokableFactory */])(types_UsedInsight);
/**
 * Describes a collection of Used Insight objects
 *
 */
let types_UsedInsights = class _UsedInsights extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_UsedInsights = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("used"),
    Object(decorators["e" /* getById */])(UsedInsight)
], types_UsedInsights);

const UsedInsights = Object(graphqueryable["f" /* graphInvokableFactory */])(types_UsedInsights);
/**
 * Describes a Shared Insight instance
 */
class types_SharedInsight extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get resource() {
        return Resource(this);
    }
}
const SharedInsight = Object(graphqueryable["f" /* graphInvokableFactory */])(types_SharedInsight);
/**
 * Describes a collection of Shared Insight objects
 *
 */
let types_SharedInsights = class _SharedInsights extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_SharedInsights = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("shared"),
    Object(decorators["e" /* getById */])(SharedInsight)
], types_SharedInsights);

const SharedInsights = Object(graphqueryable["f" /* graphInvokableFactory */])(types_SharedInsights);
/**
 * Describes a Resource Entity instance
 */
let types_Resource = class _Resource extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_Resource = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("resource")
], types_Resource);

const Resource = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Resource);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/insights/users.js



Object(queryable["k" /* addProp */])(types_User, "insights", Insights);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/insights/index.js



// CONCATENATED MODULE: ./node_modules/@pnp/graph/invitations/types.js





/**
 * Invitations
 */
let types_Invitations = class _Invitations extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Invitation via invitation manager.
     *
     * @param invitedUserEmailAddress The email address of the user being invited.
     * @param inviteRedirectUrl The URL user should be redirected to once the invitation is redeemed.
     * @param additionalProperties A plain object collection of additional properties you want to set in the invitation
     */
    async create(invitedUserEmailAddress, inviteRedirectUrl, additionalProperties = {}) {
        const postBody = {
            inviteRedirectUrl,
            invitedUserEmailAddress,
            ...additionalProperties,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return { data };
    }
};
types_Invitations = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("invitations")
], types_Invitations);

const Invitations = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Invitations);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/invitations/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "invitations", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Invitations);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/members/types.js





/**
 * Member
 */
class types_Member extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Removes this Member
     */
    remove() {
        return Object(operations["a" /* graphDelete */])(Member(this, "$ref"));
    }
}
const Member = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Member);
/**
 * Members
 */
let types_Members = class _Members extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: `https://graph.microsoft.com/v1.0/directoryObjects/${id}`)
     */
    add(id) {
        return Object(operations["d" /* graphPost */])(Members(this, "$ref"), Object(queryable["l" /* body */])({ "@odata.id": id }));
    }
};
types_Members = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("members"),
    Object(decorators["e" /* getById */])(Member)
], types_Members);

const Members = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Members);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/members/groups.js



Object(queryable["k" /* addProp */])(types_Group, "owners", Members);
Object(queryable["k" /* addProp */])(types_Group, "members", Members);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/members/index.js



// CONCATENATED MODULE: ./node_modules/@pnp/graph/messages/types.js



/**
 * Message
 */
class types_Message extends graphqueryable["e" /* _GraphQueryableInstance */] {
}
const Message = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Message);
/**
 * Messages
 */
let types_Messages = class _Messages extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_Messages = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("messages"),
    Object(decorators["e" /* getById */])(Message),
    Object(decorators["a" /* addable */])()
], types_Messages);

const Messages = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Messages);
/**
 * MailFolder
 */
class types_MailFolder extends graphqueryable["e" /* _GraphQueryableInstance */] {
}
const MailFolder = Object(graphqueryable["f" /* graphInvokableFactory */])(types_MailFolder);
/**
 * MailFolders
 */
let types_MailFolders = class _MailFolders extends graphqueryable["d" /* _GraphQueryableCollection */] {
};
types_MailFolders = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("mailFolders"),
    Object(decorators["e" /* getById */])(MailFolder),
    Object(decorators["a" /* addable */])()
], types_MailFolders);

const MailFolders = Object(graphqueryable["f" /* graphInvokableFactory */])(types_MailFolders);
/**
 * MailboxSettings
 */
let types_MailboxSettings = class _MailboxSettings extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_MailboxSettings = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("mailboxSettings"),
    Object(decorators["f" /* updateable */])()
], types_MailboxSettings);

const MailboxSettings = Object(graphqueryable["f" /* graphInvokableFactory */])(types_MailboxSettings);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/messages/users.js




Object(queryable["k" /* addProp */])(types_User, "messages", Messages);
Object(queryable["k" /* addProp */])(types_User, "mailboxSettings", MailboxSettings);
Object(queryable["k" /* addProp */])(types_User, "mailFolders", MailFolders);
types_User.prototype.sendMail = function (message) {
    return Object(operations["d" /* graphPost */])(User(this, "sendMail"), Object(queryable["l" /* body */])(message));
};

// CONCATENATED MODULE: ./node_modules/@pnp/graph/messages/index.js



// EXTERNAL MODULE: ./node_modules/@pnp/graph/onedrive/types.js
var types = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onedrive/users.js




Object(queryable["k" /* addProp */])(types_User, "drive", types["a" /* Drive */]);
Object(queryable["k" /* addProp */])(types_User, "drives", types["d" /* Drives */]);
/**
 * Get special folder (as drive) for a user.
 */
types["f" /* _Drive */].prototype.special = function special(specialFolder) {
    return Object(types["b" /* DriveItem */])(this, `special/${specialFolder}`);
};
var SpecialFolder;
(function (SpecialFolder) {
    SpecialFolder["Documents"] = "documents";
    SpecialFolder["Photos"] = "photos";
    SpecialFolder["CameraRoll"] = "cameraroll";
    SpecialFolder["AppRoot"] = "approot";
    SpecialFolder["Music"] = "music";
})(SpecialFolder || (SpecialFolder = {}));
types["g" /* _DriveItem */].prototype.restore = function restore(restoreOptions) {
    return Object(operations["d" /* graphPost */])(Object(types["b" /* DriveItem */])(this, "restore"), Object(queryable["l" /* body */])(restoreOptions));
};
types["g" /* _DriveItem */].prototype.follow = function follow() {
    return Object(operations["d" /* graphPost */])(Object(types["b" /* DriveItem */])(this, "follow"), null);
};
types["g" /* _DriveItem */].prototype.unfollow = function unfollow() {
    return Object(operations["d" /* graphPost */])(Object(types["b" /* DriveItem */])(this, "unfollow"), null);
};

// EXTERNAL MODULE: ./node_modules/@pnp/graph/onedrive/funcs.js
var funcs = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onedrive/groups.js




Object(queryable["k" /* addProp */])(types_Group, "drive", types["a" /* Drive */]);
Object(queryable["k" /* addProp */])(types_Group, "drives", types["d" /* Drives */]);
types["g" /* _DriveItem */].prototype.checkIn = funcs["a" /* checkIn */];
types["g" /* _DriveItem */].prototype.checkOut = funcs["b" /* checkOut */];

// CONCATENATED MODULE: ./node_modules/@pnp/graph/sites/types.js



/**
 * Sites
 */
let types_Sites = class _Sites extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Gets the team site for the group
     */
    get root() {
        return Site(this, "root");
    }
    getById(id) {
        return Site(this, id);
    }
    /**
     * Get a Site by URL
     * @param hostname: string, the host of the site e.g. "contoso.sharepoint.com"
     * @param siteUrl: string, the server relative url of the site e.g. "/sites/teamsite1"
     * @returns ISite
    */
    getByUrl(hostname, siteUrl) {
        return Site(this, `${hostname}:${siteUrl}:`);
    }
};
types_Sites = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("sites")
], types_Sites);

const Sites = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Sites);
/**
 * Site
 */
class types_Site extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get sites() {
        return Sites(this);
    }
}
const Site = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Site);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onedrive/sites.js




Object(queryable["k" /* addProp */])(types_Site, "drive", types["a" /* Drive */]);
Object(queryable["k" /* addProp */])(types_Site, "drives", types["d" /* Drives */]);
types["g" /* _DriveItem */].prototype.checkIn = funcs["a" /* checkIn */];
types["g" /* _DriveItem */].prototype.checkOut = funcs["b" /* checkOut */];

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onedrive/index.js







Reflect.defineProperty(fi_GraphFI.prototype, "drives", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(types["d" /* Drives */]);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onenote/types.js





/**
 * Represents a onenote entity
 */
let types_OneNote = class _OneNote extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get notebooks() {
        return Notebooks(this);
    }
    get sections() {
        return Sections(this);
    }
    get pages() {
        return Object(graphqueryable["b" /* GraphQueryableCollection */])(this, "pages");
    }
};
types_OneNote = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("onenote")
], types_OneNote);

const OneNote = Object(graphqueryable["f" /* graphInvokableFactory */])(types_OneNote);
/**
 * Describes a notebook instance
 *
 */
class types_Notebook extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get sections() {
        return Sections(this);
    }
}
const Notebook = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Notebook);
/**
 * Describes a collection of Notebook objects
 *
 */
let types_Notebooks = class _Notebooks extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    async add(displayName) {
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])({ displayName }));
        return {
            data,
            notebook: this.getById(data.id),
        };
    }
};
types_Notebooks = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("notebooks"),
    Object(decorators["e" /* getById */])(Notebook)
], types_Notebooks);

const Notebooks = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Notebooks);
/**
 * Describes a sections instance
 */
class types_Section extends graphqueryable["e" /* _GraphQueryableInstance */] {
}
const Section = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Section);
/**
 * Describes a collection of Sections objects
 *
 */
let types_Sections = class _Sections extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    async add(displayName) {
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])({ displayName }));
        return {
            data,
            section: this.getById(data.id),
        };
    }
};
types_Sections = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("sections"),
    Object(decorators["e" /* getById */])(Section)
], types_Sections);

const Sections = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Sections);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onenote/users.js



Object(queryable["k" /* addProp */])(types_User, "onenote", OneNote);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/onenote/index.js



// CONCATENATED MODULE: ./node_modules/@pnp/graph/photos/types.js





let types_Photo = class _Photo extends graphqueryable["e" /* _GraphQueryableInstance */] {
    /**
     * Gets the image bytes as a blob (browser)
     */
    getBlob() {
        return Photo(this, "$value").using(Object(queryable["a" /* BlobParse */])())();
    }
    /**
     * Gets the image file bytes as a Buffer (node.js)
     */
    getBuffer() {
        return Photo(this, "$value").using(Object(queryable["c" /* BufferParse */])())();
    }
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    setContent(content) {
        return Object(operations["c" /* graphPatch */])(Photo(this, "$value"), { body: content });
    }
};
types_Photo = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("photo")
], types_Photo);

const Photo = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Photo);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/photos/groups.js



Object(queryable["k" /* addProp */])(types_Group, "photo", Photo);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/photos/users.js



Object(queryable["k" /* addProp */])(types_User, "photo", Photo);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/photos/index.js




// CONCATENATED MODULE: ./node_modules/@pnp/graph/planner/types.js






/**
 * Planner
 */
let types_Planner = class _Planner extends graphqueryable["e" /* _GraphQueryableInstance */] {
    // Should Only be able to get by id, or else error occur
    get plans() {
        return Plans(this);
    }
    // Should Only be able to get by id, or else error occur
    get tasks() {
        return Tasks(this);
    }
    // Should Only be able to get by id, or else error occur
    get buckets() {
        return Buckets(this);
    }
};
types_Planner = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("planner")
], types_Planner);

const Planner = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Planner);
/**
 * Details
 */
let types_PlanDetails = class _PlanDetails extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_PlanDetails = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("details"),
    Object(decorators["g" /* updateableWithETag */])()
], types_PlanDetails);

const PlanDetails = Object(graphqueryable["f" /* graphInvokableFactory */])(types_PlanDetails);
/**
 * Plan
 */
let types_Plan = class _Plan extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get tasks() {
        return Tasks(this);
    }
    get buckets() {
        return Buckets(this);
    }
    get details() {
        return PlanDetails(this);
    }
};
types_Plan = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["g" /* updateableWithETag */])(),
    Object(decorators["d" /* deleteableWithETag */])()
], types_Plan);

const Plan = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Plan);
let types_Plans = class _Plans extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Planner Plan.
     *
     * @param owner Id of Group object.
     * @param title The Title of the Plan.
     */
    async add(owner, title) {
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])({ owner, title }));
        return {
            data,
            plan: this.getById(data.id),
        };
    }
};
types_Plans = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("plans"),
    Object(decorators["e" /* getById */])(Plan)
], types_Plans);

const Plans = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Plans);
/**
 * Details
 */
let types_TaskDetails = class _TaskDetails extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_TaskDetails = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("details"),
    Object(decorators["g" /* updateableWithETag */])()
], types_TaskDetails);

const TaskDetails = Object(graphqueryable["f" /* graphInvokableFactory */])(types_TaskDetails);
/**
 * Task
 */
let types_Task = class _Task extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get details() {
        return TaskDetails(this);
    }
};
types_Task = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["g" /* updateableWithETag */])(),
    Object(decorators["d" /* deleteableWithETag */])()
], types_Task);

const Task = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Task);
/**
 * Tasks
 */
let types_Tasks = class _Tasks extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Planner Task.
     *
     * @param planId Id of Plan.
     * @param title The Title of the Task.
     * @param assignments Assign the task
     * @param bucketId Id of Bucket
     */
    async add(planId, title, assignments, bucketId) {
        let postBody = {
            planId,
            title,
            ...assignments,
        };
        if (bucketId) {
            postBody = {
                ...postBody,
                bucketId,
            };
        }
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            data,
            task: this.getById(data.id),
        };
    }
};
types_Tasks = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("tasks"),
    Object(decorators["e" /* getById */])(Task)
], types_Tasks);

const Tasks = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Tasks);
/**
 * Bucket
 */
let types_Bucket = class _Bucket extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get tasks() {
        return Tasks(this);
    }
};
types_Bucket = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["g" /* updateableWithETag */])(),
    Object(decorators["d" /* deleteableWithETag */])()
], types_Bucket);

const Bucket = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Bucket);
/**
 * Buckets
 */
let types_Buckets = class _Buckets extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Bucket.
     *
     * @param name Name of Bucket object.
     * @param planId The Id of the Plan.
     * @param oderHint Hint used to order items of this type in a list view.
     */
    async add(name, planId, orderHint) {
        const postBody = {
            name: name,
            orderHint: orderHint ? orderHint : "",
            planId: planId,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            bucket: this.getById(data.id),
            data,
        };
    }
};
types_Buckets = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("buckets"),
    Object(decorators["e" /* getById */])(Bucket)
], types_Buckets);

const Buckets = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Buckets);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/planner/groups.js



Object(queryable["k" /* addProp */])(types_Group, "plans", Plans, "planner/plans");

// CONCATENATED MODULE: ./node_modules/@pnp/graph/planner/users.js



Object(queryable["k" /* addProp */])(types_User, "tasks", Tasks, "planner/tasks");

// CONCATENATED MODULE: ./node_modules/@pnp/graph/planner/index.js





Reflect.defineProperty(fi_GraphFI.prototype, "planner", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Planner);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/search/types.js





/**
 * Search
 */
let types_Search = class _Search extends graphqueryable["e" /* _GraphQueryableInstance */] {
    executeQuery(request) {
        return Object(operations["d" /* graphPost */])(Search(this, "query"), Object(queryable["l" /* body */])(request));
    }
};
types_Search = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("search")
], types_Search);

const Search = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Search);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/search/index.js



fi_GraphFI.prototype.query = async function (...requests) {
    return this.create(Search).executeQuery({ requests });
};

// EXTERNAL MODULE: ./node_modules/@pnp/graph/shares/types.js
var shares_types = __webpack_require__(10);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/shares/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "shares", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(shares_types["b" /* Shares */]);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/subscriptions/types.js





/**
 * Subscription
 */
let types_Subscription = class _Subscription extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_Subscription = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])(),
    Object(decorators["f" /* updateable */])()
], types_Subscription);

const Subscription = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Subscription);
/**
 * Subscriptions
 */
let types_Subscriptions = class _Subscriptions extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Create a new Subscription.
     *
     * @param changeType Indicates the type of change in the subscribed resource that will raise a notification. The supported values are: created, updated, deleted.
     * @param notificationUrl The URL of the endpoint that will receive the notifications. This URL must make use of the HTTPS protocol.
     * @param resource Specifies the resource that will be monitored for changes. Do not include the base URL (https://graph.microsoft.com/v1.0/).
     * @param expirationDateTime Specifies the date and time when the webhook subscription expires. The time is in UTC.
     * @param props A plain object collection of additional properties you want to set on the new subscription
     *
     */
    async add(changeType, notificationUrl, resource, expirationDateTime, props = {}) {
        const postBody = {
            changeType,
            expirationDateTime,
            notificationUrl,
            resource,
            ...props,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            data,
            subscription: this.getById(data.id),
        };
    }
};
types_Subscriptions = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("subscriptions"),
    Object(decorators["e" /* getById */])(Subscription)
], types_Subscriptions);

const Subscriptions = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Subscriptions);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/subscriptions/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "subscriptions", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Subscriptions);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/teams/types.js






/**
 * Represents a Microsoft Team
 */
let types_Team = class _Team extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get primaryChannel() {
        return Channel(this, "primaryChannel");
    }
    get channels() {
        return Channels(this);
    }
    get installedApps() {
        return InstalledApps(this);
    }
    /**
     * Archives this Team
     *
     * @param shouldSetSpoSiteReadOnlyForMembers Should members have Read-only in associated Team Site
     */
    archive(shouldSetSpoSiteReadOnlyForMembers = false) {
        return Object(operations["d" /* graphPost */])(Team(this, "archive"), Object(queryable["l" /* body */])({ shouldSetSpoSiteReadOnlyForMembers }));
    }
    /**
    * Unarchives this Team
    */
    unarchive() {
        return Object(operations["d" /* graphPost */])(Team(this, "unarchive"));
    }
    /**
     * Clones this Team
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param partsToClone Parts to clone ex: apps,tabs,settings,channels,members
     * @param visibility Set visibility to public or private
     */
    async cloneTeam(name, description = "", partsToClone = "apps,tabs,settings,channels,members", visibility = "private") {
        const postBody = {
            description: description ? description : "",
            displayName: name,
            mailNickname: name,
            partsToClone,
            visibility,
        };
        // TODO:: make sure this works
        const creator = Teams(this, "clone").using((instance) => {
            instance.on.parse(async (url, response, result) => {
                result = response.headers.has("location") ? response.headers : response;
                return [url, response, result];
            });
            return instance;
        });
        const data = await Object(operations["d" /* graphPost */])(creator, Object(queryable["l" /* body */])(postBody));
        const result = { teamId: "", operationId: "" };
        if (data.has("location")) {
            const location = data.get("location");
            const locationArray = location.split("/");
            if (locationArray.length === 3) {
                result.teamId = locationArray[1].substring(locationArray[1].indexOf("'") + 1, locationArray[1].lastIndexOf("'"));
                result.operationId = locationArray[2].substring(locationArray[2].indexOf("'") + 1, locationArray[2].lastIndexOf("'"));
            }
        }
        return result;
    }
    getOperationById(id) {
        return Object(graphqueryable["c" /* GraphQueryableInstance */])(this, `operations/${id}`)();
    }
};
types_Team = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("team"),
    Object(decorators["f" /* updateable */])()
], types_Team);

const Team = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Team);
/**
 * Teams
 */
let types_Teams = class _Teams extends graphqueryable["d" /* _GraphQueryableCollection */] {
    async create(team) {
        const creator = Teams(this, null).using(Object(queryable["f" /* HeaderParse */])());
        const data = await Object(operations["d" /* graphPost */])(creator, Object(queryable["l" /* body */])(team));
        const result = { teamId: "", operationId: "" };
        if (data.has("location")) {
            const location = data.get("location");
            const locationArray = location.split("/");
            if (locationArray.length === 3) {
                result.teamId = locationArray[1].substring(locationArray[1].indexOf("'") + 1, locationArray[1].lastIndexOf("'"));
                result.operationId = locationArray[2].substring(locationArray[2].indexOf("'") + 1, locationArray[2].lastIndexOf("'"));
            }
        }
        return result;
    }
};
types_Teams = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("teams"),
    Object(decorators["e" /* getById */])(Team)
], types_Teams);

const Teams = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Teams);
/**
 * Channel
 */
class types_Channel extends graphqueryable["e" /* _GraphQueryableInstance */] {
    get tabs() {
        return Tabs(this);
    }
    get messages() {
        return graph_teams_types_Messages(this);
    }
}
const Channel = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Channel);
/**
 * Channels
 */
let types_Channels = class _Channels extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Creates a new Channel in the Team
     * @param displayName The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    async add(displayName, description = "") {
        const postBody = {
            description,
            displayName,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            channel: this.getById(data.id),
            data,
        };
    }
};
types_Channels = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("channels"),
    Object(decorators["e" /* getById */])(Channel)
], types_Channels);

const Channels = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Channels);
/**
 * Channel
 */
class teams_types_Message extends graphqueryable["e" /* _GraphQueryableInstance */] {
}
const graph_teams_types_Message = Object(graphqueryable["f" /* graphInvokableFactory */])(teams_types_Message);
/**
 * Channels
 */
let teams_types_Messages = class _Messages extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Creates a new Channel in the Team
     * @param displayName The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    async add(displayName, description = "") {
        const postBody = {
            description,
            displayName,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            message: this.getById(data.id),
            data,
        };
    }
};
teams_types_Messages = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("messages"),
    Object(decorators["e" /* getById */])(graph_teams_types_Message)
], teams_types_Messages);

const graph_teams_types_Messages = Object(graphqueryable["f" /* graphInvokableFactory */])(teams_types_Messages);
/**
 * Tab
 */
let types_Tab = class _Tab extends graphqueryable["e" /* _GraphQueryableInstance */] {
};
types_Tab = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("tab"),
    Object(decorators["f" /* updateable */])(),
    Object(decorators["c" /* deleteable */])()
], types_Tab);

const Tab = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Tab);
/**
 * Tabs
 */
let types_Tabs = class _Tabs extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Adds a tab to the channel
     * @param name The name of the new Tab
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     * @param tabsConfiguration visit https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/teamstab_add for reference
     */
    async add(name, appUrl, properties) {
        const postBody = {
            displayName: name,
            "teamsApp@odata.bind": appUrl,
            ...properties,
        };
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])(postBody));
        return {
            data,
            tab: this.getById(data.id),
        };
    }
};
types_Tabs = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("tabs"),
    Object(decorators["e" /* getById */])(Tab)
], types_Tabs);

const Tabs = Object(graphqueryable["f" /* graphInvokableFactory */])(types_Tabs);
/**
 * InstalledApp
 */
let types_InstalledApp = class _InstalledApp extends graphqueryable["e" /* _GraphQueryableInstance */] {
    upgrade() {
        return Object(operations["d" /* graphPost */])(InstalledApp(this, "upgrade"));
    }
};
types_InstalledApp = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["c" /* deleteable */])()
], types_InstalledApp);

const InstalledApp = Object(graphqueryable["f" /* graphInvokableFactory */])(types_InstalledApp);
/**
 * InstalledApps
 */
let types_InstalledApps = class _InstalledApps extends graphqueryable["d" /* _GraphQueryableCollection */] {
    /**
     * Adds an installed app to the collection
     * @param teamsAppId The id of the app to add.
     */
    async add(teamsAppId) {
        const data = await Object(operations["d" /* graphPost */])(this, Object(queryable["l" /* body */])({
            "teamsApp@odata.bind": teamsAppId,
        }));
        return {
            data,
            app: this.getById(data.id),
        };
    }
};
types_InstalledApps = Object(tslib_es6["a" /* __decorate */])([
    Object(decorators["b" /* defaultPath */])("installedApps"),
    Object(decorators["e" /* getById */])(InstalledApp)
], types_InstalledApps);

const InstalledApps = Object(graphqueryable["f" /* graphInvokableFactory */])(types_InstalledApps);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/teams/users.js



Object(queryable["k" /* addProp */])(types_User, "joinedTeams", Teams);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/teams/index.js







Object(queryable["k" /* addProp */])(types_Group, "team", Team);
types_Group.prototype.createTeam = async function (props) {
    const data = await Object(operations["e" /* graphPut */])(Group(this, "team"), Object(queryable["l" /* body */])(props));
    return {
        data,
        team: this.team,
    };
};
Reflect.defineProperty(fi_GraphFI.prototype, "teams", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Teams);
    },
});

// CONCATENATED MODULE: ./node_modules/@pnp/graph/users/index.js



Reflect.defineProperty(fi_GraphFI.prototype, "me", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(User, "me");
    },
});
Reflect.defineProperty(fi_GraphFI.prototype, "users", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Users);
    },
});

// EXTERNAL MODULE: ./node_modules/@pnp/graph/behaviors/consistency-level.js
var consistency_level = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@pnp/core/index.js + 7 modules
var core = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/@pnp/graph/behaviors/telemetry.js
function Telemetry() {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            init.headers = { ...init.headers, SdkVersion: "PnPCoreJS/3.17.0" };
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/dot-notation
            this.log(`Request Tag: ${init.headers["SdkVersion"]}`, 0);
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/behaviors/defaults.js



function DefaultInit(graphUrl = "https://graph.microsoft.com/v1.0") {
    return (instance) => {
        instance.using(Telemetry(), Object(queryable["i" /* RejectOnError */])(), Object(queryable["j" /* ResolveOnData */])());
        instance.on.pre(async (url, init, result) => {
            init.cache = "default";
            init.credentials = "same-origin";
            if (!Object(core["o" /* isUrlAbsolute */])(url)) {
                url = Object(core["f" /* combine */])(graphUrl, url);
            }
            return [url, init, result];
        });
        return instance;
    };
}
function DefaultHeaders() {
    return (instance) => {
        instance
            .using(Object(queryable["g" /* InjectHeaders */])({
            "Content-Type": "application/json",
        }));
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/behaviors/graphbrowser.js



function GraphBrowser(props) {
    if ((props === null || props === void 0 ? void 0 : props.baseUrl) && !Object(core["o" /* isUrlAbsolute */])(props.baseUrl)) {
        throw Error("GraphBrowser props.baseUrl must be absolute when supplied.");
    }
    return (instance) => {
        instance.using(DefaultHeaders(), DefaultInit(), Object(queryable["b" /* BrowserFetchWithRetry */])(), Object(queryable["e" /* DefaultParse */])());
        if (props === null || props === void 0 ? void 0 : props.baseUrl) {
            // we want to fix up the url first
            instance.on.pre.prepend(async (url, init, result) => {
                if (!Object(core["o" /* isUrlAbsolute */])(url)) {
                    url = Object(core["f" /* combine */])(props.baseUrl, url);
                }
                return [url, init, result];
            });
        }
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/behaviors/spfx.js


function SPFxToken(context) {
    return (instance) => {
        instance.on.auth.replace(async function (url, init) {
            const provider = await context.aadTokenProviderFactory.getTokenProvider();
            const token = await provider.getToken(`${url.protocol}//${url.hostname}`);
            // eslint-disable-next-line @typescript-eslint/dot-notation
            init.headers["Authorization"] = `Bearer ${token}`;
            return [url, init];
        });
        return instance;
    };
}
function SPFx(context) {
    return (instance) => {
        instance.using(DefaultHeaders(), DefaultInit(), Object(queryable["b" /* BrowserFetchWithRetry */])(), Object(queryable["e" /* DefaultParse */])(), SPFxToken(context));
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/graph/index.js











// CONCATENATED MODULE: ./node_modules/@pnp/graph/presets/all.js










































// CONCATENATED MODULE: ./pnpjs-sources/index-graph.ts



/***/ })
/******/ ]);
});