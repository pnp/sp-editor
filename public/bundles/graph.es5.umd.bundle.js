(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp.graph"] = factory();
	else
		root["pnp.graph"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Admin: () => (/* reexport */ Admin),
  AdvancedQuery: () => (/* reexport */ AdvancedQuery),
  AppCatalog: () => (/* reexport */ AppCatalog),
  Attachment: () => (/* reexport */ Attachment),
  Attachments: () => (/* reexport */ Attachments),
  BookingAppointment: () => (/* reexport */ BookingAppointment),
  BookingAppointments: () => (/* reexport */ BookingAppointments),
  BookingBusiness: () => (/* reexport */ BookingBusiness),
  BookingBusinesses: () => (/* reexport */ BookingBusinesses),
  BookingCurrencies: () => (/* reexport */ BookingCurrencies),
  BookingCurrency: () => (/* reexport */ BookingCurrency),
  BookingCustomQuestion: () => (/* reexport */ BookingCustomQuestion),
  BookingCustomQuestions: () => (/* reexport */ BookingCustomQuestions),
  BookingCustomer: () => (/* reexport */ BookingCustomer),
  BookingCustomers: () => (/* reexport */ BookingCustomers),
  BookingService: () => (/* reexport */ BookingService),
  BookingServices: () => (/* reexport */ BookingServices),
  BookingStaffMember: () => (/* reexport */ BookingStaffMember),
  BookingStaffMembers: () => (/* reexport */ BookingStaffMembers),
  Bucket: () => (/* reexport */ Bucket),
  Buckets: () => (/* reexport */ Buckets),
  Bundle: () => (/* reexport */ Bundle),
  Bundles: () => (/* reexport */ Bundles),
  Calendar: () => (/* reexport */ Calendar),
  CalendarGroup: () => (/* reexport */ CalendarGroup),
  CalendarGroups: () => (/* reexport */ CalendarGroups),
  CalendarPermission: () => (/* reexport */ CalendarPermission),
  CalendarPermissions: () => (/* reexport */ CalendarPermissions),
  CalendarView: () => (/* reexport */ CalendarView),
  Calendars: () => (/* reexport */ Calendars),
  Channel: () => (/* reexport */ Channel),
  Channels: () => (/* reexport */ Channels),
  ChecklistItem: () => (/* reexport */ ChecklistItem),
  ChecklistItems: () => (/* reexport */ ChecklistItems),
  Children: () => (/* reexport */ Children),
  Column: () => (/* reexport */ Column),
  Columns: () => (/* reexport */ Columns),
  Communications: () => (/* reexport */ Communications),
  Compliance: () => (/* reexport */ Compliance),
  ConsistencyLevel: () => (/* reexport */ ConsistencyLevel),
  Contact: () => (/* reexport */ Contact),
  ContactFolder: () => (/* reexport */ ContactFolder),
  ContactFolders: () => (/* reexport */ ContactFolders),
  Contacts: () => (/* reexport */ Contacts),
  ContentType: () => (/* reexport */ ContentType),
  ContentTypes: () => (/* reexport */ ContentTypes),
  Conversation: () => (/* reexport */ Conversation),
  Conversations: () => (/* reexport */ Conversations),
  Count: () => (/* reexport */ Count),
  DEFAULT_GRAPH_URL: () => (/* reexport */ DEFAULT_GRAPH_URL),
  DefaultHeaders: () => (/* reexport */ DefaultHeaders),
  DefaultInit: () => (/* reexport */ DefaultInit),
  DirectoryObject: () => (/* reexport */ DirectoryObject),
  DirectoryObjectTypes: () => (/* reexport */ DirectoryObjectTypes),
  DirectoryObjects: () => (/* reexport */ DirectoryObjects),
  DocumentSetVersion: () => (/* reexport */ DocumentSetVersion),
  DocumentSetVersions: () => (/* reexport */ DocumentSetVersions),
  Drive: () => (/* reexport */ Drive),
  DriveItem: () => (/* reexport */ DriveItem),
  DriveItems: () => (/* reexport */ DriveItems),
  Drives: () => (/* reexport */ Drives),
  Endpoint: () => (/* reexport */ Endpoint),
  Event: () => (/* reexport */ Event),
  Events: () => (/* reexport */ Events),
  FocusedInboxOverrides: () => (/* reexport */ FocusedInboxOverrides),
  GraphBrowser: () => (/* reexport */ GraphBrowser),
  GraphCollection: () => (/* reexport */ graphqueryable_GraphCollection),
  GraphFI: () => (/* reexport */ GraphFI),
  GraphInstance: () => (/* reexport */ GraphInstance),
  GraphQueryable: () => (/* reexport */ GraphQueryable),
  Group: () => (/* reexport */ Group),
  GroupType: () => (/* reexport */ GroupType),
  Groups: () => (/* reexport */ Groups),
  HorizontalSection: () => (/* reexport */ HorizontalSection),
  HorizontalSectionColumn: () => (/* reexport */ HorizontalSectionColumn),
  HorizontalSectionColumns: () => (/* reexport */ HorizontalSectionColumns),
  HorizontalSections: () => (/* reexport */ HorizontalSections),
  Insights: () => (/* reexport */ Insights),
  Invitations: () => (/* reexport */ Invitations),
  LinkedResource: () => (/* reexport */ LinkedResource),
  LinkedResources: () => (/* reexport */ LinkedResources),
  List: () => (/* reexport */ List),
  ListItem: () => (/* reexport */ ListItem),
  ListItems: () => (/* reexport */ ListItems),
  Lists: () => (/* reexport */ Lists),
  MailFolder: () => (/* reexport */ MailFolder),
  MailFolders: () => (/* reexport */ MailFolders),
  MailboxSettings: () => (/* reexport */ MailboxSettings),
  MasterCategories: () => (/* reexport */ MasterCategories),
  Member: () => (/* reexport */ Member),
  Members: () => (/* reexport */ Members),
  Message: () => (/* reexport */ Message),
  MessageRule: () => (/* reexport */ MessageRule),
  MessageRules: () => (/* reexport */ MessageRules),
  Messages: () => (/* reexport */ Messages),
  Notebook: () => (/* reexport */ Notebook),
  Notebooks: () => (/* reexport */ Notebooks),
  Notes: () => (/* reexport */ Notes),
  OneNote: () => (/* reexport */ OneNote),
  OnenotePage: () => (/* reexport */ OnenotePage),
  OnenotePages: () => (/* reexport */ OnenotePages),
  Operations: () => (/* reexport */ Operations),
  Outlook: () => (/* reexport */ Outlook),
  OutlookCategory: () => (/* reexport */ OutlookCategory),
  Page: () => (/* reexport */ Page),
  Paged: () => (/* reexport */ Paged),
  Pages: () => (/* reexport */ Pages),
  People: () => (/* reexport */ People),
  Permission: () => (/* reexport */ Permission),
  Permissions: () => (/* reexport */ Permissions),
  Photo: () => (/* reexport */ Photo),
  Place: () => (/* reexport */ Place),
  Places: () => (/* reexport */ Places),
  Plan: () => (/* reexport */ Plan),
  PlanDetails: () => (/* reexport */ PlanDetails),
  Planner: () => (/* reexport */ Planner),
  Plans: () => (/* reexport */ Plans),
  Post: () => (/* reexport */ Post),
  Posts: () => (/* reexport */ Posts),
  Presence: () => (/* reexport */ Presence),
  Relations: () => (/* reexport */ Relations),
  Resource: () => (/* reexport */ Resource),
  Resources: () => (/* reexport */ Resources),
  ResumableUpload: () => (/* reexport */ ResumableUpload),
  Room: () => (/* reexport */ Room),
  RoomList: () => (/* reexport */ RoomList),
  RoomLists: () => (/* reexport */ RoomLists),
  Root: () => (/* reexport */ Root),
  SPFx: () => (/* reexport */ SPFx),
  SPFxToken: () => (/* reexport */ SPFxToken),
  Search: () => (/* reexport */ Search),
  Section: () => (/* reexport */ Section),
  SectionGroup: () => (/* reexport */ SectionGroup),
  SectionGroups: () => (/* reexport */ SectionGroups),
  Sections: () => (/* reexport */ Sections),
  Senders: () => (/* reexport */ Senders),
  Share: () => (/* reexport */ Share),
  SharedInsight: () => (/* reexport */ SharedInsight),
  SharedInsights: () => (/* reexport */ SharedInsights),
  Shares: () => (/* reexport */ Shares),
  Site: () => (/* reexport */ Site),
  SitePage: () => (/* reexport */ SitePage),
  SitePages: () => (/* reexport */ SitePages),
  Sites: () => (/* reexport */ Sites),
  SpecialFolder: () => (/* reexport */ SpecialFolder),
  SubjectRightsRequest: () => (/* reexport */ SubjectRightsRequest),
  SubjectRightsRequests: () => (/* reexport */ SubjectRightsRequests),
  Subscription: () => (/* reexport */ Subscription),
  Subscriptions: () => (/* reexport */ Subscriptions),
  Tab: () => (/* reexport */ Tab),
  Tabs: () => (/* reexport */ Tabs),
  Task: () => (/* reexport */ Task),
  TaskDetails: () => (/* reexport */ TaskDetails),
  TaskList: () => (/* reexport */ TaskList),
  TaskLists: () => (/* reexport */ TaskLists),
  Tasks: () => (/* reexport */ Tasks),
  Team: () => (/* reexport */ Team),
  Teams: () => (/* reexport */ Teams),
  Telemetry: () => (/* reexport */ Telemetry),
  Term: () => (/* reexport */ Term),
  TermGroup: () => (/* reexport */ TermGroup),
  TermGroups: () => (/* reexport */ TermGroups),
  TermSet: () => (/* reexport */ TermSet),
  TermSets: () => (/* reexport */ TermSets),
  TermStore: () => (/* reexport */ TermStore),
  Terms: () => (/* reexport */ Terms),
  Thread: () => (/* reexport */ Thread),
  Threads: () => (/* reexport */ Threads),
  TrendingInsight: () => (/* reexport */ TrendingInsight),
  TrendingInsights: () => (/* reexport */ TrendingInsights),
  UsedInsight: () => (/* reexport */ UsedInsight),
  UsedInsights: () => (/* reexport */ UsedInsights),
  User: () => (/* reexport */ User),
  Users: () => (/* reexport */ Users),
  VerticalSection: () => (/* reexport */ VerticalSection),
  Webpart: () => (/* reexport */ Webpart),
  Webparts: () => (/* reexport */ Webparts),
  _GraphCollection: () => (/* reexport */ _GraphCollection),
  _GraphInstance: () => (/* reexport */ _GraphInstance),
  _GraphQueryable: () => (/* reexport */ _GraphQueryable),
  encodeSharingUrl: () => (/* reexport */ encodeSharingUrl),
  graphDelete: () => (/* reexport */ graphDelete),
  graphGet: () => (/* reexport */ graphGet),
  graphInvokableFactory: () => (/* reexport */ graphInvokableFactory),
  graphPatch: () => (/* reexport */ graphPatch),
  graphPost: () => (/* reexport */ graphPost),
  graphPut: () => (/* reexport */ graphPut),
  graphfi: () => (/* reexport */ graphfi)
});

