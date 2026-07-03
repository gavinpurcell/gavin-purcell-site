# gavinpurcell.com Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition gavinpurcell.com around "Fractional AI Creative Officer," replace the stale AI photo widget with a proof-of-work hero, rebuild consulting into named offers with a qualifying intake form, and make the SPA prerender to static HTML so search and AI crawlers can read it.

**Architecture:** Evolve the existing neo-brutalist React 19 + Vite 7 SPA in place. New hero (copy + "Rundown" card), rebuilt Consulting section with three named offers and a Formspree intake form, a serverless endpoint that auto-fetches the latest AI4H episode, an image-optimization pass, and a puppeteer postbuild prerender script that snapshots all routes into `dist/` as static HTML.

**Tech Stack:** React 19, Vite 7, framer-motion, react-helmet-async, Vercel serverless functions, puppeteer (devDep, build-time only), sharp (devDep, one-shot image script).

## Global Constraints

- All work on local branch `site-refresh`. NEVER push to remote or deploy (Vercel auto-deploys on push).
- Keep the existing design system: tokens in `src/index.css` (cream `#FAF7F3`, burnt orange `#E65C2A`, primary-dark `#C74619` for text-on-cream links, black 3px borders, hard offset shadows, DM Serif Display + Outfit). No new fonts, no new palette.
- No em dashes in any copy. Use commas, colons, periods.
- No public pricing anywhere. Qualification happens via the intake form's budget dropdown.
- No emojis as icons. Inline SVG only.
- Placeholder values that Gavin must swap later are marked with `PLACEHOLDER` comments: Formspree form ID.
- No test framework exists in this repo and adding one for a copy/design refresh is YAGNI. Each task's verify step is: `npm run build` succeeds + task-specific `grep`/`curl` checks + visual check in dev server.
- Verifiable claims only in copy: Emmy is real, Tonight Show is real, a16z Speedrun is real, "100M+ viewers" is on the existing site. Do not invent subscriber/download numbers.

---

### Task 1: Branch + repo hygiene

**Files:**
- Delete: `.claude/worktrees/sad-zhukovsky/`, `.claude/worktrees/pedantic-turing-acb1fb/`
- Modify: `.gitignore`

- [ ] **Step 1: Create branch**

```bash
cd ~/gavin-purcell-site && git checkout -b site-refresh
```

- [ ] **Step 2: Remove committed worktree cruft and ignore it**

```bash
git rm -r --cached .claude/worktrees 2>/dev/null; rm -rf .claude/worktrees
echo ".claude/worktrees/" >> .gitignore
```

- [ ] **Step 3: Verify build still passes**

Run: `npm run build` — Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove committed worktree copies, ignore .claude/worktrees"
```

---

### Task 2: Hero rebuild (kill Transform Me, add The Rundown)

**Files:**
- Rewrite: `src/components/Hero.jsx`
- Rewrite: `src/components/Hero.css`
- Delete: `api/generate-prompt.js`, `api/transform-image.js`

**Interfaces:**
- Produces: hero anchors `#consulting` (primary CTA target, exists) and `#work` is NOT used; CTA hrefs are `#consulting` and `#rundown` (in-page).
- The Rundown card is static data inside Hero.jsx; no props, no API.

- [ ] **Step 1: Rewrite `src/components/Hero.jsx`** with:

