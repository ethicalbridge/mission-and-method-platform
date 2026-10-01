/* People Check-ins & Development — 1:1 records and growth plans.
   For each team member: a running log of check-ins with wins / blockers /
   priorities, and a development plan with goals that can be tied to ESOs.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-checkins-v2';
const ORG_KEY='mission-method-org-structure-v2',SO_KEY='mission-method-strategic-objectives-v2',SK_KEY='mission-method-strategy-kpis-v2';
const TABS=['Start','Team','Check-ins','Development','Export'];
const CHECK_TYPES=['Weekly 1:1','Monthly 1:1','Quarterly review','Mid-year','Annual review','Probation review','Ad hoc'];
const GOAL_STATUS=['Planning','In progress','On hold','Done','Cancelled'];
const SENTIMENT=['Thriving','Energised','Steady','Stretched','Struggling'];

const blankPerson=()=>({id:uid(),code:'',name:'',roleCode:'',roleTitle:'',manager:'',startDate:'',cadence:'Monthly',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankCheckin=()=>({id:uid(),personCode:'',date:today(),type:'Monthly 1:1',sentiment:'Steady',wins:'',blockers:'',priorities:'',feedback:'',decisions:'',nextSteps:'',nextDate:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankGoal=()=>({id:uid(),personCode:'',title:'',category:'Skill',linkedEso:'',linkedKpi:'',description:'',measure:'',start:'',target:'',status:'Planning',progress:0,notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),people:[],checkins:[],goals:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.checkins-cleanup-v2',blank)||d;['people','checkins','goals'].forEach(k=>{if(!Array.isArray(d[k]))d[k]=[]});return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const roleList=()=>(readStore(ORG_KEY)?.roles||[]).filter(r=>r.title);
const soList=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const kpiList=()=>(readStore(SK_KEY)?.kpis||[]).filter(k=>k.code);
const nextCode=(prefix,arr)=>{const nums=arr.map(x=>Number(String(x.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};
const isOverdue=d=>d&&d<today();
const personByCode=c=>db.people.find(p=>p.code===c);
const checkinsFor=code=>db.checkins.filter(c=>c.personCode===code);
const goalsFor=code=>db.goals.filter(g=>g.personCode===code);

function startView(){
 const m=db.meta;
 const totalPeople=db.people.length;
 const totalCheckins=db.checkins.length;
 const openGoals=db.goals.filter(g=>g.status==='In progress'||g.status==='Planning').length;
 const noRecentCheckin=db.people.filter(p=>{const last=checkinsFor(p.code).map(c=>c.date).sort().slice(-1)[0];if(!last)return true;const days=(new Date(today())-new Date(last))/86400000;return days>45}).length;
 return `${window.MMExample?.renderIntegration?.('checkins')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Running record of 1:1s, performance conversations and growth plans. Development goals can be tied to ESOs and KPIs so personal growth maps to organisational impact.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Team members',totalPeople,'In the register')}
    ${card('Check-ins logged',totalCheckins,'All time')}
    ${card('Open development goals',openGoals,'Being worked on')}
    ${card('No check-in in 45d',noRecentCheckin,'Needs attention',noRecentCheckin>0)}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Add team members (pulling roles from Organisation Structure), log a check-in for each conversation, and track development goals that link to strategic objectives.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-person">+ Add a team member</button>
    <button class="button" data-action="new-checkin">+ Log a check-in</button>
    <button class="button secondary" data-action="new-goal">+ Add a development goal</button>
    <a class="button secondary" href="#" data-tab="Team">Team →</a>
   </div>
  </section>`;
}

function teamView(){
 const rows=db.people.map(p=>{
  const lastCheck=checkinsFor(p.code).sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0];
  const openGoals=goalsFor(p.code).filter(g=>g.status==='In progress'||g.status==='Planning').length;
  const sentiment=lastCheck?.sentiment||'—';
  return `<tr><td><b>${esc(p.code)}</b></td><td><b>${esc(p.name)}</b>${p.roleTitle?`<br><small>${esc(p.roleTitle)}</small>`:''}</td><td>${esc(p.manager||'—')}</td><td>${esc(p.cadence||'')}</td><td>${lastCheck?esc(fmtDate(lastCheck.date)):'<span class="muted">No check-ins yet</span>'}</td><td>${pill(sentiment)}</td><td>${openGoals}</td><td><div class="row-actions"><button class="link" data-action="edit-person" data-id="${esc(p.id)}">Edit</button> <button class="link" data-action="new-checkin-for" data-code="${esc(p.code)}">+ Check-in</button></div></td></tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Team</h2><p>Team members with their 1:1 cadence and most-recent check-in sentiment.</p></div><button class="button" data-action="new-person">+ Add a team member</button></div>
  ${table(['Code','Name / role','Manager','Cadence','Last check-in','Sentiment','Open goals',''],rows,'No team members yet. Add one to start logging check-ins.')}`;
}

function checkinsView(){
 const sorted=[...db.checkins].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const rows=sorted.map(c=>{const p=personByCode(c.personCode);return `<tr><td>${esc(fmtDate(c.date))}</td><td><b>${esc(p?.name||c.personCode)}</b></td><td>${pill(c.type)}</td><td>${pill(c.sentiment)}</td><td><small>${esc(c.wins||'')}</small></td><td><small>${esc(c.blockers||'')}</small></td><td>${esc(fmtDate(c.nextDate)||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-checkin" data-id="${esc(c.id)}">Edit</button></div></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Check-in log</h2><p>Every check-in across every team member, newest first.</p></div><button class="button" data-action="new-checkin">+ Log a check-in</button></div>
  ${table(['Date','Person','Type','Sentiment','Wins','Blockers','Next date',''],rows,'No check-ins yet.')}`;
}

function developmentView(){
 const sorted=[...db.goals].sort((a,b)=>(a.status||'').localeCompare(b.status||'')||(a.title||'').localeCompare(b.title||''));
 const rows=sorted.map(g=>{const p=personByCode(g.personCode);return `<tr><td><b>${esc(p?.name||g.personCode)}</b></td><td><b>${esc(g.title||'Untitled')}</b>${g.description?`<br><small>${esc(g.description).slice(0,100)}</small>`:''}</td><td>${esc(g.category||'')}</td><td>${esc(g.linkedEso||'—')}${g.linkedKpi?`<br><small>${esc(g.linkedKpi)}</small>`:''}</td><td>${esc(fmtDate(g.target)||'—')}</td><td>${pill(g.status)}</td><td><b>${g.progress||0}%</b>${bar(g.progress||0)}</td><td><div class="row-actions"><button class="link" data-action="edit-goal" data-id="${esc(g.id)}">Edit</button></div></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Development goals</h2><p>Growth goals tied, where useful, to a strategic objective (ESO) and a KPI.</p></div><button class="button" data-action="new-goal">+ Add a development goal</button></div>
  ${table(['Person','Goal','Category','Linked to','Target','Status','Progress',''],rows,'No development goals yet.')}`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>People — the team register</li><li>Check-ins — every logged conversation</li><li>Goals — development goals with ESO / KPI linkage</li></ul></section>`}

// ---------- Modals ----------
function personModal(p){
 const isNew=!p;p=p||blankPerson();
 const roles=roleList();
 const roleOpts=roles.map(r=>[r.code,`${r.code} · ${r.title}`]);
 return modal(isNew?'Add team member':'Edit team member',`<form data-form="person" data-id="${esc(p.id||'')}" class="form">
  ${field('Code','code',p.code||nextCode('P',db.people),'text','required')}
  ${field('Name','name',p.name,'text','required')}
  ${roleOpts.length?select('Role (from Organisation Structure)','roleCode',roleOpts,p.roleCode,'','No role selected'):field('Role title','roleTitle',p.roleTitle)}
  ${field('Manager','manager',p.manager)}
  ${field('Start date','startDate',p.startDate,'date')}
  ${select('1:1 cadence','cadence',['Weekly','Fortnightly','Monthly','Quarterly'],p.cadence||'Monthly')}
  ${area('Notes','notes',p.notes)}
  ${formEnd('Save',{deleteId:isNew?'':p.id,deleteLabel:'Delete person'})}
 </form>`);
}

function checkinModal(c,personCode){
 const isNew=!c;c=c||{...blankCheckin(),personCode:personCode||''};
 const peopleOpts=db.people.map(p=>[p.code,`${p.code} · ${p.name}`]);
 return modal(isNew?'Log check-in':'Edit check-in',`<form data-form="checkin" data-id="${esc(c.id||'')}" class="form">
  ${peopleOpts.length?select('Team member','personCode',peopleOpts,c.personCode,'','Pick a person'):field('Person code','personCode',c.personCode)}
  ${field('Date','date',c.date,'date','required')}
  ${select('Type','type',CHECK_TYPES,c.type)}
  ${select('How are they?','sentiment',SENTIMENT,c.sentiment||'Steady')}
  ${area('Wins — what is going well','wins',c.wins)}
  ${area('Blockers — what is in the way','blockers',c.blockers)}
  ${area('Priorities for the next period','priorities',c.priorities)}
  ${area('Feedback given or received','feedback',c.feedback)}
  ${area('Decisions taken','decisions',c.decisions)}
  ${area('Next steps / actions','nextSteps',c.nextSteps)}
  ${field('Next check-in date','nextDate',c.nextDate,'date')}
  ${area('Notes','notes',c.notes)}
  ${formEnd('Save',{deleteId:isNew?'':c.id,deleteLabel:'Delete check-in'})}
 </form>`);
}

function goalModal(g){
 const isNew=!g;g=g||blankGoal();
 const peopleOpts=db.people.map(p=>[p.code,`${p.code} · ${p.name}`]);
 const esoOpts=soList().map(o=>[o.code,`${o.code} · ${o.title}`]);
 const kpiOpts=kpiList().map(k=>[k.code,`${k.code} · ${k.name}`]);
 return modal(isNew?'Add development goal':'Edit goal',`<form data-form="goal" data-id="${esc(g.id||'')}" class="form">
  ${peopleOpts.length?select('Team member','personCode',peopleOpts,g.personCode,'','Pick a person'):field('Person code','personCode',g.personCode)}
  ${field('Goal title','title',g.title,'text','required')}
  ${select('Category','category',['Skill','Behaviour','Qualification','Leadership','Technical','Other'],g.category||'Skill')}
  ${area('Description','description',g.description)}
  ${area('Measure of success','measure',g.measure,'How will you know this goal has been met?')}
  ${esoOpts.length?select('Linked ESO (optional)','linkedEso',esoOpts,g.linkedEso,'The strategic objective this growth supports.','None'):field('Linked ESO (optional)','linkedEso',g.linkedEso)}
  ${kpiOpts.length?select('Linked KPI (optional)','linkedKpi',kpiOpts,g.linkedKpi,'A specific KPI this growth contributes to.','None'):field('Linked KPI (optional)','linkedKpi',g.linkedKpi)}
  ${field('Start date','start',g.start,'date')}
  ${field('Target date','target',g.target,'date')}
  ${select('Status','status',GOAL_STATUS,g.status||'Planning')}
  ${field('Progress (%)','progress',g.progress,'number','min="0" max="100"')}
  ${area('Notes','notes',g.notes)}
  ${formEnd('Save',{deleteId:isNew?'':g.id,deleteLabel:'Delete goal'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab,code=el.dataset.code;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-person'){dlg=personModal();render();return}
 if(a==='edit-person'){const p=db.people.find(x=>x.id===id);if(p){dlg=personModal(p);render()}return}
 if(a==='new-checkin'){dlg=checkinModal();render();return}
 if(a==='new-checkin-for'){dlg=checkinModal(null,code);render();return}
 if(a==='edit-checkin'){const c=db.checkins.find(x=>x.id===id);if(c){dlg=checkinModal(c);render()}return}
 if(a==='new-goal'){dlg=goalModal();render();return}
 if(a==='edit-goal'){const g=db.goals.find(x=>x.id===id);if(g){dlg=goalModal(g);render()}return}
 if(a==='delete'){
  const p=db.people.find(x=>x.id===id),c=db.checkins.find(x=>x.id===id),g=db.goals.find(x=>x.id===id);
  if(p){if(!confirm('Delete this person? Their check-ins and goals will remain by code reference.'))return;db.people=db.people.filter(x=>x.id!==id)}
  else if(c){if(!confirm('Delete this check-in?'))return;db.checkins=db.checkins.filter(x=>x.id!==id)}
  else if(g){if(!confirm('Delete this goal?'))return;db.goals=db.goals.filter(x=>x.id!==id)}
  else return;
  dlg='';save('Deleted.');return;
 }
 if(a==='xlsx'){try{download('Mission-and-Method-people.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-people.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-people-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 if(kind==='person'){
  const existing=db.people.find(p=>p.id===form.dataset.id);
  const p=existing||{...blankPerson()};
  Object.assign(p,{code:s(d.code)||p.code||nextCode('P',db.people),name:s(d.name),roleCode:s(d.roleCode),roleTitle:s(d.roleTitle),manager:s(d.manager),startDate:d.startDate||'',cadence:d.cadence||'Monthly',notes:s(d.notes)});
  if(p.roleCode){const r=roleList().find(x=>x.code===p.roleCode);if(r)p.roleTitle=r.title}
  stamp(p);
  if(!existing)db.people.push(p);
  dlg='';save('Person saved.');return;
 }
 if(kind==='checkin'){
  const existing=db.checkins.find(c=>c.id===form.dataset.id);
  const c=existing||{...blankCheckin()};
  Object.assign(c,{personCode:s(d.personCode),date:d.date||today(),type:d.type,sentiment:d.sentiment,wins:s(d.wins),blockers:s(d.blockers),priorities:s(d.priorities),feedback:s(d.feedback),decisions:s(d.decisions),nextSteps:s(d.nextSteps),nextDate:d.nextDate||'',notes:s(d.notes)});
  stamp(c);
  if(!existing)db.checkins.push(c);
  dlg='';save('Check-in saved.');return;
 }
 if(kind==='goal'){
  const existing=db.goals.find(g=>g.id===form.dataset.id);
  const g=existing||{...blankGoal()};
  Object.assign(g,{personCode:s(d.personCode),title:s(d.title),category:d.category,description:s(d.description),measure:s(d.measure),linkedEso:s(d.linkedEso),linkedKpi:s(d.linkedKpi),start:d.start||'',target:d.target||'',status:d.status||'Planning',progress:Number(d.progress)||0,notes:s(d.notes)});
  stamp(g);
  if(!existing)db.goals.push(g);
  dlg='';save('Goal saved.');return;
 }
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('People Check-ins & Development',['Running record of 1:1s, performance conversations and growth plans.']),
  metaSheet(db.meta),
  {name:'People',rows:[['Code','Name','Role','Manager','Start','Cadence','Notes'],...(withData?db.people.map(p=>[p.code,p.name,p.roleTitle,p.manager,p.startDate,p.cadence,p.notes]):[])]},
  {name:'Check-ins',rows:[['Person','Date','Type','Sentiment','Wins','Blockers','Priorities','Feedback','Decisions','Next steps','Next date','Notes'],...(withData?db.checkins.map(c=>[c.personCode,c.date,c.type,c.sentiment,c.wins,c.blockers,c.priorities,c.feedback,c.decisions,c.nextSteps,c.nextDate,c.notes]):[])]},
  {name:'Goals',rows:[['Person','Title','Category','Description','Measure','Linked ESO','Linked KPI','Start','Target','Status','Progress','Notes'],...(withData?db.goals.map(g=>[g.personCode,g.title,g.category,g.description,g.measure,g.linkedEso,g.linkedKpi,g.start,g.target,g.status,g.progress,g.notes]):[])]},
  schemaSheet({People:'code,name,roleTitle,manager,startDate,cadence,notes',Checkins:'personCode,date,type,sentiment,wins,blockers,priorities,feedback,decisions,nextSteps,nextDate,notes',Goals:'personCode,title,category,description,measure,linkedEso,linkedKpi,start,target,status,progress,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){download('Mission-and-Method-people.csv',csv([['Person','Name','Role','Last check-in','Open goals'],...db.people.map(p=>{const lc=checkinsFor(p.code).sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0];return [p.code,p.name,p.roleTitle,lc?lc.date:'',goalsFor(p.code).filter(g=>g.status==='In progress'||g.status==='Planning').length]})]),'text/csv;charset=utf-8')}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const pRows=rowsToObjects(findSheet(data,'People'));const cRows=rowsToObjects(findSheet(data,'Check-ins'));const gRows=rowsToObjects(findSheet(data,'Goals'));if(pRows?.length)db.people=pRows.map(r=>({...blankPerson(),code:r.Code||'',name:r.Name||'',roleTitle:r.Role||'',manager:r.Manager||'',startDate:r.Start||'',cadence:r.Cadence||'Monthly',notes:r.Notes||''}));if(cRows?.length)db.checkins=cRows.map(r=>({...blankCheckin(),personCode:r.Person||'',date:r.Date||today(),type:r.Type||'Monthly 1:1',sentiment:r.Sentiment||'Steady',wins:r.Wins||'',blockers:r.Blockers||'',priorities:r.Priorities||'',feedback:r.Feedback||'',decisions:r.Decisions||'',nextSteps:r['Next steps']||'',nextDate:r['Next date']||'',notes:r.Notes||''}));if(gRows?.length)db.goals=gRows.map(r=>({...blankGoal(),personCode:r.Person||'',title:r.Title||'',category:r.Category||'Skill',description:r.Description||'',measure:r.Measure||'',linkedEso:r['Linked ESO']||'',linkedKpi:r['Linked KPI']||'',start:r.Start||'',target:r.Target||'',status:r.Status||'Planning',progress:Number(r.Progress)||0,notes:r.Notes||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Team':teamView,'Check-ins':checkinsView,'Development':developmentView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'People · Check-ins & development',title:'People Check-ins & Development',intro:'Running record of 1:1s, performance conversations and growth plans. Development goals can be tied to strategic objectives and KPIs so personal growth maps to organisational impact.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=checkins',label:'Review the module'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
