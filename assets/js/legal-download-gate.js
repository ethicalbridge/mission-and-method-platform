/* Legal template downloads, tied to the person's account.
   Buttons: <button data-template-file="assets/legal-templates/<slug>.docx|.xlsx" or ".../es/<slug>.docx" data-template-title="…">.
   - Signed out: asks the person to sign in first (emailed link, no password).
   - Owns the template (bought on its own or in a pack): downloads straight away from private storage.
   - Does not own it: the "Buy this template · $9" dialog. PREVIEW: the test code records a test purchase on the
     account (server function mip-account); nothing is charged. The file then downloads.
   Paid files are only in private storage; the template-files function checks ownership and returns a 2-minute link.
   Uses assets/js/mip-account.js (loaded on demand, so this stays a plain script). */
(function () {
  'use strict';
  var PRICE = 9;
  var acct = null;
  function account() { return acct || (acct = import('/assets/js/mip-account.js?v=4')); }

  var CSS = [
    '.ldg-overlay{position:fixed;inset:0;background:rgba(10,30,38,.55);z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Nunito Sans",Arial,sans-serif}',
    '.ldg-card{position:relative;background:#fff;border:1px solid #e0dbcd;border-radius:14px;max-width:420px;width:100%;padding:34px 30px 26px;box-shadow:0 24px 60px rgba(10,22,28,.22);text-align:center}',
    '.ldg-close{position:absolute;top:10px;right:12px;border:0;background:none;font-size:24px;line-height:1;color:#7a8893;cursor:pointer;padding:6px}',
    '.ldg-close:hover{color:#123c48}',
    '.ldg-eyebrow{font-size:11px;font-weight:900;letter-spacing:.14em;color:#16746e;text-transform:uppercase;margin-bottom:10px}',
    '.ldg-title{font-family:"DM Serif Display",Georgia,serif;font-weight:400;font-size:24px;color:#102e3b;margin:0 0 8px;line-height:1.2}',
    '.ldg-body{font-size:14.5px;line-height:1.55;color:#4b6270;margin:0 0 20px}',
    '.ldg-form{display:flex;flex-direction:column;gap:10px}',
    '.ldg-input{font:inherit;font-size:18px;letter-spacing:.3em;text-align:center;padding:13px 14px;border:1.5px solid #d4c9b1;border-radius:10px;background:#fdfaf2;color:#0a1419;outline:none}',
    '.ldg-input:focus{border-color:#16746e}',
    '.ldg-btn{background:#16746e;color:#fff;font-weight:800;font-size:15px;padding:13px 18px;border:0;border-radius:10px;cursor:pointer}',
    '.ldg-btn:hover{background:#0e4e4a}.ldg-btn[disabled]{opacity:.6;cursor:wait}',
    '.ldg-error{font-size:13px;color:#c53b1a;margin:0;min-height:18px}',
    '.ldg-note{font-size:13px;color:#7a8893;margin:16px 0 0}',
    '.ldg-note a{color:#16746e}',
    '.ldg-consent{display:flex;gap:8px;align-items:flex-start;text-align:left;font-size:12.5px;line-height:1.4;color:#4b6270}',
    '.ldg-consent input{margin-top:3px;accent-color:#16746e}',
    '.ldg-consent a{color:#16746e;font-weight:700}',
    '.ldg-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#102e3b;color:#fff;padding:12px 18px;border-radius:10px;font:600 14px "Nunito Sans",Arial,sans-serif;z-index:2147483000;box-shadow:0 10px 30px rgba(0,0,0,.2);max-width:calc(100vw - 32px)}'
  ].join('\n');
  function ensureCSS() { if (document.getElementById('ldg-style')) return; var st = document.createElement('style'); st.id = 'ldg-style'; st.textContent = CSS; document.head.appendChild(st); }

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var lastTrigger = null;

  // "assets/legal-templates/es/x.docx" -> {key: "es/x.docx", slug: "x"}
  function parse(file) {
    var m = String(file).match(/assets\/legal-templates\/(es\/)?([a-z0-9-]+)\.(docx|xlsx)$/);
    return m ? { key: (m[1] ? 'es/' : 'en/') + m[2] + '.' + m[3], slug: m[2] } : null;
  }

  function toast(msg) {
    ensureCSS();
    var t = document.createElement('div'); t.className = 'ldg-toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3500);
  }

  function close(overlay) {
    overlay.remove();
    document.removeEventListener('keydown', overlay._onKey);
    if (lastTrigger) lastTrigger.focus();
  }

  function buy(f, title, A) {
    ensureCSS();
    var overlay = document.createElement('div');
    overlay.className = 'ldg-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'ldg-title');
    overlay.innerHTML =
      '<div class="ldg-card">' +
        '<button class="ldg-close" type="button" aria-label="Close">×</button>' +
        '<div class="ldg-eyebrow">Buy this template · $' + PRICE + '</div>' +
        '<h2 class="ldg-title" id="ldg-title">' + esc(title) + '</h2>' +
        '<p class="ldg-body">Any single template is <b>$' + PRICE + '</b>, in every country, in English and Spanish. It stays on your account to download again. Payments are not connected yet: enter the test code to simulate the purchase. Nothing is charged.</p>' +
        '<form class="ldg-form" novalidate>' +
          '<input class="ldg-input" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="Test code" aria-label="Test code">' +
          '<label class="ldg-consent"><input type="checkbox" class="ldg-check"> I want the file straight away. I understand that once I download it, I lose my 14-day right to cancel (EU and UK buyers). <a href="legal.html#refunds" target="_blank" rel="noopener">Refund policy</a></label>' +
          '<p class="ldg-error" aria-live="polite"></p>' +
          '<button class="ldg-btn" type="submit">Confirm test purchase · $' + PRICE + '</button>' +
        '</form>' +
        '<p class="ldg-note">Need several? <a href="prices.html#templates">A pack saves you more</a>.</p>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('.ldg-input');
    var err = overlay.querySelector('.ldg-error');
    var btn = overlay.querySelector('.ldg-btn');
    overlay.querySelector('.ldg-close').addEventListener('click', function () { close(overlay); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(overlay); });
    overlay._onKey = function (e) { if (e.key === 'Escape') close(overlay); };
    document.addEventListener('keydown', overlay._onKey);
    overlay.querySelector('.ldg-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!overlay.querySelector('.ldg-check').checked) { err.textContent = 'Please tick the box to confirm you want the file straight away.'; return; }
      btn.disabled = true; btn.textContent = 'Saving to your account…'; err.textContent = '';
      A.testPurchase({ product: 'template:' + f.slug, code: input.value.trim(), amount: PRICE, waiver: true })
        .then(function () { return A.downloadFile(f.key); })
        .then(function () { close(overlay); toast('Downloading. It is also saved in My account.'); })
        .catch(function (x) {
          btn.disabled = false; btn.textContent = 'Confirm test purchase · $' + PRICE;
          err.textContent = x && x.code === 'wrong_code' ? 'That code is not right.' : A.downloadError(x);
        });
    });
    setTimeout(function () { input.focus(); }, 30);
  }

  // Owned templates: the buttons say "Download" instead of "Buy · $9".
  function label(A) {
    document.querySelectorAll('[data-template-file]').forEach(function (b) {
      var f = parse(b.getAttribute('data-template-file')); if (!f) return;
      if (!b.hasAttribute('data-buy-label')) b.setAttribute('data-buy-label', b.textContent);
      var own = A.owns('template:' + f.slug);
      b.textContent = own ? (f.key.indexOf('es/') === 0 ? 'Descargar en español ↓' : /\.xlsx$/.test(f.key) ? 'Download Excel ↓' : 'Download Word template ↓') : b.getAttribute('data-buy-label');
      b.classList.toggle('is-owned', own);
    });
  }
  if (document.querySelector('[data-template-file]')) account().then(function (A) { label(A); window.addEventListener('mip:account', function () { label(A); }); });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-template-file]');
    if (!btn) return;
    e.preventDefault();
    lastTrigger = btn;
    var f = parse(btn.getAttribute('data-template-file'));
    var title = btn.getAttribute('data-template-title') || 'this template';
    if (!f) return;
    account().then(function (A) {
      return A.requireUser({ title: 'Sign in to get ' + title, why: 'Templates you buy are kept on your account, so you can download them again on any device. We email you a sign-in link: no password.' })
        .then(function (user) {
          if (!user) return;
          if (A.owns('template:' + f.slug)) return A.downloadFile(f.key).catch(function (x) { toast(A.downloadError(x)); });
          buy(f, title, A);
        });
    });
  });
})();
