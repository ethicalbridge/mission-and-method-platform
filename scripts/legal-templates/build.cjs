// Method into Impact template builder: src/<slug>.md -> out/<slug>.docx
// Usage: node build.js [slug ...]   (no args = all)
const fs = require('fs');
const path = require('path');
const D = (() => { try { return require('docx'); } catch (e) { return require('/opt/npm-tools/node_modules/docx'); } })();
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, HeadingLevel, LevelFormat, Header, Footer, PageNumber, TabStopType,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType, PageBreak, TableLayoutType,
  VerticalAlign,
} = D;

const ROOT = __dirname;
const OUT = process.env.OUT || path.join(ROOT, '..', '..', 'assets', 'legal-templates');
const A = p => path.join(ROOT, 'assets', p);
const C = { deep: '123C48', coral: 'E56F4A', teal: '16746E', sun: 'F8CA68', mint: 'D8EEE2', cream: 'FFFAF3', ink: '102E3B',
  muted: '5B6F78', line: 'D9DED8', sand: 'F3F1EC', sunTint: 'FDF2D8', mintTint: 'EAF5EF' };
const SERIF = 'DM Serif Display', SANS = 'Nunito Sans';
const PAGE_W = 11906, PAGE_H = 16838, MX = 1191, CW = PAGE_W - 2 * MX; // content width 9524

// ---------- front matter + blocks ----------
function parseFile(txt) {
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing front matter');
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':'); if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, blocks: parseBlocks(m[2].split('\n')) };
}

function parseBlocks(lines) {
  const out = []; let para = []; let i = 0; let widths = null;
  const flush = () => { if (para.length) { out.push({ t: 'p', text: para.join(' ') }); para = []; } };
  while (i < lines.length) {
    const raw = lines[i]; const line = raw.replace(/\s+$/, '');
    if (/^:::\s*\w+/.test(line)) {
      flush();
      const mm = line.match(/^:::\s*(\w+)\s*(.*)$/); const inner = []; i++;
      let depth = 0;
      while (i < lines.length) {
        const l = lines[i];
        if (/^:::\s*\w+/.test(l)) depth++;
        else if (/^:::\s*$/.test(l)) { if (depth === 0) break; depth--; }
        inner.push(l); i++;
      }
      out.push({ t: 'box', kind: mm[1], title: mm[2], blocks: mm[1] === 'sign' ? inner.filter(x => x.trim()) : parseBlocks(inner) });
      i++; continue;
    }
    if (line.trim() === '') { flush(); i++; continue; }
    if (line.trim() === '---pagebreak---') { flush(); out.push({ t: 'pb' }); i++; continue; }
    let h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flush(); out.push({ t: 'h' + h[1].length, text: h[2] }); i++; continue; }
    let w = line.match(/^\{widths:\s*([\d\s,]+)\}$/);
    if (w) { flush(); widths = w[1].split(/[\s,]+/).filter(Boolean).map(Number); i++; continue; }
    if (/^\s*\|/.test(line)) {
      flush(); const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i].trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(s => s.trim());
        if (!cells.every(c => /^:?-{2,}:?$/.test(c))) rows.push(cells); else rows.header = true;
        i++;
      }
      out.push({ t: 'table', rows, header: !!rows.header, widths }); widths = null; continue;
    }
    let b = raw.match(/^(\s*)[-*]\s+(.*)$/);
    if (b) { flush(); out.push({ t: 'li', level: b[1].length >= 2 ? 1 : 0, text: b[2] }); i++; continue; }
    let n = raw.match(/^(\s*)(\d+)[.)]\s+(.*)$/);
    if (n) { flush(); out.push({ t: 'ol', level: n[1].length >= 2 ? 1 : 0, num: Number(n[2]), text: n[3] }); i++; continue; }
    let c = line.match(/^\[( |x)\]\s+(.*)$/);
    if (c) { flush(); out.push({ t: 'check', text: c[2] }); i++; continue; }
    para.push(line.trim()); i++;
  }
  flush();
  return out;
}

