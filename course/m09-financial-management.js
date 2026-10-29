import {module,lesson,review} from './kit.js?v=deeplink1';
// Reviewed October 2026: plain explanation, optional table (anatomy), and a gallery showing how the five example
// organisations (course/examples.js; story in docs/example-organisations.md) complete each exercise.
export default module({
 ...{"uses":[1,2,3,5],"video":null,"id":9,"slug":"financial-management","phase":"Protect","title":"Financial Management","short":"Budgets, cost allocation, restricted funds, cash flow, controls, reporting, audit and financial health","intro":"Manage money well enough to make good decisions, protect resources and earn trust. This module is practical, not an accounting qualification: it covers what founders and leaders need to budget, forecast, control, report and oversee finances, and when to bring in a qualified accountant. How you raise income is covered separately in Module 11.","output":"Financial Management Pack","workbook":{"file":"Module-09-Financial-Management.xlsx","title":"Financial Management workbook"},"promo":{"lesson":"reporting","tools":["strategy-kpis-annual-planning","donor-tracking"],"headline":"Connect money to plans and funder obligations","pitch":"Strategy, KPIs & Annual Planning keeps a budget beside every initiative in your annual plan, so spending and priorities are reviewed together. Donor Tracking keeps each grant’s amount, conditions and reporting calendar in one place, so restricted money and deadlines are never lost."}},
 lessons:[
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Understand",
  "id": "roles",
  "title": "Finance roles and the finance cycle",
  "sheet": "Finance roles",
  "learn": [
   "Financial management has three layers. Bookkeeping records every transaction accurately. Accounting turns those records into reports that follow rules, such as annual accounts and tax returns. Management finance uses the numbers to plan and decide: budgets, forecasts, pricing and cost control.",
   "Decide who does what. In a small organisation the founder or an operations lead often manages day-to-day finance, an external bookkeeper or accountant keeps records and prepares statutory accounts, and the board or a treasurer oversees. Separating doing, recording and overseeing is itself a control.",
   "Finance runs in a cycle: plan (budget), record (bookkeeping), control (approvals and bank reconciliations), report (management accounts) and review (compare with the budget and decide). At year end come the annual accounts and any audit or examination. Put these dates in the calendar you built in Module 5.",
   "Bring in a qualified accountant early. Ask about tax registration, payroll, statutory accounts and any funder requirements for your legal form. Rules differ by country, so confirm what applies to you."
  ],
  "weak": "The founder does the finances.",
  "strong": "Imara Girls in Science: finance officer Grace keeps the books and prepares payments; director Achieng approves them; the treasurer reviews monthly reports; the board approves the budget; an external auditor checks the annual accounts.",
  "why": "Doing, recording and overseeing sit with different people, and each task has a named owner.",
  "reflect": "If the person who manages your money was away for two months, who could pay the bills?",
  "exercise": "Define your finance roles and your monthly and annual finance cycle.",
  "fields": [
   {
    "key": "roles",
    "label": "Finance roles",
    "hint": "Task (budgeting, bookkeeping, payments, reporting, statutory accounts, oversight) | who | internal or external."
   },
   {
    "key": "cycle",
    "label": "Finance cycle",
    "hint": "Monthly and annual finance activities, with timing and owner."
   }
  ],
  "check": "Are doing, recording and overseeing finance held by different people where possible?",
  "gallery": {
   "title": "Five example finance role maps",
   "intro": "How each organisation shares out its finance tasks and sets its monthly and annual rhythm.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "roles": "Budgeting | Wayan and Sari together | internal\nCash book and receipts | Ibu Made (future treasurer) | internal, volunteer\nPayments | Sari buys; spending over US$100 needs both co-founders | internal\nReports to sponsors | Wayan | internal\nRegistration and future accounts | notary now; a local accountant once registered | external\nOversight | Ibu Made checks the cash book against receipts; founding board from registration | internal",
      "cycle": "Monthly (first weekend): Ibu Made totals the cash book, counts the cash and checks receipts; the co-founders compare spending with the budget after the volunteers’ meeting.\nBefore each planting day: Sari confirms costs are within budget.\nJuly and January: short spending and survival report to the dive operators.\nDecember: Wayan and Sari draft next year’s budget (year runs January to December); from registration, the board approves it."
     },
     "notice": "Notice that even without staff, the person who keeps the cash book is not the person who buys. Copy that separation: it costs nothing."
    },
    {
     "org": "ngo",
     "profile": {
      "roles": "Budgeting | Achieng with Grace; finance and safeguarding committee reviews | internal\nBookkeeping and payroll | Grace (finance officer) | internal\nPayments | Grace prepares; Achieng approves; three quotes over US$500 | internal\nFunder financial reports | Grace prepares; Achieng signs | internal\nAnnual accounts and audit | external auditor | external\nOversight | treasurer (an accountant) and the board of 7 | internal, voluntary",
      "cycle": "Monthly: Grace reconciles the bank by day 5 and sends management accounts by day 10; Achieng and the treasurer review them.\nQuarterly: finance and safeguarding committee, then the board; funder reports as due.\nAnnually (year runs January to December): budget drafted in October, approved by the board in December; auditor’s work in February and March; board approves the audited accounts in April."
     },
     "notice": "See how Grace prepares payments, Achieng approves them and the treasurer checks both. Copy the dates: each task has a day of the month."
    },
    {
     "org": "social",
     "profile": {
      "roles": "Budgeting and pricing | Lucía and Diego, with the advisory group’s accountant | internal\nTill and daily sales | café supervisor (point-of-sale system) | internal\nBookkeeping and tax | contracted accountant, monthly | external\nPayments and supplier orders | café supervisor up to US$300; Lucía or Diego above | internal\nPayroll, including trainees’ contracts | accountant prepares; Lucía approves | external and internal\nOversight | the two shareholder-directors; advisory group every two months | internal",
      "cycle": "Daily: café supervisor closes the till and counts the cash.\nWeekly: Diego checks wholesale invoices and who has paid.\nMonthly: accountant closes the books by day 12 and files tax returns on the dates they set; Lucía and Diego review sales, costs and cash on the 15th.\nEvery two months: advisory group reviews the numbers.\nAnnually (January to December): budget in December; shareholders approve the accounts after year end."
     },
     "notice": "Notice the daily and weekly rhythm. A café handles cash every day, so its finance cycle starts at the till, not with the monthly accounts."
    },
    {
     "org": "coop",
     "profile": {
      "roles": "Budgeting | Meera drafts; the committee approves | internal\nBookkeeping, piece register and weaver payments | accounts clerk | internal\nYarn orders | Meera; committee approves orders over US$2,000 | internal\nReports to the committee | Meera and the treasurer | internal\nAnnual audit | state cooperative department | external\nOversight | elected treasurer and committee; members at the annual general meeting | internal",
      "cycle": "Every 15 days: weavers paid against the piece register.\nMonthly: the clerk reconciles the bank; the treasurer checks it; the committee reviews sales, yarn stock and cash at its monthly meeting.\nAnnually (year runs April to March): committee approves the budget in March; department audit after year end; audited accounts and the bonus presented at the annual general meeting in September."
     },
     "notice": "Copy how members appear in the oversight line. In a cooperative the general body is the final check, so the cycle ends at the annual general meeting."
    },
    {
     "org": "hybrid",
     "profile": {
      "roles": "Budgeting | Tom drafts for both entities; trustees and the company board approve | internal\nBookkeeping (separate books for charity and company) | contracted bookkeeper, weekly | external\nPayments | Tom or the shop manager prepares; two approvers over £500 | internal\nShop takings | shop manager, daily | internal\nAnnual accounts | external accountant, for charity and company | external\nOversight | treasurer (a chartered accountant) and trustees; company board of three | internal",
      "cycle": "Weekly: bookkeeper updates both sets of books; shop takings banked.\nMonthly: bank reconciliations for both entities by day 7; management accounts by day 12; treasurer reviews.\nQuarterly: trustees’ meeting and company board; recharge between charity and company invoiced.\nAnnually (year ends in March): both budgets approved in February; accountant prepares both sets of accounts after year end; company profit gifted to the charity in December."
     },
     "notice": "Notice two entities, two sets of books and two approving boards. Copy the quarterly step where shared costs are charged between them."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "core-budget",
  "title": "The organisational budget",
  "sheet": "Organisational budget",
  "learn": [
   "An organisational (core) budget estimates all your income and spending for the year: programmes or products, staff, premises, equipment, IT, insurance, professional fees, governance, fundraising and a contribution to reserves. It is a plan for the whole organisation, not the sum of what funders will pay for.",
   "Build it from your annual plan. Base costs on real quotes and past spending, and write down each assumption. Mark each income source as confirmed, likely or possible. Do not plan spending against possible income unless you have decided what you will cut if it does not arrive.",
   "Set the budget out by month, so you can compare it with what actually happens, and by objective or programme, so you can see what each part of your strategy costs. Your board or committee approves it before the year starts."
  ],
  "weak": "We spend what we receive.",
  "strong": "Pan del Barrio: costs of US$212,000 by line and month, each with its basis (flour at today’s price, wages for 10 people); income of US$210,000 from the café, wholesale and two employers’ training fees; the US$2,000 gap shown, with cuts listed in order.",
  "why": "It covers the whole organisation, shows its assumptions and is honest about the gap and what will happen if income falls short.",
  "reflect": "Which cost of running your organisation is missing from your current budget?",
  "exercise": "Draft your organisational budget headings and assumptions.",
  "fields": [
   {
    "key": "costs",
    "label": "Expenditure",
    "hint": "Cost heading | annual amount | basis or assumption | objective or programme."
   },
   {
    "key": "income",
    "label": "Income",
    "hint": "Source | amount | confirmed, likely or possible | timing | restrictions."
   },
   {
    "key": "scenario",
    "label": "If income falls short",
    "hint": "What you would reduce or delay, and in what order."
   }
  ],
  "check": "Does your budget include the full costs of running the organisation, not only programme costs?",
  "gallery": {
   "title": "Five example organisational budgets",
   "intro": "Each organisation’s budget for its current financial year, with assumptions, income status and a plan for a shortfall.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "costs": "Seedlings | 1,500 | 3,000 seedlings at US$0.50 (nursery quote) | ESO1\nBoots and tools | 900 | 30 sets at US$30 | ESO1\nBoat hire | 1,200 | 10 days at US$120 (fisher’s quote) | ESO1\nSnacks and transport for young people | 1,400 | 10 planting days, plus school sessions | ESO1, ESO2\nSafeguarding training | 400 | local course for all adults | ISO2\nRegistration and notary | 800 | notary’s estimate | ISO1\nContingency | 1,300 | about 20% of other costs; first year | all\nTotal | US$7,500 |",
      "income": "Dive operators’ sponsorship (two) | 3,000 | likely (verbal yes) | January | 2,000 for seedlings and boat hire; 1,000 unrestricted\nVillage fund | 1,500 | likely | March, after the village budget | young people’s activities in both villages\nSmall local donors | 1,500 | likely | January launch, June, December | none\nEnvironment grant | 1,500 | possible (applied, not won) | decision by mid-year | seedlings and monitoring\nTotal | US$7,500 (US$6,000 confirmed or likely) |",
      "scenario": "1. The contingency (US$1,300) is spent last and only with both co-founders’ agreement.\n2. If the environment grant is not won, we cut two boat days in December (US$240) and keep all planting days on the shore.\n3. If a dive operator withdraws, we plant at one site only until new support is found.\n4. Safeguarding training is never cut."
     },
     "notice": "Notice that the grant they applied for is marked “possible” and the plan shows exactly what goes if it fails. Copy the contingency line: a first-year budget needs one."
    },
    {
     "org": "ngo",
     "profile": {
      "costs": "Staff (6) | 72,000 | current salaries, no rise yet | all objectives\nMentors’ transport stipends | 9,000 | 25 mentors, term-time visits | ESO1\nClub kits | 6,000 | restocking 14 schools | ESO1, ESO2\nHoliday camp | 14,000 | 120 girls, 5 days (quotes) | ESO1\nTransport | 8,000 | coordinators’ school visits | ESO1, ESO2\nOffice and admin | 12,000 | rent, internet, audit, bank fees | all\nMEAL and data | 5,000 | surveys, tablets, data tool | ISO3\nSafeguarding and training | 4,000 | all staff and mentors yearly | ISO2\nContribution to reserves | 10,000 | towards three months’ costs | ISO1\nTotal | US$140,000 |",
      "income": "Foundation A | 70,000 (50%) | confirmed; the grant ends next year | January and July | club programme only\nFoundation B | 35,000 | confirmed | quarterly | none (core grant)\nCamp sponsors | 12,000 | likely | June–July | holiday camp only\nLocal businesses | 8,000 | likely | March and September | none\nIndividual donors | 10,000 | likely | monthly, more in December | none\nSchool contributions | 5,000 | likely | start of each term | none\nTotal | US$140,000 |",
      "scenario": "1. Pause the reserve contribution (US$10,000).\n2. If camp sponsors give less than US$12,000, run the camp for 80 girls, club members first.\n3. Delay replacing tablets.\n4. Never cut safeguarding or mentors’ stipends.\nThe proposed half-time fundraising officer (about US$6,000) is not in this budget; the board will decide whether to pay it from the reserve."
     },
     "notice": "See how restrictions sit in the income table: only part of the money can pay for anything. Copy the note that a proposal stays outside the budget until it is approved."
    },
    {
     "org": "social",
     "profile": {
      "costs": "Ingredients | 70,000 | 33% of sales; flour at today’s price | bakery sales\nWages | 95,000 | 10 people, including 6 trainees at the minimum wage; founders’ pay capped | ESO1, sales\nRent | 24,000 | lease, US$2,000 a month | all\nUtilities and equipment | 14,000 | including the yearly oven service | all\nOther (accountant, licences, marketing) | 9,000 | last year’s spending | all\nTotal | US$212,000 |",
      "income": "Café sales | 120,000 | likely | daily; low in January–February, peak in December | none\nWholesale (three office clients) | 75,000 | likely; one client is 40% of it | invoiced monthly, paid 30 days later | none\nTraining fees (two employers, US$7,500 each) | 15,000 | confirmed | January and July | for training places\nMunicipal youth programme grant | not budgeted | possible | would need Asociación Barrio Forma or a formal agreement | training places only\nTotal | US$210,000 (deficit US$2,000) |",
      "scenario": "We start US$2,000 short, so: review bread prices with office clients in March and cut waste in production. If the large wholesale client leaves (about US$30,000 a year): 1. delay equipment spending; 2. hold founders’ pay below the cap; 3. find new office clients through the advisory group. Trainees’ wages and contracts are never cut."
     },
     "notice": "Notice the deficit is written into the total, not hidden. Copy how each income line says when the cash really arrives, such as wholesale paid 30 days late."
    },
    {
     "org": "coop",
     "profile": {
      "costs": "Yarn and dyes | 38,000 | bulk orders; prices up 5% on last year | ESO1\nPayments to weavers | 40,000 | piece rates about 38,000, plus the annual bonus about 2,000 | ESO1\nStaff (4) | 10,000 | current pay | all\nShop fees, photography and shipping | 4,000 | about 13% of online sales | ISO1\nOther (audit, office, travel) | 3,000 | last year | all\nTotal | US$95,000 |",
      "income": "Shops (two retail chains and local shops) | 60,000 | likely | busiest from August to December; shops pay about 60 days late | none\nOnline (marketplace and shared shop) | 30,000 | likely | monthly, peak before festivals | none\nExhibitions (handloom export fair) | 5,000 | possible | December | none\nTotal | US$95,000 |",
      "scenario": "1. Buy yarn only against confirmed orders.\n2. The members’ bonus falls first, because the annual general meeting decides it after the year’s results.\n3. Do not start the proposed half-time online sales assistant (about US$1,200, not in this budget).\n4. Piece rates and payment within 15 days are never cut."
     },
     "notice": "Look at the order of cuts: what members value most, fair and on-time pay, is protected. Copy the habit of writing what you will never cut."
    },
    {
     "org": "hybrid",
     "profile": {
      "costs": "Staff | 120,000 | Tom, Priya (80%; 20% recharged to the shop company), volunteer coordinator 0.8, schools officer 0.8 | all\nPremises | 24,000 | lease to 2028 | all\nTools and insurance | 9,000 | quotes | ESO1, ISO3\nSchools programme | 12,000 | 30 workshops | ESO2\nOther (bookkeeper, accountant, IT, volunteer expenses) | 15,000 | last year | all\nTotal (charity) | £180,000 |",
      "income": "Lottery-type grant | 60,000 | confirmed to March 2027 | quarterly | repair cafés and volunteering\nCommunity trust | 30,000 | confirmed | April | tool library and housing association outreach\nEducation trust | 20,000 | likely | September | schools programme\nCouncil contract | 30,000 | confirmed | quarterly, paid in arrears | targets for repairs and kg diverted\nDonations | 15,000 | likely | monthly, more in December | none\nGift from Riverside Reuse Ltd | 25,000 | likely; depends on shop profit | December | none\nTotal | £180,000 |",
      "scenario": "1. If the shop’s profit is below £25,000, pause new tool purchases and reduce volunteer events.\n2. If the education trust says no, schools workshops fall from 30 to 15.\n3. The lottery-type grant ends in March 2027: trustees decide on a renewal bid and savings options by January 2027."
     },
     "notice": "Notice the charity budget shows the gift from its own trading company as income, with a note that it depends on shop profit. Copy the date by which trustees must decide."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Design",
  "id": "programme-budget",
  "title": "Project budgets, cost allocation and full cost recovery",
  "sheet": "Project budget",
  "learn": [
   "A project or programme budget shows the cost of one piece of work. It includes direct costs (staff time on the project, materials, travel, support for participants) and a fair share of the shared costs that make the work possible (management, finance, rent, IT, governance).",
   "Cost allocation divides shared costs between projects on a reasonable basis, such as staff time, floor space or share of spending. Apply it the same way every time and keep the calculation. Full cost recovery means each funded project pays its fair share, so the organisation is not left to cover the gap.",
   "Low overheads do not mean efficiency. Years of underfunded support costs weaken organisations: no finance capacity, no training, no reserves. Know your real shared-cost rate and negotiate it with funders, while respecting any limits they set.",
   "Use the same cost headings in every project budget, so that together they add up to the organisational budget without counting anything twice."
  ],
  "weak": "The camp budget is the venue, the buses and the materials.",
  "strong": "Imara Girls in Science, holiday camp: direct costs US$16,240 (venue and meals, buses, materials, science centre visit, coordinators’ and programme manager’s time) plus US$5,200 of shared costs at our documented rate of 32%; full cost US$21,440, about US$179 per girl.",
  "why": "It counts staff time and a fair share of running costs, using a method the organisation applies to every project.",
  "reflect": "Which cost disappears from your budgets because someone currently contributes it unpaid?",
  "exercise": "Build a budget for one project, including a fair share of support costs.",
  "fields": [
   {
    "key": "direct",
    "label": "Direct costs",
    "hint": "Item | quantity | unit cost | total | basis."
   },
   {
    "key": "shared",
    "label": "Shared costs and allocation method",
    "hint": "Shared cost pools, allocation basis and the resulting share for this project."
   },
   {
    "key": "unpaid",
    "label": "Hidden or donated costs",
    "hint": "Costs currently covered by unpaid or in-kind contributions."
   }
  ],
  "check": "Does the project pay its fair share of the costs that make it possible?",
  "anatomy": {
   "title": "Direct and shared costs",
   "intro": "Every project needs both. Funders often see only the first column.",
   "cols": [
    "Question",
    "Direct costs",
    "Shared (indirect) costs"
   ],
   "rows": [
    [
     "What they are",
     "Costs that exist only because this project runs",
     "Costs that keep the whole organisation running"
    ],
    [
     "Examples",
     "Project staff time, materials, venue, participant travel",
     "Director and finance time, rent, IT, audit, board costs"
    ],
    [
     "How they enter the budget",
     "Itemised: quantity × unit cost",
     "A share, using a written basis such as staff time or floor space"
    ],
    [
     "If you leave them out",
     "The project cannot be delivered",
     "Other income quietly subsidises the project"
    ]
   ],
   "after": 1
  },
  "gallery": {
   "title": "Five example project budgets",
   "intro": "Each organisation costs one piece of work in full: direct costs, a fair share of shared costs and the costs nobody is paying for.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "direct": "Project: planting days (ESO1), US$\nSeedlings | 3,000 | 0.50 | 1,500 | nursery quote\nBoots and tools | 30 sets | 30 | 900 | shop quote\nBoat hire | 10 days | 120 | 1,200 | fisher’s quote\nSnacks and transport for young people | 10 days | 100 | 1,000 | last year’s village events\nTotal direct | | | 4,600 |",
      "shared": "Shared pool: safeguarding training (400) and registration with the notary (800) = 1,200. Basis: share of direct costs. Planting days are 4,600 of our 5,000 direct costs (school sessions are the other 400), so 92%: US$1,104. Full cost of planting days: US$5,704, about US$570 per planting day. The contingency is not allocated.",
      "unpaid": "The co-founders’ time: about 1,500 hours a year between them. Four volunteers on every planting day. Ibu Made’s bookkeeping. A fisher sometimes lends his boat free. Seedling care by the nursery between deliveries. If any of these stopped, the real cost would show at once."
     },
     "notice": "Notice that even a US$7,500 budget can allocate shared costs with one simple rule. Copy the honest list of unpaid time: it is the biggest cost they have."
    },
    {
     "org": "ngo",
     "profile": {
      "direct": "Project: holiday camp, 120 girls, 5 days, US$\nVenue and meals | 600 girl-days | 15 | 9,000 | venue quote\nBuses | 10 bus-days | 250 | 2,500 | two quotes\nScience materials | 120 girls | 12.50 | 1,500 | last camp\nScience centre visit and guides | 1 | 1,000 | 1,000 | centre’s price\nClub coordinators’ time | 3 × 3 weeks | 554 per coordinator | 1,660 | salary US$9,600 a year\nProgramme manager’s time | 2 weeks | 290 a week | 580 | salary US$15,000 a year\nTotal direct | | | 16,240 |",
      "shared": "Shared pool US$31,800: office and admin 12,000, finance officer 11,400, half of the director’s salary 8,400. Basis: share of direct spending. Pool ÷ all other spending (98,200) = 32%. Camp share: 32% of 16,240 = about US$5,200. Full cost US$21,440. Camp sponsors give US$12,000, so 44% comes from unrestricted funds. Foundation A allows only 15% for shared costs on the clubs.",
      "unpaid": "Mentors’ time at camp (about 10 mentors × 5 days). University lab rooms lent for one day. Parents who help with pick-up. Head teachers’ time to choose and prepare girls."
     },
     "notice": "See how the shared rate is calculated once for the whole organisation, then applied. Copy the line that compares the real rate with what the funder allows."
    },
    {
     "org": "social",
     "profile": {
      "direct": "Project: the apprenticeship, 12 trainees a year, US$\nDiego’s training and mentoring time | 70% of his year | 14,400 a year | 10,080 | his timesheet\nTrainees’ training time | 25% of their pay and employment costs | 35,000 a year | 8,750 | one day in four is training, not production\nCertificate assessment | 12 | 80 | 960 | certification body\nPractice ingredients | 12 | 150 | 1,800 | last cohort\nUniforms and safety shoes | 12 | 45 | 540 | supplier quote\nTotal direct | | | 22,130 |",
      "shared": "Shared pool US$45,500: rent 24,000, utilities and equipment 14,000, accountant, licences and marketing 7,500. Basis: training’s share of space and hours in the bakery, about 10%: US$4,550. Full cost US$26,680, about US$2,223 per trainee. Employer fees cover US$15,000 (56%); bread sales cover the other US$11,680. This is the figure for a grant through Asociación Barrio Forma.",
      "unpaid": "Lucía’s teaching at the oven: about 4 hours a week, not counted. The advisory group’s time. Employers’ time for interviews and work trials. The municipality’s referral work."
     },
     "notice": "Notice how they separate trainees’ training time from their production time. Copy that care: only the training part is a cost of the programme."
    },
    {
     "org": "coop",
     "profile": {
      "direct": "Project: two new design collections a year, US$\nDesigner’s time | 60% of her year | 2,400 a year | 1,440 | her work plan\nSample yarn and dyes | 2 collections | 400 | 800 | supplier prices\nPiece payments for sample weaving | 2 collections | 300 | 600 | piece rates\nPhotography | 2 collections | 200 | 400 | last year\nDesign school students’ stipends | 2 placements | 150 | 300 | agreement with the school\nTotal direct | | | 3,540 |",
      "shared": "Shared pool US$8,400: manager 3,600, accounts clerk 1,800, other costs 3,000. Basis: share of staff time; collections take about 10% of Meera’s and the clerk’s time: US$840. Full cost US$4,380, about US$2,190 per collection. Any handloom scheme grant for design should cover the full cost, not only the yarn.",
      "unpaid": "Design school students’ time beyond their stipend. Senior weavers trialling new patterns on their own looms. Committee members’ time to choose designs."
     },
     "notice": "Look at the piece payments for samples: members’ labour is paid even in a trial. Copy the note on what a grant should cover before you apply."
    },
    {
     "org": "hybrid",
     "profile": {
      "direct": "Project: school workshops, 30 a year, £\nSchools officer (0.8) | 1 | 22,900 | 22,900 | salary £20,000 plus employer costs\nRepair kits and materials | 30 | 200 | 6,000 | last year\nTravel and van hire | 30 | about 83 | 2,500 | last year\nVolunteers’ expenses | 30 | 50 | 1,500 | expenses policy\nDBS checks and safeguarding training | | | 1,000 | quotes\nBroken items and parts | | | 1,000 | estimate\nTotal direct | | | 34,900 |",
      "shared": "Management and finance pool £32,900 (half the director’s cost, bookkeeping, accounts, IT); basis staff time: 0.8 of 3.4 charity posts = 23.5%: £7,740. Premises £24,000 by floor space, 5%: £1,200. Shared share £8,940 (26% of direct). Full cost £43,840, about £1,460 per workshop. The recharge to Riverside Reuse Ltd has not been recalculated since April 2026; we will redo it with this method.",
      "unpaid": "Volunteer repairers at every workshop: about 180 hours a year. Schools provide rooms and teacher time. Local businesses donate broken items for pupils to repair."
     },
     "notice": "Notice the different basis for each pool: staff time for management, floor space for premises. Copy the note to recalculate the recharge to the trading company with the same method."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "restricted",
  "title": "Restricted and unrestricted funds",
  "sheet": "Funds register",
  "learn": [
   "Restricted funds can be used only for the purpose the donor or funder set. Unrestricted funds can be used for anything within your mission. Designated funds are unrestricted money your board has set aside for a purpose; the board can change that decision, but a funder’s restriction can only be changed with the funder’s agreement.",
   "Track restricted funds separately. Give each grant a code, record income and spending against it and report on it as agreed. Using restricted money for something else, even for a few weeks, can break the agreement and, in some countries, the law.",
   "Companies, cooperatives and social enterprises have similar ideas. Money received for work not yet delivered, such as fees or orders paid in advance, is deferred income; loans and investment come with conditions. Whatever your form, know which money is committed to what, and keep enough flexible money to cover core costs and risks."
  ],
  "weak": "All our money goes into one pot.",
  "strong": "Riverside Repair Hub: each grant has a fund code; a funds register shows amount, purpose, spent, balance and report dates; trustees see that of £47,000 in the bank at 30 September, £36,200 is restricted and £8,000 designated.",
  "why": "The restrictions are visible, so trustees know how much money is actually free to use.",
  "reflect": "If a funder asked tomorrow how their grant was spent, how quickly could you show them?",
  "exercise": "Set up your funds register.",
  "fields": [
   {
    "key": "register",
    "label": "Funds register",
    "hint": "Fund or grant | type (restricted, unrestricted, designated, deferred) | amount | purpose and conditions | spent to date | balance | reporting dates."
   }
  ],
  "check": "Can you show at any time how each restricted fund has been used?",
  "anatomy": {
   "title": "Four kinds of money",
   "intro": "The type decides who can change how the money is used.",
   "cols": [
    "Type",
    "Who decides how it is used",
    "Example"
   ],
   "rows": [
    [
     "Restricted",
     "The funder or donor; changes need their written agreement",
     "A grant only for school workshops"
    ],
    [
     "Unrestricted",
     "Your organisation, within its mission",
     "General donations, sales profit, a core grant"
    ],
    [
     "Designated",
     "Your board; it can change its own decision",
     "Money set aside for a future move"
    ],
    [
     "Deferred (received in advance)",
     "Earned only when you deliver the work or goods",
     "Training fees paid in January for a six-month course"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example funds registers",
   "intro": "Each organisation’s register at a mid-year date, showing what every pot of money is for and how much is left.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "register": "At 30 June, US$:\nDive operators: seedlings and boat | restricted | 2,000 | seedlings and boat hire only | 1,500 | 500 | July and January\nDive operators: general | unrestricted | 1,000 | any mission cost | 1,000 | 0 | with the report above\nVillage fund | restricted | 1,500 | young people’s activities (snacks, transport, boots) | 900 | 600 | December village meeting\nSmall local donors | unrestricted | 1,000 received | any mission cost | 1,000 | 0 | update twice a year\nEnvironment grant | possible, not received | 1,500 | seedlings and monitoring | 0 | 0 | decision in August"
     },
     "notice": "Notice that one sponsor’s money is split into two lines because only part is restricted. All US$1,100 in hand is restricted: copy the habit of checking that before spending on anything else."
    },
    {
     "org": "ngo",
     "profile": {
      "register": "At 30 June, US$:\nFoundation A (FA) | restricted | 70,000 (35,000 received) | weekly clubs; up to 15% shared costs; ends next year | 33,400 | 1,600 | July and January\nFoundation B (FB) | unrestricted core grant | 35,000 (17,500 received) | any costs in the plan | 17,500 | 0 | June and December\nCamp sponsors (CS) | restricted | 12,000 (6,000 received) | holiday camp only | 0 | 6,000 | September\nGeneral reserve | unrestricted | 18,000 | emergencies; board approval to use | 0 | 18,000 | quarterly to the board\nReserve contribution | designated by the board | 10,000 planned | bridge after Foundation A ends | 0 | set aside in December | quarterly to the board"
     },
     "notice": "See how the reserve contribution is designated, not restricted: the board chose it and could change it. Copy the codes, which Grace uses for every transaction."
    },
    {
     "org": "social",
     "profile": {
      "register": "At 30 June, US$:\nEmployer 1 training fee | deferred income | 7,500 received in January | January–June cohort | 7,500 earned | 0 | completion report in July\nEmployer 2 training fee | deferred income | 7,500 due in July | July–December cohort | 0 | not yet received | report in January\nOffice clients’ Christmas orders | deferred income | paid in advance from November | December orders | 0 | 0 | none\nMunicipal youth programme grant | possible; restricted to training places, held by Asociación Barrio Forma (not yet created) | 0 | | 0 | 0 | to agree\nCash reserve | directors’ target | 53,000 | three months of costs | 0 | none set aside; 8,900 in the bank | every two months to the advisory group"
     },
     "notice": "Notice that a company’s register is mostly about money received in advance. Copy the decision to keep any future grant in a separate nonprofit with its own books."
    },
    {
     "org": "coop",
     "profile": {
      "register": "At 30 September, US$:\nSeasonal loan, cooperative bank | loan with conditions | 15,000 drawn in June | festival yarn; repay by December | 15,000 | 15,000 to repay | monthly to the committee\nMembers’ bonus | designated by the annual general meeting | 2,000 | paid to members in September | 2,000 | 0 | annual general meeting\nReserve fund under our by-laws | set aside by the committee | 1,500 | yarn losses, emergencies | 0 | 1,500 | monthly to the committee\nHandloom scheme dye-unit grant | possible; would be restricted | 0 | dye unit only; check it does not reduce members’ control | 0 | 0 | to agree\nGeneral funds | unrestricted | all other income | running costs, yarn, weavers | | | monthly"
     },
     "notice": "Look at the dye unit line: before applying, they write down what the restriction might cost them in control. Copy that question for any grant."
    },
    {
     "org": "hybrid",
     "profile": {
      "register": "At 30 September 2026, £:\nLottery-type grant (LG) | restricted | 60,000 a year to March 2027 (30,000 received) | repair cafés and volunteering | 29,100 | 900 | quarterly\nCommunity trust (CT) | restricted | 30,000 | tool library and housing association outreach | 13,500 | 16,500 | April 2027\nEducation trust (ET) | restricted | 20,000 | school workshops, September 2026–August 2027 | 1,200 | 18,800 | February and August\nCouncil contract | unrestricted, with targets | 30,000 | repairs and kg diverted | in general funds | | quarterly\nLease and move fund | designated by trustees | 8,000 | lease ends 2028 | 0 | 8,000 | annually"
     },
     "notice": "Notice that the council contract is not restricted but has targets to meet. Copy the separate line for money the trustees set aside themselves."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Manage",
  "id": "cashflow",
  "title": "Cash flow, forecasting and runway",
  "sheet": "Cash flow forecast",
  "learn": [
   "A surplus on paper does not pay bills; cash does. A cash flow forecast shows, month by month, the cash you expect to receive and pay out, and the balance at the end of each month. It shows gaps before they happen, for example when a grant is paid late or a large annual cost falls due.",
   "Runway is how many months you could keep operating with the cash you have if no new income arrived. A simple estimate: cash in the bank divided by your average monthly payments. Know your runway, and set a minimum level that triggers action.",
   "Update the forecast every month with actual figures, and test simple scenarios: what if a major payment is three months late, or a funding bid fails? Decide in advance what you would do: delay spending, use reserves, bring income forward or arrange short-term borrowing."
  ],
  "weak": "We check the bank balance when we need to pay something.",
  "strong": "Vanita Weavers: a twelve-month forecast from April shows cash falling below zero from June to November as yarn is bought for festival orders; the committee arranges a US$15,000 seasonal loan, repaid in December, and the lowest balance becomes US$3,700 in September.",
  "why": "The forecast found the gap months ahead and the committee acted before it happened.",
  "reflect": "In which month of the year are you most likely to run short of cash?",
  "exercise": "Draft a twelve-month cash flow forecast and set your runway trigger.",
  "fields": [
   {
    "key": "forecast",
    "label": "Cash flow assumptions",
    "hint": "Month | expected receipts | expected payments | closing balance | key assumptions."
   },
   {
    "key": "runway",
    "label": "Runway and triggers",
    "hint": "Current runway, minimum acceptable level and what you will do if you fall below it."
   }
  ],
  "check": "Would you see a cash shortfall at least three months before it happens?",
  "anatomy": {
   "title": "A simple cash flow layout",
   "intro": "One column per month. Pan del Barrio’s January shows how the lines connect.",
   "cols": [
    "Line",
    "What goes in it",
    "Pan del Barrio, January (US$)"
   ],
   "rows": [
    [
     "Opening balance",
     "Cash in the bank at the start of the month",
     "9,000"
    ],
    [
     "+ Receipts",
     "Money actually arriving, not money invoiced",
     "21,750: café 8,000; wholesale 6,250 (December invoices); training fee 7,500"
    ],
    [
     "− Payments",
     "Money actually leaving: wages, rent, suppliers, loans",
     "16,350"
    ],
    [
     "= Closing balance",
     "Becomes next month’s opening balance",
     "14,400"
    ],
    [
     "Runway",
     "Closing balance ÷ average monthly payments",
     "14,400 ÷ 17,700 = 0.8 months"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example cash flow forecasts",
   "intro": "Each organisation’s forecast for its financial year, its runway and the level that triggers action.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "forecast": "By quarter, US$, opening cash 0, without the environment grant:\nJan–Mar | 5,000 | 3,560 | 1,440 | dive operators 3,000 and village fund 1,500 arrive; training, notary and boots paid early\nApr–Jun | 500 | 840 | 1,100 | two planting days\nJul–Sep | 0 | 350 | 750 | dry season; one planting day\nOct–Dec | 500 | 1,210 | 40 | three planting days; two boat days cut\nYear | 6,000 | 5,960 | 40 | contingency not spent",
      "runway": "We have no staff and no fixed monthly costs, so runway is measured by planting days: cash in hand ÷ about US$370 per planting day. At 30 June, US$1,100 covers almost three days. Trigger: if cash would fall below the cost of the next planting day, we do not book the boat or seedlings until a donor has paid. If the environment grant is won, it goes to seedlings and monitoring, not to new activities."
     },
     "notice": "Notice that quarters are enough for a group with no salaries. Copy the honest year-end figure of US$40: it shows why the grant decision matters."
    },
    {
     "org": "ngo",
     "profile": {
      "forecast": "US$, opening cash 18,000:\nJan | 46,350 | 13,800 | 50,550 | Foundation A first half\nFeb | 600 | 10,300 | 40,850 |\nMar | 4,600 | 8,800 | 36,650 | local businesses\nApr | 9,350 | 7,000 | 39,000 | Foundation B quarterly\nMay | 2,100 | 10,300 | 30,800 |\nJun | 6,600 | 10,300 | 27,100 | half of camp sponsorship\nJul | 50,350 | 12,800 | 64,650 | Foundation A second half\nAug | 600 | 19,800 | 45,450 | camp\nSep–Dec | 19,450 | 36,900 | 28,000 | year end: 18,000 reserve plus 10,000 contribution",
      "runway": "Average payments about US$10,800 a month. Lowest point: US$27,100 at the end of June, 2.5 months. Trigger: below 2 months, Achieng and Grace present options to the finance committee within two weeks. Next year Foundation A’s US$70,000 stops: without new income, runway falls below 2 months by February. The board must decide on the proposed fundraising officer by December."
     },
     "notice": "See how the forecast looks beyond this year, to the month Foundation A’s money stops. Copy the named deadline for the board’s decision."
    },
    {
     "org": "social",
     "profile": {
      "forecast": "US$, opening cash 9,000:\nJan | 21,750 | 16,350 | 14,400 | training fee from employer 1\nFeb | 14,250 | 16,350 | 12,300 | low café sales\nMar | 15,750 | 18,350 | 9,700 | oven service\nApr–Jun | 48,250 | 49,050 | 8,900 |\nJul | 24,250 | 21,850 | 11,300 | training fee from employer 2; mid-year staff bonuses\nAug–Nov | 66,000 | 66,300 | 11,000 |\nDec | 19,750 | 23,750 | 7,000 | Christmas sales; December bonuses; extra flour\nYear | 210,000 | 212,000 | 7,000 | the US$2,000 deficit",
      "runway": "Average payments about US$17,700 a month. Runway: 0.4 to 0.8 months all year. Target: a three-month reserve (about US$53,000); founders’ pay stays capped until we reach it. Trigger: if the forecast shows cash below US$6,000, Diego chases every wholesale invoice that same week, Lucía delays equipment spending and we ask the bank about an overdraft before we need it. Scenario: if the large wholesale client starts paying two months later than now, cash drops to about US$2,000 in December."
     },
     "notice": "Notice the scenario: one client paying late almost empties the bank. Copy how the trigger lists actions for named people, not just a number."
    },
    {
     "org": "coop",
     "profile": {
      "forecast": "US$, April–March, opening cash 6,000, with the seasonal loan:\nApr | 4,500 | 5,750 | 4,750 |\nMay | 4,500 | 6,250 | 3,000 |\nJun | 19,800 | 8,250 | 14,550 | US$15,000 seasonal loan drawn; festival yarn\nJul | 5,500 | 9,350 | 10,700 | peak weaving\nAug | 7,500 | 10,550 | 7,650 |\nSep | 9,000 | 12,950 | 3,700 | members’ bonus US$2,000\nOct | 12,500 | 9,150 | 7,050 | shops pay for festival stock\nNov | 11,200 | 6,950 | 11,300 |\nDec | 15,000 | 21,850 | 4,450 | export fair; loan repaid\nJan–Mar | 20,500 | 18,950 | 6,000 | loan interest not yet included",
      "runway": "Average payments about US$7,900 a month. Runway in April: under one month, normal for a cooperative paid by sales. Without the loan, cash is below zero from June to November (lowest −US$11,300 in September). Trigger: below US$3,000 forecast in any month, Meera stops yarn orders without a confirmed buyer and the treasurer calls the committee. Weavers are always paid within 15 days."
     },
     "notice": "Look at the line “without the loan”: they show the gap they avoided, so the committee understands why they borrow. Copy the rule that protects members’ pay."
    },
    {
     "org": "hybrid",
     "profile": {
      "forecast": "Charity, by quarter, £, April 2026–March 2027, opening cash 38,000 (monthly in our spreadsheet):\nApr–Jun | 55,500 | 49,500 | 44,000 | community trust 30,000; yearly insurance\nJul–Sep | 45,500 | 42,500 | 47,000 | education trust 20,000\nOct–Dec | 53,500 | 44,000 | 56,500 | gift from Riverside Reuse Ltd 25,000\nJan–Mar | 25,500 | 44,000 | 38,000 | last lottery-type grant payment\nYear | 180,000 | 180,000 | 38,000 | council pays each quarter in arrears",
      "runway": "Average payments £15,000 a month. At 30 September: 3.1 months on all cash (£47,000), but only £2,800 is free unrestricted cash, because grants are paid ahead. Trigger: forecast below 2 months on all cash, Tom presents a recovery plan to trustees; trustees can also release the £8,000 lease and move fund. From April 2027 the lottery-type grant (£60,000) ends: without a renewal, runway falls below 2 months by June 2027. Trustees decide in January."
     },
     "notice": "Notice two runway figures: all cash and free cash. Copy that split if much of your money is restricted."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Implement",
  "id": "controls",
  "title": "Financial controls, approvals and procurement",
  "sheet": "Control map",
  "learn": [
   "Financial controls prevent errors and misuse and make your records trustworthy. Four principles: approvals within your delegation of authority (Module 3), evidence for every transaction, separation of duties and independent review.",
   "Where you can, give requesting, approving, paying and checking to different people. Small teams cannot always do this, so name a compensating control instead, such as a board member reviewing the bank statements, rather than pretending the separation exists. Reconcile each bank account every month, and have someone other than the person who made the payments review it.",
   "Procurement rules make buying fair and good value: when you need quotes, how you choose suppliers, how conflicts of interest are declared and what records you keep. Where a funder’s rules are stricter, follow theirs for that money.",
   "Keep the rules in proportion to your size, and check them with a competent adviser for your legal form and country. Guidance from another country’s regulator is a useful reference, not a statement of your duties."
  ],
  "weak": "The founder handles all payments without review.",
  "strong": "Riverside Repair Hub: the requester raises a purchase order; two approvers sign anything over £500; the bookkeeper pays only against an approved invoice; the treasurer reviews the monthly bank reconciliation, which Tom does not prepare.",
  "why": "Each step has a different person and leaves evidence, so no single person can make and hide a mistake.",
  "reflect": "Where could an error pass unnoticed?",
  "exercise": "Map one money flow and its checks, and write your procurement thresholds.",
  "fields": [
   {
    "key": "controls",
    "label": "Control map",
    "hint": "Money flow | requester | approver | evidence | reconciliation | independent review."
   },
   {
    "key": "limits",
    "label": "Procurement thresholds and controls to confirm",
    "hint": "Quotes required at each threshold, conflict declarations and local advice still needed."
   }
  ],
  "check": "Is there a meaningful check beyond the person initiating the transaction?",
  "gallery": {
   "title": "Five example control maps",
   "intro": "Each organisation maps one money flow, its checks and its buying rules, including what it still needs to confirm.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "controls": "Buying seedlings | Sari | Wayan as well if over US$100 | nursery receipt and delivery note, photographed | Ibu Made matches receipts to the cash book monthly | the founding board after registration; until then, a summary to the volunteers’ meeting\nCash donations at events | volunteer collecting | none needed | two people count and both sign a slip | Ibu Made records the same day | dive operators see the sponsorship report",
      "limits": "Under US$100: one co-founder, receipt kept.\nUS$100–500: both co-founders; two prices where possible.\nOver US$500 (boat hire for the year): both co-founders and Ibu Made; written quotes from two boat owners.\nConflict of interest: a volunteer’s relative owns one boat, so that volunteer does not take part in choosing.\nTo confirm: how to open a bank account in the association’s name and its signing rules, once registered."
     },
     "notice": "Notice the cash counted by two people at events: a simple control for the riskiest moment. Copy the conflict note about the boat owner."
    },
    {
     "org": "ngo",
     "profile": {
      "controls": "Mentors’ transport stipends | club coordinator lists attendance | programme manager Brian confirms; Achieng approves the monthly total | signed attendance sheet per mentor | Grace pays by mobile money and reconciles the statement monthly | treasurer reviews the reconciliation and a sample of five payments each quarter\nSupplier payments | staff member | Achieng | quote, invoice, delivery note | Grace | treasurer, quarterly sample",
      "limits": "Under US$500: one written quote, director’s approval.\nUS$500–5,000: three quotes (as already agreed); Achieng and Grace choose.\nOver US$5,000 (camp venue, buses): three quotes, finance and safeguarding committee approves.\nFoundation A’s rules apply to its money where stricter.\nConflict declarations: all staff and board members once a year, and in each purchase over US$500.\nTo confirm with our auditor: data and record-keeping rules for mobile money payments."
     },
     "notice": "See how mentors’ stipends, many small payments, get their own control: attendance evidence and a sample check. Copy the sampling idea for high-volume payments."
    },
    {
     "org": "social",
     "profile": {
      "controls": "Café takings | café supervisor | none; a daily routine | point-of-sale report and cash count each evening | accountant matches deposits to sales monthly | Lucía checks the daily cash sheet every week; Diego counts the till by surprise once a month\nFlour and ingredient orders | Lucía | café supervisor up to US$300; Lucía or Diego above | supplier invoice and delivery check | accountant | the director who did not order checks prices against last month’s",
      "limits": "Under US$300: café supervisor, one supplier.\nUS$300–2,000: Lucía or Diego, two prices.\nOver US$2,000 (equipment): both directors, three quotes; the advisory group’s accountant is asked.\nConflict: buying from a relative of a staff member needs both directors’ agreement, written down.\nTo confirm with our accountant: invoice and receipt rules for tax."
     },
     "notice": "Notice the surprise till count: in a small business, an unpredictable check is often the strongest one. Copy the rule about buying from relatives."
    },
    {
     "org": "coop",
     "profile": {
      "controls": "Payments to weavers | quality officer accepts each piece | Meera approves the payment list | piece register signed by the weaver and quality officer | accounts clerk pays by bank transfer within 15 days and reconciles monthly | treasurer checks the reconciliation; any member may see the payment records (open books)\nYarn orders | Meera | committee approves orders over US$2,000 | supplier quote and stock register | clerk | committee reviews stock against the register each month",
      "limits": "Yarn orders under US$2,000: Meera, from approved suppliers.\nOver US$2,000: committee approval; quotes from two suppliers.\nOther purchases over US$500: two quotes and the treasurer’s approval.\nConflict: committee members who sell yarn or weave a large share of an order leave the room for that decision.\nTo confirm with the state cooperative department: which records the auditor expects."
     },
     "notice": "Look at the weaver signing the piece register: the person being paid is part of the check. Copy the open-books review by members."
    },
    {
     "org": "hybrid",
     "profile": {
      "controls": "Charity purchases | staff member raises a purchase order | Tom, plus a second approver (trustee or Priya) over £500 | order, invoice, delivery note | bookkeeper pays, both entities reconciled monthly | treasurer reviews both reconciliations; Tom does not prepare them\nShop takings (Riverside Reuse Ltd) | shop manager | none; a daily routine | till report and cash count signed by two people | bookkeeper matches deposits weekly | company board reviews monthly sales",
      "limits": "Under £500: one approver; one quote.\n£500–5,000: two approvers; three quotes, or a reason why not.\nOver £5,000: trustees or company board approve.\nRecharges between charity and company: invoiced quarterly under our written agreement; the method has not been recalculated since April 2026, so trustees will review it.\nConflict register for trustees and the company board, updated yearly.\nTo confirm with our accountant: rules for transactions between the charity and its trading company."
     },
     "notice": "Notice the recharge between the two entities treated as a money flow with its own control. Copy the written note of what is overdue for review."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Manage",
  "id": "management-accounts",
  "title": "Management accounts and budget versus actual",
  "sheet": "Budget vs actual",
  "learn": [
   "Management accounts are short internal reports, usually monthly or quarterly, that compare actual income and spending with the budget. They are for making decisions, so they should be on time and simple rather than perfect.",
   "For each budget line, show the budget to date, the actual to date and the difference (the variance). Explain each significant variance in one sentence: timing (spent later or earlier than planned), price (costs more or less than expected) or volume (more or fewer activities). Then decide: accept it, correct it or change the forecast.",
   "Add a forecast to the year end. The key question is not only “where are we now?” but “where will we end up, and is that acceptable?”"
  ],
  "weak": "We look at the annual accounts once a year.",
  "strong": "Pan del Barrio: a one-page report by the 15th of each month showing sales and costs against budget, every line more than 10% out explained, cash and runway, and a year-end forecast. In March it showed flour 12% over budget, so the directors raised office bread prices from April.",
  "why": "The report arrived in time, explained the variance and led to a decision.",
  "reflect": "What would you do differently if you saw your financial position every month?",
  "exercise": "Design your management accounts report and review routine.",
  "fields": [
   {
    "key": "report",
    "label": "Report contents",
    "hint": "Sections, variance threshold for explanation and format."
   },
   {
    "key": "routine",
    "label": "Review routine",
    "hint": "Who prepares, by when, who reviews and what decisions follow."
   }
  ],
  "check": "Does every significant variance have an explanation and a decision?",
  "gallery": {
   "title": "Five example management accounts routines",
   "intro": "What each organisation puts in its regular finance report and who reviews it, with one real variance.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "report": "One page in the notebook each quarter, photographed to the WhatsApp group: each budget line, budget to date, spent to date, difference; any line more than US$100 or 20% out explained in a sentence; cash in hand; seedling survival beside the money. At 30 June: the environment grant decision moved from June to August (timing) — accepted; the two December boat days stay on hold until we know.",
      "routine": "Ibu Made prepares it within a week of the quarter end. Wayan and Sari review it with her at the volunteers’ meeting. Decisions are written in the notebook. From registration, the board receives it each quarter."
     },
     "notice": "Notice that the money and the survival rate sit on the same page. Copy the habit of writing the decision next to the variance."
    },
    {
     "org": "ngo",
     "profile": {
      "report": "Monthly two-page report: (1) income and spending by line, budget vs actual, month and year to date; (2) each restricted fund’s spending against its grant; (3) cash and runway; (4) year-end forecast. Variances over 10% and US$500 explained. At 30 June: transport US$600 over (fuel price; accept and re-forecast); mentors’ stipends US$600 under (two mentors left; volume); local business income US$1,500 behind (timing, asks in September).",
      "routine": "Grace prepares by day 10. Achieng reviews with Grace by day 12 and agrees actions. The treasurer gets it the same week. The finance and safeguarding committee reviews the quarterly version before each board meeting and recommends any change to the budget."
     },
     "notice": "See how restricted funds have their own section, so Foundation A’s report never surprises anyone. Copy the two-part threshold: a percentage and an amount."
    },
    {
     "org": "social",
     "profile": {
      "report": "One page: sales by channel (café, wholesale, training fees), costs by line, budget vs actual for the month and year to date; ingredients as a share of turnover (budget 33%); cash, runway and unpaid wholesale invoices; year-end forecast. Lines more than 10% out explained. At 31 March: café sales 5% under; flour and ingredients US$2,100 (12%) over (price); if prices stay high, the forecast deficit rises from US$2,000 to more than US$10,000.",
      "routine": "The accountant closes the month by day 12; Lucía and Diego meet on the 15th and decide actions; the advisory group sees the reports every two months. March decision: raise office bread prices 5% from April, cut production waste, and review café prices in July with the new forecast."
     },
     "notice": "Notice the one measure that matters most for a bakery, ingredients as a share of sales, sits at the top. Copy the forecast that shows what happens if nothing changes."
    },
    {
     "org": "coop",
     "profile": {
      "report": "Monthly, in Malayalam, for the committee: sales by channel, yarn bought and in stock, payments to weavers and average days to pay, staff and other costs, cash and the seasonal loan balance, all against budget; year-end forecast including the expected members’ bonus. Lines more than 10% out explained. At 30 September: shop income US$2,500 under (a retail chain paying late; timing, chased); online US$1,400 over (volume).",
      "routine": "The accounts clerk prepares within seven days of the month end; Meera adds explanations; the treasurer checks it against the bank; the committee reviews it at its monthly meeting and minutes each decision. A simple summary goes to members at the annual general meeting."
     },
     "notice": "Look at the language: the report is in Malayalam, so every committee member can read it. Copy average days to pay weavers, a measure that matters to members."
    },
    {
     "org": "hybrid",
     "profile": {
      "report": "Two reports, one per entity, plus a one-page summary: budget vs actual, restricted funds, cash and runway (all cash and free cash), year-end forecast for both. Variances over 10% and £1,000 explained. At 30 September: shop sales £9,000 under budget (fewer donated electricals; volume; costs also lower), so the shop’s profit is forecast at £19,000, not £25,000, and the charity faces a £6,000 shortfall. School workshops £1,800 under (started late; timing).",
      "routine": "The bookkeeper closes both sets of books by day 7; Tom writes the explanations by day 12; the treasurer reviews monthly. Trustees and the company board review the quarterly version. September decision: the shop manager to ask local businesses for more donated items; trustees to agree charity savings if the shortfall is confirmed in December."
     },
     "notice": "Notice how a variance in the trading company flows straight into the charity’s forecast. Copy the link between the two reports."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [
   "donor-tracking"
  ],
  "video": null,
  "stage": "Review",
  "id": "reporting",
  "title": "Financial reporting: board, funders and statutory",
  "sheet": "Reporting calendar",
  "learn": [
   "Different audiences need different financial reports. Your board needs regular management accounts, cash and risks. Funders need reports in their own format showing how their money was used. Regulators and tax authorities need statutory accounts and returns by fixed deadlines. Members, shareholders or investors may need their own.",
   "Build a financial reporting calendar with every deadline, its owner and where the figures come from. Make sure funder reports match your accounts, so the same numbers appear everywhere. Keep the evidence (receipts, timesheets, contracts) filed by fund and by period.",
   "What your annual accounts must contain, and when they are due, depends on your legal form, size and country, so confirm the rules that apply to you. Your accountant prepares them, but your leaders must understand and approve them. Where you can, publish a simple summary as part of being open about your money."
  ],
  "weak": "We prepare reports when funders ask.",
  "strong": "Imara Girls in Science: a calendar listing the monthly board finance pack, Foundation A’s reports in January and July, Foundation B’s in June and December, the audit, annual returns and the annual report, each with an owner, all drawn from the same accounts.",
  "why": "Every deadline is known in advance and every report uses the same figures.",
  "reflect": "Which report deadline would cause the most damage if missed?",
  "exercise": "Build your financial reporting calendar.",
  "fields": [
   {
    "key": "calendar",
    "label": "Financial reporting calendar",
    "hint": "Report | audience | frequency or deadline | owner | data source."
   }
  ],
  "check": "Do the figures in every report reconcile to the same accounts?",
  "gallery": {
   "title": "Five example financial reporting calendars",
   "intro": "Each organisation’s list of who receives which financial report, when, and where the figures come from.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "calendar": "Quarterly money page | co-founders, volunteers; the board once registered | within a week of quarter end | Ibu Made | cash book\nSponsor report (spending, photos, survival) | two dive operators | July and January | Wayan | cash book, survival sheets\nVillage fund report | village heads | December village meeting | Wayan | cash book\nEnvironment grant report, if won | grant giver | as the grant sets | Sari | cash book, survival sheets\nAnnual accounts and returns | authorities, once registered | to confirm with our notary and a local accountant | Wayan | cash book\nYearly summary | young people, parents, donors (notice board, Instagram) | February | Sari | cash book"
     },
     "notice": "Notice that even before registration they report to every giver. Copy the line still to confirm: they know what they do not yet know."
    },
    {
     "org": "ngo",
     "profile": {
      "calendar": "Management accounts | director, treasurer | monthly, by day 10 | Grace | accounting system\nBoard finance pack | board of 7 | quarterly, a week before meetings | Grace, Achieng | management accounts\nFoundation A report | Foundation A | January and July | Grace (finance), Brian (results) | code FA, attendance data\nFoundation B report | Foundation B | June and December | Grace, Achieng | code FB\nCamp sponsors’ report | sponsors | September | Brian | code CS\nAudited accounts | board, then the regulator | audit February–March; board approves in April; filing date to confirm with our lawyer | Grace, auditor | year-end accounts\nAnnual report with financial summary | parents, schools, donors, county | May | Achieng | audited accounts"
     },
     "notice": "See how each funder report names the grant code it comes from. Copy that link: it is what makes the figures match."
    },
    {
     "org": "social",
     "profile": {
      "calendar": "Monthly one-page report | Lucía and Diego | by the 15th | accountant and Lucía | accounting and point-of-sale system\nAdvisory group pack | advisory group | every two months | Diego | monthly reports\nTax returns | tax authority | on the dates our accountant sets | accountant | accounts\nTraining reports to fee-paying employers | two employers | after each cohort, in January and July | Diego | trainee records and costs\nAnnual accounts | shareholders (Lucía and Diego) | approved within the period our accountant confirms | accountant | year-end accounts\nAnnual impact report | public, if we choose BIC status | yearly | Diego | accounts and trainee results"
     },
     "notice": "Notice the employers paying training fees get a report like any funder. Copy the honest “if we choose” for a report that depends on a decision still open."
    },
    {
     "org": "coop",
     "profile": {
      "calendar": "Monthly committee report | committee | each monthly meeting | clerk and Meera | cooperative software\nPayment statements | each member | with every payment | clerk | piece register\nYear-end accounts for audit | state cooperative department | after the March year end; dates to confirm with the department | clerk, treasurer | cooperative software\nAudited accounts and bonus proposal | general body of 140 members | annual general meeting, September | treasurer, president | audited accounts\nLoan statement | cooperative bank | as the loan requires | treasurer | bank records\nHandloom scheme report, if a grant is won | scheme | as the scheme sets | Meera | grant code"
     },
     "notice": "Look at the payment statements to each member: in a cooperative, every member is an audience. Copy how the annual general meeting is planned around the audited accounts."
    },
    {
     "org": "hybrid",
     "profile": {
      "calendar": "Management accounts, charity and company | Tom, treasurer | monthly, by day 12 | bookkeeper and Tom | two sets of books\nBoard packs | trustees; Riverside Reuse Ltd board | quarterly | Tom | management accounts\nLottery-type grant report | funder | quarterly; final after March 2027 | Tom and Priya | fund code LG, repair log\nTrust reports | community trust; education trust | April; February and August | Tom, schools officer | codes CT, ET\nCouncil contract report | council waste team | quarterly | Priya | repair log (items, kg)\nAnnual accounts and returns, both entities | charity regulator, company registry, tax authority | after the March year end; deadlines our accountant confirms | accountant, treasurer | both sets of books"
     },
     "notice": "Notice the council report draws on the repair log, not only the books. Copy the habit of naming the data source for results as well as money."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "audit",
  "title": "Audit, examination and financial governance",
  "sheet": "Financial governance",
  "learn": [
   "Depending on your legal form, size and country, your annual accounts may need an independent examination or a full audit, and some funders ask for audits of their projects. Thresholds differ by country and change over time, so confirm the ones that apply to you and plan for the cost and timing.",
   "Financial governance is how your governing body oversees money: approving the budget, reviewing management accounts, approving the annual accounts, appointing auditors or examiners, setting a reserves policy and approving major financial commitments.",
   "A reserves policy states how much unrestricted money you aim to hold, why (for example three to six months of core costs, to manage risk and change), and what you will do if you are above or below the target. A treasurer or finance committee can help, but the whole board stays responsible."
  ],
  "weak": "The accountant takes care of all that.",
  "strong": "Riverside Repair Hub: the accountant confirms each year which external check applies to the charity and to the company; trustees approve both budgets in February and both sets of accounts after meeting the examiner; reserves target three months of charity costs (£45,000), reviewed every year.",
  "why": "The board knows its obligations, checks them every year and sets out what it oversees and when.",
  "reflect": "Could each board member explain your financial position in two sentences?",
  "exercise": "Write your external scrutiny requirements, board oversight and reserves policy.",
  "fields": [
   {
    "key": "scrutiny",
    "label": "External scrutiny",
    "hint": "Audit or examination requirements and who confirms them."
   },
   {
    "key": "oversight",
    "label": "Board oversight",
    "hint": "What the board reviews and approves, and when."
   },
   {
    "key": "reserves",
    "label": "Reserves policy",
    "hint": "Target level, reasoning and actions if above or below."
   }
  ],
  "check": "Does your board actively oversee finances, not only receive reports?",
  "anatomy": {
   "title": "Who checks your accounts",
   "intro": "Which of these applies depends on your form, size, country and funders. Confirm the thresholds that apply to you.",
   "cols": [
    "Check",
    "What it involves",
    "Who asks for it"
   ],
   "rows": [
    [
     "Board review",
     "Trustees or directors read, question and approve the accounts",
     "Every organisation, as good practice"
    ],
    [
     "Independent examination",
     "A qualified independent person reviews the books and accounts; lighter than an audit",
     "Often smaller registered charities, depending on the country"
    ],
    [
     "Statutory audit",
     "An auditor tests the records and gives a formal opinion",
     "Larger organisations, some legal forms, some regulators"
    ],
    [
     "Funder or project audit",
     "A check of how one grant was spent",
     "Funders, in the grant agreement"
    ]
   ],
   "after": 0
  },
  "gallery": {
   "title": "Five example financial governance plans",
   "intro": "How each organisation is checked from outside, what its board oversees and its reserves policy.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "scrutiny": "Not registered yet, so no legal requirement today. After registering as an association we will ask our notary and a local accountant what applies to our size. Meanwhile, a teacher at the junior secondary school who keeps its accounts has agreed to check our cash book and receipts once a year, in January.",
      "oversight": "Today: both co-founders approve spending over US$100; volunteers see the quarterly money page. From registration, the founding board of three: approves the budget in December, reviews the money page each quarter, approves the yearly summary in February and agrees any spending over US$500.",
      "reserves": "Target by the end of year two: US$1,500, enough for one planting season’s seedlings, so planting does not stop if a sponsor is late. Now: about US$40 forecast at year end. If below target, we ask each sponsor for a small unrestricted share. If above target, the extra goes to a second planting site, once the board agrees."
     },
     "notice": "Notice the volunteer check by someone with the right skills: proportionate scrutiny before the law asks for any. Copy the reserve target tied to one real risk."
    },
    {
     "org": "ngo",
     "profile": {
      "scrutiny": "External audit every year (required for us under our registration and by Foundation A; our lawyer confirms whether the recent rule changes affect this). Auditor appointed by the board for three years at a time. Foundation A may request a project audit at the end of the grant.",
      "oversight": "Board of 7: approves the budget in December; reviews quarterly management accounts, restricted funds and cash; the finance and safeguarding committee meets the auditor and recommends the accounts; the board approves them in April. Commitments over US$10,000 and any use of the reserve need board approval.",
      "reserves": "Target: three months of spending, about US$32,500 (US$130,000 ÷ 4). Now: US$18,000 (1.7 months), rising to US$28,000 (2.6 months) if this year’s contribution holds. Below target: add US$10,000 a year and fundraise for unrestricted gifts. Using the reserve, for example for the proposed fundraising officer, needs a board decision and a plan to rebuild it within two years."
     },
     "notice": "See how the reserve is in months and in dollars, with the sum shown. Copy the rule that using the reserve needs a plan to rebuild it."
    },
    {
     "org": "social",
     "profile": {
      "scrutiny": "Our accountant prepares the annual accounts and tax returns and confirms each year whether an audit is required at our size. If we choose BIC status, we must also publish an annual impact report; we will ask whether it needs any external check. The bank may ask for accounts if we apply for an overdraft.",
      "oversight": "Lucía and Diego, as directors and shareholders, approve the budget in December, review monthly reports on the 15th and approve the annual accounts. The advisory group is not a board: it reviews the numbers every two months and advises, but does not decide. Commitments over US$2,000 need both directors.",
      "reserves": "Target: three months of costs, about US$53,000. Now: nothing set aside; cash about US$9,000. Plan: break even first, then put 5% of monthly sales into a separate account. Until we reach the target, founders’ pay stays at no more than double the café supervisor’s. Above target: invest in a second oven to train more young people."
     },
     "notice": "Notice they are honest that the advisory group advises but does not decide. Copy the link between the reserve target and the founders’ pay cap."
    },
    {
     "org": "coop",
     "profile": {
      "scrutiny": "Annual audit by the state cooperative department, as our registration requires. The treasurer and accounts clerk prepare the records after the March year end. A handloom scheme grant may bring its own audit conditions; Meera checks them before we apply.",
      "oversight": "Committee of nine: approves the budget in March; reviews the monthly report and the seasonal loan; approves yarn orders over US$2,000. The general body of 140 members receives the audited accounts at the annual general meeting in September, approves the bonus and elects the committee.",
      "reserves": "Our by-laws set aside part of any surplus as a reserve fund. Target: two months of yarn and weaver payments, about US$13,000, so we need a smaller seasonal loan. Now: US$1,500. Plan: the annual general meeting is asked to keep a larger share of surplus each year until the target is reached, instead of a larger bonus. Above target: share the extra as bonus."
     },
     "notice": "Look at the trade-off put to members: a bigger reserve or a bigger bonus. Copy the decision being made openly by the people it affects."
    },
    {
     "org": "hybrid",
     "profile": {
      "scrutiny": "Charity: our accountant confirms each year which check applies at our income; currently an independent examination. Riverside Reuse Ltd: the accountant confirms whether an audit is needed. The lottery-type funder may ask for a grant statement at the end in 2027. Trustees appoint the examiner each year.",
      "oversight": "Trustees: approve both budgets in February; review quarterly management accounts for both entities, restricted funds and the recharge; meet the examiner before approving the accounts; approve commitments over £5,000. The company board approves the gift to the charity each December. Recharge method to be reviewed by March 2027.",
      "reserves": "Target: three months of charity costs, £45,000, because grants end and the lease ends in 2028. Now: about £3,000 free reserves plus £8,000 designated for the move. Plan: add at least £5,000 a year from shop profits and unrestricted donations. Below £10,000 free reserves, trustees review spending each quarter."
     },
     "notice": "Notice the reasons for the reserve are named: a grant ending and a lease ending. Copy the gap between today and the target, stated without softening."
    }
   ]
  }
 }),
 lesson({
  "minutes": 20,
  "tools": [],
  "video": null,
  "stage": "Review",
  "id": "sustainability",
  "title": "Financial health and sustainability",
  "sheet": "Financial health",
  "learn": [
   "Financial sustainability means being able to fund your mission over time, cope with shocks and invest in the future. You judge it by financial health, not by how fast your income grows.",
   "Track a few simple measures: months of unrestricted reserves, runway, the share of income from your largest single source, the share of unrestricted or flexible income, whether projects recover their full costs and, where it helps, the cost per output or outcome. Watch how they change over the years.",
   "This lesson measures health; Module 11 decides how to build a sustainable mix of income. Use these measures together in your annual review: they show whether the way you fund your work is actually working."
  ],
  "weak": "We are sustainable because we got a big grant.",
  "strong": "Imara Girls in Science: reserves 1.7 months (target 3); largest funder 50% of income (limit 40%) and ending next year; unrestricted income 41%; neither the clubs nor the camp recover their full costs; full cost per girl about US$217 a year.",
  "why": "Several measures together show how resilient and how dependent the organisation is, not just how big.",
  "reflect": "Which single funder or customer could you not afford to lose?",
  "exercise": "Choose your financial health measures and current values.",
  "fields": [
   {
    "key": "measures",
    "label": "Financial health measures",
    "hint": "Measure | current value | target | trend."
   }
  ],
  "check": "Do your measures show resilience and dependency, not only income size?",
  "gallery": {
   "title": "Five example financial health dashboards",
   "intro": "Each organisation picks five or six measures that show its resilience and its dependencies, with honest current values.",
   "prompt": "Which example is closest to your organisation?",
   "items": [
    {
     "org": "idea",
     "profile": {
      "measures": "Reserve | US$0 (US$40 forecast at year end) | US$1,500 by end of year two | first year\nLargest single source | dive operators, 50% of income received (3,000 of 6,000) | below 40% | first year\nUnrestricted share of income | 42% (2,500 of 6,000) | over 40% | first year\nIncome still unconfirmed | US$1,500 (20% of budget) | under 10% | grant decision due\nCost per seedling alive at 12 months | about US$2.85 if two-thirds survive (5,704 ÷ 2,000) | falling | measured from next year\nUnpaid co-founder time | about 1,500 hours a year | recorded, to plan paid help | first year"
     },
     "notice": "Notice the cost per surviving seedling, not per seedling planted. Copy how it matches their value of being honest about results."
    },
    {
     "org": "ngo",
     "profile": {
      "measures": "Unrestricted reserves | 1.7 months (US$18,000) | 3 months | up from 1.2 last year\nLowest runway in the year | 2.5 months (June) | never below 2 | stable\nLargest funder (Foundation A) | 50% | no more than 40% | ends next year: highest risk\nUnrestricted income | 41% (US$58,000) | 50% | up slowly\nProjects recovering full costs | 0 of 2 (clubs: funder allows 15% against our 32%; camp: 56% covered by sponsors) | 2 of 2 | to negotiate with Foundation B and sponsors\nFull cost per girl per year | about US$217 (US$130,000 ÷ 600) | stable while quality holds | first year measured"
     },
     "notice": "See the gap between the funder’s 15% and the real 32% shared-cost rate. Copy the trend column: one figure is a snapshot, three years are a story."
    },
    {
     "org": "social",
     "profile": {
      "measures": "Result for the year | −US$2,000 (−1% of turnover) | break-even, then +3% | −US$6,000 last year\nCash reserve | none set aside; runway 0.4–0.8 months | 3 months (about US$53,000) | not started\nLargest customer | one office client, US$30,000 (14% of turnover) | below 10% | stable\nIngredients as share of turnover | 33% | 33% or less | rising with flour prices\nFull cost per trainee | about US$2,223; employer fees cover 56% | 100% from fees or grants | first year measured\nTraining income | US$15,000 from two employers | US$27,000, with a grant through Asociación Barrio Forma | to decide in Module 11"
     },
     "notice": "Notice that a company tracks its result and its biggest customer just as a nonprofit tracks its biggest funder. Copy the honest “not started” on the reserve."
    },
    {
     "org": "coop",
     "profile": {
      "measures": "Reserve fund | US$1,500 (about 0.2 months of payments) | US$13,000 | slowly rising\nSeasonal borrowing | US$15,000 | under US$8,000 | first year measured\nOnline share of sales | 32% (US$30,000 of 95,000) | 40% | up from 25%\nLargest buyer | one retail chain, about 25% of sales | below 20% | stable\nShare of sales paid to weavers | 42% (US$40,000 of 95,000) | rising | stable\nDays to pay weavers | 15 or fewer in every month | 15 or fewer | met all year"
     },
     "notice": "Look at the share of sales paid to weavers: for a cooperative, this is a health measure, not a cost to cut. Copy measures that reflect your own purpose."
    },
    {
     "org": "hybrid",
     "profile": {
      "measures": "Free unrestricted reserves | about £3,000 (0.2 months), plus £8,000 designated | £45,000 (3 months) | down from last year\nShop profit as a share of charity costs | 14% (£25,000 of 180,000); forecast 11% this year | 30% (ISO1) | falling with fewer donated items\nLargest funder | lottery-type grant, 33% (£60,000); ends March 2027 | below 25% | high risk\nUnrestricted income | 39% (council £30,000, donations £15,000, shop gift £25,000) | 50% | stable\nSchool workshops’ full cost recovery | 46% (£20,000 of £43,840) | 80% | first year measured\nCost per item repaired at repair cafés | to calculate with the repair log | known and stable | first year"
     },
     "notice": "Notice the shop measure compared with the objective it serves (ISO1). Copy the line still to calculate: start the measure even before you have the figure."
    }
   ]
  }
 }),
 review("finance-pack","Your Financial Management Pack")
 ]
});
