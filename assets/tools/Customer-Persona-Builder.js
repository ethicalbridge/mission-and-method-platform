/* Customer Persona Builder — audience personas for comms & fundraising.
   Donor Mapping banded shape: one row per persona with FIVE column groups
   (Identity · Context · Motivation · Communication · Relationship). Dashboard
   on top (segment donut + ESO coverage), column editor with scoped
   add/hide/rename, three worked examples ready to load.
*/
(()=>{'use strict';
const S=window.MMSuite;if(!S){console.error('MMSuite missing');return}
const {esc,uid,now,today,currentYear,fmtDate,field,area,select,tip,pill,bar,card,empty,modal,formEnd,table,shell,importButtons,exportButtons,download,csv,XLSX_TYPE,buildXlsx,readmeSheet,schemaSheet,metaSheet,parseXlsx,findSheet,rowsToObjects,metaFromSheet,bind,formData,stamp,edited,editorName,clamp,s}=S;

const KEY='mission-method-personas-v3',LEGACY='mission-method-personas-v2',LEGACY1='mission-method-personas-v1';
const SO_KEY='mission-method-strategic-objectives-v2';
const TABS=['Overview','Register','Cards','Settings','Export'];
const DEFAULT_SEGMENTS=['Beneficiary','Donor (individual)','Donor (institutional)','Volunteer','Partner','Supporter / member','Staff recruit','Policy maker','Media','Other'];

// ---------- Default columns ----------
// 5 column groups mirror Donor Mapping's banded shape. Any band's columns
// can be shown / hidden / renamed; brand-new custom columns can be added
// to any band.
const DEFAULT_COLUMNS=[
 // Identity band
 {id:'i-code',scope:'identity',label:'Code',type:'text',w:52,info:'Short reference like PER1, PER2. Auto-filled when you add a persona.'},
 {id:'i-name',scope:'identity',label:'Name',type:'text',w:160,info:'A memorable name helps the team talk about this persona — fictional but specific. "Aisha" beats "Supporter A".'},
 {id:'i-segment',scope:'identity',label:'Segment',type:'segment',w:160,info:'Which audience group this persona represents (Beneficiary, Donor, Volunteer, etc.). Edit the list in Settings.'},
 {id:'i-archetype',scope:'identity',label:'Archetype',type:'area',w:220,info:'One sentence that captures the persona\'s essence — "Mid-career professional looking for meaningful ways to give".'},
 {id:'i-age',scope:'identity',label:'Age band',type:'text',w:80,info:'e.g. 30–45. Keep broad — personas are hypotheses, not individuals.'},
 {id:'i-location',scope:'identity',label:'Location',type:'text',w:130,info:'Where they live or operate from. City, region or country depending on how the audience splits.'},
 {id:'i-occupation',scope:'identity',label:'Occupation',type:'text',w:160,info:'Role or primary activity. Helps you picture their day and the time they have for your work.'},
 // Context band
 {id:'c-summary',scope:'context',label:'Summary',type:'area',w:260,info:'One short paragraph on who they are and what they are dealing with right now. The elevator pitch for this persona.'},
 {id:'c-quote',scope:'context',label:'In their voice',type:'area',w:240,info:'A short quote the persona might actually say about this issue or your work. Writing it in their words sharpens your sense of them.'},
 {id:'c-context',scope:'context',label:'Their world now',type:'area',w:240,info:'What is going on around them — pressures, priorities, who they talk to, what they are already doing related to your mission.'},
 {id:'c-typical',scope:'context',label:'A typical day',type:'area',w:220,info:'Optional. A paragraph on how they spend time, which moments of attention your message could land in.'},
 // Motivation band
 {id:'m-goals',scope:'motivation',label:'Goals',type:'area',w:220,info:'What they want to achieve — in their life, in relation to your issue. Separate from what you want from them.'},
 {id:'m-pains',scope:'motivation',label:'Pains / frustrations',type:'area',w:220,info:'What is getting in their way right now. Current frustrations are the opening for your message.'},
 {id:'m-motivators',scope:'motivation',label:'Motivators',type:'area',w:220,info:'What moves them — values, aspirations, identities. The deeper "why" behind their actions.'},
 {id:'m-barriers',scope:'motivation',label:'Barriers to action',type:'area',w:220,info:'What stops them acting even when they care — time, trust, cost, complexity. Address these in the ask.'},
 {id:'m-drivers',scope:'motivation',label:'Decision drivers',type:'area',w:200,info:'What tips the balance to a yes — social proof, a deadline, a trusted recommender, a clear ask.'},
 // Communication band
 {id:'k-resonate',scope:'communication',label:'Messages that resonate',type:'area',w:240,info:'Themes, phrases and framings that land with this persona. Specific is better than generic.'},
 {id:'k-avoid',scope:'communication',label:'Messages to avoid',type:'area',w:200,info:'Framings that put them off — jargon, guilt, saviourism, oversimplification. Future-you needs this.'},
 {id:'k-channels',scope:'communication',label:'Preferred channels',type:'text',w:180,info:'Where to reach them — LinkedIn, podcast, in-person events, WhatsApp. Rank by effectiveness, not reach.'},
 {id:'k-influences',scope:'communication',label:'Who they listen to',type:'text',w:180,info:'People, outlets or communities that shape their thinking. Who could you partner with to reach them?'},
 // Relationship band
 {id:'r-esos',scope:'relationship',label:'Relevant ESOs',type:'text',w:150,info:'Which external strategic objectives this persona matters for. Comma-separated codes (e.g. "ESO1, ESO3"). Marketing & Fundraising read this.'},
 {id:'r-relationship',scope:'relationship',label:'Relationship today',type:'area',w:220,info:'Where this persona is with you right now — unaware, aware, engaged, supporter, lapsed. The starting point for the journey.'},
 {id:'r-ask',scope:'relationship',label:'What they want from us',type:'area',w:220,info:'What they would hope for from the relationship. If you cannot name this, you have not interviewed anyone yet.'},
 {id:'r-ourAsk',scope:'relationship',label:'What we want from them',type:'area',w:220,info:'The specific ask — donate, volunteer, sign, share, show up. One primary ask per persona is enough.'}
];
const SCOPES=[['identity','Identity'],['context','Context'],['motivation','Motivation'],['communication','Communication'],['relationship','Relationship']];

const blankPersona=()=>({id:uid(),code:'',name:'',segment:'Supporter / member',archetype:'',ageBand:'',location:'',occupation:'',incomeBand:'',education:'',summary:'',quote:'',context:'',goals:'',pains:'',motivators:'',barriers:'',decisionDrivers:'',messagesThatResonate:'',messagesToAvoid:'',preferredChannels:'',influences:'',typicalDay:'',relevantEsos:'',relationshipWithUs:'',askOfUs:'',ourAskOfThem:'',custom:{},createdAt:now(),lastEditedBy:'',lastEditedAt:''});
const blankMeta=()=>({organisation:'',year:currentYear,preparedBy:'',notes:''});
const blankSettings=()=>({segments:[...DEFAULT_SEGMENTS],customColumns:[],columnOverrides:{}});
const blank=()=>({version:3,meta:blankMeta(),settings:blankSettings(),personas:[]});

// ---------- Migrations ----------
function migrateV2(v2){
 const out=blank();
 try{
  if(v2?.meta)Object.assign(out.meta,v2.meta);
  (v2?.personas||[]).forEach(p=>out.personas.push({...blankPersona(),...p,custom:p.custom||{}}));
 }catch(e){console.warn('personas v2→v3 failed',e)}
 return out;
}
const migrateV1=migrateV2;

// ---------- Three worked examples ----------
function makeExamples(){
 const P=(o)=>({...blankPersona(),...o});
 return [
  P({
   code:'PER1',name:'Aisha, mid-career supporter',segment:'Donor (individual)',archetype:'Mid-career urban professional giving monthly, looking for a cause she can tell her daughter about.',
   ageBand:'32–42',location:'London / Manchester commuter corridor',occupation:'Communications manager at a FTSE250',incomeBand:'£55–85k',education:'Masters',
   summary:'Aisha has given £15/month to a children\'s charity for six years but is quietly disillusioned by their comms. She wants to feel her money is doing something specific, told honestly, without emotional manipulation. She is the "warm" audience: already a donor, worth graduating to major gift.',
   quote:'I just want to know what my money actually did last quarter. Not another sad face asking for more.',
   context:'Two children under 10. Recently moved from the city to the commuter belt. Started a WhatsApp group for parents who want to give collectively. Follows two founders on LinkedIn who talk about systems change.',
   goals:'Give where she can see change. Model generosity for her kids. Pick a cause she can commit to long-term.',
   pains:'Floods of charity emails that all look the same. Guilt-driven asks. No evidence of impact.',
   motivators:'Agency. Specificity. Dignity in storytelling. Being treated as a thinking adult, not an ATM.',
   barriers:'Cynicism from previous experiences. Time to compare options. Spouse would need to be on board for larger gifts.',
   decisionDrivers:'A clear 3-year plan. A named programme lead she can email. Impact told without manipulation.',
   messagesThatResonate:'"Here is what £180/year does over 3 years." "You are one of 42 regular givers behind this programme." Honest trade-offs. Named beneficiaries speaking for themselves.',
   messagesToAvoid:'"Just £3 a month can save a life." Imagery of distressed children. Vague "transforming lives" copy. Urgency without specifics.',
   preferredChannels:'Email (longform OK), LinkedIn, one podcast, in-person once a year',
   influences:'Rutger Bregman, Caroline Fiennes, Giving What We Can, one trusted mentor who runs a grant-maker',
   typicalDay:'School run · tube in · head-down 9-6 · school run · dinner · 30 min scrolling before bed',
   relevantEsos:'ESO1, ESO3',
   relationshipWithUs:'Monthly donor (£15) since 2024. Opens about 40% of emails. Has not responded to any upgrade ask.',
   askOfUs:'Honest impact reporting. One in-person moment per year. A reason to upgrade that isn\'t guilt.',
   ourAskOfThem:'Upgrade to £50/month regular + one £500 Christmas gift. Introduce the organisation to her WhatsApp giving group of 8 families.'
  }),
  P({
   code:'PER2',name:'Isabela, programme officer at a foundation',segment:'Donor (institutional)',archetype:'Mid-level grants officer at a mid-sized European foundation, carrying 40 live grants and looking for grantees who do not add to her workload.',
   ageBand:'35–48',location:'Brussels / The Hague',occupation:'Programme officer, €18m foundation (education + climate adaptation)',incomeBand:'€65–85k',education:'Masters',
   summary:'Isabela is the gatekeeper for a mid-sized foundation. She has recommended four of our proposals internally in the past, but we have never been invited to a reserve-list conversation. She wants grantees who report on time, surface failures early, and let her look clever to her Director.',
   quote:'If I have to chase you for the Q3 report, that is the last proposal of yours I defend internally.',
   context:'Portfolio of 40 grants across 12 countries. Her Director reports to the Board quarterly. She has been with the foundation for 7 years and knows the sector. She\'s respected but overworked.',
   goals:'Grant to high-quality, lower-risk organisations. Minimise reputational and reporting risk. Build a 3-year pipeline she can defend to the Investment Committee.',
   pains:'Grantees who vanish for 6 months, then surface with excuses. Late reports. Over-promising in proposals. Vanity metrics.',
   motivators:'Being seen internally as a strategic grant-maker. Reciprocity — grantees who make her job easier.',
   barriers:'Her Director has to approve anything over €150k. Foundation policy restricts single-country support in certain regions.',
   decisionDrivers:'A clean track record on reports. A named Finance Director she can speak to. A theory of change that admits uncertainty.',
   messagesThatResonate:'"We missed the Q3 target. Here is why and what we are changing." Named individuals and their accountabilities. A clear role for her within our 3-year plan.',
   messagesToAvoid:'Jargon ("transformational"). Logframes without evidence. Impact stories without numbers to triangulate.',
   preferredChannels:'Email (concise). Quarterly 20-min video call. One in-person per year at a conference.',
   influences:'Peer foundations in her network. Alliance magazine. Candid, 360Giving data.',
   typicalDay:'Email triage · one grantee call · one internal committee prep · 2h on proposals · email triage · dinner · evening reading',
   relevantEsos:'ESO2, ESO4',
   relationshipWithUs:'Four previous proposals, two funded (2022 €120k, 2024 €200k). Last report on time. She\'s warm but not yet an advocate.',
   askOfUs:'A 3-year, multi-country proposal that is realistic. Honest mid-year check-ins. First alert if anything goes wrong.',
   ourAskOfThem:'€450k, 3 years, for the Harvest cohort programme. A reference call to one peer foundation we have not reached yet.'
  }),
  P({
   code:'PER3',name:'Daniel, 24-year-old sector newcomer',segment:'Volunteer',archetype:'Recent graduate volunteering while job-hunting, hoping to parlay the experience into a sector career.',
   ageBand:'22–28',location:'Nairobi / Lagos / Lima — large African or LatAm city',occupation:'Recent graduate (international relations), freelancing part-time',incomeBand:'Project-based',education:'Bachelors + currently applying to Masters',
   summary:'Daniel is three years out of university, under-employed, and spending ~15h/week volunteering across two causes while applying for his first sector job. He is a networked, articulate advocate — and a potential staff hire two years from now.',
   quote:'I will do the work. I just want to feel like I am building towards something, not fetching coffee.',
   context:'Lives with family. Active in two WhatsApp communities for recent sector graduates. Has 1,800 LinkedIn followers and posts about systems change twice a week. Mental health is fragile under the job-hunt pressure.',
   goals:'Build a sector career. Make 3 real relationships this year. Learn a hard skill (MEAL, grant-writing).',
   pains:'Being treated as unpaid labour. Vague role descriptions. Being asked for free advice without reciprocity. Isolation.',
   motivators:'Growth. Being named publicly. A mentor who takes him seriously. Doing work that matters.',
   barriers:'Transport costs. Family pressure to get a "real" job. Mental health days.',
   decisionDrivers:'A named mentor. A clear growth path (3-month plan). Reimbursed costs. A reference letter at the end.',
   messagesThatResonate:'"We want you here in 2 years. Here is the pathway." Recognition in a newsletter. Credit on a deliverable he can show.',
   messagesToAvoid:'"You will get great experience." "This is a chance to give back." Anything that treats his time as free.',
   preferredChannels:'WhatsApp (fast), Instagram, LinkedIn, in-person weekly',
   influences:'Edgar Villanueva, local sector podcasts, 2 specific mentors on LinkedIn',
   typicalDay:'Morning: applications · afternoon: 3-4h volunteering · evening: WhatsApp groups + 1h learning',
   relevantEsos:'ESO1',
   relationshipWithUs:'Volunteer with the MEAL team for 4 months. Reliable, articulate, under-utilised. Not yet in our hiring pipeline.',
   askOfUs:'A mentor. Reimbursement for transport. A reference letter in 6 months. A path to paid work.',
   ourAskOfThem:'8h/week on MEAL data entry + one piece of visible analysis. Shortlist for the junior MEAL officer post opening in Q2.'
  })
 ];
}

const storage=S.store({key:KEY,version:3,blank,legacy:[{key:LEGACY,migrate:migrateV2},{key:LEGACY1,migrate:migrateV1}],normalise:d=>{
 d=window.MMExample?.cleanupStaleExample?.(d,'mm.personas-cleanup-v3',blank)||d;
 if(!Array.isArray(d.personas))d.personas=[];
 if(!d.settings||typeof d.settings!=='object')d.settings=blankSettings();
 else{
  const s=d.settings;
  if(!Array.isArray(s.segments)||!s.segments.length)s.segments=[...DEFAULT_SEGMENTS];
  if(!Array.isArray(s.customColumns))s.customColumns=[];
  if(!s.columnOverrides||typeof s.columnOverrides!=='object')s.columnOverrides={};
 }
 d.personas.forEach(p=>{if(!p.custom||typeof p.custom!=='object')p.custom={}});
 return d;
}});
let db=storage.load(),tab='Overview',dlg='',message='';
let filters={segment:'',eso:'',q:''};
let columnsOpen=false;
const root=document.querySelector('#app');
const persist=d=>storage.save(d);
function save(note=''){storage.save(db);if(note)message=note;render()}

const getSegments=()=>db.settings.segments;
const readStore=k=>{try{const r=localStorage.getItem(k);if(!r)return null;const o=JSON.parse(r);return o&&typeof o==='object'?o:null}catch{return null}};
const soObjectives=()=>(readStore(SO_KEY)?.objectives||[]).filter(o=>o.code);
const nextCode=()=>{const nums=db.personas.map(p=>Number(String(p.code||'').replace(/\D/g,''))).filter(n=>!isNaN(n));return 'PER'+(Math.max(0,...nums)+1)};

// ---------- Dashboard ----------
const pct=(a,b)=>b?Math.round((a/b)*100):0;
function dashboardStats(){
 const P=db.personas;
 const total=P.length;
 const segCounts={};P.forEach(p=>{const s=p.segment||'Other';segCounts[s]=(segCounts[s]||0)+1});
 const segList=Object.entries(segCounts).sort((a,b)=>b[1]-a[1]);
 const esoLinked=P.filter(p=>(p.relevantEsos||'').trim()).length;
 const donorPersonas=P.filter(p=>(p.segment||'').startsWith('Donor')).length;
 const withQuote=P.filter(p=>(p.quote||'').trim()).length;
 const withChannels=P.filter(p=>(p.preferredChannels||'').trim()).length;
 const complete=P.filter(p=>p.name&&p.segment&&p.summary&&p.goals&&p.preferredChannels&&p.ourAskOfThem).length;
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const esoHits={};esos.forEach(o=>esoHits[o.code]=0);
 P.forEach(p=>{(p.relevantEsos||'').split(/[,;·|]+/).map(x=>x.trim()).filter(Boolean).forEach(code=>{if(esoHits[code]!=null)esoHits[code]++})});
 const esoCovered=Object.values(esoHits).filter(n=>n>0).length;
 return {total,segList,esoLinked,donorPersonas,withQuote,withChannels,complete,esos,esoHits,esoCovered};
}
function segBar(label,count,total){
 const share=pct(count,total);
 return `<div class="dm-fit-row"><div><span>${esc(label)}</span><strong>${count} · ${share}%</strong></div><span class="dm-fit-track"><i class="dm-fit-fill dm-fit-good" style="--share:${Math.max(share,count?3:0)}%"></i></span></div>`;
}
function visualDashboard(){
 const st=dashboardStats();
 const isEmpty=!st.total;
 const donorShare=pct(st.donorPersonas,st.total);
 const quoteShare=pct(st.withQuote,st.total);
 const completeShare=pct(st.complete,st.total);
 let coverageClass='early',coverageText=`<b>Just getting started.</b> ${isEmpty?'Add a persona to begin.':'No persona is fully filled yet.'}`;
 if(!isEmpty && completeShare===100){coverageClass='all-done';coverageText=`<b>✓ All complete.</b> Every persona has name, segment, summary, goals, channels and an ask.`}
 else if(!isEmpty && completeShare>=50){coverageClass='half-done';coverageText=`<b>${st.complete} of ${st.total} personas complete.</b> Fill in the missing goals, channels and asks.`}
 else if(!isEmpty && completeShare>0){coverageText=`<b>${st.complete} of ${st.total} personas complete.</b> Fill in the missing goals, channels and asks.`}
 return `<section class="dm-dashboard ${isEmpty?'dm-dashboard-empty':''}" aria-label="Persona library visual overview">
  <article class="dm-card dm-decision">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Audience split</p><h3>Segments covered</h3></div><span>${st.segList.length} of ${getSegments().length}</span></div>
   <div class="dm-donut-row">
    <div class="dm-donut" role="img" aria-label="${st.donorPersonas} donor personas" style="--go-share:${donorShare}%;--no-go-share:0%"><div><strong>${st.total}</strong><span>Personas</span></div></div>
    <dl class="dm-legend">
     <div class="dm-leg-go"><dt>Donor personas</dt><dd>${st.donorPersonas}</dd></div>
     <div class="dm-leg-review"><dt>With a quote</dt><dd>${st.withQuote}</dd></div>
     <div class="dm-leg-nogo"><dt>With channels</dt><dd>${st.withChannels}</dd></div>
    </dl>
   </div>
   ${isEmpty?`<p class="dm-empty-hint">Load the 3 examples on Overview or add your first persona.</p>`:''}
  </article>
  <article class="dm-card dm-fit">
   <div class="dm-card-head"><div><p class="dm-eyebrow">By segment</p><h3>Distribution</h3></div><span>${st.total} total</span></div>
   <div class="dm-fit-list">
    ${st.segList.slice(0,5).map(([seg,n])=>segBar(seg,n,st.total)).join('')||'<p class="dm-empty-hint">No personas yet.</p>'}
   </div>
  </article>
  <article class="dm-card dm-coverage">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Completeness</p><h3>Profile depth</h3></div><span>${st.complete}/${st.total}</span></div>
   <div class="dm-coverage-num"><strong>${completeShare}%</strong><span>of personas fully filled</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${completeShare}%"></i></div>
   <div class="dm-done-badge ${coverageClass}">${coverageText}</div>
   <dl class="dm-done-key">
    <div><dt>With a quote</dt><dd>${st.withQuote}</dd></div>
    <div><dt>With channels</dt><dd>${st.withChannels}</dd></div>
    <div><dt>ESO-linked</dt><dd>${st.esoLinked}</dd></div>
   </dl>
  </article>
  <article class="dm-card dm-assess">
   <div class="dm-card-head"><div><p class="dm-eyebrow">Strategy coverage · ${st.esos.length} ESO${st.esos.length===1?'':'s'}</p><h3>Persona ↔ ESO map</h3></div><span>${st.esoCovered}/${st.esos.length} covered</span></div>
   <div class="dm-coverage-num"><strong>${st.esoCovered}</strong><span>of your ESOs have at least one persona</span></div>
   <div class="dm-coverage-track" aria-hidden="true"><i style="--coverage:${st.esos.length?Math.round((st.esoCovered/st.esos.length)*100):0}%;background:linear-gradient(90deg,#16746e,#e56f4a)"></i></div>
   <div class="dm-verdict-row">
    ${st.esos.length?st.esos.map(o=>`<span class="dm-verdict-pill ${st.esoHits[o.code]>0?'go':'nogo'}"><b>${st.esoHits[o.code]||0}</b> ${esc(o.code)}</span>`).join(''):'<span class="dm-verdict-pill">No ESOs in Strategic Objectives yet</span>'}
   </div>
   <p class="dm-assess-hint">Which strategic objectives have an audience persona behind them. A blank means that ESO has no named audience in the library — probably worth adding one.</p>
  </article>
 </section>`;
}

// ---------- Columns ----------
function allColumns(){
 const overrides=db.settings.columnOverrides||{};
 const defaults=DEFAULT_COLUMNS.map(c=>{const o=overrides[c.id]||{};return {...c,label:o.label??c.label,hidden:!!o.hidden,custom:false}});
 const custom=(db.settings.customColumns||[]).map(c=>({...c,custom:true,hidden:!!c.hidden,info:c.info||'Custom column — added from the Columns panel.'}));
 return [...defaults,...custom];
}
const visibleColumns=(scope)=>allColumns().filter(c=>c.scope===scope&&!c.hidden);

// Map default column id → persona field name
const COL_FIELD={
 'i-code':'code','i-name':'name','i-segment':'segment','i-archetype':'archetype','i-age':'ageBand','i-location':'location','i-occupation':'occupation',
 'c-summary':'summary','c-quote':'quote','c-context':'context','c-typical':'typicalDay',
 'm-goals':'goals','m-pains':'pains','m-motivators':'motivators','m-barriers':'barriers','m-drivers':'decisionDrivers',
 'k-resonate':'messagesThatResonate','k-avoid':'messagesToAvoid','k-channels':'preferredChannels','k-influences':'influences',
 'r-esos':'relevantEsos','r-relationship':'relationshipWithUs','r-ask':'askOfUs','r-ourAsk':'ourAskOfThem'
};

// ---------- Small helpers ----------
const infoTip=(text)=>text?`<span class="dm-info" title="${esc(text)}" aria-label="${esc(text)}" tabindex="0">i</span>`:'';

// ---------- Overview ----------
function overviewView(){
 const m=db.meta;
 return `${window.MMExample?.renderIntegration?.('personas')||''}
  <section class="work-box">
   <div class="work-head">
    <span class="work-badge">Workspace</span>
    <input class="work-org" data-field="organisation" value="${esc(m.organisation)}" placeholder="Add your organisation name →" aria-label="Organisation name">
    <span class="work-status" id="work-status"></span>
   </div>
   <div class="work-meta">
    <label class="work-field"><span>Planning year</span><input data-field="year" type="number" value="${esc(m.year)}" min="2000" max="2200"></label>
    <label class="work-field"><span>Prepared by</span><input data-field="preparedBy" value="${esc(m.preparedBy)}" placeholder="Your name or team"></label>
    <label class="work-field full"><span>Notes</span><textarea data-field="notes" placeholder="How these personas were developed — research base, interview count, review date.">${esc(m.notes)}</textarea></label>
   </div>
   ${visualDashboard()}
   <div class="work-sect-head" style="margin-top:20px"><h3>How this tool works</h3></div>
   <div class="dm-readme">
    <article><h4>One persona per row · five bands</h4><p>The Register has five column groups: <b>Identity</b>, <b>Context</b>, <b>Motivation</b>, <b>Communication</b> and <b>Relationship</b>. One row per persona — read left to right you get everything about that audience.</p></article>
    <article><h4>Research, not stereotypes</h4><p>A good persona is a working hypothesis grounded in interviews, surveys and real conversations. Mark the "In their voice" cell with words the persona actually used in an interview. Review at least annually.</p></article>
    <article><h4>Customise columns</h4><p>Use the <b>⚙ Columns</b> button on the Register to show, hide, rename or delete columns in any band, or add brand-new custom ones (text, long text, date, dropdown). Values survive hidden columns.</p></article>
    <article><h4>ESO linking</h4><p>Tag each persona with the ESO code(s) it matters for (<code>ESO1, ESO3</code>). The dashboard's Strategy coverage card shows which ESOs still have no audience behind them.</p></article>
    <article><h4>Flows into other tools</h4><p>Marketing &amp; Social Planner and Individual Giving &amp; Donor Management both read these personas to pick voice, channel and ask. Keep them current — a stale persona drives wrong tone across the suite.</p></article>
    <article><h4>Visual cards</h4><p>The <b>Cards</b> tab renders each persona as a shareable card — printable, pastable into decks, good for a team wall. The Register is the one you edit; the Cards are the one you present.</p></article>
   </div>
   <div class="actions" style="margin-top:18px">
    <button class="button" data-action="new-persona">+ Add a persona</button>
    <button class="button secondary" data-action="load-example">Load 3 example personas</button>
    <a class="button secondary" href="#" data-tab="Register">Open the register →</a>
    <a class="button secondary" href="#" data-tab="Cards">See the cards →</a>
   </div>
  </section>`;
}

// ---------- Cell renderers ----------
function cellInput(row,field,ph=''){return `<input class="dm-grid-cell dm-grid-input" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}" value="${esc(row[field]||'')}" placeholder="${esc(ph)}">`}
function cellArea(row,field,ph=''){return `<textarea class="dm-grid-cell dm-grid-area" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}" rows="1" placeholder="${esc(ph)}">${esc(row[field]||'')}</textarea>`}
function cellSelect(row,field,opts){
 const current=String(row[field]||'');
 const flat=opts.map(o=>Array.isArray(o)?String(o[0]):String(o));
 const needsExtra=current&&!flat.includes(current);
 const all=needsExtra?[[current,current+' (not in list)'],...opts]:opts;
 return `<select class="dm-grid-cell dm-grid-sel" data-grid-id="${esc(row.id)}" data-grid-field="${esc(field)}">${all.map(o=>{const [v,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${current===String(v)?'selected':''}>${esc(l||'—')}</option>`}).join('')}</select>`;
}
function cellCustom(row,col){
 const val=row.custom?.[col.id]||'';
 const base=`data-grid-id="${esc(row.id)}" data-grid-field="custom:${esc(col.id)}"`;
 if(col.type==='select'){const opts=col.opts||[];return `<select class="dm-grid-cell dm-grid-sel" ${base}><option value=""></option>${opts.map(o=>`<option value="${esc(o)}" ${val===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`}
 if(col.type==='date')return `<input type="date" class="dm-grid-cell dm-grid-input dm-grid-date" ${base} value="${esc(val)}">`;
 if(col.type==='area')return `<textarea class="dm-grid-cell dm-grid-area" ${base} rows="1">${esc(val)}</textarea>`;
 return `<input class="dm-grid-cell dm-grid-input" ${base} value="${esc(val)}">`;
}
function renderCell(row,col){
 if(col.custom)return cellCustom(row,col);
 if(col.id==='i-segment')return cellSelect(row,'segment',getSegments().map(x=>[x,x]));
 const f=COL_FIELD[col.id];if(!f)return '<div class="dm-grid-na">—</div>';
 if(col.type==='area')return cellArea(row,f);
 return cellInput(row,f);
}

