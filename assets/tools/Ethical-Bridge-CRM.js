/* Ethical Bridge CRM — Impact Tool (Module 12 · Partnerships & Ecosystem Building).

   Sections: Dashboard · Outreach (organisations, contacts and email campaigns) · Conversations ·
   Relationship map · Newsletter. (6 Nov 2026: Partnership mapping, PAT and Partnership tracking removed at the
   owner's request; their saved records stay in ebcrm_records.)

   Access: a private team code, checked on the server by the `ebcrm-api` Edge Function (only its
   SHA-256 digest is stored there; the code never appears in this file). The code is remembered
   in this browser until "Lock CRM" is pressed.

   Data (all read and written through `ebcrm-api`):
   - Organisations come live from the Ethical Bridge directory (workspaces listed in
     ebcrm_directory_access). They are never copied into this database: one source of truth.
   - Organisations a workspace adds itself live in ebcrm_organisations.
   - Outreach marks live in ebcrm_outreach (one row per workspace + organisation).
   - Logged email campaigns live in ebcrm_records (kind + JSON data). Older CSP goals, stakeholders,
     partnership records and PAT assessments are still stored there but no longer shown.
   - Relationship map: ally type (ebcrm_outreach.ally), why (ally_reasons) and a note (ally_note), set from
     the email analysis or by hand; pins use the main office coordinates from the directory.
   - Newsletter: subscribers in ebcrm_newsletter; newsletters sent in ebcrm_campaigns; per-person
     Brevo events (delivered, opened, clicked, bounced, unsubscribed) in ebcrm_campaign_events, all
     kept up to date by the ebcrm-brevo-webhook Edge Function.
*/

const API = 'https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/ebcrm-api';

// ---------- constants ----------
const SECTIONS = ['Dashboard', 'Outreach', 'Conversations', 'Relationship map', 'Newsletter'];
const CONTINENTS = ['Africa', 'Asia', 'Europe', 'Oceania', 'The Americas'];
const INTERVIEW = [['Not interviewed', 'Not interviewed'], ['Interviewed', 'Interviewed'], ['Scheduled', 'Planned']]; // stored value 'Scheduled' is shown as 'Planned'
const interviewLabel = v => v === 'Scheduled' ? 'Planned' : v;
const EMAIL = ['Not sent', 'Sent'];
const SOCIAL = ['Not contacted', 'Contacted', 'Contacted and friend request sent'];
const REPLY = ['None', 'Replied', 'Automatic reply', 'Bounce back'];
const DEFAULT_OUTREACH = { interview_status: 'Not interviewed', interview_date: null, email_status: 'Not sent', date_sent: null, instagram_status: 'Not contacted', facebook_status: 'Not contacted', linkedin_status: 'Not contacted', reply_status: 'None', contact_person: '', personal_phone: '', notes: '', ally: '', ally_reasons: [], ally_note: '', conversions: [], conversion_note: '' };
const PAGE = 100;
const LS = { code: 'mm.ebcrm.code', continent: 'mm.ebcrm.continent', area: 'mm.ebcrm.area' };

