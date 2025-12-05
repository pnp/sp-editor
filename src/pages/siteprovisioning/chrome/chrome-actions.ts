import { Dispatch } from 'redux'
import {
  setSiteScripts,
  setSiteDesigns,
  setError,
} from '../../../store/siteprovisioning/actions'
import { setLoading } from '../../../store/home/actions'
import { ISiteScript, ISiteDesign } from '../../../store/siteprovisioning/types'
import { getSiteScripts } from './get-site-scripts'
import { createSiteScript } from './create-site-script'
import { updateSiteScript } from './update-site-script'
import { deleteSiteScript } from './delete-site-script'
import { getSiteDesigns } from './get-site-designs'
import { createSiteDesign, ICreateSiteDesignInfo } from './create-site-design'
import { updateSiteDesign, IUpdateSiteDesignInfo } from './update-site-design'
import { deleteSiteDesign } from './delete-site-design'

// Re-export types
export type { ICreateSiteDesignInfo, IUpdateSiteDesignInfo }

// Load all site scripts
export async function loadAllSiteScripts(dispatch: Dispatch, tabId: number, includeOOTB: boolean = false) {
  dispatch(setLoading(true))
  dispatch(setError(null))

  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [includeOOTB],
    func: getSiteScripts,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setSiteScripts(res.result as ISiteScript[]))
      } else {
        dispatch(setError(res.errorMessage))
      }
    }
    dispatch(setLoading(false))
  }).catch((err) => {
    dispatch(setError(err.message))
    dispatch(setLoading(false))
  })
}

// Load all site designs
export async function loadAllSiteDesigns(dispatch: Dispatch, tabId: number, includeOOTB: boolean = false) {
  dispatch(setLoading(true))
  dispatch(setError(null))

  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [includeOOTB],
    func: getSiteDesigns,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setSiteDesigns(res.result as ISiteDesign[]))
      } else {
        dispatch(setError(res.errorMessage))
      }
    }
    dispatch(setLoading(false))
  }).catch((err) => {
    dispatch(setError(err.message))
    dispatch(setLoading(false))
  })
}

// Load both scripts and designs
export async function loadAll(dispatch: Dispatch, tabId: number, includeOOTB: boolean = false) {
  dispatch(setLoading(true))
  dispatch(setError(null))

  try {
    // Load custom scripts (always)
    const customScriptsResult = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [false],
      func: getSiteScripts,
    })

    let allScripts: ISiteScript[] = []
    if (customScriptsResult[0].result) {
      const res = customScriptsResult[0].result as any
      if (res.success) {
        allScripts = res.result as ISiteScript[]
      } else {
        console.error('Failed to load custom site scripts:', res.errorMessage)
      }
    }

    // Load OOTB scripts if toggle is on
    if (includeOOTB) {
      const ootbScriptsResult = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        args: [true],
        func: getSiteScripts,
      })

      if (ootbScriptsResult[0].result) {
        const res = ootbScriptsResult[0].result as any
        if (res.success) {
          const ootbScripts = res.result as ISiteScript[]
          allScripts = [...allScripts, ...ootbScripts]
        }
      }
    }

    dispatch(setSiteScripts(allScripts))

    // Load custom designs (always)
    const customDesignsResult = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [false],
      func: getSiteDesigns,
    })

    let allDesigns: ISiteDesign[] = []
    if (customDesignsResult[0].result) {
      const res = customDesignsResult[0].result as any
      if (res.success) {
        allDesigns = res.result as ISiteDesign[]
      } else {
        console.error('Failed to load custom site designs:', res.errorMessage)
      }
    }

    // Load OOTB designs if toggle is on
    if (includeOOTB) {
      const ootbDesignsResult = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        args: [true],
        func: getSiteDesigns,
      })

      if (ootbDesignsResult[0].result) {
        const res = ootbDesignsResult[0].result as any
        if (res.success) {
          const ootbDesigns = res.result as ISiteDesign[]
          allDesigns = [...allDesigns, ...ootbDesigns]
        }
      }
    }

    dispatch(setSiteDesigns(allDesigns))
    dispatch(setLoading(false))
  } catch (err: any) {
    dispatch(setError(err.message))
    dispatch(setLoading(false))
  }
}

// Create a new site script
export async function createNewSiteScript(
  tabId: number,
  title: string,
  description: string,
  content: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [title, description, content],
      func: createSiteScript,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to create site script'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Update an existing site script
export async function updateExistingSiteScript(
  tabId: number,
  id: string,
  title: string,
  description: string,
  content: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [id, title, description, content],
      func: updateSiteScript,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to update site script'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Delete a site script
export async function deleteExistingSiteScript(tabId: number, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [id],
      func: deleteSiteScript,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to delete site script'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Create a new site design
export async function createNewSiteDesign(
  tabId: number,
  info: ICreateSiteDesignInfo
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [info],
      func: createSiteDesign,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to create site design'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Update an existing site design
export async function updateExistingSiteDesign(
  tabId: number,
  info: IUpdateSiteDesignInfo
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [info],
      func: updateSiteDesign,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to update site design'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Delete a site design
export async function deleteExistingSiteDesign(tabId: number, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [id],
      func: deleteSiteDesign,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to delete site design'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}
