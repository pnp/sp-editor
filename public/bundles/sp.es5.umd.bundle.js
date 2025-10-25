(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp.sp"] = factory();
	else
		root["pnp.sp"] = factory();
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
  AddFieldOptions: () => (/* reexport */ AddFieldOptions),
  Admin: () => (/* reexport */ Admin),
  AnonymousLinkType: () => (/* reexport */ AnonymousLinkType),
  App: () => (/* reexport */ App),
  AppCatalog: () => (/* reexport */ AppCatalog),
  AppViewsPolicy: () => (/* reexport */ AppViewsPolicy),
  Attachment: () => (/* reexport */ Attachment),
  Attachments: () => (/* reexport */ Attachments),
  AzureSubscriptionState: () => (/* reexport */ AzureSubscriptionState),
  BatchNever: () => (/* reexport */ BatchNever),
  BlockDownloadLinksFileTypes: () => (/* reexport */ BlockDownloadLinksFileTypes),
  CalendarType: () => (/* reexport */ CalendarType),
  CanvasColumn: () => (/* reexport */ CanvasColumn),
  CanvasSection: () => (/* reexport */ CanvasSection),
  CheckinType: () => (/* reexport */ CheckinType),
  ChoiceFieldFormatType: () => (/* reexport */ ChoiceFieldFormatType),
  ClientsidePageFromFile: () => (/* reexport */ ClientsidePageFromFile),
  ClientsideText: () => (/* reexport */ ClientsideText),
  ClientsideWebpart: () => (/* reexport */ ClientsideWebpart),
  ColumnControl: () => (/* reexport */ ColumnControl),
  Comment: () => (/* reexport */ Comment),
  Comments: () => (/* reexport */ Comments),
  CompanyWideSharingLinksPolicy: () => (/* reexport */ CompanyWideSharingLinksPolicy),
  ComparisonResult: () => (/* reexport */ ComparisonResult),
  ContentType: () => (/* reexport */ ContentType),
  ContentTypes: () => (/* reexport */ ContentTypes),
  ControlMode: () => (/* reexport */ ControlMode),
  CreateClientsidePage: () => (/* reexport */ CreateClientsidePage),
  DateTimeFieldFormatType: () => (/* reexport */ DateTimeFieldFormatType),
  DateTimeFieldFriendlyFormatType: () => (/* reexport */ DateTimeFieldFriendlyFormatType),
  DefaultHeaders: () => (/* reexport */ DefaultHeaders),
  DefaultInit: () => (/* reexport */ DefaultInit),
  DenyAddAndCustomizePagesStatus: () => (/* reexport */ DenyAddAndCustomizePagesStatus),
  Feature: () => (/* reexport */ Feature),
  Features: () => (/* reexport */ Features),
  Field: () => (/* reexport */ Field),
  FieldLink: () => (/* reexport */ FieldLink),
  FieldLinks: () => (/* reexport */ FieldLinks),
  FieldTypes: () => (/* reexport */ FieldTypes),
  FieldUserSelectionMode: () => (/* reexport */ FieldUserSelectionMode),
  Fields: () => (/* reexport */ Fields),
  File: () => (/* reexport */ File),
  Files: () => (/* reexport */ Files),
  FlowsPolicy: () => (/* reexport */ FlowsPolicy),
  Folder: () => (/* reexport */ Folder),
  Folders: () => (/* reexport */ Folders),
  Form: () => (/* reexport */ Form),
  Forms: () => (/* reexport */ Forms),
  GroupSiteManager: () => (/* reexport */ GroupSiteManager),
  HubSite: () => (/* reexport */ HubSite),
  HubSites: () => (/* reexport */ HubSites),
  ImageTaggingChoice: () => (/* reexport */ ImageTaggingChoice),
  ImportProfilePropertiesJobState: () => (/* reexport */ ImportProfilePropertiesJobState),
  ImportProfilePropertiesUserIdTypes: () => (/* reexport */ ImportProfilePropertiesUserIdTypes),
  InitialFieldQuery: () => (/* reexport */ InitialFieldQuery),
  Item: () => (/* reexport */ Item),
  ItemVersion: () => (/* reexport */ ItemVersion),
  ItemVersions: () => (/* reexport */ ItemVersions),
  Items: () => (/* reexport */ Items),
  LimitedWebPartManager: () => (/* reexport */ LimitedWebPartManager),
  List: () => (/* reexport */ List),
  Lists: () => (/* reexport */ Lists),
  MediaTranscriptionPolicyType: () => (/* reexport */ MediaTranscriptionPolicyType),
  MoveOperations: () => (/* reexport */ MoveOperations),
  MySocial: () => (/* reexport */ MySocial),
  Navigation: () => (/* reexport */ Navigation),
  NavigationNode: () => (/* reexport */ NavigationNode),
  NavigationNodes: () => (/* reexport */ NavigationNodes),
  NavigationService: () => (/* reexport */ NavigationService),
  Office365Tenant: () => (/* reexport */ Office365Tenant),
  PWAEnabledStatus: () => (/* reexport */ PWAEnabledStatus),
  PageType: () => (/* reexport */ PageType),
  PermissionKind: () => (/* reexport */ PermissionKind),
  PersonalSiteFilter: () => (/* reexport */ PersonalSiteFilter),
  PrincipalSource: () => (/* reexport */ PrincipalSource),
  PrincipalType: () => (/* reexport */ PrincipalType),
  Profiles: () => (/* reexport */ Profiles),
  PromotedState: () => (/* reexport */ PromotedState),
  QueryPropertyValueType: () => (/* reexport */ QueryPropertyValueType),
  RegionalSettings: () => (/* reexport */ RegionalSettings),
  RelatedItemManager: () => (/* reexport */ RelatedItemManager),
  RenderListDataOptions: () => (/* reexport */ RenderListDataOptions),
  ReorderingRuleMatchType: () => (/* reexport */ ReorderingRuleMatchType),
  Replies: () => (/* reexport */ Replies),
  RequestDigest: () => (/* reexport */ RequestDigest),
  RestrictedToRegion: () => (/* reexport */ RestrictedToRegion),
  ResultStatus: () => (/* reexport */ ResultStatus),
  RoleAssignment: () => (/* reexport */ RoleAssignment),
  RoleAssignments: () => (/* reexport */ RoleAssignments),
  RoleDefinition: () => (/* reexport */ RoleDefinition),
  RoleDefinitions: () => (/* reexport */ RoleDefinitions),
  RoleType: () => (/* reexport */ RoleType),
  SPBrowser: () => (/* reexport */ SPBrowser),
  SPCollection: () => (/* reexport */ SPCollection),
  SPFI: () => (/* reexport */ SPFI),
  SPFx: () => (/* reexport */ SPFx),
  SPFxToken: () => (/* reexport */ SPFxToken),
  SPInstance: () => (/* reexport */ SPInstance),
  SPOConditionalAccessPolicyType: () => (/* reexport */ SPOConditionalAccessPolicyType),
  SPOHubSiteUserRights: () => (/* reexport */ SPOHubSiteUserRights),
  SPOLimitedAccessFileType: () => (/* reexport */ SPOLimitedAccessFileType),
  SPOTenantCdnPolicyType: () => (/* reexport */ SPOTenantCdnPolicyType),
  SPOTenantCdnType: () => (/* reexport */ SPOTenantCdnType),
  SPOUserSessionRevocationState: () => (/* reexport */ SPOUserSessionRevocationState),
  SPOrgAssetType: () => (/* reexport */ SPOrgAssetType),
  SPQueryable: () => (/* reexport */ SPQueryable),
  SPResilienceModeType: () => (/* reexport */ SPResilienceModeType),
  SPSharedObjectType: () => (/* reexport */ SPSharedObjectType),
  Search: () => (/* reexport */ Search),
  SearchBuiltInSourceId: () => (/* reexport */ SearchBuiltInSourceId),
  SearchQueryBuilder: () => (/* reexport */ SearchQueryBuilder),
  SearchResults: () => (/* reexport */ SearchResults),
  SensitiveByDefaultState: () => (/* reexport */ SensitiveByDefaultState),
  SharingCapabilities: () => (/* reexport */ SharingCapabilities),
  SharingDomainRestrictionMode: () => (/* reexport */ SharingDomainRestrictionMode),
  SharingDomainRestrictionModes: () => (/* reexport */ SharingDomainRestrictionModes),
  SharingLinkKind: () => (/* reexport */ SharingLinkKind),
  SharingLinkType: () => (/* reexport */ SharingLinkType),
  SharingOperationStatusCode: () => (/* reexport */ SharingOperationStatusCode),
  SharingPermissionType: () => (/* reexport */ SharingPermissionType),
  SharingRole: () => (/* reexport */ SharingRole),
  SharingScope: () => (/* reexport */ SharingScope),
  SharingState: () => (/* reexport */ SharingState),
  Site: () => (/* reexport */ Site),
  SiteDesigns: () => (/* reexport */ SiteDesigns),
  SiteGroup: () => (/* reexport */ SiteGroup),
  SiteGroups: () => (/* reexport */ SiteGroups),
  SiteLogoAspect: () => (/* reexport */ SiteLogoAspect),
  SiteLogoType: () => (/* reexport */ SiteLogoType),
  SitePageService: () => (/* reexport */ SitePageService),
  SiteScripts: () => (/* reexport */ SiteScripts),
  SiteUser: () => (/* reexport */ SiteUser),
  SiteUserInfoVisibilityPolicyValue: () => (/* reexport */ SiteUserInfoVisibilityPolicyValue),
  SiteUsers: () => (/* reexport */ SiteUsers),
  Social: () => (/* reexport */ Social),
  SocialActorType: () => (/* reexport */ SocialActorType),
  SocialActorTypes: () => (/* reexport */ SocialActorTypes),
  SocialFollowResult: () => (/* reexport */ SocialFollowResult),
  SocialStatusCode: () => (/* reexport */ SocialStatusCode),
  SortDirection: () => (/* reexport */ SortDirection),
  SortOrder: () => (/* reexport */ SortOrder),
  SpecialCharactersState: () => (/* reexport */ SpecialCharactersState),
  SpoSiteLockState: () => (/* reexport */ SpoSiteLockState),
  Subscription: () => (/* reexport */ Subscription),
  Subscriptions: () => (/* reexport */ Subscriptions),
  Suggest: () => (/* reexport */ Suggest),
  TeamsChannelTypeValue: () => (/* reexport */ TeamsChannelTypeValue),
  Telemetry: () => (/* reexport */ Telemetry),
  TemplateFileType: () => (/* reexport */ TemplateFileType),
  TenantBrowseUserInfoPolicyValue: () => (/* reexport */ TenantBrowseUserInfoPolicyValue),
  TimeZone: () => (/* reexport */ TimeZone),
  TimeZones: () => (/* reexport */ TimeZones),
  UrlFieldFormatType: () => (/* reexport */ UrlFieldFormatType),
  UrlZone: () => (/* reexport */ UrlZone),
  UserCustomAction: () => (/* reexport */ UserCustomAction),
  UserCustomActionRegistrationType: () => (/* reexport */ UserCustomActionRegistrationType),
  UserCustomActionScope: () => (/* reexport */ UserCustomActionScope),
  UserCustomActions: () => (/* reexport */ UserCustomActions),
  Utilities: () => (/* reexport */ Utilities),
  Version: () => (/* reexport */ Version),
  Versions: () => (/* reexport */ Versions),
  View: () => (/* reexport */ View),
  ViewFields: () => (/* reexport */ ViewFields),
  ViewScope: () => (/* reexport */ ViewScope),
  Views: () => (/* reexport */ Views),
  Web: () => (/* reexport */ Web),
  WebPartDefinition: () => (/* reexport */ WebPartDefinition),
  WebPartDefinitions: () => (/* reexport */ WebPartDefinitions),
  WebPartsPersonalizationScope: () => (/* reexport */ WebPartsPersonalizationScope),
  Webs: () => (/* reexport */ Webs),
  Workflows2013State: () => (/* reexport */ Workflows2013State),
  _SPCollection: () => (/* reexport */ _SPCollection),
  _SPInstance: () => (/* reexport */ _SPInstance),
  _SPQueryable: () => (/* reexport */ _SPQueryable),
  containsInvalidFileFolderChars: () => (/* reexport */ containsInvalidFileFolderChars),
  createBatch: () => (/* reexport */ createBatch),
  createChangeToken: () => (/* reexport */ createChangeToken),
  defaultPath: () => (/* reexport */ defaultPath),
  deleteable: () => (/* reexport */ deleteable),
  deleteableWithETag: () => (/* reexport */ deleteableWithETag),
  emptyGuid: () => (/* reexport */ emptyGuid),
  encodePath: () => (/* reexport */ encodePath),
  encodePathNoURIEncode: () => (/* reexport */ encodePathNoURIEncode),
  extractWebUrl: () => (/* reexport */ extractWebUrl),
  fileFromAbsolutePath: () => (/* reexport */ fileFromAbsolutePath),
  fileFromPath: () => (/* reexport */ fileFromPath),
  fileFromServerRelativePath: () => (/* reexport */ fileFromServerRelativePath),
  folderFromAbsolutePath: () => (/* reexport */ folderFromAbsolutePath),
  folderFromPath: () => (/* reexport */ folderFromPath),
  folderFromServerRelativePath: () => (/* reexport */ folderFromServerRelativePath),
  metadata: () => (/* reexport */ metadata),
  odataUrlFrom: () => (/* reexport */ odataUrlFrom),
  spDelete: () => (/* reexport */ spDelete),
  spGet: () => (/* reexport */ spGet),
  spInvokableFactory: () => (/* reexport */ spInvokableFactory),
  spPatch: () => (/* reexport */ spPatch),
  spPost: () => (/* reexport */ spPost),
  spPostDelete: () => (/* reexport */ spPostDelete),
  spPostDeleteETag: () => (/* reexport */ spPostDeleteETag),
  spPostMerge: () => (/* reexport */ spPostMerge),
  spfi: () => (/* reexport */ spfi),
  stripInvalidFileFolderChars: () => (/* reexport */ stripInvalidFileFolderChars),
  toResourcePath: () => (/* reexport */ toResourcePath)
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



;// ./node_modules/tslib/tslib.es6.mjs
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

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
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

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const tslib_es6 = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
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
  __rewriteRelativeImportExtension,
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
        if (response.status === 204) {
            return {};
        }
        // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
        const txt = await response.text();
        const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
        return { data: { ...parseODataJSON(json) }, headers: response.headers };
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
    if (util_isArray(scope === null || scope === void 0 ? void 0 : scope.actions)) {
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
            if (util_objectDefinedNotNull(existingScope)) {
                if (!util_isArray(existingScope.actions)) {
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

;// ./node_modules/@pnp/sp/spqueryable.js


const spInvokableFactory = (f) => {
    return queryableFactory(f);
};
/**
 * SharePointQueryable Base Class
 *
 */
class _SPQueryable extends queryable_Queryable {
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
            const q = util_isArray(base) ? base[0] : base;
            this.parentUrl = util_isArray(base) ? base[1] : q.toUrl();
        }
    }
    /**
     * Gets the full url with query information
     */
    toRequestUrl() {
        const aliasedParams = new URLSearchParams(this.query);
        // this regex is designed to locate aliased parameters within url paths
        let url = this.toUrl().replace(/'!(@.+?)::((?:[^']|'')+)'/ig, (match, labelName, value) => {
            this.log(`Rewriting aliased parameter from match ${match} to label: ${labelName} value: ${value}`, 0);
            aliasedParams.set(labelName, `'${value}'`);
            return labelName;
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
        return factory([this, base], path);
    }
}
const SPQueryable = spInvokableFactory(_SPQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class _SPCollection extends _SPQueryable {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    filter(filter) {
        if (typeof filter === "object") {
            this.query.set("$filter", filter.toString());
            return this;
        }
        if (typeof filter === "function") {
            this.query.set("$filter", filter(SPOData.Where()).toString());
            return this;
        }
        this.query.set("$filter", filter.toString());
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
class _SPInstance extends _SPQueryable {
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
const spGet = (o, init) => {
    return op(o, get, init);
};
const spPost = (o, init) => op(o, post, init);
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
const spDelete = (o, init) => op(o, del, init);
const spPatch = (o, init) => op(o, patch, init);
var FilterOperation;
(function (FilterOperation) {
    FilterOperation["Equals"] = "eq";
    FilterOperation["NotEquals"] = "ne";
    FilterOperation["GreaterThan"] = "gt";
    FilterOperation["GreaterThanOrEqualTo"] = "ge";
    FilterOperation["LessThan"] = "lt";
    FilterOperation["LessThanOrEqualTo"] = "le";
    FilterOperation["StartsWith"] = "startswith";
    FilterOperation["SubstringOf"] = "substringof";
})(FilterOperation || (FilterOperation = {}));
var FilterJoinOperator;
(function (FilterJoinOperator) {
    FilterJoinOperator["And"] = "and";
    FilterJoinOperator["AndWithSpace"] = " and ";
    FilterJoinOperator["Or"] = "or";
    FilterJoinOperator["OrWithSpace"] = " or ";
})(FilterJoinOperator || (FilterJoinOperator = {}));
class SPOData {
    static Where() {
        return new InitialFieldQuery([]);
    }
}
// Linting complains that TBaseInterface is unused, but without it all the intellisense is lost since it's carrying it through the chain
class BaseQuery {
    constructor(query) {
        this.query = [];
        this.query = query;
    }
}
class QueryableFields extends BaseQuery {
    constructor(q) {
        super(q);
    }
    text(internalName) {
        return new TextField([...this.query, internalName]);
    }
    choice(internalName) {
        return new TextField([...this.query, internalName]);
    }
    multiChoice(internalName) {
        return new TextField([...this.query, internalName]);
    }
    number(internalName) {
        return new NumberField([...this.query, internalName]);
    }
    date(internalName) {
        return new DateField([...this.query, internalName]);
    }
    boolean(internalName) {
        return new BooleanField([...this.query, internalName]);
    }
    lookup(internalName) {
        return new LookupQueryableFields([...this.query], internalName);
    }
    lookupId(internalName) {
        const col = internalName.endsWith("Id") ? internalName : `${internalName}Id`;
        return new NumberField([...this.query, col]);
    }
}
class QueryableAndResult extends QueryableFields {
    or(...queries) {
        return new ComparisonResult([...this.query, `(${queries.map(x => x.toString()).join(FilterJoinOperator.OrWithSpace)})`]);
    }
}
class QueryableOrResult extends QueryableFields {
    and(...queries) {
        return new ComparisonResult([...this.query, `(${queries.map(x => x.toString()).join(FilterJoinOperator.AndWithSpace)})`]);
    }
}
class InitialFieldQuery extends QueryableFields {
    or(...queries) {
        if (queries == null || queries.length === 0) {
            return new QueryableFields([...this.query, FilterJoinOperator.Or]);
        }
        return new ComparisonResult([...this.query, `(${queries.map(x => x.toString()).join(FilterJoinOperator.OrWithSpace)})`]);
    }
    and(...queries) {
        if (queries == null || queries.length === 0) {
            return new QueryableFields([...this.query, FilterJoinOperator.And]);
        }
        return new ComparisonResult([...this.query, `(${queries.map(x => x.toString()).join(FilterJoinOperator.AndWithSpace)})`]);
    }
}
class LookupQueryableFields extends BaseQuery {
    constructor(q, LookupField) {
        super(q);
        this.LookupField = LookupField;
    }
    Id(id) {
        return new ComparisonResult([...this.query, `${this.LookupField}/Id`, FilterOperation.Equals, id.toString()]);
    }
    text(internalName) {
        return new TextField([...this.query, `${this.LookupField}/${internalName}`]);
    }
    number(internalName) {
        return new NumberField([...this.query, `${this.LookupField}/${internalName}`]);
    }
}
class NullableField extends BaseQuery {
    constructor(q) {
        super(q);
        this.LastIndex = q.length - 1;
        this.InternalName = q[this.LastIndex];
    }
    toODataValue(value) {
        return `'${value}'`;
    }
    isNull() {
        return new ComparisonResult([...this.query, FilterOperation.Equals, "null"]);
    }
    isNotNull() {
        return new ComparisonResult([...this.query, FilterOperation.NotEquals, "null"]);
    }
}
class ComparableField extends NullableField {
    equals(value) {
        return new ComparisonResult([...this.query, FilterOperation.Equals, this.toODataValue(value)]);
    }
    notEquals(value) {
        return new ComparisonResult([...this.query, FilterOperation.NotEquals, this.toODataValue(value)]);
    }
    in(...values) {
        return SPOData.Where().or(...values.map(x => this.equals(x)));
    }
    notIn(...values) {
        return SPOData.Where().and(...values.map(x => this.notEquals(x)));
    }
}
class TextField extends ComparableField {
    startsWith(value) {
        const filter = `${FilterOperation.StartsWith}(${this.InternalName}, ${this.toODataValue(value)})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult([...this.query]);
    }
    contains(value) {
        const filter = `${FilterOperation.SubstringOf}(${this.toODataValue(value)}, ${this.InternalName})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult([...this.query]);
    }
}
class BooleanField extends NullableField {
    toODataValue(value) {
        return `${value == null ? "null" : value ? 1 : 0}`;
    }
    isTrue() {
        return new ComparisonResult([...this.query, FilterOperation.Equals, this.toODataValue(true)]);
    }
    isFalse() {
        return new ComparisonResult([...this.query, FilterOperation.Equals, this.toODataValue(false)]);
    }
    isFalseOrNull() {
        const filter = `(${[
            this.InternalName,
            FilterOperation.Equals,
            this.toODataValue(null),
            FilterJoinOperator.Or,
            this.InternalName,
            FilterOperation.Equals,
            this.toODataValue(false),
        ].join(" ")})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult([...this.query]);
    }
}
class NumericField extends ComparableField {
    greaterThan(value) {
        return new ComparisonResult([...this.query, FilterOperation.GreaterThan, this.toODataValue(value)]);
    }
    greaterThanOrEquals(value) {
        return new ComparisonResult([...this.query, FilterOperation.GreaterThanOrEqualTo, this.toODataValue(value)]);
    }
    lessThan(value) {
        return new ComparisonResult([...this.query, FilterOperation.LessThan, this.toODataValue(value)]);
    }
    lessThanOrEquals(value) {
        return new ComparisonResult([...this.query, FilterOperation.LessThanOrEqualTo, this.toODataValue(value)]);
    }
}
class NumberField extends NumericField {
    toODataValue(value) {
        return `${value}`;
    }
}
class DateField extends NumericField {
    toODataValue(value) {
        return `'${value.toISOString()}'`;
    }
    isBetween(startDate, endDate) {
        const filter = `(${[
            this.InternalName,
            FilterOperation.GreaterThan,
            this.toODataValue(startDate),
            FilterJoinOperator.And,
            this.InternalName,
            FilterOperation.LessThan,
            this.toODataValue(endDate),
        ].join(" ")})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult([...this.query]);
    }
    isToday() {
        const StartToday = new Date();
        StartToday.setHours(0, 0, 0, 0);
        const EndToday = new Date();
        EndToday.setHours(23, 59, 59, 999);
        return this.isBetween(StartToday, EndToday);
    }
}
class ComparisonResult extends BaseQuery {
    // eslint-disable-next-line max-len
    and(...queries) {
        if (queries == null || queries.length === 0) {
            return new QueryableAndResult([...this.query, FilterJoinOperator.And]);
        }
        return new ComparisonResult([...this.query, FilterJoinOperator.And, `(${queries.map(x => x.toString()).join(FilterJoinOperator.AndWithSpace)})`]);
    }
    // eslint-disable-next-line max-len
    or(...queries) {
        if (queries == null || queries.length === 0) {
            return new QueryableOrResult([...this.query, FilterJoinOperator.Or]);
        }
        return new ComparisonResult([...this.query, FilterJoinOperator.Or, `(${queries.map(x => x.toString()).join(FilterJoinOperator.OrWithSpace)})`]);
    }
    toString() {
        return this.query.join(" ");
    }
}

;// ./node_modules/@pnp/sp/fi.js

class SPFI {
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
    return new SPFI(root);
}

;// ./node_modules/@pnp/sp/decorators.js
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

;// ./node_modules/@pnp/sp/utils/extract-web-url.js

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

;// ./node_modules/@pnp/sp/utils/encode-path-str.js

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
function encodePathNoURIEncode(value) {
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
        return value.replace(/'/ig, "''");
    }
}

;// ./node_modules/@pnp/sp/webs/types.js







let _Webs = class _Webs extends _SPCollection {
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
        return spPost(Webs(this, "add"), postBody);
    }
};
_Webs = __decorate([
    defaultPath("webs")
], _Webs);

const Webs = spInvokableFactory(_Webs);
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
    const matches = /(_api[/|\\](site\/rootweb|site|web))/i.exec(candidate);
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
let _Web = class _Web extends _SPInstance {
    constructor(base, path) {
        if (typeof base === "string") {
            base = rebaseWebUrl(base, path);
        }
        else if (util_isArray(base)) {
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
_Web = __decorate([
    defaultPath("_api/web")
], _Web);

const Web = spInvokableFactory(_Web);

;// ./node_modules/@pnp/sp/batching.js





SPFI.prototype.batched = function (props) {
    const batched = spfi(this);
    const [behavior, execute] = createBatch(batched._root, props);
    batched.using(behavior);
    return [batched, execute];
};
_Web.prototype.batched = function (props) {
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
class BatchQueryable extends _SPQueryable {
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
    const batchQuery = new BatchQueryable(base);
    // this id will be reused across multiple batches if the number of requests added to the batch
    // exceeds the configured maxRequests value
    const batchId = getGUID();
    // this query is used to copy back the behaviors after the batch executes
    // it should not manipulated or have behaviors added.
    const refQuery = new BatchQueryable(base);
    const { headersCopyPattern, maxRequests } = {
        headersCopyPattern: /Accept|Content-Type|IF-Match/i,
        maxRequests: 20,
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
        // create a working copy of our requests
        const requestsWorkingCopy = requests.slice();
        while (requestsWorkingCopy.length > 0) {
            const requestsChunk = requestsWorkingCopy.splice(0, maxRequests);
            const batchBody = [];
            let currentChangeSetId = "";
            for (let i = 0; i < requestsChunk.length; i++) {
                const [, url, init] = requestsChunk[i];
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
            if (responses.length !== requestsChunk.length) {
                throw Error("Could not properly parse responses to match requests in batch.");
            }
            for (let index = 0; index < responses.length; index++) {
                // resolve the child request's send promise with the parsed response
                requestsChunk[index][3](responses[index]);
            }
        } // end of while (requestsWorkingCopy.length > 0)
        await Promise.all(completePromises).then(() => void (0));
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
                const promise = new Promise((resolve) => {
                    // add the request information into the batch
                    requests.push([this, url.toString(), init, resolve]);
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

;// ./node_modules/@pnp/sp/appcatalog/types.js





function getAppCatalogPath(base, path) {
    const paths = ["_api/web/tenantappcatalog/", "_api/web/sitecollectionappcatalog/"];
    for (let i = 0; i < paths.length; i++) {
        const index = base.indexOf(paths[i]);
        if (index > -1) {
            return combine(base.substring(index, index + paths[i].length), path);
        }
    }
    return combine(base, path);
}
let _AppCatalog = class _AppCatalog extends _SPCollection {
    constructor(base, path) {
        super(base, null);
        this._url = combine(extractWebUrl(this._url), path);
    }
    /**
     * Get details of specific app from the app catalog
     * @param id - Specify the guid of the app
     */
    getAppById(id) {
        return App(this, `getById('${id}')`);
    }
    /**
     * Synchronize a solution to the Microsoft Teams App Catalog
     * @param id - Specify the guid of the app
     * @param useSharePointItemId (optional) - By default this REST call requires the SP Item id of the app, not the app id.
     *                            PnPjs will try to fetch the item id, you can still use this parameter to pass your own item id in the first parameter
     */
    async syncSolutionToTeams(id, useSharePointItemId = false) {
        // This REST call requires that you refer the list item id of the solution in the app catalog site.
        let appId = null;
        const webUrl = combine(extractWebUrl(this.toUrl()), "_api/web");
        if (useSharePointItemId) {
            appId = id;
        }
        else {
            const listId = (await SPCollection([this, webUrl], "lists").select("Id").filter("EntityTypeName eq 'AppCatalog'")())[0].Id;
            const listItems = await SPCollection([this, webUrl], `lists/getById('${listId}')/items`).select("Id").filter(`AppProductID eq '${id}'`).top(1)();
            if (listItems && listItems.length > 0) {
                appId = listItems[0].Id;
            }
            else {
                throw Error(`Did not find the app with id ${id} in the appcatalog.`);
            }
        }
        return spPost(AppCatalog(this, getAppCatalogPath(this.toUrl(), `SyncSolutionToTeams(id=${appId})`)));
    }
    /**
     * Uploads an app package. Not supported for batching
     *
     * @param filename Filename to create.
     * @param content app package data (eg: the .app or .sppkg file).
     * @param shouldOverWrite Should an app with the same name in the same location be overwritten? (default: true)
     * @returns Promise<IAppAddResult>
     */
    async add(filename, content, shouldOverWrite = true) {
        // you don't add to the availableapps collection
        const adder = AppCatalog(this, getAppCatalogPath(this.toUrl(), `add(overwrite=${shouldOverWrite},url='${filename}')`));
        return spPost(adder, {
            body: content, headers: {
                "binaryStringRequestBody": "true",
            },
        });
    }
};
_AppCatalog = __decorate([
    defaultPath("_api/web/tenantappcatalog/AvailableApps")
], _AppCatalog);

const AppCatalog = spInvokableFactory(_AppCatalog);
class _App extends _SPInstance {
    /**
     * This method deploys an app on the app catalog. It must be called in the context
     * of the tenant app catalog web or it will fail.
     *
     * @param skipFeatureDeployment Deploy the app to the entire tenant
     */
    deploy(skipFeatureDeployment = false) {
        return this.do(`Deploy(${skipFeatureDeployment})`);
    }
    /**
     * This method retracts a deployed app on the app catalog. It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    retract() {
        return this.do("Retract");
    }
    /**
     * This method allows an app which is already deployed to be installed on a web
     */
    install() {
        return this.do("Install");
    }
    /**
     * This method allows an app which is already installed to be uninstalled on a web
     * Note: when you use the REST API to uninstall a solution package from the site, it is not relocated to the recycle bin
     */
    uninstall() {
        return this.do("Uninstall");
    }
    /**
     * This method allows an app which is already installed to be upgraded on a web
     */
    upgrade() {
        return this.do("Upgrade");
    }
    /**
     * This method removes an app from the app catalog. It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    remove() {
        return this.do("Remove");
    }
    do(path) {
        return spPost(App(this, path));
    }
}
const App = spInvokableFactory(_App);

;// ./node_modules/@pnp/sp/appcatalog/web.js



// we use this function to wrap the AppCatalog as we want to ignore any path values addProp
// will pass and use the defaultPath defined for AppCatalog
addProp(_Web, "appcatalog", (s) => AppCatalog(s, "_api/web/sitecollectionappcatalog/AvailableApps"));

;// ./node_modules/@pnp/sp/appcatalog/index.js





Reflect.defineProperty(SPFI.prototype, "tenantAppcatalog", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(AppCatalog, "_api/web/tenantappcatalog/AvailableApps");
    },
});
SPFI.prototype.getTenantAppCatalogWeb = async function () {
    const data = await Web(this._root, "_api/SP_TenantSettings_Current")();
    return Web([this._root, data.CorporateCatalogUrl]);
};

;// ./node_modules/@pnp/sp/types.js
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

;// ./node_modules/@pnp/sp/utils/odata-url-from.js


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

;// ./node_modules/@pnp/sp/behaviors/telemetry.js

function Telemetry() {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            let clientTag = "PnPCoreJS:4.17.0:";
            // make our best guess based on url to the method called
            const { pathname } = new URL(url);
            // remove anything before the _api as that is potentially PII and we don't care, just want to get the called path to the REST API
            // and we want to modify any (*) calls at the end such as items(3) and items(344) so we just track "items()"
            clientTag = pathname.split("/")
                .filter((v) => !stringIsNullOrEmpty(v) && ["_api", "v2.1", "v2.0"].indexOf(v) < 0)
                .map((value, index, arr) => index === arr.length - 1 ? value.replace(/\(.*?$/i, "()") : value[0])
                .join(".");
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

;// ./node_modules/@pnp/sp/behaviors/defaults.js


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

;// ./node_modules/@pnp/sp/behaviors/request-digest.js





function clearExpired(digest) {
    const now = new Date();
    return !util_objectDefinedNotNull(digest) || (now > digest.expiration) ? null : digest;
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
                if (!util_objectDefinedNotNull(digest) && isFunc(hook)) {
                    digest = clearExpired(hook(urlAsString, init));
                }
                if (!util_objectDefinedNotNull(digest)) {
                    digest = await spPost(SPQueryable([this, combine(webUrl, "_api/contextinfo")]).using(JSONParse(), BatchNever()), {
                        headers: {
                            "Accept": "application/json",
                            "X-PnPjs-NoDigest": "1",
                        },
                    }).then(p => ({
                        expiration: util_dateAdd(new Date(), "second", p.FormDigestTimeoutSeconds),
                        value: p.FormDigestValue,
                    }));
                }
                if (util_objectDefinedNotNull(digest)) {
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

;// ./node_modules/@pnp/sp/behaviors/spbrowser.js




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

;// ./node_modules/@pnp/sp/behaviors/spfx.js




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
                    expiration: util_dateAdd(creationDateFromDigest, "second", ((_c = context.pageContext.legacyPageContext) === null || _c === void 0 ? void 0 : _c.formDigestTimeoutSeconds) - 15 || 1585),
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

;// ./node_modules/@pnp/sp/index.js
















;// ./node_modules/@pnp/sp/utils/to-resource-path.js
function toResourcePath(url) {
    return {
        DecodedUrl: url,
    };
}

;// ./node_modules/@pnp/sp/lists/types.js








let _Lists = class _Lists extends _SPCollection {
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the list (GUID)
     */
    getById(id) {
        return List(this).concat(`('${id}')`);
    }
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    getByTitle(title) {
        return List(this, `getByTitle('${encodePath(title)}')`);
    }
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    async add(title, desc = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        const addSettings = {
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": desc,
            "Title": title,
            ...additionalSettings,
        };
        return spPost(this, body(addSettings));
    }
    /**
     * Ensures that the specified list exists in the collection (note: this method not supported for batching)
     *
     * @param title The new list's title
     * @param desc The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
     */
    async ensure(title, desc = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        const addOrUpdateSettings = { Title: title, Description: desc, ContentTypesEnabled: enableContentTypes, ...additionalSettings };
        const list = this.getByTitle(addOrUpdateSettings.Title);
        try {
            await list.select("Title")();
            const data = await list.update(addOrUpdateSettings);
            return { created: false, data, list: this.getByTitle(addOrUpdateSettings.Title) };
        }
        catch (e) {
            const data = await this.add(title, desc, template, enableContentTypes, addOrUpdateSettings);
            return { created: true, data, list: this.getByTitle(addOrUpdateSettings.Title) };
        }
    }
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    async ensureSiteAssetsLibrary() {
        const json = await spPost(Lists(this, "ensuresiteassetslibrary"));
        return List([this, odataUrlFrom(json)]);
    }
    /**
     * Gets a list that is the default location for wiki pages.
     */
    async ensureSitePagesLibrary() {
        const json = await spPost(Lists(this, "ensuresitepageslibrary"));
        return List([this, odataUrlFrom(json)]);
    }
};
_Lists = __decorate([
    defaultPath("lists")
], _Lists);

const Lists = spInvokableFactory(_Lists);
class _List extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
    /**
     * Gets the effective base permissions of this list
     *
     */
    get effectiveBasePermissions() {
        return SPQueryable(this, "EffectiveBasePermissions");
    }
    /**
     * Gets the event receivers attached to this list
     *
     */
    get eventReceivers() {
        return SPCollection(this, "EventReceivers");
    }
    /**
     * Gets the related fields of this list
     *
     */
    get relatedFields() {
        return SPQueryable(this, "getRelatedFields");
    }
    /**
     * Gets the IRM settings for this list
     *
     */
    get informationRightsManagementSettings() {
        return SPQueryable(this, "InformationRightsManagementSettings");
    }
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    async update(properties, eTag = "*") {
        const data = await spPostMerge(this, body(properties, headers({ "IF-Match": eTag })));
        return data;
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     * @param query A query that is performed against the change log.
     */
    getChanges(query) {
        return spPost(List(this, "getchanges"), body({ query }));
    }
    /**
     * Returns the collection of items in the list based on the provided CamlQuery
     * @param query A query that is performed against the list
     * @param expands An expanded array of n items that contains fields to expand in the CamlQuery
     */
    getItemsByCAMLQuery(query, ...expands) {
        return spPost(List(this, "getitems").expand(...expands), body({ query }));
    }
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     * @param query An object that defines the change log item query
     */
    getListItemChangesSinceToken(query) {
        return spPost(List(this, "getlistitemchangessincetoken").using(TextParse()), body({ query }));
    }
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    async recycle() {
        return spPost(List(this, "recycle"));
    }
    /**
     * Renders list data based on the view xml provided
     * @param viewXml A string object representing a view xml
     */
    async renderListData(viewXml) {
        const q = List(this, "renderlistdata(@viewXml)");
        q.query.set("@viewXml", `'${viewXml}'`);
        const data = await spPost(q);
        return JSON.parse(data);
    }
    /**
     * Returns the data for the specified query view
     *
     * @param parameters The parameters to be used to render list data as JSON string.
     * @param overrideParams The parameters that are used to override and extend the regular SPRenderListDataParameters.
     * @param query Allows setting of query parameters
     */
    // eslint-disable-next-line max-len
    renderListDataAsStream(parameters, overrideParameters = null, query = new Map()) {
        if (hOP(parameters, "RenderOptions") && util_isArray(parameters.RenderOptions)) {
            parameters.RenderOptions = parameters.RenderOptions.reduce((v, c) => v + c);
        }
        const clone = List(this, "RenderListDataAsStream");
        if (query && query.size > 0) {
            query.forEach((v, k) => clone.query.set(k, v));
        }
        const params = util_objectDefinedNotNull(overrideParameters) ? { parameters, overrideParameters } : { parameters };
        return spPost(clone, body(params));
    }
    /**
     * Gets the field values and field schema attributes for a list item.
     * @param itemId Item id of the item to render form data for
     * @param formId The id of the form
     * @param mode Enum representing the control mode of the form (Display, Edit, New)
     */
    async renderListFormData(itemId, formId, mode) {
        const data = await spPost(List(this, `renderlistformdata(itemid=${itemId}, formid='${formId}', mode='${mode}')`));
        // data will be a string, so we parse it again
        return JSON.parse(data);
    }
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    async reserveListItemId() {
        return spPost(List(this, "reservelistitemid"));
    }
    /**
     * Creates an item using path (in a folder), validates and sets its field values.
     *
     * @param formValues The fields to change and their new values.
     * @param decodedUrl Path decoded url; folder's server relative path.
     * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     * @param checkInComment Optional check in comment.
     * @param additionalProps Optional set of additional properties LeafName new document file name,
     */
    async addValidateUpdateItemUsingPath(formValues, decodedUrl, bNewDocumentUpdate = false, checkInComment, additionalProps) {
        const addProps = {
            FolderPath: toResourcePath(decodedUrl),
        };
        if (util_objectDefinedNotNull(additionalProps)) {
            if (additionalProps.leafName) {
                addProps.LeafName = toResourcePath(additionalProps.leafName);
            }
            if (additionalProps.objectType) {
                addProps.UnderlyingObjectType = additionalProps.objectType;
            }
        }
        return spPost(List(this, "AddValidateUpdateItemUsingPath()"), body({
            bNewDocumentUpdate,
            checkInComment,
            formValues,
            listItemCreateInfo: addProps,
        }));
    }
    /**
     * Gets the parent information for this item's list and web
     */
    async getParentInfos() {
        const urlInfo = await this.select("Id", "RootFolder/UniqueId", "RootFolder/ServerRelativeUrl", "RootFolder/ServerRelativePath", "ParentWeb/Id", "ParentWeb/Url", "ParentWeb/ServerRelativeUrl", "ParentWeb/ServerRelativePath").expand("RootFolder", "ParentWeb")();
        return {
            List: {
                Id: urlInfo.Id,
                RootFolderServerRelativePath: urlInfo.RootFolder.ServerRelativePath,
                RootFolderServerRelativeUrl: urlInfo.RootFolder.ServerRelativeUrl,
                RootFolderUniqueId: urlInfo.RootFolder.UniqueId,
            },
            ParentWeb: {
                Id: urlInfo.ParentWeb.Id,
                ServerRelativePath: urlInfo.ParentWeb.ServerRelativePath,
                ServerRelativeUrl: urlInfo.ParentWeb.ServerRelativeUrl,
                Url: urlInfo.ParentWeb.Url,
            },
        };
    }
}
const List = spInvokableFactory(_List);
/**
 * Enum representing the options of the RenderOptions property on IRenderListDataParameters interface
 */
var RenderListDataOptions;
(function (RenderListDataOptions) {
    RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
    RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
    RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
    RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
    RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
    RenderListDataOptions[RenderListDataOptions["ListContentType"] = 16] = "ListContentType";
    /**
     * The returned list will have a FileSystemItemId field on each item if possible.
     */
    RenderListDataOptions[RenderListDataOptions["FileSystemItemId"] = 32] = "FileSystemItemId";
    /**
     * Returns the client form schema to add and edit items.
     */
    RenderListDataOptions[RenderListDataOptions["ClientFormSchema"] = 64] = "ClientFormSchema";
    /**
     * Returns QuickLaunch navigation nodes.
     */
    RenderListDataOptions[RenderListDataOptions["QuickLaunch"] = 128] = "QuickLaunch";
    /**
     * Returns Spotlight rendering information.
     */
    RenderListDataOptions[RenderListDataOptions["Spotlight"] = 256] = "Spotlight";
    /**
     * Returns Visualization rendering information.
     */
    RenderListDataOptions[RenderListDataOptions["Visualization"] = 512] = "Visualization";
    /**
     * Returns view XML and other information about the current view.
     */
    RenderListDataOptions[RenderListDataOptions["ViewMetadata"] = 1024] = "ViewMetadata";
    /**
     * Prevents AutoHyperlink from being run on text fields in this query.
     */
    RenderListDataOptions[RenderListDataOptions["DisableAutoHyperlink"] = 2048] = "DisableAutoHyperlink";
    /**
     * Enables urls pointing to Media TA service, such as .thumbnailUrl, .videoManifestUrl, .pdfConversionUrls.
     */
    RenderListDataOptions[RenderListDataOptions["EnableMediaTAUrls"] = 4096] = "EnableMediaTAUrls";
    /**
     * Return Parant folder information.
     */
    RenderListDataOptions[RenderListDataOptions["ParentInfo"] = 8192] = "ParentInfo";
    /**
     * Return Page context info for the current list being rendered.
     */
    RenderListDataOptions[RenderListDataOptions["PageContextInfo"] = 16384] = "PageContextInfo";
    /**
     * Return client-side component manifest information associated with the list.
     */
    RenderListDataOptions[RenderListDataOptions["ClientSideComponentManifest"] = 32768] = "ClientSideComponentManifest";
    /**
     * Return all content-types available on the list.
     */
    RenderListDataOptions[RenderListDataOptions["ListAvailableContentTypes"] = 65536] = "ListAvailableContentTypes";
    /**
      * Return the order of items in the new-item menu.
      */
    RenderListDataOptions[RenderListDataOptions["FolderContentTypeOrder"] = 131072] = "FolderContentTypeOrder";
    /**
     * Return information to initialize Grid for quick edit.
     */
    RenderListDataOptions[RenderListDataOptions["GridInitInfo"] = 262144] = "GridInitInfo";
    /**
     * Indicator if the vroom API of the SPItemUrl returned in MediaTAUrlGenerator should use site url as host.
     */
    RenderListDataOptions[RenderListDataOptions["SiteUrlAsMediaTASPItemHost"] = 524288] = "SiteUrlAsMediaTASPItemHost";
    /**
     * Return the files representing mount points in the list.
     */
    RenderListDataOptions[RenderListDataOptions["AddToOneDrive"] = 1048576] = "AddToOneDrive";
    /**
     * Return SPFX CustomAction.
     */
    RenderListDataOptions[RenderListDataOptions["SPFXCustomActions"] = 2097152] = "SPFXCustomActions";
    /**
     * Do not return non-SPFX CustomAction.
     */
    RenderListDataOptions[RenderListDataOptions["CustomActions"] = 4194304] = "CustomActions";
})(RenderListDataOptions || (RenderListDataOptions = {}));
/**
 * Determines the display mode of the given control or view
 */
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Display"] = 1] = "Display";
    ControlMode[ControlMode["Edit"] = 2] = "Edit";
    ControlMode[ControlMode["New"] = 3] = "New";
})(ControlMode || (ControlMode = {}));

;// ./node_modules/@pnp/sp/items/types.js







/**
 * Describes a collection of Item objects
 *
 */
let _Items = class _Items extends _SPCollection {
    /**
    * Gets an Item by id
    *
    * @param id The integer id of the item to retrieve
    */
    getById(id) {
        return Item(this).concat(`(${id})`);
    }
    /**
     * Gets BCS Item by string id
     *
     * @param stringId The string id of the BCS item to retrieve
     */
    getItemByStringId(stringId) {
        // creates an item with the parent list path and append out method call
        return Item([this, this.parentUrl], `getItemByStringId('${stringId}')`);
    }
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     * @param reverse It true the PagedPrev=true parameter is added allowing backwards navigation in the collection
     */
    skip(skip, reverse = false) {
        if (reverse) {
            this.query.set("$skiptoken", `Paged=TRUE&PagedPrev=TRUE&p_ID=${skip}`);
        }
        else {
            this.query.set("$skiptoken", `Paged=TRUE&p_ID=${skip}`);
        }
        return this;
    }
    [Symbol.asyncIterator]() {
        const nextInit = SPCollection(this).using(parseBinderWithErrorCheck(async (r) => {
            const json = await r.json();
            const nextLink = hOP(json, "d") && hOP(json.d, "__next") ? json.d.__next : json["odata.nextLink"];
            return {
                hasNext: typeof nextLink === "string" && nextLink.length > 0,
                nextLink,
                value: parseODataJSON(json),
            };
        }));
        const queryParams = ["$top", "$select", "$expand", "$filter", "$orderby", "$skiptoken"];
        for (let i = 0; i < queryParams.length; i++) {
            const param = this.query.get(queryParams[i]);
            if (util_objectDefinedNotNull(param)) {
                nextInit.query.set(queryParams[i], param);
            }
        }
        return {
            _next: nextInit,
            async next() {
                if (this._next === null) {
                    return { done: true, value: undefined };
                }
                const result = await this._next();
                if (result.hasNext) {
                    this._next = SPCollection([this._next, result.nextLink]);
                    return { done: false, value: result.value };
                }
                else {
                    this._next = null;
                    return { done: false, value: result.value };
                }
            },
        };
    }
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    async add(properties = {}) {
        return spPost(this, body(properties));
    }
};
_Items = __decorate([
    defaultPath("items")
], _Items);

const Items = spInvokableFactory(_Items);
/**
 * Descrines a single Item instance
 *
 */
class _Item extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
    /**
     * Gets the effective base permissions for the item
     *
     */
    get effectiveBasePermissions() {
        return SPQueryable(this, "EffectiveBasePermissions");
    }
    /**
     * Gets the effective base permissions for the item in a UI context
     *
     */
    get effectiveBasePermissionsForUI() {
        return SPQueryable(this, "EffectiveBasePermissionsForUI");
    }
    /**
     * Gets the field values for this list item in their HTML representation
     *
     */
    get fieldValuesAsHTML() {
        return SPInstance(this, "FieldValuesAsHTML");
    }
    /**
     * Gets the field values for this list item in their text representation
     *
     */
    get fieldValuesAsText() {
        return SPInstance(this, "FieldValuesAsText");
    }
    /**
     * Gets the field values for this list item for use in editing controls
     *
     */
    get fieldValuesForEdit() {
        return SPInstance(this, "FieldValuesForEdit");
    }
    /**
     * Gets the collection of versions associated with this item
     */
    get versions() {
        return ItemVersions(this);
    }
    /**
     * this item's list
     */
    get list() {
        return this.getParent(List, "", this.parentUrl.substring(0, this.parentUrl.lastIndexOf("/")));
    }
    /**
     * Updates this list instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    async update(properties, eTag = "*") {
        const postBody = body(properties, headers({
            "IF-Match": eTag,
            "X-HTTP-Method": "MERGE",
        }));
        return spPost(Item(this).using(ItemUpdatedParser()), postBody);
    }
    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return spPost(Item(this, "recycle"));
    }
    /**
     * Deletes the item object with options.
     *
     * @param parameters Specifies the options to use when deleting a item.
     */
    async deleteWithParams(parameters) {
        return spPost(Item(this, "DeleteWithParameters"), body({ parameters }));
    }
    /**
     * Gets a string representation of the full URL to the WOPI frame.
     * If there is no associated WOPI application, or no associated action, an empty string is returned.
     *
     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
     */
    async getWopiFrameUrl(action = 0) {
        const i = Item(this, "getWOPIFrameUrl(@action)");
        i.query.set("@action", action);
        return spPost(i);
    }
    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    validateUpdateListItem(formValues, bNewDocumentUpdate = false) {
        return spPost(Item(this, "validateupdatelistitem"), body({ formValues, bNewDocumentUpdate }));
    }
    /**
     * Gets the parent information for this item's list and web
     */
    async getParentInfos() {
        const urlInfo = await this.select("Id", "ParentList/Id", "ParentList/Title", "ParentList/RootFolder/UniqueId", "ParentList/RootFolder/ServerRelativeUrl", "ParentList/RootFolder/ServerRelativePath", "ParentList/ParentWeb/Id", "ParentList/ParentWeb/Url", "ParentList/ParentWeb/ServerRelativeUrl", "ParentList/ParentWeb/ServerRelativePath").expand("ParentList", "ParentList/RootFolder", "ParentList/ParentWeb")();
        return {
            Item: {
                Id: urlInfo.Id,
            },
            ParentList: {
                Id: urlInfo.ParentList.Id,
                Title: urlInfo.ParentList.Title,
                RootFolderServerRelativePath: urlInfo.ParentList.RootFolder.ServerRelativePath,
                RootFolderServerRelativeUrl: urlInfo.ParentList.RootFolder.ServerRelativeUrl,
                RootFolderUniqueId: urlInfo.ParentList.RootFolder.UniqueId,
            },
            ParentWeb: {
                Id: urlInfo.ParentList.ParentWeb.Id,
                ServerRelativePath: urlInfo.ParentList.ParentWeb.ServerRelativePath,
                ServerRelativeUrl: urlInfo.ParentList.ParentWeb.ServerRelativeUrl,
                Url: urlInfo.ParentList.ParentWeb.Url,
            },
        };
    }
    async setImageField(fieldName, imageName, imageContent) {
        const contextInfo = await this.getParentInfos();
        const webUrl = extractWebUrl(this.toUrl());
        const q = SPQueryable([this, webUrl], "/_api/web/UploadImage");
        q.concat("(listTitle=@a1,imageName=@a2,listId=@a3,itemId=@a4)");
        q.query.set("@a1", `'${contextInfo.ParentList.Title}'`);
        q.query.set("@a2", `'${imageName}'`);
        q.query.set("@a3", `'${contextInfo.ParentList.Id}'`);
        q.query.set("@a4", contextInfo.Item.Id);
        const result = await spPost(q, { body: imageContent });
        const itemInfo = {
            "type": "thumbnail",
            "fileName": result.Name,
            "nativeFile": {},
            "fieldName": fieldName,
            "serverUrl": contextInfo.ParentWeb.Url.replace(contextInfo.ParentWeb.ServerRelativeUrl, ""),
            "serverRelativeUrl": result.ServerRelativeUrl,
            "id": result.UniqueId,
        };
        return this.validateUpdateListItem([{
                FieldName: fieldName,
                FieldValue: JSON.stringify(itemInfo),
            }]);
    }
}
const Item = spInvokableFactory(_Item);
/**
 * Describes a collection of Version objects
 *
 */
let _ItemVersions = class _ItemVersions extends _SPCollection {
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId) {
        return ItemVersion(this).concat(`(${versionId})`);
    }
};
_ItemVersions = __decorate([
    defaultPath("versions")
], _ItemVersions);

const ItemVersions = spInvokableFactory(_ItemVersions);
/**
 * Describes a single Version instance
 *
 */
class _ItemVersion extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
}
const ItemVersion = spInvokableFactory(_ItemVersion);
function ItemUpdatedParser() {
    return parseBinderWithErrorCheck(async (r) => ({
        etag: r.headers.get("etag"),
    }));
}

;// ./node_modules/@pnp/sp/files/readable-file.js


function StreamParse() {
    return parseBinderWithErrorCheck(async (r) => { var _a; return ({ body: r.body, knownLength: parseInt(((_a = r === null || r === void 0 ? void 0 : r.headers) === null || _a === void 0 ? void 0 : _a.get("content-length")) || "-1", 10) }); });
}
class ReadableFile extends _SPInstance {
    /**
     * Gets the contents of the file as text. Not supported in batching.
     *
     */
    getText() {
        return this.getParsed(TextParse());
    }
    /**
     * Gets the contents of the file as a blob, does not work in Node.js. Not supported in batching.
     *
     */
    getBlob() {
        return this.getParsed(BlobParse());
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getBuffer() {
        return this.getParsed(BufferParse());
    }
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getJSON() {
        return this.getParsed(JSONParse());
    }
    /**
     * Gets the content of a file as a ReadableStream
     *
     */
    getStream() {
        return SPQueryable(this, "$value").using(StreamParse(), CacheNever())(headers({ "binaryStringResponseBody": "true" }));
    }
    getParsed(parser) {
        return SPQueryable(this, "$value").using(parser, CacheNever())();
    }
}

;// ./node_modules/@pnp/sp/attachments/types.js






let _Attachments = class _Attachments extends _SPCollection {
    /**
    * Gets a Attachment File by filename
    *
    * @param name The name of the file, including extension.
    */
    getByName(name) {
        const f = Attachment(this);
        f.concat(`('${encodePath(name)}')`);
        return f;
    }
    /**
     * Adds a new attachment to the collection. Not supported for batching.
     *
     * @param name The name of the file, including extension.
     * @param content The Base64 file content.
     */
    async add(name, content) {
        const response = await spPost(Attachments(this, `add(FileName='${encodePath(name)}')`), { body: content });
        return {
            data: response,
            file: this.getByName(name),
        };
    }
};
_Attachments = __decorate([
    defaultPath("AttachmentFiles")
], _Attachments);

const Attachments = spInvokableFactory(_Attachments);
class _Attachment extends ReadableFile {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
    /**
     * Sets the content of a file. Not supported for batching
     *
     * @param content The value to set for the file contents
     */
    async setContent(body) {
        await spPost(Attachment(this, "$value"), headers({ "X-HTTP-Method": "PUT" }, { body }));
        return this;
    }
    /**
     * Delete this attachment file and send it to recycle bin
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    recycle(eTag = "*") {
        return spPost(Attachment(this, "recycleObject"), headers({
            "IF-Match": eTag,
            "X-HTTP-Method": "DELETE",
        }));
    }
}
const Attachment = spInvokableFactory(_Attachment);

;// ./node_modules/@pnp/sp/attachments/item.js



addProp(_Item, "attachmentFiles", Attachments);

;// ./node_modules/@pnp/sp/attachments/index.js



;// ./node_modules/@pnp/sp/sites/types.js









/**
 * Ensures that whatever url is passed to the constructor we can correctly rebase it to a site url
 *
 * @param candidate The candidate site url
 * @param path The caller supplied path, which may contain _api, meaning we don't append _api/site
 */
function rebaseSiteUrl(candidate, path) {
    let replace = "_api/site";
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
let _Site = class _Site extends _SPInstance {
    constructor(base, path) {
        if (typeof base === "string") {
            base = rebaseSiteUrl(base, path);
        }
        else if (util_isArray(base)) {
            base = [base[0], rebaseSiteUrl(base[1], path)];
        }
        else {
            base = [base, rebaseSiteUrl(base.toUrl(), path)];
        }
        super(base, path);
    }
    /**
     * Gets the root web of the site collection
     *
     */
    get rootWeb() {
        return Web(this, "rootweb");
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query) {
        const postBody = body({ query });
        return spPost(Web(this, "getchanges"), postBody);
    }
    /**
     * Opens a web by id (using POST)
     *
     * @param webId The GUID id of the web to open
     */
    async openWebById(webId) {
        const data = await spPost(Site(this, `openWebById('${webId}')`));
        return {
            data,
            web: Web([this, extractWebUrl(odataUrlFrom(data))]),
        };
    }
    /**
     * Gets a Web instance representing the root web of the site collection
     * correctly setup for chaining within the library
     */
    async getRootWeb() {
        const web = await this.rootWeb.select("Url")();
        return Web([this, web.Url]);
    }
    /**
     * Deletes the current site
     *
     */
    async delete() {
        const site = await Site(this, "").select("Id")();
        const q = Site([this, this.parentUrl], "_api/SPSiteManager/Delete");
        await spPost(q, body({ siteId: site.Id }));
    }
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    async getDocumentLibraries(absoluteWebUrl) {
        const q = Site([this, this.parentUrl], "_api/sp.web.getdocumentlibraries(@v)");
        q.query.set("@v", `'${absoluteWebUrl}'`);
        const data = await q();
        return hOP(data, "GetDocumentLibraries") ? data.GetDocumentLibraries : data;
    }
    /**
     * Gets the site url from a page url
     *
     * @param absolutePageUrl The absolute url of the page
     */
    async getWebUrlFromPageUrl(absolutePageUrl) {
        const q = Site([this, this.parentUrl], "_api/sp.web.getweburlfrompageurl(@v)");
        q.query.set("@v", `'${absolutePageUrl}'`);
        const data = await q();
        return hOP(data, "GetWebUrlFromPageUrl") ? data.GetWebUrlFromPageUrl : data;
    }
    /**
     * Creates a Modern communication site.
     *
     * @param title The title of the site to create
     * @param lcid The language to use for the site. If not specified will default to 1033 (English).
     * @param shareByEmailEnabled If set to true, it will enable sharing files via Email. By default it is set to false
     * @param url The fully qualified URL (e.g. https://yourtenant.sharepoint.com/sites/mysitecollection) of the site.
     * @param description The description of the communication site.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param siteDesignId The Guid of the site design to be used.
     *                     You can use the below default OOTB GUIDs:
     *                     Topic: 00000000-0000-0000-0000-000000000000
     *                     Showcase: 6142d2a0-63a5-4ba0-aede-d9fefca2c767
     *                     Blank: f6cc5403-0d63-442e-96c0-285923709ffc
     * @param hubSiteId The id of the hub site to which the new site should be associated
     * @param owner Optional owner value, required if executing the method in app only mode
     */
    async createCommunicationSite(title, lcid = 1033, shareByEmailEnabled = false, url, description, classification, siteDesignId, hubSiteId, owner) {
        return this.createCommunicationSiteFromProps({
            Classification: classification,
            Description: description,
            HubSiteId: hubSiteId,
            Lcid: lcid,
            Owner: owner,
            ShareByEmailEnabled: shareByEmailEnabled,
            SiteDesignId: siteDesignId,
            Title: title,
            Url: url,
        });
    }
    async createCommunicationSiteFromProps(props) {
        // handle defaults
        const request = {
            Classification: "",
            Description: "",
            HubSiteId: emptyGuid,
            Lcid: 1033,
            ShareByEmailEnabled: false,
            SiteDesignId: emptyGuid,
            WebTemplate: "SITEPAGEPUBLISHING#0",
            WebTemplateExtensionId: emptyGuid,
            ...props,
        };
        return spPost(Site([this, extractWebUrl(this.toUrl())], "/_api/SPSiteManager/Create"), body({ request }));
    }
    /**
     *
     * @param url Site Url that you want to check if exists
     */
    async exists(url) {
        return spPost(Site([this, extractWebUrl(this.toUrl())], "/_api/SP.Site.Exists"), body({ url }));
    }
    /**
     * Creates a Modern team site backed by Office 365 group. For use in SP Online only. This will not work with App-only tokens
     *
     * @param displayName The title or display name of the Modern team site to be created
     * @param alias Alias of the underlying Office 365 Group
     * @param isPublic Defines whether the Office 365 Group will be public (default), or private.
     * @param lcid The language to use for the site. If not specified will default to English (1033).
     * @param description The description of the site to be created.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param owners The Owners of the site to be created
     */
    async createModernTeamSite(displayName, alias, isPublic, lcid, description, classification, owners, hubSiteId, siteDesignId) {
        return this.createModernTeamSiteFromProps({
            alias,
            classification,
            description,
            displayName,
            hubSiteId,
            isPublic,
            lcid,
            owners,
            siteDesignId,
        });
    }
    async createModernTeamSiteFromProps(props) {
        // handle defaults
        const p = Object.assign({}, {
            classification: "",
            description: "",
            hubSiteId: emptyGuid,
            isPublic: true,
            lcid: 1033,
            owners: [],
        }, props);
        const postBody = {
            alias: p.alias,
            displayName: p.displayName,
            isPublic: p.isPublic,
            optionalParams: {
                Classification: p.classification,
                CreationOptions: [`SPSiteLanguage:${p.lcid}`, `HubSiteId:${p.hubSiteId}`],
                Description: p.description,
                Owners: p.owners,
            },
        };
        if (p.siteDesignId) {
            postBody.optionalParams.CreationOptions.push(`implicit_formula_292aa8a00786498a87a5ca52d9f4214a_${p.siteDesignId}`);
        }
        return spPost(Site([this, extractWebUrl(this.toUrl())], "/_api/GroupSiteManager/CreateGroupEx").using(TextParse()), body(postBody));
    }
    update(props) {
        return spPatch(this, body(props));
    }
    /**
     * Set's the site's `Site Logo` property, vs the Site Icon property available on the web's properties
     *
     * @param logoProperties An instance of ISiteLogoProperties which sets the new site logo.
     */
    setSiteLogo(logoProperties) {
        return spPost(SPQueryable([this, extractWebUrl(this.toUrl())], "_api/siteiconmanager/setsitelogo"), body(logoProperties));
    }
};
_Site = __decorate([
    defaultPath("_api/site")
], _Site);

const Site = spInvokableFactory(_Site);
var SiteLogoType;
(function (SiteLogoType) {
    /**
     * Site header logo
     */
    SiteLogoType[SiteLogoType["WebLogo"] = 0] = "WebLogo";
    /**
     * Hub site logo
     */
    SiteLogoType[SiteLogoType["HubLogo"] = 1] = "HubLogo";
    /**
     * Header background image
     */
    SiteLogoType[SiteLogoType["HeaderBackground"] = 2] = "HeaderBackground";
    /**
     * Global navigation logo
     */
    SiteLogoType[SiteLogoType["GlobalNavLogo"] = 3] = "GlobalNavLogo";
})(SiteLogoType || (SiteLogoType = {}));
var SiteLogoAspect;
(function (SiteLogoAspect) {
    SiteLogoAspect[SiteLogoAspect["Square"] = 0] = "Square";
    SiteLogoAspect[SiteLogoAspect["Rectangular"] = 1] = "Rectangular";
})(SiteLogoAspect || (SiteLogoAspect = {}));

;// ./node_modules/@pnp/sp/clientside-pages/funcs.js

/**
 * Gets the next order value 1 based for the provided collection
 *
 * @param collection Collection of orderable things
 */
function getNextOrder(collection) {
    return collection.length < 1 ? 1 : (Math.max.apply(null, collection.map(i => i.order)) + 1);
}
/**
 * Normalizes the order value for all the sections, columns, and controls to be 1 based and stepped (1, 2, 3...)
 *
 * @param collection The collection to normalize
 */
function reindex(collection) {
    for (let i = 0; i < collection.length; i++) {
        collection[i].order = i + 1;
        if (hOP(collection[i], "columns")) {
            reindex(collection[i].columns);
        }
        else if (hOP(collection[i], "controls")) {
            reindex(collection[i].controls);
        }
    }
}

;// ./node_modules/@pnp/sp/items/list.js



addProp(_List, "items", Items);

;// ./node_modules/@pnp/sp/items/index.js



;// ./node_modules/@pnp/sp/context-info/index.js



_SPQueryable.prototype.getContextInfo = async function (path = this.parentUrl) {
    const data = await spPost(SPQueryable([this, extractWebUrl(path)], "_api/contextinfo"));
    if (hOP(data, "GetContextWebInformation")) {
        const info = data.GetContextWebInformation;
        info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
        return info;
    }
    else {
        return data;
    }
};

;// ./node_modules/@pnp/sp/files/types.js













/**
 * Describes a collection of File objects
 *
 */
let _Files = class _Files extends _SPCollection {
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    getByUrl(name) {
        if (/%#/.test(name)) {
            throw Error("For file names containing % or # please use web.getFileByServerRelativePath");
        }
        return File(this).concat(`('${encodePath(name)}')`);
    }
    /**
     * Adds a file using the pound percent safe methods
     *
     * @param url Encoded url of the file
     * @param content The file content
     * @param parameters Additional parameters to control method behavior
     */
    async addUsingPath(url, content, parameters = { Overwrite: false }) {
        const path = [`AddUsingPath(decodedurl='${encodePath(url)}'`];
        if (parameters) {
            if (parameters.Overwrite) {
                path.push(",Overwrite=true");
            }
            if (parameters.EnsureUniqueFileName) {
                path.push(`,EnsureUniqueFileName=${parameters.EnsureUniqueFileName}`);
            }
            if (parameters.AutoCheckoutOnInvalidData) {
                path.push(",AutoCheckoutOnInvalidData=true");
            }
            if (!stringIsNullOrEmpty(parameters.XorHash)) {
                path.push(`,XorHash=${encodePath(parameters.XorHash)}`);
            }
        }
        path.push(")");
        return spPost(Files(this, path.join("")), { body: content });
    }
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The Blob file content to add
     * @param props Set of optional values that control the behavior of the underlying addUsingPath and chunkedUpload feature
     * @returns The new File and the raw response.
     */
    async addChunked(url, content, props) {
        // add an empty stub
        const response = await this.addUsingPath(url, null, props);
        const file = fileFromServerRelativePath(this, response.ServerRelativeUrl);
        file.using(CancelAction(() => {
            return File(file).delete();
        }));
        return file.setContentChunked(content, props);
    }
    /**
     * Adds a ghosted file to an existing list or document library. Not supported for batching.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    async addTemplateFile(fileUrl, templateFileType) {
        return spPost(Files(this, `addTemplateFile(urloffile='${encodePath(fileUrl)}',templatefiletype=${templateFileType})`));
    }
};
__decorate([
    cancelableScope
], _Files.prototype, "addUsingPath", null);
__decorate([
    cancelableScope
], _Files.prototype, "addChunked", null);
__decorate([
    cancelableScope
], _Files.prototype, "addTemplateFile", null);
_Files = __decorate([
    defaultPath("files")
], _Files);

const Files = spInvokableFactory(_Files);
/**
 * Describes a single File instance
 *
 */
class _File extends ReadableFile {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
    /**
     * Gets a value that specifies the list item field values for the list item corresponding to the file.
     *
     */
    get listItemAllFields() {
        return SPInstance(this, "listItemAllFields");
    }
    /**
     * Gets a collection of versions
     *
     */
    get versions() {
        return Versions(this);
    }
    /**
     * Gets the current locked by user
     *
     */
    async getLockedByUser() {
        const u = await spGet(File(this, "lockedByUser"));
        if (u["odata.null"] === true) {
            return null;
        }
        else {
            return u;
        }
    }
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    approve(comment = "") {
        return spPost(File(this, `approve(comment='${encodePath(comment)}')`));
    }
    /**
     * Stops the chunk upload session without saving the uploaded data. Does not support batching.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    cancelUpload(uploadId) {
        return spPost(File(this, `cancelUpload(uploadId=guid'${uploadId}')`));
    }
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    checkin(comment = "", checkinType = CheckinType.Major) {
        if (comment.length > 1023) {
            throw Error("The maximum comment length is 1023 characters.");
        }
        return spPost(File(this, `checkin(comment=@a2,checkintype=@a3)?@a2=${encodeURIComponent(`'${comment.replace(/'/g, "''")}'`)}&@a3=${checkinType}`));
    }
    /**
     * Checks out the file from a document library.
     */
    checkout() {
        return spPost(File(this, "checkout"));
    }
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    copyTo(url, shouldOverWrite = true) {
        return spPost(File(this, `copyTo(strnewurl='${encodePath(url)}',boverwrite=${shouldOverWrite})`));
    }
    async copyByPath(destUrl, ...rest) {
        let options = {
            ShouldBypassSharedLocks: true,
            ResetAuthorAndCreatedOnCopy: true,
            KeepBoth: false,
        };
        if (rest.length === 2) {
            if (typeof rest[1] === "boolean") {
                options.KeepBoth = rest[1];
            }
            else if (typeof rest[1] === "object") {
                options = { ...options, ...rest[1] };
            }
        }
        return this.moveCopyImpl(destUrl, options, rest[0], "CopyFileByPath");
    }
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    deny(comment = "") {
        if (comment.length > 1023) {
            throw Error("The maximum comment length is 1023 characters.");
        }
        return spPost(File(this, `deny(comment='${encodePath(comment)}')`));
    }
    async moveByPath(destUrl, ...rest) {
        let options = {
            KeepBoth: false,
            ShouldBypassSharedLocks: true,
            RetainEditorAndModifiedOnMove: false,
        };
        if (rest.length === 2) {
            if (typeof rest[1] === "boolean") {
                options.KeepBoth = rest[1];
            }
            else if (typeof rest[1] === "object") {
                options = { ...options, ...rest[1] };
            }
        }
        return this.moveCopyImpl(destUrl, options, rest[0], "MoveFileByPath");
    }
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    publish(comment = "") {
        if (comment.length > 1023) {
            throw Error("The maximum comment length is 1023 characters.");
        }
        return spPost(File(this, `publish(comment='${encodePath(comment)}')`));
    }
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    recycle() {
        return spPost(File(this, "recycle"));
    }
    /**
     * Deletes the file object with options.
     *
     * @param parameters Specifies the options to use when deleting a file.
     */
    async deleteWithParams(parameters) {
        return spPost(File(this, "DeleteWithParameters"), body({ parameters }));
    }
    /**
     * Reverts an existing checkout for the file.
     *
     */
    undoCheckout() {
        return spPost(File(this, "undoCheckout"));
    }
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    unpublish(comment = "") {
        if (comment.length > 1023) {
            throw Error("The maximum comment length is 1023 characters.");
        }
        return spPost(File(this, `unpublish(comment='${encodePath(comment)}')`));
    }
    /**
     * Checks to see if the file represented by this object exists
     *
     */
    async exists() {
        try {
            const r = await File(this).select("Exists")();
            return r.Exists;
        }
        catch (e) {
            // this treats any error here as the file not existing, which
            // might not be true, but is good enough.
            return false;
        }
    }
    /**
     * Sets the content of a file, for large files use setContentChunked. Not supported in batching.
     *
     * @param content The file content
     *
     */
    async setContent(content) {
        await spPost(File(this, "$value"), {
            body: content,
            headers: {
                "X-HTTP-Method": "PUT",
            },
        });
        return File(this);
    }
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    async getItem(...selects) {
        const q = this.listItemAllFields;
        const d = await q.select(...selects)();
        return Object.assign(Item([this, odataUrlFrom(d)]), d);
    }
    /**
     * Sets the contents of a file using a chunked upload approach. Not supported in batching.
     *
     * @param file The file to upload
     * @param progress A callback function which can be used to track the progress of the upload
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     */
    async setContentChunked(file, props) {
        const { progress, chunkSize = 10485760 } = applyChunckedOperationDefaults(props);
        const uploadId = getGUID();
        let first = true;
        let chunk;
        let offset = 0;
        const fileRef = File(this).using(CancelAction(() => {
            return File(fileRef).cancelUpload(uploadId);
        }));
        const contentStream = sourceToReadableStream(file);
        const reader = contentStream.getReader();
        let buffer = new Uint8Array();
        while ((chunk = await reader.read())) {
            if (chunk.value) {
                const newBuffer = new Uint8Array(buffer.length + chunk.value.length);
                newBuffer.set(buffer);
                newBuffer.set(chunk.value, buffer.length);
                buffer = newBuffer;
            }
            while (buffer.length >= chunkSize) {
                const chunkToUpload = buffer.slice(0, chunkSize);
                buffer = buffer.slice(chunkSize);
                if (first) {
                    progress({ offset, stage: "starting", uploadId });
                    offset = await spPost(File(fileRef, `startUpload(uploadId=guid'${uploadId}')`), { body: chunkToUpload });
                    first = false;
                }
                else {
                    progress({ offset, stage: "continue", uploadId });
                    offset = await spPost(File(fileRef, `continueUpload(uploadId=guid'${uploadId}',fileOffset=${offset})`), { body: chunkToUpload });
                }
            }
            if (chunk.done) {
                if (first) {
                    // Small file: not enough data to trigger a chunk upload
                    progress({ offset, stage: "starting", uploadId });
                    offset = await spPost(File(fileRef, `startUpload(uploadId=guid'${uploadId}')`), { body: buffer });
                    first = false;
                    buffer = new Uint8Array(); // reset buffer on small file upload, so we don't duplicate the buffer on finishUpload. Issue #3278
                }
                progress({ offset, stage: "finishing", uploadId });
                return spPost(File(fileRef, `finishUpload(uploadId=guid'${uploadId}',fileOffset=${offset})`), { body: buffer.length ? buffer : "" });
            }
        }
    }
    moveCopyImpl(destUrl, options, overwrite, methodName) {
        // create a timeline we will manipulate for this request
        const poster = File(this);
        // add our pre-request actions, this fixes issues with batching hanging #2668
        poster.on.pre(timeline_noInherit(async (url, init, result) => {
            const { ServerRelativeUrl: srcUrl, ["odata.id"]: absoluteUrl } = await File(this).using(BatchNever()).select("ServerRelativeUrl")();
            const webBaseUrl = new URL(extractWebUrl(absoluteUrl));
            url = combine(webBaseUrl.toString(), `/_api/SP.MoveCopyUtil.${methodName}(overwrite=@a1)?@a1=${overwrite}`);
            init = body({
                destPath: toResourcePath(isUrlAbsolute(destUrl) ? destUrl : `${webBaseUrl.protocol}//${webBaseUrl.host}${destUrl}`),
                options,
                srcPath: toResourcePath(isUrlAbsolute(srcUrl) ? srcUrl : `${webBaseUrl.protocol}//${webBaseUrl.host}${srcUrl}`),
            }, init);
            return [url, init, result];
        }));
        return spPost(poster).then(() => fileFromPath(this, destUrl));
    }
}
__decorate([
    cancelableScope
], _File.prototype, "copyByPath", null);
__decorate([
    cancelableScope
], _File.prototype, "moveByPath", null);
__decorate([
    cancelableScope
], _File.prototype, "setContentChunked", null);
const File = spInvokableFactory(_File);
/**
 * Creates an IFile instance given a base object and a server relative path
 *
 * @param base Valid SPQueryable from which the observers will be used and the web url extracted
 * @param serverRelativePath The server relative url to the file (ex: '/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
function fileFromServerRelativePath(base, serverRelativePath) {
    return File([base, extractWebUrl(base.toUrl())], `_api/web/getFileByServerRelativePath(decodedUrl='${encodePath(serverRelativePath)}')`);
}
/**
 * Creates an IFile instance given a base object and an absolute path
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath The absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
async function fileFromAbsolutePath(base, absoluteFilePath) {
    const { WebFullUrl } = await File(base).using(BatchNever()).getContextInfo(absoluteFilePath);
    const { pathname } = new URL(absoluteFilePath);
    return fileFromServerRelativePath(File([base, combine(WebFullUrl, "_api/web")]), decodeURIComponent(pathname));
}
/**
 * Creates an IFile intance given a base object and either an absolute or server relative path to a file
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath server relative or absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/file.txt' or '/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
async function fileFromPath(base, path) {
    return (isUrlAbsolute(path) ? fileFromAbsolutePath : fileFromServerRelativePath)(base, path);
}
/**
 * Describes a collection of Version objects
 *
 */
let _Versions = class _Versions extends _SPCollection {
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId) {
        return Version(this).concat(`(${versionId})`);
    }
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    deleteAll() {
        return spPost(Versions(this, "deleteAll"));
    }
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    deleteById(versionId) {
        return spPost(Versions(this, `deleteById(vid=${versionId})`));
    }
    /**
     * Recycles the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    recycleByID(versionId) {
        return spPost(Versions(this, `recycleByID(vid=${versionId})`));
    }
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    deleteByLabel(label) {
        return spPost(Versions(this, `deleteByLabel(versionlabel='${encodePath(label)}')`));
    }
    /**
     * Recycles the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    recycleByLabel(label) {
        return spPost(Versions(this, `recycleByLabel(versionlabel='${encodePath(label)}')`));
    }
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    restoreByLabel(label) {
        return spPost(Versions(this, `restoreByLabel(versionlabel='${encodePath(label)}')`));
    }
};
_Versions = __decorate([
    defaultPath("versions")
], _Versions);

const Versions = spInvokableFactory(_Versions);
/**
 * Describes a single Version instance
 *
 */
class _Version extends ReadableFile {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
}
const Version = spInvokableFactory(_Version);
/**
 * Types for document check in.
 * Minor = 0
 * Major = 1
 * Overwrite = 2
 */
var CheckinType;
(function (CheckinType) {
    CheckinType[CheckinType["Minor"] = 0] = "Minor";
    CheckinType[CheckinType["Major"] = 1] = "Major";
    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
})(CheckinType || (CheckinType = {}));
/**
 * File move opertions
 */
var MoveOperations;
(function (MoveOperations) {
    /**
     * Produce an error if a file with the same name exists in the destination
     */
    MoveOperations[MoveOperations["None"] = 0] = "None";
    /**
     * Overwrite a file with the same name if it exists. Value is 1.
     */
    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
    /**
     * Complete the move operation even if supporting files are separated from the file. Value is 8.
     */
    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
    /**
     * Boolean specifying whether to retain the source of the move's editor and modified by datetime.
     */
    MoveOperations[MoveOperations["RetainEditorAndModifiedOnMove"] = 2048] = "RetainEditorAndModifiedOnMove";
})(MoveOperations || (MoveOperations = {}));
var TemplateFileType;
(function (TemplateFileType) {
    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
    TemplateFileType[TemplateFileType["ClientSidePage"] = 3] = "ClientSidePage";
})(TemplateFileType || (TemplateFileType = {}));
function applyChunckedOperationDefaults(props) {
    return {
        progress: () => null,
        ...props,
    };
}
/**
 * Converts the source into a ReadableStream we can understand
 */
function sourceToReadableStream(source) {
    if (isBlob(source)) {
        return source.stream();
    }
    else if (hasOn(source)) {
        // we probably have a passthrough stream from NodeFetch or some other type that supports "on(data)"
        return new ReadableStream({
            start(controller) {
                source.on("data", (chunk) => {
                    controller.enqueue(chunk);
                });
                source.on("end", () => {
                    controller.close();
                });
            },
        });
    }
    else if (isBuffer(source)) {
        // we think we have a buffer
        return new ReadableStream({
            start(controller) {
                controller.enqueue(source);
                controller.close();
            },
        });
    }
    else if (isTransform(source)) {
        return source.readable;
    }
    else {
        return source;
    }
}
const NAME = Symbol.toStringTag;
function hasOn(object) {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return typeof object["on"] === "function";
}
// FROM: node-fetch source code
function isBlob(object) {
    return typeof object === "object" &&
        typeof object.arrayBuffer === "function" &&
        typeof object.type === "string" &&
        typeof object.stream === "function" &&
        typeof object.constructor === "function" &&
        (/^(Blob|File)$/.test(object[NAME]) ||
            /^(Blob|File)$/.test(object.constructor.name));
}
function isBuffer(object) {
    return typeof object === "object" && typeof object.length === "number";
}
function isTransform(object) {
    return typeof object === "object" && typeof object.readable === "object";
}

;// ./node_modules/@pnp/sp/files/web.js



_Web.prototype.getFileByServerRelativePath = function (fileRelativeUrl) {
    return fileFromServerRelativePath(this, fileRelativeUrl);
};
_Web.prototype.getFileById = function (uniqueId) {
    return File(this, `getFileById('${uniqueId}')`);
};
_Web.prototype.getFileByUrl = function (fileUrl) {
    return File(this, `getFileByUrl('${encodePath("!@p1::" + fileUrl)}')`);
};

;// ./node_modules/@pnp/sp/comments/types.js





let _Comments = class _Comments extends _SPCollection {
    /**
     * Adds a new comment to this collection
     *
     * @param info Comment information to add
     */
    async add(info) {
        if (typeof info === "string") {
            info = { text: info };
        }
        const d = await spPost(Comments(this, null), body(info));
        return Object.assign(this.getById(d.id), d);
    }
    /**
     * Gets a comment by id
     *
     * @param id Id of the comment to load
     */
    getById(id) {
        return Comment(this).concat(`(${id})`);
    }
    /**
     * Deletes all the comments in this collection
     */
    clear() {
        return spPost(Comments(this, "DeleteAll"));
    }
};
_Comments = __decorate([
    defaultPath("comments")
], _Comments);

const Comments = spInvokableFactory(_Comments);
class _Comment extends _SPInstance {
    /**
     * A comment's replies
     */
    get replies() {
        return Replies(this);
    }
    /**
     * Likes the comment as the current user
     */
    like() {
        return spPost(Comment(this, "Like"));
    }
    /**
     * Unlikes the comment as the current user
     */
    unlike() {
        return spPost(Comment(this, "Unlike"));
    }
    /**
     * Deletes this comment
     */
    delete() {
        return spDelete(this);
    }
}
const Comment = spInvokableFactory(_Comment);
let _Replies = class _Replies extends _SPCollection {
    /**
     * Adds a new reply to this collection
     *
     * @param info Comment information to add
     */
    async add(info) {
        if (typeof info === "string") {
            info = { text: info };
        }
        const d = await spPost(Replies(this, null), body(info));
        return Object.assign(Comment([this, odataUrlFrom(d)]), d);
    }
};
_Replies = __decorate([
    defaultPath("replies")
], _Replies);

const Replies = spInvokableFactory(_Replies);

;// ./node_modules/@pnp/sp/comments/item.js






addProp(_Item, "comments", Comments);
_Item.prototype.getLikedBy = function () {
    return spPost(Item(this, "likedBy"));
};
_Item.prototype.like = async function () {
    const itemInfo = await this.getParentInfos();
    const baseUrl = extractWebUrl(this.toUrl());
    const reputationUrl = "_api/Microsoft.Office.Server.ReputationModel.Reputation.SetLike(listID=@a1,itemID=@a2,like=@a3)";
    const likeUrl = combine(baseUrl, reputationUrl) + `?@a1='{${itemInfo.ParentList.Id}}'&@a2='${itemInfo.Item.Id}'&@a3=true`;
    return spPost(SPQueryable([this, likeUrl]));
};
_Item.prototype.unlike = async function () {
    const itemInfo = await this.getParentInfos();
    const baseUrl = extractWebUrl(this.toUrl());
    const reputationUrl = "_api/Microsoft.Office.Server.ReputationModel.Reputation.SetLike(listID=@a1,itemID=@a2,like=@a3)";
    const likeUrl = combine(baseUrl, reputationUrl) + `?@a1='{${itemInfo.ParentList.Id}}'&@a2='${itemInfo.Item.Id}'&@a3=false`;
    return spPost(SPQueryable([this, likeUrl]));
};
/**
* @deprecated This method is deprecated as this navigation property does not work in the Microsoft SharePoint REST API.
*/
_Item.prototype.getLikedByInformation = function () {
    return Item(this, "likedByInformation").expand("likedby")();
};
_Item.prototype.rate = async function (value) {
    const itemInfo = await this.getParentInfos();
    const baseUrl = extractWebUrl(this.toUrl());
    const reputationUrl = "_api/Microsoft.Office.Server.ReputationModel.Reputation.SetRating(listID=@a1,itemID=@a2,rating=@a3)";
    const rateUrl = combine(baseUrl, reputationUrl) + `?@a1='{${itemInfo.ParentList.Id}}'&@a2='${itemInfo.Item.Id}'&@a3=${value}`;
    return spPost(SPQueryable([this, rateUrl]));
};

;// ./node_modules/@pnp/sp/clientside-pages/types.js













/**
 * Page promotion state
 */
var PromotedState;
(function (PromotedState) {
    /**
     * Regular client side page
     */
    PromotedState[PromotedState["NotPromoted"] = 0] = "NotPromoted";
    /**
     * Page that will be promoted as news article after publishing
     */
    PromotedState[PromotedState["PromoteOnPublish"] = 1] = "PromoteOnPublish";
    /**
     * Page that is promoted as news article
     */
    PromotedState[PromotedState["Promoted"] = 2] = "Promoted";
})(PromotedState || (PromotedState = {}));
/**
 * Represents the data and methods associated with client side "modern" pages
 */
class _ClientsidePage extends _SPQueryable {
    /**
     * PLEASE DON'T USE THIS CONSTRUCTOR DIRECTLY, thank you 🐇
     */
    constructor(base, path, json, noInit = false, sections = [], commentsDisabled = false) {
        super(base, path);
        this.json = json;
        this.sections = sections;
        this.commentsDisabled = commentsDisabled;
        this._bannerImageDirty = false;
        this._bannerImageThumbnailUrlDirty = false;
        this.parentUrl = "";
        // we need to rebase the url to always be the web url plus the path
        // Queryable handles the correct parsing of the SPInit, and we pull
        // the weburl and combine with the supplied path, which is unique
        // to how ClientsitePages works. This class is a special case.
        this._url = combine(extractWebUrl(this._url), path);
        // set a default page settings slice
        this._pageSettings = { controlType: 0, pageSettingsSlice: { isDefaultDescription: true, isDefaultThumbnail: true } };
        // set a default layout part
        this._layoutPart = _ClientsidePage.getDefaultLayoutPart();
        if (typeof json !== "undefined" && !noInit) {
            this.fromJSON(json);
        }
    }
    static getDefaultLayoutPart() {
        return {
            dataVersion: "1.4",
            description: "Title Region Description",
            id: "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",
            instanceId: "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",
            properties: {
                authorByline: [],
                authors: [],
                layoutType: "FullWidthImage",
                showPublishDate: false,
                showTopicHeader: false,
                textAlignment: "Left",
                title: "",
                topicHeader: "",
                enableGradientEffect: true,
            },
            reservedHeight: 280,
            serverProcessedContent: { htmlStrings: {}, searchablePlainTexts: {}, imageSources: {}, links: {} },
            title: "Title area",
        };
    }
    get pageLayout() {
        return this.json.PageLayoutType;
    }
    set pageLayout(value) {
        this.json.PageLayoutType = value;
    }
    get bannerImageUrl() {
        return this.json.BannerImageUrl;
    }
    set bannerImageUrl(value) {
        this.setBannerImage(value);
    }
    get thumbnailUrl() {
        return this._pageSettings.pageSettingsSlice.isDefaultThumbnail ? this.json.BannerImageUrl : this.json.BannerThumbnailUrl;
    }
    set thumbnailUrl(value) {
        this.json.BannerThumbnailUrl = value;
        this._bannerImageThumbnailUrlDirty = true;
        this._pageSettings.pageSettingsSlice.isDefaultThumbnail = false;
    }
    get topicHeader() {
        return util_objectDefinedNotNull(this.json.TopicHeader) ? this.json.TopicHeader : "";
    }
    set topicHeader(value) {
        this.json.TopicHeader = value;
        this._layoutPart.properties.topicHeader = value;
        if (stringIsNullOrEmpty(value)) {
            this.showTopicHeader = false;
        }
    }
    get title() {
        return this.json.Title;
    }
    set title(value) {
        this.json.Title = value;
        this._layoutPart.properties.title = value;
    }
    get reservedHeight() {
        return this._layoutPart.reservedHeight;
    }
    set reservedHeight(value) {
        this._layoutPart.reservedHeight = value;
    }
    get description() {
        return this.json.Description;
    }
    set description(value) {
        if (!stringIsNullOrEmpty(value) && value.length > 255) {
            throw Error("Modern Page description is limited to 255 chars.");
        }
        this.json.Description = value;
        if (!hOP(this._pageSettings, "htmlAttributes")) {
            this._pageSettings.htmlAttributes = [];
        }
        if (this._pageSettings.htmlAttributes.indexOf("modifiedDescription") < 0) {
            this._pageSettings.htmlAttributes.push("modifiedDescription");
        }
        this._pageSettings.pageSettingsSlice.isDefaultDescription = false;
    }
    get layoutType() {
        return this._layoutPart.properties.layoutType;
    }
    set layoutType(value) {
        this._layoutPart.properties.layoutType = value;
    }
    get headerTextAlignment() {
        return this._layoutPart.properties.textAlignment;
    }
    set headerTextAlignment(value) {
        this._layoutPart.properties.textAlignment = value;
    }
    get showTopicHeader() {
        return this._layoutPart.properties.showTopicHeader;
    }
    set showTopicHeader(value) {
        this._layoutPart.properties.showTopicHeader = value;
    }
    get showPublishDate() {
        return this._layoutPart.properties.showPublishDate;
    }
    set showPublishDate(value) {
        this._layoutPart.properties.showPublishDate = value;
    }
    get hasVerticalSection() {
        return this.sections.findIndex(s => s.layoutIndex === 2) > -1;
    }
    get authorByLine() {
        if (util_isArray(this._layoutPart.properties.authorByline) && this._layoutPart.properties.authorByline.length > 0) {
            return this._layoutPart.properties.authorByline[0];
        }
        return null;
    }
    get verticalSection() {
        if (this.hasVerticalSection) {
            return this.addVerticalSection();
        }
        return null;
    }
    /**
     * Add a section to this page
     */
    addSection() {
        const section = new CanvasSection(this, getNextOrder(this.sections), 1);
        this.sections.push(section);
        return section;
    }
    /**
     * Add a section to this page
     */
    addVerticalSection() {
        // we can only have one vertical section so we find it if it exists
        const sectionIndex = this.sections.findIndex(s => s.layoutIndex === 2);
        if (sectionIndex > -1) {
            return this.sections[sectionIndex];
        }
        const section = new CanvasSection(this, getNextOrder(this.sections), 2);
        this.sections.push(section);
        return section;
    }
    /**
     * Loads this instance from the appropriate JSON data
     *
     * @param pageData JSON data to load (replaces any existing data)
     */
    fromJSON(pageData) {
        this.json = pageData;
        const canvasControls = JSON.parse(pageData.CanvasContent1);
        const layouts = JSON.parse(pageData.LayoutWebpartsContent);
        if (layouts && layouts.length > 0) {
            this._layoutPart = layouts[0];
        }
        this.setControls(canvasControls);
        return this;
    }
    /**
     * Loads this page's content from the server
     */
    async load() {
        const item = await this.getItem("Id", "CommentsDisabled");
        const pageData = await SPQueryable(this, `_api/sitepages/pages(${item.Id})`)();
        this.commentsDisabled = item.CommentsDisabled;
        return this.fromJSON(pageData);
    }
    /**
     * Persists the content changes (sections, columns, and controls) [does not work with batching]
     *
     * @param publish If true the page is published, if false the changes are persisted to SharePoint but not published [Default: true]
     */
    async save(publish = true) {
        if (this.json.Id === null) {
            throw Error("The id for this page is null. If you want to create a new page, please use ClientSidePage.Create");
        }
        const previewPartialUrl = "_layouts/15/getpreview.ashx";
        // If new banner image, and banner image url is not in getpreview.ashx format
        if (this._bannerImageDirty && !this.bannerImageUrl.includes(previewPartialUrl)) {
            const serverRelativePath = this.bannerImageUrl;
            let imgInfo;
            let webUrl;
            const web = Web(this);
            const [batch, execute] = createBatch(web);
            web.using(batch);
            web.getFileByServerRelativePath(serverRelativePath.replace(/%20/ig, " "))
                .select("ListId", "WebId", "UniqueId", "Name", "SiteId")().then(r1 => imgInfo = r1);
            web.select("Url")().then(r2 => webUrl = r2.Url);
            // we know the .then calls above will run before execute resolves, ensuring the vars are set
            await execute();
            const f = SPQueryable(webUrl, previewPartialUrl);
            f.query.set("guidSite", `${imgInfo.SiteId}`);
            f.query.set("guidWeb", `${imgInfo.WebId}`);
            f.query.set("guidFile", `${imgInfo.UniqueId}`);
            this.bannerImageUrl = f.toRequestUrl();
            if (!util_objectDefinedNotNull(this._layoutPart.serverProcessedContent)) {
                this._layoutPart.serverProcessedContent = {};
            }
            this._layoutPart.serverProcessedContent.imageSources = { imageSource: serverRelativePath };
            if (!util_objectDefinedNotNull(this._layoutPart.serverProcessedContent.customMetadata)) {
                this._layoutPart.serverProcessedContent.customMetadata = {};
            }
            this._layoutPart.serverProcessedContent.customMetadata.imageSource = {
                listId: imgInfo.ListId,
                siteId: imgInfo.SiteId,
                uniqueId: imgInfo.UniqueId,
                webId: imgInfo.WebId,
            };
            this._layoutPart.properties.webId = imgInfo.WebId;
            this._layoutPart.properties.siteId = imgInfo.SiteId;
            this._layoutPart.properties.listId = imgInfo.ListId;
            this._layoutPart.properties.uniqueId = imgInfo.UniqueId;
        }
        // we try and check out the page for the user
        if (!this.json.IsPageCheckedOutToCurrentUser) {
            await spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/checkoutpage`));
        }
        // create the body for the save request
        let saveBody = {
            AuthorByline: this.json.AuthorByline || [],
            CanvasContent1: this.getCanvasContent1(),
            Description: this.description,
            LayoutWebpartsContent: this.getLayoutWebpartsContent(),
            Title: this.title,
            TopicHeader: this.topicHeader,
            BannerImageUrl: this.bannerImageUrl,
        };
        if (this._bannerImageDirty || this._bannerImageThumbnailUrlDirty) {
            const bannerImageUrlValue = this._bannerImageThumbnailUrlDirty ? this.thumbnailUrl : this.bannerImageUrl;
            saveBody = {
                BannerImageUrl: bannerImageUrlValue,
                ...saveBody,
            };
        }
        const updater = ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/savepage`);
        await spPost(updater, headers({ "if-match": "*" }, body(saveBody)));
        let r = true;
        if (publish) {
            r = await spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/publish`));
            if (r) {
                this.json.IsPageCheckedOutToCurrentUser = false;
            }
        }
        this._bannerImageDirty = false;
        this._bannerImageThumbnailUrlDirty = false;
        // we need to ensure we reload from the latest data to ensure all urls are updated and current in the object (expecially for new pages)
        await this.load();
        return r;
    }
    /**
     * Discards the checkout of this page
     */
    async discardPageCheckout() {
        if (this.json.Id === null) {
            throw Error("The id for this page is null. If you want to create a new page, please use ClientSidePage.Create");
        }
        const d = await spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/discardPage`));
        this.fromJSON(d);
    }
    /**
     * Promotes this page as a news item
     */
    async promoteToNews() {
        return this.promoteNewsImpl("promoteToNews");
    }
    // API is currently broken on server side
    // public async demoteFromNews(): Promise<boolean> {
    //     return this.promoteNewsImpl("demoteFromNews");
    // }
    /**
     * Finds a control by the specified instance id
     *
     * @param id Instance id of the control to find
     */
    findControlById(id) {
        return this.findControl((c) => c.id === id);
    }
    /**
     * Finds a control within this page's control tree using the supplied predicate
     *
     * @param predicate Takes a control and returns true or false, if true that control is returned by findControl
     */
    findControl(predicate) {
        // check all sections
        for (let i = 0; i < this.sections.length; i++) {
            // check all columns
            for (let j = 0; j < this.sections[i].columns.length; j++) {
                // check all controls
                for (let k = 0; k < this.sections[i].columns[j].controls.length; k++) {
                    // check to see if the predicate likes this control
                    if (predicate(this.sections[i].columns[j].controls[k])) {
                        return this.sections[i].columns[j].controls[k];
                    }
                }
            }
        }
        // we found nothing so give nothing back
        return null;
    }
    /**
     * Creates a new page with all of the content copied from this page
     *
     * @param web The web where we will create the copy
     * @param pageName The file name of the new page
     * @param title The title of the new page
     * @param publish If true the page will be published (Default: true)
     */
    async copy(web, pageName, title, publish = true, promotedState) {
        const page = await CreateClientsidePage(web, pageName, title, this.pageLayout, promotedState);
        return this.copyTo(page, publish);
    }
    /**
     * Copies the content from this page to the supplied page instance NOTE: fully overwriting any previous content!!
     *
     * @param page Page whose content we replace with this page's content
     * @param publish If true the page will be published after the copy, if false it will be saved but left unpublished (Default: true)
     */
    async copyTo(page, publish = true) {
        // we know the method is on the class - but it is protected so not part of the interface
        page.setControls(this.getControls());
        // copy page properties
        if (this._layoutPart.properties) {
            if (hOP(this._layoutPart.properties, "topicHeader")) {
                page.topicHeader = this._layoutPart.properties.topicHeader;
            }
            if (hOP(this._layoutPart.properties, "imageSourceType")) {
                page._layoutPart.properties.imageSourceType = this._layoutPart.properties.imageSourceType;
            }
            if (hOP(this._layoutPart.properties, "layoutType")) {
                page._layoutPart.properties.layoutType = this._layoutPart.properties.layoutType;
            }
            if (hOP(this._layoutPart.properties, "textAlignment")) {
                page._layoutPart.properties.textAlignment = this._layoutPart.properties.textAlignment;
            }
            if (hOP(this._layoutPart.properties, "showTopicHeader")) {
                page._layoutPart.properties.showTopicHeader = this._layoutPart.properties.showTopicHeader;
            }
            if (hOP(this._layoutPart.properties, "showPublishDate")) {
                page._layoutPart.properties.showPublishDate = this._layoutPart.properties.showPublishDate;
            }
            if (hOP(this._layoutPart.properties, "enableGradientEffect")) {
                page._layoutPart.properties.enableGradientEffect = this._layoutPart.properties.enableGradientEffect;
            }
        }
        // we need to do some work to set the banner image url in the copied page
        if (!stringIsNullOrEmpty(this.json.BannerImageUrl)) {
            // use a URL to parse things for us
            const url = new URL(this.json.BannerImageUrl);
            // helper function to translate the guid strings into properly formatted guids with dashes
            const makeGuid = (s) => s.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/g, "$1-$2-$3-$4-$5");
            // protect against errors because the serverside impl has changed, we'll just skip
            if (url.searchParams.has("guidSite") && url.searchParams.has("guidWeb") && url.searchParams.has("guidFile")) {
                const guidSite = makeGuid(url.searchParams.get("guidSite"));
                const guidWeb = makeGuid(url.searchParams.get("guidWeb"));
                const guidFile = makeGuid(url.searchParams.get("guidFile"));
                const site = Site(this);
                const id = await site.select("Id")();
                // the site guid must match the current site's guid or we are unable to set the image
                if (id.Id === guidSite) {
                    const openWeb = await site.openWebById(guidWeb);
                    const file = await openWeb.web.getFileById(guidFile).select("ServerRelativeUrl")();
                    const props = {};
                    if (this._layoutPart.properties) {
                        if (hOP(this._layoutPart.properties, "translateX")) {
                            props.translateX = this._layoutPart.properties.translateX;
                        }
                        if (hOP(this._layoutPart.properties, "translateY")) {
                            props.translateY = this._layoutPart.properties.translateY;
                        }
                        if (hOP(this._layoutPart.properties, "imageSourceType")) {
                            props.imageSourceType = this._layoutPart.properties.imageSourceType;
                        }
                        if (hOP(this._layoutPart.properties, "altText")) {
                            props.altText = this._layoutPart.properties.altText;
                        }
                    }
                    page.setBannerImage(file.ServerRelativeUrl, props);
                }
            }
        }
        await page.save(publish);
        return page;
    }
    /**
     * Sets the modern page banner image
     *
     * @param url Url of the image to display
     * @param altText Alt text to describe the image
     * @param bannerProps Additional properties to control display of the banner
     */
    setBannerImage(url, props) {
        if (isUrlAbsolute(url)) {
            // do our best to make this a server relative url by removing the x.sharepoint.com part
            url = url.replace(/^https?:\/\/[a-z0-9.]*?\.[a-z]{2,3}\//i, "/");
        }
        this.json.BannerImageUrl = url;
        // update serverProcessedContent (page behavior change 2021-Oct-13)
        this._layoutPart.serverProcessedContent = { imageSources: { imageSource: url } };
        this._bannerImageDirty = true;
        /*
            setting the banner image resets the thumbnail image (matching UI functionality)
            but if the thumbnail is dirty they are likely trying to set them both to
            different values, so we allow that here.
            Also allows the banner image to be updated safely with the calculated one in save()
        */
        if (!this._bannerImageThumbnailUrlDirty) {
            this.thumbnailUrl = url;
            this._pageSettings.pageSettingsSlice.isDefaultThumbnail = true;
        }
        // this seems to always be true, so default
        this._layoutPart.properties.imageSourceType = 2;
        if (util_objectDefinedNotNull(props)) {
            if (hOP(props, "translateX")) {
                this._layoutPart.properties.translateX = props.translateX;
            }
            if (hOP(props, "translateY")) {
                this._layoutPart.properties.translateY = props.translateY;
            }
            if (hOP(props, "imageSourceType")) {
                this._layoutPart.properties.imageSourceType = props.imageSourceType;
            }
            if (hOP(props, "altText")) {
                this._layoutPart.properties.altText = props.altText;
            }
        }
    }
    /**
     * Sets the banner image url from an external source. You must call save to persist the changes
     *
     * @param url absolute url of the external file
     * @param props optional set of properties to control display of the banner image
     */
    async setBannerImageFromExternalUrl(url, props) {
        // validate and parse our input url
        const fileUrl = new URL(url);
        // get our page name without extension, used as a folder name when creating the file
        const pageName = this.json.FileName.replace(/\.[^/.]+$/, "");
        // get the filename we will use
        const filename = fileUrl.pathname.split(/[\\/]/i).pop();
        const request = ClientsidePage(this, "_api/sitepages/AddImageFromExternalUrl");
        request.query.set("imageFileName", `'${filename}'`);
        request.query.set("pageName", `'${pageName}'`);
        request.query.set("externalUrl", `'${url}'`);
        request.select("ServerRelativeUrl");
        const result = await spPost(request);
        // set with the newly created relative url
        this.setBannerImage(result.ServerRelativeUrl, props);
    }
    /**
     * Sets the authors for this page from the supplied list of user integer ids
     *
     * @param authorId The integer id of the user to set as the author
     */
    async setAuthorById(authorId) {
        const userLoginData = await SPCollection([this, extractWebUrl(this.toUrl())], "/_api/web/siteusers")
            .filter(`Id eq ${authorId}`)
            .select("LoginName")();
        if (userLoginData.length < 1) {
            throw Error(`Could not find user with id ${authorId}.`);
        }
        return this.setAuthorByLoginName(userLoginData[0].LoginName);
    }
    /**
     * Sets the authors for this page from the supplied list of user integer ids
     *
     * @param authorLoginName The login name of the user (ex: i:0#.f|membership|name@tenant.com)
     */
    async setAuthorByLoginName(authorLoginName) {
        const userLoginData = await SPCollection([this, extractWebUrl(this.toUrl())], "/_api/web/siteusers")
            .filter(`LoginName eq '${authorLoginName}'`)
            .select("UserPrincipalName", "Title")();
        if (userLoginData.length < 1) {
            throw Error(`Could not find user with login name '${authorLoginName}'.`);
        }
        this.json.AuthorByline = [userLoginData[0].UserPrincipalName];
        this._layoutPart.properties.authorByline = [userLoginData[0].UserPrincipalName];
        this._layoutPart.properties.authors = [{
                id: authorLoginName,
                name: userLoginData[0].Title,
                role: "",
                upn: userLoginData[0].UserPrincipalName,
            }];
    }
    /**
     * Gets the list item associated with this clientside page
     *
     * @param selects Specific set of fields to include when getting the item
     */
    async getItem(...selects) {
        const initer = ClientsidePage(this, "/_api/lists/EnsureClientRenderedSitePagesLibrary").select("EnableModeration", "EnableMinorVersions", "Id");
        const listData = await spPost(initer);
        const item = List([this, listData["odata.id"]]).items.getById(this.json.Id);
        const itemData = await item.select(...selects)();
        return Object.assign(Item([this, odataUrlFrom(itemData)]), itemData);
    }
    /**
         * Recycle this page
         */
    async recycle() {
        const item = await this.getItem();
        await item.recycle();
    }
    /**
     * Delete this page
     */
    async delete() {
        const item = await this.getItem();
        await item.delete();
    }
    /**
     * Schedules a page for publishing
     *
     * @param publishDate Date to publish the item
     * @returns Version which was scheduled to be published
     */
    async schedulePublish(publishDate) {
        return spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/SchedulePublish`), body({
            sitePage: { PublishStartDate: publishDate },
        }));
    }
    /**
     * Saves a copy of this page as a template in this library's Templates folder
     *
     * @param publish If true the template is published, false the template is not published (default: true)
     * @returns IClientsidePage instance representing the new template page
     */
    async saveAsTemplate(publish = true) {
        const data = await spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/SavePageAsTemplate`));
        const page = ClientsidePage(this, null, data);
        page.title = this.title;
        await page.save(publish);
        return page;
    }
    /**
     * Share this Page's Preview content by Email
     *
     * @param emails Set of emails to which the preview is shared
     * @param message The message to include
     * @returns void
     */
    share(emails, message) {
        return spPost(ClientsidePage(this, "_api/SP.Publishing.RichSharing/SharePageByEmail"), body({
            recipientEmails: emails,
            message,
            url: this.json.AbsoluteUrl,
        }));
    }
    getCanvasContent1() {
        return JSON.stringify(this.getControls());
    }
    getLayoutWebpartsContent() {
        if (this._layoutPart) {
            return JSON.stringify([this._layoutPart]);
        }
        else {
            return JSON.stringify(null);
        }
    }
    setControls(controls) {
        // reset the sections
        this.sections = [];
        if (controls && controls.length) {
            for (let i = 0; i < controls.length; i++) {
                // if no control type is present this is a column which we give type 0 to let us process it
                const controlType = hOP(controls[i], "controlType") ? controls[i].controlType : 0;
                switch (controlType) {
                    case 0:
                        // empty canvas column or page settings
                        if (hOP(controls[i], "pageSettingsSlice")) {
                            this._pageSettings = controls[i];
                        }
                        else {
                            // we have an empty column
                            this.mergeColumnToTree(new CanvasColumn(controls[i]));
                        }
                        break;
                    case 3: {
                        const part = new ClientsideWebpart(controls[i]);
                        this.mergePartToTree(part, part.data.position);
                        break;
                    }
                    case 4: {
                        const textData = controls[i];
                        const text = new ClientsideText(textData.innerHTML, textData);
                        this.mergePartToTree(text, text.data.position);
                        break;
                    }
                }
            }
            reindex(this.sections);
        }
    }
    getControls() {
        // reindex things
        reindex(this.sections);
        // rollup the control changes
        const canvasData = [];
        this.sections.forEach(section => {
            section.columns.forEach(column => {
                if (column.controls.length < 1) {
                    // empty column
                    canvasData.push({
                        displayMode: column.data.displayMode,
                        emphasis: this.getEmphasisObj(section.emphasis),
                        position: column.data.position,
                    });
                }
                else {
                    column.controls.forEach(control => {
                        control.data.emphasis = this.getEmphasisObj(section.emphasis);
                        canvasData.push(this.specialSaveHandling(control).data);
                    });
                }
            });
        });
        canvasData.push(this._pageSettings);
        return canvasData;
    }
    getEmphasisObj(value) {
        if (value < 1 || value > 3) {
            return {};
        }
        return { zoneEmphasis: value };
    }
    async promoteNewsImpl(method) {
        if (this.json.Id === null) {
            throw Error("The id for this page is null.");
        }
        // per bug #858 if we promote before we have ever published the last published date will
        // forever not be updated correctly in the modern news web part. Because this will affect very
        // few folks we just go ahead and publish for them here as that is likely what they intended.
        if (stringIsNullOrEmpty(this.json.VersionInfo.LastVersionCreatedBy)) {
            const lastPubData = new Date(this.json.VersionInfo.LastVersionCreated);
            // no modern page should reasonable be published before the year 2000 :)
            if (lastPubData.getFullYear() < 2000) {
                await this.save(true);
            }
        }
        return spPost(ClientsidePage(this, `_api/sitepages/pages(${this.json.Id})/${method}`));
    }
    /**
     * Merges the control into the tree of sections and columns for this page
     *
     * @param control The control to merge
     */
    mergePartToTree(control, positionData) {
        var _a, _b, _c;
        let column = null;
        let sectionFactor = 12;
        let sectionIndex = 0;
        let zoneIndex = 0;
        let layoutIndex = 1;
        // handle case where we don't have position data (shouldn't happen?)
        if (positionData) {
            if (hOP(positionData, "zoneIndex")) {
                zoneIndex = positionData.zoneIndex;
            }
            if (hOP(positionData, "sectionIndex")) {
                sectionIndex = positionData.sectionIndex;
            }
            if (hOP(positionData, "sectionFactor")) {
                sectionFactor = positionData.sectionFactor;
            }
            if (hOP(positionData, "layoutIndex")) {
                layoutIndex = positionData.layoutIndex;
            }
        }
        const zoneEmphasis = (_c = (_b = (_a = control.data) === null || _a === void 0 ? void 0 : _a.emphasis) === null || _b === void 0 ? void 0 : _b.zoneEmphasis) !== null && _c !== void 0 ? _c : 0;
        const section = this.getOrCreateSection(zoneIndex, layoutIndex, zoneEmphasis);
        const columns = section.columns.filter(c => c.order === sectionIndex);
        if (columns.length < 1) {
            column = section.addColumn(sectionFactor, layoutIndex);
        }
        else {
            column = columns[0];
        }
        control.column = column;
        column.addControl(control);
    }
    /**
     * Merges the supplied column into the tree
     *
     * @param column Column to merge
     * @param position The position data for the column
     */
    mergeColumnToTree(column) {
        var _a, _b;
        const order = hOP(column.data, "position") && hOP(column.data.position, "zoneIndex") ? column.data.position.zoneIndex : 0;
        const layoutIndex = hOP(column.data, "position") && hOP(column.data.position, "layoutIndex") ? column.data.position.layoutIndex : 1;
        const section = this.getOrCreateSection(order, layoutIndex, ((_b = (_a = column.data) === null || _a === void 0 ? void 0 : _a.emphasis) === null || _b === void 0 ? void 0 : _b.zoneEmphasis) || 0);
        column.section = section;
        section.columns.push(column);
    }
    /**
     * Handle the logic to get or create a section based on the supplied order and layoutIndex
     *
     * @param order Section order
     * @param layoutIndex Layout Index (1 === normal, 2 === vertical section)
     * @param emphasis The section emphasis
     */
    getOrCreateSection(order, layoutIndex, emphasis) {
        let section = null;
        const sections = this.sections.filter(s => s.order === order && s.layoutIndex === layoutIndex);
        if (sections.length < 1) {
            section = layoutIndex === 2 ? this.addVerticalSection() : this.addSection();
            section.order = order;
            section.emphasis = emphasis;
        }
        else {
            section = sections[0];
        }
        return section;
    }
    /**
     * Based on issue #1690 we need to take special case actions to ensure some things
     * can be saved properly without breaking existing pages.
     *
     * @param control The control we are ensuring is "ready" to be saved
     */
    specialSaveHandling(control) {
        var _a, _b, _c;
        // this is to handle the special case in issue #1690
        // must ensure that searchablePlainTexts values have < replaced with &lt; in links web part
        // For #2561 need to process for code snippet webpart and any control && (<any>control).data.webPartId === "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd"
        if (control.data.controlType === 3) {
            const texts = ((_c = (_b = (_a = control.data) === null || _a === void 0 ? void 0 : _a.webPartData) === null || _b === void 0 ? void 0 : _b.serverProcessedContent) === null || _c === void 0 ? void 0 : _c.searchablePlainTexts) || null;
            if (util_objectDefinedNotNull(texts)) {
                const keys = Object.getOwnPropertyNames(texts);
                for (let i = 0; i < keys.length; i++) {
                    texts[keys[i]] = texts[keys[i]].replace(/</ig, "&lt;");
                    control.data.webPartData.serverProcessedContent.searchablePlainTexts = texts;
                }
            }
        }
        return control;
    }
}
/**
 * Invokable factory for IClientSidePage instances
 */
const ClientsidePage = (base, path, json, noInit = false, sections = [], commentsDisabled = false) => {
    return new _ClientsidePage(base, path, json, noInit, sections, commentsDisabled);
};
/**
 * Loads a client side page from the supplied IFile instance
 *
 * @param file Source IFile instance
 */
const ClientsidePageFromFile = async (file) => {
    const item = await file.getItem();
    const page = ClientsidePage([file, extractWebUrl(file.toUrl())], "", { Id: item.Id }, true);
    return page.load();
};
/**
 * Creates a new client side page
 *
 * @param web The web or list
 * @param pageName The name of the page (filename)
 * @param title The page's title
 * @param PageLayoutType Layout to use when creating the page
 */
const CreateClientsidePage = async (web, pageName, title, PageLayoutType = "Article", promotedState = 0) => {
    // patched because previously we used the full page name with the .aspx at the end
    // this allows folk's existing code to work after the re-write to the new API
    pageName = pageName.replace(/\.aspx$/i, "");
    // initialize the page, at this point a checked-out page with a junk filename will be created.
    const pageInitData = await spPost(ClientsidePage(web, "_api/sitepages/pages"), body({
        PageLayoutType,
        PromotedState: promotedState,
    }));
    // now we can init our page with the save data
    const newPage = ClientsidePage(web, "", pageInitData);
    newPage.title = pageName;
    await newPage.save(false);
    newPage.title = title;
    return newPage;
};
class CanvasSection {
    constructor(page, order, layoutIndex, columns = [], _emphasis = 0) {
        this.page = page;
        this.columns = columns;
        this._emphasis = _emphasis;
        this._memId = getGUID();
        this._order = order;
        this._layoutIndex = layoutIndex;
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].data.position.zoneIndex = value;
        }
    }
    get layoutIndex() {
        return this._layoutIndex;
    }
    set layoutIndex(value) {
        this._layoutIndex = value;
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].data.position.layoutIndex = value;
        }
    }
    /**
     * Default column (this.columns[0]) for this section
     */
    get defaultColumn() {
        if (this.columns.length < 1) {
            this.addColumn(12);
        }
        return this.columns[0];
    }
    /**
     * Adds a new column to this section
     */
    addColumn(factor, layoutIndex = this.layoutIndex) {
        const column = new CanvasColumn();
        column.section = this;
        column.data.position.zoneIndex = this.order;
        column.data.position.layoutIndex = layoutIndex;
        column.data.position.sectionFactor = factor;
        column.order = getNextOrder(this.columns);
        this.columns.push(column);
        return column;
    }
    /**
     * Adds a control to the default column for this section
     *
     * @param control Control to add to the default column
     */
    addControl(control) {
        this.defaultColumn.addControl(control);
        return this;
    }
    get emphasis() {
        return this._emphasis;
    }
    set emphasis(value) {
        this._emphasis = value;
    }
    /**
     * Removes this section and all contained columns and controls from the collection
     */
    remove() {
        this.page.sections = this.page.sections.filter(section => section._memId !== this._memId);
        reindex(this.page.sections);
    }
}
class CanvasColumn {
    constructor(json = JSON.parse(JSON.stringify(CanvasColumn.Default)), controls = []) {
        this.json = json;
        this.controls = controls;
        this._section = null;
        this._memId = getGUID();
    }
    get data() {
        return this.json;
    }
    get section() {
        return this._section;
    }
    set section(section) {
        this._section = section;
    }
    get order() {
        return this.data.position.sectionIndex;
    }
    set order(value) {
        this.data.position.sectionIndex = value;
        for (let i = 0; i < this.controls.length; i++) {
            this.controls[i].data.position.zoneIndex = this.data.position.zoneIndex;
            this.controls[i].data.position.layoutIndex = this.data.position.layoutIndex;
            this.controls[i].data.position.sectionIndex = value;
        }
    }
    get factor() {
        return this.data.position.sectionFactor;
    }
    set factor(value) {
        this.data.position.sectionFactor = value;
    }
    addControl(control) {
        control.column = this;
        this.controls.push(control);
        return this;
    }
    getControl(index) {
        return this.controls[index];
    }
    remove() {
        this.section.columns = this.section.columns.filter(column => column._memId !== this._memId);
        reindex(this.section.columns);
    }
}
CanvasColumn.Default = {
    controlType: 0,
    displayMode: 2,
    emphasis: {},
    position: {
        layoutIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
};
class ColumnControl {
    constructor(json) {
        this.json = json;
    }
    get id() {
        return this.json.id;
    }
    get data() {
        return this.json;
    }
    get column() {
        return this._column;
    }
    set column(value) {
        this._column = value;
        this.onColumnChange(this._column);
    }
    remove() {
        this.column.controls = this.column.controls.filter(control => control.id !== this.id);
        reindex(this.column.controls);
    }
    setData(data) {
        this.json = data;
    }
}
class ClientsideText extends ColumnControl {
    constructor(text, json = JSON.parse(JSON.stringify(ClientsideText.Default))) {
        if (stringIsNullOrEmpty(json.id)) {
            json.id = getGUID();
            json.anchorComponentId = json.id;
        }
        super(json);
        this.text = text;
    }
    get text() {
        return this.data.innerHTML;
    }
    set text(value) {
        this.data.innerHTML = value;
    }
    get order() {
        return this.data.position.controlIndex;
    }
    set order(value) {
        this.data.position.controlIndex = value;
    }
    onColumnChange(col) {
        this.data.position.sectionFactor = col.factor;
        this.data.position.controlIndex = getNextOrder(col.controls);
        this.data.position.zoneIndex = col.data.position.zoneIndex;
        this.data.position.sectionIndex = col.order;
        this.data.position.layoutIndex = col.data.position.layoutIndex;
    }
}
ClientsideText.Default = {
    addedFromPersistedData: false,
    anchorComponentId: "",
    controlType: 4,
    displayMode: 2,
    editorType: "CKEditor",
    emphasis: {},
    id: "",
    innerHTML: "",
    position: {
        controlIndex: 1,
        layoutIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
};
class ClientsideWebpart extends ColumnControl {
    constructor(json = JSON.parse(JSON.stringify(ClientsideWebpart.Default))) {
        super(json);
    }
    static fromComponentDef(definition) {
        const part = new ClientsideWebpart();
        part.import(definition);
        return part;
    }
    get title() {
        return this.data.webPartData.title;
    }
    set title(value) {
        this.data.webPartData.title = value;
    }
    get description() {
        return this.data.webPartData.description;
    }
    set description(value) {
        this.data.webPartData.description = value;
    }
    get order() {
        return this.data.position.controlIndex;
    }
    set order(value) {
        this.data.position.controlIndex = value;
    }
    get height() {
        return this.data.reservedHeight;
    }
    set height(value) {
        this.data.reservedHeight = value;
    }
    get width() {
        return this.data.reservedWidth;
    }
    set width(value) {
        this.data.reservedWidth = value;
    }
    get dataVersion() {
        return this.data.webPartData.dataVersion;
    }
    set dataVersion(value) {
        this.data.webPartData.dataVersion = value;
    }
    setProperties(properties) {
        this.data.webPartData.properties = {
            ...this.data.webPartData.properties,
            ...properties,
        };
        return this;
    }
    getProperties() {
        return this.data.webPartData.properties;
    }
    setServerProcessedContent(properties) {
        this.data.webPartData.serverProcessedContent = {
            ...this.data.webPartData.serverProcessedContent,
            ...properties,
        };
        return this;
    }
    getServerProcessedContent() {
        return this.data.webPartData.serverProcessedContent;
    }
    onColumnChange(col) {
        this.data.position.sectionFactor = col.factor;
        this.data.position.controlIndex = getNextOrder(col.controls);
        this.data.position.zoneIndex = col.data.position.zoneIndex;
        this.data.position.sectionIndex = col.data.position.sectionIndex;
        this.data.position.layoutIndex = col.data.position.layoutIndex;
    }
    import(component) {
        const id = getGUID();
        const componendId = component.Id.replace(/^\{|\}$/g, "").toLowerCase();
        const manifest = JSON.parse(component.Manifest);
        const preconfiguredEntries = manifest.preconfiguredEntries[0];
        this.setData(Object.assign({}, this.data, {
            id,
            webPartData: {
                dataVersion: "1.0",
                description: preconfiguredEntries.description.default,
                id: componendId,
                instanceId: id,
                properties: preconfiguredEntries.properties,
                title: preconfiguredEntries.title.default,
            },
            webPartId: componendId,
        }));
    }
}
ClientsideWebpart.Default = {
    addedFromPersistedData: false,
    controlType: 3,
    displayMode: 2,
    emphasis: {},
    id: null,
    position: {
        controlIndex: 1,
        layoutIndex: 1,
        sectionFactor: 12,
        sectionIndex: 1,
        zoneIndex: 1,
    },
    reservedHeight: 500,
    reservedWidth: 500,
    webPartData: null,
    webPartId: null,
};

;// ./node_modules/@pnp/sp/clientside-pages/web.js





_Web.prototype.getClientsideWebParts = function () {
    return SPCollection(this, "GetClientSideWebParts")();
};
_Web.prototype.addClientsidePage =
    function (pageName, title = pageName.replace(/\.[^/.]+$/, ""), layout, promotedState) {
        return CreateClientsidePage(this, pageName, title, layout, promotedState);
    };
_Web.prototype.loadClientsidePage = function (path) {
    return ClientsidePageFromFile(this.getFileByServerRelativePath(path));
};
_Web.prototype.addRepostPage = async function (details) {
    const query = SPInstance([this, extractWebUrl(this.toUrl())], "_api/sitepages/pages/reposts");
    const r = await spPost(query, body(details));
    return r.AbsoluteUrl;
};
// eslint-disable-next-line max-len
_Web.prototype.addFullPageApp = async function (pageName, title = pageName.replace(/\.[^/.]+$/, ""), componentId, promotedState) {
    const parts = await this.getClientsideWebParts();
    const test = new RegExp(`{?${componentId}}?`, "i");
    const partDef = parts.find(p => test.test(p.Id));
    const part = ClientsideWebpart.fromComponentDef(partDef);
    const page = await this.addClientsidePage(pageName, title, "SingleWebPartAppPage", promotedState);
    page.addSection().addColumn(12).addControl(part);
    return page;
};

;// ./node_modules/@pnp/sp/clientside-pages/index.js



;// ./node_modules/@pnp/sp/folders/types.js












let _Folders = class _Folders extends _SPCollection {
    /**
     * Gets a folder by it's name
     *
     * @param name Folder's name
     */
    getByUrl(name) {
        return Folder(this).concat(`('${encodePath(name)}')`);
    }
    /**
     * Adds a new folder by path and should be prefered over add
     *
     * @param serverRelativeUrl The server relative url of the new folder to create
     * @param overwrite True to overwrite an existing folder, default false
     */
    async addUsingPath(serverRelativeUrl, overwrite = false) {
        return spPost(Folders(this, `addUsingPath(DecodedUrl='${encodePath(serverRelativeUrl)}',overwrite=${overwrite})`));
    }
};
_Folders = __decorate([
    defaultPath("folders")
], _Folders);

const Folders = spInvokableFactory(_Folders);
class _Folder extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteableWithETag();
    }
    /**
     * Gets this folder's sub folders
     *
     */
    get folders() {
        return Folders(this);
    }
    /**
     * Gets this folder's list item field values
     *
     */
    get listItemAllFields() {
        return SPInstance(this, "listItemAllFields");
    }
    /**
     * Gets the parent folder, if available
     *
     */
    get parentFolder() {
        return Folder(this, "parentFolder");
    }
    /**
     * Gets this folder's properties
     *
     */
    get properties() {
        return SPInstance(this, "properties");
    }
    /**
     * Gets this folder's storage metrics information
     *
     */
    get storageMetrics() {
        return SPInstance(this, "storagemetrics");
    }
    /**
     * Updates folder's properties
     * @param props Folder's properties to update
     */
    async update(props) {
        return spPostMerge(this, body(props));
    }
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle() {
        return spPost(Folder(this, "recycle"));
    }
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    async getItem(...selects) {
        const q = this.listItemAllFields;
        const d = await q.select(...selects)();
        if (d["odata.null"]) {
            throw Error("No associated item was found for this folder. It may be the root folder, which does not have an item.");
        }
        return Object.assign(Item([this, odataUrlFrom(d)]), d);
    }
    async moveByPath(destUrl, ...rest) {
        let options = {
            KeepBoth: false,
            ShouldBypassSharedLocks: true,
            RetainEditorAndModifiedOnMove: false,
        };
        if (rest.length === 1) {
            if (typeof rest[0] === "boolean") {
                options.KeepBoth = rest[0];
            }
            else if (typeof rest[0] === "object") {
                options = { ...options, ...rest[0] };
            }
        }
        return this.moveCopyImpl(destUrl, options, "MoveFolderByPath");
    }
    async copyByPath(destUrl, ...rest) {
        let options = {
            ShouldBypassSharedLocks: true,
            ResetAuthorAndCreatedOnCopy: true,
            KeepBoth: false,
        };
        if (rest.length === 1) {
            if (typeof rest[0] === "boolean") {
                options.KeepBoth = rest[0];
            }
            else if (typeof rest[0] === "object") {
                options = { ...options, ...rest[0] };
            }
        }
        return this.moveCopyImpl(destUrl, options, "CopyFolderByPath");
    }
    /**
     * Deletes the folder object with options.
     *
     * @param parameters Specifies the options to use when deleting a folder.
     */
    async deleteWithParams(parameters) {
        return spPost(Folder(this, "DeleteWithParameters"), body({ parameters }));
    }
    /**
     * Create the subfolder inside the current folder, as specified by the leafPath
     *
     * @param leafPath leafName of the new folder
     */
    async addSubFolderUsingPath(leafPath) {
        await spPost(Folder(this, "AddSubFolderUsingPath"), body({ leafPath: toResourcePath(leafPath) }));
        return this.folders.getByUrl(leafPath);
    }
    /**
     * Gets the parent information for this folder's list and web
     */
    async getParentInfos() {
        const urlInfo = await this.select("ServerRelativeUrl", "ListItemAllFields/ParentList/Id", "ListItemAllFields/ParentList/RootFolder/UniqueId", "ListItemAllFields/ParentList/RootFolder/ServerRelativeUrl", "ListItemAllFields/ParentList/RootFolder/ServerRelativePath", "ListItemAllFields/ParentList/ParentWeb/Id", "ListItemAllFields/ParentList/ParentWeb/Url", "ListItemAllFields/ParentList/ParentWeb/ServerRelativeUrl", "ListItemAllFields/ParentList/ParentWeb/ServerRelativePath").expand("ListItemAllFields/ParentList", "ListItemAllFields/ParentList/RootFolder", "ListItemAllFields/ParentList/ParentWeb")();
        return {
            Folder: {
                ServerRelativeUrl: urlInfo.ServerRelativeUrl,
            },
            ParentList: {
                Id: urlInfo.ListItemAllFields.ParentList.Id,
                RootFolderServerRelativePath: urlInfo.ListItemAllFields.ParentList.RootFolder.ServerRelativePath,
                RootFolderServerRelativeUrl: urlInfo.ListItemAllFields.ParentList.RootFolder.ServerRelativeUrl,
                RootFolderUniqueId: urlInfo.ListItemAllFields.ParentList.RootFolder.UniqueId,
            },
            ParentWeb: {
                Id: urlInfo.ListItemAllFields.ParentList.ParentWeb.Id,
                ServerRelativePath: urlInfo.ListItemAllFields.ParentList.ParentWeb.ServerRelativePath,
                ServerRelativeUrl: urlInfo.ListItemAllFields.ParentList.ParentWeb.ServerRelativeUrl,
                Url: urlInfo.ListItemAllFields.ParentList.ParentWeb.Url,
            },
        };
    }
    /**
     * Implementation of folder move/copy
     *
     * @param destUrl The server relative path to which the folder will be copied/moved
     * @param options Any options
     * @param methodName The method to call
     * @returns An IFolder representing the moved or copied folder
     */
    moveCopyImpl(destUrl, options, methodName) {
        // create a timeline we will manipulate for this request
        const poster = Folder(this);
        // add our pre-request actions, this fixes issues with batching hanging #2668
        poster.on.pre(timeline_noInherit(async (url, init, result) => {
            const { ServerRelativeUrl: srcUrl, ["odata.id"]: absoluteUrl } = await Folder(this).using(BatchNever()).select("ServerRelativeUrl")();
            const uri = new URL(extractWebUrl(absoluteUrl));
            url = combine(uri.href, `/_api/SP.MoveCopyUtil.${methodName}()`);
            init = body({
                destPath: toResourcePath(isUrlAbsolute(destUrl) ? destUrl : combine(uri.origin, destUrl)),
                options,
                srcPath: toResourcePath(combine(uri.origin, srcUrl)),
            }, init);
            return [url, init, result];
        }));
        return spPost(poster).then(() => folderFromPath(this, destUrl));
    }
}
__decorate([
    cancelableScope
], _Folder.prototype, "moveByPath", null);
__decorate([
    cancelableScope
], _Folder.prototype, "copyByPath", null);
const Folder = spInvokableFactory(_Folder);
/**
 * Creates an IFolder instance given a base object and a server relative path
 *
 * @param base Valid SPQueryable from which the observers will be used and the web url extracted
 * @param serverRelativePath The server relative url to the folder (ex: '/sites/dev/documents/folder3')
 * @returns IFolder instance referencing the folder described by the supplied parameters
 */
function folderFromServerRelativePath(base, serverRelativePath) {
    return Folder([base, extractWebUrl(base.toUrl())], `_api/web/getFolderByServerRelativePath(decodedUrl='${encodePathNoURIEncode(serverRelativePath)}')`);
}
/**
 * Creates an IFolder instance given a base object and an absolute path
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath The absolute url to the folder (ex: 'https://tenant.sharepoint.com/sites/dev/documents/folder/')
 * @returns IFolder instance referencing the folder described by the supplied parameters
 */
async function folderFromAbsolutePath(base, absoluteFolderPath) {
    const { WebFullUrl } = await Folder(base).using(BatchNever()).getContextInfo(absoluteFolderPath);
    const { pathname } = new URL(absoluteFolderPath);
    return folderFromServerRelativePath(Folder([base, combine(WebFullUrl, "_api/web")]), decodeURIComponent(pathname));
}
/**
 * Creates an IFolder intance given a base object and either an absolute or server relative path to a folder
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath server relative or absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/folder' or '/sites/dev/documents/folder')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
async function folderFromPath(base, path) {
    return (isUrlAbsolute(path) ? folderFromAbsolutePath : folderFromServerRelativePath)(base, path);
}

;// ./node_modules/@pnp/sp/column-defaults/list.js







addProp(_List, "rootFolder", Folder);
_List.prototype.getDefaultColumnValues = async function () {
    const pathPart = await this.rootFolder.select("ServerRelativePath")();
    const webUrl = await this.select("ParentWeb/Url").expand("ParentWeb")();
    const path = combine("/", pathPart.ServerRelativePath.DecodedUrl, "Forms/client_LocationBasedDefaults.html");
    const baseFilePath = combine(webUrl.ParentWeb.Url, `_api/web/getFileByServerRelativePath(decodedUrl='${encodePath(path)}')`);
    let xml = "";
    try {
        // we are reading the contents of the file
        xml = await Folder([this, baseFilePath], "$value").using(TextParse())();
    }
    catch (e) {
        // if this call fails we assume it is because the file is 404
        if (e && e.status && e.status === 404) {
            // return an empty array
            return [];
        }
        throw e;
    }
    // get all the tags from the xml
    const matches = xml.match(/<a.*?<\/a>/ig);
    const tags = matches === null ? [] : matches.map(t => t.trim());
    // now we need to turn these tags of form into objects
    // <a href="/sites/dev/My%20Title"><DefaultValue FieldName="TextField">Test</DefaultValue></a>
    return tags.reduce((defVals, t) => {
        const m = /<a href="(.*?)">/ig.exec(t);
        // if things worked out captures are:
        // 0: whole string
        // 1: ENCODED server relative path
        if (m.length < 1) {
            // this indicates an error somewhere, but we have no way to meaningfully recover
            // perhaps the way the tags are stored has changed on the server? Check that first.
            this.log(`Could not parse default column value from '${t}'`, 2);
            return null;
        }
        // return the parsed out values
        const subMatches = t.match(/<DefaultValue.*?<\/DefaultValue>/ig);
        const subTags = subMatches === null ? [] : subMatches.map(st => st.trim());
        subTags.map(st => {
            const sm = /<DefaultValue FieldName="(.*?)">(.*?)<\/DefaultValue>/ig.exec(st);
            // if things worked out captures are:
            // 0: whole string
            // 1: Field internal name
            // 2: Default value as string
            if (sm.length < 1) {
                this.log(`Could not parse default column value from '${st}'`, 2);
            }
            else {
                defVals.push({
                    name: sm[1],
                    path: decodeURIComponent(m[1]),
                    value: sm[2],
                });
            }
        });
        return defVals;
    }, []).filter(v => v !== null);
};
_List.prototype.setDefaultColumnValues = async function (defaults) {
    // we need the field types from the list to map the values
    // eslint-disable-next-line max-len
    const fieldDefs = await SPCollection(this, "fields").select("InternalName", "TypeAsString").filter("Hidden ne true")();
    // group field defaults by path
    const defaultsByPath = {};
    for (let i = 0; i < defaults.length; i++) {
        if (defaultsByPath[defaults[i].path] == null) {
            defaultsByPath[defaults[i].path] = [defaults[i]];
        }
        else {
            defaultsByPath[defaults[i].path].push(defaults[i]);
        }
    }
    const paths = Object.getOwnPropertyNames(defaultsByPath);
    const pathDefaults = [];
    // For each path, group field defaults
    for (let j = 0; j < paths.length; j++) {
        // map the values into the right format and produce our xml elements
        const pathFields = defaultsByPath[paths[j]];
        const tags = pathFields.map(fieldDefault => {
            const index = fieldDefs.findIndex(fd => fd.InternalName === fieldDefault.name);
            if (index < 0) {
                throw Error(`Field '${fieldDefault.name}' does not exist in the list. Please check the internal field name. Failed to set defaults.`);
            }
            const fieldDef = fieldDefs[index];
            let value = "";
            switch (fieldDef.TypeAsString) {
                case "Boolean":
                case "Currency":
                case "Text":
                case "DateTime":
                case "Number":
                case "Choice":
                case "User":
                    if (util_isArray(fieldDefault.value)) {
                        throw Error(`The type '${fieldDef.TypeAsString}' does not support multiple values.`);
                    }
                    value = `${fieldDefault.value}`;
                    break;
                case "MultiChoice":
                    if (util_isArray(fieldDefault.value)) {
                        value = fieldDefault.value.map(v => `${v}`).join(";");
                    }
                    else {
                        value = `${fieldDefault.value}`;
                    }
                    break;
                case "UserMulti":
                    if (util_isArray(fieldDefault.value)) {
                        value = fieldDefault.value.map(v => `${v}`).join(";#");
                    }
                    else {
                        value = `${fieldDefault.value}`;
                    }
                    break;
                case "Taxonomy":
                case "TaxonomyFieldType":
                    if (util_isArray(fieldDefault.value)) {
                        throw Error(`The type '${fieldDef.TypeAsString}' does not support multiple values.`);
                    }
                    else {
                        value = `${fieldDefault.value.wssId};#${fieldDefault.value.termName}|${fieldDefault.value.termId}`;
                    }
                    break;
                case "TaxonomyMulti":
                case "TaxonomyFieldTypeMulti":
                    if (util_isArray(fieldDefault.value)) {
                        value = fieldDefault.value.map(v => `${v.wssId};#${v.termName}|${v.termId}`).join(";#");
                    }
                    else {
                        value = [fieldDefault.value].map(v => `${v.wssId};#${v.termName}|${v.termId}`).join(";#");
                    }
                    break;
            }
            return `<DefaultValue FieldName="${fieldDefault.name}">${value}</DefaultValue>`;
        });
        const href = pathFields[0].path.replace(/ /gi, "%20");
        const pathDefault = `<a href="${href}">${tags.join("")}</a>`;
        pathDefaults.push(pathDefault);
    }
    // builds update to defaults
    const xml = `<MetadataDefaults>${pathDefaults.join("")}</MetadataDefaults>`;
    const pathPart = await this.rootFolder.select("ServerRelativePath")();
    const webUrl = await this.select("ParentWeb/Url").expand("ParentWeb")();
    const path = combine("/", pathPart.ServerRelativePath.DecodedUrl, "Forms");
    const baseFilePath = combine(webUrl.ParentWeb.Url, "_api/web", `getFolderByServerRelativePath(decodedUrl='${encodePath(path)}')`, "files");
    await spPost(Folder([this, baseFilePath], "add(overwrite=true,url='client_LocationBasedDefaults.html')"), { body: xml });
    // finally we need to ensure this list has the right event receiver added
    const existingReceivers = await this.eventReceivers.filter("ReceiverName eq 'LocationBasedMetadataDefaultsReceiver ItemAdded'").select("ReceiverId")();
    if (existingReceivers.length < 1) {
        await spPost(List(this.eventReceivers, "add"), body({
            eventReceiverCreationInformation: {
                EventType: 10001,
                ReceiverAssembly: "Microsoft.Office.DocumentManagement, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c",
                ReceiverClass: "Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver",
                ReceiverName: "LocationBasedMetadataDefaultsReceiver ItemAdded",
                SequenceNumber: 1000,
                Synchronization: 1,
            },
        }));
    }
};

;// ./node_modules/@pnp/sp/lists/web.js






addProp(_Web, "lists", Lists);
addProp(_Web, "siteUserInfoList", List);
addProp(_Web, "defaultDocumentLibrary", List);
addProp(_Web, "customListTemplates", SPCollection, "getcustomlisttemplates");
_Web.prototype.getList = function (listRelativeUrl) {
    return List(this, `getList('${encodePath(listRelativeUrl)}')`);
};
_Web.prototype.getCatalog = async function (type) {
    const data = await Web(this, `getcatalog(${type})`).select("Id")();
    return List([this, odataUrlFrom(data)]);
};

;// ./node_modules/@pnp/sp/column-defaults/folder.js





_Folder.prototype.getDefaultColumnValues = async function () {
    const folderProps = await Folder(this, "Properties").select("vti_x005f_listname")();
    const { ServerRelativePath: serRelPath } = await this.select("ServerRelativePath")();
    const web = Web([this, extractWebUrl(odataUrlFrom(folderProps))]);
    const docLib = web.lists.getById(folderProps.vti_x005f_listname);
    // and we return the defaults associated with this folder's server relative path only
    // if you want all the defaults use list.getDefaultColumnValues()
    return (await docLib.getDefaultColumnValues()).filter(v => v.path.toLowerCase() === serRelPath.DecodedUrl.toLowerCase());
};
_Folder.prototype.setDefaultColumnValues = async function (fieldDefaults, merge = true) {
    // we start by figuring out where we are
    const folderProps = await Folder(this, "Properties").select("vti_x005f_listname")();
    // now we create a web, list and batch to get some info we need
    const web = Web([this, extractWebUrl(odataUrlFrom(folderProps))]);
    const docLib = web.lists.getById(folderProps.vti_x005f_listname);
    // we need the proper folder path
    const folderPath = (await this.select("ServerRelativePath")()).ServerRelativePath.DecodedUrl;
    // at this point we should have all the defaults to update
    // and we need to get all the defaults to update the entire doc
    const existingDefaults = await docLib.getDefaultColumnValues();
    // we filter all defaults to remove any associated with this folder if merge is false
    const filteredExistingDefaults = merge ? existingDefaults : existingDefaults.filter(f => f.path !== folderPath);
    // we update / add any new defaults from those passed to this method
    fieldDefaults.forEach(d => {
        const existing = filteredExistingDefaults.find(ed => ed.name === d.name && ed.path === folderPath);
        if (existing) {
            existing.value = d.value;
        }
        else {
            filteredExistingDefaults.push({
                name: d.name,
                path: folderPath,
                value: d.value,
            });
        }
    });
    // after this operation filteredExistingDefaults should contain all the value we want to write to the file
    await docLib.setDefaultColumnValues(filteredExistingDefaults);
};
_Folder.prototype.clearDefaultColumnValues = async function () {
    await this.setDefaultColumnValues([], false);
};

;// ./node_modules/@pnp/sp/column-defaults/index.js



;// ./node_modules/@pnp/sp/comments/index.js



;// ./node_modules/@pnp/sp/content-types/types.js




let _ContentTypes = class _ContentTypes extends _SPCollection {
    /**
     * Adds an existing contenttype to a content type collection
     *
     * @param contentTypeId in the following format, for example: 0x010102
     */
    async addAvailableContentType(contentTypeId) {
        const data = await spPost(ContentTypes(this, "addAvailableContentType"), body({ "contentTypeId": contentTypeId }));
        return {
            contentType: this.getById(data.id),
            data: data,
        };
    }
    /**
     * Gets a ContentType by content type id
     * @param id The id of the content type to get, in the following format, for example: 0x010102
     */
    getById(id) {
        return ContentType(this).concat(`('${id}')`);
    }
    /**
     * Adds a new content type to the collection
     *
     * @param id The desired content type id for the new content type (also determines the parent
     *   content type)
     * @param name The name of the content type
     * @param description The description of the content type
     * @param group The group in which to add the content type
     * @param additionalSettings Any additional settings to provide when creating the content type
     *
     */
    async add(id, name, description = "", group = "Custom Content Types", additionalSettings = {}) {
        const postBody = body({
            Description: description,
            Group: group,
            Id: { StringValue: id },
            Name: name,
            ...additionalSettings,
        });
        const data = await spPost(this, postBody);
        return { contentType: this.getById(data.id), data };
    }
};
_ContentTypes = __decorate([
    defaultPath("contenttypes")
], _ContentTypes);

const ContentTypes = spInvokableFactory(_ContentTypes);
class _ContentType extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
     * Updates this list instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    async update(properties) {
        return spPostMerge(this, body(properties));
    }
    /**
     * Gets the column (also known as field) references in the content type.
     */
    get fieldLinks() {
        return FieldLinks(this);
    }
    /**
     * Gets a value that specifies the collection of fields for the content type.
     */
    get fields() {
        return SPCollection(this, "fields");
    }
    /**
     * Gets the parent content type of the content type.
     */
    get parent() {
        return ContentType(this, "parent");
    }
    /**
     * Gets a value that specifies the collection of workflow associations for the content type.
     */
    get workflowAssociations() {
        return SPCollection(this, "workflowAssociations");
    }
}
const ContentType = spInvokableFactory(_ContentType);
let _FieldLinks = class _FieldLinks extends _SPCollection {
    /**
    *  Gets a FieldLink by GUID id
    *
    * @param id The GUID id of the field link
    */
    getById(id) {
        return FieldLink(this).concat(`(guid'${id}')`);
    }
};
_FieldLinks = __decorate([
    defaultPath("fieldlinks")
], _FieldLinks);

const FieldLinks = spInvokableFactory(_FieldLinks);
class _FieldLink extends _SPInstance {
}
const FieldLink = spInvokableFactory(_FieldLink);

;// ./node_modules/@pnp/sp/content-types/web.js



addProp(_Web, "contentTypes", ContentTypes);

;// ./node_modules/@pnp/sp/content-types/item.js



addProp(_Item, "contentType", ContentType);

;// ./node_modules/@pnp/sp/content-types/list.js



addProp(_List, "contentTypes", ContentTypes);

;// ./node_modules/@pnp/sp/content-types/index.js





;// ./node_modules/@pnp/sp/features/types.js




let _Features = class _Features extends _SPCollection {
    /**
     * Adds (activates) the specified feature
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature activation will be forced
     */
    async add(featureId, force = false) {
        const data = await spPost(Features(this, "add"), body({
            featdefScope: 0,
            featureId,
            force,
        }));
        return {
            data: data,
            feature: this.getById(featureId),
        };
    }
    /**
     * Gets a feature from the collection with the specified guid
     *
     * @param id The Id of the feature (GUID)
     */
    getById(id) {
        return Feature(this).concat(`('${id}')`);
    }
    /**
     * Removes (deactivates) a feature from the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature deactivation will be forced
     */
    remove(featureId, force = false) {
        return spPost(Features(this, "remove"), body({
            featureId,
            force,
        }));
    }
};
_Features = __decorate([
    defaultPath("features")
], _Features);

const Features = spInvokableFactory(_Features);
class _Feature extends _SPInstance {
}
const Feature = spInvokableFactory(_Feature);

;// ./node_modules/@pnp/sp/features/site.js



addProp(_Site, "features", Features);

;// ./node_modules/@pnp/sp/features/web.js



addProp(_Web, "features", Features);

;// ./node_modules/@pnp/sp/features/index.js




;// ./node_modules/@pnp/sp/utils/metadata.js
function metadata(type) {
    return {
        "__metadata": { "type": type },
    };
}

;// ./node_modules/@pnp/sp/fields/types.js





let _Fields = class _Fields extends _SPCollection {
    /**
     * Creates a field based on the specified schema
     *
     * @param xml A string or XmlSchemaFieldCreationInformation instance descrbing the field to create
     */
    async createFieldAsXml(xml) {
        if (typeof xml === "string") {
            xml = { SchemaXml: xml };
        }
        return spPost(Fields(this, "createfieldasxml"), body({ parameters: xml }));
    }
    /**
     * Gets a field from the collection by id
     *
     * @param id The Id of the list
     */
    getById(id) {
        return Field(this).concat(`('${id}')`);
    }
    /**
     * Gets a field from the collection by title
     *
     * @param title The case-sensitive title of the field
     */
    getByTitle(title) {
        return Field(this, `getByTitle('${title}')`);
    }
    /**
     * Gets a field from the collection by using internal name or title
     *
     * @param name The case-sensitive internal name or title of the field
     */
    getByInternalNameOrTitle(name) {
        return Field(this, `getByInternalNameOrTitle('${name}')`);
    }
    /**
     * Adds a new field to the collection
     *
     * @param title The new field's title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    async add(title, fieldTypeKind, properties) {
        return spPost(Fields(this, null), body(Object.assign(metadata(mapFieldTypeEnumToString(fieldTypeKind)), {
            Title: title,
            FieldTypeKind: fieldTypeKind,
            ...properties,
        }), headers({
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
        })));
    }
    /**
     * Adds a new field to the collection
     *
     * @param title The new field's title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    async addField(title, fieldTypeKind, properties) {
        return spPost(Fields(this, "AddField"), body({
            parameters: {
                Title: title,
                FieldTypeKind: fieldTypeKind,
                ...properties,
            },
        }));
    }
    /**
     * Adds a new SP.FieldText to the collection
     *
     * @param title The field title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addText(title, properties) {
        return this.add(title, 2, {
            MaxLength: 255,
            ...properties,
        });
    }
    /**
     * Adds a new SP.FieldCalculated to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCalculated(title, properties) {
        return this.add(title, 17, {
            OutputType: FieldTypes.Text,
            ...properties,
        });
    }
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addDateTime(title, properties) {
        return this.add(title, 4, {
            DateTimeCalendarType: CalendarType.Gregorian,
            DisplayFormat: DateTimeFieldFormatType.DateOnly,
            FriendlyDisplayFormat: DateTimeFieldFriendlyFormatType.Unspecified,
            ...properties,
        });
    }
    /**
     * Adds a new SP.FieldNumber to the collection
     *
     * @param title The field title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addNumber(title, properties) {
        return this.add(title, 9, properties);
    }
    /**
     * Adds a new SP.FieldCurrency to the collection
     *
     * @param title The field title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCurrency(title, properties) {
        return this.add(title, 10, {
            CurrencyLocaleId: 1033,
            ...properties,
        });
    }
    /**
     * Adds a new SP.FieldMultiLineText to the collection
     *
     * @param title The field title
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     *
     */
    addMultilineText(title, properties) {
        return this.add(title, 3, {
            AllowHyperlink: true,
            AppendOnly: false,
            NumberOfLines: 6,
            RestrictedMode: false,
            RichText: true,
            ...properties,
        });
    }
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    addUrl(title, properties) {
        return this.add(title, 11, {
            DisplayFormat: UrlFieldFormatType.Hyperlink,
            ...properties,
        });
    }
    /** Adds a user field to the colleciton
     *
     * @param title The new field's title
     * @param properties
     */
    addUser(title, properties) {
        return this.add(title, 20, {
            SelectionMode: FieldUserSelectionMode.PeopleAndGroups,
            ...properties,
        });
    }
    /**
     * Adds a SP.FieldLookup to the collection
     *
     * @param title The new field's title
     * @param properties Set of additional properties to set on the new field
     */
    async addLookup(title, properties) {
        return this.addField(title, 7, properties);
    }
    /**
     * Adds a new SP.FieldChoice to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addChoice(title, properties) {
        const props = {
            ...properties,
            Choices: {
                results: properties.Choices,
            },
        };
        return this.add(title, 6, props);
    }
    /**
     * Adds a new SP.FieldMultiChoice to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addMultiChoice(title, properties) {
        const props = {
            ...properties,
            Choices: {
                results: properties.Choices,
            },
        };
        return this.add(title, 15, props);
    }
    /**
   * Adds a new SP.FieldBoolean to the collection
   *
   * @param title The field title.
   * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
   */
    addBoolean(title, properties) {
        return this.add(title, 8, properties);
    }
    /**
  * Creates a secondary (dependent) lookup field, based on the Id of the primary lookup field.
  *
  * @param displayName The display name of the new field.
  * @param primaryLookupFieldId The guid of the primary Lookup Field.
  * @param showField Which field to show from the lookup list.
  */
    async addDependentLookupField(displayName, primaryLookupFieldId, showField) {
        const path = `adddependentlookupfield(displayName='${displayName}', primarylookupfieldid='${primaryLookupFieldId}', showfield='${showField}')`;
        return spPost(Fields(this, path));
    }
    /**
   * Adds a new SP.FieldLocation to the collection
   *
   * @param title The field title.
   * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
   */
    addLocation(title, properties) {
        return this.add(title, 33, properties);
    }
    /**
     * Adds a new SP.FieldLocation to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addImageField(title, properties) {
        return this.add(title, 34, properties);
    }
};
_Fields = __decorate([
    defaultPath("fields")
], _Fields);

const Fields = spInvokableFactory(_Fields);
class _Field extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
   * Updates this field instance with the supplied properties
   *
   * @param properties A plain object hash of values to update for the list
   * @param fieldType The type value such as SP.FieldLookup. Optional, looked up from the field if not provided
   */
    async update(properties, fieldType) {
        if (typeof fieldType === "undefined" || fieldType === null) {
            const info = await Field(this).select("FieldTypeKind")();
            fieldType = info["odata.type"];
        }
        return spPostMerge(this, body(properties));
    }
    /**
   * Sets the value of the ShowInDisplayForm property for this field.
   */
    setShowInDisplayForm(show) {
        return spPost(Field(this, `setshowindisplayform(${show})`));
    }
    /**
   * Sets the value of the ShowInEditForm property for this field.
   */
    setShowInEditForm(show) {
        return spPost(Field(this, `setshowineditform(${show})`));
    }
    /**
   * Sets the value of the ShowInNewForm property for this field.
   */
    setShowInNewForm(show) {
        return spPost(Field(this, `setshowinnewform(${show})`));
    }
}
const Field = spInvokableFactory(_Field);
/**
 * Specifies the type of the field.
 */
var FieldTypes;
(function (FieldTypes) {
    FieldTypes[FieldTypes["Invalid"] = 0] = "Invalid";
    FieldTypes[FieldTypes["Integer"] = 1] = "Integer";
    FieldTypes[FieldTypes["Text"] = 2] = "Text";
    FieldTypes[FieldTypes["Note"] = 3] = "Note";
    FieldTypes[FieldTypes["DateTime"] = 4] = "DateTime";
    FieldTypes[FieldTypes["Counter"] = 5] = "Counter";
    FieldTypes[FieldTypes["Choice"] = 6] = "Choice";
    FieldTypes[FieldTypes["Lookup"] = 7] = "Lookup";
    FieldTypes[FieldTypes["Boolean"] = 8] = "Boolean";
    FieldTypes[FieldTypes["Number"] = 9] = "Number";
    FieldTypes[FieldTypes["Currency"] = 10] = "Currency";
    FieldTypes[FieldTypes["URL"] = 11] = "URL";
    FieldTypes[FieldTypes["Computed"] = 12] = "Computed";
    FieldTypes[FieldTypes["Threading"] = 13] = "Threading";
    FieldTypes[FieldTypes["Guid"] = 14] = "Guid";
    FieldTypes[FieldTypes["MultiChoice"] = 15] = "MultiChoice";
    FieldTypes[FieldTypes["GridChoice"] = 16] = "GridChoice";
    FieldTypes[FieldTypes["Calculated"] = 17] = "Calculated";
    FieldTypes[FieldTypes["File"] = 18] = "File";
    FieldTypes[FieldTypes["Attachments"] = 19] = "Attachments";
    FieldTypes[FieldTypes["User"] = 20] = "User";
    FieldTypes[FieldTypes["Recurrence"] = 21] = "Recurrence";
    FieldTypes[FieldTypes["CrossProjectLink"] = 22] = "CrossProjectLink";
    FieldTypes[FieldTypes["ModStat"] = 23] = "ModStat";
    FieldTypes[FieldTypes["Error"] = 24] = "Error";
    FieldTypes[FieldTypes["ContentTypeId"] = 25] = "ContentTypeId";
    FieldTypes[FieldTypes["PageSeparator"] = 26] = "PageSeparator";
    FieldTypes[FieldTypes["ThreadIndex"] = 27] = "ThreadIndex";
    FieldTypes[FieldTypes["WorkflowStatus"] = 28] = "WorkflowStatus";
    FieldTypes[FieldTypes["AllDayEvent"] = 29] = "AllDayEvent";
    FieldTypes[FieldTypes["WorkflowEventType"] = 30] = "WorkflowEventType";
    FieldTypes[FieldTypes["Location"] = 33] = "Location";
    FieldTypes[FieldTypes["Image"] = 34] = "Image";
})(FieldTypes || (FieldTypes = {}));
const FieldTypeClassMapping = {
    [FieldTypes.Calculated]: "SP.FieldCalculated",
    [FieldTypes.Choice]: "SP.FieldChoice",
    [FieldTypes.Computed]: "SP.FieldComputed",
    [FieldTypes.Currency]: "SP.FieldCurrency",
    [FieldTypes.DateTime]: "SP.FieldDateTime",
    [FieldTypes.GridChoice]: "SP.FieldRatingScale",
    [FieldTypes.Guid]: "SP.FieldGuid",
    [FieldTypes.Image]: "SP.FieldMultiLineText",
    [FieldTypes.Integer]: "SP.FieldNumber",
    [FieldTypes.Location]: "SP.FieldLocation",
    [FieldTypes.Lookup]: "SP.FieldLookup",
    [FieldTypes.ModStat]: "SP.FieldChoice",
    [FieldTypes.MultiChoice]: "SP.FieldMultiChoice",
    [FieldTypes.Note]: "SP.FieldMultiLineText",
    [FieldTypes.Number]: "SP.FieldNumber",
    [FieldTypes.Text]: "SP.FieldText",
    [FieldTypes.URL]: "SP.FieldUrl",
    [FieldTypes.User]: "SP.FieldUser",
    [FieldTypes.WorkflowStatus]: "SP.FieldChoice",
    [FieldTypes.WorkflowEventType]: "SP.FieldNumber",
};
function mapFieldTypeEnumToString(enumValue) {
    var _a;
    return (_a = FieldTypeClassMapping[enumValue]) !== null && _a !== void 0 ? _a : "SP.Field";
}
var DateTimeFieldFormatType;
(function (DateTimeFieldFormatType) {
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
})(DateTimeFieldFormatType || (DateTimeFieldFormatType = {}));
var DateTimeFieldFriendlyFormatType;
(function (DateTimeFieldFriendlyFormatType) {
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Unspecified"] = 0] = "Unspecified";
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Disabled"] = 1] = "Disabled";
    DateTimeFieldFriendlyFormatType[DateTimeFieldFriendlyFormatType["Relative"] = 2] = "Relative";
})(DateTimeFieldFriendlyFormatType || (DateTimeFieldFriendlyFormatType = {}));
/**
 * Specifies the control settings while adding a field.
 */
var AddFieldOptions;
(function (AddFieldOptions) {
    /**
   *  Specify that a new field added to the list must also be added to the default content type in the site collection
   */
    AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
    /**
   * Specify that a new field added to the list must also be added to the default content type in the site collection.
   */
    AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
    /**
   * Specify that a new field must not be added to any other content type
   */
    AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
    /**
   *  Specify that a new field that is added to the specified list must also be added to all content types in the site collection
   */
    AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
    /**
   * Specify adding an internal field name hint for the purpose of avoiding possible database locking or field renaming operations
   */
    AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
    /**
   * Specify that a new field that is added to the specified list must also be added to the default list view
   */
    AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
    /**
   * Specify to confirm that no other field has the same display name
   */
    AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
})(AddFieldOptions || (AddFieldOptions = {}));
var CalendarType;
(function (CalendarType) {
    CalendarType[CalendarType["Gregorian"] = 1] = "Gregorian";
    CalendarType[CalendarType["Japan"] = 3] = "Japan";
    CalendarType[CalendarType["Taiwan"] = 4] = "Taiwan";
    CalendarType[CalendarType["Korea"] = 5] = "Korea";
    CalendarType[CalendarType["Hijri"] = 6] = "Hijri";
    CalendarType[CalendarType["Thai"] = 7] = "Thai";
    CalendarType[CalendarType["Hebrew"] = 8] = "Hebrew";
    CalendarType[CalendarType["GregorianMEFrench"] = 9] = "GregorianMEFrench";
    CalendarType[CalendarType["GregorianArabic"] = 10] = "GregorianArabic";
    CalendarType[CalendarType["GregorianXLITEnglish"] = 11] = "GregorianXLITEnglish";
    CalendarType[CalendarType["GregorianXLITFrench"] = 12] = "GregorianXLITFrench";
    CalendarType[CalendarType["KoreaJapanLunar"] = 14] = "KoreaJapanLunar";
    CalendarType[CalendarType["ChineseLunar"] = 15] = "ChineseLunar";
    CalendarType[CalendarType["SakaEra"] = 16] = "SakaEra";
    CalendarType[CalendarType["UmAlQura"] = 23] = "UmAlQura";
})(CalendarType || (CalendarType = {}));
var UrlFieldFormatType;
(function (UrlFieldFormatType) {
    UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
    UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
})(UrlFieldFormatType || (UrlFieldFormatType = {}));
var FieldUserSelectionMode;
(function (FieldUserSelectionMode) {
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleAndGroups"] = 1] = "PeopleAndGroups";
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleOnly"] = 0] = "PeopleOnly";
})(FieldUserSelectionMode || (FieldUserSelectionMode = {}));
var ChoiceFieldFormatType;
(function (ChoiceFieldFormatType) {
    ChoiceFieldFormatType[ChoiceFieldFormatType["Dropdown"] = 0] = "Dropdown";
    ChoiceFieldFormatType[ChoiceFieldFormatType["RadioButtons"] = 1] = "RadioButtons";
})(ChoiceFieldFormatType || (ChoiceFieldFormatType = {}));

;// ./node_modules/@pnp/sp/fields/web.js



addProp(_Web, "fields", Fields);
addProp(_Web, "availablefields", Fields);

;// ./node_modules/@pnp/sp/fields/list.js



addProp(_List, "fields", Fields);

;// ./node_modules/@pnp/sp/fields/index.js




;// ./node_modules/@pnp/sp/files/folder.js



addProp(_Folder, "files", Files);

;// ./node_modules/@pnp/sp/files/item.js



addProp(_Item, "file", File, "file");

;// ./node_modules/@pnp/sp/files/index.js





;// ./node_modules/@pnp/sp/folders/item.js



addProp(_Item, "folder", Folder);

;// ./node_modules/@pnp/sp/folders/list.js



addProp(_List, "rootFolder", Folder);

;// ./node_modules/@pnp/sp/folders/web.js



addProp(_Web, "folders", Folders);
addProp(_Web, "rootFolder", Folder);
_Web.prototype.getFolderByServerRelativePath = function (folderRelativeUrl) {
    return folderFromServerRelativePath(this, folderRelativeUrl);
};
_Web.prototype.getFolderById = function (uniqueId) {
    return Folder(this, `getFolderById('${uniqueId}')`);
};

;// ./node_modules/@pnp/sp/folders/index.js





;// ./node_modules/@pnp/sp/forms/types.js



/**
 * Describes a collection of Form objects
 *
 */
let _Forms = class _Forms extends _SPCollection {
    /**
     * Gets a form by id
     *
     * @param id The guid id of the item to retrieve
     */
    getById(id) {
        return Form(this).concat(`('${id}')`);
    }
};
_Forms = __decorate([
    defaultPath("forms")
], _Forms);

const Forms = spInvokableFactory(_Forms);
/**
 * Describes a single of Form instance
 *
 */
class _Form extends _SPInstance {
}
const Form = spInvokableFactory(_Form);

;// ./node_modules/@pnp/sp/forms/list.js



addProp(_List, "forms", Forms);

;// ./node_modules/@pnp/sp/forms/index.js



;// ./node_modules/@pnp/sp/groupsitemanager/types.js




let _GroupSiteManager = class _GroupSiteManager extends _SPInstance {
    /**
     * Indicates if the current user / application can create Microsoft 365 groups
     *
     *@returns True if possible, otherwise false
     */
    canUserCreateGroup() {
        return spGet(GroupSiteManager(this, "CanUserCreateGroup"));
    }
    /**
     * Clears Teams cache for current user / application
     */
    clearCurrentUserTeamsCache() {
        return spPost(GroupSiteManager(this, "ClearCurrentUserTeamsCache"));
    }
    /**
     * Creates a SharePoint team site for the submitted Microsoft 365 group.
     * More information regarding site creation status here: https://learn.microsoft.com/sharepoint/dev/apis/site-creation-rest#response-2
     *
     *@param groupId Id of the Microsoft 365 group
     *@returns Created SharePoint site information (or current creation status)
     */
    create(groupId) {
        return spPost(GroupSiteManager(this, "Create"), body({
            groupId,
        }));
    }
    /**
     * Creates a Microsoft 365 group with a connected site.
     * This method doesn't work in Azure AD Application context
     *
     *@param displayName The name of the group
     *@param isPublic Whether the new group should be public or private
     *@param ownerPrincipalNames The group owners principal names
     *@param description Detailed information about the group
     *@param creationOptions Additional options ("SPSiteLanguage", "SensitivityLabel", "HubSiteId",...)
     *@returns Created SharePoint site information and group Id (or current creation status)
     */
    // eslint-disable-next-line max-len
    createGroup(displayName, alias, isPublic, ownerPrincipalNames, description, creationOptions) {
        return spPost(GroupSiteManager(this, "CreateGroup"), body({
            displayName,
            alias,
            isPublic,
            ownerPrincipalNames,
            description,
            creationOptions,
        }));
    }
    // CreateGroupEx: created in sp/sites node through PR #2520
    /**
     * Deletes a group-connected site.
     * This method doesn't work in Azure AD Application context
     *
     *@param siteUrl URL of the group-connected site to delete
     */
    delete(siteUrl) {
        return spPost(GroupSiteManager(this, "Delete"), body({
            siteUrl,
        }));
    }
    /**
     * Creates a team for the current site (group-connected only).
     * This method doesn't work in Azure AD Application context
     *
     *@returns The group-connected site team URL
     */
    ensureTeamForGroup() {
        return spPost(GroupSiteManager(this, "EnsureTeamForGroup"));
    }
    /**
     * Creates a team for the current site (group-connected only).
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@returns The group-connected site team ID and URL
     */
    ensureTeamForGroupEx() {
        return spPost(GroupSiteManager(this, "EnsureTeamForGroupEx"));
    }
    /**
     * Gets labels configured for the tenant
     *
     *@param pageNumber Page results number to display
     *@returns A list of labels
     */
    getAllOrgLabels(pageNumber) {
        return spPost(GroupSiteManager(this, "GetAllOrgLabels"), body({
            pageNumber,
        }));
    }
    /**
     * Gets the joined teams for the current user.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param getLogoData True to return logo data, otherwise false
     *@param forceCacheUpdate True to force cache update, otherwise false
     *@returns A list of teams with detailed information. The returned value is a JSON object which can be parsed
     */
    getCurrentUserJoinedTeams(getLogoData, forceCacheUpdate) {
        return spPost(GroupSiteManager(this, "GetCurrentUserJoinedTeams"), body({
            getLogoData,
            forceCacheUpdate,
        }));
    }
    /**
     * Gets the teams shared channels which current user is member of.
     * This method doesn't work in Azure AD application context
     *
     *@returns A list of teams shared channels with summary information (object id, acronym, banner color, ...).
      The returned value is a JSON object which can be parsed
     */
    getCurrentUserSharedChannelMemberGroups() {
        return spPost(GroupSiteManager(this, "GetCurrentUserSharedChannelMemberGroups"));
    }
    /**
     * Gets the teams which current user is member of.
     * This method doesn't work in Azure AD Application context
     *
     *@returns A list of teams with summary information (object id, acronym, banner color,...).
      The returned value is a JSON object which can be parsed
     */
    getCurrentUserTeamConnectedMemberGroups() {
        return spPost(GroupSiteManager(this, "GetCurrentUserTeamConnectedMemberGroups"));
    }
    /**
     * Gets information regarding Microsoft 365 group creation configuration
     *
     *@returns Information about current configuration
     */
    getGroupCreationContext() {
        return spGet(GroupSiteManager(this, "GetGroupCreationContext"));
    }
    /**
     * Gets information regarding site groupification configuration for the current site
     *
     *@returns Information about current configuration
     */
    getGroupSiteConversionData() {
        return spGet(GroupSiteManager(this, "GetGroupSiteConversionData"));
    }
    /**
     * Gets group-connected site creation status
     *
     *@param groupId Microsoft 365 group Id
     *@returns SharePoint site information and group Id (or current creation status)
     */
    getSiteStatus(groupId) {
        return spPost(GroupSiteManager(this, "GetSiteStatus"), body({
            groupId,
        }));
    }
    /**
     * Gets detailed information related to a team channel files URL.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@param channelId Teams's channel Id
     *@returns Stream information about team channel files URL. The returned value is a JSON object which can be parsed
     */
    getTeamChannelFilesUrl(teamId, channelId) {
        return spPost(GroupSiteManager(this, "GetTeamChannelFilesUrl").using(BufferParse()), body({
            teamId,
            channelId,
        }));
    }
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@param useStagingEndpoint Use staging endpoint or not
     *@returns Stream information about team's channels. The returned value is a JSON object which can be parsed
     */
    getTeamChannels(teamId, useStagingEndpoint) {
        return spPost(GroupSiteManager(this, "GetTeamChannels").using(BufferParse()), body({
            teamId,
            useStagingEndpoint,
        }));
    }
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@returns Detailed information about team's channels. The returned value is a JSON object which can be parsed
     */
    getTeamChannelsDirect(teamId) {
        return spPost(GroupSiteManager(this, "GetTeamChannelsDirect"), body({
            teamId,
        }));
    }
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@returns Detailed information about team's channels
     */
    getTeamChannelsEx(teamId) {
        return spPost(GroupSiteManager(this, "GetTeamChannelsEx"), body({
            teamId,
        }));
    }
    /**
     * Gets channels for a team based on site URL.
     * Works only with root site (neither private or shared channel sites).
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param siteUrl group-connected site URL
     *@returns Detailed information about team's channels
     */
    getTeamChannelsWithSiteUrl(siteUrl) {
        return spPost(GroupSiteManager(this, "GetTeamChannelsWithSiteUrl"), body({
            siteUrl,
        }));
    }
    /**
     * Gets shared channels membership for a user
     *
     *@param userName User principal name to get shared channels membership
     *@returns Information about user's shared channels. The returned value is a JSON object which can be parsed
     */
    getUserSharedChannelMemberGroups(userName) {
        return spPost(GroupSiteManager(this, "GetUserSharedChannelMemberGroups"), body({
            userName,
        }));
    }
    /**
     * Gets teams membership for a user
     *
     *@param userName User principal name to get teams membership
     *@returns Information about requested user's teams. The returned value is a JSON object which can be parsed
     */
    getUserTeamConnectedMemberGroups(userName) {
        return spPost(GroupSiteManager(this, "GetUserTeamConnectedMemberGroups"), body({
            userName,
        }));
    }
    /**
     * Gets a valid SharePoint site URL from an alias
     *
     *@param alias Alias for SharePoint site URL (also used when creating a Microsoft 365 group)
     *@param managedPath SharePoint managed path ("/sites" or "/teams", optional)
     *@param isTeamSite True if target is a group-connected site, otherwise false (optional)
     *@returns A valid SharePoint site URL
     */
    getValidSiteUrlFromAlias(alias, managedPath, isTeamSite) {
        return spPost(GroupSiteManager(this, "GetValidSiteUrlFromAlias"), body({
            alias,
            managedPath,
            isTeamSite,
        }));
    }
    /**
     * Indicates if the "Teamify" prompt is displayed or not on a group-connected site.
     * If no parameter is specified, the command will run in the current site context
     *
     *@param siteUrl Group-Connected site
     *@returns true if "Teamify" prompt is hidden, otherwise false
     */
    isTeamifyPromptHidden(siteUrl) {
        return spPost(GroupSiteManager(this, "IsTeamifyPromptHidden"), body({
            siteUrl,
        }));
    }
    /**
     * Gets the group-connected site default OneNote Notebook location
     *
     *@param groupId Id of the Microsoft 365 group
     *@returns URL of the group's default OneNote Notebook
     */
    notebook(groupId) {
        return spPost(GroupSiteManager(this, "Notebook"), body({
            groupId,
        }));
    }
    /**
     * Pins one or more new SharePoint tabs to a team's default channel.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param requestParams Parameters including the tabs data and the team's group Id
     *@returns Successful and failed results for the submitted tabs to add
     */
    pinToTeam(requestParams) {
        return spPost(GroupSiteManager(this, "PinToTeam"), body({
            requestParams,
        }));
    }
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroup")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call(method, args) {
        const query = GroupSiteManager(this, method);
        if (typeof args !== "undefined") {
            return spPost(query, body(args));
        }
        else {
            return spPost(query);
        }
    }
};
_GroupSiteManager = __decorate([
    defaultPath("_api/groupsitemanager")
], _GroupSiteManager);
const GroupSiteManager = spInvokableFactory(_GroupSiteManager);

;// ./node_modules/@pnp/sp/groupsitemanager/index.js



Reflect.defineProperty(SPFI.prototype, "groupSiteManager", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(GroupSiteManager);
    },
});

