/* Donor Tracking — the relationship side of fundraising.
   Grants with their lifecycle: Cultivation → Application → Award → Reporting →
   Closed. Each grant tied to one or more ESOs and (optionally) KPIs/initiatives,
   so leadership can see which objectives are funded. Reporting deadlines
   surface as a calendar.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-donor-tracking-v2',LEGACY='mission-method-donor-tracking-v1';
const SO_KEY='mission-method-strategic-objectives-v2',SK_KEY='mission-method-strategy-kpis-v2',DM_KEY='mission-method-donor-mapping-v2';
const TABS=['Start','Grants','Reporting calendar','Funding picture','Export'];
const STAGES=['Cultivation','Applying','Submitted','Awarded','Reporting','Closed','Declined','Withdrew'];
const PRIORITY=['Critical','High','Medium','Low'];

const blankGrant=()=>({id:uid(),code:'',donorCode:'',donorName:'',title:'',amount:0,currency:'USD',stage:'Cultivation',priority:'Medium',start:'',end:'',applicationDue:'',decisionDate:'',awardedOn:'',closedOn:'',esoCodes:'',initiativeCodes:'',owner:'',contact:'',reportingSchedule:'',conditions:'',notes:'',reports:[],lastEditedBy:'',lastEditedAt:''});
const blankReport=()=>({id:uid(),date:'',title:'',status:'Due',notes:''});
const blankMeta=()=>({organisation:'',year:currentYear,currency:'USD',preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),grants:[]});

function migrateV1(v1){
 const out=blank();
 try{(v1?.grants||[]).forEach((g,i)=>out.grants.push({...blankGrant(),code:'G'+(i+1),donorName:g.donor||g.donorName||'',title:g.title||'',amount:Number(g.amount)||0,currency:g.currency||'USD',stage:STAGES.includes(g.stage)?g.stage:'Cultivation',start:g.start||'',end:g.end||'',owner:g.owner||'',notes:g.notes||''}))}catch(e){console.warn('donor-tracking migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.donor-tracking-cleanup-v2',blank)||d;if(!Array.isArray(d.grants))d.grants=[];d.grants.forEach(g=>{if(!Array.isArray(g.reports))g.reports=[]});return d}});
let db=storage.load(),tab='Start',dlg='',message='',editing={id:null,buffer:null};
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const skKpis=()=>(readStore(SK_KEY)?.kpis||[]).filter(k=>k.code);
const skInitiatives=()=>(readStore(SK_KEY)?.initiatives||[]).filter(i=>i.code);
const mappedDonors=()=>(readStore(DM_KEY)?.donors||[]);
const nextCode=()=>{const nums=db.grants.map(g=>Number(String(g.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'G'+(Math.max(0,...nums)+1)};
const isOverdue=d=>d&&d<today();
const money=(n,cur)=>new Intl.NumberFormat(undefined,{style:'currency',currency:cur||db.meta.currency||'USD',maximumFractionDigits:0}).format(Number(n)||0);

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const active=db.grants.filter(g=>!['Closed','Declined','Withdrew'].includes(g.stage));
 const awardedThisYear=db.grants.filter(g=>g.stage==='Awarded'||g.stage==='Reporting').reduce((n,g)=>n+(Number(g.amount)||0),0);
 const pipelineValue=db.grants.filter(g=>['Cultivation','Applying','Submitted'].includes(g.stage)).reduce((n,g)=>n+(Number(g.amount)||0),0);
 const upcomingReports=db.grants.flatMap(g=>g.reports.map(r=>({...r,grantCode:g.code,grantTitle:g.title}))).filter(r=>r.status==='Due'&&r.date).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
 const overdueReports=upcomingReports.filter(r=>isOverdue(r.date));
 const promotable=mappedDonors().filter(d=>d.stage==='Qualified'||d.stage==='Engaged'||d.stage==='Proposing').length;
 return `${window.MMExample?.renderIntegration?.('donor-tracking')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Relationship side of fundraising. Each grant has a lifecycle, a dollar amount, the ESO(s) it funds, and a reporting schedule. The funding picture shows which objectives are funded and which are at risk.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Reporting currency</span><input data-field="currency" value="${esc(m.currency)}" placeholder="USD" maxlength="12"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Fundraising rhythm — who signs grants off, red lines, no-go donors.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Active grants',active.length,'In the pipeline or being reported')}
    ${card('Awarded value',money(awardedThisYear),'Total secured funding')}
    ${card('Pipeline value',money(pipelineValue),'Expected if everything lands')}
    ${card('Reports overdue',overdueReports.length,'Past their due date',overdueReports.length>0)}
   </div>
   ${promotable?`<div class="notice"><b>${promotable} qualified prospect${promotable===1?'':'s'}</b> in Donor Mapping ready to be moved into tracking. <button class="button secondary small" data-action="import-mapped">↙ Import now</button></div>`:''}
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Each grant can link to the ESOs it funds and the specific initiatives it covers — this feeds the Funding picture tab, where leadership sees which objectives are funded, over-funded, or at risk.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-grant">+ Add a grant</button>
    ${promotable?`<button class="button secondary" data-action="import-mapped">↙ Import ${promotable} from Donor Mapping</button>`:''}
    <a class="button secondary" href="#" data-tab="Grants">Go to grants list →</a>
    <a class="button secondary" href="#" data-tab="Reporting calendar">Reporting calendar →</a>
    <a class="button secondary" href="#" data-tab="Funding picture">Funding picture →</a>
   </div>
  </section>`;
}

function grantsView(){
 const stageOrder={'Awarded':0,'Reporting':1,'Submitted':2,'Applying':3,'Cultivation':4,'Closed':5,'Declined':6,'Withdrew':7};
 const sorted=[...db.grants].sort((a,b)=>(stageOrder[a.stage]??9)-(stageOrder[b.stage]??9)||(Number(b.amount)||0)-(Number(a.amount)||0));
 const rows=sorted.map(g=>{
  const dueOverdue=isOverdue(g.applicationDue)&&['Cultivation','Applying'].includes(g.stage);
  return `<tr>
   <td><b>${esc(g.code)}</b></td>
   <td><b>${esc(g.title||'Untitled grant')}</b>${g.donorName?`<br><small>${esc(g.donorName)}</small>`:''}</td>
   <td>${money(g.amount,g.currency)}</td>
   <td>${pill(g.stage||'Cultivation')}</td>
   <td>${esc(g.esoCodes||'—')}</td>
   <td>${g.applicationDue?`${esc(fmtDate(g.applicationDue))} ${dueOverdue?'<span class="pill bad" style="font-size:9px">overdue</span>':''}`:'<span class="muted">—</span>'}</td>
   <td>${esc(fmtDate(g.start)||'')} → ${esc(fmtDate(g.end)||'')}</td>
   <td>${esc(g.owner||'—')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-grant" data-id="${esc(g.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Grants</h2><p>Sorted by stage then by amount. Each grant can link to the ESOs it funds (comma-separated codes) and to specific KPI initiatives.</p></div><button class="button" data-action="new-grant">+ Add a grant</button></div>
  ${table(['Code','Grant','Amount','Stage','Funds ESO','Application due','Period','Owner',''],rows,'No grants yet. Click "Add a grant" to start.')}`;
}

function reportingView(){
 const all=db.grants.flatMap(g=>g.reports.map(r=>({...r,grantCode:g.code,grantTitle:g.title,donor:g.donorName,amount:g.amount,currency:g.currency})));
 if(!all.length)return `<div class="rowhead section-head"><div><h2>Reporting calendar</h2><p>Scheduled reporting deadlines across every grant. Edit a grant to add its reporting schedule.</p></div></div><p class="example-empty">No reports scheduled yet. Open a grant and add its reporting dates.</p>`;
 const sorted=[...all].filter(r=>r.date).sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999'));
 const rows=sorted.map(r=>{const od=isOverdue(r.date)&&r.status==='Due';return `<tr><td>${esc(fmtDate(r.date))}${od?' <span class="pill bad" style="font-size:9px">overdue</span>':''}</td><td><b>${esc(r.title||'Report')}</b></td><td><button class="link" data-action="edit-grant" data-id="${esc(db.grants.find(g=>g.code===r.grantCode)?.id||'')}">${esc(r.grantCode)} · ${esc(r.grantTitle||'Grant')}</button></td><td>${esc(r.donor||'—')}</td><td>${pill(r.status)}</td></tr>`});
 const overdueCount=sorted.filter(r=>isOverdue(r.date)&&r.status==='Due').length;
 const dueSoonCount=sorted.filter(r=>r.status==='Due'&&r.date>=today()&&new Date(r.date)-new Date(today())<30*86400000).length;
 return `<div class="rowhead section-head"><div><h2>Reporting calendar</h2><p>Every scheduled report across every grant, chronological. Overdue items are flagged.</p></div></div>
  <div class="grid four" style="margin-bottom:16px">${card('Total reports',sorted.length,'')}${card('Overdue',overdueCount,'Past the due date',overdueCount>0)}${card('Due within 30 days',dueSoonCount,'Immediate attention',dueSoonCount>0)}${card('Submitted',sorted.filter(r=>r.status==='Submitted'||r.status==='Accepted').length,'Already filed')}</div>
  ${table(['Due date','Report','From grant','Donor','Status'],rows,'')}`;
}

function fundingPictureView(){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 if(!esos.length)return `<div class="rowhead section-head"><div><h2>Funding picture</h2><p>Reads your ESOs from Strategic Objectives. Open that tool first.</p></div></div><p class="example-empty">No ESOs found.</p>`;
 const perEso=esos.map(o=>{
  const funding=db.grants.filter(g=>(g.esoCodes||'').split(/[,\s]+/).map(x=>x.trim().toUpperCase()).includes(o.code.toUpperCase())).filter(g=>['Awarded','Reporting','Submitted','Applying'].includes(g.stage));
  const awarded=funding.filter(g=>['Awarded','Reporting'].includes(g.stage)).reduce((n,g)=>n+(Number(g.amount)||0),0);
  const pipeline=funding.filter(g=>['Submitted','Applying'].includes(g.stage)).reduce((n,g)=>n+(Number(g.amount)||0),0);
  return {o,funding,awarded,pipeline};
 });
 const unfunded=perEso.filter(x=>x.awarded===0&&x.pipeline===0).length;
 return `<div class="rowhead section-head"><div><h2>Funding picture by ESO</h2><p>For each external strategic objective: awarded value (secured) + pipeline value (in play). ESOs with no funding at all are flagged.</p></div></div>
  ${unfunded?`<div class="notice warn"><b>${unfunded} ESO${unfunded===1?'':'s'} with no funding yet</b> — awarded nor pipeline. See which below.</div>`:''}
  <div class="grid" style="gap:12px">${perEso.map(x=>`<section class="panel"><div class="rowhead"><div><span class="eyebrow">${esc(x.o.code)}</span><h3>${esc(x.o.title)}</h3></div><span class="pill ${x.awarded===0&&x.pipeline===0?'bad':''}">${x.funding.length} grant${x.funding.length===1?'':'s'}</span></div><div class="grid three"><div><span class="eyebrow">Awarded</span><p class="metric">${money(x.awarded)}</p></div><div><span class="eyebrow">Pipeline</span><p class="metric">${money(x.pipeline)}</p></div><div><span class="eyebrow">Total if lands</span><p class="metric">${money(x.awarded+x.pipeline)}</p></div></div>${x.funding.length?`<ul style="margin:10px 0 0;padding-left:18px;font-size:13px">${x.funding.map(g=>`<li>${pill(g.stage)} <button class="link" data-action="edit-grant" data-id="${esc(g.id)}">${esc(g.code)} · ${esc(g.title)}</button> — ${money(g.amount,g.currency)}</li>`).join('')}</ul>`:'<p class="muted" style="margin:10px 0 0">No funding attached to this ESO yet.</p>'}</section>`).join('')}</div>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, year, currency</li><li>Grants — full lifecycle per grant</li><li>Reports — every scheduled report with grant linkage</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

function grantModal(g){
 const isNew=!g;g=g||blankGrant();
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const inits=skInitiatives();
 const esoChips=esos.length?`<p class="tiny" style="margin:0 0 4px">Available ESOs: ${esos.map(o=>`<button type="button" class="link" data-eso-chip="${esc(o.code)}" title="Click to add">${esc(o.code)}</button>`).join(' · ')}</p>`:'';
 const initChips=inits.length?`<p class="tiny" style="margin:0 0 4px">Available initiatives: ${inits.slice(0,8).map(i=>`<button type="button" class="link" data-init-chip="${esc(i.code)}" title="Click to add">${esc(i.code)}</button>`).join(' · ')}${inits.length>8?` +${inits.length-8} more in Strategy KPIs`:''}</p>`:'';
 const reportRow=(r,i)=>`<div class="mad-row" data-row-kind="report" data-row-id="${esc(r.id)}">
  <label class="mad-f mad-f-narrow"><span>Due</span><input type="date" data-field="date" data-rid="${esc(r.id)}" value="${esc(r.date)}"></label>
  <label class="mad-f mad-f-wide"><span>Report title</span><input data-field="title" data-rid="${esc(r.id)}" value="${esc(r.title)}" placeholder="e.g. Q1 narrative + financial"></label>
  <label class="mad-f"><span>Status</span><select data-field="status" data-rid="${esc(r.id)}">${['Due','In progress','Submitted','Accepted','Overdue'].map(s=>`<option ${r.status===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
  <label class="mad-f mad-f-wide"><span>Notes</span><input data-field="notes" data-rid="${esc(r.id)}" value="${esc(r.notes)}"></label>
  <button type="button" class="link danger" data-action="remove-report" data-id="${esc(r.id)}">Remove</button>
 </div>`;
 return modal(isNew?'Add grant':'Edit grant',`<form data-form="grant" data-id="${esc(g.id||'')}" class="form">
  <div class="form-grid-top">
   ${field('Code','code',g.code||nextCode(),'text','required')}
   ${field('Donor name','donorName',g.donorName,'text','required')}
   ${field('Donor code (from mapping)','donorCode',g.donorCode,'text','','Optional — link back to the Donor Mapping record.')}
  </div>
  ${field('Grant title','title',g.title,'text','required')}
  <div class="form-grid-top">
   ${field('Amount','amount',g.amount,'number','step="any" min="0"')}
   ${field('Currency','currency',g.currency||'USD','text','maxlength="12"')}
   ${select('Priority','priority',PRIORITY,g.priority||'Medium')}
  </div>
  ${select('Stage','stage',STAGES,g.stage||'Cultivation')}
  <div class="form-grid-top">
   ${field('Start','start',g.start,'date')}
   ${field('End','end',g.end,'date')}
   ${field('Application due','applicationDue',g.applicationDue,'date')}
  </div>
  <div class="form-grid-top">
   ${field('Decision date','decisionDate',g.decisionDate,'date')}
   ${field('Awarded on','awardedOn',g.awardedOn,'date')}
   ${field('Closed on','closedOn',g.closedOn,'date')}
  </div>
  <label class="field full"><span class="label">ESO codes funded (comma-separated) ${tip('Link this grant to one or more external strategic objectives it funds.')}</span>${esoChips}<input name="esoCodes" value="${esc(g.esoCodes)}" placeholder="e.g. ESO1, ESO2" data-eso-target></label>
  <label class="field full"><span class="label">Initiative codes funded (optional)</span>${initChips}<input name="initiativeCodes" value="${esc(g.initiativeCodes)}" placeholder="e.g. AP1, AP3" data-init-target></label>
  ${field('Grant owner (internal)','owner',g.owner)}
  ${field('Donor contact','contact',g.contact)}
  ${area('Reporting schedule — plain-text summary','reportingSchedule',g.reportingSchedule,'e.g. Quarterly narrative + annual audit.')}
  ${area('Conditions / restrictions','conditions',g.conditions)}
  <h3 class="form-section">Reporting deadlines</h3>
  <div class="mad-rows" id="dm-reports">${g.reports.length?g.reports.map(reportRow).join(''):'<p class="muted" style="grid-column:1/-1">No reports scheduled. Click "Add report" below.</p>'}</div>
  <div style="grid-column:1/-1"><button type="button" class="button small secondary" data-action="add-report">+ Add report</button></div>
  ${area('Notes','notes',g.notes)}
  ${formEnd('Save grant',{deleteId:isNew?'':g.id,deleteLabel:'Delete grant'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';editing={id:null,buffer:null};render();return}
 if(a==='new-grant'){const g={...blankGrant(),code:nextCode()};editing={id:null,buffer:g};dlg=grantModal(g);render();return}
 if(a==='edit-grant'){const g=db.grants.find(x=>x.id===id);if(g){editing={id:g.id,buffer:JSON.parse(JSON.stringify(g))};dlg=grantModal(editing.buffer);render()}return}
 if(a==='add-report'||a==='remove-report'){
  syncBuffer(root);
  if(a==='add-report')editing.buffer.reports.push(blankReport());
  if(a==='remove-report'){if(!confirm('Remove this report deadline?'))return;editing.buffer.reports=editing.buffer.reports.filter(r=>r.id!==id)}
  dlg=grantModal(editing.buffer);render();return;
 }
 if(a==='delete'){const g=db.grants.find(x=>x.id===id);if(!g)return;if(!confirm('Delete this grant and its reports? Cannot be undone.'))return;db.grants=db.grants.filter(x=>x.id!==id);dlg='';editing={id:null,buffer:null};save('Grant deleted.');return}
 if(a==='import-mapped'){importFromMapping();return}
 if(a==='xlsx'){try{download('Mission-and-Method-donor-tracking.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-donor-tracking.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-donor-tracking-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function syncBuffer(root){
 if(!editing.buffer)return;
 const form=root.querySelector('form[data-form="grant"]');if(!form)return;
 const d=formData(form);
 Object.assign(editing.buffer,{code:s(d.code),donorName:s(d.donorName),donorCode:s(d.donorCode),title:s(d.title),amount:Number(d.amount)||0,currency:s(d.currency)||'USD',priority:d.priority,stage:d.stage,start:d.start||'',end:d.end||'',applicationDue:d.applicationDue||'',decisionDate:d.decisionDate||'',awardedOn:d.awardedOn||'',closedOn:d.closedOn||'',esoCodes:s(d.esoCodes),initiativeCodes:s(d.initiativeCodes),owner:s(d.owner),contact:s(d.contact),reportingSchedule:s(d.reportingSchedule),conditions:s(d.conditions),notes:s(d.notes)});
 root.querySelectorAll('#dm-reports .mad-row').forEach(row=>{const rid=row.dataset.rowId;const r=editing.buffer.reports.find(x=>x.id===rid);if(!r)return;row.querySelectorAll('[data-field]').forEach(el=>{r[el.dataset.field]=el.value})});
}

function submit(form){
 if(form.dataset.form!=='grant')return;
 syncBuffer(root);
 const buf=editing.buffer;
 stamp(buf);
 const existing=db.grants.find(g=>g.id===buf.id);
 if(existing)Object.assign(existing,buf);else db.grants.push(buf);
 editing={id:null,buffer:null};dlg='';save('Grant saved.');
}

function importFromMapping(){
 const donors=mappedDonors().filter(d=>['Qualified','Engaged','Proposing'].includes(d.stage));
 if(!donors.length){message='No qualified donors found in Donor Mapping.';render();return}
 let added=0;
 donors.forEach(d=>{if(db.grants.some(g=>g.donorCode===d.code))return;const g={...blankGrant(),code:nextCode(),donorCode:d.code,donorName:d.name,title:`${d.name} — grant to design`,stage:d.stage==='Proposing'?'Applying':'Cultivation',priority:'Medium'};stamp(g);db.grants.push(g);added++});
 save(`${added} donor${added===1?'':'s'} imported from Donor Mapping. Fill in the grant details.`);
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Donor Tracking',['Relationship side of fundraising — grants with their lifecycle, reporting deadlines and ESO linkage.']),
  metaSheet(db.meta),
  {name:'Grants',rows:[
   ['Code','Donor code','Donor','Title','Amount','Currency','Stage','Priority','Start','End','Application due','Decision date','Awarded on','Closed on','Funds ESO','Funds initiatives','Owner','Donor contact','Reporting schedule','Conditions','Notes'],
   ...(withData?db.grants.map(g=>[g.code,g.donorCode,g.donorName,g.title,g.amount,g.currency,g.stage,g.priority,g.start,g.end,g.applicationDue,g.decisionDate,g.awardedOn,g.closedOn,g.esoCodes,g.initiativeCodes,g.owner,g.contact,g.reportingSchedule,g.conditions,g.notes]):[])
  ]},
  {name:'Reports',rows:[['Grant code','Due date','Report title','Status','Notes'],...(withData?db.grants.flatMap(g=>g.reports.map(r=>[g.code,r.date,r.title,r.status,r.notes])):[])]},
  schemaSheet({Grants:'code,donorCode,donorName,title,amount,currency,stage,priority,start,end,applicationDue,decisionDate,awardedOn,closedOn,esoCodes,initiativeCodes,owner,contact,reportingSchedule,conditions,notes',Reports:'grantCode,date,title,status,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){download('Mission-and-Method-donor-tracking.csv',csv([['Code','Donor','Title','Amount','Currency','Stage','ESOs','Start','End','Owner'],...db.grants.map(g=>[g.code,g.donorName,g.title,g.amount,g.currency,g.stage,g.esoCodes,g.start,g.end,g.owner])]),'text/csv;charset=utf-8')}

async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const gRows=rowsToObjects(findSheet(data,'Grants'));
  const rRows=rowsToObjects(findSheet(data,'Reports'));
  if(gRows?.length)db.grants=gRows.map(r=>({...blankGrant(),code:r.Code||'',donorCode:r['Donor code']||'',donorName:r.Donor||'',title:r.Title||'',amount:Number(r.Amount)||0,currency:r.Currency||'USD',stage:r.Stage||'Cultivation',priority:r.Priority||'Medium',start:r.Start||'',end:r.End||'',applicationDue:r['Application due']||'',decisionDate:r['Decision date']||'',awardedOn:r['Awarded on']||'',closedOn:r['Closed on']||'',esoCodes:r['Funds ESO']||'',initiativeCodes:r['Funds initiatives']||'',owner:r.Owner||'',contact:r['Donor contact']||'',reportingSchedule:r['Reporting schedule']||'',conditions:r.Conditions||'',notes:r.Notes||''}));
  if(rRows?.length){const byCode=new Map(db.grants.map(g=>[g.code,g]));rRows.forEach(r=>{const g=byCode.get(r['Grant code']);if(!g)return;g.reports.push({...blankReport(),date:r['Due date']||'',title:r['Report title']||'',status:r.Status||'Due',notes:r.Notes||''})})}
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})});
 // Chip-click helpers inside the grant modal (append the chosen code)
 root.querySelectorAll('[data-eso-chip]').forEach(c=>c.addEventListener('click',()=>{const inp=root.querySelector('[data-eso-target]');if(!inp)return;const code=c.dataset.esoChip;const parts=(inp.value||'').split(/\s*,\s*/).filter(Boolean);if(!parts.includes(code))parts.push(code);inp.value=parts.join(', ')}));
 root.querySelectorAll('[data-init-chip]').forEach(c=>c.addEventListener('click',()=>{const inp=root.querySelector('[data-init-target]');if(!inp)return;const code=c.dataset.initChip;const parts=(inp.value||'').split(/\s*,\s*/).filter(Boolean);if(!parts.includes(code))parts.push(code);inp.value=parts.join(', ')}));
}

function render(){
 const views={'Start':startView,'Grants':grantsView,'Reporting calendar':reportingView,'Funding picture':fundingPictureView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Funding · Donor tracking',title:'Donor Tracking',intro:'Relationship side of fundraising. Grants with lifecycle, dollar amounts, ESO linkage and reporting deadlines. See which objectives are funded, which are over-funded, and which are at risk.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=11&lesson=pipeline',label:'Review Module 11'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';editing={id:null,buffer:null};render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
