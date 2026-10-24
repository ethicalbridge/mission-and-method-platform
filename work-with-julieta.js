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

 function firstNameOf (form) {
  const picked = form.querySelector('input[name="path"]:checked')?.value;
  const nameField = picked === 'founder' ? form.f_name : form.o_name;
  const value = (nameField?.value || '').trim().split(/\s+/)[0];
  return esc(value || 'there');
 }

 function showConfirmation (name) {
  // Cal.com inline-embed placeholder.
  // To wire the real picker: replace CAL_LINK with your Cal.com event link
  // (e.g. "julieta/discovery-30") and uncomment the <script> block.
  const CAL_LINK = ''; // e.g. 'julieta/discovery-30'
  const calEmbed = CAL_LINK
   ? `<div class="wwj-cal-embed">
       <!-- Cal.com inline embed -->
       <div id="cal-inline" style="width:100%;height:620px;overflow:scroll"></div>
       <script type="text/javascript">
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "discovery", {origin:"https://app.cal.com"});
        Cal.ns.discovery("inline", {elementOrSelector:"#cal-inline", config:{layout:"month_view"}, calLink:"${CAL_LINK}"});
        Cal.ns.discovery("ui", {hideEventTypeDetails:false, layout:"month_view"});
       </script>
      </div>`
   : `<div class="wwj-cal-placeholder" role="status">
       <b data-i18n="wwj.success.cal_placeholder_title">Calendar coming here.</b>
       <p data-i18n="wwj.success.cal_placeholder_body">Julieta's Cal.com picker will embed here so you can pick a slot directly. Until then, she'll reply within a week with a time and the meeting link.</p>
      </div>`;

  contentHost.innerHTML = `
   <div class="wwj-form-success" role="status">
    <strong><span data-i18n="wwj.success.greet_pre">Thanks</span> ${name} — <span data-i18n="wwj.success.greet_post">your brief is in.</span></strong>
    <p data-i18n="wwj.success.body">Pick a time for the free 30-minute discovery call. After the call, I come back with a tailored proposal (or, if it isn't a fit, I say so and point you somewhere useful).</p>
    ${calEmbed}
    <small data-i18n="wwj.success.footnote">You'll get a confirmation email with the meeting link. If anything changes, you can reschedule from that email.</small>
   </div>`;

  // Re-run i18n on the just-injected markup if the i18n engine is present.
  window.MIM_i18n?.apply?.();
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

  form.onsubmit = ev => {
   ev.preventDefault();
   // Make the browser surface its own validation UI (focus the first bad field).
   if (!form.reportValidity()) return;
   const name = firstNameOf(form);
   // In the future, POST FormData(form) here before showing confirmation.
   showConfirmation(name);
  };

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