;// ./node_modules/@pnp/core/util.js
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
function util_dateAdd(date, interval, units) {
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
function util_getGUID() {
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
function util_isArray(array) {
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
function util_objectDefinedNotNull(obj) {
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
 * @returns validates and returns a valid atob conversion
*/
function parseToAtob(str) {
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    try {
        // test if str has been JSON.stringified
        const parsed = JSON.parse(str);
        if (base64Regex.test(parsed)) {
            return atob(parsed);
        }
        return null;
    }
    catch (err) {
        // Not a valid JSON string, check if it's a standalone Base64 string
        return base64Regex.test(str) ? atob(str) : null;
    }
}
/**
 * Generates a ~unique hash code
 *
 * From: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
/* eslint-disable no-bitwise */
function util_getHashCode(s) {
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

;// ./node_modules/@pnp/core/storage.js

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
class PnPClientStorageWrapper {
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
        if (!util_objectDefinedNotNull(o)) {
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
            expire = util_dateAdd(new Date(), "minute", 5);
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
            this._local = new PnPClientStorageWrapper(typeof localStorage === "undefined" ? getStorageShim() : localStorage);
        }
        return this._local;
    }
    /**
     * Provides access to the session storage of the browser
     */
    get session() {
        if (this._session === null) {
            this._session = new PnPClientStorageWrapper(typeof sessionStorage === "undefined" ? getStorageShim() : sessionStorage);
        }
        return this._session;
    }
}

;// ./node_modules/@pnp/core/moments.js

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
function moments_asyncBroadcast() {
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
        if (!util_isArray(observers) || observers.length < 1) {
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

;// ./node_modules/@pnp/core/timeline.js


/**
 * Field name to hold any flags on observer functions used to modify their behavior
 */
const flags = Symbol.for("ObserverLifecycleFlags");
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
const timeline_noInherit = addFlag(1 /* ObserverLifecycleFlags.noInherit */);
/**
 * Observer lifecycle modifier that indicates this observer should only fire once per instance, it is then removed.
 *
 * Note: If you have a parent and child timeline "once" will affect both and the observer will fire once for a parent lifecycle
 * and once for a child lifecycle
 */
const once = addFlag(2 /* ObserverLifecycleFlags.once */);
/**
 * Timeline represents a set of operations executed in order of definition,
 * with each moment's behavior controlled by the implementing function
 */
class Timeline {
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
                    addObserver(target.observers, p, handler, 1 /* ObserverAddBehavior.Add */);
                    return target;
                }, {
                    toArray: () => {
                        return Reflect.has(target.observers, p) ? [...Reflect.get(target.observers, p)] : [];
                    },
                    replace: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, 3 /* ObserverAddBehavior.Replace */);
                        return target;
                    },
                    prepend: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, 2 /* ObserverAddBehavior.Prepend */);
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
        if (util_objectDefinedNotNull(e)) {
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
                    if ((!util_isArray(observers) || observers.length < 1) && p === "error") {
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
                            Reflect.set(target.observers, p, observers.filter(byFlag(2 /* ObserverLifecycleFlags.once */)));
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
                const e2 = Object.assign(Error("Error in dispose."), { innerException: e });
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
            case 1 /* ObserverAddBehavior.Add */:
                target[moment].push(observer);
                break;
            case 2 /* ObserverAddBehavior.Prepend */:
                target[moment].unshift(observer);
                break;
            case 3 /* ObserverAddBehavior.Replace */:
                target[moment].length = 0;
                target[moment].push(observer);
                break;
        }
    }
    return target[moment];
}
function cloneObserverCollection(source) {
    return Reflect.ownKeys(source).reduce((clone, key) => {
        clone[key] = [...source[key].filter(byFlag(1 /* ObserverLifecycleFlags.noInherit */))];
        return clone;
    }, {});
}

;// ./node_modules/@pnp/core/behaviors/assign-from.js
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

;// ./node_modules/@pnp/core/behaviors/copy-from.js


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
    if (!util_objectDefinedNotNull(source) || !util_objectDefinedNotNull(source.observers)) {
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

;// ./node_modules/@pnp/core/index.js




/**
 * Behavior exports
 */



;// ./node_modules/@pnp/queryable/node_modules/tslib/tslib.es6.mjs
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

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
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
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
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
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
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const tslib_es6 = ({
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

;// ./node_modules/@pnp/queryable/queryable.js


const DefaultMoments = {
    construct: lifecycle(),
    pre: asyncReduce(),
    auth: asyncReduce(),
    send: request(),
    parse: asyncReduce(),
    post: asyncReduce(),
    data: broadcast(),
};
let queryable_Queryable = class Queryable extends Timeline {
    constructor(init, path) {
        super(DefaultMoments);
        // these keys represent internal events for Queryable, users are not expected to
        // subscribe directly to these, rather they enable functionality within Queryable
        // they are Symbols such that there are NOT cloned between queryables as we only grab string keys (by design)
        this.InternalResolve = Symbol.for("Queryable_Resolve");
        this.InternalReject = Symbol.for("Queryable_Reject");
        this.InternalPromise = Symbol.for("Queryable_Promise");
        // default to use the included URL search params to parse the query string
        this._query = new URLSearchParams();
        // add an internal moment with specific implementation for promise creation
        this.moments[this.InternalPromise] = reduce();
        let parent;
        if (typeof init === "string") {
            this._url = combine(init, path);
        }
        else if (util_isArray(init)) {
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
            const requestId = util_getGUID();
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
        // this allows us to internally hook the promise creation and modify it. This was introduced to allow for
        // cancelable to work as envisioned, but may have other users. Meant for internal use in the library accessed via behaviors.
        return this.emit[this.InternalPromise](new Promise((resolve, reject) => {
            // we overwrite any pre-existing internal events as a
            // given queryable only processes a single request at a time
            this.on[this.InternalResolve].replace(resolve);
            this.on[this.InternalReject].replace(reject);
        }))[0];
    }
};
queryable_Queryable = __decorate([
    invokable()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
], queryable_Queryable);

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
/**
 * Allows a decorated object to be invoked as a function, optionally providing an implementation for that action
 *
 * @param invokeableAction Optional. The logic to execute upon invoking the object as a function.
 * @returns Decorator which applies the invokable logic to the tagged class
 */
function invokable(invokeableAction) {
    return (target) => {
        return new Proxy(target, {
            construct(clz, args, newTarget) {
                const invokableInstance = Object.assign(function (init) {
                    if (!isFunc(invokeableAction)) {
                        invokeableAction = function (init) {
                            return op(this, get, init);
                        };
                    }
                    return Reflect.apply(invokeableAction, invokableInstance, [init]);
                }, Reflect.construct(clz, args, newTarget));
                Reflect.setPrototypeOf(invokableInstance, newTarget.prototype);
                return invokableInstance;
            },
        });
    };
}

;// ./node_modules/@pnp/queryable/behaviors/parsers.js


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
        return { data: { ...parseODataJSON(json) }, headers: { ...response.headers } };
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

;// ./node_modules/@pnp/queryable/behaviors/browser-fetch.js


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

;// ./node_modules/@pnp/queryable/behaviors/caching.js

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
            const [shouldCache, getCachedValue, setCachedValue] = caching_bindCachingCore(url, init, props);
            // only cache get requested data or where the CacheAlways header is present (allows caching of POST requests)
            if (shouldCache) {
                const cached = getCachedValue();
                // we need to ensure that result stays "undefined" unless we mean to set null as the result
                if (cached === null) {
                    // if we don't have a cached result we need to get it after the request is sent. Get the raw value (un-parsed) to store into cache
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
function caching_bindCachingCore(url, init, props) {
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

;// ./node_modules/@pnp/queryable/behaviors/caching-pessimistic.js



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
                    const q = new Queryable(this);
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

;// ./node_modules/@pnp/queryable/behaviors/cancelable.js

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

;// ./node_modules/@pnp/queryable/behaviors/inject-headers.js
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

;// ./node_modules/@pnp/queryable/behaviors/resolvers.js
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

;// ./node_modules/@pnp/queryable/index.js


/**
 * Behavior exports
 */










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
function headers(o, previous) {
    return Object.assign({}, previous, { headers: { ...previous === null || previous === void 0 ? void 0 : previous.headers, ...o } });
}

;// ./node_modules/@pnp/graph/behaviors/consistency-level.js
function ConsistencyLevel(level = "eventual") {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            init.headers = { ...init.headers, "ConsistencyLevel": level };
            return [url, init, result];
        });
        return instance;
    };
}

;// ./node_modules/@pnp/graph/behaviors/paged.js




/**
 * A function that will take a collection defining IGraphCollection and return the count of items
 * in that collection. Not all Graph collections support Count.
 *
 * @param col The collection to count
 * @returns number representing the count
 */
async function Count(col) {
    const q = graphqueryable_GraphCollection(col).using(Paged(), ConsistencyLevel());
    q.query.set("$count", "true");
    q.top(1);
    const y = await q();
    return y.count;
}
/**
 * Behavior that converts results to pages when used with a collection (exposed through the paged method of GraphCollection)
 *
 * @returns A TimelinePipe used to configure the queryable
 */
function Paged(supportsCount = false) {
    return (instance) => {
        instance.on.parse.replace(errorCheck);
        instance.on.parse(async (url, response, result) => {
            const txt = await response.text();
            const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
            const nextLink = json["@odata.nextLink"];
            const deltaLink = json["@odata.deltaLink"];
            const count = supportsCount && hOP(json, "@odata.count") ? parseInt(json["@odata.count"], 10) : 0;
            const hasNext = !stringIsNullOrEmpty(nextLink);
            const hasDelta = !stringIsNullOrEmpty(deltaLink);
            result = {
                count,
                hasNext,
                nextLink: hasNext ? nextLink : null,
                deltaLink: hasDelta ? deltaLink : null,
                value: parseODataJSON(json),
            };
            return [url, response, result];
        });
        return instance;
    };
}

;// ./node_modules/@pnp/graph/graphqueryable.js




const graphInvokableFactory = (f) => {
    return queryableFactory(f);
};
/**
 * Queryable Base Class
 *
 */
class _GraphQueryable extends queryable_Queryable {
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param base A string or Queryable that should form the base part of the url
     *
     */
    constructor(base, path) {
        super(base, path);
        // we need to use the graph implementation to handle our special encoding
        this._query = new GraphQueryParams();
        if (typeof base === "string") {
            this.parentUrl = base;
        }
        else if (util_isArray(base)) {
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
    getParent(factory, path, base = this.parentUrl) {
        return factory([this, base], path);
    }
}
const GraphQueryable = graphInvokableFactory(_GraphQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class _GraphCollection extends _GraphQueryable {
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
        this.using(ConsistencyLevel());
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
    [Symbol.asyncIterator]() {
        const q = graphqueryable_GraphCollection(this).using(Paged(), ConsistencyLevel());
        // Issue #3136, some APIs take other query params that need to persist through the paging, so we just include everything
        for (const [key, value] of this.query) {
            q.query.set(key, value);
        }
        return {
            _next: q,
            async next() {
                if (this._next === null) {
                    return { done: true, value: undefined };
                }
                const result = await this._next();
                if (result.hasNext) {
                    this._next = graphqueryable_GraphCollection([this._next, result.nextLink]);
                    return { done: false, value: result.value };
                }
                else {
                    this._next = null;
                    return { done: false, value: result.value };
                }
            },
        };
    }
}
const graphqueryable_GraphCollection = graphInvokableFactory(_GraphCollection);
/**
 * Represents an instance that can be selected
 *
 */
class _GraphInstance extends _GraphQueryable {
}
const GraphInstance = graphInvokableFactory(_GraphInstance);
const graphGet = (o, init) => {
    return op(o, get, init);
};
const graphPost = (o, init) => {
    return op(o, post, init);
};
const graphDelete = (o, init) => {
    return op(o, del, init);
};
const graphPatch = (o, init) => {
    return op(o, patch, init);
};
const graphPut = (o, init) => {
    return op(o, put, init);
};
class GraphQueryParams extends Map {
    toString() {
        const params = new URLSearchParams();
        const literals = [];
        for (const item of this) {
            // and here is where we add some "enhanced" parsing as we get issues.
            if (/\/any\(.*?\)/i.test(item[1])) {
                literals.push(`${item[0]}=${item[1]}`);
            }
            else {
                params.append(item[0], item[1]);
            }
        }
        literals.push(params.toString());
        return literals.join("&");
    }
}

;// ./node_modules/@pnp/graph/fi.js

class GraphFI {
    /**
     * Creates a new instance of the GraphFI class
     *
     * @param root Establishes a root url/configuration
     */
    constructor(root = "") {
        this._root = GraphQueryable(root);
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
    return new GraphFI(root);
}

;// ./node_modules/@pnp/graph/behaviors/advanced-query.js

function AdvancedQuery() {
    return (instance) => {
        instance.using(ConsistencyLevel());
        instance.query.set("$count", "true");
        return instance;
    };
}

;// ./node_modules/@pnp/graph/behaviors/telemetry.js
function Telemetry() {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            init.headers = { ...init.headers, SdkVersion: "PnPCoreJS/4.9.0" };
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/dot-notation
            this.log(`Request Tag: ${init.headers["SdkVersion"]}`, 0);
            return [url, init, result];
        });
        return instance;
    };
}

;// ./node_modules/@pnp/graph/behaviors/defaults.js




function DefaultInit(graphUrl = DEFAULT_GRAPH_URL) {
    if (!isUrlAbsolute(graphUrl)) {
        throw Error("Graph baseUrl must be absolute.");
    }
    return (instance) => {
        instance.using(Telemetry(), RejectOnError(), ResolveOnData());
        instance.on.pre(async (url, init, result) => {
            init.cache = "default";
            init.credentials = "same-origin";
            if (!isUrlAbsolute(url)) {
                url = combine(graphUrl, url);
            }
            return [url, init, result];
        });
        return instance;
    };
}
function DefaultHeaders() {
    return (instance) => {
        instance
            .using(InjectHeaders({
            "Content-Type": "application/json",
        }));
        return instance;
    };
}

;// ./node_modules/@pnp/graph/behaviors/endpoint.js
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

;// ./node_modules/@pnp/graph/behaviors/graphbrowser.js



function GraphBrowser(props) {
    const { baseUrl } = {
        baseUrl: DEFAULT_GRAPH_URL,
        ...props,
    };
    return (instance) => {
        instance.using(DefaultHeaders(), DefaultInit(baseUrl), BrowserFetchWithRetry(), DefaultParse());
        return instance;
    };
}

;// ./node_modules/@pnp/graph/behaviors/spfx.js


class SPFxTokenNullOrUndefinedError extends Error {
    constructor(behaviorName) {
        super(`SPFx Context supplied to ${behaviorName} Behavior is null or undefined.`);
    }
    static check(behaviorName, context) {
        if (typeof context === "undefined" || context === null) {
            throw new SPFxTokenNullOrUndefinedError(behaviorName);
        }
    }
}
function SPFxToken(context) {
    SPFxTokenNullOrUndefinedError.check("SPFxToken", context);
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
    SPFxTokenNullOrUndefinedError.check("SPFx", context);
    return (instance) => {
        instance.using(DefaultHeaders(), DefaultInit(), BrowserFetchWithRetry(), DefaultParse(), SPFxToken(context));
        return instance;
    };
}

;// ./node_modules/@pnp/graph/index.js










const DEFAULT_GRAPH_URL = "https://graph.microsoft.com/v1.0";

;// ./node_modules/@pnp/graph/decorators.js


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
                return graphDelete(this);
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
                return graphDelete(this, headers({
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
                return graphPatch(this, body(props));
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
                return graphPatch(this, body(props, headers({
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
                return graphPost(this, body(props));
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
                return factory(this, `${id}`);
            }
        };
    };
}
/**
 * Adds the getByName method to a collection
 */
function getByName(factory) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            getByName(name) {
                return factory(this, name);
            }
        };
    };
}
function hasDelta() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            delta(properties = {}) {
                var _a;
                const querystring = ((_a = Object.keys(properties)) === null || _a === void 0 ? void 0 : _a.map(key => `${key}=${properties[key]}`).join("&")) || "";
                const path = (querystring.length > 0) ? `delta?${querystring}` : "delta";
                const query = graphqueryable_GraphCollection(this, path);
                if (properties === null || properties === void 0 ? void 0 : properties.maxPageSize) {
                    query.using(InjectHeaders({
                        "Prefer": `odata.maxpagesize=${properties.maxPageSize}`,
                    }));
                }
                query.on.parse.replace(errorCheck);
                query.on.parse(async (url, response, result) => {
                    const json = await response.json();
                    const nextLink = json["@odata.nextLink"];
                    const deltaLink = json["@odata.deltaLink"];
                    result = {
                        next: () => (nextLink ? graphqueryable_GraphCollection([this, nextLink]) : null),
                        delta: () => (deltaLink ? graphqueryable_GraphCollection([query, deltaLink])() : null),
                        values: json.value,
                    };
                    return [url, response, result];
                });
                return query;
            }
        };
    };
}

;// ./node_modules/@pnp/graph/node_modules/tslib/tslib.es6.mjs
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

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

function tslib_es6_esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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

function tslib_es6_runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function tslib_es6_propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function tslib_es6_setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

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
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof tslib_es6_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function tslib_es6_asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: tslib_es6_await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
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

function tslib_es6_addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var tslib_es6_SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function tslib_es6_disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new tslib_es6_SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const tslib_tslib_es6 = ({
  __extends: tslib_es6_extends,
  __assign: tslib_es6_assign,
  __rest: tslib_es6_rest,
  __decorate: tslib_es6_decorate,
  __param: tslib_es6_param,
  __metadata: tslib_es6_metadata,
  __awaiter: tslib_es6_awaiter,
  __generator: tslib_es6_generator,
  __createBinding: tslib_es6_createBinding,
  __exportStar: tslib_es6_exportStar,
  __values: tslib_es6_values,
  __read: tslib_es6_read,
  __spread: tslib_es6_spread,
  __spreadArrays: tslib_es6_spreadArrays,
  __spreadArray: tslib_es6_spreadArray,
  __await: tslib_es6_await,
  __asyncGenerator: tslib_es6_asyncGenerator,
  __asyncDelegator: tslib_es6_asyncDelegator,
  __asyncValues: tslib_es6_asyncValues,
  __makeTemplateObject: tslib_es6_makeTemplateObject,
  __importStar: tslib_es6_importStar,
  __importDefault: tslib_es6_importDefault,
  __classPrivateFieldGet: tslib_es6_classPrivateFieldGet,
  __classPrivateFieldSet: tslib_es6_classPrivateFieldSet,
  __classPrivateFieldIn: tslib_es6_classPrivateFieldIn,
  __addDisposableResource: tslib_es6_addDisposableResource,
  __disposeResources: tslib_es6_disposeResources,
});

;// ./node_modules/@pnp/graph/admin/people.js



let _PeopleAdmin = class _PeopleAdmin extends _GraphInstance {
    get profileCardProperties() {
        return ProfileCardProperties(this);
    }
    get pronounSettings() {
        return PronounSettings(this);
    }
};
_PeopleAdmin = tslib_es6_decorate([
    defaultPath("people")
], _PeopleAdmin);

const PeopleAdmin = graphInvokableFactory(_PeopleAdmin);
/**
* People Pronoun Settings
*/
let _PronounSettings = class _PronounSettings extends _GraphInstance {
};
_PronounSettings = tslib_es6_decorate([
    defaultPath("pronouns"),
    updateable()
], _PronounSettings);

const PronounSettings = graphInvokableFactory(_PronounSettings);
/**
* Profilecard Property
*/
let _ProfileCardProperty = class _ProfileCardProperty extends _GraphInstance {
};
_ProfileCardProperty = tslib_es6_decorate([
    defaultPath("profileCardProperty"),
    deleteable(),
    updateable()
], _ProfileCardProperty);

const ProfileCardProperty = graphInvokableFactory(_ProfileCardProperty);
/**
* Profilecard properties
*/
let _ProfileCardProperties = class _ProfileCardProperties extends _GraphCollection {
};
_ProfileCardProperties = tslib_es6_decorate([
    defaultPath("profileCardProperties"),
    getById(ProfileCardProperty),
    addable()
], _ProfileCardProperties);

const ProfileCardProperties = graphInvokableFactory(_ProfileCardProperties);

;// ./node_modules/@pnp/graph/admin/serviceAnnouncements.js




/**
 * Tenant Service Announcements
 */
let _ServiceAnnouncements = class _ServiceAnnouncements extends _GraphInstance {
    get healthOverviews() {
        return HealthOverviews(this);
    }
    get issues() {
        return HealthIssues(this);
    }
    get messages() {
        return ServiceMessages(this);
    }
};
_ServiceAnnouncements = tslib_es6_decorate([
    defaultPath("serviceAnnouncement")
], _ServiceAnnouncements);

const ServiceAnnouncements = graphInvokableFactory(_ServiceAnnouncements);
/**
 * Service Health Report
 */
class _ServiceHealth extends _GraphInstance {
}
const ServiceHealth = graphInvokableFactory(_ServiceHealth);
/**
 * Service Health reports
 */
let _HealthOverviews = class _HealthOverviews extends _GraphCollection {
};
_HealthOverviews = tslib_es6_decorate([
    defaultPath("healthOverviews"),
    getByName(ServiceHealth)
], _HealthOverviews);

const HealthOverviews = graphInvokableFactory(_HealthOverviews);
/**
 * Health Issue
 */
class _HealthIssue extends _GraphInstance {
}
const HealthIssue = graphInvokableFactory(_HealthIssue);
/**
 * Health issues
 */
let _HealthIssues = class _HealthIssues extends _GraphCollection {
    /**
     * Get incident report. The operation returns an error if the specified issue doesn't exist for the tenant or if PIR document does not exist for the issue.
     */
    get incidentReport() {
        return graphGet(GraphQueryable(this, "issueReport"));
    }
};
_HealthIssues = tslib_es6_decorate([
    defaultPath("issues"),
    getById(HealthIssue)
], _HealthIssues);

const HealthIssues = graphInvokableFactory(_HealthIssues);
/**
 * Service Announcements Messages
 */
class _ServiceMessage extends _GraphInstance {
    /**
    * Get message attachment
    */
    get attachments() {
        return ServiceMessageAttachments(this);
    }
}
const ServiceMessage = graphInvokableFactory(_ServiceMessage);
/**
 * Service Announcements Messages
 */
let _ServiceMessages = class _ServiceMessages extends _GraphCollection {
    /**
     * Archive a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    archive(messageIds) {
        return graphPost(ServiceMessages(this, "archive"), body({
            messageIds: messageIds,
        }));
    }
    /**
     * Unarchive a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    unarchive(messageIds) {
        return graphPost(ServiceMessages(this, "unarchive"), body({
            messageIds: messageIds,
        }));
    }
    /**
    * Favorite a list of service messages as read for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    favorite(messageIds) {
        return graphPost(ServiceMessages(this, "favorite"), body({
            messageIds: messageIds,
        }));
    }
    /**
    * Unfavorite a list of service messages as read for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    unfavorite(messageIds) {
        return graphPost(ServiceMessages(this, "unfavorite"), body({
            messageIds: messageIds,
        }));
    }
    /**
     * Mark a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    markRead(messageIds) {
        return graphPost(ServiceMessages(this, "markRead"), body({
            messageIds: messageIds,
        }));
    }
    /**
    * Mark a list of service messages as unread for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    markUnread(messageIds) {
        return graphPost(ServiceMessages(this, "markUnread"), body({
            messageIds: messageIds,
        }));
    }
};
_ServiceMessages = tslib_es6_decorate([
    defaultPath("messages"),
    getById(ServiceMessage)
], _ServiceMessages);

const ServiceMessages = graphInvokableFactory(_ServiceMessages);
/**
 * Service Announcements Message
 */
class _ServiceMessageAttachment extends _GraphInstance {
}
const ServiceMessageAttachment = graphInvokableFactory(_ServiceMessageAttachment);
/**
 * Service Announcements Message
 */
let _ServiceMessageAttachments = class _ServiceMessageAttachments extends _GraphCollection {
};
_ServiceMessageAttachments = tslib_es6_decorate([
    defaultPath("attachments"),
    getById(ServiceMessageAttachment)
], _ServiceMessageAttachments);

const ServiceMessageAttachments = graphInvokableFactory(_ServiceMessageAttachments);

;// ./node_modules/@pnp/graph/admin/sharepoint.js



let _SharePointAdmin = class _SharePointAdmin extends _GraphInstance {
    get settings() {
        return SharePointSettings(this);
    }
};
_SharePointAdmin = tslib_es6_decorate([
    defaultPath("sharepoint")
], _SharePointAdmin);

const SharePointAdmin = graphInvokableFactory(_SharePointAdmin);
/**
 * SharePoint Tenant Settings
 */
let _SharePointSettings = class _SharePointSettings extends _GraphInstance {
};
_SharePointSettings = tslib_es6_decorate([
    defaultPath("settings"),
    updateable()
], _SharePointSettings);

const SharePointSettings = graphInvokableFactory(_SharePointSettings);

;// ./node_modules/@pnp/graph/admin/index.js






defaultPath("admin");
class _Admin extends _GraphQueryable {
    get people() {
        return PeopleAdmin(this);
    }
    get sharepoint() {
        return SharePointAdmin(this);
    }
    get serviceAnnouncements() {
        return ServiceAnnouncements(this);
    }
}
const Admin = graphInvokableFactory(_Admin);
Reflect.defineProperty(GraphFI.prototype, "admin", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Admin, "admin");
    },
});

;// ./node_modules/@pnp/graph/files/funcs.js



function encodeSharingUrl(url) {
    return "u!" + Buffer.from(url, "utf8").toString("base64").replace(/=$/i, "").replace("/", "_").replace("+", "-");
}
async function driveItemUpload(fileOptions) {
    let path = "/content";
    if (fileOptions.filePathName) {
        path = `:/${fileOptions.filePathName}:/content`;
    }
    const q = DriveItem(this, null);
    // This assumes that `this` url doesn't have a trailing '/' which is should not, we'll revisit this if people are reporting issues.
    q.concat(path);
    if (fileOptions.contentType) {
        q.using(InjectHeaders({
            "Content-Type": fileOptions.contentType,
        }));
    }
    if (fileOptions.eTag) {
        const header = {};
        header[fileOptions.eTagMatch || "If-Match"] = fileOptions.eTag;
        q.using(InjectHeaders(header));
    }
    return await graphPut(q, { body: fileOptions.content });
}

;// ./node_modules/@pnp/graph/files/resumableUpload.js



/**
 * Describes a resumable upload session
 *
 */
class _ResumableUpload extends _GraphInstance {
    /** Get the status of teh Resumable Upload URL */
    get status() {
        return GraphQueryable(this);
    }
    /** Upload a chunk of the file
    * @param byteLength - number - the length of the byte array
    * @param buffer - any - the buffer to upload
    * @param contentRange - string (Optional) - the content range to upload e.g. `bytes 0-311/312`
    */
    async upload(byteLength, buffer, contentRange) {
        const range = contentRange || `bytes 0-${byteLength - 1}/${byteLength}`;
        return graphPut(this, { body: buffer, headers: { "Content-Length": byteLength.toString(), "Content-Range": range } });
    }
    /** Cancel the Resumable Upload */
    async cancel() {
        return graphDelete(this, body(null));
    }
}
const ResumableUpload = graphInvokableFactory(_ResumableUpload);
async function getUploadSession(resuableUploadOptions) {
    const create = resuableUploadOptions.create != null ? resuableUploadOptions.create : true;
    const url = this.toRequestUrl();
    const q = GraphQueryable(`${url}${(create) ? `:/${resuableUploadOptions.item.name}:/` : ""}createUploadSession`).using(AssignFrom(this));
    if (resuableUploadOptions.eTag) {
        const header = {};
        header[resuableUploadOptions.eTagMatch || "If-Match"] = resuableUploadOptions.eTag;
        q.using(InjectHeaders(header));
    }
    const postBody = {};
    if (resuableUploadOptions.conflictBehavior || resuableUploadOptions.item) {
        Object.defineProperty(postBody, "item", { value: {}, writable: true });
        if (resuableUploadOptions.item) {
            postBody.item = resuableUploadOptions.item;
        }
        postBody.item["@microsoft.graph.conflictBehavior"] = resuableUploadOptions.conflictBehavior || "rename";
    }
    if (resuableUploadOptions.deferCommit) {
        Object.defineProperty(postBody, "deferCommit", { value: resuableUploadOptions.deferCommit });
    }
    // Create the upload session
    const session = await graphPost(q, body(postBody));
    // Create a new queryable for the upload session
    const uploadQueryable = GraphQueryable(session.uploadUrl).using(CopyFrom(this, "replace", (k) => /(pre|init|send|parse|post|data|error)/i.test(k)));
    const resumableUpload = ResumableUpload(uploadQueryable);
    return { session, resumableUpload };
}

;// ./node_modules/@pnp/graph/files/types.js







/**
 * Describes a Drive instance
 *
 */
let _Drive = class _Drive extends _GraphInstance {
    /**
     * Method for retrieving the root folder of a drive.
     * @returns IRoot
     */
    get root() {
        return Root(this);
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
        return DriveItem(this, combine("items", id));
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
        return DriveItems(this, combine("root:/", `${path}:/children`));
    }
    /**
     * Get DriveItem by Path
     * @param path string, partial path to folder must not contain a leading or trailing "/" e.g. folderA/folderB/fileName.txt
     * @returns IDriveItems
     */
    getItemByPath(path) {
        return DriveItem(this, combine("root:/", `${path}:`));
    }
};
_Drive = tslib_es6_decorate([
    defaultPath("drive")
], _Drive);

const Drive = graphInvokableFactory(_Drive);
/**
 * Describes a collection of Drive objects
 *
 */
let _Drives = class _Drives extends _GraphCollection {
};
_Drives = tslib_es6_decorate([
    defaultPath("drives"),
    getById(Drive)
], _Drives);

const Drives = graphInvokableFactory(_Drives);
/**
 * Describes a Root instance
 *
 */
let _Root = class _Root extends _GraphInstance {
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
     * @returns IGraphCollection
     */
    search(query) {
        return graphqueryable_GraphCollection(this, `search(q='${query}')`);
    }
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphCollection
     */
    get thumbnails() {
        return GraphInstance(this, "thumbnails");
    }
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions object
     * @returns IDriveItem
     */
    async upload(fileOptions) {
        return Reflect.apply(driveItemUpload, this, [fileOptions]);
    }
};
_Root = tslib_es6_decorate([
    defaultPath("root"),
    hasDelta()
], _Root);

const Root = graphInvokableFactory(_Root);
/**
 * Describes a Drive Item instance
 *
 */
let _DriveItem = class _DriveItem extends _GraphInstance {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children() {
        return DriveItems(this, "children");
    }
    get items() {
        return DriveItems(this, "items");
    }
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns Microsoft Graph - ThumbnailSet
     */
    get thumbnails() {
        return graphqueryable_GraphCollection(this, "thumbnails");
    }
    /**
     * Method for retrieving the versions of a drive item.
     * @returns IDriveItemVersionInfo
     */
    get versions() {
        return graphqueryable_GraphCollection(this, "versions");
    }
    /**
     * Method for moving a file to a new location and/or name.
     * @param moveOptions - IItemOptions object
     * @returns string - the URL where the new file is located
     */
    async moveItem(moveOptions) {
        return graphPatch(this, body(moveOptions));
    }
    /**
     * Method for retrieving the contents of a drive item.
     * @returns Blob
     */
    async getContent() {
        const info = await this();
        const query = GraphQueryable([this, info["@microsoft.graph.downloadUrl"]], null)
            .using(BlobParse())
            .using(CacheNever());
        query.on.pre(async (url, init, result) => {
            init.responseType = "arraybuffer";
            return [url, init, result];
        });
        return query();
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
        const data = await graphPost(creator, body(copyOptions));
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
        const query = GraphQueryable(this, `content?format=${format}`)
            .using(BlobParse())
            .using(CacheNever());
        query.on.pre(async (url, init, result) => {
            init.responseType = "arraybuffer";
            return [url, init, result];
        });
        return query();
    }
    /**
     * Method for getting a temporary preview image of a drive item.
     * @returns Microsoft Graph - DriveItem
     */
    async follow() {
        return await graphPost(DriveItem(this, "follow"), body(null));
    }
    /**
     * Method for getting a temporary preview image of a drive item.
     * @returns void
     */
    async unfollow() {
        return await graphPost(DriveItem(this, "unfollow"), body(null));
    }
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileUploadOptions object
     * @returns Microsoft Graph - DriveItem
     */
    async upload(fileOptions) {
        return Reflect.apply(driveItemUpload, this, [fileOptions]);
    }
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param resuableUploadOptions - IResumableUploadOptions object
     * @returns session: Microsoft Graph - UploadSession, resumableUpload: IResumableUpload
     */
    async createUploadSession(resuableUploadOptions) {
        return Reflect.apply(getUploadSession, this, [resuableUploadOptions]);
    }
    /**
     * Method for getting a temporary preview image of a drive item.
     * @param previewOptions - IPreviewOptions (Optional)
     * @returns Microsoft Graph - DriveItemPreview
     */
    async preview(previewOptions) {
        return graphPost(DriveItem(this, "preview"), body(previewOptions));
    }
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @returns void
     */
    async permanentDelete() {
        return graphPost(DriveItem(this, "permanentDelete"), body(null));
    }
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @param label: ISensitivityLabel
     * @returns string - long running operation status URL
     */
    async assignSensitivityLabel(label) {
        const data = await graphPost(DriveItem(this, "assignSensitivityLabel"), body(label));
        let result = null;
        if (data.has("location")) {
            result = data.get("location");
        }
        return result;
    }
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @returns Microsoft Graph - ExtractSensitivityLabelsResult
     */
    async extractSensitivityLabels() {
        return graphPost(DriveItem(this, "extractSensitivityLabels"), body(null));
    }
    /**
     * Method for retrieving the retention label of the drive item.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    retentionLabel() {
        return GraphQueryable(this, "retentionLabel");
    }
    /**
     * Method for locking/unlocking a record of the drive item.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    async recordLocked(locked) {
        const postBody = {
            retentionSettings: {
                "isRecordLocked": locked,
            },
        };
        return graphPatch(DriveItem(this, "retentionLabel"), body(postBody));
    }
    /**
     * Method for deleting a retention label from a driveItem.
     * @returns void
     */
    async removeRetentionLabel() {
        return graphDelete(DriveItem(this, "retentionLabel"));
    }
    /**
     * Method for updating a retention label on a driveItem.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    async updateRetentionLabel(name) {
        const postBody = { name };
        return graphPatch(DriveItem(this, "retentionLabel"), body(postBody));
    }
    async checkIn(checkInOptions) {
        return graphPost(DriveItem(this, "checkin"), body(checkInOptions));
    }
    async checkOut() {
        return graphPost(DriveItem(this, "checkout"));
    }
};
_DriveItem = tslib_es6_decorate([
    deleteable(),
    updateable()
], _DriveItem);

const DriveItem = graphInvokableFactory(_DriveItem);
/**
 * Describes a collection of Drive Item objects
 *
 */
let _DriveItems = class _DriveItems extends _GraphCollection {
    /**
     * Adds a file to this collection of drive items.
     * This method allows more control for conflict behavior and affecting other properties of the DriveItem than the .upload method.
     * For more upload options please see the .upload method on DriveItem.
     * @param fileInfo - IDriveItemAdd
     * @returns Microsoft Graph - DriveItem
     */
    async add(fileInfo) {
        const postBody = {
            name: fileInfo.filename,
            file: fileInfo.driveItem || {},
            "@microsoft.graph.conflictBehavior": fileInfo.conflictBehavior || "rename",
        };
        const driveItem = await graphPost(this, body(postBody));
        const q = DriveItem([this, `${combine("drives", driveItem.parentReference.driveId, "items", driveItem.id)}`], "content");
        q.using(InjectHeaders({
            "Content-Type": fileInfo.contentType || "application/json",
        }));
        return await graphPut(q, { body: fileInfo.content });
    }
    /**
     * Adds a folder to this collection of drive items.
     * @param folderInfo - an object of type IDriveItemAddFolder specifying the properties of the new folder
     * @returns Microsoft Graph - DriveItem
     */
    async addFolder(folderInfo) {
        const postBody = {
            name: folderInfo.name,
            folder: folderInfo.driveItem || {},
            "@microsoft.graph.conflictBehavior": folderInfo.conflictBehavior || "rename",
        };
        return await graphPost(this, body(postBody));
    }
};
_DriveItems = tslib_es6_decorate([
    getById(DriveItem)
], _DriveItems);

const DriveItems = graphInvokableFactory(_DriveItems);

;// ./node_modules/@pnp/graph/analytics/types.js

function analytics(analyticsOptions) {
    const query = `analytics/${analyticsOptions ? analyticsOptions.timeRange : "lastSevenDays"}`;
    return graphGet(GraphQueryable(this, query));
}

;// ./node_modules/@pnp/graph/analytics/driveItems.js


_DriveItem.prototype.analytics = analytics;

;// ./node_modules/@pnp/graph/list-item/types.js



/**
 * Represents a list item entity
 */
let _ListItem = class _ListItem extends _GraphInstance {
    /**
     * Method for retrieving the versions of a list item.
     * @returns IListItemVersion
     */
    get versions() {
        return graphqueryable_GraphCollection(this, "versions");
    }
};
_ListItem = tslib_es6_decorate([
    deleteable(),
    updateable()
], _ListItem);

const ListItem = graphInvokableFactory(_ListItem);
/**
 * Describes a collection of list item objects
 *
 */
let _ListItems = class _ListItems extends _GraphCollection {
};
_ListItems = tslib_es6_decorate([
    defaultPath("items"),
    getById(ListItem),
    addable()
], _ListItems);

const ListItems = graphInvokableFactory(_ListItems);
/**
 * Represents a document set version
 */
let _DocumentSetVersion = class _DocumentSetVersion extends _GraphInstance {
    /**
     * Restore a document set version
     *
     */
    async restore() {
        return graphPost(DocumentSetVersion(this, "restore"));
    }
};
_DocumentSetVersion = tslib_es6_decorate([
    deleteable()
], _DocumentSetVersion);

const DocumentSetVersion = graphInvokableFactory(_DocumentSetVersion);
/**
 * Describes a collection of document set versions
 *
 */
let _DocumentSetVersions = class _DocumentSetVersions extends _GraphCollection {
};
_DocumentSetVersions = tslib_es6_decorate([
    defaultPath("documentSetVersions"),
    getById(DocumentSetVersion),
    addable()
], _DocumentSetVersions);

const DocumentSetVersions = graphInvokableFactory(_DocumentSetVersions);

;// ./node_modules/@pnp/graph/analytics/listItems.js


_ListItem.prototype.analytics = analytics;

;// ./node_modules/@pnp/graph/sites/types.js





/**
 * Sites
 */
let _Sites = class _Sites extends _GraphCollection {
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
    async getByUrl(hostname, siteUrl) {
        return Site(this, `${hostname}:${combine("/", siteUrl)}:`).rebase();
    }
    /**
     * List sites across geographies in an organization. This API can also be used to enumerate all sites in a non-multi-geo tenant.
     *
     * @returns A ISites collection which can be used with async iteration to page through the collection
     */
    getAllSites() {
        return Sites(this, "getAllSites");
    }
};
_Sites = tslib_es6_decorate([
    defaultPath("sites")
], _Sites);

const Sites = graphInvokableFactory(_Sites);
/**
 * Site
 */
class _Site extends _GraphInstance {
    get sites() {
        return Sites(this);
    }
    /**
     * Rebases this ISite instances to ensure it is of the pattern /sites/{site id} regardless of how it was first retrieved
     */
    async rebase() {
        const siteInfo = await Site(this).select("id")();
        return Site([this, `sites/${siteInfo.id}`]);
    }
}
const Site = graphInvokableFactory(_Site);
/**
 * Followed Sites
 *
 * Note: At this time listing a user's followed sites is not supported with app-only permissions
 */
let _FollowedSites = class _FollowedSites extends _GraphCollection {
    /**
     * Adds site(s) to the user's collection of followed sites
     *
     * @param siteIds The collection of site ids to add
     * @returns Site info for the newly followed sites
     */
    add(...siteIds) {
        return graphPost(FollowedSites(this, "add"), body({ value: siteIds.map(id => ({ id })) }));
    }
    /**
     * REmoves site(s) to the user's collection of followed sites
     *
     * @param siteIds The collection of site ids to remove
     */
    remove(...siteIds) {
        return graphPost(FollowedSites(this, "remove"), body({ value: siteIds.map(id => ({ id })) }));
    }
};
_FollowedSites = tslib_es6_decorate([
    defaultPath("followedsites")
], _FollowedSites);

const FollowedSites = graphInvokableFactory(_FollowedSites);

;// ./node_modules/@pnp/graph/analytics/sites.js


_Site.prototype.analytics = analytics;

;// ./node_modules/@pnp/graph/analytics/index.js




;// ./node_modules/@pnp/graph/appCatalog/types.js




/**
 * AppCatalogs
 */
let _AppCatalog = class _AppCatalog extends _GraphInstance {
    /**
     * Get teams apps in appCatalog
     *
     */
    get teamsApps() {
        return TeamsApps(this);
    }
};
_AppCatalog = tslib_es6_decorate([
    defaultPath("appCatalogs")
], _AppCatalog);

const AppCatalog = graphInvokableFactory(_AppCatalog);
/**
 * AppDefinition
 */
class _AppDefinition extends _GraphInstance {
    /**
     * Gets bot associated with app
     *
     */
    async bot() {
        return graphGet(AppDefinitions(this, "/bot"));
    }
}
const AppDefinition = graphInvokableFactory(_AppDefinition);
/**
 * AppDefinitions
 */
let _AppDefinitions = class _AppDefinitions extends _GraphCollection {
};
_AppDefinitions = tslib_es6_decorate([
    defaultPath("appDefinitions"),
    getById(AppDefinition)
], _AppDefinitions);

const AppDefinitions = graphInvokableFactory(_AppDefinitions);
/**
 * TeamsApp
 */
class _TeamsApp extends _GraphInstance {
    /**
     * Get app definitions
     *
     */
    get appDefinitions() {
        return AppDefinitions(this);
    }
    /**
     * Deletes a Teams App
     *
     */
    async delete(appDefinitionId) {
        // Un-approved apps must be deleted differently. https://learn.microsoft.com/en-us/graph/api/teamsapp-delete?view=graph-rest-1.0&tabs=http#permissions
        if (appDefinitionId) {
            return graphDelete(AppDefinitions(this, `/${appDefinitionId}`));
        }
        return graphDelete(this);
    }
    /**
     * Updates a Teams App
     *
     * @param zip  zip file of app
     * @param requiresReview This optional query parameter triggers the app review process. Users with admin privileges can submit apps without triggering a review.
     */
    async update(zip, requiresReview = false) {
        const q = AppDefinitions(this, `?$requiresReview=${requiresReview}`);
        q.using(InjectHeaders({
            "Content-Type": "application/zip",
        }));
        return graphPost(q, { body: zip });
    }
}
const TeamsApp = graphInvokableFactory(_TeamsApp);
/**
 * TeamsApps
 */
let _TeamsApps = class _TeamsApps extends _GraphCollection {
    /**
     * Adds a Teams App
     *
     * @param zip  zip file of app
     * @param requiresReview This optional query parameter triggers the app review process. Users with admin privileges can submit apps without triggering a review.
     *
     */
    async add(zip, requiresReview = false) {
        const q = TeamsApp(this, `?requiresReview=${requiresReview}`);
        q.using(InjectHeaders({
            "Content-Type": "application/zip",
        }));
        return graphPost(q, { body: zip });
    }
};
_TeamsApps = tslib_es6_decorate([
    defaultPath("teamsApps"),
    getById(TeamsApp)
], _TeamsApps);

const TeamsApps = graphInvokableFactory(_TeamsApps);

;// ./node_modules/@pnp/graph/appCatalog/index.js



Reflect.defineProperty(GraphFI.prototype, "appCatalog", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(AppCatalog);
    },
});

;// ./node_modules/@pnp/graph/conversations/types.js




/**
 * Conversation
 */
let _Conversation = class _Conversation extends _GraphInstance {
    /**
     * Get all the threads in a group conversation.
     */
    get threads() {
        return Threads(this);
    }
};
_Conversation = tslib_es6_decorate([
    updateable(),
    deleteable()
], _Conversation);

const Conversation = graphInvokableFactory(_Conversation);
/**
 * Conversations
 */
let _Conversations = class _Conversations extends _GraphCollection {
};
_Conversations = tslib_es6_decorate([
    defaultPath("conversations"),
    addable(),
    getById(Conversation)
], _Conversations);

const Conversations = graphInvokableFactory(_Conversations);
/**
 * Thread
 */
let _Thread = class _Thread extends _GraphInstance {
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
        return graphPost(Thread(this, "reply"), body(post));
    }
};
_Thread = tslib_es6_decorate([
    deleteable()
], _Thread);

const Thread = graphInvokableFactory(_Thread);
/**
 * Threads
 */
let _Threads = class _Threads extends _GraphCollection {
};
_Threads = tslib_es6_decorate([
    defaultPath("threads"),
    addable(),
    getById(Thread)
], _Threads);

const Threads = graphInvokableFactory(_Threads);
/**
 * Post
 */
let _Post = class _Post extends _GraphInstance {
    /**
     * Forward a post to a recipient
     */
    forward(info) {
        return graphPost(Post(this, "forward"), body(info));
    }
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    reply(post) {
        const params = {
            post: {
                ...post,
            },
        };
        return graphPost(Post(this, "reply"), body(params));
    }
};
_Post = tslib_es6_decorate([
    deleteable()
], _Post);

const Post = graphInvokableFactory(_Post);
/**
 * Posts
 */
let _Posts = class _Posts extends _GraphCollection {
};
_Posts = tslib_es6_decorate([
    defaultPath("posts"),
    addable(),
    getById(Post)
], _Posts);

const Posts = graphInvokableFactory(_Posts);
/**
 * Senders
 */
class _Senders extends _GraphCollection {
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    add(id) {
        return graphPost(Senders(this, "$ref"), body({ "@odata.id": id }));
    }
    /**
     * Removes the entity from the collection
     *
     * @param id The full @odata.id value to remove (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    remove(id) {
        const remover = Senders(this, "$ref");
        remover.query.set("$id", id);
        return graphDelete(remover);
    }
}
const Senders = graphInvokableFactory(_Senders);

;// ./node_modules/@pnp/graph/utils/type.js
function type(n, a) {
    return Object.assign({ "@odata.type": n }, a);
}

;// ./node_modules/@pnp/graph/attachments/types.js





/**
 * Attachment
 */
let _Attachment = class _Attachment extends _GraphInstance {
};
_Attachment = tslib_es6_decorate([
    deleteable()
], _Attachment);

const Attachment = graphInvokableFactory(_Attachment);
/**
 * Attachments
 */
let _Attachments = class _Attachments extends _GraphCollection {
    // TODO: Adding attachments is not implemented correctly. I believe it requires updating the parent item but needs further investigation.
    /**
     * Add attachment to this collection
     *
     * @param attachmentInfo Attachment properties
     * @param bytes File content
     */
    addFile(attachmentInfo, bytes) {
        return graphPost(GraphInstance(this), body(type("#microsoft.graph.fileAttachment", {
            contentBytes: bytes,
            ...attachmentInfo,
        })));
    }
};
_Attachments = tslib_es6_decorate([
    defaultPath("attachments"),
    getById(Attachment)
], _Attachments);

const Attachments = graphInvokableFactory(_Attachments);

;// ./node_modules/@pnp/graph/attachments/conversations.js



addProp(_Post, "attachments", Attachments);

;// ./node_modules/@pnp/graph/mail/funcs.js



/**
 * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range,
 * from the user's default calendar, or from some other calendar of the user's
 *
 * @param this IGraphQueryable instance
 * @param type "reply" | "replyAll" | "createReply" | "createReplyAll" | "forward" | "createForward"
 * @param response The body of the response message
 *   If using JSON provide either comment: string or message: IMessageType.
 *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
 * @param timeZone (optional) The time zone to use when creating the draft.
 *   Only use when providing a JSON message.
 */
async function mailResponse(gq, type, response, timeZone = null) {
    const header = (timeZone != null) ? { "Prefer: outlook.timezone": timeZone.alias } : null;
    const postBody = response;
    const q = Message(gq, type);
    if (header != null) {
        q.using(InjectHeaders(header));
    }
    return await graphPost(q, body(postBody));
}

;// ./node_modules/@pnp/graph/mail/messages.js





/**
 * Message
 */
let _Message = class _Message extends _GraphInstance {
    /**
     * Sends the message
     *
     */
    async send() {
        return await graphPost(Message(this, "send"));
    }
    /**
     * Copy the message
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    async copy(destinationFolderId) {
        return await graphPost(Message(this, "copy"), body({ destinationId: destinationFolderId }));
    }
    /**
     * Move the message
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    async move(destinationFolderId) {
        return await graphPost(Message(this, "move"), body({ destinationId: destinationFolderId }));
    }
    /**
     * Create a draft response
     *
     * @param response (optional) The body of the response message
     *   If using JSON, do not provide any payload, you will get an error.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    async createReply(response, timeZone) {
        return (await mailResponse(this, "createReply", response, timeZone));
    }
    /**
     * Send a message response
     *
     * @param response (optional) The body of the response message
     *   If using JSON provide either comment: string or message: IMessageType.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    async reply(response, timeZone) {
        return (await mailResponse(this, "reply", response, timeZone));
    }
    /**
     * Create a draft response message to all
     *
     * @param response (optional) The body of the response message
     *   If using JSON, do not provide any payload, you will get an error.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    async createReplyAll(response, timeZone) {
        return (await mailResponse(this, "createReplyAll", response, timeZone));
    }
    /**
    * Send a message response to all
    *
    * @param response (optional) The body of the response message
    *   If using JSON provide either comment: string or message: IMessageType.
    *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
    * @param timeZone (optional) The time zone to use when creating the draft.
    *   Only use when providing a JSON message.
    */
    async replyAll(response, timeZone) {
        return (await mailResponse(this, "replyAll", response, timeZone));
    }
    /**
     * Create a draft forward message
     *
     * @param forward (optional) The body of the forward message
     *   If using JSON provide either comment: string or message: IMessageType.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    async createForward(forward, timeZone) {
        return (await mailResponse(this, "createForward", forward, timeZone));
    }
    /**
    * Forward a message
    *
    * @param forward (optional) The body of the forward message
    *   If using JSON provide either comment: string or message: IMessageType.
    *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
    * @param timeZone (optional) The time zone to use when creating the draft.
    *   Only use when providing a JSON message.
    */
    async forward(forward, timeZone) {
        return (await mailResponse(this, "forward", forward, timeZone));
    }
};
_Message = tslib_es6_decorate([
    updateable(),
    deleteable()
], _Message);

const Message = graphInvokableFactory(_Message);
/**
 * Messages
 */
let _Messages = class _Messages extends _GraphCollection {
};
_Messages = tslib_es6_decorate([
    defaultPath("messages"),
    getById(Message),
    addable(),
    hasDelta()
], _Messages);

const Messages = graphInvokableFactory(_Messages);
/**
 * Message Rule
 */
let _MessageRule = class _MessageRule extends _GraphInstance {
};
_MessageRule = tslib_es6_decorate([
    updateable(),
    deleteable()
], _MessageRule);

const MessageRule = graphInvokableFactory(_MessageRule);
/**
 * Message Rules
 */
let _MessageRules = class _MessageRules extends _GraphCollection {
};
_MessageRules = tslib_es6_decorate([
    defaultPath("messageRules"),
    getById(MessageRule),
    addable()
], _MessageRules);

const MessageRules = graphInvokableFactory(_MessageRules);

;// ./node_modules/@pnp/graph/attachments/message.js



addProp(_Message, "attachments", Attachments);

;// ./node_modules/@pnp/graph/calendars/funcs.js



/**
 * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range,
 * from the user's default calendar, or from some other calendar of the user's
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
function calendarView(start, end) {
    return CalendarView(this, start, end);
}
/**
 * Suggest meeting times and locations based on organizer and attendee availability, and time or location constraints specified as parameters.

 * @param this IGraphQueryable instance
 * @param properties The body of the meetingTimeSuggestionsRequest resource that contains the parameters for the operation.
 */
async function findMeetingTimes(properties) {
    return graphPost(graphqueryable_GraphCollection(this, "findMeetingTimes"), body(properties));
}
/**
 * Get the emailAddress objects that represent all the meeting rooms in the user's tenant or in a specific room list.
 *
 * @param this IGraphQueryable instance
 * @param roomList The SMTP address associated with the room list.
 */
function findRooms(roomList) {
    const query = GraphCollection(this, roomList ? "findRooms(RoomList=@roomList)" : "findRooms");
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
    const query = graphqueryable_GraphCollection(this, "instances");
    query.query.set("startDateTime", start);
    query.query.set("endDateTime", end);
    return query;
}
/**
 * Get the list of event remindres defined by a time range,
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
function reminderView(start, end) {
    const query = graphqueryable_GraphCollection(this, `reminderView(startDateTime='${start}',endDateTime='${end}')`);
    return query;
}

;// ./node_modules/@pnp/graph/calendars/types.js





/**
 * Calendar
 */
let _Calendar = class _Calendar extends _GraphInstance {
    constructor() {
        super(...arguments);
        this.calendarView = calendarView;
    }
    get calendarPermissions() {
        return CalendarPermissions(this);
    }
    get events() {
        return Events(this);
    }
    /**
     * Get the free/busy availability information for a collection of users,
     * distributions lists, or resources (rooms or equipment) for a specified time period.
     *
     * @param properties The set of properties used to get the schedule
     */
    async getSchedule(properties) {
        return graphPost(Calendar(this, "getSchedule"), body(properties));
    }
};
_Calendar = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Calendar);

const Calendar = graphInvokableFactory(_Calendar);
/**
 * Calendars
 */
let _Calendars = class _Calendars extends _GraphCollection {
};
_Calendars = tslib_es6_decorate([
    defaultPath("calendars"),
    getById(Calendar),
    addable()
], _Calendars);

const Calendars = graphInvokableFactory(_Calendars);
/**
 * CalendarView
 */
class _CalendarView extends _GraphCollection {
    constructor(baseUrl, start, end) {
        super(baseUrl, "calendarView");
        this.query.set("startDateTime", start);
        this.query.set("endDateTime", end);
    }
    async delta(token) {
        return graphPost(GraphQueryable(this, `delta?${this.query}`), body({ token }));
    }
}
const CalendarView = (baseUrl, start, end) => new _CalendarView(baseUrl, start, end);
/**
 * Event
 */
let _Event = class _Event extends _GraphInstance {
    constructor() {
        super(...arguments);
        this.instances = instances;
    }
    async accept(comment, sendResponse) {
        return graphPost(Event(this, "accept"), body({ comment, sendResponse }));
    }
    async cancel(comment) {
        return graphPost(Event(this, "cancel"), body({ comment }));
    }
    async decline(comment, sendResponse, proposedNewTime) {
        if (proposedNewTime) {
            sendResponse = true;
        }
        return graphPost(Event(this, "decline"), body({ comment, sendResponse, proposedNewTime }));
    }
    async dismissReminder() {
        return graphPost(Event(this, "dismissReminder"));
    }
    async forward(fowardEventInfo) {
        return graphPost(Event(this, "forward"), body(fowardEventInfo));
    }
    async snoozeReminder(reminderTime) {
        return graphPost(Event(this, "snoozeReminder"), body({ newReminderTime: reminderTime }));
    }
    async tentativelyAccept(comment, sendResponse, proposedNewTime) {
        if (proposedNewTime) {
            sendResponse = true;
        }
        return graphPost(Event(this, "tentativelyAccept"), body({ comment, sendResponse, proposedNewTime }));
    }
};
_Event = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Event);

