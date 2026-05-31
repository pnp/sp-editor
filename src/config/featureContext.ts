export interface IFeatureContextMeta {
  key: string
  title: string
  routes: string[]
}

// Single source of truth for feature keys, display names, and route mappings.
export const FEATURE_CONTEXTS: IFeatureContextMeta[] = [
  { key: 'home', title: 'Home', routes: ['/', '/index.html'] },
  { key: 'scriptlinks', title: 'Scriptlinks', routes: ['/scriptlinks'] },
  { key: 'pnpjsconsole', title: 'PnP JS Console', routes: ['/pnpjsconsole'] },
  { key: 'graphsdkconsole', title: 'Graph SDK Console', routes: ['/graphsdkconsole'] },
  { key: 'mgtconsole', title: 'MGT React Playground', routes: ['/mgtconsole'] },
  { key: 'webproperties', title: 'Web Properties', routes: ['/webproperties'] },
  { key: 'listproperties', title: 'List Properties', routes: ['/listproperties'] },
  { key: 'spshooter', title: 'SP Shooter', routes: ['/spshooter'] },
  { key: 'webhooks', title: 'Webhooks', routes: ['/webhooks'] },
  { key: 'search', title: 'Search', routes: ['/search'] },
  { key: 'fileexplorer', title: 'File Editor', routes: ['/fileexplorer'] },
  { key: 'proxy', title: 'Proxy', routes: ['/proxy'] },
  { key: 'customizers', title: 'Customizers', routes: ['/customizers'] },
  { key: 'adminfeatures', title: 'Admin Features', routes: ['/adminfeatures'] },
  { key: 'tenantproperties', title: 'Tenant Properties', routes: ['/tenantproperties'] },
  { key: 'siteproperties', title: 'Site Properties', routes: ['/siteproperties'] },
  { key: 'queryBuilder', title: 'Query Builder', routes: ['/queryBuilder'] },
  { key: 'siteprovisioning', title: 'Site Templates', routes: ['/siteprovisioning'] },
  { key: 'themedesigner', title: 'Live Theme Designer', routes: ['/themedesigner'] },
  { key: 'pagewebparts', title: 'Page Web Parts', routes: ['/pagewebparts'] },
  { key: 'fieldCustomizers', title: 'Field Customizers', routes: ['/customizers/fieldcustomizers'] },
  { key: 'formCustomizers', title: 'Form Customizers', routes: ['/customizers/formcustomizers'] },
]

const CONTEXT_BY_KEY: Record<string, IFeatureContextMeta> = FEATURE_CONTEXTS.reduce(
  (acc, item) => {
    acc[item.key] = item
    return acc
  },
  {} as Record<string, IFeatureContextMeta>
)

const ROUTE_ENTRIES = FEATURE_CONTEXTS.flatMap((item) => item.routes.map((route) => [route, item.key] as const))

export const CONTEXT_KEY_BY_ROUTE: Record<string, string> = ROUTE_ENTRIES.reduce(
  (acc, [route, key]) => {
    acc[route] = key
    return acc
  },
  {} as Record<string, string>
)

export function getContextKeyFromPath(pathname: string): string {
  if (!pathname || pathname === '/' || pathname === '/index.html') {
    return 'home'
  }

  const exact = CONTEXT_KEY_BY_ROUTE[pathname]
  if (exact) {
    return exact
  }

  const matchedRoute = Object.keys(CONTEXT_KEY_BY_ROUTE)
    .filter((route) => route && route !== '/' && route !== '/index.html' && pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0]

  if (matchedRoute) {
    return CONTEXT_KEY_BY_ROUTE[matchedRoute]
  }

  const cleaned = pathname.replace(/^\/+/, '').replace(/\/+$/, '')
  return cleaned || 'home'
}

export function getContextDisplayName(contextKey: string): string {
  return CONTEXT_BY_KEY[contextKey]?.title || contextKey
}

export function getFeatureContextMeta(contextKey: string): IFeatureContextMeta | undefined {
  return CONTEXT_BY_KEY[contextKey]
}