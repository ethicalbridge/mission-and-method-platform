// Writes the entrepreneurs' course pages with the same design as the organisation ones:
//   courses-entrepreneurs.html                 (catalogue, same layout as courses.html)
//   course-entrepreneurs-<clarify|organise|prove-show|protect>.html  (same layout as course-clarify.html …)
// Text for the catalogue lives in scripts/entrepreneur-courses-strings.json ({"key":["English","Español"]}) and is
// also loaded into translations.js. Run after changing course/eNN-*.js or the strings:
//   node scripts/set-translations.mjs scripts/entrepreneur-courses-strings.json && node scripts/generate-entrepreneur-courses.mjs
import {readFileSync,writeFileSync} from 'node:fs';
import {founderPhases,courseModules,lessonPath} from '../course-data.js';
import {courseBand,courseModulesSection} from './course-modules-section.mjs';
const S=JSON.parse(readFileSync('scripts/entrepreneur-courses-strings.json','utf8'));
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=(k,tag='span',attrs='')=>{if(!S[k])throw new Error(`Missing ${k}`);return `<${tag}${attrs?' '+attrs:''} data-i18n="${k}">${e(S[k][0])}</${tag}>`;};
const s=k=>{if(!S[k])throw new Error(`Missing ${k}`);return e(S[k][0]);};
const url=(m,l)=>`/${lessonPath(m,l)}`;
const first=p=>{const m=courseModules(p)[0];return url(m,m.lessons[0]);};
const stats=p=>{const mods=courseModules(p),ls=mods.flatMap(m=>m.lessons);return {modules:mods.length,lessons:ls.length,hours:Math.round(ls.reduce((n,l)=>n+l.minutes,0)/60)};};
const all=founderPhases.map(stats),total={modules:all.reduce((n,x)=>n+x.modules,0),lessons:all.reduce((n,x)=>n+x.lessons,0),hours:all.reduce((n,x)=>n+x.hours,0)};
const setTitle=(html,title,desc)=>html.replace(/<title>[^<]*<\/title>/,`<title>${e(title)}</title>`).replace(/<meta name="description" content="[^"]*">\n?/,'').replace('</title>',`</title>\n<meta name="description" content="${e(desc)}">`);

// ---------- course pages ----------
for(const [i,p] of founderPhases.entries()){
 const org=`course-${p.id.replace(/^entrepreneurs-/,'')}.html`;
 const base=readFileSync(org,'utf8');
 const head=base.slice(0,base.indexOf('<main')),tail=base.slice(base.indexOf('</main>')+'</main>'.length).replace(/<script src="assets\/js\/course-video\.js[^"]*" defer><\/script>\n?/,'');
 const mods=courseModules(p),st=stats(p),next=founderPhases[i+1];
 const main=`<main id="main"><div class="catalog"><nav class="breadcrumbs"><a href="courses-entrepreneurs.html">Courses for entrepreneurs</a><span>› Course ${p.number} · ${e(p.name)}</span></nav>${courseBand(p)}<p class="lead">${e(p.summary)}. ${mods.map(m=>e(m.short)).join('. ')}.</p><div class="course-offer"><p><b>Coming soon</b> · ${st.lessons} lessons and reviews · about ${st.hours} hours.</p><p>Every lesson has a short video and the written explanation, and most lessons have a guided exercise that saves into Your Organisation, so your foundations build up as you go.</p><div class="toolbar"><button type="button" class="button" data-founder-buy="${p.id}" data-name="Course ${p.number} · ${e(p.name)}" data-start="${first(p)}" data-owned-text="Go to Course ${p.number} →">Get Course ${p.number} →</button><button type="button" class="button ghost" data-founder-buy="entrepreneurs-all" data-name="All four courses" data-start="${first(p)}">Get all four courses</button><a class="button ghost" href="work-with-julieta.html#path-idea">Prefer to build it with Julieta?</a></div><p class="subtle">One of four courses for entrepreneurs: Clarify, Organise, Prove &amp; Show and Protect. <a href="courses-entrepreneurs.html">See all four →</a></p></div>${courseModulesSection(p)}${next?`<p>Next: <a href="course-${next.id}.html">Course ${next.number} · ${e(next.name)} →</a></p>`:`<p>Already running an organisation? <a href="courses.html">See the courses for organisations →</a></p>`}</div></main>`;
 const BUY='<script type="module">import {bindFounderButtons} from \'./founder-checkout.js?v=7\';bindFounderButtons();</script>';
 writeFileSync(`course-${p.id}.html`,setTitle(head,`Course ${p.number} · ${p.name} for entrepreneurs | Method into Impact`,`${p.title}, for entrepreneurs: ${p.summary.toLowerCase()}. ${st.modules} modules, ${st.lessons} lessons.`)+main+tail.replace('</body>',BUY+'</body>'));
 console.log(`wrote course-${p.id}.html`);
}

