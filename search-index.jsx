// =====================================================================
// شاخص جستجو — همهٔ آیتم‌های قابل جستجوی سایت
// =====================================================================
(function () {
  const tabLabel = {
    news: 'اخبار', edu: 'آموزش', tools: 'ابزارها',
    products: 'محصولات', journal: 'ژورنال', articles: 'مقالات', podcast: 'پادکست',
  };

  const idx = [];

  // TAB_CONTENT items
  const tc = window.TAB_CONTENT || {};
  Object.keys(tc).forEach((k) => {
    const sec = tc[k];
    (sec.items || []).forEach((it) => {
      idx.push({
        title: it.title,
        category: tabLabel[k] || k,
        section: sec.eyebrow || '',
        tag: it.tag,
        meta: it.meta,
        url: `#${k}`,
      });
    });
  });

  // FEATURED_NEWS, NEWS_GRID, lists
  (window.FEATURED_NEWS || []).forEach((it) => idx.push({
    title: it.title, category: 'اخبار', section: it.kicker, tag: it.kicker, meta: it.meta, url: '#news',
  }));
  (window.NEWS_GRID || []).forEach((it) => idx.push({
    title: it.title, category: 'اخبار', section: it.kicker, tag: it.kicker, meta: `${it.views} بازدید`, url: '#news',
  }));
  (window.LATEST_LIST || []).forEach((it) => idx.push({
    title: it.title, category: 'اخبار', section: 'جدیدترین‌ها', tag: 'جدید', meta: it.meta, url: '#news',
  }));
  (window.POPULAR_LIST || []).forEach((it) => idx.push({
    title: it.title, category: 'اخبار', section: 'پربازدیدترین‌ها', tag: 'پرطرفدار', meta: it.meta, url: '#news',
  }));
  (window.EDITORS_LIST || []).forEach((it) => idx.push({
    title: it.title, category: 'اخبار', section: 'منتخب سردبیر', tag: 'منتخب', meta: it.meta, url: '#news',
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
      const hay = normalize(`${it.title} ${it.section} ${it.tag} ${it.category}`);
      let score = 0;
      tokens.forEach((t) => {
        if (hay.includes(t)) score += 1;
        if (normalize(it.title).includes(t)) score += 2;
        if (normalize(it.title).startsWith(t)) score += 1;
      });
      if (score > 0) scored.push({ ...it, _score: score });
    });
    scored.sort((a, b) => b._score - a._score);
    return scored.slice(0, limit);
  };
})();
