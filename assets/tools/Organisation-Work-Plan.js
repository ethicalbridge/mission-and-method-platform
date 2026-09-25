/* Annual work plan. Keeps the existing browser draft and upgrades older rows in place. */
let strategyObjectives = {
  eso: [
    ['ESO1', 'Build a Global Hub to Connect with Ethical Organisations'],
    ['ESO2', 'Promote Ethical Opportunities Across Borders'],
    ['ESO3', 'Multiplying our impact: Nourish and diversify our donors and partners']
  ],
  iso: [
    ['ISO1', 'Strengthen Organisational Structure'],
    ['ISO2', 'Foster a Culture of Ethics and Learning'],
    ['ISO3', 'Enhance Team Diversity and Inclusion'],
    ['ISO4', 'Prioritize Staff Well-being and Development'],
    ['ISO5', 'Invest in Digital Innovation and Communication']
  ]
};
const STRATEGY_KEY='mm-org-strategy-v1';
let strategySelectedCode='';
const strategyDetails={
  ESO1:'Create a digital hub that helps people discover and connect with verified ethical organisations across borders.',
  ESO2:'Improve access to ethical jobs, internships, volunteering, education and other meaningful opportunities.',
  ESO3:'Develop and diversify aligned relationships that extend reach, resilience and impact.',
  ISO1:'Build clear roles, governance and operational systems that support a resilient organisation.',
  ISO2:'Embed ethical practice, cultural sensitivity and continuous learning across the team.',
  ISO3:'Recruit inclusively and create a team where varied backgrounds and perspectives are valued.',
  ISO4:'Support wellbeing, professional growth and leadership development.',
  ISO5:'Strengthen digital platforms, collaboration tools and communication.'
};
try{
  const saved=JSON.parse(localStorage.getItem(STRATEGY_KEY)||'null');
  if(saved?.objectives?.eso?.length>=3&&saved?.objectives?.iso?.length>=5){
    strategyObjectives=saved.objectives;
    Object.assign(strategyDetails,saved.details||{});
  }
}catch(e){}