// ---------- helpers ----------
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = d => { if (!d) return ''; const x = new Date(String(d).length === 10 ? d + 'T00:00:00' : d); return isNaN(x) ? String(d) : x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
const norm = s => String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
const lsGet = k => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const opts = (items, current, blank) => (blank ? `<option value="">${esc(blank)}</option>` : '') + items.map(it => { const [v, l] = Array.isArray(it) ? it : [it, it]; return `<option value="${esc(v)}"${String(v) === String(current ?? '') ? ' selected' : ''}>${esc(l)}</option>`; }).join('');
const field = (label, name, value = '', type = 'text', extra = '') => type === 'area'
  ? `<label class="field full"><span class="label">${esc(label)}</span><textarea name="${esc(name)}">${esc(value)}</textarea></label>`
  : `<label class="field"><span class="label">${esc(label)}</span><input name="${esc(name)}" type="${type}" value="${esc(value)}" ${type === 'number' ? 'step="any"' : ''} ${extra}></label>`;
const selectField = (label, name, items, value, blank = 'Select…', full = false) => `<label class="field${full ? ' full' : ''}"><span class="label">${esc(label)}</span><select name="${esc(name)}">${opts(items, value, blank)}</select></label>`;
const card = (label, value, caption = '', tone = '') => `<div class="card ${tone}"><span class="eyebrow">${esc(label)}</span><div class="metric">${esc(value)}</div>${caption ? `<p>${esc(caption)}</p>` : ''}</div>`;
const pct = (a, b) => b ? Math.round((a / b) * 100) + '%' : '—';
const csvCell = v => { let s = String(v ?? ''); if (/^[=+\-@]/.test(s)) s = "'" + s; return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
function downloadCsv(name, header, rows) {
  const body = '﻿' + [header, ...rows].map(r => r.map(csvCell).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
}
const formData = form => Object.fromEntries(new FormData(form).entries());

// ---------- state ----------
const S = {
  code: lsGet(LS.code), ws: null, hasDirectory: false, // private team code only (5 Nov 2026: public code 1234 removed because the CRM now holds email conversations)
  orgs: [], orgById: new Map(), allOrgs: [], unis: [], outreach: new Map(), records: { campaign: [], goal: [], stakeholder: [], partner: [], assessment: [], university: [] },
  area: lsGet(LS.area) === 'Universities' ? 'Universities' : 'Organisations',
  loading: true, loadError: '', directoryError: '', directoryLoadedAt: '',
  view: 'Dashboard', continent: lsGet(LS.continent) || 'All',
  f: { region: '', country: '', name: '', email: '', interview: '', emailStatus: '', reply: '', ig: '', fb: '', li: '', priority: '', list: '' }, page: 0,
  rf: { show: [], reason: '', q: '' }, relView: null,
  msgs: null, msgsError: '', cf: { region: '', country: '', name: '', email: '', status: '', ally: '' },
  subs: null, subsError: '', nf: { continent: '', region: '', country: '', name: '', email: '', match: '', status: 'Subscribed' }, nlQuery: '',
  camps: null, cevents: [], campsError: '', nlView: 'Subscribers', campOpen: '', tlRange: 'all',
  modal: '', message: '', saving: 0,
};
const root = document.getElementById('app');

// ---------- data access ----------
class ApiError extends Error { constructor(message, status) { super(message); this.status = status; } }
async function api(action, payload = {}, code = S.code) {
  let res;
  try { res = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json', 'x-crm-code': code }, body: JSON.stringify({ action, ...payload }) }); }
  catch { throw new ApiError('No connection. Check your internet and try again.', 0); }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  return body;
}
function lockOut(message = '') { S.code = ''; try { localStorage.removeItem(LS.code); } catch { /* */ } S.ws = null; S.message = message; render(); }

async function loadAll() {
  S.loading = true; S.loadError = ''; render();
  try {
    const body = await api('load');
    S.ws = body.workspace; S.hasDirectory = body.hasDirectory; S.directoryError = body.directoryError; S.directoryLoadedAt = body.directoryLoadedAt;
    const directory = body.directory.map(o => ({ ...o, own: false })), own = body.organisations, outreach = body.outreach, records = body.records;
    const mine = own.map(ownOrg);
    S.allOrgs = [...directory, ...mine.filter(o => !o.uni)].sort(byName);
    S.unis = mine.filter(o => o.uni).sort(byName);
    applyArea();
    S.outreach = new Map(outreach.map(r => [r.org_id, r]));
    S.records = { campaign: [], goal: [], stakeholder: [], partner: [], assessment: [], university: [] };
    for (const r of records) (S.records[r.kind] ||= []).push(r);
  } catch (e) {
    console.error(e);
    if (e.status === 401) { S.loading = false; return lockOut('That code is no longer valid. Enter the current team code.'); }
    S.loadError = e?.message || 'Could not load the CRM.';
  }
  S.loading = false; render();
  if (S.ws) { loadMessages(); loadNewsletter(); }
}

async function loadMessages() {
  S.msgsError = '';
  try { S.msgs = (await api('messages')).messages; }
  catch (e) { S.msgs = S.msgs || []; S.msgsError = e?.message || 'Could not load the conversations.'; }
  if (['Conversations', 'Dashboard', 'Newsletter', 'Relationship map'].includes(S.view)) render();
}

async function loadNewsletter() {
  S.subsError = ''; S.campsError = '';
  const [subs, camps] = await Promise.allSettled([api('newsletter'), api('campaigns')]);
  if (subs.status === 'fulfilled') S.subs = subs.value.subscribers; else { S.subs = S.subs || []; S.subsError = subs.reason?.message || 'Could not load the newsletter list.'; }
  if (camps.status === 'fulfilled') { S.camps = camps.value.campaigns; S.cevents = camps.value.events; } else { S.camps = S.camps || []; S.campsError = camps.reason?.message || 'Could not load the newsletters sent.'; }
  if (['Newsletter', 'Dashboard'].includes(S.view)) render();
}

function setSaving(delta) { S.saving += delta; const el = document.getElementById('save-state'); if (el) el.textContent = S.saving ? 'Saving…' : 'All changes saved'; }

async function saveOutreach(orgId, patch) {
  const prev = S.outreach.get(orgId) || { ...DEFAULT_OUTREACH, org_id: orgId };
  const next = { ...prev, ...patch };
  S.outreach.set(orgId, next);
  setSaving(1);
  try { await api('outreach', { org_id: orgId, patch }); }
  catch (e) { S.outreach.set(orgId, prev); if (e.status === 401) return lockOut('Your code is no longer valid.'); flash('Could not save: ' + e.message); render(); }
  finally { setSaving(-1); }
}

async function saveRecord(kind, id, data) {
  setSaving(1);
  try {
    const { row } = await api('record.save', { kind, id, data });
    const list = S.records[kind]; const i = list.findIndex(r => r.id === row.id);
    if (i >= 0) list[i] = row; else list.push(row);
    return row;
  } catch (e) { if (e.status === 401) lockOut('Your code is no longer valid.'); else flash('Could not save: ' + e.message); return null; }
  finally { setSaving(-1); }
}

async function deleteRecord(kind, id) {
  try { await api('record.delete', { id }); }
  catch (e) { flash('Could not delete: ' + e.message); return false; }
  S.records[kind] = S.records[kind].filter(r => r.id !== id);
  return true;
}

function flash(msg) { S.message = msg; render(); setTimeout(() => { if (S.message === msg) { S.message = ''; render(); } }, 5000); }

// ---------- derived ----------
const outreachOf = id => S.outreach.get(id) || DEFAULT_OUTREACH;
const inContinent = o => S.continent === 'All' || o.continent === S.continent;
const continentOrgs = () => S.orgs.filter(inContinent);
const continentsPresent = () => { const c = new Map(); for (const o of S.orgs) if (o.continent) c.set(o.continent, (c.get(o.continent) || 0) + 1); return [...c.entries()].sort((a, b) => a[0].localeCompare(b[0])); };

function stats(list) {
  const s = { orgs: list.length, scheduled: 0, interviewed: 0, ig: 0, fb: 0, li: 0, sent: 0, replied: 0, auto: 0, bounce: 0 };
  for (const o of list) {
    const r = outreachOf(o.id);
    if (r.interview_status === 'Scheduled') s.scheduled++;
    if (r.interview_status === 'Interviewed') s.interviewed++;
    if (r.instagram_status !== 'Not contacted') s.ig++;
    if (r.facebook_status !== 'Not contacted') s.fb++;
    if (r.linkedin_status !== 'Not contacted') s.li++;
    if (r.email_status === 'Sent') s.sent++;
    if (r.reply_status === 'Replied') s.replied++;
    if (r.reply_status === 'Automatic reply') s.auto++;
    if (r.reply_status === 'Bounce back') s.bounce++;
  }
  return s;
}

function filteredOrgs() {
  const f = S.f, n = norm(f.name), e = norm(f.email);
  return continentOrgs().filter(o => {
    if (f.region && o.region !== f.region) return false;
    if (f.country && o.country !== f.country) return false;
    const p = o.uni ? pipeOf(o.id) : null;
    if (n && !norm(o.name).includes(n) && !norm(o.registered).includes(n) && !(p && [o.unit, p.contact_name, p.ref].some(v => norm(v).includes(n)))) return false;
    if (e === '__none') { if (o.email || (p && (p.contact_email || p.other_email))) return false; }
    else if (e && !norm(o.email).includes(e) && !(p && [p.contact_email, p.other_email].some(v => norm(v).includes(e)))) return false;
    if (p && f.priority && (p.priority || '') !== (f.priority === '__none' ? '' : f.priority)) return false;
    if (p && f.list && p.list !== f.list) return false;
    const r = outreachOf(o.id);
    const is = (want, have, none) => !want || (want === '__contacted' || want === '__any' ? have !== none : have === want);
    if (f.interview && r.interview_status !== f.interview) return false;
    if (f.emailStatus && r.email_status !== f.emailStatus) return false;
    if (!is(f.reply, r.reply_status, 'None')) return false;
    if (!is(f.ig, r.instagram_status, 'Not contacted')) return false;
    if (!is(f.fb, r.facebook_status, 'Not contacted')) return false;
    if (!is(f.li, r.linkedin_status, 'Not contacted')) return false;
    return true;
  }).sort(byCountry);
}
// Table order: country A–Z, then organisation name A–Z (organisations without a country last).
const byCountry = (a, b) => (!a.country - !b.country) || a.country.localeCompare(b.country, 'en', { sensitivity: 'base' }) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
const FILTER_LABELS = { region: 'Region', country: 'Country', name: 'Name', email: 'Email address', interview: 'Interview', emailStatus: 'Email', reply: 'Reply', ig: 'Instagram', fb: 'Facebook', li: 'LinkedIn', priority: 'Priority', list: 'List' };
const filterValueLabel = v => v === '__contacted' ? 'Any contact' : v === '__any' ? 'Any response' : interviewLabel(v);
const EMPTY_FILTERS = () => ({ region: '', country: '', name: '', email: '', interview: '', emailStatus: '', reply: '', ig: '', fb: '', li: '', priority: '', list: '' });

// ---------- shell ----------
function render() {
  if (!S.code) return renderSignIn();
  if (!S.ws) { root.innerHTML = `<div class="shell crm"><p class="muted crm-loading">${S.loadError ? esc(S.loadError) + ' <button class="link" data-action="reload">Try again</button>' : 'Loading organisations and your outreach records…'}</p></div>`; return; }
  const uni = S.area === 'Universities';
  const continentBar = ['Dashboard', 'Outreach', 'Conversations', 'Relationship map'].includes(S.view) ? renderContinentBar() : '';
  let body = '';
  if (S.loading) body = `<p class="muted crm-loading">Loading organisations and your outreach records…</p>`;
  else if (S.loadError) body = `<div class="notice warn" role="alert">${esc(S.loadError)} <button class="link" data-action="reload">Try again</button></div>`;
  else body = ({
    'Dashboard': renderDashboard, 'Outreach': renderOutreach, 'Conversations': () => isUni() ? renderUniPipeline() : renderConversations(), 'Relationship map': renderRelMap, 'Newsletter': renderNewsletter,
  })[S.view]();
  if (uni) body = uniWords(body);
  const bar = uni ? uniWords(continentBar) : continentBar;
  unmountRelMap();
  root.innerHTML = `<div class="shell crm">
    <header class="top"><a class="brand" href="../../software.html">Mission <em>&</em> Method</a><div class="crm-top-right"><span class="tiny">Workspace: <b>${esc(S.ws.name)}</b></span><span class="tiny" id="save-state">${S.saving ? 'Saving…' : 'All changes saved'}</span><a href="../../software.html">← Impact Tools</a></div></header>
    <div class="hero crm-hero"><span class="eyebrow">Relationships · Ethical Bridge CRM</span><h1>Partner, outreach &amp; partnerships</h1><p>${uni ? 'Universities we contact to promote Handova to students, staff and alumni. Add them here; your outreach, conversations and relationships with them are saved to this workspace.' : S.hasDirectory ? 'Organisations come live from the Ethical Bridge directory. Your outreach, conversations and relationships are saved to this workspace.' : 'Add the organisations you work with, then track outreach, conversations and relationships in one place.'}</p></div>
    ${renderAreaSwitch()}
    ${`<nav class="nav" aria-label="CRM sections">${SECTIONS.filter(t => !uni || t !== 'Newsletter').map(t => `<button type="button" data-tab="${esc(t)}" class="${t === S.view ? 'active' : ''}"${t === S.view ? ' aria-current="page"' : ''}>${esc(t)}</button>`).join('')}</nav>`}
    <main id="main" tabindex="-1">${S.message ? `<div class="notice" role="status">${esc(S.message)}</div>` : ''}${S.directoryError ? `<div class="notice warn" role="alert">Directory: ${esc(S.directoryError)}</div>` : ''}${bar}${body}</main>
    <footer class="tiny">Ethical Bridge CRM · Method into Impact · ${uni ? 'Universities and their details are added and edited here' : 'Organisation details are edited on ethicalbridge.org, not here'}</footer></div>${uni && S.modal ? uniWords(S.modal) : S.modal}`;
  if (S.view === 'Relationship map' && S.msgs !== null && !S.loading && !S.loadError) mountRelMap();
}

function renderContinentBar() {
  const present = continentsPresent();
  const total = S.orgs.length;
  return `<section class="panel crm-continent"><div><span class="eyebrow">Start with a continent</span><h2>${esc(S.continent === 'All' ? 'All continents' : S.continent)}</h2><p class="muted">Organisation, outreach and response totals follow this selection.</p></div>
    <div class="crm-chips">${[['All', total], ...present].map(([c, n]) => `<button type="button" class="crm-chip${S.continent === c ? ' active' : ''}" data-continent="${esc(c)}">${esc(c)} <b>${n}</b></button>`).join('')}</div></section>`;
}

// ---------- Organisations / Universities ----------
const byName = (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
const numOrNull = v => v === null || v === undefined || v === '' || !Number.isFinite(Number(v)) ? null : Number(v);
const ownOrg = o => ({ id: 'own:' + o.id, rowId: o.id, name: o.name, continent: o.continent, region: o.region, country: o.country, city: o.city, email: o.email, phone: o.phone, website: o.website, own: true, uni: o.kind === 'university', unit: o.unit || '', unit_type: o.unit_type || '', lat: numOrNull(o.lat), lng: numOrNull(o.lng) });
const isUni = () => S.area === 'Universities';
// In the Universities area the same screens speak of universities: swap the words in visible text and tooltips only.
const UNI_WORDS = [[/Organisations/g, 'Universities'], [/organisations/g, 'universities'], [/Organisation/g, 'University'], [/organisation/g, 'university'],
  [/Not interviewed/g, 'Not contacted'], [/Interview date \(if planned\)/g, 'Contact date (if planned)'], [/Interviewed/g, 'Contacted'], [/interviewed/g, 'contacted'], [/INTERVIEWED/g, 'CONTACTED'], [/Interview\b/g, 'Contacted'], [/interview\b/g, 'contacted']];
const swapWords = t => UNI_WORDS.reduce((x, [re, w]) => x.replace(re, w), t);
const uniWords = html => html.split(/(<textarea[\s\S]*?<\/textarea>)/).map((part, i) => i % 2 ? part
  : part.replace(/>([^<]+)</g, (m, t) => '>' + swapWords(t) + '<').replace(/ (title|placeholder)="([^"]*)"/g, (m, k, v) => ` ${k}="${swapWords(v)}"`)).join('');
const W = (org, uni) => isUni() ? uni : org; // wording per area
// Both areas use the same tabs and tools: the active area decides which list S.orgs holds.
function applyArea() {
  S.orgs = isUni() ? S.unis : S.allOrgs;
  S.orgById = new Map(S.orgs.map(o => [o.id, o]));
  if (isUni() && S.view === 'Newsletter') S.view = 'Dashboard';
}
const UNIT_TYPES = ['Careers service', 'Volunteering office', 'Faculty or department', 'International office', 'Student union or society', 'Alumni office', 'Research centre', 'Other'];
// Two areas share the CRM: Organisations (the directory, outreach, conversations, map, newsletter) and
// Universities, contacted from Nov 2026 to promote Handova to students and staff (records of kind "university").
function renderAreaSwitch() {
  const n = S.unis.length;
  const b = (area, title, sub, count) => `<button type="button" data-area="${area}" class="${S.area === area ? 'active' : ''}"${S.area === area ? ' aria-current="page"' : ''}><span class="crm-area-t">${title}</span><span class="crm-area-n">${count}</span><span class="crm-area-s">${sub}</span></button>`;
  return `<nav class="crm-area" aria-label="CRM areas">${b('Organisations', 'Organisations', 'Directory, outreach, conversations, map and newsletter', S.allOrgs.length)}${b('Universities', 'Universities', 'Promoting Handova to students, staff and alumni: outreach, conversations and map', n)}</nav>`;
}
// ---------- Universities: the Handova conversion pipeline ----------
// From "Handova · Conversion and marketing phases" (Nov 2026): nine stages in four phases, plus Not now and Lost.
// Each university's pipeline is a record of kind "university" holding { org_id, status, … }.
const UPHASES = [['Attract', 'Get noticed: first contact and follow-ups until they reply', '#4f74a8'], ['Convince', 'Build trust: discovery call and pilot proposal', '#2f5784'], ['Close', 'Sign, run and review the free 3-month pilot', '#1d3a5f'], ['Grow', 'Paid Programme or Impact Partner, then renewal', '#3aa676']];
const USTAGES = [
  ['Not contacted', 'Attract', '1 · Target', 'Pick a priority contact and find a named person and email.', 'A named person and email'],
  ['Contacted', 'Attract', '2 · First contact', 'LinkedIn note on day 0, first email with the offer on day 2; warm introductions where possible.', 'A reply, a click or a page visit'],
  ['Replied', 'Attract', '3 · Follow-up', 'Day 7 with a live need, day 14 with a result or case study, a pause, one restart on day 45.', 'They reply, ask for more or book a call'],
  ['Call booked', 'Convince', '4 · Discovery call', '20 minutes: their programme, credit rules, cohort size, start date, who signs and when budgets are set.', 'They want a pilot and name a cohort and a contact'],
  ['Proposal sent', 'Convince', '5 · Proposal', 'Tailored pilot proposal within 48 hours, with the agreement draft and the safety documents.', 'The person who can sign approves it'],
  ['Pilot signed', 'Close', '6 · Pilot signed', 'Founding Partner pilot agreement signed: start date, capped cohort, named academic contact.', 'Signature and start date'],
  ['Pilot running', 'Close', '7 · Pilot running', 'Onboarding in week 1, weekly check-ins, mid-pilot check-in in week 6, certificates and reports in week 12.', 'Students finish needs and organisations rate the work'],
  ['Pilot review', 'Close', '8 · Review and paid offer', 'Pilot report and the paid offer at the income-band price with the Founding Partner discount.', 'The budget holder agrees'],
  ['Paid partner', 'Grow', '9 · Paid partner and renewal', 'Programme or Impact Partner agreement, termly reports, renewal talks 60 days before the year ends.', 'Signed paid agreement; then renewal']];
const UOUT = [['Not now', 'They said not now: note the reason and the month to come back'], ['Lost', 'They said no: note the reason (reviewed each quarter)']];
const TOUCHES = [['d0', 'Day 0', 'LinkedIn note'], ['d2', 'Day 2', 'First email with the offer pack'], ['d7', 'Day 7', 'Follow-up with a live need'], ['d14', 'Day 14', 'Last follow-up with a result or case study'], ['d45', 'Day 45', 'One restart with news']];
const UPRIORITY = [['A', 'A · priority'], ['B', 'B'], ['C', 'C']];
const UTIER = ['Programme Partner', 'Impact Partner'];
const stageIdx = st => USTAGES.findIndex(x => x[0] === st);
const stageOf = st => USTAGES.find(x => x[0] === st);
const phaseOf = st => st === 'Not now' || st === 'Lost' ? st : stageOf(st)?.[1] || 'Attract';
const phaseColor = ph => UPHASES.find(x => x[0] === ph)?.[2] || '#8a96a3';
const pipeRec = id => S.records.university.find(r => r.data?.org_id === id);
const pipeOf = id => ({ status: 'Not contacted', touches: {}, ...(pipeRec(id)?.data || {}) });
const daysSince = d => d ? Math.max(0, Math.floor((Date.now() - new Date(String(d).slice(0, 10) + "T00:00:00")) / 864e5)) : null;
const S_UF = () => ({ phase: '', status: '', country: '', priority: '', q: '', due: '' });
if (!S.uf) S.uf = S_UF();
async function savePipe(id, patch) {
  const rec = pipeRec(id), cur = pipeOf(id), next = { ...cur, ...patch, org_id: id };
  if (patch.status && patch.status !== cur.status) next.stage_since = today();
  const row = await saveRecord('university', rec?.id, next);
  if (!row) return false;
  // Keep the shared outreach marks in step, so Dashboard, Conversations and the map agree with the pipeline.
  const i = stageIdx(next.status), r = outreachOf(id), o = {};
  if (i >= 1 && r.email_status !== 'Sent') { o.email_status = 'Sent'; o.date_sent = r.date_sent || next.touches?.d2 || today(); }
  if (i >= 2 && r.reply_status !== 'Replied') o.reply_status = 'Replied';
  if (i >= 5 && !(r.conversions || []).includes('handova')) o.conversions = [...(r.conversions || []), 'handova'];
  if (Object.keys(o).length) await saveOutreach(id, o);
  return true;
}
function uniPipeRows() {
  return continentOrgs().map(o => ({ o, p: pipeOf(o.id) }));
}
function uniFiltered(rows) {
  const f = S.uf, q = norm(f.q), t = today();
  return rows.filter(({ o, p }) => (!f.phase || phaseOf(p.status) === f.phase) && (!f.status || p.status === f.status) && (!f.country || o.country === f.country) && (!f.priority || p.priority === f.priority)
    && (!f.due || (f.due === 'overdue' ? p.next_date && p.next_date < t && !['Lost'].includes(p.status) : f.due === 'none' ? !p.next_step && !['Lost', 'Paid partner'].includes(p.status) : true))
    && (!q || [o.name, o.unit, o.city, o.country, p.ref, p.who_to_approach, p.contact_name, p.contact_email, p.other_email, p.next_step].some(v => norm(v).includes(q))))
    .sort((a, b) => (stageIdx(b.p.status) - stageIdx(a.p.status)) || String(a.o.country || '').localeCompare(String(b.o.country || ''), 'en') || byName(a.o, b.o));
}
function uniFunnel(rows) {
  // How many universities reached each stage (or went past it); Not now and Lost count up to the stage they reached.
  const reached = USTAGES.map((st, i) => rows.filter(({ p }) => Math.max(stageIdx(p.status), Number.isInteger(p.reached) ? p.reached : -1) >= i).length);
  return reached;
}
function renderUniDashboard(steps) {
  const rows = uniPipeRows(), t = today();
  const inPhase = ph => rows.filter(({ p }) => phaseOf(p.status) === ph).length;
  const at = st => rows.filter(({ p }) => p.status === st).length;
  const pilots = at('Pilot signed') + at('Pilot running') + at('Pilot review');
  const income = rows.filter(({ p }) => ['Pilot running', 'Pilot review'].includes(p.status)).reduce((x, { p }) => x + (Number(p.price) || 0), 0);
  const overdue = rows.filter(({ p }) => p.next_date && p.next_date < t && p.status !== 'Lost').length;
  return `<section class="grid four crm-cards">
      ${card('Universities', rows.length, 'Added to this workspace')}
      ${UPHASES.map(([ph, tip]) => card(ph, inPhase(ph), tip)).join('')}
      ${card('Pilots', pilots, `${at('Pilot running')} running · ${at('Pilot review')} in review`)}
      ${card('Paid partners', at('Paid partner'), income ? `US$${num(income)} expected a year from pilots` : 'Programme or Impact Partners')}
      ${card('Next step overdue', overdue, 'Open conversations past their date', overdue ? 'warn' : '')}
    </section>
    <section class="panel"><span class="eyebrow">End-to-end workflow</span><h2>From first contact to a paid partnership</h2>
      <ol class="crm-flow">${UPHASES.map(([ph, tip], i) => `<li><button type="button" data-tab="Conversations" data-uqtab="phase=${ph}"><b>${i + 1}</b><span>${esc(ph)}</span><small>${esc(tip)}</small></button></li>`).join('')}</ol></section>`;
}
function renderUniPipeline() {
  const rows = uniPipeRows(), list = uniFiltered(rows), f = S.uf, t = today();
  const at = st => rows.filter(({ p }) => p.status === st).length;
  const inPhase = ph => rows.filter(({ p }) => phaseOf(p.status) === ph).length;
  const reached = uniFunnel(rows);
  const overdue = rows.filter(({ p }) => p.next_date && p.next_date < t && p.status !== 'Lost').length;
  const noStep = rows.filter(({ p }) => !p.next_step && !['Lost', 'Paid partner', 'Not contacted'].includes(p.status)).length;
  const income = rows.filter(({ p }) => ['Pilot running', 'Pilot review'].includes(p.status)).reduce((s, { p }) => s + (Number(p.price) || 0), 0);
  const fb = (label, v, key, val, tip, extra = '') => `<button type="button" data-uq="${key}=${esc(val)}" title="${esc(tip)}" class="${f[key] === val && Object.entries(f).filter(([k, x]) => x && k !== key).length === 0 ? 'active' : ''}" ${extra}><b>${v}</b><span>${esc(label)}</span></button>`;
  const phaseBox = ([ph, tip, c]) => `<div class="crm-group crm-uphase" style="--pc:${c};--n:${USTAGES.filter(x => x[1] === ph).length}"><h3 title="${esc(tip)}"><button type="button" class="link" data-uq="phase=${ph}">${ph}</button> <span class="crm-uphase-n">${inPhase(ph)}</span></h3>
      <div class="crm-quick">${USTAGES.filter(x => x[1] === ph).map(([st, , lbl, what, next]) => fb(lbl.replace(/^\d+ · /, ''), at(st), 'status', st, `${lbl} (${st}): ${what} Moves on when: ${next}.`)).join('')}</div></div>`;
  const countries = [...new Set(rows.map(r => r.o.country).filter(Boolean))].sort();
  const sel = (k, items, blank) => `<select data-uf="${k}" class="${f[k] ? 'crm-on' : ''}">${opts(items, f[k], blank)}</select>`;
  const funnel = USTAGES.map(([st, ph, lbl], i) => `<li style="--pc:${phaseColor(ph)};--w:${Math.max(28, 100 - i * 8)}%" title="${esc(lbl)}: ${reached[i]} reached this stage${i ? ` · ${pct(reached[i], reached[i - 1])} of the previous stage` : ''}"><b>${reached[i]}</b><span>${esc(lbl.replace(/^\d+ · /, ''))}</span>${i ? `<em>${pct(reached[i], reached[i - 1])}</em>` : ''}</li>`).join('');
  const touchCell = (o, p) => `<div class="crm-touches">${TOUCHES.map(([k, d, what]) => `<button type="button" data-touch="${k}" data-id="${esc(o.id)}" class="${p.touches?.[k] ? 'done' : ''}" title="${esc(`${d}: ${what}${p.touches?.[k] ? ' · done ' + fmtDate(p.touches[k]) : ' · click when done'}`)}">${esc(d.replace('Day ', 'D'))}</button>`).join('')}</div>`;
  const body = list.map(({ o, p }) => {
    const ph = phaseOf(p.status), st = stageOf(p.status), days = daysSince(p.stage_since), late = p.next_date && p.next_date < t && p.status !== 'Lost';
    return `<tr>
      <td>${esc(o.country || '—')}${o.city ? `<span class="tiny">${esc(o.city)}</span>` : ''}</td>
      <td class="crm-org"><button class="link" data-action="org" data-id="${esc(o.id)}">${esc(o.name)}</button>${o.unit ? `<span class="tiny">${esc(o.unit)}${o.unit_type ? ' · ' + esc(o.unit_type) : ''}</span>` : ''}${p.contact_name ? `<span class="tiny"><b>${esc(p.contact_name)}</b>${p.contact_role ? ', ' + esc(p.contact_role) : ''}</span>` : ''}${p.contact_email || o.email ? `<span class="tiny">${esc(p.contact_email || o.email)}</span>` : ''}${p.priority ? `<span class="pill dim" title="Priority from Annex A">Priority ${esc(p.priority)}</span>` : ''}${p.warm ? ' <span class="pill" title="Warm contact or introduction">Warm</span>' : ''}</td>
      <td><span class="crm-uphase-pill" style="--pc:${phaseColor(ph)}" title="${esc(UPHASES.find(x => x[0] === ph)?.[1] || UOUT.find(x => x[0] === ph)?.[1] || '')}">${esc(ph)}</span></td>
      <td><span class="crm-ustage" title="${esc(st ? `${st[3]} Moves on when: ${st[4]}.` : UOUT.find(x => x[0] === p.status)?.[1] || '')}">${esc(st ? st[2] : p.status)}</span><span class="tiny">${esc(p.status)}${days !== null ? ` · ${days} day${days === 1 ? '' : 's'} here` : ''}</span>${p.reason ? `<span class="tiny">${esc(p.reason)}${p.come_back ? ' · back in ' + esc(p.come_back) : ''}</span>` : ''}</td>
      <td>${touchCell(o, p)}</td>
      <td>${p.next_step ? esc(p.next_step) : '<span class="muted">—</span>'}${p.next_date ? `<span class="tiny ${late ? 'crm-late' : ''}"><b>${esc(fmtDate(p.next_date))}</b>${late ? ' · overdue' : ''}</span>` : ''}</td>
      <td>${p.call_date ? `<span class="tiny">Call ${esc(fmtDate(p.call_date))}</span>` : ''}${p.proposal_date ? `<span class="tiny">Proposal ${esc(fmtDate(p.proposal_date))}</span>` : ''}${p.pilot_start ? `<span class="tiny">Pilot ${esc(fmtDate(p.pilot_start))}${p.pilot_end ? ' – ' + esc(fmtDate(p.pilot_end)) : ''}</span>` : ''}${p.cohort ? `<span class="tiny">${esc(p.cohort)} students</span>` : ''}${p.needs_done ? `<span class="tiny">${esc(p.needs_done)} needs done${p.rating ? ' · ' + esc(p.rating) + '/5' : ''}</span>` : ''}${!p.call_date && !p.proposal_date && !p.pilot_start && !p.cohort ? '<span class="muted">—</span>' : ''}</td>
      <td>${p.tier ? `<b>${esc(p.tier)}</b>` : '<span class="muted">—</span>'}${p.price ? `<span class="tiny">US$${num(p.price)} a year${p.income_band ? ' · ' + esc(p.income_band) : ''}</span>` : p.income_band ? `<span class="tiny">${esc(p.income_band)}</span>` : ''}${p.renewal_date ? `<span class="tiny">Renewal ${esc(fmtDate(p.renewal_date))}</span>` : ''}</td>
      <td><button class="button secondary small" data-action="pipe-edit" data-id="${esc(o.id)}">Update</button></td></tr>`;
  });
  const HEADS = [['Country', 'Where the university is.'], ['University', 'University, the office or department, the named contact and priority. Click the name for its outreach marks and details.'],
    ['Phase', 'Attract → Convince → Close → Grow (from the conversion and marketing phases), or Not now / Lost.'], ['Stage', 'One of the nine stages, its status and how many days it has been there. Hover for what happens and when it moves on.'],
    ['Outreach sequence', 'Four touches over three weeks, then a pause: D0 LinkedIn note, D2 first email with the offer, D7 follow-up with a live need, D14 last follow-up with a result, D45 one restart. Click a day when it is done.'],
    ['Next step', 'What happens next and when. Red when the date has passed.'], ['Call, proposal & pilot', 'Discovery call, proposal, pilot dates, cohort, needs completed and rating.'], ['Paid partner', 'Tier (Programme or Impact Partner), yearly price and income band, renewal date.'], ['', '']];
  return `<section class="rowhead section-head"><div><h2>Conversion pipeline</h2><p class="muted">Every university moves through four phases and nine stages, from the first contact to a paid partnership and its renewal. Click a number to list those universities.</p></div><div class="actions"><button class="button secondary" data-action="add-org">+ Add university</button><button class="button" data-action="pipe-export">Export</button></div></section>
    <section class="crm-groups crm-uphases">${UPHASES.map(phaseBox).join('')}
      <div class="crm-group crm-uphase" style="--pc:#8a96a3;--n:2"><h3 title="Universities that said not now or no">Paused or lost</h3><div class="crm-quick">${UOUT.map(([st, tip]) => fb(st, at(st), 'status', st, tip)).join('')}</div></div></section>
    <section class="panel crm-ufunnel"><div class="rowhead"><span class="eyebrow">Funnel · reached each stage</span><span class="tiny" title="Pilots running or in review, times their yearly price">Expected income: <b>US$${num(income)}</b> a year</span></div><ol>${funnel}</ol></section>
    <section class="crm-groups crm-ureview"><div class="crm-group"><h3 title="What to review each Friday">Friday review</h3><div class="crm-quick">${fb('Next step overdue', overdue, 'due', 'overdue', 'Open conversations whose next-step date has passed')}${fb('No next step', noStep, 'due', 'none', 'Open conversations without a next step')}</div></div></section>
    <section class="rowhead section-head crm-uconv-head"><div><h2>Conversations</h2><p class="muted">Every university you are talking to, where it is in the pipeline and what happens next.</p></div></section>
    <section class="panel crm-filters"><div class="crm-frow"><b>Find</b>
      <label><span>Phase</span>${sel('phase', [...UPHASES.map(x => x[0]), 'Not now', 'Lost'], 'All phases')}</label>
      <label><span>Stage</span>${sel('status', [...USTAGES.map(x => [x[0], x[2]]), ...UOUT.map(x => x[0])], 'All stages')}</label>
      <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
      <label><span>Priority</span>${sel('priority', UPRIORITY, 'Any')}</label>
      <label><span>Search</span><input data-uf="q" value="${esc(f.q)}" placeholder="University, contact, next step…"></label>
      <button class="button secondary small" data-action="pipe-clear">Clear filters</button></div></section>
    <section class="panel"><div class="rowhead"><span class="eyebrow">Universities</span><span class="tiny"><b>${list.length}</b> of ${rows.length}</span></div>
      <div class="table-wrap crm-conv crm-upipe"><table><thead><tr>${HEADS.map(([h, tip]) => `<th${tip ? ` title="${esc(tip)}"` : ''}>${h ? `<span class="crm-th-tip">${esc(h)}</span>` : ''}</th>`).join('')}</tr></thead>
      <tbody>${body.join('') || `<tr><td colspan="9">${rows.length ? 'No universities match these filters.' : 'No universities yet. Use “+ Add university” to add the first one.'}</td></tr>`}</tbody></table></div></section>`;
}
function pipeModal(id) {
  const o = S.orgById.get(id); if (!o) return '';
  const p = pipeOf(id);
  const stageItems = [...USTAGES.map(([st, ph, lbl]) => [st, `${ph} · ${lbl} (${st})`]), ...UOUT.map(([st]) => [st, st])];
  return modal(`${o.name}: pipeline`, `<form class="form" data-form="pipe" data-id="${esc(id)}">
    ${selectField('Stage', 'status', stageItems, p.status, '', true)}
    ${selectField('Priority', 'priority', UPRIORITY, p.priority || '', 'Not set')}
    <label class="field"><span class="label">Warm contact or introduction</span><select name="warm">${opts([['', 'No'], ['1', 'Yes']], p.warm ? '1' : '')}</select></label>
    ${field('ID', 'ref', p.ref || '')}${selectField('List', 'list', UNI_LISTS, p.list || '', 'Not set')}${field('Who to approach', 'who_to_approach', p.who_to_approach || '')}
    ${field('Contact name', 'contact_name', p.contact_name || '')}${field('Contact role', 'contact_role', p.contact_role || '')}${field('Contact email', 'contact_email', p.contact_email || '', 'email')}${field('Other email', 'other_email', p.other_email || '', 'email')}${field('LinkedIn', 'linkedin', p.linkedin || '', 'url', 'placeholder="https://"')}
    ${field('Where found (page with the email)', 'where_found', p.where_found || '', 'url', 'placeholder="https://"')}${field('Programme page', 'programme_page', p.programme_page || '', 'url', 'placeholder="https://"')}${field('Note', 'source_note', p.source_note || '', 'area')}
    <fieldset class="field full crm-reasons"><legend class="label">Outreach sequence (date each touch was done)</legend>${TOUCHES.map(([k, d, what]) => `<label title="${esc(what)}">${esc(d)} · ${esc(what)} <input type="date" name="t_${k}" value="${esc(p.touches?.[k] || '')}"></label>`).join('')}</fieldset>
    ${field('Next step', 'next_step', p.next_step || '')}${field('Next step date', 'next_date', p.next_date || '', 'date')}
    ${field('Discovery call date', 'call_date', p.call_date || '', 'date')}${field('Proposal sent on', 'proposal_date', p.proposal_date || '', 'date')}
    ${field('Pilot start', 'pilot_start', p.pilot_start || '', 'date')}${field('Pilot end', 'pilot_end', p.pilot_end || '', 'date')}
    ${field('Cohort (students)', 'cohort', p.cohort || '', 'number', 'min="0"')}${field('Needs completed', 'needs_done', p.needs_done || '', 'number', 'min="0"')}${field('Average rating (of 5)', 'rating', p.rating || '', 'number', 'min="0" max="5"')}
    ${selectField('Paid tier', 'tier', UTIER, p.tier || '', 'Not yet')}${field('Income band', 'income_band', p.income_band || '')}${field('Yearly price (US$)', 'price', p.price || '', 'number', 'min="0"')}${field('Renewal date', 'renewal_date', p.renewal_date || '', 'date')}
    ${field('Reason (for Not now or Lost)', 'reason', p.reason || '')}${field('Month to come back (Not now)', 'come_back', p.come_back || '', 'month')}
    <div class="actions field full"><button class="button" type="submit">Save</button><button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`,
  'Move the university to its current stage. Dates and notes help the Friday review: stage counts, conversion between stages, days at each stage and the next step for every open conversation.');
}
function exportPipeline() {
  const list = uniFiltered(uniPipeRows());
  downloadCsv(`ethical-bridge-universities-pipeline-${today()}.csv`, ['continent', 'country', 'city', 'university', 'office', 'office_type', 'priority', 'warm', 'contact_name', 'contact_role', 'contact_email', 'phase', 'stage', 'status', 'days_at_stage', ...TOUCHES.map(x => x[1].toLowerCase().replace(' ', '_')), 'next_step', 'next_date', 'call_date', 'proposal_date', 'pilot_start', 'pilot_end', 'cohort', 'needs_done', 'rating', 'tier', 'income_band', 'price_usd', 'renewal_date', 'reason', 'come_back'],
    list.map(({ o, p }) => [o.continent, o.country, o.city, o.name, o.unit, o.unit_type, p.priority, p.warm ? 'yes' : '', p.contact_name, p.contact_role, p.contact_email || o.email, phaseOf(p.status), stageOf(p.status)?.[2] || p.status, p.status, daysSince(p.stage_since) ?? '', ...TOUCHES.map(([k]) => p.touches?.[k] || ''), p.next_step, p.next_date, p.call_date, p.proposal_date, p.pilot_start, p.pilot_end, p.cohort, p.needs_done, p.rating, p.tier, p.income_band, p.price, p.renewal_date, p.reason, p.come_back]));
}

// ---------- access code ----------
function renderSignIn() {
  root.innerHTML = `<div class="shell crm"><header class="top"><a class="brand" href="../../software.html">Mission <em>&</em> Method</a><a href="../../software.html">← Impact Tools</a></header>
  <div class="hero"><span class="eyebrow">Relationships · Ethical Bridge CRM</span><h1>Enter your team code</h1><p>The CRM holds organisation contacts and your outreach records, so it opens with your team's private code. This browser remembers it, so you only enter it once.</p></div>
  <main id="main"><form class="panel form crm-signin" data-form="signin"><label class="field full"><span class="label">Team code</span><input name="code" required autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Team code"></label><div class="actions field full"><button class="button" type="submit">Open the CRM</button></div><p class="tiny" id="signin-note" role="status">${esc(S.message || '')}</p></form></main></div>`;
  root.querySelector('input[name=code]')?.focus();
}

// ---------- Dashboard ----------
function renderDashboard() {
  const list = continentOrgs(); const s = stats(list);
  const steps = [['Contact', 'Email & social outreach', 'Outreach'], ['Engage', 'Replies & interviews', 'Conversations'], ['Relate', 'Allies, visits & why', 'Relationship map'], ['Stay in touch', 'Newsletter', 'Newsletter']].filter(x => !isUni() || x[2] !== 'Newsletter');
  if (isUni()) return renderUniDashboard(steps);
  return `<section class="grid four crm-cards">
      ${isUni() ? card('Universities', s.orgs, 'Added to this workspace') : card(S.hasDirectory ? 'Published organisations' : 'Organisations', s.orgs, S.hasDirectory ? 'Live from the Ethical Bridge directory' : 'Added to this workspace')}
      ${card(W('Organisations emailed', 'Universities emailed'), s.sent, pct(s.sent, s.orgs) + ' of this selection')}
      ${card('Replies', s.replied, pct(s.replied, s.sent) + ' reply rate · ' + s.interviewed + ' interviewed')}
      ${isUni() ? (() => { const c = continentOrgs().filter(o => (outreachOf(o.id).conversions || []).includes('handova')).length; return card('Promoting Handova', c, 'Universities that share Handova (conversion)'); })() : (() => { if (!S.subs) return card('Newsletter subscribers', '…', 'Live from Brevo'); const a = newsletterRows().filter(r => r.sub.subscribed); const m = a.filter(r => r.org && inContinent(r.org)).length; return card('Newsletter subscribers', a.length, m + ' matched to organisations' + (S.continent === 'All' ? '' : ' in ' + S.continent)); })()}
      ${isUni() ? '' : (() => { const c = sentCamps().slice(-1)[0]; if (!c) return card('Newsletters sent', S.camps ? 0 : '…', 'Brevo campaigns'); const x = campSummary(c); return card('Last newsletter', fmtDate(c.sent_at), `${num(x.sent)} sent · ${x.opened ? pct(x.opened, x.base) + ' opened' : 'opens not in yet'}`); })()}
      ${(() => { if (!S.msgs) return card('Strong allies', '…', 'From the email analysis'); const r = relRows().filter(x => inContinent(x.o)); return card('Strong allies', r.filter(x => x.cat === 'strong').length, r.filter(x => x.cat === 'visited').length + ' visited · ' + r.filter(x => x.cat === 'possible').length + ' possible allies'); })()}
      ${(() => { const w = S.msgs ? conversations().filter(c => c.status === 'waiting' && inContinent(c.o)).length : null; return card('Waiting for my reply', w ?? '…', 'Pinned emails · see Conversations', w ? 'warn' : ''); })()}
    </section>
    <section class="panel"><span class="eyebrow">End-to-end workflow</span><h2>From first email to lasting relationships</h2>
      <ol class="crm-flow">${steps.map(([t, d, v], i) => `<li><button type="button" data-tab="${esc(v)}"><b>${i + 1}</b><span>${esc(t)}</span><small>${esc(d)}</small></button></li>`).join('')}</ol></section>`;
}

// ---------- Outreach: organisations & contacts (first part of the Outreach tab) ----------
function renderOrganisations() {
  if (isUni()) return renderUniOutreach();
  const base = continentOrgs(); const s = stats(base);
  const regions = [...new Set(base.map(o => o.region).filter(Boolean))].sort();
  const countries = [...new Set(base.filter(o => !S.f.region || o.region === S.f.region).map(o => o.country).filter(Boolean))].sort();
  const list = filteredOrgs();
  const pages = Math.max(1, Math.ceil(list.length / PAGE)); if (S.page >= pages) S.page = pages - 1;
  const slice = list.slice(S.page * PAGE, S.page * PAGE + PAGE);
  const responses = s.replied + s.auto + s.bounce;
  const f = S.f;
  const sel = (key, items, all) => `<select data-filter="${key}" class="${f[key] ? 'crm-on' : ''}">${opts(items, f[key], all)}</select>`;
  const socialItems = [['__contacted', 'Any contact'], ...SOCIAL];
  const replyItems = [['__any', 'Any response'], ...REPLY];
  const active = Object.entries(f).filter(([, v]) => v);
  const only = active.length === 1 ? active[0].join('=') : active.length ? '?' : '';
  // Counter boxes, grouped: click one to show exactly those organisations (every other filter is cleared).
  const groups = [
    ['Social media', [['Instagram', s.ig, 'ig=__contacted'], ['Facebook', s.fb, 'fb=__contacted'], ['LinkedIn', s.li, 'li=__contacted']]],
    ['Emails', [['Emails sent', s.sent, 'emailStatus=Sent'], ['Not yet emailed', s.orgs - s.sent, 'emailStatus=Not sent'], ['Replies', s.replied, 'reply=Replied'], ['Automatic replies', s.auto, 'reply=Automatic reply'], ['Bounce backs', s.bounce, 'reply=Bounce back']]],
    ['Interview', [['Not interviewed', s.orgs - s.interviewed - s.scheduled, 'interview=Not interviewed'], ['Interviewed', s.interviewed, 'interview=Interviewed'], ['Planned', s.scheduled, 'interview=Scheduled']]],
  ];
  const qbtn = ([l, v, q]) => `<button type="button" data-quick="${esc(q)}" class="${q === only ? 'active' : ''}" title="Show ${esc(l.toLowerCase())} in the table"><b>${v}</b><span>${esc(l)}</span></button>`;
  const rows = slice.map(o => {
    const r = outreachOf(o.id);
    const social = [r.instagram_status, r.facebook_status, r.linkedin_status].some(v => v !== 'Not contacted');
    const tone = r.reply_status === 'Replied' ? 'reply' : social ? 'social' : '';
    const os = (field, items, val) => `<select data-out="${field}" data-id="${esc(o.id)}" aria-label="${esc(field)} for ${esc(o.name)}">${opts(items, val)}</select>`;
    return `<tr class="${tone}">
      <td>${esc(o.continent)}</td><td>${esc(o.region)}</td><td>${esc(o.country)}</td>
      <td class="crm-org"><button class="link" data-action="org" data-id="${esc(o.id)}">${esc(o.name)}</button>${o.own ? ' <span class="pill dim">Added here</span>' : ''}${removedBadge(o)}${o.website ? `<a class="tiny" href="${esc(o.website)}" target="_blank" rel="noopener noreferrer">Website ↗</a>` : ''}</td>
      <td>${os('interview_status', INTERVIEW, r.interview_status)}${r.interview_status === 'Scheduled' ? `<input type="date" class="crm-idate" data-out="interview_date" data-id="${esc(o.id)}" value="${esc(r.interview_date || '')}" aria-label="Interview date for ${esc(o.name)}" title="Interview date">` : ''}</td>
      <td><input data-out="contact_person" data-id="${esc(o.id)}" value="${esc(r.contact_person)}" aria-label="Personal contact for ${esc(o.name)}"></td>
      <td>${o.email ? esc(o.email) : '<span class="muted">—</span>'}</td><td>${esc(o.phone) || '<span class="muted">—</span>'}</td>
      <td><input data-out="personal_phone" data-id="${esc(o.id)}" value="${esc(r.personal_phone)}" aria-label="Personal phone for ${esc(o.name)}"></td>
      <td>${os('email_status', EMAIL, r.email_status)}</td>
      <td><input type="date" data-out="date_sent" data-id="${esc(o.id)}" value="${esc(r.date_sent || '')}" aria-label="Date sent to ${esc(o.name)}"></td>
      <td>${os('instagram_status', SOCIAL, r.instagram_status)}</td><td>${os('facebook_status', SOCIAL, r.facebook_status)}</td><td>${os('linkedin_status', SOCIAL, r.linkedin_status)}</td>
      <td>${os('reply_status', REPLY, r.reply_status)}</td></tr>`;
  });
  return `<section class="rowhead section-head"><h2>Outreach</h2><div class="actions"><button class="button secondary" data-action="add-org">+ Add ${W('organisation', 'university')}</button><button class="button" data-action="export-orgs">Export</button></div></section>
    <section class="crm-groups">
      <div class="crm-group crm-group-all crm-quick">${qbtn(['Organisations', s.orgs, ''])}</div>
      ${groups.map(([title, items]) => `<div class="crm-group"><h3>${esc(title)}</h3><div class="crm-quick">${items.map(qbtn).join('')}</div></div>`).join('')}
    </section>
    <p class="tiny crm-hint">Click a number to list those organisations below.</p>
    <section class="panel crm-filters">
      <div class="crm-frow"><b>General</b>
        <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
        <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
        <label><span>Organisation name</span><input data-filter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Search by name"></label>
        <label><span>Email address</span><input data-filter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email)}" placeholder="Search by email"></label></div>
      <div class="crm-frow"><b>Social media</b>
        <label><span>Instagram</span>${sel('ig', socialItems, 'All')}</label>
        <label><span>Facebook</span>${sel('fb', socialItems, 'All')}</label>
        <label><span>LinkedIn</span>${sel('li', socialItems, 'All')}</label></div>
      <div class="crm-frow"><b>Emails</b>
        <label><span>Email</span>${sel('emailStatus', EMAIL, 'All emails')}</label>
        <label><span>Reply</span>${sel('reply', replyItems, 'All')}</label></div>
      <div class="crm-frow"><b>Interview</b>
        <label><span>Interview</span>${sel('interview', INTERVIEW, 'All interview statuses')}</label>
        <button class="button secondary small" data-action="clear-filters">Clear filters</button></div>
    </section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Outreach workspace</span><p class="tiny crm-legend"><i class="g"></i> Contacted on Instagram, Facebook or LinkedIn <i class="o"></i> Email reply received</p></div><span class="tiny"><b>${list.length}</b> organisations${list.length > PAGE ? ` · showing ${S.page * PAGE + 1}–${S.page * PAGE + slice.length}` : ''}</span></div>
    ${active.length ? `<div class="crm-active" role="status"><span>Showing only:</span>${active.map(([k, v]) => `<button type="button" data-unfilter="${esc(k)}" title="Remove this filter">${esc(FILTER_LABELS[k])}: ${esc(filterValueLabel(v))} <b aria-hidden="true">✕</b></button>`).join('')}${active.length > 1 ? '<button type="button" class="link" data-action="clear-filters">Clear all</button>' : ''}</div>` : ''}
    <div class="tablewrap crm-table"><table><thead><tr>${['Continent', 'Region', 'Country', 'Organisation', 'Interview', 'Personal contact', 'Public email', 'Public phone', 'Personal phone', 'Email status', 'Date sent', 'Instagram', 'Facebook', 'LinkedIn', 'Reply'].map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.join('') || `<tr><td colspan="15">${S.orgs.length ? 'No organisations match these filters.' : 'No organisations yet. Add your first one.'}</td></tr>`}</tbody></table></div>
    ${pages > 1 ? `<div class="crm-pager"><button class="button secondary small" data-page="${S.page - 1}" ${S.page ? '' : 'disabled'}>← Previous</button><span class="tiny">Page ${S.page + 1} of ${pages}</span><button class="button secondary small" data-page="${S.page + 1}" ${S.page < pages - 1 ? '' : 'disabled'}>Next →</button></div>` : ''}</section>`;
}


// ---------- Outreach: universities (13 Nov 2026) ----------
// Universities are contacted by email only, so this table has no phone or social media columns. Each row carries the
// contact research from "Handova university contacts with emails" (Nov 2026): row ID, priority, list, the office to
// approach, the named contact and emails, and where they were found. These fields live in the university's pipeline record.
const UNI_LISTS = ['Map (A2)', 'Global (A3)', 'Networks (A4)'];
const UNI_HEADS = [['Continent', ''], ['Region', ''], ['Country', ''], ['ID', 'Row ID in the university contact list: U = university or centre, N = network or association.'],
  ['Priority', 'A strong fit and a hook Handova can use now · B good fit, hook needs adapting · C weak fit'], ['List', 'Map (A2) universities with a placement scheme · Global (A3) centres and programmes worldwide · Networks (A4)'],
  ['University', 'Click the name for its email marks, notes and details.'], ['Centre or programme', 'The centre, programme or office this row is about.'], ['Who to approach', 'The office or role that fits the Handova pitch.'],
  ['Contact name', 'Named person, from the university’s own pages. Edit it here.'], ['Role', ''], ['Email', 'Write to this address. Edit it here.'], ['Other email', 'Office address to copy, or a second contact.'],
  ['Where found', 'Page where the email is written: check it before sending.'], ['Note', 'What to check: outdated names, office-only addresses and other caveats.'], ['Programme page', 'Page that confirms the programme or hook.'],
  ['Email status', ''], ['Date sent', '']];
const linkCell = u => u ? `<a class="tiny" href="${esc(u)}" target="_blank" rel="noopener noreferrer" title="${esc(u)}">${esc(u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0])} ↗</a>` : '<span class="muted">—</span>';
function renderUniOutreach() {
  const base = continentOrgs(); const s = stats(base);
  const regions = [...new Set(base.map(o => o.region).filter(Boolean))].sort();
  const countries = [...new Set(base.filter(o => !S.f.region || o.region === S.f.region).map(o => o.country).filter(Boolean))].sort();
  const list = filteredOrgs();
  const pages = Math.max(1, Math.ceil(list.length / PAGE)); if (S.page >= pages) S.page = pages - 1;
  const slice = list.slice(S.page * PAGE, S.page * PAGE + PAGE);
  const f = S.f;
  const sel = (key, items, all) => `<select data-filter="${key}" class="${f[key] ? 'crm-on' : ''}">${opts(items, f[key], all)}</select>`;
  const replyItems = [['__any', 'Any response'], ...REPLY];
  const active = Object.entries(f).filter(([, v]) => v);
  const only = active.length === 1 ? active[0].join('=') : active.length ? '?' : '';
  const pri = k => base.filter(o => (pipeOf(o.id).priority || '') === k).length;
  const withEmail = base.filter(o => pipeOf(o.id).contact_email || o.email).length;
  const groups = [
    ['Contacts', [['With an email', withEmail, 'email=@'], ['No email yet', s.orgs - withEmail, 'email=__none']]],
    ['Priority', [['A · priority', pri('A'), 'priority=A'], ['B', pri('B'), 'priority=B'], ['C', pri('C'), 'priority=C'], ['Networks', base.filter(o => pipeOf(o.id).list === 'Networks (A4)').length, 'list=Networks (A4)']]],
    ['Emails', [['Emails sent', s.sent, 'emailStatus=Sent'], ['Not yet emailed', s.orgs - s.sent, 'emailStatus=Not sent'], ['Replies', s.replied, 'reply=Replied'], ['Automatic replies', s.auto, 'reply=Automatic reply'], ['Bounce backs', s.bounce, 'reply=Bounce back']]],
  ];
  const qbtn = ([l, v, q]) => `<button type="button" data-quick="${esc(q)}" class="${q === only ? 'active' : ''}" title="Show ${esc(l.toLowerCase())} in the table"><b>${v}</b><span>${esc(l)}</span></button>`;
  const rows = slice.map(o => {
    const r = outreachOf(o.id), p = pipeOf(o.id);
    const os = (field, items, val) => `<select data-out="${field}" data-id="${esc(o.id)}" aria-label="${esc(field)} for ${esc(o.name)}">${opts(items, val)}</select>`;
    const pin = (k, label, type = 'text') => `<input type="${type}" data-pipe="${k}" data-id="${esc(o.id)}" value="${esc(p[k] || '')}" aria-label="${esc(label)} for ${esc(o.name)}">`;
    return `<tr class="${r.reply_status === 'Replied' ? 'reply' : ''}">
      <td>${esc(o.continent)}</td><td>${esc(o.region)}</td><td>${esc(o.country)}</td>
      <td class="tiny">${esc(p.ref || '')}</td><td>${p.priority ? `<span class="pill dim">${esc(p.priority)}</span>` : '<span class="muted">—</span>'}${p.warm ? ' <span class="pill" title="Warm contact or introduction">Warm</span>' : ''}</td><td class="tiny">${esc(p.list || '')}</td>
      <td class="crm-org"><button class="link" data-action="org" data-id="${esc(o.id)}">${esc(o.name)}</button></td>
      <td class="tiny">${esc(o.unit || '')}</td><td class="tiny">${esc(p.who_to_approach || '')}</td>
      <td>${pin('contact_name', 'Contact name')}</td><td>${pin('contact_role', 'Role')}</td><td>${pin('contact_email', 'Email', 'email')}</td><td>${pin('other_email', 'Other email', 'email')}</td>
      <td>${linkCell(p.where_found)}</td><td class="tiny crm-unote">${esc(p.source_note || '')}</td><td>${linkCell(p.programme_page || o.website)}</td>
      <td>${os('email_status', EMAIL, r.email_status)}</td>
      <td><input type="date" data-out="date_sent" data-id="${esc(o.id)}" value="${esc(r.date_sent || '')}" aria-label="Date sent to ${esc(o.name)}"></td></tr>`;
  });
  return `<section class="rowhead section-head"><h2>Outreach</h2><div class="actions"><button class="button secondary" data-action="add-org">+ Add university</button><button class="button" data-action="export-orgs">Export</button></div></section>
    <section class="crm-groups">
      <div class="crm-group crm-group-all crm-quick">${qbtn(['Universities', s.orgs, ''])}</div>
      ${groups.map(([title, items]) => `<div class="crm-group"><h3>${esc(title)}</h3><div class="crm-quick">${items.map(qbtn).join('')}</div></div>`).join('')}
    </section>
    <p class="tiny crm-hint">Click a number to list those universities below.</p>
    <section class="panel crm-filters">
      <div class="crm-frow"><b>General</b>
        <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
        <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
        <label><span>Priority</span>${sel('priority', [...UPRIORITY, ['__none', 'None (networks)']], 'Any')}</label>
        <label><span>List</span>${sel('list', UNI_LISTS, 'All lists')}</label></div>
      <div class="crm-frow"><b>Search</b>
        <label><span>University, centre or contact</span><input data-filter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Search by name"></label>
        <label><span>Email address</span><input data-filter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email === "__none" ? "" : f.email)}" placeholder="Search by email"></label></div>
      <div class="crm-frow"><b>Emails</b>
        <label><span>Email</span>${sel('emailStatus', EMAIL, 'All emails')}</label>
        <label><span>Reply</span>${sel('reply', replyItems, 'All')}</label>
        <button class="button secondary small" data-action="clear-filters">Clear filters</button></div>
    </section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Outreach workspace</span><p class="tiny crm-legend"><i class="o"></i> Email reply received</p></div><span class="tiny"><b>${list.length}</b> universities${list.length > PAGE ? ` · showing ${S.page * PAGE + 1}–${S.page * PAGE + slice.length}` : ''}</span></div>
    ${active.length ? `<div class="crm-active" role="status"><span>Showing only:</span>${active.map(([k, v]) => `<button type="button" data-unfilter="${esc(k)}" title="Remove this filter">${esc(FILTER_LABELS[k])}: ${esc(v === '__none' ? 'None' : v === '@' ? 'Any' : filterValueLabel(v))} <b aria-hidden="true">✕</b></button>`).join('')}${active.length > 1 ? '<button type="button" class="link" data-action="clear-filters">Clear all</button>' : ''}</div>` : ''}
    <div class="tablewrap crm-table crm-utable"><table><thead><tr>${UNI_HEADS.map(([h, tip]) => `<th${tip ? ` title="${esc(tip)}"` : ''}>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.join('') || `<tr><td colspan="${UNI_HEADS.length}">${S.orgs.length ? 'No universities match these filters.' : 'No universities yet. Add your first one.'}</td></tr>`}</tbody></table></div>
    ${pages > 1 ? `<div class="crm-pager"><button class="button secondary small" data-page="${S.page - 1}" ${S.page ? '' : 'disabled'}>← Previous</button><span class="tiny">Page ${S.page + 1} of ${pages}</span><button class="button secondary small" data-page="${S.page + 1}" ${S.page < pages - 1 ? '' : 'disabled'}>Next →</button></div>` : ''}</section>`;
}

// ---------- Conversations (one row per organisation that replied) ----------
const CONV_STATUS = [['waiting', 'Waiting for my reply'], ['theirs', 'They wrote last'], ['mine', 'I replied last'], ['none', 'No email thread']];
const AUTO_RE = /^(automatic reply|auto(matic)?[ -]?(reply|response)|out of (the )?office|r[ée]ponse automatique|respuesta autom[áa]tica|resposta autom[áa]tica|abwesenheit)/i;
// Strong allies: organisations that asked for a meeting, a call, a partnership or a collaboration with us.
// 'strong' is set by hand (or confirmed from a suggestion); a reply matching ALLY_RE is only a suggestion until reviewed.
const ALLY = [['visited', 'Visited · relationship built'], ['strong', 'Strong allies'], ['suggested', 'Possible allies']];
const ALLY_RE = new RegExp([
  String.raw`\b(schedule|arrange|set up|have|available for|open to|happy to|like to|love to|welcome|request|propose|book)\b.{0,40}\b(meeting|call|chat|conversation)\b`,
  String.raw`\b(virtual|online|zoom|video|brief|short|quick|introductory) (meeting|call)\b`,
  String.raw`\b(reuni[oó]n|videollamada|llamada|reuni[aã]o|chamada|r[ée]union|visioconf[ée]rence)\b`,
  String.raw`\bpartner(ship)? with (you|ethical bridge|your)\b`, String.raw`deeper partnership`, String.raw`strategic partners?\b(?!hips)`,
  String.raw`\bexplor(e|ing) .{0,30}(collaboration|partnership|synerg|working together|cooperation)`,
  String.raw`\bopen to (any )?(future |further )?(collaboration|partnership|cooperation)`, String.raw`\bcollaborate (with you|with ethical bridge|in the future)`,
  String.raw`synerg`, String.raw`\bwork(ing)? together\b`, String.raw`trabajar juntos`, String.raw`trabalhar juntos`,
  String.raw`alianza con`, String.raw`colaborar con ustedes`, String.raw`parceria com`, String.raw`partenariat avec`, String.raw`collaborer avec vous`,
].join('|'), 'i');
const REVIEWED_UNTIL = '2026-11-06T10:00:00Z';
function allyHint(msgs) {
  for (const m of msgs) {
    const t = String(m.body || '').replace(/\s+/g, ' '), x = ALLY_RE.exec(t);
    if (x) { const a = Math.max(0, x.index - 70), b = Math.min(t.length, x.index + x[0].length + 70); return (a ? '…' : '') + t.slice(a, b).trim() + (b < t.length ? '…' : ''); }
  }
  return '';
}
// Organisations taken out of the public directory at their own request stay in the CRM so their history isn't lost.
const removedBadge = o => o && o.removed ? `<span class="crm-removed" title="${esc(o.removedReason || '')}">Removed from directory at their request · ${esc(o.removed)}</span>` : '';
const snip = (t, n = 260) => { const x = String(t || '').replace(/\s+/g, ' ').trim(); return x.length > n ? x.slice(0, n).replace(/\s\S*$/, '') + '…' : x; };
function conversations() {
  const by = new Map();
  for (const m of S.msgs || []) { if (!by.has(m.org_id)) by.set(m.org_id, []); by.get(m.org_id).push(m); }
  // Organisations you marked as allies always appear, even before any email is saved.
  // Automatic replies and bounce backs aren't conversations: they stay out unless the organisation was visited or marked as an ally.
  // Organisations already using one of our initiatives (conversion) always appear too.
  const met = r => !isUni() && r.interview_status === 'Interviewed'; // for universities this mark means "contacted", not met in person
  const keep = id => { const r = S.outreach.get(id); return !r || !['Automatic reply', 'Bounce back'].includes(r.reply_status) || met(r) || ['visited', 'strong', 'possible'].includes(r.ally) || (r.conversions || []).length; };
  const ids = new Set([...[...by.keys()].filter(keep), ...[...S.outreach.values()].filter(r => r.reply_status === 'Replied' || met(r) || ['visited', 'strong', 'possible'].includes(r.ally) || (r.conversions || []).length).map(r => r.org_id)]);
  const out = [];
  for (const id of ids) {
    const o = S.orgById.get(id); if (!o) continue;
    const all = (by.get(id) || []).slice().sort((a, b) => a.sent_at.localeCompare(b.sent_at));
    const ins = all.filter(m => m.direction === 'in'), real = ins.filter(m => !AUTO_RE.test(m.subject || ''));
    const first = real[0] || ins[0] || null;
    const mine = first ? all.find(m => m.direction === 'out' && m.sent_at > first.sent_at) || null : null;
    const back = mine ? ins.find(m => m.sent_at > mine.sent_at) || null : null;
    const last = all[all.length - 1] || null;
    const flagged = ins.some(m => m.flagged);
    const status = flagged ? 'waiting' : !last ? 'none' : last.direction === 'in' ? 'theirs' : 'mine';
    // Every reply up to 6 Nov 2026 was reviewed by hand (ally + reasons), so the keyword guess only looks at newer replies.
    const mark = S.outreach.get(id)?.ally || '', hint = allyHint(real.filter(m => m.sent_at > REVIEWED_UNTIL));
    // Visited · relationship built: organisations met in person (marked, or recorded as interviewed).
    const visited = mark === 'visited' || (!isUni() && S.outreach.get(id)?.interview_status === 'Interviewed' && mark !== 'no');
    const ally = visited ? 'visited' : mark === 'strong' ? 'strong' : mark === 'possible' || (!mark && hint) ? 'suggested' : '';
    const conv = S.outreach.get(id)?.conversions || [];
    out.push({ o, id, all, first, mine, back, last, flagged, status, ally, mark, hint, conv, nIn: ins.length, nOut: all.length - ins.length });
  }
  return out;
}
function filteredConversations(list) {
  const f = S.cf, n = norm(f.name), e = norm(f.email);
  return list.filter(c => inContinent(c.o) && (!f.region || c.o.region === f.region) && (!f.country || c.o.country === f.country)
    && (!n || norm(c.o.name).includes(n) || norm(c.o.registered).includes(n))
    && (!e || norm(c.o.email).includes(e) || c.all.some(m => norm(m.from_addr).includes(e)))
    && (!f.status || c.status === f.status) && (!f.ally || c.ally === f.ally)
    && (!f.conv || (f.conv === 'any' ? c.conv.length > 0 : c.conv.includes(f.conv)))
    && (!f.src || (f.src === 'email') === (outreachOf(c.id).reply_status === 'Replied')))
    .sort((a, b) => byCountry(a.o, b.o));
}
// Conversion: the stage of the marketing funnel where an organisation starts using one of our initiatives.
const CONVERSIONS = [['handova', 'Handova', 'Registered on Handova (skills volunteering) or posted a need there'], ['fundova', 'Fundova', 'Using Fundova to find funding opportunities'], ['jobs', 'Jobs portal', 'Posting or using the Jobs & Opportunities portal']];
const convLabel = k => CONVERSIONS.find(x => x[0] === k)?.[1] || k;
const CONV_TIP = 'Conversion: the organisation has started using one of our initiatives (Handova, Fundova or the Jobs & Opportunities portal). It is the step after awareness and engagement in the marketing funnel.';
function convCell(c) {
  const r = S.outreach.get(c.id) || {};
  if (!c.conv.length) return `<span class="muted">—</span><br><button type="button" class="link tiny" data-action="rel-edit" data-id="${esc(c.id)}">Add</button>`;
  return `<div class="crm-whys">${c.conv.map(k => `<span class="crm-conv-chip" title="${esc(CONVERSIONS.find(x => x[0] === k)?.[2] || '')}">✓ ${esc(convLabel(k))}</span>`).join('')}</div>${r.conversion_note ? `<p class="tiny crm-ally-short">${esc(r.conversion_note)}</p>` : ''}<button type="button" class="link tiny" data-action="rel-edit" data-id="${esc(c.id)}">Edit</button>`;
}
const CONV_HEADS = [
  ['Country', 'Where the organisation’s main office is.'],
  ['Organisation', 'Name in the Ethical Bridge directory and its public email. Click the name to open the whole email thread.'],
  ['Ally &amp; why', 'Engagement: how close the relationship is (visited, strong ally, possible ally) and why: what they mentioned, such as a call, Handova, the jobs portal or a partnership. Use “Edit why” to change it.'],
  ['Conversion', CONV_TIP],
  ['First reply', 'Their first reply to our outreach email: the date (in bold), who wrote it and the start of what they said.'],
  ['My response', 'Your first answer to them, after their reply.'],
  ['Status', 'Who wrote last, and the date of the last email. 📌 Waiting for my reply = the email is pinned (flagged) in your mailbox.'],
  ['Thread', 'Open every email exchanged with this organisation, in order.']];
// 'Ally & why' column: the ally type plus the reasons and note saved with "Ally type & why".
const allyLabel = c => c.ally === 'visited' ? 'Visited' : c.ally === 'strong' ? 'Strong ally' : c.ally === 'suggested' ? (c.mark === 'possible' ? 'Possible ally' : 'Possible ally?') : '';
const allyWhyText = c => { const r = S.outreach.get(c.id) || {}; return [(r.ally_reasons || []).map(reasonLabel).join(', '), r.ally_note || (c.ally === 'suggested' && c.mark !== 'possible' ? c.hint : '')].filter(Boolean).join(' — '); };
function allyCell(c) {
  if (!c.ally) return '<span class="muted">—</span>';
  const r = S.outreach.get(c.id) || {};
  const badge = c.ally === 'visited' ? '<span class="crm-ally visited">📍 Visited · relationship built</span>' : c.ally === 'strong' ? '<span class="crm-ally">🤝 Strong ally</span>' : `<span class="crm-ally maybe">${c.mark === 'possible' ? 'Possible ally' : 'Possible ally?'}</span>`;
  const chips = (r.ally_reasons || []).length ? `<div class="crm-whys">${reasonChips(r.ally_reasons)}</div>` : '';
  const why = r.ally_note ? `<p class="tiny crm-ally-short">${esc(r.ally_note)}</p>` : c.ally === 'suggested' && c.mark !== 'possible' && c.hint ? `<p class="tiny crm-ally-short">Suggested from their email: “${esc(c.hint)}”</p>` : '';
  return `${badge}${chips}${why}<button type="button" class="link tiny" data-action="rel-edit" data-id="${esc(c.id)}">Edit why</button>`;
}
function renderConversations() {
  if (S.msgs === null) return `<p class="muted crm-loading">Loading conversations…</p>`;
  const allConv = conversations();
  const base = allConv.filter(c => inContinent(c.o));
  const count = k => base.filter(c => c.status === k).length;
  const regions = [...new Set(base.map(c => c.o.region).filter(Boolean))].sort();
  const countries = [...new Set(base.filter(c => !S.cf.region || c.o.region === S.cf.region).map(c => c.o.country).filter(Boolean))].sort();
  const list = filteredConversations(allConv);
  const f = S.cf;
  const sel = (key, items, all) => `<select data-cfilter="${key}" class="${f[key] ? 'crm-on' : ''}">${opts(items, f[key], all)}</select>`;
  const qb = (label, v, key, tone = '') => `<button type="button" data-cquick="${key}" class="${(f.status || '') === key && !f.ally && !f.region && !f.country && !f.name && !f.email ? 'active' : ''} ${tone}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const ab = (label, v, key, tone = '') => `<button type="button" data-cally="${key}" class="${f.ally === key && !f.status && !f.region && !f.country && !f.name && !f.email ? 'active' : ''} ${tone}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const allyCount = k => base.filter(c => c.ally === k).length;
  const cb = (label, v, key, tip) => `<button type="button" data-cconv="${key}" title="${esc(tip)}" class="${f.conv === key && !f.status && !f.ally && !f.region && !f.country && !f.name && !f.email ? 'active' : ''}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const convCount = k => base.filter(c => k === 'any' ? c.conv.length : c.conv.includes(k)).length;
  // 'Organisations that replied' counts the same reply mark as the Outreach 'Replies' box, so the two always match.
  const replied = base.filter(c => outreachOf(c.id).reply_status === 'Replied').length;
  const sb = (label, v, key) => `<button type="button" data-csrc="${key}" class="${f.src === key && !f.status && !f.ally && !f.region && !f.country && !f.name && !f.email ? 'active' : ''}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const msgCell = (m, who) => m ? `<div class="crm-msg"><b>${esc(fmtDate(m.sent_at))}</b>${who ? `<span class="tiny">From ${esc(who)}</span>` : ''}<p>${esc(snip(m.body) || '(no text)')}</p></div>` : '<span class="muted">—</span>';
  const rows = list.map(c => {
    const st = CONV_STATUS.find(x => x[0] === c.status)[1];
    const fromName = c.first ? (c.first.from_name || c.first.from_addr) : '';
    return `<tr class="${c.status === 'waiting' ? 'waiting' : ''}">
      <td>${esc(c.o.country)}</td>
      <td class="crm-org"><button class="link" data-action="thread" data-id="${esc(c.id)}">${esc(c.o.name)}</button>${removedBadge(c.o)}<span class="tiny">${esc(c.o.email || c.first?.from_addr || '')}</span></td>
      <td class="crm-allycell">${allyCell(c)}</td>
      <td class="crm-convcell">${convCell(c)}</td>
      <td class="crm-text">${msgCell(c.first, fromName)}</td>
      <td class="crm-text">${c.mine ? msgCell(c.mine) : c.first ? '<span class="pill warn">Not answered yet</span>' : '<span class="muted">—</span>'}</td>
      <td class="crm-statuscell">${c.status === 'waiting' ? '<span class="crm-pin" aria-hidden="true">📌</span> ' : ''}<b class="crm-st-${c.status}">${esc(c.status === 'none' ? (outreachOf(c.id).reply_status === 'Replied' ? 'Replied, email not saved in the CRM' : 'Met in person, no email reply') : st)}</b>${c.last ? `<br><span class="tiny">Last email ${esc(fmtDate(c.last.sent_at))}</span>` : ''}</td>
      <td class="crm-threadcell"><button class="button secondary small" data-action="thread" data-id="${esc(c.id)}">Open (${c.all.length})</button></td></tr>`;
  });
  const active = Object.entries(f).filter(([, v]) => v);
  const LBL = { region: 'Region', country: 'Country', name: 'Name', email: 'Email', status: 'Status', ally: 'Allies', src: 'Contact', conv: 'Conversion' };
  return `<section class="rowhead section-head"><h2>Conversations</h2><div class="actions"><button class="button secondary" data-action="reload-msgs">Refresh</button><button class="button" data-action="export-conv">Export</button></div></section>
    ${S.msgsError ? `<div class="notice warn" role="alert">${esc(S.msgsError)}</div>` : ''}
    <section class="crm-groups crm-conv-groups">
      <div class="crm-group crm-group-all crm-quick crm-conv-src">${sb('Organisations that replied', replied, 'email')}${sb('Met in person, no email reply', base.length - replied, 'inperson')}</div>
      <div class="crm-group"><h3>Status</h3><div class="crm-quick">${qb('Waiting for my reply', count('waiting'), 'waiting', 'crm-q-wait')}${qb('They wrote last', count('theirs'), 'theirs')}${qb('I replied last', count('mine'), 'mine')}</div></div>
      <div class="crm-group crm-q-conv"><h3 title="${esc(CONV_TIP)}">Conversion <span class="crm-info" aria-hidden="true">ⓘ</span></h3><div class="crm-quick">${cb('Using any initiative', convCount('any'), 'any', CONV_TIP)}${CONVERSIONS.map(([k, l, tip]) => cb(l, convCount(k), k, tip)).join('')}</div></div>
      <div class="crm-group"><h3>Allies</h3><div class="crm-quick">${ab('📍 Visited · relationship built', allyCount('visited'), 'visited', 'crm-q-visited')}${ab('🤝 Strong allies', allyCount('strong'), 'strong', 'crm-q-ally')}${ab('Possible allies', allyCount('suggested'), 'suggested')}</div></div>
    </section>
    <p class="tiny crm-hint">“Organisations that replied” uses the same reply mark as the Replies box in Outreach, so the two numbers match. “Met in person, no email reply” are organisations you visited that haven’t written back by email. 📌 “Waiting for my reply” are the emails you pinned (flagged) in your mailbox. 📍 “Visited · relationship built” are organisations you met in person (interviewed on a field mission). 🤝 “Strong allies” asked for a meeting, a call, a partnership or a collaboration; “Possible allies” are ones you marked by hand, plus replies that mention a meeting or collaboration, to confirm or dismiss in the thread. ✓ “Conversion” are organisations that have started using one of our initiatives (Handova, Fundova or the Jobs & Opportunities portal): the step after engagement in the marketing funnel. Hover over a column title or box for what it means. Click a number to list those organisations.</p>
    <section class="panel crm-filters">
      <div class="crm-frow"><b>General</b>
        <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
        <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
        <label><span>Organisation name</span><input data-cfilter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Search by name"></label>
        <label><span>Email address</span><input data-cfilter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email)}" placeholder="Search by email"></label>
        <label><span>Status</span>${sel('status', CONV_STATUS, 'All statuses')}</label>
        <label><span>Allies</span>${sel('ally', ALLY, 'All organisations')}</label>
        <button class="button secondary small" data-action="clear-cfilters">Clear filters</button></div>
    </section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Email conversations</span><p class="tiny crm-legend"><i class="r"></i> Waiting for your reply (pinned in your mailbox) · sorted by country A–Z</p></div><span class="tiny"><b>${list.length}</b> organisations</span></div>
    ${active.length ? `<div class="crm-active" role="status"><span>Showing only:</span>${active.map(([k, v]) => `<button type="button" data-cunfilter="${esc(k)}" title="Remove this filter">${esc(LBL[k])}: ${esc(k === 'src' ? (v === 'email' ? 'Replied by email' : 'Met in person only') : k === 'status' ? CONV_STATUS.find(x => x[0] === v)?.[1] : k === 'ally' ? ALLY.find(x => x[0] === v)?.[1] : k === 'conv' ? (v === 'any' ? 'Using any initiative' : convLabel(v)) : v)} <b aria-hidden="true">✕</b></button>`).join('')}</div>` : ''}
    <div class="tablewrap crm-table crm-conv"><table><thead><tr>${CONV_HEADS.map(([h, tip]) => `<th title="${esc(tip)}"><span class="crm-th-tip">${h}</span></th>`).join('')}</tr></thead>
    <tbody>${rows.join('') || '<tr><td colspan="8">No conversations match these filters.</td></tr>'}</tbody></table></div>
    <p class="tiny">Emails are copied from the hello@ethicalbridge.org mailbox (the continent “Replied” folders, the Inbox and your Sent folder). Quoted earlier messages and signatures below “On … wrote:” are trimmed.</p></section>`;
}
function threadModal(id) {
  const c = conversations().find(x => x.id === id); if (!c) return '';
  const msgs = c.all.map(m => `<article class="crm-mail ${m.direction}${m.flagged ? ' flagged' : ''}">
      <header><b>${m.direction === 'in' ? esc(m.from_name || m.from_addr) : 'You (Ethical Bridge)'}</b><span class="tiny">${esc(new Date(m.sent_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }))}${m.flagged ? ' · 📌 pinned' : ''}</span></header>
      <p class="tiny">${m.direction === 'in' ? esc(m.from_addr) : 'To ' + esc(m.to_addrs)}${m.subject ? ' · <b>' + esc(m.subject) + '</b>' : ''}</p>
      <div class="crm-mail-body">${esc(m.body || '(no text)')}</div></article>`).join('');
  const o = c.o;
  return modal(o.name, `<p class="tiny">${esc([o.country, o.region, o.continent].filter(Boolean).join(' · '))}${o.email ? ' · ' + esc(o.email) : ''} · ${c.nIn} from them, ${c.nOut} from you</p>
    <div class="actions">${c.nIn ? (c.flagged ? `<button class="button" data-action="unpin" data-id="${esc(id)}">Mark as answered (remove pin)</button>` : `<button class="button secondary" data-action="pin" data-id="${esc(id)}">📌 Mark as waiting for my reply</button>`) : ''}${c.ally === 'visited' ? `<button class="button secondary" data-action="ally" data-ally="strong" data-id="${esc(id)}">Remove visited (keep as strong ally)</button>` : `<button class="button secondary" data-action="ally" data-ally="visited" data-id="${esc(id)}">📍 Mark as visited</button>`}${c.ally === 'visited' ? '' : c.ally === 'strong' ? `<button class="button secondary" data-action="ally" data-ally="" data-id="${esc(id)}">Remove strong ally</button>` : `<button class="button secondary" data-action="ally" data-ally="strong" data-id="${esc(id)}">🤝 Mark as strong ally</button>`}${!['strong', 'visited'].includes(c.ally) && c.mark !== 'possible' ? `<button class="button secondary" data-action="ally" data-ally="possible" data-id="${esc(id)}">Possible ally</button>` : ''}${c.ally === 'suggested' ? `<button class="button secondary" data-action="ally" data-ally="no" data-id="${esc(id)}">Not an ally</button>` : ''}<button class="button secondary" data-action="rel-edit" data-id="${esc(id)}">Ally type &amp; why</button><button class="button secondary" data-action="org" data-id="${esc(id)}">Outreach marks</button></div>
    ${(() => { const r = S.outreach.get(id) || {}; return (r.ally_reasons || []).length || r.ally_note ? `<div class="crm-ally-note"><b>Why:</b> <span class="crm-whys">${reasonChips(r.ally_reasons)}</span>${r.ally_note ? `<p>${esc(r.ally_note)}</p>` : ''}</div>` : ''; })()}
    ${c.o.removed ? `<p class="crm-removed-note"><b>Removed from the directory at their request (${esc(c.o.removed)}).</b> ${esc(c.o.removedReason || '')}</p>` : ''}
    ${c.ally === 'suggested' ? (c.mark === 'possible' ? `<p class="crm-ally-why"><b>Marked as a possible ally by hand.</b></p>` : `<p class="crm-ally-why"><b>Why it's suggested:</b> “${esc(c.hint)}”</p>`) : ''}
    <p class="tiny">Pins changed here stay in the CRM; they don't change the pin in your mailbox.</p>
    <div class="crm-thread">${msgs || '<p class="muted">No emails saved for this organisation yet. It is listed because its reply is marked “Replied”.</p>'}</div>`);
}
function exportConversations() {
  const list = filteredConversations(conversations());
  downloadCsv(`ethical-bridge-conversations-${S.continent === 'All' ? 'all' : norm(S.continent).replace(/\W+/g, '-')}-${today()}.csv`,
    ['continent', 'region', 'country', 'organisation', 'email', 'they_replied', 'what_they_said', 'my_response_date', 'my_response', 'they_replied_back', 'status', 'ally', 'why', 'conversion', 'last_email', 'messages'],
    list.map(c => [c.o.continent, c.o.region, c.o.country, c.o.name, c.o.email || c.first?.from_addr || '', c.first?.sent_at.slice(0, 10) || '', c.first?.body || '', c.mine?.sent_at.slice(0, 10) || '', c.mine?.body || '', c.back ? 'Yes ' + c.back.sent_at.slice(0, 10) : c.mine ? 'Not yet' : '', CONV_STATUS.find(x => x[0] === c.status)[1], allyLabel(c), allyWhyText(c), c.conv.map(convLabel).join('; '), c.last?.sent_at.slice(0, 10) || '', c.all.length]));
}
async function setAlly(id, ally) {
  await saveOutreach(id, { ally });
  S.modal = threadModal(id); render();
}
async function setPin(id, flagged) {
  try { await api('message.flag', { org_id: id, flagged }); } catch (e) { return flash('Could not save: ' + e.message); }
  for (const m of S.msgs || []) if (m.org_id === id && m.direction === 'in') m.flagged = flagged;
  S.modal = threadModal(id); render();
}

// ---------- Newsletter (Brevo list, kept up to date by the Brevo webhook) ----------
const FREE_MAIL = /^(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|icloud|me|mac|aol|proton|protonmail|pm|gmx|mail|yandex|zoho|qq|163|126|rocketmail|web|t-online|orange|free|laposte|libero|virgilio|wanadoo|btinternet|comcast|hey|fastmail)\./i;
const mailDomain = e => String(e || '').toLowerCase().split('@')[1] || '';
const webDomain = u => String(u || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
const baseDomain = d => d.split('.').slice(-3).join('.').replace(/^(www|mail|info|contact)\./, '');
let nlIndex = null;
function newsletterIndex() {
  if (nlIndex && nlIndex.orgs === S.orgs && nlIndex.msgs === S.msgs) return nlIndex;
  const byEmail = new Map(), byDomain = new Map(), byName = new Map(), byMsg = new Map();
  for (const o of S.orgs) {
    for (const e of String(o.email || '').toLowerCase().split(/[\s;,|]+/).filter(x => x.includes('@'))) {
      byEmail.set(e, o); const d = mailDomain(e); if (d && !FREE_MAIL.test(d)) byDomain.set(baseDomain(d), o);
    }
    const w = webDomain(o.website); if (w && !/facebook|instagram|linkedin|linktr|wix|wordpress|blogspot|google/.test(w)) byDomain.set(baseDomain(w), byDomain.get(baseDomain(w)) || o);
    const n = norm(o.name).replace(/[^a-z0-9]+/g, ' ').trim(); if (n.length >= 6) byName.set(n, o);
  }
  for (const m of S.msgs || []) if (m.direction === 'in' && m.from_addr) { const o = S.orgById.get(m.org_id); if (o) byMsg.set(m.from_addr.toLowerCase(), o); }
  nlIndex = { orgs: S.orgs, msgs: S.msgs, byEmail, byDomain, byName, byMsg };
  return nlIndex;
}
function matchSubscriber(s) {
  if (s.org_id === '') return { org: null, how: 'Marked as not an organisation' };
  if (s.org_id) { const o = S.orgById.get(s.org_id); if (o) return { org: o, how: 'Linked by hand' }; }
  const ix = newsletterIndex(), e = String(s.email || '').toLowerCase(), d = mailDomain(e);
  if (ix.byEmail.has(e)) return { org: ix.byEmail.get(e), how: 'Same email as the profile' };
  if (ix.byMsg.has(e)) return { org: ix.byMsg.get(e), how: 'Same email as their reply' };
  if (d && !FREE_MAIL.test(d) && ix.byDomain.has(baseDomain(d))) return { org: ix.byDomain.get(baseDomain(d)), how: 'Same web domain' };
  const a = s.attributes || {};
  const orgField = Object.entries(a).find(([k]) => /org|company|empresa|entreprise|organi|ngo|ong/i.test(k))?.[1];
  for (const cand of [orgField, `${s.first_name} ${s.last_name}`, s.first_name, s.last_name]) {
    const n = norm(cand).replace(/[^a-z0-9]+/g, ' ').trim();
    if (n.length >= 6 && ix.byName.has(n)) return { org: ix.byName.get(n), how: 'Same name as the organisation' };
  }
  return { org: null, how: '' };
}
const NL_KIND = { same: 'Same email as in Ethical Bridge', other: 'Organisation found, different email', none: 'No match in Ethical Bridge' };
const nlKind = r => !r.org ? 'none' : r.how === 'Same email as the profile' ? 'same' : 'other';
function newsletterRows() { return (S.subs || []).map(sub => { const m = matchSubscriber(sub); return { sub, ...m, kind: nlKind(m) }; }); }
function filteredNewsletter() {
  const f = S.nf, n = norm(f.name), e = norm(f.email);
  return newsletterRows().filter(r => {
    if (f.status === 'Subscribed' && !r.sub.subscribed) return false;
    if (f.status === 'Unsubscribed' && r.sub.subscribed) return false;
    if (f.match && r.kind !== f.match) return false;
    if (f.continent && r.org?.continent !== f.continent) return false;
    if (f.region && r.org?.region !== f.region) return false;
    if (f.country && r.org?.country !== f.country) return false;
    if (n && !norm(r.org?.name).includes(n) && !norm(`${r.sub.first_name} ${r.sub.last_name}`).includes(n)) return false;
    if (e && !norm(r.sub.email).includes(e)) return false;
    if (S.nfReplied && !(r.org && outreachOf(r.org.id).reply_status === 'Replied')) return false;
    return true;
  }).sort((a, b) => ('same other none'.indexOf(a.kind) - 'same other none'.indexOf(b.kind)) || (a.org && b.org ? byCountry(a.org, b.org) : a.sub.email.localeCompare(b.sub.email)));
}
function renderSubscribers() {
  if (S.subs === null) return `<p class="muted crm-loading">Loading the newsletter list…</p>`;
  const rows = newsletterRows(), active = rows.filter(r => r.sub.subscribed);
  const matched = active.filter(r => r.org), count = k => active.filter(r => r.kind === k).length;
  const gone = rows.filter(r => !r.sub.subscribed).length;
  const replied = new Set(matched.filter(r => outreachOf(r.org.id).reply_status === 'Replied').map(r => r.org.id)).size;
  const continents = [...new Set(matched.map(r => r.org.continent).filter(Boolean))].sort();
  const inCont = r => !S.nf.continent || r.org.continent === S.nf.continent;
  const regions = [...new Set(matched.filter(inCont).map(r => r.org.region).filter(Boolean))].sort();
  const countries = [...new Set(matched.filter(r => inCont(r) && (!S.nf.region || r.org.region === S.nf.region)).map(r => r.org.country).filter(Boolean))].sort();
  const list = filteredNewsletter(), f = S.nf;
  const sel = (key, items, all) => `<select data-nfilter="${key}" class="${f[key] && !(key === 'status' && f[key] === 'Subscribed') ? 'crm-on' : ''}">${opts(items, f[key], all)}</select>`;
  const qb = (label, v, q, tone = '') => `<button type="button" data-nquick="${q}" class="${tone}${(q === 'all' ? !f.match && !S.nfReplied && f.status === 'Subscribed' : q === 'replied' ? S.nfReplied : q === 'gone' ? f.status === 'Unsubscribed' : f.match === q && !S.nfReplied) ? ' active' : ''}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const fmt = d => d ? fmtDate(d) : '—';
  const trs = list.map(r => {
    const s = r.sub, o = r.org, out = o ? outreachOf(o.id) : null;
    return `<tr class="nl-${r.kind}${s.subscribed ? '' : ' gone'}"><td>${o ? esc(o.country) : '<span class="muted">—</span>'}</td>
      <td class="crm-org">${o ? `<button class="link" data-action="org" data-id="${esc(o.id)}">${esc(o.name)}</button><span class="tiny">${esc(o.continent)}</span>` : (s.org_id === '' ? '<span class="pill dim">Team or individual</span>' : '<span class="pill dim">No organisation matched</span>')}</td>
      <td>${esc(s.email)}<span class="tiny nl-name">${esc([s.first_name, s.last_name].filter(Boolean).join(' '))}</span></td>
      <td>${s.subscribed ? esc(fmt(s.subscribed_at)) : `<span class="pill bad">Unsubscribed</span><br><span class="tiny">${esc(fmt(s.unsubscribed_at))}</span>`}</td>
      <td class="tiny"><span class="nl-dot nl-${r.kind}"></span>${esc(NL_KIND[r.kind])}${r.how && r.kind === 'other' ? `<br><span class="muted">${esc(r.how)}</span>` : ''}</td>
      <td>${out ? `${out.reply_status === 'Replied' ? '<span class="pill">Replied</span>' : esc(out.reply_status === 'None' ? (out.email_status === 'Sent' ? 'Emailed' : 'Not emailed') : out.reply_status)}` : '<span class="muted">—</span>'}</td>
      <td class="tiny">${esc(readLabel(s))}</td>
      <td><button class="button secondary small" data-action="nl-pick" data-id="${esc(s.id)}">${o ? 'Change' : 'Link'}</button></td></tr>`;
  });
  return `<section class="rowhead section-head"><h2>Subscribers</h2><div class="actions"><button class="button secondary" data-action="reload-nl">Refresh</button><label class="button secondary nl-upload">Import Brevo CSV<input type="file" accept=".csv,text/csv" data-action="nl-csv" hidden></label><button class="button" data-action="export-nl">Export</button></div></section>
    ${S.subsError ? `<div class="notice warn" role="alert">${esc(S.subsError)}</div>` : ''}
    <section class="crm-groups crm-conv-groups nl-groups">
      <div class="crm-group crm-group-all crm-quick">${qb('All subscribers', active.length, 'all')}</div>
      <div class="crm-group"><h3>Match with Ethical Bridge</h3><div class="crm-quick nl-quick">${qb(NL_KIND.same, count('same'), 'same', 'nl-same')}${qb(NL_KIND.other, count('other'), 'other', 'nl-other')}${qb(NL_KIND.none, count('none'), 'none', 'nl-none')}</div></div>
      <div class="crm-group"><h3>Engagement</h3><div class="crm-quick">${qb('Organisations that also replied', replied, 'replied')}${qb('Unsubscribed', gone, 'gone')}</div></div>
    </section>
    <p class="tiny crm-hint nl-legend"><span><i class="nl-dot nl-same"></i>Green: the subscriber’s email is the one on the organisation’s Ethical Bridge profile.</span><span><i class="nl-dot nl-other"></i>Amber: we found the organisation through another email (the one they replied from, their web domain, their name, or linked by hand).</span><span><i class="nl-dot nl-none"></i>Red: no organisation in Ethical Bridge yet, including our own team addresses. Use “Link” to match one.</span></p>
    <p class="tiny crm-hint">From the Brevo newsletter list, last brought up to date on 14 November 2026. Brevo is not yet sending new sign-ups here on its own: to add new ones, export the list from Brevo and use “Import Brevo CSV”.</p>
    <section class="panel crm-filters"><div class="crm-frow"><b>General</b>
      <label><span>Continent</span>${sel('continent', continents, 'All continents')}</label>
      <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
      <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
      <label><span>Name</span><input data-nfilter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Organisation or person"></label>
      <label><span>Email address</span><input data-nfilter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email)}" placeholder="Search by email"></label>
      <label><span>Match</span>${sel('match', [['same', 'Same email (green)'], ['other', 'Different email (amber)'], ['none', 'No match (red)']], 'All')}</label>
      <label><span>Status</span>${sel('status', ['Subscribed', 'Unsubscribed'], 'All')}</label>
      <button class="button secondary small" data-action="clear-nfilters">Clear filters</button></div></section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Newsletter subscribers</span></div><span class="tiny"><b>${list.length}</b> subscribers</span></div>
    <div class="tablewrap crm-table crm-conv"><table><thead><tr>${['Country', 'Organisation', 'Subscriber', 'Subscribed', 'How matched', 'Outreach', 'Newsletters opened', ''].map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${trs.join('') || '<tr><td colspan="8">No subscribers match these filters.</td></tr>'}</tbody></table></div></section>`;
}
// ---------- Newsletter tab: Subscribers · Newsletters sent · Growth timeline ----------
// Newsletters sent live in ebcrm_campaigns. Per-person events (delivered, opened, clicked, bounced, spam,
// unsubscribed) arrive from Brevo through the ebcrm-brevo-webhook Edge Function into ebcrm_campaign_events.
const NL_VIEWS = [['Subscribers', 'Subscribers'], ['Sent', 'Newsletters sent'], ['Timeline', 'Growth timeline']];
function renderNewsletter() {
  const tabs = `<nav class="nl-tabs" aria-label="Newsletter views">${NL_VIEWS.map(([k, l]) => `<button type="button" data-nlview="${k}" class="${S.nlView === k ? 'active' : ''}"${S.nlView === k ? ' aria-current="page"' : ''}>${esc(l)}</button>`).join('')}</nav>`;
  const body = S.nlView === 'Sent' ? renderSent() : S.nlView === 'Timeline' ? renderTimeline() : renderSubscribers();
  return tabs + body;
}
const pad2 = n => String(n).padStart(2, '0');
const ymd = x => `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
const dayKey = d => { if (!d) return ''; const s = String(d); if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s; const x = new Date(s); return isNaN(x) ? '' : ymd(x); };
const weekOf = k => { const x = new Date(k + 'T00:00:00'); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return ymd(x); }; // Monday
const addDays = (k, n) => { const x = new Date(k + 'T00:00:00'); x.setDate(x.getDate() + n); return ymd(x); };
const fmtDT = d => { if (!d) return '—'; const x = new Date(d); return isNaN(x) ? String(d) : x.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); };
const fmtShort = k => new Date(k + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const num = n => Number(n || 0).toLocaleString('en-GB');
const sentCamps = () => (S.camps || []).filter(c => c.sent_at).sort((a, b) => a.sent_at.localeCompare(b.sent_at));
// Was this subscriber on the list when the newsletter went out?
function onListAt(sub, c) {
  if (!c.sent_at) return false;
  const t = c.sent_at;
  if (sub.subscribed_at && new Date(sub.subscribed_at) > new Date(t)) return false;
  if (sub.unsubscribed_at && new Date(sub.unsubscribed_at) <= new Date(t)) return false;
  return sub.subscribed || !!sub.unsubscribed_at;
}
let peopleCache = null;
function campPeople(c) {
  if (!peopleCache || peopleCache.ev !== S.cevents) peopleCache = { ev: S.cevents, by: new Map() };
  if (peopleCache.by.has(c.id)) return peopleCache.by.get(c.id);
  const m = new Map();
  const get = e => { if (!m.has(e)) m.set(e, { email: e, delivered: '', opened: '', opens: 0, clicks: [], bounced: '', unsub: '', spam: '' }); return m.get(e); };
  for (const s of S.subs || []) if (onListAt(s, c)) get(String(s.email).toLowerCase());
  for (const e of S.cevents || []) {
    if (e.brevo_id !== c.brevo_id || !c.brevo_id) continue;
    const p = get(e.email), at = e.occurred_at;
    if (e.event === 'delivered') p.delivered ||= at;
    else if (e.event === 'opened') { p.opened ||= at; p.opens++; }
    else if (e.event === 'clicked') { p.opened ||= at; if (e.url && !p.clicks.includes(e.url)) p.clicks.push(e.url); }
    else if (/bounce/.test(e.event)) p.bounced = e.event === 'hard_bounce' ? 'Hard bounce' : e.event === 'soft_bounce' ? 'Soft bounce' : 'Not delivered';
    else if (e.event === 'unsubscribed') p.unsub ||= at;
    else if (e.event === 'spam') p.spam ||= at;
  }
  const out = [...m.values()];
  peopleCache.by.set(c.id, out);
  return out;
}
function campSummary(c) {
  const ppl = campPeople(c), hasEvents = (S.cevents || []).some(e => e.brevo_id === c.brevo_id && c.brevo_id);
  const r = c.report || {};
  const t = { delivered: ppl.filter(p => p.delivered).length, opened: ppl.filter(p => p.opened).length, clicked: ppl.filter(p => p.clicks.length).length, unsubscribed: ppl.filter(p => p.unsub).length, bounced: ppl.filter(p => p.bounced).length };
  // Brevo's report figures win when entered (they include opens from before tracking started).
  const best = k => r[k] != null ? Math.max(r[k], t[k]) : t[k];
  const sent = c.recipients || ppl.length;
  const delivered = r.delivered ?? (t.delivered || null);
  return { sent, base: delivered || sent, hasEvents, tracked: t, report: r, opened: best('opened'), clicked: best('clicked'), unsubscribed: best('unsubscribed'), bounced: best('bounced'), delivered };
}
function readLabel(sub) {
  const cs = sentCamps().filter(c => onListAt(sub, c)); if (!cs.length) return '—';
  const e = String(sub.email).toLowerCase();
  const opened = cs.filter(c => campPeople(c).find(p => p.email === e)?.opened).length;
  return `${opened} of ${cs.length}`;
}
const nlCampLink = url => { try { const u = new URL(url); return (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, ''); } catch { return url; } };

function renderSent() {
  if (S.camps === null) return `<p class="muted crm-loading">Loading the newsletters sent…</p>`;
  const cs = [...(S.camps || [])].sort((a, b) => String(b.sent_at || '9').localeCompare(String(a.sent_at || '9')));
  const anyEvents = (S.cevents || []).length > 0;
  const sum = cs.filter(c => c.sent_at).map(campSummary);
  const rate = (k) => { const s = sum.reduce((a, x) => a + (x.base || 0), 0); return s ? pct(sum.reduce((a, x) => a + (x[k] || 0), 0), s) : '—'; };
  const cards = cs.map(c => {
    const x = campSummary(c), open = S.campOpen === c.id;
    const stat = (label, v, of) => `<div><b>${v == null ? '—' : num(v)}</b><span>${esc(label)}${of && v != null ? ` · ${pct(v, of)}` : ''}</span></div>`;
    return `<article class="panel nl-camp${open ? ' open' : ''}">
      <div class="rowhead"><div><span class="eyebrow">${c.sent_at ? esc(fmtDT(c.sent_at)) : 'Not sent yet'}${c.brevo_id ? ` · Brevo #${esc(c.brevo_id)}` : ''}</span><h3>${esc(c.name)}</h3><p class="muted nl-subject">${esc(c.subject || '')}</p></div>
        <div class="actions"><button class="button secondary small" data-action="camp-edit" data-id="${esc(c.id)}">Edit</button><button class="button small" data-action="camp-toggle" data-id="${esc(c.id)}" aria-expanded="${open}">${open ? 'Hide people' : 'Who opened'}</button></div></div>
      <div class="nl-stats">${stat('Sent to', x.sent)}${stat('Delivered', x.delivered, x.sent)}${stat('Opened', x.opened, x.base)}${stat('Clicked', x.clicked, x.base)}${stat('Unsubscribed', x.unsubscribed, x.base)}${stat('Not delivered', x.bounced, x.sent)}</div>
      <p class="tiny muted">${esc(c.list_name || 'List not recorded')}${x.hasEvents ? ` · Tracked per person: ${x.tracked.opened} opened, ${x.tracked.clicked} clicked` : ' · No per-person events from Brevo yet'}${Object.keys(x.report).length ? ' · Totals include figures copied from Brevo’s report' : ''}</p>
      ${c.notes ? `<p class="tiny">${esc(c.notes)}</p>` : ''}
      ${open ? campDetail(c) : ''}</article>`;
  }).join('');
  return `<section class="rowhead section-head"><h2>Newsletters sent</h2><div class="actions"><button class="button secondary" data-action="reload-nl">Refresh</button><button class="button" data-action="camp-add">Add newsletter</button></div></section>
    ${S.campsError ? `<div class="notice warn" role="alert">${esc(S.campsError)}</div>` : ''}
    <section class="grid four crm-cards">${card('Newsletters sent', sum.length, sum.length ? 'Last: ' + fmtDate(cs.find(c => c.sent_at)?.sent_at) : 'None yet')}${card('Average open rate', rate('opened'), 'Of emails delivered, as Brevo counts it')}${card('Average click rate', rate('clicked'), 'Of emails delivered, clicked at least one link')}${card('Unsubscribed after a newsletter', sum.reduce((a, x) => a + (x.unsubscribed || 0), 0), 'Across all newsletters')}</section>
    ${anyEvents ? '' : `<div class="notice" role="status">Opens and clicks per person appear here as soon as Brevo starts sending them. Until then, use “Edit” to copy the totals from Brevo’s campaign report.</div>`}
    ${cards || '<p class="muted">No newsletters recorded yet. Use “Add newsletter”.</p>'}`;
}
function campDetail(c) {
  const ix = new Map((S.subs || []).map(s => [String(s.email).toLowerCase(), s]));
  const rows = campPeople(c).map(p => { const s = ix.get(p.email); const m = s ? matchSubscriber(s) : { org: null }; return { p, org: m.org }; })
    .sort((a, b) => (!!b.p.clicks.length - !!a.p.clicks.length) || (!!b.p.opened - !!a.p.opened) || (a.org && b.org ? byCountry(a.org, b.org) : a.p.email.localeCompare(b.p.email)));
  const status = p => p.unsub ? '<span class="pill bad">Unsubscribed</span>' : p.spam ? '<span class="pill bad">Marked as spam</span>' : p.bounced ? `<span class="pill warn">${esc(p.bounced)}</span>` : p.clicks.length ? '<span class="pill">Clicked</span>' : p.opened ? '<span class="pill">Opened</span>' : p.delivered ? '<span class="pill dim">Delivered</span>' : '<span class="pill dim">No data yet</span>';
  return `<div class="tablewrap crm-table nl-people"><table><thead><tr><th>Organisation</th><th>Email</th><th>Result</th><th>First opened</th><th>Links clicked</th></tr></thead><tbody>
    ${rows.map(({ p, org }) => `<tr><td>${org ? `<button class="link" data-action="org" data-id="${esc(org.id)}">${esc(org.name)}</button><span class="tiny">${esc(org.country)}</span>` : '<span class="muted">—</span>'}</td><td>${esc(p.email)}</td><td>${status(p)}</td><td class="tiny">${p.opened ? (new Date(p.opened).getTime() === new Date(c.sent_at).getTime() ? 'Yes (from Brevo’s report, time not recorded)' : esc(fmtDT(p.opened))) : '—'}</td><td class="tiny">${p.clicks.map(u => esc(nlCampLink(u))).join('<br>') || '—'}</td></tr>`).join('') || '<tr><td colspan="5">No recipients recorded.</td></tr>'}
  </tbody></table></div><p class="tiny muted">People shown were on the list when it was sent, plus anyone Brevo reported on. Opens can be undercounted: some email apps block tracking, and Apple Mail can count opens that didn’t happen.</p>`;
}
const toLocalInput = d => { if (!d) return ''; const x = new Date(d); return isNaN(x) ? '' : `${ymd(x)}T${pad2(x.getHours())}:${pad2(x.getMinutes())}`; };
function campModal(id) {
  const c = (S.camps || []).find(x => x.id === id) || { name: '', subject: '', sent_at: '', list_name: 'Ethical Bridge Newsletter (#3)', recipients: '', brevo_id: '', report: {}, notes: '' };
  const r = c.report || {};
  return modal(id ? 'Edit newsletter' : 'Add newsletter', `<form class="form" data-form="nlcamp" data-id="${esc(id || '')}">
    ${field('Name', 'name', c.name, 'text', 'required')}${field('Subject line', 'subject', c.subject)}
    ${field('Sent on (your time)', 'sent_at', toLocalInput(c.sent_at), 'datetime-local')}${field('Brevo campaign number (the #)', 'brevo_id', c.brevo_id ?? '', 'number')}
    ${field('List', 'list_name', c.list_name)}${field('Sent to (recipients)', 'recipients', c.recipients ?? '', 'number')}
    <p class="tiny field full"><b>Totals from Brevo’s report</b> (optional). In Brevo, open Marketing → Campaigns → this campaign, and copy the numbers. They’re used when they’re higher than what the CRM tracked itself.</p>
    ${[['delivered', 'Delivered'], ['opened', 'Opened'], ['clicked', 'Clicked'], ['unsubscribed', 'Unsubscribed'], ['bounced', 'Not delivered (sent minus delivered)']].map(([k, l]) => field(l, 'r_' + k, r[k] ?? '', 'number')).join('')}
    ${field('Notes (what it was about)', 'notes', c.notes, 'area')}
    <div class="actions field full"><button class="button" type="submit">Save</button>${id ? `<button class="button danger" type="button" data-action="camp-delete" data-id="${esc(id)}">Delete</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`);
}
async function saveCamp(id, d) {
  const campaign = { name: d.name, subject: d.subject, list_name: d.list_name, notes: d.notes, brevo_id: d.brevo_id, recipients: d.recipients, sent_at: d.sent_at ? new Date(d.sent_at).toISOString() : null,
    report: Object.fromEntries(['delivered', 'opened', 'clicked', 'unsubscribed', 'bounced'].map(k => [k, d['r_' + k]]).filter(([, v]) => v !== '' && v != null)) };
  try { const { row } = await api('campaign.save', { id: id || undefined, campaign }); S.camps = [...(S.camps || []).filter(x => x.id !== row.id), row]; peopleCache = null; S.modal = ''; flash('Newsletter saved.'); }
  catch (e) { flash('Could not save: ' + e.message); }
}

// Growth timeline: outreach, replies, sign-ups, unsubscribes and newsletters, by day and by week.
function timelineData() {
  const days = new Map();
  const d = k => { if (!days.has(k)) days.set(k, { outreach: 0, replies: new Set(), subs: [], unsubs: [], camps: [] }); return days.get(k); };
  for (const [, r] of S.outreach) if (r.date_sent && r.email_status !== 'Not sent') { const k = dayKey(r.date_sent); if (k) d(k).outreach++; }
  for (const m of S.msgs || []) if (m.direction === 'in' && m.sent_at) { const k = dayKey(m.sent_at); if (k) d(k).replies.add(m.org_id); }
  for (const s of S.subs || []) {
    if (s.subscribed_at) { const k = dayKey(s.subscribed_at); if (k) d(k).subs.push(s); }
    if (s.unsubscribed_at) { const k = dayKey(s.unsubscribed_at); if (k) d(k).unsubs.push(s); }
  }
  for (const c of sentCamps()) d(dayKey(c.sent_at)).camps.push(c);
  const keys = [...days.keys()].sort(); if (!keys.length) return { days, weeks: [] };
  const end = weekOf(today() > keys[keys.length - 1] ? today() : keys[keys.length - 1]);
  let start = weekOf(keys[0]);
  if (S.tlRange !== 'all') { const lim = addDays(end, -7 * (Number(S.tlRange) - 1)); if (lim > start) start = lim; }
  const before = (S.subs || []).filter(s => s.subscribed_at && dayKey(s.subscribed_at) < start).length - (S.subs || []).filter(s => s.unsubscribed_at && dayKey(s.unsubscribed_at) < start).length;
  const weeks = []; let total = before;
  for (let w = start; w <= end; w = addDays(w, 7)) {
    const x = { week: w, outreach: 0, replies: 0, subs: 0, unsubs: 0, camps: [] };
    for (let i = 0; i < 7; i++) { const v = days.get(addDays(w, i)); if (!v) continue; x.outreach += v.outreach; x.replies += v.replies.size; x.subs += v.subs.length; x.unsubs += v.unsubs.length; x.camps.push(...v.camps); }
    total += x.subs - x.unsubs; x.total = total; weeks.push(x);
  }
  return { days, weeks, start };
}
function timelineChart(weeks) {
  if (!weeks.length) return '';
  const W = 960, L = 30, R = 46, step = (W - L - R) / weeks.length, bw = Math.max(6, Math.min(70, step - 8));
  // Panel 1 (outreach) and panel 2 (subscribers): each has a title row, headroom for value labels, then bars.
  const P1 = { top: 22, h: 110 }, P2 = { top: 22 + 110 + 58, h: 140 };
  const base1 = P1.top + 18 + P1.h, base2 = P2.top + 18 + P2.h, H = base2 + 52;
  const maxO = Math.max(1, ...weeks.map(w => w.outreach)), maxS = Math.max(1, ...weeks.map(w => w.subs)), maxT = Math.max(1, ...weeks.map(w => w.total));
  const x = i => L + i * step + (step - bw) / 2, cx = i => x(i) + bw / 2;
  const every = Math.ceil(weeks.length / 12);
  const g = [];
  g.push(`<text x="${L}" y="${P1.top - 6}" class="nl-ax-title">Organisations emailed per week</text>`);
  g.push(`<text x="${L}" y="${P2.top - 6}" class="nl-ax-title">New subscribers per week <tspan class="nl-ax-line">— line: total subscribers</tspan></text>`);
  weeks.forEach((w, i) => {
    if (w.camps.length) g.push(`<line x1="${cx(i)}" x2="${cx(i)}" y1="${P1.top}" y2="${base2}" class="nl-camp-line"/>`);
  });
  weeks.forEach((w, i) => {
    const h1 = (w.outreach / maxO) * P1.h, h2 = (w.subs / maxS) * P2.h;
    if (w.outreach) g.push(`<rect x="${x(i)}" y="${base1 - h1}" width="${bw}" height="${h1}" rx="3" class="nl-bar-o"><title>Week of ${fmtShort(w.week)}: ${num(w.outreach)} organisations emailed</title></rect><text x="${cx(i)}" y="${base1 - h1 - 5}" class="nl-val">${num(w.outreach)}</text>`);
    if (w.subs) g.push(`<rect x="${x(i)}" y="${base2 - h2}" width="${bw}" height="${h2}" rx="3" class="nl-bar-s"><title>Week of ${fmtShort(w.week)}: ${w.subs} new subscribers${w.unsubs ? ', ' + w.unsubs + ' unsubscribed' : ''}</title></rect><text x="${cx(i)}" y="${base2 - h2 - 5}" class="nl-val">+${w.subs}</text>`);
    if (i % every === 0) g.push(`<text x="${cx(i)}" y="${base2 + 18}" class="nl-xl">${fmtShort(w.week)}</text>`);
    if (w.camps.length) g.push(`<g class="nl-flag"><title>${esc(w.camps.map(c => c.name).join(', '))}</title><rect x="${cx(i) - 9}" y="${base2 + 26}" width="18" height="13" rx="2"/><path d="M${cx(i) - 9} ${base2 + 26} l9 6.5 l9 -6.5"/></g>`);
  });
  const ty = w => base2 - (w.total / maxT) * P2.h;
  g.push(`<polyline points="${weeks.map((w, i) => `${cx(i)},${ty(w)}`).join(' ')}" class="nl-line"/>`);
  weeks.forEach((w, i) => g.push(`<circle cx="${cx(i)}" cy="${ty(w)}" r="3" class="nl-dotp"><title>Week of ${fmtShort(w.week)}: ${w.total} subscribers in total</title></circle>`));
  const li = weeks.length - 1;
  g.push(`<text x="${cx(li) + 8}" y="${ty(weeks[li]) + 4}" class="nl-line-lab">${weeks[li].total}</text>`);
  g.push(`<line x1="${L}" x2="${W - R}" y1="${base1}" y2="${base1}" class="nl-base"/><line x1="${L}" x2="${W - R}" y1="${base2}" y2="${base2}" class="nl-base"/>`);
  return `<figure class="nl-chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Weekly organisations emailed, new subscribers and total subscribers">${g.join('')}</svg>
    <figcaption class="tiny"><span><i class="nl-key o"></i>Organisations emailed</span><span><i class="nl-key s"></i>New subscribers</span><span><i class="nl-key t"></i>Total subscribers</span><span><i class="nl-key c"></i>Newsletter sent</span></figcaption></figure>`;
}
function renderTimeline() {
  if (S.subs === null || S.camps === null || S.msgs === null) return `<p class="muted crm-loading">Loading the timeline…</p>`;
  const { days, weeks, start } = timelineData();
  const sumW = k => weeks.reduce((a, w) => a + w[k], 0);
  const emailed = sumW('outreach'), newSubs = sumW('subs');
  const active = (S.subs || []).filter(s => s.subscribed).length;
  const last30 = (S.subs || []).filter(s => s.subscribed_at && dayKey(s.subscribed_at) >= addDays(today(), -29)).length;
  const range = `<label class="nl-range"><span>Show</span><select data-action="tl-range">${opts([['all', 'Everything'], ['13', 'Last 3 months'], ['8', 'Last 8 weeks'], ['4', 'Last 4 weeks']], S.tlRange)}</select></label>`;
  const rows = [...weeks].reverse().map(w => `<tr${w.camps.length ? ' class="nl-wk-camp"' : ''}><td>${fmtDate(w.week)}</td><td>${num(w.outreach)}</td><td>${num(w.replies)}</td><td>${w.subs ? '<b>+' + w.subs + '</b>' : '0'}</td><td>${w.unsubs ? '−' + w.unsubs : '0'}</td><td>${w.total}</td><td>${w.outreach ? (w.subs / w.outreach * 100).toFixed(1) : '—'}</td><td class="tiny">${w.camps.map(c => esc(c.name)).join('<br>') || '—'}</td></tr>`).join('');
  const log = [...days.entries()].filter(([k]) => k >= (start || '')).sort((a, b) => b[0].localeCompare(a[0])).map(([k, v]) => {
    const items = [];
    for (const c of v.camps) { const x = campSummary(c); items.push(`<li class="nl-ev-camp"><b>Newsletter sent:</b> ${esc(c.name)} to ${num(x.sent)} subscribers${x.opened ? ` · ${x.opened} opened` : ''} <button class="link" data-action="camp-goto" data-id="${esc(c.id)}">See who opened</button></li>`); }
    if (v.subs.length) items.push(`<li class="nl-ev-sub"><b>${v.subs.length} new subscriber${v.subs.length > 1 ? 's' : ''}:</b> ${v.subs.map(s => { const o = matchSubscriber(s).org; return esc(o ? o.name : s.email); }).join(', ')}</li>`);
    if (v.unsubs.length) items.push(`<li class="nl-ev-out"><b>${v.unsubs.length} unsubscribed:</b> ${v.unsubs.map(s => esc(s.email)).join(', ')}</li>`);
    if (v.outreach) items.push(`<li class="nl-ev-out-mail"><b>${num(v.outreach)} organisations emailed</b> (outreach)</li>`);
    if (v.replies.size) items.push(`<li><b>${v.replies.size} replies</b> from organisations</li>`);
    return `<li class="nl-day"><span class="nl-date">${esc(fmtDate(k))}</span><ul>${items.join('')}</ul></li>`;
  }).join('');
  return `<section class="rowhead section-head"><h2>Growth timeline</h2><div class="actions">${range}<button class="button secondary" data-action="reload-nl">Refresh</button><button class="button" data-action="export-tl">Export</button></div></section>
    <section class="grid four crm-cards">${card('Subscribers now', active, `+${last30} in the last 30 days`)}${card('Organisations emailed', num(emailed), S.tlRange === 'all' ? 'All outreach so far' : 'In this period')}${card('New subscribers', newSubs, emailed ? (newSubs / emailed * 100).toFixed(1) + ' per 100 organisations emailed' : 'In this period')}${card('Newsletters sent', weeks.reduce((a, w) => a + w.camps.length, 0), 'In this period')}</section>
    <section class="panel">${timelineChart(weeks)}<p class="tiny muted">Weeks start on Monday. New subscribers usually follow outreach waves within a few days. The envelope marks the week a newsletter went out.</p></section>
    <section class="panel"><div class="rowhead"><span class="eyebrow">Week by week</span></div><div class="tablewrap crm-table"><table><thead><tr><th>Week of</th><th>Organisations emailed</th><th>Replies</th><th>New subscribers</th><th>Unsubscribed</th><th>Total subscribers</th><th>Sign-ups per 100 emailed</th><th>Newsletters</th></tr></thead><tbody>${rows || '<tr><td colspan="8">Nothing recorded yet.</td></tr>'}</tbody></table></div></section>
    <section class="panel"><div class="rowhead"><span class="eyebrow">Day by day</span></div><ol class="nl-log">${log || '<li class="muted">Nothing recorded yet.</li>'}</ol></section>`;
}
function exportTimeline() {
  const { weeks } = timelineData();
  downloadCsv(`ethical-bridge-growth-${today()}.csv`, ['week_starting', 'organisations_emailed', 'replies', 'new_subscribers', 'unsubscribed', 'total_subscribers', 'signups_per_100_emailed', 'newsletters_sent'],
    weeks.map(w => [w.week, w.outreach, w.replies, w.subs, w.unsubs, w.total, w.outreach ? (w.subs / w.outreach * 100).toFixed(1) : '', w.camps.map(c => c.name).join('; ')]));
}

function nlPickModal(id) {
  const s = (S.subs || []).find(x => x.id === id); if (!s) return '';
  const q = norm(S.nlQuery), d = mailDomain(s.email);
  const cands = q.length >= 2 ? S.orgs.filter(o => norm(o.name).includes(q) || norm(o.email).includes(q) || norm(o.website).includes(q)).slice(0, 12)
    : S.orgs.filter(o => d && !FREE_MAIL.test(d) && (norm(o.email).includes(d) || norm(o.website).includes(d))).slice(0, 8);
  const cur = matchSubscriber(s);
  return modal(`Link ${s.email}`, `<p class="tiny">${esc([s.first_name, s.last_name].filter(Boolean).join(' '))}${cur.org ? ` · now: <b>${esc(cur.org.name)}</b> (${esc(cur.how)})` : ' · no organisation matched yet'}</p>
    <label class="field full"><span class="label">Search organisations by name, email or website</span><input data-nlsearch="${esc(id)}" value="${esc(S.nlQuery)}" placeholder="Type at least 2 letters"></label>
    <div class="nl-cands">${cands.map(o => `<button type="button" class="nl-cand" data-action="nl-link" data-id="${esc(id)}" data-org="${esc(o.id)}"><b>${esc(o.name)}</b><span>${esc([o.country, o.email].filter(Boolean).join(' · '))}</span></button>`).join('') || '<p class="muted tiny">No suggestions yet. Search above.</p>'}</div>
    <div class="actions"><button class="button secondary" data-action="nl-link" data-id="${esc(id)}" data-org="">Not an organisation</button>${s.org_id !== null && s.org_id !== undefined ? `<button class="button secondary" data-action="nl-link" data-id="${esc(id)}" data-org="__auto">Back to automatic matching</button>` : ''}<button class="button secondary" data-action="close">Cancel</button></div>`);
}
async function nlLink(id, org) {
  const value = org === '__auto' ? null : org;
  try { await api('newsletter.link', { id, org_id: value }); } catch (e) { return flash('Could not save: ' + e.message); }
  const s = S.subs.find(x => x.id === id); if (s) s.org_id = value;
  S.modal = ''; S.nlQuery = ''; flash('Saved.');
}
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true; else if (c === ',' || c === ';') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; } else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim()));
}
async function importNewsletterCsv(file) {
  const rows = parseCsv(await file.text()); if (rows.length < 2) return flash('That file has no rows.');
  const head = rows[0].map(h => h.trim().replace(/^﻿/, '')); const H = head.map(h => h.toLowerCase());
  const col = re => H.findIndex(h => re.test(h));
  const ie = col(/e-?mail/), ifn = col(/^(firstname|first name|prenom|prénom|nombre)$/), iln = col(/^(lastname|last name|nom|apellidos?)$/), id = col(/(added|created|creation|date)/);
  if (ie < 0) return flash('No email column found in that file.');
  const subs = rows.slice(1).map(r => ({ email: r[ie], first_name: ifn >= 0 ? r[ifn] : '', last_name: iln >= 0 ? r[iln] : '', subscribed_at: id >= 0 && !isNaN(Date.parse(r[id])) ? new Date(r[id]).toISOString() : null,
    attributes: Object.fromEntries(head.map((h, i) => [h, r[i]]).filter(([h, v], i) => v && ![ie, ifn, iln].includes(i))) }));
  try { const { imported } = await api('newsletter.import', { subscribers: subs }); flash(`${imported} subscribers imported.`); } catch (e) { return flash('Could not import: ' + e.message); }
  loadNewsletter();
}
function exportNewsletter() {
  downloadCsv(`ethical-bridge-newsletter-${today()}.csv`, ['email', 'first_name', 'last_name', 'status', 'subscribed', 'organisation', 'continent', 'region', 'country', 'match_group', 'how_matched', 'reply_status', 'newsletters_opened'],
    filteredNewsletter().map(r => [r.sub.email, r.sub.first_name, r.sub.last_name, r.sub.subscribed ? 'Subscribed' : 'Unsubscribed', (r.sub.subscribed_at || '').slice(0, 10), r.org?.name || '', r.org?.continent || '', r.org?.region || '', r.org?.country || '', NL_KIND[r.kind], r.how, r.org ? outreachOf(r.org.id).reply_status : '', readLabel(r.sub)]));
}