;// ./node_modules/@pnp/sp/hubsites/types.js




let _HubSites = class _HubSites extends _SPCollection {
    /**
     * Gets a Hub Site from the collection by id
     *
     * @param id The Id of the Hub Site
     */
    getById(id) {
        return HubSite(this, `GetById?hubSiteId='${id}'`);
    }
};
_HubSites = __decorate([
    defaultPath("_api/hubsites")
], _HubSites);

const HubSites = spInvokableFactory(_HubSites);
class _HubSite extends _SPInstance {
    /**
     * Gets the ISite instance associated with this hubsite
     */
    async getSite() {
        const d = await this.select("SiteUrl")();
        return Site([this, d.SiteUrl]);
    }
}
const HubSite = spInvokableFactory(_HubSite);

;// ./node_modules/@pnp/sp/hubsites/site.js


_Site.prototype.joinHubSite = async function (siteId) {
    await spPost(Site(this, `joinHubSite('${siteId}')`));
};
_Site.prototype.registerHubSite = async function () {
    await spPost(Site(this, "registerHubSite"));
};
_Site.prototype.unRegisterHubSite = async function () {
    await spPost(Site(this, "unRegisterHubSite"));
};

;// ./node_modules/@pnp/sp/hubsites/web.js


_Web.prototype.hubSiteData = async function (forceRefresh = false) {
    const data = await Web(this, `hubSiteData(${forceRefresh})`)();
    if (typeof data === "string") {
        return JSON.parse(data);
    }
    return data;
};
_Web.prototype.syncHubSiteTheme = function () {
    return spPost(Web(this, "syncHubSiteTheme"));
};

