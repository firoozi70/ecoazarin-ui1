import fs from 'fs';

const content = fs.readFileSync('src/components/modals/DashboardModals.jsx', 'utf8');

const sIdx = content.indexOf('// --- Settings ---');
const dIdx = content.indexOf('// --- Dashboard ---');
const uIdx = content.indexOf('// --- Upgrade Modal ---');
const pIdx = content.indexOf('// --- Profile Menu ---');
const aIdx = content.indexOf('// --- Auth Buttons ---');

const header = content.substring(0, content.indexOf('// ============== SETTINGS / DASHBOARD / UPGRADE MODALS =============='));
const sharedShellContent = content.substring(content.indexOf('// ============== SETTINGS / DASHBOARD / UPGRADE MODALS =============='), sIdx);

const settingsContent = content.substring(sIdx, dIdx);

// Dashboard Modal includes Sparkline
const dashboardContent = content.substring(dIdx, uIdx);

const upgradeContent = content.substring(uIdx, pIdx);
const profileContent = content.substring(pIdx, aIdx);
const authButtonsContent = content.substring(aIdx);

function makeFile(name, body, extraImports = '') {
  const fileContent = `import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { IconClose, IconArrowLeft } from '../ui/Icons';
import { TABS } from '../../data/mockData';
import { getLang, LangToggle, useLang } from '../../i18n/index';
import { Avatar, useUser } from '../auth/AuthModals';
import { NotificationBell } from '../notifications/Notifications';
// custom split imports
import { ModalShell } from './ModalShell';
${extraImports}

${body}
`;
  fs.writeFileSync(`src/components/modals/${name}.jsx`, fileContent);
}

fs.writeFileSync('src/components/modals/ModalShell.jsx', `import React from 'react';\nimport { IconClose } from '../ui/Icons';\n${sharedShellContent}\nexport { ModalShell };`);

makeFile('SettingsModal', settingsContent + '\nexport { SettingsModal };');
makeFile('DashboardModal', dashboardContent + '\nexport { DashboardModal };');
makeFile('UpgradeModal', upgradeContent + '\nexport { UpgradeModal };');
makeFile('ProfileMenu', profileContent + '\nexport { ProfileMenu };');
makeFile('AuthButtons', authButtonsContent + '\nexport { AuthButtons };', `import { ProfileMenu } from './ProfileMenu';\nimport { useUser } from '../auth/AuthModals';\nimport { NotificationBell } from '../notifications/Notifications';\n`);

// Create a re-export index to hold everything together so imports elsewhere don't break immediately or we can update them
fs.writeFileSync('src/components/modals/DashboardModals.jsx', `
export { ModalShell } from './ModalShell';
export { SettingsModal } from './SettingsModal';
export { DashboardModal } from './DashboardModal';
export { UpgradeModal } from './UpgradeModal';
export { ProfileMenu } from './ProfileMenu';
export { AuthButtons } from './AuthButtons';
`);
console.log('Split created successfully!');
