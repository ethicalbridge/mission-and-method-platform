// Course output PDFs: the learner's answers in a clean, designed document they can keep and share.
// The document belongs to the learner's organisation: no Method into Impact header. A small closing
// note at the end says which course it was created in. Built in the browser, no third-party code:
// a minimal PDF writer that embeds Nunito Sans and DM Serif Display (subset to Windows-1252 text).
const FONT_BASE = new URL('../pdf/', import.meta.url);
const C = { deep:'#123C48', ink:'#102E3B', teal:'#16746E', coral:'#E56F4A', cream:'#FFFAF3', white:'#FFFFFF', line:'#D8DFD9', muted:'#546974', mint:'#D8EEE2', lightteal:'#7CC2AD' };
const W = 595.28, H = 841.89, M = 54, TOP = 58, BOTTOM = 62;

// ---------- text encoding (Windows-1252, the encoding the embedded fonts are subset to) ----------
const CP = {0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
const code = ch => { const u = ch.codePointAt(0); if (u >= 32 && u < 127 || u >= 160 && u <= 255) return u; return CP[u] || 63; };
// Characters outside Windows-1252 that learners often type, mapped to close equivalents the fonts have
const SUBST = { '\u2192': '›', '\u21D2': '›', '\u2794': '›', '\u27A1': '›', '\u2190': '‹', '\u2713': '•', '\u2714': '•', '\u2610': '–', '\u2611': '•', '\u2265': '>=', '\u2264': '<=', '\u2248': '~', '\u2212': '-', '\u2011': '-', '\u00A0': ' ', '\u202F': ' ', '\u2009': ' ' };
const clean = s => String(s ?? '').replace(/\r\n?/g, '\n').replace(/\t/g, '    ').normalize('NFC').replace(/[\u2192\u21D2\u2794\u27A1\u2190\u2713\u2714\u2610\u2611\u2265\u2264\u2248\u2212\u2011\u00A0\u202F\u2009]/g, ch => SUBST[ch]);
const pdfString = s => '(' + [...clean(s)].map(ch => { const c = code(ch); if (c === 40 || c === 41 || c === 92) return '\\' + String.fromCharCode(c); return c < 127 ? String.fromCharCode(c) : '\\' + c.toString(8).padStart(3, '0'); }).join('') + ')';
const rgb = hex => [1, 3, 5].map(i => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ');
const n = v => (Math.round(v * 100) / 100).toString();

let fontCache;
async function loadFonts() {
  if (fontCache) return fontCache;
  const meta = await (await fetch(new URL('fonts.json', FONT_BASE))).json();
  for (const f of Object.values(meta)) f.bytes = new Uint8Array(await (await fetch(new URL(f.file.split('/').pop(), FONT_BASE))).arrayBuffer());
  return (fontCache = meta);
}
async function deflate(bytes) {
  if (typeof CompressionStream === 'undefined') return null;
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

// ---------- layout ----------
class Layout {
  constructor(fonts) { this.f = fonts; this.pages = []; this.newPage(); }
  width(text, font, size, spacing = 0) { const w = this.f[font].widths; let t = 0; for (const ch of text) { const c = code(ch); t += (w[c - 32] || w[31] || 500) * size / 1000 + spacing; } return t; }
  wrap(text, font, size, max) {
    const out = [];
    for (const para of clean(text).split('\n')) {
      if (!para.trim()) { out.push(''); continue; }
      let line = '';
      for (const word of para.split(/ +/)) {
        const tryLine = line ? line + ' ' + word : word;
        if (this.width(tryLine, font, size) <= max) { line = tryLine; continue; }
        if (line) out.push(line);
        let w = word; // break words longer than the line
        while (this.width(w, font, size) > max) { let i = w.length; while (i > 1 && this.width(w.slice(0, i), font, size) > max) i--; out.push(w.slice(0, i)); w = w.slice(i); }
        line = w;
      }
      out.push(line);
    }
    while (out.length && out[out.length - 1] === '') out.pop();
    return out;
  }
  newPage() { this.ops = [`${rgb(C.cream)} rg 0 0 ${n(W)} ${n(H)} re f`]; this.pages.push(this.ops); this.y = TOP; }
  ensure(h) { if (this.y + h > H - BOTTOM) { this.newPage(); return true; } return false; }
  text(x, y, s, font, size, color, spacing = 0) { this.ops.push(`BT /${font} ${n(size)} Tf ${spacing ? n(spacing) + ' Tc ' : ''}${rgb(color)} rg ${n(x)} ${n(H - y)} Td ${pdfString(s)} Tj ${spacing ? '0 Tc ' : ''}ET`); }
  rect(x, y, w, h, fill, stroke, r = 0) {
    const X = x, Y = H - y - h, k = 0.5523 * r;
    const path = r ? `${n(X + r)} ${n(Y)} m ${n(X + w - r)} ${n(Y)} l ${n(X + w - r + k)} ${n(Y)} ${n(X + w)} ${n(Y + r - k)} ${n(X + w)} ${n(Y + r)} c ${n(X + w)} ${n(Y + h - r)} l ${n(X + w)} ${n(Y + h - r + k)} ${n(X + w - r + k)} ${n(Y + h)} ${n(X + w - r)} ${n(Y + h)} c ${n(X + r)} ${n(Y + h)} l ${n(X + r - k)} ${n(Y + h)} ${n(X)} ${n(Y + h - r + k)} ${n(X)} ${n(Y + h - r)} c ${n(X)} ${n(Y + r)} l ${n(X)} ${n(Y + r - k)} ${n(X + r - k)} ${n(Y)} ${n(X + r)} ${n(Y)} c h` : `${n(X)} ${n(Y)} ${n(w)} ${n(h)} re`;
    this.ops.push(`${fill ? rgb(fill) + ' rg ' : ''}${stroke ? rgb(stroke) + ' RG 0.75 w ' : ''}${path} ${fill && stroke ? 'B' : fill ? 'f' : 'S'}`);
  }
  // The Method into Impact mark (same geometry as the site's SVG), drawn as vector paths. x,y = top-left, h = height.
  mark(x, y, h) {
    const s = h / 189, tx = v => n(x + (v - 5) * s), ty = v => n(H - (y + (v - 5) * s));
    const parts = [
      [C.deep, 'M7 79 Q7 75 10.5 77.5 L77 131 Q80 134 77 136.5 L10.5 189.5 Q7 192 7 188 Z'],
      [C.teal, 'M151 82 C116 99 70 139 43 188 L82 188 C91 151 117 111 151 82 Z'],
      [C.deep, 'M181 74 Q181 70 177.5 72 Q155 85 139 105 Q137 107.5 137 111 L137 189 Q137 192 140 192 L178 192 Q181 192 181 189 Z']];
    for (const [color, d] of parts) {
      const t = d.match(/[MLQCZ]|-?[\d.]+/g); let i = 0, cx = 0, cy = 0, out = [];
      const num = () => +t[i++];
      while (i < t.length) { const cmd = t[i++];
        if (cmd === 'M' || cmd === 'L') { cx = num(); cy = num(); out.push(`${tx(cx)} ${ty(cy)} ${cmd === 'M' ? 'm' : 'l'}`); }
        else if (cmd === 'C') { const a = [num(), num(), num(), num(), num(), num()]; out.push(`${tx(a[0])} ${ty(a[1])} ${tx(a[2])} ${ty(a[3])} ${tx(a[4])} ${ty(a[5])} c`); cx = a[4]; cy = a[5]; }
        else if (cmd === 'Q') { const qx = num(), qy = num(), ex = num(), ey = num(); out.push(`${tx(cx + 2 / 3 * (qx - cx))} ${ty(cy + 2 / 3 * (qy - cy))} ${tx(ex + 2 / 3 * (qx - ex))} ${ty(ey + 2 / 3 * (qy - ey))} ${tx(ex)} ${ty(ey)} c`); cx = ex; cy = ey; }
        else if (cmd === 'Z') out.push('h'); }
      this.ops.push(`${rgb(color)} rg ${out.join(' ')} f`);
    }
    const r = 23 * s, ccx = x + (159 - 5) * s, ccy = H - (y + (29.5 - 5) * s), k = 0.5523 * r;
    this.ops.push(`${rgb(C.coral)} rg ${n(ccx + r)} ${n(ccy)} m ${n(ccx + r)} ${n(ccy + k)} ${n(ccx + k)} ${n(ccy + r)} ${n(ccx)} ${n(ccy + r)} c ${n(ccx - k)} ${n(ccy + r)} ${n(ccx - r)} ${n(ccy + k)} ${n(ccx - r)} ${n(ccy)} c ${n(ccx - r)} ${n(ccy - k)} ${n(ccx - k)} ${n(ccy - r)} ${n(ccx)} ${n(ccy - r)} c ${n(ccx + k)} ${n(ccy - r)} ${n(ccx + r)} ${n(ccy - k)} ${n(ccx + r)} ${n(ccy)} c f`);
  }
}

// ---------- one-page summary for whole-module outputs ----------
// blocks: {type:'statement', label, text} · {type:'list', label, items:[]} · {type:'pathway', label, steps:[{label,text}], note:{label,text}}
function summary(L, doc, inner) {
  const blank = s => !clean(s).trim();
  L.text(M, L.y + 8, (doc.summaryTitle || 'At a glance').toUpperCase(), 'extrabold', 8.5, C.teal, 1.3); L.y += 22;
  for (const b of doc.summary) {
    if (b.type === 'statement') {
      const lines = L.wrap(blank(b.text) ? 'Not yet drafted.' : clean(b.text).replace(/\n+/g, ' '), 'serif', 14.5, inner - 20);
      L.ensure(28 + lines.length * 19);
      L.text(M, L.y + 8, b.label.toUpperCase(), 'extrabold', 7.5, C.muted, 1.1); L.y += 15;
      lines.forEach((t, j) => L.text(M, L.y + 14 + j * 19, t, 'serif', 14.5, blank(b.text) ? C.muted : C.deep));
      L.y += lines.length * 19 + 14;
    } else if (b.type === 'list') {
      const items = (b.items || []).filter(x => !blank(x));
      const rows = items.length ? items.map(x => L.wrap(clean(x).replace(/\s*\|\s*/g, ' · '), 'regular', 10.5, inner - 26)) : [['Not yet drafted.']];
      L.ensure(30 + Math.min(rows.flat().length, 6) * 15);
      L.text(M, L.y + 8, b.label.toUpperCase(), 'extrabold', 7.5, C.muted, 1.1); L.y += 16;
      for (const r of rows) {
        if (L.ensure(r.length * 15 + 6)) L.y += 4;
        if (items.length) L.rect(M + 2, L.y + 4.5, 5, 5, C.coral, null, 2.5);
        r.forEach((t, j) => L.text(M + 16, L.y + 10 + j * 15, t, 'regular', 10.5, items.length ? C.ink : C.muted));
        L.y += r.length * 15 + 5;
      }
      L.y += 10;
    } else if (b.type === 'pathway') {
      L.ensure(60);
      L.text(M, L.y + 8, b.label.toUpperCase(), 'extrabold', 7.5, C.muted, 1.1); L.y += 18;
      b.steps.forEach((s, i) => {
        const lines = L.wrap(blank(s.text) ? 'Not yet drafted.' : clean(s.text).replace(/\s*\|\s*/g, ' · '), 'regular', 10, inner - 150).slice(0, 7);
        const h = Math.max(38, lines.length * 14 + 20);
        if (L.ensure(h + 18)) L.y += 4;
        L.rect(M, L.y, inner, h, i === b.steps.length - 1 ? C.mint : C.white, C.line, 8);
        L.rect(M, L.y, 118, h, C.deep, null, 8); L.rect(M + 110, L.y, 8, h, C.deep);
        L.text(M + 14, L.y + h / 2 + 4, s.label, 'extrabold', 10.5, C.cream);
        lines.forEach((t, j) => L.text(M + 134, L.y + 17 + j * 14, t, 'regular', 10, blank(s.text) ? C.muted : C.ink));
        L.y += h;
        if (i < b.steps.length - 1) { // arrow down to the next step
          const x = M + 59; L.rect(x - 1, L.y + 2, 2, 8, C.teal);
          L.ops.push(`${rgb(C.teal)} rg ${n(x - 5)} ${n(H - L.y - 10)} m ${n(x + 5)} ${n(H - L.y - 10)} l ${n(x)} ${n(H - L.y - 16)} l h f`);
          L.y += 18;
        }
      });
      L.y += 14;
      if (b.note) {
        const lines = L.wrap(blank(b.note.text) ? 'Not yet drafted.' : clean(b.note.text).replace(/\s*\|\s*/g, ' · '), 'regular', 10, inner - 32).slice(0, 12);
        const h = lines.length * 14 + 40;
        L.ensure(h + 10);
        L.rect(M, L.y, inner, h, '#FFD9BD', null, 8);
        L.text(M + 16, L.y + 18, b.note.label, 'extrabold', 10.5, C.ink);
        lines.forEach((t, j) => L.text(M + 16, L.y + 34 + j * 14, t, 'regular', 10, C.ink));
        L.y += h + 16;
      }
    }
  }
  // the detail starts on a fresh page so the summary reads as one page
  L.newPage();
  L.text(M, L.y + 8, 'IN FULL', 'extrabold', 8.5, C.teal, 1.3); L.y += 22;
}

// ---------- document ----------
// doc = { title, orgName, date, sections:[{eyebrow, heading, fields:[{label, value}]}], created:{course, detail}, filename }
function compose(L, doc) {
  const inner = W - 2 * M;
  const eyebrow = (doc.orgName || 'Your organisation').toUpperCase();
  L.text(M, L.y + 9, eyebrow, 'extrabold', 8.5, C.teal, 1.3); L.y += 22;
  for (const line of L.wrap(doc.title, 'serif', 32, inner)) { L.text(M, L.y + 30, line, 'serif', 32, C.deep); L.y += 36; }
  L.y += 4; L.text(M, L.y + 10, doc.subtitle || '', 'regular', 10, C.muted); L.y += 20;
  L.rect(M, L.y, 30, 2.6, C.coral); L.y += 24;
  if (doc.summary && doc.summary.length) summary(L, doc, inner);
  const PAD = 16, LEAD = 15.4, SIZE = 10.5;
  for (const sec of doc.sections) {
    if (sec.heading) {
      L.ensure(150);
      if (sec.eyebrow) { L.text(M, L.y + 8, sec.eyebrow.toUpperCase(), 'extrabold', 8, C.teal, 1.2); L.y += 16; }
      for (const line of L.wrap(sec.heading, 'serif', 19, inner)) { L.text(M, L.y + 18, line, 'serif', 19, C.deep); L.y += 23; }
      L.y += 8;
    }
    for (const f of sec.fields) {
      const empty = !clean(f.value).trim();
      const lines = L.wrap(empty ? 'Not yet drafted.' : f.value, 'regular', SIZE, inner - 2 * PAD);
      const labelLines = L.wrap(f.label, 'extrabold', 11, inner - 2 * PAD);
      let i = 0, first = true;
      L.ensure(PAD * 2 + labelLines.length * 15 + Math.min(lines.length, 3) * LEAD);
      while (i < lines.length || first) {
        const head = labelLines.length * 15 + 6;
        const room = Math.max(1, Math.floor((H - BOTTOM - L.y - 2 * PAD - head) / LEAD));
        const chunk = lines.slice(i, i + room); i += chunk.length;
        const h = 2 * PAD + head + chunk.length * LEAD - 4;
        L.rect(M, L.y, inner, h, C.white, C.line, 8);
        L.rect(M, L.y + 8, 3, h - 16, first ? C.teal : C.lightteal, null, 1.5);
        let y = L.y + PAD;
        labelLines.forEach((t, j) => L.text(M + PAD, y + 10 + j * 15, j === labelLines.length - 1 && !first ? t + ' (continued)' : t, 'extrabold', 11, C.deep));
        y += head;
        chunk.forEach((t, j) => L.text(M + PAD, y + 10 + j * LEAD, t, 'regular', SIZE, empty ? C.muted : C.ink));
        L.y += h + 12; first = false;
        if (i < lines.length) L.newPage();
        if (!lines.length) break;
      }
    }
    L.y += 6;
  }
  // Closing note: where this was made. Kept together on one page.
  L.ensure(96); L.y += 14;
  L.rect(M, L.y, inner, 0.75, C.line); L.y += 20;
  L.mark(M, L.y, 30);
  const wx = M + 42;
  L.text(wx, L.y + 11, 'Method ', 'black', 12, C.deep);
  const w1 = L.width('Method ', 'black', 12); L.text(wx + w1, L.y + 11, 'into', 'black', 12, C.coral);
  L.text(wx + w1 + L.width('into ', 'black', 12), L.y + 11, 'Impact', 'black', 12, C.deep);
  L.text(wx, L.y + 26, doc.created.course, 'bold', 9.5, C.ink);
  let y = L.y + 39;
  for (const line of L.wrap(doc.created.detail, 'regular', 8.5, inner - 42)) { L.text(wx, y, line, 'regular', 8.5, C.muted); y += 12; }
  // Page footers
  L.pages.forEach((ops, p) => {
    const label = `${doc.title}${doc.orgName ? ' · ' + doc.orgName : ''}`;
    ops.push(`BT /regular 8 Tf ${rgb(C.muted)} rg ${n(M)} ${n(30)} Td ${pdfString(label)} Tj ET`);
    const pg = `Page ${p + 1} of ${L.pages.length}`; L.ops = ops;
    ops.push(`BT /regular 8 Tf ${rgb(C.muted)} rg ${n(W - M - L.width(pg, 'regular', 8))} ${n(30)} Td ${pdfString(pg)} Tj ET`);
  });
}

async function build(doc) {
  const fonts = await loadFonts();
  const L = new Layout(fonts); compose(L, doc);
  const enc = new TextEncoder(), chunks = [], offsets = []; let size = 0, nextId = 1;
  const push = b => { const bytes = typeof b === 'string' ? enc.encode(b) : b; chunks.push(bytes); size += bytes.length; };
  const ids = {}; const reserve = () => nextId++;
  const write = (id, body, stream) => { offsets[id] = size; push(`${id} 0 obj\n`); if (stream) { push(body + `/Length ${stream.length}>>\nstream\n`); push(stream); push('\nendstream'); } else push(body); push('\nendobj\n'); };
  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const catalog = reserve(), pagesId = reserve(), info = reserve();
  const fontRefs = {};
  for (const [key, f] of Object.entries(fonts)) {
    const file = reserve(), desc = reserve(), font = reserve(); fontRefs[key] = font;
    const z = await deflate(f.bytes);
    write(file, `<</Length1 ${f.bytes.length}${z ? '/Filter/FlateDecode' : ''}`, z || f.bytes);
    const base = f.name.replace(/[^A-Za-z0-9-]/g, '');
    write(desc, `<</Type/FontDescriptor/FontName/${base}/Flags 32/FontBBox[${f.bbox.join(' ')}]/ItalicAngle 0/Ascent ${f.ascent}/Descent ${f.descent}/CapHeight ${f.capHeight}/StemV ${f.stemV}/FontFile2 ${file} 0 R>>`);
    write(font, `<</Type/Font/Subtype/TrueType/BaseFont/${base}/FirstChar 32/LastChar 255/Widths[${f.widths.join(' ')}]/Encoding/WinAnsiEncoding/FontDescriptor ${desc} 0 R>>`);
  }
  const resources = `<</Font<<${Object.entries(fontRefs).map(([k, id]) => `/${k} ${id} 0 R`).join('')}>>>>`;
  const pageIds = [];
  for (const ops of L.pages) {
    const content = reserve(), page = reserve(); pageIds.push(page);
    const bytes = enc.encode(ops.join('\n')); const z = await deflate(bytes);
    write(content, `<<${z ? '/Filter/FlateDecode' : ''}`, z || bytes);
    write(page, `<</Type/Page/Parent ${pagesId} 0 R/MediaBox[0 0 ${n(W)} ${n(H)}]/Resources ${resources}/Contents ${content} 0 R>>`);
  }
  write(pagesId, `<</Type/Pages/Kids[${pageIds.map(id => id + ' 0 R').join(' ')}]/Count ${pageIds.length}>>`);
  write(catalog, `<</Type/Catalog/Pages ${pagesId} 0 R/ViewerPreferences<</DisplayDocTitle true>>>>`);
  const d = new Date(), stamp = `D:${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  write(info, `<</Title${pdfString(doc.title + (doc.orgName ? ' · ' + doc.orgName : ''))}/Author${pdfString(doc.orgName || '')}/Creator(Method into Impact)/CreationDate(${stamp})>>`);
  const xref = size;
  push(`xref\n0 ${nextId}\n0000000000 65535 f \n` + offsets.slice(1).map(o => String(o).padStart(10, '0') + ' 00000 n \n').join(''));
  push(`trailer\n<</Size ${nextId}/Root ${catalog} 0 R/Info ${info} 0 R>>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(chunks, { type: 'application/pdf' });
}

export const slug = s => clean(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
export async function makePDF(doc) { return build(doc); }
export async function downloadPDF(doc) {
  const blob = await build(doc);
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = doc.filename; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
