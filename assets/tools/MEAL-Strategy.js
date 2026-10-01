/* MEAL Strategy — Step 4 of the Impact Suite.
   Monitoring, Evaluation, Accountability & Learning. Imports KPIs from the Strategy KPIs
   tool and outcome/impact indicators from the Theory of Change, tracks planned vs actual
   per quarter, and records review decisions. All data stays in this browser.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,clone,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s,STATUSES}=S;

const KEY='mission-method-meal-strategy-v3',LEGACY=['mm.meal-strategy.v2','mm.meal-strategy.v1'];
const SO_KEY='mission-method-strategic-objectives-v2',SK_KEY='mission-method-strategy-kpis-v2',TOC_KEY='mission-method-theory-of-change-v2';
const TABS=['Start','Reviews & learning','Quality check','Export'];
const SOURCES=['kpi','toc','manual'];
const DIRECTIONS=['Increase','Decrease','Maintain'];
const RSTATUS=['Open','In progress','Done'];

const blankIndicator=()=>({id:uid(),source:'manual',sourceId:'',code:'',objectiveCode:'',name:'',definition:'',unit:'',baseline:'',target:'',dataSource:'',manager:'',frequency:'Quarterly',verification:'',disaggregation:'',direction:'Increase',q1Planned:'',q1Actual:'',q2Planned:'',q2Actual:'',q3Planned:'',q3Actual:'',q4Planned:'',q4Actual:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankReview=()=>({id:uid(),date:today(),indicatorCode:'',objectiveCode:'',finding:'',feedback:'',learning:'',decision:'',action:'',owner:'',due:'',status:'Open',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',project:'',year:currentYear,from:currentYear,to:currentYear+2,preparedBy:'',location:'',notes:''});
const blank=()=>({version:3,meta:blankMeta(),indicators:[],reviews:[]});

function migrateV2(v){const out=blank();try{out.meta={...out.meta,...(v.meta||{})};const objCode=new Map();(v.objectives||[]).forEach((o,i)=>objCode.set(o.id,o.code||'OBJ'+(i+1)));(v.indicators||[]).forEach((i,n)=>{const code='MEAL'+(n+1);const monthToQ=m=>{const arr=Array.isArray(m)?m:[];const q=[0,0,0,0];for(let k=0;k<12;k++){const v=Number(arr[k]);if(!isNaN(v)&&arr[k]!=='')q[Math.floor(k/3)]+=v}return q};const p=monthToQ(i.planned),a=monthToQ(i.actual);out.indicators.push({...blankIndicator(),code,objectiveCode:objCode.get(i.objectiveId)||'',name:i.indicator||'',definition:i.definition||'',unit:i.unit||'',baseline:i.baseline??'',target:i.target??'',dataSource:i.source||'',manager:i.manager||'',frequency:i.timing||'Quarterly',verification:i.verification||'',disaggregation:i.disaggregation||'',q1Planned:p[0]||'',q2Planned:p[1]||'',q3Planned:p[2]||'',q4Planned:p[3]||'',q1Actual:a[0]||'',q2Actual:a[1]||'',q3Actual:a[2]||'',q4Actual:a[3]||'',notes:i.notes||''})});(v.reviews||[]).forEach(r=>out.reviews.push({...blankReview(),date:r.date||today(),objectiveCode:objCode.get(r.objectiveId)||'',finding:r.finding||'',feedback:r.feedback||'',learning:r.learning||'',decision:r.decision||'',action:r.action||'',owner:r.owner||'',due:r.due||'',status:RSTATUS.includes(r.status)?r.status:'Open'}))}catch(e){console.warn('MEAL migrate failed',e)}return out}

const storage=S.store({key:KEY,version:3,blank,legacy:LEGACY.map(k=>({key:k,migrate:migrateV2})),normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.meal-cleanup-v3',blank)||d;if(!Array.isArray(d.indicators))d.indicators=[];if(!Array.isArray(d.reviews))d.reviews=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>{storage.save(d);};

// ---------- Cross-tool readers ----------
const readStore=k=>{try{const raw=localStorage.getItem(k);if(!raw)return null;const o=JSON.parse(raw);return o&&typeof o==='object'?o:null}catch{return null}};
const readSO=()=>readStore(SO_KEY);
const readSK=()=>readStore(SK_KEY);
const readToC=()=>readStore(TOC_KEY);
const soObjCount=()=>(readSO()?.objectives||[]).length;
const skKpiCount=()=>(readSK()?.kpis||[]).length;
const tocIndicatorCount=()=>(readToC()?.indicators||[]).length;

// ---------- Views ----------
function workspaceView(){
 const m=db.meta;
 const so=readSO(),sk=readSK(),toc=readToC();
 const soObjs=(so?.objectives||[]).map(o=>({code:o.code,title:o.title,full:`${o.code} · ${o.title}`}));
 const haveKPIs=skKpiCount(),haveToCIndicators=tocIndicatorCount(),haveSOObjs=soObjCount();
 const importedKpiCount=db.indicators.filter(i=>i.source==='kpi').length;
 const importedTocCount=db.indicators.filter(i=>i.source==='toc').length;
 return `<section class="work-box" id="meal-workspace">
  <div class="work-head">
   <span class="work-badge">Your workspace</span>
   <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
   <span class="work-status" id="work-status"></span>
  </div>
  <p class="work-hint">Edit anywhere — everything saves automatically. Pull your KPIs and ToC indicators in, then record actuals quarter by quarter.</p>
  <div class="work-meta">
   <label class="work-field"><span>Project / programme</span><input data-field="project" value="${esc(m.project)}" placeholder="e.g. 2026 annual plan"></label>
   <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
   <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
   <label class="work-field"><span>Country or location</span><input data-field="location" value="${esc(m.location)}" placeholder="e.g. Kenya"></label>
   <label class="work-field full"><span>Strategy notes</span><textarea data-field="notes" placeholder="Context for this MEAL plan — audience, review rhythm, data-protection notes.">${esc(m.notes)}</textarea></label>
  </div>
  <div class="work-sect-head">
   <h3>Indicators — the backbone of your MEAL plan</h3>
   <p class="tiny">Pull quarterly KPIs from Strategy KPIs and outcome/impact indicators from Theory of Change, then add any MEAL-only indicators you need. Each row tracks planned vs actual per quarter; difference is calculated automatically.</p>
  </div>
  <div class="work-imports">
   <button class="button ${haveKPIs?'':'secondary'}" data-action="import-kpis" ${haveKPIs?'':'disabled'}>${haveKPIs?`↙ Import ${haveKPIs} KPI${haveKPIs===1?'':'s'} from Strategy KPIs${importedKpiCount?` (${importedKpiCount} already here)`:''}`:'↙ No KPIs found — open Strategy KPIs first'}</button>
   <button class="button ${haveToCIndicators?'secondary':'secondary'}" data-action="import-toc" ${haveToCIndicators?'':'disabled'}>${haveToCIndicators?`↙ Import ${haveToCIndicators} indicator${haveToCIndicators===1?'':'s'} from Theory of Change${importedTocCount?` (${importedTocCount} already here)`:''}`:'↙ No ToC indicators found'}</button>
   <button class="button secondary" data-action="add-indicator-row">+ Add MEAL-only indicator</button>
  </div>
  <div class="work-indicators">${db.indicators.length?db.indicators.map((ind,i)=>indicatorRowHtml(ind,i,soObjs)).join(''):'<p class="example-empty">No indicators yet. Click a button above to pull KPIs from Strategy KPIs, pathway indicators from the Theory of Change, or add a MEAL-only indicator manually.</p>'}</div>
  <details class="work-extra"><summary>About MEAL · Monitoring · Evaluation · Accountability · Learning</summary>
   <ul style="font-size:13px;line-height:1.5;color:var(--muted);padding-left:18px;margin:8px 0 0">
    <li><b>Monitoring</b> — routine data collection against indicators (planned vs actual columns below).</li>
    <li><b>Evaluation</b> — reasoning about whether change happened (Review &amp; learning tab).</li>
    <li><b>Accountability</b> — making results visible to those your work affects (Review tab records feedback).</li>
    <li><b>Learning</b> — turning each review into a decision for the next cycle.</li>
   </ul>
  </details>
 </section>`;
}

function indicatorRowHtml(ind,i,soObjs){
 const srcLabel=ind.source==='kpi'?'From KPIs':ind.source==='toc'?'From ToC':'MEAL-only';
 const srcClass=ind.source==='kpi'?'src-kpi':ind.source==='toc'?'src-toc':'src-manual';
 const diff=(q,p=null,a=null)=>{const P=p??Number(ind['q'+q+'Planned']),A=a??Number(ind['q'+q+'Actual']);if(isNaN(P)||isNaN(A)||ind['q'+q+'Planned']===''||ind['q'+q+'Actual']==='')return '—';const d=+(A-P).toFixed(2);const cls=d===0?'zero':d>0?'positive':'negative';return `<span class="diff-cell ${cls}">${d>0?'+':''}${d}</span>`};
 const options=soObjs.map(o=>[o.code,o.full]);
 const isLocked=ind.source!=='manual';
 return `<article class="meal-row" data-row-id="${esc(ind.id)}">
  <div class="meal-row-head">
   <span class="meal-src ${srcClass}">${esc(srcLabel)}</span>
   <strong class="meal-code">${esc(ind.code||'—')}</strong>
   <span class="meal-objective">${isLocked?'<span class="eyebrow">Objective</span> '+esc(ind.objectiveCode||'—'):`<label class="inline-field"><span>Objective</span>${options.length?`<select data-field="objectiveCode" data-rid="${esc(ind.id)}"><option value="">—</option>${options.map(([v,l])=>`<option value="${esc(v)}" ${v===ind.objectiveCode?'selected':''}>${esc(l)}</option>`).join('')}</select>`:`<input data-field="objectiveCode" data-rid="${esc(ind.id)}" value="${esc(ind.objectiveCode)}" placeholder="ESO1">`}</label>`}</span>
   <div class="row-actions"><button class="link" data-action="edit-indicator-full" data-id="${esc(ind.id)}">Full edit</button><button class="link danger" data-action="delete-indicator-row" data-id="${esc(ind.id)}">Delete</button></div>
  </div>
  <div class="meal-row-main">
   <label class="meal-field flex2"><span>Indicator name</span><textarea data-field="name" data-rid="${esc(ind.id)}" placeholder="What is measured" ${isLocked?'readonly':''}>${esc(ind.name)}</textarea></label>
   <label class="meal-field"><span>Unit</span><input data-field="unit" data-rid="${esc(ind.id)}" value="${esc(ind.unit)}" placeholder="e.g. people"></label>
   <label class="meal-field"><span>Baseline</span><input data-field="baseline" data-rid="${esc(ind.id)}" value="${esc(ind.baseline)}" placeholder="0"></label>
   <label class="meal-field"><span>Annual target</span><input data-field="target" data-rid="${esc(ind.id)}" value="${esc(ind.target)}" placeholder="100"></label>
  </div>
  <div class="meal-matrix">
   <div class="meal-mrow meal-mhead"><div></div><div>Q1</div><div>Q2</div><div>Q3</div><div>Q4</div></div>
   <div class="meal-mrow"><div class="meal-mlabel">Planned</div>${[1,2,3,4].map(q=>`<div><input data-field="q${q}Planned" data-rid="${esc(ind.id)}" type="number" step="any" value="${esc(ind['q'+q+'Planned'])}" placeholder="—" aria-label="Q${q} planned"></div>`).join('')}</div>
   <div class="meal-mrow"><div class="meal-mlabel">Actual</div>${[1,2,3,4].map(q=>`<div><input data-field="q${q}Actual" data-rid="${esc(ind.id)}" type="number" step="any" value="${esc(ind['q'+q+'Actual'])}" placeholder="—" aria-label="Q${q} actual"></div>`).join('')}</div>
   <div class="meal-mrow meal-mdiff"><div class="meal-mlabel">Difference</div>${[1,2,3,4].map(q=>`<div class="meal-diff-cell">${diff(q)}</div>`).join('')}</div>
  </div>
  <div class="meal-row-meta">
   <label class="meal-field"><span>Data source</span><input data-field="dataSource" data-rid="${esc(ind.id)}" value="${esc(ind.dataSource)}" placeholder="System, survey or register"></label>
   <label class="meal-field"><span>Data manager</span><input data-field="manager" data-rid="${esc(ind.id)}" value="${esc(ind.manager)}" placeholder="Who collects it"></label>
   <label class="meal-field"><span>Verification</span><input data-field="verification" data-rid="${esc(ind.id)}" value="${esc(ind.verification)}" placeholder="Where a reviewer verifies"></label>
   <label class="meal-field"><span>Disaggregation</span><input data-field="disaggregation" data-rid="${esc(ind.id)}" value="${esc(ind.disaggregation)}" placeholder="Groups to report separately"></label>
  </div>
 </article>`;
}

function reviewsView(){
 const rows=db.reviews.map(r=>`<tr><td>${esc(fmtDate(r.date))}</td><td>${esc(r.objectiveCode||'—')}${r.indicatorCode?' · '+esc(r.indicatorCode):''}</td><td><b>${esc(r.finding||'—')}</b>${r.feedback?`<br><small>Feedback: ${esc(r.feedback)}</small>`:''}</td><td>${esc(r.learning||'—')}</td><td>${esc(r.decision||'—')}${r.action?`<br><small>Next: ${esc(r.action)}</small>`:''}</td><td>${esc(r.owner||'—')}<br><small>${esc(fmtDate(r.due)||'')}</small></td><td>${pill(r.status||'Open')}</td><td><div class="row-actions"><button class="link" data-action="edit-review" data-id="${esc(r.id)}">Edit</button><button class="link danger" data-action="delete-review" data-id="${esc(r.id)}">Delete</button></div></td></tr>`);
 return `<div class="rowhead section-head"><div><h2>Review &amp; learning</h2><p>A MEAL plan is useful when evidence leads to a decision. Each review records what the data shows, what was heard from stakeholders, what you learned, and the decision that follows.</p></div><button class="button" data-action="new-review">+ Record a review</button></div>${table(['Date','Objective / indicator','Finding','Learning','Decision &amp; next action','Owner &amp; due','Status',''],rows,'No reviews yet. Record one at the end of a quarter when planned-vs-actual data is available.')}`;
}

function qualityView(){
 const inds=db.indicators;
 const issues=[];
 if(!db.meta.organisation)issues.push('Add the organisation name so the strategy can be identified.');
 if(!inds.length)issues.push('No indicators yet — pull KPIs from Strategy KPIs or add a MEAL-only indicator.');
 inds.forEach(i=>{
  const lbl=i.code||i.name||'Unnamed indicator';
  if(!i.name)issues.push(`${lbl}: write a measurable indicator name.`);
  if(!i.unit)issues.push(`${lbl}: name the unit of measure.`);
  if(!i.dataSource)issues.push(`${lbl}: name the data source.`);
  if(!i.manager)issues.push(`${lbl}: assign a data manager.`);
  if(!i.target)issues.push(`${lbl}: set an annual target.`);
  const planned=[1,2,3,4].some(q=>i['q'+q+'Planned']!=='');
  if(!planned)issues.push(`${lbl}: enter at least one quarterly planned value.`);
 });
 const actualsCount=inds.reduce((n,i)=>n+[1,2,3,4].filter(q=>i['q'+q+'Actual']!=='').length,0);
 return `<div class="rowhead section-head"><div><h2>Quality check</h2><p>Review completeness before sharing or exporting. These suggestions do not block export — a draft is fine while details are being agreed.</p></div></div>
  <div class="grid four">${card('Indicators',inds.length,'Total being tracked')}${card('From KPIs',inds.filter(i=>i.source==='kpi').length,'Imported from Strategy KPIs')}${card('From ToC',inds.filter(i=>i.source==='toc').length,'Imported from Theory of Change')}${card('Actuals entered',actualsCount,'Quarterly cells with a value')}</div>
  <section class="panel"><h3>${issues.length?'Suggestions to resolve ('+issues.length+')':'Ready for review'}</h3>${issues.length?`<ul class="checks">${issues.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p>The core structure is complete. Check evidence quality and the meaning of each result before sharing.</p>'}</section>`;
}

function exportView(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, year, prepared by</li><li>Indicators — every indicator with baseline, target, quarterly planned/actual and calculated difference</li><li>Reviews — every review with findings, learning and decisions</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

// ---------- Review modal ----------
function reviewModal(r){
 const isNew=!r;r=r||blankReview();
 const indOptions=db.indicators.map(i=>[i.code,`${i.code} · ${i.name||'untitled'}`]);
 const objOptions=[...new Set(db.indicators.map(i=>i.objectiveCode).filter(Boolean))].map(c=>[c,c]);
 return modal(isNew?'Record a review':'Edit review',`<form data-form="review" data-id="${esc(r.id||'')}" class="form">
  ${field('Review date','date',r.date,'date','required')}
  ${objOptions.length?select('Objective (optional)','objectiveCode',objOptions,r.objectiveCode,'','Not linked'):field('Objective (optional)','objectiveCode',r.objectiveCode)}
  ${indOptions.length?select('Indicator (optional)','indicatorCode',indOptions,r.indicatorCode,'The specific indicator this review concerns.','Not linked'):field('Indicator (optional)','indicatorCode',r.indicatorCode)}
  ${area('What does the evidence show?','finding',r.finding,'Describe the result or gap and reference the source.')}
  ${area('Community or stakeholder feedback','feedback',r.feedback,'Themes heard — avoid naming individuals.')}
  ${area('What did we learn?','learning',r.learning,'Explanation, uncertainty or lesson for the next cycle.')}
  ${area('Decision or adjustment','decision',r.decision,'What was decided after reviewing the evidence.')}
  ${field('Next action','action',r.action,'text','','What happens next.')}
  ${field('Action owner','owner',r.owner)}
  ${field('Due date','due',r.due,'date')}
  ${select('Status','status',RSTATUS,r.status||'Open')}
  ${formEnd(isNew?'Save review':'Save review',{deleteId:isNew?'':r.id,deleteLabel:'Delete review'})}
 </form>`);
}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id;
 if(a==='close'){dlg='';render();return}
 if(a==='add-indicator-row'){
  const i={...blankIndicator(),code:'MEAL'+(db.indicators.filter(x=>x.source==='manual').length+1),source:'manual'};
  db.indicators.push(i);persist(db);render();return;
 }
 if(a==='delete-indicator-row'){
  if(!confirm('Delete this indicator? Cannot be undone.'))return;
  db.indicators=db.indicators.filter(i=>i.id!==id);persist(db);render();return;
 }
 if(a==='import-kpis'){importKPIs();return}
 if(a==='import-toc'){importToC();return}
 if(a==='new-review'){dlg=reviewModal();render();return}
 if(a==='edit-review'){const r=db.reviews.find(x=>x.id===id);if(r){dlg=reviewModal(r);render()}return}
 if(a==='delete-review'){if(!confirm('Delete this review? Cannot be undone.'))return;db.reviews=db.reviews.filter(r=>r.id!==id);persist(db);message='Review deleted.';render();return}
 if(a==='delete'){
  if(!confirm('Delete this review? Cannot be undone.'))return;
  db.reviews=db.reviews.filter(r=>r.id!==id);
  persist(db);dlg='';message='Review deleted.';render();return;
 }
 if(a==='edit-indicator-full'){alert('Full edit coming shortly — for now, edit any field inline in the workspace.');return}
 if(a==='xlsx'){try{download('Mission-and-Method-MEAL-strategy.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-MEAL-strategy.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-MEAL-strategy-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 if(kind==='review'){
  const existing=db.reviews.find(r=>r.id===form.dataset.id);
  const r=existing||{...blankReview()};
  Object.assign(r,{date:d.date,objectiveCode:d.objectiveCode||'',indicatorCode:d.indicatorCode||'',finding:s(d.finding),feedback:s(d.feedback),learning:s(d.learning),decision:s(d.decision),action:s(d.action),owner:s(d.owner),due:d.due||'',status:d.status||'Open'});
  stamp(r);
  if(!existing)db.reviews.push(r);
  persist(db);dlg='';message='Review saved.';render();return;
 }
}

// ---------- Importers ----------
function importKPIs(){
 const sk=readSK();if(!sk||!sk.kpis?.length){message='No KPIs found in Strategy KPIs. Open that tool first.';render();return}
 const existing=new Set(db.indicators.filter(i=>i.source==='kpi').map(i=>i.sourceId||i.code));
 let added=0,updated=0;
 sk.kpis.forEach(k=>{
  const found=db.indicators.find(i=>i.source==='kpi'&&(i.sourceId===k.id||i.code===k.code));
  const base={source:'kpi',sourceId:k.id,code:k.code||'',objectiveCode:k.objectiveCode||'',name:k.name||'',definition:k.definition||'',unit:k.unit||'',baseline:String(k.baseline||''),target:String(k.target||''),dataSource:k.source||'',manager:k.dataOwner||k.owner||'',frequency:k.frequency||'Quarterly',direction:k.direction||'Increase',q1Planned:String(k.q1||''),q2Planned:String(k.q2||''),q3Planned:String(k.q3||''),q4Planned:String(k.q4||'')};
  if(found){Object.assign(found,base);stamp(found);updated++}
  else{const i={...blankIndicator(),...base};stamp(i);db.indicators.push(i);added++}
 });
 // Also pull dated actuals from sk.results back into actual quarters
 (sk.results||[]).forEach(r=>{
  const i=db.indicators.find(x=>x.source==='kpi'&&x.code===r.kpiCode);if(!i)return;
  const d=new Date(r.date);if(isNaN(d))return;
  const q=Math.floor(d.getMonth()/3)+1;const key='q'+q+'Actual';
  if(i[key]===''||i[key]==null)i[key]=String(r.value);
 });
 persist(db);message=`KPIs imported — ${added} added, ${updated} refreshed, actuals seeded from Strategy KPIs results.`;render();
}

function importToC(){
 const toc=readToC();if(!toc||!toc.indicators?.length){message='No indicators found in the Theory of Change. Open that tool first.';render();return}
 const paths=new Map();(toc.pathways||[]).forEach((p,idx)=>paths.set(p.id,{objective:p.objective||`Pathway ${idx+1}`,idx}));
 let added=0,updated=0;
 toc.indicators.forEach((ind,idx)=>{
  const code='TOC'+(idx+1);
  const found=db.indicators.find(i=>i.source==='toc'&&(i.sourceId===ind.id||i.code===code));
  const pw=paths.get(ind.pathwayId);
  const objCode=(pw?.objective||'').split(' · ')[0]||'';
  const base={source:'toc',sourceId:ind.id,code,objectiveCode:objCode,name:ind.name||'',definition:ind.definition||'',unit:ind.unit||'',baseline:String(ind.baseline||''),target:String(ind.target||''),dataSource:ind.source||'',manager:ind.owner||'',frequency:ind.frequency||'Quarterly',verification:ind.verification||'',notes:ind.notes||''};
  if(found){Object.assign(found,base);stamp(found);updated++}
  else{const i={...blankIndicator(),...base};stamp(i);db.indicators.push(i);added++}
 });
 persist(db);message=`ToC indicators imported — ${added} added, ${updated} refreshed.`;render();
}

// ---------- Excel round-trip ----------
function buildWorkbook(withData){
 const sheets=[
  readmeSheet('MEAL Strategy',[
   'This workbook holds a MEAL strategy exported from the Mission & Method platform.',
   'Indicators are the quarterly tracking rows — planned and actual per quarter, difference calculated.',
   'Review decisions capture what you learned from the data and what you decided to change.',
   'Importing this workbook back to the tool updates every row by code. Changing codes creates new rows.'
  ]),
  metaSheet(db.meta),
  {name:'Indicators',rows:[
   ['Code','Source','Objective','Name','Unit','Baseline','Target','Data source','Data manager','Verification','Frequency','Direction','Q1 planned','Q1 actual','Q1 difference','Q2 planned','Q2 actual','Q2 difference','Q3 planned','Q3 actual','Q3 difference','Q4 planned','Q4 actual','Q4 difference','Notes'],
   ...(withData?db.indicators.map(i=>[i.code,i.source,i.objectiveCode,i.name,i.unit,i.baseline,i.target,i.dataSource,i.manager,i.verification,i.frequency,i.direction,i.q1Planned,i.q1Actual,qDiff(i,1),i.q2Planned,i.q2Actual,qDiff(i,2),i.q3Planned,i.q3Actual,qDiff(i,3),i.q4Planned,i.q4Actual,qDiff(i,4),i.notes]):[])
  ]},
  {name:'Reviews',rows:[
   ['Date','Objective','Indicator','Finding','Feedback','Learning','Decision','Next action','Owner','Due','Status'],
   ...(withData?db.reviews.map(r=>[r.date,r.objectiveCode,r.indicatorCode,r.finding,r.feedback,r.learning,r.decision,r.action,r.owner,r.due,r.status]):[])
  ]},
  schemaSheet({Indicators:'code,source,objectiveCode,name,unit,baseline,target,dataSource,manager,verification,frequency,direction,q1Planned,q1Actual,q1Diff,q2Planned,q2Actual,q2Diff,q3Planned,q3Actual,q3Diff,q4Planned,q4Actual,q4Diff,notes',Reviews:'date,objectiveCode,indicatorCode,finding,feedback,learning,decision,action,owner,due,status'})
 ];
 return buildXlsx(sheets);
}
function qDiff(i,q){const p=Number(i['q'+q+'Planned']),a=Number(i['q'+q+'Actual']);if(isNaN(p)||isNaN(a)||i['q'+q+'Planned']===''||i['q'+q+'Actual']==='')return '';return +(a-p).toFixed(2)}
function downloadCsv(){
 const rows=[['Code','Source','Objective','Name','Unit','Baseline','Target','Q1 planned','Q1 actual','Q2 planned','Q2 actual','Q3 planned','Q3 actual','Q4 planned','Q4 actual'],...db.indicators.map(i=>[i.code,i.source,i.objectiveCode,i.name,i.unit,i.baseline,i.target,i.q1Planned,i.q1Actual,i.q2Planned,i.q2Actual,i.q3Planned,i.q3Actual,i.q4Planned,i.q4Actual])];
 download('Mission-and-Method-MEAL-matrix.csv',csv(rows),'text/csv;charset=utf-8');
}

// ---------- Live editing wiring (same pattern as ToC workspace) ----------
function wireWorkspace(root){
 const box=root.querySelector('#meal-workspace');if(!box)return;
 const status=box.querySelector('#work-status');
 let timer;const setStatus=t=>{if(status)status.textContent=t};
 const schedule=()=>{setStatus('Saving…');clearTimeout(timer);timer=setTimeout(()=>{persist(db);setStatus('✓ Saved');setTimeout(()=>setStatus(''),1500)},400)};
 // Meta inputs (no data-rid, no indicator row)
 box.querySelectorAll('.work-meta [data-field]').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()}));
 // Indicator row fields
 box.querySelectorAll('[data-rid]').forEach(el=>{
  el.addEventListener('input',()=>{
   const rid=el.dataset.rid,f=el.dataset.field;
   const i=db.indicators.find(x=>x.id===rid);if(!i)return;
   i[f]=el.value;stamp(i);schedule();
   // If a quarterly value changed, update that row's difference cell in place
   if(/^q[1-4](Planned|Actual)$/.test(f)){
    const q=f[1];
    const row=el.closest('.meal-row');if(!row)return;
    const diffCells=row.querySelectorAll('.meal-diff-cell');
    const cell=diffCells[Number(q)-1];if(!cell)return;
    const p=Number(i['q'+q+'Planned']),a=Number(i['q'+q+'Actual']);
    if(i['q'+q+'Planned']===''||i['q'+q+'Actual']===''||isNaN(p)||isNaN(a)){cell.innerHTML='—';return}
    const d=+(a-p).toFixed(2),cls=d===0?'zero':d>0?'positive':'negative';
    cell.innerHTML=`<span class="diff-cell ${cls}">${d>0?'+':''}${d}</span>`;
   }
  });
 });
}

// ---------- Render ----------
const app={tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:file=>importXlsxFile(file),importJson:file=>importJsonFile(file)};

async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const indRows=rowsToObjects(findSheet(data,'Indicators'));
  const revRows=rowsToObjects(findSheet(data,'Reviews'));
  const meta=metaFromSheet(findSheet(data,'Meta'));
  if(meta)Object.assign(db.meta,meta);
  if(indRows?.length){
   db.indicators=indRows.map(r=>({...blankIndicator(),code:r.Code||r.code||'',source:(r.Source||r.source||'manual').toLowerCase(),objectiveCode:r.Objective||r.objectiveCode||'',name:r.Name||r.name||'',unit:r.Unit||r.unit||'',baseline:String(r.Baseline||''),target:String(r.Target||''),dataSource:r['Data source']||r.dataSource||'',manager:r['Data manager']||r.manager||'',verification:r.Verification||r.verification||'',frequency:r.Frequency||r.frequency||'Quarterly',direction:r.Direction||r.direction||'Increase',q1Planned:String(r['Q1 planned']||r.q1Planned||''),q1Actual:String(r['Q1 actual']||r.q1Actual||''),q2Planned:String(r['Q2 planned']||r.q2Planned||''),q2Actual:String(r['Q2 actual']||r.q2Actual||''),q3Planned:String(r['Q3 planned']||r.q3Planned||''),q3Actual:String(r['Q3 actual']||r.q3Actual||''),q4Planned:String(r['Q4 planned']||r.q4Planned||''),q4Actual:String(r['Q4 actual']||r.q4Actual||''),notes:r.Notes||r.notes||''}));
  }
  if(revRows?.length){
   db.reviews=revRows.map(r=>({...blankReview(),date:r.Date||r.date||today(),objectiveCode:r.Objective||r.objectiveCode||'',indicatorCode:r.Indicator||r.indicatorCode||'',finding:r.Finding||r.finding||'',feedback:r.Feedback||r.feedback||'',learning:r.Learning||r.learning||'',decision:r.Decision||r.decision||'',action:r['Next action']||r.action||'',owner:r.Owner||r.owner||'',due:r.Due||r.due||'',status:r.Status||r.status||'Open'}));
  }
  persist(db);message='Excel imported.';render();
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){
 try{const d=JSON.parse(await file.text());if(!d||typeof d!=='object'||d.version!==3)throw new Error('Not a MEAL Strategy v3 backup');db=d;persist(db);message='JSON imported.';render()}catch(e){message='JSON import failed: '+e.message;render()}
}

function render(){
 const views={'Start':startView,'Reviews & learning':reviewsView,'Quality check':qualityView,'Export':exportView};
 root.innerHTML=shell({eyebrow:'Delivery & learning · MEAL Strategy',title:'MEAL Strategy',intro:'Monitoring, Evaluation, Accountability and Learning. Pull KPIs from Strategy KPIs, pull indicators from the Theory of Change, track planned vs actual per quarter, and record the decisions that follow each review.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=4',label:'Review Module Four'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,app);
 if(tab==='Start')wireWorkspace(root);
}

function startView(){
 return `${window.MMExample?.renderIntegration?.('meal-strategy')||''}${workspaceView()}`;
}

persist(db);render();
})();
