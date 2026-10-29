/* Free templates: one email form on legal-templates.html gives the 3 free templates.
   The 3 files download straight away and are also emailed (function mip-newsletter, via Brevo).
   The newsletter box is optional and unticked: ticking it adds a "Yes, keep me posted" button to that email,
   and only that click adds the person to the newsletter list (double opt-in). Uses assets/js/newsletter.js. */
(function () {
  'use strict';
  var KEY = 'mip.free-templates.v1';
  var FILES = [
    'assets/legal-templates/legal-review-checklist.docx',
    'assets/legal-templates/conflict-of-interest-policy.docx',
    'assets/legal-templates/mutual-confidentiality-agreement.docx'
  ];

  function remembered() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }

  function deliver() {
    FILES.forEach(function (file, i) {
      setTimeout(function () {
        var a = document.createElement('a');
        a.href = file;
        a.setAttribute('download', file.split('/').pop());
        document.body.appendChild(a); a.click(); a.remove();
      }, i * 400);
    });
  }

  function init() {
    var box = document.getElementById('free-templates');
    if (!box) return;
    var form = box.querySelector('.ft-form');
    var done = box.querySelector('.ft-done');
    var input = box.querySelector('.ft-email');
    var err = box.querySelector('.ft-error');
    var again = box.querySelector('.ft-again');

    function showDone() { form.hidden = true; done.hidden = false; }
    if (remembered()) showDone();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        err.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      err.textContent = '';
      remember();
      deliver();
      showDone();
      var box2 = form.querySelector('[name=marketing]');
      var consent = form.querySelector('.ft-consent');
      var payload = { email: v, marketing: !!(box2 && box2.checked), consentText: consent ? consent.textContent.replace(/\s+/g, ' ').trim() : '' };
      var go = function () { return window.MIPNewsletter.send('free-templates', payload); };
      var p = window.MIPNewsletter ? go() : new Promise(function (res) { var sc = document.createElement('script'); sc.src = 'assets/js/newsletter.js?v=1'; sc.onload = res; document.head.appendChild(sc); }).then(go);
      var note = done.querySelector('.ft-mailed');
      p.then(function (j) { if (note && j && j.emailed) note.hidden = false; }).catch(function () {});
    });
    if (again) again.addEventListener('click', deliver);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
