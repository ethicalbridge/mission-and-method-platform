/* Donor Reference Guide — deep-reference profiles per donor.
   For every important fact: source link, date checked, who reviewed it.
   Separates confirmed donor rules from team interpretation. Each profile
   can import its name/type/country from an existing Donor Mapping record.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-donor-reference-v2',LEGACY='mission-method-donor-reference-v1';
const DM_KEY='mission-method-donor-mapping-v2';
const TABS=['Start','Profiles','Reference standard','Export'];
const DTYPES=['Foundation','Government','Bilateral','Corporate','Individual','UN agency','Multilateral','Other'];

const blankProfile=()=>({id:uid(),code:'',name:'',type:'Foundation',country:'',website:'',focusAreas:'',eligibility:'',ineligible:'',typicalGrantSize:'',coreFunding:'',indirectCostLimit:'',restrictedActivities:'',decisionCycles:'',applicationFormat:'',reportingFormat:'',reportingFrequency:'',paymentTerms:'',dueDiligence:'',keyContacts:'',relationshipHistory:'',redFlags:'',pastDecisions:'',sourceLinks:'',lastChecked:'',reviewedBy:'',confirmedByDonor:false,notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',preparedBy:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),profiles:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.donor-reference-cleanup-v2',blank)||d;if(!Array.isArray(d.profiles))d.profiles=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const mappedDonors=()=>(readStore(DM_KEY)?.donors||[]);
const nextCode=()=>{const nums=db.profiles.map(p=>Number(String(p.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'DRG'+(Math.max(0,...nums)+1)};
const stale=p=>{if(!p.lastChecked)return true;const months=(new Date(today())-new Date(p.lastChecked))/(30*86400000);return months>6};

function startView(){
 const m=db.meta;
 const total=db.profiles.length;
 const staleCount=db.profiles.filter(stale).length;
 const confirmed=db.profiles.filter(p=>p.confirmedByDonor).length;
 const importable=mappedDonors().filter(d=>!db.profiles.some(p=>p.code===d.code||p.name===d.name)).length;
 return `${window.MMExample?.renderIntegration?.('donor-reference')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Deep-reference library for important donors. Every rule, eligibility criterion, payment term and reporting format in one place — with the source link, date checked and reviewer so fundraisers never fly blind. Separate from Donor Mapping (prospect pipeline) and Donor Tracking (active grants).</p>
   <div class="work-meta">
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="Reference-library conventions — who reviews what, how often, how sources are logged.">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Profiles',total,'In the library')}
    ${card('Confirmed by donor',confirmed,'Rules confirmed directly')}
    ${card('Stale (>6 months)',staleCount,'Needs re-checking',staleCount>0)}
    ${card('Mapping imports',importable,'Qualified donors ready to profile',importable>0)}
   </div>
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">For every important fact, note a source link or document name, the date it was checked, and who reviewed it. Separate confirmed donor rules from team interpretation. Recheck eligibility, deadlines, indirect-cost limits, reporting formats and payment terms for each live funding opportunity.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-profile">+ Add a profile</button>
    ${importable?`<button class="button secondary" data-action="import-from-mapping">↙ Import ${importable} from Donor Mapping</button>`:''}
    <a class="button secondary" href="#" data-tab="Profiles">All profiles →</a>
    <a class="button secondary" href="#" data-tab="Reference standard">Reference standard →</a>
   </div>
  </section>`;
}

function profilesView(){
 const sorted=[...db.profiles].sort((a,b)=>(a.name||'').localeCompare(b.name||''));
 const rows=sorted.map(p=>{const st=stale(p);return `<tr>
   <td><b>${esc(p.code)}</b></td>
   <td><b>${esc(p.name||'Untitled')}</b>${p.website?`<br><small><a class="link" href="${esc(p.website)}" target="_blank" rel="noopener">${esc(p.website.replace(/^https?:\/\//,'').slice(0,40))}</a></small>`:''}</td>
   <td>${pill(p.type)}</td>
   <td>${esc(p.country||'—')}</td>
   <td>${esc(p.typicalGrantSize||'—')}</td>
   <td>${esc(p.decisionCycles||'—')}</td>
   <td>${esc(fmtDate(p.lastChecked)||'—')} ${st?'<span class="pill bad" style="font-size:9px">stale</span>':''}</td>
   <td>${p.confirmedByDonor?'<span class="pill" style="font-size:9px">confirmed</span>':'<span class="muted">team interp.</span>'}</td>
   <td><div class="row-actions"><button class="link" data-action="edit-profile" data-id="${esc(p.id)}">Edit</button></div></td>
  </tr>`});
 return `<div class="rowhead section-head"><div><h2>Donor reference profiles</h2><p>Each profile holds the donor's rules, cycles, reporting formats and payment terms with sources. Profiles older than 6 months flag "stale".</p></div><button class="button" data-action="new-profile">+ Add a profile</button></div>
  ${table(['Code','Donor','Type','Country','Typical grant','Cycles','Last checked','Status',''],rows,'No profiles yet.')}`;
}

function referenceStandardView(){
 return `<div class="rowhead section-head"><div><h2>Reference standard</h2><p>Rules of the house for every entry in this reference library.</p></div></div>
  <section class="panel">
   <h3>Every claim needs a source</h3>
   <p>For every important fact — eligibility, deadline, indirect-cost limit, reporting format, payment schedule, red lines — record a <b>source link or document name</b>, the <b>date it was checked</b>, and <b>who reviewed it</b>. Fundraisers rely on this reference library to make time-critical decisions; a wrong fact can lose a grant.</p>
   <h3>Separate confirmed rules from team interpretation</h3>
   <p>Tag whether the entry has been <b>confirmed directly by the donor</b> (an email, a published guideline, a call note) or whether it is the team's <b>working interpretation</b>. These are not the same.</p>
   <h3>Recheck before every live opportunity</h3>
   <p>Donor rules change. For every live funding opportunity, re-check: eligibility criteria, deadlines, indirect-cost caps, reporting format and payment terms. Update the profile with the new "last checked" date.</p>
   <h3>Review cadence</h3>
   <p>Profiles older than 6 months are flagged <b>stale</b> on the Profiles tab. Set a reminder to re-check annually at minimum.</p>
   <h3>Data-protection</h3>
   <p>This reference library is about donor organisations, not individuals. Avoid storing personal data about donor-side staff beyond public titles and work-email addresses needed for the relationship.</p>
  </section>`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Profiles — one row per donor with every reference field</li><li>Meta — organisation / preparer</li></ul></section>`}

function profileModal(p){
 const isNew=!p;p=p||blankProfile();
 return modal(isNew?'Add profile':'Edit profile',`<form data-form="profile" data-id="${esc(p.id||'')}" class="form">
  ${field('Code','code',p.code||nextCode(),'text','required')}
  ${field('Donor name','name',p.name,'text','required')}
  ${select('Type','type',DTYPES,p.type)}
  ${field('Country / HQ','country',p.country)}
  ${field('Website','website',p.website,'url')}
  ${area('Focus areas / priorities','focusAreas',p.focusAreas)}
  <h3 class="form-section">Eligibility & restrictions</h3>
  ${area('Eligibility — who they fund','eligibility',p.eligibility)}
  ${area('Ineligible — who they do not fund','ineligible',p.ineligible)}
  ${area('Restricted activities / red lines','restrictedActivities',p.restrictedActivities)}
  <h3 class="form-section">Funding terms</h3>
  ${field('Typical grant size','typicalGrantSize',p.typicalGrantSize)}
  ${area('Core / unrestricted funding stance','coreFunding',p.coreFunding)}
  ${field('Indirect cost limit','indirectCostLimit',p.indirectCostLimit,'text','','e.g. 15% capped, or "will negotiate"')}
  ${area('Payment terms','paymentTerms',p.paymentTerms)}
  <h3 class="form-section">Process</h3>
  ${field('Decision cycles','decisionCycles',p.decisionCycles,'text','','e.g. Quarterly board, by invitation only, open LoI window Mar/Sep')}
  ${area('Application format','applicationFormat',p.applicationFormat)}
  ${area('Reporting format','reportingFormat',p.reportingFormat)}
  ${field('Reporting frequency','reportingFrequency',p.reportingFrequency)}
  ${area('Due diligence requirements','dueDiligence',p.dueDiligence)}
  <h3 class="form-section">Relationship</h3>
  ${area('Key contacts','keyContacts',p.keyContacts)}
  ${area('Relationship history','relationshipHistory',p.relationshipHistory)}
  ${area('Past decisions and lessons','pastDecisions',p.pastDecisions)}
  ${area('Red flags / sensitivities','redFlags',p.redFlags)}
  <h3 class="form-section">Source & review</h3>
  ${area('Source links / documents','sourceLinks',p.sourceLinks,'Where every fact above was verified. One per line.')}
  ${field('Last checked','lastChecked',p.lastChecked,'date')}
  ${field('Reviewed by','reviewedBy',p.reviewedBy)}
  <label class="field"><span class="label">Confirmed directly by donor</span><select name="confirmedByDonor"><option value="false" ${!p.confirmedByDonor?'selected':''}>No — team interpretation</option><option value="true" ${p.confirmedByDonor?'selected':''}>Yes — confirmed by donor</option></select></label>
  ${area('Notes','notes',p.notes)}
  ${formEnd('Save profile',{deleteId:isNew?'':p.id,deleteLabel:'Delete profile'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-profile'){dlg=profileModal();render();return}
 if(a==='edit-profile'){const p=db.profiles.find(x=>x.id===id);if(p){dlg=profileModal(p);render()}return}
 if(a==='delete'){const p=db.profiles.find(x=>x.id===id);if(!p||!confirm('Delete this profile?'))return;db.profiles=db.profiles.filter(x=>x.id!==id);dlg='';save('Profile deleted.');return}
 if(a==='import-from-mapping'){importFromMapping();return}
 if(a==='xlsx'){try{download('Mission-and-Method-donor-reference-guide.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){download('Mission-and-Method-donor-reference-guide.csv',csv([['Code','Name','Type','Country','Typical grant','Last checked','Confirmed'],...db.profiles.map(p=>[p.code,p.name,p.type,p.country,p.typicalGrantSize,p.lastChecked,p.confirmedByDonor?'Yes':'No'])]),'text/csv;charset=utf-8');return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Mission-and-Method-donor-reference-guide.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Mission-and-Method-donor-reference-guide-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function importFromMapping(){
 const donors=mappedDonors().filter(d=>!db.profiles.some(p=>p.code===d.code||p.name===d.name));
 let added=0;
 donors.forEach(d=>{const p={...blankProfile(),code:nextCode(),name:d.name,type:d.type||'Foundation',country:d.country||'',focusAreas:d.focusAreas||'',typicalGrantSize:d.typicalGrant||''};stamp(p);db.profiles.push(p);added++});
 save(`${added} profile${added===1?'':'s'} imported from Donor Mapping. Fill in each one with sourced detail.`);
}

function submit(form){
 if(form.dataset.form!=='profile')return;
 const existing=db.profiles.find(p=>p.id===form.dataset.id);
 const p=existing||{...blankProfile()};
 const d=formData(form);
 Object.assign(p,{code:s(d.code)||p.code||nextCode(),name:s(d.name),type:d.type,country:s(d.country),website:s(d.website),focusAreas:s(d.focusAreas),eligibility:s(d.eligibility),ineligible:s(d.ineligible),restrictedActivities:s(d.restrictedActivities),typicalGrantSize:s(d.typicalGrantSize),coreFunding:s(d.coreFunding),indirectCostLimit:s(d.indirectCostLimit),paymentTerms:s(d.paymentTerms),decisionCycles:s(d.decisionCycles),applicationFormat:s(d.applicationFormat),reportingFormat:s(d.reportingFormat),reportingFrequency:s(d.reportingFrequency),dueDiligence:s(d.dueDiligence),keyContacts:s(d.keyContacts),relationshipHistory:s(d.relationshipHistory),pastDecisions:s(d.pastDecisions),redFlags:s(d.redFlags),sourceLinks:s(d.sourceLinks),lastChecked:d.lastChecked||'',reviewedBy:s(d.reviewedBy),confirmedByDonor:d.confirmedByDonor==='true',notes:s(d.notes)});
 stamp(p);
 if(!existing)db.profiles.push(p);
 dlg='';save('Profile saved.');
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Donor Reference Guide',['Deep-reference library. Every fact needs a source, date and reviewer.']),
  metaSheet(db.meta),
  {name:'Profiles',rows:[['Code','Name','Type','Country','Website','Focus areas','Eligibility','Ineligible','Restricted activities','Typical grant','Core funding','Indirect cost limit','Payment terms','Decision cycles','Application format','Reporting format','Reporting frequency','Due diligence','Key contacts','Relationship history','Past decisions','Red flags','Source links','Last checked','Reviewed by','Confirmed by donor','Notes'],...(withData?db.profiles.map(p=>[p.code,p.name,p.type,p.country,p.website,p.focusAreas,p.eligibility,p.ineligible,p.restrictedActivities,p.typicalGrantSize,p.coreFunding,p.indirectCostLimit,p.paymentTerms,p.decisionCycles,p.applicationFormat,p.reportingFormat,p.reportingFrequency,p.dueDiligence,p.keyContacts,p.relationshipHistory,p.pastDecisions,p.redFlags,p.sourceLinks,p.lastChecked,p.reviewedBy,p.confirmedByDonor?'Yes':'No',p.notes]):[])]},
  schemaSheet({Profiles:'code,name,type,country,website,focusAreas,eligibility,ineligible,restrictedActivities,typicalGrantSize,coreFunding,indirectCostLimit,paymentTerms,decisionCycles,applicationFormat,reportingFormat,reportingFrequency,dueDiligence,keyContacts,relationshipHistory,pastDecisions,redFlags,sourceLinks,lastChecked,reviewedBy,confirmedByDonor,notes'})
 ];
 return buildXlsx(sheets);
}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const rows=rowsToObjects(findSheet(data,'Profiles'));if(rows?.length)db.profiles=rows.map(r=>({...blankProfile(),code:r.Code||'',name:r.Name||'',type:r.Type||'Foundation',country:r.Country||'',website:r.Website||'',focusAreas:r['Focus areas']||'',eligibility:r.Eligibility||'',ineligible:r.Ineligible||'',restrictedActivities:r['Restricted activities']||'',typicalGrantSize:r['Typical grant']||'',coreFunding:r['Core funding']||'',indirectCostLimit:r['Indirect cost limit']||'',paymentTerms:r['Payment terms']||'',decisionCycles:r['Decision cycles']||'',applicationFormat:r['Application format']||'',reportingFormat:r['Reporting format']||'',reportingFrequency:r['Reporting frequency']||'',dueDiligence:r['Due diligence']||'',keyContacts:r['Key contacts']||'',relationshipHistory:r['Relationship history']||'',pastDecisions:r['Past decisions']||'',redFlags:r['Red flags']||'',sourceLinks:r['Source links']||'',lastChecked:r['Last checked']||'',reviewedBy:r['Reviewed by']||'',confirmedByDonor:r['Confirmed by donor']==='Yes'||r['Confirmed by donor']===true,notes:r.Notes||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}

function render(){
 const views={'Start':startView,'Profiles':profilesView,'Reference standard':referenceStandardView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Funding · Donor reference guide',title:'Donor Reference Guide',intro:'Deep-reference library per donor. Every rule, cycle, format and payment term in one place, with the source link and date checked, so fundraisers never fly blind.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=11&lesson=institutional',label:'Review Module 11'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