```jsx
import { motion } from 'framer-motion';
import './Hero.css';

const rundown = [
  {
    tag: 'ON AIR',
    title: 'AI For Humans',
    detail: 'Twice-weekly AI show with Kevin Pereira. New episodes Wednesday and Friday.',
    href: 'https://www.aiforhumans.show',
    cta: 'Watch',
  },
  {
    tag: 'SHIPPED',
    title: 'The Fishbowl',
    detail: 'AI focus-group simulator. Designed, built, and shipped solo with AI coding agents.',
    href: 'https://fishbowl.show',
    cta: 'Try it',
  },
  {
    tag: 'CO-FOUNDED',
    title: 'AndThen',
    detail: 'Interactive audio storytelling startup. Backed by a16z Speedrun.',
    href: 'https://andthen.chat',
    cta: 'Play it',
  },
  {
    tag: 'RECEIPTS',
    title: 'The Tonight Show',
    detail: 'Emmy-winning showrunner. Two decades in TV and digital, 100M+ viewers reached.',
    href: '#about',
    cta: 'The story',
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="hero-eyebrow">Gavin Purcell · Fractional AI Creative Officer</p>
          <h1 className="hero-title">
            Your AI strategy needs <span className="hero-title-em">a showrunner.</span>
          </h1>
          <p className="hero-description">
            I ran <strong>The Tonight Show</strong>, won an Emmy, and co-host{' '}
            <strong>AI For Humans</strong>. Now I help media, entertainment, and creative
            teams actually ship with AI: strategy, workshops, and keynotes from someone
            who builds with this stuff every day.
          </p>
          <div className="hero-actions">
            <a href="#consulting" className="btn btn-large">Work With Me</a>
            <a href="#rundown" className="btn btn-large btn-secondary">See the Work</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="rundown-card" id="rundown">
            <div className="rundown-header">
              <span className="rundown-header-title">The Rundown</span>
              <span className="rundown-header-note">Proof of work</span>
            </div>
            <ol className="rundown-list">
              {rundown.map((item, i) => (
                <li key={item.title} className="rundown-item">
                  <div className="rundown-item-meta">
                    <span className="rundown-item-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rundown-item-tag">{item.tag}</span>
                  </div>
                  <div className="rundown-item-body">
                    <h2 className="rundown-item-title">{item.title}</h2>
                    <p className="rundown-item-detail">{item.detail}</p>
                  </div>
                  <a
                    className="rundown-item-link"
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.cta}
                    <span aria-hidden="true"> →</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Hero.css`**, keeping `.hero`, `.hero-container`, `.hero-content`, `.hero-title`, `.hero-description`, `.hero-actions` blocks (drop all `.photo-*`, `.style-*`, `.quick-*`, `.prompt-*`, `.processing-*`, `.apply-btn`, `.error-message` blocks) and adding:

```css
.hero-eyebrow {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-primary-dark);
  border-bottom: var(--border-width) var(--border-style);
  display: inline-block;
  padding-bottom: var(--space-xs);
  margin-bottom: var(--space-md);
}

.hero-title-em {
  color: var(--color-primary);
  font-style: italic;
}

.rundown-card {
  background: var(--color-surface);
  border: var(--border-width) var(--border-style);
  box-shadow: var(--shadow-lg);
}

.rundown-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-dark);
  color: var(--color-bg);
  border-bottom: var(--border-width) var(--border-style);
}

.rundown-header-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
}

.rundown-header-note {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent);
}

.rundown-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.rundown-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-sm);
  align-items: center;
  padding: var(--space-sm) var(--space-md);
}

.rundown-item + .rundown-item {
  border-top: 2px var(--border-style);
}

.rundown-item-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 5.5rem;
}

.rundown-item-index {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-text-light);
}

.rundown-item-tag {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-dark);
}

.rundown-item-title {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0 0 2px;
  line-height: 1.2;
}

.rundown-item-detail {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0;
  line-height: 1.45;
}

.rundown-item-link {
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 2px var(--border-style);
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.rundown-item-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-border);
  color: var(--color-primary-dark);
}
```

Keep existing responsive blocks for `.hero-container`/`.hero-title`/`.hero-description`/`.hero-actions`; inside `@media (max-width: 768px)` replace widget rules with: `.rundown-item { grid-template-columns: 1fr auto; } .rundown-item-meta { flex-direction: row; gap: var(--space-xs); min-width: 0; grid-column: 1 / -1; }`.

- [ ] **Step 3: Delete dead serverless functions**

```bash
git rm api/generate-prompt.js api/transform-image.js
```

- [ ] **Step 4: Verify**

