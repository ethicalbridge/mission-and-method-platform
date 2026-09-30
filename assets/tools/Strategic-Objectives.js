(()=>{'use strict';
const root=document.querySelector('#app'),KEY='mission-method-strategic-objectives-v2',OLD_KEY='mission-method-strategic-objectives-v1',EDITOR_KEY='mm.editor.name';
const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const now=()=>new Date().toISOString();
const currentYear=new Date().getFullYear();
const fmtDate=iso=>{if(!iso)return '';const d=new Date(iso);return isNaN(d)?iso:d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})};
const monthsSince=iso=>{if(!iso)return null;const d=new Date(iso);if(isNaN(d))return null;return Math.round((Date.now()-d.getTime())/(1000*60*60*24*30.4375))};

const blankIndicator=()=>({name:'',baseline:'',target:'',dataSource:'',frequency:''});
const blankObjective=group=>({id:uid(),group,code:'',title:'',rationale:'',desiredChange:'',owner:'',start:String(currentYear),end:String(currentYear+4),status:'Planned',progress:0,indicator:blankIndicator(),actions:[],reviewNote:'',lastReview:'',nextDecision:'',lastEditedBy:'',lastEditedAt:''});
const blank=()=>({version:2,meta:{organisation:'',planName:'Strategic objectives',from:currentYear,to:currentYear+4,mission:'',vision:'',values:'',preparedBy:'',reviewDate:'',notes:''},objectives:[],reviews:[]});

const examples=[
 ['External','ESO1','Build a global hub for ethical organisations','Increase the visibility of local organisations and enable meaningful international connections.','A searchable digital space where values-aligned organisations find each other and collaborate.','Develop a searchable digital space','Publish transparent organisation profiles','Support values-aligned partnerships'],
 ['External','ESO2','Promote ethical opportunities across borders','Improve access to volunteering, internships and purpose-led work.','More people finding safe, purpose-led opportunities across borders.','Publish relevant opportunities','Help people assess fit and safeguards','Connect applicants with responsible organisations'],
 ['External','ESO3','Diversify donors and partners','Strengthen relationships and reduce dependence on a single source of support.','A resilient mix of aligned funders and partners.','Map aligned supporters','Cultivate partnerships','Review the funding mix'],
 ['Internal','ISO1','Strengthen organisational structure','Build clear roles, governance and dependable operational systems.','Roles, governance and operations that make delivery reliable.','Clarify roles and decisions','Improve MEAL and financial procedures','Coordinate organisational activities'],
 ['Internal','ISO2','Foster a culture of ethics and learning','Embed ethical practice, reflection and accountability in daily work.','A team where ethical practice and learning are visible in daily work.','Maintain guidance and training','Hold reflective reviews','Create safe feedback routes'],
 ['Internal','ISO3','Enhance team diversity and inclusion','Make recruitment and working practices more inclusive.','Recruitment and workplace practices that reflect inclusive values.','Broaden recruitment','Improve accessibility','Provide learning and mentoring'],
 ['Internal','ISO4','Prioritise staff wellbeing and development','Support a healthy, motivated and growing team.','Staff who are supported, growing and well.','Agree workloads and support','Offer learning','Hold feedback and development conversations'],
 ['Internal','ISO5','Invest in digital innovation and communication','Use digital tools and communication to extend reach and collaboration.','Digital practice that extends reach and strengthens collaboration.','Improve platforms','Support remote teamwork','Train staff on useful digital practices']
];
function makeExample(){const d=blank();d.meta.organisation='Example organisation';d.meta.planName='Five-year strategic objectives';d.meta.from=currentYear;d.meta.to=currentYear+4;d.objectives=examples.map(([group,code,title,rationale,desiredChange,...actions])=>({...blankObjective(group),code,title,rationale,desiredChange,actions:actions.map(a=>({id:uid(),action:a,owner:'',due:'',status:'Planned'})),start:String(d.meta.from),end:String(d.meta.to)}));return d}

function migrateV1(v1){
 const out=blank();
 out.meta={...out.meta,...(v1.meta||{})};
 (v1.objectives||[]).forEach(o=>{
  out.objectives.push({
   id:o.id||uid(),group:o.group,code:o.code||'',title:o.title||'',rationale:o.rationale||'',desiredChange:o.desiredChange||'',
   owner:o.owner||'',start:String(o.start||''),end:String(o.end||''),status:o.status||'Planned',progress:Number(o.progress||0),
   indicator:{name:o.indicator||'',baseline:'',target:'',dataSource:o.evidence||'',frequency:''},
   actions:(o.actions||[]).map(a=>({id:uid(),action:typeof a==='string'?a:(a.action||''),owner:'',due:'',status:'Planned'})),
   reviewNote:o.reviewNote||'',lastReview:o.lastReview||'',nextDecision:o.nextDecision||'',
   lastEditedBy:'',lastEditedAt:''
  });
 });
 return out;
}

let db;
try{const v2=localStorage.getItem(KEY);if(v2){db=JSON.parse(v2)}else{const v1=localStorage.getItem(OLD_KEY);if(v1){db=migrateV1(JSON.parse(v1));localStorage.setItem(KEY,JSON.stringify(db))}}}catch{}
if(!db||db.version!==2||!db.meta||!Array.isArray(db.objectives)||!Array.isArray(db.reviews))db=blank();
db.objectives.forEach(o=>{if(!o.indicator||typeof o.indicator!=='object')o.indicator=blankIndicator();if(!Array.isArray(o.actions))o.actions=[]});

let tab='Start',modal='',message='';
const groups=['External','Internal'];
const statuses=['Planned','In progress','On track','At risk','Completed','Paused'];
const actionStatuses=['Planned','In progress','Done','Blocked'];

function editorName(){try{return localStorage.getItem(EDITOR_KEY)||''}catch{return ''}}
function askEditor(){let name=editorName();if(!name){name=(window.prompt('Your name (recorded on each edit). Saved in this browser only.','')||'').trim();if(name)try{localStorage.setItem(EDITOR_KEY,name)}catch{}}return name}
function stampEdit(o){const name=askEditor();o.lastEditedBy=name||'Unknown';o.lastEditedAt=now()}

