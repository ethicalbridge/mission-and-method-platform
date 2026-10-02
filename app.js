// Shared navigation and honest preview interactions; no entitlement is granted here.

// --- Inject the shared navigation ---
const navEl=document.querySelector('nav.nav');
if(navEl&&!navEl.children.length){
  navEl.innerHTML=`<div class="container nav-inner"><a class="brand" href="index.html" aria-label="Method into Impact — Home"><svg class="brand-mark" viewBox="0 0 72 56" width="56" height="44" aria-hidden="true"><path d="M4 50 L4 10 L30 50 Z" fill="currentColor"></path><path d="M6 46 Q 26 20, 52 10" fill="none" stroke="#16746E" stroke-width="6" stroke-linecap="round"></path><rect x="54" y="16" width="10" height="34" rx="1.5" fill="currentColor"></rect><circle cx="59" cy="7" r="5.5" fill="#E56F4A"></circle></svg><span class="brand-text"><span class="brand-word">Method <span class="brand-into">into</span> Impact</span><small class="brand-tagline">Better foundations. Stronger organisations.</small></span></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-links">Menu</button><div class="nav-links" id="main-links"><a href="index.html">Home</a><a href="courses.html">Courses</a><details class="resources-dropdown nav-dropdown"><summary>Resources <span aria-hidden="true">⌄</span></summary><div class="courses-dropdown-panel resources-dropdown-panel"><div class="resource-menu-group"><a href="reading-library.html"><b>Evidence Library</b><small>Curated research behind every lesson</small></a><a href="software.html"><b>Impact Tools</b><small>The integrated tool-set</small></a><a href="legal-templates.html"><b>Legal Templates</b><small>Starter outlines, not legal advice</small></a><a href="experts.html"><b>Work with our experts</b><small>Focused consultations and packages</small></a></div></div></details><a href="pricing.html">Pricing</a><a class="contact-link" href="contact.html">Contact</a><a class="account-link" href="account.html">Sign in</a></div></div>`;
}

// --- Bind nav interactions (works whether the nav was injected or hard-coded) ---
const menu=document.querySelector('.menu'),links=document.querySelector('.nav-links');
const dropdowns=document.querySelectorAll('details.nav-dropdown, details.courses-dropdown');
dropdowns.forEach(dd=>{
  dd.addEventListener('keydown',event=>{if(event.key==='Escape'&&dd.open){event.stopPropagation();dd.open=false;dd.querySelector('summary').focus();}});
  dd.addEventListener('focusout',event=>{if(!dd.contains(event.relatedTarget))dd.open=false;});
  dd.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{dd.open=false;links?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
});
document.addEventListener('click',event=>{dropdowns.forEach(dd=>{if(!dd.contains(event.target))dd.open=false;});});
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&links?.classList.contains('open')){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});

// --- Active-state highlighting for the current page ---
const page=location.pathname.split('/').pop()||'index.html';
const homePages=['index.html','planning-system.html','organisation.html','about.html'];
const coursePages=['courses.html','learn.html','start-here.html','strategic-foundation.html','theory-of-change.html','structure-governance.html','people-culture.html','internal-systems.html','meal.html','brand-identity.html','marketing-communications.html','financial-management.html','legal-compliance-risk.html','fundraising-revenue.html','partnerships.html','strategy-to-action.html'];
const resourcePages=page=>page==='reading-library.html'||page==='software.html'||page==='legal-templates.html'||page==='experts.html'||page.startsWith('software-')||page.startsWith('legal-templates-');
if(resourcePages(page))document.querySelector('.resources-dropdown')?.classList.add('active');
document.querySelectorAll('.nav-links a').forEach(a=>{const path=a.getAttribute('href');const isHome=path==='index.html'&&homePages.includes(page);const isCourses=path==='courses.html'&&(coursePages.includes(page)||page.startsWith('course-'));const isSoftware=path==='software.html'&&page.startsWith('software-');const isLegal=path==='legal-templates.html'&&page.startsWith('legal-templates-');if(path===page||isHome||isCourses||isSoftware||isLegal){a.classList.add('active');a.setAttribute('aria-current','page');}else a.classList.remove('active');});

// --- Inject the stacked brand signature into every Final CTA (hm-final) ---
// Centred, bigger lockup that acts as a brand signature at the bottom of every page.
document.querySelectorAll('.hm-final .hm-final-inner').forEach(inner => {
  if (inner.querySelector('.brand-stacked')) return; // already injected
  const sig = document.createElement('a');
  sig.className = 'brand-stacked hm-final-brand reveal';
  sig.href = 'index.html';
  sig.setAttribute('aria-label', 'Method into Impact — Home');
  sig.innerHTML = `
    <svg class="brand-mark" viewBox="0 0 72 56" aria-hidden="true">
      <path d="M4 50 L4 10 L30 50 Z" fill="currentColor"></path>
      <path d="M6 46 Q 26 20, 52 10" fill="none" stroke="#7CC2AD" stroke-width="6" stroke-linecap="round"></path>
      <rect x="54" y="16" width="10" height="34" rx="1.5" fill="currentColor"></rect>
      <circle cx="59" cy="7" r="5.5" fill="#E56F4A"></circle>
    </svg>
    <span class="brand-text">
      <span class="brand-word">Method <span class="brand-into">into</span> Impact</span>
      <small class="brand-tagline">Better foundations. Stronger organisations.</small>
    </span>`;
  inner.prepend(sig);
});

