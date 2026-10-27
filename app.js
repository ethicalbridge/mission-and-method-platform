// Shared navigation and honest preview interactions; no entitlement is granted here.

// --- Inject the shared navigation ---
const navEl=document.querySelector('nav.nav');
if(navEl&&!navEl.children.length){
  navEl.innerHTML=`<div class="container nav-inner"><a class="brand" href="index.html" aria-label="Method into Impact — Home"><svg class="brand-mark" viewBox="5 5 178 189" width="45" height="48" aria-hidden="true"><path d="M7 79 Q7 75 10.5 77.5 L77 131 Q80 134 77 136.5 L10.5 189.5 Q7 192 7 188 Z" fill="currentColor"></path><path d="M151 82 C116 99 70 139 43 188 L82 188 C91 151 117 111 151 82 Z" fill="#16746E"></path><path d="M181 74 Q181 70 177.5 72 Q155 85 139 105 Q137 107.5 137 111 L137 189 Q137 192 140 192 L178 192 Q181 192 181 189 Z" fill="currentColor"></path><circle cx="159" cy="29.5" r="23" fill="#E56F4A"></circle></svg><span class="brand-text"><span class="brand-word">Method <span class="brand-into">into</span> Impact</span><small class="brand-tagline">Better foundations. Stronger organisations.</small></span></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-links" data-i18n="nav.menu">Menu</button><div class="nav-links" id="main-links"><a href="index.html" data-i18n="nav.home">Home</a><a class="nav-highlight" href="work-with-julieta.html" data-i18n="nav.consult">Consult</a><a class="contact-link" href="contact.html" data-i18n="nav.contact">Contact</a><details class="courses-dropdown nav-dropdown nav-coming-soon"><summary><span data-i18n="nav.courses">Courses</span><em data-i18n="nav.coming_soon">soon</em> <span aria-hidden="true">⌄</span></summary><div class="courses-dropdown-panel resources-dropdown-panel"><div class="resource-menu-group"><a href="courses-entrepreneurs.html"><b data-i18n="nav.courses.ent">For entrepreneurs</b><small data-i18n="nav.courses.ent_sub">Four courses · coming soon</small></a><a href="courses.html"><b data-i18n="nav.courses.org">For organisations</b><small data-i18n="nav.courses.org_sub">Five foundation courses · coming soon</small></a></div></div></details><details class="resources-dropdown nav-dropdown nav-coming-soon"><summary><span data-i18n="nav.resources">Resources</span><em data-i18n="nav.coming_soon">soon</em> <span aria-hidden="true">⌄</span></summary><div class="courses-dropdown-panel resources-dropdown-panel"><div class="resource-menu-group"><a href="reading-library.html"><b data-i18n="nav.resources.evidence">Evidence Library</b><small data-i18n="nav.resources.evidence_sub">Curated research behind every lesson</small></a><a href="software.html"><b data-i18n="nav.resources.tools">Impact Tools</b><small data-i18n="nav.resources.tools_sub">The integrated tool-set</small></a><a href="legal-templates.html"><b data-i18n="nav.resources.legal">Legal Templates</b><small data-i18n="nav.resources.legal_sub">Starter outlines, not legal advice</small></a></div></div></details><div class="lang-switch" role="group" aria-label="Language"><button type="button" class="lang-btn" data-lang-switch="en" aria-pressed="true" title="English">EN</button><span aria-hidden="true">·</span><button type="button" class="lang-btn" data-lang-switch="es" aria-pressed="false" title="Español">ES</button></div></div></div>`;
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
const resourcePages=page=>page==='reading-library.html'||page==='software.html'||page==='legal-templates.html'||page.startsWith('software-')||page.startsWith('legal-templates-');
if(resourcePages(page))document.querySelector('.resources-dropdown')?.classList.add('active');
document.querySelectorAll('.nav-links a').forEach(a=>{const path=a.getAttribute('href');const isHome=path==='index.html'&&homePages.includes(page);const isCourses=path==='courses.html'&&!page.startsWith('course-entrepreneurs')&&!location.pathname.startsWith('/entrepreneurs-')&&(coursePages.includes(page)||page.startsWith('course-'));const isEntCourses=path==='courses-entrepreneurs.html'&&(page.startsWith('course-entrepreneurs')||location.pathname.startsWith('/entrepreneurs-'));const isSoftware=path==='software.html'&&page.startsWith('software-');const isLegal=path==='legal-templates.html'&&page.startsWith('legal-templates-');if(path===page||isHome||isCourses||isEntCourses||isSoftware||isLegal){a.classList.add('active');a.setAttribute('aria-current','page');}else a.classList.remove('active');});

// (Previously injected a large brand signature into .hm-final; removed so the
// final CTA stays compact and visually distinct from the footer logo.)

// --- Generic UI wiring ---
document.querySelectorAll('[data-accordion]').forEach(item=>{const button=item.querySelector('button');button?.addEventListener('click',()=>{const open=item.classList.toggle('open');button.setAttribute('aria-expanded',String(open));const marker=button.querySelector('i');if(marker)marker.textContent=open?'−':'+';});});
document.querySelectorAll('[data-course-tab]').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('[data-course-tab]').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('[data-course-panel]').forEach(p=>p.classList.toggle('active',p.dataset.coursePanel===tab.dataset.courseTab));}));
document.querySelectorAll('[data-subscribe]').forEach(b=>b.addEventListener('click',()=>location.href='subscribe.html'));
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.scroll)?.scrollIntoView()));
function openLinkedReading(){if(!location.hash)return;let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(target?.tagName==='DETAILS')target.open=true;}
openLinkedReading();window.addEventListener('hashchange',openLinkedReading);

