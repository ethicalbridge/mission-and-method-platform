/* Work With Julieta — free discovery intake form (branched).
   One dialog, two paths:
     · founder — someone with an idea, no org yet
     · org     — an existing organisation
   On submit: show a confirmation + a Cal.com booking placeholder so the
   person books their own slot. When the real Cal.com link is wired in,
   swap the placeholder's data-cal-link / data-cal-namespace below.
*/
(() => {
 'use strict';

 const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const discoveryDialog = document.querySelector('#discovery-dialog');
 if (!discoveryDialog) return;
 const contentHost = document.querySelector('#discovery-content');
 const originalMarkup = contentHost.innerHTML;

 /* -------- helpers -------- */

 function activePathBlocks (form) {
  const blocks = form.querySelectorAll('.wwj-path-block');
  const footer = form.querySelector('[data-path-dependent]');
  const picked = form.querySelector('input[name="path"]:checked');
  blocks.forEach(b => {
   const match = picked && b.dataset.path === picked.value;
   b.hidden = !match;
   // Required fields outside the active path should NOT block submit.
   b.querySelectorAll('[required]').forEach(el => {
    el.disabled = !match; // disabled fields are skipped by form validation + FormData
   });
  });
  if (footer) footer.hidden = !picked;
 }

 // ---------- Backend submission ----------
 const SUPABASE_URL  = 'https://itzrnaxfllcztpzrgnoa.supabase.co';
 const SUPABASE_ANON = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';

 function collectAnswers (form) {
  // Walk the active path's form fields and build a JSON payload.
  // Checkboxes with the same name are collected as arrays; everything else is a string.
  const data = { path: form.querySelector('input[name="path"]:checked')?.value };
  try { data.lang = window.MIM_i18n?.lang; } catch { /* noop */ }

  const activePrefix = data.path === 'founder' ? 'f_' : 'o_';
  const fields = form.querySelectorAll(`[name^="${activePrefix}"]`);
  const multi = {};

  fields.forEach(el => {
   if (el.disabled || !el.name) return;
   if (el.type === 'checkbox') {
    if (!multi[el.name]) multi[el.name] = [];
    if (el.checked) multi[el.name].push(el.value);
   } else if (el.type === 'radio') {
    if (el.checked) data[el.name] = el.value;
   } else {
    data[el.name] = el.value;
   }
  });
  Object.assign(data, multi);
  return data;
 }

 async function postBrief (payload) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-brief`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON}`,
   },
   body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`submit-brief ${res.status}`);
  return res.json();
 }

 async function uploadBriefDoc (contactId, file) {
  const fd = new FormData();
  fd.append('contact_id', contactId);
  fd.append('file', file, file.name);
  const res = await fetch(`${SUPABASE_URL}/functions/v1/upload-brief-doc`, {
   method: 'POST',
   headers: {
    // DO NOT set Content-Type; the browser sets it with the correct boundary for multipart.
    'Authorization': `Bearer ${SUPABASE_ANON}`,
   },
   body: fd,
  });
  if (!res.ok) throw new Error(`upload-brief-doc ${res.status}`);
  return res.json();
 }

 /* -------- File picker helpers -------- */

 const MAX_FILES   = 3;
 const MAX_SIZE_MB = 5;
 const MAX_BYTES   = MAX_SIZE_MB * 1024 * 1024;

 function humanSize (bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
 }

 // Per-input store of the files the user has picked so we can show a list and
 // remove individual items. The native <input type="file"> doesn't let you
 // remove just one file, so we track them ourselves.
 const fileStores = new WeakMap();

 function renderFileList (input) {
  const list = input.closest('fieldset')?.querySelector('.wwj-file-list');
  if (!list) return;
  const files = fileStores.get(input) || [];
  list.innerHTML = files.map((f, i) => {
   const oversized = f.size > MAX_BYTES;
   const cls = oversized ? 'wwj-file-item wwj-file-item-error' : 'wwj-file-item';
   const sizeLbl = oversized ? `${humanSize(f.size)} — too large, max ${MAX_SIZE_MB}MB` : humanSize(f.size);
   return `<div class="${cls}">
    <span class="wwj-file-name">${esc(f.name)}</span>
    <span class="wwj-file-size">${esc(sizeLbl)}</span>
    <button type="button" class="wwj-file-remove" data-file-remove="${i}" aria-label="Remove ${esc(f.name)}">×</button>
   </div>`;
  }).join('');
 }

 function wireFileInput (input) {
  if (!input || input.dataset.filesWired) return;
  input.dataset.filesWired = '1';
  fileStores.set(input, []);

  input.addEventListener('change', () => {
   const current = fileStores.get(input) || [];
   const incoming = Array.from(input.files || []);
   // Deduplicate by name+size, cap at MAX_FILES total.
   const seen = new Set(current.map(f => `${f.name}|${f.size}`));
   for (const f of incoming) {
    const key = `${f.name}|${f.size}`;
    if (seen.has(key)) continue;
    if (current.length >= MAX_FILES) break;
    current.push(f);
    seen.add(key);
   }
   fileStores.set(input, current);
   // Clear the native input so re-selecting the same file still fires change.
   input.value = '';
   renderFileList(input);
  });

  // Remove button clicks (event delegation on the file-list)
  input.closest('fieldset')?.querySelector('.wwj-file-list')?.addEventListener('click', (ev) => {
   const btn = ev.target.closest('[data-file-remove]');
   if (!btn) return;
   const idx = parseInt(btn.dataset.fileRemove, 10);
   const current = fileStores.get(input) || [];
   current.splice(idx, 1);
   fileStores.set(input, current);
   renderFileList(input);
  });
 }

 function getPickedFiles (form) {
  // Return the files from whichever path is active.
  const picked = form.querySelector('input[name="path"]:checked')?.value;
  const name = picked === 'founder' ? 'f_docs' : 'o_docs';
  const input = form.querySelector(`input[type="file"][name="${name}"]`);
  if (!input) return [];
  return (fileStores.get(input) || []).filter(f => f.size <= MAX_BYTES).slice(0, MAX_FILES);
 }

 function validateMinChecks (form) {
  const groups = form.querySelectorAll('[data-require-min]');
  for (const group of groups) {
   // Skip anything hidden (non-active path block, etc.)
   if (group.hidden || group.closest('[hidden]')) continue;
   const min = parseInt(group.dataset.requireMin || '1', 10);
   const checked = group.querySelectorAll('input[type="checkbox"]:checked').length;
   if (checked < min) {
    group.classList.add('wwj-check-error');
    group.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus the first checkbox so a keyboard user lands in the right place.
    group.querySelector('input[type="checkbox"]')?.focus();
    return false;
   }
   group.classList.remove('wwj-check-error');
  }
  return true;
 }

 function firstNameOf (form) {
  const picked = form.querySelector('input[name="path"]:checked')?.value;
  const nameField = picked === 'founder' ? form.f_name : form.o_name;
  const value = (nameField?.value || '').trim().split(/\s+/)[0];
  return esc(value || 'there');
 }

 // Set up the Cal.com embed queue + load the real script.
 // Browsers skip <script> tags inserted via innerHTML, so this has to run
 // as real code — not inside the HTML we're about to inject.
 function loadCalCom () {
  if (window.Cal) return;
  (function (C, L) {
   C.Cal = function () {
    const cal = C.Cal;
    const ar = arguments;
    if (!cal.loaded) {
     cal.ns = {};
     cal.q = cal.q || [];
     const s = C.document.createElement('script');
     s.src = 'https://app.cal.com/embed/embed.js';
     s.async = true;
     C.document.head.appendChild(s);
     cal.loaded = true;
    }
    if (ar[0] === L) {
     const api = function () { api.q.push(arguments); };
     const namespace = ar[1];
     api.q = api.q || [];
     if (typeof namespace === 'string') {
      cal.ns[namespace] = cal.ns[namespace] || api;
      api.q.push(ar);
      cal.q.push(['initNamespace', namespace]);
     } else {
      cal.q.push(ar);
     }
     return;
    }
    cal.q.push(ar);
   };
  })(window, 'init');
 }

 function showConfirmation (name, briefSaved = true, filesInfo = {}) {
  const CAL_LINK = 'methodintoimpact/30min'; // Cal.com username/event-slug
  const { filesTried = 0, filesFailed = 0 } = filesInfo;

  const calBlock = CAL_LINK
   ? `<div class="wwj-cal-embed"><div id="cal-inline"></div></div>`
   : `<div class="wwj-cal-placeholder" role="status">
       <b data-i18n="wwj.success.cal_placeholder_title">Calendar coming here.</b>
       <p data-i18n="wwj.success.cal_placeholder_body">Julieta's Cal.com picker will embed here so you can pick a slot directly. Until then, she'll reply within a week with a time and the meeting link.</p>
      </div>`;

  const warnBlock = briefSaved ? '' : `
    <p style="background:#fff5e7;border:1px solid #f1c874;border-radius:8px;padding:10px 12px;color:#8a5e14;font-size:13px;margin:0 0 12px">
      Heads up — the brief didn't reach my inbox automatically. Please book the call below and I'll email you to catch any details that got lost.
    </p>`;

  const filesBlock = filesTried
   ? (filesFailed === 0
      ? `<p style="background:#eef7f0;border:1px solid #c8e4cf;border-radius:8px;padding:10px 12px;color:#1e5e32;font-size:13px;margin:0 0 12px">
          ${filesTried} ${filesTried === 1 ? 'file' : 'files'} attached to your brief.
         </p>`
      : `<p style="background:#fff5e7;border:1px solid #f1c874;border-radius:8px;padding:10px 12px;color:#8a5e14;font-size:13px;margin:0 0 12px">
          ${filesTried - filesFailed} of ${filesTried} ${filesTried === 1 ? 'file' : 'files'} attached. The others didn't upload — you can bring them to the call instead.
         </p>`)
   : '';

  contentHost.innerHTML = `
   <div class="wwj-form-success" role="status">
    <strong><span data-i18n="wwj.success.greet_pre">Thanks</span> ${name} — <span data-i18n="wwj.success.greet_post">your brief is in.</span></strong>
    <p data-i18n="wwj.success.body">Pick a time for the free 30-minute discovery call. After the call, I come back with a tailored proposal (or, if it isn't a fit, I say so and point you somewhere useful).</p>
    ${warnBlock}
    ${filesBlock}
    ${calBlock}
    <small data-i18n="wwj.success.footnote">You'll get a confirmation email with the meeting link. If anything changes, you can reschedule from that email.</small>
   </div>`;

  window.MIM_i18n?.apply?.();

  // Boot the Cal.com embed into #cal-inline (real DOM, after innerHTML).
  if (CAL_LINK) {
   loadCalCom();
   window.Cal('init', 'discovery', { origin: 'https://app.cal.com' });
   window.Cal.ns.discovery('inline', {
    elementOrSelector: '#cal-inline',
    config: { layout: 'month_view' },
    calLink: CAL_LINK,
   });
   window.Cal.ns.discovery('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
   });
  }
 }

 /* -------- open / wire -------- */

 function openDiscovery () {
  // Restore the form if an earlier submission replaced it.
  if (!document.querySelector('#discovery-form')) {
   contentHost.innerHTML = originalMarkup;
   window.MIM_i18n?.apply?.();
  }
  const form = document.querySelector('#discovery-form');

  // Default state: both path blocks + footer hidden; disable their required
  // fields so a stale "required but hidden" doesn't block anything.
  activePathBlocks(form);
  form.querySelectorAll('input[name="path"]').forEach(r =>
   r.addEventListener('change', () => activePathBlocks(form))
  );

  // Wire the file pickers (one per path).
  form.querySelectorAll('input[type="file"]').forEach(wireFileInput);

  form.onsubmit = async ev => {
   ev.preventDefault();
   // Native validation first (required text/select/radio).
   if (!form.reportValidity()) return;
   // Then our custom "at least N" check for multi-selects.
   if (!validateMinChecks(form)) return;

   const name = firstNameOf(form);
   const files = getPickedFiles(form);
   const submitBtn = form.querySelector('button[type="submit"]');
   const originalBtnText = submitBtn?.textContent;
   if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = files.length ? 'Sending brief + files…' : 'Sending…';
   }

   const payload = collectAnswers(form);
   // Fire-and-await: we still show the confirmation even if the backend fails,
   // because Cal.com booking is independent — never block the person from booking.
   // But capture the failure state so we can warn the user visibly.
   let briefSaved = true;
   let contactId = null;
   let filesFailed = 0;
   try {
    const result = await postBrief(payload);
    contactId = result?.contact_id || null;
   } catch (err) {
    console.error('submit-brief failed:', err);
    briefSaved = false;
   }

   // Upload any picked files sequentially (keeps edge-function load light + lets
   // one failure fail only that file). Needs the contact_id to attach them.
   if (contactId && files.length) {
    for (const f of files) {
     try {
      await uploadBriefDoc(contactId, f);
     } catch (err) {
      console.error('upload-brief-doc failed for', f.name, err);
      filesFailed++;
     }
    }
   }

   if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
   showConfirmation(name, briefSaved, { filesTried: files.length, filesFailed });
  };

  // Clear min-check error styling the moment the person starts ticking.
  form.querySelectorAll('[data-require-min] input[type="checkbox"]').forEach(cb =>
   cb.addEventListener('change', () => {
    cb.closest('[data-require-min]')?.classList.remove('wwj-check-error');
   })
  );

  if (typeof discoveryDialog.showModal === 'function') {
   discoveryDialog.showModal();
  } else {
   discoveryDialog.setAttribute('open', 'open'); // very old browsers
  }
 }

 // Wire every "Start a conversation" trigger on this page.
 [
  '#open-discovery',
  '#open-discovery-start',
  '#open-discovery-paths',
  '#open-discovery-final',
 ].forEach(sel => document.querySelector(sel)?.addEventListener('click', openDiscovery));

 // Any element with [data-open-discovery] opens the dialog too.
 document.querySelectorAll('[data-open-discovery]').forEach(el =>
  el.addEventListener('click', ev => { ev.preventDefault(); openDiscovery(); })
 );

 // Close affordances
 document.querySelectorAll('[data-close]').forEach(btn =>
  btn.addEventListener('click', () => btn.closest('dialog')?.close())
 );
 discoveryDialog.addEventListener('click', ev => {
  if (ev.target === discoveryDialog) discoveryDialog.close();
 });

 // Auto-open when arriving from another page with #start in the URL.
 function maybeAutoOpen () {
  if (window.location.hash === '#start') {
   // Clean the hash so refreshing the page doesn't re-open it.
   history.replaceState(null, '', window.location.pathname + window.location.search);
   openDiscovery();
  }
 }
 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', maybeAutoOpen);
 } else {
  maybeAutoOpen();
 }
 window.addEventListener('hashchange', maybeAutoOpen);
})();
