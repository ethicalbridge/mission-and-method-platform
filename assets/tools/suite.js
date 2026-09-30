/* Mission & Method Impact Suite — shared kit.
   Every tool uses the same look (suite.css), the same page shell, the same storage rules,
   the same Excel/CSV/JSON import and export, the same edit history and the same statuses.
   Load after MEAL-Excel.js and before the tool script. Exposes window.MMSuite. */
(()=>{'use strict';
const EDITOR_KEY='mm.editor.name';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const now=()=>new Date().toISOString();
const today=()=>new Date().toISOString().slice(0,10);
const currentYear=new Date().getFullYear();
const clamp=(n,lo=0,hi=100)=>Math.max(lo,Math.min(hi,Number(n)||0));
const clone=x=>JSON.parse(JSON.stringify(x));
const fmtDate=iso=>{if(!iso)return '';const d=new Date(iso);return isNaN(d)?String(iso):d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})};
const monthsSince=iso=>{if(!iso)return null;const d=new Date(iso);if(isNaN(d))return null;return Math.round((Date.now()-d.getTime())/(1000*60*60*24*30.4375))};
const num=v=>v===''||v==null?NaN:Number(v);
const money=(n,cur='')=>(Number(n)||0).toLocaleString(undefined,{maximumFractionDigits:0})+(cur?' '+cur:'');

// ---------- shared vocabulary ----------
const STATUSES=['Planned','In progress','On track','At risk','Completed','Paused'];
const ACTION_STATUSES=['Planned','In progress','Done','Blocked'];
const DECISION_STATUSES=['Open','In progress','Done'];
const pillClass=s=>/at risk|blocked|off track/i.test(s)?'bad':/attention|paused|overdue/i.test(s)?'warn':/planned|not enough|archived|open/i.test(s)?'dim':'';

// ---------- storage ----------
// store({key, version, blank, legacy:[{key, migrate}], normalise}) → {load, save}
function store({key,version,blank,legacy=[],normalise=d=>d}){
 const valid=d=>d&&typeof d==='object'&&d.version===version&&d.meta;
 return {
  load(){
   let d=null;
   try{const raw=localStorage.getItem(key);if(raw)d=JSON.parse(raw)}catch{}
   if(!valid(d)){
    for(const l of legacy){try{const raw=localStorage.getItem(l.key);if(raw){d=l.migrate(JSON.parse(raw));try{localStorage.setItem(key,JSON.stringify(d))}catch{}break}}catch{}}
   }
   if(!valid(d))d=blank();
   const b=blank();for(const k of Object.keys(b))if(!(k in d))d[k]=b[k];
   d.meta={...b.meta,...d.meta};
   return normalise(d);
  },
  save(d){try{localStorage.setItem(key,JSON.stringify(d));return true}catch{return false}}
 };
}

// ---------- edit history ----------
function editorName(){try{return localStorage.getItem(EDITOR_KEY)||''}catch{return ''}}
function askEditor(){let name=editorName();if(!name){name=(window.prompt('Your name (recorded on each edit). Saved in this browser only.','')||'').trim();if(name)try{localStorage.setItem(EDITOR_KEY,name)}catch{}}return name}
function stamp(o){o.lastEditedBy=askEditor()||'Unknown';o.lastEditedAt=now();return o}
const edited=o=>o.lastEditedBy?`<p class="tiny">Last edited by <b>${esc(o.lastEditedBy)}</b> · ${esc(fmtDate(o.lastEditedAt))}</p>`:'';

