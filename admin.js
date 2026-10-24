// Method into Impact · admin dashboard
// Signed-in users whose email is in crm_admins can read/write the CRM tables.
// Everyone else is blocked by RLS, even if they reach this page.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const SUPABASE_URL  = 'https://itzrnaxfllcztpzrgnoa.supabase.co';
const SUPABASE_ANON = 'sb_publishable_ignrdHXThk5I88py3FaxbA_QegLgiAI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

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
const tbody        = $('#contacts-body');
const detailPanel  = $('#detail');
const detailBody   = $('#detail-body');
const detailClose  = $('#detail-close');

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
  await loadContacts();
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
async function loadContacts() {
  const { data, error } = await supabase
    .from('crm_contacts')
    .select('id, created_at, path, name, email, organisation, role, country, stage, notes, lang')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    tbody.innerHTML = `<tr class="ad-empty"><td colspan="6">
      ${error.code === 'PGRST116' || error.message.includes('row-level security')
        ? 'You are signed in but not an admin. Ask the owner to add your email to crm_admins.'
        : 'Error loading contacts: ' + error.message}
    </td></tr>`;
    return;
  }

  // Also load latest booking per contact for the table.
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
  bookings.forEach(b => {
    if (!byContact[b.contact_id]) byContact[b.contact_id] = [];
    byContact[b.contact_id].push(b);
  });
  (data || []).forEach(c => { c._bookings = byContact[c.id] || []; });

  allContacts = data || [];
  renderStats();
  renderTable();
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

function renderTable() {
  const rows = filteredContacts();
  if (!rows.length) {
    tbody.innerHTML = `<tr class="ad-empty"><td colspan="6">No contacts in this view yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(c => {
    const latestBooking = c._bookings[0];
    const bookingCell = latestBooking
      ? `<div class="ad-booking-when">
          <b>${fmtDate(latestBooking.scheduled_at)}</b>
          ${latestBooking.status !== 'confirmed' ? latestBooking.status : 'confirmed'}
        </div>`
      : `<span class="ad-cell-sub">—</span>`;
    return `
    <tr data-id="${c.id}" class="${c.id === selectedId ? 'selected' : ''}">
      <td class="ad-cell-when">${fmtRelative(c.created_at)}</td>
      <td>
        <div class="ad-cell-name">${esc(c.name)}</div>
        <div class="ad-cell-sub">${esc(c.email)}</div>
      </td>
      <td class="ad-cell-org">${esc(c.organisation || '—')}
        ${c.role ? `<div class="ad-cell-sub">${esc(c.role)}</div>` : ''}
      </td>
      <td><span class="ad-pill ad-pill-path-${c.path}">${c.path}</span></td>
      <td><span class="ad-pill ad-pill-stage-${c.stage}">${c.stage.replace('_', ' ')}</span></td>
      <td>${bookingCell}</td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('click', () => openDetail(tr.dataset.id));
  });
}

