import fs from 'fs';
import path from 'path';

const dist = 'dist';

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist);

const allowedExts = ['.html', '.jsx', '.js', '.css', '.json'];
const files = fs.readdirSync('.');

for (const file of files) {
  if (['node_modules', 'dist', 'src', '.git', '.wrangler'].includes(file)) continue;

  const stat = fs.statSync(file);
  if (stat.isFile()) {
    const ext = path.extname(file);
    if (allowedExts.includes(ext) || file === '.env.example') {
      fs.copyFileSync(file, path.join(dist, file));
    }
  } else if (stat.isDirectory()) {
    if (file === 'locales' || file === 'fonts' || file === 'uploads') {
      fs.cpSync(file, path.join(dist, file), { recursive: true });
    }
  }
}

// Redirect index.html to hero.html
const indexHtmlPaths = path.join(dist, 'index.html');
fs.writeFileSync(indexHtmlPaths, `<meta http-equiv="refresh" content="0; url=hero.html" />`);

console.log('Build completed!');
