/* ==========================================================================
   NEXANDR — website chat assistant.

   Talks to POST /api/chat, which streams Server-Sent Events from the
   Node server. The API key lives only on the server.

   If /api/health reports that chat is not configured (for example when the
   pages are opened as static files), the widget stays hidden.
   ========================================================================== */

(function () {
  'use strict';

  const SUGGESTIONS = [
    'What does NEXANDR build?',
    'Tell me about NEXANDR Agents',
    'Can you help with our AI project?',
    'What roles are open?',
  ];

  const GREETING =
    'Hello — I’m the NEXANDR assistant. Ask me about our products, the engineering work we take on, our stack, or how to get in touch.';

  const state = { open: false, busy: false, history: [] };
  let els = {};

  /* ------------------------------------------------------------- Helpers -- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );

  /* Deliberately tiny formatter: bold, inline code, bullets, paragraphs. */
  function format(text) {
    const inline = (s) =>
      esc(s)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

    return text
      .trim()
      .split(/\n{2,}/)
      .map((block) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return `<ul>${lines
            .map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ''))}</li>`)
            .join('')}</ul>`;
        }
        return `<p>${lines.map(inline).join('<br>')}</p>`;
      })
      .join('');
  }

  function scrollToEnd() {
    els.log.scrollTop = els.log.scrollHeight;
  }

  function addMessage(role, html, extraClass) {
    const el = document.createElement('div');
    el.className = `nx-msg nx-msg-${role}${extraClass ? ' ' + extraClass : ''}`;
    el.innerHTML = html;
    els.log.appendChild(el);
    scrollToEnd();
    return el;
  }

  /* --------------------------------------------------------------- Build -- */

  function build() {
    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'nx-chat-launcher';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML =
      '<span class="dot" aria-hidden="true"></span><span>Ask NEXANDR</span>';

    const panel = document.createElement('section');
    panel.className = 'nx-chat-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with the NEXANDR assistant');
    panel.innerHTML = `
      <header class="nx-chat-head">
        <div>
          <h2>NEXANDR Assistant</h2>
          <p>Answers about our products and engineering</p>
        </div>
        <button type="button" class="nx-chat-close" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div class="nx-chat-log" role="log" aria-live="polite" aria-atomic="false"></div>

      <div class="nx-chat-suggestions"></div>

      <form class="nx-chat-form">
        <label class="sr-only" for="nx-chat-input">Your message</label>
        <textarea id="nx-chat-input" class="nx-chat-input" rows="1"
          placeholder="Ask about products, solutions or careers…" maxlength="2000"></textarea>
        <button type="submit" class="nx-chat-send" aria-label="Send message">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </form>
      <p class="nx-chat-foot">AI assistant — it can be wrong. For anything binding, email hello@nexandr.com.</p>`;

    document.body.append(launcher, panel);

    els = {
      launcher,
      panel,
      log: panel.querySelector('.nx-chat-log'),
      suggestions: panel.querySelector('.nx-chat-suggestions'),
      form: panel.querySelector('.nx-chat-form'),
      input: panel.querySelector('.nx-chat-input'),
      send: panel.querySelector('.nx-chat-send'),
      close: panel.querySelector('.nx-chat-close'),
    };

    addMessage('bot', format(GREETING));
    renderSuggestions();

    launcher.addEventListener('click', () => toggle(true));
    els.close.addEventListener('click', () => toggle(false));
    els.form.addEventListener('submit', onSubmit);

    els.input.addEventListener('input', () => {
      els.input.style.height = 'auto';
      els.input.style.height = Math.min(els.input.scrollHeight, 120) + 'px';
    });
    els.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        els.form.requestSubmit();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.open) toggle(false);
    });
  }

  function renderSuggestions() {
    els.suggestions.innerHTML = SUGGESTIONS.map(
      (s) => `<button type="button" class="nx-suggestion">${esc(s)}</button>`
    ).join('');
    els.suggestions.querySelectorAll('.nx-suggestion').forEach((btn) => {
      btn.addEventListener('click', () => {
        els.input.value = btn.textContent;
        els.form.requestSubmit();
      });
    });
  }

  function toggle(open) {
    state.open = open;
    els.panel.hidden = !open;
    els.launcher.hidden = open;
    els.launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      els.input.focus();
      scrollToEnd();
    } else {
      els.launcher.focus();
    }
  }

  function setBusy(busy) {
    state.busy = busy;
    els.send.disabled = busy;
    els.input.disabled = busy;
  }

  /* ---------------------------------------------------------- Conversation -- */

  async function onSubmit(e) {
    e.preventDefault();
    if (state.busy) return;

    const text = els.input.value.trim();
    if (!text) return;

    els.input.value = '';
    els.input.style.height = 'auto';
    els.suggestions.innerHTML = '';

    addMessage('user', format(text));
    state.history.push({ role: 'user', content: text });
    setBusy(true);

    const bubble = addMessage(
      'bot',
      '<span class="nx-typing"><span></span><span></span><span></span></span>'
    );

    try {
      await stream(bubble);
    } catch (err) {
      bubble.classList.add('nx-msg-error');
      bubble.innerHTML = format(
        'I could not reach the assistant just now. Please try again, or email hello@nexandr.com.'
      );
    } finally {
      setBusy(false);
      els.input.focus();
    }
  }

  async function stream(bubble) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: state.history.slice(-12) }),
    });

    if (!res.ok || !res.body) {
      const info = await res.json().catch(() => ({}));
      throw new Error(info.error || 'Request failed');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let answer = '';

    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split('\n\n');
      buffer = frames.pop() || '';

      for (const frame of frames) {
        const evLine = frame.match(/^event: (.+)$/m);
        const dataLine = frame.match(/^data: (.+)$/m);
        if (!evLine || !dataLine) continue;

        let payload;
        try {
          payload = JSON.parse(dataLine[1]);
        } catch {
          continue;
        }

        if (evLine[1] === 'delta') {
          answer += payload.text;
          bubble.innerHTML = format(answer);
          scrollToEnd();
        } else if (evLine[1] === 'error') {
          bubble.classList.add('nx-msg-error');
          bubble.innerHTML = format(payload.message);
          answer = '';
        }
      }
    }

    if (answer) state.history.push({ role: 'assistant', content: answer });
  }

  /* ----------------------------------------------------------------- Boot -- */

  async function boot() {
    // Only show the widget when the server can actually answer.
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      if (!res.ok) return;
      const health = await res.json();
      if (!health.chat) return;
    } catch {
      return;
    }
    build();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