const opts=(items,current)=>items.map(([v,label])=>`<option value="${esc(v)}" ${String(v)===String(current)?'selected':''}>${esc(label)}</option>`).join('');
const field=(label,name,value='',type='text',more='')=>`<label class="field">${label}<input name="${name}" type="${type}" value="${esc(value)}" ${more}></label>`;
const area=(label,name,value='',help='')=>`<label class="field full">${label}${help?tip(help):''}<textarea name="${name}">${esc(value)}</textarea></label>`;
const select=(label,name,items,current)=>`<label class="field">${label}<select name="${name}">${opts(items,current)}</select></label>`;
const tip=text=>`<span class="tip"><button type="button" aria-label="More information">i</button><span>${esc(text)}</span></span>`;
const pill=s=>`<span class="pill ${s==='At risk'?'warn':s==='Planned'||s==='Paused'?'dim':''}">${esc(s)}</span>`;
const count=g=>db.objectives.filter(x=>x.group===g).length;
const pct=()=>db.objectives.length?Math.round(db.objectives.reduce((n,x)=>n+Number(x.progress||0),0)/db.objectives.length):0;
function nextCode(group,items){const prefix=group==='External'?'ESO':'ISO';const used=new Set(items.filter(x=>x.group===group).map(x=>x.code));let i=1;while(used.has(prefix+i))i++;return prefix+i}
function save(note='Saved in this browser.'){try{localStorage.setItem(KEY,JSON.stringify(db))}catch{}message=note;render()}

function heading(){return `<header class="top"><a class="brand" href="../../software.html">Mission <em>&</em> Method</a><a href="../../software.html">← Impact Tools</a></header><div class="hero"><span class="eyebrow">Strategy & impact · Strategic objectives</span><h1>Strategic objectives</h1><p>Define what your organisation wants to change externally, what it needs to strengthen internally, and the actions that connect each objective to a reviewable plan.</p><div class="toolbar"><a class="button secondary" href="https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=1" target="_blank" rel="noopener noreferrer">Review Module One →</a><button class="button secondary" data-action="download-template">Download blank Excel template</button><button class="button secondary" data-action="export-json">Backup JSON</button></div></div>`}

function nav(){return `<nav class="nav" aria-label="Strategic objectives sections">${['Start','External objectives','Internal objectives','Review','Export'].map(x=>`<button type="button" data-tab="${x}" class="${tab===x?'active':''}" ${tab===x?'aria-current="page"':''}>${x}</button>`).join('')}</nav>`}

function dashCard(label,value,caption,cls=''){return `<div class="card ${cls}"><span class="eyebrow">${esc(label)}</span><div class="metric">${esc(value)}</div><p>${esc(caption)}</p></div>`}

function dashboard(){
 const objs=db.objectives;
 const atRisk=objs.filter(o=>o.status==='At risk').length;
 const missingOwner=objs.filter(o=>!o.owner).length;
 const missingActions=objs.filter(o=>!o.actions.length).length;
 const missingIndicator=objs.filter(o=>!o.indicator?.name).length;
 const lastReview=db.reviews[0]?.date||db.meta.reviewDate||'';
 const months=monthsSince(lastReview);
 const monthsLabel=months===null?'—':(months+' mo');
 const balance=count('External')+'/'+count('Internal');
 return `<section class="panel"><span class="eyebrow">Overview</span><h2>Progress at a glance</h2><div class="grid four"><div class="card"><span class="eyebrow">Objectives</span><div class="metric">${objs.length}</div><p>${count('External')} external · ${count('Internal')} internal</p></div><div class="card"><span class="eyebrow">Average progress</span><div class="metric">${pct()}%</div><div class="bar"><i style="width:${pct()}%"></i></div></div><div class="card ${atRisk?'warn':''}"><span class="eyebrow">At risk</span><div class="metric">${atRisk}</div><p>Objectives needing intervention</p></div><div class="card"><span class="eyebrow">Since last review</span><div class="metric">${monthsLabel}</div><p>${lastReview?fmtDate(lastReview):'No review recorded yet'}</p></div></div><div class="grid three" style="margin-top:12px"><div class="card ${missingOwner?'warn':''}"><span class="eyebrow">Missing owner</span><div class="metric">${missingOwner}</div></div><div class="card ${missingActions?'warn':''}"><span class="eyebrow">No actions defined</span><div class="metric">${missingActions}</div></div><div class="card ${missingIndicator?'warn':''}"><span class="eyebrow">No indicator</span><div class="metric">${missingIndicator}</div></div></div></section>`;
}

function start(){const m=db.meta;return `${dashboard()}<div class="notice">Distinguish external objectives (ESO — outward change) from internal objectives (ISO — organisational foundations). Fill both; the example uses three ESO and five ISO. Data stays in this browser — download the Excel or JSON regularly.</div><section class="panel"><h2>Plan context</h2><p>Paste the mission, vision and values already developed in Module One. They guide the objectives; this tool does not rebuild them.</p><form data-form="meta" class="form">${field('Organisation name','organisation',m.organisation)}${field('Plan title','planName',m.planName)}${field('From year','from',m.from,'number','min="2000" max="2200"')}${field('To year','to',m.to,'number','min="2000" max="2200"')}${area('Mission','mission',m.mission)}${area('Vision','vision',m.vision)}${area('Values','values',m.values,'List the values that should shape choices and the way objectives are delivered.')}${field('Prepared by','preparedBy',m.preparedBy)}${field('Next strategy review','reviewDate',m.reviewDate,'date')}${area('Context or planning notes','notes',m.notes)}<div class="actions"><button class="button" type="submit">Save plan context</button></div></form></section><section class="panel"><h2>Get started</h2><div class="actions"><button class="button" data-action="add" data-group="External">Add external objective</button><button class="button" data-action="add" data-group="Internal">Add internal objective</button><button class="button secondary" data-action="load-example">Load eight-objective example</button><label class="button secondary">Import Excel workbook<input type="file" id="xlsx-import" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden></label><label class="button secondary">Import JSON<input id="import" type="file" accept=".json,application/json" hidden></label></div></section>`}