const Event = graphInvokableFactory(_Event);
/**
 * Events
 */
let _Events = class _Events extends _GraphCollection {
};
_Events = tslib_es6_decorate([
    defaultPath("events"),
    getById(Event),
    addable()
], _Events);

const Events = graphInvokableFactory(_Events);
/**
 * Event
 */
let _CalendarGroup = class _CalendarGroup extends _GraphInstance {
    get calendars() {
        return Calendars(this);
    }
};
_CalendarGroup = tslib_es6_decorate([
    deleteable(),
    updateable()
], _CalendarGroup);

const CalendarGroup = graphInvokableFactory(_CalendarGroup);
/**
 * CalendarGroups
 */
let _CalendarGroups = class _CalendarGroups extends _GraphCollection {
};
_CalendarGroups = tslib_es6_decorate([
    defaultPath("calendarGroups"),
    getById(CalendarGroup),
    addable()
], _CalendarGroups);

const CalendarGroups = graphInvokableFactory(_CalendarGroups);
/**
 * CalendarPermission
 */
let _CalendarPermission = class _CalendarPermission extends _GraphInstance {
};
_CalendarPermission = tslib_es6_decorate([
    updateable(),
    deleteable()
], _CalendarPermission);

const CalendarPermission = graphInvokableFactory(_CalendarPermission);
/**
 * CalendarPermissions
 */
