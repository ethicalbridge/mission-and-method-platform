// Course introduction videos: English or Spanish version, with English and Spanish subtitle tracks.
// Starts in the site language (EN/ES switcher, stored as "mim-lang"); the buttons under the video switch it.
(function () {
  'use strict';
  var KEY = 'mim-lang';
  function siteLang() {
    try { var v = localStorage.getItem(KEY); if (v === 'es' || v === 'en') return v; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }
  function setup(video) {
    var id = video.dataset.courseVideo, base = 'assets/videos/course-' + id + '-intro';
    var box = video.closest('.course-intro-video');
    var buttons = box ? box.querySelectorAll('[data-video-lang]') : [];
    var current = null;
    function use(lang) {
      if (lang === current) return;
      current = lang;
      var sfx = lang === 'es' ? '-es' : '';
      var wasPlaying = !video.paused;
      video.poster = base + sfx + '.jpg';
      video.querySelector('source').src = base + sfx + '.mp4';
      video.load();
      if (wasPlaying) video.play().catch(function () {});
      for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', buttons[i].dataset.videoLang === lang ? 'true' : 'false');
      video.setAttribute('aria-label', video.getAttribute('aria-label').replace(/ \((English|Spanish) version\)$/, '') + (lang === 'es' ? ' (Spanish version)' : ' (English version)'));
    }
    for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener('click', function (event) { use(event.currentTarget.dataset.videoLang); });
    document.addEventListener('mim:lang', function (event) { if (event.detail === 'en' || event.detail === 'es') use(event.detail); });
    use(siteLang());
  }
  function boot() { var list = document.querySelectorAll('video[data-course-video]'); for (var i = 0; i < list.length; i++) setup(list[i]); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
