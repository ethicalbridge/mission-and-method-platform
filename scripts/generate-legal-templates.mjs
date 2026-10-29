// Builds legal-templates.html and the five category pages from assets/legal-templates/catalog.json.
// Run: node scripts/generate-legal-templates.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const catalog = JSON.parse(read('assets/legal-templates/catalog.json'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Reuse the existing page shell (head, nav placeholder, scripts) so styles and gating stay identical.
const shellSrc = read('legal-templates.html');
const headEnd = shellSrc.indexOf('<main id="main">');
const tailStart = shellSrc.indexOf('</main>') + '</main>'.length;
const shellHead = shellSrc.slice(0, headEnd);
const shellTail = shellSrc.slice(tailStart);
const page = (title, description, main) => shellHead
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)} | Method into Impact</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}"><meta name="robots" content="noindex, nofollow">`)
  .replace(/<meta name="robots" content="[^"]*">(?=<meta name="robots")/, '')
  + `<main id="main">${main}</main>` + shellTail;

const notice = `<aside class="legal-notice" aria-labelledby="legal-notice-title"><h2 id="legal-notice-title">Templates, not legal advice</h2><p>Each template is a general starting point written for small purpose-led organisations in different countries. Before you adopt, sign or publish one, adapt it to your organisation and have a qualified adviser check it against the law where you operate, your funders’ conditions and your sector’s rules.</p><p>Method into Impact does not guarantee that a template is complete, current, suitable or enforceable for your circumstances, and using one does not create an adviser–client relationship. You are responsible for getting advice and approving the final document. Nothing here limits rights or duties that cannot lawfully be excluded.</p></aside>`;

const howTo = `<section class="legal-review"><h2>How each template works</h2><ol><li><strong>Fill in the yellow fields</strong> with your organisation’s details: names, roles, amounts, time limits and countries.</li><li><strong>Work through the orange “Adapt this” boxes.</strong> Each one explains a decision to make and gives options and country notes. Delete the box when you are done.</li><li><strong>Cut what does not apply</strong>, so the document stays proportionate to your size.</li><li><strong>Ask a qualified adviser</strong> in your country to check the final wording. The Legal Review Checklist helps you prepare.</li><li><strong>Approve, date and share it.</strong> Record the approval, set a review date and make sure people know it exists.</li></ol></section>`;

const count = n => `${n} editable template${n === 1 ? '' : 's'}`;

function card(t) {
  const meta = [t.type, t.pages ? `about ${t.pages} pages` : null, 'Word (.docx)'].filter(Boolean).join(' · ');
  const isNew = t.status === 'new' ? '<span class="small-tag legal-new">New</span>' : '';
  return `<article class="suite-tool-card legal-card"><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><p class="legal-meta"><span class="small-tag">${esc(meta)}</span>${isNew}</p><p class="tool-card-actions"><a class="button ghost" href="assets/legal-templates/${esc(t.slug)}.docx" download>Download Word template ↓</a></p></article>`;
}

const all = catalog.templates;
for (const cat of catalog.categories) {
  const items = all.filter(t => t.category === cat.name);
  const groups = cat.groups && cat.groups.length ? cat.groups : [{ name: cat.name, slugs: items.map(t => t.slug) }];
  const jump = groups.length > 1 ? `<nav class="legal-jump" aria-label="Jump to a group">${groups.map(g => `<a href="#${g.id}">${esc(g.name)}</a>`).join('')}</nav>` : '';
  const sections = groups.map(g => {
    const list = g.slugs.map(s => items.find(t => t.slug === s)).filter(Boolean);
    return `<section class="suite-tool-topic legal-topic" id="${esc(g.id || cat.id)}"><h2>${esc(g.name)}</h2><div class="suite-tool-grid">${list.map(card).join('')}</div></section>`;
  }).join('');
  const main = `<div class="catalog legal-catalog legal-category-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="legal-templates.html">Legal Templates</a><span>› ${esc(cat.name)}</span></nav><span class="eyebrow">${count(items.length)}</span><h1>${esc(cat.name)}</h1><p class="lead">${esc(cat.lead)}</p><p class="legal-category-intro">${esc(cat.intro)}</p>${notice}${jump}${sections}${howTo}<p class="legal-back"><a href="legal-templates.html">← All legal template categories</a></p></div>`;
  writeFileSync(new URL(cat.file, root), page(cat.name, cat.lead, main));
}

const cards = catalog.categories.map(cat => {
  const n = all.filter(t => t.category === cat.name).length;
  return `<article class="legal-category-card"><span class="eyebrow">${count(n)}</span><h2>${esc(cat.name)}</h2><p>${esc(cat.lead)}</p><a class="button ghost" href="${esc(cat.file)}">Explore ${esc(cat.name)} →</a></article>`;
}).join('');
const indexMain = `<div class="catalog legal-catalog"><span class="eyebrow">Document library · ${all.length} editable templates</span><h1>Legal Templates</h1><p class="lead">${esc(catalog.lead)}</p>${notice}<section class="legal-category-grid" aria-label="Legal template categories">${cards}</section>${howTo}</div>`;
writeFileSync(new URL('legal-templates.html', root), page('Legal Templates', catalog.lead, indexMain));
console.log(`Wrote ${catalog.categories.length + 1} pages for ${all.length} templates`);
