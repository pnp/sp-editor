import { Dispatch } from 'redux'
import {
  setSiteScripts,
  setSiteDesigns,
  setError,
  setLists,
  setGeneratedJson,
} from '../../../store/siteprovisioning/actions'
import { setLoading } from '../../../store/home/actions'
import { ISiteScript, ISiteDesign, IListInfo } from '../../../store/siteprovisioning/types'
import { getSiteScripts } from './get-site-scripts'
import { createSiteScript } from './create-site-script'
import { updateSiteScript } from './update-site-script'
import { deleteSiteScript } from './delete-site-script'
import { getSiteDesigns } from './get-site-designs'
import { createSiteDesign, ICreateSiteDesignInfo } from './create-site-design'
import { updateSiteDesign, IUpdateSiteDesignInfo } from './update-site-design'
import { deleteSiteDesign } from './delete-site-design'
import { getLists } from './get-lists'
import { getSiteScriptFromList } from './get-sitescript-from-list'
import { getSiteScriptFromWeb, IGetSiteScriptFromWebInfo } from './get-sitescript-from-web'
import { getSiteDesignRuns, ISiteDesignRun } from './get-site-design-runs'
import { getSiteDesignRunStatus, ISiteDesignRunAction } from './get-site-design-run-status'
import { getSiteDesignStages, ISiteDesignStage, ISiteDesignStagesResult } from './get-sitescript-stages'
import { createSiteScriptPackage, ICreateSiteScriptPackageInfo } from './create-sitescript-package'
import { executeSiteScriptAction, IExecuteSiteScriptResult, IActionOutcome } from './execute-sitescript-action'

// Re-export types
export type { ICreateSiteDesignInfo, IUpdateSiteDesignInfo, IGetSiteScriptFromWebInfo, ISiteDesignRun, ISiteDesignRunAction, ISiteDesignStage, ISiteDesignStagesResult, ICreateSiteScriptPackageInfo, IExecuteSiteScriptResult, IActionOutcome }

// Load all site scripts
export async function loadAllSiteScripts(dispatch: Dispatch, tabId: number, includeOOTB: boolean = false) {
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
        dispatch(setError(res.errorMessage))
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
    dispatch(setLoading(false))
  } catch (err: any) {
    dispatch(setError(err.message))
    dispatch(setLoading(false))
  }
}

// Load all site designs
export async function loadAllSiteDesigns(dispatch: Dispatch, tabId: number, includeOOTB: boolean = false) {
  dispatch(setLoading(true))
  dispatch(setError(null))

  try {
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
        dispatch(setError(res.errorMessage))
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
  content: string,
  version: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [id, title, description, content, version],
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
): Promise<ISiteDesign> {
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
          resolve(res.result as ISiteDesign)
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

// Load lists for dropdown
export async function loadLists(dispatch: Dispatch, tabId: number) {
  dispatch(setLoading(true))

  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [],
    func: getLists,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setLists(res.result as IListInfo[]))
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

// Generate site script from list
export async function generateSiteScriptFromList(dispatch: Dispatch, tabId: number, listUrl: string): Promise<string> {
  dispatch(setLoading(true))
  dispatch(setGeneratedJson(''))

  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [listUrl],
      func: getSiteScriptFromList,
    }).then((injectionResults) => {
      dispatch(setLoading(false))
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          dispatch(setGeneratedJson(res.result))
          resolve(res.result)
        } else {
          dispatch(setError(res.errorMessage))
          reject(new Error(res.errorMessage))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch((err) => {
      dispatch(setLoading(false))
      dispatch(setError(err.message))
      reject(err)
    })
  })
}

// Generate site script from current web
export async function generateSiteScriptFromWeb(
  dispatch: Dispatch,
  tabId: number,
  options: IGetSiteScriptFromWebInfo
): Promise<{ json: string; webUrl: string }> {
  dispatch(setLoading(true))
  dispatch(setGeneratedJson(''))

  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [options],
      func: getSiteScriptFromWeb,
    }).then((injectionResults) => {
      dispatch(setLoading(false))
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          dispatch(setGeneratedJson(res.result))
          resolve({ json: res.result, webUrl: res.webUrl })
        } else {
          dispatch(setError(res.errorMessage))
          reject(new Error(res.errorMessage))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch((err) => {
      dispatch(setLoading(false))
      dispatch(setError(err.message))
      reject(err)
    })
  })
}

// Get site design runs for current site
export async function fetchSiteDesignRuns(
  tabId: number
): Promise<{ runs: ISiteDesignRun[]; webUrl: string }> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [],
      func: getSiteDesignRuns,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve({ runs: res.result as ISiteDesignRun[], webUrl: res.webUrl })
        } else {
          reject(new Error(res.errorMessage || 'Failed to get site design runs'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Get site design run status (action details)
export async function fetchSiteDesignRunStatus(
  tabId: number,
  runId: string,
  webUrl: string
): Promise<ISiteDesignRunAction[]> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [runId, webUrl],
      func: getSiteDesignRunStatus,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve(res.result as ISiteDesignRunAction[])
        } else {
          reject(new Error(res.errorMessage || 'Failed to get site design run status'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Get site script stages/actions preview
export async function fetchSiteDesignStages(
  tabId: number,
  siteDesignId: string
): Promise<ISiteDesignStagesResult> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [siteDesignId],
      func: getSiteDesignStages,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve(res.result as ISiteDesignStagesResult)
        } else {
          reject(new Error(res.errorMessage || 'Failed to get site design stages'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Upload a site script package (ZIP file)
export async function uploadSiteScriptPackage(
  tabId: number,
  info: ICreateSiteScriptPackageInfo
): Promise<ISiteScript> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [info],
      func: createSiteScriptPackage,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve(res.result as ISiteScript)
        } else {
          reject(new Error(res.errorMessage || 'Failed to upload site script package'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Execute a site script on the current site
// Parses the script and executes each action via ExecuteSiteScriptAction API
export async function runSiteScript(
  tabId: number,
  scriptContent: string,
  replaceParameters: boolean = true
): Promise<IExecuteSiteScriptResult> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [scriptContent, replaceParameters],
      func: executeSiteScriptAction,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve(res.result as IExecuteSiteScriptResult)
        } else {
          reject(new Error(res.errorMessage || 'Failed to execute site script'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}