function saveStrategy(){localStorage.setItem(STRATEGY_KEY,JSON.stringify({objectives:strategyObjectives,details:strategyDetails}))}
function strategyName(code){return [...strategyObjectives.eso,...strategyObjectives.iso].find(x=>x[0]===code)?.[1]||code}
function strategyCount(code){return state.activities.filter(a=>a.eso===code||a.iso===code).length}
function showStrategy(code){strategySelectedCode=code;render();window.scrollTo(0,0)}
function strategyDetail(code){
  const source=strategySource[code]||{};
  const linked=state.activities.filter(a=>a.eso===code||a.iso===code);
  const subs=source.subObjectives||[];
  const petals=subs.map((item,i)=>{
    const angle=-Math.PI/2+(2*Math.PI*i/subs.length);
    const x=Math.round(Math.cos(angle)*174),y=Math.round(Math.sin(angle)*148);
    return `<div class="strategy-mini-petal" style="left:calc(50% + ${x}px);top:calc(50% + ${y}px)"><b>${i+1}</b><span>${esc(item.title)}</span></div>`;
  }).join('');
  return `<div class="strategy-detail"><div class="strategy-detail-top"><button class="btn" onclick="strategySelectedCode='';render()">← All strategic objectives</button><button class="btn primary" onclick="editStrategy('${code}')">Edit objective</button></div><p class="eyebrow">${code.startsWith('ESO')?'External':'Internal'} strategic objective · ${code}</p><h1>${esc(strategyName(code))}</h1><div class="strategy-detail-grid"><section class="card"><h2>Explanation from the strategic plan</h2><p>${esc(source.explanation||strategyDetails[code]||'Add an explanation for this objective.')}</p>${source.description?`<h3>What the plan describes</h3><p>${esc(source.description)}</p>`:''}</section><aside class="card"><h2>Working description</h2><p>${esc(strategyDetails[code]||'Add a working description with Edit objective.')}</p><p class="hint">${linked.length} annual plan ${linked.length===1?'activity':'activities'} linked to ${code}.</p>${code==='ESO3'?'<p class="notice">For Ethical Bridge as a company, apply this objective through partnerships and commercial revenue rather than fundraising.</p>':''}</aside></div>${subs.length?`<section class="strategy-subsection"><p class="eyebrow">Sub-objectives</p><h2>The work within ${code}</h2><div class="strategy-mini-flower" aria-label="${subs.length} sub-objectives around ${code}"><div class="strategy-mini-center">${code}</div>${petals}</div><div class="strategy-sub-list">${subs.map((item,i)=>`<div class="strategy-sub-card"><span>${i+1}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></div></div>`).join('')}</div></section>`:''}<section class="strategy-subsection"><p class="eyebrow">Annual work plan</p><div class="strategy-linked-heading"><h2>Linked activities (${linked.length})</h2><button class="btn primary" onclick="openActivityForm('','${code}')">+ Add linked activity</button></div><div class="strategy-linked-list">${linked.map(a=>`<div class="strategy-linked-card"><div><strong>${esc(a.title)}</strong><small>${esc(a.objective||'No specific objective')} · ${esc(role(a.role)?.title||'Unassigned')} · ${esc(a.year||'')}</small></div><button class="btn" onclick="openActivityForm('${a.id}')">Edit activity</button></div>`).join('')||'<p class="card hint">No annual plan activities are linked yet. Select this code in an activity to connect it.</p>'}</div></section></div>`;
}
function strategyPage(){
  if(strategySelectedCode)return strategyDetail(strategySelectedCode);
  const eso= strategyObjectives.eso.map(([code,name])=>`<button class="strategy-card" onclick="showStrategy('${code}')"><span class="strategy-code">${code}</span><strong>${esc(name)}</strong><small>${strategyCount(code)} linked activities · View objective →</small></button>`).join('');
  const petals=strategyObjectives.iso.slice(0,5).map(([code,name],i)=>`<button class="strategy-petal petal-${i+1}" onclick="showStrategy('${code}')"><span>${code}</span><strong>${esc(name)}</strong></button>`).join('');
  const extraIso=strategyObjectives.iso.slice(5).map(([code,name])=>`<button class="strategy-list-item" onclick="showStrategy('${code}')"><b>${code}</b><span>${esc(name)}</span><small>View →</small></button>`).join('');
  return title('Strategic objectives','The objectives from the Ethical Bridge Strategic Plan 2025–2029, with space to add new ones. Select an objective to see its explanation, sub-objectives and linked activities.')+
    `<section class="strategy-section"><div class="strategy-heading"><div><p class="eyebrow">External strategic objectives</p><h2>Where Ethical Bridge creates impact</h2></div><div class="strategy-heading-actions"><span class="pill">${strategyObjectives.eso.length} ESOs</span><button class="btn primary" onclick="addStrategy('eso')">+ Add ESO</button></div></div><div class="strategy-eso-grid">${eso}</div></section>`+
    `<section class="strategy-section"><div class="strategy-heading"><div><p class="eyebrow">Internal strategic objectives</p><h2>What enables the work</h2></div><div class="strategy-heading-actions"><span class="pill">${strategyObjectives.iso.length} ISOs</span><button class="btn primary" onclick="addStrategy('iso')">+ Add ISO</button></div></div><div class="strategy-flower" aria-label="Five original internal strategic objectives around a central hub"><div class="strategy-center">Internal strategic<br>objectives <b>(ISO)</b></div>${petals}</div>${extraIso?`<div class="strategy-extra-iso"><h3>Additional internal objectives</h3>${extraIso}</div>`:''}<div class="strategy-iso-list">${strategyObjectives.iso.map(([code,name])=>`<button class="strategy-list-item" onclick="showStrategy('${code}')"><b>${code}</b><span>${esc(name)}</span><small>View →</small></button>`).join('')}</div></section>`;
}
function addStrategy(kind){
  const prefix=kind.toUpperCase();
  const next=1+Math.max(0,...strategyObjectives[kind].map(([code])=>Number(code.replace(prefix,''))||0));
  const code=`${prefix}${next}`;
  modal(`<div class="modalhead"><div><p class="eyebrow">${kind==='eso'?'External':'Internal'} strategic objective · ${code}</p><h2>Add objective</h2></div><button class="close" onclick="closeModal()">✕</button></div><form id="strategyform" class="fieldgrid"><label class="wide">Title<input name="name" required placeholder="Name the strategic objective"></label><label class="wide">Description<textarea name="description" placeholder="What does this objective mean in practice?"></textarea></label><p class="wide hint">The new code ${code} will be available when linking annual plan activities.</p><div class="wide actions"><button class="btn primary" type="submit">Add objective</button><button class="btn" type="button" onclick="closeModal()">Cancel</button></div></form>`);
  document.querySelector('#strategyform').onsubmit=e=>{
    e.preventDefault();
    const data=new FormData(e.target);
    strategyObjectives[kind].push([code,String(data.get('name')).trim()]);
    strategyDetails[code]=String(data.get('description')).trim();
    saveStrategy();closeModal();render();
  };
}
function editStrategy(code){
  const name=strategyName(code);
  modal(`<div class="modalhead"><div><p class="eyebrow">${code.startsWith('ESO')?'External':'Internal'} strategic objective · ${code}</p><h2>Edit objective</h2></div><button class="close" onclick="closeModal()">✕</button></div><form id="strategyform" class="fieldgrid"><label class="wide">Title<input name="name" required value="${esc(name)}"></label><label class="wide">Description<textarea name="description">${esc(strategyDetails[code]||'')}</textarea></label><p class="wide hint">${strategyCount(code)} work plan activities link to ${code}. The code stays fixed so existing links remain connected.</p><div class="wide actions"><button class="btn primary" type="submit">Save objective</button><button class="btn" type="button" onclick="closeModal()">Cancel</button></div></form>`);
  document.querySelector('#strategyform').onsubmit=e=>{
    e.preventDefault();
    const data=new FormData(e.target);
    const entry=[...strategyObjectives.eso,...strategyObjectives.iso].find(x=>x[0]===code);
    entry[1]=String(data.get('name')).trim();
    strategyDetails[code]=String(data.get('description')).trim();
    saveStrategy();closeModal();render();
  };
}

