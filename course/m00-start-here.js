import {module,lesson,review} from './kit.js';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
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
   "This course follows the order in which most organisations need to make decisions. You start with why you exist and the change you want, then decide how you are organised, how you show your results, how you stay solvent and safe, and finally how you sustain the work and turn it into a plan you run and review.",
   "The thirteen modules after this one form five courses: Clarify, Organise, Prove & Show, Protect, and Sustain & Run. Each course relies on decisions made in the one before it, so the module you need most urgently often depends on earlier work.",
   "Every lesson has a short video, a written explanation with examples, and an exercise that saves into your organisation pack. Each module also has an Excel workbook. The lesson names its sheet, so you can work offline, share it with colleagues or keep a version history.",
   "Within each module, lessons move from understanding a concept to designing, implementing, managing and reviewing it. You do not need to finish in one sitting. Draft honestly, mark what is uncertain and come back: later modules show you where earlier answers need revising."
  ],
  "weak": "Skip to the module I need right now and copy a template.",
  "strong": "Riverside Repair Hub: we most need Module 03, because trustees cannot see clearly how the shop’s profits reach the charity. It depends on our mission and objectives, so we will move through Module 01 first and reach Module 03 within two months.",
  "why": "It names the urgent need, checks which earlier decisions it relies on and sets a realistic route, so urgency becomes a reason to work in order rather than to skip ahead.",
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
  "check": "Have you identified which earlier decisions your most urgent need depends on?",
  "anatomy": {
   "title": "The five courses",
   "intro": "Each course answers one question and builds on the decisions made before it.",
   "cols": [
    "Course",
    "Modules",
    "The question it answers"
   ],
   "rows": [
    [
     "Clarify",
     "00 Start Here, 01 Strategic Foundations, 02 Theory of Change",
     "Why do we exist, and what change do we pursue?"
    ],
    [
     "Organise",
     "03 Structure, Governance & Accountability, 04 People, Culture & Volunteers, 05 Internal Systems & Operations",
     "Who decides, who does the work, and how does it run day to day?"
    ],
    [
     "Prove & Show",
     "06 MEAL, 07 Brand, Identity & Image, 08 Marketing & Communications",
     "How do we know it works, and how do we show it?"
    ],
    [
     "Protect",
     "09 Financial Management, 10 Legal, Compliance, Policies & Risk",
     "How do we stay solvent, legal and safe?"
    ],
    [
     "Sustain & Run",
     "11 Fundraising, Revenue & Sustainable Business Models, 12 Partnerships & Ecosystem Building, 13 Strategy to Action",
     "How do we fund the work, who do we work with, and how do we run the plan?"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example learning plans",
   "intro": "How each organisation chose its most urgent module, traced what it depends on and set a rhythm it can keep.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "priority": "Module 10 Legal, Compliance, Policies & Risk. We plan activities with young people aged 12–17 and we are not registered. We need a legal entity and a safeguarding policy before our first planting day in the rainy season.",
      "dependencies": "Our choice between an association and a foundation (Module 01, organisational form): not made. Who sits on the board and how members have a say (Module 03): not made. Which activities we run with children (Module 02): drafted. So registration waits until we finish Module 01.",
      "rhythm": "Wayan and Sari, two Saturday mornings a month, two hours, one lesson per session. Our four volunteers join for the stakeholder and values lessons. Wayan teaches, so we slow down during exam weeks."
     },
     "notice": "Notice how an urgent legal need is traced back to a decision about form that has not been made. Copy the habit of marking each dependency as made, drafted or not made."
    },
    {
     "org": "ngo",
     "profile": {
      "priority": "Module 11 Fundraising, Revenue & Sustainable Business Models. Two foundations give most of our US$140,000 a year and one grant ends next year. Our board wants no funder above 40% of income.",
      "dependencies": "A Theory of Change we actually use (Module 02): we have one written for a grant, not one we plan with. Results data (Module 06 MEAL): attendance only, nothing on confidence or subject choice. A budget by programme (Module 09): partly done. New funders will ask for evidence we do not yet collect.",
      "rhythm": "Achieng and the programme manager, Wednesday afternoons, 90 minutes a week. The finance officer joins for Modules 09 and 11. We share finished workbook sheets with the board before each quarterly meeting."
     },
     "notice": "Notice that the most urgent module depends on evidence the organisation does not collect yet. Copy the honest note on what funders will ask for and what is missing."
    },
    {
     "org": "social",
     "profile": {
      "priority": "Module 09 Financial Management. We are near break-even with no cash reserve, and trainee wages are paid before office clients pay their invoices. One late payment could leave us short.",
      "dependencies": "Our internal objectives (Module 01): drafted, break-even and a 3-month reserve. Our form and the BIC decision (Module 01): open, and it affects how we report. How training is funded (Module 11): undecided, so the budget must show training costs and bakery costs separately.",
      "rhythm": "Lucía and Diego, Monday afternoons when the bakery is quiet, one hour a week. Our accountant joins once a month. Trainees give feedback on the lessons in Module 04."
     },
     "notice": "Notice the specific risk behind the urgency: wages go out before clients pay. Copy that concreteness instead of writing “we need better finances”."
    },
    {
     "org": "coop",
     "profile": {
      "priority": "Module 08 Marketing & Communications. Direct online sales are still a small share of our revenue, and power-loom copies sell cheaply on the same marketplaces. Members have set a target of 40% of revenue from direct online sales.",
      "dependencies": "Our positioning (Module 01): clear, authentic handloom with the weaver’s name on every piece. Our brand (Module 07): not written down, so every listing looks different. Quality standards (Module 05): practised but not written. The committee must approve any new marketing spending.",
      "rhythm": "Meera, the designer and two committee members, one afternoon a month after the committee meeting. Meera summarises each module in Malayalam for members at the general meeting."
     },
     "notice": "Notice that a member-owned organisation builds its decision-makers into the rhythm. Copy the step of sharing a short summary with whoever must approve the changes."
    },
    {
     "org": "hybrid",
     "profile": {
      "priority": "Module 03 Structure, Governance & Accountability. Trustees cannot easily see how the shop’s profits reach the charity, or who decides what in the trading company. We want this settled before the shop grows.",
      "dependencies": "Our mission and objectives (Module 01): written, including a clear-reporting objective for trustees. The charity plus trading company structure: decided. Financial reporting between the two (Module 09): informal, done by Tom. So we can reach Module 03 quickly and come back to Module 09.",
      "rhythm": "Tom and the chair of trustees, every other Thursday evening for an hour. Priya joins for Modules 04 and 05 on volunteers and safety. We bring one finished workbook sheet to each quarterly board meeting."
     },
     "notice": "Notice that this organisation checked its dependencies and found most already made. Copy the check itself: it tells you how fast you can reach the module you need."
    }
   ]
  }
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
     "org": "idea",
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
     "org": "ngo",
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
     "org": "social",
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
     "org": "coop",
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
     "org": "hybrid",
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
   "A health check is a short self-assessment of how developed each part of your organisation is today. It is not a test and there is no passing score. It makes your starting point visible, so you can choose priorities and, at the end of the course, see what has changed.",
   "Rate each area on a simple scale: not started, informal, documented, practised and reviewed. “Documented” means written down; “practised” means people actually use it; “reviewed” means you check whether it works and improve it. Many organisations have documents that nobody practises.",
   "Give one piece of evidence for each rating. If you rate safeguarding as “practised”, what shows it? A trained focal person, a referral route people know about, a concern recorded and handled correctly? Evidence keeps the check honest and makes it useful for a board, a funder or a new colleague.",
   "Involve at least one other person if you can: a co-founder, a board member, a colleague or a trusted peer. Differences in ratings are useful information. You will repeat the same check in Module 13 and compare."
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
  "strong": "Tide Line Youth Collective: Legal and compliance: not started, no safeguarding policy, although we plan to work with 12–17-year-olds. Finance: not started, Sari keeps receipts, no budget. Partnerships: informal, village heads support us in conversation, nothing in writing.",
  "why": "It names the gaps that matter for what the organisation plans to do, so a vague worry becomes a priority list.",
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
  "check": "Is every rating supported by a specific piece of evidence?",
  "gallery": {
   "title": "Five example health checks",
   "intro": "Each organisation rated the areas that matter most for its next year, gave evidence and chose three priorities.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "ratings": "Strategy | informal | Wayan and Sari agree on the purpose, but nothing is written down.\nTheory of change | not started | We know past plantings failed at the wrong sites, but have no written logic.\nGovernance | not started | Not registered, no board; the two co-founders decide everything.\nPeople | informal | Four volunteers recruited through friends; no roles or training.\nFinance | not started | Sari keeps receipts; no budget and no bank account in the group’s name.\nLegal and compliance | not started | No safeguarding policy, although we plan to work with 12–17-year-olds.\nPartnerships | informal | Village heads support us in conversation; nothing agreed in writing.",
      "priorities": "1. Legal and compliance: a safeguarding policy and trained volunteers before any activity with children. 2. Governance: choose a legal form and a small board. 3. Finance: a simple budget and a bank account that is not Sari’s."
     },
     "notice": "Notice that low ratings are normal at idea stage; what matters is which gap would cause harm first. Copy how safeguarding comes first because children are involved."
    },
    {
     "org": "ngo",
     "profile": {
      "ratings": "Strategy | documented | Three-year strategy written for a funder; staff rarely use it.\nTheory of change | documented | Drafted for a grant application; not used to plan or review.\nGovernance | practised | Board of seven meets quarterly, with papers and minutes.\nPeople | documented | Safeguarding policy signed by all; mentor training is one half-day, no refresher.\nMEAL | informal | Attendance lists per club; nothing consistent on confidence or subject choice.\nFinance | practised | Budget versus actual reviewed monthly by the director and finance officer.\nResources | informal | Two foundations give most of our income; no fundraising plan.\nPartnerships | practised | Agreements with 14 schools; termly meeting with the county education office.",
      "priorities": "1. MEAL: we cannot show whether girls keep science subjects, and the board and funders are asking. 2. Resources: a plan so that no funder exceeds 40% of income. 3. Theory of change: turn the grant version into one we use to plan."
     },
     "notice": "Notice the gap between documented and practised: a strategy and a Theory of Change exist on paper but guide nothing. Copy the honesty about documents written only for funders."
    },
    {
     "org": "social",
     "profile": {
      "ratings": "Strategy | informal | Lucía and Diego share a clear direction; the business plan is two years old.\nGovernance | informal | The two founders decide everything; BIC status not yet decided.\nPeople | practised | Trainee contracts, a written apprenticeship plan and weekly mentoring with Diego.\nMEAL | informal | Diego knows where most graduates work; nothing recorded at 3 or 12 months.\nFinance | documented | Monthly accounts from our accountant; no cash-flow forecast and no reserve.\nResources | informal | Training costs paid from bread sales; no grants or employer fees yet.\nPartnerships | practised | Eight employer partners interview our graduates at the end of each cohort.",
      "priorities": "1. Finance: a cash-flow forecast and a plan to build a 3-month reserve. 2. MEAL: record where graduates work at 3 and 12 months, our core result. 3. Resources: fund training without raising bread prices."
     },
     "notice": "Notice that a strong practice can still lack evidence: Diego knows the results, but nothing is recorded. Copy the check on whether your core result is written down anywhere."
    },
    {
     "org": "coop",
     "profile": {
      "ratings": "Governance | reviewed | Committee of nine elected by members; rules updated last year after a members’ vote.\nSystems | practised | Every piece is quality-checked and logged with the weaver’s name.\nFinance | practised | Open books: accounts shown at the general meeting and audited by the state cooperative department.\nBrand | not started | No consistent look or story across shops and our online shop.\nCommunications | informal | Online listings written by whoever has time; no regular contact with buyers.\nResources | informal | Working capital for yarn is tight; a dye-unit grant considered but not explored.\nPlanning | informal | The committee sets yearly sales targets; no multi-year plan.",
      "priorities": "1. Brand and communications: one consistent story with weaver names, to grow direct online sales towards 40%. 2. Resources: check whether a dye-unit grant would affect members’ control. 3. Planning: a three-year plan the members approve."
     },
     "notice": "Notice that an established organisation can still rate low in some areas. Copy the spread: strong governance does not mean strong marketing, so rate each area on its own evidence."
    },
    {
     "org": "hybrid",
     "profile": {
      "ratings": "Strategy | documented | Three-year strategy approved by trustees; not yet reviewed against results.\nGovernance | documented | Charity and trading company are separate on paper; in practice the same people decide.\nPeople | practised | Role descriptions and an induction for each of our 40 volunteers.\nMEAL | practised | Items repaired and kilograms diverted logged at every café; nothing on whether people repair again.\nFinance | documented | Separate accounts for charity and shop, but trustees find the profit transfer hard to follow.\nRisk | practised | Electrical safety testing on every item; training depends on Priya being there.\nResources | informal | Shop profits are below our 30% target; no plan to close the gap.",
      "priorities": "1. Governance: clear reporting between the trading company and the charity, so trustees see where money goes. 2. Resources: a plan to raise shop profits towards 30% of charity costs. 3. Risk: electrical safety training that does not depend on one person."
     },
     "notice": "Notice that each rating names a weakness inside a practice that already exists. Copy the habit of adding a “but”, so your priorities follow from the evidence."
    }
   ]
  }
 }),
 review("start-pack","Your starting point")
 ]
});
