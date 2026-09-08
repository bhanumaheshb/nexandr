/* ==========================================================================
   NEXANDR — shared UI components.
   Every page mounts these into placeholder elements:
     <div data-nx="navbar"></div> ... <div data-nx="footer"></div>
   Card renderers are exposed on window.NX for page scripts to use.
   ========================================================================== */

(function () {
  'use strict';

  const SITE = window.NEXANDR_SITE;
  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );

  const icon = (name, cls = 'w-5 h-5') =>
    `<span class="iconify ${cls}" data-icon="${esc(name)}" aria-hidden="true"></span>`;

  const arrow = (cls = 'w-4 h-4 btn-ico') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
       <path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  /* ---------------------------------------------------------------- Logo -- */

  const wordmark = (cls = 'h-[22px]') => {
    if (SITE.logo.mode === 'image') {
      return `<img src="${esc(SITE.logo.src)}" alt="${esc(SITE.logo.alt)}" class="${cls} w-auto"/>`;
    }
    return `
      <svg class="${cls} w-auto" viewBox="0 0 640 96" role="img" aria-label="NEXANDR">
        <title>NEXANDR</title>
        <defs>
          <linearGradient id="nxLogoX" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#C4F04A"/>
            <stop offset="55%" stop-color="#7ED321"/>
            <stop offset="100%" stop-color="#0F7A56"/>
          </linearGradient>
        </defs>
        <g fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="miter">
          <path d="M10 86V10l62 76V10"/>
          <path d="M106 10h52M106 48h44M106 86h52"/>
          <path d="M288 86l31-76 31 76"/>
          <path d="M384 86V10l62 76V10"/>
          <path d="M480 86V10h26q32 0 32 38t-32 38z"/>
          <path d="M572 86V10h32q26 0 26 22t-26 22h-32m32 0l26 32"/>
        </g>
        <path d="M192 10l62 76M254 10l-62 76" stroke="url(#nxLogoX)" stroke-width="9" fill="none"/>
        <rect x="106" y="4" width="26" height="8" fill="#7ED321"/>
      </svg>`;
  };

  /* ------------------------------------------------------------- Navbar -- */

  function navbar(active) {
    const links = SITE.nav
      .map(
        (n) =>
          `<a href="${esc(n.href)}" class="nav-link"${
            n.key === active ? ' aria-current="page"' : ''
          }>${esc(n.label)}</a>`
      )
      .join('');

    const mobileLinks = SITE.nav
      .map(
        (n, i) =>
          `<a href="${esc(n.href)}" class="flex items-center justify-between border-b border-line/80 py-5 text-2xl display text-ink/90 hover:text-emerald transition-colors" style="--d:${
            60 + i * 45
          }ms">
             <span>${esc(n.label)}</span>
             <span class="eyebrow text-ink/25">0${i + 1}</span>
           </a>`
      )
      .join('');

    return `
      <header class="nav-shell fixed inset-x-0 top-0 z-50" data-nav>
        <div class="mx-auto flex h-[68px] max-w-content items-center justify-between px-5 sm:px-8">
          <a href="index.html" class="flex items-center text-ink" aria-label="NEXANDR — home">
            ${wordmark('h-[19px] sm:h-[21px]')}
          </a>

          <nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">${links}</nav>

          <div class="flex items-center gap-3">
            <a href="${esc(SITE.cta.href)}" class="btn btn-primary btn-sm hidden sm:inline-flex">
              ${esc(SITE.cta.label)} ${arrow('w-[15px] h-[15px] btn-ico')}
            </a>
            <button type="button" id="nav-toggle" aria-controls="nav-panel" aria-expanded="false"
              class="lg:hidden -mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink/70 transition-colors hover:text-ink">
              <span class="sr-only">Open menu</span>
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" data-nav-open/>
                <path d="M6 6l12 12M18 6L6 18" data-nav-close class="hidden"/>
              </svg>
            </button>
          </div>
        </div>

        <div id="nav-panel" hidden
          class="lg:hidden fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto border-t border-line bg-cream-light px-5 pb-12 pt-2 sm:px-8">
          <nav class="flex flex-col" aria-label="Mobile">${mobileLinks}</nav>
          <a href="${esc(SITE.cta.href)}" class="btn btn-primary mt-8 w-full justify-center">
            ${esc(SITE.cta.label)} ${arrow()}
          </a>
          <p class="eyebrow mt-10 text-ink/35">${esc(SITE.tagline)}</p>
        </div>
      </header>`;
  }

  /* ------------------------------------------------------------- Footer -- */

  function footer() {
    const columns = SITE.footer.columns
      .map(
        (col) => `
        <div>
          <h2 class="eyebrow text-lime/80">${esc(col.title)}</h2>
          <ul class="mt-5 space-y-3">
            ${col.links
              .map(
                (l) =>
                  `<li><a href="${esc(l.href)}" class="text-sm text-cream/55 transition-colors hover:text-cream">${esc(
                    l.label
                  )}</a></li>`
              )
              .join('')}
          </ul>
        </div>`
      )
      .join('');

    const social = SITE.footer.social
      .map(
        (s) =>
          `<a href="${esc(s.href)}" aria-label="${esc(s.label)}"
             class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cream/12 text-cream/50 transition-colors hover:border-lime/50 hover:text-lime">
             ${icon(s.icon, 'w-[17px] h-[17px]')}
           </a>`
      )
      .join('');

    return `
      <footer class="relative overflow-hidden bg-forest-deep text-cream">
        <div class="grid-field-dark mask-fade-b pointer-events-none absolute inset-0 opacity-70" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald/20 blur-[130px]" aria-hidden="true"></div>

        <div class="relative mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-24">
          <div class="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div class="lg:col-span-5">
              <div class="text-cream">${wordmark('h-[22px]')}</div>
              <p class="mt-7 max-w-sm text-sm leading-relaxed text-cream/55">${esc(SITE.footer.statement)}</p>
              <div class="mt-8 flex gap-2.5">${social}</div>
            </div>
            <div class="grid gap-10 sm:grid-cols-3 lg:col-span-7">${columns}</div>
          </div>

          <div class="rule-dark mt-16 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p class="eyebrow text-cream/30">© <span data-year>2026</span> ${esc(SITE.name)} · ${esc(SITE.tagline)}</p>
            <div class="flex flex-wrap items-center gap-x-7 gap-y-2">
              <a href="mailto:${esc(SITE.contact.general)}" class="text-sm text-cream/50 transition-colors hover:text-cream">${esc(SITE.contact.general)}</a>
              <a href="mailto:${esc(SITE.contact.careers)}" class="text-sm text-cream/50 transition-colors hover:text-cream">${esc(SITE.contact.careers)}</a>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* ------------------------------------------------------ Section header -- */

  function sectionHeader({ eyebrow: eb, title, text, align = 'left', tone = 'light', action }) {
    const muted = tone === 'dark' ? 'text-cream/60' : 'text-ink/60';
    const head = tone === 'dark' ? 'text-cream' : 'text-ink';
    const ebc = tone === 'dark' ? 'text-lime/80' : 'text-emerald';
    const alignCls = align === 'center' ? 'text-center items-center mx-auto' : '';
    return `
      <div class="reveal flex flex-col gap-5 ${alignCls} ${action ? 'md:flex-row md:items-end md:justify-between' : ''}">
        <div class="${align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}">
          ${eb ? `<p class="eyebrow ${ebc}">${esc(eb)}</p>` : ''}
          <h2 class="display mt-4 text-[clamp(1.9rem,4vw,3rem)] ${head}">${title}</h2>
          ${text ? `<p class="mt-5 text-[15px] leading-relaxed ${muted} measure">${text}</p>` : ''}
        </div>
        ${action || ''}
      </div>`;
  }

  /* --------------------------------------------------------------- Cards -- */

  function capabilityCard(c, i) {
    return `
      <article class="card card-hover card-accent reveal group p-7 sm:p-8" style="--d:${i * 90}ms">
        <div class="flex items-start justify-between">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-cream text-emerald transition-colors group-hover:border-emerald/40">
            ${icon(c.icon, 'w-[21px] h-[21px]')}
          </span>
          <span class="eyebrow text-ink/20">0${i + 1}</span>
        </div>
        <h3 class="display mt-7 text-2xl text-ink">${esc(c.name)}</h3>
        <p class="mt-3 text-[14.5px] leading-relaxed text-ink/60">${esc(c.description)}</p>
        <ul class="rule mt-6 flex flex-wrap gap-x-4 gap-y-1.5 pt-5">
          ${c.points.map((p) => `<li class="text-xs text-ink/45">${esc(p)}</li>`).join('')}
        </ul>
      </article>`;
  }

  function productCard(p, i) {
    return `
      <article class="card card-hover reveal group flex flex-col p-7 sm:p-8" style="--d:${i * 80}ms">
        <div class="flex items-start justify-between gap-4">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-cream text-emerald transition-colors group-hover:border-emerald/40">
            ${icon(p.icon, 'w-[21px] h-[21px]')}
          </span>
          <span class="chip">${statusDot(p.status)}${esc(p.status)}</span>
        </div>
        <p class="eyebrow mt-7 text-ink/35">${esc(p.category)}</p>
        <h3 class="display mt-2.5 text-[1.6rem] text-ink">${esc(p.name)}</h3>
        <p class="mt-3 text-[14.5px] leading-relaxed text-ink/60">${esc(p.short)}</p>
        <p class="mt-4 text-[13.5px] leading-relaxed text-ink/45">${esc(p.summary)}</p>
        <div class="rule mt-7 flex-1"></div>
        <a href="product-${esc(p.slug)}.html" class="link-arrow mt-5">
          Learn more ${arrow('w-[15px] h-[15px]')}
        </a>
      </article>`;
  }

  function statusDot(status) {
    const map = {
      'Live': 'bg-emerald-bright',
      'Early Access': 'bg-lime',
      'In Development': 'bg-emerald',
      'Concept': 'bg-ink/25',
    };
    return `<span class="inline-block h-1.5 w-1.5 rounded-full ${map[status] || 'bg-ink/25'}"></span>`;
  }

  function techCard(layer, i) {
    return `
      <article class="card card-dark card-hover reveal p-7 sm:p-8" style="--d:${i * 80}ms" id="${esc(layer.id)}">
        <div class="flex items-center justify-between">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-cream/12 bg-cream/[0.04] text-lime">
            ${icon(layer.icon, 'w-[21px] h-[21px]')}
          </span>
          <span class="eyebrow text-cream/25">${esc(layer.role)}</span>
        </div>
        <h3 class="display mt-7 text-2xl text-cream">${esc(layer.name)}</h3>
        <p class="mt-3 text-[14px] leading-relaxed text-cream/55">${esc(layer.text)}</p>
        <ul class="rule-dark mt-6 space-y-3 pt-6">
          ${layer.items
            .map(
              (it) => `
            <li class="flex items-baseline justify-between gap-5">
              <span class="text-[14px] font-medium text-cream/90">${esc(it.name)}</span>
              <span class="text-right text-[12.5px] text-cream/40">${esc(it.note)}</span>
            </li>`
            )
            .join('')}
        </ul>
      </article>`;
  }

  /* ------------------------------------------------------------ CTA band -- */

  function ctaBand({ eyebrow: eb, title, text, primary, secondary }) {
    return `
      <section class="relative overflow-hidden bg-forest text-cream">
        <div class="grid-field-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -right-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-lime/10 blur-[120px]" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-content px-5 py-24 sm:px-8 sm:py-28">
          <div class="reveal max-w-3xl">
            ${eb ? `<p class="eyebrow text-lime/80">${esc(eb)}</p>` : ''}
            <h2 class="display mt-5 text-[clamp(2.1rem,5vw,3.6rem)] text-cream">${title}</h2>
            ${text ? `<p class="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/60">${text}</p>` : ''}
            <div class="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="${esc(primary.href)}" class="btn btn-lime justify-center">${esc(primary.label)} ${arrow()}</a>
              ${secondary ? `<a href="${esc(secondary.href)}" class="btn btn-onDark justify-center">${esc(secondary.label)}</a>` : ''}
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ------------------------------------------------------------- Mounting -- */

  function mount() {
    const active = document.body.dataset.page || '';
    document.querySelectorAll('[data-nx="navbar"]').forEach((el) => {
      el.outerHTML = navbar(active);
    });
    document.querySelectorAll('[data-nx="footer"]').forEach((el) => {
      el.outerHTML = footer();
    });
    document.querySelectorAll('[data-nx="cta"]').forEach((el) => {
      const cfg = JSON.parse(el.getAttribute('data-cta') || '{}');
      el.outerHTML = ctaBand(cfg);
    });
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  window.NX = {
    esc, icon, arrow, wordmark, sectionHeader,
    capabilityCard, productCard, techCard, ctaBand, statusDot, mount,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