const starterPlanRows = [
  ['r1','Set company direction and governance','Approved annual company plan','Agree annual priorities, decision rights and quarterly review cadence','ESO1','ISO1','Board approves priorities and delegation','2027-01-05','2027-03-31','Q1','r2,r4,r6,r8','Planned','Confirm the commercial model before final approval.'],
  ['r1','Build financial sustainability','Approved partner and revenue model','Review partnership pipeline, pricing assumptions and cash runway','ESO3','ISO1','Quarterly pipeline and cash review','2027-01-10','2027-12-15','Q1,Q2,Q3,Q4','r6,r8','Planned','ESO3 retains the source plan wording; activity follows the company model.'],
  ['r2','Define the ethical organisation hub','Prioritised product roadmap','Translate organisation and user needs into a quarterly roadmap','ESO1','ISO5','Roadmap reviewed each quarter','2027-01-10','2027-03-31','Q1','r3,r4,r6,r10','Planned','Validate scope with prospective users.'],
  ['r2','Improve access to opportunities','Pilot release plan','Define opportunity search and matching pilot with customer success measures','ESO2','ISO5','Pilot plan approved','2027-04-01','2027-06-30','Q2','r3,r4,r5,r6','Planned',''],
  ['r3','Ground product decisions in evidence','User research synthesis','Interview organisations and opportunity seekers; record needs and constraints','ESO1','ISO2','Research report and prioritised needs','2027-01-08','2027-03-15','Q1','r6,r10','Planned','Use consent and privacy review.'],
  ['r3','Specify the opportunity experience','Accepted feature backlog','Write user journeys, acceptance criteria and usability tests','ESO2','ISO5','Backlog accepted by Product and Engineering','2027-03-01','2027-06-30','Q1,Q2','r4,r5','Planned',''],
  ['r4','Establish reliable digital delivery','Architecture and release controls','Document architecture, access control, testing and release process','ESO1','ISO5','Release checklist approved','2027-01-05','2027-03-31','Q1','r5,r10','Planned',''],
  ['r4','Protect product quality','Quarterly technical risk review','Review incidents, performance, security findings and remediation owners','ESO2','ISO5','Quarterly risk decisions','2027-01-10','2027-12-15','Q1,Q2,Q3,Q4','r5,r8,r10','Planned',''],
  ['r5','Deliver the ethical organisation hub','Searchable organisation profiles','Build profile, search and verification workflow against agreed criteria','ESO1','ISO5','Tested pilot release','2027-02-01','2027-06-30','Q1,Q2','r2,r3,r4,r10','Planned',''],
  ['r5','Deliver opportunity discovery','Opportunity listing workflow','Build and test opportunity creation, discovery and application links','ESO2','ISO5','Tested feature release','2027-05-01','2027-09-30','Q2,Q3','r2,r3,r4','Planned',''],
  ['r6','Grow aligned partnerships','Qualified partner pipeline','Map, contact and assess potential organisation and commercial partners','ESO3','ISO2','Pipeline with fit and next steps','2027-01-05','2027-12-15','Q1,Q2,Q3,Q4','r1,r2,r10','Planned','No fundraising target is assumed.'],
  ['r6','Activate organisations on the hub','Partner onboarding agreements','Agree profile participation, verification and mutual responsibilities','ESO1','ISO2','Signed pilot scopes and active profiles','2027-04-01','2027-09-30','Q2,Q3','r2,r8,r10','Planned',''],
  ['r7','Explain the offer clearly','Positioning and messaging guide','Test and publish clear messages for organisations and opportunity seekers','ESO1','ISO5','Approved messaging guide','2027-01-10','2027-03-31','Q1','r2,r3,r6','Planned',''],
  ['r7','Reach relevant audiences','Quarterly campaign calendar','Plan educational content, partner stories and channel measures','ESO2','ISO5','Quarterly content calendar and performance report','2027-04-01','2027-12-15','Q2,Q3,Q4','r2,r6,r10','Planned','Verify claims and consent.'],
  ['r8','Strengthen operational controls','Budget and cash reporting process','Set monthly close, cash forecast and approval thresholds','', 'ISO1','Monthly budget and cash report','2027-01-05','2027-03-31','Q1','r1,r6','Planned',''],
  ['r8','Create reliable company procedures','Contracts and risk register','Document contracting, procurement, records and risk escalation','ESO3','ISO1','Approved procedures and live register','2027-02-01','2027-06-30','Q1,Q2','r1,r6,r10','Planned',''],
  ['r9','Build an inclusive team','Role and hiring plan','Confirm role needs, inclusive recruitment steps and onboarding standards','', 'ISO3','Approved hiring plan and onboarding checklist','2027-01-05','2027-03-31','Q1','r1,r2,r4','Planned',''],
  ['r9','Support staff development and wellbeing','Check-in and learning cycle','Run role based check-ins and agree development and wellbeing actions','', 'ISO4','Quarterly check-in and learning record','2027-01-10','2027-12-15','Q1,Q2,Q3,Q4','r1,r8','Planned','Keep personal records outside this preview.'],
  ['r10','Embed ethical decisions in delivery','Product and partnership ethics review','Define consent, privacy, partner screening and incident escalation checks','ESO1','ISO2','Approved review checklist and decisions log','2027-01-05','2027-03-31','Q1','r2,r4,r6,r7','Planned',''],
  ['r10','Protect people and data','Quarterly privacy and safeguarding review','Review data flows, stories, complaints and mitigations','ESO2','ISO2','Quarterly risk and learning actions','2027-01-10','2027-12-15','Q1,Q2,Q3,Q4','r4,r7,r8','Planned','Avoid personal case details in this browser preview.']
];

