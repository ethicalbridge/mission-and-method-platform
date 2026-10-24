/* Preview-passcode gate for Method into Impact course + resource pages.
   Blocks the page body until the code "1234" is entered. Remembers the
   unlock per browser via localStorage. This is a soft "under construction"
   gate while content is being built — NOT real auth. */
(function () {
 'use strict';
 var KEY  = 'mip_gate_v2';
 var CODE = '1234';
 // sessionStorage: cleared when the tab/browser closes, so the gate
 // re-prompts on every fresh session (matches owner expectation).
 try { if (sessionStorage.getItem(KEY) === 'ok') return; }
 catch (e) { return; /* storage unavailable → fail open */ }

 // Hide body as early as possible to avoid a flash of gated content.
 document.documentElement.classList.add('mip-gated');

 var CSS = [
  'html.mip-gated body { visibility:hidden !important; overflow:hidden !important; }',
  '.mip-gate-overlay { position:fixed; inset:0; background:linear-gradient(165deg,#fffaf3 0%,#f5efe3 55%,#efe6d1 100%); z-index:2147483647; display:flex; align-items:center; justify-content:center; padding:24px; visibility:visible !important; font-family:"Inter","Nunito Sans",Arial,sans-serif; }',
  '.mip-gate-card { background:#fff; border:1px solid #e0dbcd; border-radius:14px; max-width:420px; width:100%; padding:36px 32px 30px; box-shadow:0 24px 60px rgba(10,22,28,.14); text-align:center; }',
  '.mip-gate-eyebrow { font-size:11px; font-weight:900; letter-spacing:.14em; color:#16746e; text-transform:uppercase; margin-bottom:10px; }',
  '.mip-gate-title { font-family:"Playfair Display","DM Serif Display",Georgia,serif; font-weight:700; font-size:24px; color:#0a1419; margin:0 0 10px; letter-spacing:-.01em; line-height:1.2; }',
  '.mip-gate-body { font-size:14.5px; line-height:1.55; color:#4b6270; margin:0 0 22px; }',
  '.mip-gate-form { display:flex; flex-direction:column; gap:10px; }',
  '.mip-gate-input { font:inherit; font-size:18px; letter-spacing:.3em; text-align:center; padding:13px 14px; border:1.5px solid #d4c9b1; border-radius:10px; background:#fdfaf2; color:#0a1419; outline:none; transition:border-color .2s; }',
  '.mip-gate-input:focus { border-color:#16746e; }',
  '.mip-gate-input.mip-gate-wrong { border-color:#c53b1a; animation:mipGateShake .35s; }',
  '@keyframes mipGateShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }',
  '.mip-gate-btn { background:#16746e; color:#fff; font-weight:800; font-size:15px; padding:13px 18px; border:0; border-radius:10px; cursor:pointer; transition:background .2s; }',
  '.mip-gate-btn:hover { background:#0e4e4a; }',
  '.mip-gate-error { font-size:13px; color:#c53b1a; margin:2px 0 0; min-height:18px; }',
  '.mip-gate-note { font-size:12.5px; color:#7a8893; margin:18px 0 10px; font-style:italic; }',
  '.mip-gate-home { display:inline-block; font-size:13px; color:#16746e; text-decoration:none; border-bottom:1px solid rgba(22,116,110,.4); padding-bottom:1px; }',
  '.mip-gate-home:hover { color:#0e4e4a; border-color:#0e4e4a; }'
 ].join('\n');

 var style = document.createElement('style');
 style.id = 'mip-gate-style';
 style.textContent = CSS;

 function build () {
  if (document.getElementById('mip-gate-style')) return;
  (document.head || document.documentElement).appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'mip-gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-labelledby', 'mip-gate-title');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
   '<div class="mip-gate-card">' +
    '<div class="mip-gate-eyebrow">Method into Impact · Preview</div>' +
    '<h2 class="mip-gate-title" id="mip-gate-title">This page is private while we build.</h2>' +
    '<p class="mip-gate-body">The courses and resources aren’t open to the public yet. Enter the preview code to continue.</p>' +
    '<form class="mip-gate-form" id="mip-gate-form" novalidate>' +
     '<input class="mip-gate-input" id="mip-gate-input" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="Code" aria-label="Preview code">' +
     '<p class="mip-gate-error" id="mip-gate-error" aria-live="polite"></p>' +
     '<button class="mip-gate-btn" type="submit">Unlock</button>' +
    '</form>' +
    '<p class="mip-gate-note">No code? You can still visit the rest of the site.</p>' +
    '<a class="mip-gate-home" href="index.html">← Back to the home page</a>' +
   '</div>';

  (document.body || document.documentElement).appendChild(overlay);

  var input = overlay.querySelector('#mip-gate-input');
  var form  = overlay.querySelector('#mip-gate-form');
  var err   = overlay.querySelector('#mip-gate-error');

  function fail () {
   input.classList.add('mip-gate-wrong');
   err.textContent = 'That code is not right.';
   setTimeout(function () { input.classList.remove('mip-gate-wrong'); }, 400);
   input.focus(); input.select();
  }
  function succeed () {
   try { sessionStorage.setItem(KEY, 'ok'); } catch (e) {}
   document.documentElement.classList.remove('mip-gated');
   overlay.remove(); style.remove();
  }

  form.addEventListener('submit', function (ev) {
   ev.preventDefault();
   if (input.value.trim() === CODE) succeed(); else fail();
  });

  // Unlock on paste or typing when the full code is already there — gentler UX.
  input.addEventListener('input', function () {
   if (input.value.trim() === CODE) succeed();
  });

  setTimeout(function () { input.focus(); }, 50);
 }

 if (document.body) build();
 else document.addEventListener('DOMContentLoaded', build);
})();
