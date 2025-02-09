import { IProxy } from "../../../store/proxy/types";

export const addProxyScript = (proxies: IProxy[], update?: boolean) => {

  if (proxies.length === 0) {
    if ((window as any).__fetchInterceptorRegistered) {
      window.fetch = (window as any).__originalFetch;
      (window as any).__fetchInterceptorRegistered = false;
      console.log('SP Editor proxy removed');
    }
    return { success: true };
  }

  if ((window as any).__fetchInterceptorRegistered && update) {
    window.fetch = (window as any).__originalFetch;
    (window as any).__fetchInterceptorRegistered = false;
    console.log('SP Editor proxy updated');
  }

  if (!(window as any).__fetchInterceptorRegistered) {
    console.log('SP Editor proxy added');

    const originalFetch = window.fetch;
    (window as any).__originalFetch = originalFetch; 
    window.fetch = async function (input, init) {

      let url;
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
      }

      for (const proxy of proxies) {
        if (url && url.indexOf(proxy.url) > -1 && Math.random() < proxy.failRate) {
          console.warn(`SP Editor blocked ${url}`);
          return new Response(
            proxy.responseBody,
            {
              status: proxy.status,
              statusText: proxy.statusText,
              headers: proxy.responseHeaders,
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