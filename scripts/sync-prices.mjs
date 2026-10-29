// Rewrites every price, saving and template count on prices.html from pricing-config.js
// and assets/legal-templates/catalog.json, so the page never drifts from the price list.
// Run after changing prices or adding templates:  node scripts/sync-prices.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { catalog, priceOf, savings, BANDS, PACKS, LAUNCH_PRICE_ENDS_TEXT } from '../pricing-config.js';

const root = new URL('../', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const lib = JSON.parse(read('assets/legal-templates/catalog.json'));

const counts = { library: lib.templates.length };
for (const id of PACKS) counts[id] = lib.templates.filter(t => t.category === catalog[id].category).length;

const perBand = fn => BANDS.map((_, i) => fn(i));
function valuesFor(key) {
  const [a, b] = key.split('.');
  if (a === 'save') {
    if (b.startsWith('pack-')) return savings.pack(b, counts[b]);
    if (b === 'packs-total') return savings['packs-total']();
    if (!savings[b]) throw new Error(`No saving rule for ${b}`);
    return savings[b]();
  }
  if (!catalog[a]) throw new Error(`Unknown price key ${key}`);
  return perBand(i => priceOf(a, i, b));
}
const fmt = n => '$' + Number(n).toLocaleString('en-US');

let html = read('prices.html');
let n = 0;
html = html.replace(/data-price-key="([^"]+)" data-prices="[0-9,]*">[^<]*</g, (_, key) => {
  const v = valuesFor(key); n++;
  return `data-price-key="${key}" data-prices="${v.join(',')}">${fmt(v[0])}<`;
});
let c = 0;
html = html.replace(/<span data-count="([^"]+)">\d+<\/span>/g, (_, key) => {
  if (!(key in counts)) throw new Error(`Unknown count ${key}`);
  c++;
  return `<span data-count="${key}">${counts[key]}</span>`;
});
html = html.replace(/<span data-founding-until>[^<]*<\/span>/g, `<span data-founding-until>${LAUNCH_PRICE_ENDS_TEXT}</span>`);
writeFileSync(new URL('prices.html', root), html);
console.log(`prices.html: ${n} prices and ${c} template counts synced (library ${counts.library}: ${PACKS.map(p => `${p.replace('pack-', '')} ${counts[p]}`).join(', ')})`);
