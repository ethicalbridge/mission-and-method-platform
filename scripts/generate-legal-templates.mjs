// Builds legal-templates.html, the category pages and legacy redirects from assets/legal-templates/catalog.json.
// Run: node scripts/generate-legal-templates.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const catalog = JSON.parse(read('assets/legal-templates/catalog.json'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Reuse the existing page shell (head, nav placeholder, scripts) so styles and gating stay identical.
const shellSrc = read('legal-templates.html');
const headEnd = shellSrc.indexOf('<main id="main">');
const tailStart = shellSrc.indexOf('</main>') + '</main>'.length;
// Pages are open to everyone; each download asks for the access code (assets/js/legal-download-gate.js).
const shellHead = shellSrc.slice(0, headEnd)
  .replace(/<script src="assets\/js\/passcode-gate\.js[^"]*"><\/script>/, '')
  .replace(/<script src="assets\/js\/legal-download-gate\.js[^"]*" defer><\/script>/, '')
  .replace(/<script src="assets\/js\/free-templates\.js[^"]*" defer><\/script>/, '')
  .replace('</head>', '<script src="assets/js/legal-download-gate.js?v=6" defer></script><script src="assets/js/free-templates.js?v=2" defer></script></head>');
const shellTail = shellSrc.slice(tailStart);
const page = (title, description, main) => shellHead
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)} | Method into Impact</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}"><meta name="robots" content="noindex, nofollow">`)
  .replace(/<meta name="robots" content="[^"]*">(?=<meta name="robots")/, '')
  + `<main id="main">${main}</main>` + shellTail;

const notice = `<aside class="legal-notice" aria-labelledby="legal-notice-title"><h2 id="legal-notice-title">Templates, not legal advice</h2><p>Each template is a general starting point written for small purpose-led organisations and entrepreneurs in different countries. Before you adopt, sign or publish one, adapt it to your organisation and have a qualified adviser check it against the law where you operate, your funders’ conditions and your sector’s rules.</p><p>Method into Impact does not guarantee that a template is complete, current, suitable or enforceable for your circumstances, and using one does not create an adviser–client relationship. You are responsible for getting advice and approving the final document. Nothing here limits rights or duties that cannot lawfully be excluded.</p></aside>`;

const howTo = `<section class="legal-review"><h2>How each template works</h2><ol><li><strong>Fill in the yellow fields</strong> with your organisation’s details: names, roles, amounts, time limits and countries.</li><li><strong>Work through the orange “Adapt this” boxes.</strong> Each one explains a decision to make and gives options and country notes. Delete the box when you are done.</li><li><strong>Cut what does not apply</strong>, so the document stays proportionate to your size.</li><li><strong>Ask a qualified adviser</strong> in your country to check the final wording. The Legal Review Checklist helps you prepare.</li><li><strong>Approve, date and share it.</strong> Record the approval, set a review date and make sure people know it exists.</li></ol></section>`;

// The 3 free templates, given with an email on legal-templates.html (assets/js/free-templates.js).
const FREE = ['legal-review-checklist', 'conflict-of-interest-policy', 'mutual-confidentiality-agreement'];
const freeBlock = () => {
  const items = FREE.map(s => catalog.templates.find(t => t.slug === s)).filter(Boolean);
  const covers = items.map(t => `<figure class="ft-cover"><img src="assets/legal-templates/covers/${esc(t.slug)}.webp?v=2" alt="Cover of the ${esc(t.title)} template" width="420" height="594" loading="lazy"><figcaption><b>${esc(t.title)}</b><span>${esc(t.category)}</span></figcaption></figure>`).join('');
  return `<section class="ft-block" id="free-templates" aria-labelledby="ft-title"><div class="ft-text"><span class="ft-pill">Free</span><h2 id="ft-title">Start with three free templates</h2><p>Full, editable Word files, the same quality as the library. Yours to keep.</p><form class="ft-form" novalidate><label class="ft-label" for="ft-email">Your email</label><div class="ft-row"><input class="ft-email" id="ft-email" type="email" autocomplete="email" placeholder="you@organisation.org" required><button class="ft-btn" type="submit">Send me the 3 free templates</button></div><p class="ft-error" aria-live="polite"></p><label class="ft-consent"><input type="checkbox" name="marketing"> Also send me occasional emails about new courses and templates. I can unsubscribe anytime.</label><p class="ft-small">We email you the templates too. We use your email as described in our <a href="legal.html#privacy">privacy notice</a>.</p></form><div class="ft-done" hidden><p class="ft-done-title">Your 3 templates are downloading.</p><p class="ft-mailed" hidden>We have also emailed them to you, so you can find them later.</p><p>Didn't get them? <button class="ft-again" type="button">Download again</button></p></div></div><div class="ft-covers">${covers}</div></section>`;
};
const freeBanner = `<p class="ft-banner"><span class="ft-pill">Free</span> Try three templates free before you buy. <a href="legal-templates.html#free-templates">Get them with your email →</a></p>`;

