// Method into Impact · admin · Client file
// One simple page per client: now, Gantt, next, done, decisions,
// correspondence and documents. Logic for dates lives in progress-core.js.

import * as P from './progress-core.js?v=3';

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
  const fileChip = (id) => {
    const a = att(id);
    return a ? `<button type="button" class="cf-file" data-dl="${esc(a.storage_path)}" title="${esc(a.filename)}">▤ ${esc(a.label || a.filename)}</button>` : '';
  };

  // ---------- next and done ----------
  const today = P.sod(now);
  const nextItems = [];
  x.items.filter(it => !it.to && (it.due || it.scheduled)).forEach(it => nextItems.push({
    date: it.due || it.scheduled, title: it.title, who: it.who, overdue: it.due && P.sod(it.due) < today,
    ref: it.ref, waiting: it.waiting,
  }));
  tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && P.toD(r.at) > now).forEach(r => nextItems.push({
    date: P.toD(r.at), end: r.meta?.ends_at, title: r.title, who: r.owed_by || 'MC', scheduled: true,
  }));
  const seenNext = new Set();
  const next = nextItems.sort((a, b) => a.date - b.date).filter(n => {
    const k = `${P.toD(n.date).toDateString()}|${n.title}`;
    if (seenNext.has(k)) return false;
    seenNext.add(k); return true;
  });
  const doneItems = x.done.filter(it => !it.closedByStage).map(it => ({ date: it.to, title: DONE_LABEL[it.key](it, x), who: it.who }));
  tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && P.toD(r.at) <= now && r.step !== 'prep').forEach(r => doneItems.push({ date: P.toD(r.at), title: r.title, who: r.owed_by || 'MC' }));
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
              ${n.ref ? `<button type="button" class="cf-tick" title="Mark as ${esc(n.ref.label.toLowerCase())}" data-done="${esc(n.ref.table)}|${esc(n.ref.id)}|${esc(n.ref.field)}">✓</button>` : '<span></span>'}
            </li>`).join('') || '<li class="cf-muted">Nothing planned yet.</li>'}</ul>
        </section>
        <section class="cf-card">
          <div class="cf-card-head"><h4>Done</h4></div>
          <ul class="cf-list cf-list-done">${done.map(d => `
            <li><span class="cf-date">${esc(P.fmtDay(d.date))}</span><span class="cf-what">✓ ${esc(d.title)}</span><span class="cf-who cf-who-${d.who}">${esc(whoName(d.who))}</span><span></span></li>`).join('') || '<li class="cf-muted">Nothing done yet.</li>'}</ul>
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
          <span><label class="cf-btn cf-upload">+ Upload file<input type="file" multiple data-upload hidden></label>
          <button type="button" class="cf-btn" data-add="version">+ Version</button></span></div>
        ${documentsHtml()}
      </section>
      <dialog class="cf-dialog"></dialog>
    </div>`;
  bind();

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
    if (brief || call) rows.push({ label: 'Discovery', segs: [...(brief ? segOf(brief, 'Brief → call booked') : []), ...(call ? segOf(call, call.to ? `Discovery call ${P.fmtDay(call.to)}` : 'Waiting for the call') : [])],
      marks: x.c.meeting_at ? [mark(x.c.meeting_at, 'MC', `Discovery call ${P.fmtDay(x.c.meeting_at)}`, 'done')] : [] });
    const props = [...it('proposal.write'), ...it('proposal.decide'), ...it('proposal.revise')];
    if (props.length) rows.push({ label: 'Proposal', segs: props.flatMap(i => segOf(i, `${i.title}${i.to ? ` · ${P.fmtShort(i.from)}–${P.fmtShort(i.to)}` : ''}`)), marks: [] });
    const agr = [...it('agreement.send'), ...it('agreement.sign')];
    if (agr.length) rows.push({ label: 'Agreement', segs: agr.flatMap(i => segOf(i)), marks: [] });
    const intake = it('agreement.intake');
    if (intake.length) rows.push({ label: 'Intake survey', segs: intake.flatMap(i => segOf(i)), marks: [] });

    // Documents, one row per deliverable
    for (const [name, vs] of x.byName) {
      const its = x.items.filter(i => i.deliverable === name);
      const segs = its.flatMap(i => segOf(i));
      const marks = vs.filter(v => v.sent_at).map(v => mark(v.sent_at, 'M', `v${v.version} sent ${P.fmtDay(v.sent_at)}`, 'done'))
        .concat(vs.filter(v => v.final_at).map(v => mark(v.final_at, 'M', `Final ${P.fmtDay(v.final_at)}`, 'done')));
      rows.push({ label: name, segs, marks, doc: true });
    }

    // Key dates: meetings, milestones and agreed dates
    tl.filter(r => ['meeting', 'milestone'].includes(r.kind) && r.step !== 'prep').forEach(r => {
      const end = r.meta?.ends_at;
      const past = P.toD(r.at) <= now;
      rows.push({ label: r.title, key: true,
        segs: end ? [seg(r.at, P.addDays(end, 1), r.owed_by || 'MC', past ? 'done' : 'plan', `${r.title} · ${P.fmtShort(r.at)}–${P.fmtShort(end)}`)] : [],
        marks: end ? [] : [mark(r.at, r.owed_by || 'MC', `${r.title} · ${P.fmtDay(r.at)}`, past ? 'done' : 'plan')] });
    });
    x.items.filter(i => i.key === 'adhoc' && !i.legacy).forEach(i => {
      const isDone = !!i.to;
      rows.push({ label: i.title, key: true, segs: [], marks: [mark(i.to || i.due, i.who, `${i.title} · ${isDone ? 'done' : 'due'} ${P.fmtDay(i.to || i.due)}`, isDone ? 'done' : P.sod(i.due) < today ? 'late' : 'plan')] });
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
      const bars = r.segs.filter(s => !s.point).map(s => `<i class="cf-g-bar cf-${s.who} is-${s.state}" style="left:${pct(s.from)}%;width:${Math.max(0.8, pct(s.to) - pct(s.from))}%" title="${esc(s.label)}"></i>`).join('');
      const marks = [...r.marks, ...r.segs.filter(s => s.point)].map(m => `<i class="cf-g-dot cf-${m.who} is-${m.state}" style="left:${pct(m.from)}%" title="${esc(m.label)}"></i>`).join('');
      return `${gh}<div class="cf-g-row"><div class="cf-g-label" title="${esc(r.label)}">${esc(r.label)}</div><div class="cf-g-track">${grid}${bars}${marks}${todayLine}</div></div>`;
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
      <span class="cf-who cf-who-${r.direction === 'in' ? 'C' : 'M'}">${r.direction === 'in' ? esc(first) : r.direction === 'out' ? 'You' : 'Agreed'}</span></li>`).join('')}</ul>`;
  }

  // ---------- correspondence ----------
  function correspondenceHtml() {
    const rows = tl.filter(r => CORRESPONDENCE_KINDS.includes(r.kind) && P.toD(r.at) <= now).map(r => ({
      at: P.toD(r.at), dir: r.direction, channel: r.channel, title: r.title, body: r.body, file: r.attachment_id,
      due: r.due_at && !r.done_at ? r : null, kind: r.kind,
    }));
    if (ctx.brief?.submitted_at) rows.push({ at: P.toD(ctx.brief.submitted_at), dir: 'in', channel: 'other', title: 'Filled in the brief on the website' });
    (ctx.bookings || []).forEach(b => rows.push({ at: P.toD(b.created_at || b.scheduled_at), dir: 'in', channel: 'other', title: `${b.status === 'cancelled' ? 'Cancelled the call' : 'Booked a call'} for ${P.fmtDay(b.scheduled_at)}` }));
    (ctx.deliverables || []).filter(v => v.feedback_at).forEach(v => rows.push({ at: P.toD(v.feedback_at), dir: 'in', channel: 'doc', title: `Feedback on ${v.name} v${v.version}`, file: v.feedback_attachment_id }));
    rows.sort((a, b) => b.at - a.at);
    if (!rows.length) return '<p class="cf-muted">No messages logged yet.</p>';
    return `<ul class="cf-thread">${rows.map(r => {
      const ch = r.channel === 'meeting' || r.kind === 'meeting' ? 'meeting' : r.channel;
      const who = r.dir === 'in' ? first : r.dir === 'out' ? 'You' : 'Note';
      return `<li class="cf-msg cf-msg-${r.dir}" data-ch="${esc(ch)}">
        <div class="cf-msg-meta">${CH_ICON[ch] || '•'} ${esc(CH[ch] || 'Other')} · ${esc(who)}${r.dir === 'in' ? ' → you' : r.dir === 'out' ? ` → ${esc(first)}` : ''} · ${esc(P.fmtDay(r.at))}</div>
        <div class="cf-msg-title">${esc(r.title)}</div>
        ${r.body ? `<div class="cf-msg-body">${esc(r.body)}</div>` : ''}
        ${r.file ? fileChip(r.file) : ''}
        ${r.due ? `<span class="cf-reply">Reply needed by ${esc(P.fmtDay(r.due.due_at))} · ${esc(whoName(r.due.owed_by))}</span>` : ''}
      </li>`;
    }).join('')}</ul>`;
  }

  // ---------- documents ----------
  function documentsHtml() {
    const used = new Set();
    const agreementFiles = tl.filter(r => r.attachment_id && ['proposal', 'agreement'].includes(r.step)).map(r => { used.add(r.attachment_id); return { r, a: att(r.attachment_id) }; }).filter(o => o.a);
    const dls = [...x.byName];
    dls.forEach(([, vs]) => vs.forEach(v => { used.add(v.attachment_id); used.add(v.feedback_attachment_id); }));
    const rest = x.d.attachments.filter(a => !used.has(a.id));
    const status = (v) => v.final_at ? `<span class="cf-pill cf-ok">final ${esc(P.fmtShort(v.final_at))}</span>`
      : v.feedback_at ? `<span class="cf-pill cf-ok">feedback in ${esc(P.fmtShort(v.feedback_at))}</span>`
      : v.sent_at ? `<span class="cf-pill cf-c">with ${esc(first)}${v.feedback_due_at ? ` · feedback by ${esc(P.fmtShort(v.feedback_due_at))}` : ''}</span>`
      : v.due_at ? `<span class="cf-pill ${P.sod(v.due_at) < today ? 'cf-late' : 'cf-m'}">you · due ${esc(P.fmtShort(v.due_at))}</span>` : '<span class="cf-pill">planned</span>';
    const docTable = dls.length ? `<table class="cf-docs"><tbody>${dls.map(([name, vs]) => vs.map((v, i) => `
      <tr class="${i ? 'is-sub' : ''}"><td>${i ? '' : `<b>${esc(name)}</b>`}</td><td>v${v.version}</td><td>${status(v)}</td><td>${fileChip(v.attachment_id)}${fileChip(v.feedback_attachment_id)}</td></tr>`).join('')).join('')}</tbody></table>` : '';
    return `
      ${agreementFiles.length ? `<h5>Proposal and agreement</h5><div class="cf-files">${agreementFiles.map(o => `<span class="cf-file-row">${fileChip(o.a.id)}<small>${esc(P.fmtShort(o.r.at))}</small></span>`).join('')}</div>` : ''}
      ${docTable ? `<h5>Deliverables</h5>${docTable}` : ''}
      ${rest.length ? `<h5>Other files</h5><div class="cf-files">${rest.map(a => `<span class="cf-file-row">${fileChip(a.id)}<small>${esc(P.fmtShort(a.uploaded_at))}</small></span>`).join('')}</div>` : ''}
      ${!agreementFiles.length && !docTable && !rest.length ? '<p class="cf-muted">No documents yet.</p>' : ''}
      <p class="cf-upload-status" aria-live="polite"></p>`;
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
    root.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => {
      root.querySelectorAll('[data-filter]').forEach(o => o.classList.toggle('active', o === b));
      const f = b.dataset.filter;
      root.querySelectorAll('.cf-msg').forEach(m => { m.hidden = f !== 'all' && m.dataset.ch !== f; });
    });
    root.querySelector('[data-upload]')?.addEventListener('change', (ev) => ctx.actions.upload(ev.target, root.querySelector('.cf-upload-status')));
    root.querySelectorAll('[data-add]').forEach(b => b.onclick = () => openDialog(b.dataset.add));
  }

  // ---------- dialogs ----------
  function openDialog(kind) {
    const dlg = root.querySelector('.cf-dialog');
    const files = `<option value="">—</option>` + x.d.attachments.map(a => `<option value="${esc(a.id)}">${esc(a.label || a.filename)}</option>`).join('');
    const stepOpts = `<option value="">—</option>` + P.STEPS.map(s => `<option value="${s.key}">${esc(s.label)}</option>`).join('');
    const forms = {
      message: { title: 'Log a message or meeting', html: `
        <label>When<input type="datetime-local" name="at" value="${toLocalInput(new Date())}" required></label>
        <label>Direction<select name="direction"><option value="out">You → ${esc(first)}</option><option value="in">${esc(first)} → you</option><option value="internal">Internal note</option></select></label>
        <label>Channel<select name="channel">${Object.entries(CH).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></label>
        <label class="cf-wide">Subject or summary<input name="title" required maxlength="200" placeholder="e.g. Sent the ToR for signature"></label>
        <label class="cf-wide">Text<textarea name="body" rows="4" placeholder="Paste the message or key points (optional)"></textarea></label>
        <label>File<select name="attachment_id">${files}</select></label>
        <label>Reply needed by<input type="date" name="due_at"></label>
        <label>From<select name="owed_by"><option value="C">${esc(first)}</option><option value="M">You</option></select></label>`,
        row: (fd) => ({ at: new Date(fd.get('at')).toISOString(), direction: fd.get('direction'), channel: fd.get('channel'),
          kind: fd.get('channel') === 'meeting' ? 'meeting' : fd.get('channel') === 'doc' ? (fd.get('direction') === 'in' ? 'doc_received' : 'doc_sent') : 'message',
          title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null, attachment_id: fd.get('attachment_id') || null,
          due_at: dateOrNull(fd.get('due_at')), owed_by: fd.get('due_at') ? fd.get('owed_by') : null }) },
      decision: { title: 'Log a decision', html: `
        <label>Date<input type="date" name="at" value="${toDateInput(new Date())}" required></label>
        <label>Who decided<select name="direction"><option value="internal">Agreed together</option><option value="in">${esc(first)}</option><option value="out">You</option></select></label>
        <label>Stage<select name="step">${stepOpts}</select></label>
        <label class="cf-wide">Decision<input name="title" required maxlength="200" placeholder="e.g. Final delivery moves to 15 Jan"></label>
        <label class="cf-wide">Why / details<textarea name="body" rows="3" placeholder="Optional"></textarea></label>
        <label class="cf-wide">File<select name="attachment_id">${files}</select></label>`,
        row: (fd) => ({ at: dateOrNull(fd.get('at')), direction: fd.get('direction'), channel: 'other', kind: 'decision', step: fd.get('step') || null,
          title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null, attachment_id: fd.get('attachment_id') || null }) },
      task: { title: 'Add a date or task', html: `
        <label class="cf-wide">What<input name="title" required maxlength="200" placeholder="e.g. Send the intake survey"></label>
        <label>Due<input type="date" name="due_at" required></label>
        <label>Who<select name="owed_by"><option value="M">You</option><option value="C">${esc(first)}</option><option value="MC">Both</option></select></label>
        <label>Type<select name="kind"><option value="deadline">Task with a deadline</option><option value="meeting">Meeting</option><option value="milestone">Event or milestone</option></select></label>
        <label>Ends (for multi-day events)<input type="date" name="ends_at"></label>
        <label>Stage<select name="step">${stepOpts}</select></label>`,
        row: (fd) => {
          const kind = fd.get('kind'), due = dateOrNull(fd.get('due_at'));
          return kind === 'deadline'
            ? { at: new Date().toISOString(), direction: 'internal', channel: 'other', kind, title: fd.get('title').trim(), due_at: due, owed_by: fd.get('owed_by'), step: fd.get('step') || null }
            : { at: dateOrNull(fd.get('due_at'), 9), direction: 'internal', channel: kind === 'meeting' ? 'meeting' : 'other', kind, title: fd.get('title').trim(), owed_by: fd.get('owed_by'), step: fd.get('step') || null, meta: fd.get('ends_at') ? { ends_at: fd.get('ends_at') } : {} };
        } },
      version: { title: 'Add a document version', table: 'crm_deliverables', html: `
        <label class="cf-wide">Document<input name="name" list="cf-dl-names" required maxlength="200" placeholder="e.g. Manual de Procedimientos"><datalist id="cf-dl-names">${[...x.byName.keys()].map(n => `<option value="${esc(n)}">`).join('')}</datalist></label>
        <label>Version<input type="number" name="version" min="1" value="1" required></label>
        <label>Due<input type="date" name="due_at"></label>
        <label>Sent<input type="date" name="sent_at"></label>
        <label>Feedback due<input type="date" name="feedback_due_at"></label>
        <label class="cf-wide">File<select name="attachment_id">${files}</select></label>`,
        row: (fd) => {
          const name = fd.get('name').trim(), version = Number(fd.get('version'));
          if ((x.byName.get(name) || []).some(v => v.version === version)) return `${name} v${version} already exists.`;
          return { name, version, due_at: dateOrNull(fd.get('due_at')), sent_at: dateOrNull(fd.get('sent_at'), 9), feedback_due_at: dateOrNull(fd.get('feedback_due_at')), attachment_id: fd.get('attachment_id') || null };
        } },
    };
    const f = forms[kind];
    dlg.innerHTML = `<form class="cf-form" method="dialog"><h3>${esc(f.title)}</h3><div class="cf-form-grid">${f.html}</div>
      <p class="cf-form-msg" aria-live="polite"></p>
      <div class="cf-form-actions"><button type="button" class="cf-btn" data-cancel>Cancel</button><button type="submit" class="cf-btn cf-btn-primary">Save</button></div></form>`;
    const form = dlg.querySelector('form');
    dlg.querySelector('[data-cancel]').onclick = () => dlg.close();
    if (kind === 'version') {
      const n = form.querySelector('[name=name]'), v = form.querySelector('[name=version]'), s = form.querySelector('[name=sent_at]'), fb = form.querySelector('[name=feedback_due_at]');
      n.oninput = () => { const vs = x.byName.get(n.value.trim()) || []; v.value = vs.length ? Math.max(...vs.map(o => o.version)) + 1 : 1; };
      s.onchange = () => { if (s.value && !fb.value) fb.value = toDateInput(P.addWorkdays(new Date(`${s.value}T12:00:00`), 5)); };
    }
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      const msg = form.querySelector('.cf-form-msg');
      const row = f.row(new FormData(form));
      if (typeof row === 'string') { msg.textContent = row; return; }
      msg.textContent = 'Saving…';
      const table = f.table || 'crm_timeline';
      const res = await ctx.actions.insert(table, { ...row, contact_id: c.id, ...(table === 'crm_timeline' ? { source: 'manual' } : {}) });
      if (res?.error) { msg.textContent = 'Could not save: ' + res.error.message; return; }
      dlg.close();
      ctx.actions.reload();
    };
    dlg.showModal();
  }
}