let planRoleFilter = '';
let planYearFilter = 2027;
let planSearch = '';

function upgradeWorkPlan() {
  const untouched = state.activities.length === 6 && state.activities.every((a, i) => a.id === `a${i + 1}`) &&
    state.activities[0].title === 'Validate customer segments and offer' &&
    state.activities[5].title === 'Set cash forecast and monthly reporting';
  if (untouched) {
    state.activities = starterPlanRows.map((r, i) => {
      const [roleId, objective, output, title, eso, iso, milestone, start, end, quarters, consult, status, notes] = r;
      return {id:`wp-${i+1}`, role:roleId, dept:role(roleId)?.dept || '', objective, output, title, eso, iso, milestone,
        start, end, due:end, quarters:quarters.split(','), consult:consult.split(',').filter(Boolean), status, notes,
        year:2027, progress:0, budget:0};
    });
  } else {
    state.activities.forEach(a => {
      a.objective ??= a.priority || '';
      a.output ??= a.project || '';
      a.eso ??= '';
      a.iso ??= '';
      a.milestone ??= '';
      a.start ??= '';
      a.end ??= a.due || '';
      a.year ??= Number((a.start || a.end || '2027').slice(0,4)) || 2027;
      a.quarters ??= [];
      a.consult ??= [];
      a.notes ??= '';
    });
  }
  save();
}

