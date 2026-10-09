/* Issue & Risk Management — compliance-grade register.
   Overview (heatmap + how-it-works) · Risks grid · Issues grid · Settings
   (customise categories, statuses, cadences) · Export. All grids are
   inline-editable, auto-grow their cells so no text is cut, and feed the
   dashboard above them live.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-issue-risk-v2',LEGACY='mission-method-issue-risk-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2';
const TABS=['Overview','Risks','Issues','Settings','Export'];
const DEFAULT_R_STATUS=['Open','Monitoring','Mitigating','Closed'];
const DEFAULT_I_STATUS=['Open','In progress','Resolved','Closed'];
const DEFAULT_M_STATUS=['Not started','In progress','Done','Blocked'];
const DEFAULT_CADENCES=['Weekly','Monthly','Quarterly','Semi-annual','Annual','Ad hoc'];
const DEFAULT_CATEGORIES=['Financial','Programming','Partners','Compliance','HR','Operations','Safeguarding','MEAL quality','Donor compliance','Reputation','Legal','Other'];
const LIKELIHOOD_OPTS=[['1','1 · Rare'],['2','2 · Unlikely'],['3','3 · Possible'],['4','4 · Likely'],['5','5 · Almost certain']];
const IMPACT_OPTS=[['1','1 · Negligible'],['2','2 · Minor'],['3','3 · Moderate'],['4','4 · Major'],['5','5 · Severe']];
const SEVERITY_OPTS=[['1','1 · Minor'],['2','2 · Noticeable'],['3','3 · Significant'],['4','4 · Serious'],['5','5 · Critical']];

const blankRisk=()=>({id:uid(),code:'',title:'',description:'',threatensSource:'manual',threatensRef:'',threatens:'',category:'Other',likelihood:3,impact:3,mitigation:'',mitigationOwner:'',mitigationDue:'',mitigationStatus:'Not started',approvedBy:'',approvedOn:'',reviewCadence:'Quarterly',nextReview:'',lastReview:'',status:'Open',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankIssue=()=>({id:uid(),code:'',title:'',description:'',affectsSource:'manual',affectsRef:'',affects:'',category:'Other',severity:3,happenedOn:today(),resolution:'',owner:'',due:'',status:'Open',reportedBy:'',resolvedOn:'',linkedRiskCode:'',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',defaultCadence:'Quarterly',notes:''});
const blankSettings=()=>({categories:[...DEFAULT_CATEGORIES],rStatus:[...DEFAULT_R_STATUS],iStatus:[...DEFAULT_I_STATUS],mStatus:[...DEFAULT_M_STATUS],cadences:[...DEFAULT_CADENCES]});
const blank=()=>({version:2,meta:blankMeta(),settings:blankSettings(),risks:[],issues:[]});

function migrateV1(v1){
 const out=blank();
 try{
  if(v1.settings?.organisation)out.meta.organisation=v1.settings.organisation;
  (v1.risks||[]).forEach((r,i)=>{
   const code=r.id||'R'+(i+1);
   out.risks.push({...blankRisk(),code,title:r.title||'',description:r.description||'',threatens:[r.project,r.department].filter(Boolean).join(' · '),category:DEFAULT_CATEGORIES.includes(r.category)?r.category:'Other',likelihood:clamp(r.likelihood,1,5)||3,impact:clamp(r.impact,1,5)||3,mitigation:r.mitigation||r.controls||'',mitigationOwner:r.mitigationOwner||r.owner||'',mitigationDue:r.due||'',mitigationStatus:'In progress',status:DEFAULT_R_STATUS.includes(r.status)?r.status:'Open',notes:r.notes||'',createdAt:r.history?.[r.history.length-1]?.at||now()});
  });
  (v1.issues||[]).forEach((is,i)=>{
   const code=is.id||'I'+(i+1);
   const link=(is.riskIds||[])[0];const linkedCode=link?(v1.risks||[]).find(r=>r.id===link)?.id:'';
   out.issues.push({...blankIssue(),code,title:is.title||'',description:is.description||'',affects:[is.project,is.department].filter(Boolean).join(' · '),category:DEFAULT_CATEGORIES.includes(is.category)?is.category:'Other',severity:is.severity==='Critical'?5:is.severity==='High'?4:is.severity==='Medium'?3:is.severity==='Low'?2:3,happenedOn:is.identified||today(),resolution:is.resolution||'',owner:is.owner||'',due:is.due||'',status:DEFAULT_I_STATUS.includes(is.status)?is.status:'Open',resolvedOn:is.closedAt||'',linkedRiskCode:linkedCode||'',notes:is.notes||'',createdAt:is.identified||now()});
  });
 }catch(e){console.warn('risk migrate failed',e)}
 return out;
}

// ---------- Three worked examples for each register ----------
function makeExampleRisks(){
 const R=(o)=>({...blankRisk(),...o});
 const in30=new Date(Date.now()+30*86400000).toISOString().slice(0,10);
 const in14=new Date(Date.now()+14*86400000).toISOString().slice(0,10);
 const past15=new Date(Date.now()-15*86400000).toISOString().slice(0,10);
 const past45=new Date(Date.now()-45*86400000).toISOString().slice(0,10);
 const past90=new Date(Date.now()-90*86400000).toISOString().slice(0,10);
 return [
  R({code:'R1',title:'Harvest Impact Fund grant decision delays',description:'Delays to the $450k Harvest Impact Fund decision would leave a $120k gap in the 2027 budget and force a reduction in the Q2 cohort size.',threatens:'2027 annual budget · girls education programme · Q2 cohort delivery',category:'Financial',likelihood:4,impact:5,mitigation:'Keep the Harvest relationship warm with monthly check-ins. Fast-track two reserve prospects (Open Horizons Collective, Mercator Education Fund) so a 90-day gap is survivable. Maintain a 3-month operating reserve.',mitigationOwner:'Priya Shah (Dev. Director)',mitigationDue:in30,mitigationStatus:'In progress',approvedBy:'Board, Finance committee',approvedOn:past45,reviewCadence:'Monthly',nextReview:in14,lastReview:past15,status:'Mitigating',notes:'Linked to issue I1 — the previous grant report was already late, which may be affecting trust.'}),
  R({code:'R2',title:'Loss of lead safeguarding officer',description:'The lead safeguarding officer is also our MEAL lead and the only trained Child Protection focal point. If they leave or go on extended leave, we lose both institutional memory and compliance cover simultaneously.',threatens:'Safeguarding compliance · MEAL data quality · donor reporting · programme continuity',category:'Safeguarding',likelihood:3,impact:5,mitigation:'Hire a MEAL officer by Q2 to split the role. Cross-train two programme managers on the Child Protection focal-point protocol. Document all MEAL procedures in a handover pack by month-end.',mitigationOwner:'Aiko Tanaka (Ops Director)',mitigationDue:past15,mitigationStatus:'In progress',approvedBy:'Director, HR',approvedOn:past45,reviewCadence:'Monthly',nextReview:in14,lastReview:past15,status:'Open',notes:'The mitigation due date has already slipped — the MEAL officer recruitment is 15 days late.'}),
  R({code:'R3',title:'Partner MoU with Northern Lights lapsing',description:'The MoU with Northern Lights Trust (our in-country infrastructure partner) expires in Q4 and no renewal discussion has started yet. If it lapses mid-project, programme delivery in two districts stops.',threatens:'Northern districts delivery · 2027 cohort · partner reporting line',category:'Partners',likelihood:3,impact:4,mitigation:'Open renewal discussion by month-end. Review the partnership terms with Legal in parallel so the renewal is not held up by paperwork. Identify one backup delivery partner as a contingency.',mitigationOwner:'Erik Johansen (Partnerships)',mitigationDue:in30,mitigationStatus:'Not started',approvedBy:'Director',approvedOn:past90,reviewCadence:'Quarterly',nextReview:past15,lastReview:past90,status:'Open',notes:'Review date already overdue — this needs to move to Monitoring once renewal is in flight.'})
 ];
}

function makeExampleIssues(){
 const I=(o)=>({...blankIssue(),...o});
 const in7=new Date(Date.now()+7*86400000).toISOString().slice(0,10);
 const past5=new Date(Date.now()-5*86400000).toISOString().slice(0,10);
 const past10=new Date(Date.now()-10*86400000).toISOString().slice(0,10);
 const past20=new Date(Date.now()-20*86400000).toISOString().slice(0,10);
 const past30=new Date(Date.now()-30*86400000).toISOString().slice(0,10);
 return [
  I({code:'I1',title:'Harvest Impact Fund Q3 narrative report submitted late',description:'The Q3 narrative report to Harvest Impact Fund was submitted 11 days after the contractual deadline, triggering a formal reminder from the grants team.',affects:'Harvest Impact Fund grant · Q4 2026 drawdown · donor relationship',category:'Donor compliance',severity:4,happenedOn:past30,reportedBy:'Priya Shah',resolution:'Issued a written apology with a corrective action plan. Set up a 10-day pre-deadline reminder in the grants calendar. Appointed Priya as the single accountable owner for all Harvest deliverables.',owner:'Priya Shah (Dev. Director)',due:past20,status:'Resolved',resolvedOn:past20,linkedRiskCode:'R1',notes:'Resolved on time. Still, repeat occurrences would trigger a formal donor compliance review — monitor Q4 report submission closely.'}),
  I({code:'I2',title:'MEAL data loss — tablet lost in the field',description:'A field tablet carrying unsubmitted survey data for the Q3 cohort baseline was lost during a transport incident. ~40 responses are affected.',affects:'Q3 cohort baseline data · MEAL framework indicators I-01 and I-04',category:'MEAL quality',severity:3,happenedOn:past10,reportedBy:'Maria Lopez (MEAL)',resolution:'Re-collect the 40 baseline surveys in the coming cohort visit. Enable auto-sync to cloud on all field tablets. Review device encryption policy with IT.',owner:'Maria Lopez',due:in7,status:'In progress',resolvedOn:'',linkedRiskCode:'R2',notes:'Low privacy exposure — no personally identifying data was on the device beyond first names. Still, the device encryption gap is a wider ops issue.'}),
  I({code:'I3',title:'Safeguarding complaint from community volunteer',description:'A community volunteer raised a safeguarding concern about the conduct of one of our training facilitators during a session on 14 Sep. The concern was raised through the official grievance channel.',affects:'Safeguarding compliance · trainer accreditation · community trust',category:'Safeguarding',severity:5,happenedOn:past5,reportedBy:'Anonymous (via grievance line)',resolution:'Lead safeguarding officer is leading a formal investigation per the organisation’s safeguarding policy. The facilitator has been suspended from community-facing work pending the outcome.',owner:'Aiko Tanaka (Safeguarding lead)',due:in7,status:'Open',resolvedOn:'',linkedRiskCode:'R2',notes:'High-severity. Donor safeguarding focal points (Harvest, Northern Lights) will be informed per MoU within 72h of investigation outcome.'})
 ];
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{
 d=window.MMExample?.cleanupStaleExample?.(d,'mm.risk-cleanup-v2',blank)||d;
 if(!Array.isArray(d.risks))d.risks=[];
 if(!Array.isArray(d.issues))d.issues=[];
 if(!d.settings||typeof d.settings!=='object')d.settings=blankSettings();
 else{
  const s=d.settings;
  if(!Array.isArray(s.categories)||!s.categories.length)s.categories=[...DEFAULT_CATEGORIES];
  if(!Array.isArray(s.rStatus)||!s.rStatus.length)s.rStatus=[...DEFAULT_R_STATUS];
  if(!Array.isArray(s.iStatus)||!s.iStatus.length)s.iStatus=[...DEFAULT_I_STATUS];
  if(!Array.isArray(s.mStatus)||!s.mStatus.length)s.mStatus=[...DEFAULT_M_STATUS];
  if(!Array.isArray(s.cadences)||!s.cadences.length)s.cadences=[...DEFAULT_CADENCES];
 }
 return d;
}});
let db=storage.load(),tab='Overview',dlg='',message='';
let riskFilters={status:'',category:'',band:'',q:''};
let issueFilters={status:'',category:'',sevBand:'',q:''};
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

// Dynamic getters — all dropdowns read from db.settings
const getCategories=()=>db.settings.categories;
const getRStatus=()=>db.settings.rStatus;
const getIStatus=()=>db.settings.iStatus;
const getMStatus=()=>db.settings.mStatus;
const getCadences=()=>db.settings.cadences;

// ---------- Scoring helpers (5×5) ----------
const scoreOf=r=>Number(r.likelihood||0)*Number(r.impact||0);
const scoreBand=n=>n>=15?'critical':n>=10?'high':n>=5?'medium':n>=1?'low':'none';
const bandLabel=b=>({critical:'Critical',high:'High',medium:'Medium',low:'Low',none:'—'}[b]);
const sevBand=n=>n>=5?'critical':n>=4?'high':n>=3?'medium':n>=1?'low':'none';
const isOverdue=d=>d&&d<today();
const nextCode=prefix=>{const list=prefix==='R'?db.risks:db.issues;const nums=list.map(x=>Number(String(x.code||'').replace(prefix,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};

// ---------- Visual dashboard ----------
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const risks=db.risks,issues=db.issues;
 const openRisks=risks.filter(r=>r.status!=='Closed');
 const closedRisks=risks.filter(r=>r.status==='Closed').length;
 const critical=openRisks.filter(r=>scoreBand(scoreOf(r))==='critical').length;
 const high=openRisks.filter(r=>scoreBand(scoreOf(r))==='high').length;
 const medium=openRisks.filter(r=>scoreBand(scoreOf(r))==='medium').length;
 const low=openRisks.filter(r=>scoreBand(scoreOf(r))==='low').length;
 const overdueMit=risks.filter(r=>isOverdue(r.mitigationDue)&&r.mitigationStatus!=='Done'&&r.status!=='Closed').length;
 const overdueRev=risks.filter(r=>isOverdue(r.nextReview)&&r.status!=='Closed').length;
 const overdueIssues=issues.filter(i=>isOverdue(i.due)&&i.status!=='Closed'&&i.status!=='Resolved').length;
 const totalOverdue=overdueMit+overdueRev+overdueIssues;
 const iOpen=issues.filter(i=>i.status==='Open').length;
 const iProg=issues.filter(i=>i.status==='In progress').length;
 const iRes=issues.filter(i=>i.status==='Resolved').length;
 const iClosed=issues.filter(i=>i.status==='Closed').length;
 const iCritical=issues.filter(i=>i.status!=='Closed'&&i.status!=='Resolved'&&Number(i.severity)>=5).length;
 const iHigh=issues.filter(i=>i.status!=='Closed'&&i.status!=='Resolved'&&Number(i.severity)===4).length;
 const approved=risks.filter(r=>r.approvedBy&&r.approvedOn).length;
 const approvedPct=risks.length?Math.round((approved/risks.length)*100):0;
 return {total:risks.length,openRisks:openRisks.length,closedRisks,critical,high,medium,low,overdueMit,overdueRev,overdueIssues,totalOverdue,issuesTotal:issues.length,iOpen,iProg,iRes,iClosed,iCritical,iHigh,approved,approvedPct};
}
function bandBar(label,count,total,cls){
 const share=pct(count,total);
 return `<div class="dm-fit-row"><div><span>${label}</span><strong>${count} risk${count===1?'':'s'} · ${share}%</strong></div><span class="dm-fit-track"><i class="dm-fit-fill ${cls}" style="--share:${Math.max(share,count?3:0)}%"></i></span></div>`;
}
function visualDashboard(){
 const s=dashboardStats();
 const isEmpty=!s.total && !s.issuesTotal;
 const totalForDonut=s.critical+s.high+s.medium+s.low+s.closedRisks;
 const critShare=pct(s.critical+s.high,totalForDonut);
 const medShare=pct(s.medium,totalForDonut);
 let overdueClass='all-done',overdueText=`<b>✓ All clear.</b> Nothing overdue right now.`;
 if(s.totalOverdue>5){overdueClass='early';overdueText=`<b>${s.totalOverdue} items overdue.</b> ${s.overdueMit} mitigation${s.overdueMit===1?'':'s'}, ${s.overdueRev} review${s.overdueRev===1?'':'s'}, ${s.overdueIssues} issue${s.overdueIssues===1?'':'s'}.`}
 else if(s.totalOverdue>0){overdueClass='half-done';overdueText=`<b>${s.totalOverdue} overdue.</b> ${s.overdueMit} mitigation${s.overdueMit===1?'':'s'}, ${s.overdueRev} review${s.overdueRev===1?'':'s'}, ${s.overdueIssues} issue${s.overdueIssues===1?'':'s'}.`}
 let apprText=`<b>${s.approvedPct}% approved.</b> ${s.approved} of ${s.total} risks have a sign-off trail.`;
 if(!s.total)apprText=`<b>No risks yet.</b> Approval trail will appear here.`;
 return `<section class="dm-dashboard ${isEmpty?'dm-dashboard-empty':''}" aria-label="Issue and risk register visual overview">
  <article class="dm-card dm-decision">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Live risks</p><h3>Severity view</h3></div><span>${s.openRisks} open · ${s.closedRisks} closed</span></div>
   <div class="dm-donut-row">
    <div class="dm-donut dm-donut-risk" role="img" aria-label="${s.critical+s.high} high or critical, ${s.medium} medium, ${s.low} low" style="--go-share:${critShare}%;--no-go-share:${medShare}%"><div><strong>${s.critical+s.high}</strong><span>High+Crit</span></div></div>
    <dl class="dm-legend">
     <div class="dm-leg-nogo"><dt>Critical</dt><dd>${s.critical}</dd></div>
     <div class="dm-leg-review"><dt>High</dt><dd>${s.high}</dd></div>
     <div class="dm-leg-go"><dt>Medium / Low</dt><dd>${s.medium+s.low}</dd></div>
    </dl>
   </div>
   ${isEmpty?`<p class="dm-empty-hint">Add a risk and set its likelihood × impact to light up the donut.</p>`:''}
  </article>
  <article class="dm-card dm-fit">
   <div class="dm-card-head"><div><p class="dm-eyebrow">By level</p><h3>Open risk distribution</h3></div><span>5×5 L×I bands</span></div>
   <div class="dm-fit-list">
    ${bandBar('Critical · 15–25',s.critical,s.openRisks,'dm-fit-poor')}
    ${bandBar('High · 10–14',s.high,s.openRisks,'dm-fit-weak')}
    ${bandBar('Medium · 5–9',s.medium,s.openRisks,'dm-fit-good')}
    ${bandBar('Low · 1–4',s.low,s.openRisks,'dm-fit-strong')}
   </div>
   ${!s.openRisks?`<p class="dm-empty-hint">Score risks on the grid below to see them bucket here.</p>`:''}
  </article>
  <article class="dm-card dm-coverage">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Overdue tracker</p><h3>Compliance pulse</h3></div><span>${s.totalOverdue} flagged</span></div>
   <div class="dm-coverage-num"><strong>${s.totalOverdue}</strong><span>items past their due date</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${Math.min(s.totalOverdue*15,100)}%;background:${s.totalOverdue?'linear-gradient(90deg,#c7442b,#e56f4a)':'linear-gradient(90deg,#16746e,#4ea89f)'}"></i></div>
   <div class="dm-done-badge ${overdueClass}">${overdueText}</div>
   <dl class="dm-done-key">
    <div><dt>Mitigations</dt><dd>${s.overdueMit}</dd></div>
    <div><dt>Reviews</dt><dd>${s.overdueRev}</dd></div>
    <div><dt>Issues</dt><dd>${s.overdueIssues}</dd></div>
   </dl>
  </article>
  <article class="dm-card dm-assess">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Issues log · ${s.issuesTotal} record${s.issuesTotal===1?'':'s'}</p><h3>What has happened</h3></div><span>${s.iOpen+s.iProg} active</span></div>
   <div class="dm-coverage-num"><strong>${s.iOpen+s.iProg}</strong><span>issues still being resolved</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${s.issuesTotal?Math.round(((s.iRes+s.iClosed)/s.issuesTotal)*100):0}%;background:linear-gradient(90deg,#16746e,#e56f4a)"></i></div>
   <div class="dm-verdict-row">
    <span class="dm-verdict-pill nogo"><b>${s.iCritical}</b> critical</span>
    <span class="dm-verdict-pill review"><b>${s.iHigh}</b> high</span>
    <span class="dm-verdict-pill go"><b>${s.iRes+s.iClosed}</b> resolved/closed</span>
   </div>
   <p class="dm-assess-hint">${apprText}</p>
  </article>
 </section>`;
}

// ---------- Heatmap (5×5) ----------
function heatmapGrid(){
 const grid={};for(let l=1;l<=5;l++)for(let i=1;i<=5;i++)grid[l+'_'+i]=[];
 db.risks.filter(r=>r.status!=='Closed').forEach(r=>{const key=r.likelihood+'_'+r.impact;if(grid[key])grid[key].push(r)});
 const cells=[];
 for(let l=5;l>=1;l--){
  const row=['<tr>'];
  row.push(`<th class="hm-y">L${l}</th>`);
  for(let i=1;i<=5;i++){
   const list=grid[l+'_'+i]||[],sc=l*i,band=scoreBand(sc);
   const tooltip=list.map(r=>`${r.code} ${r.title}`).join('\n')||'No risks here';
   row.push(`<td class="hm-cell risk-band-${band}" title="${esc(tooltip)}"><div class="hm-count">${list.length||''}</div><div class="hm-sc">${sc}</div>${list.length?`<div class="hm-codes">${list.slice(0,3).map(r=>esc(r.code)).join(' ')}${list.length>3?' +'+(list.length-3):''}</div>`:''}</td>`);
  }
  row.push('</tr>');
  cells.push(row.join(''));
 }
 const headerRow='<tr><th></th>'+[1,2,3,4,5].map(i=>`<th class="hm-x">I${i}</th>`).join('')+'</tr>';
 const bandCount=b=>db.risks.filter(r=>r.status!=='Closed'&&scoreBand(scoreOf(r))===b).length;
 return `<div class="grid four" style="margin-bottom:16px">
   ${card('Low',bandCount('low'),'1–4',false)}${card('Medium',bandCount('medium'),'5–9',false)}${card('High',bandCount('high'),'10–14',bandCount('high')>0)}${card('Critical',bandCount('critical'),'15–25',bandCount('critical')>0)}
  </div>
  <section class="panel"><div class="tablewrap"><table class="hm-table">${headerRow}${cells.join('')}</table></div><p class="tiny" style="margin-top:10px">Likelihood: 1 Rare · 2 Unlikely · 3 Possible · 4 Likely · 5 Almost certain. Impact: 1 Negligible · 2 Minor · 3 Moderate · 4 Major · 5 Severe.</p></section>`;
}

// ---------- Small helpers ----------
const infoTip=(text)=>text?`<span class="dm-info" title="${esc(text)}" aria-label="${esc(text)}" tabindex="0">i</span>`:'';

// ---------- Overview tab (replaces old Start) ----------
function overviewView(){
 const m=db.meta;
 return `${window.MMExample?.renderIntegration?.('issue-risk')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <div class="work-meta">
    <label class="work-field"><span>Project / programme</span><input data-field="project" value="${esc(m.project)}" placeholder="e.g. 2027 annual plan"></label>
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field"><span>Default review cadence</span><select data-field="defaultCadence">${getCadences().map(c=>`<option ${m.defaultCadence===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>
   </div>
   ${visualDashboard()}
   <div class="work-sect-head" style="margin-top:16px"><h3>5×5 risk heatmap</h3><p class="tiny">Open risks placed by likelihood (vertical) × impact (horizontal). Hover a cell to see which risks sit there.</p></div>
   ${heatmapGrid()}
   <div class="work-sect-head" style="margin-top:20px"><h3>How this tool works</h3></div>
   <div class="dm-readme">
    <article>
     <h4>Risks vs issues</h4>
     <p><b>Risks</b> are things that <i>might</i> happen and would set you back — focus is on prevention. <b>Issues</b> are things that <i>have</i> happened and need resolving — focus is on getting back on track. Each is kept on its own grid so neither crowds the other out.</p>
    </article>
    <article>
     <h4>5×5 scoring</h4>
     <p>Each risk gets a <b>likelihood</b> (1 Rare → 5 Almost certain) × an <b>impact</b> (1 Negligible → 5 Severe). The product (1–25) places it on the standard compliance heatmap: 1–4 Low, 5–9 Medium, 10–14 High, 15–25 Critical. Issues use a single <b>severity</b> score (1 Minor → 5 Critical).</p>
    </article>
    <article>
     <h4>Compliance trail</h4>
     <p>Every risk carries an <b>approval trail</b> (who signed it off, when) and a <b>review cadence</b> (how often it is re-reviewed, when the next review falls). An "overdue" flag appears automatically on any mitigation or review past its date — the dashboard's Compliance pulse card totals them.</p>
    </article>
    <article>
     <h4>Linking issues to risks</h4>
     <p>An issue can link to a known risk via the <b>Linked risk</b> column. Repeated issues against the same risk mean the mitigation plan is not working — a signal to revisit it rather than keep closing the issues one at a time.</p>
    </article>
    <article>
     <h4>Customising categories & statuses</h4>
     <p>Open the <b>Settings</b> tab to change the category list, the risk statuses, the issue statuses, the mitigation statuses or the review cadences. Changes save instantly and feed every dropdown on both grids. You can always reset to defaults.</p>
    </article>
    <article>
     <h4>Exporting & round-trip</h4>
     <p>Open the <b>Export</b> tab for an Excel workbook that mirrors the on-screen register. Importing that workbook back updates every row by code — safe for sharing with a reviewer, editing offline, and bringing changes back in.</p>
    </article>
   </div>
   <div class="actions" style="margin-top:18px">
    <button class="button" data-action="new-risk">+ Add a risk</button>
    <button class="button" data-action="new-issue">+ Add an issue</button>
    <button class="button secondary" data-action="load-example">Load 3 risk + 3 issue examples</button>
    <a class="button secondary" href="#" data-tab="Risks">Open the risks grid →</a>
    <a class="button secondary" href="#" data-tab="Issues">Open the issues grid →</a>
    <a class="button secondary" href="#" data-tab="Settings">Customise lists →</a>
   </div>
  </section>`;
}

// ---------- Inline grid cell helpers ----------
// Select cell always includes the current value, even if it was removed from
// the Settings list — so a stored "Mitigating" never disappears.
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
 const current=(scope==='risk'?riskFilters:issueFilters)[key]||'';
 return `<label class="dm-filt-label"><span>${esc(label)}</span><select class="dm-filt-sel" data-filter="${esc(key)}" data-filter-scope="${esc(scope)}"><option value="">All</option>${opts.map(([v,l])=>`<option value="${esc(v)}" ${current===v?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`;
}
function matchesRiskFilters(r){
 if(riskFilters.status && (r.status||'Open')!==riskFilters.status)return false;
 if(riskFilters.category && (r.category||'Other')!==riskFilters.category)return false;
 if(riskFilters.band){const b=scoreBand(scoreOf(r));if(b!==riskFilters.band)return false}
 if(riskFilters.q){
  const q=riskFilters.q.toLowerCase();
  const hay=[r.code,r.title,r.description,r.threatens,r.category,r.mitigation,r.mitigationOwner,r.approvedBy,r.notes].join(' ').toLowerCase();
  if(!hay.includes(q))return false;
 }
 return true;
}
function matchesIssueFilters(i){
 if(issueFilters.status && (i.status||'Open')!==issueFilters.status)return false;
 if(issueFilters.category && (i.category||'Other')!==issueFilters.category)return false;
 if(issueFilters.sevBand){const b=sevBand(Number(i.severity||0));if(b!==issueFilters.sevBand)return false}
 if(issueFilters.q){
  const q=issueFilters.q.toLowerCase();
  const hay=[i.code,i.title,i.description,i.affects,i.category,i.resolution,i.owner,i.reportedBy,i.linkedRiskCode,i.notes].join(' ').toLowerCase();
  if(!hay.includes(q))return false;
 }
 return true;
}

// Column defs are built here so info tooltips and (dynamic) options read fresh
function riskColumns(){
 const CATS=getCategories(),RSTAT=getRStatus(),MSTAT=getMStatus(),CAD=getCadences();
 return {
  general:[
   {k:'code',label:'Code',w:46,type:'text',info:'Short reference like R1, R2. Auto-filled when you add a row — change it to match your own numbering if you have one.'},
   {k:'title',label:'Risk title',w:220,type:'area',info:'One line that names the risk. Keep it factual — "Lead safeguarding officer leaves" beats "Staffing problems".'},
   {k:'description',label:'Description',w:260,type:'area',info:'What might happen and under what conditions. Enough detail for someone new to the risk to understand it without you in the room.'},
   {k:'threatens',label:'What it threatens',w:200,type:'area',info:'Which strategic objective, programme, budget line, deadline or compliance obligation would take the hit. Can list several.'},
   {k:'category',label:'Category',w:140,type:'select',opts:CATS,info:'Broad grouping so you can filter and roll up. Edit the list in the Settings tab if your categories differ.'}
  ],
  scoring:[
   {k:'likelihood',label:'L (1–5)',w:110,type:'select',opts:LIKELIHOOD_OPTS,info:'How likely this is to happen in the planning horizon. 1 = Rare (<10%), 3 = Possible (~50%), 5 = Almost certain (>90%).'},
   {k:'impact',label:'I (1–5)',w:110,type:'select',opts:IMPACT_OPTS,info:'How bad it would be if it did happen. 1 = Negligible (brush off), 3 = Moderate (noticeable disruption), 5 = Severe (programme-ending or reputational).'}
  ],
  mitigation:[
   {k:'mitigation',label:'Mitigation plan',w:260,type:'area',info:'What is actually being done to reduce the likelihood or the impact. Specific actions, not aspirations.'},
   {k:'mitigationOwner',label:'Owner',w:140,type:'text',info:'The one person accountable for the mitigation. Not a team — a named individual.'},
   {k:'mitigationDue',label:'Due',w:130,type:'date',info:'When the mitigation plan is meant to be in place. An "overdue" flag appears automatically if this date passes without the status being set to Done.'},
   {k:'mitigationStatus',label:'Status',w:120,type:'select',opts:MSTAT,info:'How far along the mitigation plan is. Edit the available statuses in the Settings tab.'}
  ],
  approval:[
   {k:'approvedBy',label:'Approved by',w:140,type:'text',info:'Who signed off on this risk and its mitigation plan — e.g. "Board", "Director", "Finance Committee". Needed for audit trail.'},
   {k:'approvedOn',label:'Approved on',w:130,type:'date',info:'When the sign-off happened. The "approved" flag on the Score column only shows when both this and Approved by are filled.'}
  ],
  review:[
   {k:'reviewCadence',label:'Cadence',w:120,type:'select',opts:CAD,info:'How often this risk is re-reviewed. Edit the available cadences in the Settings tab.'},
   {k:'nextReview',label:'Next review',w:130,type:'date',info:'When the next re-review is due. "rev overdue" flag appears when this date is in the past.'},
   {k:'lastReview',label:'Last review',w:130,type:'date',info:'When the risk was most recently re-reviewed. Fill this in when you refresh the risk.'}
  ],
  final:[
   {k:'status',label:'Overall',w:120,type:'select',opts:RSTAT,info:'Where this risk sits now. Closed risks drop out of the dashboard and heatmap. Edit the available statuses in the Settings tab.'},
   {k:'notes',label:'Notes',w:220,type:'area',info:'Anything else useful — recent discussions, who to involve on the next review, links to related issues.'}
  ]
 };
}
function issueColumns(){
 const CATS=getCategories(),ISTAT=getIStatus();
 const riskOpts=[['',' — none —'],...db.risks.map(r=>[r.code,`${r.code} · ${r.title||'untitled'}`])];
 return {
  general:[
   {k:'code',label:'Code',w:46,type:'text',info:'Short reference like I1, I2. Auto-filled when you add a row — change it to match your own numbering if you have one.'},
   {k:'title',label:'Issue title',w:220,type:'area',info:'One line that names what has gone wrong. Factual, not aspirational — "Q3 report submitted 11 days late" beats "Reporting problems".'},
   {k:'description',label:'Description',w:260,type:'area',info:'What has happened — the specific incident, who found it, how. Enough detail that a reviewer can decide what to do without talking to you.'},
   {k:'affects',label:'What it affects',w:200,type:'area',info:'Which objective, programme, grant, deadline or compliance obligation is affected right now. Can list several.'},
   {k:'category',label:'Category',w:140,type:'select',opts:CATS,info:'Broad grouping so you can filter and roll up. Edit the list in the Settings tab.'}
  ],
  severity:[
   {k:'severity',label:'Severity (1–5)',w:140,type:'select',opts:SEVERITY_OPTS,info:'How serious this is. 1 = Minor (brush off), 3 = Significant (visible but manageable), 5 = Critical (requires immediate escalation).'},
   {k:'happenedOn',label:'Happened on',w:130,type:'date',info:'When the incident actually took place — not when it was logged.'},
   {k:'reportedBy',label:'Reported by',w:140,type:'text',info:'Who flagged this issue. Can be anonymous (e.g. a safeguarding grievance line).'}
  ],
  resolution:[
   {k:'resolution',label:'Resolution plan',w:260,type:'area',info:'What is being done — or what was done — to resolve this issue and stop it recurring. Specific actions.'},
   {k:'owner',label:'Owner',w:140,type:'text',info:'The one person accountable for resolving this issue.'},
   {k:'due',label:'Due',w:130,type:'date',info:'When resolution is meant to be complete. "overdue" flag appears when this date passes without the status being set to Resolved or Closed.'},
   {k:'status',label:'Status',w:120,type:'select',opts:ISTAT,info:'Where this issue sits now. Edit the available statuses in the Settings tab.'},
   {k:'resolvedOn',label:'Resolved on',w:130,type:'date',info:'When the issue was actually closed off. Fill this when you set status to Resolved.'}
  ],
  context:[
   {k:'linkedRiskCode',label:'Linked risk',w:160,type:'select',opts:riskOpts,info:'If this issue is an instance of a known risk, link it here. Repeated issues against the same risk tell you the mitigation needs changing.'},
   {k:'notes',label:'Notes',w:220,type:'area',info:'Anything else useful — donor notifications sent, next escalation step, links to related issues or risks.'}
  ]
 };
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

// ---------- Risks grid ----------
function risksGridView(){
 const statusOrder={'Open':0,'Monitoring':1,'Mitigating':2,'Closed':9};
 const matching=db.risks.filter(matchesRiskFilters);
 const sorted=[...matching].sort((a,b)=>(statusOrder[a.status]??5)-(statusOrder[b.status]??5)||scoreOf(b)-scoreOf(a));
 const filterCount=['status','category','band','q'].filter(k=>riskFilters[k]).length;
 const CATS=getCategories(),RSTAT=getRStatus();
 const filterBar=`<div class="dm-filter-bar">
  ${filterSelect('risk','status','Status',RSTAT.map(x=>[x,x]))}
  ${filterSelect('risk','category','Category',CATS.map(x=>[x,x]))}
  ${filterSelect('risk','band','Risk level',[['critical','Critical (15–25)'],['high','High (10–14)'],['medium','Medium (5–9)'],['low','Low (1–4)']])}
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" data-filter-scope="risk" value="${esc(riskFilters.q||'')}" placeholder="Code, title, threatens, owner…"></label>
  ${filterCount?`<button class="button secondary" data-action="risk-filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.risks.length}</b> risk${db.risks.length===1?'':'s'}</div>
 </div>`;
 const cols=riskColumns();
 const rows=sorted.map(r=>{
  const sc=scoreOf(r),band=scoreBand(sc);
  const mitOverdue=isOverdue(r.mitigationDue)&&r.mitigationStatus!=='Done'&&r.status!=='Closed';
  const revOverdue=isOverdue(r.nextReview)&&r.status!=='Closed';
  const flags=[];
  if(mitOverdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">mit overdue</small>');
  if(revOverdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">rev overdue</small>');
  if(r.approvedBy&&r.approvedOn)flags.push('<small class="dm-grid-flag dm-grid-flag-ok">approved</small>');
  return `<tr data-row="${esc(r.id)}" data-kind="risk">
   <td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${band}">${sc||'—'}<br><small>${esc(bandLabel(band))}</small></span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}</td>
   ${buildCells(r,cols.general,'risk')}
   ${buildCells(r,cols.scoring,'risk')}
   ${buildCells(r,cols.mitigation,'risk')}
   ${buildCells(r,cols.approval,'risk')}
   ${buildCells(r,cols.review,'risk')}
   ${buildCells(r,cols.final,'risk')}
   <td class="dm-grid-del"><button class="link" data-action="delete-risk" data-id="${esc(r.id)}" title="Delete risk">✕</button></td>
  </tr>`;
 }).join('');
 const totalCols=1+cols.general.length+cols.scoring.length+cols.mitigation.length+cols.approval.length+cols.review.length+cols.final.length+1;
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-verdict">Score</th>
  <th class="dm-grid-group dm-grid-group-general" colspan="${cols.general.length}">General information</th>
  <th class="dm-grid-group dm-grid-group-strategy" colspan="${cols.scoring.length}">5×5 scoring</th>
  <th class="dm-grid-group dm-grid-group-likelihood" colspan="${cols.mitigation.length}">Mitigation</th>
  <th class="dm-grid-group dm-grid-group-technical" colspan="${cols.approval.length}">Approval trail</th>
  <th class="dm-grid-group dm-grid-group-capacity" colspan="${cols.review.length}">Review cadence</th>
  <th class="dm-grid-group dm-grid-group-risk" colspan="${cols.final.length}">Status</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  <th class="dm-grid-th dm-grid-th-sticky">L × I${infoTip('Likelihood × Impact = Score (1–25). The band (Low/Medium/High/Critical) comes from the compliance scale below.')}<br><small>Score · band</small></th>
  ${buildHeaders(cols.general)}
  ${buildHeaders(cols.scoring)}
  ${buildHeaders(cols.mitigation)}
  ${buildHeaders(cols.approval)}
  ${buildHeaders(cols.review)}
  ${buildHeaders(cols.final)}
  <th class="dm-grid-th"></th>
 </tr>`;
 const emptyMsg=db.risks.length?`<b>No risks match these filters.</b> Clear the filters above to see all ${db.risks.length} risks.`:`<b>No risks yet.</b> Click <b>+ Add row</b> below to drop a blank row into the sheet, or <b>Load examples</b> on Overview to seed with 3 realistic risks.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Risk register</h2><p>Things that <i>might</i> happen. Hover a column header's <span class="dm-info-inline">i</span> for a brief explanation. Every cell auto-sizes to show everything you type — nothing is hidden.</p></div><div class="actions"><button class="button" data-action="new-risk">+ Add row</button><button class="button secondary" data-action="load-example">Load examples</button></div></div>
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

// ---------- Issues grid ----------
function issuesGridView(){
 const statusOrder={'Open':0,'In progress':1,'Resolved':2,'Closed':9};
 const matching=db.issues.filter(matchesIssueFilters);
 const sorted=[...matching].sort((a,b)=>(statusOrder[a.status]??5)-(statusOrder[b.status]??5)||Number(b.severity||0)-Number(a.severity||0));
 const filterCount=['status','category','sevBand','q'].filter(k=>issueFilters[k]).length;
 const CATS=getCategories(),ISTAT=getIStatus();
 const filterBar=`<div class="dm-filter-bar">
  ${filterSelect('issue','status','Status',ISTAT.map(x=>[x,x]))}
  ${filterSelect('issue','category','Category',CATS.map(x=>[x,x]))}
  ${filterSelect('issue','sevBand','Severity',[['critical','Critical (5)'],['high','High (4)'],['medium','Medium (3)'],['low','Low (1–2)']])}
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" data-filter-scope="issue" value="${esc(issueFilters.q||'')}" placeholder="Code, title, affects, owner…"></label>
  ${filterCount?`<button class="button secondary" data-action="issue-filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.issues.length}</b> issue${db.issues.length===1?'':'s'}</div>
 </div>`;
 const cols=issueColumns();
 const rows=sorted.map(i=>{
  const sb=sevBand(Number(i.severity||0));
  const overdue=isOverdue(i.due)&&i.status!=='Closed'&&i.status!=='Resolved';
  const flags=[];
  if(overdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">overdue</small>');
  if(i.status==='Resolved'||i.status==='Closed')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">closed</small>');
  if(i.linkedRiskCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">↳ ${esc(i.linkedRiskCode)}</small>`);
  return `<tr data-row="${esc(i.id)}" data-kind="issue">
   <td class="dm-grid-verdict dm-grid-score-cell"><span class="dm-verdict-badge dm-risk-band-${sb}">${i.severity||'—'}<br><small>${esc(bandLabel(sb))}</small></span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}</td>
   ${buildCells(i,cols.general,'issue')}
   ${buildCells(i,cols.severity,'issue')}
   ${buildCells(i,cols.resolution,'issue')}
   ${buildCells(i,cols.context,'issue')}
   <td class="dm-grid-del"><button class="link" data-action="delete-issue" data-id="${esc(i.id)}" title="Delete issue">✕</button></td>
  </tr>`;
 }).join('');
 const totalCols=1+cols.general.length+cols.severity.length+cols.resolution.length+cols.context.length+1;
 const groupHeader=`<tr class="dm-grid-group-row">
  <th class="dm-grid-group dm-grid-group-verdict">Severity</th>
  <th class="dm-grid-group dm-grid-group-general" colspan="${cols.general.length}">General information</th>
  <th class="dm-grid-group dm-grid-group-strategy" colspan="${cols.severity.length}">Reporting</th>
  <th class="dm-grid-group dm-grid-group-likelihood" colspan="${cols.resolution.length}">Resolution</th>
  <th class="dm-grid-group dm-grid-group-technical" colspan="${cols.context.length}">Context</th>
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  <th class="dm-grid-th dm-grid-th-sticky">Severity${infoTip('How bad the issue is right now, from 1 (Minor) to 5 (Critical). Band comes from the same compliance scale as the risk register.')}<br><small>Score · band</small></th>
  ${buildHeaders(cols.general)}
  ${buildHeaders(cols.severity)}
  ${buildHeaders(cols.resolution)}
  ${buildHeaders(cols.context)}
  <th class="dm-grid-th"></th>
 </tr>`;
 const emptyMsg=db.issues.length?`<b>No issues match these filters.</b> Clear the filters above to see all ${db.issues.length} issues.`:`<b>No issues yet.</b> Click <b>+ Add row</b> below to drop a blank row into the sheet, or <b>Load examples</b> on Overview to seed with 3 realistic issues.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Issue log</h2><p>Things that <i>have</i> happened. Hover a column header's <span class="dm-info-inline">i</span> for a brief explanation. Cells auto-size to show everything you type.</p></div><div class="actions"><button class="button" data-action="new-issue">+ Add row</button><button class="button secondary" data-action="load-example">Load examples</button></div></div>
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

// ---------- Settings tab (customise categories & statuses) ----------
function settingsView(){
 const s=db.settings;
 const listBlock=(key,label,arr,help)=>`<article class="dm-settings-block">
  <h3>${esc(label)} ${infoTip(help)}</h3>
  <p class="muted">One value per line. First value is the fallback default on new rows.</p>
  <textarea class="dm-settings-area" data-settings-key="${esc(key)}" rows="${Math.max(arr.length+1,6)}">${esc(arr.join('\n'))}</textarea>
  <small class="dm-settings-count">${arr.length} value${arr.length===1?'':'s'}</small>
 </article>`;
 return `<div class="rowhead section-head"><div><h2>Customise categories & statuses</h2><p>Adapt these lists to your organisation. Every change feeds the dropdowns on the Risks and Issues grids straight away. If an existing row's value is removed from a list, that row keeps it (shown as "<i>not in list</i>" in the dropdown) so no data is ever lost.</p></div><button class="button secondary" data-action="settings-reset">Reset all to defaults</button></div>
  <div class="dm-settings-grid">
   ${listBlock('categories','Risk & issue categories',s.categories,'The list that appears in the Category dropdown on both grids. Keep it short — a long list hides the useful ones. Examples: Financial, Programming, Safeguarding, Legal.')}
   ${listBlock('rStatus','Risk status (overall)',s.rStatus,'The overall risk status options. Default: Open · Monitoring · Mitigating · Closed. Keep "Closed" if you want closed risks to drop out of the dashboard.')}
   ${listBlock('iStatus','Issue status',s.iStatus,'The issue status options. Default: Open · In progress · Resolved · Closed. "Resolved" and "Closed" are what drop an issue out of the active-issues count.')}
   ${listBlock('mStatus','Mitigation status',s.mStatus,'How you track progress on each mitigation plan. Default: Not started · In progress · Done · Blocked. "Done" is what removes a mitigation from the overdue count.')}
   ${listBlock('cadences','Review cadences',s.cadences,'How often each risk is scheduled for re-review. Default: Weekly · Monthly · Quarterly · Semi-annual · Annual · Ad hoc.')}
  </div>
  <p class="tiny" style="margin-top:14px">Changes save as you type. To undo your customisation, use <b>Reset all to defaults</b> above.</p>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year, default review cadence</li><li>Risks — the full register with score, mitigation trail, approval trail and review cadence</li><li>Issues — the full issue log with resolution and linked risk</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-risk'){
  const r=blankRisk();r.code=nextCode('R');
  db.risks.push(r);
  if(tab==='Overview')tab='Risks';
  save('New risk row added. Fill it in below.');
  setTimeout(()=>{const el=root.querySelector(`tr[data-row="${r.id}"] [data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);
  return;
 }
 if(a==='new-issue'){
  const i=blankIssue();i.code=nextCode('I');
  db.issues.push(i);
  if(tab==='Overview')tab='Issues';
  save('New issue row added. Fill it in below.');
  setTimeout(()=>{const el=root.querySelector(`tr[data-row="${i.id}"] [data-grid-field="title"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);
  return;
 }
 if(a==='delete-risk'){const r=db.risks.find(x=>x.id===id);if(!r)return;if(!confirm('Delete this risk? Cannot be undone.'))return;db.risks=db.risks.filter(x=>x.id!==id);save('Risk deleted.');return}
 if(a==='delete-issue'){const i=db.issues.find(x=>x.id===id);if(!i)return;if(!confirm('Delete this issue? Cannot be undone.'))return;db.issues=db.issues.filter(x=>x.id!==id);save('Issue deleted.');return}
 if(a==='risk-filter-clear'){riskFilters={status:'',category:'',band:'',q:''};render();return}
 if(a==='issue-filter-clear'){issueFilters={status:'',category:'',sevBand:'',q:''};render();return}
 if(a==='settings-reset'){
  if(!confirm('Reset all categories, statuses and cadences to defaults? Your risks and issues keep their stored values — only the dropdown lists are reset.'))return;
  db.settings=blankSettings();
  save('Lists reset to defaults.');return;
 }
 if(a==='load-example'){
  const hasData=db.risks.length||db.issues.length;
  if(hasData && !confirm('Replace the current risks and issues with the worked examples? Download a backup first if you need them.'))return;
  db.risks=makeExampleRisks();
  db.issues=makeExampleIssues();
  if(!db.meta.organisation)db.meta.organisation='Harvest Learning Foundation';
  if(!db.meta.project)db.meta.project='2027 annual plan';
  save('Three risks and three issues loaded. Critical, high and medium bands seeded so you can see the dashboard, filters and overdue flags in action — edit, keep or delete each row.');
  return;
 }
 if(a==='xlsx'){try{download('Method-into-Impact-issue-risk-register.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-issue-risk-register.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-issue-risk-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

// ---------- Excel ----------
function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Issue & Risk Management',['Compliance-grade register. 5×5 L×I scoring, mitigation trail, approval trail and review cadence.','Risks are what might happen; Issues are what has happened. Each row has a code for round-trip import.','Importing this file back to the tool updates every row by code. Changing codes creates new rows.']),
  metaSheet(db.meta),
  {name:'Risks',rows:[
   ['Code','Title','Description','What it threatens (source)','What it threatens (ref)','What it threatens (text)','Category','Likelihood','Impact','Score','Band','Mitigation','Mitigation owner','Mitigation due','Mitigation status','Approved by','Approved on','Review cadence','Next review','Last reviewed','Status','Notes'],
   ...(withData?db.risks.map(r=>[r.code,r.title,r.description,r.threatensSource,r.threatensRef,r.threatens,r.category,r.likelihood,r.impact,scoreOf(r),bandLabel(scoreBand(scoreOf(r))),r.mitigation,r.mitigationOwner,r.mitigationDue,r.mitigationStatus,r.approvedBy,r.approvedOn,r.reviewCadence,r.nextReview,r.lastReview,r.status,r.notes]):[])
  ]},
  {name:'Issues',rows:[
   ['Code','Title','Description','What it affects (source)','What it affects (ref)','What it affects (text)','Category','Severity','Happened on','Reported by','Resolution','Owner','Due','Status','Resolved on','Linked risk','Notes'],
   ...(withData?db.issues.map(i=>[i.code,i.title,i.description,i.affectsSource,i.affectsRef,i.affects,i.category,i.severity,i.happenedOn,i.reportedBy,i.resolution,i.owner,i.due,i.status,i.resolvedOn,i.linkedRiskCode,i.notes]):[])
  ]},
  schemaSheet({Risks:'code,title,description,threatensSource,threatensRef,threatens,category,likelihood,impact,mitigation,mitigationOwner,mitigationDue,mitigationStatus,approvedBy,approvedOn,reviewCadence,nextReview,lastReview,status,notes',Issues:'code,title,description,affectsSource,affectsRef,affects,category,severity,happenedOn,reportedBy,resolution,owner,due,status,resolvedOn,linkedRiskCode,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const rows=[['Type','Code','Title','Category','Score/Sev','Owner','Due','Status'],...db.risks.map(r=>['Risk',r.code,r.title,r.category,scoreOf(r),r.mitigationOwner,r.mitigationDue,r.status]),...db.issues.map(i=>['Issue',i.code,i.title,i.category,i.severity,i.owner,i.due,i.status])];
 download('Method-into-Impact-issue-risk.csv',csv(rows),'text/csv;charset=utf-8');
}

async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const riskRows=rowsToObjects(findSheet(data,'Risks'));
  const issueRows=rowsToObjects(findSheet(data,'Issues'));
  if(riskRows?.length)db.risks=riskRows.map(r=>({...blankRisk(),code:r.Code||'',title:r.Title||'',description:r.Description||'',threatensSource:r['What it threatens (source)']||'manual',threatensRef:r['What it threatens (ref)']||'',threatens:r['What it threatens (text)']||'',category:r.Category||'Other',likelihood:Number(r.Likelihood)||3,impact:Number(r.Impact)||3,mitigation:r.Mitigation||'',mitigationOwner:r['Mitigation owner']||'',mitigationDue:r['Mitigation due']||'',mitigationStatus:r['Mitigation status']||'Not started',approvedBy:r['Approved by']||'',approvedOn:r['Approved on']||'',reviewCadence:r['Review cadence']||'Quarterly',nextReview:r['Next review']||'',lastReview:r['Last reviewed']||'',status:r.Status||'Open',notes:r.Notes||''}));
  if(issueRows?.length)db.issues=issueRows.map(i=>({...blankIssue(),code:i.Code||'',title:i.Title||'',description:i.Description||'',affectsSource:i['What it affects (source)']||'manual',affectsRef:i['What it affects (ref)']||'',affects:i['What it affects (text)']||'',category:i.Category||'Other',severity:Number(i.Severity)||3,happenedOn:i['Happened on']||today(),reportedBy:i['Reported by']||'',resolution:i.Resolution||'',owner:i.Owner||'',due:i.Due||'',status:i.Status||'Open',resolvedOn:i['Resolved on']||'',linkedRiskCode:i['Linked risk']||'',notes:i.Notes||''}));
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){
 try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}
}

// ---------- Autosize textarea so no text is ever cut ----------
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

// ---------- Wire Settings tab (customise lists) ----------
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
   // Update the "N values" counter inline
   const cnt=el.parentElement.querySelector('.dm-settings-count');
   if(cnt)cnt.textContent=`${list.length} value${list.length===1?'':'s'}`;
   autosize(el);
   clearTimeout(timer);timer=setTimeout(()=>persist(db),400);
  });
 });
}

// ---------- Wire grid cells (live persist + dashboard re-render + autosize) ----------
function wireGrid(root){
 const grid=root.querySelector('.dm-grid');
 wireFilters(root);
 if(!grid)return;
 // Initial autosize of every textarea so pre-filled rows show full text.
 grid.querySelectorAll('textarea.dm-grid-area').forEach(autosize);
 let timer;
 const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);rerenderDashboard(root)},300)};
 grid.querySelectorAll('[data-grid-field]').forEach(el=>{
  const ev=(el.tagName==='SELECT'||el.type==='date')?'change':'input';
  el.addEventListener(ev,()=>{
   const id=el.dataset.gridId,f=el.dataset.gridField,kind=el.dataset.gridKind;
   const list=kind==='risk'?db.risks:db.issues;
   const d=list.find(x=>x.id===id);if(!d)return;
   d[f]=el.value;
   if(f==='likelihood'||f==='impact'||f==='severity')d[f]=Number(el.value)||0;
   stamp(d);
   if(el.tagName==='TEXTAREA')autosize(el);
   const row=el.closest('tr[data-row]');
   if(row){
    const cell=row.querySelector('.dm-grid-score-cell');
    if(cell){
     if(kind==='risk'){
      const sc=scoreOf(d),band=scoreBand(sc);
      const mitOverdue=isOverdue(d.mitigationDue)&&d.mitigationStatus!=='Done'&&d.status!=='Closed';
      const revOverdue=isOverdue(d.nextReview)&&d.status!=='Closed';
      const flags=[];
      if(mitOverdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">mit overdue</small>');
      if(revOverdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">rev overdue</small>');
      if(d.approvedBy&&d.approvedOn)flags.push('<small class="dm-grid-flag dm-grid-flag-ok">approved</small>');
      cell.innerHTML=`<span class="dm-verdict-badge dm-risk-band-${band}">${sc||'—'}<br><small>${esc(bandLabel(band))}</small></span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}`;
     } else {
      const sb=sevBand(Number(d.severity||0));
      const overdue=isOverdue(d.due)&&d.status!=='Closed'&&d.status!=='Resolved';
      const flags=[];
      if(overdue)flags.push('<small class="dm-grid-flag dm-grid-flag-bad">overdue</small>');
      if(d.status==='Resolved'||d.status==='Closed')flags.push('<small class="dm-grid-flag dm-grid-flag-ok">closed</small>');
      if(d.linkedRiskCode)flags.push(`<small class="dm-grid-flag dm-grid-flag-neutral">↳ ${esc(d.linkedRiskCode)}</small>`);
      cell.innerHTML=`<span class="dm-verdict-badge dm-risk-band-${sb}">${d.severity||'—'}<br><small>${esc(bandLabel(sb))}</small></span>${flags.length?`<div class="dm-grid-flags">${flags.join(' ')}</div>`:''}`;
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
  const key=el.dataset.filter;const scope=el.dataset.filterScope||'risk';
  const target=scope==='risk'?riskFilters:issueFilters;
  if(el.tagName==='SELECT'){
   el.addEventListener('change',()=>{target[key]=el.value;render()});
  } else {
   el.addEventListener('input',()=>{clearTimeout(qTimer);qTimer=setTimeout(()=>{target[key]=el.value;render();const i=root.querySelector('.dm-filt-input');if(i)i.focus()},200)});
  }
 });
}

function render(){
 const views={'Overview':overviewView,'Risks':risksGridView,'Issues':issuesGridView,'Settings':settingsView,'Export':exportViewPanel};
 if(!views[tab])tab='Overview';
 root.innerHTML=shell({eyebrow:'Cross-cutting · Issue & risk management · build 2026-10-09',title:'Issue & Risk Management',intro:'Compliance-grade register. Risks (might happen) and Issues (have happened) kept separate. 5×5 L×I scoring, mitigation and approval trail, review cadence with overdue flags. Customise the lists in Settings.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=10&lesson=risk-register',label:'Review Module 10'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit:()=>{},importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
 wireSettings(root);
 wireGrid(root);
}

persist(db);render();
})();
