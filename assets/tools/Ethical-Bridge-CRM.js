/* Ethical Bridge CRM — Impact Tool (Module 12 · Partnerships & Ecosystem Building).

   Sections: Dashboard · Outreach (organisations, contacts and email campaigns) · Partnership mapping ·
   Partnership assessment (PAT) · Partnership tracking.

   Access: a private team code, checked on the server by the `ebcrm-api` Edge Function (only its
   SHA-256 digest is stored there; the code never appears in this file). The code is remembered
   in this browser until "Lock CRM" is pressed.

   Data (all read and written through `ebcrm-api`):
   - Organisations come live from the Ethical Bridge directory (workspaces listed in
     ebcrm_directory_access). They are never copied into this database: one source of truth.
   - Organisations a workspace adds itself live in ebcrm_organisations.
   - Outreach marks live in ebcrm_outreach (one row per workspace + organisation).
   - Campaigns, CSP goals, stakeholders, partnership records and PAT assessments live in
     ebcrm_records (kind + JSON data).
*/
import { PAT_SECTIONS } from './Ethical-Bridge-CRM-PAT.js';

const API = 'https://itzrnaxfllcztpzrgnoa.supabase.co/functions/v1/ebcrm-api';

// ---------- constants ----------
const SECTIONS = ['Dashboard', 'Outreach', 'Conversations', 'Newsletter', 'Partnership mapping', 'Partnership assessment (PAT)', 'Partnership tracking'];
const CONTINENTS = ['Africa', 'Asia', 'Europe', 'Oceania', 'The Americas'];
const INTERVIEW = [['Not interviewed', 'Not interviewed'], ['Interviewed', 'Interviewed'], ['Scheduled', 'Planned']]; // stored value 'Scheduled' is shown as 'Planned'
const interviewLabel = v => v === 'Scheduled' ? 'Planned' : v;
const EMAIL = ['Not sent', 'Sent'];
const SOCIAL = ['Not contacted', 'Contacted', 'Contacted and friend request sent'];
const REPLY = ['None', 'Replied', 'Automatic reply', 'Bounce back'];
const DEFAULT_OUTREACH = { interview_status: 'Not interviewed', interview_date: null, email_status: 'Not sent', date_sent: null, instagram_status: 'Not contacted', facebook_status: 'Not contacted', linkedin_status: 'Not contacted', reply_status: 'None', contact_person: '', personal_phone: '', notes: '' };
const ORG_TYPES = ['Academic institution', 'Child-led org/group', 'Community-based org/group', 'International corporate', 'International NGO', 'Media', 'Membership-based org', 'National government/authority', 'National/local corporate', 'National/local CSO', 'Network/Coalition/Movement', 'Sub-national government/authority', 'UN/multilateral agency'];
const ROLES = ['Strategic Partner', 'Challenger', 'Ally', 'Extraneous'];
const STAGES = ['New', 'Introduced', 'In conversation', 'Active', 'Paused', 'Closed'];
const STRENGTH = ['New', 'Developing', 'Strong', 'Strategic', 'At risk'];
const PAT_STATUS = ['Draft', 'In review', 'Recommended', 'Approved', 'Declined'];
const SCORE_LABELS = { '1': '1 · Major gaps', '2': '2 · Limited', '3': '3 · Partial', '4': '4 · Mostly in place', '5': '5 · Strong', 'na': 'Not applicable' };
const PAT_PROFILE = [
  ['partner_name', 'Partner name'], ['org_id', 'Directory organisation (optional)'], ['assessor', 'Assessor name(s)'], ['assessment_date', 'Assessment date', 'date'],
  ['org_type', 'Type of organisation'], ['address', 'Address'], ['telephone', 'Telephone'], ['email', 'Email', 'email'], ['website', 'Website'],
  ['primary_contact', 'Primary contact'], ['registration_number', 'Registration number'], ['geographic_areas', 'Geographic areas served'],
  ['last_budget_usd', 'Last full year budget (USD)', 'number'], ['staff', 'Number of staff', 'number'], ['project_goal', 'Overall project goal', 'area'],
  ['thematic_areas', 'Key thematic areas and interventions', 'area'], ['intervention_context', 'Intervention context', 'area'],
  ['themes', 'Themes and cross-cutting themes', 'area'], ['funding_transfer_usd', 'Proposed funding transfer (USD)', 'number'], ['donor', 'Donor'],
  ['implementation_geography', 'Proposed implementation geography', 'area'],
];
const PAGE = 100;
const LS = { code: 'mm.ebcrm.code', continent: 'mm.ebcrm.continent' };

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
  orgs: [], orgById: new Map(), outreach: new Map(), records: { campaign: [], goal: [], stakeholder: [], partner: [], assessment: [] },
  loading: true, loadError: '', directoryError: '', directoryLoadedAt: '',
  view: 'Dashboard', continent: lsGet(LS.continent) || 'All',
  f: { region: '', country: '', name: '', email: '', interview: '', emailStatus: '', reply: '', ig: '', fb: '', li: '' }, page: 0,
  mapF: { goal: '', role: '', type: '', engaged: '', q: '' }, trackQ: '', patFilter: '',
  msgs: null, msgsError: '', cf: { region: '', country: '', name: '', email: '', status: '' },
  subs: null, subsError: '', nf: { region: '', country: '', name: '', email: '', match: '', status: 'Subscribed' }, nlQuery: '',
  modal: '', message: '', saving: 0, pat: null, patSection: 0,
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
    S.orgs = [...directory, ...own.map(o => ({ id: 'own:' + o.id, rowId: o.id, name: o.name, continent: o.continent, region: o.region, country: o.country, city: o.city, email: o.email, phone: o.phone, website: o.website, own: true }))]
      .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    S.orgById = new Map(S.orgs.map(o => [o.id, o]));
    S.outreach = new Map(outreach.map(r => [r.org_id, r]));
    S.records = { campaign: [], goal: [], stakeholder: [], partner: [], assessment: [] };
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
  if (['Conversations', 'Dashboard', 'Newsletter'].includes(S.view)) render();
}