function strategyLabel(code) {
  return [...strategyObjectives.eso, ...strategyObjectives.iso].find(x=>x[0]===code)?.join(' · ') || '—';
}
function planFilteredRows() {
  return state.activities.filter(a =>
    Number(a.year) === Number(planYearFilter) &&
    (!planRoleFilter || a.role === planRoleFilter) &&
    (!planSearch || [a.objective,a.output,a.title,a.eso,a.iso,a.milestone,a.notes]
      .some(v=>String(v||'').toLowerCase().includes(planSearch.toLowerCase())))
  ).sort((a,b)=>(a.start||'9999').localeCompare(b.start||'9999'));
}

function initPlanTableScroll() {
  const top=document.querySelector('.plan-top-scroll');
  const spacer=document.querySelector('.plan-top-scroll-inner');
  const wrap=document.querySelector('.plan-table-wrap');
  const table=wrap?.querySelector('.plan-table');
  if(!top||!spacer||!table)return;
  const size=()=>{
    const headers=table.tHead?.rows[0]?.cells;
    if(headers?.length>=2){
      table.style.setProperty('--plan-first-width',`${headers[0].offsetWidth}px`);
      table.style.setProperty('--plan-first-two-widths',`${headers[0].offsetWidth+headers[1].offsetWidth}px`);
    }
    spacer.style.width=`${table.scrollWidth}px`;
    top.scrollLeft=wrap.scrollLeft;
  };
  top.addEventListener('scroll',()=>{wrap.scrollLeft=top.scrollLeft});
  wrap.addEventListener('scroll',()=>{top.scrollLeft=wrap.scrollLeft});
  size();
  if(window.ResizeObserver){
    const observer=new ResizeObserver(()=>{
      if(!table.isConnected){observer.disconnect();return}
      size();
    });
    observer.observe(wrap);
    observer.observe(table);
  }
}

plans = function() {
  const rows=planFilteredRows();
  const roleName=planRoleFilter ? role(planRoleFilter)?.title || 'Selected role' : 'All roles';
  const counts=rows.reduce((m,a)=>(m[a.status]=(m[a.status]||0)+1,m),{});
  requestAnimationFrame(initPlanTableScroll);
  return title('Annual work plan', 'Objectives, outputs and activities linked to the 2025–2029 strategy.') +
    `<div class="plan-controls card"><label>Role plan<select aria-label="Select role plan" onchange="planRoleFilter=this.value;render()">${options([['','All roles'],...state.roles.map(r=>[r.id,r.title])],planRoleFilter)}</select></label><label>Year<input aria-label="Plan year" type="number" min="2025" max="2035" value="${planYearFilter}" onchange="planYearFilter=Number(this.value)||2027;render()"></label><label>Find in plan<input aria-label="Search work plan" type="search" value="${esc(planSearch)}" placeholder="Objective, output or activity" oninput="planSearch=this.value;render()"></label><div class="plan-control-actions"><button class="btn primary" onclick="openActivityForm()">+ Add activity</button><button class="btn" onclick="downloadWorkPlanCSV()">↓ Download CSV</button></div></div>`+
    `<div class="plan-context"><div><h2>${esc(roleName)} · ${planYearFilter}</h2><p class="hint">${rows.length} activities · ${counts['In progress']||0} in progress · ${counts['Done']||0} done</p></div><span class="help" title="The attached strategic plan contains 3 ESOs and 5 ISOs. Choose the link for each activity.">Strategy links: ${strategyObjectives.eso.length} ESOs · ${strategyObjectives.iso.length} ISOs ⓘ</span></div>`+
    `<div class="plan-top-scroll" aria-label="Scroll work plan columns" tabindex="0"><div class="plan-top-scroll-inner"></div></div><div class="plan-table-wrap card"><table class="plan-table"><thead><tr><th>Objective</th><th>Output</th><th>Activity</th><th>ESO</th><th>ISO</th><th>Strategy KPI / milestone</th><th>Start</th><th>End</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Responsible</th><th>Consult</th><th>Status</th><th>Notes</th></tr></thead><tbody>${rows.map(a=>`<tr><td>${esc(a.objective||'—')}</td><td>${esc(a.output||'—')}</td><td><div class="plan-activity-cell"><b>${esc(a.title)}</b><button class="plan-edit" onclick="openActivityForm('${a.id}')" aria-label="Edit ${esc(a.title)}">Edit</button></div></td><td title="${esc(strategyLabel(a.eso))}">${esc(a.eso||'—')}</td><td title="${esc(strategyLabel(a.iso))}">${esc(a.iso||'—')}</td><td>${esc(a.milestone||'—')}</td><td>${esc(a.start||'—')}</td><td>${esc(a.end||'—')}</td>${['Q1','Q2','Q3','Q4'].map(q=>`<td class="qmark">${a.quarters?.includes(q)?'●':''}</td>`).join('')}<td>${esc(role(a.role)?.title||'Unassigned')}</td><td>${esc((a.consult||[]).map(id=>role(id)?.title).filter(Boolean).join(', ')||'—')}</td><td><span class="pill ${a.status==='Done'?'done':a.status==='In progress'?'progress':'planned'}">${esc(a.status||'Planned')}</span></td><td>${esc(a.notes||'—')}</td></tr>`).join('')||'<tr><td colspan="16" class="empty">No activities for this role and year. Add one to start its work plan.</td></tr>'}</tbody></table></div>`;
};

