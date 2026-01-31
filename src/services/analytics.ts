/**
 * Simple Google Analytics 4 Measurement Protocol Service
 * Tracks: extension opens, feature navigation, popup link clicks
 */

// GA4 Configuration - Set via environment variables
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';
const GA_API_SECRET = process.env.REACT_APP_GA_API_SECRET || '';

const GA_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

const CLIENT_ID_KEY = 'sp_editor_ga_client_id';

/**
 * Get or generate a persistent client ID
 */
async function getClientId(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get([CLIENT_ID_KEY], (result) => {
        if (result[CLIENT_ID_KEY]) {
          resolve(result[CLIENT_ID_KEY]);
        } else {
          const newClientId = crypto.randomUUID();
          chrome.storage.local.set({ [CLIENT_ID_KEY]: newClientId });
          resolve(newClientId);
        }
      });
    } else {
      // Fallback for development
      let clientId = localStorage.getItem(CLIENT_ID_KEY);
      if (!clientId) {
        clientId = crypto.randomUUID();
        localStorage.setItem(CLIENT_ID_KEY, clientId);
      }
      resolve(clientId);
    }
  });
}

/**
 * Get the extension ID and browser type
 */
function getExtensionInfo(): { extensionId: string; browser: string } {
  const extensionId = typeof chrome !== 'undefined' && chrome.runtime?.id 
    ? chrome.runtime.id 
    : 'development';
  
  // Detect browser based on user agent
  const ua = navigator.userAgent;
  let browser = 'unknown';
  if (ua.includes('Edg/')) {
    browser = 'edge';
  } else if (ua.includes('Chrome/')) {
    browser = 'chrome';
  }
  
  return { extensionId, browser };
}

/**
 * Send event to GA4
 */
async function sendEvent(eventName: string, params: Record<string, string | number> = {}): Promise<void> {
  try {
    const clientId = await getClientId();
    const { extensionId, browser } = getExtensionInfo();
    
    const payload = {
      client_id: clientId,
      events: [{
        name: eventName,
        params: {
          ...params,
          extension_id: extensionId,
          browser: browser,
          page_location: `chrome-extension://${extensionId}`,
          engagement_time_msec: 100,
        }
      }]
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon(GA_ENDPOINT, JSON.stringify(payload));
    } else {
      fetch(GA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch {
    // Silently fail - analytics should never break the app
  }
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Track when DevTools extension is opened
 */
export function trackDevToolsOpen(): void {
  sendEvent('devtools_open');
}

/**
 * Track when Popup extension is opened
 */
export function trackPopupOpen(): void {
  sendEvent('popup_open');
}

/**
 * Track navigation to a feature in DevTools
 * @param featureName - The feature being accessed (e.g., 'pnpjsconsole', 'search')
 * @param featureTitle - Human readable title (e.g., 'PnP JS Console')
 */
export function trackFeatureNavigation(featureName: string, featureTitle: string): void {
  sendEvent('feature_view', {
    feature_name: featureName,
    feature_title: featureTitle,
  });
}

/**
 * Track link click in Popup
 * @param linkName - The link identifier (e.g., 'admin_center', 'site_settings')
 */
export function trackPopupLinkClick(linkName: string): void {
  sendEvent('popup_link_click', {
    link_name: linkName,
  });
}
