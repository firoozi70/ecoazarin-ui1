import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const jsxFiles = fs.readdirSync('.').filter(f => f.endsWith('.jsx'));
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const exportsByFile = {};
const allExports = {}; // name -> fileName
const usedIdentifiersByFile = {}; // file -> Set of used identifiers

// 1. Gather all declarations
jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  
  const fileExports = [];
  
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      fileExports.push(node.name.text);
    } else if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(decl => {
        if (ts.isIdentifier(decl.name)) {
          fileExports.push(decl.name.text);
        }
      });
    } else if (ts.isClassDeclaration(node) && node.name) {
      fileExports.push(node.name.text);
    }
  }
  
  sourceFile.statements.forEach(visit);
  
  // Filter out reuses like "root", "App"
  exportsByFile[file] = fileExports.filter(e => e !== 'root' && e !== 'App');
  exportsByFile[file].forEach(exp => {
    // Only register the first occurrence to avoid generic names clashing, 
    // but ideally we shouldn't have clashes.
    if (!allExports[exp]) {
      allExports[exp] = file;
    }
  });
});

// Remove standard react stuff from exports
delete allExports['useState'];
delete allExports['useEffect'];
delete allExports['useRef'];
delete allExports['useMemo'];
delete allExports['useCallback'];
delete allExports['_us'];
delete allExports['_ue'];
delete allExports['_ur'];

// 2. Gather used identifiers
jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  const used = new Set();
  
  function visit(node) {
    if (ts.isIdentifier(node)) {
      used.add(node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  usedIdentifiersByFile[file] = used;
});

// 3. Rewrite JSX files
!fs.existsSync('src') && fs.mkdirSync('src');
!fs.existsSync('src/pages') && fs.mkdirSync('src/pages');
!fs.existsSync('src/components') && fs.mkdirSync('src/components');

// Move logic:
// Entry points: app.jsx, article.jsx, articles.jsx, auth.jsx, charts.jsx, compound-calc.jsx, education.jsx, journal.jsx, podcasts.jsx, products.jsx, search-index.jsx (maybe?), tools.jsx
const entryPoints = [
  'app.jsx', 'article.jsx', 'articles.jsx', 'auth.jsx', 'charts.jsx', 'compound-calc.jsx', 
  'education.jsx', 'journal.jsx', 'podcasts.jsx', 'products.jsx', 'tools.jsx'
];

jsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const used = usedIdentifiersByFile[file];
  const fileExports = exportsByFile[file] || [];
  
  // What to import?
  const importsToInject = {}; // fileToImportFrom -> Set of names

  used.forEach(identifier => {
    if (allExports[identifier] && allExports[identifier] !== file && !fileExports.includes(identifier)) {
      const sourceFile = allExports[identifier];
      if (!importsToInject[sourceFile]) importsToInject[sourceFile] = new Set();
      importsToInject[sourceFile].add(identifier);
    }
  });

  // Also import React automatically
  let importBlock = `import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';\n`;
  importBlock += `import * as Recharts from 'recharts';\n`;
  importBlock += `import { motion, AnimatePresence } from 'motion/react';\n`;
  
  Object.keys(importsToInject).forEach(sourceFile => {
    const names = Array.from(importsToInject[sourceFile]);
    const cleanSource = sourceFile.replace('.jsx', '');
    importBlock += `import { ${names.join(', ')} } from './${cleanSource}';\n`;
  });
  
  // Clean up old window destructuring
  content = content.replace(/const\s*{\s*([^}]+)\s*}\s*=\s*(?:window\.)?React\s*;/g, '');
  content = content.replace(/const\s*{\s*([^}]+)\s*}\s*=\s*Recharts\s*;/g, '');
  content = content.replace(/const\s*{\s*([^}]+)\s*}\s*=\s*(?:window\.)?window\s*;/g, ''); // const { ... } = window;
  
  // Clean up random window bindings like `window.PAGE_SLUG =` just keep it for now but export it if needed.
  
  // Add exports
  let exportBlock = '\n';
  if (fileExports.length > 0) {
    exportBlock = `\nexport { ${fileExports.join(', ')} };\n`;
  }
  
  const finalContent = importBlock + '\n' + content + exportBlock;
  
  // We'll just write them to src/
  fs.writeFileSync(path.join('src', file), finalContent);
});

// 4. Update HTML files to point to src module
htmlFiles.forEach(file => {
    const entryHtml = fs.readFileSync(file, 'utf8');
    // Remove old scripts
    let newHtml = entryHtml.replace(/<script.*?src="https:\/\/unpkg\.com.*?><\/script>/g, '');
    newHtml = newHtml.replace(/<script type="text\/babel".*?><\/script>/gi, '');
    newHtml = newHtml.replace(/<script src="locales\/.*?><\/script>/g, '');
    
    // Check if there is a matching entry point script
    const possibleEntry = file.replace('.html', '.jsx');
    let moduleScript = '';
    if (entryPoints.includes(possibleEntry) || (file === 'index.html' || file === 'hero.html')) {
        let actualEntry = file.replace('.html', '.jsx');
        if (file === 'hero.html' || file === 'index.html') actualEntry = 'app.jsx';
        moduleScript = `<script type="module" src="/src/${actualEntry}"></script>`;
    } else if (file === 'search-results.html') {
        moduleScript = `<script type="module" src="/src/search-index.jsx"></script>`;
    }
    
    newHtml = newHtml.replace('</body>', `  ${moduleScript}\n</body>`);
    // ensure theme.css points correctly if needed, but it's in public root now
    fs.writeFileSync(file, newHtml);
});

console.log('Migration prep complete.');
