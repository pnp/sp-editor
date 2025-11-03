import { IDefinitions } from '../store/home/types';

/**
 * Load TypeScript definitions for Monaco editor
 * Works in both Chrome (using FileSystem API) and Firefox (using pre-generated paths)
 */
export const loadDefinitions = async (
  directoryEntry: DirectoryEntry | null,
  modules: string[],
): Promise<IDefinitions[]> => {
  // Firefox or when directoryEntry is not available
  if (!directoryEntry) {
    console.log('Loading definitions from JSON file...');
    return await loadDefinitionsFromJSON(modules);
  }

  // Chrome - legacy approach (kept for backward compatibility)
  console.log('Loading definitions from FileSystem API...');
  return await loadDefinitionsFromFileSystem(directoryEntry, modules);
};

/**
 * Load definitions using fetch (works in both Chrome and Firefox)
 */
async function loadDefinitionsFromJSON(modules: string[]): Promise<IDefinitions[]> {
  try {
    // Fetch the generated paths JSON
    const pathsUrl = chrome.runtime.getURL('definition-paths.json');
    const response = await fetch(pathsUrl);
    const data = await response.json();
    
    console.log(`📚 Found ${data.totalFiles} definition files (generated at ${data.generatedAt})`);
    
    const declarations: IDefinitions[] = [];
    
    // Filter paths for requested modules
    const filteredPaths = data.paths.filter((filePath: string) => 
      modules.some(mod => filePath.startsWith(mod))
    );
    
    console.log(`🔍 Loading ${filteredPaths.length} files for modules: ${modules.join(', ')}`);
    
    // Fetch each definition file - they're already in the extension package root
    for (const filePath of filteredPaths) {
      try {
        // Files are at the root of the extension, not in node_modules folder
        const fileUrl = chrome.runtime.getURL(filePath);
        const fileResponse = await fetch(fileUrl);
        
        if (!fileResponse.ok) {
          console.warn(`Failed to fetch ${filePath}: ${fileResponse.status}`);
          continue;
        }
        
        const content = await fileResponse.text();
        declarations.push({ content, filePath });
      } catch (error) {
        console.warn(`Failed to load ${filePath}:`, error);
      }
    }
    
    console.log(`✅ Loaded ${declarations.length} definitions`);
    return declarations;
    
  } catch (error) {
    console.error('Failed to load definitions from JSON:', error);
    return [];
  }
}

/**
 * Legacy approach using FileSystem API (Chrome only)
 */
async function loadDefinitionsFromFileSystem(
  directoryEntry: DirectoryEntry,
  modules: string[]
): Promise<IDefinitions[]> {
  const { getDirectory, readDirRecursive } = await import('./utilities');
  
  const declarations: IDefinitions[] = [];
  
  for (const moduleName of modules) {
    try {
      const subDirectoryEntry = await getDirectory(directoryEntry, moduleName.replace('/crxfs', ''));
      const entries = await readDirRecursive(subDirectoryEntry);
      
      for (const entry of entries) {
        if (entry.isFile && entry.name.endsWith('.d.ts')) {
          const fullpath = entry.fullPath.replace('/crxfs/', '');
          const file = await fetch(fullpath);
          const content = await file.text();
          
          declarations.push({ content, filePath: fullpath });
        }
      }
    } catch (error) {
      console.error(`Failed to load definitions from ${moduleName}:`, error);
    }
  }
  
  return declarations;
}