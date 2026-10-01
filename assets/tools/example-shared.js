/* Mission & Method — shared example dataset.
   One organisation (Ethical Bridge) walks through every tool so users
   see how the same case flows: strategic objectives → theory of change
   → KPIs & annual planning → MEAL → gantt → donor tools.

   Each tool's "Load example" button reads from window.MMExample.
   Objectives use the same ESO/ISO codes everywhere so cross-tool
   integration (import / round-trip) joins the data correctly. */
(()=>{'use strict';
const now=()=>new Date().toISOString();
const today=()=>new Date().toISOString().slice(0,10);
const year=new Date().getFullYear();
const uid=prefix=>`${prefix||'id'}-${globalThis.crypto?.randomUUID?.()||Math.random().toString(36).slice(2)}`;

// ---------- Shared organisation profile ----------
const org={
 organisation:'Ethical Bridge (example)',
 country:'Global',
 dates:`${year}–${year+3}`,
 preparedBy:'Example team',
 version:'0.1',
 notes:'This is a shared example used across every Impact Suite tool so you can see how the same case flows through strategic objectives, theory of change and annual planning. Replace it with your own work when you are ready.',
 mission:'Connect people, organisations and opportunities that contribute to ethical, inclusive and sustainable change.',
 vision:'A globally connected ethical ecosystem where local organisations and communities can thrive.',
 values:'Ethics\nTransparency\nCommunity empowerment\nSustainability'
};

// ---------- External Strategic Objectives (ESOs) ----------
const external=[
 {
  code:'ESO1',
  title:'Build a global hub to connect with ethical organisations',
  rationale:'Ethical local organisations often lack visibility and access to international networks. There is limited awareness and connection between global actors and grassroots changemakers.',
  desiredChange:'Local ethical organisations gain global recognition and access to new collaborations. Enhanced trust and engagement between local and international actors, leading to stronger partnerships.',
  impactStatement:'A globally connected ethical ecosystem empowering local organisations and amplifying social, environmental and economic justice movements.',
  actions:['Develop and launch a searchable digital hub','Publish transparent, verified organisation profiles','Build outreach to grassroots organisations in under-represented regions'],
  owner:'Director',
  priority:'High'
 },
 {
  code:'ESO2',
  title:'Promote ethical opportunities across borders',
  rationale:'Access to ethical and impactful opportunities remains fragmented and geographically limited. Many individuals struggle to find pathways to contribute meaningfully to social and environmental change.',
  desiredChange:'Increased participation in ethical employment and volunteering worldwide. Greater inclusion and diversity in global impact initiatives.',
  impactStatement:'A world where ethical and sustainable work becomes the norm, driving inclusive global progress and shared prosperity.',
  actions:['Curate and publish ethical employment, volunteering and internship opportunities','Help people assess fit, ethics and safeguards for each opportunity','Connect applicants with responsible organisations'],
  owner:'Programme lead',
  priority:'High'
 },
 {
  code:'ESO3',
  title:'Multiply our impact: diversify funding and build long-term partnerships',
  rationale:'Reliance on limited funding sources and short-term partnerships restricts growth, innovation and organisational resilience.',
  desiredChange:'Increased financial resilience through diversified income sources and long-term strategic partnerships that strengthen innovation, collaboration and organisational sustainability.',
  impactStatement:'A resilient and financially sustainable organisation powered by diversified revenue streams and trusted long-term partnerships, enabling Ethical Bridge to scale its mission and create lasting systemic impact.',
  actions:['Map and cultivate aligned funders across multiple regions','Launch an individual giving pathway','Secure three multi-year strategic partnerships'],
  owner:'Fundraising lead',
  priority:'High'
 }
];

// ---------- Internal Strategic Objectives (ISOs) ----------
const internal=[
 {code:'ISO1',title:'Strengthen governance and ethical foundations',rationale:'Trust in the hub depends on strong governance, clear decision rights and transparent ethics.',desiredChange:'Governance, policies and ethical standards that match the trust the hub asks for.',actions:['Finalise governance code and decision framework','Publish ethics and verification standards','Hold quarterly board reviews'],owner:'Board chair',priority:'High'},
 {code:'ISO2',title:'Build a learning culture',rationale:'The hub must adapt as it learns from users; a learning culture makes that possible.',desiredChange:'Routines that turn evidence into decisions across the team.',actions:['Monthly data review','Quarterly reflection sessions','Public learning notes'],owner:'MEAL officer',priority:'Medium'},
 {code:'ISO3',title:'Invest in digital and operational infrastructure',rationale:'A reliable hub needs reliable systems behind it.',desiredChange:'Secure, accessible platforms and the operations to maintain them.',actions:['Platform security review','Accessibility audit (WCAG 2.2)','Operations playbook'],owner:'Operations lead',priority:'Medium'}
];

// ---------- Strategic Objectives (Module 1 tool) ----------
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
  meta:{organisation:org.organisation,planName:'Ethical Bridge strategic objectives (example)',from:year,to:year+3,mission:org.mission,vision:org.vision,values:org.values,preparedBy:org.preparedBy,reviewDate:'',notes:org.notes},
  objectives:[...external.map(o=>makeObj(o,'External')),...internal.map(o=>makeObj(o,'Internal'))],
  reviews:[]
 };
};