Run: `npm run build` (exits 0) and `grep -ri "transform me\|nano banana\|generate-prompt\|transform-image" src/ api/ 2>/dev/null` (no matches). Visual check in `npm run dev`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: new hero with Fractional AI Creative Officer positioning + Rundown card, remove AI photo widget"
```

---

### Task 3: Consulting rebuild (named offers + speaking talks)

**Files:**
- Rewrite: `src/components/Consulting.jsx` (keep `<FAQ />`, keep `id="consulting"` and `id="contact"` anchors)
- Modify: `src/components/Consulting.css` (add offer-card styles reusing existing patterns)
- Modify: `src/components/FAQ.jsx` (answers reference the three named offers; add one Q on budget/how engagements start)

**Interfaces:**
- Consumes: `<IntakeForm />` from Task 4 — build this task with the old CTA box intact, then Task 4 swaps it. (If executing sequentially in one session, Tasks 3+4 may be one commit.)

- [ ] **Step 1: Replace the four generic service cards** with three named offers (data array `offers`):

1. **The AI Jumpstart** — tag `WORKSHOP`: "A half-day or full-day working session for creative and media teams. Not a lecture: your team leaves with working AI workflows built on your actual projects." Bullets: Hands-on with your team's real work · Tool stack recommendations you can defend · Workflows your team keeps using Monday · Follow-up playbook.
2. **Fractional AI Creative Officer** — tag `ONGOING ADVISORY`: "Senior AI leadership for your creative org without the full-time hire. A monthly cadence of strategy, tool calls, and build reviews from someone who ships with AI daily. Limited to a few teams at a time." Bullets: Monthly strategy + roadmap sessions · Tool and vendor evaluation · Team upskilling plan · Direct line to me between sessions.
3. **Keynotes and Speaking** — tag `ON STAGE`: "Two decades of TV plus daily hands-on AI, on your stage. Funny, practical, zero hype." Named talks list: "AI for Actual Humans: What's Real, What's Hype, and What to Do About It" · "The AI-Native Studio: How Creative Teams Will Work in 2027" · Custom talks built for your audience.

- [ ] **Step 2: Update section header copy.** H2 stays "Let's Work Together". Subtitle becomes: "I work with media companies, entertainment brands, and creative teams that know AI matters but need someone who has actually shipped with it. Three ways in:"

- [ ] **Step 3: Verify + commit**

Run: `npm run build`; visual check. `git add -A && git commit -m "feat: consulting section rebuilt as three named offers with talk titles"`

---

### Task 4: Intake form (replaces mailto-only CTA)

**Files:**
- Create: `src/components/IntakeForm.jsx`
- Create: `src/components/IntakeForm.css`
- Modify: `src/components/Consulting.jsx` (CTA box → intake form block, keep `id="contact"`)

**Interfaces:**
- Produces: `<IntakeForm />` default export, no props. POSTs to Formspree.

- [ ] **Step 1: Create `src/components/IntakeForm.jsx`:**

```jsx
import { useState } from 'react';
import './IntakeForm.css';

// PLACEHOLDER: create a form at formspree.io and replace this ID before deploying
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';

const INTERESTS = [
  'AI Jumpstart workshop',
  'Fractional AI Creative Officer (ongoing advisory)',
  'Keynote or speaking',
  'Something else',
];

const BUDGETS = ['Under $10k', '$10k to $25k', '$25k to $50k', '$50k+', 'Not sure yet'];

