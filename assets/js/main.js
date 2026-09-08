/* ==========================================================================
   NEXANDR — behaviour: sticky nav state, mobile menu, scroll reveal, forms.
   ========================================================================== */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------- Sticky navbar -- */

  function initNav() {
    const shell = document.querySelector('[data-nav]');
    if (!shell) return;

    const onScroll = () => shell.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = document.getElementById('nav-toggle');
    const panel = document.getElementById('nav-panel');
    if (!toggle || !panel) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      document.documentElement.style.overflow = open ? 'hidden' : '';
      toggle.querySelector('[data-nav-open]').classList.toggle('hidden', open);
      toggle.querySelector('[data-nav-close]').classList.toggle('hidden', !open);
      toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    };

    toggle.addEventListener('click', () =>
      setOpen(toggle.getAttribute('aria-expanded') !== 'true')
    );
    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  /* -------------------------------------------------------- Scroll reveal -- */

  let observer = null;

  function initReveal() {
    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    scan();
  }

  function scan() {
    if (!observer) return;
    document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => observer.observe(el));
  }

  /* Pick up nodes rendered by page scripts after first paint. */
  function watchDom() {
    if (!('MutationObserver' in window)) return;
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* --------------------------------------------------------------- Forms -- */

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const d = new FormData(form);
      const get = (k) => (d.get(k) || '').toString().trim();

      const body = [
        `Name: ${get('name')}`,
        `Company: ${get('company')}`,
        `Email: ${get('email')}`,
        `Phone: ${get('phone')}`,
        `Project / Requirement: ${get('project')}`,
        '',
        get('message'),
      ].join('\n');

      const to = form.dataset.to || 'hello@nexandr.com';
      const subject = `New enquiry — ${get('company') || get('name') || 'NEXANDR'}`;
      window.location.href =
        `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (status) {
        status.hidden = false;
        status.focus();
      }
    });
  }

  /* ---------------------------------------------------------------- Boot -- */

  function boot() {
    initNav();
    initReveal();
    watchDom();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.NX = window.NX || {};
  window.NX.scan = scan;
})();
