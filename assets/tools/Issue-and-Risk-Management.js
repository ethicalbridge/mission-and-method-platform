/* Issue & Risk Management — cross-cutting compliance register.
   Compliance-grade: 5×5 L×I scoring, mitigation owner/due/status, approval
   trail, review cadence with overdue flag, separate Risk register and Issue
   log. Risks and issues can be linked to an item from any other tool
   (Strategic Objectives, ToC pathways, Strategy KPIs, MEAL indicators, Gantt
   tasks) OR described in free text — the user picks either path.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-issue-risk-v2',LEGACY='mission-method-issue-risk-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2',SK_KEY='mission-method-strategy-kpis-v2',MEAL_KEY='mission-method-meal-strategy-v3',GANTT_KEY='mission-method-gantt-v2';
const TABS=['Start','Risks','Issues','Heatmap','Export'];
const R_STATUS=['Open','Monitoring','Mitigating','Closed'];
const I_STATUS=['Open','In progress','Resolved','Closed'];
const M_STATUS=['Not started','In progress','Done','Blocked'];
const CADENCES=['Weekly','Monthly','Quarterly','Semi-annual','Annual','Ad hoc'];
const CATEGORIES=['Financial','Programming','Partners','Compliance','HR','Operations','Safeguarding','MEAL quality','Donor compliance','Reputation','Legal','Other'];

const blankRisk=()=>({id:uid(),code:'',title:'',description:'',threatensSource:'manual',threatensRef:'',threatens:'',category:'Other',likelihood:3,impact:3,mitigation:'',mitigationOwner:'',mitigationDue:'',mitigationStatus:'Not started',approvedBy:'',approvedOn:'',reviewCadence:'Quarterly',nextReview:'',lastReview:'',status:'Open',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankIssue=()=>({id:uid(),code:'',title:'',description:'',affectsSource:'manual',affectsRef:'',affects:'',category:'Other',severity:3,happenedOn:today(),resolution:'',owner:'',due:'',status:'Open',reportedBy:'',resolvedOn:'',linkedRiskCode:'',notes:'',createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,preparedBy:'',defaultCadence:'Quarterly',notes:''});
const blank=()=>({version:2,meta:blankMeta(),risks:[],issues:[]});

function migrateV1(v1){
 const out=blank();
 try{
  if(v1.settings?.organisation)out.meta.organisation=v1.settings.organisation;
  (v1.risks||[]).forEach((r,i)=>{
   const code=r.id||'R'+(i+1);
   out.risks.push({...blankRisk(),code,title:r.title||'',description:r.description||'',threatens:[r.project,r.department].filter(Boolean).join(' · '),category:CATEGORIES.includes(r.category)?r.category:'Other',likelihood:clamp(r.likelihood,1,5)||3,impact:clamp(r.impact,1,5)||3,mitigation:r.mitigation||r.controls||'',mitigationOwner:r.mitigationOwner||r.owner||'',mitigationDue:r.due||'',mitigationStatus:'In progress',status:R_STATUS.includes(r.status)?r.status:'Open',notes:r.notes||'',createdAt:r.history?.[r.history.length-1]?.at||now()});
  });
  (v1.issues||[]).forEach((is,i)=>{
   const code=is.id||'I'+(i+1);
   const link=(is.riskIds||[])[0];const linkedCode=link?(v1.risks||[]).find(r=>r.id===link)?.id:'';
   out.issues.push({...blankIssue(),code,title:is.title||'',description:is.description||'',affects:[is.project,is.department].filter(Boolean).join(' · '),category:CATEGORIES.includes(is.category)?is.category:'Other',severity:is.severity==='Critical'?5:is.severity==='High'?4:is.severity==='Medium'?3:is.severity==='Low'?2:3,happenedOn:is.identified||today(),resolution:is.resolution||'',owner:is.owner||'',due:is.due||'',status:I_STATUS.includes(is.status)?is.status:'Open',resolvedOn:is.closedAt||'',linkedRiskCode:linkedCode||'',notes:is.notes||'',createdAt:is.identified||now()});
  });
 }catch(e){console.warn('risk migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.risk-cleanup-v2',blank)||d;if(!Array.isArray(d.risks))d.risks=[];if(!Array.isArray(d.issues))d.issues=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

// ---------- Cross-tool: items users may want to link a risk/issue to ----------
const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
function suiteItems(){
 const items=[];
 const so=readStore(SO_KEY);(so?.objectives||[]).forEach(o=>items.push({group:'Strategic objectives',source:'so',ref:o.code,label:`${o.code} · ${o.title}`}));
 const toc=readStore(TOC_KEY);(toc?.pathways||[]).forEach(p=>items.push({group:'Theory of Change pathways',source:'toc',ref:p.id,label:p.objective||'Untitled pathway'}));
 const sk=readStore(SK_KEY);(sk?.kpis||[]).forEach(k=>items.push({group:'Strategy KPIs',source:'sk-kpi',ref:k.code,label:`${k.code} · ${k.name}`}));(sk?.initiatives||[]).forEach(i=>items.push({group:'Strategy KPIs initiatives',source:'sk-init',ref:i.code,label:`${i.code} · ${i.title}`}));
 const meal=readStore(MEAL_KEY);(meal?.indicators||[]).forEach(i=>items.push({group:'MEAL indicators',source:'meal',ref:i.code,label:`${i.code} · ${i.name||'untitled'}`}));
 const gantt=readStore(GANTT_KEY);(gantt?.tasks||[]).filter(t=>t.title).forEach(t=>items.push({group:'Gantt tasks',source:'gantt',ref:t.code,label:`${t.code||'·'} · ${t.title}`}));
 return items;
}

// ---------- Scoring helpers (5×5) ----------
const scoreOf=r=>Number(r.likelihood||0)*Number(r.impact||0);
const scoreBand=n=>n>=15?'critical':n>=10?'high':n>=5?'medium':n>=1?'low':'none';
const bandLabel=b=>({critical:'Critical',high:'High',medium:'Medium',low:'Low',none:'—'}[b]);
const isOverdue=d=>d&&d<today();

// ---------- Threatens / Affects field (dropdown of suite items OR manual text) ----------
function threatensField(r,prefix='threatens'){
 const items=suiteItems();
 const groups={};items.forEach(it=>{(groups[it.group]=groups[it.group]||[]).push(it)});
 const refVal=r[prefix+'Ref']||'';const srcVal=r[prefix+'Source']||'manual';const textVal=r[prefix]||'';
 const combined=srcVal==='manual'?'manual':`${srcVal}::${refVal}`;
 return `<label class="field full"><span class="label">${prefix==='threatens'?'What this risk threatens':'What this issue affects'} ${tip('Either pick an item from your other tools or type free text in the box below.')}</span>
  <select name="${prefix}Pick" data-threatens-pick="${prefix}">
   <option value="manual" ${srcVal==='manual'?'selected':''}>— Type free text below —</option>
   ${items.length?Object.entries(groups).map(([g,arr])=>`<optgroup label="${esc(g)}">${arr.map(it=>`<option value="${esc(it.source+'::'+it.ref)}" ${combined===(it.source+'::'+it.ref)?'selected':''}>${esc(it.label)}</option>`).join('')}</optgroup>`).join(''):'<option disabled>No items found in your other tools yet</option>'}
  </select>
  <textarea name="${prefix}" placeholder="${prefix==='threatens'?'e.g. the Q4 cohort delivery deadline, financial sustainability, safeguarding of participants':'e.g. what has gone wrong and what it has affected so far'}" style="margin-top:6px">${esc(textVal)}</textarea>
  <small>Pick from the dropdown to link to an objective, pathway, KPI, indicator or Gantt task. Or just type below. Both can be used together.</small>
 </label>`;
}
function parseThreatens(d,prefix='threatens'){
 const pick=String(d[prefix+'Pick']||'manual');
 if(pick==='manual')return {source:'manual',ref:''};
 const [source,ref]=pick.split('::');return {source:source||'manual',ref:ref||''};
}
function threatensLabel(r,prefix='threatens'){
 const src=r[prefix+'Source'],ref=r[prefix+'Ref'],txt=r[prefix];
 if(src==='manual'||!ref)return esc(txt||'<span class="muted">—</span>');
 const item=suiteItems().find(it=>it.source===src&&it.ref===ref);
 const link=item?`<a href="${esc(toolHref(src))}" class="link">${esc(item.label)}</a>`:esc(ref);
 return `${link}${txt?`<br><small>${esc(txt)}</small>`:''}`;
}
const toolHref=src=>({so:'Strategic-Objectives.html',toc:'Theory-of-Change-Builder.html','sk-kpi':'Strategy-KPIs-and-Annual-Planning.html','sk-init':'Strategy-KPIs-and-Annual-Planning.html',meal:'MEAL-Strategy.html',gantt:'Gantt-Project-Planner.html'}[src]||'#');

// ---------- Risk modal ----------
function riskModal(r){
 const isNew=!r;r=r||blankRisk();
 const sc=scoreOf(r),band=scoreBand(sc);
 return modal(isNew?'Add risk':'Edit risk',`<form data-form="risk" data-id="${esc(r.id||'')}" class="form">
  ${field('Code','code',r.code||nextCode('R'),'text','required','Short reference, e.g. R1.')}
  ${field('Risk title','title',r.title,'text','required')}
  ${area('Description','description',r.description,'What might happen and under what conditions.')}
  ${threatensField(r,'threatens')}
  ${select('Category','category',CATEGORIES,r.category)}
  <div class="form split-5x5">
   ${select('Likelihood (1–5)','likelihood',[['1','1 · Rare'],['2','2 · Unlikely'],['3','3 · Possible'],['4','4 · Likely'],['5','5 · Almost certain']],String(r.likelihood||3))}
   ${select('Impact (1–5)','impact',[['1','1 · Negligible'],['2','2 · Minor'],['3','3 · Moderate'],['4','4 · Major'],['5','5 · Severe']],String(r.impact||3))}
   <div class="field"><span class="label">Score · band</span><div class="risk-score-preview risk-band-${band}"><b>${sc||'—'}</b> · ${bandLabel(band)}</div></div>
  </div>
  <h3 class="form-section">Mitigation</h3>
  ${area('Mitigation plan','mitigation',r.mitigation,'What is being done to reduce likelihood or impact.')}
  ${field('Mitigation owner','mitigationOwner',r.mitigationOwner)}
  ${field('Mitigation due','mitigationDue',r.mitigationDue,'date')}
  ${select('Mitigation status','mitigationStatus',M_STATUS,r.mitigationStatus||'Not started')}
  <h3 class="form-section">Approval trail <small style="font-weight:400;color:var(--muted)">Compliance record of who signed off</small></h3>
  ${field('Approved by','approvedBy',r.approvedBy,'text','','e.g. Board, Director, Programme committee')}
  ${field('Approved on','approvedOn',r.approvedOn,'date')}
  <h3 class="form-section">Review</h3>
  ${select('Review cadence','reviewCadence',CADENCES,r.reviewCadence||'Quarterly')}
  ${field('Next review','nextReview',r.nextReview,'date','','When this risk must be re-reviewed. Red flag appears if past.')}
  ${field('Last reviewed','lastReview',r.lastReview,'date')}
  ${select('Overall status','status',R_STATUS,r.status||'Open')}
  ${area('Notes','notes',r.notes)}
  ${formEnd('Save risk',{deleteId:isNew?'':r.id,deleteLabel:'Delete risk'})}
 </form>`);
}

function issueModal(i){
 const isNew=!i;i=i||blankIssue();
 const riskOpts=db.risks.map(r=>[r.code,`${r.code} · ${r.title}`]);
 return modal(isNew?'Add issue':'Edit issue',`<form data-form="issue" data-id="${esc(i.id||'')}" class="form">
  ${field('Code','code',i.code||nextCode('I'),'text','required')}
  ${field('Issue title','title',i.title,'text','required')}
  ${area('Description','description',i.description,'What has happened. Keep it factual.')}
  ${threatensField(i,'affects')}
  ${select('Category','category',CATEGORIES,i.category)}
  ${select('Severity (1–5)','severity',[['1','1 · Minor'],['2','2 · Noticeable'],['3','3 · Significant'],['4','4 · Serious'],['5','5 · Critical']],String(i.severity||3))}
  ${field('When it happened','happenedOn',i.happenedOn,'date')}
  ${field('Reported by','reportedBy',i.reportedBy)}
  <h3 class="form-section">Resolution</h3>
  ${area('Resolution plan','resolution',i.resolution,'What needs to be done to close the issue.')}
  ${field('Owner','owner',i.owner)}
  ${field('Due date','due',i.due,'date')}
  ${select('Status','status',I_STATUS,i.status||'Open')}
  ${field('Resolved on','resolvedOn',i.resolvedOn,'date')}
  ${riskOpts.length?select('Linked risk (optional)','linkedRiskCode',riskOpts,i.linkedRiskCode,'If this issue is an instance of a known risk, link it here.','None'):field('Linked risk code (optional)','linkedRiskCode',i.linkedRiskCode)}
  ${area('Notes','notes',i.notes)}
  ${formEnd('Save issue',{deleteId:isNew?'':i.id,deleteLabel:'Delete issue'})}
 </form>`);
}

const nextCode=prefix=>{const list=prefix==='R'?db.risks:db.issues;const nums=list.map(x=>Number(String(x.code||'').replace(prefix,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const openR=db.risks.filter(r=>r.status!=='Closed').length;
 const highR=db.risks.filter(r=>r.status!=='Closed'&&scoreBand(scoreOf(r))==='critical'||scoreBand(scoreOf(r))==='high').length;
 const openI=db.issues.filter(i=>i.status!=='Closed'&&i.status!=='Resolved').length;
 const overdueM=db.risks.filter(r=>isOverdue(r.mitigationDue)&&r.mitigationStatus!=='Done').length;
 const overdueRev=db.risks.filter(r=>isOverdue(r.nextReview)&&r.status!=='Closed').length;
 return `${window.MMExample?.renderIntegration?.('issue-risk')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Compliance-grade register. 5×5 likelihood × impact scoring, mitigation trail, approval trail, review cadence with overdue flag. Risks (might happen) and Issues (have happened) are kept separate.</p>
   <div class="work-meta">
    <label class="work-field"><span>Project / programme</span><input data-field="project" value="${esc(m.project)}" placeholder="e.g. 2026 annual plan"></label>
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field"><span>Default review cadence</span><select data-field="defaultCadence">${CADENCES.map(c=>`<option ${m.defaultCadence===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Open risks',openR,`${highR} high or critical`,highR>0)}
    ${card('Open issues',openI,'Issues still being resolved',openI>0)}
    ${card('Mitigations overdue',overdueM,'Mitigation plans past their due date',overdueM>0)}
    ${card('Reviews overdue',overdueRev,'Risks past their next-review date',overdueRev>0)}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Risk register vs issue log — <b>Risks</b> are things that <i>might</i> happen (focus: prevention). <b>Issues</b> are things that <i>have</i> happened (focus: resolution). Each can either link to an item from your other tools (objectives, KPIs, indicators, Gantt tasks) or be described in free text.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-risk">+ Add a risk</button>
    <button class="button" data-action="new-issue">+ Add an issue</button>
    <a class="button secondary" href="#" data-tab="Risks">Go to risk register →</a>
    <a class="button secondary" href="#" data-tab="Issues">Go to issue log →</a>
    <a class="button secondary" href="#" data-tab="Heatmap">View 5×5 heatmap →</a>
   </div>
  </section>`;
}

function risksView(){
 const sorted=[...db.risks].sort((a,b)=>scoreOf(b)-scoreOf(a));
 const rows=sorted.map(r=>{
  const sc=scoreOf(r),band=scoreBand(sc);
  const mitOverdue=isOverdue(r.mitigationDue)&&r.mitigationStatus!=='Done';
  const revOverdue=isOverdue(r.nextReview)&&r.status!=='Closed';
  return `<tr>
   <td><b>${esc(r.code)}</b></td>
   <td><b>${esc(r.title||'Untitled')}</b>${r.description?`<br><small>${esc(r.description)}</small>`:''}</td>
   <td>${threatensLabel(r,'threatens')}</td>
   <td>${esc(r.category)}</td>
   <td class="risk-score-cell risk-band-${band}" title="L${r.likelihood} × I${r.impact} = ${sc}"><b>${sc||'—'}</b><br><small>${bandLabel(band)}</small></td>
   <td>${esc(r.mitigationOwner||'—')}<br><small>due ${esc(fmtDate(r.mitigationDue)||'—')} ${mitOverdue?'<span class="pill bad" style="font-size:9px">overdue</span>':''}</small><br>${pill(r.mitigationStatus||'Not started')}</td>
   <td>${r.approvedBy?`${esc(r.approvedBy)}<br><small>${esc(fmtDate(r.approvedOn)||'')}</small>`:'<span class="muted">—</span>'}</td>
   <td>${esc(r.reviewCadence||'—')}<br><small>next ${esc(fmtDate(r.nextReview)||'—')} ${revOverdue?'<span class="pill bad" style="font-size:9px">overdue</span>':''}</small></td>
   <td>${pill(r.status||'Open')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-risk" data-id="${esc(r.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Risk register</h2><p>Things that <i>might</i> happen and would set you back. Scored on a 5×5 likelihood × impact grid. Mitigation and approval columns are the audit trail; a review flagged "overdue" means the next-review date has passed.</p></div><button class="button" data-action="new-risk">+ Add a risk</button></div>
  ${table(['Code','Risk','What it threatens','Category','Score','Mitigation','Approved by','Review','Status',''],rows,'No risks logged yet. Click "Add a risk" to start.')}`;
}

function issuesView(){
 const sorted=[...db.issues].sort((a,b)=>Number(b.severity||0)-Number(a.severity||0));
 const rows=sorted.map(i=>{
  const overdue=isOverdue(i.due)&&i.status!=='Closed'&&i.status!=='Resolved';
  const sevBand=i.severity>=5?'critical':i.severity>=4?'high':i.severity>=3?'medium':'low';
  const linked=i.linkedRiskCode?db.risks.find(r=>r.code===i.linkedRiskCode):null;
  return `<tr>
   <td><b>${esc(i.code)}</b></td>
   <td><b>${esc(i.title||'Untitled')}</b>${i.description?`<br><small>${esc(i.description)}</small>`:''}</td>
   <td>${threatensLabel(i,'affects')}</td>
   <td>${esc(i.category)}</td>
   <td class="risk-score-cell risk-band-${sevBand}"><b>${i.severity||'—'}</b></td>
   <td>${esc(fmtDate(i.happenedOn)||'—')}${i.reportedBy?`<br><small>${esc(i.reportedBy)}</small>`:''}</td>
   <td>${esc(i.owner||'—')}<br><small>due ${esc(fmtDate(i.due)||'—')} ${overdue?'<span class="pill bad" style="font-size:9px">overdue</span>':''}</small></td>
   <td>${pill(i.status||'Open')}${i.resolvedOn?`<br><small>${esc(fmtDate(i.resolvedOn))}</small>`:''}</td>
   <td>${linked?`<a class="link" href="#" data-action="edit-risk" data-id="${esc(linked.id)}">${esc(linked.code)}</a>`:'<span class="muted">—</span>'}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-issue" data-id="${esc(i.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Issue log</h2><p>Things that <i>have</i> happened and need resolving. Each issue can optionally link to a known risk — repeated issues against the same risk mean the mitigation needs to change.</p></div><button class="button" data-action="new-issue">+ Add an issue</button></div>
  ${table(['Code','Issue','What it affects','Category','Severity','Happened','Owner','Status','Linked risk',''],rows,'No issues logged yet. Click "Add an issue" to record one.')}`;
}

function heatmapView(){
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
 return `<div class="rowhead section-head"><div><h2>5×5 risk heatmap</h2><p>Open risks placed by likelihood (vertical) × impact (horizontal). Hover a cell to see which risks sit there. Colour bands follow the standard compliance model: 1–4 Low, 5–9 Medium, 10–14 High, 15–25 Critical.</p></div></div>
  <div class="grid four" style="margin-bottom:16px">
   ${card('Low',bandCount('low'),'1–4',false)}${card('Medium',bandCount('medium'),'5–9',false)}${card('High',bandCount('high'),'10–14',bandCount('high')>0)}${card('Critical',bandCount('critical'),'15–25',bandCount('critical')>0)}
  </div>
  <section class="panel"><div class="tablewrap"><table class="hm-table">${headerRow}${cells.join('')}</table></div><p class="tiny" style="margin-top:10px">Likelihood: 1 Rare · 2 Unlikely · 3 Possible · 4 Likely · 5 Almost certain. Impact: 1 Negligible · 2 Minor · 3 Moderate · 4 Major · 5 Severe.</p></section>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, project, year, default review cadence</li><li>Risks — the full register with score, mitigation trail, approval trail and review cadence</li><li>Issues — the full issue log with resolution and linked risk</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-risk'){dlg=riskModal();render();return}
 if(a==='edit-risk'){const r=db.risks.find(x=>x.id===id);if(r){dlg=riskModal(r);render()}return}
 if(a==='new-issue'){dlg=issueModal();render();return}
 if(a==='edit-issue'){const i=db.issues.find(x=>x.id===id);if(i){dlg=issueModal(i);render()}return}
 if(a==='delete'){
  const risk=db.risks.find(r=>r.id===id),issue=db.issues.find(i=>i.id===id);
  if(risk){if(!confirm('Delete this risk?'))return;db.risks=db.risks.filter(r=>r.id!==id)}
  else if(issue){if(!confirm('Delete this issue?'))return;db.issues=db.issues.filter(i=>i.id!==id)}
  else return;
  dlg='';save('Deleted.');return;
 }
 if(a==='xlsx'){try{download('Mission-and-Method-issue-risk-register.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-issue-risk-register.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='load-example'){/* placeholder — risk tool has no auto example yet */return}
 if(a==='download-template'){try{download('Mission-and-Method-issue-risk-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 if(kind==='risk'){
  const existing=db.risks.find(r=>r.id===form.dataset.id);
  const r=existing||{...blankRisk()};
  const tr=parseThreatens(d,'threatens');
  Object.assign(r,{code:s(d.code)||r.code||nextCode('R'),title:s(d.title),description:s(d.description),threatensSource:tr.source,threatensRef:tr.ref,threatens:s(d.threatens),category:d.category,likelihood:Number(d.likelihood)||3,impact:Number(d.impact)||3,mitigation:s(d.mitigation),mitigationOwner:s(d.mitigationOwner),mitigationDue:d.mitigationDue||'',mitigationStatus:d.mitigationStatus||'Not started',approvedBy:s(d.approvedBy),approvedOn:d.approvedOn||'',reviewCadence:d.reviewCadence||'Quarterly',nextReview:d.nextReview||'',lastReview:d.lastReview||'',status:d.status||'Open',notes:s(d.notes)});
  stamp(r);
  if(!existing)db.risks.push(r);
  dlg='';save('Risk saved.');return;
 }
 if(kind==='issue'){
  const existing=db.issues.find(i=>i.id===form.dataset.id);
  const i=existing||{...blankIssue()};
  const tr=parseThreatens(d,'affects');
  Object.assign(i,{code:s(d.code)||i.code||nextCode('I'),title:s(d.title),description:s(d.description),affectsSource:tr.source,affectsRef:tr.ref,affects:s(d.affects),category:d.category,severity:Number(d.severity)||3,happenedOn:d.happenedOn||today(),reportedBy:s(d.reportedBy),resolution:s(d.resolution),owner:s(d.owner),due:d.due||'',status:d.status||'Open',resolvedOn:d.resolvedOn||'',linkedRiskCode:s(d.linkedRiskCode),notes:s(d.notes)});
  stamp(i);
  if(!existing)db.issues.push(i);
  dlg='';save('Issue saved.');return;
 }
}

// ---------- Excel ----------
function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Issue & Risk Management',[
   'Compliance-grade register. 5×5 L×I scoring, mitigation trail, approval trail and review cadence.',
   'Risks are what might happen; Issues are what has happened. Each row has a code for round-trip import.',
   'Importing this file back to the tool updates every row by code. Changing codes creates new rows.'
  ]),
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
 download('Mission-and-Method-issue-risk.csv',csv(rows),'text/csv;charset=utf-8');
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

