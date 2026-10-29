// Builds the downloadable bundles (.zip) for the four packs, Start-up Legal Essentials and the Full Template Library.
// Contents come from assets/legal-templates/catalog.json (pack = category) and pricing-config.js (Essentials list).
// Run after rebuilding templates:  node scripts/legal-templates/packs.mjs
import { existsSync, mkdirSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { catalog, PACKS } from '../../pricing-config.js';

const root = new URL('../../', import.meta.url).pathname;
const lib = JSON.parse((await import('node:fs')).readFileSync(join(root, 'assets/legal-templates/catalog.json'), 'utf8'));
const outDir = join(root, 'assets/legal-templates/packs');
mkdirSync(outDir, { recursive: true });

const bySlug = Object.fromEntries(lib.templates.map(t => [t.slug, t]));
const bundles = [
  ...PACKS.map(id => ({ id, file: id.replace('pack-', '') + '-pack', title: catalog[id].name, slugs: lib.templates.filter(t => t.category === catalog[id].category).map(t => t.slug) })),
  { id: 'essentials', file: 'start-up-legal-essentials', title: 'Start-up Legal Essentials', slugs: catalog.essentials.templates },
  { id: 'full-library', file: 'full-template-library', title: 'Full Template Library', slugs: lib.templates.map(t => t.slug) },
];

for (const b of bundles) {
  const work = join(tmpdir(), 'mii-pack-' + b.file);
  rmSync(work, { recursive: true, force: true });
  const folder = join(work, b.file);
  mkdirSync(folder, { recursive: true });
  const lines = [];
  for (const slug of b.slugs) {
    const t = bySlug[slug];
    if (!t) throw new Error(`${b.id}: unknown template ${slug}`);
    copyFileSync(join(root, 'assets/legal-templates', slug + '.docx'), join(folder, slug + '.docx'));
    const xlsx = join(root, 'assets/legal-templates', slug + '.xlsx');
    if (existsSync(xlsx)) copyFileSync(xlsx, join(folder, slug + '.xlsx'));
    lines.push(`- ${t.title} (${t.category})${existsSync(xlsx) ? ' · Word and Excel' : ''}`);
  }
  writeFileSync(join(folder, 'READ ME FIRST.txt'), [
    `${b.title} · Method into Impact`, '',
    `${b.slugs.length} editable Word templates:`, ...lines, '',
    'How to use: fill in the yellow fields, work through the orange "Adapt this" boxes, cut what does not apply, and have a qualified adviser in your country check the final version.', '',
    'These are templates, not legal advice. Licensed for use within one organisation; please do not resell or republish them.',
    'Questions: hello@methodintoimpact.com',
  ].join('\r\n'));
  const zip = join(outDir, b.file + '.zip');
  rmSync(zip, { force: true });
  execFileSync('zip', ['-q', '-r', '-X', zip, b.file], { cwd: work });
  rmSync(work, { recursive: true, force: true });
  console.log(`built packs/${b.file}.zip (${b.slugs.length} templates)`);
}