// ---------- inline ----------
function runs(text, o = {}) {
  const base = { font: o.font || SANS, size: o.size || 20, color: o.color || C.ink, bold: o.bold, italics: o.italics };
  const res = [];
  const parts = String(text).split(/(\*\*[^*]+?\*\*|\[\[[^\]]+?\]\])/g).filter(s => s !== '');
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      res.push(...runs(part.slice(2, -2), { ...o, bold: true }));
    } else if (part.startsWith('[[')) {
      res.push(new TextRun({ ...base, text: '[' + part.slice(2, -2) + ']', highlight: 'yellow', color: o.onDark ? C.ink : base.color }));
    } else {
      res.push(new TextRun({ ...base, text: part.replace(/ -- /g, ' – ') }));
    }
  }
  return res;
}

const P = (text, o = {}) => new Paragraph({
  children: runs(text, o), spacing: { after: o.after ?? 120, before: o.before ?? 0, line: o.line ?? 300 },
  alignment: o.align, keepNext: o.keepNext, indent: o.indent,
});

function eyebrow(text, color = C.teal, after = 80, before = 0) {
  return new Paragraph({ spacing: { after, before }, keepNext: true,
    children: [new TextRun({ text: text.toUpperCase(), font: SANS, bold: true, size: 15, color, characterSpacing: 30 })] });
}

// ---------- block rendering ----------
let olInstance = 0;
function render(blocks, ctx = {}) {
  const out = []; let lastOl = false; let curInst = 0;
  for (const b of blocks) {
    if (b.t !== 'ol') lastOl = false;
    switch (b.t) {
      case 'p': out.push(P(b.text, ctx)); break;
      case 'h1': out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true,
        children: [new TextRun({ text: b.text, font: SERIF, size: 40, color: C.deep })] })); break;
      case 'h2': out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 120 }, keepNext: true,
        children: [new TextRun({ text: b.text, font: SERIF, size: 28, color: C.deep })] })); break;
      case 'h3': out.push(new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 80 }, keepNext: true,
        children: runs(b.text, { bold: true, size: 21, color: C.teal }) })); break;
      case 'h4': out.push(eyebrow(b.text, ctx.labelColor || C.teal, 80, 120)); break;
      case 'li': out.push(new Paragraph({ numbering: { reference: 'bullets', level: b.level }, spacing: { after: 80, line: 290 },
        children: runs(b.text, ctx) })); break;
      case 'ol': if (!lastOl && !(b.num > 1 && b.level === 0 && curInst > 0)) curInst = ++olInstance; lastOl = true;
        out.push(new Paragraph({ numbering: { reference: 'numbers', level: b.level, instance: curInst }, spacing: { after: 80, line: 290 },
          children: runs(b.text, ctx) })); break;
      case 'check': out.push(new Paragraph({ spacing: { after: 100, line: 290 }, indent: { left: 400, hanging: 400 },
        children: [new TextRun({ text: '☐', font: 'Segoe UI Symbol', size: 24, color: C.deep }), new TextRun({ text: '\t', font: SANS }), ...runs(b.text, ctx)],
        tabStops: [{ type: TabStopType.LEFT, position: 400 }] })); break;
      case 'pb': out.push(new Paragraph({ children: [new PageBreak()] })); break;
      case 'table': out.push(table(b, ctx.inBox ? { width: CW - 620 } : {}), new Paragraph({ spacing: { after: 120 }, children: [] })); break;
      case 'box': out.push(...box(b), new Paragraph({ spacing: { after: 120 }, children: [] })); break;
    }
  }
  return out;
}

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const thin = { style: BorderStyle.SINGLE, size: 4, color: C.line };