;// ./node_modules/@pnp/sp/hubsites/index.js





Reflect.defineProperty(SPFI.prototype, "hubSites", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(HubSites);
    },
});

;// ./node_modules/@pnp/sp/lists/index.js



;// ./node_modules/@pnp/sp/navigation/types.js






/**
 * Represents a collection of navigation nodes
 *
 */
class _NavigationNodes extends _SPCollection {
    /**
     * Gets a navigation node by id
     *
     * @param id The id of the node
     */
    getById(id) {
        return NavigationNode(this).concat(`(${id})`);
    }
    /**
     * Adds a new node to the collection
     *
     * @param title Display name of the node
     * @param url The url of the node
     * @param visible If true the node is visible, otherwise it is hidden (default: true)
     */
    async add(title, url, visible = true) {
        const postBody = body({
            IsVisible: visible,
            Title: title,
            Url: url,
        });
        return spPost(NavigationNodes(this, null), postBody);
    }
    /**
     * Moves a node to be after another node in the navigation
     *
     * @param nodeId Id of the node to move
     * @param previousNodeId Id of the node after which we move the node specified by nodeId
     */
    moveAfter(nodeId, previousNodeId) {
        const postBody = body({
            nodeId: nodeId,
            previousNodeId: previousNodeId,
        });
        return spPost(NavigationNodes(this, "MoveAfter"), postBody);
    }
}
const NavigationNodes = spInvokableFactory(_NavigationNodes);
/**
 * Represents an instance of a navigation node
 *
 */
