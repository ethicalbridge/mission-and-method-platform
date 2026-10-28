// Writes founder-recaps-data.js for the video template from course/founder-recaps.js: each entrepreneurs' Recap video
// shows the module summary, one takeaway per lesson and what comes next. Run after editing the recaps:
//   node scripts/course-videos/export-recaps.mjs
import {writeFileSync,readFileSync} from 'node:fs';
import {founderModules,recaps} from '../../course-data.js';
globalThis.window={LESSON_VIDEOS:{},REVIEW_VIDEOS:{},MODULE_VIDEOS:{},TITLES_ES:{},MODULES_ES:{}};
for(const c of ['clarify','organise','prove-show','protect'])new Function(readFileSync(new URL(`./founder-entrepreneurs-${c}.js`,import.meta.url),'utf8'))();
const es=window.TITLES_ES,out={};
for(const m of founderModules){const r=recaps[m.id];const rev=m.lessons.at(-1);if(!r||!rev?.review)continue;
 const items=lang=>m.lessons.filter(l=>!l.review).map((l,i)=>({label:`${m.no}.${i+1} ${lang==='es'?(es[`${m.id}.${l.id}`]||l.title):l.title}`,text:r.lessons[l.id][lang]}));
 out[`${m.id}.${rev.id}`]={en:{what:r.summary.en,recap:{title:'One lesson at a time',items:items('en')},next:r.next.en},es:{what:r.summary.es,recap:{title:'Una lección a la vez',items:items('es')},next:r.next.es}};}
writeFileSync(new URL('./founder-recaps-data.js',import.meta.url),`// Written by export-recaps.mjs from course/founder-recaps.js. Adds a full recap to each entrepreneurs' Recap video.\n(function(){const R=${JSON.stringify(out,null,1)};for(const [k,v] of Object.entries(R))for(const lang of ['en','es'])(window.REVIEW_VIDEOS[k]||={})[lang]={...(window.REVIEW_VIDEOS[k]?.[lang]||{}),long:v[lang]};})();\n`);
console.log('recaps for',Object.keys(out).length,'modules');
