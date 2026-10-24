// Method into Impact · admin dashboard
// Signed-in users whose email is in crm_admins can read/write.
// Everyone else is blocked by RLS.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const SUPABASE_URL  = 'https://itzrnaxfllcztpzrgnoa.supabase.co';
const SUPABASE_ANON = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

// Pretty labels for brief fields — grouped per path.
const FOUNDER_FIELDS = [
  { k: 'f_country',      label: 'Where it will operate' },
  { k: 'f_name_project', label: 'Working name' },
  { k: 'f_pitch',        label: 'One-sentence pitch' },
  { k: 'f_stage',        label: 'Where they are' },
  { k: 'f_people',       label: 'Who\'s with them' },
  { k: 'f_got',          label: 'What they already have', other: 'f_got_other' },
  { k: 'f_help',         label: 'Where they need help',   other: 'f_help_other' },
  { k: 'f_start',        label: 'Ideal start' },
  { k: 'f_budget',       label: 'Budget (USD)' },
  { k: 'f_story',        label: 'The honest story', long: true },
];
const ORG_FIELDS = [
  { k: 'o_org',     label: 'Organisation' },
  { k: 'o_role',    label: 'Their role' },
  { k: 'o_link',    label: 'Link',  isLink: true },
  { k: 'o_who',     label: 'Where they are / who they serve' },
  { k: 'o_team',    label: 'Team size' },
  { k: 'o_moment',  label: 'Where the org is right now' },
  { k: 'o_trigger', label: 'What tipped them in', long: true },
  { k: 'o_help',    label: 'Where they want help', other: 'o_help_other' },
  { k: 'o_start',   label: 'Ideal start' },
  { k: 'o_budget',  label: 'Budget (USD)' },
  { k: 'o_story',   label: 'The honest version', long: true },
];

// ============== Elements ==============
const $ = (sel) => document.querySelector(sel);
const signinScreen = $('#signin');
const appScreen    = $('#app');
const signinForm   = $('#signin-form');
const signinMsg    = $('#signin-msg');
const userEmail    = $('#user-email');
const signoutBtn   = $('#signout');
const searchInput  = $('#search');
const exportBtn    = $('#export-csv');
const navBtns      = document.querySelectorAll('[data-stage-filter]');
const statTiles    = document.querySelectorAll('.ad-stat[data-stage]');
const listEl       = $('#contacts-list');
const listCountEl  = $('#list-count');
const detailBody   = $('#detail-body');

// ============== State ==============
let allContacts = [];
let selectedId  = null;
let currentFilter = 'all';
let currentSearch = '';

// ============== Auth ==============
async function boot() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) showApp(session);
  else showSignin();

  supabase.auth.onAuthStateChange((_event, s) => {
    if (s) showApp(s); else showSignin();
  });
}

function showSignin() {
  appScreen.hidden = true;
  signinScreen.hidden = false;
}

async function showApp(session) {
  signinScreen.hidden = true;
  appScreen.hidden = false;
  userEmail.textContent = session.user.email;
  await loadContacts({ selectFirst: true });
  subscribeToChanges();
}

signinForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  signinMsg.className = 'ad-signin-msg';
  signinMsg.textContent = 'Signing in…';
  const fd = new FormData(signinForm);
  const { error } = await supabase.auth.signInWithPassword({
    email: fd.get('email'),
    password: fd.get('password'),
  });
  if (error) {
    signinMsg.className = 'ad-signin-msg err';
    signinMsg.textContent = error.message || 'Sign-in failed.';
  } else {
    signinMsg.className = '';
    signinMsg.textContent = '';
  }
});

signoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  showSignin();
});