class _NavigationNode extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
     * Represents the child nodes of this node
     */
    get children() {
        return NavigationNodes(this, "children");
    }
    /**
     * Updates this node
     *
     * @param properties Properties used to update this node
     */
    async update(properties) {
        const data = await spPostMerge(this, body(properties));
        return {
            data,
            node: this,
        };
    }
}
const NavigationNode = spInvokableFactory(_NavigationNode);
/**
 * Exposes the navigation components
 *
 */
let _Navigation = class _Navigation extends _SPQueryable {
    /**
     * Gets the quicklaunch navigation nodes for the current context
     *
     */
    get quicklaunch() {
        return NavigationNodes(this, "quicklaunch");
    }
    /**
     * Gets the top bar navigation nodes for the current context
     *
     */
    get topNavigationBar() {
        return NavigationNodes(this, "topnavigationbar");
    }
};
_Navigation = __decorate([
    defaultPath("navigation")
], _Navigation);

const Navigation = spInvokableFactory(_Navigation);
/**
 * Represents the top level navigation service
 */
class _NavigationService extends _SPQueryable {
    constructor(base = null, path) {
        super(base, path);
        this._url = combine(extractWebUrl(this._url), "_api/navigation", path);
    }
    /**
     * The MenuState service operation returns a Menu-State (dump) of a SiteMapProvider on a site.
     *
     * @param menuNodeKey MenuNode.Key of the start node within the SiteMapProvider If no key is provided the SiteMapProvider.RootNode will be the root of the menu state.
     * @param depth Depth of the dump. If no value is provided a dump with the depth of 10 is returned
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     * @param customProperties comma seperated list of custom properties to be returned.
     */
    getMenuState(menuNodeKey = null, depth = 10, mapProviderName = null, customProperties = null) {
        return spPost(NavigationService(this, "MenuState"), body({
            customProperties,
            depth,
            mapProviderName,
            menuNodeKey,
        }));
    }
    /**
     * Tries to get a SiteMapNode.Key for a given URL within a site collection.
     *
     * @param currentUrl A url representing the SiteMapNode
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     */
    getMenuNodeKey(currentUrl, mapProviderName = null) {
        return spPost(NavigationService(this, "MenuNodeKey"), body({
            currentUrl,
            mapProviderName,
        }));
    }
}
const NavigationService = (base, path) => new _NavigationService(base, path);