// ============== Detail panel ==============
async function openDetail(id) {
  selectedId = id;
  renderTable();
  detailPanel.hidden = false;
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

detailClose.addEventListener('click', () => {
  detailPanel.hidden = true;
  selectedId = null;
  renderTable();
});

function renderDetail(c, brief, bookings, events) {
  const answers = (brief && brief.answers) || {};
  const path = c.path;

  // Only the fields relevant to the path. Everything else lives in the collapsed JSON below.
  const founderFields = [
    ['Country / city',                 answers.f_country],
    ['Working name',                   answers.f_name_project],
    ['One-sentence pitch',             answers.f_pitch],
    ['Where they are',                 answers.f_stage],
    ['Who\'s with them',               answers.f_people],
    ['What they\'ve got',              arrOrOther(answers.f_got, answers.f_got_other)],
    ['Where they need help',           arrOrOther(answers.f_help, answers.f_help_other)],
    ['Ideal start',                    answers.f_start],
    ['Budget (USD)',                   answers.f_budget],
    ['The honest story',               answers.f_story, true],
  ];
  const orgFields = [
    ['Organisation',          answers.o_org],
    ['Role',                  answers.o_role],
    ['Link',                  answers.o_link],
    ['Where / who they serve',answers.o_who],
    ['Team size',             answers.o_team],
    ['Which sounds like us',  answers.o_moment],
    ['What tipped them in',   answers.o_trigger, true],
    ['Where they need help',  arrOrOther(answers.o_help, answers.o_help_other)],
    ['Budget (USD)',          answers.o_budget],
    ['Ideal start',           answers.o_start],
    ['The honest version',    answers.o_story, true],
  ];
  const fields = path === 'founder' ? founderFields : orgFields;

  const stageButtons = ['new','booked','met','proposal_sent','won','lost','archived'].map(s => `
    <button class="ad-stage-btn ${c.stage === s ? 'current' : ''}" data-set-stage="${s}">${s.replace('_',' ')}</button>
  `).join('');

  const timeline = events.map(e => `
    <li>
      <b>${esc(e.message || e.type)}</b>
      ${fmtDateTime(e.created_at)}
    </li>
  `).join('');

  const bookingsHtml = bookings.length ? bookings.map(b => `
    <div class="ad-detail-field">
      <span class="k">${b.status === 'confirmed' ? 'Booked' : b.status}</span>
      <span class="v">${fmtDateTime(b.scheduled_at)}
        ${b.meeting_url ? ` · <a href="${esc(b.meeting_url)}" target="_blank" rel="noopener">meeting link</a>` : ''}
      </span>
    </div>`).join('') : '<p style="color:#6a7a85;font-size:13px;margin:0">No booking yet.</p>';

  detailBody.innerHTML = `
    <h2>${esc(c.name)}</h2>
    <p class="ad-detail-sub">
      <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      · <span class="ad-pill ad-pill-path-${c.path}">${c.path}</span>
      ${c.organisation ? ' · ' + esc(c.organisation) : ''}
    </p>

    <h3>Stage</h3>
    <div class="ad-detail-stage-row">${stageButtons}</div>

    <h3>Brief</h3>
    ${fields.map(([k, v, long]) => fieldHtml(k, v, long)).join('')}

    <h3>Bookings</h3>
    ${bookingsHtml}

    <h3>Notes (private)</h3>
    <div class="ad-notes-field">
      <textarea id="notes-field">${esc(c.notes || '')}</textarea>
      <button class="ad-save-btn" id="save-notes">Save note</button>
    </div>

    <h3>Timeline</h3>
    <ul class="ad-timeline">${timeline || '<li>No events yet.</li>'}</ul>
  `;

  detailBody.querySelectorAll('[data-set-stage]').forEach(btn => {
    btn.addEventListener('click', () => setStage(c.id, btn.dataset.setStage));
  });
  detailBody.querySelector('#save-notes').addEventListener('click', () => saveNotes(c.id));
}

function fieldHtml(k, v, long) {
  if (v == null || v === '' || (Array.isArray(v) && !v.length)) return '';
  if (Array.isArray(v)) {
    return `<div class="ad-detail-field">
      <span class="k">${esc(k)}</span>
      <span class="ad-chip-row">${v.map(x => `<span class="ad-chip">${esc(String(x))}</span>`).join('')}</span>
    </div>`;
  }
  return `<div class="ad-detail-field ${long ? 'ad-detail-field-long' : ''}">
    <span class="k">${esc(k)}</span>
    <span class="v">${esc(String(v))}</span>
  </div>`;
}

function arrOrOther(arr, other) {
  const parts = [];
  if (Array.isArray(arr)) parts.push(...arr);
  else if (arr) parts.push(String(arr));
  if (other && String(other).trim()) parts.push(`Other: ${other}`);
  return parts;
}

async function setStage(id, stage) {
  const { error } = await supabase.from('crm_contacts').update({ stage }).eq('id', id);
  if (error) { alert('Could not update stage: ' + error.message); return; }
  await supabase.from('crm_events').insert({
    contact_id: id,
    type: 'stage_change',
    message: `Stage set to ${stage.replace('_', ' ')}`,
  });
  const c = allContacts.find(c => c.id === id);
  if (c) c.stage = stage;
  renderStats();
  renderTable();
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
  supabase.channel('crm-contacts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_contacts' }, () => loadContacts())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_bookings' }, () => loadContacts())
    .subscribe();
}

// ============== Filters + search ==============
navBtns.forEach(btn => btn.addEventListener('click', () => {
  navBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.stageFilter;
  renderTable();
}));

searchInput.addEventListener('input', (ev) => {
  currentSearch = ev.target.value;
  renderTable();
});

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
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
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