// Contact research shown at the top of a university's details.
function uniInfo(id) {
  const p = pipeOf(id);
  const rows = [['ID', p.ref], ['Priority', p.priority], ['List', p.list], ['Who to approach', p.who_to_approach], ['Contact', [p.contact_name, p.contact_role].filter(Boolean).join(', ')], ['Email', p.contact_email], ['Other email', p.other_email], ['Where found', p.where_found], ['Note', p.source_note], ['Programme page', p.programme_page], ['Stage', p.status]].filter(([, v]) => v);
  return rows.length ? `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${/^https?:\/\//.test(v) ? `<a href="${esc(v)}" target="_blank" rel="noopener noreferrer">${esc(v)}</a>` : esc(v)}</dd>`).join('')}</dl>` : '';
}
function orgModal(id) {
  const o = S.orgById.get(id); if (!o) return '';
  const r = outreachOf(id);
  const info = [['Registered name', o.registered], ['Office or department', [o.unit, o.unit_type].filter(Boolean).join(' · ')], ['Location', [o.city, o.country, o.region, o.continent].filter(Boolean).join(', ')], ...(o.uni ? [] : [['Public email', o.email], ['Public phone', o.phone], ['Website', o.website]])].filter(([, v]) => v);
  return modal(o.name, `${o.removed ? `<p class="crm-removed-note"><b>Removed from the directory at their request (${esc(o.removed)}).</b> ${esc(o.removedReason || '')} Don't publish or contact them again without their consent.</p>` : ''}<dl class="kv">${info.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${k === 'Website' ? `<a href="${esc(v)}" target="_blank" rel="noopener noreferrer">${esc(v)}</a>` : esc(v)}</dd>`).join('')}</dl>
    ${o.uni ? uniInfo(id) : ''}<form class="form" data-form="org-outreach" data-id="${esc(id)}">
      ${o.uni ? `${selectField('Email status', 'email_status', EMAIL, r.email_status, '')}${field('Date sent', 'date_sent', r.date_sent || '', 'date')}${selectField('Reply', 'reply_status', REPLY, r.reply_status, '')}${field('Notes', 'notes', r.notes, 'area')}` : `${selectField('Interview', 'interview_status', INTERVIEW, r.interview_status, '')}${field('Interview date (if planned)', 'interview_date', r.interview_date || '', 'date')}${field('Personal contact', 'contact_person', r.contact_person)}${field('Personal phone', 'personal_phone', r.personal_phone)}
      ${selectField('Email status', 'email_status', EMAIL, r.email_status, '')}${field('Date sent', 'date_sent', r.date_sent || '', 'date')}${selectField('Reply', 'reply_status', REPLY, r.reply_status, '')}
      ${selectField('Instagram', 'instagram_status', SOCIAL, r.instagram_status, '')}${selectField('Facebook', 'facebook_status', SOCIAL, r.facebook_status, '')}${selectField('LinkedIn', 'linkedin_status', SOCIAL, r.linkedin_status, '')}
      ${field('Notes', 'notes', r.notes, 'area')}`}
      <div class="actions field full"><button class="button" type="submit">Save</button>${o.uni ? `<button class="button secondary" type="button" data-action="pipe-edit" data-id="${esc(id)}">Contact &amp; pipeline</button>` : ''}${o.own ? `<button class="button secondary" type="button" data-action="edit-org" data-id="${esc(id)}">Edit details</button><button class="button danger" type="button" data-action="delete-org" data-id="${esc(o.rowId)}">Delete ${o.uni ? 'university' : 'organisation'}</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div>
      ${o.own ? '' : '<p class="tiny field full">Name, contact details and location come from the Ethical Bridge directory. Correct them on ethicalbridge.org.</p>'}
    </form>`);
}

// Add or edit an organisation (or university) added in the CRM. Universities also keep the office we work with
// and a map pin (latitude and longitude: right-click the place in Google Maps to copy them).
function ownOrgFields(o = {}) {
  const u = isUni() || o.uni;
  return `${field(u ? 'University name' : 'Organisation name', 'name', o.name || '', 'text', 'required')}
    ${u ? selectField('Office or department type', 'unit_type', UNIT_TYPES, o.unit_type || '') + field('Office or department name', 'unit', o.unit || '') : ''}
    ${selectField('Continent', 'continent', CONTINENTS, o.continent ?? (S.continent === 'All' ? '' : S.continent))}${field('Region', 'region', o.region || '')}${field('Country', 'country', o.country || '')}${field('City', 'city', o.city || '')}
    ${field(u ? 'Email (office or contact)' : 'Public email', 'email', o.email || '', 'email')}${u ? '' : field('Public phone', 'phone', o.phone || '')}${field('Website', 'website', o.website || '', 'url', 'placeholder="https://"')}
    ${field('Latitude (for the map)', 'lat', o.lat ?? '', 'number', 'min="-90" max="90"')}${field('Longitude (for the map)', 'lng', o.lng ?? '', 'number', 'min="-180" max="180"')}`;
}
function addOrgModal() {
  const u = isUni();
  return modal(u ? 'Add university' : 'Add organisation', `<form class="form" data-form="add-org">${ownOrgFields()}
    <div class="actions field full"><button class="button" type="submit">${u ? 'Add university' : 'Add organisation'}</button><button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`,
  u ? 'Universities we contact to promote Handova to students, staff and alumni. Latitude and longitude place it on the Relationship map: in Google Maps, right-click the place and click the numbers to copy them.'
    : S.hasDirectory ? 'Use this for organisations that are not in the Ethical Bridge directory. Directory organisations appear automatically.' : '');
}
function editOwnOrgModal(id) {
  const o = S.orgById.get(id); if (!o?.own) return '';
  return modal(`Edit ${o.name}`, `<form class="form" data-form="edit-org" data-id="${esc(id)}">${ownOrgFields(o)}
    <div class="actions field full"><button class="button" type="submit">Save</button><button class="button secondary" type="button" data-action="org" data-id="${esc(id)}">Back</button></div></form>`);
}

function exportOrgs() {
  const list = filteredOrgs();
  if (isUni()) return downloadCsv(`ethical-bridge-universities-${S.continent === 'All' ? 'all' : norm(S.continent).replace(/\W+/g, '-')}-${today()}.csv`,
    ['continent', 'region', 'country', 'id', 'priority', 'list', 'university', 'centre_or_programme', 'who_to_approach', 'contact_name', 'role', 'email', 'other_email', 'where_found', 'note', 'programme_page', 'email_status', 'date_sent', 'reply_status', 'stage'],
    list.map(o => { const r = outreachOf(o.id), p = pipeOf(o.id); return [o.continent, o.region, o.country, p.ref, p.priority, p.list, o.name, o.unit, p.who_to_approach, p.contact_name, p.contact_role, p.contact_email || o.email, p.other_email, p.where_found, p.source_note, p.programme_page || o.website, r.email_status, r.date_sent || '', r.reply_status, p.status]; }));
  downloadCsv(`ethical-bridge-organisations-${S.continent === 'All' ? 'all' : norm(S.continent).replace(/\W+/g, '-')}-${today()}.csv`,
    ['continent', 'region', 'country', 'public_name', 'interview_status', 'interview_date', 'contact_person', 'public_email', 'public_phone', 'personal_phone', 'email_status', 'date_sent', 'instagram_status', 'facebook_status', 'linkedin_status', 'reply_status', 'notes', 'website'],
    list.map(o => { const r = outreachOf(o.id); return [o.continent, o.region, o.country, o.name, interviewLabel(r.interview_status), r.interview_date || '', r.contact_person, o.email, o.phone, r.personal_phone, r.email_status, r.date_sent || '', r.instagram_status, r.facebook_status, r.linkedin_status, r.reply_status, r.notes, o.website]; }));
}

// ---------- Outreach ----------
function campaignAudience(c) {
  const list = S.orgs.filter(o => !c.recipients || c.recipients === 'All continents' || o.continent === c.recipients);
  const sent = list.filter(o => outreachOf(o.id).email_status === 'Sent');
  const onDate = c.date_sent ? sent.filter(o => outreachOf(o.id).date_sent === c.date_sent) : [];
  const group = onDate.length ? onDate : sent;
  return { recipients: group.length, replies: group.filter(o => outreachOf(o.id).reply_status === 'Replied').length, bounces: group.filter(o => outreachOf(o.id).reply_status === 'Bounce back').length, exact: onDate.length > 0 };
}
function renderOutreach() {
  const top = renderOrganisations();
  const s = stats(continentOrgs());
  const label = S.continent === 'All' ? 'All continents' : S.continent;
  const camps = [...S.records.campaign].sort((a, b) => String(b.data.date_sent || '').localeCompare(String(a.data.date_sent || '')));
  return top + `<section class="grid four crm-cards">${card('Organisations emailed', s.sent, label + ' outreach status')}${card('Replies', s.replied, pct(s.replied, s.sent) + ' reply rate')}${card('Automatic replies', s.auto, 'Recorded outcome')}${card('Bounce backs', s.bounce, 'Recorded outcome', s.bounce ? 'warn' : '')}</section>
  <section class="panel"><div class="rowhead"><div><span class="eyebrow">Email tracking</span><h2>Outbound campaigns</h2></div><button class="button" data-action="add-campaign">Log a sent campaign</button></div>
  <div class="tablewrap"><table><thead><tr><th>Campaign</th><th>Sent</th><th>Recipients</th><th>Replies</th><th>Bounces</th><th>Status</th><th></th></tr></thead><tbody>${camps.map(c => { const d = c.data, a = campaignAudience(d); return `<tr><td><b>${esc(d.name)}</b>${d.subject ? `<br><span class="tiny">${esc(d.subject)}</span>` : ''}</td><td>${esc(fmtDate(d.date_sent)) || '—'}</td><td>${a.recipients} <span class="tiny">${esc(d.recipients || 'All continents')}${a.exact ? '' : ' · all emailed'}</span></td><td>${a.replies}</td><td>${a.bounces}</td><td><span class="pill">${d.date_sent && d.date_sent > today() ? 'Scheduled' : 'Sent'}</span></td><td><button class="link" data-action="edit-campaign" data-id="${c.id}">Edit</button></td></tr>`; }).join('') || '<tr><td colspan="7">No email campaigns have been logged yet.</td></tr>'}</tbody></table></div>
  <p class="tiny">Recipients, replies and bounces are counted from the outreach marks in the table above: organisations on the campaign's continent emailed on the campaign date.</p></section>`;
}
function campaignModal(id) {
  const c = S.records.campaign.find(x => x.id === id); const d = c?.data || { date_sent: today(), recipients: S.continent === 'All' ? 'All continents' : S.continent };
  return modal(c ? 'Edit campaign' : 'Log a sent email campaign', `<form class="form" data-form="campaign" data-id="${esc(id || '')}">${field('Campaign name', 'name', d.name, 'text', 'required')}${field('Email subject', 'subject', d.subject)}${field('Sender email', 'sender', d.sender, 'email')}${field('Date sent', 'date_sent', d.date_sent, 'date')}${selectField('Recipients', 'recipients', ['All continents', ...CONTINENTS], d.recipients, '')}${field('Notes', 'notes', d.notes, 'area')}
    <div class="actions field full"><button class="button" type="submit">${c ? 'Save campaign' : 'Log campaign'}</button>${c ? `<button class="button danger" type="button" data-action="delete-record" data-kind="campaign" data-id="${c.id}">Delete</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`);
}

// ---------- Relationship map (organisations that replied, removed, visited, strong and possible allies) ----------
// One pin per organisation, at its main office, coloured by its strongest tie with us. Each organisation's
// "Ally type & why" (ally + ally_reasons + ally_note in ebcrm_outreach) comes from the email analysis or is set by hand.
const REL = [
  ['visited', 'Visited · relationship built', '#6b46a8'],
  ['strong', 'Strong allies', '#116b68'],
  ['possible', 'Possible allies', '#e0a019'],
  ['replied', 'Replied', '#8a9aa6'],
  ['removed', 'Removed at their request', '#c0392b'],
  ['handova', 'Handova', '#e8590c'],
];
// 'handova' is not a relationship level: it marks organisations that use Handova (conversions in ebcrm_outreach),
// whatever their tie with us. Their pins keep their relationship colour and get an orange outline.
const HV_COLOR = '#e8590c';
const REL_ORDER = ['visited', 'strong', 'possible', 'replied', 'removed'];
const REASONS = [['call', 'Call or meeting'], ['visit', 'Visit / met in person'], ['collab', 'Partnership or further work'], ['handova', 'Handova'], ['jobs', 'Jobs & Opportunities'], ['fundova', 'Funding (Fundova)'], ['story', 'Interview, video or story'], ['network', 'Networking · Local Impact Alliance'], ['promote', 'Promotion · featuring us']];
const ALLY_MARKS = [['', 'Not reviewed (replied)'], ['visited', 'Visited · relationship built'], ['strong', 'Strong ally'], ['possible', 'Possible ally'], ['no', 'Not an ally']];
const relColor = k => REL.find(x => x[0] === k)[2];
const relLabel = k => REL.find(x => x[0] === k)[1];
const reasonLabel = k => REASONS.find(x => x[0] === k)?.[1] || k;
const reasonChips = list => (list || []).map(k => `<span class="crm-why">${esc(reasonLabel(k))}</span>`).join('');
function relRows() {
  return conversations().map(c => {
    const r = S.outreach.get(c.id) || {};
    const cat = c.o.removed ? 'removed' : c.ally === 'visited' ? 'visited' : c.ally === 'strong' ? 'strong' : c.ally === 'suggested' ? 'possible' : 'replied';
    return { ...c, cat, reasons: r.ally_reasons || [], note: r.ally_note || '', handova: (r.conversions || []).includes('handova'), cvNote: r.conversion_note || '' };
  });
}
const hasPin = o => Number.isFinite(o.lat) && Number.isFinite(o.lng) && o.lat !== null && o.lng !== null;
function relFiltered(all) {
  const f = S.rf, q = norm(f.q);
  return all.filter(x => (!f.show.length || f.show.includes(x.cat) || (x.handova && f.show.includes('handova'))) && (!f.reason || x.reasons.includes(f.reason))
    && (!q || norm(x.o.name).includes(q) || norm(x.o.country).includes(q) || norm(x.note).includes(q)))
    .sort((a, b) => REL_ORDER.indexOf(a.cat) - REL_ORDER.indexOf(b.cat) || byCountry(a.o, b.o));
}
function renderRelMap() {
  if (S.msgs === null) return `<p class="muted crm-loading">Loading conversations…</p>`;
  const all = relRows().filter(x => inContinent(x.o));
  const list = relFiltered(all), noPin = list.filter(x => !hasPin(x.o)).length;
  const n = k => all.filter(x => k === 'handova' ? x.handova : x.cat === k).length;
  const f = S.rf;
  const rows = list.map(x => `<tr>
      <td>${esc(x.o.country)}</td>
      <td class="crm-org"><button class="link" data-action="thread" data-id="${esc(x.id)}">${esc(x.o.name)}</button>${hasPin(x.o) ? '' : '<span class="tiny">No map location</span>'}</td>
      <td><span class="crm-rel" style="--c:${relColor(x.cat)}">${esc(relLabel(x.cat))}</span>${x.handova ? `<span class="crm-hvtag" title="${esc(x.cvNote || 'Uses Handova')}">Handova</span>` : ''}${x.mark === 'no' ? '<span class="tiny">Marked “not an ally”</span>' : x.ally === 'suggested' && x.mark !== 'possible' ? '<span class="tiny">Suggested from their reply</span>' : ''}</td>
      <td class="crm-text">${x.reasons.length || x.note ? `<div class="crm-whys">${reasonChips(x.reasons)}</div>${x.note ? `<p>${esc(x.note)}</p>` : ''}` : '<span class="muted">—</span>'}</td>
      <td><button class="button secondary small" data-action="rel-edit" data-id="${esc(x.id)}">Edit</button></td></tr>`);
  return `<section class="rowhead section-head"><h2>Relationship map</h2><div class="actions"><button class="button secondary" data-action="reload-msgs">Refresh</button><button class="button" data-action="rel-export">Export</button></div></section>
    ${S.msgsError ? `<div class="notice warn" role="alert">${esc(S.msgsError)}</div>` : ''}
    <section class="crm-rel-legend" aria-label="Choose what to show on the map">${REL.map(([k, l, c]) => `<button type="button" data-relcat="${k}" class="${f.show.includes(k) ? 'on' : f.show.length ? 'off' : ''}" aria-pressed="${f.show.includes(k)}" title="${k === 'handova' ? 'Organisations that use Handova (registered or posted a need), whatever their relationship with us. Their pins have a blue outline. ' : ''}${f.show.includes(k) ? 'Click to stop showing only these' : 'Click to show only these (click more to add them)'}" style="--c:${c}"><i class="${k === 'removed' ? 'ring' : k === 'handova' ? 'hv' : ''}"></i><b>${n(k)}</b><span>${esc(l)}</span></button>`).join('')}</section>
    <section class="panel crm-filters"><div class="crm-frow"><b>Filter</b>
      <label><span>Why they're an ally</span><select data-relreason class="${f.reason ? 'crm-on' : ''}">${opts(REASONS, f.reason, 'Any reason')}</select></label>
      <label><span>Search</span><input data-relq class="${f.q ? 'crm-on' : ''}" value="${esc(f.q)}" placeholder="Name, country or note"></label>
      <button class="button secondary small" data-action="rel-clear">Clear filters</button>
      <span class="tiny"><b>${list.length}</b> of ${all.length} organisations${noPin ? ` · ${noPin} without a map location (listed below)` : ''}</span></div></section>
    <section class="crm-relmap-wrap"><div id="crm-relmap" class="crm-relmap" role="region" aria-label="Map of organisations by relationship"></div>
      <button type="button" class="button secondary small crm-relmap-reset" data-action="rel-reset">Fit all pins</button></section>
    <p class="tiny crm-hint">Click a pin to see why the organisation is an ally and to open the conversation. Click a colour above to show only that group; click more colours to add them, or click a selected one again to remove it. Pins sit on each organisation's main office. Pins with a blue outline are organisations using Handova.</p>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Ally type &amp; why</span><p class="tiny crm-legend">Strongest tie first: visited, strong, possible, replied, removed · then country A–Z</p></div></div>
    <div class="tablewrap crm-table crm-reltable"><table><thead><tr>${['Country', 'Organisation', 'Relationship', 'Ally type & why', ''].map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.join('') || '<tr><td colspan="5">No organisations match these filters.</td></tr>'}</tbody></table></div>
    <p class="tiny">Strong allies asked for a call or meeting, a visit, a partnership or further work together. Possible allies showed interest in Handova, Jobs &amp; Opportunities, funding, networking or collaboration. The reasons and notes come from a review of every email they sent us (6 Nov 2026); change them with Edit.</p></section>`;
}
function relModal(id) {
  const x = relRows().find(r => r.id === id); if (!x) return '';
  return modal(x.o.name, `<p class="tiny">${esc([x.o.city, x.o.country].filter(Boolean).join(', '))} · <span class="crm-rel" style="--c:${relColor(x.cat)}">${esc(relLabel(x.cat))}</span></p>
    ${x.o.removed ? `<p class="crm-removed-note"><b>Removed from the directory at their request (${esc(x.o.removed)}).</b> ${esc(x.o.removedReason || '')}</p>` : ''}
    <form class="form" data-form="relally" data-id="${esc(id)}">
      ${selectField('Ally type', 'ally', ALLY_MARKS, x.mark || (x.cat === 'visited' ? 'visited' : ''), '', true)}
      <fieldset class="field full crm-reasons"><legend class="label">Why (tick all that apply)</legend>${REASONS.map(([k, l]) => `<label><input type="checkbox" name="r_${k}" ${x.reasons.includes(k) ? 'checked' : ''}> ${esc(l)}</label>`).join('')}</fieldset>
      ${field('Note (what they said or asked for)', 'ally_note', x.note, 'area')}
      ${(() => { const r = S.outreach.get(id) || {}; const cv = r.conversions || []; return `<fieldset class="field full crm-reasons"><legend class="label" title="${esc(CONV_TIP)}">Conversion: initiatives they already use</legend>${CONVERSIONS.map(([k, l, tip]) => `<label title="${esc(tip)}"><input type="checkbox" name="cv_${k}" ${cv.includes(k) ? 'checked' : ''}> ${esc(l)}</label>`).join('')}</fieldset>${field('Conversion note (for example, when they registered)', 'conversion_note', r.conversion_note || '', 'area')}`; })()}
      <div class="actions field full"><button class="button" type="submit">Save</button><button class="button secondary" type="button" data-action="thread" data-id="${esc(id)}">Open conversation</button><button class="button secondary" type="button" data-action="close">Cancel</button></div>
    </form>`, 'Organisations interviewed in person count as visited unless marked “Not an ally”.');
}
function exportRel() {
  const list = relFiltered(relRows().filter(x => inContinent(x.o)));
  downloadCsv(`ethical-bridge-relationships-${S.continent === 'All' ? 'all' : norm(S.continent).replace(/\W+/g, '-')}-${today()}.csv`,
    ['continent', 'region', 'country', 'organisation', 'relationship', 'uses_handova', 'why', 'note', 'email', 'last_email'],
    list.map(x => [x.o.continent, x.o.region, x.o.country, x.o.name, relLabel(x.cat), x.handova ? 'yes' : '', x.reasons.map(reasonLabel).join('; '), x.note, x.o.email || x.first?.from_addr || '', x.last?.sent_at.slice(0, 10) || '']));
}

// Leaflet is loaded the first time the map opens (same library and tiles as ethicalbridge.org).
let leafletReady = null, relMap = null, relFit = null;
function loadLeaflet() {
  if (window.L) return Promise.resolve();
  if (leafletReady) return leafletReady;
  leafletReady = new Promise((resolve, reject) => {
    const css = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' });
    const js = Object.assign(document.createElement('script'), { src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', async: true });
    js.onload = () => resolve(); js.onerror = () => { leafletReady = null; reject(new Error('The map library could not load.')); };
    document.head.append(css, js);
  });
  return leafletReady;
}
function unmountRelMap() {
  if (!relMap) return;
  try { S.relView = { c: relMap.getCenter(), z: relMap.getZoom() }; relMap.remove(); } catch { /* already gone */ }
  relMap = null;
}
async function mountRelMap() {
  try { await loadLeaflet(); } catch (e) { const el = document.getElementById('crm-relmap'); if (el) el.innerHTML = `<p class="muted crm-loading">${esc(e.message)} The table below still lists every organisation.</p>`; return; }
  const el = document.getElementById('crm-relmap'); if (!el || relMap) return;
  const L = window.L;
  relMap = L.map(el, { worldCopyJump: true, minZoom: 1, zoomSnap: .25, scrollWheelZoom: false, maxBounds: [[-85.05, -100000], [85.05, 100000]], maxBoundsViscosity: 1 });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, METI, NASA, NGA, EPA, USDA',
  }).addTo(relMap);
  relMap.on('click', () => relMap.scrollWheelZoom.enable());
  const list = relFiltered(relRows().filter(x => inContinent(x.o))).filter(x => hasPin(x.o));
  // Draw the weakest ties first so allies sit on top where pins overlap.
  const layer = L.featureGroup().addTo(relMap);
  [...list].reverse().sort((a, b) => a.handova - b.handova).forEach(x => {
    const c = relColor(x.cat), removed = x.cat === 'removed', big = x.cat === 'visited' || x.cat === 'strong' || x.handova;
    L.circleMarker([x.o.lat, x.o.lng], removed ? { radius: 7, color: c, weight: 2.5, fillColor: '#fff', fillOpacity: 1 } : x.handova ? { radius: 8, color: HV_COLOR, weight: 3.5, fillColor: c, fillOpacity: .95 } : { radius: big ? 8 : 6.5, color: '#fff', weight: 1.5, fillColor: c, fillOpacity: .95 })
      .bindPopup(`<div class="crm-relpop"><strong>${esc(x.o.name)}</strong><span class="tiny">${esc([x.o.city, x.o.country].filter(Boolean).join(', '))}</span>
        <span class="crm-rel" style="--c:${c}">${esc(relLabel(x.cat))}</span>${x.handova ? `<span class="crm-hvtag" title="${esc(x.cvNote || 'Uses Handova')}">Handova</span>` : ''}${x.cvNote ? `<p class="tiny">${esc(x.cvNote)}</p>` : ''}${x.reasons.length ? `<div class="crm-whys">${reasonChips(x.reasons)}</div>` : ''}${x.note ? `<p>${esc(x.note)}</p>` : ''}
        <div class="crm-relpop-actions"><button type="button" class="link" data-pop="thread" data-id="${esc(x.id)}">Open conversation (${x.all.length})</button><button type="button" class="link" data-pop="rel-edit" data-id="${esc(x.id)}">Edit ally type &amp; why</button></div></div>`, { minWidth: 240, maxWidth: 300 })
      .addTo(layer);
  });
  relFit = () => { const b = layer.getBounds(); if (b.isValid()) relMap.fitBounds(b, { padding: [28, 28], maxZoom: 6 }); else relMap.setView([15, 20], 2); };
  if (S.relView) relMap.setView(S.relView.c, S.relView.z); else relFit();
  // Leaflet stops clicks inside popups from bubbling, so popup buttons get their own listener.
  relMap.on('popupopen', e => {
    e.popup.getElement()?.addEventListener('click', ev => {
      const b = ev.target.closest('[data-pop]'); if (!b) return;
      openModal(b.dataset.pop === 'thread' ? threadModal(b.dataset.id) : relModal(b.dataset.id));
    });
  });
}

// ---------- modal ----------
function modal(title, body, intro = '') {
  return `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modalbox"><div class="rowhead"><h2>${esc(title)}</h2><button type="button" class="link" data-action="close" aria-label="Close">Close</button></div>${intro ? `<p class="muted">${esc(intro)}</p>` : ''}${body}</div></div>`;
}
function openModal(html) { S.modal = html; render(); root.querySelector('.modal input, .modal select, .modal textarea')?.focus(); }
function closeModal() { S.modal = ''; render(); }

// ---------- events ----------
let filterTimer = null;
root.addEventListener('click', async e => {
  const t = e.target.closest('[data-tab],[data-continent],[data-page],[data-action],[data-pat-section],[data-quick],[data-unfilter],[data-cquick],[data-cally],[data-cunfilter],[data-nquick],[data-nlview],[data-relcat],[data-csrc],[data-cconv],[data-area],[data-uq],[data-touch]'); if (!t) return;
  if (t.matches('select,input,textarea')) return;
  if (t.hasAttribute('data-quick')) { const [k, v] = t.dataset.quick.split('='); S.f = EMPTY_FILTERS(); if (k) S.f[k] = v; S.page = 0; render(); root.querySelector('.crm-table')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  // Map legend: click selects that category (others hide); click more to add them; click a selected one to drop it. None selected = show all.
  if (t.hasAttribute('data-relcat')) { const k = t.dataset.relcat, sh = S.rf.show; S.rf.show = sh.includes(k) ? sh.filter(x => x !== k) : [...sh, k]; S.relView = null; render(); return; }
  if (t.hasAttribute('data-nlview')) { S.nlView = t.dataset.nlview; render(); return; }
  if (t.hasAttribute('data-nquick')) { const q = t.dataset.nquick; S.nf = { continent: '', region: '', country: '', name: '', email: '', match: ['same', 'other', 'none'].includes(q) ? q : '', status: q === 'gone' ? 'Unsubscribed' : 'Subscribed' }; S.nfReplied = q === 'replied'; render(); return; }
  if (t.hasAttribute('data-cally')) { S.cf = { region: '', country: '', name: '', email: '', status: '', ally: t.dataset.cally }; render(); root.querySelector('.crm-conv')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-cconv')) { S.cf = { region: '', country: '', name: '', email: '', status: '', ally: '', conv: t.dataset.cconv }; render(); root.querySelector('.crm-conv')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-csrc')) { S.cf = { region: '', country: '', name: '', email: '', status: '', ally: '', src: t.dataset.csrc }; render(); root.querySelector('.crm-conv')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-cquick')) { S.cf = { region: '', country: '', name: '', email: '', status: t.dataset.cquick, ally: '' }; render(); root.querySelector('.crm-conv')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-cunfilter')) { S.cf[t.dataset.cunfilter] = ''; if (t.dataset.cunfilter === 'region') S.cf.country = ''; return render(); }
  if (t.hasAttribute('data-unfilter')) { S.f[t.dataset.unfilter] = ''; if (t.dataset.unfilter === 'region') S.f.country = ''; S.page = 0; return render(); }
  if (t.hasAttribute('data-uq')) { const [k, v] = t.dataset.uq.split('='); S.uf = { ...S_UF(), [k]: v }; render(); root.querySelector('.crm-upipe')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-touch')) { const id = t.dataset.id, k = t.dataset.touch, p = pipeOf(id), touches = { ...(p.touches || {}) }; if (touches[k]) delete touches[k]; else touches[k] = today();
    const patch = { touches }; if (touches[k] && p.status === 'Not contacted') patch.status = 'Contacted';
    await savePipe(id, patch); render(); return; }
  if (t.hasAttribute('data-area')) { S.area = t.dataset.area; lsSet(LS.area, S.area); S.f = EMPTY_FILTERS(); S.page = 0; S.cf = { region: '', country: '', name: '', email: '', status: '', ally: '' }; S.relView = null; applyArea(); S.modal = ''; render(); window.scrollTo(0, 0); return; }
  if (t.dataset.uqtab) { const [k, v] = t.dataset.uqtab.split('='); S.uf = { ...S_UF(), [k]: v }; }
  if (t.dataset.tab) { S.view = t.dataset.tab; S.modal = ''; render(); window.scrollTo(0, 0); return; }
  if (t.dataset.continent) { S.continent = t.dataset.continent; lsSet(LS.continent, S.continent); S.f.region = ''; S.f.country = ''; S.cf.region = ''; S.cf.country = ''; S.nf.region = ''; S.nf.country = ''; S.page = 0; render(); return; }
  if (t.dataset.page != null && t.dataset.page !== undefined && t.hasAttribute('data-page')) { S.page = Number(t.dataset.page); render(); root.querySelector('.crm-table')?.scrollIntoView({ block: 'start' }); return; }
  const a = t.dataset.action, id = t.dataset.id;
  switch (a) {
    case 'reload': return loadAll();
    case 'signout': S.orgs = []; S.outreach = new Map(); return lockOut('The CRM is locked on this browser.');
    case 'close': return closeModal();
    case 'org': return openModal(orgModal(id));
    case 'edit-org': return openModal(editOwnOrgModal(id));
    case 'thread': return openModal(threadModal(id));
    case 'pin': return setPin(id, true);
    case 'unpin': return setPin(id, false);
    case 'ally': return setAlly(id, t.dataset.ally || '');
    case 'reload-nl': S.subs = null; S.camps = null; peopleCache = null; render(); return loadNewsletter();
    case 'export-nl': return exportNewsletter();
    case 'export-tl': return exportTimeline();
    case 'camp-add': return openModal(campModal(''));
    case 'camp-edit': return openModal(campModal(id));
    case 'camp-toggle': S.campOpen = S.campOpen === id ? '' : id; return render();
    case 'camp-goto': S.nlView = 'Sent'; S.campOpen = id; render(); window.scrollTo(0, 0); return;
    case 'camp-delete': {
      if (!confirm('Delete this newsletter from the CRM? Its per-person results are deleted too. Nothing changes in Brevo.')) return;
      try { await api('campaign.delete', { id }); } catch (err) { return flash('Could not delete: ' + err.message); }
      S.camps = (S.camps || []).filter(c => c.id !== id); peopleCache = null; S.modal = ''; return flash('Newsletter deleted.');
    }
    case 'clear-nfilters': S.nf = { continent: '', region: '', country: '', name: '', email: '', match: '', status: 'Subscribed' }; S.nfReplied = false; return render();
    case 'nl-pick': S.nlQuery = ''; return openModal(nlPickModal(id));
    case 'nl-link': return nlLink(id, t.dataset.org);
    case 'reload-msgs': S.msgs = null; render(); return loadMessages();
    case 'export-conv': return exportConversations();
    case 'pipe-edit': return openModal(pipeModal(id));
    case 'pipe-export': return exportPipeline();
    case 'pipe-clear': S.uf = S_UF(); return render();
    case 'rel-edit': return openModal(relModal(id));
    case 'rel-export': return exportRel();
    case 'rel-clear': S.rf = { show: [], reason: '', q: '' }; S.relView = null; return render();
    case 'rel-reset': if (relFit) relFit(); return;
    case 'clear-cfilters': S.cf = { region: '', country: '', name: '', email: '', status: '', ally: '' }; return render();
    case 'add-org': return openModal(addOrgModal());
    case 'export-orgs': return exportOrgs();
    case 'clear-filters': S.f = EMPTY_FILTERS(); S.page = 0; return render();
    case 'add-campaign': return openModal(campaignModal());
    case 'edit-campaign': return openModal(campaignModal(id));
    case 'delete-record': {
      const kind = t.dataset.kind; if (!confirm('Delete this record? This cannot be undone.')) return;
      if (await deleteRecord(kind, id)) { S.modal = ''; flash('Deleted.'); } return;
    }
    case 'delete-org': {
      const what = isUni() ? 'university' : 'organisation';
      if (!confirm(`Delete this ${what} and its outreach marks?`)) return;
      try { await api('org.delete', { id }); } catch (err) { return flash('Could not delete: ' + err.message); }
      { const pr = pipeRec('own:' + id); if (pr) await deleteRecord('university', pr.id); }
      S.allOrgs = S.allOrgs.filter(o => o.rowId !== id); S.unis = S.unis.filter(o => o.rowId !== id); S.outreach.delete('own:' + id); applyArea(); S.modal = ''; return flash(what === 'university' ? 'University deleted.' : 'Organisation deleted.');
    }
    case 'print': return window.print();
  }
});

