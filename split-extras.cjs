const fs = require('fs');

const content = fs.readFileSync('extras.jsx', 'utf-8');

// We will just do a coarse split using exact string finding, or we can just manually create the files.
// Let's just create the files manually in node.

const i18nContent = content.substring(content.indexOf('const { useState: _us'), content.indexOf('// ============== NOTIFICATIONS =============='));
const notifContent = content.substring(content.indexOf('// ============== NOTIFICATIONS =============='), content.indexOf('// ============== AUTH =============='));
const authContent = content.substring(content.indexOf('// ============== AUTH =============='), content.indexOf('// ============== SETTINGS / DASHBOARD / UPGRADE MODALS =============='));
const settingsDashContent = content.substring(content.indexOf('// ============== SETTINGS / DASHBOARD / UPGRADE MODALS =============='));

fs.writeFileSync('extras-i18n.jsx', `const { useState: _us, useEffect: _ue, useRef: _ur } = window.React;\n\n` + i18nContent.substring(i18nContent.indexOf('const FA_FALLBACK')));
fs.writeFileSync('extras-notifs.jsx', notifContent);
fs.writeFileSync('extras-auth.jsx', authContent);
fs.writeFileSync('extras-dashboard.jsx', settingsDashContent);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let html = fs.readFileSync(file, 'utf-8');
  if (html.includes('src="extras.jsx"')) {
    html = html.replace(/<script[^>]*src="extras\.jsx"[^>]*><\/script>/, 
      `<script type="text/babel" data-presets="env,react" src="extras-i18n.jsx"></script>
<script type="text/babel" data-presets="env,react" src="extras-notifs.jsx"></script>
<script type="text/babel" data-presets="env,react" src="extras-auth.jsx"></script>
<script type="text/babel" data-presets="env,react" src="extras-dashboard.jsx"></script>`);
    fs.writeFileSync(file, html);
  }
}
fs.unlinkSync('extras.jsx');
console.log("Split extras.jsx successfully");
