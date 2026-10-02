/* Meetings, Actions & Decisions — cross-cutting facilitation tool.
   Each meeting record holds: agenda, decisions (go into a rolling register),
   and actions (also go into a rolling register, each one optionally linked to
   an item from any other suite tool — objective, pathway, KPI, indicator,
   Gantt task, risk — or described in free text). Actions are READ by the
   Gantt tool as external links against each task; nothing auto-syncs, so no
   duplicate editing.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-meetings-v2',LEGACY='mission-method-meetings-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2',RISK_KEY='mission-method-issue-risk-v2';
const TABS=['Start','Meetings','Actions register','Decisions register','Export'];
const MTYPES=['Board','Leadership','Team','Project review','Partner','Workshop','Other'];
const ASTATUS=['Open','In progress','Done','Blocked','Cancelled'];
const DSTATUS=['Pending','Approved','Rescinded'];

const blankMeeting=()=>({id:uid(),code:'',title:'',date:today(),type:'Team',facilitator:'',attendees:'',apologies:'',location:'',agenda:'',notes:'',decisions:[],actions:[],createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankDecision=()=>({id:uid(),text:'',context:'',decidedBy:'',status:'Approved'});
const blankAction=()=>({id:uid(),text:'',owner:'',due:'',status:'Open',linkSource:'manual',linkRef:'',linkText:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),meetings:[]});

function migrateV1(v1){
 const out=blank();
 try{
  if(v1?.meta)Object.assign(out.meta,v1.meta);
  (v1?.meetings||[]).forEach((m,i)=>{
   const nm={...blankMeeting(),code:m.code||'M'+(i+1),title:m.title||'',date:m.date||today(),type:MTYPES.includes(m.type)?m.type:'Team',facilitator:m.facilitator||'',attendees:m.attendees||'',apologies:m.apologies||'',location:m.location||'',agenda:m.agenda||'',notes:m.notes||''};
   nm.decisions=(m.decisions||[]).map(d=>({...blankDecision(),text:d.text||d.decision||'',context:d.context||'',decidedBy:d.decidedBy||d.by||'',status:DSTATUS.includes(d.status)?d.status:'Approved'}));
   nm.actions=(m.actions||[]).map(a=>({...blankAction(),text:a.text||a.action||'',owner:a.owner||'',due:a.due||'',status:ASTATUS.includes(a.status)?a.status:'Open',linkText:a.linkText||a.linkedTo||''}));
   out.meetings.push(nm);
  });
 }catch(e){console.warn('meetings migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.meetings-cleanup-v2',blank)||d;if(!Array.isArray(d.meetings))d.meetings=[];d.meetings.forEach(m=>{if(!Array.isArray(m.decisions))m.decisions=[];if(!Array.isArray(m.actions))m.actions=[]});return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

// ---------- Cross-tool suite items (for linking actions / decisions) ----------
const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
function suiteItems(){
 const items=[];
 const so=readStore(SO_KEY);(so?.objectives||[]).forEach(o=>items.push({group:'Strategic objectives',source:'so',ref:o.code,label:`${o.code} · ${o.title}`}));
 const toc=readStore(TOC_KEY);(toc?.pathways||[]).forEach(p=>items.push({group:'Theory of Change pathways',source:'toc',ref:p.id,label:p.objective||'Untitled pathway'}));
 const sk=readStore(SK_KEY);(sk?.kpis||[]).forEach(k=>items.push({group:'Strategy KPIs',source:'sk-kpi',ref:k.code,label:`${k.code} · ${k.name}`}));(sk?.initiatives||[]).forEach(i=>items.push({group:'Strategy KPIs initiatives',source:'sk-init',ref:i.code,label:`${i.code} · ${i.title}`}));
 const meal=readStore(MEAL_KEY);(meal?.indicators||[]).forEach(i=>items.push({group:'MEAL indicators',source:'meal',ref:i.code,label:`${i.code} · ${i.name||'untitled'}`}));
 const gantt=readStore(GANTT_KEY);(gantt?.tasks||[]).filter(t=>t.title).forEach(t=>items.push({group:'Gantt tasks',source:'gantt',ref:t.code,label:`${t.code||'·'} · ${t.title}`}));
 const risks=readStore(RISK_KEY);(risks?.risks||[]).forEach(r=>items.push({group:'Risks',source:'risk',ref:r.code,label:`${r.code} · ${r.title}`}));(risks?.issues||[]).forEach(i=>items.push({group:'Issues',source:'issue',ref:i.code,label:`${i.code} · ${i.title}`}));
 return items;
}
const toolHref=src=>({so:'Strategic-Objectives.html',toc:'Theory-of-Change-Builder.html','sk-kpi':'Strategy-KPIs-and-Annual-Planning.html','sk-init':'Strategy-KPIs-and-Annual-Planning.html',meal:'MEAL-Strategy.html',gantt:'Gantt-Project-Planner.html',risk:'Issue-and-Risk-Management.html',issue:'Issue-and-Risk-Management.html'}[src]||'#');

const nextCode=()=>{const nums=db.meetings.map(m=>Number(String(m.code||'').replace('M',''))).filter(n=>!isNaN(n));return 'M'+(Math.max(0,...nums)+1)};
const isOverdue=d=>d&&d<today();

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const totalMeetings=db.meetings.length;
 const openActions=db.meetings.flatMap(mt=>mt.actions.filter(a=>a.status!=='Done'&&a.status!=='Cancelled'));
 const overdueActions=openActions.filter(a=>isOverdue(a.due));
 const totalDecisions=db.meetings.flatMap(mt=>mt.decisions).length;
 const upcomingMeeting=[...db.meetings].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).find(mt=>mt.date>=today());
 return `${window.MMExample?.renderIntegration?.('meetings')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Run meetings that end with decisions and owned actions, not just notes. Decisions and actions roll up into their own registers so leadership can answer "what did we decide across the year?" and "what's overdue?" instantly.</p>
   <div class="work-meta">
    <label class="work-field"><span>Project / programme</span><input data-field="project" value="${esc(m.project)}" placeholder="e.g. 2026 leadership rhythm"></label>
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="How this meeting rhythm fits — governance, team ops, project reviews.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Meetings',totalMeetings,'Recorded in this browser')}
    ${card('Open actions',openActions.length,'Across all meetings',openActions.length>5)}
    ${card('Actions overdue',overdueActions.length,'Past their due date',overdueActions.length>0)}
    ${card('Decisions logged',totalDecisions,'In the register')}
   </div>
   ${upcomingMeeting?`<div class="notice"><b>Next meeting:</b> ${esc(upcomingMeeting.title||'Untitled')} on ${esc(fmtDate(upcomingMeeting.date))} · <button class="link" data-action="edit-meeting" data-id="${esc(upcomingMeeting.id)}">Open the record</button></div>`:''}
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Each meeting record carries: agenda, who was there, decisions taken, and actions assigned. Decisions and actions are also surfaced as rolling registers (see tabs above).</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-meeting">+ Add a meeting</button>
    <a class="button secondary" href="#" data-tab="Meetings">Go to meetings list →</a>
    <a class="button secondary" href="#" data-tab="Actions register">See all actions →</a>
    <a class="button secondary" href="#" data-tab="Decisions register">See all decisions →</a>
   </div>
  </section>`;
}

function meetingsView(){
 const sorted=[...db.meetings].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const rows=sorted.map(m=>{
  const openA=m.actions.filter(a=>a.status!=='Done'&&a.status!=='Cancelled').length;
  const overdueA=m.actions.filter(a=>a.status!=='Done'&&a.status!=='Cancelled'&&isOverdue(a.due)).length;
  return `<tr>
   <td><b>${esc(m.code)}</b></td>
   <td><b>${esc(m.title||'Untitled meeting')}</b>${m.location?`<br><small>${esc(m.location)}</small>`:''}</td>
   <td>${esc(fmtDate(m.date))}</td>
   <td>${pill(m.type)}</td>
   <td>${esc(m.facilitator||'—')}</td>
   <td>${m.decisions.length} decision${m.decisions.length===1?'':'s'}</td>
   <td>${m.actions.length} action${m.actions.length===1?'':'s'}${openA?`<br><small>${openA} open${overdueA?` · <span class="pill bad" style="font-size:9px">${overdueA} overdue</span>`:''}</small>`:''}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-meeting" data-id="${esc(m.id)}">Open</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Meetings</h2><p>One row per meeting. Open any one to edit agenda, decisions and actions. Sorted newest first.</p></div><button class="button" data-action="new-meeting">+ Add a meeting</button></div>
  ${table(['Code','Title','Date','Type','Facilitator','Decisions','Actions',''],rows,'No meetings yet. Click "Add a meeting" to record one.')}`;
}

function actionsRegisterView(){
 const all=db.meetings.flatMap(m=>m.actions.map(a=>({...a,meetingId:m.id,meetingCode:m.code,meetingTitle:m.title,meetingDate:m.date})));
 const open=all.filter(a=>a.status!=='Done'&&a.status!=='Cancelled');
 const overdue=open.filter(a=>isOverdue(a.due));
 const sorted=[...all].sort((a,b)=>{if(a.status==='Done'||a.status==='Cancelled')return 1;if(b.status==='Done'||b.status==='Cancelled')return -1;return (a.due||'9999').localeCompare(b.due||'9999')});
 const rows=sorted.map(a=>{
  const od=isOverdue(a.due)&&a.status!=='Done'&&a.status!=='Cancelled';
  const linked=a.linkSource&&a.linkSource!=='manual'&&a.linkRef?`<a class="link" href="${esc(toolHref(a.linkSource))}">${esc(a.linkRef)}</a>${a.linkText?`<br><small>${esc(a.linkText)}</small>`:''}`:(a.linkText?esc(a.linkText):'<span class="muted">—</span>');
  return `<tr><td><b>${esc(a.text||'Untitled action')}</b></td><td>${linked}</td><td>${esc(a.owner||'—')}</td><td>${esc(fmtDate(a.due)||'—')} ${od?'<span class="pill bad" style="font-size:9px">overdue</span>':''}</td><td>${pill(a.status)}</td><td><button class="link" data-action="edit-meeting" data-id="${esc(a.meetingId)}">${esc(a.meetingCode)} · ${esc(fmtDate(a.meetingDate))}</button></td></tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Actions register</h2><p>Every action from every meeting in one list. Open items first, then by due date. Overdue items are flagged. Click a meeting code to jump to the full record.</p></div></div>
  <div class="grid four" style="margin-bottom:16px">
   ${card('Total actions',all.length,'All meetings combined')}
   ${card('Open',open.length,'Still being worked on',open.length>5)}
   ${card('Overdue',overdue.length,'Past their due date',overdue.length>0)}
   ${card('Done',all.filter(a=>a.status==='Done').length,'Complete')}
  </div>
  ${table(['Action','Linked to','Owner','Due','Status','From meeting'],rows,'No actions logged yet. Add a meeting with actions on the Meetings tab.')}`;
}

function decisionsRegisterView(){
 const all=db.meetings.flatMap(m=>m.decisions.map(d=>({...d,meetingId:m.id,meetingCode:m.code,meetingTitle:m.title,meetingDate:m.date})));
 const sorted=[...all].sort((a,b)=>(b.meetingDate||'').localeCompare(a.meetingDate||''));
 const rows=sorted.map(d=>`<tr><td>${esc(fmtDate(d.meetingDate))}</td><td><b>${esc(d.text||'—')}</b>${d.context?`<br><small>${esc(d.context)}</small>`:''}</td><td>${esc(d.decidedBy||'—')}</td><td>${pill(d.status)}</td><td><button class="link" data-action="edit-meeting" data-id="${esc(d.meetingId)}">${esc(d.meetingCode)} · ${esc(d.meetingTitle||'Meeting')}</button></td></tr>`);
 return `<div class="rowhead section-head"><div><h2>Decisions register</h2><p>Every decision from every meeting, newest first. The "what did we decide?" view leadership asks for. Each row links back to the meeting it came from.</p></div></div>
  ${table(['Date','Decision','Decided by','Status','From meeting'],rows,'No decisions logged yet. Add decisions inside a meeting record.')}`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year</li><li>Meetings — one row per meeting with agenda / notes / attendees</li><li>Decisions — every decision with the meeting it came from</li><li>Actions — every action with owner, due, status and linked-to reference</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Meeting modal (edit full record) ----------
function meetingModal(m){
 const isNew=!m;m=m||blankMeeting();
 const items=suiteItems();
 const groups={};items.forEach(it=>{(groups[it.group]=groups[it.group]||[]).push(it)});
 const linkOptions=`<option value="manual">— Free text —</option>${Object.entries(groups).map(([g,arr])=>`<optgroup label="${esc(g)}">${arr.map(it=>`<option value="${esc(it.source+'::'+it.ref)}">${esc(it.label)}</option>`).join('')}</optgroup>`).join('')}`;
 const decRow=(d,i)=>`<div class="mad-row" data-row-kind="decision" data-row-id="${esc(d.id)}">
  <label class="mad-f mad-f-wide"><span>Decision</span><textarea data-field="text" data-rid="${esc(d.id)}" placeholder="State the decision taken">${esc(d.text)}</textarea></label>
  <label class="mad-f"><span>Context</span><textarea data-field="context" data-rid="${esc(d.id)}" placeholder="Why">${esc(d.context)}</textarea></label>
  <label class="mad-f"><span>Decided by</span><input data-field="decidedBy" data-rid="${esc(d.id)}" value="${esc(d.decidedBy)}" placeholder="Role or body"></label>
  <label class="mad-f mad-f-narrow"><span>Status</span><select data-field="status" data-rid="${esc(d.id)}">${DSTATUS.map(s=>`<option ${d.status===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
  <button type="button" class="link danger" data-action="remove-decision" data-id="${esc(d.id)}">Remove</button>
 </div>`;
 const combined=a=>a.linkSource==='manual'?'manual':`${a.linkSource}::${a.linkRef}`;
 const actRow=(a,i)=>`<div class="mad-row" data-row-kind="action" data-row-id="${esc(a.id)}">
  <label class="mad-f mad-f-wide"><span>Action</span><textarea data-field="text" data-rid="${esc(a.id)}" placeholder="What needs to happen">${esc(a.text)}</textarea></label>
  <label class="mad-f"><span>Owner</span><input data-field="owner" data-rid="${esc(a.id)}" value="${esc(a.owner)}"></label>
  <label class="mad-f mad-f-narrow"><span>Due</span><input type="date" data-field="due" data-rid="${esc(a.id)}" value="${esc(a.due)}"></label>
  <label class="mad-f mad-f-narrow"><span>Status</span><select data-field="status" data-rid="${esc(a.id)}">${ASTATUS.map(s=>`<option ${a.status===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
  <label class="mad-f mad-f-wide"><span>Linked to</span><select data-field="linkPick" data-rid="${esc(a.id)}">${linkOptions.replace(`value="${esc(combined(a))}"`,`value="${esc(combined(a))}" selected`)}</select><input data-field="linkText" data-rid="${esc(a.id)}" value="${esc(a.linkText)}" placeholder="Note or free-text target" style="margin-top:4px"></label>
  <button type="button" class="link danger" data-action="remove-action" data-id="${esc(a.id)}">Remove</button>
 </div>`;
 return modal(isNew?'Add meeting':'Edit meeting',`<form data-form="meeting" data-id="${esc(m.id||'')}" class="form" id="meeting-form">
  <div class="form-grid-top">
   ${field('Code','code',m.code||nextCode(),'text','required')}
   ${field('Title','title',m.title,'text','required')}
   ${field('Date','date',m.date,'date','required')}
   ${select('Type','type',MTYPES,m.type||'Team')}
   ${field('Facilitator','facilitator',m.facilitator)}
   ${field('Location','location',m.location,'text','','In-person venue or video link')}
  </div>
  ${area('Attendees — one per line or comma-separated','attendees',m.attendees)}
  ${area('Apologies','apologies',m.apologies,'Who was invited but could not attend.')}
  ${area('Agenda','agenda',m.agenda,'What the meeting covered. One topic per line keeps minutes readable.')}
  ${area('Notes','notes',m.notes,'Context not covered by the decisions and actions below.')}
  <h3 class="form-section">Decisions · log every decision taken</h3>
  <div class="mad-rows" id="mad-decisions">${m.decisions.map(decRow).join('')||'<p class="muted" style="grid-column:1/-1">No decisions yet. Click "Add decision" below.</p>'}</div>
  <div style="grid-column:1/-1"><button type="button" class="button small secondary" data-action="add-decision">+ Add decision</button></div>
  <h3 class="form-section">Actions · each action gets an owner, a due date and a status</h3>
  <div class="mad-rows" id="mad-actions">${m.actions.map(actRow).join('')||'<p class="muted" style="grid-column:1/-1">No actions yet. Click "Add action" below.</p>'}</div>
  <div style="grid-column:1/-1"><button type="button" class="button small secondary" data-action="add-action">+ Add action</button><p class="tiny" style="margin-top:6px">The <b>Linked to</b> dropdown lets each action link to an objective, pathway, KPI, indicator, Gantt task or risk — picked from your other tools. Or leave as "Free text" and type a note.</p></div>
  ${formEnd('Save meeting',{deleteId:isNew?'':m.id,deleteLabel:'Delete meeting'})}
 </form>`);
}

// ---------- Actions ----------
let editing={id:null,buffer:null};
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';editing={id:null,buffer:null};render();return}
 if(a==='new-meeting'){const m={...blankMeeting(),code:nextCode()};editing={id:null,buffer:m};dlg=meetingModal(m);render();return}
 if(a==='edit-meeting'){const m=db.meetings.find(x=>x.id===id);if(m){editing={id:m.id,buffer:JSON.parse(JSON.stringify(m))};dlg=meetingModal(editing.buffer);render()}return}
 if(a==='delete'){const m=db.meetings.find(x=>x.id===id);if(!m)return;if(!confirm('Delete this meeting record and its decisions and actions? Cannot be undone.'))return;db.meetings=db.meetings.filter(x=>x.id!==id);editing={id:null,buffer:null};dlg='';save('Meeting deleted.');return}
 if(a==='add-decision'||a==='add-action'||a==='remove-decision'||a==='remove-action'){
  // Keep edited values in buffer, then re-render the modal
  syncBufferFromDom(root);
  if(a==='add-decision')editing.buffer.decisions.push(blankDecision());
  if(a==='add-action')editing.buffer.actions.push(blankAction());
  if(a==='remove-decision'){if(!confirm('Remove this decision?'))return;editing.buffer.decisions=editing.buffer.decisions.filter(d=>d.id!==id)}
  if(a==='remove-action'){if(!confirm('Remove this action?'))return;editing.buffer.actions=editing.buffer.actions.filter(d=>d.id!==id)}
  dlg=meetingModal(editing.buffer);render();return;
 }
 if(a==='xlsx'){try{download('Method-into-Impact-meetings.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-meetings.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-meetings-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function syncBufferFromDom(root){
 if(!editing.buffer)return;
 const form=root.querySelector('form[data-form="meeting"]');if(!form)return;
 const d=formData(form);
 Object.assign(editing.buffer,{code:s(d.code),title:s(d.title),date:d.date||today(),type:d.type,facilitator:s(d.facilitator),location:s(d.location),attendees:s(d.attendees),apologies:s(d.apologies),agenda:s(d.agenda),notes:s(d.notes)});
 // Pull decision rows
 root.querySelectorAll('#mad-decisions .mad-row').forEach(row=>{
  const rid=row.dataset.rowId;const dec=editing.buffer.decisions.find(x=>x.id===rid);if(!dec)return;
  row.querySelectorAll('[data-field]').forEach(el=>{dec[el.dataset.field]=el.value});
 });
 root.querySelectorAll('#mad-actions .mad-row').forEach(row=>{
  const rid=row.dataset.rowId;const act=editing.buffer.actions.find(x=>x.id===rid);if(!act)return;
  row.querySelectorAll('[data-field]').forEach(el=>{
   if(el.dataset.field==='linkPick'){const v=el.value;if(v==='manual'){act.linkSource='manual';act.linkRef=''}else{const [src,ref]=v.split('::');act.linkSource=src||'manual';act.linkRef=ref||''}}
   else act[el.dataset.field]=el.value;
  });
 });
}

function submit(form){
 if(form.dataset.form!=='meeting')return;
 syncBufferFromDom(root);
 const buf=editing.buffer;
 stamp(buf);
 const existing=db.meetings.find(m=>m.id===buf.id);
 if(existing)Object.assign(existing,buf);else db.meetings.push(buf);
 editing={id:null,buffer:null};dlg='';save('Meeting saved.');
}

// ---------- Excel ----------
function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Meetings, actions & decisions',[
   'Facilitation tool: every meeting record carries agenda, decisions and actions.',
   'Decisions and Actions sheets flatten the rolling registers across every meeting.',
   'Round-trip supported: import the same workbook back to restore everything by code.'
  ]),
  metaSheet(db.meta),
  {name:'Meetings',rows:[
   ['Code','Title','Date','Type','Facilitator','Location','Attendees','Apologies','Agenda','Notes'],
   ...(withData?db.meetings.map(m=>[m.code,m.title,m.date,m.type,m.facilitator,m.location,m.attendees,m.apologies,m.agenda,m.notes]):[])
  ]},
  {name:'Decisions',rows:[
   ['Meeting code','Meeting date','Decision','Context','Decided by','Status'],
   ...(withData?db.meetings.flatMap(m=>m.decisions.map(d=>[m.code,m.date,d.text,d.context,d.decidedBy,d.status])):[])
  ]},
  {name:'Actions',rows:[
   ['Meeting code','Meeting date','Action','Owner','Due','Status','Linked source','Linked ref','Linked text'],
   ...(withData?db.meetings.flatMap(m=>m.actions.map(a=>[m.code,m.date,a.text,a.owner,a.due,a.status,a.linkSource,a.linkRef,a.linkText])):[])
  ]},
  schemaSheet({Meetings:'code,title,date,type,facilitator,location,attendees,apologies,agenda,notes',Decisions:'meetingCode,meetingDate,text,context,decidedBy,status',Actions:'meetingCode,meetingDate,text,owner,due,status,linkSource,linkRef,linkText'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const all=db.meetings.flatMap(m=>m.actions.map(a=>[m.code,m.date,a.text,a.owner,a.due,a.status,(a.linkSource==='manual'?'':a.linkSource+'/'+a.linkRef),a.linkText]));
 download('Method-into-Impact-meetings-actions.csv',csv([['Meeting','Date','Action','Owner','Due','Status','Linked','Note'],...all]),'text/csv;charset=utf-8');
}

async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const mRows=rowsToObjects(findSheet(data,'Meetings'));
  const dRows=rowsToObjects(findSheet(data,'Decisions'));
  const aRows=rowsToObjects(findSheet(data,'Actions'));
  if(mRows?.length){
   db.meetings=mRows.map(r=>({...blankMeeting(),code:r.Code||'',title:r.Title||'',date:r.Date||today(),type:r.Type||'Team',facilitator:r.Facilitator||'',location:r.Location||'',attendees:r.Attendees||'',apologies:r.Apologies||'',agenda:r.Agenda||'',notes:r.Notes||''}));
   const byCode=new Map(db.meetings.map(m=>[m.code,m]));
   (dRows||[]).forEach(r=>{const m=byCode.get(r['Meeting code']);if(!m)return;m.decisions.push({...blankDecision(),text:r.Decision||'',context:r.Context||'',decidedBy:r['Decided by']||'',status:r.Status||'Approved'})});
   (aRows||[]).forEach(r=>{const m=byCode.get(r['Meeting code']);if(!m)return;m.actions.push({...blankAction(),text:r.Action||'',owner:r.Owner||'',due:r.Due||'',status:r.Status||'Open',linkSource:r['Linked source']||'manual',linkRef:r['Linked ref']||'',linkText:r['Linked text']||''})});
  }
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){
 try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}
}

// ---------- Start-tab live meta ----------
function wireStart(root){
 const box=root.querySelector('.work-box');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};
 box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{
  el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()});
  el.addEventListener('change',()=>{if(el.tagName==='SELECT'){const k=el.dataset.field;db.meta[k]=el.value;schedule()}});
 });
}

function render(){
 const views={'Start':startView,'Meetings':meetingsView,'Actions register':actionsRegisterView,'Decisions register':decisionsRegisterView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Cross-cutting · Meetings, actions & decisions',title:'Meetings, Actions & Decisions',intro:'Run meetings that end with owned decisions and actions, not just notes. Decisions and actions roll into their own registers across every meeting — ready for leadership review, donor reporting and audit.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=3&lesson=coordination',label:'Review Module 3'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';editing={id:null,buffer:null};render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
