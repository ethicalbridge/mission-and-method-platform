// Method into Impact · admin · Client file
// One simple page per client: now, Gantt, next, done, decisions,
// correspondence and documents. Logic for dates lives in progress-core.js.

import * as P from './progress-core.js?v=5';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const toLocalInput = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const toDateInput = (d) => d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : '';
const dateOrNull = (v, hour = 12) => v ? new Date(`${v}T${pad(hour)}:00:00`).toISOString() : null;
const CH = { email: 'Email', whatsapp: 'WhatsApp', meeting: 'Meeting', call: 'Call', doc: 'Document', other: 'Other' };
const CH_ICON = { email: '✉', whatsapp: '💬', meeting: '◎', call: '☎', doc: '▤', other: '•' };
// "Fri 20 Nov", or "Tue 8–12 Dec" for a multi-day event.
const rangeTxt = (a, b) => {
  if (!b) return P.fmtDay(a);
  const A = P.toD(a), B = P.toD(b);
  return A.getMonth() === B.getMonth() ? `${P.fmtDay(A).replace(/ \S+$/, '')}–${B.getDate()} ${B.toLocaleDateString('en-GB', { month: 'short' })}` : `${P.fmtDay(A)}–${P.fmtShort(B)}`;
};
// Files keep their step in crm_attachments.section; the CRM record tab uses
// brief / meeting / proposal / survey / closure / general for the same idea.
const STEP_KEYS = ['brief', 'prep', 'call', 'recap', 'proposal', 'agreement', 'build', 'review', 'handover', 'close', 'followup'];
const STEP_LABEL = { ...Object.fromEntries(P.STEPS.map(s => [s.key, s.label])), other: 'Other' };
const toSection = (step) => ({ call: 'meeting', close: 'closure', other: 'general' }[step] || step);
const editBtn = (table, id) => id ? `<button type="button" class="cf-edit" data-edit="${table}|${esc(id)}" title="Edit">✎</button>` : '';
const CORRESPONDENCE_KINDS = ['message', 'meeting', 'doc_sent', 'doc_received', 'agreement_sent', 'agreement_signed', 'reminder'];

// Past-tense labels for finished steps.
const DONE_LABEL = {
  'brief.book': () => 'Discovery call booked',
  'prep.ready': () => 'Call prepared',
  'call.held': () => 'Discovery call held',
  'recap.sent': () => 'Recap email sent',
  'proposal.write': () => 'Proposal sent',
  'proposal.decide': (it, x) => {
    const rep = x.replies.find(r => Math.abs(P.days(r.at, it.to)) === 0);
    return rep?.outcome === 'accepted' ? 'Proposal accepted' : rep?.outcome === 'declined' ? 'Proposal declined' : rep ? 'Answer on the proposal' : 'Proposal replaced by a new version';
  },
  'proposal.revise': () => 'Revised proposal sent',
  'agreement.send': () => 'Terms of Reference sent',
  'agreement.sign': () => 'Terms of Reference signed',
  'agreement.intake': (it) => it.intakeSent ? 'Intake survey answered' : 'Intake survey sent',
  'build.v1': (it) => `${it.deliverable} v1 sent`,
  'review.client': (it) => `Feedback received on ${it.deliverable} v${it.round}`,
  'review.revise': (it) => `${it.deliverable} v${it.round} sent`,
  'handover.held': () => 'Handover meeting held',
  'close.exit': () => 'Exit survey answered',
  'close.story': () => 'Testimonial and interview done',
  'followup.checkin': () => '3-month check-in held',
  'followup.case': () => 'Case study published',
  'adhoc': (it) => it.title,
};

// Which page is open per contact: null = the client file, or { t: 'step'|'doc'|'row', key }.
const VIEWS = new Map();
const STEP_GROUPS = {
  discovery: { label: 'Discovery call', steps: ['brief', 'prep', 'call', 'recap'] },
  proposal:  { label: 'Proposal', steps: ['proposal'] },
  agreement: { label: 'Agreement', steps: ['agreement'] },
  build:     { label: 'Building the documents', steps: ['build', 'review'] },
  handover:  { label: 'Handover', steps: ['handover'] },
  close:     { label: 'Closing', steps: ['close', 'followup'] },
};
const groupOfStep = (step) => Object.entries(STEP_GROUPS).find(([, g]) => g.steps.includes(step))?.[0] || null;

