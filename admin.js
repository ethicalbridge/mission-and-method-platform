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
const statTiles    = document.querySelectorAll('.dash-stat[data-stage]');
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
  signinMsg.className = 'dash-signin-msg';
  signinMsg.textContent = 'Signing in…';
  const fd = new FormData(signinForm);
  const { error } = await supabase.auth.signInWithPassword({
    email: fd.get('email'),
    password: fd.get('password'),
  });
  if (error) {
    signinMsg.className = 'dash-signin-msg err';
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
  if (p1 !== p2) { pwdMsg.className = 'dash-signin-msg err'; pwdMsg.textContent = 'Passwords do not match.'; return; }
  pwdMsg.className = 'dash-signin-msg'; pwdMsg.textContent = 'Saving…';
  const { error } = await supabase.auth.updateUser({ password: p1 });
  if (error) { pwdMsg.className = 'dash-signin-msg err'; pwdMsg.textContent = error.message; return; }
  pwdMsg.className = 'dash-signin-msg ok'; pwdMsg.textContent = 'Password updated.';
  setTimeout(() => pwdDialog.close(), 900);
});

// ============== Data load ==============
async function loadContacts({ selectFirst = false } = {}) {
  console.log('[admin] loadContacts: querying crm_contacts…');
  const { data, error } = await supabase
    .from('crm_contacts')
    .select('id, created_at, path, name, email, organisation, role, country, stage, notes, lang, meeting_at, meeting_notes, proposal_sent_at, proposal_due_at, proposal_reply_at, proposal_outcome, next_steps, next_steps_due_at')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    console.error('[admin] loadContacts error:', error);
    listEl.innerHTML = `<li class="dash-empty">
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
    listEl.innerHTML = `<li class="dash-empty">No contacts in this view.</li>`;
    return;
  }

  listEl.innerHTML = rows.map(c => {
    const booking = c._bookings[0];
    return `
      <li class="dash-card ${c.id === selectedId ? 'active' : ''}" data-id="${c.id}">
        <div class="dash-card-row">
          <div class="dash-card-name">${esc(c.name)}</div>
          <div class="dash-card-when">${fmtRelative(c.created_at)}</div>
        </div>
        <div class="dash-card-email">${esc(c.email)}</div>
        <div class="dash-card-pills">
          <span class="dash-pill dash-pill-path-${c.path}">${c.path}</span>
          <span class="dash-pill dash-pill-stage-${c.stage}">${c.stage.replace('_',' ')}</span>
          ${booking ? `<span class="dash-pill dash-pill-stage-booked">${fmtDate(booking.scheduled_at)}</span>` : ''}
        </div>
      </li>`;
  }).join('');

  listEl.querySelectorAll('.dash-card').forEach(el => {
    el.addEventListener('click', () => openDetail(el.dataset.id));
  });
}

// ============== Detail panel ==============
async function openDetail(id) {
  selectedId = id;
  listEl.querySelectorAll('.dash-card').forEach(el => el.classList.toggle('active', el.dataset.id === id));

  detailBody.innerHTML = '<p style="color:#6a7a85">Loading…</p>';

  const [briefRes, bookingsRes, eventsRes, attachmentsRes] = await Promise.all([
    supabase.from('crm_briefs').select('*').eq('contact_id', id).order('submitted_at', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('crm_bookings').select('*').eq('contact_id', id).order('scheduled_at', { ascending: false }),
    supabase.from('crm_events').select('*').eq('contact_id', id).order('created_at', { ascending: false }).limit(100),
    supabase.from('crm_attachments').select('*').eq('contact_id', id).order('uploaded_at', { ascending: false }),
  ]);

  const contact = allContacts.find(c => c.id === id);
  if (!contact) { detailBody.innerHTML = '<p>Not found.</p>'; return; }

  renderDetail(contact, briefRes.data, bookingsRes.data || [], eventsRes.data || [], attachmentsRes.data || []);
}

function renderDetail(c, brief, bookings, events, attachments) {
  const answers = (brief && brief.answers) || {};
  const fields = c.path === 'founder' ? FOUNDER_FIELDS : ORG_FIELDS;

  const stageButtons = ['new','booked','met','proposal_sent','won','lost','archived'].map(s => `
    <button class="dash-stage-btn ${c.stage === s ? 'current' : ''}" data-set-stage="${s}">${s.replace('_',' ')}</button>
  `).join('');

  const timeline = events.map(e => `
    <li>
      <b>${esc(e.message || e.type)}</b>
      <small>${fmtDateTime(e.created_at)}</small>
    </li>
  `).join('');

  const bookingsHtml = bookings.length ? bookings.map(b => `
    <div class="dash-booking-card">
      <b>${fmtDateTime(b.scheduled_at)}</b>
      <small>Status: ${b.status}${b.meeting_url ? ` · <a href="${esc(b.meeting_url)}" target="_blank" rel="noopener">Join / meeting link ↗</a>` : ''}</small>
    </div>`).join('') : '<p style="color:#6a7a85;font-size:13px;margin:0">No booking yet.</p>';

  const subMetaBits = [];
  if (c.organisation)     subMetaBits.push(esc(c.organisation));
  if (c.role)             subMetaBits.push(esc(c.role));
  if (c.country)          subMetaBits.push(esc(c.country));
  if (c.lang && c.lang !== 'en') subMetaBits.push(c.lang.toUpperCase());

  const attachmentsHtml = attachments.length ? attachments.map(a => `
    <div class="dash-attachment">
      <div class="dash-attachment-info">
        <b>${esc(a.filename)}</b>
        <small>${a.label ? esc(a.label) + ' · ' : ''}${fmtDateTime(a.uploaded_at)}${a.size_bytes ? ' · ' + fmtSize(a.size_bytes) : ''}</small>
      </div>
      <div class="dash-attachment-actions">
        <button type="button" class="dash-mini-btn" data-download="${a.id}" data-path="${esc(a.storage_path)}">Open</button>
        <button type="button" class="dash-mini-btn dash-mini-btn-del" data-delete="${a.id}" data-path="${esc(a.storage_path)}" title="Delete">×</button>
      </div>
    </div>`).join('') : '<p style="color:#6a7a85;font-size:13px;margin:0 0 8px">No files uploaded yet.</p>';

  detailBody.innerHTML = `
    <div class="dash-detail-head">
      <div>
        <h2>${esc(c.name)}</h2>
        <p class="dash-detail-sub">
          <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
          · <span class="dash-pill dash-pill-path-${c.path}">${c.path}</span>
          ${subMetaBits.length ? ' · ' + subMetaBits.join(' · ') : ''}
          · <small>received ${fmtRelative(c.created_at)}</small>
        </p>
      </div>
    </div>

    <h3>Stage</h3>
    <div class="dash-detail-stage-row">${stageButtons}</div>

    <h3>Brief</h3>
    ${brief
      ? `<div class="dash-detail-grid">${fields.map(f => fieldHtml(f, answers)).join('')}</div>`
      : `<p class="dash-detail-no-brief">No brief submitted. This contact booked directly on Cal.com without filling the form.</p>`}

    <h3>Bookings</h3>
    ${bookingsHtml}

    <h3>Meeting</h3>
    <div class="dash-pipeline-section" data-section="meeting">
      <div class="dash-pipeline-row">
        <label><span>When did it happen?</span><input type="datetime-local" name="meeting_at" value="${toDtLocal(c.meeting_at)}"></label>
      </div>
      <label><span>Meeting notes</span><textarea name="meeting_notes" rows="4" placeholder="What came up on the call. Decisions, concerns, their language.">${esc(c.meeting_notes || '')}</textarea></label>
      <button class="dash-save-btn" data-save-section="meeting">Save meeting</button>
    </div>

    <h3>Proposal</h3>
    <div class="dash-pipeline-section" data-section="proposal">
      <div class="dash-pipeline-row dash-pipeline-row-3">
        <label><span>Sent on</span><input type="date" name="proposal_sent_at" value="${toDate(c.proposal_sent_at)}"></label>
        <label><span>Reply due by</span><input type="date" name="proposal_due_at" value="${toDate(c.proposal_due_at)}"></label>
        <label><span>Reply received</span><input type="date" name="proposal_reply_at" value="${toDate(c.proposal_reply_at)}"></label>
      </div>
      <label><span>Outcome</span>
        <select name="proposal_outcome">
          <option value="">—</option>
          <option value="waiting"           ${c.proposal_outcome === 'waiting' ? 'selected' : ''}>Waiting for reply</option>
          <option value="accepted"          ${c.proposal_outcome === 'accepted' ? 'selected' : ''}>Accepted</option>
          <option value="changes_requested" ${c.proposal_outcome === 'changes_requested' ? 'selected' : ''}>Changes requested</option>
          <option value="declined"          ${c.proposal_outcome === 'declined' ? 'selected' : ''}>Declined</option>
          <option value="ghosted"           ${c.proposal_outcome === 'ghosted' ? 'selected' : ''}>No reply (ghosted)</option>
        </select>
      </label>
      <button class="dash-save-btn" data-save-section="proposal">Save proposal</button>
    </div>

    <h3>Next steps</h3>
    <div class="dash-pipeline-section" data-section="next_steps">
      <div class="dash-pipeline-row">
        <label><span>Due by</span><input type="date" name="next_steps_due_at" value="${toDate(c.next_steps_due_at)}"></label>
      </div>
      <label><span>What's next</span><textarea name="next_steps" rows="3" placeholder="Kick-off date, deliverable, next check-in — whatever we agreed.">${esc(c.next_steps || '')}</textarea></label>
      <button class="dash-save-btn" data-save-section="next_steps">Save next steps</button>
    </div>

    <h3>Documents</h3>
    <div class="dash-attachments-wrap">
      <div id="attachments-list" class="dash-attachments-list">${attachmentsHtml}</div>
      <div class="dash-upload">
        <label class="dash-upload-label">
          <input type="file" id="file-input" multiple>
          <span>+ Upload file(s)</span>
        </label>
        <input type="text" id="file-label" placeholder="Optional label (e.g. 'ToR v2', 'Signed agreement')" maxlength="140">
        <p id="upload-status" class="dash-upload-status"></p>
      </div>
    </div>

    <h3>Private notes</h3>
    <div class="dash-notes-field">
      <textarea id="notes-field" placeholder="Running notes about this contact.">${esc(c.notes || '')}</textarea>
      <button class="dash-save-btn" id="save-notes">Save notes</button>
    </div>

    <h3>Timeline</h3>
    <ul class="dash-timeline">${timeline || '<li><b>No events yet.</b></li>'}</ul>
  `;

  detailBody.querySelectorAll('[data-set-stage]').forEach(btn => {
    btn.addEventListener('click', () => setStage(c.id, btn.dataset.setStage));
  });
  detailBody.querySelector('#save-notes').addEventListener('click', () => saveNotes(c.id));
  detailBody.querySelectorAll('[data-save-section]').forEach(btn => {
    btn.addEventListener('click', () => savePipelineSection(c.id, btn.dataset.saveSection));
  });
  detailBody.querySelector('#file-input').addEventListener('change', (ev) => uploadFiles(c.id, ev.target));
  detailBody.querySelectorAll('[data-download]').forEach(btn => {
    btn.addEventListener('click', () => downloadAttachment(btn.dataset.path));
  });
  detailBody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteAttachment(btn.dataset.delete, btn.dataset.path));
  });
}

// ---------- Pipeline section save ----------
async function savePipelineSection(contactId, section) {
  const root = detailBody.querySelector(`[data-section="${section}"]`);
  if (!root) return;
  const updates = {};
  root.querySelectorAll('input, textarea, select').forEach(el => {
    const name = el.name;
    if (!name) return;
    if (el.type === 'datetime-local' || el.type === 'date') {
      updates[name] = el.value ? new Date(el.value).toISOString() : null;
    } else {
      updates[name] = el.value;
    }
  });
  const btn = root.querySelector('.dash-save-btn');
  const originalText = btn.textContent;
  btn.disabled = true; btn.textContent = 'Saving…';
  const { error } = await supabase.from('crm_contacts').update(updates).eq('id', contactId);
  if (error) {
    btn.textContent = originalText; btn.disabled = false;
    alert('Could not save: ' + error.message);
    return;
  }
  await supabase.from('crm_events').insert({
    contact_id: contactId,
    type: `${section}_updated`,
    message: `${section.replace('_',' ')} updated`,
  });
  // Refresh in-memory contact for subsequent renders
  const c = allContacts.find(c => c.id === contactId);
  if (c) Object.assign(c, updates);
  btn.textContent = '✓ Saved'; setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 1500);
}

// ---------- Attachments ----------
async function uploadFiles(contactId, input) {
  const status = detailBody.querySelector('#upload-status');
  const label  = detailBody.querySelector('#file-label').value.trim() || null;
  const files = Array.from(input.files || []);
  if (!files.length) return;
  status.textContent = `Uploading ${files.length} file(s)…`;
  let okCount = 0, failCount = 0;
  for (const file of files) {
    const safeName = file.name.replace(/[^\w.\-]+/g, '_');
    const path = `${contactId}/${Date.now()}-${safeName}`;
    const { error: upErr } = await supabase.storage.from('crm-docs').upload(path, file, { upsert: false });
    if (upErr) { console.error('upload failed', upErr); failCount++; continue; }
    const { error: insErr } = await supabase.from('crm_attachments').insert({
      contact_id: contactId,
      filename: file.name,
      mime: file.type || null,
      size_bytes: file.size,
      storage_path: path,
      label,
      uploaded_by: (await supabase.auth.getUser()).data?.user?.email || null,
    });
    if (insErr) { console.error('attachment row insert failed', insErr); failCount++; continue; }
    await supabase.from('crm_events').insert({
      contact_id: contactId, type: 'file_uploaded',
      message: `Uploaded ${file.name}${label ? ' (' + label + ')' : ''}`,
    });
    okCount++;
  }
  status.textContent = `Uploaded ${okCount}${failCount ? ' · ' + failCount + ' failed' : ''}`;
  input.value = ''; // reset
  openDetail(contactId); // refresh list + timeline
}

async function downloadAttachment(path) {
  const { data, error } = await supabase.storage.from('crm-docs').createSignedUrl(path, 300);
  if (error) { alert('Could not open: ' + error.message); return; }
  window.open(data.signedUrl, '_blank', 'noopener');
}

async function deleteAttachment(id, path) {
  if (!confirm('Delete this file? This cannot be undone.')) return;
  await supabase.storage.from('crm-docs').remove([path]);
  await supabase.from('crm_attachments').delete().eq('id', id);
  if (selectedId) openDetail(selectedId);
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
    return `<div class="dash-detail-field ${f.long ? 'dash-detail-field-long' : ''}">
      <span class="k">${esc(f.label)}</span>
      <span class="dash-chip-row">${parts.map(x => `<span class="dash-chip">${esc(String(x))}</span>`).join('')}</span>
    </div>`;
  }

  if (v == null || v === '') return '';

  if (f.isLink) {
    return `<div class="dash-detail-field">
      <span class="k">${esc(f.label)}</span>
      <span class="v"><a href="${esc(String(v))}" target="_blank" rel="noopener">${esc(String(v))}</a></span>
    </div>`;
  }

  return `<div class="dash-detail-field ${f.long ? 'dash-detail-field-long' : ''}">
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
function toDate(iso) {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 10); // YYYY-MM-DD
}
function toDtLocal(iso) {
  if (!iso) return '';
  // The datetime-local input needs "YYYY-MM-DDTHH:MM" in LOCAL time.
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fmtSize(bytes) {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

boot();