// ---------- UI pieces ----------
const opts=(items,current)=>items.map(it=>{const [v,label]=Array.isArray(it)?it:[it,it];return `<option value="${esc(v)}" ${String(v)===String(current??'')?'selected':''}>${esc(label)}</option>`}).join('');
const tip=text=>text?`<span class="tip"><button type="button" aria-label="More information">i</button><span>${esc(text)}</span></span>`:'';
const lbl=(label,help)=>`<span class="label">${esc(label)}${tip(help)}</span>`;
const field=(label,name,value='',type='text',more='',help='')=>`<label class="field">${lbl(label,help)}<input name="${esc(name)}" type="${type}" value="${esc(value)}" ${type==='number'&&!/step=/.test(more)?'step="any"':''} ${more}></label>`;
const area=(label,name,value='',help='')=>`<label class="field full">${lbl(label,help)}<textarea name="${esc(name)}">${esc(value)}</textarea></label>`;
const select=(label,name,items,current,help='',blankLabel='')=>`<label class="field">${lbl(label,help)}<select name="${esc(name)}">${blankLabel?`<option value="">${esc(blankLabel)}</option>`:''}${opts(items,current)}</select></label>`;
const pill=s=>`<span class="pill ${pillClass(s)}">${esc(s)}</span>`;
const bar=p=>`<div class="bar"><i style="width:${clamp(p)}%"></i></div>`;
const card=(label,value,caption='',warn=false,extra='')=>`<div class="card ${warn?'warn':''}"><span class="eyebrow">${esc(label)}</span><div class="metric">${esc(value)}</div>${caption?`<p>${esc(caption)}</p>`:''}${extra}</div>`;
const empty=text=>`<div class="empty">${esc(text)}</div>`;
const modal=(title,body,intro='')=>`<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modalbox"><div class="rowhead"><h2>${esc(title)}</h2><button type="button" class="link" data-action="close" aria-label="Close">Close</button></div>${intro?`<p class="muted">${esc(intro)}</p>`:''}${body}</div></div>`;
const formEnd=(label,{deleteId='',deleteLabel='Delete'}={})=>`<div class="actions field full"><button class="button" type="submit">${esc(label)}</button>${deleteId?`<button class="button danger" type="button" data-action="delete" data-id="${esc(deleteId)}">${esc(deleteLabel)}</button>`:''}<button class="button secondary" type="button" data-action="close">Cancel</button></div>`;
const table=(headers,rows,emptyText)=>`<div class="tablewrap"><table><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${headers.length}">${esc(emptyText)}</td></tr>`}</tbody></table></div>`;

// Page shell: same header, intro, toolbar, tabs, footer for every tool.
function shell({eyebrow,title,intro,module,tabs,active,message,content,modal:m=''}){
 const moduleLink=module?`<a class="button secondary" href="${esc(module.href)}" target="_blank" rel="noopener noreferrer">${esc(module.label)} →</a>`:'';
 return `<div class="shell"><header class="top"><a class="brand" href="../../software.html">Mission <em>&</em> Method</a><a href="../../software.html">← Impact Tools</a></header>
 <div class="hero"><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1><p>${esc(intro)}</p><div class="toolbar">${moduleLink}<button class="button secondary" type="button" data-action="download-template">Download blank Excel template</button><button class="button secondary" type="button" data-action="export-json">Backup JSON</button></div></div>
 <nav class="nav" aria-label="${esc(title)} sections">${tabs.map(t=>`<button type="button" data-tab="${esc(t)}" class="${t===active?'active':''}" ${t===active?'aria-current="page"':''}>${esc(t)}</button>`).join('')}</nav>
 <main id="main" tabindex="-1">${message?`<div class="notice" role="status">${esc(message)}</div>`:''}${content}</main>
 <footer class="tiny">Saved in this browser only · Download the Excel or JSON regularly · Mission & Method</footer></div>${m}`;
}
// Start-tab buttons shared by every tool.
const importButtons=(exampleLabel)=>`${exampleLabel?`<button class="button secondary" type="button" data-action="load-example">${esc(exampleLabel)}</button>`:''}<label class="button secondary">Import Excel workbook<input type="file" id="xlsx-import" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden></label><label class="button secondary">Import JSON<input id="import" type="file" accept=".json,application/json" hidden></label>`;
const exportButtons=()=>`<div class="actions no-print" style="margin-bottom:15px"><button class="button" type="button" data-action="xlsx">Download Excel workbook</button><button class="button secondary" type="button" data-action="csv">Download CSV</button><button class="button secondary" type="button" data-action="print">Print / save PDF</button><button class="button secondary" type="button" data-action="export-json">Backup JSON</button></div>`;

// ---------- files ----------
function download(name,body,type){const url=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
// CSV with protection against spreadsheet formula injection.
const csvCell=v=>{let s=String(v??'');if(/^[=+@\-\t\r]/.test(s)&&!/^-?\d+(\.\d+)?$/.test(s))s="'"+s;return `"${s.replaceAll('"','""')}"`};
const csv=rows=>'﻿'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
const XLSX_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const buildXlsx=sheets=>{if(!window.MEALXLSX?.build)throw new Error('Excel export is unavailable in this browser. Download CSV instead.');return window.MEALXLSX.build(sheets)};
const readmeSheet=lines=>({name:'Read me',headerRows:[0],rows:lines.map(l=>[l])});
const schemaSheet=(workbook,version)=>({name:'_schema',rows:[['name','value'],['workbook',workbook],['version',String(version)]]});
const metaSheet=pairs=>({name:'Meta',headerRows:[0],rows:[['Field','Value'],...pairs]});

