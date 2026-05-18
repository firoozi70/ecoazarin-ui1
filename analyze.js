import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const jsxFiles = fs.readdirSync('.').filter(f => f.endsWith('.jsx'));

const exportsByFile = {};
const allExports = {}; // name -> fileName

// 1. Find all declarations in each file
jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  
  const fileExports = [];
  
  ts.forEachChild(sourceFile, node => {
    // function Foo()
    if (ts.isFunctionDeclaration(node)) {
      if (node.name && node.name.text) {
        fileExports.push(node.name.text);
      }
    }
    // const Foo = ..., let Bar = ...
    else if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(decl => {
        if (ts.isIdentifier(decl.name)) {
          fileExports.push(decl.name.text);
        }
      });
    }
    // class Foo
    else if (ts.isClassDeclaration(node)) {
        if (node.name && node.name.text) {
          fileExports.push(node.name.text);
        }
    }
  });
  
  exportsByFile[file] = fileExports;
  fileExports.forEach(exp => {
    // Avoid overriding window assignments or builtins if they happen to clash
    allExports[exp] = file;
  });
});

fs.writeFileSync('exports-info.json', JSON.stringify({ exportsByFile, allExports }, null, 2));
console.log('Analyzed files. Count of exports:', Object.keys(allExports).length);
