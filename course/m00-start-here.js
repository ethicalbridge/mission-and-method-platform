import {module,lesson,review} from './kit.js';
// Course 1 content, reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the
// five example organisations (course/examples.js, story in docs/course-1-examples.md) complete each exercise.
export default module({
 ...{"uses":[],"video":null,"id":0,"slug":"start-here","phase":"Clarify","title":"Start Here: Your Organisation Journey","short":"How the course works, your organisation profile and a baseline health check","intro":"See the whole journey before you begin. Describe the organisation you are building, choose the examples that fit your legal form and stage, and record an honest starting point you will revisit at the end of the course.","output":"Organisation Profile + Baseline Health Check","workbook":{"file":"Module-00-Start-Here.xlsx","title":"Start Here workbook"},"promo":{"lesson":"journey","tools":["strategic-objectives","theory-of-change","strategy-kpis-annual-planning","meal-strategy"],"headline":"Every output you build can become a live, shared plan","pitch":"The course gives you the method and an Excel workbook for every module. The Impact Tools turn the same work into connected records your team can update, review and report on — objectives, pathways, KPIs, indicators, risks and people in one place."}},
 lessons:[
 lesson({
  "minutes": 15,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "journey",
  "title": "How this course works",
  "sheet": "Course map",
  "learn": [
   "This course follows the order in which most organisations actually need to make decisions. You start with why you exist and what change you pursue, then decide who does what, how the organisation runs, how you show and communicate your results, how you stay solvent and compliant, how you sustain and partner, and finally how you turn everything into a plan you run and review.",
   "The thirteen modules after this one are grouped into five courses: Clarify (purpose, strategy and Theory of Change), Organise (structure, people and internal systems), Prove & Show (MEAL, brand and communications), Protect (finance, legal, compliance and risk) and Sustain & Run (funding, partnerships and an operating plan you run and review). Each course relies on the decisions made before it.",
   "Every lesson has three parts you can use in any order: a short video, the written explanation with examples, and an exercise that saves into your organisation pack. Each module also has an Excel workbook. The sheet for each lesson is named in the lesson, so you can work offline, share it with colleagues or keep a version history.",
   "Within each module, lessons move from understanding a concept, to designing your approach, to implementing it, managing it and reviewing it. You do not need to finish everything in one sitting. Draft honestly, mark what is uncertain and come back: later modules will show you where earlier answers need revising."
  ],
  "weak": "Skip to the module I need right now and copy a template.",
  "strong": "Read the course map, start with Module 1, and use the module I need most urgently as a reason to keep going rather than as a shortcut.",
  "why": "Templates copied out of sequence often contradict each other. A funding proposal built before your Theory of Change, or a policy written before you know your activities, usually has to be rewritten.",
  "reflect": "Which decision feels most urgent for your organisation right now, and which earlier decision does it depend on?",
  "exercise": "Look at the course map. Note the module you most need, the earlier decisions it depends on and when you plan to reach it.",
  "fields": [
   {
    "key": "priority",
    "label": "The module I most need",
    "hint": "Which module, and why is it urgent now?"
   },
   {
    "key": "dependencies",
    "label": "What it depends on",
    "hint": "Which earlier decisions does it rely on? Are they already made?"
   },
   {
    "key": "rhythm",
    "label": "My learning rhythm",
    "hint": "When and how often will you work on the course? Who will join you?"
   }
  ],
  "check": "Have you identified which earlier decisions your most urgent need depends on?"
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "profile",
  "title": "Your organisation profile",
  "sheet": "Organisation profile",
  "learn": [
   "An organisation profile is one page of plain facts about your organisation: its name, what it does in one sentence, its legal form, its stage and size, its activities, where it works and with whom, and what is still undecided. It is not a pitch or a mission statement. It is the page people read first to decide whether, and how, they can work with you.",
   "You will be asked for these facts again and again: in grant applications, a partner’s due-diligence form, a bank account or registration form, a directory listing, the About page of your website, and the first week of every new board member, colleague or volunteer. Funding platforms often store exactly these fields and copy them into every application you send. Write them once, keep them current and reuse them.",
   "Two facts shape almost everything else in this course. Your legal form decides who governs the organisation, what you can do with any surplus, how you can raise money and which regulator you answer to. Your stage, from idea to early delivery, growing or established, decides how much formality you need now. A two-person idea needs light, reversible decisions; an organisation with staff and funders needs written ones.",
   "If something is not decided yet, say so. An honest profile with open questions is more useful than a confident one that is guessed. Module 1 helps you think about organisational form and Module 10 covers registration and legal duties. Do not register an entity only because a template or a funder suggests it; take qualified local advice."
  ],
  "anatomy": {
   "after": 0,
   "title": "What goes in a profile",
   "intro": "Six parts, the same ones you complete in the exercise below.",
   "rows": [
    [
     "Name",
     "Who are you?",
     "Your registered name, or a working name if you have not chosen one."
    ],
    [
     "In one sentence",
     "What do you do, for whom and where?",
     "“We run after-school science clubs for girls aged 10 to 14 in two sub-counties of Kisumu.”"
    ],
    [
     "Legal form and registration",
     "What kind of organisation are you, and where are you registered?",
     "Nonprofit association, foundation, company, cooperative, a hybrid of two entities, or not yet registered."
    ],
    [
     "Stage and size",
     "How far along are you, and how big?",
     "Stage, people (paid and volunteer), approximate annual budget, year founded."
    ],
    [
     "Activities, people and places",
     "What do you actually do, with whom and where?",
     "Main activities, who takes part, locations. Flag work with children or vulnerable adults, personal data or money from the public."
    ],
    [
     "Still to decide",
     "What is open?",
     "Decisions you have not made yet, written as questions."
    ]
   ]
  },
  "gallery": {
   "title": "Five example profiles",
   "intro": "Fictional organisations, written the way a good profile reads. Pick the one closest to yours and notice what it does well.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "id": "idea",
     "label": "Community group · idea stage",
     "place": "Indonesia",
     "profile": {
      "name": "Tide Line Youth Collective (working name)",
      "summary": "We want to run mangrove restoration and environmental education with young people in two coastal villages in North Bali.",
      "form": "Not registered yet. Considering an association (perkumpulan) or a foundation (yayasan).",
      "stage": "Idea stage. Two co-founders and four volunteers, no paid staff. No budget yet; first year estimated under US$8,000.",
      "activities": "Monthly planting days and school sessions with 12 to 17 year olds, with village leaders and one local school. We will work with children and keep participants’ contact details.",
      "questions": "Association or foundation? Who sits on our first board? Can we accept small donations before we register?"
     },
     "notice": "Short, honest and full of open questions. It says plainly that it will work with children and hold personal data, which is what a careful partner looks for first."
    },
    {
     "id": "ngo",
     "label": "Registered nonprofit · delivering",
     "place": "Kenya",
     "profile": {
      "name": "Imara Girls in Science",
      "summary": "We run after-school science clubs for girls aged 10 to 14 in two sub-counties of Kisumu County.",
      "form": "Registered nonprofit organisation in Kenya since 2019.",
      "stage": "Delivering for five years. Six staff, 25 volunteer mentors, annual budget about US$140,000 from two foundation grants and local businesses.",
      "activities": "Weekly clubs in 14 public schools, a holiday science camp, and mentoring by women working in science. About 600 girls a year.",
      "questions": "Should we expand to a third district or deepen work in the current schools? We have no written safeguarding training plan for volunteers."
     },
     "notice": "Numbers do the work: years, staff, volunteers, budget, funding sources and reach. A funder can judge size and fit in seconds."
    },
    {
     "id": "social",
     "label": "Social enterprise · company",
     "place": "Peru",
     "profile": {
      "name": "Pan del Barrio S.A.C.",
      "summary": "A neighbourhood bakery in Lima that trains and employs young people who left school early.",
      "form": "Private limited company (S.A.C.) registered in Peru; social purpose written into our bylaws.",
      "stage": "Trading for two years. Nine employees, six of them trainees; turnover about US$210,000, close to break-even.",
      "activities": "Bakery and café, wholesale bread for three offices, and a six-month paid training programme for 18 to 24 year olds.",
      "questions": "Should we register as a benefit company (Sociedad BIC)? How do we fund the training without raising bread prices?"
     },
     "notice": "It separates the business (what it sells) from the impact (who benefits), and shows how close it is to paying its way."
    },
    {
     "id": "coop",
     "label": "Cooperative · member-owned",
     "place": "India",
     "profile": {
      "name": "Vanita Weavers Cooperative Society",
      "summary": "A cooperative of handloom weavers in Kerala selling saris and fabric directly to shops and online buyers.",
      "form": "Registered cooperative society in Kerala. Owned and governed by its 140 members, who elect a committee of nine.",
      "stage": "Established for 11 years. Four staff plus member weavers; annual sales about US$95,000.",
      "activities": "Buying yarn in bulk, quality control, design support, a shared online shop and fair, on-time payment to members.",
      "questions": "Can we take a grant for a dye unit without changing who controls the cooperative? How do we bring in younger weavers?"
     },
     "notice": "It says who owns and governs it. Membership changes decisions in every later module, from structure to funding."
    },
    {
     "id": "hybrid",
     "label": "Hybrid · charity with a trading company",
     "place": "United Kingdom",
     "profile": {
      "name": "Riverside Repair Hub",
      "summary": "A community repair workshop in Leeds that cuts waste and teaches repair skills, with a shop selling refurbished goods.",
      "form": "Two entities: a registered charity (CIO) in England, and its trading company, wholly owned by the charity, which runs the shop and passes its profits to the charity.",
      "stage": "Growing. Five staff, 40 volunteers; charity income about £180,000 a year, shop turnover about £120,000.",
      "activities": "Weekly repair cafés, school workshops, a tool library and the refurbished goods shop.",
      "questions": "Should the shop open a second site? Our trustees want clearer reporting on how the trading company performs."
     },
     "notice": "It names both entities and how money moves between them. Funders and regulators need to see that line clearly."
    }
   ]
  },
  "weak": "We are an NGO.",
  "strong": "Tide Line Youth Collective (working name). Mangrove restoration and environmental education with young people in two coastal villages. Idea stage: two co-founders, four volunteers, no staff. Not registered; choosing between an association and a foundation.",
  "why": "The stronger version gives the name, what it does, for whom and where, the stage and size, and an honest note on form. Each of those changes which policies, governance and funding options apply.",
  "reflect": "Which parts of your profile are decided, and which are still assumptions?",
  "exercise": "Write your organisation profile in the six parts. Use the example closest to yours as a guide to length and tone. Mark anything undecided as a question rather than guessing.",
  "fields": [
   {
    "key": "name",
    "label": "Name",
    "hint": "Your registered name, or a working name. This name appears on every document you download from the course."
   },
   {
    "key": "summary",
    "label": "In one sentence",
    "hint": "What you do, for whom and where. Plain words, no slogans."
   },
   {
    "key": "form",
    "label": "Legal form and registration",
    "hint": "Nonprofit, foundation, association, company, social enterprise, cooperative, hybrid or not registered yet. Registered where, and since when?"
   },
   {
    "key": "stage",
    "label": "Stage and size",
    "hint": "Idea, early delivery, growing or established. People involved (paid, volunteer) and approximate annual budget."
   },
   {
    "key": "activities",
    "label": "Activities, people and places",
    "hint": "What you do or plan to do, with whom and where. Note any work with children, vulnerable adults, personal data or money from the public."
   },
   {
    "key": "questions",
    "label": "Still to decide",
    "hint": "Decisions about your form, stage or scope that are still open, written as questions."
   }
  ],
  "check": "Does your profile give your name, what you do in one sentence, your form, stage and size, your activities, and what is still undecided?"
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "health-check",
  "title": "Baseline organisational health check",
  "sheet": "Health check",
  "learn": [
   "A health check is a short self-assessment of how developed each part of your organisation is today. It is not a test and there is no passing score. Its purpose is to make your starting point visible so you can choose priorities and, at the end of the course, see what has changed.",
   "Rate each capability area on a simple scale: not started, informal, documented, practised and reviewed. \"Documented\" means written down; \"practised\" means people actually use it; \"reviewed\" means you check whether it works and improve it. Many organisations have documents that nobody practises.",
   "Be specific about evidence. If you rate safeguarding as \"practised\", what shows it? A trained focal person, a referral route people know about, a recorded concern handled correctly? Evidence keeps the assessment honest and makes it useful for a board, a funder or a new colleague.",
   "Involve at least one other person if you can: a co-founder, a board member, a staff member or a trusted peer. Differences in ratings are useful information. Repeat the same check in Module 13 and compare."
  ],
  "anatomy": {
   "after": 1,
   "title": "The five ratings, with one example",
   "intro": "The same area, finance, at each level. Use it to calibrate your own ratings.",
   "cols": [
    "Rating",
    "What it means",
    "Finance at this level"
   ],
   "rows": [
    [
     "Not started",
     "Nothing exists yet.",
     "No budget. The founder pays costs personally and keeps receipts in a drawer."
    ],
    [
     "Informal",
     "It happens, but it lives in one person’s head or habits.",
     "One person tracks money in a personal spreadsheet that nobody else can read."
    ],
    [
     "Documented",
     "It is written down.",
     "A budget and a one-page finance procedure exist, but are rarely opened."
    ],
    [
     "Practised",
     "People actually use it.",
     "Two people approve every payment over an agreed amount, and budget versus actual is shared each month."
    ],
    [
     "Reviewed",
     "You check whether it works and improve it.",
     "The board reviews the finance procedure each year and lowered the approval limit after a near miss."
    ]
   ]
  },
  "weak": "Everything is fine; we just need funding.",
  "strong": "Strategy: documented, not yet reviewed. Finance: informal, a spreadsheet kept by the founder. Safeguarding: not started, although we plan youth activities. MEAL: informal attendance lists only.",
  "why": "The stronger assessment names gaps that matter for the planned activities. It turns a vague worry into a priority list.",
  "reflect": "Which low rating would cause the most harm if it stayed unchanged for a year?",
  "exercise": "Rate each area, give one piece of evidence and name your three priorities for this course.",
  "fields": [
   {
    "key": "ratings",
    "label": "Capability ratings",
    "hint": "One per line: area | rating (not started / informal / documented / practised / reviewed) | evidence. Areas: strategy, theory of change, governance, people, systems, MEAL, brand, communications, finance, legal and compliance, risk, resources, partnerships, planning."
   },
   {
    "key": "priorities",
    "label": "Top three priorities",
    "hint": "Which three areas will you focus on first, and why?"
   }
  ],
  "check": "Is every rating supported by a specific piece of evidence?"
 }),
 review("start-pack","Your starting point")
 ]
});
