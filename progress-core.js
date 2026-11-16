// Method into Impact · admin · Progress and bottlenecks — pure logic.
// No DOM, no Supabase: takes plain rows, returns what the Progress view draws.
// Times are compared in the browser's local time zone.

export const STEPS = [
  { n: 1,  key: 'brief',     label: 'Brief' },
  { n: 2,  key: 'prep',      label: 'Prep' },
  { n: 3,  key: 'call',      label: 'Call' },
  { n: 4,  key: 'recap',     label: 'Recap' },
  { n: 5,  key: 'proposal',  label: 'Proposal' },
  { n: 6,  key: 'agreement', label: 'Agreement' },
  { n: 7,  key: 'build',     label: 'Build' },
  { n: 8,  key: 'review',    label: 'Review' },
  { n: 9,  key: 'handover',  label: 'Handover' },
  { n: 10, key: 'close',     label: 'Close' },
  { n: 11, key: 'followup',  label: 'Follow-up' },
];
export const STEP_N = Object.fromEntries(STEPS.map(s => [s.key, s.n]));

export const TABS = [
  { key: 'before',    label: 'Before the call',    steps: [1, 2, 3] },
  { key: 'yes',       label: 'Call to yes',        steps: [4, 5] },
  { key: 'agreement', label: 'Agreement',          steps: [6] },
  { key: 'build',     label: 'Build and review',   steps: [7, 8] },
  { key: 'after',     label: 'Handover and after', steps: [9, 10, 11] },
];
export const tabOfStep = (n) => (TABS.find(t => t.steps.includes(n)) || {}).key || null;

// target in days (or working days when unit = 'wd'). [A] = assumption to confirm.
export const SEG = {
  'brief.book':       { step: 1,  who: 'C',  target: 1,    label: 'Brief lands → call booked' },
  'prep.ready':       { step: 2,  who: 'M',  target: 2,    label: 'Call booked → call prepared' },
  'call.held':        { step: 3,  who: 'MC', target: null, label: 'Call booked → call held' },
  'recap.sent':       { step: 4,  who: 'M',  target: 1,    label: 'Call held → recap sent' },
  'proposal.write':   { step: 5,  who: 'M',  target: 7,    label: 'Call held → proposal sent' },
  'proposal.decide':  { step: 5,  who: 'C',  target: 7,    label: 'Proposal sent → client answers', loop: true },
  'proposal.revise':  { step: 5,  who: 'M',  target: 3,    label: 'Changes asked → new proposal sent', loop: true },
  'agreement.send':   { step: 6,  who: 'M',  target: 2,    label: 'Yes → Terms of Reference sent' },
  'agreement.sign':   { step: 6,  who: 'C',  target: 7,    label: 'ToR sent → ToR signed' },
  'agreement.intake': { step: 6,  who: 'C',  target: 7,    label: 'Yes → intake survey answered' },
  'build.v1':         { step: 7,  who: 'M',  target: 14,   label: 'Start → first version sent' },
  'review.client':    { step: 8,  who: 'C',  target: 5,    unit: 'wd', label: 'Version sent → client feedback', loop: true },
  'review.revise':    { step: 8,  who: 'M',  target: 5,    unit: 'wd', label: 'Feedback → next version sent', loop: true },
  'handover.held':    { step: 9,  who: 'MC', target: 7,    label: 'All final → handover held' },
  'close.exit':       { step: 10, who: 'C',  target: 7,    label: 'Exit survey sent → answered' },
  'close.story':      { step: 10, who: 'C',  target: 14,   label: 'Survey → testimonial + interview' },
  'followup.checkin': { step: 11, who: 'M',  target: 90,   label: 'Handover → 3-month check-in' },
  'followup.case':    { step: 11, who: 'M',  target: 30,   label: 'Interview → case study published' },
  'adhoc':            { step: null, who: 'M', target: null, label: 'Agreed date' },
};

export const CLOSED_STAGES = ['declined', 'ghosted', 'not_fit', 'budget', 'timing', 'cancelled', 'other', 'archived'];

