// Entrepreneurs' courses: which ones this learner has, and a simulated checkout until payments are connected.
// Each course is bought on its own, or all four together ('entrepreneurs-all'). In test mode ownership is kept in
// this browser session only (same key as course-access.js, in sessionStorage). TEST MODE: the "payment" is the test code below; nothing is
// charged and nothing leaves the browser. When the payment provider is connected, replace confirmPurchase() with
// the real checkout and read ownership from the server (docs/production-access.md).
import {COURSE_ACCESS_KEY,ownedCourseIds} from './course-access.js?v=ev5';
import {priceOf,BANDS,PRICE_FLOOR} from './pricing-config.js?v=prices-sync-1';
import {countries,bandOfCountry} from './country-bands.js?v=1';
export const FOUNDER_ALL='entrepreneurs-all';
const TEST_CODE='1234';
// Test purchases last only for this browser session (like the 1234 page gate): closing the browser or tab locks the
// courses again, so the purchase flow can be tested from the start each time.
const store=()=>{try{return globalThis.sessionStorage;}catch{return null;}};
// Earlier test purchases were kept permanently; clear those once so the courses start locked.
try{const ls=globalThis.localStorage,kept=ownedCourseIds(ls);if(kept.some(x=>x.startsWith('entrepreneurs-')))ls.setItem(COURSE_ACCESS_KEY,JSON.stringify(kept.filter(x=>!x.startsWith('entrepreneurs-'))));}catch{}
export const ownsFounderCourse=id=>{const owned=ownedCourseIds(store());return owned.includes(FOUNDER_ALL)||owned.includes(id);};
export const ownsAllFounderCourses=()=>ownedCourseIds(store()).includes(FOUNDER_ALL);
export function grantFounder(id){const s=store();if(!s)return false;const owned=new Set(ownedCourseIds(s));owned.add(id);try{s.setItem(COURSE_ACCESS_KEY,JSON.stringify([...owned]));return true;}catch{return false;}}
export function resetFounderPurchases(){const s=store();if(!s)return;try{s.setItem(COURSE_ACCESS_KEY,JSON.stringify(ownedCourseIds(s).filter(x=>!x.startsWith('entrepreneurs-'))));}catch{}}

