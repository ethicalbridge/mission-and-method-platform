// Regenerates every course-structure page from course-data.js without touching hand-built page designs.
// Run after changing modules or lessons: node scripts/generate-course-pages.mjs && node scripts/course-tool-links.mjs
// - Module pages (<slug>.html) and redirects from the old 8-module page names
// - Course sections inside planning-system.html, index.html, about.html, courses.html (between generated markers)
// - Evidence Library lesson list and module filter, course resources page
// - Course size wording on pricing and software pages
import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {modules,phases,lessonCount,moduleCount,moduleNumber,lessonSheets,readingsFor,resources,courseToolLabels,courseFor,freeModules} from '../course-data.js';
import {softwareProducts,previewToolSlugs} from '../products.js';
import {pricing,money,coursesTotal,pathwaySaving,bundleSaving} from '../pricing-config.js';
import {coursePricing,suiteIntro,conversionOptions} from './pricing-sections.mjs';
// Five courses, one per phase.
const courseLabel=p=>`Course ${p.number} · ${p.name}`;
const coursePrice=p=>pricing.courses.find(c=>c.id===p.id).price;
const coursePage=p=>`course-${p.id}.html`;
const courseLessons=p=>modules.filter(m=>m.phase===p.name).reduce((n,m)=>n+m.lessons.length,0);
const courseHours=p=>Math.round(modules.filter(m=>m.phase===p.name).flatMap(m=>m.lessons).reduce((n,l)=>n+l.minutes,0)/60);
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
const page=(title,body)=>shellHead.replace(/<title>[^<]*<\/title>/,`<title>${e(title)} | Method into Impact</title>`)+`<main id="main">${body}</main>`+shellTail;

// ---------- module pages ----------
function promoStatic(m){const p=m.promo;const tools=p.tools.map(tool).filter(Boolean);return `<aside class="tools-promo"><div class="tools-promo-copy"><span class="eyebrow">Impact Tools · optional subscription</span><h2>${e(p.headline)}</h2><p>${e(p.pitch)}</p><ul class="promo-tools">${tools.map(t=>`<li><b>${e(toolName(t))}</b><span>${e(t.description)}</span></li>`).join('')}</ul><div class="toolbar"><a class="button" href="pricing.html#software">See subscription options</a><a class="button ghost" href="${toolHref(tools[0])}">Try ${e(toolName(tools[0]))} →</a></div><p class="subtle">The course and its Excel workbook are complete on their own. The workbook imports into these tools if you subscribe later.</p></div><div class="demo-slot"><div class="video-slot"><div class="video-placeholder demo" role="img" aria-label="Tool demo coming soon"><span class="play-icon" aria-hidden="true">▶</span><b>See ${e(toolName(tools[0]))} in action</b><small>Demo video coming soon.</small></div></div></div></aside>`;}
function modulePage(m){
 const sheets=[...new Set(taught(m).flatMap(lessonSheets))];
 let part='';
 const items=m.lessons.map((l,i)=>{const head=l.part&&l.part!==part?`<li class="part-row"><b>${e(l.part)}</b></li>`:'';part=l.part||part;const tools=l.tools.map(tool).filter(Boolean);return `${head}<li><span class="num">${m.id}.${i+1}</span><a href="${lessonURL(m,l)}"><b>${e(l.title)}</b></a><span class="meta">${l.review?'Module review and output':`${e(l.stage)} · Video · Reading · Exercise · Excel: ${e(lessonSheets(l).join(', '))}${tools.length?` · Tool: ${tools.map(t=>e(toolName(t))).join(', ')}`:''}`}</span></li>`;}).join('');
 return page(m.title,`<div class="catalog"><nav class="breadcrumbs"><a href="planning-system.html">Planning System</a><span>› Module ${moduleNumber(m)} of ${moduleCount-1}</span></nav><span class="eyebrow">${e(courseLabel(courseFor(m)))} · Module ${moduleNumber(m)}</span><h1>${e(m.title)}</h1><p class="lead">${e(m.intro)}</p><p class="course-tag">${freeModules.includes(m.id)?'<b>Free</b> · open to everyone, no purchase needed.':`Part of <a href="${coursePage(courseFor(m))}"><b>${e(courseLabel(courseFor(m)))}</b></a> · ${money(coursePrice(courseFor(m)))}, or all five courses for ${money(pricing.course.launch)}.`}</p><div class="module-page-grid"><div><p><b>You create:</b> ${e(m.output)}</p><p><b>${m.lessons.length} lessons and reviews</b> · about ${moduleHours(m)} hours including exercises.</p><p>Every lesson has a short video, the written explanation with examples, a guided exercise that saves into your organisation pack, and a sheet in the <b>${e(m.workbook.title)}</b>.</p><a class="button" href="${lessonURL(m)}">Begin this module →</a></div><div><span class="eyebrow">Module introduction</span><div class="video-slot"><div class="video-placeholder" role="img" aria-label="Module introduction video coming soon"><span class="play-icon" aria-hidden="true">▶</span><b>Module ${moduleNumber(m)} introduction</b><small>Video coming soon.</small></div></div></div></div><h2>Your lesson sequence</h2><ol class="module-sections">${items}</ol><section class="excel-panel" id="workbook"><span class="eyebrow">Excel</span><h2>${e(m.workbook.title)}</h2><p><b>${e(m.workbook.file)}</b> · included with the course. Sheets: ${sheets.map(s=>e(s)).join(', ')}.</p><p class="subtle">Sheets named after a tool use that tool’s columns, so the workbook can be imported into the Impact Tools without retyping. The file is being prepared and will be available to course purchasers.</p></section>${promoStatic(m)}<p><a href="organisation.html">Review your saved outputs →</a></p><!-- course-tools:start --><!-- course-tools:end --></div>`);
}
for(const m of modules){const f=`${m.slug}.html`;let html=modulePage(m);if(existsSync(f)){const old=read(f);const block=old.match(/<!-- course-tools:start -->[\s\S]*?<!-- course-tools:end -->/);if(block)html=html.replace(/<!-- course-tools:start --><!-- course-tools:end -->/,block[0]);}write(f,html);}
const redirects={'team-organisation':'structure-governance','organisation-systems':'internal-systems','policies-procedures':'legal-compliance-risk','business-model':'fundraising-revenue','fundraising-partnerships':'fundraising-revenue'};
for(const [from,to] of Object.entries(redirects))write(`${from}.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${to}.html"><link rel="canonical" href="${to}.html"><title>Moved | Method into Impact</title></head><body><p>This module has moved. <a href="${to}.html">Continue to the new module page →</a></p></body></html>`);

