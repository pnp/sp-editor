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

export const pnpjsMonacoConfigs = () => {
  const COMMON_CONFIG: monaco.editor.IEditorOptions = {
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 16,
    suggestOnTriggerCharacters: true,
    colorDecorators: true,
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
  return COMMON_CONFIG
}

export const initCode = () => {
  const code = `
// CTRL/CMD + D to execute the code
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";

// wrapping the code inside self-excecuting async function
// enables you to use await expression
(async () => {

  const { Title } = await sp.web.select("Title")()
  console.log(\`Web title: \${Title}\`);

})().catch(console.log)
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
      mod = line.indexOf('@pnp/common') > -1 ? 0 : mod
      mod = line.indexOf('@pnp/config-store') > -1 ? 1 : mod
      mod = line.indexOf('@pnp/graph') > -1 ? 2 : mod
      mod = line.indexOf('@pnp/logging') > -1 ? 3 : mod
      mod = line.indexOf('@pnp/odata') > -1 ? 4 : mod
      mod = line.indexOf('@pnp/pnpjs') > -1 ? 5 : mod
      mod = line.indexOf('@pnp/sp-addinhelpers') > -1 ? 6 : mod
      mod = line.indexOf('@pnp/sp-clientsvc') > -1 ? 7 : mod
      mod = line.indexOf('@pnp/sp-taxonomy') > -1 ? 9 : mod
      mod = line.indexOf('@pnp/adaljsclient') > -1 ? 10 : mod
      mod = mod === -1 && line.indexOf('@pnp/sp') > -1 ? 8 : mod
      prepnp.push(`var ${lineRe![1]} = modules[${mod}];`)
    }
  })
  return prepnp
}

// find all import lines from code
export const getImportModules = (content: string) => {
  const importTexts: string[] = []
  const imports = content.match(/(import|from).*(@pnp|microsoft).*/g)
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
  const libs = content.match(/("(\.|@)|'(\.|@)).*\/.*("|')/g)
  if (libs) {
    const exportTexts: string[] = []
    libs.forEach(eText => {
      const libo = eText.match(/(["'])(.*?[^\\])\1/g)
      if (libo) {
        const lib = libo[0].replace(/"/g, '').replace(/'/g, '')
        const splitIndex = locations('/', path)
        if (lib.startsWith('./')) {
          const spl1 = splitIndex[splitIndex.length - 1]
          const lib1 = path.substring(0, spl1! + 1) + lib.substring(2)
          exportTexts.push(lib1.replace('.js', ''))
        } else if (lib.startsWith('../../')) {
          const spl2 = splitIndex[splitIndex.length - 3]
          if (spl2) {
            const lib2 = path.substring(0, spl2 + 1) + lib.substring(6)
            exportTexts.push(lib2.replace('.js', ''))
          }
        } else if (lib.startsWith('../')) {
          const spl3 = splitIndex[splitIndex.length - 2]
          if (spl3) {
            const lib3 = path.substring(0, spl3 + 1) + lib.substring(3)
            exportTexts.push(lib3.replace('.js', ''))
          }
        } else {
          exportTexts.push(lib.replace('.js', ''))
        }
      }
    })
    return exportTexts
  }
  else {
    return []
  }
}

export const getDefinitionsInUse = (codeWithOutComments: string, definitions: IDefinitions[]) => {
  const initModules = getImportModules(codeWithOutComments)
  const defs = resolveFiles(initModules, definitions)
  const currentLibs: IDefinitions[] = []
  const parseLibs = (filelist: IDefinitions[]) => {
    filelist.forEach((file) => {
      const libs = resolveFiles(getExportRows(file.content, file.filePath), definitions)
      if (libs && libs.length > 0) {
        const newLibs = libs.filter(d => !currentLibs.find(g => d.filePath === g.filePath))
        newLibs.forEach(lib => currentLibs.push(lib))
        parseLibs(newLibs)
      }
    })
    const initLibs = filelist.filter(file => !currentLibs.find(lib => file.filePath === lib.filePath))
    if (initLibs && initLibs.length > 0) {
      initLibs.forEach(lib => currentLibs.push(lib))
    }
  }
  parseLibs(defs)
  return currentLibs
}

export const mod_common = `var mod_common = '${chrome.runtime.getURL('bundles/common.es5.umd.bundle.js')}';`
export const mod_config = `var mod_config = '${chrome.runtime.getURL('bundles/config-store.es5.umd.bundle.js')}';`
export const mod_graph = `var mod_graph = '${chrome.runtime.getURL('bundles/graph.es5.umd.bundle.js')}';`
export const mod_logging = `var mod_logging = '${chrome.runtime.getURL('bundles/logging.es5.umd.bundle.js')}';`
export const mod_odata = `var mod_odata = '${chrome.runtime.getURL('bundles/odata.es5.umd.bundle.js')}';`
export const mod_pnpjs = `var mod_pnpjs = '${chrome.runtime.getURL('bundles/pnpjs.es5.umd.bundle.js')}';`
export const mod_addin = `var mod_addin = '${chrome.runtime.getURL('bundles/sp-addinhelpers.es5.umd.bundle.js')}';`
export const mod_client = `var mod_client = '${chrome.runtime.getURL('bundles/sp-clientsvc.es5.umd.bundle.js')}';`
export const mod_taxonomy = `var mod_taxonomy = '${chrome.runtime.getURL('bundles/sp-taxonomy.es5.umd.bundle.js')}';`
export const mod_sp = `var mod_sp = '${chrome.runtime.getURL('bundles/sp.es5.umd.bundle.js')}';`
export const mod_adaljs = `var mod_adaljs = '${chrome.runtime.getURL('bundles/adaljsclient.es5.umd.bundle.js')}';`
export const sj = `var sj = '${chrome.runtime.getURL('bundles/system.js')}';`
