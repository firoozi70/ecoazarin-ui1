import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get('/', (req, res) => {
    res.redirect('/hero.html');
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "mpa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // In production, fallback routing shouldn't just be index.html since it's an MPA, 
      // but maybe if they request `/hero` we could map it, otherwise standard Express static handles it.
      // If file doesn't exist, let's just show 404 or redirect to hero.
      res.redirect('/hero.html');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
