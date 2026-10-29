// Prints the SQL that keeps the database product list (public.mip_products) in step with the website:
// courses from course-data.js, prices and packs from pricing-config.js, templates from the template catalog.
// Run after adding a course, a template or a pack, and execute the printed SQL in Supabase:
//   node scripts/sync-products.mjs > /tmp/products.sql
// Product keys:
//   entrepreneurs-clarify … (one course), entrepreneurs-all (Founder Pathway),
//   clarify … (organisation courses), organisations-all (Organisation Pathway),
//   template:<slug> (one template: English and Spanish Word files, and the Excel version if there is one),
//   pack-policies, pack-contracts, pack-consent, pack-governance, essentials, full-library.
import { readFileSync } from 'node:fs';
import { catalog, PACKS } from '../pricing-config.js';
import { phases, founderPhases } from '../course-data.js';

const lib = JSON.parse(readFileSync(new URL('../assets/legal-templates/catalog.json', import.meta.url), 'utf8'));
const tpl = s => 'template:' + s;
const rows = [];
const add = (key, kind, name, priceKey, includes = [], files = []) => rows.push({ key, kind, name, priceKey, includes, files });

for (const p of founderPhases) add(p.id, 'course', `Course ${p.number} · ${p.name} (entrepreneurs)`, 'course');
add('entrepreneurs-all', 'pathway', 'Founder Pathway · all four courses', 'founder-pathway', founderPhases.map(p => p.id));
for (const p of phases) add(p.id, 'course', `Course ${p.number} · ${p.name} (organisations)`, 'course');
add('organisations-all', 'pathway', 'Organisation Pathway · all five courses', 'org-pathway', phases.map(p => p.id));

for (const t of lib.templates) add(tpl(t.slug), 'template', t.title, 'single-template');
const zips = { 'pack-policies': 'policies-pack', 'pack-contracts': 'contracts-pack', 'pack-consent': 'consent-pack', 'pack-governance': 'governance-pack', essentials: 'start-up-legal-essentials', 'full-library': 'full-template-library' };
const zipFiles = k => [`packs/${zips[k]}.zip`, `packs/${zips[k]}-es.zip`];
for (const id of PACKS) add(id, 'pack', catalog[id].name, id, lib.templates.filter(t => t.category === catalog[id].category).map(t => tpl(t.slug)), zipFiles(id));
const known = new Set(lib.templates.map(t => t.slug));
for (const s of catalog.essentials.templates) if (!known.has(s)) throw new Error(`essentials: unknown template ${s}`);
add('essentials', 'pack', 'Start-up Legal Essentials', 'essentials', catalog.essentials.templates.map(tpl), zipFiles('essentials'));
add('full-library', 'pack', 'Full Template Library', 'full-library', lib.templates.map(t => tpl(t.slug)), zipFiles('full-library'));

for (const r of rows) if (!catalog[r.priceKey]) throw new Error(`${r.key}: no price ${r.priceKey}`);
const q = s => `'${String(s).replace(/'/g, "''")}'`;
const arr = a => a.length ? `array[${a.map(q).join(',')}]::text[]` : `'{}'::text[]`;
console.log(`insert into public.mip_products (key, kind, name, price_key, includes, files, active, updated_at) values
${rows.map(r => `(${q(r.key)},${q(r.kind)},${q(r.name)},${q(r.priceKey)},${arr(r.includes)},${arr(r.files)},true,now())`).join(',\n')}
on conflict (key) do update set kind=excluded.kind, name=excluded.name, price_key=excluded.price_key, includes=excluded.includes, files=excluded.files, active=true, updated_at=now();
update public.mip_products set active=false, updated_at=now() where key not in (${rows.map(r => q(r.key)).join(',')});`);
console.error(`${rows.length} products`);
