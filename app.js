if(location.pathname.endsWith('/about.html')){
  const founderHeading=document.querySelector('.founder-page-grid h1');
  const founderEyebrow=document.querySelector('.founder-page-grid .eyebrow');
  const founderLeads=document.querySelectorAll('.founder-page-grid .founder-lead');
  if(founderEyebrow) founderEyebrow.textContent='FOUNDER AND PRACTITIONER';
  if(founderHeading) founderHeading.textContent='Practical systems for purpose-led organisations.';
  if(founderLeads[0]) founderLeads[0].textContent='It took three and a half years to take Ethical Bridge from an idea to an organisation ready to launch. That experience showed me how difficult it is to turn a meaningful vision into a clear strategy, workable systems and confident next steps.';
  if(founderLeads[1]) founderLeads[1].textContent='Mission & Method brings together the frameworks, decisions and tools developed through that process—so founders can build capable, credible and sustainable organisations with greater clarity from the outset.';
}

const languageBar=document.createElement('div');
languageBar.className='language-bar';
languageBar.innerHTML='<div class="container"><span>🌐 Language</span><div id="google_translate_element"></div><small>English / Español</small></div>';
document.body.insertBefore(languageBar,document.body.firstChild);

window.googleTranslateElementInit=()=>{
  new google.translate.TranslateElement({
    pageLanguage:'en',
    includedLanguages:'en,es',
    autoDisplay:false
  },'google_translate_element');
};
const translationScript=document.createElement('script');
translationScript.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
translationScript.async=true;
document.head.appendChild(translationScript);

document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));

function message(form,text){
  const el=form.querySelector('.form-message');
  if(el) el.textContent=text;
  form.reset();
}

document.querySelector('#contact-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  message(e.currentTarget,'Thank you — your message has been saved for follow-up.');
});

document.querySelector('#subscribe-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const email=new FormData(e.currentTarget).get('email');
  localStorage.setItem('missionMethodMember',email);
  message(e.currentTarget,'You are on the founding list. We will send your access details to '+email+'.');
});

document.querySelectorAll('[data-subscribe]').forEach(b=>b.addEventListener('click',()=>location.href='subscribe.html'));
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

document.querySelectorAll('[data-course-tab]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('[data-course-tab]').forEach(t=>t.classList.toggle('active',t===tab));
  document.querySelectorAll('[data-course-panel]').forEach(p=>p.classList.toggle('active',p.dataset.coursePanel===tab.dataset.courseTab));
}));

document.querySelectorAll('[data-accordion]').forEach(item=>{
  const button=item.querySelector('button');
  button?.addEventListener('click',()=>{
    const open=item.classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
    const marker=button.querySelector('i')||button.querySelector('span:last-child');
    if(marker) marker.textContent=open?'−':'+';
  });
});

document.querySelectorAll('[data-countdown]').forEach(el=>{
  const end=new Date(el.dataset.countdown).getTime();
  const update=()=>{
    const remaining=end-Date.now();
    if(remaining<=0){el.textContent='Offer ended';return;}
    const days=Math.floor(remaining/86400000);
    const hours=Math.floor((remaining%86400000)/3600000);
    const mins=Math.floor((remaining%3600000)/60000);
    el.textContent=`Ends in ${days}d ${hours}h ${mins}m`;
  };
  update();
  setInterval(update,60000);
});

function openLinkedReading(){
  if(!location.hash) return;
  const target=document.querySelector(location.hash);
  if(target?.tagName==='DETAILS'){
    target.open=true;
    setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'center'}),150);
  }
}
openLinkedReading();
window.addEventListener('hashchange',openLinkedReading);

const footerStyles=document.createElement('link');
footerStyles.rel='stylesheet';
footerStyles.href='footer.css?v=4';
document.head.appendChild(footerStyles);

