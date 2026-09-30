// Evidence Library: transform each resource-card into a compact click-to-expand row.
(function(){
  if (!document.body.classList.contains('evidence-page')) return;

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

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
})();
