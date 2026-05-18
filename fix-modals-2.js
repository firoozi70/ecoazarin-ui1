import fs from 'fs';

let content = fs.readFileSync('extras-dashboard.jsx', 'utf8');

const sIdx = content.indexOf('const SettingsModal');
const dIdx = content.indexOf('const DashboardModal');
const uIdx = content.indexOf('const UpgradeModal');
const pIdx = content.indexOf('const ProfileMenu');
const aIdx = content.indexOf('const AuthButtons');

// The file doesn't have imports at the top because it was split coarsely from an HTML string via split-extras.cjs
// It starts with `// ============== SETTINGS / DASHBOARD / UPGRADE MODALS ==============`
// Then `const ModalShell = ...`
// Then `// --- Settings ---`

const shellContent = content.substring(content.indexOf('const ModalShell'), sIdx);
const settingsContent = content.substring(sIdx, dIdx);

// Sparkline is just above DashboardModal, so we want it!
const sparklineIdx = content.indexOf('const Sparkline');
const realDIdx = (sparklineIdx !== -1 && sparklineIdx < dIdx && sparklineIdx > sIdx) ? sparklineIdx : dIdx;

const dashboardContent = content.substring(realDIdx, uIdx);
const upgradeContent = content.substring(uIdx, pIdx);
const profileContent = content.substring(pIdx, aIdx);
const authButtonsContent = content.substring(aIdx);

function makeFile(name, body, extraImports = '') {
  const fileContent = `import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t, __ECO_LANG as ECO_LANG, getLang, LangToggle, useLang } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { IconClose, IconArrowLeft } from '../ui/Icons';
import { TABS } from '../../data/mockData';
import { Avatar, useUser } from '../auth/AuthModals';
import { NotificationBell } from '../notifications/Notifications';
import { ModalShell } from './ModalShell';
${extraImports}

${body}
`;
  fs.writeFileSync(\`src/components/modals/\${name}.jsx\`, fileContent);
}

fs.writeFileSync('src/components/modals/ModalShell.jsx', \`import React from 'react';
import { IconClose } from '../ui/Icons';
\${shellContent}
export { ModalShell };\`);

makeFile('SettingsModal', settingsContent + '\\nexport { SettingsModal };');
makeFile('DashboardModal', dashboardContent + '\\nexport { DashboardModal, Sparkline };');
makeFile('UpgradeModal', upgradeContent + '\\nexport { UpgradeModal };');
makeFile('ProfileMenu', profileContent + '\\nexport { ProfileMenu };');
makeFile('AuthButtons', authButtonsContent + '\\nexport { AuthButtons };', \\`import { ProfileMenu } from './ProfileMenu';\\`);

fs.writeFileSync('src/components/modals/DashboardModals.jsx', \`
export { ModalShell } from './ModalShell';
export { SettingsModal } from './SettingsModal';
export { DashboardModal } from './DashboardModal';
export { UpgradeModal } from './UpgradeModal';
export { ProfileMenu } from './ProfileMenu';
export { AuthButtons } from './AuthButtons';
\`);

console.log('Successfully recreated modals from root file!');