// ---------- Filters ----------
function matchesFilters(p){
 if(filters.segment && (p.segment||'')!==filters.segment)return false;
 if(filters.eso && !(p.relevantEsos||'').toUpperCase().includes(filters.eso.toUpperCase()))return false;
 if(filters.q){const q=filters.q.toLowerCase();const hay=Object.values(p).filter(x=>typeof x==='string').join(' ').toLowerCase();if(!hay.includes(q))return false}
 return true;
}

// ---------- Column editor ----------
function columnEditorPanel(){
 if(!columnsOpen)return '';
 const scopeBlock=(scope,label)=>{
  const cols=allColumns().filter(c=>c.scope===scope);
  const rows=cols.map(c=>{
   const canDel=c.custom;
   const canHide=!(c.id==='i-code'||c.id==='i-name');
   return `<li class="dm-col-row">
    <label class="dm-col-vis"><input type="checkbox" data-col-action="toggle-hide" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" ${c.hidden?'':'checked'} ${canHide?'':'disabled'}><span>${canHide?'Show':'Required'}</span></label>
    <input class="dm-col-label" data-col-action="rename" data-col-id="${esc(c.id)}" data-col-custom="${c.custom?1:0}" value="${esc(c.label)}" aria-label="Column label">
    <span class="dm-col-type">${esc(c.custom?(c.type||'text'):c.type)}${c.custom?' · custom':''}</span>
    ${canDel?`<button class="link danger" data-action="delete-column" data-col-id="${esc(c.id)}" title="Delete this custom column">✕</button>`:'<span></span>'}
   </li>`;
  }).join('');
  return `<section class="dm-col-scope"><h4>${esc(label)} band</h4><ul class="dm-col-list">${rows}</ul></section>`;
 };
 return `<section class="dm-col-panel">
  <div class="dm-col-head"><h3>Columns ${infoTip('Show, hide, rename or delete columns in each band. Hidden columns keep every stored value — unhide them any time.')}</h3><button class="link" data-action="toggle-columns">✕ Close</button></div>
  <div class="dm-col-scopes" style="grid-template-columns:1fr 1fr">
   ${SCOPES.map(([s,l])=>scopeBlock(s,l)).join('')}
  </div>
  <form class="dm-col-add" data-form="add-column" onsubmit="return false">
   <label><span>Add to band</span><select name="scope">${SCOPES.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select></label>
   <label><span>New column name</span><input name="label" placeholder="e.g. Preferred language, Giving history" required></label>
   <label><span>Type</span><select name="type"><option value="text">Short text</option><option value="area">Long text (auto-grow)</option><option value="date">Date</option><option value="select">Dropdown</option></select></label>
   <label class="dm-col-opts"><span>Dropdown options (one per line — only for Dropdown)</span><textarea name="opts" rows="2" placeholder="Low&#10;Medium&#10;High"></textarea></label>
   <button class="button" data-action="add-column">+ Add column</button>
  </form>
 </section>`;
}