// --- Footer injection (unchanged) ---
const footer=document.querySelector('footer');if(footer){const style=document.createElement('link');style.rel='stylesheet';style.href='footer.css?v=nav4';document.head.append(style);const nfr=document.createElement('link');nfr.rel='stylesheet';nfr.href='nav-footer-redesign.css?v=nfr6';document.head.append(nfr);footer.className='site-footer';footer.innerHTML=`<div class="container footer-top"><a class="brand" href="index.html" aria-label="Method into Impact — Home"><svg class="brand-mark" viewBox="5 5 178 189" width="45" height="48" aria-hidden="true"><path d="M7 79 Q7 75 10.5 77.5 L77 131 Q80 134 77 136.5 L10.5 189.5 Q7 192 7 188 Z" fill="currentColor"></path><path d="M151 82 C116 99 70 139 43 188 L82 188 C91 151 117 111 151 82 Z" fill="#5fb0a4"></path><path d="M181 74 Q181 70 177.5 72 Q155 85 139 105 Q137 107.5 137 111 L137 189 Q137 192 140 192 L178 192 Q181 192 181 189 Z" fill="currentColor"></path><circle cx="159" cy="29.5" r="23" fill="#E56F4A"></circle></svg><span class="brand-text"><span class="brand-word">Method <span class="brand-into">into</span> Impact</span><small class="brand-tagline">Better foundations. Stronger organisations.</small></span></a><nav class="footer-nav" aria-label="Site"><a href="index.html" data-i18n="nav.home">Home</a><a href="work-with-julieta.html#path-idea" data-i18n="nav.entrepreneurs">For entrepreneurs</a><a href="work-with-julieta.html#path-org" data-i18n="nav.organisations">For organisations</a><a href="work-with-julieta.html" data-i18n="nav.consult">Consult</a><a href="contact.html" data-i18n="nav.contact">Contact</a><a href="courses.html"><span data-i18n="nav.courses">Courses</span><em class="footer-soon" data-i18n="nav.coming_soon">soon</em></a><a href="resources.html"><span data-i18n="nav.resources">Resources</span><em class="footer-soon" data-i18n="nav.coming_soon">soon</em></a><a href="legal.html#cookies" data-i18n="footer.cookies">Cookies</a><a href="legal.html" data-i18n="footer.legal">Legal &amp; trust</a></nav></div><div class="container footer-bottom"><span data-i18n="footer.copyright">© 2026 Method into Impact</span></div>`;}
const contact=document.querySelector('#contact-form');if(contact){contact.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contact);const topic=data.get('topic')||'General question';const text=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${topic}\n\n${data.get('message')}\n\n--\nSent via method-into-impact.com contact form (preview)`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='method-into-impact-message.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);const msg=contact.querySelector('.form-message');if(msg)msg.textContent='Draft downloaded. Email it to hello@method-into-impact.com — delivery is not connected yet.';});}

import('./pricing-config.js').then(({pricing})=>{const label=document.querySelector('#pricing-currency');if(label)label.textContent='Development preview · '+pricing.currency+' pricing';});

// --- Cookie consent + Google Analytics 4 (consent-gated) ---
// GA4 does NOT load until the visitor clicks Accept. If they Decline, no
// analytics tag is injected and no cookies are set. The choice is stored in
// localStorage under 'mim-consent-v1' and the banner never reappears unless
// the visitor manually clears it (via the legal page link below).
(function initConsentedAnalytics(){
  const GA4_ID = 'G-2VLHVZSVTD';           // Method into Impact GA4 property
  const SC_TOKEN = '';                     // Search Console verifies via GA4; no SC meta needed
  const CONSENT_KEY = 'mim-consent-v1';    // 'accepted' | 'declined'

  // Static-safe Search Console meta tag (if a token is ever set).
  if (SC_TOKEN) {
    const sc = document.createElement('meta');
    sc.name = 'google-site-verification';
    sc.content = SC_TOKEN;
    document.head.appendChild(sc);
  }

  // Never track admin or local dev under any circumstance.
  const host = location.hostname;
  const isAdmin = location.pathname.endsWith('/admin.html') || location.pathname === '/admin.html';
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local') || host === '';
  if (isAdmin || isLocal) return;

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
  }
  function writeConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch {}
  }

  function loadGA4() {
    if (window._mimGA4Loaded || !GA4_ID) return;
    window._mimGA4Loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
  }

  // Expose a tiny API so the privacy page can offer a "Change my choice" link.
  window.MIM_consent = {
    get: readConsent,
    reset: function(){ try { localStorage.removeItem(CONSENT_KEY); location.reload(); } catch {} },
    accept: function(){ writeConsent('accepted'); loadGA4(); const el = document.querySelector('.mim-consent'); if (el) el.remove(); },
    decline: function(){ writeConsent('declined'); const el = document.querySelector('.mim-consent'); if (el) el.remove(); },
  };

  const current = readConsent();
  if (current === 'accepted') { loadGA4(); return; }
  if (current === 'declined') { return; }

  // No decision yet — render the banner.
  function renderBanner() {
    if (document.querySelector('.mim-consent')) return;
    const docLang = document.documentElement.getAttribute('lang');
    const i18nLang = (window.MIM_i18n && typeof window.MIM_i18n.lang === 'string') ? window.MIM_i18n.lang : null;
    const lang = (i18nLang === 'es' || docLang === 'es') ? 'es' : 'en';
    const t = (lang === 'es') ? {
      title: 'Cookies y analítica',
      body:  'Esta web usa Google Analytics para entender qué contenido ayuda a quién — datos pseudónimos, IP anonimizada, nada compartido con publicidad. Podés cambiarlo cuando quieras desde la ',
      link:  'página de privacidad',
      accept:'Aceptar',
      decline:'Rechazar',
    } : {
      title: 'Cookies & analytics',
      body:  'This site uses Google Analytics to see which content helps whom — pseudonymous data, anonymized IP, nothing shared with advertisers. You can change this any time on the ',
      link:  'privacy page',
      accept:'Accept',
      decline:'Decline',
    };

    const el = document.createElement('div');
    el.className = 'mim-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'mim-consent-title');
    el.setAttribute('aria-describedby', 'mim-consent-body');
    el.innerHTML = `
      <div class="mim-consent-inner">
        <div class="mim-consent-copy">
          <strong id="mim-consent-title">${t.title}</strong>
          <p id="mim-consent-body">${t.body}<a href="legal.html#privacy">${t.link}</a>.</p>
        </div>
        <div class="mim-consent-actions">
          <button type="button" class="mim-consent-btn mim-consent-decline">${t.decline}</button>
          <button type="button" class="mim-consent-btn mim-consent-accept">${t.accept}</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('.mim-consent-accept').addEventListener('click', window.MIM_consent.accept);
    el.querySelector('.mim-consent-decline').addEventListener('click', window.MIM_consent.decline);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBanner);
  } else {
    renderBanner();
  }
})();
