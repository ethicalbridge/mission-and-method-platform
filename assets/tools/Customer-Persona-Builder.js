/* Customer Persona Builder — audience personas for communications & fundraising.
   One persona per audience segment with demographics, context, goals, barriers,
   messages that resonate, preferred channels and ESO relevance. Marketing posts
   and supporter stewardship both reference these personas.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-personas-v2',LEGACY='mission-method-personas-v1';
const SO_KEY='mission-method-strategic-objectives-v2';
const TABS=['Start','Personas','Cards','Export'];
const SEGMENTS=['Beneficiary','Donor (individual)','Donor (institutional)','Volunteer','Partner','Supporter / member','Staff recruit','Policy maker','Media','Other'];

const blankPersona=()=>({id:uid(),code:'',name:'',segment:'Supporter / member',archetype:'',ageBand:'',location:'',occupation:'',incomeBand:'',education:'',summary:'',quote:'',context:'',goals:'',pains:'',motivators:'',barriers:'',decisionDrivers:'',messagesThatResonate:'',messagesToAvoid:'',preferredChannels:'',influences:'',typicalDay:'',relevantEsos:'',relationshipWithUs:'',askOfUs:'',ourAskOfThem:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),personas:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.personas-cleanup-v2',blank)||d;if(!Array.isArray(d.personas))d.personas=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const nextCode=()=>{const nums=db.personas.map(p=>Number(String(p.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'PER'+(Math.max(0,...nums)+1)};

function startView(){
 const m=db.meta;
 const segments=[...new Set(db.personas.map(p=>p.segment))];
 const esoLinked=db.personas.filter(p=>p.relevantEsos).length;
 return `${window.MMExample?.renderIntegration?.('personas')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">One persona per audience segment. Describe them from the inside — what they want, what gets in the way, what tone and channel reach them. Each persona can be tagged with the ESO(s) it is most relevant to, and referenced from Marketing & Social Planner and Individual Giving.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="How these personas were developed — research base, interview count, review date.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Personas',db.personas.length,'In the library')}
    ${card('Segments covered',segments.length,'Of 10 segment types')}
    ${card('ESO-linked',esoLinked,'Mapped to a strategic objective')}
    ${card('Donor personas',db.personas.filter(p=>p.segment.startsWith('Donor')).length,'Individual + institutional')}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">A good persona is a working hypothesis, not a stereotype. Use research, interviews and real conversations. Keep personas current — review at least annually.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-persona">+ Add a persona</button>
    <a class="button secondary" href="#" data-tab="Personas">Persona list →</a>
    <a class="button secondary" href="#" data-tab="Cards">Visual cards →</a>
   </div>
  </section>`;
}

function personasView(){
 const sorted=[...db.personas].sort((a,b)=>(a.segment||'').localeCompare(b.segment||'')||(a.name||'').localeCompare(b.name||''));
 const rows=sorted.map(p=>`<tr>
  <td><b>${esc(p.code)}</b></td>
  <td><b>${esc(p.name||'Untitled')}</b>${p.archetype?`<br><small>${esc(p.archetype)}</small>`:''}</td>
  <td>${pill(p.segment||'Other')}</td>
  <td>${esc(p.ageBand||'')}${p.location?' · '+esc(p.location):''}</td>
  <td>${esc(p.occupation||'—')}</td>
  <td>${esc(p.relevantEsos||'—')}</td>
  <td><small>${esc((p.summary||'').slice(0,120))}${p.summary&&p.summary.length>120?'…':''}</small></td>
  <td><div class="row-actions"><button class="link" data-action="edit-persona" data-id="${esc(p.id)}">Edit</button></div></td>
 </tr>`);
 return `<div class="rowhead section-head"><div><h2>Persona library</h2><p>One row per persona. Open any one for the full profile. ESO tags make personas visible to Marketing and Individual Giving.</p></div><button class="button" data-action="new-persona">+ Add a persona</button></div>
  ${table(['Code','Name / archetype','Segment','Age · location','Occupation','ESOs','Summary',''],rows,'No personas yet.')}`;
}

function cardsView(){
 if(!db.personas.length)return `<div class="rowhead section-head"><div><h2>Persona cards</h2><p>Visual overview — add a persona to see cards here.</p></div></div><p class="example-empty">No personas yet.</p>`;
 const cards=db.personas.map(p=>`<article class="persona-card">
  <div class="persona-head">
   <div class="persona-avatar">${esc((p.name||'?').slice(0,1).toUpperCase())}</div>
   <div><h3>${esc(p.name||'Untitled')}</h3><small>${esc(p.code)} · ${esc(p.segment)}</small></div>
  </div>
  ${p.quote?`<blockquote class="persona-quote">"${esc(p.quote)}"</blockquote>`:''}
  <dl class="persona-dl">
   <dt>Who</dt><dd>${esc([p.ageBand,p.occupation,p.location].filter(Boolean).join(' · ')||'—')}</dd>
   <dt>Goals</dt><dd>${esc(p.goals||'—')}</dd>
   <dt>Barriers</dt><dd>${esc(p.barriers||p.pains||'—')}</dd>
   <dt>Messages that resonate</dt><dd>${esc(p.messagesThatResonate||'—')}</dd>
   <dt>Channels</dt><dd>${esc(p.preferredChannels||'—')}</dd>
   <dt>ESO relevance</dt><dd>${esc(p.relevantEsos||'—')}</dd>
   <dt>Our ask of them</dt><dd>${esc(p.ourAskOfThem||'—')}</dd>
  </dl>
  <div class="persona-actions"><button class="link" data-action="edit-persona" data-id="${esc(p.id)}">Edit full profile →</button></div>
 </article>`);
 return `<div class="rowhead section-head"><div><h2>Persona cards</h2><p>At-a-glance view of every persona. Click any card to open the full profile.</p></div><button class="button" data-action="new-persona">+ Add a persona</button></div>
  <div class="persona-grid">${cards.join('')}</div>`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Personas — one row per persona with every field</li><li>Meta — organisation / year</li><li>_schema — field list for round-trip import</li></ul></section>`}

function personaModal(p){
 const isNew=!p;p=p||blankPersona();
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const esoChips=esos.length?`<p class="tiny" style="margin:0 0 4px">ESO chips: ${esos.map(o=>`<button type="button" class="link" data-eso-chip="${esc(o.code)}">${esc(o.code)}</button>`).join(' · ')}</p>`:'';
 return modal(isNew?'Add persona':'Edit persona',`<form data-form="persona" data-id="${esc(p.id||'')}" class="form">
  ${field('Code','code',p.code||nextCode(),'text','required')}
  ${field('Name','name',p.name,'text','required','A memorable name helps the team talk about this persona.')}
  ${select('Segment','segment',SEGMENTS,p.segment)}
  ${field('Archetype / one-line description','archetype',p.archetype,'text','','e.g. "Mid-career professional looking for meaningful ways to give"')}
  <h3 class="form-section">Who they are</h3>
  ${field('Age band','ageBand',p.ageBand,'text','','e.g. 30–45')}
  ${field('Location','location',p.location)}
  ${field('Occupation / role','occupation',p.occupation)}
  ${field('Income band','incomeBand',p.incomeBand,'text','','Optional. Only if relevant to the message.')}
  ${field('Education','education',p.education,'text','','Optional.')}
  ${area('Summary — one short paragraph','summary',p.summary)}
  ${area('A quote in their voice','quote',p.quote,'What they would say about this issue or your work.')}
  <h3 class="form-section">What drives them</h3>
  ${area('Context — their world right now','context',p.context)}
  ${area('Goals — what they want','goals',p.goals)}
  ${area('Pains — current frustrations','pains',p.pains)}
  ${area('Motivators — what moves them','motivators',p.motivators)}
  ${area('Barriers — what gets in the way','barriers',p.barriers)}
  ${area('Decision drivers — what tips the balance','decisionDrivers',p.decisionDrivers)}
  <h3 class="form-section">How to reach them</h3>
  ${area('Messages that resonate','messagesThatResonate',p.messagesThatResonate)}
  ${area('Messages to avoid','messagesToAvoid',p.messagesToAvoid)}
  ${field('Preferred channels','preferredChannels',p.preferredChannels,'text','','e.g. LinkedIn, podcast, in-person events')}
  ${field('Influences','influences',p.influences,'text','','Who or what they listen to.')}
  ${area('A typical day','typicalDay',p.typicalDay)}
  <h3 class="form-section">Relationship with us</h3>
  <label class="field full"><span class="label">ESOs this persona is relevant to</span>${esoChips}<input name="relevantEsos" value="${esc(p.relevantEsos)}" placeholder="e.g. ESO1, ESO3" data-eso-target></label>
  ${area('Relationship with us today','relationshipWithUs',p.relationshipWithUs)}
  ${area('What they want from us','askOfUs',p.askOfUs)}
  ${area('What we want from them','ourAskOfThem',p.ourAskOfThem)}
  ${formEnd('Save persona',{deleteId:isNew?'':p.id,deleteLabel:'Delete persona'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-persona'){dlg=personaModal();render();return}
 if(a==='edit-persona'){const p=db.personas.find(x=>x.id===id);if(p){dlg=personaModal(p);render()}return}
 if(a==='delete'){const p=db.personas.find(x=>x.id===id);if(!p||!confirm('Delete this persona?'))return;db.personas=db.personas.filter(x=>x.id!==id);dlg='';save('Persona deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-personas.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){download('Method-into-Impact-personas.csv',csv([['Code','Name','Segment','Age','Occupation','ESOs','Summary'],...db.personas.map(p=>[p.code,p.name,p.segment,p.ageBand,p.occupation,p.relevantEsos,p.summary])]),'text/csv;charset=utf-8');return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-personas.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-personas-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 if(form.dataset.form!=='persona')return;
 const existing=db.personas.find(p=>p.id===form.dataset.id);
 const p=existing||{...blankPersona()};
 const d=formData(form);
 Object.assign(p,{code:s(d.code)||p.code||nextCode(),name:s(d.name),segment:d.segment,archetype:s(d.archetype),ageBand:s(d.ageBand),location:s(d.location),occupation:s(d.occupation),incomeBand:s(d.incomeBand),education:s(d.education),summary:s(d.summary),quote:s(d.quote),context:s(d.context),goals:s(d.goals),pains:s(d.pains),motivators:s(d.motivators),barriers:s(d.barriers),decisionDrivers:s(d.decisionDrivers),messagesThatResonate:s(d.messagesThatResonate),messagesToAvoid:s(d.messagesToAvoid),preferredChannels:s(d.preferredChannels),influences:s(d.influences),typicalDay:s(d.typicalDay),relevantEsos:s(d.relevantEsos),relationshipWithUs:s(d.relationshipWithUs),askOfUs:s(d.askOfUs),ourAskOfThem:s(d.ourAskOfThem)});
 stamp(p);
 if(!existing)db.personas.push(p);
 dlg='';save('Persona saved.');
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Audience personas',['One persona per audience segment. Keep them research-based and current.']),
  metaSheet(db.meta),
  {name:'Personas',rows:[['Code','Name','Segment','Archetype','Age','Location','Occupation','Income','Education','Summary','Quote','Context','Goals','Pains','Motivators','Barriers','Decision drivers','Messages that resonate','Messages to avoid','Preferred channels','Influences','Typical day','Relevant ESOs','Relationship with us','What they want from us','What we want from them'],...(withData?db.personas.map(p=>[p.code,p.name,p.segment,p.archetype,p.ageBand,p.location,p.occupation,p.incomeBand,p.education,p.summary,p.quote,p.context,p.goals,p.pains,p.motivators,p.barriers,p.decisionDrivers,p.messagesThatResonate,p.messagesToAvoid,p.preferredChannels,p.influences,p.typicalDay,p.relevantEsos,p.relationshipWithUs,p.askOfUs,p.ourAskOfThem]):[])]},
  schemaSheet({Personas:'code,name,segment,archetype,ageBand,location,occupation,incomeBand,education,summary,quote,context,goals,pains,motivators,barriers,decisionDrivers,messagesThatResonate,messagesToAvoid,preferredChannels,influences,typicalDay,relevantEsos,relationshipWithUs,askOfUs,ourAskOfThem'})
 ];
 return buildXlsx(sheets);
}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const rows=rowsToObjects(findSheet(data,'Personas'));if(rows?.length)db.personas=rows.map(r=>({...blankPersona(),code:r.Code||'',name:r.Name||'',segment:r.Segment||'Other',archetype:r.Archetype||'',ageBand:r.Age||'',location:r.Location||'',occupation:r.Occupation||'',incomeBand:r.Income||'',education:r.Education||'',summary:r.Summary||'',quote:r.Quote||'',context:r.Context||'',goals:r.Goals||'',pains:r.Pains||'',motivators:r.Motivators||'',barriers:r.Barriers||'',decisionDrivers:r['Decision drivers']||'',messagesThatResonate:r['Messages that resonate']||'',messagesToAvoid:r['Messages to avoid']||'',preferredChannels:r['Preferred channels']||'',influences:r.Influences||'',typicalDay:r['Typical day']||'',relevantEsos:r['Relevant ESOs']||'',relationshipWithUs:r['Relationship with us']||'',askOfUs:r['What they want from us']||'',ourAskOfThem:r['What we want from them']||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(box){const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}
 root.querySelectorAll('[data-eso-chip]').forEach(c=>c.addEventListener('click',()=>{const inp=root.querySelector('[data-eso-target]');if(!inp)return;const code=c.dataset.esoChip;const parts=(inp.value||'').split(/\s*,\s*/).filter(Boolean);if(!parts.includes(code))parts.push(code);inp.value=parts.join(', ')}));
}

function render(){
 const views={'Start':startView,'Personas':personasView,'Cards':cardsView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Communications · Audience personas',title:'Customer Persona Builder',intro:'One persona per audience segment — beneficiaries, donors, volunteers, partners. Describe them from the inside: goals, barriers, messages that resonate, preferred channels. Marketing and Individual Giving reference these personas for voice, channel and ask.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=8&lesson=audiences',label:'Review Module 8'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
