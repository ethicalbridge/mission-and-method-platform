/* Method into Impact — accounts in the browser.
   Sign-in (emailed link or 6-digit code, no password), what the signed-in person owns, test purchases,
   downloads of owned files, and course answers kept on the account.

   Ownership ("keys") comes from the database (public.mip_my_keys(): products bought, plus what they include:
   a pathway includes its courses, a pack its templates). It is cached in localStorage so pages can check it
   without waiting; the cache is refreshed on every page load and whenever the person signs in or buys.
   Orders and ownership are only written by the server (functions mip-account and, later, the payment webhook). */
import { mip, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabase-client.js';

const KEYS = 'mip.keys.v1';
const RETURN = 'mip.returnTo';
const ls = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
             set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
             del: k => { try { localStorage.removeItem(k); } catch {} } };
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const emit = () => window.dispatchEvent(new CustomEvent('mip:account'));

export { mip };
export async function getSession() { const { data } = await mip.auth.getSession(); return data.session || null; }
export async function getUser() { return (await getSession())?.user || null; }

/** Product keys the signed-in person owns, from the cache (synchronous). Empty when signed out. */
export function cachedKeys() {
  try { const v = JSON.parse(ls.get(KEYS) || 'null'); return v && Array.isArray(v.keys) ? v.keys : []; } catch { return []; }
}
export const owns = key => cachedKeys().includes(key);
/** True when this browser has a signed-in session (synchronous; reads the stored session). */
export function signedInHint() { try { const s = JSON.parse(ls.get('mip-auth') || 'null'); return !!(s && (s.access_token || s.currentSession)); } catch { return false; } }

export async function refreshKeys() {
  const s = await getSession();
  if (!s) { ls.del(KEYS); emit(); return []; }
  const { data, error } = await mip.rpc('mip_my_keys');
  if (error) { console.warn('mip keys', error); return cachedKeys(); }
  const keys = (data || []).map(r => typeof r === 'string' ? r : r.mip_my_keys).filter(Boolean);
  ls.set(KEYS, JSON.stringify({ uid: s.user.id, keys, at: Date.now() }));
  emit();
  return keys;
}

async function call(fn, body) {
  const s = await getSession();
  let r;
  try {
    r = await fetch(`${SUPABASE_URL}/functions/v1/${fn}`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: 'Bearer ' + (s?.access_token || SUPABASE_PUBLISHABLE_KEY) }, body: JSON.stringify(body) });
  } catch { throw Object.assign(new Error('No connection. Check your internet and try again.'), { code: 'offline' }); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || 'Request failed'), { code: j.error, status: r.status });
  return j;
}

/** PREVIEW: records a test purchase on the account (no payment). opts: {product, code, country, band, amount, waiver}. */
export async function testPurchase(opts) {
  const j = await call('mip-account', { action: 'test-purchase', ...opts });
  await refreshKeys();
  return j;
}
export async function resetTestPurchases() { await call('mip-account', { action: 'reset-tests' }); return refreshKeys(); }
export async function deleteAccount() { await call('mip-account', { action: 'delete-account', confirm: 'DELETE' }); await mip.auth.signOut(); ls.del(KEYS); emit(); }

/** Downloads one owned file from private storage: 'en/<slug>.docx', 'es/<slug>.docx', 'en/<slug>.xlsx' or 'packs/<name>.zip'. */
export async function downloadFile(file) {
  const j = await call('template-files', { action: 'download', file });
  const a = document.createElement('a'); a.href = j.url; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
}
export const downloadError = e => e?.code === 'not_owned' ? 'This file is not on your account yet.' : e?.code === 'not_signed_in' ? 'Please sign in again.' : e?.code === 'offline' ? e.message : 'The download is not available right now. Please try again in a minute.';

export async function signOut() { await mip.auth.signOut(); ls.del(KEYS); emit(); }

