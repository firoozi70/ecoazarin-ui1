import fs from 'fs';
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('locales/fa.js')) {
    content = content.replace('<script type="text/babel" data-presets="env,react" src="data.jsx"></script>', '<script src="locales/fa.js"></script>\n<script src="locales/en.js"></script>\n<script type="text/babel" data-presets="env,react" src="data.jsx"></script>');
    fs.writeFileSync(f, content);
  }
}