// ---------- Excel reading (store + deflate) ----------
async function inflate(bytes){try{const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Uint8Array(await new Response(stream).arrayBuffer())}catch{throw new Error('This browser cannot read compressed Excel files. Please use an up-to-date browser.')}}
async function readZip(buf){
 const dv=new DataView(buf.buffer,buf.byteOffset,buf.byteLength),files=new Map();
 let eocd=-1;for(let i=buf.length-22;i>=Math.max(0,buf.length-65557);i--){if(dv.getUint32(i,true)===0x06054b50){eocd=i;break}}
 if(eocd<0)throw new Error('This is not a valid Excel file.');
 const cdOffset=dv.getUint32(eocd+16,true),cdSize=dv.getUint32(eocd+12,true);let p=cdOffset;
 while(p<cdOffset+cdSize){
  if(dv.getUint32(p,true)!==0x02014b50)break;
  const method=dv.getUint16(p+10,true),compSize=dv.getUint32(p+20,true),nameLen=dv.getUint16(p+28,true),extraLen=dv.getUint16(p+30,true),commentLen=dv.getUint16(p+32,true),localHeader=dv.getUint32(p+42,true);
  const name=new TextDecoder().decode(buf.slice(p+46,p+46+nameLen));
  if(/\.xml$|\.rels$/.test(name)){const start=localHeader+30+dv.getUint16(localHeader+26,true)+dv.getUint16(localHeader+28,true),data=buf.slice(start,start+compSize);files.set(name,new TextDecoder().decode(method===0?data:await inflate(data)))}
  p+=46+nameLen+extraLen+commentLen;
 }
 return files;
}
function sheetRows(xml,shared){
 const doc=new DOMParser().parseFromString(xml,'text/xml'),rows=[];
 doc.querySelectorAll('row').forEach(r=>{
  const cells=[];
  r.querySelectorAll('c').forEach(c=>{
   const letters=((c.getAttribute('r')||'').match(/^[A-Z]+/)||[''])[0];let col=0;for(const ch of letters)col=col*26+(ch.charCodeAt(0)-64);col--;
   const t=c.getAttribute('t');let v;
   if(t==='inlineStr')v=[...c.querySelectorAll('is t')].map(x=>x.textContent).join('');
   else if(t==='s')v=shared[Number(c.querySelector('v')?.textContent)]??'';
   else{const raw=c.querySelector('v')?.textContent??'';v=(t==='n'||(!t&&/^-?\d+(\.\d+)?(e-?\d+)?$/i.test(raw)))?Number(raw):raw}
   if(col>=0)cells[col]=v;
  });
  rows[Number(r.getAttribute('r'))-1]=cells;
 });
 return Array.from(rows,r=>r||[]);
}
async function parseXlsx(file){
 const files=await readZip(new Uint8Array(await file.arrayBuffer()));
 const wb=files.get('xl/workbook.xml');if(!wb)throw new Error('This is not an Excel workbook.');
 const P=x=>new DOMParser().parseFromString(x,'text/xml');
 const rel=new Map();const relsXml=files.get('xl/_rels/workbook.xml.rels');if(relsXml)P(relsXml).querySelectorAll('Relationship').forEach(r=>rel.set(r.getAttribute('Id'),r.getAttribute('Target')));
 const sharedXml=files.get('xl/sharedStrings.xml'),shared=sharedXml?[...P(sharedXml).querySelectorAll('si')].map(si=>[...si.querySelectorAll('t')].map(t=>t.textContent).join('')):[];
 const sheets={};
 [...P(wb).querySelectorAll('sheet')].forEach((s,i)=>{
  const rid=s.getAttribute('r:id')||s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');
  const target=rel.get(rid)||`worksheets/sheet${i+1}.xml`,path=target.startsWith('/')?target.slice(1):'xl/'+target.replace(/^\.\//,'');
  const xml=files.get(path);if(xml)sheets[s.getAttribute('name')]=sheetRows(xml,shared);
 });
 return sheets;
}
const findSheet=(sheets,names)=>{for(const n of names)for(const k of Object.keys(sheets))if(k.toLowerCase().trim()===n.toLowerCase())return sheets[k];return null};
// Turn a sheet into objects using its header row. headerMap: {propertyName:'Header text'}
function rowsToObjects(rows,headerMap){
 if(!rows||rows.length<2)return [];
 const H=rows[0].map(x=>String(x??'').trim().toLowerCase());
 const idx=Object.fromEntries(Object.entries(headerMap).map(([k,h])=>[k,H.indexOf(String(h).toLowerCase())]));
 return rows.slice(1).filter(r=>r&&r.some(v=>String(v??'').trim()!=='')).map(r=>Object.fromEntries(Object.entries(idx).map(([k,i])=>[k,i<0?'':(r[i]??'')])));
}
const metaFromSheet=(rows,labelMap)=>{const out={};(rows||[]).slice(1).forEach(r=>{const label=String(r[0]??'').trim().toLowerCase();const key=Object.keys(labelMap).find(k=>labelMap[k].toLowerCase()===label);if(key)out[key]=r[1]??''});return out};
const s=v=>String(v??'').trim();

// ---------- wiring ----------
// app = {render(), action(el), submit(form), importXlsx(file), importJson(file)}
function bind(root,app){
 root.querySelectorAll('[data-tab]').forEach(x=>x.addEventListener('click',()=>app.tab(x.dataset.tab)));
 root.querySelectorAll('[data-action]').forEach(x=>x.addEventListener('click',e=>{if(x.tagName==='A')e.preventDefault();app.action(x)}));
 root.querySelectorAll('[data-form]').forEach(x=>x.addEventListener('submit',e=>{e.preventDefault();app.submit(e.currentTarget)}));
 root.querySelector('#import')?.addEventListener('change',e=>{const f=e.target.files[0];e.target.value='';if(f)app.importJson(f)});
 root.querySelector('#xlsx-import')?.addEventListener('change',e=>{const f=e.target.files[0];e.target.value='';if(f)app.importXlsx(f)});
 const m=root.querySelector('.modal');
 if(m){(m.querySelector('form input:not([type=hidden]),form select,form textarea')||m.querySelector('button'))?.focus();m.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();app.action({dataset:{action:'close'}})}});m.addEventListener('click',e=>{if(e.target===m)app.action({dataset:{action:'close'}})})}
}
const formData=form=>Object.fromEntries(new FormData(form));

window.MMSuite={esc,uid,now,today,currentYear,clamp,clone,fmtDate,monthsSince,num,money,s,
 STATUSES,ACTION_STATUSES,DECISION_STATUSES,store,editorName,askEditor,stamp,edited,
 opts,tip,field,area,select,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,
 download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData};
})();
