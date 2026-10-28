// Writes one small page per lesson at <course>/<lesson-title>.html, so every lesson has a readable address
// (methodintoimpact.com/clarify/organisation-profile). Each page is learn.html with the lesson named on <body>;
// learning.js renders it. Old learn.html?module=&lesson= links still work and switch to the readable address.
// Run after adding or renaming lessons: node scripts/generate-lesson-pages.mjs
import {readFileSync,writeFileSync,mkdirSync,readdirSync,rmSync,existsSync} from 'node:fs';
import {allModules,allCourses,lessonPath,courseFor,lessonSlug,modules} from '../course-data.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const shell=readFileSync('learn.html','utf8');
if(!shell.includes('<base href="/">'))throw new Error('learn.html needs <base href="/"> so lesson pages in folders load the site files');
// Remove pages for lessons that no longer exist (only files this script made)
for(const p of [...allCourses,{id:'idea'}])if(existsSync(p.id))for(const f of readdirSync(p.id))if(f.endsWith('.html')&&readFileSync(`${p.id}/${f}`,'utf8').includes('data-lesson-page'))rmSync(`${p.id}/${f}`);
let count=0;
for(const m of allModules)for(const [i,l] of m.lessons.entries()){
 const path=lessonPath(m,l),c=courseFor(m);
 const title=`${m.no??m.id}.${i+1} ${l.title} · Course ${c.number} ${c.name}${c.track==='entrepreneurs'?' for entrepreneurs':''} | Method into Impact`;
 const html=shell.replace(/<title>[^<]*<\/title>/,`<title>${e(title)}</title><link rel="canonical" href="https://methodintoimpact.com/${path}">`)
  .replace('<body data-page=""',`<body data-lesson-page data-module="${m.id}" data-lesson="${e(l.id)}" data-page=""`);
 mkdirSync(c.id,{recursive:true});writeFileSync(`${path}.html`,html);count++;
}
// Entrepreneurs' module reviews were renamed "Recap: …": keep their earlier addresses working.
let moved=0;
for(const m of allModules.filter(x=>x.track==='entrepreneurs')){
 const l=m.lessons.at(-1),org=modules.find(x=>x.id===m.mirror)?.lessons.at(-1),c=courseFor(m);
 if(!l?.review||!org)continue;
 const old=`${c.id}/${lessonSlug(org)}`,now=lessonPath(m,l);
 if(old===now||existsSync(`${old}.html`))continue;
 writeFileSync(`${old}.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><!-- data-lesson-page redirect --><meta http-equiv="refresh" content="0; url=/${now}"><link rel="canonical" href="/${now}"><title>Moved | Method into Impact</title><script>location.replace('/${now}'+location.search+location.hash);</script></head><body><p>This lesson has moved. <a href="/${now}">Continue →</a></p></body></html>`);moved++;
}
console.log(`wrote ${count} lesson pages, ${moved} redirects`);
