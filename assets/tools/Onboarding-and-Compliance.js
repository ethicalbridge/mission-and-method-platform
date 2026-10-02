/* Onboarding & Staff Compliance — new-hire checklist with compliance items.
   Each new hire has a checklist of steps (admin, equipment, training, policy
   acknowledgement, buddy intro, etc.) with owner + due + status. Policies to
   acknowledge are pulled from the Policy Management tool.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-onboarding-v2';
const ORG_KEY='mission-method-org-structure-v2',POLICY_KEY='mission-method-policy-v2';
const TABS=['Start','New hires','Templates','Export'];
const STAGES=['Pre-start','Week 1','Month 1','Probation','Ongoing','Complete'];
const STEP_STATUS=['Not started','In progress','Done','N/A','Blocked'];
const STEP_CATEGORIES=['Admin / contracts','Right-to-work / safeguarding','Equipment & accounts','Policy acknowledgement','Training','Buddy & intros','Performance setup','Benefits & payroll','Other'];

const blankHire=()=>({id:uid(),code:'',name:'',roleCode:'',roleTitle:'',department:'',startDate:'',manager:'',buddy:'',status:'Pre-start',steps:[],notes:'',lastEditedBy:'',lastEditedAt:''});
const blankStep=()=>({id:uid(),title:'',category:'Admin / contracts',owner:'',due:'',status:'Not started',notes:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',defaultTemplate:'standard',notes:''});
const blank=()=>({version:2,meta:blankMeta(),hires:[],templates:defaultTemplates()});

function defaultTemplates(){
 return [{
  id:'standard',name:'Standard new-hire template',description:'Baseline 24-step onboarding plan for any role.',
  steps:[
   ['Signed offer letter','Admin / contracts','HR','Pre-start'],
   ['Right-to-work check completed','Right-to-work / safeguarding','HR','Pre-start'],
   ['Reference checks returned','Right-to-work / safeguarding','HR','Pre-start'],
   ['Safeguarding check / DBS completed','Right-to-work / safeguarding','HR','Pre-start'],
   ['Employment contract signed','Admin / contracts','HR','Pre-start'],
   ['Payroll setup','Benefits & payroll','Finance','Pre-start'],
   ['Email account + logins created','Equipment & accounts','IT','Pre-start'],
   ['Laptop + equipment allocated','Equipment & accounts','IT','Week 1'],
   ['Welcome message to team','Buddy & intros','Manager','Week 1'],
   ['Day 1 induction meeting','Buddy & intros','Manager','Week 1'],
   ['Buddy assigned','Buddy & intros','Manager','Week 1'],
   ['Code of conduct acknowledged','Policy acknowledgement','HR','Week 1'],
   ['Safeguarding policy acknowledged','Policy acknowledgement','HR','Week 1'],
   ['Data protection training completed','Training','HR','Week 1'],
   ['Health & safety induction','Training','Operations','Week 1'],
   ['Introductions across departments','Buddy & intros','Manager','Month 1'],
   ['First objectives set with manager','Performance setup','Manager','Month 1'],
   ['Development plan drafted','Performance setup','Manager','Month 1'],
   ['Benefits enrolment confirmed','Benefits & payroll','HR','Month 1'],
   ['All mandatory policies acknowledged','Policy acknowledgement','HR','Month 1'],
   ['Role-specific training completed','Training','Manager','Probation'],
   ['Mid-probation review','Performance setup','Manager','Probation'],
   ['End-of-probation review and confirmation','Performance setup','Manager','Probation'],
   ['Transition to ongoing check-in cadence','Performance setup','Manager','Ongoing']
  ]
 }];
}

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.onboarding-cleanup-v2',blank)||d;if(!Array.isArray(d.hires))d.hires=[];if(!Array.isArray(d.templates)||!d.templates.length)d.templates=defaultTemplates();return d}});
let db=storage.load(),tab='Start',dlg='',message='',editing={id:null,buffer:null};
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const roleList=()=>(readStore(ORG_KEY)?.roles||[]).filter(r=>r.title);
const policyList=()=>(readStore(POLICY_KEY)?.policies||[]).filter(p=>p.status==='Approved'&&(p.ackScope==='All staff'||p.ackScope==='All staff + board'||p.ackScope==='Specific roles'));
const nextCode=()=>{const nums=db.hires.map(h=>Number(String(h.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'H'+(Math.max(0,...nums)+1)};
const stepsFromTemplate=(tplId)=>{const t=db.templates.find(x=>x.id===tplId)||db.templates[0];return (t.steps||[]).map(([title,cat,owner,stage])=>({...blankStep(),title,category:cat,owner,notes:'Due by: '+stage}))};
const stepsPolicyAck=()=>policyList().map(p=>({...blankStep(),title:`Acknowledge policy: ${p.title}`,category:'Policy acknowledgement',owner:'HR',notes:`${p.code} · v${p.version}`}));
const isOverdue=d=>d&&d<today();
const progress=h=>{if(!h.steps.length)return 0;const done=h.steps.filter(s=>s.status==='Done').length;const applicable=h.steps.filter(s=>s.status!=='N/A').length;return applicable?Math.round(100*done/applicable):0};

function startView(){
 const m=db.meta;
 const totalHires=db.hires.length;
 const inProgress=db.hires.filter(h=>h.status!=='Complete').length;
 const overdueSteps=db.hires.flatMap(h=>h.steps.filter(st=>st.status!=='Done'&&st.status!=='N/A'&&isOverdue(st.due))).length;
 const policies=policyList().length;
 return `${window.MMExample?.renderIntegration?.('onboarding')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Standardised onboarding and compliance for every new hire. Each hire gets a checklist from the template library plus any policy acknowledgements pulled live from Policy Management.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Hires on file',totalHires,'All time')}
    ${card('Still onboarding',inProgress,'Pre-start through probation')}
    ${card('Steps overdue',overdueSteps,'Across all open hires',overdueSteps>0)}
    ${card('Policies to acknowledge',policies,'Approved + all-staff scope')}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">The <b>Standard template</b> has 24 steps covering admin, right-to-work, equipment, policies, training and performance setup. Policy acknowledgements for approved all-staff policies are auto-added to every new hire.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-hire">+ Add a new hire</button>
    <a class="button secondary" href="#" data-tab="New hires">Go to new hires →</a>
    <a class="button secondary" href="#" data-tab="Templates">Templates →</a>
   </div>
  </section>`;
}

function hiresView(){
 const sorted=[...db.hires].sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||''));
 const rows=sorted.map(h=>{
  const pct=progress(h);
  const overdueSteps=h.steps.filter(st=>st.status!=='Done'&&st.status!=='N/A'&&isOverdue(st.due)).length;
  return `<tr><td><b>${esc(h.code)}</b></td><td><b>${esc(h.name||'Untitled')}</b>${h.roleTitle?`<br><small>${esc(h.roleTitle)}</small>`:''}</td><td>${esc(h.department||'—')}</td><td>${esc(fmtDate(h.startDate)||'—')}</td><td>${esc(h.manager||'—')}</td><td>${pill(h.status)}</td><td><b>${pct}%</b>${bar(pct)}${overdueSteps?`<br><small class="pill bad" style="font-size:9px">${overdueSteps} overdue</small>`:''}</td><td><div class="row-actions"><button class="link" data-action="edit-hire" data-id="${esc(h.id)}">Open</button></div></td></tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>New hires</h2><p>Open any hire to see and tick off their checklist. Progress is calculated as done ÷ applicable (N/A steps don't count).</p></div><button class="button" data-action="new-hire">+ Add a new hire</button></div>
  ${table(['Code','Name / role','Department','Start date','Manager','Status','Progress',''],rows,'No hires yet.')}`;
}

function templatesView(){
 const rows=db.templates.map(t=>`<tr><td><b>${esc(t.name)}</b></td><td>${esc(t.description||'')}</td><td>${t.steps.length} steps</td><td>${t.id==='standard'?'<span class="pill dim">built-in</span>':''}</td></tr>`);
 const stdRows=db.templates[0].steps.map(([title,cat,owner,stage])=>`<tr><td>${esc(title)}</td><td>${pill(cat)}</td><td>${esc(owner)}</td><td>${pill(stage)}</td></tr>`);
 return `<div class="rowhead section-head"><div><h2>Onboarding templates</h2><p>The baseline template is applied to every new hire. Policy acknowledgements are added automatically from Policy Management.</p></div></div>
  <section class="panel">${table(['Template','Description','Steps',''],rows,'')}</section>
  <section class="panel"><h3>Standard template detail</h3>${table(['Step','Category','Default owner','Default stage'],stdRows,'')}</section>`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Hires — one row per hire with their checklist flattened</li><li>Meta — organisation / year</li><li>_schema — field list for round-trip import</li></ul></section>`}

function hireModal(h){
 const isNew=!h;h=h||blankHire();
 const roles=roleList();
 const rolesOpts=roles.map(r=>[r.code,`${r.code} · ${r.title}`]);
 const stepRow=(st,i)=>`<div class="mad-row" data-row-kind="step" data-row-id="${esc(st.id)}">
   <label class="mad-f mad-f-wide"><span>Step</span><textarea data-field="title" data-rid="${esc(st.id)}">${esc(st.title)}</textarea></label>
   <label class="mad-f"><span>Category</span><select data-field="category" data-rid="${esc(st.id)}">${STEP_CATEGORIES.map(c=>`<option ${st.category===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>
   <label class="mad-f"><span>Owner</span><input data-field="owner" data-rid="${esc(st.id)}" value="${esc(st.owner)}"></label>
   <label class="mad-f mad-f-narrow"><span>Due</span><input type="date" data-field="due" data-rid="${esc(st.id)}" value="${esc(st.due)}"></label>
   <label class="mad-f mad-f-narrow"><span>Status</span><select data-field="status" data-rid="${esc(st.id)}">${STEP_STATUS.map(s=>`<option ${st.status===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
   <button type="button" class="link danger" data-action="remove-step" data-id="${esc(st.id)}">Remove</button>
  </div>`;
 return modal(isNew?'Add new hire':'Edit hire',`<form data-form="hire" data-id="${esc(h.id||'')}" class="form">
  <div class="form-grid-top">
   ${field('Code','code',h.code||nextCode(),'text','required')}
   ${field('Name','name',h.name,'text','required')}
   ${field('Start date','startDate',h.startDate,'date')}
  </div>
  ${rolesOpts.length?select('Role (from Organisation Structure)','roleCode',rolesOpts,h.roleCode,'Links to a role in the role library.','No role selected'):field('Role title','roleTitle',h.roleTitle)}
  <div class="form-grid-top">
   ${field('Department','department',h.department)}
   ${field('Manager','manager',h.manager)}
   ${field('Buddy','buddy',h.buddy)}
  </div>
  ${select('Status','status',STAGES,h.status||'Pre-start')}
  ${isNew?'<p class="tiny" style="grid-column:1/-1;margin:4px 0">On save, this hire will be loaded with the Standard template steps plus any approved all-staff policy acknowledgements from Policy Management.</p>':''}
  ${isNew?'':`<h3 class="form-section">Checklist · ${h.steps.length} steps · ${progress(h)}% complete</h3>
  <div class="mad-rows" id="ob-steps">${h.steps.map(stepRow).join('')||'<p class="muted" style="grid-column:1/-1">No steps.</p>'}</div>
  <div style="grid-column:1/-1"><button type="button" class="button small secondary" data-action="add-step">+ Add step</button> <button type="button" class="button small secondary" data-action="refresh-policies">↻ Refresh policy acknowledgements</button></div>`}
  ${area('Notes','notes',h.notes)}
  ${formEnd('Save hire',{deleteId:isNew?'':h.id,deleteLabel:'Delete hire'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';editing={id:null,buffer:null};render();return}
 if(a==='new-hire'){const h={...blankHire(),code:nextCode()};editing={id:null,buffer:h};dlg=hireModal(h);render();return}
 if(a==='edit-hire'){const h=db.hires.find(x=>x.id===id);if(h){editing={id:h.id,buffer:JSON.parse(JSON.stringify(h))};dlg=hireModal(editing.buffer);render()}return}
 if(a==='add-step'||a==='remove-step'||a==='refresh-policies'){
  syncBuffer(root);
  if(a==='add-step')editing.buffer.steps.push(blankStep());
  if(a==='remove-step'){if(!confirm('Remove this step?'))return;editing.buffer.steps=editing.buffer.steps.filter(st=>st.id!==id)}
  if(a==='refresh-policies'){const existing=new Set(editing.buffer.steps.map(st=>st.title));stepsPolicyAck().forEach(st=>{if(!existing.has(st.title))editing.buffer.steps.push(st)});message='Policy acknowledgements refreshed from Policy Management.'}
  dlg=hireModal(editing.buffer);render();return;
 }
 if(a==='delete'){const h=db.hires.find(x=>x.id===id);if(!h||!confirm('Delete this hire record and their checklist?'))return;db.hires=db.hires.filter(x=>x.id!==id);dlg='';editing={id:null,buffer:null};save('Hire deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-onboarding.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-onboarding.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-onboarding-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function syncBuffer(root){
 if(!editing.buffer)return;
 const form=root.querySelector('form[data-form="hire"]');if(!form)return;
 const d=formData(form);
 Object.assign(editing.buffer,{code:s(d.code),name:s(d.name),roleCode:s(d.roleCode),roleTitle:s(d.roleTitle),department:s(d.department),startDate:d.startDate||'',manager:s(d.manager),buddy:s(d.buddy),status:d.status||'Pre-start',notes:s(d.notes)});
 if(editing.buffer.roleCode){const r=roleList().find(x=>x.code===editing.buffer.roleCode);if(r){editing.buffer.roleTitle=r.title;if(!editing.buffer.department)editing.buffer.department=r.department||''}}
 root.querySelectorAll('#ob-steps .mad-row').forEach(row=>{const rid=row.dataset.rowId;const st=editing.buffer.steps.find(x=>x.id===rid);if(!st)return;row.querySelectorAll('[data-field]').forEach(el=>{st[el.dataset.field]=el.value})});
}

function submit(form){
 if(form.dataset.form!=='hire')return;
 syncBuffer(root);
 const buf=editing.buffer;
 const existing=db.hires.find(h=>h.id===buf.id);
 if(!existing&&!buf.steps.length){buf.steps=[...stepsFromTemplate('standard'),...stepsPolicyAck()]}
 stamp(buf);
 if(existing)Object.assign(existing,buf);else db.hires.push(buf);
 editing={id:null,buffer:null};dlg='';save('Hire saved.');
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Onboarding & Staff Compliance',['Standardised onboarding plus policy-acknowledgement tracking.']),
  metaSheet(db.meta),
  {name:'Hires',rows:[['Code','Name','Role','Department','Start','Manager','Buddy','Status','Progress %','Notes'],...(withData?db.hires.map(h=>[h.code,h.name,h.roleTitle,h.department,h.startDate,h.manager,h.buddy,h.status,progress(h),h.notes]):[])]},
  {name:'Steps',rows:[['Hire code','Step','Category','Owner','Due','Status','Notes'],...(withData?db.hires.flatMap(h=>h.steps.map(st=>[h.code,st.title,st.category,st.owner,st.due,st.status,st.notes])):[])]},
  schemaSheet({Hires:'code,name,roleTitle,department,startDate,manager,buddy,status,notes',Steps:'hireCode,title,category,owner,due,status,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){const rows=[['Hire','Name','Step','Category','Owner','Due','Status'],...db.hires.flatMap(h=>h.steps.map(st=>[h.code,h.name,st.title,st.category,st.owner,st.due,st.status]))];download('Method-into-Impact-onboarding.csv',csv(rows),'text/csv;charset=utf-8')}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const hRows=rowsToObjects(findSheet(data,'Hires'));const sRows=rowsToObjects(findSheet(data,'Steps'));if(hRows?.length){db.hires=hRows.map(r=>({...blankHire(),code:r.Code||'',name:r.Name||'',roleTitle:r.Role||'',department:r.Department||'',startDate:r.Start||'',manager:r.Manager||'',buddy:r.Buddy||'',status:r.Status||'Pre-start',notes:r.Notes||''}));const byCode=new Map(db.hires.map(h=>[h.code,h]));(sRows||[]).forEach(r=>{const h=byCode.get(r['Hire code']);if(!h)return;h.steps.push({...blankStep(),title:r.Step||'',category:r.Category||'Other',owner:r.Owner||'',due:r.Due||'',status:r.Status||'Not started',notes:r.Notes||''})})}save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'New hires':hiresView,'Templates':templatesView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'People · Onboarding & staff compliance',title:'Onboarding & Staff Compliance',intro:'Standardised onboarding steps, right-to-work checks, policy acknowledgements and probation reviews for every new hire. Policies to acknowledge are pulled live from Policy Management.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=4&lesson=onboarding',label:'Review Module 4'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';editing={id:null,buffer:null};render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
