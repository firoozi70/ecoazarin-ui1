import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const entryPoints = [
  'app.jsx', 'article.jsx', 'articles.jsx', 'auth.jsx', 'charts.jsx', 'compound-calc.jsx', 
  'education.jsx', 'journal.jsx', 'podcasts.jsx', 'products.jsx', 'tools.jsx'
];

htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove all old scripts gracefully
    html = html.replace(/<script\b[^>]*src="https:\/\/unpkg\.com[^>]*><\/script>/gi, '');
    html = html.replace(/<script\b[^>]*type="text\/babel"[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script\b[^>]*>window\.PAGE_SLUG[^>]*<\/script>/gi, '');
    html = html.replace(/<script\b[^>]*src="locales\/[^>]*><\/script>/gi, '');
    
    // Also remove any remaining jsx imports
    html = html.replace(/<script\b[^>]*src="[^"]*\.jsx"[^>]*><\/script>/gi, '');
    html = html.replace(/<script\b[^>]*src="extras[^"]*\.jsx"[^>]*><\/script>/gi, '');

    // Now append the main entry point module at the end of body
    // Clean up empty lines? Not super important, but let's.
    html = html.replace(/^\s*[\r\n]/gm, '');

    const possibleEntry = file.replace('.html', '.jsx');
    let moduleScript = '';
    if (entryPoints.includes(possibleEntry) || (file === 'index.html' || file === 'hero.html')) {
        let actualEntry = file.replace('.html', '.jsx');
        if (file === 'hero.html' || file === 'index.html') actualEntry = 'app.jsx';
        moduleScript = `<script type="module" src="/src/${actualEntry}"></script>`;
    } else if (file === 'search-results.html') {
        moduleScript = `<script type="module" src="/src/search-index.jsx"></script>`;
    }
    
    // Add page slug script block back since we removed it but it was necessary!
    let slugMap = {
        'news.html': 'news',
        'hero.html': 'home',
        'index.html': 'home',
    };
    let slugScript = '';
    if (slugMap[file]) {
        slugScript = `<script>window.PAGE_SLUG = '${slugMap[file]}';</script>\n`;
    }

    if (!html.includes('type="module"')) {
        html = html.replace('</body>', `  ${slugScript}${moduleScript}\n</body>`);
    }

    fs.writeFileSync(file, html);
});

console.log('Fixed HTML files');
