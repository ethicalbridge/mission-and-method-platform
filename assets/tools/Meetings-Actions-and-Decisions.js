/* Meetings, Actions & Decisions — one grid, one row per meeting.
   Columns are banded like Donor Mapping: Meeting | Decisions | Actions.
   Each meeting is a single table row (via rowspan on its meeting cells);
   its decisions stack vertically inside the Decisions band, its actions
   stack vertically inside the Actions band. Columns can be shown, hidden,
   renamed or added from a Columns panel, per scope.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-meetings-v4',LEGACY_V3='mission-method-meetings-v3',LEGACY_V2='mission-method-meetings-v2',LEGACY_V1='mission-method-meetings-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2',RISK_KEY='mission-method-issue-risk-v2';
const TABS=['Overview','Register','Settings','Export'];
const DEFAULT_MTYPES=['Board','Leadership','Team','Project review','Partner','Workshop','Other'];
const DEFAULT_ASTATUS=['Open','In progress','Done','Blocked','Cancelled'];
const DEFAULT_DSTATUS=['Pending','Approved','Rescinded'];
const DEFAULT_CADENCES=['Weekly','Fortnightly','Monthly','Quarterly','Ad hoc'];

// ---------- Default columns per scope ----------
const DEFAULT_MEETING_COLS=[
 {id:'m-code',scope:'meeting',label:'Code',type:'text',w:52,info:'Short reference like M1, M2. Auto-filled when you add a meeting. Change it to match your own numbering if you have one.'},
 {id:'m-title',scope:'meeting',label:'Meeting title',type:'area',w:210,info:'One line that names the meeting (e.g. "Q4 Leadership review", "November Board meeting"). Textarea auto-grows — nothing is cut.'},
 {id:'m-date',scope:'meeting',label:'Date',type:'date',w:124,info:'When the meeting took place (or will take place). Used to pick the "next upcoming" on the Overview.'},
 {id:'m-type',scope:'meeting',label:'Type',type:'mtype',w:130,info:'Governance level — Board, Leadership, Team, Project review, Partner, Workshop. Edit the list in Settings.'},
 {id:'m-cadence',scope:'meeting',label:'Cadence',type:'cadence',w:110,info:'How often it recurs. Ad hoc for one-offs. Edit the list in Settings.'},
 {id:'m-facilitator',scope:'meeting',label:'Facilitator',type:'text',w:150,info:'Who ran the meeting. The person accountable for the agenda and the minutes.'},
 {id:'m-location',scope:'meeting',label:'Location',type:'text',w:140,info:'Physical venue or video link. Useful audit trail for remote-first teams.'},
 {id:'m-attendees',scope:'meeting',label:'Attendees',type:'area',w:180,info:'Everyone who was there — one per line or comma-separated.'},
 {id:'m-apologies',scope:'meeting',label:'Apologies',type:'area',w:140,info:'Invitees who could not attend. Needed for governance meetings where quorum matters.'},
 {id:'m-agenda',scope:'meeting',label:'Agenda',type:'area',w:220,info:'Numbered list of what the meeting covered. One topic per line.'},
 {id:'m-notes',scope:'meeting',label:'Notes',type:'area',w:180,info:'Context the agenda, decisions and actions do not capture (tone, carry-overs).'}
];
const DEFAULT_DECISION_COLS=[
 {id:'d-code',scope:'decision',label:'Code',type:'text',w:48,info:'Short reference like D1, D2. Auto-filled when you add a decision inside a meeting.'},
 {id:'d-title',scope:'decision',label:'Decision',type:'area',w:240,info:'The decision taken, as a complete sentence. "Approved the 3-month operating reserve" beats "Reserve".'},
 {id:'d-context',scope:'decision',label:'Context (why)',type:'area',w:200,info:'Why the decision was taken — what prompted it, what alternatives were considered. Future-you needs this.'},
 {id:'d-decidedBy',scope:'decision',label:'Decided by',type:'text',w:150,info:'Who had the authority — Board, Leadership team, Director, a specific committee. Audit trail.'},
 {id:'d-status',scope:'decision',label:'Status',type:'dstatus',w:110,info:'Approved · Pending · Rescinded. Decisions never auto-close — add a new one rather than editing an old one. Edit statuses in Settings.'},
 {id:'d-notes',scope:'decision',label:'Notes',type:'area',w:170,info:'Review date, who was dissenting, what to communicate.'}
];
const DEFAULT_ACTION_COLS=[
 {id:'a-code',scope:'action',label:'Code',type:'text',w:48,info:'Short reference like A1, A2. Auto-filled when you add an action inside a meeting.'},
 {id:'a-title',scope:'action',label:'Action',type:'area',w:240,info:'What needs to happen, phrased as a verb. "Draft the 2027 budget" beats "Budget".'},
 {id:'a-owner',scope:'action',label:'Owner',type:'text',w:150,info:'The one person accountable. Not a team — a named individual. Actions without an owner appear in the "Needs attention" dashboard card.'},
 {id:'a-due',scope:'action',label:'Due',type:'date',w:124,info:'When the action is meant to be complete. "overdue" flag appears when this date passes without Done or Cancelled.'},
 {id:'a-status',scope:'action',label:'Status',type:'astatus',w:110,info:'Open · In progress · Done · Blocked · Cancelled. Done and Cancelled remove the action from the open-count. Edit statuses in Settings.'},
 {id:'a-linked',scope:'action',label:'Linked to',type:'linked',w:200,info:'Pick an objective, pathway, KPI, indicator, Gantt task, risk or issue from your other tools — the other tool reads the cross-reference back.'},
 {id:'a-notes',scope:'action',label:'Notes',type:'area',w:170,info:'Blockers, next step, context the owner needs.'}
];

// ---------- Blank factories ----------
const blankItem=(kind)=>({id:uid(),code:'',kind:kind||'action',parentCode:'',date:kind==='action'?'':today(),title:'',facilitator:'',attendees:'',apologies:'',location:'',agenda:'',type:'Team',cadence:'Ad hoc',owner:'',due:'',status:kind==='action'?'Open':kind==='decision'?'Approved':'',decidedBy:'',context:'',linkSource:'manual',linkRef:'',linkText:'',resolvedOn:'',notes:'',custom:{},createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',notes:''});
const blankSettings=()=>({mTypes:[...DEFAULT_MTYPES],aStatus:[...DEFAULT_ASTATUS],dStatus:[...DEFAULT_DSTATUS],cadences:[...DEFAULT_CADENCES],customColumns:[],columnOverrides:{}});
const blank=()=>({version:4,meta:blankMeta(),settings:blankSettings(),items:[]});

// ---------- Migrations ----------
function migrateV3(v3){
 const out=blank();
 try{
  if(v3?.meta)Object.assign(out.meta,v3.meta);
  if(v3?.settings)out.settings={...out.settings,...v3.settings};
  (v3?.meetings||[]).forEach(m=>out.items.push({...blankItem('meeting'),...m,kind:'meeting',parentCode:''}));
  (v3?.decisions||[]).forEach(d=>out.items.push({...blankItem('decision'),...d,kind:'decision',parentCode:d.meetingCode||'',title:d.text||d.title||''}));
  (v3?.actions||[]).forEach(a=>out.items.push({...blankItem('action'),...a,kind:'action',parentCode:a.meetingCode||'',title:a.text||a.title||''}));
 }catch(e){console.warn('v3→v4 failed',e)}
 return out;
}
function migrateV2(v2){
 const v3={version:3,meta:v2?.meta||{},meetings:[],actions:[],decisions:[]};
 try{
  (v2?.meetings||[]).forEach((m,i)=>{
   const code=m.code||'M'+(i+1);
   v3.meetings.push({code,title:m.title||'',date:m.date||today(),type:DEFAULT_MTYPES.includes(m.type)?m.type:'Team',facilitator:m.facilitator||'',attendees:m.attendees||'',apologies:m.apologies||'',location:m.location||'',agenda:m.agenda||'',notes:m.notes||''});
   (m.decisions||[]).forEach(d=>v3.decisions.push({code:'D'+(v3.decisions.length+1),meetingCode:code,date:m.date||today(),text:d.text||'',context:d.context||'',decidedBy:d.decidedBy||'',status:DEFAULT_DSTATUS.includes(d.status)?d.status:'Approved'}));
   (m.actions||[]).forEach(a=>v3.actions.push({code:'A'+(v3.actions.length+1),meetingCode:code,text:a.text||'',owner:a.owner||'',due:a.due||'',status:DEFAULT_ASTATUS.includes(a.status)?a.status:'Open',linkSource:a.linkSource||'manual',linkRef:a.linkRef||'',linkText:a.linkText||''}));
  });
 }catch(e){console.warn('v2→v3 failed',e)}
 return migrateV3(v3);
}
const migrateV1=migrateV2;

// ---------- Three worked examples ----------
function makeExamples(){
 const past14=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
 const past7=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
 const past3=new Date(Date.now()-3*86400000).toISOString().slice(0,10);
 const past10=new Date(Date.now()-10*86400000).toISOString().slice(0,10);
 const in3=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
 const in7=new Date(Date.now()+7*86400000).toISOString().slice(0,10);
 const in14=new Date(Date.now()+14*86400000).toISOString().slice(0,10);
 const row=(o)=>({...blankItem(o.kind||'action'),...o});
 return [
  row({kind:'meeting',code:'M1',date:past14,title:'Q4 Leadership review',facilitator:'Aiko Tanaka (Director)',attendees:'Aiko Tanaka · Priya Shah · Erik Johansen · Maria Lopez',apologies:'Luis Carvalho',location:'HQ boardroom + Zoom',type:'Leadership',cadence:'Quarterly',agenda:'1. Q3 results\n2. 2027 budget assumptions\n3. Harvest Impact Fund submission\n4. Lead safeguarding officer succession',notes:'Longest Q4 review on record (2h20). Carried over "fundraising split by channel" to the next session.'}),
  row({kind:'decision',code:'D1',parentCode:'M1',title:'Approve a 3-month operating reserve as a hard floor in all 2027 budget drafts',decidedBy:'Leadership team · unanimous',status:'Approved',context:'Response to risk R1 (Harvest Impact Fund decision delays). Supersedes the previous 2-month reserve policy.',notes:'Finance Director to apply before the budget leaves the Finance committee.'}),
  row({kind:'decision',code:'D2',parentCode:'M1',title:'Fast-track two reserve donor prospects by end of month',decidedBy:'Leadership team',status:'Approved',context:'Reduces exposure to Harvest decision delay. Priya to lead with Dev team.'}),
  row({kind:'decision',code:'D4',parentCode:'M1',title:'Postpone the fundraising-by-channel review to the January leadership session',decidedBy:'Leadership team',status:'Pending',context:'Not enough data from Q3 to split meaningfully. Pending Finance confirmation that the data split is feasible.',notes:'Dev team to prepare the channel view for January.'}),
  row({kind:'action',code:'A1',parentCode:'M1',title:'Draft the 2027 budget using the new 3-month reserve floor',owner:'Erik Johansen (Finance Director)',due:in14,status:'In progress',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — Harvest grant delay',notes:'First draft shared with Director; Finance committee review end of month.'}),
  row({kind:'action',code:'A2',parentCode:'M1',title:'Open conversations with Mercator Education Fund and Open Horizons',owner:'Priya Shah (Dev. Director)',due:past3,status:'Open',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — reserve prospects',notes:'Overdue — the Mercator contact is on sabbatical. Rerouted to Zara at Open Horizons.'}),
  row({kind:'action',code:'A5',parentCode:'M1',title:'Prepare the January leadership channel-split paper',owner:'Luis Carvalho (Dev team)',due:in14,status:'Open',linkSource:'manual',linkText:'Follow-up to decision D4 — fundraising review',notes:''}),
  row({kind:'action',code:'A6',parentCode:'M1',title:'Confirm succession plan for the lead safeguarding officer',owner:'Aiko Tanaka',due:past10,status:'Blocked',linkSource:'risk',linkRef:'R2',linkText:'Mitigates R2 — single point of failure',notes:'Blocked — HR is still assessing whether the role can split or needs two hires.'}),
  row({kind:'meeting',code:'M2',date:past7,title:'Programme team weekly',facilitator:'Maria Lopez (Programme Manager)',attendees:'Maria Lopez · Nia Osei · Luis Carvalho · Fatima Haidar',location:'Zoom',type:'Team',cadence:'Weekly',agenda:'1. Cohort 3 attendance\n2. MEAL baseline survey status\n3. Field tablet loss follow-up\n4. Partner MoU preparation',notes:'Fastest weekly in weeks (45 min).'}),
  row({kind:'decision',code:'D3',parentCode:'M2',title:'Enable auto-sync to cloud on every field tablet by end of week',decidedBy:'Programme team',status:'Approved',context:'Response to issue I2. Zero-cost IT change.',notes:'Maria to confirm with every field officer.'}),
  row({kind:'action',code:'A3',parentCode:'M2',title:'Enable cloud auto-sync on all 6 field tablets',owner:'Maria Lopez',due:in3,status:'In progress',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — tablet loss',notes:'4 of 6 done; waiting on 2 field officers to come back from site visits.'}),
  row({kind:'action',code:'A4',parentCode:'M2',title:'Re-collect 40 lost baseline surveys from Cohort 3',owner:'Maria Lopez · Nia Osei',due:in14,status:'Open',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — recover lost data',notes:''}),
  row({kind:'meeting',code:'M3',date:in7,title:'November Board meeting',facilitator:'Chair: Eleanor Reyes',attendees:'Full Board + Director + Finance Director',location:'HQ boardroom',type:'Board',cadence:'Quarterly',agenda:'1. Director report\n2. Q4 financial statement\n3. Harvest Impact Fund decision\n4. 2027 strategy sign-off\n5. Safeguarding incident I3 (confidential session)',notes:'Papers out 7 days ahead per policy.'})
 ];
}

const storage=S.store({key:KEY,version:4,blank,legacy:[{key:LEGACY_V3,migrate:migrateV3},{key:LEGACY_V2,migrate:migrateV2},{key:LEGACY_V1,migrate:migrateV1}],normalise:d=>{
 d=window.MMExample?.cleanupStaleExample?.(d,'mm.meetings-cleanup-v4',blank)||d;
 if(!Array.isArray(d.items))d.items=[];
 if(!d.settings||typeof d.settings!=='object')d.settings=blankSettings();
 else{
  const s=d.settings;
  if(!Array.isArray(s.mTypes)||!s.mTypes.length)s.mTypes=[...DEFAULT_MTYPES];
  if(!Array.isArray(s.aStatus)||!s.aStatus.length)s.aStatus=[...DEFAULT_ASTATUS];
  if(!Array.isArray(s.dStatus)||!s.dStatus.length)s.dStatus=[...DEFAULT_DSTATUS];
  if(!Array.isArray(s.cadences)||!s.cadences.length)s.cadences=[...DEFAULT_CADENCES];
  if(!Array.isArray(s.customColumns))s.customColumns=[];
  if(!s.columnOverrides||typeof s.columnOverrides!=='object')s.columnOverrides={};
 }
 d.items.forEach(x=>{if(!x.custom||typeof x.custom!=='object')x.custom={}});
 return d;
}});
let db=storage.load(),tab='Overview',dlg='',message='';
let filters={status:'',meeting:'',owner:'',q:''};
let columnsOpen=false;
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const getMTypes=()=>db.settings.mTypes;
const getAStatus=()=>db.settings.aStatus;
const getDStatus=()=>db.settings.dStatus;
const getCadences=()=>db.settings.cadences;
const meetings=()=>db.items.filter(x=>x.kind==='meeting');
const actionsOf=(code)=>db.items.filter(x=>x.kind==='action'&&x.parentCode===code);
const decisionsOf=(code)=>db.items.filter(x=>x.kind==='decision'&&x.parentCode===code);
const standaloneActions=()=>db.items.filter(x=>x.kind==='action'&&!x.parentCode);
const standaloneDecisions=()=>db.items.filter(x=>x.kind==='decision'&&!x.parentCode);
const allActions=()=>db.items.filter(x=>x.kind==='action');
const allDecisions=()=>db.items.filter(x=>x.kind==='decision');

// ---------- Cross-tool suite items ----------
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

const isOverdue=d=>d&&d<today();
const inNextDays=(d,n)=>{if(!d)return false;const t=new Date(today());const target=new Date(d);const diff=(target-t)/86400000;return diff>=0&&diff<=n};
const nextCode=prefix=>{const list=db.items.filter(x=>(prefix==='M'?x.kind==='meeting':prefix==='A'?x.kind==='action':x.kind==='decision'));const nums=list.map(x=>Number(String(x.code||'').replace(prefix,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};

// ---------- Dashboard ----------
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const M=meetings(),A=allActions(),D=allDecisions();
 const totalM=M.length;
 const upcoming=M.filter(m=>m.date&&m.date>=today()).sort((a,b)=>a.date.localeCompare(b.date))[0]||null;
 const past30=M.filter(m=>{if(!m.date)return false;const t=new Date(today());const d=new Date(m.date);return (t-d)/86400000<=30&&d<=t}).length;
 const open=A.filter(a=>a.status!=='Done'&&a.status!=='Cancelled').length;
 const inProg=A.filter(a=>a.status==='In progress').length;
 const done=A.filter(a=>a.status==='Done').length;
 const blocked=A.filter(a=>a.status==='Blocked').length;
 const overdueActions=A.filter(a=>isOverdue(a.due)&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const noOwner=A.filter(a=>!a.owner&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const dueSoon=A.filter(a=>inNextDays(a.due,7)&&a.status!=='Done'&&a.status!=='Cancelled').length;
 const totalOverdue=overdueActions+noOwner;
 const dApproved=D.filter(x=>x.status==='Approved').length;
 const dPending=D.filter(x=>x.status==='Pending').length;
 const dRescinded=D.filter(x=>x.status==='Rescinded').length;
 return {totalM,upcoming,past30,totalA:A.length,open,inProg,done,blocked,overdueActions,noOwner,dueSoon,totalOverdue,totalD:D.length,dApproved,dPending,dRescinded};
}
function barRow(label,count,total,cls){
 const share=pct(count,total);
 return `<div class="dm-fit-row"><div><span>${label}</span><strong>${count} · ${share}%</strong></div><span class="dm-fit-track"><i class="dm-fit-fill ${cls}" style="--share:${Math.max(share,count?3:0)}%"></i></span></div>`;
}
function visualDashboard(){
 const st=dashboardStats();
 const isEmpty=!st.totalM && !st.totalA && !st.totalD;
 let overdueClass='all-done',overdueText=`<b>✓ All clear.</b> No overdue actions and no actions without an owner.`;
 if(st.totalOverdue>5){overdueClass='early';overdueText=`<b>${st.totalOverdue} items flagged.</b> ${st.overdueActions} overdue, ${st.noOwner} without owner.`}
 else if(st.totalOverdue>0){overdueClass='half-done';overdueText=`<b>${st.totalOverdue} flagged.</b> ${st.overdueActions} overdue, ${st.noOwner} without owner.`}
 return `<section class="dm-dashboard ${isEmpty?'dm-dashboard-empty':''}" aria-label="Meetings and actions visual overview">
  <article class="dm-card dm-decision">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Meeting rhythm</p><h3>Activity view</h3></div><span>${st.totalM} meeting${st.totalM===1?'':'s'}</span></div>
   <div class="dm-donut-row">
    <div class="dm-donut" role="img" aria-label="${st.past30} meetings in the past 30 days" style="--go-share:${Math.min(st.past30*10,100)}%;--no-go-share:0%"><div><strong>${st.past30}</strong><span>Last 30d</span></div></div>
    <dl class="dm-legend">
     <div class="dm-leg-go"><dt>Last 30 days</dt><dd>${st.past30}</dd></div>
     <div class="dm-leg-review"><dt>Total logged</dt><dd>${st.totalM}</dd></div>
     <div class="dm-leg-nogo"><dt>Next up</dt><dd>${st.upcoming?esc(fmtDate(st.upcoming.date)):'—'}</dd></div>
    </dl>
   </div>
   ${st.upcoming?`<p class="dm-empty-hint" style="color:#243b45;font-weight:600">Next: ${esc(st.upcoming.title||'Untitled')} · ${esc(fmtDate(st.upcoming.date))}</p>`:(isEmpty?`<p class="dm-empty-hint">Add a meeting to start the rhythm.</p>`:`<p class="dm-empty-hint">No meeting scheduled ahead.</p>`)}
  </article>
  <article class="dm-card dm-fit">
   <div class="dm-card-head"><div><p class="dm-eyebrow">By status</p><h3>Actions distribution</h3></div><span>${st.totalA} total</span></div>
   <div class="dm-fit-list">
    ${barRow('Done',st.done,st.totalA,'dm-fit-strong')}
    ${barRow('In progress',st.inProg,st.totalA,'dm-fit-good')}
    ${barRow('Open',st.totalA?st.open-st.inProg:0,st.totalA,'dm-fit-weak')}
    ${barRow('Blocked',st.blocked,st.totalA,'dm-fit-poor')}
   </div>
   ${!st.totalA?`<p class="dm-empty-hint">Add an action to see the distribution.</p>`:''}
  </article>
  <article class="dm-card dm-coverage">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Follow-through</p><h3>Needs attention</h3></div><span>${st.totalOverdue} flagged</span></div>
   <div class="dm-coverage-num"><strong>${st.totalOverdue}</strong><span>actions overdue or without an owner</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${Math.min(st.totalOverdue*15,100)}%;background:${st.totalOverdue?'linear-gradient(90deg,#c7442b,#e56f4a)':'linear-gradient(90deg,#16746e,#4ea89f)'}"></i></div>
   <div class="dm-done-badge ${overdueClass}">${overdueText}</div>
   <dl class="dm-done-key">
    <div><dt>Overdue</dt><dd>${st.overdueActions}</dd></div>
    <div><dt>No owner</dt><dd>${st.noOwner}</dd></div>
    <div><dt>Due in 7d</dt><dd>${st.dueSoon}</dd></div>
   </dl>
  </article>
  <article class="dm-card dm-assess">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Decisions log · ${st.totalD} record${st.totalD===1?'':'s'}</p><h3>What was decided</h3></div><span>${st.dApproved} approved</span></div>
   <div class="dm-coverage-num"><strong>${st.dApproved}</strong><span>approved decisions on record</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${st.totalD?Math.round((st.dApproved/st.totalD)*100):0}%;background:linear-gradient(90deg,#16746e,#e56f4a)"></i></div>
   <div class="dm-verdict-row">
    <span class="dm-verdict-pill go"><b>${st.dApproved}</b> approved</span>
    <span class="dm-verdict-pill review"><b>${st.dPending}</b> pending</span>
    <span class="dm-verdict-pill nogo"><b>${st.dRescinded}</b> rescinded</span>
   </div>
   <p class="dm-assess-hint">Decisions live inside their meeting on the Register — one row per meeting, decisions stacked in the middle band, actions in the right band.</p>
  </article>
 </section>`;
}

// ---------- Column pipeline (per scope) ----------
function allColumns(scope){
 const overrides=db.settings.columnOverrides||{};
 const base=scope==='meeting'?DEFAULT_MEETING_COLS:scope==='decision'?DEFAULT_DECISION_COLS:DEFAULT_ACTION_COLS;
 const defaults=base.map(c=>{const o=overrides[c.id]||{};return {...c,label:o.label??c.label,hidden:!!o.hidden,custom:false}});
 const custom=(db.settings.customColumns||[]).filter(c=>c.scope===scope).map(c=>({...c,custom:true,hidden:!!c.hidden,info:c.info||'Custom column — added from the Columns panel.'}));
 return [...defaults,...custom];
}
const visibleColumns=(scope)=>allColumns(scope).filter(c=>!c.hidden);

// ---------- Small helpers ----------
const infoTip=(text)=>text?`<span class="dm-info" title="${esc(text)}" aria-label="${esc(text)}" tabindex="0">i</span>`:'';
const stripScope=(id)=>id.replace(/^[mda]-/,'');

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
     <h4>One row per meeting · three bands</h4>
     <p>The Register has three column bands: <b>Meeting</b> (left), <b>Decisions</b> (middle), <b>Actions</b> (right). Each meeting is a single row. Its decisions stack vertically inside the middle band; its actions stack vertically inside the right band — everything that came out of the meeting is in the same horizontal row.</p>
    </article>
    <article>
     <h4>Inline editing · nothing is cut</h4>
     <p>Click any cell to edit. Textareas auto-grow to fit the whole text — no truncation. Changes save as you type and the dashboard above updates live. "+ Add decision" and "+ Add action" buttons live inside each meeting block.</p>
    </article>
    <article>
     <h4>Customise the columns</h4>
     <p>Use the <b>⚙ Columns</b> button to show, hide, rename or delete any column — in any of the three bands — or add brand-new custom columns (text, long text, date, dropdown). Rows keep every stored value even if you later hide its column.</p>
    </article>
    <article>
     <h4>Linking across tools</h4>
     <p>The <b>Linked to</b> column on an action lets you tie it to an objective, pathway, KPI, indicator, Gantt task, risk or issue from your other tools — the other tool reads the cross-reference back.</p>
    </article>
    <article>
     <h4>Customising lists</h4>
     <p>Open the <b>Settings</b> tab to change the Meeting types, Action statuses, Decision statuses or Cadences. Rows that use a removed value keep it ("<i>not in list</i>" in the dropdown) so no data is ever lost.</p>
    </article>
    <article>
     <h4>Exporting &amp; round-trip</h4>
     <p>Open the <b>Export</b> tab for an Excel workbook with sheets for Meetings, Decisions and Actions. Importing it back updates every row by code. Custom columns round-trip as extra labelled columns.</p>
    </article>
   </div>
   <div class="actions" style="margin-top:18px">
    <button class="button" data-action="new-meeting">+ Add a meeting</button>
    <button class="button secondary" data-action="load-example">Load 3 example meetings</button>
    <a class="button secondary" href="#" data-tab="Register">Open the register →</a>
   </div>
  </section>`;
}

// ---------- Cell renderers ----------
function cellInput(row,field,ph=''){return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}" value="${esc(row[field]||'')}" placeholder="${esc(ph)}">`}
function cellArea(row,field,ph=''){return `<textarea class="dm-grid-cell dm-grid-area" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}" rows="1" placeholder="${esc(ph)}">${esc(row[field]||'')}</textarea>`}
function cellDate(row,field){return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}" value="${esc(row[field]||'')}">`}
function cellSelect(row,field,opts){
 const current=String(row[field]||'');
 const flat=opts.map(o=>Array.isArray(o)?String(o[0]):String(o));
 const needsExtra=current&&!flat.includes(current);
 const all=needsExtra?[[current,current+' (not in list)'],...opts]:opts;
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}">${all.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${current===String(v)?'selected':''}>${esc(l||'—')}</option>`}).join('')}</select>`;
}
function cellCustom(row,col){
 const val=row.custom?.[col.id]||'';
 const base=`data-grid-id="${esc(row.id)}" data-grid-field="custom:${esc(col.id)}"`;
 if(col.type==='select'){const opts=col.opts||[];return `<select class="dm-grid-cell dm-grid-sel" ${base}><option value=""></option>${opts.map(o=>`<option value="${esc(o)}" ${val===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`}
 if(col.type==='date')return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" ${base} value="${esc(val)}">`;
 if(col.type==='area')return `<textarea class="dm-grid-cell dm-grid-area" ${base} rows="1">${esc(val)}</textarea>`;
 return `<input class="dm-grid-cell dm-grid-input" ${base} value="${esc(val)}">`;
}
function cellLinked(row){
 const items=suiteItems();
 const groups={};items.forEach(it=>{(groups[it.group]=groups[it.group]||[]).push(it)});
 const combined=row.linkSource==='manual'||!row.linkRef?'manual':`${row.linkSource}::${row.linkRef}`;
 const options=[`<option value="manual" ${combined==='manual'?'selected':''}>— Free text —</option>`];
 Object.entries(groups).forEach(([g,arr])=>{options.push(`<optgroup label="${esc(g)}">`);arr.forEach(it=>{const v=`${it.source}::${it.ref}`;options.push(`<option value="${esc(v)}" ${combined===v?'selected':''}>${esc(it.label)}</option>`)});options.push('</optgroup>')});
 if(combined!=='manual'&&!items.find(it=>`${it.source}::${it.ref}`===combined))options.unshift(`<option value="${esc(combined)}" selected>${esc(combined)} (missing)</option>`);
 const sel=`<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(row.id)}" data-grid-field="linkPick">${options.join('')}</select>`;
 const txt=`<input class="dm-grid-cell dm-grid-input dm-grid-linknote" data-grid-id="${esc(row.id)}" data-grid-field="linkText" value="${esc(row.linkText||'')}" placeholder="free-text note">`;
 return `<div class="dm-grid-linked-stack">${sel}${txt}</div>`;
}
function renderCell(row,col){
 if(col.custom)return cellCustom(row,col);
 const f=stripScope(col.id);
 // Meeting scope
 if(col.scope==='meeting'){
  if(f==='type')return cellSelect(row,'type',getMTypes().map(x=>[x,x]));
  if(f==='cadence')return cellSelect(row,'cadence',getCadences().map(x=>[x,x]));
  if(f==='date')return cellDate(row,'date');
  if(['title','attendees','apologies','agenda','notes'].includes(f))return cellArea(row,f);
  return cellInput(row,f);
 }
 // Decision scope
 if(col.scope==='decision'){
  if(f==='status')return cellSelect(row,'status',getDStatus().map(x=>[x,x]));
  if(['title','context','notes'].includes(f))return cellArea(row,f);
  return cellInput(row,f);
 }
 // Action scope
 if(col.scope==='action'){
  if(f==='status')return cellSelect(row,'status',getAStatus().map(x=>[x,x]));
  if(f==='due')return cellDate(row,'due');
  if(f==='linked')return cellLinked(row);
  if(['title','notes'].includes(f))return cellArea(row,f);
  return cellInput(row,f);
 }
 return '<div class="dm-grid-na">—</div>';
}

// ---------- Filters ----------
function meetingVisible(m){
 if(filters.meeting && m.code!==filters.meeting)return false;
 if(!filters.status && !filters.owner && !filters.q)return true;
 // A meeting passes if ANY of its children match the owner/status/q filter, or itself matches
 const kids=[...decisionsOf(m.code),...actionsOf(m.code)];
 const hay=(r)=>[r.code,r.title,r.owner,r.decidedBy,r.facilitator,r.attendees,r.agenda,r.notes,r.context,r.linkText,r.linkRef].join(' ').toLowerCase();
 const matchesSelf=
  (!filters.status || (m.status||'')===filters.status) &&
  (!filters.owner || (m.facilitator||'').toLowerCase().includes(filters.owner.toLowerCase())) &&
  (!filters.q || hay(m).includes(filters.q.toLowerCase()));
 const matchesChild=kids.some(k=>
  (!filters.status || (k.status||'')===filters.status) &&
  (!filters.owner || ((k.owner||k.decidedBy||'').toLowerCase().includes(filters.owner.toLowerCase()))) &&
  (!filters.q || hay(k).includes(filters.q.toLowerCase()))
 );
 return matchesSelf||matchesChild;
}
function childVisible(child){
 if(filters.status && (child.status||'')!==filters.status)return false;
 if(filters.owner){const o=(child.owner||child.decidedBy||'').toLowerCase();if(!o.includes(filters.owner.toLowerCase()))return false}
 if(filters.q){const q=filters.q.toLowerCase();const hay=[child.code,child.title,child.owner,child.decidedBy,child.notes,child.context,child.linkText,child.linkRef].join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}

// ---------- Column editor ----------
function columnEditorPanel(){
 if(!columnsOpen)return '';
 const scopeBlock=(scope,label)=>{
  const cols=allColumns(scope);
  const rows=cols.map(c=>{
   const canDel=c.custom;
   const canHide=!(stripScope(c.id)==='code');
   return `<li class="dm-col-row">
    <label class="dm-col-vis"><input type="checkbox" data-col-action="toggle-hide" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" ${c.hidden?'':'checked'} ${canHide?'':'disabled'}><span>${canHide?'Show':'Required'}</span></label>
    <input class="dm-col-label" data-col-action="rename" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" value="${esc(c.label)}" aria-label="Column label">
    <span class="dm-col-type">${esc(c.custom?(c.type||'text'):c.type)}${c.custom?' · custom':''}</span>
    ${canDel?`<button class="link danger" data-action="delete-column" data-col-id="${esc(c.id)}" title="Delete this custom column">✕</button>`:'<span></span>'}
   </li>`;
  }).join('');
  return `<section class="dm-col-scope"><h4>${esc(label)}</h4><ul class="dm-col-list">${rows}</ul></section>`;
 };
 return `<section class="dm-col-panel">
  <div class="dm-col-head"><h3>Columns ${infoTip('Show, hide, rename or delete columns in each band. Hidden columns keep every stored value — unhide them any time.')}</h3><button class="link" data-action="toggle-columns">✕ Close</button></div>
  <div class="dm-col-scopes">
   ${scopeBlock('meeting','Meeting band')}
   ${scopeBlock('decision','Decisions band')}
   ${scopeBlock('action','Actions band')}
  </div>
  <form class="dm-col-add" data-form="add-column" onsubmit="return false">
   <label><span>Add to band</span><select name="scope"><option value="meeting">Meeting</option><option value="decision">Decisions</option><option value="action">Actions</option></select></label>
   <label><span>New column name</span><input name="label" placeholder="e.g. Priority, Budget line, Follow-up date" required></label>
   <label><span>Type</span><select name="type"><option value="text">Short text</option><option value="area">Long text (auto-grow)</option><option value="date">Date</option><option value="select">Dropdown</option></select></label>
   <label class="dm-col-opts"><span>Dropdown options (one per line — only for Dropdown)</span><textarea name="opts" rows="2" placeholder="Low&#10;Medium&#10;High"></textarea></label>
   <button class="button" data-action="add-column">+ Add column</button>
  </form>
 </section>`;
}

// ---------- Register (one grid, three bands, meetings as rows) ----------
function registerView(){
 const mCols=visibleColumns('meeting');
 const dCols=visibleColumns('decision');
 const aCols=visibleColumns('action');
 const totalCols=mCols.length+dCols.length+aCols.length+1; // +1 for actions column (delete)
 const meetingList=meetings().filter(meetingVisible).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const total=meetings().length;
 const filterCount=['status','meeting','owner','q'].filter(k=>filters[k]).length;
 const meetingOpts=meetings().map(m=>[m.code,`${m.code} · ${m.title||'Untitled'}`]);
 const allStatuses=Array.from(new Set([...getAStatus(),...getDStatus()]));
 const filterBar=`<div class="dm-filter-bar">
  <label class="dm-filt-label"><span>Status</span><select class="dm-filt-sel" data-filter="status"><option value="">All</option>${allStatuses.map(st=>`<option value="${esc(st)}" ${filters.status===st?'selected':''}>${esc(st)}</option>`).join('')}</select></label>
  ${meetingOpts.length?`<label class="dm-filt-label"><span>Meeting</span><select class="dm-filt-sel" data-filter="meeting"><option value="">All</option>${meetingOpts.map(([v,l])=>`<option value="${esc(v)}" ${filters.meeting===v?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`:''}
  <label class="dm-filt-label"><span>Owner / Decided-by contains</span><input class="dm-filt-input" data-filter="owner" value="${esc(filters.owner||'')}" placeholder="e.g. Priya"></label>
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" value="${esc(filters.q||'')}" placeholder="Any text in any row…"></label>
  ${filterCount?`<button class="button secondary" data-action="filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${meetingList.length}</b> of <b>${total}</b> meeting${total===1?'':'s'}</div>
 </div>`;
 // Banded group header
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-general" colspan="${mCols.length}">🗣 Meeting${infoTip('The meeting record itself: when, who, where, what was on the agenda.')}</th>
  <th class="dm-grid-group dm-grid-group-strategy" colspan="${dCols.length}">⚖ Decisions${infoTip('Decisions taken in this meeting. Each decision is its own row inside this band.')}</th>
  <th class="dm-grid-group dm-grid-group-risk" colspan="${aCols.length}">✓ Actions${infoTip('Actions assigned in this meeting. Each action is its own row inside this band.')}</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  ${mCols.map(c=>`<th class="dm-grid-th dm-grid-th-m" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('')}
  ${dCols.map(c=>`<th class="dm-grid-th dm-grid-th-d" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('')}
  ${aCols.map(c=>`<th class="dm-grid-th dm-grid-th-a" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('')}
  <th class="dm-grid-th"></th>
 </tr>`;
 // Rows
 const buildMeetingBlock=(m)=>{
  const decs=decisionsOf(m.code).filter(childVisible);
  const acts=actionsOf(m.code).filter(childVisible);
  const totalChildRows=Math.max(decs.length,acts.length,0)+1; // +1 for "+ Add" row
  const trs=[];
  for(let i=0;i<totalChildRows;i++){
   let html=`<tr class="dm-row-meeting dm-row-sub-${i===0?'first':i===totalChildRows-1?'addrow':'mid'}">`;
   // Meeting cells (only on first sub-row, with rowspan)
   if(i===0){
    mCols.forEach(c=>{html+=`<td class="dm-grid-td dm-grid-td-m dm-grid-td-${c.id}" rowspan="${totalChildRows}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(m,c)}</td>`});
   }
   // Decision cells for this sub-row
   if(i<decs.length){
    dCols.forEach(c=>{html+=`<td class="dm-grid-td dm-grid-td-d dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(decs[i],c)}</td>`});
   } else if(i===totalChildRows-1){
    html+=`<td class="dm-grid-td dm-nest-add" colspan="${dCols.length}"><button class="link" data-action="new-decision-in" data-meeting="${esc(m.code)}">+ Add decision</button></td>`;
   } else {
    html+=`<td class="dm-grid-td dm-nest-empty" colspan="${dCols.length}">·</td>`;
   }
   // Action cells for this sub-row
   if(i<acts.length){
    aCols.forEach(c=>{html+=`<td class="dm-grid-td dm-grid-td-a dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(acts[i],c)}</td>`});
   } else if(i===totalChildRows-1){
    html+=`<td class="dm-grid-td dm-nest-add" colspan="${aCols.length}"><button class="link" data-action="new-action-in" data-meeting="${esc(m.code)}">+ Add action</button></td>`;
   } else {
    html+=`<td class="dm-grid-td dm-nest-empty" colspan="${aCols.length}">·</td>`;
   }
   // Delete column: delete button for the sub-row's child, or (on first row only) delete-meeting
   if(i===0){
    html+=`<td class="dm-grid-del dm-grid-del-meeting" rowspan="${totalChildRows}"><button class="link" data-action="delete-meeting" data-id="${esc(m.id)}" title="Delete this meeting">✕</button></td>`;
   }
   html+='</tr>';
   trs.push(html);
   // On non-first, non-last rows, add per-child delete buttons as a parallel action in the Decision/Action cells themselves? No, simpler: add delete inside each child's row via a tiny overlay.
  }
  // Add per-child delete via a dedicated small cell at the end of each sub-row? We used rowspan for the main delete col.
  // Simpler alt: embed the delete per sub-row inside the "Code" cell as a hover ✕ (handled in CSS).
  return trs.join('');
 };
 const rows=meetingList.map(buildMeetingBlock).join('');
 // Standalone bucket
 const sDecs=standaloneDecisions().filter(childVisible);
 const sActs=standaloneActions().filter(childVisible);
 let standaloneRows='';
 if(sDecs.length||sActs.length){
  const totalChildRows=Math.max(sDecs.length,sActs.length,0)+1;
  const trs=[];
  for(let i=0;i<totalChildRows;i++){
   let html='<tr class="dm-row-standalone">';
   if(i===0){
    html+=`<td class="dm-grid-td dm-standalone-head" colspan="${mCols.length}" rowspan="${totalChildRows}"><div><b>Standalone</b><br><small>Decisions and actions not attached to a meeting. Fill in a <b>Meeting</b> code on a child to move it under a meeting.</small></div></td>`;
   }
   if(i<sDecs.length){
    dCols.forEach(c=>{html+=`<td class="dm-grid-td dm-grid-td-d dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(sDecs[i],c)}</td>`});
   } else if(i===totalChildRows-1){
    html+=`<td class="dm-grid-td dm-nest-add" colspan="${dCols.length}"><button class="link" data-action="new-decision-standalone">+ Add decision</button></td>`;
   } else {
    html+=`<td class="dm-grid-td dm-nest-empty" colspan="${dCols.length}">·</td>`;
   }
   if(i<sActs.length){
    aCols.forEach(c=>{html+=`<td class="dm-grid-td dm-grid-td-a dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(sActs[i],c)}</td>`});
   } else if(i===totalChildRows-1){
    html+=`<td class="dm-grid-td dm-nest-add" colspan="${aCols.length}"><button class="link" data-action="new-action-standalone">+ Add action</button></td>`;
   } else {
    html+=`<td class="dm-grid-td dm-nest-empty" colspan="${aCols.length}">·</td>`;
   }
   if(i===0)html+=`<td class="dm-grid-del" rowspan="${totalChildRows}"></td>`;
   html+='</tr>';
   trs.push(html);
  }
  standaloneRows=trs.join('');
 }
 const emptyMsg=total?`<b>No meetings match these filters.</b> Clear filters to see all ${total} meetings.`:`<b>Empty register.</b> Click + Add meeting below, or <b>Load 3 example meetings</b> on Overview.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Integrated register</h2><p>One row per meeting. Decisions stack in the middle band, actions in the right band — everything that came out of a meeting is read horizontally in that meeting's row. Hover a column header's <span class="dm-info-inline">i</span> for a brief explanation.</p></div>
   <div class="actions dm-toolbar">
    <button class="button" data-action="new-meeting">+ Add meeting</button>
    <button class="button secondary ${columnsOpen?'is-active':''}" data-action="toggle-columns">⚙ Columns${columnsOpen?' ✕':''}</button>
    <button class="button secondary" data-action="load-example">Load examples</button>
   </div>
  </div>
  ${columnEditorPanel()}
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid dm-grid-meetings">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}${standaloneRows}</tbody>
   </table>
  </div>`;
}

// ---------- Settings ----------
function settingsView(){
 const s=db.settings;
 const listBlock=(key,label,arr,help)=>`<article class="dm-settings-block">
  <h3>${esc(label)} ${infoTip(help)}</h3>
  <p class="muted">One value per line. First value is the fallback default on new rows.</p>
  <textarea class="dm-settings-area" data-settings-key="${esc(key)}" rows="${Math.max(arr.length+1,6)}">${esc(arr.join('\n'))}</textarea>
  <small class="dm-settings-count">${arr.length} value${arr.length===1?'':'s'}</small>
 </article>`;
 return `<div class="rowhead section-head"><div><h2>Customise lists</h2><p>Adapt the dropdown lists to your governance. Rows that use a removed value keep it ("<i>not in list</i>" in the dropdown) so no data is ever lost. Columns themselves are edited from the <b>⚙ Columns</b> button on the Register tab.</p></div><button class="button secondary" data-action="settings-reset">Reset lists to defaults</button></div>
  <div class="dm-settings-grid">
   ${listBlock('mTypes','Meeting types',s.mTypes,'Board, Leadership, Team, Project review, Partner, Workshop, Other.')}
   ${listBlock('cadences','Meeting cadences',s.cadences,'How often a recurring meeting repeats. Ad hoc for one-offs.')}
   ${listBlock('aStatus','Action statuses',s.aStatus,'Default: Open · In progress · Done · Blocked · Cancelled.')}
   ${listBlock('dStatus','Decision statuses',s.dStatus,'Default: Pending · Approved · Rescinded. Rescinded decisions stay on the register as history.')}
  </div>
  <p class="tiny" style="margin-top:14px">Changes save as you type. To undo your customisation, use <b>Reset lists to defaults</b> above.</p>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year, prepared by</li><li>Meetings — the meeting records</li><li>Decisions — every decision with its meeting code and governance trail</li><li>Actions — every action with owner, due, status and linked-to reference</li><li>Custom columns round-trip as additional labelled columns on each sheet</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='toggle-columns'){columnsOpen=!columnsOpen;render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-meeting'){const r=blankItem('meeting');r.code=nextCode('M');db.items.push(r);if(tab==='Overview')tab='Register';save('Meeting added.');setTimeout(()=>{const el=root.querySelector(`[data-grid-id="${r.id}"][data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='new-decision-in'){const mc=el.dataset.meeting;const r=blankItem('decision');r.code=nextCode('D');r.parentCode=mc;db.items.push(r);save('Decision added.');setTimeout(()=>{const el=root.querySelector(`[data-grid-id="${r.id}"][data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='new-action-in'){const mc=el.dataset.meeting;const r=blankItem('action');r.code=nextCode('A');r.parentCode=mc;db.items.push(r);save('Action added.');setTimeout(()=>{const el=root.querySelector(`[data-grid-id="${r.id}"][data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='new-decision-standalone'){const r=blankItem('decision');r.code=nextCode('D');db.items.push(r);save('Standalone decision added.');return}
 if(a==='new-action-standalone'){const r=blankItem('action');r.code=nextCode('A');db.items.push(r);save('Standalone action added.');return}
 if(a==='delete-meeting'){const m=db.items.find(x=>x.id===id);if(!m)return;const kids=db.items.filter(x=>x.parentCode===m.code).length;if(!confirm(`Delete meeting ${m.code} (${m.title||'Untitled'})? ${kids?`${kids} linked decision/action row(s) will be kept and moved to Standalone. `:''}Cannot be undone.`))return;db.items.filter(x=>x.parentCode===m.code).forEach(x=>x.parentCode='');db.items=db.items.filter(x=>x.id!==m.id);save('Meeting deleted; children moved to Standalone.');return}
 if(a==='filter-clear'){filters={status:'',meeting:'',owner:'',q:''};render();return}
 if(a==='settings-reset'){if(!confirm('Reset meeting types, action statuses, decision statuses and cadences to defaults? Your rows keep their stored values.'))return;Object.assign(db.settings,blankSettings(),{customColumns:db.settings.customColumns,columnOverrides:db.settings.columnOverrides});save('Lists reset to defaults.');return}
 if(a==='delete-column'){const colId=el.dataset.colId;const col=db.settings.customColumns.find(c=>c.id===colId);if(!col)return;if(!confirm(`Delete the custom column "${col.label}"? Values stored in this column will also be removed.`))return;db.settings.customColumns=db.settings.customColumns.filter(c=>c.id!==colId);db.items.forEach(r=>{if(r.custom)delete r.custom[colId]});save('Column deleted.');return}
 if(a==='add-column'){
  const form=root.querySelector('form[data-form="add-column"]');if(!form)return;
  const label=form.label.value.trim();if(!label){alert('Give the column a name first.');return}
  const scope=form.scope.value;
  const type=form.type.value;
  const opts=type==='select'?form.opts.value.split('\n').map(x=>x.trim()).filter(Boolean):[];
  if(type==='select'&&!opts.length){alert('Add at least one dropdown option (one per line).');return}
  const id=scope.charAt(0)+'-c-'+uid();  // m-c-xxx / d-c-xxx / a-c-xxx
  db.settings.customColumns.push({id,scope,label,type,opts,hidden:false});
  save(`Added "${label}" to the ${scope==='meeting'?'Meeting':scope==='decision'?'Decisions':'Actions'} band.`);
  return;
 }
 if(a==='load-example'){
  if(db.items.length && !confirm('Replace the current register with the three example meetings and their linked decisions and actions?'))return;
  db.items=makeExamples();
  if(!db.meta.organisation)db.meta.organisation='Harvest Learning Foundation';
  if(!db.meta.project)db.meta.project='2027 leadership rhythm';
  tab='Register';
  save('Three example meetings loaded with linked decisions and actions. One upcoming meeting, one overdue action and one blocked action seeded.');
  return;
 }
 if(a==='delete-child'){const r=db.items.find(x=>x.id===id);if(!r)return;if(!confirm(`Delete this ${r.kind}? Cannot be undone.`))return;db.items=db.items.filter(x=>x.id!==id);save(`${r.kind.charAt(0).toUpperCase()+r.kind.slice(1)} deleted.`);return}
 if(a==='xlsx'){try{download('Method-into-Impact-meetings.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-meetings.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-meetings-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

// ---------- Excel ----------
function customColumnValuesFor(row,scope){
 const out={};
 (db.settings.customColumns||[]).filter(c=>c.scope===scope).forEach(c=>{out[c.label]=row.custom?.[c.id]||''});
 return out;
}
function buildWorkbook(withData){
 const mCustom=(db.settings.customColumns||[]).filter(c=>c.scope==='meeting').map(c=>c.label);
 const dCustom=(db.settings.customColumns||[]).filter(c=>c.scope==='decision').map(c=>c.label);
 const aCustom=(db.settings.customColumns||[]).filter(c=>c.scope==='action').map(c=>c.label);
 const M=meetings(),A=allActions(),D=allDecisions();
 const sheets=[
  readmeSheet('Meetings, actions & decisions',['One integrated register. Meetings have one row each; their decisions and actions live inside the same row (middle and right column bands).','Round-trip supported: importing this workbook back updates every row by code. Custom columns round-trip as additional labelled columns.']),
  metaSheet(db.meta),
  {name:'Meetings',rows:[
   ['Code','Title','Date','Type','Cadence','Facilitator','Location','Attendees','Apologies','Agenda','Notes',...mCustom],
   ...(withData?M.map(m=>{const cv=customColumnValuesFor(m,'meeting');return [m.code,m.title,m.date,m.type,m.cadence,m.facilitator,m.location,m.attendees,m.apologies,m.agenda,m.notes,...mCustom.map(l=>cv[l]||'')]}):[])
  ]},
  {name:'Decisions',rows:[
   ['Code','Meeting code','Decision','Context','Decided by','Status','Notes',...dCustom],
   ...(withData?D.map(d=>{const cv=customColumnValuesFor(d,'decision');return [d.code,d.parentCode,d.title,d.context,d.decidedBy,d.status,d.notes,...dCustom.map(l=>cv[l]||'')]}):[])
  ]},
  {name:'Actions',rows:[
   ['Code','Meeting code','Action','Owner','Due','Status','Resolved on','Linked source','Linked ref','Link note','Notes',...aCustom],
   ...(withData?A.map(a=>{const cv=customColumnValuesFor(a,'action');return [a.code,a.parentCode,a.title,a.owner,a.due,a.status,a.resolvedOn,a.linkSource,a.linkRef,a.linkText,a.notes,...aCustom.map(l=>cv[l]||'')]}):[])
  ]},
  schemaSheet({Meetings:'code,title,date,type,cadence,facilitator,location,attendees,apologies,agenda,notes',Decisions:'code,parentCode,title,context,decidedBy,status,notes',Actions:'code,parentCode,title,owner,due,status,resolvedOn,linkSource,linkRef,linkText,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const rows=[['Kind','Code','Meeting','Title','Who','Date/Due','Status']];
 meetings().forEach(m=>{
  rows.push(['Meeting',m.code,'',m.title,m.facilitator,m.date,m.type]);
  decisionsOf(m.code).forEach(d=>rows.push(['Decision',d.code,m.code,d.title,d.decidedBy,'',d.status]));
  actionsOf(m.code).forEach(a=>rows.push(['Action',a.code,m.code,a.title,a.owner,a.due,a.status]));
 });
 standaloneDecisions().forEach(d=>rows.push(['Decision',d.code,'',d.title,d.decidedBy,'',d.status]));
 standaloneActions().forEach(a=>rows.push(['Action',a.code,'',a.title,a.owner,a.due,a.status]));
 download('Method-into-Impact-meetings.csv',csv(rows),'text/csv;charset=utf-8');
}
async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const mRows=rowsToObjects(findSheet(data,'Meetings'));
  const dRows=rowsToObjects(findSheet(data,'Decisions'));
  const aRows=rowsToObjects(findSheet(data,'Actions'));
  const customById=(db.settings.customColumns||[]).reduce((o,c)=>{o[c.scope+':'+c.label]=c.id;return o},{});
  const applyCustom=(row,source,scope)=>{Object.keys(source).forEach(l=>{const id=customById[scope+':'+l];if(id&&source[l]!=null&&source[l]!==''){row.custom=row.custom||{};row.custom[id]=source[l]}})};
  if(mRows?.length||dRows?.length||aRows?.length)db.items=[];
  (mRows||[]).forEach(r=>{const row={...blankItem('meeting'),code:r.Code||'',title:r.Title||'',date:r.Date||today(),type:r.Type||'Team',cadence:r.Cadence||'Ad hoc',facilitator:r.Facilitator||'',location:r.Location||'',attendees:r.Attendees||'',apologies:r.Apologies||'',agenda:r.Agenda||'',notes:r.Notes||''};applyCustom(row,r,'meeting');db.items.push(row)});
  (dRows||[]).forEach(r=>{const row={...blankItem('decision'),code:r.Code||'',parentCode:r['Meeting code']||'',title:r.Decision||'',context:r.Context||'',decidedBy:r['Decided by']||'',status:r.Status||'Approved',notes:r.Notes||''};applyCustom(row,r,'decision');db.items.push(row)});
  (aRows||[]).forEach(r=>{const row={...blankItem('action'),code:r.Code||'',parentCode:r['Meeting code']||'',title:r.Action||'',owner:r.Owner||'',due:r.Due||'',status:r.Status||'Open',resolvedOn:r['Resolved on']||'',linkSource:r['Linked source']||'manual',linkRef:r['Linked ref']||'',linkText:r['Link note']||'',notes:r.Notes||''};applyCustom(row,r,'action');db.items.push(row)});
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{let d=JSON.parse(await file.text());if(!d||(d.version!==4&&d.version!==3))throw new Error('Not a v3/v4 backup');if(d.version===3)d=migrateV3(d);db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

// ---------- Autosize ----------
function autosize(el){if(!el||el.tagName!=='TEXTAREA')return;el.style.height='auto';el.style.height=Math.max(el.scrollHeight,30)+'px'}

// ---------- Wiring ----------
function wireStart(root){
 const box=root.querySelector('.work-box');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};
 box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{
  el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()});
  el.addEventListener('change',()=>{if(el.tagName==='SELECT'){const k=el.dataset.field;db.meta[k]=el.value;schedule()}});
 });
}
function wireSettings(root){
 const areas=root.querySelectorAll('[data-settings-key]');
 if(!areas.length)return;
 let timer;
 areas.forEach(el=>{autosize(el);el.addEventListener('input',()=>{const key=el.dataset.settingsKey;const list=el.value.split('\n').map(x=>x.trim()).filter(Boolean);if(list.length)db.settings[key]=list;const cnt=el.parentElement.querySelector('.dm-settings-count');if(cnt)cnt.textContent=`${list.length} value${list.length===1?'':'s'}`;autosize(el);clearTimeout(timer);timer=setTimeout(()=>persist(db),400)})});
}
function wireColumnEditor(root){
 const panel=root.querySelector('.dm-col-panel');if(!panel)return;
 let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);render()},400)};
 panel.querySelectorAll('[data-col-action="toggle-hide"]').forEach(el=>{el.addEventListener('change',()=>{const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c)c.hidden=!el.checked}else{const o=db.settings.columnOverrides[id]||{};o.hidden=!el.checked;db.settings.columnOverrides[id]=o}persist(db);render()})});
 panel.querySelectorAll('[data-col-action="rename"]').forEach(el=>{el.addEventListener('input',()=>{const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';const val=el.value;if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c)c.label=val}else{const o=db.settings.columnOverrides[id]||{};o.label=val;db.settings.columnOverrides[id]=o}schedule()})});
}
function wireRegister(root){
 const grid=root.querySelector('.dm-grid');
 wireFilters(root);
 if(!grid)return;
 grid.querySelectorAll('textarea.dm-grid-area').forEach(autosize);
 let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);rerenderDashboard(root)},300)};
 grid.querySelectorAll('[data-grid-field]').forEach(el=>{
  const ev=(el.tagName==='SELECT'||el.type==='date')?'change':'input';
  el.addEventListener(ev,()=>{
   const id=el.dataset.gridId,f=el.dataset.gridField;
   const row=db.items.find(x=>x.id===id);if(!row)return;
   if(f.startsWith('custom:')){const cid=f.slice(7);row.custom=row.custom||{};row.custom[cid]=el.value}
   else if(f==='linkPick'){const v=el.value;if(v==='manual'){row.linkSource='manual';row.linkRef=''}else{const [src,ref]=v.split('::');row.linkSource=src||'manual';row.linkRef=ref||''}}
   else{row[f]=el.value;if(f==='parentCode'||f==='code'){render();return}}
   stamp(row);
   if(el.tagName==='TEXTAREA')autosize(el);
   schedule();
  });
 });
}
function rerenderDashboard(root){const dash=root.querySelector('.dm-dashboard');if(!dash)return;const div=document.createElement('div');div.innerHTML=visualDashboard();const fresh=div.querySelector('.dm-dashboard');if(fresh)dash.replaceWith(fresh)}
function wireFilters(root){
 const bar=root.querySelector('.dm-filter-bar');if(!bar)return;
 let qTimer;
 bar.querySelectorAll('[data-filter]').forEach(el=>{
  const key=el.dataset.filter;
  if(el.tagName==='SELECT'){el.addEventListener('change',()=>{filters[key]=el.value;render()})}
  else{el.addEventListener('input',()=>{clearTimeout(qTimer);qTimer=setTimeout(()=>{filters[key]=el.value;render();const f=root.querySelector(`[data-filter="${key}"]`);if(f)f.focus()},200)})}
 });
}

function render(){
 const views={'Overview':overviewView,'Register':registerView,'Settings':settingsView,'Export':exportViewPanel};
 if(!views[tab])tab='Overview';
 root.innerHTML=shell({eyebrow:'Cross-cutting · Meetings · one row per meeting · build 2026-10-09c',title:'Meetings, Actions & Decisions',intro:'One grid, three bands: Meeting · Decisions · Actions. Each meeting is a single row — its decisions and actions stack vertically in their bands, so everything that came out of a meeting is read horizontally in that meeting\'s row. Columns are fully customisable per band.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=3&lesson=coordination',label:'Review Module 3'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';columnsOpen=false;render()},action,submit:()=>{},importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
 wireSettings(root);
 wireColumnEditor(root);
 wireRegister(root);
}

persist(db);render();
})();
