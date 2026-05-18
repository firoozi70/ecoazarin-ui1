import fs from 'fs';

let content = fs.readFileSync('extras-dashboard.jsx', 'utf8');

const sIdx = content.indexOf('const SettingsModal');
const dIdx = content.indexOf('const DashboardModal');
const uIdx = content.indexOf('const UpgradeModal');
const pIdx = content.indexOf('const ProfileMenu');
const aIdx = content.indexOf('const AuthButtons');

const shellContent = content.substring(content.indexOf('const ModalShell'), sIdx);
const settingsContent = content.substring(sIdx, dIdx);

const sparklineIdx = content.indexOf('const Sparkline');
const realDIdx = (sparklineIdx !== -1 && sparklineIdx < dIdx && sparklineIdx > sIdx) ? sparklineIdx : dIdx;

const dashboardContent = content.substring(realDIdx, uIdx);
const upgradeContent = content.substring(uIdx, pIdx);
const profileContent = content.substring(pIdx, aIdx);
const authButtonsContent = content.substring(aIdx);

function makeFile(name, body, extraImports = '') {
  const fileContent = "import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';\n" +
"import * as Recharts from 'recharts';\n" +
"const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;\n" +
"import { t, __ECO_LANG as ECO_LANG, getLang, LangToggle, useLang } from '../../i18n/index';\n" +
"import { motion, AnimatePresence } from 'motion/react';\n" +
"import { IconClose, IconArrowLeft } from '../ui/Icons';\n" +
"import { TABS } from '../../data/mockData';\n" +
"import { Avatar, useUser } from '../auth/AuthModals';\n" +
"import { NotificationBell } from '../notifications/Notifications';\n" +
"import { ModalShell } from './ModalShell';\n" +
extraImports + "\n\n" + body;

  fs.writeFileSync('src/components/modals/' + name + '.jsx', fileContent);
}

fs.writeFileSync('src/components/modals/ModalShell.jsx', "import React from 'react';\nimport { IconClose } from '../ui/Icons';\n" + shellContent + "\nexport { ModalShell };\n");

makeFile('SettingsModal', settingsContent + '\nexport { SettingsModal };');
makeFile('DashboardModal', dashboardContent + '\nexport { DashboardModal, Sparkline };');
makeFile('UpgradeModal', upgradeContent + '\nexport { UpgradeModal };');
makeFile('ProfileMenu', profileContent + '\nexport { ProfileMenu };');
makeFile('AuthButtons', authButtonsContent + '\nexport { AuthButtons };', "import { ProfileMenu } from './ProfileMenu';\n");

fs.writeFileSync('src/components/modals/DashboardModals.jsx', "export { ModalShell } from './ModalShell';\nexport { SettingsModal } from './SettingsModal';\nexport { DashboardModal } from './DashboardModal';\nexport { UpgradeModal } from './UpgradeModal';\nexport { ProfileMenu } from './ProfileMenu';\nexport { AuthButtons } from './AuthButtons';\n");

console.log('Successfully recreated modals from root file!');