// Price band: the country that issued the card sets it (World Bank income groups). The Prices page switcher and the
// checkout country choice are remembered for this browser session.
const BAND_KEY='mii.priceBand',COUNTRY_KEY='mii.cardCountry';
const sget=k=>{try{return globalThis.sessionStorage.getItem(k);}catch{return null;}};
const sset=(k,v)=>{try{globalThis.sessionStorage.setItem(k,v);}catch{}};
export const currentBand=()=>{const c=sget(COUNTRY_KEY),b=c&&bandOfCountry(c);if(b)return BANDS.findIndex(x=>x.id===b);const n=Number(sget(BAND_KEY));return n>=0&&n<4?n:0;};
const priceKey=id=>id===FOUNDER_ALL?'founder-pathway':'course';
export const coursePrice=(id,band=currentBand())=>({now:priceOf(priceKey(id),band,'launch'),regular:priceOf(priceKey(id),band,'regular')});
const usd=n=>'$'+n;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CSS=`.fc-backdrop{position:fixed;inset:0;background:rgba(10,22,28,.55);z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px}
.fc-card{background:#fff;border-radius:16px;max-width:460px;width:100%;padding:28px 26px 24px;box-shadow:0 24px 60px rgba(10,22,28,.25);font-family:inherit;color:#14304a;max-height:calc(100vh - 32px);overflow:auto}
.fc-card h2{margin:.1rem 0 .5rem;font-size:1.45rem;line-height:1.2}
.fc-eyebrow{font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#16746e}
.fc-options{display:grid;gap:.6rem;margin:1rem 0}
.fc-option{display:flex;gap:.7rem;align-items:flex-start;padding:.8rem .9rem;border:1.5px solid #d9e6e3;border-radius:10px;cursor:pointer}
.fc-option:has(input:checked){border-color:#16746e;background:#f4f9f8}
.fc-option input{margin-top:.25rem;accent-color:#16746e}
.fc-option b{display:block}.fc-option small{color:#546974;line-height:1.4}
.fc-test{margin:.6rem 0 0;padding:.75rem .9rem;border-radius:10px;background:#faf7ef;border:1px dashed #d8cfb6;font-size:.9rem;line-height:1.45}
.fc-test label{display:block;font-weight:700;margin-bottom:.35rem}
.fc-test input{width:100%;box-sizing:border-box;font:inherit;font-size:1.1rem;letter-spacing:.3em;text-align:center;padding:.6rem;border:1.5px solid #d4c9b1;border-radius:8px}
.fc-error{color:#c53b1a;font-size:.88rem;min-height:1.2em;margin:.35rem 0 0}
.fc-actions{display:flex;gap:.6rem;justify-content:flex-end;margin-top:1rem;flex-wrap:wrap}
.fc-actions button{font:inherit;font-weight:800;border-radius:999px;padding:.7rem 1.2rem;cursor:pointer;border:1.5px solid #16746e}
.fc-pay{background:#e56f4a;border-color:#e56f4a!important;color:#fff}.fc-cancel{background:#fff;color:#16746e}
.fc-country{margin:.9rem 0 0}.fc-country label{display:block;font-weight:700;font-size:.92rem;margin-bottom:.3rem}
.fc-country select{width:100%;font:inherit;padding:.55rem .6rem;border:1.5px solid #d4c9b1;border-radius:8px;background:#fff}
.fc-band{margin:.5rem 0 0;padding:.6rem .75rem;border-radius:8px;background:#eef6f4;font-size:.86rem;line-height:1.45;color:#14304a}
.fc-band b{color:#16746e}
.fc-consent{display:flex;gap:.5rem;align-items:flex-start;font-size:.82rem;line-height:1.4;color:#41525c;margin:.6rem 0 0;font-weight:400}.fc-consent input{margin-top:.2rem;accent-color:#16746e}.fc-consent a{color:#16746e;font-weight:700}
.fc-price{float:right;font-weight:800;color:#14304a;margin-left:.5rem}.fc-price s{color:#8a99a3;font-weight:600;margin-right:.3rem}`;
function ensureCSS(){if(document.getElementById('fc-style'))return;const s=document.createElement('style');s.id='fc-style';s.textContent=CSS;document.head.append(s);}