// ---------- catalogue (same layout as courses.html) ----------
const cat=readFileSync('courses.html','utf8');
const chead=cat.slice(0,cat.indexOf('<main')),ctail=cat.slice(cat.indexOf('</main>')+'</main>'.length);
const flow=founderPhases.map((p,i)=>`
        <li class="reveal" style="--delay:${40+i*60}ms">
          <span class="cc-flow-dot"></span>
          <small>COURSE ${p.number}</small>
          <b>${e(p.name)}</b>
          ${t(`ec.flow.${p.number}`,'span','class="cc-flow-q"')}
        </li>`).join('');
const card=(p,i)=>{const st=all[i],n=p.number;return `
      <article class="cc-course reveal" style="--delay:40ms">
        <aside class="cc-course-side">
          <span class="cc-num">${n}</span>
          <div class="cc-side-eyebrow">COURSE ${n}</div>
          <h3>${e(p.name)}</h3>
          ${t(`ec.c${n}.tag`,'p','class="cc-side-tag"')}
          <ul class="cc-stats">
            <li><b>${st.modules}</b>${t('ec.modules')}</li>
            <li><b>${st.lessons}</b>${t('ec.lessons')}</li>
            <li><b>~${st.hours}h</b>${t('ec.selfpaced')}</li>
          </ul>
          <a class="hm-btn hm-btn-primary cc-cta" href="course-${p.id}.html"><span data-i18n="ec.about">${s('ec.about')}</span> ${n}</a>
          <button type="button" class="hm-btn hm-btn-ghost-light cc-cta" data-founder-buy="${p.id}" data-name="Course ${n} · ${e(p.name)}" data-start="${first(p)}" data-owned-text="Go to Course ${n} →">Get Course ${n} →</button>
        </aside>
        <div class="cc-course-body">
          <p class="cc-course-lead"><em data-i18n="ec.c${n}.q">${s(`ec.c${n}.q`)}</em></p>
          ${t(`ec.c${n}.body`,'p')}
          <div class="cc-course-grid">
            <div>
              ${t('ec.learn','h4')}
              <ul>${[1,2,3].map(k=>t(`ec.c${n}.l${k}`,'li')).join('')}</ul>
            </div>
            <div class="cc-pack">
              ${t('ec.build','div','class="cc-pack-eyebrow"')}
              ${t(`ec.c${n}.pack`,'b')}
              ${t(`ec.c${n}.packbody`,'p')}
            </div>
          </div>
        </div>
      </article>`;};
const faq=[1,2,3,4,5].map(k=>`
        <details class="reveal" style="--delay:${k*40}ms">
          <summary><span data-i18n="ec.faq.q${k}">${s(`ec.faq.q${k}`)}</span><span class="hm-faq-icon" aria-hidden="true"></span></summary>
          ${t(`ec.faq.a${k}`,'p')}
        </details>`).join('');
