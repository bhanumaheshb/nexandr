# NEXANDR — Corporate Website

**Building What’s Next.** — the NEXANDR website (AI · Networks · Data · Robotics),
served by a small Express app with a Claude-powered chat assistant.

## Stack

Node + Express serving static pages from `public/`. The pages themselves are
plain HTML + Tailwind (Play CDN) + Iconify — no front-end build step.

| Concern | Where |
|---|---|
| Server, static hosting, chat API | `server.js` |
| Chat assistant instructions | `system-prompt.js` |
| Design tokens (colours, fonts, motion) | `public/assets/js/tailwind.config.js` |
| Base styles, buttons, cards, forms, chat widget | `public/assets/css/nexandr.css` |
| Shared components (navbar, footer, cards, CTA) | `public/assets/js/components.js` |
| Behaviour (sticky nav, mobile menu, reveals, form) | `public/assets/js/main.js` |
| Chat widget | `public/assets/js/chat.js` |
| Content | `public/assets/js/data/*.js` |

## Run locally

```bash
npm install
```

```bash
ANTHROPIC_API_KEY=sk-ant-... npm start
```

Then open <http://localhost:3000>. Without the key the site serves normally and
the chat widget hides itself — nothing else breaks.

## Deploying to Hostinger (Deploy Web App)

| Setting | Value |
|---|---|
| Repository | `https://github.com/bhanumaheshb/nexandr` |
| Branch | `main` |
| Node version | 20 or newer |
| Install command | `npm install` |
| Build command | *(none)* |
| Start command | `npm start` |
| Environment variable | `ANTHROPIC_API_KEY` = your key |

The app reads `PORT` from the environment, so the platform can assign it.
Set `ANTHROPIC_API_KEY` in the panel's environment-variables section — never in
the repository.

## The chat assistant

`POST /api/chat` takes `{ messages: [{ role, content }] }` and streams the reply
back as Server-Sent Events. The API key stays on the server; the browser never
sees it.

- **Model** — `claude-opus-5`, at `effort: "low"` (short factual answers).
  Override with the `CHAT_MODEL` environment variable; `claude-sonnet-5` or
  `claude-haiku-4-5` cost less per token if traffic grows.
- **What it knows** — everything in `system-prompt.js`, and nothing else. It is
  instructed to decline rather than invent pricing, timelines, client names or
  capabilities. Edit that file to change its knowledge or tone.
- **Guard rails** — 2000 characters per message, last 12 turns kept, 25 requests
  per IP per 10 minutes (in-memory, per process). Tighten in `server.js`.
- **`GET /api/health`** — reports `{ ok, chat, model }`. The widget calls this on
  load and stays hidden when `chat` is false.

## Pages

`index.html` · `solutions.html` · `products.html` · `technology.html` ·
`about.html` · `careers.html` · `contact.html` ·
`product-nexandr-{ai,agents,vision,data}.html` — all under `public/`.

Extensionless URLs work too: `/about` serves `about.html`.

## Editing content

Almost nothing requires touching markup:

- **Navigation, contact emails, footer, home capabilities** → `public/assets/js/data/site.js`
- **Products** (index cards *and* detail pages) → `public/assets/js/data/products.js`
- **Solution categories** → `public/assets/js/data/solutions.js`
- **Technology ecosystem + principles** → `public/assets/js/data/technology.js`
- **Careers roles / hiring process** → inline `<script>` at the bottom of `careers.html`
- **About story sections / values** → inline `<script>` at the bottom of `about.html`
- **Chat assistant** → `system-prompt.js`

### Adding a product

1. Append an entry to `window.NEXANDR_PRODUCTS` in `public/assets/js/data/products.js`.
2. Copy `public/product-nexandr-ai.html` → `public/product-<slug>.html`; update
   `<title>`, the meta description, the canonical/OG URLs, and `window.PRODUCT_SLUG`.
3. Add the page to `public/sitemap.xml` and to `footer.columns` in `site.js`.
4. Mention it in `system-prompt.js` so the assistant knows about it.

### Replacing the logo

The wordmark is inline SVG (theme-aware, uses `currentColor`) in
`components.js` and `public/assets/img/nexandr-wordmark.svg`. To use a supplied
file instead, drop it in `public/assets/img/` and set in `site.js`:

```js
logo: { mode: 'image', src: 'assets/img/your-logo.svg', alt: 'NEXANDR' }
```

## Design system

- **Colours** — forest `#0B2E22`, emerald `#0F7A56` / `#16A473`, lime `#C4F04A`,
  cream `#F5F2E9` / `#FBFAF5`, ink `#080B09`. Cream is the primary surface;
  green is used for emphasis, dark forest for contrast bands.
- **Type** — Inter Tight (display), Inter (body), JetBrains Mono (labels).
- **Motion** — scroll reveals, hover lifts, slow background drift. All motion is
  disabled under `prefers-reduced-motion`.

## Before going live

- The contact form still submits via `mailto:` (no backend). Point `#contact-form`
  at a real endpoint when you have one.
- Replace `https://nexandr.com/` in the canonical/OG tags and `public/sitemap.xml`
  if the domain differs.
- The rate limiter is per-process and in memory. Behind multiple instances or a
  CDN, move it to shared storage or an edge rule.