;// ./node_modules/@pnp/sp/navigation/web.js



addProp(_Web, "navigation", Navigation);

;// ./node_modules/@pnp/sp/navigation/index.js




Reflect.defineProperty(SPFI.prototype, "navigation", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(NavigationService);
    },
});

;// ./node_modules/@pnp/sp/profiles/types.js





class _Profiles extends _SPInstance {
    /**
     * Creates a new instance of the UserProfileQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user profile query
     */
    constructor(baseUrl, path = "_api/sp.userprofiles.peoplemanager") {
        super(baseUrl, path);
        this.clientPeoplePickerQuery = (new ClientPeoplePickerQuery(baseUrl)).using(AssignFrom(this));
        this.profileLoader = (new ProfileLoader(baseUrl)).using(AssignFrom(this));
    }
    /**
     * The url of the edit profile page for the current user
     */
    getEditProfileLink() {
        return Profiles(this, "EditProfileLink")();
    }
    /**
     * A boolean value that indicates whether the current user's "People I'm Following" list is public
     */
    getIsMyPeopleListPublic() {
        return Profiles(this, "IsMyPeopleListPublic")();
    }
    /**
     * A boolean value that indicates whether the current user is being followed by the specified user
     *
     * @param loginName The account name of the user
     */
    amIFollowedBy(loginName) {
        const q = Profiles(this, "amifollowedby(@v)");
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * A boolean value that indicates whether the current user is following the specified user
     *
     * @param loginName The account name of the user
     */
    amIFollowing(loginName) {
        const q = Profiles(this, "amifollowing(@v)");
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * Gets tags that the current user is following
     *
     * @param maxCount The maximum number of tags to retrieve (default is 20)
     */
    getFollowedTags(maxCount = 20) {
        return Profiles(this, `getfollowedtags(${maxCount})`)();
    }
    /**
     * Gets the people who are following the specified user
     *
     * @param loginName The account name of the user
     */
    getFollowersFor(loginName) {
        const q = Profiles(this, "getfollowersfor(@v)");
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * Gets the people who are following the current user
     *
     */
    get myFollowers() {
        return SPCollection(this, "getmyfollowers");
    }
    /**
     * Gets user properties for the current user
     *
     */
    get myProperties() {
        return Profiles(this, "getmyproperties");
    }
    /**
     * Gets the people who the specified user is following
     *
     * @param loginName The account name of the user.
     */
    getPeopleFollowedBy(loginName) {
        const q = Profiles(this, "getpeoplefollowedby(@v)");
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    getPropertiesFor(loginName) {
        const q = Profiles(this, "getpropertiesfor(@v)");
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * Gets the 20 most popular hash tags over the past week, sorted so that the most popular tag appears first
     *
     */
    get trendingTags() {
        const q = Profiles(this, null);
        q.concat(".gettrendingtags");
        return q();
    }
    /**
     * Gets the specified user profile property for the specified user
     *
     * @param loginName The account name of the user
     * @param propertyName The case-sensitive name of the property to get
     */
    getUserProfilePropertyFor(loginName, propertyName) {
        const q = Profiles(this, `getuserprofilepropertyfor(accountname=@v, propertyname='${propertyName}')`);
        q.query.set("@v", `'${loginName}'`);
        return q();
    }
    /**
     * Removes the specified user from the user's list of suggested people to follow
     *
     * @param loginName The account name of the user
     */
    hideSuggestion(loginName) {
        const q = Profiles(this, "hidesuggestion(@v)");
        q.query.set("@v", `'${loginName}'`);
        return spPost(q);
    }
    /**
     * A boolean values that indicates whether the first user is following the second user
     *
     * @param follower The account name of the user who might be following the followee
     * @param followee The account name of the user who might be followed by the follower
     */
    isFollowing(follower, followee) {
        const q = Profiles(this, null);
        q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
        q.query.set("@v", `'${follower}'`);
        q.query.set("@y", `'${followee}'`);
        return q();
    }
    /**
     * Uploads and sets the user profile picture (Users can upload a picture to their own profile only). Not supported for batching.
     *
     * @param profilePicSource Blob data representing the user's picture in BMP, JPEG, or PNG format of up to 4.76MB
     */
    setMyProfilePic(profilePicSource) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target.result;
                try {
                    await spPost(Profiles(this, "setmyprofilepicture"), { body: buffer });
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            };
            reader.readAsArrayBuffer(profilePicSource);
        });
    }
    /**
     * Sets single value User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValue Property value
     */
    setSingleValueProfileProperty(accountName, propertyName, propertyValue) {
        return spPost(Profiles(this, "SetSingleValueProfileProperty"), body({
            accountName,
            propertyName,
            propertyValue,
        }));
    }
    /**
     * Sets multi valued User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValues Property values
     */
    setMultiValuedProfileProperty(accountName, propertyName, propertyValues) {
        return spPost(Profiles(this, "SetMultiValuedProfileProperty"), body({
            accountName,
            propertyName,
            propertyValues,
        }));
    }
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(...emails) {
        return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
    }
    /**
     * Gets the user profile of the site owner
     *
     */
    get ownerUserProfile() {
        return this.profileLoader.ownerUserProfile;
    }
    /**
     * Gets the user profile for the current user
     */
    get userProfile() {
        return this.profileLoader.userProfile;
    }
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest = false) {
        return this.profileLoader.createPersonalSite(interactiveRequest);
    }
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private
     */
    shareAllSocialData(share) {
        return this.profileLoader.shareAllSocialData(share);
    }
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    clientPeoplePickerResolveUser(queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerResolveUser(queryParams);
    }
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    clientPeoplePickerSearchUser(queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerSearchUser(queryParams);
    }
}
const Profiles = spInvokableFactory(_Profiles);
let ProfileLoader = class ProfileLoader extends _SPQueryable {
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only) Doesn't support batching
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(emails) {
        return spPost(ProfileLoaderFactory(this, "createpersonalsiteenqueuebulk"), body({ "emailIDs": emails }));
    }
    /**
     * Gets the user profile of the site owner.
     *
     */
    get ownerUserProfile() {
        return spPost(this.getParent(ProfileLoaderFactory, "_api/sp.userprofiles.profileloader.getowneruserprofile"));
    }
    /**
     * Gets the user profile of the current user.
     *
     */
    get userProfile() {
        return spPost(ProfileLoaderFactory(this, "getuserprofile"));
    }
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest = false) {
        return spPost(ProfileLoaderFactory(this, `getuserprofile/createpersonalsiteenque(${interactiveRequest})`));
    }
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    shareAllSocialData(share) {
        return spPost(ProfileLoaderFactory(this, `getuserprofile/shareallsocialdata(${share})`));
    }
};
ProfileLoader = __decorate([
    defaultPath("_api/sp.userprofiles.profileloader.getprofileloader")
], ProfileLoader);
const ProfileLoaderFactory = (baseUrl, path) => {
    return new ProfileLoader(baseUrl, path);
};
let ClientPeoplePickerQuery = class ClientPeoplePickerQuery extends _SPQueryable {
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    async clientPeoplePickerResolveUser(queryParams) {
        const q = ClientPeoplePickerFactory(this, null);
        q.concat(".clientpeoplepickerresolveuser");
        const res = await spPost(q, this.getBodyFrom(queryParams));
        return JSON.parse(typeof res === "object" ? res.ClientPeoplePickerResolveUser : res);
    }
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    async clientPeoplePickerSearchUser(queryParams) {
        const q = ClientPeoplePickerFactory(this, null);
        q.concat(".clientpeoplepickersearchuser");
        const res = await spPost(q, this.getBodyFrom(queryParams));
        return JSON.parse(typeof res === "object" ? res.ClientPeoplePickerSearchUser : res);
    }
    /**
     * Creates ClientPeoplePickerQueryParameters request body
     *
     * @param queryParams The query parameters to create request body
     */
    getBodyFrom(queryParams) {
        return body({ queryParams });
    }
};
ClientPeoplePickerQuery = __decorate([
    defaultPath("_api/sp.ui.applicationpages.clientpeoplepickerwebserviceinterface")
], ClientPeoplePickerQuery);
const ClientPeoplePickerFactory = (baseUrl, path) => {
    return new ClientPeoplePickerQuery(baseUrl, path);
};
/**
 * Specifies the originating zone of a request received.
 */
