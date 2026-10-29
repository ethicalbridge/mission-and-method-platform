/* Free templates: one email form on legal-templates.html gives the 3 free templates.
   PREVIEW: email delivery is not connected yet, so after a valid email the 3 files download
   straight away and nothing is stored on a server. When the Supabase function and Resend are
   set up, replace deliver() with a POST to the `request-free-templates` function. */
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
    });
    if (again) again.addEventListener('click', deliver);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
