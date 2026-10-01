/* Mission & Method — shared worked example.
   One fictional organisation (Harvest Learning Foundation) is shown as a
   worked example in every tool, so users can see what a filled-in workspace
   looks like with the real field structure. Each tool displays an inline
   example reference box at the top of its Start tab (window.MMExample.renderBox).
   The Load button in that box populates the full workspace with the example.

   ESO/ISO codes stay consistent across tools, so the cross-tool imports
   (Strategic Objectives → Theory of Change → Strategy KPIs) all join. */
(()=>{'use strict';
const now=()=>new Date().toISOString();
const today=()=>new Date().toISOString().slice(0,10);
const year=new Date().getFullYear();
const uid=prefix=>`${prefix||'id'}-${(globalThis.crypto&&globalThis.crypto.randomUUID?globalThis.crypto.randomUUID():Math.random().toString(36).slice(2))}`;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

// ---------- Shared organisation profile (fictional) ----------
const org={
 organisation:'Harvest Learning Foundation (example)',
 country:'East Africa',
 dates:`${year}–${year+3}`,
 preparedBy:'Example leadership team',
 version:'0.1',
 notes:'This is a shared worked example used across every Impact Suite tool so you can see what a completed workspace looks like. Delete it before saving your own work.',
 mission:'Equip rural youth with practical skills in sustainable agriculture, numeracy and entrepreneurship so they can build livelihoods at home.',
 vision:'Rural communities where every young person has the skills, confidence and networks to build a thriving life.',
 values:'Learning\nDignity\nPartnership\nEvidence',
 impactGoal:'Rural communities retain and grow young talent that drives productive, climate-adapted local economies.'
};

// ---------- External Strategic Objectives (ESOs) ----------
const external=[
 {
  code:'ESO1',
  title:'Equip 5,000 rural youth with practical livelihood skills',
  rationale:'Rural youth face few pathways to sustainable livelihoods: schools cover theory, few teach practical agriculture, numeracy or entrepreneurship, and migration to cities often leads to precarious work.',
  desiredChange:'Young people graduate ready to earn a living locally in agriculture, trades or small business, with the confidence and networks to sustain it.',
  impactStatement:'Rural communities retain young talent that drives productive, climate-adapted local economies.',
  actions:['Co-design the curriculum with 20 farmer-mentors elected by their communities','Deliver 60 cohorts across 15 districts over three years','Build a graduate alumni network that keeps learning alive'],
  owner:'Programme director',
  priority:'High'
 },
 {
  code:'ESO2',
  title:'Build five demonstration farms as community learning hubs',
  rationale:'Classroom learning only sticks when learners see methods working in the field; without local demonstration sites, graduates revert to inherited practices and gains fade.',
  desiredChange:'Every participating district has a working demonstration farm where learners, farmers and partners see, test and adapt sustainable methods year-round.',
  impactStatement:'Districts have visible, trusted centres of practice that keep improving as communities use them.',
  actions:['Secure land partnerships with five district authorities','Design each farm with regional agronomists and lead farmers','Run quarterly open days in every operating hub'],
  owner:'Field operations lead',
  priority:'High'
 },
 {
  code:'ESO3',
  title:'Grow a mentor network that sustains learning after graduation',
  rationale:'Short training programmes rarely change long-term outcomes on their own; graduates need peer and expert support to apply, adapt and persist with new methods.',
  desiredChange:'Every graduate stays connected to a trained mentor and peer group for at least twelve months after their cohort ends.',
  impactStatement:'Graduates keep applying what they learned, improve their methods year on year and feed knowledge back into the next cohorts.',
  actions:['Train 150 mentors drawn from alumni and local experts','Run monthly peer-circle gatherings in each district','Measure one-year application and income effects for every cohort'],
  owner:'Alumni & mentorship lead',
  priority:'Medium'
 }
];

// ---------- Internal Strategic Objectives (ISOs) ----------
const internal=[
 {code:'ISO1',title:'Strengthen governance and safeguarding',rationale:'A programme working with young people needs airtight safeguarding and clear decision rights to earn and keep community trust.',desiredChange:'Policies, board routines and reporting lines that match the responsibility we have taken on.',actions:['Adopt and publish an updated safeguarding code','Hold quarterly board decision reviews','Publish an annual accountability report'],owner:'Board chair',priority:'High'},
 {code:'ISO2',title:'Build a learning and measurement culture',rationale:'The programme must adapt as it learns from each cohort; measurement is how that adaptation happens.',desiredChange:'Routines that turn results into decisions across the team every quarter.',actions:['Monthly data review','Quarterly cohort reflection sessions','Public learning briefs'],owner:'MEAL officer',priority:'Medium'},
 {code:'ISO3',title:'Build operational and digital infrastructure',rationale:'A distributed programme needs reliable systems to track learners, finances and partners over the long term.',desiredChange:'Secure, accessible systems that staff can run day to day without heroics.',actions:['Deploy a learner-tracking platform','Document finance processes end-to-end','Operations playbook maintained quarterly'],owner:'Operations manager',priority:'Medium'}
];

// ---------- Data builders (populate a tool's full workspace) ----------
const strategicObjectives=()=>{
 const makeObj=(o,group)=>({
  id:uid('obj'),group,code:o.code,title:o.title,
  rationale:o.rationale,desiredChange:o.desiredChange,
  owner:o.owner||'',start:String(year),end:String(year+3),
  status:'Planned',progress:0,
  indicator:{name:'',baseline:'',target:'',dataSource:'',frequency:''},
  actions:(o.actions||[]).map(a=>({id:uid('act'),action:a,owner:'',due:'',status:'Planned'})),
  reviewNote:'',lastReview:'',nextDecision:'',lastEditedBy:'Example',lastEditedAt:now()
 });
 return {
  version:2,
  meta:{organisation:org.organisation,planName:'Harvest Learning Foundation strategic objectives (example)',from:year,to:year+3,mission:org.mission,vision:org.vision,values:org.values,preparedBy:org.preparedBy,reviewDate:'',notes:org.notes},
  objectives:[...external.map(o=>makeObj(o,'External')),...internal.map(o=>makeObj(o,'Internal'))],
  reviews:[]
 };
};

const theoryOfChange=()=>{
 const makePathway=o=>({
  id:uid('pw'),
  objective:`${o.code} · ${o.title}`,
  description:o.rationale,
  problem:o.rationale,
  input:o.code==='ESO1'?'Field educators and master trainers; co-designed curriculum; cohort funding; teaching materials; mobile phones for follow-up.':o.code==='ESO2'?'Agronomy expertise; demonstration land secured with district authorities; infrastructure budget; farming inputs; staff for day-to-day operation.':'Alumni leadership; mentor training; small stipend budget; a simple matching platform; evaluation support.',
  activity:o.code==='ESO1'?'Deliver 60 cohorts across 15 districts, each 12 weeks long, combining classroom and field work and ending with a graduation portfolio.':o.code==='ESO2'?'Build and operate five demonstration farms, each co-designed with lead farmers, with quarterly open days for the surrounding community.':'Train 150 mentors drawn from alumni and local experts; match each graduate to a mentor and a peer circle; convene the network monthly.',
  output:o.code==='ESO1'?'5,000 youth graduate with portfolios documenting applied skills in agriculture, numeracy and small-business basics.':o.code==='ESO2'?'Five operational demonstration farms with full seasonal rotations and documented learning open to any neighbour.':'A mentor network of 150 active mentors and twelve-month peer circles for every graduating cohort.',
  intermediateOutcome:o.code==='ESO1'?'Graduates apply at least three new methods on their own land or in local employment within six months.':o.code==='ESO2'?'Neighbours of each demonstration farm start adopting one or more featured practices and ask for training.':'Graduates stay engaged, adapt methods together and bring neighbours into the network.',
  outcome:o.desiredChange,
  impact:o.impactStatement,
  assumptions:o.code==='ESO1'?'Community-elected mentors are willing to co-design the curriculum.\nFamilies allow young people to attend full cohorts.':o.code==='ESO2'?'District authorities honour multi-year land agreements.\nClimate conditions do not make demonstration cycles unworkable.':'Graduates value staying connected after cohorts end.\nMentors can commit sustained time with a small stipend.',
  risks:o.code==='ESO1'?'Cohort attendance drops if the curriculum does not feel practical.\nSeasonal labour demands pull learners away.':o.code==='ESO2'?'Land arrangements break down with new local leadership.\nA bad season undermines trust in demonstrated methods.':'Mentors burn out without recognition.\nGraduates in distant locations fall out of touch.',
  evidence:'Validated with learner surveys, mentor feedback and six-month follow-up visits.',
  lastEditedBy:'Example',lastEditedAt:now()
 });
 return {
  version:2,
  meta:{organisation:org.organisation,name:'Harvest Learning Foundation theory of change (example)',country:org.country,dates:org.dates,preparedBy:org.preparedBy,version:org.version,notes:org.notes,mission:org.mission,vision:org.vision,values:org.values,impactGoal:org.impactGoal,problem:'Rural youth leave school without the practical skills they need to build a livelihood at home, and the demonstration sites and peer networks that could help are missing.',description:'If Harvest Learning Foundation trains 5,000 rural youth with a practical livelihoods curriculum, builds five demonstration farms as community learning hubs and grows a mentor network that stays with graduates for twelve months, then young people will apply new methods, communities will see them working and knowledge will keep spreading — provided assumptions on community support, land agreements and mentor engagement hold.',objectives:external.map(o=>`${o.code} · ${o.title}`)},
  pathways:external.map(makePathway),
  indicators:[
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Youth graduating with a full skills portfolio',definition:'Learners completing the 12-week cohort and submitting a portfolio graded as complete.',baseline:'0',target:'5000',unit:'graduates',source:'Programme records',frequency:'Quarterly',owner:'Programme director',verification:'Portfolio archive + facilitator sign-off',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Operating demonstration farms',definition:'Demonstration farms running a full seasonal cycle with public open days.',baseline:'0',target:'5',unit:'farms',source:'Field operations register',frequency:'Quarterly',owner:'Field operations lead',verification:'Farm-visit reports',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Graduates still active with their mentor after 12 months',definition:'Graduates reporting monthly contact with a mentor or peer circle 12 months after cohort end.',baseline:'0',target:'70%',unit:'% of cohort',source:'Follow-up survey',frequency:'Semi-annual',owner:'Alumni & mentorship lead',verification:'Survey + sampling calls',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Graduates earning locally within 12 months',definition:'Graduates in paid work, self-employment or farming improvements earning above the regional median at 12 months.',baseline:'22%',target:'60%',unit:'% of cohort',source:'Follow-up survey + partner reports',frequency:'Semi-annual',owner:'MEAL officer',verification:'Survey + spot-check interviews',notes:'',lastEditedBy:'Example',lastEditedAt:now()}
  ],
  snapshots:[]
 };
};

const strategyKpis=()=>{
 const makeObj=(o,group)=>({
  id:uid('obj'),group,code:o.code,title:o.title,
  rationale:o.rationale,desiredChange:o.desiredChange||'',
  priority:o.priority||'Medium',owner:o.owner||'',start:String(year),end:String(year),
  status:'In progress',progress:30,lastEditedBy:'Example',lastEditedAt:now()
 });
 const objectives=[...external.map(o=>makeObj(o,'External')),...internal.map(o=>makeObj(o,'Internal'))];
 const K=(code,objectiveCode,name,baseline,target,q,owner,definition,source,direction='Increase',unit='Number')=>({
  id:uid('kpi'),code,objectiveCode,name,definition,formula:'',unit,type:'Lagging',category:'Impact',source,
  baseline,target,q1:q[0],q2:q[1],q3:q[2],q4:q[3],direction,frequency:'Quarterly',owner,dataOwner:owner,
  status:'Active',notes:'',lastEditedBy:'Example',lastEditedAt:now()
 });
 const kpis=[
  K('KPI1','ESO1','Youth graduating with full skills portfolio',0,5000,[800,2100,3600,5000],'Programme director','Learners completing the 12-week cohort with a portfolio graded as complete.','Programme records'),
  K('KPI2','ESO1','Graduates earning locally within 12 months',22,60,[25,35,48,60],'MEAL officer','Graduates in paid work, self-employment or improved farming at 12 months.','Follow-up survey','Increase','Percentage'),
  K('KPI3','ESO2','Operating demonstration farms',0,5,[1,2,4,5],'Field operations lead','Demonstration farms running a full seasonal cycle with open days.','Field operations register'),
  K('KPI4','ESO3','Graduates active with mentor after 12 months',0,70,[20,40,60,70],'Alumni & mentorship lead','Graduates with monthly mentor contact at 12 months after cohort end.','Follow-up survey','Increase','Percentage'),
  K('KPI5','ISO1','Quarterly board reviews completed with a decisions summary',0,4,[1,2,3,4],'Board chair','Board reviews that start from the KPI summary and produce documented decisions.','Board minutes')
 ];
 const todayIso=today();
 const results=[];
 const qNow=Math.floor(new Date().getMonth()/3)+1;
 kpis.forEach(k=>{for(let q=1;q<=qNow;q++){const t=Number(k['q'+q]);if(isNaN(t))continue;const end=new Date(year,q*3,0).toISOString().slice(0,10);const dir=k.direction==='Decrease'?-1:1;const base=Number(k.baseline);const val=Math.round((base+(t-base)*dir*0.9)*10)/10;results.push({id:uid('res'),kpiCode:k.code,date:end<todayIso?end:todayIso,value:String(val),evidence:'Example data',notes:''})}});
 const I=(code,objectiveCode,kpiCode,title,owner,sm,em,budget,spent,progress,status)=>({
  id:uid('ini'),code,objectiveCode,kpiCode,title,annualOutcome:'',activities:'',milestones:'',owner,team:'',
  start:`${year}-${String(sm).padStart(2,'0')}-01`,end:`${year}-${String(em).padStart(2,'0')}-28`,
  budget,committed:Math.round(budget*0.6),spent,progress,status,funding:'',dependencies:'',risks:'',notes:'',
  lastEditedBy:'Example',lastEditedAt:now()
 });
 const initiatives=[
  I('AP1','ESO1','KPI1','Launch three new cohorts in two new districts','Programme director',2,10,38000,15000,42,'In progress'),
  I('AP2','ESO1','KPI2','12-month graduate follow-up study','MEAL officer',3,12,8000,2500,30,'On track'),
  I('AP3','ESO2','KPI3','Open the second and third demonstration farms','Field operations lead',1,12,120000,52000,45,'In progress'),
  I('AP4','ESO3','KPI4','Train and match 50 new mentors','Alumni & mentorship lead',2,11,14000,5000,35,'On track'),
  I('AP5','ISO1','KPI5','Board decision routine (quarterly)','Board chair',1,12,1500,500,50,'On track')
 ];
 return {
  version:2,
  meta:{organisation:org.organisation,planName:`Harvest Learning Foundation annual plan (example) · ${year}`,year,from:year,to:year+3,mission:org.mission,vision:org.vision,values:org.values,impactGoal:org.impactGoal,preparedBy:org.preparedBy,reviewDate:'',currency:'USD',green:95,yellow:75,notes:org.notes},
  objectives,
  kpis,
  results,
  initiatives,
  reviews:[{id:uid('rev'),date:`${year}-${String(Math.max(1,qNow-1)*3+1).padStart(2,'0')}-05`,period:`Q${Math.max(1,qNow-1)}`,reviewer:'Leadership team',summary:'Cohort delivery on plan; demonstration-farm build slower than hoped due to land-agreement delays.',decisions:[{id:uid('d'),decision:'Add a second site surveyor',action:'Hire a surveyor on a three-month contract',owner:'Field operations lead',due:`${year}-${String(qNow*3).padStart(2,'0')}-30`,status:'In progress'}],snapshot:null}]
 };
};

// ---------- Reference box (shown at the top of each tool's Start tab) ----------
const mv=()=>`<div class="example-mv"><div><b>Mission</b><p>${esc(org.mission)}</p></div><div><b>Vision</b><p>${esc(org.vision)}</p></div><div><b>Values</b><p>${esc(org.values.split('\n').join(' · '))}</p></div></div>`;
const esoCard=o=>`<article class="example-eso"><h4>${esc(o.code)} · ${esc(o.title)}</h4><span class="lbl">Why this matters</span><p class="val">${esc(o.rationale)}</p><span class="lbl">Change we want</span><p class="val">${esc(o.desiredChange)}</p><span class="lbl">Owner</span><p class="val">${esc(o.owner)} · priority ${esc(o.priority)}</p></article>`;
const foot=label=>`<div class="example-foot"><button class="button secondary small" type="button" data-action="load-example">${esc(label)}</button></div><p class="example-warn"><b>Heads up:</b> Loading this example replaces everything already in your workspace. Back up with "Backup JSON" first if you need to keep what's there.</p>`;
const head=()=>`<summary class="example-summary"><span class="example-badge">Example</span><span class="example-title">${esc(org.organisation)} — click to expand or collapse</span></summary><p class="example-intro">A fictional rural-youth skills NGO shown as a worked example in every Impact Suite tool, so you can see what a completed workspace looks like with real content in every field. Edit or delete freely — the Load button below adds the full example to your workspace.</p>`;

const renderBox=tool=>{
 if(tool==='strategic-objectives') return `<details class="example-box" open>${head()}${mv()}<p class="tiny" style="margin:8px 0 6px"><b>Three external objectives (what changes in the world):</b></p><div class="example-objectives">${external.map(esoCard).join('')}</div><p class="tiny" style="margin:10px 0 0"><b>Plus three internal objectives</b> (${internal.map(i=>i.code+' · '+i.title.toLowerCase()).join('; ')}).</p>${foot('Load this example into my workspace')}</details>`;
 if(tool==='theory-of-change'){
  const o=external[0];
  return `<details class="example-box" open>${head()}${mv()}<p class="tiny" style="margin:6px 0 2px"><b>Impact goal:</b> ${esc(org.impactGoal)}</p><p class="tiny" style="margin:0 0 8px"><b>Pathway shown (1 of 3) · auto-filled from the Strategic Objectives tool:</b></p><div class="example-chain six"><div class="step"><b>Objective</b><p>${esc(o.code)} · ${esc(o.title)}</p></div><div class="step"><b>Problem</b><p>${esc(o.rationale)}</p></div><div class="step"><b>Input</b><p>Field educators; co-designed curriculum; cohort funding; teaching materials.</p></div><div class="step"><b>Output</b><p>5,000 youth graduate with portfolios of applied skills.</p></div><div class="step"><b>Outcome</b><p>${esc(o.desiredChange)}</p></div><div class="step"><b>Impact</b><p>${esc(o.impactStatement)}</p></div></div><p class="tiny" style="margin:4px 0 0"><b>Full example adds three pathways</b> (one per ESO) with assumptions, risks and four outcome indicators.</p>${foot('Load this example into my workspace')}</details>`;
 }
 if(tool==='strategy-kpis') return `<details class="example-box" open>${head()}${mv()}<p class="tiny" style="margin:4px 0 8px"><b>How this reads in the tool:</b> objectives come from Strategic Objectives; each gets one to three KPIs; each KPI gets quarterly targets and dated results; initiatives are the work that moves them.</p><div class="example-objectives"><article class="example-eso"><h4>KPI1 · Youth graduating with full skills portfolio</h4><span class="lbl">Linked to</span><p class="val">ESO1 · Equip 5,000 rural youth with practical livelihood skills</p><span class="lbl">Baseline → Annual target</span><p class="val">0 → 5,000 graduates</p><span class="lbl">Quarterly targets</span><p class="val">Q1 800 · Q2 2,100 · Q3 3,600 · Q4 5,000</p><span class="lbl">Owner</span><p class="val">Programme director · source: programme records</p></article><article class="example-eso"><h4>KPI3 · Operating demonstration farms</h4><span class="lbl">Linked to</span><p class="val">ESO2 · Build five demonstration farms as community learning hubs</p><span class="lbl">Baseline → Annual target</span><p class="val">0 → 5 farms</p><span class="lbl">Quarterly targets</span><p class="val">Q1 1 · Q2 2 · Q3 4 · Q4 5</p><span class="lbl">Owner</span><p class="val">Field operations lead · source: field operations register</p></article><article class="example-eso"><h4>KPI4 · Graduates active with mentor after 12 months</h4><span class="lbl">Linked to</span><p class="val">ESO3 · Grow a mentor network that sustains learning</p><span class="lbl">Baseline → Annual target</span><p class="val">0 → 70%</p><span class="lbl">Quarterly targets</span><p class="val">Q1 20% · Q2 40% · Q3 60% · Q4 70%</p><span class="lbl">Owner</span><p class="val">Alumni & mentorship lead · source: follow-up survey</p></article></div><p class="tiny" style="margin:10px 0 0"><b>Full example adds</b> five KPIs, example quarterly results to date, five initiatives and one board-review entry.</p>${foot('Load this example into my workspace')}</details>`;
 return '';
};

// ---------- Your-workspace box (mirrors the example, filled with user data) ----------
// The user box ALWAYS shows the same structure as the example box, with "— to fill"
// placeholders where the user has not written content yet. As they type (and as they
// save objectives / pathways / KPIs), those placeholders replace with their content.
const EMPTY='<span class="val-empty">— to fill</span>';
const dash=s=>s&&String(s).trim()?esc(s):EMPTY;
const myMv=m=>`<div class="example-mv">
 <div><b>Mission</b><p>${dash(m.mission)}</p></div>
 <div><b>Vision</b><p>${dash(m.vision)}</p></div>
 <div><b>Values</b><p>${m.values&&String(m.values).trim()?esc(String(m.values).split('\n').filter(x=>x.trim()).join(' · ')):EMPTY}</p></div>
</div>`;
const myEsoCard=(o,fallbackCode)=>`<article class="example-eso"><h4>${esc(o?.code||fallbackCode||'—')} · ${o?.title?esc(o.title):EMPTY}</h4><span class="lbl">Why this matters</span><p class="val">${dash(o?.rationale)}</p><span class="lbl">Change we want</span><p class="val">${dash(o?.desiredChange)}</p><span class="lbl">Owner</span><p class="val">${o?.owner?esc(o.owner):EMPTY}${o?.priority?' · priority '+esc(o.priority):''}</p></article>`;
const myHead=(m,hint)=>`<summary class="example-summary"><span class="example-badge mine">Your workspace</span><span class="example-title">${m.organisation?esc(m.organisation):'<span class="val-empty">Add your organisation name →</span>'}</span></summary><p class="example-intro">${esc(hint)}</p>`;

const renderUserBox=(tool,db)=>{
 if(!db||!db.meta) return '';
 const m=db.meta;
 if(tool==='strategic-objectives'){
  const ext=(db.objectives||[]).filter(o=>o.group==='External');
  const int=(db.objectives||[]).filter(o=>o.group==='Internal');
  // Always render three ESO cards: user's filled ones first, then placeholders
  const esoSlots=[0,1,2].map(i=>ext[i]?myEsoCard(ext[i]):myEsoCard(null,'ESO'+(i+1))).join('');
  const extraExt=ext.length>3?`<p class="tiny" style="margin:8px 0 0">Plus ${ext.length-3} more external objective${ext.length-3===1?'':'s'}.</p>`:'';
  const isoLine=int.length?`<p class="tiny" style="margin:10px 0 0"><b>Internal objectives (${int.length}):</b> ${int.map(i=>esc((i.code||'—')+' · '+(i.title||'untitled').toLowerCase())).join('; ')}.</p>`:'<p class="tiny" style="margin:10px 0 0"><b>Internal objectives:</b> <span class="val-empty">add governance, learning or operations foundations below (ISO1, ISO2, ISO3).</span></p>';
  return `<details class="example-box mine" open>${myHead(m,'This mirrors the example above, filled with your own content. It updates as you edit — placeholders show where to write.')}${myMv(m)}<p class="tiny" style="margin:8px 0 6px"><b>External objectives (${ext.length} of 3 shown):</b></p><div class="example-objectives">${esoSlots}</div>${extraExt}${isoLine}</details>`;
 }
 if(tool==='theory-of-change'){
  const paths=(db.pathways||[]).filter(p=>p.objective||p.problem||p.input||p.output||p.outcome||p.impact);
  const first=paths[0]||{};
  const pathLine=paths.length?`<p class="tiny" style="margin:6px 0 8px"><b>Impact goal:</b> ${dash(m.impactGoal)} · <b>Pathway 1 of ${paths.length}</b> shown below.</p>`:`<p class="tiny" style="margin:6px 0 8px"><b>Impact goal:</b> ${dash(m.impactGoal)} · <b>Pathway 1</b> shown below. <span class="val-empty">Add a pathway to fill the chain — the objective auto-fills from the Strategic Objectives tool.</span></p>`;
  const chain=`<div class="example-chain six"><div class="step"><b>Objective</b><p>${dash(first.objective)}</p></div><div class="step"><b>Problem</b><p>${dash(first.problem)}</p></div><div class="step"><b>Input</b><p>${dash(first.input)}</p></div><div class="step"><b>Output</b><p>${dash(first.output)}</p></div><div class="step"><b>Outcome</b><p>${dash(first.outcome)}</p></div><div class="step"><b>Impact</b><p>${dash(first.impact)}</p></div></div>`;
  const others=paths.length>1?`<p class="tiny" style="margin:4px 0 0"><b>Other pathways:</b> ${paths.slice(1).map(p=>esc(p.objective||'untitled')).join('; ')}.</p>`:'';
  return `<details class="example-box mine" open>${myHead(m,'This mirrors the example above, filled with your own content. It updates as you edit — placeholders show where to write.')}${myMv(m)}${pathLine}${chain}${others}</details>`;
 }
 if(tool==='strategy-kpis'){
  const kpis=db.kpis||[];
  const slot=(k,fallback)=>{
   const qLine=['q1','q2','q3','q4'].map((q,i)=>`Q${i+1} ${k&&k[q]?esc(k[q]):'—'}`).join(' · ');
   return `<article class="example-eso"><h4>${esc(k?.code||fallback)} · ${k?.name?esc(k.name):EMPTY}</h4><span class="lbl">Linked to</span><p class="val">${k?.objectiveCode?esc(k.objectiveCode):EMPTY}</p><span class="lbl">Baseline → Annual target</span><p class="val">${k?.baseline?esc(k.baseline):EMPTY} → ${k?.target?esc(k.target):EMPTY}</p><span class="lbl">Quarterly targets</span><p class="val">${qLine}</p><span class="lbl">Owner</span><p class="val">${k?.owner?esc(k.owner):EMPTY}${k?.source?' · source: '+esc(k.source):''}</p></article>`;
  };
  const slots=[0,1,2].map(i=>slot(kpis[i],'KPI'+(i+1))).join('');
  const extra=kpis.length>3?`<p class="tiny" style="margin:8px 0 0">Plus ${kpis.length-3} more KPI${kpis.length-3===1?'':'s'}.</p>`:'';
  const inits=(db.initiatives||[]).length;
  const initLine=inits?`<p class="tiny" style="margin:10px 0 0"><b>Initiatives (${inits}):</b> the work moving these KPIs.</p>`:'<p class="tiny" style="margin:10px 0 0"><b>Initiatives:</b> <span class="val-empty">add the work that moves each KPI below.</span></p>';
  return `<details class="example-box mine" open>${myHead(m,'This mirrors the example above, filled with your own content. It updates as you edit — placeholders show where to write.')}${myMv(m)}<p class="tiny" style="margin:4px 0 8px"><b>Your KPIs (${kpis.length} of 3 shown):</b></p><div class="example-objectives">${slots}</div>${extra}${initLine}</details>`;
 }
 return '';
};

// ---------- Live binding — update the "Your workspace" mirror as the user types ----------
const bindLive=(root,db,tool)=>{
 if(!root||!db) return;
 const form=root.querySelector('form[data-form="meta"]');
 if(!form) return;
 const update=()=>{
  // Build a shallow-cloned live db from the current form values, without mutating the saved db
  const live={...db,meta:{...db.meta}};
  const fd=new FormData(form);
  for(const [k,v] of fd.entries()){
   const cur=live.meta[k];
   if(typeof cur==='number'&&v!==''){const n=Number(v);live.meta[k]=isNaN(n)?v:n}
   else live.meta[k]=v;
  }
  const newHtml=renderUserBox(tool,live);
  const existing=root.querySelector('.example-box.mine');
  if(existing&&newHtml){
   const wrap=document.createElement('div');wrap.innerHTML=newHtml;
   const fresh=wrap.firstElementChild;
   if(fresh) existing.replaceWith(fresh);
  }else if(!existing&&newHtml){
   const topExample=Array.from(root.querySelectorAll('.example-box')).find(x=>!x.classList.contains('mine'));
   if(topExample){
    const wrap=document.createElement('div');wrap.innerHTML=newHtml;
    const fresh=wrap.firstElementChild;
    if(fresh) topExample.after(fresh);
   }
  }else if(existing&&!newHtml){
   existing.remove();
  }
 };
 form.addEventListener('input',update);
};

// ---------- Stale-example cleanup (one-time per tool) ----------
// Called from each tool's normalise. Clears any previously loaded example data
// so users start with an empty workspace. Future Load actions persist normally.
const cleanupStaleExample=(d,flagKey,blankFn)=>{
 try{
  if(!localStorage.getItem(flagKey)){
   localStorage.setItem(flagKey,'1');
   if(d&&d.meta&&/\(example\)/i.test((d.meta.organisation||'')+' '+(d.meta.planName||'')+' '+(d.meta.name||''))){
    return blankFn();
   }
  }
 }catch{}
 return d;
};

// ---------- Integration notes — "How this tool connects to the suite" ----------
// Rendered as a small, consistent band on each tool's Start tab so users see
// exactly what flows in and what flows out, and where the tool sits in the journey.
const integrationData={
 'strategic-objectives':{step:1,label:'Step 1 of 5 · Strategic objectives',pulls:[],pushes:[['theory-of-change','Theory of Change pulls these objectives as pathway starts.'],['strategy-kpis','Strategy KPIs attaches KPIs to each ESO/ISO.'],['meal-strategy','MEAL Strategy inherits the objective list through KPIs.'],['gantt','Gantt & Project Planner groups initiatives by objective.']]},
 'theory-of-change':{step:2,label:'Step 2 of 5 · Theory of Change',pulls:[['strategic-objectives','Pulls objectives from Strategic Objectives (dropdown in each pathway). Problem, outcome and impact pre-fill from the selected ESO.']],pushes:[['strategy-kpis','Strategy KPIs reads the impact goal and the three pathways to anchor measurement.'],['meal-strategy','MEAL Strategy imports outcome- and impact-level indicators from each pathway.'],['gantt','Gantt turns each pathway output into a plannable work-stream.']]},
 'strategy-kpis':{step:3,label:'Step 3 of 5 · Strategy, KPIs & annual planning',pulls:[['strategic-objectives','Pulls ESOs and ISOs — each KPI is linked to one by code.'],['theory-of-change','Pulls the impact goal and uses pathway outcomes to shape KPIs.']],pushes:[['meal-strategy','MEAL Strategy inherits every KPI with its quarterly targets as the tracking matrix.'],['gantt','Gantt imports each initiative with its dates, owner and budget as a timeline bar.']]},
 'meal-strategy':{step:4,label:'Step 4 of 5 · MEAL Strategy',pulls:[['strategic-objectives','Reads the objective list to group indicators.'],['strategy-kpis','Imports every KPI with its quarterly targets — this is the backbone of the MEAL matrix.'],['theory-of-change','Imports outcome- and impact-level indicators from each pathway.']],pushes:[['issue-risk','Issue & Risk Management can log issues against any indicator here.']]},
 'gantt':{step:5,label:'Step 5 of 5 · Gantt & project planner',pulls:[['strategic-objectives','Reads objectives to group tasks and bars.'],['strategy-kpis','Imports every initiative with its start, end, owner, budget and status.'],['theory-of-change','Reads pathway outputs so tasks can be tied back to a pathway.']],pushes:[['issue-risk','Issue & Risk Management can log issues against any task or milestone here.']]},
 'issue-risk':{step:0,label:'Cross-cutting · Issue & risk management',pulls:[['strategic-objectives','Any ESO/ISO can carry its own risk register.'],['theory-of-change','Each pathway can hold assumption and risk rows.'],['strategy-kpis','Each KPI can log a risk-to-target.'],['meal-strategy','Each indicator can log data-quality issues.'],['gantt','Each task or milestone can log a delivery risk.']],pushes:[]}
};
const toolHrefs={
 'strategic-objectives':'Strategic-Objectives.html',
 'theory-of-change':'Theory-of-Change-Builder.html',
 'strategy-kpis':'Strategy-KPIs-and-Annual-Planning.html',
 'meal-strategy':'MEAL-Strategy.html',
 'gantt':'Gantt-Project-Planner.html',
 'issue-risk':'Issue-and-Risk-Management.html'
};
const toolTitles={
 'strategic-objectives':'Strategic Objectives',
 'theory-of-change':'Theory of Change',
 'strategy-kpis':'Strategy KPIs',
 'meal-strategy':'MEAL Strategy',
 'gantt':'Gantt & Project Planner',
 'issue-risk':'Issue & Risk Management'
};
const renderIntegration=tool=>{
 const d=integrationData[tool];if(!d) return '';
 const line=(items,verb)=>items.length?`<ul class="integ-list">${items.map(([k,desc])=>`<li><a href="${esc(toolHrefs[k])}"><b>${esc(toolTitles[k])}</b></a> — ${esc(desc)}</li>`).join('')}</ul>`:`<p class="integ-empty">${verb}</p>`;
 return `<details class="integ-box" open><summary class="integ-summary"><span class="integ-pill">${esc(d.label)}</span><span class="integ-title">How this tool connects to the rest of the suite</span></summary><div class="integ-body"><div class="integ-col"><h4>↙ What this tool reads from others</h4>${line(d.pulls,'This is the first step — nothing to pull yet. Objectives created here are the join key for every tool that follows.')}</div><div class="integ-col"><h4>↗ What this tool feeds into</h4>${line(d.pushes,'This tool reads from the others; no onward hand-off.')}</div></div></details>`;
};

window.MMExample={org,external,internal,strategicObjectives,theoryOfChange,strategyKpis,renderBox,renderUserBox,bindLive,cleanupStaleExample,renderIntegration};
})();
