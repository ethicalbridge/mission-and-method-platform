/* Work With Julieta — free discovery intake form.
   The booking + paid-hour flow was retired; this file now handles only
   the single discovery dialog that collects a brief for a free call.
*/
(() => {
 'use strict';

 const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const discoveryDialog = document.querySelector('#discovery-dialog');
 if (!discoveryDialog) return;
 const discoveryOriginal = document.querySelector('#discovery-content').innerHTML;

 function openDiscovery () {
  if (!document.querySelector('#discovery-form')) {
   document.querySelector('#discovery-content').innerHTML = discoveryOriginal;
  }
  const form = document.querySelector('#discovery-form');
  form.onsubmit = ev => {
   ev.preventDefault();
   if (!form.reportValidity()) return;
   const name = esc(form.name.value.trim().split(/\s+/)[0] || 'there');
   document.querySelector('#discovery-content').innerHTML =
    `<div class="wwj-form-success" role="status">
      <strong>Thanks ${name} — your brief is in.</strong>
      <p>I'll reply within three working days to confirm a time for a free discovery call (45–60 minutes). After the call, I come back with a tailored proposal.</p>
      <small>Prototype — the submission integration is being connected. In the meantime you can also email <b>hello@methodintoimpact.com</b>.</small>
     </div>`;
  };
  discoveryDialog.showModal();
 }

 // Wire up every "Start a conversation" trigger on the page.
 [
  '#open-discovery',
  '#open-discovery-start',
  '#open-discovery-paths',
  '#open-discovery-final',
 ].forEach(sel => document.querySelector(sel)?.addEventListener('click', openDiscovery));

 document.querySelectorAll('[data-close]').forEach(btn =>
  btn.addEventListener('click', () => btn.closest('dialog').close())
 );
 discoveryDialog.addEventListener('click', ev => { if (ev.target === discoveryDialog) discoveryDialog.close(); });
})();
