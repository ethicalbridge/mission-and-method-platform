/* Organisation Structure — foundation tool.
   Role library + reporting hierarchy + a scanner that reads owner names from
   every other tool in the suite and summarises who is listed where. Helps
   leadership see delivery capacity (and overload) at the role level.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-org-structure-v2',LEGACY='mission-method-org-structure-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2',RISK_KEY='mission-method-issue-risk-v2',MTG_KEY='mission-method-meetings-v2';
const TABS=['Start','Roles','Hierarchy','Who-owns-what','Export'];
const DEPARTMENTS=['Leadership','Programmes','MEAL','Operations','Finance','Fundraising','Communications','HR','Governance','Other'];

const blankRole=()=>({id:uid(),code:'',title:'',department:'Programmes',reportsTo:'',holder:'',email:'',fte:1,responsibilities:'',start:'',end:'',status:'Active',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),roles:[]});

function migrateV1(v1){
 const out=blank();
 try{
  if(v1?.name)out.meta.organisation=v1.name;
  (v1?.roles||[]).forEach((r,i)=>{
   out.roles.push({...blankRole(),code:r.code||'R'+(i+1),title:r.title||r.name||'',department:DEPARTMENTS.includes(r.department)?r.department:(r.category||'Other'),reportsTo:'',holder:r.holder||r.person||'',email:r.email||'',fte:Number(r.fte)||1,responsibilities:r.responsibilities||r.description||'',status:'Active'});
  });
 }catch(e){console.warn('org migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.org-cleanup-v2',blank)||d;if(!Array.isArray(d.roles))d.roles=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const nextCode=()=>{const nums=db.roles.map(r=>Number(String(r.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'R'+(Math.max(0,...nums)+1)};

// ---------- Scan every other tool and collect owner-name references ----------
function scanOwnerships(){
 const refs=[]; // {name, source, item, href}
 const so=readStore(SO_KEY);(so?.objectives||[]).forEach(o=>{if(o.owner)refs.push({name:o.owner,source:'Strategic Objectives',item:`${o.code} · ${o.title}`,href:'Strategic-Objectives.html'});(o.actions||[]).forEach(a=>{if(a.owner)refs.push({name:a.owner,source:'Strategic Objectives (action)',item:a.action||'Action',href:'Strategic-Objectives.html'})})});
 const sk=readStore(SK_KEY);(sk?.kpis||[]).forEach(k=>{if(k.owner)refs.push({name:k.owner,source:'Strategy KPIs (KPI owner)',item:`${k.code} · ${k.name}`,href:'Strategy-KPIs-and-Annual-Planning.html'});if(k.dataOwner&&k.dataOwner!==k.owner)refs.push({name:k.dataOwner,source:'Strategy KPIs (data owner)',item:`${k.code} · ${k.name}`,href:'Strategy-KPIs-and-Annual-Planning.html'})});(sk?.initiatives||[]).forEach(i=>{if(i.owner)refs.push({name:i.owner,source:'Strategy KPIs (initiative)',item:`${i.code} · ${i.title}`,href:'Strategy-KPIs-and-Annual-Planning.html'})});
 const meal=readStore(MEAL_KEY);(meal?.indicators||[]).forEach(i=>{if(i.manager)refs.push({name:i.manager,source:'MEAL (data manager)',item:`${i.code} · ${i.name||'untitled'}`,href:'MEAL-Strategy.html'})});(meal?.reviews||[]).forEach(r=>{if(r.owner)refs.push({name:r.owner,source:'MEAL (review action)',item:r.action||'Review action',href:'MEAL-Strategy.html'})});
 const gantt=readStore(GANTT_KEY);(gantt?.tasks||[]).forEach(t=>{if(t.owner)refs.push({name:t.owner,source:'Gantt (task owner)',item:`${t.code||'·'} · ${t.title}`,href:'Gantt-Project-Planner.html'})});
 const risks=readStore(RISK_KEY);(risks?.risks||[]).forEach(r=>{if(r.mitigationOwner)refs.push({name:r.mitigationOwner,source:'Risks (mitigation owner)',item:`${r.code} · ${r.title}`,href:'Issue-and-Risk-Management.html'});if(r.approvedBy&&r.approvedBy!==r.mitigationOwner)refs.push({name:r.approvedBy,source:'Risks (approver)',item:`${r.code} · ${r.title}`,href:'Issue-and-Risk-Management.html'})});(risks?.issues||[]).forEach(i=>{if(i.owner)refs.push({name:i.owner,source:'Issues (owner)',item:`${i.code} · ${i.title}`,href:'Issue-and-Risk-Management.html'})});
 const toc=readStore(TOC_KEY);(toc?.indicators||[]).forEach(i=>{if(i.owner)refs.push({name:i.owner,source:'Theory of Change (indicator owner)',item:i.name||'Indicator',href:'Theory-of-Change-Builder.html'})});
 const mtg=readStore(MTG_KEY);(mtg?.meetings||[]).forEach(m=>{(m.actions||[]).forEach(a=>{if(a.owner)refs.push({name:a.owner,source:'Meetings (action)',item:`${m.code} · ${a.text||'action'}`,href:'Meetings-Actions-and-Decisions.html'})})});
 return refs;
}

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const refs=scanOwnerships();
 const uniqueOwners=new Set(refs.map(r=>r.name).filter(Boolean));
 const matched=[...uniqueOwners].filter(n=>db.roles.some(r=>(r.holder||'').toLowerCase().trim()===n.toLowerCase().trim())).length;
 const unmatched=uniqueOwners.size-matched;
 return `${window.MMExample?.renderIntegration?.('org-structure')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Who holds which role, who reports to whom, and who is listed where across every other tool. Edit roles inline; use the Hierarchy tab to see reporting lines; use Who-owns-what to spot overload.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Context — governance structure, matrix reporting, acting-up arrangements.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Roles',db.roles.length,'In the library')}
    ${card('Active',db.roles.filter(r=>r.status==='Active').length,'Currently filled or vacant')}
    ${card('Owners across suite',uniqueOwners.size,'Distinct names used as owners')}
    ${card('Unmatched owners',unmatched,'Names not in the role library',unmatched>0)}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">The <b>Who-owns-what</b> tab reads owner names from every other tool and groups them. If someone appears there but isn't in your role library yet, their name shows as "Unmatched" — add their role to see their full workload.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-role">+ Add a role</button>
    <a class="button secondary" href="#" data-tab="Roles">Go to role library →</a>
    <a class="button secondary" href="#" data-tab="Hierarchy">See reporting hierarchy →</a>
    <a class="button secondary" href="#" data-tab="Who-owns-what">Who-owns-what scan →</a>
   </div>
  </section>`;
}

function rolesView(){
 const sorted=[...db.roles].sort((a,b)=>(a.department||'').localeCompare(b.department||'')||(a.title||'').localeCompare(b.title||''));
 const rows=sorted.map(r=>`<tr>
   <td><b>${esc(r.code)}</b></td>
   <td><b>${esc(r.title||'Untitled role')}</b>${r.responsibilities?`<br><small>${esc(r.responsibilities).slice(0,110)}${r.responsibilities.length>110?'…':''}</small>`:''}</td>
   <td>${pill(r.department||'Other')}</td>
   <td>${esc(r.holder||'Vacant')}${r.email?`<br><small>${esc(r.email)}</small>`:''}</td>
   <td>${esc(r.fte||'')}</td>
   <td>${r.reportsTo?esc(reportsToTitle(r.reportsTo)):'<span class="muted">—</span>'}</td>
   <td>${pill(r.status||'Active')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-role" data-id="${esc(r.id)}">Edit</button></div></td>
  </tr>`);
 return `<div class="rowhead section-head"><div><h2>Role library</h2><p>Every role in your organisation. Vacancies are tracked by leaving the holder blank; a role with no holder flags as "Vacant" in the overview. The <b>Reports to</b> column drives the Hierarchy view.</p></div><button class="button" data-action="new-role">+ Add a role</button></div>
  ${table(['Code','Role title','Department','Holder','FTE','Reports to','Status',''],rows,'No roles yet. Add your first role to start building the library.')}`;
}
function reportsToTitle(code){const r=db.roles.find(x=>x.code===code);return r?`${r.code} · ${r.title}`:code}

function hierarchyView(){
 const roots=db.roles.filter(r=>!r.reportsTo||!db.roles.some(x=>x.code===r.reportsTo));
 const kids=parent=>db.roles.filter(r=>r.reportsTo===parent.code);
 const node=r=>`<li class="org-node"><div class="org-card"><span class="org-code">${esc(r.code)}</span><b>${esc(r.title||'Untitled')}</b><span class="org-dept">${esc(r.department||'')}</span><span class="org-holder">${r.holder?esc(r.holder):'<i class="muted">Vacant</i>'}</span></div>${kids(r).length?`<ul>${kids(r).map(node).join('')}</ul>`:''}</li>`;
 return `<div class="rowhead section-head"><div><h2>Reporting hierarchy</h2><p>Built from the <b>Reports to</b> column of the role library. Vacant roles are shown in italics. Multiple top-level roots mean several roles report to nobody above them in this list (that's fine for a board or a founder role).</p></div></div>
  <section class="panel">${roots.length?`<ul class="org-tree">${roots.map(node).join('')}</ul>`:'<p class="muted">Add roles with a "Reports to" value to build the hierarchy.</p>'}</section>`;
}

function whoOwnsWhatView(){
 const refs=scanOwnerships();
 if(!refs.length)return `<div class="rowhead section-head"><div><h2>Who-owns-what</h2><p>Reads owner names from every other tool in the suite and groups them. Open any other tool and set owners there — they will appear here.</p></div></div><p class="example-empty">No owner names found yet across the other tools.</p>`;
 const byName=new Map();refs.forEach(r=>{if(!r.name)return;if(!byName.has(r.name))byName.set(r.name,[]);byName.get(r.name).push(r)});
 const sorted=[...byName.entries()].sort((a,b)=>b[1].length-a[1].length);
 const roleMatch=name=>db.roles.find(r=>(r.holder||'').toLowerCase().trim()===name.toLowerCase().trim());
 const blocks=sorted.map(([name,items])=>{
  const matched=roleMatch(name);
  const bySource={};items.forEach(it=>{(bySource[it.source]=bySource[it.source]||[]).push(it)});
  return `<section class="panel ownership-card">
   <div class="rowhead"><div><h3 style="margin:0">${esc(name)}</h3>${matched?`<p class="tiny" style="margin:2px 0 0">Role: <b>${esc(matched.code)} · ${esc(matched.title)}</b> · ${esc(matched.department||'')}${matched.fte?` · ${matched.fte} FTE`:''}</p>`:`<p class="tiny" style="margin:2px 0 0"><span class="pill bad" style="font-size:9px">Unmatched</span> Not found in the role library — <button class="link" data-action="new-role-from-name" data-name="${esc(name)}">add as a role</button></p>`}</div><span class="pill">${items.length} assignment${items.length===1?'':'s'}</span></div>
   <div class="ownership-grid">${Object.entries(bySource).map(([src,arr])=>`<div class="ownership-src"><b>${esc(src)}</b> <span class="pill dim">${arr.length}</span><ul>${arr.slice(0,8).map(it=>`<li><a href="${esc(it.href)}" class="link">${esc(it.item)}</a></li>`).join('')}${arr.length>8?`<li class="muted">+${arr.length-8} more</li>`:''}</ul></div>`).join('')}</div>
  </section>`;
 });
 return `<div class="rowhead section-head"><div><h2>Who-owns-what</h2><p>Live scan of owner names across every tool in the suite — Strategic Objectives, ToC indicators, Strategy KPIs and initiatives, MEAL data managers, Gantt tasks, Risk mitigations, Issues, Meeting actions. People with the most assignments are at the top. "Unmatched" means the name isn't in your role library yet.</p></div></div>
  ${blocks.join('')}`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, year, prepared by</li><li>Roles — code, title, department, holder, FTE, reports-to, responsibilities, status</li><li>Owner-scan — a snapshot of every owner reference found across the suite at export time</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Role modal ----------
function roleModal(r,prefill){
 const isNew=!r;r=r||blankRole();
 if(prefill)r={...r,holder:prefill};
 const options=db.roles.filter(x=>x.id!==r.id).map(x=>[x.code,`${x.code} · ${x.title||'Untitled'}`]);
 return modal(isNew?'Add role':'Edit role',`<form data-form="role" data-id="${esc(r.id||'')}" class="form">
  ${field('Code','code',r.code||nextCode(),'text','required')}
  ${field('Role title','title',r.title,'text','required')}
  ${select('Department','department',DEPARTMENTS,r.department||'Programmes')}
  ${options.length?select('Reports to','reportsTo',options,r.reportsTo,'Which role this one reports to.','No manager above'):field('Reports to (code)','reportsTo',r.reportsTo,'text','','Enter the code of the role this one reports to, if any.')}
  ${field('Holder (person name)','holder',r.holder,'text','','Leave blank for a vacant role.')}
  ${field('Email','email',r.email,'email')}
  ${field('FTE','fte',r.fte,'number','step="0.1" min="0" max="5"','Full-time equivalent — 1 = full-time, 0.5 = half-time, etc.')}
  ${area('Responsibilities','responsibilities',r.responsibilities)}
  ${field('Start date','start',r.start,'date')}
  ${field('End date','end',r.end,'date','','Leave blank if ongoing.')}
  ${select('Status','status',['Active','Vacant','On leave','Ended'],r.status||'Active')}
  ${area('Notes','notes',r.notes)}
  ${formEnd('Save role',{deleteId:isNew?'':r.id,deleteLabel:'Delete role'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-role'){dlg=roleModal();render();return}
 if(a==='edit-role'){const r=db.roles.find(x=>x.id===id);if(r){dlg=roleModal(r);render()}return}
 if(a==='new-role-from-name'){const name=el.dataset.name;dlg=roleModal(null,name);render();return}
 if(a==='delete'){const r=db.roles.find(x=>x.id===id);if(!r)return;if(!confirm('Delete this role? Cannot be undone.'))return;db.roles=db.roles.filter(x=>x.id!==id);dlg='';save('Role deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-organisation-structure.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-organisation-structure.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-organisation-structure-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 if(form.dataset.form!=='role')return;
 const existing=db.roles.find(r=>r.id===form.dataset.id);
 const r=existing||{...blankRole()};
 const d=formData(form);
 Object.assign(r,{code:s(d.code)||r.code||nextCode(),title:s(d.title),department:d.department,reportsTo:s(d.reportsTo),holder:s(d.holder),email:s(d.email),fte:Number(d.fte)||0,responsibilities:s(d.responsibilities),start:d.start||'',end:d.end||'',status:d.status||'Active',notes:s(d.notes)});
 stamp(r);
 if(!existing)db.roles.push(r);
 dlg='';save('Role saved.');
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Organisation Structure',[
   'Role library and reporting hierarchy.',
   'The Owner-scan sheet is a snapshot — it reads owner names from every other suite tool at export time.',
   'Import this workbook back to the tool to restore the roles by code.'
  ]),
  metaSheet(db.meta),
  {name:'Roles',rows:[
   ['Code','Title','Department','Reports to','Holder','Email','FTE','Responsibilities','Start','End','Status','Notes'],
   ...(withData?db.roles.map(r=>[r.code,r.title,r.department,r.reportsTo,r.holder,r.email,r.fte,r.responsibilities,r.start,r.end,r.status,r.notes]):[])
  ]},
  ...(withData?[{name:'Owner-scan',rows:[['Name','Source','Item','Href'],...scanOwnerships().map(r=>[r.name,r.source,r.item,r.href])]}]:[]),
  schemaSheet({Roles:'code,title,department,reportsTo,holder,email,fte,responsibilities,start,end,status,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 download('Method-into-Impact-organisation-structure.csv',csv([['Code','Title','Department','Holder','FTE','Reports to','Status'],...db.roles.map(r=>[r.code,r.title,r.department,r.holder,r.fte,r.reportsTo,r.status])]),'text/csv;charset=utf-8');
}
async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const rows=rowsToObjects(findSheet(data,'Roles'));
  if(rows?.length)db.roles=rows.map(r=>({...blankRole(),code:r.Code||'',title:r.Title||'',department:r.Department||'Other',reportsTo:r['Reports to']||'',holder:r.Holder||'',email:r.Email||'',fte:Number(r.FTE)||0,responsibilities:r.Responsibilities||'',start:r.Start||'',end:r.End||'',status:r.Status||'Active',notes:r.Notes||''}));
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){
 try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}
}

function wireStart(root){
 const box=root.querySelector('.work-box');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};
 box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})});
}

function render(){
 const views={'Start':startView,'Roles':rolesView,'Hierarchy':hierarchyView,'Who-owns-what':whoOwnsWhatView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Foundation · Organisation structure',title:'Organisation Structure',intro:'Who holds which role, who reports to whom, and who is listed as owner across every other tool in the suite. Spot overload early.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=3&lesson=structure',label:'Review Module 3'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