async function loadNewsletter() {
  S.subsError = '';
  try { S.subs = (await api('newsletter')).subscribers; }
  catch (e) { S.subs = S.subs || []; S.subsError = e?.message || 'Could not load the newsletter list.'; }
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
    if (n && !norm(o.name).includes(n) && !norm(o.registered).includes(n)) return false;
    if (e && !norm(o.email).includes(e)) return false;
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
const FILTER_LABELS = { region: 'Region', country: 'Country', name: 'Name', email: 'Email address', interview: 'Interview', emailStatus: 'Email', reply: 'Reply', ig: 'Instagram', fb: 'Facebook', li: 'LinkedIn' };
const filterValueLabel = v => v === '__contacted' ? 'Any contact' : v === '__any' ? 'Any response' : interviewLabel(v);
const EMPTY_FILTERS = () => ({ region: '', country: '', name: '', email: '', interview: '', emailStatus: '', reply: '', ig: '', fb: '', li: '' });

// ---------- shell ----------
function render() {
  if (!S.code) return renderSignIn();
  if (!S.ws) { root.innerHTML = `<div class="shell crm"><p class="muted crm-loading">${S.loadError ? esc(S.loadError) + ' <button class="link" data-action="reload">Try again</button>' : 'Loading organisations and your outreach records…'}</p></div>`; return; }
  const continentBar = ['Dashboard', 'Outreach', 'Conversations'].includes(S.view) ? renderContinentBar() : '';
  let body = '';
  if (S.loading) body = `<p class="muted crm-loading">Loading organisations and your outreach records…</p>`;
  else if (S.loadError) body = `<div class="notice warn" role="alert">${esc(S.loadError)} <button class="link" data-action="reload">Try again</button></div>`;
  else body = ({
    'Dashboard': renderDashboard, 'Outreach': renderOutreach, 'Conversations': renderConversations, 'Newsletter': renderNewsletter,
    'Partnership mapping': renderMapping, 'Partnership assessment (PAT)': renderPat, 'Partnership tracking': renderTracking,
  })[S.view]();
  root.innerHTML = `<div class="shell crm">
    <header class="top"><a class="brand" href="../../software.html">Mission <em>&</em> Method</a><div class="crm-top-right"><span class="tiny">Workspace: <b>${esc(S.ws.name)}</b></span><span class="tiny" id="save-state">${S.saving ? 'Saving…' : 'All changes saved'}</span><a href="../../software.html">← Impact Tools</a></div></header>
    <div class="hero crm-hero"><span class="eyebrow">Relationships · Ethical Bridge CRM</span><h1>Partner, outreach &amp; partnerships</h1><p>${S.hasDirectory ? 'Organisations come live from the Ethical Bridge directory. Your outreach, mapping, assessments and partnership records are saved to this workspace.' : 'Add the organisations you work with, then track outreach, mapping, assessments and partnerships in one place.'}</p></div>
    <nav class="nav" aria-label="CRM sections">${SECTIONS.map(t => `<button type="button" data-tab="${esc(t)}" class="${t === S.view ? 'active' : ''}"${t === S.view ? ' aria-current="page"' : ''}>${esc(t)}</button>`).join('')}</nav>
    <main id="main" tabindex="-1">${S.message ? `<div class="notice" role="status">${esc(S.message)}</div>` : ''}${S.directoryError ? `<div class="notice warn" role="alert">Directory: ${esc(S.directoryError)}</div>` : ''}${continentBar}${body}</main>
    <footer class="tiny">Ethical Bridge CRM · Method into Impact · Organisation details are edited on ethicalbridge.org, not here</footer></div>${S.modal}`;
}

function renderContinentBar() {
  const present = continentsPresent();
  const total = S.orgs.length;
  return `<section class="panel crm-continent"><div><span class="eyebrow">Start with a continent</span><h2>${esc(S.continent === 'All' ? 'All continents' : S.continent)}</h2><p class="muted">Organisation, outreach and response totals follow this selection.</p></div>
    <div class="crm-chips">${[['All', total], ...present].map(([c, n]) => `<button type="button" class="crm-chip${S.continent === c ? ' active' : ''}" data-continent="${esc(c)}">${esc(c)} <b>${n}</b></button>`).join('')}</div></section>`;
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
  const rec = S.records;
  const due = rec.partner.filter(p => p.data.next_follow_up && p.data.next_follow_up <= today() && p.data.stage !== 'Closed').length;
  const steps = [['Research', 'Directory & mapping', 'Partnership mapping'], ['Contact', 'Email & social outreach', 'Outreach'], ['Engage', 'Replies & interviews', 'Conversations'], ['Assess', 'Partnership assessment', 'Partnership assessment (PAT)'], ['Partner', 'Agree the relationship', 'Partnership tracking'], ['Track', 'Follow-ups & renewals', 'Partnership tracking']];
  return `<section class="grid four crm-cards">
      ${card(S.hasDirectory ? 'Published organisations' : 'Organisations', s.orgs, S.hasDirectory ? 'Live from the Ethical Bridge directory' : 'Added to this workspace')}
      ${card('Organisations emailed', s.sent, pct(s.sent, s.orgs) + ' of this selection')}
      ${card('Replies', s.replied, pct(s.replied, s.sent) + ' reply rate · ' + s.interviewed + ' interviewed')}
      ${(() => { if (!S.subs) return card('Newsletter subscribers', '…', 'Live from Brevo'); const a = newsletterRows().filter(r => r.sub.subscribed); const m = a.filter(r => r.org && inContinent(r.org)).length; return card('Newsletter subscribers', a.length, m + ' matched to organisations' + (S.continent === 'All' ? '' : ' in ' + S.continent)); })()}
      ${card('Stakeholders mapped', rec.stakeholder.length, rec.goal.filter(g => g.data.wording).length + ' / 4 CSP goals entered')}
      ${card('Partnership assessments', rec.assessment.length, rec.assessment.filter(a => a.data.status === 'Approved').length + ' approved')}
      ${card('Partnerships tracked', rec.partner.length, due ? due + ' follow-ups due' : 'No follow-ups due', due ? 'warn' : '')}
      ${(() => { const w = S.msgs ? conversations().filter(c => c.status === 'waiting' && inContinent(c.o)).length : null; return card('Waiting for my reply', w ?? '…', 'Pinned emails · see Conversations', w ? 'warn' : ''); })()}
    </section>
    <section class="panel"><span class="eyebrow">End-to-end workflow</span><h2>From discovery to lasting partnerships</h2>
      <ol class="crm-flow">${steps.map(([t, d, v], i) => `<li><button type="button" data-tab="${esc(v)}"><b>${i + 1}</b><span>${esc(t)}</span><small>${esc(d)}</small></button></li>`).join('')}</ol></section>`;
}

// ---------- Outreach: organisations & contacts (first part of the Outreach tab) ----------
function renderOrganisations() {
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
      <td class="crm-org"><button class="link" data-action="org" data-id="${esc(o.id)}">${esc(o.name)}</button>${o.own ? ' <span class="pill dim">Added here</span>' : ''}${o.website ? `<a class="tiny" href="${esc(o.website)}" target="_blank" rel="noopener noreferrer">Website ↗</a>` : ''}</td>
      <td>${os('interview_status', INTERVIEW, r.interview_status)}${r.interview_status === 'Scheduled' ? `<input type="date" class="crm-idate" data-out="interview_date" data-id="${esc(o.id)}" value="${esc(r.interview_date || '')}" aria-label="Interview date for ${esc(o.name)}" title="Interview date">` : ''}</td>
      <td><input data-out="contact_person" data-id="${esc(o.id)}" value="${esc(r.contact_person)}" aria-label="Personal contact for ${esc(o.name)}"></td>
      <td>${o.email ? esc(o.email) : '<span class="muted">—</span>'}</td><td>${esc(o.phone) || '<span class="muted">—</span>'}</td>
      <td><input data-out="personal_phone" data-id="${esc(o.id)}" value="${esc(r.personal_phone)}" aria-label="Personal phone for ${esc(o.name)}"></td>
      <td>${os('email_status', EMAIL, r.email_status)}</td>
      <td><input type="date" data-out="date_sent" data-id="${esc(o.id)}" value="${esc(r.date_sent || '')}" aria-label="Date sent to ${esc(o.name)}"></td>
      <td>${os('instagram_status', SOCIAL, r.instagram_status)}</td><td>${os('facebook_status', SOCIAL, r.facebook_status)}</td><td>${os('linkedin_status', SOCIAL, r.linkedin_status)}</td>
      <td>${os('reply_status', REPLY, r.reply_status)}</td></tr>`;
  });
  return `<section class="rowhead section-head"><h2>Outreach</h2><div class="actions"><button class="button secondary" data-action="add-org">+ Add organisation</button><button class="button" data-action="export-orgs">Export</button></div></section>
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

// ---------- Conversations (one row per organisation that replied) ----------
const CONV_STATUS = [['waiting', 'Waiting for my reply'], ['theirs', 'They wrote last'], ['mine', 'I replied last'], ['none', 'No emails saved yet']];
const AUTO_RE = /^(automatic reply|auto(matic)?[ -]?(reply|response)|out of (the )?office|r[ée]ponse automatique|respuesta autom[áa]tica|resposta autom[áa]tica|abwesenheit)/i;
const snip = (t, n = 260) => { const x = String(t || '').replace(/\s+/g, ' ').trim(); return x.length > n ? x.slice(0, n).replace(/\s\S*$/, '') + '…' : x; };
function conversations() {
  const by = new Map();
  for (const m of S.msgs || []) { if (!by.has(m.org_id)) by.set(m.org_id, []); by.get(m.org_id).push(m); }
  const ids = new Set([...by.keys(), ...[...S.outreach.values()].filter(r => r.reply_status === 'Replied').map(r => r.org_id)]);
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
    out.push({ o, id, all, first, mine, back, last, flagged, status, nIn: ins.length, nOut: all.length - ins.length });
  }
  return out;
}
function filteredConversations(list) {
  const f = S.cf, n = norm(f.name), e = norm(f.email);
  return list.filter(c => inContinent(c.o) && (!f.region || c.o.region === f.region) && (!f.country || c.o.country === f.country)
    && (!n || norm(c.o.name).includes(n) || norm(c.o.registered).includes(n))
    && (!e || norm(c.o.email).includes(e) || c.all.some(m => norm(m.from_addr).includes(e)))
    && (!f.status || c.status === f.status))
    .sort((a, b) => byCountry(a.o, b.o));
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
  const qb = (label, v, key, tone = '') => `<button type="button" data-cquick="${key}" class="${(f.status || '') === key && !f.region && !f.country && !f.name && !f.email ? 'active' : ''} ${tone}"><b>${v}</b><span>${esc(label)}</span></button>`;
  const msgCell = (m, who) => m ? `<div class="crm-msg">${who ? `<span class="tiny">From ${esc(who)}</span>` : `<b>${esc(fmtDate(m.sent_at))}</b>`}<p>${esc(snip(m.body) || '(no text)')}</p></div>` : '<span class="muted">—</span>';
  const rows = list.map(c => {
    const st = CONV_STATUS.find(x => x[0] === c.status)[1];
    const fromName = c.first ? (c.first.from_name || c.first.from_addr) : '';
    return `<tr class="${c.status === 'waiting' ? 'waiting' : ''}">
      <td>${esc(c.o.country)}</td>
      <td class="crm-org"><button class="link" data-action="thread" data-id="${esc(c.id)}">${esc(c.o.name)}</button><span class="tiny">${esc(c.o.email || c.first?.from_addr || '')}</span></td>
      <td>${c.first ? esc(fmtDate(c.first.sent_at)) : '<span class="muted">—</span>'}</td>
      <td class="crm-text">${msgCell(c.first, fromName)}</td>
      <td class="crm-text">${c.mine ? msgCell(c.mine) : c.first ? '<span class="pill warn">Not answered yet</span>' : '<span class="muted">—</span>'}</td>
      <td>${c.back ? `<span class="pill">Yes</span><br><span class="tiny">${esc(fmtDate(c.back.sent_at))}</span>` : c.mine ? '<span class="pill dim">Not yet</span>' : '<span class="muted">—</span>'}</td>
      <td>${c.status === 'waiting' ? '<span class="crm-pin" aria-hidden="true">📌</span> ' : ''}<b class="crm-st-${c.status}">${esc(st)}</b>${c.last ? `<br><span class="tiny">Last email ${esc(fmtDate(c.last.sent_at))}</span>` : ''}</td>
      <td><button class="button secondary small" data-action="thread" data-id="${esc(c.id)}">Open (${c.all.length})</button></td></tr>`;
  });
  const active = Object.entries(f).filter(([, v]) => v);
  const LBL = { region: 'Region', country: 'Country', name: 'Name', email: 'Email', status: 'Status' };
  return `<section class="rowhead section-head"><h2>Conversations</h2><div class="actions"><button class="button secondary" data-action="reload-msgs">Refresh</button><button class="button" data-action="export-conv">Export</button></div></section>
    ${S.msgsError ? `<div class="notice warn" role="alert">${esc(S.msgsError)}</div>` : ''}
    <section class="crm-groups crm-conv-groups">
      <div class="crm-group crm-group-all crm-quick">${qb('Organisations that replied', base.length, '')}</div>
      <div class="crm-group"><h3>Status</h3><div class="crm-quick">${qb('Waiting for my reply', count('waiting'), 'waiting', 'crm-q-wait')}${qb('They wrote last', count('theirs'), 'theirs')}${qb('I replied last', count('mine'), 'mine')}${count('none') ? qb('No emails saved yet', count('none'), 'none') : ''}</div></div>
    </section>
    <p class="tiny crm-hint">📌 “Waiting for my reply” are the emails you pinned (flagged) in your mailbox. Click a number to list those organisations.</p>
    <section class="panel crm-filters">
      <div class="crm-frow"><b>General</b>
        <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
        <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
        <label><span>Organisation name</span><input data-cfilter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Search by name"></label>
        <label><span>Email address</span><input data-cfilter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email)}" placeholder="Search by email"></label>
        <label><span>Status</span>${sel('status', CONV_STATUS, 'All statuses')}</label>
        <button class="button secondary small" data-action="clear-cfilters">Clear filters</button></div>
    </section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Email conversations</span><p class="tiny crm-legend"><i class="r"></i> Waiting for your reply (pinned in your mailbox) · sorted by country A–Z</p></div><span class="tiny"><b>${list.length}</b> organisations</span></div>
    ${active.length ? `<div class="crm-active" role="status"><span>Showing only:</span>${active.map(([k, v]) => `<button type="button" data-cunfilter="${esc(k)}" title="Remove this filter">${esc(LBL[k])}: ${esc(k === 'status' ? CONV_STATUS.find(x => x[0] === v)?.[1] : v)} <b aria-hidden="true">✕</b></button>`).join('')}</div>` : ''}
    <div class="tablewrap crm-table crm-conv"><table><thead><tr>${['Country', 'Organisation', 'They replied', 'What they said', 'My response', 'They replied back?', 'Status', 'Thread'].map(h => `<th>${h}</th>`).join('')}</tr></thead>
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
    <div class="actions">${c.nIn ? (c.flagged ? `<button class="button" data-action="unpin" data-id="${esc(id)}">Mark as answered (remove pin)</button>` : `<button class="button secondary" data-action="pin" data-id="${esc(id)}">📌 Mark as waiting for my reply</button>`) : ''}<button class="button secondary" data-action="org" data-id="${esc(id)}">Outreach marks</button></div>
    <p class="tiny">Pins changed here stay in the CRM; they don't change the pin in your mailbox.</p>
    <div class="crm-thread">${msgs || '<p class="muted">No emails saved for this organisation yet. It is listed because its reply is marked “Replied”.</p>'}</div>`);
}
function exportConversations() {
  const list = filteredConversations(conversations());
  downloadCsv(`ethical-bridge-conversations-${S.continent === 'All' ? 'all' : norm(S.continent).replace(/\W+/g, '-')}-${today()}.csv`,
    ['continent', 'region', 'country', 'organisation', 'email', 'they_replied', 'what_they_said', 'my_response_date', 'my_response', 'they_replied_back', 'status', 'last_email', 'messages'],
    list.map(c => [c.o.continent, c.o.region, c.o.country, c.o.name, c.o.email || c.first?.from_addr || '', c.first?.sent_at.slice(0, 10) || '', c.first?.body || '', c.mine?.sent_at.slice(0, 10) || '', c.mine?.body || '', c.back ? 'Yes ' + c.back.sent_at.slice(0, 10) : c.mine ? 'Not yet' : '', CONV_STATUS.find(x => x[0] === c.status)[1], c.last?.sent_at.slice(0, 10) || '', c.all.length]));
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
    if (f.region && r.org?.region !== f.region) return false;
    if (f.country && r.org?.country !== f.country) return false;
    if (n && !norm(r.org?.name).includes(n) && !norm(`${r.sub.first_name} ${r.sub.last_name}`).includes(n)) return false;
    if (e && !norm(r.sub.email).includes(e)) return false;
    if (S.nfReplied && !(r.org && outreachOf(r.org.id).reply_status === 'Replied')) return false;
    return true;
  }).sort((a, b) => ('same other none'.indexOf(a.kind) - 'same other none'.indexOf(b.kind)) || (a.org && b.org ? byCountry(a.org, b.org) : a.sub.email.localeCompare(b.sub.email)));
}
function renderNewsletter() {
  if (S.subs === null) return `<p class="muted crm-loading">Loading the newsletter list…</p>`;
  const rows = newsletterRows(), active = rows.filter(r => r.sub.subscribed);
  const matched = active.filter(r => r.org), count = k => active.filter(r => r.kind === k).length;
  const gone = rows.filter(r => !r.sub.subscribed).length;
  const replied = new Set(matched.filter(r => outreachOf(r.org.id).reply_status === 'Replied').map(r => r.org.id)).size;
  const regions = [...new Set(matched.map(r => r.org.region).filter(Boolean))].sort();
  const countries = [...new Set(matched.filter(r => !S.nf.region || r.org.region === S.nf.region).map(r => r.org.country).filter(Boolean))].sort();
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
      <td><button class="button secondary small" data-action="nl-pick" data-id="${esc(s.id)}">${o ? 'Change' : 'Link'}</button></td></tr>`;
  });
  return `<section class="rowhead section-head"><h2>Newsletter</h2><div class="actions"><button class="button secondary" data-action="reload-nl">Refresh</button><label class="button secondary nl-upload">Import Brevo CSV<input type="file" accept=".csv,text/csv" data-action="nl-csv" hidden></label><button class="button" data-action="export-nl">Export</button></div></section>
    ${S.subsError ? `<div class="notice warn" role="alert">${esc(S.subsError)}</div>` : ''}
    <section class="crm-groups crm-conv-groups">
      <div class="crm-group crm-group-all crm-quick">${qb('All subscribers', active.length, 'all')}</div>
      <div class="crm-group"><h3>Match with Ethical Bridge</h3><div class="crm-quick nl-quick">${qb(NL_KIND.same, count('same'), 'same', 'nl-same')}${qb(NL_KIND.other, count('other'), 'other', 'nl-other')}${qb(NL_KIND.none, count('none'), 'none', 'nl-none')}</div></div>
      <div class="crm-group"><h3>Engagement</h3><div class="crm-quick">${qb('Organisations that also replied', replied, 'replied')}${qb('Unsubscribed', gone, 'gone')}</div></div>
    </section>
    <p class="tiny crm-hint nl-legend"><span><i class="nl-dot nl-same"></i>Green: the subscriber’s email is the one on the organisation’s Ethical Bridge profile.</span><span><i class="nl-dot nl-other"></i>Amber: we found the organisation through another email (the one they replied from, their web domain, their name, or linked by hand).</span><span><i class="nl-dot nl-none"></i>Red: no organisation in Ethical Bridge yet, including our own team addresses. Use “Link” to match one.</span></p>
    <p class="tiny crm-hint">From the Brevo newsletter list. To add new sign-ups, export the list from Brevo and use “Import Brevo CSV”.</p>
    <section class="panel crm-filters"><div class="crm-frow"><b>General</b>
      <label><span>Region</span>${sel('region', regions, 'All regions')}</label>
      <label><span>Country</span>${sel('country', countries, 'All countries')}</label>
      <label><span>Name</span><input data-nfilter="name" class="${f.name ? 'crm-on' : ''}" value="${esc(f.name)}" placeholder="Organisation or person"></label>
      <label><span>Email address</span><input data-nfilter="email" class="${f.email ? 'crm-on' : ''}" value="${esc(f.email)}" placeholder="Search by email"></label>
      <label><span>Match</span>${sel('match', [['same', 'Same email (green)'], ['other', 'Different email (amber)'], ['none', 'No match (red)']], 'All')}</label>
      <label><span>Status</span>${sel('status', ['Subscribed', 'Unsubscribed'], 'All')}</label>
      <button class="button secondary small" data-action="clear-nfilters">Clear filters</button></div></section>
    <section class="panel"><div class="rowhead"><div><span class="eyebrow">Newsletter subscribers</span></div><span class="tiny"><b>${list.length}</b> subscribers</span></div>
    <div class="tablewrap crm-table crm-conv"><table><thead><tr>${['Country', 'Organisation', 'Subscriber', 'Subscribed', 'How matched', 'Outreach', ''].map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${trs.join('') || '<tr><td colspan="7">No subscribers match these filters.</td></tr>'}</tbody></table></div></section>`;
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
  downloadCsv(`ethical-bridge-newsletter-${today()}.csv`, ['email', 'first_name', 'last_name', 'status', 'subscribed', 'organisation', 'continent', 'region', 'country', 'match_group', 'how_matched', 'reply_status'],
    filteredNewsletter().map(r => [r.sub.email, r.sub.first_name, r.sub.last_name, r.sub.subscribed ? 'Subscribed' : 'Unsubscribed', (r.sub.subscribed_at || '').slice(0, 10), r.org?.name || '', r.org?.continent || '', r.org?.region || '', r.org?.country || '', NL_KIND[r.kind], r.how, r.org ? outreachOf(r.org.id).reply_status : '']));
}

function orgModal(id) {
  const o = S.orgById.get(id); if (!o) return '';
  const r = outreachOf(id);
  const info = [['Registered name', o.registered], ['Location', [o.city, o.country, o.region, o.continent].filter(Boolean).join(', ')], ['Public email', o.email], ['Public phone', o.phone], ['Website', o.website]].filter(([, v]) => v);
  return modal(o.name, `<dl class="kv">${info.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${k === 'Website' ? `<a href="${esc(v)}" target="_blank" rel="noopener noreferrer">${esc(v)}</a>` : esc(v)}</dd>`).join('')}</dl>
    <form class="form" data-form="org-outreach" data-id="${esc(id)}">
      ${selectField('Interview', 'interview_status', INTERVIEW, r.interview_status, '')}${field('Interview date (if planned)', 'interview_date', r.interview_date || '', 'date')}${field('Personal contact', 'contact_person', r.contact_person)}${field('Personal phone', 'personal_phone', r.personal_phone)}
      ${selectField('Email status', 'email_status', EMAIL, r.email_status, '')}${field('Date sent', 'date_sent', r.date_sent || '', 'date')}${selectField('Reply', 'reply_status', REPLY, r.reply_status, '')}
      ${selectField('Instagram', 'instagram_status', SOCIAL, r.instagram_status, '')}${selectField('Facebook', 'facebook_status', SOCIAL, r.facebook_status, '')}${selectField('LinkedIn', 'linkedin_status', SOCIAL, r.linkedin_status, '')}
      ${field('Notes', 'notes', r.notes, 'area')}
      <div class="actions field full"><button class="button" type="submit">Save</button>${o.own ? `<button class="button danger" type="button" data-action="delete-org" data-id="${esc(o.rowId)}">Delete organisation</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div>
      ${o.own ? '' : '<p class="tiny field full">Name, contact details and location come from the Ethical Bridge directory. Correct them on ethicalbridge.org.</p>'}
    </form>`);
}

function addOrgModal() {
  return modal('Add organisation', `<form class="form" data-form="add-org">${field('Organisation name', 'name', '', 'text', 'required')}${selectField('Continent', 'continent', CONTINENTS, S.continent === 'All' ? '' : S.continent)}${field('Region', 'region')}${field('Country', 'country')}${field('City', 'city')}${field('Public email', 'email', '', 'email')}${field('Public phone', 'phone')}${field('Website', 'website', '', 'url', 'placeholder="https://"')}
    <div class="actions field full"><button class="button" type="submit">Add organisation</button><button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`,
  S.hasDirectory ? 'Use this for organisations that are not in the Ethical Bridge directory. Directory organisations appear automatically.' : '');
}

function exportOrgs() {
  const list = filteredOrgs();
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

// ---------- Partnership mapping ----------
const goalOf = n => S.records.goal.find(g => Number(g.data.goal) === n);
function renderMapping() {
  const st = S.records.stakeholder; const m = S.mapF; const q = norm(m.q);
  const list = st.filter(x => (!m.goal || String(x.data.goal) === m.goal) && (!m.role || x.data.role === m.role) && (!m.type || x.data.org_type === m.type) && (!m.engaged || x.data.previous_engagement === m.engaged) && (!q || norm([x.data.name, x.data.locations, x.data.manager, x.data.next_steps].join(' ')).includes(q)));
  const roleCount = r => st.filter(x => x.data.role === r).length;
  const names = (g, r) => st.filter(x => Number(x.data.goal) === g && x.data.role === r).map(x => esc(x.data.name)).join(', ') || '—';
  return `<section class="panel"><span class="eyebrow">Partnership mapping</span><h2>Partner scoping overview</h2>
    <div class="crm-stats">${[['Stakeholders', st.length], ['Goals with entries', [1, 2, 3, 4].filter(g => st.some(x => Number(x.data.goal) === g)).length + ' / 4'], ...ROLES.map(r => [r, roleCount(r)])].map(([l, v]) => `<div><b>${v}</b><span>${esc(l)}</span></div>`).join('')}</div></section>
  <section class="panel"><h3>CSP goal areas</h3><div class="grid four">${[1, 2, 3, 4].map(n => { const g = goalOf(n)?.data || {}; const c = st.filter(x => Number(x.data.goal) === n).length; return `<button type="button" class="card crm-goal" data-action="edit-goal" data-goal="${n}"><span class="eyebrow">Goal ${n}</span><div class="metric">${c}</div><p>${c === 1 ? 'stakeholder' : 'stakeholders'}</p><p class="tiny">${esc(g.wording || 'Strategic goal not entered yet')}</p>${g.completed_by ? `<p class="tiny">Scoped by ${esc(g.completed_by)}${g.date_completed ? ' · ' + esc(fmtDate(g.date_completed)) : ''}</p>` : ''}</button>`; }).join('')}</div></section>
  <section class="panel"><h3>CSP stakeholder map</h3><div class="tablewrap"><table><thead><tr><th>CSP goal</th><th>Strategic Partners</th><th>Challengers</th><th>Allies</th></tr></thead><tbody>${[1, 2, 3, 4].map(n => `<tr><td><b>Goal ${n}</b><br><span class="tiny">${esc(goalOf(n)?.data.wording || 'Goal not entered yet')}</span></td><td>${names(n, 'Strategic Partner')}</td><td>${names(n, 'Challenger')}</td><td>${names(n, 'Ally')}</td></tr>`).join('')}</tbody></table></div></section>
  <section class="panel"><div class="rowhead"><h3>Filter stakeholders</h3></div>
    <div class="crm-frow"><label><span>Search</span><input data-mapf="q" value="${esc(m.q)}" placeholder="Search this view"></label><label><span>Goal</span><select data-mapf="goal">${opts([1, 2, 3, 4].map(n => [String(n), 'Goal ' + n]), m.goal, 'All goals')}</select></label><label><span>Role</span><select data-mapf="role">${opts(ROLES, m.role, 'All roles')}</select></label><label><span>Organisation type</span><select data-mapf="type">${opts(ORG_TYPES, m.type, 'All organisation types')}</select></label><label><span>Previous engagement</span><select data-mapf="engaged">${opts(['Yes', 'No'], m.engaged, 'All')}</select></label><button class="button secondary small" data-action="clear-mapf">Clear filters</button></div>
    <div class="rowhead"><span class="tiny">Stakeholders <b>${list.length}</b> of ${st.length}</span><div class="actions"><button class="button secondary" data-action="export-stakeholders">Export</button><button class="button" data-action="add-stakeholder">Add stakeholder</button></div></div>
    <div class="tablewrap"><table><thead><tr><th>Goal</th><th>Stakeholder</th><th>Type</th><th>Locations</th><th>Previous engagement</th><th>Role</th><th>Relationship manager</th><th>Next steps</th><th></th></tr></thead><tbody>${list.map(x => { const d = x.data; return `<tr><td>${d.goal ? 'Goal ' + esc(d.goal) : '—'}</td><td><b>${esc(d.name)}</b></td><td>${esc(d.org_type)}</td><td>${esc(d.locations)}</td><td>${esc(d.previous_engagement)}</td><td>${d.role ? `<span class="pill">${esc(d.role)}</span>` : ''}</td><td>${esc(d.manager)}</td><td>${esc(d.next_steps)}</td><td><button class="link" data-action="edit-stakeholder" data-id="${x.id}">Edit</button></td></tr>`; }).join('') || `<tr><td colspan="9">${st.length ? 'No stakeholders match these filters.' : 'No stakeholders have been scoped yet. Add the first one to begin.'}</td></tr>`}</tbody></table></div></section>`;
}
function goalModal(n) {
  const g = goalOf(n); const d = g?.data || {};
  return modal(`CSP goal ${n}`, `<form class="form" data-form="goal" data-goal="${n}" data-id="${esc(g?.id || '')}">${field('Strategic goal', 'wording', d.wording, 'area')}${field('Date completed', 'date_completed', d.date_completed, 'date')}${field('Completed by / scoping lead', 'completed_by', d.completed_by)}
    <div class="actions field full"><button class="button" type="submit">Save goal</button><button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`, 'Enter the wording of this Country Strategic Plan goal and who completed its stakeholder scoping.');
}
function stakeholderModal(id) {
  const x = S.records.stakeholder.find(s => s.id === id); const d = x?.data || {};
  return modal(x ? 'Edit stakeholder' : 'Add stakeholder', `<form class="form" data-form="stakeholder" data-id="${esc(id || '')}">
    <h3 class="field full">Stakeholder profile</h3>
    ${selectField('CSP goal area', 'goal', [1, 2, 3, 4].map(n => [String(n), 'Goal ' + n]), d.goal)}
    ${field('Stakeholder name', 'name', d.name, 'text', 'required list="crm-org-names"')}
    ${field('Profile and website', 'profile', d.profile, 'area')}
    ${selectField('Organisation type', 'org_type', ORG_TYPES, d.org_type)}${field('Size (staff, budget, offices)', 'size', d.size)}${field('Locations / regions where present', 'locations', d.locations)}
    <h3 class="field full">Relationship and contribution</h3>
    ${selectField('Previous engagement with us?', 'previous_engagement', ['Yes', 'No'], d.previous_engagement)}
    ${field('Current relationship', 'current_relationship', d.current_relationship, 'area')}${field('Collaboration, alignment and knowledge sharing', 'collaboration', d.collaboration, 'area')}
    <h3 class="field full">Relationship ownership and next steps</h3>
    ${selectField('Stakeholder role', 'role', ROLES, d.role)}${field('Relationship manager / liaison', 'manager', d.manager)}${field('Next steps', 'next_steps', d.next_steps, 'area')}
    <div class="actions field full"><button class="button" type="submit">Save stakeholder</button>${x ? `<button class="button danger" type="button" data-action="delete-record" data-kind="stakeholder" data-id="${x.id}">Delete</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div></form>${orgDatalist()}`);
}
const orgDatalist = () => `<datalist id="crm-org-names">${S.orgs.slice(0, 5000).map(o => `<option value="${esc(o.name)}">`).join('')}</datalist>`;

// ---------- PAT ----------
function patScores(d) {
  const answers = d.answers || {};
  const areas = PAT_SECTIONS.map(sec => {
    let sum = 0, scored = 0, na = 0;
    for (const q of sec.questions) { const v = answers[q.id]?.score; if (v === 'na') na++; else if (v) { sum += Number(v); scored++; } }
    return { n: sec.n, short: sec.short, sum, scored, na, total: sec.questions.length, max: sec.questions.length * 5, avg: scored ? sum / scored : null };
  });
  const sum = areas.reduce((a, b) => a + b.sum, 0), scored = areas.reduce((a, b) => a + b.scored, 0), na = areas.reduce((a, b) => a + b.na, 0);
  return { areas, sum, scored, answered: scored + na, total: 109, max: 545, avg: scored ? sum / scored : null };
}
const avgTxt = v => v == null ? '—' : v.toFixed(1);
function renderPat() {
  if (S.pat) return renderPatEditor();
  const list = S.records.assessment.filter(a => !S.patFilter || a.id === S.patFilter);
  return `<section class="panel"><div class="rowhead"><div><span class="eyebrow">Partner assessment</span><h2>Partnership Assessment Tool</h2><p class="muted">Score each assessment area from 1 to 5, record the evidence, and review the partner’s overall position.</p></div><button class="button" data-action="new-pat">+ New assessment</button></div>
    <div class="crm-frow"><label><span>Filter by partner</span><select data-action="pat-filter">${opts(S.records.assessment.map(a => [a.id, a.data.partner_name || 'Untitled assessment']), S.patFilter, 'All partners')}</select></label><span class="tiny">Partners assessed <b>${S.records.assessment.length}</b></span></div></section>
    <section class="crm-pat-list">${list.map(a => { const sc = patScores(a.data); return `<article class="panel crm-pat-card"><div class="rowhead"><div><h3>${esc(a.data.partner_name || 'Untitled assessment')}</h3><span class="pill">${esc(a.data.status || 'Draft')}</span> <span class="tiny">${esc(fmtDate(a.data.assessment_date))}${a.data.assessor ? ' · ' + esc(a.data.assessor) : ''}</span></div><div class="crm-pat-score"><b>${avgTxt(sc.avg)}</b> / 5<br><span class="tiny">${sc.sum} / ${sc.max} possible points · ${sc.answered}/${sc.total} scored</span></div></div>
      <div class="crm-pat-areas">${sc.areas.map(x => `<div><span>${esc(x.short)}</span><b>${avgTxt(x.avg)}</b></div>`).join('')}</div>
      <button class="link" data-action="open-pat" data-id="${a.id}">View assessment →</button></article>`; }).join('') || '<div class="empty">No partner assessments yet. Start one with “+ New assessment”.</div>'}</section>`;
}
function renderPatEditor() {
  const d = S.pat.data; const sc = patScores(d);
  const nav = ['Partner & scope', ...PAT_SECTIONS.map(s => `${s.n}. ${s.title}`), '9. Capacity Strengthening Plan', '10. Recommendation'];
  const i = S.patSection;
  let body = '';
  if (i === 0) body = `<h3>Partner &amp; proposed scope of work</h3><p class="muted">Capture the partner profile and proposed work before assessing capacity.</p><div class="form" data-pat-form>${PAT_PROFILE.map(([k, l, t]) => k === 'org_id' ? `<label class="field"><span class="label">${esc(l)}</span><input data-pat="${k}" list="crm-org-names" value="${esc(d[k] ? (S.orgById.get(d[k])?.name || d[k]) : '')}"></label>` : t === 'area' ? `<label class="field full"><span class="label">${esc(l)}</span><textarea data-pat="${k}">${esc(d[k])}</textarea></label>` : `<label class="field"><span class="label">${esc(l)}</span><input data-pat="${k}" type="${t || 'text'}" value="${esc(d[k])}"></label>`).join('')}</div>${orgDatalist()}`;
  else if (i <= 8) {
    const sec = PAT_SECTIONS[i - 1]; const a = sc.areas[i - 1];
    body = `<h3>${sec.n}. ${esc(sec.title)}</h3><p class="muted">Record a score and the evidence behind it. Leave an item blank if it has not been assessed.</p><p class="tiny">${a.sum} / ${a.max} possible · ${a.scored + a.na}/${a.total} scored · Average ${avgTxt(a.avg)} / 5</p>
      ${sec.questions.map(q => { const ans = (d.answers || {})[q.id] || {}; return `<div class="crm-q"><div class="crm-q-head"><span class="crm-q-no">${esc(q.no)}</span><span class="tiny">${esc(q.cat)}</span></div><p>${esc(q.q)}</p>${q.g ? `<details><summary>Guidance and verification prompts</summary><div class="crm-guidance">${esc(q.g).replace(/\n/g, '<br>')}</div></details>` : ''}
        <div class="crm-q-row"><label><span class="label">Score (1–5)</span><select data-score="${q.id}">${opts(Object.entries(SCORE_LABELS), ans.score, 'Not scored')}</select></label><label class="grow"><span class="label">Comments / action</span><textarea data-comment="${q.id}" rows="2">${esc(ans.comment)}</textarea></label></div></div>`; }).join('')}`;
  } else if (i === 9) body = `<h3>Capacity Strengthening Plan</h3><p class="muted">Agree priority actions with the partner, including responsibility and timing. Use the assessment evidence above to guide the plan.</p><label class="field full"><span class="label">Actions, owners, milestones and support required</span><textarea data-pat="plan" rows="10">${esc(d.plan)}</textarea></label>`;
  else body = `<h3>Recommendation</h3><p class="muted">Document the team’s recommendation and conditions. This decision should follow review of the qualification, scope and capacity evidence.</p><div class="form"><label class="field"><span class="label">Assessment status</span><select data-pat="status">${opts(PAT_STATUS, d.status || 'Draft')}</select></label><label class="field full"><span class="label">Recommendation and rationale</span><textarea data-pat="recommendation">${esc(d.recommendation)}</textarea></label><label class="field full"><span class="label">Conditions and risk mitigation</span><textarea data-pat="conditions">${esc(d.conditions)}</textarea></label><label class="field full"><span class="label">Reviewers, sign-off and date</span><textarea data-pat="signoff">${esc(d.signoff)}</textarea></label></div>`;
  return `<section class="panel crm-pat-head"><div class="rowhead"><div><button class="link" data-action="close-pat">← All assessments</button><h2>${esc(d.partner_name || 'New assessment')}</h2><span class="tiny">${sc.answered}/${sc.total} scored${S.pat.dirty ? ' · <b>Unsaved changes</b>' : ''}</span></div><div class="actions"><button class="button" data-action="save-pat">Save assessment</button>${S.pat.id ? '<button class="button secondary" data-action="print">Print / save PDF</button><button class="button danger" data-action="delete-pat">Delete</button>' : ''}</div></div>
    <div class="crm-stats"><div><b>${avgTxt(sc.avg)} / 5</b><span>Overall average</span></div><div><b>${sc.sum} / ${sc.max}</b><span>Total score</span></div><div><b>${sc.answered} / ${sc.total}</b><span>Coverage</span></div>${sc.areas.map(a => `<div><b>${avgTxt(a.avg)}</b><span>${String(a.n).padStart(2, '0')} ${esc(a.short)} · ${a.sum}/${a.max}</span></div>`).join('')}</div>
    <p class="tiny">Unanswered and N/A questions do not lower averages. Scores: 1 major gaps · 2 limited · 3 partial · 4 mostly in place · 5 strong.</p></section>
    <div class="crm-pat-layout"><nav class="crm-pat-nav" aria-label="Assessment sections">${nav.map((t, k) => `<button type="button" class="${k === i ? 'active' : ''}" data-pat-section="${k}">${esc(t)}</button>`).join('')}</nav>
    <section class="panel crm-pat-body">${body}<div class="actions"><button class="button secondary" data-pat-section="${Math.max(0, i - 1)}" ${i ? '' : 'disabled'}>Previous</button><button class="button secondary" data-pat-section="${Math.min(nav.length - 1, i + 1)}" ${i < nav.length - 1 ? '' : 'disabled'}>Next section →</button></div></section></div>`;
}

// ---------- Partnership tracking ----------
const TRACK_FIELDS = [['org_id', 'Directory organisation (optional)'], ['partner', 'Partner / relationship', 'text', 'required'], ['relationship_type', 'Relationship type'], ['started', 'Relationship started', 'date'], ['last_contact', 'Last contact', 'date'], ['next_follow_up', 'Next follow-up', 'date'], ['review_date', 'Review / renewal date', 'date'], ['primary_contact', 'Primary contact'], ['contact_email', 'Contact email', 'email'], ['contact_phone', 'Contact phone'], ['communication_prefs', 'Communication preferences'], ['shared_objectives', 'Shared objectives', 'area'], ['commitments', 'Commitments and promises', 'area'], ['other_dates', 'Other important dates'], ['important_info', 'Important relationship information', 'area'], ['risks', 'Risks / sensitivities', 'area'], ['next_step', 'Next step']];
function renderTracking() {
  const q = norm(S.trackQ);
  const list = S.records.partner.filter(p => !q || norm(Object.values(p.data).join(' ')).includes(q)).sort((a, b) => String(a.data.next_follow_up || '9999').localeCompare(String(b.data.next_follow_up || '9999')));
  return `<section class="panel"><div class="rowhead"><div><span class="eyebrow">Connected records</span><h2>Partnership tracking</h2></div><div class="actions"><button class="button secondary" data-action="export-partners">Export</button><button class="button" data-action="add-partner">+ Add record</button></div></div>
    <div class="crm-frow"><label><span>Search</span><input data-action="track-q" value="${esc(S.trackQ)}" placeholder="Search this view"></label><span class="tiny"><b>${list.length}</b> of ${S.records.partner.length} records</span></div>
    <div class="tablewrap"><table><thead><tr>${['Partner', 'Stage', 'Relationship', 'Primary contact', 'Started', 'Last contact', 'Next follow-up', 'Review / renewal', 'Next step', ''].map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${list.map(p => { const d = p.data; const overdue = d.next_follow_up && d.next_follow_up <= today() && d.stage !== 'Closed'; return `<tr><td><b>${esc(d.partner)}</b>${d.relationship_type ? `<br><span class="tiny">${esc(d.relationship_type)}</span>` : ''}</td><td>${d.stage ? `<span class="pill ${d.stage === 'Paused' ? 'warn' : d.stage === 'Closed' ? 'dim' : ''}">${esc(d.stage)}</span>` : ''}</td><td>${d.strength ? `<span class="pill ${d.strength === 'At risk' ? 'bad' : ''}">${esc(d.strength)}</span>` : ''}</td><td>${esc(d.primary_contact)}${d.contact_email ? `<br><span class="tiny">${esc(d.contact_email)}</span>` : ''}</td><td>${esc(fmtDate(d.started))}</td><td>${esc(fmtDate(d.last_contact))}</td><td class="${overdue ? 'crm-overdue' : ''}">${esc(fmtDate(d.next_follow_up))}${overdue ? ' · due' : ''}</td><td>${esc(fmtDate(d.review_date))}</td><td>${esc(d.next_step)}</td><td><button class="link" data-action="edit-partner" data-id="${p.id}">Edit</button></td></tr>`; }).join('') || '<tr><td colspan="10">No records yet. Add the partnerships you are building.</td></tr>'}</tbody></table></div></section>`;
}
function partnerModal(id, prefill = {}) {
  const p = S.records.partner.find(x => x.id === id); const d = p?.data || { stage: 'New', strength: 'New', ...prefill };
  return modal(p ? 'Edit partnership record' : 'Add to Partnership tracking', `<form class="form" data-form="partner" data-id="${esc(id || '')}">
    ${TRACK_FIELDS.slice(0, 3).map(([k, l, t, x]) => k === 'org_id' ? `<label class="field"><span class="label">${esc(l)}</span><input name="org_id" list="crm-org-names" value="${esc(d.org_id ? (S.orgById.get(d.org_id)?.name || d.org_id) : '')}"></label>` : field(l, k, d[k], t || 'text', x || '')).join('')}
    ${selectField('Relationship stage', 'stage', STAGES, d.stage)}${selectField('Relationship strength', 'strength', STRENGTH, d.strength)}
    ${TRACK_FIELDS.slice(3).map(([k, l, t]) => field(l, k, d[k], t || 'text')).join('')}
    <div class="actions field full"><button class="button" type="submit">Save record</button>${p ? `<button class="button danger" type="button" data-action="delete-record" data-kind="partner" data-id="${p.id}">Delete</button>` : ''}<button class="button secondary" type="button" data-action="close">Cancel</button></div></form>${orgDatalist()}`);
}
const orgIdFromName = v => { const s = String(v || '').trim(); if (!s) return ''; const o = S.orgs.find(x => x.name === s) || S.orgById.get(s); return o ? o.id : s; };

// ---------- modal ----------
function modal(title, body, intro = '') {
  return `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modalbox"><div class="rowhead"><h2>${esc(title)}</h2><button type="button" class="link" data-action="close" aria-label="Close">Close</button></div>${intro ? `<p class="muted">${esc(intro)}</p>` : ''}${body}</div></div>`;
}
function openModal(html) { S.modal = html; render(); root.querySelector('.modal input, .modal select, .modal textarea')?.focus(); }
function closeModal() { S.modal = ''; render(); }

// ---------- events ----------
let filterTimer = null;
root.addEventListener('click', async e => {
  const t = e.target.closest('[data-tab],[data-continent],[data-page],[data-action],[data-pat-section],[data-quick],[data-unfilter],[data-cquick],[data-cunfilter],[data-nquick]'); if (!t) return;
  if (t.matches('select,input,textarea')) return;
  if (t.hasAttribute('data-quick')) { const [k, v] = t.dataset.quick.split('='); S.f = EMPTY_FILTERS(); if (k) S.f[k] = v; S.page = 0; render(); root.querySelector('.crm-table')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-nquick')) { const q = t.dataset.nquick; S.nf = { region: '', country: '', name: '', email: '', match: ['same', 'other', 'none'].includes(q) ? q : '', status: q === 'gone' ? 'Unsubscribed' : 'Subscribed' }; S.nfReplied = q === 'replied'; render(); return; }
  if (t.hasAttribute('data-cquick')) { S.cf = { region: '', country: '', name: '', email: '', status: t.dataset.cquick }; render(); root.querySelector('.crm-conv')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
  if (t.hasAttribute('data-cunfilter')) { S.cf[t.dataset.cunfilter] = ''; if (t.dataset.cunfilter === 'region') S.cf.country = ''; return render(); }
  if (t.hasAttribute('data-unfilter')) { S.f[t.dataset.unfilter] = ''; if (t.dataset.unfilter === 'region') S.f.country = ''; S.page = 0; return render(); }
  if (t.dataset.tab) { if (S.pat?.dirty && !confirm('Leave this assessment without saving?')) return; S.pat = null; S.view = t.dataset.tab; S.modal = ''; render(); window.scrollTo(0, 0); return; }
  if (t.dataset.continent) { S.continent = t.dataset.continent; lsSet(LS.continent, S.continent); S.f.region = ''; S.f.country = ''; S.cf.region = ''; S.cf.country = ''; S.nf.region = ''; S.nf.country = ''; S.page = 0; render(); return; }
  if (t.dataset.page != null && t.dataset.page !== undefined && t.hasAttribute('data-page')) { S.page = Number(t.dataset.page); render(); root.querySelector('.crm-table')?.scrollIntoView({ block: 'start' }); return; }
  if (t.hasAttribute('data-pat-section')) { S.patSection = Number(t.dataset.patSection); render(); root.querySelector('.crm-pat-body')?.scrollIntoView({ block: 'start' }); return; }
  const a = t.dataset.action, id = t.dataset.id;
  switch (a) {
    case 'reload': return loadAll();
    case 'signout': if (S.pat?.dirty && !confirm('Lock the CRM without saving this assessment?')) return; S.pat = null; S.orgs = []; S.outreach = new Map(); return lockOut('The CRM is locked on this browser.');
    case 'close': return closeModal();
    case 'org': return openModal(orgModal(id));
    case 'thread': return openModal(threadModal(id));
    case 'pin': return setPin(id, true);
    case 'unpin': return setPin(id, false);
    case 'reload-nl': S.subs = null; render(); return loadNewsletter();
    case 'export-nl': return exportNewsletter();
    case 'clear-nfilters': S.nf = { region: '', country: '', name: '', email: '', match: '', status: 'Subscribed' }; S.nfReplied = false; return render();
    case 'nl-pick': S.nlQuery = ''; return openModal(nlPickModal(id));
    case 'nl-link': return nlLink(id, t.dataset.org);
    case 'reload-msgs': S.msgs = null; render(); return loadMessages();
    case 'export-conv': return exportConversations();
    case 'clear-cfilters': S.cf = { region: '', country: '', name: '', email: '', status: '' }; return render();
    case 'add-org': return openModal(addOrgModal());
    case 'export-orgs': return exportOrgs();
    case 'clear-filters': S.f = EMPTY_FILTERS(); S.page = 0; return render();
    case 'add-campaign': return openModal(campaignModal());
    case 'edit-campaign': return openModal(campaignModal(id));
    case 'edit-goal': return openModal(goalModal(Number(t.dataset.goal)));
    case 'add-stakeholder': return openModal(stakeholderModal());
    case 'edit-stakeholder': return openModal(stakeholderModal(id));
    case 'clear-mapf': S.mapF = { goal: '', role: '', type: '', engaged: '', q: '' }; return render();
    case 'export-stakeholders': return downloadCsv(`ethical-bridge-stakeholders-${today()}.csv`, ['Goal', 'Strategic goal', 'Stakeholder', 'Profile and website', 'Organisation type', 'Size', 'Locations', 'Previous engagement', 'Current relationship', 'Collaboration', 'Role', 'Relationship manager', 'Next steps'], S.records.stakeholder.map(x => { const d = x.data; return [d.goal, goalOf(Number(d.goal))?.data.wording || '', d.name, d.profile, d.org_type, d.size, d.locations, d.previous_engagement, d.current_relationship, d.collaboration, d.role, d.manager, d.next_steps]; }));
    case 'add-partner': return openModal(partnerModal());
    case 'edit-partner': return openModal(partnerModal(id));
    case 'export-partners': return downloadCsv(`ethical-bridge-partnerships-${today()}.csv`, ['Stage', 'Relationship strength', ...TRACK_FIELDS.map(f => f[1])], S.records.partner.map(p => [p.data.stage, p.data.strength, ...TRACK_FIELDS.map(([k]) => k === 'org_id' ? (S.orgById.get(p.data.org_id)?.name || p.data.org_id || '') : p.data[k] || '')]));
    case 'delete-record': {
      const kind = t.dataset.kind; if (!confirm('Delete this record? This cannot be undone.')) return;
      if (await deleteRecord(kind, id)) { S.modal = ''; flash('Deleted.'); } return;
    }
    case 'delete-org': {
      if (!confirm('Delete this organisation and its outreach marks?')) return;
      try { await api('org.delete', { id }); } catch (err) { return flash('Could not delete: ' + err.message); }
      S.orgs = S.orgs.filter(o => o.rowId !== id); S.orgById.delete('own:' + id); S.outreach.delete('own:' + id); S.modal = ''; return flash('Organisation deleted.');
    }
    case 'new-pat': S.pat = { id: null, data: { status: 'Draft', assessment_date: today(), answers: {} }, dirty: true }; S.patSection = 0; return render();
    case 'open-pat': { const r = S.records.assessment.find(x => x.id === id); S.pat = { id: r.id, data: structuredClone(r.data), dirty: false }; S.patSection = 0; return render(); }
    case 'close-pat': if (S.pat?.dirty && !confirm('Leave this assessment without saving?')) return; S.pat = null; return render();
    case 'save-pat': {
      if (!String(S.pat.data.partner_name || '').trim()) { S.patSection = 0; render(); return flash('Add the partner name before saving.'); }
      const row = await saveRecord('assessment', S.pat.id, S.pat.data); if (row) { S.pat = { id: row.id, data: structuredClone(row.data), dirty: false }; flash('Assessment saved.'); } return;
    }
    case 'delete-pat': if (!confirm('Delete this assessment? This cannot be undone.')) return; if (await deleteRecord('assessment', S.pat.id)) { S.pat = null; flash('Assessment deleted.'); } return;
    case 'print': return window.print();
  }
});

root.addEventListener('change', async e => {
  const t = e.target;
  if (t.dataset.action === 'pat-filter') { S.patFilter = t.value; return render(); }
  if (t.dataset.out) {
    const field = t.dataset.out, id = t.dataset.id; let value = t.value;
    const patch = { [field]: (field === 'date_sent' || field === 'interview_date') ? (value || null) : value };
    if (field === 'email_status' && value === 'Sent' && !outreachOf(id).date_sent) patch.date_sent = today();
    await saveOutreach(id, patch);
    if (['interview_status', 'email_status', 'reply_status', 'instagram_status', 'facebook_status', 'linkedin_status'].includes(field)) render();
    return;
  }
  if (t.dataset.filter && t.tagName === 'SELECT') { S.f[t.dataset.filter] = t.value; if (t.dataset.filter === 'region') S.f.country = ''; S.page = 0; return render(); }
  if (t.dataset.action === 'nl-csv' && t.files?.[0]) { const f = t.files[0]; t.value = ''; return importNewsletterCsv(f); }
  if (t.dataset.nfilter && t.tagName === 'SELECT') { S.nf[t.dataset.nfilter] = t.value; if (t.dataset.nfilter === 'region') S.nf.country = ''; S.nfReplied = false; return render(); }
  if (t.dataset.cfilter && t.tagName === 'SELECT') { S.cf[t.dataset.cfilter] = t.value; if (t.dataset.cfilter === 'region') S.cf.country = ''; return render(); }
  if (t.dataset.mapf && t.tagName === 'SELECT') { S.mapF[t.dataset.mapf] = t.value; return render(); }
  if (S.pat && (t.dataset.pat || t.dataset.score)) {
    if (t.dataset.score) { const a = (S.pat.data.answers ||= {}); a[t.dataset.score] = { ...(a[t.dataset.score] || {}), score: t.value }; }
    else S.pat.data[t.dataset.pat] = t.dataset.pat === 'org_id' ? orgIdFromName(t.value) : t.value;
    if (t.dataset.pat === 'org_id' && !S.pat.data.partner_name) { const o = S.orgById.get(S.pat.data.org_id); if (o) Object.assign(S.pat.data, { partner_name: o.name, email: S.pat.data.email || o.email, telephone: S.pat.data.telephone || o.phone, website: S.pat.data.website || o.website }); }
    S.pat.dirty = true; return render();
  }
});

root.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.filter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.filter; filterTimer = setTimeout(() => { S.f[k] = t.value; S.page = 0; render(); const el = root.querySelector(`[data-filter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.nlsearch) { clearTimeout(filterTimer); const id = t.dataset.nlsearch; filterTimer = setTimeout(() => { S.nlQuery = t.value; S.modal = nlPickModal(id); render(); const el = root.querySelector('[data-nlsearch]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 200); return; }
  if (t.dataset.nfilter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.nfilter; filterTimer = setTimeout(() => { S.nf[k] = t.value; render(); const el = root.querySelector(`[data-nfilter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.cfilter && t.tagName === 'INPUT') { clearTimeout(filterTimer); const k = t.dataset.cfilter; filterTimer = setTimeout(() => { S.cf[k] = t.value; render(); const el = root.querySelector(`[data-cfilter="${k}"]`); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.mapf && t.tagName === 'INPUT') { clearTimeout(filterTimer); filterTimer = setTimeout(() => { S.mapF.q = t.value; render(); const el = root.querySelector('[data-mapf="q"]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (t.dataset.action === 'track-q') { clearTimeout(filterTimer); filterTimer = setTimeout(() => { S.trackQ = t.value; render(); const el = root.querySelector('[data-action="track-q"]'); el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, 250); return; }
  if (S.pat && (t.dataset.comment || (t.dataset.pat && t.tagName !== 'SELECT' && t.dataset.pat !== 'org_id'))) {
    if (t.dataset.comment) { const a = (S.pat.data.answers ||= {}); a[t.dataset.comment] = { ...(a[t.dataset.comment] || {}), comment: t.value }; }
    else S.pat.data[t.dataset.pat] = t.value;
    if (!S.pat.dirty) { S.pat.dirty = true; const h = root.querySelector('.crm-pat-head .tiny'); if (h && !h.innerHTML.includes('Unsaved')) h.innerHTML += ' · <b>Unsaved changes</b>'; }
  }
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
      try { ({ row } = await api('org.add', { org: d })); } catch (err) { return flash('Could not add: ' + err.message); }
      const o = { id: 'own:' + row.id, rowId: row.id, name: row.name, continent: row.continent, region: row.region, country: row.country, city: row.city, email: row.email, phone: row.phone, website: row.website, own: true };
      S.orgs.push(o); S.orgs.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })); S.orgById.set(o.id, o); S.modal = ''; return flash(`${row.name} added.`);
    }
    if (kind === 'campaign') { if (await saveRecord('campaign', id, d)) { S.modal = ''; flash('Campaign saved.'); } return; }
    if (kind === 'goal') { if (await saveRecord('goal', id, { ...d, goal: Number(form.dataset.goal) })) { S.modal = ''; flash('Goal saved.'); } return; }
    if (kind === 'stakeholder') { if (await saveRecord('stakeholder', id, d)) { S.modal = ''; flash('Stakeholder saved.'); } return; }
    if (kind === 'partner') { if (await saveRecord('partner', id, { ...d, org_id: orgIdFromName(d.org_id) })) { S.modal = ''; flash('Record saved.'); } return; }
  } finally { if (btn?.isConnected) btn.disabled = false; }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.modal) closeModal(); });
window.addEventListener('beforeunload', e => { if (S.pat?.dirty || S.saving) { e.preventDefault(); e.returnValue = ''; } });

// ---------- boot ----------
if (S.code) loadAll(); else render();