// course = {id, name ('Course 2 · Organise'), start (first lesson URL)}; opens the checkout for that course.
export function openFounderCheckout(course,{onDone}={}){
 ensureCSS();
 const wrap=document.createElement('div');wrap.className='fc-backdrop';
 const saved=sget(COUNTRY_KEY)||'';
 const opts=countries.map(c=>`<option value="${esc(c.name)}"${c.name===saved?' selected':''}>${esc(c.name)}</option>`).join('');
 wrap.innerHTML=`<div class="fc-card" role="dialog" aria-modal="true" aria-labelledby="fc-title"><span class="fc-eyebrow">Get access</span><h2 id="fc-title">${esc(course.name)}</h2><p>Choose what you would like to unlock.</p>
 <div class="fc-options" role="radiogroup" aria-label="What to unlock">
  ${course.id===FOUNDER_ALL?'':`<label class="fc-option"><input type="radio" name="fc-what" value="${esc(course.id)}" checked><span><span class="fc-price" data-fc-price="${esc(course.id)}"></span><b>${esc(course.name)}</b><small>All lessons, videos, exercises and PDFs in this course.</small></span></label>`}
  <label class="fc-option"><input type="radio" name="fc-what" value="${FOUNDER_ALL}"${course.id===FOUNDER_ALL?' checked':''}><span><span class="fc-price" data-fc-price="${FOUNDER_ALL}"></span><b>All four courses</b><small>Clarify, Organise, Prove &amp; Show and Protect, with every course shown in one place.</small></span></label>
 </div>
 <div class="fc-country"><label for="fc-country">Country where your card was issued</label><select id="fc-country"><option value="">Choose a country…</option>${opts}</select><p class="fc-band" id="fc-band" aria-live="polite"></p></div>
 <form class="fc-test"><label for="fc-code">Test payment</label><p style="margin:0 0 .5rem">Payments are not connected yet. Enter the test code to simulate a purchase; nothing is charged.</p><input id="fc-code" inputmode="numeric" autocomplete="off" maxlength="12" aria-describedby="fc-error"><label class="fc-consent"><input type="checkbox" id="fc-consent"> I want access straight away. I understand that once I open the course or download a file, I lose my 14-day right to cancel (EU and UK buyers). <a href="legal.html#refunds" target="_blank" rel="noopener">Refund policy</a></label><p class="fc-error" id="fc-error" role="alert"></p>
 <div class="fc-actions"><button type="button" class="fc-cancel">Cancel</button><button type="submit" class="fc-pay">Confirm test purchase</button></div></form></div>`;
 const sel=wrap.querySelector('#fc-country'),bandBox=wrap.querySelector('#fc-band'),pay=wrap.querySelector('.fc-pay');
 const render=()=>{
  const country=sel.value,bandId=country&&bandOfCountry(country),band=bandId?BANDS.findIndex(b=>b.id===bandId):currentBand(),B=BANDS[band];
  wrap.querySelectorAll('[data-fc-price]').forEach(el=>{const p=coursePrice(el.dataset.fcPrice,band);el.innerHTML=(p.regular>p.now?`<s>${usd(p.regular)}</s>`:'')+usd(p.now);});
  bandBox.innerHTML=country
   ?`<b>${esc(country)}</b> is ${/^[aeiou]/i.test(B.name)?"an":"a"} ${esc(B.name.toLowerCase())} country (World Bank, FY2027), so you pay ${Math.round(B.level*100)}% of the standard price. No item costs less than US$${PRICE_FLOOR}.`
   :`Showing <b>${esc(B.name.toLowerCase())}</b> prices. Choose the country where your card was issued: it sets your price band. No item costs less than US$${PRICE_FLOOR}.`;
  const what=wrap.querySelector('input[name=fc-what]:checked').value;
  pay.textContent='Confirm test purchase · '+usd(coursePrice(what,band).now);
 };
 sel.addEventListener('change',()=>{if(sel.value){sset(COUNTRY_KEY,sel.value);sset(BAND_KEY,String(BANDS.findIndex(b=>b.id===bandOfCountry(sel.value))));}render();});
 wrap.querySelectorAll('input[name=fc-what]').forEach(r=>r.addEventListener('change',render));
 render();
 const close=()=>{wrap.remove();document.removeEventListener('keydown',onKey);refreshFounderPrices();};
 const onKey=ev=>{if(ev.key==='Escape')close();};
 document.addEventListener('keydown',onKey);
 wrap.addEventListener('click',ev=>{if(ev.target===wrap)close();});
 wrap.querySelector('.fc-cancel').onclick=close;
 wrap.querySelector('form').addEventListener('submit',ev=>{ev.preventDefault();const code=wrap.querySelector('#fc-code').value.trim();
  if(!sel.value){wrap.querySelector('#fc-error').textContent='Choose the country where your card was issued: it sets your price.';sel.focus();return;}
  if(!wrap.querySelector('#fc-consent').checked){wrap.querySelector('#fc-error').textContent='Please tick the box to confirm you want access straight away.';return;}if(code!==TEST_CODE){wrap.querySelector('#fc-error').textContent='That code is not right. Use the test code you were given.';return;}
  const what=wrap.querySelector('input[name=fc-what]:checked').value;
  if(!grantFounder(what)){wrap.querySelector('#fc-error').textContent='This browser is blocking storage, so access could not be saved.';return;}
  close();(onDone||(()=>{location.href=course.start||location.href;}))(what);});
 document.body.append(wrap);(sel.value?wrap.querySelector('#fc-code'):sel).focus();
}

