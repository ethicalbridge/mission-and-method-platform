// Adds link-preview tags (Open Graph and Twitter) to public pages, from each page's own <title> and meta description.
// Idempotent: replaces the block if it is already there. Run after the page generators:  node scripts/add-og.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const SITE = 'https://methodintoimpact.com';
const IMAGE = SITE + '/assets/email/logo.png';
const root = new URL('../', import.meta.url);
const esc = s => s.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/"/g, '&quot;');
const files = readdirSync(root).filter(f => f.endsWith('.html'));
let n = 0;
for (const f of files) {
  const p = new URL(f, root); let s = readFileSync(p, 'utf8');
  if (/http-equiv="refresh"/.test(s) || f === 'admin.html') continue;
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title || !desc) continue;
  const url = SITE + '/' + (f === 'index.html' ? '' : f);
  const block = `<!-- og --><meta property="og:type" content="website"><meta property="og:site_name" content="Method into Impact"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${IMAGE}"><meta name="twitter:card" content="summary"><!-- /og -->`;
  s = s.replace(/<!-- og -->.*?<!-- \/og -->/s, '');
  s = s.replace(/(<meta name="description" content="[^"]*">)/, `$1${block}`);
  writeFileSync(p, s); n++;
}
console.log(`link previews: ${n} pages`);