export default function IntakeForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="intake-sent">
        <h3>Got it.</h3>
        <p>I read every one of these myself and reply within a couple of days. Talk soon.</p>
      </div>
    );
  }

  return (
    <form className="intake-form" onSubmit={handleSubmit}>
      <div className="intake-row">
        <label className="intake-field">
          <span>Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="intake-field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="intake-row">
        <label className="intake-field">
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
        <label className="intake-field">
          <span>What do you need?</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>Pick one</option>
            {INTERESTS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <label className="intake-field">
        <span>Budget range</span>
        <select name="budget" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="intake-field">
        <span>What are you trying to do?</span>
        <textarea name="message" rows={4} required placeholder="A couple of sentences is plenty." />
      </label>
      {status === 'error' && (
        <p className="intake-error">
          That didn't send. Try again, or email{' '}
          <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a> directly.
        </p>
      )}
      <button type="submit" className="btn btn-large" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Start the Conversation'}
      </button>
      <p className="intake-alt">
        Prefer email? <a href="mailto:gavin@gavinpurcell.com">gavin@gavinpurcell.com</a>
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Create `IntakeForm.css`** using existing tokens: fields with `border: 2px var(--border-style)`, cream bg, focus state `border-color: var(--color-primary); outline: none; box-shadow: 3px 3px 0 var(--color-border)`, labels uppercase 0.75rem 800-weight letterspaced, `.intake-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); }` collapsing to 1fr under 768px. `.intake-error` reuses red pattern from old Hero.css error style.

- [ ] **Step 3: In `Consulting.jsx`**, replace the `.cta-box` inner content: keep the wrapper `motion.div id="contact"`, H3 "Ready to Start a Conversation?", one-line intro "Tell me what you're working on. The budget question just helps me point you at the right offer.", then `<IntakeForm />`. Remove the `gavin AT gavinpurcell.com` text line and the mailto button (the form's footer link covers email).

- [ ] **Step 4: Verify + commit**

`npm run build`; dev-server check: form renders, select validation works, submit with REPLACE_ME endpoint shows the error state (expected until real ID). Commit: `feat: qualifying intake form with budget dropdown replaces mailto CTA`

---

### Task 5: Auto-fetch latest AI4H episode

**Files:**
- Create: `api/latest-episode.js`
- Modify: `src/components/AIForHumans.jsx` (fetch on mount, fall back to hardcoded ID)

**Interfaces:**
- Produces: `GET /api/latest-episode` → `{ videoId: string }`, cache header `s-maxage=3600`.

- [ ] **Step 1: Find the channel ID** (implementation-time): `curl -s https://www.youtube.com/@AIForHumansShow | grep -o 'channel_id=[^"&]*' | head -1`

- [ ] **Step 2: Create `api/latest-episode.js`:**

```js
const CHANNEL_ID = 'REPLACE_AT_IMPLEMENTATION'; // resolved in Step 1
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export default async function handler(req, res) {
  try {
    const xml = await (await fetch(FEED)).text();
    // First <yt:videoId> in the feed is the newest upload
    const match = xml.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/);
    if (!match) throw new Error('no video id in feed');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ videoId: match[1] });
  } catch (err) {
    res.status(502).json({ error: 'feed unavailable' });
  }
}
```

Note: YouTube feed lists uploads including Shorts; if AI4H posts Shorts, filter by checking `<media:title>` length or accept newest upload (Gavin posts full eps 2x/week; acceptable). Flag in PR notes.

- [ ] **Step 3: In `AIForHumans.jsx`**, keep `latestEpisodeVideoId` as the fallback constant; add `useEffect` fetching `/api/latest-episode`, `setVideoId(data.videoId)` on success, silent fallback on failure. Embed src uses state.

- [ ] **Step 4: Verify + commit**

`npm run build`; dev check (API 404s under plain vite dev, fallback must render). Commit: `feat: auto-fetch latest AI For Humans episode from YouTube feed with hardcoded fallback`

---

### Task 6: Image optimization

**Files:**
- Create: `scripts/optimize-images.mjs` (sharp, one-shot)
- Modify: image references in `src/services/wordpress.js`, `src/components/About.jsx`, `src/components/Blog.jsx`, `src/components/FeaturedBlogPost.jsx`, `src/components/BlogPost.jsx`
- Modify: `index.html` (og:image → optimized jpg)

- [ ] **Step 1:** `npm i -D sharp`

- [ ] **Step 2: Create and run `scripts/optimize-images.mjs`:** for each PNG/JPG in `public/` over 300KB: resize to max 1600px wide, write `.webp` (quality 80) next to the original. Special case `gavin-photo.png` → also emit `gavin-photo-og.jpg` at 1200x630 (cover crop, quality 85) for OG (webp OG support is spotty). Print a before/after size table. Keep originals on disk but update all code references to `.webp`; delete originals whose references are fully migrated.

- [ ] **Step 3: Update references** (`grep -rn "\.png\|\.jpe\?g" src/ index.html` to find them) to `.webp` variants; `og:image`/`twitter:image` in `index.html` → `https://gavinpurcell.com/gavin-photo-og.jpg`. Add `loading="lazy"` + explicit `width`/`height` to blog card images (`Blog.jsx:113`, `FeaturedBlogPost.jsx:73`), About highlight images (`About.jsx:107,112`), and `BlogPost.jsx:190` featured image (this one can stay eager, it's LCP; give it dimensions only).

- [ ] **Step 4: Verify + commit**

`npm run build`; `du -sh public/` before/after in commit message; dev-server visual check that no image 404s (`grep -rn "featuredImage" src/services/wordpress.js` paths all resolve to files in `public/`). Commit: `perf: webp images, lazy loading, explicit dimensions (multi-MB PNGs removed)`

---

### Task 7: Meta, schema, llms.txt, canonical, duplicate id

**Files:**
- Modify: `index.html` (title, description, schema jobTitle, canonical)
- Modify: `src/components/Footer.jsx:8` (remove `id="contact"`)
- Modify: `public/llms.txt`, `public/ai.txt`, `public/llms-full-text.txt`
- Modify: `public/sitemap.xml` (bump lastmod for `/`)

- [ ] **Step 1: `index.html`:**
  - Title → `Gavin Purcell | Fractional AI Creative Officer, AI Speaker for Media & Entertainment`
  - Description → `Emmy-winning Tonight Show showrunner turned Fractional AI Creative Officer. AI strategy, workshops, and keynotes for media, entertainment, and creative teams. Co-host of AI For Humans.`
  - Canonical → `https://gavinpurcell.com/` (trailing slash, matching Helmet)
  - Schema `jobTitle` → `"Fractional AI Creative Officer, AI Keynote Speaker"`; add `"offers"` unnecessary, keep Person schema otherwise; update `description` field to match new positioning.
  - og:title/og:description + twitter equivalents updated to match.

- [ ] **Step 2: `Footer.jsx:8`:** remove `id="contact"` attribute (Consulting owns `#contact`).

- [ ] **Step 3: llms/ai txt files:** update "Last updated" → July 2026; rewrite the bio opening as declarative third person leading with the new positioning ("Gavin Purcell is a Fractional AI Creative Officer: an Emmy-winning former Tonight Show showrunner who advises media, entertainment, and creative teams on AI…"); REMOVE the "100,000+ subscribers" claim (unverified) or replace with verifiable facts (2x/week show, Emmy, a16z-backed startup). Mention the three named offers.

- [ ] **Step 4: Verify + commit**

`npm run build`; `grep -c 'id="contact"' src/components/*.jsx` → 1 (Consulting only); `grep -n "100,000" public/*.txt` → no matches. Commit: `fix: new positioning in meta/schema/llms.txt, canonical consistency, remove duplicate contact id`

---

### Task 8: Prerender pipeline (the big one)

**Files:**
- Create: `scripts/prerender.mjs`
- Modify: `package.json` (scripts: `"build": "vite build && node scripts/prerender.mjs"`, devDep puppeteer)
- Modify: `src/services/wordpress.js` (remove fake 500ms delay; export `MOCK_POSTS` slugs or a `getAllSlugs()` used by the prerender route list — simplest: prerender script imports nothing, hardcodes route discovery by reading `src/services/wordpress.js` is fragile; instead fetch `/sitemap.xml`? Cleanest: `scripts/prerender.mjs` reads `public/sitemap.xml` and prerenders every `<loc>` path that isn't a `.txt` file.)

**Interfaces:**
- Produces: `dist/index.html` (hydrated), `dist/blog/index.html`, `dist/blog/<slug>/index.html` for each post. Each file contains rendered body HTML + per-route Helmet meta.

- [ ] **Step 1:** `npm i -D puppeteer`

- [ ] **Step 2: Remove the artificial delay** in `src/services/wordpress.js` (the `setTimeout`/Promise delay around mock returns): return data immediately.

- [ ] **Step 3: Create `scripts/prerender.mjs`:**

```js
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = new URL('../dist', import.meta.url).pathname;
const PORT = 4173;

// Routes = sitemap <loc> paths, minus .txt/.xml entries
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/gavinpurcell\.com([^<]*)<\/loc>/g)]
  .map((m) => m[1] || '/')
  .filter((p) => !/\.(txt|xml|html)$/.test(p));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };

// Static server with SPA fallback (mirrors vercel.json rewrite)
const server = createServer((req, res) => {
  const url = req.url.split('?')[0];
  let file = join(DIST, url);
  if (!existsSync(file) || url === '/') file = join(DIST, 'index.html');
  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(readFileSync(join(DIST, 'index.html')));
  }
});

await new Promise((r) => server.listen(PORT, r));
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
// Never let the prerender call live APIs
await page.setRequestInterception(true);
page.on('request', (req) => {
  req.url().includes('/api/') ? req.abort() : req.continue();
});

for (const route of routes) {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('main', { timeout: 10000 });
  const html = await page.content();
  const outDir = route === '/' ? DIST : join(DIST, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), '<!doctype html>\n' + html.replace(/^<!doctype html>/i, ''));
  console.log(`prerendered ${route} (${(html.length / 1024).toFixed(0)}KB)`);
}

await browser.close();
server.close();
```

- [ ] **Step 4: Wire into build:** `package.json` scripts → `"build": "vite build && node scripts/prerender.mjs"`, keep `"build:spa": "vite build"` as escape hatch.

- [ ] **Step 5: Verify (the whole point):**

```bash
npm run build
grep -c "showrunner" dist/index.html            # ≥1: hero copy in static HTML
grep -o "<title>[^<]*</title>" dist/blog/claude-mythos-is-nearly-here/index.html  # post-specific title
grep -c "BlogPosting" dist/blog/claude-mythos-is-nearly-here/index.html           # JSON-LD baked in
```

All three must pass. Also `npx vite preview` + check hydration works (click nav, no console errors).

- [ ] **Step 6: Commit**

`git add -A && git commit -m "feat: puppeteer prerender pipeline, every route ships real HTML to crawlers"`

---

### Task 9: Final verification sweep

- [ ] `npm run build` clean.
- [ ] `npm run lint` clean (or no new errors vs main).
- [ ] Serve `dist/` (`npx vite preview`), walk all routes, check console.
- [ ] Confirm no route serves the empty `<div id="root"></div>` shell.
- [ ] `git log --oneline main..site-refresh` reads as a coherent story.
- [ ] Screenshot hero + consulting at 1440px and 375px for Gavin's review.
- [ ] Do NOT push. Report to Gavin with the placeholder list (Formspree ID, channel ID verification, talk titles to approve, copy review).