var UrlZone;
(function (UrlZone) {
    /**
     * Specifies the default zone used for requests unless another zone is specified.
     */
    UrlZone[UrlZone["DefaultZone"] = 0] = "DefaultZone";
    /**
     * Specifies an intranet zone.
     */
    UrlZone[UrlZone["Intranet"] = 1] = "Intranet";
    /**
     * Specifies an Internet zone.
     */
    UrlZone[UrlZone["Internet"] = 2] = "Internet";
    /**
     * Specifies a custom zone.
     */
    UrlZone[UrlZone["Custom"] = 3] = "Custom";
    /**
     * Specifies an extranet zone.
     */
    UrlZone[UrlZone["Extranet"] = 4] = "Extranet";
})(UrlZone || (UrlZone = {}));

;// ./node_modules/@pnp/sp/profiles/index.js



Reflect.defineProperty(SPFI.prototype, "profiles", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Profiles);
    },
});

;// ./node_modules/@pnp/sp/publishing-sitepageservice/types.js

class _SitePageService extends _SPInstance {
    constructor(baseUrl, path = "_api/SP.Publishing.SitePageService") {
        super(baseUrl, path);
    }
    /**
    * Gets current user unified group memberships
    */
    getCurrentUserMemberships() {
        const q = SitePageService(this, null);
        q.concat(".GetCurrentUserMemberships");
        return q();
    }
}
const SitePageService = spInvokableFactory(_SitePageService);

;// ./node_modules/@pnp/sp/publishing-sitepageservice/index.js



Reflect.defineProperty(SPFI.prototype, "publishingSitePageService", {
    get: function () {
        return this.create(SitePageService);
    },
});

;// ./node_modules/@pnp/sp/regional-settings/types.js




let _RegionalSettings = class _RegionalSettings extends _SPInstance {
    /**
     * Gets time zone
     */
    get timeZone() {
        return TimeZone(this);
    }
    /**
     * Gets time zones
     */
    get timeZones() {
        return TimeZones(this);
    }
    /**
     * Gets the collection of languages used in a server farm.
     */
    async getInstalledLanguages() {
        const results = await SPCollection(this, "installedlanguages")();
        return results.Items;
    }
};
_RegionalSettings = __decorate([
    defaultPath("regionalsettings")
], _RegionalSettings);

const RegionalSettings = spInvokableFactory(_RegionalSettings);
let _TimeZone = class _TimeZone extends _SPInstance {
    /**
     * Gets an Local Time by UTC Time
     *
     * @param utcTime UTC Time as Date or ISO String
     */
    async utcToLocalTime(utcTime) {
        let dateIsoString;
        if (typeof utcTime === "string") {
            dateIsoString = utcTime;
        }
        else {
            dateIsoString = utcTime.toISOString();
        }
        const res = await spPost(TimeZone(this, `utctolocaltime('${dateIsoString}')`));
        return hOP(res, "UTCToLocalTime") ? res.UTCToLocalTime : res;
    }
    /**
     * Gets an UTC Time by Local Time
     *
     * @param localTime Local Time as Date or ISO String
     */
    async localTimeToUTC(localTime) {
        let dateIsoString;
        if (typeof localTime === "string") {
            dateIsoString = localTime;
        }
        else {
            dateIsoString = util_dateAdd(localTime, "minute", localTime.getTimezoneOffset() * -1).toISOString();
        }
        const res = await spPost(TimeZone(this, `localtimetoutc('${dateIsoString}')`));
        return hOP(res, "LocalTimeToUTC") ? res.LocalTimeToUTC : res;
    }
};
_TimeZone = __decorate([
    defaultPath("timezone")
], _TimeZone);

const TimeZone = spInvokableFactory(_TimeZone);
let _TimeZones = class _TimeZones extends _SPCollection {
    /**
     * Gets an TimeZone by id (see: https://msdn.microsoft.com/en-us/library/office/jj247008.aspx)
     *
     * @param id The integer id of the timezone to retrieve
     */
    getById(id) {
        return spPost(TimeZones(this, `GetById(${id})`));
    }
};
_TimeZones = __decorate([
    defaultPath("timezones")
], _TimeZones);

const TimeZones = spInvokableFactory(_TimeZones);

;// ./node_modules/@pnp/sp/regional-settings/funcs.js


function getValueForUICultureBinder(propName) {
    return function (cultureName) {
        return spPost(SPQueryable(this, `${propName}/getValueForUICulture`), body({ cultureName }));
    };
}

;// ./node_modules/@pnp/sp/regional-settings/web.js




addProp(_Web, "regionalSettings", RegionalSettings);
_Web.prototype.titleResource = getValueForUICultureBinder("titleResource");
_Web.prototype.descriptionResource = getValueForUICultureBinder("descriptionResource");

;// ./node_modules/@pnp/sp/user-custom-actions/types.js




let _UserCustomActions = class _UserCustomActions extends _SPCollection {
    /**
     * Returns the user custom action with the specified id
     *
     * @param id The GUID id of the user custom action to retrieve
     */
    getById(id) {
        return UserCustomAction(this).concat(`('${id}')`);
    }
    /**
     * Creates a user custom action
     *
     * @param properties The information object of property names and values which define the new user custom action
     */
    async add(properties) {
        const data = await spPost(this, body(properties));
        return {
            action: this.getById(data.Id),
            data,
        };
    }
    /**
     * Deletes all user custom actions in the collection
     */
    clear() {
        return spPost(UserCustomActions(this, "clear"));
    }
};
_UserCustomActions = __decorate([
    defaultPath("usercustomactions")
], _UserCustomActions);

const UserCustomActions = spInvokableFactory(_UserCustomActions);
class _UserCustomAction extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
    * Updates this user custom action with the supplied properties
    *
    * @param properties An information object of property names and values to update for this user custom action
    */
    async update(props) {
        const data = await spPostMerge(this, body(props));
        return {
            data,
            action: this,
        };
    }
}
const UserCustomAction = spInvokableFactory(_UserCustomAction);
var UserCustomActionRegistrationType;
(function (UserCustomActionRegistrationType) {
    UserCustomActionRegistrationType[UserCustomActionRegistrationType["None"] = 0] = "None";
    UserCustomActionRegistrationType[UserCustomActionRegistrationType["List"] = 1] = "List";
    UserCustomActionRegistrationType[UserCustomActionRegistrationType["ContentType"] = 2] = "ContentType";
    UserCustomActionRegistrationType[UserCustomActionRegistrationType["ProgId"] = 3] = "ProgId";
    UserCustomActionRegistrationType[UserCustomActionRegistrationType["FileType"] = 4] = "FileType";
})(UserCustomActionRegistrationType || (UserCustomActionRegistrationType = {}));
var UserCustomActionScope;
(function (UserCustomActionScope) {
    UserCustomActionScope[UserCustomActionScope["Unknown"] = 0] = "Unknown";
    UserCustomActionScope[UserCustomActionScope["Site"] = 2] = "Site";
    UserCustomActionScope[UserCustomActionScope["Web"] = 3] = "Web";
    UserCustomActionScope[UserCustomActionScope["List"] = 4] = "List";
})(UserCustomActionScope || (UserCustomActionScope = {}));

;// ./node_modules/@pnp/sp/regional-settings/user-custom-actions.js


_UserCustomAction.prototype.titleResource = getValueForUICultureBinder("titleResource");
_UserCustomAction.prototype.descriptionResource = getValueForUICultureBinder("descriptionResource");

;// ./node_modules/@pnp/sp/regional-settings/list.js


_List.prototype.titleResource = getValueForUICultureBinder("titleResource");
_List.prototype.descriptionResource = getValueForUICultureBinder("descriptionResource");

;// ./node_modules/@pnp/sp/regional-settings/field.js


_Field.prototype.titleResource = getValueForUICultureBinder("titleResource");
_Field.prototype.descriptionResource = getValueForUICultureBinder("descriptionResource");

;// ./node_modules/@pnp/sp/regional-settings/content-type.js


_ContentType.prototype.titleResource = getValueForUICultureBinder("nameResource");
_ContentType.prototype.descriptionResource = getValueForUICultureBinder("descriptionResource");

;// ./node_modules/@pnp/sp/regional-settings/index.js







;// ./node_modules/@pnp/sp/related-items/types.js





let _RelatedItemManager = class _RelatedItemManager extends _SPQueryable {
    getRelatedItems(sourceListName, sourceItemId) {
        const query = RelatedItemManager(this);
        query.concat(".GetRelatedItems");
        return spPost(query, body({
            SourceItemID: sourceItemId,
            SourceListName: sourceListName,
        }));
    }
    getPageOneRelatedItems(sourceListName, sourceItemId) {
        const query = RelatedItemManager(this);
        query.concat(".GetPageOneRelatedItems");
        return spPost(query, body({
            SourceItemID: sourceItemId,
            SourceListName: sourceListName,
        }));
    }
    addSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemID, targetWebUrl, tryAddReverseLink = false) {
        const query = RelatedItemManager(this);
        query.concat(".AddSingleLink");
        return spPost(query, body({
            SourceItemID: sourceItemId,
            SourceListName: sourceListName,
            SourceWebUrl: sourceWebUrl,
            TargetItemID: targetItemID,
            TargetListName: targetListName,
            TargetWebUrl: targetWebUrl,
            TryAddReverseLink: tryAddReverseLink,
        }));
    }
    addSingleLinkToUrl(sourceListName, sourceItemId, targetItemUrl, tryAddReverseLink = false) {
        const query = RelatedItemManager(this);
        query.concat(".AddSingleLinkToUrl");
        return spPost(query, body({
            SourceItemID: sourceItemId,
            SourceListName: sourceListName,
            TargetItemUrl: targetItemUrl,
            TryAddReverseLink: tryAddReverseLink,
        }));
    }
    addSingleLinkFromUrl(sourceItemUrl, targetListName, targetItemId, tryAddReverseLink = false) {
        const query = RelatedItemManager(this);
        query.concat(".AddSingleLinkFromUrl");
        return spPost(query, body({
            SourceItemUrl: sourceItemUrl,
            TargetItemID: targetItemId,
            TargetListName: targetListName,
            TryAddReverseLink: tryAddReverseLink,
        }));
    }
    deleteSingleLink(sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemId, targetWebUrl, tryDeleteReverseLink = false) {
        const query = RelatedItemManager(this);
        query.concat(".DeleteSingleLink");
        return spPost(query, body({
            SourceItemID: sourceItemId,
            SourceListName: sourceListName,
            SourceWebUrl: sourceWebUrl,
            TargetItemID: targetItemId,
            TargetListName: targetListName,
            TargetWebUrl: targetWebUrl,
            TryDeleteReverseLink: tryDeleteReverseLink,
        }));
    }
};
_RelatedItemManager = __decorate([
    defaultPath("_api/SP.RelatedItemManager")
], _RelatedItemManager);

const RelatedItemManager = (base) => {
    if (typeof base === "string") {
        return new _RelatedItemManager(extractWebUrl(base));
    }
    return new _RelatedItemManager([base, extractWebUrl(base.toUrl())]);
};

;// ./node_modules/@pnp/sp/related-items/web.js


Reflect.defineProperty(_Web.prototype, "relatedItems", {
    configurable: true,
    enumerable: true,
    get: function () {
        return RelatedItemManager(this);
    },
});

;// ./node_modules/@pnp/sp/related-items/index.js



;// ./node_modules/@pnp/sp/search/query.js
var _Search_1;





const funcs = new Map([
    ["text", "Querytext"],
    ["template", "QueryTemplate"],
    ["sourceId", "SourceId"],
    ["trimDuplicatesIncludeId", ""],
    ["startRow", ""],
    ["rowLimit", ""],
    ["rankingModelId", ""],
    ["rowsPerPage", ""],
    ["selectProperties", ""],
    ["culture", ""],
    ["timeZoneId", ""],
    ["refinementFilters", ""],
    ["refiners", ""],
    ["hiddenConstraints", ""],
    ["sortList", ""],
    ["timeout", ""],
    ["hithighlightedProperties", ""],
    ["clientType", ""],
    ["personalizationData", ""],
    ["resultsURL", ""],
    ["queryTag", ""],
    ["properties", ""],
    ["queryTemplatePropertiesUrl", ""],
    ["reorderingRules", ""],
    ["hitHighlightedMultivaluePropertyLimit", ""],
    ["collapseSpecification", ""],
    ["uiLanguage", ""],
    ["desiredSnippetLength", ""],
    ["maxSnippetLength", ""],
    ["summaryLength", ""],
]);
const props = new Map([]);
function toPropCase(str) {
    return str.replace(/^(.)/, ($1) => $1.toUpperCase());
}
/**
 * Creates a new instance of the SearchQueryBuilder
 *
 * @param queryText Initial query text
 * @param _query Any initial query configuration
 */
function SearchQueryBuilder(queryText = "", _query = {}) {
    return new Proxy({
        query: Object.assign({
            Querytext: queryText,
        }, _query),
    }, {
        get(self, propertyKey, proxy) {
            const pk = propertyKey.toString();
            if (pk === "toSearchQuery") {
                return () => self.query;
            }
            if (funcs.has(pk)) {
                return (...value) => {
                    const mappedPk = funcs.get(pk);
                    self.query[mappedPk.length > 0 ? mappedPk : toPropCase(pk)] = value.length > 1 ? value : value[0];
                    return proxy;
                };
            }
            const propKey = props.has(pk) ? props.get(pk) : toPropCase(pk);
            self.query[propKey] = true;
            return proxy;
        },
    });
}
/**
 * Describes the search API
 *
 */
let _Search = _Search_1 = class _Search extends _SPInstance {
    /**
     * @returns Promise
     */
    async run(queryInit) {
        const query = this.parseQuery(queryInit);
        const postBody = body({
            request: {
                ...query,
                HitHighlightedProperties: this.fixArrProp(query.HitHighlightedProperties),
                Properties: this.fixArrProp(query.Properties),
                RefinementFilters: this.fixArrProp(query.RefinementFilters),
                ReorderingRules: this.fixArrProp(query.ReorderingRules),
                SelectProperties: this.fixArrProp(query.SelectProperties),
                SortList: this.fixArrProp(query.SortList),
            },
        });
        const poster = new _Search_1([this, this.parentUrl]);
        poster.using(CacheAlways(), CacheKey(util_getHashCode(JSON.stringify(postBody)).toString()));
        const data = await spPost(poster, postBody);
        // Create search instance copy for SearchResult's getPage request.
        return new SearchResults(data, new _Search_1([this, this.parentUrl]), query);
    }
    /**
     * Fix array property
     *
     * @param prop property to fix for container struct
     */
    fixArrProp(prop) {
        return typeof prop === "undefined" ? [] : util_isArray(prop) ? prop : [prop];
    }
    /**
     * Translates one of the query initializers into a SearchQuery instance
     *
     * @param query
     */
    parseQuery(query) {
        let finalQuery;
        if (typeof query === "string") {
            finalQuery = { Querytext: query };
        }
        else if (query.toSearchQuery) {
            finalQuery = query.toSearchQuery();
        }
        else {
            finalQuery = query;
        }
        return finalQuery;
    }
};
_Search = _Search_1 = __decorate([
    defaultPath("_api/search/postquery"),
    invokable(function (init) {
        return this.run(init);
    })
], _Search);

const Search = spInvokableFactory(_Search);
class SearchResults {
    constructor(rawResponse, _search, _query, _raw = null, _primary = null) {
        this._search = _search;
        this._query = _query;
        this._raw = _raw;
        this._primary = _primary;
        this._raw = rawResponse.postquery ? rawResponse.postquery : rawResponse;
    }
    get ElapsedTime() {
        var _a;
        return ((_a = this === null || this === void 0 ? void 0 : this.RawSearchResults) === null || _a === void 0 ? void 0 : _a.ElapsedTime) || 0;
    }
    get RowCount() {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.RawSearchResults) === null || _a === void 0 ? void 0 : _a.PrimaryQueryResult) === null || _b === void 0 ? void 0 : _b.RelevantResults) === null || _c === void 0 ? void 0 : _c.RowCount) || 0;
    }
    get TotalRows() {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.RawSearchResults) === null || _a === void 0 ? void 0 : _a.PrimaryQueryResult) === null || _b === void 0 ? void 0 : _b.RelevantResults) === null || _c === void 0 ? void 0 : _c.TotalRows) || 0;
    }
    get TotalRowsIncludingDuplicates() {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.RawSearchResults) === null || _a === void 0 ? void 0 : _a.PrimaryQueryResult) === null || _b === void 0 ? void 0 : _b.RelevantResults) === null || _c === void 0 ? void 0 : _c.TotalRowsIncludingDuplicates) || 0;
    }
    get RawSearchResults() {
        return this._raw;
    }
    get PrimarySearchResults() {
        var _a, _b, _c, _d;
        if (this._primary === null) {
            this._primary = this.formatSearchResults(((_d = (_c = (_b = (_a = this._raw) === null || _a === void 0 ? void 0 : _a.PrimaryQueryResult) === null || _b === void 0 ? void 0 : _b.RelevantResults) === null || _c === void 0 ? void 0 : _c.Table) === null || _d === void 0 ? void 0 : _d.Rows) || null);
        }
        return this._primary;
    }
    /**
     * Gets a page of results
     *
     * @param pageNumber Index of the page to return. Used to determine StartRow
     * @param pageSize Optional, items per page (default = 10)
     */
    getPage(pageNumber, pageSize) {
        // if we got all the available rows we don't have another page
        if (this.TotalRows < this.RowCount) {
            return Promise.resolve(null);
        }
        // if pageSize is supplied, then we use that regardless of any previous values
        // otherwise get the previous RowLimit or default to 10
        const rows = pageSize !== undefined ? pageSize : hOP(this._query, "RowLimit") ? this._query.RowLimit : 10;
        const query = {
            ...this._query,
            RowLimit: rows,
            StartRow: rows * (pageNumber - 1),
        };
        // we have reached the end
        if (query.StartRow > this.TotalRows) {
            return Promise.resolve(null);
        }
        return this._search.run(query);
    }
    /**
     * Formats a search results array
     *
     * @param rawResults The array to process
     */
    formatSearchResults(rawResults) {
        const results = new Array();
        if (typeof (rawResults) === "undefined" || rawResults == null) {
            return [];
        }
        const tempResults = rawResults.results ? rawResults.results : rawResults;
        for (const tempResult of tempResults) {
            const cells = tempResult.Cells.results ? tempResult.Cells.results : tempResult.Cells;
            results.push(cells.reduce((res, cell) => {
                res[cell.Key] = cell.Value;
                return res;
            }, {}));
        }
        return results;
    }
}

;// ./node_modules/@pnp/sp/search/suggest.js




let _Suggest = class _Suggest extends _SPInstance {
    async run(query) {
        this.mapQueryToQueryString(query);
        const response = await this();
        const mapper = hOP(response, "suggest") ? (s_1) => response.suggest[s_1].results : (s_2) => response[s_2];
        return {
            PeopleNames: mapper("PeopleNames"),
            PersonalResults: mapper("PersonalResults"),
            Queries: mapper("Queries"),
        };
    }
    mapQueryToQueryString(query) {
        const setProp = (q) => (checkProp) => (sp) => {
            if (hOP(q, checkProp)) {
                this.query.set(sp, q[checkProp].toString());
            }
        };
        this.query.set("querytext", `'${query.querytext}'`);
        const querySetter = setProp(query);
        querySetter("count")("inumberofquerysuggestions");
        querySetter("personalCount")("inumberofresultsuggestions");
        querySetter("preQuery")("fprequerysuggestions");
        querySetter("hitHighlighting")("fhithighlighting");
        querySetter("capitalize")("fcapitalizefirstletters");
        querySetter("culture")("culture");
        querySetter("stemming")("enablestemming");
        querySetter("includePeople")("showpeoplenamesuggestions");
        querySetter("queryRules")("enablequeryrules");
        querySetter("prefixMatch")("fprefixmatchallterms");
    }
};
_Suggest = __decorate([
    defaultPath("_api/search/suggest")
], _Suggest);

const Suggest = spInvokableFactory(_Suggest);

;// ./node_modules/@pnp/sp/search/types.js
/**
 * defines the SortDirection enum
 */
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
})(SortDirection || (SortDirection = {}));
/**
 * defines the ReorderingRuleMatchType  enum
 */
var ReorderingRuleMatchType;
(function (ReorderingRuleMatchType) {
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
    ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
})(ReorderingRuleMatchType || (ReorderingRuleMatchType = {}));
/**
 * Specifies the type value for the property
 */
var QueryPropertyValueType;
(function (QueryPropertyValueType) {
    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
    QueryPropertyValueType[QueryPropertyValueType["Int32Type"] = 2] = "Int32Type";
    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
})(QueryPropertyValueType || (QueryPropertyValueType = {}));
class SearchBuiltInSourceId {
}
SearchBuiltInSourceId.Documents = "e7ec8cee-ded8-43c9-beb5-436b54b31e84";
SearchBuiltInSourceId.ItemsMatchingContentType = "5dc9f503-801e-4ced-8a2c-5d1237132419";
SearchBuiltInSourceId.ItemsMatchingTag = "e1327b9c-2b8c-4b23-99c9-3730cb29c3f7";
SearchBuiltInSourceId.ItemsRelatedToCurrentUser = "48fec42e-4a92-48ce-8363-c2703a40e67d";
SearchBuiltInSourceId.ItemsWithSameKeywordAsThisItem = "5c069288-1d17-454a-8ac6-9c642a065f48";
SearchBuiltInSourceId.LocalPeopleResults = "b09a7990-05ea-4af9-81ef-edfab16c4e31";
SearchBuiltInSourceId.LocalReportsAndDataResults = "203fba36-2763-4060-9931-911ac8c0583b";
SearchBuiltInSourceId.LocalSharePointResults = "8413cd39-2156-4e00-b54d-11efd9abdb89";
SearchBuiltInSourceId.LocalVideoResults = "78b793ce-7956-4669-aa3b-451fc5defebf";
SearchBuiltInSourceId.Pages = "5e34578e-4d08-4edc-8bf3-002acf3cdbcc";
SearchBuiltInSourceId.Pictures = "38403c8c-3975-41a8-826e-717f2d41568a";
SearchBuiltInSourceId.Popular = "97c71db1-58ce-4891-8b64-585bc2326c12";
SearchBuiltInSourceId.RecentlyChangedItems = "ba63bbae-fa9c-42c0-b027-9a878f16557c";
SearchBuiltInSourceId.RecommendedItems = "ec675252-14fa-4fbe-84dd-8d098ed74181";
SearchBuiltInSourceId.Wiki = "9479bf85-e257-4318-b5a8-81a180f5faa1";

;// ./node_modules/@pnp/sp/search/index.js






SPFI.prototype.search = function (query) {
    return (new _Search(this._root)).run(query);
};
SPFI.prototype.searchSuggest = function (query) {
    return (new _Suggest(this._root)).run(typeof query === "string" ? { querytext: query } : query);
};

;// ./node_modules/@pnp/sp/site-users/types.js





let _SiteUsers = class _SiteUsers extends _SPCollection {
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user to retrieve
     */
    getById(id) {
        return SiteUser(this, `getById(${id})`);
    }
    /**
     * Gets a user from the collection by email
     *
     * @param email The email address of the user to retrieve
     */
    getByEmail(email) {
        return SiteUser(this, `getByEmail('${email}')`);
    }
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The login name of the user to retrieve
     *   e.g. SharePoint Online: 'i:0#.f|membership|user@domain'
     */
    getByLoginName(loginName) {
        return SiteUser(this).concat(`('!@v::${loginName}')`);
    }
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user to remove
     */
    removeById(id) {
        return spPost(SiteUsers(this, `removeById(${id})`));
    }
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user to remove
     */
    removeByLoginName(loginName) {
        const o = SiteUsers(this, "removeByLoginName(@v)");
        o.query.set("@v", `'${loginName}'`);
        return spPost(o);
    }
    /**
     * Adds a user to a site collection
     *
     * @param loginName The login name of the user to add  to a site collection
     *
     */
    async add(loginName) {
        await spPost(this, body({ LoginName: loginName }));
        return this.getByLoginName(loginName);
    }
};
_SiteUsers = __decorate([
    defaultPath("siteusers")
], _SiteUsers);

const SiteUsers = spInvokableFactory(_SiteUsers);
/**
 * Describes a single user
 *
 */
class _SiteUser extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
     * Gets the groups for this user
     *
     */
    get groups() {
        return SiteGroups(this, "groups");
    }
    /**
     * Updates this user
     *
     * @param props Group properties to update
     */
    async update(props) {
        return spPostMerge(this, body(props));
    }
}
const SiteUser = spInvokableFactory(_SiteUser);

;// ./node_modules/@pnp/sp/site-groups/types.js





let _SiteGroups = class _SiteGroups extends _SPCollection {
    /**
     * Gets a group from the collection by id
     *
     * @param id The id of the group to retrieve
     */
    getById(id) {
        return SiteGroup(this).concat(`(${id})`);
    }
    /**
     * Adds a new group to the site collection
     *
     * @param properties The group properties object of property names and values to be set for the group
     */
    async add(properties) {
        return spPost(this, body(properties));
    }
    /**
     * Gets a group from the collection by name
     *
     * @param groupName The name of the group to retrieve
     */
    getByName(groupName) {
        return SiteGroup(this, `getByName('${groupName}')`);
    }
    /**
     * Removes the group with the specified member id from the collection
     *
     * @param id The id of the group to remove
     */
    removeById(id) {
        return spPost(SiteGroups(this, `removeById('${id}')`));
    }
    /**
     * Removes the cross-site group with the specified name from the collection
     *
     * @param loginName The name of the group to remove
     */
    removeByLoginName(loginName) {
        return spPost(SiteGroups(this, `removeByLoginName('${loginName}')`));
    }
};
_SiteGroups = __decorate([
    defaultPath("sitegroups")
], _SiteGroups);

