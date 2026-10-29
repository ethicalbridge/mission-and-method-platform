/* Newsletter sign-up and free templates, through the mip-newsletter function (Brevo).
   - Footer form on every page (added by app.js): <form data-newsletter-form> → "subscribe" (double opt-in:
     Brevo emails a "Yes, keep me posted" button; nobody joins the list before that click).
   - Free templates (legal-templates.html) use MIPNewsletter.send('free-templates', …): the files download straight
     away and are also emailed; the newsletter box is optional and unticked.
   The exact consent wording shown is sent with each request and kept as proof (table mip_email_consents). */
(function () {
  'use strict';
  var FN = 'https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/mip-newsletter';
  var ANON = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';
  var VERSION = '2026-10-29';
  var lang = function () { return (document.documentElement.lang || '').indexOf('es') === 0 ? 'es' : 'en'; };

  function send(action, data) {
    var body = Object.assign({ action: action, lang: lang(), page: location.pathname, consentVersion: VERSION }, data || {});
    return fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: ANON, Authorization: 'Bearer ' + ANON }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) { var e = new Error(j.error || 'failed'); e.code = j.error; throw e; } return j; }); });
  }
  var T = {
    en: { bad: 'Please enter a valid email address.', busy: 'Sending…', ok: 'Almost there: check your inbox and click "Yes, keep me posted" to confirm.', many: 'Too many tries. Please wait a little and try again.', fail: 'That did not work. Please try again in a minute.' },
    es: { bad: 'Escribe un correo válido.', busy: 'Enviando…', ok: 'Casi listo: revisa tu correo y pulsa "Sí, quiero recibir novedades" para confirmar.', many: 'Demasiados intentos. Espera un poco y vuelve a intentarlo.', fail: 'No funcionó. Inténtalo de nuevo en un minuto.' }
  };
  function wire(form) {
    if (form.dataset.nlBound) return; form.dataset.nlBound = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = T[lang()], input = form.querySelector('input[type=email]'), note = form.querySelector('[data-newsletter-note]'), btn = form.querySelector('button[type=submit]');
      var email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { note.textContent = t.bad; input.focus(); return; }
      btn.disabled = true; note.textContent = t.busy;
      var consent = (form.querySelector('[data-consent-text]') || form).textContent.replace(/\s+/g, ' ').trim().slice(0, 400);
      send('subscribe', { email: email, consentText: consent, source: form.dataset.source || 'footer' })
        .then(function () { note.textContent = t.ok; form.reset(); })
        .catch(function (x) { note.textContent = x && x.code === 'too_many' ? t.many : t.fail; })
        .then(function () { btn.disabled = false; });
    });
  }
  function init() { document.querySelectorAll('[data-newsletter-form]').forEach(wire); }
  window.MIPNewsletter = { send: send, init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