function headRuns(seg) {
  return seg.split(/(\[\[[^\]]+?\]\])/g).filter(Boolean).map(part => part.startsWith('[[')
    ? new TextRun({ text: '[' + part.slice(2, -2) + ']', font: SANS, bold: true, size: 15, color: C.ink, highlight: 'yellow' })
    : new TextRun({ text: part.replace(/\*\*/g, '').toUpperCase(), font: SANS, bold: true, size: 15, color: C.cream, characterSpacing: 20 }));
}
function table(b, opts = {}) {
  const fs_ = opts.size || 18;
  const ncol = Math.max(...b.rows.map(r => r.length));
  let ws = b.widths && b.widths.length === ncol ? b.widths : Array(ncol).fill(1);
  const tw = opts.width || CW; const sum = ws.reduce((a, x) => a + x, 0);
  ws = ws.map(x => Math.floor(tw * x / sum)); ws[ws.length - 1] += tw - ws.reduce((a, x) => a + x, 0);
  const rows = b.rows.map((r, ri) => new TableRow({
    tableHeader: b.header && ri === 0, cantSplit: true,
    children: Array.from({ length: ncol }, (_, ci) => {
      const head = b.header && ri === 0; const txt = r[ci] ?? '';
      return new TableCell({
        width: { size: ws[ci], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: head ? C.deep : (ri % 2 === 0 ? C.cream : 'FFFFFF') },
        margins: { top: opts.size ? 50 : 80, bottom: opts.size ? 50 : 80, left: 120, right: 120 },
        borders: { top: thin, bottom: thin, left: thin, right: thin },
        children: txt.split(/<br>/).map(seg => new Paragraph({ spacing: { after: 40, line: 260 },
          children: head ? headRuns(seg) : runs(seg, { size: fs_ }) })),
      });
    }),
  }));
  return new Table({ width: { size: tw, type: WidthType.DXA }, columnWidths: ws, rows, layout: TableLayoutType.FIXED });
}

const BOX = {
  note: { fill: C.cream, bar: C.teal, label: C.teal },
  glance: { fill: C.mintTint, bar: C.teal, label: C.teal, defaultTitle: 'At a glance' },
  adapt: { fill: C.sunTint, bar: C.coral, label: 'B04A2B', prefix: 'Adapt this · ' },
  statement: { fill: C.cream, bar: C.deep, label: C.deep },
  guide: { fill: C.sand, bar: C.muted, label: C.muted },
};

function box(b) {
  if (b.kind === 'sign') return [signTable(b)];
  const s = BOX[b.kind] || BOX.note;
  const title = (s.prefix || '') + (b.title || s.defaultTitle || '');
  const kids = [];
  if (title.trim()) kids.push(eyebrow(title.replace(/ · $/, ''), s.label, 100));
  kids.push(...render(b.blocks, { size: b.size || 19, line: b.size ? 260 : undefined, inBox: true }));
  // remove trailing spacer paragraphs inside boxes
  return [new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ cantSplit: b.kind !== 'adapt' && b.blocks.length < 14, children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: s.fill },
      margins: { top: 200, bottom: 120, left: 280, right: 280 },
      borders: { top: noBorder, bottom: noBorder, right: noBorder, left: { style: BorderStyle.SINGLE, size: 24, color: s.bar } },
      children: kids,
    })] })],
  })];
}

function signTable(b) {
  const half = Math.floor(CW / 2) - 100;
  const cells = b.blocks.map(l => l.trim());
  const rows = [];
  for (let i = 0; i < cells.length; i += 2) {
    rows.push(new TableRow({ cantSplit: true, children: [cells[i], cells[i + 1]].map((c, k) => new TableCell({
      width: { size: k === 0 ? half : CW - half, type: WidthType.DXA },
      margins: { top: 240, bottom: 60, left: 0, right: 240 },
      borders: { top: noBorder, left: noBorder, right: noBorder, bottom: c ? { style: BorderStyle.SINGLE, size: 6, color: C.deep } : noBorder },
      children: [new Paragraph({ spacing: { after: 0 }, children: c ? [new TextRun({ text: '', size: 20 })] : [] }),
        new Paragraph({ spacing: { after: 0 }, children: c ? runs(c, { size: 16, color: C.muted }) : [] })],
      verticalAlign: VerticalAlign.BOTTOM,
    })) }));
  }
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [half, CW - half], rows, layout: TableLayoutType.FIXED });
}

