/* Policy Management — compliance-focused policy register.
   One row per policy with owner, review cadence, next-review date, status,
   version, document link and acknowledgement scope (whole org, team, role).
   Policies that need acknowledgement feed the Onboarding tool's checklist.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-policy-v2';
const ORG_KEY='mission-method-org-structure-v2';
const TABS=['Start','Register','Review calendar','Export'];
const CATEGORIES=['Governance','Safeguarding','HR','Finance','Operations','MEAL','Data protection','Code of conduct','Donor compliance','Health & safety','Procurement','Other'];
const CADENCES=['Annual','Biennial','Every 3 years','Ad hoc'];
const STATUSES=['Draft','In consultation','Approved','Under revision','Retired'];
const ACK_SCOPE=['All staff','All staff + board','Senior leaders only','Specific roles','Not required'];

const blankPolicy=()=>({id:uid(),code:'',title:'',category:'Other',version:'1.0',status:'Draft',owner:'',approver:'',approvedOn:'',effectiveFrom:'',reviewCadence:'Annual',nextReview:'',lastReview:'',ackScope:'All staff',ackRoles:'',documentLink:'',summary:'',changesSinceLast:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),policies:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.policy-cleanup-v2',blank)||d;if(!Array.isArray(d.policies))d.policies=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const roleOptions=()=>(readStore(ORG_KEY)?.roles||[]).map(r=>`${r.code} ${r.title}`);
const nextCode=()=>{const nums=db.policies.map(p=>Number(String(p.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'POL'+(Math.max(0,...nums)+1)};
const isOverdue=d=>d&&d<today();

function startView(){
 const m=db.meta;
 const approved=db.policies.filter(p=>p.status==='Approved').length;
 const draft=db.policies.filter(p=>p.status==='Draft'||p.status==='In consultation').length;
 const overdue=db.policies.filter(p=>isOverdue(p.nextReview)&&p.status==='Approved').length;
 const dueSoon=db.policies.filter(p=>p.status==='Approved'&&p.nextReview&&p.nextReview>=today()&&new Date(p.nextReview)-new Date(today())<60*86400000).length;
 return `${window.MMExample?.renderIntegration?.('policy')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Compliance-grade policy register. Each policy has an owner, an approval trail, a review cadence, a document link and an acknowledgement scope. Overdue reviews flag red automatically.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Policy framework context — how approvals work in your organisation.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Policies',db.policies.length,'In the register')}
    ${card('Approved & live',approved,'Current and effective')}
    ${card('Reviews overdue',overdue,'Past the review date',overdue>0)}
    ${card('Review due <60d',dueSoon,'Upcoming attention',dueSoon>0)}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Policies with an acknowledgement scope of "All staff" or similar feed into the Onboarding tool's new-hire checklist.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-policy">+ Add a policy</button>
    <a class="button secondary" href="#" data-tab="Register">Go to policy register →</a>
    <a class="button secondary" href="#" data-tab="Review calendar">Review calendar →</a>
   </div>
  </section>`;
}

function registerView(){
 const sorted=[...db.policies].sort((a,b)=>(a.category||'').localeCompare(b.category||'')||(a.title||'').localeCompare(b.title||''));
 const rows=sorted.map(p=>{
  const od=isOverdue(p.nextReview)&&p.status==='Approved';
  return `<tr>
   <td><b>${esc(p.code)}</b></td>
   <td><b>${esc(p.title||'Untitled')}</b>${p.documentLink?`<br><small><a class="link" href="${esc(p.documentLink)}" target="_blank" rel="noopener">${esc(p.documentLink.length>40?p.documentLink.slice(0,40)+'…':p.documentLink)}</a></small>`:''}</td>
   <td>${pill(p.category||'Other')}</td>
   <td>${esc(p.version||'')}</td>
   <td>${pill(p.status||'Draft')}</td>
   <td>${esc(p.owner||'—')}</td>
   <td>${p.approvedOn?`${esc(p.approver||'—')}<br><small>${esc(fmtDate(p.approvedOn))}</small>`:'<span class="muted">—</span>'}</td>
   <td>${esc(p.reviewCadence||'')}<br><small>next ${esc(fmtDate(p.nextReview)||'—')} ${od?'<span class="pill bad" style="font-size:9px">overdue</span>':''}</small></td>
   <td>${esc(p.ackScope||'—')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-policy" data-id="${esc(p.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Policy register</h2><p>Every policy with its owner, approval trail, version, review cadence and acknowledgement scope. Overdue items flagged red. Document link opens the current approved version.</p></div><button class="button" data-action="new-policy">+ Add a policy</button></div>
  ${table(['Code','Policy','Category','Version','Status','Owner','Approved','Review','Ack scope',''],rows,'No policies yet.')}`;
}

function reviewCalendarView(){
 const live=db.policies.filter(p=>p.status==='Approved'&&p.nextReview);
 const sorted=[...live].sort((a,b)=>(a.nextReview||'').localeCompare(b.nextReview||''));
 const overdue=sorted.filter(p=>isOverdue(p.nextReview));
 const soon=sorted.filter(p=>!isOverdue(p.nextReview)&&new Date(p.nextReview)-new Date(today())<60*86400000);
 const rows=sorted.map(p=>{const od=isOverdue(p.nextReview);return `<tr><td>${esc(fmtDate(p.nextReview))}${od?' <span class="pill bad" style="font-size:9px">overdue</span>':''}</td><td><b>${esc(p.title)}</b></td><td>${esc(p.owner||'—')}</td><td>${esc(p.reviewCadence||'')}</td><td>${esc(fmtDate(p.lastReview)||'—')}</td><td><button class="link" data-action="edit-policy" data-id="${esc(p.id)}">Edit</button></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Review calendar</h2><p>Approved policies in order of their next-review date. Overdue first, then upcoming.</p></div></div>
  <div class="grid four" style="margin-bottom:16px">${card('Approved & live',live.length,'Currently in force')}${card('Overdue',overdue.length,'Past review date',overdue.length>0)}${card('Due within 60 days',soon.length,'Upcoming attention',soon.length>0)}${card('No review date',db.policies.filter(p=>p.status==='Approved'&&!p.nextReview).length,'Set a next-review date',true)}</div>
  ${table(['Next review','Policy','Owner','Cadence','Last reviewed',''],rows,'No approved policies with review dates yet.')}`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Policies — the full register with every field</li><li>Meta — organisation / year</li><li>_schema — field list for round-trip import</li></ul></section>`}

function policyModal(p){
 const isNew=!p;p=p||blankPolicy();
 const owners=roleOptions();
 const ownerField=owners.length?`<label class="field"><span class="label">Policy owner (role) ${tip('Who owns this policy — the role in your Organisation Structure.')}</span><input list="org-roles" name="owner" value="${esc(p.owner)}" placeholder="e.g. Head of HR"><datalist id="org-roles">${owners.map(o=>`<option value="${esc(o)}">`).join('')}</datalist></label>`:field('Policy owner','owner',p.owner);
 return modal(isNew?'Add policy':'Edit policy',`<form data-form="policy" data-id="${esc(p.id||'')}" class="form">
  ${field('Code','code',p.code||nextCode(),'text','required')}
  ${field('Title','title',p.title,'text','required')}
  ${select('Category','category',CATEGORIES,p.category)}
  ${field('Version','version',p.version||'1.0')}
  ${select('Status','status',STATUSES,p.status||'Draft')}
  ${ownerField}
  ${field('Approver','approver',p.approver,'text','','Role or body — e.g. Board, Director.')}
  ${field('Approved on','approvedOn',p.approvedOn,'date')}
  ${field('Effective from','effectiveFrom',p.effectiveFrom,'date')}
  ${select('Review cadence','reviewCadence',CADENCES,p.reviewCadence||'Annual')}
  ${field('Next review','nextReview',p.nextReview,'date')}
  ${field('Last reviewed','lastReview',p.lastReview,'date')}
  ${select('Acknowledgement scope','ackScope',ACK_SCOPE,p.ackScope||'All staff')}
  ${field('Specific roles (if any)','ackRoles',p.ackRoles,'text','','Comma-separated role codes or names.')}
  ${field('Document link','documentLink',p.documentLink,'url','','URL where the current approved version lives.')}
  ${area('Summary','summary',p.summary,'One-paragraph summary for induction.')}
  ${area('Changes since last version','changesSinceLast',p.changesSinceLast)}
  ${area('Notes','notes',p.notes)}
  ${formEnd('Save policy',{deleteId:isNew?'':p.id,deleteLabel:'Delete policy'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-policy'){dlg=policyModal();render();return}
 if(a==='edit-policy'){const p=db.policies.find(x=>x.id===id);if(p){dlg=policyModal(p);render()}return}
 if(a==='delete'){const p=db.policies.find(x=>x.id===id);if(!p||!confirm('Delete this policy?'))return;db.policies=db.policies.filter(x=>x.id!==id);dlg='';save('Policy deleted.');return}
 if(a==='xlsx'){try{download('Mission-and-Method-policies.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){download('Mission-and-Method-policies.csv',csv([['Code','Title','Category','Version','Status','Owner','Approved','Next review'],...db.policies.map(p=>[p.code,p.title,p.category,p.version,p.status,p.owner,p.approvedOn,p.nextReview])]),'text/csv;charset=utf-8');return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-policies.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-policies-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 if(form.dataset.form!=='policy')return;
 const existing=db.policies.find(p=>p.id===form.dataset.id);
 const p=existing||{...blankPolicy()};
 const d=formData(form);
 Object.assign(p,{code:s(d.code)||p.code||nextCode(),title:s(d.title),category:d.category,version:s(d.version),status:d.status||'Draft',owner:s(d.owner),approver:s(d.approver),approvedOn:d.approvedOn||'',effectiveFrom:d.effectiveFrom||'',reviewCadence:d.reviewCadence||'Annual',nextReview:d.nextReview||'',lastReview:d.lastReview||'',ackScope:d.ackScope,ackRoles:s(d.ackRoles),documentLink:s(d.documentLink),summary:s(d.summary),changesSinceLast:s(d.changesSinceLast),notes:s(d.notes)});
 stamp(p);
 if(!existing)db.policies.push(p);
 dlg='';save('Policy saved.');
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Policy Management',['Compliance-grade policy register.','Overdue reviews are flagged in the tool but not in this file — check the Next review column.']),
  metaSheet(db.meta),
  {name:'Policies',rows:[['Code','Title','Category','Version','Status','Owner','Approver','Approved on','Effective from','Review cadence','Next review','Last reviewed','Ack scope','Ack roles','Document link','Summary','Changes since last','Notes'],...(withData?db.policies.map(p=>[p.code,p.title,p.category,p.version,p.status,p.owner,p.approver,p.approvedOn,p.effectiveFrom,p.reviewCadence,p.nextReview,p.lastReview,p.ackScope,p.ackRoles,p.documentLink,p.summary,p.changesSinceLast,p.notes]):[])]},
  schemaSheet({Policies:'code,title,category,version,status,owner,approver,approvedOn,effectiveFrom,reviewCadence,nextReview,lastReview,ackScope,ackRoles,documentLink,summary,changesSinceLast,notes'})
 ];
 return buildXlsx(sheets);
}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const rows=rowsToObjects(findSheet(data,'Policies'));if(rows?.length)db.policies=rows.map(r=>({...blankPolicy(),code:r.Code||'',title:r.Title||'',category:r.Category||'Other',version:r.Version||'1.0',status:r.Status||'Draft',owner:r.Owner||'',approver:r.Approver||'',approvedOn:r['Approved on']||'',effectiveFrom:r['Effective from']||'',reviewCadence:r['Review cadence']||'Annual',nextReview:r['Next review']||'',lastReview:r['Last reviewed']||'',ackScope:r['Ack scope']||'All staff',ackRoles:r['Ack roles']||'',documentLink:r['Document link']||'',summary:r.Summary||'',changesSinceLast:r['Changes since last']||'',notes:r.Notes||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Register':registerView,'Review calendar':reviewCalendarView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Compliance · Policy management',title:'Policy Management',intro:'Compliance-grade policy register with ownership, approval trail, review cadence and acknowledgement scope. The acknowledgement scope feeds the Onboarding tool so every new hire sees the right policies.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=10&lesson=lifecycle',label:'Review Module 10'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