// ---------- Register (banded wide grid) ----------
function registerView(){
 const scopeCols={};SCOPES.forEach(([s])=>{scopeCols[s]=visibleColumns(s)});
 const matching=db.personas.filter(matchesFilters);
 const sorted=[...matching].sort((a,b)=>(a.segment||'').localeCompare(b.segment||'')||(a.name||'').localeCompare(b.name||''));
 const filterCount=['segment','eso','q'].filter(k=>filters[k]).length;
 const esos=soObjectives().filter(o=>(o.group||'External')==='External');
 const filterBar=`<div class="dm-filter-bar">
  <label class="dm-filt-label"><span>Segment</span><select class="dm-filt-sel" data-filter="segment"><option value="">All</option>${getSegments().map(st=>`<option value="${esc(st)}" ${filters.segment===st?'selected':''}>${esc(st)}</option>`).join('')}</select></label>
  ${esos.length?`<label class="dm-filt-label"><span>ESO</span><select class="dm-filt-sel" data-filter="eso"><option value="">All</option>${esos.map(o=>`<option value="${esc(o.code)}" ${filters.eso===o.code?'selected':''}>${esc(o.code)} · ${esc(o.title)}</option>`).join('')}</select></label>`:''}
  <label class="dm-filt-label dm-filt-search"><span>Search</span><input type="search" class="dm-filt-input" data-filter="q" value="${esc(filters.q||'')}" placeholder="Any text in any field…"></label>
  ${filterCount?`<button class="button secondary" data-action="filter-clear" style="align-self:flex-end">Clear filters (${filterCount})</button>`:''}
  <div class="dm-filter-count">Showing <b>${matching.length}</b> of <b>${db.personas.length}</b> persona${db.personas.length===1?'':'s'}</div>
 </div>`;
 const bandClass={identity:'dm-grid-group-general',context:'dm-grid-group-strategy',motivation:'dm-grid-group-likelihood',communication:'dm-grid-group-technical',relationship:'dm-grid-group-risk'};
 const bandIcon={identity:'👤',context:'🌍',motivation:'🎯',communication:'📣',relationship:'🤝'};
 const groupHeader=`<tr class="dm-grid-group-row">
  ${SCOPES.map(([s,l])=>`<th class="dm-grid-group ${bandClass[s]}" colspan="${scopeCols[s].length}">${bandIcon[s]} ${esc(l)}${infoTip(SCOPES_INFO[s])}</th>`).join('')}
  <th class="dm-grid-group dm-grid-group-del"></th>
 </tr>`;
 const colHeader=`<tr class="dm-grid-col-row">
  ${SCOPES.map(([s])=>scopeCols[s].map(c=>`<th class="dm-grid-th dm-grid-th-${s}" style="min-width:${c.w}px">${esc(c.label)}${infoTip(c.info)}</th>`).join('')).join('')}
  <th class="dm-grid-th"></th>
 </tr>`;
 const rows=sorted.map(p=>{
  const cells=SCOPES.map(([s])=>scopeCols[s].map(c=>`<td class="dm-grid-td dm-grid-td-${s} dm-grid-td-${c.id}" style="min-width:${c.w}px;max-width:${Math.max(c.w,220)}px">${renderCell(p,c)}</td>`).join('')).join('');
  return `<tr data-row="${esc(p.id)}" class="dm-row-persona">${cells}<td class="dm-grid-del"><button class="link" data-action="delete-persona" data-id="${esc(p.id)}" title="Delete persona">✕</button></td></tr>`;
 }).join('');
 const totalCols=SCOPES.reduce((n,[s])=>n+scopeCols[s].length,0)+1;
 const emptyMsg=db.personas.length?`<b>No personas match these filters.</b> Clear filters to see all ${db.personas.length} personas.`:`<b>Empty library.</b> Click + Add persona below, or <b>Load 3 example personas</b> on Overview to see the three worked examples (Aisha, Isabela, Daniel) populate.`;
 return `${visualDashboard()}
  <div class="rowhead section-head" style="margin:16px 0 8px"><div><h2>Persona register</h2><p>One row per audience persona, with five banded groups left to right: who they are (Identity), their world (Context), what drives them (Motivation), how to reach them (Communication), and where you stand with them (Relationship). Cells auto-grow — nothing is cut.</p></div>
   <div class="actions dm-toolbar">
    <button class="button" data-action="new-persona">+ Add persona</button>
    <button class="button secondary ${columnsOpen?'is-active':''}" data-action="toggle-columns">⚙ Columns${columnsOpen?' ✕':''}</button>
    <button class="button secondary" data-action="load-example">Load examples</button>
   </div>
  </div>
  ${columnEditorPanel()}
  ${filterBar}
  <div class="dm-grid-wrap">
   <table class="dm-grid dm-grid-personas">
    <thead>${groupHeader}${colHeader}</thead>
    <tbody>${rows||`<tr><td colspan="${totalCols}" class="muted" style="padding:30px;text-align:center">${emptyMsg}</td></tr>`}</tbody>
   </table>
  </div>`;
}