// label/value table (document control)
function kvTable(pairs, sz = 19) {
  const lw = 2500, vw = CW - lw;
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [lw, vw], layout: TableLayoutType.FIXED,
    rows: pairs.map(([k, v]) => new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: lw, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.sand },
        margins: { top: sz < 19 ? 60 : 100, bottom: sz < 19 ? 60 : 100, left: 140, right: 120 }, borders: { top: noBorder, left: noBorder, right: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'FFFFFF' } },
        children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: k.toUpperCase(), font: SANS, bold: true, size: 15, color: C.muted, characterSpacing: 20 })] })] }),
      new TableCell({ width: { size: vw, type: WidthType.DXA }, margins: { top: sz < 19 ? 60 : 100, bottom: sz < 19 ? 60 : 100, left: 160, right: 120 },
        borders: { top: noBorder, left: noBorder, right: noBorder, bottom: thin },
        children: [new Paragraph({ spacing: { after: 0, line: 260 }, children: runs(v, { size: sz }) })] }),
    ] })),
  });
}

// ---------- page furniture ----------
const coverImg = fs.readFileSync(A('cover.jpg'));
const headLogo = fs.readFileSync(A('header-logo.png'));

function header(title) {
  return new Header({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CW }], spacing: { after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line, space: 6 } },
    children: [new ImageRun({ type: 'png', data: headLogo, transformation: { width: 140, height: 21.5 } }),
      new TextRun({ text: '\t' + title.toUpperCase(), font: SANS, bold: true, size: 14, color: C.muted, characterSpacing: 30 })],
  })] });
}
function footer(title) {
  return new Footer({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.line, space: 6 } },
    children: [new TextRun({ text: `[Organisation name]`, font: SANS, size: 14, color: C.muted, highlight: 'yellow' }),
      new TextRun({ text: `  |  ${title}  |  Version [1.0]  |  From a Method into Impact template`, font: SANS, size: 14, color: C.muted }),
      new TextRun({ children: ['\t', PageNumber.CURRENT], font: SANS, size: 14, color: C.muted })],
  })] });
}

function coverSection(meta) {
  const kids = [
    new Paragraph({ spacing: { after: 0 }, children: [new ImageRun({ type: 'jpg', data: coverImg,
      transformation: { width: 794, height: 1123 },
      floating: { horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
        verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
        behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE } } })] }),
    new Paragraph({ spacing: { before: 0, after: 200 }, children: [new TextRun({ text: (meta.eyebrow || meta.category).toUpperCase(), font: SANS, bold: true, size: 17, color: C.mint, characterSpacing: 40 })] }),
    new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: '[Organisation name]', font: SANS, bold: true, size: 24, color: C.ink, highlight: 'yellow' })] }),
    new Paragraph({ spacing: { before: 240, after: 280, line: 260 }, children: [new TextRun({ text: meta.title, font: SERIF, size: 76, color: C.cream })] }),
    new Paragraph({ spacing: { after: 280 }, children: [new TextRun({ text: '————', font: SANS, size: 20, color: C.coral })] }),
    new Paragraph({ spacing: { after: 0, line: 320 }, indent: { right: 3200 }, children: runs(meta.summary || '', { color: C.mint, size: 21, onDark: true }) }),
  ];
  return { properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: 5300, bottom: 1000, left: 1410, right: 1200, header: 0, footer: 0 } } }, children: kids };
}

function splitList(s) { return (s || '').split(';').map(x => x.trim()).filter(Boolean); }