function objCard(o){const ind=o.indicator||{};const actions=o.actions||[];return `<article class="panel"><div class="rowhead"><div><span class="eyebrow">${esc(o.code)} · ${esc(o.group)} objective</span><h3>${esc(o.title||'Untitled objective')}</h3>${o.lastEditedBy?`<p class="tiny">Last edited by <b>${esc(o.lastEditedBy)}</b> · ${esc(fmtDate(o.lastEditedAt))}</p>`:''}</div><div class="actions">${pill(o.status)}<button class="button small secondary" data-action="edit" data-id="${o.id}">Edit</button></div></div><p>${esc(o.rationale||'Explain why this objective matters.')}</p>${o.desiredChange?`<p><b>Intended change:</b> ${esc(o.desiredChange)}</p>`:''}<p class="tiny"><b>Owner:</b> ${esc(o.owner||'Not assigned')} · <b>Timeframe:</b> ${esc(o.start||'—')}–${esc(o.end||'—')} · <b>Progress:</b> ${esc(o.progress)}%</p><div class="bar"><i style="width:${Math.min(100,Math.max(0,Number(o.progress)||0))}%"></i></div><details><summary>Indicator, actions and latest review</summary><p><b>Indicator:</b> ${esc(ind.name||'Not defined')}${ind.baseline||ind.target?` · Baseline <b>${esc(ind.baseline||'—')}</b> → Target <b>${esc(ind.target||'—')}</b>`:''}${ind.dataSource?` · Source: ${esc(ind.dataSource)}`:''}${ind.frequency?` · ${esc(ind.frequency)}`:''}</p><p><b>Actions (${actions.length})</b></p><ol>${actions.map(a=>`<li>${esc(a.action)}${a.owner?` — <b>${esc(a.owner)}</b>`:''}${a.due?` (due ${esc(a.due)})`:''}${a.status&&a.status!=='Planned'?` · ${esc(a.status)}`:''}</li>`).join('')||'<li>No actions yet</li>'}</ol><p><b>Latest review:</b> ${esc(o.reviewNote||'No review recorded')} ${o.lastReview?`(${esc(fmtDate(o.lastReview))})`:''}</p><p><b>Next decision:</b> ${esc(o.nextDecision||'Not set')}</p></details></article>`}

function groupView(group){const items=db.objectives.filter(x=>x.group===group);const external=group==='External';return `<div class="rowhead"><div><span class="eyebrow">${external?'ESO · outward change':'ISO · organisational foundations'}</span><h2>${group} strategic objectives ${tip(external?'External objectives describe the contribution your organisation intends to make beyond itself: services, opportunities, relationships or community outcomes.':'Internal objectives describe what the organisation needs to strengthen to deliver its mission: governance, systems, ethics, people, finance or communication.')}</h2><p>${external?'What should change for people, partners or the wider world?':'What must the organisation strengthen to deliver reliably and ethically?'}</p></div><button class="button" data-action="add" data-group="${group}">Add ${group.toLowerCase()} objective</button></div>${items.length?items.map(objCard).join(''):`<div class="empty">No ${group.toLowerCase()} objectives yet. Add your first ${external?'ESO':'ISO'} using the button above.</div>`}`}

