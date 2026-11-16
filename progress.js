// Method into Impact · admin · Progress and bottlenecks view.
// Draws the board from progress-core.js. All reads and writes go through the
// `load` and `actions` functions that admin.js passes in.

import * as P from './progress-core.js?v=2';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const WHO = { M: 'Method into Impact', C: 'Client', MC: 'Shared' };
const whoChip = (w) => `<span class="pg-who pg-who-${esc(w || 'M')}" title="${esc(WHO[w] || '')}">${esc(w || 'M')}</span>`;
const pill = (tone, text) => text ? `<span class="pg-pill pg-tone-${tone}">${esc(text)}</span>` : '';
const CH_ICON = { email: '✉', whatsapp: 'WA', meeting: '◎', call: '☎', doc: '▤', other: '·' };
const DIR = { in: '←', out: '→', internal: '•' };
const DIR_TITLE = { in: 'From the client', out: 'To the client', internal: 'Internal' };
const OUTCOMES = ['', 'accepted', 'changes_requested', 'declined'];
const DOCS = ['', 'intake', 'decision_contact', 'testimonial', 'interview', 'case_study'];
const KINDS = ['note', 'message', 'meeting', 'doc_sent', 'doc_received', 'agreement_sent', 'agreement_signed', 'reminder', 'milestone', 'deadline'];
const CHANNELS = ['email', 'whatsapp', 'meeting', 'call', 'doc', 'other'];
const opts = (list, sel, labels = {}) => list.map(v => `<option value="${esc(v)}" ${v === sel ? 'selected' : ''}>${esc(labels[v] ?? (v ? v.replace(/_/g, ' ') : '—'))}</option>`).join('');
const pad = (n) => String(n).padStart(2, '0');
const toLocalInput = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const toDateInput = (d) => d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : '';
const monday = (d) => { const x = P.sod(d); const g = (x.getDay() + 6) % 7; return P.addDays(x, -g); };
const unitTxt = (n, unit) => `${Math.round(n * 10) / 10} ${unit === 'wd' ? 'wd' : 'd'}`;

