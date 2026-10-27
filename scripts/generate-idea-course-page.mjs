// Writes course-idea.html: the course page for "Idea into Impact", the starter course for entrepreneurs.
// Same shell and module list design as the five organisation course pages. Run after editing course/f0*.js:
//   node scripts/generate-idea-course-page.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {founderCourse,founderModules,lessonPath,exampleOrg} from '../course-data.js';
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const url=(m,l)=>`/${lessonPath(m,l)}`;
const base=readFileSync('course-clarify.html','utf8');
const head=base.slice(0,base.indexOf('<main')),tail=base.slice(base.indexOf('</main>')).replace(/<script src="assets\/js\/course-video\.js[^"]*" defer><\/script>/,'');
const c=founderCourse,mods=founderModules;
const lessons=mods.reduce((n,m)=>n+m.lessons.length,0);
const hours=Math.round(mods.flatMap(m=>m.lessons).reduce((n,l)=>n+l.minutes,0)/30)/2;
const first=url(mods[0],mods[0].lessons[0]);
const block=m=>`<details class="cm-module" id="module-${m.no}"><summary class="cm-module-header"><span class="cm-module-num">Module ${m.no}</span><span class="cm-title-block"><span class="cm-title">${e(m.title)}</span><span class="cm-meta">${m.lessons.length} lessons · you create: ${e(m.output)}</span></span><span class="cm-expand" aria-hidden="true">+</span></summary><div class="cm-module-body"><p>${e(m.intro)}</p><ol class="cm-lessons">${m.lessons.map((l,i)=>`<li class="cm-lesson${l.review?' cm-review':''}"><div class="cm-lesson-head"><span class="cm-lesson-no">${m.no}.${i+1}</span><a href="${url(m,l)}">${e(l.title)}</a><span class="cm-lesson-min">${l.review?'Course review':`${l.minutes} min`}</span></div></li>`).join('')}</ol><div class="cm-actions"><a class="button ghost" href="${url(m,m.lessons[0])}">Start Module ${m.no} →</a></div></div></details>`;
const ex=['idea','huerta','mentors'].map(exampleOrg);
const main=`<main id="main"><div class="catalog"><nav class="breadcrumbs"><a href="entrepreneurs.html">For entrepreneurs</a><span>› ${e(c.name)}</span></nav>
<header class="course-band course-band-idea"><div class="course-band-badge" aria-hidden="true"><small>Start</small><b>0→1</b></div><div class="course-band-text"><span class="course-band-num">The starter course for entrepreneurs</span><h1>${e(c.title)}</h1><p class="course-band-meta">${e(c.summary)} · ${mods.length} modules · ${lessons} lessons · about ${hours} hours</p></div></header>
<p class="lead">For people with an idea and nothing built yet: a project, a nonprofit, a social business or a cooperative. In five short modules you test the idea with real people, shape a small first version, start safely and plan your first 90 days. You finish with a Launch Plan you can share.</p>
<div class="course-offer"><p><b>The same five steps as the organisation courses</b>, kept simple: Clarify, Organise, Prove &amp; Show, Protect, Sustain &amp; Run.</p><p>Every lesson has a short explanation, three founders’ answers to learn from and a guided exercise that saves into your Launch Plan. Nothing assumes you already have an organisation, a team or a budget.</p><div class="toolbar"><a class="button" href="${first}">Start the first lesson</a><a class="button ghost" href="work-with-julieta.html#path-idea">Prefer to build it with Julieta?</a></div></div>
<section class="cm-modules" id="modules" aria-labelledby="cm-heading"><h2 id="cm-heading">What you’ll build</h2><p class="cm-intro">${mods.length} modules, each opening to its lessons. Your answers come together in the last lesson as one Launch Plan.</p>${mods.map(block).join('')}</section>
<section class="idea-founders" aria-labelledby="founders-heading"><h2 id="founders-heading">Three founders, the same exercises</h2><p>Every lesson shows how three fictional founders answer it, so you can follow the one closest to you.</p><ul>${ex.map(o=>`<li><b>${e(o.name)}</b> · ${e(o.label)} · ${e(o.place)}</li>`).join('')}</ul></section>
<p>Already running an organisation? <a href="organisations.html">See the five foundation courses for organisations →</a></p></div></main>`;
writeFileSync('course-idea.html',head.replace(/<title>[^<]*<\/title>/,`<title>${e(c.name)} · Course for entrepreneurs | Method into Impact</title>`).replace(/<meta name="description" content="[^"]*">\n?/,'').replace('</title>',`</title><meta name="description" content="${e(`${c.name}: the starter course for entrepreneurs. ${c.summary}, in ${mods.length} short modules.`)}">`)+main+tail);
console.log('wrote course-idea.html');
