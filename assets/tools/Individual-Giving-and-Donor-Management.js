/* Individual Giving & Donor Management — supporter CRM for individual gifts.
   Supporters (people), gifts (transactions), stewardship (interactions). Each
   supporter can be matched to a persona for tone/channel, each gift can be
   designated to an ESO, and overall giving feeds the funding picture.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-individual-giving-v2',LEGACY='mission-method-individual-giving-v1';
const SO_KEY='mission-method-strategic-objectives-v2',PERSONA_KEY='mission-method-personas-v2';
const TABS=['Start','Supporters','Gifts','Stewardship','Export'];
const SUPPORTER_STATUS=['Prospect','Active','Lapsed','Major','Legacy pledge','Unsubscribed'];
const GIFT_TYPES=['One-off','Monthly recurring','Annual recurring','Major gift','In-memoriam','Legacy / bequest','Match-funded','In-kind'];
const PAY_METHODS=['Card','Bank transfer','Direct debit','Cash','Cheque','PayPal','Platform','Other'];
const INTERACTION_TYPES=['Thank you','Welcome','Impact update','Appeal','Event invite','Call','Visit','Birthday / anniversary','Legacy conversation','Other'];

const blankSupporter=()=>({id:uid(),code:'',name:'',preferredName:'',email:'',phone:'',address:'',city:'',country:'',dob:'',status:'Prospect',giftAid:false,anonymous:false,source:'',personaCode:'',communicationPref:'Email',interests:'',firstGiftDate:'',largestGift:0,lifetimeTotal:0,notes:'',lastEditedBy:'',lastEditedAt:''});
const blankGift=()=>({id:uid(),code:'',supporterCode:'',date:today(),amount:0,currency:'USD',type:'One-off',method:'Card',esoCode:'',campaign:'',anonymous:false,giftAid:false,reference:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankInteraction=()=>({id:uid(),supporterCode:'',date:today(),type:'Thank you',channel:'Email',summary:'',outcome:'',nextStep:'',nextDate:'',owner:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',currency:'USD',year:currentYear,preparedBy:'',defaultGiftAid:true,notes:''});
const blank=()=>({version:2,meta:blankMeta(),supporters:[],gifts:[],interactions:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.giving-cleanup-v2',blank)||d;['supporters','gifts','interactions'].forEach(k=>{if(!Array.isArray(d[k]))d[k]=[]});return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const personaList=()=>(readStore(PERSONA_KEY)?.personas||[]);
const nextCode=(prefix,arr)=>{const nums=arr.map(x=>Number(String(x.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};
const money=(n,cur)=>new Intl.NumberFormat(undefined,{style:'currency',currency:cur||db.meta.currency||'USD',maximumFractionDigits:0}).format(Number(n)||0);
const giftsFor=code=>db.gifts.filter(g=>g.supporterCode===code);
const totalFor=code=>giftsFor(code).reduce((n,g)=>n+(Number(g.amount)||0),0);
const yearGiving=()=>db.gifts.filter(g=>new Date(g.date).getFullYear()===Number(db.meta.year)).reduce((n,g)=>n+(Number(g.amount)||0),0);

function startView(){
 const m=db.meta;
 const supporters=db.supporters.length;
 const activeMonthly=db.supporters.filter(sp=>db.gifts.some(g=>g.supporterCode===sp.code&&g.type==='Monthly recurring')).length;
 const majorDonors=db.supporters.filter(sp=>sp.status==='Major').length;
 const thisYear=yearGiving();
 return `${window.MMExample?.renderIntegration?.('individual-giving')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Supporter CRM for individual gifts. Each supporter can be matched to a persona (for tone and channel) and each gift can be designated to a specific ESO so overall giving maps to objectives.</p>
   <div class="work-meta">
    <label class="work-field"><span>Default currency</span><input data-field="currency" value="${esc(m.currency)}" maxlength="12"></label>
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Fundraising rhythm, stewardship tiers, data-protection practice.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Supporters',supporters,'Total on file')}
    ${card('Active monthly givers',activeMonthly,'Recurring donations')}
    ${card('Major donors',majorDonors,'Status: Major')}
    ${card('Giving this year',money(thisYear),'All sources combined')}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Add supporters, log their gifts, and record every stewardship touch (thank you, update, call, visit). Lifetime totals update automatically.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-supporter">+ Add a supporter</button>
    <button class="button" data-action="new-gift">+ Log a gift</button>
    <button class="button secondary" data-action="new-interaction">+ Record stewardship</button>
    <a class="button secondary" href="#" data-tab="Supporters">Supporters →</a>
   </div>
  </section>`;
}

function supportersView(){
 const sorted=[...db.supporters].sort((a,b)=>totalFor(b.code)-totalFor(a.code));
 const rows=sorted.map(sp=>{const total=totalFor(sp.code);const gifts=giftsFor(sp.code);const persona=personaList().find(p=>p.code===sp.personaCode);return `<tr><td><b>${esc(sp.code)}</b></td><td><b>${esc(sp.anonymous?'(Anonymous)':sp.name||'Untitled')}</b>${sp.city||sp.country?`<br><small>${esc([sp.city,sp.country].filter(Boolean).join(', '))}</small>`:''}</td><td>${pill(sp.status)}</td><td>${persona?`<small>${esc(persona.name)}</small>`:'<span class="muted">—</span>'}</td><td>${gifts.length}</td><td><b>${money(total)}</b></td><td>${esc(fmtDate(gifts.sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0]?.date)||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-supporter" data-id="${esc(sp.id)}">Edit</button> <button class="link" data-action="new-gift-for" data-code="${esc(sp.code)}">+ Gift</button></div></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Supporters</h2><p>Sorted by lifetime total. Click Edit to open the full profile, or + Gift to log a new donation inline.</p></div><button class="button" data-action="new-supporter">+ Add a supporter</button></div>
  ${table(['Code','Name / location','Status','Persona','Gifts','Lifetime','Last gift',''],rows,'No supporters yet.')}`;
}

function giftsView(){
 const sorted=[...db.gifts].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const rows=sorted.map(g=>{const sp=db.supporters.find(x=>x.code===g.supporterCode);return `<tr><td>${esc(fmtDate(g.date))}</td><td><b>${esc(sp?.name||g.supporterCode)}</b></td><td><b>${money(g.amount,g.currency)}</b>${g.giftAid?' <span class="pill" style="font-size:9px">Gift Aid</span>':''}</td><td>${pill(g.type)}</td><td>${esc(g.method)}</td><td>${esc(g.esoCode||'—')}</td><td>${esc(g.campaign||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-gift" data-id="${esc(g.id)}">Edit</button></div></td></tr>`});
 const totalByEso=db.gifts.reduce((acc,g)=>{if(!g.esoCode)return acc;acc[g.esoCode]=(acc[g.esoCode]||0)+(Number(g.amount)||0);return acc},{});
 const esoRows=Object.entries(totalByEso).sort((a,b)=>b[1]-a[1]).map(([code,total])=>`<tr><td><b>${esc(code)}</b></td><td><b>${money(total)}</b></td></tr>`);
 return `<div class="rowhead section-head"><div><h2>Gifts</h2><p>Every gift, newest first. The donor currency is shown; totals in the summary use the organisation default.</p></div><button class="button" data-action="new-gift">+ Log a gift</button></div>
  ${esoRows.length?`<section class="panel"><h3>Giving by ESO (all time)</h3>${table(['ESO','Total'],esoRows,'')}</section>`:''}
  ${table(['Date','Supporter','Amount','Type','Method','ESO','Campaign',''],rows,'No gifts logged yet.')}`;
}

function stewardshipView(){
 const sorted=[...db.interactions].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const rows=sorted.map(i=>{const sp=db.supporters.find(x=>x.code===i.supporterCode);return `<tr><td>${esc(fmtDate(i.date))}</td><td><b>${esc(sp?.name||i.supporterCode)}</b></td><td>${pill(i.type)}</td><td>${esc(i.channel||'')}</td><td><small>${esc(i.summary||'')}</small></td><td>${esc(i.nextStep||'—')}${i.nextDate?`<br><small>${esc(fmtDate(i.nextDate))}</small>`:''}</td><td>${esc(i.owner||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-interaction" data-id="${esc(i.id)}">Edit</button></div></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Stewardship log</h2><p>Every touchpoint with a supporter — thank yous, updates, calls, visits. Builds a complete relationship history.</p></div><button class="button" data-action="new-interaction">+ Record stewardship</button></div>
  ${table(['Date','Supporter','Type','Channel','Summary','Next step','Owner',''],rows,'No interactions logged yet.')}`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Supporters — contact detail, status, persona, communication preferences, lifetime total</li><li>Gifts — every donation with amount, type, method, ESO designation</li><li>Stewardship — every logged interaction</li><li>Meta — organisation / currency / year</li></ul></section>`}

// ---------- Modals ----------
function supporterModal(sp){
 const isNew=!sp;sp=sp||blankSupporter();
 const personaOpts=personaList().map(p=>[p.code,`${p.code} · ${p.name} (${p.segment})`]);
 return modal(isNew?'Add supporter':'Edit supporter',`<form data-form="supporter" data-id="${esc(sp.id||'')}" class="form">
  ${field('Code','code',sp.code||nextCode('S',db.supporters),'text','required')}
  ${field('Full name','name',sp.name,'text','required')}
  ${field('Preferred name','preferredName',sp.preferredName)}
  ${field('Email','email',sp.email,'email')}
  ${field('Phone','phone',sp.phone,'tel')}
  ${area('Address','address',sp.address)}
  ${field('City','city',sp.city)}
  ${field('Country','country',sp.country)}
  ${field('Date of birth','dob',sp.dob,'date','','Optional. Only if useful for stewardship or legacy conversations.')}
  ${select('Status','status',SUPPORTER_STATUS,sp.status)}
  ${personaOpts.length?select('Persona (from Customer Persona Builder)','personaCode',personaOpts,sp.personaCode,'','Not matched'):field('Persona code','personaCode',sp.personaCode,'text','','Open the Customer Persona Builder to create personas first.')}
  ${field('Communication preference','communicationPref',sp.communicationPref||'Email')}
  ${area('Interests / causes','interests',sp.interests)}
  ${field('Source — how they came to us','source',sp.source)}
  <h3 class="form-section">Preferences</h3>
  <label class="field"><span class="label">Gift Aid eligible</span><select name="giftAid"><option value="true" ${sp.giftAid?'selected':''}>Yes</option><option value="false" ${!sp.giftAid?'selected':''}>No</option></select></label>
  <label class="field"><span class="label">Anonymous</span><select name="anonymous"><option value="false" ${!sp.anonymous?'selected':''}>No — publicly named</option><option value="true" ${sp.anonymous?'selected':''}>Yes — keep anonymous</option></select></label>
  ${area('Notes','notes',sp.notes)}
  ${formEnd('Save supporter',{deleteId:isNew?'':sp.id,deleteLabel:'Delete supporter'})}
 </form>`);
}

function giftModal(g,supporterCode){
 const isNew=!g;g=g||{...blankGift(),supporterCode:supporterCode||'',giftAid:db.meta.defaultGiftAid};
 const supOpts=db.supporters.map(sp=>[sp.code,`${sp.code} · ${sp.name}`]);
 const esoOpts=soObjectives().filter(o=>(o.group||'External')==='External').map(o=>[o.code,`${o.code} · ${o.title}`]);
 return modal(isNew?'Log gift':'Edit gift',`<form data-form="gift" data-id="${esc(g.id||'')}" class="form">
  ${field('Code','code',g.code||nextCode('G',db.gifts),'text','required')}
  ${supOpts.length?select('Supporter','supporterCode',supOpts,g.supporterCode,'','Pick a supporter'):field('Supporter code','supporterCode',g.supporterCode)}
  ${field('Date','date',g.date,'date','required')}
  ${field('Amount','amount',g.amount,'number','step="any" min="0" required')}
  ${field('Currency','currency',g.currency||db.meta.currency||'USD','text','maxlength="12"')}
  ${select('Type','type',GIFT_TYPES,g.type)}
  ${select('Method','method',PAY_METHODS,g.method)}
  ${esoOpts.length?select('Designated ESO (optional)','esoCode',esoOpts,g.esoCode,'','Unrestricted'):field('Designated ESO code','esoCode',g.esoCode)}
  ${field('Campaign','campaign',g.campaign,'text','','e.g. End-of-year 2026')}
  <label class="field"><span class="label">Gift Aid</span><select name="giftAid"><option value="true" ${g.giftAid?'selected':''}>Yes</option><option value="false" ${!g.giftAid?'selected':''}>No</option></select></label>
  <label class="field"><span class="label">Anonymous</span><select name="anonymous"><option value="false" ${!g.anonymous?'selected':''}>No</option><option value="true" ${g.anonymous?'selected':''}>Yes</option></select></label>
  ${field('Reference / transaction ID','reference',g.reference)}
  ${area('Notes','notes',g.notes)}
  ${formEnd('Save gift',{deleteId:isNew?'':g.id,deleteLabel:'Delete gift'})}
 </form>`);
}

function interactionModal(i,supporterCode){
 const isNew=!i;i=i||{...blankInteraction(),supporterCode:supporterCode||''};
 const supOpts=db.supporters.map(sp=>[sp.code,`${sp.code} · ${sp.name}`]);
 return modal(isNew?'Record stewardship':'Edit interaction',`<form data-form="interaction" data-id="${esc(i.id||'')}" class="form">
  ${supOpts.length?select('Supporter','supporterCode',supOpts,i.supporterCode,'','Pick a supporter'):field('Supporter code','supporterCode',i.supporterCode)}
  ${field('Date','date',i.date,'date','required')}
  ${select('Type','type',INTERACTION_TYPES,i.type)}
  ${field('Channel','channel',i.channel,'text','','e.g. Email, phone, in-person, letter')}
  ${area('Summary','summary',i.summary)}
  ${area('Outcome','outcome',i.outcome)}
  ${area('Next step','nextStep',i.nextStep)}
  ${field('Next step by','nextDate',i.nextDate,'date')}
  ${field('Owner','owner',i.owner)}
  ${area('Notes','notes',i.notes)}
  ${formEnd('Save',{deleteId:isNew?'':i.id,deleteLabel:'Delete interaction'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab,code=el.dataset.code;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-supporter'){dlg=supporterModal();render();return}
 if(a==='edit-supporter'){const sp=db.supporters.find(x=>x.id===id);if(sp){dlg=supporterModal(sp);render()}return}
 if(a==='new-gift'){dlg=giftModal();render();return}
 if(a==='new-gift-for'){dlg=giftModal(null,code);render();return}
 if(a==='edit-gift'){const g=db.gifts.find(x=>x.id===id);if(g){dlg=giftModal(g);render()}return}
 if(a==='new-interaction'){dlg=interactionModal();render();return}
 if(a==='edit-interaction'){const i=db.interactions.find(x=>x.id===id);if(i){dlg=interactionModal(i);render()}return}
 if(a==='delete'){
  const sp=db.supporters.find(x=>x.id===id),g=db.gifts.find(x=>x.id===id),i=db.interactions.find(x=>x.id===id);
  if(sp){if(!confirm('Delete this supporter? Gifts and interactions stay by code reference.'))return;db.supporters=db.supporters.filter(x=>x.id!==id)}
  else if(g){if(!confirm('Delete this gift?'))return;db.gifts=db.gifts.filter(x=>x.id!==id)}
  else if(i){if(!confirm('Delete this interaction?'))return;db.interactions=db.interactions.filter(x=>x.id!==id)}
  else return;
  dlg='';save('Deleted.');return;
 }
 if(a==='xlsx'){try{download('Mission-and-Method-individual-giving.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-individual-giving.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-individual-giving-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 const bool=v=>v==='true'||v===true;
 if(kind==='supporter'){const existing=db.supporters.find(x=>x.id===form.dataset.id);const sp=existing||{...blankSupporter()};Object.assign(sp,{code:s(d.code)||sp.code||nextCode('S',db.supporters),name:s(d.name),preferredName:s(d.preferredName),email:s(d.email),phone:s(d.phone),address:s(d.address),city:s(d.city),country:s(d.country),dob:d.dob||'',status:d.status,giftAid:bool(d.giftAid),anonymous:bool(d.anonymous),personaCode:s(d.personaCode),communicationPref:s(d.communicationPref),interests:s(d.interests),source:s(d.source),notes:s(d.notes)});sp.lifetimeTotal=totalFor(sp.code);stamp(sp);if(!existing)db.supporters.push(sp);dlg='';save('Supporter saved.');return}
 if(kind==='gift'){const existing=db.gifts.find(x=>x.id===form.dataset.id);const g=existing||{...blankGift()};Object.assign(g,{code:s(d.code)||g.code||nextCode('G',db.gifts),supporterCode:s(d.supporterCode),date:d.date||today(),amount:Number(d.amount)||0,currency:s(d.currency)||'USD',type:d.type,method:d.method,esoCode:s(d.esoCode),campaign:s(d.campaign),giftAid:bool(d.giftAid),anonymous:bool(d.anonymous),reference:s(d.reference),notes:s(d.notes)});stamp(g);if(!existing)db.gifts.push(g);const sp=db.supporters.find(x=>x.code===g.supporterCode);if(sp){sp.lifetimeTotal=totalFor(sp.code);if(Number(g.amount)>Number(sp.largestGift||0))sp.largestGift=Number(g.amount)}dlg='';save('Gift saved.');return}
 if(kind==='interaction'){const existing=db.interactions.find(x=>x.id===form.dataset.id);const i=existing||{...blankInteraction()};Object.assign(i,{supporterCode:s(d.supporterCode),date:d.date||today(),type:d.type,channel:s(d.channel),summary:s(d.summary),outcome:s(d.outcome),nextStep:s(d.nextStep),nextDate:d.nextDate||'',owner:s(d.owner),notes:s(d.notes)});stamp(i);if(!existing)db.interactions.push(i);dlg='';save('Interaction saved.');return}
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Individual Giving & Donor Management',['Supporter CRM. Lifetime totals calculated from the Gifts sheet on import.']),
  metaSheet(db.meta),
  {name:'Supporters',rows:[['Code','Name','Preferred name','Email','Phone','City','Country','Status','Persona','Gift Aid','Anonymous','Comm pref','Interests','Source','Lifetime','Notes'],...(withData?db.supporters.map(sp=>[sp.code,sp.name,sp.preferredName,sp.email,sp.phone,sp.city,sp.country,sp.status,sp.personaCode,sp.giftAid,sp.anonymous,sp.communicationPref,sp.interests,sp.source,totalFor(sp.code),sp.notes]):[])]},
  {name:'Gifts',rows:[['Code','Supporter','Date','Amount','Currency','Type','Method','ESO','Campaign','Gift Aid','Anonymous','Reference','Notes'],...(withData?db.gifts.map(g=>[g.code,g.supporterCode,g.date,g.amount,g.currency,g.type,g.method,g.esoCode,g.campaign,g.giftAid,g.anonymous,g.reference,g.notes]):[])]},
  {name:'Stewardship',rows:[['Supporter','Date','Type','Channel','Summary','Outcome','Next step','Next date','Owner','Notes'],...(withData?db.interactions.map(i=>[i.supporterCode,i.date,i.type,i.channel,i.summary,i.outcome,i.nextStep,i.nextDate,i.owner,i.notes]):[])]},
  schemaSheet({Supporters:'code,name,email,phone,status,personaCode,giftAid,anonymous,interests,source',Gifts:'code,supporterCode,date,amount,currency,type,method,esoCode,campaign,giftAid,anonymous,reference',Stewardship:'supporterCode,date,type,channel,summary,outcome,nextStep,nextDate,owner'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){download('Mission-and-Method-individual-giving.csv',csv([['Supporter code','Name','Status','Lifetime','Last gift date','Gift count'],...db.supporters.map(sp=>{const g=giftsFor(sp.code).sort((a,b)=>(b.date||'').localeCompare(a.date||''));return [sp.code,sp.name,sp.status,totalFor(sp.code),g[0]?.date||'',g.length]})]),'text/csv;charset=utf-8')}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const sRows=rowsToObjects(findSheet(data,'Supporters'));const gRows=rowsToObjects(findSheet(data,'Gifts'));const iRows=rowsToObjects(findSheet(data,'Stewardship'));const toBool=v=>v==='true'||v===true||v===1||v==='1';if(sRows?.length)db.supporters=sRows.map(r=>({...blankSupporter(),code:r.Code||'',name:r.Name||'',preferredName:r['Preferred name']||'',email:r.Email||'',phone:r.Phone||'',city:r.City||'',country:r.Country||'',status:r.Status||'Prospect',personaCode:r.Persona||'',giftAid:toBool(r['Gift Aid']),anonymous:toBool(r.Anonymous),communicationPref:r['Comm pref']||'Email',interests:r.Interests||'',source:r.Source||'',notes:r.Notes||''}));if(gRows?.length)db.gifts=gRows.map(r=>({...blankGift(),code:r.Code||'',supporterCode:r.Supporter||'',date:r.Date||today(),amount:Number(r.Amount)||0,currency:r.Currency||'USD',type:r.Type||'One-off',method:r.Method||'Card',esoCode:r.ESO||'',campaign:r.Campaign||'',giftAid:toBool(r['Gift Aid']),anonymous:toBool(r.Anonymous),reference:r.Reference||'',notes:r.Notes||''}));if(iRows?.length)db.interactions=iRows.map(r=>({...blankInteraction(),supporterCode:r.Supporter||'',date:r.Date||today(),type:r.Type||'Thank you',channel:r.Channel||'',summary:r.Summary||'',outcome:r.Outcome||'',nextStep:r['Next step']||'',nextDate:r['Next date']||'',owner:r.Owner||'',notes:r.Notes||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Supporters':supportersView,'Gifts':giftsView,'Stewardship':stewardshipView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Funding · Individual giving & supporter management',title:'Individual Giving & Donor Management',intro:'Supporter CRM for individual gifts. Match supporters to a persona for tone and channel. Designate gifts to a specific ESO so overall giving maps to strategic objectives.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=individual-giving',label:'Review the module'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