const SiteGroups = spInvokableFactory(_SiteGroups);
class _SiteGroup extends _SPInstance {
    /**
     * Gets the users for this group
     *
     */
    get users() {
        return SiteUsers(this, "users");
    }
    /**
    * @param props Group properties to update
    */
    async update(props) {
        return spPostMerge(this, body(props));
    }
    /**
     * Set the owner of a group using a user id
     * @param userId the id of the user that will be set as the owner of the current group
     */
    setUserAsOwner(userId) {
        return spPost(SiteGroup(this, `SetUserAsOwner(${userId})`));
    }
}
const SiteGroup = spInvokableFactory(_SiteGroup);

;// ./node_modules/@pnp/sp/security/types.js






/**
 * Describes a set of role assignments for the current scope
 *
 */
let _RoleAssignments = class _RoleAssignments extends _SPCollection {
    /**
     * Gets the role assignment associated with the specified principal id from the collection.
     *
     * @param id The id of the role assignment
     */
    getById(id) {
        return RoleAssignment(this).concat(`(${id})`);
    }
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection
     *
     * @param principalId The id of the user or group to assign permissions to
     * @param roleDefId The id of the role definition that defines the permissions to assign
     *
     */
    async add(principalId, roleDefId) {
        await spPost(RoleAssignments(this, `addroleassignment(principalid=${principalId}, roledefid=${roleDefId})`));
    }
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The id of the user or group in the role assignment
     * @param roleDefId The id of the role definition in the role assignment
     *
     */
    async remove(principalId, roleDefId) {
        await spPost(RoleAssignments(this, `removeroleassignment(principalid=${principalId}, roledefid=${roleDefId})`));
    }
};
_RoleAssignments = __decorate([
    defaultPath("roleassignments")
], _RoleAssignments);

const RoleAssignments = spInvokableFactory(_RoleAssignments);
/**
 * Describes a role assignment
 *
 */
class _RoleAssignment extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
     * Gets the groups that directly belong to the access control list (ACL) for this securable object
     *
     */
    get groups() {
        return SiteGroups(this, "groups");
    }
    /**
     * Gets the role definition bindings for this role assignment
     *
     */
    get bindings() {
        return SPCollection(this, "roledefinitionbindings");
    }
}
const RoleAssignment = spInvokableFactory(_RoleAssignment);
/**
 * Describes a collection of role definitions
 *
 */
let _RoleDefinitions = class _RoleDefinitions extends _SPCollection {
    /**
     * Gets the role definition with the specified id from the collection
     *
     * @param id The id of the role definition
     *
     */
    getById(id) {
        return RoleDefinition(this, `getById(${id})`);
    }
    /**
     * Gets the role definition with the specified name
     *
     * @param name The name of the role definition
     *
     */
    getByName(name) {
        return RoleDefinition(this, `getbyname('${name}')`);
    }
    /**
     * Gets the role definition with the specified role type
     *
     * @param roleTypeKind The roletypekind of the role definition (None=0, Guest=1, Reader=2, Contributor=3, WebDesigner=4, Administrator=5, Editor=6, System=7)
     *
     */
    getByType(roleTypeKind) {
        return RoleDefinition(this, `getbytype(${roleTypeKind})`);
    }
    /**
     * Creates a role definition
     *
     * @param name The new role definition's name
     * @param description The new role definition's description
     * @param order The order in which the role definition appears
     * @param basePermissions The permissions mask for this role definition, high and low values need to be converted to string
     *
     */
    async add(name, description, order, basePermissions) {
        const postBody = body({
            BasePermissions: { "High": basePermissions.High.toString(), "Low": basePermissions.Low.toString() },
            Description: description,
            Name: name,
            Order: order,
        });
        // __metadata: { "type": "SP.RoleDefinition" },
        const data = await spPost(this, postBody);
        return {
            data: data,
            definition: this.getById(data.Id),
        };
    }
};
_RoleDefinitions = __decorate([
    defaultPath("roledefinitions")
], _RoleDefinitions);

const RoleDefinitions = spInvokableFactory(_RoleDefinitions);
/**
 * Describes a role definition
 *
 */
class _RoleDefinition extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    /**
     * Updates this role definition with the supplied properties
     *
     * @param properties A plain object hash of values to update for the role definition
     */
    async update(properties) {
        const s = ["BasePermissions"];
        if (hOP(properties, s[0]) !== undefined) {
            const bpObj = properties[s[0]];
            bpObj.High = bpObj.High.toString();
            bpObj.Low = bpObj.Low.toString();
        }
        const data = await spPostMerge(this, body(properties));
        let definition = this;
        if (hOP(properties, "Name")) {
            const parent = this.getParent(RoleDefinitions);
            definition = parent.getByName(properties.Name);
        }
        return {
            data,
            definition,
        };
    }
}
const RoleDefinition = spInvokableFactory(_RoleDefinition);
var PermissionKind;
(function (PermissionKind) {
    /**
     * Has no permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["EmptyMask"] = 0] = "EmptyMask";
    /**
     * View items in lists, documents in document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["ViewListItems"] = 1] = "ViewListItems";
    /**
     * Add items to lists, documents to document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["AddListItems"] = 2] = "AddListItems";
    /**
     * Edit items in lists, edit documents in document libraries, edit Web discussion comments
     * in documents, and customize Web Part Pages in document libraries.
     */
    PermissionKind[PermissionKind["EditListItems"] = 3] = "EditListItems";
    /**
     * Delete items from a list, documents from a document library, and Web discussion
     * comments in documents.
     */
    PermissionKind[PermissionKind["DeleteListItems"] = 4] = "DeleteListItems";
    /**
     * Approve a minor version of a list item or document.
     */
    PermissionKind[PermissionKind["ApproveItems"] = 5] = "ApproveItems";
    /**
     * View the source of documents with server-side file handlers.
     */
    PermissionKind[PermissionKind["OpenItems"] = 6] = "OpenItems";
    /**
     * View past versions of a list item or document.
     */
    PermissionKind[PermissionKind["ViewVersions"] = 7] = "ViewVersions";
    /**
     * Delete past versions of a list item or document.
     */
    PermissionKind[PermissionKind["DeleteVersions"] = 8] = "DeleteVersions";
    /**
     * Discard or check in a document which is checked out to another user.
     */
    PermissionKind[PermissionKind["CancelCheckout"] = 9] = "CancelCheckout";
    /**
     * Create, change, and delete personal views of lists.
     */
    PermissionKind[PermissionKind["ManagePersonalViews"] = 10] = "ManagePersonalViews";
    /**
     * Create and delete lists, add or remove columns in a list, and add or remove public views of a list.
     */
    PermissionKind[PermissionKind["ManageLists"] = 12] = "ManageLists";
    /**
     * View forms, views, and application pages, and enumerate lists.
     */
    PermissionKind[PermissionKind["ViewFormPages"] = 13] = "ViewFormPages";
    /**
     * Make content of a list or document library retrieveable for anonymous users through SharePoint search.
     * The list permissions in the site do not change.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessList"] = 14] = "AnonymousSearchAccessList";
    /**
     * Allow users to open a Site, list, or folder to access items inside that container.
     */
    PermissionKind[PermissionKind["Open"] = 17] = "Open";
    /**
     * View pages in a Site.
     */
    PermissionKind[PermissionKind["ViewPages"] = 18] = "ViewPages";
    /**
     * Add, change, or delete HTML pages or Web Part Pages, and edit the Site using
     * a Windows SharePoint Services compatible editor.
     */
    PermissionKind[PermissionKind["AddAndCustomizePages"] = 19] = "AddAndCustomizePages";
    /**
     * Apply a theme or borders to the entire Site.
     */
    PermissionKind[PermissionKind["ApplyThemeAndBorder"] = 20] = "ApplyThemeAndBorder";
    /**
     * Apply a style sheet (.css file) to the Site.
     */
    PermissionKind[PermissionKind["ApplyStyleSheets"] = 21] = "ApplyStyleSheets";
    /**
     * View reports on Site usage.
     */
    PermissionKind[PermissionKind["ViewUsageData"] = 22] = "ViewUsageData";
    /**
     * Create a Site using Self-Service Site Creation.
     */
    PermissionKind[PermissionKind["CreateSSCSite"] = 23] = "CreateSSCSite";
    /**
     * Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.
     */
    PermissionKind[PermissionKind["ManageSubwebs"] = 24] = "ManageSubwebs";
    /**
     * Create a group of users that can be used anywhere within the site collection.
     */
    PermissionKind[PermissionKind["CreateGroups"] = 25] = "CreateGroups";
    /**
     * Create and change permission levels on the Site and assign permissions to users
     * and groups.
     */
    PermissionKind[PermissionKind["ManagePermissions"] = 26] = "ManagePermissions";
    /**
     * Enumerate files and folders in a Site using Microsoft Office SharePoint Designer
     * and WebDAV interfaces.
     */
    PermissionKind[PermissionKind["BrowseDirectories"] = 27] = "BrowseDirectories";
    /**
     * View information about users of the Site.
     */
    PermissionKind[PermissionKind["BrowseUserInfo"] = 28] = "BrowseUserInfo";
    /**
     * Add or remove personal Web Parts on a Web Part Page.
     */
    PermissionKind[PermissionKind["AddDelPrivateWebParts"] = 29] = "AddDelPrivateWebParts";
    /**
     * Update Web Parts to display personalized information.
     */
    PermissionKind[PermissionKind["UpdatePersonalWebParts"] = 30] = "UpdatePersonalWebParts";
    /**
     * Grant the ability to perform all administration tasks for the Site as well as
     * manage content, activate, deactivate, or edit properties of Site scoped Features
     * through the object model or through the user interface (UI). When granted on the
     * root Site of a Site Collection, activate, deactivate, or edit properties of
     * site collection scoped Features through the object model. To browse to the Site
     * Collection Features page and activate or deactivate Site Collection scoped Features
     * through the UI, you must be a Site Collection administrator.
     */
    PermissionKind[PermissionKind["ManageWeb"] = 31] = "ManageWeb";
    /**
     * Content of lists and document libraries in the Web site will be retrieveable for anonymous users through
     * SharePoint search if the list or document library has AnonymousSearchAccessList set.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessWebLists"] = 32] = "AnonymousSearchAccessWebLists";
    /**
     * Use features that launch client applications. Otherwise, users must work on documents
     * locally and upload changes.
     */
    PermissionKind[PermissionKind["UseClientIntegration"] = 37] = "UseClientIntegration";
    /**
     * Use SOAP, WebDAV, or Microsoft Office SharePoint Designer interfaces to access the Site.
     */
    PermissionKind[PermissionKind["UseRemoteAPIs"] = 38] = "UseRemoteAPIs";
    /**
     * Manage alerts for all users of the Site.
     */
    PermissionKind[PermissionKind["ManageAlerts"] = 39] = "ManageAlerts";
    /**
     * Create e-mail alerts.
     */
    PermissionKind[PermissionKind["CreateAlerts"] = 40] = "CreateAlerts";
    /**
     * Allows a user to change his or her user information, such as adding a picture.
     */
    PermissionKind[PermissionKind["EditMyUserInfo"] = 41] = "EditMyUserInfo";
    /**
     * Enumerate permissions on Site, list, folder, document, or list item.
     */
    PermissionKind[PermissionKind["EnumeratePermissions"] = 63] = "EnumeratePermissions";
    /**
     * Has all permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["FullMask"] = 65] = "FullMask";
})(PermissionKind || (PermissionKind = {}));

;// ./node_modules/@pnp/sp/security/funcs.js


/**
* Gets the effective permissions for the user supplied
*
* @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
*/
async function getUserEffectivePermissions(loginName) {
    const q = SPInstance(this, "getUserEffectivePermissions(@user)");
    q.query.set("@user", `'${loginName}'`);
    return q();
}
/**
 * Gets the effective permissions for the current user
 */
async function getCurrentUserEffectivePermissions() {
    return SPQueryable(this, "EffectiveBasePermissions")();
}
/**
 * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
 *
 * @param copyRoleAssignments If true the permissions are copied from the current parent scope
 * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
 */
async function breakRoleInheritance(copyRoleAssignments = false, clearSubscopes = false) {
    return spPost(SPQueryable(this, `breakroleinheritance(copyroleassignments=${copyRoleAssignments}, clearsubscopes=${clearSubscopes})`));
}
/**
 * Removes the local role assignments so that it re-inherit role assignments from the parent object.
 *
 */
async function resetRoleInheritance() {
    return spPost(SPQueryable(this, "resetroleinheritance"));
}
/**
 * Determines if a given user has the appropriate permissions
 *
 * @param loginName The user to check
 * @param permission The permission being checked
 */
async function userHasPermissions(loginName, permission) {
    const perms = await getUserEffectivePermissions.call(this, loginName);
    return this.hasPermissions(perms, permission);
}
/**
 * Determines if the current user has the requested permissions
 *
 * @param permission The permission we wish to check
 */
async function currentUserHasPermissions(permission) {
    const perms = await getCurrentUserEffectivePermissions.call(this);
    return this.hasPermissions(perms, permission);
}
/**
 * Taken from sp.js, checks the supplied permissions against the mask
 *
 * @param value The security principal's permissions on the given object
 * @param perm The permission checked against the value
 */
/* eslint-disable no-bitwise */
function hasPermissions(value, perm) {
    if (!perm) {
        return true;
    }
    if (perm === PermissionKind.FullMask) {
        return (value.High & 32767) === 32767 && value.Low === 65535;
    }
    perm = perm - 1;
    let num = 1;
    if (perm >= 0 && perm < 32) {
        num = num << perm;
        return 0 !== (value.Low & num);
    }
    else if (perm >= 32 && perm < 64) {
        num = num << perm - 32;
        return 0 !== (value.High & num);
    }
    return false;
}
/* eslint-enable no-bitwise */

;// ./node_modules/@pnp/sp/security/item.js





addProp(_Item, "roleAssignments", RoleAssignments);
addProp(_Item, "firstUniqueAncestorSecurableObject", SPInstance);
_Item.prototype.getUserEffectivePermissions = getUserEffectivePermissions;
_Item.prototype.getCurrentUserEffectivePermissions = getCurrentUserEffectivePermissions;
_Item.prototype.breakRoleInheritance = breakRoleInheritance;
_Item.prototype.resetRoleInheritance = resetRoleInheritance;
_Item.prototype.userHasPermissions = userHasPermissions;
_Item.prototype.currentUserHasPermissions = currentUserHasPermissions;
_Item.prototype.hasPermissions = hasPermissions;

;// ./node_modules/@pnp/sp/security/list.js





addProp(_List, "roleAssignments", RoleAssignments);
addProp(_List, "firstUniqueAncestorSecurableObject", SPInstance);
_List.prototype.getUserEffectivePermissions = getUserEffectivePermissions;
_List.prototype.getCurrentUserEffectivePermissions = getCurrentUserEffectivePermissions;
_List.prototype.breakRoleInheritance = breakRoleInheritance;
_List.prototype.resetRoleInheritance = resetRoleInheritance;
_List.prototype.userHasPermissions = userHasPermissions;
_List.prototype.currentUserHasPermissions = currentUserHasPermissions;
_List.prototype.hasPermissions = hasPermissions;

;// ./node_modules/@pnp/sp/security/web.js





addProp(_Web, "roleDefinitions", RoleDefinitions);
addProp(_Web, "roleAssignments", RoleAssignments);
addProp(_Web, "firstUniqueAncestorSecurableObject", SPInstance);
_Web.prototype.getUserEffectivePermissions = getUserEffectivePermissions;
_Web.prototype.getCurrentUserEffectivePermissions = getCurrentUserEffectivePermissions;
_Web.prototype.breakRoleInheritance = breakRoleInheritance;
_Web.prototype.resetRoleInheritance = resetRoleInheritance;
_Web.prototype.userHasPermissions = userHasPermissions;
_Web.prototype.currentUserHasPermissions = currentUserHasPermissions;
_Web.prototype.hasPermissions = hasPermissions;

;// ./node_modules/@pnp/sp/security/index.js





;// ./node_modules/@pnp/sp/sharing/types.js
/**
 * Indicates the role of the sharing link
 */
var SharingRole;
(function (SharingRole) {
    SharingRole[SharingRole["None"] = 0] = "None";
    SharingRole[SharingRole["View"] = 1] = "View";
    SharingRole[SharingRole["Edit"] = 2] = "Edit";
    SharingRole[SharingRole["Owner"] = 3] = "Owner";
})(SharingRole || (SharingRole = {}));
var SPSharedObjectType;
(function (SPSharedObjectType) {
    SPSharedObjectType[SPSharedObjectType["Unknown"] = 0] = "Unknown";
    SPSharedObjectType[SPSharedObjectType["File"] = 1] = "File";
    SPSharedObjectType[SPSharedObjectType["Folder"] = 2] = "Folder";
    SPSharedObjectType[SPSharedObjectType["Item"] = 3] = "Item";
    SPSharedObjectType[SPSharedObjectType["List"] = 4] = "List";
    SPSharedObjectType[SPSharedObjectType["Web"] = 5] = "Web";
    SPSharedObjectType[SPSharedObjectType["Max"] = 6] = "Max";
})(SPSharedObjectType || (SPSharedObjectType = {}));
var SharingDomainRestrictionMode;
(function (SharingDomainRestrictionMode) {
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["None"] = 0] = "None";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["AllowList"] = 1] = "AllowList";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["BlockList"] = 2] = "BlockList";
})(SharingDomainRestrictionMode || (SharingDomainRestrictionMode = {}));
var SharingOperationStatusCode;
(function (SharingOperationStatusCode) {
    /**
     * The share operation completed without errors.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CompletedSuccessfully"] = 0] = "CompletedSuccessfully";
    /**
     * The share operation completed and generated requests for access.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessRequestsQueued"] = 1] = "AccessRequestsQueued";
    /**
     * The share operation failed as there were no resolved users.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NoResolvedUsers"] = -1] = "NoResolvedUsers";
    /**
     * The share operation failed due to insufficient permissions.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessDenied"] = -2] = "AccessDenied";
    /**
     * The share operation failed when attempting a cross site share, which is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CrossSiteRequestNotSupported"] = -3] = "CrossSiteRequestNotSupported";
    /**
     * The sharing operation failed due to an unknown error.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["UnknowError"] = -4] = "UnknowError";
    /**
     * The text you typed is too long. Please shorten it.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["EmailBodyTooLong"] = -5] = "EmailBodyTooLong";
    /**
     * The maximum number of unique scopes in the list has been exceeded.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ListUniqueScopesExceeded"] = -6] = "ListUniqueScopesExceeded";
    /**
     * The share operation failed because a sharing capability is disabled in the site.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CapabilityDisabled"] = -7] = "CapabilityDisabled";
    /**
     * The specified object for the share operation is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ObjectNotSupported"] = -8] = "ObjectNotSupported";
    /**
     * A SharePoint group cannot contain another SharePoint group.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NestedGroupsNotSupported"] = -9] = "NestedGroupsNotSupported";
})(SharingOperationStatusCode || (SharingOperationStatusCode = {}));
var SharingLinkKind;
(function (SharingLinkKind) {
    /**
     * Uninitialized link
     */
    SharingLinkKind[SharingLinkKind["Uninitialized"] = 0] = "Uninitialized";
    /**
     * Direct link to the object being shared
     */
    SharingLinkKind[SharingLinkKind["Direct"] = 1] = "Direct";
    /**
     * Organization-shareable link to the object being shared with view permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationView"] = 2] = "OrganizationView";
    /**
     * Organization-shareable link to the object being shared with edit permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationEdit"] = 3] = "OrganizationEdit";
    /**
     * View only anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousView"] = 4] = "AnonymousView";
    /**
     * Read/Write anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousEdit"] = 5] = "AnonymousEdit";
    /**
     * Flexible sharing Link where properties can change without affecting link URL
     */
    SharingLinkKind[SharingLinkKind["Flexible"] = 6] = "Flexible";
})(SharingLinkKind || (SharingLinkKind = {}));
var RoleType;
(function (RoleType) {
    RoleType[RoleType["None"] = 0] = "None";
    RoleType[RoleType["Guest"] = 1] = "Guest";
    RoleType[RoleType["Reader"] = 2] = "Reader";
    RoleType[RoleType["Contributor"] = 3] = "Contributor";
    RoleType[RoleType["WebDesigner"] = 4] = "WebDesigner";
    RoleType[RoleType["Administrator"] = 5] = "Administrator";
})(RoleType || (RoleType = {}));

;// ./node_modules/@pnp/sp/sharing/file.js



_File.prototype.shareWith = async function (loginNames, role = SharingRole.View, requireSignin = false, emailData) {
    const item = await this.getItem();
    return item.shareWith(loginNames, role, requireSignin, emailData);
};
_File.prototype.getShareLink = async function (kind, expiration = null) {
    const item = await this.getItem();
    return item.getShareLink(kind, expiration);
};
_File.prototype.checkSharingPermissions = async function (recipients) {
    const item = await this.getItem();
    return item.checkSharingPermissions(recipients);
};
// TODO:: clean up this method signature for next major release
// eslint-disable-next-line max-len
_File.prototype.getSharingInformation = async function (request = null, expands, selects) {
    const item = await this.getItem();
    return item.getSharingInformation(request, expands, selects);
};
_File.prototype.getObjectSharingSettings = async function (useSimplifiedRoles = true) {
    const item = await this.getItem();
    return item.getObjectSharingSettings(useSimplifiedRoles);
};
_File.prototype.unshare = async function () {
    const item = await this.getItem();
    return item.unshare();
};
_File.prototype.deleteSharingLinkByKind = async function (linkKind) {
    const item = await this.getItem();
    return item.deleteSharingLinkByKind(linkKind);
};
_File.prototype.unshareLink = async function unshareLink(linkKind, shareId = emptyGuid) {
    const item = await this.getItem();
    return item.unshareLink(linkKind, shareId);
};

;// ./node_modules/@pnp/sp/sharing/folder.js


const field = "odata.id";
_Folder.prototype.shareWith = async function (loginNames, role = SharingRole.View, requireSignin = false, emailData) {
    const shareable = await this.getItem(field);
    return shareable.shareWith(loginNames, role, requireSignin, emailData);
};
_Folder.prototype.getShareLink = async function (kind, expiration = null) {
    const shareable = await this.getItem(field);
    return shareable.getShareLink(kind, expiration);
};
_Folder.prototype.checkSharingPermissions = async function (recipients) {
    const shareable = await this.getItem(field);
    return shareable.checkSharingPermissions(recipients);
};
_Folder.prototype.getSharingInformation = async function (request, expands, selects) {
    const shareable = await this.getItem(field);
    return shareable.getSharingInformation(request, expands, selects);
};
_Folder.prototype.getObjectSharingSettings = async function (useSimplifiedRoles = true) {
    const shareable = await this.getItem(field);
    return shareable.getObjectSharingSettings(useSimplifiedRoles);
};
_Folder.prototype.unshare = async function () {
    const shareable = await this.getItem(field);
    return shareable.unshare();
};
_Folder.prototype.deleteSharingLinkByKind = async function (kind) {
    const shareable = await this.getItem(field);
    return shareable.deleteSharingLinkByKind(kind);
};
_Folder.prototype.unshareLink = async function (kind, shareId) {
    const shareable = await this.getItem(field);
    return shareable.unshareLink(kind, shareId);
};

;// ./node_modules/@pnp/sp/sharing/funcs.js








/**
 * Shares an object based on the supplied options
 *
 * @param options The set of options to send to the ShareObject method
 * @param bypass If true any processing is skipped and the options are sent directly to the ShareObject method
 */
async function shareObject(o, options, bypass = false) {
    if (bypass) {
        // if the bypass flag is set send the supplied parameters directly to the service
        return sendShareObjectRequest(o, options);
    }
    // extend our options with some defaults
    options = {
        group: null,
        includeAnonymousLinkInEmail: false,
        propagateAcl: false,
        useSimplifiedRoles: true,
        ...options,
    };
    const roleValue = await getRoleValue.apply(o, [options.role, options.group]);
    // handle the multiple input types
    if (!util_isArray(options.loginNames)) {
        options.loginNames = [options.loginNames];
    }
    const userStr = jsS(options.loginNames.map(Key => ({ Key })));
    let postBody = {
        peoplePickerInput: userStr,
        roleValue: roleValue,
        url: options.url,
    };
    if (options.emailData !== undefined && options.emailData !== null) {
        postBody = {
            emailBody: options.emailData.body,
            emailSubject: options.emailData.subject !== undefined ? options.emailData.subject : "Shared with you.",
            sendEmail: true,
            ...postBody,
        };
    }
    return sendShareObjectRequest(o, postBody);
}
/**
 * Gets a sharing link for the supplied
 *
 * @param kind The kind of link to share
 * @param expiration The optional expiration for this link
 */
function getShareLink(kind, expiration = null) {
    // date needs to be an ISO string or null
    const expString = expiration !== null ? expiration.toISOString() : null;
    // clone using the factory and send the request
    const o = SPInstance(this, "shareLink");
    return spPost(o, body({
        request: {
            createLink: true,
            emailData: null,
            settings: {
                expiration: expString,
                linkKind: kind,
            },
        },
    }));
}
/**
 * Checks Permissions on the list of Users and returns back role the users have on the Item.
 *
 * @param recipients The array of Entities for which Permissions need to be checked.
 */
function checkPermissions(recipients) {
    const o = SPInstance(this, "checkPermissions");
    return spPost(o, body({ recipients }));
}
/**
 * Get Sharing Information.
 *
 * @param request The SharingInformationRequest Object.
 * @param expands Expand more fields.
 *
 */
function getSharingInformation(request = null, expands = [], selects = ["*"]) {
    const o = SPInstance(this, "getSharingInformation");
    return spPost(o.select(...selects).expand(...expands), body({ request }));
}
/**
 * Gets the sharing settings of an item.
 *
 * @param useSimplifiedRoles Determines whether to use simplified roles.
 */
function getObjectSharingSettings(useSimplifiedRoles = true) {
    const o = SPInstance(this, "getObjectSharingSettings");
    return spPost(o, body({ useSimplifiedRoles }));
}
/**
 * Unshares this object
 */
function unshareObject() {
    return spPost(SPInstance(this, "unshareObject"));
}
/**
 * Deletes a link by type
 *
 * @param kind Deletes a sharing link by the kind of link
 */
function deleteLinkByKind(linkKind) {
    return spPost(SPInstance(this, "deleteLinkByKind"), body({ linkKind }));
}
/**
 * Removes the specified link to the item.
 *
 * @param kind The kind of link to be deleted.
 * @param shareId
 */
function unshareLink(linkKind, shareId = emptyGuid) {
    return spPost(SPInstance(this, "unshareLink"), body({ linkKind, shareId }));
}
/**
 * Shares this instance with the supplied users
 *
 * @param loginNames Resolved login names to share
 * @param role The role
 * @param requireSignin True to require the user is authenticated, otherwise false
 * @param propagateAcl True to apply this share to all children
 * @param emailData If supplied an email will be sent with the indicated properties
 */
async function shareWith(o, loginNames, role, requireSignin = false, propagateAcl = false, emailData) {
    // handle the multiple input types
    if (!util_isArray(loginNames)) {
        loginNames = [loginNames];
    }
    const userStr = jsS(loginNames.map(login => {
        return { Key: login };
    }));
    const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
    // start by looking up the role definition id we need to set the roleValue
    const def = await SPCollection([o, extractWebUrl(o.toUrl())], "_api/web/roledefinitions").select("Id").filter(`RoleTypeKind eq ${roleFilter}`)();
    if (!util_isArray(def) || def.length < 1) {
        throw Error(`Could not locate a role defintion with RoleTypeKind ${roleFilter}`);
    }
    let postBody = {
        includeAnonymousLinkInEmail: requireSignin,
        peoplePickerInput: userStr,
        propagateAcl: propagateAcl,
        roleValue: `role:${def[0].Id}`,
        useSimplifiedRoles: true,
    };
    if (emailData !== undefined) {
        postBody = {
            ...postBody,
            emailBody: emailData.body,
            emailSubject: emailData.subject !== undefined ? emailData.subject : "",
            sendEmail: true,
        };
    }
    return spPost(SPInstance(o, "shareObject"), body(postBody));
}
async function sendShareObjectRequest(o, options) {
    const w = Web([o, extractWebUrl(o.toUrl())], "/_api/SP.Web.ShareObject");
    return spPost(w.expand("UsersWithAccessRequests", "GroupsSharedWith"), body(options));
}
/**
 * Calculates the roleValue string used in the sharing query
 *
 * @param role The Sharing Role
 * @param group The Group type
 */
async function getRoleValue(role, group) {
    // we will give group precedence, because we had to make a choice
    if (group !== undefined && group !== null) {
        switch (group) {
            case RoleType.Contributor: {
                const g1 = await Web([this, "_api/web"], "associatedmembergroup").select("Id")();
                return `group: ${g1.Id}`;
            }
            case RoleType.Reader:
            case RoleType.Guest: {
                const g2 = await Web([this, "_api/web"], "associatedvisitorgroup").select("Id")();
                return `group: ${g2.Id}`;
            }
            default:
                throw Error("Could not determine role value for supplied value. Contributor, Reader, and Guest are supported");
        }
    }
    else {
        const roleFilter = role === SharingRole.Edit ? RoleType.Contributor : RoleType.Reader;
        const def = await RoleDefinitions([this, "_api/web"]).select("Id").top(1).filter(`RoleTypeKind eq ${roleFilter}`)();
        if (def === undefined || (def === null || def === void 0 ? void 0 : def.length) < 1) {
            throw Error("Could not locate associated role definition for supplied role. Edit and View are supported");
        }
        return `role: ${def[0].Id}`;
    }
}

;// ./node_modules/@pnp/sp/sharing/item.js



_Item.prototype.shareWith = function (loginNames, role = SharingRole.View, requireSignin = false, emailData) {
    return shareWith(this, loginNames, role, requireSignin, false, emailData);
};
_Item.prototype.getShareLink = getShareLink;
_Item.prototype.checkSharingPermissions = checkPermissions;
_Item.prototype.getSharingInformation = getSharingInformation;
_Item.prototype.getObjectSharingSettings = getObjectSharingSettings;
_Item.prototype.unshare = unshareObject;
_Item.prototype.deleteSharingLinkByKind = deleteLinkByKind;
_Item.prototype.unshareLink = unshareLink;

;// ./node_modules/@pnp/sp/sharing/web.js






/**
 * Shares this web with the supplied users (not supported for batching)
 * @param loginNames The resolved login names to share
 * @param role The role to share this web
 * @param emailData Optional email data
 */
_Web.prototype.shareWith = async function (loginNames, role = SharingRole.View, emailData) {
    const url = await this.select("Url")();
    return this.shareObject(combine(url.Url, "/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1"), loginNames, role, emailData);
};
/**
 * Provides direct access to the static web.ShareObject method
 *
 * @param url The url to share
 * @param loginNames Resolved loginnames string[] of a single login name string
 * @param roleValue Role value
 * @param emailData Optional email data
 * @param groupId Optional group id
 * @param propagateAcl
 * @param includeAnonymousLinkInEmail
 * @param useSimplifiedRoles
 */
_Web.prototype.shareObject = function (url, loginNames, role, emailData, group, propagateAcl = false, includeAnonymousLinkInEmail = false, useSimplifiedRoles = true) {
    return shareObject(this, {
        emailData: emailData,
        group: group,
        includeAnonymousLinkInEmail: includeAnonymousLinkInEmail,
        loginNames: loginNames,
        propagateAcl: propagateAcl,
        role: role,
        url: url,
        useSimplifiedRoles: useSimplifiedRoles,
    });
};
/**
 * Supplies a method to pass any set of arguments to ShareObject
 *
 * @param options The set of options to send to ShareObject
 */
_Web.prototype.shareObjectRaw = function (options) {
    return shareObject(this, options, true);
};
/**
 * Supplies a method to pass any set of arguments to ShareObject
 *
 * @param options The set of options to send to ShareObject
 */
_Web.prototype.unshareObject = function (url) {
    return spPost(Web(this, "unshareObject"), body({ url }));
};

;// ./node_modules/@pnp/sp/sharing/index.js






;// ./node_modules/@pnp/sp/site-designs/types.js