const hasEs = slug => existsSync(new URL(`scripts/legal-templates/src-es/${slug}.md`, root));
// Excel versions (scripts/legal-templates/excel.py DEFAULT). The files themselves are only in private storage.
const XLSX = ['risk-register', 'delegation-of-authority-matrix', 'records-retention-schedule', 'board-skills-matrix'];
const hasXlsx = slug => XLSX.includes(slug);
const count = n => `${n} editable template${n === 1 ? '' : 's'}`;

const kindClass = l => 'legal-kind-' + String(l || '').toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
function card(t) {
  const meta = [t.pages ? `about ${t.pages} pages` : null, 'Word (.docx)'].filter(Boolean).join(' · ');
  const isFree = FREE.includes(t.slug);
  const isNew = isFree ? '<span class="small-tag legal-free">Free</span>' : (t.status === 'new' ? '<span class="small-tag legal-new">New</span>' : '');
  return `<article class="suite-tool-card legal-card" id="${esc(t.slug)}"><span class="legal-kind ${kindClass(t.label)}">${esc(t.label || t.type)}</span><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><p class="legal-meta"><span class="small-tag">${esc(meta)}</span>${isNew}</p><p class="tool-card-actions">${isFree ? `<a class="button" href="legal-templates.html#free-templates">Get it free →</a>` : `<button class="button ghost" type="button" data-template-file="assets/legal-templates/${esc(t.slug)}.docx" data-template-title="${esc(t.title)}">Buy · $9 · Word template ↓</button>${hasXlsx(t.slug) ? ` <button class="button ghost" type="button" data-template-file="assets/legal-templates/${esc(t.slug)}.xlsx" data-template-title="${esc(t.title)} (Excel)">Excel version ↓</button>` : ''}${hasEs(t.slug) ? ` <button class="button ghost" type="button" data-template-file="assets/legal-templates/es/${esc(t.slug)}.docx" data-template-title="${esc(t.title)} (Español)" lang="es">Español ↓</button>` : ''}`}</p></article>`;
}

const legend = cat => cat.legend ? `<dl class="legal-legend">${cat.legend.map(([k, v]) => `<div><dt><span class="legal-kind ${kindClass(k)}">${esc(k)}</span></dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '';
const all = catalog.templates;
for (const cat of catalog.categories) {
  const items = all.filter(t => t.category === cat.name);
  const groups = cat.groups && cat.groups.length ? cat.groups : [{ name: cat.name, slugs: items.map(t => t.slug) }];
  const jump = groups.length > 1 ? `<nav class="legal-jump" aria-label="Jump to a group">${groups.map(g => `<a href="#${g.id}">${esc(g.name)}</a>`).join('')}</nav>` : '';
  const sections = groups.map(g => {
    const list = g.slugs.map(s => items.find(t => t.slug === s)).filter(Boolean);
    return `<section class="suite-tool-topic legal-topic" id="${esc(g.id || cat.id)}"><h2>${esc(g.name)}</h2><div class="suite-tool-grid">${list.map(card).join('')}</div></section>`;
  }).join('');
  const main = `<div class="catalog legal-catalog legal-category-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="legal-templates.html">Legal Templates</a><span>› ${esc(cat.name)}</span></nav><span class="eyebrow">${count(items.length)}</span><h1>${esc(cat.name)}</h1><p class="lead">${esc(cat.lead)}</p><p class="legal-category-intro">${esc(cat.intro)}</p>${freeBanner}${legend(cat)}${notice}${jump}${sections}${howTo}<p class="legal-back"><a href="legal-templates.html">← All legal template categories</a></p></div>`;
  writeFileSync(new URL(cat.file, root), page(cat.name, cat.lead, main));
}