// ---------- sign-in dialog ----------
const CSS = `.ma-back{position:fixed;inset:0;background:rgba(10,22,28,.55);z-index:2147483001;display:flex;align-items:center;justify-content:center;padding:16px}
.ma-card{background:#fff;border-radius:16px;max-width:430px;width:100%;padding:28px 26px 22px;box-shadow:0 24px 60px rgba(10,22,28,.25);color:#14304a;font-family:inherit;position:relative;max-height:calc(100vh - 32px);overflow:auto}
.ma-card h2{margin:.2rem 0 .5rem;font-size:1.4rem;line-height:1.2}.ma-card p{margin:.3rem 0 .8rem;line-height:1.5;color:#41525c;font-size:.95rem}
.ma-eyebrow{font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#16746e}
.ma-card label{display:block;font-weight:700;font-size:.9rem;margin:.6rem 0 .3rem}
.ma-card input{width:100%;box-sizing:border-box;font:inherit;padding:.7rem .8rem;border:1.5px solid #cfdcd9;border-radius:10px}
.ma-card input.ma-code{font-size:1.4rem;letter-spacing:.4em;text-align:center}
.ma-btn{display:block;width:100%;margin-top:.9rem;font:inherit;font-weight:800;border:0;border-radius:999px;padding:.8rem 1rem;background:#e56f4a;color:#fff;cursor:pointer}
.ma-btn[disabled]{opacity:.6;cursor:wait}.ma-link{background:none;border:0;color:#16746e;font:inherit;font-weight:700;cursor:pointer;padding:0;text-decoration:underline}
.ma-err{color:#c53b1a;font-size:.88rem;min-height:1.2em;margin:.4rem 0 0}.ma-small{font-size:.8rem!important;color:#6a7a83!important}
.ma-x{position:absolute;top:10px;right:12px;background:none;border:0;font-size:1.6rem;line-height:1;cursor:pointer;color:#6a7a83}`;
function ensureCSS() { if (document.getElementById('ma-style')) return; const s = document.createElement('style'); s.id = 'ma-style'; s.textContent = CSS; document.head.append(s); }

/** Opens the sign-in dialog. Resolves with the user once signed in, or null if closed. */
export function signInDialog({ title = 'Sign in to continue', why = 'Your courses and templates are kept on your account, so you can open them on any device.', returnTo = location.href } = {}) {
  ensureCSS();
  return new Promise(resolve => {
    const back = document.createElement('div'); back.className = 'ma-back';
    back.innerHTML = `<div class="ma-card" role="dialog" aria-modal="true" aria-labelledby="ma-title"><button class="ma-x" type="button" aria-label="Close">×</button>
      <span class="ma-eyebrow">Your account</span><h2 id="ma-title">${esc(title)}</h2><p>${esc(why)}</p>
      <form class="ma-step1"><label for="ma-email">Your email</label><input id="ma-email" type="email" autocomplete="email" required placeholder="you@organisation.org">
      <button class="ma-btn" type="submit">Email me a sign-in link</button><p class="ma-err" role="alert"></p>
      <p class="ma-small">No password. New here? The same email creates your account. See our <a href="legal.html#privacy" target="_blank" rel="noopener">privacy notice</a>.</p></form>
      <form class="ma-step2" hidden><p>We sent an email to <b class="ma-to"></b>. <b>Open the link in it</b> and you'll be signed in here. If the email shows a 6-digit code, you can type it instead:</p>
      <label for="ma-code">Code from the email (optional)</label><input id="ma-code" class="ma-code" inputmode="numeric" autocomplete="one-time-code" maxlength="10">
      <button class="ma-btn" type="submit">Sign in with the code</button><p class="ma-err" role="alert"></p>
      <p class="ma-small">Nothing arrived after a minute? Check your spam folder, or <button type="button" class="ma-link ma-again">use another email</button>.</p></form></div>`;
    document.body.append(back);
    const close = user => { back.remove(); document.removeEventListener('keydown', onKey); sub?.data?.subscription?.unsubscribe(); resolve(user || null); };
    const onKey = e => { if (e.key === 'Escape') close(null); };
    document.addEventListener('keydown', onKey);
    back.querySelector('.ma-x').onclick = () => close(null);
    back.addEventListener('click', e => { if (e.target === back) close(null); });
    const s1 = back.querySelector('.ma-step1'), s2 = back.querySelector('.ma-step2');
    let email = '';
    // Signed in from the emailed link in another tab: Supabase shares the session across tabs.
    const sub = mip.auth.onAuthStateChange((ev, session) => { if (ev === 'SIGNED_IN' && session?.user) { refreshKeys(); close(session.user); } });
    s1.addEventListener('submit', async e => {
      e.preventDefault();
      email = back.querySelector('#ma-email').value.trim();
      const err = s1.querySelector('.ma-err'), btn = s1.querySelector('.ma-btn');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email address.'; return; }
      btn.disabled = true; btn.textContent = 'Sending…'; err.textContent = '';
      ls.set(RETURN, returnTo);
      const { error } = await mip.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/account.html', shouldCreateUser: true } });
      btn.disabled = false; btn.textContent = 'Email me a sign-in link';
      if (error) { err.textContent = /rate|seconds/i.test(error.message) ? 'Please wait a minute before asking for another email.' : 'We could not send the email: ' + error.message; return; }
      s1.hidden = true; s2.hidden = false; s2.querySelector('.ma-to').textContent = email; s2.querySelector('#ma-code').focus();
    });
    s2.querySelector('.ma-again').onclick = () => { s2.hidden = true; s1.hidden = false; back.querySelector('#ma-email').focus(); };
    s2.addEventListener('submit', async e => {
      e.preventDefault();
      const token = back.querySelector('#ma-code').value.replace(/\s/g, ''), err = s2.querySelector('.ma-err'), btn = s2.querySelector('.ma-btn');
      if (!/^\d{6,10}$/.test(token)) { err.textContent = 'Type the code from the email, or open the link in it.'; return; }
      btn.disabled = true; err.textContent = '';
      const { data, error } = await mip.auth.verifyOtp({ email, token, type: 'email' });
      btn.disabled = false;
      if (error || !data?.user) { err.textContent = 'That code did not work. It may have expired: ask for a new email.'; return; }
      ls.del(RETURN); await refreshKeys(); close(data.user);
    });
    setTimeout(() => back.querySelector('#ma-email').focus(), 30);
  });
}

