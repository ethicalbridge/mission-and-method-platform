import {module,lesson,review} from './kit.js?v=deeplink1';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,2,5],"video":null,"id":6,"slug":"meal","phase":"Prove & Show","title":"MEAL: Monitoring, Evaluation, Accountability & Learning","short":"Theory of Change → results framework → indicators → data → learning → decisions","intro":"Turn your Theory of Change into evidence you can use. Build a results framework, define indicators with honest baselines and targets, collect data ethically, listen to the people you serve, evaluate what matters and use what you learn to make better decisions. The same principles apply to programme MEAL in nonprofits and to impact measurement in social enterprises and startups.","output":"MEAL Framework","workbook":{"file":"Module-06-MEAL.xlsx","title":"MEAL workbook"},"promo":{"lesson":"monitoring","tools":["meal-strategy","theory-of-change"],"headline":"Compare planned and actual results every quarter, without rebuilding spreadsheets","pitch":"MEAL Strategy keeps every indicator with its definition, baseline, target, data source and owner, tracks planned against actual each quarter and records the learning and decisions from each review. It can pull indicators from your Theory of Change and KPIs from your annual plan."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Understand",
  "id": "system",
  "title": "MEAL principles and a proportionate system",
  "sheet": "MEAL plan",
  "learn": [
   "MEAL stands for Monitoring, Evaluation, Accountability and Learning. Monitoring tracks what is happening, regularly. Evaluation asks whether, how and why results occur. Accountability means the people you serve can shape the work and raise concerns. Learning means using what you find to change decisions. Together they answer three questions: are we doing what we said, is it making a difference, and what should we change?",
   "Different sectors use different words. Nonprofits talk about results frameworks, logframes and donor reports; social enterprises and start-ups talk about impact measurement and outcome metrics. The principles are the same: define the change, measure it honestly, listen to the people affected and act on what you learn. Use the words your stakeholders understand.",
   "Keep the system proportionate. Collect only data you will use for a decision or an obligation, and that you can collect and protect responsibly. Five good indicators reviewed every quarter teach you more than fifty that nobody looks at. A volunteer group can run MEAL on paper sheets and photos; a larger team may need tablets and a database.",
   "This module builds one chain, adding a link in each lesson: Theory of Change → results framework → indicators → data → learning → decisions."
  ],
  "weak": "Collect as much data as possible.",
  "strong": "Pan del Barrio S.A.C.: after every cohort, our MEAL system shows whether trainees finished, passed the certificate and found formal work, so Lucía and Diego can decide on recruitment, changes to training and which employer partners to keep.",
  "why": "Each piece of data is tied to a decision that a named person will take.",
  "reflect": "Which decision will your next data collection inform?",
  "exercise": "Write the purpose of your MEAL system and the decisions it must inform.",
  "fields": [
   {
    "key": "purpose",
    "label": "Purpose of our MEAL system",
    "hint": "What questions it must answer and for whom."
   },
   {
    "key": "decisions",
    "label": "Decisions MEAL should inform",
    "hint": "Decision | who makes it | when | what evidence they need."
   }
  ],
  "check": "Is every part of your system linked to a decision or an obligation?",
  "anatomy": {
   "title": "The four parts of MEAL",
   "intro": "Each part answers a different question; even a small organisation needs all four, in a light form.",
   "cols": [
    "Part",
    "Question it answers",
    "Example (Riverside Repair Hub)"
   ],
   "rows": [
    [
     "Monitoring",
     "Are we doing what we planned, and what is changing?",
     "Repair log at every café: item, fault, fixed or not, weight."
    ],
    [
     "Evaluation",
     "Did it make a difference, for whom and why?",
     "A review of whether visitors repair before buying new."
    ],
    [
     "Accountability",
     "Can the people we serve shape the work and raise concerns?",
     "Exit card at each café; a named trustee for sensitive concerns."
    ],
    [
     "Learning",
     "What will we change because of what we found?",
     "A quarterly session that turns findings into two or three decisions."
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example MEAL purposes",
   "intro": "Each organisation states what its MEAL system is for and which decisions it must inform, starting from its first external objective (ESO1).",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "purpose": "Our MEAL system must tell us, parents and village heads whether young people are planting mangroves that survive, and whether they keep coming and learning. It answers three questions: are seedlings surviving at each site, which young people take part and stay, and what do they learn? We keep it to paper sheets, photos and one quiz, so two part-time co-founders can run it.",
      "decisions": "Keep, move or change species at each planting site | Wayan and Sari, with youth team leaders | after each survival count (May and November) | survival % per marked plot; photos from fixed points\nChange planting-day times or places | Wayan | each quarter | attendance by village and gender; parents' comments\nAdjust school sessions | Sari and the teacher | end of each term | knowledge quiz results; students' feedback\nWhat to tell dive operators and village heads | both co-founders | twice a year | seedlings planted and survival, with photos"
     },
     "notice": "Notice how the system fits two part-time co-founders: paper sheets, photos and one quiz. Copy the habit of naming who decides and when, even in a tiny team."
    },
    {
     "org": "ngo",
     "profile": {
      "purpose": "Our MEAL system tells the board, our two foundation funders, head teachers and the girls themselves whether clubs build girls' science confidence and skills, and whether more girls keep science subjects. It must also show which girls we are missing. We use tablets for attendance and surveys, and keep girls' data safe and anonymised.",
      "decisions": "Which schools stay in the programme | Achieng and the board | yearly, in November | attendance; head teacher support; confidence results by school\nChanges to club content and timing | Brian with the coordinators | each term | skills checklist; girls' feedback; attendance trends\nMentor recruitment and training | Brian | twice a year | mentor retention; girls' feedback on mentors\nThe case to new funders before Foundation A ends | Achieng | by mid-2027 | outcome results over two years; cost per girl"
     },
     "notice": "See how one decision is about fundraising: data is planned now for the case funders will need when Foundation A ends. Copy the commitment to show which girls are missed."
    },
    {
     "org": "social",
     "profile": {
      "purpose": "Our MEAL system answers one question for us, our advisory group, employer partners and the municipality: do trainees finish, earn the certificate and keep formal jobs? It also tells us what trainees think of the apprenticeship. It runs on the trainee spreadsheet, certificate results and follow-up calls, and must not take more time than Diego can give.",
      "decisions": "How many trainees to recruit, and from where | Lucía and Diego | before each cohort (March and September) | completion rate; reasons for leaving; cash position\nChanges to training or shifts | Diego with Lucía as master baker | after each cohort | skills checklist; trainee feedback; exit interviews\nWhich employer partners to keep or add | Diego | twice a year | offers and 12-month retention by employer\nWhether to apply for BIC status | Lucía and Diego | by the end of 2027 | whether we can report impact every year"
     },
     "notice": "Notice the limit on time: the system must fit what Diego can give. Copy the link between each piece of evidence and a recruitment, training or partner decision."
    },
    {
     "org": "coop",
     "profile": {
      "purpose": "Our MEAL system lets members see whether the cooperative is raising their weaving income and paying on time, and why. It answers to the general body first, then the committee, buyers and the cooperative department. It is built on records we already keep: the piece register, payment records, quality checks and marketplace sales.",
      "decisions": "Piece rates and the annual bonus | general body, on the committee's proposal | at the annual general meeting | average payment per active member; surplus; yarn costs\nHow to keep payments within 15 days | committee and Meera | monthly | days from delivery to payment; cash available\nQuality training for weavers | quality officer | each quarter | rejection rate by village and reason\nHow much to invest in online selling | committee | twice a year | online share of sales; price after fees"
     },
     "notice": "Look at who the system answers to first: the members who own it. Copy the use of records you already keep before adding anything new."
    },
    {
     "org": "hybrid",
     "profile": {
      "purpose": "Our MEAL system tells trustees, the council, grant funders and volunteers whether repair cafés and the tool library help residents, especially low-income households, repair and reuse instead of throwing away. It answers: how much do we fix, who comes, and do people change what they do afterwards? It runs on the repair log, tool library bookings and a short follow-up survey.",
      "decisions": "Where and when to hold repair cafés | Tom and Priya | each quarter | visitors' postcodes (with consent); attendance by café\nWhich repairs to offer | Priya | each quarter | fix rate by item type; volunteer skills available\nVolunteer recruitment and training | volunteer coordinator | twice a year | sessions short of electrical repairers; safety checks\nWhat to report to the council and funders | Tom, with the trustees | quarterly | kg diverted; items fixed; survey results"
     },
     "notice": "Notice that 'who comes' is a question in its own right, because the objective names low-income households. Copy the way each decision has an owner and a rhythm."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy",
   "theory-of-change"
  ],
  "video": null,
  "stage": "Design",
  "id": "results-framework",
  "title": "From Theory of Change to results framework",
  "sheet": "Results framework",
  "learn": [
   "A results framework turns your Theory of Change into a table. For each external objective it lists the expected impact, outcomes and outputs, each with its evidence (how you will know) and its assumptions (what must hold true). A logframe is a common donor version of the same idea, usually with columns for the narrative, indicators, means of verification and assumptions.",
   "Start from your pathway in Module 2. Copy the outcomes and outputs you will actually monitor, not every box in the diagram. Keep the codes from your strategy, for example ESO1, Outcome 1.1 and Output 1.1.1, so that results, budgets and plans can be linked.",
   "Then check the logic in two directions. Vertically: if the outputs are delivered and the assumptions hold, do the outcomes follow? Horizontally: can you measure each result with evidence you can actually obtain? Treat impact as something you contribute to over years, not something you measure every year."
  ],
  "weak": "Our logframe is the activity plan with numbers.",
  "strong": "Pan del Barrio S.A.C.: ESO1 → Outcome 1.2 “Trainees earn the certificate and receive formal job offers within three months” → Output 1.2.1 “Job-matching with 8 employer partners”, with evidence (certificate results, follow-up calls) and the assumption that employers value the certificate.",
  "why": "It follows the pathway, keeps codes that link to strategy and budgets, and carries the assumption across from the Theory of Change.",
  "reflect": "Which outcome in your Theory of Change are you not planning to monitor, and why?",
  "exercise": "Build your results framework for one external objective.",
  "fields": [
   {
    "key": "framework",
    "label": "Results framework",
    "hint": "Code | level (impact, outcome, output) | result statement | evidence source | assumption."
   }
  ],
  "check": "Does every result trace back to a pathway in your Theory of Change?",
  "gallery": {
   "title": "Five example results frameworks",
   "intro": "Each organisation turns its ESO1 pathway into the rows it will actually monitor.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "framework": "ESO1 | impact | More resilient coasts and livelihoods (contribution, 10+ years) | fixed-point photos | many other factors\nOutcome 1.1 | short-term outcome | Young people gain planting and monitoring skills | knowledge quiz; observed planting days | parents let children take part\nOutcome 1.2 | short-term outcome | Village heads agree restoration sites | signed site agreements | pond owners accept the sites\nOutcome 1.3 | medium-term outcome | Youth teams plant and monitor regularly; survival improves | survival sheets; attendance | right species for each tidal zone\nOutput 1.3.1 | output | 10 planting days a year | planting sheets; photos | tides and weather allow\nOutput 1.1.1 | output | 2 school sessions a month | session register | the school keeps giving time"
     },
     "notice": "Notice that only six rows are monitored: the ones two co-founders can actually check. Copy the honest note that impact is watched through photos, not claimed each year."
    },
    {
     "org": "ngo",
     "profile": {
      "framework": "ESO1 | impact | More young women from Kisumu in science study and careers (contribution) | small follow-up sample later | family costs and jobs matter too\nOutcome 1.1 | short-term outcome | Girls' science confidence and practical skills improve | pre/post confidence survey; skills checklist | girls attend regularly\nOutcome 1.2 | short-term outcome | Parents support girls' science | parent session notes | parents can attend\nOutcome 1.3 | medium-term outcome | Girls choose science subjects at secondary | subject choices from schools | families can afford secondary science\nOutput 1.1.1 | output | 14 weekly clubs, about 560 girls | tablet registers | head teachers keep giving club time\nOutput 1.1.2 | output | 25 trained mentors | training records; checks | mentors stay a year"
     },
     "notice": "See how the hardest assumption, families affording secondary science, sits right beside the outcome it threatens. Copy that placement so the risk stays visible."
    },
    {
     "org": "social",
     "profile": {
      "framework": "ESO1 | impact | More young people in stable formal work (contribution) | municipal data if available | the job market holds\nOutcome 1.1 | short-term outcome | Trainees gain baking and work skills and reliability | skills checklist; punctuality records | trainees can live on the wage\nOutcome 1.2 | medium-term outcome | Trainees earn the certificate and formal job offers within three months | certificate results; 3-month call | employers value the certificate\nOutcome 1.3 | long-term outcome | Graduates keep formal jobs | 12-month call | jobs are decent, not cheap labour\nOutput 1.1.1 | output | 12 paid apprenticeships a year, two cohorts | contracts; payroll | sales cover most costs\nOutput 1.2.1 | output | Job-matching with 8 employer partners | offers log | partners keep hiring"
     },
     "notice": "Notice the long-term outcome carries a worry, not just a hope: jobs must be decent. Copy the habit of writing assumptions that protect the people you serve."
    },
    {
     "org": "coop",
     "profile": {
      "framework": "ESO1 | impact | Secure livelihoods and a living craft (contribution) | yearly member income survey | power-loom competition\nOutcome 1.1 | short-term outcome | Members buy yarn at lower cost | purchase records vs market price | working capital is available\nOutcome 1.2 | short-term outcome | Quality improves | quality register: rejection rate | members keep the standards\nOutcome 1.3 | medium-term outcome | More direct sales at better prices | sales by channel | buyers pay more for authentic handloom\nOutcome 1.4 | long-term outcome | Higher, steadier weaving income | average monthly payment per active member | the committee keeps fair rules\nOutput 1.3.1 | output | Members paid within 15 days of delivery | payment records | shops pay us on time"
     },
     "notice": "Look at how every evidence source is a record the cooperative already keeps. Copy that before you design any new survey."
    },
    {
     "org": "hybrid",
     "profile": {
      "framework": "ESO1 | impact | Less waste and lower household costs in Leeds (contribution) | council waste figures, read with care | many other factors\nOutcome 1.1 | short-term outcome | Residents get items fixed and learn simple repairs | repair log: fixed or not; owner helped | residents trust volunteer repairs\nOutcome 1.2 | medium-term outcome | Residents repair, or borrow tools, before buying new | 3-month survey; repeat loans | repaired items last\nOutcome 1.3 | long-term outcome | Household waste falls; repair culture grows | kg diverted | people come back to repair\nOutput 1.1.1 | output | 48 repair cafés, about 2,000 items | repair log | enough skilled volunteers\nOutput 1.2.1 | output | 300 tool loans | booking system | tools come back in good condition"
     },
     "notice": "Notice that the council's waste figures are marked 'read with care'. Copy the way it separates what Riverside can show from what many other factors affect."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Design",
  "id": "indicators",
  "title": "Indicators",
  "sheet": "Indicators",
  "learn": [
   "An indicator is a specific sign you track to show whether a result is happening. It should be clearly defined, measurable with data you can get, relevant to the result and able to show change. Write a short definition so that two people would measure it the same way.",
   "Mix numbers and percentages with qualitative signs, such as changes people describe or practice you observe. For every percentage, define the numerator (who counts as a success) and the denominator (out of whom). Decide how you will break the data down, for example by gender, age, disability or location, so that unequal results become visible.",
   "Watch for common traps: counting activities as outcomes, indicators that reward easy numbers, counting the same person twice across activities, and indicators you cannot collect ethically. Record each indicator on a reference sheet with its definition, unit, source, method, frequency, owner and which direction is better."
  ],
  "weak": "Number of lives changed.",
  "strong": "Vanita Weavers Cooperative Society: percentage of pieces that fail the first quality check (numerator: pieces rejected at the first check; denominator: all pieces checked that month), broken down by village and the weaver's years of experience.",
  "why": "It is defined exactly, uses a record the cooperative already keeps and would show whether some weavers are being left behind.",
  "reflect": "Which of your indicators could improve while the real situation gets worse?",
  "exercise": "Define indicators for your priority results.",
  "fields": [
   {
    "key": "indicators",
    "label": "Indicator reference sheet",
    "hint": "Code | result | indicator | definition | unit | numerator/denominator | disaggregation | source | frequency | owner."
   }
  ],
  "check": "Would two people measure each indicator the same way from its definition?",
  "anatomy": {
   "title": "The anatomy of an indicator",
   "intro": "The parts you record for every indicator, shown with one of Pan del Barrio's. Baselines and targets come in the next lesson.",
   "cols": [
    "Part",
    "What it records",
    "Example (Pan del Barrio)"
   ],
   "rows": [
    [
     "Indicator",
     "The sign you track, with its definition",
     "% of graduates in a formal job three months after finishing"
    ],
    [
     "Baseline",
     "The value before you start, or a plan to measure it",
     "63% (5 of 8 graduates, cohorts 1–2)"
    ],
    [
     "Target",
     "The value you aim for, and by when",
     "70% by February 2028"
    ],
    [
     "Source",
     "Where the data comes from, and how",
     "Follow-up call; contract seen or employer confirms"
    ],
    [
     "Frequency",
     "How often you collect it",
     "Three months after each cohort ends"
    ],
    [
     "Owner",
     "Who collects it and answers for it",
     "Diego"
    ]
   ],
   "after": 2
  },
  "gallery": {
   "title": "Five example indicator reference sheets",
   "intro": "Each organisation defines three indicators for its ESO1 results, using the MEAL measures it already planned.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "indicators": "Outcome 1.3 | seedling survival improves | survival rate | live seedlings in six marked plots, counted by the same two people | % | live / planted in those plots | site, species | paper sheet, photographed | 6 and 12 months | Sari\nOutcome 1.3 | youth teams take part regularly | regular young participants | at 5 or more of 10 planting days | number | n/a | village, gender, age | paper attendance list | each planting day | Wayan\nOutcome 1.1 | young people gain knowledge | quiz score | 10-question quiz on mangroves and the coast | average out of 10 | n/a | village, gender | paper quiz, code numbers | start and end of year | Sari"
     },
     "notice": "Notice the survival definition names who counts: the same two people each time. Copy that detail; it is what makes a paper count trustworthy."
    },
    {
     "org": "ngo",
     "profile": {
      "indicators": "Outcome 1.1 | confidence improves | confidence gain | same girl's 10-item score (1–4) rises from start to end of year | % | girls with a higher score / girls with both surveys | school, age, disability where known | tablet survey, ID codes | January and October | coordinators\nOutcome 1.1 | practical skills improve | practical skills | does 4 of 5 checklist tasks unaided | % | girls passing / girls assessed | school, age | observation checklist | each term | coordinators\nOutput 1.1.1 | girls attend | regular attendance | at 75% or more of sessions | % | regular attenders / enrolled | school, age | tablet register | weekly, reviewed monthly | coordinators; Brian checks"
     },
     "notice": "See how the confidence indicator counts only girls with both surveys, so the denominator is honest. Copy the use of ID codes instead of names for children."
    },
    {
     "org": "social",
     "profile": {
      "indicators": "Outcome 1.2 | trainees complete | completion rate | works the full six months | % | completing / starting | gender, age, referral route | trainee spreadsheet | each cohort | Diego\nOutcome 1.2 | trainees get formal jobs | placement at 3 months | job with written contract and health insurance; contract seen or employer confirms | % | in formal jobs / all graduates (not reached shown separately) | gender, employer | follow-up call | 3 months after each cohort | Diego\nOutcome 1.3 | graduates keep jobs | retention at 12 months | same definition, 12 months on | % | in formal work / all graduates | gender, employer | follow-up call | 12 months after each cohort | Diego"
     },
     "notice": "Look at how graduates who cannot be reached are shown separately rather than quietly dropped. Copy that rule; it stops a placement rate looking better than it is."
    },
    {
     "org": "coop",
     "profile": {
      "indicators": "Outcome 1.4 | higher, steadier income | average monthly payment per active member | weaving payments to members who delivered that month; bonus separate | US$ | payments / active members | village, age group | payment records | monthly | accounts clerk; Meera checks\nOutput 1.3.1 | paid on time | on-time payments | paid within 15 days of delivery | % | on-time payments / all payments | village, month | payment records | monthly | accounts clerk\nOutcome 1.2 | quality improves | first-check rejection rate | pieces failing the first check | % | rejected / checked | village, years weaving, reason | quality register | monthly | quality officer"
     },
     "notice": "Notice the breakdown by years weaving, which would show if stricter quality checks push out older weavers. Copy disaggregation that tests your own risks."
    },
    {
     "org": "hybrid",
     "profile": {
      "indicators": "Outcome 1.1 | items get fixed | fix rate | leaves working as intended; 'advice only' separate | % | fixed / all items logged | item type, café | repair log | every café | Priya\nOutcome 1.1 | reaching low-income households | visitors from deprived areas | postcode in the most deprived 20% of neighbourhoods (national index) | % | those visitors / visitors giving a postcode | first or return visit | repair log, with consent | quarterly | volunteer coordinator\nOutcome 1.2 | repair before buying new | repair-first behaviour | repaired or borrowed a tool before buying new, last three months | % | 'yes' / survey replies | area, age band | text, email or paper survey | 3 months after a visit | Priya"
     },
     "notice": "Notice that the postcode indicator only counts people who chose to give one. Copy the habit of stating exactly who is in the denominator."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Design",
  "id": "baselines",
  "title": "Baselines and targets",
  "sheet": "Indicators",
  "learn": [
   "A baseline is the value of an indicator before your work starts, or at a fixed starting point. A target is the value you aim to reach by a given date. Without a baseline you cannot show change; without a target you cannot judge progress.",
   "If you do not know the baseline, do not invent it. Plan how and when you will establish it: an intake survey, existing records, a first-quarter measurement or published data. Write “to be established by [date]” until you have it.",
   "Set targets that are ambitious but realistic, based on similar work, your capacity and the time change usually takes. Small numbers swing a lot, so treat a percentage from six people with care. Break annual targets into quarterly milestones where that helps you manage, and revise targets openly, with a reason, never quietly."
  ],
  "weak": "Target: 100% success.",
  "strong": "Tide Line Youth Collective: seedling survival at 12 months. Baseline: to be established from the trial plot (February 2027) and the first marked plots (May 2027). Provisional target: two-thirds surviving by November 2027, confirmed after the first count.",
  "why": "It refuses to invent a baseline for a new project and sets a provisional target it will check against real counts.",
  "reflect": "Which of your targets is based on hope rather than evidence?",
  "exercise": "Set baselines (or baseline plans) and targets for your indicators.",
  "fields": [
   {
    "key": "targets",
    "label": "Baselines and targets",
    "hint": "Indicator | baseline or plan to establish it | target | date | quarterly milestones | evidence for the target."
   }
  ],
  "check": "Is every baseline either measured or planned, never invented?",
  "gallery": {
   "title": "Five example baselines and targets",
   "intro": "Each organisation sets baselines, or plans to collect them, and modest targets for three ESO1 indicators.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "targets": "Seedling survival at 12 months | to be established: trial plot (February 2027), marked plots (May 2027) | 67% (two-thirds) | November 2027 | 6-month count, May 2027 | our ESO1 aim; past local plantings failed, so we will lower it openly if the first count says so\nYoung people at 5 or more of 10 planting days | 0 (new activity) | 20, at least 8 girls | October 2027 | 12 by April 2027 | 15–25 expected per day; some drop-off likely\nKnowledge quiz average | to be established: first quiz, November 2026 | baseline + 2 points | October 2027 | none | a guess until we see the first scores"
     },
     "notice": "Notice that nothing is invented: the survival baseline waits for the first count. Copy the promise to lower a target openly if the evidence says so."
    },
    {
     "org": "ngo",
     "profile": {
      "targets": "Girls attending 75%+ of sessions | 64% (2026 registers, 14 schools) | 75% | November 2027 | 68% Term 1, 72% Term 2, 75% Term 3 | our best three schools already reach 80%\nGirls whose confidence score rises | 58% in 2026 from only 6 of 14 schools; full baseline January 2027 | 70% | October 2027 | none (start and end of year) | provisional until the full baseline\nClub leavers choosing science subjects | to be established from 2025 leavers' records with head teachers, by March 2027 | baseline + 10 points | 2028 | none | provisional; transition data is patchy"
     },
     "notice": "See how a partial baseline (6 of 14 schools) is used honestly, then replaced with a full one. Copy milestones by school term, which match how schools work."
    },
    {
     "org": "social",
     "profile": {
      "targets": "Completion rate | 72% (13 of 18, cohorts 1–3) | 80% (10 of 12) | February 2028 | 5 of 6 in each 2027 cohort | travel allowance and later shifts should reduce early leaving\nJob placement at 3 months | 63% (5 of 8, cohorts 1–2; 1 not reached) | 70% | February 2028 | checked after each cohort | 8 employer partners; two more approached\nRetention at 12 months | 2 of 4 (cohort 1 only; too few for a rate) | provisional 60% | end of 2028 | none | reviewed once three cohorts reach 12 months"
     },
     "notice": "Look at the retention row: two of four is reported as numbers, not as 50%. Copy the care with small numbers."
    },
    {
     "org": "coop",
     "profile": {
      "targets": "Average monthly payment per active member | about US$30 (April 2025–March 2026; about 110 active members) | US$33 (+10%) | March 2028 | quarterly, against the same quarter last year | yarn savings and online sales; festival months distort single months\nPayments within 15 days | 71% (2025–2026 records) | 95% | March 2028 | 80% by June 2027; 85% through the festival season | late payments come mostly from two shops\nFirst-check rejection rate | 12% (2025–2026 register) | 8% | March 2028 | one point lower each quarter | design workshops cut faults in one village last year"
     },
     "notice": "Notice how milestones respect the festival season, when payments slip. Copy targets that fit your organisation's yearly rhythm."
    },
    {
     "org": "hybrid",
     "profile": {
      "targets": "Fix rate | 61% of 1,960 items (2025–2026 log) | 65% | March 2028 | one point a quarter | more trained repairers; we will not turn away hard repairs to hit it\nVisitors from most deprived neighbourhoods | 22% of those giving a postcode (68% gave one) | 30% | March 2028 | 24% by June 2027 | housing association pop-ups from May 2027\nRepair-first after three months | to be established: first wave January–March 2027 | provisional 50% | March 2028 | none | set after the first wave; replies may come mostly from regulars"
     },
     "notice": "Notice the warning about turning away hard repairs to hit the fix-rate target. Copy the habit of naming how a target could be gamed."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "data-collection",
  "title": "Data collection, ethics and data quality",
  "sheet": "Data collection plan",
  "learn": [
   "Choose methods that fit the indicator and the people involved: registers and attendance lists, surveys, interviews, group discussions, observation, skills tests, administrative records or digital analytics. Use the simplest method that gives credible evidence. A paper sheet that is filled in every time beats an app nobody opens.",
   "Collect data ethically. Explain why you are collecting it, ask for informed consent, collect only what you need, keep it confidential, make taking part voluntary and avoid causing distress. Take particular care with children, vulnerable adults and sensitive topics, and follow the data protection rules where you work; rules differ by country, so confirm locally.",
   "Check quality in five ways: validity (it measures what it claims), reliability (it is collected the same way each time), timeliness, precision and integrity (it has not been changed). Build simple checks into your routine: train the people who collect data, spot-check a sample and keep definitions to hand. Test every tool with the people who will use it before you roll it out."
  ],
  "weak": "Send a long survey to everyone at the end of the year.",
  "strong": "Riverside Repair Hub: volunteers fill in the repair log for every item at the café; visitors are asked for a postcode only with consent; Priya checks ten log entries against the paper tickets each month.",
  "why": "The method fits the indicator, consent is built in and a small regular check keeps the data trustworthy.",
  "reflect": "What data are you collecting that you never use?",
  "exercise": "Draft your data collection plan.",
  "fields": [
   {
    "key": "plan",
    "label": "Data collection plan",
    "hint": "Indicator | method and tool | who collects | when | consent approach | where stored."
   },
   {
    "key": "quality",
    "label": "Quality checks",
    "hint": "How you will check validity, reliability and integrity."
   }
  ],
  "check": "Does each method protect participants and produce data you can trust?",
  "gallery": {
   "title": "Five example data collection plans",
   "intro": "Each organisation plans how it will collect its ESO1 indicators, with consent and quality checks sized to its team.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "plan": "Seedling survival | paper sheet for six marked plots; photos from fixed posts | Sari and a youth team leader | 6 and 12 months after planting | no personal data; sites agreed with village heads | sheets photographed to the Drive that day\nAttendance | paper list: code number, village, gender, age | adult volunteer in charge | every planting day | parent consent form before a child's first day | Drive folder for the co-founders only\nKnowledge quiz | 10-question paper quiz in Bahasa Indonesia | Sari, with the teacher | November and October | voluntary; explained to students and parents; code numbers only | papers kept by Sari; scores in one sheet",
      "quality": "The same two people count survival each time, using the same plot markers. Wayan checks every sheet's photo for missing plots on the day. Consent forms are checked before each planting day. Names and code numbers are kept on separate sheets, and photos of children are not posted without parent consent."
     },
     "notice": "Notice that names and code numbers live on separate sheets. Copy this simple step whenever you hold children's data, however small your team."
    },
    {
     "org": "ngo",
     "profile": {
      "plan": "Attendance | offline tablet register | club coordinators | every session | parent consent at enrolment | synced weekly; staff access by role\nConfidence | 10-question tablet survey, read aloud in Kiswahili or Dholuo if needed | coordinators, not mentors | January and October | parent consent and the girl's own agreement; any question can be skipped | ID codes; Brian keeps the code list separately\nPractical skills | 5-task observation checklist | trained coordinators | end of each term | presented as club work, not a test | tablet form\nSubject choices | club leavers' choices from head teachers | Brian | March | agreement with each school | ID codes",
      "quality": "Coordinators are trained together on the survey and checklist each January. Brian re-observes one session per club each term and compares checklists. Grace spot-checks 10% of attendance records against paper sign-in sheets each quarter. Survey questions were tested with the girls' advisory group. Data protection follows national rules for minors' data, confirmed with our lawyer."
     },
     "notice": "See how coordinators, not mentors, run the confidence survey, so girls do not answer to someone they want to please. Copy that thought about who asks the questions."
    },
    {
     "org": "social",
     "profile": {
      "plan": "Completion | trainee spreadsheet: start, end, reason for leaving | Diego | each cohort | explained in the contract and at induction | Diego's password-protected laptop, backed up monthly\nPlacement and retention | phone or WhatsApp call with a short script; contract seen or employer confirms | Diego | 3 and 12 months after each cohort | agreed at graduation; can opt out | same spreadsheet\nTrainee feedback | anonymous form at month 3 and the end; exit talk for early leavers | café supervisor, not Diego | each cohort | voluntary; no names | forms kept by the supervisor, summarised for Lucía and Diego",
      "quality": "Placement counts only with a contract seen or employer confirmation, not just the graduate's word. Diego records graduates not reached as 'not reached', never as 'not working'. Lucía checks the spreadsheet against payroll after each cohort. The follow-up script was tested with two graduates first."
     },
     "notice": "Notice that feedback is collected by the café supervisor, not by Diego who mentors them. Copy the habit of letting people speak to someone other than their manager."
    },
    {
     "org": "coop",
     "profile": {
      "plan": "Weaving income | payment records in the cooperative software | accounts clerk | monthly | members told how records are used; only totals shared | cooperative software, audited yearly\nPayment days | delivery and payment date for every piece | accounts clerk | each payment | as above | cooperative software\nRejection rate | quality register: piece, weaver code, pass or fail, reason | quality officer | every piece | discussed with each weaver; never named publicly | paper register, entered weekly\nMember views | short spoken survey in Malayalam at village meetings | committee members in pairs | yearly, February | voluntary | sheets summarised by Meera",
      "quality": "The treasurer checks a sample of payment records against bank transfers each month. The quality officer and Meera both check ten pieces each quarter and compare results. Rejection reasons use a fixed list of six options so they are recorded the same way. Results are shown by village and never by named weaver."
     },
     "notice": "Look at the fixed list of six rejection reasons. Copy fixed answer options wherever different people record the same thing."
    },
    {
     "org": "hybrid",
     "profile": {
      "plan": "Fix rate and weight | repair log: item, fault, result, weight | repair volunteers on a paper ticket; front desk enters it | every item | visitors told how data is used | volunteer database, staff access only\nPostcode | asked at the front desk | front-desk volunteer | every visit | with consent; 'prefer not to say' allowed | stored without names\nRepair-first survey | three questions by text or email; paper option | volunteer coordinator | 3 months after a visit | opt-in at the café | contact details deleted afterwards\nPupils' confidence | five-question card before and after | schools officer, with the teacher | each workshop | school agreement; no names | totals only",
      "quality": "Priya compares ten log entries with paper tickets each month. Every café weighs items on the same scale, checked against a test weight each quarter. Repair volunteers are trained in the 'fixed', 'partly fixed' and 'advice only' definitions. We report how many people replied to the survey alongside its results."
     },
     "notice": "Notice that survey results are always reported with the number who replied. Copy this; it lets readers judge how far to trust a percentage."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Implement",
  "id": "meal-plan",
  "title": "The MEAL plan and budget",
  "sheet": "MEAL plan",
  "learn": [
   "A MEAL plan brings everything together: your results framework, indicators, data collection, roles, timing, review meetings, evaluation, feedback channels and reporting. It is the operating manual for your evidence, short enough that the people who use it will read it.",
   "Assign roles clearly. Who collects data, who enters and checks it, who analyses it, who leads reviews and who reports? In a small organisation one person may do much of this; write down the time it takes so it is not hidden on top of everything else.",
   "Budget for MEAL. Tools, staff time, transport, translation, participant compensation, evaluation and learning events all cost money. Many funders accept a MEAL budget line; put it in your proposals and in your budget in Module 9."
  ],
  "weak": "Monitoring will be done by everyone when they have time.",
  "strong": "Imara Girls in Science: coordinators record attendance weekly on tablets; Brian checks and analyses data monthly; Achieng presents the dashboard to the board quarterly; MEAL and data budget US$5,000 a year, plus staff time.",
  "why": "Each task has a person, a rhythm and a cost, so MEAL does not depend on goodwill.",
  "reflect": "Who in your team has the time to analyse data, not just collect it?",
  "exercise": "Write the roles, calendar and budget for your MEAL system.",
  "fields": [
   {
    "key": "roles",
    "label": "Roles and responsibilities",
    "hint": "Task | who | time needed."
   },
   {
    "key": "calendar",
    "label": "MEAL calendar",
    "hint": "Activity | frequency | dates."
   },
   {
    "key": "budget",
    "label": "MEAL budget",
    "hint": "Item | estimated cost | funding source."
   }
  ],
  "check": "Are MEAL roles and costs visible in plans and budgets?",
  "gallery": {
   "title": "Five example MEAL plans and budgets",
   "intro": "Each organisation sets out who does what, when, and what it costs, in proportion to its size.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "roles": "Survival counts and photos | Sari, with one youth team leader | 1 day, twice a year\nAttendance lists and consent forms | adult volunteer in charge of each planting day | 15 minutes a day\nQuiz and school feedback | Sari, with the teacher | 2 hours, twice a year\nTyping up sheets and a one-page summary | Wayan | 2 hours a quarter\nFeedback and concerns | Ibu Made (outside the delivery team) | as needed",
      "calendar": "Planting days and attendance | 10 a year | November 2026 to March 2027 mainly (rainy season), then monthly\nTrial plot count | once | February 2027\nSurvival counts | twice a year | May and November\nKnowledge quiz | start and end of year | November 2026, October 2027\nReview with youth team leaders | each quarter | January, April, July, October",
      "budget": "Printing sheets, quiz and consent forms | US$40 | contingency line\nPlot markers and a tape measure | US$60 | boots/tools line\nBoat hire for the far site's survival counts | included in boat hire | boat hire line\nSnacks for review meetings with young people | US$80 | snacks and transport line\nVolunteer time | unpaid, about 6 days a year | in kind"
     },
     "notice": "Notice that MEAL costs about US$180 a year and sits inside existing budget lines. Copy the habit of writing volunteer time down even when it is unpaid."
    },
    {
     "org": "ngo",
     "profile": {
      "roles": "Attendance, surveys and skills checklists | 3 club coordinators | about 2 hours a week each\nData checks, analysis and dashboard | Brian, programme manager | 2 days a month\nSpot-checks of records | Grace, finance officer | half a day a quarter\nBoard dashboard and funder reports | Achieng | 2 days a quarter\nFeedback box and phone line | Grace (outside the programme team) | 2 hours a week",
      "calendar": "Attendance | weekly | every club session\nConfidence survey | twice a year | January and October\nSkills checklist | each term | end of Terms 1, 2 and 3\nSubject choices with schools | yearly | March\nQuarterly review and board dashboard | quarterly | March, June, September, December\nMid-term review | once | mid-2027, before Foundation A's final report",
      "budget": "Tablets (replacement and data bundles) | US$1,500 | MEAL and data line (Foundation B)\nData tool subscription | US$600 | MEAL and data line\nPrinting, translation of surveys | US$400 | MEAL and data line\nTransport for subject-choice visits | US$500 | transport line\nAdvisory group meetings and girls' feedback sessions | US$500 | MEAL and data line\nMid-term review facilitator | US$2,000 | MEAL and data line (Foundation A)\nStaff time | in salaries | staff line"
     },
     "notice": "See how the mid-term review is timed before Foundation A's final report. Copy the habit of fitting your MEAL calendar to funders' deadlines."
    },
    {
     "org": "social",
     "profile": {
      "roles": "Trainee spreadsheet and follow-up calls | Diego | about 4 hours a month\nSkills checklists | Lucía, as master baker | 1 hour per trainee per month\nAnonymous feedback forms | café supervisor | 1 hour per cohort\nChecking the spreadsheet against payroll | Lucía | 1 hour per cohort\nSummary for the advisory group | Diego | 2 hours every two months",
      "calendar": "Skills checklist | monthly | last week of each month\nTrainee feedback | twice per cohort | month 3 and month 6\n3-month follow-up | each cohort | May and November (cohorts end in February and August)\n12-month follow-up | each cohort | February and August\nAdvisory group review | every two months | with the accounts",
      "budget": "Phone credit for follow-up calls | US$60 a year | café running costs\nPrinting forms | US$30 | café running costs\nThank-you meal for graduates at follow-up | US$150 | employer training fees\nDiego's and Lucía's time | in wages | wages line\nIf we apply for BIC status: annual impact report | about US$300 for design and printing | to be decided"
     },
     "notice": "Notice the small cost of keeping graduates engaged at follow-up. Copy the idea that reaching people later may need a small thank-you budget."
    },
    {
     "org": "coop",
     "profile": {
      "roles": "Payment and income figures | accounts clerk | 1 day a month\nQuality register | quality officer | part of daily work; 2 hours a month to summarise\nMonthly summary for the committee | Meera | half a day a month\nMember survey at village meetings | committee members, in pairs | 1 day a year\nAGM results report | Meera and the treasurer | 3 days a year",
      "calendar": "Payment and quality data | monthly | before each committee meeting\nCommittee review | monthly | first week of the month\nFestival season check on payments | once | September\nMember survey | yearly | February\nAnnual general meeting with results | yearly | September",
      "budget": "Printing results for village meetings (in Malayalam) | US$50 | other costs\nTravel for committee members to village meetings | US$120 | other costs\nCooperative software (already required) | no extra cost | accounts\nStaff time | in salaries | staff costs"
     },
     "notice": "Look at the AGM, where results go back to the members who own the cooperative. Copy the idea that your main report can be a meeting, not a document."
    },
    {
     "org": "hybrid",
     "profile": {
      "roles": "Repair log at each café | repair and front-desk volunteers | 5 minutes per item\nMonthly log checks and fix-rate analysis | Priya | half a day a month\nFollow-up survey | volunteer coordinator | 1 day a quarter\nSchool confidence cards | schools officer | 30 minutes per workshop\nQuarterly report to trustees (charity and company) | Tom | 2 days a quarter\nFeedback and complaints log | volunteer coordinator; serious concerns to the chair, Helen | 1 hour a week",
      "calendar": "Repair log | every café | weekly\nLog checks | monthly | first Monday\nFollow-up survey | quarterly | January, April, July, October\nTrustees' report | quarterly | before each board meeting\nAnnual review and report to the regulator | yearly | with the annual accounts",
      "budget": "Survey tool and text messages | £300 | grant (MEAL line)\nScales and test weight | £120 | tools and insurance\nRepair log tickets and printing | £150 | other costs\nVolunteer training on log definitions | £200 | grant (training line)\nExternal evaluation, October 2027 to March 2028 | £6,000 | grant still to be secured\nStaff time (about 5% of Priya's and Tom's time) | in salaries | staff costs"
     },
     "notice": "Notice that serious concerns go to the chair, not to staff. Copy the habit of naming a route for concerns in the plan itself."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Manage",
  "id": "monitoring",
  "title": "Monitoring: planned versus actual",
  "sheet": [
   "Indicators",
   "Reviews"
  ],
  "learn": [
   "Monitoring compares what you planned with what is actually happening. For each indicator and period, record the planned value, the actual value and the gap. Look at the trend over several periods, not just one number.",
   "When there is a gap, ask why before you react. Is the data right? Did an assumption fail? Did the context change? Was the target unrealistic? Write the explanation first, then decide the response.",
   "Keep the presentation simple: a few indicators, a traffic-light status (green on track, amber at risk, red off track) and a line of comment for each. Share it with the people who can act on it, including frontline staff and volunteers and, where it makes sense, the people you serve."
  ],
  "weak": "We report the numbers at the end of the year.",
  "strong": "Vanita Weavers Cooperative Society: each month the committee sees four indicators with planned and actual values and a traffic light; February's red quality figure was traced to one new border design, and the designer adjusted it before the next order.",
  "why": "Monitoring is regular, visual and leads straight to an explanation and an action.",
  "reflect": "If an indicator turned red tomorrow, who would notice and what would they do?",
  "exercise": "Design your monitoring dashboard and the routine for reviewing it.",
  "fields": [
   {
    "key": "dashboard",
    "label": "Monitoring dashboard",
    "hint": "Indicator | target | planned this period | actual | status | comment."
   },
   {
    "key": "routine",
    "label": "Monitoring routine",
    "hint": "Who prepares, who reviews, how often and what happens to red items."
   }
  ],
  "check": "Does every gap between planned and actual lead to an explanation and, if needed, an action?",
  "gallery": {
   "title": "Five example monitoring dashboards",
   "intro": "Each organisation shows one period of its dashboard for ESO1 and how it reviews it.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "dashboard": "Planting days | 10 a year | 5 (Nov–Mar) | 4 | amber | one cancelled for a storm; extra day added in April\nYoung people per planting day | 15–25 | 15–25 | average 18 (7 girls) | green | fewer girls on boat days to the far site\nTrial plot survival at 3 months | not set yet | baseline count | 58% | amber | losses almost all on the upper plot, which dries out at low tide\nConsent forms before first day | 100% | 100% | 100% | green | Sari checks before each day\nSchool sessions | 2 a month | 8 | 7 | green | one lost to exams",
      "routine": "Wayan fills in a one-page paper dashboard from the photographed sheets at the end of each quarter. He and Sari review it with the youth team leaders over snacks. Any amber or red item gets a reason and one action, written on the same page and photographed to the Drive."
     },
     "notice": "Notice that the dashboard is one paper page reviewed with the youth team leaders. Copy the habit of writing the reason for every amber item, not just the colour."
    },
    {
     "org": "ngo",
     "profile": {
      "dashboard": "Girls attending 75% or more | 75% by November | 68% (Term 1) | 66% | amber | two schools at 45% after the club moved to after 4 pm\nConfidence baseline survey | 14 schools | 14 | 14 (average 2.4 of 4) | green | full baseline now in place\nActive mentors | 25 | 25 | 21 | amber | four university mentors paused for exams\nParent sessions | 1 per school per term | 14 | 11 | red | three head teachers cancelled; no new dates yet\nClub kits restocked | 14 | 14 | 14 | green | none",
      "routine": "Brian prepares the dashboard from the tablet data in the first week after each term. The programme team reviews it at the monthly meeting. Each red item gets an explanation and an action with an owner. Achieng takes a summary to the board each quarter, and the girls' advisory group sees a simple version each term."
     },
     "notice": "See how the girls' advisory group sees a simple version of the dashboard. Copy the idea of sharing monitoring with the people it is about."
    },
    {
     "org": "social",
     "profile": {
      "dashboard": "Completion (cohort 4, Sep 2026–Feb 2027) | 80% | 5 of 6 | 4 of 6 | red | both left in month two, citing travel cost and time\nCertificate pass | all completers | 4 of 4 | 4 of 4 | green | none\n3-month placement (cohort 3) | 70% | 4 of 5 | 3 of 5 | amber | one not reached; one in informal work\n12-month retention (cohort 2) | 60% provisional | 3 of 4 | 3 of 4 | green | one not reached\nLargest wholesale client's share | below 40% | 40% | 41% | amber | a cash risk, shown for context",
      "routine": "Diego updates the spreadsheet and dashboard after each cohort and each follow-up round. Lucía and Diego discuss it at the next weekly staff meeting. Red items go to the advisory group meeting every two months, with Diego's explanation and a proposed change."
     },
     "notice": "Look at how small numbers are shown as '4 of 6', not as percentages. Copy that whenever your groups are small."
    },
    {
     "org": "coop",
     "profile": {
      "dashboard": "Average monthly payment per active member | US$33 by March 2028 | above same month last year (US$29) | US$31 | green | yarn savings starting to show\nPayments within 15 days | 80% by June 2027 | 78% | 74% | amber | two shops paid late; we waited for their money\nFirst-check rejection rate | 11% this quarter | 11% | 13% | red | faults concentrated in one village on the new border design\nOnline share of sales | 40% (ISO1) | 33% | 34% | green | new collection listed in February",
      "routine": "The accounts clerk and quality officer give their figures to Meera by the 25th of each month. Meera prepares a one-page dashboard in Malayalam for the monthly committee meeting. Red items get a cause and an action in the minutes. Village representatives share the headline figures in the WhatsApp groups."
     },
     "notice": "Notice that figures go back to members through village WhatsApp groups. Copy the step of sharing results with the people who generate the data."
    },
    {
     "org": "hybrid",
     "profile": {
      "dashboard": "Fix rate | 65% by March 2028 | 62% | 63% | green | 'partly fixed' now logged correctly\nVisitors from most deprived areas | 30% by March 2028 | 22% (pop-ups from May) | 21% | amber | 70% gave a postcode\nItems logged | about 2,000 a year | 500 | 470 | green | two cafés short of electrical repairers\nTool loans | 300 a year | 75 | 52 | red | users find online booking confusing\nRepair-first survey (first wave) | baseline | 180 invited | 64 replies; 47% repaired first | green | baseline set; replies may favour regulars",
      "routine": "Priya prepares the dashboard in the second week after each quarter. Staff review it together, then Tom adds it to the quarterly report to trustees alongside the shop figures. Red items need a cause, an action and an owner before the report goes to trustees."
     },
     "notice": "Notice the dashboard is honest that survey replies may favour regulars. Copy short warnings that stop a green light from being over-read."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "evaluation",
  "title": "Evaluation",
  "sheet": "Evaluation plan",
  "learn": [
   "Evaluation asks deeper questions than monitoring: did the work achieve its outcomes, for whom, why, at what cost and with what unintended effects? Common criteria are relevance, coherence, effectiveness, efficiency, impact and sustainability. You do not need all six; pick the ones behind your real questions.",
   "Choose the type for your purpose. Formative evaluation improves the work during delivery; summative judges results at the end; process evaluation looks at how delivery works; impact evaluation estimates the difference made compared with what would otherwise have happened. Rigorous impact evaluation is expensive, so many organisations build a credible contribution story instead.",
   "Decide whether to evaluate internally or commission someone external. External evaluation brings independence but needs terms of reference, a budget and management time. Before you start, plan how you will share the findings and respond to each recommendation."
  ],
  "weak": "We will do an impact evaluation when we have money.",
  "strong": "Riverside Repair Hub: an external evaluation in 2027–28 asks whether visitors, especially low-income households, repair before buying new, and how long repairs last; trustees write a response to each recommendation before deciding on the lease in 2028.",
  "why": "It asks a few questions that matter, is timed for a real decision and commits to responding.",
  "reflect": "What is the one question about your work you most need an honest answer to?",
  "exercise": "Draft your evaluation plan.",
  "fields": [
   {
    "key": "questions",
    "label": "Evaluation questions",
    "hint": "The three to five questions you most need answered."
   },
   {
    "key": "approach",
    "label": "Type, timing and who",
    "hint": "Formative or summative, internal or external, timing and budget."
   },
   {
    "key": "use",
    "label": "Using the findings",
    "hint": "How findings will be shared, discussed and acted on."
   }
  ],
  "check": "Will your evaluation answer questions that lead to decisions?",
  "anatomy": {
   "title": "Monitoring and evaluation compared",
   "intro": "They use some of the same data but answer different questions.",
   "cols": [
    "",
    "Monitoring",
    "Evaluation"
   ],
   "rows": [
    [
     "Main question",
     "Are we doing what we planned, and what is changing?",
     "Did it make a difference, for whom, why and at what cost?"
    ],
    [
     "When",
     "Continuously: weekly, monthly, quarterly",
     "At set points: mid-way, at the end or after"
    ],
    [
     "Who",
     "Your own team, as part of the work",
     "Your team, or an external evaluator for independence"
    ],
    [
     "Typical evidence",
     "Registers, logs, dashboards",
     "Monitoring data plus interviews, group discussions, comparison"
    ],
    [
     "Leads to",
     "Quick fixes and adjustments",
     "Bigger decisions on strategy, scale or design"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example evaluation plans",
   "intro": "Each organisation chooses a few questions about ESO1 and an approach it can afford.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "questions": "1. Are we planting the right species in the right places, and what explains the survival we see?\n2. Which young people take part and stay, and who is left out?\n3. Do young people feel the restoration is theirs?\n4. Has the work caused tension with pond owners or anyone else?",
      "approach": "Formative and internal, after the first full year (November 2027). Sari's former lecturer, a mangrove specialist, visits the sites for a day to review species and siting. Wayan runs two group discussions with young people (one for girls) and talks to both village heads and two pond owners. Budget: about US$150 for transport and snacks.",
      "use": "A two-page summary in Bahasa Indonesia, shared with the youth team, both village heads and the dive operators. The co-founders and youth leaders agree what to change before the second rainy season, and update the Theory of Change."
     },
     "notice": "Notice how a tiny group still gets an outside view: one specialist visit. Copy the separate discussion for girls, so quieter voices are heard."
    },
    {
     "org": "ngo",
     "profile": {
      "questions": "1. Does girls' growing confidence lead to choosing science subjects at secondary school?\n2. Which girls benefit least, and why?\n3. Do partner schools keep hands-on science going without our coordinators?\n4. What does it cost per girl, and is that reasonable compared with similar programmes?",
      "approach": "Formative mid-term review, mid-2027, with an external facilitator (US$2,000, Foundation A), using our data plus group discussions with girls, parents and teachers. Summative external evaluation of the 2026–2029 strategy in 2029, about US$8,000, still to be raised; terms of reference agreed with the board and the girls' advisory group.",
      "use": "Findings go to the board, both foundations and the county education office. Achieng writes a management response to each recommendation within one month. The girls' advisory group helps turn the findings into a short version for girls and parents."
     },
     "notice": "See how the girls' advisory group helps shape the questions and the short version. Copy the step of involving participants in evaluation, not just in data."
    },
    {
     "org": "social",
     "profile": {
      "questions": "1. Why do some trainees leave early, and what would help them stay?\n2. Does the certificate change employers' hiring decisions?\n3. Are graduates' jobs decent: contract, pay, health insurance and hours?\n4. What does each graduate in a formal job cost, and who pays?",
      "approach": "Internal process review after cohort 6 (early 2028), led by the youth employment specialist from our advisory group, unpaid. Diego interviews early leavers and six employers; the accountant works out cost per graduate. Budget: about US$200 for transport and refreshments. An external evaluation would only follow if a grant requires it.",
      "use": "Discussed at a half-day meeting of Lucía, Diego and the advisory group. Decisions recorded on training, recruitment and employer partners. Findings feed the BIC decision and, if we take BIC status, the first annual impact report."
     },
     "notice": "Look at question three: it checks that 'placed' means a decent job. Copy evaluation questions that test the quality of a result, not just whether it happened."
    },
    {
     "org": "coop",
     "profile": {
      "questions": "1. Has members' weaving income risen and become steadier, and for whom?\n2. Are older or less experienced weavers being pushed out by stricter quality rules?\n3. Do online buyers still pay a fair premium after marketplace fees?\n4. What would make young people in weaving families stay?",
      "approach": "Participatory review before the 2028 AGM, run by students from our partner design school with a facilitator from a cooperative training body (about US$600). Group discussions in each village, separate ones with apprentices, and analysis of three years of payment and quality records.",
      "use": "Results presented at the AGM in Malayalam with pictures; members vote on changes to piece rates, quality rules and apprentice support. A short English summary goes to buyers and the cooperative department."
     },
     "notice": "Notice that members vote on what to change. Copy a route from findings to the people with the power to decide."
    },
    {
     "org": "hybrid",
     "profile": {
      "questions": "1. Do visitors, especially low-income households, repair or borrow before buying new, and does this last?\n2. Who are we not reaching, and why?\n3. How long do repaired items last?\n4. Is the mix of repair cafés, tool library and shop the best use of our money?",
      "approach": "External evaluation, October 2027 to March 2028, by an independent evaluator or university team, about £6,000 from a grant. It uses the repair log, two survey waves, interviews with 20 residents (recruited through housing associations) and a follow-up of 50 repaired items.",
      "use": "Report to trustees in April 2028. Trustees write a response to each recommendation and use the findings in the lease and premises decision. A summary is published on our website and shared with the council and volunteers."
     },
     "notice": "Notice that the evaluation is timed to inform the 2028 lease decision. Copy the habit of scheduling evaluation before a big choice, not after it."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "accountability",
  "title": "Accountability: participation, feedback and complaints",
  "sheet": "Feedback log",
  "learn": [
   "Accountability to the people you serve means sharing information they can understand, involving them in decisions that affect them, listening to their feedback and handling complaints fairly. It respects people's dignity, and it improves the work, because they notice problems first.",
   "Offer several feedback channels suited to different people: conversations, suggestion boxes, phone lines, messaging, short surveys and community meetings. Think about language, literacy, age and who might feel unable to speak. Include at least one route outside the immediate delivery team for sensitive concerns, including safeguarding.",
   "Record feedback and complaints, respond within agreed times and close the loop: tell people what changed because of their feedback, or why it could not. Look at the feedback log regularly for patterns. Serious concerns, such as abuse or fraud, follow the procedures in Module 10."
  ],
  "weak": "People can always talk to us.",
  "strong": "Pan del Barrio S.A.C.: trainees can give feedback at weekly check-ins, on an anonymous card at month 3 and the end, or to Lucía directly about concerns with their mentor; we reply within ten working days and post a “you said, we did” note in the staff room after each cohort.",
  "why": "The channels suit trainees, one bypasses the person they work most closely with, and the loop is visibly closed.",
  "reflect": "What would stop a participant from complaining about your organisation?",
  "exercise": "Design your feedback and complaints mechanism.",
  "fields": [
   {
    "key": "channels",
    "label": "Feedback channels",
    "hint": "Channel | who it suits | who receives it | response time."
   },
   {
    "key": "loop",
    "label": "Closing the loop",
    "hint": "How you record, analyse, respond and report back."
   }
  ],
  "check": "Could someone raise a sensitive concern without going through the person concerned?",
  "anatomy": {
   "title": "Choosing feedback channels",
   "intro": "No single channel suits everyone; combine a few that cover different needs.",
   "cols": [
    "Channel",
    "Who it suits",
    "Watch out for"
   ],
   "rows": [
    [
     "Face-to-face conversation",
     "People who prefer talking; low literacy",
     "People may not criticise someone they depend on"
    ],
    [
     "Anonymous card or box",
     "Children, shy or worried participants",
     "You cannot reply to one person, so report back to all"
    ],
    [
     "Phone or messaging line",
     "Parents, people at a distance",
     "Needs a named person who answers on time"
    ],
    [
     "Group meeting or forum",
     "Shared issues; collective decisions",
     "Louder voices dominate; some will not speak in public"
    ],
    [
     "Named person outside the team",
     "Sensitive concerns, including safeguarding",
     "Must be known, trusted and trained"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example feedback and complaints mechanisms",
   "intro": "Each organisation designs channels for the people its ESO1 work serves, including one outside the delivery team.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "channels": "Talking circle at the end of each planting day | young people | Sari or the adult in charge | discussed on the spot; answer at the next planting day\nAnonymous feedback box at the school | students who will not speak up | Wayan opens it monthly with the teacher | within one month\nWhatsApp or a visit for parents | parents and guardians | Wayan | within one week\nIbu Made, as a respected person outside the delivery team | anyone with a sensitive concern, including about a volunteer | Ibu Made, then the safeguarding procedure | same day for safeguarding; otherwise one week",
      "loop": "Wayan writes every comment and complaint in a notebook: date, what was raised, response. Each quarter the co-founders read it with the youth team leaders. A short 'you told us' note goes on the village notice board and is read at school assembly, for example: 'You asked for planting days not to clash with temple ceremonies, so we now check the calendar with the village head.'"
     },
     "notice": "Notice that Ibu Made, a respected elder outside the delivery team, receives sensitive concerns. Copy the idea of naming a trusted person, not just a process."
    },
    {
     "org": "ngo",
     "profile": {
      "channels": "Girls' advisory group (12 girls, two per sub-county area, rotating) | girls | Brian | discussed each term; reply at the next meeting\nAnonymous 'talk box' in each club | girls who prefer to write or draw | coordinators collect weekly; Brian reads | within two weeks\nPhone and WhatsApp line for parents and guardians | parents, guardians, teachers | Grace, outside the programme team | within five working days\nSafeguarding focal person on a separate number | anyone, for concerns about an adult | the safeguarding focal person, who reports to the board's committee | same day",
      "loop": "Every comment is logged on the shared drive: date, channel, theme, response, status. Brian reviews themes monthly; Achieng reports patterns to the board each quarter. Each term coordinators tell each club 'You said, we did', for example longer practical time after girls asked for fewer worksheets. Safeguarding concerns are recorded separately and never shared in these summaries."
     },
     "notice": "See how parents' line is answered by Grace, outside the programme team. Copy the separation of safeguarding records from general feedback."
    },
    {
     "org": "social",
     "profile": {
      "channels": "Weekly check-in with Diego | trainees | Diego | discussed on the spot or by the next check-in\nAnonymous card at month 3 and at the end | trainees uneasy speaking to staff | café supervisor | summary within ten working days\nDirect line to Lucía | trainees with a concern about their mentor or Diego | Lucía | within five working days\nCustomer comments book and Instagram messages | customers and office clients | café supervisor | within two days\nMunicipal youth programme adviser | trainees who prefer someone outside the bakery | the adviser, who contacts Lucía | as agreed with the municipality",
      "loop": "Diego keeps a feedback log in the trainee spreadsheet: date, channel, issue, action. Lucía and Diego read it after each cohort. A 'you said, we did' note goes on the staff room board, for example moving the early shift start to 6 a.m. after trainees said buses did not run earlier."
     },
     "notice": "Look at the outside route through the municipal adviser. Copy the idea of using a partner as a channel when your own team is very small."
    },
    {
     "org": "coop",
     "profile": {
      "channels": "Village WhatsApp groups | members comfortable with phones | village representative passes issues to Meera | within one week\nMonthly village meeting | all members, including those without phones | a committee member records issues | reply at the next meeting\nAnonymous box at the collection centre | members uneasy about raising issues in public | treasurer opens it monthly | at the next committee meeting\nAnnual general meeting | all members | the president | answered at the meeting or in the minutes\nState cooperative department | members whose complaint about the committee is not resolved | the department | under its own rules",
      "loop": "The secretary keeps a complaints register: date, issue, who handles it, outcome. The committee reviews it monthly. Common issues and what changed are read out at village meetings and summarised at the AGM, for example when quality rejection reasons began to be written on the slip after weavers asked why pieces failed."
     },
     "notice": "Notice how members can go beyond the committee to the state department. Copy the habit of naming an external route when the complaint concerns your leaders."
    },
    {
     "org": "hybrid",
     "profile": {
      "channels": "Exit card at each repair café (three questions, paper) | visitors | volunteer coordinator | reviewed weekly\nEmail and phone line | residents, shop customers | volunteer coordinator | within five working days\nVolunteer forum every two months | volunteers | Tom | answered at the next forum\nCommunity drop-ins with housing associations | low-income tenants who may not come to the café | volunteer coordinator with housing officers | within two weeks\nChair of trustees (Helen) | anyone with a concern about staff, safety or safeguarding | Helen | acknowledged within two working days",
      "loop": "All feedback goes into one log in the volunteer database: date, channel, theme, action, closed or not. Priya and the volunteer coordinator review themes monthly; Tom reports them to trustees quarterly. A 'You said, we did' board at each café and a line in the newsletter close the loop, for example adding an evening café for people who work."
     },
     "notice": "Notice the drop-ins with housing associations, which reach people who do not come to cafés. Copy the step of going to people you are missing, not waiting for them."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meal-strategy"
  ],
  "video": null,
  "stage": "Manage",
  "id": "learning",
  "title": "Learning and adaptive management",
  "sheet": "Reviews",
  "learn": [
   "Learning is the step that turns evidence into better decisions. It needs time set aside: regular reviews where the team looks at monitoring data, feedback and evaluation findings and asks “so what?” and “now what?”",
   "Use simple formats: an after-action review (what was planned, what happened, why, what we will do differently), a quarterly learning session, a lessons log. Record each decision with an owner and a date, and check at the next review whether it was carried out.",
   "Adaptive management means changing activities, targets or even your Theory of Change in response to evidence, openly and with the agreement of those who need to agree, including funders where required. Treat disappointing findings as useful information, not failures to hide."
  ],
  "weak": "We discuss lessons learned in the final report.",
  "strong": "Imara Girls in Science: at the Term 1 review the team saw attendance falling in two schools where clubs had moved to after 4 pm; Brian agreed lunchtime clubs with both head teachers by mid-May, and attendance is checked again at the Term 2 review.",
  "why": "A finding leads to a recorded decision with an owner and a date, checked at the next review.",
  "reflect": "What is the last decision you changed because of evidence?",
  "exercise": "Plan your learning routine and record a first review.",
  "fields": [
   {
    "key": "routine",
    "label": "Learning routine",
    "hint": "Format, frequency, participants and how decisions are recorded."
   },
   {
    "key": "review",
    "label": "First review record",
    "hint": "Finding | feedback | learning | decision | owner | due."
   }
  ],
  "check": "Does each review end with recorded decisions that someone owns?",
  "gallery": {
   "title": "Five example learning routines",
   "intro": "Each organisation sets a learning routine and records its first review of ESO1 evidence.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "routine": "After each planting day: a ten-minute after-action review with the young people (what went well, what to change), written by a youth leader on one sheet. Each quarter: a two-hour review with the co-founders and youth team leaders, using the dashboard and the feedback notebook. Decisions are written on the dashboard sheet with a name and date, photographed to the Drive and checked first thing at the next review.",
      "review": "Trial plot survival 58% at 3 months; losses on the upper plot | Youth leaders said seedlings there dried out at low tide | The upper zone is wrong for this species | Plant lower and middle zones only; ask the nursery about a species for higher ground | Sari | before the April planting day\nFewer girls on boat days to the far site | Two parents worry about girls on the boat | Safety worries, not lack of interest, keep girls away | Boat-safety briefing for parents; offer the near site the same day | Wayan | March 2027"
     },
     "notice": "Notice that young people write the after-action sheet themselves. Copy the habit of letting participants help explain the data, not only supply it."
    },
    {
     "org": "ngo",
     "profile": {
      "routine": "Termly learning session (half a day) with the director, programme manager, coordinators and two mentors, using the dashboard, the feedback log and the girls' advisory group's comments. Each session ends with two or three decisions in a lessons log (owner, due date). The board sees the decisions quarterly, and the Theory of Change is reviewed each February.",
      "review": "Attendance 45% in two schools after clubs moved after 4 pm | Girls said they must be home before dark and help with chores | Timing, not interest, drives drop-off | Agree lunchtime clubs with both head teachers | Brian | mid-May 2027\nThree parent sessions cancelled by head teachers | Parents asked for weekend sessions | Schools' calendars are too full | Pilot two Saturday sessions at a community hall | coordinator for those schools | Term 2\nFour mentors paused for exams | Girls missed their mentors | Mentor supply follows the university calendar | Recruit five women from local workplaces | Brian | August 2027"
     },
     "notice": "See how each finding is paired with what girls and parents said. Copy the pairing of numbers with voices; it often explains the numbers."
    },
    {
     "org": "social",
     "profile": {
      "routine": "After each cohort: an after-action review with Lucía, Diego, the café supervisor and two graduates (paid for their time). Every two months: the advisory group looks at the dashboard and the feedback log. Decisions go into a lessons tab in the trainee spreadsheet with an owner and date, and are checked at the next advisory meeting.",
      "review": "Cohort 4: 2 of 6 left in month two | Both said travel took too long and cost too much | Travel cost and time threaten completion | Pilot a travel allowance and a later early shift for cohort 5 | Lucía | March 2027\nCohort 3: 3 of 5 in formal jobs at 3 months; one in informal work | The graduate said the employer offered no contract | Not all partners offer formal contracts | Agree formal contracts in writing with every employer partner before placements | Diego | April 2027"
     },
     "notice": "Look at the graduates paid to join the review. Copy the idea of paying people for their time when you ask them to help you learn."
    },
    {
     "org": "coop",
     "profile": {
      "routine": "Monthly committee meeting: 30 minutes on the dashboard, with causes and actions written in the minutes. Quarterly: Meera, the quality officer and the designer meet two weavers from each village to discuss quality and design. Yearly: results and lessons are shared at the AGM, and members vote on changes. The minutes are the lessons log.",
      "review": "Rejection rate 13% against 11% planned; faults in one village on the new border design | Weavers said the pattern card was unclear | The design was too complex for the looms in that village | Simplify the border and run a half-day demonstration | designer | before the next order\nPayments within 15 days at 74% | Members said late payment hurts most before festivals | Two shops pay us late and we wait for their money | Propose a small working-capital loan so members are paid on time; committee to decide | treasurer | committee meeting in July 2027"
     },
     "notice": "Notice that the fix for late payment goes to the committee to decide, not to staff. Copy the habit of sending decisions to whoever has the authority."
    },
    {
     "org": "hybrid",
     "profile": {
      "routine": "Quarterly learning session (two hours) with staff and four volunteers, using the dashboard, the feedback log and survey results. A lessons log records each decision with an owner and date. Trustees receive the decisions with the quarterly report, and the Theory of Change is reviewed each May with the annual report.",
      "review": "Tool loans 52 against 75 planned | Users found online booking confusing | Booking, not demand, is the barrier | Add phone and walk-in booking; simplify the form | volunteer coordinator | end of June 2027\nVisitors from most deprived areas 21% | Housing officers said tenants do not know about the café | Location and awareness limit reach | Monthly pop-up cafés in two housing association blocks | Priya | May 2027\nFirst survey wave: 47% repaired first | Most replies came from regulars | The result may overstate change | Paper surveys at pop-ups; report reply numbers with results | Priya | next wave"
     },
     "notice": "Notice the last row questions a good-looking result. Copy the habit of asking whether the data could be flattering you."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "reporting",
  "title": "Reporting and communicating evidence",
  "sheet": "Reporting plan",
  "learn": [
   "Different audiences need different reports. Your board needs a short dashboard and the main risks; funders need agreed formats and deadlines; participants and communities need accessible feedback in their own language; the public needs honest, simple stories backed by evidence.",
   "Report honestly. Keep outputs separate from outcomes, contribution separate from attribution, and evidence separate from hopes. Include what did not work and what you changed. You build credibility when what you claim matches what your data shows.",
   "Put reporting in your MEAL calendar and reuse the same data rather than recreating it for each audience. Module 8 shows how to turn evidence into communications, and Module 11 how to report to funders."
  ],
  "weak": "Our programme changed hundreds of lives.",
  "strong": "Riverside Repair Hub: in 2026–27 volunteers fixed 63% of the 2,010 items brought to our repair cafés. Of 64 visitors who answered our survey three months later, 30 said they had repaired or borrowed a tool before buying new. Most replies came from regular visitors, so we are now surveying at pop-up cafés too.",
  "why": "It gives real numbers, says how many people answered and is honest about the limits of the evidence.",
  "reflect": "Which claim you currently make could you not support with evidence?",
  "exercise": "Build your reporting plan by audience.",
  "fields": [
   {
    "key": "plan",
    "label": "Reporting plan",
    "hint": "Audience | what they need | format | frequency | owner."
   },
   {
    "key": "claims",
    "label": "Evidence behind our main claims",
    "hint": "Claim | evidence | limits."
   }
  ],
  "check": "Could you show the evidence behind every claim in your reports?",
  "gallery": {
   "title": "Five example reporting plans",
   "intro": "Each organisation plans reports for its main audiences and checks the evidence behind its main ESO1 claims.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "plan": "Young people and parents | what we did together and what survived | photos and a short talk at school assembly; village notice board | twice a year | youth team leaders, with Sari\nVillage heads | survival by site; any land issues | a visit with a one-page sheet and photos | twice a year | Wayan\nDive operators and small donors | what their money paid for; survival results | one-page update with photos by WhatsApp and email | twice a year | Wayan\nEnvironment grant funder (if won) | agreed report | their format | as required | Sari",
      "claims": "'Young people from two villages planted mangroves on 9 planting days' | attendance lists; planting sheets; photos | counts planting, not survival\n'58% of trial seedlings survived three months' | survival sheet, trial plot | one small plot; too early to call it a result\n'Young people are learning about their coast' | knowledge quiz at start and end | one year only; no comparison group"
     },
     "notice": "Notice that the youth team leaders report back to their own peers. Copy the habit of putting a limit next to every claim, even a small one."
    },
    {
     "org": "ngo",
     "profile": {
      "plan": "Board | dashboard, risks, decisions taken | two-page dashboard | quarterly | Achieng\nFoundation A and Foundation B | agreed indicators, spending, learning | each funder's format | as agreed, mostly every six months | Achieng with Grace\nGirls | what changed because of their feedback | 'You said, we did' poster in each club | each term | coordinators\nParents and head teachers | club results for their school | one-page sheet in English and Kiswahili; parent sessions | yearly | Brian\nCounty education office | reach and subject-choice trends | short briefing | yearly | Achieng\nPublic | annual report | website and print | yearly | Achieng",
      "claims": "'About 560 girls took part in weekly science clubs' | tablet registers | counts enrolment; 66% attended regularly\n'Most girls grew in science confidence' | pre/post survey, girls with both surveys, with the exact share | self-reported; no comparison group\n'More club leavers chose science subjects' | subject choices from head teachers | patchy school records; we contributed, among other factors"
     },
     "notice": "See how 560 girls is reported alongside the 66% who attended regularly. Copy the habit of not letting a reach number stand in for a result."
    },
    {
     "org": "social",
     "profile": {
      "plan": "Advisory group | dashboard, cash and cohort results | one-page summary | every two months | Diego\nEmployer partners | how their hires are doing; next cohort | short WhatsApp update and a call | after each cohort | Diego\nMunicipal youth programme | referrals, completion, placement | their form | after each cohort | Diego\nCustomers and neighbours | what buying bread supports | Instagram posts and a board in the café, with graduates' consent | quarterly | café supervisor\nIf BIC status is adopted | annual impact report | public report | yearly | Lucía and Diego",
      "claims": "'Most of our trainees complete a paid apprenticeship' | trainee spreadsheet: 13 of 18 in the first three cohorts | small numbers; completion fell in cohort 4\n'Five of eight graduates were in formal jobs three months later' | follow-up calls with contract seen or employer confirmation | one graduate not reached\n'Good bread, second chances' | customer feedback; cohort results | a slogan, not a measured claim; trainees' stories shared only with consent"
     },
     "notice": "Look at how the slogan is labelled as a slogan, not evidence. Copy the habit of separating brand language from claims you must be able to prove."
    },
    {
     "org": "coop",
     "profile": {
      "plan": "Members (general body) | income, payments, bonus, decisions | spoken report with pictures in Malayalam at the AGM; summary sheet | yearly | Meera and the president\nCommittee | dashboard and actions | one-page dashboard | monthly | Meera\nState cooperative department | audited accounts and required returns | their format | yearly | accounts clerk and treasurer\nRetail shops and online buyers | who made their sari; fair-price commitment | weaver names on listings, with consent; short buyer note | each collection | designer\nHandloom scheme (if applying) | income and member numbers | their form | as required | Meera",
      "claims": "'Members' average weaving income rose' | payment records: about US$30 to US$31 a month | early change; bonus reported separately\n'Members are paid within 15 days' | payment records: 74% within 15 days | not yet true for all payments; we say so\n'Authentic handloom by named weavers' | piece register; quality checks | confirm handloom mark rules locally before using the term in marketing"
     },
     "notice": "Notice the second claim is reported as not yet true. Copy the courage to publish a target you have not met, with the reason."
    },
    {
     "org": "hybrid",
     "profile": {
      "plan": "Trustees and the trading company board | combined dashboard, finances, risks | quarterly report | quarterly | Tom\nGrant funders | agreed outcomes and spending | their formats | as agreed | Tom\nCouncil waste team | items fixed, kg diverted, reach | contract report | quarterly | Priya\nVolunteers | results and what changed | forum; newsletter | every two months | volunteer coordinator\nResidents and the public | what we fixed and learned | 'You said, we did' board; newsletter; annual report | quarterly and yearly | Tom\nCharity regulator | annual report and accounts | required format | yearly | Tom and the treasurer",
      "claims": "'We fixed 1,266 items in 2026–27' | repair log: 63% of 2,010 items | 'partly fixed' and 'advice only' reported separately\n'We kept about 4 tonnes out of landfill' | weights in the repair log | weight of items fixed, not proof they were never thrown away\n'Visitors repair before buying new' | follow-up survey: 30 of 64 replies | small sample, mostly regulars; council waste figures reflect many factors"
     },
     "notice": "Notice how the landfill claim explains what the kilograms do and do not prove. Copy that wording for any environmental claim."
    }
   ]
  }
 }),
 review("meal-framework","Your MEAL Framework")
 ]
});
