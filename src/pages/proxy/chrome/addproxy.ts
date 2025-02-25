import { IProxy } from "../../../store/proxy/types";

export const addProxyScript = (proxies: IProxy[], enabled: boolean, update?: boolean) => {

  function shouldFail(failRate: number): boolean {
    if (failRate === 0) {
      return false; // Always false if failRate is 0
    } else if (failRate === 1) {
      return true; // Always true if failRate is 1
    } else {
      return Math.random() < failRate; // Use Math.random() for other values
    }
  }

  function safeParseHeaders(headers: string | undefined): Headers | undefined {
    if (!headers) return undefined;
    try {
      return new Headers(JSON.parse(headers));
    } catch (error) {
      console.error('Failed to parse headers:', error);
      return undefined;
    }
  }

  if (!enabled) {
    if ((window as any).__fetchInterceptorRegistered) {
      window.fetch = (window as any).__originalFetch;
      (window as any).__fetchInterceptorRegistered = false;
      console.log('SP Editor proxy removed');
    }
    return { success: true };
  }

  if (enabled && (window as any).__fetchInterceptorRegistered && update) {
    window.fetch = (window as any).__originalFetch;
    (window as any).__fetchInterceptorRegistered = false;
  }

  if (enabled && !(window as any).__fetchInterceptorRegistered) {
    console.log(update ? 'SP Editor proxy updated' : 'SP Editor proxy added');

    const originalFetch = window.fetch;
    (window as any).__originalFetch = originalFetch; 
    window.fetch = async function (input, init) {

      let url;
      let method = 'GET'; // Default method
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
        method = input.method || 'GET';
      }

      for (const proxy of proxies) {
        const methodMatches = proxy.methods.includes('ALL') || proxy.methods.includes(method);
        if (proxy.enabled && url && url.indexOf(proxy.url.trim()) > -1 && methodMatches && shouldFail(proxy.failRate)) {
          console.warn(`SP Editor blocked ${url}`);
          return new Response(
            proxy.responseBody,
            {
              status: Number(proxy.status),
              statusText: proxy.statusText,
              headers: safeParseHeaders(proxy.responseHeaders),
            }
          );
        }
      }

      const response = await originalFetch(input, init);
      return response;
    };
    (window as any).__fetchInterceptorRegistered = true;
  }

  return { success: true };
};