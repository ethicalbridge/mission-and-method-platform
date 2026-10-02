import {module,lesson,review,field} from './kit.js';
export default module({
 id:0,slug:'start-here',phase:'Clarify',title:'Start Here: Your Organisation Journey',
 short:'How the course works, your organisation profile and a baseline health check',
 intro:'See the whole journey before you begin. Describe the organisation you are building, choose the examples that fit your legal form and stage, and record an honest starting point you will revisit at the end of the course.',
 output:'Organisation Profile + Baseline Health Check',
 workbook:{file:'Module-00-Start-Here.xlsx',title:'Start Here workbook'},
 promo:{lesson:'journey',tools:['strategic-objectives','theory-of-change','strategy-kpis-annual-planning','meal-strategy'],
  headline:'Every output you build can become a live, shared plan',
  pitch:'The course gives you the method and an Excel workbook for every module. The Impact Tools turn the same work into connected records your team can update, review and report on — objectives, pathways, KPIs, indicators, risks and people in one place.'},
 lessons:[
 lesson({id:'journey',title:'How this course works',stage:'Understand',sheet:'Course map',minutes:15,
  learn:[
  'This course follows the order in which most organisations actually need to make decisions. You start with why you exist and what change you pursue, then decide who does what, how the organisation runs, how you show and communicate your results, how you stay solvent and compliant, how you sustain and partner, and finally how you turn everything into a plan you run and review.',
  'The thirteen modules after this one are grouped into five phases: Clarify (purpose, strategy and Theory of Change), Organise (structure, people and internal systems), Prove and Show (MEAL, brand and communications), Sustain and Protect (finance, legal and risk, resources and partnerships) and Run (plan, deliver and review). Each phase relies on the decisions made before it.',
  'Every lesson has three parts you can use in any order: a short video, the written explanation with examples, and an exercise that saves into your organisation pack. Each module also has an Excel workbook. The sheet for each lesson is named in the lesson, so you can work offline, share it with colleagues or keep a version history.',
  'Within each module, lessons move from understanding a concept, to designing your approach, to implementing it, managing it and reviewing it. You do not need to finish everything in one sitting. Draft honestly, mark what is uncertain and come back: later modules will show you where earlier answers need revising.'
  ],
  weak:'Skip to the module I need right now and copy a template.',
  strong:'Read the course map, start with Module 1, and use the module I need most urgently as a reason to keep going rather than as a shortcut.',
  why:'Templates copied out of sequence often contradict each other. A funding proposal built before your Theory of Change, or a policy written before you know your activities, usually has to be rewritten.',
  reflect:'Which decision feels most urgent for your organisation right now, and which earlier decision does it depend on?',
  exercise:'Look at the course map. Note the module you most need, the earlier decisions it depends on and when you plan to reach it.',
  fields:[field('priority','The module I most need','Which module, and why is it urgent now?'),field('dependencies','What it depends on','Which earlier decisions does it rely on? Are they already made?'),field('rhythm','My learning rhythm','When and how often will you work on the course? Who will join you?')],
  check:'Have you identified which earlier decisions your most urgent need depends on?'}),
 lesson({id:'profile',title:'Your organisation profile',stage:'Understand',sheet:'Organisation profile',
  learn:[
  'Purpose-led organisations take many forms: community groups, registered charities and nonprofits, foundations, cooperatives, social enterprises, companies with a social mission and hybrid structures that combine more than one entity. The principles in this course apply to all of them, but the vocabulary and some obligations differ.',
  'Your legal form shapes who governs the organisation, what you can do with surplus or profit, how you can raise money and which regulator you answer to. A nonprofit typically has trustees or a board and relies on grants and donations; a company has directors and shareholders and relies on revenue or investment. A hybrid may have both.',
  'Your stage matters as much as your form. An idea-stage founder needs light, reversible decisions. An organisation already delivering needs to formalise what works. An established organisation needs to review and simplify. Throughout the course, look for the proportionate version of each practice for your stage and size.',
  'If you have not chosen a legal form yet, record the options you are considering. Module 1 helps you think about organisational form, and Module 10 covers registration and legal duties. Do not register an entity only because a template or funder suggests it; take qualified local advice.'
  ],
  weak:'We are an NGO.',
  strong:'Idea stage. Two co-founders, no staff. Considering a nonprofit company for community delivery, with a possible trading arm later. Operating in one region; first activities planned with young people.',
  why:'The stronger profile names stage, size, form, geography and activities. Each one changes which policies, governance and funding options are relevant.',
  reflect:'Which parts of your profile are decided, and which are still assumptions?',
  exercise:'Complete your organisation profile. Mark anything undecided as an open question rather than guessing.',
  fields:[field('form','Organisational form','Nonprofit, foundation, company, social enterprise, cooperative, hybrid or undecided. Registered where?'),field('stage','Stage and size','Idea, early delivery, growing or established. People involved (paid, volunteer) and approximate annual budget.'),field('activities','Activities and geography','What you do or plan to do, where, and with whom. Note any work with children, vulnerable adults, personal data or money from the public.'),field('questions','Open questions','Decisions about your form, stage or scope that are still open.')],
  check:'Does your profile show your form, stage, activities and what is still undecided?'}),
 lesson({id:'health-check',title:'Baseline organisational health check',stage:'Review',sheet:'Health check',
  learn:[
  'A health check is a short self-assessment of how developed each part of your organisation is today. It is not a test and there is no passing score. Its purpose is to make your starting point visible so you can choose priorities and, at the end of the course, see what has changed.',
  'Rate each capability area on a simple scale: not started, informal, documented, practised and reviewed. "Documented" means written down; "practised" means people actually use it; "reviewed" means you check whether it works and improve it. Many organisations have documents that nobody practises.',
  'Be specific about evidence. If you rate safeguarding as "practised", what shows it? A trained focal person, a referral route people know about, a recorded concern handled correctly? Evidence keeps the assessment honest and makes it useful for a board, a funder or a new colleague.',
  'Involve at least one other person if you can: a co-founder, a board member, a staff member or a trusted peer. Differences in ratings are useful information. Repeat the same check in Module 13 and compare.'
  ],
  weak:'Everything is fine; we just need funding.',
  strong:'Strategy: documented, not yet reviewed. Finance: informal, a spreadsheet kept by the founder. Safeguarding: not started, although we plan youth activities. MEAL: informal attendance lists only.',
  why:'The stronger assessment names gaps that matter for the planned activities. It turns a vague worry into a priority list.',
  reflect:'Which low rating would cause the most harm if it stayed unchanged for a year?',
  exercise:'Rate each area, give one piece of evidence and name your three priorities for this course.',
  fields:[field('ratings','Capability ratings','One per line: area | rating (not started / informal / documented / practised / reviewed) | evidence. Areas: strategy, theory of change, governance, people, systems, MEAL, brand, communications, finance, legal and compliance, risk, resources, partnerships, planning.'),field('priorities','Top three priorities','Which three areas will you focus on first, and why?')],
  check:'Is every rating supported by a specific piece of evidence?'}),
 review('start-pack','Your starting point')
 ]
});