// --- Generic UI wiring ---
document.querySelectorAll('[data-accordion]').forEach(item=>{const button=item.querySelector('button');button?.addEventListener('click',()=>{const open=item.classList.toggle('open');button.setAttribute('aria-expanded',String(open));const marker=button.querySelector('i');if(marker)marker.textContent=open?'−':'+';});});
document.querySelectorAll('[data-course-tab]').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('[data-course-tab]').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('[data-course-panel]').forEach(p=>p.classList.toggle('active',p.dataset.coursePanel===tab.dataset.courseTab));}));
document.querySelectorAll('[data-subscribe]').forEach(b=>b.addEventListener('click',()=>location.href='subscribe.html'));
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.scroll)?.scrollIntoView()));
function openLinkedReading(){if(!location.hash)return;let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(target?.tagName==='DETAILS')target.open=true;}
openLinkedReading();window.addEventListener('hashchange',openLinkedReading);

// --- Footer injection (unchanged) ---
const footer=document.querySelector('footer');if(footer){const style=document.createElement('link');style.rel='stylesheet';style.href='footer.css?v=nav3';document.head.append(style);const nfr=document.createElement('link');nfr.rel='stylesheet';nfr.href='nav-footer-redesign.css?v=nfr1';document.head.append(nfr);footer.className='site-footer';footer.innerHTML=`<div class="container footer-map"><div class="footer-brand-column"><a class="brand" href="index.html" aria-label="Method into Impact — Home"><svg class="brand-mark" viewBox="0 0 72 56" width="60" height="46" aria-hidden="true"><path d="M4 50 L4 10 L30 50 Z" fill="currentColor"></path><path d="M6 46 Q 26 20, 52 10" fill="none" stroke="#7CC2AD" stroke-width="6" stroke-linecap="round"></path><rect x="54" y="16" width="10" height="34" rx="1.5" fill="currentColor"></rect><circle cx="59" cy="7" r="5.5" fill="#E56F4A"></circle></svg><span class="brand-text"><span class="brand-word">Method <span class="brand-into">into</span> Impact</span><small class="brand-tagline">Better foundations. Stronger organisations.</small></span></a><p>A learning, support and tools platform for purpose-led founders and organisations. Build, strengthen and run what matters.</p><a class="ethical-link" href="https://ethicalbridge.org/" target="_blank" rel="noopener">Part of the Ethical Bridge ecosystem ↗</a></div><div><h3>Platform</h3><a href="courses.html">Courses</a><a href="planning-system.html">Planning System</a><a href="reading-library.html">Evidence Library</a><a href="software.html">Impact Tools</a><a href="legal-templates.html">Legal Templates</a><a href="pricing.html">Pricing &amp; packages</a><a href="experts.html">Work With Our Experts</a></div><div><h3>Organisation</h3><a href="index.html#method">About Method into Impact</a><a href="founder-profile.html">Founder profile</a></div><div><h3>Help &amp; access</h3><a href="read-me.html">Start here</a><a href="planning-system.html#faq">Frequently asked questions</a><a href="organisation.html">Your Organisation</a><a href="account.html">Account</a></div><div><h3>Legal &amp; trust</h3><a href="legal.html#privacy">Privacy</a><a href="legal.html#terms">Terms</a><a href="legal.html#cookies">Storage &amp; cookies</a><a href="legal.html#accessibility">Accessibility</a><a href="legal.html#security">Security</a><a href="legal.html#educational">Educational guidance</a><a href="legal.html#copyright">Sources &amp; copyright</a></div></div><div class="container footer-contact"><div><span>Questions, partnerships or support</span><b>Talk to Method into Impact</b></div><a class="footer-contact-button" href="contact.html">Contact us →</a></div><div class="container footer-bottom"><span>© 2026 Method into Impact</span><span><span id="pricing-currency">Development preview</span></span></div>`;}
const contact=document.querySelector('#contact-form');if(contact){contact.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contact);const topic=data.get('topic')||'General question';const text=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${topic}\n\n${data.get('message')}\n\n--\nSent via method-into-impact.com contact form (preview)`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='method-into-impact-message.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);const msg=contact.querySelector('.form-message');if(msg)msg.textContent='Draft downloaded. Email it to hello@method-into-impact.com — delivery is not connected yet.';});}

import('./pricing-config.js').then(({pricing})=>{const label=document.querySelector('#pricing-currency');if(label)label.textContent='Development preview · '+pricing.currency+' pricing';});
