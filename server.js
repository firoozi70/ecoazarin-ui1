import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.redirect('/hero.html');
});

app.use(express.static(process.cwd()));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
