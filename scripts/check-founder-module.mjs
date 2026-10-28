// Checks an entrepreneurs' module against its organisation original:
//   node scripts/check-founder-module.mjs course/e01-strategic-foundations.js
// Fails on: missing or unchanged text, leftover example organisations, "lawyer", references to the
// organisation-only modules 11–13 / Course 5, NGO-only wording, or fields left with organisation wording.
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const file=process.argv[2];
const e=(await import(pathToFileURL(resolve(file)).href)).default;
const base=(await import(pathToFileURL(resolve(file.replace(/\/e(\d\d)-/,'/m$1-'))).href)).default;
const problems=[];
const all=[];
const walk=(v,path)=>{if(typeof v==='string')all.push([path,v]);else if(Array.isArray(v))v.forEach((x,i)=>walk(x,`${path}[${i}]`));else if(v&&typeof v==='object')for(const [k,x] of Object.entries(v))walk(x,`${path}.${k}`);};
walk({title:e.title,short:e.short,intro:e.intro,output:e.output,promo:e.promo},'module');
e.lessons.forEach(l=>walk(l,`lesson ${l.id}`));
const banned=[/Imara/,/Pan del Barrio/,/Vanita/,/Riverside/,/Tide Line/,/Huerta/,/Next Step Mentors/,/(?<!qualified )\blawyers?\b/i,/\bModules? 1[123]\b/,/\bCourse 5\b/,/Sustain (&|and) Run/,/\bNGOs?\b/,/thirteen modules/i,/five courses/i];
for(const [p,s] of all)for(const re of banned)if(re.test(s))problems.push(`${p}: contains ${re}`);
if(e.lessons.length!==base.lessons.length)console.log(` note: ${base.lessons.length-e.lessons.length} lesson(s) merged`);
e.lessons.forEach((l,i)=>{
 const b=base.lessons.find(x=>x.id===l.id);
 if(!b){problems.push(`lesson ${l.id} not in the original`);return;}
 if(l.gallery)problems.push(`${l.id}: gallery left in`);
 if(l.review)return;
 if(JSON.stringify(l.learn)===JSON.stringify(b.learn))problems.push(`${l.id}: learn unchanged`);
 if(l.learn.length<b.learn.length)problems.push(`${l.id}: learn has fewer paragraphs (${l.learn.length} < ${b.learn.length})`);
 for(const k of ['strong','exercise'])if(l[k]===b[k])problems.push(`${l.id}: ${k} unchanged`);
 if(b.anatomy&&l.anatomy&&JSON.stringify(l.anatomy)===JSON.stringify(b.anatomy))problems.push(`${l.id}: anatomy unchanged (fine only if it already suits entrepreneurs)`);
});
console.log(`${file}: module ${e.id} (${e.title}), ${e.lessons.length} lessons`);
console.log(problems.length?problems.map(p=>' - '+p).join('\n'):' OK');
process.exitCode=problems.some(p=>!/anatomy unchanged/.test(p))?1:0;
