import fs from 'fs';
import path from 'path';

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

const assets = ['locales', 'fonts', 'uploads', 'theme.css'];
assets.forEach(asset => {
  if (fs.existsSync(asset)) {
    fs.renameSync(asset, path.join('public', asset));
  }
});
console.log('Moved to public');