// ---------- Live meta editing (Start workspace) ----------
function wireStart(root){
 const box=root.querySelector('.work-box');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};
 box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{
  el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()});
  el.addEventListener('change',()=>{if(el.tagName==='SELECT'){const k=el.dataset.field;db.meta[k]=el.value;schedule()}});
 });
 // Toggle threatens-pick dropdowns in modals: when user picks a suite item, auto-fill the textarea with the item label as a note
 const picks=root.querySelectorAll('select[data-threatens-pick]');
 picks.forEach(sel=>{sel.addEventListener('change',()=>{
  const name=sel.dataset.threatensPick;const text=sel.form.querySelector(`textarea[name="${name}"]`);if(!text)return;
  if(sel.value!=='manual'){const label=sel.options[sel.selectedIndex]?.text||'';if(!text.value.trim())text.value=label}
 })});
}

function render(){
 const views={'Start':startView,'Risks':risksView,'Issues':issuesView,'Heatmap':heatmapView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Cross-cutting · Issue & risk management',title:'Issue & Risk Management',intro:'Compliance-grade register for everything that might go wrong (risks) or already has (issues). 5×5 likelihood × impact scoring, mitigation and approval trail, review cadence with overdue flags. Links to any item from the other tools, or stands alone.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=10&lesson=risk-register',label:'Review Module 10'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
