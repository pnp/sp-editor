/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import { IDefinitions } from '../../../store/home/types'
import { getDirectory, readDirRecursive, resolveFiles } from '../../../utilities/utilities'

export const loadDefinitions = async (
  directoryEntry: DirectoryEntry,
  dir: string[],
) => {
  return new Promise<IDefinitions[]>(async resolve => {
    const declarations: IDefinitions[]= []
    await Promise.all(dir.map(async di => {
      const subDirectoryEntry = await getDirectory(directoryEntry, di.replace('/crxfs', ''))
      const entries = await readDirRecursive(subDirectoryEntry)
      for (const entry of entries) {
        const fullpath = entry.fullPath.replace('/crxfs/', '')
        const file = await fetch(fullpath)
        const content = await file.text()
        if (fullpath.endsWith('/index.d.ts')) {
          const newPath = fullpath.replace('/index.d.ts', '.d.ts')
          const newContent = `export * from "./${newPath.substring(newPath.lastIndexOf('/') + 1).replace('.d.ts', '')}/index";`
          declarations.push({ content: newContent, filePath: newPath })
        }
        declarations.push({ content, filePath: fullpath })
      }
    }))
    resolve(declarations)
  })
}

export const GraphSDKConsoleMonacoConfigs = () => {
  const COMMON_CONFIG: monaco.editor.IEditorOptions = {
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 16,
    suggestOnTriggerCharacters: true,
    colorDecorators: true,
    folding: true,
    foldingHighlight: true,
    foldingStrategy: 'auto',
    minimap: {
      enabled: true,
    },
    // automaticLayout: true,
  }
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    // typeRoots: ['@pnp', '@microsoft'],
    allowSyntheticDefaultImports: true,
  })
 /* monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    allowSyntheticDefaultImports: true,
  })*/
  return COMMON_CONFIG
}

export const initCode = () => {
  const code = `
/* Hit 'ctrl + d' or 'cmd + d' to run the code */

import { graphClient } from "@speditor"
import { User } from "@microsoft/microsoft-graph-types/microsoft-graph";

(async () => {

  const userDetails: User = await graphClient.api("/me")
    .select('displayName')
    .get();

  console.log(userDetails.displayName)

})().catch(console.log)
`
  return code.substring(code.indexOf('\n') + 1)
}

export const initResult = () => {
  const code = `
  {
    "console.log() will output here" : ""
  }
`
  return code.substring(code.indexOf('\n') + 1)
}

export const execme = (prepnp: string[], ecode: string[]) => {
  return `
var execme = function execme() {
  Promise.all([SystemJS.import(mod_common),SystemJS.import(mod_config),SystemJS.import(mod_graph),SystemJS.import(mod_logging),SystemJS.import(mod_odata),SystemJS.import(mod_pnpjs),SystemJS.import(mod_addin),SystemJS.import(mod_client),SystemJS.import(mod_sp),SystemJS.import(mod_taxonomy),SystemJS.import(mod_adaljs)]).then(function (modules) {
    ${prepnp.join('\n')}
    // Your code starts here
    // #####################
    ${ecode.map(e => '\t\t\t' + e).join('\n')}
    // #####################
    // Your code ends here
  });
};`
}

export const fixImports = (lines: string[], ecode: string[]) => {
  const prepnp: string[] = []
  lines.forEach(line => {
    // remove imports
    if (line.toLowerCase().indexOf('require(') === -1 && line.toLowerCase().indexOf('use strict') === -1 && line.toLowerCase().indexOf('__esmodule') === -1) {
      ecode.push(line)
    }
    if (line.toLowerCase().indexOf(' = require') > -1) {
      // fix imports
      const lineRe = line.match('var (.*) = require')
      let mod = -1
      mod = line.indexOf('@microsoft/microsoft-graph-client') > -1 ? 0 : mod
      prepnp.push(`var ${lineRe![1]} = modules[${mod}];`)
    }
  })
  return prepnp
}

// find all import lines from code
export const getImportModules = (content: string) => {
  const importTexts: string[] = []
  const imports = content.match(/(import|from).*(@microsoft|msal|@azure|@speditor).*/g)
  if (imports) {
    imports.forEach(iText => {
      const match = iText.match(/(["'])(.*?[^\\])\1/g)
      if (match) {
        importTexts.push(match[0].replace(/"/g, '').replace(/'/g, ''))
      }
    })
  }
  return Array.from(new Set(importTexts))
}

export const locations = (substringx: any, stringx: string) => {
  const indexes = Array.from(stringx.matchAll(new RegExp(substringx, 'gi'))).map(a => a.index)
  return indexes
}

export const getExportRows = (content: string, path: string) => {
  const libs = content.match(/("(\.|@|m)|'(\.|@|m)).*\/.*("|')/g)
  if (libs) {
    const exportTexts: string[] = []
    libs.forEach(eText => {
      const libo = eText.match(/(["'])(.*?[^\\])\1/g)
      if (libo) {
        const lib = libo[0].replace(/"/g, '').replace(/'/g, '')
        const splitIndex = locations('/', path)
        if (lib.startsWith('./')) {
          const jee = splitIndex[splitIndex.length - 1]
          const lib1 = path.substring(0, jee! + 1) + lib.substring(2)
          exportTexts.push(lib1)
        } else if (lib.startsWith('../../')) {
          const jee = splitIndex[splitIndex.length - 3]
          if (jee) {
            const lib2 = path.substring(0, jee + 1) + lib.substring(6)
            exportTexts.push(lib2)
          }
        } else if (lib.startsWith('../')) {
          const jee = splitIndex[splitIndex.length - 2]
          if (jee) {
            const lib3 = path.substring(0, jee + 1) + lib.substring(3)
            exportTexts.push(lib3)
          }
        } else {
          exportTexts.push(lib)
        }
      }
    })
    return exportTexts
  }
  else {
    return []
  }
}

export const getDefinitionsInUse = (
  codeWithOutComments: string,
  definitions: IDefinitions[],
) => {
  const initModules = getImportModules(codeWithOutComments)
  const defs = resolveFiles(initModules, definitions)
  const currentLibs: IDefinitions[] = []

  const parseLibs = (filelist: IDefinitions[]) => {
    filelist.forEach((file) => {
      const libs = resolveFiles(
        getExportRows(file.content, file.filePath),
        definitions,
      )
      if (libs && libs.length > 0) {
        const newLibs = libs.filter(
          (d) => !currentLibs.find((g) => d.filePath === g.filePath),
        )
        newLibs.forEach((lib) => currentLibs.push(lib))
        parseLibs(newLibs)
      }
    })
    const initLibs = filelist.filter(
      (file) => !currentLibs.find((lib) => file.filePath === lib.filePath),
    )
    if (initLibs && initLibs.length > 0) {
      initLibs.forEach((lib) => currentLibs.push(lib))
    }
  }
  parseLibs(defs)
  return currentLibs
}

export const sj = `var sj = '${chrome.runtime.getURL('bundles/system.js')}';`
export const mod_graph_sdk = `var mod_graph_sdk = '${chrome.runtime.getURL('bundles/graph-sdk.es5.umd.bundle.js')}';`