openActivityForm = function(id='',strategyCode='') {
  const a=state.activities.find(x=>x.id===id)||{eso:strategyCode.startsWith('ESO')?strategyCode:'',iso:strategyCode.startsWith('ISO')?strategyCode:''};
  const selectedRole=a.role||planRoleFilter||'';
  const objectiveOptions=(items,current)=>options([['','No link'],...items.map(([code,name])=>[code,`${code} · ${name}`])],current||'');
  modal(`<div class="modalhead"><div><p class="eyebrow">${planYearFilter} work plan</p><h2>${id?'Edit activity':'Add activity'}</h2></div><button class="close" onclick="closeModal()">✕</button></div><form id="activityform" class="fieldgrid"><label class="wide">Specific objective<input name="objective" required value="${esc(a.objective||'')}" placeholder="What result is this role working toward?"></label><label class="wide">Output<input name="output" required value="${esc(a.output||'')}" placeholder="What tangible result will be produced?"></label><label class="wide">Activity<input name="title" required value="${esc(a.title||'')}" placeholder="A specific action that produces the output"></label><label>External strategic objective<select name="eso">${objectiveOptions(strategyObjectives.eso,a.eso)}</select></label><label>Internal strategic objective<select name="iso">${objectiveOptions(strategyObjectives.iso,a.iso)}</select></label><label class="wide">Strategy KPI / milestone<input name="milestone" value="${esc(a.milestone||'')}" placeholder="How will completion be checked?"></label><label>Start date<input name="start" type="date" value="${esc(a.start||'')}"></label><label>End date<input name="end" type="date" value="${esc(a.end||'')}"></label><label>Responsible role<select name="role">${options([['','Unassigned'],...state.roles.map(r=>[r.id,r.title])],selectedRole)}</select></label><label>Status<select name="status">${options([['Planned','Planned'],['In progress','In progress'],['Blocked','Blocked'],['Done','Done']],a.status||'Planned')}</select></label><fieldset class="wide plan-checks"><legend>Period of significant focus</legend>${['Q1','Q2','Q3','Q4'].map(q=>`<label><input type="checkbox" name="quarters" value="${q}" ${a.quarters?.includes(q)?'checked':''}> ${q}</label>`).join('')}</fieldset><fieldset class="wide plan-checks"><legend>Consult these roles</legend>${state.roles.filter(r=>r.id!==selectedRole).map(r=>`<label><input type="checkbox" name="consult" value="${r.id}" ${a.consult?.includes(r.id)?'checked':''}> ${esc(r.title)}</label>`).join('')}</fieldset><label class="wide">Notes<textarea name="notes" placeholder="Dependencies, decisions or context">${esc(a.notes||'')}</textarea></label><div class="wide actions"><button class="btn primary" type="submit">Save activity</button>${id?`<button class="btn danger" type="button" onclick="deleteActivity('${id}')">Delete</button>`:''}<button class="btn" type="button" onclick="closeModal()">Cancel</button></div></form>`);
  $('#activityform').onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const data=Object.fromEntries(fd);
    data.quarters=fd.getAll('quarters');
    data.consult=fd.getAll('consult');
    if(data.start&&data.end&&data.end<data.start){alert('End date must be on or after start date.');return}
    data.year=Number((data.start||data.end||String(planYearFilter)).slice(0,4))||planYearFilter;
    data.dept=role(data.role)?.dept||'';
    data.due=data.end;
    data.progress=data.status==='Done'?100:(a.progress||0);
    if(id)Object.assign(a,data);else state.activities.push({id:'wp-'+Date.now(),...data});
    save();closeModal();render();
  };
};