const SCOPES_INFO={identity:'Who they are at a glance — a working hypothesis to be refined with research.',context:'Their world and what they are dealing with right now. The ground your message has to land on.',motivation:'What they want, what hurts, what moves them. Why they would (or would not) say yes.',communication:'How to reach them — tone, channels, who they already trust.',relationship:'Where you stand with them, what they want from the relationship, and the specific ask you have.'};

// ---------- Cards view ----------
function cardsView(){
 if(!db.personas.length)return `<div class="rowhead section-head"><div><h2>Persona cards</h2><p>At-a-glance view of every persona. Load 3 examples on Overview or add your first persona.</p></div><button class="button" data-action="load-example">Load examples</button></div><p class="example-empty">No personas yet.</p>`;
 const cards=db.personas.map(p=>`<article class="persona-card">
  <div class="persona-head">
   <div class="persona-avatar">${esc((p.name||'?').slice(0,1).toUpperCase())}</div>
   <div><h3>${esc(p.name||'Untitled')}</h3><small>${esc(p.code)} · ${esc(p.segment||'Other')}</small></div>
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
 </article>`);
 return `<div class="rowhead section-head"><div><h2>Persona cards</h2><p>Shareable snapshot of every persona — printable, pastable into decks, good for a team wall. Edit the full profile on the Register tab.</p></div><button class="button" data-action="new-persona">+ Add persona</button></div>
  <div class="persona-grid">${cards.join('')}</div>`;
}