function guidancePage(meta) {
  const k = [];
  k.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'DELETE THIS PAGE BEFORE USE', font: SANS, bold: true, size: 15, color: 'FFFFFF', characterSpacing: 30, shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.coral } })] }));
  k.push(eyebrow('Method into Impact · template guide'));
  k.push(new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: 'How to use this template', font: SERIF, size: 40, color: C.deep })] }));
  if (meta.purpose) k.push(P(meta.purpose, { size: 18, line: 270 }));
  k.push(table({ header: true, widths: [28, 72], rows: [
    ['You will see', 'What to do'],
    ['[[Yellow highlight]]', 'Replace with your own details, then remove the highlight (in Word: Home › Text Highlight Colour › No Colour).'],
    ['Orange-bar boxes headed “Adapt this”', 'Guidance for you. Make the decision it describes, edit the text around it, then delete the box.'],
    ['Square brackets with options, e.g. [[24 hours / 48 hours]]', 'Choose one option, or write your own, and delete the rest.'],
    ['Green and cream boxes', 'Part of the finished document. Keep them, and update the wording.'],
  ] }, { size: 16 }));
  k.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  const rows = [];
  if (meta.who_asks) rows.push(['Who usually asks for it', meta.who_asks]);
  if (meta.time) rows.push(['Time to adapt', meta.time]);
  if (meta.course) rows.push(['Learn it in', meta.course]);
  if (meta.related) rows.push(['Use it with', splitList(meta.related).join(' · ')]);
  if (rows.length) k.push(kvTable(rows, 17), new Paragraph({ spacing: { after: 40 }, children: [] }));
  k.push(eyebrow('Five steps to a finished document', C.teal, 80, 120));
  const inst = ++olInstance;
  for (const s of ['Fill in every yellow field and work through each “Adapt this” box.',
    'Cut what does not apply to you, and keep the document proportionate to your size.',
    'Ask a qualified adviser in your country to check it against local law, your funders’ conditions and your sector’s rules. The legal review checklist template can guide that conversation.',
    'Approve it formally (for example, a board or founder decision), date it and set a review date.',
    'Tell people about it, ask them to confirm they have read it, and keep it where everyone can find it.'])
    k.push(new Paragraph({ numbering: { reference: 'numbers', level: 0, instance: inst }, spacing: { after: 40, line: 260 }, children: runs(s, { size: 17 }) }));
  k.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  k.push(...box({ kind: 'guide', title: 'Important', size: 16, blocks: parseBlocks([
    'This is a template, not legal advice. It is a general starting point written for small purpose-led organisations working in different countries. Laws, regulators and funders differ, and they change. Method into Impact does not guarantee that this template is complete, current or suitable for your circumstances, and using it does not create an adviser–client relationship. You are responsible for adapting it, getting local advice and approving the final version. Licensed for use within one organisation; please do not resell or republish it.'.trim()]) }));
  k.push(new Paragraph({ children: [new PageBreak()] }));
  return k;
}

function controlPage(meta, blocks) {
  const k = [];
  k.push(eyebrow('Document control'));
  k.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'About this document', font: SERIF, size: 40, color: C.deep })] }));
  const pairs = [
    ['Document', `[[Organisation name]] ${meta.title}`],
    ['Type', meta.type || meta.kind || 'Policy'],
    ['Owner', meta.owner || '[[Name and role of the person responsible]]'],
    ['Approved by', meta.approved_by || '[[Name, role and body, e.g. the board of trustees]]'],
    ['Version', '[[1.0]]'],
    ['Date of approval', '[[DD Month YYYY]]'],
    ['Next review', meta.review || '[[Month YYYY]], or sooner after a serious incident, a change in the law or a major change in how we work'],
    ['Applies to', meta.applies_to || '[[Who this covers]]'],
    ['Organisation', '[[Legal name, legal form, country of registration and registration number]]'],
    ['Contact', meta.contact || '[[Email address for questions about this document]]'],
    ['Language', '[[English]]. Translations: [[languages, or “none”]]. If versions differ, the [[English]] version applies.'],
  ];
  k.push(kvTable(pairs));
  const heads = blocks.filter(b => b.t === 'h1').map(b => b.text);
  if (heads.length && meta.contents !== 'no') {
    k.push(eyebrow('Contents', C.teal, 100, 360));
    const half = Math.ceil(heads.length / 2); const colW = Math.floor(CW / 2);
    const rows = [];
    for (let i = 0; i < half; i++) rows.push(new TableRow({ children: [heads[i], heads[i + half]].map(h => new TableCell({
      width: { size: colW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 300, right: 120 },
      borders: { top: noBorder, left: noBorder, right: noBorder, bottom: h ? { style: BorderStyle.DOTTED, size: 4, color: C.line } : noBorder },
      children: [new Paragraph({ spacing: { after: 0 }, children: h ? [new TextRun({ text: h, font: SANS, size: 19, color: C.ink })] : [] })] })) }));
    k.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [colW, CW - colW], rows, layout: TableLayoutType.FIXED }));
  }
  k.push(new Paragraph({ children: [new PageBreak()] }));
  return k;
}

