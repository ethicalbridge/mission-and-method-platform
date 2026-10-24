/* Work With Julieta — booking + tailored-proposal form logic.
   Rewritten from experts.js for the single-practitioner page. Keeps the
   WIB → local timezone conversion and the prototype success states.
*/
(() => {
 'use strict';

 const JULIETA_DAYS  = [1, 3];                      // Mon, Wed
 const JULIETA_HOURS = [8, 9, 10, 11];              // 08:00–12:00 WIB
 const WIB_OFFSET    = 7;                           // UTC+7

 const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const bookingDialog  = document.querySelector('#booking-dialog');
 const proposalDialog = document.querySelector('#proposal-dialog');
 const bookingOriginal  = document.querySelector('#booking-content').innerHTML;
 const proposalOriginal = document.querySelector('#proposal-content').innerHTML;

 // ---------- Booking ----------
 function controls () {
  return {
   form:  document.querySelector('#booking-form'),
   date:  document.querySelector('#booking-date'),
   time:  document.querySelector('#booking-time'),
   local: document.querySelector('#local-time'),
  };
 }

 function upcomingDates () {
  const now = new Date();
  const dates = [];
  for (let offset = 1; offset <= 42 && dates.length < 10; offset++) {
   const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + offset));
   if (JULIETA_DAYS.includes(d.getUTCDay())) dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
 }

 function refreshDates () {
  const { date } = controls();
  date.innerHTML = upcomingDates().map(v =>
   `<option value="${v}">${new Intl.DateTimeFormat('en', {weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}).format(new Date(v + 'T00:00:00Z'))}</option>`
  ).join('');
  refreshTimes();
 }
 function refreshTimes () {
  const { time } = controls();
  time.innerHTML = JULIETA_HOURS.map(h => `<option value="${String(h).padStart(2,'0')}:00">${String(h).padStart(2,'0')}:00 WIB</option>`).join('');
  refreshLocal();
 }
 function refreshLocal () {
  const { date, time, local } = controls();
  if (!date.value || !time.value) { local.textContent = 'All slots are shown in WIB (UTC+7).'; return; }
  const hour = Number(time.value.slice(0,2)) - WIB_OFFSET;
  const utc  = new Date(`${date.value}T${String(((hour % 24) + 24) % 24).padStart(2,'0')}:00:00Z`);
  try {
   local.textContent = `Your local time: ${new Intl.DateTimeFormat(undefined, {dateStyle:'full', timeStyle:'short'}).format(utc)} (${Intl.DateTimeFormat().resolvedOptions().timeZone}).`;
  } catch { local.textContent = 'All slots are shown in WIB (UTC+7).'; }
 }

 function openBooking () {
  if (!document.querySelector('#booking-form')) document.querySelector('#booking-content').innerHTML = bookingOriginal;
  const { form, date, time } = controls();
  refreshDates();
  date.onchange = refreshLocal;
  time.onchange = refreshLocal;
  form.onsubmit = ev => {
   ev.preventDefault();
   if (!form.reportValidity()) return;
   const chosen = `${date.options[date.selectedIndex].text} at ${time.value} WIB`;
   document.querySelector('#booking-content').innerHTML =
    `<div class="wwj-form-success" role="status">
      <strong>Prototype booking captured.</strong>
      <p>Your one-hour consultation with Julieta is pencilled for ${esc(chosen)}. Price: USD 49.</p>
      <small>A live calendar and payment provider need to be connected before this becomes a real booking. You'll receive a confirmation once that's live.</small>
     </div>`;
  };
  bookingDialog.showModal();
 }

 // ---------- Tailored proposal ----------
 function openProposal () {
  if (!document.querySelector('#proposal-form')) document.querySelector('#proposal-content').innerHTML = proposalOriginal;
  const form = document.querySelector('#proposal-form');
  form.onsubmit = ev => {
   ev.preventDefault();
   if (!form.reportValidity()) return;
   document.querySelector('#proposal-content').innerHTML =
    `<div class="wwj-form-success" role="status">
      <strong>Thanks — your brief is ready.</strong>
      <p>I'll come back within three working days with a scoped proposal, timeline and indicative budget. The proposal itself is free.</p>
      <small>Prototype — the submission integration is being connected. In the meantime you can also email <b>hello@methodintoimpact.com</b>.</small>
     </div>`;
  };
  proposalDialog.showModal();
 }

 // ---------- Wire up ----------
 ['#open-booking', '#open-booking-final'].forEach(sel => document.querySelector(sel)?.addEventListener('click', openBooking));
 ['#open-proposal', '#open-proposal-final'].forEach(sel => document.querySelector(sel)?.addEventListener('click', openProposal));
 document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
 for (const dlg of [bookingDialog, proposalDialog]) dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
})();
