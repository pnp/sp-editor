/**
 * Google Analytics 4 usage statistics, sent with the Measurement Protocol.
 *
 * Manifest V3 extensions cannot load gtag.js, so events are sent directly. The
 * Measurement Protocol does not derive location or device from the request, so
 * they are added here:
 *  - country: from the browser's time zone (no IP lookup, no extra permission)
 *  - device: browser, OS, language and screen size
 *  - sessions: a session id that renews after 30 minutes without events
 *
 * Never sent: names, emails, SharePoint URLs, tenant names, code, queries,
 * prompts or any other content.
 *
 * Events are sent only from store installs and only while usage statistics
 * are enabled (navigation menu → "Send anonymous usage statistics").
 *
 * Testing in an unpacked build, in the extension's DevTools console:
 *   localStorage.setItem('sp_analytics_debug', '1')     // validate and log, never reported
 *   localStorage.setItem('sp_analytics_debug', 'send')  // really send and log (shows in GA Realtime)
 *   localStorage.removeItem('sp_analytics_debug')
 */

import { countryForTimeZone } from './analyticsTimeZones';

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';
const GA_API_SECRET = process.env.REACT_APP_GA_API_SECRET || '';

const GA_QUERY = `measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;
const GA_ENDPOINT = `https://www.google-analytics.com/mp/collect?${GA_QUERY}`;
const GA_DEBUG_ENDPOINT = `https://www.google-analytics.com/debug/mp/collect?${GA_QUERY}`;

const CLIENT_ID_KEY = 'sp_editor_ga_client_id';
const SESSION_KEY = 'sp_editor_ga_session';
const ENABLED_KEY = 'sp_editor_analytics_enabled';
const DEBUG_KEY = 'sp_analytics_debug';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
/** Engagement time credited per event is capped, as a DevTools panel can stay
 *  open while the user works elsewhere. */
const MAX_ENGAGEMENT_MS = 60 * 1000;
const FIRST_EVENT_ENGAGEMENT_MS = 100;

type Params = Record<string, string | number>;

// ── Storage (chrome.storage.local, shared by the popup and DevTools) ─────────

const hasChromeStorage = () => typeof chrome !== 'undefined' && !!chrome.storage?.local;

function storageGet<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) {
      resolve(undefined);
      return;
    }
    chrome.storage.local.get([key], (result) => resolve(result?.[key] as T | undefined));
  });
}

function storageSet(values: Record<string, unknown>): Promise<void> {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) {
      resolve();
      return;
    }
    chrome.storage.local.set(values, () => resolve());
  });
}

function storageRemove(keys: string[]): Promise<void> {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) {
      resolve();
      return;
    }
    chrome.storage.local.remove(keys, () => resolve());
  });
}

// ── Opt-out ──────────────────────────────────────────────────────────────────

/** True unless the user has turned usage statistics off. */
export async function isAnalyticsEnabled(): Promise<boolean> {
  return (await storageGet<boolean>(ENABLED_KEY)) !== false;
}

/**
 * Turns usage statistics on or off for this browser profile. Turning them off
 * also deletes the random install id and session, so turning them back on
 * starts as a new, unconnected user.
 */
export async function setAnalyticsEnabled(enabled: boolean): Promise<void> {
  await storageSet({ [ENABLED_KEY]: enabled });
  if (!enabled) await storageRemove([CLIENT_ID_KEY, SESSION_KEY]);
}

// ── Identity and session ─────────────────────────────────────────────────────

/**
 * Random id for this install, so GA can count users. Not linked to any account.
 * New ids use gtag's "<random>.<seconds>" format; ids created by older versions
 * (UUIDs) are kept, so existing users are not counted as new.
 */
async function getClientId(): Promise<string> {
  const existing = await storageGet<string>(CLIENT_ID_KEY);
  if (existing) return existing;
  const random = crypto.getRandomValues(new Uint32Array(1))[0];
  const clientId = `${random}.${Math.floor(Date.now() / 1000)}`;
  await storageSet({ [CLIENT_ID_KEY]: clientId });
  return clientId;
}

interface ISession {
  id: number;
  lastEventAt: number;
}

/** Time of the previous event sent from this popup or DevTools panel (not shared). */
let lastEventInThisWindow: number | undefined;

/**
 * Session id plus the engagement time to credit to this event.
 *
 * The session is shared by the popup and DevTools (like browser tabs on a
 * website) and ends after 30 minutes without events. Engagement time is only
 * the time since the previous event in the same popup or panel, so time spent
 * elsewhere between two popup visits is not counted.
 */
