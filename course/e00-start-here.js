import base from './m00-start-here.js?v=deeplink1';
import {adapt} from './adapt.js?v=deeplink1';
// Entrepreneurs' version of m00: same lessons, fields, workbook and tools; wording for people building something new.
export default adapt(base,{
 title:'Start Here: Your Founder Journey',
 short:'How the course works, a profile of what you are building and a baseline health check',
 intro:'See the whole journey before you begin. Describe the idea or organisation you are building, where it stands and who is involved so far, and record an honest starting point you will revisit at the end of the course.',
 output:'Founding Profile + Baseline Health Check',
 promo:{
  headline:'Every foundation you build can become a live, shared plan',
  pitch:'The course gives you the method and an Excel workbook for every module. The Impact Tools turn the same work into connected records that you, your co-founders and the people who join you later can update, review and report on: objectives, pathways, key performance indicators (KPIs), indicators, risks and people in one place.'
 }
},{
 journey:{
  learn:[
   'This course follows the order in which most founders need to make decisions. You start with why your organisation should exist and the change you want, then decide how it will be organised, how you will show your results, and how you will stay solvent, legal and safe from the start. Each step lays a foundation for the next, so you build on solid ground instead of repairing it later.',
   'The ten modules after this one form four courses: Clarify, Organise, Prove & Show, and Protect. Each course relies on decisions made in the one before it, so the module you need most urgently often depends on earlier work. This is especially true at the start: a question about registration or money usually depends on what you are for and who you serve.',
   'Every lesson has a short video, a written explanation and an exercise that saves into Your Organisation, your founding pack. At the end of each module you can download what you built as a PDF or a text file to share with a co-founder or adviser, and keep earlier versions as your thinking changes.',
   'Within each module, lessons move from understanding a concept to designing, implementing, managing and reviewing it. For now, some of these steps will be plans rather than practice, and that is fine. You do not need to finish in one sitting. Draft honestly, mark what is uncertain and come back: later modules show you where earlier answers need revising.'
  ],
  weak:'Skip straight to registration and copy a template.',
  strong:'“We most need Module 10, because we want to register the bakery before our three informal months at the market stall end. Registration depends on our choice of form and on our mission, so we will work through Module 01 first and reach Module 10 within three months.”',
  why:'It names the urgent need, checks which earlier decisions it relies on and sets a realistic route, so urgency becomes a reason to work in order rather than to skip ahead.',
  reflect:'Which decision feels most urgent as you start, and which earlier decision does it depend on?',
  exercise:'Look at the course map. Note the module you most need as you start, the earlier decisions it depends on and when you plan to reach it.',
  fields:{
   priority:{label:'The module I most need',hint:'Which module, and why is it urgent as you start?'},
   dependencies:{label:'What it depends on',hint:'Which earlier decisions does it rely on? Have you made them, drafted them or not started them yet?'},
   rhythm:{label:'My learning rhythm',hint:'When and how often will you work on the course? Will a co-founder, adviser or anyone else join you?'}
  },
  anatomy:{
   title:'The four courses',
   intro:'Each course answers one question and builds on the decisions made before it.',
   cols:['Course','Modules','The question it answers'],
   rows:[
    ['Clarify','00 Start Here, 01 Strategic Foundations, 02 Theory of Change','Why should this exist, and what change will we pursue?'],
    ['Organise','03 Structure, Governance & Accountability, 04 People, Culture & Volunteers, 05 Internal Systems & Operations','Who will decide, who will do the work, and how will it run day to day?'],
    ['Prove & Show','06 MEAL, 07 Brand, Identity & Image, 08 Marketing & Communications','How will we know it works, and how will we show it?'],
    ['Protect','09 Financial Management, 10 Legal, Compliance, Policies & Risk','How will we stay solvent, legal and safe from the start?']
   ]
  }
 },
 profile:{
  title:'Your founding profile',
  learn:[
   'A founding profile is one page of plain facts about the organisation or initiative you are building: its name, what it will do in one sentence, its intended legal form, its stage, who is involved so far, its planned activities and where, and what is still undecided. It is not a pitch or a mission statement. It is the page people read first to decide whether, and how, they can support you or work with you.',
   'You will be asked for these facts again and again: in funding or competition applications, a partner’s or supplier’s questions, a bank account or registration form, a directory listing, the About page of your first website, and the first conversation with every co-founder, adviser, volunteer or early customer. Funding platforms often store exactly these fields and copy them into every application you send. Write them once now, update them as your idea takes shape and reuse them.',
   'Two facts shape almost everything else in this course. The legal form you choose will decide who governs the organisation, what you can do with any surplus, how you can raise money and which regulator you answer to. Your stage, from idea to testing and first activities or sales, decides how much formality you need now. A one- or two-person idea needs light, reversible decisions; once staff, members, customers or funders rely on you, you will need written ones.',
   'Much of your profile may still be undecided, and that is normal at the start. Say so. An honest profile with open questions is more useful than a confident one that is guessed. Module 01 helps you think about organisational form and Module 10 covers registration and legal duties. Do not register an entity only because a template, a friend or a funder suggests it; check the rules where you are and take qualified local advice.'
  ],
  anatomy:{
   title:'What goes in a founding profile',
   intro:'Six parts, the same ones you complete in the exercise below.',
   rows:[
    ['Name','What will you be called?','A registered name if you already have one, or a working name.'],
    ['In one sentence','What will you do, for whom and where?','“We want to bake and sell bread at our weekly market and give young people who left school early a paid traineeship, in one neighbourhood of our city.”'],
    ['Intended legal form and registration','What kind of organisation do you plan to become, and where?','Nonprofit association, foundation, company, cooperative, a hybrid of two entities, an informal group for now, or not decided yet.'],
    ['Stage and who is involved','How far along are you, and who is involved so far?','Stage (idea, testing, first activities or sales), founders and co-founders, volunteers or advisers, any budget or first-year estimate, when you started.'],
    ['Activities, people and places','What do you plan to do, with whom and where?','Planned activities, who will take part or buy, locations. Flag work with children or vulnerable adults, personal data or money from the public.'],
    ['Still to decide','What is open?','Decisions you have not made yet, written as questions.']
   ]
  },
  weak:'We are starting something to help young people.',
  strong:'“Working name still to be chosen. A neighbourhood bakery that sells bread and cakes at the Saturday market and trains young people aged 17–24 who left school early through six-month paid traineeships. Idea and pilot stage: two co-founders (a baker and a youth worker), four trainees planned for year 1, first-year costs estimated at about US$48,000. Not registered; informal for the first three months, then leaning towards a company with a social purpose.”',
  why:'The stronger version says what it will do, for whom and where, the stage, who is involved so far, and gives an honest note on form. Each of those changes which policies, governance and funding options will apply: trainees as young as 17, for example, mean safeguarding matters from day one.',
  reflect:'Which parts of your profile are decided, and which are still assumptions or hopes?',
  exercise:'Write your founding profile in the six parts. Keep each part short and factual. Mark anything undecided as a question rather than guessing.',
  fields:{
   name:{label:'Name',hint:'Your registered name if you have one, or a working name. This name appears on every document you download from the course, and you can change it later.'},
   summary:{label:'In one sentence',hint:'What you will do, for whom and where. Plain words, no slogans.'},
   form:{label:'Intended legal form and registration',hint:'Nonprofit, foundation, association, company, social business, cooperative, hybrid, informal group or not decided yet. If already registered: where, and since when?'},
   stage:{label:'Stage and who is involved',hint:'Idea, testing, first activities or first sales. Who is involved so far (founders, co-founders, volunteers, advisers, anyone paid) and any budget or first-year estimate.'},
   activities:{label:'Activities, people and places',hint:'What you plan to do, with whom and where. Note any work with children, vulnerable adults, personal data or money from the public.'},
   questions:{label:'Still to decide',hint:'Decisions about your form, scope, team or first steps that are still open, written as questions.'}
  },
  check:'Does your profile give your name, what you will do in one sentence, your intended form, your stage and who is involved, your planned activities, and what is still undecided?'
 },
 'health-check':{
  title:'Baseline health check of your foundations',
  learn:[
   'A health check is a short self-assessment of how developed each foundation of your organisation or initiative is today. It is not a test and there is no passing score. At the start, most areas will be not started or informal, and that is expected. The check makes your starting point visible, so you can choose priorities and, at the end of the course, see what you have built.',
   'Rate each area on a simple scale: not started, informal, documented, practised and reviewed. “Documented” means written down; “practised” means people actually use it; “reviewed” means you check whether it works and improve it. Many organisations end up with documents that nobody practises. Starting from the beginning is a chance to build habits, not only paperwork.',
   'Give one piece of evidence for each rating. If you rate safeguarding as “documented”, what shows it? A written policy, a named person responsible, a referral route agreed before your first activity? Evidence keeps the check honest and makes it useful when you talk to a co-founder, an adviser, a future board member or a first funder.',
   'Involve at least one other person if you can: a co-founder, an adviser, a mentor or a trusted peer. Differences in ratings are useful information. You will repeat the same check when you finish Module 10 and compare.'
  ],
  anatomy:{
   title:'The five ratings, with one example',
   intro:'The same area, finance, at each level, as it might look in our bakery in its first months. Use it to calibrate your own ratings.',
   cols:['Rating','What it means','Finance at this level'],
   rows:[
    ['Not started','Nothing exists yet.','No budget. One founder pays for flour and the stall personally and keeps receipts in a drawer.'],
    ['Informal','It happens, but it lives in one person’s head or habits.','The baker tracks stall takings and ingredient costs in a personal notebook that nobody else can read.'],
    ['Documented','It is written down.','A first-year budget (about US$48,000 of costs) and a one-page note on who can spend what exist, but are rarely opened.'],
    ['Practised','People actually use it.','Both co-founders approve every payment over an agreed amount, and takings and spending are compared with the budget each month.'],
    ['Reviewed','You check whether it works and improve it.','The founders review the budget and spending rules every three months, and lowered the approval limit after a large flour order went unchecked.']
   ]
  },
  weak:'Everything is fine; we just need funding.',
  strong:'Legal and compliance: not started; no safeguarding policy, although some trainees will be 17, and no food-hygiene registration yet.\nFinance: informal; the baker keeps receipts and stall takings in a notebook, no budget.\nCommunications: informal; the youth centre backs us in conversation, nothing in writing.',
  why:'It names the gaps that matter for what you plan to do, so a vague worry becomes a priority list.',
  reflect:'Which low rating would cause the most harm if it was still unchanged when you start your first activities?',
  exercise:'Rate each area as it stands today, give one piece of evidence and name your three priorities for this course.',
  fields:{
   ratings:{label:'Capability ratings',type:'rating',
    hint:'For each area, choose where it stands today and add one piece of evidence. At this stage most areas will be not started or informal, and that is fine.',
    evidenceHint:'One piece of evidence',
    scale:[
     {label:'Not started',meaning:'Nothing exists yet.'},
     {label:'Informal',meaning:'It happens, but lives in one person’s head.'},
     {label:'Documented',meaning:'It is written down.'},
     {label:'Practised',meaning:'People actually use it.'},
     {label:'Reviewed',meaning:'You check it works and improve it.'}],
    areas:['Purpose and strategy','Theory of change','Governance and decisions','People and roles','Internal systems','Monitoring and evidence (MEAL)','Brand and identity','Communications','Finance','Legal and compliance','Risk']},
   priorities:{label:'Top three priorities',type:'list',count:3,hint:'Which three areas will you build first, and why? One per box, most important first.',placeholder:'Area: why it comes first, e.g. Legal and compliance: some trainees are 17'}
  },
  check:'Is every rating supported by a specific piece of evidence, even if the evidence is that nothing exists yet?'
 },
 'start-pack':{title:'Your starting point'}
});
