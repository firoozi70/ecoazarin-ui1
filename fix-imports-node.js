const fs = require('fs');
const glob = require('glob');

glob('src/pages/*.jsx', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const badRegex = /^(import [^{]*?;\n?|^import \{.*?\} from .*?;\n?)*(?:.*?const \{.*?LineChart.*?\} = Recharts;)([^]*?)(import .*?;)/gm;

    if (content.match(badRegex)) {
        console.log('Fixing', file);
        // Specifically move const { Line... } = Recharts AFTER all imports
        // First put everything in an array
        let lines = content.split('\n');
        let rechartsLine = -1;
        let lastImportLine = -1;
        for(let i=0; i<lines.length; i++) {
            if (lines[i].includes('const { LineChart') && lines[i].includes('Recharts')) {
                rechartsLine = i;
            }
            if (lines[i].startsWith('import ')) {
                lastImportLine = i;
            }
        }

        if (rechartsLine !== -1 && lastImportLine !== -1 && rechartsLine < lastImportLine) {
            let rc = lines.splice(rechartsLine, 1)[0];
            // find the new lastImportLine (it might have shifted)
            let newLast = -1;
            for(let i=0; i<lines.length; i++) {
                if (lines[i].startsWith('import ')) newLast = i;
            }
            lines.splice(newLast + 1, 0, rc);
            fs.writeFileSync(file, lines.join('\n'), 'utf8');
        }
    }
  });
});
