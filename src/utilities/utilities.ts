export const getSystemjsPath = (): string => {
  return `var sj = '${chrome.extension.getURL('bundles/system.js')}';`
}
export const getPnpjsPath = (): string => {
  return `var speditorpnp = '${chrome.extension.getURL('bundles/pnpjs.es5.umd.bundle.js')}';`
}
export const spDelay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export const groupBy = (xs: any[], key: string) => {
  return xs.reduce((rv: any, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
export const createGroupData = (arr: any[], by: string) => {
  const grouped = groupBy(arr, by)
  const groupData: any[] = []
  let groupIndex = 0
  Object.keys(grouped).forEach((group) => {
    groupData.push({ key: group + groupIndex, name: group, startIndex: groupIndex, count: grouped[group].length, level: 0, isCollapsed: false })
    groupIndex += grouped[group].length
  })
  return groupData
}
