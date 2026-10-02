/* Donor Mapping — the prospect side of fundraising.
   Donor profiles with alignment-to-ESO scoring (0–3 per objective), pipeline
   stage (Prospect → Qualified → Engaged → Proposing → Decided), and
   decision outcomes. Qualified donors are promoted to Donor Tracking for
   active cultivation. Reads ESOs from Strategic Objectives.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-donor-mapping-v2',LEGACY='mission-method-donor-mapping-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2';
const TABS=['Start','Prospects','Alignment matrix','Export'];
const DTYPES=['Foundation','Government','Bilateral','Corporate','Individual','UN agency','Multilateral','Other'];
const STAGES=['Prospect','Qualified','Engaged','Proposing','Decided','Not fit'];
const SIZES=['Micro (<$10k)','Small ($10k–$100k)','Medium ($100k–$1M)','Large ($1M–$10M)','Very large (>$10M)'];

const blankDonor=()=>({id:uid(),code:'',name:'',type:'Foundation',country:'',region:'',size:'Small ($10k–$100k)',focusAreas:'',website:'',contact:'',email:'',stage:'Prospect',typicalGrant:'',nextCycle:'',alignment:{},rationale:'',decision:'',decisionDate:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',currency:'USD',notes:''});
const blank=()=>({version:2,meta:blankMeta(),donors:[]});

function migrateV1(v1){
 const out=blank();
 try{
  (v1?.donors||[]).forEach((d,i)=>out.donors.push({...blankDonor(),code:'D'+(i+1),name:d.name||'',type:DTYPES.includes(d.type)?d.type:'Foundation',country:d.country||'',focusAreas:d.focus||d.focusAreas||'',stage:STAGES.includes(d.stage)?d.stage:'Prospect',typicalGrant:d.typicalGrant||'',notes:d.notes||''}));
 }catch(e){console.warn('donor-mapping migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.donor-mapping-cleanup-v2',blank)||d;if(!Array.isArray(d.donors))d.donors=[];d.donors.forEach(x=>{if(!x.alignment||typeof x.alignment!=='object')x.alignment={}});return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const nextCode=()=>{const nums=db.donors.map(d=>Number(String(d.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'D'+(Math.max(0,...nums)+1)};

// ---------- Alignment score ----------
// Each donor rates alignment 0–3 against each ESO; total score and % of max.
function totalAlignment(donor){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 if(!esos.length)return {sum:0,max:0,pct:0};
 const sum=esos.reduce((n,o)=>n+(Number(donor.alignment?.[o.code])||0),0);
 const max=esos.length*3;
 return {sum,max,pct:max?Math.round((sum/max)*100):0};
}

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const totals={total:db.donors.length,qualified:db.donors.filter(d=>d.stage!=='Prospect'&&d.stage!=='Not fit').length,proposing:db.donors.filter(d=>d.stage==='Proposing').length,decided:db.donors.filter(d=>d.stage==='Decided').length};
 return `${window.MMExample?.renderIntegration?.('donor-mapping')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Prospect side of fundraising. Score each donor's alignment against your strategic objectives, qualify or disqualify them, and promote qualified prospects into active cultivation (Donor Tracking).</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Currency</span><input data-field="currency" value="${esc(m.currency)}" placeholder="USD" maxlength="12"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Fundraising strategy context — target mix, red lines, no-go donors.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Prospects',totals.total,'In the pipeline')}
    ${card('Qualified+',totals.qualified,'Past the initial fit screen')}
    ${card('Proposing',totals.proposing,'With a live proposal',totals.proposing>5)}
    ${card('Decided',totals.decided,'Yes or no returned')}
   </div>
   ${esos.length?'':'<div class="notice warn"><b>No external strategic objectives found yet.</b> Open Strategic Objectives first — the alignment matrix uses your ESOs as columns.</div>'}
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Add donors one at a time, score each one's fit with each of your ESOs (0 = no fit, 3 = perfect fit), and let the matrix surface the best-aligned prospects. Qualified donors can be promoted to <b>Donor Tracking</b> for active cultivation.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-donor">+ Add a donor</button>
    <a class="button secondary" href="#" data-tab="Prospects">Go to prospect pipeline →</a>
    <a class="button secondary" href="#" data-tab="Alignment matrix">See alignment matrix →</a>
    <a class="button secondary" href="Donor-Tracking.html">Open Donor Tracking →</a>
   </div>
  </section>`;
}

function prospectsView(){
 const stageOrder={'Proposing':0,'Engaged':1,'Qualified':2,'Prospect':3,'Decided':4,'Not fit':5};
 const sorted=[...db.donors].sort((a,b)=>(stageOrder[a.stage]??9)-(stageOrder[b.stage]??9)||totalAlignment(b).pct-totalAlignment(a).pct);
 const rows=sorted.map(d=>{
  const align=totalAlignment(d);
  const bandClass=align.pct>=75?'risk-band-low':align.pct>=50?'risk-band-medium':align.pct>=25?'risk-band-high':'risk-band-none';
  return `<tr>
   <td><b>${esc(d.code)}</b></td>
   <td><b>${esc(d.name||'Untitled donor')}</b>${d.country?`<br><small>${esc(d.country)}${d.region?' · '+esc(d.region):''}</small>`:''}</td>
   <td>${pill(d.type)}</td>
   <td>${esc(d.size||'—')}<br><small>${esc(d.typicalGrant||'')}</small></td>
   <td class="risk-score-cell ${bandClass}" title="${align.sum}/${align.max}"><b>${align.pct}%</b></td>
   <td>${pill(d.stage||'Prospect')}</td>
   <td>${esc(fmtDate(d.nextCycle)||'—')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-donor" data-id="${esc(d.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Prospect pipeline</h2><p>Donors sorted by stage then by fit. Click Edit to open the full profile — type, focus areas, contact, cycle timing and the 0–3 fit score against each of your ESOs.</p></div><button class="button" data-action="new-donor">+ Add a donor</button></div>
  ${table(['Code','Donor','Type','Size · typical grant','Fit %','Stage','Next cycle',''],rows,'No donors yet. Click "Add a donor" to begin.')}`;
}

function alignmentMatrixView(){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 if(!esos.length)return `<div class="rowhead section-head"><div><h2>Alignment matrix</h2><p>Each donor's fit score against each ESO. Open Strategic Objectives first to populate the columns.</p></div></div><p class="example-empty">No external strategic objectives found.</p>`;
 const sorted=[...db.donors].sort((a,b)=>totalAlignment(b).pct-totalAlignment(a).pct);
 const scoreCell=v=>{const n=Number(v)||0;const cls=n===3?'score-3':n===2?'score-2':n===1?'score-1':'score-0';return `<td class="align-score ${cls}">${n||'·'}</td>`};
 const rows=sorted.map(d=>{const t=totalAlignment(d);return `<tr><td><b>${esc(d.code)}</b></td><td><b>${esc(d.name||'—')}</b></td><td>${pill(d.stage||'Prospect')}</td>${esos.map(o=>scoreCell(d.alignment?.[o.code])).join('')}<td class="align-total"><b>${t.pct}%</b><br><small>${t.sum}/${t.max}</small></td></tr>`}).join('');
 return `<div class="rowhead section-head"><div><h2>Alignment matrix · donors × ESOs</h2><p>Scores: 0 = no fit, 1 = adjacent, 2 = fit, 3 = perfect fit. The % column is the donor's total out of the maximum possible. Edit a donor to set the scores.</p></div></div>
  <section class="panel"><div class="tablewrap"><table class="align-matrix"><thead><tr><th>Code</th><th>Donor</th><th>Stage</th>${esos.map(o=>`<th title="${esc(o.title)}">${esc(o.code)}</th>`).join('')}<th>Fit %</th></tr></thead><tbody>${rows||'<tr><td colspan="'+(4+esos.length)+'" class="muted">No donors yet.</td></tr>'}</tbody></table></div></section>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, year, currency</li><li>Donors — full profile per donor including ESO alignment scores</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

function donorModal(d){
 const isNew=!d;d=d||blankDonor();
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const alignFields=esos.map(o=>`<label class="field"><span class="label">${esc(o.code)} · ${esc(o.title.slice(0,45))}${o.title.length>45?'…':''} ${tip('0 = no fit, 1 = adjacent, 2 = fit, 3 = perfect fit')}</span><select name="align_${esc(o.code)}">${[0,1,2,3].map(v=>`<option value="${v}" ${String(d.alignment?.[o.code]||0)===String(v)?'selected':''}>${v}</option>`).join('')}</select></label>`).join('');
 return modal(isNew?'Add donor':'Edit donor',`<form data-form="donor" data-id="${esc(d.id||'')}" class="form">
  ${field('Code','code',d.code||nextCode(),'text','required')}
  ${field('Donor name','name',d.name,'text','required')}
  ${select('Type','type',DTYPES,d.type)}
  ${field('Country','country',d.country)}
  ${field('Region','region',d.region,'text','','e.g. Sub-Saharan Africa, LAC, SE Asia')}
  ${select('Size','size',SIZES,d.size)}
  ${field('Typical grant size','typicalGrant',d.typicalGrant,'text','','e.g. $50,000 over 2 years')}
  ${field('Website','website',d.website,'url')}
  ${field('Contact person','contact',d.contact)}
  ${field('Contact email','email',d.email,'email')}
  ${area('Focus areas / priorities','focusAreas',d.focusAreas)}
  <h3 class="form-section">Pipeline</h3>
  ${select('Stage','stage',STAGES,d.stage||'Prospect')}
  ${field('Next funding cycle','nextCycle',d.nextCycle,'date','','When the next proposal window opens.')}
  ${area('Fit rationale','rationale',d.rationale,'Why this donor and your work are a match (or not).')}
  <h3 class="form-section">ESO alignment (0–3 per objective)</h3>
  ${esos.length?`<div class="form-grid-top">${alignFields}</div>`:'<p class="muted" style="grid-column:1/-1">No external strategic objectives found. Open Strategic Objectives first.</p>'}
  <h3 class="form-section">Decision</h3>
  ${select('Outcome','decision',['','Interested','Submitted proposal','Awarded','Declined','Withdrew'],d.decision||'')}
  ${field('Decision date','decisionDate',d.decisionDate,'date')}
  ${area('Notes','notes',d.notes)}
  ${formEnd('Save donor',{deleteId:isNew?'':d.id,deleteLabel:'Delete donor'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-donor'){dlg=donorModal();render();return}
 if(a==='edit-donor'){const d=db.donors.find(x=>x.id===id);if(d){dlg=donorModal(d);render()}return}
 if(a==='delete'){const d=db.donors.find(x=>x.id===id);if(!d)return;if(!confirm('Delete this donor? Cannot be undone.'))return;db.donors=db.donors.filter(x=>x.id!==id);dlg='';save('Donor deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-donor-mapping.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-donor-mapping.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-donor-mapping-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 if(form.dataset.form!=='donor')return;
 const existing=db.donors.find(d=>d.id===form.dataset.id);
 const d=existing||{...blankDonor()};
 const data=formData(form);
 const align={};soObjectives().filter(o=>(o.group||'External')==='External').forEach(o=>{align[o.code]=Number(data['align_'+o.code])||0});
 Object.assign(d,{code:s(data.code)||d.code||nextCode(),name:s(data.name),type:data.type,country:s(data.country),region:s(data.region),size:data.size,typicalGrant:s(data.typicalGrant),website:s(data.website),contact:s(data.contact),email:s(data.email),focusAreas:s(data.focusAreas),stage:data.stage||'Prospect',nextCycle:data.nextCycle||'',rationale:s(data.rationale),alignment:align,decision:data.decision||'',decisionDate:data.decisionDate||'',notes:s(data.notes)});
 stamp(d);
 if(!existing)db.donors.push(d);
 dlg='';save('Donor saved.');
}

function buildWorkbook(withData){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const header=['Code','Name','Type','Country','Region','Size','Typical grant','Website','Contact','Email','Focus areas','Stage','Next cycle','Rationale','Decision','Decision date',...esos.map(o=>'Align:'+o.code),'Fit %','Notes'];
 const rowFor=d=>{const t=totalAlignment(d);return [d.code,d.name,d.type,d.country,d.region,d.size,d.typicalGrant,d.website,d.contact,d.email,d.focusAreas,d.stage,d.nextCycle,d.rationale,d.decision,d.decisionDate,...esos.map(o=>d.alignment?.[o.code]||0),t.pct,d.notes]};
 const sheets=[
  readmeSheet('Donor Mapping',['Prospect side of fundraising.','Alignment columns use the 0–3 score per ESO; Fit % is the total over the maximum possible.']),
  metaSheet(db.meta),
  {name:'Donors',rows:[header,...(withData?db.donors.map(rowFor):[])]},
  schemaSheet({Donors:'code,name,type,country,region,size,typicalGrant,website,contact,email,focusAreas,stage,nextCycle,rationale,decision,decisionDate,alignment,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 download('Method-into-Impact-donor-mapping.csv',csv([['Code','Name','Type','Country','Stage','Fit %',...esos.map(o=>o.code)],...db.donors.map(d=>{const t=totalAlignment(d);return [d.code,d.name,d.type,d.country,d.stage,t.pct,...esos.map(o=>d.alignment?.[o.code]||0)]})]),'text/csv;charset=utf-8');
}
async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const rows=rowsToObjects(findSheet(data,'Donors'));
  if(rows?.length)db.donors=rows.map(r=>{const align={};Object.keys(r).filter(k=>k.startsWith('Align:')).forEach(k=>{align[k.slice(6)]=Number(r[k])||0});return {...blankDonor(),code:r.Code||'',name:r.Name||'',type:r.Type||'Foundation',country:r.Country||'',region:r.Region||'',size:r.Size||'',typicalGrant:r['Typical grant']||'',website:r.Website||'',contact:r.Contact||'',email:r.Email||'',focusAreas:r['Focus areas']||'',stage:r.Stage||'Prospect',nextCycle:r['Next cycle']||'',rationale:r.Rationale||'',decision:r.Decision||'',decisionDate:r['Decision date']||'',alignment:align,notes:r.Notes||''}});
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Prospects':prospectsView,'Alignment matrix':alignmentMatrixView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Funding · Donor mapping',title:'Donor Mapping',intro:'Prospect side of fundraising. Score each donor against your strategic objectives, qualify or disqualify, and promote qualified prospects to Donor Tracking for active cultivation.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=11&lesson=prospects',label:'Review Module 11'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
