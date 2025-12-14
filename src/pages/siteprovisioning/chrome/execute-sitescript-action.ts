export interface IExecuteSiteScriptResult {
  actionOutcomes: IActionOutcome[]
}

export interface IActionOutcome {
  title: string
  outcome: string
  outcomeCode: number
  target: string
}

/**
 * Executes a site script action directly on the current site.
 * The actionDefinition should be a SINGLE action object (e.g., {"verb": "createSPList", ...})
 * NOT the full site script JSON with $schema and actions array.
 * 
 * For a full site script, this function will extract and execute each action individually.
 * 
 * @param scriptContent - The site script JSON content (full script or single action)
 * @returns Promise with action outcomes
 */
export const executeSiteScriptAction = (scriptContent: string, replaceParameters: boolean = true) => {
  // Handle modern pages where _spPageContextInfo may not be immediately available
  const getPageContext = (): Promise<any> => {
    if ((window as any)._spPageContextInfo) {
      return Promise.resolve((window as any)._spPageContextInfo)
    }
    if ((window as any).moduleLoaderPromise) {
      return (window as any).moduleLoaderPromise.then((e: any) => {
        ;(window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext
        return (window as any)._spPageContextInfo
      })
    }
    return Promise.resolve(null)
  }

  return getPageContext()
    .then(async (pageContext) => {
      const siteUrl = pageContext?.siteAbsoluteUrl || ''

      // Get request digest
      const contextInfo = await fetch(siteUrl + '/_api/contextinfo', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json; odata=verbose',
          'Content-Type': 'application/json',
          'X-ClientService-ClientTag': 'SPEDITOR',
        },
      }).then((res) => res.json())

      const digest = contextInfo.d.GetContextWebInformation.FormDigestValue

      // Parse the script content
      let parsedScript: any
      try {
        parsedScript = JSON.parse(scriptContent)
      } catch (e) {
        return {
          success: false,
          result: null,
          errorMessage: 'Invalid JSON in script content',
          source: 'chrome-sp-editor',
        }
      }

      // Extract actions - if it's a full site script, get the actions array
      // If it's already a single action (has "verb"), wrap it in an array
      let actions: any[] = []
      if (parsedScript.actions && Array.isArray(parsedScript.actions)) {
        actions = parsedScript.actions
      } else if (parsedScript.verb) {
        actions = [parsedScript]
      } else {
        return {
          success: false,
          result: null,
          errorMessage: 'Script must have an "actions" array or be a single action with a "verb"',
          source: 'chrome-sp-editor',
        }
      }

      // Get parameters and bindings from the script
      const parameters = parsedScript.parameters || {}
      const rawBindings = parsedScript.bindings || {}
      
      // Extract defaultValue from bindings (new format has { source: "Input", defaultValue: "..." })
      const bindings: { [key: string]: any } = {}
      for (const key of Object.keys(rawBindings)) {
        const binding = rawBindings[key]
        if (binding && typeof binding === 'object' && binding.defaultValue !== undefined) {
          bindings[key] = binding.defaultValue
        } else {
          // Fallback for simple value bindings
          bindings[key] = binding
        }
      }

      // Function to get the value for a placeholder key
      const getPlaceholderValue = (key: string): any => {
        if (parameters[key] !== undefined) {
          return parameters[key]
        }
        if (bindings[key] !== undefined) {
          return bindings[key]
        }
        return undefined
      }

      // Function to replace [placeholder] and [[placeholder]] values in a string
      // Supports both single bracket [key] and double bracket [[key]] syntax
      // If the entire string is a single placeholder and the value is not a string,
      // returns the actual value (preserves booleans, numbers, etc.)
      const replacePlaceholders = (str: string): any => {
        // Check if the entire string is a single [[placeholder]]
        const singleDoubleBracketMatch = str.match(/^\[\[([^\]]+)\]\]$/)
        if (singleDoubleBracketMatch) {
          const value = getPlaceholderValue(singleDoubleBracketMatch[1])
          if (value !== undefined) {
            return value // Return actual type (boolean, number, etc.)
          }
          return str // Keep original if no replacement found
        }

        // Check if the entire string is a single [placeholder]
        const singleBracketMatch = str.match(/^\[([^\[\]]+)\]$/)
        if (singleBracketMatch) {
          const value = getPlaceholderValue(singleBracketMatch[1])
          if (value !== undefined) {
            return value // Return actual type
          }
          return str
        }

        // For strings with embedded placeholders, do string replacement
        // First replace [[key]] (double brackets)
        let result = str.replace(/\[\[([^\]]+)\]\]/g, (match, key) => {
          const value = getPlaceholderValue(key)
          return value !== undefined ? String(value) : match
        })
        // Then replace [key] (single brackets) - but not if already part of [[]]
        result = result.replace(/(?<!\[)\[([^\[\]]+)\](?!\])/g, (match, key) => {
          const value = getPlaceholderValue(key)
          return value !== undefined ? String(value) : match
        })
        return result
      }

      // Recursively replace placeholders in an object
      const replaceInObject = (obj: any): any => {
        if (typeof obj === 'string') {
          return replacePlaceholders(obj)
        }
        if (Array.isArray(obj)) {
          return obj.map(item => replaceInObject(item))
        }
        if (obj !== null && typeof obj === 'object') {
          const result: any = {}
          for (const key of Object.keys(obj)) {
            result[key] = replaceInObject(obj[key])
          }
          return result
        }
        return obj
      }

      // Execute each action and collect outcomes
      const allOutcomes: IActionOutcome[] = []

      for (const action of actions) {
        // Replace [[placeholder]] values with actual parameter/binding values if enabled
        const actionToSend = replaceParameters ? replaceInObject(action) : action
        const actionDefinition = JSON.stringify(actionToSend)

        const response = await fetch(
          siteUrl +
            '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.ExecuteSiteScriptAction',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'X-RequestDigest': digest,
              Accept: 'application/json;odata=nometadata',
              'Content-Type': 'application/json;charset=utf-8',
              'X-ClientService-ClientTag': 'SPEDITOR',
            },
            body: JSON.stringify({
              actionDefinition: actionDefinition,
            }),
          }
        )

        const data = await response.json()

        if (response.status >= 400 || data['odata.error']) {
          const errorMsg = data['odata.error']?.message?.value || data.error?.message || 'Failed to execute action'
          allOutcomes.push({
            title: action.verb || 'Unknown action',
            outcome: 'Failure',
            outcomeCode: 1,
            target: errorMsg,
          })
        } else {
          // Parse the result - data.value can be an array directly or a JSON string
          let actionResult: any[] = []
          if (data.value) {
            if (Array.isArray(data.value)) {
              actionResult = data.value
            } else if (typeof data.value === 'string') {
              try {
                actionResult = JSON.parse(data.value)
              } catch (e) {
                actionResult = []
              }
            }
          }

          // Map outcomes - Outcome can be a string or number
          // Based on SharePoint Site Script API:
          // SharePoint Outcome codes:
          // 0 = Success (action completed successfully)
          // 1 = SuccessNoResult (action completed, no specific result)
          // 2 = Failure
          // ErrorCode 0 = no error, non-zero = error
          if (Array.isArray(actionResult) && actionResult.length > 0) {
            for (const outcome of actionResult) {
              const outcomeCode = typeof outcome.Outcome === 'string' ? parseInt(outcome.Outcome, 10) : (outcome.Outcome ?? -1)
              const errorCode = outcome.ErrorCode ?? 0
              
              let outcomeText = 'Unknown'
              if (outcomeCode === 0 || outcomeCode === 1) {
                // Outcome 0 or 1 with no error = success
                outcomeText = errorCode === 0 ? 'Success' : 'Failure'
              } else if (outcomeCode === 2) {
                outcomeText = 'Failure'
              } else {
                outcomeText = errorCode === 0 ? 'Success' : 'Failure'
              }
              
              allOutcomes.push({
                title: outcome.Title || action.verb || 'Action',
                outcome: outcomeText,
                outcomeCode: outcomeCode,
                target: outcome.OutcomeText || outcome.Target || '',
              })
            }
          } else {
            allOutcomes.push({
              title: action.verb || 'Action',
              outcome: 'Success',
              outcomeCode: 0,
              target: '',
            })
          }
        }
      }

      return {
        success: true,
        result: { actionOutcomes: allOutcomes },
        errorMessage: '',
        source: 'chrome-sp-editor',
      }
    })
    .catch((error: any) => ({
      success: false,
      result: null,
      errorMessage: error.message,
      source: 'chrome-sp-editor',
    }))
}
