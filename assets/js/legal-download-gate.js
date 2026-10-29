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
    '.ldg-note a{color:#16746e}'
  ].join('\n');

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var lastTrigger = null;

  function close(overlay) {
    overlay.remove();
    document.removeEventListener('keydown', overlay._onKey);
    if (lastTrigger) lastTrigger.focus();
  }

  function download(file) {
    var a = document.createElement('a');
    a.href = file;
    a.setAttribute('download', file.split('/').pop());
    document.body.appendChild(a);
    a.click();
    a.remove();
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
      if (input.value.trim() === CODE) { close(overlay); download(file); }
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