export function createProgress({ root, load, actions, getPath = () => 'all', getSearch = () => '', openContact = () => {}, now = () => new Date() }) {
  const st = { raw: null, board: null, tab: 'all', who: 'any', show: 'all', showDone: false, feedAll: {}, sysLog: {}, error: null, loading: false };

  async function refresh() {
    st.loading = true;
    try { st.raw = await load(); st.error = null; }
    catch (e) { st.error = e?.message || String(e); }
    st.loading = false;
    rebuild();
  }
  function rebuild() {
    if (st.raw) {
      st.board = P.buildBoard(structuredClone(st.raw), now());
      st.updated = now();
    }
    render();
  }

  // ---------- scope: path filter + search from the topbar ----------
  function scoped() {
    const path = getPath(), q = (getSearch() || '').trim().toLowerCase();
    return st.board.clients.filter(x => {
      if (path !== 'all' && x.c.path !== path) return false;
      if (q && !`${x.c.name} ${x.c.email} ${x.c.organisation || ''}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }
  const itemTab = (x, it) => P.tabOfStep(it.step || x.currentStep);
  const inTab = (x, it) => st.tab === 'all' || itemTab(x, it) === st.tab;
  const whoOk = (it) => st.who === 'any' || (st.who === 'C' ? it.who === 'C' : it.who !== 'C');

  // ---------- render ----------
  function render() {
    if (st.error) { root.innerHTML = `<div class="pg-empty">Could not load progress: ${esc(st.error)}</div>`; return; }
    if (!st.board) { root.innerHTML = `<div class="pg-empty">Loading progress…</div>`; return; }
    const clients = scoped();
    const live = clients.filter(x => !x.closed);
    root.innerHTML = `
      ${headHtml()}
      ${tilesHtml(live)}
      <div class="pg-grid">
        <section class="pg-panel pg-agenda" id="pg-agenda">${agendaHtml(live)}</section>
        <section class="pg-panel">${slowHtml()}${clockHtml(live)}</section>
      </div>
      <section class="pg-panel pg-cards-wrap" id="pg-cards">${oneByOneHtml(clients)}</section>
      ${keyHtml()}
      <dialog class="pg-dialog" id="pg-dialog"></dialog>`;
    bind();
  }

  function headHtml() {
    const t = st.updated ? st.updated.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
    return `<div class="pg-head">
      <div><h1>Progress and bottlenecks</h1>
      <p>Every client, step by step: who holds the ball, what is due, and where the journey slows down. Updated ${esc(t)}, your local time.</p></div>
      <button type="button" class="pg-btn" data-act="refresh">${st.loading ? 'Refreshing…' : '⟳ Refresh'}</button>
    </div>`;
  }

  function tilesHtml(live) {
    const w = live.flatMap(x => x.waiting.map(it => ({ it, x })));
    const mine = w.filter(e => e.it.who !== 'C' && e.it.verdict.code !== 1);
    const theirs = w.filter(e => e.it.who === 'C');
    const overdue = w.filter(e => P.isOverdue(e.it));
    const today = P.sod(st.board.now), in8 = P.addDays(today, 8);
    const next7 = live.flatMap(x => x.agenda.filter(a => !a.done && a.date >= today && a.date < in8).map(a => ({ ...a, x }))).sort((a, b) => a.date - b.date);
    const delivery = live.filter(x => x.inDelivery);
    const withClient = delivery.reduce((s, x) => s + x.waiting.filter(it => it.key === 'review.client').length, 0);
    const tile = (key, n, label, sub, cls = '') => `<button type="button" class="pg-tile ${cls} ${st.tile === key ? 'active' : ''}" data-tile="${key}">
      <b>${n}</b><span>${esc(label)}</span><small>${sub}</small></button>`;
    return `<section class="pg-tiles">
      ${tile('mine', mine.length, 'Your turn', `${mine.filter(e => P.isToDoToday(e.it)).length} to do today`, mine.some(e => P.isOverdue(e.it)) ? 'pg-tile-alert' : 'pg-tile-m')}
      ${tile('theirs', theirs.length, 'Waiting on clients', `${theirs.filter(e => P.isToDoToday(e.it)).length} to nudge or chase today`, 'pg-tile-c')}
      ${tile('next7', next7.length, 'Next 7 days', next7[0] ? `${esc(P.fmtDay(next7[0].date))} · ${esc(trim(next7[0].what, 34))}` : 'nothing dated', 'pg-tile-sun')}
      ${tile('overdue', overdue.length, 'Overdue', overdue.length ? 'either side' : 'nothing late', overdue.length ? 'pg-tile-alert' : '')}
      ${tile('delivery', delivery.length, 'In delivery', `${withClient} version${withClient === 1 ? '' : 's'} with clients`, 'pg-tile-teal')}
    </section>`;
  }

  // ---------- coming up ----------
  function agendaHtml(live) {
    const today = P.sod(st.board.now), in30 = P.addDays(today, 30);
    const rows = live.flatMap(x => x.agenda.map(a => ({ ...a, x })));
    const overdue = rows.filter(a => !a.done && a.overdue).sort((a, b) => a.date - b.date);
    const future = rows.filter(a => !a.done && !a.overdue && a.date >= today);
    const soon = future.filter(a => a.date < in30).sort((a, b) => a.date - b.date);
    const later = future.filter(a => a.date >= in30).sort((a, b) => a.date - b.date);
    const past = st.showDone ? rows.filter(a => a.done).sort((a, b) => a.date - b.date) : [];
    const weekLabel = (d) => {
      const w = monday(d), w0 = monday(today), diff = Math.round((w - w0) / (7 * 864e5));
      return diff === 0 ? 'This week' : diff === 1 ? 'Next week' : diff === -1 ? 'Last week' : `w/c ${P.fmtShort(w)}`;
    };
    const group = (list, cls = '') => {
      const m = new Map();
      list.forEach(a => { const k = weekLabel(a.date); if (!m.has(k)) m.set(k, []); m.get(k).push(a); });
      return [...m].map(([k, v]) => `<h4 class="${cls}">${esc(k)}</h4>${v.map(rowHtml).join('')}`).join('');
    };
    const rowHtml = (a) => {
      const state = a.done ? pill('info', 'done') : a.overdue ? pill('late', 'overdue') : a.kind === 'scheduled' ? pill('info', 'scheduled') : pill(a.tone === 'late' ? 'late' : a.tone === 'slow' ? 'slow' : 'ok', 'due');
      const end = a.end ? `–${P.fmtShort(a.end)}` : '';
      return `<div class="pg-ag-row ${a.done ? 'is-done' : ''} ${a.overdue ? 'is-late' : ''}">
        <span class="pg-ag-date">${esc(P.fmtDay(a.date))}${esc(end)}</span>
        <span class="pg-ag-client">${esc(shortName(a.x))}</span>
        <span class="pg-ag-what">${esc(a.what)}</span>
        ${whoChip(a.who)}${state}
        <button type="button" class="pg-link" data-goto="${esc(a.x.c.id)}" title="Open the card">↗</button>
      </div>`;
    };
    return `<div class="pg-panel-head"><h2>Coming up</h2>
        <label class="pg-toggle"><input type="checkbox" data-act="showdone" ${st.showDone ? 'checked' : ''}> Show done</label></div>
      ${past.length ? `<div class="pg-ag-past">${group(past, 'is-done')}</div>` : ''}
      ${overdue.length ? `<h4 class="pg-ag-overdue">Overdue</h4>${overdue.map(rowHtml).join('')}` : ''}
      ${soon.length ? group(soon) : '<p class="pg-muted">Nothing dated in the next 30 days.</p>'}
      ${later.length ? `<details class="pg-later"><summary>Later · ${later.length} date${later.length === 1 ? '' : 's'}, up to ${esc(P.fmtDay(later[later.length - 1].date))}</summary>${later.map(rowHtml).join('')}</details>` : ''}`;
  }

  // ---------- where it slows down ----------
  function slowHtml() {
    const S = st.board.stats;
    const keys = Object.keys(P.SEG).filter(k => k !== 'adhoc');
    const cands = keys.map(k => S[k]).filter(s => s.n && s.ratio != null);
    const worst = cands.sort((a, b) => b.ratio - a.ratio)[0];
    const blocks = P.TABS.map(t => {
      const ks = keys.filter(k => t.steps.includes(P.SEG[k].step));
      const scale = Math.max(1, ...ks.map(k => Math.max(S[k].median || 0, S[k].target || 0))) * 1.15;
      const rows = ks.map(k => {
        const s = S[k], seg = P.SEG[k];
        const isWorst = worst && worst.key === k;
        const bar = s.n
          ? `<i class="pg-bar-fill pg-fill-${seg.who} ${isWorst ? 'is-worst' : ''}" style="width:${Math.max(2, (s.median / scale) * 100)}%"></i>`
          : `<i class="pg-bar-fill pg-bar-hatch" style="width:${((s.target || 0) / scale) * 100}%"></i>`;
        const tick = s.target ? `<i class="pg-bar-tick" style="left:${(s.target / scale) * 100}%" title="Target ${unitTxt(s.target, s.unit)}"></i>` : '';
        const val = s.n ? `${unitTxt(s.median, s.unit)} <span>(${s.n})</span>` : `<span>${s.target ? 'target only, no data yet' : 'set by the calendar'}</span>`;
        return `<div class="pg-sl-row ${isWorst ? 'is-worst' : ''}">
          <div class="pg-sl-label">${whoChip(seg.who)} ${esc(seg.label)}${seg.loop ? ' ↻' : ''}</div>
          <div class="pg-bar">${bar}${tick}</div>
          <div class="pg-sl-val">${val}</div></div>`;
      }).join('');
      return `<div class="pg-sl-block"><h4>${esc(t.label)}</h4>${rows}</div>`;
    }).join('');
    const callout = worst
      ? `<div class="pg-callout"><b>Bottleneck: ${esc(P.SEG[worst.key].label)}</b> · ${worst.ratio.toFixed(1)}× target (${unitTxt(worst.median, worst.unit)} vs ${unitTxt(worst.target, worst.unit)}, n=${worst.n}).
         <span>Few examples so far: verdicts use the targets until a step has 3 finished examples.</span></div>` : '';
    return `<div class="pg-panel-head"><h2>Where it slows down</h2><span class="pg-muted">bar = median time · tick = target · (n) = finished examples</span></div>${callout}<div class="pg-sl">${blocks}</div>`;
  }

  function clockHtml(live) {
    const rows = live.filter(x => x.clock.total).map(x => {
      const k = x.clock, seg = (key, cls, label) => k[key] ? `<i class="${cls}" style="width:${(k[key] / k.total) * 100}%" title="${label}: ${k[key]} d"></i>` : '';
      return `<div class="pg-clock-row"><span class="pg-ag-client">${esc(shortName(x))}</span>
        <div class="pg-stack">${seg('M', 'pg-fill-M', 'On us')}${seg('both', 'pg-fill-both', 'Both waiting')}${seg('C', 'pg-fill-C', 'On the client')}${seg('MC', 'pg-fill-MC', 'Date set')}${seg('quiet', 'pg-fill-quiet', 'Nothing open')}</div>
        <span class="pg-sl-val">${k.total} d · us ${k.M + k.both} · client ${k.C + k.both}</span></div>`;
    }).join('');
    return `<div class="pg-panel-head pg-mt"><h2>Who holds the clock</h2><span class="pg-muted">each day since the brief</span></div>
      <div class="pg-legend">${whoChip('M')} on us <i class="pg-sw pg-fill-both"></i> both <i class="pg-sw pg-fill-C"></i> on the client <i class="pg-sw pg-fill-MC"></i> date set <i class="pg-sw pg-fill-quiet"></i> nothing open</div>
      ${rows || '<p class="pg-muted">No open clients.</p>'}`;
  }

  // ---------- one by one ----------
  function oneByOneHtml(clients) {
    const tabCounts = (tk) => {
      const scope = clients.filter(x => !x.closed);
      const its = scope.flatMap(x => x.waiting.filter(it => tk === 'all' || itemTab(x, it) === tk));
      return { n: new Set(scope.filter(x => x.waiting.some(it => tk === 'all' || itemTab(x, it) === tk)).map(x => x.c.id)).size, todo: its.filter(P.isToDoToday).length };
    };
    const tabs = [{ key: 'all', label: 'All' }, ...P.TABS].map(t => {
      const c = tabCounts(t.key);
      return `<button type="button" class="pg-tab ${st.tab === t.key ? 'active' : ''}" data-tab="${t.key}">${esc(t.label)} <span>${c.n}</span>${c.todo ? `<em>${c.todo}</em>` : ''}</button>`;
    }).join('');

    const base = clients.filter(x => st.tab === 'all' || x.items.some(it => inTab(x, it)));
    const vis = (x) => x.waiting.filter(it => inTab(x, it) && whoOk(it));
    const tests = {
      all: () => true,
      today: (x) => vis(x).some(P.isToDoToday),
      waiting: (x) => vis(x).length > 0,
      overdue: (x) => vis(x).some(P.isOverdue),
      slow: (x) => vis(x).some(P.isSlow),
      nothing: (x) => !x.closed && x.waiting.filter(it => inTab(x, it)).length === 0,
      delivery: (x) => x.inDelivery,
      closed: (x) => x.closed,
    };
    const whoTest = (x) => st.who === 'any' || vis(x).length > 0;
    const labels = { all: 'All', today: 'To do today', waiting: 'Waiting', overdue: 'Overdue', slow: 'Slower than target', nothing: 'Nothing waiting', delivery: 'In delivery', closed: 'Closed' };
    const showChips = Object.keys(labels).filter(k => k !== 'delivery' || st.show === 'delivery').map(k => {
      const n = base.filter(x => whoTest(x) && tests[k](x)).length;
      return `<button type="button" class="pg-chip ${st.show === k ? 'active' : ''}" data-show="${k}">${labels[k]} <span>${n}</span></button>`;
    }).join('');
    const whoChips = [['any', 'Anyone'], ['M', 'Us (M)'], ['C', 'Client (C)']].map(([k, l]) =>
      `<button type="button" class="pg-chip ${st.who === k ? 'active' : ''}" data-who="${k}">${l}</button>`).join('');

    const list = base.filter(x => (st.show === 'closed' || st.show === 'all' ? true : !x.closed) && whoTest(x) && tests[st.show](x))
      .sort((a, b) => (vis(b).filter(P.isToDoToday).length - vis(a).filter(P.isToDoToday).length)
        || (vis(b).filter(P.isOverdue).length - vis(a).filter(P.isOverdue).length)
        || (Math.max(0, ...vis(b).map(i => i.elapsed || 0)) - Math.max(0, ...vis(a).map(i => i.elapsed || 0)))
        || ((a.closed ? 1 : 0) - (b.closed ? 1 : 0)));
    return `<div class="pg-panel-head"><h2>One by one</h2></div>
      <div class="pg-tabs">${tabs}</div>
      <div class="pg-filters"><span class="pg-muted">Whose turn</span>${whoChips}<span class="pg-muted pg-ml">Show</span>${showChips}</div>
      <div class="pg-cards">${list.map(x => cardHtml(x, vis(x))).join('') || '<p class="pg-muted">No clients in this view.</p>'}</div>`;
  }

  function cardHtml(x, waiting) {
    const c = x.c, top = waiting[0] || x.top;
    const value = String((c.proposal_value_agreed || c.proposal_value_sent) ?? '').trim();
    const pkg = c.proposal_type_agreed || c.proposal_type_sent;
    const num = value !== '' && !isNaN(Number(value)) ? Number(value) : null;
    const valTxt = num === 0 ? 'free (case study)' : num != null ? 'USD ' + num.toLocaleString('en-US') : trim(value.split(/[·(]/)[0].trim(), 40);
    const pkgTxt = pkg ? `${pkg === 'custom' ? 'Custom' : pkg}${valTxt ? ` · ${valTxt}` : ''}` : '';
    const pkgTitle = value;
    const status = top
      ? `Step ${top.step || x.currentStep} · ${esc(P.SEG[top.key].label === 'Agreed date' ? top.title : P.SEG[top.key].label)} · ${top.who === 'C' ? 'waiting on client' : top.who === 'MC' ? 'shared' : 'your turn'}${top.due ? ` · due ${esc(P.fmtDay(top.due))}` : ''}`
      : x.closed ? `Closed · ${esc(c.stage.replace('_', ' '))}` : 'Nothing waiting right now';
    const nextDates = x.agenda.filter(a => !a.done && a.date >= P.sod(st.board.now)).slice(0, 3);
    return `<article class="pg-card" id="pg-card-${esc(c.id)}">
      <header class="pg-card-head">
        <div><button type="button" class="pg-card-name" data-open="${esc(c.id)}">${esc(c.name)}</button>
          ${c.organisation ? `<span class="pg-card-org">${esc(c.organisation)}</span>` : ''}</div>
        <div class="pg-card-pills">
          <span class="dash-pill dash-pill-path-${esc(c.path)}">${esc(c.path)}</span>
          <span class="dash-pill dash-pill-stage-${esc(c.stage)}">${esc(c.stage.replace('_', ' '))}</span>
          ${pkgTxt ? `<span class="pg-pill pg-tone-info" title="${esc(pkgTitle)}">${esc(pkgTxt)}</span>` : ''}
          ${top ? pill(top.verdict.tone, top.verdict.pill) : ''}
        </div>
      </header>
      ${journeyHtml(x)}
      <p class="pg-status">${status}</p>
      ${waiting.length ? `<h3>Waiting now</h3><div class="pg-wait">${waiting.map(it => waitRowHtml(x, it)).join('')}</div>` : ''}
      ${nextDates.length ? `<div class="pg-next"><span class="pg-muted">Next dates</span>${nextDates.map(a => `<span class="pg-date-chip">${whoChip(a.who)} ${esc(P.fmtDay(a.date))} · ${esc(trim(a.what, 46))}</span>`).join('')}</div>` : ''}
      <div class="pg-card-cols">
        <div>${docsHtml(x)}</div>
        <div>${feedHtml(x)}</div>
      </div>
      ${historyHtml(x)}
      <footer class="pg-card-actions">
        <button type="button" class="pg-btn" data-log="${esc(c.id)}">+ Log</button>
        <button type="button" class="pg-btn" data-version="${esc(c.id)}">+ Version</button>
        <button type="button" class="pg-btn pg-btn-ghost" data-open="${esc(c.id)}">Open contact</button>
      </footer>
    </article>`;
  }

  function journeyHtml(x) {
    return `<ol class="pg-journey">${x.journey.map(j => `<li class="is-${j.state}" title="${esc(`${j.n} · ${j.label}${j.at ? ' · ' + P.fmtDay(j.at) : ''}`)}"><i></i><span>${esc(j.label)}</span></li>`).join('')}</ol>`;
  }

  function waitRowHtml(x, it) {
    const typ = st.board.stats[it.key]?.typical;
    const windowLen = it.due ? (it.unit === 'wd' ? P.wdays(it.from, it.due) : P.days(it.from, it.due)) : typ;
    const scale = Math.max(1, it.elapsed || 0, windowLen || 0) * 1.1;
    const tick = windowLen ? `<i class="pg-bar-tick" style="left:${(windowLen / scale) * 100}%" title="${it.due ? 'Due' : 'Target'}"></i>` : '';
    const v = it.verdict;
    const nudges = it.nudges.map(n => `<span class="pg-nudge">${esc(CH_ICON[n.channel] || '·')} ${esc(P.fmtShort(n.at))}</span>`).join('');
    const flags = it.flags.map(f => `<span class="pg-flag">${esc(f)}</span>`).join('');
    const btns = [];
    if (it.ref) btns.push(`<button type="button" class="pg-btn pg-btn-sm" data-done="${esc(it.ref.table)}|${esc(it.ref.id)}|${esc(it.ref.field)}">✓ ${esc(it.ref.label)}</button>`);
    else btns.push(`<button type="button" class="pg-btn pg-btn-sm" data-log="${esc(x.c.id)}" data-step="${esc(it.logStep || '')}">+ Log</button>`);
    if (it.who === 'C') btns.push(`<span class="pg-nudge-btns" title="Log a nudge">Nudged:
      ${['email', 'whatsapp', 'call'].map(ch => `<button type="button" class="pg-btn pg-btn-sm pg-btn-ghost" data-nudge="${esc(x.c.id)}|${esc(it.logStep || '')}|${ch}|${esc(it.title)}|${esc(it.ref?.table === 'crm_deliverables' ? it.ref.id : '')}">${CH_ICON[ch]}</button>`).join('')}</span>`);
    return `<div class="pg-wait-row pg-tone-row-${v.tone}">
      <div class="pg-wait-top">${whoChip(it.who)}<b>${esc(it.title)}</b>${pill(v.tone, v.pill)}</div>
      <div class="pg-bar pg-bar-own"><i class="pg-bar-fill pg-fill-${it.who} pg-striped" style="width:${Math.max(2, ((it.elapsed || 0) / scale) * 100)}%"></i>${tick}</div>
      <div class="pg-wait-meta">since ${esc(P.fmtDay(it.from))} · ${unitTxt(it.elapsed || 0, it.unit)} so far${it.due ? ` · due ${esc(P.fmtDay(it.due))}` : typ ? ` · target ${unitTxt(typ, it.unit)}` : ''}${v.advice ? ` · <em>${esc(v.advice)}</em>` : ''} ${nudges}${flags}</div>
      <div class="pg-wait-actions">${btns.join('')}</div>
    </div>`;
  }

  function fileChip(attId, x) {
    if (!attId) return '';
    const a = x.d.attachments.find(f => f.id === attId);
    if (!a) return '';
    return `<button type="button" class="pg-file" data-dl="${esc(a.storage_path)}" title="${esc(a.filename)}">▤ ${esc(trim(a.label || a.filename, 34))}</button>`;
  }

  function docsHtml(x) {
    const used = new Set();
    const tl = x.d.timeline;
    tl.forEach(r => r.attachment_id && used.add(r.attachment_id));
    x.d.deliverables.forEach(v => { v.attachment_id && used.add(v.attachment_id); v.feedback_attachment_id && used.add(v.feedback_attachment_id); });

    const props = x.sends.map((s, i) => {
      const next = x.sends[i + 1];
      const rep = x.replies.find(r => r.at >= P.sod(s.at) && (!next || r.at <= next.at));
      const files = (s.rows || []).map(r => fileChip(r.attachment_id, x)).join('');
      return `<li><b>v${i + 1}</b> sent ${esc(P.fmtDay(s.at))}${rep ? ` · answer ${esc(P.fmtDay(rep.at))} ${pill(rep.outcome === 'accepted' ? 'ok' : rep.outcome === 'declined' ? 'late' : 'slow', (rep.outcome || 'reply').replace('_', ' '))}` : ` · ${pill('slow', 'no answer yet')}`} ${files}</li>`;
    }).join('');
    const tor = x.torSent
      ? `<li>Terms of Reference sent ${esc(P.fmtDay(x.torSent.at))}${x.torSent.due_at ? ` · sign by ${esc(P.fmtDay(x.torSent.due_at))}` : ''} · ${x.torSign || x.torSent.done_at ? pill('ok', 'signed ' + P.fmtShort(x.torSign?.at || x.torSent.done_at)) : pill('slow', 'not signed yet')} ${fileChip(x.torSent.attachment_id, x)} ${fileChip(x.torSign?.attachment_id, x)}</li>`
      : (x.yesAt ? `<li>${pill('slow', 'Terms of Reference not sent yet')}</li>` : '');
    const intakeRows = tl.filter(r => r.meta?.doc === 'intake' || r.meta?.doc === 'decision_contact');
    const intake = x.yesAt ? `<li>Intake: ${intakeRows.length ? intakeRows.map(r => `${esc(r.title)} ${r.done_at ? pill('ok', 'done ' + P.fmtShort(r.done_at)) : r.due_at ? pill('info', 'due ' + P.fmtShort(r.due_at)) : ''}`).join(' · ') : 'not started'}</li>` : '';

    const dls = [...x.d.deliverables].sort((a, b) => a.name.localeCompare(b.name) || a.version - b.version);
    const cell = (d) => d ? esc(P.fmtShort(d)) : '<span class="pg-muted">—</span>';
    const dlTable = dls.length ? `<div class="pg-dl-wrap"><table class="pg-dl"><thead><tr><th>Deliverable</th><th>v</th><th>Due</th><th>Sent</th><th>Feedback due</th><th>Feedback</th><th>Final</th></tr></thead><tbody>
      ${dls.map(v => `<tr title="${esc(v.notes || '')}"><td>${esc(v.name)} ${fileChip(v.attachment_id, x)}${fileChip(v.feedback_attachment_id, x)}</td><td>${v.version}</td><td>${cell(v.due_at)}</td><td>${cell(v.sent_at)}</td><td>${cell(v.feedback_due_at)}</td><td>${cell(v.feedback_at)}</td><td>${cell(v.final_at)}</td></tr>`).join('')}
    </tbody></table></div>` : '<p class="pg-muted">No deliverables yet. Use + Version to add one.</p>';

    const other = x.d.attachments.filter(a => !used.has(a.id));
    const bySec = new Map();
    other.forEach(a => { const k = a.section || 'general'; if (!bySec.has(k)) bySec.set(k, []); bySec.get(k).push(a); });
    const otherHtml = other.length ? [...bySec].map(([k, v]) => `<div class="pg-files"><span class="pg-muted">${esc(k)}</span>${v.map(a => fileChip(a.id, x)).join('')}</div>`).join('') : '';
    return `<h3>Documents and agreements</h3>
      <ul class="pg-docs">${props || '<li class="pg-muted">No proposal sent yet.</li>'}${tor}${intake}</ul>
      ${dlTable}
      ${otherHtml ? `<h4 class="pg-h4">Other files</h4>${otherHtml}` : ''}`;
  }

  function feedHtml(x) {
    const id = x.c.id;
    let rows = x.feed;
    if (st.sysLog[id]) rows = [...rows, ...x.d.events.map(e => ({ at: P.toD(e.created_at), dir: 'internal', channel: 'other', step: null, title: e.message || e.type, sys: true }))].sort((a, b) => b.at - a.at);
    const all = st.feedAll[id];
    const shown = all ? rows : rows.slice(0, 8);
    const now = st.board.now;
    return `<div class="pg-feed-head"><h3>Back-and-forth</h3>
        <label class="pg-toggle"><input type="checkbox" data-syslog="${esc(id)}" ${st.sysLog[id] ? 'checked' : ''}> Show system log</label></div>
      <ul class="pg-feed">${shown.map(r => {
        const chip = r.due ? (r.done ? pill('ok', 'done ' + P.fmtShort(r.done)) : pill(P.sod(r.due) < P.sod(now) ? 'late' : 'info', `due ${P.fmtShort(r.due)}${r.owed_by ? ' · ' + r.owed_by : ''}`)) : '';
        return `<li class="pg-feed-${esc(r.dir || 'internal')} ${r.sys ? 'is-sys' : ''} ${r.derived ? 'is-derived' : ''}">
          <span class="pg-feed-when">${esc(P.fmtShort(r.at))}</span>
          <span class="pg-feed-ic" title="${esc((r.channel || '') + ' · ' + (DIR_TITLE[r.dir] || ''))}">${esc(DIR[r.dir] || '•')} ${esc(CH_ICON[r.channel] || '·')}</span>
          <div><span class="pg-feed-title">${r.step ? `<span class="pg-step">${esc(r.step)}</span>` : ''}${esc(r.title)}</span>
          ${r.body ? `<span class="pg-feed-body">${esc(r.body)}</span>` : ''}
          ${fileChip(r.attachment_id, x)}${chip}</div></li>`;
      }).join('') || '<li class="pg-muted">Nothing logged yet.</li>'}</ul>
      ${rows.length > 8 ? `<button type="button" class="pg-link" data-feedall="${esc(id)}">${all ? 'Show fewer' : `Show all ${rows.length}`}</button>` : ''}`;
  }

  function historyHtml(x) {
    if (!x.done.length) return '';
    const rows = x.done.map(it => {
      const ch = P.compareChip(it, st.board.stats, st.board.now);
      return `<tr><td>${whoChip(it.who)}</td><td>${esc(it.title)}</td><td>${esc(P.fmtShort(it.from))} → ${esc(P.fmtShort(it.to))}</td><td>${unitTxt(P.durationOf(it, st.board.now), it.unit)}</td><td>${pill(ch.tone, ch.text)}</td></tr>`;
    }).join('');
    return `<details class="pg-history" ${x.waiting.length ? '' : 'open'}><summary>How it got here · ${x.done.length} step${x.done.length === 1 ? '' : 's'} done</summary>
      <table class="pg-dl"><tbody>${rows}</tbody></table></details>`;
  }

  function keyHtml() {
    return `<p class="pg-key">${whoChip('M')} Method into Impact · ${whoChip('C')} client · ${whoChip('MC')} shared ·
      <i class="pg-sw pg-striped pg-fill-M"></i> still waiting · <i class="pg-sw pg-sw-tick"></i> due date or target ·
      ✉ email · WA WhatsApp · ☎ call · ← from client · → to client · • internal. Targets are working assumptions until a step has 3 finished examples.</p>`;
  }

  // ---------- events ----------
  function bind() {
    root.querySelectorAll('[data-act="refresh"]').forEach(b => b.onclick = refresh);
    root.querySelectorAll('[data-act="showdone"]').forEach(b => b.onchange = () => { st.showDone = b.checked; render(); });
    root.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { st.tab = b.dataset.tab; render(); });
    root.querySelectorAll('[data-who]').forEach(b => b.onclick = () => { st.who = b.dataset.who; st.tile = null; render(); });
    root.querySelectorAll('[data-show]').forEach(b => b.onclick = () => { st.show = b.dataset.show; st.tile = null; render(); });
    root.querySelectorAll('[data-tile]').forEach(b => b.onclick = () => onTile(b.dataset.tile));
    root.querySelectorAll('[data-goto]').forEach(b => b.onclick = () => gotoCard(b.dataset.goto));
    root.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openContact(b.dataset.open));
    root.querySelectorAll('[data-feedall]').forEach(b => b.onclick = () => { st.feedAll[b.dataset.feedall] = !st.feedAll[b.dataset.feedall]; render(); });
    root.querySelectorAll('[data-syslog]').forEach(b => b.onchange = () => { st.sysLog[b.dataset.syslog] = b.checked; render(); });
    root.querySelectorAll('[data-dl]').forEach(b => b.onclick = () => actions.download(b.dataset.dl));
    root.querySelectorAll('[data-done]').forEach(b => b.onclick = () => markDone(b, ...b.dataset.done.split('|')));
    root.querySelectorAll('[data-nudge]').forEach(b => b.onclick = () => nudge(b, ...b.dataset.nudge.split('|')));
    root.querySelectorAll('[data-log]').forEach(b => b.onclick = () => logDialog(b.dataset.log, b.dataset.step || ''));
    root.querySelectorAll('[data-version]').forEach(b => b.onclick = () => versionDialog(b.dataset.version));
  }

  function onTile(key) {
    if (st.tile === key) { st.tile = null; st.who = 'any'; st.show = 'all'; render(); return; }
    st.tile = key; st.tab = 'all';
    if (key === 'mine') { st.who = 'M'; st.show = 'waiting'; }
    if (key === 'theirs') { st.who = 'C'; st.show = 'waiting'; }
    if (key === 'overdue') { st.who = 'any'; st.show = 'overdue'; }
    if (key === 'delivery') { st.who = 'any'; st.show = 'delivery'; }
    if (key === 'next7') { st.who = 'any'; st.show = 'all'; render(); root.querySelector('#pg-agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    render();
    root.querySelector('#pg-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function gotoCard(id) {
    let el = root.querySelector(`#pg-card-${CSS.escape(id)}`);
    if (!el) { st.tab = 'all'; st.who = 'any'; st.show = 'all'; st.tile = null; render(); el = root.querySelector(`#pg-card-${CSS.escape(id)}`); }
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el?.classList.add('is-flash'); setTimeout(() => el?.classList.remove('is-flash'), 1400);
  }

  async function write(btn, fn) {
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Saving…'; }
    const res = await fn();
    if (res?.error) { alert('Could not save: ' + res.error.message); if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } return false; }
    await refresh();
    return true;
  }
  const ALLOWED = { crm_timeline: ['done_at'], crm_deliverables: ['sent_at', 'feedback_at', 'final_at'] };
  function markDone(btn, table, id, field) {
    if (!ALLOWED[table]?.includes(field)) return;
    write(btn, () => actions.update(table, id, { [field]: new Date().toISOString() }));
  }
  function nudge(btn, contactId, step, channel, title, deliverableId) {
    write(btn, () => actions.insert('crm_timeline', {
      contact_id: contactId, at: new Date().toISOString(), direction: 'out', channel, step: step || null,
      kind: 'reminder', title: `Nudge: ${title}`, deliverable_id: deliverableId || null, source: 'manual',
    }));
  }

  // ---------- dialogs ----------
  function dialogShell(html, onSubmit) {
    const dlg = root.querySelector('#pg-dialog');
    dlg.innerHTML = `<form method="dialog" class="pg-form">${html}
      <p class="pg-form-msg" aria-live="polite"></p>
      <div class="pg-form-actions"><button type="button" class="pg-btn pg-btn-ghost" data-cancel>Cancel</button><button type="submit" class="pg-btn pg-btn-primary">Save</button></div></form>`;
    const form = dlg.querySelector('form');
    dlg.querySelector('[data-cancel]').onclick = () => dlg.close();
    form.onsubmit = async (ev) => {
      ev.preventDefault();
      const msg = form.querySelector('.pg-form-msg');
      const err = onSubmit(new FormData(form), form);
      if (typeof err === 'string') { msg.textContent = err; return; }
      const row = await err;
      if (!row) return;
      msg.textContent = 'Saving…';
      const res = await row.run();
      if (res?.error) { msg.textContent = 'Could not save: ' + res.error.message; return; }
      dlg.close();
      await refresh();
    };
    dlg.showModal();
    return form;
  }
  const clientOf = (id) => st.board.clients.find(x => x.c.id === id);
  const fileOptions = (x) => `<option value="">—</option>` + x.d.attachments.map(a => `<option value="${esc(a.id)}">${esc(a.label || a.filename)}</option>`).join('');
  const dateOrNull = (v, endOfDay = false) => v ? new Date(v + (endOfDay ? 'T12:00:00' : 'T09:00:00')).toISOString() : null;

  function logDialog(contactId, step) {
    const x = clientOf(contactId);
    if (!x) return;
    const dlOpts = `<option value="">—</option>` + x.d.deliverables.map(v => `<option value="${esc(v.id)}">${esc(v.name)} v${v.version}</option>`).join('');
    dialogShell(`<h2>Log · ${esc(x.c.name)}</h2>
      <div class="pg-form-grid">
        <label>When<input type="datetime-local" name="at" value="${toLocalInput(new Date())}" required></label>
        <label>Direction<select name="direction">${opts(['out', 'in', 'internal'], 'out', { out: '→ to the client', in: '← from the client', internal: '• internal' })}</select></label>
        <label>Channel<select name="channel">${opts(CHANNELS, 'email')}</select></label>
        <label>Step<select name="step">${opts(['', ...P.STEPS.map(s => s.key)], step)}</select></label>
        <label>Kind<select name="kind">${opts(KINDS, 'message')}</select></label>
        <label>File<select name="attachment_id">${fileOptions(x)}</select></label>
        <label class="pg-wide">Title<input name="title" required maxlength="200" placeholder="What happened, in one line"></label>
        <label class="pg-wide">Details<textarea name="body" rows="3" placeholder="Optional"></textarea></label>
        <label>Due date<input type="date" name="due_at"></label>
        <label>Owed by<select name="owed_by">${opts(['', 'M', 'C', 'MC'], '', { '': '—', M: 'M · us', C: 'C · client', MC: 'MC · shared' })}</select></label>
        <label>Proposal answer<select name="outcome">${opts(OUTCOMES, '')}</select></label>
        <label>Document<select name="doc">${opts(DOCS, '')}</select></label>
        <label>Deliverable<select name="deliverable_id">${dlOpts}</select></label>
      </div>
      <p class="pg-muted">Files are uploaded in the contact view; pick them here to link them.</p>`, (fd) => {
      const due = fd.get('due_at'), owed = fd.get('owed_by');
      if (due && !owed) return 'A due date needs “owed by”.';
      const meta = {};
      if (fd.get('outcome')) meta.outcome = fd.get('outcome');
      if (fd.get('doc')) meta.doc = fd.get('doc');
      return { run: () => actions.insert('crm_timeline', {
        contact_id: contactId, at: new Date(fd.get('at')).toISOString(), direction: fd.get('direction'), channel: fd.get('channel'),
        step: fd.get('step') || null, kind: fd.get('kind'), title: fd.get('title').trim(), body: (fd.get('body') || '').trim() || null,
        due_at: dateOrNull(due, true), owed_by: owed || null, attachment_id: fd.get('attachment_id') || null,
        deliverable_id: fd.get('deliverable_id') || null, meta, source: 'manual',
      }) };
    });
  }

  function versionDialog(contactId) {
    const x = clientOf(contactId);
    if (!x) return;
    const names = [...new Set(x.d.deliverables.map(v => v.name))];
    const form = dialogShell(`<h2>New version · ${esc(x.c.name)}</h2>
      <div class="pg-form-grid">
        <label class="pg-wide">Deliverable<input name="name" list="pg-dl-names" required maxlength="200" placeholder="e.g. Manual de Procedimientos"><datalist id="pg-dl-names">${names.map(n => `<option value="${esc(n)}">`).join('')}</datalist></label>
        <label>Version<input type="number" name="version" min="1" value="1" required></label>
        <label>Due<input type="date" name="due_at"></label>
        <label>Sent<input type="date" name="sent_at"></label>
        <label>Feedback due<input type="date" name="feedback_due_at"></label>
        <label class="pg-wide">File<select name="attachment_id">${fileOptions(x)}</select></label>
        <label class="pg-wide">Notes<textarea name="notes" rows="2"></textarea></label>
      </div>
      <p class="pg-muted">Feedback due fills in as sent + 5 working days. Change it if you agreed another date.</p>`, (fd) => {
      const name = fd.get('name').trim(), version = Number(fd.get('version'));
      if (x.d.deliverables.some(v => v.name === name && v.version === version)) return `${name} v${version} already exists.`;
      return { run: () => actions.insert('crm_deliverables', {
        contact_id: contactId, name, version, due_at: dateOrNull(fd.get('due_at'), true), sent_at: dateOrNull(fd.get('sent_at')),
        feedback_due_at: dateOrNull(fd.get('feedback_due_at'), true), attachment_id: fd.get('attachment_id') || null, notes: (fd.get('notes') || '').trim() || null,
      }) };
    });
    const nameEl = form.querySelector('[name="name"]'), verEl = form.querySelector('[name="version"]');
    nameEl.oninput = () => { const vs = x.d.deliverables.filter(v => v.name === nameEl.value.trim()); verEl.value = vs.length ? Math.max(...vs.map(v => v.version)) + 1 : 1; };
    const sentEl = form.querySelector('[name="sent_at"]'), fbEl = form.querySelector('[name="feedback_due_at"]');
    sentEl.onchange = () => { if (sentEl.value && !fbEl.value) fbEl.value = toDateInput(P.addWorkdays(new Date(sentEl.value + 'T09:00:00'), 5)); };
  }

  return { refresh, rebuild, render };
}

function trim(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
function shortName(x) { return x.c.organisation || x.c.name; }