let _CalendarPermissions = class _CalendarPermissions extends _GraphCollection {
};
_CalendarPermissions = tslib_es6_decorate([
    defaultPath("calendarPermissions"),
    getById(CalendarPermission),
    addable()
], _CalendarPermissions);

const CalendarPermissions = graphInvokableFactory(_CalendarPermissions);

;// ./node_modules/@pnp/graph/attachments/event.js



addProp(_Event, "attachments", Attachments);

;// ./node_modules/@pnp/graph/attachments/index.js





;// ./node_modules/@pnp/graph/bookings/funcs.js

/**
 * Get the collection of bookingAppointment objects for a bookingBusiness, that occurs in the specified date range.
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
function funcs_calendarView(start, end) {
    const query = graphqueryable_GraphCollection(this, "calendarView");
    query.query.set("startDateTime", start);
    query.query.set("endDateTime", end);
    return query;
}

;// ./node_modules/@pnp/graph/bookings/types.js





/**
 * Describes a Booking Currency entity
 *
 */
class _BookingCurrency extends _GraphInstance {
}
const BookingCurrency = graphInvokableFactory(_BookingCurrency);
/**
 * Describes a collection of Booking Currency objects
 *
 */
let _BookingCurrencies = class _BookingCurrencies extends _GraphCollection {
};
_BookingCurrencies = tslib_es6_decorate([
    defaultPath("solutions/bookingCurrencies"),
    getById(BookingCurrency)
], _BookingCurrencies);

const BookingCurrencies = graphInvokableFactory(_BookingCurrencies);
/**
 * Represents a booking business entity
 */
let _BookingBusiness = class _BookingBusiness extends _GraphInstance {
    constructor() {
        super(...arguments);
        /**
         * Get the calendar view for the booking business.
         */
        this.calendarView = funcs_calendarView;
    }
    /**
     * Make the scheduling page of a business available to external customers.
     */
    publish() {
        return graphPost(BookingBusiness(this, "publish"));
    }
    /**
     * Make the scheduling page of this business not available to external customers.
     */
    unpublish() {
        return graphPost(BookingBusiness(this, "unpublish"));
    }
    /**
     * Get the appointments for the booking business.
     */
    get appointments() {
        return BookingAppointments(this);
    }
    /**
     * Get the customers for the booking business.
     */
    get customers() {
        return BookingCustomers(this);
    }
    /**
     * Get the services for the booking business.
     */
    get services() {
        return BookingServices(this);
    }
    /**
     * Get the staff members for the booking business.
     */
    get staffMembers() {
        return BookingStaffMembers(this);
    }
    /**
     * Get the staff members for the booking business.
     */
    get customQuestions() {
        return BookingCustomQuestions(this);
    }
};
_BookingBusiness = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingBusiness);

const BookingBusiness = graphInvokableFactory(_BookingBusiness);
/**
 * Describes a collection of Booking Business objects
 *
 */
let _BookingBusinesses = class _BookingBusinesses extends _GraphCollection {
    /**
         * Create a new booking business as specified in the request body.
         *
         * @param name The name of the business, which interfaces with customers. This name appears at the top of the business scheduling page.
         * @param additionalProperties A plain object collection of additional properties you want to set on the new group of type IBookingBusiness
         */
    async add(name, additionalProperties = {}) {
        const postBody = {
            displayName: name,
            ...additionalProperties,
        };
        const data = await graphPost(this, body(postBody));
        return {
            data,
            bookingBusiness: this.getById(data.id),
        };
    }
};
_BookingBusinesses = tslib_es6_decorate([
    defaultPath("solutions/bookingBusinesses"),
    getById(BookingBusiness)
], _BookingBusinesses);

const BookingBusinesses = graphInvokableFactory(_BookingBusinesses);
/**
 * Represents a booking appointment entity
 */
let _BookingApointment = class _BookingApointment extends _GraphInstance {
    /**
     * Cancel the specified bookingAppointment in the specified bookingBusiness and send a message to the involved customer and staff members.
     */
    cancel(cancellationMessage) {
        const postBody = { cancellationMessage };
        return graphPost(BookingAppointment(this, "cancel"), body(postBody));
    }
};
_BookingApointment = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingApointment);

const BookingAppointment = graphInvokableFactory(_BookingApointment);
/**
 * Describes a collection of booking appointment objects
 *
 */
let _BookingAppointments = class _BookingAppointments extends _GraphCollection {
    /**
     * Create a new booking appointment as specified in the request body.
     *
     * @param bookingAppointment  a JSON representation of a BookingAppointment object.
     */
    async add(bookingAppointment) {
        const data = await graphPost(this, body(bookingAppointment));
        return {
            data,
            bookingAppointment: this.getById(data.id),
        };
    }
};
_BookingAppointments = tslib_es6_decorate([
    defaultPath("appointments"),
    getById(BookingAppointment)
], _BookingAppointments);

