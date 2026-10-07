// Regenerates the Evidence Library lesson list from resource-library.js.
// Every resource gets one anchor (resourceAnchor) shared with its lesson page, so the two link to each other.
// Run after changing readings: node scripts/generate-evidence-library.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {modules,moduleNumber,resources,courseFor,courses} from '../course-data.js';
import {ROLES} from '../resource-library.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const read=f=>readFileSync(f,'utf8');
const write=(f,s)=>{writeFileSync(f,s,'utf8');console.log('wrote',f);};
const lessonURL=(m,l=m.lessons[0])=>`learn.html?module=${m.id}&amp;lesson=${l.id}`;
const taught=m=>m.lessons.filter(l=>!l.review);
// ---------- reading-library.html ----------
let lib=read('reading-library.html');
lib=lib.replace(/(<select id="module-filter"><option value="">All modules<\/option>)[\s\S]*?(<\/select>)/,`$1${modules.map(m=>`<option value="${m.id}">Module ${moduleNumber(m)} · ${e(m.title)}</option>`).join('')}$2`);
const courseAttrs=m=>{const c=courseFor(m);return `data-course="${c.id}" data-course-number="${c.number}" data-course-name="${e(c.name)}" data-course-title="${e(c.title)}" data-course-summary="${e(c.summary)}"`;};
const lessonFor=key=>{const [mid,...rest]=key.split('.');const m=modules.find(x=>x.id===Number(mid));const l=m?.lessons.find(x=>x.id===rest.join('.'));return m&&l?{m,l}:null;};
const lessonLabel=(m,l)=>`Lesson ${m.id}.${m.lessons.indexOf(l)+1} ${e(l.title)}`;
const card=(m,l,item)=>`<article class="resource-card" id="${item.anchor}" data-module="${m.id}" data-course="${courseFor(m).id}" data-type="${e(item.type)}" data-level="${e(item.role)}" data-tags="${e(item.tags.join(' '))}" data-search="${e([item.title,item.organisation,item.why,item.focus,item.use,item.region,l.title,...item.tags].join(' ').toLowerCase())}"><div class="resource-card-top"><span class="resource-type">${e(item.type)}</span><span class="resource-level">${e(item.role)}</span></div><h3>${e(item.title)}</h3><p class="subtle">${e(item.organisation)}${item.year&&!/^n\.?d/i.test(item.year)?` · ${e(item.year)}`:''}${item.region&&item.region!=='Global'?` · ${e(item.region)}`:''}${item.access!=='Free'?` · <b>${e(item.access)}</b>`:''}</p><p><b>Why we chose it:</b> ${e(item.why)}</p><p><b>What to look for:</b> ${e(item.focus)}</p><p class="resource-use"><b>Use it in the lesson →</b> ${e(item.use)}</p><div class="resource-tags">${item.tags.map(t=>`<span>${e(t)}</span>`).join('')}</div><p class="resource-lesson"><b>Taught in →</b> <a href="${lessonURL(m,l)}#${item.anchor}">${lessonLabel(m,l)}</a>${item.alsoIn.map(x=>lessonFor(x.lesson)).filter(Boolean).map(({m:m2,l:l2},n)=>` · <b>also in</b> <a href="${lessonURL(m2,l2)}#${item.alsoIn[n].anchor}">${lessonLabel(m2,l2)}</a>`).join('')}</p><div class="resource-actions"><a href="${item.url}" target="_blank" rel="noopener">Open resource ↗</a>${item.downloadUrl?`<a href="${item.downloadUrl}" target="_blank" rel="noopener">Download PDF ↓</a>`:''}<a href="${lessonURL(m,l)}#${item.anchor}">Go to the lesson →</a></div></article>`;
const libLessons=modules.map(m=>taught(m).map(l=>{const items=resources.filter(r=>r.lesson===`${m.id}.${l.id}`);if(!items.length)return '';return `<section class="library-lesson" data-module="${m.id}" ${courseAttrs(m)} data-module-title="Module ${moduleNumber(m)} · ${e(m.title)}" id="m${m.id}-${l.id}"><div class="library-lesson-heading"><span class="eyebrow">Module ${moduleNumber(m)} · ${e(m.title)}</span><h2>${m.id}.${m.lessons.indexOf(l)+1} ${e(l.title)}</h2><a href="${lessonURL(m,l)}">Open lesson →</a></div><div class="reading-list">${items.map(item=>card(m,l,item)).join('')}</div></section>`;}).join('')).join('');
const types=[...new Set(resources.map(r=>r.type))].sort();
const courseList=[...new Map(modules.map(m=>[courseFor(m).id,courseFor(m)])).values()];
const courseSelect=`<label>Course<select id="course-filter"><option value="">All courses</option>${courseList.map(c=>`<option value="${c.id}">Course ${c.number} · ${e(c.name)}</option>`).join('')}</select></label>`;
lib=lib.replace(/<label>Course<select id="course-filter">[\s\S]*?<\/select><\/label>/,'');
lib=lib.replace('<label>Module<select id="module-filter">',courseSelect+'<label>Module<select id="module-filter">');
lib=lib.replace(/(<select id="module-filter"><option value="">All modules<\/option>)[\s\S]*?(<\/select>)/,`$1${modules.map(m=>`<option value="${m.id}" data-course="${courseFor(m).id}">Module ${moduleNumber(m)} · ${e(m.title)}</option>`).join('')}$2`);
lib=lib.replace(/(<select id="type-filter"><option value="">All types<\/option>)[\s\S]*?(<\/select>)/,`$1${types.map(t=>`<option>${e(t)}</option>`).join('')}$2`);
lib=lib.replace(/<label>Level<select id="level-filter">[\s\S]*?<\/select><\/label>/,`<label>Role<select id="level-filter"><option value="">All roles</option>${ROLES.map(t=>`<option>${e(t)}</option>`).join('')}</select></label>`);
lib=lib.replace(/<label>Role<select id="level-filter">[\s\S]*?<\/select><\/label>/,`<label>Role<select id="level-filter"><option value="">All roles</option>${ROLES.map(t=>`<option>${e(t)}</option>`).join('')}</select></label>`);
lib=lib.replace(/(<select id="tag-filter"><option value="">All perspectives<\/option>)[\s\S]*?(<\/select>)/,`$1${['NGO','Development','Humanitarian','Social enterprise','Startup','Management','Research','Global South','Locally led','Free'].map(t=>`<option>${t}</option>`).join('')}$2`);
const statBlock=`<div class="ev-stats"><div class="ev-stat"><b>${resources.length}</b><span>Curated resources</span></div><div class="ev-stat"><b>${new Set(resources.map(r=>r.lesson)).size}</b><span>Lessons with evidence</span></div><div class="ev-stat"><b>${modules.length}</b><span>Course modules</span></div><div class="ev-stat"><b>${resources.filter(r=>r.tags.includes('Global South')||r.tags.includes('Locally led')).length}</b><span>Global South &amp; locally led</span></div></div>`;
lib=lib.replace(/<div class="ev-stats">[\s\S]*?<\/div><\/div><\/div><\/section>/,statBlock+'</div></section>');
lib=lib.replace(/Explore \d+ guides/,`Explore ${resources.length} guides`);
lib=lib.replace(/Research review completed [^<]*\./,'Full source-integration audit completed October 2026: every source was checked against its lesson and its link was verified. External publishers may move or update pages after review.');
lib=lib.replace(/(<div id="library-results" class="evidence-results">)[\s\S]*?(<\/div><p id="library-empty")/,(_,a,b)=>a+libLessons+b);
lib=lib.replace(/Showing all \d+ resources/,`Showing all ${resources.length} resources`);
write('reading-library.html',lib);
