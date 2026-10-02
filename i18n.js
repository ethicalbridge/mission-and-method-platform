// Method into Impact · i18n engine.
// Reads language preference from localStorage, applies translations to any
// element carrying a `data-i18n` attribute, and wires up the EN/ES switcher.

import { translations } from './translations.js';

const STORAGE_KEY = 'mim-lang';
const DEFAULT_LANG = 'en';
const SUPPORTED = ['en', 'es'];

function getLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}
  // Guess from browser if first visit.
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('es')) return 'es';
  return DEFAULT_LANG;
}

function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  applyLang(lang);
}

function translate(key, lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG];
  return dict[key] ?? translations[DEFAULT_LANG][key] ?? null;
}

function applyLang(lang) {
  // Set the <html lang="..."> attribute for accessibility and SEO.
  document.documentElement.setAttribute('lang', lang);

  // Translate every element with data-i18n (text content).
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const str = translate(key, lang);
    if (str != null) el.textContent = str;
  });

  // Translate attribute values via data-i18n-attr="placeholder:key, aria-label:key".
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (!attr || !key) return;
      const str = translate(key, lang);
      if (str != null) el.setAttribute(attr, str);
    });
  });

  // Update the switcher's active state.
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.langSwitch === lang ? 'true' : 'false');
  });
}

// Public: let anything in the page re-apply translations after it mutates the DOM.
window.MIM_i18n = {
  get lang() { return getLang(); },
  set: setLang,
  apply: () => applyLang(getLang()),
  t: (key) => translate(key, getLang())
};

// Boot: wait for the nav and footer to be injected (app.js runs synchronously
// after we load, so a microtask queued here fires after it), then apply.
function boot() {
  const lang = getLang();
  applyLang(lang);

  // Delegate clicks on the switcher.
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lang-switch]');
    if (!btn) return;
    event.preventDefault();
    setLang(btn.dataset.langSwitch);
  });

  // Re-apply after any script-driven DOM injection (small retries catch
  // late nav/footer injection without needing an explicit hook).
  requestAnimationFrame(() => applyLang(getLang()));
  setTimeout(() => applyLang(getLang()), 50);
  setTimeout(() => applyLang(getLang()), 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
