(()=>{'use strict';
const S=window.MMSuite,{esc,uid,fmtDate,monthsSince,clamp,currentYear,money,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,s,stamp}=S;
const root=document.querySelector('#app');
const WORKBOOK='mission-method-gantt-project-planner',FILE='Mission-and-Method-gantt-project-plan';
const TABS=['Start','Timeline','Tasks','Capacity','Review','Export'];
const LEVELS=['Strategic objective','Subcategory','Activity','Sub-activity','Task','Milestone'],GROUP_LEVELS=['Strategic objective','Subcategory'],PRIORITY=['High','Normal','Low'];
const isGroup=t=>GROUP_LEVELS.includes(t.level);

// ---------- data model (v2) ----------
const blankTask=()=>({id:uid(),code:'',level:'Activity',parentCode:'',title:'',owner:'',status:'Planned',priority:'Normal',start:'',finish:'',progress:0,dependsOn:'',budget:'',notes:'',lastEditedBy:'',lastEditedAt:''});
const blank=()=>({version:2,meta:{project:'',organisation:'',year:currentYear,preparedBy:'',reviewDate:'',currency:'',notes:''},tasks:[],reviews:[]});
const STAGE={'Not started':'Planned','Researched':'In progress','Drafted':'In progress','In progress':'In progress','Blocked':'At risk','Completed':'Completed','Future':'Planned'};
function migrateV1(v1){
 const out=blank(),code=new Map();out.meta.project=v1.project||'';out.meta.year=Number(v1.year)||currentYear;
 (v1.tasks||[]).forEach((t,i)=>code.set(t.id,'T'+(i+1)));
 out.tasks=(v1.tasks||[]).map((t,i)=>{const stage=t.status&&!S.STATUSES.includes(t.status)&&STAGE[t.status]!==t.status?`Stage in the previous version: ${t.status}.`:'';return {...blankTask(),code:'T'+(i+1),level:LEVELS.includes(t.level)?t.level:'Activity',parentCode:code.get(t.parentId)||'',title:t.title||'Untitled',owner:t.owner||'',status:STAGE[t.status]||(S.STATUSES.includes(t.status)?t.status:'Planned'),priority:PRIORITY.includes(t.priority)?t.priority:'Normal',start:t.start||'',finish:t.finish||'',progress:clamp(t.progress),dependsOn:code.get(t.dependency)||'',budget:t.budget??'',notes:[t.notes,stage].filter(Boolean).join(' ')}});
 return out;
}
const normalise=d=>{if(!Array.isArray(d.tasks))d.tasks=[];if(!Array.isArray(d.reviews))d.reviews=[];d.reviews.forEach(r=>{if(!Array.isArray(r.decisions))r.decisions=[]});return d};
const storage=S.store({key:'mission-method-gantt-v2',version:2,blank,legacy:[{key:'mm.gantt-project.v1',migrate:migrateV1}],normalise});
let db=storage.load();
let tab='Start',dlg='',message='',view='Months',ownerFilter='',statusFilter='';

// ---------- helpers ----------
const byCode=c=>db.tasks.find(t=>t.code===c);
const today=()=>S.today();
const days=t=>t.start&&t.finish?Math.round((new Date(t.finish)-new Date(t.start))/86400000)+1:'';
const children=t=>db.tasks.filter(x=>x.parentCode===t.code);
function rollup(t){const k=children(t);if(!k.length)return clamp(t.progress);return Math.round(k.reduce((n,x)=>n+rollup(x),0)/k.length)}
function span(t){const k=children(t);if(!k.length||(t.start&&t.finish))return [t.start,t.finish];const ds=k.map(span).filter(([a,b])=>a&&b);if(!ds.length)return [t.start,t.finish];return [ds.map(d=>d[0]).sort()[0],ds.map(d=>d[1]).sort().at(-1)]}
const overdue=t=>!isGroup(t)&&t.finish&&t.status!=='Completed'&&t.finish<today();
const conflict=t=>{const d=byCode(t.dependsOn);return d&&d.finish&&t.start&&t.start<=d.finish&&d.code!==t.code};
function ordered(){const out=[],seen=new Set();const add=(t,depth)=>{if(seen.has(t.id))return;seen.add(t.id);out.push({t,depth});db.tasks.filter(x=>x.parentCode===t.code&&x.code).forEach(x=>add(x,depth+1))};db.tasks.filter(t=>!t.parentCode||!byCode(t.parentCode)).forEach(t=>add(t,0));db.tasks.forEach(t=>add(t,0));return out}
const nextCode=()=>{const used=new Set(db.tasks.map(t=>t.code));let i=1;while(used.has('T'+i))i++;return 'T'+i};
const leafs=()=>db.tasks.filter(t=>!isGroup(t));
const avg=()=>{const l=leafs();return l.length?Math.round(l.reduce((n,t)=>n+clamp(t.progress),0)/l.length):0};
function save(note='Saved in this browser.'){storage.save(db);message=note;render()}
const flags=t=>`${overdue(t)?pill('Overdue'):''}${conflict(t)?` ${pill('Dependency clash')}`:''}`;

// ---------- example ----------
function makeExample(){
 const d=blank(),y=d.meta.year,D=(m,dd)=>`${y}-${String(m).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
 Object.assign(d.meta,{project:`Annual plan ${y}`,organisation:'Example organisation',currency:'USD'});
 const T=(code,level,parentCode,title,owner,start,finish,progress,status,dependsOn='',budget='')=>({...blankTask(),code,level,parentCode,title,owner,start,finish,progress,status,dependsOn,budget});
 d.tasks=[T('ESO1','Strategic objective','','Reach more community organisations with practical training','Programme lead','','',0,'In progress'),
  T('AP1','Activity','ESO1','Run three training cohorts','Programme lead',D(2,1),D(11,28),45,'In progress','',24000),
  T('T1','Task','AP1','Recruit cohort 1','Programme officer',D(2,1),D(2,28),100,'Completed'),
  T('T2','Task','AP1','Deliver cohort 1','Trainer',D(3,1),D(5,31),100,'Completed','T1'),
  T('T3','Task','AP1','Deliver cohort 2','Trainer',D(6,1),D(8,31),80,'In progress','T2'),
  T('M1','Milestone','AP1','Cohort 3 graduation','Programme lead',D(11,28),D(11,28),0,'Planned','T3'),
  T('ESO2','Strategic objective','','Diversify income','Director','','',0,'At risk'),
  T('AP3','Activity','ESO2','Apply to five new aligned funders','Director',D(1,15),D(9,15),60,'At risk','',2000),
  T('AP4','Activity','ESO2','Individual giving pilot','Communications lead',D(7,1),D(12,15),10,'In progress','AP3',5000),
  T('ISO1','Strategic objective','','Build reliable monitoring and learning','MEAL officer','','',0,'On track'),
  T('AP5','Activity','ISO1','Quarterly data review routine','MEAL officer',D(1,1),D(12,31),50,'On track','',500)];
 d.reviews=[{id:uid(),date:D(7,5),period:'Q2',reviewer:'Leadership team',summary:'Training on schedule; funder applications behind.',decisions:[{id:uid(),decision:'Start the giving pilot even if applications slip',action:'Confirm pilot budget',owner:'Director',due:D(7,20),status:'Done'}],snapshot:null}];
 return d;
}

// ---------- views ----------
function dashboard(){
 const l=leafs(),late=l.filter(overdue).length,clash=l.filter(conflict).length,noOwner=l.filter(t=>!t.owner).length,soon=db.tasks.filter(t=>t.level==='Milestone'&&t.finish>=today()&&(new Date(t.finish)-new Date())/86400000<=31);
 const last=S.sortedReviews(db.reviews)[0]?.date||'',m=monthsSince(last),budget=l.reduce((n,t)=>n+(Number(t.budget)||0),0);
 return `<section class="panel"><span class="eyebrow">Overview · ${esc(db.meta.year)}</span><h2>Project at a glance</h2><div class="grid four">${card('Items',db.tasks.length,`${db.tasks.filter(isGroup).length} groups · ${l.length} activities and tasks`)}${card('Average progress',avg()+'%','',false,bar(avg()))}${card('Overdue',late,'Past their finish date and not completed',late>0)}${card('Since last review',m===null?'—':m+' mo',last?fmtDate(last):'No review recorded yet',m!==null&&m>3)}</div><div class="grid four" style="margin-top:12px">${card('Dependency clashes',clash,'Starts before the item it depends on finishes',clash>0)}${card('Without an owner',noOwner,'',noOwner>0)}${card('Milestones in the next 31 days',soon.length,soon.map(t=>t.title).slice(0,2).join(' · '))}${card('Budget',money(budget,db.meta.currency),'Sum of activity and task budgets')}</div></section>`;
}
function start(){const m=db.meta;const sk=readStore('mission-method-strategy-kpis-v2');const skInits=(sk?.initiatives||[]).length;const importedInit=db.tasks.filter(t=>t.code&&t.code.startsWith('AP')).length;return `${window.MMExample?.renderIntegration?.('gantt')||''}${dashboard()}<div class="notice">Group work under strategic objectives, then add activities, tasks and milestones beneath them. Give each item an owner and dates; link it to the item it depends on. The <b>Capacity</b> tab shows who's overloaded this month.</div><section class="panel"><h2>Project context</h2><form data-form="meta" class="form">${field('Project or plan name','project',m.project)}${field('Organisation','organisation',m.organisation)}${field('Planning year','year',m.year,'number','min="2000" max="2200"','The timeline shows this year.')}${field('Currency','currency',m.currency,'text','maxlength="12" placeholder="e.g. USD, EUR, KES"')}${field('Prepared by','preparedBy',m.preparedBy)}${field('Next review','reviewDate',m.reviewDate,'date')}${area('Notes','notes',m.notes)}<div class="actions"><button class="button" type="submit">Save project context</button></div></form></section><section class="panel"><h2>Get started</h2><div class="actions">${skInits?`<button class="button" data-action="import-sk-initiatives">↙ Import ${skInits} initiative${skInits===1?'':'s'} from Strategy KPIs${importedInit?` (${importedInit} already here)`:''}</button>`:''}<button class="button ${skInits?'secondary':''}" data-action="add" data-level="Strategic objective">+ Add objective group</button><button class="button secondary" data-action="add">+ Add activity</button>${S.importButtons('Load example plan')}</div><p class="tiny">Import Excel accepts this tool's workbook (replaces everything) or a Strategy KPIs workbook (adds its objectives and annual plan). The dedicated button above is faster — it pulls initiatives already in this browser without a file.</p></section>`}
function readStore(k){try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}}

// Pull initiatives from Strategy KPIs; each becomes a Gantt activity.
// Objective code becomes a parent group row. Idempotent: updates by code.
function importStrategyKpis(){
 const sk=readStore('mission-method-strategy-kpis-v2');
 if(!sk||!sk.initiatives?.length){message='No initiatives found in Strategy KPIs. Open that tool first.';render();return}
 const objCodes=new Set(sk.initiatives.map(i=>i.objectiveCode).filter(Boolean));
 let added=0,updated=0;
 // Make sure each objective exists as a Strategic objective parent row
 objCodes.forEach(code=>{
  let g=db.tasks.find(t=>t.code===code&&t.level==='Strategic objective');
  if(!g){const soTitle=(readStore('mission-method-strategic-objectives-v2')?.objectives||[]).find(o=>o.code===code)?.title||code;
   g={...blankTask(),code,level:'Strategic objective',title:`${code} · ${soTitle}`};
   db.tasks.push(g);added++}
 });
 // Each initiative becomes an Activity under its objective
 sk.initiatives.forEach(init=>{
  const code=init.code||'AP?';
  let t=db.tasks.find(x=>x.code===code);
  const base={code,level:'Activity',parentCode:init.objectiveCode||'',title:init.title||'Untitled initiative',owner:init.owner||'',status:init.status||'Planned',start:init.start||'',finish:init.end||'',progress:Number(init.progress)||0,budget:init.budget||'',notes:init.notes||init.annualOutcome||''};
  if(t){Object.assign(t,base);stamp(t);updated++}else{t={...blankTask(),...base};stamp(t);db.tasks.push(t);added++}
 });
 save(`Strategy KPIs initiatives imported — ${added} new, ${updated} refreshed. Edit on the Timeline tab.`);
}

// Capacity view — simple month-by-owner heat-grid summing committed days.
function capacityView(){
 const year=Number(db.meta.year)||currentYear;
 const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 // Collect every leaf task with dates and owner
 const items=db.tasks.filter(t=>!isGroup(t)&&t.owner&&t.start&&t.finish);
 const owners=[...new Set(items.map(t=>t.owner))].sort();
 const workingDaysInMonth=(y,m)=>{let n=0;const d=new Date(y,m,1);while(d.getMonth()===m){const dow=d.getDay();if(dow!==0&&dow!==6)n++;d.setDate(d.getDate()+1)}return n};
 const daysInRange=(t,y,m)=>{const start=new Date(Math.max(new Date(t.start),new Date(y,m,1))),end=new Date(Math.min(new Date(t.finish),new Date(y,m+1,0)));if(start>end)return 0;let n=0;const d=new Date(start);while(d<=end){const dow=d.getDay();if(dow!==0&&dow!==6)n++;d.setDate(d.getDate()+1)}return n};
 // Days committed per owner per month (assumes full-time; multiply by effort% later)
 const grid=owners.map(o=>({owner:o,months:months.map((_,m)=>{let total=0;const taskList=[];items.filter(t=>t.owner===o).forEach(t=>{const d=daysInRange(t,year,m);if(d>0){total+=d;taskList.push(`${t.code||'·'} ${t.title.slice(0,32)} (${d}d)`)}});return {total,working:workingDaysInMonth(year,m),tasks:taskList}})}));
 const limit=85; // overload-tight threshold (% of working days)
 const colour=pct=>pct>=100?'cap-over':pct>=limit?'cap-tight':pct>=50?'cap-ok':pct>0?'cap-light':'cap-empty';
 const headerCells=months.map((m,i)=>`<th class="cap-h">${m}<br><small>${workingDaysInMonth(year,i)}d</small></th>`).join('');
 const rows=grid.length?grid.map(g=>`<tr><th class="cap-owner">${esc(g.owner)}</th>${g.months.map(cell=>{const pct=cell.working?Math.round((cell.total/cell.working)*100):0;return `<td class="cap-cell ${colour(pct)}" title="${esc(cell.tasks.join('\n'))||'No commitments'}"><div class="cap-val">${cell.total||'·'}</div><div class="cap-pct">${cell.working&&cell.total?pct+'%':''}</div></td>`}).join('')}</tr>`).join(''):`<tr><td colspan="13" class="cap-empty-row">No tasks with an owner and start/finish date yet. Add owners and dates to see capacity.</td></tr>`;
 const overloaded=grid.flatMap(g=>g.months.map((cell,m)=>({owner:g.owner,month:months[m],pct:cell.working?Math.round((cell.total/cell.working)*100):0}))).filter(x=>x.pct>=limit);
 return `<div class="rowhead section-head"><div><h2>Capacity · who's overloaded this month?</h2><p>Working days each owner is committed to this year, by month. Working days assume Mon–Fri; percentage is committed days ÷ available working days. Hover any cell to see which tasks make up the total.</p></div></div>
  ${overloaded.length?`<div class="notice warn"><b>${overloaded.length} overload warning${overloaded.length===1?'':'s'}:</b> ${overloaded.slice(0,6).map(x=>esc(x.owner)+' in '+x.month+' ('+x.pct+'%)').join(' · ')}${overloaded.length>6?' and '+(overloaded.length-6)+' more':''}. Spread work across months or reassign tasks.</div>`:''}
  <section class="panel"><div class="tablewrap"><table class="cap-table"><thead><tr><th class="cap-owner">Owner</th>${headerCells}</tr></thead><tbody>${rows}</tbody></table></div>
  <div class="cap-legend"><span class="cap-swatch cap-empty"></span> No work <span class="cap-swatch cap-light"></span> &lt; 50% <span class="cap-swatch cap-ok"></span> 50–${limit-1}% <span class="cap-swatch cap-tight"></span> ${limit}–99% (tight) <span class="cap-swatch cap-over"></span> ≥ 100% (overloaded)</div></section>`;
}

function periods(){const y=Number(db.meta.year)||currentYear;return view==='Quarters'?[0,1,2,3].map(i=>({label:'Q'+(i+1),a:`${y}-${String(i*3+1).padStart(2,'0')}-01`,b:new Date(Date.UTC(y,i*3+3,0)).toISOString().slice(0,10)})):Array.from({length:12},(_,i)=>({label:new Date(y,i,1).toLocaleString(undefined,{month:'short'}),a:`${y}-${String(i+1).padStart(2,'0')}-01`,b:new Date(Date.UTC(y,i+1,0)).toISOString().slice(0,10)}))}
function timelineTable(rows,interactive=true){
 const ps=periods(),t0=today();
 return `<div class="tablewrap gantt"><table><thead><tr><th>Objective / activity</th><th>Owner</th><th>Status</th>${ps.map(p=>`<th class="slot-h ${t0>=p.a&&t0<=p.b?'now':''}">${esc(p.label)}</th>`).join('')}</tr></thead><tbody>${rows.map(({t,depth})=>{const [a,b]=span(t),prog=isGroup(t)?rollup(t):clamp(t.progress);return `<tr class="${isGroup(t)?'group':''}"><td style="padding-left:${10+depth*16}px">${interactive?`<button class="link" data-action="edit" data-id="${t.id}">${esc(t.code)} · ${esc(t.title)}</button>`:`<b>${esc(t.code)}</b> · ${esc(t.title)}`}<div class="tiny">${esc(t.level)}${a?` · ${esc(fmtDate(a))} → ${esc(fmtDate(b))}`:''}</div>${interactive?flags(t):''}</td><td>${esc(t.owner||'—')}</td><td>${pill(t.status)}</td>${(()=>{const on=ps.map(p=>a&&b&&a<=p.b&&b>=p.a),first=on.indexOf(true),last=on.lastIndexOf(true),n=last-first+1;return ps.map((p,i)=>{const now=t0>=p.a&&t0<=p.b;if(!on[i])return `<td class="slot ${now?'now':''}"></td>`;if(t.level==='Milestone')return `<td class="slot ${now?'now':''}"><span class="diamond" title="${esc(t.title)}"></span></td>`;const k=i-first,fillPart=clamp((prog/100*n-k)*100);return `<td class="slot on ${now?'now':''}"><span class="fill ${i===first?'s':''} ${i===last?'e':''} ${t.status==='Completed'?'complete':overdue(t)||t.status==='At risk'?'late':''} ${isGroup(t)?'grp':''}" title="${esc(t.title)} · ${prog}%"><i style="width:${fillPart}%"></i></span></td>`}).join('')})()}</tr>`}).join('')||`<tr><td colspan="${ps.length+3}">No items yet. Add an objective group, then activities beneath it.</td></tr>`}</tbody></table></div>`;
}
function timelineView(){
 const owners=[...new Set(db.tasks.map(t=>t.owner).filter(Boolean))].sort();
 const rows=ordered().filter(({t})=>(!ownerFilter||t.owner===ownerFilter||isGroup(t))&&(!statusFilter||t.status===statusFilter||isGroup(t)));
 return `<div class="rowhead section-head"><div><span class="eyebrow">${esc(db.meta.year)}</span><h2>Timeline ${tip('Bars run from start to finish; the darker fill shows progress. Groups roll up their items. Coral means overdue or at risk; a diamond is a milestone.')}</h2></div><div class="actions"><button class="button small ${view==='Months'?'':'secondary'}" data-action="view" data-mode="Months">Months</button><button class="button small ${view==='Quarters'?'':'secondary'}" data-action="view" data-mode="Quarters">Quarters</button><button class="button small" data-action="add">Add item</button></div></div><section class="panel"><div class="form" style="margin-bottom:12px"><label class="field"><span class="label">Owner</span><select data-filter="owner"><option value="">All owners</option>${S.opts(owners,ownerFilter)}</select></label><label class="field"><span class="label">Status</span><select data-filter="status"><option value="">All statuses</option>${S.opts(S.STATUSES,statusFilter)}</select></label></div>${timelineTable(rows)}</section>`;
}
function tasksView(){
 const rows=ordered().map(({t,depth})=>`<tr class="${isGroup(t)?'group':''}"><td><b>${esc(t.code)}</b></td><td style="padding-left:${10+depth*16}px"><button class="link" data-action="edit" data-id="${t.id}">${esc(t.title||'Untitled')}</button><div class="tiny">${esc(t.level)}</div>${flags(t)}</td><td>${esc(t.owner||'—')}</td><td>${esc(fmtDate(t.start)||'—')}</td><td>${esc(fmtDate(t.finish)||'—')}</td><td>${esc(days(t))}</td><td style="min-width:110px">${isGroup(t)?rollup(t):clamp(t.progress)}%${bar(isGroup(t)?rollup(t):t.progress)}</td><td>${pill(t.status)}</td><td>${esc(t.dependsOn||'—')}</td><td>${t.budget!==''?money(t.budget):'—'}</td></tr>`);
 return `<div class="rowhead section-head"><div><span class="eyebrow">Plan</span><h2>All items</h2><p>Codes link items together: the parent code places an item under a group, and “depends on” names the item that must finish first.</p></div><button class="button" data-action="add">Add item</button></div><section class="panel">${table(['Code','Item','Owner','Start','Finish','Days','Progress','Status','Depends on',`Budget${db.meta.currency?' ('+esc(db.meta.currency)+')':''}`],rows,'No items yet.')}</section>`;
}
function reviewView(){
 const late=leafs().filter(overdue),clash=leafs().filter(conflict),risk=leafs().filter(t=>t.status==='At risk'),open=S.openDecisions(db.reviews);
 const line=(t,why)=>`<li>${pill(why)} <b>${esc(t.code)}</b> ${esc(t.title)} · ${esc(t.owner||'no owner')}${t.finish?` · due ${esc(fmtDate(t.finish))}`:''}</li>`;
 return `<span class="eyebrow">Progress review</span><h2>Keep the plan honest</h2><p>Check what slipped, agree what changes, and record the review. Each review keeps a snapshot of the plan.</p><div class="grid four">${card('Overdue',late.length,'',late.length>0)}${card('At risk',risk.length,'',risk.length>0)}${card('Dependency clashes',clash.length,'',clash.length>0)}${card('Open decisions',open.length)}</div><section class="panel" style="margin-top:16px"><h3>What needs attention</h3>${late.length||risk.length||clash.length?`<ul class="checks">${late.map(t=>line(t,'Overdue')).join('')}${risk.filter(t=>!overdue(t)).map(t=>line(t,'At risk')).join('')}${clash.map(t=>line(t,'Dependency clash')).join('')}</ul>`:'<p class="muted">Nothing flagged right now.</p>'}</section><section class="panel"><div class="rowhead"><div><h3>Reviews and decisions</h3><p>Record the period, what changed and each decision with an owner.</p></div><button class="button" data-action="new-review">Record a review</button></div>${S.reviewsList(db.reviews)}</section>`;
}
function exportView(){const m=db.meta,keep=view;view='Quarters';const t=timelineTable(ordered(),false);view=keep;return `<span class="eyebrow">Learn → build → complete → export → use</span><h2>Export your project plan</h2><p>Excel matches the Module 13 workbook exactly — you can re-import it later without losing anything. CSV is for further analysis. Print saves a PDF of the preview below.</p>${S.exportButtons()}<section class="panel"><span class="eyebrow">Mission & Method · Gantt & project plan</span><h2>${esc(m.project||'Project plan')}</h2><p>${esc(m.organisation||'Organisation not entered')} · ${esc(m.year)} · Prepared by ${esc(m.preparedBy||'—')} · ${avg()}% average progress</p>${t}</section>`}

// ---------- dialogs ----------
function taskDialog(t,level){
 const isNew=!t;t=t||{...blankTask(),code:nextCode(),level:level||'Activity',start:`${db.meta.year}-01-01`,finish:`${db.meta.year}-12-31`};
 const parents=db.tasks.filter(x=>isGroup(x)||['Activity','Sub-activity'].includes(x.level)).filter(x=>x.id!==t.id).map(x=>[x.code,`${x.code} · ${x.title}`]);
 const deps=db.tasks.filter(x=>x.id!==t.id&&!isGroup(x)).map(x=>[x.code,`${x.code} · ${x.title}`]);
 return modal(`${isNew?'Add':'Edit'} ${t.level.toLowerCase()}`,`<form data-form="task" data-id="${esc(isNew?'':t.id)}" class="form">${field('Code','code',t.code,'text','required','Short and unique, e.g. T4, AP2 or ESO1. Changing it updates links to it.')}${select('Level','level',LEVELS,t.level)}${field('Item','title',t.title,'text','required')}${select('Parent group','parentCode',parents,t.parentCode,'','No parent')}${field('Owner','owner',t.owner)}${select('Status','status',S.STATUSES,t.status)}${select('Priority','priority',PRIORITY,t.priority)}${field('Start','start',t.start,'date')}${field('Finish','finish',t.finish,'date')}${field('Progress (%)','progress',t.progress,'number','min="0" max="100"','For groups, progress is calculated from the items beneath.')}${select('Depends on','dependsOn',deps,t.dependsOn,'The item that must finish before this one starts.','No dependency')}${field(`Budget${db.meta.currency?' ('+db.meta.currency+')':''}`,'budget',t.budget,'number','min="0"')}${area('Notes','notes',t.notes)}${formEnd('Save item',{deleteId:isNew?'':t.id,deleteLabel:'Delete item'})}</form>`);
}

// ---------- saving ----------
const fail=t=>{message=t;render();return false};
function submit(form){
 const kind=form.dataset.form,d=S.formData(form),id=form.dataset.id;
 if(kind==='meta'){db.meta={...db.meta,...d,year:Number(d.year)||currentYear};return save('Project context saved.')}
 if(kind==='task'){
  const t0=db.tasks.find(x=>x.id===id),code=s(d.code).toUpperCase().replace(/\s+/g,'');
  if(!/^[A-Z0-9][A-Z0-9.\-]*$/.test(code))return fail('Use a short code with letters and numbers, such as T4 or AP2.');
  if(db.tasks.some(x=>x!==t0&&x.code===code))return fail(`${code} is already used.`);
  if(d.start&&d.finish&&d.finish<d.start)return fail('The finish date must be on or after the start date.');
  if(d.parentCode===code||d.dependsOn===code)return fail('An item cannot be its own parent or depend on itself.');
  let p=byCode(d.parentCode);while(p){if(p.code===code)return fail('That parent is already beneath this item.');p=byCode(p.parentCode)}
  const t=t0||blankTask();
  if(t0&&t0.code!==code)db.tasks.forEach(x=>{if(x.parentCode===t0.code)x.parentCode=code;if(x.dependsOn===t0.code)x.dependsOn=code});
  Object.assign(t,{code,level:d.level,title:s(d.title),parentCode:d.parentCode,owner:s(d.owner),status:d.status,priority:d.priority,start:d.start,finish:d.level==='Milestone'&&d.start&&!d.finish?d.start:d.finish,progress:clamp(d.progress),dependsOn:d.dependsOn,budget:s(d.budget),notes:s(d.notes)});
  S.stamp(t);if(!t0)db.tasks.push(t);dlg='';return save(`${code} saved.${conflict(t)?' Note: it starts before the item it depends on finishes.':''}`);
 }
 if(kind==='review'){const created=S.saveReview(db.reviews,id,d,()=>({meta:S.clone(db.meta),tasks:S.clone(db.tasks)}));dlg='';return save(created?'Review and snapshot saved.':'Review updated.')}
}

// ---------- Excel: the Module 13 workbook ----------
const META={project:'Project',organisation:'Organisation',year:'Planning year',currency:'Currency',preparedBy:'Prepared by',reviewDate:'Next review',notes:'Notes'};
const TASK={code:'Code',level:'Level',parentCode:'Parent code',title:'Item',owner:'Owner',status:'Status',priority:'Priority',start:'Start',finish:'Finish',progress:'Progress %',dependsOn:'Depends on',budget:'Budget',notes:'Notes',lastEditedBy:'Last edited by',lastEditedAt:'Last edited at'};
function workbook(withData){
 return S.buildXlsx([
  S.readmeSheet(['Mission & Method — Gantt & Project Planner workbook (Module 13)','This workbook holds your project timeline. It matches the Gantt & Project Planner tool one-to-one.','','How to use','1. Meta — project name, planning year and currency.','2. Tasks — one row per item. Level is Strategic objective, Subcategory, Activity, Sub-activity, Task or Milestone.','   Parent code places an item under a group; Depends on names the item that must finish first.','   Dates are YYYY-MM-DD. Status is Planned, In progress, On track, At risk, Completed or Paused.','3. Reviews and Decisions — one row per review (R1, R2 …) and one row per decision linked to its review.','','Round-trip with the tool','Download the blank template, complete it in Excel, then use Import Excel workbook in the tool. Export from the tool to get an updated workbook back.','','_schema — do not edit; the tool uses it to recognise the workbook.']),
  S.metaSheet(Object.entries(META).map(([k,l])=>[l,withData?db.meta[k]:''])),
  {name:'Tasks',headerRows:[0],rows:[Object.values(TASK),...(withData?ordered().map(({t})=>Object.keys(TASK).map(k=>t[k]??'')):[])]},
  ...S.reviewSheets(db.reviews,withData),
  S.schemaSheet(WORKBOOK,2)
 ]);
}
function fromWorkbook(sheets){
 const out=blank();
 if(S.findSheet(sheets,['Annual plan'])){ // a Strategy, KPIs & Annual Planning workbook
  const objs=S.rowsToObjects(S.findSheet(sheets,['Objectives']),{group:'Type',code:'Code',title:'Title',owner:'Owner',status:'Status'}).filter(r=>s(r.code));
  const plan=S.rowsToObjects(S.findSheet(sheets,['Annual plan']),{code:'Code',objectiveCode:'Objective code',title:'Initiative',owner:'Owner',start:'Start',end:'End',status:'Status',progress:'Progress %',budget:'Planned budget',notes:'Annual outcome'}).filter(r=>s(r.title));
  const meta=S.metaFromSheet(S.findSheet(sheets,['Meta']),{organisation:'Organisation',planName:'Plan title',year:'Planning year',currency:'Currency'});
  return {fromAnnualPlan:true,meta,tasks:[...objs.map(o=>({...blankTask(),code:s(o.code).toUpperCase(),level:'Strategic objective',title:s(o.title),owner:s(o.owner),status:S.STATUSES.includes(s(o.status))?s(o.status):'Planned'})),...plan.map((p,i)=>({...blankTask(),code:(s(p.code)||'AP'+(i+1)).toUpperCase(),level:'Activity',parentCode:s(p.objectiveCode).toUpperCase(),title:s(p.title),owner:s(p.owner),start:s(p.start),finish:s(p.end),status:S.STATUSES.includes(s(p.status))?s(p.status):'Planned',progress:clamp(p.progress),budget:s(p.budget),notes:s(p.notes)}))]};
 }
 const m=S.metaFromSheet(S.findSheet(sheets,['Meta']),META);Object.keys(m).forEach(k=>{if(s(m[k])!=='')out.meta[k]=k==='year'?Number(m[k]):s(m[k])});
 out.tasks=S.rowsToObjects(S.findSheet(sheets,['Tasks']),TASK).filter(r=>s(r.title)||s(r.code)).map((r,i)=>{const t={...blankTask()};Object.keys(TASK).forEach(k=>t[k]=s(r[k]));t.code=(t.code||'T'+(i+1)).toUpperCase();t.parentCode=t.parentCode.toUpperCase();t.dependsOn=t.dependsOn.toUpperCase();if(!LEVELS.includes(t.level))t.level='Activity';if(!S.STATUSES.includes(t.status))t.status=STAGE[t.status]||'Planned';if(!PRIORITY.includes(t.priority))t.priority='Normal';t.progress=clamp(t.progress);return t});
 out.reviews=S.reviewsFromSheets(sheets);
 return out;
}
function mergeAnnualPlan(n){
 const added=n.tasks.filter(t=>!byCode(t.code)).length,updated=n.tasks.length-added;
 if(!confirm(`Strategy, KPIs & Annual Planning workbook found.\n• ${added} item(s) will be added\n• ${updated} item(s) with the same code will be updated\n\nOther items and reviews stay as they are. Continue?`))return;
 n.tasks.forEach(t=>{const cur=byCode(t.code);if(cur)Object.assign(cur,{level:t.level,parentCode:t.parentCode,title:t.title,owner:t.owner,start:t.start,finish:t.finish,status:t.status,progress:t.progress,budget:t.budget});else db.tasks.push(t)});
 if(!db.meta.organisation&&n.meta.organisation)db.meta.organisation=s(n.meta.organisation);if(!db.meta.project&&n.meta.planName)db.meta.project=s(n.meta.planName);if(!db.meta.currency&&n.meta.currency)db.meta.currency=s(n.meta.currency);
 tab='Timeline';save(`Annual plan imported (${added} added, ${updated} updated).`);
}

// ---------- wiring ----------
function render(){
 const views={'Start':start,'Timeline':timelineView,'Tasks':tasksView,'Capacity':capacityView,'Review':reviewView,'Export':exportView};
 root.innerHTML=S.shell({eyebrow:'Project management · Gantt & project planner',title:'Gantt & Project Planner',intro:'Plan objectives, activities, tasks and milestones on one timeline, with owners, dependencies, progress and budget, and review the plan as it moves.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=13&lesson=timeline',label:'Review Module 13'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 S.bind(root,app);
 root.querySelectorAll('[data-filter]').forEach(x=>x.addEventListener('change',()=>{if(x.dataset.filter==='owner')ownerFilter=x.value;else statusFilter=x.value;render()}));
}
const app={
 tab(t){tab=t;message='';render();root.querySelector('#main')?.focus()},
 submit,
 async importXlsx(file){try{const n=fromWorkbook(await S.parseXlsx(file));if(n.fromAnnualPlan){if(!n.tasks.length)throw new Error('The annual plan workbook has no objectives or initiatives yet.');return mergeAnnualPlan(n)}if(!n.tasks.length)throw new Error('No items were found. Use the template from this tool or a Strategy, KPIs & Annual Planning workbook.');if(!confirm(`Import preview:\n• ${n.tasks.length} items (${n.tasks.filter(isGroup).length} groups)\n• ${n.reviews.length} reviews\n\nThis will replace the current data in this browser. Continue?`))return;db=n;tab='Start';save('Excel workbook imported.')}catch(e){message='Import failed: '+e.message;render()}},
 async importJson(file){try{const o=JSON.parse(await file.text());let n=null;
  if(o.version===2&&Array.isArray(o.tasks))n=o;else if(Array.isArray(o.tasks))n=migrateV1(o);
  else if(Array.isArray(o.initiatives)){const plan=o.initiatives.map((x,i)=>({...blankTask(),code:(x.code||'AP'+(i+1)).toUpperCase(),level:'Activity',parentCode:x.objectiveCode||'',title:x.title||'',owner:x.owner||'',start:x.start||'',finish:x.end||'',status:S.STATUSES.includes(x.status)?x.status:(STAGE[x.status]||'Planned'),progress:clamp(x.progress),budget:x.budget??''}));const groups=(o.objectives||[]).filter(g=>g.code).map(g=>({...blankTask(),code:g.code,level:'Strategic objective',title:g.title||'',owner:g.owner||''}));return mergeAnnualPlan({meta:{organisation:o.meta?.organisation,planName:o.meta?.planName,currency:o.meta?.currency},tasks:[...groups,...plan]})}
  if(!n)throw new Error('This is not a Gantt or annual plan backup.');
  if(!confirm('Replace the current browser data with this backup?'))return;storage.save(normalise({...blank(),...n,meta:{...blank().meta,...n.meta},version:2}));db=storage.load();tab='Start';save('Backup imported.')}catch(e){message='Import failed: '+e.message;render()}},
 action(el){
  const a=el.dataset.action,id=el.dataset.id,open=h=>{dlg=h;render()};
  if(a==='close'){dlg='';render();return}
  if(a==='add')return open(taskDialog(null,el.dataset.level));
  if(a==='edit'){const t=db.tasks.find(x=>x.id===id);if(t)open(taskDialog(t));return}
  if(a==='new-review')return open(S.reviewDialog(null,'What changed since the last review?'));
  if(a==='edit-review'){const r=db.reviews.find(x=>x.id===id);if(r)open(S.reviewDialog(r,'What changed since the last review?'));return}
  if(a==='add-row')return S.addDecisionRow(root,x=>app.action(x));
  if(a==='remove-row'){el.closest('.action-row')?.remove();return}
  if(a==='view'){view=el.dataset.mode;render();return}
  if(a==='delete'){
   const kind=el.closest('form')?.dataset.form;
   if(kind==='review'){if(!confirm('Delete this review and its decisions?'))return;db.reviews=db.reviews.filter(r=>r.id!==id);dlg='';return save('Review deleted.')}
   const t=db.tasks.find(x=>x.id===id);if(!t)return;const kids=children(t).length,deps=db.tasks.filter(x=>x.dependsOn===t.code).length;
   if(!confirm(`Delete ${t.code}?${kids?` ${kids} item(s) beneath it will move up a level.`:''}${deps?` ${deps} item(s) will lose their dependency on it.`:''}`))return;
   db.tasks.forEach(x=>{if(x.parentCode===t.code)x.parentCode=t.parentCode||'';if(x.dependsOn===t.code)x.dependsOn=''});db.tasks=db.tasks.filter(x=>x!==t);dlg='';return save(`${t.code} deleted.`);
  }
  if(a==='load-example'){if(db.tasks.length&&!confirm('Replace the current plan with the example? Download a backup first if you need it.'))return;db=makeExample();tab='Timeline';save('Example loaded. Replace it with your own plan.');return}
  if(a==='import-sk-initiatives'){importStrategyKpis();return}
  try{
   if(a==='download-template'){S.download(`${FILE}-TEMPLATE.xlsx`,workbook(false),S.XLSX_TYPE);message='Template downloaded. Complete it in Excel, then use Import Excel workbook to bring it back.';render();return}
   if(a==='xlsx'){S.download(`${FILE}.xlsx`,workbook(true),S.XLSX_TYPE);return}
  }catch(e){message=e.message;render();return}
  if(a==='export-json'){S.download(`${FILE}-backup.json`,JSON.stringify({...db,exportedAt:new Date().toISOString()},null,2),'application/json');return}
  if(a==='csv'){const keys=Object.keys(TASK).slice(0,13);S.download(`${FILE}.csv`,S.csv([keys.map(k=>TASK[k]),...ordered().map(({t})=>keys.map(k=>t[k]??''))]),'text/csv;charset=utf-8');return}
  if(a==='print')window.print();
 }
};
render();
})();