async function nextSession(): Promise<{ sessionId: number; engagementMs: number }> {
  const now = Date.now();
  const stored = await storageGet<ISession>(SESSION_KEY);
  const active = stored && now - stored.lastEventAt < SESSION_TIMEOUT_MS ? stored : undefined;
  const sessionId = active ? active.id : Math.floor(now / 1000);
  const engagementMs =
    active && lastEventInThisWindow !== undefined
      ? Math.min(Math.max(now - lastEventInThisWindow, 1), MAX_ENGAGEMENT_MS)
      : FIRST_EVENT_ENGAGEMENT_MS;
  lastEventInThisWindow = now;
  await storageSet({ [SESSION_KEY]: { id: sessionId, lastEventAt: now } });
  return { sessionId, engagementMs };
}

// ── Environment ──────────────────────────────────────────────────────────────

const manifest = (): chrome.runtime.Manifest | undefined => {
  try {
    return typeof chrome !== 'undefined' ? chrome.runtime?.getManifest?.() : undefined;
  } catch {
    return undefined;
  }
};

/** Store installs have an update_url added by the store; unpacked builds do not. */
const isStoreInstall = () => !!manifest()?.update_url;

/** '1': validate only; 'send': really send from an unpacked build; undefined: normal. */
const debugMode = (): 'validate' | 'send' | undefined => {
  try {
    const value = localStorage.getItem(DEBUG_KEY);
    if (value === 'send') return 'send';
    return value === '1' ? 'validate' : undefined;
  } catch {
    return undefined;
  }
};

function getExtensionInfo(): { extensionId: string; browser: string } {
  const extensionId = typeof chrome !== 'undefined' && chrome.runtime?.id ? chrome.runtime.id : 'development';
  const ua = navigator.userAgent;
  const browser = ua.includes('Edg/') ? 'edge' : ua.includes('Chrome/') ? 'chrome' : 'unknown';
  return { extensionId, browser };
}

function getTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

/** Country from the time zone; for zones without one (e.g. UTC), the language region ("fi-FI" → FI). */
function getCountry(timeZone: string | undefined): string | undefined {
  const fromTimeZone = timeZone ? countryForTimeZone(timeZone) : undefined;
  if (fromTimeZone) return fromTimeZone;
  const region = navigator.language?.split('-')[1];
  return region && /^[A-Za-z]{2}$/.test(region) ? region.toUpperCase() : undefined;
}

interface IDevice {
  category: string;
  language?: string;
  screen_resolution?: string;
  operating_system?: string;
  operating_system_version?: string;
  browser?: string;
  browser_version?: string;
}

const BRAND_NAMES: Record<string, string> = {
  'Microsoft Edge': 'Edge',
  'Google Chrome': 'Chrome',
  Brave: 'Brave',
  Opera: 'Opera',
  Vivaldi: 'Vivaldi',
};

function osVersion(platform: string | undefined, version: string | undefined): string | undefined {
  if (!version) return undefined;
  const major = Number.parseInt(version, 10);
  if (platform === 'Windows') {
    // Chromium reports Windows 11 as platform version 13 or higher.
    if (major >= 13) return '11';
    if (major > 0) return '10';
    return undefined;
  }
  return version.split('.').slice(0, 2).join('.');
}

let devicePromise: Promise<IDevice> | undefined;