// ============== Change password ==============
const pwdDialog = $('#pwd-dialog');
const pwdForm   = $('#pwd-form');
const pwdMsg    = $('#pwd-msg');
$('#change-pwd').addEventListener('click', () => {
  pwdMsg.textContent = '';
  pwdForm.reset();
  pwdDialog.showModal();
});
$('#pwd-cancel').addEventListener('click', (ev) => { ev.preventDefault(); pwdDialog.close(); });
pwdForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const fd = new FormData(pwdForm);
  const p1 = fd.get('new_password');
  const p2 = fd.get('confirm_password');
  if (p1 !== p2) { pwdMsg.className = 'ad-signin-msg err'; pwdMsg.textContent = 'Passwords do not match.'; return; }
  pwdMsg.className = 'ad-signin-msg'; pwdMsg.textContent = 'Saving…';
  const { error } = await supabase.auth.updateUser({ password: p1 });
  if (error) { pwdMsg.className = 'ad-signin-msg err'; pwdMsg.textContent = error.message; return; }
  pwdMsg.className = 'ad-signin-msg ok'; pwdMsg.textContent = 'Password updated.';
  setTimeout(() => pwdDialog.close(), 900);
});

// ============== Data load ==============
async function loadContacts({ selectFirst = false } = {}) {
  console.log('[admin] loadContacts: querying crm_contacts…');
  const { data, error } = await supabase
    .from('crm_contacts')
    .select('id, created_at, path, name, email, organisation, role, country, stage, notes, lang')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    console.error('[admin] loadContacts error:', error);
    listEl.innerHTML = `<li class="ad-empty">
      ${error.message.includes('row-level security') || error.message.includes('permission denied')
        ? 'You\'re signed in but not an admin. Ask the owner to add your email to crm_admins.'
        : 'Error loading contacts: ' + error.message}
    </li>`;
    return;
  }
  console.log('[admin] loadContacts got', (data || []).length, 'rows');

  // Latest booking per contact for the list card badges.
  const ids = (data || []).map(c => c.id);
  let bookings = [];
  if (ids.length) {
    const r = await supabase
      .from('crm_bookings')
      .select('contact_id, scheduled_at, status, cal_event_id, meeting_url')
      .in('contact_id', ids)
      .order('scheduled_at', { ascending: false });
    bookings = r.data || [];
  }
  const byContact = {};
  bookings.forEach(b => { (byContact[b.contact_id] = byContact[b.contact_id] || []).push(b); });
  (data || []).forEach(c => { c._bookings = byContact[c.id] || []; });

  allContacts = data || [];
  renderStats();
  renderList();

  if (selectFirst && allContacts.length && !selectedId) {
    openDetail(allContacts[0].id);
  } else if (selectedId) {
    // Keep selection; refresh detail
    openDetail(selectedId);
  }
}

function renderStats() {
  const counts = { new: 0, booked: 0, met: 0, proposal_sent: 0, won: 0, lost: 0 };
  allContacts.forEach(c => { if (c.stage in counts) counts[c.stage]++; });
  $('#stat-new').textContent      = counts.new;
  $('#stat-booked').textContent   = counts.booked;
  $('#stat-met').textContent      = counts.met;
  $('#stat-proposal').textContent = counts.proposal_sent;
  $('#stat-won').textContent      = counts.won;
  $('#stat-lost').textContent     = counts.lost;

  statTiles.forEach(t => t.classList.toggle('active', t.dataset.stage === currentFilter));
}