const start=first(founderPhases[0]);
const cmain=`<main id="main">
  <section class="hm-hero hm-hero-courses">
    <div class="hm-hero-shapes" aria-hidden="true"><span class="hm-shape hm-shape-1"></span><span class="hm-shape hm-shape-2"></span><span class="hm-shape hm-shape-3"></span></div>
    <div class="container hm-hero-inner">
      ${t('ec.hero.eyebrow','div','class="hm-eyebrow"')}
      <h1><span data-i18n="ec.hero.title_before">${s('ec.hero.title_before')}</span> <em data-i18n="ec.hero.title_em">${s('ec.hero.title_em')}</em></h1>
      ${t('ec.hero.lead','p','class="hm-lead"')}
      <div class="hm-facts" data-counter-group>
        <div><b data-counter="${founderPhases.length}">0</b><span data-i18n="home.facts.courses">courses</span></div>
        <div><b data-counter="${total.modules}">0</b><span data-i18n="home.facts.modules">modules</span></div>
        <div><b data-counter="${total.lessons}">0</b><span data-i18n="home.facts.lessons">lessons &amp; reviews</span></div>
        <div><b data-counter="${total.hours}" data-prefix="~">~0</b><span data-i18n="home.facts.hours">hours, self-paced</span></div>
      </div>
      <div class="hm-actions">
        <a class="hm-btn hm-btn-primary" href="${start}" data-i18n="ec.hero.cta_primary">${s('ec.hero.cta_primary')}</a>
        <a class="hm-btn hm-btn-ghost" href="#courses" data-i18n="ec.hero.cta_ghost">${s('ec.hero.cta_ghost')}</a>
      </div>
    </div>
  </section>
<div class="aud-note aud-note-both"><div class="container"><p>${t('ec.note.label','b','class="aud-note-tag"')} ${t('ec.note.text')} <a href="courses.html" data-i18n="ec.note.link">${s('ec.note.link')}</a></p></div></div>
  <section class="hm-section cc-pathway-section">
    <div class="container">
      <div class="hm-head reveal">
        ${t('ec.journey.eyebrow','div','class="hm-section-eyebrow"')}
        ${t('ec.journey.title','h2')}
        ${t('ec.journey.sub','p','class="hm-subhead"')}
      </div>
      <ol class="cc-flow cc-flow-4" aria-label="Four-course journey">${flow}
      </ol>
    </div>
  </section>
  <section class="hm-section hm-section-alt cc-list" id="courses">
    <div class="container">
      <div class="hm-head reveal">
        ${t('ec.list.eyebrow','div','class="hm-section-eyebrow"')}
        ${t('ec.list.title','h2')}
        ${t('ec.list.sub','p','class="hm-subhead"')}
      </div>${founderPhases.map(card).join('')}
    </div>
  </section>
  <section class="hm-section cc-pricing">
    <div class="container">
      <div class="hm-head reveal">
        ${t('ec.soon.eyebrow','div','class="hm-section-eyebrow"')}
        ${t('ec.soon.title','h2')}
        ${t('ec.soon.sub','p','class="hm-subhead"')}
      </div>
      <div class="hm-actions hm-actions-center"><a class="hm-btn hm-btn-primary" href="work-with-julieta.html#path-idea" data-i18n="ec.soon.cta">${s('ec.soon.cta')}</a></div>
    </div>
  </section>
  <section class="hm-section hm-section-alt" id="faq">
    <div class="container">
      <div class="hm-head reveal">
        ${t('ec.faq.eyebrow','div','class="hm-section-eyebrow"')}
        ${t('ec.faq.title','h2')}
      </div>
      <div class="hm-faq">${faq}
      </div>
    </div>
  </section>
  <section class="hm-final">
    <div class="hm-final-shapes" aria-hidden="true"><span class="hm-shape hm-shape-f1"></span><span class="hm-shape hm-shape-f2"></span></div>
    <div class="container">
      <div class="hm-final-inner reveal">
        ${t('ec.final.eyebrow','div','class="hm-section-eyebrow hm-section-eyebrow-light"')}
        ${t('ec.final.title','h2')}
        ${t('ec.final.sub','p')}
        <div class="hm-actions hm-actions-center">
          <a class="hm-btn hm-btn-primary" href="${start}" data-i18n="ec.hero.cta_primary">${s('ec.hero.cta_primary')}</a>
          <a class="hm-btn hm-btn-ghost-light" href="work-with-julieta.html#path-idea" data-i18n="ec.final.cta2">${s('ec.final.cta2')}</a>
        </div>
      </div>
    </div>
  </section>
</main>`;
let chtml=setTitle(chead,'Courses for entrepreneurs | Method into Impact','Four courses for people building something new: Clarify, Organise, Prove & Show and Protect. The same method as the courses for organisations, written for founders.');
if(!/audiences\.css/.test(chtml))chtml=chtml.replace('</head>','<link rel="stylesheet" href="audiences.css?v=3">\n</head>');
writeFileSync('courses-entrepreneurs.html',chtml+cmain+ctail.replace('</body>','<script type="module">import {bindFounderButtons} from \'./founder-checkout.js?v=7\';bindFounderButtons();</script></body>'));
console.log('wrote courses-entrepreneurs.html');
