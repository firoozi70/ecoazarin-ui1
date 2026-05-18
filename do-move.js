import fs from 'fs';
import path from 'path';

const fileMap = JSON.parse(fs.readFileSync('migrationMap.json', 'utf8'));

// 1. Create directories
const dirs = new Set(Object.values(fileMap).map(p => path.dirname(p)));
dirs.forEach(d => {
  const fullPath = path.join('src', d);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

// 2. Read all files before moving so we can process them
const filesContent = {};
for (const oldFile of Object.keys(fileMap)) {
  const oldPath = path.join('src', oldFile);
  if (fs.existsSync(oldPath)) {
    filesContent[oldFile] = fs.readFileSync(oldPath, 'utf8');
  }
}

// 3. Process and write to new locations
for (const [oldFile, newRelPath] of Object.entries(fileMap)) {
  if (!filesContent[oldFile]) continue;

  let content = filesContent[oldFile];
  const currentDir = path.dirname(newRelPath); // e.g. "pages" or "components/home"

  // Replace imports
  for (const [targetOldFile, targetNewRelPath] of Object.entries(fileMap)) {
    const targetOldName = targetOldFile.replace('.jsx', '');
    
    // Calculate relative path from currentDir to targetNewRelPath
    let relPath = path.relative(currentDir, targetNewRelPath);
    // Relative paths must start with ./ or ../
    if (!relPath.startsWith('.')) relPath = './' + relPath;
    
    // Remove .jsx to be clean
    relPath = relPath.replace(/\.jsx$/, '');

    // Replace both import from './oldName' and './oldName.jsx'
    // e.g. import { ... } from './extras-i18n'
    // Regex matches the from './targetOldName' or from './targetOldName.jsx'
    const rgx1 = new RegExp(`from\\s+['"]\\.\\/${targetOldName}['"]`, 'g');
    const rgx2 = new RegExp(`from\\s+['"]\\.\\/${targetOldFile}['"]`, 'g');
    
    content = content.replace(rgx1, `from '${relPath}'`);
    content = content.replace(rgx2, `from '${relPath}'`);
  }

  // Write to new path
  fs.writeFileSync(path.join('src', newRelPath), content);
  
  // Delete old file
  fs.unlinkSync(path.join('src', oldFile));
}

// 4. Update HTML files mapped entries
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Fix src mappings
    for (const [oldFile, newRelPath] of Object.entries(fileMap)) {
        html = html.replace(`src="/src/${oldFile}"`, `src="/src/${newRelPath}"`);
    }
    fs.writeFileSync(file, html);
});

// Update App.tsx or whatever just in case
console.log('Moved files and updated imports successfully!');
