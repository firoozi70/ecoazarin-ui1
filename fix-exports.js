import fs from 'fs';

const exportsMap = {
  'part-header.jsx': ['LiveTicker', 'Header', 'HeaderSearch'],
  'part-hero.jsx': ['HeroCarousel'],
  'part-tabs.jsx': ['CategoryTabs', 'StickyTabs', 'TabContent'],
  'part-misc.jsx': ['SearchAndSlogan', 'SectionBanner'],
  'part-edu-articles.jsx': ['EduTab', 'ArticlesTab'],
  'part-news.jsx': ['BigNewsCarousel', 'NewsGrid', 'NewsLists'],
  'part-footer.jsx': ['Footer', 'FooterSection']
};

for (const [file, exports] of Object.entries(exportsMap)) {
  let content = fs.readFileSync(file, 'utf8');
  content += `\n\nObject.assign(window, { ${exports.join(', ')} });\n`;
  fs.writeFileSync(file, content);
}

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const f of htmlFiles) {
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('part-export.jsx')) {
    html = html.replace(/<script type="text\/babel" data-presets="env,react" src="part-export\.jsx"><\/script>\n?/g, '');
    fs.writeFileSync(f, html);
  }
}
