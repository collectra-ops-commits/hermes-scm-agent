/* ============================================================
   THE WAREHOUSE — MASTER SHARED SCRIPT
   collectra-ops-commits/hermes-scm-agent
   ============================================================ */

'use strict';

// ── CLOCK ────────────────────────────────────────────────
function initClock() {
  const el = document.getElementById('topbar-clock');
  if (!el) return;
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const d = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    el.textContent = `${d}  ${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────
function initNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

// ── SECTOR BREADCRUMB ────────────────────────────────────
function setBreadcrumb(sector) {
  const el = document.querySelector('.topbar-breadcrumb span');
  if (el) el.textContent = sector;
}

// ── MOCK DATA LOADER ─────────────────────────────────────
async function loadMock(filename) {
  try {
    const res = await fetch(`data/${filename}`);
    if (!res.ok) throw new Error(`Mock data not found: ${filename}`);
    return await res.json();
  } catch (err) {
    console.warn('[WAREHOUSE]', err.message);
    return null;
  }
}

// ── TOAST NOTIFICATION ───────────────────────────────────
function toast(message, type = 'info') {
  const colors = {
    info:    'var(--text-muted)',
    success: 'var(--accent-neon)',
    warn:    'var(--accent-warm)',
    error:   'var(--accent-red)'
  };
  const t = document.createElement('div');
  t.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 9999;
    background: var(--bg-panel); border: 1px solid ${colors[type]};
    color: ${colors[type]}; font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 10px 16px; opacity: 0; transition: opacity 0.2s ease;
  `;
  t.textContent = `// ${message}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

// ── FORMAT CURRENCY ──────────────────────────────────────
function formatCurrency(value, currency = 'BDT') {
  const formats = {
    BDT: { locale: 'en-BD', symbol: '৳' },
    USD: { locale: 'en-US', symbol: '$' },
    EUR: { locale: 'de-DE', symbol: '€' }
  };
  const f = formats[currency] || formats.BDT;
  return `${f.symbol}${Number(value).toLocaleString(f.locale)}`;
}

// ── ELAPSED TIME ─────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNav();
});
