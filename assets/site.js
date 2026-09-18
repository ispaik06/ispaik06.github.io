/* website/assets/site.js — theme, search over the notes, TOC scrollspy, slide lightbox, offline. */
(() => {
  const root = document.documentElement;
  const BASE = root.dataset.base || '';
  const $ = (s, el = document) => el.querySelector(s);

  // ---- theme: dark by default, light on request ----------------------------
  const isLight = () => root.dataset.theme === 'light';
  $('#theme-btn')?.addEventListener('click', () => {
    const next = isLight() ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('site-theme', next); } catch (e) { /* private mode */ }
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = getComputedStyle(root).getPropertyValue('--bg').trim();
  });

  // ---- scrollspy for the desktop table of contents --------------------------
  const toc = $('#toc');
  const tocLinks = new Map(); const heads = [];
  if (toc) toc.querySelectorAll('a[href^="#"]').forEach((a) => { const el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); if (el) { tocLinks.set(el.id, a); heads.push(el); } });
  let activeId = null, ticking = false;
  const spy = () => {
    if (!heads.length) return;
    const y = scrollY + 96;
    let cur = heads[0];
    for (const h of heads) { if (h.offsetTop <= y) cur = h; else break; }
    if (cur.id === activeId) return;
    activeId = cur.id;
    tocLinks.forEach((a, id) => a.classList.toggle('active', id === activeId));
    const a = tocLinks.get(activeId);
    if (a) { const r = a.getBoundingClientRect(), t = toc.getBoundingClientRect(); if (r.top < t.top || r.bottom > t.bottom) a.scrollIntoView({ block: 'nearest' }); }
  };
  addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; spy(); }); }, { passive: true });
  spy();

  // ---- search over the notes --------------------------------------------------
  const search = $('#search'), input = $('#search-input'), results = $('#search-results');
  const lock = (on) => document.body.classList.toggle('no-scroll', on);
  let index = null, loading = null;
  const escHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const openSearch = () => {
    if (!search) return;
    search.hidden = false; lock(true); input.focus(); input.select();
    if (!index && !loading) loading = fetch(BASE + '/notes/search-index.json').then((r) => r.json()).then((j) => { index = j; run(); }).catch(() => { results.innerHTML = '<p class="sr-empty">Search index unavailable.</p>'; });
  };
  const closeSearch = () => { if (!search) return; search.hidden = true; lock(false); };
  $('#search-btn')?.addEventListener('click', openSearch);
  search?.addEventListener('click', (e) => { if (e.target === search) closeSearch(); });
  addEventListener('keydown', (e) => {
    if (!search) return;
    if (e.key === 'Escape' && !search.hidden) { closeSearch(); return; }
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName || '');
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !typing) { e.preventDefault(); openSearch(); }
    if (e.key === 'Enter' && !search.hidden) { const a = results.querySelector('a'); if (a) location.href = a.href; }
  });
  const snippet = (text, q) => {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return escHtml(text.slice(0, 120));
    const a = Math.max(0, i - 48), b = Math.min(text.length, i + q.length + 72);
    return (a > 0 ? '…' : '') + escHtml(text.slice(a, i)) + '<b>' + escHtml(text.slice(i, i + q.length)) + '</b>' + escHtml(text.slice(i + q.length, b)) + (b < text.length ? '…' : '');
  };
  function run() {
    if (!index) return;
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const hits = [];
    for (const p of index) {
      let score = 0, anchor = '', snip = '';
      if (p.t.toLowerCase().includes(q)) score += 5;
      const h = p.h.find((x) => x.t.toLowerCase().includes(q));
      if (h) { score += 3; anchor = '#' + encodeURIComponent(h.id); snip = h.t; }
      if (p.b.toLowerCase().includes(q)) { score += 1; if (!snip) snip = p.b; }
      if (score) hits.push({ p, score, anchor, snip });
    }
    hits.sort((a, b) => b.score - a.score);
    results.innerHTML = hits.length
      ? hits.slice(0, 20).map(({ p, anchor, snip }) => `<a href="${p.u}${anchor}"><span class="sr-title">${escHtml(p.t)}</span>${p.s ? `<span class="sr-series">${escHtml(p.s)}</span>` : ''}${snip ? `<p class="sr-snip">${snippet(snip, q)}</p>` : ''}</a>`).join('')
      : '<p class="sr-empty">No matches.</p>';
  }
  input?.addEventListener('input', run);

  // ---- slide lightbox ---------------------------------------------------------
  const slides = [...document.querySelectorAll('.slide-open')];
  if (slides.length) {
    let box = null, cur = -1, swiped = false, x0 = null;
    const close = () => { if (swiped) { swiped = false; return; } box?.remove(); box = null; cur = -1; lock(false); };
    const show = (i) => {
      cur = (i + slides.length) % slides.length;
      const a = slides[cur], img = a.querySelector('img');
      if (!box) { box = document.createElement('div'); box.className = 'lightbox'; box.innerHTML = '<img alt=""><div class="lightbox-cap mono"></div>'; box.addEventListener('click', close); document.body.appendChild(box); lock(true); }
      const big = box.querySelector('img'); big.src = a.href; big.alt = img.alt;
      box.querySelector('.lightbox-cap').textContent = `${img.alt} · ${cur + 1} / ${slides.length}`;
    };
    slides.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); show(i); }));
    addEventListener('keydown', (e) => { if (!box) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(cur + 1); else if (e.key === 'ArrowLeft') show(cur - 1); });
    addEventListener('touchstart', (e) => { if (box) x0 = e.touches[0].clientX; }, { passive: true });
    addEventListener('touchend', (e) => { if (!box || x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) { swiped = true; show(cur + (dx < 0 ? 1 : -1)); setTimeout(() => { swiped = false; }, 400); } }, { passive: true });
  }

  // ---- offline copies of visited pages ---------------------------------------
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register(BASE + '/sw.js', { scope: BASE + '/' }).catch(() => {});
})();
