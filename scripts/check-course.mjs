// Structural check of the course content: node scripts/check-course.mjs
import {modules,lessonCount,phases,legacyLessonKeys,lessonSheets} from '../course-data.js';
import {availableToolSlugs} from '../products.js';
const problems=[];let minutes=0;
for(const m of modules){
 const ids=new Set();
 if(!m.lessons.at(-1).review)problems.push(`${m.id}: last lesson is not a review`);
 if(!phases.some(p=>p.name===m.phase))problems.push(`${m.id}: unknown phase ${m.phase}`);
 if(!m.workbook?.file)problems.push(`${m.id}: no workbook`);
 if(!m.lessons.some(l=>l.id===m.promo?.lesson))problems.push(`${m.id}: promo lesson ${m.promo?.lesson} not found`);
 for(const t of m.promo?.tools||[])if(!availableToolSlugs.includes(t))problems.push(`${m.id}: promo tool ${t} is not live`);
 for(const l of m.lessons){
  minutes+=l.minutes;
  if(ids.has(l.id))problems.push(`${m.id}: duplicate lesson id ${l.id}`);ids.add(l.id);
  for(const t of l.tools)if(!availableToolSlugs.includes(t))problems.push(`${m.id}.${l.id}: tool ${t} is not live`);
  if(l.review)continue;
  for(const k of ['title','learn','weak','strong','why','reflect','exercise','fields','check','stage'])if(!l[k]||(Array.isArray(l[k])&&!l[k].length))problems.push(`${m.id}.${l.id}: missing ${k}`);
  if(!lessonSheets(l).length)problems.push(`${m.id}.${l.id}: no Excel sheet`);
  for(const s of lessonSheets(l))if(s.length>31)problems.push(`${m.id}.${l.id}: sheet name over 31 characters`);
  if(l.learn.length<3)problems.push(`${m.id}.${l.id}: fewer than three learning paragraphs`);
  if(new Set(l.fields.map(f=>f.key)).size!==l.fields.length)problems.push(`${m.id}.${l.id}: duplicate field key`);
 }
}
for(const target of Object.values(legacyLessonKeys)){const [id,...rest]=target.split('.');if(!modules.find(m=>m.id===Number(id))?.lessons.some(l=>l.id===rest.join('.')))problems.push(`legacy target ${target} missing`);}
console.log(modules.map(m=>`${String(m.id).padStart(2,'0')} ${m.title}: ${m.lessons.length} lessons`).join('\n'));
console.log(`${modules.length} modules · ${lessonCount} lessons and reviews · ${(minutes/60).toFixed(1)} hours`);
console.log(problems.length?problems.join('\n'):'No structural problems found.');
process.exitCode=problems.length?1:0;
