import { IDefinitions } from '../store/home/types'

export const getSystemjsPath = (): string => {
  return `var sj = '${chrome.runtime.getURL('bundles/system.js')}';`
}
export const getPnpjsPath = (): string => {
  return `var mod_sp = '${chrome.runtime.getURL('bundles/sp.es5.umd.bundle.js')}';
  var mod_logging = '${chrome.runtime.getURL('bundles/logging.es5.umd.bundle.js')}';
  var mod_queryable = '${chrome.runtime.getURL('bundles/queryable.es5.umd.bundle.js')}';`
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

// match filenames to definitions
export const resolveFiles = (files: string[], definitions: IDefinitions[]) => {
  const resolvedMods: IDefinitions[] = []
  if (files && files.length > 0) {
    files.forEach((file) => {
      const modl = definitions.find(
        (mod) =>
          mod.filePath === file ||
          mod.filePath === `${file}.d.ts` ||
          mod.filePath === `${file}/index.d.ts`,
      )
      if (modl) {
        resolvedMods.push({ ...modl })
      } else {
        // console.log('not found', file)
      }
    })
  }
  return resolvedMods
}

export const getDirectory = (dirEntry: DirectoryEntry, path: string): Promise<DirectoryEntry> => {
  return new Promise((resolve, reject) => {
    try {
      dirEntry.getDirectory(path, {}, (entry: DirectoryEntry) => resolve(entry), (error) => {
        console.error(`Error getting directory: ${path}`, error);
        reject(error);
      });
    } catch (error) {
      console.error(`Error in getDirectory: ${path}`, error);
      reject(error);
    }
  });
};

export const readDirRecursive = async (
  entry: DirectoryEntry,
  files: DirectoryEntry[] = [],
): Promise<DirectoryEntry[]> => {
  try {
    const entries = await readEntries(entry);

    for (const key in entries) {
      if (entries[key].isDirectory) {
        await readDirRecursive(entries[key] as DirectoryEntry, files);
      } else {
        files.push(entries[key]);
      }
    }

    return files;
  } catch (error) {
    console.error(`Error in readDirRecursive at path: ${entry.fullPath}`, error);
    throw error;
  }
};

export const readEntries = (dir: DirectoryEntry): Promise<DirectoryEntry[]> => {
  return new Promise(resolve => {
    const reader = dir.createReader()
    reader.readEntries(entries => resolve(entries as any))
  })
}

export const getExtensionDirectory = (): Promise<DirectoryEntry> =>
  new Promise(resolve => chrome.runtime.getPackageDirectoryEntry(resolve))