class _SiteDesigns extends _SPQueryable {
    constructor(base, methodName = "") {
        super(base);
        this._url = combine(extractWebUrl(this._url), `_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.${methodName}`);
    }
    run(props) {
        return spPost(this, body(props, headers({ "Content-Type": "application/json;charset=utf-8" })));
    }
    /**
     * Creates a new site design available to users when they create a new site from the SharePoint home page.
     *
     * @param creationInfo A sitedesign creation information object
     */
    createSiteDesign(creationInfo) {
        return SiteDesignsCloneFactory(this, "CreateSiteDesign").run({ info: creationInfo });
    }
    /**
     * Applies a site design to an existing site collection.
     *
     * @param siteDesignId The ID of the site design to apply.
     * @param webUrl The URL of the site collection where you want to apply the site design.
     */
    applySiteDesign(siteDesignId, webUrl) {
        return SiteDesignsCloneFactory(this, "ApplySiteDesign").run({ siteDesignId: siteDesignId, "webUrl": webUrl });
    }
    /**
     * Gets the list of available site designs
     */
    getSiteDesigns() {
        return SiteDesignsCloneFactory(this, "GetSiteDesigns").run({});
    }
    /**
     * Gets information about a specific site design.
     * @param id The ID of the site design to get information about.
     */
    getSiteDesignMetadata(id) {
        return SiteDesignsCloneFactory(this, "GetSiteDesignMetadata").run({ id: id });
    }
    /**
     * Updates a site design with new values. In the REST call, all parameters are optional except the site script Id.
     * If you had previously set the IsDefault parameter to TRUE and wish it to remain true, you must pass in this parameter again (otherwise it will be reset to FALSE).
     * @param updateInfo A sitedesign update information object
     */
    updateSiteDesign(updateInfo) {
        return SiteDesignsCloneFactory(this, "UpdateSiteDesign").run({ updateInfo: updateInfo });
    }
    /**
     * Deletes a site design.
     * @param id The ID of the site design to delete.
     */
    deleteSiteDesign(id) {
        return SiteDesignsCloneFactory(this, "DeleteSiteDesign").run({ id: id });
    }
    /**
     * Gets a list of principals that have access to a site design.
     * @param id The ID of the site design to get rights information from.
     */
    getSiteDesignRights(id) {
        return SiteDesignsCloneFactory(this, "GetSiteDesignRights").run({ id: id });
    }
    /**
     * Grants access to a site design for one or more principals.
     * @param id The ID of the site design to grant rights on.
     * @param principalNames An array of one or more principals to grant view rights.
     *                       Principals can be users or mail-enabled security groups in the form of "alias" or "alias@<domain name>.com"
     * @param grantedRights Always set to 1. This represents the View right.
     */
    grantSiteDesignRights(id, principalNames, grantedRights = 1) {
        return SiteDesignsCloneFactory(this, "GrantSiteDesignRights").run({
            "grantedRights": grantedRights.toString(),
            id,
            principalNames,
        });
    }
    /**
     * Revokes access from a site design for one or more principals.
     * @param id The ID of the site design to revoke rights from.
     * @param principalNames An array of one or more principals to revoke view rights from.
     *                       If all principals have rights revoked on the site design, the site design becomes viewable to everyone.
     */
    revokeSiteDesignRights(id, principalNames) {
        return SiteDesignsCloneFactory(this, "RevokeSiteDesignRights").run({
            id,
            principalNames,
        });
    }
    /**
     * Adds a site design task on the specified web url to be invoked asynchronously.
     * @param webUrl The absolute url of the web on where to create the task
     * @param siteDesignId The ID of the site design to create a task for
     */
    addSiteDesignTask(webUrl, siteDesignId) {
        return SiteDesignsCloneFactory(this, "AddSiteDesignTask").run({ webUrl, siteDesignId });
    }
    /**
     * Adds a site design task on the current web to be invoked asynchronously.
     * @param siteDesignId The ID of the site design to create a task for
     */
    addSiteDesignTaskToCurrentWeb(siteDesignId) {
        return SiteDesignsCloneFactory(this, "AddSiteDesignTaskToCurrentWeb").run({ siteDesignId });
    }
    /**
     * Retrieves the site design task, if the task has finished running null will be returned
     * @param id The ID of the site design task
     */
    async getSiteDesignTask(id) {
        const task = await SiteDesignsCloneFactory(this, "GetSiteDesignTask").run({ "taskId": id });
        return hOP(task, "ID") ? task : null;
    }
    /**
     * Retrieves a list of site design that have run on a specific web
     * @param webUrl The url of the web where the site design was applied
     * @param siteDesignId (Optional) the site design ID, if not provided will return all site design runs
     */
    getSiteDesignRun(webUrl, siteDesignId) {
        return SiteDesignsCloneFactory(this, "GetSiteDesignRun").run({ webUrl, siteDesignId });
    }
    /**
     * Retrieves the status of a site design that has been run or is still running
     * @param webUrl The url of the web where the site design was applied
     * @param runId the run ID
     */
    getSiteDesignRunStatus(webUrl, runId) {
        return SiteDesignsCloneFactory(this, "GetSiteDesignRunStatus").run({ webUrl, runId });
    }
}
const SiteDesigns = (baseUrl, methodName) => new _SiteDesigns(baseUrl, methodName);
const SiteDesignsCloneFactory = (baseUrl, methodName = "") => SiteDesigns(baseUrl, methodName);
var TemplateDesignType;
(function (TemplateDesignType) {
    /// <summary>
    /// Represents the Site design type.
    /// </summary>
    TemplateDesignType[TemplateDesignType["Site"] = 0] = "Site";
    /// <summary>
    /// Represents the List design type.
    /// </summary>
    TemplateDesignType[TemplateDesignType["List"] = 1] = "List";
})(TemplateDesignType || (TemplateDesignType = {}));
var ListDesignColor;
(function (ListDesignColor) {
    ListDesignColor[ListDesignColor["DarkRed"] = 0] = "DarkRed";
    ListDesignColor[ListDesignColor["Red"] = 1] = "Red";
    ListDesignColor[ListDesignColor["Orange"] = 2] = "Orange";
    ListDesignColor[ListDesignColor["Green"] = 3] = "Green";
    ListDesignColor[ListDesignColor["DarkGreen"] = 4] = "DarkGreen";
    ListDesignColor[ListDesignColor["Teal"] = 5] = "Teal";
    ListDesignColor[ListDesignColor["Blue"] = 6] = "Blue";
    ListDesignColor[ListDesignColor["NavyBlue"] = 7] = "NavyBlue";
    ListDesignColor[ListDesignColor["BluePurple"] = 8] = "BluePurple";
    ListDesignColor[ListDesignColor["DarkBlue"] = 9] = "DarkBlue";
    ListDesignColor[ListDesignColor["Lavendar"] = 10] = "Lavendar";
    ListDesignColor[ListDesignColor["Pink"] = 11] = "Pink";
})(ListDesignColor || (ListDesignColor = {}));
var ListDesignIcon;
(function (ListDesignIcon) {
    ListDesignIcon[ListDesignIcon["Bug"] = 0] = "Bug";
    ListDesignIcon[ListDesignIcon["Calendar"] = 1] = "Calendar";
    ListDesignIcon[ListDesignIcon["BullseyeTarget"] = 2] = "BullseyeTarget";
    ListDesignIcon[ListDesignIcon["ClipboardList"] = 3] = "ClipboardList";
    ListDesignIcon[ListDesignIcon["Airplane"] = 4] = "Airplane";
    ListDesignIcon[ListDesignIcon["Rocket"] = 5] = "Rocket";
    ListDesignIcon[ListDesignIcon["Color"] = 6] = "Color";
    ListDesignIcon[ListDesignIcon["Insights"] = 7] = "Insights";
    ListDesignIcon[ListDesignIcon["CubeShape"] = 8] = "CubeShape";
    ListDesignIcon[ListDesignIcon["TestBeakerSolid"] = 9] = "TestBeakerSolid";
    ListDesignIcon[ListDesignIcon["Robot"] = 10] = "Robot";
    ListDesignIcon[ListDesignIcon["Savings"] = 11] = "Savings";
})(ListDesignIcon || (ListDesignIcon = {}));

;// ./node_modules/@pnp/sp/site-designs/web.js


_Web.prototype.getSiteDesignRuns = function (siteDesignId) {
    return SiteDesigns(this, "").getSiteDesignRun(undefined, siteDesignId);
};
_Web.prototype.addSiteDesignTask = function (siteDesignId) {
    return SiteDesigns(this, "").addSiteDesignTaskToCurrentWeb(siteDesignId);
};
_Web.prototype.getSiteDesignRunStatus = function (runId) {
    return SiteDesigns(this, "").getSiteDesignRunStatus(undefined, runId);
};

;// ./node_modules/@pnp/sp/site-designs/index.js




Reflect.defineProperty(SPFI.prototype, "siteDesigns", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(SiteDesigns);
    },
});

;// ./node_modules/@pnp/sp/site-groups/web.js





addProp(_Web, "siteGroups", SiteGroups);
addProp(_Web, "associatedOwnerGroup", SiteGroup);
addProp(_Web, "associatedMemberGroup", SiteGroup);
addProp(_Web, "associatedVisitorGroup", SiteGroup);
_Web.prototype.createDefaultAssociatedGroups = async function (groupNameSeed, siteOwner, copyRoleAssignments = false, clearSubscopes = true, siteOwner2) {
    await this.breakRoleInheritance(copyRoleAssignments, clearSubscopes);
    const q = Web(this, "createDefaultAssociatedGroups(userLogin=@u,userLogin2=@v,groupNameSeed=@s)");
    q.query.set("@u", `'${siteOwner || ""}'`);
    q.query.set("@v", `'${siteOwner2 || ""}'`);
    q.query.set("@s", `'${groupNameSeed || ""}'`);
    return spPost(q);
};

;// ./node_modules/@pnp/sp/site-groups/index.js



;// ./node_modules/@pnp/sp/site-scripts/types.js





class _SiteScripts extends _SPQueryable {
    constructor(base, methodName = "") {
        super(base);
        this._url = combine(extractWebUrl(this._url), `_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.${methodName}`);
    }
    run(props) {
        return spPost(this, body(props));
    }
    /**
     * Gets a list of information on all existing site scripts.
     */
    getSiteScripts() {
        return SiteScriptsCloneFactory(this, "GetSiteScripts").run({});
    }
    /**
     * Creates a new site script.
     *
     * @param title The display name of the site script.
     * @param content JSON value that describes the script. For more information, see JSON reference.
     */
    createSiteScript(title, description, content) {
        return SiteScriptsCloneFactory(this, `CreateSiteScript(Title=@title,Description=@desc)?@title='${encodePath(title)}'&@desc='${encodePath(description)}'`)
            .run(content);
    }
    /**
     * Gets information about a specific site script. It also returns the JSON of the script.
     *
     * @param id The ID of the site script to get information about.
     */
    getSiteScriptMetadata(id) {
        return SiteScriptsCloneFactory(this, "GetSiteScriptMetadata").run({ id });
    }
    /**
     * Deletes a site script.
     *
     * @param id The ID of the site script to delete.
     */
    deleteSiteScript(id) {
        return SiteScriptsCloneFactory(this, "DeleteSiteScript").run({ id });
    }
    /**
     * Updates a site script with new values. In the REST call, all parameters are optional except the site script Id.
     *
     * @param siteScriptUpdateInfo Object that contains the information to update a site script.
     *                             Make sure you stringify the content object or pass it in the second 'content' parameter
     * @param content (Optional) A new JSON script defining the script actions. For more information, see Site design JSON schema.
     */
    updateSiteScript(updateInfo, content) {
        if (content) {
            updateInfo.Content = JSON.stringify(content);
        }
        return SiteScriptsCloneFactory(this, "UpdateSiteScript").run({ updateInfo });
    }
    /**
     * Gets the site script syntax (JSON) for a specific list
     * @param listUrl The absolute url of the list to retrieve site script
     */
    getSiteScriptFromList(listUrl) {
        return SiteScriptsCloneFactory(this, "GetSiteScriptFromList").run({ listUrl });
    }
    /**
     * Gets the site script syntax (JSON) for a specific web
     * @param webUrl The absolute url of the web to retrieve site script
     * @param extractInfo configuration object to specify what to extract
     */
    getSiteScriptFromWeb(webUrl, info) {
        return SiteScriptsCloneFactory(this, "getSiteScriptFromWeb").run({ webUrl, info });
    }
    /**
     * Executes the indicated site design action on the indicated web.
     *
     * @param webUrl The absolute url of the web to retrieve site script
     * @param extractInfo configuration object to specify what to extract
     */
    executeSiteScriptAction(actionDefinition) {
        return SiteScriptsCloneFactory(this, "executeSiteScriptAction").run({ actionDefinition });
    }
}
const SiteScripts = (baseUrl, methodName) => new _SiteScripts(baseUrl, methodName);
const SiteScriptsCloneFactory = (baseUrl, methodName = "") => SiteScripts(baseUrl, methodName);
var SiteScriptActionOutcome;
(function (SiteScriptActionOutcome) {
    /**
     * The stage was deemed to have completed successfully.
     */
    SiteScriptActionOutcome[SiteScriptActionOutcome["Success"] = 0] = "Success";
    /**
     * The stage was deemed to have failed to complete successfully (non-blocking, rest of recipe
     * execution should still be able to proceed).
     */
    SiteScriptActionOutcome[SiteScriptActionOutcome["Failure"] = 1] = "Failure";
    /**
     * No action was taken for this stage / this stage was skipped.
     */
    SiteScriptActionOutcome[SiteScriptActionOutcome["NoOp"] = 2] = "NoOp";
    /**
     * There was an exception but the operation succeeded. This is analagous to the operation completing
     * in a "yellow" state.
     */
    SiteScriptActionOutcome[SiteScriptActionOutcome["SucceededWithException"] = 3] = "SucceededWithException";
})(SiteScriptActionOutcome || (SiteScriptActionOutcome = {}));

;// ./node_modules/@pnp/sp/site-scripts/web.js



_Web.prototype.getSiteScript = async function (extractInfo) {
    const info = await this.select("Url")();
    return SiteScripts(this.toUrl(), "").using(AssignFrom(this)).getSiteScriptFromWeb(info.Url, extractInfo);
};

;// ./node_modules/@pnp/sp/site-scripts/list.js






_List.prototype.getSiteScript = async function () {
    const rootFolder = await List(this).rootFolder();
    const web = await Web([this, extractWebUrl(this.toUrl())]).select("Url")();
    const absoluteListUrl = combine(web.Url, "Lists", rootFolder.Name);
    return SiteScripts(this, "").getSiteScriptFromList(absoluteListUrl);
};

;// ./node_modules/@pnp/sp/site-scripts/index.js





Reflect.defineProperty(SPFI.prototype, "siteScripts", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(SiteScripts);
    },
});

;// ./node_modules/@pnp/sp/site-users/web.js




addProp(_Web, "siteUsers", SiteUsers);
addProp(_Web, "currentUser", SiteUser);
_Web.prototype.ensureUser = async function (logonName) {
    return spPost(Web(this, "ensureuser"), body({ logonName }));
};
_Web.prototype.getUserById = function (id) {
    return SiteUser(this, `getUserById(${id})`);
};

;// ./node_modules/@pnp/sp/site-users/index.js



;// ./node_modules/@pnp/sp/sites/index.js



Reflect.defineProperty(SPFI.prototype, "site", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Site);
    },
});

;// ./node_modules/@pnp/sp/social/types.js





let _Social = class _Social extends _SPInstance {
    get my() {
        return MySocial(this);
    }
    async getFollowedSitesUri() {
        const r = await SocialCloneFactory(this, "FollowedSitesUri")();
        return r.FollowedSitesUri || r;
    }
    async getFollowedDocumentsUri() {
        const r = await SocialCloneFactory(this, "FollowedDocumentsUri")();
        return r.FollowedDocumentsUri || r;
    }
    async follow(actorInfo) {
        return spPost(SocialCloneFactory(this, "follow"), this.createSocialActorInfoRequestBody(actorInfo));
    }
    async isFollowed(actorInfo) {
        return spPost(SocialCloneFactory(this, "isfollowed"), this.createSocialActorInfoRequestBody(actorInfo));
    }
    async stopFollowing(actorInfo) {
        return spPost(SocialCloneFactory(this, "stopfollowing"), this.createSocialActorInfoRequestBody(actorInfo));
    }
    createSocialActorInfoRequestBody(actorInfo) {
        return body({
            "actor": {
                Id: null,
                ...actorInfo,
            },
        });
    }
};
_Social = __decorate([
    defaultPath("_api/social.following")
], _Social);

/**
 * Get a new Social instance for the particular Url
 */
const Social = (baseUrl) => new _Social(baseUrl);
const SocialCloneFactory = (baseUrl, paths) => new _Social(baseUrl, paths);
/**
 * Current user's Social instance
 */
let _MySocial = class _MySocial extends _SPInstance {
    async followed(types) {
        const r = await MySocialCloneFactory(this, `followed(types=${types})`)();
        return hOP(r, "Followed") ? r.Followed.results : r;
    }
    async followedCount(types) {
        const r = await MySocialCloneFactory(this, `followedcount(types=${types})`)();
        return r.FollowedCount || r;
    }
    async followers() {
        const r = await MySocialCloneFactory(this, "followers")();
        return hOP(r, "Followers") ? r.Followers.results : r;
    }
    async suggestions() {
        const r = await MySocialCloneFactory(this, "suggestions")();
        return hOP(r, "Suggestions") ? r.Suggestions.results : r;
    }
};
_MySocial = __decorate([
    defaultPath("my")
], _MySocial);

/**
 * Invokable factory for IMySocial instances
 */
const MySocial = (baseUrl, path) => new _MySocial(baseUrl, path);
const MySocialCloneFactory = (baseUrl, path) => new _MySocial(baseUrl, path);
/**
 * Social actor type
 *
 */
var SocialActorType;
(function (SocialActorType) {
    SocialActorType[SocialActorType["User"] = 0] = "User";
    SocialActorType[SocialActorType["Document"] = 1] = "Document";
    SocialActorType[SocialActorType["Site"] = 2] = "Site";
    SocialActorType[SocialActorType["Tag"] = 3] = "Tag";
})(SocialActorType || (SocialActorType = {}));
/**
 * Social actor type
 *
 */
/* eslint-disable no-bitwise */
var SocialActorTypes;
(function (SocialActorTypes) {
    SocialActorTypes[SocialActorTypes["None"] = 0] = "None";
    SocialActorTypes[SocialActorTypes["User"] = 1] = "User";
    SocialActorTypes[SocialActorTypes["Document"] = 2] = "Document";
    SocialActorTypes[SocialActorTypes["Site"] = 4] = "Site";
    SocialActorTypes[SocialActorTypes["Tag"] = 8] = "Tag";
    /**
   * The set excludes documents and sites that do not have feeds.
   */
    SocialActorTypes[SocialActorTypes["ExcludeContentWithoutFeeds"] = 268435456] = "ExcludeContentWithoutFeeds";
    /**
   * The set includes group sites
   */
    SocialActorTypes[SocialActorTypes["IncludeGroupsSites"] = 536870912] = "IncludeGroupsSites";
    /**
   * The set includes only items created within the last 24 hours
   */
    SocialActorTypes[SocialActorTypes["WithinLast24Hours"] = 1073741824] = "WithinLast24Hours";
})(SocialActorTypes || (SocialActorTypes = {}));
/* eslint-enable no-bitwise */
/**
 * Result from following
 *
 */
var SocialFollowResult;
(function (SocialFollowResult) {
    SocialFollowResult[SocialFollowResult["Ok"] = 0] = "Ok";
    SocialFollowResult[SocialFollowResult["AlreadyFollowing"] = 1] = "AlreadyFollowing";
    SocialFollowResult[SocialFollowResult["LimitReached"] = 2] = "LimitReached";
    SocialFollowResult[SocialFollowResult["InternalError"] = 3] = "InternalError";
})(SocialFollowResult || (SocialFollowResult = {}));
/**
 * Specifies an exception or status code.
 */
var SocialStatusCode;
(function (SocialStatusCode) {
    /**
   * The operation completed successfully
   */
    SocialStatusCode[SocialStatusCode["OK"] = 0] = "OK";
    /**
   * The request is invalid.
   */
    SocialStatusCode[SocialStatusCode["InvalidRequest"] = 1] = "InvalidRequest";
    /**
   *  The current user is not authorized to perform the operation.
   */
    SocialStatusCode[SocialStatusCode["AccessDenied"] = 2] = "AccessDenied";
    /**
   * The target of the operation was not found.
   */
    SocialStatusCode[SocialStatusCode["ItemNotFound"] = 3] = "ItemNotFound";
    /**
   * The operation is invalid for the target's current state.
   */
    SocialStatusCode[SocialStatusCode["InvalidOperation"] = 4] = "InvalidOperation";
    /**
   * The operation completed without modifying the target.
   */
    SocialStatusCode[SocialStatusCode["ItemNotModified"] = 5] = "ItemNotModified";
    /**
   * The operation failed because an internal error occurred.
   */
    SocialStatusCode[SocialStatusCode["InternalError"] = 6] = "InternalError";
    /**
   * The operation failed because the server could not access the distributed cache.
   */
    SocialStatusCode[SocialStatusCode["CacheReadError"] = 7] = "CacheReadError";
    /**
   * The operation succeeded but the server could not update the distributed cache.
   */
    SocialStatusCode[SocialStatusCode["CacheUpdateError"] = 8] = "CacheUpdateError";
    /**
   * No personal site exists for the current user, and no further information is available.
   */
    SocialStatusCode[SocialStatusCode["PersonalSiteNotFound"] = 9] = "PersonalSiteNotFound";
    /**
   * No personal site exists for the current user, and a previous attempt to create one failed.
   */
    SocialStatusCode[SocialStatusCode["FailedToCreatePersonalSite"] = 10] = "FailedToCreatePersonalSite";
    /**
   * No personal site exists for the current user, and a previous attempt to create one was not authorized.
   */
    SocialStatusCode[SocialStatusCode["NotAuthorizedToCreatePersonalSite"] = 11] = "NotAuthorizedToCreatePersonalSite";
    /**
   * No personal site exists for the current user, and no attempt should be made to create one.
   */
    SocialStatusCode[SocialStatusCode["CannotCreatePersonalSite"] = 12] = "CannotCreatePersonalSite";
    /**
   * The operation was rejected because an internal limit had been reached.
   */
    SocialStatusCode[SocialStatusCode["LimitReached"] = 13] = "LimitReached";
    /**
   * The operation failed because an error occurred during the processing of the specified attachment.
   */
    SocialStatusCode[SocialStatusCode["AttachmentError"] = 14] = "AttachmentError";
    /**
   * The operation succeeded with recoverable errors; the returned data is incomplete.
   */
    SocialStatusCode[SocialStatusCode["PartialData"] = 15] = "PartialData";
    /**
   * A required SharePoint feature is not enabled.
   */
    SocialStatusCode[SocialStatusCode["FeatureDisabled"] = 16] = "FeatureDisabled";
    /**
   * The site's storage quota has been exceeded.
   */
    SocialStatusCode[SocialStatusCode["StorageQuotaExceeded"] = 17] = "StorageQuotaExceeded";
    /**
   * The operation failed because the server could not access the database.
   */
    SocialStatusCode[SocialStatusCode["DatabaseError"] = 18] = "DatabaseError";
})(SocialStatusCode || (SocialStatusCode = {}));

;// ./node_modules/@pnp/sp/social/index.js



Reflect.defineProperty(SPFI.prototype, "social", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Social);
    },
});

;// ./node_modules/@pnp/sp/sputilities/types.js




class _Utilities extends _SPQueryable {
    constructor(base, methodName = "") {
        super(base);
        this._url = combine(extractWebUrl(this._url), `_api/SP.Utilities.Utility.${methodName}`);
    }
    excute(props) {
        return spPost(this, body(props));
    }
    sendEmail(properties) {
        if (properties.AdditionalHeaders) {
            // we have to remap the additional headers into this format #2253
            properties.AdditionalHeaders = Reflect.ownKeys(properties.AdditionalHeaders).map(key => ({
                Key: key,
                Value: Reflect.get(properties.AdditionalHeaders, key),
                ValueType: "Edm.String",
            }));
        }
        return UtilitiesCloneFactory(this, "SendEmail").excute({ properties });
    }
    getCurrentUserEmailAddresses() {
        return UtilitiesCloneFactory(this, "GetCurrentUserEmailAddresses").excute({});
    }
    resolvePrincipal(input, scopes, sources, inputIsEmailOnly, addToUserInfoList, matchUserInfoList = false) {
        const params = {
            addToUserInfoList,
            input,
            inputIsEmailOnly,
            matchUserInfoList,
            scopes,
            sources,
        };
        return UtilitiesCloneFactory(this, "ResolvePrincipalInCurrentContext").excute(params);
    }
    searchPrincipals(input, scopes, sources, groupName, maxCount) {
        const params = {
            groupName: groupName,
            input: input,
            maxCount: maxCount,
            scopes: scopes,
            sources: sources,
        };
        return UtilitiesCloneFactory(this, "SearchPrincipalsUsingContextWeb").excute(params);
    }
    createEmailBodyForInvitation(pageAddress) {
        const params = {
            pageAddress: pageAddress,
        };
        return UtilitiesCloneFactory(this, "CreateEmailBodyForInvitation").excute(params);
    }
    expandGroupsToPrincipals(inputs, maxCount = 30) {
        const params = {
            inputs: inputs,
            maxCount: maxCount,
        };
        const clone = UtilitiesCloneFactory(this, "ExpandGroupsToPrincipals");
        return clone.excute(params);
    }
}
const Utilities = spInvokableFactory(_Utilities);
const UtilitiesCloneFactory = (base, path) => Utilities(base, path);

;// ./node_modules/@pnp/sp/sputilities/index.js



Reflect.defineProperty(SPFI.prototype, "utility", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Utilities, "");
    },
});

;// ./node_modules/@pnp/sp/subscriptions/types.js




let _Subscriptions = class _Subscriptions extends _SPCollection {
    /**
    * Returns all the webhook subscriptions or the specified webhook subscription
    *
    * @param subscriptionId The id of a specific webhook subscription to retrieve, omit to retrieve all the webhook subscriptions
    */
    getById(subscriptionId) {
        return Subscription(this).concat(`('${subscriptionId}')`);
    }
    /**
     * Creates a new webhook subscription
     *
     * @param notificationUrl The url to receive the notifications
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     * @param clientState A client specific string (optional)
     */
    async add(notificationUrl, expirationDate, clientState) {
        const postBody = {
            "expirationDateTime": expirationDate,
            "notificationUrl": notificationUrl,
            "resource": this.toUrl(),
        };
        if (clientState) {
            postBody.clientState = clientState;
        }
        return spPost(this, body(postBody));
    }
};
_Subscriptions = __decorate([
    defaultPath("subscriptions")
], _Subscriptions);

const Subscriptions = spInvokableFactory(_Subscriptions);
class _Subscription extends _SPInstance {
    /**
     * Renews this webhook subscription
     *
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months, optional)
     * @param notificationUrl The url to receive the notifications (optional)
     * @param clientState A client specific string (optional)
     */
    async update(expirationDate, notificationUrl, clientState) {
        const postBody = {};
        if (expirationDate) {
            postBody.expirationDateTime = expirationDate;
        }
        if (notificationUrl) {
            postBody.notificationUrl = notificationUrl;
        }
        if (clientState) {
            postBody.clientState = clientState;
        }
        return spPatch(this, body(postBody));
    }
    /**
     * Removes this webhook subscription
     *
     */
    delete() {
        return spDelete(this);
    }
}
const Subscription = spInvokableFactory(_Subscription);

;// ./node_modules/@pnp/sp/subscriptions/list.js



addProp(_List, "subscriptions", Subscriptions);

;// ./node_modules/@pnp/sp/subscriptions/index.js



;// ./node_modules/@pnp/sp/user-custom-actions/list.js



addProp(_List, "userCustomActions", UserCustomActions);

;// ./node_modules/@pnp/sp/user-custom-actions/web.js



addProp(_Web, "userCustomActions", UserCustomActions);

;// ./node_modules/@pnp/sp/user-custom-actions/site.js



addProp(_Site, "userCustomActions", UserCustomActions);

;// ./node_modules/@pnp/sp/user-custom-actions/index.js





;// ./node_modules/@pnp/sp/views/types.js





let _Views = class _Views extends _SPCollection {
    /**
     * Adds a new view to the collection
     *
     * @param title The new views's title
     * @param personalView True if this is a personal view, otherwise false, default = false
     * @param additionalSettings Will be passed as part of the view creation body
     */
    async add(Title, PersonalView = false, additionalSettings = {}) {
        return spPost(this, body({
            PersonalView,
            Title,
            ...additionalSettings,
        }));
    }
    /**
     * Gets a view by guid id
     *
     * @param id The GUID id of the view
     */
    getById(id) {
        return View(this).concat(`('${id}')`);
    }
    /**
     * Gets a view by title (case-sensitive)
     *
     * @param title The case-sensitive title of the view
     */
    getByTitle(title) {
        return View(this, `getByTitle('${encodePath(title)}')`);
    }
};
_Views = __decorate([
    defaultPath("views")
], _Views);

const Views = spInvokableFactory(_Views);
class _View extends _SPInstance {
    constructor() {
        super(...arguments);
        this.delete = deleteable();
    }
    get fields() {
        return ViewFields(this);
    }
    /**
     * Updates this view intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the view
     */
    async update(props) {
        return await spPostMerge(this, body(props));
    }
    // : any = this._update<IViewUpdateResult, ITypedHash<any>>("SP.View", data => ({ data, view: <any>this }));
    /**
     * Returns the list view as HTML.
     *
     */
    renderAsHtml() {
        return View(this, "renderashtml")();
    }
    /**
     * Sets the view schema
     *
     * @param viewXml The view XML to set
     */
    setViewXml(viewXml) {
        return spPost(View(this, "SetViewXml"), body({ viewXml }));
    }
}
const View = spInvokableFactory(_View);
let _ViewFields = class _ViewFields extends _SPCollection {
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    getSchemaXml() {
        return ViewFields(this, "schemaxml")();
    }
    /**
     * Adds the field with the specified field internal name or display name to the collection.
     *
     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
     */
    add(fieldTitleOrInternalName) {
        return spPost(ViewFields(this, `addviewfield('${encodePath(fieldTitleOrInternalName)}')`));
    }
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param field The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    move(field, index) {
        return spPost(ViewFields(this, "moveviewfieldto"), body({ field, index }));
    }
    /**
     * Removes all the fields from the collection.
     */
    removeAll() {
        return spPost(ViewFields(this, "removeallviewfields"));
    }
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    remove(fieldInternalName) {
        return spPost(ViewFields(this, `removeviewfield('${encodePath(fieldInternalName)}')`));
    }
};
_ViewFields = __decorate([
    defaultPath("viewfields")
], _ViewFields);

const ViewFields = spInvokableFactory(_ViewFields);
var ViewScope;
(function (ViewScope) {
    ViewScope[ViewScope["DefaultValue"] = 0] = "DefaultValue";
    ViewScope[ViewScope["Recursive"] = 1] = "Recursive";
    ViewScope[ViewScope["RecursiveAll"] = 2] = "RecursiveAll";
    ViewScope[ViewScope["FilesOnly"] = 3] = "FilesOnly";
})(ViewScope || (ViewScope = {}));

;// ./node_modules/@pnp/sp/views/list.js



addProp(_List, "views", Views);
addProp(_List, "defaultView", View);
_List.prototype.getView = function (viewId) {
    return View(this, `getView('${viewId}')`);
};

;// ./node_modules/@pnp/sp/views/index.js



;// ./node_modules/@pnp/sp/webparts/types.js


class _LimitedWebPartManager extends _SPQueryable {
    get scope() {
        return SPQueryable(this, "Scope");
    }
    get webparts() {
        return WebPartDefinitions(this, "webparts");
    }
    export(id) {
        return spPost(LimitedWebPartManagerCloneFactory(this, "ExportWebPart"), body({ webPartId: id }));
    }
    import(xml) {
        return spPost(LimitedWebPartManagerCloneFactory(this, "ImportWebPart"), body({ webPartXml: xml }));
    }
}
const LimitedWebPartManager = (baseUrl, path) => new _LimitedWebPartManager(baseUrl, path);
const LimitedWebPartManagerCloneFactory = (baseUrl, path) => LimitedWebPartManager(baseUrl, path);
class _WebPartDefinitions extends _SPCollection {
    /**
     * Gets a web part definition from the collection by id
     *
     * @param id The storage ID of the SPWebPartDefinition to retrieve
     */
    getById(id) {
        return WebPartDefinition(this, `getbyid('${id}')`);
    }
    /**
     * Gets a web part definition from the collection by storage id
     *
     * @param id The WebPart.ID of the SPWebPartDefinition to retrieve
     */
    getByControlId(id) {
        return WebPartDefinition(this, `getByControlId('${id}')`);
    }
}
const WebPartDefinitions = spInvokableFactory(_WebPartDefinitions);
class _WebPartDefinition extends _SPInstance {
    /**
    * Gets the webpart information associated with this definition
    */
    get webpart() {
        return SPInstance(this, "webpart");
    }
    /**
     * Saves changes to the Web Part made using other properties and methods on the SPWebPartDefinition object
     */
    saveChanges() {
        return spPost(WebPartDefinition(this, "SaveWebPartChanges"));
    }
    /**
     * Moves the Web Part to a different location on a Web Part Page
     *
     * @param zoneId The ID of the Web Part Zone to which to move the Web Part
     * @param zoneIndex A Web Part zone index that specifies the position at which the Web Part is to be moved within the destination Web Part zone
     */
    moveTo(zoneId, zoneIndex) {
        return spPost(WebPartDefinition(this, `MoveWebPartTo(zoneID='${zoneId}', zoneIndex=${zoneIndex})`));
    }
    /**
     * Closes the Web Part. If the Web Part is already closed, this method does nothing
     */
    close() {
        return spPost(WebPartDefinition(this, "CloseWebPart"));
    }
    /**
     * Opens the Web Part. If the Web Part is already closed, this method does nothing
     */
    open() {
        return spPost(WebPartDefinition(this, "OpenWebPart"));
    }
    /**
     * Removes a webpart from a page, all settings will be lost
     */
    delete() {
        return spPost(WebPartDefinition(this, "DeleteWebPart"));
    }
}
const WebPartDefinition = spInvokableFactory(_WebPartDefinition);
var WebPartsPersonalizationScope;
(function (WebPartsPersonalizationScope) {
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
})(WebPartsPersonalizationScope || (WebPartsPersonalizationScope = {}));

;// ./node_modules/@pnp/sp/webparts/file.js


_File.prototype.getLimitedWebPartManager = function (scope = WebPartsPersonalizationScope.Shared) {
    return LimitedWebPartManager(this, `getLimitedWebPartManager(scope=${scope})`);
};

;// ./node_modules/@pnp/sp/webparts/index.js



;// ./node_modules/@pnp/sp/webs/index.js



Reflect.defineProperty(SPFI.prototype, "web", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Web);
    },
});

;// ./node_modules/@pnp/sp/utils/create-change-token.js
/**
 * Creates a change token for use with sites, webs, or lists
 *
 * @param resourceType The type of resource for which you want a change token
 * @param resource The identifier (GUID) of the resource site.Id, web.Id, or List.Id
 * @param tokenDate The date for this token (if start token, start date of chages; if end token, end date of the changes)
 * @param versionNumber Version number for token (default = 1)
 * @returns A properly formatted change token
 */
function createChangeToken(resourceType = "site", resource, tokenDate = new Date(), versionNumber = 1) {
    const resourceTypeMapping = new Map([["site", 1], ["web", 2], ["list", 3]]).get(resourceType);
    // The value of the string assigned to ChangeTokenStart.StringValue is semicolon delimited, and takes the following parameters in the order listed:
    // Version number.
    // The change scope (0 - Content Database, 1 - site collection, 2 - site, 3 - list).
    // GUID of the item the scope applies to (for example, GUID of the list).
    // Time (in UTC) from when changes occurred in Ticks (but its .NET ticks so we do this math)
    // Initialize the change item on the ChangeToken using a default value of -1.
    const tokenDateTicks = (tokenDate.getTime() * 10000) + 621355968000000000;
    return { StringValue: `${versionNumber};${resourceTypeMapping};${resource};${tokenDateTicks};-1` };
}

;// ./node_modules/@pnp/sp/utils/file-names.js
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

;// ./node_modules/@pnp/sp/presets/all.js



























































































;// ./node_modules/@pnp/sp-admin/types.js
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

;// ./node_modules/@pnp/sp-admin/office-tenant.js




let _Office365Tenant = class _Office365Tenant extends _SPInstance {
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
_Office365Tenant = __decorate([
    defaultPath("_api/Microsoft.Online.SharePoint.TenantManagement.Office365Tenant")
], _Office365Tenant);
const Office365Tenant = spInvokableFactory(_Office365Tenant);

;// ./node_modules/@pnp/sp-admin/site-properties.js



let _TenantSiteProperties = class _TenantSiteProperties extends _SPInstance {
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
_TenantSiteProperties = __decorate([
    defaultPath("_api/Microsoft.Online.SharePoint.TenantAdministration.SiteProperties")
], _TenantSiteProperties);
const TenantSiteProperties = spInvokableFactory(_TenantSiteProperties);

;// ./node_modules/@pnp/sp-admin/tenant.js



let _Tenant = class _Tenant extends _SPInstance {
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
     * Sets site object for the given site id
     *
     * @param siteId the id of the site (i.e. _api/site -- not root web)
     * @param props properties to be updated
     */
    setSitePropertiesById(siteId, properties) {
        return spPatch(Tenant(this, `sites('${siteId}')`), body(properties));
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
_Tenant = __decorate([
    defaultPath("_api/SPO.Tenant")
], _Tenant);
const Tenant = spInvokableFactory(_Tenant);

;// ./node_modules/@pnp/sp-admin/index.js






Reflect.defineProperty(SPFI.prototype, "admin", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(Admin);
    },
});
class _Admin extends _SPQueryable {
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
const Admin = spInvokableFactory(_Admin);

;// ./pnpjs-sources/index-sp.ts



/******/ 	return __webpack_exports__;
/******/ })()
;
});