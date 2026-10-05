/* Donor Mapping — the prospect side of fundraising.
   Donor profiles with alignment-to-ESO scoring (0–3 per objective), pipeline
   stage (Prospect → Qualified → Engaged → Proposing → Decided), and
   decision outcomes. Qualified donors are promoted to Donor Tracking for
   active cultivation. Reads ESOs from Strategic Objectives.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-donor-mapping-v2',LEGACY='mission-method-donor-mapping-v1';
const SO_KEY='mission-method-strategic-objectives-v2',TOC_KEY='mission-method-theory-of-change-v2';
const TABS=['Start','Prospects','Alignment matrix','Export'];
const DTYPES=['Foundation','Government','Bilateral','Corporate','Individual','UN agency','Multilateral','Other'];
const STAGES=['Prospect','Qualified','Engaged','Proposing','Decided','Not fit'];
const SIZES=['Micro (<$10k)','Small ($10k–$100k)','Medium ($100k–$1M)','Large ($1M–$10M)','Very large (>$10M)'];

// ---------- Assessment questionnaire (feeds the go / no-go verdict) ----------
// Five groups. Strategy / Likelihood / Technical / Capacity reward Yes (positive).
// Risk group is inverted — Yes means risk present (negative).
const ASSESS_GROUPS=[
 {id:'strategy',label:'Strategy',polarity:'positive',fields:[
  ['valuesAlignment','Values aligned','Are values and approach aligned?'],
  ['coreWorkSupport','Supports core work','Can the donor support the organisation’s core purpose?'],
  ['requirementsGapFit','Fits funding gap','Would this support an identified funding requirement or gap?'],
  ['innovationFit','Fits new work','Could it support a relevant new area, innovation or opportunity?'],
  ['coreFundingSupport','Supports core funding','Could it support unrestricted or core funding?']
 ]},
 {id:'likelihood',label:'Likelihood of success',polarity:'positive',fields:[
  ['currentPosition','Current position','Is there an existing relationship or route in?'],
  ['wellPositioned','Well positioned','Is the organisation credibly positioned to apply?'],
  ['competitiveLandscape','Competition understood','Is the competitive landscape sufficiently understood?'],
  ['valueForMoney','Value for money','Can a compelling value-for-money case be made?'],
  ['connectedPartners','Connected partners','Are relevant partners or allies connected?']
 ]},
 {id:'technical',label:'Technical',polarity:'positive',fields:[
  ['proposalSummary','Proposal outline','Is there a clear proposal idea or summary?'],
  ['proposalReadiness','Proposal readiness','Can the proposal be developed to the required standard?']
 ]},
 {id:'capacity',label:'Capacity',polarity:'positive',fields:[
  ['timetableStrength','Timetable works','Can the deadline and timetable realistically be met?'],
  ['deliveryCapacity','Delivery capacity','Is there enough capacity to deliver a funded project?'],
  ['staffingCapacity','Staffing capacity','Are the right people available to lead and support it?']
 ]},
 {id:'risk',label:'Risk',polarity:'negative',fields:[
  ['donorReputationalRisk','Donor reputation risk','Could the donor’s reputation create a concern?'],
  ['orgReputationalRisk','Organisation reputation risk','Could the work create reputational risk for the organisation?'],
  ['financialRisk','Financial risk','Could the opportunity create an unacceptable financial risk?'],
  ['thematicGeoRisk','Thematic / geographic risk','Could it take the organisation too far from its focus or geography?'],
  ['governmentPartnerRisk','Government / partner risk','Could it introduce a government, judiciary or partner risk?'],
  ['teamOverloadRisk','Team burden risk','Could it overburden the team or distract from priority work?']
 ]}
];
const ASSESS_FIELDS=ASSESS_GROUPS.flatMap(g=>g.fields);
const ASSESS_OPTS=['','Yes','No','Don’t know'];
const blankAssessment=()=>{const a={};ASSESS_FIELDS.forEach(([k])=>a[k]='');return a};
// Scoring: +1 per field whose answer matches the group's positive direction.
// Positive groups: Yes = +1. Risk group: No = +1 (no risk is positive).
// Returns counts + a verdict suggestion.
function assessmentScore(d){
 let positive=0,negative=0,unsure=0,answered=0,total=0;
 ASSESS_GROUPS.forEach(g=>{
  const want=g.polarity==='positive'?'Yes':'No';
  const avoid=g.polarity==='positive'?'No':'Yes';
  g.fields.forEach(([k])=>{
   total++;
   const v=d[k]||'';
   if(!v)return;
   answered++;
   if(v===want)positive++;
   else if(v===avoid)negative++;
   else unsure++;
  });
 });
 const pctAnswered=total?Math.round((answered/total)*100):0;
 const score=positive-negative;
 // Verdict: strongly positive = Go, strongly negative = No go, otherwise Review.
 // Only suggest once at least half the questions are answered.
 let verdict='Not assessed',verdictClass='none';
 if(answered>=Math.ceil(total/2)){
  if(score>=Math.ceil(total*0.5)){verdict='Go (strong)';verdictClass='go-strong'}
  else if(score>=Math.ceil(total*0.25)){verdict='Lean go';verdictClass='go'}
  else if(score<=-Math.ceil(total*0.25)){verdict='Lean no-go';verdictClass='nogo'}
  else{verdict='Review';verdictClass='review'}
 } else if(answered>0) verdict='In progress';
 return {positive,negative,unsure,answered,total,pctAnswered,score,verdict,verdictClass};
}

const blankDonor=()=>({id:uid(),code:'',name:'',type:'Foundation',country:'',region:'',size:'Small ($10k–$100k)',focusAreas:'',website:'',contact:'',email:'',stage:'Prospect',typicalGrant:'',nextCycle:'',alignment:{},rationale:'',decision:'',decisionDate:'',notes:'',lastEditedBy:'',lastEditedAt:'',...blankAssessment()});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',currency:'USD',notes:''});
const blank=()=>({version:2,meta:blankMeta(),donors:[]});

function migrateV1(v1){
 const out=blank();
 try{
  (v1?.donors||[]).forEach((d,i)=>out.donors.push({...blankDonor(),code:'D'+(i+1),name:d.name||'',type:DTYPES.includes(d.type)?d.type:'Foundation',country:d.country||'',focusAreas:d.focus||d.focusAreas||'',stage:STAGES.includes(d.stage)?d.stage:'Prospect',typicalGrant:d.typicalGrant||'',notes:d.notes||''}));
 }catch(e){console.warn('donor-mapping migrate failed',e)}
 return out;
}

const storage=S.store({key:KEY,version:2,blank,legacy:[{key:LEGACY,migrate:migrateV1}],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.donor-mapping-cleanup-v2',blank)||d;if(!Array.isArray(d.donors))d.donors=[];d.donors.forEach(x=>{if(!x.alignment||typeof x.alignment!=='object')x.alignment={}});return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const nextCode=()=>{const nums=db.donors.map(d=>Number(String(d.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'D'+(Math.max(0,...nums)+1)};

// ---------- Alignment score ----------
// Each donor rates alignment 0–3 against each ESO; total score and % of max.
function totalAlignment(donor){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 if(!esos.length)return {sum:0,max:0,pct:0};
 const sum=esos.reduce((n,o)=>n+(Number(donor.alignment?.[o.code])||0),0);
 const max=esos.length*3;
 return {sum,max,pct:max?Math.round((sum/max)*100):0};
}

// ---------- Visual dashboard ----------
// Three visual cards that give fundraisers an at-a-glance read of their
// pipeline: go / no-go donut, fit distribution bars, and scoring coverage
// ("all done" progress). All derived live from state.donors + ESOs.
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const donors=db.donors;
 const total=donors.length;
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 // Go / No-go / In review
 const go=donors.filter(d=>['Qualified','Engaged','Proposing','Decided'].includes(d.stage)).length;
 const noGo=donors.filter(d=>d.stage==='Not fit').length;
 const review=donors.filter(d=>!d.stage||d.stage==='Prospect').length;
 // Fit distribution (donors by alignment %)
 const fits=donors.map(d=>totalAlignment(d).pct);
 const strong=fits.filter(p=>p>=75).length;
 const good=fits.filter(p=>p>=50&&p<75).length;
 const weak=fits.filter(p=>p>=25&&p<50).length;
 const poor=fits.filter(p=>p<25).length;
 // Scoring coverage: how many donor×ESO cells have a non-zero score
 const cells=total*esos.length;
 let scored=0,fullyScored=0,partialScored=0,notStarted=0;
 donors.forEach(d=>{
  const filled=esos.filter(o=>Number(d.alignment?.[o.code])>0).length;
  scored+=filled;
  if(!esos.length){notStarted++;return}
  if(filled===esos.length)fullyScored++;
  else if(filled>0)partialScored++;
  else notStarted++;
 });
 // Assessment coverage: % of donors who have completed the full questionnaire
 let assessFull=0,assessPartial=0,assessNone=0,assessVerdictGo=0,assessVerdictNoGo=0,assessVerdictReview=0;
 donors.forEach(d=>{
  const a=assessmentScore(d);
  if(a.answered===a.total)assessFull++;
  else if(a.answered>0)assessPartial++;
  else assessNone++;
  if(a.verdictClass==='go-strong'||a.verdictClass==='go')assessVerdictGo++;
  else if(a.verdictClass==='nogo')assessVerdictNoGo++;
  else if(a.verdictClass==='review')assessVerdictReview++;
 });
 const assessPct=total?Math.round((assessFull/total)*100):0;
 return {total,go,noGo,review,strong,good,weak,poor,cells,scored,fullyScored,partialScored,notStarted,esoCount:esos.length,assessFull,assessPartial,assessNone,assessPct,assessVerdictGo,assessVerdictNoGo,assessVerdictReview};
}
function fitBar(label,count,total,cls){
 const share=pct(count,total);
 return `<div class="dm-fit-row">
  <div><span>${label}</span><strong>${count} donor${count===1?'':'s'} · ${share}%</strong></div>
  <span class="dm-fit-track"><i class="dm-fit-fill ${cls}" style="--share:${Math.max(share,count?3:0)}%"></i></span>
 </div>`;
}
function visualDashboard(){
 const s=dashboardStats();
 const isEmpty=!s.total;
 const goShare=pct(s.go,s.total);
 const noGoShare=pct(s.noGo,s.total);
 const coverage=pct(s.scored,s.cells);
 const doneShare=pct(s.fullyScored,s.total);
 // Status badge text + class
 let badgeClass='early',badgeText=`<b>Just getting started.</b> ${isEmpty?'Add your first donor to begin scoring.':'No donor has a complete score yet.'}`;
 if(!isEmpty && doneShare===100){badgeClass='all-done';badgeText=`<b>✓ All done.</b> Every donor fully scored against your ESOs.`}
 else if(!isEmpty && doneShare>=50){badgeClass='half-done';badgeText=`<b>${s.fullyScored} of ${s.total} donors fully scored.</b> ${s.partialScored} partially, ${s.notStarted} not started.`}
 else if(!isEmpty && doneShare>0){badgeText=`<b>${s.fullyScored} of ${s.total} donors fully scored.</b> ${s.partialScored} partially, ${s.notStarted} not started.`}
 return `<section class="dm-dashboard ${isEmpty?'dm-dashboard-empty':''}" aria-label="Donor mapping visual overview">
  <article class="dm-card dm-decision">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Decision view</p><h3>Go / no-go</h3></div><span>${s.total} donor${s.total===1?'':'s'}</span></div>
   <div class="dm-donut-row">
    <div class="dm-donut" role="img" aria-label="${s.go} go, ${s.noGo} no-go and ${s.review} in review" style="--go-share:${goShare}%;--no-go-share:${noGoShare}%"><div><strong>${goShare}%</strong><span>Go</span></div></div>
    <dl class="dm-legend">
     <div class="dm-leg-go"><dt>Go</dt><dd>${s.go}</dd></div>
     <div class="dm-leg-nogo"><dt>No go</dt><dd>${s.noGo}</dd></div>
     <div class="dm-leg-review"><dt>In review</dt><dd>${s.review}</dd></div>
    </dl>
   </div>
   ${isEmpty?`<p class="dm-empty-hint">Add a donor and set its stage to light up the donut.</p>`:''}
  </article>
  <article class="dm-card dm-fit">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Fit view</p><h3>Alignment distribution</h3></div><span>Where to focus</span></div>
   <div class="dm-fit-list">
    ${fitBar('Strong fit · 75%+',s.strong,s.total,'dm-fit-strong')}
    ${fitBar('Good fit · 50–74%',s.good,s.total,'dm-fit-good')}
    ${fitBar('Weak fit · 25–49%',s.weak,s.total,'dm-fit-weak')}
    ${fitBar('Poor fit · under 25%',s.poor,s.total,'dm-fit-poor')}
   </div>
   ${isEmpty?`<p class="dm-empty-hint">Score donors 0–3 against each ESO to see them bucket here.</p>`:''}
  </article>
  <article class="dm-card dm-coverage">
   <div class="dm-card-head"><div><p class="dm-eyebrow">All done?</p><h3>Scoring coverage</h3></div><span>${s.fullyScored}/${s.total}</span></div>
   <div class="dm-coverage-num"><strong>${coverage}%</strong><span>of donor × ESO cells scored</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${coverage}%"></i></div>
   <div class="dm-done-badge ${badgeClass}">${badgeText}</div>
   <dl class="dm-done-key">
    <div><dt>Fully scored</dt><dd>${s.fullyScored}</dd></div>
    <div><dt>Partially</dt><dd>${s.partialScored}</dd></div>
    <div><dt>Not started</dt><dd>${s.notStarted}</dd></div>
   </dl>
  </article>
  <article class="dm-card dm-assess">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Assessment · ${ASSESS_FIELDS.length} questions</p><h3>Go/no-go verdict</h3></div><span>${s.assessFull}/${s.total} fully assessed</span></div>
   <div class="dm-coverage-num"><strong>${s.assessPct}%</strong><span>of donors fully assessed</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${s.assessPct}%;background:linear-gradient(90deg,#16746e,#e56f4a)"></i></div>
   <div class="dm-verdict-row">
    <span class="dm-verdict-pill go"><b>${s.assessVerdictGo}</b> leaning Go</span>
    <span class="dm-verdict-pill review"><b>${s.assessVerdictReview}</b> Review</span>
    <span class="dm-verdict-pill nogo"><b>${s.assessVerdictNoGo}</b> leaning No-go</span>
   </div>
   <p class="dm-assess-hint">Each donor's profile has a <b>Strategy · Likelihood · Technical · Capacity · Risk</b> questionnaire. The verdict is derived automatically from the answers.</p>
  </article>
 </section>`;
}

// ---------- Views ----------
function startView(){
 const m=db.meta;
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const totals={total:db.donors.length,qualified:db.donors.filter(d=>d.stage!=='Prospect'&&d.stage!=='Not fit').length,proposing:db.donors.filter(d=>d.stage==='Proposing').length,decided:db.donors.filter(d=>d.stage==='Decided').length};
 return `${window.MMExample?.renderIntegration?.('donor-mapping')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Prospect side of fundraising. Score each donor's alignment against your strategic objectives, qualify or disqualify them, and promote qualified prospects into active cultivation (Donor Tracking).</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Currency</span><input data-field="currency" value="${esc(m.currency)}" placeholder="USD" maxlength="12"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Fundraising strategy context — target mix, red lines, no-go donors.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Prospects',totals.total,'In the pipeline')}
    ${card('Qualified+',totals.qualified,'Past the initial fit screen')}
    ${card('Proposing',totals.proposing,'With a live proposal',totals.proposing>5)}
    ${card('Decided',totals.decided,'Yes or no returned')}
   </div>
   ${visualDashboard()}
   ${esos.length?'':'<div class="notice warn"><b>No external strategic objectives found yet.</b> Open Strategic Objectives first — the alignment matrix uses your ESOs as columns.</div>'}
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Add donors one at a time, score each one's fit with each of your ESOs (0 = no fit, 3 = perfect fit), and let the matrix surface the best-aligned prospects. Qualified donors can be promoted to <b>Donor Tracking</b> for active cultivation.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-donor">+ Add a donor</button>
    <a class="button secondary" href="#" data-tab="Prospects">Go to prospect pipeline →</a>
    <a class="button secondary" href="#" data-tab="Alignment matrix">See alignment matrix →</a>
    <a class="button secondary" href="Donor-Tracking.html">Open Donor Tracking →</a>
   </div>
  </section>`;
}

function prospectsView(){
 const stageOrder={'Proposing':0,'Engaged':1,'Qualified':2,'Prospect':3,'Decided':4,'Not fit':5};
 const sorted=[...db.donors].sort((a,b)=>(stageOrder[a.stage]??9)-(stageOrder[b.stage]??9)||totalAlignment(b).pct-totalAlignment(a).pct);
 const rows=sorted.map(d=>{
  const align=totalAlignment(d);
  const assess=assessmentScore(d);
  const bandClass=align.pct>=75?'risk-band-low':align.pct>=50?'risk-band-medium':align.pct>=25?'risk-band-high':'risk-band-none';
  return `<tr>
   <td><b>${esc(d.code)}</b></td>
   <td><b>${esc(d.name||'Untitled donor')}</b>${d.country?`<br><small>${esc(d.country)}${d.region?' · '+esc(d.region):''}</small>`:''}</td>
   <td>${pill(d.type)}</td>
   <td>${esc(d.size||'—')}<br><small>${esc(d.typicalGrant||'')}</small></td>
   <td class="risk-score-cell ${bandClass}" title="${align.sum}/${align.max}"><b>${align.pct}%</b></td>
   <td><span class="dm-verdict-badge ${assess.verdictClass}">${esc(assess.verdict)}</span><br><small>${assess.answered}/${assess.total}</small></td>
   <td>${pill(d.stage||'Prospect')}</td>
   <td>${esc(fmtDate(d.nextCycle)||'—')}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-donor" data-id="${esc(d.id)}">Edit</button></div></td>
  </tr>`;
 });
 return `<div class="rowhead section-head"><div><h2>Prospect pipeline</h2><p>Donors sorted by stage then by fit. Each row shows the ESO alignment % and the automatic verdict from the Strategy/Likelihood/Technical/Capacity/Risk questionnaire. Click Edit to open the full profile.</p></div><button class="button" data-action="new-donor">+ Add a donor</button></div>
  ${table(['Code','Donor','Type','Size · typical grant','Fit %','Verdict','Stage','Next cycle',''],rows,'No donors yet. Click "Add a donor" to begin.')}`;
}

function alignmentMatrixView(){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 if(!esos.length)return `<div class="rowhead section-head"><div><h2>Alignment matrix</h2><p>Each donor's fit score against each ESO. Open Strategic Objectives first to populate the columns.</p></div></div><p class="example-empty">No external strategic objectives found.</p>`;
 const sorted=[...db.donors].sort((a,b)=>totalAlignment(b).pct-totalAlignment(a).pct);
 const scoreCell=v=>{const n=Number(v)||0;const cls=n===3?'score-3':n===2?'score-2':n===1?'score-1':'score-0';return `<td class="align-score ${cls}">${n||'·'}</td>`};
 const rows=sorted.map(d=>{const t=totalAlignment(d);return `<tr><td><b>${esc(d.code)}</b></td><td><b>${esc(d.name||'—')}</b></td><td>${pill(d.stage||'Prospect')}</td>${esos.map(o=>scoreCell(d.alignment?.[o.code])).join('')}<td class="align-total"><b>${t.pct}%</b><br><small>${t.sum}/${t.max}</small></td></tr>`}).join('');
 return `<div class="rowhead section-head"><div><h2>Alignment matrix · donors × ESOs</h2><p>Scores: 0 = no fit, 1 = adjacent, 2 = fit, 3 = perfect fit. The % column is the donor's total out of the maximum possible. Edit a donor to set the scores.</p></div></div>
  <section class="panel"><div class="tablewrap"><table class="align-matrix"><thead><tr><th>Code</th><th>Donor</th><th>Stage</th>${esos.map(o=>`<th title="${esc(o.title)}">${esc(o.code)}</th>`).join('')}<th>Fit %</th></tr></thead><tbody>${rows||'<tr><td colspan="'+(4+esos.length)+'" class="muted">No donors yet.</td></tr>'}</tbody></table></div></section>`;
}

function exportViewPanel(){
 return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation, year, currency</li><li>Donors — full profile per donor including ESO alignment scores</li><li>_schema — field list for round-trip import</li></ul></section>`;
}

function donorModal(d){
 const isNew=!d;d=d||blankDonor();
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const alignFields=esos.map(o=>`<label class="field"><span class="label">${esc(o.code)} · ${esc(o.title.slice(0,45))}${o.title.length>45?'…':''} ${tip('0 = no fit, 1 = adjacent, 2 = fit, 3 = perfect fit')}</span><select name="align_${esc(o.code)}">${[0,1,2,3].map(v=>`<option value="${v}" ${String(d.alignment?.[o.code]||0)===String(v)?'selected':''}>${v}</option>`).join('')}</select></label>`).join('');
 return modal(isNew?'Add donor':'Edit donor',`<form data-form="donor" data-id="${esc(d.id||'')}" class="form">
  ${field('Code','code',d.code||nextCode(),'text','required')}
  ${field('Donor name','name',d.name,'text','required')}
  ${select('Type','type',DTYPES,d.type)}
  ${field('Country','country',d.country)}
  ${field('Region','region',d.region,'text','','e.g. Sub-Saharan Africa, LAC, SE Asia')}
  ${select('Size','size',SIZES,d.size)}
  ${field('Typical grant size','typicalGrant',d.typicalGrant,'text','','e.g. $50,000 over 2 years')}
  ${field('Website','website',d.website,'url')}
  ${field('Contact person','contact',d.contact)}
  ${field('Contact email','email',d.email,'email')}
  ${area('Focus areas / priorities','focusAreas',d.focusAreas)}
  <h3 class="form-section">Pipeline</h3>
  ${select('Stage','stage',STAGES,d.stage||'Prospect')}
  ${field('Next funding cycle','nextCycle',d.nextCycle,'date','','When the next proposal window opens.')}
  ${area('Fit rationale','rationale',d.rationale,'Why this donor and your work are a match (or not).')}
  <h3 class="form-section">ESO alignment (0–3 per objective)</h3>
  ${esos.length?`<div class="form-grid-top">${alignFields}</div>`:'<p class="muted" style="grid-column:1/-1">No external strategic objectives found. Open Strategic Objectives first.</p>'}
  <h3 class="form-section">Go/no-go assessment ${(()=>{const a=assessmentScore(d);return `<span class="dm-verdict-badge ${a.verdictClass}">${esc(a.verdict)}</span><small class="dm-verdict-stats">${a.answered}/${a.total} answered · ${a.positive} positive · ${a.negative} negative${a.unsure?' · '+a.unsure+' unsure':''}</small>`})()}</h3>
  <p class="muted" style="grid-column:1/-1;font-size:12.5px;margin:-6px 0 6px">Answer the questions below to get an automatic verdict. The <b>Risk</b> group is inverted — "Yes" means a risk is present.</p>
  <div class="dm-assess-grid" style="grid-column:1/-1">
   ${ASSESS_GROUPS.map(g=>`<details class="dm-assess-group dm-assess-${g.id}" open>
    <summary><b>${esc(g.label)}</b> <small>${g.polarity==='negative'?'Risk — Yes is negative':`${g.fields.length} question${g.fields.length===1?'':'s'}`}</small></summary>
    <div class="dm-assess-rows">
     ${g.fields.map(([k,label,q])=>`<label class="dm-assess-row">
      <span class="dm-assess-q"><b>${esc(label)}</b><small>${esc(q)}</small></span>
      <select name="assess_${esc(k)}" class="dm-assess-sel">
       ${ASSESS_OPTS.map(opt=>`<option value="${esc(opt)}" ${(d[k]||'')===opt?'selected':''}>${opt||'— not set —'}</option>`).join('')}
      </select>
     </label>`).join('')}
    </div>
   </details>`).join('')}
  </div>
  <h3 class="form-section">Decision</h3>
  ${select('Outcome','decision',['','Interested','Submitted proposal','Awarded','Declined','Withdrew'],d.decision||'')}
  ${field('Decision date','decisionDate',d.decisionDate,'date')}
  ${area('Notes','notes',d.notes)}
  ${formEnd('Save donor',{deleteId:isNew?'':d.id,deleteLabel:'Delete donor'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-donor'){dlg=donorModal();render();return}
 if(a==='edit-donor'){const d=db.donors.find(x=>x.id===id);if(d){dlg=donorModal(d);render()}return}
 if(a==='delete'){const d=db.donors.find(x=>x.id===id);if(!d)return;if(!confirm('Delete this donor? Cannot be undone.'))return;db.donors=db.donors.filter(x=>x.id!==id);dlg='';save('Donor deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-donor-mapping.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-donor-mapping.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-donor-mapping-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 if(form.dataset.form!=='donor')return;
 const existing=db.donors.find(d=>d.id===form.dataset.id);
 const d=existing||{...blankDonor()};
 const data=formData(form);
 const align={};soObjectives().filter(o=>(o.group||'External')==='External').forEach(o=>{align[o.code]=Number(data['align_'+o.code])||0});
 Object.assign(d,{code:s(data.code)||d.code||nextCode(),name:s(data.name),type:data.type,country:s(data.country),region:s(data.region),size:data.size,typicalGrant:s(data.typicalGrant),website:s(data.website),contact:s(data.contact),email:s(data.email),focusAreas:s(data.focusAreas),stage:data.stage||'Prospect',nextCycle:data.nextCycle||'',rationale:s(data.rationale),alignment:align,decision:data.decision||'',decisionDate:data.decisionDate||'',notes:s(data.notes)});
 // Pull the Go/no-go questionnaire answers back off the form.
 ASSESS_FIELDS.forEach(([k])=>{d[k]=data['assess_'+k]||''});
 stamp(d);
 if(!existing)db.donors.push(d);
 dlg='';save('Donor saved.');
}

function buildWorkbook(withData){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const header=['Code','Name','Type','Country','Region','Size','Typical grant','Website','Contact','Email','Focus areas','Stage','Next cycle','Rationale','Decision','Decision date',...esos.map(o=>'Align:'+o.code),'Fit %','Notes'];
 const rowFor=d=>{const t=totalAlignment(d);return [d.code,d.name,d.type,d.country,d.region,d.size,d.typicalGrant,d.website,d.contact,d.email,d.focusAreas,d.stage,d.nextCycle,d.rationale,d.decision,d.decisionDate,...esos.map(o=>d.alignment?.[o.code]||0),t.pct,d.notes]};
 const sheets=[
  readmeSheet('Donor Mapping',['Prospect side of fundraising.','Alignment columns use the 0–3 score per ESO; Fit % is the total over the maximum possible.']),
  metaSheet(db.meta),
  {name:'Donors',rows:[header,...(withData?db.donors.map(rowFor):[])]},
  schemaSheet({Donors:'code,name,type,country,region,size,typicalGrant,website,contact,email,focusAreas,stage,nextCycle,rationale,decision,decisionDate,alignment,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 download('Method-into-Impact-donor-mapping.csv',csv([['Code','Name','Type','Country','Stage','Fit %',...esos.map(o=>o.code)],...db.donors.map(d=>{const t=totalAlignment(d);return [d.code,d.name,d.type,d.country,d.stage,t.pct,...esos.map(o=>d.alignment?.[o.code]||0)]})]),'text/csv;charset=utf-8');
}
async function importXlsxFile(file){
 try{
  const data=await parseXlsx(await file.arrayBuffer());
  const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);
  const rows=rowsToObjects(findSheet(data,'Donors'));
  if(rows?.length)db.donors=rows.map(r=>{const align={};Object.keys(r).filter(k=>k.startsWith('Align:')).forEach(k=>{align[k.slice(6)]=Number(r[k])||0});return {...blankDonor(),code:r.Code||'',name:r.Name||'',type:r.Type||'Foundation',country:r.Country||'',region:r.Region||'',size:r.Size||'',typicalGrant:r['Typical grant']||'',website:r.Website||'',contact:r.Contact||'',email:r.Email||'',focusAreas:r['Focus areas']||'',stage:r.Stage||'Prospect',nextCycle:r['Next cycle']||'',rationale:r.Rationale||'',decision:r.Decision||'',decisionDate:r['Decision date']||'',alignment:align,notes:r.Notes||''}});
  save('Excel imported.');
 }catch(e){message='Excel import failed: '+e.message;render()}
}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Prospects':prospectsView,'Alignment matrix':alignmentMatrixView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Funding · Donor mapping',title:'Donor Mapping',intro:'Prospect side of fundraising. Score each donor against your strategic objectives, qualify or disqualify, and promote qualified prospects to Donor Tracking for active cultivation.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=11&lesson=prospects',label:'Review Module 11'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