// Buy buttons show the price for the visitor's band: "Get Course 1 · $29 →".
export function refreshFounderPrices(root=document){
 root.querySelectorAll('[data-founder-buy]').forEach(btn=>{
  if(btn.tagName==='A'&&!btn.dataset.founderBuy)return;
  if(!btn.dataset.label)btn.dataset.label=btn.textContent.replace(/\s*·\s*\$\d+/,'').replace(/\s*→\s*$/,'').trim();
  const p=coursePrice(btn.dataset.founderBuy);
  btn.textContent=`${btn.dataset.label} · ${usd(p.now)} →`;
 });
}

// Static pages: <a|button data-founder-buy="entrepreneurs-organise" data-name="Course 2 · Organise" data-start="…">.
// Owned courses turn into a "Go to the course" link; data-owned-text sets its label.
export function bindFounderButtons(root=document){
 if(new URLSearchParams(location.search).has('reset-purchases')){resetFounderPurchases();}
 root.querySelectorAll('[data-founder-buy]').forEach(btn=>{
  const id=btn.dataset.founderBuy;
  if(id!==FOUNDER_ALL&&ownsFounderCourse(id)&&btn.dataset.start){const a=document.createElement('a');a.className=btn.className;a.href=btn.dataset.start;a.textContent=btn.dataset.ownedText||'Go to the course →';btn.replaceWith(a);return;}
  if(id===FOUNDER_ALL&&ownsAllFounderCourses()){btn.hidden=true;return;}
  btn.addEventListener('click',ev=>{ev.preventDefault();openFounderCheckout({id,name:btn.dataset.name||'All four courses',start:btn.dataset.start});});
 }); refreshFounderPrices(root);
}