function downloadWorkPlanCSV() {
  const headers=['Objective','Output','Activity','ESO','ISO','Strategy KPI / milestone','Start date','End date','Q1','Q2','Q3','Q4','Responsible','Consult','Status','Notes'];
  const vals=planFilteredRows().map(a=>[a.objective,a.output,a.title,strategyLabel(a.eso),strategyLabel(a.iso),a.milestone,a.start,a.end,...['Q1','Q2','Q3','Q4'].map(q=>a.quarters?.includes(q)?'x':''),role(a.role)?.title,(a.consult||[]).map(id=>role(id)?.title).filter(Boolean).join('; '),a.status,a.notes]);
  const csv=[headers,...vals].map(row=>row.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`work-plan-${planRoleFilter||'all-roles'}-${planYearFilter}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

exportDoc = function() {
  const selected = planRoleFilter ? role(planRoleFilter)?.title || 'Selected role' : 'All roles';
  const headers=['Objective','Output','Activity','ESO','ISO','KPI / milestone','Start','End','Q1','Q2','Q3','Q4','Responsible','Consult','Status','Notes'];
  const rows=planFilteredRows().map(a=>[a.objective,a.output,a.title,a.eso,a.iso,a.milestone,a.start,a.end,
    ...['Q1','Q2','Q3','Q4'].map(q=>a.quarters?.includes(q)?'x':''),role(a.role)?.title,
    (a.consult||[]).map(id=>role(id)?.title).filter(Boolean).join('; '),a.status,a.notes]);
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.name)} work plan</title><style>
    @page{size:landscape;margin:.55in}body{font:10pt Arial;color:#17314a}h1{font-size:22pt;margin-bottom:4px}h2{font-size:15pt;margin-top:24px;border-bottom:1px solid #b6cbd0;padding-bottom:5px}
    p{line-height:1.35}table{border-collapse:collapse;width:100%;font-size:8pt}th,td{border:1px solid #cbd8dc;padding:5px;vertical-align:top;text-align:left}th{background:#e9f2f3}tr{page-break-inside:avoid}
    .role{page-break-inside:avoid;margin:10px 0 16px}.role h3{font-size:11pt;margin:0 0 5px}.role p{margin:3px 0}
    </style></head><body><h1>${esc(state.name)} Organisation Structure</h1><p>Annual work plan for ${esc(selected)} · ${planYearFilter}</p>
    <h2>Reporting structure</h2>${state.roles.map(r=>`<p>${esc(r.title)} · ${esc(r.dept)} · Reports to ${esc(role(r.reports)?.title||'Board / governing body')} · ${esc(r.status)}</p>`).join('')}
    <h2>Role descriptions</h2>${(planRoleFilter?state.roles.filter(r=>r.id===planRoleFilter):state.roles).map(r=>`<div class="role"><h3>${esc(r.title)}</h3><p><b>Purpose:</b> ${esc(r.purpose)}</p><p><b>Responsibilities:</b> ${esc(r.responsibilities)}</p><p><b>Deliverables:</b> ${esc(r.tasks)}</p><p><b>Skills:</b> ${esc(r.skills)}</p><p><b>Time / contract:</b> ${esc(r.commitment)}</p><p><b>Relationships:</b> ${esc(r.relationships)}</p><p><b>Policies / training:</b> ${esc(r.policies)}</p></div>`).join('')}
    <h2>Annual work plan</h2><p>Strategic links use the 3 ESOs and 5 ISOs named in the supplied 2025–2029 strategic plan.</p>
    <table><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v||'')}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;
  const url=URL.createObjectURL(new Blob([html],{type:'application/msword'}));
  const link=document.createElement('a');link.href=url;link.download=`organisation-plan-${planRoleFilter||'all-roles'}-${planYearFilter}.doc`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};

upgradeWorkPlan();
render();
