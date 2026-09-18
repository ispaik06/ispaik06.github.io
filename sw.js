/* notes-site/sw.js — offline cache. build.mjs fills the placeholders and writes it to the site root. */
const VERSION = 'dfa8f17586';
const BASE = '';
const CACHE = 'notes-' + VERSION;
const PRECACHE = ["/","/about/","/notes/","/work/kalman-imu/","/notes/bayes-and-particle-filters/l1-joint-marginal-and-conditional/","/notes/bayes-and-particle-filters/l2-bayes-theorem/","/notes/bayes-and-particle-filters/l3-hidden-state-models/","/notes/bayes-and-particle-filters/l4-the-bayes-filter/","/notes/bayes-and-particle-filters/l5-monte-carlo-and-particles/","/notes/bayes-and-particle-filters/l6-importance-sampling/","/notes/bayes-and-particle-filters/l7-resampling-and-sir/","/notes/bayes-and-particle-filters/","/notes/lqr-riccati-and-the-bellman-bridge/","/notes/kalman-filtering/l1-the-linear-gaussian-estimation-problem/","/notes/kalman-filtering/l2-prediction/","/notes/kalman-filtering/l3-scalar-measurement-update/","/notes/kalman-filtering/l4-multivariate-measurement-update/","/notes/kalman-filtering/l5-the-complete-recursive-filter/","/notes/kalman-filtering/l6-noise-modeling-and-diagnostics/","/notes/kalman-filtering/l7-riccati-observers-and-lqg/","/notes/kalman-filtering/","/notes/lee-2020-prerequisites-lecture-notes/","/notes/silver-rl/lecture-10-lecture-notes/","/notes/silver-rl/lecture-2-lecture-notes/","/notes/silver-rl/lecture-2-question-list/","/notes/silver-rl/lecture-3-lecture-notes/","/notes/silver-rl/lecture-3-question-list/","/notes/silver-rl/lecture-4-lecture-notes/","/notes/silver-rl/lecture-4-question-list/","/notes/silver-rl/lecture-5-lecture-notes/","/notes/silver-rl/lecture-5-question-list/","/notes/silver-rl/lecture-6-lecture-notes/","/notes/silver-rl/lecture-6-reading-companion/","/notes/silver-rl/lecture-7-lecture-notes/","/notes/silver-rl/lecture-8-lecture-notes/","/notes/silver-rl/lecture-9-lecture-notes/","/assets/site.css?v=dfa8f17586","/assets/site.js?v=dfa8f17586","/assets/katex/katex.min.css","/offline.html"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('notes-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !url.pathname.startsWith(BASE + '/')) return;
  const isPage = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isPage) {
    // Pages: network first, so a merged PR shows up on the next load; cached copy when offline.
    e.respondWith(fetch(req).then((res) => { if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(BASE + '/offline.html'))));
    return;
  }
  // Assets: cache first, refresh in the background.
  e.respondWith(caches.match(req).then((cached) => {
    const net = fetch(req).then((res) => { if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; }).catch(() => cached);
    return cached || net;
  }));
});
