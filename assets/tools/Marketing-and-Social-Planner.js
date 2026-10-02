/* Marketing & Social Planner — content calendar for communications.
   Campaigns (grouping) + posts (individual pieces with channel, scheduled
   date, content, status). Posts can be tagged with the ESO they advance so
   leadership can see communications effort against strategic objectives.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-marketing-v2';
const SO_KEY='mission-method-strategic-objectives-v2';
const TABS=['Start','Calendar','Campaigns','Posts','Export'];
const CHANNELS=['LinkedIn','Twitter / X','Instagram','Facebook','TikTok','YouTube','Blog','Email newsletter','Press release','Partner comms','Internal','Other'];
const CONTENT_TYPES=['Story','Impact update','Fundraising ask','Event promo','Thought leadership','Partner spotlight','Behind the scenes','Recruitment','Policy brief','Research','Other'];
const POST_STATUS=['Idea','Drafting','Review','Scheduled','Published','Cancelled'];
const CAMPAIGN_STATUS=['Planning','Live','Paused','Ended'];

const blankCampaign=()=>({id:uid(),code:'',name:'',goal:'',esoCodes:'',start:'',end:'',owner:'',status:'Planning',budget:0,targetAudience:'',keyMessages:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankPost=()=>({id:uid(),code:'',campaignCode:'',channel:'LinkedIn',contentType:'Impact update',title:'',hook:'',body:'',cta:'',scheduledFor:'',publishedOn:'',status:'Idea',esoCodes:'',owner:'',assets:'',tags:'',link:'',metrics:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',voice:'',notes:''});
const blank=()=>({version:2,meta:blankMeta(),campaigns:[],posts:[]});

const storage=S.store({key:KEY,version:2,blank,legacy:[],normalise:d=>{d=window.MMExample?.cleanupStaleExample?.(d,'mm.marketing-cleanup-v2',blank)||d;if(!Array.isArray(d.campaigns))d.campaigns=[];if(!Array.isArray(d.posts))d.posts=[];return d}});
let db=storage.load(),tab='Start',dlg='',message='';
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soList=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const nextCode=(prefix,arr)=>{const nums=arr.map(x=>Number(String(x.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return prefix+(Math.max(0,...nums)+1)};
const isOverdue=d=>d&&d<today();

function startView(){
 const m=db.meta;
 const live=db.campaigns.filter(c=>c.status==='Live').length;
 const scheduled=db.posts.filter(p=>p.status==='Scheduled').length;
 const needsAttention=db.posts.filter(p=>p.status==='Scheduled'&&isOverdue(p.scheduledFor)).length;
 const published=db.posts.filter(p=>p.status==='Published').length;
 const esos=soList().length;
 return `${window.MMExample?.renderIntegration?.('marketing')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Your workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <p class="work-hint">Campaign-level grouping + post-level calendar. Tag each post with the ESO it advances so leadership can see communications effort against strategic objectives.</p>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Brand voice / editorial principles</span><textarea data-field="voice" placeholder="Tone of voice, red lines, do's and don'ts for every piece of content.">${esc(m.voice)}</textarea></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes">${esc(m.notes)}</textarea></label>
   </div>
   <div class="grid four" style="margin:14px 0 10px">
    ${card('Live campaigns',live,'Currently running')}
    ${card('Scheduled posts',scheduled,'Ready to publish')}
    ${card('Overdue scheduled',needsAttention,'Scheduled date passed',needsAttention>0)}
    ${card('Published',published,'All time')}
   </div>
   ${esos?'':'<div class="notice warn">No strategic objectives found yet. Open Strategic Objectives first — posts can be tagged by ESO once they exist.</div>'}
   <div class="work-sect-head">
    <h3>Get started</h3>
    <p class="tiny">Group related posts under a campaign (e.g. "End-of-year appeal 2026") then add individual posts with channel, scheduled date, hook, body, call-to-action and ESO tags.</p>
   </div>
   <div class="actions">
    <button class="button" data-action="new-campaign">+ Add a campaign</button>
    <button class="button" data-action="new-post">+ Add a post</button>
    <a class="button secondary" href="#" data-tab="Calendar">Calendar →</a>
    <a class="button secondary" href="#" data-tab="Campaigns">Campaigns →</a>
    <a class="button secondary" href="#" data-tab="Posts">Posts →</a>
   </div>
  </section>`;
}

function calendarView(){
 const year=Number(db.meta.year)||currentYear;
 const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 const byMonth={};for(let i=0;i<12;i++)byMonth[i]=[];
 db.posts.forEach(p=>{if(!p.scheduledFor)return;const d=new Date(p.scheduledFor);if(d.getFullYear()!==year)return;byMonth[d.getMonth()].push(p)});
 const monthBlocks=months.map((m,i)=>{
  const posts=byMonth[i].sort((a,b)=>(a.scheduledFor||'').localeCompare(b.scheduledFor||''));
  return `<section class="panel calendar-month"><h3 style="margin-bottom:8px">${esc(m)} <span class="muted" style="font-size:12px;font-weight:400">${posts.length} post${posts.length===1?'':'s'}</span></h3>${posts.length?`<ul style="list-style:none;padding:0;margin:0;display:grid;gap:6px">${posts.map(p=>`<li class="cal-post ${p.status==='Published'?'is-published':p.status==='Scheduled'?'is-scheduled':'is-draft'}"><button class="link" data-action="edit-post" data-id="${esc(p.id)}" style="text-align:left;padding:0;color:inherit"><div class="cal-post-head"><span class="cal-date">${esc(fmtDate(p.scheduledFor).slice(5))||'—'}</span>${pill(p.channel)}</div><b>${esc(p.title||'Untitled')}</b>${p.esoCodes?`<small class="muted"> · ${esc(p.esoCodes)}</small>`:''}</button></li>`).join('')}</ul>`:'<p class="muted" style="margin:0">No posts.</p>'}</section>`;
 });
 return `<div class="rowhead section-head"><div><h2>${year} content calendar</h2><p>Posts grouped by month using their scheduled date. Click any post to open its full record.</p></div><button class="button" data-action="new-post">+ Add a post</button></div>
  <div class="calendar-grid">${monthBlocks.join('')}</div>`;
}

function campaignsView(){
 const sorted=[...db.campaigns].sort((a,b)=>(a.start||'').localeCompare(b.start||''));
 const rows=sorted.map(c=>{const posts=db.posts.filter(p=>p.campaignCode===c.code);return `<tr><td><b>${esc(c.code)}</b></td><td><b>${esc(c.name||'Untitled')}</b>${c.goal?`<br><small>${esc(c.goal)}</small>`:''}</td><td>${esc(c.esoCodes||'—')}</td><td>${esc(fmtDate(c.start)||'')} → ${esc(fmtDate(c.end)||'')}</td><td>${esc(c.owner||'—')}</td><td>${pill(c.status)}</td><td>${posts.length}</td><td><div class="row-actions"><button class="link" data-action="edit-campaign" data-id="${esc(c.id)}">Edit</button></div></td></tr>`});
 return `<div class="rowhead section-head"><div><h2>Campaigns</h2><p>Group related posts under a campaign (e.g. end-of-year appeal, World Water Day). Each campaign can be tagged with the ESOs it advances.</p></div><button class="button" data-action="new-campaign">+ Add a campaign</button></div>
  ${table(['Code','Campaign','ESOs','Period','Owner','Status','Posts',''],rows,'No campaigns yet.')}`;
}

function postsView(){
 const sorted=[...db.posts].sort((a,b)=>(b.scheduledFor||'').localeCompare(a.scheduledFor||''));
 const rows=sorted.map(p=>`<tr><td><b>${esc(p.code)}</b></td><td><b>${esc(p.title||'Untitled')}</b>${p.hook?`<br><small>${esc(p.hook)}</small>`:''}</td><td>${esc(p.campaignCode||'—')}</td><td>${pill(p.channel)}</td><td>${esc(p.contentType)}</td><td>${esc(fmtDate(p.scheduledFor)||'—')}</td><td>${pill(p.status)}</td><td>${esc(p.esoCodes||'—')}</td><td><div class="row-actions"><button class="link" data-action="edit-post" data-id="${esc(p.id)}">Edit</button></div></td></tr>`);
 return `<div class="rowhead section-head"><div><h2>All posts</h2><p>Every post across every campaign, newest first.</p></div><button class="button" data-action="new-post">+ Add a post</button></div>
  ${table(['Code','Title','Campaign','Channel','Type','Scheduled','Status','ESOs',''],rows,'No posts yet.')}`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Campaigns — grouping records</li><li>Posts — the full content calendar</li><li>Meta — organisation / year / brand voice</li></ul></section>`}

// ---------- Modals ----------
function campaignModal(c){
 const isNew=!c;c=c||blankCampaign();
 const esoOpts=soList().map(o=>o.code);
 const chips=esoOpts.length?`<p class="tiny" style="margin:0 0 4px">ESO chips: ${esoOpts.map(code=>`<button type="button" class="link" data-eso-chip="${esc(code)}">${esc(code)}</button>`).join(' · ')}</p>`:'';
 return modal(isNew?'Add campaign':'Edit campaign',`<form data-form="campaign" data-id="${esc(c.id||'')}" class="form">
  ${field('Code','code',c.code||nextCode('C',db.campaigns),'text','required')}
  ${field('Campaign name','name',c.name,'text','required')}
  ${area('Goal — what success looks like','goal',c.goal)}
  <label class="field full"><span class="label">ESOs this campaign advances</span>${chips}<input name="esoCodes" value="${esc(c.esoCodes)}" placeholder="e.g. ESO1, ESO2" data-eso-target></label>
  ${field('Start date','start',c.start,'date')}
  ${field('End date','end',c.end,'date')}
  ${field('Owner','owner',c.owner)}
  ${field('Budget','budget',c.budget,'number','step="any" min="0"')}
  ${select('Status','status',CAMPAIGN_STATUS,c.status||'Planning')}
  ${area('Target audience','targetAudience',c.targetAudience)}
  ${area('Key messages','keyMessages',c.keyMessages)}
  ${area('Notes','notes',c.notes)}
  ${formEnd('Save campaign',{deleteId:isNew?'':c.id,deleteLabel:'Delete campaign'})}
 </form>`);
}

function postModal(p){
 const isNew=!p;p=p||blankPost();
 const campOpts=db.campaigns.map(c=>[c.code,`${c.code} · ${c.name}`]);
 const esoOpts=soList().map(o=>o.code);
 const esoChips=esoOpts.length?`<p class="tiny" style="margin:0 0 4px">ESO chips: ${esoOpts.map(code=>`<button type="button" class="link" data-eso-chip="${esc(code)}">${esc(code)}</button>`).join(' · ')}</p>`:'';
 return modal(isNew?'Add post':'Edit post',`<form data-form="post" data-id="${esc(p.id||'')}" class="form">
  ${field('Code','code',p.code||nextCode('P',db.posts),'text','required')}
  ${field('Title','title',p.title,'text','required')}
  ${campOpts.length?select('Campaign','campaignCode',campOpts,p.campaignCode,'','Standalone post'):''}
  ${select('Channel','channel',CHANNELS,p.channel)}
  ${select('Content type','contentType',CONTENT_TYPES,p.contentType)}
  ${field('Scheduled date','scheduledFor',p.scheduledFor,'date')}
  ${field('Published on','publishedOn',p.publishedOn,'date')}
  ${select('Status','status',POST_STATUS,p.status||'Idea')}
  ${field('Owner','owner',p.owner)}
  <label class="field full"><span class="label">ESOs this post advances</span>${esoChips}<input name="esoCodes" value="${esc(p.esoCodes)}" placeholder="e.g. ESO1, ESO3" data-eso-target></label>
  ${area('Hook — the opening line','hook',p.hook)}
  ${area('Body','body',p.body)}
  ${area('Call to action (CTA)','cta',p.cta)}
  ${field('Link','link',p.link,'url')}
  ${area('Assets needed (photos, video, graphics)','assets',p.assets)}
  ${field('Tags','tags',p.tags,'text','','Comma-separated.')}
  ${area('Performance metrics (after publication)','metrics',p.metrics)}
  ${area('Notes','notes',p.notes)}
  ${formEnd('Save post',{deleteId:isNew?'':p.id,deleteLabel:'Delete post'})}
 </form>`);
}

function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-campaign'){dlg=campaignModal();render();return}
 if(a==='edit-campaign'){const c=db.campaigns.find(x=>x.id===id);if(c){dlg=campaignModal(c);render()}return}
 if(a==='new-post'){dlg=postModal();render();return}
 if(a==='edit-post'){const p=db.posts.find(x=>x.id===id);if(p){dlg=postModal(p);render()}return}
 if(a==='delete'){const c=db.campaigns.find(x=>x.id===id),p=db.posts.find(x=>x.id===id);if(c){if(!confirm('Delete this campaign? Its posts stay by code reference.'))return;db.campaigns=db.campaigns.filter(x=>x.id!==id)}else if(p){if(!confirm('Delete this post?'))return;db.posts=db.posts.filter(x=>x.id!==id)}else return;dlg='';save('Deleted.');return}
 if(a==='xlsx'){try{download('Method-into-Impact-marketing.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){downloadCsv();return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-marketing.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-marketing-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function submit(form){
 const kind=form.dataset.form,d=formData(form);
 if(kind==='campaign'){const existing=db.campaigns.find(c=>c.id===form.dataset.id);const c=existing||{...blankCampaign()};Object.assign(c,{code:s(d.code)||c.code||nextCode('C',db.campaigns),name:s(d.name),goal:s(d.goal),esoCodes:s(d.esoCodes),start:d.start||'',end:d.end||'',owner:s(d.owner),budget:Number(d.budget)||0,status:d.status,targetAudience:s(d.targetAudience),keyMessages:s(d.keyMessages),notes:s(d.notes)});stamp(c);if(!existing)db.campaigns.push(c);dlg='';save('Campaign saved.');return}
 if(kind==='post'){const existing=db.posts.find(p=>p.id===form.dataset.id);const p=existing||{...blankPost()};Object.assign(p,{code:s(d.code)||p.code||nextCode('P',db.posts),campaignCode:s(d.campaignCode),title:s(d.title),channel:d.channel,contentType:d.contentType,scheduledFor:d.scheduledFor||'',publishedOn:d.publishedOn||'',status:d.status,owner:s(d.owner),esoCodes:s(d.esoCodes),hook:s(d.hook),body:s(d.body),cta:s(d.cta),link:s(d.link),assets:s(d.assets),tags:s(d.tags),metrics:s(d.metrics),notes:s(d.notes)});stamp(p);if(!existing)db.posts.push(p);dlg='';save('Post saved.');return}
}

function buildWorkbook(withData){
 const sheets=[
  readmeSheet('Marketing & Social Planner',['Campaign-level grouping and post-level content calendar.']),
  metaSheet(db.meta),
  {name:'Campaigns',rows:[['Code','Name','Goal','ESOs','Start','End','Owner','Budget','Status','Target audience','Key messages','Notes'],...(withData?db.campaigns.map(c=>[c.code,c.name,c.goal,c.esoCodes,c.start,c.end,c.owner,c.budget,c.status,c.targetAudience,c.keyMessages,c.notes]):[])]},
  {name:'Posts',rows:[['Code','Campaign','Title','Channel','Type','Scheduled','Published','Status','ESOs','Owner','Hook','Body','CTA','Link','Assets','Tags','Metrics','Notes'],...(withData?db.posts.map(p=>[p.code,p.campaignCode,p.title,p.channel,p.contentType,p.scheduledFor,p.publishedOn,p.status,p.esoCodes,p.owner,p.hook,p.body,p.cta,p.link,p.assets,p.tags,p.metrics,p.notes]):[])]},
  schemaSheet({Campaigns:'code,name,goal,esoCodes,start,end,owner,budget,status,targetAudience,keyMessages,notes',Posts:'code,campaignCode,title,channel,contentType,scheduledFor,publishedOn,status,esoCodes,owner,hook,body,cta,link,assets,tags,metrics,notes'})
 ];
 return buildXlsx(sheets);
}
function downloadCsv(){download('Method-into-Impact-marketing.csv',csv([['Code','Title','Campaign','Channel','Type','Scheduled','Status','ESOs'],...db.posts.map(p=>[p.code,p.title,p.campaignCode,p.channel,p.contentType,p.scheduledFor,p.status,p.esoCodes])]),'text/csv;charset=utf-8')}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const cRows=rowsToObjects(findSheet(data,'Campaigns'));const pRows=rowsToObjects(findSheet(data,'Posts'));if(cRows?.length)db.campaigns=cRows.map(r=>({...blankCampaign(),code:r.Code||'',name:r.Name||'',goal:r.Goal||'',esoCodes:r.ESOs||'',start:r.Start||'',end:r.End||'',owner:r.Owner||'',budget:Number(r.Budget)||0,status:r.Status||'Planning',targetAudience:r['Target audience']||'',keyMessages:r['Key messages']||'',notes:r.Notes||''}));if(pRows?.length)db.posts=pRows.map(r=>({...blankPost(),code:r.Code||'',campaignCode:r.Campaign||'',title:r.Title||'',channel:r.Channel||'LinkedIn',contentType:r.Type||'Impact update',scheduledFor:r.Scheduled||'',publishedOn:r.Published||'',status:r.Status||'Idea',esoCodes:r.ESOs||'',owner:r.Owner||'',hook:r.Hook||'',body:r.Body||'',cta:r.CTA||'',link:r.Link||'',assets:r.Assets||'',tags:r.Tags||'',metrics:r.Metrics||'',notes:r.Notes||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{const d=JSON.parse(await file.text());if(!d||d.version!==2)throw new Error('Not a v2 backup');db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function wireStart(root){
 const box=root.querySelector('.work-box');
 if(box){const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()})})}
 root.querySelectorAll('[data-eso-chip]').forEach(c=>c.addEventListener('click',()=>{const inp=root.querySelector('[data-eso-target]');if(!inp)return;const code=c.dataset.esoChip;const parts=(inp.value||'').split(/\s*,\s*/).filter(Boolean);if(!parts.includes(code))parts.push(code);inp.value=parts.join(', ')}));
}

function render(){
 const views={'Start':startView,'Calendar':calendarView,'Campaigns':campaignsView,'Posts':postsView,'Export':exportViewPanel};
 root.innerHTML=shell({eyebrow:'Communications · Marketing & social planner',title:'Marketing & Social Planner',intro:'Campaign-level grouping and post-level content calendar. Each piece can be tagged with the ESO it advances so communications effort is visible against strategic objectives.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=8&lesson=content',label:'Review Module 8'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';render()},action,submit,importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
}

persist(db);render();
})();