// ---------- Settings ----------
function settingsView(){
 const s=db.settings;
 return `<div class="rowhead section-head"><div><h2>Customise lists</h2><p>Adapt the Segment list to your organisation. Rows that use a removed value keep it ("<i>not in list</i>" in the dropdown) so no data is ever lost. Columns themselves are edited from the <b>⚙ Columns</b> button on the Register tab.</p></div><button class="button secondary" data-action="settings-reset">Reset lists to defaults</button></div>
  <div class="dm-settings-grid">
   <article class="dm-settings-block">
    <h3>Audience segments ${infoTip('The Segment dropdown on each persona. Default: Beneficiary, Donor (individual), Donor (institutional), Volunteer, Partner, Supporter / member, Staff recruit, Policy maker, Media, Other.')}</h3>
    <p class="muted">One value per line. First value is the fallback default on new personas.</p>
    <textarea class="dm-settings-area" data-settings-key="segments" rows="${Math.max(s.segments.length+1,6)}">${esc(s.segments.join('\n'))}</textarea>
    <small class="dm-settings-count">${s.segments.length} value${s.segments.length===1?'':'s'}</small>
   </article>
  </div>
  <p class="tiny" style="margin-top:14px">Changes save as you type. To undo, use <b>Reset lists to defaults</b> above.</p>`;
}

