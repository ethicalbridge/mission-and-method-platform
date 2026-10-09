/* Meetings, Actions & Decisions — one integrated register.
   Everything (meetings · decisions · actions) lives in ONE inline-editable
   grid grouped by meeting, so an action is never recorded twice and the
   context around it never gets lost. Columns can be shown, hidden, renamed
   or added from a Columns panel. Three worked examples ship out of the box.
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

// ---------- Default column definitions ----------
// Each row is a Meeting, Action or Decision. The grid shows ONE row per
// item, with cells rendered contextually (e.g. "Due" is editable only for
// Actions). Columns can be hidden, renamed, deleted (custom only) or added.
const DEFAULT_COLUMNS=[
 {id:'kind',label:'Kind',type:'kind',w:104,info:'Meeting · Action · Decision. Changing the kind switches which cells edit (actions have Due; decisions have Decided by; meetings have Agenda).'},
 {id:'code',label:'Code',type:'text',w:50,info:'Short reference. M-codes for meetings, A-codes for actions, D-codes for decisions. Auto-filled when you add a row.'},
 {id:'parentCode',label:'Meeting',type:'parent',w:200,info:'For actions and decisions: which meeting this came from. Leave blank for standalone items that did not come out of a meeting. Pre-filled when you use the + Action / + Decision buttons under a meeting.'},
 {id:'date',label:'Date',type:'date',w:124,info:'For meetings: when it took place. For decisions: when the decision was taken. Not used on action rows (actions have a Due date instead).'},
 {id:'title',label:'Title / text',type:'area',w:280,info:'The meeting title, the action to take, or the decision as a complete sentence. Cells auto-grow — nothing is cut.'},
 {id:'who',label:'Facilitator / Owner / Decided by',type:'who',w:180,info:'Meeting: facilitator (who ran it). Action: owner (the one person accountable). Decision: decided by (which body or role made the call).'},
 {id:'due',label:'Due',type:'due',w:124,info:'Actions only. "overdue" flag appears automatically when this date passes without the status being Done or Cancelled.'},
 {id:'status',label:'Status',type:'status',w:132,info:'Actions use the Action statuses from Settings; Decisions use the Decision statuses; Meetings do not have a status. Edit the available statuses in the Settings tab.'},
 {id:'linked',label:'Linked to',type:'linked',w:200,info:'Actions: pick an item from your other tools (objective, pathway, KPI, indicator, Gantt task, risk, issue). The other tool can read the cross-reference back.'},
 {id:'context',label:'Context / note',type:'area',w:240,info:'Decisions: why the decision was taken (what prompted it, what alternatives were considered). Actions: free-text note that complements the link.'},
 {id:'notes',label:'Notes',type:'area',w:220,info:'Anything else useful — agenda for a meeting, blockers for an action, next escalation for a decision.'}
];
const COLUMN_PRESETS={
 all:{label:'All columns',hide:[]},
 compact:{label:'Compact',hide:['parentCode','context','notes','linked']},
 actions:{label:'Actions focus',hide:['date','context'],kindFilter:'action'},
 decisions:{label:'Decisions focus',hide:['due','linked','notes'],kindFilter:'decision'}
};

const blankItem=(kind)=>({id:uid(),code:'',kind:kind||'action',parentCode:'',date:kind==='action'?'':today(),title:'',facilitator:'',attendees:'',apologies:'',location:'',agenda:'',type:'Team',cadence:'Ad hoc',owner:'',due:'',status:kind==='action'?'Open':kind==='decision'?'Approved':'',decidedBy:'',context:'',linkSource:'manual',linkRef:'',linkText:'',resolvedOn:'',notes:'',custom:{},createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',notes:''});
const blankSettings=()=>({mTypes:[...DEFAULT_MTYPES],aStatus:[...DEFAULT_ASTATUS],dStatus:[...DEFAULT_DSTATUS],cadences:[...DEFAULT_CADENCES],customColumns:[],columnOverrides:{}});
const blank=()=>({version:4,meta:blankMeta(),settings:blankSettings(),items:[]});

// ---------- Migrations (chain v1 → v2 → v3 → v4) ----------
function migrateV3(v3){
 const out=blank();
 try{
  if(v3?.meta)Object.assign(out.meta,v3.meta);
  if(v3?.settings)out.settings={...out.settings,...v3.settings};
  (v3?.meetings||[]).forEach(m=>out.items.push({...blankItem('meeting'),...m,kind:'meeting',parentCode:''}));
  (v3?.decisions||[]).forEach(d=>out.items.push({...blankItem('decision'),...d,kind:'decision',parentCode:d.meetingCode||'',title:d.text||d.title||''}));
  (v3?.actions||[]).forEach(a=>out.items.push({...blankItem('action'),...a,kind:'action',parentCode:a.meetingCode||'',title:a.text||a.title||''}));
 }catch(e){console.warn('meetings v3→v4 migrate failed',e)}
 return out;
}
function migrateV2(v2){
 // v2 nested decisions and actions inside each meeting
 const v3={version:3,meta:v2?.meta||{},meetings:[],actions:[],decisions:[]};
 try{
  (v2?.meetings||[]).forEach((m,i)=>{
   const code=m.code||'M'+(i+1);
   v3.meetings.push({code,title:m.title||'',date:m.date||today(),type:DEFAULT_MTYPES.includes(m.type)?m.type:'Team',facilitator:m.facilitator||'',attendees:m.attendees||'',apologies:m.apologies||'',location:m.location||'',agenda:m.agenda||'',notes:m.notes||''});
   (m.decisions||[]).forEach(d=>v3.decisions.push({code:'D'+(v3.decisions.length+1),meetingCode:code,date:m.date||today(),text:d.text||'',context:d.context||'',decidedBy:d.decidedBy||'',status:DEFAULT_DSTATUS.includes(d.status)?d.status:'Approved'}));
   (m.actions||[]).forEach(a=>v3.actions.push({code:'A'+(v3.actions.length+1),meetingCode:code,text:a.text||'',owner:a.owner||'',due:a.due||'',status:DEFAULT_ASTATUS.includes(a.status)?a.status:'Open',linkSource:a.linkSource||'manual',linkRef:a.linkRef||'',linkText:a.linkText||''}));
  });
 }catch(e){console.warn('meetings v2→v3 migrate failed',e)}
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
  // M1 and its children
  row({kind:'meeting',code:'M1',date:past14,title:'Q4 Leadership review',facilitator:'Aiko Tanaka (Director)',attendees:'Aiko Tanaka · Priya Shah · Erik Johansen · Maria Lopez',apologies:'Luis Carvalho',location:'HQ boardroom + Zoom',type:'Leadership',cadence:'Quarterly',agenda:'1. Q3 results\n2. 2027 budget assumptions\n3. Harvest Impact Fund submission\n4. Lead safeguarding officer succession',notes:'Longest Q4 review on record (2h20). Carried over "fundraising split by channel" to the next session.'}),
  row({kind:'decision',code:'D1',parentCode:'M1',date:past14,title:'Approve a 3-month operating reserve as a hard floor in all 2027 budget drafts',decidedBy:'Leadership team · unanimous',status:'Approved',context:'Response to risk R1 (Harvest Impact Fund decision delays). Supersedes the previous 2-month reserve policy.',notes:'Finance Director to apply before the budget leaves the Finance committee.'}),
  row({kind:'decision',code:'D2',parentCode:'M1',date:past14,title:'Fast-track two reserve donor prospects by end of month',decidedBy:'Leadership team',status:'Approved',context:'Reduces exposure to Harvest decision delay. Priya to lead with Dev team.'}),
  row({kind:'decision',code:'D4',parentCode:'M1',date:past14,title:'Postpone the fundraising-by-channel review to the January leadership session',decidedBy:'Leadership team',status:'Pending',context:'Not enough data from Q3 to split meaningfully. Pending Finance confirmation that the data split is feasible.',notes:'Dev team to prepare the channel view for January.'}),
  row({kind:'action',code:'A1',parentCode:'M1',title:'Draft the 2027 budget using the new 3-month reserve floor',owner:'Erik Johansen (Finance Director)',due:in14,status:'In progress',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — Harvest grant delay',notes:'First draft shared with Director; Finance committee review end of month.'}),
  row({kind:'action',code:'A2',parentCode:'M1',title:'Open conversations with Mercator Education Fund and Open Horizons',owner:'Priya Shah (Dev. Director)',due:past3,status:'Open',linkSource:'risk',linkRef:'R1',linkText:'Mitigates R1 — reserve prospects',notes:'Overdue — the Mercator contact is on sabbatical. Rerouted to Zara at Open Horizons.'}),
  row({kind:'action',code:'A5',parentCode:'M1',title:'Prepare the January leadership channel-split paper',owner:'Luis Carvalho (Dev team)',due:in14,status:'Open',linkSource:'manual',linkText:'Follow-up to decision D4 — fundraising review',notes:''}),
  row({kind:'action',code:'A6',parentCode:'M1',title:'Confirm succession plan for the lead safeguarding officer',owner:'Aiko Tanaka',due:past10,status:'Blocked',linkSource:'risk',linkRef:'R2',linkText:'Mitigates R2 — single point of failure',notes:'Blocked — HR is still assessing whether the role can split or needs two hires.'}),
  // M2
  row({kind:'meeting',code:'M2',date:past7,title:'Programme team weekly',facilitator:'Maria Lopez (Programme Manager)',attendees:'Maria Lopez · Nia Osei · Luis Carvalho · Fatima Haidar',apologies:'',location:'Zoom',type:'Team',cadence:'Weekly',agenda:'1. Cohort 3 attendance\n2. MEAL baseline survey status\n3. Field tablet loss follow-up\n4. Partner MoU preparation',notes:'Fastest weekly in weeks (45 min). Field tablet issue (I2) now assigned to Maria.'}),
  row({kind:'decision',code:'D3',parentCode:'M2',date:past7,title:'Enable auto-sync to cloud on every field tablet by end of week',decidedBy:'Programme team',status:'Approved',context:'Response to issue I2. Zero-cost IT change.',notes:'Maria to confirm with every field officer.'}),
  row({kind:'action',code:'A3',parentCode:'M2',title:'Enable cloud auto-sync on all 6 field tablets',owner:'Maria Lopez',due:in3,status:'In progress',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — tablet loss',notes:'4 of 6 done; waiting on 2 field officers to come back from site visits.'}),
  row({kind:'action',code:'A4',parentCode:'M2',title:'Re-collect 40 lost baseline surveys from Cohort 3',owner:'Maria Lopez · Nia Osei',due:in14,status:'Open',linkSource:'issue',linkRef:'I2',linkText:'Resolves I2 — recover lost data',notes:''}),
  // M3 (upcoming)
  row({kind:'meeting',code:'M3',date:in7,title:'November Board meeting',facilitator:'Chair: Eleanor Reyes',attendees:'Full Board + Director + Finance Director',apologies:'',location:'HQ boardroom',type:'Board',cadence:'Quarterly',agenda:'1. Director report\n2. Q4 financial statement\n3. Harvest Impact Fund decision\n4. 2027 strategy sign-off\n5. Safeguarding incident I3 (confidential session)',notes:'Papers out 7 days ahead per policy. Confidential session recorded in a separate minute.'})
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
let filters={kind:'',status:'',meeting:'',owner:'',q:''};
let columnsOpen=false;    // toggles the column editor panel
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const getMTypes=()=>db.settings.mTypes;
const getAStatus=()=>db.settings.aStatus;
const getDStatus=()=>db.settings.dStatus;
const getCadences=()=>db.settings.cadences;
const meetings=()=>db.items.filter(x=>x.kind==='meeting');
const actions=()=>db.items.filter(x=>x.kind==='action');
const decisions=()=>db.items.filter(x=>x.kind==='decision');

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

const isOverdue=d=>d&&d<today();
const inNextDays=(d,n)=>{if(!d)return false;const t=new Date(today());const target=new Date(d);const diff=(target-t)/86400000;return diff>=0&&diff<=n};
const nextCode=prefix=>{const list=db.items.filter(x=>(prefix==='M'?x.kind==='meeting':prefix==='A'?x.kind==='action':x.kind==='decision'));const nums=list.map(x=>Number(String(x.code||'').replace(prefix,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};

// ---------- Visual dashboard ----------
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const M=meetings(),A=actions(),D=decisions();
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
   <p class="dm-assess-hint">The "what did we decide?" view leadership asks for. Every decision lives beside its source meeting on the Register.</p>
  </article>
 </section>`;
}

// ---------- Column pipeline ----------
// Returns effective columns = defaults (with overrides) + custom columns, filtering hidden.
function allColumns(){
 const overrides=db.settings.columnOverrides||{};
 const defaults=DEFAULT_COLUMNS.map(c=>{const o=overrides[c.id]||{};return {...c,label:o.label??c.label,hidden:!!o.hidden,custom:false}});
 const custom=(db.settings.customColumns||[]).map(c=>({...c,custom:true,hidden:!!c.hidden,info:c.info||'Custom column.'}));
 return [...defaults,...custom];
}
const visibleColumns=()=>allColumns().filter(c=>!c.hidden);

// ---------- Small helpers ----------
const infoTip=(text)=>text?`<span class="dm-info" title="${esc(text)}" aria-label="${esc(text)}" tabindex="0">i</span>`:'';
const kindBadge=(kind)=>`<span class="dm-kind-badge dm-kind-${esc(kind)}">${kind==='meeting'?'🗣 Meeting':kind==='action'?'✓ Action':kind==='decision'?'⚖ Decision':'—'}</span>`;

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
     <h4>One integrated register</h4>
     <p>Meetings, decisions and actions all live on the <b>Register</b> tab, grouped by meeting. An action belongs to one place — the meeting that produced it — so you cannot record it twice and lose track. Decisions and actions from outside the meeting rhythm appear in a "Standalone" group at the bottom.</p>
    </article>
    <article>
     <h4>Inline editing · nothing is cut</h4>
     <p>Click any cell to edit. Textareas auto-grow to fit the whole text — nothing is ever truncated. Changes save as you type and the dashboard above updates live.</p>
    </article>
    <article>
     <h4>Customise the columns</h4>
     <p>Use the <b>Columns</b> button above the register to show, hide, rename or delete columns, or add brand-new custom ones (text, long text, date or select). Rows keep every stored value even if you later hide its column.</p>
    </article>
    <article>
     <h4>Linking across tools</h4>
     <p>The <b>Linked to</b> column on an action lets you tie it to an objective, pathway, KPI, indicator, Gantt task, risk or issue from your other tools — the other tool can read the cross-reference back.</p>
    </article>
    <article>
     <h4>Customising lists</h4>
     <p>Open the <b>Settings</b> tab to change the Meeting types, Action statuses, Decision statuses or Cadences. Rows that use a removed value keep it ("<i>not in list</i>" in the dropdown) so no data is ever lost.</p>
    </article>
    <article>
     <h4>Exporting &amp; round-trip</h4>
     <p>Open the <b>Export</b> tab for an Excel workbook with four sheets (Meta, Meetings, Decisions, Actions). Importing it back updates every row by code.</p>
    </article>
   </div>
   <div class="actions" style="margin-top:18px">
    <button class="button" data-action="new-meeting">+ Add a meeting</button>
    <button class="button" data-action="new-action">+ Add an action</button>
    <button class="button" data-action="new-decision">+ Add a decision</button>
    <button class="button secondary" data-action="load-example">Load 3 example meetings</button>
    <a class="button secondary" href="#" data-tab="Register">Open the register →</a>
   </div>
  </section>`;
}

// ---------- Cell renderers ----------
function cellCustom(row,col){
 const val=row.custom?.[col.id]||'';
 const base=`data-grid-id="${esc(row.id)}" data-grid-col="${esc(col.id)}" data-grid-custom="1"`;
 if(col.type==='select'){const opts=col.opts||[];return `<select class="dm-grid-cell dm-grid-sel" ${base}><option value=""></option>${opts.map(o=>`<option value="${esc(o)}" ${val===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`}
 if(col.type==='date')return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" ${base} value="${esc(val)}">`;
 if(col.type==='area')return `<textarea class="dm-grid-cell dm-grid-area" ${base} rows="1">${esc(val)}</textarea>`;
 return `<input class="dm-grid-cell dm-grid-input" ${base} value="${esc(val)}">`;
}
function cellKind(row){
 return `<select class="dm-grid-cell dm-grid-sel dm-grid-kind-sel" data-grid-id="${esc(row.id)}" data-grid-col="kind">
  <option value="meeting" ${row.kind==='meeting'?'selected':''}>🗣 Meeting</option>
  <option value="action" ${row.kind==='action'?'selected':''}>✓ Action</option>
  <option value="decision" ${row.kind==='decision'?'selected':''}>⚖ Decision</option>
 </select>`;
}
function cellSelect(row,col,opts){
 const current=String(row[col]||'');
 const flat=opts.map(o=>Array.isArray(o)?String(o[0]):String(o));
 const needsExtra=current&&!flat.includes(current);
 const all=needsExtra?[[current,current+' (not in list)'],...opts]:opts;
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(row.id)}" data-grid-col="${esc(col)}">${all.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${current===String(v)?'selected':''}>${esc(l||'—')}</option>`}).join('')}</select>`;
}
function cellInput(row,col,ph=''){
 return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(row.id)}" data-grid-col="${esc(col)}" value="${esc(row[col]||'')}" placeholder="${esc(ph)}">`;
}
function cellDate(row,col){
 return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" data-grid-id="${esc(row.id)}" data-grid-col="${esc(col)}" value="${esc(row[col]||'')}">`;
}
function cellArea(row,col,ph=''){
 return `<textarea class="dm-grid-cell dm-grid-area" data-grid-id="${esc(row.id)}" data-grid-col="${esc(col)}" rows="1" placeholder="${esc(ph)}">${esc(row[col]||'')}</textarea>`;
}
function cellNA(txt='—'){return `<div class="dm-grid-na">${esc(txt)}</div>`}
function cellParent(row){
 if(row.kind==='meeting')return cellNA('(this is a meeting)');
 const opts=[['','— standalone —'],...meetings().map(m=>[m.code,`${m.code} · ${m.title||'Untitled'} (${fmtDate(m.date)||'—'})`])];
 return cellSelect(row,'parentCode',opts);
}
function cellDateFor(row){
 if(row.kind==='action')return cellNA('(due below)');
 return cellDate(row,'date');
}
function cellWho(row){
 const col=row.kind==='meeting'?'facilitator':row.kind==='action'?'owner':'decidedBy';
 const ph=row.kind==='meeting'?'Who ran it':row.kind==='action'?'The one person accountable':'Role or body';
 return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(row.id)}" data-grid-col="${esc(col)}" value="${esc(row[col]||'')}" placeholder="${esc(ph)}">`;
}
function cellDueFor(row){
 if(row.kind!=='action')return cellNA();
 return cellDate(row,'due');
}
function cellStatus(row){
 if(row.kind==='meeting')return cellNA();
 if(row.kind==='action')return cellSelect(row,'status',getAStatus().map(x=>[x,x]));
 return cellSelect(row,'status',getDStatus().map(x=>[x,x]));
}
function cellLinked(row){
 if(row.kind!=='action'){return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(row.id)}" data-grid-col="linkText" value="${esc(row.linkText||'')}" placeholder="(actions only — free text here)">`}
 // Action: build suite-item dropdown
 const items=suiteItems();
 const groups={};items.forEach(it=>{(groups[it.group]=groups[it.group]||[]).push(it)});
 const combined=row.linkSource==='manual'||!row.linkRef?'manual':`${row.linkSource}::${row.linkRef}`;
 const options=[`<option value="manual" ${combined==='manual'?'selected':''}>— Free text —</option>`];
 Object.entries(groups).forEach(([g,arr])=>{options.push(`<optgroup label="${esc(g)}">`);arr.forEach(it=>{const v=`${it.source}::${it.ref}`;options.push(`<option value="${esc(v)}" ${combined===v?'selected':''}>${esc(it.label)}</option>`)});options.push('</optgroup>')});
 // Include stored value if it doesn't match any current suite item
 if(combined!=='manual'&&!items.find(it=>`${it.source}::${it.ref}`===combined))options.unshift(`<option value="${esc(combined)}" selected>${esc(combined)} (missing)</option>`);
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(row.id)}" data-grid-col="linkPick">${options.join('')}</select>`;
}
function cellContext(row){
 const col=row.kind==='decision'?'context':'linkText';
 const ph=row.kind==='decision'?'Why: what prompted it, what alternatives':row.kind==='action'?'Short note about the link':'';
 return cellArea(row,col,ph);
}
function renderCell(row,col){
 if(col.custom)return cellCustom(row,col);
 switch(col.id){
  case 'kind':return cellKind(row);
  case 'code':return cellInput(row,'code');
  case 'parentCode':return cellParent(row);
  case 'date':return cellDateFor(row);
  case 'title':return cellArea(row,'title',row.kind==='meeting'?'Meeting title':row.kind==='action'?'What needs to happen':'State the decision taken');
  case 'who':return cellWho(row);
  case 'due':return cellDueFor(row);
  case 'status':return cellStatus(row);
  case 'linked':return cellLinked(row);
  case 'context':return cellContext(row);
  case 'notes':return cellArea(row,'notes','Anything else useful');
 }
 return cellNA();
}

// ---------- Status flags & sticky-column badge ----------
function flagsFor(row){
 const flags=[];
 if(row.kind==='action'){
  const od=isOverdue(row.due)&&row.status!=='Done'&&row.status!=='Cancelled';
  const no=!row.owner&&row.status!=='Done'&&row.status!=='Cancelled';
  if(od)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">overdue</small>');
  if(no)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">no owner</small>');
  if(row.status==='Done'||row.status==='Cancelled')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">closed</small>');
  if(row.linkSource&&row.linkSource!=='manual'&&row.linkRef)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">↳ ${esc(row.linkRef)}</small>`);
 } else if(row.kind==='decision'){
  if(row.status==='Approved')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">live</small>');
  if(row.status==='Rescinded')flags.push('<small class="dm-grid-flag dm-grid-flag-bad">rescinded</small>');
  if(row.status==='Pending')flags.push('<small class="dm-grid-flag dm-grid-flag-neutral">pending</small>');
 } else if(row.kind==='meeting'){
  const upcoming=row.date&&row.date>=today();
  const decs=decisions().filter(d=>d.parentCode===row.code).length;
  const acts=actions().filter(a=>a.parentCode===row.code);
  const openA=acts.filter(a=>a.status!=='Done'&&a.status!=='Cancelled').length;
  const overdueA=acts.filter(a=>a.status!=='Done'&&a.status!=='Cancelled'&&isOverdue(a.due)).length;
  if(upcoming)flags.push('<small class="dm-grid-flag dm-grid-flag-ok">upcoming</small>');
  if(decs)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${decs} dec</small>`);
  if(acts.length)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">${acts.length} act${openA?` · ${openA} open`:''}${overdueA?` · ${overdueA} od`:''}</small>`);
 }
 return flags.join(' ');
}
function stickyLeft(row){
 let band='none',text='—';
 if(row.kind==='meeting'){band=row.date&&row.date>=today()?'low':'none';text=fmtDate(row.date)||'—'}
 else if(row.kind==='action'){const od=isOverdue(row.due)&&row.status!=='Done'&&row.status!=='Cancelled';const no=!row.owner&&row.status!=='Done'&&row.status!=='Cancelled';band=od?'critical':no?'high':(row.status==='Done'||row.status==='Cancelled')?'low':'medium';text=row.status||'Open'}
 else if(row.kind==='decision'){band=row.status==='Rescinded'?'high':row.status==='Pending'?'medium':'low';text=row.status||'Approved'}
 return `<td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${band}">${esc(text)}</span><div class="dm-grid-flags">${flagsFor(row)}</div></td>`;
}

// ---------- Filters ----------
function matchesFilters(r){
 if(filters.kind && r.kind!==filters.kind)return false;
 if(filters.status && (r.status||'')!==filters.status && r.kind!=='meeting')return false;
 if(filters.meeting){if(r.kind==='meeting'){if(r.code!==filters.meeting)return false}else{if(r.parentCode!==filters.meeting)return false}}
 if(filters.owner){const o=(r.kind==='action'?r.owner:r.kind==='decision'?r.decidedBy:r.facilitator)||'';if(!o.toLowerCase().includes(filters.owner.toLowerCase()))return false}
 if(filters.q){const q=filters.q.toLowerCase();const hay=[r.code,r.title,r.owner,r.decidedBy,r.facilitator,r.attendees,r.agenda,r.notes,r.context,r.linkText,r.linkRef].join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}

// ---------- Sorting: group by meeting ----------
function sortedRows(){
 const mList=meetings().slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const mOrder={};mList.forEach((m,i)=>mOrder[m.code]=i);
 const kindOrder={decision:1,action:2};
 return db.items.slice().sort((a,b)=>{
  const ap=a.kind==='meeting'?a.code:a.parentCode;
  const bp=b.kind==='meeting'?b.code:b.parentCode;
  const ao=mOrder[ap]??9999;
  const bo=mOrder[bp]??9999;
  if(ao!==bo)return ao-bo;
  const ka=a.kind==='meeting'?0:(kindOrder[a.kind]||5);
  const kb=b.kind==='meeting'?0:(kindOrder[b.kind]||5);
  if(ka!==kb)return ka-kb;
  return (a.code||'').localeCompare(b.code||'');
 });
}

// ---------- Column editor panel ----------
function columnEditorPanel(){
 if(!columnsOpen)return '';
 const all=allColumns();
 const rows=all.map(c=>{
  const canDel=c.custom;
  const canHide=c.id!=='kind'&&c.id!=='code'; // keep Kind+Code required
  return `<li class="dm-col-row">
   <label class="dm-col-vis"><input type="checkbox" data-col-action="toggle-hide" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" ${c.hidden?'':'checked'} ${canHide?'':'disabled'}><span>${canHide?'Show':'Required'}</span></label>
   <input class="dm-col-label" data-col-action="rename" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" value="${esc(c.label)}" aria-label="Column label">
   <span class="dm-col-type">${esc(c.custom?(c.type||'text'):c.type)}${c.custom?' · custom':''}</span>
   ${canDel?`<button class="link danger" data-action="delete-column" data-col-id="${esc(c.id)}" title="Delete this custom column">✕</button>`:'<span></span>'}
  </li>`;
 }).join('');
 return `<section class="dm-col-panel">
  <div class="dm-col-head"><h3>Columns ${infoTip('Show, hide, rename or delete columns. Hidden columns keep every stored value — unhide them any time. Required columns (Kind, Code) stay visible.')}</h3><button class="link" data-action="toggle-columns">✕ Close</button></div>
  <ul class="dm-col-list">${rows}</ul>
  <form class="dm-col-add" data-form="add-column" onsubmit="return false">
   <label><span>New column name</span><input name="label" placeholder="e.g. Priority, Follow-up date, Budget line" required></label>
   <label><span>Type</span><select name="type"><option value="text">Short text</option><option value="area">Long text (auto-grow)</option><option value="date">Date</option><option value="select">Dropdown</option></select></label>
   <label class="dm-col-opts"><span>Dropdown options (one per line, only for Dropdown type)</span><textarea name="opts" rows="2" placeholder="Low&#10;Medium&#10;High"></textarea></label>
   <button class="button" data-action="add-column">+ Add column</button>
  </form>
 </section>`;
}

// ---------- Register (the one integrated grid) ----------
function registerView(){
 const cols=visibleColumns();
 const filtered=db.items.filter(matchesFilters);
 const sorted=sortedRows().filter(r=>filtered.includes(r));
 const total=db.items.length;
 const filterCount=['kind','status','meeting','owner','q'].filter(k=>filters[k]).length;
 const meetingOpts=meetings().map(m=>[m.code,`${m.code} · ${m.title||'Untitled'}`]);
 const allStatuses=Array.from(new Set([...getAStatus(),...getDStatus()]));
 const filterBar=`<div class="dm-filter-bar">
  <label class="dm-filt-label"><span>Kind</span><select class="dm-filt-sel" data-filter="kind"><option value="">All</option><option value="meeting" ${filters.kind==='meeting'?'selected':''}>Meeting</option><option value="action" ${filters.kind==='action'?'selected':''}>Action</option><option value="decision" ${filters.kind==='decision'?'selected':''}>Decision</option></select></label>
  <label class="dm-filt-label"><span>Status</span><select class="dm-filt-sel" data-filter="status"><option value="">All</option>${allStatuses.map(s=>`<option value="${esc(s)}" ${filters.status===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label>
  ${meetingOpts.length?`<label class="dm-filt-label"><span>Meeting</span><select class="dm-filt-sel" data-filter="meeting"><option value="">All</option>${meetingOpts.map(([v,l])=>`<option value="${esc(v)}" ${filters.meeting===v?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`:''}
  <label class="dm-filt-label"><span>Owner contains</span><input class="dm-filt-input" data-filter="owner" value="${esc(filters.owner||'')}" placeholder="e.g. Priya"></label>
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" value="${esc(filters.q||'')}" placeholder="Any text in any row…"></label>
  ${filterCount?`<button class="button secondary" data-action="filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${sorted.length}</b> of <b>${total}</b> row${total===1?'':'s'}</div>
 </div>`;
 const headers=cols.map(c=>`<th class="dm-grid-th" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('');
 const rows=sorted.map(r=>{
  const cells=cols.map(c=>`<td class="dm-grid-td dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,180)}px">${renderCell(r,c)}</td>`).join('');
  return `<tr data-row="${esc(r.id)}" data-kind="${esc(r.kind)}" class="dm-row-${esc(r.kind)}">${stickyLeft(r)}${cells}<td class="dm-grid-del"><button class="link" data-action="delete-row" data-id="${esc(r.id)}" title="Delete this row">✕</button></td></tr>`;
 }).join('');
 const totalCols=1+cols.length+1;
 const emptyMsg=total?`<b>No rows match these filters.</b> Clear filters to see all ${total} rows.`:`<b>Empty register.</b> Click a + button below to add a row, or <b>Load 3 example meetings</b> on Overview.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Integrated register</h2><p>Meetings, decisions and actions in <b>one</b> grid, grouped so each meeting is followed by its own decisions and actions. Change a row's <b>Kind</b> to switch what it is. Rows marked "—" are not applicable to that kind (e.g. Due dates don't apply to Meetings).</p></div>
   <div class="actions dm-toolbar">
    <button class="button" data-action="new-meeting">+ Meeting</button>
    <button class="button" data-action="new-action">+ Action</button>
    <button class="button" data-action="new-decision">+ Decision</button>
    <button class="button secondary ${columnsOpen?'is-active':''}" data-action="toggle-columns">⚙ Columns${columnsOpen?' ✕':''}</button>
    <button class="button secondary" data-action="load-example">Load examples</button>
   </div>
  </div>
  ${columnEditorPanel()}
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead><tr class="dm-grid-col-row"><th class="dm-grid-th dm-grid-th-sticky">Status${infoTip('Status plus live flags: overdue, no owner, closed, pending. Meetings show their date and upcoming/decision/action counters.')}</th>${headers}<th class="dm-grid-th"></th></tr></thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
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
   ${listBlock('mTypes','Meeting types',s.mTypes,'Shown on a meeting row — Board, Leadership, Team, Project review, Partner, Workshop, Other.')}
   ${listBlock('cadences','Meeting cadences',s.cadences,'How often a recurring meeting repeats. Ad hoc for one-offs.')}
   ${listBlock('aStatus','Action statuses',s.aStatus,'Default: Open · In progress · Done · Blocked · Cancelled. "Done" and "Cancelled" remove an action from the open-count.')}
   ${listBlock('dStatus','Decision statuses',s.dStatus,'Default: Pending · Approved · Rescinded. Rescinded decisions stay on the register as history.')}
  </div>
  <p class="tiny" style="margin-top:14px">Changes save as you type. To undo your customisation, use <b>Reset lists to defaults</b> above.</p>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year, prepared by</li><li>Meetings — the meeting records (code, title, date, type, cadence, facilitator, attendees, location, agenda, notes)</li><li>Decisions — every decision with its meeting code and governance trail</li><li>Actions — every action with owner, due, status and linked-to reference</li><li>Custom columns — the custom columns you added and their values</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='toggle-columns'){columnsOpen=!columnsOpen;render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-meeting'){const r=blankItem('meeting');r.code=nextCode('M');db.items.push(r);if(tab==='Overview')tab='Register';save('Meeting row added.');setTimeout(()=>{const el=root.querySelector(`tr[data-row="${r.id}"] [data-grid-col="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='new-action'){const r=blankItem('action');r.code=nextCode('A');db.items.push(r);if(tab==='Overview')tab='Register';save('Action row added.');setTimeout(()=>{const el=root.querySelector(`tr[data-row="${r.id}"] [data-grid-col="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='new-decision'){const r=blankItem('decision');r.code=nextCode('D');db.items.push(r);if(tab==='Overview')tab='Register';save('Decision row added.');setTimeout(()=>{const el=root.querySelector(`tr[data-row="${r.id}"] [data-grid-col="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='delete-row'){const r=db.items.find(x=>x.id===id);if(!r)return;if(!confirm(`Delete this ${r.kind}? Cannot be undone.`))return;db.items=db.items.filter(x=>x.id!==id);save('Row deleted.');return}
 if(a==='filter-clear'){filters={kind:'',status:'',meeting:'',owner:'',q:''};render();return}
 if(a==='settings-reset'){if(!confirm('Reset meeting types, action statuses, decision statuses and cadences to defaults? Your rows keep their stored values.'))return;Object.assign(db.settings,blankSettings(),{customColumns:db.settings.customColumns,columnOverrides:db.settings.columnOverrides});save('Lists reset to defaults.');return}
 if(a==='delete-column'){const colId=el.dataset.colId;const col=db.settings.customColumns.find(c=>c.id===colId);if(!col)return;if(!confirm(`Delete the custom column "${col.label}"? Values stored in this column will also be removed.`))return;db.settings.customColumns=db.settings.customColumns.filter(c=>c.id!==colId);db.items.forEach(r=>{if(r.custom)delete r.custom[colId]});save('Column deleted.');return}
 if(a==='add-column'){
  const form=root.querySelector('form[data-form="add-column"]');if(!form)return;
  const label=form.label.value.trim();if(!label){alert('Give the column a name first.');return}
  const type=form.type.value;
  const opts=type==='select'?form.opts.value.split('\n').map(x=>x.trim()).filter(Boolean):[];
  if(type==='select'&&!opts.length){alert('Add at least one dropdown option (one per line).');return}
  const id='c-'+uid();
  db.settings.customColumns.push({id,label,type,opts,hidden:false});
  save(`Added column "${label}".`);
  return;
 }
 if(a==='load-example'){
  if(db.items.length && !confirm('Replace the current register with the three example meetings and their linked decisions and actions? Download a backup first if you need the current data.'))return;
  db.items=makeExamples();
  if(!db.meta.organisation)db.meta.organisation='Harvest Learning Foundation';
  if(!db.meta.project)db.meta.project='2027 leadership rhythm';
  tab='Register';
  save('Three example meetings loaded with linked decisions and actions. One upcoming meeting, one overdue action and one blocked action seeded so you can see every state at once.');
  return;
 }
 if(a==='xlsx'){try{download('Method-into-Impact-meetings.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-meetings.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-meetings-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

// ---------- Excel (3 kind-specific sheets + custom columns sheet) ----------
function customColumnValues(row){
 const out={};
 (db.settings.customColumns||[]).forEach(c=>{out[c.label]=row.custom?.[c.id]||''});
 return out;
}
function buildWorkbook(withData){
 const customLabels=(db.settings.customColumns||[]).map(c=>c.label);
 const M=meetings(),A=actions(),D=decisions();
 const sheets=[
  readmeSheet('Meetings, actions & decisions',['Integrated register. Meetings, decisions and actions kept together, each with its own sheet in this workbook.','Round-trip supported: importing this workbook back updates every row by code.','Custom columns are flattened into each sheet as additional labelled columns.']),
  metaSheet(db.meta),
  {name:'Meetings',rows:[
   ['Code','Title','Date','Type','Cadence','Facilitator','Location','Attendees','Apologies','Agenda','Notes',...customLabels],
   ...(withData?M.map(m=>{const cv=customColumnValues(m);return [m.code,m.title,m.date,m.type,m.cadence,m.facilitator,m.location,m.attendees,m.apologies,m.agenda,m.notes,...customLabels.map(l=>cv[l]||'')]}):[])
  ]},
  {name:'Decisions',rows:[
   ['Code','Meeting code','Date','Decision','Context','Decided by','Status','Notes',...customLabels],
   ...(withData?D.map(d=>{const cv=customColumnValues(d);return [d.code,d.parentCode,d.date,d.title,d.context,d.decidedBy,d.status,d.notes,...customLabels.map(l=>cv[l]||'')]}):[])
  ]},
  {name:'Actions',rows:[
   ['Code','Meeting code','Action','Owner','Due','Status','Resolved on','Linked source','Linked ref','Link note','Notes',...customLabels],
   ...(withData?A.map(a=>{const cv=customColumnValues(a);return [a.code,a.parentCode,a.title,a.owner,a.due,a.status,a.resolvedOn,a.linkSource,a.linkRef,a.linkText,a.notes,...customLabels.map(l=>cv[l]||'')]}):[])
  ]},
  schemaSheet({Meetings:'code,title,date,type,cadence,facilitator,location,attendees,apologies,agenda,notes',Decisions:'code,parentCode,date,title,context,decidedBy,status,notes',Actions:'code,parentCode,title,owner,due,status,resolvedOn,linkSource,linkRef,linkText,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const rows=[['Kind','Code','Meeting','Title','Who','Date / Due','Status'],...sortedRows().map(r=>[r.kind,r.code,r.parentCode||'',r.title,(r.kind==='meeting'?r.facilitator:r.kind==='action'?r.owner:r.decidedBy)||'',(r.kind==='action'?r.due:r.date)||'',r.status||''])];
 download('Method-into-Impact-meetings.csv',csv(rows),'text/csv;charset=utf-8');
}
async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const mRows=rowsToObjects(findSheet(data,'Meetings'));
  const dRows=rowsToObjects(findSheet(data,'Decisions'));
  const aRows=rowsToObjects(findSheet(data,'Actions'));
  const customLabels=(db.settings.customColumns||[]).reduce((o,c)=>{o[c.label]=c.id;return o},{});
  const applyCustom=(row,source)=>{Object.keys(customLabels).forEach(l=>{if(source[l]!=null&&source[l]!==''){row.custom=row.custom||{};row.custom[customLabels[l]]=source[l]}})};
  if(mRows?.length||dRows?.length||aRows?.length)db.items=[];
  (mRows||[]).forEach(r=>{const row={...blankItem('meeting'),code:r.Code||'',title:r.Title||'',date:r.Date||today(),type:r.Type||'Team',cadence:r.Cadence||'Ad hoc',facilitator:r.Facilitator||'',location:r.Location||'',attendees:r.Attendees||'',apologies:r.Apologies||'',agenda:r.Agenda||'',notes:r.Notes||''};applyCustom(row,r);db.items.push(row)});
  (dRows||[]).forEach(r=>{const row={...blankItem('decision'),code:r.Code||'',parentCode:r['Meeting code']||'',date:r.Date||today(),title:r.Decision||'',context:r.Context||'',decidedBy:r['Decided by']||'',status:r.Status||'Approved',notes:r.Notes||''};applyCustom(row,r);db.items.push(row)});
  (aRows||[]).forEach(r=>{const row={...blankItem('action'),code:r.Code||'',parentCode:r['Meeting code']||'',title:r.Action||'',owner:r.Owner||'',due:r.Due||'',status:r.Status||'Open',resolvedOn:r['Resolved on']||'',linkSource:r['Linked source']||'manual',linkRef:r['Linked ref']||'',linkText:r['Link note']||'',notes:r.Notes||''};applyCustom(row,r);db.items.push(row)});
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||(d.version!==4&&d.version!==3))throw new Error('Not a v3/v4 backup');if(d.version===3)d=migrateV3(d);db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

// ---------- Autosize helper ----------
function autosize(el){if(!el||el.tagName!=='TEXTAREA')return;el.style.height='auto';el.style.height=Math.max(el.scrollHeight,30)+'px'}

// ---------- Wire pieces ----------
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
 panel.querySelectorAll('[data-col-action="toggle-hide"]').forEach(el=>{
  el.addEventListener('change',()=>{
   const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';
   if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c){c.hidden=!el.checked}}
   else{const o=db.settings.columnOverrides[id]||{};o.hidden=!el.checked;db.settings.columnOverrides[id]=o}
   persist(db);render();
  });
 });
 panel.querySelectorAll('[data-col-action="rename"]').forEach(el=>{
  el.addEventListener('input',()=>{
   const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';const val=el.value;
   if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c)c.label=val}
   else{const o=db.settings.columnOverrides[id]||{};o.label=val;db.settings.columnOverrides[id]=o}
   schedule();
  });
 });
}
function wireRegister(root){
 const grid=root.querySelector('.dm-grid');
 wireFilters(root);
 if(!grid)return;
 grid.querySelectorAll('textarea.dm-grid-area').forEach(autosize);
 let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);rerenderDashboard(root)},300)};
 grid.querySelectorAll('[data-grid-col]').forEach(el=>{
  const ev=(el.tagName==='SELECT'||el.type==='date')?'change':'input';
  el.addEventListener(ev,()=>{
   const id=el.dataset.gridId,col=el.dataset.gridCol,custom=el.dataset.gridCustom==='1';
   const row=db.items.find(x=>x.id===id);if(!row)return;
   if(custom){row.custom=row.custom||{};row.custom[col]=el.value}
   else if(col==='linkPick'){const v=el.value;if(v==='manual'){row.linkSource='manual';row.linkRef=''}else{const [src,ref]=v.split('::');row.linkSource=src||'manual';row.linkRef=ref||''}}
   else if(col==='kind'){row.kind=el.value;}
   else{row[col]=el.value}
   stamp(row);
   if(el.tagName==='TEXTAREA')autosize(el);
   // Live-update the sticky left cell + flags
   const tr=el.closest('tr[data-row]');if(tr){const td=tr.querySelector('.dm-grid-score-cell');if(td){const html=stickyLeft(row).replace(/^<td[^>]*>/,'').replace(/<\/td>$/,'');td.innerHTML=html}}
   schedule();
   // For kind change, re-render the whole row so irrelevant cells become — / applicable
   if(col==='kind'){render();}
   // For parentCode or code change, re-render so cross-references update
   if(col==='parentCode'||col==='code'){render();}
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
 root.innerHTML=shell({eyebrow:'Cross-cutting · Meetings · one integrated register · build 2026-10-09',title:'Meetings, Actions & Decisions',intro:'Meetings, decisions and actions in ONE grid, grouped by meeting so nothing is duplicated and nothing is missed. Columns are fully customisable (show, hide, rename, delete, add). Cells auto-grow — no text is cut.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=3&lesson=coordination',label:'Review Module 3'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';columnsOpen=false;render()},action,submit:()=>{},importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
 wireSettings(root);
 wireColumnEditor(root);
 wireRegister(root);
}

persist(db);render();
})();
