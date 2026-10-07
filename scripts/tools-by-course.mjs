// Impact Tools catalogue (software.html), organised like the Evidence Library: course → module → tools.
// Each tool has one home module (the module whose lessons use it most; the first on a tie). Other modules that
// use it show a link back to that home. Tool cards keep their access-link markup so tool-access-ui.js still works.
// Card text is read from the existing catalogue, so edit a card's description in software.html and re-run:
//   node scripts/tools-by-course.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {modules,phases,moduleNumber,toolsFor,courseToolLabels} from '../course-data.js';
import {softwareProducts} from '../products.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const FILE='software.html',START='<!-- tools-by-course:start -->',END='<!-- tools-by-course:end -->';
let html=readFileSync(FILE,'utf8');

// 1. Read every existing card (by its destination) so descriptions and access links carry over unchanged.
const cards=new Map();
for(const a of html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)){
 const body=a[1];const open=body.match(/<a class="open"[\s\S]*?<\/a>/)?.[0];const dest=open?.match(/data-tool-destination="([^"]+)"/)?.[1];
 const status=body.match(/<span class="status[^"]*">[\s\S]*?<\/span>/)?.[0]||'';
 if(!dest||(cards.has(dest)&&(cards.get(dest).status||!status)))continue;
 cards.set(dest,{name:body.match(/<h4>([\s\S]*?)<\/h4>/)?.[1],desc:body.match(/<p>([\s\S]*?)<\/p>/)?.[1],open,status:body.match(/<span class="status[^"]*">[\s\S]*?<\/span>/)?.[0]||''});
}

// 2. Where each tool is used, and its home module.
const lessonURL=(m,l)=>`learn.html?module=${m.id}&amp;lesson=${l.id}`;
const uses={};
for(const m of modules)m.lessons.forEach((l,i)=>{for(const slug of toolsFor(m.id,l.id))(uses[slug]??=[]).push({m,l,no:`${m.id}.${i+1}`});});
const tools=softwareProducts.filter(p=>cards.has(p.launchUrl)&&uses[p.slug]).map(p=>{
 const byModule=new Map();for(const u of uses[p.slug])byModule.set(u.m,[...(byModule.get(u.m)||[]),u]);
 const home=[...byModule.entries()].sort((a,b)=>b[1].length-a[1].length||a[0].id-b[0].id)[0][0];
 return {p,card:cards.get(p.launchUrl),byModule,home};
});
const unplaced=[...cards.keys()].filter(dest=>!tools.some(t=>t.p.launchUrl===dest));
const anchor=t=>`tool-${t.p.slug}`;
const toolLabel=t=>courseToolLabels[t.p.slug]?e(courseToolLabels[t.p.slug]):t.card.name;

function toolCard(t,m){const used=t.byModule.get(m)||[];const elsewhere=[...t.byModule.keys()].filter(x=>x!==m);
 return `<article id="${anchor(t)}">${t.card.status}<h4>${t.card.name}</h4><p>${t.card.desc}</p><p class="tc-used"><b>Used in ${used.length>2?'lessons':''}</b> ${used.length>2?used.map(u=>`<a href="${lessonURL(u.m,u.l)}" title="${e(u.l.title)}">${u.no}</a>`).join(', '):used.map(u=>`<a href="${lessonURL(u.m,u.l)}">${u.no} ${e(u.l.title)}</a>`).join(' · ')}${elsewhere.length?` <span class="tc-also">· also Module ${elsewhere.map(x=>moduleNumber(x)).join(', ')}</span>`:''}</p>${t.card.open}</article>`;}
function moduleBlock(m){
 const homeTools=tools.filter(t=>t.home===m),visiting=tools.filter(t=>t.home!==m&&t.byModule.has(m));
 const count=homeTools.length+visiting.length;
 return `<details class="cm-module tc-module" id="tools-module-${moduleNumber(m)}"><summary class="cm-module-header"><span class="cm-module-num">Module ${moduleNumber(m)}</span><span class="cm-title-block"><span class="cm-title">${e(m.title)}</span><span class="cm-meta">${count?`${count} tool${count===1?'':'s'}`:'Excel workbook only'}</span></span><span class="cm-expand" aria-hidden="true">+</span></summary><div class="cm-module-body">${homeTools.length?`<div class="sw-tools tc-tools">${homeTools.map(t=>toolCard(t,m)).join('')}</div>`:''}${visiting.length?`<p class="tc-visiting"><b>${homeTools.length?'Also used in this module':'Tools used in this module'}:</b> ${visiting.map(t=>`<a href="#${anchor(t)}" data-tool-home="${moduleNumber(t.home)}">${toolLabel(t)}</a> <span class="cm-org">(${(t.byModule.get(m)||[]).map(u=>u.no).join(', ')} · home: Module ${moduleNumber(t.home)})</span>`).join(' · ')}</p>`:''}${count?'':`<p class="tc-none">This module is worked in its Excel workbook; there is no dedicated Impact Tool yet.</p>`}<div class="cm-actions"><a href="${m.slug}.html">Open Module ${moduleNumber(m)} →</a></div></div></details>`;}
function courseBlock(p){const mods=modules.filter(m=>m.phase===p.name);const n=new Set(tools.filter(t=>mods.some(m=>t.byModule.has(m))).map(t=>t.p.slug)).size;
 return `<section class="tc-course" id="tools-course-${p.id}"><header class="course-band tc-band"><div class="course-band-badge small" aria-hidden="true"><small>Course</small><b>${p.number}</b></div><div class="course-band-text"><span class="course-band-num">Course ${p.number} of ${phases.length}</span><h3>${e(p.title)}</h3><p class="course-band-meta">${e(p.summary)} · ${mods.length} modules · ${n} tool${n===1?'':'s'} · <a href="course-${p.id}.html">About this course →</a></p></div></header>${mods.map(moduleBlock).join('')}</section>`;}

const section=`${START}<div class="tc-catalogue"><div class="tc-head"><h3>By course and module</h3><p>Each tool sits in the module that teaches it, so you can open the tool at the moment the course asks you to build that output. Click a module to see its tools and the lessons that use them.</p></div>${phases.map(courseBlock).join('')}</div>${END}`;
// 3. Replace the grouped-by-job topics (everything after the recommended path) with the course structure.
if(html.includes(START))html=html.slice(0,html.indexOf(START))+section+html.slice(html.indexOf(END)+END.length);
else{const pathEnd=html.indexOf('<div class="sw-topic">');const topicsEnd=html.indexOf('</div>\n    </div>\n  </section>',pathEnd);if(pathEnd<0||topicsEnd<0)throw new Error('Catalogue not found');html=html.slice(0,pathEnd)+section+'\n\n      '+html.slice(topicsEnd);}
html=html.replace('Every tool is grouped by the job it does.','Tools follow the course: each one sits in the module that teaches it.');
writeFileSync(FILE,html,'utf8');
console.log('tools placed',tools.length,'unplaced cards',unplaced);