const BookingAppointments = graphInvokableFactory(_BookingAppointments);
/**
 * Represents a booking customer entity
 */
let _BookingCustomer = class _BookingCustomer extends _GraphInstance {
};
_BookingCustomer = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingCustomer);

const BookingCustomer = graphInvokableFactory(_BookingCustomer);
/**
 * Describes a collection of booking customer objects
 *
 */
let _BookingCustomers = class _BookingCustomers extends _GraphCollection {
    /**
     * Create a new booking customer as specified in the request body.
     *
     * @param bookingCustomer  a JSON representation of a BookingCustomer object.
     */
    async add(bookingCustomer) {
        const data = await graphPost(this, body(bookingCustomer));
        return {
            data,
            bookingCustomer: this.getById(data.id),
        };
    }
};
_BookingCustomers = tslib_es6_decorate([
    defaultPath("customers"),
    getById(BookingCustomer)
], _BookingCustomers);

const BookingCustomers = graphInvokableFactory(_BookingCustomers);
/**
 * Represents a booking service entity
 */
let _BookingService = class _BookingService extends _GraphInstance {
};
_BookingService = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingService);

const BookingService = graphInvokableFactory(_BookingService);
/**
 * Describes a collection of booking service objects
 *
 */
let _BookingServices = class _BookingServices extends _GraphCollection {
    /**
     * Create a new booking service as specified in the request body.
     *
     * @param bookingService  a JSON representation of a BookingService object.
     */
    async add(bookingService) {
        const data = await graphPost(this, body(bookingService));
        return {
            data,
            bookingService: this.getById(data.id),
        };
    }
};
_BookingServices = tslib_es6_decorate([
    defaultPath("services"),
    getById(BookingService)
], _BookingServices);

const BookingServices = graphInvokableFactory(_BookingServices);
/**
 * Represents a booking staffmember entity
 */
let _BookingStaffMember = class _BookingStaffMember extends _GraphInstance {
};
_BookingStaffMember = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingStaffMember);

const BookingStaffMember = graphInvokableFactory(_BookingStaffMember);
/**
 * Describes a collection of booking staffmember objects
 *
 */
let _BookingStaffMembers = class _BookingStaffMembers extends _GraphCollection {
    /**
     * Create a new booking staffmember as specified in the request body.
     *
     * @param bookingStaffMember  a JSON representation of a BookingStaffMember object.
     */
    async add(bookingStaffMember) {
        const data = await graphPost(this, body(bookingStaffMember));
        return {
            data,
            bookingStaffMember: this.getById(data.id),
        };
    }
};
_BookingStaffMembers = tslib_es6_decorate([
    defaultPath("staffMembers"),
    getById(BookingStaffMember)
], _BookingStaffMembers);

const BookingStaffMembers = graphInvokableFactory(_BookingStaffMembers);
/**
 * Represents a booking custom questions entity
 */
let _BookingCustomQuestion = class _BookingCustomQuestion extends _GraphInstance {
};
_BookingCustomQuestion = tslib_es6_decorate([
    deleteable(),
    updateable()
], _BookingCustomQuestion);

const BookingCustomQuestion = graphInvokableFactory(_BookingCustomQuestion);
/**
 * Describes a collection of booking custom questions objects
 *
 */
let _BookingCustomQuestions = class _BookingCustomQuestions extends _GraphCollection {
    /**
     * Create a new booking customquestions as specified in the request body.
     *
     * @param bookingCustomQuestion  a JSON representation of a BookingCustomQuestion object.
     */
    async add(bookingCustomQuestion) {
        const data = await graphPost(this, body(bookingCustomQuestion));
        return {
            data,
            bookingCustomQuestion: this.getById(data.id),
        };
    }
};
_BookingCustomQuestions = tslib_es6_decorate([
    defaultPath("customquestions"),
    getById(BookingCustomQuestion)
], _BookingCustomQuestions);

const BookingCustomQuestions = graphInvokableFactory(_BookingCustomQuestions);

;// ./node_modules/@pnp/graph/bookings/index.js



Reflect.defineProperty(GraphFI.prototype, "bookingBusinesses", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(BookingBusinesses);
    },
});
Reflect.defineProperty(GraphFI.prototype, "bookingCurrencies", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(BookingCurrencies);
    },
});

;// ./node_modules/@pnp/graph/directory-objects/types.js





/**
 * Represents a Directory Object entity
 */
let _DirectoryObject = class _DirectoryObject extends _GraphInstance {
    /**
   * Returns all the groups and directory roles that the specified Directory Object is a member of. The check is transitive
   *
   * @param securityEnabledOnly
   */
    getMemberObjects(securityEnabledOnly = false) {
        return graphPost(DirectoryObject(this, "getMemberObjects"), body({ securityEnabledOnly }));
    }
    /**
   * Returns all the groups that the specified Directory Object is a member of. The check is transitive
   *
   * @param securityEnabledOnly
   */
    getMemberGroups(securityEnabledOnly = false) {
        return graphPost(DirectoryObject(this, "getMemberGroups"), body({ securityEnabledOnly }));
    }
    /**
   * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
   * This function is transitive.
   * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
   */
    checkMemberGroups(groupIds) {
        return graphPost(DirectoryObject(this, "checkMemberGroups"), body({ groupIds }));
    }
};
_DirectoryObject = tslib_es6_decorate([
    deleteable()
], _DirectoryObject);

const DirectoryObject = graphInvokableFactory(_DirectoryObject);
/**
 * Describes a collection of Directory Objects
 *
 */
let _DirectoryObjects = class _DirectoryObjects extends _GraphCollection {
    /**
  * Returns the directory objects specified in a list of ids. NOTE: The directory objects returned are the full objects containing all their properties.
  * The $select query option is not available for this operation.
  *
  * @param ids A collection of ids for which to return objects. You can specify up to 1000 ids.
  * @param type A collection of resource types that specifies the set of resource collections to search. Default is directoryObject.
  */
    getByIds(ids, type = DirectoryObjectTypes.directoryObject) {
        return graphPost(DirectoryObjects(this, "getByIds"), body({ ids, type }));
    }
    /**
     * 	Retrieves the total count of matching resources
     *  If the resource doesn't support count, this value will always be zero
     */
    async count() {
        return Count(this);
    }
};
_DirectoryObjects = tslib_es6_decorate([
    defaultPath("directoryObjects"),
    getById(DirectoryObject)
], _DirectoryObjects);

const DirectoryObjects = graphInvokableFactory(_DirectoryObjects);
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

;// ./node_modules/@pnp/graph/groups/types.js





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
let _Group = class _Group extends _DirectoryObject {
    /**
     * Add the group to the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    addFavorite() {
        return graphPost(Group(this, "addFavorite"));
    }
    /**
     * Remove the group from the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    removeFavorite() {
        return graphPost(Group(this, "removeFavorite"));
    }
    /**
     * Reset the unseenCount of all the posts that the current user has not seen since their last visit
     */
    resetUnseenCount() {
        return graphPost(Group(this, "resetUnseenCount"));
    }
    /**
     * Calling this method will enable the current user to receive email notifications for this group,
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    subscribeByMail() {
        return graphPost(Group(this, "subscribeByMail"));
    }
    /**
     * Calling this method will prevent the current user from receiving email notifications for this group
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    unsubscribeByMail() {
        return graphPost(Group(this, "unsubscribeByMail"));
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
_Group = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Group);

const Group = graphInvokableFactory(_Group);
/**
 * Describes a collection of Group objects
 *
 */
let _Groups = class _Groups extends _DirectoryObjects {
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
        return graphPost(this, body(postBody));
    }
};
_Groups = tslib_es6_decorate([
    defaultPath("groups"),
    getById(Group)
], _Groups);

const Groups = graphInvokableFactory(_Groups);

;// ./node_modules/@pnp/graph/calendars/groups.js




addProp(_Group, "calendar", Calendar);
addProp(_Group, "events", Events);
_Group.prototype.calendarView = calendarView;

;// ./node_modules/@pnp/graph/users/types.js




let _User = class _User extends _DirectoryObject {
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
_User = tslib_es6_decorate([
    updateable(),
    deleteable()
], _User);

const User = graphInvokableFactory(_User);
let _Users = class _Users extends _DirectoryObjects {
};
_Users = tslib_es6_decorate([
    defaultPath("users"),
    getById(User)
], _Users);

const Users = graphInvokableFactory(_Users);
let _People = class _People extends _DirectoryObjects {
};
_People = tslib_es6_decorate([
    defaultPath("people")
], _People);

const People = graphInvokableFactory(_People);

;// ./node_modules/@pnp/graph/calendars/users.js




addProp(_User, "calendar", Calendar);
addProp(_User, "calendars", Calendars);
addProp(_User, "calendarGroups", CalendarGroups);
addProp(_User, "events", Events);
_User.prototype.calendarView = calendarView;
_User.prototype.findMeetingTimes = findMeetingTimes;
_User.prototype.reminderView = reminderView;

;// ./node_modules/@pnp/graph/calendars/index.js




;// ./node_modules/@pnp/graph/cloud-communications/types.js




/**
 * Presence
 */
let _Presence = class _Presence extends _GraphInstance {
    /**
     * Sets presence information for a user
     *
     * @param presence Presence object to set the state of a user's presence session
     */
    async setPresence(presence) {
        const postBody = { ...presence };
        return graphPost(Presence(this, "setPresence"), body(postBody));
    }
    /**
     * Clear application presence session of a user. If it is the user's only presence session, the user's presence will change to Offline/Offline.
     *
     * @param sessionId Id of the application to clear presence
     */
    async clearPresence(sessionId) {
        const postBody = { sessionId };
        return graphPost(Presence(this, "clearPresence"), body(postBody));
    }
    /**
     * Set the preferred availability and activity status for a user
     *
     * @param presence Presence object to set as preferred availbility and activity status of a user
     */
    async setPreferredPresence(presence) {
        const postBody = { ...presence };
        return graphPost(Presence(this, "setUserPreferredPresence"), body(postBody));
    }
    /**
     * Clears the preferred availability and activity status for a user
     *
     */
    async clearPreferredPresence() {
        return graphPost(Presence(this, "clearUserPreferredPresence"));
    }
    /**
     * Set a presence status message for a user
     *
     */
    async setStatusMessage(message) {
        const postBody = { statusMessage: { ...message } };
        return graphPost(Presence(this, "setStatusMessage"), body(postBody));
    }
};
_Presence = tslib_es6_decorate([
    defaultPath("presence")
], _Presence);

const Presence = graphInvokableFactory(_Presence);
let _Communications = class _Communications extends _GraphCollection {
    /**
     * Retrieve presence information for a group of users
     *
     * @param ids An array of user id's to retrieve presence for.
     */
    async getPresencesByUserId(ids) {
        const postBody = { ids };
        return graphPost(Communications(this, "getPresencesByUserId"), body(postBody));
    }
};
_Communications = tslib_es6_decorate([
    defaultPath("communications")
], _Communications);

const Communications = graphInvokableFactory(_Communications);

;// ./node_modules/@pnp/graph/cloud-communications/users.js



addProp(_User, "presence", Presence);

;// ./node_modules/@pnp/graph/cloud-communications/index.js




Reflect.defineProperty(GraphFI.prototype, "communications", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Communications);
    },
});

;// ./node_modules/@pnp/graph/lists/types.js



/**
 * Represents a list entity
 */
let _List = class _List extends _GraphInstance {
};
_List = tslib_es6_decorate([
    deleteable(),
    updateable()
], _List);

const List = graphInvokableFactory(_List);
/**
 * Describes a collection of list objects
 *
 */
let _Lists = class _Lists extends _GraphCollection {
};
_Lists = tslib_es6_decorate([
    defaultPath("lists"),
    getById(List),
    addable()
], _Lists);

const Lists = graphInvokableFactory(_Lists);

;// ./node_modules/@pnp/graph/columns/addColumns.js


/**
 * Create a new booking service as specified in the request body.
 *
 * @param column  a JSON representation of a Column object.
 */
const addColumn = async function (column) {
    return graphPost(this, body(column));
};

;// ./node_modules/@pnp/graph/columns/types.js



/**
 * Represents a columns entity
 */
let _Column = class _Column extends _GraphInstance {
};
_Column = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Column);

const Column = graphInvokableFactory(_Column);
/**
 * Describes a collection of column objects
 */
let _Columns = class _Columns extends _GraphCollection {
};
_Columns = tslib_es6_decorate([
    defaultPath("columns"),
    getById(Column)
], _Columns);

const Columns = graphInvokableFactory(_Columns);

;// ./node_modules/@pnp/graph/columns/lists.js




_Columns.prototype.add = addColumn;
addProp(_List, "columns", Columns);

;// ./node_modules/@pnp/graph/columns/sites.js




_Columns.prototype.add = addColumn;
addProp(_Site, "columns", Columns);

;// ./node_modules/@pnp/graph/content-types/types.js





/**
 * Represents a content type entity
 */
let _ContentType = class _ContentType extends _GraphInstance {
    /**
      * Check the publishing status of a contentType in a content type hub site.
      */
    isPublished() {
        return graphGet(ContentType(this, "isPublished"));
    }
    /**
     * Publishes a contentType present in the content type hub site.
     */
    publish() {
        return graphPost(ContentType(this, "publish"));
    }
    /**
     * Unpublish a contentType from a content type hub site.
     */
    unpublish() {
        return graphPost(ContentType(this, "unpublish"));
    }
    /**
     * Associate a published content type present in a content type hub with a list of hub sites.
     *
     * @param hubSiteUrls List of canonical URLs to the hub sites where the content type needs to be enforced.
     * @param propagateToExistingLists (optional) If true, content types will be enforced on existing lists in the hub sites;
     * otherwise, it'll be applied only to newly created lists.
     */
    associateWithHubSites(hubSiteUrls, propagateToExistingLists) {
        const postBody = {
            hubSiteUrls: hubSiteUrls,
            propagateToExistingLists: propagateToExistingLists || false,
        };
        return graphPost(ContentType(this, "associateWithHubSites"), body(postBody));
    }
    /**
     * Copy a file to a default content location in a content type. The file can then be added as a default file or template via a POST operation.
     *
     * @param sourceFile Metadata about the source file that needs to be copied to the default content location. Required.
     * @param destinationFileName Destination filename.
     */
    copyToDefaultContentLocation(sourceFile, destinationFileName) {
        const postBody = {
            sourceFile,
            destinationFileName,
        };
        return graphPost(ContentType(this, "copyToDefaultContentLocation"), body(postBody));
    }
};
_ContentType = tslib_es6_decorate([
    deleteable(),
    updateable()
], _ContentType);

const ContentType = graphInvokableFactory(_ContentType);
/**
 * Describes a collection of content type objects
 *
 */
let _ContentTypes = class _ContentTypes extends _GraphCollection {
    /**
     * Add or sync a copy of a published content type from the content type hub to a target site or a list.
     *
     * @param contentTypeId The ID of the content type in the content type hub that will be added to a target site or a list.
     */
    async addCopyFromContentTypeHub(contentTypeId) {
        var _a;
        const creator = ContentType(this, "addCopyFromContentTypeHub").using(JSONHeaderParse());
        const data = await graphPost(creator, body({ contentTypeId }));
        const pendingLocation = ((_a = data === null || data === void 0 ? void 0 : data.headers) === null || _a === void 0 ? void 0 : _a.location) || null;
        return {
            data: data.data,
            contentType: this.getById(data.id),
            pendingLocation,
        };
    }
    /**
     * Get a list of compatible content types from the content type hub that can be added to a target site or a list.
     *
     */
    async getCompatibleHubContentTypes() {
        return graphGet(ContentTypes(this, "getCompatibleHubContentTypes"));
    }
};
_ContentTypes = tslib_es6_decorate([
    defaultPath("contenttypes"),
    getById(ContentType)
], _ContentTypes);

const ContentTypes = graphInvokableFactory(_ContentTypes);

;// ./node_modules/@pnp/graph/columns/content-types.js




// TODO: Replace hard coded URL for graph endpoint
/**
 * Create a new booking service as specified in the request body.
 *
 * @param siteColumn the site column to add.
 */
_Columns.prototype.addRef = async function (siteColumn) {
    const postBody = { "sourceColumn@odata.bind": `https://graph.microsoft.com/v1.0/${siteColumn.toUrl()}` };
    return graphPost(this, body(postBody));
};
addProp(_ContentType, "columns", Columns);

;// ./node_modules/@pnp/graph/columns/index.js





;// ./node_modules/@pnp/graph/compliance/types.js




/**
 * Compliance
 */
let _Compliance = class _Compliance extends _GraphQueryable {
    /**
     * Get subject rights requests
     *
     */
    get subjectRightsRequests() {
        return SubjectRightsRequests(this);
    }
};
_Compliance = tslib_es6_decorate([
    defaultPath("security")
], _Compliance);

const Compliance = graphInvokableFactory(_Compliance);
/**
 * SubjectRightsRequest
 */
let _SubjectRightsRequest = class _SubjectRightsRequest extends _GraphInstance {
    /**
    * Get the final report for a subject rights request as a Blob
    */
    async finalReport() {
        return graphGet(GraphQueryable(this, "getFinalReport").using(BlobParse()));
    }
    /**
    * Get the final attachment for a subject rights request as a Blob
    */
    async finalAttachment() {
        return graphGet(GraphQueryable(this, "getFinalAttachment").using(BlobParse()));
    }
    /**
    * Get the list of authored notes assoicated with a subject rights request.
    */
    get notes() {
        return Notes(this);
    }
};
_SubjectRightsRequest = tslib_es6_decorate([
    defaultPath("/"),
    updateable()
], _SubjectRightsRequest);

const SubjectRightsRequest = graphInvokableFactory(_SubjectRightsRequest);
/**
 * SubjectRightsRequests
 */
let _SubjectRightsRequests = class _SubjectRightsRequests extends _GraphCollection {
};
_SubjectRightsRequests = tslib_es6_decorate([
    defaultPath("subjectRightsRequests"),
    getById(SubjectRightsRequest),
    addable()
], _SubjectRightsRequests);

const SubjectRightsRequests = graphInvokableFactory(_SubjectRightsRequests);
/**
 * Notes
 */
let _Notes = class _Notes extends _GraphCollection {
};
_Notes = tslib_es6_decorate([
    defaultPath("notes"),
    addable()
], _Notes);

