// Adds a small "who this page is for" note to pages that belong to one audience, so entrepreneurs and
// organisations can always see which path they are on and jump to the other one. Idempotent: the note sits
// between <!-- track-note --> markers and is replaced on every run. Strings live in scripts/track-strings.json
// (also loaded into translations.js). Run:
//   node scripts/set-translations.mjs scripts/track-strings.json && node scripts/track-notes.mjs
import {readFileSync,writeFileSync} from 'node:fs';
const S=JSON.parse(readFileSync('scripts/track-strings.json','utf8'));
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=(k,tag='span',attrs='')=>{if(!S[k])throw new Error(`Missing ${k}`);return `<${tag}${attrs?' '+attrs:''} data-i18n="${k}">${e(S[k][0])}</${tag}>`;};
const note=(key,track,href)=>`<!-- track-note --><div class="aud-note aud-note-${track}"><div class="container"><p>${t(`track.${track}.label`,'b','class="aud-note-tag"')} ${t(`track.${key}.text`)} <a href="${href}" data-i18n="track.${key}.link">${e(S[`track.${key}.link`][0])}</a></p></div></div><!-- /track-note -->`;
// page, key, track, link target, where to insert: 'hero' = after the first </section>, 'main' = after <main …>
const pages=[
 ['courses.html','courses','org','courses-entrepreneurs.html','hero'],
 ['pricing.html','pricing','org','courses-entrepreneurs.html','hero'],
 ['planning-system.html','courses','org','courses-entrepreneurs.html','hero'],
 ['start-here.html','starthere','org','courses-entrepreneurs.html','main'],
 ['software.html','software','both','courses-entrepreneurs.html','main'],
];
const css='<link rel="stylesheet" href="audiences.css?v=3">';
for(const [file,key,track,href,where] of pages){
 let h=readFileSync(file,'utf8').replace(/<!-- track-note -->[\s\S]*?<!-- \/track-note -->\n?/g,'');
 const n=note(key,track,href)+'\n';
 if(where==='hero'){const i=h.indexOf('</section>')+'</section>'.length;h=h.slice(0,i)+'\n'+n+h.slice(i).replace(/^\n/,'');}
 else h=h.replace(/<main[^>]*>/,m=>m+'\n'+n);
 if(!/audiences\.css/.test(h))h=h.replace('</head>',css+'\n</head>');
 writeFileSync(file,h);console.log('note →',file);
}
