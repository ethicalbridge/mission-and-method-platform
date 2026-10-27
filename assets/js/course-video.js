// Course, module and lesson videos: English or Spanish version, with English and Spanish subtitle tracks.
// Markup: <video data-video-base="assets/videos/…/name"> (or data-course-video="<course id>" for course intros)
// inside an element with data-video-box that holds the [data-video-lang] buttons.
// Starts in the site language (EN/ES switcher, stored as "mim-lang"); the buttons switch it.
(function () {
  'use strict';
  var KEY = 'mim-lang';
  function siteLang() {
    try { var v = localStorage.getItem(KEY); if (v === 'es' || v === 'en') return v; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }
  function setup(video) {
    if (video.dataset.videoReady) return;
    video.dataset.videoReady = '1';
    var base = video.dataset.videoBase || ('assets/videos/course-' + video.dataset.courseVideo + '-intro');
    var box = video.closest('[data-video-box]') || video.closest('.course-intro-video');
    var buttons = box ? box.querySelectorAll('[data-video-lang]') : [];
    var label = video.getAttribute('aria-label') || '';
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
      video.setAttribute('aria-label', label + (lang === 'es' ? ' (Spanish version)' : ' (English version)'));
    }
    for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener('click', function (event) { use(event.currentTarget.dataset.videoLang); });
    document.addEventListener('mim:lang', function (event) { if (event.detail === 'en' || event.detail === 'es') use(event.detail); });
    use(siteLang());
  }
  function init(root) { var list = (root || document).querySelectorAll('video[data-course-video], video[data-video-base]'); for (var i = 0; i < list.length; i++) setup(list[i]); }
  window.MIMVideo = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