const Notes = graphInvokableFactory(_Notes);

;// ./node_modules/@pnp/graph/compliance/index.js



Reflect.defineProperty(GraphFI.prototype, "compliance", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Compliance);
    },
});

;// ./node_modules/@pnp/graph/contacts/types.js




/**
 * Contact
 */
let _Contact = class _Contact extends _GraphInstance {
};
_Contact = tslib_es6_decorate([
    updateable(),
    deleteable()
], _Contact);

const Contact = graphInvokableFactory(_Contact);
/**
 * Contacts
 */
let _Contacts = class _Contacts extends _GraphCollection {
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
        return graphPost(this, body(postBody));
    }
};
_Contacts = tslib_es6_decorate([
    defaultPath("contacts"),
    getById(Contact)
], _Contacts);

const Contacts = graphInvokableFactory(_Contacts);
/**
 * Contact Folder
 */
let _ContactFolder = class _ContactFolder extends _GraphInstance {
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
_ContactFolder = tslib_es6_decorate([
    deleteable(),
    updateable()
], _ContactFolder);

const ContactFolder = graphInvokableFactory(_ContactFolder);
/**
 * Contact Folders
 */
let _ContactFolders = class _ContactFolders extends _GraphCollection {
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
        return graphPost(this, body(postBody));
    }
};
_ContactFolders = tslib_es6_decorate([
    defaultPath("contactFolders"),
    getById(ContactFolder)
], _ContactFolders);

const ContactFolders = graphInvokableFactory(_ContactFolders);

;// ./node_modules/@pnp/graph/contacts/users.js



addProp(_User, "contacts", Contacts);
addProp(_User, "contactFolders", ContactFolders);

;// ./node_modules/@pnp/graph/contacts/index.js



;// ./node_modules/@pnp/graph/content-types/sites.js




/**
     * Create a new  content type as specified in the request body.
     *
     * @param contentType  a JSON representation of a ContentType object.
     */
_ContentTypes.prototype.add = async function (contentType) {
    const data = await graphPost(this, body(contentType));
    return {
        data,
        contentType: this.getById(data.id),
    };
};
/**
     * Associate a published content type present in a content type hub with a list of hub sites.
     * NOTE: the site MUST be the content type hub
     * @param hubSiteUrls  an array of hub site urls to associate the content type with.
     * @param propagateToExistingLists (Optional: Default False) If true, content types will be enforced on existing lists in the hub sites;
     *   otherwise, it'll be applied only to newly created lists.
     */
_ContentTypes.prototype.associateWithHubSites = function associateWithHubSites(hubSiteUrls, propagateToExistingLists = false) {
    const postBody = {
        hubSiteUrls,
        propagateToExistingLists,
    };
    return graphPost(Site(this, "associateWithHubSites"), body(postBody));
};
addProp(_Site, "contentTypes", ContentTypes);
/**
 * Get site contentTypes that can be added to a list.
 */
_Site.prototype.getApplicableContentTypesForList = function getApplicableContentTypesForList(listId) {
    return graphGet(Site(this, `getApplicableContentTypesForList(listId='${listId}')`));
};

;// ./node_modules/@pnp/graph/content-types/lists.js




addProp(_List, "contentTypes", ContentTypes);
// TODO: Replace hard coded URL for graph endpoint
/**
 * Add a copy of a content type from a site to a list.
 *
 * @param contentType The site content type that will be copied to the list. Required.
 */
_ContentTypes.prototype.addCopy = async function (contentType) {
    const query = ContentTypes(this, "addCopy");
    const postBody = { contentType: `https://graph.microsoft.com/v1.0/${contentType.toUrl()}` };
    const data = await graphPost(query, body(postBody));
    return {
        data,
        contentType: this.getById(data.id),
    };
};

;// ./node_modules/@pnp/graph/content-types/index.js




;// ./node_modules/@pnp/graph/conversations/groups.js



addProp(_Group, "conversations", Conversations);
addProp(_Group, "acceptedSenders", Senders);
addProp(_Group, "rejectedSenders", Senders);

;// ./node_modules/@pnp/graph/conversations/index.js



;// ./node_modules/@pnp/graph/directory-objects/index.js



Reflect.defineProperty(GraphFI.prototype, "directoryObjects", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(DirectoryObjects);
    },
});

;// ./node_modules/@pnp/graph/files/users.js




addProp(_User, "drive", Drive);
addProp(_User, "drives", Drives);
addProp(_Drive, "following", DriveItems);
/**
 * Get special folder (as drive) for a user.
 */
_Drive.prototype.special = function special(specialFolder) {
    return DriveItem(this, `special/${specialFolder}`);
};
var SpecialFolder;
(function (SpecialFolder) {
    SpecialFolder["Documents"] = "documents";
    SpecialFolder["Photos"] = "photos";
    SpecialFolder["CameraRoll"] = "cameraroll";
    SpecialFolder["AppRoot"] = "approot";
    SpecialFolder["Music"] = "music";
})(SpecialFolder || (SpecialFolder = {}));
_DriveItem.prototype.restore = function restore(restoreOptions) {
    return graphPost(DriveItem(this, "restore"), body(restoreOptions));
};

;// ./node_modules/@pnp/graph/files/groups.js



addProp(_Group, "drive", Drive);
addProp(_Group, "drives", Drives);

;// ./node_modules/@pnp/graph/files/sites.js




addProp(_Site, "drive", Drive);
addProp(_Site, "drives", Drives);
addProp(_Drive, "list", List);

;// ./node_modules/@pnp/graph/files/lists.js


_List.prototype.drive = function drive() {
    return graphGet(List(this, "drive"));
};

;// ./node_modules/@pnp/graph/files/bundles.js




/**
 * Describes a Bundle instance
 * ONLY SUPPORTED IN PERSONAL ONEDRIVE
 */
let _Bundle = class _Bundle extends _GraphInstance {
    /**
     * Method for adding a drive item to a bundle.
     * @param id - The Id of a DriveItem object to add to the bundle
     * @returns void - 204 if successful
     */
    async addItem(id) {
        return graphPost(this, body({ id }));
    }
    /**
     * Method for removing a drive item from a bundle.
     * @param id - The Id of a DriveItem object to remove from the bundle
     * @returns void - 204 if successful
     */
    async removeItem(id) {
        return graphDelete(GraphQueryable(this, `/children/${id}`));
    }
};
_Bundle = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Bundle);

const Bundle = graphInvokableFactory(_Bundle);
/**
 * Describes a collection of Bundle objects
 * ONLY SUPPORTED IN PERSONAL ONEDRIVE
 */
let _Bundles = class _Bundles extends _GraphCollection {
    /**
     * Method for creating a new bundle.
     * @param bundleDef - IBundleDef object
     * @returns Microsoft Graph - DriveItem
     */
    async create(bundleDef) {
        return graphPost(this, body(bundleDef));
    }
};
_Bundles = tslib_es6_decorate([
    defaultPath("bundles"),
    getById(Bundle)
], _Bundles);

const Bundles = graphInvokableFactory(_Bundles);

;// ./node_modules/@pnp/graph/files/index.js











Reflect.defineProperty(GraphFI.prototype, "drives", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Drives);
    },
});

;// ./node_modules/@pnp/graph/groups/index.js



Reflect.defineProperty(GraphFI.prototype, "groups", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Groups);
    },
});

;// ./node_modules/@pnp/graph/insights/types.js



/**
 * Represents a insights entity
 */
let _Insights = class _Insights extends _GraphInstance {
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
_Insights = tslib_es6_decorate([
    defaultPath("insights")
], _Insights);

const Insights = graphInvokableFactory(_Insights);
/**
 * Describes a Trending Insight instance
 */
class _TrendingInsight extends _GraphInstance {
    get resource() {
        return Resource(this);
    }
}
const TrendingInsight = graphInvokableFactory(_TrendingInsight);
/**
 * Describes a collection of Trending Insight objects
 *
 */
let _TrendingInsights = class _TrendingInsights extends _GraphCollection {
};
_TrendingInsights = tslib_es6_decorate([
    defaultPath("trending"),
    getById(TrendingInsight)
], _TrendingInsights);

const TrendingInsights = graphInvokableFactory(_TrendingInsights);
/**
 * Describes a Used Insight instance
 */
class _UsedInsight extends _GraphInstance {
    get resource() {
        return Resource(this);
    }
}
const UsedInsight = graphInvokableFactory(_UsedInsight);
/**
 * Describes a collection of Used Insight objects
 *
 */
let _UsedInsights = class _UsedInsights extends _GraphCollection {
};
_UsedInsights = tslib_es6_decorate([
    defaultPath("used"),
    getById(UsedInsight)
], _UsedInsights);

const UsedInsights = graphInvokableFactory(_UsedInsights);
/**
 * Describes a Shared Insight instance
 */
class _SharedInsight extends _GraphInstance {
    get resource() {
        return Resource(this);
    }
}
const SharedInsight = graphInvokableFactory(_SharedInsight);
/**
 * Describes a collection of Shared Insight objects
 *
 */
let _SharedInsights = class _SharedInsights extends _GraphCollection {
};
_SharedInsights = tslib_es6_decorate([
    defaultPath("shared"),
    getById(SharedInsight)
], _SharedInsights);

const SharedInsights = graphInvokableFactory(_SharedInsights);
/**
 * Describes a Resource Entity instance
 */
let _Resource = class _Resource extends _GraphInstance {
};
_Resource = tslib_es6_decorate([
    defaultPath("resource")
], _Resource);

const Resource = graphInvokableFactory(_Resource);

;// ./node_modules/@pnp/graph/insights/users.js



addProp(_User, "insights", Insights);

;// ./node_modules/@pnp/graph/insights/index.js



;// ./node_modules/@pnp/graph/invitations/types.js




/**
 * Invitations
 */
let _Invitations = class _Invitations extends _GraphCollection {
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
        const data = await graphPost(this, body(postBody));
        return { data };
    }
};
_Invitations = tslib_es6_decorate([
    defaultPath("invitations")
], _Invitations);

const Invitations = graphInvokableFactory(_Invitations);

;// ./node_modules/@pnp/graph/invitations/index.js



Reflect.defineProperty(GraphFI.prototype, "invitations", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Invitations);
    },
});

;// ./node_modules/@pnp/graph/list-item/list.js



addProp(_List, "items", ListItems);

;// ./node_modules/@pnp/graph/list-item/document-sets.js


addProp(_ListItem, "documentSetVersions", DocumentSetVersions);

;// ./node_modules/@pnp/graph/list-item/index.js




;// ./node_modules/@pnp/graph/lists/sites.js



addProp(_Site, "lists", Lists);

;// ./node_modules/@pnp/graph/lists/drive.js


_Drive.prototype.getList = async function () {
    const q = await this.list();
    const url = `/sites/${q.parentReference.siteId}/lists/${q.id}`;
    return List([this, url]);
};

;// ./node_modules/@pnp/graph/lists/index.js




;// ./node_modules/@pnp/graph/mail/folders.js





/**
 * Mail Folder or Mail Search Folder
 */
let _MailFolder = class _MailFolder extends _GraphInstance {
    /**
     * Gets the child folders in this mail folder
     *
     */
    get childFolders() {
        return MailFolders(this, "childFolders");
    }
    /**
     * Gets the messages in this mail folder
     *
     */
    get messages() {
        return Messages(this);
    }
    /**
     * Gets the child folders in this mail folder
     *
     */
    get messageRules() {
        return MessageRules(this);
    }
    /**
     * Copy the mail folder
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    async copy(destinationFolderId) {
        return await graphPost(MailFolder(this, "copy"), body({ destinationId: destinationFolderId }));
    }
    /**
     * Move the mail folder
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    async move(destinationFolderId) {
        return await graphPost(MailFolder(this, "move"), body({ destinationId: destinationFolderId }));
    }
};
_MailFolder = tslib_es6_decorate([
    updateable(),
    deleteable()
], _MailFolder);

const MailFolder = graphInvokableFactory(_MailFolder);
/**
 * Mail Folders or Mail Search Folders
 */
let _MailFolders = class _MailFolders extends _GraphCollection {
    get includeHidden() {
        const q = GraphQueryable(this);
        q.query.set("includeHiddenFolders", "true");
        return q;
    }
};
_MailFolders = tslib_es6_decorate([
    defaultPath("mailFolders"),
    getById(MailFolder),
    addable(),
    hasDelta()
], _MailFolders);

const MailFolders = graphInvokableFactory(_MailFolders);

;// ./node_modules/@pnp/graph/mail/categories.js



// import { graphPost } from "@pnp/graph";
// import { body } from "@pnp/queryable";
/**
 * Outlook
 */
class _Outlook extends _GraphInstance {
    get masterCategories() {
        return MasterCategories(this);
    }
}
const Outlook = graphInvokableFactory(_Outlook);
/**
 * Describes an Outlook Category instance
 */
let _OutlookCategory = class _OutlookCategory extends _GraphInstance {
};
_OutlookCategory = tslib_es6_decorate([
    deleteable(),
    updateable()
], _OutlookCategory);

const OutlookCategory = graphInvokableFactory(_OutlookCategory);
/**
 * Categories
 */
let _MasterCategories = class _MasterCategories extends _GraphCollection {
};
_MasterCategories = tslib_es6_decorate([
    defaultPath("masterCategories"),
    getById(OutlookCategory),
    addable()
], _MasterCategories);

const MasterCategories = graphInvokableFactory(_MasterCategories);

;// ./node_modules/@pnp/graph/mail/mailbox.js



/**
 * MailboxSettings
 */
let _MailboxSettings = class _MailboxSettings extends _GraphInstance {
    /**
     * Get the automatic replies setting
     *
     */
    async automaticRepliesSetting() {
        return graphGet(GraphQueryable(this, "automaticRepliesSetting"));
    }
    /**
     * Get the mailbox settings date format
     *
     */
    async dateFormat() {
        return graphGet(GraphQueryable(this, "dateFormat"));
    }
    /**
     * Get the delegateMeetingMessageDeliveryOptions settings
     *
     */
    // DOCUMENTED BUT NOT IMPLEMENTED
    // public async delegateMeetingMessageDeliveryOptions(): Promise<string> {
    //     return graphGet(GraphQueryable(this, "delegateMeetingMessageDeliveryOptions"));
    // }
    /**
     * Get the delegateMeetingMessageDeliveryOptions settings
     *
     */
    async language() {
        return graphGet(GraphQueryable(this, "language"));
    }
    /**
     * Get the mailbox settings time format
     *
     */
    async timeFormat() {
        return graphGet(GraphQueryable(this, "timeFormat"));
    }
    /**
     * Get the mailbox settings time format
     *
     */
    async timeZone() {
        return graphGet(GraphQueryable(this, "timeZone"));
    }
    /**
     * Get the mailbox settings working hours
     *
     */
    async workingHours() {
        return graphGet(GraphQueryable(this, "workingHours"));
    }
    /**
     * Get the mailbox settings user purpose
     *
     */
    async userPurpose() {
        return graphGet(GraphQueryable(this, "userPurpose"));
    }
};
_MailboxSettings = tslib_es6_decorate([
    defaultPath("mailboxSettings"),
    updateable()
], _MailboxSettings);

const MailboxSettings = graphInvokableFactory(_MailboxSettings);
/**
 * Focused Inbox Override
 */
let _FocusedInboxOverride = class _FocusedInboxOverride extends _GraphInstance {
};
_FocusedInboxOverride = tslib_es6_decorate([
    defaultPath("inferenceClassification/overrides"),
    updateable(),
    deleteable()
], _FocusedInboxOverride);

const FocusedInboxOverride = graphInvokableFactory(_FocusedInboxOverride);
/**
 * Focused Inbox Overrides
 */
let _FocusedInboxOverrides = class _FocusedInboxOverrides extends _GraphCollection {
};
_FocusedInboxOverrides = tslib_es6_decorate([
    defaultPath("inferenceClassification/overrides"),
    getById(FocusedInboxOverride),
    addable()
], _FocusedInboxOverrides);

const FocusedInboxOverrides = graphInvokableFactory(_FocusedInboxOverrides);

;// ./node_modules/@pnp/graph/mail/users.js







addProp(_User, "messages", Messages);
addProp(_User, "mailboxSettings", MailboxSettings);
addProp(_User, "mailFolders", MailFolders);
addProp(_User, "outlook", Outlook);
addProp(_User, "focusedInboxOverrides", FocusedInboxOverrides, "inferenceClassification/overrides");
_User.prototype.sendMail = function (message, saveToSentItems = true) {
    return graphPost(User(this, "sendMail"), body({ message, saveToSentItems }));
};
/**
 * Translate identifiers of Outlook-related resources between formats.
 *
 */
_User.prototype.translateExchangeIds = function (translateExchangeIds) {
    return graphPost(User(this, "translateExchangeIds"), body(translateExchangeIds));
};

;// ./node_modules/@pnp/graph/mail/index.js






;// ./node_modules/@pnp/graph/members/types.js




/**
 * Member
 */
class _Member extends _GraphInstance {
    /**
     * Removes this Member
     */
    remove() {
        return graphDelete(Member(this, "$ref"));
    }
}
const Member = graphInvokableFactory(_Member);
/**
 * Members
 */
let _Members = class _Members extends _GraphCollection {
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: `https://graph.microsoft.com/v1.0/directoryObjects/${id}`)
     */
    add(id) {
        return graphPost(Members(this, "$ref"), body({ "@odata.id": id }));
    }
};
_Members = tslib_es6_decorate([
    defaultPath("members"),
    getById(Member)
], _Members);

const Members = graphInvokableFactory(_Members);

;// ./node_modules/@pnp/graph/members/groups.js



addProp(_Group, "owners", Members, "owners");
addProp(_Group, "members", Members);

;// ./node_modules/@pnp/graph/members/index.js



;// ./node_modules/@pnp/graph/onenote/types.js




/**
 * Represents a onenote entity
 */
let _OneNote = class _OneNote extends _GraphInstance {
    get notebooks() {
        return Notebooks(this);
    }
    get pages() {
        return OnenotePages(this);
    }
    get resources() {
        return Resources(this);
    }
    get sections() {
        return Sections(this);
    }
    get sectionGroups() {
        return SectionGroups(this);
    }
};
_OneNote = tslib_es6_decorate([
    defaultPath("onenote")
], _OneNote);

const OneNote = graphInvokableFactory(_OneNote);
/**
 * Describes a notebook instance
 *
 */