// ---------- dates ----------
export const toD = (x) => (x == null || x === '' ? null : (x instanceof Date ? x : new Date(x)));
export const sod = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
export const days = (a, b) => Math.round((sod(b) - sod(a)) / 864e5);
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const isWd = (d) => { const g = d.getDay(); return g !== 0 && g !== 6; };
export function wdays(a, b) {
  let A = sod(a), B = sod(b), sign = 1;
  if (B < A) { [A, B] = [B, A]; sign = -1; }
  let n = 0;
  for (let x = addDays(A, 1); x <= B; x = addDays(x, 1)) if (isWd(x)) n++;
  return n * sign;
}
export function addWorkdays(d, n) {
  let x = new Date(d), k = 0;
  const step = n < 0 ? -1 : 1;
  while (k < Math.abs(n)) { x = addDays(x, step); if (isWd(x)) k++; }
  return x;
}
export const fmtDay = (d) => d ? toD(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : '—';
export const fmtShort = (d) => d ? toD(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—';
const dayKey = (d) => { const x = sod(d); return `${x.getFullYear()}-${x.getMonth()}-${x.getDate()}`; };
const maxD = (...xs) => { const v = xs.flat().filter(Boolean).map(toD); return v.length ? new Date(Math.max(...v)) : null; };
const minD = (...xs) => { const v = xs.flat().filter(Boolean).map(toD); return v.length ? new Date(Math.min(...v)) : null; };
export function median(xs) {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b), m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Same-day duplicates (a CRM column and a log row recording the same send) count once.
function dedupeByDay(list) {
  const seen = new Map();
  list.filter(Boolean).forEach(x => {
    const k = dayKey(x.at);
    if (!seen.has(k)) seen.set(k, { ...x, at: toD(x.at), rows: x.row ? [x.row] : [] });
    else {
      const cur = seen.get(k);
      if (x.row) cur.rows.push(x.row);
      if (x.outcome && !cur.outcome) cur.outcome = x.outcome;
    }
  });
  return [...seen.values()].sort((a, b) => a.at - b.at);
}

// ---------- segment instances per client ----------
const TITLES = {
  'brief.book': () => 'Book the discovery call',
  'prep.ready': () => 'Prepare the call',
  'call.held': () => 'Discovery call',
  'recap.sent': () => 'Send the recap email',
  'proposal.write': () => 'Send the proposal',
  'proposal.decide': (x) => `Answer on the proposal${x.round > 1 ? ` (v${x.round})` : ''}`,
  'proposal.revise': () => 'Send the revised proposal',
  'agreement.send': () => 'Send the Terms of Reference',
  'agreement.sign': () => 'Sign the Terms of Reference',
  'agreement.intake': (x) => x.intakeSent ? 'Answer the intake survey' : 'Send the intake survey',
  'build.v1': (x) => `${x.deliverable} v1`,
  'review.client': (x) => `Feedback on ${x.deliverable} v${x.round}`,
  'review.revise': (x) => `${x.deliverable} v${x.round}`,
  'handover.held': () => 'Handover meeting',
  'close.exit': () => 'Answer the exit survey',
  'close.story': () => 'Testimonial + case-study interview',
  'followup.checkin': () => '3-month check-in',
  'followup.case': () => 'Publish the case study',
};

export function instancesFor(c, d, now) {
  const tl = [...d.timeline].sort((a, b) => toD(a.at) - toD(b.at));
  tl.forEach(r => { r.meta = r.meta || {}; });
  const dl = d.deliverables;
  const closed = CLOSED_STAGES.includes(c.stage);
  const closedAt = closed ? (toD(d.events.filter(e => /stage/i.test(e.message || e.type || '') && (e.message || '').includes(c.stage))
    .map(e => e.created_at).sort().pop()) || now) : null;
  const usedRows = new Set();
  const out = [];
  const add = (key, from, to, x = {}) => {
    if (!from) return;
    const S = SEG[key];
    let f = toD(from), t = toD(to);
    if (t && t < f) t = f;
    const it = {
      key, step: S.step, unit: S.unit || 'd', who: x.who || S.who,
      from: f, to: t, due: toD(x.due), scheduled: toD(x.scheduled), nudgeAt: toD(x.nudgeAt),
      round: x.round || null, deliverable: x.deliverable || null, intakeSent: !!x.intakeSent,
      ref: x.ref || null, logStep: x.logStep || STEPS[S.step - 1]?.key || null, nudges: [], flags: x.flags || [],
    };
    if (!t && closedAt) { it.to = closedAt; it.closedByStage = true; }
    it.waiting = !it.to && it.from <= now;
    it.upcoming = !it.to && it.from > now;
    it.title = x.title || TITLES[key](it);
    out.push(it);
    return it;
  };
  const row = (p) => tl.find(r => p(r));
  const mark = (r) => { if (r) usedRows.add(r.id); return r; };

  // 1–3 before the call
  const brief = d.briefs.sort((a, b) => toD(a.submitted_at) - toD(b.submitted_at))[0];
  const briefAt = brief?.submitted_at || c.created_at;
  const bks = d.bookings.filter(b => b.status !== 'cancelled').sort((a, b) => toD(a.created_at || a.scheduled_at) - toD(b.created_at || b.scheduled_at));
  const bk = bks[0];
  const bkCreated = bk && (bk.created_at || bk.scheduled_at);
  add('brief.book', briefAt, bkCreated);
  let callAt = toD(c.meeting_at);
  const lastBk = bks[bks.length - 1];
  if (bk) {
    const prep = mark(row(r => r.step === 'prep' && r.kind === 'milestone'));
    add('prep.ready', bkCreated, prep?.at || (callAt && callAt <= now ? callAt : null), { due: addDays(lastBk.scheduled_at, -1) });
    const flags = [];
    if (!callAt && toD(lastBk.scheduled_at) < addDays(now, -1)) flags.push('Call time passed: log the call');
    const held = callAt || null;
    const it = add('call.held', bkCreated, held && held <= now ? held : null, { scheduled: lastBk.scheduled_at, flags });
    if (it && flags.length) { it.who = 'M'; it.title = 'Log the discovery call'; }
  }

  // 4–5 recap and proposal loop
  if (callAt && callAt <= now) {
    const recap = mark(row(r => r.step === 'recap' && r.direction === 'out'));
    add('recap.sent', callAt, recap?.at);
  }
  const sends = dedupeByDay([
    c.proposal_sent_at && { at: c.proposal_sent_at },
    ...tl.filter(r => r.step === 'proposal' && r.kind === 'doc_sent').map(r => (usedRows.add(r.id), { at: r.at, row: r })),
  ]);
  const replies = dedupeByDay([
    c.proposal_reply_at && { at: c.proposal_reply_at, outcome: c.proposal_outcome },
    ...tl.filter(r => r.step === 'proposal' && r.direction === 'in' && r.meta.outcome).map(r => (usedRows.add(r.id), { at: r.at, outcome: r.meta.outcome, row: r })),
  ]);
  // An outcome saved on the contact without a reply date still counts, dated the next log row or the send.
  if (!replies.length && c.proposal_outcome && sends.length) replies.push({ at: sends[sends.length - 1].at, outcome: c.proposal_outcome, rows: [] });
  if (callAt) add('proposal.write', callAt, sends[0]?.at);
  let yesAt = null;
  sends.forEach((s, i) => {
    const next = sends[i + 1];
    const rep = replies.find(r => r.at >= sod(s.at) && (!next || r.at <= next.at));
    // A newer proposal replaces an unanswered older one.
    add('proposal.decide', s.at, rep?.at || next?.at, {
      due: i === sends.length - 1 && c.proposal_due_at ? c.proposal_due_at : addDays(s.at, 7), round: i + 1,
      title: rep || !next ? undefined : `Proposal v${i + 1} (replaced by v${i + 2})`,
    });
    if (rep?.outcome === 'changes_requested') add('proposal.revise', rep.at, next?.at, { round: i + 1 });
    if (rep?.outcome === 'accepted') yesAt = rep.at;
  });
  if (!yesAt && c.stage === 'won') yesAt = toD(c.proposal_reply_at) || sends[sends.length - 1]?.at || null;

  // 6 agreement
  const torSent = mark(row(r => r.kind === 'agreement_sent'));
  const torSign = mark(row(r => r.kind === 'agreement_signed'));
  if (yesAt) {
    add('agreement.send', yesAt, torSent?.at);
    if (torSent) add('agreement.sign', torSent.at, torSign?.at || torSent.done_at, {
      due: torSent.due_at || addDays(yesAt, 7),
      ref: { table: 'crm_timeline', id: torSent.id, field: 'done_at', label: 'Signed' },
    });
    const intakeTask = mark(row(r => r.meta.doc === 'intake' && r.kind === 'deadline'));
    const intakeOut = mark(row(r => r.meta.doc === 'intake' && r.direction === 'out'));
    const intakeIn = mark(row(r => r.meta.doc === 'intake' && r.direction === 'in'));
    const dContact = mark(row(r => r.meta.doc === 'decision_contact'));
    const sent = intakeOut || (intakeTask?.done_at ? { at: intakeTask.done_at } : null);
    if (!sent) {
      add('agreement.intake', yesAt, null, {
        who: 'M', intakeSent: false, due: intakeTask?.due_at || addDays(yesAt, 2),
        ref: intakeTask ? { table: 'crm_timeline', id: intakeTask.id, field: 'done_at', label: 'Sent' } : null,
      });
    } else {
      add('agreement.intake', sent.at, intakeIn && dContact ? maxD(intakeIn.at, dContact.at) : intakeIn?.at, {
        intakeSent: true, due: addDays(yesAt, 7),
      });
    }
  }

  // 7–8 per deliverable; versions are review rounds
  const signedAt = torSign?.at || torSent?.done_at || null;
  const byName = new Map();
  [...dl].sort((a, b) => a.version - b.version).forEach(v => {
    if (!byName.has(v.name)) byName.set(v.name, []);
    byName.get(v.name).push(v);
  });
  const startAt = signedAt || yesAt;
  for (const [name, vs] of byName) {
    const v1 = vs[0];
    const flags = !signedAt && yesAt && !v1.sent_at ? ['ToR not signed yet'] : [];
    add('build.v1', startAt || v1.created_at, v1.sent_at, {
      due: v1.due_at, deliverable: name, flags,
      ref: { table: 'crm_deliverables', id: v1.id, field: 'sent_at', label: 'Sent' },
    });
    vs.forEach((v, i) => {
      if (v.sent_at) {
        const explicit = !!v.feedback_due_at;
        add('review.client', v.sent_at, v.feedback_at || v.final_at, {
          due: v.feedback_due_at || addWorkdays(v.sent_at, 5),
          nudgeAt: explicit ? addWorkdays(v.feedback_due_at, -1) : addWorkdays(v.sent_at, 3),
          round: v.version, deliverable: name,
          flags: v.version >= 3 ? ['Round 3+: beyond the included rounds'] : [],
          ref: { table: 'crm_deliverables', id: v.id, field: 'feedback_at', label: 'Feedback in' },
        });
      }
      const nextV = vs[i + 1];
      if (nextV && !v.final_at) {
        add('review.revise', v.feedback_at || v.sent_at, nextV.sent_at, {
          due: nextV.due_at || (v.feedback_at ? addWorkdays(v.feedback_at, 5) : null),
          round: nextV.version, deliverable: name,
          ref: { table: 'crm_deliverables', id: nextV.id, field: 'sent_at', label: 'Sent' },
        });
      }
    });
  }

  // 9–11 handover, close, follow-up
  const allFinal = byName.size > 0 && [...byName.values()].every(vs => vs.some(v => v.final_at));
  const finalAt = allFinal ? maxD(dl.map(v => v.final_at)) : null;
  const handover = mark(row(r => r.step === 'handover' && r.kind === 'meeting'));
  const handoverDone = handover && toD(handover.at) <= now ? toD(handover.at) : null;
  if (finalAt) add('handover.held', finalAt, handoverDone, { scheduled: handover && !handoverDone ? handover.at : null });
  add('close.exit', c.survey_sent_at, c.survey_responded_at);
  const testimonial = mark(row(r => r.meta.doc === 'testimonial'));
  const interview = mark(row(r => r.meta.doc === 'interview'));
  if (c.survey_responded_at) add('close.story', c.survey_responded_at, testimonial && interview ? maxD(testimonial.at, interview.at) : null);
  if (handoverDone) {
    const ci = mark(tl.find(r => toD(r.at) > handoverDone && r.step === 'followup' && ['meeting', 'message'].includes(r.kind)));
    add('followup.checkin', handoverDone, ci?.at, { due: addDays(handoverDone, 90) });
  }
  if (interview) add('followup.case', interview.at, mark(row(r => r.meta.doc === 'case_study'))?.at);

  // Ad-hoc agreed dates: open log rows with a due date that no segment already uses.
  tl.filter(r => r.due_at && !usedRows.has(r.id)).forEach(r => {
    const it = add('adhoc', toD(r.at) > toD(r.due_at) ? r.created_at || r.due_at : r.at, r.done_at, {
      who: r.owed_by || 'M', due: r.due_at, title: r.title, logStep: r.step,
      ref: { table: 'crm_timeline', id: r.id, field: 'done_at', label: 'Done' },
    });
    if (it) { it.step = r.step ? STEP_N[r.step] : null; it.row = r; }
    usedRows.add(r.id);
  });
  // The contact's "next steps" date is used only for clients with no logged agreed dates yet.
  const hasLoggedDates = tl.some(r => r.due_at);
  if (c.next_steps_due_at && !closed && !hasLoggedDates) {
    const first = String(c.next_steps || '').split('\n').map(l => l.replace(/^[-•*\s]+/, '').trim()).find(Boolean) || 'Next step';
    const it = add('adhoc', minD(addDays(c.next_steps_due_at, -7), now), null, { who: 'M', due: c.next_steps_due_at, title: first.length > 90 ? first.slice(0, 89) + '…' : first });
    if (it) it.legacy = true;
  }

  // Nudges: outgoing reminder rows attach to the open client-owed item of the same step.
  tl.filter(r => r.kind === 'reminder' && r.direction === 'out').forEach(r => {
    const at = toD(r.at);
    const cands = out.filter(it => it.who === 'C' && it.from <= at && (!it.to || it.to >= at) &&
      (!r.step || it.logStep === r.step || STEPS[(it.step || 1) - 1]?.key === r.step));
    const target = cands.find(it => r.deliverable_id && it.ref?.id && dl.find(v => v.id === r.deliverable_id)?.name === it.deliverable) || cands[cands.length - 1];
    if (target) target.nudges.push({ at, channel: r.channel });
  });

  return { items: out, yesAt, signedAt, sends, replies, torSent, torSign, byName, closed, closedAt };
}

// ---------- typical times ----------
export const durationOf = (it, now) => (it.unit === 'wd' ? wdays(it.from, it.to || now) : days(it.from, it.to || now));

export function typicalStats(allItems, now) {
  const stats = {};
  for (const key of Object.keys(SEG)) {
    if (key === 'adhoc') continue;
    const done = allItems.filter(it => it.key === key && it.to && !it.closedByStage).map(it => durationOf(it, now));
    const n = done.length, med = median(done), target = SEG[key].target;
    stats[key] = {
      key, n, median: med, target, unit: SEG[key].unit || 'd',
      typical: n >= 3 ? med : target,
      basis: n >= 3 ? `typical · n=${n}` : 'target',
      ratio: med != null && target ? med / target : null,
    };
  }
  return stats;
}

// ---------- verdicts ----------
const TONE_RANK = { late: 3, slow: 2, ok: 1, info: 0 };
const NUDGE_ADVICE = ['Friendly check-in', 'Offer a short call', 'Last call before closing'];

export function verdictFor(it, typ, now) {
  const today = sod(now);
  const el = durationOf(it, now);
  it.elapsed = el;
  const due = it.due ? sod(it.due) : null;
  const lastNudge = it.nudges.length ? it.nudges[it.nudges.length - 1].at : null;
  const V = (code, tone, pill, advice = '') => ({ code, tone, pill, advice });

  if (it.who === 'MC' && it.scheduled && sod(it.scheduled) >= today) {
    return V(1, 'info', `Scheduled ${fmtDay(it.scheduled)}`, it.key === 'call.held' ? `Prep due ${fmtDay(addDays(it.scheduled, -1))}` : '');
  }
  if (it.who !== 'C') {
    if (due && due < today) return V(2, 'late', `Overdue ${days(due, today)} d · your turn`, 'Send it or move the date with the client');
    if (due && wdays(today, due) <= 1) return V(4, 'late', 'Do today', `Due ${fmtDay(due)}`);
    if (due) {
      const win = Math.max(1, wdays(it.from, due)), left = wdays(today, due);
      if (left / win < 0.3) return V(5, 'slow', 'At risk', `${left} working days left · due ${fmtDay(due)}`);
      return V(8, 'ok', 'Your turn', `Due ${fmtDay(due)}`);
    }
    if (typ && el > 2 * typ) return V(6, 'late', 'Your turn · late', `${el} d so far, target ${typ} d`);
    if (typ && el > typ) return V(7, 'slow', 'Your turn · slow', `${el} d so far, target ${typ} d`);
    return V(8, 'ok', 'Your turn');
  }
  // owed by the client
  if (due && due < today) {
    const recent = lastNudge && days(lastNudge, now) <= 2;
    return V(3, 'late', `Client overdue ${days(due, today)} d`, recent ? `Nudged ${fmtDay(lastNudge)}; call or WhatsApp next` : 'Chase today');
  }
  if (it.key === 'proposal.decide' && el >= 21 && it.nudges.length >= 2) return V(11, 'late', 'Ghost check', 'Close as ghosted or send a final note');
  if (lastNudge && days(lastNudge, now) < 2) return V(9, 'ok', `Nudged ${fmtDay(lastNudge)}`, due ? `Due ${fmtDay(due)}` : '');
  let np = it.nudgeAt || (due ? addWorkdays(due, -1) : (typ ? addDays(it.from, typ) : null));
  if (lastNudge) np = maxD(np, addDays(lastNudge, 5));
  if (np && sod(np) <= today) return V(10, 'slow', 'Nudge today', NUDGE_ADVICE[Math.min(it.nudges.length, 2)]);
  return V(12, 'ok', 'Waiting on client · on track', due ? `Due ${fmtDay(due)}` : '');
}
export const isToDoToday = (it) => it.verdict && (it.who === 'C' ? [3, 10, 11] : [2, 4, 6]).includes(it.verdict.code);
export const isOverdue = (it) => it.verdict && [2, 3].includes(it.verdict.code);
export const isSlow = (it) => it.verdict && [5, 6, 7].includes(it.verdict.code);

export function compareChip(it, stats, now) {
  if (it.closedByStage) return { tone: 'info', text: 'closed by stage' };
  if (it.due) {
    const late = days(it.due, it.to);
    return late <= 0 ? { tone: 'ok', text: 'on time' } : { tone: late > 3 ? 'late' : 'slow', text: `${late} d late` };
  }
  const s = stats[it.key], typ = s?.typical;
  if (!typ) return { tone: 'info', text: '' };
  const r = durationOf(it, now) / typ;
  if (r < 0.5) return { tone: 'ok', text: 'faster' };
  if (r <= 1.5) return { tone: 'ok', text: `about ${s.basis === 'target' ? 'target' : 'typical'}` };
  if (r <= 3) return { tone: 'slow', text: 'slow' };
  return { tone: 'late', text: 'late' };
}

// ---------- the whole board ----------
export function buildBoard(raw, now = new Date()) {
  const by = (rows, k = 'contact_id') => {
    const m = new Map();
    (rows || []).forEach(r => { if (!m.has(r[k])) m.set(r[k], []); m.get(r[k]).push(r); });
    return (id) => m.get(id) || [];
  };
  const g = {
    briefs: by(raw.briefs), bookings: by(raw.bookings), attachments: by(raw.attachments),
    timeline: by(raw.timeline), deliverables: by(raw.deliverables), events: by(raw.events),
  };
  const clients = (raw.contacts || []).filter(c => c.stage !== 'archived').map(c => {
    const d = {
      briefs: g.briefs(c.id), bookings: g.bookings(c.id), attachments: g.attachments(c.id),
      timeline: g.timeline(c.id).map(r => ({ ...r, meta: r.meta || {} })), deliverables: g.deliverables(c.id), events: g.events(c.id),
    };
    return { c, d, ...instancesFor(c, d, now) };
  });
  const stats = typicalStats(clients.flatMap(x => x.items), now);

  clients.forEach(x => {
    x.items.forEach(it => {
      if (it.waiting || it.upcoming) it.verdict = it.waiting ? verdictFor(it, stats[it.key]?.typical, now) : null;
    });
    x.waiting = x.items.filter(it => it.waiting)
      .sort((a, b) => (TONE_RANK[b.verdict.tone] - TONE_RANK[a.verdict.tone]) || ((a.due || 9e15) - (b.due || 9e15)));
    x.done = x.items.filter(it => it.to).sort((a, b) => a.to - b.to);
    x.top = x.waiting[0] || null;
    x.todo = x.waiting.filter(isToDoToday).length;
    x.overdue = x.waiting.filter(isOverdue).length;
    x.slow = x.waiting.filter(isSlow).length;
    x.inDelivery = !!x.yesAt && !x.closed;
    x.journey = STEPS.map(s => {
      const its = x.items.filter(it => it.step === s.n && it.key !== 'adhoc');
      const waitingHere = its.some(it => it.waiting);
      const doneAll = its.length && its.every(it => it.to);
      return { ...s, state: waitingHere ? 'current' : doneAll ? 'done' : 'upcoming', at: maxD(its.map(it => it.to)) };
    });
    const cur = x.journey.filter(j => j.state === 'current');
    x.currentStep = cur.length ? cur[0].n : (x.journey.filter(j => j.state === 'done').pop()?.n || 1);
    x.agenda = agendaFor(x, now);
    x.feed = feedFor(x, now);
    x.clock = clockFor(x, now);
  });

  const live = clients.filter(x => !x.closed);
  const allWaiting = live.flatMap(x => x.waiting.map(it => ({ it, x })));
  const in7 = addDays(sod(now), 8);
  const next7 = live.flatMap(x => x.agenda.filter(a => !a.done && a.date >= sod(now) && a.date < in7).map(a => ({ ...a, x })))
    .sort((a, b) => a.date - b.date);
  const tiles = {
    mine:    { n: allWaiting.filter(w => w.it.who !== 'C' && w.it.verdict.code !== 1).length, today: allWaiting.filter(w => w.it.who !== 'C' && isToDoToday(w.it)).length, overdue: allWaiting.some(w => w.it.who !== 'C' && isOverdue(w.it)) },
    theirs:  { n: allWaiting.filter(w => w.it.who === 'C').length, today: allWaiting.filter(w => w.it.who === 'C' && isToDoToday(w.it)).length },
    next7:   { n: next7.length, first: next7[0] || null },
    overdue: { n: allWaiting.filter(w => isOverdue(w.it)).length },
    delivery:{ n: live.filter(x => x.inDelivery).length, withClient: live.reduce((s, x) => s + x.waiting.filter(it => it.key === 'review.client').length, 0) },
  };
  return { now, clients, stats, tiles };
}

// ---------- agenda (past + future dates) ----------
function agendaFor(x, now) {
  const out = [];
  const seen = new Set();
  const push = (a) => {
    if (!a.date) return;
    a.date = toD(a.date);
    const k = `${dayKey(a.date)}|${a.what}`;
    if (seen.has(k)) return;
    seen.add(k);
    out.push(a);
  };
  const today = sod(now);
  // open obligations with a date
  x.items.filter(it => !it.to && it.due).forEach(it => push({
    date: it.due, what: it.title, who: it.who, kind: 'due', done: false,
    overdue: sod(it.due) < today, tone: it.verdict?.tone || 'ok', itemKey: it.key,
  }));
  // calls
  x.d.bookings.filter(b => b.status !== 'cancelled').forEach(b => push({
    date: b.scheduled_at, what: 'Discovery call', who: 'MC', kind: toD(b.scheduled_at) < now ? 'done' : 'scheduled', done: toD(b.scheduled_at) < now,
  }));
  // log rows: meetings, milestones, due rows already done
  x.d.timeline.forEach(r => {
    if (['meeting', 'milestone'].includes(r.kind)) push({
      date: r.at, end: r.meta?.ends_at, what: r.title, who: r.owed_by || 'MC',
      kind: toD(r.at) > now ? 'scheduled' : 'done', done: toD(r.at) <= now,
    });
    else if (r.due_at && r.done_at) push({ date: r.done_at, what: r.title, who: r.owed_by || 'M', kind: 'done', done: true });
    else if (toD(r.at) <= now && r.kind !== 'note' && r.kind !== 'deadline') push({ date: r.at, what: r.title, who: r.direction === 'in' ? 'C' : 'M', kind: 'done', done: true });
  });
  // deliverables
  x.d.deliverables.forEach(v => {
    if (v.sent_at) push({ date: v.sent_at, what: `${v.name} v${v.version} sent`, who: 'M', kind: 'done', done: true });
    else if (v.due_at) push({ date: v.due_at, what: `${v.name} v${v.version}`, who: 'M', kind: 'due', done: false, overdue: sod(v.due_at) < today });
    if (v.feedback_at) push({ date: v.feedback_at, what: `Feedback on ${v.name} v${v.version}`, who: 'C', kind: 'done', done: true });
    if (v.final_at) push({ date: v.final_at, what: `${v.name} final`, who: 'M', kind: 'done', done: true });
  });
  if (x.c.meeting_at && toD(x.c.meeting_at) <= now) push({ date: x.c.meeting_at, what: 'Discovery call', who: 'MC', kind: 'done', done: true });
  return out.sort((a, b) => a.date - b.date);
}

// ---------- back-and-forth feed ----------
function feedFor(x, now) {
  const rows = x.d.timeline.filter(r => toD(r.at) <= now).map(r => ({
    at: toD(r.at), dir: r.direction, channel: r.channel, step: r.step, kind: r.kind, title: r.title, body: r.body,
    attachment_id: r.attachment_id, due: toD(r.due_at), done: toD(r.done_at), owed_by: r.owed_by, row: r,
  }));
  const has = (step, at, pred = () => true) => rows.some(r => r.step === step && dayKey(r.at) === dayKey(at) && pred(r));
  const derived = [];
  const brief = x.d.briefs[0];
  if (brief?.submitted_at) derived.push({ at: toD(brief.submitted_at), dir: 'in', channel: 'other', step: 'brief', title: 'Brief submitted on the website' });
  x.d.bookings.forEach(b => derived.push({
    at: toD(b.created_at || b.scheduled_at), dir: 'in', channel: 'other', step: 'call',
    title: `${b.status === 'cancelled' ? 'Booking cancelled' : 'Call booked'} for ${fmtDay(b.scheduled_at)}`,
  }));
  if (x.c.meeting_at && toD(x.c.meeting_at) <= now && !has('call', x.c.meeting_at)) derived.push({ at: toD(x.c.meeting_at), dir: 'internal', channel: 'meeting', step: 'call', title: 'Discovery call held' });
  if (x.c.proposal_sent_at && !has('proposal', x.c.proposal_sent_at, r => r.kind === 'doc_sent')) derived.push({ at: toD(x.c.proposal_sent_at), dir: 'out', channel: 'email', step: 'proposal', title: 'Proposal sent' });
  if (x.c.proposal_reply_at && !has('proposal', x.c.proposal_reply_at, r => r.dir === 'in')) derived.push({ at: toD(x.c.proposal_reply_at), dir: 'in', channel: 'email', step: 'proposal', title: `Answer on the proposal: ${(x.c.proposal_outcome || '').replace('_', ' ')}` });
  if (x.c.survey_sent_at) derived.push({ at: toD(x.c.survey_sent_at), dir: 'out', channel: 'email', step: 'close', title: 'Exit survey sent' });
  if (x.c.survey_responded_at) derived.push({ at: toD(x.c.survey_responded_at), dir: 'in', channel: 'email', step: 'close', title: 'Exit survey answered' });
  x.d.deliverables.forEach(v => {
    const linked = (at) => rows.some(r => r.row.deliverable_id === v.id && dayKey(r.at) === dayKey(at));
    if (v.sent_at && toD(v.sent_at) <= now && !linked(v.sent_at)) derived.push({ at: toD(v.sent_at), dir: 'out', channel: 'doc', step: v.version === 1 ? 'build' : 'review', title: `${v.name} v${v.version} sent`, attachment_id: v.attachment_id });
    if (v.feedback_at && !linked(v.feedback_at)) derived.push({ at: toD(v.feedback_at), dir: 'in', channel: 'doc', step: 'review', title: `Feedback on ${v.name} v${v.version}`, attachment_id: v.feedback_attachment_id });
    if (v.final_at) derived.push({ at: toD(v.final_at), dir: 'out', channel: 'doc', step: 'review', title: `${v.name} final` });
  });
  derived.forEach(r => { r.derived = true; });
  return [...rows, ...derived].filter(r => r.at).sort((a, b) => b.at - a.at);
}

// ---------- who holds the clock ----------
// Each day since the brief goes to one bucket: on us, on the client, both, scheduled (a date is set), or quiet.
function clockFor(x, now) {
  const its = x.items.filter(it => it.from <= now && !['followup.checkin'].includes(it.key) && !it.closedByStage);
  const start = minD(its.map(it => it.from));
  const res = { M: 0, C: 0, both: 0, MC: 0, quiet: 0, total: 0 };
  if (!start) return res;
  for (let day = sod(start); day < sod(now); day = addDays(day, 1)) {
    const end = addDays(day, 1);
    const open = its.filter(it => it.from < end && (it.to || now) > day && !(it.to && sod(it.to) <= day));
    const m = open.some(it => it.who === 'M'), cl = open.some(it => it.who === 'C'), mc = open.some(it => it.who === 'MC');
    res[m && cl ? 'both' : m ? 'M' : cl ? 'C' : mc ? 'MC' : 'quiet']++;
    res.total++;
  }
  return res;
}
