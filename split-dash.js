import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/components/modals/DashboardModals.jsx', 'utf8');

// A crude structural parser: finding top level function and const declarations

const exportsFound = [...content.matchAll(/(?:export )?(?:function|const)\s+([A-Z][a-zA-Z0-9_]*)/g)].map(m => m[1]);
console.log('Exports found:', exportsFound);