function exportViewPanel(){return `${exportButtons()}<section class="panel"><h2>What the Excel workbook contains</h2><ul style="font-size:13px;line-height:1.5"><li>Read me — how to use the workbook offline</li><li>Meta — organisation / year / prepared by</li><li>Personas — one row per persona with every field</li><li>Custom columns round-trip as additional labelled columns</li><li>_schema — field list for round-trip import</li></ul></section>`}

// ---------- Actions ----------
function action(el){
 const a=el.dataset.action,id=el.dataset.id,tabTarget=el.dataset.tab;
 if(tabTarget){tab=tabTarget;dlg='';message='';render();return}
 if(a==='toggle-columns'){columnsOpen=!columnsOpen;render();return}
 if(a==='close'){dlg='';render();return}
 if(a==='new-persona'){const p=blankPersona();p.code=nextCode();db.personas.push(p);if(tab==='Overview'||tab==='Cards')tab='Register';save('Persona row added.');setTimeout(()=>{const el=root.querySelector(`[data-grid-id="${p.id}"][data-grid-field="name"]`);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}},50);return}
 if(a==='delete-persona'){const p=db.personas.find(x=>x.id===id);if(!p)return;if(!confirm(`Delete persona ${p.code} (${p.name||'Untitled'})? Cannot be undone.`))return;db.personas=db.personas.filter(x=>x.id!==id);save('Persona deleted.');return}
 if(a==='filter-clear'){filters={segment:'',eso:'',q:''};render();return}
 if(a==='settings-reset'){if(!confirm('Reset segments to defaults? Your personas keep their stored values.'))return;Object.assign(db.settings,blankSettings(),{customColumns:db.settings.customColumns,columnOverrides:db.settings.columnOverrides});save('Lists reset.');return}
 if(a==='delete-column'){const colId=el.dataset.colId;const col=db.settings.customColumns.find(c=>c.id===colId);if(!col)return;if(!confirm(`Delete the custom column "${col.label}"?`))return;db.settings.customColumns=db.settings.customColumns.filter(c=>c.id!==colId);db.personas.forEach(r=>{if(r.custom)delete r.custom[colId]});save('Column deleted.');return}
 if(a==='add-column'){
  const form=root.querySelector('form[data-form="add-column"]');if(!form)return;
  const label=form.label.value.trim();if(!label){alert('Give the column a name first.');return}
  const scope=form.scope.value;
  const type=form.type.value;
  const opts=type==='select'?form.opts.value.split('\n').map(x=>x.trim()).filter(Boolean):[];
  if(type==='select'&&!opts.length){alert('Add at least one dropdown option.');return}
  const id=scope.charAt(0)+'-c-'+uid();
  db.settings.customColumns.push({id,scope,label,type,opts,hidden:false});
  save(`Added "${label}" to the ${scope} band.`);
  return;
 }
 if(a==='load-example'){
  if(db.personas.length && !confirm('Replace the current personas with the three worked examples (Aisha, Isabela, Daniel)?'))return;
  db.personas=makeExamples();
  if(!db.meta.organisation)db.meta.organisation='Harvest Learning Foundation';
  tab='Register';
  save('Three example personas loaded: Aisha (individual donor), Isabela (foundation grants officer), Daniel (early-career volunteer). Donor / institutional-donor / volunteer covered so the dashboard lights up with mixed segments.');
  return;
 }
 if(a==='xlsx'){try{download('Method-into-Impact-personas.xlsx',buildWorkbook(true),XLSX_TYPE);message='Excel downloaded.';render()}catch(e){message='Excel failed: '+e.message;render()}return}
 if(a==='csv'){download('Method-into-Impact-personas.csv',csv([['Code','Name','Segment','Age','Occupation','ESOs','Summary'],...db.personas.map(p=>[p.code,p.name,p.segment,p.ageBand,p.occupation,p.relevantEsos,p.summary])]),'text/csv;charset=utf-8');return}
 if(a==='print'){window.print();return}
 if(a==='export-json'){download('Method-into-Impact-personas.json',JSON.stringify({...db,exportedAt:now()},null,2),'application/json');return}
 if(a==='download-template'){try{download('Method-into-Impact-personas-TEMPLATE.xlsx',buildWorkbook(false),XLSX_TYPE)}catch(e){message='Template failed: '+e.message;render()}return}
}

