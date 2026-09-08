/* ==========================================================================
   NEXANDR — Express server.

   Serves the static site from ./public and exposes one API route:
     POST /api/chat   Streams a reply from Claude over Server-Sent Events.

   The Anthropic API key is read from the environment and never reaches the
   browser. Run with: ANTHROPIC_API_KEY=... npm start
   ========================================================================== */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './system-prompt.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(HERE, 'public');

const PORT = process.env.PORT || 3000;
const MODEL = process.env.CHAT_MODEL || 'claude-opus-5';

/* Guard rails on what a browser may send. */
const MAX_MESSAGE_CHARS = 2000;   // single message
const MAX_HISTORY = 12;           // turns kept from the conversation
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 25 };

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));

/* ------------------------------------------------------------ Rate limit -- */
/* In-memory and per-process: enough to stop casual abuse of the API key.
   Put a real limiter (or a CDN rule) in front if traffic grows. */

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

/* Drop expired buckets so the map cannot grow without bound. */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}, RATE_LIMIT.windowMs).unref();

/* --------------------------------------------------------------- Client -- */

const apiKey = process.env.ANTHROPIC_API_KEY;
const client = apiKey ? new Anthropic({ apiKey }) : null;

if (!client) {
  console.warn(
    '[nexandr] ANTHROPIC_API_KEY is not set — the site will serve normally, ' +
      'but /api/chat will return 503 and the chat widget will hide itself.'
  );
}

/* ----------------------------------------------------------- Validation -- */

function parseMessages(body) {
  if (!body || !Array.isArray(body.messages)) return null;

  const cleaned = [];
  for (const m of body.messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return null;
    if (typeof m.content !== 'string') return null;

    const content = m.content.trim();
    if (!content) continue;
    cleaned.push({ role: m.role, content: content.slice(0, MAX_MESSAGE_CHARS) });
  }

  // Must be a real conversation ending in a user turn.
  if (!cleaned.length) return null;
  if (cleaned[cleaned.length - 1].role !== 'user') return null;

  return cleaned.slice(-MAX_HISTORY);
}

/* ---------------------------------------------------------------- Routes -- */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, chat: Boolean(client), model: client ? MODEL : null });
});

app.post('/api/chat', async (req, res) => {
  if (!client) {
    return res.status(503).json({ error: 'Chat is not configured on this server.' });
  }
  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many messages. Please try again shortly.' });
  }

  const messages = parseMessages(req.body);
  if (!messages) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  res.set({
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders?.();

  const send = (event, data) =>
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  let sentText = false;
  let active = null;

  // Stop generating if the visitor closes the tab or navigates away.
  // Note: this must listen on `res`, not `req` — on current Node versions
  // `req` emits 'close' as soon as the request body has been read.
  res.on('close', () => {
    if (!res.writableEnded) active?.abort();
  });

  async function run(useFallback) {
    active = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages,
      // Low effort: these are short factual answers, not hard reasoning.
      output_config: { effort: 'low' },
      // If a safety classifier declines, the API retries on a fallback model
      // inside the same call rather than returning nothing.
      ...(useFallback
        ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }
        : {}),
    });

    for await (const event of active) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        sentText = true;
        send('delta', { text: event.delta.text });
      }
    }
    return active.finalMessage();
  }

  try {
    let final;
    try {
      final = await run(true);
    } catch (err) {
      // If this deployment cannot use the refusal-fallback beta, drop it and
      // retry once — nothing has been streamed yet, so the retry is invisible.
      if (!sentText && err?.status === 400) {
        console.warn('[nexandr] refusal fallback rejected, retrying without it');
        final = await run(false);
      } else {
        throw err;
      }
    }

    if (final.stop_reason === 'refusal') {
      send('error', { message: 'I can’t help with that one. Ask me about NEXANDR instead.' });
    }
    send('done', { stop_reason: final.stop_reason });
  } catch (err) {
    console.error('[nexandr] chat error:', err?.message || err);
    if (!res.writableEnded) {
      send('error', { message: 'Something went wrong reaching the assistant. Please try again.' });
    }
  } finally {
    if (!res.writableEnded) res.end();
  }
});

/* ---------------------------------------------------------------- Static -- */

app.use(
  express.static(PUBLIC_DIR, {
    extensions: ['html'],          // /about resolves to /about.html
    maxAge: '1h',
    setHeaders(res, filePath) {
      // Fingerprint-free assets: revalidate often, but let HTML stay fresh.
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    },
  })
);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[nexandr] listening on http://localhost:${PORT}`);
});
