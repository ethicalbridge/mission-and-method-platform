/* Access code for legal template downloads.
   The template pages are open to everyone; each "Download Word template" button asks for the
   code every time before the file downloads. A soft preview gate while pricing is decided —
   NOT real protection: the files themselves are static. */
(function () {
  'use strict';
  var CODE = '1234';

  var CSS = [
    '.ldg-overlay{position:fixed;inset:0;background:rgba(10,30,38,.55);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Nunito Sans",Arial,sans-serif}',
    '.ldg-card{position:relative;background:#fff;border:1px solid #e0dbcd;border-radius:14px;max-width:420px;width:100%;padding:34px 30px 26px;box-shadow:0 24px 60px rgba(10,22,28,.22);text-align:center}',
    '.ldg-close{position:absolute;top:10px;right:12px;border:0;background:none;font-size:24px;line-height:1;color:#7a8893;cursor:pointer;padding:6px}',
    '.ldg-close:hover{color:#123c48}',
    '.ldg-eyebrow{font-size:11px;font-weight:900;letter-spacing:.14em;color:#16746e;text-transform:uppercase;margin-bottom:10px}',
    '.ldg-title{font-family:"DM Serif Display",Georgia,serif;font-weight:400;font-size:24px;color:#102e3b;margin:0 0 8px;line-height:1.2}',
    '.ldg-doc{font-weight:800;color:#123c48}',
    '.ldg-body{font-size:14.5px;line-height:1.55;color:#4b6270;margin:0 0 20px}',
    '.ldg-form{display:flex;flex-direction:column;gap:10px}',
    '.ldg-input{font:inherit;font-size:18px;letter-spacing:.3em;text-align:center;padding:13px 14px;border:1.5px solid #d4c9b1;border-radius:10px;background:#fdfaf2;color:#0a1419;outline:none}',
    '.ldg-input:focus{border-color:#16746e}',
    '.ldg-input.ldg-wrong{border-color:#c53b1a;animation:ldgShake .35s}',
    '@keyframes ldgShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}',
    '.ldg-btn{background:#16746e;color:#fff;font-weight:800;font-size:15px;padding:13px 18px;border:0;border-radius:10px;cursor:pointer}',
    '.ldg-btn:hover{background:#0e4e4a}',
    '.ldg-error{font-size:13px;color:#c53b1a;margin:0;min-height:18px}',
    '.ldg-note{font-size:13px;color:#7a8893;margin:16px 0 0}',
    '.ldg-note a{color:#16746e}',
    '.ldg-consent{display:flex;gap:8px;align-items:flex-start;text-align:left;font-size:12.5px;line-height:1.4;color:#4b6270}',
    '.ldg-consent input{margin-top:3px;accent-color:#16746e}',
    '.ldg-consent a{color:#16746e;font-weight:700}'
  ].join('\n');

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var lastTrigger = null;

  function close(overlay) {
    overlay.remove();
    document.removeEventListener('keydown', overlay._onKey);
    if (lastTrigger) lastTrigger.focus();
  }

  // Paid files live in private storage. The template-files function checks the code (later: the purchase)
  // and returns a link that works for two minutes. "assets/legal-templates/es/x.docx" -> "es/x.docx".
  var FN = 'https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/template-files';
  var ANON = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';
  function storageKey(file) {
    var m = file.match(/assets\/legal-templates\/(es\/)?([a-z0-9-]+\.(docx|xlsx))$/);
    return m ? (m[1] ? 'es/' : 'en/') + m[2] : null;
  }
  // Switched on once every file is in private storage. Until then files download from the site as before.
  var USE_STORAGE = false;
  function download(file, code, onError) {
    if (!USE_STORAGE) { var d = document.createElement('a'); d.href = file; d.setAttribute('download', file.split('/').pop()); document.body.appendChild(d); d.click(); d.remove(); return; }
    var key = storageKey(file);
    if (!key) { onError('This file is not available.'); return; }
    fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ANON, 'apikey': ANON },
      body: JSON.stringify({ action: 'download', file: key, code: code }) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j.url) { onError(res.j.error === 'wrong_code' ? 'That code is not right.' : 'The download is not available right now. Please try again in a minute.'); return; }
        var a = document.createElement('a'); a.href = res.j.url; a.rel = 'noopener';
        document.body.appendChild(a); a.click(); a.remove();
      })
      .catch(function () { onError('The download could not start. Check your connection and try again.'); });
  }

  function ask(file, title) {
    if (!document.getElementById('ldg-style')) {
      var st = document.createElement('style'); st.id = 'ldg-style'; st.textContent = CSS; document.head.appendChild(st);
    }
    var overlay = document.createElement('div');
    overlay.className = 'ldg-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'ldg-title');
    overlay.innerHTML =
      '<div class="ldg-card">' +
        '<button class="ldg-close" type="button" aria-label="Close">×</button>' +
        '<div class="ldg-eyebrow">Buy this template · $9</div>' +
        '<h2 class="ldg-title" id="ldg-title">' + esc(title) + '</h2>' +
        '<p class="ldg-body">Any single template is <b>$9</b>, in every country. Payments are not connected yet: enter the test code to simulate the purchase and download it. Nothing is charged.</p>' +
        '<form class="ldg-form" novalidate>' +
          '<input class="ldg-input" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="Test code" aria-label="Test code">' +
          '<label class="ldg-consent"><input type="checkbox" class="ldg-check"> I want the file straight away. I understand that once I download it, I lose my 14-day right to cancel (EU and UK buyers). <a href="legal.html#refunds" target="_blank" rel="noopener">Refund policy</a></label>' +
          '<p class="ldg-error" aria-live="polite"></p>' +
          '<button class="ldg-btn" type="submit">Confirm test purchase · $9</button>' +
        '</form>' +
        '<p class="ldg-note">Need several? <a href="prices.html#templates">A pack saves you more</a>.</p>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('.ldg-input');
    var err = overlay.querySelector('.ldg-error');
    overlay.querySelector('.ldg-close').addEventListener('click', function () { close(overlay); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(overlay); });
    overlay._onKey = function (e) { if (e.key === 'Escape') close(overlay); };
    document.addEventListener('keydown', overlay._onKey);
    overlay.querySelector('.ldg-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!overlay.querySelector('.ldg-check').checked) { err.textContent = 'Please tick the box to confirm you want the file straight away.'; return; }
      if (input.value.trim() === CODE) { var btn = overlay.querySelector('.ldg-btn'); btn.disabled = true; btn.textContent = 'Preparing your file…'; download(file, input.value.trim(), function (msg) { btn.disabled = false; btn.textContent = 'Confirm test purchase · $9'; err.textContent = msg; }); setTimeout(function () { if (document.body.contains(overlay) && !err.textContent) close(overlay); }, 2500); }
      else {
        input.classList.add('ldg-wrong'); err.textContent = 'That code is not right.';
        setTimeout(function () { input.classList.remove('ldg-wrong'); }, 400);
        input.focus(); input.select();
      }
    });
    setTimeout(function () { input.focus(); }, 30);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-template-file]');
    if (!btn) return;
    e.preventDefault();
    lastTrigger = btn;
    ask(btn.getAttribute('data-template-file'), btn.getAttribute('data-template-title') || 'this template');
  });
})();