class _Notebook extends _GraphInstance {
    get sections() {
        return Sections(this);
    }
    get sectionGroups() {
        return SectionGroups(this);
    }
    /**
     * Copy notebook
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), renameAs name of the copy.
     */
    async copy(props) {
        return graphPost(GraphQueryable(this, "copyNoteBook"), body(props));
    }
}
const Notebook = graphInvokableFactory(_Notebook);
/**
 * Describes a collection of Notebook objects
 *
 */
let _Notebooks = class _Notebooks extends _GraphCollection {
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    async add(displayName) {
        return graphPost(this, body({ displayName }));
    }
    /**
     * Get a list of recent notebooks for the sign-in user
     * @param includePersonalNotebooks Include notebooks owned by the user. Set to true to include notebooks owned by the user; otherwise, set to false.
     */
    async recent(includePersonalNotebooks = false) {
        return graphGet(GraphQueryable(this, `getRecentNotebooks(includePersonalNotebooks=${includePersonalNotebooks})`));
    }
};
_Notebooks = tslib_es6_decorate([
    defaultPath("notebooks"),
    getById(Notebook)
], _Notebooks);

const Notebooks = graphInvokableFactory(_Notebooks);
/**
 * Describes a OneNote sections instance
 */
class _Section extends _GraphInstance {
    get pages() {
        return OnenotePages(this);
    }
    /**
     * Copy section to notebook
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook, renameAs name of the copy.
     */
    async copyToNotebook(props) {
        return graphPost(GraphQueryable(this, "copyToNoteBook"), body(props));
    }
    /**
     * Copy section group
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook, renameAs name of the copy.
     */
    async copyToSectionGroup(props) {
        return graphPost(GraphQueryable(this, "copyToNoteBook"), body(props));
    }
}
const Section = graphInvokableFactory(_Section);
/**
 * Describes a collection of onenote sections objects
 *
 */
let _Sections = class _Sections extends _GraphCollection {
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    async add(displayName) {
        return graphPost(this, body({ displayName }));
    }
};
_Sections = tslib_es6_decorate([
    defaultPath("sections"),
    getById(Section)
], _Sections);

const Sections = graphInvokableFactory(_Sections);
/**
 * Describes a root onenote sections group instance
 */
class _SectionGroup extends _GraphInstance {
    get sections() {
        return Sections(this);
    }
}
const SectionGroup = graphInvokableFactory(_SectionGroup);
/**
 * Describes a collection of Sections objects
 *
 */
let _SectionGroups = class _SectionGroups extends _GraphCollection {
    /**
    * Adds a new section group
    * @param displayName New section group display name
    */
    async add(displayName) {
        return graphPost(this, body({ displayName }));
    }
    get sections() {
        return Sections(this);
    }
};
_SectionGroups = tslib_es6_decorate([
    defaultPath("sectiongroups"),
    getById(SectionGroup)
], _SectionGroups);

const SectionGroups = graphInvokableFactory(_SectionGroups);
/**
 * Describes a page instance
 *
 */
let _OnenotePage = class _OnenotePage extends _GraphInstance {
    /**
     * Copy page to section
     * @param props of type ICopyPageProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook
     */
    async copyToSection(props) {
        return graphPost(GraphQueryable(this, "copyToSection"), body(props));
    }
    /**
     * Gets contents of a page
     *
     * @param includeIDs page html body
     */
    async content(includeIDs = false) {
        return OnenotePage(this, `content?includeIDs=${includeIDs}`).using(TextParse())();
    }
    /**
     * Copy page to section
     * @param props of type IOnenotePatchContentCommand.
     */
    async update(props) {
        return graphPatch(GraphQueryable(this, "content"), body(props));
    }
};
_OnenotePage = tslib_es6_decorate([
    deleteable()
], _OnenotePage);

const OnenotePage = graphInvokableFactory(_OnenotePage);
/**
 * Describes a collection of page objects
 *
 */
let _OnenotePages = class _OnenotePages extends _GraphCollection {
    /**
     * Create a new page as specified in the request body.
     *
     * @param html page html body
     */
    async add(html) {
        const q = GraphQueryable(this);
        q.using(InjectHeaders({
            "Content-Type": "text/html",
        }));
        return graphPost(q, { body: html });
    }
};
_OnenotePages = tslib_es6_decorate([
    defaultPath("pages"),
    getById(OnenotePage)
], _OnenotePages);

const OnenotePages = graphInvokableFactory(_OnenotePages);
/**
 * Describes a resources
 *
 */
let _Resources = class _Resources extends _GraphInstance {
    /**
     * getById returns a Blob. API does not support getting JSON representation.
     * @param id id of the resource in a OneNote page
     * @returns Blob of the resource from a OneNote page
     */
    getById(id) {
        return GraphQueryable(this, `${id}/content`).using(BlobParse());
    }
};
_Resources = tslib_es6_decorate([
    defaultPath("resources")
], _Resources);

const Resources = graphInvokableFactory(_Resources);

;// ./node_modules/@pnp/graph/onenote/groups.js



addProp(_Group, "onenote", OneNote);

;// ./node_modules/@pnp/graph/onenote/users.js



addProp(_User, "onenote", OneNote);

;// ./node_modules/@pnp/graph/onenote/sites.js



addProp(_Site, "onenote", OneNote);

;// ./node_modules/@pnp/graph/onenote/index.js





;// ./node_modules/@pnp/graph/operations/types.js



/**
 * Operations
 */
let _Operations = class _Operations extends _GraphCollection {
};
_Operations = tslib_es6_decorate([
    defaultPath("operations")
], _Operations);

const Operations = graphInvokableFactory(_Operations);

;// ./node_modules/@pnp/graph/operations/site.js



addProp(_Site, "operations", Operations);

;// ./node_modules/@pnp/graph/operations/list.js



addProp(_List, "operations", Operations);

;// ./node_modules/@pnp/graph/operations/index.js




;// ./node_modules/@pnp/graph/pages/types.js





/**
 * Page
 */
let _Page = class _Page extends _GraphInstance {
};
_Page = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Page);

const Page = graphInvokableFactory(_Page);
/**
 * Pages
 */
let _Pages = class _Pages extends _GraphCollection {
    get sitePages() {
        return SitePages(this);
    }
};
_Pages = tslib_es6_decorate([
    defaultPath("pages"),
    getById(Page)
], _Pages);

const Pages = graphInvokableFactory(_Pages);
/**
 * Site Page
 */
let _SitePage = class _SitePage extends _GraphInstance {
    /**
     * Publishes the page
     * @returns void
     */
    async publish() {
        return graphPost(SitePage(this, "publish"));
    }
    /**
     * Gets the webparts in the page
     *
     * @returns array fo webpart information
     */
    async getWebPartsByPosition() {
        return SitePage(this, "getWebPartsByPosition")();
    }
    /**
     * Get a listing of all the webparts in this page
     */
    get webparts() {
        return Webparts(this);
    }
    /**
     * Gets the set of horizontal sections
     */
    get horizontalSections() {
        return HorizontalSections(this);
    }
    /**
     * Gets the set of vertical section
     */
    get verticalSection() {
        return VerticalSection(this);
    }
    /**
     * Creates a vertical section if none exists, returns the vertical section
     */
    ensureVerticalSection() {
        const y = this.select("verticalSection")();
        console.log(y);
        return null;
    }
};
_SitePage = tslib_es6_decorate([
    deleteable(),
    updateable()
], _SitePage);

const SitePage = graphInvokableFactory(_SitePage);
const SitePageTypeString = "microsoft.graph.sitePage";
/**
 * Site Pages
 */
let _SitePages = class _SitePages extends _GraphCollection {
    constructor(base, path) {
        super(base, path);
        this._pages = this.getParent(Pages, "");
    }
    getById(id) {
        return SitePage(this._pages, combine(id, SitePageTypeString));
    }
    async add(pageInfo) {
        return graphPost(this._pages, body({ "@odata.type": SitePageTypeString, ...pageInfo }));
    }
};
_SitePages = tslib_es6_decorate([
    defaultPath(SitePageTypeString)
], _SitePages);

const SitePages = graphInvokableFactory(_SitePages);
let _HorizontalSection = class _HorizontalSection extends _GraphInstance {
    get columns() {
        return HorizontalSectionColumns(this);
    }
};
_HorizontalSection = tslib_es6_decorate([
    updateable(),
    deleteable()
], _HorizontalSection);

const HorizontalSection = graphInvokableFactory(_HorizontalSection);
let _HorizontalSections = class _HorizontalSections extends _GraphCollection {
    async add(props) {
        return graphPost(this, body(props));
    }
    getById(id) {
        const section = HorizontalSection(this);
        return section.concat(`('${id}')`);
    }
};
_HorizontalSections = tslib_es6_decorate([
    defaultPath("canvasLayout/horizontalSections")
], _HorizontalSections);

const HorizontalSections = graphInvokableFactory(_HorizontalSections);
class _HorizontalSectionColumn extends _GraphInstance {
    get webparts() {
        return Webparts(this);
    }
}
const HorizontalSectionColumn = graphInvokableFactory(_HorizontalSectionColumn);
let _HorizontalSectionColumns = class _HorizontalSectionColumns extends _GraphCollection {
    getById(id) {
        const column = HorizontalSectionColumn(this);
        return column.concat(`('${id}')`);
    }
};
_HorizontalSectionColumns = tslib_es6_decorate([
    defaultPath("columns")
], _HorizontalSectionColumns);

const HorizontalSectionColumns = graphInvokableFactory(_HorizontalSectionColumns);
let _VerticalSection = class _VerticalSection extends _GraphInstance {
    /**
     * Get a listing of all the webparts in this vertical section
     */
    get webparts() {
        return Webparts(this);
    }
};
_VerticalSection = tslib_es6_decorate([
    updateable(),
    deleteable(),
    defaultPath("canvasLayout/verticalSection")
], _VerticalSection);

const VerticalSection = graphInvokableFactory(_VerticalSection);
class _Webpart extends _GraphInstance {
}
const Webpart = graphInvokableFactory(_Webpart);
let _Webparts = class _Webparts extends _GraphCollection {
    /**
     * Gets the webpart information by id from the page's collection
     * @param id string id of the webpart
     * @returns The IWebpart instance
     */
    getById(id) {
        const url = this.toUrl();
        const base = url.slice(0, url.indexOf(SitePageTypeString) + SitePageTypeString.length);
        return Webpart([this, base], `webparts/${id}`);
    }
};
_Webparts = tslib_es6_decorate([
    defaultPath("webparts")
], _Webparts);

const Webparts = graphInvokableFactory(_Webparts);

;// ./node_modules/@pnp/graph/pages/site.js



addProp(_Site, "pages", Pages);

;// ./node_modules/@pnp/graph/pages/index.js




;// ./node_modules/@pnp/graph/permissions/types.js



/**
 * Permission
 */
let _Permission = class _Permission extends _GraphInstance {
};
_Permission = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Permission);

const Permission = graphInvokableFactory(_Permission);
/**
 * Permissions
 */
let _Permissions = class _Permissions extends _GraphCollection {
};
_Permissions = tslib_es6_decorate([
    defaultPath("permissions"),
    getById(Permission)
], _Permissions);

const Permissions = graphInvokableFactory(_Permissions);

;// ./node_modules/@pnp/graph/permissions/site.js




addProp(_Site, "permissions", Permissions);
_Permissions.prototype.add = async function addPermissions(permissions) {
    return graphPost(this, body(permissions));
};

;// ./node_modules/@pnp/graph/permissions/drive-item.js




addProp(_DriveItem, "permissions", Permissions);
/**
 * Method for adding permissions to the drive item.
 * @param permissionsInviteInfo: IPermissionsInviteInfo
 * @returns Microsoft Graph - Permission[]
 */
_DriveItem.prototype.addPermissions = async function addPermissions(permissionsInviteInfo) {
    return graphPost(DriveItem(this, "invite"), body(permissionsInviteInfo));
};

;// ./node_modules/@pnp/graph/permissions/index.js




;// ./node_modules/@pnp/graph/photos/types.js




let _Photo = class _Photo extends _GraphInstance {
    /**
     * Gets the image bytes as a blob (browser)
     */
    getBlob() {
        return Photo(this, "$value").using(BlobParse())();
    }
    /**
     * Gets the image file bytes as a Buffer (node.js)
     */
    getBuffer() {
        return Photo(this, "$value").using(BufferParse())();
    }
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    setContent(content) {
        return graphPatch(Photo(this, "$value"), { body: content });
    }
};
_Photo = tslib_es6_decorate([
    defaultPath("photo")
], _Photo);

const Photo = graphInvokableFactory(_Photo);
let _Photos = class _Photos extends _GraphCollection {
    /**
     * Gets the image reference by size. 48x48, 64x64, 96x96, 120x120, 240x240, 360x360, 432x432, 504x504, and 648x648.
     */
    getBySize(size) {
        return Photo(this, `/${size}`);
    }
};
_Photos = tslib_es6_decorate([
    defaultPath("photos")
], _Photos);

const Photos = graphInvokableFactory(_Photos);

;// ./node_modules/@pnp/graph/photos/groups.js



addProp(_Group, "photo", Photo);
addProp(_Group, "photos", Photos);

;// ./node_modules/@pnp/graph/photos/users.js



addProp(_User, "photo", Photo);
addProp(_User, "photos", Photos);

;// ./node_modules/@pnp/graph/teams/types.js





/**
 * Represents a Microsoft Team
 */
let _Team = class _Team extends _GraphInstance {
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
        return graphPost(Team(this, "archive"), body({ shouldSetSpoSiteReadOnlyForMembers }));
    }
    /**
    * Unarchives this Team
    */
    unarchive() {
        return graphPost(Team(this, "unarchive"));
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
        const data = await graphPost(creator, body(postBody));
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
        return GraphInstance(this, `operations/${id}`)();
    }
};
_Team = tslib_es6_decorate([
    defaultPath("team"),
    updateable()
], _Team);

const Team = graphInvokableFactory(_Team);
/**
 * Teams
 */
let _Teams = class _Teams extends _GraphCollection {
    async create(team) {
        const creator = Teams(this, null).using(HeaderParse());
        const data = await graphPost(creator, body(team));
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
_Teams = tslib_es6_decorate([
    defaultPath("teams"),
    getById(Team)
], _Teams);

const Teams = graphInvokableFactory(_Teams);
/**
 * Channel
 */
class _Channel extends _GraphInstance {
    get tabs() {
        return Tabs(this);
    }
    get messages() {
        return teams_types_Messages(this);
    }
}
const Channel = graphInvokableFactory(_Channel);
/**
 * Channels
 */
let _Channels = class _Channels extends _GraphCollection {
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
        const data = await graphPost(this, body(postBody));
        return {
            channel: this.getById(data.id),
            data,
        };
    }
};
_Channels = tslib_es6_decorate([
    defaultPath("channels"),
    getById(Channel)
], _Channels);

const Channels = graphInvokableFactory(_Channels);
/**
 * Message
 */
class types_Message extends _GraphInstance {
}
const teams_types_Message = graphInvokableFactory(types_Message);
/**
 * Messages
 */
let types_Messages = class _Messages extends _GraphCollection {
    /**
     * Adds a message
     * @param message ChatMessage object that defines the message
     *
     */
    async add(message) {
        const data = await graphPost(this, body(message));
        return {
            message: this.getById(data.id),
            data,
        };
    }
};
types_Messages = tslib_es6_decorate([
    defaultPath("messages"),
    getById(teams_types_Message)
], types_Messages);

const teams_types_Messages = graphInvokableFactory(types_Messages);
/**
 * Tab
 */
let _Tab = class _Tab extends _GraphInstance {
};
_Tab = tslib_es6_decorate([
    defaultPath("tab"),
    updateable(),
    deleteable()
], _Tab);

const Tab = graphInvokableFactory(_Tab);
/**
 * Tabs
 */
let _Tabs = class _Tabs extends _GraphCollection {
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
        const data = await graphPost(this, body(postBody));
        return {
            data,
            tab: this.getById(data.id),
        };
    }
};
_Tabs = tslib_es6_decorate([
    defaultPath("tabs"),
    getById(Tab)
], _Tabs);

const Tabs = graphInvokableFactory(_Tabs);
/**
 * InstalledApp
 */
let _InstalledApp = class _InstalledApp extends _GraphInstance {
    upgrade() {
        return graphPost(InstalledApp(this, "upgrade"));
    }
};
_InstalledApp = tslib_es6_decorate([
    deleteable()
], _InstalledApp);

const InstalledApp = graphInvokableFactory(_InstalledApp);
/**
 * InstalledApps
 */
let _InstalledApps = class _InstalledApps extends _GraphCollection {
    /**
     * Adds an installed app to the collection
     * @param teamsAppId The id of the app to add.
     */
    async add(teamsAppId) {
        const data = await graphPost(this, body({
            "teamsApp@odata.bind": teamsAppId,
        }));
        return {
            data,
            app: this.getById(data.id),
        };
    }
};
_InstalledApps = tslib_es6_decorate([
    defaultPath("installedApps"),
    getById(InstalledApp)
], _InstalledApps);

const InstalledApps = graphInvokableFactory(_InstalledApps);

;// ./node_modules/@pnp/graph/photos/teams.js



addProp(_Team, "photo", Photo);

;// ./node_modules/@pnp/graph/photos/index.js





;// ./node_modules/@pnp/graph/places/types.js



/**
 * Place
 */
let _Place = class _Place extends _GraphInstance {
};
_Place = tslib_es6_decorate([
    updateable()
], _Place);

const Place = graphInvokableFactory(_Place);
/**
 * Places
 */
let _Places = class _Places extends _GraphInstance {
    /**
     * Gets all rooms in a tenant
     */
    get rooms() {
        return Rooms(this);
    }
    /**
    * Gets all roomLists in a tenant
    */
    get roomLists() {
        return RoomLists(this);
    }
};
_Places = tslib_es6_decorate([
    defaultPath("places"),
    getById(Place)
], _Places);

const Places = graphInvokableFactory(_Places);
/**
 * RoomList
 */
class _RoomList extends _GraphInstance {
    /**
    * Gets all rooms in a roomList
    */
    get rooms() {
        return Rooms(this, "rooms");
    }
}
const RoomList = graphInvokableFactory(_RoomList);
/**
 * RoomLists
 */
let _RoomLists = class _RoomLists extends _GraphCollection {
};
_RoomLists = tslib_es6_decorate([
    defaultPath("microsoft.graph.roomList"),
    getById(RoomList)
], _RoomLists);