function buildWorkbook(withData){
 const customLabels=(db.settings.customColumns||[]).map(c=>c.label);
 const sheets=[
  readmeSheet('Audience personas',['One persona per audience segment. Keep them research-based and current.','Round-trip supported: importing this workbook back updates every row by code.']),
  metaSheet(db.meta),
  {name:'Personas',rows:[
   ['Code','Name','Segment','Archetype','Age','Location','Occupation','Income','Education','Summary','Quote','Context','Goals','Pains','Motivators','Barriers','Decision drivers','Messages that resonate','Messages to avoid','Preferred channels','Influences','Typical day','Relevant ESOs','Relationship with us','What they want from us','What we want from them',...customLabels],
   ...(withData?db.personas.map(p=>{const cv={};(db.settings.customColumns||[]).forEach(c=>{cv[c.label]=p.custom?.[c.id]||''});return [p.code,p.name,p.segment,p.archetype,p.ageBand,p.location,p.occupation,p.incomeBand,p.education,p.summary,p.quote,p.context,p.goals,p.pains,p.motivators,p.barriers,p.decisionDrivers,p.messagesThatResonate,p.messagesToAvoid,p.preferredChannels,p.influences,p.typicalDay,p.relevantEsos,p.relationshipWithUs,p.askOfUs,p.ourAskOfThem,...customLabels.map(l=>cv[l]||'')]}):[])
  ]},
  schemaSheet({Personas:'code,name,segment,archetype,ageBand,location,occupation,incomeBand,education,summary,quote,context,goals,pains,motivators,barriers,decisionDrivers,messagesThatResonate,messagesToAvoid,preferredChannels,influences,typicalDay,relevantEsos,relationshipWithUs,askOfUs,ourAskOfThem'})
 ];
 return buildXlsx(sheets);
}
async function importXlsxFile(file){try{const data=await parseXlsx(await file.arrayBuffer());const meta=metaFromSheet(findSheet(data,'Meta'));if(meta)Object.assign(db.meta,meta);const rows=rowsToObjects(findSheet(data,'Personas'));if(rows?.length)db.personas=rows.map(r=>({...blankPersona(),code:r.Code||'',name:r.Name||'',segment:r.Segment||'Other',archetype:r.Archetype||'',ageBand:r.Age||'',location:r.Location||'',occupation:r.Occupation||'',incomeBand:r.Income||'',education:r.Education||'',summary:r.Summary||'',quote:r.Quote||'',context:r.Context||'',goals:r.Goals||'',pains:r.Pains||'',motivators:r.Motivators||'',barriers:r.Barriers||'',decisionDrivers:r['Decision drivers']||'',messagesThatResonate:r['Messages that resonate']||'',messagesToAvoid:r['Messages to avoid']||'',preferredChannels:r['Preferred channels']||'',influences:r.Influences||'',typicalDay:r['Typical day']||'',relevantEsos:r['Relevant ESOs']||'',relationshipWithUs:r['Relationship with us']||'',askOfUs:r['What they want from us']||'',ourAskOfThem:r['What we want from them']||''}));save('Excel imported.')}catch(e){message='Excel import failed: '+e.message;render()}}
async function importJsonFile(file){try{let d=JSON.parse(await file.text());if(!d||(d.version!==3&&d.version!==2))throw new Error('Not a v2/v3 backup');if(d.version===2)d=migrateV2(d);db=d;save('JSON imported.')}catch(e){message='Import failed: '+e.message;render()}}