/** The signed-in user, asking them to sign in first if needed. Resolves null if they close the dialog. */
export async function requireUser(opts) { return (await getUser()) || signInDialog(opts); }

/** After the emailed link brings someone to account.html: the page they started from, if any (same site only). */
export function takeReturnTo() {
  const v = ls.get(RETURN); ls.del(RETURN);
  if (!v) return null;
  try { const u = new URL(v, location.origin); return u.origin === location.origin && !u.pathname.endsWith('/account.html') ? u.href : null; } catch { return null; }
}

// ---------- course answers on the account ----------
// The course keeps its working copy in this browser (learning-store.js). When signed in, the copy is also saved to
// the account (mip_course_state) a few seconds after each change, and merged in when the person signs in elsewhere.
const COURSE_KEY = 'mm.course.planning-system.v1';
function mergeStates(a, b) {
  if (!a) return b; if (!b) return a;
  const newer = (a.updatedAt || '') >= (b.updatedAt || '') ? a : b, older = newer === a ? b : a;
  const answers = { ...older.answers };
  for (const [k, v] of Object.entries(newer.answers || {})) answers[k] = { ...(answers[k] || {}), ...v };
  return { ...newer, answers, completed: { ...(older.completed || {}), ...(newer.completed || {}) }, tasks: (newer.tasks || []).length ? newer.tasks : (older.tasks || []) };
}
let pushTimer = null;
export async function pullCourseState() {
  const u = await getUser(); if (!u) return null;
  const { data, error } = await mip.from('mip_course_state').select('state,updated_at').eq('user_id', u.id).maybeSingle();
  if (error) { console.warn('course state', error); return null; }
  let local = null; try { local = JSON.parse(ls.get(COURSE_KEY) || 'null'); } catch {}
  const merged = mergeStates(local, data?.state || null);
  if (merged && JSON.stringify(merged) !== JSON.stringify(local)) { ls.set(COURSE_KEY, JSON.stringify(merged)); window.dispatchEvent(new CustomEvent('mip:course-state')); }
  if (merged && JSON.stringify(merged) !== JSON.stringify(data?.state || null)) await pushCourseState();
  return merged;
}
export async function pushCourseState() {
  const u = await getUser(); if (!u) return;
  let state = null; try { state = JSON.parse(ls.get(COURSE_KEY) || 'null'); } catch {}
  if (!state) return;
  const { error } = await mip.from('mip_course_state').upsert({ user_id: u.id, state, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) console.warn('course state save', error);
}
export function schedulePush() { clearTimeout(pushTimer); pushTimer = setTimeout(pushCourseState, 2500); }

// ---------- boot ----------
// Keep the menu link ("Sign in" / "My account", added by app.js) in step with the session.
async function navLink() {
  const on = !!(await getSession()), es = (document.documentElement.lang || '').startsWith('es');
  document.querySelectorAll('.nav-account').forEach(a => { a.classList.toggle('is-signed-in', on); a.dataset.i18n = on ? 'nav.account' : 'nav.signin'; a.textContent = on ? (es ? 'Mi cuenta' : 'My account') : (es ? 'Iniciar sesión' : 'Sign in'); });
}
window.addEventListener('mip:account', navLink);
mip.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') setTimeout(refreshKeys, 0); });
getSession().then(s => { if (s) refreshKeys(); else if (ls.get(KEYS)) { ls.del(KEYS); emit(); } });
