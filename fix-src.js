import fs from 'fs';
import path from 'path';

const srcFiles = fs.readdirSync('src').filter(f => f.endsWith('.jsx'));

srcFiles.forEach(file => {
  let content = fs.readFileSync(path.join('src', file), 'utf8');

  // Fix useStateMain
  content = content.replace(/useStateMain/g, 'useState');
  content = content.replace(/_us/g, 'useState');
  content = content.replace(/_ue/g, 'useEffect');
  content = content.replace(/_ur/g, 'useRef');

  // React Router Dom usage? None, it's MPAs.
  
  // Recharts components missing from imports?
  // We imported * as Recharts. We should probably destructure Recharts things that are used.
  // The original files did: const { LineChart, XAxis ... } = Recharts;
  // Let's just restore that:
  let rechartsThings = ['LineChart', 'Line', 'AreaChart', 'Area', 'BarChart', 'Bar', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'ResponsiveContainer', 'PieChart', 'Pie', 'Cell', 'Legend'];
  content = `const { ${rechartsThings.join(', ')} } = Recharts;\n` + content;
  
  // Fix ReactDOM.createRoot
  if (content.includes('ReactDOM.createRoot')) {
    content = `import ReactDOM from 'react-dom/client';\n` + content;
    // We shouldn't export `root` since it's an instance. It's fine though.
  }
  
  // Replace window.t with t, if it was destructured. 
  // Actually t was a global function from extras-i18n.jsx. Let's make sure it's imported!
  if (content.includes('window.t(') || content.includes('window.t ') || /\bt\(/.test(content)) {
    // try to import t if not present
    if (!content.includes('import { t }')) {
        content = `import { t } from './extras-i18n';\n` + content;
    }
  }

  // Same for other globals
  if (/\bFA_FALLBACK\b/.test(content) && file !== 'extras-i18n.jsx') {
      content = `import { FA_FALLBACK } from './extras-i18n';\n` + content;
  }
  
  // And window globals that were exported, like window.__ECO_LANG 
  
  // Replace window.React or React.createElement
  content = content.replace(/window\.React/g, 'React');
  
  fs.writeFileSync(path.join('src', file), content);
});

// Since the original structure is multiple HTML files (MPA), Vite needs to know about them 
// if it builds them. Let's configure vite.config.ts correctly.
let viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'hero.html'),
        products: path.resolve(__dirname, 'products.html'),
        tools: path.resolve(__dirname, 'tools.html'),
        charts: path.resolve(__dirname, 'charts.html'),
        article: path.resolve(__dirname, 'article.html'),
        articles: path.resolve(__dirname, 'articles.html'),
        auth: path.resolve(__dirname, 'auth.html'),
        compoundCalc: path.resolve(__dirname, 'compound-calc.html'),
        education: path.resolve(__dirname, 'education.html'),
        journal: path.resolve(__dirname, 'journal.html'),
        news: path.resolve(__dirname, 'news.html'),
        podcasts: path.resolve(__dirname, 'podcasts.html'),
        searchResults: path.resolve(__dirname, 'search-results.html'),
      }
    }
  }
});
`;
fs.writeFileSync('vite.config.ts', viteConfig);

console.log('Fixed src leftovers');
