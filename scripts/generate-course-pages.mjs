// Regenerates every course-structure page from course-data.js without touching hand-built page designs.
// Run after changing modules or lessons: node scripts/generate-course-pages.mjs && node scripts/course-tool-links.mjs
// - Module pages (<slug>.html) and redirects from the old 8-module page names
// - Course sections inside planning-system.html, index.html, about.html, courses.html (between generated markers)
// - Evidence Library lesson list and module filter, course resources page
// - Course size wording on pricing and software pages
import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {modules,phases,lessonCount,moduleCount,moduleNumber,lessonSheets,readingsFor,resources,courseToolLabels} from '../course-data.js';
import {softwareProducts,previewToolSlugs} from '../products.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const read=f=>readFileSync(f,'utf8');
const write=(f,s)=>{writeFileSync(f,s,'utf8');console.log('wrote',f);};
const lessonURL=(m,l=m.lessons[0])=>`learn.html?module=${m.id}&amp;lesson=${l.id}`;
const startURL=lessonURL(modules[0]);
const hours=Math.round(modules.flatMap(m=>m.lessons).reduce((n,l)=>n+l.minutes,0)/60);
const moduleHours=m=>Math.round(m.lessons.reduce((n,l)=>n+l.minutes,0)/6)/10;
const taught=m=>m.lessons.filter(l=>!l.review);
const tool=slug=>softwareProducts.find(p=>p.slug===slug);
const toolName=p=>courseToolLabels[p.slug]||p.name;
const toolHref=p=>previewToolSlugs.includes(p.slug)&&p.launchUrl?p.launchUrl:`software-${p.slug}.html`;
const NUMBER_WORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen'];
const word=n=>NUMBER_WORDS[n]||String(n);
const Word=n=>word(n)[0].toUpperCase()+word(n).slice(1);
const outputsCount=modules.length;

// Replace the content between <!-- gen:name --> and <!-- /gen:name -->. On the first run, `first` locates the original block.
function region(html,name,content,first){
 const open=`<!-- gen:${name} -->`,close=`<!-- /gen:${name} -->`;
 const i=html.indexOf(open);
 if(i>=0){const j=html.indexOf(close,i);return html.slice(0,i)+open+content+html.slice(j);}
 const [start,end]=first(html);
 if(start<0||end<0)throw new Error(`Cannot find region ${name}`);
 return html.slice(0,start)+open+content+close+html.slice(end);
}
const between=(html,startText,endText,{includeEnd=false}={})=>{const s=html.indexOf(startText);if(s<0)return [-1,-1];const t=html.indexOf(endText,s+startText.length);return [s,t<0?-1:includeEnd?t+endText.length:t];};
// The whole <div …> element that starts at `marker`, including nested divs.
const divAt=(html,marker)=>{const s=html.indexOf(marker);if(s<0)return [-1,-1];const re=/<\/?div\b/g;re.lastIndex=s;let depth=0,mm;while((mm=re.exec(html))){depth+=mm[0]==='<div'?1:-1;if(depth===0)return [s,html.indexOf('>',mm.index)+1];}return [s,-1];};
const replaceAll=(html,pairs)=>pairs.reduce((h,[a,b])=>h.split(a).join(b),html);

