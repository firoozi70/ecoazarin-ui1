const fs = require('fs');
const glob = require('glob');

glob('src/**/*.jsx', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const importRegex = /^(?:import .*?;\n?)+/gm;
    
    // Extract all imports
    const match = [...content.matchAll(/^import .*?;\n?/gm)];
    if (match.length > 0) {
      const imports = match.map(m => m[0]).join('');
      // remove all imports from content
      content = content.replace(/^import .*?;\n?/gm, '');
      
      // prepend imports to top
      const newContent = imports + "\n" + content;
      if(newContent !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed imports for', file);
      }
    }
  });
});