// ---------- Theory of Change (Module 2 tool) ----------
const theoryOfChange=()=>{
 const makePathway=o=>({
  id:uid('pw'),
  objective:`${o.code} · ${o.title}`,
  description:o.rationale,
  problem:o.rationale,
  input:o.code==='ESO1'?'Digital development, content and partnership expertise; staff capacity; funding; IT infrastructure; verification standards; outreach capability.':o.code==='ESO2'?'Opportunity curation team; communications; partner organisations in multiple regions; publishing platform; safeguarding standards.':'Fundraising expertise; partnership strategy; grant management; individual giving platform; donor stewardship capacity.',
  activity:o.code==='ESO1'?'Build the platform, verify organisations, create profiles and run outreach with grassroots partners.':o.code==='ESO2'?'Curate opportunities, assess safeguards, publish accessible listings and support applicants.':'Map aligned funders, cultivate strategic partnerships, launch individual giving and steward donors.',
  output:o.code==='ESO1'?'An operational digital hub with verified organisation profiles and transparent data.':o.code==='ESO2'?'Published ethical opportunities with clear safeguards; applicants matched with responsible organisations.':'A diversified funding pipeline, individual giving channel and three strategic partnerships live.',
  intermediateOutcome:o.code==='ESO1'?'International actors can discover and assess trustworthy local organisations by cause, location and impact.':o.code==='ESO2'?'More people find safe, purpose-led opportunities across borders.':'Reduced funder concentration and growing engagement from individual supporters.',
  outcome:o.desiredChange,
  impact:o.impactStatement,
  assumptions:o.code==='ESO1'?'Local organisations are willing to maintain accurate profiles.\nFunders and partners trust the verification process.':o.code==='ESO2'?'Local organisations welcome international visibility.\nPublished opportunities meet safeguarding standards.':'Donor relationships can be sustained over multiple years.\nPartners stay aligned with the mission.',
  risks:o.code==='ESO1'?'Insufficient participation from local organisations.\nVerification process cannot scale.':o.code==='ESO2'?'Safeguarding issues emerge in a listed opportunity.\nCultural fit is weaker than expected.':'Over-dependence on any single new donor.\nMission drift to chase funding.',
  evidence:'Validated with user research, partner feedback and platform usage data.',
  lastEditedBy:'Example',lastEditedAt:now()
 });
 return {
  version:2,
  meta:{organisation:org.organisation,name:'Ethical Bridge theory of change (example)',country:org.country,dates:org.dates,preparedBy:org.preparedBy,version:org.version,notes:org.notes,mission:org.mission,vision:org.vision,values:org.values,impactGoal:'A globally connected ethical ecosystem that strengthens local change efforts.',problem:'Ethical local organisations often lack visibility and access to international networks; opportunities to contribute ethically are fragmented and donor sources are concentrated.',description:'If Ethical Bridge combines digital development, verification standards, partnerships and outreach to build a trusted digital hub, publishes safe ethical opportunities and diversifies its funding and partnerships, then local organisations gain visibility, individuals find meaningful ways to contribute and the organisation becomes financially resilient — provided assumptions on participation, safeguarding and donor relationships hold.',objectives:external.map(o=>`${o.code} · ${o.title}`)},
  pathways:external.map(makePathway),
  indicators:[
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Verified organisations active on the hub',definition:'Local organisations with a complete, verified profile accessed internationally in the last 90 days.',baseline:'0',target:'250',unit:'organisations',source:'Hub analytics',frequency:'Quarterly',owner:'Platform lead',verification:'Platform logs + verification register',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'International connections facilitated',definition:'Connections initiated between an international actor and a local verified organisation.',baseline:'0',target:'500',unit:'connections',source:'Hub analytics',frequency:'Quarterly',owner:'Platform lead',verification:'Platform logs',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'People taking up ethical opportunities',definition:'Applicants placed into ethical employment, volunteering or internship positions through the platform.',baseline:'0',target:'1200',unit:'people',source:'Partner reporting',frequency:'Quarterly',owner:'Programme lead',verification:'Partner reports + follow-up survey',notes:'',lastEditedBy:'Example',lastEditedAt:now()},
   {id:uid('ind'),pathwayId:'',level:'outcome',name:'Share of income from largest donor',definition:'Income from the single largest donor divided by total income.',baseline:'72%',target:'45%',unit:'%',source:'Management accounts',frequency:'Quarterly',owner:'Fundraising lead',verification:'Audited accounts',notes:'Decrease is the direction of change.',lastEditedBy:'Example',lastEditedAt:now()}
  ],
  snapshots:[]
 };
};

