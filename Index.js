/* ==========================================================================
   Index.js  -  runs on every page
   It builds the header and footer, handles dark/light mode, and draws the
   content from Data.js. Each page has <body data-page="..."> so this file
   knows which part to run.
   You should not need to edit this file just to change your content.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- tiny helpers ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const rootEl = document.documentElement;

  // el('div', {class: 'x'}, 'text', childNode)  ->  <div class="x">text...</div>
  // Strings are added as plain text, so nothing you type in Data.js can break the page.
  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === false || v == null) return;
      if (k === 'class') node.className = v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    kids.flat().filter(k => k !== false && k != null).forEach(k => node.append(k));
    return node;
  }

  // localStorage can be blocked in some browsers, so wrap it
  const store = {
    get(k)    { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  const fmtDate = iso => new Date(iso + 'T00:00:00')
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  // Same title always gets the same earthy colour
  function hash(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

  // Image if you gave a link, coloured block with the first letter if you didn't (or if the link is broken)
  function cover(title, url, alt) {
    const fallback = () => el('div',
      { class: 'cover-fallback', style: '--tone: var(--tone-' + (hash(title) % 6 + 1) + ')', 'aria-hidden': 'true' },
      el('span', {}, title.trim().charAt(0).toUpperCase()));
    if (!url) return fallback();
    const img = el('img', { src: url, alt: alt || title, loading: 'lazy' });
    img.addEventListener('error', () => img.replaceWith(fallback()));
    return img;
  }

  function toast(message) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {                                     // fallback for older browsers or opening the file directly
      const ta = el('textarea', { style: 'position:fixed;opacity:0' });
      ta.value = text; document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { /* ignore */ }
      ta.remove();
      return ok;
    }
  }

  /* ---------- header (theme toggle + mobile menu) ---------- */
  const PAGES = [
    ['Home',  'index.html', 'home'],
    ['Blog',  'Blog.html',  'blog'],
    ['Shows', 'Shows.html', 'shows'],
    ['Games', 'Games.html', 'games'],
    ['Music', 'Music.html', 'music']
  ];

  function buildHeader() {
    const host = $('#site-header');
    if (!host) return;
    const page = document.body.dataset.page;

    const themeBtn = el('button', { class: 'icon-btn', type: 'button', id: 'theme-toggle' });
    themeBtn.innerHTML =
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

    const menuBtn = el('button', { class: 'menu-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'nav' }, 'Menu');
    const nav = el('nav', { class: 'nav', id: 'nav', 'aria-label': 'Main' },
      PAGES.map(([label, href, key]) => el('a', { href, 'aria-current': key === page ? 'page' : false }, label)),
      el('a', { href: 'Index.html#contact' }, 'Contact'));

    host.append(el('div', { class: 'wrap bar' },
      el('a', { class: 'brand', href: 'Index.html' }, SITE.name), nav, themeBtn, menuBtn));

    // theme
    function labelTheme() {
      const dark = rootEl.dataset.theme === 'dark';
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    labelTheme();
    themeBtn.addEventListener('click', () => {
      rootEl.dataset.theme = rootEl.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('theme', rootEl.dataset.theme);
      labelTheme();
    });

    // mobile menu
    const setMenu = open => { nav.dataset.open = open; menuBtn.setAttribute('aria-expanded', String(open)); };
    menuBtn.addEventListener('click', () => setMenu(nav.dataset.open !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- footer (accent colour picker) ---------- */
  const ACCENTS = [['moss', 'Moss', '#55672F'], ['ochre', 'Ochre', '#B7791F'], ['clay', 'Clay', '#8F4A32']];

  function buildFooter() {
    const host = $('#site-footer');
    if (!host) return;

    const edited = new Date(document.lastModified)
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const swatches = el('div', { class: 'swatches', role: 'group', 'aria-label': 'Site accent colour' },
      el('span', {}, 'Pick a colour'),
      ACCENTS.map(([key, label, colour]) =>
        el('button', { class: 'swatch', type: 'button', 'data-accent': key, 'aria-label': label, style: '--sw:' + colour })));

    host.append(el('div', { class: 'wrap foot' },
      el('p', {}, 'Made by hand in VS Code. Last edited ' + edited + '.'), swatches));

    function markAccent() {
      $$('.swatch', host).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.accent === rootEl.dataset.accent)));
    }
    markAccent();
    swatches.addEventListener('click', e => {
      const b = e.target.closest('.swatch');
      if (!b) return;
      rootEl.dataset.accent = b.dataset.accent;
      store.set('accent', b.dataset.accent);
      markAccent();
    });
  }

  /* ---------- HOME ---------- */
  function home() {
    // fill anything marked data-site="name" / "tagline" from Data.js
    $$('[data-site]').forEach(n => { n.textContent = SITE[n.dataset.site] || ''; });

    // right now
    const now = $('#now');
    NOW.forEach(item => now.append(el('div', {}, el('dt', {}, item.label), el('dd', {}, item.value))));

    // section counts
    const counts = { posts: [POSTS, 'post'], shows: [SHOWS, 'show'], games: [GAMES, 'game'], songs: [TRACKS, 'song'] };
    $$('[data-count]').forEach(n => {
      const [list, word] = counts[n.dataset.count];
      n.textContent = list.length + ' ' + word + (list.length === 1 ? '' : 's');
    });

    // "can't decide" picker
    const PICKS = {
      shows:  { list: SHOWS,  line: s => 'Tonight, watch ' + s.title, note: s => s.note },
      games:  { list: GAMES,  line: g => 'Boot up ' + g.title,        note: g => g.note },
      tracks: { list: TRACKS, line: t => 'Put on ' + t.title + ' by ' + t.artist, note: t => t.mood ? 'Good for: ' + t.mood : '' }
    };
    const out = $('#pick-result');
    const last = {};
    $$('[data-pick]').forEach(btn => btn.addEventListener('click', () => {
      const p = PICKS[btn.dataset.pick];
      let i;
      do { i = Math.floor(Math.random() * p.list.length); } while (p.list.length > 1 && i === last[btn.dataset.pick]);
      last[btn.dataset.pick] = i;
      const item = p.list[i];
      out.replaceChildren(el('strong', {}, p.line(item)), el('span', { class: 'muted' }, p.note(item) || ''));
    }));

    // contacts
    const list = $('#contact-list');
    CONTACTS.forEach(c => {
      const value = c.url ? el('a', { href: c.url, target: '_blank', rel: 'noopener' }, c.text) : el('span', {}, c.text);
      list.append(el('li', {}, el('span', { class: 'k' }, c.label), value));
    });
    $('#copy-email').addEventListener('click', async () => {
      toast(await copyText(SITE.email) ? 'Email copied' : 'Could not copy. Email: ' + SITE.email);
    });

    // local time (only if you set SITE.timezone)
    const clock = $('#local-time');
    if (clock && SITE.timezone) {
      try {
        const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: SITE.timezone });
        const tick = () => { clock.textContent = 'It is ' + fmt.format(new Date()) + ' on my clock right now.'; };
        tick(); setInterval(tick, 30000); clock.hidden = false;
      } catch (e) { /* invalid timezone name: just leave it hidden */ }
    }
  }

  /* ---------- BLOG ---------- */
  function blog() {
    const listEl = $('#post-list');
    const filters = $('#filters');
    const tags = ['All', ...new Set(POSTS.flatMap(p => p.tags || []))];
    let active = 'All';

    function draw() {
      listEl.replaceChildren();
      const posts = POSTS
        .filter(p => active === 'All' || (p.tags || []).includes(active))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      if (!posts.length) listEl.append(el('p', { class: 'empty' }, 'No posts with that tag yet.'));

      posts.forEach(p => {
        const mins = Math.max(1, Math.round(p.body.join(' ').split(/\s+/).length / 200));
        listEl.append(el('details', { class: 'post' },
          el('summary', {},
            el('span', { class: 'post-title' }, p.title),
            el('span', { class: 'post-meta' },
              el('span', {}, fmtDate(p.date)),
              el('span', {}, mins + ' min read'),
              (p.tags || []).map(t => el('span', { class: 'tag' }, t)))),
          el('div', { class: 'post-body' },
            p.image ? el('img', { src: p.image, alt: '', loading: 'lazy' }) : false,
            p.body.map(par => el('p', {}, par)))));
      });
    }

    tags.forEach(t => {
      const b = el('button', { class: 'chip', type: 'button', 'aria-pressed': String(t === active) }, t);
      b.addEventListener('click', () => {
        active = t;
        $$('.chip', filters).forEach(c => c.setAttribute('aria-pressed', String(c === b)));
        draw();
      });
      filters.append(b);
    });
    draw();
  }

  /* ---------- SHOWS ---------- */
  function shows() {
    const grid = $('#poster-grid');
    const filters = $('#filters');
    const STATUS = [['all', 'All'], ['watching', 'Watching now'], ['finished', 'Finished'], ['planned', 'Want to watch']];
    let active = 'all';

    function draw() {
      grid.replaceChildren();
      const items = SHOWS.filter(s => active === 'all' || s.status === active);
      if (!items.length) grid.append(el('p', { class: 'empty' }, 'Nothing here yet.'));
      items.forEach(s => {
        const stars = '\u2605'.repeat(s.rating) + '\u2606'.repeat(5 - s.rating);
        grid.append(el('figure', { class: 'show' },
          el('div', { class: 'poster' }, cover(s.title, s.cover, s.title + ' poster')),
          el('figcaption', {},
            el('strong', {}, s.title),
            el('span', { class: 'meta' }, s.genre),
            el('span', { class: 'stars', role: 'img', 'aria-label': s.rating + ' out of 5' }, stars),
            s.note ? el('p', {}, s.note) : false)));
      });
    }

    STATUS.forEach(([key, label]) => {
      const b = el('button', { class: 'chip', type: 'button', 'aria-pressed': String(key === active) }, label);
      b.addEventListener('click', () => {
        active = key;
        $$('.chip', filters).forEach(c => c.setAttribute('aria-pressed', String(c === b)));
        draw();
      });
      filters.append(b);
    });
    draw();
  }

  /* ---------- GAMES ---------- */
  function games() {
    const listEl = $('#game-list');
    const sort = $('#sort');
    const maxHours = Math.max(1, ...GAMES.map(g => g.hours));
    const STATUS_TEXT = { playing: 'Playing now', finished: 'Finished', backlog: 'In the backlog' };

    function draw() {
      const items = GAMES.slice();
      if (sort.value === 'hours') items.sort((a, b) => b.hours - a.hours);
      if (sort.value === 'title') items.sort((a, b) => a.title.localeCompare(b.title));
      if (sort.value === 'status') items.sort((a, b) => a.status.localeCompare(b.status) || b.hours - a.hours);

      listEl.replaceChildren();
      items.forEach(g => {
        listEl.append(el('li', { class: 'game' },
          el('div', { class: 'thumb' }, cover(g.title, g.cover, g.title + ' cover art')),
          el('div', {},
            el('h3', {}, g.title),
            el('p', { class: 'sub' }, g.platform + ', ' + (STATUS_TEXT[g.status] || g.status)),
            g.note ? el('p', { class: 'sub' }, g.note) : false),
          el('div', { class: 'hours' },
            el('span', { class: 'hours-bar', 'aria-hidden': 'true' },
              el('span', { style: 'width:' + Math.round(g.hours / maxHours * 100) + '%' })),
            el('span', { class: 'hours-label' }, g.hours + ' hours played'))));
      });
    }
    sort.addEventListener('change', draw);
    draw();
  }

  /* ---------- MUSIC ---------- */
  function music() {
    const record = $('#record');
    const label = $('#record-label');
    const title = $('#np-title');
    const artist = $('#np-artist');
    const link = $('#np-link');
    const listEl = $('#tracklist');
    let current = -1;

    function select(i) {
      current = i;
      const t = TRACKS[i];
      label.replaceChildren(cover(t.title, t.cover, ''));
      title.textContent = t.title;
      artist.textContent = t.artist + (t.mood ? ' (good for ' + t.mood + ')' : '');
      link.hidden = !t.link;
      if (t.link) link.href = t.link;
      record.classList.add('spinning');
      $$('.track', listEl).forEach((b, n) => b.setAttribute('aria-current', String(n === i)));
    }

    TRACKS.forEach((t, i) => {
      const b = el('button', { class: 'track', type: 'button', 'aria-current': 'false' },
        el('span', { class: 't' }, t.title), el('span', { class: 'a' }, t.artist), el('span', { class: 'm' }, t.mood || ''));
      b.addEventListener('click', () => select(i));
      listEl.append(el('li', {}, b));
    });

    $('#shuffle').addEventListener('click', () => {
      let i;
      do { i = Math.floor(Math.random() * TRACKS.length); } while (TRACKS.length > 1 && i === current);
      select(i);
    });

    // full playlist player
    const embed = $('#embed');
    if (PLAYLIST_EMBED) {
      embed.className = '';
      embed.replaceChildren(el('iframe', {
        class: 'frame', src: PLAYLIST_EMBED, title: 'My full playlist', loading: 'lazy',
        allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      }));
    }

    select(0);
  }

  /* ---------- go ---------- */
  buildHeader();
  buildFooter();
  const pages = { home, blog, shows, games, music };
  const run = pages[document.body.dataset.page];
  if (run) run();
})();