function filteredContacts() {
  const q = currentSearch.trim().toLowerCase();
  return allContacts.filter(c => {
    if (currentFilter !== 'all' && c.stage !== currentFilter) return false;
    if (q) {
      const hay = `${c.name} ${c.email} ${c.organisation || ''} ${c.role || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderList() {
  const rows = filteredContacts();
  listCountEl.textContent = rows.length;

  if (!rows.length) {
    listEl.innerHTML = `<li class="ad-empty">No contacts in this view.</li>`;
    return;
  }

  listEl.innerHTML = rows.map(c => {
    const booking = c._bookings[0];
    return `
      <li class="ad-card ${c.id === selectedId ? 'active' : ''}" data-id="${c.id}">
        <div class="ad-card-row">
          <div class="ad-card-name">${esc(c.name)}</div>
          <div class="ad-card-when">${fmtRelative(c.created_at)}</div>
        </div>
        <div class="ad-card-email">${esc(c.email)}</div>
        <div class="ad-card-pills">
          <span class="ad-pill ad-pill-path-${c.path}">${c.path}</span>
          <span class="ad-pill ad-pill-stage-${c.stage}">${c.stage.replace('_',' ')}</span>
          ${booking ? `<span class="ad-pill ad-pill-stage-booked">${fmtDate(booking.scheduled_at)}</span>` : ''}
        </div>
      </li>`;
  }).join('');

  listEl.querySelectorAll('.ad-card').forEach(el => {
    el.addEventListener('click', () => openDetail(el.dataset.id));
  });
}

// ============== Detail panel ==============
async function openDetail(id) {
  selectedId = id;
  // Highlight the card
  listEl.querySelectorAll('.ad-card').forEach(el => el.classList.toggle('active', el.dataset.id === id));

  detailBody.innerHTML = '<p style="color:#6a7a85">Loading…</p>';

  const [briefRes, bookingsRes, eventsRes] = await Promise.all([
    supabase.from('crm_briefs').select('*').eq('contact_id', id).order('submitted_at', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('crm_bookings').select('*').eq('contact_id', id).order('scheduled_at', { ascending: false }),
    supabase.from('crm_events').select('*').eq('contact_id', id).order('created_at', { ascending: false }).limit(100),
  ]);

  const contact = allContacts.find(c => c.id === id);
  if (!contact) { detailBody.innerHTML = '<p>Not found.</p>'; return; }

  renderDetail(contact, briefRes.data, bookingsRes.data || [], eventsRes.data || []);
}

function renderDetail(c, brief, bookings, events) {
  const answers = (brief && brief.answers) || {};
  const fields = c.path === 'founder' ? FOUNDER_FIELDS : ORG_FIELDS;

  const stageButtons = ['new','booked','met','proposal_sent','won','lost','archived'].map(s => `
    <button class="ad-stage-btn ${c.stage === s ? 'current' : ''}" data-set-stage="${s}">${s.replace('_',' ')}</button>
  `).join('');

  const timeline = events.map(e => `
    <li>
      <b>${esc(e.message || e.type)}</b>
      <small>${fmtDateTime(e.created_at)}</small>
    </li>
  `).join('');

  const bookingsHtml = bookings.length ? bookings.map(b => `
    <div class="ad-booking-card">
      <b>${fmtDateTime(b.scheduled_at)}</b>
      <small>Status: ${b.status}${b.meeting_url ? ` · <a href="${esc(b.meeting_url)}" target="_blank" rel="noopener">Join / meeting link ↗</a>` : ''}</small>
    </div>`).join('') : '<p style="color:#6a7a85;font-size:13px;margin:0">No booking yet.</p>';

  const subMetaBits = [];
  if (c.organisation)     subMetaBits.push(esc(c.organisation));
  if (c.role)             subMetaBits.push(esc(c.role));
  if (c.country)          subMetaBits.push(esc(c.country));
  if (c.lang && c.lang !== 'en') subMetaBits.push(c.lang.toUpperCase());

  detailBody.innerHTML = `
    <div class="ad-detail-head">
      <div>
        <h2>${esc(c.name)}</h2>
        <p class="ad-detail-sub">
          <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
          · <span class="ad-pill ad-pill-path-${c.path}">${c.path}</span>
          ${subMetaBits.length ? ' · ' + subMetaBits.join(' · ') : ''}
          · <small>received ${fmtRelative(c.created_at)}</small>
        </p>
      </div>
    </div>

    <h3>Stage</h3>
    <div class="ad-detail-stage-row">${stageButtons}</div>

    <h3>Brief</h3>
    <div class="ad-detail-grid">
      ${fields.map(f => fieldHtml(f, answers)).join('')}
    </div>

    <h3>Bookings</h3>
    ${bookingsHtml}

    <h3>Notes (private)</h3>
    <div class="ad-notes-field">
      <textarea id="notes-field" placeholder="Call notes, next step, anything you want to remember about this contact.">${esc(c.notes || '')}</textarea>
      <button class="ad-save-btn" id="save-notes">Save note</button>
    </div>

    <h3>Timeline</h3>
    <ul class="ad-timeline">${timeline || '<li><b>No events yet.</b></li>'}</ul>
  `;

  detailBody.querySelectorAll('[data-set-stage]').forEach(btn => {
    btn.addEventListener('click', () => setStage(c.id, btn.dataset.setStage));
  });
  detailBody.querySelector('#save-notes').addEventListener('click', () => saveNotes(c.id));
}

function fieldHtml(f, answers) {
  let v = answers[f.k];
  const other = f.other ? answers[f.other] : null;

  if (Array.isArray(v) || other) {
    const parts = [];
    if (Array.isArray(v)) parts.push(...v);
    else if (v) parts.push(String(v));
    if (other && String(other).trim()) parts.push(`Other: ${other}`);
    if (!parts.length) return '';
    return `<div class="ad-detail-field ${f.long ? 'ad-detail-field-long' : ''}">
      <span class="k">${esc(f.label)}</span>
      <span class="ad-chip-row">${parts.map(x => `<span class="ad-chip">${esc(String(x))}</span>`).join('')}</span>
    </div>`;
  }

  if (v == null || v === '') return '';

  if (f.isLink) {
    return `<div class="ad-detail-field">
      <span class="k">${esc(f.label)}</span>
      <span class="v"><a href="${esc(String(v))}" target="_blank" rel="noopener">${esc(String(v))}</a></span>
    </div>`;
  }

  return `<div class="ad-detail-field ${f.long ? 'ad-detail-field-long' : ''}">
    <span class="k">${esc(f.label)}</span>
    <span class="v">${esc(String(v))}</span>
  </div>`;
}

async function setStage(id, stage) {
  const { error } = await supabase.from('crm_contacts').update({ stage }).eq('id', id);
  if (error) { alert('Could not update stage: ' + error.message); return; }
  await supabase.from('crm_events').insert({
    contact_id: id, type: 'stage_change',
    message: `Stage set to ${stage.replace('_', ' ')}`,
  });
  const c = allContacts.find(c => c.id === id);
  if (c) c.stage = stage;
  renderStats();
  renderList();
  openDetail(id);
}

async function saveNotes(id) {
  const notes = detailBody.querySelector('#notes-field').value;
  const { error } = await supabase.from('crm_contacts').update({ notes }).eq('id', id);
  if (error) { alert('Could not save: ' + error.message); return; }
  const c = allContacts.find(c => c.id === id);
  if (c) c.notes = notes;
  const btn = detailBody.querySelector('#save-notes');
  btn.textContent = '✓ Saved';
  setTimeout(() => { btn.textContent = 'Save note'; }, 1500);
}

// ============== Live updates ==============
function subscribeToChanges() {
  supabase.channel('crm-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_contacts' }, () => loadContacts())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_bookings' }, () => loadContacts())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_events'   }, () => { if (selectedId) openDetail(selectedId); })
    .subscribe();
}

// ============== Filter buttons + stat tile clicks ==============
function applyFilter(stage) {
  currentFilter = stage;
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.stageFilter === stage));
  statTiles.forEach(t => t.classList.toggle('active', t.dataset.stage === stage));
  renderList();
}
navBtns.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.stageFilter)));
statTiles.forEach(t => t.addEventListener('click', () => applyFilter(t.dataset.stage)));
searchInput.addEventListener('input', (ev) => { currentSearch = ev.target.value; renderList(); });

// ============== CSV export ==============
exportBtn.addEventListener('click', () => {
  const rows = filteredContacts();
  const headers = ['Received', 'Name', 'Email', 'Path', 'Organisation', 'Role', 'Country', 'Stage', 'Notes'];
  const csv = [headers.join(',')].concat(rows.map(c =>
    [c.created_at, c.name, c.email, c.path, c.organisation || '', c.role || '', c.country || '', c.stage, c.notes || '']
      .map(csvField).join(',')
  )).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mim-contacts-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

function csvField(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// ============== Utils ==============
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function fmtRelative(iso) {
  if (!iso) return '—';
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)       return 'just now';
  if (diff < 3600)     return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)    return `${Math.floor(diff/3600)}h ago`;
  if (diff < 604800)   return `${Math.floor(diff/86400)}d ago`;
  return fmtDate(iso);
}

boot();