export function renderClientFile(root, ctx) {
  // ctx: { contact, brief, bookings, attachments, timeline, deliverables, events, actions, now }
  const now = ctx.now || new Date();
  const c = ctx.contact;
  const first = (c.name || 'Client').split(/\s+/)[0];
  const whoName = (w) => w === 'C' ? first : w === 'MC' ? 'Both' : 'You';
  const raw = {
    contacts: [c], briefs: ctx.brief ? [ctx.brief] : [], bookings: ctx.bookings || [],
    attachments: ctx.attachments || [], timeline: ctx.timeline || [], deliverables: ctx.deliverables || [], events: ctx.events || [],
  };
  const board = P.buildBoard(structuredClone(raw), now);
  const x = board.clients[0];
  if (!x) { root.innerHTML = ''; return; }
  const tl = x.d.timeline;
  const att = (id) => x.d.attachments.find(a => a.id === id);
  const stepOfFile = (a) => {
    const sec = a.section || 'general';
    if (STEP_KEYS.includes(sec)) return sec;
    if (sec === 'meeting') return 'call';
    if (sec === 'survey' || sec === 'closure') return 'close';
    const linked = tl.find(r => r.attachment_id === a.id && r.step);
    return linked ? linked.step : 'other';
  };
  const fileChip = (id) => {
    const a = att(id);
    return a ? `<button type="button" class="cf-file" data-dl="${esc(a.storage_path)}" title="${esc(a.filename)}">▤ ${esc(a.label || a.filename)}</button>` : '';
  };

  // ---------- next and done ----------
  const today = P.sod(now);
  const nextItems = [];
  x.items.filter(it => !it.to && (it.due || it.scheduled)).forEach(it => nextItems.push({
    date: it.due || it.scheduled, title: it.title, who: it.who, overdue: it.due && P.sod(it.due) < today,
    ref: it.ref, waiting: it.waiting, edit: it.ref ? [it.ref.table, it.ref.id] : null,
  }));
  tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && P.toD(r.at) > now).forEach(r => nextItems.push({
    date: P.toD(r.at), end: r.meta?.ends_at, title: r.title, who: r.owed_by || 'MC', scheduled: true, edit: ['crm_timeline', r.id],
  }));
  const seenNext = new Set();
  const next = nextItems.sort((a, b) => a.date - b.date).filter(n => {
    const k = `${P.toD(n.date).toDateString()}|${n.title}`;
    if (seenNext.has(k)) return false;
    seenNext.add(k); return true;
  });
  const doneItems = x.done.filter(it => !it.closedByStage).map(it => ({ date: it.to, title: DONE_LABEL[it.key](it, x), who: it.who,
    undo: it.ref || null }));
  tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && P.toD(r.at) <= now && r.step !== 'prep').forEach(r => doneItems.push({ date: P.toD(r.at), title: r.title, who: r.owed_by || 'MC', edit: ['crm_timeline', r.id] }));
  const seenDone = new Set();
  const done = doneItems.sort((a, b) => b.date - a.date).filter(d => {
    const k = `${P.toD(d.date).toDateString()}|${d.title}`;
    if (seenDone.has(k)) return false;
    seenDone.add(k); return true;
  });

  // ---------- the "now" line ----------
  const theirs = x.waiting.filter(it => it.who === 'C').sort((a, b) => (a.due || 9e15) - (b.due || 9e15));
  const mine = x.waiting.filter(it => it.who !== 'C' && it.verdict?.code !== 1).sort((a, b) => (a.due || 9e15) - (b.due || 9e15));
  const nowLine = (list, label) => {
    if (!list.length) return '';
    const it = list[0];
    const late = it.due && P.sod(it.due) < today;
    return `<div class="cf-now-item ${late ? 'is-late' : ''}"><span class="cf-now-label">${label}</span>
      <b>${esc(it.title)}</b>${it.due ? ` <span>· ${late ? 'was due' : 'by'} ${esc(P.fmtDay(it.due))}</span>` : ''}
      ${list.length > 1 ? `<span class="cf-muted"> · and ${list.length - 1} more</span>` : ''}</div>`;
  };
  const nowHtml = (nowLine(mine, 'Your next step') + nowLine(theirs, `Waiting on ${esc(first)}`)) ||
    `<div class="cf-now-item"><span class="cf-now-label">Now</span><b>Nothing open.</b> <span class="cf-muted">Add a date or task to plan the next step.</span></div>`;

  // ---------- render ----------
  const view = VIEWS.get(c.id);
  if (view) {
    root.innerHTML = `<div class="cf">${pageHtml(view)}<dialog class="cf-dialog"></dialog></div>`;
    bind();
    return;
  }
  root.innerHTML = `
    <div class="cf">
      <section class="cf-now">${nowHtml}</section>

      <section class="cf-card">
        <div class="cf-card-head"><h4>Timeline</h4>
          <span class="cf-legend"><i class="cf-sw cf-M"></i>You <i class="cf-sw cf-C"></i>${esc(first)} <i class="cf-sw cf-MC"></i>Both · <i class="cf-sw cf-plan"></i>planned · <i class="cf-sw cf-today"></i>today</span></div>
        ${ganttHtml()}
      </section>

      <div class="cf-two">
        <section class="cf-card">
          <div class="cf-card-head"><h4>What's next</h4><button type="button" class="cf-btn" data-add="task">+ Date or task</button></div>
          <ul class="cf-list">${next.map(n => `
            <li class="${n.overdue ? 'is-late' : ''}">
              <span class="cf-date">${esc(rangeTxt(n.date, n.end))}</span>
              <span class="cf-what">${esc(n.title)}</span>
              <span class="cf-who cf-who-${n.who}">${esc(whoName(n.who))}</span>
              <span class="cf-acts">${n.edit ? editBtn(...n.edit) : ''}${n.ref ? `<button type="button" class="cf-tick" title="Mark as ${esc(n.ref.label.toLowerCase())}" data-done="${esc(n.ref.table)}|${esc(n.ref.id)}|${esc(n.ref.field)}">✓</button>` : ''}</span>
            </li>`).join('') || '<li class="cf-muted">Nothing planned yet.</li>'}</ul>
        </section>
        <section class="cf-card">
          <div class="cf-card-head"><h4>Done</h4></div>
          <ul class="cf-list cf-list-done">${done.map(d => `
            <li><span class="cf-date">${esc(P.fmtDay(d.date))}</span><span class="cf-what">✓ ${esc(d.title)}</span><span class="cf-who cf-who-${d.who}">${esc(whoName(d.who))}</span><span class="cf-acts">${d.edit ? editBtn(...d.edit) : ''}${d.undo ? `<button type="button" class="cf-undo" title="Not done: move back to What's next" data-undo="${esc(d.undo.table)}|${esc(d.undo.id)}|${esc(d.undo.field)}">↺</button>` : ''}</span></li>`).join('') || '<li class="cf-muted">Nothing done yet.</li>'}</ul>
        </section>
      </div>

      <section class="cf-card">
        <div class="cf-card-head"><h4>Decisions</h4><button type="button" class="cf-btn" data-add="decision">+ Decision</button></div>
        ${decisionsHtml()}
      </section>

      <section class="cf-card">
        <div class="cf-card-head"><h4>Correspondence</h4>
          <div class="cf-filter">${['all', 'email', 'whatsapp', 'meeting', 'doc'].map(f => `<button type="button" class="cf-chip ${f === 'all' ? 'active' : ''}" data-filter="${f}">${f === 'all' ? 'All' : CH[f] + (f === 'doc' ? 's' : f === 'meeting' ? 's' : '')}</button>`).join('')}</div>
          <button type="button" class="cf-btn" data-add="message">+ Message</button></div>
        ${correspondenceHtml()}
      </section>

      <section class="cf-card">
        <div class="cf-card-head"><h4>Documents</h4>
          <span><button type="button" class="cf-btn" data-add="upload">+ Add file</button>
          <button type="button" class="cf-btn" data-add="version">+ Document version</button></span></div>
        ${documentsHtml()}
      </section>
      <dialog class="cf-dialog"></dialog>
    </div>`;
  bind();

  // ---------- step pages ----------
  function msgLi(r) {
    const ch = r.channel === 'meeting' || r.kind === 'meeting' ? 'meeting' : r.channel;
    const who = r.direction === 'in' ? first : r.direction === 'out' ? 'You' : 'Note';
    const long = r.body && (r.body.length > 280 || r.body.split('\n').length > 4);
    return `<li class="cf-msg cf-msg-${r.direction}" data-ch="${esc(ch)}">
      <span class="cf-msg-edit">${editBtn('crm_timeline', r.id)}</span>
      <div class="cf-msg-meta">${CH_ICON[ch] || '•'} ${esc(CH[ch] || 'Other')} · ${esc(who)}${r.direction === 'in' ? ' → you' : r.direction === 'out' ? ` → ${esc(first)}` : ''} · ${esc(P.fmtDay(r.at))}</div>
      <div class="cf-msg-title">${esc(r.title)}</div>
      ${r.body ? `<div class="cf-msg-body ${long ? 'is-long' : ''}">${esc(r.body)}</div>${long ? '<button type="button" class="cf-more" data-more>Show full email</button>' : ''}` : ''}
      ${r.attachment_id ? fileChip(r.attachment_id) : ''}</li>`;
  }
  function filesBlock(ids) {
    const list = [...new Set(ids)].map(att).filter(Boolean);
    return list.length ? `<ul class="cf-filelist">${list.map(a => `<li>${fileChip(a.id)}<small>${esc(P.fmtShort(a.uploaded_at))}</small>${editBtn('crm_attachments', a.id)}</li>`).join('')}</ul>` : '<p class="cf-muted">No files yet.</p>';
  }
  function dayKey(d) { return P.sod(d).getTime(); }
  function section(title, body, add = '') {
    return `<section class="cf-card"><div class="cf-card-head"><h4>${esc(title)}</h4>${add}</div>${body}</section>`;
  }

  function pageHtml(v) {
    const back = `<button type="button" class="cf-back" data-back>‹ Back to the client file</button>`;
    if (v.t === 'doc') return back + docPageHtml(v.key);
    if (v.t === 'row') {
      const r = tl.find(o => o.id === v.key);
      if (!r) return back + '<p class="cf-muted">This line no longer exists.</p>';
      const head = `<section class="cf-page-head"><span class="cf-page-kicker">${esc(r.kind === 'deadline' ? 'Date or task' : r.kind === 'meeting' ? 'Meeting' : r.kind === 'milestone' ? 'Event' : 'Entry')}</span>
        <h3>${esc(r.title)}</h3><p>${esc(rangeTxt(r.due_at || r.at, r.meta?.ends_at))}${r.owed_by ? ` · ${esc(whoName(r.owed_by))}` : ''}${r.done_at ? ` · done ${esc(P.fmtDay(r.done_at))}` : ''} ${editBtn('crm_timeline', r.id)}</p>
        ${r.body ? `<div class="cf-notes">${esc(r.body)}</div>` : ''}${r.attachment_id ? fileChip(r.attachment_id) : ''}</section>`;
      const g = groupOfStep(r.step);
      return back + head + (g ? stepSectionsHtml(g, { around: [r.at] }) : '');
    }
    return back + stepSectionsHtml(v.key, {});
  }

  function stepSectionsHtml(key, { around = [] }) {
    const g = STEP_GROUPS[key];
    const inStep = (r) => g.steps.includes(r.step);
    // Days that belong to this step: when its emails and meetings happened. Anything sent the same day
    // (e.g. documents attached to the email after the call) belongs here too.
    const days = new Set([...tl.filter(r => inStep(r) && ['message', 'meeting', 'doc_sent', 'agreement_sent', 'agreement_signed'].includes(r.kind)).map(r => dayKey(r.at)), ...around.map(dayKey)]);
    if (key === 'discovery' && c.meeting_at) days.add(dayKey(c.meeting_at));
    const sameDay = (r) => days.has(dayKey(r.at));
    const items = x.items.filter(i => g.steps.includes(P.STEPS[(i.step || 0) - 1]?.key));
    const dates = [...items.map(i => i.from), ...items.map(i => i.to), ...tl.filter(inStep).map(r => P.toD(r.at))].filter(Boolean).sort((a, b) => a - b);
    const notes = tl.filter(r => r.kind === 'note' && inStep(r));
    const decisions = tl.filter(r => r.kind === 'decision' && (inStep(r) || sameDay(r))).sort((a, b) => P.toD(b.at) - P.toD(a.at));
    const msgs = tl.filter(r => CORRESPONDENCE_KINDS.includes(r.kind) && P.toD(r.at) <= now && (inStep(r) || (sameDay(r) && ['doc_sent', 'doc_received'].includes(r.kind)))).sort((a, b) => P.toD(b.at) - P.toD(a.at));
    const fileIds = [
      ...tl.filter(r => r.attachment_id && (inStep(r) || (sameDay(r) && r.kind !== 'decision'))).map(r => r.attachment_id),
      ...x.d.deliverables.filter(d => d.attachment_id && d.sent_at && days.has(dayKey(d.sent_at))).map(d => d.attachment_id),
      ...x.d.attachments.filter(a => g.steps.includes(stepOfFile(a))).map(a => a.id),
    ];
    const stepDefault = g.steps.includes('call') ? 'call' : g.steps[0];
    const adds = (kinds) => kinds.map(([k, l]) => `<button type="button" class="cf-btn" data-add="${k}" data-step="${stepDefault}">${l}</button>`).join(' ');
    const flow = items.filter(i => i.key !== 'adhoc').sort((a, b) => a.from - b.from).map(i => `<li class="${!i.to && i.due && P.sod(i.due) < today ? 'is-late' : ''}">
      <span class="cf-date">${esc(P.fmtDay(i.to || i.due || i.from))}</span><span class="cf-what">${i.to ? '✓ ' + esc(DONE_LABEL[i.key](i, x)) : esc(i.title)}</span>
      <span class="cf-who cf-who-${i.who}">${esc(whoName(i.who))}</span><span class="cf-acts">${i.ref ? (i.to ? `<button type="button" class="cf-undo" title="Not done" data-undo="${esc(i.ref.table)}|${esc(i.ref.id)}|${esc(i.ref.field)}">↺</button>` : `<button type="button" class="cf-tick" data-done="${esc(i.ref.table)}|${esc(i.ref.id)}|${esc(i.ref.field)}">✓</button>`) : ''}</span></li>`).join('');
    const tasks = tl.filter(r => inStep(r) && (r.kind === 'deadline' || ['meeting', 'milestone'].includes(r.kind))).map(r => `<li><span class="cf-date">${esc(rangeTxt(r.due_at || r.at, r.meta?.ends_at))}</span><span class="cf-what">${r.done_at ? '✓ ' : ''}${esc(r.title)}</span><span class="cf-who cf-who-${r.owed_by || 'MC'}">${esc(whoName(r.owed_by || 'MC'))}</span><span class="cf-acts">${editBtn('crm_timeline', r.id)}</span></li>`).join('');

    const briefBlock = key === 'discovery' && ctx.brief?.answers && Object.keys(ctx.brief.answers).length
      ? `<details class="cf-brief"><summary>What ${esc(first)} wrote in the brief</summary><dl>${Object.entries(ctx.brief.answers).filter(([, v]) => v != null && String(v).trim()).map(([k, v]) => `<dt>${esc(k.replace(/_/g, ' '))}</dt><dd>${esc(Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : v)}</dd>`).join('')}</dl></details>` : '';
    const callNotes = key === 'discovery'
      ? `<div class="cf-notes-head"><b>Notes from the call</b> <button type="button" class="cf-btn" data-callnotes>✎ Edit notes</button></div>${c.meeting_notes ? `<div class="cf-notes">${esc(c.meeting_notes)}</div>` : '<p class="cf-muted">No notes yet.</p>'}` : '';
    const noteRows = notes.map(r => `<div class="cf-note-row"><div class="cf-notes-head"><b>${esc(r.title)}</b> <small class="cf-muted">${esc(P.fmtDay(r.at))}</small> ${editBtn('crm_timeline', r.id)}</div>${r.body ? `<div class="cf-notes">${esc(r.body)}</div>` : ''}${r.attachment_id ? fileChip(r.attachment_id) : ''}</div>`).join('');

    return `
      <section class="cf-page-head"><span class="cf-page-kicker">Step</span><h3>${esc(g.label)}</h3>
        <p>${dates.length ? `${esc(P.fmtDay(dates[0]))}${dates.length > 1 && dayKey(dates[0]) !== dayKey(dates[dates.length - 1]) ? ` – ${esc(P.fmtDay(dates[dates.length - 1]))}` : ''}` : 'Not started yet'}</p>
        ${flow ? `<ul class="cf-list cf-list-flow">${flow}</ul>` : ''}</section>
      ${section('Notes', (callNotes + noteRows + briefBlock) || '<p class="cf-muted">No notes yet.</p>', adds([['note', '+ Note']]))}
      ${section('Documents shared', filesBlock(fileIds), adds([['upload', '+ Add file']]))}
      ${section('What we agreed', decisions.length ? `<ul class="cf-decisions">${decisions.map(r => `<li><span class="cf-date">${esc(P.fmtDay(r.at))}</span><div><b>${esc(r.title)}</b>${r.body ? `<span>${esc(r.body)}</span>` : ''}${fileChip(r.attachment_id)}</div><span class="cf-acts">${editBtn('crm_timeline', r.id)}</span></li>`).join('')}</ul>` : '<p class="cf-muted">No decisions logged for this step yet.</p>', adds([['decision', '+ Decision']]))}
      ${section('Emails and messages', msgs.length ? `<ul class="cf-thread">${msgs.map(msgLi).join('')}</ul>` : '<p class="cf-muted">No messages logged for this step yet.</p>', adds([['message', '+ Message']]))}
      ${section('Dates and tasks', tasks ? `<ul class="cf-list">${tasks}</ul>` : '<p class="cf-muted">No dates for this step.</p>', adds([['task', '+ Date or task']]))}`;
  }

  function docPageHtml(name) {
    const vs = x.byName.get(name) || [];
    if (!vs.length) return '<p class="cf-muted">This document no longer exists.</p>';
    const ids = new Set(vs.map(v => v.id));
    const cell = (d) => d ? esc(P.fmtDay(d)) : '<span class="cf-muted">—</span>';
    const table = `<table class="cf-docs cf-docs-full"><thead><tr><th>Version</th><th>Due</th><th>Sent</th><th>Feedback due</th><th>Feedback in</th><th>Final</th><th>Files</th><th></th></tr></thead><tbody>
      ${vs.map(v => `<tr><td><b>v${v.version}</b></td><td>${cell(v.due_at)}</td><td>${cell(v.sent_at)}</td><td>${cell(v.feedback_due_at)}</td><td>${cell(v.feedback_at)}</td><td>${cell(v.final_at)}</td>
        <td>${fileChip(v.attachment_id)}${v.feedback_attachment_id ? `<span class="cf-muted">feedback:</span> ${fileChip(v.feedback_attachment_id)}` : ''}</td><td class="cf-acts">${editBtn('crm_deliverables', v.id)}</td></tr>`).join('')}</tbody></table>`;
    const notes = vs.filter(v => v.notes).map(v => `<p><b>v${v.version}:</b> ${esc(v.notes)}</p>`).join('');
    const short = name.split(/\s+\d/)[0].toLowerCase();
    const msgs = tl.filter(r => CORRESPONDENCE_KINDS.includes(r.kind) && P.toD(r.at) <= now && (ids.has(r.deliverable_id) || `${r.title} ${r.body || ''}`.toLowerCase().includes(short))).sort((a, b) => P.toD(b.at) - P.toD(a.at));
    const decisions = tl.filter(r => r.kind === 'decision' && `${r.title} ${r.body || ''}`.toLowerCase().includes(short));
    const items = x.items.filter(i => i.deliverable === name).sort((a, b) => a.from - b.from).map(i => `<li class="${!i.to && i.due && P.sod(i.due) < today ? 'is-late' : ''}"><span class="cf-date">${esc(P.fmtDay(i.to || i.due || i.from))}</span><span class="cf-what">${i.to ? '✓ ' + esc(DONE_LABEL[i.key](i, x)) : esc(i.title)}</span><span class="cf-who cf-who-${i.who}">${esc(whoName(i.who))}</span><span class="cf-acts">${i.ref ? (i.to ? `<button type="button" class="cf-undo" data-undo="${esc(i.ref.table)}|${esc(i.ref.id)}|${esc(i.ref.field)}">↺</button>` : `<button type="button" class="cf-tick" data-done="${esc(i.ref.table)}|${esc(i.ref.id)}|${esc(i.ref.field)}">✓</button>`) : ''}</span></li>`).join('');
    return `<section class="cf-page-head"><span class="cf-page-kicker">Document</span><h3>${esc(name)}</h3>
        ${items ? `<ul class="cf-list cf-list-flow">${items}</ul>` : ''}</section>
      ${section('Versions', table + (notes ? `<div class="cf-doc-notes">${notes}</div>` : ''), `<button type="button" class="cf-btn" data-add="version" data-name="${esc(name)}">+ Version</button>`)}
      ${section('Files', filesBlock(vs.flatMap(v => [v.attachment_id, v.feedback_attachment_id]).filter(Boolean)), '<button type="button" class="cf-btn" data-add="upload">+ Add file</button>')}
      ${section('What we agreed', decisions.length ? `<ul class="cf-decisions">${decisions.map(r => `<li><span class="cf-date">${esc(P.fmtDay(r.at))}</span><div><b>${esc(r.title)}</b>${r.body ? `<span>${esc(r.body)}</span>` : ''}</div><span class="cf-acts">${editBtn('crm_timeline', r.id)}</span></li>`).join('')}</ul>` : '<p class="cf-muted">No decisions mention this document yet.</p>', '<button type="button" class="cf-btn" data-add="decision">+ Decision</button>')}
      ${section('Emails and messages', msgs.length ? `<ul class="cf-thread">${msgs.map(msgLi).join('')}</ul>` : '<p class="cf-muted">No messages about this document yet.</p>', '<button type="button" class="cf-btn" data-add="message">+ Message</button>')}`;
  }

  // ---------- Gantt ----------
  function ganttHtml() {
    const rows = [];
    const seg = (from, to, who, state, label) => ({ from: P.toD(from), to: P.toD(to), who, state, label });
    const mark = (at, who, label, state) => ({ from: P.toD(at), to: null, who, state, label, point: true });
    const it = (key) => x.items.filter(i => i.key === key);
    const segOf = (i, label) => {
      const end = i.to || now;
      const out = [seg(i.from, end, i.who, i.to ? 'done' : 'active', label || i.title)];
      if (!i.to && i.due && P.toD(i.due) > now) out.push(seg(now, i.due, i.who, 'plan', `${label || i.title} · due ${P.fmtDay(i.due)}`));
      if (!i.to && i.due && P.toD(i.due) <= now) out.push(mark(i.due, i.who, `Due ${P.fmtDay(i.due)}`, 'late'));
      return out;
    };

    // Getting to yes
    const call = it('call.held')[0], brief = it('brief.book')[0];
    if (brief || call) rows.push({ open: 'step|discovery', label: 'Discovery', segs: [...(brief ? segOf(brief, 'Brief → call booked') : []), ...(call ? segOf(call, call.to ? `Discovery call ${P.fmtDay(call.to)}` : 'Waiting for the call') : [])],
      marks: x.c.meeting_at ? [mark(x.c.meeting_at, 'MC', `Discovery call ${P.fmtDay(x.c.meeting_at)}`, 'done')] : [] });
    const props = [...it('proposal.write'), ...it('proposal.decide'), ...it('proposal.revise')];
    if (props.length) rows.push({ open: 'step|proposal', label: 'Proposal', segs: props.flatMap(i => segOf(i, `${i.title}${i.to ? ` · ${P.fmtShort(i.from)}–${P.fmtShort(i.to)}` : ''}`)), marks: [] });
    const agr = [...it('agreement.send'), ...it('agreement.sign')];
    if (agr.length) rows.push({ open: 'step|agreement', label: 'Agreement', segs: agr.flatMap(i => segOf(i)), marks: [] });
    const intake = it('agreement.intake');
    if (intake.length) rows.push({ open: 'step|agreement', label: 'Intake survey', segs: intake.flatMap(i => segOf(i)), marks: [] });

    // Documents, one row per deliverable
    for (const [name, vs] of x.byName) {
      const its = x.items.filter(i => i.deliverable === name);
      const segs = its.flatMap(i => segOf(i));
      const marks = vs.filter(v => v.sent_at).map(v => mark(v.sent_at, 'M', `v${v.version} sent ${P.fmtDay(v.sent_at)}`, 'done'))
        .concat(vs.filter(v => v.final_at).map(v => mark(v.final_at, 'M', `Final ${P.fmtDay(v.final_at)}`, 'done')));
      rows.push({ open: `doc|${name}`, label: name, segs, marks, doc: true });
    }

    // Key dates: meetings, milestones and agreed dates
    tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && r.step !== 'prep').forEach(r => {
      const end = r.meta?.ends_at;
      const past = P.toD(r.at) <= now;
      rows.push({ open: `row|${r.id}`, label: r.title, key: true,
        segs: end ? [seg(r.at, P.addDays(end, 1), r.owed_by || 'MC', past ? 'done' : 'plan', `${r.title} · ${P.fmtShort(r.at)}–${P.fmtShort(end)}`)] : [],
        marks: end ? [] : [mark(r.at, r.owed_by || 'MC', `${r.title} · ${P.fmtDay(r.at)}`, past ? 'done' : 'plan')] });
    });
    x.items.filter(i => i.key === 'adhoc' && !i.legacy).forEach(i => {
      const isDone = !!i.to;
      rows.push({ open: i.row ? `row|${i.row.id}` : null, label: i.title, key: true, segs: [], marks: [mark(i.to || i.due, i.who, `${i.title} · ${isDone ? 'done' : 'due'} ${P.fmtDay(i.to || i.due)}`, isDone ? 'done' : P.sod(i.due) < today ? 'late' : 'plan')] });
    });
    if (!rows.length) return '<p class="cf-muted">The timeline fills in as the brief, call, proposal and documents come in.</p>';

    // Range: first date to last date, with a little air.
    const all = rows.flatMap(r => [...r.segs.flatMap(s => [s.from, s.to]), ...r.marks.map(m => m.from)]).filter(Boolean).concat([now]);
    let start = P.addDays(P.sod(new Date(Math.min(...all))), -2);
    let end = P.addDays(P.sod(new Date(Math.max(...all))), 4);
    const span = Math.max(14, P.days(start, end));
    end = P.addDays(start, span);
    const pct = (d) => Math.max(0, Math.min(100, ((P.toD(d) - start) / (end - start)) * 100));
    const weeks = [];
    for (let d = P.addDays(start, (8 - start.getDay()) % 7); d < end; d = P.addDays(d, 7)) weeks.push(d);
    const step = span > 120 ? 4 : span > 60 ? 2 : 1;
    const head = weeks.map((w, i) => `<span class="cf-g-week" style="left:${pct(w)}%">${i % step === 0 ? esc(P.fmtShort(w)) : ''}</span>`).join('');
    const grid = weeks.map(w => `<i class="cf-g-grid" style="left:${pct(w)}%"></i>`).join('');
    const todayLine = `<i class="cf-g-today" style="left:${pct(now)}%" title="Today"></i>`;
    let lastGroup = '';
    const body = rows.map(r => {
      const group = r.doc ? 'Documents' : r.key ? 'Key dates' : 'Getting started';
      const gh = group !== lastGroup ? `<div class="cf-g-group">${group}</div>` : '';
      lastGroup = group;
      // Short numeric dates next to the bars and diamonds (e.g. 20/11), skipping ones that would overlap.
      const num = (d) => { const t = P.toD(d); return `${t.getDate()}/${t.getMonth() + 1}`; };
      const lbls = [];
      r.segs.filter(s => !s.point && s.state !== 'active' && s.to).forEach(s => lbls.push({ pos: pct(s.to), text: r.key && s.state !== 'done' && s.from ? `${num(s.from)}–${num(P.addDays(s.to, -1))}` : num(s.to) }));
      [...r.marks, ...r.segs.filter(s => s.point)].forEach(m => lbls.push({ pos: pct(m.from), text: num(m.from) }));
      lbls.sort((a, b) => a.pos - b.pos);
      const shown = [];
      lbls.forEach(l => { const prev = shown[shown.length - 1]; if (prev && (prev.text === l.text || l.pos - prev.pos < 5)) shown[shown.length - 1] = l; else shown.push(l); });
      const labels = shown.map(l => l.pos > 90
        ? `<span class="cf-g-lbl is-left" style="right:calc(${100 - l.pos}% + 9px)">${esc(l.text)}</span>`
        : `<span class="cf-g-lbl" style="left:calc(${l.pos}% + 9px)">${esc(l.text)}</span>`).join('');
      const bars = r.segs.filter(s => !s.point).map(s => `<i class="cf-g-bar cf-${s.who} is-${s.state}" style="left:${pct(s.from)}%;width:${Math.max(0.8, pct(s.to) - pct(s.from))}%" title="${esc(s.label)}"></i>`).join('');
      const marks = [...r.marks, ...r.segs.filter(s => s.point)].map(m => `<i class="cf-g-dot cf-${m.who} is-${m.state}" style="left:${pct(m.from)}%" title="${esc(m.label)}"></i>`).join('');
      return `${gh}<div class="cf-g-row"><div class="cf-g-label">${r.open ? `<button type="button" class="cf-g-open" data-open="${esc(r.open)}" title="Open everything about ${esc(r.label)}">${esc(r.label)} <span>›</span></button>` : esc(r.label)}</div><div class="cf-g-track">${grid}${bars}${marks}${labels}${todayLine}</div></div>`;
    }).join('');
    return `<div class="cf-gantt"><div class="cf-g-row cf-g-head"><div class="cf-g-label"></div><div class="cf-g-track">${head}${todayLine}</div></div>${body}</div>`;
  }

  // ---------- decisions ----------
  function decisionsHtml() {
    const rows = tl.filter(r => r.kind === 'decision').sort((a, b) => P.toD(b.at) - P.toD(a.at));
    if (!rows.length) return '<p class="cf-muted">No decisions logged yet. Add what you agree with the client, and why.</p>';
    return `<ul class="cf-decisions">${rows.map(r => `<li>
      <span class="cf-date">${esc(P.fmtDay(r.at))}</span>
      <div><b>${esc(r.title)}</b>${r.body ? `<span>${esc(r.body)}</span>` : ''}${fileChip(r.attachment_id)}</div>
      <span class="cf-acts"><span class="cf-who cf-who-${r.direction === 'in' ? 'C' : 'M'}">${r.direction === 'in' ? esc(first) : r.direction === 'out' ? 'You' : 'Agreed'}</span>${editBtn('crm_timeline', r.id)}</span></li>`).join('')}</ul>`;
  }

  // ---------- correspondence ----------
  function correspondenceHtml() {
    const rows = tl.filter(r => CORRESPONDENCE_KINDS.includes(r.kind) && P.toD(r.at) <= now).map(r => ({
      at: P.toD(r.at), dir: r.direction, channel: r.channel, title: r.title, body: r.body, file: r.attachment_id,
      due: r.due_at && !r.done_at ? r : null, kind: r.kind, edit: ['crm_timeline', r.id],
    }));
    if (ctx.brief?.submitted_at) rows.push({ at: P.toD(ctx.brief.submitted_at), dir: 'in', channel: 'other', title: 'Filled in the brief on the website' });
    (ctx.bookings || []).forEach(b => rows.push({ at: P.toD(b.created_at || b.scheduled_at), dir: 'in', channel: 'other', title: `${b.status === 'cancelled' ? 'Cancelled the call' : 'Booked a call'} for ${P.fmtDay(b.scheduled_at)}` }));
    (ctx.deliverables || []).filter(v => v.feedback_at).forEach(v => rows.push({ at: P.toD(v.feedback_at), dir: 'in', channel: 'doc', title: `Feedback on ${v.name} v${v.version}`, file: v.feedback_attachment_id, edit: ['crm_deliverables', v.id] }));
    rows.sort((a, b) => b.at - a.at);
    if (!rows.length) return '<p class="cf-muted">No messages logged yet.</p>';
    return `<ul class="cf-thread">${rows.map(r => {
      const ch = r.channel === 'meeting' || r.kind === 'meeting' ? 'meeting' : r.channel;
      const who = r.dir === 'in' ? first : r.dir === 'out' ? 'You' : 'Note';
      return `<li class="cf-msg cf-msg-${r.dir}" data-ch="${esc(ch)}">
        ${r.edit ? `<span class="cf-msg-edit">${editBtn(...r.edit)}</span>` : ''}
        <div class="cf-msg-meta">${CH_ICON[ch] || '•'} ${esc(CH[ch] || 'Other')} · ${esc(who)}${r.dir === 'in' ? ' → you' : r.dir === 'out' ? ` → ${esc(first)}` : ''} · ${esc(P.fmtDay(r.at))}</div>
        <div class="cf-msg-title">${esc(r.title)}</div>
        ${r.body ? `<div class="cf-msg-body ${r.body.length > 280 || r.body.split('\n').length > 4 ? 'is-long' : ''}">${esc(r.body)}</div>${r.body.length > 280 || r.body.split('\n').length > 4 ? '<button type="button" class="cf-more" data-more>Show full email</button>' : ''}` : ''}
        ${r.file ? fileChip(r.file) : ''}
        ${r.due ? `<span class="cf-reply">Reply needed by ${esc(P.fmtDay(r.due.due_at))} · ${esc(whoName(r.due.owed_by))}</span>` : ''}
      </li>`;
    }).join('')}</ul>`;
  }

  // ---------- documents ----------
  function documentsHtml() {
    const linked = new Set();
    const dls = [...x.byName];
    dls.forEach(([, vs]) => vs.forEach(v => { if (v.attachment_id) linked.add(v.attachment_id); if (v.feedback_attachment_id) linked.add(v.feedback_attachment_id); }));
    const status = (v) => v.final_at ? `<span class="cf-pill cf-ok">final ${esc(P.fmtShort(v.final_at))}</span>`
      : v.feedback_at ? `<span class="cf-pill cf-ok">feedback in ${esc(P.fmtShort(v.feedback_at))}</span>`
      : v.sent_at ? `<span class="cf-pill cf-c">with ${esc(first)}${v.feedback_due_at ? ` · feedback by ${esc(P.fmtShort(v.feedback_due_at))}` : ''}</span>`
      : v.due_at ? `<span class="cf-pill ${P.sod(v.due_at) < today ? 'cf-late' : 'cf-m'}">you · due ${esc(P.fmtShort(v.due_at))}</span>` : '<span class="cf-pill">planned</span>';
    const docTable = dls.length ? `<h5>Documents being built</h5><table class="cf-docs"><tbody>${dls.map(([name, vs]) => vs.map((v, i) => `
      <tr class="${i ? 'is-sub' : ''}"><td>${i ? '' : `<b>${esc(name)}</b>`}</td><td>v${v.version}</td><td>${status(v)}</td>
        <td>${fileChip(v.attachment_id)}${v.feedback_attachment_id ? `<span class="cf-muted">feedback:</span> ${fileChip(v.feedback_attachment_id)}` : ''}</td>
        <td class="cf-acts">${editBtn('crm_deliverables', v.id)}</td></tr>`).join('')).join('')}</tbody></table>` : '';
    const loose = x.d.attachments.filter(a => !linked.has(a.id));
    const groups = [...STEP_KEYS, 'other'].map(k => [k, loose.filter(a => stepOfFile(a) === k)]).filter(([, l]) => l.length);
    const fileList = groups.map(([k, list]) => `<h5>${esc(STEP_LABEL[k])}</h5><ul class="cf-filelist">${list.map(a => `
      <li>${fileChip(a.id)}<small>${esc(P.fmtShort(a.uploaded_at))}</small>${editBtn('crm_attachments', a.id)}</li>`).join('')}</ul>`).join('');
    return `${docTable}${fileList}${!docTable && !fileList ? '<p class="cf-muted">No documents yet.</p>' : ''}`;
  }

  // ---------- events ----------
  function bind() {
    root.querySelectorAll('[data-dl]').forEach(b => b.onclick = () => ctx.actions.download(b.dataset.dl));
    root.querySelectorAll('[data-done]').forEach(b => b.onclick = async () => {
      const [table, id, field] = b.dataset.done.split('|');
      if (!{ crm_timeline: ['done_at'], crm_deliverables: ['sent_at', 'feedback_at', 'final_at'] }[table]?.includes(field)) return;
      b.disabled = true;
      const res = await ctx.actions.update(table, id, { [field]: new Date().toISOString() });
      if (res?.error) { alert('Could not save: ' + res.error.message); b.disabled = false; return; }
      ctx.actions.reload();
    });
    root.querySelectorAll('[data-more]').forEach(b => b.onclick = () => {
      const body = b.previousElementSibling;
      const open = body.classList.toggle('is-open');
      b.textContent = open ? 'Show less' : 'Show full email';
    });
    root.querySelectorAll('[data-undo]').forEach(b => b.onclick = async () => {
      const [table, id, field] = b.dataset.undo.split('|');
      if (!{ crm_timeline: ['done_at'], crm_deliverables: ['sent_at', 'feedback_at', 'final_at'] }[table]?.includes(field)) return;
      b.disabled = true;
      const res = await ctx.actions.update(table, id, { [field]: null });
      if (res?.error) { alert('Could not save: ' + res.error.message); b.disabled = false; return; }
      ctx.actions.reload();
    });
    root.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => {
      root.querySelectorAll('[data-filter]').forEach(o => o.classList.toggle('active', o === b));
      const f = b.dataset.filter;
      root.querySelectorAll('.cf-msg').forEach(m => { m.hidden = f !== 'all' && m.dataset.ch !== f; });
    });
    root.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
      const [table, id] = b.dataset.edit.split('|');
      if (table === 'crm_deliverables') return openDialog('version', x.d.deliverables.find(v => v.id === id));
      if (table === 'crm_attachments') return openDialog('file', x.d.attachments.find(a => a.id === id));
      const r = tl.find(o => o.id === id);
      if (!r) return;
      openDialog(r.kind === 'note' ? 'note' : r.kind === 'decision' ? 'decision' : ['deadline', 'meeting', 'milestone'].includes(r.kind) && !(r.kind === 'meeting' && r.body) ? 'task' : 'message', r);
    });
    root.querySelectorAll('[data-add]').forEach(b => b.onclick = () => openDialog(b.dataset.add, null, { step: b.dataset.step || null, name: b.dataset.name || null }));
    root.querySelectorAll('[data-open]').forEach(b => b.onclick = () => {
      const [t, ...rest] = b.dataset.open.split('|');
      VIEWS.set(c.id, { t, key: rest.join('|') });
      renderClientFile(root, ctx);
      root.scrollIntoView({ block: 'start' });
    });
    root.querySelectorAll('[data-back]').forEach(b => b.onclick = () => { VIEWS.delete(c.id); renderClientFile(root, ctx); root.scrollIntoView({ block: 'start' }); });
    root.querySelector('[data-callnotes]')?.addEventListener('click', () => openDialog('callnotes'));
  }

  // ---------- dialogs ----------
  // openDialog(kind) adds a new line; openDialog(kind, row) edits that line.
  function openDialog(kind, v = null, dflt = {}) {
    const dlg = root.querySelector('.cf-dialog');
    const val = (k) => esc(v?.[k] ?? '');
    const sel = (cur, opts) => opts.map(([k, l]) => `<option value="${esc(k)}" ${String(cur ?? '') === String(k) ? 'selected' : ''}>${esc(l)}</option>`).join('');
    const dIn = (d) => d ? toDateInput(P.toD(d)) : '';
    const fileOpts = (cur) => sel(cur, [['', '—'], ...x.d.attachments.map(a => [a.id, a.label || a.filename])]);
    const stepOpts = (cur) => sel(cur ?? dflt.step, [['', '—'], ...P.STEPS.map(s => [s.key, s.label])]);
    const fileStepOpts = (cur) => sel(cur, [...P.STEPS.map(s => [s.key, s.label]), ['other', 'Other']]);
    const linkOpts = (cur) => sel(cur, [['', 'Not linked to a document version'],
      ...x.d.deliverables.flatMap(d => [[`${d.id}|attachment_id`, `${d.name} v${d.version} · the document`], [`${d.id}|feedback_attachment_id`, `${d.name} v${d.version} · ${first}'s feedback`]])]);
    const linkOf = (a) => { const d = x.d.deliverables.find(o => o.attachment_id === a.id); if (d) return `${d.id}|attachment_id`; const f = x.d.deliverables.find(o => o.feedback_attachment_id === a.id); return f ? `${f.id}|feedback_attachment_id` : ''; };
    const dirOpts = (cur) => sel(cur, [['out', `You → ${first}`], ['in', `${first} → you`], ['internal', 'Internal note']]);
    const forms = {
      message: { title: v ? 'Edit message' : 'Log a message or meeting', table: 'crm_timeline', html: `
        <label>When<input type="datetime-local" name="at" value="${toLocalInput(v ? P.toD(v.at) : new Date())}" required></label>
        <label>Direction<select name="direction">${dirOpts(v?.direction || 'out')}</select></label>
        <label>Channel<select name="channel">${sel(v?.channel || 'email', Object.entries(CH))}</select></label>
        <label class="cf-wide">Subject or summary<input name="title" required maxlength="200" value="${val('title')}" placeholder="e.g. Sent the ToR for signature"></label>
        <label class="cf-wide">Full text<textarea name="body" rows="9" placeholder="Paste the whole message">${val('body')}</textarea></label>
        <label>Step<select name="step">${stepOpts(v?.step)}</select></label>
        <label>File<select name="attachment_id">${fileOpts(v?.attachment_id)}</select></label>
        <label>Reply needed by<input type="date" name="due_at" value="${dIn(v?.due_at)}"></label>
        <label>From<select name="owed_by">${sel(v?.owed_by || 'C', [['C', first], ['M', 'You']])}</select></label>`,
        row: (fd) => ({ at: new Date(fd.get('at')).toISOString(), direction: fd.get('direction'), channel: fd.get('channel'),
          kind: v && !['message', 'meeting', 'doc_sent', 'doc_received'].includes(v.kind) ? v.kind : fd.get('channel') === 'meeting' ? 'meeting' : fd.get('channel') === 'doc' ? (fd.get('direction') === 'in' ? 'doc_received' : 'doc_sent') : (v?.kind || 'message'),
          step: fd.get('step') || null, title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null, attachment_id: fd.get('attachment_id') || null,
          due_at: dateOrNull(fd.get('due_at')), owed_by: fd.get('due_at') ? fd.get('owed_by') : null }) },
      decision: { title: v ? 'Edit decision' : 'Log a decision', table: 'crm_timeline', html: `
        <label>Date<input type="date" name="at" value="${dIn(v?.at) || toDateInput(new Date())}" required></label>
        <label>Who decided<select name="direction">${sel(v?.direction || 'internal', [['internal', 'Agreed together'], ['in', first], ['out', 'You']])}</select></label>
        <label>Step<select name="step">${stepOpts(v?.step)}</select></label>
        <label class="cf-wide">Decision<input name="title" required maxlength="200" value="${val('title')}" placeholder="e.g. Final delivery moves to 15 Jan"></label>
        <label class="cf-wide">Why / details<textarea name="body" rows="3">${val('body')}</textarea></label>
        <label class="cf-wide">File<select name="attachment_id">${fileOpts(v?.attachment_id)}</select></label>`,
        row: (fd) => ({ at: dateOrNull(fd.get('at')), direction: fd.get('direction'), channel: v?.channel || 'other', kind: 'decision', step: fd.get('step') || null,
          title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null, attachment_id: fd.get('attachment_id') || null }) },
      task: { title: v ? 'Edit date or task' : 'Add a date or task', table: 'crm_timeline', html: `
        <label class="cf-wide">What<input name="title" required maxlength="200" value="${val('title')}" placeholder="e.g. Send the intake survey"></label>
        <label>Date<input type="date" name="due_at" value="${dIn(v ? (v.kind === 'deadline' || v.due_at ? v.due_at : v.at) : null)}" required></label>
        <label>Who<select name="owed_by">${sel(v?.owed_by || 'M', [['M', 'You'], ['C', first], ['MC', 'Both']])}</select></label>
        <label>Type<select name="kind">${sel(v ? (['meeting', 'milestone'].includes(v.kind) ? v.kind : 'deadline') : 'deadline', [['deadline', 'Task with a deadline'], ['meeting', 'Meeting'], ['milestone', 'Event or milestone']])}</select></label>
        <label>Ends (multi-day)<input type="date" name="ends_at" value="${esc(v?.meta?.ends_at || '')}"></label>
        <label>Step<select name="step">${stepOpts(v?.step)}</select></label>
        <label>Done on<input type="date" name="done_at" value="${dIn(v?.done_at)}"></label>
        <label class="cf-wide">Notes<textarea name="body" rows="2">${val('body')}</textarea></label>`,
        row: (fd) => {
          const kind = fd.get('kind'), due = dateOrNull(fd.get('due_at'));
          const meta = { ...(v?.meta || {}) };
          if (fd.get('ends_at')) meta.ends_at = fd.get('ends_at'); else delete meta.ends_at;
          const base = { title: fd.get('title').trim(), owed_by: fd.get('owed_by'), step: fd.get('step') || null, body: (fd.get('body') || '').trim() || null, done_at: dateOrNull(fd.get('done_at')), meta };
          if (v && !['deadline', 'meeting', 'milestone'].includes(v.kind)) return { ...base, kind: v.kind, due_at: due };
          return kind === 'deadline'
            ? { ...base, kind, at: v?.at || new Date().toISOString(), direction: v?.direction || 'internal', channel: v?.channel || 'other', due_at: due }
            : { ...base, kind, at: dateOrNull(fd.get('due_at'), 9), direction: 'internal', channel: kind === 'meeting' ? 'meeting' : 'other', due_at: null };
        } },
      version: { title: v ? `Edit ${v.name} v${v.version}` : 'Add a document version', table: 'crm_deliverables', html: `
        <label class="cf-wide">Document<input name="name" list="cf-dl-names" required maxlength="200" value="${v ? val('name') : esc(dflt.name || '')}" placeholder="e.g. Manual de Procedimientos"><datalist id="cf-dl-names">${[...x.byName.keys()].map(n => `<option value="${esc(n)}">`).join('')}</datalist></label>
        <label>Version<input type="number" name="version" min="1" value="${v?.version || 1}" required></label>
        <label>Due<input type="date" name="due_at" value="${dIn(v?.due_at)}"></label>
        <label>Sent<input type="date" name="sent_at" value="${dIn(v?.sent_at)}"></label>
        <label>Feedback due<input type="date" name="feedback_due_at" value="${dIn(v?.feedback_due_at)}"></label>
        <label>Feedback received<input type="date" name="feedback_at" value="${dIn(v?.feedback_at)}"></label>
        <label>Final on<input type="date" name="final_at" value="${dIn(v?.final_at)}"></label>
        <label class="cf-wide">The document (file)<select name="attachment_id">${fileOpts(v?.attachment_id)}</select></label>
        <label class="cf-wide">${esc(first)}'s feedback (file)<select name="feedback_attachment_id">${fileOpts(v?.feedback_attachment_id)}</select></label>
        <label class="cf-wide">Notes<textarea name="notes" rows="2">${val('notes')}</textarea></label>`,
        row: (fd) => {
          const name = fd.get('name').trim(), version = Number(fd.get('version'));
          if ((x.byName.get(name) || []).some(o => o.version === version && o.id !== v?.id)) return `${name} v${version} already exists.`;
          return { name, version, due_at: dateOrNull(fd.get('due_at')), sent_at: dateOrNull(fd.get('sent_at'), 9), feedback_due_at: dateOrNull(fd.get('feedback_due_at')),
            feedback_at: dateOrNull(fd.get('feedback_at')), final_at: dateOrNull(fd.get('final_at')),
            attachment_id: fd.get('attachment_id') || null, feedback_attachment_id: fd.get('feedback_attachment_id') || null, notes: (fd.get('notes') || '').trim() || null };
        } },
      note: { title: v ? 'Edit note' : 'Add a note', table: 'crm_timeline', html: `
        <label class="cf-wide">Title<input name="title" required maxlength="200" value="${v ? val('title') : 'Notes'}"></label>
        <label class="cf-wide">Notes<textarea name="body" rows="12" placeholder="Write or paste your notes">${val('body')}</textarea></label>
        <label>Date<input type="date" name="at" value="${dIn(v?.at) || toDateInput(new Date())}" required></label>
        <label>Step<select name="step">${stepOpts(v?.step)}</select></label>
        <label>File<select name="attachment_id">${fileOpts(v?.attachment_id)}</select></label>`,
        row: (fd) => ({ at: dateOrNull(fd.get('at')), direction: 'internal', channel: 'other', kind: 'note', step: fd.get('step') || null,
          title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null, attachment_id: fd.get('attachment_id') || null }) },
      callnotes: { title: 'Notes from the discovery call', html: `
        <label class="cf-wide">Notes<textarea name="meeting_notes" rows="18">${esc(c.meeting_notes || '')}</textarea></label>`,
        custom: async (fd) => {
          const r = await ctx.actions.updateContact({ meeting_notes: (fd.get('meeting_notes') || '').trim() || null });
          return r?.error ? 'Could not save: ' + r.error.message : null;
        } },
      upload: { title: 'Add a file', html: `
        <label class="cf-wide">File(s)<input type="file" name="files" multiple required></label>
        <label class="cf-wide">Name to show (optional)<input name="label" maxlength="140" placeholder="e.g. ToR signed by Andrea"></label>
        <label>Step<select name="step">${fileStepOpts(dflt.step || P.STEPS[(x.currentStep || 1) - 1]?.key || 'other')}</select></label>
        <label class="cf-wide">Link to a document version<select name="link">${linkOpts('')}</select></label>`,
        custom: async (fd, msg) => {
          const files = fd.getAll('files').filter(f => f && f.size);
          if (!files.length) return 'Choose a file.';
          msg.textContent = `Uploading ${files.length} file(s)…`;
          const res = await ctx.actions.uploadFiles(files, toSection(fd.get('step')), (fd.get('label') || '').trim() || null);
          if (res.error) return 'Could not upload: ' + res.error;
          const link = fd.get('link');
          if (link && res.ids[0]) {
            const [did, field] = link.split('|');
            const r = await ctx.actions.update('crm_deliverables', did, { [field]: res.ids[0] });
            if (r?.error) return 'Uploaded, but could not link: ' + r.error.message;
          }
          return null;
        } },
      file: { title: 'Edit file', html: `
        <p class="cf-wide cf-muted">${esc(v?.filename || '')}</p>
        <label class="cf-wide">Name to show<input name="label" maxlength="140" value="${esc(v?.label || '')}" placeholder="${esc(v?.filename || '')}"></label>
        <label>Step<select name="step">${fileStepOpts(v ? stepOfFile(v) : 'other')}</select></label>
        <label class="cf-wide">Link to a document version<select name="link">${linkOpts(v ? linkOf(v) : '')}</select></label>`,
        custom: async (fd) => {
          const r = await ctx.actions.update('crm_attachments', v.id, { label: (fd.get('label') || '').trim() || null, section: toSection(fd.get('step')) });
          if (r?.error) return 'Could not save: ' + r.error.message;
          const before = linkOf(v), after = fd.get('link');
          if (before !== after) {
            if (before) { const [did, field] = before.split('|'); await ctx.actions.update('crm_deliverables', did, { [field]: null }); }
            if (after) { const [did, field] = after.split('|'); const r2 = await ctx.actions.update('crm_deliverables', did, { [field]: v.id }); if (r2?.error) return 'Could not link: ' + r2.error.message; }
          }
          return null;
        },
        remove: async () => ctx.actions.deleteFile(v.id, v.storage_path) },
    };
    const f = forms[kind];
    const canDelete = v && (f.remove || f.table);
    dlg.innerHTML = `<form class="cf-form" method="dialog"><h3>${esc(f.title)}</h3><div class="cf-form-grid">${f.html}</div>
      <p class="cf-form-msg" aria-live="polite"></p>
      <div class="cf-form-actions">${canDelete ? '<button type="button" class="cf-btn cf-btn-danger" data-remove>Delete</button><span style="flex:1"></span>' : ''}
        <button type="button" class="cf-btn" data-cancel>Cancel</button><button type="submit" class="cf-btn cf-btn-primary">Save</button></div></form>`;
    const form = dlg.querySelector('form');
    const msg = form.querySelector('.cf-form-msg');
    dlg.querySelector('[data-cancel]').onclick = () => dlg.close();
    dlg.querySelector('[data-remove]')?.addEventListener('click', async () => {
      if (!confirm('Delete this line? This cannot be undone.')) return;
      const res = f.remove ? await f.remove() : await ctx.actions.remove(f.table, v.id);
      if (res?.error) { msg.textContent = 'Could not delete: ' + res.error.message; return; }
      dlg.close(); ctx.actions.reload();
    });
    if (kind === 'version') {
      const n = form.querySelector('[name=name]'), ver = form.querySelector('[name=version]'), s = form.querySelector('[name=sent_at]'), fb = form.querySelector('[name=feedback_due_at]');
      if (!v) n.oninput = () => { const vs = x.byName.get(n.value.trim()) || []; ver.value = vs.length ? Math.max(...vs.map(o => o.version)) + 1 : 1; };
      s.onchange = () => { if (s.value && !fb.value) fb.value = toDateInput(P.addWorkdays(new Date(`${s.value}T12:00:00`), 5)); };
    }
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      if (f.custom) {
        const err = await f.custom(fd, msg);
        if (err) { msg.textContent = err; return; }
        dlg.close(); ctx.actions.reload(); return;
      }
      const row = f.row(fd);
      if (typeof row === 'string') { msg.textContent = row; return; }
      msg.textContent = 'Saving…';
      const res = v
        ? await ctx.actions.update(f.table, v.id, row)
        : await ctx.actions.insert(f.table, { ...row, contact_id: c.id, ...(f.table === 'crm_timeline' ? { source: 'manual' } : {}) });
      if (res?.error) { msg.textContent = 'Could not save: ' + res.error.message; return; }
      dlg.close();
      ctx.actions.reload();
    };
    dlg.showModal();
  }
}
