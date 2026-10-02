// Home redesign: scroll-reveal + counter animations.
// Zero dependencies. Honours prefers-reduced-motion.

(function(){
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Scroll reveal: fade+slide elements with .reveal when they enter the viewport
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length){
    if (reduce || !('IntersectionObserver' in window)){
      reveals.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }

  // --- Counter animation for hero facts (b[data-counter="N"])
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length){
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const animate = el => {
      const target = parseInt(el.dataset.counter, 10) || 0;
      const prefix = el.dataset.prefix || '';
      const dur = 1200;
      if (reduce){ el.textContent = prefix + target; return; }
      const start = performance.now();
      const step = now => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = prefix + Math.round(target * easeOutCubic(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)){
      counters.forEach(animate);
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => io.observe(el));
    }
  }

  // --- Smooth-scroll for in-page anchor links (ignored if browser already smooth)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
