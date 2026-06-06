import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { TAB_CONTENT, FEATURED_NEWS, NEWS_GRID, LATEST_LIST, POPULAR_LIST, EDITORS_LIST } from '../data/mockData';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;


// =====================================================================
// شاخص جستجو — همهٔ آیتم‌های قابل جستجوی سایت
// =====================================================================
(function () {
  const tabLabel = {
    news: 'اخبار', edu: 'آموزش', tools: 'ابزارها',
    products: 'محصولات', journal: 'ژورنال', articles: 'مقالات', podcast: 'پادکست',
  };
  const tabLabelEn = {
    news: 'News', edu: 'Education', tools: 'Tools',
    products: 'Products', journal: 'Journal', articles: 'Articles', podcast: 'Podcast',
  };

  const idx = [];

  // TAB_CONTENT items
  const tc = window.TAB_CONTENT || {};
  Object.keys(tc).forEach((k) => {
    const sec = tc[k];
    (sec.items || []).forEach((it) => {
      idx.push({
        titleFa: it.titleFa,
        titleEn: it.titleEn,
        categoryFa: tabLabel[k] || k,
        categoryEn: tabLabelEn[k] || k,
        sectionFa: sec.eyebrow || '',
        sectionEn: sec.eyebrowEn || sec.eyebrow || '', // Fallback
        tagFa: it.tag,
        tagEn: it.tagEn || it.tag,
        metaFa: it.metaFa || it.meta,
        metaEn: it.metaEn || it.meta,
        url: `#${k}`,
      });
    });
  });

  // FEATURED_NEWS, NEWS_GRID, lists
  (window.FEATURED_NEWS || []).forEach((it) => idx.push({
    titleFa: it.titleFa, titleEn: it.titleEn, categoryFa: 'اخبار', categoryEn: 'News', sectionFa: it.kickerFa || it.kicker, sectionEn: it.kickerEn || it.kicker, tagFa: it.kickerFa || it.kicker, tagEn: it.kickerEn || it.kicker, metaFa: it.metaFa || it.meta, metaEn: it.metaEn || it.meta, url: '#news',
  }));
  (window.NEWS_GRID || []).forEach((it) => idx.push({
    titleFa: it.titleFa, titleEn: it.titleEn, categoryFa: 'اخبار', categoryEn: 'News', sectionFa: it.kickerFa || it.kicker, sectionEn: it.kickerEn || it.kicker, tagFa: it.kickerFa || it.kicker, tagEn: it.kickerEn || it.kicker, metaFa: it.timeFa || `${it.views} بازدید`, metaEn: it.timeEn || `${it.views} views`, url: '#news',
  }));
  (window.LATEST_LIST || []).forEach((it) => idx.push({
    titleFa: it.titleFa, titleEn: it.titleEn, categoryFa: 'اخبار', categoryEn: 'News', sectionFa: 'جدیدترین‌ها', sectionEn: 'Latest', tagFa: 'جدید', tagEn: 'New', metaFa: it.metaFa || it.meta, metaEn: it.metaEn || it.meta, url: '#news',
  }));
  (window.POPULAR_LIST || []).forEach((it) => idx.push({
    titleFa: it.titleFa, titleEn: it.titleEn, categoryFa: 'اخبار', categoryEn: 'News', sectionFa: 'پربازدیدترین‌ها', sectionEn: 'Popular', tagFa: 'پرطرفدار', tagEn: 'Trending', metaFa: it.metaFa || it.meta, metaEn: it.metaEn || it.meta, url: '#news',
  }));
  (window.EDITORS_LIST || []).forEach((it) => idx.push({
    titleFa: it.titleFa, titleEn: it.titleEn, categoryFa: 'اخبار', categoryEn: 'News', sectionFa: 'منتخب سردبیر', sectionEn: 'Editor\'s Choice', tagFa: 'منتخب', tagEn: 'Editor', metaFa: it.metaFa || it.meta, metaEn: it.metaEn || it.meta, url: '#news',
  }));

  window.SEARCH_INDEX = idx;

  // Persian-aware normalize: unify ي→ی, ك→ک, remove diacritics, lowercase
  const normalize = (s) => (s || '')
    .toString()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[ي]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/\u200c/g, ' ')
    .toLowerCase()
    .trim();

  window.searchSite = function (q, limit = 8) {
    const nq = normalize(q);
    if (!nq) return [];
    const tokens = nq.split(/\s+/).filter(Boolean);
    const scored = [];
    idx.forEach((it) => {
      const isEnQuery = /^[A-Za-z0-9\s]+$/.test(nq);
      const hay = normalize(isEnQuery ? `${it.titleEn} ${it.sectionEn} ${it.tagEn} ${it.categoryEn}` : `${it.titleFa} ${it.sectionFa} ${it.tagFa} ${it.categoryFa}`);
      let score = 0;
      tokens.forEach((t) => {
        if (hay.includes(t)) score += 1;
        if (normalize(isEnQuery ? it.titleEn : it.titleFa).includes(t)) score += 2;
        if (normalize(isEnQuery ? it.titleEn : it.titleFa).startsWith(t)) score += 1;
      });
      if (score > 0) scored.push({ ...it, _score: score });
    });
    scored.sort((a, b) => b._score - a._score);
    return scored.slice(0, limit);
  };
})();

