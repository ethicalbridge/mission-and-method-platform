// Publishes paid template files to private storage through the template-files function, then rebuilds the pack zips.
//
//   IMPORT_TOKEN=... node scripts/legal-templates/publish.mjs --sha <commit> --slugs a,b --packs pack-policies,full-library
//
// --sha    a commit on GitHub that contains the built files (assets/legal-templates/<slug>.docx, es/<slug>.docx, <slug>.xlsx).
//          Paid files are git-ignored, so commit them with `git add -f` to a short-lived branch, push it, use that
//          commit here, then delete the branch.
// --slugs  templates to copy into storage (English, Spanish and Excel where they exist).
// --packs  bundles to rebuild from the files in storage: pack-policies, pack-contracts, pack-consent, pack-governance,
//          essentials, full-library (English and Spanish zip for each).
// The token is never written anywhere; only its SHA-256 is stored in the function.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { catalog, PACKS } from '../../pricing-config.js';

const FN = 'https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/template-files';
const root = new URL('../../', import.meta.url).pathname;
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : ''; };
const token = process.env.IMPORT_TOKEN;
if (!token) throw new Error('Set IMPORT_TOKEN');

const lib = JSON.parse(readFileSync(join(root, 'assets/legal-templates/catalog.json'), 'utf8'));
const esTitle = slug => {
  try { return (readFileSync(join(root, 'scripts/legal-templates/src-es', slug + '.md'), 'utf8').match(/^title:\s*(.*)$/m) || [])[1]; }
  catch { return null; }
};
const call = async body => {
  const r = await fetch(FN, { method: 'POST', headers: { 'content-type': 'application/json', 'x-import-token': token, origin: 'https://methodintoimpact.com' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${body.action} failed: ${r.status} ${JSON.stringify(j)}`);
  return j;
};

const sha = arg('sha'), slugs = arg('slugs').split(',').filter(Boolean);
if (slugs.length) {
  if (!sha) throw new Error('--sha is needed with --slugs');
  const { results } = await call({ action: 'import', sha, slugs });
  console.log('import', results);
  if (Object.values(results).some(v => v !== 'ok')) throw new Error('some files did not import');
}

const BUNDLES = {
  ...Object.fromEntries(PACKS.map(id => [id, { file: id.replace('pack-', '') + '-pack', title: catalog[id].name,
    slugs: lib.templates.filter(t => t.category === catalog[id].category).map(t => t.slug) }])),
  essentials: { file: 'start-up-legal-essentials', title: 'Start-up Legal Essentials', slugs: catalog.essentials.templates },
  'full-library': { file: 'full-template-library', title: 'Full Template Library', slugs: lib.templates.map(t => t.slug) },
};
const bySlug = Object.fromEntries(lib.templates.map(t => [t.slug, t]));
const readme = (b, lang) => (lang === 'es' ? [
  `${b.title} · Method into Impact`, '',
  `${b.slugs.length} plantillas editables en Word:`, ...b.slugs.map(s => `- ${esTitle(s) || bySlug[s].title}`), '',
  'Cómo usarlas: completa los campos amarillos, trabaja cada recuadro naranja "Adáptalo", elimina lo que no aplique y pide a una persona asesora cualificada de tu país que revise la versión final.', '',
  'Son plantillas, no asesoramiento legal. Licencia de uso para una sola organización; no las revendas ni las republiques.',
  'Preguntas: hello@methodintoimpact.com',
] : [
  `${b.title} · Method into Impact`, '',
  `${b.slugs.length} editable Word templates:`, ...b.slugs.map(s => `- ${bySlug[s].title} (${bySlug[s].category})`), '',
  'How to use: fill in the yellow fields, work through the orange "Adapt this" boxes, cut what does not apply, and have a qualified adviser in your country check the final version.', '',
  'These are templates, not legal advice. Licensed for use within one organisation; please do not resell or republish them.',
  'Questions: hello@methodintoimpact.com',
]).join('\r\n');

for (const id of arg('packs').split(',').filter(Boolean)) {
  const b = BUNDLES[id];
  if (!b) throw new Error('unknown pack ' + id);
  for (const lang of ['en', 'es']) {
    const file = lang === 'en' ? b.file : b.file + '-es';
    const res = await call({ action: 'pack', dest: `packs/${file}.zip`, folder: file, readme: readme(b, lang), lang, slugs: b.slugs });
    console.log('pack', res);
    if (res.error) throw new Error(res.error);
  }
}