// ---------- course lists reused on several pages ----------
const packRows=(cls,progress)=>modules.map((m,i)=>{const state=progress?i<progress?'done':i===progress?'now':'todo':i===0?'now':'todo';const status=progress?i<progress?'Complete':i===progress?'In progress':'':i===0?'Start here':'';return `<li><span class="dot ${state}"></span><span class="num">${moduleNumber(m)}</span><span class="title">${e(m.title)}</span>${status?`<span class="status">${status}</span>`:'<span class="status"></span>'}</li>`;}).join('');
const phaseOutputs=p=>modules.filter(m=>m.phase===p.name);

// ---------- planning-system.html ----------
let ps=read('planning-system.html');
ps=region(ps,'ps-facts',`<div class="facts"><div><b>${phases.length}</b><span>courses</span></div><div><b>${moduleCount}</b><span>modules</span></div><div><b>${lessonCount}</b><span>lessons &amp; reviews</span></div><div><b>~${hours}</b><span>hours, self-paced</span></div></div>`,h=>divAt(h,'<div class="facts">'));
ps=region(ps,'ps-pack',`<div class="ps-pack-head"><div><small>YOUR ORGANISATION PACK</small><b>Planning System</b></div><span>0 of ${moduleCount}</span></div><div class="ps-pack-bar"><i></i></div><ol>${packRows()}</ol>`,h=>between(h,'<div class="ps-pack-head">','</ol>',{includeEnd:true}));
ps=region(ps,'ps-flow',`<div class="ps-flow"><div><span>1</span><b>Watch</b><small>a short video on the concept</small></div><div><span>2</span><b>Read</b><small>the explanation and a worked example</small></div><div><span>3</span><b>Apply</b><small>the guided exercise to your organisation</small></div><div><span>4</span><b>Excel</b><small>work offline in the module workbook</small></div><div><span>5</span><b>Save</b><small>your output into the organisation pack</small></div></div>`,h=>divAt(h,'<div class="ps-flow">'));
ps=region(ps,'ps-outcomes',`<ul class="ps-outcomes" style="list-style:none;padding:0">${modules.map(m=>`<li><b>${e(m.title)}.</b> ${e(m.short)}.</li>`).join('')}</ul>`,h=>between(h,'<ul class="ps-outcomes"','</ul>',{includeEnd:true}));
ps=region(ps,'ps-outputs',`<div class="ps-outputs">${modules.map(m=>`<article><span class="n">${moduleNumber(m)}</span><h3>${e(m.output)}</h3><p>${e(m.short)}.</p></article>`).join('')}</div>`,h=>divAt(h,'<div class="ps-outputs">'));
ps=region(ps,'ps-skills',`<div class="ps-skills">${['Strategic planning','Context analysis','Theory of Change','Governance','Organisation design','People management','Operations','MEAL','Brand strategy','Communications','Financial management','Compliance & risk','Fundraising & revenue','Partnerships','Annual planning'].map(s=>`<span>${e(s)}</span>`).join('')}</div>`,h=>between(h,'<div class="ps-skills">','</div>',{includeEnd:true}));
ps=region(ps,'ps-modules',`<div class="ps-modules">${phases.map(p=>`<h3 class="phase-heading">${e(courseLabel(p))} · ${money(coursePrice(p))} <small>${e(p.summary)} · ${courseLessons(p)} lessons · about ${courseHours(p)} hours · <a href="${coursePage(p)}">About this course →</a></small></h3>${phaseOutputs(p).map(m=>`<details id="module-${m.id}"><summary><span class="n">${moduleNumber(m)}</span><span class="title"><b>${e(m.title)}</b><small>${e(m.short)}</small></span><span class="meta">~${moduleHours(m)} h<b>${m.lessons.length} lessons</b></span><span class="toggle" aria-hidden="true"></span></summary><div class="body"><p>${e(m.intro)}</p><div class="creates">You create: ${e(m.output)} · Excel: ${e(m.workbook.file)}</div><ol>${m.lessons.map((l,i)=>`<li><span class="l">${m.id}.${i+1}</span><a href="${lessonURL(m,l)}">${e(l.title)}</a></li>`).join('')}</ol><a class="open" href="${m.slug}.html">Open Module ${moduleNumber(m)} →</a></div></details>`).join('')}`).join('')}</div>`,h=>divAt(h,'<div class="ps-modules">'));
ps=replaceAll(ps,[
 ['Leave with a strategic foundation and seven supporting plans — ready to share with your board, team or funders.',`Leave with a complete organisation pack — ${word(outputsCount)} connected outputs, from purpose to an operating plan, ready to share with your board, team or funders.`],
 ['An 8-module guided course that turns a purpose-led idea into a strategic foundation and seven supporting plans — from Theory of Change to funding and partnerships.',`A ${moduleCount}-module guided course that helps you build the organisation your purpose requires — from purpose and Theory of Change to governance, people, MEAL, finance, compliance, funding, partnerships and an operating plan.`],
 ['Eight tangible outputs. One strategy pack.',`${Word(outputsCount)} tangible outputs. One organisation pack.`],
 ['Eight modules. A clear next step.',`Five courses. ${Word(moduleCount)} modules. One organisation.`],
 [`${Word(moduleCount)} modules. Five phases. One organisation.`,`Five courses. ${Word(moduleCount)} modules. One organisation.`],
 ['review all eight in','review all of them in'],
 ['COURSE 01 · AVAILABLE NOW','FIVE COURSES · ONE PATHWAY'],
 ['Instructor videos and the founder\'s Excel files have not yet been supplied.','Every lesson has a video slot and a named sheet in its module workbook; instructor videos and the Excel workbooks are being prepared.'],
 ['learn.html?module=1&amp;lesson=purpose',startURL]
]);
write('planning-system.html',ps);