for (const r of catalog.redirects || []) {
  const main = `<div class="catalog legal-catalog"><h1>${esc(r.title)} have moved</h1><p class="lead">Policies and procedures are now on one page. <a href="${esc(r.to)}">Go to Policies &amp; procedures →</a></p></div>`;
  writeFileSync(new URL(r.file, root), page(r.title, 'Policies and procedures are now on one page.', main)
    .replace('</head>', `<meta http-equiv="refresh" content="0; url=${esc(r.to)}"><link rel="canonical" href="${esc(r.to)}"></head>`));
}

const cards = catalog.categories.map(cat => {
  const n = all.filter(t => t.category === cat.name).length;
  return `<article class="legal-category-card"><span class="eyebrow">${count(n)}</span><h2>${esc(cat.name)}</h2><p>${esc(cat.lead)}</p><a class="button ghost" href="${esc(cat.file)}">Explore ${esc(cat.name)} →</a></article>`;
}).join('');
const EDITIONS_LATEST = '2026-10';
const indexMain = `<div class="catalog legal-catalog"><span class="eyebrow">Document library · ${all.length} editable templates</span><h1>Legal Templates</h1><p class="lead">${esc(catalog.lead)}</p>${freeBlock()}${notice}<section class="legal-category-grid" aria-label="Legal template categories">${cards}</section>${howTo}<p class="legal-edition">Template edition ${EDITIONS_LATEST} · <a href="legal-templates-changelog.html">What changed</a></p></div>`;
writeFileSync(new URL('legal-templates.html', root), page('Legal Templates', catalog.lead, indexMain));
// Public change log of the template library. Add a new edition at the top when templates change,
// and update EDITION in scripts/legal-templates/build.cjs (printed in every template footer).
const EDITIONS = [
  { edition: '2026-10', date: '29 October 2026', notes: [
    'First full edition: 57 editable Word templates in four sections, each with model wording, yellow fields and “Adapt this” guidance boxes.',
    'New: Governing Document Guide and Model Constitution; Board Meeting Agenda and Minutes; Board Member Role Description; Board Skills Matrix; Health, Safety and Lone Working Policy; Business Continuity and Crisis Plan.',
    'Policies and procedures now sit together; four procedures added (Disciplinary and Grievance, Safer Recruitment, Finance Procedures, Policy Approval and Review).',
    'Excel versions of the Risk Register, Delegation of Authority Matrix, Records Retention Schedule and Board Skills Matrix.',
    'Every template footer shows its edition, so you can tell which version you adapted.',
    'Added later in the edition: Gift and Donation Agreement, and Grant Acceptance Checklist (59 templates in all).',
  ] },
];
const logMain = `<div class="catalog legal-catalog"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="legal-templates.html">Legal Templates</a><span>› Change log</span></nav><span class="eyebrow">Template library</span><h1>Change log</h1><p class="lead">What changed in each edition of the template library. The edition is printed in the footer of every template, so you can check which version you adapted.</p>${EDITIONS.map(e => `<section class="legal-review" id="edition-${esc(e.edition)}"><h2>Edition ${esc(e.edition)} · ${esc(e.date)}</h2><ul>${e.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></section>`).join('')}<p class="legal-back"><a href="legal-templates.html">← All legal template categories</a></p></div>`;
writeFileSync(new URL('legal-templates-changelog.html', root), page('Template change log', 'What changed in each edition of the Method into Impact template library.', logMain));

console.log(`Wrote ${catalog.categories.length + 1} pages for ${all.length} templates`);