const siteFooter=document.querySelector('footer');
if(siteFooter){
  siteFooter.className='site-footer';
  siteFooter.innerHTML=`<div class="container footer-newsletter">
    <div><span>THE FOUNDER LETTER</span><h2>Practical ideas for building what matters.</h2><p>Occasional notes on strategy, systems, funding and the honest work of building from scratch.</p></div>
    <form id="footer-newsletter-form"><label for="footer-email">Email address</label><div><input id="footer-email" name="email" type="email" required placeholder="you@example.com"><button type="submit">Join the letter →</button></div><small data-footer-message>No noise. Unsubscribe whenever you like.</small><div class="footer-social-icons" aria-label="Social media"><a href="https://tz.linkedin.com/in/julietacastineiradedios" target="_blank" rel="noopener" aria-label="Julieta on LinkedIn" title="Julieta on LinkedIn">in</a><a href="https://id.linkedin.com/company/ethicalbridge" target="_blank" rel="noopener" aria-label="Ethical Bridge on LinkedIn" title="Ethical Bridge on LinkedIn">in</a><a href="https://ethicalbridge.org/" target="_blank" rel="noopener" aria-label="Ethical Bridge website" title="Ethical Bridge website">◎</a><span class="social-pending" aria-label="Instagram coming soon" title="Instagram coming soon">◎</span><span class="social-pending" aria-label="YouTube coming soon" title="YouTube coming soon">▶</span></div></form>
  </div>
  <div class="footer-rule"></div>
  <div class="container footer-map">
    <div class="footer-brand-column"><a class="brand" href="index.html">Mission <span>&</span> Method</a><p>Helping purpose-driven founders turn meaningful ideas into clear, capable and sustainable organisations.</p><a class="ethical-link" href="https://ethicalbridge.org/" target="_blank" rel="noopener">Built by the founder of Ethical Bridge ↗</a></div>
    <div><h3>Explore</h3><a href="index.html">Home</a><a href="about.html">Founder</a><a href="courses.html">All courses</a><a href="planning-system.html">Planning System</a><a href="reading-library.html">Evidence Library</a><a href="subscribe.html">Membership</a></div>
    <div><h3>Planning modules</h3><a href="planning-system.html#modules">Strategic Clarity</a><a href="theory-of-change.html">Theory of Change</a><a href="team-organisation.html">Team & Structure</a><a href="organisation-systems.html">Internal Systems</a><a href="policies-procedures.html">Policies & Procedures</a><a href="strategy-to-action.html">Strategy to Action</a><a href="fundraising-partnerships.html">Funding & Partnerships</a></div>
    <div><h3>Support</h3><a href="contact.html">Contact us</a><a href="read-me.html">Read me first</a><a href="index.html#course-explorer">How it works</a><a href="index.html#faq">Frequently asked questions</a><a href="legal.html#accessibility">Accessibility</a><button type="button" data-cookie-settings>Cookie settings</button></div>
    <div><h3>Legal & trust</h3><a href="legal.html#privacy">Privacy policy</a><a href="legal.html#terms">Terms of use</a><a href="legal.html#cookies">Cookie policy</a><a href="legal.html#security">Security</a><a href="legal.html#educational">Educational disclaimer</a><a href="legal.html#copyright">Copyright & sources</a></div>
  </div>
  <div class="container footer-bottom"><span>© 2026 Mission & Method. All rights reserved.</span><span>English · AUD</span><span>Evidence-informed learning for purpose-driven founders.</span></div>`;
}

document.querySelector('#footer-newsletter-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const email=new FormData(e.currentTarget).get('email');
  localStorage.setItem('missionMethodNewsletter',email);
  e.currentTarget.querySelector('[data-footer-message]').textContent='You’re on the list — welcome to the founder letter.';
  e.currentTarget.reset();
});

function showCookiePanel(){
  let banner=document.querySelector('.cookie-banner');
  if(!banner){
    banner=document.createElement('section');
    banner.className='cookie-banner';
    banner.setAttribute('aria-label','Cookie preferences');
    banner.innerHTML=`<button class="cookie-close" type="button" aria-label="Close">×</button><div><span>YOUR PRIVACY, YOUR CHOICE</span><h2>We use only what helps the platform work.</h2><p>Essential storage remembers your preferences and saved course progress. Optional analytics will only be used with your permission. This preview currently sets no advertising cookies.</p><a href="legal.html#cookies">Read the cookie policy →</a></div><div class="cookie-actions"><button type="button" data-cookie-choice="essential">Essential only</button><button type="button" class="accept" data-cookie-choice="all">Accept all</button></div>`;
    document.body.appendChild(banner);
    banner.querySelector('.cookie-close').addEventListener('click',()=>banner.remove());
    banner.querySelectorAll('[data-cookie-choice]').forEach(button=>button.addEventListener('click',()=>{
      localStorage.setItem('missionMethodCookieConsent',button.dataset.cookieChoice);
      banner.remove();
    }));
  }
}
if(!localStorage.getItem('missionMethodCookieConsent')) showCookiePanel();
document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',showCookiePanel));
