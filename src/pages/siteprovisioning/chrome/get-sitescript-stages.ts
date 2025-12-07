export interface ISiteDesignStage {
  title: string
  outcome: string
}

export interface ISiteDesignStagesResult {
  stages: ISiteDesignStage[]
  recipes: string // Raw recipes JSON for debugging
}

/**
 * Gets the stages/actions preview for a site design.
 * Uses the GetSiteDesignStages API which returns human-readable action descriptions.
 * 
 * @param siteDesignId - The site design ID to get stages for
 * @returns Promise with stages array and raw recipes
 */
export const getSiteDesignStages = (siteDesignId: string) => {
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
    .then((pageContext) => {
      const siteUrl = pageContext?.siteAbsoluteUrl || ''

      return fetch(siteUrl + '/_api/contextinfo', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json; odata=verbose',
          'Content-Type': 'application/json',
          'X-ClientService-ClientTag': 'SPEDITOR',
        },
      })
        .then((res) => res.json())
        .then((contextInfo) => {
          const digest = contextInfo.d.GetContextWebInformation.FormDigestValue

          // Build the request body - pass the site design ID
          const requestBody = {
            siteDesignId: siteDesignId
          }

          return fetch(
            siteUrl +
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesignStages',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json;odata=nometadata',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
              body: JSON.stringify(requestBody),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // The API returns a string with JSON containing actions/stages
              const recipesJson = data.value || data.d?.GetSiteDesignStages || '{}'
              
              let stages: ISiteDesignStage[] = []
              
              try {
                const parsed = JSON.parse(recipesJson)
                // The response has a "recipes" property with actions array
                // Each recipe has actions, and each action has stages (array of strings)
                if (parsed.recipes && Array.isArray(parsed.recipes)) {
                  parsed.recipes.forEach((recipe: any) => {
                    const recipeName = recipe.recipeName || ''
                    if (recipe.actions && Array.isArray(recipe.actions)) {
                      recipe.actions.forEach((action: any) => {
                        if (action.stages && Array.isArray(action.stages)) {
                          action.stages.forEach((stage: any) => {
                            // Stages are strings, not objects
                            if (typeof stage === 'string') {
                              stages.push({
                                title: stage,
                                outcome: recipeName // Use recipe name as context
                              })
                            } else {
                              // Fallback for object format
                              stages.push({
                                title: stage.title || stage.Title || 'Unknown action',
                                outcome: stage.outcome || stage.Outcome || recipeName
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              } catch (e) {
                // If parsing fails, return empty stages
                console.error('Failed to parse site design stages:', e)
              }

              return {
                success: true,
                result: {
                  stages,
                  recipes: recipesJson
                } as ISiteDesignStagesResult,
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            })
            .catch((error) => {
              return {
                success: false,
                result: null,
                errorMessage: error.message || 'Failed to get site design stages',
                source: 'chrome-sp-editor',
              }
            })
        })
    })
    .catch((error) => {
      return {
        success: false,
        result: null,
        errorMessage: error.message || 'Failed to get page context',
        source: 'chrome-sp-editor',
      }
    })
}