// Prices page: any catalogue item (pack, library, Essentials...) can be test-bought.
// <button data-buy-key="pack-policies" data-buy-name="Policies & procedures pack">.
export function openProductCheckout({key,name}){
 ensureCSS();
 const wrap=document.createElement('div');wrap.className='fc-backdrop';
 const saved=sget(COUNTRY_KEY)||'';
 const opts=countries.map(c=>`<option value="${esc(c.name)}"${c.name===saved?' selected':''}>${esc(c.name)}</option>`).join('');
 wrap.innerHTML=`<div class="fc-card" role="dialog" aria-modal="true" aria-labelledby="fc-title"><span class="fc-eyebrow">Buy</span><h2 id="fc-title">${esc(name)}</h2>
 <div class="fc-options"><div class="fc-option" style="cursor:default"><span><span class="fc-price" id="fc-one"></span><b>${esc(name)}</b><small>One payment. Editable Word files for use within one organisation.</small></span></div></div>
 <div class="fc-country"><label for="fc-country">Country where your card was issued</label><select id="fc-country"><option value="">Choose a country…</option>${opts}</select><p class="fc-band" id="fc-band" aria-live="polite"></p></div>
 <form class="fc-test"><label for="fc-code">Test payment</label><p style="margin:0 0 .5rem">Payments are not connected yet. Enter the test code to simulate a purchase; nothing is charged.</p><input id="fc-code" inputmode="numeric" autocomplete="off" maxlength="12" aria-describedby="fc-error"><label class="fc-consent"><input type="checkbox" id="fc-consent"> I want access straight away. I understand that once I open the course or download a file, I lose my 14-day right to cancel (EU and UK buyers). <a href="legal.html#refunds" target="_blank" rel="noopener">Refund policy</a></label><p class="fc-error" id="fc-error" role="alert"></p>
 <div class="fc-actions"><button type="button" class="fc-cancel">Cancel</button><button type="submit" class="fc-pay">Confirm test purchase</button></div></form></div>`;
 const sel=wrap.querySelector('#fc-country'),bandBox=wrap.querySelector('#fc-band'),pay=wrap.querySelector('.fc-pay');
 const render=()=>{
  const country=sel.value,bandId=country&&bandOfCountry(country),band=bandId?BANDS.findIndex(b=>b.id===bandId):currentBand(),B=BANDS[band];
  const now=priceOf(key,band,'launch'),reg=priceOf(key,band,'regular');
  wrap.querySelector('#fc-one').innerHTML=(reg>now?`<s>${usd(reg)}</s>`:'')+usd(now);
  bandBox.innerHTML=country
   ?`<b>${esc(country)}</b> is ${/^[aeiou]/i.test(B.name)?"an":"a"} ${esc(B.name.toLowerCase())} country (World Bank, FY2027), so you pay ${Math.round(B.level*100)}% of the standard price. No item costs less than US$${PRICE_FLOOR}.`
   :`Showing <b>${esc(B.name.toLowerCase())}</b> prices. Choose the country where your card was issued: it sets your price band. No item costs less than US$${PRICE_FLOOR}.`;
  pay.textContent='Confirm test purchase · '+usd(now);
 };
 sel.addEventListener('change',()=>{if(sel.value){sset(COUNTRY_KEY,sel.value);sset(BAND_KEY,String(BANDS.findIndex(b=>b.id===bandOfCountry(sel.value))));}render();});
 render();
 const close=()=>{wrap.remove();document.removeEventListener('keydown',onKey);};
 const onKey=ev=>{if(ev.key==='Escape')close();};
 document.addEventListener('keydown',onKey);
 wrap.addEventListener('click',ev=>{if(ev.target===wrap)close();});
 wrap.querySelector('.fc-cancel').onclick=close;
 wrap.querySelector('form').addEventListener('submit',ev=>{ev.preventDefault();
  if(!sel.value){wrap.querySelector('#fc-error').textContent='Choose the country where your card was issued: it sets your price.';sel.focus();return;}
  if(!wrap.querySelector('#fc-consent').checked){wrap.querySelector('#fc-error').textContent='Please tick the box to confirm you want access straight away.';return;}if(wrap.querySelector('#fc-code').value.trim()!==TEST_CODE){wrap.querySelector('#fc-error').textContent='That code is not right. Use the test code you were given.';return;}
  const code=wrap.querySelector('#fc-code').value.trim(),zip=USE_STORAGE&&ZIPS[key];
  wrap.querySelector('.fc-card').innerHTML=`<span class="fc-eyebrow">Test purchase complete</span><h2>${esc(name)}</h2><p>Nothing was charged. When payments open, buyers receive their files straight away by email and in their account.</p>${zip?`<div class="fc-actions" style="justify-content:flex-start"><button type="button" class="fc-pay" data-zip="packs/${zip}.zip">Download in English (.zip)</button><button type="button" class="fc-cancel" data-zip="packs/${zip}-es.zip">Descargar en español (.zip)</button></div><p class="fc-error" id="fc-zip-error" role="alert"></p>`:''}<div class="fc-actions"><a class="fc-cancel" style="text-decoration:none" href="legal-templates.html">Go to the templates</a><button type="button" class="fc-cancel" data-close>Close</button></div>`;
  wrap.querySelector('[data-close]').onclick=close;
  wrap.querySelectorAll('[data-zip]').forEach(b=>b.onclick=()=>fileLink(b.dataset.zip,code).then(url=>{location.href=url;}).catch(m=>{wrap.querySelector('#fc-zip-error').textContent=m;}));});
 document.body.append(wrap);(sel.value?wrap.querySelector('#fc-code'):sel).focus();
}
// Pack zips in private storage (built by scripts/legal-templates/packs.mjs and the template-files function).
const ZIPS={'pack-policies':'policies-pack','pack-contracts':'contracts-pack','pack-consent':'consent-pack','pack-governance':'governance-pack','essentials':'start-up-legal-essentials','full-library':'full-template-library'};
const USE_STORAGE=false; // switched on once the pack zips are in private storage
const FILES_FN='https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/template-files',ANON='sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';
function fileLink(file,code){return fetch(FILES_FN,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+ANON,apikey:ANON},body:JSON.stringify({action:'download',file,code})})
 .then(r=>r.json().then(j=>{if(!r.ok||!j.url)throw 'The download is not available right now. Please try again in a minute.';return j.url;}),()=>{throw 'The download could not start. Check your connection.';});}
export function bindPriceButtons(root=document){
 root.querySelectorAll('[data-buy-key]').forEach(b=>b.addEventListener('click',ev=>{ev.preventDefault();openProductCheckout({key:b.dataset.buyKey,name:b.dataset.buyName||b.textContent});}));
}
