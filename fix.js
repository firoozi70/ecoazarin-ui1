import fs from 'fs';
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/<\/script>\\n<script/g, '<\/script>\n<script');
  fs.writeFileSync(f, content);
}
console.log('Fixed');
