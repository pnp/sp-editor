const fs = require('fs');
const path = require('path');

/**
 * Recursively scan directory for .d.ts files and return their paths
 */
function scanDirectory(dirPath, baseDir, results = []) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules within the scanned packages
        if (entry.name === 'node_modules') {
          continue;
        }
        // Recursively scan subdirectories
        scanDirectory(fullPath, baseDir, results);
      } else if (entry.isFile && entry.name.endsWith('.d.ts')) {
        // Get relative path from public folder
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        results.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }

  return results;
}

/**
 * Generate definition paths JSON by scanning public folder
 */
function generateDefinitionPaths(modules, publicDir, outputPath) {
  const allPaths = [];

  console.log('📁 Scanning public folder for TypeScript definition files...\n');

  for (const moduleName of modules) {
    const modulePath = path.join(publicDir, moduleName);
    
    if (!fs.existsSync(modulePath)) {
      console.warn(`⚠️  Module not found in public folder: ${moduleName}`);
      continue;
    }

    console.log(`📦 Scanning ${moduleName}...`);
    const moduleStartLength = allPaths.length;
    scanDirectory(modulePath, publicDir, allPaths);
    const moduleFileCount = allPaths.length - moduleStartLength;
    console.log(`   Found ${moduleFileCount} definition files`);
  }

  // Create output structure
  const output = {
    generatedAt: new Date().toISOString(),
    totalFiles: allPaths.length,
    modules: modules,
    paths: allPaths.sort() // Sort for easier debugging
  };

  // Write to output file
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log('\n✅ Definition paths generated successfully!');
  console.log(`📄 Total files: ${allPaths.length}`);
  console.log(`💾 Output: ${outputPath}`);
  const fileSizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
  console.log(`📊 File size: ${fileSizeKB} KB`);
  
  // Show sample paths
  console.log('\n📋 Sample paths:');
  allPaths.slice(0, 5).forEach(p => console.log(`   - ${p}`));
  if (allPaths.length > 5) {
    console.log(`   ... and ${allPaths.length - 5} more`);
  }
}

// Configuration
const publicDir = path.join(__dirname, '..', 'public');
const modules = ['@pnp', '@microsoft', '@azure', '@speditor', 'react'];
const outputPath = path.join(publicDir, 'definition-paths.json');

// Run
try {
  generateDefinitionPaths(modules, publicDir, outputPath);
} catch (error) {
  console.error('❌ Error generating definition paths:', error);
  process.exit(1);
}