// ---------- Strategy, KPIs & Annual Planning (Module 6 tool) ----------
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
  K('KPI1','ESO1','Verified organisations active on the hub',0,250,[60,130,200,250],'Platform lead','Local organisations with a complete, verified profile accessed internationally in the last 90 days.','Hub analytics'),
  K('KPI2','ESO1','International connections facilitated',0,500,[80,220,380,500],'Platform lead','Connections initiated between an international actor and a local verified organisation.','Hub analytics'),
  K('KPI3','ESO2','People taking up ethical opportunities',0,1200,[200,500,900,1200],'Programme lead','Applicants placed into ethical employment, volunteering or internship positions through the platform.','Partner reporting'),
  K('KPI4','ESO3','Largest donor share of total income',72,45,[68,60,52,45],'Fundraising lead','Income from the single largest donor divided by total income.','Management accounts','Decrease','Percentage'),
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
  I('AP1','ESO1','KPI1','Launch the verified-organisations hub beta','Platform lead',1,9,45000,16000,45,'In progress'),
  I('AP2','ESO1','KPI2','Partner outreach in three new regions','Partnerships lead',3,12,22000,8000,35,'In progress'),
  I('AP3','ESO2','KPI3','Opportunity curation and safeguarding review','Programme lead',2,12,18000,6500,40,'On track'),
  I('AP4','ESO3','KPI4','Diversify funding — grants, individuals, partnerships','Fundraising lead',1,12,12000,4000,55,'At risk'),
  I('AP5','ISO1','KPI5','Board decision routine (quarterly)','Board chair',1,12,1500,500,50,'On track')
 ];
 return {
  version:2,
  meta:{organisation:org.organisation,planName:`Ethical Bridge annual plan (example) · ${year}`,year,from:year,to:year+3,mission:org.mission,vision:org.vision,values:org.values,impactGoal:'A globally connected ethical ecosystem that strengthens local change efforts.',preparedBy:org.preparedBy,reviewDate:'',currency:'USD',green:95,yellow:75,notes:org.notes},
  objectives,
  kpis,
  results,
  initiatives,
  reviews:[{id:uid('rev'),date:`${year}-${String(Math.max(1,qNow-1)*3+1).padStart(2,'0')}-05`,period:`Q${Math.max(1,qNow-1)}`,reviewer:'Leadership team',summary:'Hub beta making good progress; funder concentration still high.',decisions:[{id:uid('d'),decision:'Accelerate individual giving pilot','action':'Draft pilot plan',owner:'Fundraising lead',due:`${year}-${String(qNow*3).padStart(2,'0')}-30`,status:'In progress'}],snapshot:null}]
 };
};

window.MMExample={
 ethicalBridge:{
  org,
  external,
  internal,
  strategicObjectives,
  theoryOfChange,
  strategyKpis
 }
};
})();
