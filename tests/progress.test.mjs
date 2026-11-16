import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBoard, wdays, addWorkdays } from '../progress-core.js';

const NOW = new Date('2026-11-16T12:00:00');
const C = 'c1';
const contact = (over = {}) => ({ id: C, created_at: '2026-10-26T12:00:00', path: 'founder', name: 'Test', email: 't@x', stage: 'proposal_sent', ...over });
const raw = (over = {}) => ({ contacts: [contact(over.contact)], briefs: [{ contact_id: C, submitted_at: '2026-10-26T12:00:00' }],
  bookings: [{ contact_id: C, created_at: '2026-10-26T13:00:00', scheduled_at: '2026-10-30T12:00:00', status: 'accepted' }],
  attachments: [], timeline: over.timeline || [], deliverables: over.deliverables || [], events: [] });
const tl = (o) => ({ id: Math.random().toString(36).slice(2), contact_id: C, direction: 'internal', channel: 'other', step: null, kind: 'note', meta: {}, ...o });

test('working days skip weekends', () => {
  assert.equal(wdays(new Date('2026-11-13T12:00:00'), new Date('2026-11-16T12:00:00')), 1); // Fri → Mon
  assert.equal(addWorkdays(new Date('2026-11-13T12:00:00'), 3).getDate(), 18);           // Fri + 3 wd = Wed
});

test('a proposal past its reply date is a client-overdue item with chase advice', () => {
  const b = buildBoard(raw({ contact: { meeting_at: '2026-10-30T12:00:00', proposal_sent_at: '2026-10-30T15:00:00', proposal_due_at: '2026-11-14T12:00:00' } }), NOW);
  const x = b.clients[0];
  assert.equal(x.top.key, 'proposal.decide');
  assert.equal(x.top.who, 'C');
  assert.match(x.top.verdict.pill, /^Client overdue 2 d/);
  assert.equal(x.top.verdict.advice, 'Chase today');
  // No recap was logged, so that is also on us, and late.
  assert.equal(x.waiting.find(i => i.key === 'recap.sent').verdict.pill, 'Your turn · late');
  assert.equal(x.todo, 2);
  assert.equal(x.journey.find(j => j.n === 5).state, 'current');
});

test('a CRM column and a log row for the same send count once', () => {
  const b = buildBoard(raw({
    contact: { meeting_at: '2026-10-30T12:00:00', proposal_sent_at: '2026-10-30T15:00:00', proposal_due_at: '2026-11-20T12:00:00' },
    timeline: [tl({ at: '2026-10-30T16:00:00', step: 'proposal', kind: 'doc_sent', direction: 'out', title: 'Proposal' })],
  }), NOW);
  assert.equal(b.clients[0].sends.length, 1);
  assert.equal(b.clients[0].items.filter(i => i.key === 'proposal.decide').length, 1);
});

test('after yes, an unsigned ToR waits on the client and v1 work waits on us', () => {
  const b = buildBoard(raw({
    contact: { meeting_at: '2026-10-30T12:00:00', proposal_sent_at: '2026-10-30T15:00:00', proposal_reply_at: '2026-11-13T12:00:00', proposal_outcome: 'accepted' },
    timeline: [tl({ at: '2026-11-16T09:00:00', step: 'agreement', kind: 'agreement_sent', direction: 'out', title: 'ToR', due_at: '2026-11-20T12:00:00', owed_by: 'C' })],
    deliverables: [{ id: 'd1', contact_id: C, name: 'MEAL', version: 1, due_at: '2026-12-04T12:00:00', created_at: '2026-11-16T09:00:00' }],
  }), NOW);
  const x = b.clients[0];
  const sign = x.waiting.find(i => i.key === 'agreement.sign');
  assert.equal(sign.who, 'C');
  assert.match(sign.verdict.pill, /on track/);
  const build = x.waiting.find(i => i.key === 'build.v1');
  assert.equal(build.who, 'M');
  assert.ok(build.flags.includes('ToR not signed yet'));
  assert.ok(x.inDelivery);
});

test('a logged nudge attaches to the open client item and changes the verdict', () => {
  const b = buildBoard(raw({
    contact: { meeting_at: '2026-10-30T12:00:00', proposal_sent_at: '2026-11-09T15:00:00', proposal_due_at: '2026-11-20T12:00:00' },
    timeline: [tl({ at: '2026-11-16T10:00:00', step: 'proposal', kind: 'reminder', direction: 'out', channel: 'whatsapp', title: 'Nudge' })],
  }), NOW);
  const it = b.clients[0].waiting.find(i => i.key === 'proposal.decide');
  assert.equal(it.nudges.length, 1);
  assert.match(it.verdict.pill, /^Nudged/);
});

test('open log rows with a due date become agreed-date items and reach the agenda', () => {
  const b = buildBoard(raw({ timeline: [tl({ at: '2026-11-10T12:00:00', kind: 'deadline', title: 'Send notes', due_at: '2026-11-12T12:00:00', owed_by: 'C' })] }), NOW);
  const x = b.clients[0];
  const it = x.waiting.find(i => i.key === 'adhoc');
  assert.equal(it.title, 'Send notes');
  assert.match(it.verdict.pill, /^Client overdue/);
  assert.ok(x.agenda.some(a => a.what === 'Send notes' && a.overdue));
});

test('a closed contact has nothing waiting', () => {
  const b = buildBoard(raw({ contact: { stage: 'ghosted', meeting_at: '2026-10-30T12:00:00', proposal_sent_at: '2026-10-30T15:00:00' } }), NOW);
  assert.equal(b.clients[0].waiting.length, 0);
  assert.ok(b.clients[0].items.some(i => i.closedByStage));
});
