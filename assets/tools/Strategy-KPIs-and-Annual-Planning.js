(()=>{'use strict';
const S=window.MMSuite,{esc,uid,fmtDate,monthsSince,clamp,currentYear,num,money,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,s}=S;
const root=document.querySelector('#app');
const WORKBOOK='mission-method-strategy-kpis-annual-planning',FILE='Mission-and-Method-strategy-kpis-annual-plan';
const TABS=['Start','Objectives','KPIs & results','Annual plan','Calendar','Review','Export'];
const GROUPS=['External','Internal'],PRIORITY=['High','Medium','Low'];
const PERIODS=S.PERIODS;
const UNITS=['Number','Percentage','Currency','Ratio','Score','Yes/No','Milestone'],TYPES=['Leading','Lagging'],FREQ=['Monthly','Quarterly','Six-monthly','Annual'],KPI_STATUS=['Active','Paused','Archived'];
const CATEGORIES=['Impact','Programme','Organisation','Financial','People','Fundraising','Operations','Partnership','Communications'];

// ---------- data model (v2) ----------
const blankObjective=group=>({id:uid(),group,code:'',title:'',rationale:'',desiredChange:'',priority:'Medium',owner:'',start:String(currentYear),end:String(currentYear),status:'Planned',progress:0,lastEditedBy:'',lastEditedAt:''});
const blankKpi=()=>({id:uid(),code:'',objectiveCode:'',name:'',definition:'',formula:'',unit:'Number',type:'Lagging',category:'Impact',source:'',baseline:'',target:'',q1:'',q2:'',q3:'',q4:'',direction:'Increase',frequency:'Quarterly',owner:'',dataOwner:'',status:'Active',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankInitiative=()=>({id:uid(),code:'',objectiveCode:'',kpiCode:'',title:'',annualOutcome:'',activities:'',milestones:'',owner:'',team:'',start:'',end:'',budget:'',committed:'',spent:'',funding:'',dependencies:'',risks:'',status:'Planned',progress:0,notes:'',lastEditedBy:'',lastEditedAt:''});
const blank=()=>({version:2,meta:{organisation:'',planName:'Annual plan',year:currentYear,from:currentYear,to:currentYear+4,mission:'',vision:'',values:'',impactGoal:'',preparedBy:'',reviewDate:'',currency:'',green:95,yellow:75,notes:''},objectives:[],kpis:[],results:[],initiatives:[],reviews:[]});

// ---------- migration from the first version ----------
function migrateV1(v1){
 const out=blank(),m=v1.meta||{},st=x=>({'Not started':'Planned','Attention needed':'At risk','Complete':'Completed','Archived':'Paused','Blocked':'At risk'}[x]||(S.STATUSES.includes(x)?x:'Planned'));
 Object.assign(out.meta,{organisation:m.organisation||'',mission:m.mission||'',vision:m.vision||'',values:m.values||'',impactGoal:m.toc||'',year:Number(m.year)||currentYear,reviewDate:m.nextReview||'',green:Number(m.green)||95,yellow:Number(m.yellow)||75,notes:[m.purpose,m.period,m.themes].filter(Boolean).join(' · ')});
 const objCode=new Map(),kpiCode=new Map(),prios=v1.priorities||[];let n=0;
 const add=(o,rest)=>{n++;const x={...blankObjective('External'),code:'ESO'+n,...rest};out.objectives.push(x);objCode.set(o.id,x.code);return x};
 (v1.objectives||[]).forEach(o=>{const p=prios.find(p=>p.id===o.priorityId);add(o,{title:o.title||'Untitled objective',rationale:[p?`Priority: ${p.title}`:'',o.description].filter(Boolean).join(' — '),desiredChange:o.desired||'',owner:o.owner||'',priority:p?.level||'Medium',end:String(o.targetDate||'').slice(0,4)||String(currentYear),status:st(o.status)})});
 prios.filter(p=>!(v1.objectives||[]).some(o=>o.priorityId===p.id)).forEach(p=>add(p,{title:p.title||'Untitled priority',rationale:[p.description,p.why].filter(Boolean).join(' — '),desiredChange:p.expected||'',owner:p.lead||'',priority:p.level||'Medium',status:st(p.status)}));
 (v1.kpis||[]).forEach((k,i)=>{const code='KPI'+(i+1);kpiCode.set(k.id,code);out.kpis.push({...blankKpi(),code,objectiveCode:objCode.get(k.objectiveId)||'',name:k.title||'',definition:k.definition||'',formula:k.formula||'',unit:UNITS.includes(k.unit)?k.unit:'Number',type:k.indicatorType||'Lagging',category:CATEGORIES.includes(k.category)?k.category:'Impact',source:k.source||k.evidence||'',baseline:k.baseline??'',target:k.target??'',q1:k.q1??'',q2:k.q2??'',q3:k.q3??'',q4:k.q4??'',direction:k.direction||'Increase',frequency:FREQ.includes(k.frequency)?k.frequency:'Quarterly',owner:k.owner||'',dataOwner:k.dataOwner||'',status:KPI_STATUS.includes(k.status)?k.status:'Active',notes:k.notes||''});if(k.current!==''&&k.current!=null)out.results.push({id:uid(),kpiCode:code,date:S.today(),value:k.current,evidence:'Current value carried over from the previous version',notes:''})});
 (v1.results||[]).forEach(r=>{if(kpiCode.get(r.kpiId))out.results.push({id:uid(),kpiCode:kpiCode.get(r.kpiId),date:r.date||'',value:r.value??'',evidence:r.evidence||'',notes:r.notes||''})});
 (v1.initiatives||[]).forEach((x,i)=>out.initiatives.push({...blankInitiative(),code:'AP'+(i+1),objectiveCode:objCode.get(x.objectiveId)||'',kpiCode:kpiCode.get(x.kpiId)||'',title:x.title||'',annualOutcome:x.annualOutcome||x.expected||'',activities:[x.description,x.activities].filter(Boolean).join('\n'),milestones:x.milestones||'',owner:x.owner||'',team:x.team||'',start:x.start||'',end:x.end||'',budget:x.budget??'',committed:x.committed??'',spent:x.spent??'',funding:x.funding||'',dependencies:x.dependencies||'',risks:x.risks||'',status:st(x.status),progress:clamp(x.progress),notes:x.notes||''}));
 (v1.reviews||[]).forEach(r=>out.reviews.push({id:uid(),date:r.date||'',period:r.period||'',reviewer:'',summary:r.evidence||'',decisions:r.decision||r.action?[{id:uid(),decision:r.decision||'',action:r.action||'',owner:r.owner||'',due:r.due||'',status:DECISIONS(r.status)}]:[],snapshot:null}));
 return out;
}
const DECISIONS=x=>S.DECISION_STATUSES.includes(x)?x:'Open';
const normalise=d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.sk-cleanup-v3',blank)||d;for(const k of ['objectives','kpis','results','initiatives','reviews'])if(!Array.isArray(d[k]))d[k]=[];d.reviews.forEach(r=>{if(!Array.isArray(r.decisions))r.decisions=[]});return d};
const storage=S.store({key:'mission-method-strategy-kpis-v2',version:2,blank,legacy:[{key:'mm.strategy-kpis.v1',migrate:migrateV1}],normalise});
let db=storage.load();
let tab='Start',dlg='',message='',calendar='Months';

// ---------- helpers ----------
const objByCode=c=>db.objectives.find(o=>o.code===c);
const kpiByCode=c=>db.kpis.find(k=>k.code===c);
const objLabel=c=>{const o=objByCode(c);return o?`${o.code} · ${o.title}`:(c||'Not linked')};
const kpiLabel=c=>{const k=kpiByCode(c);return k?`${k.code} · ${k.name}`:(c||'Not linked')};
const nextCode=(list,prefix)=>{const used=new Set(list.map(x=>x.code));let i=1;while(used.has(prefix+i))i++;return prefix+i};
const results=k=>db.results.filter(r=>r.kpiCode===k.code&&!isNaN(num(r.value))).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
const latest=k=>{const r=results(k);return r.length?r[r.length-1]:null};
const activeKpis=()=>db.kpis.filter(k=>k.status!=='Archived');
const activePlan=()=>db.initiatives.filter(x=>x.status!=='Paused');
function expectedTarget(k){
 // Use the target of the most recent quarter that has started in the planning year; otherwise the annual target.
 const y=Number(db.meta.year)||currentYear,now=new Date();
 if(now.getFullYear()===y){const q=Math.floor(now.getMonth()/3)+1;for(let i=q;i>=1;i--){const t=num(k['q'+i]);if(!isNaN(t))return {value:t,label:'Q'+i+' target'}}}
 return {value:num(k.target),label:'annual target'};
}
function kpiStatus(k){
 if(k.status==='Archived')return 'Archived';
 if(k.status==='Paused')return 'Paused';
 const base=num(k.baseline),exp=expectedTarget(k),l=latest(k);
 if(isNaN(base)||isNaN(exp.value)||!l)return 'Not enough data';
 const dir=k.direction==='Decrease'?-1:1,den=(exp.value-base)*dir;
 if(den<=0)return 'Not enough data';
 const ratio=(num(l.value)-base)*dir/den*100,g=Number(db.meta.green)||95,y=Number(db.meta.yellow)||75;
 return ratio>=g?'On track':ratio>=y?'Needs attention':'Off track';
}
function quality(k){
 const miss=[];
 [['definition','a clear definition'],['source','a data source'],['baseline','a baseline (or how you will set it)'],['target','an annual target'],['owner','an owner'],['objectiveCode','a linked objective']].forEach(([f,l])=>{if(String(k[f]??'').trim()==='')miss.push(`Add ${l}.`)});
 if(/^(improve|strengthen|enhance|increase|build|develop)\b/i.test(k.name||'')&&!/\b(number|percentage|%|rate|share|amount|count|score|of|per)\b/i.test(k.name||''))miss.push('The name reads like an intention. Say what will be counted or measured.');
 if(k.baseline!==''&&k.target!==''&&num(k.baseline)===num(k.target))miss.push('Baseline and target are the same, so progress cannot show.');
 return miss;
}
const planSum=f=>activePlan().reduce((n,x)=>n+(Number(x[f])||0),0);
const avgProgress=()=>{const p=activePlan();return p.length?Math.round(p.reduce((n,x)=>n+clamp(x.progress),0)/p.length):0};
const overdue=x=>x.end&&x.status!=='Completed'&&x.end<S.today();
function save(note='Saved in this browser.'){storage.save(db);message=note;render()}
const objOptions=()=>db.objectives.map(o=>[o.code,`${o.code} · ${o.title}`]);
const kpiOptions=()=>db.kpis.filter(k=>k.status!=='Archived').map(k=>[k.code,`${k.code} · ${k.name}`]);

// ---------- example ----------
function makeExample(){
 const d=blank(),y=d.meta.year;Object.assign(d.meta,{organisation:'Example organisation',planName:`Annual plan ${y}`,currency:'USD',mission:'Help community organisations turn good intentions into well-run programmes.',impactGoal:'Community organisations deliver lasting, measurable change for the people they serve.'});
 const O=(group,code,title,rationale,desiredChange,priority,owner)=>({...blankObjective(group),code,title,rationale,desiredChange,priority,owner,start:String(y),end:String(y)});
 d.objectives=[O('External','ESO1','Reach more community organisations with practical training','Small organisations cannot access affordable, practical management training.','More organisations complete the programme and apply what they learned.','High','Programme lead'),O('External','ESO2','Diversify income','Over-reliance on one funder puts delivery at risk.','No single source provides more than half of income.','High','Director'),O('Internal','ISO1','Build reliable monitoring and learning','Decisions are made without timely evidence.','Quarterly data reviews inform every major decision.','Medium','MEAL officer')];
 const K=(code,objectiveCode,name,unit,baseline,target,q,owner,definition,source,direction='Increase')=>({...blankKpi(),code,objectiveCode,name,unit,baseline,target,q1:q[0],q2:q[1],q3:q[2],q4:q[3],owner,definition,source,direction});
 d.kpis=[K('KPI1','ESO1','Number of organisations completing the programme','Number',40,120,[20,50,85,120],'Programme lead','Organisations that finish all modules within the year.','Learning platform records'),K('KPI2','ESO1','Percentage of graduates applying a new practice after 3 months','Percentage',35,60,['','',50,60],'MEAL officer','Share of surveyed graduates reporting a new practice in use.','Follow-up survey'),K('KPI3','ESO2','Largest funder as a share of total income','Percentage',72,50,[68,62,56,50],'Director','Income from the largest single source divided by total income.','Management accounts','Decrease'),K('KPI4','ISO1','Quarterly reviews held with a data summary','Number',0,4,[1,2,3,4],'MEAL officer','Leadership reviews that start from the KPI summary.','Meeting records')];
 // One result per quarter so far, showing a mix of on track, needs attention and off track.
 const qNow=Math.floor(new Date().getMonth()/3)+1,todayIso=S.today();
 [['KPI1',1],['KPI2',.9],['KPI3',.8],['KPI4',1]].forEach(([code,f])=>{const k=d.kpis.find(x=>x.code===code);for(let q=1;q<=qNow;q++){const t=num(k['q'+q]);if(isNaN(t))continue;const end=new Date(y,q*3,0).toISOString().slice(0,10);d.results.push({id:uid(),kpiCode:code,date:end<todayIso?end:todayIso,value:String(Math.round((k.baseline+(t-k.baseline)*f)*10)/10),evidence:'Example data',notes:''})}});
 const I=(code,objectiveCode,kpiCode,title,owner,sm,em,budget,spent,progress,status)=>({...blankInitiative(),code,objectiveCode,kpiCode,title,owner,start:`${y}-${String(sm).padStart(2,'0')}-01`,end:`${y}-${String(em).padStart(2,'0')}-28`,budget,spent,progress,status});
 d.initiatives=[I('AP1','ESO1','KPI1','Run three training cohorts','Programme lead',2,11,24000,9000,45,'In progress'),I('AP2','ESO1','KPI2','Three-month follow-up survey for each cohort','MEAL officer',5,12,3000,800,30,'On track'),I('AP3','ESO2','KPI3','Apply to five new aligned funders','Director',1,9,2000,1200,60,'At risk'),I('AP4','ESO2','KPI3','Launch individual giving pilot','Communications lead',7,12,5000,0,0,'Planned'),I('AP5','ISO1','KPI4','Quarterly data review routine','MEAL officer',1,12,500,200,50,'On track')];
 d.reviews=[{id:uid(),date:`${y}-07-05`,period:'Q2',reviewer:'Leadership team',summary:'Training reach on track; funder concentration falling more slowly than planned.',decisions:[{id:uid(),decision:'Bring forward the individual giving pilot',action:'Draft pilot plan',owner:'Communications lead',due:`${y}-07-31`,status:'In progress'}],snapshot:null}];
 return d;
}

// ---------- views ----------
function dashboard(){
 const counts={'On track':0,'Needs attention':0,'Off track':0,'Not enough data':0};activeKpis().forEach(k=>{const st=kpiStatus(k);if(st in counts)counts[st]++});
 const last=[...db.reviews].sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]?.date||'',m=monthsSince(last),cur=db.meta.currency;
 const noKpi=db.objectives.filter(o=>!db.kpis.some(k=>k.objectiveCode===o.code)).length,weakKpi=activeKpis().filter(k=>quality(k).length).length,late=db.initiatives.filter(overdue).length,noOwner=db.initiatives.filter(x=>!x.owner).length;
 return `<section class="panel"><span class="eyebrow">Overview · ${esc(db.meta.year)}</span><h2>Scorecard</h2><div class="grid four">${card('Objectives',db.objectives.length,`${db.objectives.filter(o=>o.group==='External').length} external · ${db.objectives.filter(o=>o.group==='Internal').length} internal`)}${card('KPIs on track',`${counts['On track']} / ${activeKpis().length}`,`${counts['Needs attention']} need attention · ${counts['Off track']} off track`,counts['Off track']>0)}${card('Annual plan progress',avgProgress()+'%',`${activePlan().length} initiatives`,false,bar(avgProgress()))}${card('Since last review',m===null?'—':m+' mo',last?fmtDate(last):'No review recorded yet',m!==null&&m>3)}</div><div class="grid four" style="margin-top:12px">${card('Budget planned',money(planSum('budget'),cur),`Spent ${money(planSum('spent'),cur)} · committed ${money(planSum('committed'),cur)}`)}${card('Objectives without a KPI',noKpi,'',noKpi>0)}${card('KPIs to strengthen',weakKpi,'Missing definition, source, baseline, target or owner',weakKpi>0)}${card('Overdue or unowned initiatives',`${late} / ${noOwner}`,'',late+noOwner>0)}</div></section>`;
}
// Read Strategic Objectives directly from its localStorage store (Module 1 tool).
function readSO(){try{const raw=localStorage.getItem('mission-method-strategic-objectives-v2');if(!raw)return null;const o=JSON.parse(raw);return o&&Array.isArray(o.objectives)?o:null}catch{return null}}
const soReady=()=>(readSO()?.objectives||[]).length>0;
const soCount=()=>(readSO()?.objectives||[]).length;
function readToC(){try{const raw=localStorage.getItem('mission-method-theory-of-change-v2');if(!raw)return null;const o=JSON.parse(raw);return o&&(Array.isArray(o.pathways)||Array.isArray(o.objectives))?o:null}catch{return null}}
const tocReady=()=>{const o=readToC();return !!(o?.pathways?.length||o?.objectives?.length)};

function journeyPanel(){
 const so=readSO(),soN=so?.objectives?.length||0;
 const step1Done=soN>0,step2Done=tocReady(),step3Done=db.objectives.length>0||db.kpis.length>0;
 const soHref='Strategic-Objectives.html';
 const tocHref='Theory-of-Change-Builder.html';
 return `<section class="panel journey"><div class="rowhead section-head"><div><span class="eyebrow">Recommended path</span><h2>Where this tool sits</h2><p>Each step builds on the one before. Anything already complete shows a tick — but you can jump ahead if you want.</p></div></div>
  <ol class="journey-steps">
   <li class="step ${step1Done?'done':''}"><span class="step-num">1</span><div class="step-body"><b>Strategic Objectives · Module 1</b><p class="tiny">${step1Done?`<b>${soN}</b> multi-year objective${soN===1?'':'s'} ready — <button class="link" data-action="import-so-direct">bring them in here</button>`:'Set your organisation\'s multi-year direction and objectives.'}</p></div><a class="button ${step1Done?'secondary':''} small" href="${soHref}">${step1Done?'Review →':'Start here →'}</a></li>
   <li class="step ${step2Done?'done':''}"><span class="step-num">2</span><div class="step-body"><b>Theory of Change Builder · Module 2</b><p class="tiny">${step2Done?'Theory of Change ready.':'Map the pathway from objectives to long-term change before setting KPIs.'}</p></div><a class="button ${step2Done?'secondary':''} small" href="${tocHref}">${step2Done?'Review →':'Open →'}</a></li>
   <li class="step ${step3Done?'done':''} current"><span class="step-num">3</span><div class="step-body"><b>Strategy, KPIs &amp; Annual Planning <span class="pill">You are here</span></b><p class="tiny">Turn this year's slice into measurable priorities, KPIs and initiatives with review decisions.</p></div></li>
  </ol></section>`;
}

function start(){const m=db.meta;return `${window.MMExample?.renderIntegration?.('strategy-kpis')||''}${window.MMExample?.renderBox?.('strategy-kpis')||''}${window.MMExample?.renderUserBox?.('strategy-kpis',db)||''}<div class="notice">Work from objectives to measures to delivery: each objective gets one to three KPIs, each KPI gets dated results, and the annual plan lists the initiatives that move them. Objectives use the same ESO/ISO codes as the Strategic Objectives tool, so importing that workbook (or clicking "bring them in here" above) brings the objectives across. Data stays in this browser — download the Excel or JSON regularly.</div><section class="panel"><h2>Plan context</h2><p>Bring the mission, vision and values from Module One and the impact goal from your Theory of Change. They guide choices; this tool does not rebuild them.</p><form data-form="meta" class="form">${field('Organisation name','organisation',m.organisation)}${field('Plan title','planName',m.planName)}${field('Planning year','year',m.year,'number','min="2000" max="2200"','The calendar and quarterly targets use this year.')}${field('Currency','currency',m.currency,'text','maxlength="12" placeholder="e.g. USD, EUR, KES"')}${field('Strategic period from','from',m.from,'number','min="2000" max="2200"')}${field('Strategic period to','to',m.to,'number','min="2000" max="2200"')}${area('Mission','mission',m.mission)}${area('Vision','vision',m.vision)}${area('Values','values',m.values)}${area('Impact goal (from your Theory of Change)','impactGoal',m.impactGoal)}${field('Prepared by','preparedBy',m.preparedBy)}${field('Next review','reviewDate',m.reviewDate,'date')}${field('On-track threshold (%)','green',m.green,'number','min="1" max="100"','A KPI is on track when it has covered at least this share of the distance from baseline to its current target.')}${field('Attention threshold (%)','yellow',m.yellow,'number','min="0" max="100"','Below this share the KPI is off track; between the two it needs attention.')}${area('Notes','notes',m.notes)}<div class="actions"><button class="button" type="submit">Save plan context</button></div></form></section><section class="panel"><h2>Get started</h2><div class="actions">${soReady()?`<button class="button" data-action="import-so-direct">Bring in objectives from Strategic Objectives (${soCount()})</button>`:''}<button class="button ${soReady()?'secondary':''}" data-action="add-objective" data-group="External">Add external objective</button><button class="button secondary" data-action="add-objective" data-group="Internal">Add internal objective</button>${S.importButtons('Load worked example')}</div><p class="tiny">Import Excel accepts this tool's workbook (replaces everything) or a Strategic Objectives workbook (adds or updates objectives only).</p></section>`}

function objectivesView(){
 const block=g=>{const items=db.objectives.filter(o=>o.group===g);return `<div class="rowhead section-head"><div><span class="eyebrow">${g==='External'?'ESO · outward change':'ISO · organisational foundations'}</span><h2>${g} objectives</h2></div><button class="button" data-action="add-objective" data-group="${g}">Add ${g.toLowerCase()} objective</button></div>${items.length?items.map(objCard).join(''):empty(`No ${g.toLowerCase()} objectives yet.`)}`};
 return `<p>Objectives say what must change this year. Keep them few. Each one should have at least one KPI and at least one initiative in the annual plan.</p>${block('External')}${block('Internal')}`;
}
function objCard(o){
 const ks=db.kpis.filter(k=>k.objectiveCode===o.code),is=db.initiatives.filter(x=>x.objectiveCode===o.code);
 return `<article class="panel"><div class="rowhead"><div><span class="eyebrow">${esc(o.code)} · ${esc(o.group)} · ${esc(o.priority)} priority</span><h3>${esc(o.title||'Untitled objective')}</h3>${S.edited(o)}</div><div class="actions">${pill(o.status)}<button class="button small secondary" data-action="edit-objective" data-id="${o.id}">Edit</button></div></div>${o.rationale?`<p>${esc(o.rationale)}</p>`:''}${o.desiredChange?`<p><b>Intended change:</b> ${esc(o.desiredChange)}</p>`:''}<p class="tiny"><b>Owner:</b> ${esc(o.owner||'Not assigned')} · <b>Timeframe:</b> ${esc(o.start||'—')}–${esc(o.end||'—')} · <b>Progress:</b> ${esc(o.progress)}%</p>${bar(o.progress)}<div class="split" style="margin-top:12px"><div><b>KPIs (${ks.length})</b>${ks.length?`<ul class="checks">${ks.map(k=>`<li>${esc(k.code)} · ${esc(k.name)} ${pill(kpiStatus(k))}</li>`).join('')}</ul>`:`<p class="tiny">No KPI yet. <button class="link" data-action="add-kpi" data-objective="${esc(o.code)}">Add one</button></p>`}</div><div><b>Annual plan (${is.length})</b>${is.length?`<ul class="checks">${is.map(x=>`<li>${esc(x.code)} · ${esc(x.title)} · ${clamp(x.progress)}%</li>`).join('')}</ul>`:`<p class="tiny">No initiative yet. <button class="link" data-action="add-initiative" data-objective="${esc(o.code)}">Add one</button></p>`}</div></div></article>`;
}

function kpisView(){
 const rows=db.kpis.map(k=>{const l=latest(k),q=quality(k),exp=expectedTarget(k);return `<tr><td><b>${esc(k.code)}</b></td><td><button class="link" data-action="edit-kpi" data-id="${k.id}">${esc(k.name||'Untitled KPI')}</button><div class="tiny">${esc(objLabel(k.objectiveCode))}</div></td><td>${esc(k.unit)} · ${esc(k.type)}<div class="tiny">${esc(k.direction)}</div></td><td>${esc(k.baseline===''?'—':k.baseline)} → ${esc(k.target===''?'—':k.target)}<div class="tiny">${isNaN(exp.value)?'':`Now: ${esc(exp.value)} (${esc(exp.label)})`}</div></td><td>${l?`<b>${esc(l.value)}</b><div class="tiny">${esc(fmtDate(l.date))}</div>`:'—'}</td><td>${pill(kpiStatus(k))}</td><td>${q.length?`<details><summary>${q.length} to fix</summary><ul class="checks">${q.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`:pill('Well defined')}</td><td>${esc(k.owner||'—')}</td><td><div class="row-actions"><button class="button small" data-action="add-result" data-kpi="${esc(k.code)}">Add result</button></div></td></tr>`});
 const res=[...db.results].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
 return `<div class="rowhead section-head"><div><span class="eyebrow">Measure what matters</span><h2>KPIs ${tip('A KPI is a measurable sign that an objective is moving. Give it a definition, a source, a baseline, a target and an owner. Quarterly targets let the scorecard judge progress during the year.')}</h2><p>Status compares the latest result with the target for the current quarter (or the annual target), using the thresholds on the Start tab.</p></div><button class="button" data-action="add-kpi">Add KPI</button></div><section class="panel">${table(['Code','KPI','Type','Baseline → target','Latest','Status','Quality','Owner',''],rows,'No KPIs yet. Add objectives first, then one to three KPIs for each.')}</section><div class="rowhead section-head"><div><h2>Results over time</h2><p>Record each measurement with its date. Earlier results stay, so you can see the trend.</p></div><button class="button secondary" data-action="add-result">Add result</button></div><section class="panel">${table(['Date','KPI','Value','Evidence','Notes',''],res.map(r=>`<tr><td>${esc(fmtDate(r.date))}</td><td>${esc(kpiLabel(r.kpiCode))}</td><td><b>${esc(r.value)}</b></td><td>${esc(r.evidence||'—')}</td><td>${esc(r.notes||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-result" data-id="${r.id}">Edit</button></div></td></tr>`),'No results recorded yet.')}</section>`;
}

function planView(){
 const cur=db.meta.currency,rows=db.initiatives.map(x=>`<tr><td><b>${esc(x.code)}</b></td><td><button class="link" data-action="edit-initiative" data-id="${x.id}">${esc(x.title||'Untitled initiative')}</button><div class="tiny">${esc(objLabel(x.objectiveCode))}${x.kpiCode?` · ${esc(x.kpiCode)}`:''}</div></td><td>${esc(x.owner||'—')}</td><td>${esc(fmtDate(x.start)||'—')} → ${esc(fmtDate(x.end)||'—')}${overdue(x)?'<div>'+pill('Overdue')+'</div>':''}</td><td style="min-width:120px">${clamp(x.progress)}%${bar(x.progress)}</td><td>${pill(x.status)}</td><td>${money(x.budget,'')}<div class="tiny">spent ${money(x.spent,'')}</div></td></tr>`);
 return `<div class="rowhead section-head"><div><span class="eyebrow">Strategy to action</span><h2>Annual plan ${tip('Each initiative is a piece of work for this year that moves an objective and, ideally, a KPI. Keep detailed tasks in the Gantt Project Planner.')}</h2><p>${activePlan().length} active initiatives · ${avgProgress()}% average progress · budget ${money(planSum('budget'),cur)}, spent ${money(planSum('spent'),cur)}</p></div><button class="button" data-action="add-initiative">Add initiative</button></div><section class="panel">${table(['Code','Initiative','Owner','Dates','Progress','Status',`Budget${cur?' ('+esc(cur)+')':''}`],rows,'No initiatives yet. Add the work that will move each objective this year.')}</section>`;
}

function calendarView(){
 const y=Number(db.meta.year)||currentYear,quarters=calendar==='Quarters',cols=quarters?['Q1','Q2','Q3','Q4']:Array.from({length:12},(_,i)=>new Date(y,i,1).toLocaleString(undefined,{month:'short'}));
 const on=(x,i)=>{const a=quarters?i*3:i,b=quarters?i*3+2:i,first=`${y}-${String(a+1).padStart(2,'0')}-01`,last=new Date(y,b+1,0).toISOString().slice(0,10);const st=x.start||x.end,en=x.end||x.start;return st&&en&&st<=last&&en>=first};
 const rows=activePlan().filter(x=>x.start||x.end).sort((a,b)=>String(a.start).localeCompare(String(b.start))).map(x=>`<tr><td><b>${esc(x.code)}</b> ${esc(x.title)}</td><td>${esc(x.owner||'—')}</td>${cols.map((_,i)=>`<td>${on(x,i)?`<span class="on ${overdue(x)?'late':''}" title="${esc(x.title)}"></span>`:''}</td>`).join('')}</tr>`);
 const undated=activePlan().filter(x=>!x.start&&!x.end).length;
 return `<div class="rowhead section-head"><div><span class="eyebrow">${esc(y)}</span><h2>Annual calendar</h2><p>When each initiative runs. Coral bars are overdue. For detailed scheduling and dependencies, use the Gantt Project Planner.</p></div><div class="actions"><button class="button ${quarters?'secondary':''} small" data-action="calendar" data-mode="Months">Months</button><button class="button ${quarters?'':'secondary'} small" data-action="calendar" data-mode="Quarters">Quarters</button></div></div><section class="panel"><div class="tablewrap"><table class="cal"><thead><tr><th>Initiative</th><th>Owner</th>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.join('')||`<tr><td colspan="${cols.length+2}">Add start and end dates to initiatives to see them here.</td></tr>`}</tbody></table></div>${undated?`<p class="tiny">${undated} initiative${undated>1?'s have':' has'} no dates yet.</p>`:''}</section>`;
}

function mapView(){
 return db.objectives.length?db.objectives.map(o=>`<div class="map-node"><b>${esc(o.code)} · ${esc(o.title)}</b> ${pill(o.status)}${db.kpis.filter(k=>k.objectiveCode===o.code).map(k=>`<div class="map-node">KPI ${esc(k.code)} · ${esc(k.name)} ${pill(kpiStatus(k))}${db.initiatives.filter(x=>x.kpiCode===k.code&&x.objectiveCode===o.code).map(x=>`<div class="map-node">${esc(x.code)} · ${esc(x.title)} · ${clamp(x.progress)}%</div>`).join('')}</div>`).join('')}${db.initiatives.filter(x=>x.objectiveCode===o.code&&!db.kpis.some(k=>k.code===x.kpiCode&&k.objectiveCode===o.code)).map(x=>`<div class="map-node">${esc(x.code)} · ${esc(x.title)} · ${clamp(x.progress)}% <span class="tiny">(no KPI linked)</span></div>`).join('')}</div>`).join(''):empty('Add objectives, KPIs and initiatives to build the map.');
}
function reviewView(){
 const flagged=activeKpis().filter(k=>['Off track','Needs attention'].includes(kpiStatus(k))),late=db.initiatives.filter(overdue);
 const openDecisions=S.openDecisions(db.reviews);
 return `<span class="eyebrow">Quarterly review</span><h2>Turn evidence into decisions</h2><p>Look at what needs attention, agree what changes, and capture the review. Each review saves a snapshot of the whole plan.</p><div class="grid three">${card('KPIs needing attention',flagged.length,'',flagged.length>0)}${card('Overdue initiatives',late.length,'',late.length>0)}${card('Open decisions',openDecisions.length)}</div><section class="panel" style="margin-top:16px"><h3>What needs attention</h3>${flagged.length||late.length?`<ul class="checks">${flagged.map(k=>{const l=latest(k),e=expectedTarget(k);return `<li>${pill(kpiStatus(k))} <b>${esc(k.code)}</b> ${esc(k.name)} · latest ${esc(l?.value??'—')} vs ${esc(e.label)} ${esc(isNaN(e.value)?'—':e.value)}</li>`}).join('')}${late.map(x=>`<li>${pill('Overdue')} <b>${esc(x.code)}</b> ${esc(x.title)} · due ${esc(fmtDate(x.end))} · ${esc(x.owner||'no owner')}</li>`).join('')}</ul>`:'<p class="muted">Nothing flagged right now.</p>'}</section><section class="panel"><div class="rowhead"><div><h3>Reviews and decisions</h3><p>Record the period, what the data showed and each decision with an owner.</p></div><button class="button" data-action="new-review">Record a review</button></div>${S.reviewsList(db.reviews)}</section><section class="panel"><h3>Strategy map</h3><p>How each objective connects to its KPIs and to the work in the annual plan.</p>${mapView()}</section>`;
}

function exportView(){
 const m=db.meta,cur=m.currency;
 return `<span class="eyebrow">Learn → build → complete → export → use</span><h2>Export your annual plan</h2><p>Preview the plan below, then choose a format. Excel matches the Module 13 workbook exactly — you can re-import it later without losing anything. CSV is for further analysis. Print saves a PDF.</p>${S.exportButtons()}<section class="panel"><span class="eyebrow">Mission & Method · Strategy, KPIs & annual planning</span><h2>${esc(m.planName||'Annual plan')}</h2><p>${esc(m.organisation||'Organisation not entered')} · ${esc(m.year)} · Strategic period ${esc(m.from)}–${esc(m.to)} · Prepared by ${esc(m.preparedBy||'—')}</p>${m.mission?`<p><b>Mission:</b> ${esc(m.mission)}</p>`:''}${m.impactGoal?`<p><b>Impact goal:</b> ${esc(m.impactGoal)}</p>`:''}</section>${db.objectives.map(o=>`<section class="panel"><h3>${esc(o.code)} · ${esc(o.title)}</h3><p class="tiny">${esc(o.group)} · ${esc(o.priority)} priority · Owner ${esc(o.owner||'—')} · ${esc(o.status)} · ${esc(o.progress)}%</p>${o.desiredChange?`<p><b>Intended change:</b> ${esc(o.desiredChange)}</p>`:''}${table(['KPI','Baseline','Target','Latest','Status'],db.kpis.filter(k=>k.objectiveCode===o.code).map(k=>`<tr><td>${esc(k.code)} · ${esc(k.name)}</td><td>${esc(k.baseline||'—')}</td><td>${esc(k.target||'—')}</td><td>${esc(latest(k)?.value??'—')}</td><td>${esc(kpiStatus(k))}</td></tr>`),'No KPIs')}${table(['Initiative','Owner','Dates','Progress','Budget'],db.initiatives.filter(x=>x.objectiveCode===o.code).map(x=>`<tr><td>${esc(x.code)} · ${esc(x.title)}</td><td>${esc(x.owner||'—')}</td><td>${esc(x.start||'—')} → ${esc(x.end||'—')}</td><td>${clamp(x.progress)}%</td><td>${money(x.budget,cur)}</td></tr>`),'No initiatives')}</section>`).join('')||empty('No objectives entered.')}`;
}

// ---------- dialogs ----------
const codeHelp='Codes link records together and survive Excel round-trips. Changing a code updates its links.';
function objectiveDialog(o,group){const g=o?.group||group;return modal(`${o?'Edit':'Add'} ${g.toLowerCase()} objective`,`<form data-form="objective" data-id="${esc(o?.id||'')}" class="form">${select('Objective type','group',GROUPS,g)}${field('Code','code',o?.code||nextCode(db.objectives,g==='External'?'ESO':'ISO'),'text','required',codeHelp)}${field('Objective','title',o?.title||'','text','required')}${select('Priority','priority',PRIORITY,o?.priority||'Medium')}${area('Why it matters','rationale',o?.rationale||'')}${area('Intended change','desiredChange',o?.desiredChange||'','What should be different by the end of the year, not an activity.')}${field('Accountable owner','owner',o?.owner||'')}${select('Status','status',S.STATUSES,o?.status||'Planned')}${field('Start year','start',o?.start||db.meta.year,'number','min="2000" max="2200"')}${field('End year','end',o?.end||db.meta.year,'number','min="2000" max="2200"')}${field('Progress (%)','progress',o?.progress||0,'number','min="0" max="100"')}${formEnd('Save objective',{deleteId:o?.id||'',deleteLabel:'Delete objective'})}</form>`)}
function kpiDialog(k,objectiveCode=''){k=k||{...blankKpi(),objectiveCode,code:nextCode(db.kpis,'KPI')};return modal(`${k.name?'Edit':'Add'} KPI`,`<form data-form="kpi" data-id="${esc(db.kpis.includes(k)?k.id:'')}" class="form">${field('Code','code',k.code,'text','required',codeHelp)}${select('Objective','objectiveCode',objOptions(),k.objectiveCode,'','Not linked')}${field('KPI name','name',k.name,'text','required','Name what is counted or measured, e.g. “Percentage of graduates applying a new practice”.')}${select('Unit','unit',UNITS,k.unit)}${area('Definition','definition',k.definition,'Exactly what counts, and what does not.')}${field('Calculation','formula',k.formula,'text','placeholder="e.g. graduates using a new practice ÷ graduates surveyed"')}${field('Data source','source',k.source)}${select('Type','type',TYPES,k.type,'Leading KPIs move early and predict results; lagging KPIs confirm results after the fact.')}${select('Category','category',CATEGORIES,k.category)}${select('Direction','direction',['Increase','Decrease'],k.direction,'Whether a higher or a lower value is better.')}${field('Baseline','baseline',k.baseline,'number','','Where you start. If unknown, leave blank and note how you will establish it.')}${field('Annual target','target',k.target,'number')}<div class="field full"><b>Quarterly targets ${tip('Cumulative or point-in-time targets for each quarter. The scorecard uses the latest quarter that has started.')}</b><div class="indicator-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">${['q1','q2','q3','q4'].map((q,i)=>field('Q'+(i+1),q,k[q],'number')).join('')}</div></div>${select('Reporting frequency','frequency',FREQ,k.frequency)}${field('KPI owner','owner',k.owner)}${field('Data owner','dataOwner',k.dataOwner,'text','','Who collects and checks the data.')}${select('Status','status',KPI_STATUS,k.status)}${area('Notes','notes',k.notes)}${formEnd('Save KPI',{deleteId:db.kpis.includes(k)?k.id:'',deleteLabel:'Delete KPI'})}</form>`)}
function resultDialog(r,kpiCode=''){r=r||{id:'',kpiCode,date:S.today(),value:'',evidence:'',notes:''};return modal(`${r.id?'Edit':'Add'} result`,`<form data-form="result" data-id="${esc(r.id)}" class="form">${select('KPI','kpiCode',kpiOptions(),r.kpiCode)}${field('Measurement date','date',r.date,'date','required')}${field('Value','value',r.value,'number','required')}${field('Evidence or source','evidence',r.evidence)}${area('Notes','notes',r.notes)}${formEnd('Save result',{deleteId:r.id,deleteLabel:'Delete result'})}</form>`)}
function initiativeDialog(x,objectiveCode=''){x=x||{...blankInitiative(),objectiveCode,code:nextCode(db.initiatives,'AP'),start:`${db.meta.year}-01-01`,end:`${db.meta.year}-12-31`};const cur=db.meta.currency?` (${db.meta.currency})`:'';return modal(`${x.title?'Edit':'Add'} initiative`,`<form data-form="initiative" data-id="${esc(db.initiatives.includes(x)?x.id:'')}" class="form">${field('Code','code',x.code,'text','required',codeHelp)}${field('Initiative','title',x.title,'text','required')}${select('Objective','objectiveCode',objOptions(),x.objectiveCode,'','Not linked')}${select('KPI it moves','kpiCode',kpiOptions(),x.kpiCode,'','Not linked')}${area('Annual outcome','annualOutcome',x.annualOutcome,'What this initiative should achieve by year end.')}${area('Main activities','activities',x.activities)}${area('Milestones','milestones',x.milestones)}${field('Owner','owner',x.owner)}${field('Supporting team','team',x.team)}${field('Start','start',x.start,'date')}${field('End','end',x.end,'date')}${select('Status','status',S.STATUSES,x.status)}${field('Progress (%)','progress',x.progress,'number','min="0" max="100"')}${field('Planned budget'+cur,'budget',x.budget,'number','min="0"')}${field('Committed'+cur,'committed',x.committed,'number','min="0"')}${field('Spent'+cur,'spent',x.spent,'number','min="0"')}${field('Funding source','funding',x.funding)}${field('Dependencies','dependencies',x.dependencies)}${field('Risks','risks',x.risks)}${area('Notes','notes',x.notes)}${formEnd('Save initiative',{deleteId:db.initiatives.includes(x)?x.id:'',deleteLabel:'Delete initiative'})}</form>`)}
const reviewDialog=r=>S.reviewDialog(r,'What did the data show?');

// ---------- saving ----------
function renameCode(kind,from,to){if(!from||from===to)return;if(kind==='objective'){db.kpis.forEach(k=>{if(k.objectiveCode===from)k.objectiveCode=to});db.initiatives.forEach(x=>{if(x.objectiveCode===from)x.objectiveCode=to})}if(kind==='kpi'){db.results.forEach(r=>{if(r.kpiCode===from)r.kpiCode=to});db.initiatives.forEach(x=>{if(x.kpiCode===from)x.kpiCode=to})}}
const fail=t=>{message=t;render();return false};
function submit(form){
 const kind=form.dataset.form,d=S.formData(form),id=form.dataset.id;
 if(kind==='meta'){if(Number(d.to)<Number(d.from))return fail('The strategic period must end no earlier than it starts.');if(Number(d.yellow)>Number(d.green))return fail('The attention threshold must be lower than the on-track threshold.');db.meta={...db.meta,...d,year:Number(d.year)||currentYear,from:Number(d.from),to:Number(d.to),green:clamp(d.green,1,100),yellow:clamp(d.yellow,0,100)};return save('Plan context saved.')}
 if(kind==='objective'){
  const o=db.objectives.find(x=>x.id===id),code=s(d.code).toUpperCase(),prefix=d.group==='External'?'ESO':'ISO';
  if(!new RegExp(`^${prefix}\\d+$`).test(code))return fail(`Use a ${prefix} code such as ${prefix}1.`);
  if(db.objectives.some(x=>x!==o&&x.code===code))return fail(`${code} is already used.`);
  if(Number(d.end)<Number(d.start))return fail('End year must be no earlier than start year.');
  const x=o||blankObjective(d.group);renameCode('objective',o?.code,code);
  Object.assign(x,{group:d.group,code,title:s(d.title),priority:d.priority,rationale:s(d.rationale),desiredChange:s(d.desiredChange),owner:s(d.owner),status:d.status,start:s(d.start),end:s(d.end),progress:clamp(d.progress)});S.stamp(x);if(!o)db.objectives.push(x);dlg='';return save(`${code} saved.`);
 }
 if(kind==='kpi'){
  const k=db.kpis.find(x=>x.id===id),code=s(d.code).toUpperCase();
  if(!/^KPI\d+$/.test(code))return fail('Use a KPI code such as KPI1.');
  if(db.kpis.some(x=>x!==k&&x.code===code))return fail(`${code} is already used.`);
  const x=k||blankKpi();renameCode('kpi',k?.code,code);
  Object.assign(x,{code,objectiveCode:d.objectiveCode,name:s(d.name),unit:d.unit,definition:s(d.definition),formula:s(d.formula),source:s(d.source),type:d.type,category:d.category,direction:d.direction,baseline:s(d.baseline),target:s(d.target),q1:s(d.q1),q2:s(d.q2),q3:s(d.q3),q4:s(d.q4),frequency:d.frequency,owner:s(d.owner),dataOwner:s(d.dataOwner),status:d.status,notes:s(d.notes)});S.stamp(x);if(!k)db.kpis.push(x);dlg='';return save(`${code} saved.`);
 }
 if(kind==='result'){
  if(!d.kpiCode)return fail('Choose the KPI this result belongs to.');
  const r=db.results.find(x=>x.id===id)||{id:uid()};Object.assign(r,{kpiCode:d.kpiCode,date:d.date,value:s(d.value),evidence:s(d.evidence),notes:s(d.notes)});if(!db.results.includes(r))db.results.push(r);dlg='';return save('Result saved.');
 }
 if(kind==='initiative'){
  const x0=db.initiatives.find(x=>x.id===id),code=s(d.code).toUpperCase();
  if(!/^AP\d+$/.test(code))return fail('Use an annual plan code such as AP1.');
  if(db.initiatives.some(x=>x!==x0&&x.code===code))return fail(`${code} is already used.`);
  if(d.start&&d.end&&d.end<d.start)return fail('The end date must be after the start date.');
  const x=x0||blankInitiative();
  Object.assign(x,{code,title:s(d.title),objectiveCode:d.objectiveCode,kpiCode:d.kpiCode,annualOutcome:s(d.annualOutcome),activities:s(d.activities),milestones:s(d.milestones),owner:s(d.owner),team:s(d.team),start:d.start,end:d.end,status:d.status,progress:clamp(d.progress),budget:s(d.budget),committed:s(d.committed),spent:s(d.spent),funding:s(d.funding),dependencies:s(d.dependencies),risks:s(d.risks),notes:s(d.notes)});S.stamp(x);if(!x0)db.initiatives.push(x);dlg='';return save(`${code} saved.`);
 }
 if(kind==='review'){const created=S.saveReview(db.reviews,id,d,()=>({meta:S.clone(db.meta),objectives:S.clone(db.objectives),kpis:S.clone(db.kpis),results:S.clone(db.results),initiatives:S.clone(db.initiatives)}));dlg='';return save(created?'Review and snapshot saved.':'Review updated.')}
}

// ---------- Excel: the Module 13 workbook ----------
const META={organisation:'Organisation',planName:'Plan title',year:'Planning year',currency:'Currency',from:'Strategic period from',to:'Strategic period to',mission:'Mission',vision:'Vision',values:'Values',impactGoal:'Impact goal',preparedBy:'Prepared by',reviewDate:'Next review',green:'On-track threshold %',yellow:'Attention threshold %',notes:'Notes'};
const OBJ={group:'Type',code:'Code',title:'Title',rationale:'Why it matters',desiredChange:'Intended change',priority:'Priority',owner:'Owner',start:'Start year',end:'End year',status:'Status',progress:'Progress %',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
const KPI={code:'Code',objectiveCode:'Objective code',name:'KPI',definition:'Definition',formula:'Calculation',unit:'Unit',type:'Type',category:'Category',source:'Data source',direction:'Direction',baseline:'Baseline',target:'Annual target',q1:'Q1 target',q2:'Q2 target',q3:'Q3 target',q4:'Q4 target',frequency:'Reporting frequency',owner:'KPI owner',dataOwner:'Data owner',status:'Status',notes:'Notes',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
const RES={kpiCode:'KPI code',date:'Date',value:'Value',evidence:'Evidence',notes:'Notes'};
const INI={code:'Code',objectiveCode:'Objective code',kpiCode:'KPI code',title:'Initiative',annualOutcome:'Annual outcome',activities:'Activities',milestones:'Milestones',owner:'Owner',team:'Supporting team',start:'Start',end:'End',status:'Status',progress:'Progress %',budget:'Planned budget',committed:'Committed',spent:'Spent',funding:'Funding source',dependencies:'Dependencies',risks:'Risks',notes:'Notes',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
const rowOf=(map,x)=>Object.keys(map).map(k=>x[k]??'');
function workbook(withData){
 return S.buildXlsx([
  S.readmeSheet(['Mission & Method — Strategy, KPIs & Annual Planning workbook (Module 13)','This workbook holds your annual plan. It matches the Strategy, KPIs & Annual Planning tool one-to-one.','','How to use','1. Meta — organisation, planning year, currency and thresholds.','2. Objectives — one row per objective. Type is External or Internal; codes are ESO1, ESO2 … and ISO1, ISO2 … (the same as the Strategic Objectives workbook).','3. KPIs — one row per KPI, linked to its objective code. Add a baseline, an annual target and, if you can, quarterly targets.','4. Results — one row per measurement, linked to its KPI code, with the date.','5. Annual plan — one row per initiative (AP1, AP2 …), linked to an objective code and, ideally, a KPI code.','6. Reviews and Decisions — one row per review (R1, R2 …) and one row per decision linked to its review.','','Round-trip with the tool','Download the blank template, complete it in Excel, then use Import Excel workbook in the tool. Export from the tool to get an updated workbook back. Nothing changes format either way.','','_schema — do not edit; the tool uses it to recognise the workbook.']),
  S.metaSheet(Object.entries(META).map(([k,l])=>[l,withData?db.meta[k]:''])),
  {name:'Objectives',headerRows:[0],rows:[Object.values(OBJ),...(withData?db.objectives.map(o=>rowOf(OBJ,o)):[])]},
  {name:'KPIs',headerRows:[0],rows:[Object.values(KPI),...(withData?db.kpis.map(k=>rowOf(KPI,k)):[])]},
  {name:'Results',headerRows:[0],rows:[Object.values(RES),...(withData?db.results.map(r=>rowOf(RES,r)):[])]},
  {name:'Annual plan',headerRows:[0],rows:[Object.values(INI),...(withData?db.initiatives.map(x=>rowOf(INI,x)):[])]},
  ...S.reviewSheets(db.reviews,withData,'What the data showed'),
  S.schemaSheet(WORKBOOK,2)
 ]);
}
function fromWorkbook(sheets){
 const out=blank(),m=S.metaFromSheet(S.findSheet(sheets,['Meta']),META);
 Object.keys(m).forEach(k=>{if(s(m[k])!=='')out.meta[k]=['year','from','to','green','yellow'].includes(k)?Number(m[k]):s(m[k])});
 const obj=(r,group)=>({...blankObjective(group),code:s(r.code).toUpperCase(),title:s(r.title),rationale:s(r.rationale),desiredChange:s(r.desiredChange),priority:PRIORITY.includes(s(r.priority))?s(r.priority):'Medium',owner:s(r.owner),start:s(r.start),end:s(r.end),status:S.STATUSES.includes(s(r.status))?s(r.status):'Planned',progress:clamp(r.progress),lastEditedBy:s(r.lastEditedBy),lastEditedAt:s(r.lastEditedAt)});
 const own=S.findSheet(sheets,['Objectives']);
 if(own)out.objectives=S.rowsToObjects(own,OBJ).filter(r=>s(r.code)).map(r=>obj(r,/^internal$/i.test(s(r.group))||/^ISO/i.test(s(r.code))?'Internal':'External'));
 else{ // a Strategic Objectives (Module 1) workbook
  const soMap={...OBJ};delete soMap.group;delete soMap.priority;
  out.fromStrategicObjectives=true;
  out.objectives=[...S.rowsToObjects(S.findSheet(sheets,['External objectives']),soMap).filter(r=>s(r.code)).map(r=>obj(r,'External')),...S.rowsToObjects(S.findSheet(sheets,['Internal objectives']),soMap).filter(r=>s(r.code)).map(r=>obj(r,'Internal'))];
 }
 out.kpis=S.rowsToObjects(S.findSheet(sheets,['KPIs']),KPI).filter(r=>s(r.code)).map(r=>{const k={...blankKpi()};Object.keys(KPI).forEach(f=>k[f]=s(r[f]));k.code=k.code.toUpperCase();k.objectiveCode=k.objectiveCode.toUpperCase();if(!UNITS.includes(k.unit))k.unit='Number';if(!TYPES.includes(k.type))k.type='Lagging';if(!CATEGORIES.includes(k.category))k.category='Impact';if(k.direction!=='Decrease')k.direction='Increase';if(!FREQ.includes(k.frequency))k.frequency='Quarterly';if(!KPI_STATUS.includes(k.status))k.status='Active';return k});
 out.results=S.rowsToObjects(S.findSheet(sheets,['Results']),RES).filter(r=>s(r.kpiCode)&&s(r.value)!=='').map(r=>({id:uid(),kpiCode:s(r.kpiCode).toUpperCase(),date:s(r.date),value:s(r.value),evidence:s(r.evidence),notes:s(r.notes)}));
 out.initiatives=S.rowsToObjects(S.findSheet(sheets,['Annual plan']),INI).filter(r=>s(r.code)||s(r.title)).map((r,i)=>{const x={...blankInitiative()};Object.keys(INI).forEach(f=>x[f]=s(r[f]));x.code=(x.code||'AP'+(i+1)).toUpperCase();x.objectiveCode=x.objectiveCode.toUpperCase();x.kpiCode=x.kpiCode.toUpperCase();x.progress=clamp(x.progress);if(!S.STATUSES.includes(x.status))x.status='Planned';return x});
 out.reviews=S.reviewsFromSheets(sheets,'What the data showed');
 return out;
}
function exportCsv(){
 const H=['Kind','Code','Linked to','Title','Owner','Start','End','Status','Progress / value','Baseline','Target','Budget','Spent','Notes'];
 const rows=[H,...db.objectives.map(o=>['objective',o.code,o.group,o.title,o.owner,o.start,o.end,o.status,o.progress,'','','','',o.desiredChange]),...db.kpis.map(k=>['kpi',k.code,k.objectiveCode,k.name,k.owner,'','',kpiStatus(k),latest(k)?.value??'',k.baseline,k.target,'','',k.definition]),...db.results.map(r=>['result','',r.kpiCode,'','',r.date,'','',r.value,'','','','',r.evidence]),...db.initiatives.map(x=>['initiative',x.code,[x.objectiveCode,x.kpiCode].filter(Boolean).join(' / '),x.title,x.owner,x.start,x.end,x.status,x.progress,'','',x.budget,x.spent,x.annualOutcome]),...db.reviews.flatMap(r=>r.decisions.map(d=>['decision','',`${r.period} ${r.date}`,d.decision,d.owner,'',d.due,d.status,'','','','','',d.action]))];
 S.download(`${FILE}.csv`,S.csv(rows),'text/csv;charset=utf-8');
}

// ---------- wiring ----------
function render(){
 const views={'Start':start,'Objectives':objectivesView,'KPIs & results':kpisView,'Annual plan':planView,'Calendar':calendarView,'Review':reviewView,'Export':exportView};
 root.innerHTML=S.shell({eyebrow:'Strategy & impact · Strategy, KPIs & annual planning',title:'Strategy, KPIs & Annual Planning',intro:'Turn objectives into measures and a year of work: KPIs with targets and dated results, an annual plan with owners, dates and budget, and quarterly reviews that record decisions.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=13&lesson=annual-plan',label:'Review Module 13'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 S.bind(root,app);
 if(tab==='Start')window.MMExample?.bindLive?.(root,db,'strategy-kpis');
}
const app={
 tab(t){tab=t;message='';render();root.querySelector('#main')?.focus()},
 submit,
 async importXlsx(file){try{const n=fromWorkbook(await S.parseXlsx(file));
  if(n.fromStrategicObjectives){
   if(!n.objectives.length)throw new Error('The Strategic Objectives workbook has no objectives yet.');
   const added=n.objectives.filter(o=>!objByCode(o.code)).length,updated=n.objectives.length-added;
   if(!confirm(`Strategic Objectives workbook found.\n• ${added} new objective(s) will be added\n• ${updated} existing objective(s) with the same code will be updated\n\nYour KPIs, results, annual plan and reviews stay as they are. Continue?`))return;
   n.objectives.forEach(o=>{const cur=objByCode(o.code);if(cur)Object.assign(cur,{group:o.group,title:o.title,rationale:o.rationale,desiredChange:o.desiredChange,owner:o.owner,start:o.start,end:o.end,status:o.status,progress:o.progress});else db.objectives.push(o)});
   if(!db.meta.organisation&&n.meta.organisation)Object.assign(db.meta,{organisation:n.meta.organisation,mission:n.meta.mission,vision:n.meta.vision,values:n.meta.values});
   tab='Objectives';save(`Objectives imported from the Strategic Objectives workbook (${added} added, ${updated} updated).`);return;
  }if(!n.objectives.length&&!n.kpis.length&&!n.initiatives.length)throw new Error('No objectives, KPIs or initiatives were found. Use the template from this tool or a Strategic Objectives workbook.');if(!confirm(`Import preview:\n• ${n.objectives.length} objectives\n• ${n.kpis.length} KPIs and ${n.results.length} results\n• ${n.initiatives.length} annual plan initiatives\n• ${n.reviews.length} reviews\n\nThis will replace the current data in this browser. Continue?`))return;db=n;tab='Start';save('Excel workbook imported.')}catch(e){message='Import failed: '+e.message;render()}},
 async importJson(file){try{const o=JSON.parse(await file.text());const n=o.version===2&&Array.isArray(o.objectives)&&Array.isArray(o.kpis)?o:(o.meta&&Array.isArray(o.priorities)&&Array.isArray(o.kpis))?migrateV1(o):null;if(!n)throw new Error('This is not a Strategy, KPIs & Annual Planning backup.');if(!confirm('Replace the current browser data with this backup?'))return;storage.save(normalise({...blank(),...n,meta:{...blank().meta,...n.meta},version:2}));db=storage.load();tab='Start';save('Backup imported.')}catch(e){message='Import failed: '+e.message;render()}},
 action(el){
  const a=el.dataset.action,id=el.dataset.id,find=(list)=>db[list].find(x=>x.id===id);
  const open=h=>{dlg=h;render()};
  if(a==='close'){dlg='';render();return}
  if(a==='add-objective')return open(objectiveDialog(null,el.dataset.group||'External'));
  if(a==='edit-objective')return open(objectiveDialog(find('objectives')));
  if(a==='add-kpi')return open(kpiDialog(null,el.dataset.objective||''));
  if(a==='edit-kpi')return open(kpiDialog(find('kpis')));
  if(a==='add-result'){if(!db.kpis.length){message='Add a KPI before recording results.';render();return}return open(resultDialog(null,el.dataset.kpi||''))}
  if(a==='edit-result')return open(resultDialog(find('results')));
  if(a==='add-initiative')return open(initiativeDialog(null,el.dataset.objective||''));
  if(a==='edit-initiative')return open(initiativeDialog(find('initiatives')));
  if(a==='new-review')return open(reviewDialog());
  if(a==='edit-review')return open(reviewDialog(find('reviews')));
  if(a==='add-row')return S.addDecisionRow(root,el=>app.action(el));
  if(a==='remove-row'){el.closest('.action-row')?.remove();return}
  if(a==='calendar'){calendar=el.dataset.mode;render();return}
  if(a==='delete'){
   const form=el.closest('form'),kind=form?.dataset.form,list={objective:'objectives',kpi:'kpis',result:'results',initiative:'initiatives',review:'reviews'}[kind];if(!list)return;
   const x=db[list].find(r=>r.id===id);if(!x)return;
   let warn='Delete this record? Export a copy first if you need to keep it.';
   if(kind==='objective'){const n=db.kpis.filter(k=>k.objectiveCode===x.code).length+db.initiatives.filter(i=>i.objectiveCode===x.code).length;if(n)warn=`Delete ${x.code}? ${n} linked KPI(s) and initiative(s) will stay but become unlinked.`}
   if(kind==='kpi'){const n=db.results.filter(r=>r.kpiCode===x.code).length;if(n)warn=`Delete ${x.code} and its ${n} result(s)?`}
   if(!confirm(warn))return;
   if(kind==='objective'){db.kpis.forEach(k=>{if(k.objectiveCode===x.code)k.objectiveCode=''});db.initiatives.forEach(i=>{if(i.objectiveCode===x.code)i.objectiveCode=''})}
   if(kind==='kpi'){db.results=db.results.filter(r=>r.kpiCode!==x.code);db.initiatives.forEach(i=>{if(i.kpiCode===x.code)i.kpiCode=''})}
   db[list]=db[list].filter(r=>r!==x);dlg='';save('Deleted.');return;
  }
  if(a==='load-example'){if((db.objectives.length||db.kpis.length||db.initiatives.length)&&!confirm('Replace the current plan with the example? Download a backup first if you need it.'))return;db=window.MMExample?.strategyKpis?.()||makeExample();save('Example loaded (Harvest Learning Foundation — the same worked example runs across the Impact Suite). Replace it with your own objectives, KPIs and initiatives.');return}
  if(a==='import-so-direct'){
   const so=readSO();
   if(!so||!so.objectives?.length){message='No Strategic Objectives found in this browser. Open the Strategic Objectives tool first.';render();return}
   const incoming=so.objectives.map(o=>({...blankObjective(o.group||'External'),code:String(o.code||'').toUpperCase(),title:o.title||'',rationale:o.rationale||'',desiredChange:o.desiredChange||'',owner:o.owner||'',start:String(o.start||db.meta.year),end:String(o.end||db.meta.to),status:S.STATUSES.includes(o.status)?o.status:'Planned',progress:clamp(o.progress),priority:'Medium'}));
   const added=incoming.filter(o=>!objByCode(o.code)).length,updated=incoming.length-added;
   if(!confirm(`Strategic Objectives found in this browser.\n• ${added} new objective(s) will be added\n• ${updated} existing objective(s) with the same code will be updated\n\nYour KPIs, results, annual plan and reviews stay as they are. Continue?`))return;
   incoming.forEach(o=>{const cur=objByCode(o.code);if(cur)Object.assign(cur,{group:o.group,title:o.title,rationale:o.rationale,desiredChange:o.desiredChange,owner:o.owner,start:o.start,end:o.end,status:o.status,progress:o.progress});else db.objectives.push(o)});
   if(!db.meta.organisation&&so.meta?.organisation)Object.assign(db.meta,{organisation:so.meta.organisation||'',mission:so.meta.mission||db.meta.mission,vision:so.meta.vision||db.meta.vision,values:so.meta.values||db.meta.values});
   tab='Objectives';save(`Objectives imported (${added} added, ${updated} updated). KPIs and initiatives stay as they are.`);return;
  }
  try{
   if(a==='download-template'){S.download(`${FILE}-TEMPLATE.xlsx`,workbook(false),S.XLSX_TYPE);message='Template downloaded. Complete it in Excel, then use Import Excel workbook to bring it back.';render();return}
   if(a==='xlsx'){S.download(`${FILE}.xlsx`,workbook(true),S.XLSX_TYPE);return}
  }catch(e){message=e.message;render();return}
  if(a==='export-json'){S.download(`${FILE}-backup.json`,JSON.stringify({...db,exportedAt:new Date().toISOString()},null,2),'application/json');return}
  if(a==='csv')return exportCsv();
  if(a==='print')window.print();
 }
};
const fromHash={start:'Start',objectives:'Objectives',kpis:'KPIs & results',plan:'Annual plan',calendar:'Calendar',review:'Review',export:'Export'}[location.hash.slice(1)];
if(fromHash)tab=fromHash;
render();
})();