function autosize(el){if(!el||el.tagName!=='TEXTAREA')return;el.style.height='auto';el.style.height=Math.max(el.scrollHeight,30)+'px'}

function wireStart(root){const box=root.querySelector('.work-box');if(!box)return;const status=box.querySelector('#work-status');let timer;const schedule=()=>{if(status)status.textContent='Saving…';clearTimeout(timer);timer=setTimeout(()=>{persist(db);if(status){status.textContent='✓ Saved';setTimeout(()=>status.textContent='',1500)}},400)};box.querySelectorAll('.work-meta [data-field],.work-head [data-field]').forEach(el=>{el.addEventListener('input',()=>{const k=el.dataset.field;db.meta[k]=el.type==='number'?(el.value===''?'':Number(el.value)):el.value;schedule()});el.addEventListener('change',()=>{if(el.tagName==='SELECT'){const k=el.dataset.field;db.meta[k]=el.value;schedule()}})})}
function wireSettings(root){const areas=root.querySelectorAll('[data-settings-key]');if(!areas.length)return;let timer;areas.forEach(el=>{autosize(el);el.addEventListener('input',()=>{const key=el.dataset.settingsKey;const list=el.value.split('\n').map(x=>x.trim()).filter(Boolean);if(list.length)db.settings[key]=list;const cnt=el.parentElement.querySelector('.dm-settings-count');if(cnt)cnt.textContent=`${list.length} value${list.length===1?'':'s'}`;autosize(el);clearTimeout(timer);timer=setTimeout(()=>persist(db),400)})})}
function wireColumnEditor(root){const panel=root.querySelector('.dm-col-panel');if(!panel)return;let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);render()},400)};panel.querySelectorAll('[data-col-action="toggle-hide"]').forEach(el=>{el.addEventListener('change',()=>{const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c)c.hidden=!el.checked}else{const o=db.settings.columnOverrides[id]||{};o.hidden=!el.checked;db.settings.columnOverrides[id]=o}persist(db);render()})});panel.querySelectorAll('[data-col-action="rename"]').forEach(el=>{el.addEventListener('input',()=>{const id=el.dataset.colId;const custom=el.dataset.colCustom==='1';const val=el.value;if(custom){const c=db.settings.customColumns.find(c=>c.id===id);if(c)c.label=val}else{const o=db.settings.columnOverrides[id]||{};o.label=val;db.settings.columnOverrides[id]=o}schedule()})})}
function wireRegister(root){const grid=root.querySelector('.dm-grid');wireFilters(root);if(!grid)return;grid.querySelectorAll('textarea.dm-grid-area').forEach(autosize);let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>{persist(db);rerenderDashboard(root)},300)};grid.querySelectorAll('[data-grid-field]').forEach(el=>{const ev=(el.tagName==='SELECT'||el.type==='date')?'change':'input';el.addEventListener(ev,()=>{const id=el.dataset.gridId,f=el.dataset.gridField;const row=db.personas.find(x=>x.id===id);if(!row)return;if(f.startsWith('custom:')){const cid=f.slice(7);row.custom=row.custom||{};row.custom[cid]=el.value}else{row[f]=el.value}stamp(row);if(el.tagName==='TEXTAREA')autosize(el);schedule()})})}
function rerenderDashboard(root){const dash=root.querySelector('.dm-dashboard');if(!dash)return;const div=document.createElement('div');div.innerHTML=visualDashboard();const fresh=div.querySelector('.dm-dashboard');if(fresh)dash.replaceWith(fresh)}
function wireFilters(root){const bar=root.querySelector('.dm-filter-bar');if(!bar)return;let qTimer;bar.querySelectorAll('[data-filter]').forEach(el=>{const key=el.dataset.filter;if(el.tagName==='SELECT'){el.addEventListener('change',()=>{filters[key]=el.value;render()})}else{el.addEventListener('input',()=>{clearTimeout(qTimer);qTimer=setTimeout(()=>{filters[key]=el.value;render();const f=root.querySelector(`[data-filter="${key}"]`);if(f)f.focus()},200)})}})}

function render(){
 const views={'Overview':overviewView,'Register':registerView,'Cards':cardsView,'Settings':settingsView,'Export':exportViewPanel};
 if(!views[tab])tab='Overview';
 root.innerHTML=shell({eyebrow:'Communications · Audience personas · build 2026-10-09d',title:'Customer Persona Builder',intro:'One persona per audience segment, in five banded groups: Identity · Context · Motivation · Communication · Relationship. Inline-editable, column-customisable, with three worked examples ready to load.',module:{href:'https://ethicalbridge.github.io/mission-and-method-platform/learn.html?module=8&lesson=audiences',label:'Review Module 8'},tabs:TABS,active:tab,message,content:views[tab](),modal:dlg});
 bind(root,{tab:t=>{tab=t;message='';dlg='';columnsOpen=false;render()},action,submit:()=>{},importXlsx:importXlsxFile,importJson:importJsonFile});
 wireStart(root);
 wireSettings(root);
 wireColumnEditor(root);
 wireRegister(root);
}

persist(db);render();
})();