root.addEventListener('change', async e => {
  const t = e.target;
  if (t.dataset.action === 'tl-range') { S.tlRange = t.value; return render(); }
  if (t.dataset.out) {
    const field = t.dataset.out, id = t.dataset.id; let value = t.value;
    const patch = { [field]: (field === 'date_sent' || field === 'interview_date') ? (value || null) : value };
    if (field === 'email_status' && value === 'Sent' && !outreachOf(id).date_sent) patch.date_sent = today();
    await saveOutreach(id, patch);
    if (['interview_status', 'email_status', 'reply_status', 'instagram_status', 'facebook_status', 'linkedin_status'].includes(field)) render();
    return;
  }
  if (t.dataset.pipe) { await savePipe(t.dataset.id, { [t.dataset.pipe]: String(t.value || '').trim() }); return; }
  if (t.dataset.filter && t.tagName === 'SELECT') { S.f[t.dataset.filter] = t.value; if (t.dataset.filter === 'region') S.f.country = ''; S.page = 0; return render(); }
  if (t.dataset.action === 'nl-csv' && t.files?.[0]) { const f = t.files[0]; t.value = ''; return importNewsletterCsv(f); }
  if (t.dataset.nfilter && t.tagName === 'SELECT') { S.nf[t.dataset.nfilter] = t.value; if (t.dataset.nfilter === 'continent') { S.nf.region = ''; S.nf.country = ''; } if (t.dataset.nfilter === 'region') S.nf.country = ''; S.nfReplied = false; return render(); }
  if (t.dataset.uf && t.tagName === 'SELECT') { S.uf[t.dataset.uf] = t.value; return render(); }
  if (t.hasAttribute('data-relreason')) { S.rf.reason = t.value; S.relView = null; return render(); }
  if (t.dataset.cfilter && t.tagName === 'SELECT') { S.cf[t.dataset.cfilter] = t.value; if (t.dataset.cfilter === 'region') S.cf.country = ''; return render(); }
});

