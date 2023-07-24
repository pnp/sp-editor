(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp.sp-admin"] = factory();
	else
		root["pnp.sp-admin"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "SharingCapabilities", function() { return /* reexport */ SharingCapabilities; });
__webpack_require__.d(__webpack_exports__, "ImageTaggingChoice", function() { return /* reexport */ ImageTaggingChoice; });
__webpack_require__.d(__webpack_exports__, "AzureSubscriptionState", function() { return /* reexport */ AzureSubscriptionState; });
__webpack_require__.d(__webpack_exports__, "SPResilienceModeType", function() { return /* reexport */ SPResilienceModeType; });
__webpack_require__.d(__webpack_exports__, "SharingDomainRestrictionModes", function() { return /* reexport */ SharingDomainRestrictionModes; });
__webpack_require__.d(__webpack_exports__, "SharingLinkType", function() { return /* reexport */ SharingLinkType; });
__webpack_require__.d(__webpack_exports__, "AnonymousLinkType", function() { return /* reexport */ AnonymousLinkType; });
__webpack_require__.d(__webpack_exports__, "SharingState", function() { return /* reexport */ SharingState; });
__webpack_require__.d(__webpack_exports__, "BlockDownloadLinksFileTypes", function() { return /* reexport */ BlockDownloadLinksFileTypes; });
__webpack_require__.d(__webpack_exports__, "SharingScope", function() { return /* reexport */ SharingScope; });
__webpack_require__.d(__webpack_exports__, "SPOConditionalAccessPolicyType", function() { return /* reexport */ SPOConditionalAccessPolicyType; });
__webpack_require__.d(__webpack_exports__, "SPOLimitedAccessFileType", function() { return /* reexport */ SPOLimitedAccessFileType; });
__webpack_require__.d(__webpack_exports__, "Workflows2013State", function() { return /* reexport */ Workflows2013State; });
__webpack_require__.d(__webpack_exports__, "TenantBrowseUserInfoPolicyValue", function() { return /* reexport */ TenantBrowseUserInfoPolicyValue; });
__webpack_require__.d(__webpack_exports__, "MediaTranscriptionPolicyType", function() { return /* reexport */ MediaTranscriptionPolicyType; });
__webpack_require__.d(__webpack_exports__, "SPOTenantCdnType", function() { return /* reexport */ SPOTenantCdnType; });
__webpack_require__.d(__webpack_exports__, "SPOrgAssetType", function() { return /* reexport */ SPOrgAssetType; });
__webpack_require__.d(__webpack_exports__, "SPOTenantCdnPolicyType", function() { return /* reexport */ SPOTenantCdnPolicyType; });
__webpack_require__.d(__webpack_exports__, "SortOrder", function() { return /* reexport */ SortOrder; });
__webpack_require__.d(__webpack_exports__, "ImportProfilePropertiesUserIdTypes", function() { return /* reexport */ ImportProfilePropertiesUserIdTypes; });
__webpack_require__.d(__webpack_exports__, "ImportProfilePropertiesJobState", function() { return /* reexport */ ImportProfilePropertiesJobState; });
__webpack_require__.d(__webpack_exports__, "SPOUserSessionRevocationState", function() { return /* reexport */ SPOUserSessionRevocationState; });
__webpack_require__.d(__webpack_exports__, "SpoSiteLockState", function() { return /* reexport */ SpoSiteLockState; });
__webpack_require__.d(__webpack_exports__, "TeamsChannelTypeValue", function() { return /* reexport */ TeamsChannelTypeValue; });
__webpack_require__.d(__webpack_exports__, "DenyAddAndCustomizePagesStatus", function() { return /* reexport */ DenyAddAndCustomizePagesStatus; });
__webpack_require__.d(__webpack_exports__, "RestrictedToRegion", function() { return /* reexport */ RestrictedToRegion; });
__webpack_require__.d(__webpack_exports__, "PWAEnabledStatus", function() { return /* reexport */ PWAEnabledStatus; });
__webpack_require__.d(__webpack_exports__, "CompanyWideSharingLinksPolicy", function() { return /* reexport */ CompanyWideSharingLinksPolicy; });
__webpack_require__.d(__webpack_exports__, "AppViewsPolicy", function() { return /* reexport */ AppViewsPolicy; });
__webpack_require__.d(__webpack_exports__, "FlowsPolicy", function() { return /* reexport */ FlowsPolicy; });
__webpack_require__.d(__webpack_exports__, "SharingPermissionType", function() { return /* reexport */ SharingPermissionType; });
__webpack_require__.d(__webpack_exports__, "SiteUserInfoVisibilityPolicyValue", function() { return /* reexport */ SiteUserInfoVisibilityPolicyValue; });
__webpack_require__.d(__webpack_exports__, "SpecialCharactersState", function() { return /* reexport */ SpecialCharactersState; });
__webpack_require__.d(__webpack_exports__, "SensitiveByDefaultState", function() { return /* reexport */ SensitiveByDefaultState; });
__webpack_require__.d(__webpack_exports__, "PersonalSiteFilter", function() { return /* reexport */ PersonalSiteFilter; });
__webpack_require__.d(__webpack_exports__, "ResultStatus", function() { return /* reexport */ ResultStatus; });
__webpack_require__.d(__webpack_exports__, "SPOHubSiteUserRights", function() { return /* reexport */ SPOHubSiteUserRights; });
__webpack_require__.d(__webpack_exports__, "Office365Tenant", function() { return /* reexport */ Office365Tenant; });
__webpack_require__.d(__webpack_exports__, "Admin", function() { return /* reexport */ Admin; });

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
function operations_op(q, operation, init) {
    return Reflect.apply(operation, q, [init]);
}

// CONCATENATED MODULE: ./node_modules/@pnp/queryable/invokable.js


/**
 * Allows a decorated object to be invoked as a function, optionally providing an implementation for that action
 *
 * @param invokeableAction Optional. The logic to execute upon invoking the object as a function.
 * @returns Decorator which applies the invokable logic to the tagged class
 */
function invokable(invokeableAction) {
    if (!isFunc(invokeableAction)) {
        invokeableAction = function (init) {
            return operations_op(this, get, init);
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
    construct: lifecycle(),
    pre: asyncReduce(),
    auth: asyncReduce(),
    send: request(),
    parse: asyncReduce(),
    post: asyncReduce(),
    data: broadcast(),
};
let queryable_Queryable = class Queryable extends timeline_Timeline {
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
        this.moments[this.InternalPromise] = reduce();
        let parent;
        if (typeof init === "string") {
            this._url = combine(init, path);
        }
        else if (isArray(init)) {
            if (init.length !== 2) {
                throw Error("When using the tuple param exactly two arguments are expected.");
            }
            if (typeof init[1] !== "string") {
                throw Error("Expected second tuple param to be a string.");
            }
            parent = init[0];
            this._url = combine(init[1], path);
        }
        else {
            parent = init;
            this._url = combine(parent._url, path);
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
        if (!stringIsNullOrEmpty(query)) {
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
            const requestId = getGUID();
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
    extendable(),
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
    return Object.assign({ body: jsS(o) }, previous);
}
/**
 * Adds headers to an new/existing RequestInit
 *
 * @param o Headers to add
 * @param previous Any previous partial RequestInit
 * @returns RequestInit combining previous and specified headers
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function request_builders_headers(o, previous) {
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
    return parseBinderWithErrorCheck(r => isFunc(r.arrayBuffer) ? r.arrayBuffer() : r.buffer());
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
    if (hOP(json, "d")) {
        if (hOP(json.d, "results")) {
            result = json.d.results;
        }
        else {
            result = json.d;
        }
    }
    else if (hOP(json, "value")) {
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
                        await delay(wait);
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
                    this.on.post(noInherit(async function (url, result) {
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
const storage = new PnPClientStorage();
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
        keyFactory: (url) => getHashCode(url.toLowerCase()).toString(),
        expireFunc: () => dateAdd(new Date(), "minute", 5),
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
            if (objectDefinedNotNull(cached)) {
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
                this.on.post(noInherit(async function (url, result) {
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
    if (isArray(scope === null || scope === void 0 ? void 0 : scope.actions)) {
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
    const id = getGUID();
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
                const parent = isArray(init) ? init[0] : init;
                if (Reflect.has(parent, ScopeId)) {
                    // ensure we carry over the scope id to the new instance from the parent
                    this[ScopeId] = parent[ScopeId];
                }
                // define the moment's implementation
                this.moments[MomentName] = asyncBroadcast();
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
            if (objectDefinedNotNull(existingScope)) {
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
            if (objectDefinedNotNull(existingScope)) {
                if (!isArray(existingScope.actions)) {
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










// CONCATENATED MODULE: ./node_modules/@pnp/sp/operations.js

const spGet = (o, init) => {
    return operations_op(o, get, init);
};
const spPost = (o, init) => operations_op(o, post, init);
const spPostMerge = (o, init) => {
    init = init || {};
    init.headers = { ...init.headers, "X-HTTP-Method": "MERGE" };
    return spPost(o, init);
};
const spPostDelete = (o, init) => {
    init = init || {};
    init.headers = { ...init.headers || {}, "X-HTTP-Method": "DELETE" };
    return spPost(o, init);
};
const spPostDeleteETag = (o, init, eTag = "*") => {
    init = init || {};
    init.headers = { ...init.headers || {}, "IF-Match": eTag };
    return spPostDelete(o, init);
};
const spDelete = (o, init) => operations_op(o, del, init);
const spPatch = (o, init) => operations_op(o, patch, init);

// CONCATENATED MODULE: ./node_modules/@pnp/sp/spqueryable.js



const spInvokableFactory = (f) => {
    return queryableFactory(f);
};
/**
 * SharePointQueryable Base Class
 *
 */
class spqueryable_SPQueryable extends queryable_Queryable {
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param base A string or SharePointQueryable that should form the base part of the url
     *
     */
    constructor(base, path) {
        if (typeof base === "string") {
            let url = "";
            let parentUrl = "";
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            if (isUrlAbsolute(base) || base.lastIndexOf("/") < 0) {
                parentUrl = base;
                url = combine(base, path);
            }
            else if (base.lastIndexOf("/") > base.lastIndexOf("(")) {
                // .../items(19)/fields
                const index = base.lastIndexOf("/");
                parentUrl = base.slice(0, index);
                path = combine(base.slice(index), path);
                url = combine(parentUrl, path);
            }
            else {
                // .../items(19)
                const index = base.lastIndexOf("(");
                parentUrl = base.slice(0, index);
                url = combine(base, path);
            }
            // init base with corrected string value
            super(url);
            this.parentUrl = parentUrl;
        }
        else {
            super(base, path);
            const q = isArray(base) ? base[0] : base;
            this.parentUrl = isArray(base) ? base[1] : q.toUrl();
            const target = q.query.get("@target");
            if (objectDefinedNotNull(target)) {
                this.query.set("@target", target);
            }
        }
    }
    /**
     * Gets the full url with query information
     */
    toRequestUrl() {
        const aliasedParams = new URLSearchParams(this.query);
        // this regex is designed to locate aliased parameters within url paths. These may have the form:
        // /something(!@p1::value)
        // /something(!@p1::value, param=value)
        // /something(param=value,!@p1::value)
        // /something(param=value,!@p1::value,param=value)
        // /something(param=!@p1::value)
        // there could be spaces or not around the boundaries
        let url = this.toUrl().replace(/([( *| *, *| *= *])'!(@.*?)::(.*?)'([ *)| *, *])/ig, (match, frontBoundary, labelName, value, endBoundary) => {
            this.log(`Rewriting aliased parameter from match ${match} to label: ${labelName} value: ${value}`, 0);
            aliasedParams.set(labelName, `'${value}'`);
            return `${frontBoundary}${labelName}${endBoundary}`;
        });
        const query = aliasedParams.toString();
        if (!stringIsNullOrEmpty(query)) {
            url += `${url.indexOf("?") > -1 ? "&" : "?"}${query}`;
        }
        return url;
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
    getParent(factory, path, base = this.parentUrl) {
        const parent = factory([this, base], path);
        const t = "@target";
        if (this.query.has(t)) {
            parent.query.set(t, this.query.get(t));
        }
        return parent;
    }
}
const SPQueryable = spInvokableFactory(spqueryable_SPQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class _SPCollection extends spqueryable_SPQueryable {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
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
        const o = "$orderby";
        const query = this.query.has(o) ? this.query.get(o).split(",") : [];
        query.push(`${orderBy} ${ascending ? "asc" : "desc"}`);
        this.query.set(o, query.join(","));
        return this;
    }
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip) {
        this.query.set("$skip", skip.toString());
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
}
const SPCollection = spInvokableFactory(_SPCollection);
/**
 * Represents an instance that can be selected
 *
 */
class _SPInstance extends spqueryable_SPQueryable {
}
const SPInstance = spInvokableFactory(_SPInstance);
/**
 * Adds the a delete method to the tagged class taking no parameters and calling spPostDelete
 */
function deleteable() {
    return function () {
        return spPostDelete(this);
    };
}
function deleteableWithETag() {
    return function (eTag = "*") {
        return spPostDeleteETag(this, {}, eTag);
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/decorators.js
/**
 * Decorator used to specify the default path for SPQueryable objects
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

// CONCATENATED MODULE: ./node_modules/@pnp/sp/fi.js

class fi_SPFI {
    /**
     * Creates a new instance of the SPFI class
     *
     * @param root Establishes a root url/configuration
     */
    constructor(root = "") {
        this._root = SPQueryable(root);
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
function spfi(root = "") {
    if (typeof root === "object" && !Reflect.has(root, "length")) {
        root = root._root;
    }
    return new fi_SPFI(root);
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/types.js
// reference: https://msdn.microsoft.com/en-us/library/office/dn600183.aspx
const emptyGuid = "00000000-0000-0000-0000-000000000000";
/**
 * Specifies the type of a principal.
 */
var PrincipalType;
(function (PrincipalType) {
    /**
     * Enumeration whose value specifies no principal type.
     */
    PrincipalType[PrincipalType["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies a user as the principal type.
     */
    PrincipalType[PrincipalType["User"] = 1] = "User";
    /**
     * Enumeration whose value specifies a distribution list as the principal type.
     */
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    /**
     * Enumeration whose value specifies a security group as the principal type.
     */
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    /**
     * Enumeration whose value specifies a group as the principal type.
     */
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    /**
     * Enumeration whose value specifies all principal types.
     */
    // eslint-disable-next-line no-bitwise
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType || (PrincipalType = {}));
/**
 * Specifies the source of a principal.
 */
var PrincipalSource;
(function (PrincipalSource) {
    /**
     * Enumeration whose value specifies no principal source.
     */
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies user information list as the principal source.
     */
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    /**
     * Enumeration whose value specifies Active Directory as the principal source.
     */
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    /**
     * Enumeration whose value specifies the current membership provider as the principal source.
     */
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    /**
     * Enumeration whose value specifies the current role provider as the principal source.
     */
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    /**
     * Enumeration whose value specifies all principal sources.
     */
    // eslint-disable-next-line no-bitwise
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (PrincipalSource = {}));
var PageType;
(function (PageType) {
    PageType[PageType["Invalid"] = -1] = "Invalid";
    PageType[PageType["DefaultView"] = 0] = "DefaultView";
    PageType[PageType["NormalView"] = 1] = "NormalView";
    PageType[PageType["DialogView"] = 2] = "DialogView";
    PageType[PageType["View"] = 3] = "View";
    PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
    PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
    PageType[PageType["EditForm"] = 6] = "EditForm";
    PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
    PageType[PageType["NewForm"] = 8] = "NewForm";
    PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
    PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
    PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
})(PageType || (PageType = {}));

// CONCATENATED MODULE: ./node_modules/@pnp/sp/utils/extract-web-url.js

function extractWebUrl(candidateUrl) {
    if (stringIsNullOrEmpty(candidateUrl)) {
        return "";
    }
    let index = candidateUrl.indexOf("_api/");
    if (index < 0) {
        index = candidateUrl.indexOf("_vti_bin/");
    }
    if (index > -1) {
        return candidateUrl.substring(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/utils/file-names.js
// eslint-disable-next-line no-control-regex
const InvalidFileFolderNameCharsOnlineRegex = /["*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
// eslint-disable-next-line no-control-regex
const InvalidFileFolderNameCharsOnPremiseRegex = /["#%*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
/**
 * Checks if file or folder name contains invalid characters
 *
 * @param input File or folder name to check
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns True if contains invalid chars, false otherwise
 */
function containsInvalidFileFolderChars(input, onPremise = false) {
    if (onPremise) {
        return InvalidFileFolderNameCharsOnPremiseRegex.test(input);
    }
    else {
        return InvalidFileFolderNameCharsOnlineRegex.test(input);
    }
}
/**
 * Removes invalid characters from file or folder name
 *
 * @param input File or folder name
 * @param replacer Value that will replace invalid characters
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns File or folder name with replaced invalid characters
 */
function stripInvalidFileFolderChars(input, replacer = "", onPremise = false) {
    if (onPremise) {
        return input.replace(InvalidFileFolderNameCharsOnPremiseRegex, replacer);
    }
    else {
        return input.replace(InvalidFileFolderNameCharsOnlineRegex, replacer);
    }
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/utils/odata-url-from.js


function odataUrlFrom(candidate) {
    const parts = [];
    const s = ["odata.type", "odata.editLink", "__metadata", "odata.metadata", "odata.id"];
    if (hOP(candidate, s[0]) && candidate[s[0]] === "SP.Web") {
        // webs return an absolute url in the id
        if (hOP(candidate, s[4])) {
            parts.push(candidate[s[4]]);
        }
        else if (hOP(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    else {
        if (hOP(candidate, s[3]) && hOP(candidate, s[1])) {
            // we are dealign with minimal metadata (default)
            // some entities return an abosolute url in the editlink while for others it is relative
            // without the _api. This code is meant to handle both situations
            const editLink = isUrlAbsolute(candidate[s[1]]) ? candidate[s[1]].split("_api")[1] : candidate[s[1]];
            parts.push(extractWebUrl(candidate[s[3]]), "_api", editLink);
        }
        else if (hOP(candidate, s[1])) {
            parts.push("_api", candidate[s[1]]);
        }
        else if (hOP(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    if (parts.length < 1) {
        return "";
    }
    return combine(...parts);
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/utils/to-resource-path.js
function toResourcePath(url) {
    return {
        DecodedUrl: url,
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/utils/encode-path-str.js

/**
 * Encodes path portions of SharePoint urls such as decodedUrl=`encodePath(pathStr)`
 *
 * @param value The string path to encode
 * @returns A path encoded for use in SP urls
 */
function encodePath(value) {
    if (stringIsNullOrEmpty(value)) {
        return "";
    }
    // replace all instance of ' with ''
    if (/!(@.*?)::(.*?)/ig.test(value)) {
        return value.replace(/!(@.*?)::(.*)$/ig, (match, labelName, v) => {
            // we do not need to encodeURIComponent v as it will be encoded automatically when it is added as a query string param
            // we do need to double any ' chars
            return `!${labelName}::${v.replace(/'/ig, "''")}`;
        });
    }
    else {
        // because this is a literal path value we encodeURIComponent after doubling any ' chars
        return encodeURIComponent(value.replace(/'/ig, "''"));
    }
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/behaviors/telemetry.js
function Telemetry() {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            let clientTag = "PnPCoreJS:3.17.0:";
            // make our best guess based on url to the method called
            const { pathname } = new URL(url);
            // remove anything before the _api as that is potentially PII and we don't care, just want to get the called path to the REST API
            // and we want to modify any (*) calls at the end such as items(3) and items(344) so we just track "items()"
            clientTag += pathname
                .substring(pathname.indexOf("_api/") + 5)
                .split("/")
                .map((value, index, arr) => index === arr.length - 1 ? value.replace(/\(.*?$/i, "()") : value[0]).join(".");
            if (clientTag.length > 32) {
                clientTag = clientTag.substring(0, 32);
            }
            this.log(`Request Tag: ${clientTag}`, 0);
            init.headers = { ...init.headers, ["X-ClientService-ClientTag"]: clientTag };
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/behaviors/defaults.js


function DefaultInit() {
    return (instance) => {
        instance.on.pre(async (url, init, result) => {
            init.cache = "no-cache";
            init.credentials = "same-origin";
            return [url, init, result];
        });
        instance.using(Telemetry(), RejectOnError(), ResolveOnData());
        return instance;
    };
}
function DefaultHeaders() {
    return (instance) => {
        instance
            .using(InjectHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
        }));
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/node_modules/tslib/tslib.es6.js
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

var tslib_es6_extendStatics = function(d, b) {
    tslib_es6_extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return tslib_es6_extendStatics(d, b);
};

function tslib_es6_extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    tslib_es6_extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var tslib_es6_assign = function() {
    tslib_es6_assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return tslib_es6_assign.apply(this, arguments);
}

function tslib_es6_rest(s, e) {
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

function tslib_es6_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function tslib_es6_param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function tslib_es6_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function tslib_es6_awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function tslib_es6_generator(thisArg, body) {
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

var tslib_es6_createBinding = Object.create ? (function(o, m, k, k2) {
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

function tslib_es6_exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) tslib_es6_createBinding(o, m, p);
}

function tslib_es6_values(o) {
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

function tslib_es6_read(o, n) {
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
function tslib_es6_spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(tslib_es6_read(arguments[i]));
    return ar;
}

/** @deprecated */
function tslib_es6_spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function tslib_es6_spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function tslib_es6_await(v) {
    return this instanceof tslib_es6_await ? (this.v = v, this) : new tslib_es6_await(v);
}

function tslib_es6_asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof tslib_es6_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function tslib_es6_asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: tslib_es6_await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function tslib_es6_asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof tslib_es6_values === "function" ? tslib_es6_values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function tslib_es6_makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var tslib_es6_setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function tslib_es6_importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) tslib_es6_createBinding(result, mod, k);
    tslib_es6_setModuleDefault(result, mod);
    return result;
}

function tslib_es6_importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function tslib_es6_classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function tslib_es6_classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function tslib_es6_classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/webs/types.js









let types_Webs = class _Webs extends _SPCollection {
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The new web's description
     * @param template The new web's template internal name (default = STS)
     * @param language The locale id that specifies the new web's language (default = 1033 [English, US])
     * @param inheritPermissions When true, permissions will be inherited from the new web's parent (default = true)
     */
    async add(Title, Url, Description = "", WebTemplate = "STS", Language = 1033, UseSamePermissionsAsParentSite = true) {
        const postBody = body({
            "parameters": {
                Description,
                Language,
                Title,
                Url,
                UseSamePermissionsAsParentSite,
                WebTemplate,
            },
        });
        const data = await spPost(Webs(this, "add"), postBody);
        return {
            data,
            web: Web([this, odataUrlFrom(data).replace(/_api\/web\/?/i, "")]),
        };
    }
};
types_Webs = tslib_es6_decorate([
    defaultPath("webs")
], types_Webs);

const Webs = spInvokableFactory(types_Webs);
/**
 * Ensures the url passed to the constructor is correctly rebased to a web url
 *
 * @param candidate The candidate web url
 * @param path The caller supplied path, which may contain _api, meaning we don't append _api/web
 */
function rebaseWebUrl(candidate, path) {
    let replace = "_api/web";
    // this allows us to both:
    // - test if `candidate` already has an api path
    // - ensure that we append the correct one as sometimes a web is not defined
    //   by _api/web, in the case of _api/site/rootweb for example
    const matches = /(_api[/|\\](site|web))/i.exec(candidate);
    if ((matches === null || matches === void 0 ? void 0 : matches.length) > 0) {
        // we want just the base url part (before the _api)
        candidate = extractWebUrl(candidate);
        // we want to ensure we put back the correct string
        replace = matches[1];
    }
    // we only need to append the _api part IF `path` doesn't already include it.
    if ((path === null || path === void 0 ? void 0 : path.indexOf("_api")) < 0) {
        candidate = combine(candidate, replace);
    }
    return candidate;
}
/**
 * Describes a web
 *
 */
let types_Web = class _Web extends _SPInstance {
    constructor(base, path) {
        if (typeof base === "string") {
            base = rebaseWebUrl(base, path);
        }
        else if (isArray(base)) {
            base = [base[0], rebaseWebUrl(base[1], path)];
        }
        else {
            base = [base, rebaseWebUrl(base.toUrl(), path)];
        }
        super(base, path);
        this.delete = deleteable();
    }
    /**
     * Gets this web's subwebs
     *
     */
    get webs() {
        return Webs(this);
    }
    /**
     * Allows access to the web's all properties collection
     */
    get allProperties() {
        return SPInstance(this, "allproperties");
    }
    /**
     * Gets a collection of WebInfos for this web's subwebs
     *
     */
    get webinfos() {
        return SPCollection(this, "webinfos");
    }
    /**
     * Gets this web's parent web and data
     *
     */
    async getParentWeb() {
        const { Url, ParentWeb } = await this.select("Url", "ParentWeb/ServerRelativeUrl").expand("ParentWeb")();
        if (ParentWeb === null || ParentWeb === void 0 ? void 0 : ParentWeb.ServerRelativeUrl) {
            return Web([this, combine((new URL(Url)).origin, ParentWeb.ServerRelativeUrl)]);
        }
        return null;
    }
    /**
     * Updates this web instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    async update(properties) {
        return spPostMerge(this, body(properties));
    }
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site
     *
     * @param colorPaletteUrl The server-relative URL of the color palette file
     * @param fontSchemeUrl The server-relative URL of the font scheme
     * @param backgroundImageUrl The server-relative URL of the background image
     * @param shareGenerated When true, the generated theme files are stored in the root site. When false, they are stored in this web
     */
    applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
        const postBody = body({
            backgroundImageUrl,
            colorPaletteUrl,
            fontSchemeUrl,
            shareGenerated,
        });
        return spPost(Web(this, "applytheme"), postBody);
    }
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it
     *
     * @param template Name of the site definition or the name of the site template
     */
    applyWebTemplate(template) {
        return spPost(Web(this, `applywebtemplate(webTemplate='${encodePath(template)}')`));
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query) {
        return spPost(Web(this, "getchanges"), body({ query }));
    }
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1 (default = 0)
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    mapToIcon(filename, size = 0, progId = "") {
        return Web(this, `maptoicon(filename='${encodePath(filename)}',progid='${encodePath(progId)}',size=${size})`)();
    }
    /**
     * Returns the tenant property corresponding to the specified key in the app catalog site
     *
     * @param key Id of storage entity to be set
     */
    getStorageEntity(key) {
        return Web(this, `getStorageEntity('${encodePath(key)}')`)();
    }
    /**
     * This will set the storage entity identified by the given key (MUST be called in the context of the app catalog)
     *
     * @param key Id of storage entity to be set
     * @param value Value of storage entity to be set
     * @param description Description of storage entity to be set
     * @param comments Comments of storage entity to be set
     */
    setStorageEntity(key, value, description = "", comments = "") {
        return spPost(Web(this, "setStorageEntity"), body({
            comments,
            description,
            key,
            value,
        }));
    }
    /**
     * This will remove the storage entity identified by the given key
     *
     * @param key Id of storage entity to be removed
     */
    removeStorageEntity(key) {
        return spPost(Web(this, `removeStorageEntity('${encodePath(key)}')`));
    }
    /**
    * Returns a collection of objects that contain metadata about subsites of the current site in which the current user is a member.
    *
    * @param nWebTemplateFilter Specifies the site definition (default = -1)
    * @param nConfigurationFilter A 16-bit integer that specifies the identifier of a configuration (default = -1)
    */
    getSubwebsFilteredForCurrentUser(nWebTemplateFilter = -1, nConfigurationFilter = -1) {
        return SPCollection(this, `getSubwebsFilteredForCurrentUser(nWebTemplateFilter=${nWebTemplateFilter},nConfigurationFilter=${nConfigurationFilter})`);
    }
    /**
     * Returns a collection of site templates available for the site
     *
     * @param language The locale id of the site templates to retrieve (default = 1033 [English, US])
     * @param includeCrossLanguage When true, includes language-neutral site templates; otherwise false (default = true)
     */
    availableWebTemplates(language = 1033, includeCrossLanugage = true) {
        return SPCollection(this, `getavailablewebtemplates(lcid=${language},doincludecrosslanguage=${includeCrossLanugage})`);
    }
};
types_Web = tslib_es6_decorate([
    defaultPath("_api/web")
], types_Web);

const Web = spInvokableFactory(types_Web);

// CONCATENATED MODULE: ./node_modules/@pnp/sp/batching.js






fi_SPFI.prototype.batched = function (props) {
    const batched = spfi(this);
    const [behavior, execute] = createBatch(batched._root, props);
    batched.using(behavior);
    return [batched, execute];
};
types_Web.prototype.batched = function (props) {
    const batched = Web(this);
    const [behavior, execute] = createBatch(batched, props);
    batched.using(behavior);
    return [batched, execute];
};
/**
 * Tracks on a batched instance that registration is complete (the child request has gotten to the send moment and the request is included in the batch)
 */
const RegistrationCompleteSym = Symbol.for("batch_registration");
/**
 * Tracks on a batched instance that the child request timeline lifecycle is complete (called in child.dispose)
 */
const RequestCompleteSym = Symbol.for("batch_request");
/**
 * Special batch parsing behavior used to convert the batch response text into a set of Response objects for each request
 * @returns A parser behavior
 */
function BatchParse() {
    return parseBinderWithErrorCheck(async (response) => {
        const text = await response.text();
        return parseResponse(text);
    });
}
/**
 * Internal class used to execute the batch request through the timeline lifecycle
 */
class batching_BatchQueryable extends spqueryable_SPQueryable {
    constructor(base, requestBaseUrl = base.toUrl().replace(/_api[\\|/].*$/i, "")) {
        super(requestBaseUrl, "_api/$batch");
        this.requestBaseUrl = requestBaseUrl;
        // this will copy over the current observables from the base associated with this batch
        // this will replace any other parsing present
        this.using(CopyFrom(base, "replace"), BatchParse());
        this.on.dispose(() => {
            // there is a code path where you may invoke a batch, say on items.add, whose return
            // is an object like { data: any, item: IItem }. The expectation from v1 on is `item` in that object
            // is immediately usable to make additional queries. Without this step when that IItem instance is
            // created using "this.getById" within IITems.add all of the current observers of "this" are
            // linked to the IItem instance created (expected), BUT they will be the set of observers setup
            // to handle the batch, meaning invoking `item` will result in a half batched call that
            // doesn't really work. To deliver the expected functionality we "reset" the
            // observers using the original instance, mimicing the behavior had
            // the IItem been created from that base without a batch involved. We use CopyFrom to ensure
            // that we maintain the references to the InternalResolve and InternalReject events through
            // the end of this timeline lifecycle. This works because CopyFrom by design uses Object.keys
            // which ignores symbol properties.
            base.using(CopyFrom(this, "replace", (k) => /(auth|send|pre|init)/i.test(k)));
        });
    }
}
/**
 * Creates a batched version of the supplied base, meaning that all chained fluent operations from the new base are part of the batch
 *
 * @param base The base from which to initialize the batch
 * @param props Any properties used to initialize the batch functionality
 * @returns A tuple of [behavior used to assign objects to the batch, the execute function used to resolve the batch requests]
 */
function createBatch(base, props) {
    const registrationPromises = [];
    const completePromises = [];
    const requests = [];
    const batchId = getGUID();
    const batchQuery = new batching_BatchQueryable(base);
    // this query is used to copy back the behaviors after the batch executes
    // it should not manipulated or have behaviors added.
    const refQuery = new batching_BatchQueryable(base);
    const { headersCopyPattern } = {
        headersCopyPattern: /Accept|Content-Type|IF-Match/i,
        ...props,
    };
    const execute = async () => {
        await Promise.all(registrationPromises);
        if (requests.length < 1) {
            // even if we have no requests we need to await the complete promises to ensure
            // that execute only resolves AFTER every child request disposes #2457
            // this likely means caching is being used, we returned values for all child requests from the cache
            return Promise.all(completePromises).then(() => void (0));
        }
        const batchBody = [];
        let currentChangeSetId = "";
        for (let i = 0; i < requests.length; i++) {
            const [, url, init] = requests[i];
            if (init.method === "GET") {
                if (currentChangeSetId.length > 0) {
                    // end an existing change set
                    batchBody.push(`--changeset_${currentChangeSetId}--\n\n`);
                    currentChangeSetId = "";
                }
                batchBody.push(`--batch_${batchId}\n`);
            }
            else {
                if (currentChangeSetId.length < 1) {
                    // start new change set
                    currentChangeSetId = getGUID();
                    batchBody.push(`--batch_${batchId}\n`);
                    batchBody.push(`Content-Type: multipart/mixed; boundary="changeset_${currentChangeSetId}"\n\n`);
                }
                batchBody.push(`--changeset_${currentChangeSetId}\n`);
            }
            // common batch part prefix
            batchBody.push("Content-Type: application/http\n");
            batchBody.push("Content-Transfer-Encoding: binary\n\n");
            // these are the per-request headers
            const headers = new Headers(init.headers);
            // this is the url of the individual request within the batch
            const reqUrl = isUrlAbsolute(url) ? url : combine(batchQuery.requestBaseUrl, url);
            if (init.method !== "GET") {
                let method = init.method;
                if (headers.has("X-HTTP-Method")) {
                    method = headers.get("X-HTTP-Method");
                    headers.delete("X-HTTP-Method");
                }
                batchBody.push(`${method} ${reqUrl} HTTP/1.1\n`);
            }
            else {
                batchBody.push(`${init.method} ${reqUrl} HTTP/1.1\n`);
            }
            // lastly we apply any default headers we need that may not exist
            if (!headers.has("Accept")) {
                headers.append("Accept", "application/json");
            }
            if (!headers.has("Content-Type")) {
                headers.append("Content-Type", "application/json;charset=utf-8");
            }
            // write headers into batch body
            headers.forEach((value, name) => {
                if (headersCopyPattern.test(name)) {
                    batchBody.push(`${name}: ${value}\n`);
                }
            });
            batchBody.push("\n");
            if (init.body) {
                batchBody.push(`${init.body}\n\n`);
            }
        }
        if (currentChangeSetId.length > 0) {
            // Close the changeset
            batchBody.push(`--changeset_${currentChangeSetId}--\n\n`);
            currentChangeSetId = "";
        }
        batchBody.push(`--batch_${batchId}--\n`);
        const responses = await spPost(batchQuery, {
            body: batchBody.join(""),
            headers: {
                "Content-Type": `multipart/mixed; boundary=batch_${batchId}`,
            },
        });
        if (responses.length !== requests.length) {
            throw Error("Could not properly parse responses to match requests in batch.");
        }
        return new Promise((res, rej) => {
            try {
                for (let index = 0; index < responses.length; index++) {
                    const [, , , resolve, reject] = requests[index];
                    try {
                        resolve(responses[index]);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                // this small delay allows the promises to resolve correctly in order by dropping this resolve behind
                // the other work in the event loop. Feels hacky, but it works so 🤷
                setTimeout(res, 0);
            }
            catch (e) {
                setTimeout(() => rej(e), 0);
            }
        }).then(() => Promise.all(completePromises)).then(() => void (0));
    };
    const register = (instance) => {
        instance.on.init(function () {
            if (isFunc(this[RegistrationCompleteSym])) {
                throw Error("This instance is already part of a batch. Please review the docs at https://pnp.github.io/pnpjs/concepts/batching#reuse.");
            }
            // we need to ensure we wait to start execute until all our batch children hit the .send method to be fully registered
            registrationPromises.push(new Promise((resolve) => {
                this[RegistrationCompleteSym] = resolve;
            }));
            return this;
        });
        instance.on.pre(async function (url, init, result) {
            // Do not add to timeline if using BatchNever behavior
            if (hOP(init.headers, "X-PnP-BatchNever")) {
                // clean up the init operations from the timeline
                // not strictly necessary as none of the logic that uses this should be in the request, but good to keep things tidy
                if (typeof (this[RequestCompleteSym]) === "function") {
                    this[RequestCompleteSym]();
                    delete this[RequestCompleteSym];
                }
                this.using(CopyFrom(refQuery, "replace", (k) => /(init|pre)/i.test(k)));
                return [url, init, result];
            }
            // the entire request will be auth'd - we don't need to run this for each batch request
            this.on.auth.clear();
            // we replace the send function with our batching logic
            this.on.send.replace(async function (url, init) {
                // this is the promise that Queryable will see returned from .emit.send
                const promise = new Promise((resolve, reject) => {
                    // add the request information into the batch
                    requests.push([this, url.toString(), init, resolve, reject]);
                });
                this.log(`[batch:${batchId}] (${(new Date()).getTime()}) Adding request ${init.method} ${url.toString()} to batch.`, 0);
                // we need to ensure we wait to resolve execute until all our batch children have fully completed their request timelines
                completePromises.push(new Promise((resolve) => {
                    this[RequestCompleteSym] = resolve;
                }));
                // indicate that registration of this request is complete
                this[RegistrationCompleteSym]();
                return promise;
            });
            this.on.dispose(function () {
                if (isFunc(this[RegistrationCompleteSym])) {
                    // if this request is in a batch and caching is in play we need to resolve the registration promises to unblock processing of the batch
                    // because the request will never reach the "send" moment as the result is returned from "pre"
                    this[RegistrationCompleteSym]();
                    // remove the symbol props we added for good hygene
                    delete this[RegistrationCompleteSym];
                }
                if (isFunc(this[RequestCompleteSym])) {
                    // let things know we are done with this request
                    this[RequestCompleteSym]();
                    delete this[RequestCompleteSym];
                    // there is a code path where you may invoke a batch, say on items.add, whose return
                    // is an object like { data: any, item: IItem }. The expectation from v1 on is `item` in that object
                    // is immediately usable to make additional queries. Without this step when that IItem instance is
                    // created using "this.getById" within IITems.add all of the current observers of "this" are
                    // linked to the IItem instance created (expected), BUT they will be the set of observers setup
                    // to handle the batch, meaning invoking `item` will result in a half batched call that
                    // doesn't really work. To deliver the expected functionality we "reset" the
                    // observers using the original instance, mimicing the behavior had
                    // the IItem been created from that base without a batch involved. We use CopyFrom to ensure
                    // that we maintain the references to the InternalResolve and InternalReject events through
                    // the end of this timeline lifecycle. This works because CopyFrom by design uses Object.keys
                    // which ignores symbol properties.
                    this.using(CopyFrom(refQuery, "replace", (k) => /(auth|pre|send|init|dispose)/i.test(k)));
                }
            });
            return [url, init, result];
        });
        return instance;
    };
    return [register, execute];
}
/**
 * Behavior that blocks batching for the request regardless of "method"
 *
 * This is used for requests to bypass batching methods. Example - Request Digest where we need to get a request-digest inside of a batch.
 * @returns TimelinePipe
 */
function BatchNever() {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-BatchNever": "1" };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Parses the text body returned by the server from a batch request
 *
 * @param body String body from the server response
 * @returns Parsed response objects
 */
function parseResponse(body) {
    const responses = [];
    const header = "--batchresponse_";
    // Ex. "HTTP/1.1 500 Internal Server Error"
    const statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
    const lines = body.split("\n");
    let state = "batch";
    let status;
    let statusText;
    let headers = {};
    const bodyReader = [];
    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        switch (state) {
            case "batch":
                if (line.substring(0, header.length) === header) {
                    state = "batchHeaders";
                }
                else {
                    if (line.trim() !== "") {
                        throw Error(`Invalid response, line ${i}`);
                    }
                }
                break;
            case "batchHeaders":
                if (line.trim() === "") {
                    state = "status";
                }
                break;
            case "status": {
                const parts = statusRegExp.exec(line);
                if (parts.length !== 3) {
                    throw Error(`Invalid status, line ${i}`);
                }
                status = parseInt(parts[1], 10);
                statusText = parts[2];
                state = "statusHeaders";
                break;
            }
            case "statusHeaders":
                if (line.trim() === "") {
                    state = "body";
                }
                else {
                    const headerParts = line.split(":");
                    if ((headerParts === null || headerParts === void 0 ? void 0 : headerParts.length) === 2) {
                        headers[headerParts[0].trim()] = headerParts[1].trim();
                    }
                }
                break;
            case "body":
                // reset the body reader
                bodyReader.length = 0;
                // this allows us to capture batch bodies that are returned as multi-line (renderListDataAsStream, #2454)
                while (line.substring(0, header.length) !== header) {
                    bodyReader.push(line);
                    line = lines[++i];
                }
                // because we have read the closing --batchresponse_ line, we need to move the line pointer back one
                // so that the logic works as expected either to get the next result or end processing
                i--;
                responses.push(new Response(status === 204 ? null : bodyReader.join(""), { status, statusText, headers }));
                state = "batch";
                headers = {};
                break;
        }
    }
    if (state !== "status") {
        throw Error("Unexpected end of input");
    }
    return responses;
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/behaviors/request-digest.js






function clearExpired(digest) {
    const now = new Date();
    return !objectDefinedNotNull(digest) || (now > digest.expiration) ? null : digest;
}
// allows for the caching of digests across all calls which each have their own IDigestInfo wrapper.
const digests = new Map();
function RequestDigest(hook) {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            // add the request to the auth moment of the timeline
            this.on.auth(async (url, init) => {
                // eslint-disable-next-line max-len
                if (/get/i.test(init.method) || (init.headers && (hOP(init.headers, "X-RequestDigest") || hOP(init.headers, "Authorization") || hOP(init.headers, "X-PnPjs-NoDigest")))) {
                    return [url, init];
                }
                const urlAsString = url.toString();
                const webUrl = extractWebUrl(urlAsString);
                // do we have one in the cache that is still valid
                // from #2186 we need to always ensure the digest we get isn't expired
                let digest = clearExpired(digests.get(webUrl));
                if (!objectDefinedNotNull(digest) && isFunc(hook)) {
                    digest = clearExpired(hook(urlAsString, init));
                }
                if (!objectDefinedNotNull(digest)) {
                    digest = await spPost(SPQueryable([this, combine(webUrl, "_api/contextinfo")]).using(JSONParse(), BatchNever()), {
                        headers: {
                            "X-PnPjs-NoDigest": "1",
                        },
                    }).then(p => ({
                        expiration: dateAdd(new Date(), "second", p.FormDigestTimeoutSeconds),
                        value: p.FormDigestValue,
                    }));
                }
                if (objectDefinedNotNull(digest)) {
                    // if we got a digest, set it in the headers
                    init.headers = {
                        "X-RequestDigest": digest.value,
                        ...init.headers,
                    };
                    // and cache it for future requests
                    digests.set(webUrl, digest);
                }
                return [url, init];
            });
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/behaviors/spbrowser.js




function SPBrowser(props) {
    if ((props === null || props === void 0 ? void 0 : props.baseUrl) && !isUrlAbsolute(props.baseUrl)) {
        throw Error("SPBrowser props.baseUrl must be absolute when supplied.");
    }
    return (instance) => {
        instance.using(DefaultHeaders(), DefaultInit(), BrowserFetchWithRetry(), DefaultParse(), RequestDigest());
        if (isUrlAbsolute(props === null || props === void 0 ? void 0 : props.baseUrl)) {
            // we want to fix up the url first
            instance.on.pre.prepend(async (url, init, result) => {
                if (!isUrlAbsolute(url)) {
                    url = combine(props.baseUrl, url);
                }
                return [url, init, result];
            });
        }
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/behaviors/spfx.js




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
        instance.using(DefaultHeaders(), DefaultInit(), BrowserFetchWithRetry(), DefaultParse(), 
        // remove SPFx Token in default due to issues #2570, #2571
        // SPFxToken(context),
        RequestDigest((url) => {
            var _a, _b, _c;
            const sameWeb = (new RegExp(`^${combine(context.pageContext.web.absoluteUrl, "/_api")}`, "i")).test(url);
            if (sameWeb && ((_b = (_a = context === null || context === void 0 ? void 0 : context.pageContext) === null || _a === void 0 ? void 0 : _a.legacyPageContext) === null || _b === void 0 ? void 0 : _b.formDigestValue)) {
                const creationDateFromDigest = new Date(context.pageContext.legacyPageContext.formDigestValue.split(",")[1]);
                // account for page lifetime in timeout #2304 & others
                // account for tab sleep #2550
                return {
                    value: context.pageContext.legacyPageContext.formDigestValue,
                    expiration: dateAdd(creationDateFromDigest, "second", ((_c = context.pageContext.legacyPageContext) === null || _c === void 0 ? void 0 : _c.formDigestTimeoutSeconds) - 15 || 1585),
                };
            }
        }));
        // we want to fix up the url first
        instance.on.pre.prepend(async (url, init, result) => {
            if (!isUrlAbsolute(url)) {
                url = combine(context.pageContext.web.absoluteUrl, url);
            }
            return [url, init, result];
        });
        return instance;
    };
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp/index.js
















// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/node_modules/tslib/tslib.es6.js
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

var tslib_tslib_es6_extendStatics = function(d, b) {
    tslib_tslib_es6_extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return tslib_tslib_es6_extendStatics(d, b);
};

function tslib_tslib_es6_extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    tslib_tslib_es6_extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var tslib_tslib_es6_assign = function() {
    tslib_tslib_es6_assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return tslib_tslib_es6_assign.apply(this, arguments);
}

function tslib_tslib_es6_rest(s, e) {
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

function tslib_tslib_es6_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function tslib_tslib_es6_param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function tslib_tslib_es6_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function tslib_tslib_es6_awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function tslib_tslib_es6_generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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

var tslib_tslib_es6_createBinding = Object.create ? (function(o, m, k, k2) {
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

function tslib_tslib_es6_exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) tslib_tslib_es6_createBinding(o, m, p);
}

function tslib_tslib_es6_values(o) {
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

function tslib_tslib_es6_read(o, n) {
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
function tslib_tslib_es6_spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(tslib_tslib_es6_read(arguments[i]));
    return ar;
}

/** @deprecated */
function tslib_tslib_es6_spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function tslib_tslib_es6_spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function tslib_tslib_es6_await(v) {
    return this instanceof tslib_tslib_es6_await ? (this.v = v, this) : new tslib_tslib_es6_await(v);
}

function tslib_tslib_es6_asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof tslib_tslib_es6_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function tslib_tslib_es6_asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: tslib_tslib_es6_await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function tslib_tslib_es6_asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof tslib_tslib_es6_values === "function" ? tslib_tslib_es6_values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function tslib_tslib_es6_makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var tslib_tslib_es6_setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function tslib_tslib_es6_importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) tslib_tslib_es6_createBinding(result, mod, k);
    tslib_tslib_es6_setModuleDefault(result, mod);
    return result;
}

function tslib_tslib_es6_importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function tslib_tslib_es6_classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function tslib_tslib_es6_classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function tslib_tslib_es6_classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/types.js
var SharingCapabilities;
(function (SharingCapabilities) {
    /**
     * External user sharing (share by email) and guest link sharing are both disabled for all site collections
     * in the tenancy.  No new external user invitations or sharing links can be created, and any content previously
     * shared becomes inaccessible to external users.
     */
    SharingCapabilities[SharingCapabilities["Disabled"] = 0] = "Disabled";
    /**
     * External user sharing is enabled for the tenancy, but guest link sharing is disabled.  Each individual
     * site collection's sharing properties govern whether the site collection has sharing disabled or allows
     * external user sharing, but a site collection cannot enable guest link sharing.
     */
    SharingCapabilities[SharingCapabilities["ExternalUserSharingOnly"] = 1] = "ExternalUserSharingOnly";
    /**
     * External user sharing and guest link sharing are enabled for the tenancy.  Each individual site
     * collection's sharing properties govern whether the site collection has sharing disabled, allows external user
     * sharing only, or allows both external user sharing and guest link sharing.
     */
    SharingCapabilities[SharingCapabilities["ExternalUserAndGuestSharing"] = 2] = "ExternalUserAndGuestSharing";
    /**
     * External user sharing and guest link sharing are both disabled for the tenancy, but AllowGuestUserSignIn is enabled.
     * Each individual site collection's sharing properties govern whether the site collection has sharing disabled or allows
     * existing external user signing in, but a site collection cannot enable guest link sharing and cannot share with new external users.
     */
    SharingCapabilities[SharingCapabilities["ExistingExternalUserSharingOnly"] = 3] = "ExistingExternalUserSharingOnly";
})(SharingCapabilities || (SharingCapabilities = {}));
var ImageTaggingChoice;
(function (ImageTaggingChoice) {
    ImageTaggingChoice[ImageTaggingChoice["Disabled"] = 1] = "Disabled";
    ImageTaggingChoice[ImageTaggingChoice["Basic"] = 2] = "Basic";
    ImageTaggingChoice[ImageTaggingChoice["Enhanced"] = 3] = "Enhanced";
})(ImageTaggingChoice || (ImageTaggingChoice = {}));
var AzureSubscriptionState;
(function (AzureSubscriptionState) {
    AzureSubscriptionState[AzureSubscriptionState["Unknown"] = 0] = "Unknown";
    AzureSubscriptionState[AzureSubscriptionState["Active"] = 1] = "Active";
    AzureSubscriptionState[AzureSubscriptionState["Deleted"] = 2] = "Deleted";
    AzureSubscriptionState[AzureSubscriptionState["Disabled"] = 3] = "Disabled";
    AzureSubscriptionState[AzureSubscriptionState["Expired"] = 4] = "Expired";
    AzureSubscriptionState[AzureSubscriptionState["PastDue"] = 5] = "PastDue";
    AzureSubscriptionState[AzureSubscriptionState["Warned"] = 6] = "Warned";
})(AzureSubscriptionState || (AzureSubscriptionState = {}));
var SPResilienceModeType;
(function (SPResilienceModeType) {
    SPResilienceModeType[SPResilienceModeType["DefaultAAD"] = 0] = "DefaultAAD";
    SPResilienceModeType[SPResilienceModeType["Enabled"] = 1] = "Enabled";
    SPResilienceModeType[SPResilienceModeType["Disabled"] = 2] = "Disabled";
})(SPResilienceModeType || (SPResilienceModeType = {}));
var SharingDomainRestrictionModes;
(function (SharingDomainRestrictionModes) {
    SharingDomainRestrictionModes[SharingDomainRestrictionModes["None"] = 0] = "None";
    SharingDomainRestrictionModes[SharingDomainRestrictionModes["AllowList"] = 1] = "AllowList";
    SharingDomainRestrictionModes[SharingDomainRestrictionModes["BlockList"] = 2] = "BlockList";
})(SharingDomainRestrictionModes || (SharingDomainRestrictionModes = {}));
var SharingLinkType;
(function (SharingLinkType) {
    SharingLinkType[SharingLinkType["View"] = 0] = "View";
    SharingLinkType[SharingLinkType["Edit"] = 1] = "Edit";
    SharingLinkType[SharingLinkType["Review"] = 2] = "Review";
    SharingLinkType[SharingLinkType["Embed"] = 3] = "Embed";
    SharingLinkType[SharingLinkType["BlocksDownload"] = 4] = "BlocksDownload";
    SharingLinkType[SharingLinkType["CreateOnly"] = 5] = "CreateOnly";
    SharingLinkType[SharingLinkType["AddressBar"] = 6] = "AddressBar";
    SharingLinkType[SharingLinkType["AdminDefault"] = 7] = "AdminDefault";
    SharingLinkType[SharingLinkType["Unknown"] = 8] = "Unknown";
})(SharingLinkType || (SharingLinkType = {}));
var AnonymousLinkType;
(function (AnonymousLinkType) {
    AnonymousLinkType[AnonymousLinkType["None"] = 0] = "None";
    AnonymousLinkType[AnonymousLinkType["View"] = 1] = "View";
    AnonymousLinkType[AnonymousLinkType["Edit"] = 2] = "Edit";
})(AnonymousLinkType || (AnonymousLinkType = {}));
var SharingState;
(function (SharingState) {
    SharingState[SharingState["Unspecified"] = 0] = "Unspecified";
    SharingState[SharingState["On"] = 1] = "On";
    SharingState[SharingState["Off"] = 2] = "Off";
})(SharingState || (SharingState = {}));
var BlockDownloadLinksFileTypes;
(function (BlockDownloadLinksFileTypes) {
    BlockDownloadLinksFileTypes[BlockDownloadLinksFileTypes["WebPreviewableFiles"] = 1] = "WebPreviewableFiles";
    BlockDownloadLinksFileTypes[BlockDownloadLinksFileTypes["ServerRenderedFilesOnly"] = 2] = "ServerRenderedFilesOnly";
})(BlockDownloadLinksFileTypes || (BlockDownloadLinksFileTypes = {}));
var SharingScope;
(function (SharingScope) {
    SharingScope[SharingScope["Anyone"] = 0] = "Anyone";
    SharingScope[SharingScope["Organization"] = 1] = "Organization";
    SharingScope[SharingScope["SpecificPeople"] = 2] = "SpecificPeople";
})(SharingScope || (SharingScope = {}));
var SPOConditionalAccessPolicyType;
(function (SPOConditionalAccessPolicyType) {
    SPOConditionalAccessPolicyType[SPOConditionalAccessPolicyType["AllowFullAccess"] = 0] = "AllowFullAccess";
    SPOConditionalAccessPolicyType[SPOConditionalAccessPolicyType["AllowLimitedAccess"] = 1] = "AllowLimitedAccess";
    SPOConditionalAccessPolicyType[SPOConditionalAccessPolicyType["BlockAccess"] = 2] = "BlockAccess";
    SPOConditionalAccessPolicyType[SPOConditionalAccessPolicyType["AuthenticationContext"] = 3] = "AuthenticationContext";
})(SPOConditionalAccessPolicyType || (SPOConditionalAccessPolicyType = {}));
var SPOLimitedAccessFileType;
(function (SPOLimitedAccessFileType) {
    SPOLimitedAccessFileType[SPOLimitedAccessFileType["OfficeOnlineFilesOnly"] = 0] = "OfficeOnlineFilesOnly";
    SPOLimitedAccessFileType[SPOLimitedAccessFileType["WebPreviewableFiles"] = 1] = "WebPreviewableFiles";
    SPOLimitedAccessFileType[SPOLimitedAccessFileType["OtherFiles"] = 2] = "OtherFiles";
})(SPOLimitedAccessFileType || (SPOLimitedAccessFileType = {}));
var Workflows2013State;
(function (Workflows2013State) {
    Workflows2013State[Workflows2013State["Disabled"] = 0] = "Disabled";
    Workflows2013State[Workflows2013State["Configuring"] = 1] = "Configuring";
    Workflows2013State[Workflows2013State["Enabled"] = 2] = "Enabled";
})(Workflows2013State || (Workflows2013State = {}));
var TenantBrowseUserInfoPolicyValue;
(function (TenantBrowseUserInfoPolicyValue) {
    TenantBrowseUserInfoPolicyValue[TenantBrowseUserInfoPolicyValue["ApplyToNoUsers"] = 0] = "ApplyToNoUsers";
    TenantBrowseUserInfoPolicyValue[TenantBrowseUserInfoPolicyValue["ApplyToGuestAndExternalUsers"] = 1] = "ApplyToGuestAndExternalUsers";
    TenantBrowseUserInfoPolicyValue[TenantBrowseUserInfoPolicyValue["ApplyToInternalUsers"] = 2] = "ApplyToInternalUsers";
    TenantBrowseUserInfoPolicyValue[TenantBrowseUserInfoPolicyValue["ApplyToAllUsers"] = 3] = "ApplyToAllUsers";
})(TenantBrowseUserInfoPolicyValue || (TenantBrowseUserInfoPolicyValue = {}));
var MediaTranscriptionPolicyType;
(function (MediaTranscriptionPolicyType) {
    MediaTranscriptionPolicyType[MediaTranscriptionPolicyType["Enabled"] = 0] = "Enabled";
    MediaTranscriptionPolicyType[MediaTranscriptionPolicyType["Disabled"] = 1] = "Disabled";
})(MediaTranscriptionPolicyType || (MediaTranscriptionPolicyType = {}));
var SPOTenantCdnType;
(function (SPOTenantCdnType) {
    SPOTenantCdnType[SPOTenantCdnType["Public"] = 0] = "Public";
    SPOTenantCdnType[SPOTenantCdnType["Private"] = 1] = "Private";
})(SPOTenantCdnType || (SPOTenantCdnType = {}));
var SPOrgAssetType;
(function (SPOrgAssetType) {
    // The flag for Undefined is 0000.
    SPOrgAssetType[SPOrgAssetType["Undefined"] = 0] = "Undefined";
    // The flag for ImageDocumentLibrary is 0001.
    SPOrgAssetType[SPOrgAssetType["ImageDocumentLibrary"] = 1] = "ImageDocumentLibrary";
    // The flag for OfficeTemplateLibrary is 0010.
    SPOrgAssetType[SPOrgAssetType["OfficeTemplateLibrary"] = 2] = "OfficeTemplateLibrary";
    // The flag for OfficeFontLibrary is 0100.
    SPOrgAssetType[SPOrgAssetType["OfficeFontLibrary"] = 4] = "OfficeFontLibrary";
})(SPOrgAssetType || (SPOrgAssetType = {}));
var SPOTenantCdnPolicyType;
(function (SPOTenantCdnPolicyType) {
    SPOTenantCdnPolicyType[SPOTenantCdnPolicyType["IncludeFileExtensions"] = 0] = "IncludeFileExtensions";
    SPOTenantCdnPolicyType[SPOTenantCdnPolicyType["ExcludeRestrictedSiteClassifications"] = 1] = "ExcludeRestrictedSiteClassifications";
    SPOTenantCdnPolicyType[SPOTenantCdnPolicyType["ExcludeIfNoScriptDisabled"] = 2] = "ExcludeIfNoScriptDisabled";
    SPOTenantCdnPolicyType[SPOTenantCdnPolicyType["ExcludeRestrictedSiteClassificationsFileExtensions"] = 3] = "ExcludeRestrictedSiteClassificationsFileExtensions";
})(SPOTenantCdnPolicyType || (SPOTenantCdnPolicyType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder[SortOrder["Ascending"] = 0] = "Ascending";
    SortOrder[SortOrder["Descending"] = 1] = "Descending";
})(SortOrder || (SortOrder = {}));
var ImportProfilePropertiesUserIdTypes;
(function (ImportProfilePropertiesUserIdTypes) {
    ImportProfilePropertiesUserIdTypes[ImportProfilePropertiesUserIdTypes["Email"] = 0] = "Email";
    ImportProfilePropertiesUserIdTypes[ImportProfilePropertiesUserIdTypes["CloudId"] = 1] = "CloudId";
    ImportProfilePropertiesUserIdTypes[ImportProfilePropertiesUserIdTypes["PrincipalName"] = 2] = "PrincipalName";
})(ImportProfilePropertiesUserIdTypes || (ImportProfilePropertiesUserIdTypes = {}));
var ImportProfilePropertiesJobState;
(function (ImportProfilePropertiesJobState) {
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Unknown"] = 0] = "Unknown";
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Submitted"] = 1] = "Submitted";
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Processing"] = 2] = "Processing";
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Queued"] = 3] = "Queued";
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Succeeded"] = 4] = "Succeeded";
    ImportProfilePropertiesJobState[ImportProfilePropertiesJobState["Error"] = 5] = "Error";
})(ImportProfilePropertiesJobState || (ImportProfilePropertiesJobState = {}));
var SPOUserSessionRevocationState;
(function (SPOUserSessionRevocationState) {
    SPOUserSessionRevocationState[SPOUserSessionRevocationState["FeatureDisabled"] = 0] = "FeatureDisabled";
    SPOUserSessionRevocationState[SPOUserSessionRevocationState["UserNotFound"] = 1] = "UserNotFound";
    SPOUserSessionRevocationState[SPOUserSessionRevocationState["Failure"] = 2] = "Failure";
    SPOUserSessionRevocationState[SPOUserSessionRevocationState["NonInstantaneousSuccess"] = 3] = "NonInstantaneousSuccess";
    SPOUserSessionRevocationState[SPOUserSessionRevocationState["InstantaneousSuccess"] = 4] = "InstantaneousSuccess";
})(SPOUserSessionRevocationState || (SPOUserSessionRevocationState = {}));
var SpoSiteLockState;
(function (SpoSiteLockState) {
    SpoSiteLockState[SpoSiteLockState["Unlock"] = 0] = "Unlock";
    SpoSiteLockState[SpoSiteLockState["NoAdditions"] = 1] = "NoAdditions";
    SpoSiteLockState[SpoSiteLockState["ReadOnly"] = 2] = "ReadOnly";
    SpoSiteLockState[SpoSiteLockState["NoAccess"] = 3] = "NoAccess";
})(SpoSiteLockState || (SpoSiteLockState = {}));
var TeamsChannelTypeValue;
(function (TeamsChannelTypeValue) {
    TeamsChannelTypeValue[TeamsChannelTypeValue["None"] = 0] = "None";
    TeamsChannelTypeValue[TeamsChannelTypeValue["PrivateChannel"] = 1] = "PrivateChannel";
    TeamsChannelTypeValue[TeamsChannelTypeValue["SharedChannel"] = 2] = "SharedChannel";
    TeamsChannelTypeValue[TeamsChannelTypeValue["StandardChannel"] = 3] = "StandardChannel";
})(TeamsChannelTypeValue || (TeamsChannelTypeValue = {}));
var DenyAddAndCustomizePagesStatus;
(function (DenyAddAndCustomizePagesStatus) {
    DenyAddAndCustomizePagesStatus[DenyAddAndCustomizePagesStatus["Unknown"] = 0] = "Unknown";
    DenyAddAndCustomizePagesStatus[DenyAddAndCustomizePagesStatus["Disabled"] = 1] = "Disabled";
    DenyAddAndCustomizePagesStatus[DenyAddAndCustomizePagesStatus["Enabled"] = 2] = "Enabled";
})(DenyAddAndCustomizePagesStatus || (DenyAddAndCustomizePagesStatus = {}));
var RestrictedToRegion;
(function (RestrictedToRegion) {
    RestrictedToRegion[RestrictedToRegion["NoRestriction"] = 0] = "NoRestriction";
    RestrictedToRegion[RestrictedToRegion["BlockMoveOnly"] = 1] = "BlockMoveOnly";
    RestrictedToRegion[RestrictedToRegion["BlockFull"] = 2] = "BlockFull";
    RestrictedToRegion[RestrictedToRegion["Unknown"] = 3] = "Unknown";
})(RestrictedToRegion || (RestrictedToRegion = {}));
var PWAEnabledStatus;
(function (PWAEnabledStatus) {
    PWAEnabledStatus[PWAEnabledStatus["Unknown"] = 0] = "Unknown";
    PWAEnabledStatus[PWAEnabledStatus["Disabled"] = 1] = "Disabled";
    PWAEnabledStatus[PWAEnabledStatus["Enabled"] = 2] = "Enabled";
})(PWAEnabledStatus || (PWAEnabledStatus = {}));
var CompanyWideSharingLinksPolicy;
(function (CompanyWideSharingLinksPolicy) {
    CompanyWideSharingLinksPolicy[CompanyWideSharingLinksPolicy["Unknown"] = 0] = "Unknown";
    CompanyWideSharingLinksPolicy[CompanyWideSharingLinksPolicy["Disabled"] = 1] = "Disabled";
    CompanyWideSharingLinksPolicy[CompanyWideSharingLinksPolicy["NotDisabled"] = 2] = "NotDisabled";
})(CompanyWideSharingLinksPolicy || (CompanyWideSharingLinksPolicy = {}));
var AppViewsPolicy;
(function (AppViewsPolicy) {
    AppViewsPolicy[AppViewsPolicy["Unknown"] = 0] = "Unknown";
    AppViewsPolicy[AppViewsPolicy["Disabled"] = 1] = "Disabled";
    AppViewsPolicy[AppViewsPolicy["NotDisabled"] = 2] = "NotDisabled";
})(AppViewsPolicy || (AppViewsPolicy = {}));
var FlowsPolicy;
(function (FlowsPolicy) {
    FlowsPolicy[FlowsPolicy["Unknown"] = 0] = "Unknown";
    FlowsPolicy[FlowsPolicy["Disabled"] = 1] = "Disabled";
    FlowsPolicy[FlowsPolicy["NotDisabled"] = 2] = "NotDisabled";
})(FlowsPolicy || (FlowsPolicy = {}));
var SharingPermissionType;
(function (SharingPermissionType) {
    SharingPermissionType[SharingPermissionType["None"] = 0] = "None";
    SharingPermissionType[SharingPermissionType["View"] = 1] = "View";
    SharingPermissionType[SharingPermissionType["Edit"] = 2] = "Edit";
})(SharingPermissionType || (SharingPermissionType = {}));
var SiteUserInfoVisibilityPolicyValue;
(function (SiteUserInfoVisibilityPolicyValue) {
    SiteUserInfoVisibilityPolicyValue[SiteUserInfoVisibilityPolicyValue["OrganizationDefault"] = 0] = "OrganizationDefault";
    SiteUserInfoVisibilityPolicyValue[SiteUserInfoVisibilityPolicyValue["ApplyToNoUsers"] = 1] = "ApplyToNoUsers";
    SiteUserInfoVisibilityPolicyValue[SiteUserInfoVisibilityPolicyValue["ApplyToGuestAndExternalUsers"] = 2] = "ApplyToGuestAndExternalUsers";
    SiteUserInfoVisibilityPolicyValue[SiteUserInfoVisibilityPolicyValue["ApplyToInternalUsers"] = 3] = "ApplyToInternalUsers";
    SiteUserInfoVisibilityPolicyValue[SiteUserInfoVisibilityPolicyValue["ApplyToAllUsers"] = 4] = "ApplyToAllUsers";
})(SiteUserInfoVisibilityPolicyValue || (SiteUserInfoVisibilityPolicyValue = {}));
var SpecialCharactersState;
(function (SpecialCharactersState) {
    SpecialCharactersState[SpecialCharactersState["NoPreference"] = 0] = "NoPreference";
    SpecialCharactersState[SpecialCharactersState["Allowed"] = 1] = "Allowed";
    SpecialCharactersState[SpecialCharactersState["Disallowed"] = 2] = "Disallowed";
})(SpecialCharactersState || (SpecialCharactersState = {}));
var SensitiveByDefaultState;
(function (SensitiveByDefaultState) {
    SensitiveByDefaultState[SensitiveByDefaultState["AllowExternalSharing"] = 0] = "AllowExternalSharing";
    SensitiveByDefaultState[SensitiveByDefaultState["BlockExternalSharing"] = 1] = "BlockExternalSharing";
})(SensitiveByDefaultState || (SensitiveByDefaultState = {}));
var PersonalSiteFilter;
(function (PersonalSiteFilter) {
    PersonalSiteFilter[PersonalSiteFilter["UseServerDefault"] = 0] = "UseServerDefault";
    PersonalSiteFilter[PersonalSiteFilter["Include"] = 1] = "Include";
    PersonalSiteFilter[PersonalSiteFilter["Exclude"] = 2] = "Exclude";
})(PersonalSiteFilter || (PersonalSiteFilter = {}));
var ResultStatus;
(function (ResultStatus) {
    ResultStatus[ResultStatus["Success"] = 0] = "Success";
    ResultStatus[ResultStatus["Warning"] = 1] = "Warning";
    ResultStatus[ResultStatus["Error"] = 2] = "Error";
})(ResultStatus || (ResultStatus = {}));
var SPOHubSiteUserRights;
(function (SPOHubSiteUserRights) {
    SPOHubSiteUserRights[SPOHubSiteUserRights["None"] = 0] = "None";
    SPOHubSiteUserRights[SPOHubSiteUserRights["Join"] = 1] = "Join";
})(SPOHubSiteUserRights || (SPOHubSiteUserRights = {}));

// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/office-tenant.js




let office_tenant_Office365Tenant = class _Office365Tenant extends _SPInstance {
    /**
    * Choose which fields to return
    *
    * @param selects One or more fields to return
    * @description we limit the selects here because there are so many values possible and it improves discoverability.
    * Unfortunately this doesn't work as a general solution due to expands
    */
    select(...selects) {
        return super.select(...selects);
    }
    /**
     *Sets the configuration values for Idle session sign out for unmanaged devices
     *
     *@param enabled Boolean indicating if the policy should be enabled
     *@param warnAfter TimeSpan containing the time before warning the user
     *@param signOutAfter TimeSpan containing the time before signing out the user
     *@returns True if the operation succeeds, false otherwise
     */
    setIdleSessionSignOutForUnmanagedDevices(enabled, warnAfter, signOutAfter) {
        return spPost(Office365Tenant(this, "SetIdleSessionSignOutForUnmanagedDevices"), body({
            enabled,
            warnAfter,
            signOutAfter,
        }));
    }
    /**
     *Gets the configuration values, as a string, for Idle session sign out for unmanaged devices
     *The return string is a comma delineated list of the three policy settings.  The policy settings consist of
     *1. Enabled: true or false
     *2. Warn after: Time until user should be warned in seconds.
     *3. Sign out after: Time until user should be signed out in seconds.
     *
     *@returns A string indicating the current policy settings
     */
    getIdleSessionSignOutForUnmanagedDevices() {
        return spPost(Office365Tenant(this, "GetIdleSessionSignOutForUnmanagedDevices"));
    }
    /**
     *Adds a SharePoint document library to the list of Organization Assets libraries
     *
     *@param cdnType
     *@param libUrl Url of a SharePoint document library to be added to the list of Organization Assets libraries
     *@param thumbnailUrl
     *@param orgAssetType
     *@param defaultOriginAdded
     */
    // eslint-disable-next-line max-len
    addToOrgAssetsLibAndCdn(cdnType, libUrl, thumbnailUrl, orgAssetType, defaultOriginAdded) {
        return spPost(Office365Tenant(this, "AddToOrgAssetsLibAndCdn"), body({
            cdnType,
            libUrl,
            thumbnailUrl,
            orgAssetType,
            defaultOriginAdded,
        }));
    }
    removeFromOrgAssetsAndCdn(remove, cdnType, libUrl) {
        return spPost(Office365Tenant(this, "RemoveFromOrgAssetsAndCdn"), body({
            remove,
            cdnType,
            libUrl,
        }));
    }
    /**
     *Removes an entry from the list of Organization Assets libraries
     */
    removeFromOrgAssets(libUrl, listId) {
        return spPost(Office365Tenant(this, "RemoveFromOrgAssets"), body({
            libUrl,
            listId,
        }));
    }
    /**
     *Sets a SharePoint library thumbnail in Organization Assets libraries
     *
     *@param libUrl Url of a SharePoint library to be set in Organization Assets
     *@param thumbnailUrl Url to an image used as the thumbnail for this library in the FilePicker
     *@param orgAssetType Type of Organization Assets Document Library
     */
    setOrgAssetsLib(libUrl, thumbnailUrl, orgAssetType) {
        return spPost(Office365Tenant(this, "SetOrgAssetsLib"), body({
            libUrl,
            thumbnailUrl,
            orgAssetType,
        }));
    }
    /**
     * Gets the minor version that should be used to generate the next iteration of the custom font catalog for the
     * font org asset library specified by libUrl
     */
    getCustomFontsMinorVersion(libUrl) {
        return spPost(Office365Tenant(this, "GetCustomFontsMinorVersion"), body({
            libUrl,
        }));
    }
    /**
     *Uploads fonts and font catalogs to a font asset library
     */
    uploadCustomFontsAndCatalogLib(customFontFiles, libUrl) {
        return spPost(Office365Tenant(this, "UploadCustomFontsAndCatalogLib"), body({
            customFontFiles,
            libUrl,
        }));
    }
    /**
     *Removes old Custom Fonts files
     */
    removePreviousCustomFontUpload(majVersions, libUrl) {
        return spPost(Office365Tenant(this, "RemovePreviousCustomFontUpload"), body({
            majVersions,
            libUrl,
        }));
    }
    /**
     *Increments the minor version for libUrl
     */
    incrementCustomFontsMinorVersion(libUrl) {
        return spPost(Office365Tenant(this, "IncrementCustomFontsMinorVersion"), body({
            libUrl,
        }));
    }
    /**
     *Gets a list of tenant CDN origins
     *
     *@param cdnType Type of CDN: private or public
     */
    getTenantCdnOrigins(cdnType) {
        return spPost(Office365Tenant(this, "GetTenantCdnOrigins"), body({
            cdnType,
        }));
    }
    /**
     *Adds a tenant cdn origin
     *
     *@param cdnType Type of CDN: private or public
     *@param originUrl origin Url to add
     */
    addTenantCdnOrigin(cdnType, originUrl) {
        return spPost(Office365Tenant(this, "AddTenantCdnOrigin"), body({
            cdnType,
            originUrl,
        }));
    }
    /**
     *Removes a tenant cdn origin
     *
     *@param cdnType Type of CDN: private or public
     *@param originUrl origin Url to remove
     */
    removeTenantCdnOrigin(cdnType, originUrl) {
        return spPost(Office365Tenant(this, "RemoveTenantCdnOrigin"), body({
            cdnType,
            originUrl,
        }));
    }
    /**
     *Enables or disabled tenant CDN feature
     *
     *@param cdnType Type of CDN: private or public
     *@param isEnabled value to set
     */
    setTenantCdnEnabled(cdnType, isEnabled) {
        return spPost(Office365Tenant(this, "setTenantCdnEnabled"), body({
            cdnType,
            isEnabled,
        }));
    }
    /**
     *Gets whether tenant CDN feature is enabled
     *
     *@param cdnType Type of CDN: private or public
     *@returns True if CDN is enabled; false otherwise
     */
    getTenantCdnEnabled(cdnType) {
        return spPost(Office365Tenant(this, "GetTenantCdnEnabled"), body({
            cdnType,
        }));
    }
    /**
     *Sets policy for the tenant CDN
     *
     *@param cdnType CDN type
     *@param policy Policy type
     *@param policyValue Policy value
     */
    setTenantCdnPolicy(cdnType, policy, policyValue) {
        return spPost(Office365Tenant(this, "SetTenantCdnPolicy"), body({
            cdnType,
            policy,
            policyValue,
        }));
    }
    /**
     *Gets list of policies for the tenant CDN
     *
     *@param cdnType CDN type
     *@returns List of policies
     */
    getTenantCdnPolicies(cdnType) {
        return spPost(Office365Tenant(this, "GetTenantCdnPolicies"), body({
            cdnType,
        }));
    }
    /**
     *Creates default origins for requested CDN type
     */
    createTenantCdnDefaultOrigins(cdnType) {
        return spPost(Office365Tenant(this, "CreateTenantCdnDefaultOrigins"), body({
            cdnType,
        }));
    }
    /**
     *Add a custom theme to the tenant so that it will be available when selecting a site theme
     *
     *@param name The name of the theme
     *@param themeJson A JSON representation of the theme information
     *@returns True, if the theme is added successfully
     */
    addTenantTheme(name, themeJson) {
        return spPost(Office365Tenant(this, "AddTenantTheme"), body({
            name,
            themeJson,
        }));
    }
    /**
     *Update the properties of a custom theme
     *
     *@param name The name of the theme to update
     *@param themeJson A JSON representation of the new theme information
     *@returns True, if the theme is updated successfully
     */
    updateTenantTheme(name, themeJson) {
        return spPost(Office365Tenant(this, "UpdateTenantTheme"), body({
            name,
            themeJson,
        }));
    }
    /**
     *Remove a custom theme from the tenant
     *
     *@param name The name of the theme to delete
     */
    deleteTenantTheme(name) {
        return spPost(Office365Tenant(this, "DeleteTenantTheme"), body({
            name,
        }));
    }
    /**
     *Retrieves a custom theme previously added to the tenant
     *
     *@param name The name of the theme to retrieve
     *@returns A ThemeProperties object representing the theme
     */
    getTenantTheme(name) {
        return spPost(Office365Tenant(this, "GetTenantTheme"), body({
            name,
        }));
    }
    /**
     *Retrieves all custom themes added to the tenant
     *
     *@returns ThemeProperties objects representing all of the custom themes added to the tenant
     */
    getAllTenantThemes() {
        return spPost(Office365Tenant(this, "GetAllTenantThemes"));
    }
    /**
     *Retrieves a setting specifying whether default SharePoint themes should be hidden from the web UI
     *
     *@return True, if default SharePoint themes should be hidden from the web UI
     */
    getHideDefaultThemes() {
        return spPost(Office365Tenant(this, "GetHideDefaultThemes"));
    }
    /**
     *Updates a setting specifying whether default SharePoint themes should be hidden from the web UI
     *
     *@param hideDefaultThemes
     *@returns True, if the setting is updated successfully
     */
    setHideDefaultThemes(hideDefaultThemes) {
        return spPost(Office365Tenant(this, "SetHideDefaultThemes"), body({
            hideDefaultThemes,
        }));
    }
    /**
     *Adds an SDN provider to the tenant
     *
     *@param identifier id of an SDN provider to be added
     *@param license license number provided by SDN provider
     */
    addSdnProvider(identifier, license) {
        return spPost(Office365Tenant(this, "AddSdnProvider"), body({
            identifier,
            license,
        }));
    }
    /**
     *Removes an entry from the list of supported SDN providers
     */
    removeSdnProvider() {
        return spPost(Office365Tenant(this, "RemoveSdnProvider"));
    }
    /**
     *Returns a collection of User objects corresponding to external users in the tenancy
     *
     *@param position Zero-based index of the position in the sorted collection of the first result to be returned
     *@param pageSize The maximum number of ExternalUsers to be returned in the collection.  Must be less than or equal to 50
     *@param filter Limits the results to only those ExternalUers whose display name or invitedAs email address begins with the text in the string, using case-insensitive
     *@param sortOrder Specifies whether a call to GetExternalUsers should sort results in Ascending or Descending order on the ExternalUser.invitedAs property
     *@returns A GetExternalUsersResults object containing up to pageSize users that match the filter criteria, in the order specified, starting from the specified position.
     *Further pages can be fetched by calling again with the same filter and sortOrder parameters but specifying for position the
     *GetExternalUsersResults.UserCollectionPosition value returned from the previous call.  If GetExternalUsersResults.ExternalUserCollection.Count is less than pageSize,
     *all available users have been returned (it is the last page of results.)
     */
    getExternalUsers(position = 0, pageSize = 50, filter = null, sortOrder = SortOrder.Ascending) {
        return spPost(Office365Tenant(this, "GetExternalUsers").select("ExternalUserCollection").expand("ExternalUserCollection"), body({
            position,
            pageSize,
            filter,
            sortOrder,
        }));
    }
    /**
     *Returns a collection of User objects corresponding to external users in the tenancy
     *
     *@param position Zero-based index of the position in the sorted collection of the first result to be returned
     *@param pageSize The maximum number of ExternalUsers to be returned in the collection.  Must be less than or equal to 50
     *@param filter Limits the results to only those ExternalUers whose display name or invitedAs email address begins with the text in the string, case-insensitive
     *@param sortPropertyName Name of the property to sort by. Support ExternalUser.acceptedAs and ExternalUser.whenCreated property
     *@param sortOrder Specifies whether a call to GetExternalUsers should sort results in Ascending or Descending order on the ExternalUser.invitedAs property
     *@returns A GetExternalUsersResults object containing up to pageSize users that match the filter criteria, in the order specified, starting from the specified position.
     *Further pages can be fetched by calling again with the same filter and sortOrder parameters but specifying for position the
     *GetExternalUsersResults.UserCollectionPosition value returned from the previous call.  If GetExternalUsersResults.ExternalUserCollection.Count is less than pageSize,
     *all available users have been returned (it is the last page of results.)
     */
    // eslint-disable-next-line max-len
    getExternalUsersWithSortBy(position = 0, pageSize = 50, filter = null, sortPropertyName = "OtherMail", sortOrder = SortOrder.Ascending) {
        return spPost(Office365Tenant(this, "GetExternalUsersWithSortBy").select("ExternalUserCollection").expand("ExternalUserCollection"), body({
            position,
            pageSize,
            filter,
            sortPropertyName,
            sortOrder,
        }));
    }
    /**
     *Returns a collection of User objects corresponding to external users who have accessed this site collection
     *
     *@param siteUrl The site url whose external users are required
     *@param position Zero-based index of the position in the sorted collection of the first result to be returned
     *@param pageSize The maximum number of ExternalUsers to be returned in the collection.  Must be less than or equal to 50
     *@param filter Limits the results to only those ExternalUers whose display name or invitedAs email address begins with the text in the string, case-insensitive
     *@param sortOrder Specifies whether a call to GetExternalUsers should sort results in Ascending or Descending order on the ExternalUser.invitedAs property
     *@returns A GetExternalUsersResults object containing up to pageSize users that match the filter criteria, in the order specified, starting from the specified position.
     * Further pages can be fetched by calling again with the same filter and sortOrder parameters but specifying for position the GetExternalUsersResults.UserCollectionPosition
     * value returned from the previous call.  If GetExternalUsersResults.ExternalUserCollection.Count is less than pageSize,
     * all available users have been returned (it is the last page of results.)
     */
    getExternalUsersForSite(siteUrl, position = 0, pageSize = 50, filter = null, sortOrder = SortOrder.Ascending) {
        return spPost(Office365Tenant(this, "GetExternalUsersForSite").select("ExternalUserCollection").expand("ExternalUserCollection"), body({
            siteUrl,
            position,
            pageSize,
            filter,
            sortOrder,
        }));
    }
    /**
     *Removes from the directory external users whose full ExternalUser.UniqueId property belongs in (case insensitive) the array of strings.
     *This method is unaffected by the value of the SharingCapability property
     *
     *@param uniqueIds An array of strings, where each string is the UniqueId of an external user to delete
     *@returns A RemoveExternalUsersResults object with the RemoveSucceeded and RemoveFailed arrays populated based on the results of attempting to remove the specified users.
     */
    removeExternalUsers(uniqueIds) {
        return spPost(Office365Tenant(this, "RemoveExternalUsers"), body({
            uniqueIds,
        }));
    }
    /**
     * Queues an import of custom properties into user profiles from an external data source. This is a mostly asynchronous call in that it doesn't download
     * the source data or do the import, it simply adds it to a queue to do later
     *
     *@description The overall process for this import is as follows:
     *1) Create users in the User Profile Service. The custom property import process does not import users, only properties.
     *2) Create the custom properties in the User Profile Service. The custom property import process does not create the properties, just imports the values.
     *3) Create an external data source, the uri of which is passed to this method as the sourceUri parameter. The Uri must point to a resource that is accessible
     *   from within the SharePoint Online data center. It must have a record for each user with properties to import. Users are identified in the source data using
     *   the property passed to sourceDataIdProperty.
     *4) Call this method. This mehod queues the import. The data pointed to by sourceUri will be downloaded to the server and later imported into the User
     *   Profile Service. Data will be downloaded roughly once an hour and then queued for actual import.
     *
     *@param idType The type of id to use when looking up the user profile. See docs for ImportProfilePropertiesUserIdType for details.
     * Note that regardless of the type the user must already exist in the User Profile Service for import to work.
     *@param sourceDataIdProperty The name of the id property in the source data. The value of the property from the source data will be used to look up the user.
     * The User Profile Service property used for the lookup depends on the value of idType.</param>
     *@param propertyMap A map from source property name to User Profile Service property name. Note that the User Profile Service properties must already exist.
     *@param sourceUri The URI of the source data to import. This must not be transient as it may not be downloaded for some time.
     *@returns Guid identifying the import job that has been queued
     */
    // eslint-disable-next-line max-len
    queueImportProfileProperties(idType, sourceDataIdProperty, propertyMap, sourceUri) {
        return spPost(Office365Tenant(this, "QueueImportProfileProperties"), body({
            idType,
            sourceDataIdProperty,
            propertyMap,
            sourceUri,
        }));
    }
    /**
     *Deletes a previously queued job to import of custom properties into user profiles. Only certain jobs can be deleted:
     *- Only jobs that haven't been started yet (have been queued but not imported) can be deleted.
     *- Only top-level jobs can be cancelled. The job id returned by QueueImportProfileProperties will be a top-l
     *
     *@param jobId The job id returned by QueueImportProfileProperties to delete
     *@returns True if the job is deleted, false otherwise
     */
    deleteImportProfilePropertiesJob(jobId) {
        return spPost(Office365Tenant(this, "DeleteImportProfilePropertiesJob"), body({
            jobId,
        }));
    }
    /**
     *Gets high-level status for all the import profile properties jobs for the current tenant
     *
     *@returns A collection of ImportProfilePropertiesJobStatus objects with high-level status information for the jobs
     */
    getImportProfilePropertyJobs() {
        return spPost(Office365Tenant(this, "GetImportProfilePropertyJobs"));
    }
    /**
     *Gets high-level status for the import profile properties job specified by jobId. This jobId would have been returned by the original call to QueueImportProfileProperties
     *
     *@param jobId The id of the job for which to get high-level status
     *@returns An ImportProfilePropertiesJobStatus obect with high level status information about the specified job
     */
    getImportProfilePropertyJob(jobId) {
        return spPost(Office365Tenant(this, "GetImportProfilePropertyJob"), body({
            jobId,
        }));
    }
    /**
     *Disables non-owners of a site to share content to users that are not members of the site collection
     *
     *@param siteUrl The siteUrl of the site collection
     */
    disableSharingForNonOwnersOfSite(siteUrl) {
        return spPost(Office365Tenant(this, "DisableSharingForNonOwnersOfSite"), body({
            siteUrl,
        }));
    }
    /**
     * Gets whether non-owners of a site can share content to users that are not members of the site collection
     *
     *@param siteUrl The siteUrl of the site collection to check if restrict sharing is enabled
     *@returns A Boolean indicating if sharing is disabled for site members in the site collection
     */
    isSharingDisabledForNonOwnersOfSite(siteUrl) {
        return spPost(Office365Tenant(this, "IsSharingDisabledForNonOwnersOfSite"), body({
            siteUrl,
        }));
    }
    /**
     * Revokes all user sessions for a given username
     *
     *@param userName The home tenant user name, which is being used at authentication time (user@contoso.com)
     *@returns An value which represents the state of the operation
     */
    revokeAllUserSessions(userName) {
        return spPost(Office365Tenant(this, "RevokeAllUserSessions"), body({
            userName,
        }));
    }
    /**
     * Revokes all user sessions for a given user's puid
     *
     *@param puidList A list of puids to be revoked (ex: 10037ffe8000008d)
     *@returns An SPOUserSessionRevocationResult enum value which represents the state of the operation
     */
    revokeAllUserSessionsByPuid(puidList) {
        return spPost(Office365Tenant(this, "RevokeAllUserSessionsByPuid"), body({
            puidList,
        }));
    }
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "AddTenantCdnOrigin")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call(method, args) {
        const query = Office365Tenant(this, method);
        if (typeof args !== "undefined") {
            return spPost(query, body(args));
        }
        else {
            return spPost(query);
        }
    }
};
office_tenant_Office365Tenant = tslib_tslib_es6_decorate([
    defaultPath("_api/Microsoft.Online.SharePoint.TenantManagement.Office365Tenant")
], office_tenant_Office365Tenant);
const Office365Tenant = spInvokableFactory(office_tenant_Office365Tenant);

// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/site-properties.js



let site_properties_TenantSiteProperties = class _TenantSiteProperties extends _SPInstance {
    /**
    * Choose which fields to return
    *
    * @param selects One or more fields to return
    * @description we limit the selects here because there are so many values possible and it improves discoverability.
    * Unfortunately this doesn't work as a general solution due to expands
    */
    select(...selects) {
        return super.select(...selects);
    }
    /**
     * Clears the Lockdown placed due to Sharing-Lockdown Policy
     */
    clearSharingLockDown(siteUrl) {
        return spPost(TenantSiteProperties(this, "ClearSharingLockDown"), body({
            siteUrl,
        }));
    }
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroupForSite")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call(method, args) {
        const query = TenantSiteProperties(this, method);
        if (typeof args !== "undefined") {
            return spPost(query, body(args));
        }
        else {
            return spPost(query);
        }
    }
};
site_properties_TenantSiteProperties = tslib_tslib_es6_decorate([
    defaultPath("_api/Microsoft.Online.SharePoint.TenantAdministration.SiteProperties")
], site_properties_TenantSiteProperties);
const TenantSiteProperties = spInvokableFactory(site_properties_TenantSiteProperties);

// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/tenant.js

// import { body } from "@pnp/queryable";


let tenant_Tenant = class _Tenant extends _SPInstance {
    /**
    * Choose which fields to return
    *
    * @param selects One or more fields to return
    * @description we limit the selects here because there are so many values possible and it improves discoverability.
    * Unfortunately this doesn't work as a general solution due to expands
    */
    select(...selects) {
        return super.select(...selects);
    }
    /**
     * Returns a site object for the given URL
     *
     * @param url URL of the requested site object
     * @param includeDetail true to include details
     * @returns Returns a site object for the given URL
     */
    getSitePropertiesByUrl(url, includeDetail = false) {
        return spPost(Tenant(this, "GetSitePropertiesByUrl"), body({
            url,
            includeDetail,
        }));
    }
    /**
     * Gets SPOSiteProperties objects for all sites from SharePoint in the tenancy that match the filter expression
     *
     * @param speFilter If the filter is null or empty string, then all the sites are returned
     */
    getSitePropertiesFromSharePointByFilters(speFilter) {
        return spPost(Tenant(this, "GetSitePropertiesFromSharePointByFilters"), body({
            speFilter,
        }));
    }
    /**
     * Get whether this tenant has valid education license
     */
    hasValidEducationLicense() {
        return spPost(Tenant(this, "HasValidEducationLicense"));
    }
    /**
     * Queues a site collection for creation with the given properties
     *
     * @param siteCreationProperties The initial properties for the site which is to be created
     * @returns Queues a site collection for creation with the given properties
     */
    createSite(siteCreationProperties) {
        return spPost(Tenant(this, "CreateSite"), body({
            siteCreationProperties,
        }));
    }
    /**
     * Gets all the SPWebTemplates on this Tenant
     *
     * @returns An SPOWebTemplateCollection containing a SPOWebTemplate information for each template
     */
    getSPOTenantAllWebTemplates() {
        return spPost(Tenant(this, "GetSPOTenantAllWebTemplates"));
    }
    /**
     * Handles updating the properties based on updateType of all the sites which are part of the groupId
     *
     * @param groupId Group Id
     * @param siteId Site Id
     * @param updateType Property which is required to be updated
     * @param UpdateGroupSitePropertiesParameters
     * @param parameters Params which are required to be passed based on the updateType
     * @returns string denoting the user storage key which can be used by client to pull the async workflow status
     */
    // eslint-disable-next-line max-len
    updateGroupSiteProperties(groupId, siteId, updateType, parameters = {}) {
        return spPost(Tenant(this, "UpdateGroupSiteProperties"), body({
            groupId,
            siteId,
            updateType,
            parameters,
        }));
    }
    /**
     * Gets all the site collection templates available in SPO for the given UI culture
     *
     * @returns An SPOWebTemplateCollection for all the site collection templates available in SPO for the given UI culture.
     */
    getSPOAllWebTemplates(cultureName, compatibilityLevel) {
        return spPost(Tenant(this, "GetSPOAllWebTemplates"), body({
            cultureName,
            compatibilityLevel,
        }));
    }
    /**
     * Gets all the SPWebTemplates for site collections on this Tenant
     *
     * @returns An SPOWebTemplateCollection for all the site collection templates available in SPO for the given UI culture.
     */
    getSPOTenantWebTemplates(localeId, compatibilityLevel) {
        return spPost(Tenant(this, "GetSPOTenantWebTemplates"), body({
            localeId,
            compatibilityLevel,
        }));
    }
    /**
     * Returns the site header logo by site URL.
     *
     * @param siteUrl Absolute URL to the site
     * @returns Stream containing the site logo data
     */
    getSiteThumbnailLogo(siteUrl) {
        return spPost(Tenant(this, "GetSiteThumbnailLogo").using(BufferParse()), body({
            siteUrl,
        }));
    }
    /**
     * Gets all the SPSiteCreationSources
     */
    getSPOSiteCreationSources() {
        return spPost(Tenant(this, "GetSPOSiteCreationSources"));
    }
    /**
     * Deletes the site to the recycle bin
     *
     * @param siteUrl Absolute url of the site to remove
     */
    removeSite(siteUrl) {
        return spPost(Tenant(this, "RemoveSite"), body({
            siteUrl,
        }));
    }
    /**
     * Gets the health Status of the site
     *
     * @param sourceUrl Absolute url of the site
     */
    getSiteHealthStatus(sourceUrl) {
        return spPost(Tenant(this, "GetSiteHealthStatus"), body({
            sourceUrl,
        }));
    }
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSiteWithSmartGestureOptionForce(sourceUrl, targetUrl, archiveUrl, includeSmartGestures, force) {
        return spPost(Tenant(this, "SwapSiteWithSmartGestureOptionForce"), body({
            sourceUrl,
            targetUrl,
            archiveUrl,
            includeSmartGestures,
            force,
        }));
    }
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSiteWithSmartGestureOption(sourceUrl, targetUrl, archiveUrl, includeSmartGestures) {
        return spPost(Tenant(this, "SwapSiteWithSmartGestureOption"), body({
            sourceUrl,
            targetUrl,
            archiveUrl,
            includeSmartGestures,
        }));
    }
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSite(sourceUrl, targetUrl, archiveUrl) {
        return spPost(Tenant(this, "SwapSite"), body({
            sourceUrl,
            targetUrl,
            archiveUrl,
        }));
    }
    /**
     * Permanently deletes the site from the recycle bin
     *
     * @param siteUrl URL of the site to be deleted
     */
    removeDeletedSite(siteUrl) {
        return spPost(Tenant(this, "RemoveDeletedSite"), body({
            siteUrl,
        }));
    }
    /**
     * Permanently deletes the site from the recycle bin
     *
     * @param siteUrl URL of the site to be deleted
     * @param siteId SiteID of the site to be deleted
     */
    removeDeletedSitePreferId(siteUrl, siteId) {
        return spPost(Tenant(this, "RemoveDeletedSitePreferId"), body({
            siteUrl,
            siteId,
        }));
    }
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteUrl URL of the site to be restored
     */
    restoreDeletedSite(siteUrl) {
        return spPost(Tenant(this, "RestoreDeletedSite"), body({
            siteUrl,
        }));
    }
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteId SiteID of the site to be restored
     */
    restoreDeletedSiteById(siteId) {
        return spPost(Tenant(this, "RestoreDeletedSiteById"), body({
            siteId,
        }));
    }
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteUrl URL of the site to be restored
     * @param siteId SiteID of the site to be deleted
     */
    restoreDeletedSitePreferId(siteUrl, siteId) {
        return spPost(Tenant(this, "RestoreDeletedSitePreferId"), body({
            siteUrl,
            siteId,
        }));
    }
    /**
     * A collection of PowerApps environments
     */
    getPowerAppsEnvironments() {
        return spPost(Tenant(this, "GetPowerAppsEnvironments"));
    }
    /**
     * Sets the configuration values for Idle session sign out for unmanaged devices
     * @param enabled Boolean indicating if the policy should be enabled
     * @param warnAfter TimeSpan containing the time before warning the user
     * @param signOutAfter TimeSpan containing the time before signing out the user
     * @returns True if the operation succeeds, false otherwise
     */
    setIdleSessionSignOutForUnmanagedDevices(enabled, warnAfter, signOutAfter) {
        return spPost(Tenant(this, "SetIdleSessionSignOutForUnmanagedDevices"), body({
            enabled,
            warnAfter,
            signOutAfter,
        }));
    }
    /**
     * Gets the configuration values for Idle session sign out for unmanaged devices
     */
    getIdleSessionSignOutForUnmanagedDevices() {
        return spPost(Tenant(this, "GetIdleSessionSignOutForUnmanagedDevices"));
    }
    /**
     * RESTful API to export SPList to CSV file and return file download link
     *
     * @param viewXml XML of the export view
     */
    exportToCSV(viewXml) {
        return spPost(Tenant(this, "ExportToCSV"), body({
            viewXml,
        }));
    }
    /**
     * RESTful API to export SPList to CSV file and return file download link
     *
     * @param viewXml XML of the export view
     * @param listName Name of Admin SPList to be exported
     */
    exportAdminListToCSV(viewXml, listName) {
        return spPost(Tenant(this, "ExportAdminListToCSV"), body({
            viewXml,
            listName,
        }));
    }
    /**
     * RESTful API to set site's user groups
     *
     */
    setSiteUserGroups(siteUserGroupsData) {
        return spPost(Tenant(this, "SetSiteUserGroups"), body({
            siteUserGroupsData,
        }));
    }
    /**
     * RESTful API to set site administrators
     */
    setSiteAdministrators(siteAdministratorsFieldsData) {
        return spPost(Tenant(this, "SetSiteAdministrators"), body({
            siteAdministratorsFieldsData,
        }));
    }
    /**
     * RESTful API to check tenant licenses.
     *
     * @returns True if and only if tenant has all licenses in parameter
     */
    checkTenantLicenses(licenses) {
        return spPost(Tenant(this, "CheckTenantLicenses"), body({
            licenses,
        }));
    }
    /**
     * RESTful API to check tenant intune license
     */
    checkTenantIntuneLicense() {
        return spPost(Tenant(this, "CheckTenantIntuneLicense"));
    }
    /**
     * Gets a list of site administrators for the given site
     *
     * @param siteId guid site id
     * @returns Array of site admins
     */
    getSiteAdministrators(siteId) {
        return spPost(Tenant(this, "GetSiteAdministrators"), body({
            siteId,
        }));
    }
    /**
     * Renders Tenant Admin SPList Data after filtering based on the groupId the site belongs to
     *
     * @param groupId Group Id the sites belong to
     */
    renderFilteredAdminListDataByGroupId(groupId) {
        return spPost(Tenant(this, "RenderFilteredAdminListDataByGroupId").using(BufferParse()), body({
            groupId,
        }));
    }
    /**
     * Renders Tenant Admin SPList Data
     */
    renderAdminListData(listName, parameters, overrideParameters = null) {
        return spPost(Tenant(this, "RenderAdminListData").using(BufferParse()), body({
            parameters,
            overrideParameters,
            listName,
        }));
    }
    /**
     * Renders Tenant Admin SPList Data after filtering based on filter conditions
     */
    renderFilteredAdminListData(listName, parameters) {
        return spPost(Tenant(this, "RenderFilteredAdminListData").using(BufferParse()), body({
            parameters,
            listName,
        }));
    }
    /**
     * Gets SPList total item Count
     *
     * @param listName Optional List Name. By Default Aggregated TenantAdmin SPList will be used
     * @returns List item count
     */
    getSPListItemCount(listName) {
        return spPost(Tenant(this, "GetSPListItemCount"), body({
            listName,
        }));
    }
    /**
     * Registers the site with the specified URL as a HubSite
     *
     * @param siteUrl The URL of the site to make into a HubSite
     * @returns The properties of the new HubSite
     */
    registerHubSite(siteUrl) {
        return spPost(Tenant(this, "RegisterHubSite"), body({
            siteUrl,
        }));
    }
    /**
     * Registers the site with the specified URL as a HubSite
     *
     * @param siteUrl The URL of the site to make into a HubSite
     * @param creationInformation Information used to create this HubSite, If not specified, some default properties will be set instead
     * @returns The properties of the new HubSite
     */
    registerHubSiteWithCreationInformation(siteUrl, creationInformation = null) {
        return spPost(Tenant(this, "RegisterHubSiteWithCreationInformation"), body({
            siteUrl,
            creationInformation,
        }));
    }
    /**
     * Makes the specified site no longer a HubSite and removes it from the list of HubSites The site is not deleted by this operation;
     * it is merely removed from the list of available HubSites
     *
     * @param siteUrl The URL of the site which should no longer be a HubSite
     */
    unregisterHubSite(siteUrl) {
        return spPost(Tenant(this, "UnregisterHubSite"), body({
            siteUrl,
        }));
    }
    /**
     * Connects a site to a HubSite using hub site id, support multi-geo
     *
     * @param siteUrl URL of the site to connect to the HubSite
     * @param hubSiteId Guid of the HubSite ID
     */
    connectSiteToHubSiteById(siteUrl, hubSiteId) {
        return spPost(Tenant(this, "ConnectSiteToHubSiteById"), body({
            siteUrl,
            hubSiteId,
        }));
    }
    /**
     * Grant HubSite rights to users giving HubSite ID, support multi-geo
     *
     * @param hubSiteId ID of the HubSite
     * @param principals principals of users to grant rights
     * @param grantedRights The HubSite rights to grant
     */
    grantHubSiteRightsById(hubSiteId, principals, grantedRights) {
        return spPost(Tenant(this, "GrantHubSiteRightsById"), body({
            hubSiteId,
            principals,
            grantedRights,
        }));
    }
    /**
     * Revoke HubSite rights from users giving HubSite ID, support multi-geo
     *
     * @param hubSiteId ID of the HubSite
     * @param principals principals of users to revoke rights
     */
    revokeHubSiteRightsById(hubSiteId, principals) {
        return spPost(Tenant(this, "RevokeHubSiteRightsById"), body({
            hubSiteId,
            principals,
        }));
    }
    /**
     * Get the home site Ids, url and site title
     *
     * @param bypasscache bypass tenant store cache
     * @param expandDetails call the expensive API with cross geo call to fill siteUrl and site title
     */
    getHomeSitesDetails(bypasscache = false, expandDetails = false) {
        const q = Tenant(this, "GetHomeSitesDetails");
        if (bypasscache) {
            q.query.set("bypasscache", "true");
        }
        if (expandDetails) {
            q.query.set("expandDetails", "true");
        }
        return spPost(q);
    }
    /**
     * Add a new home site in tenant admin setting
     *
     * @param homeSiteUrl The home site URL
     * @param audiences The targeting audiences
     * @param order The rank order of this home site. The order starts at 1, defaults to end of order if not provided
     * @returns Details about ID, title, URL from the adding home site
     */
    addHomeSite(homeSiteUrl, audiences, order) {
        return spPost(Tenant(this, "AddHomeSite"), body({
            homeSiteUrl,
            audiences,
            order,
        }));
    }
    /**
     * Update the home site with specific URL for its audiences
     *
     * @param homeSiteUrl The home site URL
     * @param audiences The targeting audiences
     * @param order The rank order of this home site. The order starts at 1, defaults to end of order if not provided
     * @returns Details about ID, title, URL from the adding home site
     */
    updateHomeSite(homeSiteUrl, audiences, order) {
        return spPost(Tenant(this, "UpdateHomeSite"), body({
            homeSiteUrl,
            audiences,
            order,
        }));
    }
    /**
     * Reorder the rank of all home sites in tenant admin setting
     *
     * @param homeSitesSiteIds All home sites siteId with new order
     * @returns Details about siteId and webId from all home sites in a new order
     */
    reorderHomeSites(homeSitesSiteIds) {
        return spPost(Tenant(this, "ReorderHomeSites"), body({
            homeSitesSiteIds,
        }));
    }
    /**
     * Remove a home site in tenant admin setting
     *
     * @param homeSiteUrl The home site URL
     */
    removeHomeSite(homeSiteUrl) {
        return spPost(Tenant(this, "RemoveHomeSite"), body({
            homeSiteUrl,
        }));
    }
    /**
     * Get site subscription id
     */
    getSiteSubscriptionId() {
        return spPost(Tenant(this, "GetSiteSubscriptionId"));
    }
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroupForSite")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call(method, args) {
        const query = Tenant(this, method);
        if (typeof args !== "undefined") {
            return spPost(query, body(args));
        }
        else {
            return spPost(query);
        }
    }
};
tenant_Tenant = tslib_tslib_es6_decorate([
    defaultPath("_api/SPO.Tenant")
], tenant_Tenant);
const Tenant = spInvokableFactory(tenant_Tenant);

// CONCATENATED MODULE: ./node_modules/@pnp/sp-admin/index.js






Reflect.defineProperty(fi_SPFI.prototype, "admin", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Admin);
    },
});
class sp_admin_Admin extends spqueryable_SPQueryable {
    get office365Tenant() {
        return Office365Tenant(this);
    }
    get siteProperties() {
        return TenantSiteProperties(this);
    }
    get tenant() {
        return Tenant(this);
    }
}
const Admin = spInvokableFactory(sp_admin_Admin);

// CONCATENATED MODULE: ./pnpjs-sources/index-sp-admin.ts



/***/ })
/******/ ]);
});