// Writes the course ↔ tool cross-links into module pages and tool pages from the lesson tools in course-data.js.
// Run after changing the map: node scripts/course-tool-links.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {modules,lessonTools,moduleToolSlugs,moduleNumber,courseToolLabels} from '../course-data.js';
import {softwareProducts} from '../products.js';
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const START='<!-- course-tools:start -->',END='<!-- course-tools:end -->';
const put=(html,block)=>{html=html.replace(new RegExp(`${START}[\\s\\S]*?${END}`),'');return html.replace('</div></main>',`${START}${block}${END}</div></main>`)};
const lessonNo=(m,l)=>`${m.id}.${m.lessons.indexOf(l)+1}`;
for(const m of modules){
 const tools=moduleToolSlugs(m.id).map(s=>softwareProducts.find(p=>p.slug===s)).filter(Boolean);
 const block=`<section class="catalog-section course-tools"><h2>Tools for this module</h2>${tools.length?`<p>Each tool is the live version of work you draft in this module. They are optional; the course and its Excel workbook are complete on their own.</p><ul>${tools.map(p=>{const lessons=m.lessons.filter(l=>(lessonTools[m.id]?.[l.id]||[]).includes(p.slug)).map(l=>lessonNo(m,l));return `<li><a href="software-${p.slug}.html"><b>${e(courseToolLabels[p.slug]||p.name)}</b></a> — ${e(p.description)}${lessons.length?` <span class="subtle">Lessons ${lessons.join(', ')}</span>`:''}</li>`}).join('')}</ul>`:`<p>No interactive tool yet for this module. The exercises and Excel workbook cover everything you need.</p>`}</section>`;
 const f=`${m.slug}.html`;writeFileSync(f,put(readFileSync(f,'utf8'),block));
}
for(const p of softwareProducts){
 const f=`software-${p.slug}.html`;let html;try{html=readFileSync(f,'utf8')}catch{continue}
 const uses=modules.flatMap(m=>m.lessons.filter(l=>(lessonTools[m.id]?.[l.id]||[]).includes(p.slug)).map(l=>({m,l})));
 const byModule=[...new Set(uses.map(u=>u.m))];
 const block=byModule.length?`<section class="catalog-section course-tools"><h2>Learn it in the course</h2><p>This tool is the live version of work taught in the Planning System. Each module’s Excel workbook imports into it.</p><ul>${byModule.map(m=>`<li><a href="${m.slug}.html"><b>Module ${moduleNumber(m)} · ${e(m.title)}</b></a> — ${uses.filter(u=>u.m===m).map(u=>`<a href="learn.html?module=${m.id}&lesson=${u.l.id}">${lessonNo(m,u.l)} ${e(u.l.title)}</a>`).join(' · ')}</li>`).join('')}</ul></section>`:'';
 writeFileSync(f,put(html,block));
}
console.log('done');
