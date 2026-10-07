// "What you'll build" on each course page: course → module → lesson, matching the Evidence Library.
// Each module opens (native <details>, works without JavaScript) to show its lessons, and each lesson lists
// the resources placed inside it, linking to the lesson, the publisher and the Evidence Library entry.
// Used by generate-course-pages.mjs; apply on its own with: node scripts/course-modules-section.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {modules,phases,moduleNumber,readingsFor,primaryFor,freeModules} from '../course-data.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const lessonURL=(m,l)=>`learn.html?module=${m.id}&amp;lesson=${l.id}`;
const roleShort={'Core resource':'Core','Practical guide':'Practical','Go deeper':'Go deeper'};
const libraryHref=item=>{const home=primaryFor(item)||item;return `reading-library.html?module=${home.module}#${home.anchor}`;};

function resourceList(m,l){
 const items=readingsFor(m.id,l.id);
 if(!items.length)return '';
 return `<ul class="cm-res">${items.map(item=>`<li><span class="cm-role cm-role-${item.role.split(' ')[0].toLowerCase()}">${e(roleShort[item.role]||item.role)}</span><span class="cm-res-text"><a href="${lessonURL(m,l)}#${item.anchor}">${e(item.title)}</a> <span class="cm-org">· ${e(item.organisation)}</span></span><a class="cm-res-lib" href="${libraryHref(item)}" aria-label="${e(item.title)} in the Evidence Library">Library →</a></li>`).join('')}</ul>`;
}

function moduleBlock(m){
 const taught=m.lessons.filter(l=>!l.review);
 const resourceCount=taught.reduce((n,l)=>n+readingsFor(m.id,l.id).filter(i=>!i.crossRef).length,0);
 const free=freeModules.includes(m.id);
 return `<details class="cm-module" id="module-${moduleNumber(m)}"><summary class="cm-module-header"><span class="cm-module-num">Module ${moduleNumber(m)}</span><span class="cm-title-block"><span class="cm-title">${e(m.title)}</span><span class="cm-meta">${m.lessons.length} lessons · ${resourceCount} resource${resourceCount===1?'':'s'}${free?' · <b>Free</b>':''}</span></span><span class="cm-expand" aria-hidden="true">+</span></summary><div class="cm-module-body"><p>${e(m.intro)}</p><p class="cm-output"><b>You create:</b> ${e(m.output)} · <b>Excel:</b> ${e(m.workbook.file)}</p><ol class="cm-lessons">${m.lessons.map((l,i)=>`<li class="cm-lesson${l.review?' cm-review':''}"><div class="cm-lesson-head"><span class="cm-lesson-no">${m.id}.${i+1}</span><a href="${lessonURL(m,l)}">${e(l.title)}</a><span class="cm-lesson-min">${l.review?'Module review':`${l.minutes} min`}</span></div>${l.review?'':resourceList(m,l)}</li>`).join('')}</ol><div class="cm-actions"><a class="button ghost" href="${m.slug}.html">Open Module ${moduleNumber(m)} →</a><a href="reading-library.html?module=${m.id}#library-results">Module ${moduleNumber(m)} in the Evidence Library →</a></div></div></details>`;
}

// Course header band: the same numbered dark band the Evidence Library uses for each course.
export const courseBand=p=>{
 const mods=modules.filter(m=>m.phase===p.name);
 const lessons=mods.reduce((n,m)=>n+m.lessons.length,0);
 const resources=mods.reduce((n,m)=>n+m.lessons.filter(l=>!l.review).reduce((k,l)=>k+readingsFor(m.id,l.id).filter(i=>!i.crossRef).length,0),0);
 const hours=Math.round(mods.flatMap(m=>m.lessons).reduce((n,l)=>n+l.minutes,0)/60);
 return `<header class="course-band"><div class="course-band-badge" aria-hidden="true"><small>Course</small><b>${p.number}</b></div><div class="course-band-text"><span class="course-band-num">Course ${p.number} of ${phases.length} · Planning System</span><h1>${e(p.title)}</h1><p class="course-band-meta">${e(p.summary)} · ${mods.length} modules · ${lessons} lessons · ${resources} resources · about ${hours} hours · <a href="reading-library.html?course=${p.id}#course-${p.id}">This course in the Evidence Library →</a></p></div></header>`;
};

export const courseModulesSection=p=>{
 const mods=modules.filter(m=>m.phase===p.name);
 return `<section class="cm-modules" id="modules" aria-labelledby="cm-heading"><h2 id="cm-heading">What you’ll build</h2><p class="cm-intro">${mods.length} modules, each opening to its lessons and the resources placed inside them.</p>${mods.map(moduleBlock).join('')}</section>`;
};

// Replace the section in the five course pages (from the "What you'll build" heading to the "Next:" line or the end of the catalog).
export function applyCourseModules(){
 for(const p of phases){
  const file=`course-${p.id}.html`;let html=readFileSync(file,'utf8');
  const start=html.search(/<section class="cm-modules"|<h2>What you’ll build<\/h2>/);
  if(start<0)throw new Error(`No module section in ${file}`);
  const nextAt=html.indexOf('<p>Next:',start),endAt=html.indexOf('</div></main>',start);
  const end=nextAt>=0&&nextAt<endAt?nextAt:endAt;
  html=html.slice(0,start)+courseModulesSection(p)+html.slice(end);
  const bandStart=html.search(/<header class="course-band">|<span class="eyebrow">Course \d+ · [^<]* of \d+ · Planning System<\/span><h1>/);
  if(bandStart<0)throw new Error(`No course heading in ${file}`);
  const bandEnd=html.startsWith('<header class="course-band">',bandStart)?html.indexOf('</header>',bandStart)+9:html.indexOf('</h1>',bandStart)+5;
  html=html.slice(0,bandStart)+courseBand(p)+html.slice(bandEnd);
  writeFileSync(file,html,'utf8');console.log('wrote',file);
 }
}
if(import.meta.url===pathToFileURL(process.argv[1]).href)applyCourseModules();