const RoomLists = graphInvokableFactory(_RoomLists);
/**
 * Room
 */
class _Room extends _GraphInstance {
}
const Room = graphInvokableFactory(_Room);
/**
 * Rooms
 */
let _Rooms = class _Rooms extends _GraphCollection {
};
_Rooms = tslib_es6_decorate([
    defaultPath("microsoft.graph.room"),
    getById(Room)
], _Rooms);

const Rooms = graphInvokableFactory(_Rooms);

;// ./node_modules/@pnp/graph/places/index.js



Reflect.defineProperty(GraphFI.prototype, "places", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Places);
    },
});

;// ./node_modules/@pnp/graph/planner/types.js




/**
 * Planner
 */
let _Planner = class _Planner extends _GraphInstance {
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
_Planner = tslib_es6_decorate([
    defaultPath("planner")
], _Planner);

const Planner = graphInvokableFactory(_Planner);
/**
 * Details
 */
let _PlanDetails = class _PlanDetails extends _GraphInstance {
};
_PlanDetails = tslib_es6_decorate([
    defaultPath("details"),
    updateableWithETag()
], _PlanDetails);

const PlanDetails = graphInvokableFactory(_PlanDetails);
/**
 * Plan
 */
let _Plan = class _Plan extends _GraphInstance {
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
_Plan = tslib_es6_decorate([
    updateableWithETag(),
    deleteableWithETag()
], _Plan);

const Plan = graphInvokableFactory(_Plan);
let _Plans = class _Plans extends _GraphCollection {
};
_Plans = tslib_es6_decorate([
    defaultPath("plans"),
    getById(Plan),
    addable()
], _Plans);

const Plans = graphInvokableFactory(_Plans);
/**
 * Details
 */
let _TaskDetails = class _TaskDetails extends _GraphInstance {
};
_TaskDetails = tslib_es6_decorate([
    defaultPath("details"),
    updateableWithETag()
], _TaskDetails);

const TaskDetails = graphInvokableFactory(_TaskDetails);
/**
 * AssignedToTaskBoardFormat
 */
let _AssignedToTaskBoardFormat = class _AssignedToTaskBoardFormat extends _GraphInstance {
};
_AssignedToTaskBoardFormat = tslib_es6_decorate([
    defaultPath("assignedToTaskBoardFormat"),
    updateableWithETag()
], _AssignedToTaskBoardFormat);

const AssignedToTaskBoardFormat = graphInvokableFactory(_AssignedToTaskBoardFormat);
/**
 * BucketTaskBoardFormat
 */
let _BucketTaskBoardFormat = class _BucketTaskBoardFormat extends _GraphInstance {
};
_BucketTaskBoardFormat = tslib_es6_decorate([
    defaultPath("bucketTaskBoardFormat"),
    updateableWithETag()
], _BucketTaskBoardFormat);

const BucketTaskBoardFormat = graphInvokableFactory(_BucketTaskBoardFormat);
/**
 * ProgressTaskBoardFormat
 */
let _ProgressTaskBoardFormat = class _ProgressTaskBoardFormat extends _GraphInstance {
};
_ProgressTaskBoardFormat = tslib_es6_decorate([
    defaultPath("progressTaskBoardFormat"),
    updateableWithETag()
], _ProgressTaskBoardFormat);

const ProgressTaskBoardFormat = graphInvokableFactory(_ProgressTaskBoardFormat);
/**
 * Task
 */
let _Task = class _Task extends _GraphInstance {
    get details() {
        return TaskDetails(this);
    }
    get assignedToTaskBoardFormat() {
        return AssignedToTaskBoardFormat(this);
    }
    get bucketTaskBoardFormat() {
        return BucketTaskBoardFormat(this);
    }
    get progressTaskBoardFormat() {
        return ProgressTaskBoardFormat(this);
    }
};
_Task = tslib_es6_decorate([
    updateableWithETag(),
    deleteableWithETag()
], _Task);

const Task = graphInvokableFactory(_Task);
/**
 * Tasks
 */
let _Tasks = class _Tasks extends _GraphCollection {
};
_Tasks = tslib_es6_decorate([
    defaultPath("tasks"),
    getById(Task),
    addable()
], _Tasks);

const Tasks = graphInvokableFactory(_Tasks);
/**
 * Bucket
 */
let _Bucket = class _Bucket extends _GraphInstance {
    get tasks() {
        return Tasks(this);
    }
};
_Bucket = tslib_es6_decorate([
    updateableWithETag(),
    deleteableWithETag()
], _Bucket);

const Bucket = graphInvokableFactory(_Bucket);
/**
 * Buckets
 */
let _Buckets = class _Buckets extends _GraphCollection {
};
_Buckets = tslib_es6_decorate([
    defaultPath("buckets"),
    getById(Bucket),
    addable()
], _Buckets);

const Buckets = graphInvokableFactory(_Buckets);

;// ./node_modules/@pnp/graph/planner/groups.js



addProp(_Group, "plans", Plans, "planner/plans");

;// ./node_modules/@pnp/graph/planner/users.js



addProp(_User, "tasks", Tasks, "planner/tasks");

;// ./node_modules/@pnp/graph/planner/index.js





Reflect.defineProperty(GraphFI.prototype, "planner", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Planner);
    },
});

;// ./node_modules/@pnp/graph/search/types.js




/**
 * Search
 */
let _Search = class _Search extends _GraphInstance {
    executeQuery(request) {
        return graphPost(Search(this, "query"), body(request));
    }
};
_Search = tslib_es6_decorate([
    defaultPath("search")
], _Search);

const Search = graphInvokableFactory(_Search);

;// ./node_modules/@pnp/graph/search/index.js



GraphFI.prototype.query = async function (...requests) {
    return this.create(Search).executeQuery({ requests });
};

;// ./node_modules/@pnp/graph/shares/types.js






/**
 * Describes a Share object
 */
class _Share extends _GraphInstance {
    /**
     * Access the driveItem associated with this shared file
     */
    get driveItem() {
        return DriveItem(this, "driveitem");
    }
}
const Share = graphInvokableFactory(_Share);
/**
 * Describes a collection of Share objects
 *
 */
let _Shares = class _Shares extends _GraphCollection {
    /**
     * Creates a sharing link (id) from a given absolute url to a file
     * @param url Absolute file url such as "https://{tenant}.sharepoint.com/sites/dev/Shared%20Documents/new.pptx"
     * @returns An encoded sharing id which can be used in getById to access a file
     */
    encodeSharingLink(url) {
        return (`u!${Buffer.from(url).toString("base64").replace(/=$/, "").replace("/", "_").replace("+", "-")}`);
    }
    /**
     * Method for using a sharing link.
     * @param share: string - Share Id or Encoded Sharing Url
     * @returns Microsoft Graph - SharingLink
     */
    async useSharingLink(shareLink) {
        const q = Shares(this, shareLink.shareId || shareLink.encodedSharingUrl);
        if (shareLink.redeemSharingLink) {
            q.using(InjectHeaders({
                "Prefer": (shareLink.redeemSharingLink) ? "redeemSharingLink" : "redeemSharingLinkIfNecessary",
            }));
        }
        return graphGet(q);
    }
    async grantSharingLinkAccess(shareLinkAccess) {
        const q = Shares(this, combine(shareLinkAccess.encodedSharingUrl, "permission", "grant"));
        return graphPost(q, body(shareLinkAccess));
    }
};
_Shares = tslib_es6_decorate([
    defaultPath("shares"),
    getById(Share)
], _Shares);

const Shares = graphInvokableFactory(_Shares);

;// ./node_modules/@pnp/graph/shares/drive-item.js



/**
 * Method for creating a sharing link for the drive item.
 * @param sharingLinkInfo - ISharingLinkInfo
 * @returns Microsoft Graph - SharingLink
 */
_DriveItem.prototype.createSharingLink = async function createSharingLink(sharingLinkInfo) {
    return graphPost(DriveItem(this, "createLink"), body(sharingLinkInfo));
};

;// ./node_modules/@pnp/graph/shares/index.js




Reflect.defineProperty(GraphFI.prototype, "shares", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Shares);
    },
});

;// ./node_modules/@pnp/graph/sites/group.js



addProp(_Group, "sites", Sites);

;// ./node_modules/@pnp/graph/sites/user.js



addProp(_User, "followedSites", FollowedSites);

;// ./node_modules/@pnp/graph/sites/index.js





Reflect.defineProperty(GraphFI.prototype, "sites", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Sites);
    },
});

;// ./node_modules/@pnp/graph/subscriptions/types.js




/**
 * Subscription
 */
let _Subscription = class _Subscription extends _GraphInstance {
};
_Subscription = tslib_es6_decorate([
    deleteable(),
    updateable()
], _Subscription);

const Subscription = graphInvokableFactory(_Subscription);
/**
 * Subscriptions
 */
let _Subscriptions = class _Subscriptions extends _GraphCollection {
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
        const data = await graphPost(this, body(postBody));
        return {
            data,
            subscription: this.getById(data.id),
        };
    }
};
_Subscriptions = tslib_es6_decorate([
    defaultPath("subscriptions"),
    getById(Subscription)
], _Subscriptions);

const Subscriptions = graphInvokableFactory(_Subscriptions);

;// ./node_modules/@pnp/graph/subscriptions/index.js



Reflect.defineProperty(GraphFI.prototype, "subscriptions", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Subscriptions);
    },
});

;// ./node_modules/@pnp/graph/taxonomy/types.js



/**
 * Describes a collection of Form objects
 *
 */
let _TermStore = class _TermStore extends _GraphInstance {
    /**
     * Gets the term groups associated with this tenant
     */
    get groups() {
        return TermGroups(this);
    }
    /**
     * Gets the term sets associated with this tenant
     */
    get sets() {
        return TermSets(this);
    }
};
_TermStore = tslib_es6_decorate([
    defaultPath("termstore"),
    updateable()
], _TermStore);

const TermStore = graphInvokableFactory(_TermStore);
let _TermGroup = class _TermGroup extends _GraphInstance {
    /**
     * Gets the term sets associated with this tenant
     */
    get sets() {
        return TermSets(this, "sets");
    }
};
_TermGroup = tslib_es6_decorate([
    deleteable()
], _TermGroup);

const TermGroup = graphInvokableFactory(_TermGroup);
let _TermGroups = class _TermGroups extends _GraphCollection {
};
_TermGroups = tslib_es6_decorate([
    defaultPath("groups"),
    getById(TermGroup),
    addable()
], _TermGroups);

const TermGroups = graphInvokableFactory(_TermGroups);
let _TermSet = class _TermSet extends _GraphInstance {
    /**
     * Gets all the terms in this set
     */
    get terms() {
        return Terms(this);
    }
    get children() {
        return Children(this);
    }
    get relations() {
        return Relations(this);
    }
    getTermById(id) {
        return Term(this, `terms/${id}`);
    }
    /**
     * Gets all the direct children of the current termset as a tree, however is not ordered based on the SP sorting info
     *
     * @returns Array of children for this item
     */
    async getAllChildrenAsTree(props) {
        const visitor = async (source, parent) => {
            const children = await source.children.select(...selects)();
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const orderedTerm = {
                    children: [],
                    defaultLabel: child.labels.find(l => l.isDefault).name,
                    ...child,
                };
                parent.push(orderedTerm);
                await visitor(this.getTermById(child.id), orderedTerm.children);
            }
        };
        let selects = ["*"];
        if (props === null || props === void 0 ? void 0 : props.retrieveProperties) {
            // graph does not let us wildcard + select properties
            selects = ["id", "labels", "createdDateTime", "lastModifiedDateTime", "labels", "descriptions", "properties"];
        }
        const tree = [];
        await visitor(this, tree);
        return tree;
    }
};
_TermSet = tslib_es6_decorate([
    deleteable(),
    updateable()
], _TermSet);

const TermSet = graphInvokableFactory(_TermSet);
let _TermSets = class _TermSets extends _GraphCollection {
};
_TermSets = tslib_es6_decorate([
    defaultPath("sets"),
    getById(TermSet),
    addable()
], _TermSets);

const TermSets = graphInvokableFactory(_TermSets);
let _Children = class _Children extends _GraphCollection {
};
_Children = tslib_es6_decorate([
    defaultPath("children"),
    addable()
], _Children);

const Children = graphInvokableFactory(_Children);
let _Term = class _Term extends _GraphInstance {
    get children() {
        return Children(this);
    }
    get relations() {
        return Relations(this);
    }
    get set() {
        return TermSet(this, "set");
    }
};
_Term = tslib_es6_decorate([
    updateable(),
    deleteable()
], _Term);

const Term = graphInvokableFactory(_Term);
let _Terms = class _Terms extends _GraphCollection {
};
_Terms = tslib_es6_decorate([
    defaultPath("terms"),
    getById(Term)
], _Terms);

const Terms = graphInvokableFactory(_Terms);
let _Relations = class _Relations extends _GraphCollection {
};
_Relations = tslib_es6_decorate([
    defaultPath("relations"),
    addable()
], _Relations);

const Relations = graphInvokableFactory(_Relations);

;// ./node_modules/@pnp/graph/taxonomy/sites.js



addProp(_Site, "termStore", TermStore);

;// ./node_modules/@pnp/graph/taxonomy/index.js





Reflect.defineProperty(GraphFI.prototype, "termStore", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(TermStore, "termStore").using(Endpoint("beta"));
    },
});

;// ./node_modules/@pnp/graph/teams/users.js



addProp(_User, "joinedTeams", Teams);
addProp(_User, "installedApps", InstalledApps, "teamwork/installedApps");

;// ./node_modules/@pnp/graph/teams/index.js







addProp(_Group, "team", Team);
_Group.prototype.createTeam = async function (props) {
    const data = await graphPut(Group(this, "team"), body(props));
    return {
        data,
        team: this.team,
    };
};
Reflect.defineProperty(GraphFI.prototype, "teams", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Teams);
    },
});

;// ./node_modules/@pnp/graph/to-do/types.js




/**
 * Todo
 */
let _Todo = class _Todo extends _GraphInstance {
    get lists() {
        return TaskLists(this);
    }
};
_Todo = tslib_es6_decorate([
    defaultPath("todo")
], _Todo);

const Todo = graphInvokableFactory(_Todo);
/**
 * TaskList
 */
let _TaskList = class _TaskList extends _GraphInstance {
    get tasks() {
        return TodoTasks(this);
    }
};
_TaskList = tslib_es6_decorate([
    deleteable(),
    updateable()
], _TaskList);

const TaskList = graphInvokableFactory(_TaskList);
/**
 * TaskLists
 */
let _TaskLists = class _TaskLists extends _GraphCollection {
};
_TaskLists = tslib_es6_decorate([
    defaultPath("lists"),
    getById(TaskList),
    addable(),
    hasDelta()
], _TaskLists);

const TaskLists = graphInvokableFactory(_TaskLists);
/**
 * TodoTask
 */
let _TodoTask = class _TodoTask extends _GraphInstance {
    get attachments() {
        return TodoAttachments(this);
    }
    get checklistItems() {
        return ChecklistItems(this);
    }
    get resources() {
        return LinkedResources(this);
    }
};
_TodoTask = tslib_es6_decorate([
    deleteable(),
    updateable()
], _TodoTask);

const TodoTask = graphInvokableFactory(_TodoTask);
/**
 * TodoTasks
 */
let _TodoTasks = class _TodoTasks extends _GraphCollection {
};
_TodoTasks = tslib_es6_decorate([
    defaultPath("tasks"),
    getById(TodoTask),
    addable(),
    hasDelta()
], _TodoTasks);

const TodoTasks = graphInvokableFactory(_TodoTasks);
/**
 * TodoAttachment
 */
let _TodoAttachment = class _TodoAttachment extends _GraphInstance {
    get TodoAttachments() {
        return TodoAttachments(this);
    }
};
_TodoAttachment = tslib_es6_decorate([
    deleteable()
], _TodoAttachment);

const TodoAttachment = graphInvokableFactory(_TodoAttachment);
/**
 * TodoAttachments
 */
let _TodoAttachments = class _TodoAttachments extends _GraphCollection {
    async add(TodoAttachmentInfo) {
        const postBody = {
            "@odata.type": "#microsoft.graph.taskFileAttachment",
            ...TodoAttachmentInfo,
        };
        return graphPost(this, body(postBody));
    }
};
_TodoAttachments = tslib_es6_decorate([
    defaultPath("attachments"),
    getById(TodoAttachment)
], _TodoAttachments);

const TodoAttachments = graphInvokableFactory(_TodoAttachments);
/**
 * Checklist
 */
let _ChecklistItem = class _ChecklistItem extends _GraphInstance {
};
_ChecklistItem = tslib_es6_decorate([
    deleteable(),
    updateable()
], _ChecklistItem);

const ChecklistItem = graphInvokableFactory(_ChecklistItem);
/**
 * ChecklistItems
 */
let _ChecklistItems = class _ChecklistItems extends _GraphCollection {
};
_ChecklistItems = tslib_es6_decorate([
    defaultPath("checklistItems"),
    getById(ChecklistItem),
    addable()
], _ChecklistItems);

const ChecklistItems = graphInvokableFactory(_ChecklistItems);
/**
 * LinkedResource
 */
let _LinkedResource = class _LinkedResource extends _GraphInstance {
};
_LinkedResource = tslib_es6_decorate([
    deleteable(),
    updateable()
], _LinkedResource);

const LinkedResource = graphInvokableFactory(_LinkedResource);
/**
 * LinkedResources
 */
let _LinkedResources = class _LinkedResources extends _GraphCollection {
};
_LinkedResources = tslib_es6_decorate([
    defaultPath("linkedResources"),
    getById(LinkedResource),
    addable()
], _LinkedResources);

const LinkedResources = graphInvokableFactory(_LinkedResources);

;// ./node_modules/@pnp/graph/to-do/user.js



addProp(_User, "todo", Todo);

;// ./node_modules/@pnp/graph/to-do/index.js



;// ./node_modules/@pnp/graph/users/index.js



Reflect.defineProperty(GraphFI.prototype, "me", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(User, "me");
    },
});
Reflect.defineProperty(GraphFI.prototype, "users", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Users);
    },
});

;// ./node_modules/@pnp/graph/presets/all.js











































































;// ./pnpjs-sources/index-graph.ts


/******/ 	return __webpack_exports__;
/******/ })()
;
});