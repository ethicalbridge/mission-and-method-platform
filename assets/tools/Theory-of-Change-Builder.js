(()=>{'use strict';
const S=window.MMSuite;if(!S){alert('Suite kit not loaded');return}
const {esc,uid,now,today,currentYear,clone,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s,STATUSES}=S;

// ---------- Storage ----------
const KEY='mission-method-theory-of-change-v2', LEGACY='mission-method-toc-builder-v1';
const SO_KEY='mission-method-strategic-objectives-v2';

const LEVELS=[['impact','Impact'],['outcome','Outcome'],['intermediate_outcome','Intermediate outcome'],['output','Output'],['activity','Activity'],['input','Input']];
const LEVEL_LABEL=Object.fromEntries(LEVELS);
const LEVEL_ORDER={impact:5,outcome:4,intermediate_outcome:3,output:2,activity:1,input:0};

const blankMeta=()=>({organisation:'',name:'Theory of Change',country:'',dates:`${currentYear}–${currentYear+2}`,preparedBy:'',version:'0.1',notes:'',mission:'',vision:'',values:'',impactGoal:'',problem:'',description:'',objectives:[]});
const blankPathway=()=>({id:uid(),objective:'',description:'',problem:'',input:'',activity:'',output:'',intermediateOutcome:'',outcome:'',impact:'',assumptions:'',risks:'',evidence:'',lastEditedBy:'',lastEditedAt:''});
const blankIndicator=()=>({id:uid(),pathwayId:'',level:'outcome',name:'',definition:'',baseline:'',target:'',unit:'',source:'',frequency:'',owner:'',verification:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blank=()=>({version:2,meta:blankMeta(),pathways:[],indicators:[],snapshots:[]});

function migrateV1(v1){
 const out=blank();
 const m=v1.meta||{};
 Object.assign(out.meta,{organisation:m.organisation||'',name:m.name||'Theory of Change',country:m.country||'',dates:m.dates||out.meta.dates,preparedBy:m.preparedBy||'',version:m.version||'0.1',notes:m.notes||'',mission:m.mission||'',vision:m.vision||'',values:m.values||'',impactGoal:'',problem:m.problem||'',description:m.description||'',objectives:Array.isArray(m.objectives)?m.objectives:[]});
 // Convert tocRows → pathways
 (v1.tocRows||[]).forEach(r=>{
  out.pathways.push({...blankPathway(),objective:s(r.objective),description:s(r.description),problem:s(r.problem),input:s(r.input),activity:s(r.activity),output:s(r.output),outcome:s(r.outcome),impact:s(r.impact),assumptions:s(r.assumption),risks:'',evidence:''});
 });
 // Convert indicators
 (v1.indicators||[]).forEach(i=>{
  out.indicators.push({...blankIndicator(),name:s(i.name),definition:s(i.definition),baseline:s(i.baseline),target:s(i.target),unit:s(i.unit),source:s(i.source),frequency:s(i.frequency),owner:s(i.owner),verification:s(i.verification),notes:s(i.notes)});
 });
 // Convert nodes/edges (canvas data) into assumptions on pathway if any text present
 if(!out.pathways.length&&(v1.nodes||[]).length){
  const p=blankPathway();
  const pick=t=>(v1.nodes||[]).filter(n=>n.type===t).map(n=>n.text).join('\n');
  Object.assign(p,{input:pick('input'),activity:pick('activity'),output:pick('output'),outcome:pick('outcome'),intermediateOutcome:pick('intermediate_outcome'),impact:pick('impact')});
  const assumps=[...(v1.edges||[]).map(e=>e.assumption),...(v1.assumptions||[]).map(a=>a.text)].filter(Boolean).join('\n');
  p.assumptions=assumps;
  out.pathways.push(p);
 }
 return out;
}

const {load,save:persist}=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{
 d=window.MMExample?.cleanupStaleExample?.(d,'mm.toc-cleanup-v3',blank)||d;
 if(!Array.isArray(d.pathways))d.pathways=[];
 if(!Array.isArray(d.indicators))d.indicators=[];
 if(!Array.isArray(d.snapshots))d.snapshots=[];
 if(!Array.isArray(d.meta.objectives))d.meta.objectives=[];
 if(!d.pathways.length)d.pathways=[blankPathway()];
 return d;
}});
let db=load();

// ---------- SO integration ----------
function readSO(){try{const raw=localStorage.getItem(SO_KEY);if(!raw)return null;const o=JSON.parse(raw);return o&&Array.isArray(o.objectives)?o:null}catch{return null}}
const soObjectives=()=>readSO()?.objectives||[];
const soReady=()=>soObjectives().length>0;

// ---------- UI state ----------
let tab='Start', modal_html='', message='';
const TABS=['Start','Pathways','Indicators','Assumptions & risks','Review','Export'];

// ---------- Journey panel ----------
function journeyPanel(){
 const soN=soObjectives().length;
 const step1Done=soN>0;
 const step2Done=db.pathways.some(p=>p.output||p.outcome||p.impact)||!!db.meta.description;
 const step3Done=false; // check SK later if desired
 return `<section class="panel"><div class="rowhead section-head"><div><span class="eyebrow">Recommended path</span><h2>Where this tool sits</h2><p>Each step builds on the one before. Tick means data was found for that tool in this browser.</p></div></div>
  <ol class="journey-steps">
   <li class="step ${step1Done?'done':''}"><span class="step-num">1</span><div class="step-body"><b>Strategic Objectives · Module 1</b><p class="tiny">${step1Done?`<b>${soN}</b> objective${soN===1?'':'s'} ready — <button class="link" data-action="import-so-direct">bring them in</button>`:'Set multi-year direction and objectives first.'}</p></div><a class="button ${step1Done?'secondary':''} small" href="Strategic-Objectives.html">${step1Done?'Review →':'Start here →'}</a></li>
   <li class="step ${step2Done?'done':''} current"><span class="step-num">2</span><div class="step-body"><b>Theory of Change Builder <span class="pill">You are here</span></b><p class="tiny">Map the pathway from objectives to long-term impact, and name the assumptions behind each step.</p></div></li>
   <li class="step ${step3Done?'done':''}"><span class="step-num">3</span><div class="step-body"><b>Strategy, KPIs &amp; Annual Planning · Module 6</b><p class="tiny">Turn this year's slice into measurable KPIs, an annual plan and review decisions.</p></div><a class="button secondary small" href="Strategy-KPIs-and-Annual-Planning.html">Open →</a></li>
  </ol></section>`;
}

// ---------- Views ----------
function dashboard(){
 const pw=db.pathways.length;
 const complete=db.pathways.filter(p=>p.input&&p.output&&p.outcome&&p.impact).length;
 const withAssumption=db.pathways.filter(p=>p.assumptions).length;
 const withIndicator=db.pathways.filter(p=>db.indicators.some(i=>i.pathwayId===p.id)).length;
 return `<section class="panel"><span class="eyebrow">Overview</span><h2>Theory of Change progress</h2>
  <div class="grid four">${card('Pathways',pw,`${complete} complete (all 4 levels filled)`)}${card('With assumptions',withAssumption,'Named conditions that must hold')}${card('With indicators',withIndicator,'Evidence of change identified')}${card('Objectives',db.meta.objectives.length,'From Module 1 or added here')}</div>
 </section>`;
}

function startView(){
 return `${window.MMExample?.renderIntegration?.('theory-of-change')||''}${window.MMExample?.renderBox?.('theory-of-change')||''}${workspaceView()}`;
}

// Interactive workspace — the green box IS the tool. Meta fields and
// pathway rows are edited inline, saved live as the user types.
function workspaceView(){
 const m=db.meta;
 const so=readSO();
 const soObjs=(so?.objectives||[]).map(o=>({code:o.code||'',title:o.title||'',full:`${o.code||''} · ${o.title||''}`.replace(/^ · /,''),rationale:o.rationale||'',desiredChange:o.desiredChange||'',impact:o.impactStatement||''}));
 const taken=new Set(db.pathways.map(p=>p.objective).filter(Boolean));
 const unlinked=soObjs.filter(o=>!taken.has(o.full));
 return `<section class="work-box" id="toc-workspace">
  <div class="work-head">
   <span class="work-badge">Your workspace</span>
   <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
   <span class="work-status" id="work-status"></span>
  </div>
  <p class="work-hint">Edit anywhere — everything saves automatically. The example above is for reference; this is your workspace.</p>
  <div class="work-meta">
   <label class="work-field"><span>Mission</span><textarea data-field="mission" placeholder="What you do, and for whom.">${esc(m.mission)}</textarea></label>
   <label class="work-field"><span>Vision</span><textarea data-field="vision" placeholder="The future you work towards.">${esc(m.vision)}</textarea></label>
   <label class="work-field"><span>Values</span><textarea data-field="values" placeholder="One value per line.">${esc(m.values)}</textarea></label>
   <label class="work-field full"><span>Impact goal</span><textarea data-field="impactGoal" placeholder="The broader, long-term change this theory of change contributes to.">${esc(m.impactGoal)}</textarea></label>
  </div>
  <div class="work-sect-head">
   <h3>Pathways — one per strategic objective</h3>
   <p class="tiny">Pick an objective from Strategic Objectives for each row and the problem, outcome and impact pre-fill from it. Open <b>Full edit</b> on a row to add assumptions, risks and evidence.</p>
  </div>
  <div class="work-pathways">${db.pathways.map((p,i)=>pathwayRowHtml(p,i,soObjs)).join('')||'<p class="example-empty">No pathways yet — click "Add a pathway" below.</p>'}</div>
  <div class="work-add">
   <button class="button" data-action="add-pathway-row">+ Add a pathway${unlinked.length?` (${unlinked.length} unused objective${unlinked.length===1?'':'s'} available)`:''}</button>
   ${!so?'<span class="tiny" style="margin-left:12px">Tip: open <a href="Strategic-Objectives.html">Strategic Objectives</a> first so your ESO/ISO list appears in the dropdown.</span>':''}
  </div>
  <details class="work-extra">
   <summary>More project details — country, dates, prepared by, notes</summary>
   <div class="work-meta">
    <label class="work-field"><span>Project / plan name</span><input data-field="name" value="${esc(m.name)}" placeholder="e.g. 2026 theory of change"></label>
    <label class="work-field"><span>Country or location</span><input data-field="country" value="${esc(m.country)}" placeholder="e.g. Kenya"></label>
    <label class="work-field"><span>Dates</span><input data-field="dates" value="${esc(m.dates)}" placeholder="e.g. 2026–2029"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field"><span>Version</span><input data-field="version" value="${esc(m.version)}" placeholder="e.g. 0.1"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Any context about this plan.">${esc(m.notes)}</textarea></label>
   </div>
  </details>
 </section>`;
}

function pathwayRowHtml(p,i,soObjs){
 const options=soObjs.map(o=>[o.full,o.full]);
 if(p.objective&&!options.some(x=>x[0]===p.objective))options.push([p.objective,p.objective]);
 const soMap=Object.fromEntries(soObjs.map(o=>[o.full,{problem:o.rationale,outcome:o.desiredChange,impact:o.impact}]));
 return `<article class="work-pathway" data-pathway-id="${esc(p.id)}">
  <div class="work-pathway-head">
   <span class="eyebrow">Pathway ${i+1}</span>
   <div class="row-actions">
    <button type="button" class="link" data-action="edit-pathway" data-id="${esc(p.id)}">Full edit</button>
    <button type="button" class="link danger" data-action="delete-pathway-row" data-id="${esc(p.id)}">Delete</button>
   </div>
  </div>
  <div class="work-chain">
   <label class="chain-cell"><span class="chain-label">Objective</span>${options.length?`<select data-field="objective" data-pid="${esc(p.id)}" data-so-objectives="${esc(JSON.stringify(soMap))}"><option value="">— pick an objective —</option>${options.map(([v,l])=>`<option value="${esc(v)}" ${v===p.objective?'selected':''}>${esc(l)}</option>`).join('')}</select>`:`<textarea data-field="objective" data-pid="${esc(p.id)}" placeholder="Pick an objective (open Strategic Objectives first)">${esc(p.objective)}</textarea>`}</label>
   <label class="chain-cell"><span class="chain-label">Problem</span><textarea data-field="problem" data-pid="${esc(p.id)}" placeholder="What this pathway addresses">${esc(p.problem)}</textarea></label>
   <label class="chain-cell"><span class="chain-label">Input</span><textarea data-field="input" data-pid="${esc(p.id)}" placeholder="Resources needed">${esc(p.input)}</textarea></label>
   <label class="chain-cell"><span class="chain-label">Output</span><textarea data-field="output" data-pid="${esc(p.id)}" placeholder="Immediate product or service">${esc(p.output)}</textarea></label>
   <label class="chain-cell"><span class="chain-label">Outcome</span><textarea data-field="outcome" data-pid="${esc(p.id)}" placeholder="Change this pathway brings about">${esc(p.outcome)}</textarea></label>
   <label class="chain-cell"><span class="chain-label">Impact</span><textarea data-field="impact" data-pid="${esc(p.id)}" placeholder="Broader long-term change">${esc(p.impact)}</textarea></label>
  </div>
 </article>`;
}

function pathwaysView(){
 const rows=db.pathways.map((p,i)=>`<article class="panel"><div class="rowhead section-head"><div><span class="eyebrow">Pathway ${i+1}</span><h3>${esc(p.objective||'Untitled pathway')}</h3>${edited(p)}</div><div class="actions"><button class="button small secondary" data-action="edit-pathway" data-id="${p.id}">Edit</button></div></div>
  <div class="toc-chain"><div class="toc-step"><b class="eyebrow">Problem</b><p>${esc(p.problem||'—')}</p></div><div class="toc-step"><b class="eyebrow">Input</b><p>${esc(p.input||'—')}</p></div><div class="toc-step"><b class="eyebrow">Output</b><p>${esc(p.output||'—')}</p></div><div class="toc-step"><b class="eyebrow">Outcome</b><p>${esc(p.outcome||'—')}</p></div><div class="toc-step"><b class="eyebrow">Impact</b><p>${esc(p.impact||'—')}</p></div></div>
  ${p.assumptions?`<p style="margin-top:12px"><b>Assumptions:</b> ${esc(p.assumptions).replace(/\n/g,'<br>')}</p>`:''}
  ${p.risks?`<p><b>Risks:</b> ${esc(p.risks).replace(/\n/g,'<br>')}</p>`:''}
 </article>`);
 return `<div class="rowhead section-head"><div><h2>Pathways</h2><p>One pathway per strategic objective. Each pathway runs: <b>objective → problem → input → output → outcome → impact</b>. The objective pulls from the Strategic Objectives tool.</p></div><button class="button" data-action="add-pathway">Add pathway</button></div>
  ${db.pathways.length?rows.join(''):empty('No pathways yet. Add one to start.')}`;
}

function indicatorsView(){
 const rows=db.indicators.map(i=>`<tr>
  <td><b>${esc(i.name||'Untitled')}</b>${edited(i)}</td>
  <td>${esc(LEVEL_LABEL[i.level]||i.level)}</td>
  <td>${esc(i.baseline||'—')} → ${esc(i.target||'—')}${i.unit?` ${esc(i.unit)}`:''}</td>
  <td>${esc(i.source||'—')}</td>
  <td>${esc(i.frequency||'—')}</td>
  <td>${esc(i.owner||'—')}</td>
  <td><button class="button small secondary" data-action="edit-indicator" data-id="${i.id}">Edit</button></td>
 </tr>`);
 return `<div class="rowhead section-head"><div><h2>Indicators</h2><p>How you'll know change is happening. Each indicator needs a baseline, target, source and reporting frequency to be useful.</p></div><button class="button" data-action="add-indicator">Add indicator</button></div>
  ${table(['Indicator','Level','Baseline → target','Source','Frequency','Owner',''],rows,'No indicators yet. Define at least one for each outcome and impact.')}`;
}

function assumptionsView(){
 // Combine per-pathway assumption lines into a flat view
 const items=[];
 db.pathways.forEach((p,i)=>{
  (p.assumptions||'').split('\n').map(x=>x.trim()).filter(Boolean).forEach(text=>items.push({pathway:p.objective||`Pathway ${i+1}`,text,kind:'assumption',id:p.id}));
  (p.risks||'').split('\n').map(x=>x.trim()).filter(Boolean).forEach(text=>items.push({pathway:p.objective||`Pathway ${i+1}`,text,kind:'risk',id:p.id}));
 });
 const assumptions=items.filter(x=>x.kind==='assumption');
 const risks=items.filter(x=>x.kind==='risk');
 return `<div class="rowhead section-head"><div><h2>Assumptions &amp; risks</h2><p>Everything from the Assumptions and Risks fields across all pathways. Edit the pathway to change these.</p></div></div>
  <section class="panel"><h3>Assumptions (${assumptions.length})</h3>${assumptions.length?table(['Pathway','Assumption',''],assumptions.map(a=>`<tr><td>${esc(a.pathway)}</td><td>${esc(a.text)}</td><td><button class="link" data-action="edit-pathway" data-id="${a.id}">Edit pathway</button></td></tr>`),''):empty('No assumptions recorded yet.')}</section>
  <section class="panel"><h3>Risks (${risks.length})</h3>${risks.length?table(['Pathway','Risk',''],risks.map(r=>`<tr><td>${esc(r.pathway)}</td><td>${esc(r.text)}</td><td><button class="link" data-action="edit-pathway" data-id="${r.id}">Edit pathway</button></td></tr>`),''):empty('No risks recorded yet.')}</section>`;
}

function reviewView(){
 const checks=[
  ['Impact defined',db.pathways.some(p=>p.impact)||!!db.meta.impactGoal,'Is the long-term change clearly stated?'],
  ['Outcomes connect to impact',db.pathways.some(p=>p.outcome&&p.impact),'Each outcome should be a step toward impact.'],
  ['Outputs link to outcomes',db.pathways.some(p=>p.output&&p.outcome),'Outputs are what delivery produces; outcomes are the change that follows.'],
  ['Assumptions named',db.pathways.some(p=>p.assumptions),'What has to hold true for the pathway to work?'],
  ['Indicators defined',db.indicators.length>0,'How will you see change happening?'],
  ['Problem stated',!!db.meta.problem,'Does the problem describe who, why and the consequence?']
 ];
 const snaps=[...db.snapshots].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 return `<div class="rowhead section-head"><div><h2>Review your Theory of Change</h2><p>Read the complete design together before export. Snapshots keep a dated record of what the theory looked like at that moment.</p></div><button class="button" data-action="new-snapshot">Capture snapshot</button></div>
  <section class="panel"><h3>Quality check</h3><div class="grid">${checks.map(c=>`<div class="card ${c[1]?'':'warn'}"><span class="eyebrow">${c[1]?'✓':'—'} ${esc(c[0])}</span><p>${esc(c[2])}</p></div>`).join('')}</div></section>
  <section class="panel"><h3>Review snapshots</h3>${snaps.length?table(['Date','Reviewer','Pathways','Summary',''],snaps.map(sn=>`<tr><td>${esc(fmtDate(sn.date))}</td><td>${esc(sn.reviewer||'—')}</td><td>${(sn.snapshot?.pathways||[]).length}</td><td>${esc(sn.summary||'—')}</td><td><button class="link" data-action="delete-snapshot" data-id="${sn.id}">Delete</button></td></tr>`),''):empty('No snapshots yet. Capture one at your next review.')}</section>`;
}

function exportView(){
 return `<div class="rowhead section-head"><div><h2>Export your Theory of Change</h2><p>Excel matches the Module 2 workbook exactly — you can re-import it later without losing anything.</p></div></div>
  ${exportButtons()}
  <section class="panel"><h3>${esc(db.meta.name||'Theory of Change')}</h3><p>${esc(db.meta.organisation||'Organisation not entered')} · ${esc(db.meta.dates||'—')} · Prepared by ${esc(db.meta.preparedBy||'—')}</p>
   ${db.meta.impactGoal?`<p><b>Impact goal:</b> ${esc(db.meta.impactGoal)}</p>`:''}
   ${db.meta.problem?`<p><b>Problem:</b> ${esc(db.meta.problem)}</p>`:''}
   ${db.meta.description?`<p><b>Description:</b> ${esc(db.meta.description)}</p>`:''}
   ${(db.meta.objectives||[]).length?`<p><b>Objectives:</b></p><ul>${db.meta.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`:''}
  </section>
  ${db.pathways.map((p,i)=>`<section class="panel"><h3>Pathway ${i+1}: ${esc(p.objective||'Untitled')}</h3>
   <p><b>Input:</b> ${esc(p.input||'—')}</p>
   <p><b>Activity:</b> ${esc(p.activity||'—')}</p>
   <p><b>Output:</b> ${esc(p.output||'—')}</p>
   <p><b>Intermediate outcome:</b> ${esc(p.intermediateOutcome||'—')}</p>
   <p><b>Outcome:</b> ${esc(p.outcome||'—')}</p>
   <p><b>Impact:</b> ${esc(p.impact||'—')}</p>
   ${p.assumptions?`<p><b>Assumptions:</b> ${esc(p.assumptions)}</p>`:''}
   ${p.risks?`<p><b>Risks:</b> ${esc(p.risks)}</p>`:''}
  </section>`).join('')}`;
}

// ---------- Modals ----------
function pathwayModal(p){
 const isNew=!p;p=p||blankPathway();
 // Pull objectives directly from the Strategic Objectives tool
 const so=readSO();
 const soObjs=(so?.objectives||[]).map(o=>({code:o.code||'',title:o.title||'',full:`${o.code||''} · ${o.title||''}`.replace(/^ · /,''),rationale:o.rationale||'',desiredChange:o.desiredChange||'',impact:o.impactStatement||''}));
 const options=soObjs.map(o=>[o.full,o.full]);
 // Fallback to anything already saved in meta.objectives
 db.meta.objectives.forEach(o=>{if(!options.some(x=>x[0]===o))options.push([o,o])});
 const soMap=Object.fromEntries(soObjs.map(o=>[o.full,{problem:o.rationale,outcome:o.desiredChange,impact:o.impact}]));
 const soHint=options.length?'Pick the strategic objective this pathway supports — problem, outcome and impact pre-fill from it when the field is empty.':'No Strategic Objectives found yet. Open that tool first, or type the objective here.';
 const objField=options.length?`<label class="field full"><span class="label">Objective ${tip(soHint)}</span><select name="objective" data-so-objectives="${esc(JSON.stringify(soMap))}"><option value="">— pick an objective —</option>${options.map(([v,l])=>`<option value="${esc(v)}" ${v===p.objective?'selected':''}>${esc(l)}</option>`).join('')}</select>${so?'':'<small>Tip: open Strategic Objectives first so your ESO list appears here automatically.</small>'}</label>`:area('Objective','objective',p.objective,soHint);
 return modal(isNew?'Add pathway':'Edit pathway',`<form data-form="pathway" data-id="${esc(p.id||'')}" class="form">
  ${objField}
  ${area('Problem — what this pathway addresses','problem',p.problem,'The specific problem this pathway tackles. Pre-fills from the objective rationale when the field is empty.')}
  ${area('Input — resources needed','input',p.input,'People, funding, expertise, technology, partnerships.')}
  ${area('Output — immediate product or service','output',p.output,'What delivery produces: trainings held, reports published, services delivered.')}
  ${area('Outcome — the change this pathway brings about','outcome',p.outcome,'The change your work causes, often together with others. Pre-fills from the objective desired-change when empty.')}
  ${area('Impact — broader long-term change contributed to','impact',p.impact,'The condition your work helps create over time. Pre-fills from the objective impact statement when empty.')}
  <details class="field full"><summary>Optional detail — assumptions, risks and evidence</summary>
   ${area('Assumptions — one per line','assumptions',p.assumptions,'Conditions that must hold for the pathway to work.')}
   ${area('Risks — one per line','risks',p.risks,'What could stop this pathway from succeeding.')}
   ${area('Evidence or references','evidence',p.evidence)}
  </details>
  ${formEnd('Save pathway',{deleteId:isNew?'':p.id,deleteLabel:'Delete pathway'})}
 </form>`);
}

function indicatorModal(i){
 const isNew=!i;i=i||blankIndicator();
 const pathwayOptions=db.pathways.map((p,idx)=>[p.id,p.objective||`Pathway ${idx+1}`]);
 return modal(isNew?'Add indicator':'Edit indicator',`<form data-form="indicator" data-id="${esc(i.id||'')}" class="form">
  ${select('Pathway','pathwayId',pathwayOptions,i.pathwayId,'','Not linked')}
  ${select('Level measured','level',LEVELS,i.level||'outcome','Which level of the pathway this indicator measures.')}
  ${field('Indicator name','name',i.name,'text','required','What is counted or measured.')}
  ${area('Definition','definition',i.definition,'Exactly what counts, and what does not.')}
  ${field('Baseline','baseline',i.baseline)}
  ${field('Target','target',i.target)}
  ${field('Unit','unit',i.unit)}
  ${field('Data source','source',i.source)}
  ${field('Reporting frequency','frequency',i.frequency)}
  ${field('Owner','owner',i.owner)}
  ${field('Means of verification','verification',i.verification)}
  ${area('Notes','notes',i.notes)}
  ${formEnd('Save indicator',{deleteId:isNew?'':i.id,deleteLabel:'Delete indicator'})}
 </form>`);
}

function snapshotModal(){
 return modal('Capture Theory of Change snapshot',`<form data-form="snapshot" class="form">
  ${field('Snapshot date','date',today(),'date','required')}
  ${field('Reviewer','reviewer',editorName()||'')}
  ${area('Summary — what was discussed or decided','summary','')}
  <div class="actions field full"><button class="button" type="submit">Capture snapshot</button><button class="button secondary" type="button" data-action="close">Cancel</button></div>
 </form>`,'Saves the whole Theory of Change (meta, pathways, indicators) at this moment so you can see what it looked like later.');
}

// ---------- Render ----------
function view(){
 switch(tab){
  case 'Start':return startView();
  case 'Pathways':return pathwaysView();
  case 'Indicators':return indicatorsView();
  case 'Assumptions & risks':return assumptionsView();
  case 'Review':return reviewView();
  case 'Export':return exportView();
 }
 return startView();
}

function render(){
 document.querySelector('#app').innerHTML=shell({
  eyebrow:'Strategy & impact · Theory of Change',
  title:'Theory of Change Builder',
  intro:'Map how your work contributes to long-term change. Build pathways from inputs to impact and name the assumptions that need to hold.',
  module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=2',label:'Review Module Two'},
  tabs:TABS, active:tab, message, content:view(), modal:modal_html
 });
 const root=document.querySelector('#app');
 bind(root,{
  tab:t=>{tab=t;message='';modal_html='';render()},
  action,submit,
  importXlsx:file=>importXlsx(file),
  importJson:file=>importJson(file)
 });
 if(tab==='Start')wireWorkspace(root);
 // Auto-fill problem/outcome/impact when objective is picked in the pathway modal
 const objSel=root.querySelector('form[data-form="pathway"] select[name="objective"]');
 if(objSel&&objSel.dataset.soObjectives){
  objSel.addEventListener('change',()=>{
   let map={};try{map=JSON.parse(objSel.dataset.soObjectives||'{}')}catch{}
   const data=map[objSel.value];if(!data)return;
   const form=objSel.form;
   for(const [k,v] of Object.entries(data)){
    const f=form.querySelector(`[name="${k}"]`);
    if(f&&!String(f.value||'').trim()&&v)f.value=v;
   }
  });
 }
}

// Wire inline editing in the interactive workspace (Start tab).
// Saves on every input, debounced by 400 ms. Status strip shows "Saving…" / "Saved".
function wireWorkspace(root){
 const box=root.querySelector('#toc-workspace');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer,lastSaveAt=0;
 const setStatus=t=>{if(status)status.textContent=t};
 const schedule=()=>{
  setStatus('Saving…');
  clearTimeout(timer);
  timer=setTimeout(()=>{
   persist(db);lastSaveAt=Date.now();
   setStatus('✓ Saved');
   setTimeout(()=>{if(Date.now()-lastSaveAt>=1200)setStatus('')},1500);
  },400);
 };
 // Meta fields (organisation, mission, vision, values, impactGoal, name, country, dates, preparedBy, version, notes)
 box.querySelectorAll('[data-field]:not([data-pid])').forEach(el=>{
  el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.value;stamp(db.meta);schedule()});
 });
 // Pathway fields (textareas + selects per row)
 box.querySelectorAll('[data-pid]').forEach(el=>{
  const update=()=>{
   const pid=el.dataset.pid,f=el.dataset.field;
   const p=db.pathways.find(x=>x.id===pid);if(!p)return;
   p[f]=el.value;
   if(f==='objective'&&p.objective&&!db.meta.objectives.includes(p.objective))db.meta.objectives.push(p.objective);
   stamp(p);schedule();
  };
  el.addEventListener('input',update);
  if(el.tagName==='SELECT'){
   el.addEventListener('change',()=>{
    update();
    // Pre-fill problem / outcome / impact for this row from the picked ESO (only when empty)
    let map={};try{map=JSON.parse(el.dataset.soObjectives||'{}')}catch{}
    const data=map[el.value];if(!data)return;
    const row=el.closest('.work-pathway');if(!row)return;
    const pid=el.dataset.pid;const p=db.pathways.find(x=>x.id===pid);if(!p)return;
    ['problem','outcome','impact'].forEach(f=>{
     if(!data[f])return;
     const t=row.querySelector(`[data-field="${f}"]`);
     if(t&&!String(t.value||'').trim()){t.value=data[f];p[f]=data[f]}
    });
    stamp(p);schedule();
   });
  }
 });
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset?.action;
 if(a==='close'){modal_html='';render();return}
 if(a==='add-pathway'){modal_html=pathwayModal();render();return}
 if(a==='edit-pathway'){const p=db.pathways.find(x=>x.id===el.dataset.id);if(p){modal_html=pathwayModal(p);render()}return}
 if(a==='add-indicator'){modal_html=indicatorModal();render();return}
 if(a==='edit-indicator'){const i=db.indicators.find(x=>x.id===el.dataset.id);if(i){modal_html=indicatorModal(i);render()}return}
 if(a==='new-snapshot'){modal_html=snapshotModal();render();return}
 if(a==='delete-snapshot'){if(!confirm('Delete this snapshot? Cannot be undone.'))return;db.snapshots=db.snapshots.filter(sn=>sn.id!==el.dataset.id);persist(db);message='Snapshot deleted.';render();return}
 if(a==='delete'){
  const id=el.dataset.id;
  if(!confirm('Delete this record? Cannot be undone.'))return;
  db.pathways=db.pathways.filter(p=>p.id!==id);
  db.indicators=db.indicators.filter(i=>i.id!==id);
  persist(db);modal_html='';message='Deleted.';render();return;
 }
 if(a==='add-pathway-row'){db.pathways.push({...blankPathway()});persist(db);render();return}
 if(a==='delete-pathway-row'){const id=el.dataset.id;if(!confirm('Delete this pathway? Cannot be undone.'))return;db.pathways=db.pathways.filter(p=>p.id!==id);db.indicators=db.indicators.filter(i=>i.pathwayId!==id);persist(db);render();return}
 if(a==='import-so-direct'){
  const so=readSO();if(!so||!so.objectives?.length){message='No Strategic Objectives found. Open that tool first.';render();return}
  const objectives=so.objectives.map(o=>`${o.code} · ${o.title}`);
  if(!confirm(`Bring in ${objectives.length} objective${objectives.length===1?'':'s'} from Strategic Objectives?\n\nThey'll replace the Objectives list in this tool. Pathways, indicators and snapshots stay as they are.`))return;
  db.meta.objectives=objectives;
  if(so.meta){if(!db.meta.mission)db.meta.mission=so.meta.mission||'';if(!db.meta.vision)db.meta.vision=so.meta.vision||'';if(!db.meta.values)db.meta.values=so.meta.values||'';if(!db.meta.organisation)db.meta.organisation=so.meta.organisation||''}
  persist(db);message=`${objectives.length} objective${objectives.length===1?'':'s'} imported.`;tab='Start';render();return;
 }
 if(a==='load-example'){
  if((db.pathways.length>1||db.pathways.some(p=>p.output||p.outcome))&&!confirm('Replace current pathways with an example?'))return;
  db=window.MMExample?.theoryOfChange?.()||exampleDb();persist(db);message='Example loaded (Harvest Learning Foundation — the same worked example runs across the Impact Suite).';render();return;
 }
 if(a==='download-template'){try{download('Mission-and-Method-theory-of-change-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE);message='Template downloaded.';render()}catch(e){message='Template failed: '+e.message;render()}return}
 if(a==='export-json'){download('Mission-and-Method-theory-of-change.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='xlsx'){try{download('Mission-and-Method-theory-of-change.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel workbook downloaded.';render()}catch(e){message='Export failed: '+e.message;render()}return}
 if(a==='csv'){exportCsv();return}
 if(a==='print'){window.print();return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 if(kind==='meta'){
  const objectives=String(d.objectives||'').split('\n').map(x=>x.trim()).filter(Boolean);
  Object.assign(db.meta,{organisation:s(d.organisation),name:s(d.name),country:s(d.country),dates:s(d.dates),preparedBy:s(d.preparedBy),version:s(d.version),mission:s(d.mission),vision:s(d.vision),values:s(d.values),impactGoal:s(d.impactGoal),problem:s(d.problem),description:s(d.description),notes:s(d.notes),objectives});
  persist(db);message='Project details saved.';render();return;
 }
 if(kind==='pathway'){
  const existing=db.pathways.find(p=>p.id===form.dataset.id);
  const p=existing||{...blankPathway()};
  Object.assign(p,{objective:s(d.objective),description:s(d.description||p.description||''),problem:s(d.problem),input:s(d.input),activity:s(d.activity||p.activity||''),output:s(d.output),intermediateOutcome:s(d.intermediateOutcome||p.intermediateOutcome||''),outcome:s(d.outcome),impact:s(d.impact),assumptions:s(d.assumptions),risks:s(d.risks),evidence:s(d.evidence)});
  // Keep meta.objectives in sync so other views (indicators, assumptions) can reference them
  if(p.objective&&!db.meta.objectives.includes(p.objective))db.meta.objectives.push(p.objective);
  stamp(p);
  if(!existing)db.pathways.push(p);
  persist(db);modal_html='';message='Pathway saved.';render();return;
 }
 if(kind==='indicator'){
  const existing=db.indicators.find(i=>i.id===form.dataset.id);
  const i=existing||{...blankIndicator()};
  Object.assign(i,{pathwayId:d.pathwayId||'',level:d.level||'outcome',name:s(d.name),definition:s(d.definition),baseline:s(d.baseline),target:s(d.target),unit:s(d.unit),source:s(d.source),frequency:s(d.frequency),owner:s(d.owner),verification:s(d.verification),notes:s(d.notes)});
  stamp(i);
  if(!existing)db.indicators.push(i);
  persist(db);modal_html='';message='Indicator saved.';render();return;
 }
 if(kind==='snapshot'){
  const snap={id:uid(),date:d.date||today(),reviewer:s(d.reviewer),summary:s(d.summary),snapshot:{meta:clone(db.meta),pathways:clone(db.pathways),indicators:clone(db.indicators)}};
  db.snapshots.unshift(snap);persist(db);modal_html='';message='Snapshot captured.';render();return;
 }
}

// ---------- Excel ----------
const META_LABELS={organisation:'Organisation',name:'Project name',country:'Country',dates:'Dates',preparedBy:'Prepared by',version:'Version',mission:'Mission',vision:'Vision',values:'Values',impactGoal:'Impact goal',problem:'Problem',description:'Description',notes:'Notes'};
const PATHWAY_HEADERS=['Objective','Description','Problem','Input','Activity','Output','Intermediate outcome','Outcome','Impact','Assumptions','Risks','Evidence','Last edited by','Last edited at'];
const INDICATOR_HEADERS=['Pathway objective','Level','Indicator','Definition','Baseline','Target','Unit','Data source','Frequency','Owner','Means of verification','Notes','Last edited by','Last edited at'];
const SNAPSHOT_HEADERS=['Date','Reviewer','Summary','Pathway count','Indicator count','Snapshot JSON'];

function buildWorkbook(withData){
 const meta=Object.entries(META_LABELS).map(([k,l])=>[l,withData?(k==='notes'?db.meta[k]:db.meta[k]||''):'']);
 if(withData){
  meta.push(['Objectives',(db.meta.objectives||[]).join(' | ')]);
 }else{
  meta.push(['Objectives','']);
 }
 const pathwayById=id=>db.pathways.find(p=>p.id===id);
 const pathwayRows=withData?db.pathways.map(p=>[p.objective,p.description,p.problem,p.input,p.activity,p.output,p.intermediateOutcome,p.outcome,p.impact,p.assumptions,p.risks,p.evidence,p.lastEditedBy||'',p.lastEditedAt||'']):[];
 const indicatorRows=withData?db.indicators.map(i=>[pathwayById(i.pathwayId)?.objective||'',i.level,i.name,i.definition,i.baseline,i.target,i.unit,i.source,i.frequency,i.owner,i.verification,i.notes,i.lastEditedBy||'',i.lastEditedAt||'']):[];
 const snapshotRows=withData?db.snapshots.map(sn=>[sn.date,sn.reviewer||'',sn.summary||'',(sn.snapshot?.pathways||[]).length,(sn.snapshot?.indicators||[]).length,JSON.stringify(sn.snapshot||{})]):[];
 return buildXlsx([
  readmeSheet([
   'Mission & Method — Theory of Change workbook (Module 2)',
   'This workbook matches the Theory of Change Builder one-to-one.',
   '',
   'How to use',
   '1. Meta — project context and the Mission/Vision/Values from Module 1.',
   '2. Pathways — one row per objective-level pathway from inputs through to impact, with assumptions and risks.',
   '3. Indicators — one row per indicator; link to its pathway by the pathway\'s objective.',
   '4. Review snapshots — captured snapshots of the whole theory at a point in time.',
   '',
   'Round-trip with the tool',
   'Complete this template in Excel, then Import Excel workbook in the tool. Export from the tool later to get an updated copy back. Nothing changes format either way.',
   '',
   'Relationship to Strategic Objectives (Module 1)',
   'Objectives can be brought in from the Strategic Objectives tool with one click (Start tab). They appear as the Objective field on each pathway row.'
  ]),
  metaSheet(meta),
  {name:'Pathways',headerRows:[0],rows:[PATHWAY_HEADERS,...pathwayRows]},
  {name:'Indicators',headerRows:[0],rows:[INDICATOR_HEADERS,...indicatorRows]},
  {name:'Review snapshots',headerRows:[0],rows:[SNAPSHOT_HEADERS,...snapshotRows]},
  schemaSheet('mission-method-theory-of-change',2)
 ]);
}

async function importXlsx(file){
 try{
  const sheets=await parseXlsx(file);
  const metaRows=findSheet(sheets,['Meta']);
  const metaMap={organisation:'Organisation',name:'Project name',country:'Country',dates:'Dates',preparedBy:'Prepared by',version:'Version',mission:'Mission',vision:'Vision',values:'Values',impactGoal:'Impact goal',problem:'Problem',description:'Description',notes:'Notes'};
  const newMeta={...blankMeta(),...metaFromSheet(metaRows,metaMap)};
  // Objectives: look for a row labeled "Objectives" in meta
  if(metaRows){const obj=metaRows.find(r=>String(r[0]||'').trim().toLowerCase()==='objectives');if(obj)newMeta.objectives=String(obj[1]||'').split(/[|\n]/).map(x=>x.trim()).filter(Boolean)}
  const pathwayMap={objective:'Objective',description:'Description',problem:'Problem',input:'Input',activity:'Activity',output:'Output',intermediateOutcome:'Intermediate outcome',outcome:'Outcome',impact:'Impact',assumptions:'Assumptions',risks:'Risks',evidence:'Evidence',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
  const pathways=rowsToObjects(findSheet(sheets,['Pathways']),pathwayMap).map(r=>({...blankPathway(),...r}));
  const indicatorMap={pathwayObjective:'Pathway objective',level:'Level',name:'Indicator',definition:'Definition',baseline:'Baseline',target:'Target',unit:'Unit',source:'Data source',frequency:'Frequency',owner:'Owner',verification:'Means of verification',notes:'Notes',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
  const indicators=rowsToObjects(findSheet(sheets,['Indicators']),indicatorMap).map(r=>{const pathway=pathways.find(p=>p.objective===r.pathwayObjective);return {...blankIndicator(),pathwayId:pathway?.id||'',level:r.level||'outcome',name:r.name,definition:r.definition,baseline:r.baseline,target:r.target,unit:r.unit,source:r.source,frequency:r.frequency,owner:r.owner,verification:r.verification,notes:r.notes,lastEditedBy:r.lastEditedBy,lastEditedAt:r.lastEditedAt}});
  const snapMap={date:'Date',reviewer:'Reviewer',summary:'Summary',json:'Snapshot JSON'};
  const snapshots=rowsToObjects(findSheet(sheets,['Review snapshots']),snapMap).map(sn=>{let snap={};try{snap=JSON.parse(String(sn.json||'{}'))}catch{}return {id:uid(),date:sn.date,reviewer:sn.reviewer,summary:sn.summary,snapshot:snap}});
  const preview=`Import preview:\n• ${pathways.length} pathways\n• ${indicators.length} indicators\n• ${snapshots.length} snapshots\n\nReplace current data?`;
  if(!confirm(preview))return;
  db={version:2,meta:newMeta,pathways:pathways.length?pathways:[blankPathway()],indicators,snapshots};
  persist(db);tab='Start';message='Workbook imported.';render();
 }catch(e){message='Import failed: '+e.message;render()}
}

async function importJson(file){
 try{
  const obj=JSON.parse(await file.text());
  let next;
  if(obj.version===2&&Array.isArray(obj.pathways))next=obj;
  else if(obj.meta&&(Array.isArray(obj.tocRows)||Array.isArray(obj.nodes)))next=migrateV1(obj);
  else throw new Error('Not a Theory of Change backup');
  if(!confirm('Replace current data?'))return;
  db={...blank(),...next};persist(db);tab='Start';message='Backup imported.';render();
 }catch(e){message='Import failed: '+e.message;render()}
}

function exportCsv(){
 const rows=[['Section','Pathway','Field','Value']];
 db.pathways.forEach((p,i)=>{
  const pname=p.objective||`Pathway ${i+1}`;
  ['objective','description','problem','input','activity','output','intermediateOutcome','outcome','impact','assumptions','risks','evidence'].forEach(k=>{if(p[k])rows.push(['pathway',pname,k,p[k]])});
 });
 db.indicators.forEach(ind=>{
  const pathway=db.pathways.find(p=>p.id===ind.pathwayId);
  const pname=pathway?.objective||'—';
  ['name','definition','baseline','target','unit','source','frequency','owner','verification'].forEach(k=>{if(ind[k])rows.push(['indicator',pname,k,ind[k]])});
 });
 download('Mission-and-Method-theory-of-change.csv',csv(rows),'text/csv;charset=utf-8');
}

// ---------- Example ----------
function exampleDb(){
 const d=blank();
 d.meta={...blankMeta(),organisation:'Example organisation',name:'Community livelihoods programme',country:'Example country',dates:`${currentYear}–${currentYear+2}`,impactGoal:'Young adults in Riverside have more secure livelihoods.',problem:'Young adults in Riverside struggle to find secure work and employers use narrow recruitment practices.',description:'If we test barriers with young adults, adapt materials, train mentors and run accessible sessions, young adults will demonstrate job-relevant skills and employers will adopt accessible recruitment — contributing to more secure livelihoods.',objectives:['ESO1 · Young adults secure sustainable livelihoods']};
 d.pathways=[{...blankPathway(),objective:'ESO1 · Young adults secure sustainable livelihoods',description:'Prepare young adults for work and encourage inclusive recruitment.',problem:'Young adults in Riverside struggle to find secure work.',input:'Coordinator time, accessible venue, transport support and trained mentors.',activity:'Test barriers with young adults; adapt materials; recruit mentors; deliver sessions.',output:'Accessible job-readiness sessions and employer engagement delivered.',intermediateOutcome:'Young adults demonstrate job-relevant skills and employers use accessible recruitment.',outcome:'Graduates enter suitable work or sustain viable income activities.',impact:'Young adults in Riverside have more secure livelihoods.',assumptions:'Local employers participate in accessible recruitment.\nYoung adults can attend regularly without childcare or transport barriers.',risks:'Employer engagement is slower than expected.\nFunding ends before cohorts reach the labour market.',evidence:'Prior pilot data; employer survey results.'}];
 d.indicators=[{...blankIndicator(),pathwayId:d.pathways[0].id,level:'outcome',name:'Percentage of graduates in paid work 6 months after programme',baseline:'38%',target:'60%',unit:'%',source:'Follow-up survey',frequency:'Six-monthly',owner:'MEAL officer'},{...blankIndicator(),pathwayId:d.pathways[0].id,level:'output',name:'Number of job-readiness sessions delivered',baseline:'0',target:'24',unit:'sessions',source:'Session register',frequency:'Monthly',owner:'Programme lead'}];
 return d;
}

render();
})();
