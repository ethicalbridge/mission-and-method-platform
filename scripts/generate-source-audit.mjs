// Writes docs/source-audit.md and docs/source-audit.csv: the lesson-by-lesson source integration audit.
// Inputs: docs/source-audit-data.json (research record: objective, audit of earlier sources, notes) + resource-library.js (what ships).
// Run after changing readings: node scripts/generate-source-audit.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {modules,moduleNumber,readingsFor,resources,courseFor} from '../course-data.js';
const audit=Object.fromEntries(JSON.parse(readFileSync('docs/source-audit-data.json','utf8')).map(x=>[x.key,x]));
const md=s=>String(s??'').replace(/\|/g,'\\|').replace(/\n/g,' ');
const csv=s=>`"${String(s??'').replace(/"/g,'""')}"`;
const rows=[],out=[];let lessons=0,covered=0;
const actions={};
out.push('# Source integration audit','',`Generated from the course data. ${resources.length} sources across ${new Set(resources.map(r=>r.lesson)).size} lessons; each source has one primary home, and ${resources.reduce((n,r)=>n+r.alsoIn.length,0)} deliberate cross-references point back to it.`,'',
'**How to read this.** "Where" is the paragraph of the lesson the source follows (P1 = first paragraph of the Read step), so each source appears where its concept is taught. "Action" is the decision on the source: KEEP / UPDATE / REPLACE / MOVE / REMOVE for sources already in the course, ADD for new ones. Links were verified by direct fetch in October 2026 (a few by search confirmation where the publisher blocks automated requests).','');
for(const m of modules){const c=courseFor(m);out.push(`## Course ${c.number} · ${c.name} — Module ${moduleNumber(m)} · ${m.title}`,'');
 for(const l of m.lessons.filter(x=>!x.review)){lessons++;const key=`${m.id}.${l.id}`,a=audit[key]||{},items=readingsFor(m.id,l.id);if(items.length)covered++;
  out.push(`### ${m.id}.${m.lessons.indexOf(l)+1} ${l.title}`,'',`**Learning objective:** ${a.objective||'—'}`,'');
  if(a.existing?.length){out.push('**Earlier sources audited**','','| Earlier source | Link | Action | Reason |','|---|---|---|---|');for(const x of a.existing){actions[x.action]=(actions[x.action]||0)+1;out.push(`| ${md(x.title)} | ${md(x.linkStatus)} | **${md(x.action)}**${x.moveTo?` → ${md(x.moveTo)}`:''} | ${md(x.reason)} |`);}out.push('');}
  if(items.length){out.push('| Recommended source | Type · role | Why this source | Where | Action |','|---|---|---|---|---|');
   for(const r of items){const rec=(a.resources||[]).find(x=>x.title===r.title);const act=r.crossRef?'CROSS-REF':(rec?.status||'ADD');out.push(`| [${md(r.title)}](${r.url}) — ${md(r.organisation)} | ${md(r.type)} · ${md(r.role)} | ${md(r.why)} | After P${r.after+1} | ${act} |`);
    rows.push([c.name,`Module ${moduleNumber(m)} · ${m.title}`,`${m.id}.${m.lessons.indexOf(l)+1} ${l.title}`,a.objective||'',(a.existing||[]).map(x=>`${x.title} [${x.action}]`).join('; '),r.title,r.organisation,r.url,r.type,r.role,r.why,r.focus,r.use,`After paragraph ${r.after+1}`,act,r.access,r.region,r.year,rec?.verified||'']);}
   out.push('');}
  else{out.push(`*No external source.* ${md(a.note)||'Our lesson covers this fully.'}`,'');rows.push([c.name,`Module ${moduleNumber(m)} · ${m.title}`,`${m.id}.${m.lessons.indexOf(l)+1} ${l.title}`,a.objective||'',(a.existing||[]).map(x=>`${x.title} [${x.action}]`).join('; '),'(none)','','','','',a.note||'','','','','NONE','','','','']);}
  if(items.length&&a.note)out.push(`> Note: ${md(a.note)}`,'');}}
out.splice(3,0,`Coverage: ${covered} of ${lessons} taught lessons carry at least one source. Earlier sources audited: ${Object.entries(actions).map(([k,v])=>`${v} ${k}`).join(', ')}.`,'');
writeFileSync('docs/source-audit.md',out.join('\n'));
writeFileSync('docs/source-audit.csv',[['Course','Module','Lesson','Learning objective','Earlier sources (action)','Recommended source','Organisation','URL','Type','Role','Why this source','What to look for','Use in lesson','Where it appears','Action','Access','Region','Year','Verified'],...rows].map(r=>r.map(csv).join(',')).join('\n'));
console.log('wrote docs/source-audit.md and docs/source-audit.csv',covered,'/',lessons);