// ---------- shared page shell, taken from an existing module page so hand-made navigation stays intact ----------
const shellSource=read('strategic-foundation.html');
const shellHead=shellSource.slice(0,shellSource.indexOf('<main')).replace(/learning\.css(\?v=[^"]*)?/,'learning.css?v=course2');
const shellTail=shellSource.slice(shellSource.indexOf('</main>')+'</main>'.length);
const page=(title,body)=>shellHead.replace(/<title>[^<]*<\/title>/,`<title>${e(title)} | Mission & Method</title>`)+`<main id="main">${body}</main>`+shellTail;

// ---------- module pages ----------
function promoStatic(m){const p=m.promo;const tools=p.tools.map(tool).filter(Boolean);return `<aside class="tools-promo"><div class="tools-promo-copy"><span class="eyebrow">Impact Tools · optional subscription</span><h2>${e(p.headline)}</h2><p>${e(p.pitch)}</p><ul class="promo-tools">${tools.map(t=>`<li><b>${e(toolName(t))}</b><span>${e(t.description)}</span></li>`).join('')}</ul><div class="toolbar"><a class="button" href="pricing.html#software">See subscription options</a><a class="button ghost" href="${toolHref(tools[0])}">Try ${e(toolName(tools[0]))} →</a></div><p class="subtle">The course and its Excel workbook are complete on their own. The workbook imports into these tools if you subscribe later.</p></div><div class="demo-slot"><div class="video-slot"><div class="video-placeholder demo" role="img" aria-label="Tool demo coming soon"><span class="play-icon" aria-hidden="true">▶</span><b>See ${e(toolName(tools[0]))} in action</b><small>Demo video coming soon.</small></div></div></div></aside>`;}
function modulePage(m){
 const sheets=[...new Set(taught(m).flatMap(lessonSheets))];
 let part='';
 const items=m.lessons.map((l,i)=>{const head=l.part&&l.part!==part?`<li class="part-row"><b>${e(l.part)}</b></li>`:'';part=l.part||part;const tools=l.tools.map(tool).filter(Boolean);return `${head}<li><span class="num">${m.id}.${i+1}</span><a href="${lessonURL(m,l)}"><b>${e(l.title)}</b></a><span class="meta">${l.review?'Module review and output':`${e(l.stage)} · Video · Reading · Exercise · Excel: ${e(lessonSheets(l).join(', '))}${tools.length?` · Tool: ${tools.map(t=>e(toolName(t))).join(', ')}`:''}`}</span></li>`;}).join('');
 return page(m.title,`<div class="catalog"><nav class="breadcrumbs"><a href="planning-system.html">Planning System</a><span>› Module ${moduleNumber(m)} of ${moduleCount-1}</span></nav><span class="eyebrow">${e(m.phase)} · Module ${moduleNumber(m)}</span><h1>${e(m.title)}</h1><p class="lead">${e(m.intro)}</p><div class="module-page-grid"><div><p><b>You create:</b> ${e(m.output)}</p><p><b>${m.lessons.length} lessons and reviews</b> · about ${moduleHours(m)} hours including exercises.</p><p>Every lesson has a short video, the written explanation with examples, a guided exercise that saves into your organisation pack, and a sheet in the <b>${e(m.workbook.title)}</b>.</p><a class="button" href="${lessonURL(m)}">Begin this module →</a></div><div><span class="eyebrow">Module introduction</span><div class="video-slot"><div class="video-placeholder" role="img" aria-label="Module introduction video coming soon"><span class="play-icon" aria-hidden="true">▶</span><b>Module ${moduleNumber(m)} introduction</b><small>Video coming soon.</small></div></div></div></div><h2>Your lesson sequence</h2><ol class="module-sections">${items}</ol><section class="excel-panel" id="workbook"><span class="eyebrow">Excel</span><h2>${e(m.workbook.title)}</h2><p><b>${e(m.workbook.file)}</b> · included with the course. Sheets: ${sheets.map(s=>e(s)).join(', ')}.</p><p class="subtle">Sheets named after a tool use that tool’s columns, so the workbook can be imported into the Impact Tools without retyping. The file is being prepared and will be available to course purchasers.</p></section>${promoStatic(m)}<p><a href="organisation.html">Review your saved outputs →</a></p><!-- course-tools:start --><!-- course-tools:end --></div>`);
}
for(const m of modules){const f=`${m.slug}.html`;let html=modulePage(m);if(existsSync(f)){const old=read(f);const block=old.match(/<!-- course-tools:start -->[\s\S]*?<!-- course-tools:end -->/);if(block)html=html.replace(/<!-- course-tools:start --><!-- course-tools:end -->/,block[0]);}write(f,html);}
const redirects={'team-organisation':'structure-governance','organisation-systems':'internal-systems','policies-procedures':'legal-compliance-risk','business-model':'fundraising-revenue','fundraising-partnerships':'fundraising-revenue'};
for(const [from,to] of Object.entries(redirects))write(`${from}.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${to}.html"><link rel="canonical" href="${to}.html"><title>Moved | Mission & Method</title></head><body><p>This module has moved. <a href="${to}.html">Continue to the new module page →</a></p></body></html>`);

// ---------- course lists reused on several pages ----------
const packRows=(cls,progress)=>modules.map((m,i)=>{const state=progress?i<progress?'done':i===progress?'now':'todo':i===0?'now':'todo';const status=progress?i<progress?'Complete':i===progress?'In progress':'':i===0?'Start here':'';return `<li><span class="dot ${state}"></span><span class="num">${moduleNumber(m)}</span><span class="title">${e(m.title)}</span>${status?`<span class="status">${status}</span>`:'<span class="status"></span>'}</li>`;}).join('');
const phaseOutputs=p=>modules.filter(m=>m.phase===p.name);

// ---------- planning-system.html ----------
let ps=read('planning-system.html');
ps=region(ps,'ps-facts',`<div class="facts"><div><b>${moduleCount}</b><span>modules</span></div><div><b>${lessonCount}</b><span>lessons &amp; reviews</span></div><div><b>~${hours}</b><span>hours, self-paced</span></div></div>`,h=>divAt(h,'<div class="facts">'));
ps=region(ps,'ps-pack',`<div class="ps-pack-head"><div><small>YOUR ORGANISATION PACK</small><b>Planning System</b></div><span>0 of ${moduleCount}</span></div><div class="ps-pack-bar"><i></i></div><ol>${packRows()}</ol>`,h=>between(h,'<div class="ps-pack-head">','</ol>',{includeEnd:true}));
ps=region(ps,'ps-flow',`<div class="ps-flow"><div><span>1</span><b>Watch</b><small>a short video on the concept</small></div><div><span>2</span><b>Read</b><small>the explanation and a worked example</small></div><div><span>3</span><b>Apply</b><small>the guided exercise to your organisation</small></div><div><span>4</span><b>Excel</b><small>work offline in the module workbook</small></div><div><span>5</span><b>Save</b><small>your output into the organisation pack</small></div></div>`,h=>divAt(h,'<div class="ps-flow">'));
ps=region(ps,'ps-outcomes',`<ul class="ps-outcomes" style="list-style:none;padding:0">${modules.map(m=>`<li><b>${e(m.title)}.</b> ${e(m.short)}.</li>`).join('')}</ul>`,h=>between(h,'<ul class="ps-outcomes"','</ul>',{includeEnd:true}));
ps=region(ps,'ps-outputs',`<div class="ps-outputs">${modules.map(m=>`<article><span class="n">${moduleNumber(m)}</span><h3>${e(m.output)}</h3><p>${e(m.short)}.</p></article>`).join('')}</div>`,h=>divAt(h,'<div class="ps-outputs">'));
ps=region(ps,'ps-skills',`<div class="ps-skills">${['Strategic planning','Context analysis','Theory of Change','Governance','Organisation design','People management','Operations','MEAL','Brand strategy','Communications','Financial management','Compliance & risk','Fundraising & revenue','Partnerships','Annual planning'].map(s=>`<span>${e(s)}</span>`).join('')}</div>`,h=>between(h,'<div class="ps-skills">','</div>',{includeEnd:true}));
ps=region(ps,'ps-modules',`<div class="ps-modules">${phases.map(p=>`<h3 class="phase-heading">${e(p.name)} <small>${e(p.summary)}</small></h3>${phaseOutputs(p).map(m=>`<details id="module-${m.id}"><summary><span class="n">${moduleNumber(m)}</span><span class="title"><b>${e(m.title)}</b><small>${e(m.short)}</small></span><span class="meta">~${moduleHours(m)} h<b>${m.lessons.length} lessons</b></span><span class="toggle" aria-hidden="true"></span></summary><div class="body"><p>${e(m.intro)}</p><div class="creates">You create: ${e(m.output)} · Excel: ${e(m.workbook.file)}</div><ol>${m.lessons.map((l,i)=>`<li><span class="l">${m.id}.${i+1}</span><a href="${lessonURL(m,l)}">${e(l.title)}</a></li>`).join('')}</ol><a class="open" href="${m.slug}.html">Open Module ${moduleNumber(m)} →</a></div></details>`).join('')}`).join('')}</div>`,h=>divAt(h,'<div class="ps-modules">'));
ps=replaceAll(ps,[
 ['Leave with a strategic foundation and seven supporting plans — ready to share with your board, team or funders.',`Leave with a complete organisation pack — ${word(outputsCount)} connected outputs, from purpose to an operating plan, ready to share with your board, team or funders.`],
 ['An 8-module guided course that turns a purpose-led idea into a strategic foundation and seven supporting plans — from Theory of Change to funding and partnerships.',`A ${moduleCount}-module guided course that helps you build the organisation your purpose requires — from purpose and Theory of Change to governance, people, MEAL, finance, compliance, funding, partnerships and an operating plan.`],
 ['Eight tangible outputs. One strategy pack.',`${Word(outputsCount)} tangible outputs. One organisation pack.`],
 ['Eight modules. A clear next step.',`${Word(moduleCount)} modules. Five phases. One organisation.`],
 ['review all eight in','review all of them in'],
 ['Instructor videos and the founder\'s Excel files have not yet been supplied.','Every lesson has a video slot and a named sheet in its module workbook; instructor videos and the Excel workbooks are being prepared.'],
 ['learn.html?module=1&amp;lesson=purpose',startURL]
]);
write('planning-system.html',ps);

// ---------- index.html (home) ----------
let home=read('index.html');
home=region(home,'home-pack',`<div class="h-pack-head"><div><small>YOUR ORGANISATION PACK</small><b>Planning System</b></div><span>3 of ${moduleCount}</span></div><div class="h-pack-bar"><i></i></div><ol>${packRows('h',3)}</ol>`,h=>between(h,'<div class="h-pack-head">','</ol>',{includeEnd:true}));
home=region(home,'home-phases',`<div class="h-phases five">${phases.map((p,i)=>`<article><div class="num">${String(i+1).padStart(2,'0')} <span>${e(p.name)}</span></div><h3>${e(p.summary)}</h3><div class="outputs"><small>YOU'LL PRODUCE</small><ul>${phaseOutputs(p).map(m=>`<li>${e(m.output)}</li>`).join('')}</ul></div></article>`).join('')}</div>`,h=>divAt(h,'<div class="h-phases">'));
home=replaceAll(home,[
 ['Eight modules. Three phases. One strategy pack you actually use.',`${Word(moduleCount)} modules. Five phases. One organisation you can actually run.`],
 ['<div><b>8</b><span>modules</span></div>',`<div><b>${moduleCount}</b><span>modules</span></div>`],
 ['<div><b>14–16</b><span>hours, self-paced</span></div>',`<div><b>~${hours}</b><span>hours, self-paced</span></div>`]
]);
write('index.html',home);

// ---------- about.html ----------
let about=read('about.html');
about=region(about,'about-phases',`<div class="ab-phases five">${phases.map((p,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><small>${e(p.name.toUpperCase())}</small><p>${e(p.summary)}<em>${phaseOutputs(p).map(m=>e(m.title)).join(' · ')}</em></p></div>`).join('')}</div>`,h=>divAt(h,'<div class="ab-phases">'));
about=region(about,'about-outputs',`<h3>The ${word(outputsCount)} outputs of Course 01 (Planning System)</h3><div class="ab-outputs-strip">${modules.map(m=>`<span><b>${moduleNumber(m)}</b>${e(m.output)}</span>`).join('')}</div>`,h=>{const s=h.indexOf('<h3>The eight outputs');const [,end]=divAt(h,'<div class="ab-outputs-strip">');return [s,end];});
about=replaceAll(about,[['One method. Three phases. Eight outputs.',`One method. Five phases. ${Word(outputsCount)} outputs.`],['Each course moves in three phases','Each course moves through five phases'],['eight course outputs',`${word(outputsCount)} course outputs`]]);
write('about.html',about);

// ---------- courses.html ----------
let courses=read('courses.html');
courses=region(courses,'courses-outcomes',`<div class="outcome-card"><small>What you will build</small>${modules.map(m=>`<div><span>${moduleNumber(m)}</span>${e(m.output)}</div>`).join('')}</div>`,h=>divAt(h,'<div class="outcome-card">'));
courses=replaceAll(courses,[['8 modules · 45 lessons and reviews',`${moduleCount} modules · ${lessonCount} lessons and reviews`],['Eight practical organisational outputs',`${Word(outputsCount)} practical organisational outputs`],['Turn an initial idea into a strategic foundation, delivery plan and funding approach.','Build the organisation your purpose requires: strategy, structure, people, systems, MEAL, brand, finance, compliance, funding, partnerships and an operating plan.']]);
write('courses.html',courses);

// ---------- course size wording elsewhere ----------
for(const f of ['pricing.html','software.html','subscribe.html']){if(!existsSync(f))continue;write(f,replaceAll(read(f),[
 ['Planning System — 8 modules, 45 lessons',`Planning System — ${moduleCount} modules, ${lessonCount} lessons`],
 ['All eight modules of the Planning System (45 lessons)',`All ${word(moduleCount)} modules of the Planning System (${lessonCount} lessons and reviews)`],
 ['Available now · 8 modules, 45 lessons',`Available now · ${moduleCount} modules, ${lessonCount} lessons`],
 ['Self-paced, 14–16 hours',`Self-paced, about ${hours} hours`],
 ['The 8-module Planning System',`The ${moduleCount}-module Planning System`],
 ['Eight modules in the Planning System, from strategic foundation to funding and partnerships.',`${Word(moduleCount)} modules in the Planning System, from purpose and strategy to funding, partnerships and an operating plan.`]
]));}

// ---------- tool pages for preview tools that had none, and tool copy that named the old module numbers ----------
const toolShell=read('software-gantt.html');
const toolHead=toolShell.slice(0,toolShell.indexOf('<main')),toolTail=toolShell.slice(toolShell.indexOf('</main>')+'</main>'.length);
for(const slug of ['policy-management','marketing-social-planner']){const p=tool(slug);if(!p)continue;const f=`software-${slug}.html`;const block=existsSync(f)?(read(f).match(/<!-- course-tools:start -->[\s\S]*?<!-- course-tools:end -->/)||['<!-- course-tools:start --><!-- course-tools:end -->'])[0]:'<!-- course-tools:start --><!-- course-tools:end -->';write(f,toolHead.replace(/<title>[^<]*<\/title>/,`<title>${e(p.name)} | Mission & Method</title>`).replace(/data-product="[^"]*"/,`data-product="${slug}"`)+`<main id="main"><div class="catalog"><nav class="breadcrumbs"><a href="software.html">Impact Tools</a><span>› ${e(p.category)}</span></nav><span class="eyebrow">${e(p.category)} · Interactive preview</span><h1>${e(p.name)}</h1><p class="lead">${e(p.description)}</p><p>This browser-based preview saves work on this device. It does not yet provide secure multi-user access; avoid confidential records.</p><a class="button" href="${p.launchUrl}">Open ${e(p.name)} →</a><p><a href="software.html">← Explore all tools</a></p>${block}</div></main>`+toolTail);}
for(const f of ['software-gantt.html','software-strategy-kpis-annual-planning.html']){if(existsSync(f))write(f,replaceAll(read(f),[['Excel round-trip with the Module 6 Gantt workbook, and imports your annual plan.','Excel round-trip with the Module 13 workbook (Tasks sheet), and imports your annual plan.'],['Excel round-trip with the Module 6 workbook.','Excel round-trip with the Module 13 workbook (Objectives, KPIs, Annual plan and Results sheets).']]));}

// ---------- reading-library.html ----------
let lib=read('reading-library.html');
lib=lib.replace(/(<select id="module-filter"><option value="">All modules<\/option>)[\s\S]*?(<\/select>)/,`$1${modules.map(m=>`<option value="${m.id}">Module ${moduleNumber(m)} · ${e(m.title)}</option>`).join('')}$2`);
const libLessons=modules.map(m=>taught(m).map(l=>{const items=readingsFor(m.id,l.id);if(!items.length)return '';return `<section class="library-lesson" data-module="${m.id}" id="m${m.id}-${l.id}"><div class="library-lesson-heading"><span class="eyebrow">Module ${moduleNumber(m)} · ${e(m.title)}</span><h2>${m.id}.${m.lessons.indexOf(l)+1} ${e(l.title)}</h2><a href="${lessonURL(m,l)}">Open lesson →</a></div><div class="reading-list">${items.map(item=>`<article class="resource-card" data-module="${m.id}" data-type="${e(item.type)}" data-level="${e(item.level)}" data-tags="${e(item.tags.join(' '))}" data-search="${e([item.title,item.organisation,item.why,item.use,...item.tags].join(' ').toLowerCase())}"><div class="resource-card-top"><span class="resource-type">${e(item.type)}</span><span class="resource-level">${e(item.level)}</span></div><p class="resource-category">${e(item.category)}</p><h3>${e(item.title)}</h3><p class="subtle">${e(item.organisation)}</p><p>${e(item.why)}</p><p class="resource-use"><b>Best moment →</b> ${e(item.use)}</p><div class="resource-tags">${item.tags.map(t=>`<span>${e(t)}</span>`).join('')}</div><div class="resource-actions"><a href="${item.url}" target="_blank" rel="noopener">Open resource ↗</a>${item.downloadUrl?`<a href="${item.downloadUrl}" target="_blank" rel="noopener">Download PDF ↓</a>`:''}</div></article>`).join('')}</div></section>`;}).join('')).join('');
lib=lib.replace(/(<div id="library-results" class="evidence-results">)[\s\S]*?(<\/div><p id="library-empty")/,(_,a,b)=>a+libLessons+b);
lib=lib.replace(/Showing all \d+ resources/,`Showing all ${resources.length} resources`);
write('reading-library.html',lib);

// ---------- resources.html (course workbooks) ----------
let res=read('resources.html');
const resMain=`<div class="catalog"><span class="eyebrow">Included with your course</span><h1>One Excel workbook for every module.</h1><p class="lead">Each module of the Planning System has its own workbook, with one sheet per lesson. Use it offline, share it with colleagues or keep a version history. Workbooks are part of the paid course at no additional cost; they do not require a software subscription.</p><p>Sheets named after an Impact Tool (for example <b>Roles</b>, <b>Indicators</b>, <b>Risks</b> or <b>Tasks</b>) use that tool’s columns, so you can import the workbook into the tool later without retyping. The workbooks are being prepared; downloads open to course purchasers once each file is versioned and access is verified.</p>${phases.map(p=>`<h2 class="phase-heading">${e(p.name)} <small>${e(p.summary)}</small></h2>${phaseOutputs(p).map(m=>`<section class="card" id="module-${m.id}" style="margin:16px 0"><span class="eyebrow">Planning System · Module ${moduleNumber(m)}</span><h3>${e(m.workbook.title)}</h3><p><b>File:</b> ${e(m.workbook.file)} · <b>Status:</b> being prepared</p><p><b>Use it for:</b> ${e(m.output)}.</p><details><summary>Sheets in this workbook</summary><ul>${taught(m).map(l=>`<li><b>${e(lessonSheets(l).join(', '))}</b> — ${m.id}.${m.lessons.indexOf(l)+1} ${e(l.title)}${l.tools.length?` · imports into ${l.tools.map(tool).filter(Boolean).map(t=>e(toolName(t))).join(', ')}`:''}</li>`).join('')}</ul></details><a href="${m.slug}.html">Open Module ${moduleNumber(m)} →</a></section>`).join('')}`).join('')}<h2>Further reading</h2><p>The <a href="reading-library.html">Evidence Library</a> provides supplementary readings. The guided lessons explain each concept before the exercise.</p></div>`;
res=res.replace(/<main id="main">[\s\S]*<\/main>/,`<main id="main">${resMain}</main>`);
write('resources.html',res);

// ---------- start links and cache-busting for the learning workspace ----------
for(const f of [...readdirSync('.').filter(n=>n.endsWith('.html')),'app.js']){if(!existsSync(f))continue;let t=read(f);const before=t;t=t.replace(/learning\.css(\?v=[^"']*)?/g,'learning.css?v=course2');
 // The home page keeps its "write your purpose today" preview link; every other "start learning" link opens Module 0.
 if(f!=='index.html')t=t.split('learn.html?module=1&amp;lesson=purpose').join(startURL).split('learn.html?module=1&lesson=purpose').join(startURL.replace('&amp;','&'));
 if(t!==before)write(f,t);}
console.log(`${moduleCount} modules · ${lessonCount} lessons · ~${hours} hours`);
