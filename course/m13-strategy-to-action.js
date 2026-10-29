import {module,lesson,review} from './kit.js?v=c324e2a2c';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,2,3,6,9,10,11,12],"video":null,"id":13,"slug":"strategy-to-action","phase":"Sustain & Run","title":"Strategy to Action: Plan, Deliver & Review","short":"Annual plan, KPIs, deliverables, capacity, dependencies, Gantt, integration and the review cycle","intro":"Bring every plan from the course into one operating plan you can run. Turn multi-year objectives into this year’s priorities, KPIs, deliverables and a realistic timeline; integrate budget, risks, funding, communications and partnerships; then set the review rhythm that keeps the organisation learning and improving.","output":"Organisation Operating Plan","workbook":{"file":"Module-13-Strategy-to-Action.xlsx","title":"Strategy to Action workbook"},"promo":{"lesson":"timeline","tools":["strategy-kpis-annual-planning","gantt","meetings-actions-decisions"],"headline":"Run your year from one connected plan","pitch":"Strategy, KPIs & Annual Planning turns objectives into KPIs, targets and an annual plan with owners, dates and budget, and records quarterly review decisions. Gantt & Project Planner imports that plan as a timeline with tasks, dependencies and capacity. Meetings, Actions & Decisions keeps every review’s follow-up owned."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Design",
  "id": "annual-plan",
  "title": "From strategy to annual plan",
  "sheet": [
   "Objectives",
   "Annual plan"
  ],
  "learn": [
   "A multi-year strategy sets direction; an annual plan decides what you will actually do this year. Work down a cascade: strategic objectives (Module 1), this year’s priorities, the initiatives or projects that deliver them, then deliverables and tasks, and finally each person’s objectives (Module 4).",
   "Choose a few annual priorities for each objective, based on your Theory of Change, your funding position and your capacity. Internal objectives count too: a year in which you register, build finance systems or recruit is a year with less time for new programmes. Say what you will not do this year, and why.",
   "Separate three kinds of work. Projects are time-bound, with a defined result. Programmes are groups of related projects and ongoing services. Operations are the recurring work of running the organisation: bookkeeping, meetings, reporting. All three take people’s time, but only some appear in funding proposals, so operations are easy to forget."
  ],
  "weak": "This year we will do more of everything.",
  "strong": "Riverside Repair Hub, April 2027 to March 2028. ESO1: monthly pop-up repair cafés on two housing association estates; tool loans back on track with phone booking. ISO1: a van-hire test decides on a shop loan. Not this year: a second site, until the lease is settled.",
  "why": "It cascades from coded objectives, makes choices and names what waits, and why.",
  "reflect": "What will you deliberately not do this year?",
  "exercise": "Cascade your objectives into this year’s priorities and initiatives.",
  "fields": [
   {
    "key": "cascade",
    "label": "Annual cascade",
    "hint": "Objective code | annual priority | initiative or project | lead."
   },
   {
    "key": "notyear",
    "label": "Postponed this year",
    "hint": "What is deliberately postponed and why."
   }
  ],
  "check": "Does every annual priority trace back to a strategic objective?",
  "anatomy": {
   "title": "From strategy to tasks",
   "intro": "Each level answers a different question. The example follows one objective of Imara Girls in Science down the cascade.",
   "cols": [
    "Level",
    "Question it answers",
    "Example: Imara, ISO1"
   ],
   "rows": [
    [
     "Strategic objective (3–5 years)",
     "What must change for us to succeed?",
     "ISO1: no funder above 40% of income"
    ],
    [
     "Annual priority",
     "What must move this year?",
     "Replace Foundation A’s income before it ends in December"
    ],
    [
     "Initiative or project",
     "Which piece of work delivers it?",
     "Foundation C proposal; monthly giving test; camp sponsor bid"
    ],
    [
     "KPI",
     "How will we know the year is on track?",
     "Weighted pipeline covers the 2028 gap by September"
    ],
    [
     "Deliverable",
     "What tangible result shows it is done?",
     "Concept note sent to Foundation C by 15 January"
    ],
    [
     "Personal objective",
     "Who carries it, in their own plan?",
     "Achieng: three new funder applications by June"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example annual plans",
   "intro": "Each organisation cascaded its Module 1 objectives into this year’s priorities, named a lead for each and said what waits.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "cascade": "ESO1 | 10 planting days in lower and middle zones, village 1 first | site letter; seedling order; survival counts in May and November | Sari\nESO2 | young people speak about their coast | 2 school sessions a month; a youth talk at a village meeting in October | Wayan\nISO1 | register the association | statutes with the notary; bank account with two signatories | Wayan\nISO2 | every adult trained before planting | safeguarding and water-safety training; consent forms | Sari\nISO3 | confirm first-phase money | dive operator and village fund asks: US$3,500 in writing by March | Wayan with Ibu Made",
      "notyear": "Village 2 starts planting only when a further US$2,500 is confirmed and village 1 days run without Sari leading each one (decision on 1 July). Postponed to 2028: youth team leaders, a paid coordinator, a logo and a website. Never: tourist planting days. With two unpaid days a week each, we cannot add more."
     },
     "notice": "Notice how small the plan is: one village first, one priority per objective. Copy the way a postponement becomes a dated decision with a condition."
    },
    {
     "org": "ngo",
     "profile": {
      "cascade": "ESO1 | attendance up to 75% | lunchtime clubs in two schools; recruit 5 mentors from local workplaces | Brian\nESO1 | 120 girls at the August camp | camp with the science centre; licensed transport | Brian\nESO2 | teachers use hands-on methods | 3 teacher workshops with the county education office | Achieng\nISO1 | replace Foundation A’s income for 2028 | Foundation C proposal; engineering firm camp bid; monthly giving test | Achieng\nISO2 | every mentor cleared and trained | close two clearances; termly refresher; Brian trained as deputy safeguarding lead | Achieng\nISO3 | one results tool for 14 clubs | data consultant, 10 days, January to June | Grace",
      "notyear": "No new sub-counties, no second camp, no paid STEM kits. A half-time fundraising officer only if the board agrees to use part of the reserve. If Foundation C says no by August, the board considers the 12-school scenario for 2028."
     },
     "notice": "Notice that ISO1 gets as much attention as the clubs in the year a main funder ends. Copy how the year’s biggest risk shapes the priorities."
    },
    {
     "org": "social",
     "profile": {
      "cascade": "ESO1 | cohorts 5 and 6, five of six completing | travel allowance; earlier-shift pilot | Diego\nESO1 | every placement a formal job | formal-contract agreement with all 8 employers | Diego\nESO2 | 12-month follow-up | calls and visits for cohorts 2 to 4 | Diego\nISO1 | first US$18,000 of the reserve | price review in January; a second office client; subscription pilot | Lucía\nISO2 | training fees from 3 employers | agreement with the hotel bakery (Employer 3) | Diego\nISO3 | BIC decision | lawyer’s advice; decision with the half-year accounts in July | Lucía and Diego",
      "notyear": "Postponed: a second shop, new product lines, a second oven loan (only after a second office client has ordered for six months) and a partner nonprofit (only if a grant requires one). Trainee places stay at 12 a year: Diego’s time is the limit."
     },
     "notice": "Notice that money priorities sit with Lucía and trainee priorities with Diego. Copy the check on whose time each priority will use."
    },
    {
     "org": "coop",
     "profile": {
      "cascade": "ESO1 | 80% of payments within 15 days by June | 45-day terms in shop agreements; US$8,000 working-capital loan for the festival | treasurer with Meera\nESO1 | rejection rate down to 8% | design demonstrations in the village with most faults | quality officer\nESO2 | June and December apprentice intakes | code of conduct in use; leavers asked why | apprentice lead\nISO1 | online share up to 37% | half-time online sales assistant; Onam and January collections online | designer\nISO2 and ISO3 | dye unit only on members’ terms | grant decision; build plan if approved | Meera and president Sreeja",
      "notyear": "Postponed: our own website shop (until online reaches 40%), the export fair (we go every second year), a buyers’ club and new product types. Exhibitions cut to one. No spending on the dye unit until the grant is approved."
     },
     "notice": "Notice that the plan runs April to March, the cooperative’s financial year. Copy how a target can be a step on the way: 37% online this year, 40% later."
    },
    {
     "org": "hybrid",
     "profile": {
      "cascade": "ESO1 | reach low-income households | monthly pop-up cafés on two housing association estates from May | volunteer coordinator\nESO1 | repair cafés and tool library | 48 cafés (36 if the community fund bid fails); phone and walk-in loans; membership launch | Priya\nESO2 | 30 school workshops | new schools officer in post before the autumn term | Tom\nISO1 | shop profit to 18% of charity costs | van-hire test result; donated stock drive | shop manager\nISO2 | one quarterly report for both entities | recharge calculated every quarter from April | Tom with the treasurer\nISO3 | no repair rests on one tester | two more PAT testers signing off; January refresher | Priya",
      "notyear": "Postponed: a second site, because the lease ending in 2028 comes first. The van loan goes ahead only if the hire test shows £400 a month extra profit. Never: paid repairs that compete with local repairers. If the community fund bid fails, we run 36 repair cafés, not 48, and keep the estate pop-ups."
     },
     "notice": "Notice the fallback written in before the funding decision. Copy how one line says what changes if your biggest bid fails."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Design",
  "id": "kpis",
  "title": "Organisational KPIs and targets",
  "sheet": [
   "KPIs",
   "Results"
  ],
  "learn": [
   "Key performance indicators (KPIs) show whether the organisation is on track with its annual priorities. They differ from programme indicators (Module 6), which track results for the people you serve, and from personal objectives (Module 4). Some measures appear in more than one place; what changes is the conversation each one serves.",
   "Choose one to three KPIs per objective, each with a baseline, a yearly target and, where useful, quarterly targets. Keep a balance: delivery (outputs), results (key outcomes from your MEAL system), money (income, costs, reserves), people (retention, wellbeing) and stakeholders (satisfaction, feedback).",
   "A deliverable proves the work was done; a KPI shows whether it made the difference you intended. Keep the set short enough to review in one meeting. If a baseline does not exist yet, say so, and confirm the target once you have it."
  ],
  "weak": "Our KPI is to be successful.",
  "strong": "Pan del Barrio. ESO1: job placement at three months (baseline 63%, target 70%). ISO1: cash reserve (US$0 now, US$18,000 by December); largest client’s share of wholesale (40% now, 25% by December).",
  "why": "The KPIs are few, each tied to an objective, with a baseline and a target.",
  "reflect": "Which single number would tell you fastest that the year is going wrong?",
  "exercise": "Set your organisational KPIs and targets.",
  "fields": [
   {
    "key": "kpis",
    "label": "KPIs",
    "hint": "Objective | KPI | baseline | annual target | quarterly targets | source | owner."
   }
  ],
  "check": "Is each KPI distinct from programme indicators and personal objectives, with a baseline and target?",
  "anatomy": {
   "title": "The parts of a KPI",
   "intro": "One KPI from Vanita Weavers’ plan for April 2027 to March 2028, taken apart.",
   "cols": [
    "Part",
    "What it means",
    "Example: Vanita, ESO1"
   ],
   "rows": [
    [
     "Measure",
     "What you count, defined so two people get the same number",
     "Weaver payments made within 15 days of a piece being accepted"
    ],
    [
     "Baseline",
     "Where you start, and for which period",
     "71% (April 2025 to March 2026)"
    ],
    [
     "Target and date",
     "Where you aim to be, and by when",
     "95% by March 2028"
    ],
    [
     "Quarterly steps",
     "Smaller targets that show drift early",
     "80% June, 85% September, 90% December, 95% March"
    ],
    [
     "Source",
     "Where the number comes from",
     "Piece register and payment records"
    ],
    [
     "Owner",
     "Who reports it and acts when it drifts",
     "The treasurer, accountable for weaver payments"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example KPI sets",
   "intro": "Each organisation chose a short, balanced set it can review in one meeting, with baselines from its MEAL and finance records.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "kpis": "ESO1 | seedling survival at 12 months | trial plot 58% at 3 months | 67% by November, provisional | counts in May and November | survival sheets | Sari\nESO1 | young people at 5 or more planting days | 0 | 20, at least 8 girls | 12 by April | attendance lists | Sari\nESO2 | knowledge quiz average | November 2026 quiz | baseline + 2 points | none | quiz sheets | Wayan\nISO2 | adults trained in safeguarding | 1 of 6 | 6 of 6 before November | 4 by June | training list | Sari\nISO3 | income confirmed in writing | US$0 | US$7,500 | US$3,500 by March | cash book | Ibu Made"
     },
     "notice": "Notice the honest “provisional” on survival and a quiz with no baseline yet. Copy the habit of naming where a number will come from before you have it."
    },
    {
     "org": "ngo",
     "profile": {
      "kpis": "ESO1 | girls attending 75%+ of sessions | 64% | 75% | 68%, 72%, 75% by term | tablets | Brian\nESO1 | girls whose confidence score rises | full baseline in January | 70%, provisional | end of year only | survey | Brian\nESO2 | teachers using hands-on methods | set in Term 1 | 2 per school | after each workshop | head teachers | Achieng\nISO1 | weighted pipeline against the 2028 gap | 62% | 100% by September | 70% March, 85% June | pipeline log | Achieng\nISO2 | mentors cleared and trained | 23 of 25 | 25 of 25 | every term | contracts tracker | Brian"
     },
     "notice": "Notice the quarterly steps on the pipeline KPI, so the board sees by June if 2028 is at risk. Copy this for your riskiest objective."
    },
    {
     "org": "social",
     "profile": {
      "kpis": "ESO1 | completion rate | 72% | 80% (10 of 12) | 5 of 6 per cohort | trainee spreadsheet | Diego\nESO1 | job placement at 3 months | 63% | 70% | after each cohort | employer confirms contract | Diego\nISO1 | cash reserve | US$0 | US$18,000 | US$4,500 a quarter | bank, accountant | Lucía\nISO1 | largest client’s share of wholesale | 40% | 25% | 30% by June | sales records | salesperson\nISO2 | training fees | US$15,000 | US$22,500 from 3 employers | Employer 3 signed by March | agreements | Diego\nPeople | trainees who would recommend us | set with cohort 5 | 80% | each cohort | anonymous form | café supervisor"
     },
     "notice": "Notice the mix of trainees, cash, clients and trainee views. Copy the balance: a social result alone would hide the risk of one client leaving."
    },
    {
     "org": "coop",
     "profile": {
      "kpis": "ESO1 | payments within 15 days | 71% | 95% by March | 80%, 85%, 90%, 95% | payment records | treasurer\nESO1 | average monthly payment per member | US$30 | US$33 by March 2028 | above last year’s quarter | piece register | Meera\nESO1 | first-check rejection rate | 12% | 8% | 11%, 10%, 9%, 8% | quality register | quality officer\nESO2 | apprentices weaving after 6 months | June intake | 2 of 3 | each intake | apprentice records | apprentice lead\nISO1 | online share of sales | 32% | 37% | 33%, 34%, 36%, 37% | accounts | designer\nMoney | average days for shops to pay | 62 | 45 | 55, 50, 45, 45 | accounts | Meera"
     },
     "notice": "Notice the small quarterly steps on payments and rejections. Copy how steady steps make a stretch target something the committee can check each month."
    },
    {
     "org": "hybrid",
     "profile": {
      "kpis": "ESO1 | fix rate | 63% (2026–27) | 65% by March 2028 | 64%, 64%, 65%, 65% | repair log | Priya\nESO1 | visitors from the most deprived 20% of areas | 22% | 30% | 24% June, then 26%, 28%, 30% | postcodes, with consent | volunteer coordinator\nESO2 | pupils confident to try a repair | set from cards in the autumn term | baseline + 10 points | none | confidence cards | schools officer\nISO1 | shop profit as share of charity costs | 14% | 18% | £8,000 profit a quarter | both sets of accounts | shop manager\nMoney | largest funder’s share of charity income | 33% | 35% or less | at each grant decision | accounts | Tom"
     },
     "notice": "Notice the largest funder’s share sitting beside the programme KPIs. Copy how one money measure protects the whole plan."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Implement",
  "id": "deliverables",
  "title": "Deliverables and acceptance",
  "sheet": "Annual plan",
  "learn": [
   "A deliverable is a tangible result that someone can review: a tested service, an approved training pack, a signed partnership agreement or a published report. Start from your priorities and KPIs, and ask what must exist for them to move.",
   "Break each deliverable into manageable tasks, and include review and acceptance in those tasks rather than stopping at “draft complete”. If a deliverable supports no priority or KPI, ask whether it belongs in this year’s plan at all.",
   "Define what done means before you start, and who accepts the work. Clear acceptance criteria prevent arguments about quality and scope, and they tell the person doing the work when to stop."
  ],
  "weak": "Improve our website.",
  "strong": "Vanita Weavers: one shared stock sheet used for every shop and online sale, with no piece sold twice during a month’s test, accepted by Meera.",
  "why": "It names the scope, a test of whether it works and who accepts it.",
  "reflect": "Who needs to accept the work before it is useful?",
  "exercise": "Connect priorities to deliverables and acceptance criteria.",
  "fields": [
   {
    "key": "deliverables",
    "label": "Deliverables",
    "hint": "Priority | KPI it supports | deliverable | acceptance criteria | reviewer."
   }
  ],
  "check": "Could the reviewer clearly distinguish finished from unfinished work?",
  "gallery": {
   "title": "Five example deliverables lists",
   "intro": "Each organisation linked its priorities and KPIs to a few deliverables, and decided before starting what “done” means and who says so.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "deliverables": "ESO1 planting | survival at 12 months | site letter, village 1 | sites marked on a map; signed by the village head; read aloud at the village meeting | Wayan and Sari\nISO2 safeguarding | adults trained | water-safety page | one page in Bahasa Indonesia with the tide rule and life jackets; every adult has read it | Sari\nISO1 registration | income confirmed | association registered | registration letter received; copy in the Drive | Ibu Made\nESO1 monitoring | survival at 12 months | May survival count | six marked plots counted by two people; sheets photographed within three days | Sari\nISO3 funding | income confirmed | dive operator A agreement | conditions in writing: no guests at youth days, no photos of children | Wayan"
     },
     "notice": "Notice the acceptance criteria fit a village: read aloud, signed, photographed to the Drive. Copy criteria that suit how your people actually work."
    },
    {
     "org": "ngo",
     "profile": {
      "deliverables": "ISO1 funding | weighted pipeline | Foundation C concept note | sent by 15 January; budget checked by Grace; read by the treasurer | Achieng\nESO1 attendance | attendance 75% | lunchtime clubs in two schools | timetable agreed in writing by both head teachers; first four sessions held | Brian\nISO3 data | confidence rises | one results tool | all 14 clubs submit Term 1 data; Grace’s 10% spot-check finds no missing codes | Achieng\nESO2 teachers | hands-on teaching | teacher workshop pack | tested with six teachers; approved by the county education office | county education officer\nISO2 safeguarding | mentors cleared | mentor refresher | all 25 attend or catch up within a month; list filed | Achieng"
     },
     "notice": "Notice the results tool counts as done only when real data arrives from all 14 clubs. Copy acceptance based on use, not on installation."
    },
    {
     "org": "social",
     "profile": {
      "deliverables": "ESO1 jobs | placement at 3 months | formal-contract agreement | signed by all 8 employers; requires a written contract and health insurance | Lucía\nISO1 reserve | cash reserve | separate reserve account | opened; US$1,500 moved each month on the 15th; accountant confirms | advisory group’s accountant\nISO1 clients | largest client’s share | offer to office client 4 | tasting held; written quote with prices checked | Lucía\nESO1 completion | completion rate | travel allowance rule | amount and who qualifies in writing; explained to cohort 5 on day one | Lucía\nISO3 BIC | none (a decision) | BIC decision paper | advice, costs and reporting duties on two pages; decision signed by both shareholders | advisory group, then shareholders"
     },
     "notice": "Notice the reserve account counts as done only when money moves every month. Copy criteria that test the habit, not just the set-up."
    },
    {
     "org": "coop",
     "profile": {
      "deliverables": "ESO1 on-time pay | payments within 15 days | supply agreements with both retail chains | 45-day terms; new orders stopped at 60 days late; signed by both chains | committee\nESO1 festival | average payment | working-capital loan | US$8,000 for four months; repayment dates in the cash plan | committee\nISO1 online | online share | shared stock sheet | one sheet for shops and online; no piece sold twice in a month’s test | Meera\nISO1 online | online share | Onam collection online | 30 pieces listed by 15 July, each with the weaver’s name and consent | Meera\nESO2 apprentices | apprentices staying | June intake | three apprentices, each with a master weaver; code of conduct signed | apprentice lead"
     },
     "notice": "Notice the stock sheet must pass a one-month test before acceptance. Copy a trial period for any system that asks people to change their habits."
    },
    {
     "org": "hybrid",
     "profile": {
      "deliverables": "ESO1 low-income reach | deprived-area visitors | estate pop-up plan | dates agreed with both housing associations; data-sharing agreement signed | Tom\nISO2 reporting | none (governance) | combined quarterly report | one page per entity plus the recharge; the treasurer can trace the gift to the charity | trustees\nESO2 schools | pupils’ confidence | new schools officer in post | DBS check done; shadowed two workshops; 12 schools booked for autumn | Tom\nISO3 safety | PAT-trained repairers | two more sign-off testers | both qualified; Priya checks ten of their test records | Priya\nISO1 shop | shop profit share | van-hire test report | extra profit over 8 Saturdays set against the £400-a-month rule; go, adapt or stop | company board"
     },
     "notice": "Notice that the trustees, not Tom, accept the combined report. Copy how the reviewer is the person who must rely on the work."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Implement",
  "id": "ownership",
  "title": "Ownership and capacity",
  "sheet": "Capacity",
  "learn": [
   "Give each deliverable one accountable owner and name who contributes, using the RACI principles from Module 3. An owner needs enough authority, time and support to coordinate the work, not just their name on a list.",
   "Estimate effort separately from elapsed time. Two days of work may take two weeks if a specialist is free only one morning a week. Then add recurring operations work, such as bookkeeping, meetings and reporting, which often takes half of a small team’s time.",
   "Check workload across all your plans: programmes, fundraising, communications, partnerships, compliance and systems. If one person owns everything, change the timing, reduce the scope or add capacity before you treat the plan as credible. Ask owners whether the work fits; do not assume it."
  ],
  "weak": "The team will finish it soon.",
  "strong": "Pan del Barrio: Diego owns the employer agreements (about six days across February and March); Lucía and the advisory group’s accountant contribute; weekly check-ins for cohort 5 move to the café supervisor to free Diego’s time.",
  "why": "It separates who is accountable, who helps, how long it takes and what moves to make room.",
  "reflect": "Where is your plan relying on invisible overtime?",
  "exercise": "Set ownership and a realistic capacity check.",
  "fields": [
   {
    "key": "ownership",
    "label": "Responsibility and capacity",
    "hint": "Deliverable | owner | contributors | effort | available capacity | constraint."
   }
  ],
  "check": "Have owners agreed that the work fits their available time?",
  "gallery": {
   "title": "Five example capacity checks",
   "intro": "Each organisation named owners, estimated the effort and compared it with the time people actually have.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "ownership": "Site letter, village 1 | Wayan | Ibu Made, village head | 3 days | Wayan: 8 days a month, half on routine | village head’s diary\nRegistration | Wayan | Ibu Made, notary | 6 days | as above | notary’s timetable\nSafeguarding and water-safety training | Sari | Wayan, volunteers | 5 days | Sari: 8 days a month, full November to March | trainer’s dates\n10 planting days, two survival counts | Sari | volunteers | 30 days | as above | tides, storms\nFunding asks | Wayan (takes over from Sari) | Ibu Made | under 4 hours a week | as above | one sponsor meeting a quarter\nTotal, with school sessions | both | | about 82 days | about 90 of 180 days | village 2 only if volunteers lead set-up"
     },
     "notice": "Notice the capacity column uses real days: two unpaid days a week each, half already on routine. Copy the arithmetic before you promise more."
    },
    {
     "org": "ngo",
     "profile": {
      "ownership": "Foundation C proposal | Achieng | Grace (budget), Brian (results) | 8 days | Achieng: about 4 days a month after operations | due 15 January, as clubs restart\nLunchtime clubs, two schools | Brian | two coordinators | 4 days | Brian: none spare until the new coordinator starts in January | head teachers’ timetables\nResults tool | Grace (moved from Brian) | data consultant, Brian | 10 consultant days, 5 days of Grace’s time | Grace: 3 days a month | consultant booked January to June\nRecruit 5 mentors | Brian | universities, a women engineers’ association | 6 days | Brian, from February | camp in August\nTeacher workshops | Achieng | county education office, coordinators | 9 days | Achieng, from March | county officer’s dates"
     },
     "notice": "Notice the results tool moved from Brian to Grace once his load was counted. Copy how the check changes owners, not only dates."
    },
    {
     "org": "social",
     "profile": {
      "ownership": "Employer agreements (8) | Diego | Lucía, advisory group’s accountant | 6 days | Diego: about 3 days a month free | employers’ availability\nCohort 5 weekly check-ins | café supervisor | Diego supervises | 2 hours a week | 3 hours a week freed by a shift change | still training as back-up mentor\nOffice client 4 tasting and quote | Lucía | salesperson | 2 days | Lucía: afternoons only; mornings are production | oven capacity\nReserve account and monthly transfer | Lucía | accountant | half a day, then 15 minutes a month | fits | cash after wages and flour\nBIC decision paper | Lucía | Diego, a lawyer | 4 days | fits from May, after cohort 5 settles | lawyer’s fees"
     },
     "notice": "Notice that routine check-ins move to the café supervisor to free Diego. Copy how delegating routine work makes space for work only one person can do."
    },
    {
     "org": "coop",
     "profile": {
      "ownership": "Shop supply agreements | Meera | treasurer, committee | 5 days | Meera: about 3 days a month; none July to September | chains’ buying calendar\nWorking-capital loan | treasurer | Meera, accounts clerk | 4 days | treasurer: volunteer, 2 days a month | committee approval by June\nShared stock sheet | Meera | designer, accounts clerk | 3 days | fits in April | none\nOnam collection online | designer | online sales assistant, photographer | 12 days | designer: full in June and July | assistant must be recruited first\nJune apprentice intake | apprentice lead | master weavers | 4 days | committee member, volunteer | looms busy before Onam"
     },
     "notice": "Notice that Meera has no free time from July to September. Copy how a fixed busy season pushes other work earlier in the year."
    },
    {
     "org": "hybrid",
     "profile": {
      "ownership": "Estate pop-up cafés | volunteer coordinator | Priya, housing associations | 2 days per pop-up | coordinator (0.8): about 3 days a month | electrical repairers for evenings\nSchools officer recruitment | Tom | trustee who is a schools governor | 6 days | Tom: about 4 days a month | DBS check before the autumn term\nCombined quarterly report | Tom | treasurer, bookkeeper | 2 days a quarter | fits | recharge figures by day 12\nTwo more PAT testers | Priya | two volunteers | 5 days | Priya: 2 days a month; 20% of her time goes to the shop | course dates\nTool library membership launch | Priya | volunteer coordinator | 6 days | none until the testers sign off | moved to October"
     },
     "notice": "Notice the membership launch moved to October because Priya was already full. Copy re-phasing instead of hoping."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "gantt"
  ],
  "video": null,
  "stage": "Implement",
  "id": "dependencies",
  "title": "Milestones and dependencies",
  "sheet": "Tasks",
  "learn": [
   "A milestone marks a significant decision or completed result. A dependency means one task needs something from another before it can go ahead.",
   "Map real dependencies rather than linking everything. Approving a curriculum may need to come before printing; researching venues can happen at the same time. Watch the links between areas: a grant cannot start before the agreement is signed, and recruitment cannot start before the budget is approved.",
   "Record external dependencies and how uncertain they are, and leave room for review and revisions. When a prerequisite is late, discuss the dates that depend on it straight away, rather than hoping the gap closes."
  ],
  "weak": "All tasks start Monday.",
  "strong": "Riverside Repair Hub: the new schools officer must be in post, with a DBS check, before autumn workshops are booked; pop-up dates are agreed with the housing associations at the same time; if the check is not back by October, Priya runs four workshops.",
  "why": "It separates what must wait from what can run alongside, and plans for the slip.",
  "reflect": "Which delay would affect the largest part of your plan?",
  "exercise": "List your key milestones and dependencies.",
  "fields": [
   {
    "key": "dependencies",
    "label": "Dependency map",
    "hint": "Task | prerequisite | reason | external dependency | contingency."
   },
   {
    "key": "milestones",
    "label": "Milestones",
    "hint": "Result or decision | target date | acceptance owner."
   }
  ],
  "check": "Are dependencies based on actual constraints?",
  "gallery": {
   "title": "Five example dependency maps and milestones",
   "intro": "Each organisation listed the dependencies that could hold up its year, what it would do if one slipped, and the milestones that mark progress.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "dependencies": "New planting sites | site letter signed | land use needs the village head’s agreement | village head | plant only at agreed sites\nAny activity with young people | adults trained; consent forms in | safety comes first | trainer’s dates | postpone the day; never run it short\nEnvironment grant | association registered | an unregistered group may not sign | notary; registration office | ask a registered partner to hold it (to confirm)\nBank account | registration | the bank needs the entity’s papers | bank | cash box and cash book continue\nFar-site planting days | boat booked in October | one fisher owns the boat | fisher’s season | second family asked; plant the near site",
      "milestones": "Village 1 site letter signed | January 2027 | Wayan\nUS$3,500 confirmed in writing | 31 March 2027 | Ibu Made\nAll adults trained | June 2027 | Sari\nVillage 2 decision | 1 July 2027 | Wayan and Sari\nAssociation registered | September 2027 | Wayan\nSeason plan and boat agreed | October 2027 | Sari"
     },
     "notice": "Notice that every contingency keeps young people safe: postpone, never run short. Copy contingencies that protect your non-negotiables."
    },
    {
     "org": "ngo",
     "profile": {
      "dependencies": "Fundraising officer recruitment | board agrees to use the reserve | use of the reserve is reserved to the board | board meeting | Achieng and the chair share the work meanwhile\nFoundation C full proposal | concept note accepted | the funder invites full proposals | Foundation C | apply to the engineering firm and Foundation D meanwhile\nTeacher workshops | county education office approval | teachers’ time needs approval | county officer | one pilot workshop in a partner school\nAugust camp | sponsor confirmed; licensed transport; consent forms | the camp costs US$14,000 | engineering firm’s decision | a smaller camp for 80 girls at the science centre\nResults tool in use | consultant’s design accepted | coordinators need one form | consultant | current tablet forms for Term 1",
      "milestones": "Foundation C concept note sent | 15 January 2027 | Achieng\nTerm 1 attendance reviewed | April 2027 | Brian\nResults tool accepted | June 2027 | Achieng\nCamp held for 120 girls | August 2027 | Brian\n2028 budget with no funder above 40% approved | November 2027 | board chair Dr Otieno"
     },
     "notice": "Notice the smaller camp ready if the sponsor says no. Copy a scaled-down version for any activity that hangs on one decision."
    },
    {
     "org": "social",
     "profile": {
      "dependencies": "Job matching for cohort 5 | formal-contract agreements signed | no placement counts without a written contract | 8 employers | place graduates only with employers who have signed\nSecond oven loan | office client 4 ordering for six months | the loan is repaid from new wholesale margin | office client | keep baking in two shifts\nMunicipal grant application | confirm a company can apply | the call may require a nonprofit | municipality’s call | skip this round; no new entity for one grant\nBIC decision | half-year accounts; lawyer’s advice | costs must be known first | accountant, lawyer | decide in December instead\nMonthly reserve transfer | cash after wages and flour | wages come first | flour prices | a smaller transfer, never a late wage",
      "milestones": "Price review done | January 2027 | Lucía\nAll 8 employer agreements signed | April 2027 | Diego\nLargest client below 30% of wholesale | June 2027 | Lucía\nBIC decision | July 2027 | Lucía and Diego as shareholders\nUS$18,000 in the reserve | December 2027 | Lucía, with the accountant"
     },
     "notice": "Notice the rule not to create a new entity for one grant. Copy how a contingency can be a clear “no” as well as a plan B."
    },
    {
     "org": "coop",
     "profile": {
      "dependencies": "Festival yarn purchase | working-capital loan approved | yarn must be bought before July | lender | buy yarn only for confirmed orders\nOnam collection online | online sales assistant recruited | the designer cannot list 30 pieces alone in July | applicants | list 15 pieces; the rest after Onam\nDye unit build | grant approved on members’ terms | members must keep control | handloom scheme | no building; keep buying dyed yarn\nJune apprentice intake | master weavers agree | apprentices train on their looms | master weavers’ festival orders | move one place to December\nWeaver payments within 15 days | shops pay within 45 days | weavers are paid from shop income | two retail chains | the loan covers the gap in the festival season",
      "milestones": "Supply agreements signed with 45-day terms | May 2027 | committee\nOnline sales assistant in post | June 2027 | Meera\n80% of payments within 15 days | June 2027 | treasurer\nAnnual general meeting: accounts and bonus | September 2027 | president Sreeja\nDye grant decision taken to members | when announced | committee"
     },
     "notice": "Notice that paying weavers on time depends on shops paying on time. Copy how tracing a dependency back can reveal a risk to your core promise."
    },
    {
     "org": "hybrid",
     "profile": {
      "dependencies": "Autumn school workshops | schools officer in post with a DBS check | no schools work without it | applicants; DBS service | Priya runs four workshops in October\nEstate pop-ups with postcode data | data-sharing agreement signed | postcodes shared only under it | housing associations | run pop-ups without postcode data\n48 repair cafés | community fund decision | the grant pays staff time at cafés | community fund | 36 cafés; estate pop-ups kept\nVan loan for the shop | test shows £400 a month extra profit | the loan is repaid from that profit | lender | hire a van on busy Saturdays only\nEverything at our site | landlord’s answer on the 2028 lease | the plan assumes this site | landlord | two other sites viewed",
      "milestones": "Community fund decision | May 2027 | Tom\nFirst estate pop-up held | May 2027 | volunteer coordinator\nSchools officer appointed | June 2027 | Tom\nCombined quarterly reports start | July 2027 | treasurer\nLease decision | December 2027 | trustees, chair Helen"
     },
     "notice": "Notice that the lease sits under everything else. Copy how one external decision can earn a milestone of its own."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "gantt"
  ],
  "video": null,
  "stage": "Implement",
  "id": "timeline",
  "title": "Build your work plan and Gantt",
  "sheet": "Tasks",
  "learn": [
   "A Gantt chart places tasks along a calendar. It shows overlap and sequence at a glance, but a neat chart does not prove the plan is achievable.",
   "Use the planner below for your first schedule. Give each task an owner, a start date and a finish date. Then check overlaps against people’s capacity and check the dates against your dependency map. The planner does not reschedule dependent tasks for you.",
   "Update the plan when conditions change, and keep a short note of each significant change, so the team understands the new commitment. Decide in advance what triggers a review: a missed milestone, a funding decision, a key person leaving."
  ],
  "weak": "Move dates until the bars fit.",
  "strong": "Vanita Weavers: the Onam photos slipped two weeks when the photographer fell ill. Meera moved the online listing date, kept the festival launch, told both retail chains their delivery dates were unchanged and recorded the change in the committee minutes.",
  "why": "The schedule changed through a recorded decision, and the people affected were told.",
  "reflect": "What event should trigger a review of the schedule?",
  "exercise": "Add at least one task, then inspect the timeline and check its dependencies.",
  "fields": [
   {
    "key": "scheduleReview",
    "label": "Schedule review rule",
    "hint": "When will you review progress, blockers and changes?"
   }
  ],
  "check": "Are the dates valid and consistent with your dependencies and capacity?",
  "gallery": {
   "title": "Five example schedule review rules",
   "intro": "Each organisation decided when it looks at its schedule, what triggers an extra review and how changes are recorded.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "scheduleReview": "First Sunday call of each month: Wayan and Sari check the next six weeks against tides, the school calendar and the cash book. Extra review if a planting day is cancelled, money is not confirmed by its date or a village head changes. Changes go on the Drive “Open issues and actions” page and are told to volunteers in the WhatsApp group."
     },
     "notice": "Notice the review follows tides, school terms and cash, the real limits on this calendar. Copy triggers that match what most often disrupts you."
    },
    {
     "org": "ngo",
     "profile": {
      "scheduleReview": "Brian updates the Gantt before each monthly all-staff meeting. A milestone moving more than two weeks goes to Achieng. Extra review when a school changes club time, a funder decision arrives or a post falls empty. Each change goes in the decision log with a reason; the board sees the list of changes each quarter."
     },
     "notice": "Notice the two-week threshold: small slips stay with Brian, larger ones go to the director. Copy a clear threshold for escalating schedule changes."
    },
    {
     "org": "social",
     "profile": {
      "scheduleReview": "Lucía and Diego review the schedule at the monthly directors’ meeting on the 15th, with the cash forecast open. Extra review when a cohort loses two trainees, a client changes orders by more than 20% or flour prices jump. Changes go in the decision log tab, and the weekly staff meeting hears what moved and why."
     },
     "notice": "Notice the cash forecast open during the schedule review. Copy how a small business checks dates and money together."
    },
    {
     "org": "coop",
     "profile": {
      "scheduleReview": "Meera reviews the schedule with the monthly dashboard before each committee meeting. From June to September, a short weekly check of festival dates with the designer and the accounts clerk. Extra review after monsoon damage, a shop payment over 45 days late or the dye grant decision. Changes are minuted in Malayalam and shared in the village WhatsApp groups."
     },
     "notice": "Notice the review speeds up to weekly in the festival season. Copy a frequency that changes with your busiest months."
    },
    {
     "org": "hybrid",
     "profile": {
      "scheduleReview": "The Monday team meeting checks the next four weeks; Tom updates the Gantt monthly before the management accounts review. Extra review for the community fund decision, the landlord’s reply or losing a PAT tester. Any milestone moving more than a month goes in the decision log and the quarterly report to trustees and the company board."
     },
     "notice": "Notice that schedule changes reach both boards. Copy how an organisation with two entities keeps each governing body informed."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Manage",
  "id": "integration",
  "title": "One plan: budget, risks, funding, communications and partnerships",
  "sheet": "Integration check",
  "learn": [
   "Many organisations have a strategy, a budget, a fundraising plan, a communications plan and a risk register that do not match. This lesson brings them into one operating plan.",
   "Check each link in the table below. An initiative with no budget line, a top risk with no action, a campaign that serves no priority or a partner commitment with no owner is a gap you have found before it costs you.",
   "Where a link fails, adjust: reduce scope, move work later in the year, find resources or accept a risk openly. An integrated plan is smaller and more credible than the sum of separate wish lists."
  ],
  "weak": "Each team has its own plan.",
  "strong": "Pan del Barrio: the check found the trainee travel allowance uncosted and a café sales campaign that served no priority. Trimming the subscription pilot paid for the allowance; the campaign was refocused on recruiting employer partners.",
  "why": "It uses the check to make the plan coherent and realistic, not just to tick boxes.",
  "reflect": "Which of your plans contradicts another?",
  "exercise": "Run an integration check across your plans.",
  "fields": [
   {
    "key": "check",
    "label": "Integration check",
    "hint": "Link (budget, funding, risk, communications, partnerships, MEAL, people) | consistent? | gap | adjustment."
   }
  ],
  "check": "Is every initiative costed, resourced and connected to your risks and plans?",
  "anatomy": {
   "title": "Six links to check",
   "intro": "Each link connects your annual plan to work you did in an earlier module.",
   "cols": [
    "Link",
    "Question to ask",
    "Where you built it"
   ],
   "rows": [
    [
     "Budget",
     "Is every initiative costed, and does the total match the budget?",
     "Module 9"
    ],
    [
     "Funding",
     "Does the pipeline cover the gap, with fundraising tasks in the plan?",
     "Module 11"
    ],
    [
     "Risk",
     "Does each top risk have an action with an owner and a date?",
     "Module 10"
    ],
    [
     "Communications",
     "Does each campaign support one of this year’s priorities?",
     "Module 8"
    ],
    [
     "Partnerships",
     "Are joint commitments in the plan, with owners?",
     "Module 12"
    ],
    [
     "MEAL and people",
     "Are data collection, reviews, hiring and training scheduled and resourced?",
     "Modules 6 and 4"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example integration checks",
   "intro": "Each organisation tested its plan against its budget, funding, risks, communications, partnerships, MEAL and people plans, and changed the plan where they did not match.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "check": "Budget | partly | village 2 costs and training both included; total US$7,500 | none\nFunding | no | US$3,200 weighted pipeline against US$7,500 | first phase in village 1 only (US$3,500)\nRisk | yes | water safety and safeguarding actions in the plan | none\nCommunications | partly | Instagram posts not linked to ESO2 | young people post one “what we learned” story after each school session\nPartnerships | partly | dive operator conditions missing | added to the agreement deliverable\nMEAL | yes | survival counts and quiz scheduled | none\nPeople | no | Sari owns too much | Wayan takes over dive operator contact"
     },
     "notice": "Notice how the funding gap shrank the plan to one village. Copy how a failed link changes the scope instead of being ignored."
    },
    {
     "org": "ngo",
     "profile": {
      "check": "Budget | partly | fundraising officer not budgeted | US$6,000 from the reserve, only if the board agrees\nFunding | no | weighted pipeline 62% of the 2028 gap | two more prospects by January; 12-school scenario ready\nRisk | yes | Foundation A gap, tablets and club time all have actions | none\nCommunications | no | annual report written for parents, not new funders | two-page funder version by March\nPartnerships | partly | county workshops have no dates | dates agreed at the termly meeting\nMEAL | yes | full baseline in January; mid-year review costed (US$2,000) | none\nPeople | no | Brian owns nine deliverables | results tool moves to Grace and the consultant"
     },
     "notice": "Notice the communications gap: a report written for parents will not win new funders. Copy the check on who each campaign is for."
    },
    {
     "org": "social",
     "profile": {
      "check": "Budget | no | travel allowance uncosted (about US$1,200) | paid by trimming the subscription pilot\nFunding | partly | margin plan covers about 63% of the US$20,000 need | price review in January\nRisk | yes | largest client and flour price actions in the plan | none\nCommunications | no | café sales campaign served no priority | refocused on recruiting employer partners\nPartnerships | partly | hotel kitchen trial had no review date | review after three months (Diego)\nMEAL | yes | 3- and 12-month follow-ups scheduled | none\nPeople | no | Diego holds eight deliverables | cohort 5 check-ins move to the café supervisor"
     },
     "notice": "Notice that both failed money links were fixed with money and time already in the plan. Copy adjustments that need no new resources."
    },
    {
     "org": "coop",
     "profile": {
      "check": "Budget | partly | online assistant (about US$1,200) costed; dye unit not | dye unit stays out until the grant is decided\nFunding | partly | festival target short by about US$6,000 | one more shop and a second online collection\nRisk | partly | roof leak over the yarn store not in the plan | repair before May added\nCommunications | partly | nothing aimed at young people (ESO2) | two apprentice stories a year, with consent\nPartnerships | partly | design school collection not scheduled | brief in April; samples paid at full piece rate\nMEAL | yes | monthly dashboard; member survey in February | none\nPeople | no | Meera has no time July to September | stock sheet and shop agreements finished by May"
     },
     "notice": "Notice the dye unit kept out of the budget until the grant is decided. Copy how an uncertain project stays separate from the committed plan."
    },
    {
     "org": "hybrid",
     "profile": {
      "check": "Budget | no | estate pop-ups uncosted (about £4,000) | covered by £2,000 from each housing association\nFunding | no | weighted pipeline 69% of the £60,000 gap | 36-café fallback agreed; one more trust bid\nRisk | partly | lease had no action after December | lease decision milestone added\nCommunications | partly | shop customers do not know profits fund the charity | message on tills and receipts\nPartnerships | yes | council data dates and pop-up dates in the plan | none\nMEAL | partly | external evaluation unfunded (£6,000) | starts only if funded; repair-first survey continues\nPeople | partly | new schools officer starts in July; DBS check may not be back by autumn | Priya covers four October workshops if it is late"
     },
     "notice": "Notice the 36-café fallback agreed before the funding decision. Copy how an integration check can settle plan B in advance."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "meetings-actions-decisions",
   "strategy-kpis-annual-planning"
  ],
  "video": null,
  "stage": "Manage",
  "id": "reviews",
  "title": "The performance review rhythm",
  "sheet": "Review rhythm",
  "learn": [
   "Plans only work if you review them. Build a rhythm: a weekly team check on priorities and blockers; a monthly review of finance, KPIs, pipeline and risks; a quarterly review of progress against the annual plan, with decisions to adjust; and a quarterly review by your governing body.",
   "Use a simple one-page dashboard: KPIs with a status, budget versus actual, cash and runway, top risks, the pipeline and key MEAL findings. Each review ends with recorded decisions and actions, each with an owner and a date, followed up at the next review.",
   "Adaptive management means using reviews to change course openly: re-prioritising, re-phasing, stopping what does not work and scaling what does. Record the reason for each significant change, so the board and the team can follow it."
  ],
  "weak": "We review the plan at the end of the year.",
  "strong": "Riverside Repair Hub: a Monday team check; a monthly review of management accounts and the dashboard by Tom and the leads; a quarterly review with all staff; trustees and the company board receive the dashboard and the list of changes each quarter, with decisions logged by the volunteer coordinator.",
  "why": "The rhythm is regular, uses evidence and ends in decisions.",
  "reflect": "When did a review last change what you were doing?",
  "exercise": "Design your review rhythm and dashboard.",
  "fields": [
   {
    "key": "rhythm",
    "label": "Review rhythm",
    "hint": "Review | frequency | participants | inputs | outputs."
   },
   {
    "key": "dashboard",
    "label": "Dashboard contents",
    "hint": "Measures and information on your one-page dashboard."
   }
  ],
  "check": "Does each review end with recorded decisions that are followed up?",
  "anatomy": {
   "title": "The review rhythm",
   "intro": "Each review answers a different question. Adjust the frequency to your size; some committees meet monthly.",
   "cols": [
    "Review",
    "Question it answers",
    "Typical decisions"
   ],
   "rows": [
    [
     "Weekly team check",
     "What is blocked this week?",
     "Who unblocks it; what moves to next week"
    ],
    [
     "Monthly review",
     "Are money, KPIs, pipeline and risks on track?",
     "Spending holds, follow-ups, risk actions"
    ],
    [
     "Quarterly review",
     "Is the annual plan still right?",
     "Re-phase, re-prioritise, stop or scale"
    ],
    [
     "Governing body, quarterly",
     "Is the organisation on course and well run?",
     "Approve changes to budget or priorities; use of reserves"
    ],
    [
     "Annual review",
     "Is the strategy still right, and are we fit to deliver it?",
     "Revised objectives and next year’s plan (lesson 13.9)"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example review rhythms",
   "intro": "Each organisation set a rhythm that fits its size and governance, and a one-page dashboard to bring to every review.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "rhythm": "Weekly check | Sunday evening, 20 minutes | Wayan, Sari | WhatsApp, open issues page | actions with owners on the Drive\nPlanting day debrief | after each day | adults and young people | talking circle; attendance | one change for next time\nCash check | monthly, first weekend | Ibu Made, Sari | cash book, receipts | agreed balance; spending against budget\nQuarterly review | January, April, July, October | co-founders, Ibu Made, two young people | one-page dashboard | decisions and plan changes\nBoard | quarterly, from registration | board of three | dashboard, cash book | approvals",
      "dashboard": "One paper page, typed by Wayan each quarter: planting days held against plan; young people per day (girls and boys); survival at the latest count; adults trained; income confirmed against US$7,500; cash in the box and the bank; open safeguarding or water-safety issues (a number only); one thing young people told us."
     },
     "notice": "Notice the rhythm fits two unpaid co-founders: 20 minutes a week and a quarterly review. Copy a rhythm small enough to keep."
    },
    {
     "org": "ngo",
     "profile": {
      "rhythm": "Coordinators’ huddle | weekly, 30 minutes | Brian, 3 coordinators | club issues | actions in the issues sheet\nAll-staff meeting | monthly, first Monday | all staff | dashboard, budget versus actual, pipeline | decisions logged by Brian\nFinance and safeguarding committee | quarterly, before the board | treasurer, lawyer, head teacher | accounts, safeguarding summary, risks | recommendations\nBoard | February, May, August, November | 7 trustees, Achieng | dashboard, list of changes | approvals and plan changes\nProgramme review | September | programme team, girls’ advisory group | MEAL data | changes for next year",
      "dashboard": "KPIs with status (attendance, confidence, teachers, pipeline, mentors cleared); budget versus actual by grant; cash and months of runway; weighted pipeline against the 2028 gap; top five risks with score changes; safeguarding concerns (number and response time, no personal details); one finding from the girls’ advisory group."
     },
     "notice": "Notice that the board sees safeguarding numbers but no personal details. Copy how a dashboard can show patterns while protecting girls’ privacy."
    },
    {
     "org": "social",
     "profile": {
      "rhythm": "Morning line-up | daily, 10 minutes | everyone on shift | orders, staff on shift | who does what today\nStaff meeting | weekly | all staff, trainees speak first | issues list | actions\nDirectors’ meeting | monthly, the 15th | Lucía, Diego | accounts, cash, KPIs, cohort | decisions in the log tab\nAdvisory group | every two months | three advisers, both directors | dashboard | advice noted; changes proposed\nHalf-year review | July | directors, advisory group | half-year accounts | BIC decision; plan changes",
      "dashboard": "Sales against target for café and wholesale; largest client’s share; gross margin and flour cost; cash, reserve balance and days of cash; current cohort’s attendance and completion; placement at 3 months and retention at 12 months; training fees invoiced and paid; top three risks; one point of trainee feedback."
     },
     "notice": "Notice the daily line-up: a bakery changes faster than an office. Copy reviews timed to how quickly your work changes."
    },
    {
     "org": "coop",
     "profile": {
      "rhythm": "Staff check | weekly | Meera and staff | orders, quality register | actions\nCommittee | monthly | 9 committee members, Meera | dashboard in Malayalam; accounts before the yarn decision | decisions minuted\nPurchase subcommittee | as needed | treasurer, two committee members | yarn quotes | approvals from US$2,000 to 5,000\nQuarterly review | June, September, December, March | committee and staff | KPIs against plan | re-phasing\nAnnual general meeting | September | all members | audited accounts, the year’s results | bonus; approval of the plan",
      "dashboard": "Average monthly payment per active member; payments within 15 days; rejection rate by village; sales by channel and online share; cash and working capital against next month’s yarn need; days shops take to pay; apprentices in training; dye grant status; member complaints received and closed."
     },
     "notice": "Notice that the members review the year and approve the plan. Copy how a member-owned organisation puts its members in the review rhythm."
    },
    {
     "org": "hybrid",
     "profile": {
      "rhythm": "Team meeting | weekly, Monday, 30 minutes | Tom and four leads | issues log | actions\nCafé debrief | after each repair café | Priya, volunteers | repair log | fixes for next time\nManagement review | monthly | Tom, Priya, shop manager | accounts for both entities, dashboard | decisions logged\nQuarterly review | quarterly | all staff | plan against KPIs | re-phasing\nTrustees and company board | quarterly | 6 trustees; company board of three | combined report, dashboard, changes | approvals",
      "dashboard": "KPIs with status (fix rate, deprived-area visitors, tool loans, school workshops, shop profit share); budget versus actual for charity and company; recharge invoiced; cash and runway for each entity; community fund and pipeline status; top risks (lease, electrical safety, funding); PAT-trained repairers available; one “you said, we did” item."
     },
     "notice": "Notice the dashboard shows both entities side by side. Copy one dashboard for the whole organisation, with each part visible."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "strategic-objectives"
  ],
  "video": null,
  "stage": "Review",
  "id": "refresh",
  "title": "Annual review, strategy refresh and health check",
  "sheet": [
   "Health check",
   "Reviews"
  ],
  "learn": [
   "Once a year, step back. Review results against objectives, your context, your Theory of Change, your evidence and feedback, your finances and risks, and your people. Ask two questions: is our strategy still right, and is our organisation fit to deliver it?",
   "Repeat the health check from Module 0 with the same areas, the same scale and, if you can, the same people. Compare each rating with your baseline and give evidence for any change. Celebrate what improved, and be honest about what is written down but not yet practised.",
   "Feed what you learn back into your objectives (Module 1), your Theory of Change (Module 2) and next year’s plan. This loop of strategy, plan, deliver, review and refresh is what keeps a purpose-led organisation steady when things change."
  ],
  "weak": "We will write a new strategy when this one ends.",
  "strong": "Pan del Barrio, January 2028: results against objectives, a context update and the health check re-run (MEAL and finance now practised; governance still only documented). The reserve target date moved back openly; next year’s plan prioritises the BIC bylaw changes.",
  "why": "The review compares with a baseline and changes the next plan.",
  "reflect": "What has changed in your organisation since you started this course?",
  "exercise": "Re-run the health check and decide what changes for next year.",
  "fields": [
   {
    "key": "health",
    "label": "Health check repeated",
    "hint": "Area | baseline rating | current rating | evidence."
   },
   {
    "key": "changes",
    "label": "Strategy and plan changes",
    "hint": "What you will change in your objectives, Theory of Change and next annual plan."
   }
  ],
  "check": "Does your annual review lead to specific changes in strategy and plans?",
  "gallery": {
   "title": "Five example annual reviews",
   "intro": "At its first annual review, a year after the baseline, each organisation repeated the Module 0 health check and decided what changes next.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "health": "Strategy | informal | practised | one-page 2027 plan reviewed each quarter; village 2 start moved by a recorded decision\nTheory of change | not started | documented | written for ESO1; only the planting-zone assumption tested\nGovernance | not started | documented | association registered in October, a month late; the board has met once\nPeople | informal | practised | six adults trained in safeguarding and water safety; volunteer agreements signed\nFinance | not started | practised | budget; cash counted monthly by two people; bank account with two signatories\nLegal and compliance | not started | practised | consent for every young person; two adults at all 9 planting days\nPartnerships | informal | documented | site letters with both village heads; one of two dive operators paid",
      "changes": "Objectives: ESO1 survival target lowered openly from two-thirds to 60% in a new site’s first year (6-month survival in the marked plots was 59%; 72% in the lower zone; the 12-month count comes in May). Theory of Change: add the assumption that storms spare lower-zone sites. 2028 plan: youth team leaders start; the association signs site agreements; no third village; one priority is a second sponsor."
     },
     "notice": "Notice that every rating rose, but most only to “documented” or “practised”. Copy the honesty about what is new and not yet tested."
    },
    {
     "org": "ngo",
     "profile": {
      "health": "Strategy | documented | practised | annual plan reviewed by the board each quarter; three changes recorded\nTheory of change | documented | practised | used in the September review; lunchtime clubs tested as a new assumption\nGovernance | practised | reviewed | board self-review in August; seeking a trustee with fundraising experience\nPeople | documented | practised | all 25 mentors cleared and trained; Brian trained as deputy safeguarding lead\nMEAL | informal | practised | one results tool in 14 clubs; attendance 72% against a 75% target\nFinance | practised | practised | unchanged; the reserve is still US$10,000\nResources | informal | documented | fundraising plan; Foundation C awarded US$34,000; 22 monthly donors against 30\nPartnerships | practised | practised | 14 school agreements; county office co-ran 3 teacher workshops",
      "changes": "Objectives: ISO1 is met for 2028 (largest funder 28%), but income falls to US$126,000, so it becomes “no funder above 40% and income back to US$140,000 by 2029”. Theory of Change: keep testing whether lunchtime clubs hold attendance. 2028 plan: budget of US$126,000; two clubs led by trained teachers as an ESO2 pilot; the fundraising officer stays; monthly giving continues with changes."
     },
     "notice": "Notice that ISO1 was met while total income fell. Copy the habit of asking whether a target was met for the right reason."
    },
    {
     "org": "social",
     "profile": {
      "health": "Strategy | informal | practised | 2027 plan reviewed at every monthly directors’ meeting\nGovernance | informal | documented | BIC decision taken in July (apply in 2028); the two founders still decide alone\nPeople | practised | practised | café supervisor runs half the weekly check-ins; Diego is no longer the only mentor\nMEAL | informal | practised | completion 10 of 12; placement 7 of 10; every follow-up recorded\nFinance | documented | practised | monthly cash-flow forecast; reserve US$11,000 against US$18,000\nResources | informal | documented | training fees US$22,500 from 3 employers; the municipal grant was closed to companies\nPartnerships | practised | reviewed | all 8 employers signed the formal-contract agreement; yearly health check held",
      "changes": "Objectives: the three-month reserve (US$53,000) now planned for 2030, adding about US$14,000 a year. ISO2 drops the municipal grant route; no partner nonprofit for now. Theory of Change: travel cost added as an assumption for completion. 2028 plan: BIC bylaw changes with the lawyer; office client 4 started late, in September, so the oven loan decision moves to March."
     },
     "notice": "Notice the reserve target was missed and its date moved openly. Copy how a missed target becomes a revised, realistic one rather than a quiet failure."
    },
    {
     "org": "coop",
     "profile": {
      "health": "Governance | reviewed | reviewed | September elections put two members under 35 on the committee; members set the dye grant conditions\nSystems | practised | practised | shared stock sheet: no piece sold twice since May\nFinance | practised | reviewed | festival loan repaid in December; monthly accounts now arrive before the yarn decision\nBrand | not started | practised | Vanita Handloom guide in use; weaver tags on every piece, with consent\nCommunications | informal | documented | content calendar; weekly posts by the online assistant; buyer emails still irregular\nResources | informal | documented | dye grant approved on members’ terms; shops pay in 51 days against 45\nPlanning | informal | practised | first annual plan approved and reviewed at every committee meeting",
      "changes": "Results: payments within 15 days 88% (target 95%); average monthly payment US$32 (target 33); online share 36% (target 37%). Objectives: ISO1’s 40% moved to March 2029. Theory of Change: add the assumption that shops pay within 45 days. 2028–29 plan: build the dye unit after the monsoon; the export fair (our every-second-year visit); keep the online assistant all year."
     },
     "notice": "Notice the results reported beside the ratings: stronger systems, targets narrowly missed. Copy reporting both, so members see the full picture."
    },
    {
     "org": "hybrid",
     "profile": {
      "health": "Strategy | documented | reviewed | checked against results in January; ESO wording kept, ISO1 date moved\nGovernance | documented | practised | combined quarterly report since July; trustees can follow the company’s gift\nPeople | practised | practised | new schools officer since July; 29 of 30 workshops held\nMEAL | practised | reviewed | repair-first baseline 47%; external evaluation reports in April\nFinance | documented | practised | recharge calculated every quarter\nRisk | practised | reviewed | three PAT testers; lease offer came late, rent up 15%; decision moved from December to March\nResources | informal | documented | community fund renewed at £55,000 a year; shop profit 16% of charity costs against 18%",
      "changes": "Objectives: ISO1 now 30% by March 2030, with 20% next year. ESO1 kept: deprived-area visitors reached 27%, mostly through estate pop-ups. Theory of Change: estate pop-ups become the main route to low-income households. 2028–29 plan: the lease decision first; pop-ups on a third estate; the tool library membership’s first full year (98 members, against 150 planned)."
     },
     "notice": "Notice that strategy reached “reviewed” because results changed a date. Copy reviewing your strategy against evidence, not just rewriting it."
    }
   ]
  }
 }),
 review("work-plan","Your Organisation Operating Plan")
 ]
});