// ---------- index.html (home) ----------
let home=read('index.html');
home=region(home,'home-pack',`<div class="h-pack-head"><div><small>YOUR ORGANISATION PACK</small><b>Planning System</b></div><span>3 of ${moduleCount}</span></div><div class="h-pack-bar"><i></i></div><ol>${packRows('h',3)}</ol>`,h=>between(h,'<div class="h-pack-head">','</ol>',{includeEnd:true}));
home=region(home,'home-phases',`<div class="h-phases five">${phases.map((p,i)=>`<article><div class="num">${String(i+1).padStart(2,'0')} <span>${e(p.name)}</span></div><h3>${e(p.summary)}</h3><p>Course ${p.number} · ${money(coursePrice(p))} · <a href="${coursePage(p)}">See the course →</a></p><div class="outputs"><small>YOU'LL PRODUCE</small><ul>${phaseOutputs(p).map(m=>`<li>${e(m.output)}</li>`).join('')}</ul></div></article>`).join('')}</div>`,h=>divAt(h,'<div class="h-phases">'));
home=replaceAll(home,[
 ['Eight modules. Three phases. One strategy pack you actually use.',`Five courses. ${Word(moduleCount)} modules. One organisation you can actually run.`],
 [`${Word(moduleCount)} modules. Five phases. One organisation you can actually run.`,`Five courses. ${Word(moduleCount)} modules. One organisation you can actually run.`],
 ['<div><b>8</b><span>modules</span></div>',`<div><b>${moduleCount}</b><span>modules</span></div>`],
 ['<div><b>14–16</b><span>hours, self-paced</span></div>',`<div><b>~${hours}</b><span>hours, self-paced</span></div>`]
]);
home=region(home,'home-roadmap',`<div class="panel"><div class="lead"><div class="tags"><span>FIVE COURSES</span><span class="pill">Preview open</span></div><h2>The Planning System</h2><p>Everything a purpose-led founder needs to build, run and sustain the organisation their purpose requires — in five courses you can take one at a time or all together.</p><div class="stats"><div><b>${phases.length}</b><span>courses · ${money(pricing.courses[0].price)} each</span></div><div><b>${money(pricing.course.launch)}</b><span>all five · save ${money(pathwaySaving())}</span></div><div><b>Free</b><span>Module 0 · Start Here</span></div></div><div class="cta"><a class="btn" href="courses.html">See the five courses</a><a class="link" href="${startURL}">Start free with Module 0 →</a></div></div><div class="next"><small>THE FIVE COURSES</small>${phases.map(p=>`<article><div class="row"><span class="n">COURSE 0${p.number}</span><span class="s">${money(coursePrice(p))}</span></div><b><a href="${coursePage(p)}">${e(p.name)}</a></b><p>${e(p.summary)}.</p></article>`).join('')}</div></div>`,h=>divAt(h,'<div class="panel">'));
write('index.html',home);

// ---------- about.html ----------
let about=read('about.html');
about=region(about,'about-phases',`<div class="ab-phases five">${phases.map((p,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><small>COURSE ${p.number} · ${e(p.name.toUpperCase())}</small><p>${e(p.summary)}<em>${phaseOutputs(p).map(m=>e(m.title)).join(' · ')}</em></p></div>`).join('')}</div>`,h=>divAt(h,'<div class="ab-phases">'));
about=region(about,'about-outputs',`<h3>The ${word(outputsCount)} outputs of the Planning System</h3><div class="ab-outputs-strip">${modules.map(m=>`<span><b>${moduleNumber(m)}</b>${e(m.output)}</span>`).join('')}</div>`,h=>{const s=h.indexOf('<h3>The eight outputs');const [,end]=divAt(h,'<div class="ab-outputs-strip">');return [s,end];});
about=replaceAll(about,[['One method. Three phases. Eight outputs.',`One method. Five courses. ${Word(outputsCount)} outputs.`],[`One method. Five phases. ${Word(outputsCount)} outputs.`,`One method. Five courses. ${Word(outputsCount)} outputs.`],['Each course moves in three phases','The Planning System moves through five courses'],['Each course moves through five phases','The Planning System moves through five courses'],['eight course outputs',`${word(outputsCount)} course outputs`],
 ['Planning System (available now) · Implementing System (coming) · Scaling Up System (coming) · Excel resources','Planning System: five courses (Clarify · Organise · Prove &amp; Show · Protect · Sustain &amp; Run) · Excel workbooks'],
 [`The ${word(outputsCount)} outputs of Course 01 (Planning System)`,`The ${word(outputsCount)} outputs of the Planning System`],
 ['Integrated suite, expert packages and Course 2 (Implementing System) sold through channels.','Integrated suite, expert packages and all five courses sold through repeatable channels.'],
 ['Scaling Up System live. New regions, languages and partner programmes where demand is proven.','New regions, languages and partner programmes where demand is proven.']]);
write('about.html',about);

// ---------- the five courses: courses.html and one page per course ----------
const courseCard=p=>`<article class="card course-offer"><span class="small-tag">${e(courseLabel(p))}</span><h2><a href="${coursePage(p)}">${e(p.title)}</a></h2><p>${e(p.summary)}.</p><ul>${modules.filter(m=>m.phase===p.name).map(m=>`<li>Module ${moduleNumber(m)} · ${e(m.title)}${freeModules.includes(m.id)?' <b>(free)</b>':''}</li>`).join('')}</ul><p class="subtle">${courseLessons(p)} lessons and reviews · about ${courseHours(p)} hours · Excel workbook for every module</p><p class="course-offer-price"><b>${money(coursePrice(p))}</b> one-time · lifetime access</p><div class="toolbar"><a class="button" href="purchase.html?offer=${p.id}">Get ${e(p.name)}</a><a class="plain-button" href="${coursePage(p)}">What you’ll build →</a></div></article>`;
const pathwayCard=()=>`<article class="featured-course"><div class="featured-copy"><span class="tag">Best value · all five courses</span><h2>The Planning System · Full Pathway</h2><p>Build the organisation your purpose requires: strategy, structure, people, systems, MEAL, brand, finance, compliance, funding, partnerships and an operating plan.</p><ul><li>All ${phases.length} courses · ${moduleCount} modules · ${lessonCount} lessons and reviews</li><li>${Word(outputsCount)} practical organisational outputs</li><li>An Excel workbook for every module</li><li>No software purchase required</li></ul><p><del>${money(coursesTotal())}</del> <b>${money(pricing.course.launch)}</b> one-time · save ${money(pathwaySaving())} · lifetime access</p><div class="toolbar"><a class="button" href="purchase.html?offer=course">Get the Full Pathway</a><a class="plain-button" href="planning-system.html">Explore all modules →</a></div><p class="subtle">Add 12 months of the Impact Tools: <a href="purchase.html?offer=bundle">Full Pathway + Software, ${money(pricing.bundle.launch)}</a>.</p></div><div class="outcome-card"><small>What you will build</small>${modules.map(m=>`<div><span>${moduleNumber(m)}</span>${e(m.output)}</div>`).join('')}</div></article>`;
let courses=read('courses.html');
courses=courses.replace(/<main id="main">[\s\S]*<\/main>/,`<main id="main"><div class="catalog"><span class="eyebrow">Learn, apply, build</span><h1>Five courses. One organisation.</h1><p class="lead">The Planning System takes you from purpose to an organisation you can run, in five courses. Take them in order, one at a time for ${money(pricing.courses[0].price)} each, or get all five together. Module 0 is free for everyone.</p><p><a class="button ghost" href="${startURL}">Start free with Module 0 →</a></p>${pathwayCard()}<section class="course-cards five-courses">${phases.map(courseCard).join('')}</section><section class="card"><h2>Need more than a course?</h2><p>Run your plans in the <a href="software.html">Impact Tools</a>, adapt our <a href="legal-templates.html">legal templates</a>, or <a href="experts.html">work with our experts</a> on a focused piece or a tailored foundation package.</p></section></div></main>`);
write('courses.html',courses);
for(const p of phases){
 const mods=modules.filter(m=>m.phase===p.name);
 write(coursePage(p),page(courseLabel(p),`<div class="catalog"><nav class="breadcrumbs"><a href="courses.html">Courses</a><span>› ${e(courseLabel(p))}</span></nav><span class="eyebrow">${e(courseLabel(p))} of ${phases.length} · Planning System</span><h1>${e(p.title)}</h1><p class="lead">${e(p.summary)}. ${mods.map(m=>e(m.short)).join('. ')}.</p><div class="module-page-grid"><div><p><b>${money(coursePrice(p))}</b> one-time · lifetime access · ${courseLessons(p)} lessons and reviews · about ${courseHours(p)} hours.</p><p>Every lesson has a short video, the written explanation with examples, a guided exercise that saves into your organisation pack, and a sheet in the module’s Excel workbook.</p><div class="toolbar"><a class="button" href="purchase.html?offer=${p.id}">Get ${e(p.name)} · ${money(coursePrice(p))}</a><a class="button ghost" href="${lessonURL(mods[0])}">Preview the first lesson</a></div><p class="subtle">Or get all five courses for ${money(pricing.course.launch)} and save ${money(pathwaySaving())}. <a href="courses.html">Compare →</a></p></div><div><span class="eyebrow">Course introduction</span><div class="video-slot"><div class="video-placeholder" role="img" aria-label="Course introduction video coming soon"><span class="play-icon" aria-hidden="true">▶</span><b>${e(courseLabel(p))}</b><small>Video coming soon.</small></div></div></div></div><h2>What you’ll build</h2>${mods.map(m=>`<section class="card" style="margin:14px 0"><span class="eyebrow">Module ${moduleNumber(m)}${freeModules.includes(m.id)?' · Free':''}</span><h3><a href="${m.slug}.html">${e(m.title)}</a></h3><p>${e(m.intro)}</p><p><b>You create:</b> ${e(m.output)} · ${m.lessons.length} lessons · Excel: ${e(m.workbook.file)}</p></section>`).join('')}${p.number<phases.length?`<p>Next: <a href="${coursePage(phases[p.number])}">${e(courseLabel(phases[p.number]))} →</a></p>`:''}</div>`));
}

// ---------- pricing.html (hand-built): course offer cards and course detail ----------
const elementAround=(h,marker,tag)=>{const i=h.indexOf(marker);if(i<0)return [-1,-1];const s=h.lastIndexOf(`<${tag}`,i);const t=h.indexOf(`</${tag}>`,i);return [s,t<0?-1:t+tag.length+3];};
const divFrom=(h,anchor,marker)=>{const a=h.indexOf(anchor);if(a<0)return [-1,-1];const [s,t]=divAt(h.slice(a),marker);return s<0?[-1,-1]:[a+s,a+t];};
let pr=read('pricing.html');
pr=region(pr,'pricing-courses-card',`<article><div class="num">OFFER 03 · COURSES</div><h3>Courses</h3><p class="tag">Learn the method</p><div class="price"><b>${money(pricing.courses[0].price).replace('US','')}</b><small>per course, one-time</small></div><div class="strike">All five for ${money(pricing.course.launch).replace('US','')} · save ${money(pathwaySaving()).replace('US','')}</div><div class="explain">Five courses that take you from purpose to an organisation you can run. Take one at a time or the full pathway; everything you produce is yours to keep.</div><ul>${phases.map(p=>`<li>${e(courseLabel(p))}</li>`).join('')}<li>Module 0 free · Excel workbook for every module</li></ul><a class="cta" href="courses.html">See the five courses</a></article>`,h=>elementAround(h,'OFFER 03 · COURSES','article'));
pr=region(pr,'pricing-bundle-card',`<article class="featured"><span class="flag">MOST COMPLETE</span><div class="num">OFFER 05 · COURSES + SOFTWARE</div><h3>Full Pathway + Software</h3><p class="tag">Learn, then run</p><div class="price"><b>${money(pricing.bundle.launch).replace('US','')}</b><small>bundle</small></div><div class="strike" style="color:#a8bfc3">Save ${money(bundleSaving()).replace('US','')} vs. buying separately · when Software launches</div><div class="explain">All five courses plus a year of the Impact Tools. Course workbooks import into the tools, so you finish the courses with a real running system.</div><ul><li>All five courses, lifetime access</li><li>12 months of the Software Suite (starts when paid plans open)</li><li>Workbooks import straight into the tools</li><li>Guided set-up in the first 30 days</li></ul><a class="cta" href="purchase.html?offer=bundle">Choose the bundle</a></article>`,h=>elementAround(h,'OFFER 05 · COURSE','article'));
pr=region(pr,'pricing-course-plans',`<div class="plans"><article class="pop"><div class="info"><h4>Full Pathway · all five courses</h4><small>${moduleCount} modules · ${lessonCount} lessons and reviews</small></div><div class="price"><b>${money(pricing.course.launch).replace('US','')}</b><span>save ${money(pathwaySaving()).replace('US','')}</span></div></article>${phases.map(p=>`<article><div class="info"><h4><a href="${coursePage(p)}">${e(courseLabel(p))}</a></h4><small>${courseLessons(p)} lessons · about ${courseHours(p)} hours</small></div><div class="price"><b>${money(coursePrice(p)).replace('US','')}</b><span>one-time</span></div></article>`).join('')}<article class="free"><div class="info"><h4>Module 0 · Start Here</h4><small>Try the method before you buy · no account needed</small></div><div class="price"><b>Free</b><span>available now</span></div></article></div>`,h=>divFrom(h,'id="course"','<div class="plans">'));
pr=replaceAll(pr,[['(previews now, full sale once Excel resources upload)','(five courses; Module 0 is free; previews now, full sale once the Excel workbooks upload)'],[' Paid Software Suite plans and the future Implementing / Scaling Up courses are on the roadmap.',' Paid Software Suite plans are on the roadmap.']]);
pr=replaceAll(pr,[['Guided exercises that produce eight real strategy documents',`Guided exercises that produce ${word(outputsCount)} organisational outputs`],['All fourteen modules of the Planning System',`All five courses and ${word(moduleCount)} modules of the Planning System`],['the eight-module method','the five-course method'],['Every one of the 8 course outputs',`Every one of the ${outputsCount} course outputs`],['turns the eight course outputs into','turns the course outputs into']]);
write('pricing.html',pr);

// ---------- subscribe.html: shared pricing sections ----------
let sub=read('subscribe.html');
sub=sub.replace(/<main id="main">[\s\S]*<\/main>/,`<main id="main"><div class="catalog"><span class="eyebrow">Learn · apply · scale</span><h1>Choose your courses.<br>Add software if it helps.</h1>${coursePricing()}${suiteIntro({showPricing:true})}${conversionOptions()}</div></main>`);
write('subscribe.html',sub);

// ---------- navigation menu (built by app.js): list the five courses ----------
let appjs=read('app.js');
appjs=appjs.replace(/<div class="future-course-list"[^>]*>[\s\S]*?<\/div>/,`<div class="future-course-list" aria-label="The five courses">${phases.map(p=>`<a href="${coursePage(p)}"><b>${e(courseLabel(p))}</b><small>${money(coursePrice(p))}</small></a>`).join('')}</div>`).replace('<span class="course-menu-caption">Available course</span>','<span class="course-menu-caption">Five courses · one pathway</span>');
write('app.js',appjs);

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
for(const slug of ['policy-management','marketing-social-planner']){const p=tool(slug);if(!p)continue;const f=`software-${slug}.html`;const block=existsSync(f)?(read(f).match(/<!-- course-tools:start -->[\s\S]*?<!-- course-tools:end -->/)||['<!-- course-tools:start --><!-- course-tools:end -->'])[0]:'<!-- course-tools:start --><!-- course-tools:end -->';write(f,toolHead.replace(/<title>[^<]*<\/title>/,`<title>${e(p.name)} | Method into Impact</title>`).replace(/data-product="[^"]*"/,`data-product="${slug}"`)+`<main id="main"><div class="catalog"><nav class="breadcrumbs"><a href="software.html">Impact Tools</a><span>› ${e(p.category)}</span></nav><span class="eyebrow">${e(p.category)} · Interactive preview</span><h1>${e(p.name)}</h1><p class="lead">${e(p.description)}</p><p>This browser-based preview saves work on this device. It does not yet provide secure multi-user access; avoid confidential records.</p><a class="button" href="${p.launchUrl}">Open ${e(p.name)} →</a><p><a href="software.html">← Explore all tools</a></p>${block}</div></main>`+toolTail);}
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
