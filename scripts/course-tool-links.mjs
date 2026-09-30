// Writes the course ↔ tool cross-links into module pages and tool pages from lessonTools in course-data.js.
// Run after changing the map: node scripts/course-tool-links.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {modules,lessonTools,moduleToolSlugs} from '../course-data.js';
import {softwareProducts} from '../products.js';
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pages={1:'strategic-foundation',2:'theory-of-change',3:'team-organisation',4:'organisation-systems',5:'policies-procedures',6:'strategy-to-action',7:'business-model',8:'fundraising-partnerships'};
const START='<!-- course-tools:start -->',END='<!-- course-tools:end -->';
const put=(html,block)=>{html=html.replace(new RegExp(`${START}[\\s\\S]*?${END}`),'');return html.replace('</div></main>',`${START}${block}${END}</div></main>`)};
for(const m of modules){
 const tools=moduleToolSlugs(m.id).map(s=>softwareProducts.find(p=>p.slug===s)).filter(Boolean);
 const block=`<section class="catalog-section course-tools"><h2>Tools for this module</h2>${tools.length?`<p>Each tool is the live version of work you draft in this module. They are optional; the course and its Excel workbook are complete on their own.</p><ul>${tools.map(p=>{const lessons=m.lessons.filter(l=>(lessonTools[m.id]?.[l.id]||[]).includes(p.slug)).map(l=>`${m.id}.${m.lessons.indexOf(l)+1}`);return `<li><a href="software-${p.slug}.html"><b>${e(p.name)}</b></a> — ${e(p.description)} <span class="subtle">Lessons ${lessons.join(', ')}</span></li>`}).join('')}</ul>`:`<p>No interactive tool yet for this module. The exercises and Excel workbook cover everything you need.</p>`}</section>`;
 const f=`${pages[m.id]}.html`;writeFileSync(f,put(readFileSync(f,'utf8'),block));
}
for(const p of softwareProducts){
 const f=`software-${p.slug}.html`;let html;try{html=readFileSync(f,'utf8')}catch{continue}
 const uses=modules.flatMap(m=>m.lessons.filter(l=>(lessonTools[m.id]?.[l.id]||[]).includes(p.slug)).map(l=>({m,l})));
 const byModule=[...new Set(uses.map(u=>u.m))];
 const block=byModule.length?`<section class="catalog-section course-tools"><h2>Learn it in the course</h2><p>This tool is the live version of work taught in the Planning System.</p><ul>${byModule.map(m=>`<li><a href="${pages[m.id]}.html"><b>Module ${m.id} · ${e(m.title)}</b></a> — ${uses.filter(u=>u.m===m).map(u=>`<a href="learn.html?module=${m.id}&lesson=${u.l.id}">${m.id}.${m.lessons.indexOf(u.l)+1} ${e(u.l.title)}</a>`).join(' · ')}</li>`).join('')}</ul></section>`:'';
 writeFileSync(f,put(html,block));
}
console.log('done');
