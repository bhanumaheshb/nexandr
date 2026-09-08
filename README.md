# NEXANDR — Corporate Website

**Building What’s Next.** — a static, multi-page marketing site for NEXANDR
(AI · Networks · Data · Robotics).

## Stack

No build step. Plain HTML + Tailwind (Play CDN) + Iconify, matching the
architecture of the original template.

| Concern | Where |
|---|---|
| Design tokens (colours, fonts, shadows, motion) | `assets/js/tailwind.config.js` |
| Base styles, buttons, cards, forms, motion | `assets/css/nexandr.css` |
| Shared components (navbar, footer, cards, CTA) | `assets/js/components.js` |
| Behaviour (sticky nav, mobile menu, reveals, form) | `assets/js/main.js` |
| Content | `assets/js/data/*.js` |

## Run locally

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. (Any static server works; the site also
opens directly from the filesystem.)

## Pages

`index.html` · `solutions.html` · `products.html` · `technology.html` ·
`about.html` · `careers.html` · `contact.html` ·
`product-nexandr-{ai,agents,vision,data}.html`

## Editing content

Almost nothing requires touching markup:

- **Navigation, contact emails, footer, home capabilities** → `assets/js/data/site.js`
- **Products** (index cards *and* detail pages) → `assets/js/data/products.js`
- **Solution categories** → `assets/js/data/solutions.js`
- **Technology ecosystem + principles** → `assets/js/data/technology.js`
- **Careers roles / hiring process** → inline `<script>` at the bottom of `careers.html`
- **About story sections / values** → inline `<script>` at the bottom of `about.html`

### Adding a product

1. Append an entry to `window.NEXANDR_PRODUCTS` in `assets/js/data/products.js`.
2. Copy `product-nexandr-ai.html` → `product-<slug>.html`; update `<title>`,
   the meta description, the canonical/OG URLs, and `window.PRODUCT_SLUG`.
3. Add the page to `sitemap.xml` and to `footer.columns` in `site.js`.

### Replacing the logo

The wordmark is inline SVG (theme-aware, uses `currentColor`) in
`components.js` and `assets/img/nexandr-wordmark.svg`. To use a supplied file
instead, drop it in `assets/img/` and set in `site.js`:

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

- `contact.html` submits via `mailto:` (no backend). Point `#contact-form` at a
  form endpoint or API when one exists.
- Replace `https://nexandr.com/` in canonical/OG tags and `sitemap.xml` if the
  domain differs.
- Swap the Tailwind Play CDN for a compiled stylesheet if you want the smallest
  possible payload: `npx tailwindcss -i input.css -o assets/css/tw.css --minify`
  using `assets/js/tailwind.config.js` as the theme source.
