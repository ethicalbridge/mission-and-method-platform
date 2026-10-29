/* My account (account.html): sign-in, courses with progress, templates and packs with downloads, orders,
   data export and account deletion. Everything comes from the signed-in person's own rows (RLS). */
import { mip, getSession, refreshKeys, cachedKeys, signOut, downloadFile, downloadError, deleteAccount, resetTestPurchases, takeReturnTo, pullCourseState } from './mip-account.js?v=4';
import { founderPhases, phases, courseModules, freeModules, lessonPath } from '../../course-data.js?v=ev45';
import { readState, stats, lessonKey } from '../../learning-store.js?v=acct2';
import { openFounderCheckout, FOUNDER_ALL } from '../../founder-checkout.js?v=12';

const $ = id => document.getElementById(id);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const show = which => { $('acc-loading').hidden = true; $('acc-signed-out').hidden = which !== 'out'; $('acc-signed-in').hidden = which !== 'in'; };
const fmtDate = d => new Date(d).toLocaleDateString(document.documentElement.lang === 'es' ? 'es' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const url = (m, l) => '/' + lessonPath(m, l);

// ---------- signed out: two tabs (Sign in / Create account), both by emailed link or code ----------
let email = '';
let mode = 'signin';
const es = () => (document.documentElement.lang || '').startsWith('es');
const TXT = {
  signin: { en: ['Welcome back', 'Enter the email you used before and we\'ll send you a sign-in link. No password needed.', 'Email me a sign-in link'],
            es: ['Hola de nuevo', 'Escribe el correo que usaste y te enviaremos un enlace para entrar. Sin contraseña.', 'Envíame un enlace para entrar'] },
  signup: { en: ['Create your account', 'Enter your email and we\'ll send you a link to confirm it. That creates your account and signs you in. No password needed.', 'Create my account'],
            es: ['Crea tu cuenta', 'Escribe tu correo y te enviaremos un enlace para confirmarlo. Así se crea tu cuenta y entras. Sin contraseña.', 'Crear mi cuenta'] },
};
function setMode(m) {
  mode = m;
  const t = TXT[m][es() ? 'es' : 'en'];
  $('acc-auth-title').textContent = t[0]; $('acc-auth-lead').textContent = t[1]; $('acc-send').textContent = t[2];
  document.querySelectorAll('.acc-tabs [data-mode]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.mode === m)));
  $('acc-news-row').hidden = m !== 'signup';
  $('acc-signin-note').textContent = ''; $('acc-code-form').hidden = true;
}
document.querySelectorAll('.acc-tabs [data-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
if (new URLSearchParams(location.search).get('new') === '1') setMode('signup'); else setMode('signin');
$('acc-signin-form').addEventListener('submit', async e => {
  e.preventDefault();
  email = $('acc-email').value.trim();
  const note = $('acc-signin-note'), btn = $('acc-send');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = es() ? 'Escribe un correo válido.' : 'Please enter a valid email address.'; return; }
  btn.disabled = true; note.textContent = es() ? 'Enviando…' : 'Sending…';
  const { error } = await mip.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/account.html', shouldCreateUser: mode === 'signup' } });
  btn.disabled = false;
  if (error) {
    if (mode === 'signin' && /signups not allowed|not found|otp_disabled/i.test(error.message + ' ' + (error.code || ''))) {
      note.innerHTML = es() ? 'No hay ninguna cuenta con este correo. <button type="button" class="acc-link" id="acc-go-signup">Crear una cuenta</button>' : 'There is no account with this email yet. <button type="button" class="acc-link" id="acc-go-signup">Create an account</button>';
      $('acc-go-signup').onclick = () => { setMode('signup'); $('acc-email').value = email; };
      return;
    }
    note.textContent = /rate|seconds/i.test(error.message) ? (es() ? 'Espera un minuto antes de pedir otro correo.' : 'Please wait a minute before asking for another email.') : (es() ? 'No pudimos enviar el correo: ' : 'We could not send the email: ') + error.message; return;
  }
  note.innerHTML = es() ? `Revisa el correo de <b>${esc(email)}</b> y abre el enlace. Funciona durante una hora.` : `Check your inbox for <b>${esc(email)}</b> and open the link. It works for one hour.`;
  $('acc-code-form').hidden = false;
  // Optional newsletter box (Create account only, unticked by default): double opt-in email via assets/js/newsletter.js.
  const news = $('acc-news');
  if (mode === 'signup' && news?.checked && window.MIPNewsletter) window.MIPNewsletter.send('subscribe', { email, source: 'sign-up', consentText: news.parentElement.textContent.replace(/\s+/g, ' ').trim() }).catch(() => {});
});
$('acc-code-form').addEventListener('submit', async e => {
  e.preventDefault();
  const token = $('acc-code').value.replace(/\s/g, ''), note = $('acc-code-note');
  if (!/^\d{6,10}$/.test(token)) { note.textContent = 'Type the code from the email.'; return; }
  const { error } = await mip.auth.verifyOtp({ email, token, type: 'email' });
  if (error) note.textContent = 'That code did not work. It may have expired: ask for a new email.';
});

// ---------- signed in ----------
function courseCard(p, owned, state) {
  const mods = courseModules(p), list = mods;
  const st = stats(state, null, list);
  const free = mods.some(m => freeModules.includes(m.id));
  let next = null;
  for (const m of mods) { for (const l of m.lessons) if (!state.completed[lessonKey(m, l)]) { next = url(m, l); break; } if (next) break; }
  const first = url(mods[0], mods[0].lessons[0]);
  const label = `Course ${p.number} · ${p.name}`;
  return `<article class="acc-course${owned ? ' is-owned' : ''}"><span class="acc-badge">${owned ? 'Yours' : free ? 'Module 0 free' : 'Not bought yet'}</span><h3>${esc(label)}</h3><p class="acc-muted">${esc(p.summary || '')}</p>
    ${owned || st.done ? `<progress max="100" value="${st.percent}" aria-label="${esc(label)} progress"></progress><p class="acc-small">${st.done} of ${st.total} lessons complete</p>` : ''}
    <div class="acc-actions">${owned ? `<a class="acc-btn" href="${next || first}">${st.done ? 'Continue' : 'Start'} →</a>` : `<button class="acc-btn" type="button" data-buy-course="${esc(p.id)}" data-name="${esc(label)}" data-start="${first}">Get this course →</button>${free ? `<a class="acc-link" href="${first}">Try Module 0 free</a>` : ''}`}</div></article>`;
}

function renderCourses(keys, state) {
  const own = id => keys.includes(id);
  const founder = founderPhases.map(p => courseCard(p, own(p.id), state)).join('');
  const orgOwned = phases.filter(p => own(p.id));
  $('acc-courses').innerHTML = founder + orgOwned.map(p => courseCard(p, true, state)).join('') +
    (founderPhases.every(p => own(p.id)) ? '' : `<article class="acc-course acc-all"><span class="acc-badge">Best value</span><h3>All four courses</h3><p class="acc-muted">Clarify, Organise, Prove &amp; Show and Protect.</p><div class="acc-actions"><button class="acc-btn" type="button" data-buy-course="${FOUNDER_ALL}" data-name="All four courses" data-start="">Get all four →</button></div></article>`);
  $('acc-courses').querySelectorAll('[data-buy-course]').forEach(b => b.onclick = () => openFounderCheckout({ id: b.dataset.buyCourse, name: b.dataset.name, start: b.dataset.start }, { onDone: () => render() }));
}

async function renderTemplates(keys) {
  const box = $('acc-templates');
  const wanted = keys.filter(k => k.startsWith('template:') || k.startsWith('pack-') || k === 'essentials' || k === 'full-library');
  if (!wanted.length) { box.innerHTML = `<p class="acc-empty">No templates yet. <a href="legal-templates.html">Browse the 59 templates</a> or <a href="prices.html#templates">see the packs</a>. Three are free.</p>`; return; }
  const { data: prods } = await mip.from('mip_products').select('key,kind,name,files').in('key', wanted);
  const byKey = Object.fromEntries((prods || []).map(p => [p.key, p]));
  const packs = wanted.filter(k => byKey[k]?.kind === 'pack');
  const tpls = wanted.filter(k => byKey[k]?.kind === 'template').sort((a, b) => byKey[a].name.localeCompare(byKey[b].name));
  const XLSX = ['risk-register', 'delegation-of-authority-matrix', 'records-retention-schedule', 'board-skills-matrix'];
  box.innerHTML = (packs.length ? `<div class="acc-packs">${packs.map(k => { const p = byKey[k], en = p.files.find(f => !f.endsWith('-es.zip')), es = p.files.find(f => f.endsWith('-es.zip')); return `<article class="acc-pack"><h3>${esc(p.name)}</h3><div class="acc-actions">${en ? `<button class="acc-btn" data-file="${esc(en)}">Download all (.zip) ↓</button>` : ''}${es ? `<button class="acc-btn ghost" data-file="${esc(es)}" lang="es">Todo en español (.zip) ↓</button>` : ''}</div></article>`; }).join('')}</div>` : '') +
    `<details class="acc-tpl-list"${packs.length ? '' : ' open'}><summary>${tpls.length} template${tpls.length === 1 ? '' : 's'}, one by one</summary><ul>${tpls.map(k => { const slug = k.slice(9); return `<li><span>${esc(byKey[k].name)}</span><span class="acc-files"><button class="acc-link" data-file="en/${slug}.docx">Word ↓</button><button class="acc-link" data-file="es/${slug}.docx" lang="es">Español ↓</button>${XLSX.includes(slug) ? `<button class="acc-link" data-file="en/${slug}.xlsx">Excel ↓</button>` : ''}</span></li>`; }).join('')}</ul></details><p class="acc-note" id="acc-dl-note" role="status"></p>`;
  box.querySelectorAll('[data-file]').forEach(b => b.onclick = () => { b.disabled = true; downloadFile(b.dataset.file).catch(e => { $('acc-dl-note').textContent = downloadError(e); }).finally(() => { b.disabled = false; }); });
}

async function renderOrders() {
  const { data } = await mip.from('mip_orders').select('id,product_key,source,amount_usd,status,created_at').order('created_at', { ascending: false });
  if (!data?.length) { $('acc-orders').innerHTML = '<p class="acc-empty">No orders yet.</p>'; return; }
  const { data: prods } = await mip.from('mip_products').select('key,name').in('key', [...new Set(data.map(o => o.product_key))]);
  const name = Object.fromEntries((prods || []).map(p => [p.key, p.name]));
  $('acc-orders').innerHTML = `<div class="acc-table"><table><thead><tr><th>Date</th><th>What</th><th>Amount</th><th>Status</th></tr></thead><tbody>${data.map(o => `<tr><td>${fmtDate(o.created_at)}</td><td>${esc(name[o.product_key] || o.product_key)}</td><td>${o.amount_usd != null ? 'US$' + Number(o.amount_usd).toFixed(0) : '—'}</td><td>${o.source === 'test' ? '<span class="acc-pill">Test · not charged</span>' : esc(o.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

async function render() {
  const s = await getSession();
  if (!s) { show('out'); return; }
  const back = takeReturnTo();
  if (back) { location.replace(back); return; }
  const { data: profile } = await mip.from('mip_profiles').select('full_name,email').eq('id', s.user.id).maybeSingle();
  $('acc-name').textContent = profile?.full_name || s.user.email.split('@')[0];
  $('acc-email-shown').textContent = s.user.email;
  show('in');
  const keys = await refreshKeys();
  await pullCourseState().catch(() => {});
  let state; try { state = readState(); } catch { state = { answers: {}, completed: {}, tasks: [] }; }
  renderCourses(keys, state);
  await Promise.all([renderTemplates(keys), renderOrders()]);
}

$('acc-signout').onclick = async () => { await signOut(); show('out'); };
$('acc-delete').onclick = () => { $('acc-delete-form').hidden = false; $('acc-delete-word').focus(); };
$('acc-delete-form').addEventListener('submit', async e => {
  e.preventDefault();
  if ($('acc-delete-word').value.trim() !== 'DELETE') { $('acc-delete-note').textContent = 'Type DELETE in capitals to confirm.'; return; }
  $('acc-delete-note').textContent = 'Deleting…';
  try { await deleteAccount(); $('acc-delete-form').hidden = true; show('out'); $('acc-signin-note').textContent = 'Your account was deleted. Course answers on this browser stay here until you clear them.'; }
  catch { $('acc-delete-note').textContent = 'The account could not be deleted. Please try again, or write to hello@methodintoimpact.com.'; }
});
$('acc-export').onclick = async () => {
  const s = await getSession(); if (!s) return;
  const [profile, orders, ent, course] = await Promise.all([
    mip.from('mip_profiles').select('*').eq('id', s.user.id).maybeSingle(),
    mip.from('mip_orders').select('*'), mip.from('mip_entitlements').select('*'), mip.from('mip_course_state').select('*').maybeSingle()]);
  const out = { exported_at: new Date().toISOString(), account: { id: s.user.id, email: s.user.email, created_at: s.user.created_at }, profile: profile.data, orders: orders.data, owned: ent.data, course: course.data };
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })), download: 'method-into-impact-my-data.json' });
  document.body.append(a); a.click(); a.remove();
};
$('acc-reset').onclick = async () => { $('acc-reset-note').textContent = 'Removing…'; try { await resetTestPurchases(); $('acc-reset-note').textContent = 'Done.'; render(); } catch { $('acc-reset-note').textContent = 'Could not remove them.'; } };

mip.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') render(); });
render();
// Re-word the sign-in card when the language switch changes the page language.
new MutationObserver(() => setMode(mode)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