/** Device details, read once per page. Uses User-Agent Client Hints where available. */
function getDevice(): Promise<IDevice> {
  if (!devicePromise) {
    devicePromise = (async () => {
      const device: IDevice = { category: 'desktop' };
      try {
        device.language = navigator.language || undefined;
        const { width, height } = window.screen ?? {};
        if (width && height) device.screen_resolution = `${width}x${height}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uaData = (navigator as any).userAgentData;
        if (uaData) {
          device.operating_system = uaData.platform || undefined;
          const hints = await uaData.getHighEntropyValues(['platformVersion', 'fullVersionList']).catch(() => undefined);
          device.operating_system_version = osVersion(device.operating_system, hints?.platformVersion);
          const brands: { brand: string; version: string }[] = hints?.fullVersionList ?? uaData.brands ?? [];
          const known = brands.find((b) => BRAND_NAMES[b.brand]);
          const chromium = brands.find((b) => b.brand === 'Chromium');
          const brand = known ?? chromium;
          if (brand) {
            device.browser = BRAND_NAMES[brand.brand] ?? brand.brand;
            device.browser_version = brand.version;
          }
        }
      } catch {
        // Partial device info is fine.
      }
      return device;
    })();
  }
  return devicePromise;
}

// ── Sending ──────────────────────────────────────────────────────────────────

async function sendEvent(eventName: string, params: Params = {}): Promise<void> {
  try {
    if (!GA_MEASUREMENT_ID || !GA_API_SECRET) return;
    const debug = debugMode();
    if (!debug && !isStoreInstall()) return;
    if (!(await isAnalyticsEnabled())) return;

    const [clientId, session, device] = await Promise.all([getClientId(), nextSession(), getDevice()]);
    const { extensionId, browser } = getExtensionInfo();
    const timeZone = getTimeZone();
    const country = getCountry(timeZone);
    const version = manifest()?.version;

    const payload = {
      client_id: clientId,
      ...(country ? { user_location: { country_id: country } } : {}),
      device,
      user_properties: {
        ...(version ? { extension_version: { value: version } } : {}),
        ...(timeZone ? { time_zone: { value: timeZone.slice(0, 36) } } : {}),
      },
      events: [
        {
          name: eventName,
          params: {
            ...params,
            extension_id: extensionId,
            browser,
            page_location: `chrome-extension://${extensionId}`,
            session_id: session.sessionId,
            engagement_time_msec: session.engagementMs,
          },
        },
      ],
    };
    const body = JSON.stringify(payload);

    if (debug === 'validate') {
      const response = await fetch(GA_DEBUG_ENDPOINT, { method: 'POST', body });
      const result = await response.json().catch(() => undefined);
      const messages = result?.validationMessages ?? [];
      // eslint-disable-next-line no-console
      console.info(
        `[SP Editor analytics] ${eventName} (debug, not reported)`,
        messages.length ? messages : 'valid',
        payload,
      );
      return;
    }

    if (debug === 'send') {
      // eslint-disable-next-line no-console
      console.info(`[SP Editor analytics] ${eventName} (debug, sent to GA)`, payload);
    }

    if (navigator.sendBeacon) {
      navigator.sendBeacon(GA_ENDPOINT, body);
    } else {
      fetch(GA_ENDPOINT, { method: 'POST', body, keepalive: true }).catch(() => undefined);
    }
  } catch {
    // Analytics must never break the app.
  }
}

// ============================================================================
// Public API — feature_name is only on feature_view (DevTools features).
// AI events use page_context, popup links use link_name.
// ============================================================================

/** DevTools extension opened. */
export function trackDevToolsOpen(): void {
  void sendEvent('devtools_open');
}

/** Popup opened. */
export function trackPopupOpen(): void {
  void sendEvent('popup_open');
}

/**
 * Navigation to a feature in DevTools.
 * @param featureName - Feature key (e.g. 'pnpjsconsole', 'search')
 * @param featureTitle - Human readable title (e.g. 'PnP JS Console')
 */
export function trackFeatureNavigation(featureName: string, featureTitle: string): void {
  void sendEvent('feature_view', {
    feature_name: featureName,
    feature_title: featureTitle,
  });
}

/**
 * Link click in the popup.
 * @param linkName - Link identifier (e.g. 'admin_center', 'site_settings')
 */
export function trackPopupLinkClick(linkName: string): void {
  void sendEvent('popup_link_click', {
    link_name: linkName,
  });
}

/**
 * AI Assistant panel opened from the header button.
 * @param pageContext - The page it was opened on (e.g. 'pnpjsconsole')
 */
export function trackAiPanelOpen(pageContext?: string): void {
  void sendEvent('ai_panel_open', pageContext ? { page_context: pageContext } : {});
}

/**
 * Prompt submitted in the AI Assistant.
 * @param pageContext - The active page (e.g. 'pnpjsconsole', 'graphsdkconsole', 'search')
 * @param provider - The AI provider used (e.g. 'github-copilot', 'claude-code')
 */
export function trackAiPromptSubmit(pageContext: string, provider?: string): void {
  void sendEvent('ai_prompt_submit', {
    page_context: pageContext,
    ...(provider ? { ai_provider: provider } : {}),
  });
}

/**
 * "Analyze with AI" clicked on a console entry.
 * @param pageContext - The console page (e.g. 'pnpjsconsole', 'graphsdkconsole')
 */
export function trackAiAnalyzeClick(pageContext: string): void {
  void sendEvent('ai_analyze_click', {
    page_context: pageContext,
  });
}
