
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
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
        about: path.resolve(__dirname, 'about.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        careers: path.resolve(__dirname, 'careers.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
        developers: path.resolve(__dirname, 'developers.html'),
        cookies: path.resolve(__dirname, 'cookies.html'),
        terms: path.resolve(__dirname, 'terms.html'),
        changelog: path.resolve(__dirname, 'changelog.html'),
      }
    }
  }
});