root.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.filter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.filter; filterTimer = setTimeout(() => { S.f[k] = t.value; S.page = 0; render(); const el = root.querySelector(`[data-filter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.nlsearch) { clearTimeout(filterTimer); const id = t.dataset.nlsearch; filterTimer = setTimeout(() => { S.nlQuery = t.value; S.modal = nlPickModal(id); render(); const el = root.querySelector('[data-nlsearch]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 200); return; }
  if (t.dataset.nfilter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.nfilter; filterTimer = setTimeout(() => { S.nf[k] = t.value; render(); const el = root.querySelector(`[data-nfilter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.uf === 'q') { clearTimeout(filterTimer); filterTimer = setTimeout(() => { S.uf.q = t.value; render(); const el = root.querySelector('[data-uf="q"]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.hasAttribute('data-relq')) { clearTimeout(filterTimer); filterTimer = setTimeout(() => { S.rf.q = t.value; S.relView = null; render(); const el = root.querySelector('[data-relq]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.cfilter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.cfilter; filterTimer = setTimeout(() => { S.cf[k] = t.value; render(); const el = root.querySelector(`[data-cfilter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
});

root.addEventListener('submit', async e => {
  const form = e.target.closest('form[data-form]'); if (!form) return; e.preventDefault();
  const kind = form.dataset.form, id = form.dataset.id || null, d = formData(form);
  const btn = form.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
  try {
    if (kind === 'signin') {
      const code = String(d.code || '').toLowerCase().replace(/[‐-―−]/g, '-').replace(/[^a-z0-9-]/g, ''); // ignore quotes, spaces, full stops pasted with the code
      try { await api('verify', {}, code); }
      catch (err) { S.message = err.status === 401 ? 'That code is not valid. Check it and try again.' : err.message; return renderSignIn(); }
      S.code = code; lsSet(LS.code, code); S.message = '';
      return loadAll();
    }
    if (kind === 'org-outreach') {
      const patch = { ...d, date_sent: d.date_sent || null, interview_date: d.interview_date || null };
      await saveOutreach(id, patch); S.modal = ''; return flash('Saved.');
    }
    if (kind === 'add-org') {
      let row;
      try { ({ row } = await api('org.add', { org: { ...d, kind: isUni() ? 'university' : 'organisation' } })); } catch (err) { return flash('Could not add: ' + err.message); }
      const o = ownOrg(row);
      if (o.uni) { S.unis.push(o); S.unis.sort(byName); } else { S.allOrgs.push(o); S.allOrgs.sort(byName); }
      applyArea(); S.modal = ''; return flash(`${row.name} added.`);
    }
    if (kind === 'pipe') {
      const touches = Object.fromEntries(TOUCHES.map(([k]) => [k, d['t_' + k] || '']).filter(([, v]) => v));
      const keys = ['status', 'priority', 'ref', 'list', 'who_to_approach', 'contact_name', 'contact_role', 'contact_email', 'other_email', 'where_found', 'programme_page', 'source_note', 'linkedin', 'next_step', 'next_date', 'call_date', 'proposal_date', 'pilot_start', 'pilot_end', 'cohort', 'needs_done', 'rating', 'tier', 'income_band', 'price', 'renewal_date', 'reason', 'come_back'];
      const patch = Object.fromEntries(keys.map(k => [k, String(d[k] ?? '').trim()]));
      patch.warm = d.warm === '1'; patch.touches = touches;
      const cur = pipeOf(id);
      if (['Not now', 'Lost'].includes(patch.status) && !['Not now', 'Lost'].includes(cur.status)) patch.reached = stageIdx(cur.status);
      if (await savePipe(id, patch)) { S.modal = ''; flash('Pipeline saved.'); }
      return;
    }
    if (kind === 'edit-org') {
      const cur = S.orgById.get(id); if (!cur) return;
      let row;
      try { ({ row } = await api('org.update', { id: cur.rowId, org: d })); } catch (err) { return flash('Could not save: ' + err.message); }
      const o = ownOrg(row), list = o.uni ? S.unis : S.allOrgs, i = list.findIndex(x => x.id === o.id);
      if (i >= 0) list[i] = o; list.sort(byName); applyArea(); S.modal = orgModal(o.id); return flash(`${row.name} saved.`);
    }
    if (kind === 'campaign') { if (await saveRecord('campaign', id, d)) { S.modal = ''; flash('Campaign saved.'); } return; }
    if (kind === 'nlcamp') return saveCamp(id, d);
    if (kind === 'relally') {
      const ally_reasons = REASONS.map(([k]) => k).filter(k => d['r_' + k]);
      const conversions = CONVERSIONS.map(([k]) => k).filter(k => d['cv_' + k]);
      await saveOutreach(id, { ally: d.ally || '', ally_reasons, ally_note: String(d.ally_note || '').trim(), conversions, conversion_note: String(d.conversion_note || '').trim() }); S.modal = ''; return flash('Saved.');
    }
  } finally { if (btn?.isConnected) btn.disabled = false; }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.modal) closeModal(); });
window.addEventListener('beforeunload', e => { if (S.saving) { e.preventDefault(); e.returnValue = ''; } });

// ---------- boot ----------
if (S.code) loadAll(); else render();
