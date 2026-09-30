// Evidence Library: group lessons by module + click-to-expand cards.
(function(){
  if (!document.body.classList.contains('evidence-page')) return;

  // ---------- 1. Group lessons by module ----------
  const moduleNames = {
    '1':'Strategic Foundation',
    '2':'Theory of Change',
    '3':'Team, Structure & Coordination',
    '4':'Organisation Internal Systems',
    '5':'Policies & Procedures',
    '6':'Strategy to Action, Timeline & Gantt',
    '7':'Business Model',
    '8':'Fundraising, Sponsors & Partnerships',
  };

  const container = document.getElementById('library-results');
  if (container && !container.dataset.grouped) {
    container.dataset.grouped = '1';
    const lessons = Array.from(container.querySelectorAll('.library-lesson'));
    const byModule = new Map();
    lessons.forEach(l => {
      const m = l.dataset.module || 'other';
      if (!byModule.has(m)) byModule.set(m, []);
      byModule.get(m).push(l);
    });

    // Clear container and rebuild with module wrappers
    container.innerHTML = '';
    byModule.forEach((lessonEls, moduleId) => {
      const moduleSection = document.createElement('section');
      moduleSection.className = 'ev-module';
      moduleSection.dataset.module = moduleId;

      const totalResources = lessonEls.reduce((s, l) => s + l.querySelectorAll('.resource-card').length, 0);

      const header = document.createElement('div');
      header.className = 'ev-module-header';
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
      header.innerHTML = `
        <div class="ev-module-num">Module ${moduleId}</div>
        <div class="ev-module-title-block">
          <h2>${escapeHtml(moduleNames[moduleId] || 'Module ' + moduleId)}</h2>
          <div class="ev-module-meta">${lessonEls.length} lesson${lessonEls.length === 1 ? '' : 's'} · ${totalResources} resource${totalResources === 1 ? '' : 's'}</div>
        </div>
        <div class="ev-module-expand" aria-hidden="true">+</div>
      `;
      moduleSection.appendChild(header);

      const body = document.createElement('div');
      body.className = 'ev-module-body';
      lessonEls.forEach(l => body.appendChild(l));
      moduleSection.appendChild(body);

      // Toggle expand
      header.addEventListener('click', () => {
        moduleSection.classList.toggle('expanded');
        header.setAttribute('aria-expanded', moduleSection.classList.contains('expanded') ? 'true' : 'false');
      });
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          moduleSection.classList.toggle('expanded');
          header.setAttribute('aria-expanded', moduleSection.classList.contains('expanded') ? 'true' : 'false');
        }
      });

      container.appendChild(moduleSection);
    });
  }

  // ---------- 2. Transform resource cards ----------
  const cards = document.querySelectorAll('.resource-card');
  cards.forEach(card => {
    if (card.dataset.enhanced === '1') return;
    card.dataset.enhanced = '1';

    const title = card.querySelector('h3')?.textContent?.trim() || '';
    const publisher = card.querySelector('p.subtle')?.textContent?.trim() || '';
    const category = card.querySelector('p.resource-category')?.textContent?.trim() || '';
    const type = card.querySelector('.resource-type')?.textContent?.trim() || '';
    const level = card.querySelector('.resource-level')?.textContent?.trim() || '';

    // Original content elements to move into the collapsible body
    // The main description is any <p> that isn't .subtle, .resource-category or .resource-use
    const bodyEls = [];
    card.querySelectorAll(':scope > p, :scope > .resource-use, :scope > .resource-tags, :scope > .resource-actions').forEach(el => {
      if (el.classList.contains('subtle')) return;
      if (el.classList.contains('resource-category')) return;
      bodyEls.push(el.cloneNode(true));
    });

    // Build compact header
    const header = document.createElement('div');
    header.className = 'resource-header';
    header.innerHTML = `
      <div class="resource-header-tags">
        ${type ? `<span class="resource-type">${type}</span>` : ''}
        ${level ? `<span class="resource-level">${level}</span>` : ''}
      </div>
      <div class="resource-title-block">
        <h3>${escapeHtml(title)}</h3>
        <div class="resource-meta">
          <span class="resource-publisher">${escapeHtml(publisher)}</span>
          ${category ? `<span class="resource-category-inline">${escapeHtml(category)}</span>` : ''}
        </div>
      </div>
      <span></span>
      <div class="resource-expand" aria-hidden="true">+</div>
    `;

    // Build expandable body
    const body = document.createElement('div');
    body.className = 'resource-body';
    bodyEls.forEach(el => body.appendChild(el));

    // Wipe original card content and re-mount
    card.innerHTML = '';
    card.appendChild(header);
    card.appendChild(body);

    // Click to toggle
    card.addEventListener('click', (e) => {
      // let links inside body still work
      if (e.target.closest('a')) return;
      card.classList.toggle('expanded');
    });

    // Keyboard access
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', card.classList.contains('expanded') ? 'true' : 'false');
      }
    });
    // Sync aria-expanded on click too
    card.addEventListener('click', () => {
      card.setAttribute('aria-expanded', card.classList.contains('expanded') ? 'true' : 'false');
    });
  });

  // ---------- 3. Sync module visibility + auto-expand on filter ----------
  const searchInput = document.getElementById('resource-search');
  const filterInputs = ['module','type','level','tag'].map(n => document.getElementById(n + '-filter')).filter(Boolean);
  const modules = document.querySelectorAll('.ev-module');

  function anyFilterActive(){
    if (searchInput && searchInput.value.trim()) return true;
    return filterInputs.some(i => i && i.value);
  }

  function syncModules(){
    const filtering = anyFilterActive();
    modules.forEach(m => {
      const lessonsInside = m.querySelectorAll('.library-lesson');
      const hasVisible = Array.from(lessonsInside).some(l => !l.hidden);
      m.hidden = !hasVisible;
      // Auto-expand when filtering; keep collapsed by default otherwise
      if (filtering && hasVisible) {
        m.classList.add('expanded');
        m.querySelector('.ev-module-header')?.setAttribute('aria-expanded', 'true');
      } else if (!filtering) {
        m.classList.remove('expanded');
        m.querySelector('.ev-module-header')?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hook into all filter events
  const applyAndSync = () => setTimeout(syncModules, 0);
  if (searchInput) searchInput.addEventListener('input', applyAndSync);
  filterInputs.forEach(i => i.addEventListener('change', applyAndSync));
  document.getElementById('clear-filters')?.addEventListener('click', applyAndSync);

  // Initial sync (in case a filter is already applied from URL param)
  setTimeout(syncModules, 50);

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();
