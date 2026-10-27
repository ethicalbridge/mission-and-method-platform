// Writes the two audience pages: entrepreneurs.html (starting from an idea) and organisations.html (already running).
// Text lives in scripts/audience-strings.json as {"key": ["English", "Español"]}; the same strings are loaded into
// translations.js so the EN/ES switch works. Run after editing the strings:
//   node scripts/set-translations.mjs scripts/audience-strings.json && node scripts/generate-audience-pages.mjs
import {readFileSync,writeFileSync} from 'node:fs';
const S=JSON.parse(readFileSync('scripts/audience-strings.json','utf8'));
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=(key,tag='span',attrs='')=>{if(!S[key])throw new Error(`Missing string ${key}`);return `<${tag}${attrs?' '+attrs:''} data-i18n="${key}">${e(S[key][0])}</${tag}>`;};
const arrow='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
// Head, nav and footer come from an existing page so the pages share the site shell.
const base=readFileSync('planning-system.html','utf8');
const head=base.slice(0,base.indexOf('<main'));
const tail=base.slice(base.indexOf('</main>'));
const shell=(title,desc,page,main)=>head
 .replace(/<title>[^<]*<\/title>/,`<title>${e(title)}</title>`)
 .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${e(desc)}">`)
 .replace(/<link rel="stylesheet" href="planning-system.css[^"]*">/,m=>`${m}\n<link rel="stylesheet" href="audiences.css?v=1">`)
 .replace(/<body data-page="[^"]*" data-product="[^"]*">/,`<body data-page="${page}" data-product="">`)
 +main+tail.replace(/<script type="module" src="overview.js"><\/script>\n?/,'');

function page(p,{examples,courseHref,consultHref,otherHref,secondHref}){
 const card=n=>`<article class="aud-way"><span class="aud-badge${n===1?' aud-badge-live':''}" data-i18n="${p}.ways.${n}.badge">${e(S[`${p}.ways.${n}.badge`][0])}</span>${t(`${p}.ways.${n}.title`,'h3')}${t(`${p}.ways.${n}.body`,'p')}<a class="aud-link" href="${[consultHref,courseHref,'software.html'][n-1]}" data-i18n="${p}.ways.${n}.link">${e(S[`${p}.ways.${n}.link`][0])}</a></article>`;
 return `<main id="main" class="aud-page aud-${p}">
  <section class="hm-hero">
    <div class="hm-hero-shapes" aria-hidden="true"><span class="hm-shape hm-shape-1"></span><span class="hm-shape hm-shape-2"></span><span class="hm-shape hm-shape-3"></span></div>
    <div class="container hm-hero-inner">
      ${t(`${p}.hero.eyebrow`,'div','class="hm-eyebrow"')}
      ${t(`${p}.hero.title`,'h1')}
      ${t(`${p}.hero.lead`,'p','class="hm-lead"')}
      <div class="hm-actions">
        <a class="hm-btn hm-btn-primary" href="work-with-julieta.html#start"><span data-i18n="${p}.hero.cta1">${e(S[`${p}.hero.cta1`][0])}</span> ${arrow}</a>
        <a class="hm-btn hm-btn-ghost" href="#ways" data-i18n="${p}.hero.cta2">${e(S[`${p}.hero.cta2`][0])}</a>
      </div>
    </div>
  </section>

  <section class="aud-section aud-fit">
    <div class="container aud-narrow">
      ${t(`${p}.fit.eyebrow`,'div','class="aud-eyebrow"')}
      ${t(`${p}.fit.title`,'h2')}
      <ul class="aud-checks">${[1,2,3,4].map(n=>t(`${p}.fit.${n}`,'li')).join('')}</ul>
    </div>
  </section>

  <section class="aud-section aud-alt" id="ways">
    <div class="container">
      <div class="aud-head">${t(`${p}.ways.eyebrow`,'div','class="aud-eyebrow"')}${t(`${p}.ways.title`,'h2')}</div>
      <div class="aud-ways">${[1,2,3].map(card).join('')}</div>
    </div>
  </section>

  <section class="aud-section">
    <div class="container aud-narrow">
      ${t(`${p}.steps.eyebrow`,'div','class="aud-eyebrow"')}
      ${t(`${p}.steps.title`,'h2')}
      ${t(`${p}.steps.sub`,'p','class="aud-sub"')}
      <ol class="aud-steps">${[1,2,3,4,5].map(n=>`<li><span class="aud-step-no" aria-hidden="true">${n}</span>${t(`${p}.steps.${n}`,'span')}</li>`).join('')}</ol>
      <div class="aud-finish">
        ${t(`${p}.finish.eyebrow`,'div','class="aud-eyebrow"')}
        ${t(`${p}.finish.title`,'h3')}
        ${t(`${p}.finish.body`,'p')}
        <a class="aud-link" href="${secondHref}" data-i18n="${p}.ways.2.link">${e(S[`${p}.ways.2.link`][0])}</a>
      </div>
    </div>
  </section>

  <section class="aud-section aud-alt">
    <div class="container">
      <div class="aud-head">${t(`${p}.examples.eyebrow`,'div','class="aud-eyebrow"')}${t(`${p}.examples.title`,'h2')}${t(`${p}.examples.sub`,'p','class="aud-sub"')}</div>
      <div class="aud-examples">${examples.map(([name,place],i)=>`<article class="aud-example"><b>${e(name)}</b><small>${e(place)}</small>${t(`${p}.examples.${i+1}`,'p')}</article>`).join('')}</div>
      <p class="aud-switch">${t(`${p}.switch.text`,'span')} <a href="${otherHref}" data-i18n="${p}.switch.link">${e(S[`${p}.switch.link`][0])}</a></p>
    </div>
  </section>

  <section class="hm-final">
    <div class="hm-final-shapes" aria-hidden="true"><span class="hm-shape hm-shape-f1"></span><span class="hm-shape hm-shape-f2"></span></div>
    <div class="container"><div class="hm-final-inner">
      ${t(`${p}.final.title`,'h2')}
      ${t(`${p}.final.sub`,'p')}
      <div class="hm-actions hm-actions-center"><a class="hm-btn hm-btn-primary" href="work-with-julieta.html#start"><span data-i18n="${p}.final.cta">${e(S[`${p}.final.cta`][0])}</span> ${arrow}</a></div>
    </div></div>
  </section>
</main>
`;}

writeFileSync('entrepreneurs.html',shell('For entrepreneurs | Method into Impact','For people starting a project, a nonprofit, a social business or a cooperative from an idea: consultancy, a short starter course and tools to test the idea, start safely and plan your first steps.','entrepreneurs',
 page('ent',{examples:[['Tide Line Youth Collective','Community project · Indonesia'],['Huerta Viva','Social business idea · Colombia'],['Next Step Mentors','Volunteer project · Ghana']],courseHref:'course-idea.html',secondHref:'course-idea.html',consultHref:'work-with-julieta.html#path-idea',otherHref:'organisations.html'})));
writeFileSync('organisations.html',shell('For organisations | Method into Impact','For NGOs, social enterprises, cooperatives and community groups that are already running: consultancy, five foundation courses and tools for clarity, structure, systems and growth.','organisations',
 page('org',{examples:[['Imara Girls in Science','Registered nonprofit · Kenya'],['Pan del Barrio','Social enterprise · Peru'],['Vanita Weavers Cooperative','Cooperative · India'],['Riverside Repair Hub','Charity with a trading company · UK']],courseHref:'courses.html',secondHref:'courses.html',consultHref:'work-with-julieta.html#path-org',otherHref:'entrepreneurs.html'})));
console.log('wrote entrepreneurs.html and organisations.html');
