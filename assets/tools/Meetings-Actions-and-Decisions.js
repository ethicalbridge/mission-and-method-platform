/* Meetings, Actions & Decisions — facilitation + rolling registers.
   Rebuilt in the Donor Mapping / Issue & Risk Management style:
   Overview (dashboard + how-it-works) · Meetings · Actions · Decisions
   · Settings · Export. All three grids are inline-editable, auto-grow
   their cells, and feed the dashboard above live.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-meetings-v3',LEGACY_V2='mission-method-meetings-v2',LEGACY_V1='mission-method-meetings-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2',RISK_KEY='mission-method-issue-risk-v2';
const TABS=['Overview','Meetings','Actions','Decisions','Settings','Export'];
const DEFAULT_MTYPES=['Board','Leadership','Team','Project review','Partner','Workshop','Other'];
const DEFAULT_ASTATUS=['Open','In progress','Done','Blocked','Cancelled'];
const DEFAULT_DSTATUS=['Pending','Approved','Rescinded'];
const DEFAULT_CADENCES=['Weekly','Fortnightly','Monthly','Quarterly','Ad hoc'];

const blankMeeting=()=>({id:uid(),code:'',title:'',date:today(),type:'Team',cadence:'Ad hoc',facilitator:'',attendees:'',apologies:'',location:'',agenda:'',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankDecision=()=>({id:uid(),code:'',meetingCode:'',date:today(),text:'',context:'',decidedBy:'',status:'Approved',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankAction=()=>({id:uid(),code:'',meetingCode:'',text:'',owner:'',due:'',status:'Open',linkSource:'manual',linkRef:'',linkText:'',resolvedOn:'',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',notes:''});
const blankSettings=()=>({mTypes:[...DEFAULT_MTYPES],aStatus:[...DEFAULT_ASTATUS],dStatus:[...DEFAULT_DSTATUS],cadences:[...DEFAULT_CADENCES]});
const blank=()=>({version:3,meta:blankMeta(),settings:blankSettings(),meetings:[],actions:[],decisions:[]});

function migrateV2(v2){
 // v2 nested decisions and actions inside each meeting; v3 flattens them.
 const out=blank();
 try{
  if(v2?.meta)Object.assign(out.meta,v2.meta);
  (v2?.meetings||[]).forEach((m,i)=>{
   const code=m.code||'M'+(i+1);
   out.meetings.push({...blankMeeting(),code,title:m.title||'',date:m.date||today(),type:DEFAULT_MTYPES.includes(m.type)?m.type:'Team',facilitator:m.facilitator||'',attendees:m.attendees||'',apologies:m.apologies||'',location:m.location||'',agenda:m.agenda||'',notes:m.notes||''});
   (m.decisions||[]).forEach((d,j)=>out.decisions.push({...blankDecision(),code:'D'+(out.decisions.length+1),meetingCode:code,date:m.date||today(),text:d.text||'',context:d.context||'',decidedBy:d.decidedBy||'',status:DEFAULT_DSTATUS.includes(d.status)?d.status:'Approved'}));
   (m.actions||[]).forEach((a,j)=>out.actions.push({...blankAction(),code:'A'+(out.actions.length+1),meetingCode:code,text:a.text||'',owner:a.owner||'',due:a.due||'',status:DEFAULT_ASTATUS.includes(a.status)?a.status:'Open',linkSource:a.linkSource||'manual',linkRef:a.linkRef||'',linkText:a.linkText||''}));
  });
 }catch(e){console.warn('meetings v2→v3 migrate failed',e)}
 return out;
}
function migrateV1(v1){return migrateV2(v1)}

// ---------- Three worked examples (meeting rhythm) ----------
function makeExampleMeetings(){
 const M=(o)=>({...blankMeeting(),...o});
 const past14=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
 const past7=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
 const in7=new Date(Date.now()+7*86400000).toISOString().slice(0,10);
 return [
  M({code:'M1',title:'Q4 Leadership review',date:past14,type:'Leadership',cadence:'Quarterly',facilitator:'Aiko Tanaka (Director)',attendees:'Aiko Tanaka · Priya Shah · Erik Johansen · Maria Lopez',apologies:'Luis Carvalho',location:'HQ boardroom + Zoom',agenda:'1. Q3 results\n2. 2027 budget assumptions\n3. Harvest Impact Fund submission\n4. Lead safeguarding officer succession',notes:'Longest Q4 review on record (2h20). Carried over "fundraising split by channel" to the next session.'}),
  M({code:'M2',title:'Programme team weekly',date:past7,type:'Team',cadence:'Weekly',facilitator:'Maria Lopez (Programme Manager)',attendees:'Maria Lopez · Nia Osei · Luis Carvalho · Fatima Haidar',apologies:'',location:'Zoom',agenda:'1. Cohort 3 attendance\n2. MEAL baseline survey status\n3. Field tablet loss follow-up\n4. Partner MoU preparation',notes:'Fastest weekly in weeks (45 min). Field tablet issue (I2) now assigned to Maria.'}),
  M({code:'M3',title:'November Board meeting',date:in7,type:'Board',cadence:'Quarterly',facilitator:'Chair: Eleanor Reyes',attendees:'Full Board + Director + Finance Director',apologies:'',location:'HQ boardroom',agenda:'1. Director report\n2. Q4 financial statement\n3. Harvest Impact Fund decision\n4. 2027 strategy sign-off\n5. Safeguarding incident I3 (confidential session)',notes:'Papers out 7 days ahead per policy. Confidential session recorded in a separate minute.'})
 ];
}
function makeExampleDecisions(){
 const D=(o)=>({...blankDecision(),...o});
 const past14=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
 const past7=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
 return [
  D({code:'D1',meetingCode:'M1',date:past14,text:'Approve a 3-month operating reserve as a hard floor in all 2027 budget drafts',context:'Response to risk R1 (Harvest Impact Fund decision delays). Finance Director to apply before the budget leaves the Finance committee.',decidedBy:'Leadership team · unanimous',status:'Approved',notes:'Supersedes the previous 2-month reserve policy.'}),
  D({code:'D2',meetingCode:'M1',date:past14,text:'Fast-track two reserve donor prospects by end of month',context:'Reduces exposure to Harvest decision delay. Priya to lead with Dev team.',decidedBy:'Leadership team',status:'Approved',notes:''}),
  D({code:'D3',meetingCode:'M2',date:past7,text:'Enable auto-sync to cloud on every field tablet by end of week',context:'Response to issue I2. Zero-cost IT change. Maria to confirm with every field officer.',decidedBy:'Programme team',status:'Approved',notes:''}),
  D({code:'D4',meetingCode:'M1',date:past14,text:'Postpone the fundraising-by-channel review to the January leadership session',context:'Not enough data from Q3 to split meaningfully. Dev team to prepare the channel view for January.',decidedBy:'Leadership team',status:'Pending',notes:'Pending confirmation from Finance that the data split is feasible.'})
 ];
}
function makeExampleActions(){
 const A=(o)=>({...blankAction(),...o});
 const past10=new Date(Date.now()-10*86400000).toISOString().slice(0,10);
 const past3=new Date(Date.now()-3*86400000).toISOString().slice(0,10);
 const in3=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
 const in14=new Date(Date.now()+14*86400000).toISOString().slice(0,10);
 const past30=new Date(Date.now()-30*86400000).toISOString().slice(0,10);
 return [
  A({code:'A1',meetingCode:'M1',text:'Draft the 2027 budget using the new 3-month reserve floor',owner:'Erik Johansen (Finance Director)',due:in14,status:'In progress',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — Harvest grant delay',notes:'First draft shared with Director; Finance committee review end of month.'}),
  A({code:'A2',meetingCode:'M1',text:'Open conversations with Mercator Education Fund and Open Horizons',owner:'Priya Shah (Dev. Director)',due:past3,status:'Open',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — reserve prospects',notes:'Overdue — the Mercator contact is on sabbatical. Rerouted to Zara at Open Horizons.'}),
  A({code:'A3',meetingCode:'M2',text:'Enable cloud auto-sync on all 6 field tablets',owner:'Maria Lopez',due:in3,status:'In progress',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — tablet loss',notes:'4 of 6 done; waiting on 2 field officers to come back from site visits.'}),
  A({code:'A4',meetingCode:'M2',text:'Re-collect 40 lost baseline surveys from Cohort 3',owner:'Maria Lopez · Nia Osei',due:in14,status:'Open',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — recover lost data',notes:''}),
  A({code:'A5',meetingCode:'M1',text:'Prepare the January-leadership channel-split paper',owner:'Luis Carvalho (Dev team)',due:in14,status:'Open',linkSource:'manual',linkRef:'',linkText:'Decision D4 — fundraising review follow-up',notes:''}),
  A({code:'A6',meetingCode:'M1',text:'Confirm succession plan for the lead safeguarding officer',owner:'Aiko Tanaka',due:past10,status:'Blocked',linkSource:'risk',linkRef:'R2',linkText:'Mitigates R2 — single point of failure',notes:'Blocked — HR is still assessing whether the role can split or needs two hires.'})
 ];
}

const storage=S.store({key:KEY,version:3,blank,legacy:[{key:LEGACY_V2,migrate:migrateV2},{key:LEGACY_V1,migrate:migrateV1}],normalise:d=>{
 d=window.MMExample?.cleanupStaleExample?.(d,'mm.meetings-cleanup-v3',blank)||d;
 if(!Array.isArray(d.meetings))d.meetings=[];
 if(!Array.isArray(d.actions))d.actions=[];
 if(!Array.isArray(d.decisions))d.decisions=[];
 if(!d.settings||typeof d.settings!=='object')d.settings=blankSettings();
 else{
  const s=d.settings;
  if(!Array.isArray(s.mTypes)||!s.mTypes.length)s.mTypes=[...DEFAULT_MTYPES];
  if(!Array.isArray(s.aStatus)||!s.aStatus.length)s.aStatus=[...DEFAULT_ASTATUS];
  if(!Array.isArray(s.dStatus)||!s.dStatus.length)s.dStatus=[...DEFAULT_DSTATUS];
  if(!Array.isArray(s.cadences)||!s.cadences.length)s.cadences=[...DEFAULT_CADENCES];
 }
 return d;
}});
let db=storage.load(),tab='Overview',dlg='',message='';
let meetingFilters={type:'',cadence:'',q:''};
let actionFilters={status:'',meeting:'',owner:'',q:''};
let decisionFilters={status:'',meeting:'',q:''};
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const getMTypes=()=>db.settings.mTypes;
const getAStatus=()=>db.settings.aStatus;
const getDStatus=()=>db.settings.dStatus;
const getCadences=()=>db.settings.cadences;

// ---------- Cross-tool link items ----------
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

const isOverdue=d=>d&&d<today();
const inNextDays=(d,n)=>{if(!d)return false;const t=new Date(today());const target=new Date(d);const diff=(target-t)/86400000;return diff>=0 && diff<=n};
const nextCode=prefix=>{const list=prefix==='M'?db.meetings:prefix==='A'?db.actions:db.decisions;const nums=list.map(x=>Number(String(x.code||'').replace(prefix,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};

// ---------- Visual dashboard ----------
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const meetings=db.meetings,actions=db.actions,decisions=db.decisions;
 const totalM=meetings.length;
 const upcoming=meetings.filter(m=>m.date&&m.date>=today()).sort((a,b)=>a.date.localeCompare(b.date))[0]||null;
 const past30=meetings.filter(m=>{if(!m.date)return false;const t=new Date(today());const d=new Date(m.date);return (t-d)/86400000<=30 && d<=t}).length;
 const open=actions.filter(a=>a.status!=='Done'&&a.status!=='Cancelled').length;
 const inProg=actions.filter(a=>a.status==='In progress').length;
 const done=actions.filter(a=>a.status==='Done').length;
 const blocked=actions.filter(a=>a.status==='Blocked').length;
 const overdueActions=actions.filter(a=>isOverdue(a.due)&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const noOwner=actions.filter(a=>!a.owner&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const dueSoon=actions.filter(a=>inNextDays(a.due,7)&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const totalOverdue=overdueActions+noOwner;
 const dApproved=decisions.filter(d=>d.status==='Approved').length;
 const dPending=decisions.filter(d=>d.status==='Pending').length;
 const dRescinded=decisions.filter(d=>d.status==='Rescinded').length;
 return {totalM,upcoming,past30,totalA:actions.length,open,inProg,done,blocked,overdueActions,noOwner,dueSoon,totalOverdue,totalD:decisions.length,dApproved,dPending,dRescinded};
}
function barRow(label,count,total,cls){
 const share=pct(count,total);
 return `<div class="dm-fit-row"><div><span>${label}</span><strong>${count} · ${share}%</strong></div><span class="dm-fit-track"><i class="dm-fit-fill ${cls}" style="--share:${Math.max(share,count?3:0)}%"></i></span></div>`;
}
function visualDashboard(){
 const s=dashboardStats();
 const isEmpty=!s.totalM && !s.totalA && !s.totalD;
 const openShare=pct(s.open,s.totalA);
 const doneShare=pct(s.done,s.totalA);
 let overdueClass='all-done',overdueText=`<b>✓ All clear.</b> No overdue actions and no actions without an owner.`;
 if(s.totalOverdue>5){overdueClass='early';overdueText=`<b>${s.totalOverdue} items flagged.</b> ${s.overdueActions} overdue, ${s.noOwner} without owner.`}
 else if(s.totalOverdue>0){overdueClass='half-done';overdueText=`<b>${s.totalOverdue} flagged.</b> ${s.overdueActions} overdue, ${s.noOwner} without owner.`}
 return `<section class="dm-dashboard ${isEmpty?'dm-dashboard-empty':''}" aria-label="Meetings and actions visual overview">
  <article class="dm-card dm-decision">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Meeting rhythm</p><h3>Activity view</h3></div><span>${s.totalM} meeting${s.totalM===1?'':'s'}</span></div>
   <div class="dm-donut-row">
    <div class="dm-donut" role="img" aria-label="${s.past30} meetings in the past 30 days" style="--go-share:${Math.min(s.past30*10,100)}%;--no-go-share:0%"><div><strong>${s.past30}</strong><span>Last 30d</span></div></div>
    <dl class="dm-legend">
     <div class="dm-leg-go"><dt>Last 30 days</dt><dd>${s.past30}</dd></div>
     <div class="dm-leg-review"><dt>Total logged</dt><dd>${s.totalM}</dd></div>
     <div class="dm-leg-nogo"><dt>Next up</dt><dd>${s.upcoming?esc(fmtDate(s.upcoming.date)):'—'}</dd></div>
    </dl>
   </div>
   ${s.upcoming?`<p class="dm-empty-hint" style="color:#243b45;font-weight:600">Next: ${esc(s.upcoming.title||'Untitled')} · ${esc(fmtDate(s.upcoming.date))}</p>`:(isEmpty?`<p class="dm-empty-hint">Add a meeting to start the rhythm.</p>`:`<p class="dm-empty-hint">No meeting scheduled ahead.</p>`)}
  </article>
  <article class="dm-card dm-fit">
   <div class="dm-card-head"><div><p class="dm-eyebrow">By status</p><h3>Actions distribution</h3></div><span>${s.totalA} total</span></div>
   <div class="dm-fit-list">
    ${barRow('Done',s.done,s.totalA,'dm-fit-strong')}
    ${barRow('In progress',s.inProg,s.totalA,'dm-fit-good')}
    ${barRow('Open',s.totalA?s.open-s.inProg:0,s.totalA,'dm-fit-weak')}
    ${barRow('Blocked',s.blocked,s.totalA,'dm-fit-poor')}
   </div>
   ${!s.totalA?`<p class="dm-empty-hint">Add an action to see the distribution.</p>`:''}
  </article>
  <article class="dm-card dm-coverage">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Follow-through</p><h3>Needs attention</h3></div><span>${s.totalOverdue} flagged</span></div>
   <div class="dm-coverage-num"><strong>${s.totalOverdue}</strong><span>actions overdue or without an owner</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${Math.min(s.totalOverdue*15,100)}%;background:${s.totalOverdue?'linear-gradient(90deg,#c7442b,#e56f4a)':'linear-gradient(90deg,#16746e,#4ea89f)'}"></i></div>
   <div class="dm-done-badge ${overdueClass}">${overdueText}</div>
   <dl class="dm-done-key">
    <div><dt>Overdue</dt><dd>${s.overdueActions}</dd></div>
    <div><dt>No owner</dt><dd>${s.noOwner}</dd></div>
    <div><dt>Due in 7d</dt><dd>${s.dueSoon}</dd></div>
   </dl>
  </article>
  <article class="dm-card dm-assess">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Decisions log · ${s.totalD} record${s.totalD===1?'':'s'}</p><h3>What was decided</h3></div><span>${s.dApproved} approved</span></div>
   <div class="dm-coverage-num"><strong>${s.dApproved}</strong><span>approved decisions on record</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${s.totalD?Math.round((s.dApproved/s.totalD)*100):0}%;background:linear-gradient(90deg,#16746e,#e56f4a)"></i></div>
   <div class="dm-verdict-row">
    <span class="dm-verdict-pill go"><b>${s.dApproved}</b> approved</span>
    <span class="dm-verdict-pill review"><b>${s.dPending}</b> pending</span>
    <span class="dm-verdict-pill nogo"><b>${s.dRescinded}</b> rescinded</span>
   </div>
   <p class="dm-assess-hint">The "what did we decide?" view leadership asks for. Each decision links back to its source meeting.</p>
  </article>
 </section>`;
}

// ---------- Small helpers ----------
const infoTip=(text)=>text?`<span class="dm-info" title="${esc(text)}" aria-label="${esc(text)}" tabindex="0">i</span>`:'';

// ---------- Overview tab ----------
function overviewView(){
 const m=db.meta;
 return `${window.MMExample?.renderIntegration?.('meetings')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <div class="work-meta">
    <label class="work-field"><span>Project / programme</span><input data-field="project" value="${esc(m.project)}" placeholder="e.g. 2027 leadership rhythm"></label>
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="How this meeting rhythm fits — governance, team ops, project reviews.">${esc(m.notes)}</textarea></label>
   </div>
   ${visualDashboard()}
   <div class="work-sect-head" style="margin-top:20px"><h3>How this tool works</h3></div>
   <div class="dm-readme">
    <article>
     <h4>Meetings · the facts</h4>
     <p>Every meeting is one row on the <b>Meetings</b> grid: title, date, type, facilitator, who attended. Everything that comes out of the meeting — decisions taken, actions assigned — goes on the two other grids with the meeting code as the link.</p>
    </article>
    <article>
     <h4>Actions · what gets done</h4>
     <p>The <b>Actions</b> grid is a flat register across every meeting. Each action has one owner, a due date, a status and (optionally) a link to an objective, KPI, Gantt task, risk or issue from your other tools. The <i>overdue</i> and <i>no owner</i> flags surface in the dashboard automatically.</p>
    </article>
    <article>
     <h4>Decisions · what was decided</h4>
     <p>The <b>Decisions</b> grid answers the "what did we decide across the year?" question leadership asks for. Each decision carries who decided, context (why) and status (Approved / Pending / Rescinded). Decisions never auto-close — if a decision is reversed, mark the old one Rescinded and add the new one.</p>
    </article>
    <article>
     <h4>Linking to other tools</h4>
     <p>Open the Actions grid and the <b>Linked to</b> dropdown lists every item you've recorded in the other tools — Strategic Objectives, Theory of Change pathways, KPIs, MEAL indicators, Gantt tasks, risks and issues. Pick one and the action carries a live cross-reference the other tool can read back.</p>
    </article>
    <article>
     <h4>Customising lists</h4>
     <p>Open the <b>Settings</b> tab to change the Meeting types, Action statuses, Decision statuses or Meeting cadences. Everything feeds the dropdowns on the three grids. Rows that use a value you later remove keep it ("<i>not in list</i>" in the dropdown) so no data is ever lost.</p>
    </article>
    <article>
     <h4>Exporting & round-trip</h4>
     <p>Open the <b>Export</b> tab for an Excel workbook with four sheets (Meta, Meetings, Decisions, Actions). Importing it back updates every row by code — safe for sharing with a reviewer, editing offline, and bringing changes back in.</p>
    </article>
   </div>
   <div class="actions" style="margin-top:18px">
    <button class="button" data-action="new-meeting">+ Add a meeting</button>
    <button class="button" data-action="new-action">+ Add an action</button>
    <button class="button" data-action="new-decision">+ Add a decision</button>
    <button class="button secondary" data-action="load-example">Load example meeting rhythm</button>
    <a class="button secondary" href="#" data-tab="Meetings">Open meetings →</a>
    <a class="button secondary" href="#" data-tab="Actions">Open actions →</a>
    <a class="button secondary" href="#" data-tab="Decisions">Open decisions →</a>
   </div>
  </section>`;
}

// ---------- Inline grid cell helpers (shared pattern) ----------
function gridCellSelect(d,field,opts,kind){
 const current=String(d[field]||'');
 const flat=opts.map(o=>Array.isArray(o)?String(o[0]):String(o));
 const needsExtra=current&&!flat.includes(current);
 const allOpts=needsExtra?[[current,current+' (not in list)'],...opts]:opts;
 const options=allOpts.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${current===String(v)?'selected':''}>${esc(l||'—')}</option>`}).join('');
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(d.id)}" data-grid-field="${esc(field)}" data-grid-kind="${esc(kind)}">${options}</select>`;
}
function gridCellText(d,field,kind,ph=''){
 return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(d.id)}" data-grid-field="${esc(field)}" data-grid-kind="${esc(kind)}" value="${esc(d[field]||'')}" placeholder="${esc(ph)}" aria-label="${esc(field)}">`;
}
function gridCellDate(d,field,kind){
 return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" data-grid-id="${esc(d.id)}" data-grid-field="${esc(field)}" data-grid-kind="${esc(kind)}" value="${esc(d[field]||'')}" aria-label="${esc(field)}">`;
}
function gridCellArea(d,field,kind,ph=''){
 return `<textarea class="dm-grid-cell dm-grid-area" data-grid-id="${esc(d.id)}" data-grid-field="${esc(field)}" data-grid-kind="${esc(kind)}" rows="1" placeholder="${esc(ph)}" aria-label="${esc(field)}">${esc(d[field]||'')}</textarea>`;
}
function filterSelect(scope,key,label,opts){
 const target=scope==='meeting'?meetingFilters:scope==='action'?actionFilters:decisionFilters;
 const current=target[key]||'';
 return `<label class="dm-filt-label"><span>${esc(label)}</span><select class="dm-filt-sel" data-filter="${esc(key)}" data-filter-scope="${esc(scope)}"><option value="">All</option>${opts.map(([v,l])=>`<option value="${esc(v)}" ${current===v?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`;
}
function matchesMeetingFilters(m){
 if(meetingFilters.type && (m.type||'Team')!==meetingFilters.type)return false;
 if(meetingFilters.cadence && (m.cadence||'Ad hoc')!==meetingFilters.cadence)return false;
 if(meetingFilters.q){const q=meetingFilters.q.toLowerCase();const hay=[m.code,m.title,m.facilitator,m.attendees,m.agenda,m.location,m.notes].join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}
function matchesActionFilters(a){
 if(actionFilters.status && (a.status||'Open')!==actionFilters.status)return false;
 if(actionFilters.meeting && (a.meetingCode||'')!==actionFilters.meeting)return false;
 if(actionFilters.owner && !(a.owner||'').toLowerCase().includes(actionFilters.owner.toLowerCase()))return false;
 if(actionFilters.q){const q=actionFilters.q.toLowerCase();const hay=[a.code,a.text,a.owner,a.linkText,a.linkRef,a.notes].join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}
function matchesDecisionFilters(d){
 if(decisionFilters.status && (d.status||'Approved')!==decisionFilters.status)return false;
 if(decisionFilters.meeting && (d.meetingCode||'')!==decisionFilters.meeting)return false;
 if(decisionFilters.q){const q=decisionFilters.q.toLowerCase();const hay=[d.code,d.text,d.context,d.decidedBy,d.notes].join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}
function cellFor(d,c,kind){
 if(c.type==='select')return gridCellSelect(d,c.k,c.opts,kind);
 if(c.type==='area')return gridCellArea(d,c.k,kind);
 if(c.type==='date')return gridCellDate(d,c.k,kind);
 return gridCellText(d,c.k,kind);
}
function buildCells(d,cols,kind){
 return cols.map(c=>`<td class="dm-grid-td dm-grid-td-${c.k}" style="min-width:${c.w}px;max-width:${Math.max(c.w,160)}px">${cellFor(d,c,kind)}</td>`).join('');
}
function buildHeaders(cols){
 return cols.map(c=>`<th class="dm-grid-th" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('');
}

// ---------- Meetings grid ----------
function meetingColumns(){
 const MT=getMTypes(),CAD=getCadences();
 return {
  general:[
   {k:'code',label:'Code',w:46,type:'text',info:'Short reference like M1, M2. Auto-filled when you add a row.'},
   {k:'title',label:'Meeting title',w:220,type:'area',info:'One line that names the meeting (e.g. "November Board meeting", "Programme team weekly").'},
   {k:'date',label:'Date',w:130,type:'date',info:'When the meeting took place (or will take place). Also used to pick the next upcoming meeting on the Overview.'},
   {k:'type',label:'Type',w:140,type:'select',opts:MT,info:'Governance level (Board, Leadership, Team, Project review, Partner, Workshop…). Edit the list in Settings.'},
   {k:'cadence',label:'Cadence',w:120,type:'select',opts:CAD,info:'How often this meeting recurs. Ad hoc for one-offs. Edit the list in Settings.'}
  ],
  people:[
   {k:'facilitator',label:'Facilitator',w:150,type:'text',info:'Who ran the meeting. The person accountable for the agenda and the minutes.'},
   {k:'location',label:'Location',w:180,type:'text',info:'Physical venue or video link. Useful audit trail for remote-first teams.'},
   {k:'attendees',label:'Attendees',w:220,type:'area',info:'Everyone who was there — one per line or comma-separated.'},
   {k:'apologies',label:'Apologies',w:160,type:'area',info:'Invitees who could not attend. Needed for governance meetings where quorum matters.'}
  ],
  content:[
   {k:'agenda',label:'Agenda',w:260,type:'area',info:'Numbered list of what the meeting covered. One topic per line keeps the minutes readable.'},
   {k:'notes',label:'Notes',w:260,type:'area',info:'Context the agenda, decisions and actions do not capture (e.g. tone, carry-overs).'}
  ]
 };
}
function meetingsGridView(){
 const matching=db.meetings.filter(matchesMeetingFilters);
 const sorted=[...matching].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const filterCount=['type','cadence','q'].filter(k=>meetingFilters[k]).length;
 const MT=getMTypes(),CAD=getCadences();
 const filterBar=`<div class="dm-filter-bar">
  ${filterSelect('meeting','type','Type',MT.map(x=>[x,x]))}
  ${filterSelect('meeting','cadence','Cadence',CAD.map(x=>[x,x]))}
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" data-filter-scope="meeting" value="${esc(meetingFilters.q||'')}" placeholder="Code, title, facilitator, agenda…"></label>
  ${filterCount?`<button class="button secondary" data-action="meeting-filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.meetings.length}</b> meeting${db.meetings.length===1?'':'s'}</div>
 </div>`;
 const cols=meetingColumns();
 const rows=sorted.map(m=>{
  const decs=db.decisions.filter(d=>d.meetingCode===m.code).length;
  const acts=db.actions.filter(a=>a.meetingCode===m.code);
  const openA=acts.filter(a=>a.status!=='Done'&&a.status!=='Cancelled').length;
  const overdueA=acts.filter(a=>a.status!=='Done'&&a.status!=='Cancelled'&&isOverdue(a.due)).length;
  const upcoming=m.date&&m.date>=today();
  const flags=[];
  if(upcoming)flags.push('<small class="dm-grid-flag dm-grid-flag-ok">upcoming</small>');
  if(decs)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${decs} dec</small>`);
  if(acts.length)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${acts.length} act${openA?` · ${openA} open`:''}${overdueA?` · ${overdueA} od`:''}</small>`);
  return `<tr data-row="${esc(m.id)}" data-kind="meeting">
   <td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${upcoming?'low':'none'}">${esc(fmtDate(m.date)||'—')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}</td>
   ${buildCells(m,cols.general,'meeting')}
   ${buildCells(m,cols.people,'meeting')}
   ${buildCells(m,cols.content,'meeting')}
   <td class="dm-grid-del"><button class="link" data-action="delete-meeting" data-id="${esc(m.id)}" title="Delete meeting">✕</button></td>
  </tr>`;
 }).join('');
 const totalCols=1+cols.general.length+cols.people.length+cols.content.length+1;
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-verdict">When</th>
  <th class="dm-grid-group dm-grid-group-general" colspan="${cols.general.length}">The meeting</th>
  <th class="dm-grid-group dm-grid-group-strategy" colspan="${cols.people.length}">People & place</th>
  <th class="dm-grid-group dm-grid-group-technical" colspan="${cols.content.length}">Content</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  <th class="dm-grid-th dm-grid-th-sticky">Date${infoTip('Meeting date plus live counters: how many decisions and actions the meeting produced, and how many actions are still open or overdue.')}<br><small>Status flags</small></th>
  ${buildHeaders(cols.general)}
  ${buildHeaders(cols.people)}
  ${buildHeaders(cols.content)}
  <th class="dm-grid-th"></th>
 </tr>`;
 const emptyMsg=db.meetings.length?`<b>No meetings match these filters.</b> Clear the filters above to see all ${db.meetings.length} meetings.`:`<b>No meetings yet.</b> Click <b>+ Add row</b> below to drop a blank row into the sheet, or <b>Load examples</b> on Overview for a realistic meeting rhythm.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Meetings</h2><p>One row per meeting. The <b>When</b> column shows the date, flags upcoming meetings, and counts the decisions and actions each one produced (open · overdue). Decisions and actions live on their own tabs — this grid is the facts of the meeting itself.</p></div><div class="actions"><button class="button" data-action="new-meeting">+ Add row</button><button class="button secondary" data-action="load-example">Load examples</button></div></div>
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

// ---------- Actions grid ----------
function actionColumns(){
 const ASTAT=getAStatus();
 const items=suiteItems();
 const groups={};items.forEach(it=>{(groups[it.group]=groups[it.group]||[]).push(it)});
 // Build "linkPick" options with "source::ref" value shape; include "manual" and existing stored source if missing
 const linkOpts=[['manual','— Free text —']];
 Object.entries(groups).forEach(([g,arr])=>arr.forEach(it=>linkOpts.push([`${it.source}::${it.ref}`,`${g}: ${it.label}`])));
 const meetingOpts=[['','— unassigned —'],...db.meetings.map(m=>[m.code,`${m.code} · ${m.title||'Untitled'} (${fmtDate(m.date)||'—'})`])];
 return {
  general:[
   {k:'code',label:'Code',w:46,type:'text',info:'Short reference like A1, A2. Auto-filled when you add a row.'},
   {k:'text',label:'Action',w:260,type:'area',info:'What needs to happen, phrased as a verb. "Draft the 2027 budget" beats "Budget".'},
   {k:'meetingCode',label:'From meeting',w:200,type:'select',opts:meetingOpts,info:'Which meeting assigned this action. Leave unassigned for standalone actions that did not come out of a meeting.'}
  ],
  ownership:[
   {k:'owner',label:'Owner',w:160,type:'text',info:'The one person accountable. Not a team — a named individual. Actions without an owner appear in the "Needs attention" dashboard card.'},
   {k:'due',label:'Due',w:130,type:'date',info:'When the action is meant to be complete. "overdue" flag appears when this date passes without the status being set to Done or Cancelled.'},
   {k:'status',label:'Status',w:120,type:'select',opts:ASTAT,info:'Where the action sits now. Done and Cancelled remove the action from the open-count on the dashboard. Edit the available statuses in Settings.'},
   {k:'resolvedOn',label:'Resolved on',w:130,type:'date',info:'When the action was actually finished. Fill this when you set status to Done.'}
  ],
  link:[
   {k:'linkPick',label:'Linked to',w:200,type:'select',opts:linkOpts,info:'Pick an item from your other tools (objective, pathway, KPI, indicator, Gantt task, risk, issue) that this action supports — the other tool can read the cross-reference back. Leave on "Free text" and just type a note in the next column if nothing in the suite fits.'},
   {k:'linkText',label:'Link note',w:220,type:'area',info:'Short note describing why this is linked, or a free-text target when no suite item fits.'},
   {k:'notes',label:'Notes',w:220,type:'area',info:'Anything else useful — blockers, next step, context the owner needs.'}
  ]
 };
}
// For a given action, convert its stored linkSource/linkRef into the combined pick value.
const actionLinkPick=a=>a.linkSource==='manual'||!a.linkRef?'manual':`${a.linkSource}::${a.linkRef}`;
// Patch the select cell for linkPick to pre-select the composite value.
function actionLinkCell(a,c){
 const current=actionLinkPick(a);
 const flat=c.opts.map(o=>o[0]);
 const needsExtra=current!=='manual' && !flat.includes(current);
 const allOpts=needsExtra?[[current,current+' (not in list)'],...c.opts]:c.opts;
 const options=allOpts.map(([v,l])=>`<option value="${esc(v)}" ${current===v?'selected':''}>${esc(l)}</option>`).join('');
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(a.id)}" data-grid-field="linkPick" data-grid-kind="action">${options}</select>`;
}
function buildActionCells(a,cols){
 const parts=[];
 cols.general.forEach(c=>parts.push(`<td class="dm-grid-td dm-grid-td-${c.k}" style="min-width:${c.w}px;max-width:${Math.max(c.w,160)}px">${cellFor(a,c,'action')}</td>`));
 cols.ownership.forEach(c=>parts.push(`<td class="dm-grid-td dm-grid-td-${c.k}" style="min-width:${c.w}px;max-width:${Math.max(c.w,160)}px">${cellFor(a,c,'action')}</td>`));
 cols.link.forEach(c=>{
  if(c.k==='linkPick')parts.push(`<td class="dm-grid-td dm-grid-td-${c.k}" style="min-width:${c.w}px;max-width:${Math.max(c.w,160)}px">${actionLinkCell(a,c)}</td>`);
  else parts.push(`<td class="dm-grid-td dm-grid-td-${c.k}" style="min-width:${c.w}px;max-width:${Math.max(c.w,160)}px">${cellFor(a,c,'action')}</td>`);
 });
 return parts.join('');
}
function actionsGridView(){
 const statusOrder={'Open':0,'In progress':1,'Blocked':2,'Done':8,'Cancelled':9};
 const matching=db.actions.filter(matchesActionFilters);
 const sorted=[...matching].sort((a,b)=>(statusOrder[a.status]??5)-(statusOrder[b.status]??5)||(a.due||'9999').localeCompare(b.due||'9999'));
 const filterCount=['status','meeting','owner','q'].filter(k=>actionFilters[k]).length;
 const ASTAT=getAStatus();
 const meetingOpts=db.meetings.map(m=>[m.code,`${m.code} · ${m.title||'Untitled'}`]);
 const filterBar=`<div class="dm-filter-bar">
  ${filterSelect('action','status','Status',ASTAT.map(x=>[x,x]))}
  ${meetingOpts.length?filterSelect('action','meeting','From meeting',meetingOpts):''}
  <label class="dm-filt-label"><span>Owner contains</span><input type="search" class="dm-filt-input" data-filter="owner" data-filter-scope="action" value="${esc(actionFilters.owner||'')}" placeholder="e.g. Priya"></label>
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" data-filter-scope="action" value="${esc(actionFilters.q||'')}" placeholder="Code, action text, note…"></label>
  ${filterCount?`<button class="button secondary" data-action="action-filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.actions.length}</b> action${db.actions.length===1?'':'s'}</div>
 </div>`;
 const cols=actionColumns();
 const rows=sorted.map(a=>{
  const overdue=isOverdue(a.due)&&a.status!=='Done'&&a.status!=='Cancelled';
  const noOwner=!a.owner&&a.status!=='Done'&&a.status!=='Cancelled';
  const flags=[];
  if(overdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">overdue</small>');
  if(noOwner)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">no owner</small>');
  if(a.status==='Done'||a.status==='Cancelled')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">closed</small>');
  if(a.meetingCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${esc(a.meetingCode)}</small>`);
  if(a.linkSource&&a.linkSource!=='manual'&&a.linkRef)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">↳ ${esc(a.linkRef)}</small>`);
  const band=overdue?'critical':noOwner?'high':(a.status==='Done'||a.status==='Cancelled')?'low':'medium';
  return `<tr data-row="${esc(a.id)}" data-kind="action">
   <td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${band}">${esc(a.status||'Open')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}</td>
   ${buildActionCells(a,cols)}
   <td class="dm-grid-del"><button class="link" data-action="delete-action" data-id="${esc(a.id)}" title="Delete action">✕</button></td>
  </tr>`;
 }).join('');
 const totalCols=1+cols.general.length+cols.ownership.length+cols.link.length+1;
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-verdict">Status</th>
  <th class="dm-grid-group dm-grid-group-general" colspan="${cols.general.length}">The action</th>
  <th class="dm-grid-group dm-grid-group-likelihood" colspan="${cols.ownership.length}">Ownership</th>
  <th class="dm-grid-group dm-grid-group-technical" colspan="${cols.link.length}">Context</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  <th class="dm-grid-th dm-grid-th-sticky">Status${infoTip('Overall status plus live flags: overdue, no owner, closed. Flags are what the "Needs attention" dashboard card counts.')}<br><small>Flags</small></th>
  ${buildHeaders(cols.general)}
  ${buildHeaders(cols.ownership)}
  ${buildHeaders(cols.link)}
  <th class="dm-grid-th"></th>
 </tr>`;
 const emptyMsg=db.actions.length?`<b>No actions match these filters.</b> Clear the filters above to see all ${db.actions.length} actions.`:`<b>No actions yet.</b> Click <b>+ Add row</b> below, or <b>Load examples</b> on Overview to see realistic actions linked back to meetings.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Actions register</h2><p>Every action across every meeting, in one grid. Open and overdue items float to the top. The <b>From meeting</b> column keeps the audit trail; the <b>Linked to</b> dropdown ties each action to an objective, KPI, Gantt task or risk from the other tools.</p></div><div class="actions"><button class="button" data-action="new-action">+ Add row</button><button class="button secondary" data-action="load-example">Load examples</button></div></div>
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

// ---------- Decisions grid ----------
function decisionColumns(){
 const DSTAT=getDStatus();
 const meetingOpts=[['','— standalone —'],...db.meetings.map(m=>[m.code,`${m.code} · ${m.title||'Untitled'} (${fmtDate(m.date)||'—'})`])];
 return {
  general:[
   {k:'code',label:'Code',w:46,type:'text',info:'Short reference like D1, D2. Auto-filled when you add a row.'},
   {k:'date',label:'Date',w:130,type:'date',info:'When the decision was taken.'},
   {k:'meetingCode',label:'From meeting',w:200,type:'select',opts:meetingOpts,info:'Which meeting made the decision. Leave standalone for decisions taken outside the meeting rhythm.'},
   {k:'text',label:'Decision',w:280,type:'area',info:'State the decision as a complete sentence. "Approved the 3-month operating reserve" beats "Reserve".'},
   {k:'context',label:'Context (why)',w:260,type:'area',info:'Why the decision was taken — what prompted it, what alternatives were considered, what trade-off was accepted. Future-you needs this.'}
  ],
  governance:[
   {k:'decidedBy',label:'Decided by',w:180,type:'text',info:'Who had the authority — Board, Leadership team, Director, a specific committee. Needed for audit trail.'},
   {k:'status',label:'Status',w:120,type:'select',opts:DSTAT,info:'Approved, Pending (not yet confirmed), Rescinded (replaced by a later decision). Decisions never auto-close. Edit statuses in Settings.'},
   {k:'notes',label:'Notes',w:220,type:'area',info:'Anything else useful — review date, who was dissenting, what to communicate.'}
  ]
 };
}
function decisionsGridView(){
 const statusOrder={'Approved':0,'Pending':1,'Rescinded':9};
 const matching=db.decisions.filter(matchesDecisionFilters);
 const sorted=[...matching].sort((a,b)=>(statusOrder[a.status]??5)-(statusOrder[b.status]??5)||(b.date||'').localeCompare(a.date||''));
 const filterCount=['status','meeting','q'].filter(k=>decisionFilters[k]).length;
 const DSTAT=getDStatus();
 const meetingOpts=db.meetings.map(m=>[m.code,`${m.code} · ${m.title||'Untitled'}`]);
 const filterBar=`<div class="dm-filter-bar">
  ${filterSelect('decision','status','Status',DSTAT.map(x=>[x,x]))}
  ${meetingOpts.length?filterSelect('decision','meeting','From meeting',meetingOpts):''}
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" data-filter-scope="decision" value="${esc(decisionFilters.q||'')}" placeholder="Code, decision text, who…"></label>
  ${filterCount?`<button class="button secondary" data-action="decision-filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.decisions.length}</b> decision${db.decisions.length===1?'':'s'}</div>
 </div>`;
 const cols=decisionColumns();
 const rows=sorted.map(d=>{
  const band=d.status==='Rescinded'?'high':d.status==='Pending'?'medium':'low';
  const flags=[];
  if(d.meetingCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${esc(d.meetingCode)}</small>`);
  if(d.status==='Approved')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">live</small>');
  if(d.status==='Rescinded')flags.push('<small class="dm-grid-flag dm-grid-flag-bad">rescinded</small>');
  return `<tr data-row="${esc(d.id)}" data-kind="decision">
   <td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${band}">${esc(d.status||'Approved')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}</td>
   ${buildCells(d,cols.general,'decision')}
   ${buildCells(d,cols.governance,'decision')}
   <td class="dm-grid-del"><button class="link" data-action="delete-decision" data-id="${esc(d.id)}" title="Delete decision">✕</button></td>
  </tr>`;
 }).join('');
 const totalCols=1+cols.general.length+cols.governance.length+1;
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-verdict">Status</th>
  <th class="dm-grid-group dm-grid-group-general" colspan="${cols.general.length}">The decision</th>
  <th class="dm-grid-group dm-grid-group-technical" colspan="${cols.governance.length}">Governance</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  <th class="dm-grid-th dm-grid-th-sticky">Status${infoTip('Approved / Pending / Rescinded. Rescinded decisions stay on the register so the history is intact.')}<br><small>Flags</small></th>
  ${buildHeaders(cols.general)}
  ${buildHeaders(cols.governance)}
  <th class="dm-grid-th"></th>
 </tr>`;
 const emptyMsg=db.decisions.length?`<b>No decisions match these filters.</b> Clear the filters above to see all ${db.decisions.length} decisions.`:`<b>No decisions yet.</b> Click <b>+ Add row</b> below, or <b>Load examples</b> on Overview for a realistic set.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Decisions register</h2><p>Every decision across every meeting, newest first within each status. Rescinded decisions stay here so the history is intact — add a new decision rather than editing the old one when a decision is reversed.</p></div><div class="actions"><button class="button" data-action="new-decision">+ Add row</button><button class="button secondary" data-action="load-example">Load examples</button></div></div>
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

// ---------- Settings tab ----------
function settingsView(){
 const s=db.settings;
 const listBlock=(key,label,arr,help)=>`<article class="dm-settings-block">
  <h3>${esc(label)} ${infoTip(help)}</h3>
  <p class="muted">One value per line. First value is the fallback default on new rows.</p>
  <textarea class="dm-settings-area" data-settings-key="${esc(key)}" rows="${Math.max(arr.length+1,6)}">${esc(arr.join('\n'))}</textarea>
  <small class="dm-settings-count">${arr.length} value${arr.length===1?'':'s'}</small>
 </article>`;
 return `<div class="rowhead section-head"><div><h2>Customise meeting lists</h2><p>Adapt these lists to your governance. Every change feeds the dropdowns on the three grids straight away. If a row's value is removed from a list, that row keeps it (shown as "<i>not in list</i>" in the dropdown) so no data is ever lost.</p></div><button class="button secondary" data-action="settings-reset">Reset all to defaults</button></div>
  <div class="dm-settings-grid">
   ${listBlock('mTypes','Meeting types',s.mTypes,'The Type dropdown on the Meetings grid. Examples: Board, Leadership, Team, Project review, Partner, Workshop.')}
   ${listBlock('cadences','Meeting cadences',s.cadences,'The Cadence dropdown on the Meetings grid. Ad hoc is for one-offs; recurring cadences help the dashboard spot a missing rhythm.')}
   ${listBlock('aStatus','Action statuses',s.aStatus,'The Status dropdown on the Actions grid. Default: Open · In progress · Done · Blocked · Cancelled. "Done" and "Cancelled" are what remove an action from the open-count.')}
   ${listBlock('dStatus','Decision statuses',s.dStatus,'The Status dropdown on the Decisions grid. Default: Pending · Approved · Rescinded. Rescinded decisions stay on the register as history.')}
  </div>
  <p class="tiny" style="margin-top:14px">Changes save as you type. To undo your customisation, use <b>Reset all to defaults</b> above.</p>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year, prepared by</li><li>Meetings — one row per meeting (code, title, date, type, cadence, facilitator, attendees, location, agenda, notes)</li><li>Decisions — every decision with its meeting code and the governance trail</li><li>Actions — every action with owner, due, status and linked-to reference</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-meeting'){
  const m=blankMeeting();m.code=nextCode('M');
  db.meetings.push(m);
  if(tab==='Overview')tab='Meetings';
  save('New meeting row added. Fill it in below.');
  setTimeout(()=>{const el=root.querySelector(`tr[data-row="${m.id}"] [data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);
  return;
 }
 if(a==='new-action'){
  const act=blankAction();act.code=nextCode('A');
  db.actions.push(act);
  if(tab==='Overview')tab='Actions';
  save('New action row added. Fill it in below.');
  setTimeout(()=>{const el=root.querySelector(`tr[data-row="${act.id}"] [data-grid-field="text"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);
  return;
 }
 if(a==='new-decision'){
  const d=blankDecision();d.code=nextCode('D');
  db.decisions.push(d);
  if(tab==='Overview')tab='Decisions';
  save('New decision row added. Fill it in below.');
  setTimeout(()=>{const el=root.querySelector(`tr[data-row="${d.id}"] [data-grid-field="text"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);
  return;
 }
 if(a==='delete-meeting'){const m=db.meetings.find(x=>x.id===id);if(!m)return;const children=db.actions.filter(a=>a.meetingCode===m.code).length+db.decisions.filter(d=>d.meetingCode===m.code).length;if(!confirm(`Delete this meeting? ${children?`The ${children} linked action/decision row(s) will keep the meeting code — but you can delete them separately. `:''}Cannot be undone.`))return;db.meetings=db.meetings.filter(x=>x.id!==id);save('Meeting deleted.');return}
 if(a==='delete-action'){const act=db.actions.find(x=>x.id===id);if(!act)return;if(!confirm('Delete this action? Cannot be undone.'))return;db.actions=db.actions.filter(x=>x.id!==id);save('Action deleted.');return}
 if(a==='delete-decision'){const d=db.decisions.find(x=>x.id===id);if(!d)return;if(!confirm('Delete this decision? Cannot be undone.'))return;db.decisions=db.decisions.filter(x=>x.id!==id);save('Decision deleted.');return}
 if(a==='meeting-filter-clear'){meetingFilters={type:'',cadence:'',q:''};render();return}
 if(a==='action-filter-clear'){actionFilters={status:'',meeting:'',owner:'',q:''};render();return}
 if(a==='decision-filter-clear'){decisionFilters={status:'',meeting:'',q:''};render();return}
 if(a==='settings-reset'){
  if(!confirm('Reset meeting types, action statuses, decision statuses and cadences to defaults? Your meetings, actions and decisions keep their stored values.'))return;
  db.settings=blankSettings();
  save('Lists reset to defaults.');return;
 }
 if(a==='load-example'){
  const hasData=db.meetings.length||db.actions.length||db.decisions.length;
  if(hasData && !confirm('Replace the current meetings, actions and decisions with the worked examples? Download a backup first if you need them.'))return;
  db.meetings=makeExampleMeetings();
  db.decisions=makeExampleDecisions();
  db.actions=makeExampleActions();
  if(!db.meta.organisation)db.meta.organisation='Harvest Learning Foundation';
  if(!db.meta.project)db.meta.project='2027 leadership rhythm';
  save('Three meetings loaded with linked decisions and actions. One upcoming meeting, one overdue action and one blocked action seeded so you can see the dashboard, filters and flags in action.');
  return;
 }
 if(a==='xlsx'){try{download('Method-into-Impact-meetings.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-meetings.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-meetings-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

// ---------- Excel ----------
function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Meetings, actions & decisions',['Facilitation + rolling registers.','Meetings sheet holds the record of each meeting. Decisions and Actions sheets flatten the two registers with a meeting code column linking back.','Round-trip supported: importing this workbook back updates every row by code.']),
  metaSheet(db.meta),
  {name:'Meetings',rows:[
   ['Code','Title','Date','Type','Cadence','Facilitator','Location','Attendees','Apologies','Agenda','Notes'],
   ...(withData?db.meetings.map(m=>[m.code,m.title,m.date,m.type,m.cadence,m.facilitator,m.location,m.attendees,m.apologies,m.agenda,m.notes]):[])
  ]},
  {name:'Decisions',rows:[
   ['Code','Meeting code','Date','Decision','Context','Decided by','Status','Notes'],
   ...(withData?db.decisions.map(d=>[d.code,d.meetingCode,d.date,d.text,d.context,d.decidedBy,d.status,d.notes]):[])
  ]},
  {name:'Actions',rows:[
   ['Code','Meeting code','Action','Owner','Due','Status','Resolved on','Linked source','Linked ref','Link note','Notes'],
   ...(withData?db.actions.map(a=>[a.code,a.meetingCode,a.text,a.owner,a.due,a.status,a.resolvedOn,a.linkSource,a.linkRef,a.linkText,a.notes]):[])
  ]},
  schemaSheet({Meetings:'code,title,date,type,cadence,facilitator,location,attendees,apologies,agenda,notes',Decisions:'code,meetingCode,date,text,context,decidedBy,status,notes',Actions:'code,meetingCode,text,owner,due,status,resolvedOn,linkSource,linkRef,linkText,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const rows=[['Type','Code','From meeting','Title/Action/Decision','Owner/Decided by','Due/Date','Status'],...db.meetings.map(m=>['Meeting',m.code,'',m.title,m.facilitator,m.date,m.type]),...db.actions.map(a=>['Action',a.code,a.meetingCode,a.text,a.owner,a.due,a.status]),...db.decisions.map(d=>['Decision',d.code,d.meetingCode,d.text,d.decidedBy,d.date,d.status])];
 download('Method-into-Impact-meetings.csv',csv(rows),'text/csv;charset=utf-8');
}

async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const mRows=rowsToObjects(findSheet(data,'Meetings'));
  const dRows=rowsToObjects(findSheet(data,'Decisions'));
  const aRows=rowsToObjects(findSheet(data,'Actions'));
  if(mRows?.length)db.meetings=mRows.map(r=>({...blankMeeting(),code:r.Code||'',title:r.Title||'',date:r.Date||today(),type:r.Type||'Team',cadence:r.Cadence||'Ad hoc',facilitator:r.Facilitator||'',location:r.Location||'',attendees:r.Attendees||'',apologies:r.Apologies||'',agenda:r.Agenda||'',notes:r.Notes||''}));
  if(dRows?.length)db.decisions=dRows.map(r=>({...blankDecision(),code:r.Code||'',meetingCode:r['Meeting code']||'',date:r.Date||today(),text:r.Decision||'',context:r.Context||'',decidedBy:r['Decided by']||'',status:r.Status||'Approved',notes:r.Notes||''}));
  if(aRows?.length)db.actions=aRows.map(r=>({...blankAction(),code:r.Code||'',meetingCode:r['Meeting code']||'',text:r.Action||'',owner:r.Owner||'',due:r.Due||'',status:r.Status||'Open',resolvedOn:r['Resolved on']||'',linkSource:r['Linked source']||'manual',linkRef:r['Linked ref']||'',linkText:r['Link note']||'',notes:r.Notes||''}));
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==3)throw new Error('Not a v3 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

// ---------- Autosize helper ----------
function autosize(el){
 if(!el||el.tagName!=='TEXTAREA')return;
 el.style.height='auto';
 el.style.height=Math.max(el.scrollHeight,30)+'px';
}

// ---------- Wire Overview workspace meta ----------
function wireStart(root){
 const box=root.querySelector('.work-box');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};
 box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{
  el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()});
  el.addEventListener('change',()=>{if(el.tagName==='SELECT'){const k=el.dataset.field;db.meta[k]=el.value;schedule()}});
 });
}

// ---------- Wire Settings tab ----------
function wireSettings(root){
 const areas=root.querySelectorAll('[data-settings-key]');
 if(!areas.length)return;
 let timer;
 areas.forEach(el=>{
  autosize(el);
  el.addEventListener('input',()=>{
   const key=el.dataset.settingsKey;
   const list=el.value.split('\n').map(x=>x.trim()).filter(Boolean);
   if(list.length)db.settings[key]=list;
   const cnt=el.parentElement.querySelector('.dm-settings-count');
   if(cnt)cnt.textContent=`${list.length} value${list.length===1?'':'s'}`;
   autosize(el);
   clearTimeout(timer);timer=setTimeout(()=>persist(db),400);
  });
 });
}

// ---------- Wire grid cells ----------
function wireGrid(root){
 const grid=root.querySelector('.dm-grid');
 wireFilters(root);
 if(!grid)return;
 grid.querySelectorAll('textarea.dm-grid-area').forEach(autosize);
 let timer;
 const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);rerenderDashboard(root)},300)};
 grid.querySelectorAll('[data-grid-field]').forEach(el=>{
  const ev=(el.tagName==='SELECT'||el.type==='date')?'change':'input';
  el.addEventListener(ev,()=>{
   const id=el.dataset.gridId,f=el.dataset.gridField,kind=el.dataset.gridKind;
   const list=kind==='meeting'?db.meetings:kind==='action'?db.actions:db.decisions;
   const d=list.find(x=>x.id===id);if(!d)return;
   if(f==='linkPick'){
    const v=el.value;
    if(v==='manual'){d.linkSource='manual';d.linkRef=''}
    else{const [src,ref]=v.split('::');d.linkSource=src||'manual';d.linkRef=ref||''}
   } else {
    d[f]=el.value;
   }
   stamp(d);
   if(el.tagName==='TEXTAREA')autosize(el);
   // Score cell re-render (lightweight — just update the badge + flags)
   const row=el.closest('tr[data-row]');
   if(row){
    const cell=row.querySelector('.dm-grid-score-cell');
    if(cell){
     if(kind==='meeting'){
      const decs=db.decisions.filter(x=>x.meetingCode===d.code).length;
      const acts=db.actions.filter(x=>x.meetingCode===d.code);
      const openA=acts.filter(x=>x.status!=='Done'&&x.status!=='Cancelled').length;
      const overdueA=acts.filter(x=>x.status!=='Done'&&x.status!=='Cancelled'&&isOverdue(x.due)).length;
      const upcoming=d.date&&d.date>=today();
      const flags=[];
      if(upcoming)flags.push('<small class="dm-grid-flag dm-grid-flag-ok">upcoming</small>');
      if(decs)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${decs} dec</small>`);
      if(acts.length)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${acts.length} act${openA?` · ${openA} open`:''}${overdueA?` · ${overdueA} od`:''}</small>`);
      cell.innerHTML=`<span class="dm-verdict-badge dm-risk-band-${upcoming?'low':'none'}">${esc(fmtDate(d.date)||'—')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}`;
     } else if(kind==='action'){
      const overdue=isOverdue(d.due)&&d.status!=='Done'&&d.status!=='Cancelled';
      const noOwner=!d.owner&&d.status!=='Done'&&d.status!=='Cancelled';
      const flags=[];
      if(overdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">overdue</small>');
      if(noOwner)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">no owner</small>');
      if(d.status==='Done'||d.status==='Cancelled')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">closed</small>');
      if(d.meetingCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${esc(d.meetingCode)}</small>`);
      if(d.linkSource&&d.linkSource!=='manual'&&d.linkRef)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">↳ ${esc(d.linkRef)}</small>`);
      const band=overdue?'critical':noOwner?'high':(d.status==='Done'||d.status==='Cancelled')?'low':'medium';
      cell.innerHTML=`<span class="dm-verdict-badge dm-risk-band-${band}">${esc(d.status||'Open')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}`;
     } else {
      const band=d.status==='Rescinded'?'high':d.status==='Pending'?'medium':'low';
      const flags=[];
      if(d.meetingCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${esc(d.meetingCode)}</small>`);
      if(d.status==='Approved')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">live</small>');
      if(d.status==='Rescinded')flags.push('<small class="dm-grid-flag dm-grid-flag-bad">rescinded</small>');
      cell.innerHTML=`<span class="dm-verdict-badge dm-risk-band-${band}">${esc(d.status||'Approved')}</span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}`;
     }
    }
   }
   schedule();
  });
 });
}
function rerenderDashboard(root){
 const dash=root.querySelector('.dm-dashboard');if(!dash)return;
 const div=document.createElement('div');div.innerHTML=visualDashboard();
 const fresh=div.querySelector('.dm-dashboard');if(fresh)dash.replaceWith(fresh);
}
function wireFilters(root){
 const bar=root.querySelector('.dm-filter-bar');if(!bar)return;
 let qTimer;
 bar.querySelectorAll('[data-filter]').forEach(el=>{
  const key=el.dataset.filter;const scope=el.dataset.filterScope||'meeting';
  const target=scope==='meeting'?meetingFilters:scope==='action'?actionFilters:decisionFilters;
  if(el.tagName==='SELECT'){
   el.addEventListener('change',()=>{target[key]=el.value;render()});
  } else {
   el.addEventListener('input',()=>{clearTimeout(qTimer);qTimer=setTimeout(()=>{target[key]=el.value;render();const focused=root.querySelector(`[data-filter="${key}"][data-filter-scope="${scope}"]`);if(focused)focused.focus()},200)});
  }
 });
}

function render(){
 const views={'Overview':overviewView,'Meetings':meetingsGridView,'Actions':actionsGridView,'Decisions':decisionsGridView,'Settings':settingsView,'Export':exportViewPanel};
 if(!views[tab])tab='Overview';
 root.innerHTML=shell({eyebrow:'Cross-cutting · Meetings, actions & decisions · build 2026-10-09',title:'Meetings, Actions & Decisions',intro:'Run meetings that end with owned decisions and actions, not just notes. Three flat registers (Meetings / Actions / Decisions), each with a dashboard above. Linked across your other tools and customisable from Settings.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=3&lesson=coordination',label:'Review Module 3'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit:()=>{},importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
 wireSettings(root);
 wireGrid(root);
}

persist(db);render();
})();