function reviewView(){
 const due=db.objectives.filter(x=>x.status==='At risk'||x.status==='Paused'),unowned=db.objectives.filter(x=>!x.owner),noActions=db.objectives.filter(x=>!x.actions?.length);
 const snapshots=[...db.reviews].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 return `<span class="eyebrow">Strategy review</span><h2>Review the full objective set</h2><p>Check balance between outward aims and the internal capabilities needed to deliver them. Update progress and decisions in each objective, then capture a review snapshot to keep strategic memory.</p><div class="grid three"><div class="card"><span class="eyebrow">External / internal</span><div class="metric">${count('External')} / ${count('Internal')}</div></div><div class="card"><span class="eyebrow">At risk or paused</span><div class="metric">${due.length}</div></div><div class="card"><span class="eyebrow">Missing owner / actions</span><div class="metric">${unowned.length} / ${noActions.length}</div></div></div><section class="panel" style="margin-top:16px"><div class="rowhead"><div><h3>Review snapshots</h3><p>Save the current state before a big change; compare snapshots at your next review.</p></div><button class="button" data-action="new-review">Capture review snapshot</button></div>${snapshots.length?`<div class="tablewrap"><table><thead><tr><th>Date</th><th>Reviewer</th><th>Objectives</th><th>Summary</th><th></th></tr></thead><tbody>${snapshots.map(r=>`<tr><td>${esc(fmtDate(r.date))}</td><td>${esc(r.reviewer||'—')}</td><td>${(r.snapshot?.objectives||[]).length}</td><td>${esc(r.summary||'—')}</td><td><button class="link" data-action="delete-review" data-id="${r.id}">Delete</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No snapshots yet. Capture your first at your next strategy review.</div>'}</section><section class="panel"><h3>Objective table</h3><div class="tablewrap"><table><thead><tr><th>Code</th><th>Type</th><th>Objective</th><th>Owner</th><th>Years</th><th>Status</th><th>Progress</th><th>Next decision</th></tr></thead><tbody>${db.objectives.map(o=>`<tr><td>${esc(o.code)}</td><td>${esc(o.group)}</td><td><button class="link" data-action="edit" data-id="${o.id}">${esc(o.title)}</button></td><td>${esc(o.owner||'—')}</td><td>${esc(o.start||'—')}–${esc(o.end||'—')}</td><td>${pill(o.status)}</td><td>${esc(o.progress)}%</td><td>${esc(o.nextDecision||'—')}</td></tr>`).join('')||'<tr><td colspan="8">Add objectives to start the review.</td></tr>'}</tbody></table></div></section>`
}

function exportView(){return `<span class="eyebrow">Learn → build → complete → export → use</span><h2>Export your strategic objectives</h2><p>Preview the plan below, then choose a format. Excel matches the Module 1 workbook exactly — you can re-import an Excel later without losing anything. CSV is for further analysis. Print saves a PDF.</p><div class="actions no-print" style="margin-bottom:15px"><button class="button" data-action="xlsx">Download Excel workbook</button><button class="button secondary" data-action="csv">Download CSV</button><button class="button secondary" data-action="print">Print / save PDF</button><button class="button secondary" data-action="export-json">Backup JSON</button></div><section class="panel"><span class="eyebrow">Mission & Method · Strategic objectives</span><h2>${esc(db.meta.planName||'Strategic objectives')}</h2><p>${esc(db.meta.organisation||'Organisation not entered')} · ${esc(db.meta.from)}–${esc(db.meta.to)} · Prepared by ${esc(db.meta.preparedBy||'—')}</p>${db.meta.mission?`<p><b>Mission:</b> ${esc(db.meta.mission)}</p>`:''}${db.meta.vision?`<p><b>Vision:</b> ${esc(db.meta.vision)}</p>`:''}${db.meta.values?`<p><b>Values:</b> ${esc(db.meta.values)}</p>`:''}</section>${groups.map(g=>`<section class="panel"><h3>${g} objectives</h3>${db.objectives.filter(o=>o.group===g).map(o=>`<div class="item"><b>${esc(o.code)} · ${esc(o.title)}</b><p>${esc(o.rationale)}</p>${o.desiredChange?`<p><b>Intended change:</b> ${esc(o.desiredChange)}</p>`:''}<p><b>Actions:</b></p><ol>${(o.actions||[]).map(a=>`<li>${esc(a.action)}${a.owner?` — ${esc(a.owner)}`:''}${a.due?` (${esc(a.due)})`:''}</li>`).join('')||'<li>—</li>'}</ol><p><b>Owner:</b> ${esc(o.owner||'—')} · <b>Years:</b> ${esc(o.start||'—')}–${esc(o.end||'—')} · <b>Status:</b> ${esc(o.status)} · <b>Progress:</b> ${esc(o.progress)}%</p><p><b>Indicator:</b> ${esc(o.indicator?.name||'—')} · Baseline ${esc(o.indicator?.baseline||'—')} → Target ${esc(o.indicator?.target||'—')} · Source ${esc(o.indicator?.dataSource||'—')} · ${esc(o.indicator?.frequency||'—')}</p><p><b>Review:</b> ${esc(o.reviewNote||'—')} · <b>Next decision:</b> ${esc(o.nextDecision||'—')}</p></div>`).join('')||'<p>No objectives entered.</p>'}</section>`).join('')}`}

function actionRow(a,idx){return `<div class="action-row" data-idx="${idx}"><input name="action_text_${idx}" value="${esc(a.action)}" placeholder="What will be done"><input name="action_owner_${idx}" value="${esc(a.owner||'')}" placeholder="Owner"><input name="action_due_${idx}" value="${esc(a.due||'')}" type="date"><select name="action_status_${idx}">${opts(actionStatuses.map(s=>[s,s]),a.status||'Planned')}</select><button type="button" class="button small danger" data-action="remove-action" data-idx="${idx}">Remove</button></div>`}

function dialog(o,group){const g=o?.group||group,edit=!!o;const ind=o?.indicator||blankIndicator();const actions=o?.actions||[];const body=`<form data-form="objective" data-id="${esc(o?.id||'')}" class="form">${select('Objective type','group',groups.map(x=>[x,x]),g)}${field('Code','code',o?.code||nextCode(g,db.objectives),'text','required')}${field('Title','title',o?.title||'','text','required')}${area('Why this objective matters','rationale',o?.rationale||'','Explain the need, opportunity or problem behind it.')}${area('Intended change','desiredChange',o?.desiredChange||'','Describe what should be different by the end of the plan, not merely an activity.')}<div class="field full"><b>Indicator ${tip('One measurable sign that this objective is moving. Baseline is where you start; target is where you want to be by the end year.')}</b><div class="indicator-grid">${field('Indicator name','ind_name',ind.name)}${field('Baseline','ind_baseline',ind.baseline)}${field('Target','ind_target',ind.target)}${field('Data source','ind_source',ind.dataSource)}${field('Frequency','ind_freq',ind.frequency)}</div></div>${field('Accountable owner','owner',o?.owner||'')}${field('Start year','start',o?.start||db.meta.from,'number','min="2000" max="2200"')}${field('End year','end',o?.end||db.meta.to,'number','min="2000" max="2200"')}${select('Status','status',statuses.map(x=>[x,x]),o?.status||'Planned')}${field('Progress (%)','progress',o?.progress||0,'number','min="0" max="100"')}<div class="field full"><b>Actions ${tip('Each action is a commitment your team will deliver. Keep them short — detailed delivery lives in your Gantt or work plan.')}</b><div id="actions-list">${actions.map((a,i)=>actionRow(a,i)).join('')||'<p class="muted">No actions yet.</p>'}</div><button type="button" class="button small secondary" data-action="add-action" style="margin-top:8px">+ Add action</button></div>${field('Last reviewed','lastReview',o?.lastReview||'','date')}${area('Review notes','reviewNote',o?.reviewNote||'')}${area('Next decision or adjustment','nextDecision',o?.nextDecision||'')}<div class="actions"><button class="button" type="submit">Save objective</button>${edit?`<button class="button danger" type="button" data-action="delete" data-id="${o.id}">Delete objective</button>`:''}<button class="button secondary" type="button" data-action="close">Cancel</button></div></form>`;return `<div class="modal" role="dialog" aria-modal="true" aria-label="${edit?'Edit':'Add'} ${esc(g.toLowerCase())} objective"><div class="modalbox"><h2>${edit?'Edit':'Add'} ${esc(g.toLowerCase())} objective</h2>${body}</div></div>`}

function reviewDialog(){return `<div class="modal" role="dialog" aria-modal="true" aria-label="Capture review snapshot"><div class="modalbox"><h2>Capture review snapshot</h2><p class="muted">Save the current state of every objective with a summary of what was decided. Future reviews will show this as a comparison point.</p><form data-form="review" class="form">${field('Review date','date',new Date().toISOString().slice(0,10),'date','required')}${field('Reviewer','reviewer',editorName()||'')}${area('Summary of this review','summary','','What was discussed, agreed and what changes follow. Keep it short — one paragraph.')}<div class="actions"><button class="button" type="submit">Capture snapshot</button><button class="button secondary" type="button" data-action="close">Cancel</button></div></form></div></div>`}

function render(){const content=tab==='Start'?start():tab==='External objectives'?groupView('External'):tab==='Internal objectives'?groupView('Internal'):tab==='Review'?reviewView():exportView();root.innerHTML=`<div class="shell">${heading()}${nav()}<main id="main">${message?`<div class="notice" role="status">${esc(message)}</div>`:''}${content}</main><footer class="tiny">Saved in this browser only · Download the Excel or JSON regularly · Mission & Method</footer></div>${modal}`;bind()}

const data=form=>Object.fromEntries(new FormData(form));
function submit(form){
 const kind=form.dataset.form,d=data(form);
 if(kind==='meta'){if(Number(d.to)<Number(d.from)){message='End year must be no earlier than start year.';render();return}db.meta={...db.meta,...d,from:Number(d.from),to:Number(d.to)};save('Plan context saved.');return}
 if(kind==='objective'){
  const existing=db.objectives.find(x=>x.id===form.dataset.id),code=String(d.code||'').trim().toUpperCase();
  if(!new RegExp(`^${d.group==='External'?'ESO':'ISO'}[0-9]+$`).test(code)){message=`Use a ${d.group==='External'?'ESO':'ISO'} number such as ${d.group==='External'?'ESO1':'ISO1'}.`;render();return}
  if(db.objectives.some(x=>x.id!==existing?.id&&x.code.toUpperCase()===code)){message='This objective code is already in use.';render();return}
  if(Number(d.end)<Number(d.start)){message='End year must be no earlier than start year.';render();return}
  // Collect actions from the form
  const actions=[];
  Object.keys(d).forEach(k=>{const m=k.match(/^action_text_(\d+)$/);if(m){const i=m[1];const text=String(d[k]||'').trim();if(!text)return;actions.push({id:uid(),action:text,owner:String(d['action_owner_'+i]||'').trim(),due:String(d['action_due_'+i]||''),status:String(d['action_status_'+i]||'Planned')})}});
  const o=existing||{...blankObjective(d.group),id:uid()};
  Object.assign(o,{
   group:d.group,code,title:String(d.title||'').trim(),
   rationale:String(d.rationale||'').trim(),desiredChange:String(d.desiredChange||'').trim(),
   owner:String(d.owner||'').trim(),start:String(d.start||''),end:String(d.end||''),
   status:d.status,progress:Math.max(0,Math.min(100,Number(d.progress)||0)),
   indicator:{name:String(d.ind_name||'').trim(),baseline:String(d.ind_baseline||'').trim(),target:String(d.ind_target||'').trim(),dataSource:String(d.ind_source||'').trim(),frequency:String(d.ind_freq||'').trim()},
   actions,
   lastReview:String(d.lastReview||''),reviewNote:String(d.reviewNote||'').trim(),nextDecision:String(d.nextDecision||'').trim()
  });
  stampEdit(o);
  if(!existing)db.objectives.push(o);
  modal='';save(`${code} saved.`);return;
 }
 if(kind==='review'){
  const snap={id:uid(),date:d.date||new Date().toISOString().slice(0,10),reviewer:String(d.reviewer||'').trim(),summary:String(d.summary||'').trim(),snapshot:{meta:JSON.parse(JSON.stringify(db.meta)),objectives:JSON.parse(JSON.stringify(db.objectives))}};
  db.reviews.unshift(snap);
  modal='';save('Review snapshot captured.');return;
 }
}

function download(name,body,type){const url=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
const csvRows=rows=>'﻿'+rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');

// Excel schema — same shape used for both export from the tool and the Module 1 template
const OBJ_HEADERS=['Code','Title','Why it matters','Intended change','Owner','Start year','End year','Status','Progress %','Indicator name','Baseline','Target','Data source','Frequency','Last review','Review note','Next decision','Last edited by','Last edited at'];
const ACTION_HEADERS=['Objective code','Action','Owner','Due','Status'];
const REVIEW_HEADERS=['Date','Reviewer','Summary','Objective count','Snapshot JSON'];
const objRow=o=>[o.code,o.title,o.rationale,o.desiredChange,o.owner,o.start,o.end,o.status,o.progress,o.indicator?.name||'',o.indicator?.baseline||'',o.indicator?.target||'',o.indicator?.dataSource||'',o.indicator?.frequency||'',o.lastReview,o.reviewNote,o.nextDecision,o.lastEditedBy,o.lastEditedAt];

function metaSheet(){
 const m=db.meta;
 return {name:'Meta',headerRows:[0],rows:[
  ['Field','Value'],
  ['Organisation',m.organisation],
  ['Plan title',m.planName],
  ['From year',m.from],
  ['To year',m.to],
  ['Mission',m.mission],
  ['Vision',m.vision],
  ['Values',m.values],
  ['Prepared by',m.preparedBy],
  ['Next strategy review',m.reviewDate],
  ['Context notes',m.notes]
 ]};
}
function readmeSheet(){return {name:'Read me',headerRows:[0],rows:[
 ['Mission & Method — Strategic Objectives workbook'],
 ['This workbook holds your organisation\'s strategic plan. It matches the Strategic Objectives software tool one-to-one.'],
 [''],
 ['How to use'],
 ['1. Fill in the Meta sheet with your organisation and plan context.'],
 ['2. Add external objectives (ESO) and internal objectives (ISO) on their sheets — one row per objective.'],
 ['3. Add each objective\'s actions on the Actions sheet, using its Code (ESO1, ISO2, etc).'],
 ['4. Capture strategy reviews on the Reviews sheet.'],
 [''],
 ['Codes'],
 ['External objectives use codes ESO1, ESO2, … Internal objectives use ISO1, ISO2, …'],
 [''],
 ['Round-trip with the tool'],
 ['Download this template, complete it in Excel, then Import Excel workbook in the Strategic Objectives tool. Export the tool later to get an updated Excel back. Data does not change format either way.'],
 [''],
 ['Sheets'],
 ['Read me — instructions'],
 ['Meta — plan context'],
 ['External objectives — one row per ESO'],
 ['Internal objectives — one row per ISO'],
 ['Actions — one row per action, linked to its objective code'],
 ['Reviews — one row per review snapshot'],
 ['_schema — do not edit; used by the tool to detect the workbook format']
]};}

function schemaSheet(){return {name:'_schema',rows:[['name','value'],['workbook','mission-method-strategic-objectives'],['version','2']]};}

function buildXlsx(includeData){
 const external=includeData?db.objectives.filter(o=>o.group==='External'):[];
 const internal=includeData?db.objectives.filter(o=>o.group==='Internal'):[];
 const allActions=includeData?db.objectives.flatMap(o=>(o.actions||[]).map(a=>[o.code,a.action,a.owner||'',a.due||'',a.status||'Planned'])):[];
 const reviewRows=includeData?db.reviews.map(r=>[r.date,r.reviewer||'',r.summary||'',(r.snapshot?.objectives||[]).length,JSON.stringify(r.snapshot||{})]):[];
 const sheets=[
  readmeSheet(),
  metaSheet(),
  {name:'External objectives',headerRows:[0],rows:[OBJ_HEADERS,...external.map(objRow)]},
  {name:'Internal objectives',headerRows:[0],rows:[OBJ_HEADERS,...internal.map(objRow)]},
  {name:'Actions',headerRows:[0],rows:[ACTION_HEADERS,...allActions]},
  {name:'Reviews',headerRows:[0],rows:[REVIEW_HEADERS,...reviewRows]},
  schemaSheet()
 ];
 return window.MEALXLSX.build(sheets);
}

function exportXLSX(){
 if(!window.MEALXLSX?.build){message='Excel export is unavailable in this browser. Download CSV instead.';render();return}
 download('Mission-and-Method-strategic-objectives.xlsx',buildXlsx(true),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}
function downloadTemplate(){
 if(!window.MEALXLSX?.build){message='Excel is unavailable in this browser.';render();return}
 download('Mission-and-Method-strategic-objectives-TEMPLATE.xlsx',buildXlsx(false),'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
 message='Template downloaded. Complete it in Excel, then use Import Excel workbook to bring it back into the tool.';render();
}
function exportCSV(){
 const rows=[['Kind','Code','Type','Title','Rationale','Intended change','Owner','Start','End','Status','Progress','Indicator','Baseline','Target','Data source','Frequency','Last review','Review note','Next decision','Last edited by','Last edited at']];
 db.objectives.forEach(o=>rows.push(['objective',o.code,o.group,o.title,o.rationale,o.desiredChange,o.owner,o.start,o.end,o.status,o.progress,o.indicator?.name||'',o.indicator?.baseline||'',o.indicator?.target||'',o.indicator?.dataSource||'',o.indicator?.frequency||'',o.lastReview,o.reviewNote,o.nextDecision,o.lastEditedBy,o.lastEditedAt]));
 db.objectives.forEach(o=>(o.actions||[]).forEach(a=>rows.push(['action',o.code,o.group,a.action,'','',a.owner||'','','','',a.status||'','','','','','',a.due||'','','','',''])));
 download('Mission-and-Method-strategic-objectives.csv',csvRows(rows),'text/csv;charset=utf-8');
}

// ---------- XLSX import ----------
// Minimal ZIP reader supporting store (0) and deflate-raw (8) via CompressionStreams API.
async function inflate(bytes){
 try{const ds=new DecompressionStream('deflate-raw');const stream=new Blob([bytes]).stream().pipeThrough(ds);const buf=await new Response(stream).arrayBuffer();return new Uint8Array(buf)}catch(e){throw new Error('This browser cannot read compressed Excel files. Upgrade or use a modern browser.')}
}
async function readZip(buf){
 const dv=new DataView(buf.buffer,buf.byteOffset,buf.byteLength);
 const files=new Map();
 // Read End of Central Directory to find central directory offset
 let eocd=-1;for(let i=buf.length-22;i>=Math.max(0,buf.length-65557);i--){if(dv.getUint32(i,true)===0x06054b50){eocd=i;break}}
 if(eocd<0)throw new Error('Not a valid Excel file (missing ZIP end-of-directory).');
 const cdOffset=dv.getUint32(eocd+16,true),cdSize=dv.getUint32(eocd+12,true);
 let p=cdOffset;
 while(p<cdOffset+cdSize){
  if(dv.getUint32(p,true)!==0x02014b50)break;
  const method=dv.getUint16(p+10,true),compSize=dv.getUint32(p+20,true),uncompSize=dv.getUint32(p+24,true);
  const nameLen=dv.getUint16(p+28,true),extraLen=dv.getUint16(p+30,true),commentLen=dv.getUint16(p+32,true);
  const localHeader=dv.getUint32(p+42,true);
  const name=new TextDecoder().decode(buf.slice(p+46,p+46+nameLen));
  // Read local header to get actual data offset
  const lNameLen=dv.getUint16(localHeader+26,true),lExtraLen=dv.getUint16(localHeader+28,true);
  const dataStart=localHeader+30+lNameLen+lExtraLen;
  const compData=buf.slice(dataStart,dataStart+compSize);
  const bytes=method===0?compData:await inflate(compData);
  files.set(name,new TextDecoder().decode(bytes));
  p+=46+nameLen+extraLen+commentLen;
 }
 return files;
}

function parseSheetXml(xml){
 // Returns array of arrays (cell values as strings/numbers)
 const doc=new DOMParser().parseFromString(xml,'text/xml');
 const err=doc.querySelector('parsererror');
 if(err)throw new Error('Malformed sheet XML');
 const rows=[];
 doc.querySelectorAll('row').forEach(r=>{
  const rowIdx=Number(r.getAttribute('r'))-1;
  const cells=[];
  r.querySelectorAll('c').forEach(c=>{
   const ref=c.getAttribute('r')||'';const colLetter=(ref.match(/^[A-Z]+/)||[''])[0];
   let col=0;for(const ch of colLetter)col=col*26+(ch.charCodeAt(0)-64);col--;
   const t=c.getAttribute('t');let val='';
   if(t==='inlineStr'){val=c.querySelector('is > t')?.textContent||''}
   else if(t==='s'){/* shared strings not used by our writer, but handle for safety */val=c.querySelector('v')?.textContent||''}
   else{const v=c.querySelector('v')?.textContent||'';val=t==='n'||(!t&&v.match(/^-?\d/))?Number(v):v}
   cells[col]=val;
  });
  rows[rowIdx]=cells;
 });
 return rows.map(r=>r||[]);
}

// If workbook uses sharedStrings, resolve them
function resolveSharedStrings(sheets,sharedXml){
 if(!sharedXml)return;
 const doc=new DOMParser().parseFromString(sharedXml,'text/xml');
 const strings=[...doc.querySelectorAll('si')].map(si=>{
  // Handle both <t>text</t> and rich text with multiple <r><t>...</t></r>
  const tNodes=si.querySelectorAll('t');
  return [...tNodes].map(t=>t.textContent).join('');
 });
 sheets.forEach(({rows})=>{
  rows.forEach(row=>{
   row.forEach((v,i)=>{
    if(typeof v==='object'&&v&&v._shared){row[i]=strings[v.idx]||''}
   });
  });
 });
}

// Rewritten sheet parser that recognizes 's' type using shared strings
function parseSheetXmlWithSS(xml,sharedStrings){
 const doc=new DOMParser().parseFromString(xml,'text/xml');
 const rows=[];
 doc.querySelectorAll('row').forEach(r=>{
  const rowIdx=Number(r.getAttribute('r'))-1;
  const cells=[];
  r.querySelectorAll('c').forEach(c=>{
   const ref=c.getAttribute('r')||'';const colLetter=(ref.match(/^[A-Z]+/)||[''])[0];
   let col=0;for(const ch of colLetter)col=col*26+(ch.charCodeAt(0)-64);col--;
   const t=c.getAttribute('t');let val='';
   if(t==='inlineStr')val=c.querySelector('is > t')?.textContent||'';
   else if(t==='s'){const idx=Number(c.querySelector('v')?.textContent||-1);val=sharedStrings[idx]||''}
   else{const v=c.querySelector('v')?.textContent||'';val=(t==='n'||(!t&&v.match(/^-?\d/)))?Number(v):v}
   cells[col]=val;
  });
  rows[rowIdx]=cells;
 });
 return rows.map(r=>r||[]);
}

async function parseXlsx(file){
 const buf=new Uint8Array(await file.arrayBuffer());
 const files=await readZip(buf);
 const workbookXml=files.get('xl/workbook.xml');
 if(!workbookXml)throw new Error('Not an Excel workbook.');
 const wbDoc=new DOMParser().parseFromString(workbookXml,'text/xml');
 const sheetTags=[...wbDoc.querySelectorAll('sheet')];
 const relsXml=files.get('xl/_rels/workbook.xml.rels');
 const relsDoc=relsXml?new DOMParser().parseFromString(relsXml,'text/xml'):null;
 const relMap=new Map();
 relsDoc?.querySelectorAll('Relationship').forEach(r=>relMap.set(r.getAttribute('Id'),r.getAttribute('Target')));
 // Shared strings if present
 const sharedXml=files.get('xl/sharedStrings.xml');
 let sharedStrings=[];
 if(sharedXml){const doc=new DOMParser().parseFromString(sharedXml,'text/xml');sharedStrings=[...doc.querySelectorAll('si')].map(si=>[...si.querySelectorAll('t')].map(t=>t.textContent).join(''))}
 const sheets={};
 sheetTags.forEach((s,i)=>{
  const name=s.getAttribute('name');
  const rid=s.getAttribute('r:id')||s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');
  const target=relMap.get(rid)||`worksheets/sheet${i+1}.xml`;
  const path=target.startsWith('/')?target.slice(1):'xl/'+target;
  const xml=files.get(path);
  if(!xml)return;
  sheets[name]=parseSheetXmlWithSS(xml,sharedStrings);
 });
 return sheets;
}

function findSheet(sheets,names){for(const n of names){for(const key of Object.keys(sheets)){if(key.toLowerCase().trim()===n.toLowerCase())return sheets[key]}}return null}

function importSheetsIntoDb(sheets){
 // Meta
 const metaRows=findSheet(sheets,['Meta','meta']);
 const newMeta={...blank().meta};
 if(metaRows){
  metaRows.slice(1).forEach(r=>{
   const key=String(r[0]||'').trim().toLowerCase();const val=r[1];
   if(key==='organisation')newMeta.organisation=String(val||'');
   else if(key==='plan title')newMeta.planName=String(val||'');
   else if(key==='from year')newMeta.from=Number(val)||currentYear;
   else if(key==='to year')newMeta.to=Number(val)||currentYear+4;
   else if(key==='mission')newMeta.mission=String(val||'');
   else if(key==='vision')newMeta.vision=String(val||'');
   else if(key==='values')newMeta.values=String(val||'');
   else if(key==='prepared by')newMeta.preparedBy=String(val||'');
   else if(key==='next strategy review')newMeta.reviewDate=String(val||'');
   else if(key==='context notes')newMeta.notes=String(val||'');
  });
 }
 // Objectives
 const readObj=(rows,group)=>{
  if(!rows||rows.length<2)return [];
  const H=rows[0].map(x=>String(x||'').trim().toLowerCase());
  const col=name=>H.indexOf(name.toLowerCase());
  const cols={code:col('Code'),title:col('Title'),rationale:col('Why it matters'),desiredChange:col('Intended change'),owner:col('Owner'),start:col('Start year'),end:col('End year'),status:col('Status'),progress:col('Progress %'),indName:col('Indicator name'),indBase:col('Baseline'),indTarget:col('Target'),indSource:col('Data source'),indFreq:col('Frequency'),lastReview:col('Last review'),reviewNote:col('Review note'),nextDecision:col('Next decision'),editedBy:col('Last edited by'),editedAt:col('Last edited at')};
  const out=[];
  for(let i=1;i<rows.length;i++){
   const r=rows[i];if(!r||!String(r[cols.code]||'').trim())continue;
   out.push({
    id:uid(),group,
    code:String(r[cols.code]||'').trim(),
    title:String(r[cols.title]||'').trim(),
    rationale:String(r[cols.rationale]||'').trim(),
    desiredChange:String(r[cols.desiredChange]||'').trim(),
    owner:String(r[cols.owner]||'').trim(),
    start:String(r[cols.start]||''),end:String(r[cols.end]||''),
    status:String(r[cols.status]||'Planned'),
    progress:Math.max(0,Math.min(100,Number(r[cols.progress])||0)),
    indicator:{name:String(r[cols.indName]||''),baseline:String(r[cols.indBase]||''),target:String(r[cols.indTarget]||''),dataSource:String(r[cols.indSource]||''),frequency:String(r[cols.indFreq]||'')},
    actions:[],
    lastReview:String(r[cols.lastReview]||''),reviewNote:String(r[cols.reviewNote]||''),nextDecision:String(r[cols.nextDecision]||''),
    lastEditedBy:String(r[cols.editedBy]||''),lastEditedAt:String(r[cols.editedAt]||'')
   });
  }
  return out;
 };
 const external=readObj(findSheet(sheets,['External objectives','External']),'External');
 const internal=readObj(findSheet(sheets,['Internal objectives','Internal']),'Internal');
 const allObjs=[...external,...internal];
 // Actions
 const actionsRows=findSheet(sheets,['Actions']);
 if(actionsRows&&actionsRows.length>1){
  const H=actionsRows[0].map(x=>String(x||'').trim().toLowerCase());
  const iCode=H.indexOf('objective code'),iAction=H.indexOf('action'),iOwner=H.indexOf('owner'),iDue=H.indexOf('due'),iStatus=H.indexOf('status');
  for(let i=1;i<actionsRows.length;i++){
   const r=actionsRows[i];if(!r)continue;
   const code=String(r[iCode]||'').trim();if(!code)continue;
   const target=allObjs.find(o=>o.code===code);if(!target)continue;
   target.actions.push({id:uid(),action:String(r[iAction]||'').trim(),owner:String(r[iOwner]||'').trim(),due:String(r[iDue]||''),status:String(r[iStatus]||'Planned')});
  }
 }
 // Reviews
 const reviews=[];
 const revRows=findSheet(sheets,['Reviews']);
 if(revRows&&revRows.length>1){
  const H=revRows[0].map(x=>String(x||'').trim().toLowerCase());
  const iDate=H.indexOf('date'),iRev=H.indexOf('reviewer'),iSum=H.indexOf('summary'),iSnap=H.indexOf('snapshot json');
  for(let i=1;i<revRows.length;i++){
   const r=revRows[i];if(!r||!String(r[iDate]||'').trim())continue;
   let snap={};try{snap=JSON.parse(String(r[iSnap]||'{}'))}catch{}
   reviews.push({id:uid(),date:String(r[iDate]||''),reviewer:String(r[iRev]||''),summary:String(r[iSum]||''),snapshot:snap});
  }
 }
 return {meta:newMeta,objectives:allObjs,reviews};
}

async function importXLSX(file){
 try{
  const sheets=await parseXlsx(file);
  const {meta,objectives,reviews}=importSheetsIntoDb(sheets);
  const summary=`Import preview:\n• ${objectives.length} objectives (${objectives.filter(o=>o.group==='External').length} ESO, ${objectives.filter(o=>o.group==='Internal').length} ISO)\n• ${objectives.reduce((n,o)=>n+o.actions.length,0)} actions\n• ${reviews.length} review snapshots\n\nThis will replace the current data in this browser. Continue?`;
  if(!confirm(summary))return;
  db={version:2,meta,objectives,reviews};
  tab='Start';save('Excel workbook imported.');
 }catch(e){message='Import failed: '+e.message;render()}
}

async function importJSON(file){
 try{
  const obj=JSON.parse(await file.text());
  let next;
  if(obj.version===2){next=obj}
  else if(obj.version===1){next=migrateV1(obj)}
  else throw new Error('Not a valid strategic objectives backup');
  if(!confirm('Replace the current browser data with this backup?'))return;
  db={version:2,meta:{...blank().meta,...next.meta},objectives:next.objectives||[],reviews:next.reviews||[]};
  tab='Start';save('Backup imported.');
 }catch(e){message='Import failed: '+e.message;render()}
}

function action(el){
 const a=el.dataset.action;
 if(a==='close'){modal='';render();return}
 if(a==='add'){modal=dialog(null,el.dataset.group);render();return}
 if(a==='edit'){const o=db.objectives.find(x=>x.id===el.dataset.id);if(o){modal=dialog(o,o.group);render()}return}
 if(a==='delete'){if(!confirm('Delete this strategic objective? Export a copy first if you need to retain it.'))return;db.objectives=db.objectives.filter(x=>x.id!==el.dataset.id);modal='';save('Objective deleted.');return}
 if(a==='load-example'){if(db.objectives.length&&!confirm('Replace the current objectives with the example? Download a backup first if you need them.'))return;const ex=makeExample();db.objectives=ex.objectives;if(!db.meta.organisation)db.meta=ex.meta;save('Example loaded. Edit every objective for your organisation.');return}
 if(a==='add-action'){const list=document.getElementById('actions-list');if(!list)return;if(list.querySelector('.muted'))list.innerHTML='';const idx=list.querySelectorAll('.action-row').length;list.insertAdjacentHTML('beforeend',actionRow({action:'',owner:'',due:'',status:'Planned'},idx));return}
 if(a==='remove-action'){el.closest('.action-row')?.remove();return}
 if(a==='new-review'){modal=reviewDialog();render();return}
 if(a==='delete-review'){if(!confirm('Delete this review snapshot? This cannot be undone.'))return;db.reviews=db.reviews.filter(r=>r.id!==el.dataset.id);save('Review deleted.');return}
 if(a==='download-template'){downloadTemplate();return}
 if(a==='export-json'){download('Mission-and-Method-strategic-objectives-backup.json',JSON.stringify({...db,exportedAt:new Date().toISOString()},null,2),'application/json');return}
 if(a==='csv'){exportCSV();return}
 if(a==='xlsx'){exportXLSX();return}
 if(a==='print'){window.print();return}
}

function bind(){
 root.querySelectorAll('[data-tab]').forEach(x=>x.addEventListener('click',()=>{tab=x.dataset.tab;message='';render()}));
 root.querySelectorAll('[data-action]').forEach(x=>x.addEventListener('click',()=>action(x)));
 root.querySelectorAll('[data-form]').forEach(x=>x.addEventListener('submit',e=>{e.preventDefault();submit(e.currentTarget)}));
 root.querySelector('#import')?.addEventListener('change',e=>{if(e.target.files[0])importJSON(e.target.files[0])});
 root.querySelector('#xlsx-import')?.addEventListener('change',e=>{if(e.target.files[0])importXLSX(e.target.files[0])});
}

render();
})();