function historyBlock(meta) {
  const k = [];
  k.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160 }, keepNext: true, children: [new TextRun({ text: 'Document history', font: SERIF, size: 40, color: C.deep })] }));
  k.push(table({ header: true, widths: [12, 18, 45, 25], rows: [['Version', 'Date', 'What changed', 'Approved by'],
    ['[[1.0]]', '[[DD Month YYYY]]', `First version, adapted from the Method into Impact ${meta.title} template (v1.0)`, '[[Name, role]]'], ['', '', '', '']] }));
  return k;
}

function closingLine() {
  return new Paragraph({ spacing: { before: 480 }, alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: 'Adapted from a Method into Impact template · Better foundations. Stronger organisations. · methodintoimpact.com', font: SANS, size: 15, color: C.muted })] });
}

// ---------- document ----------
function buildDoc(meta, blocks) {
  olInstance = 0;
  const body = [];
  body.push(...guidancePage(meta));
  if (meta.control !== 'none') body.push(...controlPage(meta, blocks));
  body.push(...render(blocks));
  if (meta.history !== 'no') body.push(...historyBlock(meta));
  body.push(closingLine());
  const short = meta.short_title || meta.title;
  return new Document({
    creator: 'Method into Impact', title: meta.title, description: meta.summary,
    fonts: [{ name: SANS, data: fs.readFileSync(A('NunitoSans-Regular.ttf')) }, { name: SERIF, data: fs.readFileSync(A('DMSerifDisplay-Regular.ttf')) }],
    styles: { default: { document: { run: { font: SANS, size: 20, color: C.ink } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: SERIF, size: 40, color: C.deep }, paragraph: { outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: SERIF, size: 28, color: C.deep }, paragraph: { outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: SANS, bold: true, size: 21, color: C.teal }, paragraph: { outlineLevel: 2 } },
      ] },
    numbering: { config: [
      { reference: 'bullets', levels: [
        { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { run: { color: C.teal }, paragraph: { indent: { left: 360, hanging: 260 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { run: { color: C.teal }, paragraph: { indent: { left: 720, hanging: 260 } } } }] },
      { reference: 'numbers', levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { run: { color: C.teal, bold: true }, paragraph: { indent: { left: 400, hanging: 340 } } } },
        { level: 1, format: LevelFormat.LOWER_LETTER, text: '(%2)', alignment: AlignmentType.LEFT, style: { run: { color: C.teal }, paragraph: { indent: { left: 800, hanging: 360 } } } }] },
    ] },
    sections: [coverSection(meta), {
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: 1300, bottom: 1200, left: MX, right: MX, header: 560, footer: 560 }, pageNumbers: { start: 1 } } },
      headers: { default: header(short) }, footers: { default: footer(short) }, children: body,
    }],
  });
}

async function main() {
  const want = process.argv.slice(2);
  const files = fs.readdirSync(path.join(ROOT, 'src')).filter(f => f.endsWith('.md')).filter(f => !want.length || want.includes(f.replace(/\.md$/, '')));
  for (const f of files) {
    try {
      const { meta, blocks } = parseFile(fs.readFileSync(path.join(ROOT, 'src', f), 'utf8'));
      for (const k of ['title', 'category', 'summary']) if (!meta[k]) throw new Error('front matter missing ' + k);
      const buf = await Packer.toBuffer(buildDoc(meta, blocks));
      const name = f.replace(/\.md$/, '.docx');
      fs.writeFileSync(path.join(OUT, name), buf);
      const words = blocks.map(function w(b) { return (b.text || '') + ' ' + (b.rows ? b.rows.flat().join(' ') : '') + ' ' + (b.blocks ? b.blocks.map(x => typeof x === 'string' ? x : w(x)).join(' ') : ''); }).join(' ').split(/\s+/).filter(Boolean).length;
      console.log('built', name, words + ' words');
    } catch (e) { console.error('FAILED', f, e.message); process.exitCode = 1; }
  }
}
main();
